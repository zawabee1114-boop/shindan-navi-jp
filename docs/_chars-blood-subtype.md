# 血液型サブタイプ診断 キャラクタープロンプト案（追加発注用）
# 12タイプ × 男女 = 24体

> 既存の `CHARACTER_PROMPTS_外注用.md` に追記する提案。
> 共通スタイルプレフィックス・ネガティブプロンプト・禁止事項は `CHARACTER_PROMPTS_外注用.md` の定義を踏襲。
> 画像保存先: `public/img/character/blood-{typeId}-{gender}.webp`
> 例: `blood-a-typical-male.webp` / `blood-a-typical-female.webp`

---

## 追加カウント（本ファイル分）

| 診断 | タイプ | 男女 | 計 |
|---|---:|---|---:|
| 血液型サブタイプ | 12 | ×2 | 24 |

既存168体 + 24体 = **計192体**

---

## 共通テーマ設定（血液型サブタイプ診断全体）

- 診断コンセプト: 血液型×Big5傾向で12タイプに細分化した自己理解ツール
- 全体カラー: 血液型ごとのグループカラーをベースに、サブタイプで明度・彩度を差分化
  - A型グループ: バーミリオン〜クリムゾン系
  - B型グループ: ロイヤルブルー〜ネイビー系
  - O型グループ: バーントオレンジ〜テラコッタ系
  - AB型グループ: ディープパープル〜インディゴ系
- 占い・神秘主義演出は絶対NG（血液型文化的分類のみ）
- ブラハラ（差別・偏見）を連想させる表現は禁止

---

## A型グループ（テーマ: バーミリオン〜クリムゾン系）

---

### A-typical / 典型A型（几帳面で慎重、秩序を大切にする誠実タイプ）

- 性格要約: A型らしい几帳面さと誠実さが最もよく表れた標準型。責任感強く、計画的にコツコツ積み上げる秩序派
- テーマカラー: クリムゾンレッド / クリームホワイト
- 小物: 手帳・ペン・整理された机・チェックリスト
- 表情・ポーズ: 柔らかくも真剣な表情、背筋が伸びた丁寧な立ち姿
- 服装: 清潔感のある制服風・ネクタイまたはリボン・整ったヘア
- 背景: 整理整頓された室内・窓から差し込む優しい光

**【男性版プロンプト（EN）】**
```
Modern Japanese youth anime / light-novel illustration, semi-realistic anime art style, natural 6-7 head proportion, high-school to college-aged character, soft cel-shading with gentle gradients and subtle light bloom, clean delicate line art, bright fresh airy color palette, sparkle and soft bokeh accents, youthful friendly expressive face, polished anime finish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; SNS-ready; unified consistent illustration style across the entire collection, || male, tidy dark-red school uniform with white shirt and neat tie, short well-groomed hair, gentle but earnest expression, standing upright with a planner and pen in hand, checklist on desk in background, warm cream and crimson color palette, soft morning light from window
```

**【女性版プロンプト（EN）】**
```
Modern Japanese youth anime / light-novel illustration, semi-realistic anime art style, natural 6-7 head proportion, high-school to college-aged character, soft cel-shading with gentle gradients and subtle light bloom, clean delicate line art, bright fresh airy color palette, sparkle and soft bokeh accents, youthful friendly expressive face, polished anime finish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; SNS-ready; unified consistent illustration style across the entire collection, || female, neat school uniform with crimson ribbon, hair neatly tied, gentle earnest smile, holding a tidy agenda planner, organized desk in background, cream and crimson color palette, soft natural light
```

---

### A-active / 行動A型（誠実さと積極性を兼ね備えた外向き行動タイプ）

- 性格要約: A型の誠実さを保ちながら外向的な行動力も持つ「変則型」。リーダー的役割を担いながら丁寧さも維持する
- テーマカラー: ローズレッド / ゴールデンイエロー
- 小物: タブレット・リーダーバッジ・ノート・コーヒーカップ
- 表情・ポーズ: 明るい笑顔・前傾みのある積極的なポーズ
- 服装: カジュアルアウター×シャツ・活動的な印象
- 背景: 明るい教室・オープンオフィス・コラボ感のある空間

