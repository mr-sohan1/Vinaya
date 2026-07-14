const fs = require('fs');
const https = require('https');

// Extract URLs from products.js
const productsText = fs.readFileSync('src/data/products.js', 'utf8');
const urls = [];
const regex = /"image":\s*"([^"]+)"/g;
let match;
while ((match = regex.exec(productsText)) !== null) {
  urls.push(match[1]);
}

console.log(`Found ${urls.length} URLs to warm up...`);

async function warmUpUrls() {
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    console.log(`[${i+1}/${urls.length}] Warming: ${url}`);
    try {
      await new Promise((resolve) => {
        https.get(url, (res) => {
          // just drain the response
          res.on('data', () => {});
          res.on('end', () => resolve());
        }).on('error', (err) => {
          console.error(`Error on ${url}: ${err.message}`);
          resolve(); // continue anyway
        });
      });
    } catch (e) {
      console.error(e);
    }
  }
  console.log("Finished warming cache!");
}

warmUpUrls();
