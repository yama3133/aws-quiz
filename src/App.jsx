import { useState, useEffect, useRef } from "react";

const QUESTIONS = [
  // ドメイン1: 生成AIの基礎
  {
    domain: "生成AIの基礎",
    monster: "プロンプトスライム",
    monsterHp: 10,
    question: "金融アナリストが複雑な推論を必要とするタスクを実行する際、モデルが論理的な飛躍を犯します。精度向上のための最適なプロンプト手法は？",
    choices: ["Few-shot prompting", "Chain-of-Thought (CoT) prompting", "Meta-prompting", "Directional-stimulus prompting"],
    correct: 1,
    explanation: "CoTは推論過程をステップごとに書き出させることで論理的精度を高める手法です。",
    exp: 8, gold: 3,
  },
  {
    domain: "生成AIの基礎",
    monster: "レイテンシードラキー",
    monsterHp: 10,
    question: "低コスト・低レイテンシ・高スループットを最優先する単純な分類タスクに最適なAmazon Bedrockのモデルは？",
    choices: ["Claude 3.5 Sonnet", "Claude 3 Haiku", "Llama 3 70B", "Mistral Large"],
    correct: 1,
    explanation: "Claude 3 HaikuはClaudeファミリーの中で最も速く・安く、単純タスクに最適です。",
    exp: 8, gold: 3,
  },
  {
    domain: "生成AIの基礎",
    monster: "エンベディングゴースト",
    monsterHp: 10,
    question: "テキストを意味的なベクトルに変換し、類似性検索を可能にする技術は？",
    choices: ["Tokenization", "Embedding", "Normalization", "Quantization"],
    correct: 1,
    explanation: "Embeddingはテキストを数値ベクトルに変換し、コサイン類似度などで意味的な近さを計算できます。",
    exp: 8, gold: 3,
  },
  {
    domain: "生成AIの基礎",
    monster: "アウトペイントスライム",
    monsterHp: 10,
    question: "画像生成において、既存の画像の周囲に新しい背景を描き足す手法は？",
    choices: ["Outpainting", "Inpainting", "Style Transfer", "Text-to-Image"],
    correct: 0,
    explanation: "Outpaintingは既存画像の外側を拡張して新しい背景を生成します。Inpaintingは画像の内側を修正します。",
    exp: 8, gold: 3,
  },
  {
    domain: "生成AIの基礎",
    monster: "トークンゾンビ",
    monsterHp: 10,
    question: "LLMが処理する最小単位（単語や部分単語）を何と呼びますか？",
    choices: ["Node", "Token", "Layer", "Weight"],
    correct: 1,
    explanation: "TokenはLLMが処理する最小単位で、単語・部分単語・文字などで構成されます。",
    exp: 8, gold: 3,
  },
  // ドメイン2: データ準備
  {
    domain: "データ準備",
    monster: "チャンキングオーク",
    monsterHp: 14,
    question: "RAG構築時、大規模ドキュメントを分割するプロセスは？",
    choices: ["Sharding", "Chunking", "Partitioning", "Indexing"],
    correct: 1,
    explanation: "Chunkingはドキュメントを検索可能な小さなチャンクに分割するプロセスです。",
    exp: 10, gold: 5,
  },
  {
    domain: "データ準備",
    monster: "コンテキストゴーレム",
    monsterHp: 14,
    question: "チャンキングで「オーバーラップ」を設定する主な目的は？",
    choices: ["ストレージ効率化", "チャンク境界での文脈（コンテキスト）の維持", "検索速度向上", "データの冗長化"],
    correct: 1,
    explanation: "オーバーラップにより、チャンクをまたぐ文脈の欠落を防ぎ、検索精度を向上させます。",
    exp: 10, gold: 5,
  },
  {
    domain: "データ準備",
    monster: "ベクトルウィザード",
    monsterHp: 14,
    question: "Bedrock Knowledge Basesで推奨されるサーバーレス・ベクトルエンジンは？",
    choices: ["Amazon Aurora (pgvector)", "Amazon OpenSearch Serverless (ベクトルエンジン)", "Amazon DynamoDB", "Amazon RDS"],
    correct: 1,
    explanation: "Amazon OpenSearch Serverlessのベクトルエンジンがフルマネージドで推奨されます。",
    exp: 10, gold: 5,
  },
  {
    domain: "データ準備",
    monster: "コサインデーモン",
    monsterHp: 14,
    question: "埋め込みベクトル間の類似度を測る最も一般的な指標は？",
    choices: ["Euclidean distance", "Cosine similarity", "Hamming distance", "Manhattan distance"],
    correct: 1,
    explanation: "Cosine similarityはベクトルの向きの近さを測り、意味的類似度の計算に広く使われます。",
    exp: 10, gold: 5,
  },
  {
    domain: "データ準備",
    monster: "マトリョーシカスライム",
    monsterHp: 14,
    question: "次元数を削減しても検索精度を保てるTitan Embeddings v2の機能は？",
    choices: ["Scalable Embedding", "Matryoshka Embedding", "Quantized Embedding", "Sparse Vector"],
    correct: 1,
    explanation: "Matryoshka Embeddingは入れ子構造で次元を削減しても精度を保てる効率的な埋め込み手法です。",
    exp: 10, gold: 5,
  },
  // ドメイン3: 開発
  {
    domain: "アプリケーション開発",
    monster: "アクショングループドラゴン",
    monsterHp: 18,
    question: "Bedrock Agentsが既存のAPIと連携してアクションを実行するために必要な設定は？",
    choices: ["Knowledge Base", "Action Group (と Lambda 関数)", "Guardrails", "Provisioned Throughput"],
    correct: 1,
    explanation: "Action GroupはOpenAPI仕様とLambda関数を使い、エージェントが外部APIを呼び出せるようにします。",
    exp: 14, gold: 7,
  },
  {
    domain: "アプリケーション開発",
    monster: "ストリームスペクター",
    monsterHp: 18,
    question: "回答を1文字ずつリアルタイムでストリーミング表示するAPIは？",
    choices: ["InvokeModel", "InvokeModelWithResponseStream", "GetModelInvocationJob", "Converse"],
    correct: 1,
    explanation: "InvokeModelWithResponseStreamはチャンク単位でレスポンスをストリーミングし、UXを向上させます。",
    exp: 14, gold: 7,
  },
  {
    domain: "アプリケーション開発",
    monster: "コンバースナイト",
    monsterHp: 18,
    question: "モデル間で共通のメッセージ形式を使用できるBedrockの統一APIは？",
    choices: ["InvokeModel", "Converse API", "ApplyGuardrail", "ListFoundationModels"],
    correct: 1,
    explanation: "Converse APIは異なるベンダーのモデルに対して共通のmessages配列形式でリクエストできます。",
    exp: 14, gold: 7,
  },
  {
    domain: "アプリケーション開発",
    monster: "メモリーゴースト",
    monsterHp: 18,
    question: "会話履歴を保持し、文脈を維持するためにLangChainで使われるのは？",
    choices: ["Chain", "Memory", "Agent", "Loader"],
    correct: 1,
    explanation: "LangChainのMemoryモジュールが会話の文脈（履歴）を保持します。",
    exp: 14, gold: 7,
  },
  {
    domain: "アプリケーション開発",
    monster: "トレースデーモン",
    monsterHp: 18,
    question: "Agentsの思考プロセス（ReAct）をデバッグするための機能は？",
    choices: ["CloudWatch Logs", "Trace capability", "AWS X-Ray", "CloudTrail"],
    correct: 1,
    explanation: "Trace capabilityによりエージェントのReActループ（思考→行動→観察）の各ステップを確認できます。",
    exp: 14, gold: 7,
  },
  // ドメイン4: 評価と最適化
  {
    domain: "評価と最適化",
    monster: "ROUGEワイバーン",
    monsterHp: 22,
    question: "要約タスクにおいて、正解データとの重複を測る自動評価指標は？",
    choices: ["BLEU", "ROUGE", "Perplexity", "BERTScore"],
    correct: 1,
    explanation: "ROUGEは要約評価に使われ、正解との単語・フレーズの重複率（再現率）を測定します。",
    exp: 16, gold: 8,
  },
  {
    domain: "評価と最適化",
    monster: "LoRAリッチ",
    monsterHp: 22,
    question: "パラメータ効率の良い微調整（PEFT）において、低ランク行列を使用する手法は？",
    choices: ["Full Fine-tuning", "LoRA (Low-Rank Adaptation)", "Quantization", "Knowledge Distillation"],
    correct: 1,
    explanation: "LoRAはモデルの一部に低ランク行列を追加し、元のパラメータを固定したまま少ないコストで微調整します。",
    exp: 16, gold: 8,
  },
  {
    domain: "評価と最適化",
    monster: "フェイスフルネスドラゴン",
    monsterHp: 22,
    question: "RAG評価において、回答がコンテキストに忠実（ハルシネーションがない）かを測る指標は？",
    choices: ["Answer Relevance", "Faithfulness", "Context Precision", "Context Recall"],
    correct: 1,
    explanation: "Faithfulnessは回答が検索されたソース（根拠）に基づいているかを評価し、幻覚（ハルシネーション）を検出します。",
    exp: 16, gold: 8,
  },
  {
    domain: "評価と最適化",
    monster: "量子化キメラ",
    monsterHp: 22,
    question: "モデルの精度を維持しつつ、重みのビット数を落として軽量化する技術は？",
    choices: ["Pruning", "Quantization（量子化）", "Distillation", "Fine-tuning"],
    correct: 1,
    explanation: "Quantizationはパラメータのビット精度を下げてモデルを軽量化し、推論速度を向上させます。",
    exp: 16, gold: 8,
  },
  {
    domain: "評価と最適化",
    monster: "クラリファイサー",
    monsterHp: 22,
    question: "SageMakerでモデルのバイアスを検出し、説明可能性を提供するのは？",
    choices: ["SageMaker Clarify", "SageMaker Ground Truth", "SageMaker Model Monitor", "SageMaker Pipelines"],
    correct: 0,
    explanation: "SageMaker ClarifyはAIモデルのバイアス検出とSHAPによる予測の説明可能性を提供します。",
    exp: 16, gold: 8,
  },
  // ドメイン5: セキュリティ
  {
    domain: "セキュリティ",
    monster: "プライバシーリンク",
    monsterHp: 26,
    question: "インターネットを介さずVPC内からBedrockに接続するサービスは？",
    choices: ["Internet Gateway", "AWS PrivateLink (Interface VPC Endpoint)", "NAT Gateway", "Client VPN"],
    correct: 1,
    explanation: "AWS PrivateLinkを使うとインターネットを経由せずVPCからBedrockへ安全に接続できます。",
    exp: 18, gold: 10,
  },
  {
    domain: "セキュリティ",
    monster: "PIIマスカー",
    monsterHp: 26,
    question: "PII（個人情報）を自動的に検出してマスクするGuardrailsの機能は？",
    choices: ["Content filters", "Sensitive information filters (PII)", "Denied topics", "Word filters"],
    correct: 1,
    explanation: "Sensitive information filtersはPIIを自動検出し、マスキングや匿名化を行います。",
    exp: 18, gold: 10,
  },
  {
    domain: "セキュリティ",
    monster: "責任共有ボス",
    monsterHp: 26,
    question: "責任共有モデルにおいて、ユーザーの責任範囲に含まれるのは？",
    choices: [
      "物理的なデータセンターの保護",
      "基盤モデル自体のコード",
      "アプリケーションコードとデータの暗号化、プロンプトの内容",
      "ハードウェアの廃棄"
    ],
    correct: 2,
    explanation: "AWSの責任共有モデルでは、アプリのコード・データ・プロンプト設計はユーザー側の責任です。",
    exp: 18, gold: 10,
  },
  {
    domain: "セキュリティ",
    monster: "ウォーターマークゴーレム",
    monsterHp: 26,
    question: "生成画像にAI製であることを示す不可視の透かしを入れる技術は？",
    choices: ["Encryption", "Digital Watermarking", "Steganography", "Metadata Tagging"],
    correct: 1,
    explanation: "Digital Watermarkingは人間の目には見えない透かしを画像に埋め込み、AI生成を証明します。",
    exp: 18, gold: 10,
  },
  {
    domain: "セキュリティ",
    monster: "ガードレールドラゴン",
    monsterHp: 30,
    question: "Bedrockに入力された顧客データは、ベースモデルの学習に使われますか？",
    choices: ["はい、すべて学習に使われる", "いいえ（AWSは学習に利用しない）", "オプトインした場合のみ", "リージョンによって異なる"],
    correct: 1,
    explanation: "AWSはBedrockに入力された顧客データをベースモデルの学習・改善に使用しないことを保証しています。",
    exp: 20, gold: 15,
  },
];

