const minRange = document.querySelector(".range-min");
const maxRange = document.querySelector(".range-max");
const minPriceEl = document.querySelector(".filters__price-from");
const maxPriceEl = document.querySelector(".filters__price-to");
const progress = document.querySelector(".filters__price-slider .filters__price-progress");
const gap = 50;
function formatPrice(value) {
  return "$" + Number(value).toLocaleString("en-US");
}
function updatePrice(e) {
  let minVal = parseInt(minRange.value);
  let maxVal = parseInt(maxRange.value);
  if (maxVal - minVal < gap) {
    if (e && e.target.classList.contains("range-min")) {
      minVal = maxVal - gap;
      minRange.value = minVal;
    } else {
      maxVal = minVal + gap;
      maxRange.value = maxVal;
    }
  }
  minPriceEl.textContent = formatPrice(minVal);
  maxPriceEl.textContent = formatPrice(maxVal);
  const rangeMax = parseInt(minRange.max);
  const leftPercent = (minVal / rangeMax) * 100;
  const rightPercent = 100 - (maxVal / rangeMax) * 100;
  progress.style.left = leftPercent + "%";
  progress.style.right = rightPercent + "%";
}

[minRange, maxRange].forEach(input => {
  input.addEventListener("input", updatePrice);
});

updatePrice();


let marketplaceSlider = new Swiper(".marketplace__slider-content", {
    loop: true,
    spaceBetween: 20,
    slidesPerView: 3,
    slidesPerGroup: 1,
    speed: 800,
    allowTouchMove: true,
    navigation: {
        nextEl: ".marketplace__slider-next",
        prevEl: ".marketplace__slider-prev",
    },
    breakpoints: {
        480: {
            slidesPerView: 4,
            spaceBetween: 20,
        },
        769: {
            slidesPerView: 11,
            spaceBetween: 23,
        }
    }
});


const customSelect = document.querySelector(".custom-select");
const selectName = customSelect.querySelector(".custom-select-name");
const selectBtns = customSelect.querySelectorAll(".custom-select-btn");
const hiddenInput = customSelect.querySelector("input");
selectName.addEventListener("click", () => {
  customSelect.classList.toggle("active");
});
selectBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const value = btn.textContent;
    selectName.textContent = value;
    hiddenInput.value = value;
    customSelect.classList.remove("active");
  });
});
document.addEventListener("click", (e) => {
  if (!customSelect.contains(e.target)) {
    customSelect.classList.remove("active");
  }
});
