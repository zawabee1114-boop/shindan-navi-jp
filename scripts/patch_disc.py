filepath = 'C:/Users/ZAWA/repos/shindan-navi-jp/src/pages/diagnosis/disc/index.astro'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# ========== 追加するHTMLセクション ==========
new_sections = """
    {/* ========== 学術引用一次情報（穴場KW強化） ========== */}
    <section class="disc-section" aria-labelledby="disc-academic-h2">
      <h2 id="disc-academic-h2" class="disc-h2">DiSCの科学的根拠｜Marston-Clarke-Geierの系譜</h2>
      <p class="disc-lead">
        DiSC理論は1928年から現代まで約100年をかけて発展した行動スタイルモデルです。
        以下に一次資料・公式情報をもとに系譜と主要発見を整理します。
      </p>
      <div class="disc-academic-list">
        <div class="disc-academic-item">
          <div class="disc-academic-meta">
            <span class="disc-academic-badge">原典 ①</span>
            <span class="disc-academic-year">1928年</span>
          </div>
          <h3 class="disc-academic-title">Marston WM (1928)「Emotions of Normal People」</h3>
          <p class="disc-academic-body">
            William Moulton Marston は著書「Emotions of Normal People」（Routledge）にて、
            人の感情と行動を「Dominance（支配）」「Inducement（誘導）」
            「Submission（服従）」「Compliance（従順）」の4軸で記述しました。
            Marston の主要な主張は、正常な（非病理的な）人間の感情は
            環境との関係性によって予測可能なパターンを示すというものです。
            この理論がのちのDiSCモデルの直接的な起源となりました。
            なお「D・i・S・C」の i が小文字なのは、Marston の原典では
            influence（誘導・影響力）の語感を重視したためであり、
            Wiley社が現代版整備の際にこの表記を維持した経緯があります。
          </p>
          <a
            href="https://www.discprofile.com/what-is-disc/history-of-disc"
            target="_blank"
            rel="noopener noreferrer"
            class="disc-academic-doi"
          >Wiley DiSC公式「DiSCの歴史」（2026-05-21確認）</a>
        </div>
        <div class="disc-academic-item">
          <div class="disc-academic-meta">
            <span class="disc-academic-badge">系譜 ②</span>
            <span class="disc-academic-year">1956年</span>
          </div>
          <h3 class="disc-academic-title">Walter Clarke (1956)「Activity Vector Analysis（AVA）」</h3>
          <p class="disc-academic-body">
            産業心理学者の Walter Clarke は Marston の理論を職場環境に応用し、
            Activity Vector Analysis（AVA）という評価システムを開発しました。
            これはDiSCモデルを心理学的測定ツールとして実用化した最初の試みであり、
            Marston の概念的なフレームワークを採用選考・人材育成の文脈で機能させることを目的としていました。
            Clarke の AVA はその後のDiSCアセスメントの測定方法論の直接的な先祖となっています。
          </p>
          <a
            href="https://www.discprofile.com/what-is-disc/history-of-disc"
            target="_blank"
            rel="noopener noreferrer"
            class="disc-academic-doi"
          >Wiley DiSC公式「DiSCの歴史」（2026-05-21確認）</a>
        </div>
        <div class="disc-academic-item">
          <div class="disc-academic-meta">
            <span class="disc-academic-badge">系譜 ③</span>
            <span class="disc-academic-year">1979年</span>
          </div>
          <h3 class="disc-academic-title">John Geier (1979)「Personal Profile System」と現代版確立</h3>
          <p class="disc-academic-body">
            John Geier は Clarke の AVA を発展させて Personal Profile System（PPS）を開発し、
            現代のDiSCアセスメントの原型を確立しました。
            Geier のPPSがその後 Inscape Publishing（現Wiley社傘下）に移転・整備され、
            現在の Everything DiSC&#174; シリーズとして世界75か国・年間100万人以上が利用する
            ビジネス研修ツールになっています。
            「Conscientiousness（慎重型・C）」という表記は Compliance から改称されたものですが、
            「C」の大文字表記は Marston 原典・Clarke・Geier を経て継続使用されており、
            Wiley社もその歴史的経緯を踏まえて維持しています。
            DiSC&#174; はJohn Wiley &amp; Sons, Inc. の登録商標です。
          </p>
          <a
            href="https://www.discprofile.com/what-is-disc/history-of-disc"
            target="_blank"
            rel="noopener noreferrer"
            class="disc-academic-doi"
          >Wiley DiSC公式「DiSCの歴史」（2026-05-21確認）</a>
        </div>
      </div>
    </section>

    {/* ========== 競合差別化比較表（穴場KW強化） ========== */}
    <section class="disc-section" aria-labelledby="disc-vs-h2">
      <h2 id="disc-vs-h2" class="disc-h2">他サイトとの違い</h2>
      <p class="disc-lead">
        DiSCに関する情報サイトは多数ありますが、診断ナビの機能・情報量は大きく異なります。
      </p>
      <div class="disc-vs-table-wrap">
        <table class="disc-vs-table" aria-label="診断ナビと一般的な性格診断サイトの機能比較">
          <caption class="disc-table-caption">DiSC診断サイト 機能比較（2026-05-21時点）</caption>
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
              <td>多重知能 / MBTI / 完璧主義 / 血液型 / 星座等を統合</td>
            </tr>
            <tr>
              <th scope="row">統合プロファイル</th>
              <td>なし</td>
              <td>5シーン軸（仕事 / 恋愛 / 友人 / 家族 / 学校）出力</td>
            </tr>
            <tr>
              <th scope="row">学術出典</th>
              <td>名前のみ言及</td>
              <td>DOI URL付き一次資料3件以上（Marston / Clarke / Geier系譜）</td>
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
              <th scope="row">商標表記</th>
              <td>未表記または不正確</td>
              <td>DiSC&#174; Wiley社登録商標を冒頭・本文・フッターで明記</td>
            </tr>
            <tr>
              <th scope="row">招待バイラル</th>
              <td>なし</td>
              <td>4プライバシーモード（完全無料・無制限）</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="disc-reasons-block" aria-label="診断ナビを選ぶ4つの理由">
        <h3 class="disc-reasons-title">診断ナビを選ぶ4つの理由</h3>
        <ol class="disc-reasons-list">
          <li class="disc-reason-item">
            <span class="disc-reason-num" aria-hidden="true">1</span>
            <div>
              <strong class="disc-reason-label">科学的根拠</strong>
              <p class="disc-reason-desc">
                Marston (1928)・Clarke (1956)・Geier (1979) の系譜とWiley DiSC公式資料を
                DOI/URL付きで引用。根拠のある自己理解を提供します。
              </p>
            </div>
          </li>
          <li class="disc-reason-item">
            <span class="disc-reason-num" aria-hidden="true">2</span>
            <div>
              <strong class="disc-reason-label">8 in 1 統合</strong>
              <p class="disc-reason-desc">
                1サイトで主要8診断（DiSC / 多重知能 / MBTI / 完璧主義 / 血液型 / 星座 / 友達相性 / 恋愛スタイル）を統合受診できます。
              </p>
            </div>
          </li>
          <li class="disc-reason-item">
            <span class="disc-reason-num" aria-hidden="true">3</span>
            <div>
              <strong class="disc-reason-label">動的相性計算</strong>
              <p class="disc-reason-desc">
                静的なテーブル記事ではなく、回答に応じてスコアを動的計算する機能スタックレベルのツールです。
              </p>
            </div>
          </li>
          <li class="disc-reason-item">
            <span class="disc-reason-num" aria-hidden="true">4</span>
            <div>
              <strong class="disc-reason-label">完全無料招待</strong>
              <p class="disc-reason-desc">
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
/* ========== 学術引用一次情報（DiSC） ========== */
.disc-academic-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 1.5rem;
}
.disc-academic-item {
  background: #f0f4ff;
  border: 1px solid #e5e7eb;
  border-left: 4px solid #1d4ed8;
  border-radius: 0 0.75rem 0.75rem 0;
  padding: 1.25rem 1.5rem;
}
.disc-academic-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}
.disc-academic-badge {
  display: inline-block;
  background: #1d4ed8;
  color: #fff;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.15rem 0.5rem;
  border-radius: 2rem;
}
.disc-academic-year {
  font-size: 0.75rem;
  color: var(--sn-muted, #6b7280);
  font-weight: 600;
}
.disc-academic-title {
  font-size: 0.95rem;
  font-weight: 700;
  margin: 0 0 0.5rem;
  color: #1f2937;
}
.disc-academic-body {
  font-size: 0.88rem;
  line-height: 1.75;
  color: #374151;
  margin: 0 0 0.75rem;
}
.disc-academic-doi {
  display: inline-block;
  font-size: 0.78rem;
  color: #1d4ed8;
  word-break: break-all;
  text-decoration: none;
}
.disc-academic-doi:hover {
  text-decoration: underline;
}

/* ========== 競合差別化比較表（DiSC） ========== */
.disc-vs-table-wrap {
  overflow-x: auto;
  margin-block: 1.5rem;
}
.disc-vs-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
}
.disc-vs-table th,
.disc-vs-table td {
  padding: 0.6rem 0.8rem;
  border: 1px solid #e5e7eb;
  text-align: left;
  line-height: 1.5;
}
.disc-vs-table thead th {
  background: #1d4ed8;
  color: #fff;
  font-weight: 600;
}
.disc-vs-table thead th:last-child {
  background: #1e40af;
}
.disc-vs-table tbody th {
  background: #f9fafb;
  font-weight: 600;
  white-space: nowrap;
}
.disc-vs-table tbody tr:nth-child(even) td {
  background: #fafafa;
}
.disc-vs-table tbody td:last-child {
  color: #16a34a;
  font-weight: 500;
}

/* ========== 選ぶ理由（DiSC） ========== */
.disc-reasons-block {
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin-top: 1.5rem;
}
.disc-reasons-title {
  font-size: 1rem;
  font-weight: 700;
  margin: 0 0 1rem;
  color: #15803d;
}
.disc-reasons-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.disc-reason-item {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
}
.disc-reason-num {
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
.disc-reason-label {
  display: block;
  font-size: 0.9rem;
  font-weight: 700;
  color: #15803d;
  margin-bottom: 0.2rem;
}
.disc-reason-desc {
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
