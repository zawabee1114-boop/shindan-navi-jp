# 診断ナビ キャラクター画像生成プロンプト集（外注用）

診断ナビ（shindan-navi.jp）の全84体キャラクター画像生成プロンプトです。
Midjourney / Adobe Firefly / Google Imagen 等のテキストtoイメージAIにそのまま使用できます。

---

## 共通スタイル定義

### ブランドコンセプト
全84体は「同一ブランドのキャラクターコレクション」として統一感を持たせること。
個別の色・モチーフで差別化しながら、アートスタイルは全体で揃える。

### 共通スタイルプレフィックス（EN）
以下を全プロンプトの冒頭に付与すること:

```
Modern flat 2D mascot illustration, chibi deformed character (2-3 head ratio), 
clean uniform line art, friendly round shapes, soft flat color with subtle gradient, 
centered composition fitting in a circular icon frame, simple background with pastel 
solid color or light gradient plus small thematic decorations, expressive facial 
features, SNS-ready kawaii style, consistent with a unified character collection,
```

### 共通ネガティブプロンプト（EN）
以下を全プロンプトの末尾に `--no` または negative prompt として付与すること:

```
photorealistic, 3D render, dark themes, horror, occult, mystical supernatural symbols, 
astrology mysticism, fortune telling crystal ball, real brand logos, watermark, 
in-image text, uncanny valley expressions, scary face, gritty texture, complex 
background, cluttered composition
```

### 頭身・造形ルール
- 頭身: 2〜3頭身デフォルメ（全84体統一）
- 体型: 丸みを帯びた、フレンドリーな造形
- 表情: 豊かで読み取りやすい（笑顔・真剣・穏やか等を性格に合わせて選択）
- 構図: 円形アイコン内に収まるよう中央配置・余白あり

### カラートーン基準
- 彩度は中〜高め（くすみすぎない、暗すぎない）
- 背景は淡色（白寄り or 淡グラデーション）
- 各診断グループ内でカラー系統を統一

### 禁止事項（全84体共通・厳守）
- 占い・神秘主義・オカルト的な演出（星座も占い色NG・性格類型として擬人化のみ）
- 写実的・フォトリアルな表現
- 暗い・怖い・不気味な表情・雰囲気
- 実在ブランドのロゴ・シンボル
- 画像内テキスト・透かし
- YMYL的な医療・疾患を連想させる表現

---

## 診断グループ別カウント

| 診断 | 体数 |
|------|-----:|
| MBTI 16タイプ | 16 |
| Big5動物 16体 | 16 |
| 星座 12体 | 12 |
| 多重知能 8体 | 8 |
| 恋愛スタイル 6体 | 6 |
| 友達相性 6体 | 6 |
| DiSC 4体 | 4 |
| 完璧主義 4体 | 4 |
| 金銭感覚 4体 | 4 |
| 恋愛依存 4体 | 4 |
| 血液型 4体 | 4 |
| **合計** | **84** |

---

## 1. MBTI 16タイプ（NT合理主義者グループ）

テーマカラー系統: インディゴ・パープル系（#6c47ff）

---

### MBTI - INTJ 建築家（戦略家）

