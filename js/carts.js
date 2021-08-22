let prdoductsDom = document.querySelector('.products');
let noProductsDom = document.querySelector('.noproducts');

function drawCartProductsUI(allproducts = []) {
  if (JSON.parse(localStorage.getItem('productsInCart')).length === 0)
    noProductsDom.innerHTML = 'No Products choosed';

  let products =
    JSON.parse(localStorage.getItem('productsInCart')) || allproducts;
  let productsUI = products.map((item) => {
    return `
    <div class="product-item">
  <img
    src="${item.imageUrl}"
    class="product-item-img"
    alt="image-sunglass"
  />
  <div class="product-item-desc">
    <h2>${item.title}</h2>
    <p>${item.desc}</p>
    <span>Size: ${item.size}</span><br>
    <span>Quantity: ${item.qty}</span>
  </div>
  <div class="product-item-actions">
    <button class="add-to-cart" onclick="removeItemFromCart(${item.id})">Remove From Cart</button>
  </div>
  </div>
  `;
  });

  prdoductsDom.innerHTML = productsUI.join('');
}

drawCartProductsUI();

function removeItemFromCart(id) {
  let productsInCart = localStorage.getItem('productsInCart');
  if (localStorage.getItem('productsInCart')) {
    let items = JSON.parse(productsInCart);

    let filterItems = items.filter((item) => item.id !== id);
    localStorage.setItem('productsInCart', JSON.stringify(filterItems));
    drawCartProductsUI(filterItems);
  }
}
