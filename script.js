// script.js

// !!! IMPORTANT: Paste your Google Apps Script Web App URL here !!!
const SCRIPT_URL = 'YOUR_APPS_SCRIPT_URL_HERE';

document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');
    const loginForm = document.getElementById('login-form');
    const logoutButton = document.getElementById('logout-button');
    const forgotPasswordLink = document.getElementById('forgot-password-link');
    const messageDiv = document.getElementById('message');

    // --- Signup Form Handler ---
    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(signupForm);
            formData.append('action', 'signup');
            
            messageDiv.textContent = 'Creating account...';
            messageDiv.style.color = '#333';

            const response = await fetch(SCRIPT_URL, {
                method: 'POST',
                body: formData
            });
            const result = await response.json();

            if (result.status === 'success') {
                messageDiv.textContent = result.message + ' Redirecting to login...';
                messageDiv.style.color = 'var(--success-color)';
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 2000);
            } else {
                messageDiv.textContent = 'Error: ' + result.message;
                messageDiv.style.color = 'var(--error-color)';
            }
        });
    }

    // --- Login Form Handler ---
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(loginForm);
            formData.append('action', 'login');

            messageDiv.textContent = 'Logging in...';
            messageDiv.style.color = '#333';

            const response = await fetch(SCRIPT_URL, {
                method: 'POST',
                body: formData
            });
            const result = await response.json();

            if (result.status === 'success') {
                // Store login state and department in localStorage
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('department', result.department);

                messageDiv.textContent = result.message + ' Redirecting...';
                messageDiv.style.color = 'var(--success-color)';
                
                // Redirect to the matching department page
                const departmentPage = `department_${result.department.toLowerCase()}.html`;
                setTimeout(() => {
                    window.location.href = departmentPage;
                }, 1500);

            } else {
                messageDiv.textContent = 'Error: ' + result.message;
                messageDiv.style.color = 'var(--error-color)';
            }
        });
    }
    
    // --- Forgot Password Handler ---
    if(forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', async (e) => {
            e.preventDefault();
            const email = prompt("Please enter your registered email address:");
            if(email) {
                 const formData = new FormData();
                 formData.append('action', 'forgotPassword');
                 formData.append('email', email);
                 
                 messageDiv.textContent = 'Sending request...';
                 messageDiv.style.color = '#333';

                 const response = await fetch(SCRIPT_URL, {
                     method: 'POST',
                     body: formData
                 });
                 const result = await response.json();

                 if (result.status === 'success') {
                     messageDiv.textContent = result.message;
                     messageDiv.style.color = 'var(--success-color)';
                 } else {
                     messageDiv.textContent = 'Error: ' + result.message;
                     messageDiv.style.color = 'var(--error-color)';
                 }
            }
        });
    }

    // --- Logout Button Handler ---
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('department');
            window.location.href = 'login.html';
        });
    }

    // --- Telegram Popup Handler (runs on department pages) ---
    const telegramPopup = document.getElementById('telegram-popup');
    if (telegramPopup) {
        // Show popup 3 seconds after the page loads
        setTimeout(() => {
            telegramPopup.classList.remove('hidden');
        }, 3000);

        const closeBtn = telegramPopup.querySelector('.close-btn');
        closeBtn.addEventListener('click', () => {
            telegramPopup.classList.add('hidden');
        });
    }
});