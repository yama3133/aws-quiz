import { useState, useEffect } from "react";
import { questions as QUESTIONS } from './questions.js';

const MONSTERS = [
  { name: "プロンプトスライム", emoji: "🟦", color: "#4fc3f7" },
  { name: "トークンこうもり", emoji: "🦇", color: "#90caf9" },
  { name: "エンベディングゴースト", emoji: "👻", color: "#ce93d8" },
  { name: "RAGゾンビ", emoji: "🧟", color: "#a5d6a7" },
  { name: "ハルシネーションスライム", emoji: "🫧", color: "#80deea" },
  { name: "ファインチューンオーク", emoji: "🪓", color: "#ffcc80" },
  { name: "LoRAリッチ", emoji: "🧬", color: "#f48fb1" },
  { name: "ベクトルウィッチ", emoji: "🧙‍♀️", color: "#b39ddb" },
  { name: "チャンキングゴブリン", emoji: "🪨", color: "#bcaaa4" },
  { name: "コサインデーモン", emoji: "😈", color: "#ef9a9a" },
  { name: "メタルスライム", emoji: "🔘", color: "#b0bec5" },
  { name: "ガードレールナイト", emoji: "🛡️", color: "#80cbc4" },
  { name: "プライバシーリンク", emoji: "🔗", color: "#90caf9" },
  { name: "PIIマスカー", emoji: "🎭", color: "#f48fb1" },
  { name: "クロスリージョンドラゴン", emoji: "🐉", color: "#ef5350" },
  { name: "バッチインファレンスベア", emoji: "🐻", color: "#ffcc80" },
  { name: "ストリームスペクター", emoji: "💫", color: "#80deea" },
  { name: "コンバースナイト", emoji: "⚔️", color: "#4fc3f7" },
  { name: "アクショングループドラゴン", emoji: "🐲", color: "#a5d6a7" },
  { name: "ReActウォーリア", emoji: "🗡️", color: "#ffb74d" },
  { name: "トレースデーモン", emoji: "🔍", color: "#ce93d8" },
  { name: "クエリリライタ", emoji: "✏️", color: "#80cbc4" },
  { name: "ハイブリッドサーチャー", emoji: "🔎", color: "#90caf9" },
  { name: "リランクゴーレム", emoji: "🗿", color: "#bcaaa4" },
  { name: "セマンティックチャンカー", emoji: "✂️", color: "#f48fb1" },
  { name: "メタデータフィルター", emoji: "🗂️", color: "#b39ddb" },
  { name: "インジェスチョンワーム", emoji: "🪱", color: "#a5d6a7" },
  { name: "OpenSearchウルフ", emoji: "🐺", color: "#4fc3f7" },
  { name: "pgvectorスネーク", emoji: "🐍", color: "#66bb6a" },
  { name: "マトリョーシカスライム", emoji: "🪆", color: "#ce93d8" },
  { name: "ANNスコーピオン", emoji: "🦂", color: "#ffb74d" },
  { name: "QuantizeキメラQ", emoji: "⚡", color: "#ffd54f" },
  { name: "プルーニングゴースト", emoji: "✂️", color: "#b0bec5" },
  { name: "蒸留デーモン", emoji: "🧪", color: "#80deea" },
  { name: "ROUGEワイバーン", emoji: "🦅", color: "#ef5350" },
  { name: "BLEUドラキー", emoji: "💙", color: "#90caf9" },
  { name: "パープレキシティゴースト", emoji: "🌀", color: "#ce93d8" },
  { name: "フェイスフルネスドラゴン", emoji: "🔥", color: "#ff7043" },
  { name: "コンテキストプレシジョン", emoji: "🎯", color: "#66bb6a" },
  { name: "コンテキストリコール", emoji: "📡", color: "#4fc3f7" },
  { name: "RLHFウォーリア", emoji: "🤺", color: "#ffb74d" },
  { name: "DPOナイト", emoji: "🏇", color: "#b39ddb" },
  { name: "LLMジャッジ", emoji: "⚖️", color: "#90caf9" },
  { name: "グラウンドトゥルースゴースト", emoji: "👁️", color: "#80deea" },
  { name: "ロバストネスワーム", emoji: "🛡️", color: "#a5d6a7" },
  { name: "バイアスデーモン", emoji: "😤", color: "#ef9a9a" },
  { name: "トキシシティスライム", emoji: "☠️", color: "#ff7043" },
  { name: "クラリファイサー", emoji: "🔭", color: "#80cbc4" },
  { name: "SHAPウィザード", emoji: "🧙", color: "#ce93d8" },
  { name: "ベンチマークドラゴン", emoji: "📊", color: "#ffb74d" },
  { name: "プロビジョンドスループット", emoji: "🏭", color: "#bcaaa4" },
  { name: "バッチジョブゴーレム", emoji: "🤖", color: "#b0bec5" },
  { name: "ストレージコストモンスター", emoji: "💾", color: "#90caf9" },
  { name: "マックストークンデーモン", emoji: "🔢", color: "#f48fb1" },
  { name: "テンパラチャーウィッチ", emoji: "🌡️", color: "#ce93d8" },
  { name: "TopPスペクター", emoji: "🎲", color: "#80deea" },
  { name: "TopKゴブリン", emoji: "🎰", color: "#ffcc80" },
  { name: "ストップシーケンスゾンビ", emoji: "🛑", color: "#ef9a9a" },
  { name: "フリークエンシーペナルティ", emoji: "🔄", color: "#4fc3f7" },
  { name: "プレゼンスペナルティ", emoji: "👋", color: "#a5d6a7" },
  { name: "マルチモーダルドラゴン", emoji: "🦄", color: "#ce93d8" },
  { name: "ビジョンワイバーン", emoji: "👀", color: "#90caf9" },
  { name: "Base64エンコーダー", emoji: "🔐", color: "#80cbc4" },
  { name: "アウトペイントスライム", emoji: "🎨", color: "#ffb74d" },
  { name: "インペイントゴースト", emoji: "🖌️", color: "#f48fb1" },
  { name: "ネガティブプロンプター", emoji: "🚫", color: "#ef5350" },
  { name: "スタイルトランスファー", emoji: "🎭", color: "#b39ddb" },
  { name: "ウォーターマークゴーレム", emoji: "💧", color: "#4fc3f7" },
  { name: "デジタル透かしデーモン", emoji: "🔏", color: "#80deea" },
  { name: "KMSキーウォーリア", emoji: "🗝️", color: "#ffd54f" },
  { name: "PrivateLinkナイト", emoji: "🔗", color: "#90caf9" },
  { name: "VPCエンドポイントゴースト", emoji: "🌐", color: "#a5d6a7" },
  { name: "CloudTrailスカウト", emoji: "🕵️", color: "#bcaaa4" },
  { name: "IAMポリシーウォーリア", emoji: "📋", color: "#ffb74d" },
  { name: "最小権限デーモン", emoji: "🔒", color: "#ef9a9a" },
  { name: "責任共有ドラゴン", emoji: "🤝", color: "#66bb6a" },
  { name: "コンプライアンスゴーレム", emoji: "📜", color: "#ce93d8" },
  { name: "HIPAAウォーリア", emoji: "🏥", color: "#4fc3f7" },
  { name: "GDPRデーモン", emoji: "🌍", color: "#90caf9" },
  { name: "モデルインボケーションロガー", emoji: "📝", color: "#80cbc4" },
  { name: "デリミタゴブリン", emoji: "🪣", color: "#ffcc80" },
  { name: "サニタイズウィッチ", emoji: "🧹", color: "#f48fb1" },
  { name: "HITLナイト", emoji: "🧑‍⚖️", color: "#b39ddb" },
  { name: "コンテキストグラウンディング", emoji: "⚓", color: "#80deea" },
  { name: "デナイドトピックデーモン", emoji: "🚷", color: "#ef5350" },
  { name: "ワードフィルターゾンビ", emoji: "🚫", color: "#ef9a9a" },
  { name: "センシティブインフォゴースト", emoji: "🔕", color: "#b0bec5" },
  { name: "コンテントフィルタードラゴン", emoji: "🛡️", color: "#ff7043" },
  { name: "エージェントエイリアス", emoji: "🎭", color: "#ce93d8" },
  { name: "バージョンコントローラー", emoji: "📦", color: "#90caf9" },
  { name: "ユーザーコンファメーション", emoji: "✅", color: "#66bb6a" },
  { name: "セッションDynamoゴースト", emoji: "💬", color: "#80deea" },
  { name: "スタックフォームドラゴン", emoji: "📚", color: "#ffb74d" },
  { name: "ステップファンクションナイト", emoji: "🔀", color: "#4fc3f7" },
  { name: "EventStreamスペクター", emoji: "📡", color: "#b39ddb" },
  { name: "スロットリングデーモン", emoji: "⏱️", color: "#ef9a9a" },
  { name: "エクスポネンシャルバックオフ", emoji: "📈", color: "#a5d6a7" },
  { name: "マルチリージョンドラゴン", emoji: "🌍", color: "#ce93d8" },
  { name: "クロスリージョンスライム", emoji: "🌏", color: "#4fc3f7" },
  { name: "カスタムRAGウォーリア", emoji: "⚗️", color: "#80cbc4" },
  { name: "フルマネージドRAG", emoji: "🤖", color: "#ffcc80" },
  { name: "CitationゴーストQ", emoji: "📎", color: "#f48fb1" },
  { name: "リトリーブアンドジェネレート", emoji: "🎣", color: "#90caf9" },
  { name: "コンバートAPIナイト", emoji: "🔄", color: "#b39ddb" },
  { name: "InvokeModelウォーリア", emoji: "⚡", color: "#ffd54f" },
  { name: "ツールユースデーモン", emoji: "🛠️", color: "#ef5350" },
  { name: "JSONスキーマゴブリン", emoji: "📊", color: "#80deea" },
  { name: "OpenAPIスペクター", emoji: "📖", color: "#b0bec5" },
  { name: "Lambdaタイムアウトワーム", emoji: "⏰", color: "#ffb74d" },
  { name: "コールドスタートゴースト", emoji: "🥶", color: "#90caf9" },
  { name: "コンカレンシーモンスター", emoji: "🐙", color: "#ce93d8" },
  { name: "トークナイザーゴブリン", emoji: "✂️", color: "#a5d6a7" },
  { name: "サブワードデーモン", emoji: "🔤", color: "#ef9a9a" },
  { name: "OOVゾンビ", emoji: "❓", color: "#b39ddb" },
  { name: "コンテキストウィンドウドラゴン", emoji: "🪟", color: "#4fc3f7" },
  { name: "200kトークンワイバーン", emoji: "🦢", color: "#80cbc4" },
  { name: "ナレッジカットオフスライム", emoji: "📅", color: "#ffcc80" },
  { name: "PoC戦士", emoji: "🧪", color: "#80deea" },
  { name: "パイロットゴースト", emoji: "✈️", color: "#90caf9" },
  { name: "フィードバックループデーモン", emoji: "🔁", color: "#f48fb1" },
  { name: "アノテーターナイト", emoji: "🖊️", color: "#b39ddb" },
  { name: "ラベルウォーリア", emoji: "🏷️", color: "#66bb6a" },
  { name: "シンセティックデータゴーレム", emoji: "🧫", color: "#ce93d8" },
  { name: "オーグメンテーションウィッチ", emoji: "🔮", color: "#b0bec5" },
  { name: "データポイズニングデーモン", emoji: "☠️", color: "#ef5350" },
  { name: "アドバーサリアルアタッカー", emoji: "⚔️", color: "#ef9a9a" },
  { name: "ジェイルブレイクゴースト", emoji: "🔓", color: "#80deea" },
  { name: "プロンプトインジェクター", emoji: "💉", color: "#ff7043" },
  { name: "システムプロンプトリーカー", emoji: "🕳️", color: "#bcaaa4" },
  { name: "コンフィデンシャリティデーモン", emoji: "🤫", color: "#90caf9" },
  { name: "データソブリンティゴーレム", emoji: "👑", color: "#ffd54f" },
  { name: "リテンションポリシーウォーリア", emoji: "🗓️", color: "#a5d6a7" },
  { name: "アクセスコントロールナイト", emoji: "🚪", color: "#4fc3f7" },
  { name: "監査ログスカウト", emoji: "📋", color: "#80cbc4" },
  { name: "インシデントレスポンサー", emoji: "🚨", color: "#ef5350" },
  { name: "脅威モデルウィザード", emoji: "🧙‍♂️", color: "#ce93d8" },
  { name: "ゼロトラストナイト", emoji: "🛡️", color: "#b39ddb" },
  { name: "エンクリプションドラゴン", emoji: "🔐", color: "#ffb74d" },
  { name: "TLSゴースト", emoji: "🌐", color: "#90caf9" },
  { name: "署名付きURLデーモン", emoji: "📝", color: "#80deea" },
  { name: "バケットポリシーゴブリン", emoji: "🪣", color: "#f48fb1" },
  { name: "ブロックパブリックアクセス", emoji: "🚧", color: "#ef9a9a" },
  { name: "CloudFrontウォーリア", emoji: "⚡", color: "#ffd54f" },
  { name: "WAFデーモン", emoji: "🔥", color: "#ff7043" },
  { name: "ShieldゴーレムS", emoji: "🛡️", color: "#4fc3f7" },
  { name: "GuardDutyスカウト", emoji: "🕵️", color: "#66bb6a" },
  { name: "SecurityHubウィザード", emoji: "🏰", color: "#ce93d8" },
  { name: "Macie秘密探偵", emoji: "🔍", color: "#b0bec5" },
  { name: "Inspectorウォーリア", emoji: "🔬", color: "#80cbc4" },
  { name: "ConfigルールゴーレムC", emoji: "📐", color: "#a5d6a7" },
  { name: "TrustedAdvisorフェアリー", emoji: "🧚", color: "#ffcc80" },
  { name: "コスパモンスター", emoji: "💰", color: "#ffd54f" },
  { name: "コストエクスプローラー", emoji: "🗺️", color: "#90caf9" },
  { name: "セービングプランナイト", emoji: "💳", color: "#b39ddb" },
  { name: "スポットインスタンスハンター", emoji: "🎯", color: "#ef9a9a" },
  { name: "リザーブドキャパシティ", emoji: "📦", color: "#80deea" },
  { name: "AutoScalingドラゴン", emoji: "📈", color: "#ff7043" },
  { name: "ロードバランサーゴーレム", emoji: "⚖️", color: "#4fc3f7" },
  { name: "ElastiCacheウィッチ", emoji: "⚡", color: "#ce93d8" },
  { name: "RDSプロキシゴースト", emoji: "🔄", color: "#a5d6a7" },
  { name: "DynamoDBモンスター", emoji: "⚡", color: "#ffd54f" },
  { name: "S3インテリジェントティア", emoji: "🧠", color: "#80cbc4" },
  { name: "GlacierアーカイブゴーレムG", emoji: "🧊", color: "#90caf9" },
  { name: "EFSウォーリア", emoji: "📁", color: "#ffb74d" },
  { name: "SQSデーモン", emoji: "📬", color: "#f48fb1" },
  { name: "SNSスペクター", emoji: "📢", color: "#b39ddb" },
  { name: "EventBridgeナイト", emoji: "🌉", color: "#4fc3f7" },
  { name: "KinesisストリームゴーレムK", emoji: "🌊", color: "#80deea" },
  { name: "GlueETLウィザード", emoji: "🧪", color: "#66bb6a" },
  { name: "AthenaクエリウィッチA", emoji: "🏺", color: "#ce93d8" },
  { name: "QuickSightビジョナー", emoji: "👁️", color: "#b0bec5" },
  { name: "SageMakerサイエンティスト", emoji: "🔬", color: "#90caf9" },
  { name: "TrainiumチップモンスターT", emoji: "💻", color: "#ffcc80" },
  { name: "InferentiaアクセラレータI", emoji: "⚡", color: "#ffd54f" },
  { name: "EC2GPUドラゴン", emoji: "🖥️", color: "#ef5350" },
  { name: "EKSクラスターゴーレム", emoji: "🎡", color: "#4fc3f7" },
  { name: "ECSコンテナウォーリア", emoji: "🐳", color: "#80cbc4" },
  { name: "FargateSeverlessゴースト", emoji: "☁️", color: "#90caf9" },
  { name: "CodePipelineドラキー", emoji: "🔀", color: "#b39ddb" },
  { name: "CloudFormationゴーレム", emoji: "📐", color: "#a5d6a7" },
  { name: "CDKウィザードC", emoji: "🪄", color: "#ce93d8" },
  { name: "TerraformウォーリアT", emoji: "🏗️", color: "#ffb74d" },
  { name: "アンサーレレバンスデーモン", emoji: "🎯", color: "#ef9a9a" },
  { name: "チェーンオブソートドラゴン", emoji: "⛓️", color: "#4fc3f7" },
  { name: "ゼロショットCoTゴースト", emoji: "🎭", color: "#80deea" },
  { name: "フューショットウィッチ", emoji: "🎱", color: "#f48fb1" },
  { name: "セルフコンシステンシー", emoji: "🔁", color: "#b39ddb" },
  { name: "ロールプロンプティング", emoji: "🎬", color: "#66bb6a" },
  { name: "ダイレクショナルスティム", emoji: "📍", color: "#90caf9" },
  { name: "メタプロンプトゴブリン", emoji: "🤔", color: "#bcaaa4" },
  { name: "ツリーオブソートウィザード", emoji: "🌳", color: "#a5d6a7" },
  { name: "グラフオブソートデーモン", emoji: "🕸️", color: "#ce93d8" },
  { name: "アクティブプロンプティング", emoji: "💡", color: "#ffd54f" },
  { name: "ディレクションスライム", emoji: "🧭", color: "#80cbc4" },
  { name: "アテンションドラゴン", emoji: "🧠", color: "#ff7043" },
  { name: "トランスフォーマーウォーリア", emoji: "⚙️", color: "#4fc3f7" },
  { name: "エンコーダーゴースト", emoji: "📤", color: "#90caf9" },
  { name: "デコーダーゾンビ", emoji: "📥", color: "#b39ddb" },
  { name: "ポジショナルエンコーディング", emoji: "📍", color: "#80deea" },
  { name: "マルチヘッドアテンション", emoji: "🔮", color: "#ce93d8" },
  { name: "フィードフォワードナイト", emoji: "➡️", color: "#ffb74d" },
  { name: "レイヤーノームウィッチ", emoji: "🧙‍♀️", color: "#f48fb1" },
  { name: "ドロップアウトデーモン", emoji: "💧", color: "#ef9a9a" },
  { name: "ソフトマックスゴーレム", emoji: "📊", color: "#a5d6a7" },
  { name: "クロスエントロピーゾンビ", emoji: "❌", color: "#ef5350" },
  { name: "バックプロップデーモン", emoji: "🔙", color: "#b0bec5" },
  { name: "グラジエントゴースト", emoji: "📉", color: "#90caf9" },
  { name: "アダムオプティマイザー", emoji: "⚡", color: "#ffd54f" },
  { name: "ラーニングレートウィッチ", emoji: "📐", color: "#ce93d8" },
  { name: "エポックモンスター", emoji: "🔄", color: "#80cbc4" },
  { name: "ミニバッチゴブリン", emoji: "📦", color: "#ffcc80" },
  { name: "オーバーフィットデーモン", emoji: "🎭", color: "#ef9a9a" },
  { name: "アンダーフィットゾンビ", emoji: "😴", color: "#b39ddb" },
  { name: "レギュラライゼーション", emoji: "📏", color: "#4fc3f7" },
  { name: "バリデーションセットゴースト", emoji: "✔️", color: "#a5d6a7" },
  { name: "テストセットウィッチ", emoji: "🧪", color: "#f48fb1" },
  { name: "クロスバリデーション", emoji: "🔀", color: "#66bb6a" },
  { name: "ハイパーパラメータデーモン", emoji: "🎛️", color: "#ce93d8" },
  { name: "グリッドサーチゴーレム", emoji: "🗃️", color: "#bcaaa4" },
  { name: "ランダムサーチウィザード", emoji: "🎲", color: "#90caf9" },
  { name: "ベイズ最適化ドラゴン", emoji: "🎯", color: "#ff7043" },
  { name: "ラストボスΩ", emoji: "🐉", color: "#ef5350" },
];

