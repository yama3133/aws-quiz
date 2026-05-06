import { quizData as QUESTIONS } from './questions.js';
import { useState, useEffect, useRef } from "react";

const PARTY = [
  { name: "クラウド", job: "Warrior", hp: 120, maxHp: 120, mp: 80, maxMp: 80, emoji: "⚔️" },
  { name: "ライトニング", job: "Soldier", hp: 100, maxHp: 100, mp: 100, maxMp: 100, emoji: "⚡" },
  { name: "テラ", job: "Mage", hp: 80, maxHp: 80, mp: 140, maxMp: 140, emoji: "🔮" },
];

const ENEMIES = [
  { name: "ガードスコーピオン", emoji: "🦂", color: "#10b981" },
  { name: "クアール", emoji: "🐱", color: "#8b5cf6" },
  { name: "マリリス", emoji: "🐍", color: "#ef4444" },
  { name: "クリスタリス", emoji: "💎", color: "#06b6d4" },
  { name: "オメガ", emoji: "🤖", color: "#f59e0b" },
];

const COMMANDS = ["たたかう", "まほう", "アイテム", "にげる"];
const DOMAIN_COLORS = {
  "生成AIの基礎": "#06b6d4",
  "データ準備": "#10b981",
  "アプリ開発": "#f59e0b",
  "評価と最適化": "#ec4899",
  "セキュリティ": "#8b5cf6",
};

const delay = ms => new Promise(r => setTimeout(r, ms));

function ATBBar({ value, max, color, active }) {
  const pct = Math.min(1, value / max);
  return (
    <div style={{ width: "100%", height: 6, background: "rgba(0,0,0,0.5)", borderRadius: 3, border: "1px solid rgba(255,255,255,0.08)", overflow: "hidden" }}>
      <div style={{
        height: "100%", width: `${pct * 100}%`,
        background: active ? `linear-gradient(90deg, ${color}, white)` : color,
        borderRadius: 3,
        boxShadow: active ? `0 0 8px ${color}` : "none",
        transition: "width 0.1s linear",
      }} />
    </div>
  );
}

function HPBar({ hp, maxHp }) {
  const pct = hp / maxHp;
  const color = pct > 0.5 ? "#4ade80" : pct > 0.25 ? "#facc15" : "#f87171";
  return (
    <div style={{ width: "100%", height: 5, background: "rgba(0,0,0,0.5)", borderRadius: 2, overflow: "hidden" }}>
      <div style={{ height: "100%", width: `${pct * 100}%`, background: color, transition: "width 0.4s ease", borderRadius: 2 }} />
    </div>
  );
}

function ParticleEffect({ show, color }) {
  if (!show) return null;
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      {[...Array(12)].map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          width: 4, height: 4,
          borderRadius: "50%",
          background: color,
          left: `${20 + Math.random() * 60}%`,
          top: `${20 + Math.random() * 60}%`,
          animation: `particle${i % 3} 0.8s ease-out forwards`,
          boxShadow: `0 0 6px ${color}`,
        }} />
      ))}
    </div>
  );
}

