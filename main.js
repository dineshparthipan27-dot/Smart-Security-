
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.custom-navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(6, 13, 26, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.7)';
    } else {
        navbar.style.background = 'rgba(10, 22, 43, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});


const navLinks = document.querySelectorAll('.nav-link');
const menuToggle = document.getElementById('navbarNav');
const bsCollapse = new bootstrap.Collapse(menuToggle, { toggle: false });

navLinks.forEach((link) => {
    link.addEventListener('click', () => {
        if (window.innerWidth < 992) {
            bsCollapse.toggle();
        }
    });
});



document.addEventListener("DOMContentLoaded", function () {
    const auditForm = document.getElementById('auditForm');
    const userName = document.getElementById('userName');
    const userPhone = document.getElementById('userPhone');
    const successOverlay = document.getElementById('successOverlay');
    const confirmName = document.getElementById('confirmName');
    const resetFormBtn = document.getElementById('resetFormBtn');

    if (auditForm) {
        auditForm.addEventListener('submit', function (e) {
            e.preventDefault(); // Prevents page reload

            let isValid = true;


            if (userName.value.trim().length < 3) {
                userName.classList.add('is-invalid');
                isValid = false;
            } else {
                userName.classList.remove('is-invalid');
            }


            const phoneRegex = /^[0-9]{10}$/;
            if (!phoneRegex.test(userPhone.value.trim())) {
                userPhone.classList.add('is-invalid');
                isValid = false;
            } else {
                userPhone.classList.remove('is-invalid');
            }


            if (isValid) {
                confirmName.textContent = userName.value.trim();
                auditForm.style.opacity = '0.2';
                auditForm.style.pointerEvents = 'none';

                successOverlay.classList.remove('d-none');
                successOverlay.classList.add('d-flex');
                window.location.href = '404.html'
            }
        });


        userName.addEventListener('input', () => userName.classList.remove('is-invalid'));
        userPhone.addEventListener('input', () => {
            userPhone.value = userPhone.value.replace(/[^0-9]/g, ''); // Allows only numbers
            userPhone.classList.remove('is-invalid');
        });


        resetFormBtn.addEventListener('click', () => {
            auditForm.reset();
            auditForm.style.opacity = '1';
            auditForm.style.pointerEvents = 'auto';
            successOverlay.classList.remove('d-flex');
            successOverlay.classList.add('d-none');
        });
    }
});