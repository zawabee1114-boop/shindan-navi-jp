# 診断ナビ キャラクター画像生成プロンプト集（外注用・192体）

診断ナビ（shindan-navi.jp）の全96タイプ × 男女2版 ＝ **192体** の画像生成プロンプト。
Midjourney / Adobe Firefly / Google Imagen / ChatGPT 等にそのまま使用できます。

> 使い方: 各キャラの【男性版】【女性版】プロンプトを、下記の「共通スタイルプレフィックス」＋個別差分＋「共通ネガティブ」を結合して画像生成AIに投入してください。

---

## 共通スタイル定義（全192体で統一・一貫性の核）

### 実生成時の優先順位（重要）

1. Big5動物は、このファイル内の古い個別プロンプトではなく、必ず `BIG5_IMAGE_GENERATION_PROMPTS_完全動物版.md` を使う。
2. Big5以外は `CHARACTER_DESIGN_MASTER_外注用.md` のタイプ設定を最優先し、このファイルの共通スタイル・サイズ・ネガティブを結合して生成する。
3. このファイル内の個別プロンプトに古い表現が残っている場合は、上位ルールを優先する。特に「高校生」「ライトノベル」「夜景」「複雑背景」「同じ小物の使い回し」は避ける。
4. 画像は生成後に必ず `1024x1024`、余白、手足/小物破綻、文字混入、キャラ被りをチェックする。

### ブランドコンセプト
全192体は「同一ブランドのキャラクターコレクション」として統一された画風を持つこと。
画風は **診断ナビ参考画像に合わせた、Web診断向けの明るい現代日本アニメ立ち絵**。幼めの大学生くらいの年齢感で、子供化・少女漫画化・乙女ゲーム化・3頭身チビ・マスコット・フラットベクターは使わない。
各タイプの性格を、外見・服装・表情・ポーズ・小物で表現。男女版は同じ性格テーマを共有しつつ、顔立ち・髪型/体毛や羽毛の見え方・体格・衣装シルエット・表情・ポーズ・小物の持ち方・構図を必ず描き分ける。

### 共通スタイルプレフィックス（EN・全プロンプト冒頭に付与）
```
Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection,
```

### 共通ネガティブプロンプト（EN・全プロンプト末尾に付与）
```
chibi, super-deformed, 2-3 head ratio, mascot, flat vector style, photorealistic, 3D render, dark, horror, occult, astrology mysticism, fortune-telling, real brand logos, watermark, in-image text, uncanny valley, gritty texture, cluttered background
```

### 画像サイズ・余白ルール（サイト実装用）

- 生成時は必ず `1:1 square composition` を指定する。
- 納品サイズは全キャラ共通で `1024x1024 PNG` を標準にする。必要に応じてサイト側でWebP化する。
- キャラ本体はキャンバスの中央に収め、外接サイズはキャンバスの約80〜90%にする。頭・耳・尻尾・翼・足先を切らない。
- 背景は白〜ごく薄いパステル。複雑な背景、床面、濃いグラデーションは禁止。
- 縦長・横長で生成された場合は、トリミングではなく余白追加で正方形化する。
### 横断キャラクター差別化ルール（必須）

- 年齢感は「幼児化」ではなく、幼めの大学生。5頭身以下・子供体型・マスコット顔は禁止。標準は6〜6.5頭身、参考画像のような若いWeb診断キャラにする。
- 少女漫画・乙女ゲーム風に寄せすぎない。長すぎる首、細すぎる顎、過度なまつ毛、過剰な艶髪、フォーマルすぎる衣装は避ける。
- ただし2枚目テストのような低年齢化も避ける。1枚目テストの年齢感・等身を基準に、背景と装飾だけ軽くする。
- 画像生成前に必ず設計マスター `CHARACTER_DESIGN_MASTER_外注用.md` の該当タイプ設定を優先する。
- 同じ診断内でも男女版は、顔立ち、髪型/体毛や羽毛、髪色/体色、体格、衣装シルエット、表情、ポーズ、構図、小物の持ち方を必ず変える。
- 似やすい小物は使用レーンを分ける: 計画/戦略は盤面・指揮棒・条件カード・登るシルエット、記録/チェックは手帳・ルーペ・監査ファイル・書類トレー、癒し/支援はケアポーチ・休憩クッション・蟹爪/甲羅・ティーマグ・傘・植物に分ける。
- カップ、ノート、マイク、タブレット、カメラ、花束、メガネを安易に使い回さない。使う場合は診断タイプの個性と一致する理由がある場合のみ。
- 同じ「明るいまとめ役」「静かな分析役」「優しい支援役」「自由な冒険役」でも、服装ジャンルと構図を変える。例: ENFPは旗で跳ねる、DiSC iはメガホンで開く、O-typicalは迎える、ムードメーカーはクラッカーで中心に立つ。
- 星座は人間キャラの動物/記号コスプレ、Big5は完全な動物キャラクター。両者を混ぜない。
### Big5動物専用スタイル補足（完全動物キャラクター）
Big5動物16タイプは、人間キャラクターに耳や尻尾を付ける表現でも、二足歩行の擬人化動物でもなく、**完全な動物キャラクター**として生成する。

- 必須: complete animal character / natural animal anatomy / species-accurate body / animal head and animal face / no human body / no human face / no human hair
- 体型: 四足動物は自然な四足、鳥は翼と脚、イルカは水中の体型、タコは8本触腕。人間の腕・手・脚へ置き換えない。
- 表情: 動物顔のまま、目・耳・口元・姿勢・尻尾・翼・触腕の動きで性格を表現する。
- 男女差分: 人間的な性別記号に頼らず、体格、毛色/羽色の濃淡、目元、首元の小さなチャーム、姿勢で差分を出す。
- 服装: 原則として服を着せない。必要な場合も小さな首輪、チャーム、リボン、足元小物、背景記号程度に限定する。
- 禁止: anthropomorphic humanoid body, humanoid pose, human hands, human legs, human clothes, human with animal ears, kemonomimi, animal mask, plush toy, mascot, chibi, realistic wildlife photo

Big5動物用の生成プロンプトでは、共通スタイルのあとに必ず以下の方針を追加する:
`complete animal character, natural animal anatomy, species-accurate body, animal head and animal face, no human body, no human face, no human hair, not anthropomorphic humanoid, not a human wearing animal costume, polished cute anime-style animal illustration for a Japanese web diagnosis app`

### 禁止事項（全192体共通・厳守）
- 占い・神秘主義・オカルト演出（星座も「性格分類のみ＝personality classification only」として擬人化）
- 写実/フォトリアル・3DCG・3頭身チビ・マスコット・フラットベクター
- 暗い/怖い/不気味な雰囲気・実在ブランドロゴ・画像内テキスト・透かし
- YMYL的な医療/疾患を連想させる表現

---

## 診断別カウント（合計192体）

| 診断 | タイプ | 男女 | 計 |
|---|---:|---|---:|
| MBTI | 16 | ×2 | 32 |
| Big5動物 | 16 | ×2 | 32 |
| 星座 | 12 | ×2 | 24 |
| 多重知能 | 8 | ×2 | 16 |
| 恋愛スタイル | 6 | ×2 | 12 |
| 友達相性 | 6 | ×2 | 12 |
| DiSC | 4 | ×2 | 8 |
| 完璧主義 | 4 | ×2 | 8 |
| 金銭感覚 | 4 | ×2 | 8 |
| 恋愛依存 | 4 | ×2 | 8 |
| 血液型 | 4 | ×2 | 8 |
| **血液型サブタイプ（追加）** | **12** | **×2** | **24** |
| **合計** | **96** | **×2** | **192** |

> 恋愛依存はコードにデータ未実装のため愛着理論（Bowlby/Ainsworth）ベースで設計。実装時に細部調整。

---

### MBTI - INTJ 建築家（戦略家）

- 性格要約: 長期視点で戦略を立案する孤高の設計者。内向的直観（Ni）×外向的思考（Te）で高い自律性と分析力を発揮する知的クール型。
- テーマカラー: ディープパープル / ミッドナイトブルー
- 小物: 分厚い専門書・設計図・万年筆・黒縁メガネ
- 表情: 静かで鋭い目つき・冷静で自信ある表情
- ポーズ: 窓辺で腕を組み遠くを見据える / 机に向かい設計図を広げている

【男性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, young male university student, tall slim build, sharp calm dark eyes, black-framed glasses, deep purple and midnight blue color scheme, wearing a neat dark navy blazer over a white shirt, holding an open thick textbook with detailed notes, standing by a large window arms crossed gazing into the distance with a quiet confident expression, subtle pale abstract bokeh behind, cool intellectual atmosphere, deep purple sparkle accents; negative: chibi, super-deformed, 2-3 head ratio, mascot, flat vector style, photorealistic, 3D render, dark, horror, occult, astrology mysticism, fortune-telling, real brand logos, watermark, in-image text, uncanny valley, gritty texture, cluttered background`

【女性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, feyoung male university student, slender composed figure, sharp calm dark eyes, black-framed glasses, straight dark hair neatly tied back, deep purple and midnight blue color scheme, wearing a sophisticated dark blazer with a silver brooch, seated at a desk with open architectural blueprints and a fountain pen, quiet confident expression gazing slightly upward, cool intellectual atmosphere, deep purple sparkle accents and soft pale UI glow; negative: chibi, super-deformed, 2-3 head ratio, mascot, flat vector style, photorealistic, 3D render, dark, horror, occult, astrology mysticism, fortune-telling, real brand logos, watermark, in-image text, uncanny valley, gritty texture, cluttered background`

---


### MBTI - INTP 論理学者（思想家）

- 性格要約: 論理的整合性を愛する内向的思索者。内向的思考（Ti）×外向的直観（Ne）で多角的な理論構築と好奇心旺盛な探求を行う。
- テーマカラー: スレートブルー / ソフトグレー
- 小物: ノートPC・付箋だらけのノート・コーヒーカップ・イヤフォン
- 表情: 遠くを見ているような思索顔・口元に笑みが浮かぶ
- ポーズ: 床に座り本や資料に囲まれている / あごに手を当てて考え込む

【男性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, young male university student, lean slightly disheveled look, slate blue and soft grey color scheme, wavy or tousled light brown hair, wearing a casual grey hoodie and jeans, sitting cross-legged on the floor surrounded by open notebooks covered in sticky notes and an open laptop, one hand on chin in deep thought, a coffee cup nearby, soft curious smile, airy dreamy bokeh background in cool blue tones, gentle sparkle around the books; negative: chibi, super-deformed, 2-3 head ratio, mascot, flat vector style, photorealistic, 3D render, dark, horror, occult, astrology mysticism, fortune-telling, real brand logos, watermark, in-image text, uncanny valley, gritty texture, cluttered background`

【女性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, feyoung male university student, slim slightly casual appearance, slate blue and soft grey color scheme, loose wavy hair with a simple clip, wearing an oversized light grey knit sweater and slim pants, sitting at a desk with multiple open books and sticky notes, earphones around her neck, resting chin on one hand with a thoughtful distant expression and soft smile, cool blue bokeh background, gentle sparkle accents; negative: chibi, super-deformed, 2-3 head ratio, mascot, flat vector style, photorealistic, 3D render, dark, horror, occult, astrology mysticism, fortune-telling, real brand logos, watermark, in-image text, uncanny valley, gritty texture, cluttered background`

---


### MBTI - ENTJ 指揮官（統率者）

- 性格要約: 生まれながらのリーダー。外向的思考（Te）×内向的直観（Ni）で組織を牽引し、高い目標に向けてチームを動かす。
- テーマカラー: ロイヤルブルー / ゴールド
- 小物: 手帳・プレゼン資料・時計・マイク
- 表情: 力強い眼差し・自信と情熱に満ちた表情
- ポーズ: 前に踏み出して指差すリーダーポーズ / ステージで発表している

【男性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, young male university student, tall confident athletic build, royal blue and gold color scheme, sharp dark eyes full of determination, neatly combed dark hair, wearing a crisp blue dress shirt with sleeves rolled up and a loosened tie, standing forward with one hand pointing ahead in a leadership pose, holding a presentation folder, bold confident expression, golden sparkle accents, energetic dynamic atmosphere; negative: chibi, super-deformed, 2-3 head ratio, mascot, flat vector style, photorealistic, 3D render, dark, horror, occult, astrology mysticism, fortune-telling, real brand logos, watermark, in-image text, uncanny valley, gritty texture, cluttered background`

【女性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, feyoung male university student, tall poised confident figure, royal blue and gold color scheme, sharp determined dark eyes, straight glossy dark hair with a professional clip, wearing an elegant navy blazer with gold buttons and a white blouse, standing with one hand on hip and the other holding a microphone or presentation folder, powerful confident expression, golden sparkle accents, dynamic leadership atmosphere; negative: chibi, super-deformed, 2-3 head ratio, mascot, flat vector style, photorealistic, 3D render, dark, horror, occult, astrology mysticism, fortune-telling, real brand logos, watermark, in-image text, uncanny valley, gritty texture, cluttered background`

---


### MBTI - ENTP 討論者（発明家）

- 性格要約: 革新的アイデアと知的議論を愛する発明家。外向的直観（Ne）×内向的思考（Ti）で常識を覆すアイデアを次々と発信する。
- テーマカラー: ブライトオレンジ / イエロー
- 小物: ホワイトボード（アイデアメモ）・スマートフォン・コーヒー
- 表情: キラキラした目・楽しそうな笑顔・ちょっと挑戦的な表情
- ポーズ: ホワイトボードに何か書きながら振り返って笑う / 身振り手振りで話す

【男性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, young male university student, energetic lively build, bright orange and yellow color scheme, sparkling curious eyes, messy expressive hair, wearing a casual graphic t-shirt under an open flannel overshirt and jeans, turning from a whiteboard full of idea sketches with a wide grin and a raised hand mid-gesture, lighthearted playful expression, bright orange and yellow sparkle accents, dynamic idea-burst atmosphere; negative: chibi, super-deformed, 2-3 head ratio, mascot, flat vector style, photorealistic, 3D render, dark, horror, occult, astrology mysticism, fortune-telling, real brand logos, watermark, in-image text, uncanny valley, gritty texture, cluttered background`

【女性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, feyoung male university student, energetic lively figure, bright orange and yellow color scheme, sparkling clever eyes, wavy hair tied loosely with a colorful scrunchie, wearing a bright yellow cropped sweater and wide-leg pants, gesturing animatedly with both hands while smiling broadly, a whiteboard with ideas sketched behind her, vibrant playful expression, orange and yellow sparkle accents, cheerful idea-burst atmosphere; negative: chibi, super-deformed, 2-3 head ratio, mascot, flat vector style, photorealistic, 3D render, dark, horror, occult, astrology mysticism, fortune-telling, real brand logos, watermark, in-image text, uncanny valley, gritty texture, cluttered background`

---


### MBTI - INFJ 提唱者（洞察者）

- 性格要約: 人類の可能性を信じる希少な洞察者。内向的直観（Ni）×外向的感情（Fe）で他者の深層を読み取り、使命感を持って導く。
- テーマカラー: ミステリアスパープル / ソフトゴールド
- 小物: 日記・羽根ペン・月明かりの本棚・ハーブティー
- 表情: 深く穏やかな眼差し・静かな微笑み
- ポーズ: 窓辺で日記を書いている / 本を胸に抱えて遠くを見ている

【男性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, young male university student, slender gentle build, mysterious purple and soft gold color scheme, deep calm dark eyes with a knowing gaze, soft dark hair slightly falling over forehead, wearing a soft purple cardigan over a white shirt, sitting by a moonlit window writing in a leather journal with a feather pen, a cup of herbal tea nearby, serene thoughtful expression with a quiet smile, gentle gold sparkle and moonlight bloom accents; negative: chibi, super-deformed, 2-3 head ratio, mascot, flat vector style, photorealistic, 3D render, dark, horror, occult, astrology mysticism, fortune-telling, real brand logos, watermark, in-image text, uncanny valley, gritty texture, cluttered background`

【女性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, feyoung male university student, slender graceful figure, mysterious purple and soft gold color scheme, deep serene dark eyes, long dark hair with a few strands framing the face, wearing a flowing dusty-purple dress with delicate lace detail, standing by a moonlit bookshelf holding a book to her chest and gazing softly into the distance, gentle gold sparkle and moonlight bloom accents, ethereal quiet atmosphere; negative: chibi, super-deformed, 2-3 head ratio, mascot, flat vector style, photorealistic, 3D render, dark, horror, occult, astrology mysticism, fortune-telling, real brand logos, watermark, in-image text, uncanny valley, gritty texture, cluttered background`

---


### MBTI - INFP 仲介者（詩人）

- 性格要約: 内なる価値観と共感力を持つ詩人。内向的感情（Fi）×外向的直観（Ne）で豊かな創造力と理想への深いコミットを持つ。
- テーマカラー: ソフトピンク / ラベンダー
- 小物: スケッチブック・水彩画具・押し花・ヘッドフォン
- 表情: 夢見るような表情・穏やかで優しい笑顔
- ポーズ: 野原でスケッチブックに絵を描いている / ヘッドフォンをして目を閉じている

【男性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, young male university student, slim dreamy gentle build, soft pink and lavender color scheme, warm brown gentle eyes, soft wavy light brown hair, wearing a loose pastel pink shirt and light trousers, sitting in a sunny meadow sketching in a large sketchbook with watercolor paint smudges on his fingers, a pressed flower tucked behind his ear, soft dreamy expression with a gentle smile, pink and lavender sparkle petal accents, airy poetic atmosphere; negative: chibi, super-deformed, 2-3 head ratio, mascot, flat vector style, photorealistic, 3D render, dark, horror, occult, astrology mysticism, fortune-telling, real brand logos, watermark, in-image text, uncanny valley, gritty texture, cluttered background`

【女性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, feyoung male university student, slender delicate dreamy figure, soft pink and lavender color scheme, warm gentle eyes, long wavy light hair adorned with small flower clips, wearing a flowy lavender sundress, sitting in a sunny meadow with a watercolor sketchbook open on her lap, paintbrush in hand, a serene dreamy expression with a soft smile, pink and lavender sparkle and petal bloom accents, poetic airy atmosphere; negative: chibi, super-deformed, 2-3 head ratio, mascot, flat vector style, photorealistic, 3D render, dark, horror, occult, astrology mysticism, fortune-telling, real brand logos, watermark, in-image text, uncanny valley, gritty texture, cluttered background`

---


### MBTI - ENFJ 主人公（教師）

- 性格要約: 他者の成長を導くカリスマリーダー。外向的感情（Fe）×内向的直観（Ni）でグループを鼓舞し、人の可能性を引き出す。
- テーマカラー: サンフラワーゴールド / ウォームオレンジ
- 小物: マイク・グループ写真・スターバッジ・議事録
- 表情: 情熱的な笑顔・みんなを包み込む温かい眼差し
- ポーズ: 両手を広げてみんなを迎え入れるポーズ / 熱く語りかけている

【男性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, young male university student, tall warm charismatic build, sunflower gold and warm orange color scheme, bright passionate warm brown eyes, neatly styled dark hair, wearing a warm golden-yellow blazer over a white shirt, standing with both arms open wide in a welcoming gesture, radiant passionate smile, holding a small star badge, golden sparkle and sun-ray accents, warm inspiring atmosphere; negative: chibi, super-deformed, 2-3 head ratio, mascot, flat vector style, photorealistic, 3D render, dark, horror, occult, astrology mysticism, fortune-telling, real brand logos, watermark, in-image text, uncanny valley, gritty texture, cluttered background`

【女性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, feyoung male university student, tall graceful charismatic figure, sunflower gold and warm orange color scheme, bright passionate warm eyes, flowing golden-brown hair in a half-updo with a sunflower hairpin, wearing a warm golden blouse with an orange accent scarf, standing confidently with a radiant open smile and arms extended in a welcoming embrace gesture, golden sparkle and sun-ray accents, warm inspiring uplifting atmosphere; negative: chibi, super-deformed, 2-3 head ratio, mascot, flat vector style, photorealistic, 3D render, dark, horror, occult, astrology mysticism, fortune-telling, real brand logos, watermark, in-image text, uncanny valley, gritty texture, cluttered background`

---


### MBTI - ENFP 広報運動家（情熱家）

- 性格要約: 人の可能性を信じる情熱的な運動家。外向的直観（Ne）×内向的感情（Fi）で感染力のある熱意と深い共感で周囲を鼓舞する。
- テーマカラー: コーラルピンク / スカイブルー
- 小物: カラフルなバルーン・カメラ・ポスター
- 表情: 全開の笑顔・キラキラした瞳・弾けるような明るさ
- ポーズ: ジャンプしている / 両手でカメラを持って撮影

【男性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, young male university student, energetic athletic cheerful build, coral pink and sky blue color scheme, sparkling warm brown eyes brimming with excitement, light wavy hair, wearing a colorful graphic tee, open jacket in sky blue and coral chino pants, mid-air jumping pose with a huge bright smile and arms raised, colorful bokeh balloons floating in background, vibrant coral and sky blue sparkle confetti accents, joyful bubbly atmosphere; negative: chibi, super-deformed, 2-3 head ratio, mascot, flat vector style, photorealistic, 3D render, dark, horror, occult, astrology mysticism, fortune-telling, real brand logos, watermark, in-image text, uncanny valley, gritty texture, cluttered background`

【女性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, feyoung male university student, energetic lively cheerful figure, coral pink and sky blue color scheme, sparkling bright eyes full of joy, curly or wavy hair with colorful hair ties, wearing a coral pink flared top and light blue wide-leg pants, mid-air jumping pose with a brilliant wide smile, one hand holding a colorful camera, colorful bokeh balloons in background, coral and sky blue sparkle confetti accents, joyful bubbly atmosphere; negative: chibi, super-deformed, 2-3 head ratio, mascot, flat vector style, photorealistic, 3D render, dark, horror, occult, astrology mysticism, fortune-telling, real brand logos, watermark, in-image text, uncanny valley, gritty texture, cluttered background`

---


### MBTI - ISTJ 管理者（検査官）

- 性格要約: 責任感と信頼性の守護者。内向的感覚（Si）×外向的思考（Te）で確立された手順を着実に実行し、組織の基盤を支える堅実型。
- テーマカラー: ネイビーブルー / ストーングレー
- 小物: チェックリスト・印鑑・手帳・定規
- 表情: 真剣な表情・誠実さがにじむ穏やかな眼差し
- ポーズ: チェックリストを確認している / 書類を整理している

