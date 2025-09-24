const codeInputs = document.querySelectorAll('.userPopup__form-code input[type="tel"]');
codeInputs.forEach((input, index) => {
    input.addEventListener('input', (e) => {
        if (e.target.value.length > 1) {
            e.target.value = e.target.value.slice(0, 1);
        }
        if (e.target.value.length === 1 && index < codeInputs.length - 1) {
            codeInputs[index + 1].focus();
        }
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && input.value === '' && index > 0) {
            codeInputs[index - 1].focus();
        }
    });

    input.addEventListener('paste', (e) => {
        e.preventDefault();
        const pasteData = (e.clipboardData || window.clipboardData).getData('text');
        const digits = pasteData.replace(/\D/g, '').split('').slice(0, codeInputs.length);

        digits.forEach((digit, i) => {
            if (codeInputs[i]) {
                codeInputs[i].value = digit;
            }
        });
        const focusIndex = Math.min(digits.length, codeInputs.length - 1);
        codeInputs[focusIndex].focus();
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const recoverForm = document.querySelector('.userPopup__form[data-userPopupType="recover"]');
    if (!recoverForm) return;
    const descr = recoverForm.querySelector(".userPopup__form-descr");
    const emailBlock = recoverForm.querySelector("#email-or-tel").closest(".userPopup__form-block");
    const emailInput = emailBlock.querySelector("input");
    const codeBlock = recoverForm.querySelector("label[for='code']").closest(".userPopup__form-block");
    const codeInputs = codeBlock.querySelectorAll("input[type='tel']");
    const loginBtn = recoverForm.querySelector(".userPopup__btn.btn-4[type='button']:not(.userPopup__btn-code)");
    const sendCodeBtn = recoverForm.querySelector(".userPopup__btn.userPopup__btn-code");
    const newPassBlock = recoverForm.querySelector("#new-password").closest(".userPopup__form-block");
    const confirmPassBlock = recoverForm.querySelector("#confirm-new-password").closest(".userPopup__form-block");
    const confirmBtn = recoverForm.querySelector(".userPopup__btn.btn-4[type='submit']");
    function resetRecoverForm() {
        recoverForm.reset();
        descr.style.display = "none";
        codeBlock.style.display = "none";
        sendCodeBtn.style.display = "none";
        newPassBlock.style.display = "none";
        confirmPassBlock.style.display = "none";
        confirmBtn.style.display = "none";
        loginBtn.style.display = "inline-block";
        emailInput.removeAttribute("disabled");
        codeInputs.forEach(inp => inp.removeAttribute("disabled"));
        recoverForm.querySelectorAll(".error-input").forEach(el => el.classList.remove("error-input"));
    }
    recoverForm.querySelectorAll("input").forEach(inp => {
        inp.addEventListener("input", () => {
            inp.closest(".userPopup__form-block").classList.remove("error-input");
        });
    });
    loginBtn.addEventListener("click", () => {
        if (emailInput.value.trim() === "") {
            emailBlock.classList.add("error-input");
            return;
        }
        emailInput.setAttribute("disabled", "disabled");
        descr.style.display = "block";
        codeBlock.style.display = "block";
        loginBtn.style.display = "none";
        sendCodeBtn.style.display = "inline-block";
    });
    sendCodeBtn.addEventListener("click", () => {
        let enteredCode = "";
        codeInputs.forEach(inp => enteredCode += inp.value);
        if (enteredCode !== "123456") {
            codeBlock.classList.add("error-input");
            return;
        }
        codeInputs.forEach(inp => inp.setAttribute("disabled", "disabled"));
        sendCodeBtn.style.display = "none";
        newPassBlock.style.display = "block";
        confirmPassBlock.style.display = "block";
        confirmBtn.style.display = "inline-block";
    });
    recoverForm.addEventListener("submit", (e) => {
        const pass1 = recoverForm.querySelector("#new-password");
        const pass2 = recoverForm.querySelector("#confirm-new-password");

        if (pass1.value.trim() === "" || pass2.value.trim() === "" || pass1.value !== pass2.value) {
            e.preventDefault();
            pass1.closest(".userPopup__form-block").classList.add("error-input");
            pass2.closest(".userPopup__form-block").classList.add("error-input");
        } else {
            pass1.setAttribute("disabled", "disabled");
            pass2.setAttribute("disabled", "disabled");
        }
    });
    const forgotBtn = document.querySelector(".userPopup__forgot");
    const authBtn = document.querySelector(".userPopup__bottom .userPopup__link:nth-child(1)");
    const regBtn = document.querySelector(".userPopup__bottom .userPopup__link:nth-child(2)");
    const forms = document.querySelectorAll(".userPopup__form");

    function showForm(type) {
        forms.forEach(f => f.classList.remove("active"));
        const target = document.querySelector(`.userPopup__form[data-userPopupType="${type}"]`);
        if (target) target.classList.add("active");
    }

    if (forgotBtn) {
        forgotBtn.addEventListener("click", () => {
            forms.forEach(f => f.classList.remove("active"));
            recoverForm.classList.add("active");
        });
    }

    if (authBtn) {
        authBtn.addEventListener("click", () => {
            resetRecoverForm();
            showForm("login");
        });
    }

    if (regBtn) {
        regBtn.addEventListener("click", () => {
            resetRecoverForm();
            showForm("register");
        });
    }
});
