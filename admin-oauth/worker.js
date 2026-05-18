/* Decap CMS GitHub OAuth proxy for Cloudflare Workers.
 *
 * What it does
 *   /auth          → redirects browser to GitHub OAuth.
 *   /callback      → GitHub sends the user back here with ?code=…;
 *                    we exchange the code for an access_token and
 *                    pass it back to Decap via postMessage.
 *
 * Bindings (set as Worker secrets — Settings → Variables → Encrypted):
 *   OAUTH_CLIENT_ID      GitHub OAuth App "Client ID"
 *   OAUTH_CLIENT_SECRET  GitHub OAuth App "Client Secret"
 *
 * Optional plain variables:
 *   OAUTH_ALLOWED_ORIGIN  default "*" — set to your site URL to lock down postMessage,
 *                         e.g. "https://chandan181singh.github.io"
 *   OAUTH_SCOPE           default "repo,user" — the GitHub scopes requested
 */

const html = (status, content, origin) => `<!doctype html>
<html><head><meta charset="utf-8"><title>Decap OAuth</title></head>
<body>
<script>
  (function () {
    function send (msg) {
      try { window.opener && window.opener.postMessage(msg, ${JSON.stringify(origin)}); } catch (e) {}
    }
    function relay (event) {
      if (!/^authorizing:/.test(event.data)) return;
      send("authorization:github:${status}:" + JSON.stringify(${JSON.stringify(content)}));
      window.removeEventListener("message", relay);
    }
    window.addEventListener("message", relay, false);
    send("authorizing:github");
  })();
</script>
</body></html>`;

async function exchangeCode(code, env) {
  const res = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "user-agent": "decap-oauth-worker",
    },
    body: JSON.stringify({
      client_id: env.OAUTH_CLIENT_ID,
      client_secret: env.OAUTH_CLIENT_SECRET,
      code,
    }),
  });
  return res.json();
}

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    const origin = env.OAUTH_ALLOWED_ORIGIN || "*";
    const scope = env.OAUTH_SCOPE || "repo,user";

    if (url.pathname === "/auth" || url.pathname === "/") {
      const redirectUri = `${url.origin}/callback`;
      const ghUrl =
        "https://github.com/login/oauth/authorize" +
        `?client_id=${encodeURIComponent(env.OAUTH_CLIENT_ID)}` +
        `&scope=${encodeURIComponent(scope)}` +
        `&redirect_uri=${encodeURIComponent(redirectUri)}` +
        `&state=${crypto.randomUUID()}`;
      return Response.redirect(ghUrl, 302);
    }

    if (url.pathname === "/callback") {
      const code = url.searchParams.get("code");
      if (!code) {
        return new Response(html("error", { message: "No code" }, origin), {
          headers: { "content-type": "text/html" },
        });
      }
      const data = await exchangeCode(code, env);
      if (data.error || !data.access_token) {
        return new Response(
          html("error", { message: data.error_description || "OAuth exchange failed" }, origin),
          { headers: { "content-type": "text/html" } },
        );
      }
      return new Response(
        html("success", { token: data.access_token, provider: "github" }, origin),
        { headers: { "content-type": "text/html" } },
      );
    }

    return new Response("Decap OAuth proxy. Routes: /auth, /callback", {
      headers: { "content-type": "text/plain" },
    });
  },
};