**【男性版プロンプト（EN）】**
```
Modern Japanese youth anime / light-novel illustration, semi-realistic anime art style, natural 6-7 head proportion, high-school to college-aged character, soft cel-shading with gentle gradients and subtle light bloom, clean delicate line art, bright fresh airy color palette, sparkle and soft bokeh accents, youthful friendly expressive face, polished anime finish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; SNS-ready; unified consistent illustration style across the entire collection, || male, casual blazer over neat shirt, confident bright smile, forward-leaning energetic pose, holding a tablet with notes, rose-red and warm golden accent palette, bright collaborative space background
```

**【女性版プロンプト（EN）】**
```
Modern Japanese youth anime / light-novel illustration, semi-realistic anime art style, natural 6-7 head proportion, high-school to college-aged character, soft cel-shading with gentle gradients and subtle light bloom, clean delicate line art, bright fresh airy color palette, sparkle and soft bokeh accents, youthful friendly expressive face, polished anime finish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; SNS-ready; unified consistent illustration style across the entire collection, || female, smart casual blazer with rose-red accent, energetic bright smile, dynamic standing pose with notebook, golden warm highlights, open bright classroom or office background
```

---

### A-inner / 内省A型（繊細な感受性で深く考え続ける内向きタイプ）

- 性格要約: A型の几帳面さが内向きに表れた繊細型。高い感受性と深い思考力を持ち、一人の時間を大切にする
- テーマカラー: ディープローズ / ラベンダーグレー
- 小物: 本・日記・ヘッドフォン・窓辺のお茶
- 表情・ポーズ: 静かで内省的な表情、本や窓の外を見つめるポーズ
- 服装: シンプルで落ち着いた服装・やや重ね着
- 背景: 薄暗い図書館・静かな窓辺・夕暮れの部屋

**【男性版プロンプト（EN）】**
```
Modern Japanese youth anime / light-novel illustration, semi-realistic anime art style, natural 6-7 head proportion, high-school to college-aged character, soft cel-shading with gentle gradients and subtle light bloom, clean delicate line art, bright fresh airy color palette, sparkle and soft bokeh accents, youthful friendly expressive face, polished anime finish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; SNS-ready; unified consistent illustration style across the entire collection, || male, simple layered outfit in soft deep rose and lavender-grey tones, quiet introspective expression, sitting by a window with a book and cup of tea, headphones around neck, soft evening light, library or cozy room background
```

**【女性版プロンプト（EN）】**
```
Modern Japanese youth anime / light-novel illustration, semi-realistic anime art style, natural 6-7 head proportion, high-school to college-aged character, soft cel-shading with gentle gradients and subtle light bloom, clean delicate line art, bright fresh airy color palette, sparkle and soft bokeh accents, youthful friendly expressive face, polished anime finish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; SNS-ready; unified consistent illustration style across the entire collection, || female, soft layered casual outfit in deep rose and lavender-grey, gentle introspective expression, seated at window with diary and herbal tea, soft dusky evening light, quiet library atmosphere
```

---

## B型グループ（テーマ: ロイヤルブルー〜ネイビー系）

---

### B-typical / 典型B型（自由な発想とマイペースさが際立つ個性派タイプ）

- 性格要約: B型の自由・マイペース・独自性が最もよく表れた標準型。固定観念にとらわれない発想力と行動力を持つ個性派
- テーマカラー: ロイヤルブルー / スカイブルー
- 小物: スケッチブック・カラフルなグッズ・ヘッドフォン・エナジードリンク
- 表情・ポーズ: 自由でリラックスした笑顔・個性的なポーズ（少し斜め・ポケットに手）
- 服装: 独特のファッションセンス・パーカー×カラフルアイテム
- 背景: カフェ・音楽スタジオ・アート系の壁

**【男性版プロンプト（EN）】**
```
Modern Japanese youth anime / light-novel illustration, semi-realistic anime art style, natural 6-7 head proportion, high-school to college-aged character, soft cel-shading with gentle gradients and subtle light bloom, clean delicate line art, bright fresh airy color palette, sparkle and soft bokeh accents, youthful friendly expressive face, polished anime finish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; SNS-ready; unified consistent illustration style across the entire collection, || male, distinctive casual outfit with royal-blue hoodie and colorful accessories, relaxed free-spirited smile, one hand in pocket casual slouched pose, sketchbook under arm, art-cafe or music studio background, blue and sky-blue accent palette
```

