# Google Search Console Setup Guide

## Automated Setup Script

After deployment, run this script to automatically update all URLs:

```bash
node scripts/setup-google-search.js YOUR_DEPLOYED_URL
```

Example:
```bash
node scripts/setup-google-search.js https://fishing-network.vercel.app
```

This will automatically update:
- `index.html` - All meta tag URLs
- `public/sitemap.xml` - Sitemap URL
- `public/robots.txt` - Robots.txt sitemap reference

## Manual Setup Steps

### Step 1: Deploy Your Site

1. Push your code to GitHub
2. Deploy to Vercel (or your chosen platform)
3. Note your deployed URL (e.g., `https://fishing-network.vercel.app`)

### Step 2: Update URLs (if not using the script)

Update these files with your actual deployed URL:

**index.html** - Replace `fishing-network.vercel.app` with your domain:
- Line 19: `<meta property="og:url" content="YOUR_URL">`
- Line 20: `<meta property="og:image" content="YOUR_URL/logo.svg">`
- Line 26: `<meta property="twitter:url" content="YOUR_URL">`
- Line 29: `<meta property="twitter:image" content="YOUR_URL/logo.svg">`
- Line 45: `"url": "YOUR_URL"`

**public/sitemap.xml** - Line 6:
```xml
<loc>YOUR_URL</loc>
```

**public/robots.txt** - Line 4:
```
Sitemap: YOUR_URL/sitemap.xml
```

### Step 3: Access Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Sign in with your Google account
3. Click **"Add Property"** button (top left)

### Step 4: Add Your Property

1. Choose **"URL prefix"** (not Domain)
2. Enter your deployed URL (e.g., `https://fishing-network.vercel.app`)
3. Click **"Continue"**

### Step 5: Verify Ownership

You have several options. Choose the easiest for you:

#### Option A: HTML Tag (Recommended for Vercel)

1. Google will show you an HTML tag like:
   ```html
   <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />
   ```
2. Copy the verification code
3. Add it to `index.html` in the `<head>` section
4. Commit and push to trigger a new deployment
5. Wait for deployment to complete
6. Click "Verify" in Google Search Console

#### Option B: HTML File Upload

1. Google will provide a file to download (e.g., `google1234567890.html`)
2. Place this file in your `public/` folder
3. Commit and push
4. Wait for deployment
5. Click "Verify" in Google Search Console

#### Option C: Domain Name Provider (Easiest for Vercel)

1. If you're using Vercel with a custom domain:
   - Select "Domain name provider"
   - Choose your DNS provider
   - Follow the instructions to add a TXT record
   - Click "Verify"

### Step 6: Submit Your Sitemap

1. After verification, go to **"Sitemaps"** in the left menu
2. Enter: `sitemap.xml`
3. Click **"Submit"**
4. Wait a few minutes - Google will process it

### Step 7: Request Indexing

1. Go to **"URL Inspection"** in the left menu
2. Enter your homepage URL (e.g., `https://fishing-network.vercel.app`)
3. Click **"Test Live URL"**
4. If the page is accessible, click **"Request Indexing"**
5. Google will crawl and index your page

### Step 8: Monitor Your Site

Check these sections regularly:

- **Coverage**: See which pages are indexed
- **Performance**: See search queries and clicks
- **Sitemaps**: Check if sitemap is processed correctly
- **URL Inspection**: Check individual page status

## Troubleshooting

### Sitemap Not Found
- Make sure `public/sitemap.xml` exists
- Check that it's accessible at `YOUR_URL/sitemap.xml`
- Verify the URL in sitemap.xml matches your actual domain

### Verification Failed
- Make sure you've deployed the latest changes
- Wait a few minutes after deployment before verifying
- Try a different verification method

### Pages Not Indexing
- It can take 1-7 days for Google to index new sites
- Make sure your site is publicly accessible (no authentication)
- Check that robots.txt allows indexing
- Request indexing for important pages

## Expected Timeline

- **Verification**: Immediate (after deployment)
- **Sitemap Processing**: 1-24 hours
- **Initial Indexing**: 1-7 days
- **Appearing in Search**: 1-2 weeks (for "fishing network" searches)

## Tips for Better Rankings

1. **Keep Content Fresh**: Add new fishing spots regularly
2. **Get Backlinks**: Share on social media, fishing forums, etc.
3. **Monitor Performance**: Check Google Search Console weekly
4. **Fix Issues**: Address any errors Google reports
5. **Optimize**: Ensure fast page load times (Vite helps with this)

## Quick Checklist

- [ ] Site deployed and accessible
- [ ] URLs updated in all files
- [ ] Property added to Google Search Console
- [ ] Ownership verified
- [ ] Sitemap submitted
- [ ] Homepage indexing requested
- [ ] Monitoring set up

---

**Note**: This process requires manual steps in Google Search Console that cannot be automated. The script only helps update URLs in your files.

