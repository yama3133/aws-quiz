import { useState, useEffect, useRef } from "react";
import { questions as QUESTIONS } from './questions.js';

const MONSTERS = [
  { name: "スライム", emoji: "🟦", color: "#4488ff" },
  { name: "ドラキー", emoji: "🦇", color: "#8866cc" },
  { name: "ゴースト", emoji: "👻", color: "#aaaacc" },
  { name: "メタルスライム", emoji: "🔘", color: "#cccccc" },
  { name: "キメラ", emoji: "🦅", color: "#cc8844" },
  { name: "ゴーレム", emoji: "🗿", color: "#887766" },
  { name: "ドラゴン", emoji: "🐉", color: "#cc4444" },
  { name: "バブルスライム", emoji: "🟢", color: "#44cc44" },
  { name: "じゅうおう", emoji: "🐯", color: "#ffaa22" },
  { name: "デスピサロ", emoji: "💀", color: "#ff2222" },
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
  { name: "メタルスライムG", emoji: "🔘", color: "#cccccc" },
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
  { name: "プルーニングゴースト", emoji: "✂️", color: "#aaaaaa" },
  { name: "蒸留デーモン", emoji: "🧪", color: "#44aacc" },
  { name: "ROUGEワイバーン", emoji: "🦅", color: "#cc3333" },
  { name: "BLEUドラキー", emoji: "💙", color: "#4488cc" },
  { name: "パープレキシティゴースト", emoji: "🌀", color: "#9966cc" },
  { name: "フェイスフルネスドラゴン", emoji: "🔥", color: "#cc5533" },
  { name: "コンテキストプレシジョン", emoji: "🎯", color: "#44aa44" },
  { name: "コンテキストリコール", emoji: "📡", color: "#4488cc" },
  { name: "RLHFウォーリア", emoji: "🤺", color: "#cc8833" },
  { name: "DPOナイト", emoji: "🏇", color: "#8844cc" },
  { name: "LLMジャッジ", emoji: "⚖️", color: "#4488cc" },
  { name: "グラウンドトゥルースゴースト", emoji: "👁️", color: "#44aacc" },
  { name: "ロバストネスワーム", emoji: "🛡️", color: "#44aa66" },
  { name: "バイアスデーモン", emoji: "😤", color: "#cc4444" },
  { name: "トキシシティスライム", emoji: "☠️", color: "#cc5533" },
  { name: "クラリファイサー", emoji: "🔭", color: "#44aaaa" },
  { name: "SHAPウィザード", emoji: "🧙", color: "#9966cc" },
  { name: "ベンチマークドラゴン", emoji: "📊", color: "#cc8833" },
  { name: "プロビジョンドスループット", emoji: "🏭", color: "#998877" },
  { name: "バッチジョブゴーレム", emoji: "🤖", color: "#aaaaaa" },
  { name: "ストレージコストモンスター", emoji: "💾", color: "#4488cc" },
  { name: "マックストークンデーモン", emoji: "🔢", color: "#cc4477" },
  { name: "テンパラチャーウィッチ", emoji: "🌡️", color: "#9966cc" },
  { name: "TopPスペクター", emoji: "🎲", color: "#44aacc" },
  { name: "TopKゴブリン", emoji: "🎰", color: "#cc9944" },
  { name: "ストップシーケンスゾンビ", emoji: "🛑", color: "#cc4444" },
  { name: "フリークエンシーペナルティ", emoji: "🔄", color: "#4488cc" },
  { name: "プレゼンスペナルティ", emoji: "👋", color: "#44aa66" },
  { name: "マルチモーダルドラゴン", emoji: "🦄", color: "#9966cc" },
  { name: "ビジョンワイバーン", emoji: "👀", color: "#4488cc" },
  { name: "Base64エンコーダー", emoji: "🔐", color: "#44aaaa" },
  { name: "アウトペイントスライム", emoji: "🎨", color: "#cc8833" },
  { name: "インペイントゴースト", emoji: "🖌️", color: "#cc4477" },
  { name: "ネガティブプロンプター", emoji: "🚫", color: "#cc3333" },
  { name: "スタイルトランスファー", emoji: "🎭", color: "#8844cc" },
  { name: "ウォーターマークゴーレム", emoji: "💧", color: "#4488cc" },
  { name: "デジタル透かしデーモン", emoji: "🔏", color: "#44aacc" },
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
  { name: "センシティブインフォゴースト", emoji: "🔕", color: "#aaaaaa" },
  { name: "コンテントフィルタードラゴン", emoji: "🛡️", color: "#cc5533" },
  { name: "エージェントエイリアス", emoji: "🎭", color: "#9966cc" },
  { name: "バージョンコントローラー", emoji: "📦", color: "#4488cc" },
  { name: "ユーザーコンファメーション", emoji: "✅", color: "#44aa44" },
  { name: "セッションDynamoゴースト", emoji: "💬", color: "#44aacc" },
  { name: "ステップファンクションナイト", emoji: "🔀", color: "#4488cc" },
  { name: "EventStreamスペクター", emoji: "📡", color: "#8844cc" },
  { name: "スロットリングデーモン", emoji: "⏱️", color: "#cc4444" },
  { name: "エクスポネンシャルバックオフ", emoji: "📈", color: "#44aa66" },
  { name: "マルチリージョンドラゴン", emoji: "🌍", color: "#9966cc" },
  { name: "クロスリージョンスライム", emoji: "🌏", color: "#4488cc" },
  { name: "カスタムRAGウォーリア", emoji: "⚗️", color: "#44aaaa" },
  { name: "フルマネージドRAG", emoji: "🤖", color: "#cc9944" },
  { name: "Citationゴースト", emoji: "📎", color: "#cc4477" },
  { name: "リトリーブアンドジェネレート", emoji: "🎣", color: "#4488cc" },
  { name: "コンバートAPIナイト", emoji: "🔄", color: "#8844cc" },
  { name: "InvokeModelウォーリア", emoji: "⚡", color: "#cccc22" },
  { name: "ツールユースデーモン", emoji: "🛠️", color: "#cc3333" },
  { name: "JSONスキーマゴブリン", emoji: "📊", color: "#44aacc" },
  { name: "OpenAPIスペクター", emoji: "📖", color: "#aaaaaa" },
  { name: "Lambdaタイムアウトワーム", emoji: "⏰", color: "#cc8833" },
  { name: "コールドスタートゴースト", emoji: "🥶", color: "#4488cc" },
  { name: "コンカレンシーモンスター", emoji: "🐙", color: "#9966cc" },
  { name: "トークナイザーゴブリン", emoji: "✂️", color: "#44aa66" },
  { name: "サブワードデーモン", emoji: "🔤", color: "#cc4444" },
  { name: "OOVゾンビ", emoji: "❓", color: "#8844cc" },
  { name: "コンテキストウィンドウドラゴン", emoji: "🪟", color: "#4488cc" },
  { name: "200kトークンワイバーン", emoji: "🦢", color: "#44aaaa" },
  { name: "ナレッジカットオフスライム", emoji: "📅", color: "#cc9944" },
  { name: "PoC戦士", emoji: "🧪", color: "#44aacc" },
  { name: "パイロットゴースト", emoji: "✈️", color: "#4488cc" },
  { name: "フィードバックループデーモン", emoji: "🔁", color: "#cc4477" },
  { name: "アノテーターナイト", emoji: "🖊️", color: "#8844cc" },
  { name: "ラベルウォーリア", emoji: "🏷️", color: "#44aa44" },
  { name: "シンセティックデータゴーレム", emoji: "🧫", color: "#9966cc" },
  { name: "オーグメンテーションウィッチ", emoji: "🔮", color: "#aaaaaa" },
  { name: "データポイズニングデーモン", emoji: "☠️", color: "#cc3333" },
  { name: "アドバーサリアルアタッカー", emoji: "⚔️", color: "#cc4444" },
  { name: "ジェイルブレイクゴースト", emoji: "🔓", color: "#44aacc" },
  { name: "プロンプトインジェクター", emoji: "💉", color: "#cc5533" },
  { name: "システムプロンプトリーカー", emoji: "🕳️", color: "#998877" },
  { name: "コンフィデンシャリティデーモン", emoji: "🤫", color: "#4488cc" },
  { name: "データソブリンティゴーレム", emoji: "👑", color: "#cccc22" },
  { name: "リテンションポリシーウォーリア", emoji: "🗓️", color: "#44aa66" },
  { name: "アクセスコントロールナイト", emoji: "🚪", color: "#4488cc" },
  { name: "監査ログスカウト", emoji: "📋", color: "#44aaaa" },
  { name: "インシデントレスポンサー", emoji: "🚨", color: "#cc3333" },
  { name: "脅威モデルウィザード", emoji: "🧙", color: "#9966cc" },
  { name: "ゼロトラストナイト", emoji: "🛡️", color: "#8844cc" },
  { name: "エンクリプションドラゴン", emoji: "🔐", color: "#cc8833" },
  { name: "TLSゴースト", emoji: "🌐", color: "#4488cc" },
  { name: "署名付きURLデーモン", emoji: "📝", color: "#44aacc" },
  { name: "バケットポリシーゴブリン", emoji: "🪣", color: "#cc4477" },
  { name: "ブロックパブリックアクセス", emoji: "🚧", color: "#cc4444" },
  { name: "CloudFrontウォーリア", emoji: "⚡", color: "#cccc22" },
  { name: "WAFデーモン", emoji: "🔥", color: "#cc5533" },
  { name: "ShieldゴーレムS", emoji: "🛡️", color: "#4488cc" },
  { name: "GuardDutyスカウト", emoji: "🕵️", color: "#44aa44" },
  { name: "SecurityHubウィザード", emoji: "🏰", color: "#9966cc" },
  { name: "Macie秘密探偵", emoji: "🔍", color: "#aaaaaa" },
  { name: "Inspectorウォーリア", emoji: "🔬", color: "#44aaaa" },
  { name: "ConfigルールゴーレムC", emoji: "📐", color: "#44aa66" },
  { name: "TrustedAdvisorフェアリー", emoji: "🧚", color: "#cc9944" },
  { name: "コスパモンスター", emoji: "💰", color: "#cccc22" },
  { name: "コストエクスプローラー", emoji: "🗺️", color: "#4488cc" },
  { name: "セービングプランナイト", emoji: "💳", color: "#8844cc" },
  { name: "スポットインスタンスハンター", emoji: "🎯", color: "#cc4444" },
  { name: "リザーブドキャパシティ", emoji: "📦", color: "#44aacc" },
  { name: "AutoScalingドラゴン", emoji: "📈", color: "#cc5533" },
  { name: "ロードバランサーゴーレム", emoji: "⚖️", color: "#4488cc" },
  { name: "ElastiCacheウィッチ", emoji: "⚡", color: "#9966cc" },
  { name: "RDSプロキシゴースト", emoji: "🔄", color: "#44aa66" },
  { name: "DynamoDBモンスター", emoji: "⚡", color: "#cccc22" },
  { name: "S3インテリジェントティア", emoji: "🧠", color: "#44aaaa" },
  { name: "GlacierゴーレムG", emoji: "🧊", color: "#4488cc" },
  { name: "EFSウォーリア", emoji: "📁", color: "#cc8833" },
  { name: "SQSデーモン", emoji: "📬", color: "#cc4477" },
  { name: "SNSスペクター", emoji: "📢", color: "#8844cc" },
  { name: "EventBridgeナイト", emoji: "🌉", color: "#4488cc" },
  { name: "KinesisゴーレムK", emoji: "🌊", color: "#44aacc" },
  { name: "GlueETLウィザード", emoji: "🧪", color: "#44aa44" },
  { name: "AthenaウィッチA", emoji: "🏺", color: "#9966cc" },
  { name: "QuickSightビジョナー", emoji: "👁️", color: "#aaaaaa" },
  { name: "SageMakerサイエンティスト", emoji: "🔬", color: "#4488cc" },
  { name: "TrainiumチップモンスターT", emoji: "💻", color: "#cc9944" },
  { name: "InferentiaアクセラレータI", emoji: "⚡", color: "#cccc22" },
  { name: "EC2GPUドラゴン", emoji: "🖥️", color: "#cc3333" },
  { name: "EKSクラスターゴーレム", emoji: "🎡", color: "#4488cc" },
  { name: "ECSコンテナウォーリア", emoji: "🐳", color: "#44aaaa" },
  { name: "FargateゴーストF", emoji: "☁️", color: "#4488cc" },
  { name: "CodePipelineドラキー", emoji: "🔀", color: "#8844cc" },
  { name: "CloudFormationゴーレム", emoji: "📐", color: "#44aa66" },
  { name: "CDKウィザードC", emoji: "🪄", color: "#9966cc" },
  { name: "TerraformウォーリアT", emoji: "🏗️", color: "#cc8833" },
  { name: "アンサーレレバンスデーモン", emoji: "🎯", color: "#cc4444" },
  { name: "チェーンオブソートドラゴン", emoji: "⛓️", color: "#4488cc" },
  { name: "ゼロショットCoTゴースト", emoji: "🎭", color: "#44aacc" },
  { name: "フューショットウィッチ", emoji: "🎱", color: "#cc4477" },
  { name: "セルフコンシステンシー", emoji: "🔁", color: "#8844cc" },
  { name: "ロールプロンプティング", emoji: "🎬", color: "#44aa44" },
  { name: "ダイレクショナルスティム", emoji: "📍", color: "#4488cc" },
  { name: "メタプロンプトゴブリン", emoji: "🤔", color: "#998877" },
  { name: "ツリーオブソートウィザード", emoji: "🌳", color: "#44aa66" },
  { name: "グラフオブソートデーモン", emoji: "🕸️", color: "#9966cc" },
  { name: "アクティブプロンプティング", emoji: "💡", color: "#cccc22" },
  { name: "アテンションドラゴン", emoji: "🧠", color: "#cc5533" },
  { name: "トランスフォーマーウォーリア", emoji: "⚙️", color: "#4488cc" },
  { name: "エンコーダーゴースト", emoji: "📤", color: "#4488cc" },
  { name: "デコーダーゾンビ", emoji: "📥", color: "#8844cc" },
  { name: "マルチヘッドアテンション", emoji: "🔮", color: "#9966cc" },
  { name: "バックプロップデーモン", emoji: "🔙", color: "#aaaaaa" },
  { name: "オーバーフィットデーモン", emoji: "🎭", color: "#cc4444" },
  { name: "ハイパーパラメータデーモン", emoji: "🎛️", color: "#9966cc" },
  { name: "ラストボスΩ", emoji: "🐉", color: "#ff2222" },
];

