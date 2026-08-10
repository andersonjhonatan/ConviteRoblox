import assert from "node:assert/strict";
import test from "node:test";

const developmentPreviewMeta =
  /<meta(?=[^>]*\bname=["']codex-preview["'])(?=[^>]*\bcontent=["']development["'])[^>]*>/i;

async function loadWorker() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${Math.random()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker;
}

async function requestPath(path = "/") {
  const worker = await loadWorker();
  return worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("renders complete social and browser metadata", async () => {
  const response = await requestPath();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();

  assert.match(html, /<html[^>]*lang=["']pt-BR["']/i);
  assert.match(html, /<title>Convite Roblox — Miguel 8 anos<\/title>/i);
  assert.match(html, developmentPreviewMeta);
  assert.match(html, /rel=["']canonical["']/i);
  assert.match(html, /property=["']og:image["']/i);
  assert.match(html, /name=["']twitter:card["']/i);
  assert.match(html, /rel=["']manifest["']/i);
  assert.match(html, /favicon\.svg\?v=2/i);
});

test("adds baseline security headers", async () => {
  const response = await requestPath();
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  assert.equal(response.headers.get("x-frame-options"), "DENY");
  assert.equal(response.headers.get("referrer-policy"), "strict-origin-when-cross-origin");
  assert.match(response.headers.get("permissions-policy") ?? "", /camera=\(\)/);
});

test("publishes privacy, robots and sitemap routes", async () => {
  for (const path of ["/privacidade", "/robots.txt", "/sitemap.xml", "/manifest.webmanifest"]) {
    const response = await requestPath(path);
    assert.equal(response.status, 200, `${path} should render`);
  }
});
