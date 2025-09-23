window.addEventListener("load", () => {
    setTimeout(() => {
        const hero = document.querySelector(".hero__animate");
        if (hero) {
            hero.classList.add("animated");
        }
    }, 400);
});


document.addEventListener("DOMContentLoaded", function() {
    let storeSelectsSlider = new Swiper(".storeSelects__slider", {
        loop: true,
        spaceBetween: 20,
        slidesPerView: 1,
        slidesPerGroup: 1,
        speed: 800,
        allowTouchMove: true,
        navigation: {
            nextEl: ".storeSelects__slider-next",
            prevEl: ".storeSelects__slider-prev",
        },
        breakpoints: {
            769: {
                spaceBetween: 56,
                slidesPerView: 3,
                slidesPerGroup: 3,
            },
        },
    });

    let reviewsSlider = new Swiper(".reviews__slider", {
        loop: true,
        spaceBetween: 20,
        slidesPerView: 1,
        speed: 800,
        allowTouchMove: true,
        navigation: {
            nextEl: ".reviews__next",
            prevEl: ".reviews__prev",
        },
    });

    let charactersSlider = new Swiper(".characters__slider", {
        loop: true,
        slidesPerView: 1,
        allowTouchMove: true,
        navigation: {
            nextEl: ".characters__next",
            prevEl: ".characters__prev",
        },
        speed: 800,
        on: {
            slideChangeTransitionStart: function() {
                this.slides.forEach(slide => {
                    let inner = slide.querySelector(".characters__slide-inner");
                    if (inner) gsap.set(inner.children, {
                        clearProps: "all"
                    });
                });
                let activeSlide = this.slides[this.activeIndex];
                let inner = activeSlide.querySelector(".characters__slide-inner");
                if (inner) {
                    let blocks = inner.children;
                    gsap.from(blocks, {
                        x: (i) => 100 + i * 50,
                        opacity: 0,
                        duration: (i) => 0.6 + i * 0.2,
                        ease: "power3.out",
                        stagger: 0.15
                    });
                }
            }
        }
    });
    window.addEventListener("load", () => {
        let firstInner = document.querySelector(".characters__slide.swiper-slide-active .characters__slide-inner");
        if (firstInner) {
            gsap.from(firstInner.children, {
                x: (i) => 100 + i * 50,
                opacity: 0,
                duration: (i) => 0.6 + i * 0.2,
                ease: "power3.out",
                stagger: 0.15
            });
        }
    });

});




gsap.registerPlugin(ScrollTrigger);
gsap.to(".develop__image:nth-of-type(1)", {
    y: -500,
    ease: "none",
    scrollTrigger: {
        trigger: ".develop__inner",
        start: "top bottom",
        end: "bottom top",
        scrub: true
    }
});

gsap.to(".develop__image:nth-of-type(2)", {
    y: 1000,
    ease: "none",
    scrollTrigger: {
        trigger: ".develop__inner",
        start: "top bottom",
        end: "bottom top",
        scrub: true
    }
});
document.addEventListener("DOMContentLoaded", () => {
    const videos = document.querySelectorAll("video");

    videos.forEach(video => {
        video.muted = true;
        video.setAttribute("muted", "");
        video.setAttribute("playsinline", "");
        video.setAttribute("webkit-playsinline", "");

        let playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise.catch(() => {
                setTimeout(() => video.play(), 100);
            });
        }
    });
});
const heroName = document.querySelector(".hero__name:nth-of-type(1)");
const heroNameContent = heroName.innerHTML.replace(/<br\s*\/?>/gi, "[[BR]]");
const heroNameParts = heroNameContent.split(/(\[\[BR\]\])/);
heroName.innerHTML = heroNameParts
    .map((part) => {
        if (part === "[[BR]]") {
            return "<br>";
        }
        return part
            .split("")
            .map((char) =>
                char === " " ? "&nbsp;" : `<span class="letter">${char}</span>`
            )
            .join("");
    })
    .join("");
gsap.set(".hero__name .letter", {
    y: "100%",
    opacity: 0
});
gsap.to(".hero__name .letter", {
    y: "0%",
    opacity: 1,
    duration: 0.6,
    ease: "power4.out",
    stagger: 0.03,
    scrollTrigger: {
        trigger: ".hero__inner",
        start: "top 50%",
        toggleActions: "play none none reverse"
    }
});

