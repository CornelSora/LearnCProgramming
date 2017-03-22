function validateRegister()
{
    var uname = document.getElementById("unameId");
    var pass1 = document.getElementById("passId");
    var pass2 = document.getElementById("passId2");
    var unameError = document.getElementById("unameRegID");
    var passError = document.getElementById("passRegID");
    var valid = true;
    if (uname.value.length <= 0) {
        unameError.style.display = 'block';
        valid = false;
    } else if (uname.value.length < 4) {
        unameError.innerHTML = "Username-ul trebuie sa contina minim 4 caractere";
        unameError.style.display = 'block';
        valid = false;
    } else {
        unameError.style.display = 'none';
    }
    if (pass1.value.length <= 0) {
        passError.style.display = 'block';
        valid = false;
    } else if (pass1.value.length < 4) {
        passError.innerHTML = "Parola trebuie sa contina minim 4 caractere";
        passError.style.display = 'block';
        valid = false;
    } else if (pass1.value !== pass2.value) {
        passError.innerHTML = "A doua parola trebuie sa fie identica cu prima!";
        passError.style.display = 'block';
        valid = false;
    } else {
        passError.style.display = 'none';
    }
    return valid;
}
;

function validateLogin() {
    var valid = true;
    var uname = document.getElementById("usernameId");
    var pass = document.getElementById("passwId");
    var unameError = document.getElementById("unameLoginID");
    var passError = document.getElementById("passLoginID");

    if (uname.value.length <= 0) {
        valid = false;
        unameError.style.display = 'block';
    } else {
        unameError.style.display = 'none';
    }

    if (pass.value.length <= 0) {
        valid = false;
        passError.style.display = 'block';
    } else {
        passError.style.display = 'none';
    }
    return valid;
}

function validateFile() {
    var fileName = document.getElementById("fileName");
    var erFile = document.getElementById("fileId");
    var valid = true;
    if (fileName.value.length === 0 || fileName.value.trim(" ") === "") {
        valid = false;
        erFile.style.display = 'block';
    } else {
        erFile.style.display = 'none';
    }
    return valid;
}