【男性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, young male university student, sturdy reliable build, navy blue and stone grey color scheme, steady honest dark eyes, neatly combed short dark hair, wearing a crisp navy school uniform or button-down shirt with a tie, standing at a desk carefully checking items off a detailed clipboard checklist with a ruler nearby, earnest focused expression, navy and silver sparkle accents, orderly dependable atmosphere; negative: chibi, super-deformed, 2-3 head ratio, mascot, flat vector style, photorealistic, 3D render, dark, horror, occult, astrology mysticism, fortune-telling, real brand logos, watermark, in-image text, uncanny valley, gritty texture, cluttered background`

【女性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, feyoung male university student, composed reliable figure, navy blue and stone grey color scheme, steady earnest dark eyes, neat dark hair in a tidy bun or low ponytail, wearing a crisp navy blazer with a subtle grey plaid skirt and white blouse, seated at a perfectly organized desk carefully going through a detailed checklist with a pen, a neatly stacked folder beside her, earnest focused expression, navy and silver sparkle accents, orderly dependable atmosphere; negative: chibi, super-deformed, 2-3 head ratio, mascot, flat vector style, photorealistic, 3D render, dark, horror, occult, astrology mysticism, fortune-telling, real brand logos, watermark, in-image text, uncanny valley, gritty texture, cluttered background`

---


### MBTI - ISFJ 擁護者（保護者）

- 性格要約: 縁の下の力持ちの献身的守護者。内向的感覚（Si）×外向的感情（Fe）で大切な人のニーズを細かく覚えて応える温かさの塊。
- テーマカラー: ミントグリーン / ウォームクリーム
- 小物: ハーブ・手作りクッキー・かわいい手帳・エプロン
- 表情: 温かく優しい微笑み・安心させる穏やかな眼差し
- ポーズ: 両手にクッキーを持って差し出している / 植物に水やりをしている

【男性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, young male university student, gentle warm reliable build, mint green and warm cream color scheme, soft warm brown eyes with a reassuring gaze, neatly parted light brown hair, wearing a cozy mint-green apron over a cream button-up shirt, holding out a plate of homemade cookies with both hands and a warm gentle smile, soft herb plants and a tidy kitchen visible in background, mint green and cream sparkle accents, nurturing cozy atmosphere; negative: chibi, super-deformed, 2-3 head ratio, mascot, flat vector style, photorealistic, 3D render, dark, horror, occult, astrology mysticism, fortune-telling, real brand logos, watermark, in-image text, uncanny valley, gritty texture, cluttered background`

【女性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, feyoung male university student, gentle warm nurturing figure, mint green and warm cream color scheme, soft warm eyes with a reassuring tender gaze, light brown hair in a soft braid with small herb sprigs tucked in, wearing a mint-green blouse with a cream pinafore apron, holding a small watering can tending to potted herbs on a sunlit windowsill, gentle warm smile, mint and cream sparkle accents, cozy nurturing atmosphere; negative: chibi, super-deformed, 2-3 head ratio, mascot, flat vector style, photorealistic, 3D render, dark, horror, occult, astrology mysticism, fortune-telling, real brand logos, watermark, in-image text, uncanny valley, gritty texture, cluttered background`

---


### MBTI - ESTJ 幹部（監督者）

- 性格要約: 組織の秩序と効率を守る幹部。外向的思考（Te）×内向的感覚（Si）で明確なルールと目標のもとチームをリードする責任型。
- テーマカラー: フォレストグリーン / ブロンズゴールド
- 小物: 会議資料・腕時計・名刺入れ・プロジェクト計画書
- 表情: 力強く頼もしい眼差し・決断力のある表情
- ポーズ: 腕時計を確認しながら計画書を持っている / 会議でリードしている

【男性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, young male university student, strong dependable athletic build, forest green and bronze gold color scheme, decisive steady dark eyes, neatly styled short dark hair, wearing a formal forest-green blazer with a bronze tie and white shirt, standing confidently glancing at a classic wristwatch while holding a detailed project plan, firm decisive expression, bronze sparkle and green accents, authoritative organized atmosphere; negative: chibi, super-deformed, 2-3 head ratio, mascot, flat vector style, photorealistic, 3D render, dark, horror, occult, astrology mysticism, fortune-telling, real brand logos, watermark, in-image text, uncanny valley, gritty texture, cluttered background`

【女性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, feyoung male university student, strong composed authoritative figure, forest green and bronze gold color scheme, decisive steady dark eyes, dark hair in a polished updo with a gold hairpin, wearing a tailored forest-green jacket and pencil skirt with a bronze scarf, standing at the head of a table with a project plan in one hand and gesturing decisively with the other, firm confident expression, bronze sparkle and green accents, authoritative organized atmosphere; negative: chibi, super-deformed, 2-3 head ratio, mascot, flat vector style, photorealistic, 3D render, dark, horror, occult, astrology mysticism, fortune-telling, real brand logos, watermark, in-image text, uncanny valley, gritty texture, cluttered background`

---


### MBTI - ESFJ 領事（世話焼き）

- 性格要約: コミュニティの調和を守る世話焼きの領事。外向的感情（Fe）×内向的感覚（Si）で全員のニーズを把握し温かい絆を作る。
- テーマカラー: ウォームローズ / ピーチ
- 小物: デコレーションケーキ・アルバム・みんなへのプレゼント
- 表情: 満面の笑顔・みんなを大切にする温かな眼差し
- ポーズ: 両手でケーキを持って差し出す / 友達に囲まれてにぎやかに話している

【男性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, young male university student, warm cheerful social build, warm rose and peach color scheme, bright warm caring brown eyes, neatly styled hair with a friendly approachable look, wearing a warm rose-pink sweater and light trousers, holding out a beautifully decorated cake with both hands and a big warm smile, soft peach bokeh with confetti sparkle accents, cheerful community warmth atmosphere; negative: chibi, super-deformed, 2-3 head ratio, mascot, flat vector style, photorealistic, 3D render, dark, horror, occult, astrology mysticism, fortune-telling, real brand logos, watermark, in-image text, uncanny valley, gritty texture, cluttered background`

【女性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, feyoung male university student, warm bubbly social figure, warm rose and peach color scheme, bright caring warm eyes, light hair with rose-colored ribbon bow or flower clip, wearing a rosy pink blouse and peach skirt, arms wrapped around a nicely wrapped gift box with a huge warm smile, soft confetti and sparkle bokeh accents, cheerful community warmth atmosphere; negative: chibi, super-deformed, 2-3 head ratio, mascot, flat vector style, photorealistic, 3D render, dark, horror, occult, astrology mysticism, fortune-telling, real brand logos, watermark, in-image text, uncanny valley, gritty texture, cluttered background`

---


### MBTI - ISTP 巨匠（職人）

- 性格要約: 仕組みを直観的に理解する実践の職人。内向的思考（Ti）×外向的感覚（Se）で現場での即時問題解決と技術習得を楽しむ。
- テーマカラー: スチールグレー / シャープレッド
- 小物: 工具箱・機械部品・バイクのヘルメット・手袋
- 表情: 冷静でクールな表情・やや眠そうなリラックスした目
- ポーズ: 機械を分解・点検している / 道具を手にして作業中

【男性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, young male university student, lean cool athletic build, steel grey and sharp red color scheme, calm half-lidded cool dark eyes, slightly tousled dark hair, wearing a dark grey mechanic jacket with red stitching and rolled-up sleeves, crouching beside a disassembled mechanical component examining it with a wrench, a motorcycle helmet and toolbox nearby, composed cool expression with a slight natural smirk, steel grey and red sparkle accents, cool practical workshop atmosphere; negative: chibi, super-deformed, 2-3 head ratio, mascot, flat vector style, photorealistic, 3D render, dark, horror, occult, astrology mysticism, fortune-telling, real brand logos, watermark, in-image text, uncanny valley, gritty texture, cluttered background`

【女性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, feyoung male university student, lean cool composed figure, steel grey and sharp red color scheme, calm cool dark eyes, short practical hair or hair tied back out of the way, wearing a grey cargo jacket with red details and work gloves hanging from a pocket, holding up a small mechanical component and examining it closely with a cool focused expression, toolbox open nearby, steel grey and red sparkle accents, practical workshop atmosphere; negative: chibi, super-deformed, 2-3 head ratio, mascot, flat vector style, photorealistic, 3D render, dark, horror, occult, astrology mysticism, fortune-telling, real brand logos, watermark, in-image text, uncanny valley, gritty texture, cluttered background`

---


### MBTI - ISFP 冒険家（芸術家）

- 性格要約: 美と調和を愛する感覚派の芸術家。内向的感情（Fi）×外向的感覚（Se）で現在の瞬間の美しさを繊細に表現し温かいケアを自然に示す。
- テーマカラー: テラコッタオレンジ / ウォームグリーン
- 小物: カメラ・花束・スケッチブック・自然のもの（石・葉）
- 表情: 穏やかで温かい笑顔・自然体でリラックスした表情
- ポーズ: 野外で花を写真に撮っている / 自然の中でスケッチ

【男性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, young male university student, gentle relaxed natural build, terracotta orange and warm green color scheme, soft warm brown eyes with a quiet open gaze, wavy natural light brown hair, wearing a warm terracotta oversized shirt and olive green cargo pants, crouching in a sunny garden holding a film camera up to photograph a wildflower, a small sketchbook and a handful of collected leaves nearby, natural relaxed warm smile, earthy terracotta and green bokeh sparkle accents, gentle nature-loving atmosphere; negative: chibi, super-deformed, 2-3 head ratio, mascot, flat vector style, photorealistic, 3D render, dark, horror, occult, astrology mysticism, fortune-telling, real brand logos, watermark, in-image text, uncanny valley, gritty texture, cluttered background`

【女性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, feyoung male university student, gentle free-spirited natural figure, terracotta orange and warm green color scheme, soft warm eyes with a gentle open gaze, loose wavy hair adorned with small wildflowers, wearing a terracotta-toned flowy blouse and warm green wide-leg trousers, standing in a sunlit garden with a small bouquet of wildflowers in one hand and a sketchbook tucked under the other arm, natural soft warm smile, earthy bokeh and sparkle petal accents, gentle nature-loving atmosphere; negative: chibi, super-deformed, 2-3 head ratio, mascot, flat vector style, photorealistic, 3D render, dark, horror, occult, astrology mysticism, fortune-telling, real brand logos, watermark, in-image text, uncanny valley, gritty texture, cluttered background`

---


### MBTI - ESTP 起業家（行動者）

- 性格要約: 現在の瞬間を全力で生きる行動派起業家。外向的感覚（Se）×内向的思考（Ti）で状況を素早く読みリスクを恐れず即座に行動する。
- テーマカラー: エレクトリックレッド / シャープホワイト
- 小物: スポーツウェア・スケートボード・スマートフォン・交渉の握手
- 表情: 自信たっぷりのニヤリ笑い・躍動感ある表情
- ポーズ: スケートボードに乗っている / 力強い握手ポーズ

【男性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, young male university student, athletic energetic confident build, electric red and sharp white color scheme, bold confident eyes with a sharp self-assured grin, spiky or windswept dark hair, wearing a sporty red and white jacket over a white tee with slim dark jeans and sneakers, dynamic pose riding a skateboard mid-trick or striking a bold power stance, electric red and white sparkle speed-line accents, high-energy action atmosphere; negative: chibi, super-deformed, 2-3 head ratio, mascot, flat vector style, photorealistic, 3D render, dark, horror, occult, astrology mysticism, fortune-telling, real brand logos, watermark, in-image text, uncanny valley, gritty texture, cluttered background`

【女性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, feyoung male university student, athletic bold confident figure, electric red and sharp white color scheme, sharp confident eyes with a bold self-assured grin, short dynamic hair or ponytail, wearing a red and white sporty jacket, crop top and slim joggers with sneakers, dynamic bold pose on a skateboard or striding forward with confidence, electric red and white sparkle speed-line accents, high-energy action atmosphere; negative: chibi, super-deformed, 2-3 head ratio, mascot, flat vector style, photorealistic, 3D render, dark, horror, occult, astrology mysticism, fortune-telling, real brand logos, watermark, in-image text, uncanny valley, gritty texture, cluttered background`

---


### MBTI - ESFP エンターテイナー（パフォーマー）

- 性格要約: 場を明るくする天性のエンターテイナー。外向的感覚（Se）×内向的感情（Fi）で現在の喜びを全力で楽しみ周囲も巻き込む。
- テーマカラー: ホットピンク / ライムグリーン
- 小物: マイク・ステージスポット・カラフルな衣装・コンフェッティ
- 表情: 弾けるような最高の笑顔・輝く瞳
- ポーズ: ステージでマイクを持ってパフォーマンス中 / ダンスポーズ

【男性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, young male university student, lively vibrant expressive build, hot pink and lime green color scheme, sparkling joyful warm eyes, stylish expressive hair with a fun color streak, wearing a vibrant stage outfit with a hot pink and lime green graphic jacket, mid-performance dance pose holding a microphone with a huge glowing smile, colorful confetti and sparkle stage-light accents, electric fun performance atmosphere; negative: chibi, super-deformed, 2-3 head ratio, mascot, flat vector style, photorealistic, 3D render, dark, horror, occult, astrology mysticism, fortune-telling, real brand logos, watermark, in-image text, uncanny valley, gritty texture, cluttered background`

【女性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, feyoung male university student, lively vibrant bubbly figure, hot pink and lime green color scheme, sparkling joyful bright eyes, colorful wavy hair with pink highlights, wearing a sparkly hot pink stage outfit with lime green accessories, dynamic dance pose holding a glittery microphone with an absolutely radiant smile, colorful confetti and stage sparkle accents, electric fun performance atmosphere; negative: chibi, super-deformed, 2-3 head ratio, mascot, flat vector style, photorealistic, 3D render, dark, horror, occult, astrology mysticism, fortune-telling, real brand logos, watermark, in-image text, uncanny valley, gritty texture, cluttered background`

---

# DiSC 4タイプ

---


### DiSC - D 主導型（Dominance）

- 性格要約: 結果を出すために前に出るスピードと実行力の牽引者。課題に直接行動し、高い目標と競争でモチベーションが上がる。
- テーマカラー: ファイアレッド / ダークチャコール
- 小物: ゴールメダル・鍵（新オフィス）・スプリントするシューズ・腕時計
- 表情: 鋭い眼差し・力強い意志が宿る表情
- ポーズ: 前へ大きく踏み出すポーズ / フィニッシュラインを切る瞬間

【男性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, young male university student, powerfully built confident athletic figure, fire red and dark charcoal color scheme, sharp intense determined eyes, short neatly styled dark hair, wearing a sleek red and charcoal athletic jacket with performance trousers, bold dynamic stride-forward pose with one fist clenched and a gold medal visible, intense driven expression, fire red sparkle and speed-line accents, high-energy results-driven atmosphere; negative: chibi, super-deformed, 2-3 head ratio, mascot, flat vector style, photorealistic, 3D render, dark, horror, occult, astrology mysticism, fortune-telling, real brand logos, watermark, in-image text, uncanny valley, gritty texture, cluttered background`

【女性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, feyoung male university student, powerfully confident athletic figure, fire red and dark charcoal color scheme, sharp intense determined eyes, sleek dark hair in a high ponytail, wearing a bold red athletic jacket and charcoal performance leggings with sharp sneakers, dynamic power-stride forward pose with one fist raised, fierce driven expression, fire red sparkle and speed-line accents, high-energy results-driven atmosphere; negative: chibi, super-deformed, 2-3 head ratio, mascot, flat vector style, photorealistic, 3D render, dark, horror, occult, astrology mysticism, fortune-telling, real brand logos, watermark, in-image text, uncanny valley, gritty texture, cluttered background`

---


### DiSC - i 感化型（influence）

- 性格要約: 人を巻き込み場を明るくする生まれながらのムードメーカー。楽観的な姿勢と高い説得力でチームに活気をもたらす。
- テーマカラー: サンシャインイエロー / スカイブルー
- 小物: メガホン・カラフルなフラッグ・スマートフォン（自撮り）・笑顔の集合写真
- 表情: 太陽のような笑顔・人を引き寄せる輝く瞳
- ポーズ: メガホンを持って呼びかけている / 人々に向かって手を振っている

【男性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, young male university student, lively friendly social build, sunshine yellow and sky blue color scheme, sparkling warm outgoing eyes, stylish wavy hair with natural volume, wearing a bright yellow bomber jacket and sky-blue shirt with casual trousers, holding a colorful megaphone and waving enthusiastically toward the viewer with a huge sunny smile, confetti and colorful flag bokeh in background, sunshine yellow and sky blue sparkle accents, energetic social crowd-engaging atmosphere; negative: chibi, super-deformed, 2-3 head ratio, mascot, flat vector style, photorealistic, 3D render, dark, horror, occult, astrology mysticism, fortune-telling, real brand logos, watermark, in-image text, uncanny valley, gritty texture, cluttered background`

【女性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, feyoung male university student, lively bubbly energetic figure, sunshine yellow and sky blue color scheme, sparkling outgoing bright eyes, voluminous wavy hair with a yellow scrunchie, wearing a sunshine yellow off-shoulder top and blue wide-leg trousers, cheerfully holding a colorful flag and waving both hands at the viewer with a radiant magnetic smile, confetti and sparkle bokeh in background, sunshine yellow and sky blue sparkle accents, energetic social inspiring atmosphere; negative: chibi, super-deformed, 2-3 head ratio, mascot, flat vector style, photorealistic, 3D render, dark, horror, occult, astrology mysticism, fortune-telling, real brand logos, watermark, in-image text, uncanny valley, gritty texture, cluttered background`

---


### DiSC - S 安定型（Steadiness）

- 性格要約: チームの土台を支える忍耐と協調の縁の下の力持ち。安定した環境で長期信頼関係を築き、サポート役として組織を支える。
- テーマカラー: セージグリーン / ウォームベージュ
- 小物: チームのノート・温かいマグカップ・サポートのメモ・植物
- 表情: 穏やかで安心させる笑顔・柔らかな眼差し
- ポーズ: 誰かに寄り添って話を聞いている / チームで作業している

【男性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, young male university student, gentle steady reliable build, sage green and warm beige color scheme, soft calm brown eyes with a reassuring gaze, neat tidy warm-toned hair, wearing a sage-green cable-knit sweater and beige trousers, seated beside a small plant with a warm mug on the table, leaning in slightly with an open supportive posture and a gentle calm smile, warm beige and sage green soft sparkle accents, cozy steady team-support atmosphere; negative: chibi, super-deformed, 2-3 head ratio, mascot, flat vector style, photorealistic, 3D render, dark, horror, occult, astrology mysticism, fortune-telling, real brand logos, watermark, in-image text, uncanny valley, gritty texture, cluttered background`

【女性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, feyoung male university student, gentle steady nurturing figure, sage green and warm beige color scheme, soft calm warm eyes with a soothing gaze, light brown hair in a gentle side braid, wearing a sage-green cozy sweater and warm beige skirt, sitting calmly with a small potted plant on the desk and a warm mug in both hands, a quiet gentle smile, warm beige and sage green soft sparkle accents, cozy steady team-support atmosphere; negative: chibi, super-deformed, 2-3 head ratio, mascot, flat vector style, photorealistic, 3D render, dark, horror, occult, astrology mysticism, fortune-telling, real brand logos, watermark, in-image text, uncanny valley, gritty texture, cluttered background`

---


### DiSC - C 慎重型（Conscientiousness）

- 性格要約: 正確性とデータで判断する品質と根拠の専門家。高い専門性を積み上げ、リスク管理と論理的分析でチームのミスを防ぐ。
- テーマカラー: ミッドナイトネイビー / クールシルバー
- 小物: データグラフ・拡大鏡・精密測定器・論文・メガネ
- 表情: 集中した真剣な表情・鋭く緻密な眼差し
- ポーズ: データを分析している / 拡大鏡でチェックしている

【男性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, young male university student, slim precise meticulous build, midnight navy and cool silver color scheme, sharp focused eyes behind silver-rimmed glasses, neatly combed dark hair, wearing a crisp navy button-up shirt and dark slacks, seated at a desk intently examining a data chart or graph with a magnifying glass, precise concentrated expression, cool silver and navy sparkle data-grid accents, analytical precision atmosphere; negative: chibi, super-deformed, 2-3 head ratio, mascot, flat vector style, photorealistic, 3D render, dark, horror, occult, astrology mysticism, fortune-telling, real brand logos, watermark, in-image text, uncanny valley, gritty texture, cluttered background`

【女性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, feyoung male university student, slim precise meticulous figure, midnight navy and cool silver color scheme, sharp focused eyes with elegant silver-framed glasses, dark hair in a neat bun with a silver clip, wearing a navy and silver structured blazer and slim trousers, standing over a desk examining a detailed data chart with a magnifying glass, highly focused precise expression, cool silver and navy sparkle data-grid accents, analytical precision atmosphere; negative: chibi, super-deformed, 2-3 head ratio, mascot, flat vector style, photorealistic, 3D render, dark, horror, occult, astrology mysticism, fortune-telling, real brand logos, watermark, in-image text, uncanny valley, gritty texture, cluttered background`

---

# 完璧主義 4タイプ

---


### 完璧主義 - thorough 徹底型（Self-Oriented Perfectionist）

- 性格要約: やるなら100%・自分への基準が誰よりも高い妥協なき完成追求者。自己志向型完璧主義で高品質な成果を生み続ける原動力を持つ。
- テーマカラー: ディープスカーレット / オフホワイト
- 小物: 赤ペン（添削）・何度も書き直したノート・目標リスト
- 表情: 集中した鋭い表情・満足せずにもう一度見直す真剣顔
- ポーズ: 完成物を手に取って再確認している / ノートを丁寧に書き直している

【男性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, young male university student, focused determined lean build, deep scarlet and off-white color scheme, sharp self-critical concentrated eyes, neat dark hair, wearing a clean white dress shirt with a deep red tie, seated at a tidy desk holding up a completed report and scrutinizing it again with a red pen, a crossed-out draft visible below, intense self-reviewing expression, deep scarlet and white sparkle precision accents, meticulous perfectionist atmosphere; negative: chibi, super-deformed, 2-3 head ratio, mascot, flat vector style, photorealistic, 3D render, dark, horror, occult, astrology mysticism, fortune-telling, real brand logos, watermark, in-image text, uncanny valley, gritty texture, cluttered background`

【女性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, feyoung male university student, focused determined composed figure, deep scarlet and off-white color scheme, sharp self-critical concentrated eyes, dark hair in a neat high ponytail, wearing a crisp white blouse with a deep red ribbon, sitting at a spotless desk holding a completed paper with a red pen and reviewing it with intense focus, a discarded earlier draft and corrected notes visible nearby, precise self-reviewing expression, deep scarlet and white sparkle precision accents, meticulous perfectionist atmosphere; negative: chibi, super-deformed, 2-3 head ratio, mascot, flat vector style, photorealistic, 3D render, dark, horror, occult, astrology mysticism, fortune-telling, real brand logos, watermark, in-image text, uncanny valley, gritty texture, cluttered background`

---


### 完璧主義 - particular こだわり型（Organization-Oriented Perfectionist）

