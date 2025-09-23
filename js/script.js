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



