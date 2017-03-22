'use strict'
/*CodeMirror*/
var consoleWrite = CodeMirror.fromTextArea(document.getElementById("console"), {
    lineNumbers: true,
    showCursorWhenSelecting: true,
    styleActiveLine: true,
    dragDrop: false,
    mode: "text/x-c++src",
    theme: "dracula",
    gutters: ["CodeMirror-linenumbers", "breakpoints", "CodeMirror-foldgutter"],
    foldGutter: true,
    height: "400px"
});

var consoleResult = null;
if (document.getElementById("consoleRes")) {
    consoleResult = CodeMirror.fromTextArea(document.getElementById("consoleRes"), {
        lineNumbers: true,
        showCursorWhenSelecting: true,
        styleActiveLine: true,
        matchBrackets: true,
        dragDrop: false,
        mode: "text/x-c++src",
        theme: "dracula",
        readOnly: true,
        height: "100px"
    });
    checkCookies(consoleResult);
}

consoleWrite.on("keyup", function (cm, event) {
    if (event.ctrlKey) {
        event.preventDefault();
        CodeMirror.commands.autocomplete(cm, null, {completeSingle: true});
    }
});

consoleWrite.on("gutterClick", function (cm, n) {
    var info = cm.lineInfo(n);
    console.log(info.line + 1);
    cm.setGutterMarker(n, "breakpoints", info.gutterMarkers ? null : makeMarker());
});

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
        if (cookie === "Default") {
            consola.setOption("theme", "default");
        } else if (cookie === "Dark") {
            consola.setOption("theme", "dracula");
        } else if (cookie === "3024-night") {
            consola.setOption("theme", "3024-night");
        }
    }
}

checkCookies(consoleWrite);

function selectTheme() {
    var e = document.getElementById("select")
    var theme = e.options[e.selectedIndex].innerHTML;
    if (theme === "Default") {
        consoleWrite.setOption("theme", "default");
    } else if (theme === "Dark") {
        consoleWrite.setOption("theme", "dracula");
    } else if (theme === "3024-night") {
        consoleWrite.setOption("theme", "3024-night");
    }

    if (consoleResult) {
        if (theme === "Default") {
            consoleResult.setOption("theme", "default");
        } else if (theme === "Dark") {
            consoleResult.setOption("theme", "dracula");
        } else if (theme === "3024-night") {
            consoleResult.setOption("theme", "3024-night");
        }
    }

    setCookie("theme", theme, 365);
}

var full = getCookie("fullscreen");
if (consoleResult) {
    consoleResult.setSize("100%", "30%")
}
if (full === "true") {
    consoleWrite.setSize("100%", "80%");
} else {
    consoleWrite.setSize("100%", "50%");
}

function fullScreen() {
    if (!full) {
        consoleWrite.setSize("100%", "80%");
        setCookie("fullscreen", true);
    } else {
        consoleWrite.setSize("100%", "50%");
        setCookie("fullscreen", false);
    }
    full = !full;
}

$(document).on('keydown', function (e) {
    if (e.which === 122) {
        fullScreen();
        e.preventDefault();
        return false;
    }
    if (e.which === 27 && full) {
        fullScreen();
    }
});


CodeMirror.defineExtension("autoFormatRange", function (from, to) {
    var cm = this;
    var outer = cm.getMode(), text = cm.getRange(from, to).split("\n");
    var state = CodeMirror.copyState(outer, cm.getTokenAt(from).state);
    var tabSize = cm.getOption("tabSize");

    var out = "", lines = 0, atSol = from.ch == 0;
    function newline() {
        out += "\n";
        atSol = true;
        ++lines;
    }

    for (var i = 0; i < text.length; ++i) {
        var stream = new CodeMirror.StringStream(text[i], tabSize);
        while (!stream.eol()) {
            var inner = CodeMirror.innerMode(outer, state);
            var style = outer.token(stream, state), cur = stream.current();
            stream.start = stream.pos;
            if (!atSol || /\S/.test(cur)) {
                out += cur;
                atSol = false;
            }
            if (!atSol && inner.mode.newlineAfterToken &&
                    inner.mode.newlineAfterToken(style, cur, stream.string.slice(stream.pos) || text[i + 1] || "", inner.state))
                newline();
        }
        if (!stream.pos && outer.blankLine)
            outer.blankLine(state);
        if (!atSol)
            newline();
    }

    cm.operation(function () {
        cm.replaceRange(out, from, to);
        for (var cur = from.line + 1, end = from.line + lines; cur <= end; ++cur)
            cm.indentLine(cur, "smart");
    });
});

// Applies automatic mode-aware indentation to the specified range
CodeMirror.defineExtension("autoIndentRange", function (from, to) {
    var cmInstance = this;
    this.operation(function () {
        for (var i = from.line; i <= to.line; i++) {
            cmInstance.indentLine(i, "smart");
        }
    });
});

function formatCode() {
    var totalLines = consoleWrite.lineCount();
    consoleWrite.autoFormatRange({line: 0, ch: 0}, {line: totalLines});
}
