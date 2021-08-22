// variables

let productName = document.getElementById('product-name');
let productDesc = document.getElementById('product-desc');
let productSizeSelect = document.getElementById('product-size');
let createForm = document.getElementById('create-form');
let inpurFile = document.getElementById('upload-image-file');
let productSizeValue;
let productImage;

//Events
productSizeSelect.addEventListener('change', getProductSizeValue);
createForm.addEventListener('submit', createProductFun);
inpurFile.addEventListener('change', uploadImage);

// Functions
function getProductSizeValue(e) {
  productSizeValue = e.target.value;
}

function createProductFun(e) {
  e.preventDefault();
  let allproducts = JSON.parse(localStorage.getItem('products')) || productsDb;
  let nameValue = productName.value;
  let descValue = productDesc.value;

  if (nameValue && descValue) {
    let obj = {
      id: allproducts ? allproducts.length + 1 : 1,
      qty: 1,
      imageUrl: productImage,
      size: productSizeValue,
      title: nameValue,
      desc: descValue,
      isMe: 'Y',
    };

    let newProducts = allproducts ? [...allproducts, obj] : [obj];
    localStorage.setItem('products', JSON.stringify(newProducts));

    productName.value = '';
    productDesc.value = '';
    productSizeSelect.value = '';

    setTimeout(() => {
      window.location = 'index.html';
    }, 500);
  } else {
    alert('enter data');
  }
}

//uploadImage

function uploadImage() {
  let file = this.files[0];
  let types = ['image/webp', 'image/jpg', 'image/png'];

  if (types.indexOf(file.type) == -1) {
    alert('type not Supported');
    return;
  }

  if (file.size > 2 * 1024 * 1024) {
    alert('image size max 2MB');
    return;
  }

  getImageBase64(file);
  // productImage = URL.createObjectURL(file);
}

function getImageBase64(file) {
  let reader = new FileReader();

  reader.readAsDataURL(file);

  reader.onload = function () {
    productImage = reader.result;
  };
  reader.onerror = function () {
    alert('error !!');
  };
}