- 性格要約: 細部にこそ本質が宿ると信じる秩序と精度の職人気質。Frost組織化志向が高く、整理された環境と手順で安定した高品質を実現する。
- テーマカラー: ミュートブルー / ウォームグレー
- 小物: カラーコードのファイル・ラベルメーカー・定規・整然としたデスク
- 表情: 満足そうな穏やかな笑顔・整理できた達成感の表情
- ポーズ: ファイルをきれいに並べている / ラベルを丁寧に貼っている

【男性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, young male university student, neat tidy organized build, muted blue and warm grey color scheme, calm satisfied focused eyes, neatly combed hair in a tidy style, wearing a muted blue sweater vest over a button-up with organized trousers, carefully aligning a row of color-coded labeled binders on a perfectly neat shelf with a gentle pleased smile, a label maker and ruler on the pristine desk below, warm grey and soft blue sparkle organization accents, satisfying orderly atmosphere; negative: chibi, super-deformed, 2-3 head ratio, mascot, flat vector style, photorealistic, 3D render, dark, horror, occult, astrology mysticism, fortune-telling, real brand logos, watermark, in-image text, uncanny valley, gritty texture, cluttered background`

【女性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, feyoung male university student, neat tidy composed figure, muted blue and warm grey color scheme, calm satisfied eyes with a neat appearance, hair tied in a precise low ponytail with a subtle blue bow, wearing a muted blue cardigan and grey pleated skirt, neatly arranging color-coded labeled file folders on an immaculate desk with a gentle pleased smile, a label maker and perfectly aligned stationery nearby, warm grey and soft blue sparkle organization accents, satisfying orderly atmosphere; negative: chibi, super-deformed, 2-3 head ratio, mascot, flat vector style, photorealistic, 3D render, dark, horror, occult, astrology mysticism, fortune-telling, real brand logos, watermark, in-image text, uncanny valley, gritty texture, cluttered background`

---


### 完璧主義 - procrastinating 先延ばし型（Failure-Avoidant Perfectionist）

- 性格要約: 完璧にできないなら始められない・失敗への恐れが生む慎重さの罠。Frost失敗懸念が高く、本気で取り組む誠実さが根底にある不適応的完璧主義。
- テーマカラー: ソフトアンバー / ライトパープル
- 小物: 積み上がった未着手の本・時計（時間切れ）・消しゴム・白紙のノート
- 表情: 思い悩む表情・ためらいと「もう少し準備が必要」感
- ポーズ: ペンを持ちながら紙を前に固まっている / 頭を抱えて考えている

【男性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, young male university student, thoughtful hesitant gentle build, soft amber and light purple color scheme, worried overthinking eyes with a slightly furrowed brow, soft wavy light hair, wearing a soft amber cardigan over a light shirt, seated at a desk with a blank notebook open and a pen held mid-air, stack of unstarted books and an eraser nearby, a clock visible in background, pensive conflicted expression with a trace of earnestness, amber and lavender soft sparkle accents, contemplative hesitant atmosphere; negative: chibi, super-deformed, 2-3 head ratio, mascot, flat vector style, photorealistic, 3D render, dark, horror, occult, astrology mysticism, fortune-telling, real brand logos, watermark, in-image text, uncanny valley, gritty texture, cluttered background`

【女性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, feyoung male university student, thoughtful hesitant earnest figure, soft amber and light purple color scheme, worried overthinking eyes, soft hair loosely falling with a lavender hairclip, wearing a light purple knit cardigan and soft amber skirt, sitting at a desk staring at a blank open notebook with pen in hand but not yet writing, a pile of books and an eraser beside her, a small clock in background, pensive earnest conflicted expression, amber and lavender soft sparkle accents, contemplative hesitant sincere atmosphere; negative: chibi, super-deformed, 2-3 head ratio, mascot, flat vector style, photorealistic, 3D render, dark, horror, occult, astrology mysticism, fortune-telling, real brand logos, watermark, in-image text, uncanny valley, gritty texture, cluttered background`

---


### 完璧主義 - expecting 期待型（Socially-Prescribed Perfectionist）

- 性格要約: 誰かの期待が私のプレッシャー・他者からの視線に揺れる承認の追求者。Hewitt & Flett社会規定型で他者への敏感さと共感力が表裏一体。
- テーマカラー: ローズゴールド / ソフトピーチ
- 小物: 承認の星マーク・SNSハート通知・人からのメッセージカード
- 表情: 認められたときの輝く笑顔 / 少し不安そうに他者の反応を窺う表情
- ポーズ: 評価結果を確認して嬉しそうにしている / 周囲の視線を意識しながら発表

【男性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, young male university student, sensitive empathetic pleasant build, rose gold and soft peach color scheme, warm expressive eyes that are bright when praised and slightly anxious otherwise, neat stylish light brown hair, wearing a soft rose-toned shirt and peach cardigan, holding a paper with a glowing approval stamp while looking up with a relieved radiant smile, subtle heart sparkle and star approval accents in background, rose gold soft sparkle accents, warm approval-seeking empathetic atmosphere; negative: chibi, super-deformed, 2-3 head ratio, mascot, flat vector style, photorealistic, 3D render, dark, horror, occult, astrology mysticism, fortune-telling, real brand logos, watermark, in-image text, uncanny valley, gritty texture, cluttered background`

【女性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, feyoung male university student, sensitive empathetic warm figure, rose gold and soft peach color scheme, warm expressive eyes glowing with happiness when appreciated, light hair in a soft style with a rose gold hair clip, wearing a peach blouse with a rose-gold pendant necklace and a light cardigan, holding a paper with a glowing gold star approval stamp and beaming with a radiant relieved smile, soft heart and star bokeh sparkle accents, rose gold soft sparkle accents, warm approval-seeking empathetic atmosphere; negative: chibi, super-deformed, 2-3 head ratio, mascot, flat vector style, photorealistic, 3D render, dark, horror, occult, astrology mysticism, fortune-telling, real brand logos, watermark, in-image text, uncanny valley, gritty texture, cluttered background`

---

# 金銭感覚 4タイプ

---


### 金銭感覚 - avoidance 回避型（Money Avoidance）

- 性格要約: お金より大切なものがある静かな価値観の持ち主。物質より精神的豊かさ・人間関係・体験を重視し、金銭管理を自然と後回しにしがち。
- テーマカラー: ソフトオリーブ / アースブラウン
- 小物: 自然の花・古本・手紙・シンプルなエコバッグ
- 表情: 穏やかで自然体の笑顔・価値観に忠実な落ち着いた表情
- ポーズ: 自然の中でのんびりしている / 本を読みながらリラックス

【男性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, young male university student, relaxed natural easygoing build, soft olive and earth brown color scheme, calm gentle warm eyes, slightly messy natural hair, wearing a soft olive linen shirt and loose earth-toned trousers, sitting barefoot on a sunny patch of grass reading a worn paperback book, a simple canvas tote bag and a few wildflowers nearby, relaxed genuine natural smile, earthy olive and warm brown soft sparkle and leaf petal accents, gentle nature-loving unhurried atmosphere; negative: chibi, super-deformed, 2-3 head ratio, mascot, flat vector style, photorealistic, 3D render, dark, horror, occult, astrology mysticism, fortune-telling, real brand logos, watermark, in-image text, uncanny valley, gritty texture, cluttered background`

【女性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, feyoung male university student, relaxed natural free-spirited figure, soft olive and earth brown color scheme, calm gentle warm eyes, loose natural wavy hair with a small wildflower tucked in, wearing an olive green loose shirt dress and simple sandals, sitting cross-legged on a sunny grassy spot holding an open letter and a few wildflowers, a simple canvas tote bag beside her, peaceful natural genuine smile, earthy olive and warm brown soft sparkle and petal accents, gentle nature-loving unhurried atmosphere; negative: chibi, super-deformed, 2-3 head ratio, mascot, flat vector style, photorealistic, 3D render, dark, horror, occult, astrology mysticism, fortune-telling, real brand logos, watermark, in-image text, uncanny valley, gritty texture, cluttered background`

---


### 金銭感覚 - worship 崇拝型（Money Worship）

- 性格要約: もっと稼げばもっと自由になれると信じる行動派。お金の力を信じ収入増への強い意欲と行動力でより豊かな生活を目指す。
- テーマカラー: ゴールデンイエロー / リッチバーガンディ
- 小物: 輝くコイン・上昇する株グラフ・新しいガジェット・高級感のあるバッグ
- 表情: 意欲に溢れた輝く眼差し・成功を見据える前向きな笑顔
- ポーズ: 上昇グラフを指して興奮している / 夢を語るように空を指さしている

【男性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, young male university student, energetic ambitious upbeat build, golden yellow and rich burgundy color scheme, bright ambitious glittering eyes, stylish well-groomed hair, wearing a burgundy open collar smart-casual shirt and well-fitted trousers, excitedly pointing up at a glowing rising chart or gold coins with a bold enthusiastic smile, sparkle golden coin and upward-arrow accents, golden yellow and burgundy shimmer, ambitious wealth-aspiring energetic atmosphere; negative: chibi, super-deformed, 2-3 head ratio, mascot, flat vector style, photorealistic, 3D render, dark, horror, occult, astrology mysticism, fortune-telling, real brand logos, watermark, in-image text, uncanny valley, gritty texture, cluttered background`

【女性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, feyoung male university student, energetic ambitious confident figure, golden yellow and rich burgundy color scheme, bright ambitious sparkling eyes, stylish hair in a chic half-updo with a gold hair accessory, wearing a golden-yellow blouse with a burgundy blazer and tailored trousers, excitedly gesturing upward toward a glowing ascending chart or gold coins with a bold forward-looking smile, sparkle golden coin and upward-arrow accents, ambitious wealth-aspiring energetic atmosphere; negative: chibi, super-deformed, 2-3 head ratio, mascot, flat vector style, photorealistic, 3D render, dark, horror, occult, astrology mysticism, fortune-telling, real brand logos, watermark, in-image text, uncanny valley, gritty texture, cluttered background`

---


### 金銭感覚 - status 地位型（Money Status）

- 性格要約: 洗練された暮らしで自分の価値を表現したい上昇志向の体現者。社会的立場・ブランド・生活水準への高い感度と印象管理力を持つ。
- テーマカラー: シャンパンゴールド / ディープパープル
- 小物: 高品質な時計・ブランドバッグ（ロゴなし）・洗練されたコーヒーカップ・タブレット
- 表情: 自信と優雅さが滲む表情・品のある笑顔
- ポーズ: カフェでタブレットを見ながら洗練された姿勢 / ラグジュアリーな空間でポーズ

【男性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, young male university student, polished elegant refined build, champagne gold and deep purple color scheme, confident composed eyes with a poised sophisticated air, neatly styled hair with a sleek finish, wearing a luxurious deep-purple high-quality turtleneck and tailored champagne-gold blazer, sitting at a stylish cafe table with a sleek tablet and an elegantly presented coffee cup, a classic quality wristwatch on the wrist, composed self-assured smile, champagne gold and purple shimmer sparkle accents, refined upscale stylish atmosphere; negative: chibi, super-deformed, 2-3 head ratio, mascot, flat vector style, photorealistic, 3D render, dark, horror, occult, astrology mysticism, fortune-telling, real brand logos, watermark, in-image text, uncanny valley, gritty texture, cluttered background`

【女性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, feyoung male university student, elegant refined sophisticated figure, champagne gold and deep purple color scheme, confident composed eyes with poise and grace, glossy dark hair in a sleek style with a delicate gold hair ornament, wearing a deep-purple silk-like elegant blouse and champagne-gold tailored skirt, seated at a chic cafe with a high-quality sleek tablet and an artfully presented coffee, a refined quality handbag (no visible logo) beside her, composed graceful smile, champagne gold and purple shimmer sparkle accents, refined upscale stylish atmosphere; negative: chibi, super-deformed, 2-3 head ratio, mascot, flat vector style, photorealistic, 3D render, dark, horror, occult, astrology mysticism, fortune-telling, real brand logos, watermark, in-image text, uncanny valley, gritty texture, cluttered background`

---


### 金銭感覚 - vigilance 用心型（Money Vigilance）

- 性格要約: 計画と節制で将来への安心を積み上げる堅実派。計画的・慎重・節制的な姿勢で長期資産形成を実現し将来のリスクに備える。
- テーマカラー: ソリッドブルー / ピュアホワイト
- 小物: 家計簿・貯金箱・カレンダー（予算計画）・シンプルな財布
- 表情: 穏やかで安心感のある笑顔・計画が順調な満足の表情
- ポーズ: 家計簿を丁寧につけている / 貯金箱に丁寧にお金を入れている

【男性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, young male university student, steady calm reliable build, solid blue and pure white color scheme, calm trustworthy steady eyes, neatly combed tidy hair, wearing a clean white shirt and solid blue vest or pullover, sitting at a clean desk carefully writing in a detailed household budget notebook with a simple pen, a small piggy bank and a neat monthly calendar with budget notes beside him, quiet satisfied content expression, solid blue and white soft sparkle accents, calm prudent financially-secure atmosphere; negative: chibi, super-deformed, 2-3 head ratio, mascot, flat vector style, photorealistic, 3D render, dark, horror, occult, astrology mysticism, fortune-telling, real brand logos, watermark, in-image text, uncanny valley, gritty texture, cluttered background`

【女性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, feyoung male university student, steady calm composed figure, solid blue and pure white color scheme, calm trustworthy steady eyes, neat dark hair with a simple white ribbon or blue hairclip, wearing a white blouse and solid navy blue cardigan with a tidy pleated skirt, carefully writing in a detailed household budget planner at a clean organized desk, a small cute piggy bank and a neatly marked monthly calendar nearby, quiet satisfied calm expression, solid blue and white soft sparkle accents, calm prudent financially-secure atmosphere; negative: chibi, super-deformed, 2-3 head ratio, mascot, flat vector style, photorealistic, 3D render, dark, horror, occult, astrology mysticism, fortune-telling, real brand logos, watermark, in-image text, uncanny valley, gritty texture, cluttered background`

---

*end of part1 — 28タイプ × 男女 = 56体*


## Big5動物専用キャラクター設定（完全動物版）

> Big5動物は全タイプを「完全な動物キャラクター」として扱う。二足歩行の擬人化動物ではなく、動物そのものが診断ナビ風の明るいアニメキャラになった表現にする。服装は原則なし。性格は表情、姿勢、尾・耳・翼・触腕、小さなチャーム、足元小物、背景記号で表現する。

| タイプ | 男性版キャラ設定 | 女性版キャラ設定 | 差別化ポイント |
|---|---|---|---|
| ライオン王 | 雄ライオンそのもの。豊かなたてがみ、堂々と胸を張る伏せ/立ち姿、金の小さな首飾り。 | 雌ライオンそのもの。しなやかな体型、横向きで静かに見守る、細い金リボン首輪。 | 王道リーダー。星座獅子座の人間コスプレと混ぜない。 |
| ハヤブサ | 雄ハヤブサそのもの。翼を半開きにして前を見据える、足元に小さな風マーク。 | 雌ハヤブサそのもの。翼を広げて軽く浮く構図、淡いチャーム。 | 速さと決断。二足人間化せず翼で表現。 |
| フクロウ博士 | 雄フクロウそのもの。枝に止まり、本型チャームを足元に置く。 | 雌フクロウそのもの。小柄でふんわり、片翼で小さな本を抱えるような仕草。 | 知性と穏やかさ。服ではなく小物で表現。 |
| タコ博士 | 雄タコそのもの。丸い頭と8本触腕、海中ラボ風の泡背景。 | 雌タコそのもの。淡紫の体色、触腕で小さな道具を並べる。 | 触腕は必ず8本。余分な腕を作らない。 |
| イルカ | 雄イルカそのもの。水面ジャンプ、明るい目、波形チャーム。 | 雌イルカそのもの。やわらかいカーブで泳ぐ、貝殻チャーム。 | 直立させず水中/水面で表現。 |
| キツネ | 雄キツネそのもの。ふさふさ尾、横向きで振り返る、葉っぱ型チャーム。 | 雌キツネそのもの。しなやかに座る、大きな尾を巻く、細いリボン首輪。 | 目線と尾で機転を出す。 |
| ネコ | 雄ネコそのもの。気ままな半目、窓辺で前脚を伸ばす。 | 雌ネコそのもの。丸い目、座って尻尾を丸める。 | 猫耳人間ではなく普通の猫キャラ。 |
| トラ | 雄トラそのもの。低く構えて前を見る、鮮明な縞と力強い前脚。 | 雌トラそのもの。横向きでしなやかに歩く、細い首飾り。 | チーターより重厚で筋肉質。 |
| イヌ | 雄犬そのもの。まっすぐな目、ボールを前脚の近くに置く。 | 雌犬そのもの。やわらかい耳、カード風チャームを足元に置く。 | 忠実さと協調性。 |
| オオカミ | 雄オオカミそのもの。銀灰の毛並み、背を少し向けて振り返る。 | 雌オオカミそのもの。青灰の毛並み、静かな横顔、地図チャーム。 | 独立心。暗くしない。 |
| ビーバー | 雄ビーバーそのもの。木片の前で得意げ、平たい尾を見せる。 | 雌ビーバーそのもの。小さな木の模型を前脚で支える。 | 制作力。工具を持たせすぎない。 |
| ワシ | 雄ワシそのもの。大きな翼を広げ、遠くを見る。 | 雌ワシそのもの。白金の羽、横風を受ける翼の構図。 | 高い視座。ハヤブサより重厚。 |
| パンダ | 雄パンダそのもの。笹をそばに置き、のんびり座る。 | 雌パンダそのもの。丸い体型、淡いクッション記号。 | マスコット化しすぎない。 |
| チーター | 雄チーターそのもの。四足でしなやかに走る横向き構図、細身でスポット鮮明。 | 雌チーターそのもの。軽く跳ねるような走り、やや淡い毛色。 | 四足を明確にし、余分な手足を作らない。 |
| ウサギ | 雄ウサギそのもの。大きな耳、少し警戒して座る。 | 雌ウサギそのもの。丸い目、花チャームを足元に置き内気に座る。 | 人間の手を作らない。 |
| ハリネズミ | 雄ハリネズミそのもの。針を少し立て、バッグ型チャームの横で警戒。 | 雌ハリネズミそのもの。少し丸まる、針山チャームをそばに置く。 | 守りのかわいさ。 |

### Big5動物 - ライオン王（o-high_c-high_e-high_a-high）

- 性格要約: 行動力×計画力×社交性×思いやりを兼ね備えた万能リーダー
- テーマカラー: アンバーゴールド #f59e0b / グラデ #fef3c7→#fde68a
- キャラ設定: 完全動物ライオン（動物の顔・黄金色の毛並み）。オスは豊かなたてがみ・がっしり体型、メスはたてがみなし・スリム体型
- 小物: 生徒手帳・リーダーバッジ、腕時計
- 表情: 自信に満ちた温かい笑顔
- ポーズ: 腕を広げて仲間を迎え入れるジェスチャー

【男性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, the character is a complete natural male lion (not a human with animal traits), standing upright, complete lion body with tawny golden fur, lion head with animal face and warm amber eyes (no human face), full thick golden mane around neck and shoulders, powerful broad-shouldered build, long tufted tail, wearing an amber-gold tailored coat with leader badge on chest and wristwatch, arms spread wide open in a welcoming gesture, warm confident expression, amber and warm cream color theme, golden sparkle accents, soft warm bokeh background in cream and gold tones`

【女性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, the character is a complete natural female lion (not a human with animal traits), standing upright, complete lion body with warm golden-tan fur, lion head with animal face and amber eyes (no human face), no mane, slender elegant build, long tufted tail, wearing an amber-gold fitted coat with decorative gold trim and leader badge, one paw gracefully extended forward in a calm guiding gesture while the other rests near chest, gracious warm expression, amber and warm cream color theme, golden sparkle accents, soft warm bokeh background in cream and gold tones`

---


### Big5動物 - ハヤブサ（o-high_c-high_e-high_a-low）

- 性格要約: 目標達成×決断力×行動力×独立心の鋭い先駆者
- テーマカラー: インディゴ #6366f1 / グラデ #e0e7ff→#c7d2fe
- キャラ設定: 完全動物ハヤブサ（羽毛全身・猛禽の顔とくちばし・翼を背に折りたたみ）。オスは羽色濃くがっちり体型、メスは羽色やや淡くスリム体型
- 小物: タブレット・スピード感のある流線型のスニーカー
- 表情: 前を見据える鋭く自信ある表情
- ポーズ: 片足を踏み出す躍動感のある前傾姿勢

【男性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, the character is a complete natural male falcon (not a human with animal traits), on taloned feet, complete feathered body with dark blue-grey plumage and white breast markings, falcon head with sharp curved beak and fierce golden eyes (no human face), broad-chested athletic build, wings folded at sides, wearing an indigo-blue tactical vest over chest, carrying a tablet with a taloned hand, dynamic forward-leaning stride pose, indigo and periwinkle color theme, speed-line sparkle accents, soft indigo-lavender bokeh background`

【女性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, the character is a complete natural female falcon (not a human with animal traits), on taloned feet, complete feathered body with slightly lighter blue-grey plumage and white breast markings, falcon head with sharp curved beak and keen golden eyes (no human face), slender athletic build, one wing slightly open and the other folded, wearing an indigo-blue lightweight vest, holding a slim blank flight card in one talon, standing tall and looking upward as if scanning the sky, indigo and periwinkle color theme, speed-line sparkle accents, soft indigo-lavender bokeh background`

---


### Big5動物 - フクロウ博士（o-high_c-high_e-low_a-high）

- 性格要約: 知性×計画力×思いやり×洞察力の静かな知者
- テーマカラー: バイオレット #7c5cff / グラデ #ede9fe→#ddd6fe
- キャラ設定: 完全動物フクロウ（羽毛全身・大きな丸い瞳・くちばし・翼）。オスは羽毛豊かでがっしり、メスは小柄でふんわりした羽毛質感
- 小物: 丸眼鏡・分厚い本・万年筆
- 表情: 穏やかで洞察に満ちた微笑み
- ポーズ: 本を持ちながら少し考え込む横顔気味の読書ポーズ

【男性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, the character is a complete natural male owl (not a human with animal traits), standing upright, complete feathered body with brown-violet plumage and cream-colored facial disc, owl head with large round amber eyes and small hooked beak (no human face), prominent ear tufts, compact scholarly build, wings folded, small round glasses perched on beak, holding a thick open book and fountain pen in talon-hands, three-quarter reading pose, violet-purple academic robe over chest, violet and lavender color theme, soft glowing sparkle accents around books, misty lavender bokeh background`

【女性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, the character is a complete natural female owl (not a human with animal traits), standing upright, complete feathered body with lighter brown-lavender plumage and soft cream facial disc, owl head with large round gentle amber eyes and small curved beak (no human face), smaller delicate ear tufts, slender petite build, wings folded gracefully, small oval glasses on beak, cradling a closed thick book against chest with one wing while turning her head gently toward viewer, thoughtful seated pose, lavender academic shawl-robe, violet and lavender color theme, soft glowing sparkle accents around books, misty lavender bokeh background`