const PARTY = [
  { name: "ゆうしゃ", short: "ゆ", maxHp: 80, maxMp: 30 },
  { name: "まほうつかい", short: "ま", maxHp: 55, maxMp: 80 },
  { name: "そうりょ", short: "そ", maxHp: 65, maxMp: 60 },
];

const delay = ms => new Promise(r => setTimeout(r, ms));
const cleanChoice = (str) => str.replace(/^[A-D]\.\s*/, "");

export default function DQ4Quiz() {
  const [screen, setScreen] = useState("title");
  const [qIndex, setQIndex] = useState(0);
  const [filteredQ, setFilteredQ] = useState(QUESTIONS);
  const [phase, setPhase] = useState("command"); // command, question, animating, result, gameover, clear
  const [party, setParty] = useState(PARTY.map(p => ({ ...p, hp: p.maxHp, mp: p.maxMp })));
  const [monsterHp, setMonsterHp] = useState(30);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [message, setMessage] = useState("");
  const [showExplanation, setShowExplanation] = useState(false);
  const [scores, setScores] = useState({ correct: 0, wrong: 0 });
  const [shakeMonster, setShakeMonster] = useState(false);
  const [flashParty, setFlashParty] = useState(null);
  const [cursor, setCursor] = useState(0);

  const q = filteredQ[Math.min(qIndex, filteredQ.length - 1)];
  const monster = MONSTERS[Math.min(qIndex, MONSTERS.length - 1)];
  const monsterMaxHp = 30;
  const activeChar = PARTY[qIndex % 3];

  const startGame = (mode) => {
    const qs = mode === "random" ? [...QUESTIONS].sort(() => Math.random() - 0.5).slice(0, 20) : QUESTIONS;
    setFilteredQ(qs);
    setQIndex(0);
    setParty(PARTY.map(p => ({ ...p, hp: p.maxHp, mp: p.maxMp })));
    setMonsterHp(30);
    setSelectedAnswer(null);
    setAnswered(false);
    setShowExplanation(false);
    setScores({ correct: 0, wrong: 0 });
    setMessage(`${monster?.name}があらわれた！`);
    setPhase("command");
    setScreen("battle");
    setCursor(0);
  };

  const handleCommand = (cmd) => {
    if (cmd === "たたかう") {
      setMessage("もんだいがでた！\n" + q.question);
      setPhase("question");
      setCursor(0);
    } else if (cmd === "にげる") {
      setMessage("しかし　まわりこまれた！");
    }
  };

  const handleAnswer = async (idx) => {
    if (answered || phase !== "question") return;
    setSelectedAnswer(idx);
    setAnswered(true);
    setPhase("animating");
    const correct = idx === q.answer;

    if (correct) {
      const dmg = Math.floor(Math.random() * 8) + 8;
      setShakeMonster(true);
      await delay(200);
      setShakeMonster(false);
      const newMHp = Math.max(0, monsterHp - dmg);
      setMonsterHp(newMHp);
      setScores(s => ({ ...s, correct: s.correct + 1 }));
      setMessage(`せいかい！\n${activeChar.name}のこうげき！\n${monster?.name}に　${dmg}ポイントのダメージ！`);
      await delay(1000);
      if (newMHp <= 0) {
        setMessage(`${monster?.name}をたおした！\nけいけんちをかくとく！`);
        await delay(800);
      }
    } else {
      const pDmg = Math.floor(Math.random() * 6) + 4;
      const charIdx = qIndex % 3;
      setFlashParty(charIdx);
      setParty(prev => prev.map((p, i) => i === charIdx ? { ...p, hp: Math.max(0, p.hp - pDmg) } : p));
      setMessage(`まちがい！\n${monster?.name}のはんげき！\n${activeChar.name}は　${pDmg}ポイントのダメージ！`);
      setScores(s => ({ ...s, wrong: s.wrong + 1 }));
      await delay(400);
      setFlashParty(null);
      await delay(600);

      if (party[charIdx].hp - pDmg <= 0) {
        setMessage(`${activeChar.name}は　たおれた…\nゲームオーバー`);
        setPhase("gameover");
        return;
      }
    }

    setShowExplanation(true);
    setPhase("result");
  };

  const handleNext = () => {
    const next = qIndex + 1;
    if (next >= filteredQ.length) {
      setPhase("clear");
      return;
    }
    const nextMonster = MONSTERS[Math.min(next, MONSTERS.length - 1)];
    setQIndex(next);
    setMonsterHp(30);
    setSelectedAnswer(null);
    setAnswered(false);
    setShowExplanation(false);
    setMessage(`${nextMonster?.name}があらわれた！`);
    setPhase("command");
    setCursor(0);
  };

  const COMMANDS = ["たたかう", "さくせん", "どうぐ", "にげる"];

  // ===== TITLE =====
  if (screen === "title") {
    return (
      <div style={{
        background: "#000", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'DotGothic16', monospace", flexDirection: "column", gap: 24,
      }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=DotGothic16&display=swap');`}</style>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 10, color: "#888", letterSpacing: 3, marginBottom: 8 }}>AWS Certified Generative AI Developer Professional</div>
          <div style={{ fontSize: 24, color: "#fff", marginBottom: 4 }}>もぎしけん　ドラゴンクエスト</div>
          <div style={{ fontSize: 11, color: "#888" }}>全{QUESTIONS.length}問　モンスター200種類</div>
        </div>
        <div style={{ border: "2px solid #fff", padding: "16px 24px", display: "flex", flexDirection: "column", gap: 10, minWidth: 200 }}>
          {[
            { label: `▶ ぜんもんにちょうせん（${QUESTIONS.length}もん）`, mode: "all" },
            { label: "　ランダム20もん", mode: "random" },
          ].map(({ label, mode }) => (
            <button key={mode} onClick={() => startGame(mode)} style={{
              background: "transparent", border: "none", color: "#fff",
              fontFamily: "'DotGothic16', monospace", fontSize: 14,
              cursor: "pointer", textAlign: "left", padding: "4px 0",
            }}>{label}</button>
          ))}
        </div>
      </div>
    );
  }

  // ===== BATTLE =====
  return (
    <div style={{
      background: "#000", minHeight: "100vh",
      fontFamily: "'DotGothic16', monospace",
      display: "flex", flexDirection: "column",
      maxWidth: 480, margin: "0 auto",
      border: "2px solid #444",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DotGothic16&display=swap');
        @keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-6px)} 75%{transform:translateX(6px)} }
        @keyframes flash { 0%,100%{opacity:1} 50%{opacity:0.2} }
        * { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>

      {/* ── パーティステータス（上部） ── */}
      <div style={{ border: "2px solid #fff", margin: 6, padding: "6px 8px" }}>
        <div style={{ display: "flex", gap: 0 }}>
          {party.map((p, i) => (
            <div key={i} style={{
              flex: 1, borderRight: i < 2 ? "1px solid #555" : "none",
              padding: "0 6px", opacity: p.hp <= 0 ? 0.4 : 1,
              animation: flashParty === i ? "flash 0.4s ease" : "none",
            }}>
              <div style={{ fontSize: 10, color: "#fff", marginBottom: 2 }}>{p.name}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 1 }}>
                <span style={{ fontSize: 9, color: "#aaa", width: 12 }}>H</span>
                <div style={{ flex: 1, height: 4, background: "#222", borderRadius: 0 }}>
                  <div style={{
                    height: "100%", width: `${Math.max(0, p.hp / p.maxHp * 100)}%`,
                    background: p.hp / p.maxHp > 0.5 ? "#0f0" : p.hp / p.maxHp > 0.25 ? "#ff0" : "#f00",
                    transition: "width 0.4s",
                  }} />
                </div>
                <span style={{ fontSize: 9, color: "#fff", width: 20, textAlign: "right" }}>{p.hp}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ fontSize: 9, color: "#aaa", width: 12 }}>M</span>
                <div style={{ flex: 1, height: 4, background: "#222", borderRadius: 0 }}>
                  <div style={{ height: "100%", width: `${p.mp / p.maxMp * 100}%`, background: "#44f" }} />
                </div>
                <span style={{ fontSize: 9, color: "#fff", width: 20, textAlign: "right" }}>{p.mp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── バトルフィールド（モンスター） ── */}
      <div style={{
        flex: 1, background: "#111", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", minHeight: 160, position: "relative",
        borderTop: "1px solid #333", borderBottom: "1px solid #333",
      }}>
        {/* 進捗 */}
        <div style={{ position: "absolute", top: 6, right: 8, fontSize: 9, color: "#666" }}>
          {qIndex + 1} / {filteredQ.length}
        </div>
        <div style={{ position: "absolute", top: 6, left: 8, fontSize: 9, color: "#666" }}>
          ○{scores.correct} ✗{scores.wrong}
        </div>

        {/* モンスター */}
        <div style={{ textAlign: "center", animation: shakeMonster ? "shake 0.3s ease" : "none" }}>
          <div style={{ fontSize: 10, color: monster?.color || "#fff", marginBottom: 4 }}>
            {monster?.name}
          </div>
          <div style={{ fontSize: 72, lineHeight: 1, filter: `drop-shadow(0 0 8px ${monster?.color || "#fff"})` }}>
            {monster?.emoji}
          </div>

          {/* モンスターHP */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8, justifyContent: "center" }}>
            <span style={{ fontSize: 9, color: "#aaa" }}>HP</span>
            <div style={{ width: 100, height: 5, background: "#222" }}>
              <div style={{
                height: "100%",
                width: `${monsterHp / monsterMaxHp * 100}%`,
                background: monsterHp / monsterMaxHp > 0.5 ? "#0f0" : monsterHp / monsterMaxHp > 0.25 ? "#ff0" : "#f00",
                transition: "width 0.4s",
              }} />
            </div>
            <span style={{ fontSize: 9, color: "#fff" }}>{monsterHp}</span>
          </div>
        </div>

        {/* アクティブキャラ表示 */}
        <div style={{ position: "absolute", bottom: 8, right: 8, fontSize: 9, color: "#ffff00" }}>
          {activeChar.name}のばんだ
        </div>
      </div>

      {/* ── メッセージウィンドウ ── */}
      <div style={{
        border: "2px solid #fff", margin: "4px 6px",
        padding: "8px 10px", minHeight: 70, background: "#000",
      }}>
        <div style={{ fontSize: 12, color: "#fff", lineHeight: 1.8, whiteSpace: "pre-line" }}>
          {message}
        </div>
      </div>

      {/* ── 解説 ── */}
      {showExplanation && q?.explanation && (
        <div style={{
          border: "1px solid #555", margin: "0 6px 4px",
          padding: "6px 10px", background: "#001100",
        }}>
          <div style={{ fontSize: 10, color: "#0f0", lineHeight: 1.7 }}>
            💡 {q.explanation}
          </div>
        </div>
      )}

      {/* ── コマンド / 選択肢ウィンドウ ── */}
      <div style={{ display: "flex", gap: 0, margin: "0 6px 6px" }}>

        {/* 左：コマンド */}
        <div style={{ border: "2px solid #fff", padding: "8px 12px", minWidth: 100, background: "#000" }}>
          {phase === "command" && COMMANDS.map((cmd, i) => (
            <div key={cmd} onClick={() => { setCursor(i); handleCommand(cmd); }} style={{
              fontSize: 12, color: cursor === i ? "#ffff00" : "#fff",
              padding: "2px 0", cursor: "pointer", display: "flex", alignItems: "center", gap: 4,
            }}>
              {cursor === i ? "▶" : "　"}{cmd}
            </div>
          ))}
          {phase === "question" && (
            <div style={{ fontSize: 10, color: "#888" }}>
              こたえを<br />えらべ
            </div>
          )}
          {phase === "result" && (
            <div onClick={handleNext} style={{
              fontSize: 12, color: "#ffff00", cursor: "pointer", lineHeight: 1.8,
            }}>▶ つぎへ</div>
          )}
          {phase === "animating" && (
            <div style={{ fontSize: 11, color: "#888" }}>・・・</div>
          )}
          {phase === "gameover" && (
            <div onClick={() => setScreen("title")} style={{
              fontSize: 11, color: "#f88", cursor: "pointer", lineHeight: 1.8,
            }}>▶ タイトルへ</div>
          )}
          {phase === "clear" && (
            <div onClick={() => setScreen("title")} style={{
              fontSize: 11, color: "#ff0", cursor: "pointer", lineHeight: 1.8,
            }}>▶ タイトルへ</div>
          )}
        </div>

        {/* 右：選択肢 or 作戦 */}
        <div style={{ flex: 1, border: "2px solid #fff", borderLeft: "none", padding: "6px 10px", background: "#000" }}>
          {phase === "question" && q && q.options.map((opt, i) => {
            let color = "#fff";
            if (answered) {
              if (i === q.answer) color = "#0f0";
              else if (i === selectedAnswer) color = "#f44";
              else color = "#555";
            }
            return (
              <div key={i} onClick={() => handleAnswer(i)} style={{
                fontSize: 11, color, padding: "3px 0", cursor: answered ? "default" : "pointer",
                display: "flex", alignItems: "flex-start", gap: 4, lineHeight: 1.5,
              }}>
                <span style={{ flexShrink: 0 }}>
                  {answered ? (i === q.answer ? "○" : i === selectedAnswer ? "×" : ["Ａ","Ｂ","Ｃ","Ｄ"][i]) : ["Ａ","Ｂ","Ｃ","Ｄ"][i]}
                </span>
                <span>{cleanChoice(opt)}</span>
              </div>
            );
          })}

          {phase === "command" && (
            <div>
              <div style={{ fontSize: 10, color: "#888", marginBottom: 4 }}>さくせんをねる</div>
              <div style={{ fontSize: 10, color: "#888" }}>－ {filteredQ.length - qIndex - 1}もんのこり</div>
            </div>
          )}

          {(phase === "result" || phase === "animating") && !showExplanation && (
            <div style={{ fontSize: 10, color: "#555" }}>・・・</div>
          )}

          {phase === "clear" && (
            <div style={{ fontSize: 11, color: "#ff0", lineHeight: 1.8 }}>
              🏆 クリア！<br />
              ○{scores.correct} ✗{scores.wrong}<br />
              {Math.round(scores.correct / (scores.correct + scores.wrong) * 100)}%せいかい
            </div>
          )}

          {phase === "gameover" && (
            <div style={{ fontSize: 11, color: "#f88", lineHeight: 1.8 }}>
              GAME OVER<br />
              ○{scores.correct} ✗{scores.wrong}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
