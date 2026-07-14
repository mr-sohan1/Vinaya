const fs = require('fs');

const menBrands = ["Dior Sauvage", "Bleu de Chanel", "Creed Aventus", "Versace Eros", "Tom Ford Oud Wood", "Paco Rabanne 1 Million", "Jean Paul Gaultier Le Male", "Bvlgari Man In Black", "Hermès Terre d'Hermès"];
const womenBrands = ["Chanel No. 5", "Yves Saint Laurent Black Opium", "Gucci Bloom", "Viktor&Rolf Flowerbomb", "Marc Jacobs Daisy", "Mugler Alien", "Prada Candy", "Lancôme La Vie Est Belle", "Carolina Herrera Good Girl"];
const unisexBrands = ["Baccarat Rouge 540", "Le Labo Santal 33", "Byredo Gypsy Water", "Maison Margiela Jazz Club", "Jo Malone Wood Sage", "Escentric Molecules 01", "Diptyque Do Son", "Tiziana Terenzi Kirke", "Montale Intense Cafe"];

// Generate realistic Indian pricing: affordable (₹599) to luxury (₹12,999)
function getRandomPrice() {
  const prices = [599, 999, 1499, 2499, 3999, 5999, 8999, 12999];
  return prices[Math.floor(Math.random() * prices.length)];
}

const products = [];
let idCounter = 1;

function addCategory(brands, category) {
  brands.forEach(brand => {
    const query = brand.replace(/[^a-zA-Z0-9 ]/g, '').replace(/ /g, '%20');
    products.push({
      id: idCounter++,
      name: brand,
      category: category,
      price: getRandomPrice(),
      image: `https://image.pollinations.ai/prompt/bottle%20of%20perfume%20${query}?width=400&height=500&nologo=true`
    });
  });
}

addCategory(menBrands, "Men");
addCategory(womenBrands, "Women");
addCategory(unisexBrands, "Unisex");

// Shuffle the array so the "All" view shows a random mix of categories
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

shuffle(products);

const fileContent = `export const PRODUCTS = ${JSON.stringify(products, null, 2)};\n`;
fs.writeFileSync('src/data/products.js', fileContent);
console.log("Successfully generated 27 randomly shuffled products.");
