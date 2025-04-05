addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  if (request.url.includes('/render')) {
    // Forward to your Flask app
    const response = await fetch('https://your-flask-backend.com/render', {
      method: request.method,
      headers: request.headers,
      body: request.body,
    });
    return response;
  }

  return new Response('Welcome to Cloudflare Workers', { status: 200 });
}
