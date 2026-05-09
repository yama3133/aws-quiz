import { useState, useEffect, useRef } from "react";
import { questions as QUESTIONS } from './questions.js';

// 200匹のモンスター（問題番号順）
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
  { name: "GDPRデーモン", emoji: "🇪🇺", color: "#90caf9" },
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
  { name: "ドロップアウトウォーリア", emoji: "🥊", color: "#80deea" },
  { name: "バリデーションセットゴースト", emoji: "✔️", color: "#a5d6a7" },
  { name: "テストセットウィッチ", emoji: "🧪", color: "#f48fb1" },
  { name: "クロスバリデーション", emoji: "🔀", color: "#66bb6a" },
  { name: "ハイパーパラメータデーモン", emoji: "🎛️", color: "#ce93d8" },
  { name: "グリッドサーチゴーレム", emoji: "🗃️", color: "#bcaaa4" },
  { name: "ランダムサーチウィザード", emoji: "🎲", color: "#90caf9" },
  { name: "ベイズ最適化ドラゴン", emoji: "🎯", color: "#ff7043" },
  { name: "アンサンブルゴースト", emoji: "👥", color: "#80cbc4" },
  { name: "ブースティングウォーリア", emoji: "🚀", color: "#ffd54f" },
  { name: "バギングデーモン", emoji: "🎒", color: "#ef9a9a" },
  { name: "スタッキングゾンビ", emoji: "📚", color: "#b39ddb" },
  { name: "フィーチャーエンジニア", emoji: "🔧", color: "#4fc3f7" },
  { name: "次元削減ウィッチ", emoji: "📉", color: "#ce93d8" },
  { name: "PCAゴースト", emoji: "🔭", color: "#80deea" },
  { name: "クラスタリングデーモン", emoji: "🎯", color: "#a5d6a7" },
  { name: "KMeansゴーレム", emoji: "🎪", color: "#ffb74d" },
  { name: "ラストボスΩ", emoji: "🐉", color: "#ef5350" },
];

