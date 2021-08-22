// editing user info
let get_user = localStorage.getItem('username');
let get_email = localStorage.getItem('email');
let userInput = document.getElementById('changeName');
let userEmailInput = document.getElementById('changeEmail');
let editForm = document.querySelector('#edit-profile-form');

// setting value
userInput.value = get_user;
userEmailInput.value = get_email;

// Events

editForm.addEventListener('submit', editProfileData);

function editProfileData(e) {
  e.preventDefault();

  localStorage.setItem('username', userInput.value);
  localStorage.setItem('email', userEmailInput.value);

  setTimeout(() => {
    window.location = 'profile.html';
  }, 500);
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
