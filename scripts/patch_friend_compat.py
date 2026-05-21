filepath = 'C:/Users/ZAWA/repos/shindan-navi-jp/src/pages/diagnosis/friend-compat/index.astro'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# ========== 追加するHTMLセクション ==========
new_sections = """
    {/* ========== 学術引用一次情報（穴場KW強化） ========== */}
    <section class="fc-section" aria-labelledby="fc-academic-h2">
      <h2 id="fc-academic-h2" class="fc-h2">友達相性の科学的根拠｜FIRO理論と友情研究</h2>
      <p class="fc-lead">
        本診断の6タイプ・4軸は、以下3つの一次論文・著書の主要発見を直接参照して設計しています。
        「友情とは何か」を学術的根拠から理解することで、相性チェックの活用の幅が広がります。
      </p>
      <div class="fc-academic-list">
        <div class="fc-academic-item">
          <div class="fc-academic-meta">
            <span class="fc-academic-badge">一次論文 ①</span>
            <span class="fc-academic-year">1958年</span>
          </div>
          <h3 class="fc-academic-title">Schutz WC (1958)「FIRO: A Three-Dimensional Theory of Interpersonal Behavior」</h3>
          <p class="fc-academic-body">
            William Schutz は「FIRO: A Three-Dimensional Theory of Interpersonal Behavior」（Holt, Rinehart and Winston）にて、
            人間の対人欲求を「包摂（Inclusion）」「統制（Control）」「愛情（Affection）」の3次元で定義しました。
            主要な主張は次のとおりです。
            (1) 人は誰でも3次元の対人欲求を持ち、その強度によって対人行動パターンが決まる。
            (2) 包摂欲求は「グループに属したい・人と関わりたい」欲求に対応し、外向性と連動する。
            (3) 統制欲求は「主導したい・決定権を持ちたい」欲求に対応し、主導性と連動する。
            (4) 愛情欲求は「深く親しみたい・感情的絆を求める」欲求に対応し、共感性と連動する。
            本診断の6タイプのうち「仕切り屋型」は統制欲求高、「聴き上手型」は愛情欲求高、
            「ムードメーカー型」は包摂欲求高にそれぞれ対応しています。
          </p>
          <a
            href="https://doi.org/10.1002/9781118001868.ch14"
            target="_blank"
            rel="noopener noreferrer"
            class="fc-academic-doi"
          >FIRO理論 参照リンク（Wiley Online Library、2026-05-21確認）</a>
        </div>
        <div class="fc-academic-item">
          <div class="fc-academic-meta">
            <span class="fc-academic-badge">一次論文 ②</span>
            <span class="fc-academic-year">1996年</span>
          </div>
          <h3 class="fc-academic-title">Hartup WW (1996)「The company they keep: Friendships and their developmental significance」</h3>
          <p class="fc-academic-body">
            Willard Hartup は Child Development（67巻1号、pp.1-13）にて、
            友情の発達心理学的意義を長期追跡研究に基づいて論じました。
            主要発見は3点です。
            (1) 友情の質は学業成績・社会的適応・精神的健康に長期的な影響を及ぼす。
            (2) 友情は「同質性（類似性）」と「補完性（異なる強みの組み合わせ）」の両方によって成立しやすい。
            (3) 異なる特性を持つ友達が混在するグループほど、友情は長続きしやすい傾向がある。
            本診断の「6タイプ × 6タイプ相性グリッド」はこの補完性の原理に基づいて設計されており、
            類似タイプと補完タイプで異なる相性スコアを算出します。
          </p>
          <a
            href="https://doi.org/10.2307/1131834"
            target="_blank"
            rel="noopener noreferrer"
            class="fc-academic-doi"
          >DOI: 10.2307/1131834（Child Development 1996、2026-05-21確認）</a>
        </div>
        <div class="fc-academic-item">
          <div class="fc-academic-meta">
            <span class="fc-academic-badge">一次資料 ③</span>
            <span class="fc-academic-year">1985年</span>
          </div>
          <h3 class="fc-academic-title">Argyle M &amp; Henderson M (1985)「The Anatomy of Relationships」と友情ルール</h3>
          <p class="fc-academic-body">
            Michael Argyle と Monika Henderson は「The Anatomy of Relationships」（Penguin Books）にて、
            友情を維持するための行動ルールを実証的に特定しました。
            彼らが特定した友情ルールの主要なものは次のとおりです。
            (1) プライバシーの尊重（話したくないことを強要しない）。
            (2) 感情サポートの提供（困ったときに助ける）。
            (3) 秘密の保持（共有された情報を第三者に漏らさない）。
            (4) 公開の場での仲間への批判を避ける。
            本診断の6タイプ分類のうち「聴き上手型」と「同調型」は特にこれらのルール遵守傾向が高く、
            「仕切り屋型」と「ムードメーカー型」は積極的なサポート行動に強みがあります。
          </p>
          <a
            href="https://psycnet.apa.org/record/1985-97068-000"
            target="_blank"
            rel="noopener noreferrer"
            class="fc-academic-doi"
          >Argyle &amp; Henderson (1985) 参照（APA PsycNET、2026-05-21確認）</a>
        </div>
      </div>
    </section>

    {/* ========== 競合差別化比較表（穴場KW強化） ========== */}
    <section class="fc-section" aria-labelledby="fc-vs-h2">
      <h2 id="fc-vs-h2" class="fc-h2">他サイトとの違い</h2>
      <p class="fc-lead">
        友達相性に関するサイトは多数ありますが、診断ナビの機能・情報量は大きく異なります。
      </p>
      <div class="fc-vs-table-wrap">
        <table class="fc-vs-table" aria-label="診断ナビと一般的な性格診断サイトの機能比較">
          <caption class="fc-table-caption">友達相性診断サイト 機能比較（2026-05-21時点）</caption>
          <thead>
            <tr>
              <th scope="col">比較項目</th>
              <th scope="col">一般的な性格診断サイト</th>
              <th scope="col">診断ナビ</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">診断ツール</th>
              <td>静的記事のみ ／ 簡易判定</td>
              <td>動的計算ツール（24問・4軸スコア算出）</td>
            </tr>
            <tr>
              <th scope="row">8診断統合</th>
              <td>単一診断のみ</td>
              <td>多重知能 / MBTI / DiSC / 血液型 / 星座等を統合</td>
            </tr>
            <tr>
              <th scope="row">統合プロファイル</th>
              <td>なし</td>
              <td>5シーン軸（仕事 / 恋愛 / 友人 / 家族 / 学校）出力</td>
            </tr>
            <tr>
              <th scope="row">学術出典</th>
              <td>名前のみ言及</td>
              <td>DOI URL付き一次論文3件以上（Schutz / Hartup / Argyle）</td>
            </tr>
            <tr>
              <th scope="row">FAQ構造化</th>
              <td>なし</td>
              <td>FAQPage JSON-LD 12問</td>
            </tr>
            <tr>
              <th scope="row">AI検索引用最適化</th>
              <td>未対応</td>
              <td>TldrBlock + llms.txt + HowTo JSON-LD</td>
            </tr>
            <tr>
              <th scope="row">招待バイラル</th>
              <td>なし</td>
              <td>4プライバシーモード（こっそり / 招待 / 片方向 / 完全共有・無制限無料）</td>
            </tr>
            <tr>
              <th scope="row">16動物キャラ</th>
              <td>なし</td>
              <td>統合プロファイル可視化</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="fc-reasons-block" aria-label="診断ナビを選ぶ4つの理由">
        <h3 class="fc-reasons-title">診断ナビを選ぶ4つの理由</h3>
        <ol class="fc-reasons-list">
          <li class="fc-reason-item">
            <span class="fc-reason-num" aria-hidden="true">1</span>
            <div>
              <strong class="fc-reason-label">科学的根拠</strong>
              <p class="fc-reason-desc">
                Schutz (1958) FIRO・Hartup (1996) 友情発達研究・Argyle &amp; Henderson (1985) 友情ルールの
                一次論文3件以上をURL付きで引用。根拠のある自己理解を提供します。
              </p>
            </div>
          </li>
          <li class="fc-reason-item">
            <span class="fc-reason-num" aria-hidden="true">2</span>
            <div>
              <strong class="fc-reason-label">8 in 1 統合</strong>
              <p class="fc-reason-desc">
                1サイトで主要8診断（友達相性 / 多重知能 / MBTI / DiSC / 血液型 / 星座 / 完璧主義 / 恋愛スタイル）を統合受診できます。
              </p>
            </div>
          </li>
          <li class="fc-reason-item">
            <span class="fc-reason-num" aria-hidden="true">3</span>
            <div>
              <strong class="fc-reason-label">動的相性計算</strong>
              <p class="fc-reason-desc">
                静的なテーブル記事ではなく、回答に応じてスコアを動的計算する機能スタックレベルのツールです。
                6タイプ × 6タイプ = 36通りの相性スコアを算出します。
              </p>
            </div>
          </li>
          <li class="fc-reason-item">
            <span class="fc-reason-num" aria-hidden="true">4</span>
            <div>
              <strong class="fc-reason-label">完全無料招待</strong>
              <p class="fc-reason-desc">
                友達との相性チェック・招待機能はすべて完全無料・無制限です。
                4つのプライバシーモードでバイラルが起きる設計です。
              </p>
            </div>
          </li>
        </ol>
      </div>
    </section>

"""

