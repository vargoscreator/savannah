function moveUserContent() {
    const userContent = document.querySelector('.header__user-balance');
    const userBlock = document.querySelector('.header__user-content');
    const bottomBlockInner = document.querySelector('.header__bottom-inner');
    if (!userContent || !userBlock || !bottomBlockInner) {
        return;
    }
    const breakpoint = 480;
    if (window.innerWidth < breakpoint) {
        if (userContent.parentElement !== bottomBlockInner) {
            bottomBlockInner.appendChild(userContent);
        }
    } else {
        if (userContent.parentElement !== userBlock) {
            userBlock.appendChild(userContent);
        }
    }
}
moveUserContent();
window.addEventListener('resize', moveUserContent);

document.addEventListener("DOMContentLoaded", () => {
    if(document.querySelector(".header__about")){
        const about = document.querySelector(".header__about");
        const content = document.querySelector(".header__about-content");
        const more = document.querySelector(".header__about-more");
        content.addEventListener("click", (e) => {
            e.stopPropagation();
            about.classList.add("active");
        });
        document.addEventListener("click", (e) => {
            if (!more.contains(e.target)) {
                about.classList.remove("active");
            }
        });   
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const authPopup = document.querySelector('.authPopup');
    const popupContents = document.querySelectorAll('.authPopup__content');

    function removeAllActive() {
        popupContents.forEach(c => c.classList.remove('active'));
        authPopup.classList.remove('active');
    }

    function showAuthPopup(mode) {
        removeAllActive();
        authPopup.classList.add('active');
        const target = document.querySelector(`.authPopup__content[data-authPopup="${mode}"]`);
        if (target) target.classList.add('active');
        if (mode === 'password-recovery-code') {
            startResendTimer(target);
        }
    }
    document.querySelectorAll('.header-login-btn').forEach(btn => btn.addEventListener('click', () => showAuthPopup('login')));
    document.querySelectorAll('.header-register-btn').forEach(btn => btn.addEventListener('click', () => showAuthPopup('register')));
    document.querySelectorAll('.login-btn, .register-btn, .forgot-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.classList.contains('login-btn')) showAuthPopup('login');
            if (btn.classList.contains('register-btn')) showAuthPopup('register');
            if (btn.classList.contains('forgot-btn')) showAuthPopup('password-recovery');
        });
    });
    document.querySelectorAll('.authPopup__close').forEach(btn => btn.addEventListener('click', () => removeAllActive()));
    document.querySelectorAll('.authPopup__form-checkbox').forEach(label => {
        const span = label.querySelector('.custom-checkbox, span');
        const input = label.querySelector('input[type="checkbox"]');
        span.addEventListener('click', () => {
            span.classList.toggle('active');
            input.checked = span.classList.contains('active');
            label.closest('.authPopup__form-agreed')?.classList.remove('error');
        });
    });
    document.querySelectorAll('.authPopup__form').forEach(form => {
        const requiredInputs = form.querySelectorAll('input');
        form.addEventListener('submit', e => {
            e.preventDefault();
            let hasError = false;
            requiredInputs.forEach(input => {
                const block = input.closest('.authPopup__form-block') || input.closest('.authPopup__form-agreed');
                if ((input.type !== 'checkbox' && input.value.trim() === '') ||
                    (input.type === 'checkbox' && !input.checked)) {
                    block?.classList.add('error');
                    hasError = true;
                } else {
                    block?.classList.remove('error');
                }
            });

            if (hasError) return;

            if (form.closest('[data-authPopup="password-recovery"]')) {
                showAuthPopup('password-recovery-code');
                return;
            }

            if (form.closest('[data-authPopup="password-recovery-code"]')) {
                const codeInputs = form.querySelectorAll('.authPopup__code-input input[type="tel"]');
                const enteredCode = Array.from(codeInputs).map(i => i.value).join('');
                if (enteredCode === '123456') {
                    showAuthPopup('password-recovery-last');
                    codeInputs.forEach(i => i.closest('.authPopup__code-input')?.classList.remove('error'));
                } else {
                    codeInputs.forEach(i => i.closest('.authPopup__code-input')?.classList.add('error'));
                }
                return;
            }

            console.log('Форма прошла проверку:', form);
        });

        requiredInputs.forEach(input => {
            input.addEventListener('input', () => {
                const block = input.closest('.authPopup__form-block') || input.closest('.authPopup__form-agreed');
                if (input.type === 'checkbox') {
                    if (input.checked) block?.classList.remove('error');
                } else {
                    if (input.value.trim() !== '') block?.classList.remove('error');
                }
            });
        });
    });
    const codeInputs = document.querySelectorAll('.authPopup__code-input input[type="tel"]');
    codeInputs.forEach((input, index) => {
        input.addEventListener('input', e => {
            if (e.target.value.length > 1) e.target.value = e.target.value.slice(0, 1);
            if (e.target.value.length === 1 && index < codeInputs.length - 1) codeInputs[index + 1].focus();
            input.closest('.authPopup__code-input')?.classList.remove('error');
        });
        input.addEventListener('keydown', e => {
            if (e.key === 'Backspace' && input.value === '' && index > 0) codeInputs[index - 1].focus();
        });
        input.addEventListener('paste', e => {
            e.preventDefault();
            const digits = (e.clipboardData || window.clipboardData).getData('text').replace(/\D/g,'').split('').slice(0, codeInputs.length);
            digits.forEach((d,i) => { if(codeInputs[i]) codeInputs[i].value = d; });
            codeInputs[Math.min(digits.length, codeInputs.length-1)].focus();
            codeInputs.forEach(i => i.closest('.authPopup__code-input')?.classList.remove('error'));
        });
    });
    function startResendTimer(popupContent) {
        const resendBtn = popupContent.querySelector('.authPopup__code-resend');
        if (!resendBtn) return;
        let countdown = 60;
        resendBtn.disabled = true;
        const interval = setInterval(() => {
            countdown--;
            resendBtn.textContent = `Resend code in ${countdown} s`;
            if (countdown <= 0) {
                clearInterval(interval);
                resendBtn.disabled = false;
                resendBtn.textContent = 'Resend code';
            }
        }, 1000);
        resendBtn.onclick = () => {
            clearInterval(interval);
            codeInputs.forEach(i => i.value = '');
            startResendTimer(popupContent);
        };
        const pasteBtn = popupContent.querySelector('.authPopup__code-paste');
        if (pasteBtn) {
            pasteBtn.onclick = async () => {
                try {
                    const text = await navigator.clipboard.readText();
                    const digits = text.replace(/\D/g, '').split('').slice(0, codeInputs.length);
                    digits.forEach((d,i) => {
                        if(codeInputs[i]) {
                            codeInputs[i].value = d;
                            codeInputs[i].closest('.authPopup__code-input')?.classList.remove('error');
                        }
                    });
                    codeInputs[Math.min(digits.length, codeInputs.length-1)].focus();
                } catch(err) {
                    console.error('Не удалось получить текст из буфера обмена', err);
                }
            };
        }

    }
});



    document.querySelectorAll('.password-show').forEach(btn => {
        btn.addEventListener('click', () => {
            const input = btn.closest('.password-content')?.querySelector('input');
            if (!input) return;
            input.type = input.type === 'password' ? 'text' : 'password';
            btn.classList.toggle('active');
        });
    });