- 性格要約: 内向的直観×外向的思考。長期戦略を冷静に設計する孤高の完璧主義者。独立心が強く、論理と効率を最重視する。
- キャラ要件: モチーフ=望遠鏡・青写真・チェス駒/ポーン。表情=知的で静かな自信、クールな微笑み。ポーズ=腕を組む or 設計図を見ている。小物=望遠鏡・設計図・眼鏡。テーマカラー: インディゴ (#6c47ff) + ダークネイビー

- 画像生成プロンプト(EN):
```
Modern flat 2D mascot illustration, chibi deformed character (2-3 head ratio), clean uniform line art, friendly round shapes, soft flat color with subtle gradient, centered composition fitting in a circular icon frame, simple background with pastel solid color or light gradient plus small thematic decorations, expressive facial features, SNS-ready kawaii style, consistent with a unified character collection, INTJ architect strategist chibi mascot, arms crossed confident pose, holding blueprint scroll, telescope small prop, cool calm intelligent expression, deep indigo purple color scheme (#6c47ff), dark navy accent, small star constellation decorations on background, glasses optional
```

---

### MBTI - INTP 論理学者（思想家）

- 性格要約: 内向的思考×外向的直観。論理の整合性を徹底追求する探求者。アイデアを際限なく生み出し、正確さに強くこだわる。
- キャラ要件: モチーフ=顕微鏡・数式・電球。表情=思考中のぼんやり微笑み、目が輝いている。ポーズ=考え込む（顎に手）。小物=虫眼鏡・本・数式バブル。テーマカラー: パープル (#8b5cf6) + ライトブルー

- 画像生成プロンプト(EN):
```
Modern flat 2D mascot illustration, chibi deformed character (2-3 head ratio), clean uniform line art, friendly round shapes, soft flat color with subtle gradient, centered composition fitting in a circular icon frame, simple background with pastel solid color or light gradient plus small thematic decorations, expressive facial features, SNS-ready kawaii style, consistent with a unified character collection, INTP logician thinker chibi mascot, thinking pose hand on chin, magnifying glass prop, floating math formula bubbles, curious dreamy expression, purple violet color scheme (#8b5cf6), light blue accent, small lightbulb and book decorations on background
```

---

### MBTI - ENTJ 指揮官（統率者）

- 性格要約: 外向的思考×内向的直観。生まれながらのリーダー。組織と人材を効率的に動かし、高い目標に向けて突き進む。
- キャラ要件: モチーフ=旗・矢印・王冠。表情=力強い自信と熱意のある笑顔。ポーズ=前進・指差し・拳を握る。小物=旗・指揮棒・スター。テーマカラー: ディープパープル (#5b21b6) + ゴールド

- 画像生成プロンプト(EN):
```
Modern flat 2D mascot illustration, chibi deformed character (2-3 head ratio), clean uniform line art, friendly round shapes, soft flat color with subtle gradient, centered composition fitting in a circular icon frame, simple background with pastel solid color or light gradient plus small thematic decorations, expressive facial features, SNS-ready kawaii style, consistent with a unified character collection, ENTJ commander leader chibi mascot, confident pointing forward pose, holding flag prop, bold determined expression, deep purple (#5b21b6) and gold color scheme, small crown and direction arrow decorations on background
```

---

### MBTI - ENTP 討論者（発明家）

- 性格要約: 外向的直観×内向的思考。アイデアを次々と生み出す発明家。討論を楽しみ、通説への挑戦を好む革新者。
- キャラ要件: モチーフ=電球・矢印複数・歯車。表情=にやりとしたユーモラスな表情、目が生き生きしている。ポーズ=両手でアイデアを表現・ひらめきポーズ。小物=大きな電球・歯車。テーマカラー: バイオレット (#7c3aed) + イエロー

- 画像生成プロンプト(EN):
```
Modern flat 2D mascot illustration, chibi deformed character (2-3 head ratio), clean uniform line art, friendly round shapes, soft flat color with subtle gradient, centered composition fitting in a circular icon frame, simple background with pastel solid color or light gradient plus small thematic decorations, expressive facial features, SNS-ready kawaii style, consistent with a unified character collection, ENTP debater inventor chibi mascot, excited idea pose arms spread, large lightbulb prop, playful smirking expression, violet (#7c3aed) and yellow color scheme, small gear and multiple arrow decorations on background
```

---

## 2. MBTI 16タイプ（NF理想主義者グループ）

テーマカラー系統: ローズ・マゼンタ系（#e85d9b）

---

### MBTI - INFJ 提唱者（洞察者）

- 性格要約: 内向的直観×外向的感情。深い洞察と使命感を持つ稀有なタイプ。人類の成長を静かに信じ続ける内なる指導者。
- キャラ要件: モチーフ=月・本・蝶。表情=穏やかで深みのある微笑み、知的な眼差し。ポーズ=本を抱える・静かに佇む。小物=月・本・蝶。テーマカラー: ディープローズ (#9d174d) + パープル

- 画像生成プロンプト(EN):
```
Modern flat 2D mascot illustration, chibi deformed character (2-3 head ratio), clean uniform line art, friendly round shapes, soft flat color with subtle gradient, centered composition fitting in a circular icon frame, simple background with pastel solid color or light gradient plus small thematic decorations, expressive facial features, SNS-ready kawaii style, consistent with a unified character collection, INFJ advocate insight chibi mascot, gentle serene pose holding open book, butterfly prop, calm wise expression, deep rose (#9d174d) and soft purple color scheme, small moon and butterfly decorations on background
```

---

### MBTI - INFP 仲介者（詩人）

- 性格要約: 内向的感情×外向的直観。豊かな内面世界と強い価値観を持つ詩人。誠実さと人間の可能性を深く信じる理想主義者。
- キャラ要件: モチーフ=桜・ペン・星。表情=夢見るような優しい微笑み。ポーズ=花を持つ・空を見上げる。小物=桜の花・詩の巻物・流れ星。テーマカラー: ソフトローズ (#fb7185) + ラベンダー

- 画像生成プロンプト(EN):
```
Modern flat 2D mascot illustration, chibi deformed character (2-3 head ratio), clean uniform line art, friendly round shapes, soft flat color with subtle gradient, centered composition fitting in a circular icon frame, simple background with pastel solid color or light gradient plus small thematic decorations, expressive facial features, SNS-ready kawaii style, consistent with a unified character collection, INFP mediator poet chibi mascot, dreamy upward gazing pose, cherry blossom petals and scroll prop, soft idealistic expression, soft rose pink (#fb7185) and lavender color scheme, small star and petal decorations on background
```

---

### MBTI - ENFJ 主人公（教師）

- 性格要約: 外向的感情×内向的直観。人を鼓舞するカリスマ的リーダー。他者の成長に深い使命感を持ち、グループを調和させる天性の指導者。
- キャラ要件: モチーフ=星・手をつなぐシルエット・輝き。表情=明るく温かい笑顔、包容力のある目。ポーズ=手を広げて歓迎・前向き。小物=大きな星・ハート。テーマカラー: ホットピンク (#e85d9b) + ゴールド

- 画像生成プロンプト(EN):
```
Modern flat 2D mascot illustration, chibi deformed character (2-3 head ratio), clean uniform line art, friendly round shapes, soft flat color with subtle gradient, centered composition fitting in a circular icon frame, simple background with pastel solid color or light gradient plus small thematic decorations, expressive facial features, SNS-ready kawaii style, consistent with a unified character collection, ENFJ protagonist teacher chibi mascot, welcoming arms open pose, large star and heart props, warm charismatic smile, hot pink (#e85d9b) and gold color scheme, small sparkle and star decorations on background
```

---

### MBTI - ENFP 広報運動家（情熱家）

- 性格要Arab: 外向的直観×内向的感情。感染力のある熱意で周囲を鼓舞する情熱家。人の可能性を信じ、あらゆる場所に輝きを見出す。
- キャラ要件: モチーフ=花火・虹・吹き出し多数。表情=最高の笑顔・目をキラキラさせている。ポーズ=両手を上げる・ジャンプ。小物=花火・カラフルな吹き出し。テーマカラー: コーラルピンク (#f472b6) + マルチカラー

- 画像生成プロンプト(EN):
```
Modern flat 2D mascot illustration, chibi deformed character (2-3 head ratio), clean uniform line art, friendly round shapes, soft flat color with subtle gradient, centered composition fitting in a circular icon frame, simple background with pastel solid color or light gradient plus small thematic decorations, expressive facial features, SNS-ready kawaii style, consistent with a unified character collection, ENFP campaigner enthusiast chibi mascot, jumping excited pose with arms raised, firework and colorful speech bubble props, maximum happiness expression, coral pink (#f472b6) with multicolor accent scheme, small rainbow and confetti decorations on background
```

---

## 3. MBTI 16タイプ（SJ保護者グループ）

テーマカラー系統: スカイブルー系（#0ea5e9）

---

### MBTI - ISTJ 管理者（検査官）

- 性格要約: 内向的感覚×外向的思考。圧倒的な信頼性と責任感の守護者。伝統と確立した手順を守り、組織の基盤を支える。
- キャラ要件: モチーフ=神殿柱・チェックリスト・盾。表情=真剣で誠実な表情、落ち着いた目。ポーズ=背筋を伸ばした立ち姿・チェックリストを持つ。小物=盾・クリップボード。テーマカラー: ネイビー (#1e40af) + グレー

- 画像生成プロンプト(EN):
```
Modern flat 2D mascot illustration, chibi deformed character (2-3 head ratio), clean uniform line art, friendly round shapes, soft flat color with subtle gradient, centered composition fitting in a circular icon frame, simple background with pastel solid color or light gradient plus small thematic decorations, expressive facial features, SNS-ready kawaii style, consistent with a unified character collection, ISTJ logistician inspector chibi mascot, upright responsible standing pose, clipboard checklist and shield props, serious dependable expression, navy blue (#1e40af) and gray color scheme, small checkmark and pillar decorations on background
```

---

### MBTI - ISFJ 擁護者（保護者）

- 性格要約: 内向的感覚×外向的感情。思いやりと献身性が高い縁の下の力持ち。大切な人を静かに支え、温かみと実用性を兼ね備える。
- キャラ要件: モチーフ=緑の葉・盾・ハート。表情=温かく優しい微笑み、安心させる目。ポーズ=両手を胸に・包み込む。小物=葉・小さなハート。テーマカラー: ソフトブルー (#38bdf8) + ミントグリーン

- 画像生成プロンプト(EN):
```
Modern flat 2D mascot illustration, chibi deformed character (2-3 head ratio), clean uniform line art, friendly round shapes, soft flat color with subtle gradient, centered composition fitting in a circular icon frame, simple background with pastel solid color or light gradient plus small thematic decorations, expressive facial features, SNS-ready kawaii style, consistent with a unified character collection, ISFJ defender protector chibi mascot, gentle hands on chest nurturing pose, leaf and small heart props, warm caring smile, soft sky blue (#38bdf8) and mint green color scheme, small clover and heart decorations on background
```

---

### MBTI - ESTJ 幹部（監督者）

- 性格要約: 外向的思考×内向的感覚。組織の秩序と効率を維持するリーダー。明確なルールと責任感で組織を運営する。
- キャラ要件: モチーフ=建設クレーン・組織図・トロフィー。表情=自信に満ちた真剣な表情。ポーズ=指揮を執る・手を前に出す。小物=組織図ボード・トロフィー。テーマカラー: スカイブルー (#0ea5e9) + シルバー

- 画像生成プロンプト(EN):
```
Modern flat 2D mascot illustration, chibi deformed character (2-3 head ratio), clean uniform line art, friendly round shapes, soft flat color with subtle gradient, centered composition fitting in a circular icon frame, simple background with pastel solid color or light gradient plus small thematic decorations, expressive facial features, SNS-ready kawaii style, consistent with a unified character collection, ESTJ executive supervisor chibi mascot, authoritative directing pose hand forward, org chart board and trophy props, confident competent expression, sky blue (#0ea5e9) and silver color scheme, small building and chart decorations on background
```

---

### MBTI - ESFJ 領事（世話焼き）

- 性格要約: 外向的感情×内向的感覚。コミュニティの調和を守る社交的な世話焼き。他者への気配りと温かいサポートが自然に出る。
- キャラ要件: モチーフ=握手・花束・テーブル。表情=明るく温かい歓迎の笑顔。ポーズ=両手を広げる・何かを差し出す。小物=花束・お茶。テーマカラー: ライトブルー (#7dd3fc) + ピンク

- 画像生成プロンプト(EN):
```
Modern flat 2D mascot illustration, chibi deformed character (2-3 head ratio), clean uniform line art, friendly round shapes, soft flat color with subtle gradient, centered composition fitting in a circular icon frame, simple background with pastel solid color or light gradient plus small thematic decorations, expressive facial features, SNS-ready kawaii style, consistent with a unified character collection, ESFJ consul caregiver chibi mascot, welcoming arms spread offering pose, bouquet of flowers and teacup props, warm hospitable smile, light blue (#7dd3fc) and soft pink color scheme, small flower and handshake decorations on background
```

---

## 4. MBTI 16タイプ（SP職人グループ）

テーマカラー系統: アンバー・オレンジ系（#f59e0b）

---

### MBTI - ISTP 巨匠（職人）

- 性格要約: 内向的思考×外向的感覚。システムの仕組みを直観的に理解する技術者。実践的な問題解決と危機対応に際立つ冷静さ。
- キャラ要件: モチーフ=レンチ・歯車・工具箱。表情=クールで集中した表情、鋭い目。ポーズ=工具を持つ・修理している。小物=レンチ・歯車・工具箱。テーマカラー: ダークオレンジ (#b45309) + グレー

- 画像生成プロンプト(EN):
```
Modern flat 2D mascot illustration, chibi deformed character (2-3 head ratio), clean uniform line art, friendly round shapes, soft flat color with subtle gradient, centered composition fitting in a circular icon frame, simple background with pastel solid color or light gradient plus small thematic decorations, expressive facial features, SNS-ready kawaii style, consistent with a unified character collection, ISTP virtuoso craftsman chibi mascot, focused working pose holding wrench, gear and toolbox props, cool concentrated expression, dark amber (#b45309) and gray color scheme, small wrench and gear decorations on background
```

---

### MBTI - ISFP 冒険家（芸術家）

- 性格要約: 内向的感情×外向的感覚。美と調和への繊細な感受性を持つ芸術家。現在の瞬間を大切にし、行動で温かい愛情を示す。
- キャラ要件: モチーフ=パレット・花・羽。表情=穏やかで感受性豊かな表情、柔らかい目。ポーズ=絵を描く・花を愛でる。小物=絵具パレット・花。テーマカラー: アンバー (#f59e0b) + ローズ

- 画像生成プロンプト(EN):
```
Modern flat 2D mascot illustration, chibi deformed character (2-3 head ratio), clean uniform line art, friendly round shapes, soft flat color with subtle gradient, centered composition fitting in a circular icon frame, simple background with pastel solid color or light gradient plus small thematic decorations, expressive facial features, SNS-ready kawaii style, consistent with a unified character collection, ISFP adventurer artist chibi mascot, gentle painting or flower gazing pose, color palette and feather props, soft sensitive expression, amber (#f59e0b) and rose color scheme, small flower petal and paintbrush decorations on background
```

---

### MBTI - ESTP 起業家（行動者）

- 性格要約: 外向的感覚×内向的思考。現在の状況を瞬時に読み取り即座に行動するエネルギッシュなリスクテイカー。説得力と機敏さが際立つ。
- キャラ要件: モチーフ=ロケット・炎・ダッシュ跡。表情=挑戦的で活気のある笑顔、燃える目。ポーズ=ダッシュ・飛び出す。小物=ロケット・稲妻。テーマカラー: オレンジ (#ea580c) + レッド

- 画像生成プロンプト(EN):
```
Modern flat 2D mascot illustration, chibi deformed character (2-3 head ratio), clean uniform line art, friendly round shapes, soft flat color with subtle gradient, centered composition fitting in a circular icon frame, simple background with pastel solid color or light gradient plus small thematic decorations, expressive facial features, SNS-ready kawaii style, consistent with a unified character collection, ESTP entrepreneur action taker chibi mascot, dynamic dashing forward pose, rocket and lightning bolt props, bold energetic grin, orange (#ea580c) and red color scheme, small flame and speed line decorations on background
```

---

### MBTI - ESFP エンターテイナー（パフォーマー）

- 性格要約: 外向的感覚×内向的感情。現在の瞬間を全力で楽しみ周囲も楽しませる天性のパフォーマー。社交的で温かく、どんな集まりも明るくする。
- キャラ要件: モチーフ=舞台・マイク・スポットライト。表情=満面の笑み・目が輝いている。ポーズ=舞台ポーズ・マイクを持つ。小物=マイク・紙吹雪・音符。テーマカラー: ゴールデンイエロー (#fbbf24) + ピンク

- 画像生成プロンプト(EN):
```
Modern flat 2D mascot illustration, chibi deformed character (2-3 head ratio), clean uniform line art, friendly round shapes, soft flat color with subtle gradient, centered composition fitting in a circular icon frame, simple background with pastel solid color or light gradient plus small thematic decorations, expressive facial features, SNS-ready kawaii style, consistent with a unified character collection, ESFP entertainer performer chibi mascot, spotlight stage pose holding microphone, confetti and music note props, biggest brightest smile, golden yellow (#fbbf24) and pink color scheme, small star and sparkle decorations on background
```

---

## 5. Big5動物 16体

テーマカラー: 各動物に設定されたカラー（types.tsのcolor値を使用）

---

### Big5動物 - ライオン王（o-high_c-high_e-high_a-high）

- 性格要約: 行動力・計画力・社交的・思いやり。仲間を引っ張る頼れるリーダー。開放性・誠実性・外向性・協調性すべてが高い。
- キャラ要件: モチーフ=王冠・ライオン擬人化・仲間のシルエット。表情=頼もしい笑顔・温かみのある目。ポーズ=胸を張って立つ・手を差し伸べる。テーマカラー: アンバー (#f59e0b) + ゴールド

- 画像生成プロンプト(EN):
```
Modern flat 2D mascot illustration, chibi deformed character (2-3 head ratio), clean uniform line art, friendly round shapes, soft flat color with subtle gradient, centered composition fitting in a circular icon frame, simple background with pastel solid color or light gradient plus small thematic decorations, expressive facial features, SNS-ready kawaii style, consistent with a unified character collection, lion king chibi mascot character, majestic proud standing pose, small golden crown prop, warm reliable leader smile, amber gold (#f59e0b) color scheme, soft golden mane details, small star and paw print decorations on background
```

---

### Big5動物 - ハヤブサ（o-high_c-high_e-high_a-low）

- 性格要約: 目標達成・決断力・行動力・独立心。目標に向かって突き進む鋭い先駆者。
- キャラ要件: モチーフ=翼・矢・ターゲット。表情=鋭くも爽やかな眼差し、決意の表情。ポーズ=飛行姿勢・前傾。テーマカラー: インディゴ (#6366f1) + ブルー

- 画像生成プロンプト(EN):
```
Modern flat 2D mascot illustration, chibi deformed character (2-3 head ratio), clean uniform line art, friendly round shapes, soft flat color with subtle gradient, centered composition fitting in a circular icon frame, simple background with pastel solid color or light gradient plus small thematic decorations, expressive facial features, SNS-ready kawaii style, consistent with a unified character collection, falcon pioneer chibi mascot character, forward-leaning flight pose with spread wings, arrow and target props, sharp decisive expression, indigo blue (#6366f1) color scheme, feather detail accents, small wing and arrow decorations on background
```

---

### Big5動物 - フクロウ博士（o-high_c-high_e-low_a-high）

- 性格要約: 知性・計画力・思いやり・洞察力。深く考え、静かに人を支える知者。
- キャラ要件: モチーフ=本・眼鏡・フクロウ擬人化。表情=穏やかな知性的な微笑み。ポーズ=本を読む・指を立てて説明。テーマカラー: パープル (#7c5cff) + ラベンダー

- 画像生成プロンプト(EN):
```
Modern flat 2D mascot illustration, chibi deformed character (2-3 head ratio), clean uniform line art, friendly round shapes, soft flat color with subtle gradient, centered composition fitting in a circular icon frame, simple background with pastel solid color or light gradient plus small thematic decorations, expressive facial features, SNS-ready kawaii style, consistent with a unified character collection, owl professor scholar chibi mascot character, reading or explaining pose with finger up, open book and round glasses props, gentle wise smile, purple (#7c5cff) and lavender color scheme, small star and feather decorations on background
```

---

### Big5動物 - タコ博士（o-high_c-high_e-low_a-low）

- 性格要約: 分析力・計画力・独創性・集中力。緻密な戦略で問題を解き明かす孤高の研究者。
- キャラ要件: モチーフ=タコ擬人化・試験管・データグラフ。表情=真剣な集中顔、知的な目。ポーズ=複数の腕で作業している（デフォルメ）。テーマカラー: バイオレット (#8b5cf6) + アクア

- 画像生成プロンプト(EN):
```
Modern flat 2D mascot illustration, chibi deformed character (2-3 head ratio), clean uniform line art, friendly round shapes, soft flat color with subtle gradient, centered composition fitting in a circular icon frame, simple background with pastel solid color or light gradient plus small thematic decorations, expressive facial features, SNS-ready kawaii style, consistent with a unified character collection, octopus scientist researcher chibi mascot character, multitasking pose with multiple arms working, test tube and data chart props, focused analytical expression, violet (#8b5cf6) and aqua color scheme, small bubble and molecule decorations on background
```

---

### Big5動物 - イルカ（o-high_c-low_e-high_a-high）

- 性格要約: 社交的・共感力・自由・好奇心。遊び心と優しさで場を明るくする自由な社交家。
- キャラ要件: モチーフ=波・イルカ擬人化・笑顔の泡。表情=最高の笑顔・エネルギッシュ。ポーズ=ジャンプ・跳びはねる。テーマカラー: スカイブルー (#0ea5e9) + アクア

- 画像生成プロンプト(EN):
```
Modern flat 2D mascot illustration, chibi deformed character (2-3 head ratio), clean uniform line art, friendly round shapes, soft flat color with subtle gradient, centered composition fitting in a circular icon frame, simple background with pastel solid color or light gradient plus small thematic decorations, expressive facial features, SNS-ready kawaii style, consistent with a unified character collection, dolphin social playful chibi mascot character, jumping leaping pose, wave and bubble props, biggest joyful smile, sky blue (#0ea5e9) and aqua color scheme, small wave and splash decorations on background
```

---

### Big5動物 - キツネ（o-high_c-low_e-high_a-low）

- 性格要約: 創造力・行動力・独創性・自由。ユニークな発想で場を席巻する自由な挑戦者。
- キャラ要件: モチーフ=炎・電球・キツネ擬人化。表情=賢そうなにやり笑い・いたずら心。ポーズ=ひらめきポーズ・跳びはねる。テーマカラー: オレンジ (#f97316) + レッド

- 画像生成プロンプト(EN):
```
Modern flat 2D mascot illustration, chibi deformed character (2-3 head ratio), clean uniform line art, friendly round shapes, soft flat color with subtle gradient, centered composition fitting in a circular icon frame, simple background with pastel solid color or light gradient plus small thematic decorations, expressive facial features, SNS-ready kawaii style, consistent with a unified character collection, fox creative challenger chibi mascot character, mischievous idea pose, lightbulb and flame props, clever smirking expression, orange (#f97316) and red color scheme, fluffy fox tail detail, small star and zigzag decorations on background
```

---

### Big5動物 - ネコ（o-high_c-low_e-low_a-high）

- 性格要約: 独創性・共感力・自由・癒し。自分のペースで、大切な人を静かに支える。
- キャラ要件: モチーフ=ネコ擬人化・月・クッション。表情=穏やかな癒し系の笑顔。ポーズ=まったり座る・ゆったり。テーマカラー: ピンク (#ec4899) + ラベンダー

- 画像生成プロンプト(EN):
```
Modern flat 2D mascot illustration, chibi deformed character (2-3 head ratio), clean uniform line art, friendly round shapes, soft flat color with subtle gradient, centered composition fitting in a circular icon frame, simple background with pastel solid color or light gradient plus small thematic decorations, expressive facial features, SNS-ready kawaii style, consistent with a unified character collection, cat relaxed creative chibi mascot character, cozy sitting pose, soft cushion and crescent moon props, gentle healing smile, pink (#ec4899) and lavender color scheme, cat ear and paw detail, small star and moon decorations on background
```

---

### Big5動物 - トラ（o-high_c-low_e-low_a-low）

- 性格要約: 独創性・個性・自由・直感。独自の世界観を持つ孤独な芸術家。
- キャラ要件: モチーフ=トラ擬人化・アート・炎。表情=クールで個性的・独特の眼差し。ポーズ=一人でアートに集中・ポーズ。テーマカラー: アンバー (#f59e0b) + ブラック

- 画像生成プロンプト(EN):
```
Modern flat 2D mascot illustration, chibi deformed character (2-3 head ratio), clean uniform line art, friendly round shapes, soft flat color with subtle gradient, centered composition fitting in a circular icon frame, simple background with pastel solid color or light gradient plus small thematic decorations, expressive facial features, SNS-ready kawaii style, consistent with a unified character collection, tiger lone artist chibi mascot character, independent artistic solo pose, canvas and paintbrush props, cool unique artistic expression, amber (#f59e0b) and black stripe color scheme, tiger stripe pattern detail, small flame and art palette decorations on background
```

---

### Big5動物 - イヌ（o-low_c-high_e-high_a-high）

- 性格要約: 誠実さ・協調性・責任感・社交的。誰にでも誠実、チームの要となる頼れる存在。
- キャラ要件: モチーフ=イヌ擬人化・ハート・仲間。表情=純粋で誠実な笑顔、信頼感のある目。ポーズ=元気に立つ・手を振る。テーマカラー: グリーン (#10b981) + ウォームイエロー

- 画像生成プロンプト(EN):
```
Modern flat 2D mascot illustration, chibi deformed character (2-3 head ratio), clean uniform line art, friendly round shapes, soft flat color with subtle gradient, centered composition fitting in a circular icon frame, simple background with pastel solid color or light gradient plus small thematic decorations, expressive facial features, SNS-ready kawaii style, consistent with a unified character collection, dog loyal team player chibi mascot character, enthusiastic waving pose, heart and friendship badge props, sincere trustworthy smile, green (#10b981) and warm yellow color scheme, floppy ear detail, small heart and paw print decorations on background
```

---

### Big5動物 - オオカミ（o-low_c-high_e-high_a-low）

- 性格要約: 決断力・計画力・行動力・自立心。群れを率いる強さと規律のリーダー。
- キャラ要件: モチーフ=オオカミ擬人化・旗・月。表情=力強い決意の表情、鋭い目。ポーズ=先頭に立つ・旗を掲げる。テーマカラー: スレートグレー (#64748b) + ブルー

- 画像生成プロンプト(EN):
```
Modern flat 2D mascot illustration, chibi deformed character (2-3 head ratio), clean uniform line art, friendly round shapes, soft flat color with subtle gradient, centered composition fitting in a circular icon frame, simple background with pastel solid color or light gradient plus small thematic decorations, expressive facial features, SNS-ready kawaii style, consistent with a unified character collection, wolf pack leader chibi mascot character, commanding forward pose with flag, crescent moon accent prop, determined strong expression, slate gray (#64748b) and blue color scheme, sharp wolf ear and tail detail, small moon and footprint decorations on background
```

---

### Big5動物 - ビーバー（o-low_c-high_e-low_a-high）

- 性格要約: 堅実さ・計画力・思いやり・忍耐力。コツコツ積み上げ、みんなの土台を作る名職人。
- キャラ要件: モチーフ=ビーバー擬人化・木材・ダム。表情=真剣で穏やかな職人の顔。ポーズ=工作中・物を作る。テーマカラー: ブラウン (#a16207) + ウォームイエロー

- 画像生成プロンプト(EN):
```
Modern flat 2D mascot illustration, chibi deformed character (2-3 head ratio), clean uniform line art, friendly round shapes, soft flat color with subtle gradient, centered composition fitting in a circular icon frame, simple background with pastel solid color or light gradient plus small thematic decorations, expressive facial features, SNS-ready kawaii style, consistent with a unified character collection, beaver craftsman builder chibi mascot character, diligent building working pose, wooden log and hammer props, steadfast reliable expression, brown (#a16207) and warm yellow color scheme, flat tail and buck teeth detail, small wood chip and leaf decorations on background
```

---

### Big5動物 - ワシ（o-low_c-high_e-low_a-low）

- 性格要約: 完璧主義・集中力・自立心・精度。高い目標を静かに追い続ける孤高の完璧主義者。
- キャラ要件: モチーフ=鷲擬人化・高い山頂・スコープ。表情=鋭く集中した遠くを見つめる目。ポーズ=高所から見下ろす・翼を広げる。テーマカラー: ダークグレー (#475569) + ホワイト

- 画像生成プロンプト(EN):
```
Modern flat 2D mascot illustration, chibi deformed character (2-3 head ratio), clean uniform line art, friendly round shapes, soft flat color with subtle gradient, centered composition fitting in a circular icon frame, simple background with pastel solid color or light gradient plus small thematic decorations, expressive facial features, SNS-ready kawaii style, consistent with a unified character collection, eagle perfectionist soaring chibi mascot character, majestic wings spread or perched high pose, mountain peak and scope props, sharp focused distant gaze, dark gray (#475569) and white color scheme, feather detail accents, small mountain and wind line decorations on background
```

---

### Big5動物 - パンダ（o-low_c-low_e-high_a-high）

- 性格要約: 社交的・癒し・共感力・明るさ。みんなに愛される場の雰囲気メーカー。
- キャラ要件: モチーフ=パンダ擬人化・竹・ハート。表情=丸くて可愛い最高の笑顔。ポーズ=ふわっと抱きしめる・両手を広げる。テーマカラー: グリーン (#7ec79b) + ホワイト

- 画像生成プロンプト(EN):
```
Modern flat 2D mascot illustration, chibi deformed character (2-3 head ratio), clean uniform line art, friendly round shapes, soft flat color with subtle gradient, centered composition fitting in a circular icon frame, simple background with pastel solid color or light gradient plus small thematic decorations, expressive facial features, SNS-ready kawaii style, consistent with a unified character collection, panda mood maker lovable chibi mascot character, fluffy welcoming hug pose, bamboo and heart props, roundest most adorable smile, green (#7ec79b) and white with black patch color scheme, panda ear and eye patch detail, small bamboo leaf and heart decorations on background
```

---

### Big5動物 - チーター（o-low_c-low_e-high_a-low）

- 性格要約: 瞬発力・行動力・自由・決断力。直感と勢いで道を切り開く行動派のスプリンター。
- キャラ要件: モチーフ=チーター擬人化・稲妻・ダッシュ線。表情=爽やかで俊敏な笑顔、速さを感じる。ポーズ=全力ダッシュ・スタートダッシュ。テーマカラー: アンバー (#d97706) + イエロー

- 画像生成プロンプト(EN):
```
Modern flat 2D mascot illustration, chibi deformed character (2-3 head ratio), clean uniform line art, friendly round shapes, soft flat color with subtle gradient, centered composition fitting in a circular icon frame, simple background with pastel solid color or light gradient plus small thematic decorations, expressive facial features, SNS-ready kawaii style, consistent with a unified character collection, cheetah speed sprinter chibi mascot character, full speed running dash pose, lightning bolt and speed line props, energetic dashing smile, amber (#d97706) and yellow with black spot color scheme, spotted pattern detail, small lightning and wind decorations on background
```

---

### Big5動物 - ウサギ（o-low_c-low_e-low_a-high）

- 性格要約: 温かさ・共感力・穏やかさ・思いやり。穏やかで優しい、そっと寄り添う守り手。
- キャラ要件: モチーフ=ウサギ擬人化・花・毛布。表情=優しく穏やかな癒し系の微笑み。ポーズ=寄り添う・柔らかいポーズ。テーマカラー: ピンク (#f472b6) + ラベンダー

- 画像生成プロンプト(EN):
```
Modern flat 2D mascot illustration, chibi deformed character (2-3 head ratio), clean uniform line art, friendly round shapes, soft flat color with subtle gradient, centered composition fitting in a circular icon frame, simple background with pastel solid color or light gradient plus small thematic decorations, expressive facial features, SNS-ready kawaii style, consistent with a unified character collection, rabbit gentle caretaker chibi mascot character, soft snuggling cozy pose, small flower and blanket props, warmest gentlest smile, pink (#f472b6) and lavender color scheme, long floppy ear detail, small flower and soft cloud decorations on background
```

---

### Big5動物 - ハリネズミ（o-low_c-low_e-low_a-low）

- 性格要約: 個性・自立心・マイペース・内省。自分だけの世界をもつ、静かな一匹狼。
- キャラ要件: モチーフ=ハリネズミ擬人化・本・月。表情=独特の静かな微笑み、深い目。ポーズ=一人で本を読む・丸まっている。テーマカラー: バイオレット (#a78bfa) + グレー

- 画像生成プロンプト(EN):
```
Modern flat 2D mascot illustration, chibi deformed character (2-3 head ratio), clean uniform line art, friendly round shapes, soft flat color with subtle gradient, centered composition fitting in a circular icon frame, simple background with pastel solid color or light gradient plus small thematic decorations, expressive facial features, SNS-ready kawaii style, consistent with a unified character collection, hedgehog lone wolf introvert chibi mascot character, cozy solo reading pose, small book and moon props, quiet unique independent expression, violet (#a78bfa) and gray color scheme, spiky back detail, small star and moon decorations on background
```

---

## 6. 星座 12体（性格類型として擬人化・占い色NG）

テーマカラー: 各星座のエレメントカラー系統を使用
- 火のエレメント（牡羊・獅子・射手）: オレンジ〜レッド系
- 地のエレメント（牡牛・乙女・山羊）: グリーン〜ブラウン系
- 風のエレメント（双子・天秤・水瓶）: ブルー〜シアン系
- 水のエレメント（蟹・蠍・魚）: インディゴ〜ティール系

注意: 占い・運勢・神秘主義的演出は一切禁止。性格傾向キャラクターとして擬人化のみ。

---

### 星座 - 牡羊座 Aries（3/21-4/19）

- 性格要約: 新しいことへの挑戦を好む先駆者。高い行動力・率直さ・リーダーシップ・競争心。
- キャラ要件: モチーフ=炎・矢・シールド（牡羊の角をデフォルメしたヘアバンド程度）。表情=エネルギッシュで自信に満ちた笑顔。ポーズ=前に飛び出す・先頭を走る。テーマカラー: ファイアレッド (#ef4444) + オレンジ

- 画像生成プロンプト(EN):
```
Modern flat 2D mascot illustration, chibi deformed character (2-3 head ratio), clean uniform line art, friendly round shapes, soft flat color with subtle gradient, centered composition fitting in a circular icon frame, simple background with pastel solid color or light gradient plus small thematic decorations, expressive facial features, SNS-ready kawaii style, consistent with a unified character collection, Aries personality type pioneer chibi mascot character (NOT fortune telling, personality classification only), bold dashing forward pose, small flame and arrow props, energetic confident grin, fire red (#ef4444) and orange color scheme, cute small ram horn hair accessory detail, small flame and spark decorations on background
```

---

### 星座 - 牡牛座 Taurus（4/20-5/20）

- 性格要約: 粘り強い持続力と忍耐力を持つ安定志向。誠実さ・美的センス・信頼性が際立つ。
- キャラ要件: モチーフ=花・大地・宝石。表情=穏やかで温かい笑顔、安心感のある目。ポーズ=ゆったり座る・花を持つ。テーマカラー: ダークグリーン (#16a34a) + ゴールド

- 画像生成プロンプト(EN):
```
Modern flat 2D mascot illustration, chibi deformed character (2-3 head ratio), clean uniform line art, friendly round shapes, soft flat color with subtle gradient, centered composition fitting in a circular icon frame, simple background with pastel solid color or light gradient plus small thematic decorations, expressive facial features, SNS-ready kawaii style, consistent with a unified character collection, Taurus personality type steadfast chibi mascot character (personality classification only), relaxed sitting pose, flower and gem props, calm warm trustworthy smile, dark green (#16a34a) and gold color scheme, small flower crown hair detail, small leaf and gemstone decorations on background
```

---

### 星座 - 双子座 Gemini（5/21-6/21）

- 性格要約: 知的好奇心とコミュニケーション力の象徴。柔軟な適応力・多面的な思考・社交性。
- キャラ要件: モチーフ=本2冊・吹き出し2つ・蝶。表情=知的でにこやかな表情・話しかけている。ポーズ=両手で話す・ジェスチャー豊か。テーマカラー: スカイブルー (#38bdf8) + イエロー

- 画像生成プロンプト(EN):
```
Modern flat 2D mascot illustration, chibi deformed character (2-3 head ratio), clean uniform line art, friendly round shapes, soft flat color with subtle gradient, centered composition fitting in a circular icon frame, simple background with pastel solid color or light gradient plus small thematic decorations, expressive facial features, SNS-ready kawaii style, consistent with a unified character collection, Gemini personality type communicator chibi mascot character (personality classification only), animated talking gesturing pose, two speech bubbles and book props, lively curious smile, sky blue (#38bdf8) and yellow color scheme, butterfly accent detail, small dual book and wind decorations on background
```

---

### 星座 - 蟹座 Cancer（6/22-7/22）

- 性格要約: 深い共感力と家族への愛情を持つ感情の守護者。直観力・献身性・思いやり。
- キャラ要件: モチーフ=殻・月・ハート。表情=温かく包み込む優しい笑顔。ポーズ=抱きしめる・守る姿勢。テーマカラー: ティールブルー (#0d9488) + シルバー

- 画像生成プロンプト(EN):
```
Modern flat 2D mascot illustration, chibi deformed character (2-3 head ratio), clean uniform line art, friendly round shapes, soft flat color with subtle gradient, centered composition fitting in a circular icon frame, simple background with pastel solid color or light gradient plus small thematic decorations, expressive facial features, SNS-ready kawaii style, consistent with a unified character collection, Cancer personality type guardian empathy chibi mascot character (personality classification only), protective embracing pose, crescent moon and heart props, warm nurturing smile, teal blue (#0d9488) and silver color scheme, shell motif hair accessory detail, small moon and wave decorations on background
```

---

### 星座 - 獅子座 Leo（7/23-8/22）

- 性格要約: 存在感と創造性の象徴。情熱的なリーダーシップ・自己表現・寛大さ・誠実さ。
- キャラ要件: モチーフ=王冠・スポットライト・たてがみデフォルメ。表情=輝くような自信の笑顔。ポーズ=舞台中央・腕を広げる。テーマカラー: ゴールド (#eab308) + オレンジ

- 画像生成プロンプト(EN):
```
Modern flat 2D mascot illustration, chibi deformed character (2-3 head ratio), clean uniform line art, friendly round shapes, soft flat color with subtle gradient, centered composition fitting in a circular icon frame, simple background with pastel solid color or light gradient plus small thematic decorations, expressive facial features, SNS-ready kawaii style, consistent with a unified character collection, Leo personality type charisma leader chibi mascot character (personality classification only), center stage arms spread pose, small crown and spotlight props, radiant confident grin, gold (#eab308) and orange color scheme, fluffy mane hair detail, small sun and star decorations on background
```

---

### 星座 - 乙女座 Virgo（8/23-9/22）

- 性格要約: 分析力と実務能力の象徴。細部への注意力・几帳面さ・サポート精神・謙虚さ。
- キャラ要件: モチーフ=麦・虫眼鏡・チェックリスト。表情=真剣で丁寧な表情、細かいところに気づく目。ポーズ=チェックする・整理する。テーマカラー: ライトグリーン (#84cc16) + ベージュ

- 画像生成プロンプト(EN):
```
Modern flat 2D mascot illustration, chibi deformed character (2-3 head ratio), clean uniform line art, friendly round shapes, soft flat color with subtle gradient, centered composition fitting in a circular icon frame, simple background with pastel solid color or light gradient plus small thematic decorations, expressive facial features, SNS-ready kawaii style, consistent with a unified character collection, Virgo personality type analyst detail-oriented chibi mascot character (personality classification only), careful checking organizing pose, magnifying glass and checklist props, precise attentive expression, light green (#84cc16) and beige color scheme, small wheat grain hair detail, small leaf and checkmark decorations on background
```

---

### 星座 - 天秤座 Libra（9/23-10/23）

- 性格要約: 調和・公正・美の象徴。バランス感覚・美的センス・社交性・冷静な議論能力。
- キャラ要件: モチーフ=天秤・花・羽。表情=優雅でバランスの取れた笑顔。ポーズ=バランスを取る・両腕を水平に。テーマカラー: ローズゴールド (#f0abfc) + ソフトブルー

- 画像生成プロンプト(EN):
```
Modern flat 2D mascot illustration, chibi deformed character (2-3 head ratio), clean uniform line art, friendly round shapes, soft flat color with subtle gradient, centered composition fitting in a circular icon frame, simple background with pastel solid color or light gradient plus small thematic decorations, expressive facial features, SNS-ready kawaii style, consistent with a unified character collection, Libra personality type harmony balance chibi mascot character (personality classification only), graceful balancing arms horizontal pose, scale balance and flower props, elegant fair smile, rose gold (#f0abfc) and soft blue color scheme, small bow or feather hair detail, small scale and petal decorations on background
```

---

### 星座 - 蠍座 Scorpio（10/24-11/22）

- 性格要約: 深さ・変革・洞察力の象徴。鋭い観察眼・深い感情・強い意志・深い忠誠心。
- キャラ要件: モチーフ=水晶（クリア）・炎・深海カラー。表情=鋭く深みのある眼差し・静かな強さ。ポーズ=静かに佇む・腕を組む。テーマカラー: ディープティール (#134e4a) + クリムゾン

- 画像生成プロンプト(EN):
```
Modern flat 2D mascot illustration, chibi deformed character (2-3 head ratio), clean uniform line art, friendly round shapes, soft flat color with subtle gradient, centered composition fitting in a circular icon frame, simple background with pastel solid color or light gradient plus small thematic decorations, expressive facial features, SNS-ready kawaii style, consistent with a unified character collection, Scorpio personality type insight depth chibi mascot character (personality classification only), quiet composed arms crossed pose, clear crystal and flame props (no occult symbolism), deep perceptive expression, deep teal (#134e4a) and crimson color scheme, simple water drop hair detail, small wave and depth line decorations on background
```

---

### 星座 - 射手座 Sagittarius（11/23-12/21）

- 性格要約: 自由・冒険・哲学の象徴。楽観的な広い視野・冒険心・率直さ・挑戦精神。
- キャラ要件: モチーフ=矢・地球儀・地図。表情=明るく前向きな笑顔、冒険への期待。ポーズ=矢を射る・旅の荷物・走る。テーマカラー: バーガンディ (#7c2d12) + ゴールデンイエロー

- 画像生成プロンプト(EN):
```
Modern flat 2D mascot illustration, chibi deformed character (2-3 head ratio), clean uniform line art, friendly round shapes, soft flat color with subtle gradient, centered composition fitting in a circular icon frame, simple background with pastel solid color or light gradient plus small thematic decorations, expressive facial features, SNS-ready kawaii style, consistent with a unified character collection, Sagittarius personality type adventurer explorer chibi mascot character (personality classification only), bow shooting or exploring dynamic pose, arrow and world map props, optimistic adventurous grin, burgundy (#7c2d12) and golden yellow color scheme, small arrow quiver hair detail, small compass and map decorations on background
```

---

### 星座 - 山羊座 Capricorn（12/22-1/19）

- 性格要約: 野心・自律・責任感の象徴。高い自律心・戦略的思考・忍耐力・信頼性。
- キャラ要件: モチーフ=山・トロフィー・時計。表情=真剣で自律的な表情・目標を見つめる。ポーズ=山頂を目指す・着実な歩み。テーマカラー: ダークグリーン (#052e16) + アイスブルー

- 画像生成プロンプト(EN):
```
Modern flat 2D mascot illustration, chibi deformed character (2-3 head ratio), clean uniform line art, friendly round shapes, soft flat color with subtle gradient, centered composition fitting in a circular icon frame, simple background with pastel solid color or light gradient plus small thematic decorations, expressive facial features, SNS-ready kawaii style, consistent with a unified character collection, Capricorn personality type disciplined achiever chibi mascot character (personality classification only), steady determined climbing pose, small trophy and clock props, serious goal-focused expression, dark green (#052e16) and ice blue color scheme, mountain peak hair detail, small mountain and step decorations on background
```

---

### 星座 - 水瓶座 Aquarius（1/20-2/18）

- 性格要約: 革新・自由・人道主義の象徴。独創的な思考・客観的判断力・多様性への寛容さ。
- キャラ要件: モチーフ=水差し・電球・ネットワーク。表情=知的で未来を見つめる表情。ポーズ=空を指す・アイデアを広げる。テーマカラー: シアンブルー (#0891b2) + ライトパープル

- 画像生成プロンプト(EN):
```
Modern flat 2D mascot illustration, chibi deformed character (2-3 head ratio), clean uniform line art, friendly round shapes, soft flat color with subtle gradient, centered composition fitting in a circular icon frame, simple background with pastel solid color or light gradient plus small thematic decorations, expressive facial features, SNS-ready kawaii style, consistent with a unified character collection, Aquarius personality type innovator visionary chibi mascot character (personality classification only), pointing upward visionary pose, water jug and network node props, intellectual future-looking expression, cyan blue (#0891b2) and light purple color scheme, wave hair detail, small wave and dot network decorations on background
```

---

### 星座 - 魚座 Pisces（2/19-3/20）

- 性格要約: 感受性・共感・想像力の象徴。豊かな創造性・直観力・献身的な思いやり・柔軟性。
- キャラ要件: モチーフ=魚・泡・波。表情=夢見るような優しい笑顔・深い共感の目。ポーズ=水の中を泳ぐように・漂う。テーマカラー: ミスティックティール (#0f766e) + ラベンダー

- 画像生成プロンプト(EN):
```
Modern flat 2D mascot illustration, chibi deformed character (2-3 head ratio), clean uniform line art, friendly round shapes, soft flat color with subtle gradient, centered composition fitting in a circular icon frame, simple background with pastel solid color or light gradient plus small thematic decorations, expressive facial features, SNS-ready kawaii style, consistent with a unified character collection, Pisces personality type dreamer empath chibi mascot character (personality classification only), flowing swimming gentle pose, small fish and bubble props, dreamy compassionate expression, mystic teal (#0f766e) and lavender color scheme, small fish scale or fin hair detail, small bubble and wave decorations on background
```

---

## 7. 多重知能 8体

テーマカラー: 各タイプに定義されたCSSカラー変数を参考にポップなカラーで実装

---

### 多重知能 - 言語的知能タイプ（Linguistic）

- 性格要約: 言葉を読む・書く・話す・聞く力が特に優れる知の探究者。複雑な考えを的確に言語化できる。キャラ名: フクロウ博士
- キャラ要件: モチーフ=ペン・本・フキダシ多数。表情=語りかける知的な笑顔。ポーズ=話す・書く・本を持つ。テーマカラー: スクールブルー (#3b82f6) + ペーパーホワイト

- 画像生成プロンプト(EN):
```
Modern flat 2D mascot illustration, chibi deformed character (2-3 head ratio), clean uniform line art, friendly round shapes, soft flat color with subtle gradient, centered composition fitting in a circular icon frame, simple background with pastel solid color or light gradient plus small thematic decorations, expressive facial features, SNS-ready kawaii style, consistent with a unified character collection, linguistic intelligence type scholar writer chibi mascot (owl-like wise character), speaking or writing pose, multiple speech bubble and open book props, articulate intelligent expression, school blue (#3b82f6) and paper white color scheme, quill pen accent prop, small letter and book decorations on background
```

---

### 多重知能 - 論理数学的知能タイプ（Logical-Mathematical）

- 性格要約: 数字・論理・パターン認識に優れる思考者。因果関係を追求し複雑な問題をステップに分解。キャラ名: チェスのキング
- キャラ要件: モチーフ=チェス駒・数式・グラフ。表情=論理的な集中顔・鋭い目。ポーズ=計算する・駒を動かす。テーマカラー: ダークグリーン (#15803d) + シルバー

- 画像生成プロンプト(EN):
```
Modern flat 2D mascot illustration, chibi deformed character (2-3 head ratio), clean uniform line art, friendly round shapes, soft flat color with subtle gradient, centered composition fitting in a circular icon frame, simple background with pastel solid color or light gradient plus small thematic decorations, expressive facial features, SNS-ready kawaii style, consistent with a unified character collection, logical mathematical intelligence type analyst chibi mascot (chess king themed), strategic chess move or calculating pose, chess piece and equation props, focused analytical expression, dark green (#15803d) and silver color scheme, crown and chess board accent detail, small number and graph decorations on background
```

---

### 多重知能 - 視空間的知能タイプ（Spatial）

- 性格要約: 空間・色・形・方向感覚に優れるビジョンの創造者。頭の中で三次元的なイメージを自由に操れる。キャラ名: カメレオン画家
- キャラ要件: モチーフ=パレット・3Dキューブ・カメレオン要素。表情=色彩豊かなクリエイター笑顔。ポーズ=絵を描く・デザインする。テーマカラー: シアン (#06b6d4) + マルチカラー

- 画像生成プロンプト(EN):
```
Modern flat 2D mascot illustration, chibi deformed character (2-3 head ratio), clean uniform line art, friendly round shapes, soft flat color with subtle gradient, centered composition fitting in a circular icon frame, simple background with pastel solid color or light gradient plus small thematic decorations, expressive facial features, SNS-ready kawaii style, consistent with a unified character collection, spatial intelligence type visual artist designer chibi mascot (chameleon artist themed), painting or 3D designing pose, rainbow palette and 3D cube props, creative colorful expression, cyan (#06b6d4) and multicolor scheme, paintbrush and geometric shape detail, small color swatch and shape decorations on background
```

---

### 多重知能 - 身体運動的知能タイプ（Bodily-Kinesthetic）

- 性格要約: 体の動き・手先の器用さ・運動感覚に優れる身体の達人。実践的な体験から素早く学ぶ。キャラ名: チーターアスリート
- キャラ要件: モチーフ=トロフィー・ボール・ランニングシューズ。表情=アクティブで爽やかな笑顔。ポーズ=スポーツポーズ・ダッシュ・ジャンプ。テーマカラー: オレンジ (#f97316) + グリーン

- 画像生成プロンプト(EN):
```
Modern flat 2D mascot illustration, chibi deformed character (2-3 head ratio), clean uniform line art, friendly round shapes, soft flat color with subtle gradient, centered composition fitting in a circular icon frame, simple background with pastel solid color or light gradient plus small thematic decorations, expressive facial features, SNS-ready kawaii style, consistent with a unified character collection, kinesthetic intelligence type athlete mover chibi mascot, dynamic sports action pose, trophy and sports ball props, energetic sporty smile, orange (#f97316) and green color scheme, running shoe accent detail, small motion line and star decorations on background
```

---

### 多重知能 - 音楽的知能タイプ（Musical）

- 性格要約: 音・リズム・メロディーへの感受性が特に優れる表現者。感情を音楽で生きる。キャラ名: ナイチンゲール
- キャラ要件: モチーフ=音符・楽器・マイク。表情=感情豊かな歌う表情。ポーズ=歌う・演奏する・指揮。テーマカラー: ローズ (#f43f5e) + ライトパープル

- 画像生成プロンプト(EN):
```
Modern flat 2D mascot illustration, chibi deformed character (2-3 head ratio), clean uniform line art, friendly round shapes, soft flat color with subtle gradient, centered composition fitting in a circular icon frame, simple background with pastel solid color or light gradient plus small thematic decorations, expressive facial features, SNS-ready kawaii style, consistent with a unified character collection, musical intelligence type performer singer chibi mascot (nightingale bird inspired), singing or playing instrument pose, musical note and microphone props, emotionally expressive singing face, rose (#f43f5e) and light purple color scheme, musical note hair detail, small note and rhythm wave decorations on background
```

---

### 多重知能 - 対人的知能タイプ（Interpersonal）

- 性格要約: 他者の感情・動機・意図を読み取り円滑な人間関係を築く繋がりの達人。生まれながらのコミュニケーター。キャラ名: イルカリーダー
- キャラ要件: モチーフ=手をつなぐ・笑顔のグループ・橋。表情=包容力のある大きな笑顔。ポーズ=人を引き寄せる・橋渡しポーズ。テーマカラー: スカイブルー (#0ea5e9) + ウォームイエロー

- 画像生成プロンプト(EN):
```
Modern flat 2D mascot illustration, chibi deformed character (2-3 head ratio), clean uniform line art, friendly round shapes, soft flat color with subtle gradient, centered composition fitting in a circular icon frame, simple background with pastel solid color or light gradient plus small thematic decorations, expressive facial features, SNS-ready kawaii style, consistent with a unified character collection, interpersonal intelligence type connector leader chibi mascot (dolphin leader inspired), welcoming bridge-building pose, handshake and group icon props, warm inclusive smile, sky blue (#0ea5e9) and warm yellow color scheme, dolphin fin accent detail, small heart and connection dot decorations on background
```

---

### 多重知能 - 内省的知能タイプ（Intrapersonal）

- 性格要約: 自分の感情・強み・弱み・価値観を深く理解する哲学者。深い自己理解が最大の強み。キャラ名: ひとり旅の猫
- キャラ要件: モチーフ=日記・鏡・ランタン。表情=深みのある内省的な微笑み。ポーズ=日記を書く・考え込む・一人旅。テーマカラー: インディゴ (#4f46e5) + ウォームオレンジ

- 画像生成プロンプト(EN):
```
Modern flat 2D mascot illustration, chibi deformed character (2-3 head ratio), clean uniform line art, friendly round shapes, soft flat color with subtle gradient, centered composition fitting in a circular icon frame, simple background with pastel solid color or light gradient plus small thematic decorations, expressive facial features, SNS-ready kawaii style, consistent with a unified character collection, intrapersonal intelligence type self-aware philosopher chibi mascot (solo cat traveler inspired), journaling or quiet reflection pose, diary and small lantern props, thoughtful introspective expression, indigo (#4f46e5) and warm orange color scheme, small cat ear or traveling bag detail, small moon and journal decorations on background
```

---

### 多重知能 - 博物的知能タイプ（Naturalist）

- 性格要約: 自然・生き物・環境のパターンを見抜き分類する観察の達人。万物のつながりを読む。キャラ名: 森の賢者ふくろう
- キャラ要件: モチーフ=葉・虫眼鏡・自然のサンプル瓶。表情=自然を愛する穏やかな笑顔。ポーズ=観察する・サンプルを調べる。テーマカラー: フォレストグリーン (#166534) + アース

- 画像生成プロンプト(EN):
```
Modern flat 2D mascot illustration, chibi deformed character (2-3 head ratio), clean uniform line art, friendly round shapes, soft flat color with subtle gradient, centered composition fitting in a circular icon frame, simple background with pastel solid color or light gradient plus small thematic decorations, expressive facial features, SNS-ready kawaii style, consistent with a unified character collection, naturalist intelligence type nature observer chibi mascot (forest owl sage inspired), nature observation pose, magnifying glass and specimen jar props, calm nature-loving expression, forest green (#166534) and earth brown color scheme, leaf and feather detail, small plant and butterfly decorations on background
```

---

## 8. 恋愛スタイル 6体

テーマカラー: 暖色系のポップカラー（恋愛テーマ）

---

### 恋愛スタイル - 情熱型 Eros

- 性格要約: 運命の出会いを信じ、強い情熱と直感で恋愛する情熱家。深く愛する力を持つ。
- キャラ要件: モチーフ=炎のハート・バラ・稲妻。表情=情熱的で輝く笑顔・目がキラキラ。ポーズ=胸に手を当てる・情熱的なポーズ。テーマカラー: レッド (#ef4444) + ゴールド

- 画像生成プロンプト(EN):
```
Modern flat 2D mascot illustration, chibi deformed character (2-3 head ratio), clean uniform line art, friendly round shapes, soft flat color with subtle gradient, centered composition fitting in a circular icon frame, simple background with pastel solid color or light gradient plus small thematic decorations, expressive facial features, SNS-ready kawaii style, consistent with a unified character collection, Eros romantic passion love style chibi mascot, passionate hand on heart pose, flaming heart and rose props, sparkling passionate smile, red (#ef4444) and gold color scheme, small heart and rose petal decorations on background
```

---

### 恋愛スタイル - 遊戯型 Ludus

- 性格要約: 自由に楽しむ恋愛の達人。軽やかさと自由を大切にし、恋愛をユーモアと余裕で楽しむ。
- キャラ要件: モチーフ=トランプ・蝶々・風船。表情=余裕のあるウィンク・にやり笑い。ポーズ=軽やかなポーズ・カードを持つ。テーマカラー: パープル (#7c3aed) + シルバー

- 画像生成プロンプト(EN):
```
Modern flat 2D mascot illustration, chibi deformed character (2-3 head ratio), clean uniform line art, friendly round shapes, soft flat color with subtle gradient, centered composition fitting in a circular icon frame, simple background with pastel solid color or light gradient plus small thematic decorations, expressive facial features, SNS-ready kawaii style, consistent with a unified character collection, Ludus playful free-spirited love style chibi mascot, carefree winking pose, playing card and butterfly props, charming smirking expression, purple (#7c3aed) and silver color scheme, small card and swirl decorations on background
```

---

### 恋愛スタイル - 友愛型 Storge

- 性格要約: 信頼と時間が育む友情から始まる深い絆。穏やかで誠実なパートナーとして長期関係に強い。
- キャラ要件: モチーフ=木の成長・緑の葉・時計。表情=穏やかで温かい笑顔・安心感。ポーズ=ゆったり座る・温かく手を添える。テーマカラー: グリーン (#22c55e) + ウォームブラウン

- 画像生成プロンプト(EN):
```
Modern flat 2D mascot illustration, chibi deformed character (2-3 head ratio), clean uniform line art, friendly round shapes, soft flat color with subtle gradient, centered composition fitting in a circular icon frame, simple background with pastel solid color or light gradient plus small thematic decorations, expressive facial features, SNS-ready kawaii style, consistent with a unified character collection, Storge friendship-based love style chibi mascot, cozy steady sitting or gentle reaching pose, growing plant and clock props, calm trustworthy warm smile, green (#22c55e) and warm brown color scheme, small leaf and ring decorations on background
```

---

### 恋愛スタイル - 実利型 Pragma

- 性格要約: 現実と感情を両立させる賢明な恋愛設計者。価値観・将来設計・現実的な相性を重視。
- キャラ要件: モチーフ=鍵・設計図・電卓。表情=冷静で知的な笑顔・計算している。ポーズ=計画を立てる・鍵を持つ。テーマカラー: ブルーグレー (#475569) + ゴールド

- 画像生成プロンプト(EN):
```
Modern flat 2D mascot illustration, chibi deformed character (2-3 head ratio), clean uniform line art, friendly round shapes, soft flat color with subtle gradient, centered composition fitting in a circular icon frame, simple background with pastel solid color or light gradient plus small thematic decorations, expressive facial features, SNS-ready kawaii style, consistent with a unified character collection, Pragma practical love style planner chibi mascot, thoughtful planning pose, golden key and blueprint props, calm intelligent smile, blue gray (#475569) and gold color scheme, small key and chart decorations on background
```

---

### 恋愛スタイル - 感情型 Mania

- 性格要約: 愛の深さを全力で感じる感情豊かな恋愛家。真剣さと豊かな感情表現が特徴。
- キャラ要件: モチーフ=波・炎ハート・雨粒。表情=感情豊かな表情・目に感情が溢れる。ポーズ=感情表現豊かなポーズ・胸に手・波のような動き。テーマカラー: コーラル (#f97316) + ティール

- 画像生成プロンプト(EN):
```
Modern flat 2D mascot illustration, chibi deformed character (2-3 head ratio), clean uniform line art, friendly round shapes, soft flat color with subtle gradient, centered composition fitting in a circular icon frame, simple background with pastel solid color or light gradient plus small thematic decorations, expressive facial features, SNS-ready kawaii style, consistent with a unified character collection, Mania deeply emotional love style chibi mascot, expressive emotional gesture pose, wave and heart props, sincere emotionally rich expression, coral (#f97316) and teal color scheme, small wave and teardrop-heart decorations on background
```

---

### 恋愛スタイル - 献身型 Agape

- 性格要約: 見返りを求めない深く静かな無償の愛。相手の幸せを自分の喜びとする深い誠実さ。
- キャラ要件: モチーフ=白い鳩・光・開いた両手。表情=温かく穏やかな包容力のある笑顔。ポーズ=両手を広げる・差し出す。テーマカラー: ホワイト + ソフトゴールド

- 画像生成プロンプト(EN):
```
Modern flat 2D mascot illustration, chibi deformed character (2-3 head ratio), clean uniform line art, friendly round shapes, soft flat color with subtle gradient, centered composition fitting in a circular icon frame, simple background with pastel solid color or light gradient plus small thematic decorations, expressive facial features, SNS-ready kawaii style, consistent with a unified character collection, Agape unconditional love style selfless chibi mascot, open arms offering gentle pose, white dove and soft glow props, serene unconditional warmth expression, white and soft gold color scheme, small dove and gentle light ray decorations on background
```

---

## 9. 友達相性 6体

テーマカラー: 明るいポップカラー（友情テーマ）

---

### 友達相性 - ムードメーカー型

- 性格要約: 場を明るくするみんなの太陽。グループを自然と盛り上げ、誰かが孤立しそうなとき声をかける行動力。
- キャラ要件: モチーフ=太陽・拡声器・紙吹雪。表情=最高の笑顔・目が笑っている。ポーズ=両手を上げる・ジャンプ。テーマカラー: サンイエロー (#fbbf24) + オレンジ

- 画像生成プロンプト(EN):
```
Modern flat 2D mascot illustration, chibi deformed character (2-3 head ratio), clean uniform line art, friendly round shapes, soft flat color with subtle gradient, centered composition fitting in a circular icon frame, simple background with pastel solid color or light gradient plus small thematic decorations, expressive facial features, SNS-ready kawaii style, consistent with a unified character collection, mood maker cheerful friend type chibi mascot, jumping arms raised energetic pose, megaphone and confetti props, biggest happiest grin, sun yellow (#fbbf24) and orange color scheme, small sun ray and party decoration on background
```

---

### 友達相性 - 聴き上手型

- 性格要約: 話してよかったと思わせる安心の存在。深い共感力で友達が「安全な場所」と感じる聴き役。
- キャラ要件: モチーフ=耳・ハート・ぬいぐるみ。表情=穏やかで受け止める笑顔・優しい目。ポーズ=耳を傾ける・膝を抱えて聞く。テーマカラー: ソフトグリーン (#86efac) + ピンク

- 画像生成プロンプト(EN):
```
Modern flat 2D mascot illustration, chibi deformed character (2-3 head ratio), clean uniform line art, friendly round shapes, soft flat color with subtle gradient, centered composition fitting in a circular icon frame, simple background with pastel solid color or light gradient plus small thematic decorations, expressive facial features, SNS-ready kawaii style, consistent with a unified character collection, compassionate listener friend type chibi mascot, leaning forward attentive listening pose, big ear and heart props, gentle accepting smile, soft green (#86efac) and pink color scheme, small heart and wave decorations on background
```

---

### 友達相性 - 仕切り屋型

- 性格要約: みんなを動かす頼れる旗振り役。グループの方向性を決め、誰かがやらなければならないことを先に動く。
- キャラ要件: モチーフ=旗・カレンダー・メガホン。表情=自信のある行動派の笑顔。ポーズ=旗を掲げる・前に出る。テーマカラー: コーラルレッド (#f87171) + イエロー

- 画像生成プロンプト(EN):
```
Modern flat 2D mascot illustration, chibi deformed character (2-3 head ratio), clean uniform line art, friendly round shapes, soft flat color with subtle gradient, centered composition fitting in a circular icon frame, simple background with pastel solid color or light gradient plus small thematic decorations, expressive facial features, SNS-ready kawaii style, consistent with a unified character collection, natural leader organizer friend type chibi mascot, flag-raising confident leading pose, flag and schedule board props, decisive reliable smile, coral red (#f87171) and yellow color scheme, small flag and direction arrow decorations on background
```

---

### 友達相性 - 一匹狼型

- 性格要約: 少数の深い絆を大切にする自分軸の人。気が合う人とだけ深く関わり、本物の友情を育む。
- キャラ要件: モチーフ=オオカミ・月・本。表情=静かで個性的な微笑み・深い目。ポーズ=一人で佇む・本を読む。テーマカラー: グレーブルー (#64748b) + ムーンホワイト

- 画像生成プロンプト(EN):
```
Modern flat 2D mascot illustration, chibi deformed character (2-3 head ratio), clean uniform line art, friendly round shapes, soft flat color with subtle gradient, centered composition fitting in a circular icon frame, simple background with pastel solid color or light gradient plus small thematic decorations, expressive facial features, SNS-ready kawaii style, consistent with a unified character collection, independent spirit lone wolf friend type chibi mascot, solo reading or quiet standing pose, crescent moon and book props, calm unique self-assured expression, gray blue (#64748b) and moon white color scheme, small moon and footprint decorations on background
```

---

### 友達相性 - 同調型

- 性格要約: 空気を読んでみんなをつなぐ縁の下の力持ち。グループの和を大切にし、橋渡し役を担う。
- キャラ要件: モチーフ=天秤・橋・鳩。表情=穏やかで調和的な笑顔。ポーズ=橋渡しポーズ・両手をつなぐ。テーマカラー: ラベンダー (#c4b5fd) + ソフトイエロー

- 画像生成プロンプト(EN):
```
Modern flat 2D mascot illustration, chibi deformed character (2-3 head ratio), clean uniform line art, friendly round shapes, soft flat color with subtle gradient, centered composition fitting in a circular icon frame, simple background with pastel solid color or light gradient plus small thematic decorations, expressive facial features, SNS-ready kawaii style, consistent with a unified character collection, empathetic harmonizer friend type chibi mascot, gentle bridge-connecting hands pose, balance scale and dove props, harmonious peaceful smile, lavender (#c4b5fd) and soft yellow color scheme, small ribbon and connecting dot decorations on background
```

---

### 友達相性 - 知性派型

- 性格要約: 深く考え本質を語る静かなる洞察者。知的対話を楽しみ、冷静な分析で友達に新視点をもたらす。
- キャラ要件: モチーフ=望遠鏡・本・思考バブル。表情=知的で考え込む表情・観察者の目。ポーズ=腕を組む・望遠鏡を覗く。テーマカラー: ディープブルー (#1d4ed8) + ライトグレー

- 画像生成プロンプト(EN):
```
Modern flat 2D mascot illustration, chibi deformed character (2-3 head ratio), clean uniform line art, friendly round shapes, soft flat color with subtle gradient, centered composition fitting in a circular icon frame, simple background with pastel solid color or light gradient plus small thematic decorations, expressive facial features, SNS-ready kawaii style, consistent with a unified character collection, thoughtful analyst friend type chibi mascot, arms crossed observing pose, telescope and thought bubble props, calm insightful expression, deep blue (#1d4ed8) and light gray color scheme, small star and thought cloud decorations on background
```

---

## 10. DiSC 4体

テーマカラー: ビジネステーマで清潔感ある配色

---

### DiSC - D型 主導型（Dominance）

- 性格要約: 結果を出すために動くスピードと実行力の牽引者。率直・決断が速い・挑戦的なリーダー。
- キャラ要件: モチーフ=ライオン・稲妻・ゴール。表情=力強い自信の表情・燃える目。ポーズ=前進・拳を握る。テーマカラー: ファイアレッド (#dc2626) + ブラック

- 画像生成プロンプト(EN):
```
Modern flat 2D mascot illustration, chibi deformed character (2-3 head ratio), clean uniform line art, friendly round shapes, soft flat color with subtle gradient, centered composition fitting in a circular icon frame, simple background with pastel solid color or light gradient plus small thematic decorations, expressive facial features, SNS-ready kawaii style, consistent with a unified character collection, DiSC D Dominance type leader chibi mascot, powerful fist-clenched forward pose, lightning bolt and goal flag props, bold confident intense expression, fire red (#dc2626) and black color scheme, small lightning and winner medal decorations on background
```

---

### DiSC - i型 感化型（influence）

- 性格要約: 人を巻き込み場を明るくする生まれながらのムードメーカー。楽観的・説得力・人脈形成が得意。
- キャラ要件: モチーフ=星・マイク・カラフルな吹き出し。表情=最高の笑顔・エネルギッシュ。ポーズ=手を広げる・プレゼン。テーマカラー: サンシャインイエロー (#facc15) + オレンジ

- 画像生成プロンプト(EN):
```
Modern flat 2D mascot illustration, chibi deformed character (2-3 head ratio), clean uniform line art, friendly round shapes, soft flat color with subtle gradient, centered composition fitting in a circular icon frame, simple background with pastel solid color or light gradient plus small thematic decorations, expressive facial features, SNS-ready kawaii style, consistent with a unified character collection, DiSC i influence type social energizer chibi mascot, arms spread presenting engaging pose, star and microphone props, brightest charming smile, sunshine yellow (#facc15) and orange color scheme, small speech bubble and confetti decorations on background
```

---

### DiSC - S型 安定型（Steadiness）

- 性格要約: チームの土台を支える忍耐と協調の縁の下の力持ち。協調性・サポート役・長期信頼構築。
- キャラ要件: モチーフ=緑の木・盾・土台。表情=穏やかで安定感のある笑顔。ポーズ=しっかり立つ・支える。テーマカラー: グリーン (#16a34a) + アースブラウン

- 画像生成プロンプト(EN):
```
Modern flat 2D mascot illustration, chibi deformed character (2-3 head ratio), clean uniform line art, friendly round shapes, soft flat color with subtle gradient, centered composition fitting in a circular icon frame, simple background with pastel solid color or light gradient plus small thematic decorations, expressive facial features, SNS-ready kawaii style, consistent with a unified character collection, DiSC S Steadiness type supportive stabilizer chibi mascot, grounded steady supporting pose, small tree and foundation stone props, calm reliable warm smile, green (#16a34a) and earth brown color scheme, small leaf and root decorations on background
```

---

### DiSC - C型 慎重型（Conscientiousness）

- 性格要約: 正確性とデータで判断する品質と根拠の専門家。分析的・高い専門性・ルール遵守・品質管理。
- キャラ要件: モチーフ=顕微鏡・データチャート・虫眼鏡。表情=集中した分析顔・鋭い目。ポーズ=データを調べる・ノートにメモ。テーマカラー: ブルーグレー (#1e40af) + ライトシルバー

- 画像生成プロンプト(EN):
```
Modern flat 2D mascot illustration, chibi deformed character (2-3 head ratio), clean uniform line art, friendly round shapes, soft flat color with subtle gradient, centered composition fitting in a circular icon frame, simple background with pastel solid color or light gradient plus small thematic decorations, expressive facial features, SNS-ready kawaii style, consistent with a unified character collection, DiSC C Conscientiousness type analyst quality expert chibi mascot, careful data examining pose, microscope and chart props, precise focused analytical expression, blue gray (#1e40af) and light silver color scheme, small data graph and checkmark decorations on background
```

---

## 11. 完璧主義 4体

テーマカラー: 落ち着いたトーンで上品に

---

### 完璧主義 - 徹底型

- 性格要約: やるなら100%、自分への基準が誰よりも高い妥協なき完成追求者。高品質を生み続ける原動力。
- キャラ要件: モチーフ=100点・星5・精密時計。表情=真剣でこだわりのある表情・完成への強い意志。ポーズ=完成品を丁寧に磨く・チェックする。テーマカラー: ダークネイビー (#1e293b) + ゴールド

- 画像生成プロンプト(EN):
```
Modern flat 2D mascot illustration, chibi deformed character (2-3 head ratio), clean uniform line art, friendly round shapes, soft flat color with subtle gradient, centered composition fitting in a circular icon frame, simple background with pastel solid color or light gradient plus small thematic decorations, expressive facial features, SNS-ready kawaii style, consistent with a unified character collection, thorough perfectionist self-oriented type chibi mascot, polishing or carefully inspecting pose, gold star and precision clock props, determined meticulous expression, dark navy (#1e293b) and gold color scheme, small 100-point star and polish cloth decorations on background
```

---

### 完璧主義 - こだわり型

- 性格要約: 細部にこそ本質が宿る秩序と精度を愛する職人気質。整理整頓・精度・再現性への強いこだわり。
- キャラ要件: モチーフ=定規・ラベル・整理棚。表情=几帳面で丁寧な表情・正確さを求める目。ポーズ=整理する・ラベルを貼る。テーマカラー: インディゴ (#312e81) + クリーンホワイト

- 画像生成プロンプト(EN):
```
Modern flat 2D mascot illustration, chibi deformed character (2-3 head ratio), clean uniform line art, friendly round shapes, soft flat color with subtle gradient, centered composition fitting in a circular icon frame, simple background with pastel solid color or light gradient plus small thematic decorations, expressive facial features, SNS-ready kawaii style, consistent with a unified character collection, organization perfectionist detail-oriented type chibi mascot, carefully organizing labeling pose, ruler and label props, precise tidy satisfied expression, indigo (#312e81) and clean white color scheme, small ruler and organized shelf decorations on background
```

---

### 完璧主義 - 先延ばし型

- 性格要約: 完璧にできないなら始められない失敗への恐れが生む慎重さの罠。本気で取り組む誠実さが根底にある。
- キャラ要件: モチーフ=砂時計・立ち止まるシルエット・準備道具。表情=悩んでいるが誠実な表情。ポーズ=準備しながら立ち止まっている。テーマカラー: アンバー (#d97706) + グレー

- 画像生成プロンプト(EN):
```
Modern flat 2D mascot illustration, chibi deformed character (2-3 head ratio), clean uniform line art, friendly round shapes, soft flat color with subtle gradient, centered composition fitting in a circular icon frame, simple background with pastel solid color or light gradient plus small thematic decorations, expressive facial features, SNS-ready kawaii style, consistent with a unified character collection, procrastinating perfectionist failure-avoidant type chibi mascot, hesitant pausing mid-preparation pose, hourglass and overprepared bag props, thoughtful cautious but sincere expression, amber (#d97706) and gray color scheme, small hourglass and preparation items decorations on background
```

---

### 完璧主義 - 期待型

- 性格要約: 誰かの期待が私のプレッシャーとなる承認の追求者。他者の期待に敏感で、応えようとする共感力が高い。
- キャラ要件: モチーフ=鏡・視線・承認のサムズアップ。表情=緊張しているが頑張る表情・周囲を意識している。ポーズ=鏡を気にする・反応を待つ。テーマカラー: ローズ (#e11d48) + ペールピンク

- 画像生成プロンプト(EN):
```
Modern flat 2D mascot illustration, chibi deformed character (2-3 head ratio), clean uniform line art, friendly round shapes, soft flat color with subtle gradient, centered composition fitting in a circular icon frame, simple background with pastel solid color or light gradient plus small thematic decorations, expressive facial features, SNS-ready kawaii style, consistent with a unified character collection, socially prescribed perfectionist approval seeker type chibi mascot, aware of surroundings checking mirror pose, mirror and thumbs up props, eager to please slightly anxious expression, rose (#e11d48) and pale pink color scheme, small eye and approval star decorations on background
```

---

## 12. 金銭感覚 4体

テーマカラー: マネーテーマでクリーンに

---

### 金銭感覚 - 回避型

- 性格要約: お金より大切なものがある静かな価値観の持ち主。精神的豊かさ・体験・人間関係を優先する。
- キャラ要件: モチーフ=緑の葉・本・ハーブ。表情=穏やかで価値観のある笑顔。ポーズ=自然の中でゆったり・本を読む。テーマカラー: ミントグリーン (#34d399) + アース

- 画像生成プロンプト(EN):
```
Modern flat 2D mascot illustration, chibi deformed character (2-3 head ratio), clean uniform line art, friendly round shapes, soft flat color with subtle gradient, centered composition fitting in a circular icon frame, simple background with pastel solid color or light gradient plus small thematic decorations, expressive facial features, SNS-ready kawaii style, consistent with a unified character collection, money avoidance type values-driven chibi mascot, relaxed nature reading pose, plant and herbal tea props, peaceful content expression, mint green (#34d399) and earth brown color scheme, small leaf and book decorations on background
```

---

### 金銭感覚 - 崇拝型

- 性格要約: もっと稼げばもっと自由になれると信じる行動派。強い向上心と収入向上への行動力がある。
- キャラ要件: モチーフ=ロケット・グラフ上昇・金貨。表情=前向きで意欲的な笑顔・目標を見つめる。ポーズ=ロケットに乗る・上昇するポーズ。テーマカラー: ゴールド (#ca8a04) + オレンジ

- 画像生成プロンプト(EN):
```
Modern flat 2D mascot illustration, chibi deformed character (2-3 head ratio), clean uniform line art, friendly round shapes, soft flat color with subtle gradient, centered composition fitting in a circular icon frame, simple background with pastel solid color or light gradient plus small thematic decorations, expressive facial features, SNS-ready kawaii style, consistent with a unified character collection, money worship ambitious achiever type chibi mascot, riding rocket upward launch pose, rising graph and coin props, motivated ambitious smile, gold (#ca8a04) and orange color scheme, small rocket and upward arrow decorations on background
```

---

### 金銭感覚 - 地位型

- 性格要約: 洗練された暮らしで自分の価値を表現したい。社会的立場・ブランド・生活クオリティへの高い意識。
- キャラ要件: モチーフ=クラウン・高級品・鏡。表情=洗練されたスマートな笑顔。ポーズ=エレガントなポーズ・見せる立ち方。テーマカラー: ダークゴールド (#92400e) + ブラック

- 画像生成プロンプト(EN):
```
Modern flat 2D mascot illustration, chibi deformed character (2-3 head ratio), clean uniform line art, friendly round shapes, soft flat color with subtle gradient, centered composition fitting in a circular icon frame, simple background with pastel solid color or light gradient plus small thematic decorations, expressive facial features, SNS-ready kawaii style, consistent with a unified character collection, money status type sophisticated lifestyle chibi mascot, elegant refined confident pose, small crown and luxury accessory props, stylish polished expression, dark gold (#92400e) and black color scheme, small diamond and sparkle decorations on background
```

---

### 金銭感覚 - 用心型

- 性格要約: 計画と節制で将来への安心を積み上げる堅実派。計画的な資産管理と高い自制心。
- キャラ要件: モチーフ=貯金箱・家計簿・盾。表情=堅実で安心感のある笑顔・信頼感。ポーズ=貯金箱を抱える・計画を立てる。テーマカラー: ダークグリーン (#065f46) + シルバー

- 画像生成プロンプト(EN):
```
Modern flat 2D mascot illustration, chibi deformed character (2-3 head ratio), clean uniform line art, friendly round shapes, soft flat color with subtle gradient, centered composition fitting in a circular icon frame, simple background with pastel solid color or light gradient plus small thematic decorations, expressive facial features, SNS-ready kawaii style, consistent with a unified character collection, money vigilance frugal planner type chibi mascot, holding piggy bank careful planning pose, piggybank and household ledger props, reliable steady trustworthy expression, dark green (#065f46) and silver color scheme, small coin and shield decorations on background
```

---

## 13. 恋愛依存 4体

愛着スタイル（Bowlby / Ainsworth理論ベース）のキャラクター化。
テーマカラー: 暖色〜寒色のスペクトラム

---

### 恋愛依存 - 安定型（Secure）

- 性格要約: 安心した愛着スタイルを持ち、健全な距離感で深い関係を築ける。自己信頼と相手への信頼を自然に持つ。
- キャラ要件: モチーフ=錨・ハート・太陽。表情=安定した温かい笑顔・安心感のある目。ポーズ=ゆったり安定・手を添える。テーマカラー: スカイブルー (#0ea5e9) + サンイエロー

- 画像生成プロンプト(EN):
```
Modern flat 2D mascot illustration, chibi deformed character (2-3 head ratio), clean uniform line art, friendly round shapes, soft flat color with subtle gradient, centered composition fitting in a circular icon frame, simple background with pastel solid color or light gradient plus small thematic decorations, expressive facial features, SNS-ready kawaii style, consistent with a unified character collection, secure attachment love style stable chibi mascot, grounded steady comfortable pose, anchor and heart props, confident warm secure smile, sky blue (#0ea5e9) and sun yellow color scheme, small anchor and sun decorations on background
```

---

### 恋愛依存 - 不安型（Anxious）

- 性格要約: 強い感情と愛情への切実さを持つ。関係への真剣さが高く、繋がりを大切にしたいという誠実な気持ちが根底にある。
- キャラ要件: モチーフ=電話・ハート・波。表情=不安だが誠実な表情・感情が表れている。ポーズ=待つ・連絡を確認。テーマカラー: コーラル (#fb7185) + ラベンダー

- 画像生成プロンプト(EN):
```
Modern flat 2D mascot illustration, chibi deformed character (2-3 head ratio), clean uniform line art, friendly round shapes, soft flat color with subtle gradient, centered composition fitting in a circular icon frame, simple background with pastel solid color or light gradient plus small thematic decorations, expressive facial features, SNS-ready kawaii style, consistent with a unified character collection, anxious attachment love style caring earnest chibi mascot, waiting or reaching out pose, phone and heart props, sincere emotionally engaged expression, coral (#fb7185) and lavender color scheme, small heart and wave decorations on background
```

---

### 恋愛依存 - 回避型（Avoidant）

- 性格要約: 自立を大切にし自分のペースを守る。深い関係よりも個人の自由と独立を重視する。
- キャラ要件: モチーフ=本・空間・扉。表情=クールで独立した微笑み・距離を保つ目。ポーズ=一歩引いた立ち姿・本を持つ。テーマカラー: ミッドナイトブルー (#1e3a5f) + シルバー

- 画像生成プロンプト(EN):
```
Modern flat 2D mascot illustration, chibi deformed character (2-3 head ratio), clean uniform line art, friendly round shapes, soft flat color with subtle gradient, centered composition fitting in a circular icon frame, simple background with pastel solid color or light gradient plus small thematic decorations, expressive facial features, SNS-ready kawaii style, consistent with a unified character collection, avoidant attachment love style independent chibi mascot, slightly stepped back self-sufficient pose, personal space book and small door props, cool composed independent expression, midnight blue (#1e3a5f) and silver color scheme, small key and space line decorations on background
```

---

### 恋愛依存 - 共依存型（Codependent）

- 性格要約: 相手のために全力を尽くす深い献身性。思いやりが非常に深く、関係を守りたいという強い意志を持つ。
- キャラ要件: モチーフ=絡み合うハート・手・糸。表情=温かく包み込む笑顔・全力の目。ポーズ=しっかり手をつなぐ・全力でサポート。テーマカラー: マゼンタ (#c026d3) + ウォームゴールド

- 画像生成プロンプト(EN):
```
Modern flat 2D mascot illustration, chibi deformed character (2-3 head ratio), clean uniform line art, friendly round shapes, soft flat color with subtle gradient, centered composition fitting in a circular icon frame, simple background with pastel solid color or light gradient plus small thematic decorations, expressive facial features, SNS-ready kawaii style, consistent with a unified character collection, codependent love style deeply devoted chibi mascot, fully supportive holding hands nurturing pose, intertwined heart and helping hand props, warm whole-hearted expression, magenta (#c026d3) and warm gold color scheme, small heart chain and care symbol decorations on background
```

---

## 14. 血液型 4体

テーマカラー: 各血液型のイメージカラー

---

### 血液型 - A型（几帳面な調和派）

- 性格要約: 几帳面で神経質・内省的。細部まで丁寧、ルールを守り、チームの調和を大切にする誠実派。
- キャラ要件: モチーフ=チェックリスト・整理棚・時計。表情=丁寧で真剣な微笑み・信頼感。ポーズ=確認する・正確に整理。テーマカラー: スカーレット (#dc2626) + クリーンホワイト

- 画像生成プロンプト(EN):
```
Modern flat 2D mascot illustration, chibi deformed character (2-3 head ratio), clean uniform line art, friendly round shapes, soft flat color with subtle gradient, centered composition fitting in a circular icon frame, simple background with pastel solid color or light gradient plus small thematic decorations, expressive facial features, SNS-ready kawaii style, consistent with a unified character collection, blood type A personality meticulous harmonious chibi mascot, carefully checking organizing pose, checklist and neatly organized shelf props, precise reliable expression, scarlet (#dc2626) and clean white color scheme, small checkmark and clock decorations on background
```

---

### 血液型 - B型（自由なマイペース探求派）

- 性格要約: 積極的・社交的・マイペースで自分の感覚を大切にする。好奇心旺盛で興味を持ったことに没頭する。
- キャラ要件: モチーフ=虫眼鏡・地図・アドベンチャーハット。表情=好奇心旺盛な笑顔・自由な目。ポーズ=我が道を行く・探索。テーマカラー: スカーレット (#dc2626) + イエロー

- 画像生成プロンプト(EN):
```
Modern flat 2D mascot illustration, chibi deformed character (2-3 head ratio), clean uniform line art, friendly round shapes, soft flat color with subtle gradient, centered composition fitting in a circular icon frame, simple background with pastel solid color or light gradient plus small thematic decorations, expressive facial features, SNS-ready kawaii style, consistent with a unified character collection, blood type B personality free-spirited curious chibi mascot, independent exploring adventurous pose, magnifying glass and adventure map props, curious playful expression, scarlet (#dc2626) and yellow color scheme, small compass and footprint decorations on background
```

---

### 血液型 - O型（頼れる社交的リーダー派）

- 性格要約: 積極的・大らか・社交的でリーダーシップが際立つ。目標に向かって前向きに行動し周囲を巻き込む。
- キャラ要件: モチーフ=旗・仲間・太陽。表情=大らかで人懐っこい笑顔・明るい目。ポーズ=みんなをまとめる・前に出る。テーマカラー: スカーレット (#dc2626) + ウォームオレンジ

- 画像生成プロンプト(EN):
```
Modern flat 2D mascot illustration, chibi deformed character (2-3 head ratio), clean uniform line art, friendly round shapes, soft flat color with subtle gradient, centered composition fitting in a circular icon frame, simple background with pastel solid color or light gradient plus small thematic decorations, expressive facial features, SNS-ready kawaii style, consistent with a unified character collection, blood type O personality sociable leader chibi mascot, rallying leading forward pose, flag and sun props, open-hearted energetic grin, scarlet (#dc2626) and warm orange color scheme, small crown and handshake decorations on background
```

---

### 血液型 - AB型（独創的な合理派）

- 性格要約: 二面性・合理的・独創的。状況に応じて柔軟に対応できる知的なタイプ。独自の視点と論理的思考力。
- キャラ要件: モチーフ=コイン表裏・本・パズル。表情=独特で知的な笑顔・少し謎めいた目。ポーズ=分析する・ユニークな視点のポーズ。テーマカラー: スカーレット (#dc2626) + パープル

- 画像生成プロンプト(EN):
```
Modern flat 2D mascot illustration, chibi deformed character (2-3 head ratio), clean uniform line art, friendly round shapes, soft flat color with subtle gradient, centered composition fitting in a circular icon frame, simple background with pastel solid color or light gradient plus small thematic decorations, expressive facial features, SNS-ready kawaii style, consistent with a unified character collection, blood type AB personality creative rational dual-nature chibi mascot, unique thoughtful analytical pose, two-sided coin and puzzle piece props, clever enigmatic expression, scarlet (#dc2626) and purple color scheme, small yin-yang and puzzle decorations on background
```

---

## 発注・納品チェックリスト

### 外注先への必須確認事項
1. 全84体で共通スタイルプレフィックスを使用していること
2. 共通ネガティブプロンプトを全体に適用していること
3. 頭身は全体で2〜3頭身デフォルメで統一すること
4. 占い・神秘主義・オカルト的演出が一切含まれないこと
5. 星座キャラに「性格類型として」の注記を適用していること

### 納品形式
- 解像度: 1024×1024px 以上（正方形）
- 形式: PNG（背景透過推奨） + JPG（白背景）
- ファイル名: `{グループID}-{タイプID}.png`（例: `mbti-intj.png`, `big5-lion.png`）

### サンプル確認推奨
84体の前に代表サンプル3〜5体（例: INTJ・ライオン王・牡羊座・対人的知能・情熱型Eros）を確認し、
スタイル・頭身・ブランド統一感をクライアントに確認してから全体発注すること。

---

*作成日: 2026-06-06 | 診断ナビ（shindan-navi.jp）外注用キャラクタープロンプト集 | 全84体*