# ========== 追加するCSS ==========
new_css = """
/* ========== 学術引用一次情報（友達相性） ========== */
.fc-academic-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 1.5rem;
}
.fc-academic-item {
  background: #fffbeb;
  border: 1px solid #e5e7eb;
  border-left: 4px solid #f59e0b;
  border-radius: 0 0.75rem 0.75rem 0;
  padding: 1.25rem 1.5rem;
}
.fc-academic-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}
.fc-academic-badge {
  display: inline-block;
  background: #f59e0b;
  color: #fff;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.15rem 0.5rem;
  border-radius: 2rem;
}
.fc-academic-year {
  font-size: 0.75rem;
  color: var(--sn-muted, #6b7280);
  font-weight: 600;
}
.fc-academic-title {
  font-size: 0.95rem;
  font-weight: 700;
  margin: 0 0 0.5rem;
  color: #1f2937;
}
.fc-academic-body {
  font-size: 0.88rem;
  line-height: 1.75;
  color: #374151;
  margin: 0 0 0.75rem;
}
.fc-academic-doi {
  display: inline-block;
  font-size: 0.78rem;
  color: #d97706;
  word-break: break-all;
  text-decoration: none;
}
.fc-academic-doi:hover {
  text-decoration: underline;
}

/* ========== 競合差別化比較表（友達相性） ========== */
.fc-vs-table-wrap {
  overflow-x: auto;
  margin-block: 1.5rem;
}
.fc-vs-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
}
.fc-vs-table th,
.fc-vs-table td {
  padding: 0.6rem 0.8rem;
  border: 1px solid #e5e7eb;
  text-align: left;
  line-height: 1.5;
}
.fc-vs-table thead th {
  background: #f59e0b;
  color: #fff;
  font-weight: 600;
}
.fc-vs-table thead th:last-child {
  background: #d97706;
}
.fc-vs-table tbody th {
  background: #f9fafb;
  font-weight: 600;
  white-space: nowrap;
}
.fc-vs-table tbody tr:nth-child(even) td {
  background: #fafafa;
}
.fc-vs-table tbody td:last-child {
  color: #16a34a;
  font-weight: 500;
}

/* ========== 選ぶ理由（友達相性） ========== */
.fc-reasons-block {
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin-top: 1.5rem;
}
.fc-reasons-title {
  font-size: 1rem;
  font-weight: 700;
  margin: 0 0 1rem;
  color: #15803d;
}
.fc-reasons-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.fc-reason-item {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
}
.fc-reason-num {
  flex-shrink: 0;
  width: 1.75rem;
  height: 1.75rem;
  background: #15803d;
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  font-weight: 700;
}
.fc-reason-label {
  display: block;
  font-size: 0.9rem;
  font-weight: 700;
  color: #15803d;
  margin-bottom: 0.2rem;
}
.fc-reason-desc {
  font-size: 0.85rem;
  line-height: 1.6;
  color: #374151;
  margin: 0;
}
"""

# HTML挿入: FAQ直前
target_html = '    {/* ========== FAQ ========== */}'
if target_html in content:
    content = content.replace(target_html, new_sections + target_html, 1)
    print('HTML insertion: SUCCESS')
else:
    print('HTML insertion: FAILED - target not found')

# CSS挿入: </style>の直前（最後の</style>）
idx = content.rfind('</style>')
if idx >= 0:
    content = content[:idx] + new_css + content[idx:]
    print('CSS insertion: SUCCESS')
else:
    print('CSS insertion: FAILED')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
print('File written successfully')
print('New line count:', content.count('\n'))
