# Deployment — GitOps from GitHub to Hetzner VPS

Every push to `master` triggers `.github/workflows/deploy.yml`, which:

1. Builds the Next.js static export on a GitHub-hosted runner.
2. SSH-rsyncs the `out/` directory into the nginx docroot on the Hetzner VPS.

Static files only — no nginx reload needed.

---

## One-time setup

### 1. On the VPS — find the docroot

SSH in as root (you already do this from VSCode-Remote):

```bash
# Which file serves manuel-buser.com?
grep -rl "manuel-buser" /etc/nginx/

# Print the relevant server block (replace the path below if grep finds something else)
cat /etc/nginx/sites-available/manuel-buser.com

# Look for the line:  root /var/www/manuel-buser.com/html;
# Note the path — you'll need it as HETZNER_PATH in the GitHub secrets below.
```

If the docroot is something else (e.g. `/srv/portfolio/public`), use that.

### 2. On the VPS — generate a dedicated deploy SSH keypair

This key is *separate* from your laptop's key. GitHub Actions will use it.

```bash
ssh-keygen -t ed25519 -f ~/.ssh/github_deploy -N "" -C "github-actions-deploy"

# Authorize this new key for root logins on the VPS
cat ~/.ssh/github_deploy.pub >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys

# Print the PRIVATE key (you'll paste this into a GitHub secret)
cat ~/.ssh/github_deploy
```

Keep that terminal open — you'll copy the private key block (starting with `-----BEGIN OPENSSH PRIVATE KEY-----`) into GitHub in step 4.

### 3. On the VPS — remove the spending-tracker

You said it can go. Adjust the path to wherever it actually lives:

```bash
# First, check what's there
ls -la /var/www/ /srv/ /opt/ 2>/dev/null | grep -i spending

# Look in active nginx configs too
grep -rli spending /etc/nginx/

# When you've confirmed the path, remove its files and any nginx site config
# Example (verify before running!):
#   rm -rf /var/www/spending-tracker
#   rm /etc/nginx/sites-enabled/spending-tracker
#   rm /etc/nginx/sites-available/spending-tracker
#   systemctl reload nginx
```

### 4. On GitHub — add 2 repository secrets

Host / user / docroot are hardcoded in the workflow (they aren't actually secret — the IP is publicly resolvable via DNS). Only the two real secrets need to live in GitHub.

Go to https://github.com/manuel-buser/webpage-manuel/settings/secrets/actions → **New repository secret**.

| Secret name | Value |
|---|---|
| `HETZNER_SSH_KEY` | The full private key from step 2 (entire `-----BEGIN…` to `…END OPENSSH PRIVATE KEY-----` block, including the trailing newline) |
| `NEXT_PUBLIC_WEB3FORMS_KEY` | The same value that's in your local `.env.local` |

If your VPS IP, user, or docroot ever change, edit the `env:` block at the top of `.github/workflows/deploy.yml`.

### 5. Push and watch

```powershell
git push origin master
```

Watch the run at https://github.com/manuel-buser/webpage-manuel/actions. First run usually takes ~2 minutes (npm install dominates). Subsequent runs are faster thanks to the npm cache.

---

## Verifying after deploy

```bash
# On the VPS
ls -la /var/www/manuel-buser.com/html  # should show fresh timestamps

# In a browser
# https://manuel-buser.com  → should show the new tagline + Career nav item
```

If the site looks stale, hard-refresh (Ctrl+Shift+R). Browsers and any CDN in front may cache aggressively.

---

## Rollback

```bash
# Find the previous good commit
git log --oneline

# Revert that commit and push
git revert <bad-sha>
git push origin master
```

GitHub Actions will redeploy the previous version automatically.

Or roll back instantly without going through GitHub by keeping a snapshot on the VPS:

```bash
# On the VPS, run this BEFORE deploying a risky change
cp -r /var/www/manuel-buser.com/html /var/www/manuel-buser.com/html.backup
# To roll back:
rsync -av --delete /var/www/manuel-buser.com/html.backup/ /var/www/manuel-buser.com/html/
```

---

## Notes on the workflow

- `concurrency.cancel-in-progress: false` — if you push twice in a row, the second push waits for the first deploy to finish. Avoids half-overwritten `out/` on the VPS.
- `rsync --delete` — removes files from the VPS that no longer exist in the build. Keeps things clean. If you have files outside `out/` that need to live in the same docroot (e.g. a `resume.pdf` you upload manually), put them in a sibling directory and adjust nginx to serve from a parent that contains both.
- Build runs on GitHub's free Ubuntu runners — your VPS doesn't need Node installed.
- The Web3Forms access key is injected at build time via the env var, so it ends up baked into the static JS. That's how Next.js handles `NEXT_PUBLIC_*` vars; it's the same exposure the original hardcoded value had.
