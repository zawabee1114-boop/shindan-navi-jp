import sys

filepath = 'C:/Users/ZAWA/repos/shindan-navi-jp/src/pages/diagnosis/perfectionism/index.astro'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# ========== 追加するHTMLセクション ==========
new_sections = """
    {/* ========== 学術引用一次情報（穴場KW強化） ========== */}
    <section class="pf-section" aria-labelledby="pf-academic-h2">
      <h2 id="pf-academic-h2" class="pf-h2">完璧主義の科学的根拠｜Hewitt-Flettモデルの一次情報</h2>
      <p class="pf-lead">
        本診断の4タイプは、以下3つの一次論文の主要発見を直接参照して設計しています。
        「完璧主義とは何か」を学術的根拠から理解することで、自己診断の精度と活用の幅が広がります。
      </p>
      <div class="pf-academic-list">
        <div class="pf-academic-item">
          <div class="pf-academic-meta">
            <span class="pf-academic-badge">一次論文 ①</span>
            <span class="pf-academic-year">1991年</span>
          </div>
          <h3 class="pf-academic-title">Hewitt &amp; Flett (1991)「多次元完璧主義尺度（MPS）」</h3>
          <p class="pf-academic-body">
            Paul Hewitt と Gordon Flett は Journal of Personality and Social Psychology（60巻3号）に
            多次元完璧主義尺度（MPS）を発表しました。
            完璧主義を「自己志向（Self-Oriented）」「他者志向（Other-Oriented）」
            「社会規定（Socially-Prescribed）」の3次元で測定する理論です。
            主要発見は3点です。
            (1) 完璧主義は方向性によって心理的影響が大きく異なる。
            (2) 自己志向完璧主義は達成動機と関連する一方、社会規定完璧主義はうつ・不安と強く関連する。
            (3) 完璧主義は認知・感情・行動の3層で測定する必要がある。
            本診断の「徹底型」は自己志向、「期待型」は社会規定に対応しています。
          </p>
          <a
            href="https://doi.org/10.1037/0022-3514.60.3.456"
            target="_blank"
            rel="noopener noreferrer"
            class="pf-academic-doi"
          >DOI: 10.1037/0022-3514.60.3.456（2026-05-21確認）</a>
        </div>
        <div class="pf-academic-item">
          <div class="pf-academic-meta">
            <span class="pf-academic-badge">一次論文 ②</span>
            <span class="pf-academic-year">1990年</span>
          </div>
          <h3 class="pf-academic-title">Frost et al. (1990)「多次元完璧主義尺度（Frost MPS）6次元」</h3>
          <p class="pf-academic-body">
            Randy Frost らは別の多次元完璧主義尺度（Frost MPS）を開発し、6次元を定義しました。
            本診断の4タイプとFrost 6次元の対応関係は次のとおりです。
            「徹底型」→ 個人的基準・組織化次元に対応。
            「こだわり型」→ 組織化・行動への疑い次元に対応。
            「先延ばし型」→ 失敗懸念・行動への疑い次元に対応。
            「期待型」→ 親の期待・親の批判次元に対応。
            Frost MPSは完璧主義と強迫性障害・摂食障害の関係研究に国際的に広く使用されています。
          </p>
          <a
            href="https://doi.org/10.1016/0005-7967(90)90072-G"
            target="_blank"
            rel="noopener noreferrer"
            class="pf-academic-doi"
          >DOI: 10.1016/0005-7967(90)90072-G（2026-05-21確認）</a>
        </div>
        <div class="pf-academic-item">
          <div class="pf-academic-meta">
            <span class="pf-academic-badge">一次論文 ③</span>
            <span class="pf-academic-year">2006年</span>
          </div>
          <h3 class="pf-academic-title">Stoeber &amp; Otto (2006)「適応的・不適応的完璧主義の二分法」</h3>
          <p class="pf-academic-body">
            Joachim Stoeber と Kathleen Otto は Personality and Social Psychology Review（10巻4号）にて、
            完璧主義研究の大きな転換点となる二分法を示しました。
            主要発見は2点です。
            (1) 完璧主義は「高い個人的基準（適応的）」と「失敗への懸念（不適応的）」の2側面から成る。
            (2) 適応的完璧主義は達成動機・課題への取り組みと正の相関を示し、
            不適応的完璧主義はうつ・燃え尽き・先延ばしと正の相関を示す。
            本診断の「消耗しない向き合い方」という方針はこの二分法に基づいています。
          </p>
          <a
            href="https://doi.org/10.1207/s15327957pspr1004_2"
            target="_blank"
            rel="noopener noreferrer"
            class="pf-academic-doi"
          >DOI: 10.1207/s15327957pspr1004_2（2026-05-21確認）</a>
        </div>
      </div>
    </section>

    {/* ========== 競合差別化比較表（穴場KW強化） ========== */}
    <section class="pf-section" aria-labelledby="pf-vs-h2">
      <h2 id="pf-vs-h2" class="pf-h2">他サイトとの違い</h2>
      <p class="pf-lead">
        完璧主義に関する情報サイトは多数ありますが、診断ナビの機能・情報量は大きく異なります。
      </p>
      <div class="pf-vs-table-wrap">
        <table class="pf-vs-table" aria-label="診断ナビと一般的な性格診断サイトの機能比較">
          <caption class="pf-table-caption">完璧主義診断サイト 機能比較（2026-05-21時点）</caption>
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
              <td>動的計算ツール（28問・5段階）</td>
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
              <td>DOI URL付き一次論文3件以上</td>
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
              <td>4プライバシーモード（完全無料・無制限）</td>
            </tr>
            <tr>
              <th scope="row">16動物キャラ</th>
              <td>なし</td>
              <td>統合プロファイル可視化</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="pf-reasons-block" aria-label="診断ナビを選ぶ4つの理由">
        <h3 class="pf-reasons-title">診断ナビを選ぶ4つの理由</h3>
        <ol class="pf-reasons-list">
          <li class="pf-reason-item">
            <span class="pf-reason-num" aria-hidden="true">1</span>
            <div>
              <strong class="pf-reason-label">科学的根拠</strong>
              <p class="pf-reason-desc">
                Hewitt &amp; Flett (1991)・Frost et al. (1990)・Stoeber &amp; Otto (2006) の
                一次論文3件以上をDOI付きで引用。根拠のある自己理解を提供します。
              </p>
            </div>
          </li>
          <li class="pf-reason-item">
            <span class="pf-reason-num" aria-hidden="true">2</span>
            <div>
              <strong class="pf-reason-label">8 in 1 統合</strong>
              <p class="pf-reason-desc">
                1サイトで主要8診断（完璧主義 / 多重知能 / MBTI / DiSC / 血液型 / 星座 / 友達相性 / 恋愛スタイル）を統合受診できます。
              </p>
            </div>
          </li>
          <li class="pf-reason-item">
            <span class="pf-reason-num" aria-hidden="true">3</span>
            <div>
              <strong class="pf-reason-label">動的相性計算</strong>
              <p class="pf-reason-desc">
                静的なテーブル記事ではなく、回答に応じてスコアを動的計算する機能スタックレベルのツールです。
              </p>
            </div>
          </li>
          <li class="pf-reason-item">
            <span class="pf-reason-num" aria-hidden="true">4</span>
            <div>
              <strong class="pf-reason-label">完全無料招待</strong>
              <p class="pf-reason-desc">
                友達との相性チェック・招待機能はすべて完全無料・無制限です。
                アカウント登録不要でバイラルが起きる設計です。
              </p>
            </div>
          </li>
        </ol>
      </div>
    </section>

"""