---


### Big5動物 - タコ博士（o-high_c-high_e-low_a-low）

- 性格要約: 分析力×計画力×独創性×集中力の孤高の研究者
- テーマカラー: パープル #8b5cf6 / グラデ #f5f3ff→#ede9fe
- キャラ設定: 完全動物タコ（丸い胴体・8本腕・大きな知性的な瞳）。オスは頭部・腕が大きくがっしり、メスは腕が細く優雅な動き
- 小物: 複数のビーカー・研究ノート、ルーペ
- 表情: 研究に没頭した真剣な表情
- ポーズ: 顎に手を当てて思考中の静的ポーズ

【男性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, the character is a complete natural male octopus (not a human with animal traits), on two lower tentacles, round soft body with purple-violet mottled skin, octopus head with large intelligent round eyes (no human face), six remaining tentacles used as arms and hands, larger body and thicker tentacles conveying male physique, wearing a deep purple lab coat draped over the body, using tentacles to hold research notebook and magnifying glass, beakers nearby, focused analytical expression with forward-leaning thinking pose, purple and pale lilac color theme, subtle glowing data-dot sparkles, cool pale purple bokeh background`

【女性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, the character is a complete natural female octopus (not a human with animal traits), on two lower tentacles, round soft body with lighter purple-lavender mottled skin, octopus head with large gentle round eyes (no human face), six remaining tentacles used as arms and hands, slender elegant tentacles with delicate sucker details, wearing a pale lavender lab coat draped gracefully over the body, using tentacles to arrange blank color cards and small research tools, seated-like curled tentacle pose, gentle focused expression, purple and pale lilac color theme, subtle glowing data-dot sparkles, cool pale purple bokeh background`

---


### Big5動物 - イルカ（o-high_c-low_e-high_a-high）

- 性格要約: 社交的×共感力×自由×好奇心の遊び心ある社交家
- テーマカラー: スカイブルー #0ea5e9 / グラデ #e0f2fe→#bae6fd
- キャラ設定: 完全動物イルカ（光沢のある青灰色の皮膚・背びれ・吻部）。オスは体格大きめで背びれ大、メスは細身で小ぶりな背びれ
- 小物: ビーチボール・サングラス（首にかけ）
- 表情: 弾けるような明るい笑顔
- ポーズ: ジャンプするような軽やかな躍動ポーズ

【男性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, the character is a complete natural male dolphin (not a human with animal traits), standing upright, complete dolphin body with smooth glossy sky-blue and white skin, dolphin head with bottle-nose snout and bright intelligent eyes (no human face), dorsal fin on back, larger athletic build, wearing a light aqua open-zip vest over the smooth body, sunglasses balanced on snout, light energetic jumping-leap pose, sky blue and aqua color theme, bubble sparkle and water-light bokeh accents, bright aqua-sky bokeh background`

【女性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, the character is a complete natural female dolphin (not a human with animal traits), standing upright, complete dolphin body with smooth glossy lighter sky-blue and white skin, dolphin head with delicate bottle-nose snout and sparkling eyes (no human face), smaller dorsal fin, slender graceful build, wearing a light aqua vest over the smooth body with a flowing aqua-toned accessory wrap and pearl-like aqua accessory at neck, graceful wave pose with both flipper-hands holding a shell-like charm, sky blue and aqua color theme, bubble sparkle and water-light bokeh accents, bright aqua-sky bokeh background`

---


### Big5動物 - キツネ（o-high_c-low_e-high_a-low）

- 性格要約: 創造力×行動力×独創性×自由のユニークな挑戦者
- テーマカラー: オレンジ #f97316 / グラデ #fff7ed→#fed7aa
- キャラ設定: 完全動物キツネ（オレンジの毛並み・三角耳・ふさふさの尾・キツネの顔）。オスは尾と体格が大きく頬の毛豊か、メスは細身でしなやか
- 小物: スケッチブック・カラフルなマーカーペン
- 表情: いたずらっぽい自信に満ちたスマイル
- ポーズ: 片目をつぶりウィンクしながらスケッチブックを掲げる

【男性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, the character is a complete natural male fox (not a human with animal traits), standing upright, complete fox body with vivid orange fur and cream-white chest markings, fox head with pointed muzzle and sharp amber eyes (no human face), large pointed ears, full fluffy orange-and-cream bushy tail, athletic energetic build with prominent cheek fur, wearing a casual orange open jacket over the fox body, holding sketchbook up with colorful markers in paw, mischievous wink expression, orange and warm peach color theme, star-burst sparkle accents, soft warm orange-cream bokeh background`

【女性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, the character is a complete natural female fox (not a human with animal traits), standing upright, complete fox body with softer orange-peach fur and delicate cream-white chest markings, fox head with petite pointed muzzle and bright amber eyes (no human face), elegant pointed ears, slender fluffy orange-and-cream tail, slim graceful build, wearing a light peach-orange wrap draped over the fox body, holding a small pouch in one paw and a blank idea card in the other, clever side-glance smile, orange and warm peach color theme, star-burst sparkle accents, soft warm orange-cream bokeh background`

---


### Big5動物 - ネコ（o-high_c-low_e-low_a-high）

- 性格要約: 独創性×共感力×自由×癒しの自分ペース共感者
- テーマカラー: ピンク #ec4899 / グラデ #fdf2f8→#fce7f3
- キャラ設定: 完全動物ネコ（柔らかな毛並み・丸い耳・細い尾・ネコの顔）。オスはがっちりで頬ふっくら、メスはしなやかで細身
- 小物: 手作りのぬいぐるみ・スケッチノート
- 表情: 穏やかで親しみやすいゆるい笑顔
- ポーズ: 膝を抱えてゆったり座るくつろぎポーズ

【男性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, the character is a complete natural male cat (not a human with animal traits), sitting upright with legs crossed, complete cat body with soft rose-cream fur, cat head with round face, wide gentle eyes and small pink nose (no human face), round soft ears, chubby-cheeked friendly build, slim elegant tail curled around body, wearing a soft pastel pink sweater draped over the cat body, holding a handmade plush toy in paw, relaxed cozy sitting pose, rose pink and cream color theme, soft petal-fall sparkle accents, gentle pink bokeh background`

【女性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, the character is a complete natural female cat (not a human with animal traits), sitting upright with legs folded gracefully, complete cat body with delicate pastel-cream fur and faint tabby markings, cat head with soft round face, large gentle eyes and tiny pink nose (no human face), small round ears, slender elegant build, slim tail curled neatly, wearing a cozy pastel pink knit wrap draped over the cat body, holding a handmade plush toy in paw, relaxed dreamy sitting pose, rose pink and cream color theme, soft petal-fall sparkle accents, gentle pink bokeh background`

---


### Big5動物 - トラ（o-high_c-low_e-low_a-low）

- 性格要約: 独創性×個性×自由×直感の孤独な芸術家
- テーマカラー: アンバー #f59e0b / グラデ #fffbeb→#fde68a
- キャラ設定: 完全動物トラ（オレンジ×黒縞の毛並み・トラの顔・縞模様の尾）。オスは体格大きく縞鮮明、メスは細身で縞やや繊細
- 小物: ヘッドフォン・スケッチブック（黒表紙）
- 表情: 遠くを見る神秘的・内向きの眼差し
- ポーズ: 壁に背中を預けて腕を組む孤高の立ちポーズ

【男性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, the character is a complete natural male tiger (not a human with animal traits), leaning against wall, complete tiger body with bold orange fur and sharp black stripe markings, tiger head with strong square muzzle, piercing amber eyes and prominent whiskers (no human face), large powerful build with thick striped tail, wearing a dark amber scarf loosely draped over the tiger body, large headphones resting around neck, black sketchbook tucked under arm, arms-crossed loner stance, distant mysterious gaze, amber and warm yellow color theme, ember-spark sparkle accents, soft amber bokeh background`

【女性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, the character is a complete natural female tiger (not a human with animal traits), leaning against wall, complete tiger body with slightly lighter orange fur and elegant refined black stripe markings, tiger head with slender muzzle, captivating amber eyes and delicate whiskers (no human face), slender independent build with graceful striped tail, wearing a dark amber wrap draped over the tiger body, large headphones resting around neck, black sketchbook tucked under arm, standing sideways with one paw lightly touching scarf, sharp confident side glance, amber and warm yellow color theme, ember-spark sparkle accents, soft amber bokeh background`

---


### Big5動物 - イヌ（o-low_c-high_e-high_a-high）

- 性格要約: 誠実さ×協調性×責任感×社交性の頼れる存在
- テーマカラー: エメラルドグリーン #10b981 / グラデ #ecfdf5→#d1fae5
- キャラ設定: 完全動物イヌ（温かみのある毛並み・垂れ耳・短い尾・イヌの顔）。オスは体格しっかりで温かい眼差し、メスは細身でかわいらしい表情
- 小物: 部活のビブス・クリップボード
- 表情: 誠実で明るいオープンスマイル
- ポーズ: 右手でサムズアップしながら前に踏み出す

【男性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, the character is a complete natural male dog (not a human with animal traits), stepping forward, complete dog body with warm golden-brown fur, dog head with floppy round ears, warm sincere eyes and a happy open-mouth expression (no human face), sturdy reliable build, fluffy short tail raised, wearing an emerald-green sports vest over the dog body, holding a clipboard in one paw with a thumbs-up paw gesture, sincere bright expression, emerald green and mint color theme, four-pointed star sparkle accents, fresh green bokeh background`

【女性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, the character is a complete natural female dog (not a human with animal traits), stepping forward, complete dog body with lighter warm cream-golden fur, dog head with soft floppy round ears, bright cheerful eyes and a sweet open-mouth smile (no human face), cheerful slender build, fluffy short tail raised happily, wearing a mint-green sports vest over the dog body, holding a clipboard in one paw with a cheerful wave, sincere open expression, emerald green and mint color theme, four-pointed star sparkle accents, fresh green bokeh background`

---


### Big5動物 - オオカミ（o-low_c-high_e-high_a-low）

- 性格要約: 決断力×計画力×行動力×自立心の強さと規律のリーダー
- テーマカラー: スレートブルー #64748b / グラデ #f8fafc→#e2e8f0
- キャラ設定: 完全動物オオカミ（銀灰色の毛並み・尖った耳・ふさふさの尾・オオカミの顔）。オスは体格大きく首周りの毛豊か、メスは細身で鋭い眼光
- 小物: 戦略ノート・万年筆
- 表情: 鋭く決意に満ちた表情
- ポーズ: 腕を組んで全体を見渡すリーダーポーズ

【男性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, the character is a complete natural male wolf (not a human with animal traits), with commanding posture, complete wolf body with thick silver-grey fur and darker back markings, wolf head with pointed muzzle, sharp piercing yellow eyes and prominent ears (no human face), large powerful athletic build, full fluffy silver-grey tail, wearing a slate-blue structured coat with silver trim draped over the wolf body, holding strategy notebook in paw, arms-crossed commanding survey stance, decisive expression, slate blue and silver-grey color theme, crisp moonlight-glint sparkle accents, cool blue-grey bokeh background`

【女性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, the character is a complete natural female wolf (not a human with animal traits), with confident posture, complete wolf body with elegant lighter silver-grey fur with subtle markings, wolf head with slender pointed muzzle, keen sharp eyes and alert ears (no human face), tall confident athletic build, elegant flowing silver-grey tail, wearing a slate-blue fitted coat with silver accent trim draped over the wolf body, holding strategy notebook in paw, arms-crossed commanding survey stance, sharp decisive expression, slate blue and silver-grey color theme, crisp moonlight-glint sparkle accents, cool blue-grey bokeh background`

---


### Big5動物 - ビーバー（o-low_c-high_e-low_a-high）

- 性格要約: 堅実さ×計画力×思いやり×忍耐力のコツコツ名職人
- テーマカラー: ゴールデンブラウン #a16207 / グラデ #fefce8→#fef9c3
- キャラ設定: 完全動物ビーバー（茶色の毛並み・丸い耳・平たいしゃもじ型の尾・ビーバーの顔）。オスはがっちりした体型、メスはふっくら可愛らしい体型
- 小物: 工具ベルト・設計図（丸めた紙）
- 表情: 穏やかで誠実な微笑み
- ポーズ: 設計図を広げて確認する職人ポーズ

【男性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, the character is a complete natural male beaver (not a human with animal traits), standing upright, complete beaver body with thick warm brown fur, beaver head with prominent front teeth, small round ears and bright honest eyes (no human face), stocky reliable build, wide flat paddle-shaped tail, wearing a brown craftsman's work apron strapped over the beaver body, tool belt around waist, holding unrolled blueprint design paper in both paws, calm sincere expression, golden brown and warm yellow color theme, wood-grain texture sparkle accents, soft warm amber bokeh background`

【女性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, the character is a complete natural female beaver (not a human with animal traits), standing upright, complete beaver body with softer warm golden-brown fur, beaver head with neat front teeth, small round ears and warm gentle eyes (no human face), sturdy dependable build with a rounder softer silhouette, flat paddle-shaped tail, wearing a warm brown craftsman's apron over the beaver body, small tool pouch at side, holding unrolled blueprint in both paws, calm sincere expression, golden brown and warm yellow color theme, wood-grain texture sparkle accents, soft warm amber bokeh background`

---


### Big5動物 - ワシ（o-low_c-high_e-low_a-low）

- 性格要約: 完璧主義×集中力×自立心×精度の孤高の完璧主義者
- テーマカラー: スレートグレー #475569 / グラデ #f1f5f9→#e2e8f0
- キャラ設定: 完全動物ワシ（羽毛全身・鋭いくちばし・鷹のような目・翼）。オスは体格大きく羽毛濃い、メスは翼スレンダーで鋭い眼光
- 小物: 精密定規・精密な手書きノート
- 表情: 静かで鋭く集中した無表情気味の目
- ポーズ: 高台から遠くを見渡す静の立ちポーズ

【男性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, the character is a complete natural male eagle (not a human with animal traits), on a rocky elevated platform, complete feathered body with dark brown-black plumage and white head and tail feathers, eagle head with large sharp curved yellow beak and penetrating yellow eyes (no human face), large powerful build with folded wings at sides, holding precise ruler and detailed notebook in taloned hands, static commanding survey stance gazing into the distance, cool slate grey and ice-white color theme, precision-crisp crystal sparkle accents, clean minimal grey-white bokeh background`

【女性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, the character is a complete natural female eagle (not a human with animal traits), on a rocky elevated platform, complete feathered body with slightly lighter brown plumage and crisp white head and tail feathers, eagle head with refined sharp curved beak and keen focused eyes (no human face), slender elegant build with folded wings, one wing half-open into the wind while holding a small blank map card in one talon, refined side-profile survey stance, cool slate grey and ice-white color theme, precision-crisp crystal sparkle accents, clean minimal grey-white bokeh background`

---


### Big5動物 - パンダ（o-low_c-low_e-high_a-high）

- 性格要約: 社交的×癒し×共感力×明るさの場の雰囲気メーカー
- テーマカラー: ミントグリーン #7ec79b / グラデ #f0fdf4→#dcfce7
- キャラ設定: 完全動物パンダ（白黒の毛並み・丸い耳・目の周りの黒い模様・パンダの顔）。オスはがっちりぽっちゃり、メスは丸くてかわいらしい体型
- 小物: マシュマロ入り飲み物・かわいいポーチ
- 表情: みんなを和ませる満面の笑顔
- ポーズ: 両手を振って嬉しそうにアピールするポーズ

【男性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, the character is a complete natural male panda (not a human with animal traits), standing upright, complete panda body with classic black-and-white fur pattern, panda head with large round face, distinctive black eye patches and small black nose (no human face), chubby-cheeked stocky friendly build, short fluffy tail, wearing a mint-green neckerchief over the panda body, both paws waving in a cheerful appeal pose, holding a cute mug with marshmallows in one paw, beaming expression, mint green and cream-white color theme, heart and star sparkle accents, fresh mint-green bokeh background`

【女性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, the character is a complete natural female panda (not a human with animal traits), standing upright, complete panda body with soft black-and-white fur pattern, panda head with round sweet face, soft black eye patches and tiny nose (no human face), round adorable build with a slightly slimmer silhouette, short fluffy tail, wearing a mint-green bow accessory on the head and a cute pouch at side, sitting softly while hugging a small cushion, one paw raised in a tiny shy wave, beaming expression, mint green and cream-white color theme, heart and star sparkle accents, fresh mint-green bokeh background`

---


### Big5動物 - チーター（o-low_c-low_e-high_a-low）

- 性格要約: 瞬発力×行動力×自由×決断力の行動派スプリンター
- テーマカラー: アンバーオレンジ #d97706 / グラデ #fff7ed→#fde68a
- キャラ設定: 完全動物チーター（黄色×黒スポット柄の毛並み・チーターの顔・細く長い尾）。オスは筋肉質でスポット鮮明、メスはしなやかなラインで優雅
- 小物: ストップウォッチ・スニーカー（ハイテク）
- 表情: 直感に従った眩しいスピードスマイル
- ポーズ: 疾走感のあるスタートダッシュポーズ

【男性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, the character is a complete natural male cheetah (not a human with animal traits), in explosive sprint start pose mid-dash, complete cheetah body with vivid golden-yellow fur and clear black spot markings, cheetah head with distinctive black tear-stripe markings from eyes to jaw, sharp focused eyes (no human face), lean aerodynamic muscular build, long agile spotted tail, wearing a sporty amber racing vest strapped over the cheetah body, holding stopwatch in paw, amber orange and yellow color theme, motion-blur speed-line sparkle accents, warm golden bokeh background`

【女性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, the character is a complete natural female cheetah (not a human with animal traits), in a light jumping step pose, one paw lifted playfully, complete cheetah body with lighter golden-cream fur and elegant black spot markings, cheetah head with delicate black tear-stripe markings, bright keen eyes (no human face), slender aerodynamic build, long graceful spotted tail, wearing a light amber racing vest draped over the cheetah body, holding stopwatch in paw, amber orange and yellow color theme, motion-blur speed-line sparkle accents, warm golden bokeh background`

---


### Big5動物 - ウサギ（o-low_c-low_e-low_a-high）

- 性格要約: 温かさ×共感力×穏やかさ×思いやりのそっと寄り添う守り手
- テーマカラー: ライトピンク #f472b6 / グラデ #fdf2f8→#fbcfe8
- キャラ設定: 完全動物ウサギ（柔らかな毛並み・長い垂れ耳・綿のような丸い尾・ウサギの顔）。オスはふっくらした体型、メスは小柄で繊細な体型
- 小物: 温かいティーカップ・小花を束ねた花束
- 表情: 安心させる穏やかな優しい微笑み
- ポーズ: 両手でカップを包み込んで優しく微笑むポーズ

【男性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, the character is a complete natural male rabbit (not a human with animal traits), standing upright, complete rabbit body with soft warm cream-white fur, rabbit head with long floppy ears, round gentle eyes and small twitching nose (no human face), round friendly build with plump cheeks, fluffy cotton-ball tail, wearing a cozy light-pink vest draped over the rabbit body, both paws cupping a warm teacup, small bouquet of flowers beside, gentle calm expression, light pink and blush-white color theme, soft flower-petal sparkle accents, delicate pink bokeh background`

【女性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, the character is a complete natural female rabbit (not a human with animal traits), standing upright, complete rabbit body with delicate pale pink-white fur, rabbit head with long soft floppy ears, large soft eyes and tiny nose (no human face), petite gentle build, fluffy cotton-ball tail, wearing a soft pink floral-patterned wrap draped over the rabbit body, holding a small bouquet close to chest with both paws, one long ear tilted shyly, gentle warm expression, light pink and blush-white color theme, soft flower-petal sparkle accents, delicate pink bokeh background`

---


### Big5動物 - ハリネズミ（o-low_c-low_e-low_a-low）

- 性格要約: 個性×自立心×マイペース×内省の静かな一匹狼
- テーマカラー: ラベンダー #a78bfa / グラデ #f5f3ff→#ede9fe
- キャラ設定: 完全動物ハリネズミ（背中に針・丸い耳・ハリネズミの顔・小柄な体型）。オスは背の針ぴんと立つ、メスは背の針やや短くふんわり感
- 小物: ヘッドフォン・マイワールドを描いたスケッチブック
- 表情: 静かで内向きな、世界観のある表情
- ポーズ: 一人でヘッドフォンしながら空を見上げる内省ポーズ

【男性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, the character is a complete natural male hedgehog (not a human with animal traits), standing upright, complete hedgehog body with cream-white belly fur and dark brown quills covering the back, hedgehog head with small round ears, tiny bright eyes and a pointy snout (no human face), compact independent build with quills prominently raised on the back, large over-ear headphones resting on head, sketchbook of personal world-building art tucked under arm, looking upward in quiet introspective pose, lavender and soft purple color theme, dreamy star and moon sparkle accents, soft lavender bokeh background`

【女性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, the character is a complete natural female hedgehog (not a human with animal traits), standing upright, complete hedgehog body with soft cream belly fur and slightly shorter pale quills on the back, hedgehog head with small delicate round ears, gentle bright eyes and a cute pointy snout (no human face), petite compact build with softer quill arrangement, small headphones around neck, sitting curled with a needle-pouch in paws, looking slightly aside in quiet dreamy introspective pose, lavender and soft purple color theme, dreamy star and moon sparkle accents, soft lavender bokeh background`

---


### 多重知能 - 言語的知能タイプ（Linguistic）

- 性格要約: 言葉で世界を切り拓く知の探究者。読書・文章・議論に優れる
- テーマカラー: スクールブルー (var(--sn-scene-school) → 青系)
- キャラ: フクロウ博士イメージ
- 小物: 本の山・万年筆・ノート
- 表情: 知的で内発的な喜びのある温かい目
- ポーズ: 本を開きながら相手に語りかける伝道師ポーズ

【男性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, male character, owl-inspired intellectual imagery (books, quill pen accessories), warm intellectually-joyful expression, open book in hand gesturing to listener like a storyteller, stack of books and fountain pen, academic blue blazer over light shirt, glasses optional, slender scholarly build, deep blue and cream color theme, glowing letter and word sparkle accents, soft cerulean bokeh background`

【女性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, female character, owl-inspired intellectual imagery (books, feather quill accessories), warm intellectually-joyful expression, open book in hand gesturing to listener like a storyteller, stack of books and fountain pen, academic blue cardigan over blouse, glasses optional, slender scholarly build, deep blue and cream color theme, glowing letter and word sparkle accents, soft cerulean bokeh background`

