/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

addEventListener('fetch', event => {
	event.respondWith(handleRequest(event.request));
  });
  
  const ALLOWED_ORIGIN = 'https://onezer00.github.io';
  const CORS_HEADERS = {
	'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
	'Access-Control-Allow-Methods': 'GET, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type',
	'Access-Control-Max-Age': '86400',
  };
  
  async function handleRequest(request) {
	const { method, url } = request;
	const u = new URL(url);
  
	// Responde requisição preflight (OPTIONS)
	if (method === 'OPTIONS') {
	  return new Response(null, {
		status: 204,
		headers: CORS_HEADERS,
	  });
	}
  
	if (u.pathname === '/api/badges' && method === 'GET') {
	  try {
		const badges = await scrapeBadges();
		return new Response(JSON.stringify(badges), {
		  status: 200,
		  headers: {
			'Content-Type': 'application/json',
			...CORS_HEADERS,
		  },
		});
	  } catch {
		return new Response(JSON.stringify([]), {
		  status: 200,
		  headers: {
			'Content-Type': 'application/json',
			...CORS_HEADERS,
		  },
		});
	  }
	}
  
	return new Response('Not Found', {
	  status: 404,
	  headers: CORS_HEADERS,
	});
  }
  
  async function scrapeBadges() {
	const resp = await fetch('https://www.credly.com/users/joao-pecanha/badges?page=1&page_size=48&sort=rank', {
	  headers: {
		accept: 'application/json, text/plain, */*',
		'x-requested-with': 'XMLHttpRequest',
	  },
	});
	if (!resp.ok) throw new Error(`Erro ${resp.status}`);
	const json = await resp.json();
	return (json.data || []).map(badge => ({
	  id: badge.id,
	  name: badge.badge_template?.name,
	  description: badge.badge_template?.description,
	  image: badge.badge_template?.image_url || badge.image_url,
	  url: badge.badge_template?.url,
	  issued_at: badge.issued_at_date,
	  issuer: badge.badge_template?.issuer?.entities?.[0]?.entity?.name,
	  skills: badge.badge_template?.skills?.map(s => s.name) || [],
	}));
  }
  