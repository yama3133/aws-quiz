import { useState, useEffect, useRef } from "react";
import { quizData as QUESTIONS } from './questions.js';

const DOMAIN_COLORS = {
  "生成AIの基礎": "#4fc3f7",
  "データ準備": "#81c784",
  "アプリ開発": "#ffb74d",
  "評価と最適化": "#f06292",
  "セキュリティ": "#ce93d8",
};

const MONSTER_BY_DOMAIN = {
  "生成AIの基礎": { emoji: "🟦", name: "プロンプトスライム" },
  "データ準備": { emoji: "🪨", name: "チャンキングゴーレム" },
  "アプリ開発": { emoji: "🐉", name: "アクショングループドラゴン" },
  "評価と最適化": { emoji: "🦅", name: "ROUGEワイバーン" },
  "セキュリティ": { emoji: "🛡️", name: "ガードレールナイト" },
};

const PLAYER_MAX_HP = 60;
const PLAYER_MAX_MP = 20;
const delay = ms => new Promise(r => setTimeout(r, ms));

function TypewriterText({ text, speed = 35 }) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const iv = setInterval(() => {
      if (i < text.length) setDisplayed(text.slice(0, ++i));
      else clearInterval(iv);
    }, speed);
    return () => clearInterval(iv);
  }, [text]);
  return <span>{displayed}</span>;
}

