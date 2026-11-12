# LLM Wiki：AI 幻覺查證室

## 核心問題

當大型語言模型產生看似合理、實際錯誤或無法由證據支持的內容時，使用者應如何辨識、查證與降低風險？

## 知識路徑

1. **定義與風險**：S1 NIST、S2 OpenAI
2. **外部知識與來源**：S3 RAG
3. **沒有外部資料時的自我一致性檢查**：S4 SelfCheckGPT
4. **把長文拆成原子事實**：S5 FActScore
5. **先草擬、再獨立驗證、最後修訂**：S6 Chain-of-Verification

## 共識

- 幻覺通常是「合理但錯誤或無支持」的內容，不等於一般創意生成。
- 流暢度與自信語氣不能證明內容正確。
- 外部檢索、原子化查證、重複抽樣與獨立驗證能降低風險，但沒有單一方法保證完全正確。
- 高風險情境需要可靠來源與人類覆核。

## 對應成果

- 瀏覽版 Wiki：`dist/wiki.html`
- 教學簡報：`dist/slides.html`
- loop / graph 與反思：`dist/process.html`
- 執行紀錄：`wiki/execution-log.md`