document.addEventListener('DOMContentLoaded', () => {
    const editForm = document.querySelector('.editProfile__form');
    if (editForm) {
        const requiredInputs = editForm.querySelectorAll('input[type="text"], input[type="tel"], input[type="email"], input[type="password"]');

        editForm.addEventListener('submit', e => {
            e.preventDefault();
            let hasError = false;

            requiredInputs.forEach(input => {
                const block = input.closest('.editProfile__form-block');
                if (input.value.trim() === '') {
                    block?.classList.add('error');
                    hasError = true;
                } else {
                    block?.classList.remove('error');
                }
            });

            if (hasError) return;

            console.log('Edit Profile Form OK');
        });

        requiredInputs.forEach(input => {
            input.addEventListener('input', () => {
                const block = input.closest('.editProfile__form-block');
                if (input.value.trim() !== '') {
                    block?.classList.remove('error');
                }
            });
        });
    }
    if (editForm) {
        const passwordBtns = editForm.querySelectorAll('.password-show');
        passwordBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const input = btn.closest('.password-content')?.querySelector('input');
                if (!input) return;
                input.type = input.type === 'password' ? 'text' : 'password';
                btn.classList.toggle('active');
            });
        });
    
        // PHOTO
        const fileButton = document.querySelector('.editProfile__form-file');
    // Контейнер, который мы будем сдвигать
    const userContainer = document.querySelector('.editProfile__form-user'); 
    // Все обертки картинок (слайды)
    const imageWrappers = document.querySelectorAll('.editProfile__form-user--image');
    // Скрытое поле ввода
    const inputField = document.getElementById('selectedImageFile'); 
    
    if (imageWrappers.length === 0 || !inputField) {
        console.error('Не найдены картинки или поле ввода.');
        return;
    }

    let currentIndex = 0; 
    
    // Инициализация: Устанавливаем начальное значение в input
    // Получаем img из первой обертки
    const firstImage = imageWrappers[0].querySelector('img');
    if (firstImage) {
        inputField.value = firstImage.getAttribute('src').split('/').pop();
    }


    // Функция переключения
    function cycleImage() {
        // 1. Рассчитываем новый индекс
        currentIndex = (currentIndex + 1) % imageWrappers.length;
        
        // 2. Рассчитываем сдвиг (для "справа налево")
        const offset = -currentIndex * 100;

        // 3. Применяем горизонтальный сдвиг
        userContainer.style.transform = `translateX(${offset}%)`;

        // 4. Обновление значения скрытого поля ввода
        // Находим IMG внутри активной (текущей) обертки
        const activeWrapper = imageWrappers[currentIndex];
        const nextImage = activeWrapper.querySelector('img');
        
        if (nextImage) {
            const fullPath = nextImage.getAttribute('src');
            // Извлекаем только имя файла (например, "2.png")
            const fileName = fullPath.split('/').pop(); 
            inputField.value = fileName; 
            
            console.log(`Сдвиг: ${offset}%. Выбрана картинка: ${fileName}`);
        }
    }

    // Вешаем обработчик клика
    fileButton.addEventListener('click', cycleImage);
    }

});


