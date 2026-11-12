import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const wiki = path.join(root, 'wiki');
const read = (file) => fs.readFileSync(file, 'utf8');
const manifest = JSON.parse(read(path.join(wiki, 'ingest-manifest.json')));

assert.ok(manifest.sources.length >= 5, '至少需要 ingest 5 篇資料');
const ids = new Set();
for (const source of manifest.sources) {
  assert.match(source.id, /^S\d+$/, `來源 ID 格式錯誤：${source.id}`);
  assert.ok(!ids.has(source.id), `來源 ID 重複：${source.id}`);
  ids.add(source.id);
  assert.equal(source.status, 'ingested', `${source.id} 尚未完成 ingest`);
  assert.match(source.url, /^https:\/\//, `${source.id} 缺少 HTTPS 來源`);
  assert.ok(source.tags.length >= 2, `${source.id} 標籤不足`);
  const note = fs.readdirSync(path.join(wiki, 'sources')).find((name) => name.startsWith(`${source.id}-`));
  assert.ok(note, `${source.id} 缺少來源筆記`);
  const noteText = read(path.join(wiki, 'sources', note));
  assert.match(noteText, /## 核心主張/, `${source.id} 缺少核心主張`);
  assert.match(noteText, /## 限制/, `${source.id} 缺少限制`);
}

const pages = ['index.html', 'wiki.html', 'slides.html', 'process.html'];
for (const page of pages) {
  const html = read(path.join(dist, page));
  assert.doesNotMatch(html, /TODO|待補|lorem ipsum/i, `${page} 有未完成內容`);
  for (const match of html.matchAll(/(?:src|href)=["']([^"'#?]+)[^"']*["']/g)) {
    const target = match[1];
    if (/^(?:https?:|mailto:|data:)/.test(target)) continue;
    assert.ok(fs.existsSync(path.join(dist, target)), `${page} 引用不存在：${target}`);
  }
}

const slidesHtml = read(path.join(dist, 'slides.html'));
const slides = [...slidesHtml.matchAll(/<section class="slide(?: active)?"[\s\S]*?<\/section>/g)].map((match) => match[0]);
assert.equal(slides.length, 10, `教學簡報應有 10 張，目前 ${slides.length}`);
for (const [position, slide] of slides.entries()) {
  const sources = slide.match(/data-source="([^"]+)"/)?.[1]?.split(/\s+/).filter(Boolean) || [];
  assert.ok(sources.length > 0, `第 ${position + 1} 張投影片缺少來源`);
  for (const source of sources) assert.ok(ids.has(source), `第 ${position + 1} 張引用不存在的來源 ${source}`);
}
assert.match(slidesHtml, /id="prev"/, '簡報缺少上一張控制');
assert.match(slidesHtml, /id="next"/, '簡報缺少下一張控制');

const processHtml = read(path.join(dist, 'process.html'));
assert.ok((processHtml.match(/data-node=/g) || []).length >= 7, '流程節點不足');
for (const loop of ['Loop A', 'Loop B', 'Loop C']) assert.match(processHtml, new RegExp(loop), `缺少 ${loop}`);
assert.match(processHtml, /最常出錯/, '缺少反思內容');
assert.match(read(path.join(wiki, 'execution-log.md')), /Run 01[\s\S]*失敗[\s\S]*Run 02[\s\S]*通過/, '執行紀錄不完整');

for (const script of ['data.js', 'wiki.js', 'slides.js']) new vm.Script(read(path.join(dist, script)), { filename: script });

console.log(`PASS: ${manifest.sources.length} 篇 Wiki 來源、${slides.length} 張投影片、3 個回圈與實際執行紀錄均通過。`);