---


### 多重知能 - 論理数学的知能タイプ（Logical-Mathematical）

- 性格要約: 論理という武器で謎を解き明かす思考者。分析・数字・パターン認識
- テーマカラー: ワークブルー (var(--sn-scene-work) → 青紺系)
- キャラ: チェスのキングイメージ
- 小物: チェスの駒・計算式の浮かぶボード・タブレット
- 表情: 冷静で自信に満ちた思考者の目
- ポーズ: チェスの駒を片手で立てながら戦略を立てる思考ポーズ

【男性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, male character, chess king imagery (chess piece as accessory, floating equation symbols), calm confident analytical expression, strategic thinking pose holding chess king piece upright, equations glowing in background, navy-blue structured jacket with geometric pattern, sleek data-tablet in other hand, logical composed build, dark navy and steel-blue color theme, circuit-line and formula sparkle accents, deep blue bokeh background`

【女性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, female character, chess queen imagery (chess piece as accessory, floating equation symbols), calm confident analytical expression, strategic thinking pose holding chess queen piece upright, equations glowing in background, navy-blue blazer dress with geometric trim, sleek data-tablet in other hand, logical composed build, dark navy and steel-blue color theme, circuit-line and formula sparkle accents, deep blue bokeh background`

---


### 多重知能 - 視空間的知能タイプ（Spatial）

- 性格要約: 見えないものを見える形に変えるビジョンの創造者。色・形・空間認識
- テーマカラー: スクールブルー (var(--sn-scene-school) → 芸術的青)
- キャラ: カメレオン画家イメージ
- 小物: 大きなスケッチパッド・絵の具パレット・細筆
- 表情: 視覚的インスピレーションに輝く目
- ポーズ: 空中を指先でなぞるように構図を測るアーティストポーズ

【男性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, male character, chameleon-painter imagery (color-shifting palette accessories, paint-brush prop), visually-inspired luminous expression, artist framing-composition gesture tracing through air with fingertip, large sketchpad under arm, colorful paint palette, paint-spattered creative casual outfit in teal and turquoise, lithe imaginative build, teal and rainbow-accent color theme, prismatic color-burst sparkle accents, soft painterly bokeh background`

【女性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, female character, chameleon-painter imagery (color-shifting palette accessories, paint-brush in hair), visually-inspired luminous expression, artist framing-composition gesture tracing through air with fingertip, large sketchpad under arm, colorful paint palette, paint-spattered creative outfit with flowy dress in teal and turquoise, lithe imaginative build, teal and rainbow-accent color theme, prismatic color-burst sparkle accents, soft painterly bokeh background`

---


### 多重知能 - 身体運動的知能タイプ（Bodily-Kinesthetic）

- 性格要約: 体が語る、動くことで世界と繋がる身体の達人。運動・手先・身体感覚
- テーマカラー: フレンドグリーン (var(--sn-scene-friend) → 活動的緑)
- キャラ: チーターアスリートイメージ
- 小物: スポーツシューズ・バスケットボールや道具
- 表情: 全力で輝くスポーツマンシップの表情
- ポーズ: 躍動的なジャンプ・スポーツアクションポーズ

【男性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, male character, cheetah-athlete imagery (speed lines, athletic energy), full-power sportsmanship expression, dynamic mid-jump sports action pose, athletic sneakers, basketball or sports equipment, vibrant green-and-white sportswear, muscular athletic build, green and white color theme, kinetic energy motion sparkle accents, fresh grass-green bokeh background`

【女性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, female character, cheetah-athlete imagery (speed lines, athletic energy), full-power sportsmanship expression, dynamic mid-jump sports action pose, athletic sneakers, sports equipment nearby, vibrant green-and-white sporty outfit, toned athletic build, green and white color theme, kinetic energy motion sparkle accents, fresh grass-green bokeh background`

---


### 多重知能 - 音楽的知能タイプ（Musical）

- 性格要約: 音が世界を彩る、感情を音楽で生きる表現者。音・リズム・メロディー感受性
- テーマカラー: ラブピンク (var(--sn-scene-love) → ロマンチックな赤紫)
- キャラ: ナイチンゲールイメージ
- 小物: ヘッドフォン・楽譜・音符が宙に舞う
- 表情: 音楽に没入した恍惚とした表情
- ポーズ: 目を閉じて音楽に浸りながら指揮するようなポーズ

【男性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, male character, nightingale-musician imagery (musical note accessories, floating sheet music), ecstatic music-immersed closed-eyes expression, conducting arms-raised pose as if directing an orchestra, premium headphones around neck, floating musical notes surrounding character, elegant rose-purple music jacket, slim artistic build, rose-purple and deep pink color theme, musical-note and sound-wave sparkle accents, romantic violet bokeh background`

【女性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, female character, nightingale-musician imagery (musical note hair accessories, floating sheet music), ecstatic music-immersed closed-eyes expression, conducting arms-raised pose as if directing an orchestra, premium headphones around neck, floating musical notes surrounding character, elegant rose-purple flowy dress, slim artistic build, rose-purple and deep pink color theme, musical-note and sound-wave sparkle accents, romantic violet bokeh background`

---


### 多重知能 - 対人的知能タイプ（Interpersonal）

- 性格要約: 人の心を読み共に前へ進む、繋がりの達人。共感・リーダーシップ・コミュニケーション
- テーマカラー: フレンドグリーン (var(--sn-scene-friend) → 温かいグリーン系)
- キャラ: イルカリーダーイメージ
- 小物: 話し合いのテーブル・ペン・多様な人々へ手を差し伸べるジェスチャー
- 表情: 開かれた温かさと信頼感あふれる笑顔
- ポーズ: 手を差し伸べてチームを招き入れるリーダーポーズ

【男性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, male character, dolphin-leader imagery (dolphin-wave accessories, connection-motif badge), open warm trustworthy leadership smile, hand extended outward welcoming team gesture, teal-green team leader jacket, clipboard with team notes, communicative confident build, teal green and aqua color theme, heart-connection and handshake sparkle accents, warm teal-green bokeh background`

【女性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, female character, dolphin-leader imagery (dolphin-wave hair clip, connection-motif brooch), open warm trustworthy leadership smile, hand extended outward welcoming team gesture, teal-green blazer with skirt, clipboard with team notes, communicative confident build, teal green and aqua color theme, heart-connection and handshake sparkle accents, warm teal-green bokeh background`

---


### 多重知能 - 内省的知能タイプ（Intrapersonal）

- 性格要約: 自分を知ることが最大の強み。深い自己理解の哲学者。価値観・内省・自律性
- テーマカラー: プライマリー (var(--sn-primary) → 診断ナビブランドカラー 青紫系)
- キャラ: ひとり旅の猫イメージ
- 小物: 日記帳・星空・ひとり旅のバッグ
- 表情: 静かで深く自分と向き合う内省の目
- ポーズ: 夜空を見上げながら日記を書く一人の時間ポーズ

【男性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, male character, solitary-traveler cat imagery (subtle cat-ear beanie, small travel backpack), quiet deep introspective expression gazing upward, sitting alone writing in personal journal diary, soft starlight around, indigo-blue and deep purple travel outfit, calm independent build, indigo and midnight-blue color theme, star and moon sparkle accents, tranquil deep night-sky bokeh background`

【女性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, female character, solitary-traveler cat imagery (subtle cat-ear beanie, small travel backpack), quiet deep introspective expression gazing upward, sitting alone writing in personal journal diary, soft starlight around, indigo-blue and deep purple travel dress with cardigan, calm independent build, indigo and midnight-blue color theme, star and moon sparkle accents, tranquil deep night-sky bokeh background`

---


### 多重知能 - 博物的知能タイプ（Naturalist）

- 性格要約: 自然のパターンを読む万物を分類する観察の達人。自然・生き物・環境への深い洞察
- テーマカラー: フレンドグリーン (var(--sn-scene-friend) → 自然の緑)
- キャラ: 森の賢者ふくろうイメージ
- 小物: 観察日誌・虫眼鏡・植物・押し花
- 表情: 自然に対する純粋な好奇心と深い洞察の眼差し
- ポーズ: 植物を手に持って観察する野外フィールドワークポーズ

【男性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, male character, forest-sage owl imagery (nature leaf accessories, field observer outfit), pure curious nature-wonder expression, outdoor fieldwork pose holding plant specimen for observation, magnifying glass, field observation journal, earthy green field explorer jacket with lots of pockets, grounded nature-connected build, earthy green and brown color theme, leaf and firefly sparkle accents, soft forest-green dappled-light bokeh background`

【女性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, female character, forest-sage owl imagery (pressed flower hair accessories, field observer outfit), pure curious nature-wonder expression, outdoor fieldwork pose holding plant specimen for observation, magnifying glass, field observation journal, earthy green field explorer dress with cargo pockets, grounded nature-connected build, earthy green and brown color theme, leaf and firefly sparkle accents, soft forest-green dappled-light bokeh background`

---


### 血液型診断 - A型（几帳面な調和派）

- 性格要約: 計画的・誠実・細部まで丁寧・調和を大切にする几帳面タイプ
- テーマカラー: 赤系（血液型Aの定番カラー）→ クリムゾンレッド + ホワイト
- 小物: 整理された手帳・チェックリスト・角のそろった書類
- 表情: 誠実で真剣、細部にこだわる丁寧な表情
- ポーズ: 手帳にペンを走らせるきっちりした書き物ポーズ

【男性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, male character representing blood type A personality (meticulous harmonious type), sincere careful detail-oriented expression, organized writing-in-planner pose with perfectly aligned documents, neat crimson-red blazer over perfectly pressed white shirt, checklist clipboard nearby, tidy well-groomed build, crimson red and clean white color theme, check-mark and star sparkle accents, soft red-and-white bokeh background`

【女性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, female character representing blood type A personality (meticulous harmonious type), sincere careful detail-oriented expression, organized writing-in-planner pose with perfectly aligned documents, neat crimson-red blazer over white blouse with ribbon, checklist clipboard nearby, tidy elegant build, crimson red and clean white color theme, check-mark and star sparkle accents, soft red-and-white bokeh background`

---


### 血液型診断 - B型（自由なマイペース探求派）

- 性格要約: 好奇心旺盛・自由・マイペース・直感的・興味一直線の探求タイプ
- テーマカラー: 青系（血液型Bの定番カラー）→ ロイヤルブルー + オレンジアクセント
- 小物: 興味が多方向に広がる本・スマートフォン・趣味グッズ
- 表情: 自由で無邪気な興味津々の表情
- ポーズ: 思いつきで飛び出すような動きのある自由ポーズ

【男性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, male character representing blood type B personality (free-spirited curious self-paced explorer), free uninhibited innocent curiosity expression, spontaneous action-impulse flying-leap free pose, various interest items (books, gadgets, hobby items) floating around, royal blue casual jacket with orange accent details, carefree energetic build, royal blue and bright orange color theme, burst-star and question-mark sparkle accents, vibrant blue bokeh background`

【女性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, female character representing blood type B personality (free-spirited curious self-paced explorer), free uninhibited innocent curiosity expression, spontaneous action-impulse spinning-free pose, various interest items (books, gadgets, hobby items) floating around, royal blue casual jacket with orange accent dress, carefree energetic build, royal blue and bright orange color theme, burst-star and question-mark sparkle accents, vibrant blue bokeh background`

---


### 血液型診断 - O型（頼れる社交的リーダー派）

- 性格要約: 大らか・社交的・リーダーシップ・前向き・大局を見る頼れるタイプ
- テーマカラー: 緑系（血液型Oの定番カラー）→ フォレストグリーン + ゴールドアクセント
- 小物: チームのフラッグ・握手のジェスチャー・トロフィー
- 表情: みんなを巻き込む明るく包容力のある笑顔
- ポーズ: 前へ踏み出してチームを引っ張るリーダーポーズ

【男性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, male character representing blood type O personality (reliable sociable leader type), bright encompassing inclusive smile that pulls everyone along, stepping-forward team-leader pull-ahead pose, team flag or banner, gold trophy visible, forest green athletic leadership jacket with gold accents, broad confident build, forest green and gold color theme, crown and star sparkle accents, warm forest-green bokeh background`

【女性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, female character representing blood type O personality (reliable sociable leader type), bright encompassing inclusive smile that pulls everyone along, stepping-forward team-leader pull-ahead pose, team pennant in hand, gold trophy visible, forest green blazer with gold accent skirt, confident tall build, forest green and gold color theme, crown and star sparkle accents, warm forest-green bokeh background`

---


### 血液型診断 - AB型（独創的な合理派）

- 性格要約: 独創的・合理的・二面性・洞察力・冷静な分析と感性のバランスタイプ
- テーマカラー: 黄色系（血液型ABの定番カラー）→ ゴールデンイエロー + ディープパープルアクセント
- 小物: A面B面を表す二色のデザイン・哲学書・ユニークなアート作品
- 表情: 独自の視点を持つ神秘的な謎めいた微笑み
- ポーズ: 一歩引いて全体を俯瞰する思索家ポーズ

【男性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, male character representing blood type AB personality (creative rational dual-natured type), mysterious enigmatic insightful smile with unique perspective, one-step-back bird's-eye-view philosopher stance, philosophy book, unique dual-tone outfit (golden yellow one side deep purple other side representing dual nature), composed intellectual build, golden yellow and deep purple color theme, dual-diamond sparkle accents, sophisticated golden-purple bokeh background`

【女性版】画像生成プロンプト(EN):
`Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, female character representing blood type AB personality (creative rational dual-natured type), mysterious enigmatic insightful smile with unique perspective, one-step-back bird's-eye-view philosopher stance, philosophy book and unique art piece, dual-tone outfit (golden yellow blouse deep purple skirt representing dual nature), composed intellectual elegant build, golden yellow and deep purple color theme, dual-diamond sparkle accents, sophisticated golden-purple bokeh background`

---


## 星座コスプレ共通キャラクター設定

> 星座12タイプは「占い」ではなく、性格分類を一目で伝える明るい動物・記号コスプレとして生成する。Big5動物とは違い、人間キャラクターが星座モチーフの衣装を着る。神秘・オカルト・宗教・ホラーは禁止。弓矢など武器に見える小物は持たせず、矢羽根・的カードなど安全な記号に置き換える。

| タイプ | 男性版の設計 | 女性版の設計 |
|---|---|---|
| 牡羊座 | 赤茶ショート、白い羊角フード付きスカーレット短丈ジャケット、前へ踏み込むスタートダッシュ姿勢。 | コーラルポニテ、小さな巻き角カチューシャと赤いランナーケープ、片足ジャンプで合図を出す。 |
| 牡牛座 | 深茶ゆる髪、牛角ヘッドバンドとアースグリーンのクラフトエプロン、布を丁寧に選ぶ。 | 蜂蜜ロング、小さな牛角リボンとグリーンのカフェクラフトワンピ、焼き菓子トレーを支える。 |
| 双子座 | 明るい茶髪の左右非対称前髪、青黄ツートーンジャケット、両手に別々の会話カード。 | ミント短めツイン、左右で髪飾り違い、双子風二重リボン衣装、カードを配る。 |
| 蟹座 | ネイビー柔らか髪、蟹のハサミ風ミトンと白銀パーカー、甲羅風ミニバッグを抱える。 | ミルクティーボブ、丸い貝殻ケープと蟹爪リボン、両手を内側に寄せて守るポーズ。 |
| 獅子座 | 金茶ふわ髪、ライオンたてがみフード付きゴールドステージコート、胸を張って片手を上げる。 | オレンジロング、ライオン耳ヘアバンドと金色フリルケープ、斜め立ちで観客へ笑う。 |
| 乙女座 | 黒髪七三、白襟のセージグリーン司書/整理係衣装、箱を整える。 | ダークブラウン三つ編み、乙女のエプロンドレス風ワンピ、ハーブ鉢と小物箱を並べる。 |
| 天秤座 | 薄茶の整った髪、ラベンダー調整役ベスト、左右の丸いバランスチャームを掲げる。 | 青紫ロング、天秤チャーム付きリボンとアイボリースカート、片足を軽く浮かせる。 |
| 蠍座 | 黒赤メッシュ、サソリ尾の飾り紐がついた深紅ジャケット、封筒を片手に静かに構える。 | ワイン色ロング、小さなサソリ尾リボンとネイビーケープ、横顔で鍵チャームを持つ。 |
| 射手座 | 橙髪、矢羽根柄スカーフとターコイズ旅ジャケット、弓矢ではなく的カードを掲げる。 | 赤茶ポニテ、矢羽根ヘアピンと紫トラベルケープ、地図リボンをなびかせる。 |
| 山羊座 | 黒髪、山羊角フードとチャコール登山風ベスト、階段を一段上がる構図。 | ダークブラウンお団子、小さな山羊角カチューシャとゴールドピン付きケープ、達成バッジを胸に持つ。 |
| 水瓶座 | 青髪の片側ハネ、水瓶ショルダーとアクア非対称ジャケット、透明な水流リボンを注ぐように持つ。 | アクアショート、水瓶型ポーチとミント変形ワンピ、波形チャームを宙に並べる。 |
| 魚座 | 青紫ゆる髪、魚ヒレ風ケープとアクアニット、泡型チャームを見上げる。 | ラベンダーロング、魚尾リボンスカートと貝殻ヘアピン、両手で水彩パレットを包む。 |

### 星座生成時の被り防止ルール

- 星座は人間キャラのコスプレ。Big5動物のような完全動物にはしない。
- 牡羊座/牡牛座/獅子座/山羊座は角・たてがみフードなど衣装表現に限定する。
- 蟹座/蠍座/魚座は甲羅・尾・ヒレをアクセサリー化し、怖い生物感を出さない。
- 射手座は武器を持たせず、矢羽根柄、的カード、旅装で表現する。
- カップ、ノート、マイク、タブレットの多用を避け、星座固有の衣装シルエットを主役にする。

### 星座 - 牡羊座（Aries）