const DOMAIN_COLORS = {
  "生成AIの基礎": "#4fc3f7",
  "データ準備": "#81c784",
  "アプリ開発": "#ffb74d",
  "評価と最適化": "#f06292",
  "セキュリティ": "#ce93d8",
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
  const [filteredQuestions, setFilteredQuestions] = useState(QUESTIONS);
  const [showMenu, setShowMenu] = useState(true);
  const [selectedMode, setSelectedMode] = useState(null);

  const q = filteredQuestions[Math.min(qIndex, filteredQuestions.length - 1)];
  const monster = MONSTERS[Math.min(qIndex, MONSTERS.length - 1)];
  const accentColor = monster?.color || "#4fc3f7";

  // optionsからA. B. C. D.プレフィックスを除去
  const cleanChoice = (str) => str.replace(/^[A-D]\.\s*/, "");

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
    setMessages([`${monster?.name || "モンスター"}が　あらわれた！`]);
    setPhase("question");
  };

  const startGame = (mode) => {
    let questions;
    if (mode === "all") {
      questions = QUESTIONS;
    } else if (mode === "random20") {
      questions = [...QUESTIONS].sort(() => Math.random() - 0.5).slice(0, 20);
    } else {
      questions = QUESTIONS;
    }
    setFilteredQuestions(questions);
    setSelectedMode(mode);
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
    const correct = idx === q.answer;

    if (correct) {
      const dmg = Math.floor(Math.random() * 15) + 20;
      setMonsterShaking(true);
      await delay(120);
      setMonsterShaking(false);
      setMonsterFlashing(true);
      setShowDamage({ value: dmg, correct: true });
      const newMHp = Math.max(0, monsterHp - dmg);
      setMonsterHp(newMHp);
      setMessages([`せいかい！　${monster?.name}に　${dmg}の　ダメージ！`]);
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
        setMessages([`${monster?.name}を　たおした！`, "8けいけんちを　かくとく！"]);
      } else {
        setMessages([`せいかい！　ダメージ: ${dmg}`]);
      }
    } else {
      const pDmg = Math.floor(Math.random() * 8) + 5;
      setPlayerShaking(true);
      setShowDamage({ value: pDmg, correct: false, onPlayer: true });
      const newHp = Math.max(0, playerHp - pDmg);
      setPlayerHp(newHp);
      setMessages([`まちがい！　${monster?.name}の　はんげき！`, `${pDmg}の　ダメージを　うけた！`]);
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
      const nextMonster = MONSTERS[Math.min(next, MONSTERS.length - 1)];
      setMonsterHp(100);
      setMonsterDefeated(false);
      setMonsterFlashing(false);
      setMonsterShaking(false);
      setSelectedIdx(null);
      setShowDamage(null);
      setShowExplanation(false);
      setAnswered(false);
      setMessages([`${nextMonster?.name}が　あらわれた！`]);
      setPhase("question");
    }
  };

  const choiceBg = (i) => {
    if (!answered) return "linear-gradient(135deg, #0d1f3c, #162440)";
    if (i === q.answer) return "linear-gradient(135deg, #1b3a1b, #2e5e2e)";
    if (i === selectedIdx && i !== q.answer) return "linear-gradient(135deg, #3a1b1b, #5e2e2e)";
    return "linear-gradient(135deg, #0a1628, #0d1e38)";
  };
  const choiceBorderColor = (i) => {
    if (!answered) return "#2a5298";
    if (i === q.answer) return "#66bb6a";
    if (i === selectedIdx && i !== q.answer) return "#ef5350";
    return "#1a2a4a";
  };
  const choiceTextColor = (i) => {
    if (!answered) return "#e2e8f0";
    if (i === q.answer) return "#a5d6a7";
    if (i === selectedIdx && i !== q.answer) return "#ef9a9a";
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
          fontFamily: "'DotGothic16', monospace", padding: 16, position: "relative",
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
              <div style={{ fontSize: 9, color: "#4a6fa5", letterSpacing: 3, marginBottom: 10 }}>
                ⚔ AWS Certified Generative AI Developer Professional ⚔
              </div>
              <div style={{ fontSize: 20, color: "#ffd700", textShadow: "0 0 20px #ffd700", marginBottom: 6 }}>
                もぎしけん　200問
              </div>
              <div style={{ fontSize: 11, color: "#546e7a" }}>全{QUESTIONS.length}問　モンスター200種類</div>
            </div>
            <div style={{
              background: "rgba(10,16,32,0.9)", border: "2px solid #2a4a7f",
              borderRadius: 8, padding: "20px 16px",
              display: "flex", flexDirection: "column", gap: 10,
            }}>
              <button onClick={() => startGame("all")} style={{
                background: "linear-gradient(135deg, #1a3a6a, #2a5298)",
                border: "2px solid #4a90d9", borderRadius: 6,
                color: "#ffd700", fontFamily: "'DotGothic16', monospace",
                fontSize: 14, padding: "12px", cursor: "pointer", letterSpacing: 1,
              }}>
                ▶ 全問チャレンジ（{QUESTIONS.length}問）
              </button>
              <button onClick={() => startGame("random20")} style={{
                background: "linear-gradient(135deg, #1a3a2a, #2a5a3a)",
                border: "2px solid #4a9a6a", borderRadius: 6,
                color: "#a5d6a7", fontFamily: "'DotGothic16', monospace",
                fontSize: 13, padding: "10px", cursor: "pointer", letterSpacing: 1,
              }}>
                🎲 ランダム20問
              </button>
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
        fontFamily: "'DotGothic16', monospace", padding: 12, position: "relative", overflow: "hidden",
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
              background: "transparent", border: "1px solid #2a4a7f", borderRadius: 4,
              color: "#546e7a", fontFamily: "'DotGothic16', monospace",
              fontSize: 10, padding: "3px 8px", cursor: "pointer",
            }}>◀ もどる</button>
            <div style={{ fontSize: 9, color: accentColor, letterSpacing: 1 }}>
              No.{Math.min(qIndex + 1, MONSTERS.length)} {monster?.name}
            </div>
            <div style={{ fontSize: 9, color: "#546e7a" }}>{qIndex + 1}/{filteredQuestions.length}</div>
          </div>

          {/* プログレスバー */}
          <div style={{ height: 3, background: "#0d1628", borderRadius: 2, marginBottom: 10, border: "1px solid #1a2a4a" }}>
            <div style={{
              height: "100%", width: `${(qIndex / filteredQuestions.length) * 100}%`,
              background: `linear-gradient(90deg, #4a6fa5, ${accentColor})`,
              borderRadius: 2, transition: "width 0.8s ease", boxShadow: `0 0 8px ${accentColor}`,
            }} />
          </div>

          {/* バトルフィールド */}
          <div style={{
            background: "linear-gradient(180deg, #060e1e 0%, #0a1628 50%, #0d1a10 100%)",
            border: `2px solid ${accentColor}40`, borderRadius: 8,
            padding: "16px 20px 12px", marginBottom: 8, minHeight: 180,
            position: "relative", overflow: "hidden", boxShadow: `0 0 30px ${accentColor}15`,
          }}>
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0, height: 32,
              background: "linear-gradient(180deg, #0d1a10 0%, #060e08 100%)",
              borderTop: `1px solid ${accentColor}20`,
            }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", position: "relative" }}>
              {/* プレイヤー */}
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
                {showDamage?.onPlayer && (
                  <div style={{
                    position: "absolute", top: "30%", left: "10%",
                    fontSize: 22, fontWeight: "bold", color: "#ef5350",
                    textShadow: "2px 2px 0 #000", animation: "floatDmg 1s ease-out forwards", pointerEvents: "none",
                  }}>-{showDamage.value}</div>
                )}
              </div>

              {/* モンスター */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
                <div style={{ fontSize: 9, color: accentColor, letterSpacing: 1 }}>{monster?.name}</div>
                <div style={{
                  fontSize: 80, lineHeight: 1, userSelect: "none",
                  filter: monsterDefeated ? "grayscale(1) opacity(0.2)"
                    : monsterFlashing ? "brightness(5)"
                    : `drop-shadow(0 0 16px ${accentColor})`,
                  animation: monsterShaking ? "enemyShake 0.3s ease" : "none",
                  opacity: monsterDefeated ? 0 : 1,
                  transition: "opacity 0.5s, filter 0.15s",
                }}>
                  {monster?.emoji}
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
                {showDamage?.correct && (
                  <div style={{
                    position: "absolute", top: "20%", right: "10%",
                    fontSize: 26, fontWeight: "bold", color: "#ffd700",
                    textShadow: "2px 2px 0 #000", animation: "floatDmg 1s ease-out forwards", pointerEvents: "none",
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
              <span style={{ color: accentColor, fontSize: 9, marginRight: 6 }}>【問{qIndex + 1}】</span>
              {q.question}
            </div>
          )}

          {/* 選択肢 */}
          {(phase === "question" || phase === "result") && q && (
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 6 }}>
              {q.options.map((choice, i) => (
                <button key={i} onClick={() => handleAnswer(i)} disabled={answered} style={{
                  background: choiceBg(i), border: `2px solid ${choiceBorderColor(i)}`,
                  borderRadius: 4, color: choiceTextColor(i),
                  fontFamily: "'DotGothic16', monospace",
                  fontSize: 11, padding: "8px 12px",
                  cursor: answered ? "default" : "pointer",
                  textAlign: "left", lineHeight: 1.5, transition: "all 0.2s",
                  display: "flex", alignItems: "flex-start", gap: 8,
                }}>
                  <span style={{ color: answered && i === q.answer ? "#66bb6a" : answered && i === selectedIdx ? "#ef5350" : accentColor, flexShrink: 0 }}>
                    {answered ? (i === q.answer ? "✓" : i === selectedIdx ? "✗" : ["Ａ","Ｂ","Ｃ","Ｄ"][i]) : ["Ａ","Ｂ","Ｃ","Ｄ"][i]}
                  </span>
                  {cleanChoice(choice)}
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
              width: "100%", background: `linear-gradient(135deg, #0d2040, #1a3a6a)`,
              border: `2px solid ${accentColor}`, borderRadius: 6, color: "#ffd700",
              fontFamily: "'DotGothic16', monospace", fontSize: 13, padding: "10px",
              cursor: "pointer", letterSpacing: 2, boxShadow: `0 0 12px ${accentColor}30`,
            }}>
              ▶ つぎへ ({qIndex + 1}/{filteredQuestions.length})
            </button>
          )}

          {phase === "animating" && (
            <div style={{ textAlign: "center", padding: 14, color: "#4a6fa5", fontSize: 12, letterSpacing: 3 }}>・・・</div>
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
                  border: "2px solid #c62828", borderRadius: 4, color: "#ffd700",
                  fontFamily: "'DotGothic16', monospace", fontSize: 12, padding: "8px 18px", cursor: "pointer",
                }}>▶ もう一度</button>
                <button onClick={() => setShowMenu(true)} style={{
                  background: "transparent", border: "1px solid #546e7a", borderRadius: 4,
                  color: "#546e7a", fontFamily: "'DotGothic16', monospace",
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
                  border: "2px solid #66bb6a", borderRadius: 4, color: "#ffd700",
                  fontFamily: "'DotGothic16', monospace", fontSize: 12, padding: "8px 18px", cursor: "pointer",
                }}>▶ もう一度</button>
                <button onClick={() => setShowMenu(true)} style={{
                  background: "transparent", border: "1px solid #546e7a", borderRadius: 4,
                  color: "#546e7a", fontFamily: "'DotGothic16', monospace",
                  fontSize: 12, padding: "8px 18px", cursor: "pointer",
                }}>メニューへ</button>
              </div>
            </div>
          )}

          {/* ドット進捗 */}
          <div style={{ display: "flex", justifyContent: "center", gap: 3, marginTop: 10, flexWrap: "wrap" }}>
            {filteredQuestions.map((_, i) => (
              <div key={i} style={{
                width: 5, height: 5, borderRadius: "50%",
                background: i < qIndex ? MONSTERS[Math.min(i, MONSTERS.length - 1)].color : i === qIndex ? "#ffd700" : "#1a2a4a",
                border: "1px solid #2a4a7f", transition: "background 0.5s",
              }} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