export default function DQQuiz() {
  const [qIndex, setQIndex] = useState(0);
  const [phase, setPhase] = useState("battle");
  const [messages, setMessages] = useState([]);
  const [playerHp, setPlayerHp] = useState(PLAYER_MAX_HP);
  const [playerMp, setPlayerMp] = useState(PLAYER_MAX_MP);
  const [playerLevel, setPlayerLevel] = useState(1);
  const [playerExp, setPlayerExp] = useState(0);
  const [monsterHp, setMonsterHp] = useState(100);
  const [monsterShaking, setMonsterShaking] = useState(false);
  const [monsterFlashing, setMonsterFlashing] = useState(false);
  const [monsterDefeated, setMonsterDefeated] = useState(false);
  const [playerShaking, setPlayerShaking] = useState(false);
  const [showDamage, setShowDamage] = useState(null);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [totalGold, setTotalGold] = useState(0);
  const [mode, setMode] = useState("all"); // all or domain
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [filteredQuestions, setFilteredQuestions] = useState(QUESTIONS);
  const [showMenu, setShowMenu] = useState(true);

  const q = filteredQuestions[Math.min(qIndex, filteredQuestions.length - 1)];
  const monster = q ? (MONSTER_BY_DOMAIN[q.domain] || { emoji: "👾", name: "モンスター" }) : { emoji: "👾", name: "モンスター" };
  const accentColor = q ? (DOMAIN_COLORS[q.domain] || "#4fc3f7") : "#4fc3f7";

  useEffect(() => {
    if (!showMenu && q) initBattle();
  }, [showMenu]);

  const initBattle = () => {
    setMonsterHp(100);
    setMonsterDefeated(false);
    setMonsterFlashing(false);
    setMonsterShaking(false);
    setSelectedIdx(null);
    setShowDamage(null);
    setShowExplanation(false);
    setAnswered(false);
    setMessages([`${monster.name}が　あらわれた！`]);
    setPhase("question");
  };

  const startGame = (domain) => {
    const questions = domain ? QUESTIONS.filter(q => q.domain === domain) : QUESTIONS;
    setFilteredQuestions(questions);
    setSelectedDomain(domain);
    setQIndex(0);
    setPlayerHp(PLAYER_MAX_HP);
    setPlayerMp(PLAYER_MAX_MP);
    setPlayerLevel(1);
    setPlayerExp(0);
    setTotalCorrect(0);
    setTotalGold(0);
    setShowMenu(false);
  };

  const handleAnswer = async (idx) => {
    if (answered || phase !== "question") return;
    setAnswered(true);
    setSelectedIdx(idx);
    setPhase("animating");
    const correct = idx === q.correct;

    if (correct) {
      const dmg = Math.floor(Math.random() * 15) + 20;
      setMonsterShaking(true);
      await delay(120);
      setMonsterShaking(false);
      setMonsterFlashing(true);
      setShowDamage({ value: dmg, correct: true });
      const newMHp = Math.max(0, monsterHp - dmg);
      setMonsterHp(newMHp);
      setMessages([`せいかい！　${monster.name}に　${dmg}の　ダメージ！`]);
      await delay(500);
      setMonsterFlashing(false);
      setShowDamage(null);

      const newExp = playerExp + 8;
      const newLv = Math.floor(newExp / 50) + 1;
      if (newLv > playerLevel) setPlayerLevel(newLv);
      setPlayerExp(newExp);
      setTotalCorrect(c => c + 1);
      setTotalGold(g => g + 3);

      if (newMHp <= 0) {
        setMonsterDefeated(true);
        await delay(600);
        setMessages([`${monster.name}を　たおした！`, "8けいけんちを　かくとく！"]);
      } else {
        setMessages([`せいかい！　ダメージ: ${dmg}`]);
      }
    } else {
      const pDmg = Math.floor(Math.random() * 8) + 5;
      setPlayerShaking(true);
      setShowDamage({ value: pDmg, correct: false, onPlayer: true });
      const newHp = Math.max(0, playerHp - pDmg);
      setPlayerHp(newHp);
      setMessages([`まちがい！　${monster.name}の　はんげき！`, `${pDmg}の　ダメージを　うけた！`]);
      await delay(400);
      setPlayerShaking(false);
      setShowDamage(null);

      if (newHp <= 0) {
        setMessages(["HPが　ゼロに　なった！", "しんでしまった..."]);
        setPhase("gameover");
        return;
      }
    }

    await delay(300);
    setShowExplanation(true);
    setPhase("result");
  };

  const handleNext = () => {
    const next = qIndex + 1;
    if (next >= filteredQuestions.length) {
      setPhase("clear");
    } else {
      setQIndex(next);
      setMonsterHp(100);
      setMonsterDefeated(false);
      setMonsterFlashing(false);
      setMonsterShaking(false);
      setSelectedIdx(null);
      setShowDamage(null);
      setShowExplanation(false);
      setAnswered(false);
      const nextQ = filteredQuestions[next];
      const nextMonster = MONSTER_BY_DOMAIN[nextQ.domain] || { emoji: "👾", name: "モンスター" };
      setMessages([`${nextMonster.name}が　あらわれた！`]);
      setPhase("question");
    }
  };

  const choiceBg = (i) => {
    if (!answered) return "linear-gradient(135deg, #0d1f3c, #162440)";
    if (i === q.correct) return "linear-gradient(135deg, #1b3a1b, #2e5e2e)";
    if (i === selectedIdx && i !== q.correct) return "linear-gradient(135deg, #3a1b1b, #5e2e2e)";
    return "linear-gradient(135deg, #0a1628, #0d1e38)";
  };
  const choiceBorderColor = (i) => {
    if (!answered) return "#2a5298";
    if (i === q.correct) return "#66bb6a";
    if (i === selectedIdx && i !== q.correct) return "#ef5350";
    return "#1a2a4a";
  };
  const choiceTextColor = (i) => {
    if (!answered) return "#e2e8f0";
    if (i === q.correct) return "#a5d6a7";
    if (i === selectedIdx && i !== q.correct) return "#ef9a9a";
    return "#37474f";
  };

  // ===== メニュー画面 =====
  if (showMenu) {
    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=DotGothic16&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          @keyframes starPulse { 0%,100%{opacity:0.2} 50%{opacity:0.9} }
          @keyframes fadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        `}</style>
        <div style={{
          minHeight: "100vh",
          background: "linear-gradient(160deg, #060a18 0%, #0a1020 60%, #0e1428 100%)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "'DotGothic16', monospace",
          padding: 16, position: "relative",
        }}>
          {[...Array(30)].map((_, i) => (
            <div key={i} style={{
              position: "fixed", width: 2, height: 2, background: "#fff", borderRadius: "50%",
              left: `${(i * 37 + 13) % 100}%`, top: `${(i * 23 + 7) % 80}%`,
              animation: `starPulse ${1.5 + (i % 3) * 0.7}s infinite`,
              animationDelay: `${(i * 0.13) % 2}s`, pointerEvents: "none",
            }} />
          ))}

          <div style={{ width: "100%", maxWidth: 480, animation: "fadeIn 0.5s ease" }}>
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <div style={{ fontSize: 10, color: "#4a6fa5", letterSpacing: 5, marginBottom: 10 }}>⚔ AWS GDA-C01 ⚔</div>
              <div style={{ fontSize: 22, color: "#ffd700", textShadow: "0 0 20px #ffd700", marginBottom: 6 }}>
                もぎしけん　ドラクエ
              </div>
              <div style={{ fontSize: 11, color: "#546e7a" }}>全{QUESTIONS.length}問　ドメイン別に挑戦できます</div>
            </div>

            <div style={{
              background: "rgba(10,16,32,0.9)", border: "2px solid #2a4a7f",
              borderRadius: 8, padding: "20px 16px",
              display: "flex", flexDirection: "column", gap: 10,
            }}>
              <button onClick={() => startGame(null)} style={{
                background: "linear-gradient(135deg, #1a3a6a, #2a5298)",
                border: "2px solid #4a90d9", borderRadius: 6,
                color: "#ffd700", fontFamily: "'DotGothic16', monospace",
                fontSize: 14, padding: "12px", cursor: "pointer", letterSpacing: 1,
              }}>
                ▶ 全問チャレンジ（{QUESTIONS.length}問）
              </button>

              <div style={{ fontSize: 10, color: "#4a6fa5", letterSpacing: 2, textAlign: "center", marginTop: 4 }}>
                ── ドメイン別 ──
              </div>

              {Object.entries(DOMAIN_COLORS).map(([domain, color]) => {
                const count = QUESTIONS.filter(q => q.domain === domain).length;
                return (
                  <button key={domain} onClick={() => startGame(domain)} style={{
                    background: `linear-gradient(135deg, ${color}20, ${color}10)`,
                    border: `1px solid ${color}60`, borderRadius: 6,
                    color: "#e2e8f0", fontFamily: "'DotGothic16', monospace",
                    fontSize: 12, padding: "10px 14px", cursor: "pointer",
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                  }}>
                    <span style={{ color }}>{domain}</span>
                    <span style={{ fontSize: 10, color: "#546e7a" }}>{count}問</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </>
    );
  }

  // ===== ゲーム画面 =====
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DotGothic16&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes starPulse { 0%,100%{opacity:0.2} 50%{opacity:0.9} }
        @keyframes floatDmg { 0%{opacity:1;transform:translateY(0) scale(1.3)} 100%{opacity:0;transform:translateY(-60px) scale(0.8)} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes enemyShake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-8px)} 75%{transform:translateX(8px)} }
        @keyframes slideIn { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
        @keyframes playerShake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(6px)} 75%{transform:translateX(-6px)} }
      `}</style>

      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, #060a18 0%, #0a1020 60%, #0e1428 100%)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'DotGothic16', monospace",
        padding: 12, position: "relative", overflow: "hidden",
      }}>
        {[...Array(30)].map((_, i) => (
          <div key={i} style={{
            position: "fixed", width: 2, height: 2, background: "#fff", borderRadius: "50%",
            left: `${(i * 37 + 13) % 100}%`, top: `${(i * 23 + 7) % 70}%`,
            animation: `starPulse ${1.5 + (i % 3) * 0.7}s infinite`,
            animationDelay: `${(i * 0.13) % 2}s`, pointerEvents: "none",
          }} />
        ))}

        <div style={{ width: "100%", maxWidth: 540, position: "relative", zIndex: 1 }}>

          {/* ヘッダー */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <button onClick={() => setShowMenu(true)} style={{
              background: "transparent", border: "1px solid #2a4a7f",
              borderRadius: 4, color: "#546e7a",
              fontFamily: "'DotGothic16', monospace", fontSize: 10,
              padding: "3px 8px", cursor: "pointer",
            }}>◀ もどる</button>
            <div style={{ fontSize: 9, color: accentColor, letterSpacing: 2 }}>{q?.domain}</div>
            <div style={{ fontSize: 9, color: "#546e7a" }}>{qIndex + 1}/{filteredQuestions.length}</div>
          </div>

          {/* プログレスバー */}
          <div style={{ height: 3, background: "#0d1628", borderRadius: 2, marginBottom: 10, border: "1px solid #1a2a4a" }}>
            <div style={{
              height: "100%", width: `${(qIndex / filteredQuestions.length) * 100}%`,
              background: `linear-gradient(90deg, #4a6fa5, ${accentColor})`,
              borderRadius: 2, transition: "width 0.8s ease",
              boxShadow: `0 0 8px ${accentColor}`,
            }} />
          </div>

          {/* バトルフィールド */}
          <div style={{
            background: "linear-gradient(180deg, #060e1e 0%, #0a1628 50%, #0d1a10 100%)",
            border: `2px solid ${accentColor}40`,
            borderRadius: 8, padding: "16px 20px 12px",
            marginBottom: 8, minHeight: 180, position: "relative", overflow: "hidden",
            boxShadow: `0 0 30px ${accentColor}15`,
          }}>
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0, height: 32,
              background: "linear-gradient(180deg, #0d1a10 0%, #060e08 100%)",
              borderTop: `1px solid ${accentColor}20`,
            }} />

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", position: "relative" }}>
              {/* プレイヤーステータス */}
              <div style={{
                background: "rgba(10,22,40,0.9)", border: "2px solid #2a4a7f",
                borderRadius: 6, padding: "8px 14px",
                animation: playerShaking ? "playerShake 0.3s ease" : "none",
              }}>
                <div style={{ fontSize: 12, color: "#ffd700", marginBottom: 6 }}>
                  ゆうしゃ <span style={{ fontSize: 9, color: "#90caf9" }}>Lv.{playerLevel}</span>
                </div>
                {[
                  { label: "HP", val: playerHp, max: PLAYER_MAX_HP, color: playerHp / PLAYER_MAX_HP > 0.5 ? "#66bb6a" : playerHp / PLAYER_MAX_HP > 0.25 ? "#ffa726" : "#ef5350" },
                  { label: "MP", val: playerMp, max: PLAYER_MAX_MP, color: "#42a5f5" },
                ].map(({ label, val, max, color }) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
                    <span style={{ fontSize: 9, color: label === "HP" ? "#ef5350" : "#42a5f5", width: 18 }}>{label}</span>
                    <div style={{ width: 80, height: 5, background: "#0a1628", borderRadius: 3 }}>
                      <div style={{ height: "100%", width: `${Math.max(0, val / max * 100)}%`, background: color, borderRadius: 3, transition: "width 0.5s" }} />
                    </div>
                    <span style={{ fontSize: 9, color: "#cfd8dc", width: 32, textAlign: "right" }}>{val}/{max}</span>
                  </div>
                ))}
                <div style={{ fontSize: 9, color: "#546e7a", marginTop: 2 }}>EXP: {playerExp}</div>

                {/* プレイヤーダメージ */}
                {showDamage?.onPlayer && (
                  <div style={{
                    position: "absolute", top: "30%", left: "10%",
                    fontSize: 22, fontWeight: "bold", color: "#ef5350",
                    textShadow: "2px 2px 0 #000",
                    animation: "floatDmg 1s ease-out forwards",
                    pointerEvents: "none",
                  }}>-{showDamage.value}</div>
                )}
              </div>

              {/* モンスター */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
                <div style={{ fontSize: 10, color: accentColor, letterSpacing: 1 }}>{monster.name}</div>
                <div style={{
                  fontSize: 80, lineHeight: 1, userSelect: "none",
                  filter: monsterDefeated ? "grayscale(1) opacity(0.2)"
                    : monsterFlashing ? "brightness(5)"
                    : `drop-shadow(0 0 16px ${accentColor})`,
                  animation: monsterShaking ? "enemyShake 0.3s ease" : "none",
                  opacity: monsterDefeated ? 0 : 1,
                  transition: "opacity 0.5s, filter 0.15s",
                }}>
                  {monster.emoji}
                </div>
                <div style={{ width: 130 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                    <span style={{ fontSize: 9, color: accentColor }}>HP</span>
                    <span style={{ fontSize: 9, color: "#546e7a" }}>{monsterHp}/100</span>
                  </div>
                  <div style={{ height: 5, background: "#111", borderRadius: 3 }}>
                    <div style={{
                      height: "100%", width: `${monsterHp}%`,
                      background: monsterHp > 50 ? "#66bb6a" : monsterHp > 25 ? "#ffa726" : "#ef5350",
                      borderRadius: 3, transition: "width 0.5s",
                    }} />
                  </div>
                </div>

                {/* モンスターダメージ */}
                {showDamage?.correct && (
                  <div style={{
                    position: "absolute", top: "20%", right: "10%",
                    fontSize: 26, fontWeight: "bold", color: "#ffd700",
                    textShadow: "2px 2px 0 #000",
                    animation: "floatDmg 1s ease-out forwards",
                    pointerEvents: "none",
                  }}>-{showDamage.value}</div>
                )}
              </div>
            </div>
          </div>

          {/* メッセージ */}
          <div style={{
            background: "linear-gradient(135deg, #060e1e 0%, #0a1628 100%)",
            border: `2px solid ${accentColor}50`, borderRadius: 6,
            padding: "10px 14px", marginBottom: 6, minHeight: 52,
            boxShadow: `0 0 12px ${accentColor}15`, position: "relative",
          }}>
            {messages.map((m, i) => (
              <div key={i} style={{ fontSize: 13, color: "#e2e8f0", lineHeight: 1.7 }}>
                {i === messages.length - 1 ? <TypewriterText text={m} /> : m}
              </div>
            ))}
            {(phase === "question" || phase === "result") && (
              <span style={{ position: "absolute", bottom: 6, right: 10, fontSize: 12, color: accentColor, animation: "blink 0.8s infinite" }}>▼</span>
            )}
          </div>

          {/* 問題文 */}
          {(phase === "question" || phase === "result" || phase === "animating") && q && (
            <div style={{
              background: "rgba(6,14,30,0.85)", border: `1px solid ${accentColor}30`,
              borderRadius: 6, padding: "8px 14px", marginBottom: 6,
              fontSize: 12, color: "#b0bec5", lineHeight: 1.7,
            }}>
              <span style={{ color: accentColor, fontSize: 9, marginRight: 6, letterSpacing: 1 }}>【{q.domain}】</span>
              {q.question}
            </div>
          )}

          {/* 選択肢 */}
          {(phase === "question" || phase === "result") && q && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 6 }}>
              {q.choices.map((c, i) => (
                <button key={i} onClick={() => handleAnswer(i)} disabled={answered} style={{
                  background: choiceBg(i),
                  border: `2px solid ${choiceBorderColor(i)}`,
                  borderRadius: 4, color: choiceTextColor(i),
                  fontFamily: "'DotGothic16', monospace",
                  fontSize: 11, padding: "8px 10px",
                  cursor: answered ? "default" : "pointer",
                  textAlign: "left", lineHeight: 1.4,
                  display: "flex", alignItems: "flex-start", gap: 6,
                  transition: "all 0.2s",
                }}>
                  <span style={{ color: answered && i === q.correct ? "#66bb6a" : answered && i === selectedIdx ? "#ef5350" : accentColor, flexShrink: 0 }}>
                    {answered ? (i === q.correct ? "✓" : i === selectedIdx ? "✗" : ["Ａ","Ｂ","Ｃ","Ｄ"][i]) : ["Ａ","Ｂ","Ｃ","Ｄ"][i]}
                  </span>
                  {c}
                </button>
              ))}
            </div>
          )}

          {/* 解説 */}
          {showExplanation && q?.explanation && (
            <div style={{
              background: "linear-gradient(135deg, #0a1a0a, #0d200d)",
              border: "1px solid #2e5e2e", borderRadius: 6,
              padding: "8px 14px", marginBottom: 6,
              fontSize: 11, color: "#a5d6a7", lineHeight: 1.6,
              animation: "slideIn 0.3s ease",
            }}>
              <span style={{ color: "#66bb6a", marginRight: 6 }}>💡 かいせつ:</span>
              {q.explanation}
            </div>
          )}

          {/* 次へボタン */}
          {phase === "result" && (
            <button onClick={handleNext} style={{
              width: "100%",
              background: `linear-gradient(135deg, #0d2040, #1a3a6a)`,
              border: `2px solid ${accentColor}`,
              borderRadius: 6, color: "#ffd700",
              fontFamily: "'DotGothic16', monospace",
              fontSize: 13, padding: "10px",
              cursor: "pointer", letterSpacing: 2,
              boxShadow: `0 0 12px ${accentColor}30`,
            }}>
              ▶ つぎへ ({qIndex + 1}/{filteredQuestions.length})
            </button>
          )}

          {/* アニメーション中 */}
          {phase === "animating" && (
            <div style={{ textAlign: "center", padding: 14, color: "#4a6fa5", fontSize: 12, letterSpacing: 3 }}>
              ・・・
            </div>
          )}

          {/* ゲームオーバー */}
          {phase === "gameover" && (
            <div style={{
              background: "linear-gradient(135deg, #1a0505, #2d0a0a)",
              border: "2px solid #c62828", borderRadius: 8, padding: 20, textAlign: "center",
            }}>
              <div style={{ fontSize: 20, color: "#ef5350", letterSpacing: 4, marginBottom: 8 }}>GAME OVER</div>
              <div style={{ fontSize: 11, color: "#78909c", marginBottom: 4 }}>せいかい: {totalCorrect}もん / {qIndex + 1}もん</div>
              <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 12 }}>
                <button onClick={() => { setQIndex(0); setPlayerHp(PLAYER_MAX_HP); setPlayerMp(PLAYER_MAX_MP); setPlayerLevel(1); setPlayerExp(0); setTotalCorrect(0); setTotalGold(0); initBattle(); }} style={{
                  background: "linear-gradient(135deg, #4a0a0a, #7a1010)",
                  border: "2px solid #c62828", borderRadius: 4,
                  color: "#ffd700", fontFamily: "'DotGothic16', monospace",
                  fontSize: 12, padding: "8px 18px", cursor: "pointer",
                }}>▶ もう一度</button>
                <button onClick={() => setShowMenu(true)} style={{
                  background: "transparent", border: "1px solid #546e7a",
                  borderRadius: 4, color: "#546e7a",
                  fontFamily: "'DotGothic16', monospace",
                  fontSize: 12, padding: "8px 18px", cursor: "pointer",
                }}>メニューへ</button>
              </div>
            </div>
          )}

          {/* クリア */}
          {phase === "clear" && (
            <div style={{
              background: "linear-gradient(135deg, #051a05, #0a2d0a)",
              border: "2px solid #388e3c", borderRadius: 8, padding: 20, textAlign: "center",
            }}>
              <div style={{ fontSize: 18, color: "#ffd700", letterSpacing: 4, marginBottom: 8 }}>🏆 クリア！</div>
              <div style={{ fontSize: 12, color: "#a5d6a7", marginBottom: 4 }}>せいかい: {totalCorrect + 1}もん / {filteredQuestions.length}もん</div>
              <div style={{ fontSize: 11, color: "#ffe082", marginBottom: 4 }}>かくとくゴールド: {totalGold + 3}G</div>
              <div style={{ fontSize: 11, color: "#90caf9", marginBottom: 14 }}>さいしゅうレベル: Lv.{playerLevel}</div>
              <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
                <button onClick={() => { setQIndex(0); setPlayerHp(PLAYER_MAX_HP); setPlayerMp(PLAYER_MAX_MP); setPlayerLevel(1); setPlayerExp(0); setTotalCorrect(0); setTotalGold(0); initBattle(); }} style={{
                  background: "linear-gradient(135deg, #1b5e20, #2e7d32)",
                  border: "2px solid #66bb6a", borderRadius: 4,
                  color: "#ffd700", fontFamily: "'DotGothic16', monospace",
                  fontSize: 12, padding: "8px 18px", cursor: "pointer",
                }}>▶ もう一度</button>
                <button onClick={() => setShowMenu(true)} style={{
                  background: "transparent", border: "1px solid #546e7a",
                  borderRadius: 4, color: "#546e7a",
                  fontFamily: "'DotGothic16', monospace",
                  fontSize: 12, padding: "8px 18px", cursor: "pointer",
                }}>メニューへ</button>
              </div>
            </div>
          )}

          {/* ドット進捗 */}
          <div style={{ display: "flex", justifyContent: "center", gap: 4, marginTop: 10, flexWrap: "wrap" }}>
            {filteredQuestions.map((fq, i) => (
              <div key={i} style={{
                width: 6, height: 6, borderRadius: "50%",
                background: i < qIndex ? DOMAIN_COLORS[fq.domain] : i === qIndex ? "#ffd700" : "#1a2a4a",
                border: "1px solid #2a4a7f", transition: "background 0.5s",
              }} />
            ))}
          </div>

          {/* ドメイン凡例 */}
          <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 6, flexWrap: "wrap" }}>
            {Object.entries(DOMAIN_COLORS).map(([d, c]) => (
              <div key={d} style={{ display: "flex", alignItems: "center", gap: 3 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: c }} />
                <span style={{ fontSize: 8, color: "#546e7a" }}>{d}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
