// Show/Hide Forms
function showLogin() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('signupForm').style.display = 'none';
}

function showSignup() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('signupForm').style.display = 'block';
}

// Authentication Functions
function login() {
    const loginForm = document.getElementById('loginForm');
    const inputs = loginForm.getElementsByTagName('input');
    
    // Basic validation
    if (validateForm(inputs)) {
        document.getElementById('landingPage').style.display = 'none';
        document.getElementById('dashboardPage').style.display = 'block';
    }
}

function signup() {
    const signupForm = document.getElementById('signupForm');
    const inputs = signupForm.getElementsByTagName('input');
    
    // Basic validation
    if (validateForm(inputs)) {
        alert('Account created successfully! Please login.');
        showLogin();
    }
}

function logout() {
    document.getElementById('landingPage').style.display = 'block';
    document.getElementById('dashboardPage').style.display = 'none';
    clearForms();
}

// Utility Functions
function validateForm(inputs) {
    for (let input of inputs) {
        if (!input.value) {
            alert('Please fill in all fields');
            return false;
        }
        if (input.type === 'email' && !validateEmail(input.value)) {
            alert('Please enter a valid email');
            return false;
        }
    }
    return true;
}

function validateEmail(email) {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
}

function clearForms() {
    const forms = document.getElementsByClassName('auth-form');
    for (let form of forms) {
        const inputs = form.getElementsByTagName('input');
        for (let input of inputs) {
            input.value = '';
        }
        form.style.display = 'none';
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Add FontAwesome for icons
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
    document.head.appendChild(link);
});
