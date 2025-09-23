const profileSelectButtons = document.querySelectorAll('.profile__left-select');
const profileContent = document.querySelectorAll('.profile__content');
profileSelectButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.profileSelect;
    profileContent.forEach(c => c.classList.remove('active'));
    const targetContent = document.querySelector(`.profile__content[data-profile-select="${target}"]`);
    if (targetContent) {
      targetContent.classList.add('active');
    }
  });
});
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("notifications__close")) {
    const block = e.target.closest(".notifications__block");
    if (block) {
      block.remove();
    }
  }
});

function resizeHeight() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

resizeHeight();
window.addEventListener('resize', resizeHeight);

const prodPopup = document.querySelector(".prodPopup");
const prodPopupInner = document.querySelector(".prodPopup__inner");
const prodPopupOpenButtons = document.querySelectorAll(".prodPopup-open");
const prodPopupClose = document.querySelector(".prodPopup__close");
const prodPopupCloseButtons = document.querySelectorAll(".prodPopup-close");
prodPopupOpenButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    prodPopup.classList.add("active");
  });
});
prodPopupClose.addEventListener("click", () => {
  prodPopup.classList.remove("active");
});
prodPopupCloseButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    prodPopup.classList.remove("active");
  });
});
document.addEventListener("click", (e) => {
  if (
    prodPopup.classList.contains("active") &&
    !prodPopupInner.contains(e.target) &&
    ![...prodPopupOpenButtons].some((btn) => btn.contains(e.target))
  ) {
    prodPopup.classList.remove("active");
  }
});


const editProfile = document.querySelector(".editProfile");
const editProfileInner = document.querySelector(".editProfile__inner");
const editProfileOpen = document.querySelector(".editProfile-open");
const editProfileClose = document.querySelector(".editProfile__close");
editProfileOpen.addEventListener("click", () => {
  editProfile.classList.add("active");
});
editProfileClose.addEventListener("click", () => {
  editProfile.classList.remove("active");
});
document.addEventListener("click", (e) => {
  if (
    editProfile.classList.contains("active") &&
    !editProfileInner.contains(e.target) &&
    !editProfileOpen.contains(e.target)
  ) {
    editProfile.classList.remove("active");
  }
});

const photoInput = document.querySelector('.editProfile__photo-input[type="file"]');
const profileImage = document.getElementById('profileImage');

photoInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.onload = (ev) => {
      profileImage.src = ev.target.result;
    };
    reader.readAsDataURL(file);
  }
});