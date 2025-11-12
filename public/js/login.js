// Utility Functions
function goHome() {
    window.location.href = '/dephar';
}

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validatePassword(password) {
    return password.length >= 8;
}

function showError(inputId, errorId, message) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);
    
    if (input && error) {
        input.classList.add('error');
        error.textContent = message;
        error.classList.add('show');
    }
}

function clearError(inputId, errorId) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);
    
    if (input && error) {
        input.classList.remove('error');
        error.textContent = '';
        error.classList.remove('show');
    }
}

function clearAllErrors() {
    const errorTexts = document.querySelectorAll('.error-text');
    const inputs = document.querySelectorAll('.form-input');
    
    errorTexts.forEach(error => {
        error.textContent = '';
        error.classList.remove('show');
    });
    
    inputs.forEach(input => {
        input.classList.remove('error');
    });
}

function showMessage(type, message) {
    const messageId = type === 'error' ? 'errorMessage' : 'successMessage';
    const messageElement = document.getElementById(messageId);
    
    if (messageElement) {
        messageElement.textContent = message;
        messageElement.classList.add('show');
        
        // Hide after 5 seconds
        setTimeout(() => {
            messageElement.classList.remove('show');
        }, 5000);
    }
}

function hideMessages() {
    const errorMessage = document.getElementById('errorMessage');
    const successMessage = document.getElementById('successMessage');
    
    if (errorMessage) errorMessage.classList.remove('show');
    if (successMessage) successMessage.classList.remove('show');
}

function setLoading(isLoading) {
    const submitButton = document.getElementById('submitButton');
    const loadingSpinner = document.getElementById('loadingSpinner');
    
    if (submitButton && loadingSpinner) {
        if (isLoading) {
            submitButton.disabled = true;
            submitButton.classList.add('loading');
        } else {
            submitButton.disabled = false;
            submitButton.classList.remove('loading');
        }
    }
}

// Login Form Handler
if (document.getElementById('loginForm')) {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    // Clear errors on input
    emailInput.addEventListener('input', () => {
        clearError('email', 'emailError');
        hideMessages();
    });

    passwordInput.addEventListener('input', () => {
        clearError('password', 'passwordError');
        hideMessages();
    });

}

// Register Form Handler
if (document.getElementById('registerForm')) {
    const registerForm = document.getElementById('registerForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');

    // Clear errors on input
    emailInput.addEventListener('input', () => {
        clearError('email', 'emailError');
        hideMessages();
    });

    passwordInput.addEventListener('input', () => {
        clearError('password', 'passwordError');
        hideMessages();
    });

    confirmPasswordInput.addEventListener('input', () => {
        clearError('confirmPassword', 'confirmPasswordError');
        hideMessages();
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Add enter key support for forms
    const forms = document.querySelectorAll('.auth-form');
    forms.forEach(form => {
        form.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                form.requestSubmit();
            }
        });
    });
});

//FIM FRONT-END

const authForm = document.getElementById("loginForm")
const emailField = document.getElementById("email")
const passwordField = document.getElementById("password")
const submitButton = document.getElementById("submitButton")

authForm.addEventListener("submit", async(event) => {
    event.preventDefault();

    const email = emailField.value;
    const password = passwordField.value;

    try{
        const response = await axios.post("/api/v1/auth/login", {
            email: email,
            password: password,
        });

        const token = response.data.user.token;
        const userType = response.data.user.userType;
        localStorage.setItem("token", token);
        localStorage.setItem("userType", userType);
        setTimeout(() => {
            window.location.href = "/dephar";
        }, 1000);
        }
    catch(error){
        console.error("Erro no login:", error);
        showMessage("error", "Erro no login, verifique as suas credenciais!")
    }
    });



    

    
