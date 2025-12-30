// Sample products with images and affiliate URLs
const products = [
  { name: "Black Mesh Top", price: 50, gender: "women", style: "goth", img: "https://via.placeholder.com/150", url: "#" },
  { name: "Cargo Pants", price: 70, gender: "men", style: "punk", img: "https://via.placeholder.com/150", url: "#" },
  { name: "Platform Boots", price: 120, gender: "women", style: "punk", img: "https://via.placeholder.com/150", url: "#" },
  { name: "Chain Necklace", price: 30, gender: "men", style: "indie", img: "https://via.placeholder.com/150", url: "#" },
  { name: "Oversized Hoodie", price: 80, gender: "men", style: "indie", img: "https://via.placeholder.com/150", url: "#" },
  { name: "Pleated Skirt", price: 60, gender: "women", style: "y2k", img: "https://via.placeholder.com/150", url: "#" },
  { name: "Leather Jacket", price: 200, gender: "men", style: "goth", img: "https://via.placeholder.com/150", url: "#" },
  { name: "Sustainable Tee", price: 40, gender: "women", style: "sustainable", img: "https://via.placeholder.com/150", url: "#" },
];

const grid = document.getElementById("product-grid");
const filterGender = document.getElementById("filter-gender");
const filterStyle = document.getElementById("filter-style");
const filterPrice = document.getElementById("filter-price");
const sortPrice = document.getElementById("sort-price");

function renderProducts() {
  const gender = filterGender.value;
  const styles = Array.from(filterStyle.selectedOptions).map(opt => opt.value);
  const maxPrice = parseFloat(filterPrice.value);

  let filtered = products.filter(p => {
    const genderMatch = gender === "all" || p.gender === gender;
    const styleMatch = styles.length === 0 || styles.includes(p.style);
    const priceMatch = isNaN(maxPrice) || p.price <= maxPrice;
    return genderMatch && styleMatch && priceMatch;
  });

  // Sort by price if selected
  if (sortPrice.value === "low") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortPrice.value === "high") {
    filtered.sort((a, b) => b.price - a.price);
  }

  grid.innerHTML = "";
  if (filtered.length === 0) {
    grid.innerHTML = "<p>No products match your filters.</p>";
    return;
  }

  filtered.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}" style="width:150px;height:150px;object-fit:cover;">
      <h3>${p.name}</h3>
      <p>Price: $${p.price}</p>
      <p>Gender: ${p.gender.charAt(0).toUpperCase() + p.gender.slice(1)}</p>
      <p>Style: ${p.style.charAt(0).toUpperCase() + p.style.slice(1)}</p>
      <a href="${p.url}" target="_blank" class="cta">Shop</a>
      <button class="add-builder" onclick="addToBuilder('${p.name}')">Add to Builder</button>
    `;
    grid.appendChild(card);
  });
}

// Event listeners
filterGender.addEventListener("change", renderProducts);
filterStyle.addEventListener("change", renderProducts);
filterPrice.addEventListener("input", renderProducts);
sortPrice.addEventListener("change", renderProducts);

// Initial render
renderProducts();

// Connect shop items to outfit builder
function addToBuilder(itemName) {
  // Decide category based on name or style for demo
  let category = "Accessory";
  if (itemName.toLowerCase().includes("top") || itemName.toLowerCase().includes("hoodie")) category = "Top";
  else if (itemName.toLowerCase().includes("pants") || itemName.toLowerCase().includes("skirt")) category = "Bottom";
  else if (itemName.toLowerCase().includes("boots")) category = "Shoes";

  // Call existing builder function from builder.js
  if (window.addItem) {
    window.addItem(category, itemName);
    alert(`${itemName} added to your outfit builder!`);
  }
}
