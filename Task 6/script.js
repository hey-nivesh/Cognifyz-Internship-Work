document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const inputs = form.querySelectorAll('input');
    
    const patterns = {
        name: /^[a-zA-Z\s]{2,50}$/,
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
        phone: /^\+?[\d\s-]{10,}$/,
        dob: /^\d{4}-\d{2}-\d{2}$/
    };
    const messages = {
        name: 'Name should contain only letters and spaces (2-50 characters)',
        email: 'Please enter a valid email address',
        password: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number',
        confirmPassword: 'Passwords do not match',
        phone: 'Please enter a valid phone number',
        dob: 'Please enter a valid date of birth'
    };

    inputs.forEach(input => {
        input.addEventListener('input', () => {
            validateField(input);
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });

        if (isValid) {
            alert('Form submitted successfully!');
            form.reset();
        }
    });  // Field validation function
    function validateField(input) {
        const value = input.value.trim();
        const fieldName = input.name;
        const errorElement = document.getElementById(`${fieldName}Error`);
      
        input.classList.remove('error', 'success');
        errorElement.textContent = '';

        if (value === '' && input.required) {
            return false;
        }
        if (fieldName === 'confirmPassword') {
            const password = document.getElementById('password').value;
            if (value !== password) {
                showError(input, errorElement, messages.confirmPassword);
                return false;
            }
        }
        else if (fieldName === 'dob') {
            const dob = new Date(value);
            const today = new Date();
            const age = today.getFullYear() - dob.getFullYear();
            
            if (age < 18) {
                showError(input, errorElement, 'You must be at least 18 years old');
                return false;
            }
        }
        else if (patterns[fieldName] && !patterns[fieldName].test(value)) {
            showError(input, errorElement, messages[fieldName]);
            return false;
        }

        input.classList.add('success');
        return true;
    }

    function showError(input, errorElement, message) {
        input.classList.add('error');
        errorElement.textContent = message;
    }
}); 