**【女性版プロンプト（EN）】**
```
Modern Japanese youth anime / light-novel illustration, semi-realistic anime art style, natural 6-7 head proportion, high-school to college-aged character, soft cel-shading with gentle gradients and subtle light bloom, clean delicate line art, bright fresh airy color palette, sparkle and soft bokeh accents, youthful friendly expressive face, polished anime finish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; SNS-ready; unified consistent illustration style across the entire collection, || female, unique casual fashion with royal-blue jacket and colorful accessories, free-spirited cheerful smile, relaxed pose holding sketchbook, headphones around neck, art studio or indie cafe background, bright blue palette
```

---

### B-social / 協調B型（社交性と自由さを兼ね備えた場を和ませるタイプ）

- 性格要約: B型の自由さを持ちながら社交性・協調性も高い変則型。場を盛り上げ広い交友関係を持つ社交派
- テーマカラー: コーンフラワーブルー / サニーイエロー
- 小物: スマートフォン・グループチャット画面・明るいドリンク・笑顔のステッカー
- 表情・ポーズ: 大きな笑顔・両手を広げた開放的なポーズ
- 服装: トレンドを取り入れた明るいカジュアル
- 背景: にぎやかなパーティ・グループカフェ・明るいオープンスペース

**【男性版プロンプト（EN）】**
```
Modern Japanese youth anime / light-novel illustration, semi-realistic anime art style, natural 6-7 head proportion, high-school to college-aged character, soft cel-shading with gentle gradients and subtle light bloom, clean delicate line art, bright fresh airy color palette, sparkle and soft bokeh accents, youthful friendly expressive face, polished anime finish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; SNS-ready; unified consistent illustration style across the entire collection, || male, trendy bright casual outfit in cornflower-blue with sunny yellow accents, wide open cheerful smile, open arms welcoming pose, holding a phone with chat app, lively group cafe or party background
```

**【女性版プロンプト（EN）】**
```
Modern Japanese youth anime / light-novel illustration, semi-realistic anime art style, natural 6-7 head proportion, high-school to college-aged character, soft cel-shading with gentle gradients and subtle light bloom, clean delicate line art, bright fresh airy color palette, sparkle and soft bokeh accents, youthful friendly expressive face, polished anime finish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; SNS-ready; unified consistent illustration style across the entire collection, || female, bright trendy casual in cornflower-blue and sunny yellow, sparkling cheerful smile, open welcoming gesture, holding phone showing group chat, vibrant social space background
```

---

### B-focused / 集中B型（自分の世界に深く没入する職人気質タイプ）

- 性格要約: B型の中でも興味領域への集中力が際立つ職人型。一人で深く没入し専門性を磨く内向志向
- テーマカラー: ミッドナイトブルー / シルバーグレー
- 小物: 専門書・デジタルタブレット（細かいイラスト画面）・ヘッドフォン・集中用デスク
- 表情・ポーズ: 真剣な集中顔・前かがみで作業に没頭しているポーズ
- 服装: シンプルなモノトーン・機能的な服
- 背景: 暗めの作業部屋・専門ワークスペース・夜の窓

**【男性版プロンプト（EN）】**
```
Modern Japanese youth anime / light-novel illustration, semi-realistic anime art style, natural 6-7 head proportion, high-school to college-aged character, soft cel-shading with gentle gradients and subtle light bloom, clean delicate line art, bright fresh airy color palette, sparkle and soft bokeh accents, youthful friendly expressive face, polished anime finish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; SNS-ready; unified consistent illustration style across the entire collection, || male, simple monochrome outfit in midnight-blue and silver-grey, intensely focused expression, leaning over digital tablet drawing intricate artwork, large headphones on, specialized dark workshop background with night window glow
```

