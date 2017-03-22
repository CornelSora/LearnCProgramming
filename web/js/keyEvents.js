$(document).on('keydown', function (e) {
    if (e.ctrlKey && e.which === 83) {
        var btnSave = document.getElementById("btnSave");
        btnSave.click();
        e.preventDefault();
        return false;
    }
});

$(document).on('keydown', function (e) {
    if (e.ctrlKey && e.which === 66) {
        var btnRun = document.getElementById("btnRun");
        btnRun.click();
        e.preventDefault();
        return false;
    }
});

$(document).on('keydown', function (e) {
    if (e.ctrlKey && e.which === 82) {
        var btnRun = document.getElementById("btnRun");
        btnRun.click();
        e.preventDefault();
        return false;
    }
});

$(document).on('keydown', function (e) {
    if (e.ctrlKey && e.which === 80) {
        var btnRun = document.getElementById("btnStop");
        btnRun.click();
        e.preventDefault();
        return false;
    }
});

var online = true;
var ctrlCopyPressed = false;

$(document).on('keydown', function (e) {
    if (e.ctrlKey && (e.which === 67 || e.which === 88)) {
        ctrlCopyPressed = true;
    }
});

/*$(document).on('keydown', function (e) {
    if (e.ctrlKey && e.which === 86) {
        if (!ctrlCopyPressed) {
            e.preventDefault();
            alert("Nu poti copia!");
        }
    }
});
*/
$(window).blur(function () {
    ctrlCopyPressed = false;
});

$(window).focus(function () {
    
});