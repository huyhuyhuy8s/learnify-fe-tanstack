# VPS Setup Guide — Google Cloud Free Tier + Nginx + Docker

This guide walks through setting up a Google Cloud e2-micro VPS for Learnify, from zero to deployed.

---

## Prerequisites

- A Google Cloud account (free tier eligible)
- A domain name (optional but recommended for SSL — you can use the VPS IP directly for testing)

---

## Step 1 — Create the Google Cloud VM

### Via Console (GUI)

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Navigate to **Compute Engine → VM instances → Create Instance**
3. Fill in:

| Field        | Value                                                         |
| ------------ | ------------------------------------------------------------- |
| Name         | `learnify-vps`                                                |
| Region       | **`asia-southeast1`** (Singapore — optimal for Vietnam users) |
| Zone         | `asia-southeast1-a` (or any available in that region)         |
| Machine type | `e2-micro` (2 vCPU, 1GB — free tier)                          |
| Boot disk    | `Ubuntu 24.04 LTS`, 30GB standard (free tier)                 |
| Firewall     | ✅ Allow HTTP traffic, ✅ Allow HTTPS                         |

4. Expand **Advanced options → Networking**
   - Note the **External IP** — you'll need this
   - **Recommended:** Reserve a static IP (not Ephemeral) — see [Reserving a Static IP](#reserving-a-static-ip) below
5. Click **Create**

### Via CLI (faster)

```bash
gcloud compute instances create learnify-vps \
  --zone=asia-southeast1-a \
  --machine-type=e2-micro \
  --image-family=ubuntu-2404-lts-arm64 \
  --image-project=ubuntu-os-cloud \
  --boot-disk-size=30GB \
  --boot-disk-type=pd-standard \
  --tags=http-server,https-server

# Allow HTTP/HTTPS
gcloud compute firewall-rules create allow-http \
  --allow=tcp:80,tcp:443 \
  --target-tags=http-server,https-server
```

> **Note:** The `e2-micro` is ARM64 on Google Cloud. Ubuntu ARM64 works fine with Docker + Node.js.

### Reserving a Static IP (Recommended)

Ephemeral IPs change on every VM restart. For production, reserve a static IP:

1. **Console:** Compute Engine → VPC Network → IP Addresses → **Reserve Static IP**
2. **Or CLI:**

   ```bash
   gcloud compute addresses create learnify-ip \
     --region=asia-southeast1

   # Attach to VM
   gcloud compute instances add-access-config learnify-vps \
     --address=YOUR_RESERVED_IP \
     --zone=asia-southeast1-a
   ```

---

## Step 2 — SSH Into the VPS

> **Status: DONE** — SSH access is working via `gcloud compute ssh`

Google Cloud uses OS Login by default. The cleanest way to SSH is via `gcloud`:

```bash
gcloud compute ssh learnify-vps --zone asia-southeast1-a --project YOUR_PROJECT_ID
```

Replace `YOUR_PROJECT_ID` with your actual project ID (found in the Cloud Console header).

This will:

1. Generate an SSH key at `~/.ssh/google_compute_engine` if it doesn't exist
2. Upload it to the VM's OS Login profile
3. Log you in as `thearesia` (your local username)

### Adding your own key for direct SSH (optional but recommended)

To enable `ssh root@YOUR_VPS_IP` (cleaner for the Makefile deploy targets):

1. **Disable OS Login** (recommended for simpler SSH):
   - Console → Compute Engine → VM instance → **Edit**
   - Metadata → Add item: Key=`enable-oslogin`, Value=`FALSE`
   - Save

2. **Still inside the VM** (via `gcloud compute ssh`), copy your key to root:

   ```bash
   sudo mkdir -p /root/.ssh
   sudo cp ~/.ssh/authorized_keys /root/.ssh/authorized_keys
   sudo chmod 600 /root/.ssh/authorized_keys
   ```

3. **On your local machine**, copy the private key from the VPS to use with SSH:

   ```bash
   # From gcloud SSH session, display the private key
   cat ~/.ssh/google_compute_engine
   # Copy this content to your local machine at ~/.ssh/gcloud_key
   chmod 600 ~/.ssh/gcloud_key
   ```

4. **Test direct SSH**:
   ```bash
   ssh -i ~/.ssh/gcloud_key root@YOUR_VPS_IP
   ```

---

## Step 3 — Install Docker + Docker Compose

> **Status: IN PROGRESS** — Run these commands on the VPS

```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com | sh

# Install Docker Compose v2 (plugin)
sudo apt install docker-compose-plugin -y

# Add yourself to docker group (avoid sudo for docker commands)
sudo usermod -aG docker $USER
newgrp docker  # apply group change immediately
```

Verify:

```bash
docker --version
docker compose version
```

### Add swap (important for 1GB RAM)

```bash
# Create 2GB swap file (e2-micro has limited RAM)
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

# Persist swap across reboots
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab

# Verify
free -h  # Should show 2GB swap
```

### Reduce Node.js memory limit (prevent OOM)

```bash
echo 'NODE_OPTIONS="--max-old-space-size=350"' | sudo tee -a /etc/environment
```

---

## Step 4 — Create the deploy directory

```bash
sudo mkdir -p /opt/learnify
sudo chown $USER:$USER /opt/learnify
```

---

## Step 5 — Install Nginx + Certbot

```bash
sudo apt install nginx certbot python3-certbot-nginx -y

# Start nginx and enable on boot
sudo systemctl enable nginx
sudo systemctl start nginx

# Verify
curl -I http://localhost
# Should return 200 OK
```

---

## Step 6 — Set up the git remote and post-receive hook

### On your LOCAL machine:

```bash
cd ~/Projects/learnify-fe-tanstack

# Add the VPS as a git remote (bare repo at /opt/learnify)
git remote add vps root@YOUR_VPS_IP:/opt/learnify

# Test the connection
git push vps main
# This will fail if post-receive hook isn't set up yet — that's fine
```

### On the VPS (from gcloud compute ssh or direct SSH):

```bash
cd /opt/learnify

# Create a bare git repo (no working tree)
git init --bare /opt/learnify/.git

# Copy the post-receive hook from the repo
# First, clone or copy the hook file to the VPS
# If the repo code is already there:
cp /opt/learnify/scripts/post-receive /opt/learnify/.git/hooks/post-receive
# Or if you need to copy from local:
# scp ~/Projects/learnify-fe-tanstack/scripts/post-receive root@YOUR_VPS_IP:/opt/learnify/.git/hooks/post-receive

chmod +x /opt/learnify/.git/hooks/post-receive
```

---

## Step 7 — Create the .env.production on the VPS

```bash
# Create the secure location for .env.production
sudo mkdir -p /root/.learnify

# Generate a new SESSION_SECRET
openssl rand -base64 48
# Copy the output and use it below

# Create the env file
sudo tee /root/.learnify/.env.production << 'EOF'
# Build-time vars (VITE_* — baked into client bundle)
VITE_GRAPHQL_ENDPOINT="https://learnify-be-cu88.onrender.com/graphql"
VITE_GOOGLE_CLIENT_ID="your-google-client-id.apps.googleusercontent.com"
VITE_ELEVENLABS_API_KEY=""
VITE_ELEVENLABS_VOICE_ID="21m00Tcm4TlvDq8ikWAM"
VITE_ELENVENLABS_MODEL_ID="eleven_turbo_v2_5"
VITE_ELEVENLABS_OUTPUT_FORMAT="mp3_44100_128"
VITE_ELEVENLABS_ENABLE_TIMESTAMPS="true"
VITE_EDGETTS_VOICE_ID="zh-CN-XiaoxiaoMultilingualNeural"

# Runtime vars
NODE_ENV="production"
SESSION_SECRET="paste-your-generated-secret-here"
BACKEND_URL="https://learnify-be-cu88.onrender.com/graphql"
EOF

sudo chmod 600 /root/.learnify/.env.production
```

---

## Step 8 — First deployment

On your **local machine**:

```bash
cd ~/Projects/learnify-fe-tanstack

# Push to VPS — this triggers the post-receive hook
git push vps main
```

The post-receive hook will:

1. `git checkout -f main` into `/opt/learnify` (working tree)
2. Copy `.env.production` from `/root/.learnify/`
3. `docker compose up -d --build` — builds and starts containers

### Monitor the build

```bash
# Watch the Docker build logs on the VPS
docker compose -f /opt/learnify/docker-compose.yml logs -f --tail=100
```

The first build on the e2-micro will take **10-20 minutes** (1GB RAM + slow disk IO). Be patient.

> **Tip:** If Docker build fails due to OOM (out of memory), add swap (Step 3) and reduce Node.js memory limit to 256MB.

---

## Step 9 — Configure Nginx

Once the app containers are running and healthy:

```bash
# Test the nginx config
sudo nginx -t

# Reload nginx to pick up the new config
sudo systemctl reload nginx

# Check if it's running
curl -I http://localhost
```

You should see `200 OK` from the health check.

---

## Step 10 — Let's Encrypt SSL (optional but recommended)

```bash
# Stop nginx temporarily (certbot needs port 80)
sudo systemctl stop nginx

# Get the certificate (replace with your domain)
sudo certbot certonly --standalone -d yourdomain.com --non-interactive --agree-tos -m your@email.com

# Copy the certificates to the certbot directories
sudo mkdir -p /opt/learnify/certbot/conf/live/yourdomain.com
sudo cp /etc/letsencrypt/live/yourdomain.com/fullchain.pem /opt/learnify/certbot/conf/live/yourdomain.com/
sudo cp /etc/letsencrypt/live/yourdomain.com/privkey.pem /opt/learnify/certbot/conf/live/yourdomain.com/
sudo cp /etc/letsencrypt/options-ssl-nginx.conf /opt/learnify/certbot/conf/

# Update nginx/nginx.conf — uncomment the HTTPS server block, update domain
# Then restart nginx
sudo systemctl start nginx
```

Certbot auto-renews every 90 days. Check the timer: `systemctl status certbot.timer`.

---

## Step 11 — Test the full stack

```bash
# From your local machine
curl http://YOUR_VPS_IP/health
# Or if SSL is set up:
curl https://yourdomain.com/health
```

Expected: `OK`

---

## Troubleshooting

### Build fails on e2-micro (out of memory)

```bash
# Reduce Node.js memory
echo 'NODE_OPTIONS="--max-old-space-size=256"' | sudo tee -a /etc/environment

# Use swap
sudo swapon /swapfile
```

### Docker daemon not running

```bash
sudo systemctl start docker
sudo systemctl enable docker
```

### Container keeps restarting

```bash
docker compose -f /opt/learnify/docker-compose.yml logs --tail=100 app
```

### Nginx 502 Bad Gateway

- The `app` container is not healthy yet. Wait 40 seconds (start_period in compose).
- Or the `app` service crashed. Check: `docker compose ps`

### Git push hangs or fails

```bash
# Test SSH directly
ssh -i ~/.ssh/gcloud_key root@YOUR_VPS_IP

# Check git remote
git remote -v

# Check post-receive hook permissions
ls -la /opt/learnify/.git/hooks/post-receive
```

---

## Architecture recap (what you just built)

```
Your machine                      VPS (YOUR_VPS_IP)
  │                                     │
  │ git push vps main                   │
  ├────────────────────────────────────►│ post-receive fires
  │                                     │   → git checkout -f main
  │                                     │   → docker compose up -d --build
  │                                     │
  │                                     │ ┌─────────────────────────┐
  │                                     │ │ Docker                  │
  │                                     │ │  ├─ app (srvx:3000)    │
  │                                     │ │  └─ nginx (:80/:443)   │
  │                                     │ │       ↑ proxy pass     │
  │                                     │ │       /                │
  │                                     │ └─────────────────────────┘
  │                                     │
  │  curl https://yourdomain.com/        │
  └─────────────────────────────────────► nginx → srvx → React SSR
       ◄─────────────────────────────────┘ HTML streamed back
```

---

## Useful one-liners

```bash
# SSH into VPS with gcloud (OS Login)
gcloud compute ssh learnify-vps --zone asia-southeast1-a --project YOUR_PROJECT_ID

# SSH with your own key (after setting up authorized_keys)
ssh -i ~/.ssh/gcloud_key root@YOUR_VPS_IP

# Tail logs
docker compose -f /opt/learnify/docker-compose.yml logs -f --tail=20

# Restart app container
docker compose -f /opt/learnify/docker-compose.yml restart app

# Check disk usage
df -h

# Check Docker image size
docker images learnify-fe-tanstack-app --format '{{.Size}}'
```

---

## Next steps after first deploy

1. **Set up Cloudflare** (free plan) in front of the VPS — DDoS protection + CDN for static assets
2. **Monitor**: Add UptimeRobot (free) to ping `/health` every minute
3. **Logs**: Pipe Docker logs to a file or Loki for debugging
4. **Backups**: Snapshot the Google Cloud disk weekly
