const rangeInput = document.querySelectorAll(".range-input input"),
      progress = document.querySelector(".slider .progress"),
      minTooltip = document.querySelector(".min-tooltip"),
      maxTooltip = document.querySelector(".max-tooltip");

let priceGap = 200;
function formatPrice(value) {
  return "$" + Number(value).toLocaleString("en-US");
}
function updateSlider() {
  let minVal = parseInt(rangeInput[0].value),
      maxVal = parseInt(rangeInput[1].value),
      rangeMax = parseInt(rangeInput[0].max);
  if (maxVal - minVal < priceGap) {
    if (document.activeElement === rangeInput[0]) {
      rangeInput[0].value = maxVal - priceGap;
    } else {
      rangeInput[1].value = minVal + priceGap;
    }
    minVal = parseInt(rangeInput[0].value);
    maxVal = parseInt(rangeInput[1].value);
  }
  const thumbWidth = 1;
  const sliderWidth = progress.parentElement.offsetWidth;
  const thumbOffset = (thumbWidth / sliderWidth) * 100 / 2;
  const leftPercent = minVal === parseInt(rangeInput[0].min) ? 0 : (minVal / rangeMax) * 100 + thumbOffset;
  const rightPercent = maxVal === rangeMax ? 0 : 100 - (maxVal / rangeMax) * 100 + thumbOffset;
  progress.style.left = leftPercent + "%";
  progress.style.right = rightPercent + "%";
  minTooltip.textContent = formatPrice(minVal);
  maxTooltip.textContent = formatPrice(maxVal);
  minTooltip.style.left = (minVal / rangeMax) * 100 + "%";
  maxTooltip.style.left = (maxVal / rangeMax) * 100 + "%";
}
rangeInput.forEach(input => {
  input.addEventListener("input", updateSlider);
});
updateSlider();