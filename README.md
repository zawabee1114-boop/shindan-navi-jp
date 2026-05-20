# 診断ナビ（shindan-navi.jp）

8診断統合×5シーン軸アウトプットの自己理解プラットフォーム。

## サービス概要

MBTI・血液型・多重知能・DiSC・完璧主義・恋愛スタイル・星座・金銭感覚。
8つの心理学診断を統合し、仕事・恋愛・友人・家族・学校の5シーンで具体的な行動指針を提供。

- 全診断無料・登録なしで受診
- 4プライバシーモード対応の相性診断（こっそり/招待/片方向/完全共有）
- Big5 16動物キャラ（UX機能）
- タイムカプセル機能（PRO核機能）
- ¥390 PASS（1年有効）/ ¥590月 PRO の2段階課金

**戦略書**: `zawa-empire/zawa-scout/pipeline/shortlisted/2026-05-20_shindan-site-strategy-v4-2.md`

## 技術スタック

- **フレームワーク**: Astro 6（static output）
- **UI**: React Islands（インタラクティブ部分のみ）
- **スタイル**: Tailwind CSS v4 + CSS Variables（`--sn-*`）
- **デプロイ**: Cloudflare Pages
- **リポジトリ**: zawabee1114-boop/shindan-navi-jp

## 開発セットアップ

```bash
# 依存パッケージインストール
npm install

# 開発サーバー起動（http://localhost:4321）
npm run dev

# ビルド
npm run build

# ビルドプレビュー
npm run preview
```

## ディレクトリ構成

```
shindan-navi-jp/
├── public/                  # 静的ファイル（favicon.svg / robots.txt / llms.txt）
├── src/
│   ├── assets/
│   │   └── characters/      # Big5 16動物キャラSVG（後でデザイナーが配置）
│   ├── components/
│   │   ├── AchievementCard.astro    # 達成バッジカード
│   │   ├── Big5MoodMeter.astro      # N因子気分メーター
│   │   ├── CharacterDisplay.astro   # 16動物キャラ表示
│   │   ├── CompatibilityResult.astro # 相性診断結果
│   │   ├── Container.astro          # コンテンツ幅制御
│   │   ├── DiagnosisCard.astro      # 診断選択カード
│   │   ├── LevelBadge.astro         # レベルバッジ
│   │   ├── PrivacyModeSelector.astro # 4プライバシーモード選択
│   │   ├── ProgressBar.astro        # 診断進捗バー
│   │   ├── QuestionCard.astro       # 質問カード
│   │   ├── RecommendationList.astro # 推奨リスト
│   │   ├── ResultCard.astro         # 結果カード
│   │   ├── SceneCard.astro          # シーン別アクションカード
│   │   ├── ShareButtons.astro       # SNSシェアボタン
│   │   ├── SiteFooter.astro         # フッター
│   │   ├── SiteHeader.astro         # ヘッダー
│   │   └── TypeIcon.astro           # タイプアイコン
│   ├── data/
│   │   └── site-meta.json           # サイトメタ情報
│   ├── layouts/
│   │   └── BaseLayout.astro         # 全ページ共通レイアウト
│   ├── pages/
│   │   ├── index.astro              # トップページ
│   │   ├── diagnosis/               # 診断ページ群
│   │   │   ├── index.astro          # 診断一覧
│   │   │   ├── mbti/                # MBTI診断
│   │   │   ├── ketsuekigata/        # 血液型診断
│   │   │   ├── multi-int/           # 多重知能テスト（最優先）
│   │   │   ├── perfectionism/       # 完璧主義
│   │   │   ├── disc/                # DiSC
│   │   │   ├── love-style/          # 恋愛スタイル
│   │   │   ├── seiza/               # 星座
│   │   │   └── money-sense/         # 金銭感覚
│   │   ├── aisei/                   # 相性診断群
│   │   │   ├── index.astro          # 相性診断ハブ
│   │   │   ├── renai/               # 恋愛相性
│   │   │   ├── yujin/               # 友人相性
│   │   │   ├── shokuba/             # 職場相性（UX機能のみ）
│   │   │   └── kazoku/
│   │   │       ├── fufu/            # 夫婦相性
│   │   │       └── oyako/           # 親子相性
│   │   ├── strengths/               # 強み発見診断
│   │   ├── me/                      # マイページ（要会員登録）
│   │   ├── pro/                     # PRO会員機能説明
│   │   ├── share/[resultId].astro   # SNSシェア用OGP
│   │   ├── about/                   # 編集方針・E-E-A-T
│   │   ├── privacy/                 # プライバシーポリシー
│   │   ├── terms/                   # 利用規約
│   │   ├── disclaimer/              # 免責事項
│   │   ├── contact/                 # お問い合わせ
│   │   └── 404.astro                # 404ページ
│   └── styles/
│       ├── design-tokens.css        # CSS変数定義（--sn-*）← テーマ変更はここ
│       └── global.css               # グローバルスタイル
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## テーマ・UI変更ガイド

### カラーテーマを一括変更する

`src/styles/design-tokens.css` の以下の変数を変更するだけで全体のカラーが変わります。

```css
:root {
  --sn-primary:    #6366f1;  /* メインカラー */
  --sn-secondary:  #ec4899;  /* アクセントカラー */
  --sn-accent:     #f59e0b;  /* 強調色 */
}
```

**変更が必要なファイルは1つだけです**（`design-tokens.css`）。
全コンポーネントが `var(--sn-*)` を経由して参照するため、直接色指定なし。

### フォントを変更する

1. `BaseLayout.astro` の Google Fonts URL を変更
2. `design-tokens.css` の `--sn-font-family` / `--sn-font-rounded` を変更

### Big5 キャラSVGを差し替える

`src/assets/characters/{characterId}.svg` にSVGを配置し、
`CharacterDisplay.astro` のTODOコメント箇所を `<Image>` に差し替えます。

## デプロイフロー（Cloudflare Pages）

```
git push origin main
→ Cloudflare Pages が自動ビルド（2-3分）
→ https://shindan-navi.jp に反映
```

### Cloudflare Pages 設定

- **ビルドコマンド**: `npm run build`
- **出力ディレクトリ**: `dist`
- **Node.js バージョン**: 22.x

### 環境変数（Cloudflare Pages Dashboard で設定）

| 変数名 | 説明 |
|---|---|
| `PUBLIC_GA4_ID` | Google Analytics 4 測定ID |
| `PUBLIC_ADSENSE_PUB` | AdSense パブリッシャーID |
| `PUBLIC_GSC_VERIFICATION` | Search Console 確認コード |
| `SUPABASE_URL` | Supabase プロジェクトURL（Phase 1） |
| `SUPABASE_ANON_KEY` | Supabase 匿名キー（Phase 1） |
| `STRIPE_PK` | Stripe 公開鍵（Phase 1） |

## Phase ロードマップ

| Phase | 期間 | 主要実装 |
|---|---|---|
| **Phase 0** | 2026-05 | 技術基盤・UI骨格（このPR）|
| **Phase 1** | 2026-06 | 8診断コンテンツ + Supabase + Stripe |
| **Phase 2** | 2026-07 | 相性診断フル実装 + バイラルループ |
| **Phase 3** | 2026-08 | タイムカプセル + PRO核機能 |

## アカウント管理

- **GitHub**: zawabee1114-boop（FLO-YAアカウント禁止）
- **Cloudflare**: CEO管理
- **ドメイン**: お名前.com（2026-05-20取得完了）
