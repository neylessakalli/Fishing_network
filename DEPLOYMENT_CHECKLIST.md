# Deployment Checklist for Google Search

## Before Deployment

- [x] SEO meta tags added to `index.html`
- [x] `robots.txt` created in `public/` folder
- [x] `sitemap.xml` created in `public/` folder
- [x] Structured data (JSON-LD) added to HTML

## After Deployment

### Step 1: Update URLs
After you get your deployment URL (e.g., `https://fishing-network.vercel.app`), update these files:

1. **`index.html`** - Update these lines:
   - Line 19: `<meta property="og:url" content="YOUR_URL_HERE">`
   - Line 20: `<meta property="og:image" content="YOUR_URL_HERE/logo.svg">`
   - Line 26: `<meta property="twitter:url" content="YOUR_URL_HERE">`
   - Line 29: `<meta property="twitter:image" content="YOUR_URL_HERE/logo.svg">`
   - Line 45: `"url": "YOUR_URL_HERE"`

2. **`public/sitemap.xml`** - Update:
   - Line 6: `<loc>YOUR_URL_HERE</loc>`

3. **`public/robots.txt`** - Update:
   - Line 4: `Sitemap: YOUR_URL_HERE/sitemap.xml`

4. **Redeploy** after making these changes

### Step 2: Submit to Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Sign in with your Google account
3. Click "Add Property"
4. Choose "URL prefix" and enter your deployed URL
5. Verify ownership (Vercel provides automatic verification via DNS)
6. Once verified, go to "Sitemaps" in the left menu
7. Enter: `sitemap.xml` and click "Submit"
8. Go to "URL Inspection" and request indexing for your homepage

### Step 3: Wait for Indexing

- Google typically indexes new sites within 1-7 days
- You can check indexing status in Google Search Console
- Use "URL Inspection" to see if your pages are indexed

### Step 4: Monitor Performance

- Check Google Search Console regularly for:
  - Indexing status
  - Search queries that bring users to your site
  - Any errors or issues
  - Click-through rates

## Tips for Better Rankings

1. **Content**: Your site already has good content with relevant keywords
2. **Backlinks**: Share your site on social media, fishing forums, etc.
3. **Regular Updates**: Add new fishing spots regularly to keep content fresh
4. **Page Speed**: Vite builds optimized bundles - your site should be fast
5. **Mobile-Friendly**: Already responsive and mobile-optimized

## Quick Test

After deployment, test these URLs work:
- `https://your-domain.vercel.app/robots.txt`
- `https://your-domain.vercel.app/sitemap.xml`

Both should be accessible and show the correct content.

