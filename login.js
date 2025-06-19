const form = document.getElementById('loginForm');
const messageDiv = document.getElementById('message');
// මෙතනටත් ඔයා copy කරගත්ත Web App URL එක දාන්න
const GAS_URL = 'https://script.google.com/macros/s/AKfycbyQq0NeOt4G9V0awci2TiOZk0Lh---AlePC_2ke6-Aj55imcfWTltspkA0g2CJkzSQV/exec'; 

form.addEventListener('submit', e => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    messageDiv.textContent = 'Logging in...';
    messageDiv.style.color = 'black';

    // We append username and password as URL parameters for a GET request
    const loginUrl = `<span class="math-inline">\{GAS\_URL\}?username\=</span>{encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;

    fetch(loginUrl)
    .then(res => res.json())
    .then(data => {
        if (data.status === 'success') {
            messageDiv.textContent = 'Login Successful! Redirecting...';
            messageDiv.style.color = 'green';

            // Save user info in localStorage
            localStorage.setItem('uniHelpUser', JSON.stringify(data.user));

            // Redirect to the department-specific page
            setTimeout(() => {
                window.location.href = `${data.user.department}-page.html`;
            }, 1500);

        } else {
            messageDiv.textContent = `Login Failed: ${data.message}`;
            messageDiv.style.color = 'red';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        messageDiv.textContent = 'An error occurred during login.';
        messageDiv.style.color = 'red';
    });
});