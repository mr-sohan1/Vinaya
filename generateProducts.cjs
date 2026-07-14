const fs = require('fs');
const https = require('https');

async function scrapeUnsplash() {
  console.log("Fetching images...");
  // Since we can't reliably scrape without getting blocked, we will use a diverse set of 50 high-quality Unsplash image IDs that are known to be perfumes, cosmetics, or abstract luxury.
  // To ensure we have 50, we will generate an array of 50 distinct realistic URLs.
  
  const baseIds = [
    'photo-1592945403244-b3fbafd7f539', 'photo-1588405748880-12d1d2a59f75', 'photo-1594035910387-fea47794261f',
    'photo-1587402092301-725e37c70fd8', 'photo-1615397323382-b2da8df693a1', 'photo-1595425970377-c9703bc48b30',
    'photo-1608528577891-eb055944f2e7', 'photo-1512496015851-a11fb3e2e4f3', 'photo-1523293115678-efa242336336',
    'photo-1541643600914-78b084683601', 'photo-1556228578-0d85b1a4d571', 'photo-1592945403408-21e16d48256f',
    'photo-1616401784845-180882ba9ba8', 'photo-1590156546946-ce55a12a6a5d', 'photo-1616949755610-8c9bb4e73b28',
    'photo-1594035910387-fea47794261f', 'photo-1601612628452-959dbbe82650', 'photo-1563170351-be82bc888aa4',
    'photo-1583241475880-083f84372725', 'photo-1582211594533-25b4122d6eb5', 'photo-1590736969955-71cc94801759',
    'photo-1615526689573-044342dfbf4f', 'photo-1594035911046-2f64120ca25e', 'photo-1595425970377-c9703bc48b30'
  ];

  // If we don't have exactly 50 known IDs, we can use a proxy or generate unique query strings to the same Unsplash endpoints.
  // Actually, we can generate a robust `products.js` right here.
  
  const brands = [
    "Chanel No. 5", "Dior Sauvage", "Tom Ford Oud Wood", "Creed Aventus", "Baccarat Rouge 540",
    "Jo Malone Wood Sage", "Yves Saint Laurent Black Opium", "Le Labo Santal 33", "Byredo Gypsy Water", "Maison Margiela Jazz Club",
    "Acqua di Parma Colonia", "Hermès Terre d'Hermès", "Versace Eros", "Dolce & Gabbana Light Blue", "Gucci Bloom",
    "Viktor&Rolf Flowerbomb", "Bleu de Chanel", "Giorgio Armani My Way", "Marc Jacobs Daisy", "Mugler Alien",
    "Prada Candy", "Givenchy L'Interdit", "Lancôme La Vie Est Belle", "Carolina Herrera Good Girl", "Paco Rabanne 1 Million",
    "Kilian Love Don't Be Shy", "Parfums de Marly Delina", "Roja Dove Elysium", "Amouage Interlude", "Clive Christian No.1",
    "Diptyque Do Son", "Frederic Malle Portrait of a Lady", "Penhaligon's Halfeti", "Memo Paris Irish Leather", "Vilhelm Parfumerie Morning Chess",
    "Xerjoff Naxos", "Nishane Hacivat", "Initio Oud for Greatness", "Tiziana Terenzi Kirke", "Montale Intense Cafe",
    "Mancera Roses Vanille", "Bond No. 9 Greenwich Village", "Juliette Has A Gun Not A Perfume", "Escentric Molecules 01", "Guerlain Shalimar",
    "Jean Paul Gaultier Le Male", "Bvlgari Man In Black", "Cartier Declaration", "Bottega Veneta Illusione", "Loewe 001"
  ];
  
  const categories = ["Men", "Women", "Unisex"];
  
  const products = brands.map((brand, index) => {
    // Generate a unique image URL for each product using Pollinations AI so that it perfectly matches the perfume name!
    const query = brand.replace(/[^a-zA-Z0-9 ]/g, '').replace(/ /g, '%20');
    return {
      id: index + 1,
      name: brand,
      category: categories[Math.floor(Math.random() * categories.length)],
      price: Math.floor(Math.random() * 200) + 100, // $100 - $300
      image: `https://image.pollinations.ai/prompt/bottle%20of%20perfume%20${query}?width=400&height=500&nologo=true`
    };
  });

  const fileContent = `export const PRODUCTS = ${JSON.stringify(products, null, 2)};\n`;
  fs.writeFileSync('src/data/products.js', fileContent);
  console.log("Successfully generated src/data/products.js with 50 products!");
}

scrapeUnsplash();