const MAX_HP = 50;
const delay = ms => new Promise(r => setTimeout(r, ms));
const clean = (s) => s.replace(/^[A-D]\.\s*/, "");

export default function FCQuiz() {
  const [screen, setScreen] = useState("title"); // title, battle
  const [qIndex, setQIndex] = useState(0);
  const [filteredQ, setFilteredQ] = useState(QUESTIONS);
  const [phase, setPhase] = useState("command"); // command, question, animating, result, gameover, clear
  const [hp, setHp] = useState(MAX_HP);
  const [monsterHp, setMonsterHp] = useState(30);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [messages, setMessages] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [correct, setCorrect] = useState(0);
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
    setShowExplanation(false);
    setCorrect(0);
    setPhase("command");
    setCursor(0);
    setMessages([
      `${MONSTERS[0].name}が あらわれた！`,
    ]);
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
      setMessages(["しかし まわりこまれた！"]);
    } else {
      setMessages(["いまは つかえない！"]);
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
      setCorrect(c => c + 1);
      if (newMHp <= 0) {
        setMessages([
          `ゆうしゃの こうげき！`,
          `${monster.name}に ${dmg}ポイントの ダメージ！`,
          `${monster.name}を たおした！`,
          `けいけんちを かくとく！`,
        ]);
      } else {
        setMessages([
          `ゆうしゃの こうげき！`,
          `${monster.name}に ${dmg}ポイントの ダメージ！`,
        ]);
      }
    } else {
      const pDmg = Math.floor(Math.random() * 6) + 4;
      const newHp = Math.max(0, hp - pDmg);
      setHp(newHp);
      setShakePlayer(true);
      await delay(200); setShakePlayer(false);
      setMessages([
        `まちがい！`,
        `${monster.name}の こうげき！`,
        `ゆうしゃは ${pDmg}ポイントの ダメージ！`,
      ]);
      if (newHp <= 0) {
        await delay(800);
        setMessages(["ゆうしゃは しにました。", "ゲームオーバー…"]);
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
    if (next >= filteredQ.length) {
      setMessages([
        `すべての てきを たおした！`,
        `ゆうしゃは まおうを たおした！`,
        `せいかい ${correct + 1} / ${filteredQ.length} もん`,
      ]);
      setPhase("clear");
      return;
    }
    const nm = MONSTERS[Math.min(next, MONSTERS.length - 1)];
    setQIndex(next);
    setMonsterHp(30);
    setSelectedAnswer(null);
    setAnswered(false);
    setShowExplanation(false);
    setMessages([`${nm.name}が あらわれた！`]);
    setPhase("command");
    setCursor(0);
  };

  if (screen === "title") {
    return (
      <div style={{
        background: "#000", minHeight: "100vh",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        fontFamily: "'Press Start 2P', monospace",
        gap: 32, padding: 16,
      }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');`}</style>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 8, color: "#888", marginBottom: 16, lineHeight: 2 }}>
            AWS CERTIFIED<br />GENERATIVE AI DEVELOPER
          </div>
          <div style={{ fontSize: 14, color: "#fff", marginBottom: 8 }}>
            DRAGON QUEST
          </div>
          <div style={{ fontSize: 11, color: "#ffff00" }}>
            MOCK EXAM
          </div>
        </div>

        <div style={{ border: "3px solid #fff", padding: "20px 28px", display: "flex", flexDirection: "column", gap: 14 }}>
          <div onClick={() => startGame("all")} style={{ fontSize: 9, color: "#fff", cursor: "pointer", display: "flex", gap: 8 }}>
            <span style={{ color: blink ? "#ffff00" : "#000" }}>►</span>
            <span>ALL {QUESTIONS.length} QUESTS</span>
          </div>
          <div onClick={() => startGame("random")} style={{ fontSize: 9, color: "#aaa", cursor: "pointer", display: "flex", gap: 8 }}>
            <span>　</span>
            <span>RANDOM 20 QUESTS</span>
          </div>
        </div>

        <div style={{ fontSize: 7, color: "#444", textAlign: "center", lineHeight: 2 }}>
          200 MONSTERS AWAIT
        </div>
      </div>
    );
  }

  return (
    <div style={{
      background: "#000",
      minHeight: "100vh",
      fontFamily: "'Press Start 2P', monospace",
      display: "flex",
      flexDirection: "column",
      maxWidth: 480,
      margin: "0 auto",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes shake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-8px)} 60%{transform:translateX(8px)} }
        @keyframes shakePl { 0%,100%{transform:translateX(0)} 20%{transform:translateX(6px)} 60%{transform:translateX(-6px)} }
      `}</style>

      {/* ── バトルフィールド ── */}
      <div style={{
        background: "#000", height: 200, position: "relative",
        borderBottom: "3px solid #fff",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {/* モンスター（右上） */}
        <div style={{
          position: "absolute", top: 20, right: 40,
          textAlign: "center",
          animation: shakeMonster ? "shake 0.3s ease" : "none",
        }}>
          <div style={{ fontSize: 11, color: monster?.color || "#fff", marginBottom: 6, letterSpacing: 1 }}>
            {monster?.name}
          </div>
          <div style={{ fontSize: 64, lineHeight: 1 }}>{monster?.emoji}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 6 }}>
            <span style={{ fontSize: 7, color: "#aaa" }}>HP</span>
            <div style={{ width: 60, height: 4, background: "#222", border: "1px solid #444" }}>
              <div style={{
                height: "100%",
                width: `${monsterHp / monsterMax * 100}%`,
                background: monsterHp / monsterMax > 0.5 ? "#0f0" : monsterHp / monsterMax > 0.2 ? "#ff0" : "#f00",
                transition: "width 0.3s",
              }} />
            </div>
          </div>
        </div>

        {/* プレイヤー（左下） */}
        <div style={{
          position: "absolute", bottom: 16, left: 20,
          animation: shakePlayer ? "shakePl 0.3s ease" : "none",
        }}>
          <div style={{ fontSize: 7, color: "#ffff00", marginBottom: 4 }}>ゆうしゃ</div>
          <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
            <span style={{ fontSize: 7, color: "#f88" }}>HP</span>
            <div style={{ width: 80, height: 5, background: "#111", border: "1px solid #444" }}>
              <div style={{
                height: "100%",
                width: `${hp / MAX_HP * 100}%`,
                background: hp / MAX_HP > 0.5 ? "#0f0" : hp / MAX_HP > 0.25 ? "#ff0" : "#f00",
                transition: "width 0.3s",
              }} />
            </div>
            <span style={{ fontSize: 7, color: "#fff" }}>{hp}/{MAX_HP}</span>
          </div>
          <div style={{ fontSize: 7, color: "#666", marginTop: 4 }}>
            {qIndex + 1}/{filteredQ.length} ○{correct}
          </div>
        </div>

        {/* 地面 */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          height: 3, background: "#fff",
        }} />
      </div>

      {/* ── メッセージウィンドウ ── */}
      <div style={{
        border: "3px solid #fff", margin: 8,
        padding: "10px 12px", background: "#000", minHeight: 90,
      }}>
        {messages.map((m, i) => (
          <div key={i} style={{
            fontSize: 9, color: "#fff", lineHeight: 2.2,
            wordBreak: "break-all",
          }}>{m}</div>
        ))}
        {(phase === "command" || phase === "result") && (
          <span style={{ fontSize: 10, color: blink ? "#fff" : "#000" }}>▼</span>
        )}
      </div>

      {/* ── 解説 ── */}
      {showExplanation && q?.explanation && (
        <div style={{
          border: "2px solid #0f0", margin: "0 8px 6px",
          padding: "8px 12px", background: "#001100",
        }}>
          <div style={{ fontSize: 7, color: "#0f0", lineHeight: 2.2, wordBreak: "break-all" }}>
            {q.explanation}
          </div>
        </div>
      )}

      {/* ── 問題文 ── */}
      {phase === "question" && q && (
        <div style={{
          border: "2px solid #888", margin: "0 8px 6px",
          padding: "8px 12px", background: "#000",
        }}>
          <div style={{ fontSize: 8, color: "#ffff00", lineHeight: 2.2, wordBreak: "break-all" }}>
            {q.question}
          </div>
        </div>
      )}

      {/* ── コマンド / 選択肢 ── */}
      <div style={{ display: "flex", margin: "0 8px 8px", gap: 0 }}>

        {/* コマンドウィンドウ */}
        <div style={{
          border: "3px solid #fff", padding: "10px 14px",
          background: "#000", minWidth: 110,
        }}>
          {phase === "command" && CMDS.map((cmd, i) => (
            <div key={cmd} onClick={() => handleCmd(i)} style={{
              fontSize: 9, color: cursor === i ? "#ffff00" : "#fff",
              padding: "4px 0", cursor: "pointer",
              display: "flex", alignItems: "center", gap: 6,
            }}>
              <span style={{ color: cursor === i ? "#ffff00" : "#000", fontSize: 9 }}>
                {cursor === i ? "►" : "　"}
              </span>
              {cmd}
            </div>
          ))}
          {phase === "question" && (
            <div style={{ fontSize: 8, color: "#888", lineHeight: 2 }}>
              こたえを<br />えらべ
            </div>
          )}
          {phase === "result" && (
            <div onClick={handleNext} style={{ fontSize: 8, color: "#ffff00", cursor: "pointer", lineHeight: 2 }}>
              ► つぎへ
            </div>
          )}
          {phase === "animating" && (
            <div style={{ fontSize: 8, color: "#444" }}>・・・</div>
          )}
          {phase === "gameover" && (
            <div onClick={() => setScreen("title")} style={{ fontSize: 7, color: "#f88", cursor: "pointer", lineHeight: 2.2 }}>
              ► TITLE<br />　 BACK
            </div>
          )}
          {phase === "clear" && (
            <div onClick={() => setScreen("title")} style={{ fontSize: 7, color: "#ffff00", cursor: "pointer", lineHeight: 2.2 }}>
              ► TITLE<br />　 BACK
            </div>
          )}
        </div>

        {/* 選択肢ウィンドウ */}
        <div style={{
          flex: 1, border: "3px solid #fff", borderLeft: "none",
          padding: "8px 10px", background: "#000",
        }}>
          {phase === "question" && q && q.options.map((opt, i) => {
            let color = "#fff";
            if (answered) {
              if (i === q.answer) color = "#0f0";
              else if (i === selectedAnswer && i !== q.answer) color = "#f44";
              else color = "#444";
            }
            return (
              <div key={i} onClick={() => handleAnswer(i)} style={{
                fontSize: 8, color, padding: "4px 0",
                cursor: answered ? "default" : "pointer",
                display: "flex", gap: 6, alignItems: "flex-start",
                lineHeight: 2,
              }}>
                <span style={{ flexShrink: 0, color: answered && i === q.answer ? "#0f0" : answered && i === selectedAnswer ? "#f44" : "#fff" }}>
                  {answered ? (i === q.answer ? "○" : i === selectedAnswer ? "×" : ["A","B","C","D"][i]) : ["A","B","C","D"][i]}
                </span>
                <span style={{ wordBreak: "break-all" }}>{clean(opt)}</span>
              </div>
            );
          })}

          {phase === "command" && (
            <div>
              <div style={{ fontSize: 7, color: "#444", lineHeight: 2.5 }}>
                のこり {filteredQ.length - qIndex - 1} もん
              </div>
              <div style={{ fontSize: 7, color: "#444" }}>
                No.{String(qIndex + 1).padStart(3, "0")}
              </div>
            </div>
          )}

          {(phase === "animating") && (
            <div style={{ fontSize: 8, color: "#444" }}>・・・</div>
          )}

          {phase === "clear" && (
            <div style={{ fontSize: 7, color: "#ffff00", lineHeight: 2.5 }}>
              CLEAR!<br />
              CORRECT<br />
              {correct + 1}/{filteredQ.length}
            </div>
          )}

          {phase === "gameover" && (
            <div style={{ fontSize: 7, color: "#f88", lineHeight: 2.5 }}>
              GAME<br />OVER<br />
              {correct}/{qIndex + 1}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