**【女性版プロンプト（EN）】**
```
Modern Japanese youth anime / light-novel illustration, semi-realistic anime art style, natural 6-7 head proportion, high-school to college-aged character, soft cel-shading with gentle gradients and subtle light bloom, clean delicate line art, bright fresh airy color palette, sparkle and soft bokeh accents, youthful friendly expressive face, polished anime finish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; SNS-ready; unified consistent illustration style across the entire collection, || female, minimalist outfit in midnight-blue and silver, deeply focused expression, bent over detailed artwork on tablet, large wireless headphones, personal dark creative workspace with soft night light
```

---

## O型グループ（テーマ: バーントオレンジ〜テラコッタ系）

---

### O-typical / 典型O型（社交的でおおらか、人を引っ張るリーダータイプ）

- 性格要約: O型の社交性・おおらかさ・行動力が最もよく表れた標準型。自然とリーダー的立ち位置になる
- テーマカラー: バーントオレンジ / サンシャインイエロー
- 小物: スポーツバッグ・旗・チームグッズ・サインペン
- 表情・ポーズ: 大きな笑顔・拳を上げた活気あるポーズ・前に踏み出す姿
- 服装: スポーティ×カジュアル・明るいオレンジ系
- 背景: 運動場・オープンフィールド・元気な青空

**【男性版プロンプト（EN）】**
```
Modern Japanese youth anime / light-novel illustration, semi-realistic anime art style, natural 6-7 head proportion, high-school to college-aged character, soft cel-shading with gentle gradients and subtle light bloom, clean delicate line art, bright fresh airy color palette, sparkle and soft bokeh accents, youthful friendly expressive face, polished anime finish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; SNS-ready; unified consistent illustration style across the entire collection, || male, sporty casual outfit in burnt-orange and sunshine-yellow, big wide confident grin, fist raised in energetic leader pose, stepping forward, sports bag and team flag, outdoor sunny field background
```

**【女性版プロンプト（EN）】**
```
Modern Japanese youth anime / light-novel illustration, semi-realistic anime art style, natural 6-7 head proportion, high-school to college-aged character, soft cel-shading with gentle gradients and subtle light bloom, clean delicate line art, bright fresh airy color palette, sparkle and soft bokeh accents, youthful friendly expressive face, polished anime finish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; SNS-ready; unified consistent illustration style across the entire collection, || female, energetic sporty casual in burnt-orange and yellow, bright confident smile, forward-stepping leadership pose, holding team flag, sunny outdoor background with clear blue sky
```

---

### O-gentle / 温和O型（協調性と包容力を持つ縁の下の支援タイプ）

- 性格要約: O型のおおらかさを持ちながら協調・支援志向が特に強い型。縁の下の力持ちとして人の信頼を集める
- テーマカラー: テラコッタ / ミルクホワイト
- 小物: 温かい飲み物・花束・ノート（誰かのメモ）・エプロン
- 表情・ポーズ: 柔らかい包容力のある微笑み・両手を前に差し出すようなポーズ
- 服装: 温かみのあるナチュラル系・エプロンや柔らかいニット
- 背景: カフェキッチン・コミュニティスペース・温かいインテリア

**【男性版プロンプト（EN）】**
```
Modern Japanese youth anime / light-novel illustration, semi-realistic anime art style, natural 6-7 head proportion, high-school to college-aged character, soft cel-shading with gentle gradients and subtle light bloom, clean delicate line art, bright fresh airy color palette, sparkle and soft bokeh accents, youthful friendly expressive face, polished anime finish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; SNS-ready; unified consistent illustration style across the entire collection, || male, warm natural casual outfit with terracotta apron, gentle warm smile, both hands extended offering posture holding warm mug and small flower, cozy cafe kitchen background in terracotta and milk-white palette
```

**【女性版プロンプト（EN）】**
```
Modern Japanese youth anime / light-novel illustration, semi-realistic anime art style, natural 6-7 head proportion, high-school to college-aged character, soft cel-shading with gentle gradients and subtle light bloom, clean delicate line art, bright fresh airy color palette, sparkle and soft bokeh accents, youthful friendly expressive face, polished anime finish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; SNS-ready; unified consistent illustration style across the entire collection, || female, soft natural knit outfit with terracotta tones, nurturing gentle smile, hands offering warm cup and small bouquet, warm community kitchen or cozy living space background
```

