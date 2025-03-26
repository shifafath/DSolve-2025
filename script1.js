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
async function login() {
    const loginForm = document.getElementById('loginForm');
    const inputs = loginForm.getElementsByTagName('input');

    // Extract email and password values
    const email = inputs['email'].value.trim();
    const password = inputs['password'].value.trim();

    // Basic validation
    if (!email || !password) {
        alert('Please enter both email and password.');
        return;
    }

    // Prepare the login data
    const loginData = {
        email: email,
        password: password
    };

    try {
        // Send a POST request to the login API
        const response = await fetch('http://192.168.143.23:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });

        const data = await response.json();

        if (response.ok) {
            // Store token in local storage (if needed)
            localStorage.setItem('authToken', data.token);

            // Redirect to dashboard
            document.getElementById('landingPage').style.display = 'none';
            document.getElementById('dashboardPage').style.display = 'block';
        } else {
            alert(data.message || 'Login failed. Please check your credentials.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while logging in. Please try again later.');
    }
}


function signup() {
    const signupForm = document.getElementById('signupForm');
    const inputs = signupForm.getElementsByTagName('input');
    
    // Basic validation
    if (validateForm(inputs)) {
        // Check if passwords match
        if (inputs[2].value !== inputs[3].value) {
            alert('Passwords do not match');
            return;
        }
        
        alert('Account created successfully! Please login.');
        showLogin();
    }
}

function logout() {
    document.getElementById('landingPage').style.display = 'block';
    document.getElementById('dashboardPage').style.display = 'none';
    clearForms();
}

// Travel Planning Functions
function calculateRoute() {
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    
    if (!from || !to) {
        alert('Please enter both starting location and destination');
        return;
    }
    
    // In a real app, this would call a maps API
    // For demo, we'll use random values
    const distance = Math.floor(Math.random() * 20) + 5; // 5-25 km
    let time;
    
    // Get selected transport (default to bus if none selected)
    const selectedTransport = document.querySelector('.transport-option.active');
    const transportType = selectedTransport ? selectedTransport.getAttribute('data-type') : 'bus';
    
    // Calculate time based on transport type
    switch(transportType) {
        case 'walking':
            time = distance * 12; // ~5 km/h
            break;
        case 'bicycle':
            time = distance * 4; // ~15 km/h
            break;
        case 'train':
            time = distance * 1.5; // ~40 km/h
            break;
        case 'bus':
        default:
            time = distance * 3; // ~20 km/h
            break;
    }
    
    // Update UI
    document.getElementById('distance').textContent = distance + ' km';
    document.getElementById('time').textContent = Math.round(time) + ' min';
}

function selectTransport(element, type) {
    // Remove active class from all options
    const options = document.querySelectorAll('.transport-option');
    options.forEach(option => option.classList.remove('active'));
    
    // Add active class to selected option
    element.classList.add('active');
    element.setAttribute('data-type', type);
    
    // If locations are already entered, recalculate
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    if (from && to) {
        calculateRoute();
    }
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