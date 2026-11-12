# 繳交內容｜AI 幻覺查證室

> 繳交標題：`【學校簡稱】 【學號】 【系級簡稱】 【姓名】 AI 幻覺查證室`

## 1. LLM Wiki 主題與簡短介紹

主題是「生成式 AI 幻覺：如何辨識、查證與降低錯誤」。我先比較 Prompt Engineering、RAG 與 AI 幻覺查證三個候選方向，最後選擇最適合初學者、又能建立明確檢查 loop 的「AI 幻覺查證」。Wiki 共 ingest 6 篇資料，包括 NIST、OpenAI、NeurIPS 與 ACL Anthology 的官方文件或原始研究。每篇資料都整理成來源 ID、核心主張、限制、標籤與投影片用途，讓簡報中的知識可以回到來源查證。

## 2. LLM Wiki 連結或成果

- 線上 Wiki：https://ai-hallucination-wiki-deck-2026.yu-cheng-gao-0906.chatgpt.site/wiki.html
- GitHub 中的 Wiki 原始成果：https://github.com/a0975895067-del/ai-hallucination-wiki-deck/tree/main/wiki

## 3. 教學 HTML 簡報連結

https://ai-hallucination-wiki-deck-2026.yu-cheng-gao-0906.chatgpt.site/slides.html

簡報共有 10 張，從「什麼是幻覺」開始，依序說明成因、風險、原子主張、RAG、SelfCheckGPT、Chain-of-Verification 與 STOP 查證法，支援鍵盤、手機、進度列與列印。

## 4. loop / graph 流程圖與文字說明

完整互動流程頁：https://ai-hallucination-wiki-deck-2026.yu-cheng-gao-0906.chatgpt.site/process.html

```text
討論主題與學習目標
  ↓
取得資料 → G1 來源閘門 ──失敗──↺ 重新搜尋
  ↓
Ingest Wiki → G2 主張／限制閘門 ──失敗──↺ 補證據或刪除主張
  ↓
查詢 Wiki → 教學大綱 → G3 引用閘門 ──失敗──↺ 重查 Wiki
  ↓
產生 HTML → G4 介面閘門 ──失敗──↺ 修正版面與互動
  ↓
發布 → 保存執行紀錄與反思
```

重複執行的地方有三個：來源不合格會重搜；主張超出證據會回到 ingest 或 Wiki 查詢；介面在手機、鍵盤或連結測試失敗時會回到 HTML 節點。這樣設計是為了讓錯誤回到最接近根因的節點，而不是在最後只修改文字表面。

## 5. 一次實際執行的結果或檢查紀錄

- Run 01：完成 6 篇 ingest 與 24 條原子主張後，第一次大綱把 RAG 寫成「利用外部資料即可消除幻覺」。來源對應檢查發現 S3 只支持改善事實性與來源追溯，因此停止產生 HTML。
- 修正：把「限制」改成每篇 Wiki 的必填欄位，並把證據檢查提前到大綱之前；RAG 改寫為降低風險，另補上檢索錯誤、來源品質與生成不忠實等限制。
- Run 02：`npm run check` 通過；自動檢查結果為 6 篇來源、10 張投影片、3 個回圈，所有來源 ID、內部連結與必要反思內容均存在。
- 瀏覽器檢查：Wiki 搜尋「檢索」只顯示 RAG；「檢測」分類只顯示 SelfCheckGPT；簡報上一張／下一張與手機版面正常；流程頁可見 7 節點、4 閘門、3 回圈及兩次 Run 紀錄。

## 6. 反思：哪個節點最常出錯？如何調整？

最常出錯的是「整理重點 → 教學大綱」。摘要時很容易把研究中的「降低、改善」壓縮成好記但不正確的「消除」。發現問題後，我把檢查從 HTML 完成後，提前到 Wiki ingest 完成、進入大綱之前。Workflow 因此新增 G2 主張／限制閘門：每個主張必須同時保留適用範圍與限制，未被證據支持就不能進入簡報。這能避免同一個誇大內容被複製到多張投影片，也讓限制本身成為教學內容。

## Repository

https://github.com/a0975895067-del/ai-hallucination-wiki-deck
