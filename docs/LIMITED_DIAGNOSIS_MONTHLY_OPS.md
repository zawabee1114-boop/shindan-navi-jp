# 月1限定診断 毎月1日の運用手順

PRO会員（¥590/月）の中核特典「月1限定診断」は、**登録を忘れると自動的に
「今月の限定診断は準備中です」というフォールバック表示になる**（虚偽表示ではないが、
何も月が公開されていない状態が続く）。2026-06公開後、3ヶ月（7-8月）分の登録を忘れ、
9月分を作るまでフォールバック文言が本番に出続けた実例がある。**毎月1日、または
気づいた時点で必ず本手順を実行すること。**

## 判定ロジック（`registry.ts` の `getCurrentLimited()`）

- `entry.year === 今年` かつ `entry.month === 今月` かつ `entry.publishedAt <= 今日`
  の entry を探す。無ければ `null` → ハブページが「準備中」フォールバックを表示。
- **月をまたぐ前に次の月の entry を registry に追加しておけば、フォールバックは出ない。**

## 手順（1本あたり目安 30-60分）

1. **テーマを決める**（既存16診断と結果が重ならないこと・占いNG・YMYL越境NG）
   - 参照: memory `feedback_shindan_navi_core_principles`
   - 実在する学術文献（心理学・行動科学）に基づくこと。捏造禁止
2. **データ4ファイルを作成**: `src/data/diagnoses/limited/{YYYY-MM}/`
   - `meta.ts`（タイトル・description・references・typeIds・publishedAt）
   - `questions.ts`（型定義・20問・scaleLabels）
   - `types.ts`（4タイプの詳細データ・Big5換算・大人向け説明文）
   - `results.ts`（スコア計算・LocalStorage保存キーは `sn_scores_limited-{YYYY-MM}`）
   - 既存月のファイルをそのまま手本にして構造・フィールドを変えない
3. **`registry.ts` に entry を1件追加**
   - `publishedAt` は **実際に公開する日付**を入れる。月初1日にする「予定」ではない
   - 例: 9/6に作業して公開するなら `'2026-09-06'`。9/1に遡って書かない（事実の偽装になる）
4. **ページルートを作成**（このタスクでは別担当が対応。content側が完了したら依頼する）
   - `src/pages/diagnosis/limited/limited-{YYYY-MM}/index.astro`
   - `src/pages/diagnosis/limited/limited-{YYYY-MM}/result/[type].astro`
   - 既存月（`limited-2026-06/`）をコピーして import パスとテキストを差し替える
5. **ビルド確認**: `npm run build` でエラーが出ないことを確認してからPR/デプロイ
6. **公開後**: ハブページ（`/diagnosis/limited/`）で新テーマが表示されるかcurlで確認

## 事故を防ぐチェックリスト（月初に見る）

- [ ] 今月分の entry が `registry.ts` にあるか
- [ ] `publishedAt` が実在の日付（未来日・過去偽装なし）になっているか
- [ ] ページルート（index.astro / result/[type].astro）が存在するか
- [ ] `npm run build` が通るか

最終更新: 2026-09-06