export default function FFQuiz() {
  const [qIndex, setQIndex] = useState(0);
  const [phase, setPhase] = useState("idle"); // idle, command, question, animating, result, gameover, clear
  const [party, setParty] = useState(PARTY.map(p => ({ ...p })));
  const [activeChar, setActiveChar] = useState(0);
  const [atbValues, setAtbValues] = useState([0, 40, 70]);
  const [selectedCmd, setSelectedCmd] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [messages, setMessages] = useState([]);
  const [enemyHp, setEnemyHp] = useState(100);
  const [enemyShake, setEnemyShake] = useState(false);
  const [enemyFlash, setEnemyFlash] = useState(false);
  const [charAttack, setCharAttack] = useState(null);
  const [showDamage, setShowDamage] = useState(null);
  const [showParticle, setShowParticle] = useState(false);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [bgShift, setBgShift] = useState(0);
  const atbRef = useRef(null);
  const phaseRef = useRef(phase);
  phaseRef.current = phase;

  const q = QUESTIONS[Math.min(qIndex, QUESTIONS.length - 1)];
  const enemy = ENEMIES[Math.min(Math.floor(qIndex / 3), ENEMIES.length - 1)];
  const accentColor = DOMAIN_COLORS[q?.domain] || "#06b6d4";

  // ATB gauge animation
  useEffect(() => {
    atbRef.current = setInterval(() => {
      if (phaseRef.current !== "command" && phaseRef.current !== "idle") return;
      setAtbValues(prev => prev.map((v, i) => Math.min(100, v + [1.2, 0.9, 1.5][i])));
    }, 60);
    return () => clearInterval(atbRef.current);
  }, []);

  // Background subtle shift
  useEffect(() => {
    const iv = setInterval(() => setBgShift(v => (v + 0.3) % 360), 50);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    startBattle();
  }, []);

  const startBattle = () => {
    setEnemyHp(100);
    setSelectedCmd(null);
    setSelectedAnswer(null);
    setShowDamage(null);
    setShowParticle(false);
    setEnemyShake(false);
    setEnemyFlash(false);
    setCharAttack(null);
    const q = QUESTIONS[qIndex] || QUESTIONS[0];
    setMessages([`${ENEMIES[Math.min(Math.floor(qIndex / 3), ENEMIES.length - 1)].name}が あらわれた！`]);
    setPhase("command");
  };

  const handleCommand = (cmd) => {
    if (phase !== "command") return;
    if (cmd === "たたかう") {
      setSelectedCmd(cmd);
      setMessages([`【${q.domain}】\n${q.question}`]);
      setPhase("question");
    } else if (cmd === "にげる") {
      setMessages(["しかし、まわりこまれた！"]);
    } else {
      setMessages([`${cmd}は　まだ　つかえない！`]);
    }
  };

  const handleAnswer = async (idx) => {
    if (phase !== "question") return;
    setSelectedAnswer(idx);
    setPhase("animating");
    const correct = idx === q.correct;

    // Character lunges
    setCharAttack(activeChar);
    await delay(300);

    if (correct) {
      const dmg = Math.floor(Math.random() * 20) + 25;
      setEnemyShake(true);
      setEnemyFlash(true);
      setShowDamage({ value: dmg, correct: true });
      setShowParticle(true);
      const newHp = Math.max(0, enemyHp - dmg);
      setEnemyHp(newHp);
      setMessages([`クリティカルヒット！\n${dmg}ダメージ！`]);
      await delay(500);
      setEnemyShake(false);
      setEnemyFlash(false);
      setCharAttack(null);
      await delay(400);
      setShowDamage(null);
      setShowParticle(false);

      setTotalCorrect(c => c + 1);
      // gain MP
      setParty(prev => prev.map((p, i) => i === activeChar ? { ...p, mp: Math.min(p.maxMp, p.mp + q.mp) } : p));

      if (newHp <= 0) {
        setMessages([`${enemy.name}を　たおした！`]);
        await delay(1200);
        const next = qIndex + 1;
        if (next >= QUESTIONS.length) {
          setPhase("clear");
        } else {
          setQIndex(next);
          setActiveChar((activeChar + 1) % PARTY.length);
          setAtbValues([0, 0, 0]);
          setPhase("command");
          const nextQ = QUESTIONS[next];
          const nextEnemy = ENEMIES[Math.min(Math.floor(next / 3), ENEMIES.length - 1)];
          setEnemyHp(100);
          setMessages([`${nextEnemy.name}が　あらわれた！`]);
        }
      } else {
        setMessages([`せいかい！\nダメージ: ${dmg}`]);
        await delay(800);
        setSelectedCmd(null);
        setSelectedAnswer(null);
        setActiveChar((activeChar + 1) % PARTY.length);
        setPhase("command");
        setMessages([`${enemy.name}を　たおせ！`]);
      }
    } else {
      // enemy counterattacks
      const pDmg = Math.floor(Math.random() * 15) + 10;
      setCharAttack(null);
      await delay(200);
      setMessages([`まちがい！\n${enemy.name}の　はんげき！`]);
      // damage to active char
      setParty(prev => prev.map((p, i) => {
        if (i === activeChar) {
          const newHp = Math.max(0, p.hp - pDmg);
          return { ...p, hp: newHp };
        }
        return p;
      }));
      setShowDamage({ value: pDmg, correct: false, onParty: true });
      await delay(600);
      setShowDamage(null);

      const charDead = party[activeChar].hp - pDmg <= 0;
      if (charDead || party.every((p, i) => i === activeChar ? p.hp - pDmg <= 0 : p.hp <= 0)) {
        setMessages(["パーティが　ぜんめつした..."]);
        setPhase("gameover");
        return;
      }

      await delay(400);
      setSelectedCmd(null);
      setSelectedAnswer(null);
      setActiveChar((activeChar + 1) % PARTY.length);
      setPhase("command");
      setMessages([`${enemy.name}を　たおせ！`]);
    }
  };

  const handleRestart = () => {
    setQIndex(0);
    setParty(PARTY.map(p => ({ ...p })));
    setAtbValues([0, 40, 70]);
    setTotalCorrect(0);
    setActiveChar(0);
    startBattle();
    setPhase("command");
    setMessages(["新しい　たたかいが　はじまった！"]);
  };

  const atbReady = atbValues[activeChar] >= 100;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes enemyFloat {
          0%,100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-8px) scale(1.02); }
        }
        @keyframes glitch {
          0%,100% { transform: translateX(0); }
          20% { transform: translateX(-4px); }
          40% { transform: translateX(4px); }
          60% { transform: translateX(-2px); }
          80% { transform: translateX(2px); }
        }
        @keyframes flash { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
        @keyframes dmgFloat {
          0% { opacity:1; transform:translateY(0) scale(1.4); }
          100% { opacity:0; transform:translateY(-60px) scale(0.8); }
        }
        @keyframes scanH {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes charLunge {
          0%,100% { transform: translateX(0); }
          40% { transform: translateX(18px); }
          60% { transform: translateX(-4px); }
        }
        @keyframes crystalSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes borderGlow {
          0%,100% { border-color: rgba(6,182,212,0.3); box-shadow: 0 0 15px rgba(6,182,212,0.1); }
          50% { border-color: rgba(6,182,212,0.7); box-shadow: 0 0 30px rgba(6,182,212,0.3); }
        }
      `}</style>

      <div style={{
        minHeight: "100vh",
        background: `
          radial-gradient(ellipse at ${50 + Math.sin(bgShift * 0.017) * 10}% 30%, rgba(6,182,212,0.08) 0%, transparent 60%),
          radial-gradient(ellipse at ${50 + Math.cos(bgShift * 0.013) * 10}% 80%, rgba(139,92,246,0.06) 0%, transparent 60%),
          linear-gradient(160deg, #020b18 0%, #040d20 40%, #060a1c 100%)
        `,
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Rajdhani', sans-serif",
        overflow: "hidden",
        position: "relative",
        minHeight: "100dvh",
      }}>
        {/* Scanline overlay */}
        <div style={{
          position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
          background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px)",
        }} />

        {/* Decorative grid */}
        <div style={{
          position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
          backgroundImage: `
            linear-gradient(rgba(6,182,212,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6,182,212,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }} />

        <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", minHeight: "100vh" }}>

          {/* ── TOP: Domain + Question counter ── */}
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "10px 16px 0",
          }}>
            <div style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: 9, letterSpacing: 4,
              color: accentColor,
              textShadow: `0 0 12px ${accentColor}`,
            }}>
              AWS GDA-C01
            </div>
            <div style={{
              fontSize: 10, color: "#475569", letterSpacing: 2,
              fontFamily: "'Orbitron', monospace",
            }}>
              {qIndex + 1} / {QUESTIONS.length}
            </div>
          </div>

          {/* ── BATTLE FIELD ── */}
          <div style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "8px 16px",
            position: "relative",
            minHeight: 0,
          }}>

            {/* Enemy area */}
            <div style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
              position: "relative",
              minHeight: 160,
            }}>

              {/* Enemy HP bar (top-left style) */}
              <div style={{
                position: "absolute", top: 0, left: 0,
                background: "rgba(2,11,24,0.85)",
                border: `1px solid ${enemy.color}40`,
                borderRadius: 6,
                padding: "8px 14px",
                minWidth: 180,
                backdropFilter: "blur(8px)",
              }}>
                <div style={{ fontSize: 12, color: enemy.color, fontFamily: "'Orbitron', monospace", letterSpacing: 1, marginBottom: 4 }}>
                  {enemy.name}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 9, color: "#ef4444" }}>HP</span>
                  <div style={{ flex: 1, height: 6, background: "rgba(0,0,0,0.5)", borderRadius: 3, overflow: "hidden" }}>
                    <div style={{
                      height: "100%",
                      width: `${enemyHp}%`,
                      background: enemyHp > 50 ? "#4ade80" : enemyHp > 25 ? "#facc15" : "#ef4444",
                      transition: "width 0.5s ease",
                      boxShadow: `0 0 8px currentColor`,
                      borderRadius: 3,
                    }} />
                  </div>
                  <span style={{ fontSize: 9, color: "#64748b", fontFamily: "monospace" }}>{enemyHp}</span>
                </div>
              </div>

              {/* Enemy sprite */}
              <div style={{ position: "relative" }}>
                {/* Glow ring */}
                <div style={{
                  position: "absolute",
                  width: 120, height: 20,
                  borderRadius: "50%",
                  background: `radial-gradient(ellipse, ${enemy.color}30 0%, transparent 70%)`,
                  bottom: -10, left: "50%",
                  transform: "translateX(-50%)",
                }} />
                <div style={{
                  fontSize: 96,
                  animation: enemyShake ? "glitch 0.3s ease" : "enemyFloat 3s ease-in-out infinite",
                  filter: enemyFlash
                    ? "brightness(5) saturate(0)"
                    : `drop-shadow(0 0 20px ${enemy.color}) drop-shadow(0 0 40px ${enemy.color}60)`,
                  userSelect: "none",
                  lineHeight: 1,
                  transition: "filter 0.1s",
                }}>
                  {enemy.emoji}
                </div>

                {/* Damage number */}
                {showDamage && !showDamage.onParty && (
                  <div style={{
                    position: "absolute",
                    top: -20, left: "50%",
                    transform: "translateX(-50%)",
                    fontSize: 28,
                    fontFamily: "'Orbitron', monospace",
                    fontWeight: 900,
                    color: showDamage.correct ? "#fbbf24" : "#f87171",
                    textShadow: `0 0 20px ${showDamage.correct ? "#fbbf24" : "#f87171"}`,
                    animation: "dmgFloat 1.2s ease-out forwards",
                    whiteSpace: "nowrap",
                    pointerEvents: "none",
                  }}>
                    {showDamage.value}
                  </div>
                )}

                {/* Particle effects */}
                {showParticle && (
                  <div style={{ position: "absolute", inset: "-30px", pointerEvents: "none" }}>
                    {[...Array(8)].map((_, i) => (
                      <div key={i} style={{
                        position: "absolute",
                        width: 6, height: 6,
                        borderRadius: "50%",
                        background: accentColor,
                        left: `${30 + Math.cos(i / 8 * Math.PI * 2) * 40}%`,
                        top: `${30 + Math.sin(i / 8 * Math.PI * 2) * 40}%`,
                        boxShadow: `0 0 10px ${accentColor}`,
                        animation: `flash 0.3s ease ${i * 0.05}s infinite`,
                      }} />
                    ))}
                  </div>
                )}
              </div>

              {/* Question area - overlaid when in question phase */}
              {phase === "question" && (
                <div style={{
                  position: "absolute",
                  bottom: 0, left: 0, right: 0,
                  background: "linear-gradient(135deg, rgba(2,11,24,0.96) 0%, rgba(4,13,32,0.96) 100%)",
                  border: `1px solid ${accentColor}40`,
                  borderRadius: 8,
                  padding: "12px 16px",
                  backdropFilter: "blur(12px)",
                  animation: "fadeUp 0.3s ease",
                  boxShadow: `0 0 30px ${accentColor}20`,
                }}>
                  {/* Domain tag */}
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                    <div style={{
                      width: 6, height: 6, borderRadius: "50%",
                      background: accentColor,
                      boxShadow: `0 0 8px ${accentColor}`,
                    }} />
                    <span style={{ fontSize: 9, color: accentColor, letterSpacing: 2, fontFamily: "'Orbitron', monospace" }}>
                      {q.domain}
                    </span>
                  </div>
                  <div style={{
                    fontSize: 13,
                    color: "#e2e8f0",
                    lineHeight: 1.7,
                    fontWeight: 300,
                    letterSpacing: 0.3,
                  }}>
                    {q.question}
                  </div>
                </div>
              )}
            </div>

            {/* Party status bar */}
            <div style={{
              background: "linear-gradient(135deg, rgba(2,11,24,0.92) 0%, rgba(4,13,32,0.92) 100%)",
              border: "1px solid rgba(6,182,212,0.2)",
              borderRadius: 8,
              padding: "10px 14px",
              backdropFilter: "blur(12px)",
              marginBottom: 8,
              animation: "borderGlow 3s infinite",
            }}>
              <div style={{ display: "flex", gap: 12 }}>
                {party.map((p, i) => {
                  const isActive = i === activeChar && (phase === "command" || phase === "question");
                  const isAttacking = charAttack === i;
                  return (
                    <div key={i} style={{
                      flex: 1,
                      padding: "6px 8px",
                      borderRadius: 6,
                      background: isActive ? `${accentColor}12` : "transparent",
                      border: `1px solid ${isActive ? accentColor + "50" : "transparent"}`,
                      transition: "all 0.3s",
                      animation: isAttacking ? "charLunge 0.5s ease" : "none",
                      position: "relative",
                    }}>
                      {/* Active indicator */}
                      {isActive && (
                        <div style={{
                          position: "absolute", top: -8, left: "50%",
                          transform: "translateX(-50%)",
                          fontSize: 10, color: accentColor,
                          animation: "pulse 0.6s infinite",
                        }}>▼</div>
                      )}

                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                          <span style={{ fontSize: 14 }}>{p.emoji}</span>
                          <div>
                            <div style={{ fontSize: 10, fontWeight: 600, color: isActive ? accentColor : "#94a3b8", fontFamily: "'Rajdhani', sans-serif", letterSpacing: 0.5 }}>
                              {p.name}
                            </div>
                            <div style={{ fontSize: 8, color: "#475569", letterSpacing: 1 }}>{p.job}</div>
                          </div>
                        </div>
                        {showDamage?.onParty && i === activeChar && (
                          <div style={{
                            fontSize: 14, color: "#f87171",
                            fontFamily: "'Orbitron', monospace",
                            fontWeight: 700,
                            animation: "dmgFloat 1s ease-out forwards",
                          }}>-{showDamage.value}</div>
                        )}
                      </div>

                      <div style={{ display: "flex", gap: 4, marginBottom: 3, alignItems: "center" }}>
                        <span style={{ fontSize: 8, color: "#ef4444", width: 16 }}>HP</span>
                        <div style={{ flex: 1 }}><HPBar hp={p.hp} maxHp={p.maxHp} /></div>
                        <span style={{ fontSize: 8, color: "#64748b", fontFamily: "monospace", width: 28, textAlign: "right" }}>{p.hp}</span>
                      </div>
                      <div style={{ display: "flex", gap: 4, marginBottom: 4, alignItems: "center" }}>
                        <span style={{ fontSize: 8, color: "#60a5fa", width: 16 }}>MP</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ width: "100%", height: 4, background: "rgba(0,0,0,0.5)", borderRadius: 2, overflow: "hidden" }}>
                            <div style={{ height: "100%", width: `${p.mp / p.maxMp * 100}%`, background: "#3b82f6", borderRadius: 2, transition: "width 0.4s" }} />
                          </div>
                        </div>
                        <span style={{ fontSize: 8, color: "#64748b", fontFamily: "monospace", width: 28, textAlign: "right" }}>{p.mp}</span>
                      </div>

                      {/* ATB gauge */}
                      <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                        <span style={{ fontSize: 8, color: "#facc15", width: 16 }}>ATB</span>
                        <div style={{ flex: 1 }}>
                          <ATBBar value={atbValues[i]} max={100} color="#facc15" active={atbValues[i] >= 100} />
                        </div>
                        {atbValues[i] >= 100 && (
                          <span style={{ fontSize: 7, color: "#facc15", animation: "pulse 0.5s infinite", width: 28, textAlign: "right", fontFamily: "'Orbitron', monospace" }}>ACT</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Message / Command window */}
            <div style={{
              background: "linear-gradient(135deg, rgba(2,11,24,0.95) 0%, rgba(4,13,32,0.95) 100%)",
              border: `1px solid ${accentColor}30`,
              borderRadius: 8,
              overflow: "hidden",
              backdropFilter: "blur(12px)",
              boxShadow: `0 0 20px ${accentColor}10`,
            }}>
              {/* Scanline accent */}
              <div style={{
                height: 2,
                background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
                opacity: 0.6,
              }} />

              <div style={{ display: "flex", minHeight: 90 }}>
                {/* Message area */}
                <div style={{ flex: 1, padding: "12px 16px", borderRight: "1px solid rgba(255,255,255,0.05)" }}>
                  {messages.map((m, i) => (
                    <div key={i} style={{
                      fontSize: 13, color: i === 0 ? "#e2e8f0" : "#94a3b8",
                      lineHeight: 1.7, fontWeight: i === 0 ? 400 : 300,
                      whiteSpace: "pre-line",
                      animation: "fadeUp 0.2s ease",
                    }}>
                      {m}
                    </div>
                  ))}
                </div>

                {/* Command / Answer area */}
                <div style={{ width: 200, padding: "10px 12px" }}>
                  {phase === "command" && (
                    <div style={{ animation: "fadeUp 0.2s ease" }}>
                      <div style={{ fontSize: 9, color: accentColor, letterSpacing: 3, marginBottom: 8, fontFamily: "'Orbitron', monospace" }}>
                        COMMAND
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        {COMMANDS.map((cmd, i) => {
                          const ready = atbValues[activeChar] >= 100;
                          return (
                            <button key={cmd} onClick={() => ready && handleCommand(cmd)} style={{
                              background: cmd === "たたかう" && ready ? `${accentColor}15` : "transparent",
                              border: "none",
                              borderLeft: `2px solid ${cmd === "たたかう" && ready ? accentColor : "transparent"}`,
                              padding: "4px 10px",
                              textAlign: "left",
                              color: !ready ? "#334155"
                                : cmd === "たたかう" ? accentColor
                                : cmd === "にげる" ? "#ef4444"
                                : "#64748b",
                              fontSize: 13,
                              fontFamily: "'Rajdhani', sans-serif",
                              fontWeight: 600,
                              cursor: ready ? "pointer" : "default",
                              letterSpacing: 1,
                              transition: "all 0.2s",
                            }}>
                              {!ready && i === 0 ? (
                                <span style={{ animation: "pulse 1s infinite", color: "#334155" }}>── ATB待機中 ──</span>
                              ) : cmd}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {phase === "question" && (
                    <div style={{ animation: "fadeUp 0.2s ease" }}>
                      <div style={{ fontSize: 9, color: accentColor, letterSpacing: 3, marginBottom: 8, fontFamily: "'Orbitron', monospace" }}>
                        ANSWER
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        {q.choices.map((c, i) => (
                          <button key={i} onClick={() => handleAnswer(i)} style={{
                            background: selectedAnswer === i ? `${accentColor}20` : "transparent",
                            border: "none",
                            borderLeft: `2px solid ${selectedAnswer === i ? accentColor : "#1e293b"}`,
                            padding: "4px 8px",
                            textAlign: "left",
                            color: "#cbd5e1",
                            fontSize: 11,
                            fontFamily: "'Rajdhani', sans-serif",
                            fontWeight: 400,
                            cursor: "pointer",
                            lineHeight: 1.4,
                            transition: "all 0.15s",
                          }}
                            onMouseEnter={e => { e.currentTarget.style.color = accentColor; e.currentTarget.style.borderLeftColor = accentColor; }}
                            onMouseLeave={e => { e.currentTarget.style.color = "#cbd5e1"; e.currentTarget.style.borderLeftColor = "#1e293b"; }}
                          >
                            <span style={{ color: accentColor, marginRight: 6, fontFamily: "'Orbitron', monospace", fontSize: 9 }}>
                              {["①", "②", "③", "④"][i]}
                            </span>
                            {c}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {phase === "animating" && (
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", gap: 4 }}>
                      {[0, 1, 2].map(i => (
                        <div key={i} style={{
                          width: 6, height: 6, borderRadius: "50%",
                          background: accentColor,
                          animation: `pulse 0.8s ease ${i * 0.2}s infinite`,
                        }} />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom accent */}
              <div style={{
                height: 2,
                background: `linear-gradient(90deg, transparent, ${accentColor}60, transparent)`,
              }} />
            </div>

          </div>
        </div>

        {/* ── GAME OVER overlay ── */}
        {phase === "gameover" && (
          <div style={{
            position: "fixed", inset: 0, zIndex: 100,
            background: "rgba(0,0,0,0.92)",
            display: "flex", alignItems: "center", justifyContent: "center",
            animation: "fadeUp 0.6s ease",
          }}>
            <div style={{
              textAlign: "center",
              border: "1px solid rgba(239,68,68,0.3)",
              borderRadius: 12,
              padding: "40px 50px",
              background: "rgba(127,29,29,0.2)",
              backdropFilter: "blur(20px)",
            }}>
              <div style={{
                fontFamily: "'Orbitron', monospace",
                fontSize: 32, fontWeight: 900,
                color: "#ef4444",
                letterSpacing: 8,
                textShadow: "0 0 30px #ef4444",
                marginBottom: 20,
              }}>GAME OVER</div>
              <div style={{ fontSize: 14, color: "#94a3b8", marginBottom: 6 }}>
                正解数: {totalCorrect} / {qIndex + 1}
              </div>
              <div style={{ fontSize: 12, color: "#64748b", marginBottom: 28 }}>
                到達問題: 第{qIndex + 1}問
              </div>
              <button onClick={handleRestart} style={{
                background: "linear-gradient(135deg, rgba(239,68,68,0.2), rgba(239,68,68,0.1))",
                border: "1px solid rgba(239,68,68,0.5)",
                borderRadius: 6, padding: "10px 32px",
                color: "#f87171",
                fontFamily: "'Orbitron', monospace",
                fontSize: 12, cursor: "pointer", letterSpacing: 2,
              }}>RETRY</button>
            </div>
          </div>
        )}

        {/* ── CLEAR overlay ── */}
        {phase === "clear" && (
          <div style={{
            position: "fixed", inset: 0, zIndex: 100,
            background: "rgba(0,0,0,0.9)",
            display: "flex", alignItems: "center", justifyContent: "center",
            animation: "fadeUp 0.6s ease",
          }}>
            <div style={{
              textAlign: "center",
              border: `1px solid ${accentColor}50`,
              borderRadius: 12,
              padding: "40px 50px",
              background: `rgba(6,182,212,0.05)`,
              backdropFilter: "blur(20px)",
              boxShadow: `0 0 60px ${accentColor}20`,
            }}>
              <div style={{ fontSize: 48, marginBottom: 12, animation: "crystalSpin 4s linear infinite" }}>💎</div>
              <div style={{
                fontFamily: "'Orbitron', monospace",
                fontSize: 20, fontWeight: 900,
                color: accentColor,
                letterSpacing: 4,
                textShadow: `0 0 30px ${accentColor}`,
                marginBottom: 8,
              }}>MISSION COMPLETE</div>
              <div style={{ fontSize: 13, color: "#4ade80", marginBottom: 6 }}>
                全{QUESTIONS.length}問クリア！
              </div>
              <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 6 }}>
                正解数: {totalCorrect + 1} / {QUESTIONS.length}
              </div>
              <div style={{ fontSize: 10, color: "#475569", marginBottom: 28 }}>
                AWS GDA-C01 認定への道が開かれた
              </div>
              <button onClick={handleRestart} style={{
                background: `linear-gradient(135deg, ${accentColor}20, ${accentColor}10)`,
                border: `1px solid ${accentColor}60`,
                borderRadius: 6, padding: "10px 32px",
                color: accentColor,
                fontFamily: "'Orbitron', monospace",
                fontSize: 12, cursor: "pointer", letterSpacing: 2,
              }}>PLAY AGAIN</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}