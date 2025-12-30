const products = [
  { name: "Black Mesh Top", price: 50, gender: "women", style: "goth", url: "#"},
  { name: "Cargo Pants", price: 70, gender: "men", style: "punk", url: "#"},
  { name: "Platform Boots", price: 120, gender: "women", style: "punk", url: "#"},
  { name: "Chain Necklace", price: 30, gender: "men", style: "indie", url: "#"},
  { name: "Oversized Hoodie", price: 80, gender: "men", style: "indie", url: "#"},
  { name: "Pleated Skirt", price: 60, gender: "women", style: "y2k", url: "#"},
  { name: "Leather Jacket", price: 200, gender: "men", style: "goth", url: "#"},
  { name: "Sustainable Tee", price: 40, gender: "women", style: "sustainable", url: "#"},
];

const grid = document.getElementById("product-grid");
const filterGender = document.getElementById("filter-gender");
const filterStyle = document.getElementById("filter-style");
const filterPrice = document.getElementById("filter-price");

function renderProducts() {
  const gender = filterGender.value;
  const style = filterStyle.value;
  const maxPrice = parseFloat(filterPrice.value);

  grid.innerHTML = "";

  const filtered = products.filter(p => {
    return (gender === "all" || p.gender === gender) &&
           (style === "all" || p.style === style) &&
           (isNaN(maxPrice) || p.price <= maxPrice);
  });

  if (filtered.length === 0) {
    grid.innerHTML = "<p>No products match the selected filters.</p>";
    return;
  }

  filtered.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${p.name}</h3>
      <p>Price: $${p.price}</p>
      <p>Gender: ${p.gender.charAt(0).toUpperCase() + p.gender.slice(1)}</p>
      <p>Style: ${p.style.charAt(0).toUpperCase() + p.style.slice(1)}</p>
      <a href="${p.url}" target="_blank" class="cta">Shop</a>
    `;
    grid.appendChild(card);
  });
}

// Event listeners
filterGender.addEventListener("change", renderProducts);
filterStyle.addEventListener("change", renderProducts);
filterPrice.addEventListener("input", renderProducts);

// Initial render
renderProducts();
