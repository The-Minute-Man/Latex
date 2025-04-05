addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  // Check the URL path
  const url = new URL(request.url);
  
  // Serve static files from Cloudflare Pages
  if (url.pathname === '/' || url.pathname === '/index.html') {
    return fetch('https://vproplan.pages.dev/index.html');
  }

  // Default response
  return new Response('Welcome to Cloudflare Workers', { status: 200 });
}