- 性格要約: チャレンジが力の源・率直・行動力・先駆者・リーダーシップ
- テーマカラー: 情熱的なスカーレットレッド (#E53935)
- 小物: 羊角フード / 巻き角カチューシャ / スタート合図カード
- 表情: エネルギッシュな前向き笑顔・自信満々
- ポーズ: 男性は前へ踏み込むスタートダッシュ、女性は片足ジャンプで合図

**【男性版】画像生成プロンプト(EN)**:
Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, young male anime character representing Aries personality classification only, not astrology or fortune-telling, red-brown short hair, bold eyebrows, white ram-horn hood attached to a scarlet cropped sporty jacket, bright determined smile, forward stepping start-dash pose with clenched fist, small blank start signal card at waist, energetic red and coral accents, no weapon, no occult mood

**【女性版】画像生成プロンプト(EN)**:
Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, young female anime character representing Aries personality classification only, not astrology or fortune-telling, coral ponytail, small curled ram-horn headband, red runner cape over sporty college outfit, lively confident smile, one-foot jumping pose giving a start signal, dynamic but cute youthful energy, scarlet and coral accents, no weapon, no occult mood

---


### 星座 - 牡牛座（Taurus）

- 性格要約: 安定・信頼・忍耐力・美的センス・誠実さ・大地の守り人
- テーマカラー: アースグリーン (#558B2F) × ゴールドイエロー
- 小物: 牛角ヘッドバンド / 布スワッチ / 焼き菓子トレー
- 表情: 穏やかで温かい微笑み・落ち着いた目
- ポーズ: 男性は布を選ぶ低重心、女性はトレーを支える優雅な立ち姿

**【男性版】画像生成プロンプト(EN)**:
Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; young male anime character representing Taurus personality classification only, dark brown softly wavy hair, gentle thick eyebrows, small bull-horn headband, earth green craft apron over cream shirt, calm reliable smile, grounded low-center stance carefully choosing fabric swatches, warm gold and green accents, cozy but not sleepy, no occult mood

**【女性版】画像生成プロンプト(EN)**:
Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; young female anime character representing Taurus personality classification only, honey-brown long hair, tiny bull-horn ribbon, earth green cafe-craft dress with cream cardigan, soft steady eyes and warm smile, graceful standing pose supporting a small tray of baked sweets, gentle gold and sage accents, stable cozy personality, no occult mood

---


### 星座 - 双子座（Gemini）

- 性格要約: 知的好奇心・コミュニケーション力・柔軟性・社交的・情報の橋渡し役
- テーマカラー: スカイブルー (#29B6F6) × イエロー
- 小物: 左右違いの会話カード / 二重リボン / ペアチャーム
- 表情: 明るく楽しそうな表情・目が輝いている
- ポーズ: 男性は左右のカードを見せる、女性はカードを配る

**【男性版】画像生成プロンプト(EN)**:
Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; young male anime character representing Gemini personality classification only, light brown asymmetrical bangs, sky-blue and yellow two-tone jacket, lively curious eyes, holding two different blank conversation cards left and right, playful half-turn pose as if switching topics, cheerful grin, paired charm accents, no microphone, no occult mood

**【女性版】画像生成プロンプト(EN)**:
Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; young female anime character representing Gemini personality classification only, mint short twin ponytails with mismatched hair clips, twin-ribbon blue-yellow outfit, bright sparkling eyes, handing out small blank cards with one hand while pointing lightly with the other, upbeat social pose, airy blue and yellow accents, no microphone, no occult mood

---


### 星座 - 蟹座（Cancer）

- 性格要約: 深い共感・愛情深さ・感受性・家族愛・守護本能
- テーマカラー: ソフトシルバー (#90CAF9) × パールホワイト
- 小物: 蟹爪ミトン / 甲羅風ミニバッグ / 貝殻ケープ
- 表情: 温かく包み込むような柔らかい笑顔
- ポーズ: 守る・包む姿勢

**【男性版】画像生成プロンプト(EN)**:
Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; young male anime character representing Cancer personality classification only, soft navy hair and gentle eyes, pearl-white hoodie with silver-blue crab-claw mittens, small shell-like backpack, protective pose holding the bag close to chest, caring warm smile, soft blue and pearl accents, friendly crab cosplay, no cup, no occult mood

**【女性版】画像生成プロンプト(EN)**:
Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; young female anime character representing Cancer personality classification only, milk-tea bob, round shell cape and small crab-claw ribbon, pearl-white dress with pale blue accents, arms gently curved inward as if protecting something precious, tender welcoming smile, shell and pearl sparkle motifs, no soup or cup, no occult mood

---


### 星座 - 獅子座（Leo）

- 性格要約: 輝くリーダー・情熱・自己表現・創造性・寛大さ・存在感
- テーマカラー: サンゴールド (#FFB300) × ロイヤルオレンジ
- 小物: ライオンたてがみフード / 金色ケープ / ステージ花
- 表情: 堂々とした自信満々の笑顔・目力が強い
- ポーズ: 男性は胸を張る、女性は斜め立ちで観客へ笑う

**【男性版】画像生成プロンプト(EN)**:
Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; young male anime character representing Leo personality classification only, fluffy golden-brown hair, lion-mane hood attached to gold stage coat, confident golden eyes, proud chest-out pose with one hand raised toward the viewer, brilliant leader smile, warm gold and orange accents, human cosplay not animal body, no occult mood

**【女性版】画像生成プロンプト(EN)**:
Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; young female anime character representing Leo personality classification only, orange long hair, small lion-ear headband and golden frill cape, charismatic bright eyes, elegant diagonal standing pose smiling toward an imagined audience, stage flower accessory, warm gold and amber accents, human cosplay not animal body, no occult mood

---


### 星座 - 乙女座（Virgo）

- 性格要約: 緻密な分析・丁寧さ・完璧主義・サポート力・誠実さ
- テーマカラー: セージグリーン (#A5D6A7) × クリームホワイト
- 小物: 整理箱 / ハーブ鉢 / 小物トレー
- 表情: 真剣で誠実な表情・知的な眼差し
- ポーズ: 丁寧に整える・並べる

**【男性版】画像生成プロンプト(EN)**:
Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; young male anime character representing Virgo personality classification only, neat black side-parted hair, clean white-collar sage green organizer outfit, composed earnest eyes, carefully straightening small storage boxes on a tray, quiet precise pose, cream and sage accents, no planner overuse, no occult mood

**【女性版】画像生成プロンプト(EN)**:
Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; young female anime character representing Virgo personality classification only, dark brown braid, maiden-style apron dress in sage and cream, careful sincere smile, arranging a small herb pot and accessory box with both hands, gentle tidy pose, clean airy green accents, no planner overuse, no occult mood

---


### 星座 - 天秤座（Libra）

- 性格要約: 公正・調和・美的センス・社交性・バランスの達人
- テーマカラー: ラベンダーピンク (#CE93D8) × アイボリー
- 小物: 丸いバランスチャーム / 天秤リボン / アイボリー小物
- 表情: 優雅で柔らかい笑顔・バランスのとれた表情
- ポーズ: 男性は両手で均衡、女性は片足を浮かせた優雅なバランス

**【男性版】画像生成プロンプト(EN)**:
Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; young male anime character representing Libra personality classification only, tidy light brown hair, lavender mediator vest over ivory shirt, calm balanced eyes, holding two round balance charms evenly at left and right, elegant diplomatic smile, symmetrical but light pose, lavender and ivory accents, no courtroom or occult mood

**【女性版】画像生成プロンプト(EN)**:
Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; young female anime character representing Libra personality classification only, blue-purple long hair, ribbon with tiny scale charm, lavender blouse and ivory skirt, graceful one-foot balance pose with soft open hand, charming gentle smile, airy lavender accents, no courtroom or occult mood

---


### 星座 - 蠍座（Scorpio）

- 性格要約: 深い洞察・強い意志・変革・忠誠心・探求者
- テーマカラー: ディープクリムゾン (#880E4F) × ネイビー
- 小物: サソリ尾の飾り紐 / 鍵チャーム / 封筒
- 表情: 鋭い眼差し・静かな強さ・ミステリアスだが親しみやすい
- ポーズ: 静かに構える・横顔で見抜く

**【男性版】画像生成プロンプト(EN)**:
Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; young male anime character representing Scorpio personality classification only, black hair with crimson streak, deep crimson jacket with decorative scorpion-tail cord, sharp but friendly eyes, quiet standing pose holding a sealed blank envelope, subtle confident half-smile, navy and crimson accents, not scary, no occult mood

**【女性版】画像生成プロンプト(EN)**:
Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; young female anime character representing Scorpio personality classification only, wine-red long hair, small scorpion-tail ribbon and navy capelet, perceptive eyes, side-profile pose holding a tiny key charm near chest, composed deep smile, elegant crimson and navy accents, not scary, no occult mood

---


### 星座 - 射手座（Sagittarius）

- 性格要約: 自由・冒険・楽観性・哲学・旅人
- テーマカラー: ロイヤルパープル (#7B1FA2) × ターコイズ
- 小物: 矢羽根スカーフ / 的カード / 地図リボン
- 表情: 開放的で楽しそうな表情・自由な笑顔
- ポーズ: 旅立ちを表す躍動感。武器は持たない

**【男性版】画像生成プロンプト(EN)**:
Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; young male anime character representing Sagittarius personality classification only, orange hair and carefree grin, turquoise travel jacket with purple arrow-feather scarf, holding a blank target card instead of a bow or arrow, forward walking adventure pose, open optimistic eyes, royal purple and turquoise accents, no weapon, no occult mood

**【女性版】画像生成プロンプト(EN)**:
Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; young female anime character representing Sagittarius personality classification only, red-brown ponytail, arrow-feather hairpin and purple travel cape, turquoise map ribbon fluttering in one hand, wind-in-hair pose with bright free smile, adventurous youthful energy, no bow, no arrow, no occult mood

---


### 星座 - 山羊座（Capricorn）

- 性格要約: 野心・自律・責任感・戦略的・着実な努力
- テーマカラー: チャコールグレー (#546E7A) × ゴールド
- 小物: 山羊角フード / 達成バッジ / 登山風ベスト
- 表情: 落ち着いて真剣な表情・信頼感がある
- ポーズ: 登る・一段上がる・目標を見据える

**【男性版】画像生成プロンプト(EN)**:
Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; young male anime character representing Capricorn personality classification only, neat black hair, goat-horn hood and charcoal climbing-style vest with gold trim, calm determined eyes, pose stepping up one simple stair shape, small achievement badge on chest, disciplined reliable mood, charcoal and gold accents, no occult mood

**【女性版】画像生成プロンプト(EN)**:
Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; young female anime character representing Capricorn personality classification only, dark brown bun, tiny goat-horn headband and charcoal cape with gold pin, composed determined smile, holding a small achievement badge close to chest, upright goal-focused pose, refined charcoal and gold accents, no planner overuse, no occult mood

---


### 星座 - 水瓶座（Aquarius）

- 性格要約: 革新・自由・人道主義・独創性・ビジョナリー
- テーマカラー: エレクトリックブルー (#1E88E5) × ミントグリーン
- 小物: 水瓶ショルダー / 水流リボン / 波形チャーム
- 表情: 知的で好奇心旺盛な表情・独特の存在感
- ポーズ: 水流やアイデアを軽く扱う未来的ポーズ

**【男性版】画像生成プロンプト(EN)**:
Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; young male anime character representing Aquarius personality classification only, electric blue side-swept hair, aqua asymmetric jacket and small water-jar shoulder bag, curious intelligent eyes, pose as if pouring a transparent water-stream ribbon from one hand, futuristic but friendly style, blue and mint accents, no occult mood

**【女性版】画像生成プロンプト(EN)**:
Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; young female anime character representing Aquarius personality classification only, aqua short hair, water-jar pouch and mint asymmetric dress, bright curious eyes, arranging small wave-shaped charms in the air with one hand, unique visionary smile, electric blue and mint accents, no tablet overuse, no occult mood

---


### 星座 - 魚座（Pisces）

- 性格要約: 共感・想像力・芸術性・感受性・夢見人
- テーマカラー: アクアマリン (#26C6DA) × ラベンダー
- 小物: 魚ヒレケープ / 泡チャーム / 水彩パレット
- 表情: 夢見るような柔らかい表情・ふんわりした笑顔
- ポーズ: 見上げる・包む・柔らかい横顔

**【男性版】画像生成プロンプト(EN)**:
Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; young male anime character representing Pisces personality classification only, soft blue-purple wavy hair, aqua knit outfit with fish-fin cape, gentle faraway eyes, looking upward at small bubble charms with a dreamy smile, soft relaxed pose, aquamarine and lavender accents, no occult mood

**【女性版】画像生成プロンプト(EN)**:
Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; young female anime character representing Pisces personality classification only, lavender long hair with shell hairpin, fish-tail ribbon skirt and soft aquamarine top, holding a small watercolor palette with both hands, tender dreamy smile, gentle side-facing pose, bubble and fin motifs, aquamarine and lavender accents, no occult mood

---
### 恋愛スタイル - Eros（情熱型）

- 性格要約: 強い情熱・直感・ロマンチック・一目惚れ型・深く愛する
- テーマカラー: バーミリオンレッド (#E53935) × ローズゴールド
- 小物: 赤いバラ / ハートのメッセージカード / キラキラのラッピング
- 表情: 情熱的で輝くような笑顔・目が燃えている
- ポーズ: 胸に手を当てて感情を表現 / 誰かに向けて手を差し伸べる

**【男性版】画像生成プロンプト(EN)**:
Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, young male anime character representing Eros passionate love style personality type, romantic passionate college-aged boy with warm dark brown windswept hair and bright ardent expressive eyes, wearing a deep crimson casual blazer over white shirt, heartfelt pose with one hand over chest and other extended toward viewer as if confessing feelings, glowing confident romantic smile, vermilion red and rose gold accent tones, single red rose and heart message card prop, warm rose-red soft gradient background with floating heart sparkle bokeh,

**【女性版】画像生成プロンプト(EN)**:
Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, young female anime character representing Eros passionate love style personality type, romantic passionate college-aged girl with flowing warm auburn hair with a red rose accent clip, wearing a deep rose-red elegant off-shoulder blouse with flowing skirt, heartfelt pose with both hands clasped at chest and slightly leaning forward showing genuine emotion, glowing romantic smile with passionate bright eyes, vermilion and rose gold accent tones, bouquet of red roses and glittering heart card, warm rose-red gradient background with glowing heart sparkle bokeh,

---


### 恋愛スタイル - Ludus（遊戯型）

- 性格要約: 軽やかで自由・恋愛を楽しむ・束縛を嫌う・ユーモア・距離感重視
- テーマカラー: ビビッドオレンジ (#FB8C00) × イエロー
- 小物: トランプカード / 遊び心のあるアクセサリー / サングラス
- 表情: クールで余裕のある笑顔・チャーミングなウィンク
- ポーズ: 気軽にもたれかかる / 余裕のある軽いポーズ

**【男性版】画像生成プロンプト(EN)**:
Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, young male anime character representing Ludus playful love style personality type, charming free-spirited college-aged boy with casually styled tousled amber-orange hair and relaxed confident eyes with a hint of playfulness, wearing a vibrant orange streetwear jacket over yellow tee, cool casual pose leaning back slightly with arms crossed and one eyebrow slightly raised in a charming playful expression, cool relaxed smirk with winking energy, orange and yellow accent tones, playing card fan held casually in one hand and stylish sunglasses on head, playful orange-yellow gradient background with card-suit motif bokeh,

**【女性版】画像生成プロンプト(EN)**:
Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, young female anime character representing Ludus playful love style personality type, charming free-spirited college-aged girl with bouncy medium amber-orange hair styled in a loose side ponytail, wearing a vibrant orange cropped jacket over yellow graphic tee with wide-leg jeans, cool playful pose leaning casually with one hand on hip and head tilted with a charming wink, confident relaxed smile with sparkling mischievous eyes, orange and sunny yellow accent tones, playful card fan and stylish oversized sunglasses, playful orange-yellow gradient background with sparkle bokeh and card motifs,

---


### 恋愛スタイル - Storge（友愛型）

- 性格要約: 友情から育む愛・安定・信頼・ゆっくり深まる・誠実さ
- テーマカラー: ウォームオリーブ (#8D6E63) × ソフトグリーン
- 小物: 二人分のカフェカップ / 古い写真アルバム / 手書きレター
- 表情: 穏やかで信頼感のある笑顔・温かい眼差し
- ポーズ: 並んで座るように自然体 / 手紙を書いているポーズ

**【男性版】画像生成プロンプト(EN)**:
Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, young male anime character representing Storge friendship-based love style personality type, warm reliable college-aged boy with soft dark olive-brown hair with gentle natural waves and sincere kind eyes, wearing a warm olive green henley sweater with casual jeans, natural relaxed seated pose at a café table holding a warm mug with a photo album open beside him, genuine warm smile radiating trustworthiness, warm olive and soft green accent tones, handwritten letter and two matching café cups, cozy warm olive-green gradient background with soft warm bokeh,

**【女性版】画像生成プロンプト(EN)**:
Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, young female anime character representing Storge friendship-based love style personality type, warm reliable college-aged girl with medium-length soft dark olive-brown hair in a natural loose style with a small green leaf hairpin, wearing a warm olive knit cardigan over sage green blouse and comfortable skirt, natural cozy seated pose with a handwritten letter in hand and open photo album on the table, genuine warm smile with kind steady eyes, warm olive and soft green accent tones, two matching tea cups and small potted plant, cozy warm olive-green gradient background with soft warm bokeh,

---


### 恋愛スタイル - Pragma（実利型）

- 性格要約: 現実的・価値観重視・将来設計・冷静な判断・賢明な恋愛設計者
- テーマカラー: ティールグリーン (#00695C) × シルバーグレー
- 小物: デイリープランナー / タブレット（ライフプラン） / シンプルな時計
- 表情: 知的で冷静な笑顔・信頼感がある
- ポーズ: 計画書を確認するポーズ / 腕を組んで考える姿

**【男性版】画像生成プロンプト(EN)**:
Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, young male anime character representing Pragma practical love style personality type, thoughtful pragmatic college-aged boy with neatly styled dark teal-toned black hair and calm intelligent eyes, wearing a teal-green collared shirt under a sleek gray blazer, composed thoughtful pose with arms lightly crossed reviewing a life-planning tablet, calm composed smile with steady analytical gaze, teal and silver-gray accent tones, slim designer planner and minimalist watch accessory, clean teal-slate gradient background with subtle geometric pattern bokeh,

**【女性版】画像生成プロンプト(EN)**:
Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, young female anime character representing Pragma practical love style personality type, thoughtful pragmatic college-aged girl with sleek dark teal-toned black hair in a polished low ponytail, wearing a teal-green structured blouse with silver-gray tailored skirt, composed professional pose holding a slim planner open with stylus in hand, calm intelligent smile with steady clear eyes, teal and silver-gray accent tones, slim designer tablet and elegant minimalist watch, clean teal-silver gradient background with subtle geometric bokeh,

---


### 恋愛スタイル - Mania（感情型）

- 性格要約: 感情豊か・強い意識・愛の深さを全力で感じる・真剣さ・感情の波
- テーマカラー: マゼンタピンク (#AD1457) × コーラル
- 小物: 日記 / 感情を表すハートのチャーム / にぎやかなメッセージカード
- 表情: 豊かな感情表現・どきどきした表情・目に感情が溢れる
- ポーズ: 感情を込めて胸に手を当てる / 感情の波を表現する動きのあるポーズ

**【男性版】画像生成プロンプト(EN)**:
Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, young male anime character representing Mania emotionally intense love style personality type (sincere deeply feeling type, not negative depiction), emotionally expressive college-aged boy with tousled dark magenta-tinted brown hair and large soulful emotive eyes that show deep feeling, wearing a coral-pink casual jacket over white shirt, heartfelt emotional pose with both hands held to chest showing genuine deep sincerity, earnest heartfelt expression with slightly watery warm eyes full of emotion, magenta and coral accent tones, personal diary with heart charm bookmark, warm magenta-coral gradient background with soft glowing heart bokeh,

**【女性版】画像生成プロンプト(EN)**:
Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, young female anime character representing Mania emotionally intense love style personality type (sincere deeply feeling type, not negative depiction), emotionally expressive college-aged girl with flowing wavy dark magenta-tinted hair pinned with a coral flower clip, wearing a magenta-pink flutter-sleeve top and flowing coral skirt, expressive emotional pose with hands clasped at chest showing deep genuine sincerity, earnest heartfelt expression with emotive sparkling eyes, magenta and coral accent tones, personal diary decorated with heart stickers and heart charm, warm magenta-coral gradient background with gentle glowing heart bokeh,

---


### 恋愛スタイル - Agape（献身型）

- 性格要約: 見返りを求めない・深く静かな無償の愛・包容力・誠実さ・相手の幸せを優先
- テーマカラー: ピュアホワイト (#E3F2FD) × ソフトゴールド
- 小物: 白い鳩のモチーフ / 手作りのプレゼント / 柔らかいブランケット
- 表情: 穏やかで深い安心感を与える笑顔・慈愛に満ちた目
- ポーズ: 両手を優しく広げる包み込むようなポーズ / 静かに佇む

**【男性版】画像生成プロンプト(EN)**:
Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, young male anime character representing Agape unconditional love style personality type, deeply devoted selfless college-aged boy with soft white-silver tinted gentle hair and warm caring eyes radiating quiet inner peace, wearing a pure white loose knit sweater with soft gold accents, gentle welcoming pose with both arms slightly open as if embracing the world with unconditional care, serene deeply warm smile showing selfless love, white and soft gold accent tones, handcrafted gift box wrapped with white ribbon and small dove motif ornament, serene pure white-gold gradient background with soft gentle light bloom bokeh,

**【女性版】画像生成プロンプト(EN)**:
Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, young female anime character representing Agape unconditional love style personality type, deeply devoted selfless college-aged girl with long flowing soft white-silver hair adorned with a small white flower crown, wearing a pure white flowing dress with delicate gold trim, gentle graceful pose with both arms slightly open and hands turned upward in a welcoming gesture of unconditional giving, serene deeply warm smile with kind luminous eyes, white and soft gold accent tones, handcrafted ribbon-wrapped gift and dove feather motif ornament, serene pure white-gold gradient background with soft glowing light bloom,

---


### 友達相性 - ムードメーカー型（Mood Maker）

- 性格要約: 場を明るくする・みんなの太陽・外向的・盛り上げ役
- テーマカラー: サニーイエロー (#FFEE58) × オレンジ
- 小物: メガフォン / カラフルな風船 / パーティーハット
- 表情: 爆発的な笑顔・目がキラキラ輝く
- ポーズ: 両手を高く上げて盛り上げるポーズ / ジャンプしている躍動感

**【男性版】画像生成プロンプト(EN)**:
Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, young male anime character representing Mood Maker friend personality type, energetic upbeat college-aged boy with spiky bright yellow-tinted brown hair and hugely expressive laughing eyes, wearing a sunny yellow hoodie over an orange graphic shirt with jeans, explosive jump pose with both arms raised high and wide grin showing sheer joy and enthusiasm, radiant beaming smile with sparkling happy eyes, sunny yellow and orange accent tones, colorful balloons and small megaphone prop, vibrant sunny yellow-orange gradient background with confetti and sparkle bokeh burst,

**【女性版】画像生成プロンプト(EN)**:
Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, young female anime character representing Mood Maker friend personality type, energetic upbeat college-aged girl with voluminous bouncy bright yellow-orange highlighted hair in a high ponytail with colorful hair ties, wearing a sunny yellow cropped top over orange cardigan with bright jeans, dynamic jumping pose with arms up and wide ecstatic grin bursting with joy, radiant beaming smile with hugely expressive sparkling eyes, sunny yellow and orange accent tones, colorful balloons bouquet and party popper, vibrant yellow-orange gradient background with confetti sparkle burst bokeh,

---


### 友達相性 - 聴き上手型（Compassionate Listener）

- 性格要約: 安心感・共感力・深い一対一の関係・友人の安全な場所
- テーマカラー: スカイブルー (#80DEEA) × ソフトラベンダー
- 小物: ティーカップ / やわらかいクッション / 日記帳
- 表情: 温かく包み込む優しい笑顔・柔らかい眼差し
- ポーズ: 耳を傾けるように少し前傾み / 膝に手をおいて穏やかに座る

**【男性版】画像生成プロンプト(EN)**:
Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, young male anime character representing Compassionate Listener friend personality type, gentle empathetic college-aged boy with soft wavy sky-blue tinted dark hair and deeply kind attentive eyes, wearing a soft sky blue knit sweater with lavender scarf, gentle seated pose leaning slightly forward with hands clasped on knees in an attentive listening posture, warm genuine soft smile radiating safety and trust, sky blue and soft lavender accent tones, steaming tea cup and small comfort journal on the side, tranquil sky blue-lavender gradient background with soft gentle bokeh,

**【女性版】画像生成プロンプト(EN)**:
Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, young female anime character representing Compassionate Listener friend personality type, gentle empathetic college-aged girl with soft medium-length sky-blue tinted dark hair tucked behind ear with a small lavender flower pin, wearing a soft sky blue loose blouse with lavender soft skirt, gentle seated pose leaning slightly forward in an attentive listening posture with hands softly resting on lap, warm genuine smile with deeply kind attentive eyes, sky blue and lavender accent tones, steaming tea cup on saucer and soft comfort journal, tranquil sky blue-lavender gradient background with soft gentle light bokeh,

---


### 友達相性 - 仕切り屋型（Natural Leader）

- 性格要約: グループを動かす頼れるリーダー・計画力・決断力・行動力
- テーマカラー: コバルトブルー (#1565C0) × ネオンイエロー
- 小物: クリップボード / スケジュール表 / メガフォン
- 表情: 頼りがいのある自信満々の笑顔・力強い目
- ポーズ: 腕を伸ばして指示するリーダーポーズ / 自信を持って立つ

**【男性版】画像生成プロンプト(EN)**:
Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, young male anime character representing Natural Leader friend personality type, decisive commanding college-aged boy with neatly styled cobalt-navy hair with a confident undercut and sharp determined eyes, wearing a cobalt blue team jacket with yellow accent stripe, strong authoritative standing pose with one arm extended forward in a rallying leadership gesture, broad reliable smile radiating trustworthiness and confidence, cobalt blue and neon yellow accent tones, clipboard with event schedule and small whistle, bold cobalt blue-yellow gradient background with energetic light streak bokeh,

**【女性版】画像生成プロンプト(EN)**:
Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, young female anime character representing Natural Leader friend personality type, decisive commanding college-aged girl with sleek cobalt-navy hair in a sharp high ponytail with a yellow scrunchie, wearing a cobalt blue sporty blazer with yellow piping over white tee, strong confident standing pose with one hand on hip and other extended forward in a decisive rallying gesture, broad reliable smile with sharp determined eyes, cobalt blue and yellow accent tones, clipboard event planner and team megaphone, bold cobalt-yellow gradient background with energetic light streak bokeh,

---


### 友達相性 - 一匹狼型（Independent Spirit）

- 性格要約: 自分軸・少数の深い絆・独自の視点・本物の友情を選ぶ
- テーマカラー: スレートブルー (#455A64) × シルバー
- 小物: ヘッドフォン / 本 / 独自のスケッチノート
- 表情: クールで落ち着いた表情・芯の強さが見える眼差し
- ポーズ: 壁にもたれて本を読む / 自分のペースで静かに立つ

**【男性版】画像生成プロンプト(EN)**:
Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, young male anime character representing Independent Spirit friend personality type, cool self-reliant college-aged boy with naturally styled slate-gray tinted dark hair with a confident inner strength look, wearing a slate blue-gray minimal jacket over dark tee, cool relaxed pose leaning against a soft background surface reading an open book with earphones in, subtle composed half-smile with steady self-assured eyes showing quiet inner strength, slate blue and silver accent tones, worn personal sketchbook and over-ear headphones, calm slate-silver gradient background with subtle quiet bokeh,

**【女性版】画像生成プロンプト(EN)**:
Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, young female anime character representing Independent Spirit friend personality type, cool self-reliant college-aged girl with straight slate-gray tinted dark hair cut at the shoulder with a small silver clip, wearing a slate blue-gray minimal longline coat over fitted black turtleneck, cool composed standing pose with book held under one arm and over-ear headphones resting on neck, subtle composed smile with steady self-assured eyes, slate blue and silver accent tones, personal sketchbook and wireless headphones, calm slate-silver gradient background with subtle quiet bokeh,

---


### 友達相性 - 同調型（Empathetic Harmonizer）

- 性格要約: 空気を読む・縁の下の力持ち・グループの和を大切にする・穏やかな調整役
- テーマカラー: ソフトミント (#B2DFDB) × ピーチ
- 小物: 橋渡しを表す小物（手紙の束） / 平和のシンボル（花）/ 付箋ノート
- 表情: 穏やかで包容力のある笑顔・安心感を与える目
- ポーズ: 両手を前に出して和らげるポーズ / 柔らかく微笑んで立つ

**【男性版】画像生成プロンプト(EN)**:
Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, young male anime character representing Empathetic Harmonizer friend personality type, gentle peacekeeping college-aged boy with soft mint-tinted dark hair with a naturally peaceful expression, wearing a soft mint green casual sweater with peach scarf, calm mediating pose with both hands gently raised forward in a gentle calming gesture, soft warm reassuring smile with kind peaceful eyes, mint green and peach accent tones, small bundle of handwritten notes and a soft flower, serene mint-peach gradient background with soft gentle floating petal bokeh,

**【女性版】画像生成プロンプト(EN)**:
Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, young female anime character representing Empathetic Harmonizer friend personality type, gentle peacekeeping college-aged girl with soft wavy mint-tinted dark hair adorned with a peach flower hairpin, wearing a soft mint green flowy blouse and peach pleated skirt, calm graceful mediating pose with both hands gently extended forward in a welcoming calming gesture, soft warm reassuring smile with kind caring eyes, mint green and peach accent tones, small handwritten note bundle and small floral bouquet, serene mint-peach gradient background with soft floating petal bokeh,

---


### 友達相性 - 知性派型（Thoughtful Analyst）

- 性格要約: 深い思考・洞察・本質を語る・静かなる知の探求者
- テーマカラー: ディープパープル (#4527A0) × スレートグレー
- 小物: 分厚い専門書 / 望遠鏡モチーフ / 思考を表すチェス駒
- 表情: 思慮深い表情・静かな知的な眼差し
- ポーズ: 顎に手を当てて考えているポーズ / 本を開いたまま空を見上げる

**【男性版】画像生成プロンプト(EN)**:
Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, young male anime character representing Thoughtful Analyst friend personality type, intellectually deep college-aged boy with neat deep purple-tinted dark hair and sharp thoughtful perceptive eyes behind thin wire-frame glasses, wearing a deep indigo-purple tailored shirt under a slate gray cardigan, composed thoughtful pose with one hand resting under chin in classic thinking gesture while holding an open academic book, subtle intelligent half-smile with deep observant eyes, deep purple and slate gray accent tones, thick academic book and small chess knight piece, sophisticated deep purple-slate gradient background with subtle geometric sparkle bokeh,

**【女性版】画像生成プロンプト(EN)**:
Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, young female anime character representing Thoughtful Analyst friend personality type, intellectually deep college-aged girl with sleek deep purple-tinted dark hair styled in a precise side-parted bun with thin wire-frame glasses, wearing a deep indigo-purple turtleneck under slate gray blazer, composed thoughtful seated pose with one hand under chin and open academic book on her lap, subtle intelligent smile with sharp perceptive eyes, deep purple and slate gray accent tones, thick hardcover book and chess bishop piece, sophisticated deep purple-slate gradient background with subtle geometric sparkle bokeh,

---


### 恋愛依存 - 安定型（Secure）

- 性格要約（愛着理論ベース）: 自分と相手を信頼できる・安定した愛着パターン・健全な距離感・感情を適切に表現できる
- テーマカラー: トラストグリーン (#43A047) × ウォームクリーム
- 小物: コーヒーカップ（2つ） / バランスのとれた天秤のインテリア / 安定感を表す木のオブジェ
- 表情: 穏やかで自信に満ちた温かい笑顔・安定感がある
- ポーズ: ゆったりと落ち着いて立つ / 肩の力が抜けたリラックスポーズ

**【男性版】画像生成プロンプト(EN)**:
Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, young male anime character representing Secure attachment style personality type (based on Bowlby attachment theory, not medical diagnosis), emotionally secure grounded college-aged boy with naturally styled warm green-tinted dark hair and calm confident kind eyes, wearing a trust-green casual knit sweater with cream chinos, relaxed comfortable standing pose with shoulders naturally down showing inner security and ease, genuine warm confident smile radiating stability and trustworthiness, green and cream accent tones, two matching coffee cups and a small balanced wooden desk ornament, warm trust-green cream gradient background with gentle soft bokeh,

**【女性版】画像生成プロンプト(EN)**:
Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, young female anime character representing Secure attachment style personality type (based on Bowlby attachment theory, not medical diagnosis), emotionally secure grounded college-aged girl with naturally styled medium-length warm green-tinted dark hair with a cream scrunchie, wearing a trust-green soft blouse with cream cardigan and comfortable skirt, relaxed comfortable standing pose with a warm natural ease in her posture, genuine warm confident smile with calm steady eyes, green and cream accent tones, two matching mugs and small balanced wooden ornament, warm green-cream gradient background with gentle soft bokeh,

---


### 恋愛依存 - 不安型（Anxious）

- 性格要約（愛着理論ベース）: 相手への強い意識・関係への敏感さ・確認欲求・深く愛したい気持ち・感情豊か
- テーマカラー: コーラルオレンジ (#FF7043) × ソフトイエロー
- 小物: スマートフォン（通知を見ている） / ハートのクッション / 感情日記
- 表情: 少し心配そうだが愛情深い表情・不安の中にある温かさ
- ポーズ: スマホを胸に当てて少し前かがみ / 待っているような不安とときめきが混在するポーズ

**【男性版】画像生成プロンプト(EN)**:
Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, young male anime character representing Anxious attachment style personality type (based on Bowlby attachment theory, sympathetic positive depiction, not medical diagnosis), emotionally sensitive warmly caring college-aged boy with slightly tousled coral-tinted brown hair and large expressive eyes showing gentle concern mixed with warmth, wearing a coral-orange casual hoodie with soft yellow inner shirt, pose with phone held gently to chest and slight forward lean showing tender anticipation and caring, warm caring expression with slightly concerned but loving eyes, coral orange and soft yellow accent tones, heart-shaped decorative pillow and personal emotion journal, warm coral-yellow soft gradient background with gentle warm bokeh,

**【女性版】画像生成プロンプト(EN)**:
Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, young female anime character representing Anxious attachment style personality type (based on Bowlby attachment theory, sympathetic positive depiction, not medical diagnosis), emotionally sensitive warmly caring college-aged girl with slightly wavy coral-tinted auburn hair with a yellow flower clip, wearing a coral-orange ruffle blouse with soft yellow skirt, gentle pose hugging a heart-shaped cushion with phone in one hand and slightly forward-leaning tender expression mixing anticipation and care, warm caring expression with gentle expressive concerned-but-loving eyes, coral and soft yellow accent tones, heart cushion and decorated emotion diary, warm coral-yellow gradient background with gentle warm bokeh,

---


### 恋愛依存 - 回避型（Avoidant）

- 性格要約（愛着理論ベース）: 自立を大切にする・感情的距離の調整・個人空間を尊重・一人の時間も充実
- テーマカラー: クールアイスブルー (#0288D1) × シルバーグレー
- 小物: ヘッドフォン / 独自の趣味グッズ（本・アウトドア） / 一人用コーヒーカップ
- 表情: 落ち着いてクールな表情・内面の豊かさが見える
- ポーズ: 自分のスペースで快適にくつろぐ / 少し距離を置いた自立したポーズ

**【男性版】画像生成プロンプト(EN)**:
Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, young male anime character representing Avoidant attachment style personality type (based on Bowlby attachment theory, positive self-reliant depiction, not medical diagnosis), independent self-sufficient college-aged boy with sleek cool ice-blue tinted dark hair and calm composed self-contained eyes, wearing a cool sky-blue windbreaker with silver-gray joggers, comfortable self-contained standing pose with headphones around neck and one hand in pocket showing quiet self-sufficiency, cool composed half-smile showing inner contentment and independence, ice blue and silver-gray accent tones, over-ear headphones and solo travel paperback book, cool ice-blue silver gradient background with calm minimal crisp bokeh,

**【女性版】画像生成プロンプト(EN)**:
Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, young female anime character representing Avoidant attachment style personality type (based on Bowlby attachment theory, positive self-reliant depiction, not medical diagnosis), independent self-sufficient college-aged girl with sleek straight ice-blue tinted dark hair cut to shoulder with a simple silver pin, wearing a cool sky-blue longline jacket with silver-gray wide-leg trousers, comfortable self-contained standing pose with wireless earbuds in and slim book tucked under arm showing quiet independence, cool composed smile with calm self-assured eyes, ice blue and silver-gray accent tones, wireless earbuds and minimal solo travel book, cool ice-blue silver gradient background with calm crisp minimal bokeh,

---


### 恋愛依存 - 共依存型（Codependent）

- 性格要約（愛着理論ベース）: 深い思いやり・献身性・相手中心の傾向・強い絆への欲求・自己ケアを学ぶ成長過程
- テーマカラー: ウォームマゼンタ (#AD1457) × ソフトピーチ
- 小物: 大きなハートのぬいぐるみ / お揃いのグッズ / 手作りのプレゼント
- 表情: 思いやりに溢れた表情・相手を思う温かみ・少し頑張りすぎている
- ポーズ: 大きなプレゼントや手作りグッズを抱える / 両手でハートを作る

**【男性版】画像生成プロンプト(EN)**:
Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, young male anime character representing Codependent attachment tendency personality type (based on attachment theory, compassionate positive depiction showing deep caring and ongoing growth, not medical diagnosis), deeply caring devoted college-aged boy with warm magenta-tinted brown hair and expressive eyes full of genuine heartfelt warmth and care for others, wearing a warm magenta casual sweater with peach inner shirt, earnest pose holding a large handmade gift with both arms showing deep devotion and giving spirit, caring devoted smile with warmth-filled eyes showing genuine affection, magenta and soft peach accent tones, large heart-shaped handmade gift wrap and matching friendship bracelet, warm magenta-peach gradient background with soft glowing heart bokeh,

**【女性版】画像生成プロンプト(EN)**:
Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, young female anime character representing Codependent attachment tendency personality type (based on attachment theory, compassionate positive depiction showing deep caring and ongoing growth, not medical diagnosis), deeply caring devoted college-aged girl with flowing warm magenta-tinted brown hair adorned with a peach flower clip, wearing a warm magenta ruffle blouse with peach soft skirt, earnest pose making a heart shape with both hands raised showing genuine devoted warmth, caring devoted smile with warmhearted expressive eyes full of genuine affection, magenta and soft peach accent tones, matching friendship bracelets and handmade decorated gift, warm magenta-peach gradient background with soft glowing heart bokeh,

---


## 血液型サブタイプ（12タイプ・追加）

> 診断ナビ 血液型サブタイプ診断の追加12タイプ × 男女2版 = **24体**。
> 既存168体と合算して合計 **192体**。
> 能見正比古系・古川竹二系の気質語彙とBig5傾向に基づく分類。占い・神秘主義表現は使用しない。
> 同一血液型の3サブタイプは親カラーを共有し、小物・表情・ポーズでサブタイプ差分を表現（コレクション統一感）。

---

### 血液型サブタイプ共通キャラクター設定（追加12タイプ）

血液型サブタイプは「日本の文化的な血液型性格分類を、Big5傾向で細分化した自己理解キャラ」として扱う。医学・体質・血液そのものを連想させる表現は使わない。

#### 血液型サブタイプ生成時の男女差分ルール
同一サブタイプでも男女で同じ立ち姿・同じ小物の持ち方・同じ服装シルエットにしない。男性版は直線的/実務的/動きのある構図、女性版は柔らかい/整理された/手元中心の構図など、サブタイプごとに見せ方を分ける。既存の個別プロンプトに似たポーズがある場合は、この設定表を優先して描き分ける。

- A型グループ: 深紅＋白。几帳面・責任感・繊細さを、整理小物や端正な姿勢で表現。
- B型グループ: 黄＋橙。自由・好奇心・マイペースさを、趣味小物や動きのある構図で表現。
- O型グループ: 金＋クリーム。大らかさ・社交性・リーダー性を、広い姿勢や包容力で表現。
- AB型グループ: 紫＋銀。合理性・独創性・二面性を、左右非対称の衣装や知的/創作小物で表現。
- 禁止: 血液、注射、医療器具、病院、検査、赤い液体、体質・健康を示す演出。

| サブタイプ | 男性版キャラ設定 | 女性版キャラ設定 | 差別化ポイント |
|---|---|---|---|
| A-typical / 典型A型 | 深紅ベストの几帳面な記録係。短く整えた黒髪、まっすぐな姿勢、手帳と細ペンを正面で持つ。 | 白リボン＋深紅カーデの整理上手。きっちり結んだ髪、タブ付きノートを胸に抱く。 | A型の基準キャラ。端正・清潔・静かな信頼感。 |
| A-active / 行動A型 | 深紅ポロ＋白ラインのチーム進行係。前傾姿勢で片手を上げ、プロジェクトバインダーを持つ。 | 深紅ブラウスの協調リーダー。軽く巻いた髪、親指を立ててスケジュール冊子を持つ。 | A型の几帳面さに外向性を追加。表情を明るく。 |
| A-inner / 内省A型 | 白ニット＋深紅スカーフの静かな思索家。窓辺に座り、日記とティーカップ。 | 白ロングカーデ＋深紅インナー。詩集を抱き、光の方を見る繊細な表情。 | A型の内面処理。座り構図と柔らかい視線。 |
| B-typical / 典型B型 | 黄橙の自由な旅好き。くせ毛、カメラ付きバッグ、軽く跳ねる歩きポーズ。 | 明るい黄色ワンピ＋橙ベルト。サイドポニー、インスタントカメラを持つ。 | B型の自由さを一番強く。動きと好奇心。 |
| B-social / 協調B型 | オレンジパーカーの社交派。片手を振り、シェア用ギフト袋を持つ。 | 黄色カーデのグループ好き。両手で小さなお菓子箱を差し出す。 | 自由さ＋人懐っこさ。周囲へ開いたポーズ。 |
| B-focused / 集中B型 | 黄橙ジャケットの趣味探求者。ヘッドホン、片手に専門道具、視線は一点集中。 | オレンジエプロンの集中クリエイター。机に向かい、趣味ノートと道具を並べる。 | B型のマイペースを「集中力」として表現。 |
| O-typical / 典型O型 | 金色アクセントの頼れるまとめ役。広い肩幅、片手を大きく広げる。 | クリームトップス＋金リボン。明るい笑顔で皆を呼ぶようなポーズ。 | O型の社交性・包容力の基準。大きな構図。 |
| O-gentle / 温和O型 | クリームニットの聞き役。両手でマグを持ち、少し前かがみで安心感。 | 柔らかい金茶髪、ティーカップを差し出す見守り係。 | O型の大らかさを穏やかに。低刺激で温かい。 |
| O-explorer / 探究O型 | 金系フィールドジャケットの探究者。コンパスとフィールドノート、歩き出す姿。 | クリームキャップ＋金系ユーティリティ。地図カードを見ながら遠くを見る。 | O型の行動力を知的探究に寄せる。 |
| AB-typical / 典型AB型 | 紫銀の二面性ある知識人。片目にかかる髪、二色ノートとペン、片手ポケット。 | 紫銀ヘアクリップ、深紫ブラウス。二色ノートを開き、静かな半笑み。 | AB型の合理＋独創の基準。左右非対称。 |
| AB-empathy / 共感AB型 | 紫のアーティストスモック。スケッチブックとイヤホン、柔らかい共感表情。 | 銀紫のアートチュニック。座って水彩パレットを使う、やさしい目。 | AB型の感性面。創作小物で柔らかく。 |
| AB-analyst / 分析AB型 | 紫シャツ＋銀小物のデータ分析家。細い眼鏡、ノートPCと定規、冷静な横顔。 | 紫ブレザー＋銀ピンの分析担当。端正な髪、キーボードに手を置く集中顔。 | AB型の論理面。感情より精密さ。 |
### 血液型サブタイプ - A型 典型A型（A-typical）

- 性格要約: 几帳面・規律重視・責任感が強い。Big5では誠実性が高く、情緒安定性も中程度。秩序を好み、計画通りに物事を進めることに満足を見出す。
- 親血液型テーマカラー継承: 深紅（#C62828）＋ 白（#FAFAFA）
- サブタイプ個性: 「典型」として最も整然とした印象。ノート・手帳・ペンを几帳面に使う姿。表情は穏やかで真剣、姿勢は正しい。

**【男性版】画像生成プロンプト(EN)**:
Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, young male anime character representing Type-A Typical blood-type personality subtype (personality classification only, not medical), meticulous conscientious college-aged boy with neatly combed dark hair with a subtle deep-crimson tint and calm sincere focused eyes, wearing a crisp white button-up shirt under a deep crimson vest with a small enamel pin, in a composed reliable posture holding a neatly organized planner open to a checklist page, precise earnest expression radiating dependability and order, deep crimson and clean white accent tones, well-organized planner and fine-tip pen set, clean white background with soft deep-crimson geometric bokeh accents; negative: chibi, super-deformed, 2-3 head ratio, mascot, flat vector style, photorealistic, 3D render, dark, horror, occult, astrology mysticism, fortune-telling, real brand logos, watermark, in-image text, uncanny valley, gritty texture, cluttered background

**【女性版】画像生成プロンプト(EN)**:
Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, young female anime character representing Type-A Typical blood-type personality subtype (personality classification only, not medical), meticulous conscientious college-aged girl with neatly tied-back dark hair with a subtle deep-crimson sheen and a small white ribbon, calm sincere focused eyes, wearing a crisp white blouse under a deep crimson cardigan with a small badge, seated at a tidy desk arranging color-coded blank tab cards into a small organizer tray, precise earnest expression radiating reliability and calm order, deep crimson and clean white accent tones, small organizer tray, blank tab cards and fine-tip pen, clean white background with soft deep-crimson geometric bokeh accents; negative: chibi, super-deformed, 2-3 head ratio, mascot, flat vector style, photorealistic, 3D render, dark, horror, occult, astrology mysticism, fortune-telling, real brand logos, watermark, in-image text, uncanny valley, gritty texture, cluttered background

---

### 血液型サブタイプ - A型 行動A型（A-active）

- 性格要約: A型らしい慎重さと計画性に外向性が加わったタイプ。誠実性が高い中で協調性・外向性も高め。社交的だが場を乱さず、周囲に気を配りながら積極的に動く。
- 親血液型テーマカラー継承: 深紅（#C62828）＋ 白（#FAFAFA）
- サブタイプ個性: 外向きの積極さを表すため前向きなポーズ・笑顔。チームノートやスケジュール帳、集団への働きかけを象徴する小物。

**【男性版】画像生成プロンプト(EN)**:
Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, young male anime character representing Type-A Active blood-type personality subtype (personality classification only, not medical), sociable conscientious college-aged boy with slightly styled dark hair with a subtle deep-crimson highlight and bright warm eyes showing friendly determination, wearing a neat deep-crimson polo shirt with white trim, energetic forward-leaning stance with one hand raised in a positive let-us-go gesture while holding a team project binder, cheerful reliable smile radiating organized enthusiasm, deep crimson and white accent tones, team project folder and neatly scheduled planner, crisp white background with soft deep-crimson radiant bokeh; negative: chibi, super-deformed, 2-3 head ratio, mascot, flat vector style, photorealistic, 3D render, dark, horror, occult, astrology mysticism, fortune-telling, real brand logos, watermark, in-image text, uncanny valley, gritty texture, cluttered background

**【女性版】画像生成プロンプト(EN)**:
Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, young female anime character representing Type-A Active blood-type personality subtype (personality classification only, not medical), sociable conscientious college-aged girl with lightly curled dark hair with a subtle deep-crimson sheen and a cheerful white bow, bright warm friendly eyes, wearing a neat deep-crimson blouse with white accents, side-facing active coordinator pose handing out a blank schedule card while holding a slim team pouch at her side, cheerful reliable smile radiating organized enthusiasm and social warmth, deep crimson and white accent tones, blank schedule cards and slim team pouch, crisp white background with warm deep-crimson radiant bokeh; negative: chibi, super-deformed, 2-3 head ratio, mascot, flat vector style, photorealistic, 3D render, dark, horror, occult, astrology mysticism, fortune-telling, real brand logos, watermark, in-image text, uncanny valley, gritty texture, cluttered background

---

### 血液型サブタイプ - A型 内省A型（A-inner）

- 性格要約: A型の繊細さと内向性が強く出たタイプ。Big5では開放性・神経症傾向がやや高め。感受性豊かで思慮深く、内面で丁寧に物事を処理する。
- 親血液型テーマカラー継承: 深紅（#C62828）＋ 白（#FAFAFA）
- サブタイプ個性: 内向きを表す読書・日記・一人の時間の小物。表情は穏やかで少し遠くを見る眼差し。

**【男性版】画像生成プロンプト(EN)**:
Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, young male anime character representing Type-A Introspective blood-type personality subtype (personality classification only, not medical), sensitive thoughtful introverted college-aged boy with softly falling dark hair with a gentle deep-crimson tint and calm deep reflective eyes, wearing a soft white knit sweater with a subtle deep-crimson scarf, seated quietly with an open personal journal in his lap and a cup of tea on a small side table, gentle introspective expression gazing softly toward a window with quiet inner depth, deep crimson and soft white accent tones, handwritten personal journal and ceramic tea cup, soft white misty background with delicate deep-crimson cherry blossom petal bokeh; negative: chibi, super-deformed, 2-3 head ratio, mascot, flat vector style, photorealistic, 3D render, dark, horror, occult, astrology mysticism, fortune-telling, real brand logos, watermark, in-image text, uncanny valley, gritty texture, cluttered background

**【女性版】画像生成プロンプト(EN)**:
Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, young female anime character representing Type-A Introspective blood-type personality subtype (personality classification only, not medical), sensitive thoughtful introverted college-aged girl with softly flowing dark hair with a gentle deep-crimson sheen and a small white flower hairpin, calm deep reflective eyes, wearing a soft white long cardigan with a subtle deep-crimson inner blouse, standing beside a softly lit bookshelf cradling a closed poetry anthology to her chest with a gentle contemplative expression gazing into the soft light, deep crimson and soft white accent tones, poetry book and small porcelain teacup, soft white background with delicate deep-crimson petal bokeh; negative: chibi, super-deformed, 2-3 head ratio, mascot, flat vector style, photorealistic, 3D render, dark, horror, occult, astrology mysticism, fortune-telling, real brand logos, watermark, in-image text, uncanny valley, gritty texture, cluttered background

---

### 血液型サブタイプ - B型 典型B型（B-typical）

- 性格要約: マイペース・好奇心旺盛・自由を愛する。Big5では外向性と開放性が高め。束縛を嫌い、興味の赴くまま行動するエネルギッシュな自由人。
- 親血液型テーマカラー継承: 黄（#F9A825）＋ 橙（#E65100）
- サブタイプ個性: 最も自由奔放な印象。好奇心を象徴する乗り物グッズ・カメラ・各地のお土産。軽やかで弾けた笑顔とポーズ。

**【男性版】画像生成プロンプト(EN)**:
Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, young male anime character representing Type-B Typical blood-type personality subtype (personality classification only, not medical), free-spirited curious energetic college-aged boy with loosely tousled bright hair with a sunny yellow-orange highlight and sparkling mischievous lively eyes, wearing a casual bright orange graphic tee with yellow shorts and a light open shirt, dynamic carefree pose mid-stride or jumping slightly with a compact travel camera slung over one shoulder and a keychain charm collection dangling from a bag, wide bright adventurous grin radiating spontaneous free energy, golden yellow and vivid orange accent tones, compact camera and eclectic keychain charms, bright sunny yellow-orange gradient background with playful scattered sparkle bokeh; negative: chibi, super-deformed, 2-3 head ratio, mascot, flat vector style, photorealistic, 3D render, dark, horror, occult, astrology mysticism, fortune-telling, real brand logos, watermark, in-image text, uncanny valley, gritty texture, cluttered background

**【女性版】画像生成プロンプト(EN)**:
Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, young female anime character representing Type-B Typical blood-type personality subtype (personality classification only, not medical), free-spirited curious energetic college-aged girl with loosely styled bright hair with sunny yellow-orange streaks and a playful side ponytail with a sun charm, sparkling mischievous lively eyes, wearing a breezy bright yellow sundress with an orange belt and colorful friendship bracelets, dynamic carefree pose with arms spread wide holding a small instant camera, wide bright adventurous grin radiating spontaneous free-spirited energy, golden yellow and vivid orange accent tones, instant camera and cheerful charm accessories, bright sunny yellow-orange gradient background with playful scattered sparkle bokeh; negative: chibi, super-deformed, 2-3 head ratio, mascot, flat vector style, photorealistic, 3D render, dark, horror, occult, astrology mysticism, fortune-telling, real brand logos, watermark, in-image text, uncanny valley, gritty texture, cluttered background

---

### 血液型サブタイプ - B型 協調B型（B-social）

- 性格要約: B型の自由さに協調性が加わった社交的なタイプ。外向性・協調性ともに高め。柔軟に周囲に合わせながら自分らしさも失わない、場を明るくする存在。
- 親血液型テーマカラー継承: 黄（#F9A825）＋ 橙（#E65100）
- サブタイプ個性: グループゲーム・みんなへのお土産・チームカラーのグッズで「みんなと一緒の自由人」を表現。

**【男性版】画像生成プロンプト(EN)**:
Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, young male anime character representing Type-B Cooperative blood-type personality subtype (personality classification only, not medical), flexible sociable cheerful college-aged boy with softly styled hair with a warm orange highlight and friendly open laughing eyes, wearing a warm orange casual hoodie with a small yellow patch badge, relaxed inclusive pose with one arm reaching out in a welcoming wave while holding a bag of snacks or small gifts to share, bright friendly social smile showing warmth and easy-going charm, golden yellow and warm orange accent tones, a bag of shareable snacks and a colourful group event wristband, warm orange-yellow gradient background with friendly soft round bokeh; negative: chibi, super-deformed, 2-3 head ratio, mascot, flat vector style, photorealistic, 3D render, dark, horror, occult, astrology mysticism, fortune-telling, real brand logos, watermark, in-image text, uncanny valley, gritty texture, cluttered background

**【女性版】画像生成プロンプト(EN)**:
Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, young female anime character representing Type-B Cooperative blood-type personality subtype (personality classification only, not medical), flexible sociable cheerful college-aged girl with lightly wavy hair with a warm orange highlight and a matching scrunchie, friendly open sparkling eyes, wearing a warm orange off-shoulder top with a yellow skirt and colourful charm bracelet, relaxed inclusive pose holding a pretty gift bag for friends with a bright welcoming smile, social warmth and easy-going flexibility in her expression, golden yellow and warm orange accent tones, charming gift bag and colourful group wristband, warm orange-yellow gradient background with friendly soft round bokeh; negative: chibi, super-deformed, 2-3 head ratio, mascot, flat vector style, photorealistic, 3D render, dark, horror, occult, astrology mysticism, fortune-telling, real brand logos, watermark, in-image text, uncanny valley, gritty texture, cluttered background

---

### 血液型サブタイプ - B型 集中B型（B-focused）

- 性格要約: B型の強烈な興味追求が職人気質へと昇華したタイプ。開放性・誠実性ともに高め。好きなことへの一点集中と深い探究心が特徴。
- 親血液型テーマカラー継承: 黄（#F9A825）＋ 橙（#E65100）
- サブタイプ個性: 工具・ルーペ・専門機材など「ひとつのことを深掘り」を象徴する小物。集中した横顔や作業中ポーズ。

**【男性版】画像生成プロンプト(EN)**:
Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, young male anime character representing Type-B Focused blood-type personality subtype (personality classification only, not medical), intensely curious craftsman-spirited college-aged boy with loosely tied-back dark hair with a golden-amber highlight and sharp deeply focused eyes, wearing a warm yellow rolled-sleeve work shirt with an orange apron, absorbed side-view or three-quarter pose leaning intently over a detailed hobby project (model circuit board or intricate mechanical gadget) holding a small precision tool, expression of complete absorbed concentration and quiet passion, golden amber and rich orange accent tones, precision tool set and detailed hobby project, warm amber-orange gradient background with focused sharp minimal bokeh; negative: chibi, super-deformed, 2-3 head ratio, mascot, flat vector style, photorealistic, 3D render, dark, horror, occult, astrology mysticism, fortune-telling, real brand logos, watermark, in-image text, uncanny valley, gritty texture, cluttered background

**【女性版】画像生成プロンプト(EN)**:
Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, young female anime character representing Type-B Focused blood-type personality subtype (personality classification only, not medical), intensely curious craftsman-spirited college-aged girl with hair neatly tied up with a golden-amber clip to keep it out of the way, sharp deeply focused eyes, wearing a warm yellow work blouse with a practical orange apron, absorbed pose leaning closely over a delicate handcraft or intricate art project (fine illustration or detailed embroidery) with a precision pen in hand, expression of complete absorbed concentration and quiet creative passion, golden amber and rich orange accent tones, fine precision pen set and detailed handcraft work, warm amber-orange gradient background with crisp focused minimal bokeh; negative: chibi, super-deformed, 2-3 head ratio, mascot, flat vector style, photorealistic, 3D render, dark, horror, occult, astrology mysticism, fortune-telling, real brand logos, watermark, in-image text, uncanny valley, gritty texture, cluttered background

---

### 血液型サブタイプ - O型 典型O型（O-typical）

- 性格要約: 社交的・リーダー気質・包容力が高い。Big5では外向性・協調性ともに高め。自然体でグループの中心になり、誰をも受け入れる大らかさを持つ。
- 親血液型テーマカラー継承: 金（#F57F17）＋ クリーム（#FFF8E1）
- サブタイプ個性: 「典型リーダー」として旗・トロフィー・メガホンなどリーダーシップを象徴する小物。堂々とした立ち姿と温かい笑顔。

**【男性版】画像生成プロンプト(EN)**:
Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, young male anime character representing Type-O Typical blood-type personality subtype (personality classification only, not medical), charismatic sociable natural-leader college-aged boy with confident tousled golden-tinted dark hair and warm broad inviting eyes full of inclusive energy, wearing a rich gold casual jacket over a cream shirt, confident upright leader pose with one arm raised in an energetic rally gesture and the other resting on hip, wide warm magnetic smile radiating natural confidence and generous inclusivity, gold and soft cream accent tones, small team pennant flag and a well-worn leadership notebook, warm golden-cream gradient background with radiant sunburst bokeh; negative: chibi, super-deformed, 2-3 head ratio, mascot, flat vector style, photorealistic, 3D render, dark, horror, occult, astrology mysticism, fortune-telling, real brand logos, watermark, in-image text, uncanny valley, gritty texture, cluttered background

**【女性版】画像生成プロンプト(EN)**:
Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, young female anime character representing Type-O Typical blood-type personality subtype (personality classification only, not medical), charismatic sociable natural-leader college-aged girl with confident wavy golden-tinted dark hair with a cream ribbon, warm broad inviting eyes full of inclusive energy, wearing a rich gold blazer over a cream dress, open welcoming host pose with both hands gently inviting people in while a small team pennant rests at her side, wide warm magnetic smile radiating natural confidence and generous leadership, gold and soft cream accent tones, side team pennant, small welcome cards and leadership planner, warm golden-cream gradient background with radiant sunburst bokeh; negative: chibi, super-deformed, 2-3 head ratio, mascot, flat vector style, photorealistic, 3D render, dark, horror, occult, astrology mysticism, fortune-telling, real brand logos, watermark, in-image text, uncanny valley, gritty texture, cluttered background

---

### 血液型サブタイプ - O型 温和O型（O-gentle）

- 性格要約: O型の温かさに協調性が強く出た支援型タイプ。協調性・情緒安定性が高め。聞き上手で相手の立場に立つことができ、周囲から信頼される安心感の存在。
- 親血液型テーマカラー継承: 金（#F57F17）＋ クリーム（#FFF8E1）
- サブタイプ個性: 支援・傾聴を象徴するティーセット・大きなクッション・やわらかな笑顔とゆったりとした姿勢。

**【男性版】画像生成プロンプト(EN)**:
Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, young male anime character representing Type-O Gentle blood-type personality subtype (personality classification only, not medical), warm supportive empathetic college-aged boy with softly falling golden-tinted dark hair and kind calm attentive listening eyes, wearing a soft cream knit sweater with gold small details, relaxed seated welcoming posture leaning slightly forward with both hands around a warm mug as if ready to listen to a friend, soft reassuring genuine smile radiating warmth steadiness and trustworthy calm support, gold and warm cream accent tones, two warm mugs on a small table and a soft knit cushion, warm cream golden gradient background with gentle warm light-bloom bokeh; negative: chibi, super-deformed, 2-3 head ratio, mascot, flat vector style, photorealistic, 3D render, dark, horror, occult, astrology mysticism, fortune-telling, real brand logos, watermark, in-image text, uncanny valley, gritty texture, cluttered background

**【女性版】画像生成プロンプト(EN)**:
Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, young female anime character representing Type-O Gentle blood-type personality subtype (personality classification only, not medical), warm supportive empathetic college-aged girl with softly wavy golden-tinted dark hair with a cream bow and kind calm attentive eyes, wearing a soft cream oversized blouse with a delicate gold necklace, gentle standing support pose offering a warm tea mug with both hands as if welcoming a friend, soft reassuring gentle smile radiating warmth stability and quiet trustworthy support, gold and warm cream accent tones, matching warm tea mugs and a soft knit cushion on the side, warm cream golden gradient background with gentle warm bloom bokeh; negative: chibi, super-deformed, 2-3 head ratio, mascot, flat vector style, photorealistic, 3D render, dark, horror, occult, astrology mysticism, fortune-telling, real brand logos, watermark, in-image text, uncanny valley, gritty texture, cluttered background

---

### 血液型サブタイプ - O型 探究O型（O-explorer）

- 性格要約: O型の独立心と知的好奇心が強いタイプ。外向性は中程度、開放性が高め。マイペースな探究者として、自分の興味に従い行動範囲を広げていく。
- 親血液型テーマカラー継承: 金（#F57F17）＋ クリーム（#FFF8E1）
- サブタイプ個性: 地図・コンパス・フィールドノートで「独立した知的探索者」を表現。ひとりで自信ある歩みのポーズ。

**【男性版】画像生成プロンプト(EN)**:
Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, young male anime character representing Type-O Explorer blood-type personality subtype (personality classification only, not medical), independently curious intellectually adventurous college-aged boy with slightly windswept golden-tinted dark hair and bright inquisitive self-assured eyes, wearing a relaxed gold-toned field jacket over a cream inner shirt with a small compass pin on the lapel, self-assured stride pose with an open field notebook in one hand and a vintage-style compass in the other, calm confident adventurous half-smile with a faraway look of curiosity, gold and warm cream accent tones, vintage compass and hand-drawn field notes, warm golden-cream open-sky background with soft nature-inspired light bokeh; negative: chibi, super-deformed, 2-3 head ratio, mascot, flat vector style, photorealistic, 3D render, dark, horror, occult, astrology mysticism, fortune-telling, real brand logos, watermark, in-image text, uncanny valley, gritty texture, cluttered background

**【女性版】画像生成プロンプト(EN)**:
Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, young female anime character representing Type-O Explorer blood-type personality subtype (personality classification only, not medical), independently curious intellectually adventurous college-aged girl with slightly windswept golden-tinted dark hair with a practical cream field cap, bright inquisitive self-assured eyes, wearing a relaxed gold-toned utility jacket with cream inner, a small compass charm on a necklace, self-assured walking pose with open field notebook and a hand-held vintage compass, calm confident adventurous half-smile showing independent curiosity and quiet determination, gold and warm cream accent tones, vintage compass and hand-drawn field notes, warm golden-cream open-sky background with soft breeze-light bokeh; negative: chibi, super-deformed, 2-3 head ratio, mascot, flat vector style, photorealistic, 3D render, dark, horror, occult, astrology mysticism, fortune-telling, real brand logos, watermark, in-image text, uncanny valley, gritty texture, cluttered background

---

### 血液型サブタイプ - AB型 典型AB型（AB-typical）

- 性格要約: 合理的・独創的・冷静な二面性タイプ。Big5では開放性が高く誠実性も中程度。論理と感性の両方を使いこなす、ミステリアスな知識人。
- 親血液型テーマカラー継承: 紫（#6A1B9A）＋ 銀（#B0BEC5）
- サブタイプ個性: 「典型的AB型」として二面性を象徴する鏡・2色のインク・デュアルノート。クールで飄々とした表情。

**【男性版】画像生成プロンプト(EN)**:
Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, young male anime character representing Type-AB Typical blood-type personality subtype (personality classification only, not medical), rational creative dual-natured college-aged boy with elegant slightly-long silver-purple tinted dark hair partly covering one eye and sharp calm analytical eyes that hint at hidden depth, wearing a sophisticated deep purple high-collar shirt with silver-gray slim trousers, cool composed standing pose with one hand holding an open dual-color notebook (purple on one side, silver on the other) and the other hand resting in pocket, enigmatic calm half-smile radiating quiet intellectual confidence and creative mystery, deep purple and metallic silver accent tones, dual-color open notebook and a sleek fountain pen, elegant purple-silver gradient background with subtle prismatic crystal bokeh; negative: chibi, super-deformed, 2-3 head ratio, mascot, flat vector style, photorealistic, 3D render, dark, horror, occult, astrology mysticism, fortune-telling, real brand logos, watermark, in-image text, uncanny valley, gritty texture, cluttered background

**【女性版】画像生成プロンプト(EN)**:
Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, young female anime character representing Type-AB Typical blood-type personality subtype (personality classification only, not medical), rational creative dual-natured college-aged girl with elegantly styled silver-purple tinted dark hair with a small purple-silver dual-tone clip, sharp calm analytical eyes conveying quiet depth, wearing a sophisticated deep purple fitted blouse with a silver-gray long cardigan, composed seated pose sorting two-tone blank idea cards on a small desk while a slender fountain pen rests near her fingers, enigmatic calm half-smile radiating quiet intellectual confidence and subtle creative mystery, deep purple and metallic silver accent tones, two-tone blank idea cards and slender pen, elegant purple-silver gradient background with subtle prismatic crystal bokeh; negative: chibi, super-deformed, 2-3 head ratio, mascot, flat vector style, photorealistic, 3D render, dark, horror, occult, astrology mysticism, fortune-telling, real brand logos, watermark, in-image text, uncanny valley, gritty texture, cluttered background

---

### 血液型サブタイプ - AB型 共感AB型（AB-empathy）

- 性格要約: AB型の独創性に情緒・共感性が加わった感性派タイプ。協調性・開放性が高め。論理的でありながら人の気持ちに敏感で、芸術的な感受性を持つ。
- 親血液型テーマカラー継承: 紫（#6A1B9A）＋ 銀（#B0BEC5）
- サブタイプ個性: スケッチブック・水彩絵の具・音楽イヤフォンなど感性を象徴する小物。柔らかな表情と創造的なポーズ。

**【男性版】画像生成プロンプト(EN)**:
Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, young male anime character representing Type-AB Empathic blood-type personality subtype (personality classification only, not medical), creatively sensitive empathetic college-aged boy with softly falling silver-lavender tinted hair with a subtle wave and gentle expressive eyes filled with emotional depth and artistic perception, wearing a loose deep purple artist smock over a soft silver-gray shirt, relaxed creative pose with a large open sketchbook displaying delicate pencil art and wireless earbuds around neck suggesting music inspiration, soft warm sensitive smile showing empathy and inner creative world, deep lavender-purple and soft silver accent tones, open sketchbook and portable watercolour set, soft dreamy purple-silver background with gentle pastel watercolour wash bokeh; negative: chibi, super-deformed, 2-3 head ratio, mascot, flat vector style, photorealistic, 3D render, dark, horror, occult, astrology mysticism, fortune-telling, real brand logos, watermark, in-image text, uncanny valley, gritty texture, cluttered background

**【女性版】画像生成プロンプト(EN)**:
Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, young female anime character representing Type-AB Empathic blood-type personality subtype (personality classification only, not medical), creatively sensitive empathetic college-aged girl with softly flowing silver-lavender tinted hair with a small artistic paint-stained clip, gentle expressive eyes filled with emotional depth and artistic perception, wearing a loose deep purple artist tunic over soft silver-gray wide trousers, relaxed creative pose seated cross-legged with an open large sketchbook on lap and a small watercolour palette beside her, soft warm sensitive smile showing empathy and inner creative richness, deep lavender-purple and soft silver accent tones, open sketchbook and small watercolour palette, soft dreamy purple-silver background with gentle pastel watercolour wash bokeh; negative: chibi, super-deformed, 2-3 head ratio, mascot, flat vector style, photorealistic, 3D render, dark, horror, occult, astrology mysticism, fortune-telling, real brand logos, watermark, in-image text, uncanny valley, gritty texture, cluttered background

---

### 血液型サブタイプ - AB型 分析AB型（AB-analyst）

- 性格要約: AB型の論理性が突出した分析家タイプ。Big5では誠実性・開放性が高く外向性は低め。データと証拠に基づいて判断し、感情より事実を重視する。
- 親血液型テーマカラー継承: 紫（#6A1B9A）＋ 銀（#B0BEC5）
- サブタイプ個性: グラフ・データビジュアライゼーション・ラップトップなど「データ志向」を象徴する小物。冷静で鋭い視線の分析ポーズ。

**【男性版】画像生成プロンプト(EN)**:
Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, young male anime character representing Type-AB Analytical blood-type personality subtype (personality classification only, not medical), data-driven logical precision-minded college-aged boy with neatly combed silver-purple tinted dark hair and sharp intensely focused analytical eyes behind sleek rimless glasses, wearing a crisp deep purple slim-fit button-down shirt with silver cufflinks, composed seated or standing pose with a slim open laptop displaying clean data charts and graphs and one hand resting on chin in analytical thought, cool precise expression of calm focused data-analysis with minimal visible emotion, deep purple and sharp silver accent tones, slim laptop showing data visualisations and a silver precision ruler on the desk, clean deep-purple silver gradient background with sharp geometric grid-line bokeh; negative: chibi, super-deformed, 2-3 head ratio, mascot, flat vector style, photorealistic, 3D render, dark, horror, occult, astrology mysticism, fortune-telling, real brand logos, watermark, in-image text, uncanny valley, gritty texture, cluttered background

**【女性版】画像生成プロンプト(EN)**:
Modern Japanese clean anime character illustration for a web diagnosis site, natural 6-6.5 head proportion, youthful university-student character, balanced anime face with clear eyes and soft cheeks, clean delicate line art, smooth cel-shading with light gradients, bright fresh airy color palette, simple UI-friendly polish; the character embodies the personality type through pose, outfit and expression; simple soft pastel background; 1:1 square composition; character centered with generous padding; SNS-ready; unified consistent illustration style across the entire collection, young female anime character representing Type-AB Analytical blood-type personality subtype (personality classification only, not medical), data-driven logical precision-minded college-aged girl with neatly pulled-back silver-purple tinted dark hair in a precise bun with a minimalist silver pin and sharp intensely focused analytical eyes behind sleek rimless glasses, wearing a crisp deep purple tailored blazer over a silver-gray blouse, composed upright seated pose with a slim laptop open to detailed data charts and one hand poised over the keyboard with focused precision, cool sharp analytical expression with calm controlled eyes, deep purple and sharp silver accent tones, slim laptop with data charts and a silver mechanical pencil, clean deep-purple silver gradient background with sharp geometric grid-line bokeh; negative: chibi, super-deformed, 2-3 head ratio, mascot, flat vector style, photorealistic, 3D render, dark, horror, occult, astrology mysticism, fortune-telling, real brand logos, watermark, in-image text, uncanny valley, gritty texture, cluttered background

---

## 診断別カウント（追記後・合計192体）

| 診断 | タイプ | 男女 | 計 |
|---|---:|---|---:|
| MBTI | 16 | ×2 | 32 |
| Big5動物 | 16 | ×2 | 32 |
| 星座 | 12 | ×2 | 24 |
| 多重知能 | 8 | ×2 | 16 |
| 恋愛スタイル | 6 | ×2 | 12 |
| 友達相性 | 6 | ×2 | 12 |
| DiSC | 4 | ×2 | 8 |
| 完璧主義 | 4 | ×2 | 8 |
| 金銭感覚 | 4 | ×2 | 8 |
| 恋愛依存 | 4 | ×2 | 8 |
| 血液型（基本4タイプ） | 4 | ×2 | 8 |
| **血液型サブタイプ（新規）** | **12** | **×2** | **24** |
| **合計** | **96** | **×2** | **192** |
