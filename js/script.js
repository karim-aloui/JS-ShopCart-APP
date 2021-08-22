// define Products

let prdoductsDom = document.querySelector('.products');

let products = productsDb;

//JSON.parse(localStorage.getItem('products'));

// display product

let drawProductsUI;
(drawProductsUI = function (products = []) {
  let productsUI = products.map((item) => {
    return `
  <div class="product-item" style="border: ${
    item.isMe === 'Y' ? '2px solid green' : ''
  }">
<img
  src="${item.imageUrl}"
  class="product-item-img"
  alt="image-sunglass"
/>
<div class="product-item-desc">
  <a onclick='saveItemData(${item.id})'>${item.title}</a>
  <p>${item.desc}</p>
  <span>size: ${item.size}</span>

  ${
    item.isMe === 'Y' &&
    "<button class = 'edit-product' onclick = 'editProduct(" +
      item.id +
      ")'> Edit Product </button>"
  }
</div>
<div class="product-item-actions">
  <button class="add-to-cart" onclick="addedToCart(${
    item.id
  })">Add To Cart</button>
  <i class="favorite far fa-heart ${
    item.liked == true ? 'fas fa-heart' : ''
  }" style="color:${item.liked == true ? 'red' : ''}"onclick="addedToFavorite(${
      item.id
    })" /></i>
</div>
</div>
`;
  });

  prdoductsDom.innerHTML = productsUI.join('');
})(JSON.parse(localStorage.getItem('products')) || products);

// add to cart

function addedToCart(id) {
  if (localStorage.getItem('username')) {
    let products = JSON.parse(localStorage.getItem('products')) || products;
    let product = products.find((item) => item.id === id);
    let isProductInCart = addedItem.some((i) => i.id === product.id);

    if (isProductInCart) {
      addedItem = addedItem.map((p) => {
        if (p.id === product.id) p.qty += 1;
        return p;
      });
      //product.qty += 1;
    } else {
      addedItem.push(product);
    }
    cartsProductsDom.innerHTML = '';
    addedItem.forEach((item) => {
      cartsProductsDom.innerHTML += `<p>${item.title} <span class= "item-qty">${item.qty}</span></p>`;
    });

    // Save Data
    localStorage.setItem('productsInCart', JSON.stringify(addedItem));
    // add qty of Items
    let cartProductItems = document.querySelectorAll('.carts-products div p');
    badgeDom.style.display = 'block';
    badgeDom.innerHTML = cartProductItems.length;
  } else {
    window.location = 'login.html';
  }
}

function getUniqueArr(arr, filterType) {
  let unique = arr
    .map((item) => item[filterType])
    .map((item, i, final) => final.indexOf(item) === i && i)
    .filter((item) => arr[item])
    .map((item) => arr[item]);
  return unique;
}

function saveItemData(id) {
  localStorage.setItem('productId', id);
  window.location = 'cartDetails.html';
}

// search function
let input = document.getElementById('search');

input.addEventListener('keyup', function (e) {
  search(e.target.value, JSON.parse(localStorage.getItem('products')));

  if (e.target.value.trim() === '')
    drawProductsUI(JSON.parse(localStorage.getItem('products')));
});
function search(title, myArray) {
  let arr = myArray.filter(
    (item) => item.title.toLowerCase().indexOf(title.toLowerCase()) !== -1
  );
  drawProductsUI(arr);
}

// add to Favorite
let favoriteItems = localStorage.getItem('productsFavorite')
  ? JSON.parse(localStorage.getItem('productsFavorite'))
  : [];
function addedToFavorite(id) {
  if (localStorage.getItem('username')) {
    let product = products.find((item) => item.id === id);
    product.liked = true;
    favoriteItems = [...favoriteItems, product];
    let uniqueProducts = getUniqueArr(favoriteItems, 'id');
    localStorage.setItem('productsFavorite', JSON.stringify(uniqueProducts));
    products.map((item) => {
      if (item.id === product.id) {
        item.liked = true;
      }
    });
    localStorage.setItem('products', JSON.stringify(products));
    drawProductsUI(products);
  } else {
    window.location = 'login.html';
  }
}

// Filter Product by size

let sizeFilter = document.getElementById('size-filter');
sizeFilter.addEventListener('change', getProductsFilteredBySize);

function getProductsFilteredBySize(e) {
  let val = e.target.value;
  let products = JSON.parse(localStorage.getItem('products')) || products;

  if (val === 'all') {
    drawProductsUI(products);
  } else {
    products = products.filter((i) => i.size === val);
    drawProductsUI(products);
  }
}

// Edit Product

function editProduct(id) {
  localStorage.setItem('editProduct', id);

  window.location = 'editProduct.html';
}
