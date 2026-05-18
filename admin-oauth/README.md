# Decap CMS GitHub OAuth Proxy

A tiny Cloudflare Worker that bridges the OAuth flow between Decap CMS (running at `/admin/`) and GitHub. Free forever, zero cold-start latency.

## One-time setup

### 1. Create a GitHub OAuth App

Go to https://github.com/settings/developers → **OAuth Apps** → **New OAuth App**:

| Field | Value |
|---|---|
| Application name | `Chandan Portfolio Admin` (anything) |
| Homepage URL | `https://chandan181singh.github.io/hello-world` |
| Authorization callback URL | `https://decap-oauth.YOUR-SUBDOMAIN.workers.dev/callback` (you'll get the exact URL in step 3) |

Click **Register application**.  
Copy the **Client ID**.  
Click **Generate a new client secret** → copy that too. **Treat it like a password.**

### 2. Install Wrangler (Cloudflare's CLI)

```bash
npm install -g wrangler
wrangler login    # opens browser, sign in / sign up free
```

### 3. Deploy the Worker

```bash
cd admin-oauth
wrangler deploy
```

After deploy you'll see a URL like:
```
https://decap-oauth.YOUR-SUBDOMAIN.workers.dev
```

### 4. Set the secrets

```bash
wrangler secret put OAUTH_CLIENT_ID
# paste your GitHub OAuth Client ID, hit enter

wrangler secret put OAUTH_CLIENT_SECRET
# paste your GitHub OAuth Client Secret, hit enter
```

Optional — lock down `postMessage` origin (recommended):

```bash
wrangler secret put OAUTH_ALLOWED_ORIGIN
# paste:  https://chandan181singh.github.io
```

### 5. Update your GitHub OAuth App's callback URL

Go back to https://github.com/settings/developers, edit your OAuth App, and update the **Authorization callback URL** to:
```
https://decap-oauth.YOUR-SUBDOMAIN.workers.dev/callback
```

### 6. Point Decap CMS at the worker

Edit `public/admin/config.yml` in your portfolio repo:

```yaml
backend:
  name: github
  repo: chandan181singh/hello-world
  branch: main
  base_url: https://decap-oauth.YOUR-SUBDOMAIN.workers.dev   # ← your worker URL
  auth_endpoint: auth
```

Commit & push. After GitHub Actions deploys, visit `/admin/` on your site, click "Login with GitHub", and you're in.

## Updating the Worker later

```bash
cd admin-oauth
wrangler deploy
```

That's it. Source lives in `worker.js`, configuration in `wrangler.toml`.
