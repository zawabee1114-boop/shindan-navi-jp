# Big5画像生成プロンプト集（完全動物版）

診断ナビ Big5動物 16タイプ x 男女2版 = 32枚の生成用プロンプト仕様。
セッションが切れても同じ方針で生成できるように、今回固めたルールを集約する。

## 固定ルール

- Big5は完全動物。擬人化、二足歩行、服、人間の手足は禁止。
- 四足動物は自然な四足、鳥は翼と脚、イルカは水中体型、タコは8本触腕。
- 画像は `1:1 square composition` で生成し、納品は `1024x1024 PNG`。
- キャラは中央配置。頭、耳、尻尾、翼、足先を切らない。
- 背景は白から薄いパステル。複雑な背景、床面、濃いグラデーションは禁止。
- 性格表現は表情、耳、尻尾、翼、触腕、姿勢、小さなチャーム、足元小物、背景記号で行う。
- 星座キャラの動物コスプレとは混ぜない。Big5は人間キャラではない。

## 共通スタイル

```text
bright modern Japanese anime animal illustration for a web diagnosis UI, complete natural animal character, natural animal anatomy, species-accurate body, animal head and animal face, cute but natural animal, clean thin line art, smooth cel shading, soft white or pale pastel background, 1:1 square composition, character centered with generous padding, minimal sparkles, polished UI-friendly look
```

## 共通ネガティブ

```text
anthropomorphic humanoid, bipedal human-like pose, human body, human arms, human hands, human legs, human hair, human clothing, hoodie, jacket, robe, dress, animal ears on human, kemonomimi, mascot suit, plush toy, chibi, super-deformed, realistic wildlife photo, photorealistic, dark fantasy, horror, occult, readable text, logo, watermark, extra limbs, duplicated paws, malformed anatomy
```

## コピペ用テンプレート

`<TYPE_NAME>`, `<GENDER>`, `<ANIMAL_SPEC>`, `<PERSONALITY>`, `<POSE_AND_PROPS>`, `<PALETTE>` を下の差分表から入れる。

```text
Create one shindan-navi style Big5 animal character: <TYPE_NAME> <GENDER>.

Subject: <ANIMAL_SPEC>. This is a complete natural animal character, not anthropomorphic. Natural animal anatomy, species-accurate body, animal head and animal face. No human body, no human hands, no human legs, no human hair, no clothing.

Personality: <PERSONALITY>. Express this through <POSE_AND_PROPS>.

Style: bright modern Japanese anime animal illustration for a web diagnosis UI, cute but natural animal, clean thin line art, smooth cel shading, 1:1 square composition, centered with generous padding, white or pale pastel background, minimal sparkles, polished UI-friendly look. Color mood: <PALETTE>.

Avoid: anthropomorphic humanoid, bipedal pose, human body, human arms, human hands, human legs, human clothing, animal ears on human, kemonomimi, extra limbs, duplicated paws, malformed anatomy, mascot, plush toy, chibi, realistic wildlife photo, dark fantasy, readable text, logo, watermark.
```

## 差分表 32体