---

### O-explorer / 探究O型（独立心と知的好奇心で自分の道を切り拓くタイプ）

- 性格要約: O型のおおらかさ・行動力を持ちながら独立心と知的探求心が強い型。自分の道を切り拓く独自派
- テーマカラー: バーミリオン / ディープティール
- 小物: 地図・双眼鏡・リュックサック・ノートパソコン・羅針盤
- 表情・ポーズ: 知的で前向きな表情・地図や遠くを見つめるポーズ
- 服装: アウトドア×知的カジュアル・フィールドジャケット
- 背景: 山の頂上・図書館と自然の混合・研究フィールド

**【男性版プロンプト（EN）】**
```
Modern Japanese youth anime / light-novel illustration, semi-realistic anime art style, natural 6-7 head proportion, high-school to college-aged character, soft cel-shading with gentle gradients and subtle light bloom, clean delicate line art, bright fresh airy color palette, sparkle and soft bokeh accents, youthful friendly expressive face, polished anime finish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; SNS-ready; unified consistent illustration style across the entire collection, || male, field explorer jacket in vermilion and deep teal, intelligent determined expression, gazing into distance holding a map and compass, backpack with laptop, mountain summit or field research background
```

**【女性版プロンプト（EN）】**
```
Modern Japanese youth anime / light-novel illustration, semi-realistic anime art style, natural 6-7 head proportion, high-school to college-aged character, soft cel-shading with gentle gradients and subtle light bloom, clean delicate line art, bright fresh airy color palette, sparkle and soft bokeh accents, youthful friendly expressive face, polished anime finish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; SNS-ready; unified consistent illustration style across the entire collection, || female, smart field explorer outfit in vermilion and teal, curious determined expression, holding map and binoculars, backpack with research notes, outdoor panoramic or library-nature hybrid background
```

---

## AB型グループ（テーマ: ディープパープル〜インディゴ系）

---

### AB-typical / 典型AB型（合理性と独創性を兼ね備えた二面性の分析家タイプ）

- 性格要約: AB型の合理・独創・二面性が最もよく表れた標準型。論理と感性を状況で切り替えるカメレオン的知性派
- テーマカラー: ディープパープル / シルバー
- 小物: タブレット（論文とスケッチの両画面）・万年筆・メガネ
- 表情・ポーズ: 冷静かつ思索的な表情・少し首を傾けた謎めいたポーズ
- 服装: シンプルだが個性的なデザイン・パープル×シルバー系
- 背景: 実験室と画廊の中間・知的空間

**【男性版プロンプト（EN）】**
```
Modern Japanese youth anime / light-novel illustration, semi-realistic anime art style, natural 6-7 head proportion, high-school to college-aged character, soft cel-shading with gentle gradients and subtle light bloom, clean delicate line art, bright fresh airy color palette, sparkle and soft bokeh accents, youthful friendly expressive face, polished anime finish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; SNS-ready; unified consistent illustration style across the entire collection, || male, sleek distinctive outfit in deep-purple and silver, calm enigmatic expression with slight head tilt, holding tablet showing both data charts and artistic sketch, glasses, intellectual gallery-lab hybrid background
```

**【女性版プロンプト（EN）】**
```
Modern Japanese youth anime / light-novel illustration, semi-realistic anime art style, natural 6-7 head proportion, high-school to college-aged character, soft cel-shading with gentle gradients and subtle light bloom, clean delicate line art, bright fresh airy color palette, sparkle and soft bokeh accents, youthful friendly expressive face, polished anime finish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; SNS-ready; unified consistent illustration style across the entire collection, || female, elegant distinctive outfit in deep-purple and silver accents, calm intelligent gaze with slight head tilt, holding dual-screen tablet showing code and art, gallery-research space background with intellectual atmosphere
```

---

### AB-empathy / 共感AB型（情緒的な感受性と合理性を組み合わせる感性派タイプ）

