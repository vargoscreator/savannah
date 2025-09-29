window.addEventListener("load", () => {
    setTimeout(() => {
        const hero = document.querySelector(".hero__animate");
        if (hero) {
            hero.classList.add("animated");
        }
    }, 400);
});

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

document.addEventListener("DOMContentLoaded", function () {
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

    function animateSlide(activeSlide) {
        const title = activeSlide.querySelector(".characters__slide-title");
        if (title) {
            gsap.fromTo(
                title.querySelectorAll("span"),
                { opacity: 0, y: 40, rotateX: -90 },
                {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    transformPerspective: 1000,
                    stagger: 0.075,
                    duration: 1,
                    delay: 0.4,
                    ease: "power4.out"
                }
            );
        }

        const descr = activeSlide.querySelector(".characters__slide-descr");
        if (descr) {
            gsap.fromTo(
                descr,
                { y: "50%", opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    delay: 1,
                    ease: "power4.out"
                }
            );
        }

        const step = activeSlide.querySelector(".characters__slide-step span");
        if (step) {
            gsap.fromTo(
                step,
                { x: "-100%" },
                {
                    x: 0,
                    duration: 1,
                    delay: 1,
                    ease: "power4.out"
                }
            );
        }

        const btn = activeSlide.querySelector(".characters__slide-btn");
        if (btn) {
            gsap.fromTo(
                btn,
                { scale: 1 },
                {
                    scale: 1.05,
                    duration: 0.3,
                    delay: 1,
                    ease: "power4.none",
                    yoyo: true,
                    repeat: 1
                }
            );
        }
    }

    if (window.innerWidth <= 767) {
        let charactersSlider = new Swiper(".characters__slider--mob", {
            loop: false,
            slidesPerView: 1,
            allowTouchMove: true,
            navigation: {
                nextEl: ".characters__next",
                prevEl: ".characters__prev",
            },
            speed: 800,
            on: {
                slideChangeTransitionStart: function () {
                    this.slides.forEach(slide => {
                        let inner = slide.querySelector(".characters__slider--mob .characters__slide-inner");
                        if (inner) gsap.set(inner.children, {
                            clearProps: "all"
                        });
                    });

                    let activeSlide = this.slides[this.activeIndex];
                    let inner = activeSlide.querySelector(".characters__slider--mob .characters__slide-inner");
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
                    animateSlide(activeSlide);
                },
            }
        });
        window.addEventListener("load", () => {
            let firstInner = document.querySelector(".characters__slider--mob .characters__slide.swiper-slide-active .characters__slide-inner");
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

        ScrollTrigger.create({
            trigger: ".characters__slider--mob",
            start: "top 80%",
            once: true,
            onEnter: () => {
                const activeSlide = charactersSlider.slides[charactersSlider.activeIndex];
                animateSlide(activeSlide);
            },
        });
    } else {
        const charactersSlides = gsap.utils.toArray(".characters__slider--desk .characters__slide");
        if (charactersSlides.length > 0) {
            const container = document.querySelector(".characters__slider--desk");
            let currentIndex = 0;
            let isAnimating = false;

            function goToSlide(index) {
                if (isAnimating) return;
                animateSlide(charactersSlides[index]);

                isAnimating = true;

                currentIndex = Math.max(0, Math.min(charactersSlides.length - 1, index));

                gsap.to(container, {
                    xPercent: -100 * currentIndex,
                    duration: 0.6,
                    ease: "power2.inOut",
                    onComplete: () => { isAnimating = false; }
                });
            }

            const prevBtn = document.querySelector(".characters__prev");
            const nextBtn = document.querySelector(".characters__next");
            prevBtn.addEventListener("click", () => goToSlide(currentIndex - 1));
            nextBtn.addEventListener("click", () => goToSlide(currentIndex + 1));

            let observer;
            function createObserver() {
                observer = Observer.create({
                    target: window,
                    type: "wheel,touch,pointer",
                    wheelSpeed: -1,
                    tolerance: 10,
                    preventDefault: false,
                    onUp: () => {
                        if (currentIndex < charactersSlides.length - 1) {
                            goToSlide(currentIndex + 1);
                        }
                    },
                    onDown: () => {
                        if (currentIndex > 0) {
                            goToSlide(currentIndex - 1);
                        }
                    }
                });
            }

            ScrollTrigger.create({
                trigger: ".characters",
                start: "top top",
                end: () => "+=" + window.innerHeight,
                pin: true,
                onEnter: createObserver,
                onLeave: () => {
                    if (observer) {
                        observer.kill();
                    }
                },
                onEnterBack: createObserver,
                onLeaveBack: () => {
                    if (observer) {
                        observer.kill();
                    }
                },
            });

            ScrollTrigger.create({
                trigger: ".characters__inner",
                start: "top 70%",
                onEnter: () => { animateSlide(charactersSlides[0]); }
            });
        }

    }

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
    const videos = document.querySelectorAll("video");

    videos.forEach(video => {
        video.muted = true;
        video.setAttribute("muted", "");
        video.setAttribute("playsinline", "");
        video.setAttribute("webkit-playsinline", "");
        video.setAttribute("preload", "auto");


        if (video.getAttribute("autoplay") !== null) {
            let playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => {
                    setTimeout(() => video.play(), 100);
                });
            }
        } else {
            video.addEventListener("loadeddata", () => {
                video.currentTime = 0;
                video.pause();
            });

            video.addEventListener("mouseenter", () => {
                let playPromise = video.play();
                if (playPromise !== undefined) {
                    playPromise.catch(() => {
                        setTimeout(() => video.play(), 100);
                    });
                }
            });

            video.addEventListener("mouseleave", () => {
                video.pause();
                video.currentTime = 0;
            });
        }
    });
    // const heroBg = document.querySelector(".hero__bg img");

    // document.addEventListener("mousemove", (e) => {
    //     // получаем центр экрана
    //     const { innerWidth, innerHeight } = window;
    //     const x = (e.clientX / innerWidth - 0.5) * -50;  // диапазон движения по X (±15px)
    //     const y = (e.clientY / innerHeight - 0.5) * 10; // диапазон движения по Y (±15px)

    //     gsap.to(heroBg, {
    //         x: x,
    //         y: y,
    //         duration: 1.2,
    //         ease: "power3.out"
    //     });
    // });
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
        delay: 1.6,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".hero__inner",
            start: "top 80%",
            toggleActions: "play none none reverse"
        }
    });
    gsap.from(".hero__main img", {
        y: "100%",
        opacity: 0,
        duration: 1.2,
        delay: 0.8,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".hero__inner",
            start: "top 80%",
            toggleActions: "play none none reverse"
        }
    });
    gsap.from(".hero__chatacters-wrapper img", {
        y: "100%",
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.2,
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

    const enjoyImages = document.querySelectorAll(".enjoy__icon, .enjoy__title span img:not(:last-child)");

    if (enjoyImages.length > 0) {
        const configs = Array.from(enjoyImages).map((_, i) => ({
            factor: 0.01 + Math.random() * 0.04,
            dirX: i % 2 === 0 ? 1 : -1,
            dirY: i % 3 === 0 ? -1 : 1,
            pulse: 0.02 + Math.random() * 0.05
        }));

        const animators = Array.from(enjoyImages).map((img, i) => {
            return {
                x: gsap.quickTo(img, "x", { duration: 0.6, ease: "power2.out" }),
                y: gsap.quickTo(img, "y", { duration: 0.6, ease: "power2.out" }),
                rotation: gsap.quickTo(img, "rotation", { duration: 0.6, ease: "power2.out" }),
            };
        });

        document.addEventListener("mousemove", (e) => {
            const x = e.clientX - window.innerWidth / 2;
            const y = e.clientY - window.innerHeight / 2;

            enjoyImages.forEach((_, i) => {
                const cfg = configs[i];
                const anim = animators[i];

                anim.x(-x * cfg.factor * cfg.dirX);
                anim.y(-y * cfg.factor * cfg.dirY);
                anim.rotation((x / window.innerWidth) * 20 * cfg.dirX);
            });
        });

    }

    const championImages = document.querySelectorAll(".champion__title img:first-of-type");
    document.addEventListener("mousemove", (e) => {
        const x = e.clientX;
        const y = e.clientY;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        const moveX = x - centerX;
        const moveY = y - centerY;

        championImages.forEach((img, i) => {
            const factor = 0.02 + i * 0.02;

            gsap.to(img, {
                x: moveX * -factor,
                y: moveY * -factor,
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

    const levelupInfoItem = document.querySelectorAll(".levelup__info-item");
    levelupInfoItem.forEach((item, i) => {
        const counter = item.querySelector(".levelup__info-descr");
        const target = +counter.dataset.value;

        tl.from(item, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        }, i === 0 ? ">" : "-=0.5"); 

        tl.add(() => {
            setTimeout(()=>{
                counter.classList.add("with-arrow");
            }, 200);
            gsap.to(counter, {
                innerText: target,
                duration: 2,
                ease: "power1.out",
                snap: { innerText: 1 },
                onUpdate: function () {
                    counter.textContent = Math.floor(counter.innerText);
                }
            });
        }, "-=0.8"); 
    });

    let tlLevelup = gsap.timeline({
        scrollTrigger: {
            trigger: ".levelup__content",
            start: "top 60%",
            toggleActions: "play none none reverse"
        }
    })
    tlLevelup.fromTo('.levelup__title span', { opacity: 0, y: 40, rotateX: -90 }, { opacity: 1, y: 0, rotateX: 0, transformPerspective: 1000, stagger: 0.075 });
    tlLevelup.from(".levelup__descr", {
        y: "50%",
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2,
    });
    tlLevelup.to(".levelup__step span", {
        x: "0",
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2,
    });

    let tlEquip = gsap.timeline({
        scrollTrigger: {
            trigger: ".equip__content",
            start: "top 60%",
            toggleActions: "play none none reverse"
        }
    });

    tlEquip.fromTo('.equip__title span',
        { opacity: 0, y: 40, rotateX: -90 },
        { opacity: 1, y: 0, rotateX: 0, transformPerspective: 1000, stagger: 0.075, duration: 1 },
        0
    );

    tlEquip.from(".equip__descr", {
        y: "50%",
        opacity: 0,
        duration: 1,
        ease: "power3.out",
    }, 1);

    tlEquip.from(".equip__balance", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
    }, 1.3);

    tlEquip.to(".equip__name span", {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        stagger: 0.075,
    }, 1.6);

    tlEquip.from(".equip__btn", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
    }, 2);

    gsap.timeline({
        scrollTrigger: {
            trigger: ".equip__content",
            start: "top 70%",
            toggleActions: "play none none reverse"
        }
    })

    gsap.utils.toArray(".equip__block .equip__item").forEach((item, i) => {
        gsap.from(item, {
            x: "-100%",
            opacity: 0,
            duration: 1.2,
            ease: "power3.out",
            delay: i * 0.2,
            stagger: i * 0.2,
            scrollTrigger: {
                trigger: item,
                start: "top 60%",
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

    if (window.innerWidth >= 768) {
        // gsap.fromTo('.champion',
        //     { yPercent: -100 },
        //     {
        //         yPercent: 0,
        //         ease: "none",
        //         scrollTrigger: {
        //             trigger: '.champion',
        //             start: "180% bottom",
        //             end: "260% bottom",
        //             // markers: true,
        //             scrub: true
        //         }
        //     }
        // );
    } else {
        // gsap.fromTo('.champion',
        //     { yPercent: -100 },
        //     {
        //         yPercent: 0,
        //         ease: "none",
        //         scrollTrigger: {
        //             trigger: '.champion',
        //             start: "bottom bottom",
        //             end: "bottom top",
        //             // markers: true,
        //             scrub: true
        //         }
        //     }
        // );
    }


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
        })
        .fromTo('.champion__item-title span',
            { opacity: 0, y: 40, rotateX: -90 },
            { opacity: 1, y: 0, rotateX: 0, transformPerspective: 1000, stagger: 0.075, duration: 1 },
            0
        );
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

        const activityInfoItem = document.querySelectorAll(".activity__block-info");
        activityInfoItem.forEach((item, i) => {
            const counter = item.querySelector(".activity__block-rating");
            const target = +counter.dataset.value;
    
            tl.from(item, {
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out"
            }, i === 0 ? ">" : "-=0.5"); 
    
            tl.add(() => {
                setTimeout(()=>{
                    counter.classList.add("with-arrow");
                }, 200);
                gsap.to(counter, {
                    innerText: target,
                    duration: 2,
                    ease: "power1.out",
                    snap: { innerText: 1 },
                    onUpdate: function () {
                        counter.textContent = Math.floor(counter.innerText);
                    }
                });
            }, "-=0.8"); 
        });


    gsap.fromTo('.infoBlock',
        { yPercent: -100 },
        {
            yPercent: 0,
            ease: "none",
            scrollTrigger: {
                trigger: '.infoBlock',
                start: "top+=100% bottom",
                end: "bottom+=90% bottom",
                // markers: true,
                scrub: 0
            }
        }
    );



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


    let tlDevelop = gsap.timeline({
        scrollTrigger: {
            trigger: ".develop__content",
            start: "top 60%",
            toggleActions: "play none none reverse"
        }
    });

    tlDevelop.fromTo('.develop__title span',
        { opacity: 0, y: 40, rotateX: -90 },
        { opacity: 1, y: 0, rotateX: 0, transformPerspective: 1000, stagger: 0.075, duration: 1 },
        0
    );

    tlDevelop.from(".develop__descr", {
        y: "50%",
        opacity: 0,
        duration: 1,
        ease: "power3.out",
    }, 1);

    tlDevelop.to(".develop__name span", {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        stagger: 0.075,
    }, 1.3);

    tlDevelop.from(".develop__btn", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
    }, 1.6);



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


    // ScrollTrigger.batch(".animated-title", {
    //     start: 'top 40%',
    //     markers: true,
    //     onEnter: (elements, triggers) => {
    //         const tl = gsap.timeline({ 'ease': 'power4.out' });

    //         tl.fromTo('.animated-title span', { opacity: 0, y: 40, rotateX: -90 }, { opacity: 1, y: 0, rotateX: 0, transformPerspective: 1000, stagger: 0.075 });
    //     },
    //     once: 0
    // });



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
    const mobileapp = document.querySelector(".mobileapp");
    const phone = document.querySelector(".mobileapp__phone");
    const bg = document.querySelector(".mobileapp__phone-bg img");
    const girl = document.querySelector(".mobileapp__phone-girl img");
    mobileapp.addEventListener("mousemove", (e) => {
        const rect = phone.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        gsap.to(bg, {
            x: -x,
            y: -y,
            duration: 0.5,
            ease: "power2.out"
        });

        gsap.to(girl, {
            x: -x * 5,
            y: -y * 5,
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

    $('[data-tilt]').tilt({
        'maxTilt': 7,
    });
});
