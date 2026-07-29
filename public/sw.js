const CACHE_NAME = "apple-cookbook-public-v1";
const APP_SHELL = ["/"];

function isCacheablePublicPath(pathname) {
  return !pathname.startsWith("/api/") && !pathname.startsWith("/admin") && !pathname.startsWith("/feedback");
}

async function cacheResponse(request, response) {
  if (!response || !response.ok) return response;

  const cache = await caches.open(CACHE_NAME);
  await cache.put(request, response.clone());
  return response;
}

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key.startsWith("apple-cookbook-public-") && key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin || !isCacheablePublicPath(url.pathname)) return;

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => cacheResponse(request, response))
        .catch(async () => (await caches.match(request)) || (await caches.match("/")) || Response.error())
    );
    return;
  }

  if (url.pathname.startsWith("/_next/")) {
    event.respondWith(
      caches.match(request).then((cached) => cached || fetch(request).then((response) => cacheResponse(request, response)))
    );
  }
});