const DOMAIN_COLORS = {
  "生成AIの基礎": "#4fc3f7",
  "データ準備": "#81c784",
  "アプリケーション開発": "#ffb74d",
  "評価と最適化": "#f06292",
  "セキュリティ": "#ce93d8",
};

const MONSTER_EMOJIS = {
  "プロンプトスライム": "🟦",
  "レイテンシードラキー": "🦇",
  "エンベディングゴースト": "👻",
  "アウトペイントスライム": "🎨",
  "トークンゾンビ": "🧟",
  "チャンキングオーク": "🪓",
  "コンテキストゴーレム": "🗿",
  "ベクトルウィザード": "🧙",
  "コサインデーモン": "😈",
  "マトリョーシカスライム": "🪆",
  "アクショングループドラゴン": "🐉",
  "ストリームスペクター": "💫",
  "コンバースナイト": "⚔️",
  "メモリーゴースト": "🌀",
  "トレースデーモン": "🔍",
  "ROUGEワイバーン": "🦅",
  "LoRAリッチ": "🧬",
  "フェイスフルネスドラゴン": "🔥",
  "量子化キメラ": "⚡",
  "クラリファイサー": "🔭",
  "プライバシーリンク": "🔗",
  "PIIマスカー": "🎭",
  "責任共有ボス": "👑",
  "ウォーターマークゴーレム": "💧",
  "ガードレールドラゴン": "🛡️",
};

