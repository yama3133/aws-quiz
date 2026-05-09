import { useState, useEffect } from "react";
import { questions as RAW_QUESTIONS } from './questions.js';

// 選択肢をシャッフルして正答インデックスを更新
function shuffleChoices(q) {
  const indexed = q.options.map((opt, i) => ({ opt, isCorrect: i === q.answer }));
  for (let i = indexed.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indexed[i], indexed[j]] = [indexed[j], indexed[i]];
  }
  return {
    ...q,
    options: indexed.map(x => x.opt),
    answer: indexed.findIndex(x => x.isCorrect),
  };
}

const QUESTIONS = RAW_QUESTIONS.map(shuffleChoices);

const MONSTERS = [
  { name: "スライム", emoji: "🟦", color: "#4488ff" },
  { name: "ドラキー", emoji: "🦇", color: "#9966cc" },
  { name: "ゴースト", emoji: "👻", color: "#aaaacc" },
  { name: "メタルスライム", emoji: "🔘", color: "#cccccc" },
  { name: "キメラ", emoji: "🦅", color: "#cc8844" },
  { name: "ゴーレム", emoji: "🗿", color: "#887766" },
  { name: "ドラゴン", emoji: "🐉", color: "#cc4444" },
  { name: "バブルスライム", emoji: "🟢", color: "#44cc44" },
  { name: "じゅうおう", emoji: "🐯", color: "#ffaa22" },
  { name: "プロンプトスライム", emoji: "🟦", color: "#4488ff" },
  { name: "トークンこうもり", emoji: "🦇", color: "#9966cc" },
  { name: "エンベディングゴースト", emoji: "👻", color: "#aaaadd" },
  { name: "RAGゾンビ", emoji: "🧟", color: "#66aa66" },
  { name: "ハルシネーションスライム", emoji: "🫧", color: "#44aacc" },
  { name: "ファインチューンオーク", emoji: "🪓", color: "#cc9944" },
  { name: "LoRAリッチ", emoji: "🧬", color: "#cc4488" },
  { name: "ベクトルウィッチ", emoji: "🧙", color: "#8844cc" },
  { name: "チャンキングゴブリン", emoji: "🪨", color: "#998877" },
  { name: "コサインデーモン", emoji: "😈", color: "#cc4444" },
  { name: "ガードレールナイト", emoji: "🛡️", color: "#44aaaa" },
  { name: "プライバシーリンク", emoji: "🔗", color: "#4488cc" },
  { name: "PIIマスカー", emoji: "🎭", color: "#cc4477" },
  { name: "クロスリージョンドラゴン", emoji: "🐉", color: "#cc3333" },
  { name: "バッチベア", emoji: "🐻", color: "#cc9944" },
  { name: "ストリームスペクター", emoji: "💫", color: "#44cccc" },
  { name: "コンバースナイト", emoji: "⚔️", color: "#4466cc" },
  { name: "アクショングループドラゴン", emoji: "🐲", color: "#44aa44" },
  { name: "ReActウォーリア", emoji: "🗡️", color: "#cc8833" },
  { name: "トレースデーモン", emoji: "🔍", color: "#9966cc" },
  { name: "クエリリライタ", emoji: "✏️", color: "#44aaaa" },
  { name: "ハイブリッドサーチャー", emoji: "🔎", color: "#4488cc" },
  { name: "リランクゴーレム", emoji: "🗿", color: "#998877" },
  { name: "セマンティックチャンカー", emoji: "✂️", color: "#cc4477" },
  { name: "メタデータフィルター", emoji: "🗂️", color: "#8844cc" },
  { name: "インジェスチョンワーム", emoji: "🪱", color: "#44aa66" },
  { name: "OpenSearchウルフ", emoji: "🐺", color: "#4488cc" },
  { name: "pgvectorスネーク", emoji: "🐍", color: "#44aa44" },
  { name: "マトリョーシカスライム", emoji: "🪆", color: "#9966cc" },
  { name: "ANNスコーピオン", emoji: "🦂", color: "#cc8833" },
  { name: "QuantizeキメラQ", emoji: "⚡", color: "#cccc22" },
  { name: "蒸留デーモン", emoji: "🧪", color: "#44aacc" },
  { name: "ROUGEワイバーン", emoji: "🦅", color: "#cc3333" },
  { name: "BLEUドラキー", emoji: "💙", color: "#4488cc" },
  { name: "パープレキシティゴースト", emoji: "🌀", color: "#9966cc" },
  { name: "フェイスフルネスドラゴン", emoji: "🔥", color: "#cc5533" },
  { name: "コンテキストプレシジョン", emoji: "🎯", color: "#44aa44" },
  { name: "RLHFウォーリア", emoji: "🤺", color: "#cc8833" },
  { name: "DPOナイト", emoji: "🏇", color: "#8844cc" },
  { name: "LLMジャッジ", emoji: "⚖️", color: "#4488cc" },
  { name: "グラウンドトゥルースゴースト", emoji: "👁️", color: "#44aacc" },
  { name: "バイアスデーモン", emoji: "😤", color: "#cc4444" },
  { name: "クラリファイサー", emoji: "🔭", color: "#44aaaa" },
  { name: "SHAPウィザード", emoji: "🧙", color: "#9966cc" },
  { name: "ベンチマークドラゴン", emoji: "📊", color: "#cc8833" },
  { name: "プロビジョンドスループット", emoji: "🏭", color: "#998877" },
  { name: "テンパラチャーウィッチ", emoji: "🌡️", color: "#9966cc" },
  { name: "TopPスペクター", emoji: "🎲", color: "#44aacc" },
  { name: "TopKゴブリン", emoji: "🎰", color: "#cc9944" },
  { name: "マルチモーダルドラゴン", emoji: "🦄", color: "#9966cc" },
  { name: "ビジョンワイバーン", emoji: "👀", color: "#4488cc" },
  { name: "アウトペイントスライム", emoji: "🎨", color: "#cc8833" },
  { name: "ウォーターマークゴーレム", emoji: "💧", color: "#4488cc" },
  { name: "KMSキーウォーリア", emoji: "🗝️", color: "#cccc22" },
  { name: "PrivateLinkナイト", emoji: "🔗", color: "#4488cc" },
  { name: "VPCエンドポイントゴースト", emoji: "🌐", color: "#44aa66" },
  { name: "CloudTrailスカウト", emoji: "🕵️", color: "#998877" },
  { name: "IAMポリシーウォーリア", emoji: "📋", color: "#cc8833" },
  { name: "最小権限デーモン", emoji: "🔒", color: "#cc4444" },
  { name: "責任共有ドラゴン", emoji: "🤝", color: "#44aa44" },
  { name: "コンプライアンスゴーレム", emoji: "📜", color: "#9966cc" },
  { name: "HIPAAウォーリア", emoji: "🏥", color: "#4488cc" },
  { name: "GDPRデーモン", emoji: "🌍", color: "#4488cc" },
  { name: "モデルインボケーションロガー", emoji: "📝", color: "#44aaaa" },
  { name: "デリミタゴブリン", emoji: "🪣", color: "#cc9944" },
  { name: "サニタイズウィッチ", emoji: "🧹", color: "#cc4477" },
  { name: "HITLナイト", emoji: "🧑", color: "#8844cc" },
  { name: "コンテキストグラウンディング", emoji: "⚓", color: "#44aacc" },
  { name: "デナイドトピックデーモン", emoji: "🚷", color: "#cc3333" },
  { name: "ワードフィルターゾンビ", emoji: "🚫", color: "#cc4444" },
  { name: "エージェントエイリアス", emoji: "🎭", color: "#9966cc" },
  { name: "ユーザーコンファメーション", emoji: "✅", color: "#44aa44" },
  { name: "ステップファンクションナイト", emoji: "🔀", color: "#4488cc" },
  { name: "スロットリングデーモン", emoji: "⏱️", color: "#cc4444" },
  { name: "エクスポネンシャルバックオフ", emoji: "📈", color: "#44aa66" },
  { name: "マルチリージョンドラゴン", emoji: "🌍", color: "#9966cc" },
  { name: "カスタムRAGウォーリア", emoji: "⚗️", color: "#44aaaa" },
  { name: "InvokeModelウォーリア", emoji: "⚡", color: "#cccc22" },
  { name: "ツールユースデーモン", emoji: "🛠️", color: "#cc3333" },
  { name: "Lambdaタイムアウトワーム", emoji: "⏰", color: "#cc8833" },
  { name: "コンカレンシーモンスター", emoji: "🐙", color: "#9966cc" },
  { name: "OOVゾンビ", emoji: "❓", color: "#8844cc" },
  { name: "コンテキストウィンドウドラゴン", emoji: "🪟", color: "#4488cc" },
  { name: "PoC戦士", emoji: "🧪", color: "#44aacc" },
  { name: "データポイズニングデーモン", emoji: "☠️", color: "#cc3333" },
  { name: "プロンプトインジェクター", emoji: "💉", color: "#cc5533" },
  { name: "ジェイルブレイクゴースト", emoji: "🔓", color: "#44aacc" },
  { name: "データソブリンティゴーレム", emoji: "👑", color: "#cccc22" },
  { name: "監査ログスカウト", emoji: "📋", color: "#44aaaa" },
  { name: "インシデントレスポンサー", emoji: "🚨", color: "#cc3333" },
  { name: "エンクリプションドラゴン", emoji: "🔐", color: "#cc8833" },
  { name: "WAFデーモン", emoji: "🔥", color: "#cc5533" },
  { name: "GuardDutyスカウト", emoji: "🕵️", color: "#44aa44" },
  { name: "SecurityHubウィザード", emoji: "🏰", color: "#9966cc" },
  { name: "SageMakerサイエンティスト", emoji: "🔬", color: "#4488cc" },
  { name: "EC2GPUドラゴン", emoji: "🖥️", color: "#cc3333" },
  { name: "AutoScalingドラゴン", emoji: "📈", color: "#cc5533" },
  { name: "DynamoDBモンスター", emoji: "⚡", color: "#cccc22" },
  { name: "チェーンオブソートドラゴン", emoji: "⛓️", color: "#4488cc" },
  { name: "アテンションドラゴン", emoji: "🧠", color: "#cc5533" },
  { name: "トランスフォーマーウォーリア", emoji: "⚙️", color: "#4488cc" },
  { name: "オーバーフィットデーモン", emoji: "🎭", color: "#cc4444" },
  { name: "ハイパーパラメータデーモン", emoji: "🎛️", color: "#9966cc" },
  { name: "ラストボスΩ", emoji: "🐉", color: "#ff2222" },
];