gsap.from(".hero__name:nth-of-type(2)", {
    x: "100%",
    opacity: 0,
    duration: 1.2,
    ease: "power3.out",
    scrollTrigger: {
        trigger: ".hero__inner",
        start: "top 50%",
        toggleActions: "play none none reverse"
    }
});
gsap.from(".hero__title", {
    y: "100",
    opacity: 0,
    duration: 1.2,
    ease: "power3.out",
    scrollTrigger: {
        trigger: ".hero__inner",
        start: "top 80%",
        toggleActions: "play none none reverse"
    }
});
gsap.from(".hero__buttons", {
    y: "200",
    opacity: 0,
    duration: 1.2,
    ease: "power3.out",
    scrollTrigger: {
        trigger: ".hero__inner",
        start: "top 80%",
        toggleActions: "play none none reverse"
    }
});
gsap.from(".headerMenu", {
    y: "300",
    opacity: 0,
    duration: 1.2,
    ease: "power3.out",
    scrollTrigger: {
        trigger: ".hero__name",
        start: "top 80%",
        toggleActions: "play none none reverse"
    }
});
gsap.from(".enjoy__title > *", {
    x: -100,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: "power3.out",
    scrollTrigger: {
        trigger: ".enjoy__content",
        start: "top 50%",
        toggleActions: "play none none reverse"
    }
});
gsap.from(".enjoy__btn", {
    x: "-200",
    opacity: 0,
    duration: 1.2,
    ease: "power3.out",
    scrollTrigger: {
        trigger: ".enjoy__btn",
        start: "top 50%",
        toggleActions: "play none none reverse"
    }
});
gsap.from(".enjoy__icon", {
    x: "-250",
    opacity: 0,
    duration: 1.2,
    ease: "power3.out",
    scrollTrigger: {
        trigger: ".enjoy__btn",
        start: "top 60%",
        toggleActions: "play none none reverse"
    }
});

const enjoyImages = document.querySelectorAll(".enjoy__icon, .enjoy__title span img:not(:last-child), .champion__title img:first-of-type");
document.addEventListener("mousemove", (e) => {
    const x = e.clientX;
    const y = e.clientY;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const moveX = x - centerX;
    const moveY = y - centerY;

    enjoyImages.forEach((img, i) => {
        const factor = 0.02 + i * 0.02;

        gsap.to(img, {
            x: moveX * factor,
            y: moveY * factor,
            ease: "power1.out",
            duration: 0.5,
        });
    });
});

gsap.from(".storeSelects__select", {
    y: "50",
    opacity: 0,
    duration: 1.2,
    ease: "power3.out",
    scrollTrigger: {
        trigger: ".storeSelects__inner",
        start: "top 60%",
        toggleActions: "play none none reverse"
    }
});
gsap.from(".storeSelects__content", {
    y: "50",
    opacity: 0,
    duration: 1.2,
    ease: "power3.out",
    scrollTrigger: {
        trigger: ".storeSelects__content",
        start: "top 60%",
        toggleActions: "play none none reverse"
    }
});
gsap.from(".storeSelects__more", {
    y: "50",
    opacity: 0,
    duration: 1.2,
    ease: "power3.out",
    scrollTrigger: {
        trigger: ".storeSelects__content",
        start: "top 60%",
        toggleActions: "play none none reverse"
    }
});
let tl = gsap.timeline({
    scrollTrigger: {
        trigger: ".levelup__inner",
        start: "top 80%",
        toggleActions: "play none none reverse"
    }
});
tl.from(".levelup__info-image", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    })
    .from(".levelup__info-item", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.2
    });

gsap.timeline({
        scrollTrigger: {
            trigger: ".levelup__content",
            start: "top 60%",
            toggleActions: "play none none reverse"
        }
    })
    .from(".levelup__content > *", {
        x: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2
    });

gsap.timeline({
        scrollTrigger: {
            trigger: ".equip__content",
            start: "top 70%",
            toggleActions: "play none none reverse"
        }
    })
    .from(".equip__content > *", {
        x: -50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.2
    });

gsap.utils.toArray(".equip__block .equip__item").forEach((item, i) => {
    gsap.from(item, {
        x: -50,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        delay: i * 0.2,
        scrollTrigger: {
            trigger: item,
            start: "top 75%",
            toggleActions: "play none none reverse"
        }
    });
});
gsap.to(".equip__icon", {
    y: -200,
    ease: "none",
    scrollTrigger: {
        trigger: ".equip__inner",
        start: "bottom 80%",
        end: "bottom top",
        scrub: true
    }
});

gsap.from(".equip__btn", {
    y: "50",
    opacity: 0,
    duration: 1.2,
    ease: "power3.out",
    scrollTrigger: {
        trigger: ".equip__btn",
        start: "top 60%",
        toggleActions: "play none none reverse"
    }
});
let championTitleTl = gsap.timeline({
    scrollTrigger: {
        trigger: ".champion__inner",
        start: "top 40%",
        toggleActions: "play none none reverse"
    }
});
championTitleTl.from(".champion__title span:nth-of-type(1)", {
        x: -50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    }, 0)
    .from(".champion__title span:nth-of-type(2)", {
        x: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    }, 0)
    .from(".champion__title span:nth-of-type(3)", {
        x: -50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    }, 0)
    .from(".champion__title img", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.2
    });
