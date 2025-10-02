let charactersSlider = new Swiper(".characters__slider-profile", {
        loop: true,
        spaceBetween: 20,
        slidesPerView: 1,
        slidesPerGroup: 1,
        speed: 800,
        allowTouchMove: true,
        navigation: {
            nextEl: ".characters__slider-next",
            prevEl: ".characters__slider-prev",
        },
    });

document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".characters__select-btn");
  const results = document.querySelectorAll(".characters__result");
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const target = btn.getAttribute("data-characters");
      results.forEach(res => {
        res.classList.remove("active");
        if (res.getAttribute("data-profile-result") === target) {
          res.classList.add("active");
        }
      });
    });
  });
});


const favButtons = document.querySelectorAll('button.favourites__select-btn');
favButtons.forEach(button => {
    button.addEventListener('click', () => {
        const target = button.dataset.favourites;
        favButtons.forEach(btn => btn.classList.remove('active'));
        if (button.tagName.toLowerCase() === 'button') {
            button.classList.add('active');
        }
        document.querySelectorAll('.characters__result').forEach(block => {
            block.classList.remove('active');
        })
        const resultBlock = document.querySelector(`.characters__result[data-favourites-result="${target}"]`);
        if (resultBlock) {
            resultBlock.classList.add('active');
        }
    });
});
