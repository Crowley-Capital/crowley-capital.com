# Cloudflare R2 Setup Guide

## Why Cloud Storage?

**Problem**: Render's filesystem is ephemeral - any images saved locally will be **deleted** when:
- You redeploy your app
- The service restarts
- The container scales

**Solution**: Store images in **Cloudflare R2** (S3-compatible cloud storage)

---

## Why Cloudflare R2?

✅ **Free Tier**: 10GB storage, 1 million reads/month  
✅ **No Egress Fees**: Unlike AWS S3  
✅ **S3-Compatible**: Easy to switch to AWS later  
✅ **Fast**: Global CDN  
✅ **Simple**: Easy setup, no complex configuration  

**Alternatives**: AWS S3, Backblaze B2, Google Cloud Storage (all work with same code)

---

## Setup Steps

### 1. Create Cloudflare Account

1. Go to [cloudflare.com](https://www.cloudflare.com/)
2. Sign up for free account
3. Verify your email

### 2. Enable R2

1. Log into Cloudflare Dashboard
2. Click **R2** in the sidebar (under "Storage")
3. Click **"Purchase R2 Plan"** (Don't worry - free tier is free!)
4. Enable R2 on your account

### 3. Create R2 Bucket

1. In R2 Dashboard → Click **"Create bucket"**
2. **Bucket name**: `crowley-capital-images` (or your choice)
3. **Location**: Automatic (recommended)
4. Click **"Create bucket"**

### 4. Make Bucket Public (Optional but Recommended)

To serve images directly from R2:

1. Click on your bucket
2. Go to **Settings** → **Public Access**
3. Click **"Allow Access"**
4. Your public URL will be: `https://pub-<hash>.r2.dev`

**OR** Set up a custom domain:
1. Settings → **Custom Domains**
2. Add: `images.your-domain.com`
3. Follow DNS setup instructions

### 5. Create API Token

1. Go to **R2** → **Manage R2 API Tokens**
2. Click **"Create API Token"**
3. **Token name**: `crowley-capital-api`
4. **Permissions**: 
   - ✅ Object Read & Write
   - ✅ Admin Read & Write (for bucket management)
5. **TTL**: Forever (or your preference)
6. Click **"Create API Token"**

### 6. Copy Credentials

You'll see:
- **Access Key ID**: `abc123...`
- **Secret Access Key**: `xyz789...`
- **Account ID**: `your-account-id`

⚠️ **IMPORTANT**: Copy these NOW - you won't see the secret again!

---

## Add to Render Environment Variables

Go to Render Dashboard → Your Web Service → **Environment**:

| Variable Name | Value | Example |
|--------------|-------|---------|
| `R2_ACCOUNT_ID` | Your Cloudflare Account ID | `a1b2c3d4e5f6...` |
| `R2_ACCESS_KEY_ID` | Your Access Key ID | `abc123def456...` |
| `R2_SECRET_ACCESS_KEY` | Your Secret Access Key | `xyz789uvw456...` |
| `R2_BUCKET_NAME` | Your bucket name | `crowley-capital-images` |
| `R2_PUBLIC_URL` | Your public URL | `https://pub-abc123.r2.dev` |

### Finding Your Account ID

If you forgot your account ID:
1. Cloudflare Dashboard → R2
2. Look in the URL: `dash.cloudflare.com/<ACCOUNT_ID>/r2`
3. Or: R2 → Overview → Account ID shown at top

### Finding Your Public URL

1. Go to your bucket
2. Settings → **Public Access**
3. Copy the R2.dev URL shown
4. OR use your custom domain if you set one up

---

## Test Your Setup

### Local Testing

1. Add variables to your `.env` file:
```bash
R2_ACCOUNT_ID=your-account-id
R2_ACCESS_KEY_ID=your-access-key-id
R2_SECRET_ACCESS_KEY=your-secret-access-key
R2_BUCKET_NAME=crowley-capital-images
R2_PUBLIC_URL=https://pub-abc123.r2.dev
```

2. Restart your backend:
```bash
cd apps/api
npm run dev
```

3. Check logs - you should see:
```
✅ Cloudflare R2 storage configured
```

4. Generate an article with image - it should upload to R2!

### On Render

1. Add environment variables (as shown above)
2. Redeploy your app
3. Check logs for:
```
✅ Cloudflare R2 storage configured
☁️  Using cloud storage (Cloudflare R2)...
✅ Uploaded to cloud: articles/your-image.jpg
```

---

## Verify Images Are Stored

### In Cloudflare Dashboard

1. Go to R2 → Your bucket
2. Click **Objects**
3. You should see `articles/` folder with images

### Access Images

Your images will be accessible at:
```
https://pub-abc123.r2.dev/articles/your-image-123456.jpg
```

Or with custom domain:
```
https://images.your-domain.com/articles/your-image-123456.jpg
```

---

## Troubleshooting

### "Cloud storage not configured" in logs

**Check**:
- All 5 environment variables are set in Render
- No typos in variable names (case-sensitive!)
- Restart the service after adding variables

### "Access Denied" errors

**Check**:
- API token has **Object Read & Write** permissions
- Bucket name matches exactly
- Access Key ID and Secret are correct (no extra spaces)

### Images not appearing

**Check**:
- Bucket is set to **Public Access** (in bucket settings)
- `R2_PUBLIC_URL` matches your actual public URL
- Try accessing image URL directly in browser

### Still using local storage

**Check logs** - should see:
```
☁️  Using cloud storage (Cloudflare R2)...
```

If you see:
```
💾 Using local storage (ephemeral on Render)...
```

Then environment variables aren't set correctly.

---

## Cost Breakdown

### Cloudflare R2 Free Tier

✅ **10 GB storage** per month  
✅ **1 million Class A operations** (writes)  
✅ **10 million Class B operations** (reads)  
✅ **Unlimited egress** (no data transfer fees!)  

**Estimated usage for your blog**:
- Images: ~200KB each
- 50 articles = ~10MB total
- **Cost**: $0/month (well within free tier!)

### If You Exceed Free Tier

- Storage: $0.015/GB/month ($1.50 for 100GB)
- Class A operations: $4.50 per million
- Class B operations: $0.36 per million

**You'd need 1000+ articles to exceed free tier!**

---

## Alternative: AWS S3

If you prefer AWS S3, just change the endpoint in `cloudStorage.js`:

```javascript
endpoint: `https://s3.amazonaws.com`, // Instead of R2 endpoint
region: 'us-east-1', // Your S3 region
```

Environment variables would be:
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_BUCKET_NAME`
- `AWS_REGION`

---

## Security Best Practices

✅ **Use R2 API tokens** (not account API keys)  
✅ **Scope permissions** to specific buckets  
✅ **Rotate tokens** periodically  
✅ **Never commit** credentials to git  
✅ **Use environment variables** in Render  

---

## Next Steps

1. ✅ Set up R2 bucket (5 minutes)
2. ✅ Add environment variables to Render
3. ✅ Redeploy your app
4. ✅ Generate a test article with image
5. ✅ Verify image appears in R2 dashboard
6. ✅ Test image loads in browser

---

## Need Help?

- [Cloudflare R2 Docs](https://developers.cloudflare.com/r2/)
- [Cloudflare R2 Pricing](https://www.cloudflare.com/products/r2/)
- [AWS SDK for JavaScript](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/)

---

## Summary

| Step | Action | Time |
|------|--------|------|
| 1 | Create Cloudflare account | 2 min |
| 2 | Enable R2 & create bucket | 2 min |
| 3 | Create API token | 1 min |
| 4 | Add to Render environment | 2 min |
| 5 | Redeploy & test | 3 min |
| **Total** | | **~10 minutes** |

**Result**: Images persist forever, survive redeploys, and it's free! 🎉

