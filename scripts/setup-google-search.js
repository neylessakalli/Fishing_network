#!/usr/bin/env node

/**
 * Google Search Console Setup Helper
 * 
 * This script helps you set up Google Search Console after deployment.
 * Run this after you have your deployed URL.
 * 
 * Usage: node scripts/setup-google-search.js YOUR_DEPLOYED_URL
 * Example: node scripts/setup-google-search.js https://fishing-network.vercel.app
 */

const fs = require('fs');
const path = require('path');

// Get the deployed URL from command line arguments
const deployedUrl = process.argv[2];

if (!deployedUrl) {
  console.error('❌ Error: Please provide your deployed URL');
  console.log('\nUsage: node scripts/setup-google-search.js YOUR_DEPLOYED_URL');
  console.log('Example: node scripts/setup-google-search.js https://fishing-network.vercel.app\n');
  process.exit(1);
}

// Validate URL format
try {
  const url = new URL(deployedUrl);
  if (!url.protocol.startsWith('http')) {
    throw new Error('URL must start with http:// or https://');
  }
} catch (error) {
  console.error('❌ Error: Invalid URL format');
  console.error('Please provide a valid URL like: https://fishing-network.vercel.app\n');
  process.exit(1);
}

console.log('🚀 Setting up Google Search Console files...\n');

// Update index.html
const indexHtmlPath = path.join(__dirname, '..', 'index.html');
let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

// Replace all placeholder URLs
indexHtml = indexHtml.replace(/https:\/\/fishing-network\.vercel\.app/g, deployedUrl);
indexHtml = indexHtml.replace(/fishing-network\.vercel\.app/g, new URL(deployedUrl).hostname);

fs.writeFileSync(indexHtmlPath, indexHtml);
console.log('✅ Updated index.html with your deployed URL');

// Update sitemap.xml
const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
let sitemap = fs.readFileSync(sitemapPath, 'utf8');

sitemap = sitemap.replace(/https:\/\/fishing-network\.vercel\.app/g, deployedUrl);
// Update lastmod to today's date
const today = new Date().toISOString().split('T')[0];
sitemap = sitemap.replace(/<lastmod>.*<\/lastmod>/, `<lastmod>${today}</lastmod>`);

fs.writeFileSync(sitemapPath, sitemap);
console.log('✅ Updated sitemap.xml with your deployed URL');

// Update robots.txt
const robotsPath = path.join(__dirname, '..', 'public', 'robots.txt');
let robots = fs.readFileSync(robotsPath, 'utf8');

robots = robots.replace(/https:\/\/fishing-network\.vercel\.app/g, deployedUrl);

fs.writeFileSync(robotsPath, robots);
console.log('✅ Updated robots.txt with your deployed URL');

console.log('\n📋 Next Steps:\n');
console.log('1. Commit and push these changes to trigger a new deployment');
console.log('2. Go to https://search.google.com/search-console');
console.log('3. Click "Add Property" → "URL prefix"');
console.log(`4. Enter: ${deployedUrl}`);
console.log('5. Choose verification method:');
console.log('   - Recommended: "HTML tag" (we\'ll create the file next)');
console.log('   - Or: "Domain name provider" if using Vercel');
console.log('6. After verification, go to "Sitemaps" and submit: sitemap.xml');
console.log('7. Go to "URL Inspection" and request indexing for your homepage\n');

console.log('✨ All files updated! Ready for deployment and Google Search Console setup.\n');

