const form = document.getElementById('signupForm');
const messageDiv = document.getElementById('message');
// මෙතනට ඔයා copy කරගත්ත Web App URL එක දාන්න
const GAS_URL = 'https://script.google.com/macros/s/AKfycbyQq0NeOt4G9V0awci2TiOZk0Lh---AlePC_2ke6-Aj55imcfWTltspkA0g2CJkzSQV/exec';

form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevents the form from submitting the default way

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const department = document.getElementById('department').value;

    messageDiv.textContent = 'Signing up...';
    messageDiv.style.color = 'black';

    const data = { username, password, department };

    fetch(GAS_URL, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'text/plain;charset=utf-8', // Required for Apps Script
        },
    })
    .then(response => response.json())
    .then(result => {
        if (result.status === 'success') {
            messageDiv.textContent = 'Sign up successful! You can now log in.';
            messageDiv.style.color = 'green';
            form.reset(); // Clear the form
            setTimeout(() => {
                window.location.href = 'index.html'; // Redirect to login page
            }, 2000);
        } else {
            messageDiv.textContent = `Error: ${result.message}`;
            messageDiv.style.color = 'red';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        messageDiv.textContent = 'An unexpected error occurred.';
        messageDiv.style.color = 'red';
    });
});