- 性格要約: AB型の合理性を持ちながら情緒的感受性・共感力が特に強い型。芸術・感性・他者の気持ちへの鋭いアンテナを持つ
- テーマカラー: バイオレット / ローズゴールド
- 小物: 音楽プレーヤー・詩集・水彩パレット・ヘッドフォン
- 表情・ポーズ: 感受性豊かな柔らかい表情・アーティスティックなポーズ
- 服装: 感性的でロマンチックなファッション・バイオレット×ゴールド
- 背景: アートスタジオ・音楽室・夕日の差し込む窓辺

**【男性版プロンプト（EN）】**
```
Modern Japanese youth anime / light-novel illustration, semi-realistic anime art style, natural 6-7 head proportion, high-school to college-aged character, soft cel-shading with gentle gradients and subtle light bloom, clean delicate line art, bright fresh airy color palette, sparkle and soft bokeh accents, youthful friendly expressive face, polished anime finish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; SNS-ready; unified consistent illustration style across the entire collection, || male, romantic artistic outfit in violet and rose-gold accents, sensitive gentle expression, seated with music player and poetry book, watercolor palette nearby, art studio or music room with warm sunset light through window
```

**【女性版プロンプト（EN）】**
```
Modern Japanese youth anime / light-novel illustration, semi-realistic anime art style, natural 6-7 head proportion, high-school to college-aged character, soft cel-shading with gentle gradients and subtle light bloom, clean delicate line art, bright fresh airy color palette, sparkle and soft bokeh accents, youthful friendly expressive face, polished anime finish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; SNS-ready; unified consistent illustration style across the entire collection, || female, romantic artistic outfit in violet with rose-gold jewelry, soft expressive sensitive face, holding poetry book and watercolor brush, music in background, art studio with warm golden-violet sunset ambiance
```

---

### AB-analyst / 分析AB型（論理と客観性で物事を整理する冷静な知性派タイプ）

- 性格要約: AB型の中でも論理的・分析的思考が際立つ型。感情より事実とデータを重視する冷静な知性派
- テーマカラー: インディゴ / アイスブルー
- 小物: データグラフの書類・ノートPC・コーヒー・メカニカルキーボード
- 表情・ポーズ: 鋭く冷静な知的表情・腕組みまたはデータを分析するポーズ
- 服装: クリーンなインディゴ×アイスブルーの清潔感あるスタイル
- 背景: データセンター風・暗めのコードルーム・清潔なラボ

**【男性版プロンプト（EN）】**
```
Modern Japanese youth anime / light-novel illustration, semi-realistic anime art style, natural 6-7 head proportion, high-school to college-aged character, soft cel-shading with gentle gradients and subtle light bloom, clean delicate line art, bright fresh airy color palette, sparkle and soft bokeh accents, youthful friendly expressive face, polished anime finish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; SNS-ready; unified consistent illustration style across the entire collection, || male, clean sharp outfit in indigo and ice-blue, calm analytical cool expression, arms crossed or finger on chin analyzing data on screen, laptop with graphs, clean dark lab or data-center inspired background
```

**【女性版プロンプト（EN）】**
```
Modern Japanese youth anime / light-novel illustration, semi-realistic anime art style, natural 6-7 head proportion, high-school to college-aged character, soft cel-shading with gentle gradients and subtle light bloom, clean delicate line art, bright fresh airy color palette, sparkle and soft bokeh accents, youthful friendly expressive face, polished anime finish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; SNS-ready; unified consistent illustration style across the entire collection, || female, sleek precise outfit in indigo and ice-blue, calm sharp analytical gaze, standing before data visualization screen with focused pose, clean modern lab background with cool blue-indigo lighting
```

---

## 発注時チェックリスト

- [ ] 共通スタイルプレフィックス（CHARACTER_PROMPTS_外注用.md 記載のEN文）を各プロンプト冒頭に付与
- [ ] 共通ネガティブプロンプトを各プロンプト末尾に付与
- [ ] 出力サイズ: 1024×1024 px 以上（SNS対応）
- [ ] 形式: WebP（既存ルールに準拠）
- [ ] 保存パス: `public/img/character/blood-{タイプID}-{male|female}.webp`
  - 例: `blood-a-typical-male.webp` / `blood-ab-analyst-female.webp`
- [ ] 占い・神秘主義・ブラハラ連想演出がないことを確認
- [ ] 既存168体との画風統一を確認
