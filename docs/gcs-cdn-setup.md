# GCS + Cloud CDN Integration Guide

## Overview

Serve 3D model files (GLB) from a Google Cloud Storage bucket with Cloud CDN, reducing VPS bandwidth and improving global load times.

**Current model sizes:**
| File | Size |
|------|------|
| `teacher.glb` | ~6.2 MB |
| `teacher_animation.glb` | ~1.9 MB |
| `classroom_default.glb` | ~3.5 MB |
| **Total** | **~11.6 MB** |

---

## Step 1: Create GCS Bucket

```bash
gcloud storage buckets create gs://learnify-models --location=us-central1 --uniform-bucket-level-access
```

- `--uniform-bucket-level-access`: Required for CDN. Uniform IAM permissions across all objects.

## Step 2: Upload Models

Copy your Draco-compressed models from `public/models/`:

```bash
gcloud storage cp ./public/models/*.glb gs://learnify-models/
```

## Step 3: Make Bucket Public (CDN-backed)

```bash
# Grant allUsers read access to objects in the bucket
gcloud storage buckets add-iam-policy-binding gs://learnify-models \
  --member=allUsers --role=roles/storage.objectViewer
```

Alternatively, use the Cloud Console: Bucket → Permissions → Add → Principal: `allUsers`, Role: `Storage Object Viewer`.

## Step 4: Set Cache Headers on Uploaded Models

```bash
# Set cache-control: 1 year for all GLB files
gcloud storage objects update 'gs://learnify-models/*.glb' \
  --cache-control="public, max-age=31536000, immutable"
```

If you update models later, version them with a hash suffix (e.g., `teacher-v2.glb`) and update the frontend URLs to bust the cache.

## Step 5: Enable Cloud CDN

```bash
# Create a global external IP for the load balancer
gcloud compute addresses create learnify-cdn-ip --global

# Create a backend bucket pointing to your GCS bucket
gcloud compute backend-buckets create learnify-models-backend \
  --gcs-bucket-name=learnify-models \
  --enable-cdn

# Create a URL map
gcloud compute url-maps create learnify-models-url-map \
  --default-backend-bucket=learnify-models-backend

# Create a target HTTP proxy
gcloud compute target-http-proxies create learnify-models-http-proxy \
  --url-map=learnify-models-url-map

# Create a forwarding rule (standard tier for lower cost)
gcloud compute forwarding-rules create learnify-models-http-rule \
  --address=learnify-cdn-ip \
  --target-http-proxy=learnify-models-http-proxy \
  --global \
  --ports=80

# Get the CDN IP address
gcloud compute addresses describe learnify-cdn-ip --global
```

After this completes, you'll have a CDN URL like `http://34.XXX.XXX.XXX/models/teacher.glb`.

## Step 6: (Optional) Custom Domain with Managed SSL

If you want to serve from `cdn.learnify-edu.duckdns.org`:

```bash
# Get a new DuckDNS subdomain or create a CNAME record
# Then: create a managed SSL certificate
gcloud compute ssl-certificates create learnify-cdn-cert \
  --domains=cdn.learnify-edu.duckdns.org

# Create HTTPS proxy
gcloud compute target-https-proxies create learnify-models-https-proxy \
  --url-map=learnify-models-url-map \
  --ssl-certificates=learnify-cdn-cert

# Create HTTPS forwarding rule
gcloud compute forwarding-rules create learnify-models-https-rule \
  --address=learnify-cdn-ip \
  --target-https-proxy=learnify-models-https-proxy \
  --global \
  --ports=443
```

SSL provisioning takes 10-30 minutes. Verify:

```bash
gcloud compute ssl-certificates describe learnify-cdn-cert
```

Once `status: ACTIVE`, your models are available at `https://cdn.learnify-edu.duckdns.org/models/teacher.glb`.

## Step 7: Update Frontend URLs

Edit `src/routes/learner_/lessons/-components/TeacherContainer/index.tsx`:

```tsx
// Change from local paths to CDN paths
// Before:
const teacherModel = useGLTF("/models/teacher.glb");

// After:
const CDN_BASE = import.meta.env.PROD
  ? "https://cdn.learnify-edu.duckdns.org"
  : "";
const teacherModel = useGLTF(`${CDN_BASE}/models/teacher.glb`);
```

Or use an environment variable:

```tsx
// vite.config.ts
define: {
  __MODEL_CDN_URL__: JSON.stringify(process.env.VITE_MODEL_CDN_URL || ""),
},
```

Then in the component:

```tsx
const CDN_BASE = (import.meta as any).env?.VITE_MODEL_CDN_URL || "";
```

## Step 8: Update Nginx as Fallback

The nginx config in this project already has a `/models/` cache zone. Optionally proxy CDN:

```nginx
# nginx/nginx.conf — add as fallback in case CDN is unavailable
location ~ ^/models/ {
    # Replace with your CDN IP/domain
    proxy_pass http://34.XXX.XXX.XXX;
    proxy_http_version 1.1;
    proxy_set_header Host cdn.learnify-edu.duckdns.org;
    proxy_cache static;
    proxy_cache_valid 200 365d;
    proxy_cache_use_stale error timeout updating;
    proxy_cache_lock on;
}
```

Or keep serving from the app with nginx cache (current behavior).

## Step 9: Verify

```bash
# Test direct access
curl -I https://cdn.learnify-edu.duckdns.org/models/teacher.glb

# Should show:
# HTTP/2 200
# cache-control: public, max-age=31536000, immutable
# content-type: model/gltf-binary
# via: 1.1 google
# age: 0 (first request) → increases on subsequent requests
```

## Cost Estimate

Cloud CDN pricing (as of 2025):

- **Cache egress**: $0.02–0.08/GB (varies by region)
- **Cache fill**: $0.01/GB (GCS → CDN edge)
- **HTTP lookup requests**: $0.0075/10k

With 11.6MB total models per lesson session:

- **1,000 sessions/month**: ~11.6GB egress ≈ **$0.93/month**
- **10,000 sessions/month**: ~116GB egress ≈ **$9.30/month**

## Troubleshooting

| Issue                                   | Fix                                                                              |
| --------------------------------------- | -------------------------------------------------------------------------------- |
| `404 Not Found` from CDN                | Verify bucket permissions: `allUsers` needs `Storage Object Viewer`              |
| Models not caching                      | Check `cache-control` header on GCS objects                                      |
| SSL certificate stuck in `PROVISIONING` | Wait up to 60 min; verify DNS CNAME resolves                                     |
| `AccessDenied`                          | Run `gcloud storage buckets add-iam-policy-binding` again                        |
| Model updates not reflected             | Change filename (version), or run `gcloud compute url-maps invalidate-cdn-cache` |