document.addEventListener('DOMContentLoaded', () => {
    const editProfile = document.querySelector('.editProfile');
    const editInner = editProfile?.querySelector('.editProfile__inner');
    const openEditBtns = document.querySelectorAll('.open-edit');
    const closeEditBtn = editProfile?.querySelector('.editProfile__close');
    openEditBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            editProfile?.classList.add('active');
        });
    });
    closeEditBtn?.addEventListener('click', () => {
        editProfile?.classList.remove('active');
    });
    editProfile?.addEventListener('click', e => {
        if (!editInner.contains(e.target)) {
            editProfile.classList.remove('active');
        }
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const usernameBlocks = document.querySelectorAll('.editProfile__form-info');
    usernameBlocks.forEach(block => {
        const input = block.querySelector('.editProfile__form-username');
        const btn = block.querySelector('.editProfile__form-edit');
        btn?.addEventListener('click', () => {
            if (input.readOnly) {
                input.readOnly = false;
                input.focus();
                btn.classList.add('active'); 
            } else {
                if (input.value.trim() === '') {
                    input.focus();
                    return;
                }
                input.readOnly = true;
                btn.classList.remove('active');
            }
        });
    });
});




document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.querySelector('.popupProduct__form');
    if (!productForm) return;
    const inputPrice = productForm.querySelector('input[name="price"]');
    const errorMsg = productForm.querySelector('.popupProduct__error');
    productForm.addEventListener('submit', e => {
        e.preventDefault();
        let hasError = false;
        if (!inputPrice.value.trim()) {
            inputPrice.closest('.form-block')?.classList.add('error');
            hasError = true;
        } else {
            inputPrice.closest('.form-block')?.classList.remove('error');
        }
        if (hasError) return;

        console.log('Form OK, price:', inputPrice.value);
    });
    inputPrice.addEventListener('input', () => {
        if (inputPrice.value.trim() !== '') {
            inputPrice.closest('.form-block')?.classList.remove('error');
        }
    });
});


document.querySelectorAll('.filters__box-top').forEach(item => {
  item.addEventListener('click', () => {
    const parent = item.closest('.filters__box');
    parent.classList.toggle('active');
  });
});

const inputsTel = document.querySelectorAll('input[type="tel"]');
inputsTel.forEach(input => {
    const iti = window.intlTelInput(input, {
        initialCountry: "ua",
        separateDialCode: true,
        nationalMode: false,
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/18.2.1/js/utils.js"
    });
    input.addEventListener("blur", () => {
        console.log(iti.getNumber()); 
    });
});

const headerBurger = document.querySelector(".header__burger");
const headerBottom = document.querySelector(".header__bottom");
const headerBottomInner = document.querySelector(".header__bottom-inner");
const headerCloseBtn = document.querySelector(".header__bottom-close");

headerBurger.addEventListener("click", () => {
  headerBottom.classList.add("active");
});
headerCloseBtn.addEventListener("click", () => {
  headerBottom.classList.remove("active");
});
document.addEventListener("click", (e) => {
  if (
    headerBottom.classList.contains("active") &&
    !headerBottomInner.contains(e.target) &&
    !headerBurger.contains(e.target)
  ) {
    headerBottom.classList.remove("active");
  }
});



document.querySelectorAll('.profile__friends-top').forEach(item => {
  item.addEventListener('click', () => {
    item.classList.toggle('active');
  });
});


document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("click", (e) => {
        const btn = e.target.closest("[data-popupProduct-btn]");
        if (btn) {
            e.preventDefault();
            const isInsideActivePopup = e.target.closest(".popupProduct.active");
            if (!isInsideActivePopup) {
                const popupName = btn.getAttribute("data-popupProduct-btn");
                const popup = document.querySelector(`.popupProduct[data-popupProduct="${popupName}"]`);   
                if (popup) {
                    popup.classList.add("active");
                }
            }
            return;
        }
        const activePopup = document.querySelector(".popupProduct.active");
        if (!activePopup) return;
        const closeBtn = e.target.closest(".popupProduct__close");
        const inner = activePopup.querySelector(".popupProduct__inner");
        if (closeBtn) {
            activePopup.classList.remove("active");
            return;
        }
        if (inner && !inner.contains(e.target)) {
            activePopup.classList.remove("active");
        }
        
    });
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            const activePopup = document.querySelector(".popupProduct.active");
            if (activePopup) {
                activePopup.classList.remove("active");
            }
        }
    });
});