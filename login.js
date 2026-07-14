

const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const showSignup = document.getElementById("showSignup");
const showLogin = document.getElementById("showLogin");


function showLoginForm() {
    loginForm.classList.remove("hidden");
    signupForm.classList.add("hidden");
    loginBtn.classList.add("active");
    signupBtn.classList.remove("active");
}

function showSignupForm() {
    signupForm.classList.remove("hidden");
    loginForm.classList.add("hidden");
    signupBtn.classList.add("active");
    loginBtn.classList.remove("active");
}

loginBtn.addEventListener("click", showLoginForm);
signupBtn.addEventListener("click", showSignupForm);
showSignup.addEventListener("click", showSignupForm);
showLogin.addEventListener("click", showLoginForm);


document.querySelectorAll(".toggle-password").forEach(icon => {
    icon.addEventListener("click", () => {
        const input = icon.previousElementSibling;
        if (input.type === "password") {
            input.type = "text";
            icon.classList.remove("fa-eye-slash");
            icon.classList.add("fa-eye");

        } else {
            input.type = "password";
            icon.classList.remove("fa-eye");
            icon.classList.add("fa-eye-slash");
        }
    });
});


const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

function showError(id, message) {
    const element = document.getElementById(id);
    element.innerText = message;
    element.classList.add("show");
}

function clearError(id) {
    const element = document.getElementById(id);
    element.innerText = "";
    element.classList.remove("show");
}

function shake(form) {
    form.style.animation = "shake .4s";
    setTimeout(() => { form.style.animation = ""; }, 400);
}


window.addEventListener("DOMContentLoaded", () => {
    const savedMail = localStorage.getItem("rememberEmail");
    if (savedMail) {
        const email = document.getElementById("loginEmail");
        if (email) email.value = savedMail;
        const remember = document.querySelector(".remember-me input");
        if (remember) remember.checked = true;
    }
});


const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");

loginEmail.addEventListener("input", () => {
    if (!emailPattern.test(loginEmail.value.trim())) {
        showError("loginEmailError", "Enter a valid work email address.");
    } else {
        clearError("loginEmailError");
    }
});

loginPassword.addEventListener("input", () => {
    if (loginPassword.value.length < 8) {
        showError("loginPasswordError", "Password must contain at least 8 characters.");
    } else {
        clearError("loginPasswordError");
    }
});


const signupName = document.getElementById("signupName");
const signupEmail = document.getElementById("signupEmail");
const signupPassword = document.getElementById("signupPassword");
const signupConfirm = document.getElementById("signupConfirmPassword");

signupName.addEventListener("input", () => {
    if (signupName.value.trim().length < 3) {
        showError("signupNameError", "Minimum 3 characters required.");
    } else {
        clearError("signupNameError");
    }
});

signupEmail.addEventListener("input", () => {
    if (!emailPattern.test(signupEmail.value.trim())) {
        showError("signupEmailError", "Enter a valid work email address.");
    } else {
        clearError("signupEmailError");
    }
});

signupPassword.addEventListener("input", () => {
    if (!passwordPattern.test(signupPassword.value)) {
        showError("signupPasswordError", "Use 8+ chars with uppercase, lowercase, number & special symbol.");
    } else {
        clearError("signupPasswordError");
    }
});

signupConfirm.addEventListener("input", () => {
    if (signupPassword.value !== signupConfirm.value) {
        showError("signupConfirmError", "Passwords do not match.");
    } else {
        clearError("signupConfirmError");
    }
});


function loading(button, text) {
    button.disabled = true;
    button.dataset.text = button.innerHTML;
    button.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> ${text}`;
}

function resetButton(button) {
    button.disabled = false;
    button.innerHTML = button.dataset.text;
}


loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let isValid = true;

    const email = loginEmail.value.trim();
    const password = loginPassword.value.trim();
    const role = document.getElementById("loginRole").value;

    if (role === "") {
        alert("Please select your security clearance level.");
        isValid = false;
    }

    if (!emailPattern.test(email)) {
        showError("loginEmailError", "Please enter a valid work email address.");
        isValid = false;
    } else {
        clearError("loginEmailError");
    }

    if (password.length < 8) {
        showError("loginPasswordError", "Password must contain at least 8 characters.");
        isValid = false;
    } else {
        clearError("loginPasswordError");
    }

    if (!isValid) {
        shake(loginForm);
        return;
    }

    const loginButton = loginForm.querySelector(".main-btn");
    loading(loginButton, "Authenticating Grid...");

    const remember = document.querySelector(".remember-me input");
    if (remember.checked) {
        localStorage.setItem("rememberEmail", email);
    } else {
        localStorage.removeItem("rememberEmail");
    }

    localStorage.setItem("UserMail", email);
    localStorage.setItem("UserRole", role);

    setTimeout(() => {
        resetButton(loginButton);
        if (role === "admin") {

            window.location.href = "admin.html";
        } else {

            window.location.href = "user.html";
        }
    }, 1200);
});


signupForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let isValid = true;

    const name = signupName.value.trim();
    const email = signupEmail.value.trim();
    const password = signupPassword.value;
    const confirm = signupConfirm.value;
    const role = document.getElementById("signupRole").value;

    if (role === "") {
        alert("Please select your clearance level.");
        isValid = false;
    }

    if (name.length < 3) {
        showError("signupNameError", "Full name must contain at least 3 characters.");
        isValid = false;
    } else {
        clearError("signupNameError");
    }

    if (!emailPattern.test(email)) {
        showError("signupEmailError", "Please enter a valid work email address.");
        isValid = false;
    } else {
        clearError("signupEmailError");
    }

    if (!passwordPattern.test(password)) {
        showError("signupPasswordError", "Password must contain uppercase, lowercase, number & special symbol.");
        isValid = false;
    } else {
        clearError("signupPasswordError");
    }

    if (password !== confirm) {
        showError("signupConfirmError", "Passwords do not match.");
        isValid = false;
    } else {
        clearError("signupConfirmError");
    }

    if (!isValid) {
        shake(signupForm);
        return;
    }

    const signupButton = signupForm.querySelector(".main-btn");
    loading(signupButton, "Registering Biometrics...");

    const user = { name, email, password, role };
    localStorage.setItem("registeredUser", JSON.stringify(user));

    setTimeout(() => {
        resetButton(signupButton);
        alert("Account Created Successfully! Please login with your credentials.");
        signupForm.reset();
        showLoginForm();
    }, 1500);
});


document.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        const activeForm = loginForm.classList.contains("hidden") ? signupForm : loginForm;
        const submitButton = activeForm.querySelector(".main-btn");
        if (submitButton) submitButton.click();
    }
});


document.getElementById("loginRole").addEventListener("change", () => {
    clearError("loginEmailError");
    clearError("loginPasswordError");
});

document.getElementById("signupRole").addEventListener("change", () => {
    clearError("signupNameError");
    clearError("signupEmailError");
    clearError("signupPasswordError");
    clearError("signupConfirmError");
});


document.querySelectorAll(".main-btn").forEach(btn => {
    btn.addEventListener("dblclick", function (e) { e.preventDefault(); });
});