# AI 幻覺查證室｜LLM Wiki × 教學 HTML 簡報

這是一份獨立的新作業專案，以「生成式 AI 幻覺：如何辨識、查證與降低錯誤」為主題。專案先將 6 篇官方文件與研究論文 ingest 成可追蹤的 LLM Wiki，再從 Wiki 的原子主張、限制與來源對應產生教學型 HTML 簡報。

## 成果結構

- `wiki/`：主題決策、6 篇來源筆記、概念頁與實際執行紀錄。
- `dist/wiki.html`：可搜尋、篩選的瀏覽版 Wiki。
- `dist/slides.html`：支援鍵盤、觸控與列印的教學 HTML 簡報。
- `dist/process.html`：loop / graph、重試條件、檢查節點與反思。
- `scripts/validate.mjs`：檢查來源數量、引用對應、頁面連結與必要內容。

## loop / graph

```text
主題討論
  ↓
取得候選資料 → 來源品質檢查 ──不合格──↺ 重新搜尋
  ↓ 合格
Ingest Wiki → 原子主張／限制檢查 ──缺證據──↺ 回到來源
  ↓ 通過
查詢 Wiki → 教學大綱 → 投影片草稿
                         ↓
來源對應檢查 ──引用不足──↺ 回到 Wiki 查詢
  ↓ 通過
HTML 產生 → 可讀性／鍵盤／連結檢查 ──失敗──↺ 修正頁面
  ↓
發布與反思
```

## 執行

```bash
npm run check
npm run serve
```

## 設計理由

最容易出錯的是「摘要後的主張是否真的被來源支持」。因此第二次迭代把證據檢查從投影片完成後，提前到 Wiki ingest 階段：每篇筆記必須同時記錄核心主張、適用範圍與限制，沒有證據的句子不能進入大綱。這能減少後端返工，也讓 Wiki 與簡報之間的對應可追蹤。

## 來源

Wiki ingest 來源包括 NIST AI 600-1、OpenAI 的幻覺成因研究、NeurIPS RAG 論文，以及 ACL Anthology 的 SelfCheckGPT、FActScore、Chain-of-Verification。完整網址與用途記錄於 `wiki/ingest-manifest.json`。