# ========== 追加するCSS ==========
new_css = """
/* ========== 学術引用一次情報 ========== */
.pf-academic-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 1.5rem;
}
.pf-academic-item {
  background: #f8f7ff;
  border: 1px solid #e5e7eb;
  border-left: 4px solid var(--sn-primary);
  border-radius: 0 0.75rem 0.75rem 0;
  padding: 1.25rem 1.5rem;
}
.pf-academic-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}
.pf-academic-badge {
  display: inline-block;
  background: var(--sn-primary);
  color: #fff;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.15rem 0.5rem;
  border-radius: 2rem;
}
.pf-academic-year {
  font-size: 0.75rem;
  color: var(--sn-muted, #6b7280);
  font-weight: 600;
}
.pf-academic-title {
  font-size: 0.95rem;
  font-weight: 700;
  margin: 0 0 0.5rem;
  color: #1f2937;
}
.pf-academic-body {
  font-size: 0.88rem;
  line-height: 1.75;
  color: #374151;
  margin: 0 0 0.75rem;
}
.pf-academic-doi {
  display: inline-block;
  font-size: 0.78rem;
  color: var(--sn-primary);
  word-break: break-all;
  text-decoration: none;
}
.pf-academic-doi:hover {
  text-decoration: underline;
}

/* ========== 競合差別化比較表 ========== */
.pf-vs-table-wrap {
  overflow-x: auto;
  margin-block: 1.5rem;
}
.pf-vs-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
}
.pf-vs-table th,
.pf-vs-table td {
  padding: 0.6rem 0.8rem;
  border: 1px solid #e5e7eb;
  text-align: left;
  line-height: 1.5;
}
.pf-vs-table thead th {
  background: var(--sn-primary);
  color: #fff;
  font-weight: 600;
}
.pf-vs-table thead th:last-child {
  background: #4f46e5;
}
.pf-vs-table tbody th {
  background: #f9fafb;
  font-weight: 600;
  white-space: nowrap;
}
.pf-vs-table tbody tr:nth-child(even) td {
  background: #fafafa;
}
.pf-vs-table tbody td:last-child {
  color: #16a34a;
  font-weight: 500;
}

/* ========== 選ぶ理由 ========== */
.pf-reasons-block {
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin-top: 1.5rem;
}
.pf-reasons-title {
  font-size: 1rem;
  font-weight: 700;
  margin: 0 0 1rem;
  color: #15803d;
}
.pf-reasons-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.pf-reason-item {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
}
.pf-reason-num {
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
.pf-reason-label {
  display: block;
  font-size: 0.9rem;
  font-weight: 700;
  color: #15803d;
  margin-bottom: 0.2rem;
}
.pf-reason-desc {
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
