window.WIKI_DATA = {
  topic: '生成式 AI 幻覺：如何辨識、查證與降低錯誤',
  ingestedAt: '2026-11-13',
  sources: [
    {
      id: 'S1', kind: '官方風險框架', year: 2024,
      title: 'NIST Generative AI Profile', publisher: 'NIST AI 600-1',
      url: 'https://doi.org/10.6028/NIST.AI.600-1',
      tags: ['定義', '風險', '治理'], slides: [2, 4, 10],
      takeaway: '用 confabulation 描述自信呈現錯誤、偏離輸入或前後矛盾的生成內容。',
      claims: ['生成模型依統計分布產生輸出，因此可能產生事實錯誤或內部矛盾。', '虛構引文與看似合理的推理會增加不當信任。', '高風險決策情境需要更嚴格的監控與人工覆核。'],
      limit: '跨產業風險文件，不提供單一模型的幻覺率。'
    },
    {
      id: 'S2', kind: '官方研究說明', year: 2025,
      title: 'Why language models hallucinate', publisher: 'OpenAI',
      url: 'https://openai.com/index/why-language-models-hallucinate/',
      tags: ['定義', '成因', '不確定性'], slides: [2, 3, 10],
      takeaway: '下一詞預測與只獎勵正確率的評估，可能讓模型在不知道時仍選擇猜測。',
      claims: ['幻覺可表現為合理但錯誤的陳述。', '罕見且任意的事實不容易只靠統計模式可靠推知。', '評估若只獎勵答對，可能低估適當棄答的價值。'],
      limit: '提出重要成因，但不代表所有錯誤只有單一原因。'
    },
    {
      id: 'S3', kind: '研究論文', year: 2020,
      title: 'Retrieval-Augmented Generation', publisher: 'NeurIPS',
      url: 'https://proceedings.neurips.cc/paper/2020/hash/6b493230-Abstract.html',
      tags: ['檢索', '來源', '降低風險'], slides: [6],
      takeaway: 'RAG 把模型參數記憶與外部可檢索記憶結合，改善知識密集任務與來源追溯。',
      claims: ['RAG 結合參數與非參數記憶。', '外部知識有助於知識更新與來源追溯。', '原研究在多個任務觀察到更具事實性的生成。'],
      limit: '檢索錯誤、來源品質與生成不忠實仍會造成問題，不能說完全消除幻覺。'
    },
    {
      id: 'S4', kind: '研究論文', year: 2023,
      title: 'SelfCheckGPT', publisher: 'EMNLP / ACL Anthology',
      url: 'https://aclanthology.org/2023.emnlp-main.557/',
      tags: ['檢測', '抽樣', '一致性'], slides: [7],
      takeaway: '多次抽樣若彼此分歧，可作為模型對該事實不穩定的風險訊號。',
      claims: ['方法不需外部資料庫，也能用於黑箱模型。', '已知內容的抽樣回答通常較一致。', '可偵測非事實句子並排序段落風險。'],
      limit: '一致不等於正確；模型可能穩定重複同一個錯誤。'
    },
    {
      id: 'S5', kind: '研究論文', year: 2023,
      title: 'FActScore', publisher: 'EMNLP / ACL Anthology',
      url: 'https://aclanthology.org/2023.emnlp-main.741/',
      tags: ['評估', '原子事實', '證據'], slides: [5, 9],
      takeaway: '將長文拆成原子事實，再計算被可靠知識來源支持的比例。',
      claims: ['長文常混合有支持與無支持的資訊。', '整段二元判斷不足以指出具體錯誤。', '原子化能讓查證與修訂更細緻。'],
      limit: '結果依賴知識來源與原子事實拆分品質；找不到證據不必然等於錯誤。'
    },
    {
      id: 'S6', kind: '研究論文', year: 2024,
      title: 'Chain-of-Verification', publisher: 'Findings of ACL',
      url: 'https://aclanthology.org/2024.findings-acl.212/',
      tags: ['驗證', '修訂', '降低風險'], slides: [8, 9, 10],
      takeaway: '先寫初稿，再設計獨立查證問題，最後依結果修訂答案。',
      claims: ['CoVe 包含初稿、規劃查證、獨立回答與修訂四步。', '獨立回答可降低被原錯誤錨定的風險。', '原研究在多種任務觀察到幻覺降低。'],
      limit: '自我驗證可能沿用相同錯誤知識；重要主張仍需外部來源。'
    }
  ],
  concepts: [
    { title: '原子主張', text: '每句只保留一個可判定事實，再標記支持、反駁或證據不足。', source: 'S5' },
    { title: '不確定性', text: '「我不知道」有時比自信猜測更可靠；評估也應區分錯誤與棄答。', source: 'S2' },
    { title: '外部記憶', text: '檢索讓模型參照可更新的外部知識，但仍需要檢查來源品質與生成忠實度。', source: 'S3' },
    { title: '獨立驗證', text: '把查證問題與原始答案分開處理，降低錯誤被重複帶入的風險。', source: 'S6' }
  ]
};
