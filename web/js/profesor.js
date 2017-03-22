var consolaEvaluare = CodeMirror.fromTextArea(document.getElementById("consolaEvaluare"), {
    lineNumbers: true,
    showCursorWhenSelecting: true,
    styleActiveLine: true,
    dragDrop: false,
    //readOnly: true,
    mode: "text/x-c++src",
    theme: "dracula",
    gutters: ["CodeMirror-linenumbers", "breakpoints"]
});

var consolaResponse = CodeMirror.fromTextArea(document.getElementById("consoleRes"), {
    lineNumbers: true,
    showCursorWhenSelecting: true,
    styleActiveLine: true,
    dragDrop: false,
    readOnly: true,
    mode: "text/x-c++src",
    theme: "dracula",
    gutters: ["CodeMirror-linenumbers", "breakpoints"]
});

checkCookies(consolaEvaluare);
checkCookies(consolaResponse)

function checkCookies(consola) {
    var select = document.getElementById("select");
    var cookie = getCookie("theme");
    if (cookie) {
        for (var i = 0, j = select.options.length; i < j; ++i) {
            if (select.options[i].innerHTML === cookie) {
                select.selectedIndex = i;
                break;
            }
        }
        if (cookie === "default") {
            consola.setOption("theme", "default");
        } else {
            consola.setOption("theme", "dracula");
        }
    }
}

function selectTheme() {
    var e = document.getElementById("select")
    var theme = e.options[e.selectedIndex].innerHTML;
    if (theme === "Default") {
        consolaEvaluare.setOption("theme", "default");
        consolaResponse.setOption("theme", "default");
    } else {
        consolaEvaluare.setOption("theme", "dracula");
        consolaResponse.setOption("theme", "dracula");
    }

    setCookie("theme", theme, 365);
}

var collapsed = false;

function setVisible(stare, size) {
    for (var i = 0; i < size; i++) {
        var student = document.getElementById("student" + i);
        student.style.display = stare;
    }
}

function collapse(size) {
    if (collapsed) {
        setVisible("block", size);
        collapsed = false;
    } else {
        setVisible("none", size);
        collapsed = true;
    }
}

