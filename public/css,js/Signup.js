
function validatePasswords() {
    var password1 = document.getElementById('passwordInput').value;
    var password2 = document.getElementById('confirmPasswordInput').value;
    var passwordError = document.getElementById('passwordError');
    var constraints = [];

    if (password1 !== password2) {
        constraints.push("Passwords do not match!");
    }

    if (password1.length < 8 || password1.length > 15) {
        constraints.push("Password must be between 8 and 15 characters long.");
    }

    if (!/[a-zA-Z]/.test(password1)) {
        constraints.push("Password must contain at least one alphabet letter.");
    }

    if (!/\d/.test(password1)) {
        constraints.push("Password must contain at least one digit.");
    }

    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password1)) {
        constraints.push("Password must contain at least one symbol (!@#$%^&*()_+-=[]{};':\"\\|,.<>/?).");
    }

    if (constraints.length > 0) {
        passwordError.textContent = constraints.join(" ");
        passwordError.classList.add("show");
        return false;
    } else {
        passwordError.classList.remove("show");
        return true;
    }
}
