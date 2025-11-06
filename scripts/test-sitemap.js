/**
 * Test script to verify sitemap is accessible
 * Run: node scripts/test-sitemap.js
 */

const https = require('https');
const url = 'https://fishing-network.vercel.app/sitemap.xml';

console.log('Testing sitemap accessibility...\n');
console.log(`URL: ${url}\n`);

https.get(url, (res) => {
  console.log(`Status Code: ${res.statusCode}`);
  console.log(`Content-Type: ${res.headers['content-type']}`);
  console.log(`Content-Length: ${res.headers['content-length']}`);
  console.log('\nHeaders:');
  console.log(JSON.stringify(res.headers, null, 2));
  
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('\n--- Response Body (first 500 chars) ---');
    console.log(data.substring(0, 500));
    console.log('\n--- End of Response ---\n');
    
    if (res.statusCode === 200 && res.headers['content-type']?.includes('xml')) {
      console.log('✅ SUCCESS: Sitemap is accessible with correct Content-Type');
    } else {
      console.log('❌ ERROR: Sitemap might not be accessible correctly');
      console.log(`   Expected: Status 200, Content-Type with 'xml'`);
      console.log(`   Got: Status ${res.statusCode}, Content-Type: ${res.headers['content-type']}`);
    }
  });
}).on('error', (err) => {
  console.error('❌ ERROR:', err.message);
});