const PLAYER_MAX_HP = 50;
const PLAYER_MAX_MP = 20;

const delay = ms => new Promise(r => setTimeout(r, ms));

const PixelMonster = ({ name, hp, maxHp, shaking, flashing, defeated, domain }) => {
  const color = DOMAIN_COLORS[domain] || "#4fc3f7";
  const emoji = MONSTER_EMOJIS[name] || "👾";
  const pct = Math.max(0, hp / maxHp);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
      <div style={{ fontSize: 10, color: color, fontFamily: "monospace", letterSpacing: 2, textAlign: "right" }}>
        {name}
      </div>
      <div style={{
        fontSize: 72,
        filter: defeated ? "grayscale(1) opacity(0.2)"
          : flashing ? "brightness(4)"
          : `drop-shadow(0 0 16px ${color})`,
        transform: shaking ? "translateX(10px) rotate(5deg)"
          : defeated ? "translateY(40px) scale(0.5)"
          : "none",
        transition: "transform 0.15s, filter 0.15s, opacity 0.6s",
        opacity: defeated ? 0 : 1,
        lineHeight: 1,
        userSelect: "none",
      }}>
        {emoji}
      </div>
      <div style={{ width: 140 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
          <span style={{ fontSize: 9, color: color, fontFamily: "monospace" }}>HP</span>
          <span style={{ fontSize: 9, color: "#90a4ae", fontFamily: "monospace" }}>{hp}/{maxHp}</span>
        </div>
        <div style={{ height: 5, background: "#111", borderRadius: 3, border: "1px solid #333" }}>
          <div style={{
            height: "100%",
            width: `${pct * 100}%`,
            background: pct > 0.5 ? "#66bb6a" : pct > 0.25 ? "#ffa726" : "#ef5350",
            borderRadius: 3,
            transition: "width 0.5s",
            boxShadow: `0 0 6px ${pct > 0.5 ? "#66bb6a" : "#ef5350"}`,
          }} />
        </div>
      </div>
    </div>
  );
};

const PlayerStatus = ({ hp, mp, maxHp, maxMp, level, exp, shaking }) => (
  <div style={{
    background: "rgba(10,22,40,0.9)",
    border: "2px solid #2a4a7f",
    borderRadius: 6,
    padding: "8px 14px",
    fontFamily: "monospace",
    transform: shaking ? "translateX(-8px)" : "none",
    transition: "transform 0.1s",
    backdropFilter: "blur(4px)",
  }}>
    <div style={{ fontSize: 12, color: "#ffd700", marginBottom: 6 }}>
      ゆうしゃ <span style={{ fontSize: 10, color: "#90caf9" }}>Lv.{level}</span>
    </div>
    {[
      { label: "HP", val: hp, max: maxHp, color: hp / maxHp > 0.5 ? "#66bb6a" : hp / maxHp > 0.25 ? "#ffa726" : "#ef5350", accent: "#ef5350" },
      { label: "MP", val: mp, max: maxMp, color: "#42a5f5", accent: "#42a5f5" },
    ].map(({ label, val, max, color, accent }) => (
      <div key={label} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
        <span style={{ fontSize: 9, color: accent, width: 18 }}>{label}</span>
        <div style={{ flex: 1, height: 5, background: "#0a1628", borderRadius: 3 }}>
          <div style={{ height: "100%", width: `${Math.max(0, val / max * 100)}%`, background: color, borderRadius: 3, transition: "width 0.5s" }} />
        </div>
        <span style={{ fontSize: 9, color: "#cfd8dc", width: 36, textAlign: "right" }}>{val}/{max}</span>
      </div>
    ))}
    <div style={{ fontSize: 9, color: "#546e7a", marginTop: 3 }}>EXP: {exp}</div>
  </div>
);

const TypewriterText = ({ text, speed = 40 }) => {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const iv = setInterval(() => {
      if (i < text.length) { setDisplayed(text.slice(0, ++i)); }
      else clearInterval(iv);
    }, speed);
    return () => clearInterval(iv);
  }, [text]);
  return <span>{displayed}</span>;
};

