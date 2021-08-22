let cartsProductsDom = document.querySelector('.carts-products div');
let badgeDom = document.querySelector('.badge');
let cartsProductsMenu = document.querySelector('.carts-products');

let shoppingCartIcon = document.querySelector('.shoppingcart');

shoppingCartIcon.addEventListener('click', openCartMenu);
// check if there is items in localstorage
let addedItem = localStorage.getItem('productsInCart')
  ? JSON.parse(localStorage.getItem('productsInCart'))
  : [];

if (addedItem) {
  addedItem.map((item) => {
    cartsProductsDom.innerHTML += `<p>${item.title} ${item.qty}</p>`;
  });
  badgeDom.style.display = 'block';
  badgeDom.innerHTML += addedItem.length;
}

// open cart menu
function openCartMenu() {
  if (cartsProductsDom.innerHTML != '') {
    if (cartsProductsMenu.style.display == 'block') {
      cartsProductsMenu.style.display = 'none';
    } else {
      cartsProductsMenu.style.display = 'block';
    }
  }
}