gsap.utils.toArray(".champion__block .champion__item").forEach((item, i) => {
    gsap.from(item, {
        x: -50,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        delay: i * 0.2,
        scrollTrigger: {
            trigger: item,
            start: "top 75%",
            toggleActions: "play none none reverse"
        }
    });
});
let activityTl = gsap.timeline({
    scrollTrigger: {
        trigger: ".activity__select",
        start: "top 80%",
        toggleActions: "play none none reverse"
    }
});
activityTl.from(".activity__box:first-of-type", {
        x: -100,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out"
    })
    .from(".activity__box:last-of-type", {
        x: 100,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out"
    })
activityTl.from(".activity__middle .activity__name", {
        y: 50,
        opacity: 0,
        duration: 0.5,
        ease: "power3.out"
    })
    .from(".activity__middle .activity__btn", {
        y: 50,
        opacity: 0,
        duration: 0.5,
        ease: "power3.out"
    })
    .from(".activity__middle .activity__vs img", {
        scale: 2,
        rotation: -15,
        opacity: 0,
        duration: 0.4,
        ease: "back.out(1.5)"
    });
let infoBlockTl = gsap.timeline({
    scrollTrigger: {
        trigger: ".infoBlock__content",
        start: "top 40%",
        toggleActions: "play none none reverse"
    }
});
infoBlockTl.from(".infoBlock__select", {
        y: 30,
        opacity: 0,
        duration: 0.5,
        ease: "power3.out",
        stagger: 0.2
    })
    .from(".infoBlock__content .infoBlock__item", {
        y: 30,
        opacity: 0,
        duration: 0.5,
        ease: "power3.out",
        stagger: 0.2
    })
    .from(".infoBlock__pages", {
        y: 30,
        opacity: 0,
        duration: 0.5,
        ease: "power3.out"
    });
let reviewsTl = gsap.timeline({
    scrollTrigger: {
        trigger: ".reviews",
        start: "top 40%",
        end: "bottom top",
        toggleActions: "play none none reverse"
    }
});
reviewsTl.from(".reviews__title", {
        y: 50,
        opacity: 0,
        duration: 0.5,
        ease: "power3.out"
    })
    .from(".reviews__descr", {
        y: 50,
        opacity: 0,
        duration: 0.5,
        ease: "power3.out"
    })
    .from(".reviews__content", {
        y: 50,
        opacity: 0,
        duration: 0.5,
        ease: "power3.out"
    });
gsap.from(".reviews__btn", {
    y: "50",
    opacity: 0,
    duration: 1.2,
    ease: "power3.out",
    scrollTrigger: {
        trigger: ".reviews__btn",
        start: "top 80%",
        toggleActions: "play none none reverse"
    }
});
gsap.timeline({
        scrollTrigger: {
            trigger: ".develop__content",
            start: "top 50%",
            toggleActions: "play none none reverse"
        }
    })
    .from(".develop__content > *", {
        x: -50,
        opacity: 0,
        duration: 0.5,
        ease: "power3.out",
        stagger: 0.2
    });
gsap.timeline({
        scrollTrigger: {
            trigger: ".mobileapp__content",
            start: "top 50%",
            toggleActions: "play none none reverse"
        }
    })
    .from(".mobileapp__content > *", {
        x: -50,
        opacity: 0,
        duration: 0.5,
        ease: "power3.out",
        stagger: 0.2
    });
gsap.from(".mobileapp__phone-girl img", {
    x: 200,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
        trigger: ".mobileapp__phone",
        start: "top 80%",
        toggleActions: "play none none reverse"
    }
});
gsap.from(".mobileapp__phone-bg img", {
    x: 200,
    opacity: 0,
    duration: 1,
    delay: 0.3,
    scrollTrigger: {
        trigger: ".mobileapp__phone",
        start: "top 80%",
        toggleActions: "play none none reverse"
    }
});
const headerBurger = document.querySelector(".header__burger");
const menuSection = document.querySelector(".headerMenuSection");
const headerMenu = document.querySelector(".headerMenu");
const headerMenuClose = document.querySelector(".headerMenu__close");
headerBurger.addEventListener("click", () => {
    menuSection.classList.add("active");
});
headerMenuClose.addEventListener("click", () => {
    menuSection.classList.remove("active");
});
document.addEventListener("click", (e) => {
    if (
        menuSection.classList.contains("active") &&
        !headerMenu.contains(e.target) &&
        !headerBurger.contains(e.target)
    ) {
        menuSection.classList.remove("active");
    }
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
const phone = document.querySelector(".mobileapp__phone");
const bg = document.querySelector(".mobileapp__phone-bg img");
const girl = document.querySelector(".mobileapp__phone-girl img");
phone.addEventListener("mousemove", (e) => {
    const rect = phone.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(bg, {
        x: x * 30,
        y: y * 30,
        duration: 0.5,
        ease: "power2.out"
    });

    gsap.to(girl, {
        x: x * 60,
        y: y * 60,
        duration: 0.5,
        ease: "power2.out"
    });
});


function resizeHeight() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}
resizeHeight();
window.addEventListener('resize', resizeHeight);