const MAX_HP = 50;
const delay = ms => new Promise(r => setTimeout(r, ms));
const clean = (s) => s.replace(/^[A-D]\.\s*/, "");

const BOX = {
  border: "2px solid #fff",
  background: "#000",
  padding: "10px 14px",
};

export default function FCQuiz() {
  const [screen, setScreen] = useState("title");
  const [qIndex, setQIndex] = useState(0);
  const [filteredQ, setFilteredQ] = useState([]);
  const [phase, setPhase] = useState("command");
  const [hp, setHp] = useState(MAX_HP);
  const [monsterHp, setMonsterHp] = useState(30);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [messages, setMessages] = useState([]);
  const [showExpl, setShowExpl] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [shakeMonster, setShakeMonster] = useState(false);
  const [shakePlayer, setShakePlayer] = useState(false);
  const [blink, setBlink] = useState(true);
  const [cursor, setCursor] = useState(0);

  const q = filteredQ[Math.min(qIndex, filteredQ.length - 1)];
  const monster = MONSTERS[Math.min(qIndex, MONSTERS.length - 1)];
  const monsterMax = 30;

  useEffect(() => {
    const iv = setInterval(() => setBlink(b => !b), 500);
    return () => clearInterval(iv);
  }, []);

  const startGame = (mode) => {
    const qs = mode === "random"
      ? [...QUESTIONS].sort(() => Math.random() - 0.5).slice(0, 20)
      : QUESTIONS;
    setFilteredQ(qs);
    setQIndex(0);
    setHp(MAX_HP);
    setMonsterHp(30);
    setSelectedAnswer(null);
    setAnswered(false);
    setShowExpl(false);
    setCorrectCount(0);
    setPhase("command");
    setCursor(0);
    setMessages([`${MONSTERS[0].name}が　あらわれた！`]);
    setScreen("battle");
  };

  const CMDS = ["たたかう", "じゅもん", "どうぐ", "にげる"];

  const handleCmd = (i) => {
    setCursor(i);
    if (i === 0) {
      setMessages([q.question]);
      setPhase("question");
      setCursor(0);
    } else if (i === 3) {
      setMessages(["しかし　まわりこまれた！"]);
    } else {
      setMessages(["いまは　つかえない！"]);
    }
  };

  const handleAnswer = async (idx) => {
    if (answered || phase !== "question") return;
    setSelectedAnswer(idx);
    setAnswered(true);
    setPhase("animating");
    const isCorrect = idx === q.answer;

    if (isCorrect) {
      const dmg = Math.floor(Math.random() * 8) + 8;
      setShakeMonster(true);
      await delay(200); setShakeMonster(false);
      const newMHp = Math.max(0, monsterHp - dmg);
      setMonsterHp(newMHp);
      setCorrectCount(c => c + 1);
      setMessages(newMHp <= 0
        ? [`ゆうしゃの　こうげき！`, `${monster.name}に　${dmg}ポイントの　ダメージ！`, `${monster.name}を　たおした！`]
        : [`ゆうしゃの　こうげき！`, `${monster.name}に　${dmg}ポイントの　ダメージ！`]
      );
    } else {
      const pDmg = Math.floor(Math.random() * 6) + 4;
      const newHp = Math.max(0, hp - pDmg);
      setHp(newHp);
      setShakePlayer(true);
      await delay(200); setShakePlayer(false);
      setMessages([`まちがい！`, `${monster.name}の　こうげき！`, `ゆうしゃは　${pDmg}ポイントの　ダメージ！`]);
      if (newHp <= 0) {
        await delay(800);
        setMessages(["ゆうしゃは　しにました。", "ゲームオーバー…"]);
        setPhase("gameover");
        return;
      }
    }

    await delay(300);
    setShowExpl(true);
    setPhase("result");
  };

  const handleNext = () => {
    const next = qIndex + 1;
    if (next >= filteredQ.length) {
      setMessages([`すべての　てきを　たおした！`, `せいかい　${correctCount + 1} / ${filteredQ.length}　もん`]);
      setPhase("clear");
      return;
    }
    const nm = MONSTERS[Math.min(next, MONSTERS.length - 1)];
    setQIndex(next);
    setMonsterHp(30);
    setSelectedAnswer(null);
    setAnswered(false);
    setShowExpl(false);
    setMessages([`${nm.name}が　あらわれた！`]);
    setPhase("command");
    setCursor(0);
  };

  // ===== タイトル画面 =====
  if (screen === "title") {
    return (
      <div style={{
        background: "#000", minHeight: "100vh",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        fontFamily: "'DotGothic16', monospace",
        gap: 32, padding: 16,
      }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=DotGothic16&display=swap');`}</style>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 11, color: "#888", marginBottom: 12, lineHeight: 2, letterSpacing: 2 }}>
            AWS Certified Generative AI Developer Professional
          </div>
          <div style={{ fontSize: 18, color: "#fff", marginBottom: 6, letterSpacing: 4 }}>
            もぎしけん
          </div>
          <div style={{ fontSize: 12, color: "#ffff00", letterSpacing: 2 }}>
            全{QUESTIONS.length}問　モンスター200種
          </div>
        </div>

        <div style={{ border: "2px solid #fff", padding: "20px 32px", display: "flex", flexDirection: "column", gap: 16, minWidth: 280 }}>
          {[
            { label: `▶ 全問チャレンジ（${QUESTIONS.length}問）`, mode: "all" },
            { label: "　ランダム20問", mode: "random" },
          ].map(({ label, mode }, i) => (
            <div key={mode} onClick={() => startGame(mode)} style={{
              fontSize: 13, color: i === 0 ? "#fff" : "#aaa",
              cursor: "pointer", letterSpacing: 1,
              display: "flex", alignItems: "center", gap: 8,
            }}>
              {label}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ===== バトル画面（横長レイアウト） =====
  return (
    <div style={{
      background: "#000",
      minHeight: "100vh",
      fontFamily: "'DotGothic16', monospace",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 16,
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DotGothic16&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-8px)} 75%{transform:translateX(8px)} }
        @keyframes shakePl { 0%,100%{transform:translateX(0)} 25%{transform:translateX(6px)} 75%{transform:translateX(-6px)} }
      `}</style>

      <div style={{ width: "100%", maxWidth: 900, display: "flex", gap: 12 }}>

        {/* ── 左カラム：バトルフィールド ── */}
        <div style={{ width: 320, flexShrink: 0, display: "flex", flexDirection: "column", gap: 8 }}>

          {/* バトルフィールド */}
          <div style={{
            ...BOX,
            height: 220, position: "relative",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            {/* 進捗 */}
            <div style={{ position: "absolute", top: 8, left: 10, fontSize: 10, color: "#666", letterSpacing: 1 }}>
              {qIndex + 1}/{filteredQ.length}　○{correctCount}
            </div>

            {/* モンスター（右上） */}
            <div style={{
              position: "absolute", top: 28, right: 24, textAlign: "center",
              animation: shakeMonster ? "shake 0.3s ease" : "none",
            }}>
              <div style={{ fontSize: 10, color: monster?.color || "#fff", marginBottom: 4, letterSpacing: 1 }}>
                {monster?.name}
              </div>
              <div style={{ fontSize: 72, lineHeight: 1 }}>{monster?.emoji}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 6 }}>
                <span style={{ fontSize: 9, color: "#888" }}>HP</span>
                <div style={{ width: 70, height: 5, background: "#222", border: "1px solid #444" }}>
                  <div style={{
                    height: "100%", width: `${monsterHp / monsterMax * 100}%`,
                    background: monsterHp / monsterMax > 0.5 ? "#0f0" : monsterHp / monsterMax > 0.2 ? "#ff0" : "#f00",
                    transition: "width 0.3s",
                  }} />
                </div>
              </div>
            </div>

            {/* プレイヤー（左下） */}
            <div style={{
              position: "absolute", bottom: 18, left: 16,
              animation: shakePlayer ? "shakePl 0.3s ease" : "none",
            }}>
              <div style={{ fontSize: 11, color: "#ffff00", marginBottom: 4, letterSpacing: 1 }}>ゆうしゃ</div>
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <span style={{ fontSize: 10, color: "#f88" }}>HP</span>
                <div style={{ width: 90, height: 6, background: "#111", border: "1px solid #444" }}>
                  <div style={{
                    height: "100%", width: `${hp / MAX_HP * 100}%`,
                    background: hp / MAX_HP > 0.5 ? "#0f0" : hp / MAX_HP > 0.25 ? "#ff0" : "#f00",
                    transition: "width 0.3s",
                  }} />
                </div>
                <span style={{ fontSize: 10, color: "#fff" }}>{hp}/{MAX_HP}</span>
              </div>
            </div>

            {/* 地面 */}
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: "#fff" }} />
          </div>

          {/* メッセージウィンドウ */}
          <div style={{ ...BOX, minHeight: 100 }}>
            {messages.map((m, i) => (
              <div key={i} style={{ fontSize: 12, color: "#fff", lineHeight: 2, letterSpacing: 0.5 }}>{m}</div>
            ))}
            {(phase === "command" || phase === "result") && (
              <span style={{ fontSize: 12, color: blink ? "#fff" : "#000" }}>▼</span>
            )}
          </div>

          {/* 解説 */}
          {showExpl && q?.explanation && (
            <div style={{ ...BOX, borderColor: "#0f0", background: "#001500" }}>
              <div style={{ fontSize: 11, color: "#0f0", lineHeight: 2, letterSpacing: 0.3 }}>
                💡 {q.explanation}
              </div>
            </div>
          )}
        </div>

        {/* ── 右カラム：問題・コマンド・選択肢 ── */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>

          {/* 問題文 */}
          {(phase === "question" || phase === "result" || phase === "animating") && q && (
            <div style={{ ...BOX, borderColor: "#ffff00" }}>
              <div style={{ fontSize: 10, color: "#888", marginBottom: 6, letterSpacing: 1 }}>
                問{qIndex + 1}
              </div>
              <div style={{ fontSize: 12, color: "#ffff00", lineHeight: 2, letterSpacing: 0.5 }}>
                {q.question}
              </div>
            </div>
          )}

          {/* コマンドウィンドウ（command時のみ） */}
          {phase === "command" && (
            <div style={{ ...BOX }}>
              <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                {CMDS.map((cmd, i) => (
                  <div key={cmd} onClick={() => handleCmd(i)} style={{
                    fontSize: 13, color: cursor === i ? "#ffff00" : "#fff",
                    cursor: "pointer", letterSpacing: 1,
                    display: "flex", alignItems: "center", gap: 4,
                  }}>
                    <span style={{ color: cursor === i ? "#ffff00" : "#000", fontSize: 12 }}>
                      {cursor === i ? "▶" : "　"}
                    </span>
                    {cmd}
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 10, color: "#444", marginTop: 10, letterSpacing: 1 }}>
                のこり {filteredQ.length - qIndex - 1}問　No.{String(qIndex + 1).padStart(3, "0")}
              </div>
            </div>
          )}

          {/* 選択肢 */}
          {(phase === "question" || phase === "result") && q && (
            <div style={{ ...BOX, flex: 1 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {q.options.map((opt, i) => {
                  let color = "#fff";
                  if (answered) {
                    if (i === q.answer) color = "#0f0";
                    else if (i === selectedAnswer && i !== q.answer) color = "#ff4444";
                    else color = "#555";
                  }
                  return (
                    <div key={i} onClick={() => handleAnswer(i)} style={{
                      fontSize: 12, color,
                      padding: "6px 8px",
                      border: answered
                        ? i === q.answer ? "1px solid #0f0"
                        : i === selectedAnswer ? "1px solid #f44"
                        : "1px solid #222"
                        : "1px solid #444",
                      background: answered && i === q.answer ? "#001f00" : answered && i === selectedAnswer ? "#1f0000" : "#000",
                      cursor: answered ? "default" : "pointer",
                      display: "flex", gap: 10, alignItems: "flex-start",
                      letterSpacing: 0.3, lineHeight: 1.8,
                      borderRadius: 2,
                    }}>
                      <span style={{
                        flexShrink: 0, fontWeight: "bold",
                        color: answered && i === q.answer ? "#0f0"
                          : answered && i === selectedAnswer ? "#f44"
                          : "#ffff00",
                      }}>
                        {answered
                          ? i === q.answer ? "○"
                          : i === selectedAnswer ? "×"
                          : ["A","B","C","D"][i]
                          : ["A","B","C","D"][i]}
                      </span>
                      <span>{clean(opt)}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 次へ / ゲームオーバー / クリア */}
          {phase === "result" && (
            <div style={{ ...BOX }}>
              <div onClick={handleNext} style={{
                fontSize: 13, color: "#ffff00", cursor: "pointer", letterSpacing: 2,
                display: "flex", alignItems: "center", gap: 6,
              }}>
                <span style={{ color: blink ? "#ffff00" : "#000" }}>▶</span>
                つぎへ　({qIndex + 1}/{filteredQ.length})
              </div>
            </div>
          )}

          {phase === "animating" && (
            <div style={{ ...BOX }}>
              <div style={{ fontSize: 12, color: "#555", letterSpacing: 2 }}>・・・</div>
            </div>
          )}

          {phase === "gameover" && (
            <div style={{ ...BOX, borderColor: "#f44" }}>
              <div style={{ fontSize: 14, color: "#f44", letterSpacing: 4, marginBottom: 12 }}>GAME OVER</div>
              <div style={{ fontSize: 11, color: "#888", marginBottom: 12, letterSpacing: 1 }}>
                せいかい　{correctCount} / {qIndex + 1}　もん
              </div>
              <div onClick={() => setScreen("title")} style={{
                fontSize: 12, color: "#fff", cursor: "pointer", letterSpacing: 1,
                display: "flex", alignItems: "center", gap: 6,
              }}>
                <span style={{ color: blink ? "#fff" : "#000" }}>▶</span>
                タイトルにもどる
              </div>
            </div>
          )}

          {phase === "clear" && (
            <div style={{ ...BOX, borderColor: "#ffff00" }}>
              <div style={{ fontSize: 14, color: "#ffff00", letterSpacing: 4, marginBottom: 12 }}>CLEAR!</div>
              <div style={{ fontSize: 11, color: "#0f0", marginBottom: 12, letterSpacing: 1 }}>
                せいかい　{correctCount + 1} / {filteredQ.length}　もん　（{Math.round((correctCount + 1) / filteredQ.length * 100)}%）
              </div>
              <div onClick={() => setScreen("title")} style={{
                fontSize: 12, color: "#fff", cursor: "pointer", letterSpacing: 1,
                display: "flex", alignItems: "center", gap: 6,
              }}>
                <span style={{ color: blink ? "#fff" : "#000" }}>▶</span>
                タイトルにもどる
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
