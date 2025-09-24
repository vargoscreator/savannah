const cart = document.querySelector(".cart");
const cartInner = document.querySelector(".cart__inner");
const cartOpen = document.querySelector(".cart-open");
const cartClose = document.querySelector(".cart__close");
cartOpen.addEventListener("click", () => {
  cart.classList.add("active");
});
cartClose.addEventListener("click", () => {
  cart.classList.remove("active");
});
document.addEventListener("click", (e) => {
  if (
    cart.classList.contains("active") &&
    !cartInner.contains(e.target) &&
    !cartOpen.contains(e.target)
  ) {
    cart.classList.remove("active");
  }
});


if(document.querySelector(".prodPopup")){
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
}

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

const headerBurger = document.querySelector('.header__burger');
const headerMenu = document.querySelector('.header__menu');
const headerMenuList = headerMenu.querySelector('ul');
headerBurger.addEventListener('click', (e) => {
    e.stopPropagation();
    headerMenu.classList.toggle('active');
});
document.addEventListener('click', (e) => {
    const isClickInsideMenu = headerMenuList.contains(e.target);
    const isClickOnBurger = headerBurger.contains(e.target);

    if (!isClickInsideMenu && !isClickOnBurger) {
        headerMenu.classList.remove('active');
    }
});
headerMenuList.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        headerMenu.classList.remove('active');
    });
});
const header = document.querySelector(".header");
function checkHeaderScroll() {
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
}
window.addEventListener("load", checkHeaderScroll);
window.addEventListener("resize", checkHeaderScroll);
window.addEventListener("scroll", checkHeaderScroll);