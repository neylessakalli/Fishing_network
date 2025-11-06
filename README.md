# Fishing Network - Interactive Fishing Map

Explore the world's best fishing adventures — mapped, pinned, and one click away.

An interactive world map displaying YouTube fishing videos by location from the "Mordu de la Pêche" channel.

## Features

- 🌍 **Interactive World Map** - Built with React + Leaflet.js
- 🎣 **Zoom-Based Markers** - Red markers appear when zooming in close enough
- ▶️ **Video Links** - Click markers to watch YouTube videos in new tabs
- 📍 **Grouped Locations** - Multiple videos from the same location grouped under one marker
- 🚀 **Fully Public** - No authentication required, accessible to everyone
- 📱 **Responsive Design** - Works on desktop and mobile devices

## Local Development

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Setup

1. **Install dependencies:**
```bash
npm install
```

2. **Start development server:**
```bash
npm run dev
```

3. **Open your browser:**
   - The app will automatically open at `http://localhost:3000`
   - Or manually navigate to that URL

## Adding New Fishing Spots

Edit `src/components/FishingMap.jsx` and add new objects to the `fishingSpots` array:

```javascript
{
  id: 'unique-id',
  name: 'Mordu de la Pêche – Location Name',
  coordinates: [latitude, longitude],
  youtubeUrl: 'https://www.youtube.com/watch?v=VIDEO_ID',
  description: 'Description of the fishing spot',
  minZoom: 3  // Marker appears when zoom > this level
}
```

**Note:** Videos from the same location (same coordinates) will automatically be grouped under a single marker with multiple video links in the popup.

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` folder, ready for deployment.

## SEO & Google Search Setup

### Quick Setup (Automated)

After deployment, run this command to automatically update all URLs:

```bash
npm run setup-google YOUR_DEPLOYED_URL
```

Example:
```bash
npm run setup-google https://fishing-network.vercel.app
```

This automatically updates:
- `index.html` - All meta tag URLs
- `public/sitemap.xml` - Sitemap URL  
- `public/robots.txt` - Robots.txt sitemap reference

### Manual Setup Steps

#### 1. Update URLs (if not using automated script)

After deployment, update these files with your actual domain:
- `index.html` - Update Open Graph and Twitter meta tags URLs (lines 19, 20, 26, 29, 45)
- `public/sitemap.xml` - Update the `<loc>` URL (line 6)
- `public/robots.txt` - Update the Sitemap URL (line 4)

#### 2. Submit to Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Click **"Add Property"** → Choose **"URL prefix"**
3. Enter your deployed URL (e.g., `https://fishing-network.vercel.app`)
4. **Verify ownership** using one of these methods:
   - **HTML tag**: Add the meta tag to `index.html` and redeploy
   - **HTML file**: Upload the verification file to `public/` folder
   - **Domain provider**: If using custom domain, add TXT record
5. After verification, go to **"Sitemaps"** and submit: `sitemap.xml`
6. Go to **"URL Inspection"** and request indexing for your homepage

#### 3. Monitor & Wait

- Check Google Search Console regularly for indexing status
- It typically takes **1-7 days** for initial indexing
- It may take **1-2 weeks** to appear in search results for "fishing network"

### Additional SEO Features

- ✅ **Meta Tags**: All SEO meta tags included in `index.html`
- ✅ **Structured Data**: JSON-LD schema for better search results
- ✅ **Keywords**: Optimized for "fishing network", "fishing map", "fishing videos"
- ✅ **Mobile-Friendly**: Responsive and mobile-optimized
- ✅ **Fast Loading**: Vite builds optimized production bundles
- ✅ **Sitemap & Robots**: Properly configured for search engines

**For detailed step-by-step instructions**, see `scripts/google-search-console-guide.md`

## Deployment

### Option 1: Deploy to Vercel (Recommended)

Vercel is ideal for React applications and offers a free tier with automatic HTTPS.

#### Steps:

1. **Install Vercel CLI** (optional, or use the web interface):
```bash
npm i -g vercel
```

2. **Deploy:**
```bash
vercel
```

Or use the web interface:
- Go to [vercel.com](https://vercel.com)
- Sign up/login with GitHub
- Click "New Project"
- Import your repository
- Configure build settings:
  - **Framework Preset:** Vite
  - **Build Command:** `npm run build`
  - **Output Directory:** `dist`
  - **Install Command:** `npm install`
- Click "Deploy"

3. **Your site will be live** at `https://your-project.vercel.app`

#### Vercel Configuration

The project includes a `vercel.json` file that:
- Configures SPA routing (all routes serve `index.html`)
- Adds security headers
- No additional configuration needed!

### Option 2: Deploy to Netlify

Netlify is another excellent option for static sites.

#### Steps:

1. **Install Netlify CLI** (optional):
```bash
npm i -g netlify-cli
```

2. **Deploy:**
```bash
netlify deploy --prod
```

Or use the web interface:
- Go to [netlify.com](https://netlify.com)
- Sign up/login with GitHub
- Click "Add new site" → "Import an existing project"
- Select your repository
- Configure build settings:
  - **Build command:** `npm run build`
  - **Publish directory:** `dist`
- Click "Deploy site"

3. **Your site will be live** at `https://your-project.netlify.app`

#### Netlify Configuration

Create a `netlify.toml` file in the root (optional):

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Option 3: Deploy to GitHub Pages

1. **Install gh-pages package:**
```bash
npm install --save-dev gh-pages
```

2. **Add to `package.json`:**
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

3. **Deploy:**
```bash
npm run deploy
```

4. **Enable GitHub Pages** in your repository settings:
   - Go to Settings → Pages
   - Select source branch: `gh-pages`
   - Your site will be at `https://username.github.io/repo-name`

## Project Structure

```
fishing-network/
├── src/
│   ├── components/
│   │   └── FishingMap.jsx    # Main map component with all fishing spots
│   ├── App.jsx                # Main app component
│   ├── App.css                # App styles
│   ├── main.jsx               # React entry point
│   └── index.css              # Global styles
├── index.html                 # HTML template
├── vercel.json                # Vercel deployment config
├── vite.config.js             # Vite configuration
└── package.json               # Dependencies and scripts
```

## Future Enhancements

The codebase is structured to easily add:
- **More fishing video pins** - Simply add to the `fishingSpots` array
- **Filters/Search** - Filter by location or video title
- **JSON data source** - Load spots from an external JSON file or API
- **Video thumbnails** - Display YouTube thumbnails in popups
- **Location search** - Search and navigate to specific locations

## Technologies Used

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Leaflet.js** - Interactive maps
- **React-Leaflet** - React bindings for Leaflet
- **OpenStreetMap** - Map tiles

## License

This project is open source and available for personal and educational use.

---

**Explore the world's best fishing adventures — mapped, pinned, and one click away.** 🎣