export default function AWSQuiz() {
  const [qIndex, setQIndex] = useState(0);
  const [phase, setPhase] = useState("battle");
  const [messages, setMessages] = useState([]);
  const [subMsg, setSubMsg] = useState("");
  const [playerHp, setPlayerHp] = useState(PLAYER_MAX_HP);
  const [playerMp, setPlayerMp] = useState(PLAYER_MAX_MP);
  const [playerLevel, setPlayerLevel] = useState(1);
  const [playerExp, setPlayerExp] = useState(0);
  const [monsterHp, setMonsterHp] = useState(QUESTIONS[0].monsterHp);
  const [monsterShaking, setMonsterShaking] = useState(false);
  const [monsterFlashing, setMonsterFlashing] = useState(false);
  const [monsterDefeated, setMonsterDefeated] = useState(false);
  const [playerShaking, setPlayerShaking] = useState(false);
  const [showDamage, setShowDamage] = useState(null);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [totalGold, setTotalGold] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answered, setAnswered] = useState(false);

  const q = QUESTIONS[qIndex];

  useEffect(() => {
    initBattle(0);
  }, []);

  const initBattle = (idx) => {
    const quest = QUESTIONS[idx];
    setQIndex(idx);
    setMonsterHp(quest.monsterHp);
    setMonsterDefeated(false);
    setMonsterFlashing(false);
    setMonsterShaking(false);
    setSelectedIdx(null);
    setShowDamage(null);
    setShowExplanation(false);
    setAnswered(false);
    setMessages([`${quest.monster}があらわれた！`]);
    setSubMsg(`【${quest.domain}】${quest.question}`);
    setPhase("question");
  };

  const handleAnswer = async (idx) => {
    if (answered || phase !== "question") return;
    setAnswered(true);
    setSelectedIdx(idx);
    const correct = idx === q.correct;
    setPhase("animating");

    if (correct) {
      setMonsterShaking(true);
      await delay(120);
      setMonsterShaking(false);
      setMonsterFlashing(true);
      const dmg = Math.floor(Math.random() * 6) + 10;
      setShowDamage({ value: dmg, isPlayer: false });
      const newMHp = Math.max(0, monsterHp - dmg);
      setMonsterHp(newMHp);
      setMessages([`せいかい！ ${q.monster}に ${dmg}のダメージ！`]);
      await delay(500);
      setMonsterFlashing(false);
      setShowDamage(null);

      const newExp = playerExp + q.exp;
      const newLv = Math.floor(newExp / 50) + 1;
      const lvUp = newLv > playerLevel;
      setPlayerExp(newExp);
      if (lvUp) setPlayerLevel(newLv);
      setTotalCorrect(c => c + 1);
      setTotalGold(g => g + q.gold);

      if (newMHp <= 0) {
        setMonsterDefeated(true);
        await delay(500);
        setMessages([
          `${q.monster}をたおした！`,
          `${q.exp}けいけんちを かくとく！${lvUp ? ` レベルアップ！Lv.${newLv}！` : ""}`,
        ]);
      } else {
        setMessages([`せいかい！ ${q.monster}に ${dmg}のダメージ！`, "つぎのもんだいへ..."]);
      }
    } else {
      const pDmg = Math.floor(Math.random() * 6) + 5;
      setPlayerShaking(true);
      setShowDamage({ value: pDmg, isPlayer: true });
      const newHp = Math.max(0, playerHp - pDmg);
      setPlayerHp(newHp);
      setMessages([`まちがい！ ${q.monster}のはんげき！`, `${pDmg}のダメージをうけた！`]);
      await delay(400);
      setPlayerShaking(false);
      setShowDamage(null);

      if (newHp <= 0) {
        setMessages(["HPがゼロに！", "しんでしまった..."]);
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
    if (next >= QUESTIONS.length) {
      setPhase("clear");
    } else {
      initBattle(next);
    }
  };

  const handleRestart = () => {
    setPlayerHp(PLAYER_MAX_HP);
    setPlayerMp(PLAYER_MAX_MP);
    setPlayerLevel(1);
    setPlayerExp(0);
    setTotalCorrect(0);
    setTotalGold(0);
    initBattle(0);
  };

  const domainColor = DOMAIN_COLORS[q?.domain] || "#4fc3f7";
  const progress = qIndex / QUESTIONS.length;

  const choiceBg = (i) => {
    if (!answered) return "linear-gradient(135deg, #0d1f3c, #162440)";
    if (i === q.correct) return "linear-gradient(135deg, #1b3a1b, #2e5e2e)";
    if (i === selectedIdx && i !== q.correct) return "linear-gradient(135deg, #3a1b1b, #5e2e2e)";
    return "linear-gradient(135deg, #0a1628, #0d1e38)";
  };
  const choiceBorder = (i) => {
    if (!answered) return "2px solid #2a5298";
    if (i === q.correct) return "2px solid #66bb6a";
    if (i === selectedIdx && i !== q.correct) return "2px solid #ef5350";
    return "2px solid #1a2a4a";
  };
  const choiceColor = (i) => {
    if (!answered) return "#e2e8f0";
    if (i === q.correct) return "#a5d6a7";
    if (i === selectedIdx && i !== q.correct) return "#ef9a9a";
    return "#37474f";
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DotGothic16&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; }
        @keyframes floatDmg {
          0% { opacity: 1; transform: translateY(0) scale(1.3); }
          100% { opacity: 0; transform: translateY(-70px) scale(0.9); }
        }
        @keyframes blink { 0%,100% { opacity:1 } 50% { opacity:0 } }
        @keyframes starPulse { 0%,100% { opacity:0.2 } 50% { opacity:0.9 } }
        @keyframes bgMove {
          0% { background-position: 0% 0%; }
          100% { background-position: 100% 100%; }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, #060a18 0%, #0a1020 40%, #0e1830 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 12,
        fontFamily: "'DotGothic16', monospace",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Stars */}
        {[...Array(40)].map((_, i) => (
          <div key={i} style={{
            position: "fixed",
            width: i % 5 === 0 ? 3 : 2,
            height: i % 5 === 0 ? 3 : 2,
            background: "#fff",
            borderRadius: "50%",
            left: `${(i * 37 + 13) % 100}%`,
            top: `${(i * 23 + 7) % 70}%`,
            animation: `starPulse ${1.5 + (i % 3) * 0.7}s infinite`,
            animationDelay: `${(i * 0.13) % 2}s`,
            pointerEvents: "none",
          }} />
        ))}

        <div style={{ width: "100%", maxWidth: 560, position: "relative", zIndex: 1 }}>
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 9, color: "#4a6fa5", letterSpacing: 3 }}>
              AWS GDA-C01 QUIZ
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ fontSize: 9, color: domainColor }}>{q?.domain}</div>
              <div style={{ fontSize: 9, color: "#546e7a" }}>{qIndex + 1}/{QUESTIONS.length}</div>
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ height: 3, background: "#0d1628", borderRadius: 2, marginBottom: 10, border: "1px solid #1a2a4a" }}>
            <div style={{
              height: "100%",
              width: `${progress * 100}%`,
              background: `linear-gradient(90deg, #4a6fa5, ${domainColor})`,
              borderRadius: 2,
              transition: "width 0.8s ease",
              boxShadow: `0 0 8px ${domainColor}`,
            }} />
          </div>

          {/* Battle field */}
          <div style={{
            background: "linear-gradient(180deg, #060e1e 0%, #0a1628 50%, #0d1a10 100%)",
            border: `2px solid ${domainColor}40`,
            borderRadius: 8,
            padding: "16px 20px 12px",
            marginBottom: 8,
            minHeight: 180,
            position: "relative",
            overflow: "hidden",
            boxShadow: `0 0 30px ${domainColor}20`,
          }}>
            {/* Ground */}
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0, height: 32,
              background: "linear-gradient(180deg, #0d1a10 0%, #060e08 100%)",
              borderTop: `1px solid ${domainColor}30`,
            }} />

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
              {/* Player */}
              <PlayerStatus
                hp={playerHp} mp={playerMp}
                maxHp={PLAYER_MAX_HP} maxMp={PLAYER_MAX_MP}
                level={playerLevel} exp={playerExp}
                shaking={playerShaking}
              />

              {/* Monster */}
              {q && (
                <PixelMonster
                  name={q.monster}
                  hp={monsterHp}
                  maxHp={q.monsterHp}
                  shaking={monsterShaking}
                  flashing={monsterFlashing}
                  defeated={monsterDefeated}
                  domain={q.domain}
                />
              )}
            </div>

            {/* Damage floats */}
            {showDamage && (
              <div style={{
                position: "absolute",
                top: showDamage.isPlayer ? "55%" : "20%",
                left: showDamage.isPlayer ? "5%" : "65%",
                fontSize: 24,
                fontWeight: "bold",
                color: showDamage.isPlayer ? "#ef5350" : "#ffd700",
                textShadow: "2px 2px 0 #000, -1px -1px 0 #000",
                animation: "floatDmg 1s ease-out forwards",
                pointerEvents: "none",
                zIndex: 10,
              }}>
                -{showDamage.value}
              </div>
            )}
          </div>

          {/* Message window */}
          <div style={{
            background: "linear-gradient(135deg, #060e1e 0%, #0a1628 100%)",
            border: `2px solid ${domainColor}60`,
            borderRadius: 6,
            padding: "10px 14px",
            marginBottom: 6,
            minHeight: 56,
            boxShadow: `0 0 16px ${domainColor}20`,
          }}>
            {messages.map((m, i) => (
              <div key={i} style={{ fontSize: 13, color: "#e2e8f0", lineHeight: 1.7, letterSpacing: 0.5 }}>
                {i === messages.length - 1 ? <TypewriterText text={m} speed={35} /> : m}
              </div>
            ))}
            {phase === "question" || phase === "result" ? (
              <div style={{ position: "relative", float: "right", marginTop: -4 }}>
                <span style={{ fontSize: 14, color: domainColor, animation: "blink 0.8s infinite" }}>▼</span>
              </div>
            ) : null}
          </div>

          {/* Question */}
          {(phase === "question" || phase === "result" || phase === "animating") && q && (
            <div style={{
              background: "rgba(6,14,30,0.8)",
              border: `1px solid ${domainColor}40`,
              borderRadius: 6,
              padding: "8px 14px",
              marginBottom: 6,
              fontSize: 12,
              color: "#b0bec5",
              lineHeight: 1.6,
              letterSpacing: 0.3,
            }}>
              <span style={{ color: domainColor, fontSize: 10, marginRight: 6 }}>【{q.domain}】</span>
              {q.question}
            </div>
          )}

          {/* Choices */}
          {(phase === "question" || phase === "result") && q && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 6 }}>
              {q.choices.map((c, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  disabled={answered}
                  style={{
                    background: choiceBg(i),
                    border: choiceBorder(i),
                    borderRadius: 4,
                    color: choiceColor(i),
                    fontFamily: "'DotGothic16', monospace",
                    fontSize: 11,
                    padding: "8px 10px",
                    cursor: answered ? "default" : "pointer",
                    textAlign: "left",
                    transition: "all 0.2s",
                    lineHeight: 1.4,
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 6,
                  }}
                  onMouseEnter={e => {
                    if (!answered) e.currentTarget.style.background = "linear-gradient(135deg, #1a3560, #2a5298)";
                  }}
                  onMouseLeave={e => {
                    if (!answered) e.currentTarget.style.background = "linear-gradient(135deg, #0d1f3c, #162440)";
                  }}
                >
                  <span style={{ color: answered && i === q.correct ? "#66bb6a" : "#4a90d9", flexShrink: 0 }}>
                    {answered ? (i === q.correct ? "✓" : i === selectedIdx ? "✗" : ["Ａ","Ｂ","Ｃ","Ｄ"][i]) : ["Ａ","Ｂ","Ｃ","Ｄ"][i]}
                  </span>
                  {c}
                </button>
              ))}
            </div>
          )}

          {/* Explanation */}
          {showExplanation && q && (
            <div style={{
              background: "linear-gradient(135deg, #0a1a0a, #0d200d)",
              border: "1px solid #2e5e2e",
              borderRadius: 6,
              padding: "8px 14px",
              marginBottom: 6,
              fontSize: 11,
              color: "#a5d6a7",
              lineHeight: 1.6,
              animation: "slideIn 0.3s ease",
            }}>
              <span style={{ color: "#66bb6a", marginRight: 6 }}>💡 かいせつ:</span>
              {q.explanation}
            </div>
          )}

          {/* Next button */}
          {phase === "result" && (
            <button
              onClick={handleNext}
              style={{
                width: "100%",
                background: `linear-gradient(135deg, #0d2040, #1a3a6a)`,
                border: `2px solid ${domainColor}`,
                borderRadius: 6,
                color: "#ffd700",
                fontFamily: "'DotGothic16', monospace",
                fontSize: 14,
                padding: "10px",
                cursor: "pointer",
                letterSpacing: 2,
                boxShadow: `0 0 12px ${domainColor}40`,
              }}
            >
              ▶ つぎのもんだいへ ({qIndex + 1}/{QUESTIONS.length})
            </button>
          )}

          {/* Animating placeholder */}
          {phase === "animating" && (
            <div style={{
              textAlign: "center", padding: 14,
              color: "#4a6fa5", fontSize: 12, letterSpacing: 3,
            }}>・・・</div>
          )}

          {/* Game Over */}
          {phase === "gameover" && (
            <div style={{
              background: "linear-gradient(135deg, #1a0505, #2d0a0a)",
              border: "2px solid #c62828",
              borderRadius: 8,
              padding: 20,
              textAlign: "center",
            }}>
              <div style={{ fontSize: 22, color: "#ef5350", letterSpacing: 4, marginBottom: 8 }}>GAME OVER</div>
              <div style={{ fontSize: 11, color: "#78909c", marginBottom: 4 }}>
                せいかい: {totalCorrect}もん / {qIndex + 1}もん
              </div>
              <div style={{ fontSize: 11, color: "#78909c", marginBottom: 14 }}>
                かくとくゴールド: {totalGold}G
              </div>
              <button onClick={handleRestart} style={{
                background: "linear-gradient(135deg, #4a0a0a, #7a1010)",
                border: "2px solid #c62828", borderRadius: 4,
                color: "#ffd700", fontFamily: "'DotGothic16', monospace",
                fontSize: 13, padding: "8px 24px", cursor: "pointer",
              }}>▶ もう一度</button>
            </div>
          )}

          {/* Clear */}
          {phase === "clear" && (
            <div style={{
              background: "linear-gradient(135deg, #051a05, #0a2d0a)",
              border: "2px solid #388e3c",
              borderRadius: 8,
              padding: 20,
              textAlign: "center",
            }}>
              <div style={{ fontSize: 20, color: "#ffd700", letterSpacing: 4, marginBottom: 8 }}>🏆 COMPLETE！</div>
              <div style={{ fontSize: 12, color: "#a5d6a7", marginBottom: 4 }}>
                せいかい: {totalCorrect}もん / {QUESTIONS.length}もん
              </div>
              <div style={{ fontSize: 11, color: "#ffe082", marginBottom: 4 }}>
                かくとくゴールド: {totalGold}G
              </div>
              <div style={{ fontSize: 11, color: "#90caf9", marginBottom: 14 }}>
                さいしゅうレベル: Lv.{playerLevel}
              </div>
              <button onClick={handleRestart} style={{
                background: "linear-gradient(135deg, #1b5e20, #2e7d32)",
                border: "2px solid #66bb6a", borderRadius: 4,
                color: "#ffd700", fontFamily: "'DotGothic16', monospace",
                fontSize: 13, padding: "8px 24px", cursor: "pointer",
              }}>▶ もう一度あそぶ</button>
            </div>
          )}

          {/* Domain progress dots */}
          <div style={{ display: "flex", justifyContent: "center", gap: 4, marginTop: 10, flexWrap: "wrap" }}>
            {QUESTIONS.map((quest, i) => (
              <div key={i} style={{
                width: 7, height: 7, borderRadius: "50%",
                background: i < qIndex ? DOMAIN_COLORS[quest.domain]
                  : i === qIndex ? "#ffd700"
                  : "#1a2a4a",
                border: "1px solid #2a4a7f",
                transition: "background 0.5s",
                title: quest.domain,
              }} />
            ))}
          </div>

          {/* Domain legend */}
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