| ファイル名 | TYPE_NAME / GENDER | ANIMAL_SPEC | PERSONALITY | POSE_AND_PROPS | PALETTE |
|---|---|---|---|---|---|
| big5-lion-male-1024.png | Lion King male | male lion, four legs, paws, lion head and face, golden fur, full mane, long tail | confident leader, proud, protective, reliable | proud relaxed standing pose, chest forward, calm leader expression, bright confident eyes, tiny gold charm near the neck | gold, warm cream |
| big5-lion-female-1024.png | Lion King female | female lioness, four legs, paws, lioness head and face, tawny fur, no mane, long tail | elegant leader, protective, calm, graceful | elegant side-facing standing pose, warm confident eyes, calm protective expression, tiny thin gold ribbon collar | tawny gold, cream |
| big5-falcon-male-1024.png | Falcon male | male falcon, falcon head and beak, feathered body, two wings, two bird legs and talons | fast decision-maker, sharp, focused, action-oriented | forward-looking perch pose with wings half-open, sharp bright eyes, wind sparkle accents near the wings | blue-gray, sky blue |
| big5-falcon-female-1024.png | Falcon female | female falcon, falcon head and beak, feathered body, two wings, two bird legs and talons | quick, graceful, decisive, independent | light takeoff pose, wings spread clearly, keen eyes looking upward, small pale blue charm near the perch | pale blue-gray, sky blue |
| big5-owl-male-1024.png | Owl Doctor male | owl, round facial disk, feathered body, two wings, two bird legs and talons | calm, wise, thoughtful, gentle | natural perch pose on a simple branch, calm wise eyes, tiny book-shaped charm near the branch | warm brown, cream, lavender |
| big5-owl-female-1024.png | Owl Doctor female | smaller fluffy owl, round facial disk, feathered body, two wings, two bird legs and talons | quiet, wise, warm, careful | relaxed perch pose, large warm eyes, small closed book charm beside the branch | soft brown, cream, lavender |
| big5-octopus-male-1024.png | Octopus Doctor male | octopus, round body, exactly 8 tentacles, natural octopus anatomy, friendly intelligent eyes | multi-angle thinker, curious, inventive, analytical | floating pose in pale aqua water, 8 tentacles gently arranged, blank color-card charms floating nearby | purple, aqua |
| big5-octopus-female-1024.png | Octopus Doctor female | pale-purple octopus, round body, exactly 8 slender tentacles, natural octopus anatomy | creative, careful, flexible, thoughtful | elegant floating pose, 8 tentacles neatly arranging blank color chips, soft curious eyes | lavender, aqua |
| big5-dolphin-male-1024.png | Dolphin male | dolphin, streamlined body, dolphin head and face, flippers, dorsal fin, tail flukes | social, cheerful, free, energetic | lively water-surface jump, bright friendly eyes, clean curved body silhouette, aqua bubbles and wave sparkles | sky blue, aqua |
| big5-dolphin-female-1024.png | Dolphin female | dolphin, streamlined body, dolphin head and face, flippers, dorsal fin, tail flukes | social, cheerful, warm, playful | graceful curved swimming pose, lively eyes, pearl-shell charm floating nearby, bubbles | aqua, pearl white |
| big5-fox-male-1024.png | Fox male | fox, four legs, paws, orange-red fur, triangular ears, large fluffy tail | clever, independent, quick-witted, playful | side-facing pose looking back over the shoulder, alert ears, sly but friendly eyes, leaf-shaped charm near the paws | orange, cream |
| big5-fox-female-1024.png | Fox female | fox, four legs, paws, warm orange fur, triangular ears, large fluffy tail | clever, graceful, independent, charming | neat seated pose, tail wrapped around the body, gentle sharp eyes, thin ribbon collar or leaf charm | warm orange, cream |
| big5-cat-male-1024.png | Cat male | cat, four legs, paws, soft black-gray fur, round ears, slim tail | free, relaxed, curious, friendly | lazy stretch pose, half-lidded friendly eyes, tail relaxed, small star charm near the paws | black-gray, pale blue |
| big5-cat-female-1024.png | Cat female | cat, four legs, paws, warm brown fur, round ears, soft tail | gentle, independent, affectionate, relaxed | neat seated pose, tail curled around the paws, round friendly eyes, small pale charm near collar area | warm brown, cream |
| big5-tiger-male-1024.png | Tiger male | tiger, four legs, paws, orange fur with bold black stripes, long striped tail | strong, bold, independent, intense | low powerful stance, focused bright eyes, muscular shoulders, clear tiger stripe silhouette | orange, black, amber |
| big5-tiger-female-1024.png | Tiger female | tiger, four legs, paws, orange-brown fur with elegant black stripes, long striped tail | strong, graceful, self-contained, observant | side-walking pose, sleek body line, calm sharp eyes, tail balanced behind, tiny amber charm | orange-brown, cream |
| big5-dog-male-1024.png | Dog male | dog, four legs, paws, warm brown fur, friendly ears, short tail | loyal, cooperative, cheerful, reliable | forward-facing sitting pose, bright honest eyes, tail gently wagging, small ball near the front paws | brown, pale green |
| big5-dog-female-1024.png | Dog female | dog, four legs, paws, cream-colored fur, soft ears, short tail | loyal, warm, friendly, supportive | gentle sitting pose, soft bright eyes, relaxed ears, blank message-card charm near the paws | cream, pale green |
| big5-wolf-male-1024.png | Wolf male | wolf, four legs, paws, silver-gray fur, pointed ears, bushy tail | independent, disciplined, cool, observant | three-quarter back-facing pose looking over the shoulder, calm sharp eyes, tail low and steady | silver gray, pale blue |
| big5-wolf-female-1024.png | Wolf female | wolf, four legs, paws, blue-gray fur, pointed ears, bushy tail | independent, graceful, quiet, perceptive | calm side-facing pose, quiet eyes, balanced tail, map-shaped charm near the paws | blue gray, white |
| big5-beaver-male-1024.png | Beaver male | beaver, four legs, paws, brown fur, small rounded ears, large flat tail | hardworking, reliable, practical, constructive | proud seated pose beside a small safe wood piece, flat tail clearly visible, steady bright eyes | brown, beige |
| big5-beaver-female-1024.png | Beaver female | beaver, four legs, paws, warm brown fur, small rounded ears, large flat tail | careful, steady, supportive, productive | gentle seated pose near a small wooden model, soft focused eyes, flat tail visible behind | warm brown, beige |
| big5-eagle-male-1024.png | Eagle male | eagle, eagle head and beak, feathered body, two wings, two bird legs and talons | high perspective, independent, serious, strategic | powerful wings-spread pose, sharp eyes looking into the distance, strong feather silhouette | dark brown, sky blue |
| big5-eagle-female-1024.png | Eagle female | eagle, white-gold feathered body, eagle head and beak, two wings, two bird legs and talons | high perspective, graceful, cool, decisive | side-facing wind pose with one wing partly open, clear sharp eyes, pale gold feather accents | white gold, pale sky |
| big5-panda-male-1024.png | Panda male | panda, four legs, paws, black-white fur, round ears, black eye patches | calm, social, relaxed, friendly | seated pose beside bamboo, gentle sleepy eyes, soft round body, small green sparkles | black, white, pale green |
| big5-panda-female-1024.png | Panda female | panda, four legs, paws, black-white fur, round ears, black eye patches | warm, gentle, relaxed, cooperative | rounded seated pose, soft bright eyes, bamboo leaf charm nearby, pale green soft background marks | black, white, pale green |
| big5-cheetah-male-1024.png | Cheetah male | cheetah, four legs, paws, spotted golden fur, long tail | fast, energetic, independent, action-oriented | bright focused eyes, alert ears, streamlined side-view sprint pose, exactly four legs visible, amber speed sparkles | golden yellow, amber |
| big5-cheetah-female-1024.png | Cheetah female | cheetah, four legs, paws, lighter golden spotted fur, long tail | quick, graceful, free, bright | light leaping run pose, exactly four legs in natural gait, cheerful focused eyes, slim body line | light gold, amber |
| big5-rabbit-male-1024.png | Rabbit male | rabbit, four legs, paws, soft light-brown fur, long ears, small round tail | cautious, gentle, cooperative, sensitive | seated alert pose, ears raised, slightly nervous but friendly eyes, memo-card charm near paws | light brown, pale pink |
| big5-rabbit-female-1024.png | Rabbit female | rabbit, four legs, paws, soft pink-brown fur, long ears, small round tail | gentle, shy, cooperative, warm | small seated pose, ears softly tilted, round bright eyes, tiny flower charm near paws | pink brown, pale pink |
| big5-hedgehog-male-1024.png | Hedgehog male | hedgehog, small legs, paws, gray-brown fur, visible back spines | cautious, independent, guarded, thoughtful | small alert standing pose, back spines slightly raised, careful eyes, tiny bag-shaped charm nearby | gray brown, pale gray |
| big5-hedgehog-female-1024.png | Hedgehog female | hedgehog, small legs, paws, ash-brown fur, soft visible back spines | careful, gentle, reserved, protective | slightly curled seated pose, soft cautious eyes, short rounded spines, tiny pin-cushion charm nearby | ash brown, pale gray |

## 生成後チェック

- 1024x1024か。
- 完全動物か。人間の手足や服が入っていないか。
- 四足動物は四足、鳥は翼2枚＋脚2本、タコは触腕8本、イルカは自然な水中体型になっているか。
- 尻尾、翼、足先が切れていないか。
- 余分な腕、脚、触腕、羽がないか。
- 背景が薄く、サイトカードに置きやすいか。
- 男女差分が体格、色、姿勢、目元、チャームで分かれているか。
