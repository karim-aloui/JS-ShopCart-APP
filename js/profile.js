let get_user = localStorage.getItem('username');
let get_email = localStorage.getItem('email');
let products = JSON.parse(localStorage.getItem('products')) || productsDb;
let myProducts = products.filter((i) => i.isMe === 'Y');
// html variables

let userDom2 = document.getElementById('username');
let userEmailDom = document.getElementById('email');
let productsLength = document.querySelector('#productsLength');

userDom2.innerHTML = get_user;
userEmailDom.innerHTML = get_email;

if (myProducts != 0) {
  productsLength.innerHTML = 'Products Length :' + ' ' + myProducts.length;
} else {
  productsLength.remove();
}

// upload Img
// declaring html elements

let imgDiv = document.querySelector('.profile-pic-div');
let img = document.getElementById('profileFoto');
let profileFile = document.querySelector('#profileFile');
let uploadBtn = document.querySelector('#uploadBtn');
// if user hover on img div

imgDiv.addEventListener('mouseenter', function () {
  uploadBtn.style.display = 'block';
});

// if user hover out img div
imgDiv.addEventListener('mouseleave', function () {
  uploadBtn.style.display = 'none';
});

//  upload Image
profileFile.addEventListener('change', function () {
  let choosedFile = this.files[0];
  if (choosedFile) {
    let reader = new FileReader();
    reader.addEventListener('load', function () {
      img.setAttribute('src', reader.result);
      localStorage.setItem('profileFoto', imgDiv);
    });
    reader.readAsDataURL(choosedFile);
  }
});
