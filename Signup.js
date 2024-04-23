function validatePasswords() {
    var password1 = document.getElementById('passwordInput').value;
    var password2 = document.getElementById('confirmPasswordInput').value;

    if (password1 !== password2) {
        document.getElementById('passwordError').classList.add("show");
        return false;
    } else {
        document.getElementById('passwordError').classList.remove("show");
        return true; 
    }
}
