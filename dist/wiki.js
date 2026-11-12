(() => {
  'use strict';
  const data = window.WIKI_DATA;
  const grid = document.querySelector('#sourceGrid');
  const conceptGrid = document.querySelector('#conceptGrid');
  const search = document.querySelector('#wikiSearch');
  const count = document.querySelector('#resultCount');
  const empty = document.querySelector('#emptyState');
  let filter = '全部';

  const escape = (value) => String(value).replace(/[&<>"']/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));

  function sourceCard(source) {
    const claims = source.claims.map((claim) => `<li>${escape(claim)}</li>`).join('');
    const tags = source.tags.map((tag) => `<span class="tag">${escape(tag)}</span>`).join('');
    return `<article class="source-card" data-search="${escape([source.title, source.publisher, source.takeaway, source.limit, ...source.tags, ...source.claims].join(' ').toLowerCase())}">
      <div class="source-top"><span class="source-id">${source.id}</span><span class="source-kind">${escape(source.kind)} · ${source.year}</span></div>
      <h2>${escape(source.title)}</h2><p><b>${escape(source.publisher)}</b></p>
      <div class="tag-row">${tags}</div>
      <p>${escape(source.takeaway)}</p>
      <h3>Ingested claims</h3><ul>${claims}</ul>
      <p class="limit"><b>限制：</b>${escape(source.limit)}</p>
      <p><b>對應投影片：</b>${source.slides.join('、')}</p>
      <a class="source-link" href="${source.url}" target="_blank" rel="noopener">開啟原始來源 ↗</a>
    </article>`;
  }

  function render() {
    const query = search.value.trim().toLowerCase();
    const visible = data.sources.filter((source) => {
      const hitFilter = filter === '全部' || source.tags.includes(filter);
      const haystack = [source.title, source.publisher, source.takeaway, source.limit, ...source.tags, ...source.claims].join(' ').toLowerCase();
      return hitFilter && (!query || haystack.includes(query));
    });
    grid.innerHTML = visible.map(sourceCard).join('');
    count.textContent = `顯示 ${visible.length} / ${data.sources.length} 篇`;
    empty.style.display = visible.length ? 'none' : 'block';
  }

  conceptGrid.innerHTML = data.concepts.map((item) => `<article class="concept-card"><strong>${item.source}</strong><h3>${escape(item.title)}</h3><p>${escape(item.text)}</p></article>`).join('');
  search.addEventListener('input', render);
  document.querySelectorAll('.filter').forEach((button) => button.addEventListener('click', () => {
    filter = button.dataset.filter;
    document.querySelectorAll('.filter').forEach((item) => item.classList.toggle('active', item === button));
    render();
  }));
  render();
})();
