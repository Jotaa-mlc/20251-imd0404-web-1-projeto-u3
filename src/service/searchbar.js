// searchbar.js
document.getElementById('searchForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();
  const allProducts = JSON.parse(localStorage.getItem("productsList")) || [];
  const filtered = allProducts.filter(p =>
    p.name.toLowerCase().includes(searchTerm) ||
    (p.description && p.description.toLowerCase().includes(searchTerm)) ||
    (p.category && p.category.toLowerCase().includes(searchTerm))
  );
  const container = document.getElementById("products-container");
  container.innerHTML = "";
  if (filtered.length === 0) {
    container.innerHTML = "<p>Nenhum produto encontrado.</p>";
    return;
  }
  // Agrupar por categoria
  const grouped = {};
  for (const product of filtered) {
    const cat = product.category || "Outros";
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(product);
  }
  for (const category in grouped) {
    const section = document.createElement("section");
    section.innerHTML = `<h2 style="margin-top: 30px;">${capitalize(category)}</h2>`;
    const list = document.createElement("div");
    list.className = "product-list";
    grouped[category].forEach(product => {
      const item = document.createElement("div");
      item.className = "product-item";
      item.innerHTML = `
        <a href="../paginas/product-page.html" onclick='verProduto(${JSON.stringify(product)})'>
        <img src="${product.image}" alt="${product.name}" 
          onerror="this.onerror=null;this.src='https://placehold.co/150x150/png?text=Imagem+Indisponível';">
        <h3>${product.name}</h3>
        <p class="price">R$ ${parseFloat(product.price).toFixed(2)}</p>
        </a>
      `;
      list.appendChild(item);
    });
    section.appendChild(list);
    container.appendChild(section);
  }
  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
});
