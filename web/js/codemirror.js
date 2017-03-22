"use strict";

function getCompletions(token, context) {
    var found = [], start = token.string;
    function maybeAdd(str) {
        if (str.indexOf(start) == 0)
            found.push(str);
    }
    function gatherCompletions(obj) {
        if (typeof obj == "string")
            forEach(stringProps, maybeAdd);
        else if (obj instanceof Array)
            forEach(arrayProps, maybeAdd);
        else if (obj instanceof Function)
            forEach(funcProps, maybeAdd);
        for (var name in obj)
            maybeAdd(name);
    }

    if (context) {
        // If this is a property, see if it belongs to some object we can
        // find in the current environment.
        var obj = context.pop(), base;
        if (obj.className == "js-variable")
            base = window[obj.string];
        else if (obj.className == "js-string")
            base = "";
        else if (obj.className == "js-atom")
            base = 1;
        while (base != null && context.length)
            base = base[context.pop().string];
        if (base != null)
            gatherCompletions(base);
    } else {
        // If not, just look in the window object and any local scope
        // (reading into JS mode internals to get at the local variables)
        for (var v = token.state.localVars; v; v = v.next)
            maybeAdd(v.name);
        gatherCompletions(window);
        forEach(keywords, maybeAdd);
    }
    return found;
}


function _toConsumableArray(e) {
    if (Array.isArray(e)) {
        for (var t = 0, n = Array(e.length); t < e.length; t++)
            n[t] = e[t];
        return n
    }
    return Array.from(e)
}
var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
    return typeof e
} : function (e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e
};
!function (e) {
    (this || window).CodeMirror = e()
}(function () {
    function e(n, r) {
        if (!(this instanceof e))
            return new e(n, r);
        this.options = r = r ? Di(r) : {}, Di(ea, r, !1), p(r);
        var i = r.value;
        "string" == typeof i && (i = new Ca(i, r.mode, null, r.lineSeparator)), this.doc = i;
        var o = new e.inputStyles[r.inputStyle](this),
                a = this.display = new t(n, i, o);
        a.wrapper.CodeMirror = this, c(this), s(this), r.lineWrapping && (this.display.wrapper.className += " CodeMirror-wrap"), r.autofocus && !Ao && a.input.focus(), v(this), this.state = {
            keyMaps: [],
            overlays: [],
            modeGen: 0,
            overwrite: !1,
            delayingBlurEvent: !1,
            focused: !1,
            suppressEdits: !1,
            pasteIncoming: !1,
            cutIncoming: !1,
            selectingText: !1,
            draggingText: !1,
            highlight: new Ei,
            keySeq: null,
            specialChars: null
        };
        var l = this;
        _o && bo < 11 && setTimeout(function () {
            l.display.input.reset(!0)
        }, 20), qt(this), Xi(), bt(this), this.curOp.forceUpdate = !0, Yr(this, i), r.autofocus && !Ao || l.hasFocus() ? setTimeout(Fi(vn, this), 20) : yn(this);
        for (var u in ta)
            ta.hasOwnProperty(u) && ta[u](this, r[u], na);
        k(this), r.finishInit && r.finishInit(this);
        for (var f = 0; f < aa.length; ++f)
            aa[f](this);
        kt(this), wo && r.lineWrapping && "optimizelegibility" == getComputedStyle(a.lineDiv).textRendering && (a.lineDiv.style.textRendering = "auto")
    }

    function t(e, t, n) {
        var r = this;
        this.input = n, r.scrollbarFiller = qi("div", null, "CodeMirror-scrollbar-filler"), r.scrollbarFiller.setAttribute("cm-not-content", "true"), r.gutterFiller = qi("div", null, "CodeMirror-gutter-filler"), r.gutterFiller.setAttribute("cm-not-content", "true"), r.lineDiv = qi("div", null, "CodeMirror-code"), r.selectionDiv = qi("div", null, null, "position: relative; z-index: 1"), r.cursorDiv = qi("div", null, "CodeMirror-cursors"), r.measure = qi("div", null, "CodeMirror-measure"), r.lineMeasure = qi("div", null, "CodeMirror-measure"), r.lineSpace = qi("div", [r.measure, r.lineMeasure, r.selectionDiv, r.cursorDiv, r.lineDiv], null, "position: relative; outline: none"), r.mover = qi("div", [qi("div", [r.lineSpace], "CodeMirror-lines")], null, "position: relative"), r.sizer = qi("div", [r.mover], "CodeMirror-sizer"), r.sizerWidth = null, r.heightForcer = qi("div", null, null, "position: absolute; height: " + Pa + "px; width: 1px;"), r.gutters = qi("div", null, "CodeMirror-gutters"), r.lineGutter = null, r.scroller = qi("div", [r.sizer, r.heightForcer, r.gutters], "CodeMirror-scroll"), r.scroller.setAttribute("tabIndex", "-1"), r.wrapper = qi("div", [r.scrollbarFiller, r.gutterFiller, r.scroller], "CodeMirror"), _o && bo < 8 && (r.gutters.style.zIndex = -1, r.scroller.style.paddingRight = 0), wo || go && Ao || (r.scroller.draggable = !0), e && (e.appendChild ? e.appendChild(r.wrapper) : e(r.wrapper)), r.viewFrom = r.viewTo = t.first, r.reportedViewFrom = r.reportedViewTo = t.first, r.view = [], r.renderedView = null, r.externalMeasured = null, r.viewOffset = 0, r.lastWrapHeight = r.lastWrapWidth = 0, r.updateLineNumbers = null, r.nativeBarWidth = r.barHeight = r.barWidth = 0, r.scrollbarsClipped = !1, r.lineNumWidth = r.lineNumInnerWidth = r.lineNumChars = null, r.alignWidgets = !1, r.cachedCharWidth = r.cachedTextHeight = r.cachedPaddingH = null, r.maxLine = null, r.maxLineLength = 0, r.maxLineChanged = !1, r.wheelDX = r.wheelDY = r.wheelStartX = r.wheelStartY = null, r.shift = !1, r.selForContextMenu = null, r.activeTouch = null, n.init(r)
    }

    function n(t) {
        t.doc.mode = e.getMode(t.options, t.doc.modeOption), r(t)
    }

    function r(e) {
        e.doc.iter(function (e) {
            e.stateAfter && (e.stateAfter = null), e.styles && (e.styles = null)
        }), e.doc.frontier = e.doc.first, We(e, 100), e.state.modeGen++, e.curOp && Pt(e)
    }

    function i(e) {
        e.options.lineWrapping ? (Qa(e.display.wrapper, "CodeMirror-wrap"), e.display.sizer.style.minWidth = "", e.display.sizerWidth = null) : (Za(e.display.wrapper, "CodeMirror-wrap"), d(e)), a(e), Pt(e), st(e), setTimeout(function () {
            y(e)
        }, 100)
    }

    function o(e) {
        var t = yt(e.display),
                n = e.options.lineWrapping,
                r = n && Math.max(5, e.display.scroller.clientWidth / _t(e.display) - 3);
        return function (i) {
            if (kr(e.doc, i))
                return 0;
            var o = 0;
            if (i.widgets)
                for (var a = 0; a < i.widgets.length; a++)
                    i.widgets[a].height && (o += i.widgets[a].height);
            return n ? o + (Math.ceil(i.text.length / r) || 1) * t : o + t
        }
    }

    function a(e) {
        var t = e.doc,
                n = o(e);
        t.iter(function (e) {
            var t = n(e);
            t != e.height && ei(e, t)
        })
    }

    function s(e) {
        e.display.wrapper.className = e.display.wrapper.className.replace(/\s*cm-s-\S+/g, "") + e.options.theme.replace(/(^|\s)\s*/g, " cm-s-"), st(e)
    }

    function l(e) {
        c(e), Pt(e), setTimeout(function () {
            w(e)
        }, 20)
    }

    function c(e) {
        var t = e.display.gutters,
                n = e.options.gutters;
        Ui(t);
        for (var r = 0; r < n.length; ++r) {
            var i = n[r],
                    o = t.appendChild(qi("div", null, "CodeMirror-gutter " + i));
            "CodeMirror-linenumbers" == i && (e.display.lineGutter = o, o.style.width = (e.display.lineNumWidth || 1) + "px")
        }
        t.style.display = r ? "" : "none", u(e)
    }

    function u(e) {
        var t = e.display.gutters.offsetWidth;
        e.display.sizer.style.marginLeft = t + "px"
    }

    function f(e) {
        if (0 == e.height)
            return 0;
        for (var t, n = e.text.length, r = e; t = mr(r); ) {
            var i = t.find(0, !0);
            r = i.from.line, n += i.from.ch - i.to.ch
        }
        for (r = e; t = gr(r); ) {
            var i = t.find(0, !0);
            n -= r.text.length - i.from.ch, r = i.to.line, n += r.text.length - i.to.ch
        }
        return n
    }

    function d(e) {
        var t = e.display,
                n = e.doc;
        t.maxLine = Zr(n, n.first), t.maxLineLength = f(t.maxLine), t.maxLineChanged = !0, n.iter(function (e) {
            var n = f(e);
            n > t.maxLineLength && (t.maxLineLength = n, t.maxLine = e)
        })
    }

    function p(e) {
        var t = Ri(e.gutters, "CodeMirror-linenumbers");
        t == -1 && e.lineNumbers ? e.gutters = e.gutters.concat(["CodeMirror-linenumbers"]) : t > -1 && !e.lineNumbers && (e.gutters = e.gutters.slice(0), e.gutters.splice(t, 1))
    }

    function h(e) {
        var t = e.display,
                n = t.gutters.offsetWidth,
                r = Math.round(e.doc.height + $e(e.display));
        return {
            clientHeight: t.scroller.clientHeight,
            viewHeight: t.wrapper.clientHeight,
            scrollWidth: t.scroller.scrollWidth,
            clientWidth: t.scroller.clientWidth,
            viewWidth: t.wrapper.clientWidth,
            barLeft: e.options.fixedGutter ? n : 0,
            docHeight: r,
            scrollHeight: r + Ke(e) + t.barHeight,
            nativeBarWidth: t.nativeBarWidth,
            gutterWidth: n
        }
    }

    function m(e, t, n) {
        this.cm = n;
        var r = this.vert = qi("div", [qi("div", null, null, "min-width: 1px")], "CodeMirror-vscrollbar"),
                i = this.horiz = qi("div", [qi("div", null, null, "height: 100%; min-height: 1px")], "CodeMirror-hscrollbar");
        e(r), e(i), Ea(r, "scroll", function () {
            r.clientHeight && t(r.scrollTop, "vertical")
        }), Ea(i, "scroll", function () {
            i.clientWidth && t(i.scrollLeft, "horizontal")
        }), this.checkedZeroWidth = !1, _o && bo < 8 && (this.horiz.style.minHeight = this.vert.style.minWidth = "18px")
    }

    function g() {}

    function v(t) {
        t.display.scrollbars && (t.display.scrollbars.clear(), t.display.scrollbars.addClass && Za(t.display.wrapper, t.display.scrollbars.addClass)), t.display.scrollbars = new e.scrollbarModel[t.options.scrollbarStyle](function (e) {
            t.display.wrapper.insertBefore(e, t.display.scrollbarFiller), Ea(e, "mousedown", function () {
                t.state.focused && setTimeout(function () {
                    t.display.input.focus()
                }, 0)
            }), e.setAttribute("cm-not-content", "true")
        }, function (e, n) {
            "horizontal" == n ? on(t, e) : rn(t, e)
        }, t), t.display.scrollbars.addClass && Qa(t.display.wrapper, t.display.scrollbars.addClass)
    }

    function y(e, t) {
        t || (t = h(e));
        var n = e.display.barWidth,
                r = e.display.barHeight;
        _(e, t);
        for (var i = 0; i < 4 && n != e.display.barWidth || r != e.display.barHeight; i++)
            n != e.display.barWidth && e.options.lineWrapping && O(e), _(e, h(e)), n = e.display.barWidth, r = e.display.barHeight
    }

    function _(e, t) {
        var n = e.display,
                r = n.scrollbars.update(t);
        n.sizer.style.paddingRight = (n.barWidth = r.right) + "px", n.sizer.style.paddingBottom = (n.barHeight = r.bottom) + "px", n.heightForcer.style.borderBottom = r.bottom + "px solid transparent", r.right && r.bottom ? (n.scrollbarFiller.style.display = "block", n.scrollbarFiller.style.height = r.bottom + "px", n.scrollbarFiller.style.width = r.right + "px") : n.scrollbarFiller.style.display = "", r.bottom && e.options.coverGutterNextToScrollbar && e.options.fixedGutter ? (n.gutterFiller.style.display = "block", n.gutterFiller.style.height = r.bottom + "px", n.gutterFiller.style.width = t.gutterWidth + "px") : n.gutterFiller.style.display = ""
    }

    function b(e, t, n) {
        var r = n && null != n.top ? Math.max(0, n.top) : e.scroller.scrollTop;
        r = Math.floor(r - Ue(e));
        var i = n && null != n.bottom ? n.bottom : r + e.wrapper.clientHeight,
                o = ni(t, r),
                a = ni(t, i);
        if (n && n.ensure) {
            var s = n.ensure.from.line,
                    l = n.ensure.to.line;
            s < o ? (o = s, a = ni(t, ri(Zr(t, s)) + e.wrapper.clientHeight)) : Math.min(l, t.lastLine()) >= a && (o = ni(t, ri(Zr(t, l)) - e.wrapper.clientHeight), a = l)
        }
        return {
            from: o,
            to: Math.max(a, o + 1)
        }
    }

    function w(e) {
        var t = e.display,
                n = t.view;
        if (t.alignWidgets || t.gutters.firstChild && e.options.fixedGutter) {
            for (var r = C(t) - t.scroller.scrollLeft + e.doc.scrollLeft, i = t.gutters.offsetWidth, o = r + "px", a = 0; a < n.length; a++)
                if (!n[a].hidden) {
                    e.options.fixedGutter && n[a].gutter && (n[a].gutter.style.left = o);
                    var s = n[a].alignable;
                    if (s)
                        for (var l = 0; l < s.length; l++)
                            s[l].style.left = o
                }
            e.options.fixedGutter && (t.gutters.style.left = r + i + "px")
        }
    }

    function k(e) {
        if (!e.options.lineNumbers)
            return !1;
        var t = e.doc,
                n = x(e.options, t.first + t.size - 1),
                r = e.display;
        if (n.length != r.lineNumChars) {
            var i = r.measure.appendChild(qi("div", [qi("div", n)], "CodeMirror-linenumber CodeMirror-gutter-elt")),
                    o = i.firstChild.offsetWidth,
                    a = i.offsetWidth - o;
            return r.lineGutter.style.width = "", r.lineNumInnerWidth = Math.max(o, r.lineGutter.offsetWidth - a) + 1, r.lineNumWidth = r.lineNumInnerWidth + a, r.lineNumChars = r.lineNumInnerWidth ? n.length : -1, r.lineGutter.style.width = r.lineNumWidth + "px", u(e), !0
        }
        return !1
    }

    function x(e, t) {
        return String(e.lineNumberFormatter(t + e.firstLineNumber))
    }

    function C(e) {
        return e.scroller.getBoundingClientRect().left - e.sizer.getBoundingClientRect().left
    }

    function S(e, t, n) {
        var r = e.display;
        this.viewport = t, this.visible = b(r, e.doc, t), this.editorIsHidden = !r.wrapper.offsetWidth, this.wrapperHeight = r.wrapper.clientHeight, this.wrapperWidth = r.wrapper.clientWidth, this.oldDisplayWidth = Ve(e), this.force = n, this.dims = R(e), this.events = []
    }

    function L(e) {
        var t = e.display;
        !t.scrollbarsClipped && t.scroller.offsetWidth && (t.nativeBarWidth = t.scroller.offsetWidth - t.scroller.clientWidth, t.heightForcer.style.height = Ke(e) + "px", t.sizer.style.marginBottom = -t.nativeBarWidth + "px", t.sizer.style.borderRightWidth = Ke(e) + "px", t.scrollbarsClipped = !0)
    }

    function M(e, t) {
        var n = e.display,
                r = e.doc;
        if (t.editorIsHidden)
            return Dt(e), !1;
        if (!t.force && t.visible.from >= n.viewFrom && t.visible.to <= n.viewTo && (null == n.updateLineNumbers || n.updateLineNumbers >= n.viewTo) && n.renderedView == n.view && 0 == Bt(e))
            return !1;
        k(e) && (Dt(e), t.dims = R(e));
        var i = r.first + r.size,
                o = Math.max(t.visible.from - e.options.viewportMargin, r.first),
                a = Math.min(i, t.visible.to + e.options.viewportMargin);
        n.viewFrom < o && o - n.viewFrom < 20 && (o = Math.max(r.first, n.viewFrom)), n.viewTo > a && n.viewTo - a < 20 && (a = Math.min(i, n.viewTo)), Do && (o = br(e.doc, o), a = wr(e.doc, a));
        var s = o != n.viewFrom || a != n.viewTo || n.lastWrapHeight != t.wrapperHeight || n.lastWrapWidth != t.wrapperWidth;
        Ht(e, o, a), n.viewOffset = ri(Zr(e.doc, n.viewFrom)), e.display.mover.style.top = n.viewOffset + "px";
        var l = Bt(e);
        if (!s && 0 == l && !t.force && n.renderedView == n.view && (null == n.updateLineNumbers || n.updateLineNumbers >= n.viewTo))
            return !1;
        var c = ji();
        return l > 4 && (n.lineDiv.style.display = "none"), N(e, n.updateLineNumbers, t.dims), l > 4 && (n.lineDiv.style.display = ""), n.renderedView = n.view, c && ji() != c && c.offsetHeight && c.focus(), Ui(n.cursorDiv), Ui(n.selectionDiv), n.gutters.style.height = n.sizer.style.minHeight = 0, s && (n.lastWrapHeight = t.wrapperHeight, n.lastWrapWidth = t.wrapperWidth, We(e, 400)), n.updateLineNumbers = null, !0
    }

    function T(e, t) {
        for (var n = t.viewport, r = !0;
                (r && e.options.lineWrapping && t.oldDisplayWidth != Ve(e) || (n && null != n.top && (n = {
                    top: Math.min(e.doc.height + $e(e.display) - Ge(e), n.top)
                }), t.visible = b(e.display, e.doc, n), !(t.visible.from >= e.display.viewFrom && t.visible.to <= e.display.viewTo))) && M(e, t); r = !1) {
            O(e);
            var i = h(e);
            Ne(e), y(e, i), E(e, i)
        }
        t.signal(e, "update", e), e.display.viewFrom == e.display.reportedViewFrom && e.display.viewTo == e.display.reportedViewTo || (t.signal(e, "viewportChange", e, e.display.viewFrom, e.display.viewTo), e.display.reportedViewFrom = e.display.viewFrom, e.display.reportedViewTo = e.display.viewTo)
    }

    function A(e, t) {
        var n = new S(e, t);
        if (M(e, n)) {
            O(e), T(e, n);
            var r = h(e);
            Ne(e), y(e, r), E(e, r), n.finish()
        }
    }

    function E(e, t) {
        e.display.sizer.style.minHeight = t.docHeight + "px", e.display.heightForcer.style.top = t.docHeight + "px", e.display.gutters.style.height = t.docHeight + e.display.barHeight + Ke(e) + "px"
    }

    function O(e) {
        for (var t = e.display, n = t.lineDiv.offsetTop, r = 0; r < t.view.length; r++) {
            var i, o = t.view[r];
            if (!o.hidden) {
                if (_o && bo < 8) {
                    var a = o.node.offsetTop + o.node.offsetHeight;
                    i = a - n, n = a
                } else {
                    var s = o.node.getBoundingClientRect();
                    i = s.bottom - s.top
                }
                var l = o.line.height - i;
                if (i < 2 && (i = yt(t)), (l > .001 || l < -.001) && (ei(o.line, i), I(o.line), o.rest))
                    for (var c = 0; c < o.rest.length; c++)
                        I(o.rest[c])
            }
        }
    }

    function I(e) {
        if (e.widgets)
            for (var t = 0; t < e.widgets.length; ++t)
                e.widgets[t].height = e.widgets[t].node.parentNode.offsetHeight
    }

    function R(e) {
        for (var t = e.display, n = {}, r = {}, i = t.gutters.clientLeft, o = t.gutters.firstChild, a = 0; o; o = o.nextSibling, ++a)
            n[e.options.gutters[a]] = o.offsetLeft + o.clientLeft + i, r[e.options.gutters[a]] = o.clientWidth;
        return {
            fixedPos: C(t),
            gutterTotalWidth: t.gutters.offsetWidth,
            gutterLeft: n,
            gutterWidth: r,
            wrapperWidth: t.wrapper.clientWidth
        }
    }

    function N(e, t, n) {
        function r(t) {
            var n = t.nextSibling;
            return wo && Eo && e.display.currentWheelTarget == t ? t.style.display = "none" : t.parentNode.removeChild(t), n
        }
        for (var i = e.display, o = e.options.lineNumbers, a = i.lineDiv, s = a.firstChild, l = i.view, c = i.viewFrom, u = 0; u < l.length; u++) {
            var f = l[u];
            if (f.hidden)
                ;
            else if (f.node && f.node.parentNode == a) {
                for (; s != f.node; )
                    s = r(s);
                var d = o && null != t && t <= c && f.lineNumber;
                f.changes && (Ri(f.changes, "gutter") > -1 && (d = !1), P(e, f, c, n)), d && (Ui(f.lineNumber), f.lineNumber.appendChild(document.createTextNode(x(e.options, c)))), s = f.node.nextSibling
            } else {
                var p = U(e, f, c, n);
                a.insertBefore(p, s)
            }
            c += f.size
        }
        for (; s; )
            s = r(s)
    }

    function P(e, t, n, r) {
        for (var i = 0; i < t.changes.length; i++) {
            var o = t.changes[i];
            "text" == o ? W(e, t) : "gutter" == o ? B(e, t, n, r) : "class" == o ? H(t) : "widget" == o && q(e, t, r)
        }
        t.changes = null
    }

    function z(e) {
        return e.node == e.text && (e.node = qi("div", null, null, "position: relative"), e.text.parentNode && e.text.parentNode.replaceChild(e.node, e.text), e.node.appendChild(e.text), _o && bo < 8 && (e.node.style.zIndex = 2)), e.node
    }

    function D(e) {
        var t = e.bgClass ? e.bgClass + " " + (e.line.bgClass || "") : e.line.bgClass;
        if (t && (t += " CodeMirror-linebackground"), e.background)
            t ? e.background.className = t : (e.background.parentNode.removeChild(e.background), e.background = null);
        else if (t) {
            var n = z(e);
            e.background = n.insertBefore(qi("div", null, t), n.firstChild)
        }
    }

    function F(e, t) {
        var n = e.display.externalMeasured;
        return n && n.line == t.line ? (e.display.externalMeasured = null, t.measure = n.measure, n.built) : Fr(e, t)
    }

    function W(e, t) {
        var n = t.text.className,
                r = F(e, t);
        t.text == t.node && (t.node = r.pre), t.text.parentNode.replaceChild(r.pre, t.text), t.text = r.pre, r.bgClass != t.bgClass || r.textClass != t.textClass ? (t.bgClass = r.bgClass, t.textClass = r.textClass, H(t)) : n && (t.text.className = n)
    }

    function H(e) {
        D(e), e.line.wrapClass ? z(e).className = e.line.wrapClass : e.node != e.text && (e.node.className = "");
        var t = e.textClass ? e.textClass + " " + (e.line.textClass || "") : e.line.textClass;
        e.text.className = t || ""
    }

    function B(e, t, n, r) {
        if (t.gutter && (t.node.removeChild(t.gutter), t.gutter = null), t.gutterBackground && (t.node.removeChild(t.gutterBackground), t.gutterBackground = null), t.line.gutterClass) {
            var i = z(t);
            t.gutterBackground = qi("div", null, "CodeMirror-gutter-background " + t.line.gutterClass, "left: " + (e.options.fixedGutter ? r.fixedPos : -r.gutterTotalWidth) + "px; width: " + r.gutterTotalWidth + "px"), i.insertBefore(t.gutterBackground, t.text)
        }
        var o = t.line.gutterMarkers;
        if (e.options.lineNumbers || o) {
            var i = z(t),
                    a = t.gutter = qi("div", null, "CodeMirror-gutter-wrapper", "left: " + (e.options.fixedGutter ? r.fixedPos : -r.gutterTotalWidth) + "px");
            if (e.display.input.setUneditable(a), i.insertBefore(a, t.text), t.line.gutterClass && (a.className += " " + t.line.gutterClass), !e.options.lineNumbers || o && o["CodeMirror-linenumbers"] || (t.lineNumber = a.appendChild(qi("div", x(e.options, n), "CodeMirror-linenumber CodeMirror-gutter-elt", "left: " + r.gutterLeft["CodeMirror-linenumbers"] + "px; width: " + e.display.lineNumInnerWidth + "px"))), o)
                for (var s = 0; s < e.options.gutters.length; ++s) {
                    var l = e.options.gutters[s],
                            c = o.hasOwnProperty(l) && o[l];
                    c && a.appendChild(qi("div", [c], "CodeMirror-gutter-elt", "left: " + r.gutterLeft[l] + "px; width: " + r.gutterWidth[l] + "px"))
                }
        }
    }

    function q(e, t, n) {
        t.alignable && (t.alignable = null);
        for (var r, i = t.node.firstChild; i; i = r) {
            var r = i.nextSibling;
            "CodeMirror-linewidget" == i.className && t.node.removeChild(i)
        }
        $(e, t, n)
    }

    function U(e, t, n, r) {
        var i = F(e, t);
        return t.text = t.node = i.pre, i.bgClass && (t.bgClass = i.bgClass), i.textClass && (t.textClass = i.textClass), H(t), B(e, t, n, r), $(e, t, r), t.node
    }

    function $(e, t, n) {
        if (j(e, t.line, t, n, !0), t.rest)
            for (var r = 0; r < t.rest.length; r++)
                j(e, t.rest[r], t, n, !1)
    }

    function j(e, t, n, r, i) {
        if (t.widgets)
            for (var o = z(n), a = 0, s = t.widgets; a < s.length; ++a) {
                var l = s[a],
                        c = qi("div", [l.node], "CodeMirror-linewidget");
                l.handleMouseEvents || c.setAttribute("cm-ignore-events", "true"), K(l, c, n, r), e.display.input.setUneditable(c), i && l.above ? o.insertBefore(c, n.gutter || n.text) : o.appendChild(c), Ci(l, "redraw")
            }
    }

    function K(e, t, n, r) {
        if (e.noHScroll) {
            (n.alignable || (n.alignable = [])).push(t);
            var i = r.wrapperWidth;
            t.style.left = r.fixedPos + "px", e.coverGutter || (i -= r.gutterTotalWidth, t.style.paddingLeft = r.gutterTotalWidth + "px"), t.style.width = i + "px"
        }
        e.coverGutter && (t.style.zIndex = 5, t.style.position = "relative", e.noHScroll || (t.style.marginLeft = -r.gutterTotalWidth + "px"))
    }

    function V(e) {
        return Fo(e.line, e.ch)
    }

    function G(e, t) {
        return Wo(e, t) < 0 ? t : e
    }

    function X(e, t) {
        return Wo(e, t) < 0 ? e : t
    }

    function Y(e) {
        e.state.focused || (e.display.input.focus(), vn(e))
    }

    function Z(e, t, n, r, i) {
        var o = e.doc;
        e.display.shift = !1, r || (r = o.sel);
        var a = e.state.pasteIncoming || "paste" == i,
                s = o.splitLines(t),
                l = null;
        if (a && r.ranges.length > 1)
            if (Ho && Ho.join("\n") == t) {
                if (r.ranges.length % Ho.length == 0) {
                    l = [];
                    for (var c = 0; c < Ho.length; c++)
                        l.push(o.splitLines(Ho[c]))
                }
            } else
                s.length == r.ranges.length && (l = Ni(s, function (e) {
                    return [e]
                }));
        for (var c = r.ranges.length - 1; c >= 0; c--) {
            var u = r.ranges[c],
                    f = u.from(),
                    d = u.to();
            u.empty() && (n && n > 0 ? f = Fo(f.line, f.ch - n) : e.state.overwrite && !a && (d = Fo(d.line, Math.min(Zr(o, d.line).text.length, d.ch + Ii(s).length))));
            var p = e.curOp.updateInput,
                    h = {
                        from: f,
                        to: d,
                        text: l ? l[c % l.length] : s,
                        origin: i || (a ? "paste" : e.state.cutIncoming ? "cut" : "+input")
                    };
            Ln(e.doc, h), Ci(e, "inputRead", e, h)
        }
        t && !a && J(e, t), Fn(e), e.curOp.updateInput = p, e.curOp.typing = !0, e.state.pasteIncoming = e.state.cutIncoming = !1
    }

    function Q(e, t) {
        var n = e.clipboardData && e.clipboardData.getData("text/plain");
        if (n)
            return e.preventDefault(), t.isReadOnly() || t.options.disableInput || At(t, function () {
                Z(t, n, 0, null, "paste")
            }), !0
    }

    function J(e, t) {
        if (e.options.electricChars && e.options.smartIndent)
            for (var n = e.doc.sel, r = n.ranges.length - 1; r >= 0; r--) {
                var i = n.ranges[r];
                if (!(i.head.ch > 100 || r && n.ranges[r - 1].head.line == i.head.line)) {
                    var o = e.getModeAt(i.head),
                            a = !1;
                    if (o.electricChars) {
                        for (var s = 0; s < o.electricChars.length; s++)
                            if (t.indexOf(o.electricChars.charAt(s)) > -1) {
                                a = Hn(e, i.head.line, "smart");
                                break
                            }
                    } else
                        o.electricInput && o.electricInput.test(Zr(e.doc, i.head.line).text.slice(0, i.head.ch)) && (a = Hn(e, i.head.line, "smart"));
                    a && Ci(e, "electricInput", e, i.head.line)
                }
            }
    }

    function ee(e) {
        for (var t = [], n = [], r = 0; r < e.doc.sel.ranges.length; r++) {
            var i = e.doc.sel.ranges[r].head.line,
                    o = {
                        anchor: Fo(i, 0),
                        head: Fo(i + 1, 0)
                    };
            n.push(o), t.push(e.getRange(o.anchor, o.head))
        }
        return {
            text: t,
            ranges: n
        }
    }

    function te(e) {
        e.setAttribute("autocorrect", "off"), e.setAttribute("autocapitalize", "off"), e.setAttribute("spellcheck", "false")
    }

    function ne(e) {
        this.cm = e, this.prevInput = "", this.pollingFast = !1, this.polling = new Ei, this.inaccurateSelection = !1, this.hasSelection = !1, this.composing = null
    }

    function re() {
        var e = qi("textarea", null, null, "position: absolute; padding: 0; width: 1px; height: 1em; outline: none"),
                t = qi("div", [e], null, "overflow: hidden; position: relative; width: 3px; height: 0px;");
        return wo ? e.style.width = "1000px" : e.setAttribute("wrap", "off"), To && (e.style.border = "1px solid black"), te(e), t
    }

    function ie(e) {
        this.cm = e, this.lastAnchorNode = this.lastAnchorOffset = this.lastFocusNode = this.lastFocusOffset = null, this.polling = new Ei, this.gracePeriod = !1
    }

    function oe(e, t) {
        var n = Je(e, t.line);
        if (!n || n.hidden)
            return null;
        var r = Zr(e.doc, t.line),
                i = Ye(n, r, t.line),
                o = ii(r),
                a = "left";
        if (o) {
            var s = co(o, t.ch);
            a = s % 2 ? "right" : "left"
        }
        var l = nt(i.map, t.ch, a);
        return l.offset = "right" == l.collapse ? l.end : l.start, l
    }

    function ae(e, t) {
        return t && (e.bad = !0), e
    }

    function se(e, t, n) {
        var r;
        if (t == e.display.lineDiv) {
            if (r = e.display.lineDiv.childNodes[n], !r)
                return ae(e.clipPos(Fo(e.display.viewTo - 1)), !0);
            t = null, n = 0
        } else
            for (r = t; ; r = r.parentNode) {
                if (!r || r == e.display.lineDiv)
                    return null;
                if (r.parentNode && r.parentNode == e.display.lineDiv)
                    break
            }
        for (var i = 0; i < e.display.view.length; i++) {
            var o = e.display.view[i];
            if (o.node == r)
                return le(o, t, n)
        }
    }

    function le(e, t, n) {
        function r(t, n, r) {
            for (var i = -1; i < (u ? u.length : 0); i++)
                for (var o = i < 0 ? c.map : u[i], a = 0; a < o.length; a += 3) {
                    var s = o[a + 2];
                    if (s == t || s == n) {
                        var l = ti(i < 0 ? e.line : e.rest[i]),
                                f = o[a] + r;
                        return (r < 0 || s != t) && (f = o[a + (r ? 1 : 0)]), Fo(l, f)
                    }
                }
        }
        var i = e.text.firstChild,
                o = !1;
        if (!t || !Ga(i, t))
            return ae(Fo(ti(e.line), 0), !0);
        if (t == i && (o = !0, t = i.childNodes[n], n = 0, !t)) {
            var a = e.rest ? Ii(e.rest) : e.line;
            return ae(Fo(ti(a), a.text.length), o)
        }
        var s = 3 == t.nodeType ? t : null,
                l = t;
        for (s || 1 != t.childNodes.length || 3 != t.firstChild.nodeType || (s = t.firstChild, n && (n = s.nodeValue.length)); l.parentNode != i; )
            l = l.parentNode;
        var c = e.measure,
                u = c.maps,
                f = r(s, l, n);
        if (f)
            return ae(f, o);
        for (var d = l.nextSibling, p = s ? s.nodeValue.length - n : 0; d; d = d.nextSibling) {
            if (f = r(d, d.firstChild, 0))
                return ae(Fo(f.line, f.ch - p), o);
            p += d.textContent.length
        }
        for (var h = l.previousSibling, p = n; h; h = h.previousSibling) {
            if (f = r(h, h.firstChild, -1))
                return ae(Fo(f.line, f.ch + p), o);
            p += d.textContent.length
        }
    }

    function ce(e, t, n, r, i) {
        function o(e) {
            return function (t) {
                return t.id == e
            }
        }

        function a(t) {
            if (1 == t.nodeType) {
                var n = t.getAttribute("cm-text");
                if (null != n)
                    return "" == n && (n = t.textContent.replace(/\u200b/g, "")), void(s += n);
                var u, f = t.getAttribute("cm-marker");
                if (f) {
                    var d = e.findMarks(Fo(r, 0), Fo(i + 1, 0), o(+f));
                    return void(d.length && (u = d[0].find()) && (s += Qr(e.doc, u.from, u.to).join(c)))
                }
                if ("false" == t.getAttribute("contenteditable"))
                    return;
                for (var p = 0; p < t.childNodes.length; p++)
                    a(t.childNodes[p]);
                /^(pre|div|p)$/i.test(t.nodeName) && (l = !0)
            } else if (3 == t.nodeType) {
                var h = t.nodeValue;
                if (!h)
                    return;
                l && (s += c, l = !1), s += h
            }
        }
        for (var s = "", l = !1, c = e.doc.lineSeparator(); a(t), t != n; )
            t = t.nextSibling;
        return s
    }

    function ue(e, t) {
        this.ranges = e, this.primIndex = t
    }

    function fe(e, t) {
        this.anchor = e, this.head = t
    }

    function de(e, t) {
        var n = e[t];
        e.sort(function (e, t) {
            return Wo(e.from(), t.from())
        }), t = Ri(e, n);
        for (var r = 1; r < e.length; r++) {
            var i = e[r],
                    o = e[r - 1];
            if (Wo(o.to(), i.from()) >= 0) {
                var a = X(o.from(), i.from()),
                        s = G(o.to(), i.to()),
                        l = o.empty() ? i.from() == i.head : o.from() == o.head;
                r <= t && --t, e.splice(--r, 2, new fe(l ? s : a, l ? a : s))
            }
        }
        return new ue(e, t)
    }

    function pe(e, t) {
        return new ue([new fe(e, t || e)], 0)
    }

    function he(e, t) {
        return Math.max(e.first, Math.min(t, e.first + e.size - 1))
    }

    function me(e, t) {
        if (t.line < e.first)
            return Fo(e.first, 0);
        var n = e.first + e.size - 1;
        return t.line > n ? Fo(n, Zr(e, n).text.length) : ge(t, Zr(e, t.line).text.length)
    }

    function ge(e, t) {
        var n = e.ch;
        return null == n || n > t ? Fo(e.line, t) : n < 0 ? Fo(e.line, 0) : e
    }

    function ve(e, t) {
        return t >= e.first && t < e.first + e.size
    }

    function ye(e, t) {
        for (var n = [], r = 0; r < t.length; r++)
            n[r] = me(e, t[r]);
        return n
    }

    function _e(e, t, n, r) {
        if (e.cm && e.cm.display.shift || e.extend) {
            var i = t.anchor;
            if (r) {
                var o = Wo(n, i) < 0;
                o != Wo(r, i) < 0 ? (i = n, n = r) : o != Wo(n, r) < 0 && (n = r)
            }
            return new fe(i, n)
        }
        return new fe(r || n, n)
    }

    function be(e, t, n, r) {
        Le(e, new ue([_e(e, e.sel.primary(), t, n)], 0), r)
    }

    function we(e, t, n) {
        for (var r = [], i = 0; i < e.sel.ranges.length; i++)
            r[i] = _e(e, e.sel.ranges[i], t[i], null);
        var o = de(r, e.sel.primIndex);
        Le(e, o, n)
    }

    function ke(e, t, n, r) {
        var i = e.sel.ranges.slice(0);
        i[t] = n, Le(e, de(i, e.sel.primIndex), r)
    }

    function xe(e, t, n, r) {
        Le(e, pe(t, n), r)
    }

    function Ce(e, t, n) {
        var r = {
            ranges: t.ranges,
            update: function (t) {
                this.ranges = [];
                for (var n = 0; n < t.length; n++)
                    this.ranges[n] = new fe(me(e, t[n].anchor), me(e, t[n].head))
            },
            origin: n && n.origin
        };
        return Ra(e, "beforeSelectionChange", e, r), e.cm && Ra(e.cm, "beforeSelectionChange", e.cm, r), r.ranges != t.ranges ? de(r.ranges, r.ranges.length - 1) : t
    }

    function Se(e, t, n) {
        var r = e.history.done,
                i = Ii(r);
        i && i.ranges ? (r[r.length - 1] = t, Me(e, t, n)) : Le(e, t, n)
    }

    function Le(e, t, n) {
        Me(e, t, n), fi(e, e.sel, e.cm ? e.cm.curOp.id : NaN, n)
    }

    function Me(e, t, n) {
        (Ti(e, "beforeSelectionChange") || e.cm && Ti(e.cm, "beforeSelectionChange")) && (t = Ce(e, t, n));
        var r = n && n.bias || (Wo(t.primary().head, e.sel.primary().head) < 0 ? -1 : 1);
        Te(e, Ee(e, t, r, !0)), n && n.scroll === !1 || !e.cm || Fn(e.cm)
    }

    function Te(e, t) {
        t.equals(e.sel) || (e.sel = t, e.cm && (e.cm.curOp.updateInput = e.cm.curOp.selectionChanged = !0, Mi(e.cm)), Ci(e, "cursorActivity", e))
    }

    function Ae(e) {
        Te(e, Ee(e, e.sel, null, !1), Da)
    }

    function Ee(e, t, n, r) {
        for (var i, o = 0; o < t.ranges.length; o++) {
            var a = t.ranges[o],
                    s = t.ranges.length == e.sel.ranges.length && e.sel.ranges[o],
                    l = Ie(e, a.anchor, s && s.anchor, n, r),
                    c = Ie(e, a.head, s && s.head, n, r);
            (i || l != a.anchor || c != a.head) && (i || (i = t.ranges.slice(0, o)), i[o] = new fe(l, c))
        }
        return i ? de(i, t.primIndex) : t
    }

    function Oe(e, t, n, r, i) {
        var o = Zr(e, t.line);
        if (o.markedSpans)
            for (var a = 0; a < o.markedSpans.length; ++a) {
                var s = o.markedSpans[a],
                        l = s.marker;
                if ((null == s.from || (l.inclusiveLeft ? s.from <= t.ch : s.from < t.ch)) && (null == s.to || (l.inclusiveRight ? s.to >= t.ch : s.to > t.ch))) {
                    if (i && (Ra(l, "beforeCursorEnter"), l.explicitlyCleared)) {
                        if (o.markedSpans) {
                            --a;
                            continue
                        }
                        break
                    }
                    if (!l.atomic)
                        continue;
                    if (n) {
                        var c, u = l.find(r < 0 ? 1 : -1);
                        if ((r < 0 ? l.inclusiveRight : l.inclusiveLeft) && (u = Re(e, u, -r, u && u.line == t.line ? o : null)), u && u.line == t.line && (c = Wo(u, n)) && (r < 0 ? c < 0 : c > 0))
                            return Oe(e, u, t, r, i)
                    }
                    var f = l.find(r < 0 ? -1 : 1);
                    return (r < 0 ? l.inclusiveLeft : l.inclusiveRight) && (f = Re(e, f, r, f.line == t.line ? o : null)), f ? Oe(e, f, t, r, i) : null
                }
            }
        return t
    }

    function Ie(e, t, n, r, i) {
        var o = r || 1,
                a = Oe(e, t, n, o, i) || !i && Oe(e, t, n, o, !0) || Oe(e, t, n, -o, i) || !i && Oe(e, t, n, -o, !0);
        return a ? a : (e.cantEdit = !0, Fo(e.first, 0))
    }

    function Re(e, t, n, r) {
        return n < 0 && 0 == t.ch ? t.line > e.first ? me(e, Fo(t.line - 1)) : null : n > 0 && t.ch == (r || Zr(e, t.line)).text.length ? t.line < e.first + e.size - 1 ? Fo(t.line + 1, 0) : null : new Fo(t.line, t.ch + n)
    }

    function Ne(e) {
        e.display.input.showSelection(e.display.input.prepareSelection())
    }

    function Pe(e, t) {
        for (var n = e.doc, r = {}, i = r.cursors = document.createDocumentFragment(), o = r.selection = document.createDocumentFragment(), a = 0; a < n.sel.ranges.length; a++)
            if (t !== !1 || a != n.sel.primIndex) {
                var s = n.sel.ranges[a];
                if (!(s.from().line >= e.display.viewTo || s.to().line < e.display.viewFrom)) {
                    var l = s.empty();
                    (l || e.options.showCursorWhenSelecting) && ze(e, s.head, i), l || De(e, s, o)
                }
            }
        return r
    }

    function ze(e, t, n) {
        var r = pt(e, t, "div", null, null, !e.options.singleCursorHeightPerLine),
                i = n.appendChild(qi("div", " ", "CodeMirror-cursor"));
        if (i.style.left = r.left + "px", i.style.top = r.top + "px", i.style.height = Math.max(0, r.bottom - r.top) * e.options.cursorHeight + "px", r.other) {
            var o = n.appendChild(qi("div", " ", "CodeMirror-cursor CodeMirror-secondarycursor"));
            o.style.display = "", o.style.left = r.other.left + "px", o.style.top = r.other.top + "px", o.style.height = .85 * (r.other.bottom - r.other.top) + "px"
        }
    }

    function De(e, t, n) {
        function r(e, t, n, r) {
            t < 0 && (t = 0), t = Math.round(t), r = Math.round(r), s.appendChild(qi("div", null, "CodeMirror-selected", "position: absolute; left: " + e + "px; top: " + t + "px; width: " + (null == n ? u - e : n) + "px; height: " + (r - t) + "px"))
        }

        function i(t, n, i) {
            function o(n, r) {
                return dt(e, Fo(t, n), "div", f, r)
            }
            var s, l, f = Zr(a, t),
                    d = f.text.length;
            return eo(ii(f), n || 0, null == i ? d : i, function (e, t, a) {
                var f, p, h, m = o(e, "left");
                if (e == t)
                    f = m, p = h = m.left;
                else {
                    if (f = o(t - 1, "right"), "rtl" == a) {
                        var g = m;
                        m = f, f = g
                    }
                    p = m.left, h = f.right
                }
                null == n && 0 == e && (p = c), f.top - m.top > 3 && (r(p, m.top, null, m.bottom), p = c, m.bottom < f.top && r(p, m.bottom, null, f.top)), null == i && t == d && (h = u), (!s || m.top < s.top || m.top == s.top && m.left < s.left) && (s = m), (!l || f.bottom > l.bottom || f.bottom == l.bottom && f.right > l.right) && (l = f), p < c + 1 && (p = c), r(p, f.top, h - p, f.bottom)
            }), {
                start: s,
                end: l
            }
        }
        var o = e.display,
                a = e.doc,
                s = document.createDocumentFragment(),
                l = je(e.display),
                c = l.left,
                u = Math.max(o.sizerWidth, Ve(e) - o.sizer.offsetLeft) - l.right,
                f = t.from(),
                d = t.to();
        if (f.line == d.line)
            i(f.line, f.ch, d.ch);
        else {
            var p = Zr(a, f.line),
                    h = Zr(a, d.line),
                    m = yr(p) == yr(h),
                    g = i(f.line, f.ch, m ? p.text.length + 1 : null).end,
                    v = i(d.line, m ? 0 : null, d.ch).start;
            m && (g.top < v.top - 2 ? (r(g.right, g.top, null, g.bottom), r(c, v.top, v.left, v.bottom)) : r(g.right, g.top, v.left - g.right, g.bottom)), g.bottom < v.top && r(c, g.bottom, null, v.top)
        }
        n.appendChild(s)
    }

    function Fe(e) {
        if (e.state.focused) {
            var t = e.display;
            clearInterval(t.blinker);
            var n = !0;
            t.cursorDiv.style.visibility = "", e.options.cursorBlinkRate > 0 ? t.blinker = setInterval(function () {
                t.cursorDiv.style.visibility = (n = !n) ? "" : "hidden"
            }, e.options.cursorBlinkRate) : e.options.cursorBlinkRate < 0 && (t.cursorDiv.style.visibility = "hidden")
        }
    }

    function We(e, t) {
        e.doc.mode.startState && e.doc.frontier < e.display.viewTo && e.state.highlight.set(t, Fi(He, e))
    }

    function He(e) {
        var t = e.doc;
        if (t.frontier < t.first && (t.frontier = t.first), !(t.frontier >= e.display.viewTo)) {
            var n = +new Date + e.options.workTime,
                    r = la(t.mode, qe(e, t.frontier)),
                    i = [];
            t.iter(t.frontier, Math.min(t.first + t.size, e.display.viewTo + 500), function (o) {
                if (t.frontier >= e.display.viewFrom) {
                    var a = o.styles,
                            s = o.text.length > e.options.maxHighlightLength,
                            l = Nr(e, o, s ? la(t.mode, r) : r, !0);
                    o.styles = l.styles;
                    var c = o.styleClasses,
                            u = l.classes;
                    u ? o.styleClasses = u : c && (o.styleClasses = null);
                    for (var f = !a || a.length != o.styles.length || c != u && (!c || !u || c.bgClass != u.bgClass || c.textClass != u.textClass), d = 0; !f && d < a.length; ++d)
                        f = a[d] != o.styles[d];
                    f && i.push(t.frontier), o.stateAfter = s ? r : la(t.mode, r)
                } else
                    o.text.length <= e.options.maxHighlightLength && zr(e, o.text, r), o.stateAfter = t.frontier % 5 == 0 ? la(t.mode, r) : null;
                if (++t.frontier, +new Date > n)
                    return We(e, e.options.workDelay), !0
            }), i.length && At(e, function () {
                for (var t = 0; t < i.length; t++)
                    zt(e, i[t], "text")
            })
        }
    }

    function Be(e, t, n) {
        for (var r, i, o = e.doc, a = n ? -1 : t - (e.doc.mode.innerMode ? 1e3 : 100), s = t; s > a; --s) {
            if (s <= o.first)
                return o.first;
            var l = Zr(o, s - 1);
            if (l.stateAfter && (!n || s <= o.frontier))
                return s;
            var c = Ha(l.text, null, e.options.tabSize);
            (null == i || r > c) && (i = s - 1, r = c)
        }
        return i
    }

    function qe(e, t, n) {
        var r = e.doc,
                i = e.display;
        if (!r.mode.startState)
            return !0;
        var o = Be(e, t, n),
                a = o > r.first && Zr(r, o - 1).stateAfter;
        return a = a ? la(r.mode, a) : ca(r.mode), r.iter(o, t, function (n) {
            zr(e, n.text, a);
            var s = o == t - 1 || o % 5 == 0 || o >= i.viewFrom && o < i.viewTo;
            n.stateAfter = s ? la(r.mode, a) : null, ++o
        }), n && (r.frontier = o), a
    }

    function Ue(e) {
        return e.lineSpace.offsetTop
    }

    function $e(e) {
        return e.mover.offsetHeight - e.lineSpace.offsetHeight
    }

    function je(e) {
        if (e.cachedPaddingH)
            return e.cachedPaddingH;
        var t = $i(e.measure, qi("pre", "x")),
                n = window.getComputedStyle ? window.getComputedStyle(t) : t.currentStyle,
                r = {
                    left: parseInt(n.paddingLeft),
                    right: parseInt(n.paddingRight)
                };
        return isNaN(r.left) || isNaN(r.right) || (e.cachedPaddingH = r), r
    }

    function Ke(e) {
        return Pa - e.display.nativeBarWidth
    }

    function Ve(e) {
        return e.display.scroller.clientWidth - Ke(e) - e.display.barWidth
    }

    function Ge(e) {
        return e.display.scroller.clientHeight - Ke(e) - e.display.barHeight
    }

    function Xe(e, t, n) {
        var r = e.options.lineWrapping,
                i = r && Ve(e);
        if (!t.measure.heights || r && t.measure.width != i) {
            var o = t.measure.heights = [];
            if (r) {
                t.measure.width = i;
                for (var a = t.text.firstChild.getClientRects(), s = 0; s < a.length - 1; s++) {
                    var l = a[s],
                            c = a[s + 1];
                    Math.abs(l.bottom - c.bottom) > 2 && o.push((l.bottom + c.top) / 2 - n.top)
                }
            }
            o.push(n.bottom - n.top)
        }
    }

    function Ye(e, t, n) {
        if (e.line == t)
            return {
                map: e.measure.map,
                cache: e.measure.cache
            };
        for (var r = 0; r < e.rest.length; r++)
            if (e.rest[r] == t)
                return {
                    map: e.measure.maps[r],
                    cache: e.measure.caches[r]
                };
        for (var r = 0; r < e.rest.length; r++)
            if (ti(e.rest[r]) > n)
                return {
                    map: e.measure.maps[r],
                    cache: e.measure.caches[r],
                    before: !0
                }
    }

    function Ze(e, t) {
        t = yr(t);
        var n = ti(t),
                r = e.display.externalMeasured = new Rt(e.doc, t, n);
        r.lineN = n;
        var i = r.built = Fr(e, r);
        return r.text = i.pre, $i(e.display.lineMeasure, i.pre), r
    }

    function Qe(e, t, n, r) {
        return tt(e, et(e, t), n, r)
    }

    function Je(e, t) {
        if (t >= e.display.viewFrom && t < e.display.viewTo)
            return e.display.view[Ft(e, t)];
        var n = e.display.externalMeasured;
        return n && t >= n.lineN && t < n.lineN + n.size ? n : void 0
    }

    function et(e, t) {
        var n = ti(t),
                r = Je(e, n);
        r && !r.text ? r = null : r && r.changes && (P(e, r, n, R(e)), e.curOp.forceUpdate = !0), r || (r = Ze(e, t));
        var i = Ye(r, t, n);
        return {
            line: t,
            view: r,
            rect: null,
            map: i.map,
            cache: i.cache,
            before: i.before,
            hasHeights: !1
        }
    }

    function tt(e, t, n, r, i) {
        t.before && (n = -1);
        var o, a = n + (r || "");
        return t.cache.hasOwnProperty(a) ? o = t.cache[a] : (t.rect || (t.rect = t.view.text.getBoundingClientRect()), t.hasHeights || (Xe(e, t.view, t.rect), t.hasHeights = !0), o = rt(e, t, n, r), o.bogus || (t.cache[a] = o)), {
            left: o.left,
            right: o.right,
            top: i ? o.rtop : o.top,
            bottom: i ? o.rbottom : o.bottom
        }
    }

    function nt(e, t, n) {
        for (var r, i, o, a, s = 0; s < e.length; s += 3) {
            var l = e[s],
                    c = e[s + 1];
            if (t < l ? (i = 0, o = 1, a = "left") : t < c ? (i = t - l, o = i + 1) : (s == e.length - 3 || t == c && e[s + 3] > t) && (o = c - l, i = o - 1, t >= c && (a = "right")), null != i) {
                if (r = e[s + 2], l == c && n == (r.insertLeft ? "left" : "right") && (a = n), "left" == n && 0 == i)
                    for (; s && e[s - 2] == e[s - 3] && e[s - 1].insertLeft; )
                        r = e[(s -= 3) + 2], a = "left";
                if ("right" == n && i == c - l)
                    for (; s < e.length - 3 && e[s + 3] == e[s + 4] && !e[s + 5].insertLeft; )
                        r = e[(s += 3) + 2], a = "right";
                break
            }
        }
        return {
            node: r,
            start: i,
            end: o,
            collapse: a,
            coverStart: l,
            coverEnd: c
        }
    }

    function rt(e, t, n, r) {
        var i, o = nt(t.map, n, r),
                a = o.node,
                s = o.start,
                l = o.end,
                c = o.collapse;
        if (3 == a.nodeType) {
            for (var u = 0; u < 4; u++) {
                for (; s && Bi(t.line.text.charAt(o.coverStart + s)); )
                    --s;
                for (; o.coverStart + l < o.coverEnd && Bi(t.line.text.charAt(o.coverStart + l)); )
                    ++l;
                if (_o && bo < 9 && 0 == s && l == o.coverEnd - o.coverStart)
                    i = a.parentNode.getBoundingClientRect();
                else if (_o && e.options.lineWrapping) {
                    var f = $a(a, s, l).getClientRects();
                    i = f.length ? f["right" == r ? f.length - 1 : 0] : $o
                } else
                    i = $a(a, s, l).getBoundingClientRect() || $o;
                if (i.left || i.right || 0 == s)
                    break;
                l = s, s -= 1, c = "right"
            }
            _o && bo < 11 && (i = it(e.display.measure, i))
        } else {
            s > 0 && (c = r = "right");
            var f;
            i = e.options.lineWrapping && (f = a.getClientRects()).length > 1 ? f["right" == r ? f.length - 1 : 0] : a.getBoundingClientRect()
        }
        if (_o && bo < 9 && !s && (!i || !i.left && !i.right)) {
            var d = a.parentNode.getClientRects()[0];
            i = d ? {
                left: d.left,
                right: d.left + _t(e.display),
                top: d.top,
                bottom: d.bottom
            } : $o
        }
        for (var p = i.top - t.rect.top, h = i.bottom - t.rect.top, m = (p + h) / 2, g = t.view.measure.heights, u = 0; u < g.length - 1 && !(m < g[u]); u++)
            ;
        var v = u ? g[u - 1] : 0,
                y = g[u],
                _ = {
                    left: ("right" == c ? i.right : i.left) - t.rect.left,
                    right: ("left" == c ? i.left : i.right) - t.rect.left,
                    top: v,
                    bottom: y
                };
        return i.left || i.right || (_.bogus = !0), e.options.singleCursorHeightPerLine || (_.rtop = p, _.rbottom = h), _
    }

    function it(e, t) {
        if (!window.screen || null == screen.logicalXDPI || screen.logicalXDPI == screen.deviceXDPI || !Ji(e))
            return t;
        var n = screen.logicalXDPI / screen.deviceXDPI,
                r = screen.logicalYDPI / screen.deviceYDPI;
        return {
            left: t.left * n,
            right: t.right * n,
            top: t.top * r,
            bottom: t.bottom * r
        }
    }

    function ot(e) {
        if (e.measure && (e.measure.cache = {}, e.measure.heights = null, e.rest))
            for (var t = 0; t < e.rest.length; t++)
                e.measure.caches[t] = {}
    }

    function at(e) {
        e.display.externalMeasure = null, Ui(e.display.lineMeasure);
        for (var t = 0; t < e.display.view.length; t++)
            ot(e.display.view[t])
    }

    function st(e) {
        at(e), e.display.cachedCharWidth = e.display.cachedTextHeight = e.display.cachedPaddingH = null, e.options.lineWrapping || (e.display.maxLineChanged = !0), e.display.lineNumChars = null
    }

    function lt() {
        return window.pageXOffset || (document.documentElement || document.body).scrollLeft
    }

    function ct() {
        return window.pageYOffset || (document.documentElement || document.body).scrollTop
    }

    function ut(e, t, n, r) {
        if (t.widgets)
            for (var i = 0; i < t.widgets.length; ++i)
                if (t.widgets[i].above) {
                    var o = Sr(t.widgets[i]);
                    n.top += o, n.bottom += o
                }
        if ("line" == r)
            return n;
        r || (r = "local");
        var a = ri(t);
        if ("local" == r ? a += Ue(e.display) : a -= e.display.viewOffset, "page" == r || "window" == r) {
            var s = e.display.lineSpace.getBoundingClientRect();
            a += s.top + ("window" == r ? 0 : ct());
            var l = s.left + ("window" == r ? 0 : lt());
            n.left += l, n.right += l
        }
        return n.top += a, n.bottom += a, n
    }

    function ft(e, t, n) {
        if ("div" == n)
            return t;
        var r = t.left,
                i = t.top;
        if ("page" == n)
            r -= lt(), i -= ct();
        else if ("local" == n || !n) {
            var o = e.display.sizer.getBoundingClientRect();
            r += o.left, i += o.top
        }
        var a = e.display.lineSpace.getBoundingClientRect();
        return {
            left: r - a.left,
            top: i - a.top
        }
    }

    function dt(e, t, n, r, i) {
        return r || (r = Zr(e.doc, t.line)), ut(e, r, Qe(e, r, t.ch, i), n)
    }

    function pt(e, t, n, r, i, o) {
        function a(t, a) {
            var s = tt(e, i, t, a ? "right" : "left", o);
            return a ? s.left = s.right : s.right = s.left, ut(e, r, s, n)
        }

        function s(e, t) {
            var n = l[t],
                    r = n.level % 2;
            return e == to(n) && t && n.level < l[t - 1].level ? (n = l[--t], e = no(n) - (n.level % 2 ? 0 : 1), r = !0) : e == no(n) && t < l.length - 1 && n.level < l[t + 1].level && (n = l[++t], e = to(n) - n.level % 2, r = !1), r && e == n.to && e > n.from ? a(e - 1) : a(e, r)
        }
        r = r || Zr(e.doc, t.line), i || (i = et(e, r));
        var l = ii(r),
                c = t.ch;
        if (!l)
            return a(c);
        var u = co(l, c),
                f = s(c, u);
        return null != as && (f.other = s(c, as)), f
    }

    function ht(e, t) {
        var n = 0,
                t = me(e.doc, t);
        e.options.lineWrapping || (n = _t(e.display) * t.ch);
        var r = Zr(e.doc, t.line),
                i = ri(r) + Ue(e.display);
        return {
            left: n,
            right: n,
            top: i,
            bottom: i + r.height
        }
    }

    function mt(e, t, n, r) {
        var i = Fo(e, t);
        return i.xRel = r, n && (i.outside = !0), i
    }

    function gt(e, t, n) {
        var r = e.doc;
        if (n += e.display.viewOffset, n < 0)
            return mt(r.first, 0, !0, -1);
        var i = ni(r, n),
                o = r.first + r.size - 1;
        if (i > o)
            return mt(r.first + r.size - 1, Zr(r, o).text.length, !0, 1);
        t < 0 && (t = 0);
        for (var a = Zr(r, i); ; ) {
            var s = vt(e, a, i, t, n),
                    l = gr(a),
                    c = l && l.find(0, !0);
            if (!l || !(s.ch > c.from.ch || s.ch == c.from.ch && s.xRel > 0))
                return s;
            i = ti(a = c.to.line)
        }
    }

    function vt(e, t, n, r, i) {
        function o(r) {
            var i = pt(e, Fo(n, r), "line", t, c);
            return s = !0, a > i.bottom ? i.left - l : a < i.top ? i.left + l : (s = !1, i.left)
        }
        var a = i - ri(t),
                s = !1,
                l = 2 * e.display.wrapper.clientWidth,
                c = et(e, t),
                u = ii(t),
                f = t.text.length,
                d = ro(t),
                p = io(t),
                h = o(d),
                m = s,
                g = o(p),
                v = s;
        if (r > g)
            return mt(n, p, v, 1);
        for (; ; ) {
            if (u ? p == d || p == fo(t, d, 1) : p - d <= 1) {
                for (var y = r < h || r - h <= g - r ? d : p, _ = r - (y == d ? h : g); Bi(t.text.charAt(y)); )
                    ++y;
                var b = mt(n, y, y == d ? m : v, _ < -1 ? -1 : _ > 1 ? 1 : 0);
                return b
            }
            var w = Math.ceil(f / 2),
                    k = d + w;
            if (u) {
                k = d;
                for (var x = 0; x < w; ++x)
                    k = fo(t, k, 1)
            }
            var C = o(k);
            C > r ? (p = k, g = C, (v = s) && (g += 1e3), f = w) : (d = k, h = C, m = s, f -= w)
        }
    }

    function yt(e) {
        if (null != e.cachedTextHeight)
            return e.cachedTextHeight;
        if (null == Bo) {
            Bo = qi("pre");
            for (var t = 0; t < 49; ++t)
                Bo.appendChild(document.createTextNode("x")), Bo.appendChild(qi("br"));
            Bo.appendChild(document.createTextNode("x"))
        }
        $i(e.measure, Bo);
        var n = Bo.offsetHeight / 50;
        return n > 3 && (e.cachedTextHeight = n), Ui(e.measure), n || 1
    }

    function _t(e) {
        if (null != e.cachedCharWidth)
            return e.cachedCharWidth;
        var t = qi("span", "xxxxxxxxxx"),
                n = qi("pre", [t]);
        $i(e.measure, n);
        var r = t.getBoundingClientRect(),
                i = (r.right - r.left) / 10;
        return i > 2 && (e.cachedCharWidth = i), i || 10
    }

    function bt(e) {
        e.curOp = {
            cm: e,
            viewChanged: !1,
            startHeight: e.doc.height,
            forceUpdate: !1,
            updateInput: null,
            typing: !1,
            changeObjs: null,
            cursorActivityHandlers: null,
            cursorActivityCalled: 0,
            selectionChanged: !1,
            updateMaxLine: !1,
            scrollLeft: null,
            scrollTop: null,
            scrollToPos: null,
            focus: !1,
            id: ++Ko
        }, jo ? jo.ops.push(e.curOp) : e.curOp.ownsGroup = jo = {
            ops: [e.curOp],
            delayedCallbacks: []
        }
    }

    function wt(e) {
        var t = e.delayedCallbacks,
                n = 0;
        do {
            for (; n < t.length; n++)
                t[n].call(null);
            for (var r = 0; r < e.ops.length; r++) {
                var i = e.ops[r];
                if (i.cursorActivityHandlers)
                    for (; i.cursorActivityCalled < i.cursorActivityHandlers.length; )
                        i.cursorActivityHandlers[i.cursorActivityCalled++].call(null, i.cm)
            }
        } while (n < t.length)
    }

    function kt(e) {
        var t = e.curOp,
                n = t.ownsGroup;
        if (n)
            try {
                wt(n)
            } finally {
                jo = null;
                for (var r = 0; r < n.ops.length; r++)
                    n.ops[r].cm.curOp = null;
                xt(n)
            }
    }

    function xt(e) {
        for (var t = e.ops, n = 0; n < t.length; n++)
            Ct(t[n]);
        for (var n = 0; n < t.length; n++)
            St(t[n]);
        for (var n = 0; n < t.length; n++)
            Lt(t[n]);
        for (var n = 0; n < t.length; n++)
            Mt(t[n]);
        for (var n = 0; n < t.length; n++)
            Tt(t[n])
    }

    function Ct(e) {
        var t = e.cm,
                n = t.display;
        L(t), e.updateMaxLine && d(t), e.mustUpdate = e.viewChanged || e.forceUpdate || null != e.scrollTop || e.scrollToPos && (e.scrollToPos.from.line < n.viewFrom || e.scrollToPos.to.line >= n.viewTo) || n.maxLineChanged && t.options.lineWrapping, e.update = e.mustUpdate && new S(t, e.mustUpdate && {
            top: e.scrollTop,
            ensure: e.scrollToPos
        }, e.forceUpdate)
    }

    function St(e) {
        e.updatedDisplay = e.mustUpdate && M(e.cm, e.update)
    }

    function Lt(e) {
        var t = e.cm,
                n = t.display;
        e.updatedDisplay && O(t), e.barMeasure = h(t), n.maxLineChanged && !t.options.lineWrapping && (e.adjustWidthTo = Qe(t, n.maxLine, n.maxLine.text.length).left + 3, t.display.sizerWidth = e.adjustWidthTo, e.barMeasure.scrollWidth = Math.max(n.scroller.clientWidth, n.sizer.offsetLeft + e.adjustWidthTo + Ke(t) + t.display.barWidth), e.maxScrollLeft = Math.max(0, n.sizer.offsetLeft + e.adjustWidthTo - Ve(t))), (e.updatedDisplay || e.selectionChanged) && (e.preparedSelection = n.input.prepareSelection())
    }

    function Mt(e) {
        var t = e.cm;
        null != e.adjustWidthTo && (t.display.sizer.style.minWidth = e.adjustWidthTo + "px", e.maxScrollLeft < t.doc.scrollLeft && on(t, Math.min(t.display.scroller.scrollLeft, e.maxScrollLeft), !0), t.display.maxLineChanged = !1), e.preparedSelection && t.display.input.showSelection(e.preparedSelection), (e.updatedDisplay || e.startHeight != t.doc.height) && y(t, e.barMeasure), e.updatedDisplay && E(t, e.barMeasure), e.selectionChanged && Fe(t), t.state.focused && e.updateInput && t.display.input.reset(e.typing), !e.focus || e.focus != ji() || document.hasFocus && !document.hasFocus() || Y(e.cm)
    }

    function Tt(e) {
        var t = e.cm,
                n = t.display,
                r = t.doc;
        if (e.updatedDisplay && T(t, e.update), null == n.wheelStartX || null == e.scrollTop && null == e.scrollLeft && !e.scrollToPos || (n.wheelStartX = n.wheelStartY = null), null == e.scrollTop || n.scroller.scrollTop == e.scrollTop && !e.forceScroll || (r.scrollTop = Math.max(0, Math.min(n.scroller.scrollHeight - n.scroller.clientHeight, e.scrollTop)), n.scrollbars.setScrollTop(r.scrollTop), n.scroller.scrollTop = r.scrollTop), null == e.scrollLeft || n.scroller.scrollLeft == e.scrollLeft && !e.forceScroll || (r.scrollLeft = Math.max(0, Math.min(n.scroller.scrollWidth - n.scroller.clientWidth, e.scrollLeft)), n.scrollbars.setScrollLeft(r.scrollLeft), n.scroller.scrollLeft = r.scrollLeft, w(t)), e.scrollToPos) {
            var i = Nn(t, me(r, e.scrollToPos.from), me(r, e.scrollToPos.to), e.scrollToPos.margin);
            e.scrollToPos.isCursor && t.state.focused && Rn(t, i)
        }
        var o = e.maybeHiddenMarkers,
                a = e.maybeUnhiddenMarkers;
        if (o)
            for (var s = 0; s < o.length; ++s)
                o[s].lines.length || Ra(o[s], "hide");
        if (a)
            for (var s = 0; s < a.length; ++s)
                a[s].lines.length && Ra(a[s], "unhide");
        n.wrapper.offsetHeight && (r.scrollTop = t.display.scroller.scrollTop), e.changeObjs && Ra(t, "changes", t, e.changeObjs), e.update && e.update.finish()
    }

    function At(e, t) {
        if (e.curOp)
            return t();
        bt(e);
        try {
            return t()
        } finally {
            kt(e)
        }
    }

    function Et(e, t) {
        return function () {
            if (e.curOp)
                return t.apply(e, arguments);
            bt(e);
            try {
                return t.apply(e, arguments)
            } finally {
                kt(e)
            }
        }
    }

    function Ot(e) {
        return function () {
            if (this.curOp)
                return e.apply(this, arguments);
            bt(this);
            try {
                return e.apply(this, arguments)
            } finally {
                kt(this)
            }
        }
    }

    function It(e) {
        return function () {
            var t = this.cm;
            if (!t || t.curOp)
                return e.apply(this, arguments);
            bt(t);
            try {
                return e.apply(this, arguments)
            } finally {
                kt(t)
            }
        }
    }

    function Rt(e, t, n) {
        this.line = t, this.rest = _r(t), this.size = this.rest ? ti(Ii(this.rest)) - n + 1 : 1, this.node = this.text = null, this.hidden = kr(e, t)
    }

    function Nt(e, t, n) {
        for (var r, i = [], o = t; o < n; o = r) {
            var a = new Rt(e.doc, Zr(e.doc, o), o);
            r = o + a.size, i.push(a)
        }
        return i
    }

    function Pt(e, t, n, r) {
        null == t && (t = e.doc.first), null == n && (n = e.doc.first + e.doc.size), r || (r = 0);
        var i = e.display;
        if (r && n < i.viewTo && (null == i.updateLineNumbers || i.updateLineNumbers > t) && (i.updateLineNumbers = t), e.curOp.viewChanged = !0, t >= i.viewTo)
            Do && br(e.doc, t) < i.viewTo && Dt(e);
        else if (n <= i.viewFrom)
            Do && wr(e.doc, n + r) > i.viewFrom ? Dt(e) : (i.viewFrom += r, i.viewTo += r);
        else if (t <= i.viewFrom && n >= i.viewTo)
            Dt(e);
        else if (t <= i.viewFrom) {
            var o = Wt(e, n, n + r, 1);
            o ? (i.view = i.view.slice(o.index), i.viewFrom = o.lineN, i.viewTo += r) : Dt(e)
        } else if (n >= i.viewTo) {
            var o = Wt(e, t, t, -1);
            o ? (i.view = i.view.slice(0, o.index), i.viewTo = o.lineN) : Dt(e)
        } else {
            var a = Wt(e, t, t, -1),
                    s = Wt(e, n, n + r, 1);
            a && s ? (i.view = i.view.slice(0, a.index).concat(Nt(e, a.lineN, s.lineN)).concat(i.view.slice(s.index)), i.viewTo += r) : Dt(e)
        }
        var l = i.externalMeasured;
        l && (n < l.lineN ? l.lineN += r : t < l.lineN + l.size && (i.externalMeasured = null))
    }

    function zt(e, t, n) {
        e.curOp.viewChanged = !0;
        var r = e.display,
                i = e.display.externalMeasured;
        if (i && t >= i.lineN && t < i.lineN + i.size && (r.externalMeasured = null), !(t < r.viewFrom || t >= r.viewTo)) {
            var o = r.view[Ft(e, t)];
            if (null != o.node) {
                var a = o.changes || (o.changes = []);
                Ri(a, n) == -1 && a.push(n)
            }
        }
    }

    function Dt(e) {
        e.display.viewFrom = e.display.viewTo = e.doc.first, e.display.view = [], e.display.viewOffset = 0
    }

    function Ft(e, t) {
        if (t >= e.display.viewTo)
            return null;
        if (t -= e.display.viewFrom, t < 0)
            return null;
        for (var n = e.display.view, r = 0; r < n.length; r++)
            if (t -= n[r].size, t < 0)
                return r
    }

    function Wt(e, t, n, r) {
        var i, o = Ft(e, t),
                a = e.display.view;
        if (!Do || n == e.doc.first + e.doc.size)
            return {
                index: o,
                lineN: n
            };
        for (var s = 0, l = e.display.viewFrom; s < o; s++)
            l += a[s].size;
        if (l != t) {
            if (r > 0) {
                if (o == a.length - 1)
                    return null;
                i = l + a[o].size - t, o++
            } else
                i = l - t;
            t += i, n += i
        }
        for (; br(e.doc, n) != n; ) {
            if (o == (r < 0 ? 0 : a.length - 1))
                return null;
            n += r * a[o - (r < 0 ? 1 : 0)].size, o += r
        }
        return {
            index: o,
            lineN: n
        }
    }

    function Ht(e, t, n) {
        var r = e.display,
                i = r.view;
        0 == i.length || t >= r.viewTo || n <= r.viewFrom ? (r.view = Nt(e, t, n), r.viewFrom = t) : (r.viewFrom > t ? r.view = Nt(e, t, r.viewFrom).concat(r.view) : r.viewFrom < t && (r.view = r.view.slice(Ft(e, t))), r.viewFrom = t, r.viewTo < n ? r.view = r.view.concat(Nt(e, r.viewTo, n)) : r.viewTo > n && (r.view = r.view.slice(0, Ft(e, n)))), r.viewTo = n
    }

    function Bt(e) {
        for (var t = e.display.view, n = 0, r = 0; r < t.length; r++) {
            var i = t[r];
            i.hidden || i.node && !i.changes || ++n
        }
        return n
    }

    function qt(e) {
        function t() {
            i.activeTouch && (o = setTimeout(function () {
                i.activeTouch = null
            }, 1e3), a = i.activeTouch, a.end = +new Date)
        }

        function n(e) {
            if (1 != e.touches.length)
                return !1;
            var t = e.touches[0];
            return t.radiusX <= 1 && t.radiusY <= 1
        }

        function r(e, t) {
            if (null == t.left)
                return !0;
            var n = t.left - e.left,
                    r = t.top - e.top;
            return n * n + r * r > 400
        }
        var i = e.display;
        Ea(i.scroller, "mousedown", Et(e, Vt)), _o && bo < 11 ? Ea(i.scroller, "dblclick", Et(e, function (t) {
            if (!Li(e, t)) {
                var n = Kt(e, t);
                if (n && !Qt(e, t) && !jt(e.display, t)) {
                    Ma(t);
                    var r = e.findWordAt(n);
                    be(e.doc, r.anchor, r.head)
                }
            }
        })) : Ea(i.scroller, "dblclick", function (t) {
            Li(e, t) || Ma(t)
        }), Po || Ea(i.scroller, "contextmenu", function (t) {
            _n(e, t)
        });
        var o, a = {
            end: 0
        };
        Ea(i.scroller, "touchstart", function (t) {
            if (!Li(e, t) && !n(t)) {
                clearTimeout(o);
                var r = +new Date;
                i.activeTouch = {
                    start: r,
                    moved: !1,
                    prev: r - a.end <= 300 ? a : null
                }, 1 == t.touches.length && (i.activeTouch.left = t.touches[0].pageX, i.activeTouch.top = t.touches[0].pageY)
            }
        }), Ea(i.scroller, "touchmove", function () {
            i.activeTouch && (i.activeTouch.moved = !0)
        }), Ea(i.scroller, "touchend", function (n) {
            var o = i.activeTouch;
            if (o && !jt(i, n) && null != o.left && !o.moved && new Date - o.start < 300) {
                var a, s = e.coordsChar(i.activeTouch, "page");
                a = !o.prev || r(o, o.prev) ? new fe(s, s) : !o.prev.prev || r(o, o.prev.prev) ? e.findWordAt(s) : new fe(Fo(s.line, 0), me(e.doc, Fo(s.line + 1, 0))), e.setSelection(a.anchor, a.head), e.focus(), Ma(n)
            }
            t()
        }), Ea(i.scroller, "touchcancel", t), Ea(i.scroller, "scroll", function () {
            i.scroller.clientHeight && (rn(e, i.scroller.scrollTop), on(e, i.scroller.scrollLeft, !0), Ra(e, "scroll", e))
        }), Ea(i.scroller, "mousewheel", function (t) {
            an(e, t)
        }), Ea(i.scroller, "DOMMouseScroll", function (t) {
            an(e, t)
        }), Ea(i.wrapper, "scroll", function () {
            i.wrapper.scrollTop = i.wrapper.scrollLeft = 0
        }), i.dragFunctions = {
            enter: function (t) {
                Li(e, t) || Aa(t)
            },
            over: function (t) {
                Li(e, t) || (tn(e, t), Aa(t))
            },
            start: function (t) {
                en(e, t)
            },
            drop: Et(e, Jt),
            leave: function (t) {
                Li(e, t) || nn(e)
            }
        };
        var s = i.input.getField();
        Ea(s, "keyup", function (t) {
            hn.call(e, t)
        }), Ea(s, "keydown", Et(e, dn)), Ea(s, "keypress", Et(e, mn)), Ea(s, "focus", Fi(vn, e)), Ea(s, "blur", Fi(yn, e))
    }

    function Ut(t, n, r) {
        var i = r && r != e.Init;
        if (!n != !i) {
            var o = t.display.dragFunctions,
                    a = n ? Ea : Ia;
            a(t.display.scroller, "dragstart", o.start), a(t.display.scroller, "dragenter", o.enter), a(t.display.scroller, "dragover", o.over), a(t.display.scroller, "dragleave", o.leave), a(t.display.scroller, "drop", o.drop)
        }
    }

    function $t(e) {
        var t = e.display;
        t.lastWrapHeight == t.wrapper.clientHeight && t.lastWrapWidth == t.wrapper.clientWidth || (t.cachedCharWidth = t.cachedTextHeight = t.cachedPaddingH = null, t.scrollbarsClipped = !1, e.setSize())
    }

    function jt(e, t) {
        for (var n = wi(t); n != e.wrapper; n = n.parentNode)
            if (!n || 1 == n.nodeType && "true" == n.getAttribute("cm-ignore-events") || n.parentNode == e.sizer && n != e.mover)
                return !0
    }

    function Kt(e, t, n, r) {
        var i = e.display;
        if (!n && "true" == wi(t).getAttribute("cm-not-content"))
            return null;
        var o, a, s = i.lineSpace.getBoundingClientRect();
        try {
            o = t.clientX - s.left, a = t.clientY - s.top
        } catch (e) {
            return null
        }
        var l, c = gt(e, o, a);
        if (r && 1 == c.xRel && (l = Zr(e.doc, c.line).text).length == c.ch) {
            var u = Ha(l, l.length, e.options.tabSize) - l.length;
            c = Fo(c.line, Math.max(0, Math.round((o - je(e.display).left) / _t(e.display)) - u))
        }
        return c
    }

    function Vt(e) {
        var t = this,
                n = t.display;
        if (!(Li(t, e) || n.activeTouch && n.input.supportsTouch())) {
            if (n.shift = e.shiftKey, jt(n, e))
                return void(wo || (n.scroller.draggable = !1, setTimeout(function () {
                    n.scroller.draggable = !0
                }, 100)));
            if (!Qt(t, e)) {
                var r = Kt(t, e);
                switch (window.focus(), ki(e)) {
                    case 1:
                        t.state.selectingText ? t.state.selectingText(e) : r ? Gt(t, e, r) : wi(e) == n.scroller && Ma(e);
                        break;
                    case 2:
                        wo && (t.state.lastMiddleDown = +new Date), r && be(t.doc, r), setTimeout(function () {
                            n.input.focus()
                        }, 20), Ma(e);
                        break;
                    case 3:
                        Po ? _n(t, e) : gn(t)
                }
            }
        }
    }

    function Gt(e, t, n) {
        _o ? setTimeout(Fi(Y, e), 0) : e.curOp.focus = ji();
        var r, i = +new Date;
        Uo && Uo.time > i - 400 && 0 == Wo(Uo.pos, n) ? r = "triple" : qo && qo.time > i - 400 && 0 == Wo(qo.pos, n) ? (r = "double", Uo = {
            time: i,
            pos: n
        }) : (r = "single", qo = {
            time: i,
            pos: n
        });
        var o, a = e.doc.sel,
                s = Eo ? t.metaKey : t.ctrlKey;
        e.options.dragDrop && es && !e.isReadOnly() && "single" == r && (o = a.contains(n)) > -1 && (Wo((o = a.ranges[o]).from(), n) < 0 || n.xRel > 0) && (Wo(o.to(), n) > 0 || n.xRel < 0) ? Xt(e, t, n, s) : Yt(e, t, n, r, s)
    }

    function Xt(e, t, n, r) {
        var i = e.display,
                o = +new Date,
                a = Et(e, function (s) {
                    wo && (i.scroller.draggable = !1), e.state.draggingText = !1, Ia(document, "mouseup", a), Ia(i.scroller, "drop", a), Math.abs(t.clientX - s.clientX) + Math.abs(t.clientY - s.clientY) < 10 && (Ma(s), !r && +new Date - 200 < o && be(e.doc, n), wo || _o && 9 == bo ? setTimeout(function () {
                        document.body.focus(), i.input.focus()
                    }, 20) : i.input.focus())
                });
        wo && (i.scroller.draggable = !0), e.state.draggingText = a, i.scroller.dragDrop && i.scroller.dragDrop(), Ea(document, "mouseup", a), Ea(i.scroller, "drop", a)
    }

    function Yt(e, t, n, r, i) {
        function o(t) {
            if (0 != Wo(g, t))
                if (g = t, "rect" == r) {
                    for (var i = [], o = e.options.tabSize, a = Ha(Zr(c, n.line).text, n.ch, o), s = Ha(Zr(c, t.line).text, t.ch, o), l = Math.min(a, s), p = Math.max(a, s), h = Math.min(n.line, t.line), m = Math.min(e.lastLine(), Math.max(n.line, t.line)); h <= m; h++) {
                        var v = Zr(c, h).text,
                                y = Ba(v, l, o);
                        l == p ? i.push(new fe(Fo(h, y), Fo(h, y))) : v.length > y && i.push(new fe(Fo(h, y), Fo(h, Ba(v, p, o))))
                    }
                    i.length || i.push(new fe(n, n)), Le(c, de(d.ranges.slice(0, f).concat(i), f), {
                        origin: "*mouse",
                        scroll: !1
                    }), e.scrollIntoView(t)
                } else {
                    var _ = u,
                            b = _.anchor,
                            w = t;
                    if ("single" != r) {
                        if ("double" == r)
                            var k = e.findWordAt(t);
                        else
                            var k = new fe(Fo(t.line, 0), me(c, Fo(t.line + 1, 0)));
                        Wo(k.anchor, b) > 0 ? (w = k.head, b = X(_.from(), k.anchor)) : (w = k.anchor, b = G(_.to(), k.head))
                    }
                    var i = d.ranges.slice(0);
                    i[f] = new fe(me(c, b), w), Le(c, de(i, f), Fa)
                }
        }

        function a(t) {
            var n = ++y,
                    i = Kt(e, t, !0, "rect" == r);
            if (i)
                if (0 != Wo(i, g)) {
                    e.curOp.focus = ji(), o(i);
                    var s = b(l, c);
                    (i.line >= s.to || i.line < s.from) && setTimeout(Et(e, function () {
                        y == n && a(t)
                    }), 150)
                } else {
                    var u = t.clientY < v.top ? -20 : t.clientY > v.bottom ? 20 : 0;
                    u && setTimeout(Et(e, function () {
                        y == n && (l.scroller.scrollTop += u, a(t))
                    }), 50)
                }
        }

        function s(t) {
            e.state.selectingText = !1, y = 1 / 0, Ma(t), l.input.focus(), Ia(document, "mousemove", _), Ia(document, "mouseup", w), c.history.lastSelOrigin = null
        }
        var l = e.display,
                c = e.doc;
        Ma(t);
        var u, f, d = c.sel,
                p = d.ranges;
        if (i && !t.shiftKey ? (f = c.sel.contains(n), u = f > -1 ? p[f] : new fe(n, n)) : (u = c.sel.primary(), f = c.sel.primIndex), Oo ? t.shiftKey && t.metaKey : t.altKey)
            r = "rect", i || (u = new fe(n, n)), n = Kt(e, t, !0, !0), f = -1;
        else if ("double" == r) {
            var h = e.findWordAt(n);
            u = e.display.shift || c.extend ? _e(c, u, h.anchor, h.head) : h
        } else if ("triple" == r) {
            var m = new fe(Fo(n.line, 0), me(c, Fo(n.line + 1, 0)));
            u = e.display.shift || c.extend ? _e(c, u, m.anchor, m.head) : m
        } else
            u = _e(c, u, n);
        i ? f == -1 ? (f = p.length, Le(c, de(p.concat([u]), f), {
            scroll: !1,
            origin: "*mouse"
        })) : p.length > 1 && p[f].empty() && "single" == r && !t.shiftKey ? (Le(c, de(p.slice(0, f).concat(p.slice(f + 1)), 0), {
            scroll: !1,
            origin: "*mouse"
        }), d = c.sel) : ke(c, f, u, Fa) : (f = 0, Le(c, new ue([u], 0), Fa), d = c.sel);
        var g = n,
                v = l.wrapper.getBoundingClientRect(),
                y = 0,
                _ = Et(e, function (e) {
                    ki(e) ? a(e) : s(e)
                }),
                w = Et(e, s);
        e.state.selectingText = w, Ea(document, "mousemove", _), Ea(document, "mouseup", w)
    }

    function Zt(e, t, n, r) {
        try {
            var i = t.clientX,
                    o = t.clientY
        } catch (e) {
            return !1
        }
        if (i >= Math.floor(e.display.gutters.getBoundingClientRect().right))
            return !1;
        r && Ma(t);
        var a = e.display,
                s = a.lineDiv.getBoundingClientRect();
        if (o > s.bottom || !Ti(e, n))
            return bi(t);
        o -= s.top - a.viewOffset;
        for (var l = 0; l < e.options.gutters.length; ++l) {
            var c = a.gutters.childNodes[l];
            if (c && c.getBoundingClientRect().right >= i) {
                var u = ni(e.doc, o),
                        f = e.options.gutters[l];
                return Ra(e, n, e, u, f, t), bi(t)
            }
        }
    }

    function Qt(e, t) {
        return Zt(e, t, "gutterClick", !0)
    }

    function Jt(e) {
        var t = this;
        if (nn(t), !Li(t, e) && !jt(t.display, e)) {
            Ma(e), _o && (Vo = +new Date);
            var n = Kt(t, e, !0),
                    r = e.dataTransfer.files;
            if (n && !t.isReadOnly())
                if (r && r.length && window.FileReader && window.File)
                    for (var i = r.length, o = Array(i), a = 0, s = function (e, r) {
                        if (!t.options.allowDropFileTypes || Ri(t.options.allowDropFileTypes, e.type) != -1) {
                            var s = new FileReader;
                            s.onload = Et(t, function () {
                                var e = s.result;
                                if (/[\x00-\x08\x0e-\x1f]{2}/.test(e) && (e = ""), o[r] = e, ++a == i) {
                                    n = me(t.doc, n);
                                    var l = {
                                        from: n,
                                        to: n,
                                        text: t.doc.splitLines(o.join(t.doc.lineSeparator())),
                                        origin: "paste"
                                    };
                                    Ln(t.doc, l), Se(t.doc, pe(n, Jo(l)))
                                }
                            }), s.readAsText(e)
                        }
                    }, l = 0; l < i; ++l)
                        s(r[l], l);
                else {
                    if (t.state.draggingText && t.doc.sel.contains(n) > -1)
                        return t.state.draggingText(e), void setTimeout(function () {
                            t.display.input.focus()
                        }, 20);
                    try {
                        var o = e.dataTransfer.getData("Text");
                        if (o) {
                            if (t.state.draggingText && !(Eo ? e.altKey : e.ctrlKey))
                                var c = t.listSelections();
                            if (Me(t.doc, pe(n, n)), c)
                                for (var l = 0; l < c.length; ++l)
                                    In(t.doc, "", c[l].anchor, c[l].head, "drag");
                            t.replaceSelection(o, "around", "paste"), t.display.input.focus()
                        }
                    } catch (e) {
                    }
                }
        }
    }

    function en(e, t) {
        if (_o && (!e.state.draggingText || +new Date - Vo < 100))
            return void Aa(t);
        if (!Li(e, t) && !jt(e.display, t) && (t.dataTransfer.setData("Text", e.getSelection()), t.dataTransfer.effectAllowed = "copyMove", t.dataTransfer.setDragImage && !So)) {
            var n = qi("img", null, null, "position: fixed; left: 0; top: 0;");
            n.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==", Co && (n.width = n.height = 1, e.display.wrapper.appendChild(n), n._top = n.offsetTop), t.dataTransfer.setDragImage(n, 0, 0), Co && n.parentNode.removeChild(n)
        }
    }

    function tn(e, t) {
        var n = Kt(e, t);
        if (n) {
            var r = document.createDocumentFragment();
            ze(e, n, r), e.display.dragCursor || (e.display.dragCursor = qi("div", null, "CodeMirror-cursors CodeMirror-dragcursors"), e.display.lineSpace.insertBefore(e.display.dragCursor, e.display.cursorDiv)), $i(e.display.dragCursor, r)
        }
    }

    function nn(e) {
        e.display.dragCursor && (e.display.lineSpace.removeChild(e.display.dragCursor), e.display.dragCursor = null)
    }

    function rn(e, t) {
        Math.abs(e.doc.scrollTop - t) < 2 || (e.doc.scrollTop = t, go || A(e, {
            top: t
        }), e.display.scroller.scrollTop != t && (e.display.scroller.scrollTop = t), e.display.scrollbars.setScrollTop(t), go && A(e), We(e, 100))
    }

    function on(e, t, n) {
        (n ? t == e.doc.scrollLeft : Math.abs(e.doc.scrollLeft - t) < 2) || (t = Math.min(t, e.display.scroller.scrollWidth - e.display.scroller.clientWidth), e.doc.scrollLeft = t, w(e), e.display.scroller.scrollLeft != t && (e.display.scroller.scrollLeft = t), e.display.scrollbars.setScrollLeft(t))
    }

    function an(e, t) {
        var n = Yo(t),
                r = n.x,
                i = n.y,
                o = e.display,
                a = o.scroller,
                s = a.scrollWidth > a.clientWidth,
                l = a.scrollHeight > a.clientHeight;
        if (r && s || i && l) {
            if (i && Eo && wo)
                e: for (var c = t.target, u = o.view; c != a; c = c.parentNode)
                    for (var f = 0; f < u.length; f++)
                        if (u[f].node == c) {
                            e.display.currentWheelTarget = c;
                            break e
                        }
            if (r && !go && !Co && null != Xo)
                return i && l && rn(e, Math.max(0, Math.min(a.scrollTop + i * Xo, a.scrollHeight - a.clientHeight))), on(e, Math.max(0, Math.min(a.scrollLeft + r * Xo, a.scrollWidth - a.clientWidth))), (!i || i && l) && Ma(t), void(o.wheelStartX = null);
            if (i && null != Xo) {
                var d = i * Xo,
                        p = e.doc.scrollTop,
                        h = p + o.wrapper.clientHeight;
                d < 0 ? p = Math.max(0, p + d - 50) : h = Math.min(e.doc.height, h + d + 50), A(e, {
                    top: p,
                    bottom: h
                })
            }
            Go < 20 && (null == o.wheelStartX ? (o.wheelStartX = a.scrollLeft, o.wheelStartY = a.scrollTop, o.wheelDX = r, o.wheelDY = i, setTimeout(function () {
                if (null != o.wheelStartX) {
                    var e = a.scrollLeft - o.wheelStartX,
                            t = a.scrollTop - o.wheelStartY,
                            n = t && o.wheelDY && t / o.wheelDY || e && o.wheelDX && e / o.wheelDX;
                    o.wheelStartX = o.wheelStartY = null, n && (Xo = (Xo * Go + n) / (Go + 1), ++Go)
                }
            }, 200)) : (o.wheelDX += r, o.wheelDY += i))
        }
    }

    function sn(e, t, n) {
        if ("string" == typeof t && (t = ua[t], !t))
            return !1;
        e.display.input.ensurePolled();
        var r = e.display.shift,
                i = !1;
        try {
            e.isReadOnly() && (e.state.suppressEdits = !0), n && (e.display.shift = !1), i = t(e) != za
        } finally {
            e.display.shift = r, e.state.suppressEdits = !1
        }
        return i
    }

    function ln(e, t, n) {
        for (var r = 0; r < e.state.keyMaps.length; r++) {
            var i = da(t, e.state.keyMaps[r], n, e);
            if (i)
                return i
        }
        return e.options.extraKeys && da(t, e.options.extraKeys, n, e) || da(t, e.options.keyMap, n, e)
    }

    function cn(e, t, n, r) {
        var i = e.state.keySeq;
        if (i) {
            if (pa(t))
                return "handled";
            Zo.set(50, function () {
                e.state.keySeq == i && (e.state.keySeq = null, e.display.input.reset())
            }), t = i + " " + t
        }
        var o = ln(e, t, r);
        return "multi" == o && (e.state.keySeq = t), "handled" == o && Ci(e, "keyHandled", e, t, n), "handled" != o && "multi" != o || (Ma(n), Fe(e)), i && !o && /\'$/.test(t) ? (Ma(n), !0) : !!o
    }

    function un(e, t) {
        var n = ha(t, !0);
        return !!n && (t.shiftKey && !e.state.keySeq ? cn(e, "Shift-" + n, t, function (t) {
            return sn(e, t, !0)
        }) || cn(e, n, t, function (t) {
            if ("string" == typeof t ? /^go[A-Z]/.test(t) : t.motion)
                return sn(e, t)
        }) : cn(e, n, t, function (t) {
            return sn(e, t)
        }))
    }

    function fn(e, t, n) {
        return cn(e, "'" + n + "'", t, function (t) {
            return sn(e, t, !0)
        })
    }

    function dn(e) {
        var t = this;
        if (t.curOp.focus = ji(), !Li(t, e)) {
            _o && bo < 11 && 27 == e.keyCode && (e.returnValue = !1);
            var n = e.keyCode;
            t.display.shift = 16 == n || e.shiftKey;
            var r = un(t, e);
            Co && (Qo = r ? n : null, !r && 88 == n && !rs && (Eo ? e.metaKey : e.ctrlKey) && t.replaceSelection("", null, "cut")), 18 != n || /\bCodeMirror-crosshair\b/.test(t.display.lineDiv.className) || pn(t)
        }
    }

    function pn(e) {
        function t(e) {
            18 != e.keyCode && e.altKey || (Za(n, "CodeMirror-crosshair"), Ia(document, "keyup", t), Ia(document, "mouseover", t))
        }
        var n = e.display.lineDiv;
        Qa(n, "CodeMirror-crosshair"), Ea(document, "keyup", t), Ea(document, "mouseover", t)
    }

    function hn(e) {
        16 == e.keyCode && (this.doc.sel.shift = !1), Li(this, e)
    }

    function mn(e) {
        var t = this;
        if (!(jt(t.display, e) || Li(t, e) || e.ctrlKey && !e.altKey || Eo && e.metaKey)) {
            var n = e.keyCode,
                    r = e.charCode;
            if (Co && n == Qo)
                return Qo = null, void Ma(e);
            if (!Co || e.which && !(e.which < 10) || !un(t, e)) {
                var i = String.fromCharCode(null == r ? n : r);
                fn(t, e, i) || t.display.input.onKeyPress(e)
            }
        }
    }

    function gn(e) {
        e.state.delayingBlurEvent = !0, setTimeout(function () {
            e.state.delayingBlurEvent && (e.state.delayingBlurEvent = !1, yn(e))
        }, 100)
    }

    function vn(e) {
        e.state.delayingBlurEvent && (e.state.delayingBlurEvent = !1), "nocursor" != e.options.readOnly && (e.state.focused || (Ra(e, "focus", e), e.state.focused = !0, Qa(e.display.wrapper, "CodeMirror-focused"), e.curOp || e.display.selForContextMenu == e.doc.sel || (e.display.input.reset(), wo && setTimeout(function () {
            e.display.input.reset(!0)
        }, 20)), e.display.input.receivedFocus()), Fe(e))
    }

    function yn(e) {
        e.state.delayingBlurEvent || (e.state.focused && (Ra(e, "blur", e), e.state.focused = !1, Za(e.display.wrapper, "CodeMirror-focused")), clearInterval(e.display.blinker), setTimeout(function () {
            e.state.focused || (e.display.shift = !1)
        }, 150))
    }

    function _n(e, t) {
        jt(e.display, t) || bn(e, t) || Li(e, t, "contextmenu") || e.display.input.onContextMenu(t)
    }

    function bn(e, t) {
        return !!Ti(e, "gutterContextMenu") && Zt(e, t, "gutterContextMenu", !1)
    }

    function wn(e, t) {
        if (Wo(e, t.from) < 0)
            return e;
        if (Wo(e, t.to) <= 0)
            return Jo(t);
        var n = e.line + t.text.length - (t.to.line - t.from.line) - 1,
                r = e.ch;
        return e.line == t.to.line && (r += Jo(t).ch - t.to.ch), Fo(n, r)
    }

    function kn(e, t) {
        for (var n = [], r = 0; r < e.sel.ranges.length; r++) {
            var i = e.sel.ranges[r];
            n.push(new fe(wn(i.anchor, t), wn(i.head, t)))
        }
        return de(n, e.sel.primIndex)
    }

    function xn(e, t, n) {
        return e.line == t.line ? Fo(n.line, e.ch - t.ch + n.ch) : Fo(n.line + (e.line - t.line), e.ch)
    }

    function Cn(e, t, n) {
        for (var r = [], i = Fo(e.first, 0), o = i, a = 0; a < t.length; a++) {
            var s = t[a],
                    l = xn(s.from, i, o),
                    c = xn(Jo(s), i, o);
            if (i = s.to, o = c, "around" == n) {
                var u = e.sel.ranges[a],
                        f = Wo(u.head, u.anchor) < 0;
                r[a] = new fe(f ? c : l, f ? l : c)
            } else
                r[a] = new fe(l, l)
        }
        return new ue(r, e.sel.primIndex)
    }

    function Sn(e, t, n) {
        var r = {
            canceled: !1,
            from: t.from,
            to: t.to,
            text: t.text,
            origin: t.origin,
            cancel: function () {
                this.canceled = !0
            }
        };
        return n && (r.update = function (t, n, r, i) {
            t && (this.from = me(e, t)), n && (this.to = me(e, n)), r && (this.text = r), void 0 !== i && (this.origin = i)
        }), Ra(e, "beforeChange", e, r), e.cm && Ra(e.cm, "beforeChange", e.cm, r), r.canceled ? null : {
            from: r.from,
            to: r.to,
            text: r.text,
            origin: r.origin
        }
    }

    function Ln(e, t, n) {
        if (e.cm) {
            if (!e.cm.curOp)
                return Et(e.cm, Ln)(e, t, n);
            if (e.cm.state.suppressEdits)
                return
        }
        if (!(Ti(e, "beforeChange") || e.cm && Ti(e.cm, "beforeChange")) || (t = Sn(e, t, !0))) {
            var r = zo && !n && lr(e, t.from, t.to);
            if (r)
                for (var i = r.length - 1; i >= 0; --i)
                    Mn(e, {
                        from: r[i].from,
                        to: r[i].to,
                        text: i ? [""] : t.text
                    });
            else
                Mn(e, t)
        }
    }

    function Mn(e, t) {
        if (1 != t.text.length || "" != t.text[0] || 0 != Wo(t.from, t.to)) {
            var n = kn(e, t);
            ci(e, t, n, e.cm ? e.cm.curOp.id : NaN), En(e, t, n, or(e, t));
            var r = [];
            Xr(e, function (e, n) {
                n || Ri(r, e.history) != -1 || (_i(e.history, t), r.push(e.history)), En(e, t, null, or(e, t))
            })
        }
    }

    function Tn(e, t, n) {
        if (!e.cm || !e.cm.state.suppressEdits) {
            for (var r, i = e.history, o = e.sel, a = "undo" == t ? i.done : i.undone, s = "undo" == t ? i.undone : i.done, l = 0; l < a.length && (r = a[l], n ? !r.ranges || r.equals(e.sel) : r.ranges); l++)
                ;
            if (l != a.length) {
                for (i.lastOrigin = i.lastSelOrigin = null; r = a.pop(), r.ranges; ) {
                    if (di(r, s), n && !r.equals(e.sel))
                        return void Le(e, r, {
                            clearRedo: !1
                        });
                    o = r
                }
                var c = [];
                di(o, s), s.push({
                    changes: c,
                    generation: i.generation
                }), i.generation = r.generation || ++i.maxGeneration;
                for (var u = Ti(e, "beforeChange") || e.cm && Ti(e.cm, "beforeChange"), l = r.changes.length - 1; l >= 0; --l) {
                    var f = r.changes[l];
                    if (f.origin = t, u && !Sn(e, f, !1))
                        return void(a.length = 0);
                    c.push(ai(e, f));
                    var d = l ? kn(e, f) : Ii(a);
                    En(e, f, d, sr(e, f)), !l && e.cm && e.cm.scrollIntoView({
                        from: f.from,
                        to: Jo(f)
                    });
                    var p = [];
                    Xr(e, function (e, t) {
                        t || Ri(p, e.history) != -1 || (_i(e.history, f), p.push(e.history)), En(e, f, null, sr(e, f))
                    })
                }
            }
        }
    }

    function An(e, t) {
        if (0 != t && (e.first += t, e.sel = new ue(Ni(e.sel.ranges, function (e) {
            return new fe(Fo(e.anchor.line + t, e.anchor.ch), Fo(e.head.line + t, e.head.ch))
        }), e.sel.primIndex), e.cm)) {
            Pt(e.cm, e.first, e.first - t, t);
            for (var n = e.cm.display, r = n.viewFrom; r < n.viewTo; r++)
                zt(e.cm, r, "gutter")
        }
    }

    function En(e, t, n, r) {
        if (e.cm && !e.cm.curOp)
            return Et(e.cm, En)(e, t, n, r);
        if (t.to.line < e.first)
            return void An(e, t.text.length - 1 - (t.to.line - t.from.line));
        if (!(t.from.line > e.lastLine())) {
            if (t.from.line < e.first) {
                var i = t.text.length - 1 - (e.first - t.from.line);
                An(e, i), t = {
                    from: Fo(e.first, 0),
                    to: Fo(t.to.line + i, t.to.ch),
                    text: [Ii(t.text)],
                    origin: t.origin
                }
            }
            var o = e.lastLine();
            t.to.line > o && (t = {
                from: t.from,
                to: Fo(o, Zr(e, o).text.length),
                text: [t.text[0]],
                origin: t.origin
            }), t.removed = Qr(e, t.from, t.to), n || (n = kn(e, t)), e.cm ? On(e.cm, t, r) : Kr(e, t, r), Me(e, n, Da)
        }
    }

    function On(e, t, n) {
        var r = e.doc,
                i = e.display,
                a = t.from,
                s = t.to,
                l = !1,
                c = a.line;
        e.options.lineWrapping || (c = ti(yr(Zr(r, a.line))), r.iter(c, s.line + 1, function (e) {
            if (e == i.maxLine)
                return l = !0, !0
        })), r.sel.contains(t.from, t.to) > -1 && Mi(e), Kr(r, t, n, o(e)), e.options.lineWrapping || (r.iter(c, a.line + t.text.length, function (e) {
            var t = f(e);
            t > i.maxLineLength && (i.maxLine = e, i.maxLineLength = t, i.maxLineChanged = !0, l = !1)
        }), l && (e.curOp.updateMaxLine = !0)), r.frontier = Math.min(r.frontier, a.line), We(e, 400);
        var u = t.text.length - (s.line - a.line) - 1;
        t.full ? Pt(e) : a.line != s.line || 1 != t.text.length || jr(e.doc, t) ? Pt(e, a.line, s.line + 1, u) : zt(e, a.line, "text");
        var d = Ti(e, "changes"),
                p = Ti(e, "change");
        if (p || d) {
            var h = {
                from: a,
                to: s,
                text: t.text,
                removed: t.removed,
                origin: t.origin
            };
            p && Ci(e, "change", e, h), d && (e.curOp.changeObjs || (e.curOp.changeObjs = [])).push(h)
        }
        e.display.selForContextMenu = null
    }

    function In(e, t, n, r, i) {
        if (r || (r = n), Wo(r, n) < 0) {
            var o = r;
            r = n, n = o
        }
        "string" == typeof t && (t = e.splitLines(t)), Ln(e, {
            from: n,
            to: r,
            text: t,
            origin: i
        })
    }

    function Rn(e, t) {
        if (!Li(e, "scrollCursorIntoView")) {
            var n = e.display,
                    r = n.sizer.getBoundingClientRect(),
                    i = null;
            if (t.top + r.top < 0 ? i = !0 : t.bottom + r.top > (window.innerHeight || document.documentElement.clientHeight) && (i = !1), null != i && !Mo) {
                var o = qi("div", "​", null, "position: absolute; top: " + (t.top - n.viewOffset - Ue(e.display)) + "px; height: " + (t.bottom - t.top + Ke(e) + n.barHeight) + "px; left: " + t.left + "px; width: 2px;");
                e.display.lineSpace.appendChild(o), o.scrollIntoView(i), e.display.lineSpace.removeChild(o)
            }
        }
    }

    function Nn(e, t, n, r) {
        null == r && (r = 0);
        for (var i = 0; i < 5; i++) {
            var o = !1,
                    a = pt(e, t),
                    s = n && n != t ? pt(e, n) : a,
                    l = zn(e, Math.min(a.left, s.left), Math.min(a.top, s.top) - r, Math.max(a.left, s.left), Math.max(a.bottom, s.bottom) + r),
                    c = e.doc.scrollTop,
                    u = e.doc.scrollLeft;
            if (null != l.scrollTop && (rn(e, l.scrollTop), Math.abs(e.doc.scrollTop - c) > 1 && (o = !0)), null != l.scrollLeft && (on(e, l.scrollLeft), Math.abs(e.doc.scrollLeft - u) > 1 && (o = !0)), !o)
                break
        }
        return a
    }

    function Pn(e, t, n, r, i) {
        var o = zn(e, t, n, r, i);
        null != o.scrollTop && rn(e, o.scrollTop), null != o.scrollLeft && on(e, o.scrollLeft)
    }

    function zn(e, t, n, r, i) {
        var o = e.display,
                a = yt(e.display);
        n < 0 && (n = 0);
        var s = e.curOp && null != e.curOp.scrollTop ? e.curOp.scrollTop : o.scroller.scrollTop,
                l = Ge(e),
                c = {};
        i - n > l && (i = n + l);
        var u = e.doc.height + $e(o),
                f = n < a,
                d = i > u - a;
        if (n < s)
            c.scrollTop = f ? 0 : n;
        else if (i > s + l) {
            var p = Math.min(n, (d ? u : i) - l);
            p != s && (c.scrollTop = p)
        }
        var h = e.curOp && null != e.curOp.scrollLeft ? e.curOp.scrollLeft : o.scroller.scrollLeft,
                m = Ve(e) - (e.options.fixedGutter ? o.gutters.offsetWidth : 0),
                g = r - t > m;
        return g && (r = t + m), t < 10 ? c.scrollLeft = 0 : t < h ? c.scrollLeft = Math.max(0, t - (g ? 0 : 10)) : r > m + h - 3 && (c.scrollLeft = r + (g ? 0 : 10) - m), c
    }

    function Dn(e, t, n) {
        null == t && null == n || Wn(e), null != t && (e.curOp.scrollLeft = (null == e.curOp.scrollLeft ? e.doc.scrollLeft : e.curOp.scrollLeft) + t),
                null != n && (e.curOp.scrollTop = (null == e.curOp.scrollTop ? e.doc.scrollTop : e.curOp.scrollTop) + n)
    }

    function Fn(e) {
        Wn(e);
        var t = e.getCursor(),
                n = t,
                r = t;
        e.options.lineWrapping || (n = t.ch ? Fo(t.line, t.ch - 1) : t, r = Fo(t.line, t.ch + 1)), e.curOp.scrollToPos = {
            from: n,
            to: r,
            margin: e.options.cursorScrollMargin,
            isCursor: !0
        }
    }

    function Wn(e) {
        var t = e.curOp.scrollToPos;
        if (t) {
            e.curOp.scrollToPos = null;
            var n = ht(e, t.from),
                    r = ht(e, t.to),
                    i = zn(e, Math.min(n.left, r.left), Math.min(n.top, r.top) - t.margin, Math.max(n.right, r.right), Math.max(n.bottom, r.bottom) + t.margin);
            e.scrollTo(i.scrollLeft, i.scrollTop)
        }
    }

    function Hn(e, t, n, r) {
        var i, o = e.doc;
        null == n && (n = "add"), "smart" == n && (o.mode.indent ? i = qe(e, t) : n = "prev");
        var a = e.options.tabSize,
                s = Zr(o, t),
                l = Ha(s.text, null, a);
        s.stateAfter && (s.stateAfter = null);
        var c, u = s.text.match(/^\s*/)[0];
        if (r || /\S/.test(s.text)) {
            if ("smart" == n && (c = o.mode.indent(i, s.text.slice(u.length), s.text), c == za || c > 150)) {
                if (!r)
                    return;
                n = "prev"
            }
        } else
            c = 0, n = "not";
        "prev" == n ? c = t > o.first ? Ha(Zr(o, t - 1).text, null, a) : 0 : "add" == n ? c = l + e.options.indentUnit : "subtract" == n ? c = l - e.options.indentUnit : "number" == typeof n && (c = l + n), c = Math.max(0, c);
        var f = "",
                d = 0;
        if (e.options.indentWithTabs)
            for (var p = Math.floor(c / a); p; --p)
                d += a, f += "\t";
        if (d < c && (f += Oi(c - d)), f != u)
            return In(o, f, Fo(t, 0), Fo(t, u.length), "+input"), s.stateAfter = null, !0;
        for (var p = 0; p < o.sel.ranges.length; p++) {
            var h = o.sel.ranges[p];
            if (h.head.line == t && h.head.ch < u.length) {
                var d = Fo(t, u.length);
                ke(o, p, new fe(d, d));
                break
            }
        }
    }

    function Bn(e, t, n, r) {
        var i = t,
                o = t;
        return "number" == typeof t ? o = Zr(e, he(e, t)) : i = ti(t), null == i ? null : (r(o, i) && e.cm && zt(e.cm, i, n), o)
    }

    function qn(e, t) {
        for (var n = e.doc.sel.ranges, r = [], i = 0; i < n.length; i++) {
            for (var o = t(n[i]); r.length && Wo(o.from, Ii(r).to) <= 0; ) {
                var a = r.pop();
                if (Wo(a.from, o.from) < 0) {
                    o.from = a.from;
                    break
                }
            }
            r.push(o)
        }
        At(e, function () {
            for (var t = r.length - 1; t >= 0; t--)
                In(e.doc, "", r[t].from, r[t].to, "+delete");
            Fn(e)
        })
    }

    function Un(e, t, n, r, i) {
        function o() {
            var t = s + n;
            return !(t < e.first || t >= e.first + e.size) && (s = t, u = Zr(e, t))
        }

        function a(e) {
            var t = (i ? fo : po)(u, l, n, !0);
            if (null == t) {
                if (e || !o())
                    return !1;
                l = i ? (n < 0 ? io : ro)(u) : n < 0 ? u.text.length : 0
            } else
                l = t;
            return !0
        }
        var s = t.line,
                l = t.ch,
                c = n,
                u = Zr(e, s);
        if ("char" == r)
            a();
        else if ("column" == r)
            a(!0);
        else if ("word" == r || "group" == r)
            for (var f = null, d = "group" == r, p = e.cm && e.cm.getHelper(t, "wordChars"), h = !0; !(n < 0) || a(!h); h = !1) {
                var m = u.text.charAt(l) || "\n",
                        g = Wi(m, p) ? "w" : d && "\n" == m ? "n" : !d || /\s/.test(m) ? null : "p";
                if (!d || h || g || (g = "s"), f && f != g) {
                    n < 0 && (n = 1, a());
                    break
                }
                if (g && (f = g), n > 0 && !a(!h))
                    break
            }
        var v = Ie(e, Fo(s, l), t, c, !0);
        return Wo(t, v) || (v.hitSide = !0), v
    }

    function $n(e, t, n, r) {
        var i, o = e.doc,
                a = t.left;
        if ("page" == r) {
            var s = Math.min(e.display.wrapper.clientHeight, window.innerHeight || document.documentElement.clientHeight);
            i = t.top + n * (s - (n < 0 ? 1.5 : .5) * yt(e.display))
        } else
            "line" == r && (i = n > 0 ? t.bottom + 3 : t.top - 3);
        for (; ; ) {
            var l = gt(e, a, i);
            if (!l.outside)
                break;
            if (n < 0 ? i <= 0 : i >= o.height) {
                l.hitSide = !0;
                break
            }
            i += 5 * n
        }
        return l
    }

    function jn(t, n, r, i) {
        e.defaults[t] = n, r && (ta[t] = i ? function (e, t, n) {
            n != na && r(e, t, n)
        } : r)
    }

    function Kn(e) {
        for (var t, n, r, i, o = e.split(/-(?!$)/), e = o[o.length - 1], a = 0; a < o.length - 1; a++) {
            var s = o[a];
            if (/^(cmd|meta|m)$/i.test(s))
                i = !0;
            else if (/^a(lt)?$/i.test(s))
                t = !0;
            else if (/^(c|ctrl|control)$/i.test(s))
                n = !0;
            else {
                if (!/^s(hift)$/i.test(s))
                    throw new Error("Unrecognized modifier name: " + s);
                r = !0
            }
        }
        return t && (e = "Alt-" + e), n && (e = "Ctrl-" + e), i && (e = "Cmd-" + e), r && (e = "Shift-" + e), e
    }

    function Vn(e) {
        return "string" == typeof e ? fa[e] : e
    }

    function Gn(e, t, n, r, i) {
        if (r && r.shared)
            return Xn(e, t, n, r, i);
        if (e.cm && !e.cm.curOp)
            return Et(e.cm, Gn)(e, t, n, r, i);
        var o = new va(e, i),
                a = Wo(t, n);
        if (r && Di(r, o, !1), a > 0 || 0 == a && o.clearWhenEmpty !== !1)
            return o;
        if (o.replacedWith && (o.collapsed = !0, o.widgetNode = qi("span", [o.replacedWith], "CodeMirror-widget"), r.handleMouseEvents || o.widgetNode.setAttribute("cm-ignore-events", "true"), r.insertLeft && (o.widgetNode.insertLeft = !0)), o.collapsed) {
            if (vr(e, t.line, t, n, o) || t.line != n.line && vr(e, n.line, t, n, o))
                throw new Error("Inserting collapsed marker partially overlapping an existing one");
            Do = !0
        }
        o.addToHistory && ci(e, {
            from: t,
            to: n,
            origin: "markText"
        }, e.sel, NaN);
        var s, l = t.line,
                c = e.cm;
        if (e.iter(l, n.line + 1, function (e) {
            c && o.collapsed && !c.options.lineWrapping && yr(e) == c.display.maxLine && (s = !0), o.collapsed && l != t.line && ei(e, 0), nr(e, new Jn(o, l == t.line ? t.ch : null, l == n.line ? n.ch : null)), ++l
        }), o.collapsed && e.iter(t.line, n.line + 1, function (t) {
            kr(e, t) && ei(t, 0)
        }), o.clearOnEnter && Ea(o, "beforeCursorEnter", function () {
            o.clear()
        }), o.readOnly && (zo = !0, (e.history.done.length || e.history.undone.length) && e.clearHistory()), o.collapsed && (o.id = ++ga, o.atomic = !0), c) {
            if (s && (c.curOp.updateMaxLine = !0), o.collapsed)
                Pt(c, t.line, n.line + 1);
            else if (o.className || o.title || o.startStyle || o.endStyle || o.css)
                for (var u = t.line; u <= n.line; u++)
                    zt(c, u, "text");
            o.atomic && Ae(c.doc), Ci(c, "markerAdded", c, o)
        }
        return o
    }

    function Xn(e, t, n, r, i) {
        r = Di(r), r.shared = !1;
        var o = [Gn(e, t, n, r, i)],
                a = o[0],
                s = r.widgetNode;
        return Xr(e, function (e) {
            s && (r.widgetNode = s.cloneNode(!0)), o.push(Gn(e, me(e, t), me(e, n), r, i));
            for (var l = 0; l < e.linked.length; ++l)
                if (e.linked[l].isParent)
                    return;
            a = Ii(o)
        }), new ya(o, a)
    }

    function Yn(e) {
        return e.findMarks(Fo(e.first, 0), e.clipPos(Fo(e.lastLine())), function (e) {
            return e.parent
        })
    }

    function Zn(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n],
                    i = r.find(),
                    o = e.clipPos(i.from),
                    a = e.clipPos(i.to);
            if (Wo(o, a)) {
                var s = Gn(e, o, a, r.primary, r.primary.type);
                r.markers.push(s), s.parent = r
            }
        }
    }

    function Qn(e) {
        for (var t = 0; t < e.length; t++) {
            var n = e[t],
                    r = [n.primary.doc];
            Xr(n.primary.doc, function (e) {
                r.push(e)
            });
            for (var i = 0; i < n.markers.length; i++) {
                var o = n.markers[i];
                Ri(r, o.doc) == -1 && (o.parent = null, n.markers.splice(i--, 1))
            }
        }
    }

    function Jn(e, t, n) {
        this.marker = e, this.from = t, this.to = n
    }

    function er(e, t) {
        if (e)
            for (var n = 0; n < e.length; ++n) {
                var r = e[n];
                if (r.marker == t)
                    return r
            }
    }

    function tr(e, t) {
        for (var n, r = 0; r < e.length; ++r)
            e[r] != t && (n || (n = [])).push(e[r]);
        return n
    }

    function nr(e, t) {
        e.markedSpans = e.markedSpans ? e.markedSpans.concat([t]) : [t], t.marker.attachLine(e)
    }

    function rr(e, t, n) {
        if (e)
            for (var r, i = 0; i < e.length; ++i) {
                var o = e[i],
                        a = o.marker,
                        s = null == o.from || (a.inclusiveLeft ? o.from <= t : o.from < t);
                if (s || o.from == t && "bookmark" == a.type && (!n || !o.marker.insertLeft)) {
                    var l = null == o.to || (a.inclusiveRight ? o.to >= t : o.to > t);
                    (r || (r = [])).push(new Jn(a, o.from, l ? null : o.to))
                }
            }
        return r
    }

    function ir(e, t, n) {
        if (e)
            for (var r, i = 0; i < e.length; ++i) {
                var o = e[i],
                        a = o.marker,
                        s = null == o.to || (a.inclusiveRight ? o.to >= t : o.to > t);
                if (s || o.from == t && "bookmark" == a.type && (!n || o.marker.insertLeft)) {
                    var l = null == o.from || (a.inclusiveLeft ? o.from <= t : o.from < t);
                    (r || (r = [])).push(new Jn(a, l ? null : o.from - t, null == o.to ? null : o.to - t))
                }
            }
        return r
    }

    function or(e, t) {
        if (t.full)
            return null;
        var n = ve(e, t.from.line) && Zr(e, t.from.line).markedSpans,
                r = ve(e, t.to.line) && Zr(e, t.to.line).markedSpans;
        if (!n && !r)
            return null;
        var i = t.from.ch,
                o = t.to.ch,
                a = 0 == Wo(t.from, t.to),
                s = rr(n, i, a),
                l = ir(r, o, a),
                c = 1 == t.text.length,
                u = Ii(t.text).length + (c ? i : 0);
        if (s)
            for (var f = 0; f < s.length; ++f) {
                var d = s[f];
                if (null == d.to) {
                    var p = er(l, d.marker);
                    p ? c && (d.to = null == p.to ? null : p.to + u) : d.to = i
                }
            }
        if (l)
            for (var f = 0; f < l.length; ++f) {
                var d = l[f];
                if (null != d.to && (d.to += u), null == d.from) {
                    var p = er(s, d.marker);
                    p || (d.from = u, c && (s || (s = [])).push(d))
                } else
                    d.from += u, c && (s || (s = [])).push(d)
            }
        s && (s = ar(s)), l && l != s && (l = ar(l));
        var h = [s];
        if (!c) {
            var m, g = t.text.length - 2;
            if (g > 0 && s)
                for (var f = 0; f < s.length; ++f)
                    null == s[f].to && (m || (m = [])).push(new Jn(s[f].marker, null, null));
            for (var f = 0; f < g; ++f)
                h.push(m);
            h.push(l)
        }
        return h
    }

    function ar(e) {
        for (var t = 0; t < e.length; ++t) {
            var n = e[t];
            null != n.from && n.from == n.to && n.marker.clearWhenEmpty !== !1 && e.splice(t--, 1)
        }
        return e.length ? e : null
    }

    function sr(e, t) {
        var n = mi(e, t),
                r = or(e, t);
        if (!n)
            return r;
        if (!r)
            return n;
        for (var i = 0; i < n.length; ++i) {
            var o = n[i],
                    a = r[i];
            if (o && a)
                e: for (var s = 0; s < a.length; ++s) {
                    for (var l = a[s], c = 0; c < o.length; ++c)
                        if (o[c].marker == l.marker)
                            continue e;
                    o.push(l)
                }
            else
                a && (n[i] = a)
        }
        return n
    }

    function lr(e, t, n) {
        var r = null;
        if (e.iter(t.line, n.line + 1, function (e) {
            if (e.markedSpans)
                for (var t = 0; t < e.markedSpans.length; ++t) {
                    var n = e.markedSpans[t].marker;
                    !n.readOnly || r && Ri(r, n) != -1 || (r || (r = [])).push(n)
                }
        }), !r)
            return null;
        for (var i = [{
                from: t,
                to: n
            }], o = 0; o < r.length; ++o)
            for (var a = r[o], s = a.find(0), l = 0; l < i.length; ++l) {
                var c = i[l];
                if (!(Wo(c.to, s.from) < 0 || Wo(c.from, s.to) > 0)) {
                    var u = [l, 1],
                            f = Wo(c.from, s.from),
                            d = Wo(c.to, s.to);
                    (f < 0 || !a.inclusiveLeft && !f) && u.push({
                        from: c.from,
                        to: s.from
                    }), (d > 0 || !a.inclusiveRight && !d) && u.push({
                        from: s.to,
                        to: c.to
                    }), i.splice.apply(i, u), l += u.length - 1
                }
            }
        return i
    }

    function cr(e) {
        var t = e.markedSpans;
        if (t) {
            for (var n = 0; n < t.length; ++n)
                t[n].marker.detachLine(e);
            e.markedSpans = null
        }
    }

    function ur(e, t) {
        if (t) {
            for (var n = 0; n < t.length; ++n)
                t[n].marker.attachLine(e);
            e.markedSpans = t
        }
    }

    function fr(e) {
        return e.inclusiveLeft ? -1 : 0
    }

    function dr(e) {
        return e.inclusiveRight ? 1 : 0
    }

    function pr(e, t) {
        var n = e.lines.length - t.lines.length;
        if (0 != n)
            return n;
        var r = e.find(),
                i = t.find(),
                o = Wo(r.from, i.from) || fr(e) - fr(t);
        if (o)
            return -o;
        var a = Wo(r.to, i.to) || dr(e) - dr(t);
        return a ? a : t.id - e.id
    }

    function hr(e, t) {
        var n, r = Do && e.markedSpans;
        if (r)
            for (var i, o = 0; o < r.length; ++o)
                i = r[o], i.marker.collapsed && null == (t ? i.from : i.to) && (!n || pr(n, i.marker) < 0) && (n = i.marker);
        return n
    }

    function mr(e) {
        return hr(e, !0)
    }

    function gr(e) {
        return hr(e, !1)
    }

    function vr(e, t, n, r, i) {
        var o = Zr(e, t),
                a = Do && o.markedSpans;
        if (a)
            for (var s = 0; s < a.length; ++s) {
                var l = a[s];
                if (l.marker.collapsed) {
                    var c = l.marker.find(0),
                            u = Wo(c.from, n) || fr(l.marker) - fr(i),
                            f = Wo(c.to, r) || dr(l.marker) - dr(i);
                    if (!(u >= 0 && f <= 0 || u <= 0 && f >= 0) && (u <= 0 && (Wo(c.to, n) > 0 || l.marker.inclusiveRight && i.inclusiveLeft) || u >= 0 && (Wo(c.from, r) < 0 || l.marker.inclusiveLeft && i.inclusiveRight)))
                        return !0
                }
            }
    }

    function yr(e) {
        for (var t; t = mr(e); )
            e = t.find(-1, !0).line;
        return e
    }

    function _r(e) {
        for (var t, n; t = gr(e); )
            e = t.find(1, !0).line, (n || (n = [])).push(e);
        return n
    }

    function br(e, t) {
        var n = Zr(e, t),
                r = yr(n);
        return n == r ? t : ti(r)
    }

    function wr(e, t) {
        if (t > e.lastLine())
            return t;
        var n, r = Zr(e, t);
        if (!kr(e, r))
            return t;
        for (; n = gr(r); )
            r = n.find(1, !0).line;
        return ti(r) + 1
    }

    function kr(e, t) {
        var n = Do && t.markedSpans;
        if (n)
            for (var r, i = 0; i < n.length; ++i)
                if (r = n[i], r.marker.collapsed) {
                    if (null == r.from)
                        return !0;
                    if (!r.marker.widgetNode && 0 == r.from && r.marker.inclusiveLeft && xr(e, t, r))
                        return !0
                }
    }

    function xr(e, t, n) {
        if (null == n.to) {
            var r = n.marker.find(1, !0);
            return xr(e, r.line, er(r.line.markedSpans, n.marker))
        }
        if (n.marker.inclusiveRight && n.to == t.text.length)
            return !0;
        for (var i, o = 0; o < t.markedSpans.length; ++o)
            if (i = t.markedSpans[o], i.marker.collapsed && !i.marker.widgetNode && i.from == n.to && (null == i.to || i.to != n.from) && (i.marker.inclusiveLeft || n.marker.inclusiveRight) && xr(e, t, i))
                return !0
    }

    function Cr(e, t, n) {
        ri(t) < (e.curOp && e.curOp.scrollTop || e.doc.scrollTop) && Dn(e, null, n)
    }

    function Sr(e) {
        if (null != e.height)
            return e.height;
        var t = e.doc.cm;
        if (!t)
            return 0;
        if (!Ga(document.body, e.node)) {
            var n = "position: relative;";
            e.coverGutter && (n += "margin-left: -" + t.display.gutters.offsetWidth + "px;"), e.noHScroll && (n += "width: " + t.display.wrapper.clientWidth + "px;"), $i(t.display.measure, qi("div", [e.node], null, n))
        }
        return e.height = e.node.parentNode.offsetHeight
    }

    function Lr(e, t, n, r) {
        var i = new _a(e, n, r),
                o = e.cm;
        return o && i.noHScroll && (o.display.alignWidgets = !0), Bn(e, t, "widget", function (t) {
            var n = t.widgets || (t.widgets = []);
            if (null == i.insertAt ? n.push(i) : n.splice(Math.min(n.length - 1, Math.max(0, i.insertAt)), 0, i), i.line = t, o && !kr(e, t)) {
                var r = ri(t) < e.scrollTop;
                ei(t, t.height + Sr(i)), r && Dn(o, null, i.height), o.curOp.forceUpdate = !0
            }
            return !0
        }), i
    }

    function Mr(e, t, n, r) {
        e.text = t, e.stateAfter && (e.stateAfter = null), e.styles && (e.styles = null), null != e.order && (e.order = null), cr(e), ur(e, n);
        var i = r ? r(e) : 1;
        i != e.height && ei(e, i)
    }

    function Tr(e) {
        e.parent = null, cr(e)
    }

    function Ar(e, t) {
        if (e)
            for (; ; ) {
                var n = e.match(/(?:^|\s+)line-(background-)?(\S+)/);
                if (!n)
                    break;
                e = e.slice(0, n.index) + e.slice(n.index + n[0].length);
                var r = n[1] ? "bgClass" : "textClass";
                null == t[r] ? t[r] = n[2] : new RegExp("(?:^|s)" + n[2] + "(?:$|s)").test(t[r]) || (t[r] += " " + n[2])
            }
        return e
    }

    function Er(t, n) {
        if (t.blankLine)
            return t.blankLine(n);
        if (t.innerMode) {
            var r = e.innerMode(t, n);
            return r.mode.blankLine ? r.mode.blankLine(r.state) : void 0
        }
    }

    function Or(t, n, r, i) {
        for (var o = 0; o < 10; o++) {
            i && (i[0] = e.innerMode(t, r).mode);
            var a = t.token(n, r);
            if (n.pos > n.start)
                return a
        }
        throw new Error("Mode " + t.name + " failed to advance stream.")
    }

    function Ir(e, t, n, r) {
        function i(e) {
            return {
                start: f.start,
                end: f.pos,
                string: f.current(),
                type: o || null,
                state: e ? la(a.mode, u) : u
            }
        }
        var o, a = e.doc,
                s = a.mode;
        t = me(a, t);
        var l, c = Zr(a, t.line),
                u = qe(e, t.line, n),
                f = new ma(c.text, e.options.tabSize);
        for (r && (l = []);
                (r || f.pos < t.ch) && !f.eol(); )
            f.start = f.pos, o = Or(s, f, u), r && l.push(i(!0));
        return r ? l : i()
    }

    function Rr(e, t, n, r, i, o, a) {
        var s = n.flattenSpans;
        null == s && (s = e.options.flattenSpans);
        var l, c = 0,
                u = null,
                f = new ma(t, e.options.tabSize),
                d = e.options.addModeClass && [null];
        for ("" == t && Ar(Er(n, r), o); !f.eol(); ) {
            if (f.pos > e.options.maxHighlightLength ? (s = !1, a && zr(e, t, r, f.pos), f.pos = t.length, l = null) : l = Ar(Or(n, f, r, d), o), d) {
                var p = d[0].name;
                p && (l = "m-" + (l ? p + " " + l : p))
            }
            if (!s || u != l) {
                for (; c < f.start; )
                    c = Math.min(f.start, c + 5e4), i(c, u);
                u = l
            }
            f.start = f.pos
        }
        for (; c < f.pos; ) {
            var h = Math.min(f.pos, c + 5e4);
            i(h, u), c = h
        }
    }

    function Nr(e, t, n, r) {
        var i = [e.state.modeGen],
                o = {};
        Rr(e, t.text, e.doc.mode, n, function (e, t) {
            i.push(e, t)
        }, o, r);
        for (var a = 0; a < e.state.overlays.length; ++a) {
            var s = e.state.overlays[a],
                    l = 1,
                    c = 0;
            Rr(e, t.text, s.mode, !0, function (e, t) {
                for (var n = l; c < e; ) {
                    var r = i[l];
                    r > e && i.splice(l, 1, e, i[l + 1], r), l += 2, c = Math.min(e, r)
                }
                if (t)
                    if (s.opaque)
                        i.splice(n, l - n, e, "cm-overlay " + t), l = n + 2;
                    else
                        for (; n < l; n += 2) {
                            var o = i[n + 1];
                            i[n + 1] = (o ? o + " " : "") + "cm-overlay " + t
                        }
            }, o)
        }
        return {
            styles: i,
            classes: o.bgClass || o.textClass ? o : null
        }
    }

    function Pr(e, t, n) {
        if (!t.styles || t.styles[0] != e.state.modeGen) {
            var r = qe(e, ti(t)),
                    i = Nr(e, t, t.text.length > e.options.maxHighlightLength ? la(e.doc.mode, r) : r);
            t.stateAfter = r, t.styles = i.styles, i.classes ? t.styleClasses = i.classes : t.styleClasses && (t.styleClasses = null), n === e.doc.frontier && e.doc.frontier++
        }
        return t.styles
    }

    function zr(e, t, n, r) {
        var i = e.doc.mode,
                o = new ma(t, e.options.tabSize);
        for (o.start = o.pos = r || 0, "" == t && Er(i, n); !o.eol(); )
            Or(i, o, n), o.start = o.pos
    }

    function Dr(e, t) {
        if (!e || /^\s*$/.test(e))
            return null;
        var n = t.addModeClass ? ka : wa;
        return n[e] || (n[e] = e.replace(/\S+/g, "cm-$&"))
    }

    function Fr(e, t) {
        var n = qi("span", null, null, wo ? "padding-right: .1px" : null),
                r = {
                    pre: qi("pre", [n], "CodeMirror-line"),
                    content: n,
                    col: 0,
                    pos: 0,
                    cm: e,
                    splitSpaces: (_o || wo) && e.getOption("lineWrapping")
                };
        t.measure = {};
        for (var i = 0; i <= (t.rest ? t.rest.length : 0); i++) {
            var o, a = i ? t.rest[i - 1] : t.line;
            r.pos = 0, r.addToken = Hr, Qi(e.display.measure) && (o = ii(a)) && (r.addToken = qr(r.addToken, o)), r.map = [];
            var s = t != e.display.externalMeasured && ti(a);
            $r(a, r, Pr(e, a, s)), a.styleClasses && (a.styleClasses.bgClass && (r.bgClass = Vi(a.styleClasses.bgClass, r.bgClass || "")), a.styleClasses.textClass && (r.textClass = Vi(a.styleClasses.textClass, r.textClass || ""))), 0 == r.map.length && r.map.push(0, 0, r.content.appendChild(Zi(e.display.measure))), 0 == i ? (t.measure.map = r.map, t.measure.cache = {}) : ((t.measure.maps || (t.measure.maps = [])).push(r.map), (t.measure.caches || (t.measure.caches = [])).push({}))
        }
        return wo && /\bcm-tab\b/.test(r.content.lastChild.className) && (r.content.className = "cm-tab-wrap-hack"), Ra(e, "renderLine", e, t.line, r.pre), r.pre.className && (r.textClass = Vi(r.pre.className, r.textClass || "")), r
    }

    function Wr(e) {
        var t = qi("span", "•", "cm-invalidchar");
        return t.title = "\\u" + e.charCodeAt(0).toString(16), t.setAttribute("aria-label", t.title), t
    }

    function Hr(e, t, n, r, i, o, a) {
        if (t) {
            var s = e.splitSpaces ? t.replace(/ {3,}/g, Br) : t,
                    l = e.cm.state.specialChars,
                    c = !1;
            if (l.test(t))
                for (var u = document.createDocumentFragment(), f = 0; ; ) {
                    l.lastIndex = f;
                    var d = l.exec(t),
                            p = d ? d.index - f : t.length - f;
                    if (p) {
                        var h = document.createTextNode(s.slice(f, f + p));
                        _o && bo < 9 ? u.appendChild(qi("span", [h])) : u.appendChild(h), e.map.push(e.pos, e.pos + p, h), e.col += p, e.pos += p
                    }
                    if (!d)
                        break;
                    if (f += p + 1, "\t" == d[0]) {
                        var m = e.cm.options.tabSize,
                                g = m - e.col % m,
                                h = u.appendChild(qi("span", Oi(g), "cm-tab"));
                        h.setAttribute("role", "presentation"), h.setAttribute("cm-text", "\t"), e.col += g
                    } else if ("\r" == d[0] || "\n" == d[0]) {
                        var h = u.appendChild(qi("span", "\r" == d[0] ? "␍" : "␤", "cm-invalidchar"));
                        h.setAttribute("cm-text", d[0]), e.col += 1
                    } else {
                        var h = e.cm.options.specialCharPlaceholder(d[0]);
                        h.setAttribute("cm-text", d[0]), _o && bo < 9 ? u.appendChild(qi("span", [h])) : u.appendChild(h), e.col += 1
                    }
                    e.map.push(e.pos, e.pos + 1, h), e.pos++
                }
            else {
                e.col += t.length;
                var u = document.createTextNode(s);
                e.map.push(e.pos, e.pos + t.length, u), _o && bo < 9 && (c = !0), e.pos += t.length
            }
            if (n || r || i || c || a) {
                var v = n || "";
                r && (v += r), i && (v += i);
                var y = qi("span", [u], v, a);
                return o && (y.title = o), e.content.appendChild(y)
            }
            e.content.appendChild(u)
        }
    }

    function Br(e) {
        for (var t = " ", n = 0; n < e.length - 2; ++n)
            t += n % 2 ? " " : " ";
        return t += " "
    }

    function qr(e, t) {
        return function (n, r, i, o, a, s, l) {
            i = i ? i + " cm-force-border" : "cm-force-border";
            for (var c = n.pos, u = c + r.length; ; ) {
                for (var f = 0; f < t.length; f++) {
                    var d = t[f];
                    if (d.to > c && d.from <= c)
                        break
                }
                if (d.to >= u)
                    return e(n, r, i, o, a, s, l);
                e(n, r.slice(0, d.to - c), i, o, null, s, l), o = null, r = r.slice(d.to - c), c = d.to
            }
        }
    }

    function Ur(e, t, n, r) {
        var i = !r && n.widgetNode;
        i && e.map.push(e.pos, e.pos + t, i), !r && e.cm.display.input.needsContentAttribute && (i || (i = e.content.appendChild(document.createElement("span"))), i.setAttribute("cm-marker", n.id)), i && (e.cm.display.input.setUneditable(i), e.content.appendChild(i)), e.pos += t
    }

    function $r(e, t, n) {
        var r = e.markedSpans,
                i = e.text,
                o = 0;
        if (r)
            for (var a, s, l, c, u, f, d, p = i.length, h = 0, m = 1, g = "", v = 0; ; ) {
                if (v == h) {
                    l = c = u = f = s = "", d = null, v = 1 / 0;
                    for (var y, _ = [], b = 0; b < r.length; ++b) {
                        var w = r[b],
                                k = w.marker;
                        "bookmark" == k.type && w.from == h && k.widgetNode ? _.push(k) : w.from <= h && (null == w.to || w.to > h || k.collapsed && w.to == h && w.from == h) ? (null != w.to && w.to != h && v > w.to && (v = w.to, c = ""), k.className && (l += " " + k.className), k.css && (s = (s ? s + ";" : "") + k.css), k.startStyle && w.from == h && (u += " " + k.startStyle), k.endStyle && w.to == v && (y || (y = [])).push(k.endStyle, w.to), k.title && !f && (f = k.title), k.collapsed && (!d || pr(d.marker, k) < 0) && (d = w)) : w.from > h && v > w.from && (v = w.from)
                    }
                    if (y)
                        for (var b = 0; b < y.length; b += 2)
                            y[b + 1] == v && (c += " " + y[b]);
                    if (!d || d.from == h)
                        for (var b = 0; b < _.length; ++b)
                            Ur(t, 0, _[b]);
                    if (d && (d.from || 0) == h) {
                        if (Ur(t, (null == d.to ? p + 1 : d.to) - h, d.marker, null == d.from), null == d.to)
                            return;
                        d.to == h && (d = !1)
                    }
                }
                if (h >= p)
                    break;
                for (var x = Math.min(p, v); ; ) {
                    if (g) {
                        var C = h + g.length;
                        if (!d) {
                            var S = C > x ? g.slice(0, x - h) : g;
                            t.addToken(t, S, a ? a + l : l, u, h + S.length == v ? c : "", f, s)
                        }
                        if (C >= x) {
                            g = g.slice(x - h), h = x;
                            break
                        }
                        h = C, u = ""
                    }
                    g = i.slice(o, o = n[m++]), a = Dr(n[m++], t.cm.options)
                }
            }
        else
            for (var m = 1; m < n.length; m += 2)
                t.addToken(t, i.slice(o, o = n[m]), Dr(n[m + 1], t.cm.options))
    }

    function jr(e, t) {
        return 0 == t.from.ch && 0 == t.to.ch && "" == Ii(t.text) && (!e.cm || e.cm.options.wholeLineUpdateBefore)
    }

    function Kr(e, t, n, r) {
        function i(e) {
            return n ? n[e] : null
        }

        function o(e, n, i) {
            Mr(e, n, i, r), Ci(e, "change", e, t)
        }

        function a(e, t) {
            for (var n = e, o = []; n < t; ++n)
                o.push(new ba(c[n], i(n), r));
            return o
        }
        var s = t.from,
                l = t.to,
                c = t.text,
                u = Zr(e, s.line),
                f = Zr(e, l.line),
                d = Ii(c),
                p = i(c.length - 1),
                h = l.line - s.line;
        if (t.full)
            e.insert(0, a(0, c.length)), e.remove(c.length, e.size - c.length);
        else if (jr(e, t)) {
            var m = a(0, c.length - 1);
            o(f, f.text, p), h && e.remove(s.line, h), m.length && e.insert(s.line, m)
        } else if (u == f)
            if (1 == c.length)
                o(u, u.text.slice(0, s.ch) + d + u.text.slice(l.ch), p);
            else {
                var m = a(1, c.length - 1);
                m.push(new ba(d + u.text.slice(l.ch), p, r)), o(u, u.text.slice(0, s.ch) + c[0], i(0)), e.insert(s.line + 1, m)
            }
        else if (1 == c.length)
            o(u, u.text.slice(0, s.ch) + c[0] + f.text.slice(l.ch), i(0)), e.remove(s.line + 1, h);
        else {
            o(u, u.text.slice(0, s.ch) + c[0], i(0)), o(f, d + f.text.slice(l.ch), p);
            var m = a(1, c.length - 1);
            h > 1 && e.remove(s.line + 1, h - 1), e.insert(s.line + 1, m)
        }
        Ci(e, "change", e, t)
    }

    function Vr(e) {
        this.lines = e, this.parent = null;
        for (var t = 0, n = 0; t < e.length; ++t)
            e[t].parent = this, n += e[t].height;
        this.height = n
    }

    function Gr(e) {
        this.children = e;
        for (var t = 0, n = 0, r = 0; r < e.length; ++r) {
            var i = e[r];
            t += i.chunkSize(), n += i.height, i.parent = this
        }
        this.size = t, this.height = n, this.parent = null
    }

    function Xr(e, t, n) {
        function r(e, i, o) {
            if (e.linked)
                for (var a = 0; a < e.linked.length; ++a) {
                    var s = e.linked[a];
                    if (s.doc != i) {
                        var l = o && s.sharedHist;
                        n && !l || (t(s.doc, l), r(s.doc, e, l))
                    }
                }
        }
        r(e, null, !0)
    }

    function Yr(e, t) {
        if (t.cm)
            throw new Error("This document is already in use.");
        e.doc = t, t.cm = e, a(e), n(e), e.options.lineWrapping || d(e), e.options.mode = t.modeOption, Pt(e)
    }

    function Zr(e, t) {
        if (t -= e.first, t < 0 || t >= e.size)
            throw new Error("There is no line " + (t + e.first) + " in the document.");
        for (var n = e; !n.lines; )
            for (var r = 0; ; ++r) {
                var i = n.children[r],
                        o = i.chunkSize();
                if (t < o) {
                    n = i;
                    break
                }
                t -= o
            }
        return n.lines[t]
    }

    function Qr(e, t, n) {
        var r = [],
                i = t.line;
        return e.iter(t.line, n.line + 1, function (e) {
            var o = e.text;
            i == n.line && (o = o.slice(0, n.ch)), i == t.line && (o = o.slice(t.ch)), r.push(o), ++i
        }), r
    }

    function Jr(e, t, n) {
        var r = [];
        return e.iter(t, n, function (e) {
            r.push(e.text)
        }), r
    }

    function ei(e, t) {
        var n = t - e.height;
        if (n)
            for (var r = e; r; r = r.parent)
                r.height += n
    }

    function ti(e) {
        if (null == e.parent)
            return null;
        for (var t = e.parent, n = Ri(t.lines, e), r = t.parent; r; t = r, r = r.parent)
            for (var i = 0; r.children[i] != t; ++i)
                n += r.children[i].chunkSize();
        return n + t.first
    }

    function ni(e, t) {
        var n = e.first;
        e: do {
            for (var r = 0; r < e.children.length; ++r) {
                var i = e.children[r],
                        o = i.height;
                if (t < o) {
                    e = i;
                    continue e
                }
                t -= o, n += i.chunkSize()
            }
            return n
        } while (!e.lines);
        for (var r = 0; r < e.lines.length; ++r) {
            var a = e.lines[r],
                    s = a.height;
            if (t < s)
                break;
            t -= s
        }
        return n + r
    }

    function ri(e) {
        e = yr(e);
        for (var t = 0, n = e.parent, r = 0; r < n.lines.length; ++r) {
            var i = n.lines[r];
            if (i == e)
                break;
            t += i.height
        }
        for (var o = n.parent; o; n = o, o = n.parent)
            for (var r = 0; r < o.children.length; ++r) {
                var a = o.children[r];
                if (a == n)
                    break;
                t += a.height
            }
        return t
    }

    function ii(e) {
        var t = e.order;
        return null == t && (t = e.order = ss(e.text)), t
    }

    function oi(e) {
        this.done = [], this.undone = [], this.undoDepth = 1 / 0, this.lastModTime = this.lastSelTime = 0, this.lastOp = this.lastSelOp = null, this.lastOrigin = this.lastSelOrigin = null, this.generation = this.maxGeneration = e || 1
    }

    function ai(e, t) {
        var n = {
            from: V(t.from),
            to: Jo(t),
            text: Qr(e, t.from, t.to)
        };
        return pi(e, n, t.from.line, t.to.line + 1), Xr(e, function (e) {
            pi(e, n, t.from.line, t.to.line + 1)
        }, !0), n
    }

    function si(e) {
        for (; e.length; ) {
            var t = Ii(e);
            if (!t.ranges)
                break;
            e.pop()
        }
    }

    function li(e, t) {
        return t ? (si(e.done), Ii(e.done)) : e.done.length && !Ii(e.done).ranges ? Ii(e.done) : e.done.length > 1 && !e.done[e.done.length - 2].ranges ? (e.done.pop(), Ii(e.done)) : void 0
    }

    function ci(e, t, n, r) {
        var i = e.history;
        i.undone.length = 0;
        var o, a = +new Date;
        if ((i.lastOp == r || i.lastOrigin == t.origin && t.origin && ("+" == t.origin.charAt(0) && e.cm && i.lastModTime > a - e.cm.options.historyEventDelay || "*" == t.origin.charAt(0))) && (o = li(i, i.lastOp == r))) {
            var s = Ii(o.changes);
            0 == Wo(t.from, t.to) && 0 == Wo(t.from, s.to) ? s.to = Jo(t) : o.changes.push(ai(e, t))
        } else {
            var l = Ii(i.done);
            for (l && l.ranges || di(e.sel, i.done), o = {
            changes: [ai(e, t)],
                    generation: i.generation
            }, i.done.push(o); i.done.length > i.undoDepth; )
                i.done.shift(), i.done[0].ranges || i.done.shift()
        }
        i.done.push(n), i.generation = ++i.maxGeneration, i.lastModTime = i.lastSelTime = a, i.lastOp = i.lastSelOp = r, i.lastOrigin = i.lastSelOrigin = t.origin, s || Ra(e, "historyAdded")
    }

    function ui(e, t, n, r) {
        var i = t.charAt(0);
        return "*" == i || "+" == i && n.ranges.length == r.ranges.length && n.somethingSelected() == r.somethingSelected() && new Date - e.history.lastSelTime <= (e.cm ? e.cm.options.historyEventDelay : 500)
    }

    function fi(e, t, n, r) {
        var i = e.history,
                o = r && r.origin;
        n == i.lastSelOp || o && i.lastSelOrigin == o && (i.lastModTime == i.lastSelTime && i.lastOrigin == o || ui(e, o, Ii(i.done), t)) ? i.done[i.done.length - 1] = t : di(t, i.done), i.lastSelTime = +new Date, i.lastSelOrigin = o, i.lastSelOp = n, r && r.clearRedo !== !1 && si(i.undone)
    }

    function di(e, t) {
        var n = Ii(t);
        n && n.ranges && n.equals(e) || t.push(e)
    }

    function pi(e, t, n, r) {
        var i = t["spans_" + e.id],
                o = 0;
        e.iter(Math.max(e.first, n), Math.min(e.first + e.size, r), function (n) {
            n.markedSpans && ((i || (i = t["spans_" + e.id] = {}))[o] = n.markedSpans), ++o
        })
    }

    function hi(e) {
        if (!e)
            return null;
        for (var t, n = 0; n < e.length; ++n)
            e[n].marker.explicitlyCleared ? t || (t = e.slice(0, n)) : t && t.push(e[n]);
        return t ? t.length ? t : null : e
    }

    function mi(e, t) {
        var n = t["spans_" + e.id];
        if (!n)
            return null;
        for (var r = 0, i = []; r < t.text.length; ++r)
            i.push(hi(n[r]));
        return i
    }

    function gi(e, t, n) {
        for (var r = 0, i = []; r < e.length; ++r) {
            var o = e[r];
            if (o.ranges)
                i.push(n ? ue.prototype.deepCopy.call(o) : o);
            else {
                var a = o.changes,
                        s = [];
                i.push({
                    changes: s
                });
                for (var l = 0; l < a.length; ++l) {
                    var c, u = a[l];
                    if (s.push({
                        from: u.from,
                        to: u.to,
                        text: u.text
                    }), t)
                        for (var f in u)
                            (c = f.match(/^spans_(\d+)$/)) && Ri(t, Number(c[1])) > -1 && (Ii(s)[f] = u[f], delete u[f])
                }
            }
        }
        return i
    }

    function vi(e, t, n, r) {
        n < e.line ? e.line += r : t < e.line && (e.line = t, e.ch = 0)
    }

    function yi(e, t, n, r) {
        for (var i = 0; i < e.length; ++i) {
            var o = e[i],
                    a = !0;
            if (o.ranges) {
                o.copied || (o = e[i] = o.deepCopy(), o.copied = !0);
                for (var s = 0; s < o.ranges.length; s++)
                    vi(o.ranges[s].anchor, t, n, r), vi(o.ranges[s].head, t, n, r)
            } else {
                for (var s = 0; s < o.changes.length; ++s) {
                    var l = o.changes[s];
                    if (n < l.from.line)
                        l.from = Fo(l.from.line + r, l.from.ch), l.to = Fo(l.to.line + r, l.to.ch);
                    else if (t <= l.to.line) {
                        a = !1;
                        break
                    }
                }
                a || (e.splice(0, i + 1), i = 0)
            }
        }
    }

    function _i(e, t) {
        var n = t.from.line,
                r = t.to.line,
                i = t.text.length - (r - n) - 1;
        yi(e.done, n, r, i), yi(e.undone, n, r, i)
    }

    function bi(e) {
        return null != e.defaultPrevented ? e.defaultPrevented : 0 == e.returnValue
    }

    function wi(e) {
        return e.target || e.srcElement
    }

    function ki(e) {
        var t = e.which;
        return null == t && (1 & e.button ? t = 1 : 2 & e.button ? t = 3 : 4 & e.button && (t = 2)), Eo && e.ctrlKey && 1 == t && (t = 3), t
    }

    function xi(e, t, n) {
        var r = e._handlers && e._handlers[t];
        return n ? r && r.length > 0 ? r.slice() : Oa : r || Oa
    }

    function Ci(e, t) {
        function n(e) {
            return function () {
                e.apply(null, o)
            }
        }
        var r = xi(e, t, !1);
        if (r.length) {
            var i, o = Array.prototype.slice.call(arguments, 2);
            jo ? i = jo.delayedCallbacks : Na ? i = Na : (i = Na = [], setTimeout(Si, 0));
            for (var a = 0; a < r.length; ++a)
                i.push(n(r[a]))
        }
    }

    function Si() {
        var e = Na;
        Na = null;
        for (var t = 0; t < e.length; ++t)
            e[t]()
    }

    function Li(e, t, n) {
        return "string" == typeof t && (t = {
            type: t,
            preventDefault: function () {
                this.defaultPrevented = !0
            }
        }), Ra(e, n || t.type, e, t), bi(t) || t.codemirrorIgnore
    }

    function Mi(e) {
        var t = e._handlers && e._handlers.cursorActivity;
        if (t)
            for (var n = e.curOp.cursorActivityHandlers || (e.curOp.cursorActivityHandlers = []), r = 0; r < t.length; ++r)
                Ri(n, t[r]) == -1 && n.push(t[r])
    }

    function Ti(e, t) {
        return xi(e, t).length > 0
    }

    function Ai(e) {
        e.prototype.on = function (e, t) {
            Ea(this, e, t)
        }, e.prototype.off = function (e, t) {
            Ia(this, e, t)
        }
    }

    function Ei() {
        this.id = null
    }

    function Oi(e) {
        for (; qa.length <= e; )
            qa.push(Ii(qa) + " ");
        return qa[e]
    }

    function Ii(e) {
        return e[e.length - 1]
    }

    function Ri(e, t) {
        for (var n = 0; n < e.length; ++n)
            if (e[n] == t)
                return n;
        return -1
    }

    function Ni(e, t) {
        for (var n = [], r = 0; r < e.length; r++)
            n[r] = t(e[r], r);
        return n
    }

    function Pi() {}

    function zi(e, t) {
        var n;
        return Object.create ? n = Object.create(e) : (Pi.prototype = e, n = new Pi), t && Di(t, n), n
    }

    function Di(e, t, n) {
        t || (t = {});
        for (var r in e)
            !e.hasOwnProperty(r) || n === !1 && t.hasOwnProperty(r) || (t[r] = e[r]);
        return t
    }

    function Fi(e) {
        var t = Array.prototype.slice.call(arguments, 1);
        return function () {
            return e.apply(null, t)
        }
    }

    function Wi(e, t) {
        return t ? !!(t.source.indexOf("\\w") > -1 && Ka(e)) || t.test(e) : Ka(e)
    }

    function Hi(e) {
        for (var t in e)
            if (e.hasOwnProperty(t) && e[t])
                return !1;
        return !0
    }

    function Bi(e) {
        return e.charCodeAt(0) >= 768 && Va.test(e)
    }

    function qi(e, t, n, r) {
        var i = document.createElement(e);
        if (n && (i.className = n), r && (i.style.cssText = r), "string" == typeof t)
            i.appendChild(document.createTextNode(t));
        else if (t)
            for (var o = 0; o < t.length; ++o)
                i.appendChild(t[o]);
        return i
    }

    function Ui(e) {
        for (var t = e.childNodes.length; t > 0; --t)
            e.removeChild(e.firstChild);
        return e
    }

    function $i(e, t) {
        return Ui(e).appendChild(t)
    }

    function ji() {
        for (var e = document.activeElement; e && e.root && e.root.activeElement; )
            e = e.root.activeElement;
        return e
    }

    function Ki(e) {
        return new RegExp("(^|\\s)" + e + "(?:$|\\s)\\s*")
    }

    function Vi(e, t) {
        for (var n = e.split(" "), r = 0; r < n.length; r++)
            n[r] && !Ki(n[r]).test(t) && (t += " " + n[r]);
        return t
    }

    function Gi(e) {
        if (document.body.getElementsByClassName)
            for (var t = document.body.getElementsByClassName("CodeMirror"), n = 0; n < t.length; n++) {
                var r = t[n].CodeMirror;
                r && e(r)
            }
    }

    function Xi() {
        Ja || (Yi(), Ja = !0)
    }

    function Yi() {
        var e;
        Ea(window, "resize", function () {
            null == e && (e = setTimeout(function () {
                e = null, Gi($t)
            }, 100))
        }), Ea(window, "blur", function () {
            Gi(yn)
        })
    }

    function Zi(e) {
        if (null == Xa) {
            var t = qi("span", "​");
            $i(e, qi("span", [t, document.createTextNode("x")])), 0 != e.firstChild.offsetHeight && (Xa = t.offsetWidth <= 1 && t.offsetHeight > 2 && !(_o && bo < 8))
        }
        var n = Xa ? qi("span", "​") : qi("span", " ", null, "display: inline-block; width: 1px; margin-right: -1px");
        return n.setAttribute("cm-text", ""), n
    }

    function Qi(e) {
        if (null != Ya)
            return Ya;
        var t = $i(e, document.createTextNode("AخA")),
                n = $a(t, 0, 1).getBoundingClientRect();
        if (!n || n.left == n.right)
            return !1;
        var r = $a(t, 1, 2).getBoundingClientRect();
        return Ya = r.right - n.right < 3
    }

    function Ji(e) {
        if (null != is)
            return is;
        var t = $i(e, qi("span", "x")),
                n = t.getBoundingClientRect(),
                r = $a(t, 0, 1).getBoundingClientRect();
        return is = Math.abs(n.left - r.left) > 1
    }

    function eo(e, t, n, r) {
        if (!e)
            return r(t, n, "ltr");
        for (var i = !1, o = 0; o < e.length; ++o) {
            var a = e[o];
            (a.from < n && a.to > t || t == n && a.to == t) && (r(Math.max(a.from, t), Math.min(a.to, n), 1 == a.level ? "rtl" : "ltr"), i = !0)
        }
        i || r(t, n, "ltr")
    }

    function to(e) {
        return e.level % 2 ? e.to : e.from
    }

    function no(e) {
        return e.level % 2 ? e.from : e.to
    }

    function ro(e) {
        var t = ii(e);
        return t ? to(t[0]) : 0
    }

    function io(e) {
        var t = ii(e);
        return t ? no(Ii(t)) : e.text.length
    }

    function oo(e, t) {
        var n = Zr(e.doc, t),
                r = yr(n);
        r != n && (t = ti(r));
        var i = ii(r),
                o = i ? i[0].level % 2 ? io(r) : ro(r) : 0;
        return Fo(t, o)
    }

    function ao(e, t) {
        for (var n, r = Zr(e.doc, t); n = gr(r); )
            r = n.find(1, !0).line, t = null;
        var i = ii(r),
                o = i ? i[0].level % 2 ? ro(r) : io(r) : r.text.length;
        return Fo(null == t ? ti(r) : t, o)
    }

    function so(e, t) {
        var n = oo(e, t.line),
                r = Zr(e.doc, n.line),
                i = ii(r);
        if (!i || 0 == i[0].level) {
            var o = Math.max(0, r.text.search(/\S/)),
                    a = t.line == n.line && t.ch <= o && t.ch;
            return Fo(n.line, a ? 0 : o)
        }
        return n
    }

    function lo(e, t, n) {
        var r = e[0].level;
        return t == r || n != r && t < n
    }

    function co(e, t) {
        as = null;
        for (var n, r = 0; r < e.length; ++r) {
            var i = e[r];
            if (i.from < t && i.to > t)
                return r;
            if (i.from == t || i.to == t) {
                if (null != n)
                    return lo(e, i.level, e[n].level) ? (i.from != i.to && (as = n), r) : (i.from != i.to && (as = r), n);
                n = r
            }
        }
        return n
    }

    function uo(e, t, n, r) {
        if (!r)
            return t + n;
        do
            t += n;
        while (t > 0 && Bi(e.text.charAt(t)));
        return t
    }

    function fo(e, t, n, r) {
        var i = ii(e);
        if (!i)
            return po(e, t, n, r);
        for (var o = co(i, t), a = i[o], s = uo(e, t, a.level % 2 ? -n : n, r); ; ) {
            if (s > a.from && s < a.to)
                return s;
            if (s == a.from || s == a.to)
                return co(i, s) == o ? s : (a = i[o += n], n > 0 == a.level % 2 ? a.to : a.from);
            if (a = i[o += n], !a)
                return null;
            s = n > 0 == a.level % 2 ? uo(e, a.to, -1, r) : uo(e, a.from, 1, r)
        }
    }

    function po(e, t, n, r) {
        var i = t + n;
        if (r)
            for (; i > 0 && Bi(e.text.charAt(i)); )
                i += n;
        return i < 0 || i > e.text.length ? null : i
    }
    var ho = navigator.userAgent,
            mo = navigator.platform,
            go = /gecko\/\d/i.test(ho),
            vo = /MSIE \d/.test(ho),
            yo = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(ho),
            _o = vo || yo,
            bo = _o && (vo ? document.documentMode || 6 : yo[1]),
            wo = /WebKit\//.test(ho),
            ko = wo && /Qt\/\d+\.\d+/.test(ho),
            xo = /Chrome\//.test(ho),
            Co = /Opera\//.test(ho),
            So = /Apple Computer/.test(navigator.vendor),
            Lo = /Mac OS X 1\d\D([8-9]|\d\d)\D/.test(ho),
            Mo = /PhantomJS/.test(ho),
            To = /AppleWebKit/.test(ho) && /Mobile\/\w+/.test(ho),
            Ao = To || /Android|webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(ho),
            Eo = To || /Mac/.test(mo),
            Oo = /\bCrOS\b/.test(ho),
            Io = /win/i.test(mo),
            Ro = Co && ho.match(/Version\/(\d*\.\d*)/);
    Ro && (Ro = Number(Ro[1])), Ro && Ro >= 15 && (Co = !1, wo = !0);
    var No = Eo && (ko || Co && (null == Ro || Ro < 12.11)),
            Po = go || _o && bo >= 9,
            zo = !1,
            Do = !1;
    m.prototype = Di({
        update: function (e) {
            var t = e.scrollWidth > e.clientWidth + 1,
                    n = e.scrollHeight > e.clientHeight + 1,
                    r = e.nativeBarWidth;
            if (n) {
                this.vert.style.display = "block", this.vert.style.bottom = t ? r + "px" : "0";
                var i = e.viewHeight - (t ? r : 0);
                this.vert.firstChild.style.height = Math.max(0, e.scrollHeight - e.clientHeight + i) + "px"
            } else
                this.vert.style.display = "", this.vert.firstChild.style.height = "0";
            if (t) {
                this.horiz.style.display = "block", this.horiz.style.right = n ? r + "px" : "0", this.horiz.style.left = e.barLeft + "px";
                var o = e.viewWidth - e.barLeft - (n ? r : 0);
                this.horiz.firstChild.style.width = e.scrollWidth - e.clientWidth + o + "px"
            } else
                this.horiz.style.display = "", this.horiz.firstChild.style.width = "0";
            return !this.checkedZeroWidth && e.clientHeight > 0 && (0 == r && this.zeroWidthHack(), this.checkedZeroWidth = !0), {
                right: n ? r : 0,
                bottom: t ? r : 0
            }
        },
        setScrollLeft: function (e) {
            this.horiz.scrollLeft != e && (this.horiz.scrollLeft = e), this.disableHoriz && this.enableZeroWidthBar(this.horiz, this.disableHoriz)
        },
        setScrollTop: function (e) {
            this.vert.scrollTop != e && (this.vert.scrollTop = e), this.disableVert && this.enableZeroWidthBar(this.vert, this.disableVert)
        },
        zeroWidthHack: function () {
            var e = Eo && !Lo ? "12px" : "18px";
            this.horiz.style.height = this.vert.style.width = e, this.horiz.style.pointerEvents = this.vert.style.pointerEvents = "none", this.disableHoriz = new Ei, this.disableVert = new Ei
        },
        enableZeroWidthBar: function (e, t) {
            function n() {
                var r = e.getBoundingClientRect(),
                        i = document.elementFromPoint(r.left + 1, r.bottom - 1);
                i != e ? e.style.pointerEvents = "none" : t.set(1e3, n)
            }
            e.style.pointerEvents = "auto", t.set(1e3, n)
        },
        clear: function () {
            var e = this.horiz.parentNode;
            e.removeChild(this.horiz), e.removeChild(this.vert)
        }
    }, m.prototype), g.prototype = Di({
        update: function () {
            return {
                bottom: 0,
                right: 0
            }
        },
        setScrollLeft: function () {},
        setScrollTop: function () {},
        clear: function () {}
    }, g.prototype), e.scrollbarModel = {
        native: m,
        null: g
    }, S.prototype.signal = function (e, t) {
        Ti(e, t) && this.events.push(arguments)
    }, S.prototype.finish = function () {
        for (var e = 0; e < this.events.length; e++)
            Ra.apply(null, this.events[e])
    };
    var Fo = e.Pos = function (e, t) {
        return this instanceof Fo ? (this.line = e, void(this.ch = t)) : new Fo(e, t)
    },
            Wo = e.cmpPos = function (e, t) {
                return e.line - t.line || e.ch - t.ch
            },
            Ho = null;
    ne.prototype = Di({
        init: function (e) {
            function t(e) {
                if (!Li(r, e)) {
                    if (r.somethingSelected())
                        Ho = r.getSelections(), n.inaccurateSelection && (n.prevInput = "", n.inaccurateSelection = !1, o.value = Ho.join("\n"), Ua(o));
                    else {
                        if (!r.options.lineWiseCopyCut)
                            return;
                        var t = ee(r);
                        Ho = t.text, "cut" == e.type ? r.setSelections(t.ranges, null, Da) : (n.prevInput = "", o.value = t.text.join("\n"), Ua(o))
                    }
                    "cut" == e.type && (r.state.cutIncoming = !0)
                }
            }
            var n = this,
                    r = this.cm,
                    i = this.wrapper = re(),
                    o = this.textarea = i.firstChild;
            e.wrapper.insertBefore(i, e.wrapper.firstChild), To && (o.style.width = "0px"), Ea(o, "input", function () {
                _o && bo >= 9 && n.hasSelection && (n.hasSelection = null), n.poll()
            }), Ea(o, "paste", function (e) {
                Li(r, e) || Q(e, r) || (r.state.pasteIncoming = !0, n.fastPoll())
            }), Ea(o, "cut", t), Ea(o, "copy", t), Ea(e.scroller, "paste", function (t) {
                jt(e, t) || Li(r, t) || (r.state.pasteIncoming = !0, n.focus())
            }), Ea(e.lineSpace, "selectstart", function (t) {
                jt(e, t) || Ma(t)
            }), Ea(o, "compositionstart", function () {
                var e = r.getCursor("from");
                n.composing && n.composing.range.clear(), n.composing = {
                    start: e,
                    range: r.markText(e, r.getCursor("to"), {
                        className: "CodeMirror-composing"
                    })
                }
            }), Ea(o, "compositionend", function () {
                n.composing && (n.poll(), n.composing.range.clear(), n.composing = null)
            })
        },
        prepareSelection: function () {
            var e = this.cm,
                    t = e.display,
                    n = e.doc,
                    r = Pe(e);
            if (e.options.moveInputWithCursor) {
                var i = pt(e, n.sel.primary().head, "div"),
                        o = t.wrapper.getBoundingClientRect(),
                        a = t.lineDiv.getBoundingClientRect();
                r.teTop = Math.max(0, Math.min(t.wrapper.clientHeight - 10, i.top + a.top - o.top)), r.teLeft = Math.max(0, Math.min(t.wrapper.clientWidth - 10, i.left + a.left - o.left))
            }
            return r
        },
        showSelection: function (e) {
            var t = this.cm,
                    n = t.display;
            $i(n.cursorDiv, e.cursors), $i(n.selectionDiv, e.selection), null != e.teTop && (this.wrapper.style.top = e.teTop + "px", this.wrapper.style.left = e.teLeft + "px")
        },
        reset: function (e) {
            if (!this.contextMenuPending) {
                var t, n, r = this.cm,
                        i = r.doc;
                if (r.somethingSelected()) {
                    this.prevInput = "";
                    var o = i.sel.primary();
                    t = rs && (o.to().line - o.from().line > 100 || (n = r.getSelection()).length > 1e3);
                    var a = t ? "-" : n || r.getSelection();
                    this.textarea.value = a, r.state.focused && Ua(this.textarea), _o && bo >= 9 && (this.hasSelection = a)
                } else
                    e || (this.prevInput = this.textarea.value = "", _o && bo >= 9 && (this.hasSelection = null));
                this.inaccurateSelection = t
            }
        },
        getField: function () {
            return this.textarea
        },
        supportsTouch: function () {
            return !1
        },
        focus: function () {
            if ("nocursor" != this.cm.options.readOnly && (!Ao || ji() != this.textarea))
                try {
                    this.textarea.focus()
                } catch (e) {
                }
        },
        blur: function () {
            this.textarea.blur()
        },
        resetPosition: function () {
            this.wrapper.style.top = this.wrapper.style.left = 0
        },
        receivedFocus: function () {
            this.slowPoll()
        },
        slowPoll: function () {
            var e = this;
            e.pollingFast || e.polling.set(this.cm.options.pollInterval, function () {
                e.poll(), e.cm.state.focused && e.slowPoll()
            })
        },
        fastPoll: function () {
            function e() {
                var r = n.poll();
                r || t ? (n.pollingFast = !1, n.slowPoll()) : (t = !0, n.polling.set(60, e))
            }
            var t = !1,
                    n = this;
            n.pollingFast = !0, n.polling.set(20, e)
        },
        poll: function () {
            var e = this.cm,
                    t = this.textarea,
                    n = this.prevInput;
            if (this.contextMenuPending || !e.state.focused || ns(t) && !n && !this.composing || e.isReadOnly() || e.options.disableInput || e.state.keySeq)
                return !1;
            var r = t.value;
            if (r == n && !e.somethingSelected())
                return !1;
            if (_o && bo >= 9 && this.hasSelection === r || Eo && /[\uf700-\uf7ff]/.test(r))
                return e.display.input.reset(), !1;
            if (e.doc.sel == e.display.selForContextMenu) {
                var i = r.charCodeAt(0);
                if (8203 != i || n || (n = "​"), 8666 == i)
                    return this.reset(), this.cm.execCommand("undo")
            }
            for (var o = 0, a = Math.min(n.length, r.length); o < a && n.charCodeAt(o) == r.charCodeAt(o); )
                ++o;
            var s = this;
            return At(e, function () {
                Z(e, r.slice(o), n.length - o, null, s.composing ? "*compose" : null), r.length > 1e3 || r.indexOf("\n") > -1 ? t.value = s.prevInput = "" : s.prevInput = r, s.composing && (s.composing.range.clear(), s.composing.range = e.markText(s.composing.start, e.getCursor("to"), {
                    className: "CodeMirror-composing"
                }))
            }), !0
        },
        ensurePolled: function () {
            this.pollingFast && this.poll() && (this.pollingFast = !1)
        },
        onKeyPress: function () {
            _o && bo >= 9 && (this.hasSelection = null), this.fastPoll()
        },
        onContextMenu: function (e) {
            function t() {
                if (null != a.selectionStart) {
                    var e = i.somethingSelected(),
                            t = "​" + (e ? a.value : "");
                    a.value = "⇚", a.value = t, r.prevInput = e ? "" : "​", a.selectionStart = 1, a.selectionEnd = t.length, o.selForContextMenu = i.doc.sel
                }
            }

            function n() {
                if (r.contextMenuPending = !1, r.wrapper.style.cssText = f, a.style.cssText = u, _o && bo < 9 && o.scrollbars.setScrollTop(o.scroller.scrollTop = l), null != a.selectionStart) {
                    (!_o || _o && bo < 9) && t();
                    var e = 0,
                            n = function t() {
                                o.selForContextMenu == i.doc.sel && 0 == a.selectionStart && a.selectionEnd > 0 && "​" == r.prevInput ? Et(i, ua.selectAll)(i) : e++ <<
                                        10 ? o.detectingSelectAll = setTimeout(t, 500) : o.input.reset()
                            };
                    o.detectingSelectAll = setTimeout(n, 200)
                }
            }
            var r = this,
                    i = r.cm,
                    o = i.display,
                    a = r.textarea,
                    s = Kt(i, e),
                    l = o.scroller.scrollTop;
            if (s && !Co) {
                var c = i.options.resetSelectionOnContextMenu;
                c && i.doc.sel.contains(s) == -1 && Et(i, Le)(i.doc, pe(s), Da);
                var u = a.style.cssText,
                        f = r.wrapper.style.cssText;
                r.wrapper.style.cssText = "position: absolute";
                var d = r.wrapper.getBoundingClientRect();
                if (a.style.cssText = "position: absolute; width: 30px; height: 30px; top: " + (e.clientY - d.top - 5) + "px; left: " + (e.clientX - d.left - 5) + "px; z-index: 1000; background: " + (_o ? "rgba(255, 255, 255, .05)" : "transparent") + "; outline: none; border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);", wo)
                    var p = window.scrollY;
                if (o.input.focus(), wo && window.scrollTo(null, p), o.input.reset(), i.somethingSelected() || (a.value = r.prevInput = " "), r.contextMenuPending = !0, o.selForContextMenu = i.doc.sel, clearTimeout(o.detectingSelectAll), _o && bo >= 9 && t(), Po) {
                    Aa(e);
                    var h = function e() {
                        Ia(window, "mouseup", e), setTimeout(n, 20)
                    };
                    Ea(window, "mouseup", h)
                } else
                    setTimeout(n, 50)
            }
        },
        readOnlyChanged: function (e) {
            e || this.reset()
        },
        setUneditable: Pi,
        needsContentAttribute: !1
    }, ne.prototype), ie.prototype = Di({
        init: function (e) {
            function t(e) {
                if (!Li(r, e)) {
                    if (r.somethingSelected())
                        Ho = r.getSelections(), "cut" == e.type && r.replaceSelection("", null, "cut");
                    else {
                        if (!r.options.lineWiseCopyCut)
                            return;
                        var t = ee(r);
                        Ho = t.text, "cut" == e.type && r.operation(function () {
                            r.setSelections(t.ranges, 0, Da), r.replaceSelection("", null, "cut")
                        })
                    }
                    if (e.clipboardData && !To)
                        e.preventDefault(), e.clipboardData.clearData(), e.clipboardData.setData("text/plain", Ho.join("\n"));
                    else {
                        var n = re(),
                                i = n.firstChild;
                        r.display.lineSpace.insertBefore(n, r.display.lineSpace.firstChild), i.value = Ho.join("\n");
                        var o = document.activeElement;
                        Ua(i), setTimeout(function () {
                            r.display.lineSpace.removeChild(n), o.focus()
                        }, 50)
                    }
                }
            }
            var n = this,
                    r = n.cm,
                    i = n.div = e.lineDiv;
            te(i), Ea(i, "paste", function (e) {
                Li(r, e) || Q(e, r)
            }), Ea(i, "compositionstart", function (e) {
                var t = e.data;
                if (n.composing = {
                    sel: r.doc.sel,
                    data: t,
                    startData: t
                }, t) {
                    var i = r.doc.sel.primary(),
                            o = r.getLine(i.head.line),
                            a = o.indexOf(t, Math.max(0, i.head.ch - t.length));
                    a > -1 && a <= i.head.ch && (n.composing.sel = pe(Fo(i.head.line, a), Fo(i.head.line, a + t.length)))
                }
            }), Ea(i, "compositionupdate", function (e) {
                n.composing.data = e.data
            }), Ea(i, "compositionend", function (e) {
                var t = n.composing;
                t && (e.data == t.startData || /\u200b/.test(e.data) || (t.data = e.data), setTimeout(function () {
                    t.handled || n.applyComposition(t), n.composing == t && (n.composing = null)
                }, 50))
            }), Ea(i, "touchstart", function () {
                n.forceCompositionEnd()
            }), Ea(i, "input", function () {
                n.composing || !r.isReadOnly() && n.pollContent() || At(n.cm, function () {
                    Pt(r)
                })
            }), Ea(i, "copy", t), Ea(i, "cut", t)
        },
        prepareSelection: function () {
            var e = Pe(this.cm, !1);
            return e.focus = this.cm.state.focused, e
        },
        showSelection: function (e) {
            e && this.cm.display.view.length && (e.focus && this.showPrimarySelection(), this.showMultipleSelections(e))
        },
        showPrimarySelection: function () {
            var e = window.getSelection(),
                    t = this.cm.doc.sel.primary(),
                    n = se(this.cm, e.anchorNode, e.anchorOffset),
                    r = se(this.cm, e.focusNode, e.focusOffset);
            if (!n || n.bad || !r || r.bad || 0 != Wo(X(n, r), t.from()) || 0 != Wo(G(n, r), t.to())) {
                var i = oe(this.cm, t.from()),
                        o = oe(this.cm, t.to());
                if (i || o) {
                    var a = this.cm.display.view,
                            s = e.rangeCount && e.getRangeAt(0);
                    if (i) {
                        if (!o) {
                            var l = a[a.length - 1].measure,
                                    c = l.maps ? l.maps[l.maps.length - 1] : l.map;
                            o = {
                                node: c[c.length - 1],
                                offset: c[c.length - 2] - c[c.length - 3]
                            }
                        }
                    } else
                        i = {
                            node: a[0].measure.map[2],
                            offset: 0
                        };
                    try {
                        var u = $a(i.node, i.offset, o.offset, o.node)
                    } catch (e) {
                    }
                    u && (!go && this.cm.state.focused ? (e.collapse(i.node, i.offset), u.collapsed || e.addRange(u)) : (e.removeAllRanges(), e.addRange(u)), s && null == e.anchorNode ? e.addRange(s) : go && this.startGracePeriod()), this.rememberSelection()
                }
            }
        },
        startGracePeriod: function () {
            var e = this;
            clearTimeout(this.gracePeriod), this.gracePeriod = setTimeout(function () {
                e.gracePeriod = !1, e.selectionChanged() && e.cm.operation(function () {
                    e.cm.curOp.selectionChanged = !0
                })
            }, 20)
        },
        showMultipleSelections: function (e) {
            $i(this.cm.display.cursorDiv, e.cursors), $i(this.cm.display.selectionDiv, e.selection)
        },
        rememberSelection: function () {
            var e = window.getSelection();
            this.lastAnchorNode = e.anchorNode, this.lastAnchorOffset = e.anchorOffset, this.lastFocusNode = e.focusNode, this.lastFocusOffset = e.focusOffset
        },
        selectionInEditor: function () {
            var e = window.getSelection();
            if (!e.rangeCount)
                return !1;
            var t = e.getRangeAt(0).commonAncestorContainer;
            return Ga(this.div, t)
        },
        focus: function () {
            "nocursor" != this.cm.options.readOnly && this.div.focus()
        },
        blur: function () {
            this.div.blur()
        },
        getField: function () {
            return this.div
        },
        supportsTouch: function () {
            return !0
        },
        receivedFocus: function () {
            function e() {
                t.cm.state.focused && (t.pollSelection(), t.polling.set(t.cm.options.pollInterval, e))
            }
            var t = this;
            this.selectionInEditor() ? this.pollSelection() : At(this.cm, function () {
                t.cm.curOp.selectionChanged = !0
            }), this.polling.set(this.cm.options.pollInterval, e)
        },
        selectionChanged: function () {
            var e = window.getSelection();
            return e.anchorNode != this.lastAnchorNode || e.anchorOffset != this.lastAnchorOffset || e.focusNode != this.lastFocusNode || e.focusOffset != this.lastFocusOffset
        },
        pollSelection: function () {
            if (!this.composing && !this.gracePeriod && this.selectionChanged()) {
                var e = window.getSelection(),
                        t = this.cm;
                this.rememberSelection();
                var n = se(t, e.anchorNode, e.anchorOffset),
                        r = se(t, e.focusNode, e.focusOffset);
                n && r && At(t, function () {
                    Le(t.doc, pe(n, r), Da), (n.bad || r.bad) && (t.curOp.selectionChanged = !0)
                })
            }
        },
        pollContent: function () {
            var e = this.cm,
                    t = e.display,
                    n = e.doc.sel.primary(),
                    r = n.from(),
                    i = n.to();
            if (r.line < t.viewFrom || i.line > t.viewTo - 1)
                return !1;
            var o;
            if (r.line == t.viewFrom || 0 == (o = Ft(e, r.line)))
                var a = ti(t.view[0].line),
                        s = t.view[0].node;
            else
                var a = ti(t.view[o].line),
                        s = t.view[o - 1].node.nextSibling;
            var l = Ft(e, i.line);
            if (l == t.view.length - 1)
                var c = t.viewTo - 1,
                        u = t.lineDiv.lastChild;
            else
                var c = ti(t.view[l + 1].line) - 1,
                        u = t.view[l + 1].node.previousSibling;
            for (var f = e.doc.splitLines(ce(e, s, u, a, c)), d = Qr(e.doc, Fo(a, 0), Fo(c, Zr(e.doc, c).text.length)); f.length > 1 && d.length > 1; )
                if (Ii(f) == Ii(d))
                    f.pop(), d.pop(), c--;
                else {
                    if (f[0] != d[0])
                        break;
                    f.shift(), d.shift(), a++
                }
            for (var p = 0, h = 0, m = f[0], g = d[0], v = Math.min(m.length, g.length); p < v && m.charCodeAt(p) == g.charCodeAt(p); )
                ++p;
            for (var y = Ii(f), _ = Ii(d), b = Math.min(y.length - (1 == f.length ? p : 0), _.length - (1 == d.length ? p : 0)); h < b && y.charCodeAt(y.length - h - 1) == _.charCodeAt(_.length - h - 1); )
                ++h;
            f[f.length - 1] = y.slice(0, y.length - h), f[0] = f[0].slice(p);
            var w = Fo(a, p),
                    k = Fo(c, d.length ? Ii(d).length - h : 0);
            return f.length > 1 || f[0] || Wo(w, k) ? (In(e.doc, f, w, k, "+input"), !0) : void 0
        },
        ensurePolled: function () {
            this.forceCompositionEnd()
        },
        reset: function () {
            this.forceCompositionEnd()
        },
        forceCompositionEnd: function () {
            this.composing && !this.composing.handled && (this.applyComposition(this.composing), this.composing.handled = !0, this.div.blur(), this.div.focus())
        },
        applyComposition: function (e) {
            this.cm.isReadOnly() ? Et(this.cm, Pt)(this.cm) : e.data && e.data != e.startData && Et(this.cm, Z)(this.cm, e.data, 0, e.sel)
        },
        setUneditable: function (e) {
            e.contentEditable = "false"
        },
        onKeyPress: function (e) {
            e.preventDefault(), this.cm.isReadOnly() || Et(this.cm, Z)(this.cm, String.fromCharCode(null == e.charCode ? e.keyCode : e.charCode), 0)
        },
        readOnlyChanged: function (e) {
            this.div.contentEditable = String("nocursor" != e)
        },
        onContextMenu: Pi,
        resetPosition: Pi,
        needsContentAttribute: !0
    }, ie.prototype), e.inputStyles = {
        textarea: ne,
        contenteditable: ie
    }, ue.prototype = {
        primary: function () {
            return this.ranges[this.primIndex]
        },
        equals: function (e) {
            if (e == this)
                return !0;
            if (e.primIndex != this.primIndex || e.ranges.length != this.ranges.length)
                return !1;
            for (var t = 0; t < this.ranges.length; t++) {
                var n = this.ranges[t],
                        r = e.ranges[t];
                if (0 != Wo(n.anchor, r.anchor) || 0 != Wo(n.head, r.head))
                    return !1
            }
            return !0
        },
        deepCopy: function () {
            for (var e = [], t = 0; t < this.ranges.length; t++)
                e[t] = new fe(V(this.ranges[t].anchor), V(this.ranges[t].head));
            return new ue(e, this.primIndex)
        },
        somethingSelected: function () {
            for (var e = 0; e < this.ranges.length; e++)
                if (!this.ranges[e].empty())
                    return !0;
            return !1
        },
        contains: function (e, t) {
            t || (t = e);
            for (var n = 0; n < this.ranges.length; n++) {
                var r = this.ranges[n];
                if (Wo(t, r.from()) >= 0 && Wo(e, r.to()) <= 0)
                    return n
            }
            return -1
        }
    }, fe.prototype = {
        from: function () {
            return X(this.anchor, this.head)
        },
        to: function () {
            return G(this.anchor, this.head)
        },
        empty: function () {
            return this.head.line == this.anchor.line && this.head.ch == this.anchor.ch
        }
    };
    var Bo, qo, Uo, $o = {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    },
            jo = null,
            Ko = 0,
            Vo = 0,
            Go = 0,
            Xo = null;
    _o ? Xo = -.53 : go ? Xo = 15 : xo ? Xo = -.7 : So && (Xo = -1 / 3);
    var Yo = function (e) {
        var t = e.wheelDeltaX,
                n = e.wheelDeltaY;
        return null == t && e.detail && e.axis == e.HORIZONTAL_AXIS && (t = e.detail), null == n && e.detail && e.axis == e.VERTICAL_AXIS ? n = e.detail : null == n && (n = e.wheelDelta), {
            x: t,
            y: n
        }
    };
    e.wheelEventPixels = function (e) {
        var t = Yo(e);
        return t.x *= Xo, t.y *= Xo, t
    };
    var Zo = new Ei,
            Qo = null,
            Jo = e.changeEnd = function (e) {
                return e.text ? Fo(e.from.line + e.text.length - 1, Ii(e.text).length + (1 == e.text.length ? e.from.ch : 0)) : e.to
            };
    e.prototype = {
        constructor: e,
        focus: function () {
            window.focus(), this.display.input.focus()
        },
        setOption: function (e, t) {
            var n = this.options,
                    r = n[e];
            n[e] == t && "mode" != e || (n[e] = t, ta.hasOwnProperty(e) && Et(this, ta[e])(this, t, r))
        },
        getOption: function (e) {
            return this.options[e]
        },
        getDoc: function () {
            return this.doc
        },
        addKeyMap: function (e, t) {
            this.state.keyMaps[t ? "push" : "unshift"](Vn(e))
        },
        removeKeyMap: function (e) {
            for (var t = this.state.keyMaps, n = 0; n < t.length; ++n)
                if (t[n] == e || t[n].name == e)
                    return t.splice(n, 1), !0
        },
        addOverlay: Ot(function (t, n) {
            var r = t.token ? t : e.getMode(this.options, t);
            if (r.startState)
                throw new Error("Overlays may not be stateful.");
            this.state.overlays.push({
                mode: r,
                modeSpec: t,
                opaque: n && n.opaque
            }), this.state.modeGen++, Pt(this)
        }),
        removeOverlay: Ot(function (e) {
            for (var t = this.state.overlays, n = 0; n < t.length; ++n) {
                var r = t[n].modeSpec;
                if (r == e || "string" == typeof e && r.name == e)
                    return t.splice(n, 1), this.state.modeGen++, void Pt(this)
            }
        }),
        indentLine: Ot(function (e, t, n) {
            "string" != typeof t && "number" != typeof t && (t = null == t ? this.options.smartIndent ? "smart" : "prev" : t ? "add" : "subtract"), ve(this.doc, e) && Hn(this, e, t, n)
        }),
        indentSelection: Ot(function (e) {
            for (var t = this.doc.sel.ranges, n = -1, r = 0; r < t.length; r++) {
                var i = t[r];
                if (i.empty())
                    i.head.line > n && (Hn(this, i.head.line, e, !0), n = i.head.line, r == this.doc.sel.primIndex && Fn(this));
                else {
                    var o = i.from(),
                            a = i.to(),
                            s = Math.max(n, o.line);
                    n = Math.min(this.lastLine(), a.line - (a.ch ? 0 : 1)) + 1;
                    for (var l = s; l < n; ++l)
                        Hn(this, l, e);
                    var c = this.doc.sel.ranges;
                    0 == o.ch && t.length == c.length && c[r].from().ch > 0 && ke(this.doc, r, new fe(o, c[r].to()), Da)
                }
            }
        }),
        getTokenAt: function (e, t) {
            return Ir(this, e, t)
        },
        getLineTokens: function (e, t) {
            return Ir(this, Fo(e), t, !0)
        },
        getTokenTypeAt: function (e) {
            e = me(this.doc, e);
            var t, n = Pr(this, Zr(this.doc, e.line)),
                    r = 0,
                    i = (n.length - 1) / 2,
                    o = e.ch;
            if (0 == o)
                t = n[2];
            else
                for (; ; ) {
                    var a = r + i >> 1;
                    if ((a ? n[2 * a - 1] : 0) >= o)
                        i = a;
                    else {
                        if (!(n[2 * a + 1] < o)) {
                            t = n[2 * a + 2];
                            break
                        }
                        r = a + 1
                    }
                }
            var s = t ? t.indexOf("cm-overlay ") : -1;
            return s < 0 ? t : 0 == s ? null : t.slice(0, s - 1)
        },
        getModeAt: function (t) {
            var n = this.doc.mode;
            return n.innerMode ? e.innerMode(n, this.getTokenAt(t).state).mode : n
        },
        getHelper: function (e, t) {
            return this.getHelpers(e, t)[0]
        },
        getHelpers: function (e, t) {
            var n = [];
            if (!sa.hasOwnProperty(t))
                return n;
            var r = sa[t],
                    i = this.getModeAt(e);
            if ("string" == typeof i[t])
                r[i[t]] && n.push(r[i[t]]);
            else if (i[t])
                for (var o = 0; o < i[t].length; o++) {
                    var a = r[i[t][o]];
                    a && n.push(a)
                }
            else
                i.helperType && r[i.helperType] ? n.push(r[i.helperType]) : r[i.name] && n.push(r[i.name]);
            for (var o = 0; o < r._global.length; o++) {
                var s = r._global[o];
                s.pred(i, this) && Ri(n, s.val) == -1 && n.push(s.val)
            }
            return n
        },
        getStateAfter: function (e, t) {
            var n = this.doc;
            return e = he(n, null == e ? n.first + n.size - 1 : e), qe(this, e + 1, t)
        },
        cursorCoords: function (e, t) {
            var n, r = this.doc.sel.primary();
            return n = null == e ? r.head : "object" == ("undefined" == typeof e ? "undefined" : _typeof(e)) ? me(this.doc, e) : e ? r.from() : r.to(), pt(this, n, t || "page")
        },
        charCoords: function (e, t) {
            return dt(this, me(this.doc, e), t || "page")
        },
        coordsChar: function (e, t) {
            return e = ft(this, e, t || "page"), gt(this, e.left, e.top)
        },
        lineAtHeight: function (e, t) {
            return e = ft(this, {
                top: e,
                left: 0
            }, t || "page").top, ni(this.doc, e + this.display.viewOffset)
        },
        heightAtLine: function (e, t) {
            var n, r = !1;
            if ("number" == typeof e) {
                var i = this.doc.first + this.doc.size - 1;
                e < this.doc.first ? e = this.doc.first : e > i && (e = i, r = !0), n = Zr(this.doc, e)
            } else
                n = e;
            return ut(this, n, {
                top: 0,
                left: 0
            }, t || "page").top + (r ? this.doc.height - ri(n) : 0)
        },
        defaultTextHeight: function () {
            return yt(this.display)
        },
        defaultCharWidth: function () {
            return _t(this.display)
        },
        setGutterMarker: Ot(function (e, t, n) {
            return Bn(this.doc, e, "gutter", function (e) {
                var r = e.gutterMarkers || (e.gutterMarkers = {});
                return r[t] = n, !n && Hi(r) && (e.gutterMarkers = null), !0
            })
        }),
        clearGutter: Ot(function (e) {
            var t = this,
                    n = t.doc,
                    r = n.first;
            n.iter(function (n) {
                n.gutterMarkers && n.gutterMarkers[e] && (n.gutterMarkers[e] = null, zt(t, r, "gutter"), Hi(n.gutterMarkers) && (n.gutterMarkers = null)), ++r
            })
        }),
        lineInfo: function (e) {
            if ("number" == typeof e) {
                if (!ve(this.doc, e))
                    return null;
                var t = e;
                if (e = Zr(this.doc, e), !e)
                    return null
            } else {
                var t = ti(e);
                if (null == t)
                    return null
            }
            return {
                line: t,
                handle: e,
                text: e.text,
                gutterMarkers: e.gutterMarkers,
                textClass: e.textClass,
                bgClass: e.bgClass,
                wrapClass: e.wrapClass,
                widgets: e.widgets
            }
        },
        getViewport: function () {
            return {
                from: this.display.viewFrom,
                to: this.display.viewTo
            }
        },
        addWidget: function (e, t, n, r, i) {
            var o = this.display;
            e = pt(this, me(this.doc, e));
            var a = e.bottom,
                    s = e.left;
            if (t.style.position = "absolute", t.setAttribute("cm-ignore-events", "true"), this.display.input.setUneditable(t), o.sizer.appendChild(t), "over" == r)
                a = e.top;
            else if ("above" == r || "near" == r) {
                var l = Math.max(o.wrapper.clientHeight, this.doc.height),
                        c = Math.max(o.sizer.clientWidth, o.lineSpace.clientWidth);
                ("above" == r || e.bottom + t.offsetHeight > l) && e.top > t.offsetHeight ? a = e.top - t.offsetHeight : e.bottom + t.offsetHeight <= l && (a = e.bottom), s + t.offsetWidth > c && (s = c - t.offsetWidth)
            }
            t.style.top = a + "px", t.style.left = t.style.right = "", "right" == i ? (s = o.sizer.clientWidth - t.offsetWidth, t.style.right = "0px") : ("left" == i ? s = 0 : "middle" == i && (s = (o.sizer.clientWidth - t.offsetWidth) / 2), t.style.left = s + "px"), n && Pn(this, s, a, s + t.offsetWidth, a + t.offsetHeight)
        },
        triggerOnKeyDown: Ot(dn),
        triggerOnKeyPress: Ot(mn),
        triggerOnKeyUp: hn,
        execCommand: function (e) {
            if (ua.hasOwnProperty(e))
                return ua[e].call(null, this)
        },
        triggerElectric: Ot(function (e) {
            J(this, e)
        }),
        findPosH: function (e, t, n, r) {
            var i = 1;
            t < 0 && (i = -1, t = -t);
            for (var o = 0, a = me(this.doc, e); o < t && (a = Un(this.doc, a, i, n, r), !a.hitSide); ++o)
                ;
            return a
        },
        moveH: Ot(function (e, t) {
            var n = this;
            n.extendSelectionsBy(function (r) {
                return n.display.shift || n.doc.extend || r.empty() ? Un(n.doc, r.head, e, t, n.options.rtlMoveVisually) : e < 0 ? r.from() : r.to()
            }, Wa)
        }),
        deleteH: Ot(function (e, t) {
            var n = this.doc.sel,
                    r = this.doc;
            n.somethingSelected() ? r.replaceSelection("", null, "+delete") : qn(this, function (n) {
                var i = Un(r, n.head, e, t, !1);
                return e < 0 ? {
                    from: i,
                    to: n.head
                } : {
                    from: n.head,
                    to: i
                }
            })
        }),
        findPosV: function (e, t, n, r) {
            var i = 1,
                    o = r;
            t < 0 && (i = -1, t = -t);
            for (var a = 0, s = me(this.doc, e); a < t; ++a) {
                var l = pt(this, s, "div");
                if (null == o ? o = l.left : l.left = o, s = $n(this, l, i, n), s.hitSide)
                    break
            }
            return s
        },
        moveV: Ot(function (e, t) {
            var n = this,
                    r = this.doc,
                    i = [],
                    o = !n.display.shift && !r.extend && r.sel.somethingSelected();
            if (r.extendSelectionsBy(function (a) {
                if (o)
                    return e < 0 ? a.from() : a.to();
                var s = pt(n, a.head, "div");
                null != a.goalColumn && (s.left = a.goalColumn), i.push(s.left);
                var l = $n(n, s, e, t);
                return "page" == t && a == r.sel.primary() && Dn(n, null, dt(n, l, "div").top - s.top), l
            }, Wa), i.length)
                for (var a = 0; a < r.sel.ranges.length; a++)
                    r.sel.ranges[a].goalColumn = i[a]
        }),
        findWordAt: function (e) {
            var t = this.doc,
                    n = Zr(t, e.line).text,
                    r = e.ch,
                    i = e.ch;
            if (n) {
                var o = this.getHelper(e, "wordChars");
                (e.xRel < 0 || i == n.length) && r ? --r : ++i;
                for (var a = n.charAt(r), s = Wi(a, o) ? function (e) {
                    return Wi(e, o)
                } : /\s/.test(a) ? function (e) {
                    return /\s/.test(e)
                } : function (e) {
                    return !/\s/.test(e) && !Wi(e)
                }; r > 0 && s(n.charAt(r - 1)); )
                    --r;
                for (; i < n.length && s(n.charAt(i)); )
                    ++i
            }
            return new fe(Fo(e.line, r), Fo(e.line, i))
        },
        toggleOverwrite: function (e) {
            null != e && e == this.state.overwrite || ((this.state.overwrite = !this.state.overwrite) ? Qa(this.display.cursorDiv, "CodeMirror-overwrite") : Za(this.display.cursorDiv, "CodeMirror-overwrite"), Ra(this, "overwriteToggle", this, this.state.overwrite))
        },
        hasFocus: function () {
            return this.display.input.getField() == ji()
        },
        isReadOnly: function () {
            return !(!this.options.readOnly && !this.doc.cantEdit)
        },
        scrollTo: Ot(function (e, t) {
            null == e && null == t || Wn(this), null != e && (this.curOp.scrollLeft = e), null != t && (this.curOp.scrollTop = t)
        }),
        getScrollInfo: function () {
            var e = this.display.scroller;
            return {
                left: e.scrollLeft,
                top: e.scrollTop,
                height: e.scrollHeight - Ke(this) - this.display.barHeight,
                width: e.scrollWidth - Ke(this) - this.display.barWidth,
                clientHeight: Ge(this),
                clientWidth: Ve(this)
            }
        },
        scrollIntoView: Ot(function (e, t) {
            if (null == e ? (e = {
                from: this.doc.sel.primary().head,
                to: null
            }, null == t && (t = this.options.cursorScrollMargin)) : "number" == typeof e ? e = {
                from: Fo(e, 0),
                to: null
            } : null == e.from && (e = {
                from: e,
                to: null
            }), e.to || (e.to = e.from), e.margin = t || 0, null != e.from.line)
                Wn(this), this.curOp.scrollToPos = e;
            else {
                var n = zn(this, Math.min(e.from.left, e.to.left), Math.min(e.from.top, e.to.top) - e.margin, Math.max(e.from.right, e.to.right), Math.max(e.from.bottom, e.to.bottom) + e.margin);
                this.scrollTo(n.scrollLeft, n.scrollTop)
            }
        }),
        setSize: Ot(function (e, t) {
            function n(e) {
                return "number" == typeof e || /^\d+$/.test(String(e)) ? e + "px" : e
            }
            var r = this;
            null != e && (r.display.wrapper.style.width = n(e)), null != t && (r.display.wrapper.style.height = n(t)), r.options.lineWrapping && at(this);
            var i = r.display.viewFrom;
            r.doc.iter(i, r.display.viewTo, function (e) {
                if (e.widgets)
                    for (var t = 0; t < e.widgets.length; t++)
                        if (e.widgets[t].noHScroll) {
                            zt(r, i, "widget");
                            break
                        }
                ++i
            }), r.curOp.forceUpdate = !0, Ra(r, "refresh", this)
        }),
        operation: function (e) {
            return At(this, e)
        },
        refresh: Ot(function () {
            var e = this.display.cachedTextHeight;
            Pt(this), this.curOp.forceUpdate = !0, st(this), this.scrollTo(this.doc.scrollLeft, this.doc.scrollTop), u(this), (null == e || Math.abs(e - yt(this.display)) > .5) && a(this), Ra(this, "refresh", this)
        }),
        swapDoc: Ot(function (e) {
            var t = this.doc;
            return t.cm = null, Yr(this, e), st(this), this.display.input.reset(), this.scrollTo(e.scrollLeft, e.scrollTop), this.curOp.forceScroll = !0, Ci(this, "swapDoc", this, t), t
        }),
        getInputField: function () {
            return this.display.input.getField()
        },
        getWrapperElement: function () {
            return this.display.wrapper
        },
        getScrollerElement: function () {
            return this.display.scroller
        },
        getGutterElement: function () {
            return this.display.gutters
        }
    }, Ai(e);
    var ea = e.defaults = {},
            ta = e.optionHandlers = {},
            na = e.Init = {
                toString: function () {
                    return "CodeMirror.Init"
                }
            };
    jn("value", "", function (e, t) {
        e.setValue(t)
    }, !0), jn("mode", null, function (e, t) {
        e.doc.modeOption = t, n(e)
    }, !0), jn("indentUnit", 2, n, !0), jn("indentWithTabs", !1), jn("smartIndent", !0), jn("tabSize", 4, function (e) {
        r(e), st(e), Pt(e)
    }, !0), jn("lineSeparator", null, function (e, t) {
        if (e.doc.lineSep = t, t) {
            var n = [],
                    r = e.doc.first;
            e.doc.iter(function (e) {
                for (var i = 0; ; ) {
                    var o = e.text.indexOf(t, i);
                    if (o == -1)
                        break;
                    i = o + t.length, n.push(Fo(r, o))
                }
                r++
            });
            for (var i = n.length - 1; i >= 0; i--)
                In(e.doc, t, n[i], Fo(n[i].line, n[i].ch + t.length))
        }
    }), jn("specialChars", /[\t\u0000-\u0019\u00ad\u200b-\u200f\u2028\u2029\ufeff]/g, function (t, n, r) {
        t.state.specialChars = new RegExp(n.source + (n.test("\t") ? "" : "|\t"), "g"), r != e.Init && t.refresh()
    }), jn("specialCharPlaceholder", Wr, function (e) {
        e.refresh()
    }, !0), jn("electricChars", !0), jn("inputStyle", Ao ? "contenteditable" : "textarea", function () {
        throw new Error("inputStyle can not (yet) be changed in a running editor")
    }, !0), jn("rtlMoveVisually", !Io), jn("wholeLineUpdateBefore", !0), jn("theme", "default", function (e) {
        s(e), l(e)
    }, !0), jn("keyMap", "default", function (t, n, r) {
        var i = Vn(n),
                o = r != e.Init && Vn(r);
        o && o.detach && o.detach(t, i), i.attach && i.attach(t, o || null)
    }), jn("extraKeys", null), jn("lineWrapping", !1, i, !0), jn("gutters", [], function (e) {
        p(e.options), l(e)
    }, !0), jn("fixedGutter", !0, function (e, t) {
        e.display.gutters.style.left = t ? C(e.display) + "px" : "0", e.refresh()
    }, !0), jn("coverGutterNextToScrollbar", !1, function (e) {
        y(e)
    }, !0), jn("scrollbarStyle", "native", function (e) {
        v(e), y(e), e.display.scrollbars.setScrollTop(e.doc.scrollTop), e.display.scrollbars.setScrollLeft(e.doc.scrollLeft)
    }, !0), jn("lineNumbers", !1, function (e) {
        p(e.options), l(e)
    }, !0), jn("firstLineNumber", 1, l, !0), jn("lineNumberFormatter", function (e) {
        return e
    }, l, !0), jn("showCursorWhenSelecting", !1, Ne, !0), jn("resetSelectionOnContextMenu", !0), jn("lineWiseCopyCut", !0), jn("readOnly", !1, function (e, t) {
        "nocursor" == t ? (yn(e), e.display.input.blur(), e.display.disabled = !0) : e.display.disabled = !1, e.display.input.readOnlyChanged(t)
    }), jn("disableInput", !1, function (e, t) {
        t || e.display.input.reset()
    }, !0), jn("dragDrop", !0, Ut), jn("allowDropFileTypes", null), jn("cursorBlinkRate", 530), jn("cursorScrollMargin", 0), jn("cursorHeight", 1, Ne, !0), jn("singleCursorHeightPerLine", !0, Ne, !0), jn("workTime", 100), jn("workDelay", 100), jn("flattenSpans", !0, r, !0), jn("addModeClass", !1, r, !0), jn("pollInterval", 100), jn("undoDepth", 200, function (e, t) {
        e.doc.history.undoDepth = t
    }), jn("historyEventDelay", 1250), jn("viewportMargin", 10, function (e) {
        e.refresh()
    }, !0), jn("maxHighlightLength", 1e4, r, !0), jn("moveInputWithCursor", !0, function (e, t) {
        t || e.display.input.resetPosition()
    }), jn("tabindex", null, function (e, t) {
        e.display.input.getField().tabIndex = t || ""
    }), jn("autofocus", null);
    var ra = e.modes = {},
            ia = e.mimeModes = {};
    e.defineMode = function (t, n) {
        e.defaults.mode || "null" == t || (e.defaults.mode = t), arguments.length > 2 && (n.dependencies = Array.prototype.slice.call(arguments, 2)), ra[t] = n
    }, e.defineMIME = function (e, t) {
        ia[e] = t
    }, e.resolveMode = function (t) {
        if ("string" == typeof t && ia.hasOwnProperty(t))
            t = ia[t];
        else if (t && "string" == typeof t.name && ia.hasOwnProperty(t.name)) {
            var n = ia[t.name];
            "string" == typeof n && (n = {
                name: n
            }), t = zi(n, t), t.name = n.name
        } else if ("string" == typeof t && /^[\w\-]+\/[\w\-]+\+xml$/.test(t))
            return e.resolveMode("application/xml");
        return "string" == typeof t ? {
            name: t
        } : t || {
            name: "null"
        }
    }, e.getMode = function (t, n) {
        var n = e.resolveMode(n),
                r = ra[n.name];
        if (!r)
            return e.getMode(t, "text/plain");
        var i = r(t, n);
        if (oa.hasOwnProperty(n.name)) {
            var o = oa[n.name];
            for (var a in o)
                o.hasOwnProperty(a) && (i.hasOwnProperty(a) && (i["_" + a] = i[a]), i[a] = o[a])
        }
        if (i.name = n.name, n.helperType && (i.helperType = n.helperType), n.modeProps)
            for (var a in n.modeProps)
                i[a] = n.modeProps[a];
        return i
    }, e.defineMode("null", function () {
        return {
            token: function (e) {
                e.skipToEnd()
            }
        }
    }), e.defineMIME("text/plain", "null");
    var oa = e.modeExtensions = {};
    e.extendMode = function (e, t) {
        var n = oa.hasOwnProperty(e) ? oa[e] : oa[e] = {};
        Di(t, n)
    }, e.defineExtension = function (t, n) {
        e.prototype[t] = n
    }, e.defineDocExtension = function (e, t) {
        Ca.prototype[e] = t
    }, e.defineOption = jn;
    var aa = [];
    e.defineInitHook = function (e) {
        aa.push(e)
    };
    var sa = e.helpers = {};
    e.registerHelper = function (t, n, r) {
        sa.hasOwnProperty(t) || (sa[t] = e[t] = {
            _global: []
        }), sa[t][n] = r
    }, e.registerGlobalHelper = function (t, n, r, i) {
        e.registerHelper(t, n, i), sa[t]._global.push({
            pred: r,
            val: i
        })
    };
    var la = e.copyState = function (e, t) {
        if (t === !0)
            return t;
        if (e.copyState)
            return e.copyState(t);
        var n = {};
        for (var r in t) {
            var i = t[r];
            i instanceof Array && (i = i.concat([])), n[r] = i
        }
        return n
    },
            ca = e.startState = function (e, t, n) {
                return !e.startState || e.startState(t, n)
            };
    e.innerMode = function (e, t) {
        for (; e.innerMode; ) {
            var n = e.innerMode(t);
            if (!n || n.mode == e)
                break;
            t = n.state, e = n.mode
        }
        return n || {
            mode: e,
            state: t
        }
    };
    var ua = e.commands = {
        selectAll: function (e) {
            e.setSelection(Fo(e.firstLine(), 0), Fo(e.lastLine()), Da)
        },
        singleSelection: function (e) {
            e.setSelection(e.getCursor("anchor"), e.getCursor("head"), Da)
        },
        killLine: function (e) {
            qn(e, function (t) {
                if (t.empty()) {
                    var n = Zr(e.doc, t.head.line).text.length;
                    return t.head.ch == n && t.head.line < e.lastLine() ? {
                        from: t.head,
                        to: Fo(t.head.line + 1, 0)
                    } : {
                        from: t.head,
                        to: Fo(t.head.line, n)
                    }
                }
                return {
                    from: t.from(),
                    to: t.to()
                }
            })
        },
        deleteLine: function (e) {
            qn(e, function (t) {
                return {
                    from: Fo(t.from().line, 0),
                    to: me(e.doc, Fo(t.to().line + 1, 0))
                }
            })
        },
        delLineLeft: function (e) {
            qn(e, function (e) {
                return {
                    from: Fo(e.from().line, 0),
                    to: e.from()
                }
            })
        },
        delWrappedLineLeft: function (e) {
            qn(e, function (t) {
                var n = e.charCoords(t.head, "div").top + 5,
                        r = e.coordsChar({
                            left: 0,
                            top: n
                        }, "div");
                return {
                    from: r,
                    to: t.from()
                }
            })
        },
        delWrappedLineRight: function (e) {
            qn(e, function (t) {
                var n = e.charCoords(t.head, "div").top + 5,
                        r = e.coordsChar({
                            left: e.display.lineDiv.offsetWidth + 100,
                            top: n
                        }, "div");
                return {
                    from: t.from(),
                    to: r
                }
            })
        },
        undo: function (e) {
            e.undo()
        },
        redo: function (e) {
            e.redo()
        },
        undoSelection: function (e) {
            e.undoSelection()
        },
        redoSelection: function (e) {
            e.redoSelection()
        },
        goDocStart: function (e) {
            e.extendSelection(Fo(e.firstLine(), 0))
        },
        goDocEnd: function (e) {
            e.extendSelection(Fo(e.lastLine()))
        },
        goLineStart: function (e) {
            e.extendSelectionsBy(function (t) {
                return oo(e, t.head.line)
            }, {
                origin: "+move",
                bias: 1
            })
        },
        goLineStartSmart: function (e) {
            e.extendSelectionsBy(function (t) {
                return so(e, t.head)
            }, {
                origin: "+move",
                bias: 1
            })
        },
        goLineEnd: function (e) {
            e.extendSelectionsBy(function (t) {
                return ao(e, t.head.line)
            }, {
                origin: "+move",
                bias: -1
            })
        },
        goLineRight: function (e) {
            e.extendSelectionsBy(function (t) {
                var n = e.charCoords(t.head, "div").top + 5;
                return e.coordsChar({
                    left: e.display.lineDiv.offsetWidth + 100,
                    top: n
                }, "div")
            }, Wa)
        },
        goLineLeft: function (e) {
            e.extendSelectionsBy(function (t) {
                var n = e.charCoords(t.head, "div").top + 5;
                return e.coordsChar({
                    left: 0,
                    top: n
                }, "div")
            }, Wa)
        },
        goLineLeftSmart: function (e) {
            e.extendSelectionsBy(function (t) {
                var n = e.charCoords(t.head, "div").top + 5,
                        r = e.coordsChar({
                            left: 0,
                            top: n
                        }, "div");
                return r.ch < e.getLine(r.line).search(/\S/) ? so(e, t.head) : r
            }, Wa)
        },
        goLineUp: function (e) {
            e.moveV(-1, "line")
        },
        goLineDown: function (e) {
            e.moveV(1, "line")
        },
        goPageUp: function (e) {
            e.moveV(-1, "page")
        },
        goPageDown: function (e) {
            e.moveV(1, "page")
        },
        goCharLeft: function (e) {
            e.moveH(-1, "char")
        },
        goCharRight: function (e) {
            e.moveH(1, "char")
        },
        goColumnLeft: function (e) {
            e.moveH(-1, "column")
        },
        goColumnRight: function (e) {
            e.moveH(1, "column")
        },
        goWordLeft: function (e) {
            e.moveH(-1, "word")
        },
        goGroupRight: function (e) {
            e.moveH(1, "group")
        },
        goGroupLeft: function (e) {
            e.moveH(-1, "group")
        },
        goWordRight: function (e) {
            e.moveH(1, "word")
        },
        delCharBefore: function (e) {
            e.deleteH(-1, "char")
        },
        delCharAfter: function (e) {
            e.deleteH(1, "char")
        },
        delWordBefore: function (e) {
            e.deleteH(-1, "word")
        },
        delWordAfter: function (e) {
            e.deleteH(1, "word")
        },
        delGroupBefore: function (e) {
            e.deleteH(-1, "group")
        },
        delGroupAfter: function (e) {
            e.deleteH(1, "group")
        },
        indentAuto: function (e) {
            e.indentSelection("smart")
        },
        indentMore: function (e) {
            e.indentSelection("add")
        },
        indentLess: function (e) {
            e.indentSelection("subtract")
        },
        insertTab: function (e) {
            e.replaceSelection("\t")
        },
        insertSoftTab: function (e) {
            for (var t = [], n = e.listSelections(), r = e.options.tabSize, i = 0; i < n.length; i++) {
                var o = n[i].from(),
                        a = Ha(e.getLine(o.line), o.ch, r);
                t.push(new Array(r - a % r + 1).join(" "))
            }
            e.replaceSelections(t)
        },
        defaultTab: function (e) {
            e.somethingSelected() ? e.indentSelection("add") : e.execCommand("insertTab")
        },
        transposeChars: function (e) {
            At(e, function () {
                for (var t = e.listSelections(), n = [], r = 0; r < t.length; r++) {
                    var i = t[r].head,
                            o = Zr(e.doc, i.line).text;
                    if (o)
                        if (i.ch == o.length && (i = new Fo(i.line, i.ch - 1)), i.ch > 0)
                            i = new Fo(i.line, i.ch + 1), e.replaceRange(o.charAt(i.ch - 1) + o.charAt(i.ch - 2), Fo(i.line, i.ch - 2), i, "+transpose");
                        else if (i.line > e.doc.first) {
                            var a = Zr(e.doc, i.line - 1).text;
                            a && e.replaceRange(o.charAt(0) + e.doc.lineSeparator() + a.charAt(a.length - 1), Fo(i.line - 1, a.length - 1), Fo(i.line, 1), "+transpose")
                        }
                    n.push(new fe(i, i))
                }
                e.setSelections(n)
            })
        },
        newlineAndIndent: function (e) {
            At(e, function () {
                for (var t = e.listSelections().length, n = 0; n < t; n++) {
                    var r = e.listSelections()[n];
                    e.replaceRange(e.doc.lineSeparator(), r.anchor, r.head, "+input"), e.indentLine(r.from().line + 1, null, !0)
                }
                Fn(e)
            })
        },
        toggleOverwrite: function (e) {
            e.toggleOverwrite()
        }
    },
            fa = e.keyMap = {};
    fa.basic = {
        Left: "goCharLeft",
        Right: "goCharRight",
        Up: "goLineUp",
        Down: "goLineDown",
        End: "goLineEnd",
        Home: "goLineStartSmart",
        PageUp: "goPageUp",
        PageDown: "goPageDown",
        Delete: "delCharAfter",
        Backspace: "delCharBefore",
        "Shift-Backspace": "delCharBefore",
        Tab: "defaultTab",
        "Shift-Tab": "indentAuto",
        Enter: "newlineAndIndent",
        Insert: "toggleOverwrite",
        Esc: "singleSelection"
    }, fa.pcDefault = {
        "Ctrl-A": "selectAll",
        "Ctrl-D": "deleteLine",
        "Ctrl-Z": "undo",
        "Shift-Ctrl-Z": "redo",
        "Ctrl-Y": "redo",
        "Ctrl-Home": "goDocStart",
        "Ctrl-End": "goDocEnd",
        "Ctrl-Up": "goLineUp",
        "Ctrl-Down": "goLineDown",
        "Ctrl-Left": "goGroupLeft",
        "Ctrl-Right": "goGroupRight",
        "Alt-Left": "goLineStart",
        "Alt-Right": "goLineEnd",
        "Ctrl-Backspace": "delGroupBefore",
        "Ctrl-Delete": "delGroupAfter",
        "Ctrl-S": "save",
        "Ctrl-F": "find",
        "Ctrl-G": "findNext",
        "Shift-Ctrl-G": "findPrev",
        "Shift-Ctrl-F": "replace",
        "Shift-Ctrl-R": "replaceAll",
        "Ctrl-[": "indentLess",
        "Ctrl-]": "indentMore",
        "Ctrl-U": "undoSelection",
        "Shift-Ctrl-U": "redoSelection",
        "Alt-U": "redoSelection",
        fallthrough: "basic"
    }, fa.emacsy = {
        "Ctrl-F": "goCharRight",
        "Ctrl-B": "goCharLeft",
        "Ctrl-P": "goLineUp",
        "Ctrl-N": "goLineDown",
        "Alt-F": "goWordRight",
        "Alt-B": "goWordLeft",
        "Ctrl-A": "goLineStart",
        "Ctrl-E": "goLineEnd",
        "Ctrl-V": "goPageDown",
        "Shift-Ctrl-V": "goPageUp",
        "Ctrl-D": "delCharAfter",
        "Ctrl-H": "delCharBefore",
        "Alt-D": "delWordAfter",
        "Alt-Backspace": "delWordBefore",
        "Ctrl-K": "killLine",
        "Ctrl-T": "transposeChars"
    }, fa.macDefault = {
        "Cmd-A": "selectAll",
        "Cmd-D": "deleteLine",
        "Cmd-Z": "undo",
        "Shift-Cmd-Z": "redo",
        "Cmd-Y": "redo",
        "Cmd-Home": "goDocStart",
        "Cmd-Up": "goDocStart",
        "Cmd-End": "goDocEnd",
        "Cmd-Down": "goDocEnd",
        "Alt-Left": "goGroupLeft",
        "Alt-Right": "goGroupRight",
        "Cmd-Left": "goLineLeft",
        "Cmd-Right": "goLineRight",
        "Alt-Backspace": "delGroupBefore",
        "Ctrl-Alt-Backspace": "delGroupAfter",
        "Alt-Delete": "delGroupAfter",
        "Cmd-S": "save",
        "Cmd-F": "find",
        "Cmd-G": "findNext",
        "Shift-Cmd-G": "findPrev",
        "Cmd-Alt-F": "replace",
        "Shift-Cmd-Alt-F": "replaceAll",
        "Cmd-[": "indentLess",
        "Cmd-]": "indentMore",
        "Cmd-Backspace": "delWrappedLineLeft",
        "Cmd-Delete": "delWrappedLineRight",
        "Cmd-U": "undoSelection",
        "Shift-Cmd-U": "redoSelection",
        "Ctrl-Up": "goDocStart",
        "Ctrl-Down": "goDocEnd",
        fallthrough: ["basic", "emacsy"]
    }, fa.default = Eo ? fa.macDefault : fa.pcDefault, e.normalizeKeyMap = function (e) {
        var t = {};
        for (var n in e)
            if (e.hasOwnProperty(n)) {
                var r = e[n];
                if (/^(name|fallthrough|(de|at)tach)$/.test(n))
                    continue;
                if ("..." == r) {
                    delete e[n];
                    continue
                }
                for (var i = Ni(n.split(" "), Kn), o = 0; o < i.length; o++) {
                    var a, s;
                    o == i.length - 1 ? (s = i.join(" "), a = r) : (s = i.slice(0, o + 1).join(" "), a = "...");
                    var l = t[s];
                    if (l) {
                        if (l != a)
                            throw new Error("Inconsistent bindings for " + s)
                    } else
                        t[s] = a
                }
                delete e[n]
            }
        for (var c in t)
            e[c] = t[c];
        return e
    };
    var da = e.lookupKey = function (e, t, n, r) {
        t = Vn(t);
        var i = t.call ? t.call(e, r) : t[e];
        if (i === !1)
            return "nothing";
        if ("..." === i)
            return "multi";
        if (null != i && n(i))
            return "handled";
        if (t.fallthrough) {
            if ("[object Array]" != Object.prototype.toString.call(t.fallthrough))
                return da(e, t.fallthrough, n, r);
            for (var o = 0; o < t.fallthrough.length; o++) {
                var a = da(e, t.fallthrough[o], n, r);
                if (a)
                    return a
            }
        }
    },
            pa = e.isModifierKey = function (e) {
                var t = "string" == typeof e ? e : os[e.keyCode];
                return "Ctrl" == t || "Alt" == t || "Shift" == t || "Mod" == t
            },
            ha = e.keyName = function (e, t) {
                if (Co && 34 == e.keyCode && e.char)
                    return !1;
                var n = os[e.keyCode],
                        r = n;
                return null != r && !e.altGraphKey && (e.altKey && "Alt" != n && (r = "Alt-" + r), (No ? e.metaKey : e.ctrlKey) && "Ctrl" != n && (r = "Ctrl-" + r), (No ? e.ctrlKey : e.metaKey) && "Cmd" != n && (r = "Cmd-" + r), !t && e.shiftKey && "Shift" != n && (r = "Shift-" + r), r)
            };
    e.fromTextArea = function (t, n) {
        function r() {
            t.value = l.getValue()
        }
        if (n = n ? Di(n) : {}, n.value = t.value, !n.tabindex && t.tabIndex && (n.tabindex = t.tabIndex), !n.placeholder && t.placeholder && (n.placeholder = t.placeholder), null == n.autofocus) {
            var i = ji();
            n.autofocus = i == t || null != t.getAttribute("autofocus") && i == document.body
        }
        if (t.form && (Ea(t.form, "submit", r), !n.leaveSubmitMethodAlone)) {
            var o = t.form,
                    a = o.submit;
            try {
                var s = o.submit = function () {
                    r(), o.submit = a, o.submit(), o.submit = s
                }
            } catch (e) {
            }
        }
        n.finishInit = function (e) {
            e.save = r, e.getTextArea = function () {
                return t
            }, e.toTextArea = function () {
                e.toTextArea = isNaN, r(), t.parentNode.removeChild(e.getWrapperElement()), t.style.display = "", t.form && (Ia(t.form, "submit", r), "function" == typeof t.form.submit && (t.form.submit = a))
            }
        }, t.style.display = "none";
        var l = e(function (e) {
            t.parentNode.insertBefore(e, t.nextSibling)
        }, n);
        return l
    };
    var ma = e.StringStream = function (e, t) {
        this.pos = this.start = 0, this.string = e, this.tabSize = t || 8, this.lastColumnPos = this.lastColumnValue = 0, this.lineStart = 0
    };
    ma.prototype = {
        eol: function () {
            return this.pos >= this.string.length
        },
        sol: function () {
            return this.pos == this.lineStart
        },
        peek: function () {
            return this.string.charAt(this.pos) || void 0
        },
        next: function () {
            if (this.pos < this.string.length)
                return this.string.charAt(this.pos++)
        },
        eat: function (e) {
            var t = this.string.charAt(this.pos);
            if ("string" == typeof e)
                var n = t == e;
            else
                var n = t && (e.test ? e.test(t) : e(t));
            if (n)
                return ++this.pos, t
        },
        eatWhile: function (e) {
            for (var t = this.pos; this.eat(e); )
                ;
            return this.pos > t
        },
        eatSpace: function () {
            for (var e = this.pos;
                    /[\s\u00a0]/.test(this.string.charAt(this.pos)); )
                ++this.pos;
            return this.pos > e
        },
        skipToEnd: function () {
            this.pos = this.string.length
        },
        skipTo: function (e) {
            var t = this.string.indexOf(e, this.pos);
            if (t > -1)
                return this.pos = t, !0
        },
        backUp: function (e) {
            this.pos -= e
        },
        column: function () {
            return this.lastColumnPos < this.start && (this.lastColumnValue = Ha(this.string, this.start, this.tabSize, this.lastColumnPos, this.lastColumnValue), this.lastColumnPos = this.start), this.lastColumnValue - (this.lineStart ? Ha(this.string, this.lineStart, this.tabSize) : 0)
        },
        indentation: function () {
            return Ha(this.string, null, this.tabSize) - (this.lineStart ? Ha(this.string, this.lineStart, this.tabSize) : 0)
        },
        match: function e(t, n, r) {
            if ("string" != typeof t) {
                var e = this.string.slice(this.pos).match(t);
                return e && e.index > 0 ? null : (e && n !== !1 && (this.pos += e[0].length), e)
            }
            var i = function (e) {
                return r ? e.toLowerCase() : e
            },
                    o = this.string.substr(this.pos, t.length);
            if (i(o) == i(t))
                return n !== !1 && (this.pos += t.length), !0
        },
        current: function () {
            return this.string.slice(this.start, this.pos)
        },
        hideFirstChars: function (e, t) {
            this.lineStart += e;
            try {
                return t()
            } finally {
                this.lineStart -= e
            }
        }
    };
    var ga = 0,
            va = e.TextMarker = function (e, t) {
                this.lines = [], this.type = t, this.doc = e, this.id = ++ga
            };
    Ai(va), va.prototype.clear = function () {
        if (!this.explicitlyCleared) {
            var e = this.doc.cm,
                    t = e && !e.curOp;
            if (t && bt(e), Ti(this, "clear")) {
                var n = this.find();
                n && Ci(this, "clear", n.from, n.to)
            }
            for (var r = null, i = null, o = 0; o < this.lines.length; ++o) {
                var a = this.lines[o],
                        s = er(a.markedSpans, this);
                e && !this.collapsed ? zt(e, ti(a), "text") : e && (null != s.to && (i = ti(a)), null != s.from && (r = ti(a))), a.markedSpans = tr(a.markedSpans, s), null == s.from && this.collapsed && !kr(this.doc, a) && e && ei(a, yt(e.display))
            }
            if (e && this.collapsed && !e.options.lineWrapping)
                for (var o = 0; o < this.lines.length; ++o) {
                    var l = yr(this.lines[o]),
                            c = f(l);
                    c > e.display.maxLineLength && (e.display.maxLine = l, e.display.maxLineLength = c, e.display.maxLineChanged = !0)
                }
            null != r && e && this.collapsed && Pt(e, r, i + 1), this.lines.length = 0, this.explicitlyCleared = !0, this.atomic && this.doc.cantEdit && (this.doc.cantEdit = !1, e && Ae(e.doc)), e && Ci(e, "markerCleared", e, this), t && kt(e), this.parent && this.parent.clear()
        }
    }, va.prototype.find = function (e, t) {
        null == e && "bookmark" == this.type && (e = 1);
        for (var n, r, i = 0; i < this.lines.length; ++i) {
            var o = this.lines[i],
                    a = er(o.markedSpans, this);
            if (null != a.from && (n = Fo(t ? o : ti(o), a.from), e == -1))
                return n;
            if (null != a.to && (r = Fo(t ? o : ti(o), a.to), 1 == e))
                return r
        }
        return n && {
            from: n,
            to: r
        }
    }, va.prototype.changed = function () {
        var e = this.find(-1, !0),
                t = this,
                n = this.doc.cm;
        e && n && At(n, function () {
            var r = e.line,
                    i = ti(e.line),
                    o = Je(n, i);
            if (o && (ot(o), n.curOp.selectionChanged = n.curOp.forceUpdate = !0), n.curOp.updateMaxLine = !0, !kr(t.doc, r) && null != t.height) {
                var a = t.height;
                t.height = null;
                var s = Sr(t) - a;
                s && ei(r, r.height + s)
            }
        })
    }, va.prototype.attachLine = function (e) {
        if (!this.lines.length && this.doc.cm) {
            var t = this.doc.cm.curOp;
            t.maybeHiddenMarkers && Ri(t.maybeHiddenMarkers, this) != -1 || (t.maybeUnhiddenMarkers || (t.maybeUnhiddenMarkers = [])).push(this)
        }
        this.lines.push(e)
    }, va.prototype.detachLine = function (e) {
        if (this.lines.splice(Ri(this.lines, e), 1), !this.lines.length && this.doc.cm) {
            var t = this.doc.cm.curOp;
            (t.maybeHiddenMarkers || (t.maybeHiddenMarkers = [])).push(this)
        }
    };
    var ga = 0,
            ya = e.SharedTextMarker = function (e, t) {
                this.markers = e, this.primary = t;
                for (var n = 0; n < e.length; ++n)
                    e[n].parent = this
            };
    Ai(ya), ya.prototype.clear = function () {
        if (!this.explicitlyCleared) {
            this.explicitlyCleared = !0;
            for (var e = 0; e < this.markers.length; ++e)
                this.markers[e].clear();
            Ci(this, "clear")
        }
    }, ya.prototype.find = function (e, t) {
        return this.primary.find(e, t)
    };
    var _a = e.LineWidget = function (e, t, n) {
        if (n)
            for (var r in n)
                n.hasOwnProperty(r) && (this[r] = n[r]);
        this.doc = e, this.node = t
    };
    Ai(_a), _a.prototype.clear = function () {
        var e = this.doc.cm,
                t = this.line.widgets,
                n = this.line,
                r = ti(n);
        if (null != r && t) {
            for (var i = 0; i < t.length; ++i)
                t[i] == this && t.splice(i--, 1);
            t.length || (n.widgets = null);
            var o = Sr(this);
            ei(n, Math.max(0, n.height - o)), e && At(e, function () {
                Cr(e, n, -o), zt(e, r, "widget")
            })
        }
    }, _a.prototype.changed = function () {
        var e = this.height,
                t = this.doc.cm,
                n = this.line;
        this.height = null;
        var r = Sr(this) - e;
        r && (ei(n, n.height + r), t && At(t, function () {
            t.curOp.forceUpdate = !0, Cr(t, n, r)
        }))
    };
    var ba = e.Line = function (e, t, n) {
        this.text = e, ur(this, t), this.height = n ? n(this) : 1
    };
    Ai(ba), ba.prototype.lineNo = function () {
        return ti(this)
    };
    var wa = {},
            ka = {};
    Vr.prototype = {
        chunkSize: function () {
            return this.lines.length
        },
        removeInner: function (e, t) {
            for (var n = e, r = e + t; n < r; ++n) {
                var i = this.lines[n];
                this.height -= i.height, Tr(i), Ci(i, "delete")
            }
            this.lines.splice(e, t)
        },
        collapse: function (e) {
            e.push.apply(e, this.lines)
        },
        insertInner: function (e, t, n) {
            this.height += n, this.lines = this.lines.slice(0, e).concat(t).concat(this.lines.slice(e));
            for (var r = 0; r < t.length; ++r)
                t[r].parent = this
        },
        iterN: function (e, t, n) {
            for (var r = e + t; e < r; ++e)
                if (n(this.lines[e]))
                    return !0
        }
    }, Gr.prototype = {
        chunkSize: function () {
            return this.size
        },
        removeInner: function (e, t) {
            this.size -= t;
            for (var n = 0; n < this.children.length; ++n) {
                var r = this.children[n],
                        i = r.chunkSize();
                if (e < i) {
                    var o = Math.min(t, i - e),
                            a = r.height;
                    if (r.removeInner(e, o), this.height -= a - r.height, i == o && (this.children.splice(n--, 1), r.parent = null), 0 == (t -= o))
                        break;
                    e = 0
                } else
                    e -= i
            }
            if (this.size - t < 25 && (this.children.length > 1 || !(this.children[0] instanceof Vr))) {
                var s = [];
                this.collapse(s), this.children = [new Vr(s)], this.children[0].parent = this
            }
        },
        collapse: function (e) {
            for (var t = 0; t < this.children.length; ++t)
                this.children[t].collapse(e)
        },
        insertInner: function (e, t, n) {
            this.size += t.length, this.height += n;
            for (var r = 0; r < this.children.length; ++r) {
                var i = this.children[r],
                        o = i.chunkSize();
                if (e <= o) {
                    if (i.insertInner(e, t, n), i.lines && i.lines.length > 50) {
                        for (; i.lines.length > 50; ) {
                            var a = i.lines.splice(i.lines.length - 25, 25),
                                    s = new Vr(a);
                            i.height -= s.height, this.children.splice(r + 1, 0, s), s.parent = this
                        }
                        this.maybeSpill()
                    }
                    break
                }
                e -= o
            }
        },
        maybeSpill: function () {
            if (!(this.children.length <= 10)) {
                var e = this;
                do {
                    var t = e.children.splice(e.children.length - 5, 5),
                            n = new Gr(t);
                    if (e.parent) {
                        e.size -= n.size, e.height -= n.height;
                        var r = Ri(e.parent.children, e);
                        e.parent.children.splice(r + 1, 0, n)
                    } else {
                        var i = new Gr(e.children);
                        i.parent = e, e.children = [i, n], e = i
                    }
                    n.parent = e.parent
                } while (e.children.length > 10);
                e.parent.maybeSpill()
            }
        },
        iterN: function (e, t, n) {
            for (var r = 0; r < this.children.length; ++r) {
                var i = this.children[r],
                        o = i.chunkSize();
                if (e < o) {
                    var a = Math.min(t, o - e);
                    if (i.iterN(e, a, n))
                        return !0;
                    if (0 == (t -= a))
                        break;
                    e = 0
                } else
                    e -= o
            }
        }
    };
    var xa = 0,
            Ca = e.Doc = function (e, t, n, r) {
                if (!(this instanceof Ca))
                    return new Ca(e, t, n, r);
                null == n && (n = 0), Gr.call(this, [new Vr([new ba("", null)])]), this.first = n, this.scrollTop = this.scrollLeft = 0, this.cantEdit = !1, this.cleanGeneration = 1, this.frontier = n;
                var i = Fo(n, 0);
                this.sel = pe(i), this.history = new oi(null), this.id = ++xa, this.modeOption = t, this.lineSep = r, this.extend = !1, "string" == typeof e && (e = this.splitLines(e)), Kr(this, {
                    from: i,
                    to: i,
                    text: e
                }), Le(this, pe(i), Da)
            };
    Ca.prototype = zi(Gr.prototype, {
        constructor: Ca,
        iter: function (e, t, n) {
            n ? this.iterN(e - this.first, t - e, n) : this.iterN(this.first, this.first + this.size, e)
        },
        insert: function (e, t) {
            for (var n = 0, r = 0; r < t.length; ++r)
                n += t[r].height;
            this.insertInner(e - this.first, t, n)
        },
        remove: function (e, t) {
            this.removeInner(e - this.first, t)
        },
        getValue: function (e) {
            var t = Jr(this, this.first, this.first + this.size);
            return e === !1 ? t : t.join(e || this.lineSeparator())
        },
        setValue: It(function (e) {
            var t = Fo(this.first, 0),
                    n = this.first + this.size - 1;
            Ln(this, {
                from: t,
                to: Fo(n, Zr(this, n).text.length),
                text: this.splitLines(e),
                origin: "setValue",
                full: !0
            }, !0), Le(this, pe(t))
        }),
        replaceRange: function (e, t, n, r) {
            t = me(this, t), n = n ? me(this, n) : t, In(this, e, t, n, r)
        },
        getRange: function (e, t, n) {
            var r = Qr(this, me(this, e), me(this, t));
            return n === !1 ? r : r.join(n || this.lineSeparator())
        },
        getLine: function (e) {
            var t = this.getLineHandle(e);
            return t && t.text
        },
        getLineHandle: function (e) {
            if (ve(this, e))
                return Zr(this, e)
        },
        getLineNumber: function (e) {
            return ti(e)
        },
        getLineHandleVisualStart: function (e) {
            return "number" == typeof e && (e = Zr(this, e)), yr(e)
        },
        lineCount: function () {
            return this.size
        },
        firstLine: function () {
            return this.first
        },
        lastLine: function () {
            return this.first + this.size - 1
        },
        clipPos: function (e) {
            return me(this, e)
        },
        getCursor: function (e) {
            var t, n = this.sel.primary();
            return t = null == e || "head" == e ? n.head : "anchor" == e ? n.anchor : "end" == e || "to" == e || e === !1 ? n.to() : n.from()
        },
        listSelections: function () {
            return this.sel.ranges
        },
        somethingSelected: function () {
            return this.sel.somethingSelected()
        },
        setCursor: It(function (e, t, n) {
            xe(this, me(this, "number" == typeof e ? Fo(e, t || 0) : e), null, n)
        }),
        setSelection: It(function (e, t, n) {
            xe(this, me(this, e), me(this, t || e), n)
        }),
        extendSelection: It(function (e, t, n) {
            be(this, me(this, e), t && me(this, t), n)
        }),
        extendSelections: It(function (e, t) {
            we(this, ye(this, e), t)
        }),
        extendSelectionsBy: It(function (e, t) {
            var n = Ni(this.sel.ranges, e);
            we(this, ye(this, n), t)
        }),
        setSelections: It(function (e, t, n) {
            if (e.length) {
                for (var r = 0, i = []; r < e.length; r++)
                    i[r] = new fe(me(this, e[r].anchor), me(this, e[r].head));
                null == t && (t = Math.min(e.length - 1, this.sel.primIndex)), Le(this, de(i, t), n)
            }
        }),
        addSelection: It(function (e, t, n) {
            var r = this.sel.ranges.slice(0);
            r.push(new fe(me(this, e), me(this, t || e))), Le(this, de(r, r.length - 1), n)
        }),
        getSelection: function (e) {
            for (var t, n = this.sel.ranges, r = 0; r < n.length; r++) {
                var i = Qr(this, n[r].from(), n[r].to());
                t = t ? t.concat(i) : i
            }
            return e === !1 ? t : t.join(e || this.lineSeparator())
        },
        getSelections: function (e) {
            for (var t = [], n = this.sel.ranges, r = 0; r < n.length; r++) {
                var i = Qr(this, n[r].from(), n[r].to());
                e !== !1 && (i = i.join(e || this.lineSeparator())), t[r] = i
            }
            return t
        },
        replaceSelection: function (e, t, n) {
            for (var r = [], i = 0; i < this.sel.ranges.length; i++)
                r[i] = e;
            this.replaceSelections(r, t, n || "+input")
        },
        replaceSelections: It(function (e, t, n) {
            for (var r = [], i = this.sel, o = 0; o < i.ranges.length; o++) {
                var a = i.ranges[o];
                r[o] = {
                    from: a.from(),
                    to: a.to(),
                    text: this.splitLines(e[o]),
                    origin: n
                }
            }
            for (var s = t && "end" != t && Cn(this, r, t), o = r.length - 1; o >= 0; o--)
                Ln(this, r[o]);
            s ? Se(this, s) : this.cm && Fn(this.cm)
        }),
        undo: It(function () {
            Tn(this, "undo")
        }),
        redo: It(function () {
            Tn(this, "redo")
        }),
        undoSelection: It(function () {
            Tn(this, "undo", !0)
        }),
        redoSelection: It(function () {
            Tn(this, "redo", !0)
        }),
        setExtending: function (e) {
            this.extend = e
        },
        getExtending: function () {
            return this.extend
        },
        historySize: function () {
            for (var e = this.history, t = 0, n = 0, r = 0; r < e.done.length; r++)
                e.done[r].ranges || ++t;
            for (var r = 0; r < e.undone.length; r++)
                e.undone[r].ranges || ++n;
            return {
                undo: t,
                redo: n
            }
        },
        clearHistory: function () {
            this.history = new oi(this.history.maxGeneration)
        },
        markClean: function () {
            this.cleanGeneration = this.changeGeneration(!0)
        },
        changeGeneration: function (e) {
            return e && (this.history.lastOp = this.history.lastSelOp = this.history.lastOrigin = null), this.history.generation
        },
        isClean: function (e) {
            return this.history.generation == (e || this.cleanGeneration)
        },
        getHistory: function () {
            return {
                done: gi(this.history.done),
                undone: gi(this.history.undone)
            }
        },
        setHistory: function (e) {
            var t = this.history = new oi(this.history.maxGeneration);
            t.done = gi(e.done.slice(0), null, !0), t.undone = gi(e.undone.slice(0), null, !0)
        },
        addLineClass: It(function (e, t, n) {
            return Bn(this, e, "gutter" == t ? "gutter" : "class", function (e) {
                var r = "text" == t ? "textClass" : "background" == t ? "bgClass" : "gutter" == t ? "gutterClass" : "wrapClass";
                if (e[r]) {
                    if (Ki(n).test(e[r]))
                        return !1;
                    e[r] += " " + n
                } else
                    e[r] = n;
                return !0
            })
        }),
        removeLineClass: It(function (e, t, n) {
            return Bn(this, e, "gutter" == t ? "gutter" : "class", function (e) {
                var r = "text" == t ? "textClass" : "background" == t ? "bgClass" : "gutter" == t ? "gutterClass" : "wrapClass",
                        i = e[r];
                if (!i)
                    return !1;
                if (null == n)
                    e[r] = null;
                else {
                    var o = i.match(Ki(n));
                    if (!o)
                        return !1;
                    var a = o.index + o[0].length;
                    e[r] = i.slice(0, o.index) + (o.index && a != i.length ? " " : "") + i.slice(a) || null
                }
                return !0
            })
        }),
        addLineWidget: It(function (e, t, n) {
            return Lr(this, e, t, n)
        }),
        removeLineWidget: function (e) {
            e.clear()
        },
        markText: function (e, t, n) {
            return Gn(this, me(this, e), me(this, t), n, n && n.type || "range")
        },
        setBookmark: function (e, t) {
            var n = {
                replacedWith: t && (null == t.nodeType ? t.widget : t),
                insertLeft: t && t.insertLeft,
                clearWhenEmpty: !1,
                shared: t && t.shared,
                handleMouseEvents: t && t.handleMouseEvents
            };
            return e = me(this, e), Gn(this, e, e, n, "bookmark")
        },
        findMarksAt: function (e) {
            e = me(this, e);
            var t = [],
                    n = Zr(this, e.line).markedSpans;
            if (n)
                for (var r = 0; r < n.length; ++r) {
                    var i = n[r];
                    (null == i.from || i.from <= e.ch) && (null == i.to || i.to >= e.ch) && t.push(i.marker.parent || i.marker)
                }
            return t
        },
        findMarks: function (e, t, n) {
            e = me(this, e), t = me(this, t);
            var r = [],
                    i = e.line;
            return this.iter(e.line, t.line + 1, function (o) {
                var a = o.markedSpans;
                if (a)
                    for (var s = 0; s < a.length; s++) {
                        var l = a[s];
                        null != l.to && i == e.line && e.ch >= l.to || null == l.from && i != e.line || null != l.from && i == t.line && l.from >= t.ch || n && !n(l.marker) || r.push(l.marker.parent || l.marker)
                    }
                ++i
            }), r
        },
        getAllMarks: function () {
            var e = [];
            return this.iter(function (t) {
                var n = t.markedSpans;
                if (n)
                    for (var r = 0; r < n.length; ++r)
                        null != n[r].from && e.push(n[r].marker)
            }), e
        },
        posFromIndex: function (e) {
            var t, n = this.first,
                    r = this.lineSeparator().length;
            return this.iter(function (i) {
                var o = i.text.length + r;
                return o > e ? (t = e, !0) : (e -= o, void++n)
            }), me(this, Fo(n, t))
        },
        indexFromPos: function (e) {
            e = me(this, e);
            var t = e.ch;
            if (e.line < this.first || e.ch < 0)
                return 0;
            var n = this.lineSeparator().length;
            return this.iter(this.first, e.line, function (e) {
                t += e.text.length + n
            }), t
        },
        copy: function (e) {
            var t = new Ca(Jr(this, this.first, this.first + this.size), this.modeOption, this.first, this.lineSep);
            return t.scrollTop = this.scrollTop, t.scrollLeft = this.scrollLeft, t.sel = this.sel, t.extend = !1, e && (t.history.undoDepth = this.history.undoDepth, t.setHistory(this.getHistory())), t
        },
        linkedDoc: function (e) {
            e || (e = {});
            var t = this.first,
                    n = this.first + this.size;
            null != e.from && e.from > t && (t = e.from), null != e.to && e.to < n && (n = e.to);
            var r = new Ca(Jr(this, t, n), e.mode || this.modeOption, t, this.lineSep);
            return e.sharedHist && (r.history = this.history), (this.linked || (this.linked = [])).push({
                doc: r,
                sharedHist: e.sharedHist
            }), r.linked = [{
                    doc: this,
                    isParent: !0,
                    sharedHist: e.sharedHist
                }], Zn(r, Yn(this)), r
        },
        unlinkDoc: function (t) {
            if (t instanceof e && (t = t.doc), this.linked)
                for (var n = 0; n < this.linked.length; ++n) {
                    var r = this.linked[n];
                    if (r.doc == t) {
                        this.linked.splice(n, 1), t.unlinkDoc(this), Qn(Yn(this));
                        break
                    }
                }
            if (t.history == this.history) {
                var i = [t.id];
                Xr(t, function (e) {
                    i.push(e.id)
                }, !0), t.history = new oi(null), t.history.done = gi(this.history.done, i), t.history.undone = gi(this.history.undone, i)
            }
        },
        iterLinkedDocs: function (e) {
            Xr(this, e)
        },
        getMode: function () {
            return this.mode
        },
        getEditor: function () {
            return this.cm
        },
        splitLines: function (e) {
            return this.lineSep ? e.split(this.lineSep) : ts(e)
        },
        lineSeparator: function () {
            return this.lineSep || "\n"
        }
    }), Ca.prototype.eachLine = Ca.prototype.iter;
    var Sa = "iter insert remove copy getEditor constructor".split(" ");
    for (var La in Ca.prototype)
        Ca.prototype.hasOwnProperty(La) && Ri(Sa, La) < 0 && (e.prototype[La] = function (e) {
            return function () {
                return e.apply(this.doc, arguments)
            }
        }(Ca.prototype[La]));
    Ai(Ca);
    var Ma = e.e_preventDefault = function (e) {
        e.preventDefault ? e.preventDefault() : e.returnValue = !1
    },
            Ta = e.e_stopPropagation = function (e) {
                e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0
            },
            Aa = e.e_stop = function (e) {
                Ma(e), Ta(e)
            },
            Ea = e.on = function (e, t, n) {
                if (e.addEventListener)
                    e.addEventListener(t, n, !1);
                else if (e.attachEvent)
                    e.attachEvent("on" + t, n);
                else {
                    var r = e._handlers || (e._handlers = {}),
                            i = r[t] || (r[t] = []);
                    i.push(n)
                }
            },
            Oa = [],
            Ia = e.off = function (e, t, n) {
                if (e.removeEventListener)
                    e.removeEventListener(t, n, !1);
                else if (e.detachEvent)
                    e.detachEvent("on" + t, n);
                else
                    for (var r = xi(e, t, !1), i = 0; i < r.length; ++i)
                        if (r[i] == n) {
                            r.splice(i, 1);
                            break
                        }
            },
            Ra = e.signal = function (e, t) {
                var n = xi(e, t, !0);
                if (n.length)
                    for (var r = Array.prototype.slice.call(arguments, 2), i = 0; i < n.length; ++i)
                        n[i].apply(null, r)
            },
            Na = null,
            Pa = 30,
            za = e.Pass = {
                toString: function () {
                    return "CodeMirror.Pass"
                }
            },
            Da = {
                scroll: !1
            },
            Fa = {
                origin: "*mouse"
            },
            Wa = {
                origin: "+move"
            };
    Ei.prototype.set = function (e, t) {
        clearTimeout(this.id), this.id = setTimeout(t, e)
    };
    var Ha = e.countColumn = function (e, t, n, r, i) {
        null == t && (t = e.search(/[^\s\u00a0]/), t == -1 && (t = e.length));
        for (var o = r || 0, a = i || 0; ; ) {
            var s = e.indexOf("\t", o);
            if (s < 0 || s >= t)
                return a + (t - o);
            a += s - o, a += n - a % n, o = s + 1
        }
    },
            Ba = e.findColumn = function (e, t, n) {
                for (var r = 0, i = 0; ; ) {
                    var o = e.indexOf("\t", r);
                    o == -1 && (o = e.length);
                    var a = o - r;
                    if (o == e.length || i + a >= t)
                        return r + Math.min(a, t - i);
                    if (i += o - r, i += n - i % n, r = o + 1, i >= t)
                        return r
                }
            },
            qa = [""],
            Ua = function (e) {
                e.select()
            };
    To ? Ua = function (e) {
        e.selectionStart = 0, e.selectionEnd = e.value.length
    } : _o && (Ua = function (e) {
        try {
            e.select()
        } catch (e) {
        }
    });
    var $a, ja = /[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/,
            Ka = e.isWordChar = function (e) {
                return /\w/.test(e) || e > "" && (e.toUpperCase() != e.toLowerCase() || ja.test(e))
            },
            Va = /[\u0300-\u036f\u0483-\u0489\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065e\u0670\u06d6-\u06dc\u06de-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0900-\u0902\u093c\u0941-\u0948\u094d\u0951-\u0955\u0962\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2\u09e3\u0a01\u0a02\u0a3c\u0a41\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81\u0a82\u0abc\u0ac1-\u0ac5\u0ac7\u0ac8\u0acd\u0ae2\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86\u0f87\u0f90-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039\u103a\u103d\u103e\u1058\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085\u1086\u108d\u109d\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193b\u1a17\u1a18\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80\u1b81\u1ba2-\u1ba5\u1ba8\u1ba9\u1c2c-\u1c33\u1c36\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1dc0-\u1de6\u1dfd-\u1dff\u200c\u200d\u20d0-\u20f0\u2cef-\u2cf1\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f-\ua672\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua825\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\uaa29-\uaa2e\uaa31\uaa32\uaa35\uaa36\uaa43\uaa4c\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe5\uabe8\uabed\udc00-\udfff\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\uff9e\uff9f]/;
    $a = document.createRange ? function (e, t, n, r) {
        var i = document.createRange();
        return i.setEnd(r || e, n), i.setStart(e, t), i
    } : function (e, t, n) {
        var r = document.body.createTextRange();
        try {
            r.moveToElementText(e.parentNode)
        } catch (e) {
            return r
        }
        return r.collapse(!0), r.moveEnd("character", n), r.moveStart("character", t), r
    };
    var Ga = e.contains = function (e, t) {
        if (3 == t.nodeType && (t = t.parentNode), e.contains)
            return e.contains(t);
        do
            if (11 == t.nodeType && (t = t.host), t == e)
                return !0;
        while (t = t.parentNode)
    };
    _o && bo < 11 && (ji = function () {
        try {
            return document.activeElement
        } catch (e) {
            return document.body
        }
    });
    var Xa, Ya, Za = e.rmClass = function (e, t) {
        var n = e.className,
                r = Ki(t).exec(n);
        if (r) {
            var i = n.slice(r.index + r[0].length);
            e.className = n.slice(0, r.index) + (i ? r[1] + i : "")
        }
    },
            Qa = e.addClass = function (e, t) {
                var n = e.className;
                Ki(t).test(n) || (e.className += (n ? " " : "") + t)
            },
            Ja = !1,
            es = function () {
                if (_o && bo < 9)
                    return !1;
                var e = qi("div");
                return "draggable" in e || "dragDrop" in e
            }(),
            ts = e.splitLines = 3 != "\n\nb".split(/\n/).length ? function (e) {
        for (var t = 0, n = [], r = e.length; t <= r; ) {
            var i = e.indexOf("\n", t);
            i == -1 && (i = e.length);
            var o = e.slice(t, "\r" == e.charAt(i - 1) ? i - 1 : i),
                    a = o.indexOf("\r");
            a != -1 ? (n.push(o.slice(0, a)), t += a + 1) : (n.push(o), t = i + 1)
        }
        return n
    } : function (e) {
        return e.split(/\r\n?|\n/)
    },
            ns = window.getSelection ? function (e) {
                try {
                    return e.selectionStart != e.selectionEnd
                } catch (e) {
                    return !1
                }
            } : function (e) {
        try {
            var t = e.ownerDocument.selection.createRange()
        } catch (e) {
        }
        return !(!t || t.parentElement() != e) && 0 != t.compareEndPoints("StartToEnd", t)
    },
            rs = function () {
                var e = qi("div");
                return "oncopy" in e || (e.setAttribute("oncopy", "return;"), "function" == typeof e.oncopy)
            }(),
            is = null,
            os = e.keyNames = {
                3: "Enter",
                8: "Backspace",
                9: "Tab",
                13: "Enter",
                16: "Shift",
                17: "Ctrl",
                18: "Alt",
                19: "Pause",
                20: "CapsLock",
                27: "Esc",
                32: "Space",
                33: "PageUp",
                34: "PageDown",
                35: "End",
                36: "Home",
                37: "Left",
                38: "Up",
                39: "Right",
                40: "Down",
                44: "PrintScrn",
                45: "Insert",
                46: "Delete",
                59: ";",
                61: "=",
                91: "Mod",
                92: "Mod",
                93: "Mod",
                106: "*",
                107: "=",
                109: "-",
                110: ".",
                111: "/",
                127: "Delete",
                173: "-",
                186: ";",
                187: "=",
                188: ",",
                189: "-",
                190: ".",
                191: "/",
                192: "`",
                219: "[",
                220: "\\",
                221: "]",
                222: "'",
                63232: "Up",
                63233: "Down",
                63234: "Left",
                63235: "Right",
                63272: "Delete",
                63273: "Home",
                63275: "End",
                63276: "PageUp",
                63277: "PageDown",
                63302: "Insert"
            };
    !function () {
        for (var e = 0; e < 10; e++)
            os[e + 48] = os[e + 96] = String(e);
        for (var e = 65; e <= 90; e++)
            os[e] = String.fromCharCode(e);
        for (var e = 1; e <= 12; e++)
            os[e + 111] = os[e + 63235] = "F" + e
    }();
    var as, ss = function () {
        function e(e) {
            return e <= 247 ? n.charAt(e) : 1424 <= e && e <= 1524 ? "R" : 1536 <= e && e <= 1773 ? r.charAt(e - 1536) : 1774 <= e && e <= 2220 ? "r" : 8192 <= e && e <= 8203 ? "w" : 8204 == e ? "b" : "L"
        }

        function t(e, t, n) {
            this.level = e, this.from = t, this.to = n
        }
        var n = "bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLN",
                r = "rrrrrrrrrrrr,rNNmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmrrrrrrrnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmNmmmm",
                i = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/,
                o = /[stwN]/,
                a = /[LRr]/,
                s = /[Lb1n]/,
                l = /[1n]/,
                c = "L";
        return function (n) {
            if (!i.test(n))
                return !1;
            for (var r, u = n.length, f = [], d = 0; d < u; ++d)
                f.push(r = e(n.charCodeAt(d)));
            for (var d = 0, p = c; d < u; ++d) {
                var r = f[d];
                "m" == r ? f[d] = p : p = r
            }
            for (var d = 0, h = c; d < u; ++d) {
                var r = f[d];
                "1" == r && "r" == h ? f[d] = "n" : a.test(r) && (h = r, "r" == r && (f[d] = "R"))
            }
            for (var d = 1, p = f[0]; d < u - 1; ++d) {
                var r = f[d];
                "+" == r && "1" == p && "1" == f[d + 1] ? f[d] = "1" : "," != r || p != f[d + 1] || "1" != p && "n" != p || (f[d] = p), p = r
            }
            for (var d = 0; d < u; ++d) {
                var r = f[d];
                if ("," == r)
                    f[d] = "N";
                else if ("%" == r) {
                    for (var m = d + 1; m < u && "%" == f[m]; ++m)
                        ;
                    for (var g = d && "!" == f[d - 1] || m < u && "1" == f[m] ? "1" : "N", v = d; v < m; ++v)
                        f[v] = g;
                    d = m - 1
                }
            }
            for (var d = 0, h = c; d < u; ++d) {
                var r = f[d];
                "L" == h && "1" == r ? f[d] = "L" : a.test(r) && (h = r)
            }
            for (var d = 0; d < u; ++d)
                if (o.test(f[d])) {
                    for (var m = d + 1; m < u && o.test(f[m]); ++m)
                        ;
                    for (var y = "L" == (d ? f[d - 1] : c), _ = "L" == (m < u ? f[m] : c), g = y || _ ? "L" : "R", v = d; v < m; ++v)
                        f[v] = g;
                    d = m - 1
                }
            for (var b, w = [], d = 0; d < u; )
                if (s.test(f[d])) {
                    var k = d;
                    for (++d; d < u && s.test(f[d]); ++d)
                        ;
                    w.push(new t(0, k, d))
                } else {
                    var x = d,
                            C = w.length;
                    for (++d; d < u && "L" != f[d]; ++d)
                        ;
                    for (var v = x; v < d; )
                        if (l.test(f[v])) {
                            x < v && w.splice(C, 0, new t(1, x, v));
                            var S = v;
                            for (++v; v < d && l.test(f[v]); ++v)
                                ;
                            w.splice(C, 0, new t(2, S, v)), x = v
                        } else
                            ++v;
                    x < d && w.splice(C, 0, new t(1, x, d))
                }
            return 1 == w[0].level && (b = n.match(/^\s+/)) && (w[0].from = b[0].length, w.unshift(new t(0, 0, b[0].length))), 1 == Ii(w).level && (b = n.match(/\s+$/)) && (Ii(w).to -= b[0].length, w.push(new t(0, u - b[0].length, u))), 2 == w[0].level && w.unshift(new t(1, w[0].to, w[0].to)), w[0].level != Ii(w).level && w.push(new t(w[0].level, u, u)), w
        }
    }();
    return e.version = "5.14.3", e
}),
        function (e) {
            e(CodeMirror)
        }(function (e) {
    function t(e, t) {
        return e.line == t.line && e.ch == t.ch
    }

    function n(e) {
        N.push(e), N.length > 50 && N.shift()
    }

    function r(e) {
        return N.length ? void(N[N.length - 1] += e) : n(e)
    }

    function i(e) {
        return N[N.length - (e ? Math.min(e, 1) : 1)] || ""
    }

    function o() {
        return N.length > 1 && N.pop(), i()
    }

    function a(e, i, o, a, s) {
        null == s && (s = e.getRange(i, o)), a && P && P.cm == e && t(i, P.pos) && e.isClean(P.gen) ? r(s) : n(s), e.replaceRange("", i, o, "+delete"), P = a ? {
            cm: e,
            pos: i,
            gen: e.changeGeneration()
        } : null
    }

    function s(e, t, n) {
        return e.findPosH(t, n, "char", !0)
    }

    function l(e, t, n) {
        return e.findPosH(t, n, "word", !0)
    }

    function c(e, t, n) {
        return e.findPosV(t, n, "line", e.doc.sel.goalColumn)
    }

    function u(e, t, n) {
        return e.findPosV(t, n, "page", e.doc.sel.goalColumn)
    }

    function f(e, t, n) {
        for (var r = t.line, i = e.getLine(r), o = /\S/.test(n < 0 ? i.slice(0, t.ch) : i.slice(t.ch)), a = e.firstLine(), s = e.lastLine(); ; ) {
            if (r += n, r < a || r > s)
                return e.clipPos(R(r - n, n < 0 ? 0 : null));
            i = e.getLine(r);
            var l = /\S/.test(i);
            if (l)
                o = !0;
            else if (o)
                return R(r, 0)
        }
    }

    function d(e, t, n) {
        for (var r = t.line, i = t.ch, o = e.getLine(t.line), a = !1; ; ) {
            var s = o.charAt(i + (n < 0 ? -1 : 0));
            if (s) {
                if (a && /[!?.]/.test(s))
                    return R(r, i + (n > 0 ? 1 : 0));
                a || (a = /\w/.test(s)), i += n
            } else {
                if (r == (n < 0 ? e.firstLine() : e.lastLine()))
                    return R(r, i);
                if (o = e.getLine(r + n), !/\S/.test(o))
                    return R(r, i);
                r += n, i = n < 0 ? o.length : 0
            }
        }
    }

    function p(e, n, r) {
        var i;
        if (e.findMatchingBracket && (i = e.findMatchingBracket(n, !0)) && i.match && (i.forward ? 1 : -1) == r)
            return r > 0 ? R(i.to.line, i.to.ch + 1) : i.to;
        for (var o = !0; ; o = !1) {
            var a = e.getTokenAt(n),
                    s = R(n.line, r < 0 ? a.start : a.end);
            if (!(o && r > 0 && a.end == n.ch) && /\w/.test(a.string))
                return s;
            var l = e.findPosH(s, r, "char");
            if (t(s, l))
                return n;
            n = l
        }
    }

    function h(e, t) {
        var n = e.state.emacsPrefix;
        return n ? (k(e), "-" == n ? -1 : Number(n)) : t ? null : 1
    }

    function m(e) {
        var t = "string" == typeof e ? function (t) {
            t.execCommand(e)
        } : e;
        return function (e) {
            var n = h(e);
            t(e);
            for (var r = 1; r < n; ++r)
                t(e)
        }
    }

    function g(e, n, r, i) {
        var o = h(e);
        o < 0 && (i = -i, o = -o);
        for (var a = 0; a < o; ++a) {
            var s = r(e, n, i);
            if (t(s, n))
                break;
            n = s
        }
        return n
    }

    function v(e, t) {
        var n = function (n) {
            n.extendSelection(g(n, n.getCursor(), e, t))
        };
        return n.motion = !0, n
    }

    function y(e, t, n) {
        for (var r, i = e.listSelections(), o = i.length; o--; )
            r = i[o].head, a(e, r, g(e, r, t, n), !0)
    }

    function _(e) {
        if (e.somethingSelected()) {
            for (var t, n = e.listSelections(), r = n.length; r--; )
                t = n[r], a(e, t.anchor, t.head);
            return !0
        }
    }

    function b(e, t) {
        return e.state.emacsPrefix ? void("-" != t && (e.state.emacsPrefix += t)) : (e.state.emacsPrefix = t, e.on("keyHandled", w), void e.on("inputRead", x))
    }

    function w(e, t) {
        e.state.emacsPrefixMap || z.hasOwnProperty(t) || k(e)
    }

    function k(e) {
        e.state.emacsPrefix = null, e.off("keyHandled", w), e.off("inputRead", x)
    }

    function x(e, t) {
        var n = h(e);
        if (n > 1 && "+input" == t.origin) {
            for (var r = t.text.join("\n"), i = "", o = 1; o < n; ++o)
                i += r;
            e.replaceSelection(i)
        }
    }

    function C(e) {
        e.state.emacsPrefixMap = !0, e.addKeyMap(F), e.on("keyHandled", S), e.on("inputRead", S)
    }

    function S(e, t) {
        ("string" != typeof t || !/^\d$/.test(t) && "Ctrl-U" != t) && (e.removeKeyMap(F), e.state.emacsPrefixMap = !1, e.off("keyHandled", S), e.off("inputRead", S))
    }

    function L(e) {
        e.setCursor(e.getCursor()), e.setExtending(!e.getExtending()), e.on("change", function () {
            e.setExtending(!1)
        })
    }

    function M(e) {
        e.setExtending(!1), e.setCursor(e.getCursor())
    }

    function T(e, t, n) {
        e.openDialog ? e.openDialog(t + ': <input type="text" style="width: 10em"/>', n, {
            bottom: !0
        }) : n(prompt(t, ""))
    }

    function A(e, t) {
        var n = e.getCursor(),
                r = e.findPosH(n, 1, "word");
        e.replaceRange(t(e.getRange(n, r)), n, r), e.setCursor(r)
    }

    function E(e) {
        for (var t = e.getCursor(), n = t.line, r = t.ch, i = []; n >= e.firstLine(); ) {
            for (var o = e.getLine(n), a = null == r ? o.length : r; a > 0; ) {
                var r = o.charAt(--a);
                if (")" == r)
                    i.push("(");
                else if ("]" == r)
                    i.push("[");
                else if ("}" == r)
                    i.push("{");
                else if (/[\(\{\[]/.test(r) && (!i.length || i.pop() != r))
                    return e.extendSelection(R(n, a))
            }
            --n, r = null
        }
    }

    function O(e) {
        e.execCommand("clearSearch"), M(e)
    }

    function I(e) {
        F[e] = function (t) {
            b(t, e)
        }, D["Ctrl-" + e] = function (t) {
            b(t, e)
        }, z["Ctrl-" + e] = !0
    }
    for (var R = e.Pos, N = [], P = null, z = {
        "Alt-G": !0,
        "Ctrl-X": !0,
        "Ctrl-Q": !0,
        "Ctrl-U": !0
    }, D = e.keyMap.emacs = e.normalizeKeyMap({
        "Ctrl-W": function (e) {
            a(e, e.getCursor("start"), e.getCursor("end"))
        },
        "Ctrl-K": m(function (e) {
            var t = e.getCursor(),
                    n = e.clipPos(R(t.line)),
                    r = e.getRange(t, n);
            /\S/.test(r) || (r += "\n", n = R(t.line + 1, 0)), a(e, t, n, !0, r)
        }),
        "Alt-W": function (e) {
            n(e.getSelection()), M(e)
        },
        "Ctrl-Y": function (e) {
            var t = e.getCursor();
            e.replaceRange(i(h(e)), t, t, "paste"), e.setSelection(t, e.getCursor())
        },
        "Alt-Y": function (e) {
            e.replaceSelection(o(), "around", "paste")
        },
        "Ctrl-Space": L,
        "Ctrl-Shift-2": L,
        "Ctrl-F": v(s, 1),
        "Ctrl-B": v(s, -1),
        Right: v(s, 1),
        Left: v(s, -1),
        "Ctrl-D": function (e) {
            y(e, s, 1)
        },
        Delete: function (e) {
            _(e) || y(e, s, 1)
        },
        "Ctrl-H": function (e) {
            y(e, s, -1)
        },
        Backspace: function (e) {
            _(e) || y(e, s, -1)
        },
        "Alt-F": v(l, 1),
        "Alt-B": v(l, -1),
        "Alt-D": function (e) {
            y(e, l, 1)
        },
        "Alt-Backspace": function (e) {
            y(e, l, -1)
        },
        "Ctrl-N": v(c, 1),
        "Ctrl-P": v(c, -1),
        Down: v(c, 1),
        Up: v(c, -1),
        "Ctrl-A": "goLineStart",
        "Ctrl-E": "goLineEnd",
        End: "goLineEnd",
        Home: "goLineStart",
        "Alt-V": v(u, -1),
        "Ctrl-V": v(u, 1),
        PageUp: v(u, -1),
        PageDown: v(u, 1),
        "Ctrl-Up": v(f, -1),
        "Ctrl-Down": v(f, 1),
        "Alt-A": v(d, -1),
        "Alt-E": v(d, 1),
        "Alt-K": function (e) {
            y(e, d, 1)
        },
        "Ctrl-Alt-K": function (e) {
            y(e, p, 1)
        },
        "Ctrl-Alt-Backspace": function (e) {
            y(e, p, -1)
        },
        "Ctrl-Alt-F": v(p, 1),
        "Ctrl-Alt-B": v(p, -1),
        "Shift-Ctrl-Alt-2": function (e) {
            var t = e.getCursor();
            e.setSelection(g(e, t, p, 1), t)
        },
        "Ctrl-Alt-T": function (e) {
            var t = p(e, e.getCursor(), -1),
                    n = p(e, t, 1),
                    r = p(e, n, 1),
                    i = p(e, r, -1);
            e.replaceRange(e.getRange(i, r) + e.getRange(n, i) + e.getRange(t, n), t, r)
        },
        "Ctrl-Alt-U": m(E),
        "Alt-Space": function (e) {
            for (var t = e.getCursor(), n = t.ch, r = t.ch, i = e.getLine(t.line); n && /\s/.test(i.charAt(n - 1)); )
                --n;
            for (; r < i.length && /\s/.test(i.charAt(r)); )
                ++r;
            e.replaceRange(" ", R(t.line, n), R(t.line, r))
        },
        "Ctrl-O": m(function (e) {
            e.replaceSelection("\n", "start")
        }),
        "Ctrl-T": m(function (e) {
            e.execCommand("transposeChars")
        }),
        "Alt-C": m(function (e) {
            A(e, function (e) {
                var t = e.search(/\w/);
                return t == -1 ? e : e.slice(0, t) + e.charAt(t).toUpperCase() + e.slice(t + 1).toLowerCase()
            })
        }),
        "Alt-U": m(function (e) {
            A(e, function (e) {
                return e.toUpperCase()
            })
        }),
        "Alt-L": m(function (e) {
            A(e, function (e) {
                return e.toLowerCase()
            })
        }),
        "Alt-;": "toggleComment",
        "Ctrl-/": m("undo"),
        "Shift-Ctrl--": m("undo"),
        "Ctrl-Z": m("undo"),
        "Cmd-Z": m("undo"),
        "Shift-Alt-,": "goDocStart",
        "Shift-Alt-.": "goDocEnd",
        "Ctrl-S": "findNext",
        "Ctrl-R": "findPrev",
        "Ctrl-G": O,
        "Shift-Alt-5": "replace",
        "Alt-/": "autocomplete",
        "Ctrl-J": "newlineAndIndent",
        Enter: !1,
        Tab: "indentAuto",
        "Alt-G G": function (e) {
            var t = h(e, !0);
            return null != t && t > 0 ? e.setCursor(t - 1) : void T(e, "Goto line", function (t) {
                var n;
                t && !isNaN(n = Number(t)) && n == (0 | n) && n > 0 && e.setCursor(n - 1)
            })
        },
        "Ctrl-X Tab": function (e) {
            e.indentSelection(h(e, !0) || e.getOption("indentUnit"))
        },
        "Ctrl-X Ctrl-X": function (e) {
            e.setSelection(e.getCursor("head"), e.getCursor("anchor"))
        },
        "Ctrl-X Ctrl-S": "save",
        "Ctrl-X Ctrl-W": "save",
        "Ctrl-X S": "saveAll",
        "Ctrl-X F": "open",
        "Ctrl-X U": m("undo"),
        "Ctrl-X K": "close",
        "Ctrl-X Delete": function (e) {
            a(e, e.getCursor(), d(e, e.getCursor(), 1), !0)
        },
        "Ctrl-X H": "selectAll",
        "Ctrl-Q Tab": m("insertTab"),
        "Ctrl-U": C
    }), F = {
        "Ctrl-G": k
    }, W = 0; W < 10; ++W)
        I(String(W));
    I("-")
}),
        function (e) {
            e(CodeMirror)
        }(function (e) {
    function t(t, n, r) {
        if (r < 0 && 0 == n.ch)
            return t.clipPos(d(n.line - 1));
        var i = t.getLine(n.line);
        if (r > 0 && n.ch >= i.length)
            return t.clipPos(d(n.line + 1, 0));
        for (var o, a = "start", s = n.ch, l = r < 0 ? 0 : i.length, c = 0; s != l; s += r, c++) {
            var u = i.charAt(r < 0 ? s - 1 : s),
                    f = "_" != u && e.isWordChar(u) ? "w" : "o";
            if ("w" == f && u.toUpperCase() == u && (f = "W"), "start" == a)
                "o" != f && (a = "in", o = f);
            else if ("in" == a && o != f) {
                if ("w" == o && "W" == f && r < 0 && s--, "W" == o && "w" == f && r > 0) {
                    o = "w";
                    continue
                }
                break
            }
        }
        return d(n.line, s)
    }

    function n(e, n) {
        e.extendSelectionsBy(function (r) {
            return e.display.shift || e.doc.extend || r.empty() ? t(e.doc, r.head, n) : n < 0 ? r.from() : r.to()
        })
    }

    function r(t, n) {
        return t.isReadOnly() ? e.Pass : void t.operation(function () {
            for (var e = t.listSelections().length, r = [], i = -1, o = 0; o < e; o++) {
                var a = t.listSelections()[o].head;
                if (!(a.line <= i)) {
                    var s = d(a.line + (n ? 0 : 1), 0);
                    t.replaceRange("\n", s, null, "+insertLine"), t.indentLine(s.line, null, !0), r.push({
                        head: s,
                        anchor: s
                    }), i = a.line + 1
                }
            }
            t.setSelections(r)
        })
    }

    function i(t, n) {
        for (var r = n.ch, i = r, o = t.getLine(n.line); r && e.isWordChar(o.charAt(r - 1)); )
            --r;
        for (; i < o.length && e.isWordChar(o.charAt(i)); )
            ++i;
        return {
            from: d(n.line, r),
            to: d(n.line, i),
            word: o.slice(r, i)
        }
    }

    function o(e) {
        var t = e.getCursor(),
                n = e.scanForBracket(t, -1);
        if (n)
            for (; ; ) {
                var r = e.scanForBracket(t, 1);
                if (!r)
                    return;
                if (r.ch == g.charAt(g.indexOf(n.ch) + 1))
                    return e.setSelection(d(n.pos.line, n.pos.ch + 1), r.pos, !1), !0;
                t = d(r.pos.line, r.pos.ch + 1)
            }
    }

    function a(t, n) {
        if (t.isReadOnly())
            return e.Pass;
        for (var r, i = t.listSelections(), o = [], a = 0; a < i.length; a++) {
            var s = i[a];
            if (!s.empty()) {
                for (var l = s.from().line, c = s.to().line; a < i.length - 1 && i[a + 1].from().line == c; )
                    c = s[++a].to().line;
                o.push(l, c)
            }
        }
        o.length ? r = !0 : o.push(t.firstLine(), t.lastLine()), t.operation(function () {
            for (var e = [], i = 0; i < o.length; i += 2) {
                var a = o[i],
                        s = o[i + 1],
                        l = d(a, 0),
                        c = d(s),
                        u = t.getRange(l, c, !1);
                n ? u.sort() : u.sort(function (e, t) {
                    var n = e.toUpperCase(),
                            r = t.toUpperCase();
                    return n != r && (e = n, t = r), e < t ? -1 : e == t ? 0 : 1
                }), t.replaceRange(u, l, c), r && e.push({
                    anchor: l,
                    head: c
                })
            }
            r && t.setSelections(e, 0)
        })
    }

    function s(t, n) {
        t.operation(function () {
            for (var r = t.listSelections(), o = [], a = [], s = 0; s < r.length; s++) {
                var l = r[s];
                l.empty() ? (o.push(s), a.push("")) : a.push(n(t.getRange(l.from(), l.to())))
            }
            t.replaceSelections(a, "around", "case");
            for (var c, s = o.length - 1; s >= 0; s--) {
                var l = r[o[s]];
                if (!(c && e.cmpPos(l.head, c) > 0)) {
                    var u = i(t, l.head);
                    c = u.from, t.replaceRange(n(u.word), u.from, u.to)
                }
            }
        })
    }

    function l(t) {
        var n = t.getCursor("from"),
                r = t.getCursor("to");
        if (0 == e.cmpPos(n, r)) {
            var o = i(t, n);
            if (!o.word)
                return;
            n = o.from, r = o.to
        }
        return {
            from: n,
            to: r,
            query: t.getRange(n, r),
            word: o
        }
    }

    function c(e, t) {
        var n = l(e);
        if (n) {
            var r = n.query,
                    i = e.getSearchCursor(r, t ? n.to : n.from);
            (t ? i.findNext() : i.findPrevious()) ? e.setSelection(i.from(), i.to()) : (i = e.getSearchCursor(r, t ? d(e.firstLine(), 0) : e.clipPos(d(e.lastLine()))), (t ? i.findNext() : i.findPrevious()) ? e.setSelection(i.from(), i.to()) : n.word && e.setSelection(n.from, n.to))
        }
    }
    var u = e.keyMap.sublime = {
        fallthrough: "default"
    },
            f = e.commands,
            d = e.Pos,
            p = e.keyMap.default == e.keyMap.macDefault,
            h = p ? "Cmd-" : "Ctrl-";
    f[u["Alt-Left"] = "goSubwordLeft"] = function (e) {
        n(e, -1)
    }, f[u["Alt-Right"] = "goSubwordRight"] = function (e) {
        n(e, 1)
    }, p && (u["Cmd-Left"] = "goLineStartSmart");
    var m = p ? "Ctrl-Alt-" : "Ctrl-";
    f[u[m + "Up"] = "scrollLineUp"] = function (e) {
        var t = e.getScrollInfo();
        if (!e.somethingSelected()) {
            var n = e.lineAtHeight(t.top + t.clientHeight, "local");
            e.getCursor().line >= n && e.execCommand("goLineUp")
        }
        e.scrollTo(null, t.top - e.defaultTextHeight())
    }, f[u[m + "Down"] = "scrollLineDown"] = function (e) {
        var t = e.getScrollInfo();
        if (!e.somethingSelected()) {
            var n = e.lineAtHeight(t.top, "local") + 1;
            e.getCursor().line <= n && e.execCommand("goLineDown")
        }
        e.scrollTo(null, t.top + e.defaultTextHeight())
    }, f[u["Shift-" + h + "L"] = "splitSelectionByLine"] = function (e) {
        for (var t = e.listSelections(), n = [], r = 0; r < t.length; r++)
            for (var i = t[r].from(), o = t[r].to(), a = i.line; a <= o.line; ++a)
                o.line > i.line && a == o.line && 0 == o.ch || n.push({
                    anchor: a == i.line ? i : d(a, 0),
                    head: a == o.line ? o : d(a)
                });
        e.setSelections(n, 0)
    }, u["Shift-Tab"] = "indentLess", f[u.Esc = "singleSelectionTop"] = function (e) {
        var t = e.listSelections()[0];
        e.setSelection(t.anchor, t.head, {
            scroll: !1
        })
    }, f[u[h + "L"] = "selectLine"] = function (e) {
        for (var t = e.listSelections(), n = [], r = 0; r < t.length; r++) {
            var i = t[r];
            n.push({
                anchor: d(i.from().line, 0),
                head: d(i.to().line + 1, 0)
            })
        }
        e.setSelections(n)
    }, u["Shift-Ctrl-K"] = "deleteLine", f[u[h + "Enter"] = "insertLineAfter"] = function (e) {
        return r(e, !1)
    }, f[u["Shift-" + h + "Enter"] = "insertLineBefore"] = function (e) {
        return r(e, !0)
    }, f[u[h + "D"] = "selectNextOccurrence"] = function (t) {
        var n = t.getCursor("from"),
                r = t.getCursor("to"),
                o = t.state.sublimeFindFullWord == t.doc.sel;
        if (0 == e.cmpPos(n, r)) {
            var a = i(t, n);
            if (!a.word)
                return;
            t.setSelection(a.from, a.to), o = !0
        } else {
            var s = t.getRange(n, r),
                    l = o ? new RegExp("\\b" + s + "\\b") : s,
                    c = t.getSearchCursor(l, r);
            c.findNext() ? t.addSelection(c.from(), c.to()) : (c = t.getSearchCursor(l, d(t.firstLine(), 0)), c.findNext() && t.addSelection(c.from(), c.to()))
        }
        o && (t.state.sublimeFindFullWord = t.doc.sel)
    };
    var g = "(){}[]";
    f[u["Shift-" + h + "Space"] = "selectScope"] = function (e) {
        o(e) || e.execCommand("selectAll")
    }, f[u["Shift-" + h + "M"] = "selectBetweenBrackets"] = function (t) {
        if (!o(t))
            return e.Pass
    }, f[u[h + "M"] = "goToBracket"] = function (t) {
        t.extendSelectionsBy(function (n) {
            var r = t.scanForBracket(n.head, 1);
            if (r && 0 != e.cmpPos(r.pos, n.head))
                return r.pos;
            var i = t.scanForBracket(n.head, -1);
            return i && d(i.pos.line, i.pos.ch + 1) || n.head
        })
    };
    var v = p ? "Cmd-Ctrl-" : "Shift-Ctrl-";
    f[u[v + "Up"] = "swapLineUp"] = function (t) {
        if (t.isReadOnly())
            return e.Pass;
        for (var n = t.listSelections(), r = [], i = t.firstLine() - 1, o = [], a = 0; a < n.length; a++) {
            var s = n[a],
                    l = s.from().line - 1,
                    c = s.to().line;
            o.push({
                anchor: d(s.anchor.line - 1, s.anchor.ch),
                head: d(s.head.line - 1, s.head.ch)
            }), 0 != s.to().ch || s.empty() || --c, l > i ? r.push(l, c) : r.length && (r[r.length - 1] = c), i = c
        }
        t.operation(function () {
            for (var e = 0; e < r.length; e += 2) {
                var n = r[e],
                        i = r[e + 1],
                        a = t.getLine(n);
                t.replaceRange("", d(n, 0), d(n + 1, 0), "+swapLine"), i > t.lastLine() ? t.replaceRange("\n" + a, d(t.lastLine()), null, "+swapLine") : t.replaceRange(a + "\n", d(i, 0), null, "+swapLine")
            }
            t.setSelections(o), t.scrollIntoView()
        })
    }, f[u[v + "Down"] = "swapLineDown"] = function (t) {
        if (t.isReadOnly())
            return e.Pass;
        for (var n = t.listSelections(), r = [], i = t.lastLine() + 1, o = n.length - 1; o >= 0; o--) {
            var a = n[o],
                    s = a.to().line + 1,
                    l = a.from().line;
            0 != a.to().ch || a.empty() || s--, s < i ? r.push(s, l) : r.length && (r[r.length - 1] = l), i = l
        }
        t.operation(function () {
            for (var e = r.length - 2; e >= 0; e -= 2) {
                var n = r[e],
                        i = r[e + 1],
                        o = t.getLine(n);
                n == t.lastLine() ? t.replaceRange("", d(n - 1), d(n), "+swapLine") : t.replaceRange("", d(n, 0), d(n + 1, 0), "+swapLine"), t.replaceRange(o + "\n", d(i, 0), null, "+swapLine")
            }
            t.scrollIntoView()
        })
    }, f[u[h + "/"] = "toggleCommentIndented"] = function (e) {
        e.toggleComment({
            indent: !0
        })
    }, f[u[h + "J"] = "joinLines"] = function (e) {
        for (var t = e.listSelections(), n = [], r = 0; r < t.length; r++) {
            for (var i = t[r], o = i.from(), a = o.line, s = i.to().line; r < t.length - 1 && t[r + 1].from().line == s; )
                s = t[++r].to().line;
            n.push({
                start: a,
                end: s,
                anchor: !i.empty() && o
            })
        }
        e.operation(function () {
            for (var t = 0, r = [], i = 0; i < n.length; i++) {
                for (var o, a = n[i], s = a.anchor && d(a.anchor.line - t, a.anchor.ch), l = a.start; l <= a.end; l++) {
                    var c = l - t;
                    l == a.end && (o = d(c, e.getLine(c).length + 1)), c < e.lastLine() && (e.replaceRange(" ", d(c), d(c + 1, /^\s*/.exec(e.getLine(c + 1))[0].length)), ++t)
                }
                r.push({
                    anchor: s || o,
                    head: o
                })
            }
            e.setSelections(r, 0)
        })
    }, f[u["Shift-" + h + "D"] = "duplicateLine"] = function (e) {
        e.operation(function () {
            for (var t = e.listSelections().length, n = 0; n < t; n++) {
                var r = e.listSelections()[n];
                r.empty() ? e.replaceRange(e.getLine(r.head.line) + "\n", d(r.head.line, 0)) : e.replaceRange(e.getRange(r.from(), r.to()), r.from())
            }
            e.scrollIntoView()
        })
    }, u[h + "T"] = "transposeChars", f[u.F9 = "sortLines"] = function (e) {
        a(e, !0)
    }, f[u[h + "F9"] = "sortLinesInsensitive"] = function (e) {
        a(e, !1)
    }, f[u.F2 = "nextBookmark"] = function (e) {
        var t = e.state.sublimeBookmarks;
        if (t)
            for (; t.length; ) {
                var n = t.shift(),
                        r = n.find();
                if (r)
                    return t.push(n), e.setSelection(r.from, r.to)
            }
    }, f[u["Shift-F2"] = "prevBookmark"] = function (e) {
        var t = e.state.sublimeBookmarks;
        if (t)
            for (; t.length; ) {
                t.unshift(t.pop());
                var n = t[t.length - 1].find();
                if (n)
                    return e.setSelection(n.from, n.to);
                t.pop()
            }
    }, f[u[h + "F2"] = "toggleBookmark"] = function (e) {
        for (var t = e.listSelections(), n = e.state.sublimeBookmarks || (e.state.sublimeBookmarks = []), r = 0; r < t.length; r++) {
            for (var i = t[r].from(), o = t[r].to(), a = e.findMarks(i, o), s = 0; s < a.length; s++)
                if (a[s].sublimeBookmark) {
                    a[s].clear();
                    for (var l = 0; l < n.length; l++)
                        n[l] == a[s] && n.splice(l--, 1);
                    break
                }
            s == a.length && n.push(e.markText(i, o, {
                sublimeBookmark: !0,
                clearWhenEmpty: !1
            }))
        }
    }, f[u["Shift-" + h + "F2"] = "clearBookmarks"] = function (e) {
        var t = e.state.sublimeBookmarks;
        if (t)
            for (var n = 0; n < t.length; n++)
                t[n].clear();
        t.length = 0
    }, f[u["Alt-F2"] = "selectBookmarks"] = function (e) {
        var t = e.state.sublimeBookmarks,
                n = [];
        if (t)
            for (var r = 0; r < t.length; r++) {
                var i = t[r].find();
                i ? n.push({
                    anchor: i.from,
                    head: i.to
                }) : t.splice(r--, 0)
            }
        n.length && e.setSelections(n, 0)
    }, u["Alt-Q"] = "wrapLines";
    var y = h + "K ";
    u[y + h + "Backspace"] = "delLineLeft", f[u.Backspace = "smartBackspace"] = function (t) {
        if (t.somethingSelected())
            return e.Pass;
        var n = t.getCursor(),
                r = t.getRange({
                    line: n.line,
                    ch: 0
                }, n),
                i = e.countColumn(r, null, t.getOption("tabSize")),
                o = t.getOption("indentUnit");
        if (r && !/\S/.test(r) && i % o == 0) {
            var a = new d(n.line, e.findColumn(r, i - o, o));
            return a.ch == n.ch ? e.Pass : t.replaceRange("", a, n, "+delete")
        }
        return e.Pass
    }, f[u[y + h + "K"] = "delLineRight"] = function (e) {
        e.operation(function () {
            for (var t = e.listSelections(), n = t.length - 1; n >= 0; n--)
                e.replaceRange("", t[n].anchor, d(t[n].to().line), "+delete");
            e.scrollIntoView()
        })
    }, f[u[y + h + "U"] = "upcaseAtCursor"] = function (e) {
        s(e, function (e) {
            return e.toUpperCase()
        })
    }, f[u[y + h + "L"] = "downcaseAtCursor"] = function (e) {
        s(e, function (e) {
            return e.toLowerCase()
        })
    }, f[u[y + h + "Space"] = "setSublimeMark"] = function (e) {
        e.state.sublimeMark && e.state.sublimeMark.clear(), e.state.sublimeMark = e.setBookmark(e.getCursor())
    }, f[u[y + h + "A"] = "selectToSublimeMark"] = function (e) {
        var t = e.state.sublimeMark && e.state.sublimeMark.find();
        t && e.setSelection(e.getCursor(), t)
    }, f[u[y + h + "W"] = "deleteToSublimeMark"] = function (t) {
        var n = t.state.sublimeMark && t.state.sublimeMark.find();
        if (n) {
            var r = t.getCursor(),
                    i = n;
            if (e.cmpPos(r, i) > 0) {
                var o = i;
                i = r, r = o
            }
            t.state.sublimeKilled = t.getRange(r, i), t.replaceRange("", r, i)
        }
    }, f[u[y + h + "X"] = "swapWithSublimeMark"] = function (e) {
        var t = e.state.sublimeMark && e.state.sublimeMark.find();
        t && (e.state.sublimeMark.clear(), e.state.sublimeMark = e.setBookmark(e.getCursor()), e.setCursor(t))
    }, f[u[y + h + "Y"] = "sublimeYank"] = function (e) {
        null != e.state.sublimeKilled && e.replaceSelection(e.state.sublimeKilled, null, "paste")
    }, u[y + h + "G"] = "clearBookmarks", f[u[y + h + "C"] = "showInCenter"] = function (e) {
        var t = e.cursorCoords(null, "local");
        e.scrollTo(null, (t.top + t.bottom) / 2 - e.getScrollInfo().clientHeight / 2)
    }, f[u["Shift-Alt-Up"] = "selectLinesUpward"] = function (e) {
        e.operation(function () {
            for (var t = e.listSelections(), n = 0; n < t.length; n++) {
                var r = t[n];
                r.head.line > e.firstLine() && e.addSelection(d(r.head.line - 1, r.head.ch))
            }
        })
    }, f[u["Shift-Alt-Down"] = "selectLinesDownward"] = function (e) {
        e.operation(function () {
            for (var t = e.listSelections(), n = 0; n < t.length; n++) {
                var r = t[n];
                r.head.line < e.lastLine() && e.addSelection(d(r.head.line + 1, r.head.ch))
            }
        })
    }, f[u[h + "F3"] = "findUnder"] = function (e) {
        c(e, !0)
    }, f[u["Shift-" + h + "F3"] = "findUnderPrevious"] = function (e) {
        c(e, !1)
    }, f[u["Alt-F3"] = "findAllUnder"] = function (e) {
        var t = l(e);
        if (t) {
            for (var n = e.getSearchCursor(t.query), r = [], i = -1; n.findNext(); )
                r.push({
                    anchor: n.from(),
                    head: n.to()
                }), n.from().line <= t.from.line && n.from().ch <= t.from.ch && i++;
            e.setSelections(r, i)
        }
    }, u["Shift-" + h + "["] = "fold", u["Shift-" + h + "]"] = "unfold", u[y + h + "0"] = u[y + h + "j"] = "unfoldAll", u[h + "I"] = "findIncremental", u["Shift-" + h + "I"] = "findIncrementalReverse", u[h + "H"] = "replace", u.F3 = "findNext", u["Shift-F3"] = "findPrev", e.normalizeKeyMap(u)
});
var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
    return typeof e
} : function (e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e
};
!function (e) {
    e(CodeMirror)
}(function (e) {
    var t = [{
            keys: "<Left>",
            type: "keyToKey",
            toKeys: "h"
        }, {
            keys: "<Right>",
            type: "keyToKey",
            toKeys: "l"
        }, {
            keys: "<Up>",
            type: "keyToKey",
            toKeys: "k"
        }, {
            keys: "<Down>",
            type: "keyToKey",
            toKeys: "j"
        }, {
            keys: "<Space>",
            type: "keyToKey",
            toKeys: "l"
        }, {
            keys: "<BS>",
            type: "keyToKey",
            toKeys: "h",
            context: "normal"
        }, {
            keys: "<C-Space>",
            type: "keyToKey",
            toKeys: "W"
        }, {
            keys: "<C-BS>",
            type: "keyToKey",
            toKeys: "B",
            context: "normal"
        }, {
            keys: "<S-Space>",
            type: "keyToKey",
            toKeys: "w"
        }, {
            keys: "<S-BS>",
            type: "keyToKey",
            toKeys: "b",
            context: "normal"
        }, {
            keys: "<C-n>",
            type: "keyToKey",
            toKeys: "j"
        }, {
            keys: "<C-p>",
            type: "keyToKey",
            toKeys: "k"
        }, {
            keys: "<C-[>",
            type: "keyToKey",
            toKeys: "<Esc>"
        }, {
            keys: "<C-c>",
            type: "keyToKey",
            toKeys: "<Esc>"
        }, {
            keys: "<C-[>",
            type: "keyToKey",
            toKeys: "<Esc>",
            context: "insert"
        }, {
            keys: "<C-c>",
            type: "keyToKey",
            toKeys: "<Esc>",
            context: "insert"
        }, {
            keys: "s",
            type: "keyToKey",
            toKeys: "cl",
            context: "normal"
        }, {
            keys: "s",
            type: "keyToKey",
            toKeys: "c",
            context: "visual"
        }, {
            keys: "S",
            type: "keyToKey",
            toKeys: "cc",
            context: "normal"
        }, {
            keys: "S",
            type: "keyToKey",
            toKeys: "VdO",
            context: "visual"
        }, {
            keys: "<Home>",
            type: "keyToKey",
            toKeys: "0"
        }, {
            keys: "<End>",
            type: "keyToKey",
            toKeys: "$"
        }, {
            keys: "<PageUp>",
            type: "keyToKey",
            toKeys: "<C-b>"
        }, {
            keys: "<PageDown>",
            type: "keyToKey",
            toKeys: "<C-f>"
        }, {
            keys: "<CR>",
            type: "keyToKey",
            toKeys: "j^",
            context: "normal"
        }, {
            keys: "H",
            type: "motion",
            motion: "moveToTopLine",
            motionArgs: {
                linewise: !0,
                toJumplist: !0
            }
        }, {
            keys: "M",
            type: "motion",
            motion: "moveToMiddleLine",
            motionArgs: {
                linewise: !0,
                toJumplist: !0
            }
        }, {
            keys: "L",
            type: "motion",
            motion: "moveToBottomLine",
            motionArgs: {
                linewise: !0,
                toJumplist: !0
            }
        }, {
            keys: "h",
            type: "motion",
            motion: "moveByCharacters",
            motionArgs: {
                forward: !1
            }
        }, {
            keys: "l",
            type: "motion",
            motion: "moveByCharacters",
            motionArgs: {
                forward: !0
            }
        }, {
            keys: "j",
            type: "motion",
            motion: "moveByLines",
            motionArgs: {
                forward: !0,
                linewise: !0
            }
        }, {
            keys: "k",
            type: "motion",
            motion: "moveByLines",
            motionArgs: {
                forward: !1,
                linewise: !0
            }
        }, {
            keys: "gj",
            type: "motion",
            motion: "moveByDisplayLines",
            motionArgs: {
                forward: !0
            }
        }, {
            keys: "gk",
            type: "motion",
            motion: "moveByDisplayLines",
            motionArgs: {
                forward: !1
            }
        }, {
            keys: "w",
            type: "motion",
            motion: "moveByWords",
            motionArgs: {
                forward: !0,
                wordEnd: !1
            }
        }, {
            keys: "W",
            type: "motion",
            motion: "moveByWords",
            motionArgs: {
                forward: !0,
                wordEnd: !1,
                bigWord: !0
            }
        }, {
            keys: "e",
            type: "motion",
            motion: "moveByWords",
            motionArgs: {
                forward: !0,
                wordEnd: !0,
                inclusive: !0
            }
        }, {
            keys: "E",
            type: "motion",
            motion: "moveByWords",
            motionArgs: {
                forward: !0,
                wordEnd: !0,
                bigWord: !0,
                inclusive: !0
            }
        }, {
            keys: "b",
            type: "motion",
            motion: "moveByWords",
            motionArgs: {
                forward: !1,
                wordEnd: !1
            }
        }, {
            keys: "B",
            type: "motion",
            motion: "moveByWords",
            motionArgs: {
                forward: !1,
                wordEnd: !1,
                bigWord: !0
            }
        }, {
            keys: "ge",
            type: "motion",
            motion: "moveByWords",
            motionArgs: {
                forward: !1,
                wordEnd: !0,
                inclusive: !0
            }
        }, {
            keys: "gE",
            type: "motion",
            motion: "moveByWords",
            motionArgs: {
                forward: !1,
                wordEnd: !0,
                bigWord: !0,
                inclusive: !0
            }
        }, {
            keys: "{",
            type: "motion",
            motion: "moveByParagraph",
            motionArgs: {
                forward: !1,
                toJumplist: !0
            }
        }, {
            keys: "}",
            type: "motion",
            motion: "moveByParagraph",
            motionArgs: {
                forward: !0,
                toJumplist: !0
            }
        }, {
            keys: "<C-f>",
            type: "motion",
            motion: "moveByPage",
            motionArgs: {
                forward: !0
            }
        }, {
            keys: "<C-b>",
            type: "motion",
            motion: "moveByPage",
            motionArgs: {
                forward: !1
            }
        }, {
            keys: "<C-d>",
            type: "motion",
            motion: "moveByScroll",
            motionArgs: {
                forward: !0,
                explicitRepeat: !0
            }
        }, {
            keys: "<C-u>",
            type: "motion",
            motion: "moveByScroll",
            motionArgs: {
                forward: !1,
                explicitRepeat: !0
            }
        }, {
            keys: "gg",
            type: "motion",
            motion: "moveToLineOrEdgeOfDocument",
            motionArgs: {
                forward: !1,
                explicitRepeat: !0,
                linewise: !0,
                toJumplist: !0
            }
        }, {
            keys: "G",
            type: "motion",
            motion: "moveToLineOrEdgeOfDocument",
            motionArgs: {
                forward: !0,
                explicitRepeat: !0,
                linewise: !0,
                toJumplist: !0
            }
        }, {
            keys: "0",
            type: "motion",
            motion: "moveToStartOfLine"
        }, {
            keys: "^",
            type: "motion",
            motion: "moveToFirstNonWhiteSpaceCharacter"
        }, {
            keys: "+",
            type: "motion",
            motion: "moveByLines",
            motionArgs: {
                forward: !0,
                toFirstChar: !0
            }
        }, {
            keys: "-",
            type: "motion",
            motion: "moveByLines",
            motionArgs: {
                forward: !1,
                toFirstChar: !0
            }
        }, {
            keys: "_",
            type: "motion",
            motion: "moveByLines",
            motionArgs: {
                forward: !0,
                toFirstChar: !0,
                repeatOffset: -1
            }
        }, {
            keys: "$",
            type: "motion",
            motion: "moveToEol",
            motionArgs: {
                inclusive: !0
            }
        }, {
            keys: "%",
            type: "motion",
            motion: "moveToMatchedSymbol",
            motionArgs: {
                inclusive: !0,
                toJumplist: !0
            }
        }, {
            keys: "f<character>",
            type: "motion",
            motion: "moveToCharacter",
            motionArgs: {
                forward: !0,
                inclusive: !0
            }
        }, {
            keys: "F<character>",
            type: "motion",
            motion: "moveToCharacter",
            motionArgs: {
                forward: !1
            }
        }, {
            keys: "t<character>",
            type: "motion",
            motion: "moveTillCharacter",
            motionArgs: {
                forward: !0,
                inclusive: !0
            }
        }, {
            keys: "T<character>",
            type: "motion",
            motion: "moveTillCharacter",
            motionArgs: {
                forward: !1
            }
        }, {
            keys: ";",
            type: "motion",
            motion: "repeatLastCharacterSearch",
            motionArgs: {
                forward: !0
            }
        }, {
            keys: ",",
            type: "motion",
            motion: "repeatLastCharacterSearch",
            motionArgs: {
                forward: !1
            }
        }, {
            keys: "'<character>",
            type: "motion",
            motion: "goToMark",
            motionArgs: {
                toJumplist: !0,
                linewise: !0
            }
        }, {
            keys: "`<character>",
            type: "motion",
            motion: "goToMark",
            motionArgs: {
                toJumplist: !0
            }
        }, {
            keys: "]`",
            type: "motion",
            motion: "jumpToMark",
            motionArgs: {
                forward: !0
            }
        }, {
            keys: "[`",
            type: "motion",
            motion: "jumpToMark",
            motionArgs: {
                forward: !1
            }
        }, {
            keys: "]'",
            type: "motion",
            motion: "jumpToMark",
            motionArgs: {
                forward: !0,
                linewise: !0
            }
        }, {
            keys: "['",
            type: "motion",
            motion: "jumpToMark",
            motionArgs: {
                forward: !1,
                linewise: !0
            }
        }, {
            keys: "]p",
            type: "action",
            action: "paste",
            isEdit: !0,
            actionArgs: {
                after: !0,
                isEdit: !0,
                matchIndent: !0
            }
        }, {
            keys: "[p",
            type: "action",
            action: "paste",
            isEdit: !0,
            actionArgs: {
                after: !1,
                isEdit: !0,
                matchIndent: !0
            }
        }, {
            keys: "]<character>",
            type: "motion",
            motion: "moveToSymbol",
            motionArgs: {
                forward: !0,
                toJumplist: !0
            }
        }, {
            keys: "[<character>",
            type: "motion",
            motion: "moveToSymbol",
            motionArgs: {
                forward: !1,
                toJumplist: !0
            }
        }, {
            keys: "|",
            type: "motion",
            motion: "moveToColumn"
        }, {
            keys: "o",
            type: "motion",
            motion: "moveToOtherHighlightedEnd",
            context: "visual"
        }, {
            keys: "O",
            type: "motion",
            motion: "moveToOtherHighlightedEnd",
            motionArgs: {
                sameLine: !0
            },
            context: "visual"
        }, {
            keys: "d",
            type: "operator",
            operator: "delete"
        }, {
            keys: "y",
            type: "operator",
            operator: "yank"
        }, {
            keys: "c",
            type: "operator",
            operator: "change"
        }, {
            keys: ">",
            type: "operator",
            operator: "indent",
            operatorArgs: {
                indentRight: !0
            }
        }, {
            keys: "<",
            type: "operator",
            operator: "indent",
            operatorArgs: {
                indentRight: !1
            }
        }, {
            keys: "g~",
            type: "operator",
            operator: "changeCase"
        }, {
            keys: "gu",
            type: "operator",
            operator: "changeCase",
            operatorArgs: {
                toLower: !0
            },
            isEdit: !0
        }, {
            keys: "gU",
            type: "operator",
            operator: "changeCase",
            operatorArgs: {
                toLower: !1
            },
            isEdit: !0
        }, {
            keys: "n",
            type: "motion",
            motion: "findNext",
            motionArgs: {
                forward: !0,
                toJumplist: !0
            }
        }, {
            keys: "N",
            type: "motion",
            motion: "findNext",
            motionArgs: {
                forward: !1,
                toJumplist: !0
            }
        }, {
            keys: "x",
            type: "operatorMotion",
            operator: "delete",
            motion: "moveByCharacters",
            motionArgs: {
                forward: !0
            },
            operatorMotionArgs: {
                visualLine: !1
            }
        }, {
            keys: "X",
            type: "operatorMotion",
            operator: "delete",
            motion: "moveByCharacters",
            motionArgs: {
                forward: !1
            },
            operatorMotionArgs: {
                visualLine: !0
            }
        }, {
            keys: "D",
            type: "operatorMotion",
            operator: "delete",
            motion: "moveToEol",
            motionArgs: {
                inclusive: !0
            },
            context: "normal"
        }, {
            keys: "D",
            type: "operator",
            operator: "delete",
            operatorArgs: {
                linewise: !0
            },
            context: "visual"
        }, {
            keys: "Y",
            type: "operatorMotion",
            operator: "yank",
            motion: "moveToEol",
            motionArgs: {
                inclusive: !0
            },
            context: "normal"
        }, {
            keys: "Y",
            type: "operator",
            operator: "yank",
            operatorArgs: {
                linewise: !0
            },
            context: "visual"
        }, {
            keys: "C",
            type: "operatorMotion",
            operator: "change",
            motion: "moveToEol",
            motionArgs: {
                inclusive: !0
            },
            context: "normal"
        }, {
            keys: "C",
            type: "operator",
            operator: "change",
            operatorArgs: {
                linewise: !0
            },
            context: "visual"
        }, {
            keys: "~",
            type: "operatorMotion",
            operator: "changeCase",
            motion: "moveByCharacters",
            motionArgs: {
                forward: !0
            },
            operatorArgs: {
                shouldMoveCursor: !0
            },
            context: "normal"
        }, {
            keys: "~",
            type: "operator",
            operator: "changeCase",
            context: "visual"
        }, {
            keys: "<C-w>",
            type: "operatorMotion",
            operator: "delete",
            motion: "moveByWords",
            motionArgs: {
                forward: !1,
                wordEnd: !1
            },
            context: "insert"
        }, {
            keys: "<C-i>",
            type: "action",
            action: "jumpListWalk",
            actionArgs: {
                forward: !0
            }
        }, {
            keys: "<C-o>",
            type: "action",
            action: "jumpListWalk",
            actionArgs: {
                forward: !1
            }
        }, {
            keys: "<C-e>",
            type: "action",
            action: "scroll",
            actionArgs: {
                forward: !0,
                linewise: !0
            }
        }, {
            keys: "<C-y>",
            type: "action",
            action: "scroll",
            actionArgs: {
                forward: !1,
                linewise: !0
            }
        }, {
            keys: "a",
            type: "action",
            action: "enterInsertMode",
            isEdit: !0,
            actionArgs: {
                insertAt: "charAfter"
            },
            context: "normal"
        }, {
            keys: "A",
            type: "action",
            action: "enterInsertMode",
            isEdit: !0,
            actionArgs: {
                insertAt: "eol"
            },
            context: "normal"
        }, {
            keys: "A",
            type: "action",
            action: "enterInsertMode",
            isEdit: !0,
            actionArgs: {
                insertAt: "endOfSelectedArea"
            },
            context: "visual"
        }, {
            keys: "i",
            type: "action",
            action: "enterInsertMode",
            isEdit: !0,
            actionArgs: {
                insertAt: "inplace"
            },
            context: "normal"
        }, {
            keys: "I",
            type: "action",
            action: "enterInsertMode",
            isEdit: !0,
            actionArgs: {
                insertAt: "firstNonBlank"
            },
            context: "normal"
        }, {
            keys: "I",
            type: "action",
            action: "enterInsertMode",
            isEdit: !0,
            actionArgs: {
                insertAt: "startOfSelectedArea"
            },
            context: "visual"
        }, {
            keys: "o",
            type: "action",
            action: "newLineAndEnterInsertMode",
            isEdit: !0,
            interlaceInsertRepeat: !0,
            actionArgs: {
                after: !0
            },
            context: "normal"
        }, {
            keys: "O",
            type: "action",
            action: "newLineAndEnterInsertMode",
            isEdit: !0,
            interlaceInsertRepeat: !0,
            actionArgs: {
                after: !1
            },
            context: "normal"
        }, {
            keys: "v",
            type: "action",
            action: "toggleVisualMode"
        }, {
            keys: "V",
            type: "action",
            action: "toggleVisualMode",
            actionArgs: {
                linewise: !0
            }
        }, {
            keys: "<C-v>",
            type: "action",
            action: "toggleVisualMode",
            actionArgs: {
                blockwise: !0
            }
        }, {
            keys: "<C-q>",
            type: "action",
            action: "toggleVisualMode",
            actionArgs: {
                blockwise: !0
            }
        }, {
            keys: "gv",
            type: "action",
            action: "reselectLastSelection"
        }, {
            keys: "J",
            type: "action",
            action: "joinLines",
            isEdit: !0
        }, {
            keys: "p",
            type: "action",
            action: "paste",
            isEdit: !0,
            actionArgs: {
                after: !0,
                isEdit: !0
            }
        }, {
            keys: "P",
            type: "action",
            action: "paste",
            isEdit: !0,
            actionArgs: {
                after: !1,
                isEdit: !0
            }
        }, {
            keys: "r<character>",
            type: "action",
            action: "replace",
            isEdit: !0
        }, {
            keys: "@<character>",
            type: "action",
            action: "replayMacro"
        }, {
            keys: "q<character>",
            type: "action",
            action: "enterMacroRecordMode"
        }, {
            keys: "R",
            type: "action",
            action: "enterInsertMode",
            isEdit: !0,
            actionArgs: {
                replace: !0
            }
        }, {
            keys: "u",
            type: "action",
            action: "undo",
            context: "normal"
        }, {
            keys: "u",
            type: "operator",
            operator: "changeCase",
            operatorArgs: {
                toLower: !0
            },
            context: "visual",
            isEdit: !0
        }, {
            keys: "U",
            type: "operator",
            operator: "changeCase",
            operatorArgs: {
                toLower: !1
            },
            context: "visual",
            isEdit: !0
        }, {
            keys: "<C-r>",
            type: "action",
            action: "redo"
        }, {
            keys: "m<character>",
            type: "action",
            action: "setMark"
        }, {
            keys: '"<character>',
            type: "action",
            action: "setRegister"
        }, {
            keys: "zz",
            type: "action",
            action: "scrollToCursor",
            actionArgs: {
                position: "center"
            }
        }, {
            keys: "z.",
            type: "action",
            action: "scrollToCursor",
            actionArgs: {
                position: "center"
            },
            motion: "moveToFirstNonWhiteSpaceCharacter"
        }, {
            keys: "zt",
            type: "action",
            action: "scrollToCursor",
            actionArgs: {
                position: "top"
            }
        }, {
            keys: "z<CR>",
            type: "action",
            action: "scrollToCursor",
            actionArgs: {
                position: "top"
            },
            motion: "moveToFirstNonWhiteSpaceCharacter"
        }, {
            keys: "z-",
            type: "action",
            action: "scrollToCursor",
            actionArgs: {
                position: "bottom"
            }
        }, {
            keys: "zb",
            type: "action",
            action: "scrollToCursor",
            actionArgs: {
                position: "bottom"
            },
            motion: "moveToFirstNonWhiteSpaceCharacter"
        }, {
            keys: ".",
            type: "action",
            action: "repeatLastEdit"
        }, {
            keys: "<C-a>",
            type: "action",
            action: "incrementNumberToken",
            isEdit: !0,
            actionArgs: {
                increase: !0,
                backtrack: !1
            }
        }, {
            keys: "<C-x>",
            type: "action",
            action: "incrementNumberToken",
            isEdit: !0,
            actionArgs: {
                increase: !1,
                backtrack: !1
            }
        }, {
            keys: "a<character>",
            type: "motion",
            motion: "textObjectManipulation"
        }, {
            keys: "i<character>",
            type: "motion",
            motion: "textObjectManipulation",
            motionArgs: {
                textObjectInner: !0
            }
        }, {
            keys: "/",
            type: "search",
            searchArgs: {
                forward: !0,
                querySrc: "prompt",
                toJumplist: !0
            }
        }, {
            keys: "?",
            type: "search",
            searchArgs: {
                forward: !1,
                querySrc: "prompt",
                toJumplist: !0
            }
        }, {
            keys: "*",
            type: "search",
            searchArgs: {
                forward: !0,
                querySrc: "wordUnderCursor",
                wholeWordOnly: !0,
                toJumplist: !0
            }
        }, {
            keys: "#",
            type: "search",
            searchArgs: {
                forward: !1,
                querySrc: "wordUnderCursor",
                wholeWordOnly: !0,
                toJumplist: !0
            }
        }, {
            keys: "g*",
            type: "search",
            searchArgs: {
                forward: !0,
                querySrc: "wordUnderCursor",
                toJumplist: !0
            }
        }, {
            keys: "g#",
            type: "search",
            searchArgs: {
                forward: !1,
                querySrc: "wordUnderCursor",
                toJumplist: !0
            }
        }, {
            keys: ":",
            type: "ex"
        }],
            n = [{
                    name: "colorscheme",
                    shortName: "colo"
                }, {
                    name: "map"
                }, {
                    name: "imap",
                    shortName: "im"
                }, {
                    name: "nmap",
                    shortName: "nm"
                }, {
                    name: "vmap",
                    shortName: "vm"
                }, {
                    name: "unmap"
                }, {
                    name: "write",
                    shortName: "w"
                }, {
                    name: "undo",
                    shortName: "u"
                }, {
                    name: "redo",
                    shortName: "red"
                }, {
                    name: "set",
                    shortName: "se"
                }, {
                    name: "set",
                    shortName: "se"
                }, {
                    name: "setlocal",
                    shortName: "setl"
                }, {
                    name: "setglobal",
                    shortName: "setg"
                }, {
                    name: "sort",
                    shortName: "sor"
                }, {
                    name: "substitute",
                    shortName: "s",
                    possiblyAsync: !0
                }, {
                    name: "nohlsearch",
                    shortName: "noh"
                }, {
                    name: "yank",
                    shortName: "y"
                }, {
                    name: "delmarks",
                    shortName: "delm"
                }, {
                    name: "registers",
                    shortName: "reg",
                    excludeFromCommandHistory: !0
                }, {
                    name: "global",
                    shortName: "g"
                }],
            r = e.Pos,
            i = function () {
                function i(t) {
                    t.setOption("disableInput", !0), t.setOption("showCursorWhenSelecting", !1), e.signal(t, "vim-mode-change", {
                        mode: "normal"
                    }), t.on("cursorActivity", et), x(t), e.on(t.getInputField(), "paste", u(t))
                }

                function o(t) {
                    t.setOption("disableInput", !1), t.off("cursorActivity", et), e.off(t.getInputField(), "paste", u(t)), t.state.vim = null
                }

                function a(t, n) {
                    this == e.keyMap.vim && e.rmClass(t.getWrapperElement(), "cm-fat-cursor"), n && n.attach == s || o(t, !1)
                }

                function s(t, n) {
                    this == e.keyMap.vim && e.addClass(t.getWrapperElement(), "cm-fat-cursor"), n && n.attach == s || i(t)
                }

                function l(t, n) {
                    if (n) {
                        var r = c(t);
                        if (!r)
                            return !1;
                        var i = e.Vim.findKey(n, r);
                        return "function" == typeof i && e.signal(n, "vim-keypress", r), i
                    }
                }

                function c(e) {
                    if ("'" == e.charAt(0))
                        return e.charAt(1);
                    var t = e.split(/-(?!$)/),
                            n = t[t.length - 1];
                    if (1 == t.length && 1 == t[0].length)
                        return !1;
                    if (2 == t.length && "Shift" == t[0] && 1 == n.length)
                        return !1;
                    for (var r = !1, i = 0; i < t.length; i++) {
                        var o = t[i];
                        o in st ? t[i] = st[o] : r = !0, o in lt && (t[i] = lt[o])
                    }
                    return !!r && (g(n) && (t[t.length - 1] = n.toLowerCase()), "<" + t.join("-") + ">")
                }

                function u(e) {
                    var t = e.state.vim;
                    return t.onPasteFn || (t.onPasteFn = function () {
                        t.insertMode || (e.setCursor(D(e.getCursor(), 0, 1)), Lt.enterInsertMode(e, {}, t))
                    }), t.onPasteFn
                }

                function f(e, t) {
                    for (var n = [], r = e; r < e + t; r++)
                        n.push(String.fromCharCode(r));
                    return n
                }

                function d(e, t) {
                    return t >= e.firstLine() && t <= e.lastLine()
                }

                function p(e) {
                    return /^[a-z]$/.test(e)
                }

                function h(e) {
                    return "()[]{}".indexOf(e) != -1
                }

                function m(e) {
                    return ct.test(e)
                }

                function g(e) {
                    return /^[A-Z]$/.test(e)
                }

                function v(e) {
                    return /^\s*$/.test(e)
                }

                function y(e, t) {
                    for (var n = 0; n < t.length; n++)
                        if (t[n] == e)
                            return !0;
                    return !1
                }

                function _(e, t, n, r, i) {
                    if (void 0 === t && !i)
                        throw Error("defaultValue is required unless callback is provided");
                    if (n || (n = "string"), vt[e] = {
                        type: n,
                        defaultValue: t,
                        callback: i
                    }, r)
                        for (var o = 0; o < r.length; o++)
                            vt[r[o]] = vt[e];
                    t && b(e, t)
                }

                function b(e, t, n, r) {
                    var i = vt[e];
                    r = r || {};
                    var o = r.scope;
                    if (!i)
                        throw Error("Unknown option: " + e);
                    if ("boolean" == i.type) {
                        if (t && t !== !0)
                            throw Error("Invalid argument: " + e + "=" + t);
                        t !== !1 && (t = !0)
                    }
                    i.callback ? ("local" !== o && i.callback(t, void 0), "global" !== o && n && i.callback(t, n)) : ("local" !== o && (i.value = "boolean" == i.type ? !!t : t), "global" !== o && n && (n.state.vim.options[e] = {
                        value: t
                    }))
                }

                function w(e, t, n) {
                    var r = vt[e];
                    n = n || {};
                    var i = n.scope;
                    if (!r)
                        throw Error("Unknown option: " + e);
                    {
                        if (!r.callback) {
                            var o = "global" !== i && t && t.state.vim.options[e];
                            return (o || "local" !== i && r || {}).value
                        }
                        var o = t && r.callback(void 0, t);
                        if ("global" !== i && void 0 !== o)
                            return o;
                        if ("local" !== i)
                            return r.callback()
                    }
                }

                function k() {
                    this.latestRegister = void 0, this.isPlaying = !1, this.isRecording = !1, this.replaySearchQueries = [], this.onRecordingDone = void 0, this.lastInsertModeChanges = _t()
                }

                function x(e) {
                    return e.state.vim || (e.state.vim = {
                        inputState: new S,
                        lastEditInputState: void 0,
                        lastEditActionCommand: void 0,
                        lastHPos: -1,
                        lastHSPos: -1,
                        lastMotion: null,
                        marks: {},
                        fakeCursor: null,
                        insertMode: !1,
                        insertModeRepeat: void 0,
                        visualMode: !1,
                        visualLine: !1,
                        visualBlock: !1,
                        lastSelection: null,
                        lastPastedText: null,
                        sel: {},
                        options: {}
                    }), e.state.vim
                }

                function C() {
                    bt = {
                        searchQuery: null,
                        searchIsReversed: !1,
                        lastSubstituteReplacePart: void 0,
                        jumpList: yt(),
                        macroModeState: new k,
                        lastCharacterSearch: {
                            increment: 0,
                            forward: !0,
                            selectedCharacter: ""
                        },
                        registerController: new A({}),
                        searchHistoryController: new E({}),
                        exCommandHistoryController: new E({})
                    };
                    for (var e in vt) {
                        var t = vt[e];
                        t.value = t.defaultValue
                    }
                }

                function S() {
                    this.prefixRepeat = [], this.motionRepeat = [], this.operator = null, this.operatorArgs = null, this.motion = null, this.motionArgs = null, this.keyBuffer = [], this.registerName = null
                }

                function L(t, n) {
                    t.state.vim.inputState = new S, e.signal(t, "vim-command-done", n)
                }

                function M(e, t, n) {
                    this.clear(), this.keyBuffer = [e || ""], this.insertModeChanges = [], this.searchQueries = [], this.linewise = !!t, this.blockwise = !!n
                }

                function T(e, t) {
                    var n = bt.registerController.registers[e];
                    if (!e || 1 != e.length)
                        throw Error("Register name must be 1 character");
                    if (n[e])
                        throw Error("Register already defined " + e);
                    n[e] = t, gt.push(e)
                }

                function A(e) {
                    this.registers = e, this.unnamedRegister = e['"'] = new M, e["."] = new M, e[":"] = new M, e["/"] = new M
                }

                function E() {
                    this.historyBuffer = [], this.iterator = 0, this.initialPrefix = null
                }

                function O(e, t) {
                    Ct[e] = t
                }

                function I(e, t) {
                    for (var n = [], r = 0; r < t; r++)
                        n.push(e);
                    return n
                }

                function R(e, t) {
                    St[e] = t
                }

                function N(e, t) {
                    Lt[e] = t
                }

                function P(e, t, n) {
                    var i = Math.min(Math.max(e.firstLine(), t.line), e.lastLine()),
                            o = X(e, i) - 1;
                    o = n ? o + 1 : o;
                    var a = Math.min(Math.max(0, t.ch), o);
                    return r(i, a)
                }

                function z(e) {
                    var t = {};
                    for (var n in e)
                        e.hasOwnProperty(n) && (t[n] = e[n]);
                    return t
                }

                function D(e, t, n) {
                    return "object" === ("undefined" == typeof t ? "undefined" : _typeof(t)) && (n = t.ch, t = t.line), r(e.line + t, e.ch + n)
                }

                function F(e, t) {
                    return {
                        line: t.line - e.line,
                        ch: t.line - e.line
                    }
                }

                function W(e, t, n, r) {
                    for (var i, o = [], a = [], s = 0; s < t.length; s++) {
                        var l = t[s];
                        "insert" == n && "insert" != l.context || l.context && l.context != n || r.operator && "action" == l.type || !(i = H(e, l.keys)) || ("partial" == i && o.push(l), "full" == i && a.push(l))
                    }
                    return {
                        partial: o.length && o,
                        full: a.length && a
                    }
                }

                function H(e, t) {
                    if ("<character>" == t.slice(-11)) {
                        var n = t.length - 11,
                                r = e.slice(0, n),
                                i = t.slice(0, n);
                        return r == i && e.length > n ? "full" : 0 == i.indexOf(r) && "partial"
                    }
                    return e == t ? "full" : 0 == t.indexOf(e) && "partial"
                }

                function B(e) {
                    var t = /^.*(<[\w\-]+>)$/.exec(e),
                            n = t ? t[1] : e.slice(-1);
                    if (n.length > 1)
                        switch (n) {
                            case "<CR>":
                                n = "\n";
                                break;
                            case "<Space>":
                                n = " "
                        }
                    return n
                }

                function q(e, t, n) {
                    return function () {
                        for (var r = 0; r < n; r++)
                            t(e)
                    }
                }

                function U(e) {
                    return r(e.line, e.ch)
                }

                function $(e, t) {
                    return e.ch == t.ch && e.line == t.line;
                }

                function j(e, t) {
                    return e.line < t.line || e.line == t.line && e.ch < t.ch
                }

                function K(e, t) {
                    return arguments.length > 2 && (t = K.apply(void 0, Array.prototype.slice.call(arguments, 1))), j(e, t) ? e : t
                }

                function V(e, t) {
                    return arguments.length > 2 && (t = V.apply(void 0, Array.prototype.slice.call(arguments, 1))), j(e, t) ? t : e
                }

                function G(e, t, n) {
                    var r = j(e, t),
                            i = j(t, n);
                    return r && i
                }

                function X(e, t) {
                    return e.getLine(t).length
                }

                function Y(e) {
                    return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "")
                }

                function Z(e) {
                    return e.replace(/([.?*+$\[\]\/\\(){}|\-])/g, "\\$1")
                }

                function Q(e, t, n) {
                    var i = X(e, t),
                            o = new Array(n - i + 1).join(" ");
                    e.setCursor(r(t, i)), e.replaceRange(o, e.getCursor())
                }

                function J(e, t) {
                    var n = [],
                            i = e.listSelections(),
                            o = U(e.clipPos(t)),
                            a = !$(t, o),
                            s = e.getCursor("head"),
                            l = te(i, s),
                            c = $(i[l].head, i[l].anchor),
                            u = i.length - 1,
                            f = u - l > l ? u : 0,
                            d = i[f].anchor,
                            p = Math.min(d.line, o.line),
                            h = Math.max(d.line, o.line),
                            m = d.ch,
                            g = o.ch,
                            v = i[f].head.ch - m,
                            y = g - m;
                    v > 0 && y <= 0 ? (m++, a || g--) : v < 0 && y >= 0 ? (m--, c || g++) : v < 0 && y == -1 && (m--, g++);
                    for (var _ = p; _ <= h; _++) {
                        var b = {
                            anchor: new r(_, m),
                            head: new r(_, g)
                        };
                        n.push(b)
                    }
                    return l = o.line == h ? n.length - 1 : 0, e.setSelections(n), t.ch = g, d.ch = m, d
                }

                function ee(e, t, n) {
                    for (var r = [], i = 0; i < n; i++) {
                        var o = D(t, i, 0);
                        r.push({
                            anchor: o,
                            head: o
                        })
                    }
                    e.setSelections(r, 0)
                }

                function te(e, t, n) {
                    for (var r = 0; r < e.length; r++) {
                        var i = "head" != n && $(e[r].anchor, t),
                                o = "anchor" != n && $(e[r].head, t);
                        if (i || o)
                            return r
                    }
                    return -1
                }

                function ne(e, t) {
                    var n = t.lastSelection,
                            i = function () {
                                var t = e.listSelections(),
                                        n = t[0],
                                        r = t[t.length - 1],
                                        i = j(n.anchor, n.head) ? n.anchor : n.head,
                                        o = j(r.anchor, r.head) ? r.head : r.anchor;
                                return [i, o]
                            },
                            o = function () {
                                var t = e.getCursor(),
                                        i = e.getCursor(),
                                        o = n.visualBlock;
                                if (o) {
                                    var a = o.width,
                                            s = o.height;
                                    i = r(t.line + s, t.ch + a);
                                    for (var l = [], c = t.line; c < i.line; c++) {
                                        var u = r(c, t.ch),
                                                f = r(c, i.ch),
                                                d = {
                                                    anchor: u,
                                                    head: f
                                                };
                                        l.push(d)
                                    }
                                    e.setSelections(l)
                                } else {
                                    var p = n.anchorMark.find(),
                                            h = n.headMark.find(),
                                            m = h.line - p.line,
                                            g = h.ch - p.ch;
                                    i = {
                                        line: i.line + m,
                                        ch: m ? i.ch : g + i.ch
                                    }, n.visualLine && (t = r(t.line, 0), i = r(i.line, X(e, i.line))), e.setSelection(t, i)
                                }
                                return [t, i]
                            };
                    return t.visualMode ? i() : o()
                }

                function re(e, t) {
                    var n = t.sel.anchor,
                            r = t.sel.head;
                    t.lastPastedText && (r = e.posFromIndex(e.indexFromPos(n) + t.lastPastedText.length), t.lastPastedText = null), t.lastSelection = {
                        anchorMark: e.setBookmark(n),
                        headMark: e.setBookmark(r),
                        anchor: U(n),
                        head: U(r),
                        visualMode: t.visualMode,
                        visualLine: t.visualLine,
                        visualBlock: t.visualBlock
                    }
                }

                function ie(e, t, n) {
                    var i, o = e.state.vim.sel,
                            a = o.head,
                            s = o.anchor;
                    return j(n, t) && (i = n, n = t, t = i), j(a, s) ? (a = K(t, a), s = V(s, n)) : (s = K(t, s), a = V(a, n), a = D(a, 0, -1), a.ch == -1 && a.line != e.firstLine() && (a = r(a.line - 1, X(e, a.line - 1)))), [s, a]
                }

                function oe(e, t, n) {
                    var r = e.state.vim;
                    t = t || r.sel;
                    var n = n || r.visualLine ? "line" : r.visualBlock ? "block" : "char",
                            i = ae(e, t, n);
                    e.setSelections(i.ranges, i.primary), tt(e)
                }

                function ae(e, t, n, i) {
                    var o = U(t.head),
                            a = U(t.anchor);
                    if ("char" == n) {
                        var s = i || j(t.head, t.anchor) ? 0 : 1,
                                l = j(t.head, t.anchor) ? 1 : 0;
                        return o = D(t.head, 0, s), a = D(t.anchor, 0, l), {
                            ranges: [{
                                    anchor: a,
                                    head: o
                                }],
                            primary: 0
                        }
                    }
                    if ("line" == n) {
                        if (j(t.head, t.anchor))
                            o.ch = 0, a.ch = X(e, a.line);
                        else {
                            a.ch = 0;
                            var c = e.lastLine();
                            o.line > c && (o.line = c), o.ch = X(e, o.line)
                        }
                        return {
                            ranges: [{
                                    anchor: a,
                                    head: o
                                }],
                            primary: 0
                        }
                    }
                    if ("block" == n) {
                        for (var u = Math.min(a.line, o.line), f = Math.min(a.ch, o.ch), d = Math.max(a.line, o.line), p = Math.max(a.ch, o.ch) + 1, h = d - u + 1, m = o.line == u ? 0 : h - 1, g = [], v = 0; v < h; v++)
                            g.push({
                                anchor: r(u + v, f),
                                head: r(u + v, p)
                            });
                        return {
                            ranges: g,
                            primary: m
                        }
                    }
                }

                function se(e) {
                    var t = e.getCursor("head");
                    return 1 == e.getSelection().length && (t = K(t, e.getCursor("anchor"))), t
                }

                function le(t, n) {
                    var r = t.state.vim;
                    n !== !1 && t.setCursor(P(t, r.sel.head)), re(t, r), r.visualMode = !1, r.visualLine = !1, r.visualBlock = !1, e.signal(t, "vim-mode-change", {
                        mode: "normal"
                    }), r.fakeCursor && r.fakeCursor.clear()
                }

                function ce(e, t, n) {
                    var r = e.getRange(t, n);
                    if (/\n\s*$/.test(r)) {
                        var i = r.split("\n");
                        i.pop();
                        for (var o, o = i.pop(); i.length > 0 && o && v(o); o = i.pop())
                            n.line--, n.ch = 0;
                        o ? (n.line--, n.ch = X(e, n.line)) : n.ch = 0
                    }
                }

                function ue(e, t, n) {
                    t.ch = 0, n.ch = 0, n.line++
                }

                function fe(e) {
                    if (!e)
                        return 0;
                    var t = e.search(/\S/);
                    return t == -1 ? e.length : t
                }

                function de(e, t, n, i, o) {
                    for (var a = se(e), s = e.getLine(a.line), l = a.ch, c = o ? ut[0] : ft[0]; !c(s.charAt(l)); )
                        if (l++, l >= s.length)
                            return null;
                    i ? c = ft[0] : (c = ut[0], c(s.charAt(l)) || (c = ut[1]));
                    for (var u = l, f = l; c(s.charAt(u)) && u < s.length; )
                        u++;
                    for (; c(s.charAt(f)) && f >= 0; )
                        f--;
                    if (f++, t) {
                        for (var d = u;
                                /\s/.test(s.charAt(u)) && u < s.length; )
                            u++;
                        if (d == u) {
                            for (var p = f;
                                    /\s/.test(s.charAt(f - 1)) && f > 0; )
                                f--;
                            f || (f = p)
                        }
                    }
                    return {
                        start: r(a.line, f),
                        end: r(a.line, u)
                    }
                }

                function pe(e, t, n) {
                    $(t, n) || bt.jumpList.add(e, t, n)
                }

                function he(e, t) {
                    bt.lastCharacterSearch.increment = e, bt.lastCharacterSearch.forward = t.forward, bt.lastCharacterSearch.selectedCharacter = t.selectedCharacter
                }

                function me(e, t, n, i) {
                    var o = U(e.getCursor()),
                            a = n ? 1 : -1,
                            s = n ? e.lineCount() : -1,
                            l = o.ch,
                            c = o.line,
                            u = e.getLine(c),
                            f = {
                                lineText: u,
                                nextCh: u.charAt(l),
                                lastCh: null,
                                index: l,
                                symb: i,
                                reverseSymb: (n ? {
                                    ")": "(",
                                    "}": "{"
                                } : {
                                    "(": ")",
                                    "{": "}"
                                })[i],
                                forward: n,
                                depth: 0,
                                curMoveThrough: !1
                            },
                            d = Mt[i];
                    if (!d)
                        return o;
                    var p = Tt[d].init,
                            h = Tt[d].isComplete;
                    for (p && p(f); c !== s && t; ) {
                        if (f.index += a, f.nextCh = f.lineText.charAt(f.index), !f.nextCh) {
                            if (c += a, f.lineText = e.getLine(c) || "", a > 0)
                                f.index = 0;
                            else {
                                var m = f.lineText.length;
                                f.index = m > 0 ? m - 1 : 0
                            }
                            f.nextCh = f.lineText.charAt(f.index)
                        }
                        h(f) && (o.line = c, o.ch = f.index, t--)
                    }
                    return f.nextCh || f.curMoveThrough ? r(c, f.index) : o
                }

                function ge(e, t, n, r, i) {
                    var o = t.line,
                            a = t.ch,
                            s = e.getLine(o),
                            l = n ? 1 : -1,
                            c = r ? ft : ut;
                    if (i && "" == s) {
                        if (o += l, s = e.getLine(o), !d(e, o))
                            return null;
                        a = n ? 0 : s.length
                    }
                    for (; ; ) {
                        if (i && "" == s)
                            return {
                                from: 0,
                                to: 0,
                                line: o
                            };
                        for (var u = l > 0 ? s.length : -1, f = u, p = u; a != u; ) {
                            for (var h = !1, m = 0; m < c.length && !h; ++m)
                                if (c[m](s.charAt(a))) {
                                    for (f = a; a != u && c[m](s.charAt(a)); )
                                        a += l;
                                    if (p = a, h = f != p, f == t.ch && o == t.line && p == f + l)
                                        continue;
                                    return {
                                        from: Math.min(f, p + 1),
                                        to: Math.max(f, p),
                                        line: o
                                    }
                                }
                            h || (a += l)
                        }
                        if (o += l, !d(e, o))
                            return null;
                        s = e.getLine(o), a = l > 0 ? 0 : s.length
                    }
                }

                function ve(e, t, n, i, o, a) {
                    var s = U(t),
                            l = [];
                    (i && !o || !i && o) && n++;
                    for (var c = !(i && o), u = 0; u < n; u++) {
                        var f = ge(e, t, i, a, c);
                        if (!f) {
                            var d = X(e, e.lastLine());
                            l.push(i ? {
                                line: e.lastLine(),
                                from: d,
                                to: d
                            } : {
                                line: 0,
                                from: 0,
                                to: 0
                            });
                            break
                        }
                        l.push(f), t = r(f.line, i ? f.to - 1 : f.from)
                    }
                    var p = l.length != n,
                            h = l[0],
                            m = l.pop();
                    return i && !o ? (p || h.from == s.ch && h.line == s.line || (m = l.pop()), r(m.line, m.from)) : i && o ? r(m.line, m.to - 1) : !i && o ? (p || h.to == s.ch && h.line == s.line || (m = l.pop()), r(m.line, m.to)) : r(m.line, m.from)
                }

                function ye(e, t, n, i) {
                    for (var o, a = e.getCursor(), s = a.ch, l = 0; l < t; l++) {
                        var c = e.getLine(a.line);
                        if (o = we(s, c, i, n, !0), o == -1)
                            return null;
                        s = o
                    }
                    return r(e.getCursor().line, o)
                }

                function _e(e, t) {
                    var n = e.getCursor().line;
                    return P(e, r(n, t - 1))
                }

                function be(e, t, n, r) {
                    y(n, mt) && (t.marks[n] && t.marks[n].clear(), t.marks[n] = e.setBookmark(r))
                }

                function we(e, t, n, r, i) {
                    var o;
                    return r ? (o = t.indexOf(n, e + 1), o == -1 || i || (o -= 1)) : (o = t.lastIndexOf(n, e - 1), o == -1 || i || (o += 1)), o
                }

                function ke(e, t, n, i, o) {
                    function a(t) {
                        return !e.getLine(t)
                    }

                    function s(e, t, n) {
                        return n ? a(e) != a(e + t) : !a(e) && a(e + t)
                    }
                    var l, c, u = t.line,
                            f = e.firstLine(),
                            d = e.lastLine(),
                            p = u;
                    if (i) {
                        for (; f <= p && p <= d && n > 0; )
                            s(p, i) && n--, p += i;
                        return new r(p, 0)
                    }
                    var h = e.state.vim;
                    if (h.visualLine && s(u, 1, !0)) {
                        var m = h.sel.anchor;
                        s(m.line, -1, !0) && (o && m.line == u || (u += 1))
                    }
                    var g = a(u);
                    for (p = u; p <= d && n; p++)
                        s(p, 1, !0) && (o && a(p) == g || n--);
                    for (c = new r(p, 0), p > d && !g ? g = !0 : o = !1, p = u; p > f && (o && a(p) != g && p != u || !s(p, - 1, !0)); p--)
                        ;
                    return l = new r(p, 0), {
                        start: l,
                        end: c
                    }
                }

                function xe(e, t, n, i) {
                    var o, a, s = t,
                            l = {
                                "(": /[()]/,
                                ")": /[()]/,
                                "[": /[[\]]/,
                                "]": /[[\]]/,
                                "{": /[{}]/,
                                "}": /[{}]/
                            }[n],
                            c = {
                                "(": "(",
                                ")": "(",
                                "[": "[",
                                "]": "[",
                                "{": "{",
                                "}": "{"
                            }[n],
                            u = e.getLine(s.line).charAt(s.ch),
                            f = u === c ? 1 : 0;
                    if (o = e.scanForBracket(r(s.line, s.ch + f), -1, null, {
                        bracketRegex: l
                    }), a = e.scanForBracket(r(s.line, s.ch + f), 1, null, {
                        bracketRegex: l
                    }), !o || !a)
                        return {
                            start: s,
                            end: s
                        };
                    if (o = o.pos, a = a.pos, o.line == a.line && o.ch > a.ch || o.line > a.line) {
                        var d = o;
                        o = a, a = d
                    }
                    return i ? a.ch += 1 : o.ch += 1, {
                        start: o,
                        end: a
                    }
                }

                function Ce(e, t, n, i) {
                    var o, a, s, l, c = U(t),
                            u = e.getLine(c.line),
                            f = u.split(""),
                            d = f.indexOf(n);
                    if (c.ch < d ? c.ch = d : d < c.ch && f[c.ch] == n && (a = c.ch, --c.ch), f[c.ch] != n || a)
                        for (s = c.ch; s > - 1 && !o; s--)
                            f[s] == n && (o = s + 1);
                    else
                        o = c.ch + 1;
                    if (o && !a)
                        for (s = o, l = f.length; s < l && !a; s++)
                            f[s] == n && (a = s);
                    return o && a ? (i && (--o, ++a), {
                        start: r(c.line, o),
                        end: r(c.line, a)
                    }) : {
                        start: c,
                        end: c
                    }
                }

                function Se() {}

                function Le(e) {
                    var t = e.state.vim;
                    return t.searchState_ || (t.searchState_ = new Se)
                }

                function Me(e, t, n, r, i) {
                    e.openDialog ? e.openDialog(t, r, {
                        bottom: !0,
                        value: i.value,
                        onKeyDown: i.onKeyDown,
                        onKeyUp: i.onKeyUp,
                        selectValueOnOpen: !1
                    }) : r(prompt(n, ""))
                }

                function Te(e) {
                    var t = Ae(e) || [];
                    if (!t.length)
                        return [];
                    var n = [];
                    if (0 === t[0]) {
                        for (var r = 0; r < t.length; r++)
                            "number" == typeof t[r] && n.push(e.substring(t[r] + 1, t[r + 1]));
                        return n
                    }
                }

                function Ae(e) {
                    for (var t = !1, n = [], r = 0; r < e.length; r++) {
                        var i = e.charAt(r);
                        t || "/" != i || n.push(r), t = !t && "\\" == i
                    }
                    return n
                }

                function Ee(e) {
                    for (var t = "|(){", n = "}", r = !1, i = [], o = -1; o < e.length; o++) {
                        var a = e.charAt(o) || "",
                                s = e.charAt(o + 1) || "",
                                l = s && t.indexOf(s) != -1;
                        r ? ("\\" === a && l || i.push(a), r = !1) : "\\" === a ? (r = !0, s && n.indexOf(s) != -1 && (l = !0), l && "\\" !== s || i.push(a)) : (i.push(a), l && "\\" !== s && i.push("\\"))
                    }
                    return i.join("")
                }

                function Oe(e) {
                    for (var t = !1, n = [], r = -1; r < e.length; r++) {
                        var i = e.charAt(r) || "",
                                o = e.charAt(r + 1) || "";
                        At[i + o] ? (n.push(At[i + o]), r++) : t ? (n.push(i), t = !1) : "\\" === i ? (t = !0, m(o) || "$" === o ? n.push("$") : "/" !== o && "\\" !== o && n.push("\\")) : ("$" === i && n.push("$"), n.push(i), "/" === o && n.push("\\"))
                    }
                    return n.join("")
                }

                function Ie(t) {
                    for (var n = new e.StringStream(t), r = []; !n.eol(); ) {
                        for (; n.peek() && "\\" != n.peek(); )
                            r.push(n.next());
                        var i = !1;
                        for (var o in Et)
                            if (n.match(o, !0)) {
                                i = !0, r.push(Et[o]);
                                break
                            }
                        i || r.push(n.next())
                    }
                    return r.join("")
                }

                function Re(e, t, n) {
                    var r = bt.registerController.getRegister("/");
                    if (r.setText(e), e instanceof RegExp)
                        return e;
                    var i, o, a = Ae(e);
                    if (a.length) {
                        i = e.substring(0, a[0]);
                        var s = e.substring(a[0]);
                        o = s.indexOf("i") != -1
                    } else
                        i = e;
                    if (!i)
                        return null;
                    w("pcre") || (i = Ee(i)), n && (t = /^[^A-Z]*$/.test(i));
                    var l = new RegExp(i, t || o ? "i" : void 0);
                    return l
                }

                function Ne(e, t) {
                    e.openNotification ? e.openNotification('<span style="color: red">' + t + "</span>", {
                        bottom: !0,
                        duration: 5e3
                    }) : alert(t)
                }

                function Pe(e, t) {
                    var n = '<span style="font-family: monospace; white-space: pre">' + (e || "") + '<input type="text"></span>';
                    return t && (n += ' <span style="color: #888">' + t + "</span>"), n
                }

                function ze(e, t) {
                    var n = (t.prefix || "") + " " + (t.desc || ""),
                            r = Pe(t.prefix, t.desc);
                    Me(e, r, n, t.onClose, t)
                }

                function De(e, t) {
                    if (e instanceof RegExp && t instanceof RegExp) {
                        for (var n = ["global", "multiline", "ignoreCase", "source"], r = 0; r < n.length; r++) {
                            var i = n[r];
                            if (e[i] !== t[i])
                                return !1
                        }
                        return !0
                    }
                    return !1
                }

                function Fe(e, t, n, r) {
                    if (t) {
                        var i = Le(e),
                                o = Re(t, !!n, !!r);
                        if (o)
                            return He(e, o), De(o, i.getQuery()) ? o : (i.setQuery(o), o)
                    }
                }

                function We(e) {
                    if ("^" == e.source.charAt(0))
                        var t = !0;
                    return {
                        token: function (n) {
                            if (t && !n.sol())
                                return void n.skipToEnd();
                            var r = n.match(e, !1);
                            if (r)
                                return 0 == r[0].length ? (n.next(), "searching") : n.sol() || (n.backUp(1), e.exec(n.next() + r[0])) ? (n.match(e), "searching") : (n.next(), null);
                            for (; !n.eol() && (n.next(), !n.match(e, !1)); )
                                ;
                        },
                        query: e
                    }
                }

                function He(e, t) {
                    var n = Le(e),
                            r = n.getOverlay();
                    r && t == r.query || (r && e.removeOverlay(r), r = We(t), e.addOverlay(r), e.showMatchesOnScrollbar && (n.getScrollbarAnnotate() && n.getScrollbarAnnotate().clear(), n.setScrollbarAnnotate(e.showMatchesOnScrollbar(t))), n.setOverlay(r))
                }

                function Be(e, t, n, i) {
                    return void 0 === i && (i = 1), e.operation(function () {
                        for (var o = e.getCursor(), a = e.getSearchCursor(n, o), s = 0; s < i; s++) {
                            var l = a.find(t);
                            if (0 == s && l && $(a.from(), o) && (l = a.find(t)), !l && (a = e.getSearchCursor(n, t ? r(e.lastLine()) : r(e.firstLine(), 0)), !a.find(t)))
                                return
                        }
                        return a.from()
                    })
                }

                function qe(e) {
                    var t = Le(e);
                    e.removeOverlay(Le(e).getOverlay()), t.setOverlay(null), t.getScrollbarAnnotate() && (t.getScrollbarAnnotate().clear(), t.setScrollbarAnnotate(null))
                }

                function Ue(e, t, n) {
                    return "number" != typeof e && (e = e.line), t instanceof Array ? y(e, t) : n ? e >= t && e <= n : e == t
                }

                function $e(e) {
                    var t = e.getScrollInfo(),
                            n = 6,
                            r = 10,
                            i = e.coordsChar({
                                left: 0,
                                top: n + t.top
                            }, "local"),
                            o = t.clientHeight - r + t.top,
                            a = e.coordsChar({
                                left: 0,
                                top: o
                            }, "local");
                    return {
                        top: i.line,
                        bottom: a.line
                    }
                }

                function je(t, n, r, i, o, a, s, l, c) {
                    function u() {
                        t.operation(function () {
                            for (; !m; )
                                f(), d();
                            p()
                        })
                    }

                    function f() {
                        var e = t.getRange(a.from(), a.to()),
                                n = e.replace(s, l);
                        a.replace(n)
                    }

                    function d() {
                        for (; a.findNext() && Ue(a.from(), i, o); )
                            if (r || !g || a.from().line != g.line)
                                return t.scrollIntoView(a.from(), 30), t.setSelection(a.from(), a.to()), g = a.from(), void(m = !1);
                        m = !0
                    }

                    function p(e) {
                        if (e && e(), t.focus(), g) {
                            t.setCursor(g);
                            var n = t.state.vim;
                            n.exMode = !1, n.lastHPos = n.lastHSPos = g.ch
                        }
                        c && c()
                    }

                    function h(n, r, i) {
                        e.e_stop(n);
                        var o = e.keyName(n);
                        switch (o) {
                            case "Y":
                                f(), d();
                                break;
                            case "N":
                                d();
                                break;
                            case "A":
                                var a = c;
                                c = void 0, t.operation(u), c = a;
                                break;
                            case "L":
                                f();
                            case "Q":
                            case "Esc":
                            case "Ctrl-C":
                            case "Ctrl-[":
                                p(i)
                        }
                        return m && p(i), !0
                    }
                    t.state.vim.exMode = !0;
                    var m = !1,
                            g = a.from();
                    return d(), m ? void Ne(t, "No matches for " + s.source) : n ? void ze(t, {
                        prefix: "replace with <strong>" + l + "</strong> (y/n/a/q/l)",
                        onKeyDown: h
                    }) : (u(), void(c && c()))
                }

                function Ke(t) {
                    var n = t.state.vim,
                            r = bt.macroModeState,
                            i = bt.registerController.getRegister("."),
                            o = r.isPlaying,
                            a = r.lastInsertModeChanges,
                            s = [];
                    if (!o) {
                        for (var l = a.inVisualBlock ? n.lastSelection.visualBlock.height : 1, c = a.changes, s = [], u = 0; u < c.length; )
                            s.push(c[u]), c[u] instanceof rt ? u++ : u += l;
                        a.changes = s, t.off("change", Je), e.off(t.getInputField(), "keydown", it)
                    }
                    !o && n.insertModeRepeat > 1 && (ot(t, n, n.insertModeRepeat - 1, !0), n.lastEditInputState.repeatOverride = n.insertModeRepeat), delete n.insertModeRepeat, n.insertMode = !1, t.setCursor(t.getCursor().line, t.getCursor().ch - 1), t.setOption("keyMap", "vim"), t.setOption("disableInput", !0), t.toggleOverwrite(!1), i.setText(a.changes.join("")), e.signal(t, "vim-mode-change", {
                        mode: "normal"
                    }), r.isRecording && Ze(r)
                }

                function Ve(e) {
                    t.unshift(e)
                }

                function Ge(e, t, n, r, i) {
                    var o = {
                        keys: e,
                        type: t
                    };
                    o[t] = n, o[t + "Args"] = r;
                    for (var a in i)
                        o[a] = i[a];
                    Ve(o)
                }

                function Xe(t, n, r, i) {
                    var o = bt.registerController.getRegister(i);
                    if (":" == i)
                        return o.keyBuffer[0] && Nt.processCommand(t, o.keyBuffer[0]), void(r.isPlaying = !1);
                    var a = o.keyBuffer,
                            s = 0;
                    r.isPlaying = !0, r.replaySearchQueries = o.searchQueries.slice(0);
                    for (var l = 0; l < a.length; l++)
                        for (var c, u, f = a[l]; f; )
                            if (c = /<\w+-.+?>|<\w+>|./.exec(f), u = c[0], f = f.substring(c.index + u.length), e.Vim.handleKey(t, u, "macro"), n.insertMode) {
                                var d = o.insertModeChanges[s++].changes;
                                bt.macroModeState.lastInsertModeChanges.changes = d, at(t, d, 1), Ke(t)
                            }
                    r.isPlaying = !1
                }

                function Ye(e, t) {
                    if (!e.isPlaying) {
                        var n = e.latestRegister,
                                r = bt.registerController.getRegister(n);
                        r && r.pushText(t)
                    }
                }

                function Ze(e) {
                    if (!e.isPlaying) {
                        var t = e.latestRegister,
                                n = bt.registerController.getRegister(t);
                        n && n.pushInsertModeChanges && n.pushInsertModeChanges(e.lastInsertModeChanges)
                    }
                }

                function Qe(e, t) {
                    if (!e.isPlaying) {
                        var n = e.latestRegister,
                                r = bt.registerController.getRegister(n);
                        r && r.pushSearchQuery && r.pushSearchQuery(t)
                    }
                }

                function Je(e, t) {
                    var n = bt.macroModeState,
                            r = n.lastInsertModeChanges;
                    if (!n.isPlaying)
                        for (; t; ) {
                            if (r.expectCursorActivityForChange = !0, "+input" == t.origin || "paste" == t.origin || void 0 === t.origin) {
                                var i = t.text.join("\n");
                                r.changes.push(i)
                            }
                            t = t.next
                        }
                }

                function et(e) {
                    var t = e.state.vim;
                    if (t.insertMode) {
                        var n = bt.macroModeState;
                        if (n.isPlaying)
                            return;
                        var r = n.lastInsertModeChanges;
                        r.expectCursorActivityForChange ? r.expectCursorActivityForChange = !1 : r.changes = []
                    } else
                        e.curOp.isVimOp || nt(e, t);
                    t.visualMode && tt(e)
                }

                function tt(e) {
                    var t = e.state.vim,
                            n = P(e, U(t.sel.head)),
                            r = D(n, 0, 1);
                    t.fakeCursor && t.fakeCursor.clear(), t.fakeCursor = e.markText(n, r, {
                        className: "cm-animate-fat-cursor"
                    })
                }

                function nt(t, n) {
                    var r = t.getCursor("anchor"),
                            i = t.getCursor("head");
                    if (n.visualMode && !t.somethingSelected() ? le(t, !1) : n.visualMode || n.insertMode || !t.somethingSelected() || (n.visualMode = !0, n.visualLine = !1, e.signal(t, "vim-mode-change", {
                        mode: "visual"
                    })), n.visualMode) {
                        var o = j(i, r) ? 0 : -1,
                                a = j(i, r) ? -1 : 0;
                        i = D(i, 0, o), r = D(r, 0, a), n.sel = {
                            anchor: r,
                            head: i
                        }, be(t, n, "<", K(i, r)), be(t, n, ">", V(i, r))
                    } else
                        n.insertMode || (n.lastHPos = t.getCursor().ch)
                }

                function rt(e) {
                    this.keyName = e
                }

                function it(t) {
                    function n() {
                        return i.changes.push(new rt(o)), !0
                    }
                    var r = bt.macroModeState,
                            i = r.lastInsertModeChanges,
                            o = e.keyName(t);
                    o && (o.indexOf("Delete") == -1 && o.indexOf("Backspace") == -1 || e.lookupKey(o, "vim-insert", n))
                }

                function ot(e, t, n, r) {
                    function i() {
                        s ? xt.processAction(e, t, t.lastEditActionCommand) : xt.evalInput(e, t)
                    }

                    function o(n) {
                        if (a.lastInsertModeChanges.changes.length > 0) {
                            n = t.lastEditActionCommand ? n : 1;
                            var r = a.lastInsertModeChanges;
                            at(e, r.changes, n)
                        }
                    }
                    var a = bt.macroModeState;
                    a.isPlaying = !0;
                    var s = !!t.lastEditActionCommand,
                            l = t.inputState;
                    if (t.inputState = t.lastEditInputState, s && t.lastEditActionCommand.interlaceInsertRepeat)
                        for (var c = 0; c < n; c++)
                            i(), o(1);
                    else
                        r || i(), o(n);
                    t.inputState = l, t.insertMode && !r && Ke(e), a.isPlaying = !1
                }

                function at(t, n, r) {
                    function i(n) {
                        return "string" == typeof n ? e.commands[n](t) : n(t), !0
                    }
                    var o = t.getCursor("head"),
                            a = bt.macroModeState.lastInsertModeChanges.inVisualBlock;
                    if (a) {
                        var s = t.state.vim,
                                l = s.lastSelection,
                                c = F(l.anchor, l.head);
                        ee(t, o, c.line + 1), r = t.listSelections().length, t.setCursor(o)
                    }
                    for (var u = 0; u < r; u++) {
                        a && t.setCursor(D(o, u, 0));
                        for (var f = 0; f < n.length; f++) {
                            var d = n[f];
                            if (d instanceof rt)
                                e.lookupKey(d.keyName, "vim-insert", i);
                            else {
                                var p = t.getCursor();
                                t.replaceRange(d, p, p)
                            }
                        }
                    }
                    a && t.setCursor(D(o, 0, 1))
                }
                e.defineOption("vimMode", !1, function (t, n, r) {
                    n && "vim" != t.getOption("keyMap") ? t.setOption("keyMap", "vim") : !n && r != e.Init && /^vim/.test(t.getOption("keyMap")) && t.setOption("keyMap", "default")
                });
                var st = {
                    Shift: "S",
                    Ctrl: "C",
                    Alt: "A",
                    Cmd: "D",
                    Mod: "A"
                },
                        lt = {
                            Enter: "CR",
                            Backspace: "BS",
                            Delete: "Del"
                        },
                        ct = /[\d]/,
                        ut = [e.isWordChar, function (t) {
                                return t && !e.isWordChar(t) && !/\s/.test(t)
                            }],
                        ft = [function (e) {
                                return /\S/.test(e)
                            }],
                        dt = f(65, 26),
                        pt = f(97, 26),
                        ht = f(48, 10),
                        mt = [].concat(dt, pt, ht, ["<", ">"]),
                        gt = [].concat(dt, pt, ht, ["-", '"', ".", ":", "/"]),
                        vt = {};
                _("filetype", void 0, "string", ["ft"], function (e, t) {
                    if (void 0 !== t) {
                        if (void 0 === e) {
                            var n = t.getOption("mode");
                            return "null" == n ? "" : n
                        }
                        var n = "" == e ? "null" : e;
                        t.setOption("mode", n)
                    }
                });
                var yt = function () {
                    function e(e, t, s) {
                        function l(t) {
                            var i = ++r % n,
                                    o = a[i];
                            o && o.clear(), a[i] = e.setBookmark(t)
                        }
                        var c = r % n,
                                u = a[c];
                        if (u) {
                            var f = u.find();
                            f && !$(f, t) && l(t)
                        } else
                            l(t);
                        l(s), i = r, o = r - n + 1, o < 0 && (o = 0)
                    }

                    function t(e, t) {
                        r += t, r > i ? r = i : r < o && (r = o);
                        var s = a[(n + r) % n];
                        if (s && !s.find()) {
                            var l, c = t > 0 ? 1 : -1,
                                    u = e.getCursor();
                            do
                                if (r += c, s = a[(n + r) % n], s && (l = s.find()) && !$(u, l))
                                    break;
                            while (r < i && r > o)
                        }
                        return s
                    }
                    var n = 100,
                            r = -1,
                            i = 0,
                            o = 0,
                            a = new Array(n);
                    return {
                        cachedCursor: void 0,
                        add: e,
                        move: t
                    }
                },
                        _t = function (e) {
                            return e ? {
                                changes: e.changes,
                                expectCursorActivityForChange: e.expectCursorActivityForChange
                            } : {
                                changes: [],
                                expectCursorActivityForChange: !1
                            }
                        };
                k.prototype = {
                    exitMacroRecordMode: function () {
                        var e = bt.macroModeState;
                        e.onRecordingDone && e.onRecordingDone(), e.onRecordingDone = void 0, e.isRecording = !1
                    },
                    enterMacroRecordMode: function (e, t) {
                        var n = bt.registerController.getRegister(t);
                        n && (n.clear(), this.latestRegister = t, e.openDialog && (this.onRecordingDone = e.openDialog("(recording)[" + t + "]", null, {
                            bottom: !0
                        })), this.isRecording = !0)
                    }
                };
                var bt, wt, kt = {
                    buildKeyMap: function () {},
                    getRegisterController: function () {
                        return bt.registerController
                    },
                    resetVimGlobalState_: C,
                    getVimGlobalState_: function () {
                        return bt
                    },
                    maybeInitVimState_: x,
                    suppressErrorLogging: !1,
                    InsertModeKey: rt,
                    map: function (e, t, n) {
                        Nt.map(e, t, n)
                    },
                    unmap: function (e, t) {
                        Nt.unmap(e, t)
                    },
                    setOption: b,
                    getOption: w,
                    defineOption: _,
                    defineEx: function (e, t, n) {
                        if (t) {
                            if (0 !== e.indexOf(t))
                                throw new Error('(Vim.defineEx) "' + t + '" is not a prefix of "' + e + '", command not registered')
                        } else
                            t = e;
                        Rt[e] = n, Nt.commandMap_[t] = {
                            name: e,
                            shortName: t,
                            type: "api"
                        }
                    },
                    handleKey: function (e, t, n) {
                        var r = this.findKey(e, t, n);
                        if ("function" == typeof r)
                            return r()
                    },
                    findKey: function (n, r, i) {
                        function o() {
                            var e = bt.macroModeState;
                            if (e.isRecording) {
                                if ("q" == r)
                                    return e.exitMacroRecordMode(), L(n), !0;
                                "mapping" != i && Ye(e, r)
                            }
                        }

                        function a() {
                            if ("<Esc>" == r)
                                return L(n), f.visualMode ? le(n) : f.insertMode && Ke(n), !0
                        }

                        function s(t) {
                            for (var i; t; )
                                i = /<\w+-.+?>|<\w+>|./.exec(t), r = i[0], t = t.substring(i.index + r.length), e.Vim.handleKey(n, r, "mapping")
                        }

                        function l() {
                            if (a())
                                return !0;
                            for (var e = f.inputState.keyBuffer = f.inputState.keyBuffer + r, i = 1 == r.length, o = xt.matchCommand(e, t, f.inputState, "insert"); e.length > 1 && "full" != o.type; ) {
                                var e = f.inputState.keyBuffer = e.slice(1),
                                        s = xt.matchCommand(e, t, f.inputState, "insert");
                                "none" != s.type && (o = s)
                            }
                            if ("none" == o.type)
                                return L(n), !1;
                            if ("partial" == o.type)
                                return wt && window.clearTimeout(wt), wt = window.setTimeout(function () {
                                    f.insertMode && f.inputState.keyBuffer && L(n)
                                }, w("insertModeEscKeysTimeout")), !i;
                            if (wt && window.clearTimeout(wt), i) {
                                var l = n.getCursor();
                                n.replaceRange("", D(l, 0, -(e.length - 1)), l, "+input")
                            }
                            return L(n), o.command
                        }

                        function c() {
                            if (o() || a())
                                return !0;
                            var e = f.inputState.keyBuffer = f.inputState.keyBuffer + r;
                            if (/^[1-9]\d*$/.test(e))
                                return !0;
                            var i = /^(\d*)(.*)$/.exec(e);
                            if (!i)
                                return L(n), !1;
                            var s = f.visualMode ? "visual" : "normal",
                                    l = xt.matchCommand(i[2] || i[1], t, f.inputState, s);
                            if ("none" == l.type)
                                return L(n), !1;
                            if ("partial" == l.type)
                                return !0;
                            f.inputState.keyBuffer = "";
                            var i = /^(\d*)(.*)$/.exec(e);
                            return i[1] && "0" != i[1] && f.inputState.pushRepeatDigit(i[1]), l.command
                        }
                        var u, f = x(n);
                        return u = f.insertMode ? l() : c(), u === !1 ? void 0 : u === !0 ? function () {} : function () {
                            return n.operation(function () {
                                n.curOp.isVimOp = !0;
                                try {
                                    "keyToKey" == u.type ? s(u.toKeys) : xt.processCommand(n, f, u)
                                } catch (t) {
                                    throw n.state.vim = void 0, x(n), e.Vim.suppressErrorLogging || console.log(t), t
                                }
                                return !0
                            })
                        }
                    },
                    handleEx: function (e, t) {
                        Nt.processCommand(e, t)
                    },
                    defineMotion: O,
                    defineAction: N,
                    defineOperator: R,
                    mapCommand: Ge,
                    _mapCommand: Ve,
                    defineRegister: T,
                    exitVisualMode: le,
                    exitInsertMode: Ke
                };
                S.prototype.pushRepeatDigit = function (e) {
                    this.operator ? this.motionRepeat = this.motionRepeat.concat(e) : this.prefixRepeat = this.prefixRepeat.concat(e)
                }, S.prototype.getRepeat = function () {
                    var e = 0;
                    return (this.prefixRepeat.length > 0 || this.motionRepeat.length > 0) && (e = 1, this.prefixRepeat.length > 0 && (e *= parseInt(this.prefixRepeat.join(""), 10)), this.motionRepeat.length > 0 && (e *= parseInt(this.motionRepeat.join(""), 10))), e
                }, M.prototype = {
                    setText: function (e, t, n) {
                        this.keyBuffer = [e || ""], this.linewise = !!t, this.blockwise = !!n
                    },
                    pushText: function (e, t) {
                        t && (this.linewise || this.keyBuffer.push("\n"), this.linewise = !0), this.keyBuffer.push(e)
                    },
                    pushInsertModeChanges: function (e) {
                        this.insertModeChanges.push(_t(e))
                    },
                    pushSearchQuery: function (e) {
                        this.searchQueries.push(e)
                    },
                    clear: function () {
                        this.keyBuffer = [], this.insertModeChanges = [], this.searchQueries = [], this.linewise = !1
                    },
                    toString: function () {
                        return this.keyBuffer.join("")
                    }
                }, A.prototype = {
                    pushText: function (e, t, n, r, i) {
                        r && "\n" == n.charAt(0) && (n = n.slice(1) + "\n"), r && "\n" !== n.charAt(n.length - 1) && (n += "\n");
                        var o = this.isValidRegister(e) ? this.getRegister(e) : null;
                        if (!o) {
                            switch (t) {
                                case "yank":
                                    this.registers[0] = new M(n, r, i);
                                    break;
                                case "delete":
                                case "change":
                                    n.indexOf("\n") == -1 ? this.registers["-"] = new M(n, r) : (this.shiftNumericRegisters_(), this.registers[1] = new M(n, r))
                            }
                            return void this.unnamedRegister.setText(n, r, i)
                        }
                        var a = g(e);
                        a ? o.pushText(n, r) : o.setText(n, r, i), this.unnamedRegister.setText(o.toString(), r)
                    },
                    getRegister: function (e) {
                        return this.isValidRegister(e) ? (e = e.toLowerCase(), this.registers[e] || (this.registers[e] = new M), this.registers[e]) : this.unnamedRegister
                    },
                    isValidRegister: function (e) {
                        return e && y(e, gt)
                    },
                    shiftNumericRegisters_: function () {
                        for (var e = 9; e >= 2; e--)
                            this.registers[e] = this.getRegister("" + (e - 1))
                    }
                }, E.prototype = {
                    nextMatch: function (e, t) {
                        var n = this.historyBuffer,
                                r = t ? -1 : 1;
                        null === this.initialPrefix && (this.initialPrefix = e);
                        for (var i = this.iterator + r; t ? i >= 0 : i < n.length; i += r)
                            for (var o = n[i], a = 0; a <= o.length; a++)
                                if (this.initialPrefix == o.substring(0, a))
                                    return this.iterator = i, o;
                        return i >= n.length ? (this.iterator = n.length, this.initialPrefix) : i < 0 ? e : void 0
                    },
                    pushInput: function (e) {
                        var t = this.historyBuffer.indexOf(e);
                        t > -1 && this.historyBuffer.splice(t, 1), e.length && this.historyBuffer.push(e)
                    },
                    reset: function () {
                        this.initialPrefix = null, this.iterator = this.historyBuffer.length
                    }
                };
                var xt = {
                    matchCommand: function (e, t, n, r) {
                        var i = W(e, t, r, n);
                        if (!i.full && !i.partial)
                            return {
                                type: "none"
                            };
                        if (!i.full && i.partial)
                            return {
                                type: "partial"
                            };
                        for (var o, a = 0; a < i.full.length; a++) {
                            var s = i.full[a];
                            o || (o = s)
                        }
                        return "<character>" == o.keys.slice(-11) && (n.selectedCharacter = B(e)), {
                            type: "full",
                            command: o
                        }
                    },
                    processCommand: function (e, t, n) {
                        switch (t.inputState.repeatOverride = n.repeatOverride, n.type) {
                            case "motion":
                                this.processMotion(e, t, n);
                                break;
                            case "operator":
                                this.processOperator(e, t, n);
                                break;
                            case "operatorMotion":
                                this.processOperatorMotion(e, t, n);
                                break;
                            case "action":
                                this.processAction(e, t, n);
                                break;
                            case "search":
                                this.processSearch(e, t, n);
                                break;
                            case "ex":
                            case "keyToEx":
                                this.processEx(e, t, n)
                        }
                    },
                    processMotion: function (e, t, n) {
                        t.inputState.motion = n.motion, t.inputState.motionArgs = z(n.motionArgs), this.evalInput(e, t)
                    },
                    processOperator: function (e, t, n) {
                        var r = t.inputState;
                        if (r.operator) {
                            if (r.operator == n.operator)
                                return r.motion = "expandToLine", r.motionArgs = {
                                    linewise: !0
                                }, void this.evalInput(e, t);
                            L(e)
                        }
                        r.operator = n.operator, r.operatorArgs = z(n.operatorArgs), t.visualMode && this.evalInput(e, t)
                    },
                    processOperatorMotion: function (e, t, n) {
                        var r = t.visualMode,
                                i = z(n.operatorMotionArgs);
                        i && r && i.visualLine && (t.visualLine = !0), this.processOperator(e, t, n), r || this.processMotion(e, t, n)
                    },
                    processAction: function (e, t, n) {
                        var r = t.inputState,
                                i = r.getRepeat(),
                                o = !!i,
                                a = z(n.actionArgs) || {};
                        r.selectedCharacter && (a.selectedCharacter = r.selectedCharacter), n.operator && this.processOperator(e, t, n), n.motion && this.processMotion(e, t, n), (n.motion || n.operator) && this.evalInput(e, t), a.repeat = i || 1, a.repeatIsExplicit = o, a.registerName = r.registerName, L(e), t.lastMotion = null, n.isEdit && this.recordLastEdit(t, r, n), Lt[n.action](e, a, t)
                    },
                    processSearch: function (t, n, r) {
                        function i(e, i, o) {
                            bt.searchHistoryController.pushInput(e), bt.searchHistoryController.reset();
                            try {
                                Fe(t, e, i, o)
                            } catch (n) {
                                return Ne(t, "Invalid regex: " + e), void L(t)
                            }
                            xt.processMotion(t, n, {
                                type: "motion",
                                motion: "findNext",
                                motionArgs: {
                                    forward: !0,
                                    toJumplist: r.searchArgs.toJumplist
                                }
                            })
                        }

                        function o(e) {
                            t.scrollTo(d.left, d.top), i(e, !0, !0);
                            var n = bt.macroModeState;
                            n.isRecording && Qe(n, e)
                        }

                        function a(n, r, i) {
                            var o, a = e.keyName(n);
                            "Up" == a || "Down" == a ? (o = "Up" == a, r = bt.searchHistoryController.nextMatch(r, o) || "", i(r)) : "Left" != a && "Right" != a && "Ctrl" != a && "Alt" != a && "Shift" != a && bt.searchHistoryController.reset();
                            var s;
                            try {
                                s = Fe(t, r, !0, !0)
                            } catch (e) {
                            }
                            s ? t.scrollIntoView(Be(t, !l, s), 30) : (qe(t), t.scrollTo(d.left, d.top))
                        }

                        function s(n, r, i) {
                            var o = e.keyName(n);
                            "Esc" == o || "Ctrl-C" == o || "Ctrl-[" == o || "Backspace" == o && "" == r ? (bt.searchHistoryController.pushInput(r), bt.searchHistoryController.reset(), Fe(t, f), qe(t), t.scrollTo(d.left, d.top), e.e_stop(n), L(t), i(), t.focus()) : "Ctrl-U" == o && (e.e_stop(n), i(""))
                        }
                        if (t.getSearchCursor) {
                            var l = r.searchArgs.forward,
                                    c = r.searchArgs.wholeWordOnly;
                            Le(t).setReversed(!l);
                            var u = l ? "/" : "?",
                                    f = Le(t).getQuery(),
                                    d = t.getScrollInfo();
                            switch (r.searchArgs.querySrc) {
                                case "prompt":
                                    var p = bt.macroModeState;
                                    if (p.isPlaying) {
                                        var h = p.replaySearchQueries.shift();
                                        i(h, !0, !1)
                                    } else
                                        ze(t, {
                                            onClose: o,
                                            prefix: u,
                                            desc: Ot,
                                            onKeyUp: a,
                                            onKeyDown: s
                                        });
                                    break;
                                case "wordUnderCursor":
                                    var m = de(t, !1, !0, !1, !0),
                                            g = !0;
                                    if (m || (m = de(t, !1, !0, !1, !1), g = !1), !m)
                                        return;
                                    var h = t.getLine(m.start.line).substring(m.start.ch, m.end.ch);
                                    h = g && c ? "\\b" + h + "\\b" : Z(h), bt.jumpList.cachedCursor = t.getCursor(), t.setCursor(m.start), i(h, !0, !1)
                            }
                        }
                    },
                    processEx: function (t, n, r) {
                        function i(e) {
                            bt.exCommandHistoryController.pushInput(e), bt.exCommandHistoryController.reset(), Nt.processCommand(t, e)
                        }

                        function o(n, r, i) {
                            var o, a = e.keyName(n);
                            ("Esc" == a || "Ctrl-C" == a || "Ctrl-[" == a || "Backspace" == a && "" == r) && (bt.exCommandHistoryController.pushInput(r), bt.exCommandHistoryController.reset(), e.e_stop(n), L(t), i(), t.focus()), "Up" == a || "Down" == a ? (o = "Up" == a, r = bt.exCommandHistoryController.nextMatch(r, o) || "", i(r)) : "Ctrl-U" == a ? (e.e_stop(n), i("")) : "Left" != a && "Right" != a && "Ctrl" != a && "Alt" != a && "Shift" != a && bt.exCommandHistoryController.reset()
                        }
                        "keyToEx" == r.type ? Nt.processCommand(t, r.exArgs.input) : n.visualMode ? ze(t, {
                            onClose: i,
                            prefix: ":",
                            value: "'<,'>",
                            onKeyDown: o
                        }) : ze(t, {
                            onClose: i,
                            prefix: ":",
                            onKeyDown: o
                        })
                    },
                    evalInput: function (e, t) {
                        var n, i, o, a = t.inputState,
                                s = a.motion,
                                l = a.motionArgs || {},
                                c = a.operator,
                                u = a.operatorArgs || {},
                                f = a.registerName,
                                d = t.sel,
                                p = U(t.visualMode ? P(e, d.head) : e.getCursor("head")),
                                h = U(t.visualMode ? P(e, d.anchor) : e.getCursor("anchor")),
                                m = U(p),
                                g = U(h);
                        if (c && this.recordLastEdit(t, a), o = void 0 !== a.repeatOverride ? a.repeatOverride : a.getRepeat(), o > 0 && l.explicitRepeat ? l.repeatIsExplicit = !0 : (l.noRepeat || !l.explicitRepeat && 0 === o) && (o = 1, l.repeatIsExplicit = !1), a.selectedCharacter && (l.selectedCharacter = u.selectedCharacter = a.selectedCharacter), l.repeat = o, L(e), s) {
                            var v = Ct[s](e, p, l, t);
                            if (t.lastMotion = Ct[s], !v)
                                return;
                            if (l.toJumplist) {
                                var y = bt.jumpList,
                                        _ = y.cachedCursor;
                                _ ? (pe(e, _, v), delete y.cachedCursor) : pe(e, p, v)
                            }
                            v instanceof Array ? (i = v[0], n = v[1]) : n = v, n || (n = U(p)), t.visualMode ? (t.visualBlock && n.ch === 1 / 0 || (n = P(e, n, t.visualBlock)), i && (i = P(e, i, !0)), i = i || g, d.anchor = i, d.head = n, oe(e), be(e, t, "<", j(i, n) ? i : n), be(e, t, ">", j(i, n) ? n : i)) : c || (n = P(e, n), e.setCursor(n.line, n.ch))
                        }
                        if (c) {
                            if (u.lastSel) {
                                i = g;
                                var b = u.lastSel,
                                        w = Math.abs(b.head.line - b.anchor.line),
                                        k = Math.abs(b.head.ch - b.anchor.ch);
                                n = b.visualLine ? r(g.line + w, g.ch) : b.visualBlock ? r(g.line + w, g.ch + k) : b.head.line == b.anchor.line ? r(g.line, g.ch + k) : r(g.line + w, g.ch), t.visualMode = !0, t.visualLine = b.visualLine, t.visualBlock = b.visualBlock, d = t.sel = {
                                    anchor: i,
                                    head: n
                                }, oe(e)
                            } else
                                t.visualMode && (u.lastSel = {
                                    anchor: U(d.anchor),
                                    head: U(d.head),
                                    visualBlock: t.visualBlock,
                                    visualLine: t.visualLine
                                });
                            var x, C, S, M, T;
                            if (t.visualMode) {
                                if (x = K(d.head, d.anchor), C = V(d.head, d.anchor), S = t.visualLine || u.linewise, M = t.visualBlock ? "block" : S ? "line" : "char", T = ae(e, {
                                    anchor: x,
                                    head: C
                                }, M), S) {
                                    var A = T.ranges;
                                    if ("block" == M)
                                        for (var E = 0; E < A.length; E++)
                                            A[E].head.ch = X(e, A[E].head.line);
                                    else
                                        "line" == M && (A[0].head = r(A[0].head.line + 1, 0))
                                }
                            } else {
                                if (x = U(i || g), C = U(n || m), j(C, x)) {
                                    var O = x;
                                    x = C, C = O
                                }
                                S = l.linewise || u.linewise, S ? ue(e, x, C) : l.forward && ce(e, x, C), M = "char";
                                var I = !l.inclusive || S;
                                T = ae(e, {
                                    anchor: x,
                                    head: C
                                }, M, I)
                            }
                            e.setSelections(T.ranges, T.primary), t.lastMotion = null, u.repeat = o, u.registerName = f, u.linewise = S;
                            var R = St[c](e, u, T.ranges, g, n);
                            t.visualMode && le(e, null != R), R && e.setCursor(R)
                        }
                    },
                    recordLastEdit: function (e, t, n) {
                        var r = bt.macroModeState;
                        r.isPlaying || (e.lastEditInputState = t, e.lastEditActionCommand = n, r.lastInsertModeChanges.changes = [], r.lastInsertModeChanges.expectCursorActivityForChange = !1)
                    }
                },
                        Ct = {
                            moveToTopLine: function (e, t, n) {
                                var i = $e(e).top + n.repeat - 1;
                                return r(i, fe(e.getLine(i)))
                            },
                            moveToMiddleLine: function (e) {
                                var t = $e(e),
                                        n = Math.floor(.5 * (t.top + t.bottom));
                                return r(n, fe(e.getLine(n)))
                            },
                            moveToBottomLine: function (e, t, n) {
                                var i = $e(e).bottom - n.repeat + 1;
                                return r(i, fe(e.getLine(i)))
                            },
                            expandToLine: function (e, t, n) {
                                var i = t;
                                return r(i.line + n.repeat - 1, 1 / 0)
                            },
                            findNext: function (e, t, n) {
                                var r = Le(e),
                                        i = r.getQuery();
                                if (i) {
                                    var o = !n.forward;
                                    return o = r.isReversed() ? !o : o, He(e, i), Be(e, o, i, n.repeat)
                                }
                            },
                            goToMark: function (e, t, n, r) {
                                var i = r.marks[n.selectedCharacter];
                                if (i) {
                                    var o = i.find();
                                    return n.linewise ? {
                                        line: o.line,
                                        ch: fe(e.getLine(o.line))
                                    } : o
                                }
                                return null
                            },
                            moveToOtherHighlightedEnd: function (e, t, n, i) {
                                if (i.visualBlock && n.sameLine) {
                                    var o = i.sel;
                                    return [P(e, r(o.anchor.line, o.head.ch)), P(e, r(o.head.line, o.anchor.ch))]
                                }
                                return [i.sel.head, i.sel.anchor]
                            },
                            jumpToMark: function (e, t, n, i) {
                                for (var o = t, a = 0; a < n.repeat; a++) {
                                    var s = o;
                                    for (var l in i.marks)
                                        if (p(l)) {
                                            var c = i.marks[l].find(),
                                                    u = n.forward ? j(c, s) : j(s, c);
                                            if (!(u || n.linewise && c.line == s.line)) {
                                                var f = $(s, o),
                                                        d = n.forward ? G(s, c, o) : G(o, c, s);
                                                (f || d) && (o = c)
                                            }
                                        }
                                }
                                return n.linewise && (o = r(o.line, fe(e.getLine(o.line)))), o
                            },
                            moveByCharacters: function (e, t, n) {
                                var i = t,
                                        o = n.repeat,
                                        a = n.forward ? i.ch + o : i.ch - o;
                                return r(i.line, a)
                            },
                            moveByLines: function (e, t, n, i) {
                                var o = t,
                                        a = o.ch;
                                switch (i.lastMotion) {
                                    case this.moveByLines:
                                    case this.moveByDisplayLines:
                                    case this.moveByScroll:
                                    case this.moveToColumn:
                                    case this.moveToEol:
                                        a = i.lastHPos;
                                        break;
                                    default:
                                        i.lastHPos = a
                                }
                                var s = n.repeat + (n.repeatOffset || 0),
                                        l = n.forward ? o.line + s : o.line - s,
                                        c = e.firstLine(),
                                        u = e.lastLine();
                                return l < c && o.line == c ? this.moveToStartOfLine(e, t, n, i) : l > u && o.line == u ? this.moveToEol(e, t, n, i) : (n.toFirstChar && (a = fe(e.getLine(l)), i.lastHPos = a), i.lastHSPos = e.charCoords(r(l, a), "div").left, r(l, a))
                            },
                            moveByDisplayLines: function (e, t, n, i) {
                                var o = t;
                                switch (i.lastMotion) {
                                    case this.moveByDisplayLines:
                                    case this.moveByScroll:
                                    case this.moveByLines:
                                    case this.moveToColumn:
                                    case this.moveToEol:
                                        break;
                                    default:
                                        i.lastHSPos = e.charCoords(o, "div").left
                                }
                                var a = n.repeat,
                                        s = e.findPosV(o, n.forward ? a : -a, "line", i.lastHSPos);
                                if (s.hitSide)
                                    if (n.forward)
                                        var l = e.charCoords(s, "div"),
                                                c = {
                                                    top: l.top + 8,
                                                    left: i.lastHSPos
                                                },
                                                s = e.coordsChar(c, "div");
                                    else {
                                        var u = e.charCoords(r(e.firstLine(), 0), "div");
                                        u.left = i.lastHSPos, s = e.coordsChar(u, "div")
                                    }
                                return i.lastHPos = s.ch, s
                            },
                            moveByPage: function (e, t, n) {
                                var r = t,
                                        i = n.repeat;
                                return e.findPosV(r, n.forward ? i : -i, "page")
                            },
                            moveByParagraph: function (e, t, n) {
                                var r = n.forward ? 1 : -1;
                                return ke(e, t, n.repeat, r)
                            },
                            moveByScroll: function (e, t, n, r) {
                                var i = e.getScrollInfo(),
                                        o = null,
                                        a = n.repeat;
                                a || (a = i.clientHeight / (2 * e.defaultTextHeight()));
                                var s = e.charCoords(t, "local");
                                n.repeat = a;
                                var o = Ct.moveByDisplayLines(e, t, n, r);
                                if (!o)
                                    return null;
                                var l = e.charCoords(o, "local");
                                return e.scrollTo(null, i.top + l.top - s.top), o
                            },
                            moveByWords: function (e, t, n) {
                                return ve(e, t, n.repeat, !!n.forward, !!n.wordEnd, !!n.bigWord)
                            },
                            moveTillCharacter: function (e, t, n) {
                                var r = n.repeat,
                                        i = ye(e, r, n.forward, n.selectedCharacter),
                                        o = n.forward ? -1 : 1;
                                return he(o, n), i ? (i.ch += o, i) : null
                            },
                            moveToCharacter: function (e, t, n) {
                                var r = n.repeat;
                                return he(0, n), ye(e, r, n.forward, n.selectedCharacter) || t
                            },
                            moveToSymbol: function (e, t, n) {
                                var r = n.repeat;
                                return me(e, r, n.forward, n.selectedCharacter) || t
                            },
                            moveToColumn: function (e, t, n, r) {
                                var i = n.repeat;
                                return r.lastHPos = i - 1, r.lastHSPos = e.charCoords(t, "div").left, _e(e, i)
                            },
                            moveToEol: function (e, t, n, i) {
                                var o = t;
                                i.lastHPos = 1 / 0;
                                var a = r(o.line + n.repeat - 1, 1 / 0),
                                        s = e.clipPos(a);
                                return s.ch--, i.lastHSPos = e.charCoords(s, "div").left, a
                            },
                            moveToFirstNonWhiteSpaceCharacter: function (e, t) {
                                var n = t;
                                return r(n.line, fe(e.getLine(n.line)))
                            },
                            moveToMatchedSymbol: function (e, t) {
                                var n, i = t,
                                        o = i.line,
                                        a = i.ch,
                                        s = e.getLine(o);
                                do
                                    if (n = s.charAt(a++), n && h(n)) {
                                        var l = e.getTokenTypeAt(r(o, a));
                                        if ("string" !== l && "comment" !== l)
                                            break
                                    }
                                while (n);
                                if (n) {
                                    var c = e.findMatchingBracket(r(o, a));
                                    return c.to
                                }
                                return i
                            },
                            moveToStartOfLine: function (e, t) {
                                return r(t.line, 0)
                            },
                            moveToLineOrEdgeOfDocument: function (e, t, n) {
                                var i = n.forward ? e.lastLine() : e.firstLine();
                                return n.repeatIsExplicit && (i = n.repeat - e.getOption("firstLineNumber")), r(i, fe(e.getLine(i)))
                            },
                            textObjectManipulation: function (e, t, n, r) {
                                var i = {
                                    "(": ")",
                                    ")": "(",
                                    "{": "}",
                                    "}": "{",
                                    "[": "]",
                                    "]": "["
                                },
                                        o = {
                                            "'": !0,
                                            '"': !0
                                        },
                                        a = n.selectedCharacter;
                                "b" == a ? a = "(" : "B" == a && (a = "{");
                                var s, l = !n.textObjectInner;
                                if (i[a])
                                    s = xe(e, t, a, l);
                                else if (o[a])
                                    s = Ce(e, t, a, l);
                                else if ("W" === a)
                                    s = de(e, l, !0, !0);
                                else if ("w" === a)
                                    s = de(e, l, !0, !1);
                                else {
                                    if ("p" !== a)
                                        return null;
                                    if (s = ke(e, t, n.repeat, 0, l), n.linewise = !0, r.visualMode)
                                        r.visualLine || (r.visualLine = !0);
                                    else {
                                        var c = r.inputState.operatorArgs;
                                        c && (c.linewise = !0), s.end.line--
                                    }
                                }
                                return e.state.vim.visualMode ? ie(e, s.start, s.end) : [s.start, s.end]
                            },
                            repeatLastCharacterSearch: function (e, t, n) {
                                var r = bt.lastCharacterSearch,
                                        i = n.repeat,
                                        o = n.forward === r.forward,
                                        a = (r.increment ? 1 : 0) * (o ? -1 : 1);
                                e.moveH(-a, "char"), n.inclusive = !!o;
                                var s = ye(e, i, o, r.selectedCharacter);
                                return s ? (s.ch += a, s) : (e.moveH(a, "char"), t)
                            }
                        },
                        St = {
                            change: function (t, n, i) {
                                var o, a, s = t.state.vim;
                                if (bt.macroModeState.lastInsertModeChanges.inVisualBlock = s.visualBlock, s.visualMode) {
                                    a = t.getSelection();
                                    var l = I("", i.length);
                                    t.replaceSelections(l), o = K(i[0].head, i[0].anchor)
                                } else {
                                    var c = i[0].anchor,
                                            u = i[0].head;
                                    a = t.getRange(c, u);
                                    var f = s.lastEditInputState || {};
                                    if ("moveByWords" == f.motion && !v(a)) {
                                        var d = /\s+$/.exec(a);
                                        d && f.motionArgs && f.motionArgs.forward && (u = D(u, 0, -d[0].length), a = a.slice(0, -d[0].length))
                                    }
                                    var p = new r(c.line - 1, Number.MAX_VALUE),
                                            h = t.firstLine() == t.lastLine();
                                    u.line > t.lastLine() && n.linewise && !h ? t.replaceRange("", p, u) : t.replaceRange("", c, u), n.linewise && (h || (t.setCursor(p), e.commands.newlineAndIndent(t)), c.ch = Number.MAX_VALUE), o = c
                                }
                                bt.registerController.pushText(n.registerName, "change", a, n.linewise, i.length > 1), Lt.enterInsertMode(t, {
                                    head: o
                                }, t.state.vim)
                            },
                            delete: function (e, t, n) {
                                var i, o, a = e.state.vim;
                                if (a.visualBlock) {
                                    o = e.getSelection();
                                    var s = I("", n.length);
                                    e.replaceSelections(s), i = n[0].anchor
                                } else {
                                    var l = n[0].anchor,
                                            c = n[0].head;
                                    t.linewise && c.line != e.firstLine() && l.line == e.lastLine() && l.line == c.line - 1 && (l.line == e.firstLine() ? l.ch = 0 : l = r(l.line - 1, X(e, l.line - 1))), o = e.getRange(l, c), e.replaceRange("", l, c), i = l, t.linewise && (i = Ct.moveToFirstNonWhiteSpaceCharacter(e, l))
                                }
                                return bt.registerController.pushText(t.registerName, "delete", o, t.linewise, a.visualBlock), P(e, i)
                            },
                            indent: function (e, t, n) {
                                var r = e.state.vim,
                                        i = n[0].anchor.line,
                                        o = r.visualBlock ? n[n.length - 1].anchor.line : n[0].head.line,
                                        a = r.visualMode ? t.repeat : 1;
                                t.linewise && o--;
                                for (var s = i; s <= o; s++)
                                    for (var l = 0; l < a; l++)
                                        e.indentLine(s, t.indentRight);
                                return Ct.moveToFirstNonWhiteSpaceCharacter(e, n[0].anchor)
                            },
                            changeCase: function (e, t, n, r, i) {
                                for (var o = e.getSelections(), a = [], s = t.toLower, l = 0; l < o.length; l++) {
                                    var c = o[l],
                                            u = "";
                                    if (s === !0)
                                        u = c.toLowerCase();
                                    else if (s === !1)
                                        u = c.toUpperCase();
                                    else
                                        for (var f = 0; f < c.length; f++) {
                                            var d = c.charAt(f);
                                            u += g(d) ? d.toLowerCase() : d.toUpperCase()
                                        }
                                    a.push(u)
                                }
                                return e.replaceSelections(a), t.shouldMoveCursor ? i : !e.state.vim.visualMode && t.linewise && n[0].anchor.line + 1 == n[0].head.line ? Ct.moveToFirstNonWhiteSpaceCharacter(e, r) : t.linewise ? r : K(n[0].anchor, n[0].head)
                            },
                            yank: function (e, t, n, r) {
                                var i = e.state.vim,
                                        o = e.getSelection(),
                                        a = i.visualMode ? K(i.sel.anchor, i.sel.head, n[0].head, n[0].anchor) : r;
                                return bt.registerController.pushText(t.registerName, "yank", o, t.linewise, i.visualBlock), a
                            }
                        },
                        Lt = {
                            jumpListWalk: function (e, t, n) {
                                if (!n.visualMode) {
                                    var r = t.repeat,
                                            i = t.forward,
                                            o = bt.jumpList,
                                            a = o.move(e, i ? r : -r),
                                            s = a ? a.find() : void 0;
                                    s = s ? s : e.getCursor(), e.setCursor(s)
                                }
                            },
                            scroll: function (e, t, n) {
                                if (!n.visualMode) {
                                    var r = t.repeat || 1,
                                            i = e.defaultTextHeight(),
                                            o = e.getScrollInfo().top,
                                            a = i * r,
                                            s = t.forward ? o + a : o - a,
                                            l = U(e.getCursor()),
                                            c = e.charCoords(l, "local");
                                    if (t.forward)
                                        s > c.top ? (l.line += (s - c.top) / i, l.line = Math.ceil(l.line), e.setCursor(l), c = e.charCoords(l, "local"), e.scrollTo(null, c.top)) : e.scrollTo(null, s);
                                    else {
                                        var u = s + e.getScrollInfo().clientHeight;
                                        u < c.bottom ? (l.line -= (c.bottom - u) / i, l.line = Math.floor(l.line), e.setCursor(l), c = e.charCoords(l, "local"), e.scrollTo(null, c.bottom - e.getScrollInfo().clientHeight)) : e.scrollTo(null, s)
                                    }
                                }
                            },
                            scrollToCursor: function (e, t) {
                                var n = e.getCursor().line,
                                        i = e.charCoords(r(n, 0), "local"),
                                        o = e.getScrollInfo().clientHeight,
                                        a = i.top,
                                        s = i.bottom - a;
                                switch (t.position) {
                                    case "center":
                                        a = a - o / 2 + s;
                                        break;
                                    case "bottom":
                                        a = a - o + s
                                }
                                e.scrollTo(null, a)
                            },
                            replayMacro: function (e, t, n) {
                                var r = t.selectedCharacter,
                                        i = t.repeat,
                                        o = bt.macroModeState;
                                for ("@" == r && (r = o.latestRegister); i--; )
                                    Xe(e, n, o, r)
                            },
                            enterMacroRecordMode: function (e, t) {
                                var n = bt.macroModeState,
                                        r = t.selectedCharacter;
                                n.enterMacroRecordMode(e, r)
                            },
                            enterInsertMode: function (t, n, i) {
                                if (!t.getOption("readOnly")) {
                                    i.insertMode = !0, i.insertModeRepeat = n && n.repeat || 1;
                                    var o = n ? n.insertAt : null,
                                            a = i.sel,
                                            s = n.head || t.getCursor("head"),
                                            l = t.listSelections().length;
                                    if ("eol" == o)
                                        s = r(s.line, X(t, s.line));
                                    else if ("charAfter" == o)
                                        s = D(s, 0, 1);
                                    else if ("firstNonBlank" == o)
                                        s = Ct.moveToFirstNonWhiteSpaceCharacter(t, s);
                                    else if ("startOfSelectedArea" == o)
                                        i.visualBlock ? (s = r(Math.min(a.head.line, a.anchor.line), Math.min(a.head.ch, a.anchor.ch)), l = Math.abs(a.head.line - a.anchor.line) + 1) : s = a.head.line < a.anchor.line ? a.head : r(a.anchor.line, 0);
                                    else if ("endOfSelectedArea" == o)
                                        i.visualBlock ? (s = r(Math.min(a.head.line, a.anchor.line), Math.max(a.head.ch + 1, a.anchor.ch)), l = Math.abs(a.head.line - a.anchor.line) + 1) : s = a.head.line >= a.anchor.line ? D(a.head, 0, 1) : r(a.anchor.line, 0);
                                    else if ("inplace" == o && i.visualMode)
                                        return;
                                    t.setOption("keyMap", "vim-insert"), t.setOption("disableInput", !1), n && n.replace ? (t.toggleOverwrite(!0), t.setOption("keyMap", "vim-replace"), e.signal(t, "vim-mode-change", {
                                        mode: "replace"
                                    })) : (t.setOption("keyMap", "vim-insert"), e.signal(t, "vim-mode-change", {
                                        mode: "insert"
                                    })), bt.macroModeState.isPlaying || (t.on("change", Je), e.on(t.getInputField(), "keydown", it)), i.visualMode && le(t), ee(t, s, l)
                                }
                            },
                            toggleVisualMode: function (t, n, i) {
                                var o, a = n.repeat,
                                        s = t.getCursor();
                                i.visualMode ? i.visualLine ^ n.linewise || i.visualBlock ^ n.blockwise ? (i.visualLine = !!n.linewise, i.visualBlock = !!n.blockwise, e.signal(t, "vim-mode-change", {
                                    mode: "visual",
                                    subMode: i.visualLine ? "linewise" : i.visualBlock ? "blockwise" : ""
                                }), oe(t)) : le(t) : (i.visualMode = !0, i.visualLine = !!n.linewise, i.visualBlock = !!n.blockwise, o = P(t, r(s.line, s.ch + a - 1), !0), i.sel = {
                                    anchor: s,
                                    head: o
                                }, e.signal(t, "vim-mode-change", {
                                    mode: "visual",
                                    subMode: i.visualLine ? "linewise" : i.visualBlock ? "blockwise" : ""
                                }), oe(t), be(t, i, "<", K(s, o)), be(t, i, ">", V(s, o)))
                            },
                            reselectLastSelection: function (t, n, r) {
                                var i = r.lastSelection;
                                if (r.visualMode && re(t, r), i) {
                                    var o = i.anchorMark.find(),
                                            a = i.headMark.find();
                                    if (!o || !a)
                                        return;
                                    r.sel = {
                                        anchor: o,
                                        head: a
                                    }, r.visualMode = !0, r.visualLine = i.visualLine, r.visualBlock = i.visualBlock, oe(t), be(t, r, "<", K(o, a)), be(t, r, ">", V(o, a)), e.signal(t, "vim-mode-change", {
                                        mode: "visual",
                                        subMode: r.visualLine ? "linewise" : r.visualBlock ? "blockwise" : ""
                                    })
                                }
                            },
                            joinLines: function (e, t, n) {
                                var i, o;
                                if (n.visualMode) {
                                    if (i = e.getCursor("anchor"), o = e.getCursor("head"), j(o, i)) {
                                        var a = o;
                                        o = i, i = a
                                    }
                                    o.ch = X(e, o.line) - 1
                                } else {
                                    var s = Math.max(t.repeat, 2);
                                    i = e.getCursor(), o = P(e, r(i.line + s - 1, 1 / 0))
                                }
                                for (var l = 0, c = i.line; c < o.line; c++) {
                                    l = X(e, i.line);
                                    var a = r(i.line + 1, X(e, i.line + 1)),
                                            u = e.getRange(i, a);
                                    u = u.replace(/\n\s*/g, " "), e.replaceRange(u, i, a)
                                }
                                var f = r(i.line, l);
                                n.visualMode && le(e, !1), e.setCursor(f)
                            },
                            newLineAndEnterInsertMode: function (t, n, i) {
                                i.insertMode = !0;
                                var o = U(t.getCursor());
                                if (o.line !== t.firstLine() || n.after) {
                                    o.line = n.after ? o.line : o.line - 1, o.ch = X(t, o.line), t.setCursor(o);
                                    var a = e.commands.newlineAndIndentContinueComment || e.commands.newlineAndIndent;
                                    a(t)
                                } else
                                    t.replaceRange("\n", r(t.firstLine(), 0)), t.setCursor(t.firstLine(), 0);
                                this.enterInsertMode(t, {
                                    repeat: n.repeat
                                }, i)
                            },
                            paste: function (e, t, n) {
                                var i = U(e.getCursor()),
                                        o = bt.registerController.getRegister(t.registerName),
                                        a = o.toString();
                                if (a) {
                                    if (t.matchIndent) {
                                        var s = e.getOption("tabSize"),
                                                l = function (e) {
                                                    var t = e.split("\t").length - 1,
                                                            n = e.split(" ").length - 1;
                                                    return t * s + 1 * n
                                                },
                                                c = e.getLine(e.getCursor().line),
                                                u = l(c.match(/^\s*/)[0]),
                                                f = a.replace(/\n$/, ""),
                                                d = a !== f,
                                                p = l(a.match(/^\s*/)[0]),
                                                a = f.replace(/^\s*/gm, function (t) {
                                                    var n = u + (l(t) - p);
                                                    if (n < 0)
                                                        return "";
                                                    if (e.getOption("indentWithTabs")) {
                                                        var r = Math.floor(n / s);
                                                        return Array(r + 1).join("\t")
                                                    }
                                                    return Array(n + 1).join(" ")
                                                });
                                        a += d ? "\n" : ""
                                    }
                                    if (t.repeat > 1)
                                        var a = Array(t.repeat + 1).join(a);
                                    var h = o.linewise,
                                            m = o.blockwise;
                                    if (h)
                                        n.visualMode ? a = n.visualLine ? a.slice(0, -1) : "\n" + a.slice(0, a.length - 1) + "\n" : t.after ? (a = "\n" + a.slice(0, a.length - 1), i.ch = X(e, i.line)) : i.ch = 0;
                                    else {
                                        if (m) {
                                            a = a.split("\n");
                                            for (var g = 0; g < a.length; g++)
                                                a[g] = "" == a[g] ? " " : a[g]
                                        }
                                        i.ch += t.after ? 1 : 0
                                    }
                                    var v, y;
                                    if (n.visualMode) {
                                        n.lastPastedText = a;
                                        var _, b = ne(e, n),
                                                w = b[0],
                                                k = b[1],
                                                x = e.getSelection(),
                                                C = e.listSelections(),
                                                S = new Array(C.length).join("1").split("1");
                                        n.lastSelection && (_ = n.lastSelection.headMark.find()), bt.registerController.unnamedRegister.setText(x), m ? (e.replaceSelections(S), k = r(w.line + a.length - 1, w.ch), e.setCursor(w), J(e, k), e.replaceSelections(a), v = w) : n.visualBlock ? (e.replaceSelections(S), e.setCursor(w), e.replaceRange(a, w, w), v = w) : (e.replaceRange(a, w, k), v = e.posFromIndex(e.indexFromPos(w) + a.length - 1)), _ && (n.lastSelection.headMark = e.setBookmark(_)), h && (v.ch = 0)
                                    } else if (m) {
                                        e.setCursor(i);
                                        for (var g = 0; g < a.length; g++) {
                                            var L = i.line + g;
                                            L > e.lastLine() && e.replaceRange("\n", r(L, 0));
                                            var M = X(e, L);
                                            M < i.ch && Q(e, L, i.ch)
                                        }
                                        e.setCursor(i), J(e, r(i.line + a.length - 1, i.ch)), e.replaceSelections(a), v = i
                                    } else
                                        e.replaceRange(a, i), h && t.after ? v = r(i.line + 1, fe(e.getLine(i.line + 1))) : h && !t.after ? v = r(i.line, fe(e.getLine(i.line))) : !h && t.after ? (y = e.indexFromPos(i), v = e.posFromIndex(y + a.length - 1)) : (y = e.indexFromPos(i), v = e.posFromIndex(y + a.length));
                                    n.visualMode && le(e, !1), e.setCursor(v)
                                }
                            },
                            undo: function (t, n) {
                                t.operation(function () {
                                    q(t, e.commands.undo, n.repeat)(), t.setCursor(t.getCursor("anchor"))
                                })
                            },
                            redo: function (t, n) {
                                q(t, e.commands.redo, n.repeat)()
                            },
                            setRegister: function (e, t, n) {
                                n.inputState.registerName = t.selectedCharacter
                            },
                            setMark: function (e, t, n) {
                                var r = t.selectedCharacter;
                                be(e, n, r, e.getCursor())
                            },
                            replace: function (t, n, i) {
                                var o, a, s = n.selectedCharacter,
                                        l = t.getCursor(),
                                        c = t.listSelections();
                                if (i.visualMode)
                                    l = t.getCursor("start"), a = t.getCursor("end");
                                else {
                                    var u = t.getLine(l.line);
                                    o = l.ch + n.repeat, o > u.length && (o = u.length), a = r(l.line, o)
                                }
                                if ("\n" == s)
                                    i.visualMode || t.replaceRange("", l, a), (e.commands.newlineAndIndentContinueComment || e.commands.newlineAndIndent)(t);
                                else {
                                    var f = t.getRange(l, a);
                                    if (f = f.replace(/[^\n]/g, s), i.visualBlock) {
                                        var d = new Array(t.getOption("tabSize") + 1).join(" ");
                                        f = t.getSelection(), f = f.replace(/\t/g, d).replace(/[^\n]/g, s).split("\n"), t.replaceSelections(f)
                                    } else
                                        t.replaceRange(f, l, a);
                                    i.visualMode ? (l = j(c[0].anchor, c[0].head) ? c[0].anchor : c[0].head, t.setCursor(l), le(t, !1)) : t.setCursor(D(a, 0, -1))
                                }
                            },
                            incrementNumberToken: function (e, t) {
                                for (var n, i, o, a, s, l = e.getCursor(), c = e.getLine(l.line), u = /-?\d+/g; null !== (n = u.exec(c)) && (s = n[0], i = n.index, o = i + s.length, !(l.ch < o)); )
                                    ;
                                if ((t.backtrack || !(o <= l.ch)) && s) {
                                    var f = t.increase ? 1 : -1,
                                            d = parseInt(s) + f * t.repeat,
                                            p = r(l.line, i),
                                            h = r(l.line, o);
                                    a = d.toString(), e.replaceRange(a, p, h), e.setCursor(r(l.line, i + a.length - 1))
                                }
                            },
                            repeatLastEdit: function (e, t, n) {
                                var r = n.lastEditInputState;
                                if (r) {
                                    var i = t.repeat;
                                    i && t.repeatIsExplicit ? n.lastEditInputState.repeatOverride = i : i = n.lastEditInputState.repeatOverride || i, ot(e, n, i, !1)
                                }
                            },
                            exitInsertMode: Ke
                        },
                        Mt = {
                            "(": "bracket",
                            ")": "bracket",
                            "{": "bracket",
                            "}": "bracket",
                            "[": "section",
                            "]": "section",
                            "*": "comment",
                            "/": "comment",
                            m: "method",
                            M: "method",
                            "#": "preprocess"
                        },
                        Tt = {
                            bracket: {
                                isComplete: function (e) {
                                    if (e.nextCh === e.symb) {
                                        if (e.depth++, e.depth >= 1)
                                            return !0
                                    } else
                                        e.nextCh === e.reverseSymb && e.depth--;
                                    return !1
                                }
                            },
                            section: {
                                init: function (e) {
                                    e.curMoveThrough = !0, e.symb = (e.forward ? "]" : "[") === e.symb ? "{" : "}"
                                },
                                isComplete: function (e) {
                                    return 0 === e.index && e.nextCh === e.symb
                                }
                            },
                            comment: {
                                isComplete: function (e) {
                                    var t = "*" === e.lastCh && "/" === e.nextCh;
                                    return e.lastCh = e.nextCh, t
                                }
                            },
                            method: {
                                init: function (e) {
                                    e.symb = "m" === e.symb ? "{" : "}", e.reverseSymb = "{" === e.symb ? "}" : "{"
                                },
                                isComplete: function (e) {
                                    return e.nextCh === e.symb
                                }
                            },
                            preprocess: {
                                init: function (e) {
                                    e.index = 0
                                },
                                isComplete: function (e) {
                                    if ("#" === e.nextCh) {
                                        var t = e.lineText.match(/#(\w+)/)[1];
                                        if ("endif" === t) {
                                            if (e.forward && 0 === e.depth)
                                                return !0;
                                            e.depth++
                                        } else if ("if" === t) {
                                            if (!e.forward && 0 === e.depth)
                                                return !0;
                                            e.depth--
                                        }
                                        if ("else" === t && 0 === e.depth)
                                            return !0
                                    }
                                    return !1
                                }
                            }
                        };
                _("pcre", !0, "boolean"), Se.prototype = {
                    getQuery: function () {
                        return bt.query
                    },
                    setQuery: function (e) {
                        bt.query = e
                    },
                    getOverlay: function () {
                        return this.searchOverlay
                    },
                    setOverlay: function (e) {
                        this.searchOverlay = e
                    },
                    isReversed: function () {
                        return bt.isReversed
                    },
                    setReversed: function (e) {
                        bt.isReversed = e
                    },
                    getScrollbarAnnotate: function () {
                        return this.annotate
                    },
                    setScrollbarAnnotate: function (e) {
                        this.annotate = e
                    }
                };
                var At = {
                    "\\n": "\n",
                    "\\r": "\r",
                    "\\t": "\t"
                },
                        Et = {
                            "\\/": "/",
                            "\\\\": "\\",
                            "\\n": "\n",
                            "\\r": "\r",
                            "\\t": "\t"
                        },
                        Ot = "(Javascript regexp)",
                        It = function () {
                            this.buildCommandMap_()
                        };
                It.prototype = {
                    processCommand: function (e, t, n) {
                        var r = this;
                        e.operation(function () {
                            e.curOp.isVimOp = !0, r._processCommand(e, t, n)
                        })
                    },
                    _processCommand: function (t, n, r) {
                        var i = t.state.vim,
                                o = bt.registerController.getRegister(":"),
                                a = o.toString();
                        i.visualMode && le(t);
                        var s = new e.StringStream(n);
                        o.setText(n);
                        var l = r || {};
                        l.input = n;
                        try {
                            this.parseInput_(t, s, l)
                        } catch (e) {
                            throw Ne(t, e), e
                        }
                        var c, u;
                        if (l.commandName) {
                            if (c = this.matchCommand_(l.commandName)) {
                                if (u = c.name, c.excludeFromCommandHistory && o.setText(a), this.parseCommandArgs_(s, l, c), "exToKey" == c.type) {
                                    for (var f = 0; f < c.toKeys.length; f++)
                                        e.Vim.handleKey(t, c.toKeys[f], "mapping");
                                    return
                                }
                                if ("exToEx" == c.type)
                                    return void this.processCommand(t, c.toInput)
                            }
                        } else
                            void 0 !== l.line && (u = "move");
                        if (!u)
                            return void Ne(t, 'Not an editor command ":' + n + '"');
                        try {
                            Rt[u](t, l), c && c.possiblyAsync || !l.callback || l.callback()
                        } catch (e) {
                            throw Ne(t, e), e
                        }
                    },
                    parseInput_: function (e, t, n) {
                        t.eatWhile(":"), t.eat("%") ? (n.line = e.firstLine(), n.lineEnd = e.lastLine()) : (n.line = this.parseLineSpec_(e, t), void 0 !== n.line && t.eat(",") && (n.lineEnd = this.parseLineSpec_(e, t)));
                        var r = t.match(/^(\w+)/);
                        return r ? n.commandName = r[1] : n.commandName = t.match(/.*/)[0], n
                    },
                    parseLineSpec_: function (e, t) {
                        var n = t.match(/^(\d+)/);
                        if (n)
                            return parseInt(n[1], 10) - 1;
                        switch (t.next()) {
                            case ".":
                                return e.getCursor().line;
                            case "$":
                                return e.lastLine();
                            case "'":
                                var r = e.state.vim.marks[t.next()];
                                if (r && r.find())
                                    return r.find().line;
                                throw new Error("Mark not set");
                            default:
                                return void t.backUp(1)
                        }
                    },
                    parseCommandArgs_: function (e, t, n) {
                        if (!e.eol()) {
                            t.argString = e.match(/.*/)[0];
                            var r = n.argDelimiter || /\s+/,
                                    i = Y(t.argString).split(r);
                            i.length && i[0] && (t.args = i)
                        }
                    },
                    matchCommand_: function (e) {
                        for (var t = e.length; t > 0; t--) {
                            var n = e.substring(0, t);
                            if (this.commandMap_[n]) {
                                var r = this.commandMap_[n];
                                if (0 === r.name.indexOf(e))
                                    return r
                            }
                        }
                        return null
                    },
                    buildCommandMap_: function () {
                        this.commandMap_ = {};
                        for (var e = 0; e < n.length; e++) {
                            var t = n[e],
                                    r = t.shortName || t.name;
                            this.commandMap_[r] = t
                        }
                    },
                    map: function (e, n, r) {
                        if (":" != e && ":" == e.charAt(0)) {
                            if (r)
                                throw Error("Mode not supported for ex mappings");
                            var i = e.substring(1);
                            ":" != n && ":" == n.charAt(0) ? this.commandMap_[i] = {
                                name: i,
                                type: "exToEx",
                                toInput: n.substring(1),
                                user: !0
                            } : this.commandMap_[i] = {
                                name: i,
                                type: "exToKey",
                                toKeys: n,
                                user: !0
                            }
                        } else if (":" != n && ":" == n.charAt(0)) {
                            var o = {
                                keys: e,
                                type: "keyToEx",
                                exArgs: {
                                    input: n.substring(1)
                                },
                                user: !0
                            };
                            r && (o.context = r), t.unshift(o)
                        } else {
                            var o = {
                                keys: e,
                                type: "keyToKey",
                                toKeys: n,
                                user: !0
                            };
                            r && (o.context = r), t.unshift(o)
                        }
                    },
                    unmap: function (e, n) {
                        if (":" != e && ":" == e.charAt(0)) {
                            if (n)
                                throw Error("Mode not supported for ex mappings");
                            var r = e.substring(1);
                            if (this.commandMap_[r] && this.commandMap_[r].user)
                                return void delete this.commandMap_[r]
                        } else
                            for (var i = e, o = 0; o < t.length; o++)
                                if (i == t[o].keys && t[o].context === n && t[o].user)
                                    return void t.splice(o, 1);
                        throw Error("No such mapping.")
                    }
                };
                var Rt = {
                    colorscheme: function (e, t) {
                        return !t.args || t.args.length < 1 ? void Ne(e, e.getOption("theme")) : void e.setOption("theme", t.args[0])
                    },
                    map: function (e, t, n) {
                        var r = t.args;
                        return !r || r.length < 2 ? void(e && Ne(e, "Invalid mapping: " + t.input)) : void Nt.map(r[0], r[1], n)
                    },
                    imap: function (e, t) {
                        this.map(e, t, "insert")
                    },
                    nmap: function (e, t) {
                        this.map(e, t, "normal")
                    },
                    vmap: function (e, t) {
                        this.map(e, t, "visual")
                    },
                    unmap: function (e, t, n) {
                        var r = t.args;
                        return !r || r.length < 1 ? void(e && Ne(e, "No such mapping: " + t.input)) : void Nt.unmap(r[0], n)
                    },
                    move: function (e, t) {
                        xt.processCommand(e, e.state.vim, {
                            type: "motion",
                            motion: "moveToLineOrEdgeOfDocument",
                            motionArgs: {
                                forward: !1,
                                explicitRepeat: !0,
                                linewise: !0
                            },
                            repeatOverride: t.line + 1
                        })
                    },
                    set: function (e, t) {
                        var n = t.args,
                                r = t.setCfg || {};
                        if (!n || n.length < 1)
                            return void(e && Ne(e, "Invalid mapping: " + t.input));
                        var i = n[0].split("="),
                                o = i[0],
                                a = i[1],
                                s = !1;
                        if ("?" == o.charAt(o.length - 1)) {
                            if (a)
                                throw Error("Trailing characters: " + t.argString);
                            o = o.substring(0, o.length - 1), s = !0
                        }
                        void 0 === a && "no" == o.substring(0, 2) && (o = o.substring(2), a = !1);
                        var l = vt[o] && "boolean" == vt[o].type;
                        if (l && void 0 == a && (a = !0), !l && void 0 === a || s) {
                            var c = w(o, e, r);
                            c === !0 || c === !1 ? Ne(e, " " + (c ? "" : "no") + o) : Ne(e, "  " + o + "=" + c)
                        } else
                            b(o, a, e, r)
                    },
                    setlocal: function (e, t) {
                        t.setCfg = {
                            scope: "local"
                        }, this.set(e, t)
                    },
                    setglobal: function (e, t) {
                        t.setCfg = {
                            scope: "global"
                        }, this.set(e, t)
                    },
                    registers: function e(t, n) {
                        var r = n.args,
                                e = bt.registerController.registers,
                                i = "----------Registers----------<br><br>";
                        if (r) {
                            var o;
                            r = r.join("");
                            for (var a = 0; a < r.length; a++)
                                if (o = r.charAt(a), bt.registerController.isValidRegister(o)) {
                                    var s = e[o] || new M;
                                    i += '"' + o + "    " + s.toString() + "<br>"
                                }
                        } else
                            for (var o in e) {
                                var l = e[o].toString();
                                l.length && (i += '"' + o + "    " + l + "<br>")
                            }
                        Ne(t, i)
                    },
                    sort: function (t, n) {
                        function i() {
                            if (n.argString) {
                                var t = new e.StringStream(n.argString);
                                if (t.eat("!") && (a = !0), t.eol())
                                    return;
                                if (!t.eatSpace())
                                    return "Invalid arguments";
                                var r = t.match(/[a-z]+/);
                                if (r) {
                                    r = r[0], s = r.indexOf("i") != -1, l = r.indexOf("u") != -1;
                                    var i = r.indexOf("d") != -1 && 1,
                                            o = r.indexOf("x") != -1 && 1,
                                            u = r.indexOf("o") != -1 && 1;
                                    if (i + o + u > 1)
                                        return "Invalid arguments";
                                    c = i && "decimal" || o && "hex" || u && "octal"
                                }
                                if (t.match(/\/.*\//))
                                    return "patterns not supported"
                            }
                        }

                        function o(e, t) {
                            if (a) {
                                var n;
                                n = e, e = t, t = n
                            }
                            s && (e = e.toLowerCase(), t = t.toLowerCase());
                            var r = c && g.exec(e),
                                    i = c && g.exec(t);
                            return r ? (r = parseInt((r[1] + r[2]).toLowerCase(), v), i = parseInt((i[1] + i[2]).toLowerCase(), v), r - i) : e < t ? -1 : 1
                        }
                        var a, s, l, c, u = i();
                        if (u)
                            return void Ne(t, u + ": " + n.argString);
                        var f = n.line || t.firstLine(),
                                d = n.lineEnd || n.line || t.lastLine();
                        if (f != d) {
                            var p = r(f, 0),
                                    h = r(d, X(t, d)),
                                    m = t.getRange(p, h).split("\n"),
                                    g = "decimal" == c ? /(-?)([\d]+)/ : "hex" == c ? /(-?)(?:0x)?([0-9a-f]+)/i : "octal" == c ? /([0-7]+)/ : null,
                                    v = "decimal" == c ? 10 : "hex" == c ? 16 : "octal" == c ? 8 : null,
                                    y = [],
                                    _ = [];
                            if (c)
                                for (var b = 0; b < m.length; b++)
                                    g.exec(m[b]) ? y.push(m[b]) : _.push(m[b]);
                            else
                                _ = m;
                            if (y.sort(o), _.sort(o), m = a ? y.concat(_) : _.concat(y), l) {
                                var w, k = m;
                                m = [];
                                for (var b = 0; b < k.length; b++)
                                    k[b] != w && m.push(k[b]), w = k[b]
                            }
                            t.replaceRange(m.join("\n"), p, h)
                        }
                    },
                    global: function (e, t) {
                        var n = t.argString;
                        if (!n)
                            return void Ne(e, "Regular Expression missing from global");
                        var r, i = void 0 !== t.line ? t.line : e.firstLine(),
                                o = t.lineEnd || t.line || e.lastLine(),
                                a = Te(n),
                                s = n;
                        if (a.length && (s = a[0], r = a.slice(1, a.length).join("/")), s)
                            try {
                                Fe(e, s, !0, !0)
                            } catch (t) {
                                return void Ne(e, "Invalid regex: " + s)
                            }
                        for (var l = Le(e).getQuery(), c = [], u = "", f = i; f <= o; f++) {
                            var d = l.test(e.getLine(f));
                            d && (c.push(f + 1), u += e.getLine(f) + "<br>")
                        }
                        if (!r)
                            return void Ne(e, u);
                        var p = 0,
                                h = function t() {
                                    if (p < c.length) {
                                        var n = c[p] + r;
                                        Nt.processCommand(e, n, {
                                            callback: t
                                        })
                                    }
                                    p++
                                };
                        h()
                    },
                    substitute: function (e, t) {
                        if (!e.getSearchCursor)
                            throw new Error("Search feature not available. Requires searchcursor.js or any other getSearchCursor implementation.");
                        var n, i, o, a, s = t.argString,
                                l = s ? Te(s) : [],
                                c = "",
                                u = !1,
                                f = !1;
                        if (l.length)
                            n = l[0], c = l[1], void 0 !== c && (c = w("pcre") ? Ie(c) : Oe(c), bt.lastSubstituteReplacePart = c), i = l[2] ? l[2].split(" ") : [];
                        else if (s && s.length)
                            return void Ne(e, "Substitutions should be of the form :s/pattern/replace/");
                        if (i && (o = i[0], a = parseInt(i[1]), o && (o.indexOf("c") != -1 && (u = !0, o.replace("c", "")), o.indexOf("g") != -1 && (f = !0, o.replace("g", "")), n = n + "/" + o)), n)
                            try {
                                Fe(e, n, !0, !0)
                            } catch (t) {
                                return void Ne(e, "Invalid regex: " + n)
                            }
                        if (c = c || bt.lastSubstituteReplacePart, void 0 === c)
                            return void Ne(e, "No previous substitute regular expression");
                        var d = Le(e),
                                p = d.getQuery(),
                                h = void 0 !== t.line ? t.line : e.getCursor().line,
                                m = t.lineEnd || h;
                        h == e.firstLine() && m == e.lastLine() && (m = 1 / 0), a && (h = m, m = h + a - 1);
                        var g = P(e, r(h, 0)),
                                v = e.getSearchCursor(p, g);
                        je(e, u, f, h, m, v, p, c, t.callback)
                    },
                    redo: e.commands.redo,
                    undo: e.commands.undo,
                    write: function (t) {
                        e.commands.save ? e.commands.save(t) : t.save && t.save()
                    },
                    nohlsearch: function (e) {
                        qe(e)
                    },
                    yank: function (e) {
                        var t = U(e.getCursor()),
                                n = t.line,
                                r = e.getLine(n);
                        bt.registerController.pushText("0", "yank", r, !0, !0)
                    },
                    delmarks: function (t, n) {
                        if (!n.argString || !Y(n.argString))
                            return void Ne(t, "Argument required");
                        for (var r = t.state.vim, i = new e.StringStream(Y(n.argString)); !i.eol(); ) {
                            i.eatSpace();
                            var o = i.pos;
                            if (!i.match(/[a-zA-Z]/, !1))
                                return void Ne(t, "Invalid argument: " + n.argString.substring(o));
                            var a = i.next();
                            if (i.match("-", !0)) {
                                if (!i.match(/[a-zA-Z]/, !1))
                                    return void Ne(t, "Invalid argument: " + n.argString.substring(o));
                                var s = a,
                                        l = i.next();
                                if (!(p(s) && p(l) || g(s) && g(l)))
                                    return void Ne(t, "Invalid argument: " + s + "-");
                                var c = s.charCodeAt(0),
                                        u = l.charCodeAt(0);
                                if (c >= u)
                                    return void Ne(t, "Invalid argument: " + n.argString.substring(o));
                                for (var f = 0; f <= u - c; f++) {
                                    var d = String.fromCharCode(c + f);
                                    delete r.marks[d]
                                }
                            } else
                                delete r.marks[a]
                        }
                    }
                },
                        Nt = new It;
                return e.keyMap.vim = {
                    attach: s,
                    detach: a,
                    call: l
                }, _("insertModeEscKeysTimeout", 200, "number"), e.keyMap["vim-insert"] = {
                    "Ctrl-N": "autocomplete",
                    "Ctrl-P": "autocomplete",
                    Enter: function (t) {
                        var n = e.commands.newlineAndIndentContinueComment || e.commands.newlineAndIndent;
                        n(t)
                    },
                    fallthrough: ["default"],
                    attach: s,
                    detach: a,
                    call: l
                }, e.keyMap["vim-replace"] = {
                    Backspace: "goCharLeft",
                    fallthrough: ["vim-insert"],
                    attach: s,
                    detach: a,
                    call: l
                }, C(), kt
            };
    e.Vim = i()
});
var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
    return typeof e
} : function (e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e
};
!function (e) {
    e(CodeMirror)
}(function (e) {
    function t(e, t) {
        return "pairs" == t && "string" == typeof e ? e : "object" == ("undefined" == typeof e ? "undefined" : _typeof(e)) && null != e[t] ? e[t] : f[t]
    }

    function n(e) {
        return function (t) {
            return s(t, e)
        }
    }

    function r(e) {
        var t = e.state.closeBrackets;
        if (!t)
            return null;
        var n = e.getModeAt(e.getCursor());
        return n.closeBrackets || t
    }

    function i(n) {
        var i = r(n);
        if (!i || n.getOption("disableInput"))
            return e.Pass;
        for (var o = t(i, "pairs"), a = n.listSelections(), s = 0; s < a.length; s++) {
            if (!a[s].empty())
                return e.Pass;
            var l = c(n, a[s].head);
            if (!l || o.indexOf(l) % 2 != 0)
                return e.Pass
        }
        for (var s = a.length - 1; s >= 0; s--) {
            var u = a[s].head;
            n.replaceRange("", d(u.line, u.ch - 1), d(u.line, u.ch + 1), "+delete")
        }
    }

    function o(n) {
        var i = r(n),
                o = i && t(i, "explode");
        if (!o || n.getOption("disableInput"))
            return e.Pass;
        for (var a = n.listSelections(), s = 0; s < a.length; s++) {
            if (!a[s].empty())
                return e.Pass;
            var l = c(n, a[s].head);
            if (!l || o.indexOf(l) % 2 != 0)
                return e.Pass
        }
        n.operation(function () {
            n.replaceSelection("\n\n", null), n.execCommand("goCharLeft"), a = n.listSelections();
            for (var e = 0; e < a.length; e++) {
                var t = a[e].head.line;
                n.indentLine(t, null, !0), n.indentLine(t + 1, null, !0)
            }
        })
    }

    function a(t) {
        var n = e.cmpPos(t.anchor, t.head) > 0;
        return {
            anchor: new d(t.anchor.line, t.anchor.ch + (n ? -1 : 1)),
            head: new d(t.head.line, t.head.ch + (n ? 1 : -1))
        }
    }

    function s(n, i) {
        var o = r(n);
        if (!o || n.getOption("disableInput"))
            return e.Pass;
        var s = t(o, "pairs"),
                c = s.indexOf(i);
        if (c == -1)
            return e.Pass;
        for (var f, p, h = t(o, "triples"), m = s.charAt(c + 1) == i, g = n.listSelections(), v = c % 2 == 0, y = 0; y < g.length; y++) {
            var _, b = g[y],
                    w = b.head,
                    p = n.getRange(w, d(w.line, w.ch + 1));
            if (v && !b.empty())
                _ = "surround";
            else if (!m && v || p != i)
                if (m && w.ch > 1 && h.indexOf(i) >= 0 && n.getRange(d(w.line, w.ch - 2), w) == i + i && (w.ch <= 2 || n.getRange(d(w.line, w.ch - 3), d(w.line, w.ch - 2)) != i))
                    _ = "addFour";
                else if (m) {
                    if (e.isWordChar(p) || !u(n, w, i))
                        return e.Pass;
                    _ = "both"
                } else {
                    if (!v || n.getLine(w.line).length != w.ch && !l(p, s) && !/\s/.test(p))
                        return e.Pass;
                    _ = "both"
                }
            else
                _ = h.indexOf(i) >= 0 && n.getRange(w, d(w.line, w.ch + 3)) == i + i + i ? "skipThree" : "skip";
            if (f) {
                if (f != _)
                    return e.Pass
            } else
                f = _
        }
        var k = c % 2 ? s.charAt(c - 1) : i,
                x = c % 2 ? i : s.charAt(c + 1);
        n.operation(function () {
            if ("skip" == f)
                n.execCommand("goCharRight");
            else if ("skipThree" == f)
                for (var e = 0; e < 3; e++)
                    n.execCommand("goCharRight");
            else if ("surround" == f) {
                for (var t = n.getSelections(), e = 0; e < t.length; e++)
                    t[e] = k + t[e] + x;
                n.replaceSelections(t, "around"), t = n.listSelections().slice();
                for (var e = 0; e < t.length; e++)
                    t[e] = a(t[e]);
                n.setSelections(t)
            } else
                "both" == f ? (n.replaceSelection(k + x, null), n.triggerElectric(k + x), n.execCommand("goCharLeft")) : "addFour" == f && (n.replaceSelection(k + k + k + k, "before"), n.execCommand("goCharRight"))
        })
    }

    function l(e, t) {
        var n = t.lastIndexOf(e);
        return n > -1 && n % 2 == 1
    }

    function c(e, t) {
        var n = e.getRange(d(t.line, t.ch - 1), d(t.line, t.ch + 1));
        return 2 == n.length ? n : null
    }

    function u(t, n, r) {
        var i = t.getLine(n.line),
                o = t.getTokenAt(n);
        if (/\bstring2?\b/.test(o.type))
            return !1;
        var a = new e.StringStream(i.slice(0, n.ch) + r + i.slice(n.ch), 4);
        for (a.pos = a.start = o.start; ; ) {
            var s = t.getMode().token(a, o.state);
            if (a.pos >= n.ch + 1)
                return /\bstring2?\b/.test(s);
            a.start = a.pos
        }
    }
    var f = {
        pairs: "()[]{}''\"\"",
        triples: "",
        explode: "[]{}"
    },
            d = e.Pos;
    e.defineOption("autoCloseBrackets", !1, function (t, n, r) {
        r && r != e.Init && (t.removeKeyMap(h), t.state.closeBrackets = null), n && (t.state.closeBrackets = n, t.addKeyMap(h))
    });
    for (var p = f.pairs + "`", h = {
        Backspace: i,
        Enter: o
    }, m = 0; m < p.length; m++)
        h["'" + p.charAt(m) + "'"] = n(p.charAt(m))
});
var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
    return typeof e
} : function (e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e
};
!function (e) {
    e(CodeMirror)
}(function (e) {
    function t(e, t, r, i) {
        var o = e.getLineHandle(t.line),
                l = t.ch - 1,
                c = l >= 0 && s[o.text.charAt(l)] || s[o.text.charAt(++l)];
        if (!c)
            return null;
        var u = ">" == c.charAt(1) ? 1 : -1;
        if (r && u > 0 != (l == t.ch))
            return null;
        var f = e.getTokenTypeAt(a(t.line, l + 1)),
                d = n(e, a(t.line, l + (u > 0 ? 1 : 0)), u, f || null, i);
        return null == d ? null : {
            from: a(t.line, l),
            to: d && d.pos,
            match: d && d.ch == c.charAt(0),
            forward: u > 0
        }
    }

    function n(e, t, n, r, i) {
        for (var o = i && i.maxScanLineLength || 1e4, l = i && i.maxScanLines || 1e3, c = [], u = i && i.bracketRegex ? i.bracketRegex : /[(){}[\]]/, f = n > 0 ? Math.min(t.line + l, e.lastLine() + 1) : Math.max(e.firstLine() - 1, t.line - l), d = t.line; d != f; d += n) {
            var p = e.getLine(d);
            if (p) {
                var h = n > 0 ? 0 : p.length - 1,
                        m = n > 0 ? p.length : -1;
                if (!(p.length > o))
                    for (d == t.line && (h = t.ch - (n < 0 ? 1 : 0)); h != m; h += n) {
                        var g = p.charAt(h);
                        if (u.test(g) && (void 0 === r || e.getTokenTypeAt(a(d, h + 1)) == r)) {
                            var v = s[g];
                            if (">" == v.charAt(1) == n > 0)
                                c.push(g);
                            else {
                                if (!c.length)
                                    return {
                                        pos: a(d, h),
                                        ch: g
                                    };
                                c.pop()
                            }
                        }
                    }
            }
        }
        return d - n != (n > 0 ? e.lastLine() : e.firstLine()) && null
    }

    function r(e, n, r) {
        for (var i = e.state.matchBrackets.maxHighlightLineLength || 1e3, s = [], l = e.listSelections(), c = 0; c < l.length; c++) {
            var u = l[c].empty() && t(e, l[c].head, !1, r);
            if (u && e.getLine(u.from.line).length <= i) {
                var f = u.match ? "CodeMirror-matchingbracket" : "CodeMirror-nonmatchingbracket";
                s.push(e.markText(u.from, a(u.from.line, u.from.ch + 1), {
                    className: f
                })), u.to && e.getLine(u.to.line).length <= i && s.push(e.markText(u.to, a(u.to.line, u.to.ch + 1), {
                    className: f
                }))
            }
        }
        if (s.length) {
            o && e.state.focused && e.focus();
            var d = function () {
                e.operation(function () {
                    for (var e = 0; e < s.length; e++)
                        s[e].clear()
                })
            };
            if (!n)
                return d;
            setTimeout(d, 800)
        }
    }

    function i(e) {
        e.operation(function () {
            l && (l(), l = null), l = r(e, !1, e.state.matchBrackets)
        })
    }
    var o = /MSIE \d/.test(navigator.userAgent) && (null == document.documentMode || document.documentMode < 8),
            a = e.Pos,
            s = {
                "(": ")>",
                ")": "(<",
                "[": "]>",
                "]": "[<",
                "{": "}>",
                "}": "{<"
            },
            l = null;
    e.defineOption("matchBrackets", !1, function (t, n, r) {
        r && r != e.Init && t.off("cursorActivity", i), n && (t.state.matchBrackets = "object" == ("undefined" == typeof n ? "undefined" : _typeof(n)) ? n : {}, t.on("cursorActivity", i))
    }), e.defineExtension("matchBrackets", function () {
        r(this, !0)
    }), e.defineExtension("findMatchingBracket", function (e, n, r) {
        return t(this, e, n, r)
    }), e.defineExtension("scanForBracket", function (e, t, r, i) {
        return n(this, e, t, r, i)
    })
}),
        function (e) {
            e(CodeMirror)
        }(function (e) {
    e.registerHelper("fold", "brace", function (t, n) {
        function r(r) {
            for (var i = n.ch, l = 0; ; ) {
                var c = i <= 0 ? -1 : s.lastIndexOf(r, i - 1);
                if (c != -1) {
                    if (1 == l && c < n.ch)
                        break;
                    if (o = t.getTokenTypeAt(e.Pos(a, c + 1)), !/^(comment|string)/.test(o))
                        return c + 1;
                    i = c - 1
                } else {
                    if (1 == l)
                        break;
                    l = 1, i = s.length
                }
            }
        }
        var i, o, a = n.line,
                s = t.getLine(a),
                l = "{",
                c = "}",
                i = r("{");
        if (null == i && (l = "[", c = "]", i = r("[")), null != i) {
            var u, f, d = 1,
                    p = t.lastLine();
            e: for (var h = a; h <= p; ++h)
                for (var m = t.getLine(h), g = h == a ? i : 0; ; ) {
                    var v = m.indexOf(l, g),
                            y = m.indexOf(c, g);
                    if (v < 0 && (v = m.length), y < 0 && (y = m.length), g = Math.min(v, y), g == m.length)
                        break;
                    if (t.getTokenTypeAt(e.Pos(h, g + 1)) == o)
                        if (g == v)
                            ++d;
                        else if (!--d) {
                            u = h, f = g;
                            break e
                        }
                    ++g
                }
            if (null != u && (a != u || f != i))
                return {
                    from: e.Pos(a, i),
                    to: e.Pos(u, f)
                }
        }
    }), e.registerHelper("fold", "import", function (t, n) {
        function r(n) {
            if (n < t.firstLine() || n > t.lastLine())
                return null;
            var r = t.getTokenAt(e.Pos(n, 1));
            if (/\S/.test(r.string) || (r = t.getTokenAt(e.Pos(n, r.end + 1))), "keyword" != r.type || "import" != r.string)
                return null;
            for (var i = n, o = Math.min(t.lastLine(), n + 10); i <= o; ++i) {
                var a = t.getLine(i),
                        s = a.indexOf(";");
                if (s != -1)
                    return {
                        startCh: r.end,
                        end: e.Pos(i, s)
                    }
            }
        }
        var i, n = n.line,
                o = r(n);
        if (!o || r(n - 1) || (i = r(n - 2)) && i.end.line == n - 1)
            return null;
        for (var a = o.end; ; ) {
            var s = r(a.line + 1);
            if (null == s)
                break;
            a = s.end
        }
        return {
            from: t.clipPos(e.Pos(n, o.startCh + 1)),
            to: a
        }
    }), e.registerHelper("fold", "include", function (t, n) {
        function r(n) {
            if (n < t.firstLine() || n > t.lastLine())
                return null;
            var r = t.getTokenAt(e.Pos(n, 1));
            return /\S/.test(r.string) || (r = t.getTokenAt(e.Pos(n, r.end + 1))), "meta" == r.type && "#include" == r.string.slice(0, 8) ? r.start + 8 : void 0
        }
        var n = n.line,
                i = r(n);
        if (null == i || null != r(n - 1))
            return null;
        for (var o = n; ; ) {
            var a = r(o + 1);
            if (null == a)
                break;
            ++o
        }
        return {
            from: e.Pos(n, i + 1),
            to: t.clipPos(e.Pos(o))
        }
    })
}),
        function (e) {
            e(CodeMirror)
        }(function (e) {
    e.registerGlobalHelper("fold", "comment", function (e) {
        return e.blockCommentStart && e.blockCommentEnd
    }, function (t, n) {
        var r = t.getModeAt(n),
                i = r.blockCommentStart,
                o = r.blockCommentEnd;
        if (i && o) {
            for (var a, s = n.line, l = t.getLine(s), c = n.ch, u = 0; ; ) {
                var f = c <= 0 ? -1 : l.lastIndexOf(i, c - 1);
                if (f != -1) {
                    if (1 == u && f < n.ch)
                        return;
                    if (/comment/.test(t.getTokenTypeAt(e.Pos(s, f + 1))) && (l.slice(f - o.length, f) == o || !/comment/.test(t.getTokenTypeAt(e.Pos(s, f))))) {
                        a = f + i.length;
                        break
                    }
                    c = f - 1
                } else {
                    if (1 == u)
                        return;
                    u = 1, c = l.length
                }
            }
            var d, p, h = 1,
                    m = t.lastLine();
            e: for (var g = s; g <= m; ++g)
                for (var v = t.getLine(g), y = g == s ? a : 0; ; ) {
                    var _ = v.indexOf(i, y),
                            b = v.indexOf(o, y);
                    if (_ < 0 && (_ = v.length), b < 0 && (b = v.length), y = Math.min(_, b), y == v.length)
                        break;
                    if (y == _)
                        ++h;
                    else if (!--h) {
                        d = g, p = y;
                        break e
                    }
                    ++y
                }
            if (null != d && (s != d || p != a))
                return {
                    from: e.Pos(s, a),
                    to: e.Pos(d, p)
                }
        }
    })
}),
        function (e) {
            e(CodeMirror)
        }(function (e) {
    function t(t, i, o, a) {
        function s(e) {
            var n = l(t, i);
            if (!n || n.to.line - n.from.line < c)
                return null;
            for (var r = t.findMarksAt(n.from), o = 0; o < r.length; ++o)
                if (r[o].__isFold && "fold" !== a) {
                    if (!e)
                        return null;
                    n.cleared = !0, r[o].clear()
                }
            return n
        }
        if (o && o.call) {
            var l = o;
            o = null
        } else
            var l = r(t, o, "rangeFinder");
        "number" == typeof i && (i = e.Pos(i, 0));
        var c = r(t, o, "minFoldSize"),
                u = s(!0);
        if (r(t, o, "scanUp"))
            for (; !u && i.line > t.firstLine(); )
                i = e.Pos(i.line - 1, 0), u = s(!1);
        if (u && !u.cleared && "unfold" !== a) {
            var f = n(t, o);
            e.on(f, "mousedown", function (t) {
                d.clear(), e.e_preventDefault(t)
            });
            var d = t.markText(u.from, u.to, {
                replacedWith: f,
                clearOnEnter: !0,
                __isFold: !0
            });
            d.on("clear", function (n, r) {
                e.signal(t, "unfold", t, n, r)
            }), e.signal(t, "fold", t, u.from, u.to)
        }
    }

    function n(e, t) {
        var n = r(e, t, "widget");
        if ("string" == typeof n) {
            var i = document.createTextNode(n);
            n = document.createElement("span"), n.appendChild(i), n.className = "CodeMirror-foldmarker";
        }
        return n
    }

    function r(e, t, n) {
        if (t && void 0 !== t[n])
            return t[n];
        var r = e.options.foldOptions;
        return r && void 0 !== r[n] ? r[n] : i[n]
    }
    e.newFoldFunction = function (e, n) {
        return function (r, i) {
            t(r, i, {
                rangeFinder: e,
                widget: n
            })
        }
    }, e.defineExtension("foldCode", function (e, n, r) {
        t(this, e, n, r)
    }), e.defineExtension("isFolded", function (e) {
        for (var t = this.findMarksAt(e), n = 0; n < t.length; ++n)
            if (t[n].__isFold)
                return !0
    }), e.commands.toggleFold = function (e) {
        e.foldCode(e.getCursor())
    }, e.commands.fold = function (e) {
        e.foldCode(e.getCursor(), null, "fold")
    }, e.commands.unfold = function (e) {
        e.foldCode(e.getCursor(), null, "unfold")
    }, e.commands.foldAll = function (t) {
        t.operation(function () {
            for (var n = t.firstLine(), r = t.lastLine(); n <= r; n++)
                t.foldCode(e.Pos(n, 0), null, "fold")
        })
    }, e.commands.unfoldAll = function (t) {
        t.operation(function () {
            for (var n = t.firstLine(), r = t.lastLine(); n <= r; n++)
                t.foldCode(e.Pos(n, 0), null, "unfold")
        })
    }, e.registerHelper("fold", "combine", function () {
        var e = Array.prototype.slice.call(arguments, 0);
        return function (t, n) {
            for (var r = 0; r < e.length; ++r) {
                var i = e[r](t, n);
                if (i)
                    return i
            }
        }
    }), e.registerHelper("fold", "auto", function (e, t) {
        for (var n = e.getHelpers(t, "fold"), r = 0; r < n.length; r++) {
            var i = n[r](e, t);
            if (i)
                return i
        }
    });
    var i = {
        rangeFinder: e.fold.auto,
        widget: "↔",
        minFoldSize: 0,
        scanUp: !1
    };
    e.defineOption("foldOptions", null), e.defineExtension("foldOption", function (e, t) {
        return r(this, e, t)
    })
}),
        function (e) {
            e(CodeMirror)
        }(function (e) {
    function t(e) {
        this.options = e, this.from = this.to = 0
    }

    function n(e) {
        return e === !0 && (e = {}), null == e.gutter && (e.gutter = "CodeMirror-foldgutter"), null == e.indicatorOpen && (e.indicatorOpen = "CodeMirror-foldgutter-open"), null == e.indicatorFolded && (e.indicatorFolded = "CodeMirror-foldgutter-folded"), e
    }

    function r(e, t) {
        for (var n = e.findMarksAt(f(t)), r = 0; r < n.length; ++r)
            if (n[r].__isFold && n[r].find().from.line == t)
                return n[r]
    }

    function i(e) {
        if ("string" == typeof e) {
            var t = document.createElement("div");
            return t.className = e + " CodeMirror-guttermarker-subtle", t
        }
        return e.cloneNode(!0)
    }

    function o(e, t, n) {
        var o = e.state.foldGutter.options,
                a = t,
                s = e.foldOption(o, "minFoldSize"),
                l = e.foldOption(o, "rangeFinder");
        e.eachLine(t, n, function (t) {
            var n = null;
            if (r(e, a))
                n = i(o.indicatorFolded);
            else {
                var c = f(a, 0),
                        u = l && l(e, c);
                u && u.to.line - u.from.line >= s && (n = i(o.indicatorOpen))
            }
            e.setGutterMarker(t, o.gutter, n), ++a
        })
    }

    function a(e) {
        var t = e.getViewport(),
                n = e.state.foldGutter;
        n && (e.operation(function () {
            o(e, t.from, t.to)
        }), n.from = t.from, n.to = t.to)
    }

    function s(e, t, n) {
        var i = e.state.foldGutter;
        if (i) {
            var o = i.options;
            if (n == o.gutter) {
                var a = r(e, t);
                a ? a.clear() : e.foldCode(f(t, 0), o.rangeFinder)
            }
        }
    }

    function l(e) {
        var t = e.state.foldGutter;
        if (t) {
            var n = t.options;
            t.from = t.to = 0, clearTimeout(t.changeUpdate), t.changeUpdate = setTimeout(function () {
                a(e)
            }, n.foldOnChangeTimeSpan || 600)
        }
    }

    function c(e) {
        var t = e.state.foldGutter;
        if (t) {
            var n = t.options;
            clearTimeout(t.changeUpdate), t.changeUpdate = setTimeout(function () {
                var n = e.getViewport();
                t.from == t.to || n.from - t.to > 20 || t.from - n.to > 20 ? a(e) : e.operation(function () {
                    n.from < t.from && (o(e, n.from, t.from), t.from = n.from), n.to > t.to && (o(e, t.to, n.to), t.to = n.to)
                })
            }, n.updateViewportTimeSpan || 400)
        }
    }

    function u(e, t) {
        var n = e.state.foldGutter;
        if (n) {
            var r = t.line;
            r >= n.from && r < n.to && o(e, r, r + 1)
        }
    }
    e.defineOption("foldGutter", !1, function (r, i, o) {
        o && o != e.Init && (r.clearGutter(r.state.foldGutter.options.gutter), r.state.foldGutter = null, r.off("gutterClick", s), r.off("change", l), r.off("viewportChange", c), r.off("fold", u), r.off("unfold", u), r.off("swapDoc", l)), i && (r.state.foldGutter = new t(n(i)), a(r), r.on("gutterClick", s), r.on("change", l), r.on("viewportChange", c), r.on("fold", u), r.on("unfold", u), r.on("swapDoc", l))
    });
    var f = e.Pos
}),
        function (e) {
            e(CodeMirror)
        }(function (e) {
    e.registerHelper("fold", "indent", function (t, n) {
        var r = t.getOption("tabSize"),
                i = t.getLine(n.line);
        if (/\S/.test(i)) {
            for (var o = function (t) {
                return e.countColumn(t, null, r)
            }, a = o(i), s = null, l = n.line + 1, c = t.lastLine(); l <= c; ++l) {
                var u = t.getLine(l),
                        f = o(u);
                if (f > a)
                    s = l;
                else if (/\S/.test(u))
                    break
            }
            return s ? {
                from: e.Pos(n.line, i.length),
                to: e.Pos(s, t.getLine(s).length)
            } : void 0
        }
    })
}),
        function (e) {
            e(CodeMirror)
        }(function (e) {
    e.registerHelper("fold", "markdown", function (t, n) {
        function r(n) {
            var r = t.getTokenTypeAt(e.Pos(n, 0));
            return r && /\bheader\b/.test(r)
        }

        function i(e, t, n) {
            var i = t && t.match(/^#+/);
            return i && r(e) ? i[0].length : (i = n && n.match(/^[=\-]+\s*$/), i && r(e + 1) ? "=" == n[0] ? 1 : 2 : o)
        }
        var o = 100,
                a = t.getLine(n.line),
                s = t.getLine(n.line + 1),
                l = i(n.line, a, s);
        if (l !== o) {
            for (var c = t.lastLine(), u = n.line, f = t.getLine(u + 2); u < c && !(i(u + 1, s, f) <= l); )
                ++u, s = f, f = t.getLine(u + 2);
            return {
                from: e.Pos(n.line, a.length),
                to: e.Pos(u, t.getLine(u).length)
            }
        }
    })
}),
        function (e) {
            e(CodeMirror)
        }(function (e) {
    function t(e, t) {
        return e.line - t.line || e.ch - t.ch
    }

    function n(e, t, n, r) {
        this.line = t, this.ch = n, this.cm = e, this.text = e.getLine(t), this.min = r ? r.from : e.firstLine(), this.max = r ? r.to - 1 : e.lastLine()
    }

    function r(e, t) {
        var n = e.cm.getTokenTypeAt(d(e.line, t));
        return n && /\btag\b/.test(n)
    }

    function i(e) {
        if (!(e.line >= e.max))
            return e.ch = 0, e.text = e.cm.getLine(++e.line), !0
    }

    function o(e) {
        if (!(e.line <= e.min))
            return e.text = e.cm.getLine(--e.line), e.ch = e.text.length, !0
    }

    function a(e) {
        for (; ; ) {
            var t = e.text.indexOf(">", e.ch);
            if (t == -1) {
                if (i(e))
                    continue;
                return
            }
            {
                if (r(e, t + 1)) {
                    var n = e.text.lastIndexOf("/", t),
                            o = n > -1 && !/\S/.test(e.text.slice(n + 1, t));
                    return e.ch = t + 1, o ? "selfClose" : "regular"
                }
                e.ch = t + 1
            }
        }
    }

    function s(e) {
        for (; ; ) {
            var t = e.ch ? e.text.lastIndexOf("<", e.ch - 1) : -1;
            if (t == -1) {
                if (o(e))
                    continue;
                return
            }
            if (r(e, t + 1)) {
                m.lastIndex = t, e.ch = t;
                var n = m.exec(e.text);
                if (n && n.index == t)
                    return n
            } else
                e.ch = t
        }
    }

    function l(e) {
        for (; ; ) {
            m.lastIndex = e.ch;
            var t = m.exec(e.text);
            if (!t) {
                if (i(e))
                    continue;
                return
            }
            {
                if (r(e, t.index + 1))
                    return e.ch = t.index + t[0].length, t;
                e.ch = t.index + 1
            }
        }
    }

    function c(e) {
        for (; ; ) {
            var t = e.ch ? e.text.lastIndexOf(">", e.ch - 1) : -1;
            if (t == -1) {
                if (o(e))
                    continue;
                return
            }
            {
                if (r(e, t + 1)) {
                    var n = e.text.lastIndexOf("/", t),
                            i = n > -1 && !/\S/.test(e.text.slice(n + 1, t));
                    return e.ch = t + 1, i ? "selfClose" : "regular"
                }
                e.ch = t
            }
        }
    }

    function u(e, t) {
        for (var n = []; ; ) {
            var r, i = l(e),
                    o = e.line,
                    s = e.ch - (i ? i[0].length : 0);
            if (!i || !(r = a(e)))
                return;
            if ("selfClose" != r)
                if (i[1]) {
                    for (var c = n.length - 1; c >= 0; --c)
                        if (n[c] == i[2]) {
                            n.length = c;
                            break
                        }
                    if (c < 0 && (!t || t == i[2]))
                        return {
                            tag: i[2],
                            from: d(o, s),
                            to: d(e.line, e.ch)
                        }
                } else
                    n.push(i[2])
        }
    }

    function f(e, t) {
        for (var n = []; ; ) {
            var r = c(e);
            if (!r)
                return;
            if ("selfClose" != r) {
                var i = e.line,
                        o = e.ch,
                        a = s(e);
                if (!a)
                    return;
                if (a[1])
                    n.push(a[2]);
                else {
                    for (var l = n.length - 1; l >= 0; --l)
                        if (n[l] == a[2]) {
                            n.length = l;
                            break
                        }
                    if (l < 0 && (!t || t == a[2]))
                        return {
                            tag: a[2],
                            from: d(e.line, e.ch),
                            to: d(i, o)
                        }
                }
            } else
                s(e)
        }
    }
    var d = e.Pos,
            p = "A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD",
            h = p + "-:.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040",
            m = new RegExp("<(/?)([" + p + "][" + h + "]*)", "g");
    e.registerHelper("fold", "xml", function (e, t) {
        for (var r = new n(e, t.line, 0); ; ) {
            var i, o = l(r);
            if (!o || r.line != t.line || !(i = a(r)))
                return;
            if (!o[1] && "selfClose" != i) {
                var t = d(r.line, r.ch),
                        s = u(r, o[2]);
                return s && {
                    from: t,
                    to: s.from
                }
            }
        }
    }), e.findMatchingTag = function (e, r, i) {
        var o = new n(e, r.line, r.ch, i);
        if (o.text.indexOf(">") != -1 || o.text.indexOf("<") != -1) {
            var l = a(o),
                    c = l && d(o.line, o.ch),
                    p = l && s(o);
            if (l && p && !(t(o, r) > 0)) {
                var h = {
                    from: d(o.line, o.ch),
                    to: c,
                    tag: p[2]
                };
                return "selfClose" == l ? {
                    open: h,
                    close: null,
                    at: "open"
                } : p[1] ? {
                    open: f(o, p[2]),
                    close: h,
                    at: "close"
                } : (o = new n(e, c.line, c.ch, i), {
                    open: h,
                    close: u(o, p[2]),
                    at: "open"
                })
            }
        }
    }, e.findEnclosingTag = function (e, t, r) {
        for (var i = new n(e, t.line, t.ch, r); ; ) {
            var o = f(i);
            if (!o)
                break;
            var a = new n(e, t.line, t.ch, r),
                    s = u(a, o.tag);
            if (s)
                return {
                    open: o,
                    close: s
                }
        }
    }, e.scanForClosingTag = function (e, t, r, i) {
        var o = new n(e, t.line, t.ch, i ? {
            from: 0,
            to: i
        } : null);
        return u(o, r)
    }
}),
        function (e) {
            e(CodeMirror)
        }(function (e) {
    var t = /[\w$]+/,
            n = 500;
    e.registerHelper("hint", "anyword", function (r, i) {
        for (var o = i && i.word || t, a = i && i.range || n, s = r.getCursor(), l = r.getLine(s.line), c = s.ch, u = c; u && o.test(l.charAt(u - 1)); )
            --u;
        for (var f = u != c && l.slice(u, c), d = i && i.list || [], p = {}, h = new RegExp(o.source, "g"), m = -1; m <= 1; m += 2)
            for (var g = s.line, v = Math.min(Math.max(g + m * a, r.firstLine()), r.lastLine()) + m; g != v; g += m)
                for (var y, _ = r.getLine(g); y = h.exec(_); )
                    g == s.line && y[0] === f || f && 0 != y[0].lastIndexOf(f, 0) || Object.prototype.hasOwnProperty.call(p, y[0]) || (p[y[0]] = !0, d.push(y[0]));
        return {
            list: d,
            from: e.Pos(s.line, u),
            to: e.Pos(s.line, c)
        }
    })
}),
        function (e) {
            e(CodeMirror)
        }(function (e) {
    var t = {
        link: 1,
        visited: 1,
        active: 1,
        hover: 1,
        focus: 1,
        "first-letter": 1,
        "first-line": 1,
        "first-child": 1,
        before: 1,
        after: 1,
        lang: 1
    };
    e.registerHelper("hint", "css", function (n) {
        function r(e) {
            for (var t in e)
                c && 0 != t.lastIndexOf(c, 0) || f.push(t)
        }
        var i = n.getCursor(),
                o = n.getTokenAt(i),
                a = e.innerMode(n.getMode(), o.state);
        if ("css" == a.mode.name) {
            if ("keyword" == o.type && 0 == "!important".indexOf(o.string))
                return {
                    list: ["!important"],
                    from: e.Pos(i.line, o.start),
                    to: e.Pos(i.line, o.end)
                };
            var s = o.start,
                    l = i.ch,
                    c = o.string.slice(0, l - s);
            /[^\w$_-]/.test(c) && (c = "", s = l = i.ch);
            var u = e.resolveMode("text/css"),
                    f = [],
                    d = a.state.state;
            return "pseudo" == d || "variable-3" == o.type ? r(t) : "block" == d || "maybeprop" == d ? r(u.propertyKeywords) : "prop" == d || "parens" == d || "at" == d || "params" == d ? (r(u.valueKeywords), r(u.colorKeywords)) : "media" != d && "media_parens" != d || (r(u.mediaTypes), r(u.mediaFeatures)), f.length ? {
                list: f,
                from: e.Pos(i.line, s),
                to: e.Pos(i.line, l)
            } : void 0
        }
    })
}),
        function (e) {
            e(CodeMirror)
        }(function (e) {
    function t(e) {
        for (var t in f)
            f.hasOwnProperty(t) && (e.attrs[t] = f[t])
    }

    function n(t, n) {
        var r = {
            schemaInfo: u
        };
        if (n)
            for (var i in n)
                r[i] = n[i];
        return e.hint.xml(t, r)
    }
    var r = "ab aa af ak sq am ar an hy as av ae ay az bm ba eu be bn bh bi bs br bg my ca ch ce ny zh cv kw co cr hr cs da dv nl dz en eo et ee fo fj fi fr ff gl ka de el gn gu ht ha he hz hi ho hu ia id ie ga ig ik io is it iu ja jv kl kn kr ks kk km ki rw ky kv kg ko ku kj la lb lg li ln lo lt lu lv gv mk mg ms ml mt mi mr mh mn na nv nb nd ne ng nn no ii nr oc oj cu om or os pa pi fa pl ps pt qu rm rn ro ru sa sc sd se sm sg sr gd sn si sk sl so st es su sw ss sv ta te tg th ti bo tk tl tn to tr ts tt tw ty ug uk ur uz ve vi vo wa cy wo fy xh yi yo za zu".split(" "),
            i = ["_blank", "_self", "_top", "_parent"],
            o = ["ascii", "utf-8", "utf-16", "latin1", "latin1"],
            a = ["get", "post", "put", "delete"],
            s = ["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"],
            l = ["all", "screen", "print", "embossed", "braille", "handheld", "print", "projection", "screen", "tty", "tv", "speech", "3d-glasses", "resolution [>][<][=] [X]", "device-aspect-ratio: X/Y", "orientation:portrait", "orientation:landscape", "device-height: [X]", "device-width: [X]"],
            c = {
                attrs: {}
            },
            u = {
                a: {
                    attrs: {
                        href: null,
                        ping: null,
                        type: null,
                        media: l,
                        target: i,
                        hreflang: r
                    }
                },
                abbr: c,
                acronym: c,
                address: c,
                applet: c,
                area: {
                    attrs: {
                        alt: null,
                        coords: null,
                        href: null,
                        target: null,
                        ping: null,
                        media: l,
                        hreflang: r,
                        type: null,
                        shape: ["default", "rect", "circle", "poly"]
                    }
                },
                article: c,
                aside: c,
                audio: {
                    attrs: {
                        src: null,
                        mediagroup: null,
                        crossorigin: ["anonymous", "use-credentials"],
                        preload: ["none", "metadata", "auto"],
                        autoplay: ["", "autoplay"],
                        loop: ["", "loop"],
                        controls: ["", "controls"]
                    }
                },
                b: c,
                base: {
                    attrs: {
                        href: null,
                        target: i
                    }
                },
                basefont: c,
                bdi: c,
                bdo: c,
                big: c,
                blockquote: {
                    attrs: {
                        cite: null
                    }
                },
                body: c,
                br: c,
                button: {
                    attrs: {
                        form: null,
                        formaction: null,
                        name: null,
                        value: null,
                        autofocus: ["", "autofocus"],
                        disabled: ["", "autofocus"],
                        formenctype: s,
                        formmethod: a,
                        formnovalidate: ["", "novalidate"],
                        formtarget: i,
                        type: ["submit", "reset", "button"]
                    }
                },
                canvas: {
                    attrs: {
                        width: null,
                        height: null
                    }
                },
                caption: c,
                center: c,
                cite: c,
                code: c,
                col: {
                    attrs: {
                        span: null
                    }
                },
                colgroup: {
                    attrs: {
                        span: null
                    }
                },
                command: {
                    attrs: {
                        type: ["command", "checkbox", "radio"],
                        label: null,
                        icon: null,
                        radiogroup: null,
                        command: null,
                        title: null,
                        disabled: ["", "disabled"],
                        checked: ["", "checked"]
                    }
                },
                data: {
                    attrs: {
                        value: null
                    }
                },
                datagrid: {
                    attrs: {
                        disabled: ["", "disabled"],
                        multiple: ["", "multiple"]
                    }
                },
                datalist: {
                    attrs: {
                        data: null
                    }
                },
                dd: c,
                del: {
                    attrs: {
                        cite: null,
                        datetime: null
                    }
                },
                details: {
                    attrs: {
                        open: ["", "open"]
                    }
                },
                dfn: c,
                dir: c,
                div: c,
                dl: c,
                dt: c,
                em: c,
                embed: {
                    attrs: {
                        src: null,
                        type: null,
                        width: null,
                        height: null
                    }
                },
                eventsource: {
                    attrs: {
                        src: null
                    }
                },
                fieldset: {
                    attrs: {
                        disabled: ["", "disabled"],
                        form: null,
                        name: null
                    }
                },
                figcaption: c,
                figure: c,
                font: c,
                footer: c,
                form: {
                    attrs: {
                        action: null,
                        name: null,
                        "accept-charset": o,
                        autocomplete: ["on", "off"],
                        enctype: s,
                        method: a,
                        novalidate: ["", "novalidate"],
                        target: i
                    }
                },
                frame: c,
                frameset: c,
                h1: c,
                h2: c,
                h3: c,
                h4: c,
                h5: c,
                h6: c,
                head: {
                    attrs: {},
                    children: ["title", "base", "link", "style", "meta", "script", "noscript", "command"]
                },
                header: c,
                hgroup: c,
                hr: c,
                html: {
                    attrs: {
                        manifest: null
                    },
                    children: ["head", "body"]
                },
                i: c,
                iframe: {
                    attrs: {
                        src: null,
                        srcdoc: null,
                        name: null,
                        width: null,
                        height: null,
                        sandbox: ["allow-top-navigation", "allow-same-origin", "allow-forms", "allow-scripts"],
                        seamless: ["", "seamless"]
                    }
                },
                img: {
                    attrs: {
                        alt: null,
                        src: null,
                        ismap: null,
                        usemap: null,
                        width: null,
                        height: null,
                        crossorigin: ["anonymous", "use-credentials"]
                    }
                },
                input: {
                    attrs: {
                        alt: null,
                        dirname: null,
                        form: null,
                        formaction: null,
                        height: null,
                        list: null,
                        max: null,
                        maxlength: null,
                        min: null,
                        name: null,
                        pattern: null,
                        placeholder: null,
                        size: null,
                        src: null,
                        step: null,
                        value: null,
                        width: null,
                        accept: ["audio/*", "video/*", "image/*"],
                        autocomplete: ["on", "off"],
                        autofocus: ["", "autofocus"],
                        checked: ["", "checked"],
                        disabled: ["", "disabled"],
                        formenctype: s,
                        formmethod: a,
                        formnovalidate: ["", "novalidate"],
                        formtarget: i,
                        multiple: ["", "multiple"],
                        readonly: ["", "readonly"],
                        required: ["", "required"],
                        type: ["hidden", "text", "search", "tel", "url", "email", "password", "datetime", "date", "month", "week", "time", "datetime-local", "number", "range", "color", "checkbox", "radio", "file", "submit", "image", "reset", "button"]
                    }
                },
                ins: {
                    attrs: {
                        cite: null,
                        datetime: null
                    }
                },
                kbd: c,
                keygen: {
                    attrs: {
                        challenge: null,
                        form: null,
                        name: null,
                        autofocus: ["", "autofocus"],
                        disabled: ["", "disabled"],
                        keytype: ["RSA"]
                    }
                },
                label: {
                    attrs: {
                        for : null,
                        form: null
                    }
                },
                legend: c,
                li: {
                    attrs: {
                        value: null
                    }
                },
                link: {
                    attrs: {
                        href: null,
                        type: null,
                        hreflang: r,
                        media: l,
                        sizes: ["all", "16x16", "16x16 32x32", "16x16 32x32 64x64"]
                    }
                },
                map: {
                    attrs: {
                        name: null
                    }
                },
                mark: c,
                menu: {
                    attrs: {
                        label: null,
                        type: ["list", "context", "toolbar"]
                    }
                },
                meta: {
                    attrs: {
                        content: null,
                        charset: o,
                        name: ["viewport", "application-name", "author", "description", "generator", "keywords"],
                        "http-equiv": ["content-language", "content-type", "default-style", "refresh"]
                    }
                },
                meter: {
                    attrs: {
                        value: null,
                        min: null,
                        low: null,
                        high: null,
                        max: null,
                        optimum: null
                    }
                },
                nav: c,
                noframes: c,
                noscript: c,
                object: {
                    attrs: {
                        data: null,
                        type: null,
                        name: null,
                        usemap: null,
                        form: null,
                        width: null,
                        height: null,
                        typemustmatch: ["", "typemustmatch"]
                    }
                },
                ol: {
                    attrs: {
                        reversed: ["", "reversed"],
                        start: null,
                        type: ["1", "a", "A", "i", "I"]
                    }
                },
                optgroup: {
                    attrs: {
                        disabled: ["", "disabled"],
                        label: null
                    }
                },
                option: {
                    attrs: {
                        disabled: ["", "disabled"],
                        label: null,
                        selected: ["", "selected"],
                        value: null
                    }
                },
                output: {
                    attrs: {
                        for : null,
                        form: null,
                        name: null
                    }
                },
                p: c,
                param: {
                    attrs: {
                        name: null,
                        value: null
                    }
                },
                pre: c,
                progress: {
                    attrs: {
                        value: null,
                        max: null
                    }
                },
                q: {
                    attrs: {
                        cite: null
                    }
                },
                rp: c,
                rt: c,
                ruby: c,
                s: c,
                samp: c,
                script: {
                    attrs: {
                        type: ["text/javascript"],
                        src: null,
                        async: ["", "async"],
                        defer: ["", "defer"],
                        charset: o
                    }
                },
                section: c,
                select: {
                    attrs: {
                        form: null,
                        name: null,
                        size: null,
                        autofocus: ["", "autofocus"],
                        disabled: ["", "disabled"],
                        multiple: ["", "multiple"]
                    }
                },
                small: c,
                source: {
                    attrs: {
                        src: null,
                        type: null,
                        media: null
                    }
                },
                span: c,
                strike: c,
                strong: c,
                style: {
                    attrs: {
                        type: ["text/css"],
                        media: l,
                        scoped: null
                    }
                },
                sub: c,
                summary: c,
                sup: c,
                table: c,
                tbody: c,
                td: {
                    attrs: {
                        colspan: null,
                        rowspan: null,
                        headers: null
                    }
                },
                textarea: {
                    attrs: {
                        dirname: null,
                        form: null,
                        maxlength: null,
                        name: null,
                        placeholder: null,
                        rows: null,
                        cols: null,
                        autofocus: ["", "autofocus"],
                        disabled: ["", "disabled"],
                        readonly: ["", "readonly"],
                        required: ["", "required"],
                        wrap: ["soft", "hard"]
                    }
                },
                tfoot: c,
                th: {
                    attrs: {
                        colspan: null,
                        rowspan: null,
                        headers: null,
                        scope: ["row", "col", "rowgroup", "colgroup"]
                    }
                },
                thead: c,
                time: {
                    attrs: {
                        datetime: null
                    }
                },
                title: c,
                tr: c,
                track: {
                    attrs: {
                        src: null,
                        label: null,
                        default: null,
                        kind: ["subtitles", "captions", "descriptions", "chapters", "metadata"],
                        srclang: r
                    }
                },
                tt: c,
                u: c,
                ul: c,
                var : c,
                video: {
                    attrs: {
                        src: null,
                        poster: null,
                        width: null,
                        height: null,
                        crossorigin: ["anonymous", "use-credentials"],
                        preload: ["auto", "metadata", "none"],
                        autoplay: ["", "autoplay"],
                        mediagroup: ["movie"],
                        muted: ["", "muted"],
                        controls: ["", "controls"]
                    }
                },
                wbr: c
            },
            f = {
                accesskey: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
                class: null,
                contenteditable: ["true", "false"],
                contextmenu: null,
                dir: ["ltr", "rtl", "auto"],
                draggable: ["true", "false", "auto"],
                dropzone: ["copy", "move", "link", "string:", "file:"],
                hidden: ["hidden"],
                id: null,
                inert: ["inert"],
                itemid: null,
                itemprop: null,
                itemref: null,
                itemscope: ["itemscope"],
                itemtype: null,
                lang: ["en", "es"],
                spellcheck: ["true", "false"],
                style: null,
                tabindex: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
                title: null,
                translate: ["yes", "no"],
                onclick: null,
                rel: ["stylesheet", "alternate", "author", "bookmark", "help", "license", "next", "nofollow", "noreferrer", "prefetch", "prev", "search", "tag"]
            };
    t(c);
    for (var d in u)
        u.hasOwnProperty(d) && u[d] != c && t(u[d]);
    e.htmlSchema = u, e.registerHelper("hint", "html", n)
}),
        function (e) {
            e(CodeMirror)
        }(function (e) {
    function t(e, t) {
        for (var n = 0, r = e.length; n < r; ++n)
            t(e[n])
    }

    function n(e, t) {
        if (!Array.prototype.indexOf) {
            for (var n = e.length; n--; )
                if (e[n] === t)
                    return !0;
            return !1
        }
        return e.indexOf(t) != -1
    }

    function r(t, n, r, i) {
        var o = t.getCursor(),
                a = r(t, o);
        if (!/\b(?:string|comment)\b/.test(a.type)) {
            a.state = e.innerMode(t.getMode(), a.state).state, /^[\w$_]*$/.test(a.string) ? a.end > o.ch && (a.end = o.ch, a.string = a.string.slice(0, o.ch - a.start)) : a = {
                start: o.ch,
                end: o.ch,
                string: "",
                state: a.state,
                type: "." == a.string ? "property" : null
            };
            for (var c = a;
                    "property" == c.type; ) {
                if (c = r(t, l(o.line, c.start)), "." != c.string)
                    return;
                if (c = r(t, l(o.line, c.start)), !u)
                    var u = [];
                u.push(c)
            }
            return {
                list: s(a, u, n, i),
                from: l(o.line, a.start),
                to: l(o.line, a.end)
            }
        }
    }

    function i(e, t) {
        return r(e, d, function (e, t) {
            return e.getTokenAt(t)
        }, t)
    }

    function o(e, t) {
        var n = e.getTokenAt(t);
        return t.ch == n.start + 1 && "." == n.string.charAt(0) ? (n.end = n.start, n.string = ".", n.type = "property") : /^\.[\w$_]*$/.test(n.string) && (n.type = "property", n.start++, n.string = n.string.replace(/\./, "")), n
    }

    function a(e, t) {
        return r(e, p, o, t)
    }

    function s(e, r, i, o) {
        function a(e) {
            e === d || 0 != e.toLowerCase().lastIndexOf(d.toLowerCase(), 0) || n(l, e) || l.push(e)
        }

        function s(e) {
            "string" == typeof e ? t(c, a) : e instanceof Array ? t(u, a) : e instanceof Function && t(f, a);
            for (var n in e)
                a(n)
        }
        var l = [],
                d = e.string,
                p = o && o.globalScope || window;
        if (r && r.length) {
            var h, m = r.pop();
            for (m.type && 0 === m.type.indexOf("variable") ? (o && o.additionalContext && (h = o.additionalContext[m.string]), o && o.useGlobalScope === !1 || (h = h || p[m.string])) : "string" == m.type ? h = "" : "atom" == m.type ? h = 1 : "function" == m.type && (null == p.jQuery || "$" != m.string && "jQuery" != m.string || "function" != typeof p.jQuery ? null != p._ && "_" == m.string && "function" == typeof p._ && (h = p._()) : h = p.jQuery()); null != h && r.length; )
                h = h[r.pop().string];
            null != h && s(h)
        } else {
            for (var g = e.state.localVars; g; g = g.next)
                a(g.name);
            for (var g = e.state.globalVars; g; g = g.next)
                a(g.name);
            o && o.useGlobalScope === !1 || s(p), t(i, a)
        }
        return l
    }
    var l = e.Pos;
    e.registerHelper("hint", "javascript", i), e.registerHelper("hint", "coffeescript", a);
    var c = "charAt charCodeAt indexOf lastIndexOf substring substr slice trim trimLeft trimRight toUpperCase toLowerCase split concat match replace search".split(" "),
            u = "length concat join splice push pop shift unshift slice reverse sort indexOf lastIndexOf every some filter forEach map reduce reduceRight ".split(" "),
            f = "prototype apply call bind".split(" "),
            d = "break case catch continue debugger default delete do else false finally for function if in instanceof new null return switch throw true try typeof var void while with".split(" "),
            p = "and break catch class continue delete do else extends false finally for if in instanceof isnt new no not null of off on or return switch then throw true try typeof until void while with yes".split(" ")
});
var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
    return typeof e
} : function (e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e
};
!function (e) {
    "object" == ("undefined" == typeof exports ? "undefined" : _typeof(exports)) && "object" == ("undefined" == typeof module ? "undefined" : _typeof(module)) ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
}(function (e) {
    function t(e, t) {
        this.cm = e, this.options = t, this.widget = null, this.debounce = 0, this.tick = 0, this.startPos = this.cm.getCursor("start"), this.startLen = this.cm.getLine(this.startPos.line).length - this.cm.getSelection().length;
        var n = this;
        e.on("cursorActivity", this.activityFunc = function () {
            n.cursorActivity()
        })
    }

    function n(t, n) {
        var r = e.cmpPos(n.from, t.from);
        return r > 0 && t.to.ch - t.from.ch != n.to.ch - n.from.ch
    }

    function r(e, t, n) {
        var r = e.options.hintOptions,
                i = {};
        for (var o in m)
            i[o] = m[o];
        if (r)
            for (var o in r)
                void 0 !== r[o] && (i[o] = r[o]);
        if (n)
            for (var o in n)
                void 0 !== n[o] && (i[o] = n[o]);
        return i.hint.resolve && (i.hint = i.hint.resolve(e, t)), i
    }

    function i(e) {
        return "string" == typeof e ? e : e.text
    }

    function o(e, t) {
        function n(e, n) {
            var i;
            i = "string" != typeof n ? function (e) {
                return n(e, t)
            } : r.hasOwnProperty(n) ? r[n] : n, o[e] = i
        }
        var r = {
            Up: function () {
                t.moveFocus(-1)
            },
            Down: function () {
                t.moveFocus(1)
            },
            PageUp: function () {
                t.moveFocus(-t.menuSize() + 1, !0)
            },
            PageDown: function () {
                t.moveFocus(t.menuSize() - 1, !0)
            },
            Home: function () {
                t.setFocus(0)
            },
            End: function () {
                t.setFocus(t.length - 1)
            },
            Enter: t.pick,
            Tab: t.pick,
            Esc: t.close
        },
                i = e.options.customKeys,
                o = i ? {} : r;
        if (i)
            for (var a in i)
                i.hasOwnProperty(a) && n(a, i[a]);
        var s = e.options.extraKeys;
        if (s)
            for (var a in s)
                s.hasOwnProperty(a) && n(a, s[a]);
        return o
    }

    function a(e, t) {
        for (; t && t != e; ) {
            if ("LI" === t.nodeName.toUpperCase() && t.parentNode == e)
                return t;
            t = t.parentNode
        }
    }

    function s(t, n) {
        this.completion = t, this.data = n, this.picked = !1;
        var r = this,
                s = t.cm,
                l = this.hints = document.createElement("ul");
        l.className = "CodeMirror-hints", this.selectedHint = n.selectedHint || 0;
        for (var c = n.list, u = 0, p = 0; p < c.length; ++p) {
            var h = l.appendChild(document.createElement("li")),
                    m = c[p],
                    g = f + (p != this.selectedHint ? "" : " " + d);
            if (null != m.className && (g = m.className + " " + g), h.className = g, m.render)
                m.render(h, n, m);
            else {
                var v = m.displayText || i(m);
                u = Math.max(u, v.length), h.appendChild(document.createTextNode(v))
            }
            h.hintId = p
        }
        l.style.minWidth = u + "em";
        var y = s.cursorCoords(t.options.alignWithWord ? n.from : null),
                _ = y.left,
                b = y.bottom,
                w = !0;
        l.style.left = _ + "px", l.style.top = b + "px";
        var k = window.innerWidth || Math.max(document.body.offsetWidth, document.documentElement.offsetWidth),
                x = window.innerHeight || Math.max(document.body.offsetHeight, document.documentElement.offsetHeight);
        (t.options.container || document.body).appendChild(l);
        var C = l.getBoundingClientRect(),
                S = C.bottom - x,
                L = l.scrollHeight > l.clientHeight + 1,
                M = s.getScrollInfo();
        if (S > 0) {
            var T = C.bottom - C.top,
                    A = y.top - (y.bottom - C.top);
            if (A - T > 0)
                l.style.top = (b = y.top - T) + "px", w = !1;
            else if (T > x) {
                l.style.height = x - 5 + "px", l.style.top = (b = y.bottom - C.top) + "px";
                var E = s.getCursor();
                n.from.ch != E.ch && (y = s.cursorCoords(E), l.style.left = (_ = y.left) + "px", C = l.getBoundingClientRect())
            }
        }
        var O = C.right - k;
        if (O > 0 && (C.right - C.left > k && (l.style.width = k - 5 + "px", O -= C.right - C.left - k), l.style.left = (_ = y.left - O) + "px"), L)
            for (var I = l.firstChild; I; I = I.nextSibling)
                I.style.paddingRight = s.display.nativeBarWidth + "px";
        if (s.addKeyMap(this.keyMap = o(t, {
            moveFocus: function (e, t) {
                r.changeActive(r.selectedHint + e, t)
            },
            setFocus: function (e) {
                r.changeActive(e)
            },
            menuSize: function () {
                return r.screenAmount()
            },
            length: c.length,
            close: function () {
                t.close()
            },
            pick: function () {
                r.pick()
            },
            data: n
        })), t.options.closeOnUnfocus) {
            var R;
            s.on("blur", this.onBlur = function () {
                R = setTimeout(function () {
                    t.close()
                }, 100)
            }), s.on("focus", this.onFocus = function () {
                clearTimeout(R)
            })
        }
        return s.on("scroll", this.onScroll = function () {
            var e = s.getScrollInfo(),
                    n = s.getWrapperElement().getBoundingClientRect(),
                    r = b + M.top - e.top,
                    i = r - (window.pageYOffset || (document.documentElement || document.body).scrollTop);
            return w || (i += l.offsetHeight), i <= n.top || i >= n.bottom ? t.close() : (l.style.top = r + "px", void(l.style.left = _ + M.left - e.left + "px"))
        }), e.on(l, "dblclick", function (e) {
            var t = a(l, e.target || e.srcElement);
            t && null != t.hintId && (r.changeActive(t.hintId), r.pick())
        }), e.on(l, "click", function (e) {
            var n = a(l, e.target || e.srcElement);
            n && null != n.hintId && (r.changeActive(n.hintId), t.options.completeOnSingleClick && r.pick())
        }), e.on(l, "mousedown", function () {
            setTimeout(function () {
                s.focus()
            }, 20)
        }), e.signal(n, "select", c[0], l.firstChild), !0
    }

    function l(e, t) {
        if (!e.somethingSelected())
            return t;
        for (var n = [], r = 0; r < t.length; r++)
            t[r].supportsSelection && n.push(t[r]);
        return n
    }

    function c(e, t, n, r) {
        if (e.async)
            e(t, r, n);
        else {
            var i = e(t, n);
            i && i.then ? i.then(r) : r(i)
        }
    }

    function u(t, n) {
        function r(e, t, n) {
            n = !!n;
            var r = [],
                    i = [];
            return t.forEach(function (t) {
                r.indexOf(t) === -1 && i.indexOf(t) === -1 && (t.startsWith(e) ? i.push(t) : r.push(t))
            }), n && (i.sort(), r.sort()), [].concat(i, r).filter(function (e) {
                return e.length > 2
            })
        }
        var i, o = t.getHelpers(n, "hint"),
                a = [],
                s = t.getCursor(),
                u = [null, "string", "string-2", "number", "comment", "operator"],
                f = t.doc.lineCount(),
                d = t.getTokenAt(s),
                p = d.string,
                h = s.line,
                m = /^[\w\$@\^%]+$/i,
                g = /[^\w\$@\^%]+/i;
        if ("string" === d.type)
            return function () {};
        for (var v = 0; v < f; v++)
            t.getLineTokens(v, !0).forEach(function (e) {
                var t = e.string;
                if (v !== h || d.start !== e.start || d.end !== e.end || p !== t) {
                    var n = t.toLowerCase().startsWith(p.toLowerCase()),
                            r = m.test(p) && n || g.test(p),
                            i = r && u.indexOf(e.type) === -1;
                    t.length > 2 && m.test(t) && i && a.indexOf(t) === -1 && a.push(t)
                }
            });
        if (o.length) {
            var y = function (e, t, n) {
                function i(o) {
                    return o == s.length ? t(null) : void c(s[o], e, n, function (e) {
                        e && e.list instanceof Array ? (e.list = r(p, e.list.concat(a), !0), t(e)) : i(o + 1)
                    })
                }
                var s = l(e, o);
                i(0)
            };
            return y.async = !0, y.supportsSelection = !0, y
        }
        i = t.getHelper(t.getCursor(), "hintWords") || [];
        var _ = t.getHelper(t.getCursor(), "fromList") || e.hint.fromList;
        return function (e) {
            return _(e, {
                words: r(p, i.concat(a), !0)
            })
        }
    }
    var f = "CodeMirror-hint",
            d = "CodeMirror-hint-active";
    e.showHint = function (e, t, n) {
        if (!t)
            return e.showHint(n);
        n && n.async && (t.async = !0);
        var r = {
            hint: t
        };
        if (n)
            for (var i in n)
                r[i] = n[i];
        return e.showHint(r)
    }, e.defineExtension("showHint", function (n) {
        n = r(this, this.getCursor("start"), n);
        var i = this.listSelections();
        if (!(i.length > 1)) {
            if (this.somethingSelected()) {
                if (!n.hint.supportsSelection)
                    return;
                for (var o = 0; o < i.length; o++)
                    if (i[o].head.line != i[o].anchor.line)
                        return
            }
            this.state.completionActive && this.state.completionActive.close();
            var a = this.state.completionActive = new t(this, n);
            a.options.hint && (e.signal(this, "startCompletion", this), a.update(!0))
        }
    });
    var p = window.requestAnimationFrame || function (e) {
        return setTimeout(e, 1e3 / 60)
    },
            h = window.cancelAnimationFrame || clearTimeout;
    t.prototype = {
        close: function () {
            this.active() && (this.cm.state.completionActive = null, this.tick = null, this.cm.off("cursorActivity", this.activityFunc), this.widget && this.data && e.signal(this.data, "close"), this.widget && this.widget.close(), e.signal(this.cm, "endCompletion", this.cm))
        },
        active: function () {
            return this.cm.state.completionActive == this
        },
        pick: function (t, n) {
            var r = t.list[n];
            r.hint ? r.hint(this.cm, t, r) : this.cm.replaceRange(i(r), r.from || t.from, r.to || t.to, "complete"), e.signal(t, "pick", r), this.close()
        },
        cursorActivity: function () {
            this.debounce && (h(this.debounce), this.debounce = 0);
            var e = this.cm.getCursor(),
                    t = this.cm.getLine(e.line);
            if (e.line != this.startPos.line || t.length - e.ch != this.startLen - this.startPos.ch || e.ch < this.startPos.ch || this.cm.somethingSelected() || e.ch && this.options.closeCharacters.test(t.charAt(e.ch - 1)))
                this.close();
            else {
                var n = this;
                this.debounce = p(function () {
                    n.update()
                }), this.widget && this.widget.disable()
            }
        },
        update: function (e) {
            if (null != this.tick) {
                var t = this,
                        n = ++this.tick;
                c(this.options.hint, this.cm, this.options, function (r) {
                    t.tick == n && t.finishUpdate(r, e)
                })
            }
        },
        finishUpdate: function (t, r) {
            this.data && e.signal(this.data, "update");
            var i = this.widget && this.widget.picked || r && this.options.completeSingle;
            this.widget && this.widget.close(), t && this.data && n(this.data, t) || (this.data = t, t && t.list.length && (i && 1 == t.list.length ? this.pick(t, 0) : (this.widget = new s(this, t), e.signal(t, "shown"))))
        }
    }, s.prototype = {
        close: function () {
            if (this.completion.widget == this) {
                this.completion.widget = null, this.hints.parentNode.removeChild(this.hints), this.completion.cm.removeKeyMap(this.keyMap);
                var e = this.completion.cm;
                this.completion.options.closeOnUnfocus && (e.off("blur", this.onBlur), e.off("focus", this.onFocus)), e.off("scroll", this.onScroll)
            }
        },
        disable: function () {
            this.completion.cm.removeKeyMap(this.keyMap);
            var e = this;
            this.keyMap = {
                Enter: function () {
                    e.picked = !0
                }
            }, this.completion.cm.addKeyMap(this.keyMap)
        },
        pick: function () {
            this.completion.pick(this.data, this.selectedHint)
        },
        changeActive: function (t, n) {
            if (t >= this.data.list.length ? t = n ? this.data.list.length - 1 : 0 : t < 0 && (t = n ? 0 : this.data.list.length - 1), this.selectedHint != t) {
                var r = this.hints.childNodes[this.selectedHint];
                r.className = r.className.replace(" " + d, ""), r = this.hints.childNodes[this.selectedHint = t], r.className += " " + d, r.offsetTop < this.hints.scrollTop ? this.hints.scrollTop = r.offsetTop - 3 : r.offsetTop + r.offsetHeight > this.hints.scrollTop + this.hints.clientHeight && (this.hints.scrollTop = r.offsetTop + r.offsetHeight - this.hints.clientHeight + 3), e.signal(this.data, "select", this.data.list[this.selectedHint], r)
            }
        },
        screenAmount: function () {
            return Math.floor(this.hints.clientHeight / this.hints.firstChild.offsetHeight) || 1
        }
    }, e.registerHelper("hint", "auto", {
        resolve: u
    }), e.registerHelper("hint", "fromList", function (t, n) {
        var r = t.getCursor(),
                i = t.getTokenAt(r),
                o = e.Pos(r.line, i.end);
        if (i.string && /[\w\$@\^%:]/.test(i.string[i.string.length - 1]))
            var a = i.string.toLowerCase(),
                    s = e.Pos(r.line, i.start);
        else
            var a = "",
                    s = o;
        for (var l = [], c = 0; c < n.words.length; c++) {
            var u = n.words[c];
            u.slice(0, a.length).toLowerCase() == a && l.push(u)
        }
        if (l.length)
            return {
                list: l,
                from: s,
                to: o
            }
    }), e.commands.autocomplete = e.showHint;
    var m = {
        hint: e.hint.auto,
        completeSingle: !0,
        alignWithWord: !0,
        closeCharacters: /[\s()\[\]{};:>,]/,
        closeOnUnfocus: !0,
        completeOnSingleClick: !0,
        container: null,
        customKeys: null,
        extraKeys: null
    };
    e.defineOption("hintOptions", null)
}),
        function (e) {
            e(CodeMirror)
        }(function (e) {
    function t(e) {
        return "[object Array]" == Object.prototype.toString.call(e)
    }

    function n(t) {
        var n = t.doc.modeOption;
        return "sql" === n && (n = "text/x-sql"), e.resolveMode(n).keywords
    }

    function r(e) {
        return "string" == typeof e ? e : e.text
    }

    function i(e, n) {
        return t(n) && (n = {
            columns: n
        }), n.text || (n.text = e), n
    }

    function o(e) {
        var n = {};
        if (t(e))
            for (var o = e.length - 1; o >= 0; o--) {
                var a = e[o];
                n[r(a).toUpperCase()] = i(r(a), a)
            }
        else if (e)
            for (var s in e)
                n[s.toUpperCase()] = i(s, e[s]);
        return n
    }

    function a(e) {
        return v[e.toUpperCase()]
    }

    function s(e) {
        var t = {};
        for (var n in e)
            e.hasOwnProperty(n) && (t[n] = e[n]);
        return t
    }

    function l(e, t) {
        var n = e.length,
                i = r(t).substr(0, n);
        return e.toUpperCase() === i.toUpperCase()
    }

    function c(e, n, r, i) {
        if (t(r))
            for (var o = 0; o < r.length; o++)
                l(n, r[o]) && e.push(i(r[o]));
        else
            for (var a in r)
                if (r.hasOwnProperty(a)) {
                    var s = r[a];
                    s = s && s !== !0 ? s.displayText ? {
                        text: s.text,
                        displayText: s.displayText
                    } : s.text : a, l(n, s) && e.push(i(s))
                }
    }

    function u(e) {
        return "." == e.charAt(0) && (e = e.substr(1)), e.replace(/`/g, "")
    }

    function f(e) {
        for (var t = r(e).split("."), n = 0; n < t.length; n++)
            t[n] = "`" + t[n] + "`";
        var i = t.join(".");
        return "string" == typeof e ? i : (e = s(e), e.text = i, e)
    }

    function d(e, t, n, r) {
        for (var i = !1, o = [], l = t.start, d = !0; d; )
            d = "." == t.string.charAt(0), i = i || "`" == t.string.charAt(0), l = t.start, o.unshift(u(t.string)), t = r.getTokenAt(w(e.line, t.start)), "." == t.string && (d = !0, t = r.getTokenAt(w(e.line, t.start)));
        var p = o.join(".");
        c(n, p, v, function (e) {
            return i ? f(e) : e
        }), c(n, p, y, function (e) {
            return i ? f(e) : e
        }), p = o.pop();
        var h = o.join("."),
                m = !1,
                _ = h;
        if (!a(h)) {
            var b = h;
            h = g(h, r), h !== b && (m = !0)
        }
        var k = a(h);
        return k && k.columns && (k = k.columns), k && c(n, p, k, function (e) {
            var t = h;
            return 1 == m && (t = _), "string" == typeof e ? e = t + "." + e : (e = s(e), e.text = t + "." + e.text), i ? f(e) : e
        }), l
    }

    function p(e, t) {
        if (e)
            for (var n = /[,;]/g, r = e.split(" "), i = 0; i < r.length; i++)
                t(r[i] ? r[i].replace(n, "") : "")
    }

    function h(e) {
        return e.line + e.ch / Math.pow(10, 6)
    }

    function m(e) {
        return w(Math.floor(e), +e.toString().split(".").pop())
    }

    function g(e, t) {
        for (var n = t.doc, r = n.getValue(), i = e.toUpperCase(), o = "", s = "", l = [], c = {
            start: w(0, 0),
            end: w(t.lastLine(), t.getLineHandle(t.lastLine()).length)
        }, u = r.indexOf(b.QUERY_DIV); u != - 1; )
            l.push(n.posFromIndex(u)), u = r.indexOf(b.QUERY_DIV, u + 1);
        l.unshift(w(0, 0)), l.push(w(t.lastLine(), t.getLineHandle(t.lastLine()).text.length));
        for (var f = 0, d = h(t.getCursor()), g = 0; g < l.length; g++) {
            var v = h(l[g]);
            if (d > f && d <= v) {
                c = {
                    start: m(f),
                    end: m(v)
                };
                break
            }
            f = v
        }
        for (var y = n.getRange(c.start, c.end, !1), g = 0; g < y.length; g++) {
            var _ = y[g];
            if (p(_, function (e) {
                var t = e.toUpperCase();
                t === i && a(o) && (s = o), t !== b.ALIAS_KEYWORD && (o = e)
            }), s)
                break
        }
        return s
    }
    var v, y, _, b = {
        QUERY_DIV: ";",
        ALIAS_KEYWORD: "AS"
    },
            w = e.Pos;
    e.registerHelper("hint", "sql", function (e, t) {
        v = o(t && t.tables);
        var r = t && t.defaultTable,
                i = t && t.disableKeywords;
        y = r && a(r), _ = _ || n(e), r && !y && (y = g(r, e)), y = y || [], y.columns && (y = y.columns);
        var s, l, u, f = e.getCursor(),
                p = [],
                h = e.getTokenAt(f);
        return h.end > f.ch && (h.end = f.ch, h.string = h.string.slice(0, f.ch - h.start)), h.string.match(/^[.`\w@]\w*$/) ? (u = h.string, s = h.start, l = h.end) : (s = l = f.ch, u = ""), "." == u.charAt(0) || "`" == u.charAt(0) ? s = d(f, h, p, e) : (c(p, u, v, function (e) {
            return e
        }), c(p, u, y, function (e) {
            return e
        }), i || c(p, u, _, function (e) {
            return e.toUpperCase()
        })), {
            list: p,
            from: w(f.line, s),
            to: w(f.line, l)
        }
    })
}),
        function (e) {
            e(CodeMirror)
        }(function (e) {
    function t(t, r) {
        var i = r && r.schemaInfo,
                o = r && r.quoteChar || '"';
        if (i) {
            var a = t.getCursor(),
                    s = t.getTokenAt(a);
            s.end > a.ch && (s.end = a.ch, s.string = s.string.slice(0, a.ch - s.start));
            var l = e.innerMode(t.getMode(), s.state);
            if ("xml" == l.mode.name) {
                var c, u, f = [],
                        d = !1,
                        p = /\btag\b/.test(s.type) && !/>$/.test(s.string),
                        h = p && /^\w/.test(s.string);
                if (h) {
                    var m = t.getLine(a.line).slice(Math.max(0, s.start - 2), s.start),
                            g = /<\/$/.test(m) ? "close" : /<$/.test(m) ? "open" : null;
                    g && (u = s.start - ("close" == g ? 2 : 1))
                } else
                    p && "<" == s.string ? g = "open" : p && "</" == s.string && (g = "close");
                if (!p && !l.state.tagName || g) {
                    h && (c = s.string), d = g;
                    var v = l.state.context,
                            y = v && i[v.tagName],
                            _ = v ? y && y.children : i["!top"];
                    if (_ && "close" != g)
                        for (var b = 0; b < _.length; ++b)
                            c && 0 != _[b].lastIndexOf(c, 0) || f.push("<" + _[b]);
                    else if ("close" != g)
                        for (var w in i)
                            !i.hasOwnProperty(w) || "!top" == w || "!attrs" == w || c && 0 != w.lastIndexOf(c, 0) || f.push("<" + w);
                    v && (!c || "close" == g && 0 == v.tagName.lastIndexOf(c, 0)) && f.push("</" + v.tagName + ">")
                } else {
                    var y = i[l.state.tagName],
                            k = y && y.attrs,
                            x = i["!attrs"];
                    if (!k && !x)
                        return;
                    if (k) {
                        if (x) {
                            var C = {};
                            for (var S in x)
                                x.hasOwnProperty(S) && (C[S] = x[S]);
                            for (var S in k)
                                k.hasOwnProperty(S) && (C[S] = k[S]);
                            k = C
                        }
                    } else
                        k = x;
                    if ("string" == s.type || "=" == s.string) {
                        var L, m = t.getRange(n(a.line, Math.max(0, a.ch - 60)), n(a.line, "string" == s.type ? s.start : s.end)),
                                M = m.match(/([^\s\u00a0=<>\"\']+)=$/);
                        if (!M || !k.hasOwnProperty(M[1]) || !(L = k[M[1]]))
                            return;
                        if ("function" == typeof L && (L = L.call(this, t)), "string" == s.type) {
                            c = s.string;
                            var T = 0;
                            /['"]/.test(s.string.charAt(0)) && (o = s.string.charAt(0), c = s.string.slice(1), T++);
                            var A = s.string.length;
                            /['"]/.test(s.string.charAt(A - 1)) && (o = s.string.charAt(A - 1), c = s.string.substr(T, A - 2)), d = !0
                        }
                        for (var b = 0; b < L.length; ++b)
                            c && 0 != L[b].lastIndexOf(c, 0) || f.push(o + L[b] + o)
                    } else {
                        "attribute" == s.type && (c = s.string, d = !0);
                        for (var E in k)
                            !k.hasOwnProperty(E) || c && 0 != E.lastIndexOf(c, 0) || f.push(E)
                    }
                }
                return {
                    list: f,
                    from: d ? n(a.line, null == u ? s.start : u) : a,
                    to: d ? n(a.line, s.end) : a
                }
            }
        }
    }
    var n = e.Pos;
    e.registerHelper("hint", "xml", t)
}),
        function (e) {
            e(CodeMirror)
        }(function (e) {
    e.registerHelper("lint", "coffeescript", function (t) {
        var n = [],
                r = function (t) {
                    var r = t.lineNumber;
                    n.push({
                        from: e.Pos(r - 1, 0),
                        to: e.Pos(r, 0),
                        severity: t.level,
                        message: t.message
                    })
                };
        try {
            for (var i = coffeelint.lint(t), o = 0; o < i.length; o++)
                r(i[o])
        } catch (t) {
            n.push({
                from: e.Pos(t.location.first_line, 0),
                to: e.Pos(t.location.last_line, t.location.last_column),
                severity: "error",
                message: t.message
            })
        }
        return n
    })
}),
        function (e) {
            e(CodeMirror)
        }(function (e) {
    e.registerHelper("lint", "css", function (t) {
        var n = [];
        if (!window.CSSLint)
            return n;
        for (var r = CSSLint.verify(t), i = r.messages, o = null, a = 0; a < i.length; a++) {
            o = i[a];
            var s = o.line - 1,
                    l = o.line - 1,
                    c = o.col - 1,
                    u = o.col;
            n.push({
                from: e.Pos(s, c),
                to: e.Pos(l, u),
                message: o.message,
                severity: o.type
            })
        }
        return n
    })
}),
        function (e) {
            e(CodeMirror)
        }(function (e) {
    var t = {
        "tagname-lowercase": !0,
        "attr-lowercase": !0,
        "attr-value-double-quotes": !0,
        "doctype-first": !1,
        "tag-pair": !0,
        "spec-char-escape": !0,
        "id-unique": !0,
        "src-not-empty": !0,
        "attr-no-duplication": !0
    };
    e.registerHelper("lint", "html", function (n, r) {
        var i = [];
        if (!window.HTMLHint)
            return i;
        for (var o = HTMLHint.verify(n, r && r.rules || t), a = 0; a < o.length; a++) {
            var s = o[a],
                    l = s.line - 1,
                    c = s.line - 1,
                    u = s.col - 1,
                    f = s.col;
            i.push({
                from: e.Pos(l, u),
                to: e.Pos(c, f),
                message: s.message,
                severity: s.type
            })
        }
        return i
    })
}),
        function (e) {
            e(CodeMirror)
        }(function (e) {
    function t(e, t) {
        if (!window.JSHINT)
            return [];
        JSHINT(e, t, t.globals);
        var n = JSHINT.data().errors,
                r = [];
        return n && o(n, r), r
    }

    function n(e) {
        return r(e, s, "warning", !0), r(e, l, "error"), i(e) ? null : e
    }

    function r(e, t, n, r) {
        var i, o, a, s, l;
        i = e.description;
        for (var c = 0; c < t.length; c++)
            o = t[c], a = "string" == typeof o ? o : o[0], s = "string" == typeof o ? null : o[1], l = i.indexOf(a) !== -1, (r || l) && (e.severity = n), l && s && (e.description = s)
    }

    function i(e) {
        for (var t = e.description, n = 0; n < a.length; n++)
            if (t.indexOf(a[n]) !== -1)
                return !0;
        return !1
    }

    function o(t, r) {
        for (var i = 0; i < t.length; i++) {
            var o = t[i];
            if (o) {
                var a, s;
                if (a = [], o.evidence) {
                    var l = a[o.line];
                    if (!l) {
                        var c = o.evidence;
                        l = [], Array.prototype.forEach.call(c, function (e, t) {
                            "\t" === e && l.push(t + 1)
                        }), a[o.line] = l
                    }
                    if (l.length > 0) {
                        var u = o.character;
                        l.forEach(function (e) {
                            u > e && (u -= 1)
                        }), o.character = u
                    }
                }
                var f = o.character - 1,
                        d = f + 1;
                o.evidence && (s = o.evidence.substring(f).search(/.\b/), s > -1 && (d += s)), o.description = o.reason, o.start = o.character, o.end = d, o = n(o), o && r.push({
                    message: o.description,
                    severity: o.severity,
                    from: e.Pos(o.line - 1, f),
                    to: e.Pos(o.line - 1, d)
                })
            }
        }
    }
    var a = ["Dangerous comment"],
            s = [
                ["Expected '{'", "Statement body should be inside '{ }' braces."]
            ],
            l = ["Missing semicolon", "Extra comma", "Missing property name", "Unmatched ", " and instead saw", " is not defined", "Unclosed string", "Stopping, unable to continue"];
    e.registerHelper("lint", "javascript", t)
}),
        function (e) {
            e(CodeMirror)
        }(function (e) {
    e.registerHelper("lint", "json", function (t) {
        var n = [];
        jsonlint.parseError = function (t, r) {
            var i = r.loc;
            n.push({
                from: e.Pos(i.first_line - 1, i.first_column),
                to: e.Pos(i.last_line - 1, i.last_column),
                message: t
            })
        };
        try {
            jsonlint.parse(t)
        } catch (e) {
        }
        return n
    })
}),
        function (e) {
            e(CodeMirror)
        }(function (e) {
    function t(t, n) {
        function r(t) {
            return i.parentNode ? (i.style.top = Math.max(0, t.clientY - i.offsetHeight - 5) + "px", void(i.style.left = t.clientX + 5 + "px")) : e.off(document, "mousemove", r)
        }
        var i = document.createElement("div");
        return i.className = "CodeMirror-lint-tooltip", i.appendChild(n.cloneNode(!0)), document.body.appendChild(i), e.on(document, "mousemove", r), r(t), null != i.style.opacity && (i.style.opacity = 1), i
    }

    function n(e) {
        e.parentNode && e.parentNode.removeChild(e)
    }

    function r(e) {
        e.parentNode && (null == e.style.opacity && n(e), e.style.opacity = 0, setTimeout(function () {
            n(e)
        }, 600))
    }

    function i(n, i, o) {
        function a() {
            e.off(o, "mouseout", a), s && (r(s), s = null)
        }
        var s = t(n, i),
                l = setInterval(function () {
                    if (s)
                        for (var e = o; ; e = e.parentNode) {
                            if (e && 11 == e.nodeType && (e = e.host), e == document.body)
                                return;
                            if (!e) {
                                a();
                                break
                            }
                        }
                    if (!s)
                        return clearInterval(l)
                }, 400);
        e.on(o, "mouseout", a)
    }

    function o(e, t, n) {
        this.marked = [], this.options = t, this.timeout = null, this.hasGutter = n, this.onMouseOver = function (t) {
            v(e, t)
        }, this.waitingFor = 0
    }

    function a(e, t) {
        return t instanceof Function ? {
            getAnnotations: t
        } : (t && t !== !0 || (t = {}), t)
    }

    function s(e) {
        var t = e.state.lint;
        t.hasGutter && e.clearGutter(y);
        for (var n = 0; n < t.marked.length; ++n)
            t.marked[n].clear();
        t.marked.length = 0
    }

    function l(t, n, r, o) {
        var a = document.createElement("div"),
                s = a;
        return a.className = "CodeMirror-lint-marker-" + n, r && (s = a.appendChild(document.createElement("div")), s.className = "CodeMirror-lint-marker-multiple"), 0 != o && e.on(s, "mouseover", function (e) {
            i(e, t, s)
        }), a
    }

    function c(e, t) {
        return "error" == e ? e : t
    }

    function u(e) {
        for (var t = [], n = 0; n < e.length; ++n) {
            var r = e[n],
                    i = r.from.line;
            (t[i] || (t[i] = [])).push(r)
        }
        return t
    }

    function f(e) {
        var t = e.severity;
        t || (t = "error");
        var n = document.createElement("div");
        return n.className = "CodeMirror-lint-message-" + t, n.appendChild(document.createTextNode(e.message)), n
    }

    function d(t, n, r) {
        function i() {
            a = -1, t.off("change", i)
        }
        var o = t.state.lint,
                a = ++o.waitingFor;
        t.on("change", i), n(t.getValue(), function (n, r) {
            t.off("change", i), o.waitingFor == a && (r && n instanceof e && (n = r), h(t, n))
        }, r, t)
    }

    function p(t) {
        var n = t.state.lint,
                r = n.options,
                i = r.options || r,
                o = r.getAnnotations || t.getHelper(e.Pos(0, 0), "lint");
        o && (r.async || o.async ? d(t, o, i) : h(t, o(t.getValue(), i, t)))
    }

    function h(e, t) {
        s(e);
        for (var n = e.state.lint, r = n.options, i = u(t), o = 0; o < i.length; ++o) {
            var a = i[o];
            if (a) {
                for (var d = null, p = n.hasGutter && document.createDocumentFragment(), h = 0; h < a.length; ++h) {
                    var m = a[h],
                            g = m.severity;
                    g || (g = "error"), d = c(d, g), r.formatAnnotation && (m = r.formatAnnotation(m)), n.hasGutter && p.appendChild(f(m)), m.to && n.marked.push(e.markText(m.from, m.to, {
                        className: "CodeMirror-lint-mark-" + g,
                        __annotation: m
                    }))
                }
                n.hasGutter && e.setGutterMarker(o, y, l(p, d, a.length > 1, n.options.tooltips))
            }
        }
        r.onUpdateLinting && r.onUpdateLinting(t, i, e)
    }

    function m(e) {
        var t = e.state.lint;
        t && (clearTimeout(t.timeout), t.timeout = setTimeout(function () {
            p(e)
        }, t.options.delay || 500))
    }

    function g(e, t) {
        for (var n = t.target || t.srcElement, r = document.createDocumentFragment(), o = 0; o < e.length; o++) {
            var a = e[o];
            r.appendChild(f(a))
        }
        i(t, r, n)
    }

    function v(e, t) {
        var n = t.target || t.srcElement;
        if (/\bCodeMirror-lint-mark-/.test(n.className)) {
            for (var r = n.getBoundingClientRect(), i = (r.left + r.right) / 2, o = (r.top + r.bottom) / 2, a = e.findMarksAt(e.coordsChar({
                left: i,
                top: o
            }, "client")), s = [], l = 0; l < a.length; ++l) {
                var c = a[l].__annotation;
                c && s.push(c)
            }
            s.length && g(s, t)
        }
    }
    var y = "CodeMirror-lint-markers";
    e.defineOption("lint", !1, function (t, n, r) {
        if (r && r != e.Init && (s(t), t.state.lint.options.lintOnChange !== !1 && t.off("change", m), e.off(t.getWrapperElement(), "mouseover", t.state.lint.onMouseOver), clearTimeout(t.state.lint.timeout), delete t.state.lint), n) {
            for (var i = t.getOption("gutters"), l = !1, c = 0; c < i.length; ++c)
                i[c] == y && (l = !0);
            var u = t.state.lint = new o(t, a(t, n), l);
            u.options.lintOnChange !== !1 && t.on("change", m), 0 != u.options.tooltips && e.on(t.getWrapperElement(), "mouseover", u.onMouseOver), p(t)
        }
    }), e.defineExtension("performLint", function () {
        this.state.lint && p(this)
    })
}),
        function (e) {
            e(CodeMirror)
        }(function (e) {
    e.registerHelper("lint", "yaml", function (t) {
        var n = [];
        try {
            jsyaml.load(t)
        } catch (t) {
            var r = t.mark;
            n.push({
                from: e.Pos(r.line, r.column),
                to: e.Pos(r.line, r.column),
                message: t.message
            })
        }
        return n
    })
}),
        function (e) {
            e(CodeMirror)
        }(function (e) {
    function t(e) {
        var t = e.search(i);
        return t == -1 ? 0 : t
    }

    function n(e, t, n) {
        return /\bstring\b/.test(e.getTokenTypeAt(o(t.line, 0))) && !/^[\'\"`]/.test(n)
    }
    var r = {},
            i = /[^\s\u00a0]/,
            o = e.Pos;
    e.commands.toggleComment = function (e) {
        e.toggleComment()
    }, e.defineExtension("toggleComment", function (e) {
        e || (e = r);
        for (var t = this, n = 1 / 0, i = this.listSelections(), a = null, s = i.length - 1; s >= 0; s--) {
            var l = i[s].from(),
                    c = i[s].to();
            l.line >= n || (c.line >= n && (c = o(n, 0)), n = l.line, null == a ? t.uncomment(l, c, e) ? a = "un" : (t.lineComment(l, c, e), a = "line") : "un" == a ? t.uncomment(l, c, e) : t.lineComment(l, c, e))
        }
    }), e.defineExtension("lineComment", function (e, a, s) {
        s || (s = r);
        var l = this,
                c = l.getModeAt(e),
                u = l.getLine(e.line);
        if (null != u && !n(l, e, u)) {
            var f = s.lineComment || c.lineComment;
            if (!f)
                return void((s.blockCommentStart || c.blockCommentStart) && (s.fullLines = !0, l.blockComment(e, a, s)));
            var d = Math.min(0 != a.ch || a.line == e.line ? a.line + 1 : a.line, l.lastLine() + 1),
                    p = null == s.padding ? " " : s.padding,
                    h = s.commentBlankLines || e.line == a.line;
            l.operation(function () {
                if (s.indent) {
                    for (var n = null, r = e.line; r < d; ++r) {
                        var a = l.getLine(r),
                                c = a.slice(0, t(a));
                        (null == n || n.length > c.length) && (n = c)
                    }
                    for (var r = e.line; r < d; ++r) {
                        var a = l.getLine(r),
                                u = n.length;
                        (h || i.test(a)) && (a.slice(0, u) != n && (u = t(a)), l.replaceRange(n + f + p, o(r, 0), o(r, u)))
                    }
                } else
                    for (var r = e.line; r < d; ++r)
                        (h || i.test(l.getLine(r))) && l.replaceRange(f + p, o(r, 0))
            })
        }
    }), e.defineExtension("blockComment", function (e, t, n) {
        n || (n = r);
        var a = this,
                s = a.getModeAt(e),
                l = n.blockCommentStart || s.blockCommentStart,
                c = n.blockCommentEnd || s.blockCommentEnd;
        if (!l || !c)
            return void((n.lineComment || s.lineComment) && 0 != n.fullLines && a.lineComment(e, t, n));
        var u = Math.min(t.line, a.lastLine());
        u != e.line && 0 == t.ch && i.test(a.getLine(u)) && --u;
        var f = null == n.padding ? " " : n.padding;
        e.line > u || a.operation(function () {
            if (0 != n.fullLines) {
                var r = i.test(a.getLine(u));
                a.replaceRange(f + c, o(u)), a.replaceRange(l + f, o(e.line, 0));
                var d = n.blockCommentLead || s.blockCommentLead;
                if (null != d)
                    for (var p = e.line + 1; p <= u; ++p)
                        (p != u || r) && a.replaceRange(d + f, o(p, 0))
            } else
                a.replaceRange(c, t), a.replaceRange(l, e)
        })
    }), e.defineExtension("uncomment", function (e, t, n) {
        n || (n = r);
        var a, s = this,
                l = s.getModeAt(e),
                c = Math.min(0 != t.ch || t.line == e.line ? t.line : t.line - 1, s.lastLine()),
                u = Math.min(e.line, c),
                f = n.lineComment || l.lineComment,
                d = [],
                p = null == n.padding ? " " : n.padding;
        e: if (f) {
            for (var h = u; h <= c; ++h) {
                var m = s.getLine(h),
                        g = m.indexOf(f);
                if (g > -1 && !/comment/.test(s.getTokenTypeAt(o(h, g + 1))) && (g = -1), g == -1 && (h != c || h == u) && i.test(m))
                    break e;
                if (g > -1 && i.test(m.slice(0, g)))
                    break e;
                d.push(m)
            }
            if (s.operation(function () {
                for (var e = u; e <= c; ++e) {
                    var t = d[e - u],
                            n = t.indexOf(f),
                            r = n + f.length;
                    n < 0 || (t.slice(r, r + p.length) == p && (r += p.length), a = !0, s.replaceRange("", o(e, n), o(e, r)))
                }
            }), a)
                return !0
        }
        var v = n.blockCommentStart || l.blockCommentStart,
                y = n.blockCommentEnd || l.blockCommentEnd;
        if (!v || !y)
            return !1;
        var _ = n.blockCommentLead || l.blockCommentLead,
                b = s.getLine(u),
                w = c == u ? b : s.getLine(c),
                k = b.indexOf(v),
                x = w.lastIndexOf(y);
        if (x == -1 && u != c && (w = s.getLine(--c), x = w.lastIndexOf(y)), k == -1 || x == -1 || !/comment/.test(s.getTokenTypeAt(o(u, k + 1))) || !/comment/.test(s.getTokenTypeAt(o(c, x + 1))))
            return !1;
        var C = b.lastIndexOf(v, e.ch),
                S = C == -1 ? -1 : b.slice(0, e.ch).indexOf(y, C + v.length);
        if (C != -1 && S != -1 && S + y.length != e.ch)
            return !1;
        S = w.indexOf(y, t.ch);
        var L = w.slice(t.ch).lastIndexOf(v, S - t.ch);
        return C = S == -1 || L == -1 ? -1 : t.ch + L, (S == -1 || C == -1 || C == t.ch) && (s.operation(function () {
            s.replaceRange("", o(c, x - (p && w.slice(x - p.length, x) == p ? p.length : 0)), o(c, x + y.length));
            var e = k + v.length;
            if (p && b.slice(e, e + p.length) == p && (e += p.length), s.replaceRange("", o(u, k), o(u, e)), _)
                for (var t = u + 1; t <= c; ++t) {
                    var n = s.getLine(t),
                            r = n.indexOf(_);
                    if (r != -1 && !i.test(n.slice(0, r))) {
                        var a = r + _.length;
                        p && n.slice(a, a + p.length) == p && (a += p.length), s.replaceRange("", o(t, r), o(t, a))
                    }
                }
        }), !0)
    })
});
var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
    return typeof e
} : function (e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e
};
!function (e) {
    e(CodeMirror)
}(function (e) {
    function t(t) {
        if (t.getOption("disableInput"))
            return e.Pass;
        for (var r, i = t.listSelections(), o = [], a = 0; a < i.length; a++) {
            var s = i[a].head,
                    l = t.getTokenAt(s);
            if ("comment" != l.type)
                return e.Pass;
            var c = e.innerMode(t.getMode(), l.state).mode;
            if (r) {
                if (r != c)
                    return e.Pass
            } else
                r = c;
            var u = null;
            if (r.blockCommentStart && r.blockCommentContinue) {
                var f, d = l.string.indexOf(r.blockCommentEnd),
                        p = t.getRange(e.Pos(s.line, 0), e.Pos(s.line, l.end));
                if (d != -1 && d == l.string.length - r.blockCommentEnd.length && s.ch >= d)
                    ;
                else if (0 == l.string.indexOf(r.blockCommentStart)) {
                    if (u = p.slice(0, l.start), !/^\s*$/.test(u)) {
                        u = "";
                        for (var h = 0; h < l.start; ++h)
                            u += " "
                    }
                } else
                    (f = p.indexOf(r.blockCommentContinue)) != -1 && f + r.blockCommentContinue.length > l.start && /^\s*$/.test(p.slice(0, f)) && (u = p.slice(0, f));
                null != u && (u += r.blockCommentContinue)
            }
            if (null == u && r.lineComment && n(t)) {
                var m = t.getLine(s.line),
                        f = m.indexOf(r.lineComment);
                f > -1 && (u = m.slice(0, f), /\S/.test(u) ? u = null : u += r.lineComment + m.slice(f + r.lineComment.length).match(/^\s*/)[0])
            }
            if (null == u)
                return e.Pass;
            o[a] = "\n" + u
        }
        t.operation(function () {
            for (var e = i.length - 1; e >= 0; e--)
                t.replaceRange(o[e], i[e].from(), i[e].to(), "+insert")
        })
    }

    function n(e) {
        var t = e.getOption("continueComments");
        return !t || "object" != ("undefined" == typeof t ? "undefined" : _typeof(t)) || t.continueLineComment !== !1
    }
    for (var r = ["clike", "css", "javascript"], i = 0; i < r.length; ++i)
        e.extendMode(r[i], {
            blockCommentContinue: " * "
        });
    e.defineOption("continueComments", null, function (n, r, i) {
        if (i && i != e.Init && n.removeKeyMap("continueComment"), r) {
            var o = "Enter";
            "string" == typeof r ? o = r : "object" == ("undefined" == typeof r ? "undefined" : _typeof(r)) && r.key && (o = r.key);
            var a = {
                name: "continueComment"
            };
            a[o] = t, n.addKeyMap(a)
        }
    })
}),
        function (e) {
            e(CodeMirror)
        }(function (e) {
    function t(e, t, n, r, i) {
        e.openDialog ? e.openDialog(t, i, {
            value: r,
            selectValueOnOpen: !0
        }) : i(prompt(n, r))
    }

    function n(e, t) {
        var n = Number(t);
        return /^[-+]/.test(t) ? e.getCursor().line + n : n - 1
    }
    var r = 'Jump to line: <input type="text" style="width: 10em" class="CodeMirror-search-field"/> <span style="color: #888" class="CodeMirror-search-hint">(Use line:column or scroll% syntax)</span>';
    e.commands.jumpToLine = function (e) {
        var i = e.getCursor();
        t(e, r, "Jump to line:", i.line + 1 + ":" + i.ch, function (t) {
            if (t) {
                var r;
                if (r = /^\s*([\+\-]?\d+)\s*\:\s*(\d+)\s*$/.exec(t))
                    e.setCursor(n(e, r[1]), Number(r[2]));
                else if (r = /^\s*([\+\-]?\d+(\.\d+)?)\%\s*/.exec(t)) {
                    var o = Math.round(e.lineCount() * Number(r[1]) / 100);
                    /^[-+]/.test(r[1]) && (o = i.line + o + 1), e.setCursor(o - 1, i.ch)
                } else
                    (r = /^\s*\:?\s*([\+\-]?\d+)\s*/.exec(t)) && e.setCursor(n(e, r[1]), i.ch)
            }
        })
    }, e.keyMap.default["Alt-G"] = "jumpToLine"
}),
        function (e) {
            e(CodeMirror)
        }(function (e) {
    function t(e) {
        this.options = {};
        for (var t in c)
            this.options[t] = (e && e.hasOwnProperty(t) ? e : c)[t];
        this.overlay = this.timeout = null, this.matchesonscroll = null
    }

    function n(e) {
        var t = e.state.matchHighlighter;
        clearTimeout(t.timeout), t.timeout = setTimeout(function () {
            o(e)
        }, t.options.delay)
    }

    function r(e, t, n, r) {
        var i = e.state.matchHighlighter;
        if (e.addOverlay(i.overlay = l(t, n, r)), i.options.annotateScrollbar && e.showMatchesOnScrollbar) {
            var o = n ? new RegExp("\\b" + t + "\\b") : t;
            i.matchesonscroll = e.showMatchesOnScrollbar(o, !0, {
                className: "CodeMirror-selection-highlight-scrollbar"
            })
        }
    }

    function i(e) {
        var t = e.state.matchHighlighter;
        t.overlay && (e.removeOverlay(t.overlay), t.overlay = null, t.matchesonscroll && (t.matchesonscroll.clear(), t.matchesonscroll = null))
    }

    function o(e) {
        e.operation(function () {
            var t = e.state.matchHighlighter;
            if (i(e), !e.somethingSelected() && t.options.showToken) {
                for (var n = t.options.showToken === !0 ? /[\w$]/ : t.options.showToken, o = e.getCursor(), s = e.getLine(o.line), l = o.ch, c = l; l && n.test(s.charAt(l - 1)); )
                    --l;
                for (; c < s.length && n.test(s.charAt(c)); )
                    ++c;
                return void(l < c && r(e, s.slice(l, c), n, t.options.style))
            }
            var u = e.getCursor("from"),
                    f = e.getCursor("to");
            if (u.line == f.line && (!t.options.wordsOnly || a(e, u, f))) {
                var d = e.getRange(u, f);
                t.options.trim && (d = d.replace(/^\s+|\s+$/g, "")), d.length >= t.options.minChars && r(e, d, !1, t.options.style)
            }
        })
    }

    function a(e, t, n) {
        var r = e.getRange(t, n);
        if (null !== r.match(/^\w+$/)) {
            if (t.ch > 0) {
                var i = {
                    line: t.line,
                    ch: t.ch - 1
                },
                        o = e.getRange(i, t);
                if (null === o.match(/\W/))
                    return !1
            }
            if (n.ch < e.getLine(t.line).length) {
                var i = {
                    line: n.line,
                    ch: n.ch + 1
                },
                        o = e.getRange(n, i);
                if (null === o.match(/\W/))
                    return !1
            }
            return !0
        }
        return !1
    }

    function s(e, t) {
        return !(e.start && t.test(e.string.charAt(e.start - 1)) || e.pos != e.string.length && t.test(e.string.charAt(e.pos)))
    }

    function l(e, t, n) {
        return {
            token: function (r) {
                return !r.match(e) || t && !s(r, t) ? (r.next(), void(r.skipTo(e.charAt(0)) || r.skipToEnd())) : n
            }
        }
    }
    var c = {
        style: "matchhighlight",
        minChars: 2,
        delay: 100,
        wordsOnly: !1,
        annotateScrollbar: !1,
        showToken: !1,
        trim: !0
    };
    e.defineOption("highlightSelectionMatches", !1, function (r, a, s) {
        s && s != e.Init && (i(r), clearTimeout(r.state.matchHighlighter.timeout), r.state.matchHighlighter = null, r.off("cursorActivity", n)), a && (r.state.matchHighlighter = new t(a), o(r), r.on("cursorActivity", n))
    })
}),
        function (e) {
            e(CodeMirror)
        }(function (e) {
    function t(e, t, n, r) {
        this.cm = e, this.options = r;
        var i = {
            listenForChanges: !1
        };
        for (var o in r)
            i[o] = r[o];
        i.className || (i.className = "CodeMirror-search-match"), this.annotation = e.annotateScrollbar(i), this.query = t, this.caseFold = n, this.gap = {
            from: e.firstLine(),
            to: e.lastLine() + 1
        }, this.matches = [], this.update = null, this.findMatches(), this.annotation.update(this.matches);
        var a = this;
        e.on("change", this.changeHandler = function (e, t) {
            a.onChange(t)
        })
    }

    function n(e, t, n) {
        return e <= t ? e : Math.max(t, e + n)
    }
    e.defineExtension("showMatchesOnScrollbar", function (e, n, r) {
        return "string" == typeof r && (r = {
            className: r
        }), r || (r = {}), new t(this, e, n, r)
    });
    var r = 1e3;
    t.prototype.findMatches = function () {
        if (this.gap) {
            for (var t = 0; t < this.matches.length; t++) {
                var n = this.matches[t];
                if (n.from.line >= this.gap.to)
                    break;
                n.to.line >= this.gap.from && this.matches.splice(t--, 1)
            }
            for (var i = this.cm.getSearchCursor(this.query, e.Pos(this.gap.from, 0), this.caseFold), o = this.options && this.options.maxMatches || r; i.findNext(); ) {
                var n = {
                    from: i.from(),
                    to: i.to()
                };
                if (n.from.line >= this.gap.to)
                    break;
                if (this.matches.splice(t++, 0, n), this.matches.length > o)
                    break
            }
            this.gap = null
        }
    }, t.prototype.onChange = function (t) {
        var r = t.from.line,
                i = e.changeEnd(t).line,
                o = i - t.to.line;
        if (this.gap ? (this.gap.from = Math.min(n(this.gap.from, r, o), t.from.line), this.gap.to = Math.max(n(this.gap.to, r, o), t.from.line)) : this.gap = {
            from: t.from.line,
            to: i + 1
        }, o)
            for (var a = 0; a < this.matches.length; a++) {
                var s = this.matches[a],
                        l = n(s.from.line, r, o);
                l != s.from.line && (s.from = e.Pos(l, s.from.ch));
                var c = n(s.to.line, r, o);
                c != s.to.line && (s.to = e.Pos(c, s.to.ch))
            }
        clearTimeout(this.update);
        var u = this;
        this.update = setTimeout(function () {
            u.updateAfterChange()
        }, 250)
    }, t.prototype.updateAfterChange = function () {
        this.findMatches(), this.annotation.update(this.matches)
    }, t.prototype.clear = function () {
        this.cm.off("change", this.changeHandler), this.annotation.clear()
    }
}),
        function (e) {
            e(CodeMirror)
        }(function (e) {
    function t(e, t) {
        return "string" == typeof e ? e = new RegExp(e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"), t ? "gi" : "g") : e.global || (e = new RegExp(e.source, e.ignoreCase ? "gi" : "g")), {
            token: function (t) {
                e.lastIndex = t.pos;
                var n = e.exec(t.string);
                return n && n.index == t.pos ? (t.pos += n[0].length || 1, "searching") : void(n ? t.pos = n.index : t.skipToEnd())
            }
        }
    }

    function n() {
        this.posFrom = this.posTo = this.lastQuery = this.query = null, this.overlay = null
    }

    function r(e) {
        return e.state.search || (e.state.search = new n)
    }

    function i(e) {
        return "string" == typeof e && e == e.toLowerCase()
    }

    function o(e, t, n) {
        return e.getSearchCursor(t, n, i(t))
    }

    function a(e, t, n, r) {
        e.openDialog(t, r, {
            value: n,
            selectValueOnOpen: !0,
            closeOnEnter: !1,
            onClose: function () {
                h(e)
            }
        })
    }

    function s(e, t, n, r, i) {
        e.openDialog ? e.openDialog(t, i, {
            value: r,
            selectValueOnOpen: !0
        }) : i(prompt(n, r))
    }

    function l(e, t, n, r) {
        e.openConfirm ? e.openConfirm(t, r) : confirm(n) && r[0]()
    }

    function c(e) {
        return e.replace(/\\(.)/g, function (e, t) {
            return "n" == t ? "\n" : "r" == t ? "\r" : t
        })
    }

    function u(e) {
        var t = e.match(/^\/(.*)\/([a-z]*)$/);
        if (t)
            try {
                e = new RegExp(t[1], t[2].indexOf("i") == -1 ? "" : "i")
            } catch (e) {
            }
        else
            e = c(e);
        return ("string" == typeof e ? "" == e : e.test("")) && (e = /x^/), e
    }

    function f(e, n, r) {
        n.queryText = r, n.query = u(r), e.removeOverlay(n.overlay, i(n.query)), n.overlay = t(n.query, i(n.query)), e.addOverlay(n.overlay), e.showMatchesOnScrollbar && (n.annotate && (n.annotate.clear(), n.annotate = null), n.annotate = e.showMatchesOnScrollbar(n.query, i(n.query)))
    }

    function d(t, n, i) {
        var o = r(t);
        if (o.query)
            return p(t, n);
        var l = t.getSelection() || o.lastQuery;
        if (i && t.openDialog) {
            var c = null;
            a(t, v, l, function (n, r) {
                e.e_stop(r), n && (n != o.queryText && (f(t, o, n), o.posFrom = o.posTo = t.getCursor()), c && (c.style.opacity = 1), p(t, r.shiftKey, function (e, n) {
                    var r;
                    n.line < 3 && document.querySelector && (r = t.display.wrapper.querySelector(".CodeMirror-dialog")) && r.getBoundingClientRect().bottom - 4 > t.cursorCoords(n, "window").top && ((c = r).style.opacity = .4)
                }))
            })
        } else
            s(t, v, "Search for:", l, function (e) {
                e && !o.query && t.operation(function () {
                    f(t, o, e), o.posFrom = o.posTo = t.getCursor(), p(t, n)
                })
            })
    }

    function p(t, n, i) {
        t.operation(function () {
            var a = r(t),
                    s = o(t, a.query, n ? a.posFrom : a.posTo);
            (s.find(n) || (s = o(t, a.query, n ? e.Pos(t.lastLine()) : e.Pos(t.firstLine(), 0)), s.find(n))) && (t.setSelection(s.from(), s.to()), t.scrollIntoView({
                from: s.from(),
                to: s.to()
            }, 20), a.posFrom = s.from(), a.posTo = s.to(), i && i(s.from(), s.to()))
        })
    }

    function h(e) {
        e.operation(function () {
            var t = r(e);
            t.lastQuery = t.query, t.query && (t.query = t.queryText = null, e.removeOverlay(t.overlay), t.annotate && (t.annotate.clear(), t.annotate = null))
        })
    }

    function m(e, t, n) {
        e.operation(function () {
            for (var r = o(e, t); r.findNext(); )
                if ("string" != typeof t) {
                    var i = e.getRange(r.from(), r.to()).match(t);
                    r.replace(n.replace(/\$(\d)/g, function (e, t) {
                        return i[t]
                    }))
                } else
                    r.replace(n)
        })
    }

    function g(e, t) {
        if (!e.getOption("readOnly")) {
            var n = e.getSelection() || r(e).lastQuery,
                    i = t ? "Replace all:" : "Replace:";
            s(e, i + y, i, n, function (n) {
                n && (n = u(n), s(e, _, "Replace with:", "", function (r) {
                    if (r = c(r), t)
                        m(e, n, r);
                    else {
                        h(e);
                        var i = o(e, n, e.getCursor("from")),
                                a = function t() {
                                    var a, c = i.from();
                                    !(a = i.findNext()) && (i = o(e, n), !(a = i.findNext()) || c && i.from().line == c.line && i.from().ch == c.ch) || (e.setSelection(i.from(), i.to()), e.scrollIntoView({
                                        from: i.from(),
                                        to: i.to()
                                    }), l(e, b, "Replace?", [function () {
                                            s(a)
                                        }, t, function () {
                                            m(e, n, r)
                                        }]))
                                },
                                s = function (e) {
                                    i.replace("string" == typeof n ? r : r.replace(/\$(\d)/g, function (t, n) {
                                        return e[n]
                                    })), a()
                                };
                        a()
                    }
                }))
            })
        }
    }
    var v = 'Search: <input type="text" style="width: 10em" class="CodeMirror-search-field"/> <span style="color: #888" class="CodeMirror-search-hint">(Use /re/ syntax for regexp search)</span>',
            y = ' <input type="text" style="width: 10em" class="CodeMirror-search-field"/> <span style="color: #888" class="CodeMirror-search-hint">(Use /re/ syntax for regexp search)</span>',
            _ = 'With: <input type="text" style="width: 10em" class="CodeMirror-search-field"/>',
            b = "Replace? <button>Yes</button> <button>No</button> <button>All</button> <button>Stop</button>";
    e.commands.find = function (e) {
        h(e), d(e)
    }, e.commands.findPersistent = function (e) {
        h(e), d(e, !1, !0)
    }, e.commands.findNext = d, e.commands.findPrev = function (e) {
        d(e, !0)
    }, e.commands.clearSearch = h, e.commands.replace = g, e.commands.replaceAll = function (e) {
        g(e, !0)
    }
}),
        function (e) {
            e(CodeMirror)
        }(function (e) {
    function t(e, t, i, o) {
        if (this.atOccurrence = !1, this.doc = e, null == o && "string" == typeof t && (o = !1), i = i ? e.clipPos(i) : r(0, 0), this.pos = {
            from: i,
            to: i
        }, "string" != typeof t)
            t.global || (t = new RegExp(t.source, t.ignoreCase ? "ig" : "g")), this.matches = function (n, i) {
                if (n) {
                    t.lastIndex = 0;
                    for (var o, a, s = e.getLine(i.line).slice(0, i.ch), l = 0; ; ) {
                        t.lastIndex = l;
                        var c = t.exec(s);
                        if (!c)
                            break;
                        if (o = c, a = o.index, l = o.index + (o[0].length || 1), l == s.length)
                            break
                    }
                    var u = o && o[0].length || 0;
                    u || (0 == a && 0 == s.length ? o = void 0 : a != e.getLine(i.line).length && u++)
                } else {
                    t.lastIndex = i.ch;
                    var s = e.getLine(i.line),
                            o = t.exec(s),
                            u = o && o[0].length || 0,
                            a = o && o.index;
                    a + u == s.length || u || (u = 1)
                }
                if (o && u)
                    return {
                        from: r(i.line, a),
                        to: r(i.line, a + u),
                        match: o
                    }
            };
        else {
            var a = t;
            o && (t = t.toLowerCase());
            var s = o ? function (e) {
                return e.toLowerCase()
            } : function (e) {
                return e
            },
                    l = t.split("\n");
            if (1 == l.length)
                t.length ? this.matches = function (i, o) {
                    if (i) {
                        var l = e.getLine(o.line).slice(0, o.ch),
                                c = s(l),
                                u = c.lastIndexOf(t);
                        if (u > -1)
                            return u = n(l, c, u), {
                                from: r(o.line, u),
                                to: r(o.line, u + a.length)
                            }
                    } else {
                        var l = e.getLine(o.line).slice(o.ch),
                                c = s(l),
                                u = c.indexOf(t);
                        if (u > -1)
                            return u = n(l, c, u) + o.ch, {
                                from: r(o.line, u),
                                to: r(o.line, u + a.length)
                            }
                    }
                } : this.matches = function () {};
            else {
                var c = a.split("\n");
                this.matches = function (t, n) {
                    var i = l.length - 1;
                    if (t) {
                        if (n.line - (l.length - 1) < e.firstLine())
                            return;
                        if (s(e.getLine(n.line).slice(0, c[i].length)) != l[l.length - 1])
                            return;
                        for (var o = r(n.line, c[i].length), a = n.line - 1, u = i - 1; u >= 1; --u, --a)
                            if (l[u] != s(e.getLine(a)))
                                return;
                        var f = e.getLine(a),
                                d = f.length - c[0].length;
                        if (s(f.slice(d)) != l[0])
                            return;
                        return {
                            from: r(a, d),
                            to: o
                        }
                    }
                    if (!(n.line + (l.length - 1) > e.lastLine())) {
                        var f = e.getLine(n.line),
                                d = f.length - c[0].length;
                        if (s(f.slice(d)) == l[0]) {
                            for (var p = r(n.line, d), a = n.line + 1, u = 1; u < i; ++u, ++a)
                                if (l[u] != s(e.getLine(a)))
                                    return;
                            if (s(e.getLine(a).slice(0, c[i].length)) == l[i])
                                return {
                                    from: p,
                                    to: r(a, c[i].length)
                                }
                        }
                    }
                }
            }
        }
    }

    function n(e, t, n) {
        if (e.length == t.length)
            return n;
        for (var r = Math.min(n, e.length); ; ) {
            var i = e.slice(0, r).toLowerCase().length;
            if (i < n)
                ++r;
            else {
                if (!(i > n))
                    return r;
                --r
            }
        }
    }
    var r = e.Pos;
    t.prototype = {
        findNext: function () {
            return this.find(!1)
        },
        findPrevious: function () {
            return this.find(!0)
        },
        find: function (e) {
            function t(e) {
                var t = r(e, 0);
                return n.pos = {
                    from: t,
                    to: t
                }, n.atOccurrence = !1, !1
            }
            for (var n = this, i = this.doc.clipPos(e ? this.pos.from : this.pos.to); ; ) {
                if (this.pos = this.matches(e, i))
                    return this.atOccurrence = !0, this.pos.match || !0;
                if (e) {
                    if (!i.line)
                        return t(0);
                    i = r(i.line - 1, this.doc.getLine(i.line - 1).length)
                } else {
                    var o = this.doc.lineCount();
                    if (i.line == o - 1)
                        return t(o);
                    i = r(i.line + 1, 0)
                }
            }
        },
        from: function () {
            if (this.atOccurrence)
                return this.pos.from
        },
        to: function () {
            if (this.atOccurrence)
                return this.pos.to
        },
        replace: function (t, n) {
            if (this.atOccurrence) {
                var i = e.splitLines(t);
                this.doc.replaceRange(i, this.pos.from, this.pos.to, n), this.pos.to = r(this.pos.from.line + i.length - 1, i[i.length - 1].length + (1 == i.length ? this.pos.from.ch : 0))
            }
        }
    }, e.defineExtension("getSearchCursor", function (e, n, r) {
        return new t(this.doc, e, n, r)
    }), e.defineDocExtension("getSearchCursor", function (e, n, r) {
        return new t(this, e, n, r)
    }), e.defineExtension("selectMatches", function (t, n) {
        for (var r = [], i = this.getSearchCursor(t, this.getCursor("from"), n); i.findNext() && !(e.cmpPos(i.to(), this.getCursor("to")) > 0); )
            r.push({
                anchor: i.from(),
                head: i.to()
            });
        r.length && this.setSelections(r, 0)
    })
}),
        function (e) {
            e(CodeMirror)
        }(function (e) {
    function t(e) {
        for (var t = 0; t < e.state.activeLines.length; t++)
            e.removeLineClass(e.state.activeLines[t], "wrap", o), e.removeLineClass(e.state.activeLines[t], "background", a), e.removeLineClass(e.state.activeLines[t], "gutter", s)
    }

    function n(e, t) {
        if (e.length != t.length)
            return !1;
        for (var n = 0; n < e.length; n++)
            if (e[n] != t[n])
                return !1;
        return !0
    }

    function r(e, r) {
        for (var i = [], l = 0; l < r.length; l++) {
            var c = r[l];
            if (c.empty()) {
                var u = e.getLineHandleVisualStart(c.head.line);
                i[i.length - 1] != u && i.push(u)
            }
        }
        n(e.state.activeLines, i) || e.operation(function () {
            t(e);
            for (var n = 0; n < i.length; n++)
                e.addLineClass(i[n], "wrap", o), e.addLineClass(i[n], "background", a), e.addLineClass(i[n], "gutter", s);
            e.state.activeLines = i
        })
    }

    function i(e, t) {
        r(e, t.ranges)
    }
    var o = "CodeMirror-activeline",
            a = "CodeMirror-activeline-background",
            s = "CodeMirror-activeline-gutter";
    e.defineOption("styleActiveLine", !1, function (n, o, a) {
        var s = a && a != e.Init;
        o && !s ? (n.state.activeLines = [], r(n, n.listSelections()), n.on("beforeSelectionChange", i)) : !o && s && (n.off("beforeSelectionChange", i), t(n), delete n.state.activeLines)
    })
}),
        function (e) {
            e(CodeMirror)
        }(function (e) {
    function t(e) {
        e.operation(function () {
            a(e)
        })
    }

    function n(e) {
        e.state.markedSelection.length && e.operation(function () {
            i(e)
        })
    }

    function r(e, t, n, r) {
        if (0 != c(t, n))
            for (var i = e.state.markedSelection, o = e.state.markedSelectionStyle, a = t.line; ; ) {
                var u = a == t.line ? t : l(a, 0),
                        f = a + s,
                        d = f >= n.line,
                        p = d ? n : l(f, 0),
                        h = e.markText(u, p, {
                            className: o
                        });
                if (null == r ? i.push(h) : i.splice(r++, 0, h), d)
                    break;
                a = f
            }
    }

    function i(e) {
        for (var t = e.state.markedSelection, n = 0; n < t.length; ++n)
            t[n].clear();
        t.length = 0
    }

    function o(e) {
        i(e);
        for (var t = e.listSelections(), n = 0; n < t.length; n++)
            r(e, t[n].from(), t[n].to())
    }

    function a(e) {
        if (!e.somethingSelected())
            return i(e);
        if (e.listSelections().length > 1)
            return o(e);
        var t = e.getCursor("start"),
                n = e.getCursor("end"),
                a = e.state.markedSelection;
        if (!a.length)
            return r(e, t, n);
        var l = a[0].find(),
                u = a[a.length - 1].find();
        if (!l || !u || n.line - t.line < s || c(t, u.to) >= 0 || c(n, l.from) <= 0)
            return o(e);
        for (; c(t, l.from) > 0; )
            a.shift().clear(), l = a[0].find();
        for (c(t, l.from) < 0 && (l.to.line - t.line < s ? (a.shift().clear(), r(e, t, l.to, 0)) : r(e, t, l.from, 0)); c(n, u.to) < 0; )
            a.pop().clear(), u = a[a.length - 1].find();
        c(n, u.to) > 0 && (n.line - u.from.line < s ? (a.pop().clear(), r(e, u.from, n)) : r(e, u.to, n))
    }
    e.defineOption("styleSelectedText", !1, function (r, a, s) {
        var l = s && s != e.Init;
        a && !l ? (r.state.markedSelection = [], r.state.markedSelectionStyle = "string" == typeof a ? a : "CodeMirror-selectedtext", o(r), r.on("cursorActivity", t), r.on("change", n)) : !a && l && (r.off("cursorActivity", t), r.off("change", n), i(r), r.state.markedSelection = r.state.markedSelectionStyle = null)
    });
    var s = 8,
            l = e.Pos,
            c = e.cmpPos
}),
        function (e) {
            e(CodeMirror)
        }(function (e) {
    function t(e, t) {
        var n = e.state.selectionPointer;
        (null == t.buttons ? t.which : t.buttons) ? n.mouseX = n.mouseY = null : (n.mouseX = t.clientX, n.mouseY = t.clientY), i(e)
    }

    function n(e, t) {
        if (!e.getWrapperElement().contains(t.relatedTarget)) {
            var n = e.state.selectionPointer;
            n.mouseX = n.mouseY = null, i(e)
        }
    }

    function r(e) {
        e.state.selectionPointer.rects = null, i(e)
    }

    function i(e) {
        e.state.selectionPointer.willUpdate || (e.state.selectionPointer.willUpdate = !0, setTimeout(function () {
            o(e), e.state.selectionPointer.willUpdate = !1
        }, 50))
    }

    function o(e) {
        var t = e.state.selectionPointer;
        if (t) {
            if (null == t.rects && null != t.mouseX && (t.rects = [], e.somethingSelected()))
                for (var n = e.display.selectionDiv.firstChild; n; n = n.nextSibling)
                    t.rects.push(n.getBoundingClientRect());
            var r = !1;
            if (null != t.mouseX)
                for (var i = 0; i < t.rects.length; i++) {
                    var o = t.rects[i];
                    o.left <= t.mouseX && o.right >= t.mouseX && o.top <= t.mouseY && o.bottom >= t.mouseY && (r = !0)
                }
            var a = r ? t.value : "";
            e.display.lineDiv.style.cursor != a && (e.display.lineDiv.style.cursor = a)
        }
    }
    e.defineOption("selectionPointer", !1, function (i, o) {
        var a = i.state.selectionPointer;
        a && (e.off(i.getWrapperElement(), "mousemove", a.mousemove), e.off(i.getWrapperElement(), "mouseout", a.mouseout), e.off(window, "scroll", a.windowScroll), i.off("cursorActivity", r), i.off("scroll", r), i.state.selectionPointer = null, i.display.lineDiv.style.cursor = ""), o && (a = i.state.selectionPointer = {
            value: "string" == typeof o ? o : "default",
            mousemove: function (e) {
                t(i, e)
            },
            mouseout: function (e) {
                n(i, e)
            },
            windowScroll: function () {
                r(i)
            },
            rects: null,
            mouseX: null,
            mouseY: null,
            willUpdate: !1
        }, e.on(i.getWrapperElement(), "mousemove", a.mousemove), e.on(i.getWrapperElement(), "mouseout", a.mouseout), e.on(window, "scroll", a.windowScroll), i.on("cursorActivity", r), i.on("scroll", r))
    })
});
var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
    return typeof e
} : function (e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e;
};
!function (e) {
    "object" == ("undefined" == typeof exports ? "undefined" : _typeof(exports)) && "object" == ("undefined" == typeof module ? "undefined" : _typeof(module)) ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
}(function (e) {
    function t(e, t, n, r, i, o) {
        this.indented = e, this.column = t, this.type = n, this.info = r, this.align = i, this.prev = o
    }

    function n(e, n, r, i) {
        var o = e.indented;
        return e.context && "statement" != e.context.type && "statement" != r && (o = e.context.indented), e.context = new t(o, n, r, i, null, e.context)
    }

    function r(e) {
        var t = e.context.type;
        return ")" != t && "]" != t && "}" != t || (e.indented = e.context.indented), e.context = e.context.prev
    }

    function i(e, t, n) {
        return "variable" == t.prevToken || "variable-3" == t.prevToken || (!!/\S(?:[^- ]>|[*\]])\s*$|\*$/.test(e.string.slice(0, n)) || (!(!t.typeAtEndOfLine || e.column() != e.indentation()) || void 0))
    }

    function o(e) {
        for (; ; ) {
            if (!e || "top" == e.type)
                return !0;
            if ("}" == e.type && "namespace" != e.prev.info)
                return !1;
            e = e.prev
        }
    }

    function a(e) {
        for (var t = {}, n = e.split(" "), r = 0; r < n.length; ++r)
            t[n[r]] = !0;
        return t
    }

    function s(e, t) {
        return "function" == typeof e ? e(t) : e.propertyIsEnumerable(t)
    }

    function l(e, t) {
        if (!t.startOfLine)
            return !1;
        for (var n, r = null; n = e.peek(); ) {
            if ("\\" == n && e.match(/^.$/)) {
                r = l;
                break
            }
            if ("/" == n && e.match(/^\/[\/\*]/, !1))
                break;
            e.next()
        }
        return t.tokenize = r, "meta"
    }

    function c(e, t) {
        return "variable-3" == t.prevToken && "variable-3"
    }

    function u(e) {
        return e.eatWhile(/[\w\.']/), "number"
    }

    function f(e, t) {
        if (e.backUp(1), e.match(/(R|u8R|uR|UR|LR)/)) {
            var n = e.match(/"([^\s\\()]{0,16})\(/);
            return !!n && (t.cpp11RawStringDelim = n[1], t.tokenize = h, h(e, t))
        }
        return e.match(/(u8|u|U|L)/) ? !!e.match(/["']/, !1) && "string" : (e.next(), !1)
    }

    function d(e) {
        var t = /(\w+)::(\w+)$/.exec(e);
        return t && t[1] == t[2]
    }

    function p(e, t) {
        for (var n; null != (n = e.next()); )
            if ('"' == n && !e.eat('"')) {
                t.tokenize = null;
                break
            }
        return "string"
    }

    function h(e, t) {
        var n = t.cpp11RawStringDelim.replace(/[^\w\s]/g, "\\$&"),
                r = e.match(new RegExp(".*?\\)" + n + '"'));
        return r ? t.tokenize = null : e.skipToEnd(), "string"
    }

    function m(t, n) {
        function r(e) {
            if (e)
                for (var t in e)
                    e.hasOwnProperty(t) && i.push(t)
        }
        "string" == typeof t && (t = [t]);
        var i = [];
        r(n.keywords), r(n.types), r(n.builtin), r(n.atoms), r(n.symbols), i.length && (n.helperType = t[0], e.registerHelper("hintWords", t[0], i)), e.registerHelper("fromList", t[0], function (t, r) {
            var i, o, a = t.getCursor(),
                    s = t.getTokenAt(a),
                    l = e.Pos(a.line, s.end),
                    c = n.namespaceSeparator,
                    u = new RegExp("[\\w\\$@\\^%:]" + (c ? "|" + c : "")),
                    f = r.words;
            if (s.string && u.test(s.string[s.string.length - 1]))
                if (s.string.indexOf(c) !== -1 && n.namespaces) {
                    var d = s.string.split(c);
                    i = d.pop() || "", o = e.Pos(a.line, s.end - i.length);
                    for (var p = n, h = 0; h < d.length; h++) {
                        if (!p.namespaces[d[h]]) {
                            p = null;
                            break
                        }
                        p = p.namespaces[d[h]]
                    }
                    f = p && p.symbols ? [].concat(_toConsumableArray(p.symbols.sort())) : []
                } else
                    i = s.string.toLowerCase(), o = e.Pos(a.line, s.start);
            else
                i = "", o = l;
            for (var m = [], g = 0; g < f.length; g++) {
                var v = f[g];
                v.slice(0, i.length).toLowerCase() == i && m.indexOf(v) === -1 && m.push(v)
            }
            if (m.length)
                return {
                    list: m,
                    from: o,
                    to: l
                }
        });
        for (var o = 0; o < t.length; ++o)
            e.defineMIME(t[o], n)
    }

    function g(e, t) {
        for (var n = !1; !e.eol(); ) {
            if (!n && e.match('"""')) {
                t.tokenize = null;
                break
            }
            n = "\\" == e.next() && !n
        }
        return "string"
    }

    function v(e) {
        return function (t, n) {
            for (var r, i = !1, o = !1; !t.eol(); ) {
                if (!e && !i && t.match('"')) {
                    o = !0;
                    break
                }
                if (e && t.match('"""')) {
                    o = !0;
                    break
                }
                r = t.next(), !i && "$" == r && t.match("{") && t.skipTo("}"), i = !i && "\\" == r && !e
            }
            return !o && e || (n.tokenize = null), "string"
        }
    }

    function y(e) {
        return function (t, n) {
            for (var r, i = !1, o = !1; !t.eol(); ) {
                if (!i && t.match('"') && ("single" == e || t.match('""'))) {
                    o = !0;
                    break
                }
                if (!i && t.match("``")) {
                    w = y(e), o = !0;
                    break
                }
                r = t.next(), i = "single" == e && !i && "\\" == r
            }
            return o && (n.tokenize = null), "string"
        }
    }
    e.defineMode("clike", function (a, l) {
        function c(e, t) {
            var n = e.next();
            if (C[n]) {
                var r = C[n](e, t);
                if (r !== !1)
                    return r
            }
            if ('"' == n || "'" == n)
                return t.tokenize = u(n), t.tokenize(e, t);
            if (A.test(n))
                return p = n, null;
            if (E.test(n)) {
                if (e.backUp(1), e.match(O))
                    return "number";
                e.next()
            }
            if ("/" == n) {
                if (e.eat("*"))
                    return t.tokenize = f, f(e, t);
                if (e.eat("/"))
                    return e.skipToEnd(), "comment"
            }
            if (I.test(n)) {
                for (; !e.match(/^\/[\/*]/, !1) && e.eat(I); )
                    ;
                return "operator"
            }
            if (e.eatWhile(/[\w\$_\xa1-\uffff]/), T)
                for (; e.match(T); )
                    e.eatWhile(/[\w\$_\xa1-\uffff]/);
            var i = e.current();
            return s(y, i) ? (s(w, i) && (p = "newstatement"), s(k, i) && (h = !0), "keyword") : s(_, i) ? "variable-3" : s(b, i) ? (s(w, i) && (p = "newstatement"), "builtin") : s(x, i) ? "atom" : "variable"
        }

        function u(e) {
            return function (t, n) {
                for (var r, i = !1, o = !1; null != (r = t.next()); ) {
                    if (r == e && !i) {
                        o = !0;
                        break
                    }
                    i = !i && "\\" == r
                }
                return (o || !i && !S) && (n.tokenize = null), "string"
            }
        }

        function f(e, t) {
            for (var n, r = !1; n = e.next(); ) {
                if ("/" == n && r) {
                    t.tokenize = null;
                    break
                }
                r = "*" == n
            }
            return "comment"
        }

        function d(e, t) {
            l.typeFirstDefinitions && e.eol() && o(t.context) && (t.typeAtEndOfLine = i(e, t, e.pos))
        }
        var p, h, m = a.indentUnit,
                g = l.statementIndentUnit || m,
                v = l.dontAlignCalls,
                y = l.keywords || {},
                _ = l.types || {},
                b = l.builtin || {},
                w = l.blockKeywords || {},
                k = l.defKeywords || {},
                x = l.atoms || {},
                C = l.hooks || {},
                S = l.multiLineStrings,
                L = l.indentStatements !== !1,
                M = l.indentSwitch !== !1,
                T = l.namespaceSeparator,
                A = l.isPunctuationChar || /[\[\]{}\(\),;\:\.]/,
                E = l.numberStart || /[\d\.]/,
                O = l.number || /^(?:0x[a-f\d]+|0b[01]+|(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?)(u|ll?|l|f)?/i,
                I = l.isOperatorChar || /[+\-*&%=<>!?|\/]/,
                R = l.endStatement || /^[;:,]$/;
        return {
            startState: function (e) {
                return {
                    tokenize: null,
                    context: new t((e || 0) - m, 0, "top", null, (!1)),
                    indented: 0,
                    startOfLine: !0,
                    prevToken: null
                }
            },
            token: function (e, t) {
                var a = t.context;
                if (e.sol() && (null == a.align && (a.align = !1), t.indented = e.indentation(), t.startOfLine = !0), e.eatSpace())
                    return d(e, t), null;
                p = h = null;
                var s = (t.tokenize || c)(e, t);
                if ("comment" == s || "meta" == s)
                    return s;
                if (null == a.align && (a.align = !0), R.test(p))
                    for (;
                            "statement" == t.context.type; )
                        r(t);
                else if ("{" == p)
                    n(t, e.column(), "}");
                else if ("[" == p)
                    n(t, e.column(), "]");
                else if ("(" == p)
                    n(t, e.column(), ")");
                else if ("}" == p) {
                    for (;
                            "statement" == a.type; )
                        a = r(t);
                    for ("}" == a.type && (a = r(t));
                            "statement" == a.type; )
                        a = r(t)
                } else
                    p == a.type ? r(t) : L && (("}" == a.type || "top" == a.type) && ";" != p || "statement" == a.type && "newstatement" == p) && n(t, e.column(), "statement", e.current());
                if ("variable" == s && ("def" == t.prevToken || l.typeFirstDefinitions && i(e, t, e.start) && o(t.context) && e.match(/^\s*\(/, !1)) && (s = "def"), C.token) {
                    var u = C.token(e, t, s);
                    void 0 !== u && (s = u)
                }
                return "def" == s && l.styleDefs === !1 && (s = "variable"), t.startOfLine = !1, t.prevToken = h ? "def" : s || p, d(e, t), s
            },
            indent: function (t, n) {
                if (t.tokenize != c && null != t.tokenize || t.typeAtEndOfLine)
                    return e.Pass;
                var r = t.context,
                        i = n && n.charAt(0);
                if ("statement" == r.type && "}" == i && (r = r.prev), l.dontIndentStatements)
                    for (;
                            "statement" == r.type && l.dontIndentStatements.test(r.info); )
                        r = r.prev;
                if (C.indent) {
                    var o = C.indent(t, r, n);
                    if ("number" == typeof o)
                        return o
                }
                var a = i == r.type,
                        s = r.prev && "switch" == r.prev.info;
                if (l.allmanIndentation && /[{(]/.test(i)) {
                    for (;
                            "top" != r.type && "}" != r.type; )
                        r = r.prev;
                    return r.indented
                }
                return "statement" == r.type ? r.indented + ("{" == i ? 0 : g) : !r.align || v && ")" == r.type ? ")" != r.type || a ? r.indented + (a ? 0 : m) + (a || !s || /^(?:case|default)\b/.test(n) ? 0 : m) : r.indented + g : r.column + (a ? 0 : 1)
            },
            electricInput: M ? /^\s*(?:case .*?:|default:|\{\}?|\})$/ : /^\s*[{}]$/,
            blockCommentStart: "/*",
            blockCommentEnd: "*/",
            lineComment: "//",
            fold: "brace"
        }
    });

    function addNewWords() {
        var newWords = document.getElementById("console");
        var _ = "auto if break case register continue return default do sizeof static else struct switch extern typedef union for goto while enum const volatile",
                b = "int long char short double float unsigned signed void size_t ptrdiff_t";
        m(["text/x-csrc", "text/x-c", "text/x-chdr"], {
            name: "clike",
            keywords: a(_),
            types: a(b + "bool bool _Complex _Bool float_t double_t intptr_t intmax_t int8_t int16_t int32_t int64_t uintptr_t uintmax_t uint8_t uint16_t uint32_t uint64_t"),
            blockKeywords: a("case do else for if switch while struct"),
            defKeywords: a("struct"),
            typeFirstDefinitions: !0,
            atoms: a("null true false"),
            hooks: {
                "#": l,
                "*": c
            },
            modeProps: {
                fold: ["brace", "include"]
            }
        }), m(["text/x-c++src", "text/x-c++hdr"], {
            name: "clike",
            keywords: a(_ + " asm dynamic_cast namespace reinterpret_cast try explicit new static_cast typeid catch operator template typename class friend private this using const_cast inline public throw virtual delete mutable protected alignas alignof constexpr decltype nullptr noexcept thread_local final static_assert override"),
            types: a(b + " bool wchar_t"),
            blockKeywords: a("catch class do else finally for if struct switch try while"),
            defKeywords: a("class namespace struct enum union"),
            typeFirstDefinitions: !0,
            atoms: a("true false null"),
            dontIndentStatements: /^template$/,
            hooks: {
                "#": l,
                "*": c,
                u: f,
                U: f,
                L: f,
                R: f,
                0: u,
                1: u,
                2: u,
                3: u,
                4: u,
                5: u,
                6: u,
                7: u,
                8: u,
                9: u,
                token: function (e, t, n) {
                    if ("variable" == n && "(" == e.peek() && (";" == t.prevToken || null == t.prevToken || "}" == t.prevToken) && d(e.current()))
                        return "def"
                }
            },
            namespaceSeparator: "::",
            modeProps: {
                fold: ["brace", "include"]
            },
            namespaces: {
                std: {
                    namespaces: {
                        __debug: {
                            namespaces: {},
                            symbols: ["bitset", "deque", "forward_list", "list", "map", "multimap", "multiset", "set", "unordered_map", "unordered_multimap", "unordered_multiset", "unordered_set", "vector", "swap"]
                        },
                        __detail: {
                            namespaces: {},
                            symbols: ["_BracketMatcher", "_Compiler", "_Default_ranged_hash", "_Equal_helper", "_Equality", "_Equality_base", "_Executor", "_Hash_code_base", "_Hash_node", "_Hash_node_base", "_Hash_node_value_base", "_Hashtable_alloc", "_Hashtable_base", "_Hashtable_ebo_helper", "_Hashtable_traits", "_Insert", "_Insert_base", "_List_node_base", "_Local_const_iterator", "_Local_iterator", "_Local_iterator_base", "_Map_base", "_Mod_range_hashing", "_Node_const_iterator", "_Node_iterator", "_Node_iterator_base", "_Prime_rehash_policy", "_Rehash_base", "_Scanner", "_StateSeq", "__hash_code_for_local_iter", "_Matcher", "_StateIdT", "_Opcode", "_RegexExecutorPolicy", "__compile_nfa", "__distance_fw", "__normalize", "__regex_algo_impl", "_S_invalid_state_id"]
                        },
                        __parallel: {
                            namespaces: {},
                            symbols: ["_CRandNumber", "__accumulate_switch", "__adjacent_difference_switch", "__adjacent_find_switch", "__count_if_switch", "__count_switch", "__find_first_of_switch", "__find_if_switch", "__find_switch", "__for_each_switch", "__generate_n_switch", "__generate_switch", "__inner_product_switch", "__lexicographical_compare_switch", "__max_element_switch", "__merge_switch", "__min_element_switch", "__mismatch_switch", "__partial_sum_switch", "__partition_switch", "__replace_if_switch", "__replace_switch", "__search_n_switch", "__search_switch", "__set_difference_switch", "__set_intersection_switch", "__set_symmetric_difference_switch", "__set_union_switch", "__transform1_switch", "__transform2_switch", "__unique_copy_switch", "accumulate", "adjacent_difference", "adjacent_find", "count", "count_if", "equal", "find", "find_first_of", "find_if", "for_each", "generate", "generate_n", "inner_product", "lexicographical_compare", "max_element", "merge", "min_element", "mismatch", "nth_element", "partial_sort", "partial_sum", "partition", "random_shuffle", "replace", "replace_if", "search", "search_n", "set_difference", "set_intersection", "set_symmetric_difference", "set_union", "sort", "stable_sort", "transform", "unique_copy"]
                        },
                        __profile: {
                            namespaces: {},
                            symbols: ["bitset", "deque", "forward_list", "list", "map", "multimap", "multiset", "set", "unordered_map", "unordered_multimap", "unordered_multiset", "unordered_set", "__are_equal", "__get_bucket_index", "swap"]
                        },
                        chrono: {
                            namespaces: {},
                            symbols: ["duration", "duration_values", "time_point", "treat_as_floating_point", "hours", "microseconds", "milliseconds", "minutes", "nanoseconds", "seconds", "duration_cast", "time_point_cast"]
                        },
                        decimal: {
                            namespaces: {},
                            symbols: ["decimal128", "decimal32", "decimal64", "decimal128_to_double", "decimal128_to_float", "decimal128_to_long_double", "decimal128_to_long_long", "decimal32_to_double", "decimal32_to_float", "decimal32_to_long_double", "decimal32_to_long_long", "decimal64_to_double", "decimal64_to_float", "decimal64_to_long_double", "decimal64_to_long_long", "decimal_to_double", "decimal_to_float", "decimal_to_long_double", "decimal_to_long_long", "make_decimal128", "make_decimal32", "make_decimal64"]
                        },
                        placeholders: {
                            namespaces: {},
                            symbols: []
                        },
                        regex_constants: {
                            namespaces: {},
                            symbols: ["__syntax_option", "syntax_option_type", "__match_flag", "match_flag_type", "error_type", "error_collate", "error_ctype", "error_escape", "error_backref", "error_brack", "error_paren", "error_brace", "error_badbrace", "error_range", "error_space", "error_badrepeat", "error_complexity", "error_stack"]
                        },
                        rel_ops: {
                            namespaces: {},
                            symbols: []
                        },
                        this_thread: {
                            namespaces: {},
                            symbols: ["__sleep_for", "get_id", "sleep_for", "sleep_until", "yield"]
                        },
                        tr1: {
                            namespaces: {
                                _detail: {
                                    namespaces: {},
                                    symbols: []
                                }
                            },
                            symbols: ["_detail", "__complex_acosh", "__complex_asinh", "__complex_atanh", "acosh", "asinh", "assoc_laguerre", "assoc_legendre", "atanh", "beta", "comp_ellint_1", "comp_ellint_2", "comp_ellint_3", "conf_hyperg", "conj", "cyl_bessel_i", "cyl_bessel_j", "cyl_bessel_k", "cyl_neumann", "ellint_1", "ellint_2", "ellint_3", "expint", "fabs", "hermite", "hyperg", "laguerre", "legendre", "polar", "pow", "riemann_zeta", "sph_bessel", "sph_legendre", "sph_neumann"]
                        },
                        tr2: {
                            namespaces: {
                                _detail: {
                                    namespaces: {},
                                    symbols: []
                                }
                            },
                            symbols: ["_detail", "__dynamic_bitset_base", "__reflection_typelist", "bases", "bool_set", "direct_bases", "dynamic_bitset", "certainly", "contains", "equals", "is_emptyset", "is_indeterminate", "is_singleton", "possibly", "set_complement", "set_intersection", "set_union"]
                        }
                    },
                    symbols: ["__debug", "__detail", "__parallel", "__profile", "chrono", "decimal", "placeholders", "regex_constants", "rel_ops", "this_thread", "tr1", "tr2", "__atomic_base", "__atomic_flag_base", "__codecvt_abstract_base", "__ctype_abstract_base", "__has_iterator_category_helper", "__is_location_invariant", "__is_nullptr_t", "__numeric_limits_base", "_Base_bitset", "_Bind", "_Bind_result", "_Deque_base", "_Deque_iterator", "_Enable_copy_move", "_Enable_default_constructor", "_Enable_destructor", "_Enable_special_members", "_Function_base", "_Fwd_list_base", "_Fwd_list_const_iterator", "_Fwd_list_iterator", "_Fwd_list_node", "_Fwd_list_node_base", "_Hashtable", "_List_base", "_List_const_iterator", "_List_iterator", "_List_node", "_Maybe_get_result_type", "_Maybe_unary_or_binary_function", "_Maybe_wrap_member_pointer", "_Mem_fn", "_Mu", "_Placeholder", "_Reference_wrapper_base", "_Reference_wrapper_base_impl", "_Safe_tuple_element", "_Safe_tuple_element_impl", "_Sp_ebo_helper", "_Temporary_buffer", "_Tuple_impl", "_Vector_base", "_Weak_result_type", "_Weak_result_type_impl", "adopt_lock_t", "allocator", "allocator_arg_t", "allocator_traits", "array", "atomic", "atomic_bool", "atomic_flag", "auto_ptr", "auto_ptr_ref", "back_insert_iterator", "bad_alloc", "bad_cast", "bad_exception", "bad_function_call", "bad_typeid", "bad_weak_ptr", "basic_filebuf", "basic_fstream", "basic_ifstream", "basic_ios", "basic_iostream", "basic_istream", "basic_istringstream", "basic_ofstream", "basic_ostream", "basic_ostringstream", "basic_regex", "basic_streambuf", "basic_string", "basic_stringbuf", "basic_stringstream", "bernoulli_distribution", "bidirectional_iterator_tag", "binary_function", "binary_negate", "binder1st", "binder2nd", "binomial_distribution", "cauchy_distribution", "char_traits", "chi_squared_distribution", "codecvt", "codecvt_base", "codecvt_byname", "collate", "collate_byname", "complex", "condition_variable", "const_mem_fun1_ref_t", "const_mem_fun1_t", "const_mem_fun_ref_t", "const_mem_fun_t", "ctype", "ctype_base", "ctype_byname", "default_delete", "defer_lock_t", "deque", "discard_block_engine", "discrete_distribution", "divides", "domain_error", "enable_shared_from_this", "equal_to", "error_category", "error_code", "error_condition", "exception", "exponential_distribution", "extreme_value_distribution", "fisher_f_distribution", "forward_iterator_tag", "forward_list", "fpos", "front_insert_iterator", "function", "future_error", "gamma_distribution", "geometric_distribution", "greater", "greater_equal", "gslice", "gslice_array", "hash", "independent_bits_engine", "indirect_array", "initializer_list", "input_iterator_tag", "insert_iterator", "integral_constant", "invalid_argument", "ios_base", "is_abstract", "is_arithmetic", "is_array", "is_bind_expression", "is_class", "is_compound", "is_const", "is_empty", "is_enum", "is_error_code_enum", "is_error_condition_enum", "is_floating_point", "is_function", "is_fundamental", "is_integral", "is_literal_type", "is_lvalue_reference", "is_member_function_pointer", "is_member_object_pointer", "is_member_pointer", "is_null_pointer", "is_object", "is_placeholder", "is_pod", "is_pointer", "is_polymorphic", "is_reference", "is_rvalue_reference", "is_scalar", "is_standard_layout", "is_trivial", "is_union", "is_void", "is_volatile", "istream_iterator", "istreambuf_iterator", "iterator", "iterator_traits", "length_error", "less", "less_equal", "linear_congruential_engine", "list", "locale", "lock_guard", "logic_error", "logical_and", "logical_not", "logical_or", "lognormal_distribution", "map", "mask_array", "match_results", "mem_fun1_ref_t", "mem_fun1_t", "mem_fun_ref_t", "mem_fun_t", "mersenne_twister_engine", "messages", "messages_base", "messages_byname", "minus", "modulus", "money_base", "money_get", "money_put", "moneypunct", "moneypunct_byname", "move_iterator", "multimap", "multiplies", "multiset", "mutex", "negate", "negative_binomial_distribution", "nested_exception", "normal_distribution", "not_equal_to", "num_get", "num_put", "numeric_limits", "numpunct", "numpunct_byname", "once_flag", "ostream_iterator", "ostreambuf_iterator", "out_of_range", "output_iterator_tag", "overflow_error", "owner_less", "pair", "piecewise_constant_distribution", "piecewise_construct_t", "piecewise_linear_distribution", "plus", "pointer_to_binary_function", "pointer_to_unary_function", "pointer_traits", "poisson_distribution", "priority_queue", "queue", "random_access_iterator_tag", "random_device", "range_error", "ratio", "ratio_equal", "ratio_not_equal", "raw_storage_iterator", "recursive_mutex", "reference_wrapper", "regex_error", "regex_iterator", "regex_token_iterator", "regex_traits", "reverse_iterator", "runtime_error", "scoped_allocator_adaptor", "seed_seq", "set", "shared_ptr", "shuffle_order_engine", "slice", "slice_array", "stack", "student_t_distribution", "sub_match", "system_error", "thread", "time_base", "time_get", "time_get_byname", "time_put", "time_put_byname", "try_to_lock_t", "tuple", "tuple_element", "tuple_size", "type_index", "type_info", "unary_function", "unary_negate", "underflow_error", "uniform_int_distribution", "uniform_real_distribution", "unique_lock", "unique_ptr", "unordered_map", "unordered_multimap", "unordered_multiset", "unordered_set", "uses_allocator", "valarray", "vector", "weak_ptr", "weibull_distribution", "__allocator_base", "__atomic_flag_data_type", "__c_file", "__c_locale", "__c_lock", "__cache_default", "__check_func_return_type", "__empty_not_final", "__is_socketlike", "__sub_match_string", "__umap_hashtable", "__umap_traits", "__ummap_hashtable", "__ummap_traits", "__umset_hashtable", "__umset_traits", "__uset_hashtable", "__uset_traits", "_Bit_type", "_NotSame", "_RequireInputIter", "atomic_char", "atomic_char16_t", "atomic_char32_t", "atomic_int", "atomic_int_fast16_t", "atomic_int_fast32_t", "atomic_int_fast64_t", "atomic_int_fast8_t", "atomic_int_least16_t", "atomic_int_least32_t", "atomic_int_least64_t", "atomic_int_least8_t", "atomic_intmax_t", "atomic_intptr_t", "atomic_llong", "atomic_long", "atomic_ptrdiff_t", "atomic_schar", "atomic_short", "atomic_size_t", "atomic_uchar", "atomic_uint", "atomic_uint_fast16_t", "atomic_uint_fast32_t", "atomic_uint_fast64_t", "atomic_uint_fast8_t", "atomic_uint_least16_t", "atomic_uint_least32_t", "atomic_uint_least64_t", "atomic_uint_least8_t", "atomic_uintmax_t", "atomic_uintptr_t", "atomic_ullong", "atomic_ulong", "atomic_ushort", "atomic_wchar_t", "cmatch", "cregex_iterator", "cregex_token_iterator", "csub_match", "default_random_engine", "false_type", "filebuf", "fstream", "ifstream", "ios", "iostream", "istream", "istringstream", "knuth_b", "memory_order", "minstd_rand", "minstd_rand0", "mt19937", "mt19937_64", "new_handler", "ofstream", "ostream", "ostringstream", "ptrdiff_t", "ranlux24", "ranlux24_base", "ranlux48", "ranlux48_base", "ratio_divide", "ratio_multiply", "regex", "size_t", "smatch", "sregex_iterator", "sregex_token_iterator", "ssub_match", "streambuf", "streamoff", "streampos", "streamsize", "string", "stringbuf", "stringstream", "terminate_handler", "true_type", "u16streampos", "u16string", "u32streampos", "u32string", "unexpected_handler", "wcmatch", "wcregex_iterator", "wcregex_token_iterator", "wcsub_match", "wfilebuf", "wfstream", "wifstream", "wios", "wiostream", "wistream", "wistringstream", "wofstream", "wostream", "wostringstream", "wregex", "wsmatch", "wsregex_iterator", "wsregex_token_iterator", "wssub_match", "wstreambuf", "wstreampos", "wstring", "wstringbuf", "wstringstream", "__memory_order_modifier", "_Ios_Fmtflags", "_Ios_Iostate", "_Ios_Openmode", "_Ios_Seekdir", "_Manager_operation", "_Rb_tree_color", "cv_status", "errc", "float_denorm_style", "float_round_style", "future_errc", "future_status", "launch", "__add_grouping", "__addressof", "__adjacent_find", "__adjust_heap", "__advance", "__alloc_on_copy", "__alloc_on_move", "__alloc_on_swap", "__allocate_shared", "__attribute__", "__bind_simple", "__callable_functor", "__check_facet", "__chunk_insertion_sort", "__cmpexch_failure_order", "__cmpexch_failure_order2", "__complex_abs", "__complex_acos", "__complex_acosh", "__complex_arg", "__complex_asin", "__complex_asinh", "__complex_atan", "__complex_atanh", "__complex_cos", "__complex_cosh", "__complex_exp", "__complex_log", "__complex_pow", "__complex_pow_unsigned", "__complex_proj", "__complex_sin", "__complex_sinh", "__complex_sqrt", "__complex_tan", "__complex_tanh", "__convert_from_v", "__convert_to_v", "__copy_move_a", "__copy_move_a2", "__copy_move_backward_a", "__copy_move_backward_a2", "__copy_n", "__copy_streambufs", "__copy_streambufs_eof", "__count_if", "__deque_buf_size", "__distance", "__do_alloc_on_copy", "__do_alloc_on_move", "__do_alloc_on_swap", "__do_outermost", "__enable_shared_from_this_helper", "__equal_aux", "__equal_range", "__fill_a", "__fill_bvector", "__fill_n_a", "__final_insertion_sort", "__find_end", "__find_if", "__find_if_not", "__find_if_not_n", "__gcd", "__get_helper", "__get_nested_exception", "__get_once_mutex", "__heap_select", "__iconv_adaptor", "__includes", "__inplace_merge", "__inplace_stable_partition", "__inplace_stable_sort", "__insertion_sort", "__int_to_char", "__introselect", "__introsort_loop", "__invoke", "__is_heap", "__is_heap_until", "__is_permutation", "__is_sorted_until", "__iterator_category", "__lexicographical_compare_aux", "__lexicographical_compare_impl", "__lg", "__lower_bound", "__make_heap", "__make_move_if_noexcept_iterator", "__make_shared", "__max_element", "__merge", "__merge_adaptive", "__merge_sort_loop", "__merge_sort_with_buffer", "__merge_without_buffer", "__min_element", "__minmax_element", "__mismatch", "__miter_base", "__move_median_to_first", "__move_merge", "__move_merge_adaptive", "__move_merge_adaptive_backward", "__next_permutation", "__niter_base", "__once_proxy", "__ostream_fill", "__ostream_insert", "__ostream_write", "__outermost", "__partial_sort", "__partial_sort_copy", "__partition", "__pop_heap", "__prev_permutation", "__push_heap", "__remove_copy_if", "__remove_if", "__replace_copy_if", "__reverse", "__rotate", "__rotate_adaptive", "__search", "__search_n", "__search_n_aux", "__set_difference", "__set_intersection", "__set_once_functor_lock_ptr", "__set_symmetric_difference", "__set_union", "__sort", "__sort_heap", "__stable_partition", "__stable_partition_adaptive", "__stable_sort", "__stable_sort_adaptive", "__throw_bad_alloc", "__throw_bad_cast", "__throw_bad_exception", "__throw_bad_function_call", "__throw_bad_typeid", "__throw_bad_weak_ptr", "__throw_domain_error", "__throw_future_error", "__throw_invalid_argument", "__throw_ios_failure", "__throw_length_error", "__throw_logic_error", "__throw_out_of_range", "__throw_out_of_range_fmt", "__throw_overflow_error", "__throw_range_error", "__throw_regex_error", "__throw_runtime_error", "__throw_system_error", "__throw_underflow_error", "__throw_with_nested", "__try_to_lock", "__unguarded_insertion_sort", "__unguarded_linear_insert", "__unguarded_partition", "__unguarded_partition_pivot", "__uninitialized_construct_buf", "__uninitialized_copy_a", "__uninitialized_copy_move", "__uninitialized_copy_n", "__uninitialized_default", "__uninitialized_default_a", "__uninitialized_default_n", "__uninitialized_default_n_a", "__uninitialized_fill_a", "__uninitialized_fill_move", "__uninitialized_fill_n_a", "__uninitialized_move_a", "__uninitialized_move_copy", "__uninitialized_move_fill", "__uninitialized_move_if_noexcept_a", "__unique", "__unique_copy", "__unmatched_sub", "__upper_bound", "__use_alloc", "__valarray_copy", "__valarray_copy_construct", "__valarray_default_construct", "__valarray_destroy_elements", "__valarray_fill", "__valarray_fill_construct", "__valarray_get_memory", "__valarray_get_storage", "__valarray_max", "__valarray_min", "__valarray_product", "__valarray_release_memory", "__valarray_sum", "__verify_grouping", "__volget", "__write", "_Array_augmented___bitwise_and", "_Array_augmented___bitwise_or", "_Array_augmented___bitwise_xor", "_Array_augmented___divides", "_Array_augmented___minus", "_Array_augmented___modulus", "_Array_augmented___multiplies", "_Array_augmented___plus", "_Array_augmented___shift_left", "_Array_augmented___shift_right", "_Construct", "_Destroy", "_Find_first", "_Find_next", "_Fnv_hash_bytes", "_Hash_bytes", "_M_copy_from_ptr", "_M_copy_from_string", "_M_copy_to_string", "_M_do_and", "_Rb_tree_black_count", "_Rb_tree_decrement", "_Rb_tree_increment", "_Rb_tree_insert_and_rebalance", "_Rb_tree_rebalance_for_erase", "abort", "abs", "accumulate", "acos", "acosh", "addressof", "adjacent_difference", "adjacent_find", "advance", "all", "all_of", "allocate_shared", "any", "any_of", "arg", "asin", "asinh", "async", "atan", "atan2", "atanh", "atexit", "atomic_compare_exchange_strong", "atomic_compare_exchange_strong_explicit", "atomic_compare_exchange_weak", "atomic_compare_exchange_weak_explicit", "atomic_exchange", "atomic_exchange_explicit", "atomic_fetch_add", "atomic_fetch_add_explicit", "atomic_fetch_and", "atomic_fetch_and_explicit", "atomic_fetch_or", "atomic_fetch_or_explicit", "atomic_fetch_sub", "atomic_fetch_sub_explicit", "atomic_fetch_xor", "atomic_fetch_xor_explicit", "atomic_flag_clear", "atomic_flag_clear_explicit", "atomic_flag_test_and_set", "atomic_flag_test_and_set_explicit", "atomic_init", "atomic_is_lock_free", "atomic_load", "atomic_load_explicit", "atomic_store", "atomic_store_explicit", "back_inserter", "begin", "binary_search", "bind", "bind1st", "bind2nd", "boolalpha", "call_once", "ceil", "conj", "const_pointer_cast", "copy", "copy_backward", "copy_exception", "copy_if", "copy_n", "cos", "cosh", "count", "count_if", "current_exception", "dec", "distance", "dynamic_pointer_cast", "end", "endl", "ends", "equal", "equal_range", "exit", "exp", "fabs", "fill", "fill_n", "find", "find_end", "find_first_of", "find_if", "find_if_not", "fixed", "flip", "floor", "flush", "fmod", "for_each", "forward", "forward_as_tuple", "frexp", "front_inserter", "future_category", "generate", "generate_canonical", "generate_n", "generic_category", "get", "get_deleter", "get_money", "get_new_handler", "get_temporary_buffer", "get_terminate", "get_unexpected", "getline", "has_facet", "hex", "imag", "includes", "inner_product", "inplace_merge", "inserter", "internal", "iota", "is_heap", "is_heap_until", "is_partitioned", "is_permutation", "is_sorted", "is_sorted_until", "isalnum", "isalpha", "iscntrl", "isdigit", "isgraph", "islower", "isprint", "ispunct", "isspace", "isupper", "isxdigit", "iter_swap", "kill_dependency", "ldexp", "left", "lexicographical_compare", "lock", "log", "log10", "lower_bound", "make_error_code", "make_error_condition", "make_exception_ptr", "make_heap", "make_move_iterator", "make_pair", "make_shared", "make_tuple", "max", "max_element", "mem_fn", "mem_fun", "mem_fun_ref", "memchr", "merge", "min", "min_element", "minmax", "minmax_element", "mismatch", "modf", "move", "move_backward", "move_if_noexcept", "next", "next_permutation", "noboolalpha", "none", "none_of", "norm", "noshowbase", "noshowpoint", "noshowpos", "noskipws", "not1", "not2", "nounitbuf", "nouppercase", "nth_element", "oct", "partial_sort", "partial_sort_copy", "partial_sum", "partition", "partition_copy", "partition_point", "polar", "pop_heap", "pow", "prev", "prev_permutation", "proj", "ptr_fun", "push_heap", "put_money", "random_shuffle", "real", "remove", "remove_copy", "remove_copy_if", "remove_if", "replace", "replace_copy", "replace_copy_if", "replace_if", "reset", "resetiosflags", "rethrow_exception", "rethrow_if_nested", "return_temporary_buffer", "reverse", "reverse_copy", "right", "rotate", "rotate_copy", "scientific", "search", "search_n", "set_difference", "set_intersection", "set_new_handler", "set_symmetric_difference", "set_terminate", "set_unexpected", "set_union", "setbase", "setfill", "setiosflags", "setprecision", "setw", "showbase", "showpoint", "showpos", "shuffle", "sin", "sinh", "size", "skipws", "sort", "sort_heap", "sqrt", "stable_partition", "stable_sort", "static_pointer_cast", "strchr", "strpbrk", "strrchr", "strstr", "swap", "swap_ranges", "system_category", "tan", "tanh", "terminate", "test", "throw_with_nested", "tie", "to_string", "to_ullong", "to_ulong", "tolower", "toupper", "transform", "try_lock", "tuple_cat", "uncaught_exception", "unexpected", "uninitialized_copy", "uninitialized_copy_n", "uninitialized_fill", "uninitialized_fill_n", "unique", "unique_copy", "unitbuf", "upper_bound", "uppercase", "use_facet", "wcschr", "wcspbrk", "wcsrchr", "wcsstr", "wmemchr", "ws", "_Unchecked_set", "_Unchecked_reset", "_Unchecked_flip", "_Unchecked_test", "ref", "cref", "regex_match", "regex_search", "regex_replace", "__ioinit", "__once_functor", "adopt_lock", "allocator_arg", "defer_lock", "ignore", "nothrow", "nullptr_t", "piecewise_construct", "this", "try_to_lock", "cin", "cout", "cerr", "clog", "wcin", "wcout", "wcerr", "wclog"]
                }
            },
            symbols: a(" std")
        }), m("text/x-java", {
            name: "clike",
            keywords: a("abstract assert break case catch class const continue default do else enum extends final finally float for goto if implements import instanceof interface native new package private protected public return static strictfp super switch synchronized this throw throws transient try volatile while"),
            types: a("byte short int long float double boolean char void Boolean Byte Character Double Float Integer Long Number Object Short String StringBuffer StringBuilder Void"),
            blockKeywords: a("catch class do else finally for if switch try while"),
            defKeywords: a("class interface package enum"),
            typeFirstDefinitions: !0,
            atoms: a("true false null"),
            endStatement: /^[;:]$/,
            number: /^(?:0x[a-f\d_]+|0b[01_]+|(?:[\d_]+\.?\d*|\.\d+)(?:e[-+]?[\d_]+)?)(u|ll?|l|f)?/i,
            hooks: {
                "@": function (e) {
                    return e.eatWhile(/[\w\$_]/), "meta"
                }
            },
            modeProps: {
                fold: ["brace", "import"]
            }
        }), m("text/x-csharp", {
            name: "clike",
            keywords: a("abstract as async await base break case catch checked class const continue default delegate do else enum event explicit extern finally fixed for foreach goto if implicit in interface internal is lock namespace new operator out override params private protected public readonly ref return sealed sizeof stackalloc static struct switch this throw try typeof unchecked unsafe using virtual void volatile while add alias ascending descending dynamic from get global group into join let orderby partial remove select set value var yield"),
            types: a("Action Boolean Byte Char DateTime DateTimeOffset Decimal Double Func Guid Int16 Int32 Int64 Object SByte Single String Task TimeSpan UInt16 UInt32 UInt64 bool byte char decimal double short int long object sbyte float string ushort uint ulong"),
            blockKeywords: a("catch class do else finally for foreach if struct switch try while"),
            defKeywords: a("class interface namespace struct var"),
            typeFirstDefinitions: !0,
            atoms: a("true false null"),
            hooks: {
                "@": function (e, t) {
                    return e.eat('"') ? (t.tokenize = p, p(e, t)) : (e.eatWhile(/[\w\$_]/), "meta")
                }
            }
        }), m("text/x-scala", {
            name: "clike",
            keywords: a("abstract case catch class def do else extends final finally for forSome if implicit import lazy match new null object override package private protected return sealed super this throw trait try type val var while with yield _ : = => <- <: <% >: # @ assert assume require print println printf readLine readBoolean readByte readShort readChar readInt readLong readFloat readDouble :: #:: "),
            types: a("AnyVal App Application Array BufferedIterator BigDecimal BigInt Char Console Either Enumeration Equiv Error Exception Fractional Function IndexedSeq Int Integral Iterable Iterator List Map Numeric Nil NotNull Option Ordered Ordering PartialFunction PartialOrdering Product Proxy Range Responder Seq Serializable Set Specializable Stream StringBuilder StringContext Symbol Throwable Traversable TraversableOnce Tuple Unit Vector Boolean Byte Character CharSequence Class ClassLoader Cloneable Comparable Compiler Double Exception Float Integer Long Math Number Object Package Pair Process Runtime Runnable SecurityManager Short StackTraceElement StrictMath String StringBuffer System Thread ThreadGroup ThreadLocal Throwable Triple Void"),
            multiLineStrings: !0,
            blockKeywords: a("catch class do else finally for forSome if match switch try while"),
            defKeywords: a("class def object package trait type val var"),
            atoms: a("true false null"),
            indentStatements: !1,
            indentSwitch: !1,
            hooks: {
                "@": function (e) {
                    return e.eatWhile(/[\w\$_]/), "meta"
                },
                '"': function (e, t) {
                    return !!e.match('""') && (t.tokenize = g, t.tokenize(e, t))
                },
                "'": function (e) {
                    return e.eatWhile(/[\w\$_\xa1-\uffff]/), "atom"
                },
                "=": function (e, n) {
                    var r = n.context;
                    return !("}" != r.type || !r.align || !e.eat(">")) && (n.context = new t(r.indented, r.column, r.type, r.info, null, r.prev), "operator")
                }
            },
            modeProps: {
                closeBrackets: {
                    triples: '"'
                }
            }
        }), m("text/x-kotlin", {
            name: "clike",
            keywords: a("package as typealias class interface this super val var fun for is in This throw return break continue object if else while do try when !in !is as? file import where by get set abstract enum open inner override private public internal protected catch finally out final vararg reified dynamic companion constructor init sealed field property receiver param sparam lateinit data inline noinline tailrec external annotation crossinline const operator infix"),
            types: a("Boolean Byte Character CharSequence Class ClassLoader Cloneable Comparable Compiler Double Exception Float Integer Long Math Number Object Package Pair Process Runtime Runnable SecurityManager Short StackTraceElement StrictMath String StringBuffer System Thread ThreadGroup ThreadLocal Throwable Triple Void"),
            intendSwitch: !1,
            indentStatements: !1,
            multiLineStrings: !0,
            blockKeywords: a("catch class do else finally for if where try while enum"),
            defKeywords: a("class val var object package interface fun"),
            atoms: a("true false null this"),
            hooks: {
                '"': function (e, t) {
                    return t.tokenize = v(e.match('""')), t.tokenize(e, t)
                }
            },
            modeProps: {
                closeBrackets: {
                    triples: '"'
                }
            }
        }), m(["x-shader/x-vertex", "x-shader/x-fragment"], {
            name: "clike",
            keywords: a("sampler1D sampler2D sampler3D samplerCube sampler1DShadow sampler2DShadow const attribute uniform varying break continue discard return for while do if else struct in out inout"),
            types: a("float int bool void vec2 vec3 vec4 ivec2 ivec3 ivec4 bvec2 bvec3 bvec4 mat2 mat3 mat4"),
            blockKeywords: a("for while do if else struct"),
            builtin: a("radians degrees sin cos tan asin acos atan pow exp log exp2 sqrt inversesqrt abs sign floor ceil fract mod min max clamp mix step smoothstep length distance dot cross normalize ftransform faceforward reflect refract matrixCompMult lessThan lessThanEqual greaterThan greaterThanEqual equal notEqual any all not texture1D texture1DProj texture1DLod texture1DProjLod texture2D texture2DProj texture2DLod texture2DProjLod texture3D texture3DProj texture3DLod texture3DProjLod textureCube textureCubeLod shadow1D shadow2D shadow1DProj shadow2DProj shadow1DLod shadow2DLod shadow1DProjLod shadow2DProjLod dFdx dFdy fwidth noise1 noise2 noise3 noise4"),
            atoms: a("true false gl_FragColor gl_SecondaryColor gl_Normal gl_Vertex gl_MultiTexCoord0 gl_MultiTexCoord1 gl_MultiTexCoord2 gl_MultiTexCoord3 gl_MultiTexCoord4 gl_MultiTexCoord5 gl_MultiTexCoord6 gl_MultiTexCoord7 gl_FogCoord gl_PointCoord gl_Position gl_PointSize gl_ClipVertex gl_FrontColor gl_BackColor gl_FrontSecondaryColor gl_BackSecondaryColor gl_TexCoord gl_FogFragCoord gl_FragCoord gl_FrontFacing gl_FragData gl_FragDepth gl_ModelViewMatrix gl_ProjectionMatrix gl_ModelViewProjectionMatrix gl_TextureMatrix gl_NormalMatrix gl_ModelViewMatrixInverse gl_ProjectionMatrixInverse gl_ModelViewProjectionMatrixInverse gl_TexureMatrixTranspose gl_ModelViewMatrixInverseTranspose gl_ProjectionMatrixInverseTranspose gl_ModelViewProjectionMatrixInverseTranspose gl_TextureMatrixInverseTranspose gl_NormalScale gl_DepthRange gl_ClipPlane gl_Point gl_FrontMaterial gl_BackMaterial gl_LightSource gl_LightModel gl_FrontLightModelProduct gl_BackLightModelProduct gl_TextureColor gl_EyePlaneS gl_EyePlaneT gl_EyePlaneR gl_EyePlaneQ gl_FogParameters gl_MaxLights gl_MaxClipPlanes gl_MaxTextureUnits gl_MaxTextureCoords gl_MaxVertexAttribs gl_MaxVertexUniformComponents gl_MaxVaryingFloats gl_MaxVertexTextureImageUnits gl_MaxTextureImageUnits gl_MaxFragmentUniformComponents gl_MaxCombineTextureImageUnits gl_MaxDrawBuffers"),
            indentSwitch: !1,
            hooks: {
                "#": l
            },
            modeProps: {
                fold: ["brace", "include"]
            }
        }), m("text/x-nesc", {
            name: "clike",
            keywords: a(_ + "as atomic async call command component components configuration event generic implementation includes interface module new norace nx_struct nx_union post provides signal task uses abstract extends"),
            types: a(b),
            blockKeywords: a("case do else for if switch while struct"),
            atoms: a("null true false"),
            hooks: {
                "#": l
            },
            modeProps: {
                fold: ["brace", "include"]
            }
        }), m("text/x-objectivec", {
            name: "clike",
            keywords: a(_ + "inline restrict _Bool _Complex _Imaginary BOOL Class bycopy byref id IMP in inout nil oneway out Protocol SEL self super atomic nonatomic retain copy readwrite readonly"),
            types: a(b),
            atoms: a("YES NO NULL NILL ON OFF true false"),
            hooks: {
                "@": function (e) {
                    return e.eatWhile(/[\w\$]/), "keyword"
                },
                "#": l,
                indent: function (e, t, n) {
                    if ("statement" == t.type && /^@\w/.test(n))
                        return t.indented
                }
            },
            modeProps: {
                fold: "brace"
            }
        }), m("text/x-squirrel", {
            name: "clike",
            keywords: a("base break clone continue const default delete enum extends function in class foreach local resume return this throw typeof yield constructor instanceof static"),
            types: a(b),
            blockKeywords: a("case catch class else for foreach if switch try while"),
            defKeywords: a("function local class"),
            typeFirstDefinitions: !0,
            atoms: a("true false null"),
            hooks: {
                "#": l
            },
            modeProps: {
                fold: ["brace", "include"]
            }
        });
        var w = null;
        m("text/x-ceylon", {
            name: "clike",
            keywords: a("abstracts alias assembly assert assign break case catch class continue dynamic else exists extends finally for function given if import in interface is let module new nonempty object of out outer package return satisfies super switch then this throw try value void while"),
            types: function (e) {
                var t = e.charAt(0);
                return t === t.toUpperCase() && t !== t.toLowerCase()
            },
            blockKeywords: a("case catch class dynamic else finally for function if interface module new object switch try while"),
            defKeywords: a("class dynamic function interface module object package value"),
            builtin: a("abstract actual aliased annotation by default deprecated doc final formal late license native optional sealed see serializable shared suppressWarnings tagged throws variable"),
            isPunctuationChar: /[\[\]{}\(\),;\:\.`]/,
            isOperatorChar: /[+\-*&%=<>!?|^~:\/]/,
            numberStart: /[\d#$]/,
            number: /^(?:#[\da-fA-F_]+|\$[01_]+|[\d_]+[kMGTPmunpf]?|[\d_]+\.[\d_]+(?:[eE][-+]?\d+|[kMGTPmunpf]|)|)/i,
            multiLineStrings: !0,
            typeFirstDefinitions: !0,
            atoms: a("true false null larger smaller equal empty finished"),
            indentSwitch: !1,
            styleDefs: !1,
            hooks: {
                "@": function (e) {
                    return e.eatWhile(/[\w\$_]/), "meta"
                },
                '"': function (e, t) {
                    return t.tokenize = y(e.match('""') ? "triple" : "single"), t.tokenize(e, t)
                },
                "`": function (e, t) {
                    return !(!w || !e.match("`")) && (t.tokenize = w, w = null, t.tokenize(e, t))
                },
                "'": function (e) {
                    return e.eatWhile(/[\w\$_\xa1-\uffff]/), "atom"
                },
                token: function (e, t, n) {
                    if (("variable" == n || "variable-3" == n) && "." == t.prevToken)
                        return "variable-2"
                }
            },
            modeProps: {
                fold: ["brace", "import"],
                closeBrackets: {
                    triples: '"'
                }
            }
        })
    }
    setInterval(addNewWords(), 25);
});
var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
    return typeof e
} : function (e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e
};
!function (e) {
    "object" == ("undefined" == typeof exports ? "undefined" : _typeof(exports)) && "object" == ("undefined" == typeof module ? "undefined" : _typeof(module)) ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
}(function (e) {
    e.defineMode("go", function (e) {
        function t(e, t) {
            var i = e.next();
            if ('"' == i || "'" == i || "`" == i)
                return t.tokenize = n(i), t.tokenize(e, t);
            if (/[\d\.]/.test(i))
                return "." == i ? e.match(/^[0-9]+([eE][\-+]?[0-9]+)?/) : "0" == i ? e.match(/^[xX][0-9a-fA-F]+/) || e.match(/^0[0-7]+/) : e.match(/^[0-9]*\.?[0-9]*([eE][\-+]?[0-9]+)?/), "number";
            if (/[\[\]{}\(\),;\:\.]/.test(i))
                return s = i, null;
            if ("/" == i) {
                if (e.eat("*"))
                    return t.tokenize = r, r(e, t);
                if (e.eat("/"))
                    return e.skipToEnd(), "comment"
            }
            if (f.test(i))
                return e.eatWhile(f), "operator";
            e.eatWhile(/[\w\$_\xa1-\uffff]/);
            var o = e.current();
            return c.propertyIsEnumerable(o) ? ("case" != o && "default" != o || (s = "case"), "keyword") : u.propertyIsEnumerable(o) ? "atom" : "variable"
        }

        function n(e) {
            return function (n, r) {
                for (var i, o = !1, a = !1; null != (i = n.next()); ) {
                    if (i == e && !o) {
                        a = !0;
                        break
                    }
                    o = !o && "`" != e && "\\" == i
                }
                return (a || !o && "`" != e) && (r.tokenize = t), "string"
            }
        }

        function r(e, n) {
            for (var r, i = !1; r = e.next(); ) {
                if ("/" == r && i) {
                    n.tokenize = t;
                    break
                }
                i = "*" == r
            }
            return "comment"
        }

        function i(e, t, n, r, i) {
            this.indented = e, this.column = t, this.type = n, this.align = r, this.prev = i
        }

        function o(e, t, n) {
            return e.context = new i(e.indented, t, n, null, e.context)
        }

        function a(e) {
            if (e.context.prev) {
                var t = e.context.type;
                return ")" != t && "]" != t && "}" != t || (e.indented = e.context.indented), e.context = e.context.prev
            }
        }
        var s, l = e.indentUnit,
                c = {
                    break: !0,
                    case: !0,
                    chan: !0,
                    const: !0,
                    continue: !0,
                    default: !0,
                    defer: !0,
                    else: !0,
                    fallthrough: !0,
                    for : !0,
                    func: !0,
                    go: !0,
                    goto: !0,
                    if : !0,
                    import: !0,
                    interface: !0,
                    map: !0,
                    package: !0,
                    range: !0,
                    return: !0,
                    select: !0,
                    struct: !0,
                    switch : !0,
                    type: !0,
                    var : !0,
                    bool: !0,
                    byte: !0,
                    complex64: !0,
                    complex128: !0,
                    float32: !0,
                    float64: !0,
                    int8: !0,
                    int16: !0,
                    int32: !0,
                    int64: !0,
                    string: !0,
                    uint8: !0,
                    uint16: !0,
                    uint32: !0,
                    uint64: !0,
                    int: !0,
                    uint: !0,
                    uintptr: !0,
                    error: !0
                },
                u = {
                    true: !0,
                    false: !0,
                    iota: !0,
                    nil: !0,
                    append: !0,
                    cap: !0,
                    close: !0,
                    complex: !0,
                    copy: !0,
                    imag: !0,
                    len: !0,
                    make: !0,
                    new : !0,
                    panic: !0,
                    print: !0,
                    println: !0,
                    real: !0,
                    recover: !0
                },
                f = /[+\-*&^%:=<>!|\/]/;
        return {
            startState: function (e) {
                return {
                    tokenize: null,
                    context: new i((e || 0) - l, 0, "top", (!1)),
                    indented: 0,
                    startOfLine: !0
                }
            },
            token: function (e, n) {
                var r = n.context;
                if (e.sol() && (null == r.align && (r.align = !1), n.indented = e.indentation(), n.startOfLine = !0, "case" == r.type && (r.type = "}")), e.eatSpace())
                    return null;
                s = null;
                var i = (n.tokenize || t)(e, n);
                return "comment" == i ? i : (null == r.align && (r.align = !0), "{" == s ? o(n, e.column(), "}") : "[" == s ? o(n, e.column(), "]") : "(" == s ? o(n, e.column(), ")") : "case" == s ? r.type = "case" : "}" == s && "}" == r.type ? r = a(n) : s == r.type && a(n), n.startOfLine = !1, i)
            },
            indent: function (e, n) {
                if (e.tokenize != t && null != e.tokenize)
                    return 0;
                var r = e.context,
                        i = n && n.charAt(0);
                if ("case" == r.type && /^(?:case|default)\b/.test(n))
                    return e.context.type = "}", r.indented;
                var o = i == r.type;
                return r.align ? r.column + (o ? 0 : 1) : r.indented + (o ? 0 : l)
            },
            electricChars: "{}):",
            fold: "brace",
            blockCommentStart: "/*",
            blockCommentEnd: "*/",
            lineComment: "//"
        }
    }), e.defineMIME("text/x-go", "go")
});
var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
    return typeof e
} : function (e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e
};
!function (e) {
    e(CodeMirror)
}(function (e) {
    function t(e) {
        for (var t = {}, n = 0; n < e.length; ++n)
            t[e[n]] = !0;
        return t
    }

    function n(e, t) {
        for (var n, r = !1; null != (n = e.next()); ) {
            if (r && "/" == n) {
                t.tokenize = null;
                break
            }
            r = "*" == n
        }
        return ["comment", "comment"]
    }
    e.defineMode("css", function (t, n) {
        function r(e, t) {
            return h = t, e
        }

        function i(e, t) {
            var n = e.next();
            if (v[n]) {
                var i = v[n](e, t);
                if (i !== !1)
                    return i
            }
            return "@" == n ? (e.eatWhile(/[\w\\\-]/), r("def", e.current())) : "=" == n || ("~" == n || "|" == n) && e.eat("=") ? r(null, "compare") : '"' == n || "'" == n ? (t.tokenize = o(n), t.tokenize(e, t)) : "#" == n ? (e.eatWhile(/[\w\\\-]/), r("atom", "hash")) : "!" == n ? (e.match(/^\s*\w*/), r("keyword", "important")) : /\d/.test(n) || "." == n && e.eat(/\d/) ? (e.eatWhile(/[\w.%]/), r("number", "unit")) : "-" !== n ? /[,+>*\/]/.test(n) ? r(null, "select-op") : "." == n && e.match(/^-?[_a-z][_a-z0-9-]*/i) ? r("qualifier", "qualifier") : /[:;{}\[\]\(\)]/.test(n) ? r(null, n) : "u" == n && e.match(/rl(-prefix)?\(/) || "d" == n && e.match("omain(") || "r" == n && e.match("egexp(") ? (e.backUp(1), t.tokenize = a, r("property", "word")) : /[\w\\\-]/.test(n) ? (e.eatWhile(/[\w\\\-]/), r("property", "word")) : r(null, null) : /[\d.]/.test(e.peek()) ? (e.eatWhile(/[\w.%]/), r("number", "unit")) : e.match(/^-[\w\\\-]+/) ? (e.eatWhile(/[\w\\\-]/), e.match(/^\s*:/, !1) ? r("variable-2", "variable-definition") : r("variable-2", "variable")) : e.match(/^\w+-/) ? r("meta", "meta") : void 0
        }

        function o(e) {
            return function (t, n) {
                for (var i, o = !1; null != (i = t.next()); ) {
                    if (i == e && !o) {
                        ")" == e && t.backUp(1);
                        break
                    }
                    o = !o && "\\" == i
                }
                return (i == e || !o && ")" != e) && (n.tokenize = null), r("string", "string")
            }
        }

        function a(e, t) {
            return e.next(), e.match(/\s*[\"\')]/, !1) ? t.tokenize = null : t.tokenize = o(")"), r(null, "(")
        }

        function s(e, t, n) {
            this.type = e, this.indent = t, this.prev = n
        }

        function l(e, t, n, r) {
            return e.context = new s(n, t.indentation() + (r === !1 ? 0 : g), e.context), n
        }

        function c(e) {
            return e.context.prev && (e.context = e.context.prev), e.context.type
        }

        function u(e, t, n) {
            return E[n.context.type](e, t, n)
        }

        function f(e, t, n, r) {
            for (var i = r || 1; i > 0; i--)
                n.context = n.context.prev;
            return u(e, t, n)
        }

        function d(e) {
            var t = e.current().toLowerCase();
            m = M.hasOwnProperty(t) ? "atom" : L.hasOwnProperty(t) ? "keyword" : "variable"
        }
        var p = n.inline;
        n.propertyKeywords || (n = e.resolveMode("text/css"));
        var h, m, g = t.indentUnit,
                v = n.tokenHooks,
                y = n.documentTypes || {},
                _ = n.mediaTypes || {},
                b = n.mediaFeatures || {},
                w = n.mediaValueKeywords || {},
                k = n.propertyKeywords || {},
                x = n.nonStandardPropertyKeywords || {},
                C = n.fontProperties || {},
                S = n.counterDescriptors || {},
                L = n.colorKeywords || {},
                M = n.valueKeywords || {},
                T = n.allowNested,
                A = n.supportsAtComponent === !0,
                E = {};
        return E.top = function (e, t, n) {
            if ("{" == e)
                return l(n, t, "block");
            if ("}" == e && n.context.prev)
                return c(n);
            if (A && /@component/.test(e))
                return l(n, t, "atComponentBlock");
            if (/^@(-moz-)?document$/.test(e))
                return l(n, t, "documentTypes");
            if (/^@(media|supports|(-moz-)?document|import)$/.test(e))
                return l(n, t, "atBlock");
            if (/^@(font-face|counter-style)/.test(e))
                return n.stateArg = e, "restricted_atBlock_before";
            if (/^@(-(moz|ms|o|webkit)-)?keyframes$/.test(e))
                return "keyframes";
            if (e && "@" == e.charAt(0))
                return l(n, t, "at");
            if ("hash" == e)
                m = "builtin";
            else if ("word" == e)
                m = "tag";
            else {
                if ("variable-definition" == e)
                    return "maybeprop";
                if ("interpolation" == e)
                    return l(n, t, "interpolation");
                if (":" == e)
                    return "pseudo";
                if (T && "(" == e)
                    return l(n, t, "parens")
            }
            return n.context.type
        }, E.block = function (e, t, n) {
            if ("word" == e) {
                var r = t.current().toLowerCase();
                return k.hasOwnProperty(r) ? (m = "property", "maybeprop") : x.hasOwnProperty(r) ? (m = "string-2", "maybeprop") : T ? (m = t.match(/^\s*:(?:\s|$)/, !1) ? "property" : "tag", "block") : (m += " error", "maybeprop")
            }
            return "meta" == e ? "block" : T || "hash" != e && "qualifier" != e ? E.top(e, t, n) : (m = "error", "block")
        }, E.maybeprop = function (e, t, n) {
            return ":" == e ? l(n, t, "prop") : u(e, t, n)
        }, E.prop = function (e, t, n) {
            if (";" == e)
                return c(n);
            if ("{" == e && T)
                return l(n, t, "propBlock");
            if ("}" == e || "{" == e)
                return f(e, t, n);
            if ("(" == e)
                return l(n, t, "parens");
            if ("hash" != e || /^#([0-9a-fA-f]{3,4}|[0-9a-fA-f]{6}|[0-9a-fA-f]{8})$/.test(t.current())) {
                if ("word" == e)
                    d(t);
                else if ("interpolation" == e)
                    return l(n, t, "interpolation")
            } else
                m += " error";
            return "prop"
        }, E.propBlock = function (e, t, n) {
            return "}" == e ? c(n) : "word" == e ? (m = "property", "maybeprop") : n.context.type
        }, E.parens = function (e, t, n) {
            return "{" == e || "}" == e ? f(e, t, n) : ")" == e ? c(n) : "(" == e ? l(n, t, "parens") : "interpolation" == e ? l(n, t, "interpolation") : ("word" == e && d(t), "parens")
        }, E.pseudo = function (e, t, n) {
            return "word" == e ? (m = "variable-3", n.context.type) : u(e, t, n)
        }, E.documentTypes = function (e, t, n) {
            return "word" == e && y.hasOwnProperty(t.current()) ? (m = "tag", n.context.type) : E.atBlock(e, t, n)
        }, E.atBlock = function (e, t, n) {
            if ("(" == e)
                return l(n, t, "atBlock_parens");
            if ("}" == e || ";" == e)
                return f(e, t, n);
            if ("{" == e)
                return c(n) && l(n, t, T ? "block" : "top");
            if ("interpolation" == e)
                return l(n, t, "interpolation");
            if ("word" == e) {
                var r = t.current().toLowerCase();
                m = "only" == r || "not" == r || "and" == r || "or" == r ? "keyword" : _.hasOwnProperty(r) ? "attribute" : b.hasOwnProperty(r) ? "property" : w.hasOwnProperty(r) ? "keyword" : k.hasOwnProperty(r) ? "property" : x.hasOwnProperty(r) ? "string-2" : M.hasOwnProperty(r) ? "atom" : L.hasOwnProperty(r) ? "keyword" : "error"
            }
            return n.context.type
        }, E.atComponentBlock = function (e, t, n) {
            return "}" == e ? f(e, t, n) : "{" == e ? c(n) && l(n, t, T ? "block" : "top", !1) : ("word" == e && (m = "error"), n.context.type)
        }, E.atBlock_parens = function (e, t, n) {
            return ")" == e ? c(n) : "{" == e || "}" == e ? f(e, t, n, 2) : E.atBlock(e, t, n)
        }, E.restricted_atBlock_before = function (e, t, n) {
            return "{" == e ? l(n, t, "restricted_atBlock") : "word" == e && "@counter-style" == n.stateArg ? (m = "variable", "restricted_atBlock_before") : u(e, t, n)
        }, E.restricted_atBlock = function (e, t, n) {
            return "}" == e ? (n.stateArg = null, c(n)) : "word" == e ? (m = "@font-face" == n.stateArg && !C.hasOwnProperty(t.current().toLowerCase()) || "@counter-style" == n.stateArg && !S.hasOwnProperty(t.current().toLowerCase()) ? "error" : "property", "maybeprop") : "restricted_atBlock"
        }, E.keyframes = function (e, t, n) {
            return "word" == e ? (m = "variable", "keyframes") : "{" == e ? l(n, t, "top") : u(e, t, n)
        }, E.at = function (e, t, n) {
            return ";" == e ? c(n) : "{" == e || "}" == e ? f(e, t, n) : ("word" == e ? m = "tag" : "hash" == e && (m = "builtin"), "at")
        }, E.interpolation = function (e, t, n) {
            return "}" == e ? c(n) : "{" == e || ";" == e ? f(e, t, n) : ("word" == e ? m = "variable" : "variable" != e && "(" != e && ")" != e && (m = "error"), "interpolation")
        }, {
            startState: function (e) {
                return {
                    tokenize: null,
                    state: p ? "block" : "top",
                    stateArg: null,
                    context: new s(p ? "block" : "top", e || 0, null)
                }
            },
            token: function (e, t) {
                if (!t.tokenize && e.eatSpace())
                    return null;
                var n = (t.tokenize || i)(e, t);
                return n && "object" == ("undefined" == typeof n ? "undefined" : _typeof(n)) && (h = n[1], n = n[0]), m = n, t.state = E[t.state](h, e, t), m
            },
            indent: function e(t, n) {
                var r = t.context,
                        i = n && n.charAt(0),
                        e = r.indent;
                return "prop" != r.type || "}" != i && ")" != i || (r = r.prev), r.prev && ("}" != i || "block" != r.type && "top" != r.type && "interpolation" != r.type && "restricted_atBlock" != r.type ? (")" != i || "parens" != r.type && "atBlock_parens" != r.type) && ("{" != i || "at" != r.type && "atBlock" != r.type) || (e = Math.max(0, r.indent - g), r = r.prev) : (r = r.prev, e = r.indent)), e
            },
            electricChars: "}",
            blockCommentStart: "/*",
            blockCommentEnd: "*/",
            fold: "brace"
        }
    });
    var r = ["domain", "regexp", "url", "url-prefix"],
            i = t(r),
            o = ["all", "aural", "braille", "handheld", "print", "projection", "screen", "tty", "tv", "embossed"],
            a = t(o),
            s = ["width", "min-width", "max-width", "height", "min-height", "max-height", "device-width", "min-device-width", "max-device-width", "device-height", "min-device-height", "max-device-height", "aspect-ratio", "min-aspect-ratio", "max-aspect-ratio", "device-aspect-ratio", "min-device-aspect-ratio", "max-device-aspect-ratio", "color", "min-color", "max-color", "color-index", "min-color-index", "max-color-index", "monochrome", "min-monochrome", "max-monochrome", "resolution", "min-resolution", "max-resolution", "scan", "grid", "orientation", "device-pixel-ratio", "min-device-pixel-ratio", "max-device-pixel-ratio", "pointer", "any-pointer", "hover", "any-hover"],
            l = t(s),
            c = ["landscape", "portrait", "none", "coarse", "fine", "on-demand", "hover", "interlace", "progressive"],
            u = t(c),
            f = ["align-content", "align-items", "align-self", "alignment-adjust", "alignment-baseline", "anchor-point", "animation", "animation-delay", "animation-direction", "animation-duration", "animation-fill-mode", "animation-iteration-count", "animation-name", "animation-play-state", "animation-timing-function", "appearance", "azimuth", "backface-visibility", "background", "background-attachment", "background-blend-mode", "background-clip", "background-color", "background-image", "background-origin", "background-position", "background-repeat", "background-size", "baseline-shift", "binding", "bleed", "bookmark-label", "bookmark-level", "bookmark-state", "bookmark-target", "border", "border-bottom", "border-bottom-color", "border-bottom-left-radius", "border-bottom-right-radius", "border-bottom-style", "border-bottom-width", "border-collapse", "border-color", "border-image", "border-image-outset", "border-image-repeat", "border-image-slice", "border-image-source", "border-image-width", "border-left", "border-left-color", "border-left-style", "border-left-width", "border-radius", "border-right", "border-right-color", "border-right-style", "border-right-width", "border-spacing", "border-style", "border-top", "border-top-color", "border-top-left-radius", "border-top-right-radius", "border-top-style", "border-top-width", "border-width", "bottom", "box-decoration-break", "box-shadow", "box-sizing", "break-after", "break-before", "break-inside", "caption-side", "clear", "clip", "color", "color-profile", "column-count", "column-fill", "column-gap", "column-rule", "column-rule-color", "column-rule-style", "column-rule-width", "column-span", "column-width", "columns", "content", "counter-increment", "counter-reset", "crop", "cue", "cue-after", "cue-before", "cursor", "direction", "display", "dominant-baseline", "drop-initial-after-adjust", "drop-initial-after-align", "drop-initial-before-adjust", "drop-initial-before-align", "drop-initial-size", "drop-initial-value", "elevation", "empty-cells", "fit", "fit-position", "flex", "flex-basis", "flex-direction", "flex-flow", "flex-grow", "flex-shrink", "flex-wrap", "float", "float-offset", "flow-from", "flow-into", "font", "font-feature-settings", "font-family", "font-kerning", "font-language-override", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-synthesis", "font-variant", "font-variant-alternates", "font-variant-caps", "font-variant-east-asian", "font-variant-ligatures", "font-variant-numeric", "font-variant-position", "font-weight", "grid", "grid-area", "grid-auto-columns", "grid-auto-flow", "grid-auto-position", "grid-auto-rows", "grid-column", "grid-column-end", "grid-column-start", "grid-row", "grid-row-end", "grid-row-start", "grid-template", "grid-template-areas", "grid-template-columns", "grid-template-rows", "hanging-punctuation", "height", "hyphens", "icon", "image-orientation", "image-rendering", "image-resolution", "inline-box-align", "justify-content", "left", "letter-spacing", "line-break", "line-height", "line-stacking", "line-stacking-ruby", "line-stacking-shift", "line-stacking-strategy", "list-style", "list-style-image", "list-style-position", "list-style-type", "margin", "margin-bottom", "margin-left", "margin-right", "margin-top", "marker-offset", "marks", "marquee-direction", "marquee-loop", "marquee-play-count", "marquee-speed", "marquee-style", "max-height", "max-width", "min-height", "min-width", "move-to", "nav-down", "nav-index", "nav-left", "nav-right", "nav-up", "object-fit", "object-position", "opacity", "order", "orphans", "outline", "outline-color", "outline-offset", "outline-style", "outline-width", "overflow", "overflow-style", "overflow-wrap", "overflow-x", "overflow-y", "padding", "padding-bottom", "padding-left", "padding-right", "padding-top", "page", "page-break-after", "page-break-before", "page-break-inside", "page-policy", "pause", "pause-after", "pause-before", "perspective", "perspective-origin", "pitch", "pitch-range", "play-during", "position", "presentation-level", "punctuation-trim", "quotes", "region-break-after", "region-break-before", "region-break-inside", "region-fragment", "rendering-intent", "resize", "rest", "rest-after", "rest-before", "richness", "right", "rotation", "rotation-point", "ruby-align", "ruby-overhang", "ruby-position", "ruby-span", "shape-image-threshold", "shape-inside", "shape-margin", "shape-outside", "size", "speak", "speak-as", "speak-header", "speak-numeral", "speak-punctuation", "speech-rate", "stress", "string-set", "tab-size", "table-layout", "target", "target-name", "target-new", "target-position", "text-align", "text-align-last", "text-decoration", "text-decoration-color", "text-decoration-line", "text-decoration-skip", "text-decoration-style", "text-emphasis", "text-emphasis-color", "text-emphasis-position", "text-emphasis-style", "text-height", "text-indent", "text-justify", "text-outline", "text-overflow", "text-shadow", "text-size-adjust", "text-space-collapse", "text-transform", "text-underline-position", "text-wrap", "top", "transform", "transform-origin", "transform-style", "transition", "transition-delay", "transition-duration", "transition-property", "transition-timing-function", "unicode-bidi", "vertical-align", "visibility", "voice-balance", "voice-duration", "voice-family", "voice-pitch", "voice-range", "voice-rate", "voice-stress", "voice-volume", "volume", "white-space", "widows", "width", "word-break", "word-spacing", "word-wrap", "z-index", "clip-path", "clip-rule", "mask", "enable-background", "filter", "flood-color", "flood-opacity", "lighting-color", "stop-color", "stop-opacity", "pointer-events", "color-interpolation", "color-interpolation-filters", "color-rendering", "fill", "fill-opacity", "fill-rule", "image-rendering", "marker", "marker-end", "marker-mid", "marker-start", "shape-rendering", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "text-rendering", "baseline-shift", "dominant-baseline", "glyph-orientation-horizontal", "glyph-orientation-vertical", "text-anchor", "writing-mode"],
            d = t(f),
            p = ["scrollbar-arrow-color", "scrollbar-base-color", "scrollbar-dark-shadow-color", "scrollbar-face-color", "scrollbar-highlight-color", "scrollbar-shadow-color", "scrollbar-3d-light-color", "scrollbar-track-color", "shape-inside", "searchfield-cancel-button", "searchfield-decoration", "searchfield-results-button", "searchfield-results-decoration", "zoom"],
            h = t(p),
            m = ["font-family", "src", "unicode-range", "font-variant", "font-feature-settings", "font-stretch", "font-weight", "font-style"],
            g = t(m),
            v = ["additive-symbols", "fallback", "negative", "pad", "prefix", "range", "speak-as", "suffix", "symbols", "system"],
            y = t(v),
            _ = ["aliceblue", "antiquewhite", "aqua", "aquamarine", "azure", "beige", "bisque", "black", "blanchedalmond", "blue", "blueviolet", "brown", "burlywood", "cadetblue", "chartreuse", "chocolate", "coral", "cornflowerblue", "cornsilk", "crimson", "cyan", "darkblue", "darkcyan", "darkgoldenrod", "darkgray", "darkgreen", "darkkhaki", "darkmagenta", "darkolivegreen", "darkorange", "darkorchid", "darkred", "darksalmon", "darkseagreen", "darkslateblue", "darkslategray", "darkturquoise", "darkviolet", "deeppink", "deepskyblue", "dimgray", "dodgerblue", "firebrick", "floralwhite", "forestgreen", "fuchsia", "gainsboro", "ghostwhite", "gold", "goldenrod", "gray", "grey", "green", "greenyellow", "honeydew", "hotpink", "indianred", "indigo", "ivory", "khaki", "lavender", "lavenderblush", "lawngreen", "lemonchiffon", "lightblue", "lightcoral", "lightcyan", "lightgoldenrodyellow", "lightgray", "lightgreen", "lightpink", "lightsalmon", "lightseagreen", "lightskyblue", "lightslategray", "lightsteelblue", "lightyellow", "lime", "limegreen", "linen", "magenta", "maroon", "mediumaquamarine", "mediumblue", "mediumorchid", "mediumpurple", "mediumseagreen", "mediumslateblue", "mediumspringgreen", "mediumturquoise", "mediumvioletred", "midnightblue", "mintcream", "mistyrose", "moccasin", "navajowhite", "navy", "oldlace", "olive", "olivedrab", "orange", "orangered", "orchid", "palegoldenrod", "palegreen", "paleturquoise", "palevioletred", "papayawhip", "peachpuff", "peru", "pink", "plum", "powderblue", "purple", "rebeccapurple", "red", "rosybrown", "royalblue", "saddlebrown", "salmon", "sandybrown", "seagreen", "seashell", "sienna", "silver", "skyblue", "slateblue", "slategray", "snow", "springgreen", "steelblue", "tan", "teal", "thistle", "tomato", "turquoise", "violet", "wheat", "white", "whitesmoke", "yellow", "yellowgreen"],
            b = t(_),
            w = ["above", "absolute", "activeborder", "additive", "activecaption", "afar", "after-white-space", "ahead", "alias", "all", "all-scroll", "alphabetic", "alternate", "always", "amharic", "amharic-abegede", "antialiased", "appworkspace", "arabic-indic", "armenian", "asterisks", "attr", "auto", "avoid", "avoid-column", "avoid-page", "avoid-region", "background", "backwards", "baseline", "below", "bidi-override", "binary", "bengali", "blink", "block", "block-axis", "bold", "bolder", "border", "border-box", "both", "bottom", "break", "break-all", "break-word", "bullets", "button", "button-bevel", "buttonface", "buttonhighlight", "buttonshadow", "buttontext", "calc", "cambodian", "capitalize", "caps-lock-indicator", "caption", "captiontext", "caret", "cell", "center", "checkbox", "circle", "cjk-decimal", "cjk-earthly-branch", "cjk-heavenly-stem", "cjk-ideographic", "clear", "clip", "close-quote", "col-resize", "collapse", "color", "color-burn", "color-dodge", "column", "column-reverse", "compact", "condensed", "contain", "content", "content-box", "context-menu", "continuous", "copy", "counter", "counters", "cover", "crop", "cross", "crosshair", "currentcolor", "cursive", "cyclic", "darken", "dashed", "decimal", "decimal-leading-zero", "default", "default-button", "destination-atop", "destination-in", "destination-out", "destination-over", "devanagari", "difference", "disc", "discard", "disclosure-closed", "disclosure-open", "document", "dot-dash", "dot-dot-dash", "dotted", "double", "down", "e-resize", "ease", "ease-in", "ease-in-out", "ease-out", "element", "ellipse", "ellipsis", "embed", "end", "ethiopic", "ethiopic-abegede", "ethiopic-abegede-am-et", "ethiopic-abegede-gez", "ethiopic-abegede-ti-er", "ethiopic-abegede-ti-et", "ethiopic-halehame-aa-er", "ethiopic-halehame-aa-et", "ethiopic-halehame-am-et", "ethiopic-halehame-gez", "ethiopic-halehame-om-et", "ethiopic-halehame-sid-et", "ethiopic-halehame-so-et", "ethiopic-halehame-ti-er", "ethiopic-halehame-ti-et", "ethiopic-halehame-tig", "ethiopic-numeric", "ew-resize", "exclusion", "expanded", "extends", "extra-condensed", "extra-expanded", "fantasy", "fast", "fill", "fixed", "flat", "flex", "flex-end", "flex-start", "footnotes", "forwards", "from", "geometricPrecision", "georgian", "graytext", "groove", "gujarati", "gurmukhi", "hand", "hangul", "hangul-consonant", "hard-light", "hebrew", "help", "hidden", "hide", "higher", "highlight", "highlighttext", "hiragana", "hiragana-iroha", "horizontal", "hsl", "hsla", "hue", "icon", "ignore", "inactiveborder", "inactivecaption", "inactivecaptiontext", "infinite", "infobackground", "infotext", "inherit", "initial", "inline", "inline-axis", "inline-block", "inline-flex", "inline-table", "inset", "inside", "intrinsic", "invert", "italic", "japanese-formal", "japanese-informal", "justify", "kannada", "katakana", "katakana-iroha", "keep-all", "khmer", "korean-hangul-formal", "korean-hanja-formal", "korean-hanja-informal", "landscape", "lao", "large", "larger", "left", "level", "lighter", "lighten", "line-through", "linear", "linear-gradient", "lines", "list-item", "listbox", "listitem", "local", "logical", "loud", "lower", "lower-alpha", "lower-armenian", "lower-greek", "lower-hexadecimal", "lower-latin", "lower-norwegian", "lower-roman", "lowercase", "ltr", "luminosity", "malayalam", "match", "matrix", "matrix3d", "media-controls-background", "media-current-time-display", "media-fullscreen-button", "media-mute-button", "media-play-button", "media-return-to-realtime-button", "media-rewind-button", "media-seek-back-button", "media-seek-forward-button", "media-slider", "media-sliderthumb", "media-time-remaining-display", "media-volume-slider", "media-volume-slider-container", "media-volume-sliderthumb", "medium", "menu", "menulist", "menulist-button", "menulist-text", "menulist-textfield", "menutext", "message-box", "middle", "min-intrinsic", "mix", "mongolian", "monospace", "move", "multiple", "multiply", "myanmar", "n-resize", "narrower", "ne-resize", "nesw-resize", "no-close-quote", "no-drop", "no-open-quote", "no-repeat", "none", "normal", "not-allowed", "nowrap", "ns-resize", "numbers", "numeric", "nw-resize", "nwse-resize", "oblique", "octal", "open-quote", "optimizeLegibility", "optimizeSpeed", "oriya", "oromo", "outset", "outside", "outside-shape", "overlay", "overline", "padding", "padding-box", "painted", "page", "paused", "persian", "perspective", "plus-darker", "plus-lighter", "pointer", "polygon", "portrait", "pre", "pre-line", "pre-wrap", "preserve-3d", "progress", "push-button", "radial-gradient", "radio", "read-only", "read-write", "read-write-plaintext-only", "rectangle", "region", "relative", "repeat", "repeating-linear-gradient", "repeating-radial-gradient", "repeat-x", "repeat-y", "reset", "reverse", "rgb", "rgba", "ridge", "right", "rotate", "rotate3d", "rotateX", "rotateY", "rotateZ", "round", "row", "row-resize", "row-reverse", "rtl", "run-in", "running", "s-resize", "sans-serif", "saturation", "scale", "scale3d", "scaleX", "scaleY", "scaleZ", "screen", "scroll", "scrollbar", "se-resize", "searchfield", "searchfield-cancel-button", "searchfield-decoration", "searchfield-results-button", "searchfield-results-decoration", "semi-condensed", "semi-expanded", "separate", "serif", "show", "sidama", "simp-chinese-formal", "simp-chinese-informal", "single", "skew", "skewX", "skewY", "skip-white-space", "slide", "slider-horizontal", "slider-vertical", "sliderthumb-horizontal", "sliderthumb-vertical", "slow", "small", "small-caps", "small-caption", "smaller", "soft-light", "solid", "somali", "source-atop", "source-in", "source-out", "source-over", "space", "space-around", "space-between", "spell-out", "square", "square-button", "start", "static", "status-bar", "stretch", "stroke", "sub", "subpixel-antialiased", "super", "sw-resize", "symbolic", "symbols", "table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row", "table-row-group", "tamil", "telugu", "text", "text-bottom", "text-top", "textarea", "textfield", "thai", "thick", "thin", "threeddarkshadow", "threedface", "threedhighlight", "threedlightshadow", "threedshadow", "tibetan", "tigre", "tigrinya-er", "tigrinya-er-abegede", "tigrinya-et", "tigrinya-et-abegede", "to", "top", "trad-chinese-formal", "trad-chinese-informal", "translate", "translate3d", "translateX", "translateY", "translateZ", "transparent", "ultra-condensed", "ultra-expanded", "underline", "up", "upper-alpha", "upper-armenian", "upper-greek", "upper-hexadecimal", "upper-latin", "upper-norwegian", "upper-roman", "uppercase", "urdu", "url", "var", "vertical", "vertical-text", "visible", "visibleFill", "visiblePainted", "visibleStroke", "visual", "w-resize", "wait", "wave", "wider", "window", "windowframe", "windowtext", "words", "wrap", "wrap-reverse", "x-large", "x-small", "xor", "xx-large", "xx-small"],
            k = t(w),
            x = r.concat(o).concat(s).concat(c).concat(f).concat(p).concat(_).concat(w);
    e.registerHelper("hintWords", "css", x), e.defineMIME("text/css", {
        documentTypes: i,
        mediaTypes: a,
        mediaFeatures: l,
        mediaValueKeywords: u,
        propertyKeywords: d,
        nonStandardPropertyKeywords: h,
        fontProperties: g,
        counterDescriptors: y,
        colorKeywords: b,
        valueKeywords: k,
        tokenHooks: {
            "/": function (e, t) {
                return !!e.eat("*") && (t.tokenize = n, n(e, t))
            }
        },
        name: "css"
    }), e.defineMIME("text/x-scss", {
        mediaTypes: a,
        mediaFeatures: l,
        mediaValueKeywords: u,
        propertyKeywords: d,
        nonStandardPropertyKeywords: h,
        colorKeywords: b,
        valueKeywords: k,
        fontProperties: g,
        allowNested: !0,
        tokenHooks: {
            "/": function (e, t) {
                return e.eat("/") ? (e.skipToEnd(), ["comment", "comment"]) : e.eat("*") ? (t.tokenize = n, n(e, t)) : ["operator", "operator"]
            },
            ":": function (e) {
                return !!e.match(/\s*\{/) && [null, "{"]
            },
            $: function (e) {
                return e.match(/^[\w-]+/), e.match(/^\s*:/, !1) ? ["variable-2", "variable-definition"] : ["variable-2", "variable"]
            },
            "#": function (e) {
                return !!e.eat("{") && [null, "interpolation"]
            }
        },
        name: "css",
        helperType: "scss"
    }), e.defineMIME("text/x-less", {
        mediaTypes: a,
        mediaFeatures: l,
        mediaValueKeywords: u,
        propertyKeywords: d,
        nonStandardPropertyKeywords: h,
        colorKeywords: b,
        valueKeywords: k,
        fontProperties: g,
        allowNested: !0,
        tokenHooks: {
            "/": function (e, t) {
                return e.eat("/") ? (e.skipToEnd(), ["comment", "comment"]) : e.eat("*") ? (t.tokenize = n, n(e, t)) : ["operator", "operator"]
            },
            "@": function (e) {
                return e.eat("{") ? [null, "interpolation"] : !e.match(/^(charset|document|font-face|import|(-(moz|ms|o|webkit)-)?keyframes|media|namespace|page|supports)\b/, !1) && (e.eatWhile(/[\w\\\-]/), e.match(/^\s*:/, !1) ? ["variable-2", "variable-definition"] : ["variable-2", "variable"])
            },
            "&": function () {
                return ["atom", "atom"]
            }
        },
        name: "css",
        helperType: "less"
    }), e.defineMIME("text/x-gss", {
        documentTypes: i,
        mediaTypes: a,
        mediaFeatures: l,
        propertyKeywords: d,
        nonStandardPropertyKeywords: h,
        fontProperties: g,
        counterDescriptors: y,
        colorKeywords: b,
        valueKeywords: k,
        supportsAtComponent: !0,
        tokenHooks: {
            "/": function (e, t) {
                return !!e.eat("*") && (t.tokenize = n, n(e, t))
            }
        },
        name: "css",
        helperType: "gss"
    })
});
var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
    return typeof e
} : function (e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e
};
!function (e) {
    "object" == ("undefined" == typeof exports ? "undefined" : _typeof(exports)) && "object" == ("undefined" == typeof module ? "undefined" : _typeof(module)) ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
}(function (e) {
    e.defineMode("haskell", function (e, t) {
        function n(e, t, n) {
            return t(n), n(e, t)
        }

        function r(e, t) {
            if (e.eatWhile(m))
                return null;
            var r = e.next();
            if (h.test(r)) {
                if ("{" == r && e.eat("-")) {
                    var a = "comment";
                    return e.eat("#") && (a = "meta"), n(e, t, i(a, 1))
                }
                return null
            }
            if ("'" == r)
                return e.eat("\\") ? e.next() : e.next(), e.eat("'") ? "string" : "error";
            if ('"' == r)
                return n(e, t, o);
            if (l.test(r))
                return e.eatWhile(d), e.eat(".") ? "qualifier" : "variable-2";
            if (s.test(r))
                return e.eatWhile(d), "variable";
            if (c.test(r)) {
                if ("0" == r) {
                    if (e.eat(/[xX]/))
                        return e.eatWhile(u), "integer";
                    if (e.eat(/[oO]/))
                        return e.eatWhile(f), "number"
                }
                e.eatWhile(c);
                var a = "number";
                return e.match(/^\.\d+/) && (a = "number"), e.eat(/[eE]/) && (a = "number", e.eat(/[-+]/), e.eatWhile(c)), a
            }
            if ("." == r && e.eat("."))
                return "keyword";
            if (p.test(r)) {
                if ("-" == r && e.eat(/-/) && (e.eatWhile(/-/), !e.eat(p)))
                    return e.skipToEnd(), "comment";
                var a = "variable";
                return ":" == r && (a = "variable-2"), e.eatWhile(p), a
            }
            return "error"
        }

        function i(e, t) {
            return 0 == t ? r : function (n, o) {
                for (var a = t; !n.eol(); ) {
                    var s = n.next();
                    if ("{" == s && n.eat("-"))
                        ++a;
                    else if ("-" == s && n.eat("}") && (--a, 0 == a))
                        return o(r), e
                }
                return o(i(e, a)), e
            }
        }

        function o(e, t) {
            for (; !e.eol(); ) {
                var n = e.next();
                if ('"' == n)
                    return t(r), "string";
                if ("\\" == n) {
                    if (e.eol() || e.eat(m))
                        return t(a), "string";
                    e.eat("&") || e.next()
                }
            }
            return t(r), "error"
        }

        function a(e, t) {
            return e.eat("\\") ? n(e, t, o) : (e.next(), t(r), "error")
        }
        var s = /[a-z_]/,
                l = /[A-Z]/,
                c = /\d/,
                u = /[0-9A-Fa-f]/,
                f = /[0-7]/,
                d = /[a-z_A-Z0-9'\xa1-\uffff]/,
                p = /[-!#$%&*+.\/<=>?@\\^|~:]/,
                h = /[(),;[\]`{}]/,
                m = /[ \t\v\f]/,
                g = function () {
                    function e(e) {
                        return function () {
                            for (var t = 0; t < arguments.length; t++)
                                n[arguments[t]] = e
                        }
                    }
                    var n = {};
                    e("keyword")("case", "class", "data", "default", "deriving", "do", "else", "foreign", "if", "import", "in", "infix", "infixl", "infixr", "instance", "let", "module", "newtype", "of", "then", "type", "where", "_"), e("keyword")("..", ":", "::", "=", "\\", '"', "<-", "->", "@", "~", "=>"), e("builtin")("!!", "$!", "$", "&&", "+", "++", "-", ".", "/", "/=", "<", "<=", "=<<", "==", ">", ">=", ">>", ">>=", "^", "^^", "||", "*", "**"), e("builtin")("Bool", "Bounded", "Char", "Double", "EQ", "Either", "Enum", "Eq", "False", "FilePath", "Float", "Floating", "Fractional", "Functor", "GT", "IO", "IOError", "Int", "Integer", "Integral", "Just", "LT", "Left", "Maybe", "Monad", "Nothing", "Num", "Ord", "Ordering", "Rational", "Read", "ReadS", "Real", "RealFloat", "RealFrac", "Right", "Show", "ShowS", "String", "True"), e("builtin")("abs", "acos", "acosh", "all", "and", "any", "appendFile", "asTypeOf", "asin", "asinh", "atan", "atan2", "atanh", "break", "catch", "ceiling", "compare", "concat", "concatMap", "const", "cos", "cosh", "curry", "cycle", "decodeFloat", "div", "divMod", "drop", "dropWhile", "either", "elem", "encodeFloat", "enumFrom", "enumFromThen", "enumFromThenTo", "enumFromTo", "error", "even", "exp", "exponent", "fail", "filter", "flip", "floatDigits", "floatRadix", "floatRange", "floor", "fmap", "foldl", "foldl1", "foldr", "foldr1", "fromEnum", "fromInteger", "fromIntegral", "fromRational", "fst", "gcd", "getChar", "getContents", "getLine", "head", "id", "init", "interact", "ioError", "isDenormalized", "isIEEE", "isInfinite", "isNaN", "isNegativeZero", "iterate", "last", "lcm", "length", "lex", "lines", "log", "logBase", "lookup", "map", "mapM", "mapM_", "max", "maxBound", "maximum", "maybe", "min", "minBound", "minimum", "mod", "negate", "not", "notElem", "null", "odd", "or", "otherwise", "pi", "pred", "print", "product", "properFraction", "putChar", "putStr", "putStrLn", "quot", "quotRem", "read", "readFile", "readIO", "readList", "readLn", "readParen", "reads", "readsPrec", "realToFrac", "recip", "rem", "repeat", "replicate", "return", "reverse", "round", "scaleFloat", "scanl", "scanl1", "scanr", "scanr1", "seq", "sequence", "sequence_", "show", "showChar", "showList", "showParen", "showString", "shows", "showsPrec", "significand", "signum", "sin", "sinh", "snd", "span", "splitAt", "sqrt", "subtract", "succ", "sum", "tail", "take", "takeWhile", "tan", "tanh", "toEnum", "toInteger", "toRational", "truncate", "uncurry", "undefined", "unlines", "until", "unwords", "unzip", "unzip3", "userError", "words", "writeFile", "zip", "zip3", "zipWith", "zipWith3");
                    var r = t.overrideKeywords;
                    if (r)
                        for (var i in r)
                            r.hasOwnProperty(i) && (n[i] = r[i]);
                    return n
                }();
        return {
            startState: function () {
                return {
                    f: r
                }
            },
            copyState: function (e) {
                return {
                    f: e.f
                }
            },
            token: function (e, t) {
                var n = t.f(e, function (e) {
                    t.f = e
                }),
                        r = e.current();
                return g.hasOwnProperty(r) ? g[r] : n
            },
            blockCommentStart: "{-",
            blockCommentEnd: "-}",
            lineComment: "--"
        }
    }), e.defineMIME("text/x-haskell", "haskell")
});
var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
    return typeof e
} : function (e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e
};
!function (e) {
    e(CodeMirror)
}(function (e) {
    function t(e, t, n) {
        return /^(?:operator|sof|keyword c|case|new|[\[{}\(,;:]|=>)$/.test(t.lastType) || "quasi" == t.lastType && /\{\s*$/.test(e.string.slice(0, e.pos - (n || 0)))
    }
    e.defineMode("javascript", function (n, r) {
        function i(e) {
            for (var t, n = !1, r = !1; null != (t = e.next()); ) {
                if (!n) {
                    if ("/" == t && !r)
                        return;
                    "[" == t ? r = !0 : r && "]" == t && (r = !1)
                }
                n = !n && "\\" == t
            }
        }

        function o(e, t, n) {
            return be = e, we = n, t
        }

        function a(e, n) {
            var r = e.next();
            if ('"' == r || "'" == r)
                return n.tokenize = s(r), n.tokenize(e, n);
            if ("." == r && e.match(/^\d+(?:[eE][+\-]?\d+)?/))
                return o("number", "number");
            if ("." == r && e.match(".."))
                return o("spread", "meta");
            if (/[\[\]{}\(\),;\:\.]/.test(r))
                return o(r);
            if ("=" == r && e.eat(">"))
                return o("=>", "operator");
            if ("0" == r && e.eat(/x/i))
                return e.eatWhile(/[\da-f]/i), o("number", "number");
            if ("0" == r && e.eat(/o/i))
                return e.eatWhile(/[0-7]/i), o("number", "number");
            if ("0" == r && e.eat(/b/i))
                return e.eatWhile(/[01]/i), o("number", "number");
            if (/\d/.test(r))
                return e.match(/^\d*(?:\.\d*)?(?:[eE][+\-]?\d+)?/), o("number", "number");
            if ("/" == r)
                return e.eat("*") ? (n.tokenize = l, l(e, n)) : e.eat("/") ? (e.skipToEnd(), o("comment", "comment")) : t(e, n, 1) ? (i(e), e.match(/^\b(([gimyu])(?![gimyu]*\2))+\b/), o("regexp", "string-2")) : (e.eatWhile(Ae), o("operator", "operator", e.current()));
            if ("`" == r)
                return n.tokenize = c, c(e, n);
            if ("#" == r)
                return e.skipToEnd(), o("error", "error");
            if (Ae.test(r))
                return e.eatWhile(Ae), o("operator", "operator", e.current());
            if (Me.test(r)) {
                e.eatWhile(Me);
                var a = e.current(),
                        u = Te.propertyIsEnumerable(a) && Te[a];
                return u && "." != n.lastType ? o(u.type, u.style, a) : o("variable", "variable", a)
            }
        }

        function s(e) {
            return function (t, n) {
                var r, i = !1;
                if (Ce && "@" == t.peek() && t.match(Ee))
                    return n.tokenize = a, o("jsonld-keyword", "meta");
                for (; null != (r = t.next()) && (r != e || i); )
                    i = !i && "\\" == r;
                return i || (n.tokenize = a), o("string", "string")
            }
        }

        function l(e, t) {
            for (var n, r = !1; n = e.next(); ) {
                if ("/" == n && r) {
                    t.tokenize = a;
                    break
                }
                r = "*" == n
            }
            return o("comment", "comment")
        }

        function c(e, t) {
            for (var n, r = !1; null != (n = e.next()); ) {
                if (!r && ("`" == n || "$" == n && e.eat("{"))) {
                    t.tokenize = a;
                    break
                }
                r = !r && "\\" == n
            }
            return o("quasi", "string-2", e.current())
        }

        function u(e, t) {
            t.fatArrowAt && (t.fatArrowAt = null);
            var n = e.string.indexOf("=>", e.start);
            if (!(n < 0)) {
                for (var r = 0, i = !1, o = n - 1; o >= 0; --o) {
                    var a = e.string.charAt(o),
                            s = Oe.indexOf(a);
                    if (s >= 0 && s < 3) {
                        if (!r) {
                            ++o;
                            break
                        }
                        if (0 == --r)
                            break
                    } else if (s >= 3 && s < 6)
                        ++r;
                    else if (Me.test(a))
                        i = !0;
                    else {
                        if (/["'\/]/.test(a))
                            return;
                        if (i && !r) {
                            ++o;
                            break
                        }
                    }
                }
                i && !r && (t.fatArrowAt = o)
            }
        }

        function f(e, t, n, r, i, o) {
            this.indented = e, this.column = t, this.type = n, this.prev = i, this.info = o, null != r && (this.align = r)
        }

        function d(e, t) {
            for (var n = e.localVars; n; n = n.next)
                if (n.name == t)
                    return !0;
            for (var r = e.context; r; r = r.prev)
                for (var n = r.vars; n; n = n.next)
                    if (n.name == t)
                        return !0
        }

        function p(e, t, n, r, i) {
            var o = e.cc;
            for (Re.state = e, Re.stream = i, Re.marked = null, Re.cc = o, Re.style = t, e.lexical.hasOwnProperty("align") || (e.lexical.align = !0); ; ) {
                var a = o.length ? o.pop() : Se ? x : k;
                if (a(n, r)) {
                    for (; o.length && o[o.length - 1].lex; )
                        o.pop()();
                    return Re.marked ? Re.marked : "variable" == n && d(e, r) ? "variable-2" : t
                }
            }
        }

        function h() {
            for (var e = arguments.length - 1; e >= 0; e--)
                Re.cc.push(arguments[e])
        }

        function m() {
            return h.apply(null, arguments), !0
        }

        function g(e) {
            function t(t) {
                for (var n = t; n; n = n.next)
                    if (n.name == e)
                        return !0;
                return !1
            }
            var n = Re.state;
            if (Re.marked = "def", n.context) {
                if (t(n.localVars))
                    return;
                n.localVars = {
                    name: e,
                    next: n.localVars
                }
            } else {
                if (t(n.globalVars))
                    return;
                r.globalVars && (n.globalVars = {
                    name: e,
                    next: n.globalVars
                })
            }
        }

        function v() {
            Re.state.context = {
                prev: Re.state.context,
                vars: Re.state.localVars
            }, Re.state.localVars = Ne
        }

        function y() {
            Re.state.localVars = Re.state.context.vars, Re.state.context = Re.state.context.prev
        }

        function _(e, t) {
            var n = function () {
                var n = Re.state,
                        r = n.indented;
                if ("stat" == n.lexical.type)
                    r = n.lexical.indented;
                else
                    for (var i = n.lexical; i && ")" == i.type && i.align; i = i.prev)
                        r = i.indented;
                n.lexical = new f(r, Re.stream.column(), e, null, n.lexical, t)
            };
            return n.lex = !0, n
        }

        function b() {
            var e = Re.state;
            e.lexical.prev && (")" == e.lexical.type && (e.indented = e.lexical.indented), e.lexical = e.lexical.prev)
        }

        function w(e) {
            function t(n) {
                return n == e ? m() : ";" == e ? h() : m(t)
            }
            return t
        }

        function k(e, t) {
            return "var" == e ? m(_("vardef", t.length), G, w(";"), b) : "keyword a" == e ? m(_("form"), x, k, b) : "keyword b" == e ? m(_("form"), k, b) : "{" == e ? m(_("}"), $, b) : ";" == e ? m() : "if" == e ? ("else" == Re.state.lexical.info && Re.state.cc[Re.state.cc.length - 1] == b && Re.state.cc.pop()(), m(_("form"), x, k, b, J)) : "function" == e ? m(oe) : "for" == e ? m(_("form"), ee, k, b) : "variable" == e ? m(_("stat"), D) : "switch" == e ? m(_("form"), x, _("}", "switch"), w("{"), $, b, b) : "case" == e ? m(x, w(":")) : "default" == e ? m(w(":")) : "catch" == e ? m(_("form"), v, w("("), ae, w(")"), k, b, y) : "class" == e ? m(_("form"), se, b) : "export" == e ? m(_("stat"), fe, b) : "import" == e ? m(_("stat"), de, b) : "module" == e ? m(_("form"), X, _("}"), w("{"), $, b, b) : h(_("stat"), x, w(";"), b)
        }

        function x(e) {
            return S(e, !1)
        }

        function C(e) {
            return S(e, !0)
        }

        function S(e, t) {
            if (Re.state.fatArrowAt == Re.stream.start) {
                var n = t ? R : I;
                if ("(" == e)
                    return m(v, _(")"), q(X, ")"), b, w("=>"), n, y);
                if ("variable" == e)
                    return h(v, X, w("=>"), n, y)
            }
            var r = t ? A : T;
            return Ie.hasOwnProperty(e) ? m(r) : "function" == e ? m(oe, r) : "keyword c" == e ? m(t ? M : L) : "(" == e ? m(_(")"), L, ye, w(")"), b, r) : "operator" == e || "spread" == e ? m(t ? C : x) : "[" == e ? m(_("]"), ge, b, r) : "{" == e ? U(W, "}", null, r) : "quasi" == e ? h(E, r) : "new" == e ? m(N(t)) : m()
        }

        function L(e) {
            return e.match(/[;\}\)\],]/) ? h() : h(x)
        }

        function M(e) {
            return e.match(/[;\}\)\],]/) ? h() : h(C)
        }

        function T(e, t) {
            return "," == e ? m(x) : A(e, t, !1)
        }

        function A(e, t, n) {
            var r = 0 == n ? T : A,
                    i = 0 == n ? x : C;
            return "=>" == e ? m(v, n ? R : I, y) : "operator" == e ? /\+\+|--/.test(t) ? m(r) : "?" == t ? m(x, w(":"), i) : m(i) : "quasi" == e ? h(E, r) : ";" != e ? "(" == e ? U(C, ")", "call", r) : "." == e ? m(F, r) : "[" == e ? m(_("]"), L, w("]"), b, r) : void 0 : void 0
        }

        function E(e, t) {
            return "quasi" != e ? h() : "${" != t.slice(t.length - 2) ? m(E) : m(x, O)
        }

        function O(e) {
            if ("}" == e)
                return Re.marked = "string-2", Re.state.tokenize = c, m(E)
        }

        function I(e) {
            return u(Re.stream, Re.state), h("{" == e ? k : x)
        }

        function R(e) {
            return u(Re.stream, Re.state), h("{" == e ? k : C)
        }

        function N(e) {
            return function (t) {
                return "." == t ? m(e ? z : P) : h(e ? C : x)
            }
        }

        function P(e, t) {
            if ("target" == t)
                return Re.marked = "keyword", m(T)
        }

        function z(e, t) {
            if ("target" == t)
                return Re.marked = "keyword", m(A)
        }

        function D(e) {
            return ":" == e ? m(b, k) : h(T, w(";"), b)
        }

        function F(e) {
            if ("variable" == e)
                return Re.marked = "property", m()
        }

        function W(e, t) {
            return "variable" == e || "keyword" == Re.style ? (Re.marked = "property", m("get" == t || "set" == t ? H : B)) : "number" == e || "string" == e ? (Re.marked = Ce ? "property" : Re.style + " property", m(B)) : "jsonld-keyword" == e ? m(B) : "modifier" == e ? m(W) : "[" == e ? m(x, w("]"), B) : "spread" == e ? m(x) : void 0
        }

        function H(e) {
            return "variable" != e ? h(B) : (Re.marked = "property", m(oe))
        }

        function B(e) {
            return ":" == e ? m(C) : "(" == e ? h(oe) : void 0
        }

        function q(e, t) {
            function n(r) {
                if ("," == r) {
                    var i = Re.state.lexical;
                    return "call" == i.info && (i.pos = (i.pos || 0) + 1), m(e, n)
                }
                return r == t ? m() : m(w(t))
            }
            return function (r) {
                return r == t ? m() : h(e, n)
            }
        }

        function U(e, t, n) {
            for (var r = 3; r < arguments.length; r++)
                Re.cc.push(arguments[r]);
            return m(_(t, n), q(e, t), b)
        }

        function $(e) {
            return "}" == e ? m() : h(k, $)
        }

        function j(e) {
            if (Le && ":" == e)
                return m(V)
        }

        function K(e, t) {
            if ("=" == t)
                return m(C)
        }

        function V(e) {
            if ("variable" == e)
                return Re.marked = "variable-3", m()
        }

        function G() {
            return h(X, j, Z, Q)
        }

        function X(e, t) {
            return "modifier" == e ? m(X) : "variable" == e ? (g(t), m()) : "spread" == e ? m(X) : "[" == e ? U(X, "]") : "{" == e ? U(Y, "}") : void 0
        }

        function Y(e, t) {
            return "variable" != e || Re.stream.match(/^\s*:/, !1) ? ("variable" == e && (Re.marked = "property"), "spread" == e ? m(X) : "}" == e ? h() : m(w(":"), X, Z)) : (g(t), m(Z))
        }

        function Z(e, t) {
            if ("=" == t)
                return m(C)
        }

        function Q(e) {
            if ("," == e)
                return m(G)
        }

        function J(e, t) {
            if ("keyword b" == e && "else" == t)
                return m(_("form", "else"), k, b)
        }

        function ee(e) {
            if ("(" == e)
                return m(_(")"), te, w(")"), b)
        }

        function te(e) {
            return "var" == e ? m(G, w(";"), re) : ";" == e ? m(re) : "variable" == e ? m(ne) : h(x, w(";"), re)
        }

        function ne(e, t) {
            return "in" == t || "of" == t ? (Re.marked = "keyword", m(x)) : m(T, re)
        }

        function re(e, t) {
            return ";" == e ? m(ie) : "in" == t || "of" == t ? (Re.marked = "keyword", m(x)) : h(x, w(";"), ie)
        }

        function ie(e) {
            ")" != e && m(x)
        }

        function oe(e, t) {
            return "*" == t ? (Re.marked = "keyword", m(oe)) : "variable" == e ? (g(t), m(oe)) : "(" == e ? m(v, _(")"), q(ae, ")"), b, k, y) : void 0
        }

        function ae(e) {
            return "spread" == e ? m(ae) : h(X, j, K)
        }

        function se(e, t) {
            if ("variable" == e)
                return g(t), m(le)
        }

        function le(e, t) {
            return "extends" == t ? m(x, le) : "{" == e ? m(_("}"), ce, b) : void 0
        }

        function ce(e, t) {
            return "variable" == e || "keyword" == Re.style ? "static" == t ? (Re.marked = "keyword", m(ce)) : (Re.marked = "property", "get" == t || "set" == t ? m(ue, oe, ce) : m(oe, ce)) : "*" == t ? (Re.marked = "keyword", m(ce)) : ";" == e ? m(ce) : "}" == e ? m() : void 0
        }

        function ue(e) {
            return "variable" != e ? h() : (Re.marked = "property", m())
        }

        function fe(e, t) {
            return "*" == t ? (Re.marked = "keyword", m(me, w(";"))) : "default" == t ? (Re.marked = "keyword", m(x, w(";"))) : h(k)
        }

        function de(e) {
            return "string" == e ? m() : h(pe, me)
        }

        function pe(e, t) {
            return "{" == e ? U(pe, "}") : ("variable" == e && g(t), "*" == t && (Re.marked = "keyword"), m(he))
        }

        function he(e, t) {
            if ("as" == t)
                return Re.marked = "keyword", m(pe)
        }

        function me(e, t) {
            if ("from" == t)
                return Re.marked = "keyword", m(x)
        }

        function ge(e) {
            return "]" == e ? m() : h(C, ve)
        }

        function ve(e) {
            return "for" == e ? h(ye, w("]")) : "," == e ? m(q(M, "]")) : h(q(C, "]"))
        }

        function ye(e) {
            return "for" == e ? m(ee, ye) : "if" == e ? m(x, ye) : void 0
        }

        function _e(e, t) {
            return "operator" == e.lastType || "," == e.lastType || Ae.test(t.charAt(0)) || /[,.]/.test(t.charAt(0))
        }
        var be, we, ke = n.indentUnit,
                xe = r.statementIndent,
                Ce = r.jsonld,
                Se = r.json || Ce,
                Le = r.typescript,
                Me = r.wordCharacters || /[\w$\xa1-\uffff]/,
                Te = function () {
                    function e(e) {
                        return {
                            type: e,
                            style: "keyword"
                        }
                    }
                    var t = e("keyword a"),
                            n = e("keyword b"),
                            r = e("keyword c"),
                            i = e("operator"),
                            o = {
                                type: "atom",
                                style: "atom"
                            },
                            a = {
                                if : e("if"),
                                while : t,
                                with : t,
                                else: n,
                                do: n,
                                try: n,
                                finally: n,
                                return: r,
                                break: r,
                                continue: r,
                                new : e("new"),
                                delete: r,
                                throw: r,
                                debugger: r,
                                var : e("var"),
                                const: e("var"),
                                let: e("var"),
                                function: e("function"),
                                catch : e("catch"),
                                for : e("for"),
                                switch : e("switch"),
                                case: e("case"),
                                default: e("default"),
                                in: i,
                                typeof : i,
                                instanceof: i,
                                true: o,
                                false: o,
                                null: o,
                                undefined: o,
                                NaN: o,
                                Infinity: o,
                                this: e("this"),
                                class: e("class"),
                                super: e("atom"),
                                yield: r,
                                export: e("export"),
                                import: e("import"),
                                extends: r
                            };
                    if (Le) {
                        var s = {
                            type: "variable",
                            style: "variable-3"
                        },
                                l = {
                                    interface: e("class"),
                                    implements: r,
                                    namespace: r,
                                    module: e("module"),
                                    enum: e("module"),
                                    public: e("modifier"),
                                    private: e("modifier"),
                                    protected: e("modifier"),
                                    abstract: e("modifier"),
                                    as: i,
                                    string: s,
                                    number: s,
                                    boolean: s,
                                    any: s
                                };
                        for (var c in l)
                            a[c] = l[c]
                    }
                    return a
                }(),
                Ae = /[+\-*&%=<>!?|~^]/,
                Ee = /^@(context|id|value|language|type|container|list|set|reverse|index|base|vocab|graph)"/,
                Oe = "([{}])",
                Ie = {
                    atom: !0,
                    number: !0,
                    variable: !0,
                    string: !0,
                    regexp: !0,
                    this: !0,
                    "jsonld-keyword": !0
                },
                Re = {
                    state: null,
                    column: null,
                    marked: null,
                    cc: null
                },
                Ne = {
                    name: "this",
                    next: {
                        name: "arguments"
                    }
                };
        return b.lex = !0, {
            startState: function (e) {
                var t = {
                    tokenize: a,
                    lastType: "sof",
                    cc: [],
                    lexical: new f((e || 0) - ke, 0, "block", (!1)),
                    localVars: r.localVars,
                    context: r.localVars && {
                        vars: r.localVars
                    },
                    indented: e || 0
                };
                return r.globalVars && "object" == _typeof(r.globalVars) && (t.globalVars = r.globalVars), t
            },
            token: function (e, t) {
                if (e.sol() && (t.lexical.hasOwnProperty("align") || (t.lexical.align = !1), t.indented = e.indentation(), u(e, t)), t.tokenize != l && e.eatSpace())
                    return null;
                var n = t.tokenize(e, t);
                return "comment" == be ? n : (t.lastType = "operator" != be || "++" != we && "--" != we ? be : "incdec", p(t, n, be, we, e))
            },
            indent: function (t, n) {
                if (t.tokenize == l)
                    return e.Pass;
                if (t.tokenize != a)
                    return 0;
                var i = n && n.charAt(0),
                        o = t.lexical;
                if (!/^\s*else\b/.test(n))
                    for (var s = t.cc.length - 1; s >= 0; --s) {
                        var c = t.cc[s];
                        if (c == b)
                            o = o.prev;
                        else if (c != J)
                            break
                    }
                "stat" == o.type && "}" == i && (o = o.prev), xe && ")" == o.type && "stat" == o.prev.type && (o = o.prev);
                var u = o.type,
                        f = i == u;
                return "vardef" == u ? o.indented + ("operator" == t.lastType || "," == t.lastType ? o.info + 1 : 0) : "form" == u && "{" == i ? o.indented : "form" == u ? o.indented + ke : "stat" == u ? o.indented + (_e(t, n) ? xe || ke : 0) : "switch" != o.info || f || 0 == r.doubleIndentSwitch ? o.align ? o.column + (f ? 0 : 1) : o.indented + (f ? 0 : ke) : o.indented + (/^(?:case|default)\b/.test(n) ? ke : 2 * ke)
            },
            electricInput: /^\s*(?:case .*?:|default:|\{|\})$/,
            blockCommentStart: Se ? null : "/*",
            blockCommentEnd: Se ? null : "*/",
            lineComment: Se ? null : "//",
            fold: "brace",
            closeBrackets: "()[]{}''\"\"``",
            helperType: Se ? "json" : "javascript",
            jsonldMode: Ce,
            jsonMode: Se,
            expressionAllowed: t,
            skipExpression: function (e) {
                var t = e.cc[e.cc.length - 1];
                t != x && t != C || e.cc.pop()
            }
        }
    }), e.registerHelper("wordChars", "javascript", /[\w$]/), e.defineMIME("text/javascript", "javascript"), e.defineMIME("text/ecmascript", "javascript"), e.defineMIME("application/javascript", "javascript"), e.defineMIME("application/x-javascript", "javascript"), e.defineMIME("application/ecmascript", "javascript"), e.defineMIME("application/json", {
        name: "javascript",
        json: !0
    }), e.defineMIME("application/x-json", {
        name: "javascript",
        json: !0
    }), e.defineMIME("application/ld+json", {
        name: "javascript",
        jsonld: !0
    }), e.defineMIME("text/typescript", {
        name: "javascript",
        typescript: !0
    }), e.defineMIME("application/typescript", {
        name: "javascript",
        typescript: !0
    })
}),
        function (e) {
            e(CodeMirror)
        }(function (e) {
    function t(t, r) {
        function i(e) {
            if (e)
                for (var t in e)
                    e.hasOwnProperty(t) && a.push(t)
        }
        "string" == typeof t && (t = [t]);
        var o, a = [];
        if (o = r.extraWords)
            for (var s in o)
                o.hasOwnProperty(s) && (n[s] = o[s]);
        i(n), i(r.keywords), i(r.types), i(r.builtin), i(r.atoms), a.length && (r.helperType = t[0], e.registerHelper("hintWords", t[0], a));
        for (var l = 0; l < t.length; ++l)
            e.defineMIME(t[l], r)
    }
    var n = {
        let: "keyword",
        rec: "keyword",
        in: "keyword",
        of: "keyword",
        and: "keyword",
        if : "keyword",
        then: "keyword",
        else: "keyword",
        for : "keyword",
        to: "keyword",
        while : "keyword",
        do: "keyword",
        done: "keyword",
        fun: "keyword",
        function: "keyword",
        val: "keyword",
        type: "keyword",
        mutable: "keyword",
        match: "keyword",
        with : "keyword",
        try: "keyword",
        open: "builtin",
        ignore: "builtin",
        begin: "keyword",
        end: "keyword"
    };
    e.defineMode("mllike", function (e, t) {
        function r(e, r) {
            var a = e.next();
            if ('"' === a)
                return r.tokenize = i, r.tokenize(e, r);
            if ("(" === a && e.eat("*"))
                return r.commentLevel++, r.tokenize = o, r.tokenize(e, r);
            if ("~" === a)
                return e.eatWhile(/\w/), "variable-2";
            if ("`" === a)
                return e.eatWhile(/\w/), "quote";
            if ("/" === a && t.slashComments && e.eat("/"))
                return e.skipToEnd(), "comment";
            if (/\d/.test(a))
                return e.eatWhile(/[\d]/), e.eat(".") && e.eatWhile(/[\d]/), "number";
            if (/[+\-*&%=<>!?|]/.test(a))
                return "operator";
            e.eatWhile(/\w/);
            var s = e.current();
            return n.hasOwnProperty(s) ? n[s] : "variable"
        }

        function i(e, t) {
            for (var n, i = !1, o = !1; null != (n = e.next()); ) {
                if ('"' === n && !o) {
                    i = !0;
                    break
                }
                o = !o && "\\" === n
            }
            return i && !o && (t.tokenize = r), "string"
        }

        function o(e, t) {
            for (var n, i; t.commentLevel > 0 && null != (i = e.next()); )
                "(" === n && "*" === i && t.commentLevel++, "*" === n && ")" === i && t.commentLevel--, n = i;
            return t.commentLevel <= 0 && (t.tokenize = r), "comment"
        }
        return {
            startState: function () {
                return {
                    tokenize: r,
                    commentLevel: 0
                }
            },
            token: function (e, t) {
                return e.eatSpace() ? null : t.tokenize(e, t)
            },
            blockCommentStart: "(*",
            blockCommentEnd: "*)",
            lineComment: t.slashComments ? "//" : null
        }
    }), t("text/x-ocaml", {
        name: "mllike",
        extraWords: {
            succ: "keyword",
            trace: "builtin",
            exit: "builtin",
            print_string: "builtin",
            print_endline: "builtin",
            true: "atom",
            false: "atom",
            raise: "keyword"
        }
    }), t("text/x-fsharp", {
        name: "mllike",
        extraWords: {
            abstract: "keyword",
            as: "keyword",
            assert: "keyword",
            base: "keyword",
            class: "keyword",
            default: "keyword",
            delegate: "keyword",
            downcast: "keyword",
            downto: "keyword",
            elif: "keyword",
            exception: "keyword",
            extern: "keyword",
            finally: "keyword",
            global: "keyword",
            inherit: "keyword",
            inline: "keyword",
            interface: "keyword",
            internal: "keyword",
            lazy: "keyword",
            "let!": "keyword",
            member: "keyword",
            module: "keyword",
            namespace: "keyword",
            new : "keyword",
            null: "keyword",
            override: "keyword",
            private: "keyword",
            public: "keyword",
            return: "keyword",
            "return!": "keyword",
            select: "keyword",
            static: "keyword",
            struct: "keyword",
            upcast: "keyword",
            use: "keyword",
            "use!": "keyword",
            val: "keyword",
            when: "keyword",
            yield: "keyword",
            "yield!": "keyword",
            List: "builtin",
            Seq: "builtin",
            Map: "builtin",
            Set: "builtin",
            int: "builtin",
            string: "builtin",
            raise: "builtin",
            failwith: "builtin",
            not: "builtin",
            true: "builtin",
            false: "builtin"
        },
        slashComments: !0
    })
}), CodeMirror.defineMode("mysql", function (e) {
    function t(e) {
        return new RegExp("^(?:" + e.join("|") + ")$", "i")
    }

    function n(e, t) {
        var n = e.next();
        if (l = null, "$" == n || "?" == n)
            return e.match(/^[\w\d]*/), "variable-2";
        if ("<" != n || e.match(/^[\s\u00a0=]/, !1)) {
            if ('"' == n || "'" == n)
                return t.tokenize = r(n), t.tokenize(e, t);
            if ("`" == n)
                return t.tokenize = i(n), t.tokenize(e, t);
            if (/[{}\(\),\.;\[\]]/.test(n))
                return l = n, null;
            if ("-" == n && e.eat("-"))
                return e.skipToEnd(), "comment";
            if ("/" == n && e.eat("*"))
                return t.tokenize = o, t.tokenize(e, t);
            if (d.test(n))
                return e.eatWhile(d), null;
            if (":" == n)
                return e.eatWhile(/[\w\d\._\-]/), "atom";
            if (e.eatWhile(/[_\w\d]/), e.eat(":"))
                return e.eatWhile(/[\w\d_\-]/), "atom";
            var a = e.current();
            return u.test(a) ? null : f.test(a) ? "keyword" : "variable"
        }
        return e.match(/^[^\s\u00a0>]*>?/), "atom"
    }

    function r(e) {
        return function (t, r) {
            for (var i, o = !1; null != (i = t.next()); ) {
                if (i == e && !o) {
                    r.tokenize = n;
                    break
                }
                o = !o && "\\" == i
            }
            return "string"
        }
    }

    function i(e) {
        return function (t, r) {
            for (var i, o = !1; null != (i = t.next()); ) {
                if (i == e && !o) {
                    r.tokenize = n;
                    break
                }
                o = !o && "\\" == i
            }
            return "variable-2"
        }
    }

    function o(e, t) {
        for (; ; ) {
            if (!e.skipTo("*")) {
                e.skipToEnd();
                break
            }
            if (e.next(), e.eat("/")) {
                t.tokenize = n;
                break
            }
        }
        return "comment"
    }

    function a(e, t, n) {
        e.context = {
            prev: e.context,
            indent: e.indent,
            col: n,
            type: t
        }
    }

    function s(e) {
        e.indent = e.context.indent, e.context = e.context.prev
    }
    var l, c = e.indentUnit,
            u = t(["str", "lang", "langmatches", "datatype", "bound", "sameterm", "isiri", "isuri", "isblank", "isliteral", "union", "a"]),
            f = t(["ACCESSIBLE", "ALTER", "AS", "BEFORE", "BINARY", "BY", "CASE", "CHARACTER", "COLUMN", "CONTINUE", "CROSS", "CURRENT_TIMESTAMP", "DATABASE", "DAY_MICROSECOND", "DEC", "DEFAULT", "DESC", "DISTINCT", "DOUBLE", "EACH", "ENCLOSED", "EXIT", "FETCH", "FLOAT8", "FOREIGN", "GRANT", "HIGH_PRIORITY", "HOUR_SECOND", "IN", "INNER", "INSERT", "INT2", "INT8", "INTO", "JOIN", "KILL", "LEFT", "LINEAR", "LOCALTIME", "LONG", "LOOP", "MATCH", "MEDIUMTEXT", "MINUTE_SECOND", "NATURAL", "NULL", "OPTIMIZE", "OR", "OUTER", "PRIMARY", "RANGE", "READ_WRITE", "REGEXP", "REPEAT", "RESTRICT", "RIGHT", "SCHEMAS", "SENSITIVE", "SHOW", "SPECIFIC", "SQLSTATE", "SQL_CALC_FOUND_ROWS", "STARTING", "TERMINATED", "TINYINT", "TRAILING", "UNDO", "UNLOCK", "USAGE", "UTC_DATE", "VALUES", "VARCHARACTER", "WHERE", "WRITE", "ZEROFILL", "ALL", "AND", "ASENSITIVE", "BIGINT", "BOTH", "CASCADE", "CHAR", "COLLATE", "CONSTRAINT", "CREATE", "CURRENT_TIME", "CURSOR", "DAY_HOUR", "DAY_SECOND", "DECLARE", "DELETE", "DETERMINISTIC", "DIV", "DUAL", "ELSEIF", "EXISTS", "FALSE", "FLOAT4", "FORCE", "FULLTEXT", "HAVING", "HOUR_MINUTE", "IGNORE", "INFILE", "INSENSITIVE", "INT1", "INT4", "INTERVAL", "ITERATE", "KEYS", "LEAVE", "LIMIT", "LOAD", "LOCK", "LONGTEXT", "MASTER_SSL_VERIFY_SERVER_CERT", "MEDIUMINT", "MINUTE_MICROSECOND", "MODIFIES", "NO_WRITE_TO_BINLOG", "ON", "OPTIONALLY", "OUT", "PRECISION", "PURGE", "READS", "REFERENCES", "RENAME", "REQUIRE", "REVOKE", "SCHEMA", "SELECT", "SET", "SPATIAL", "SQLEXCEPTION", "SQL_BIG_RESULT", "SSL", "TABLE", "TINYBLOB", "TO", "TRUE", "UNIQUE", "UPDATE", "USING", "UTC_TIMESTAMP", "VARCHAR", "WHEN", "WITH", "YEAR_MONTH", "ADD", "ANALYZE", "ASC", "BETWEEN", "BLOB", "CALL", "CHANGE", "CHECK", "CONDITION", "CONVERT", "CURRENT_DATE", "CURRENT_USER", "DATABASES", "DAY_MINUTE", "DECIMAL", "DELAYED", "DESCRIBE", "DISTINCTROW", "DROP", "ELSE", "ESCAPED", "EXPLAIN", "FLOAT", "FOR", "FROM", "GROUP", "HOUR_MICROSECOND", "IF", "INDEX", "INOUT", "INT", "INT3", "INTEGER", "IS", "KEY", "LEADING", "LIKE", "LINES", "LOCALTIMESTAMP", "LONGBLOB", "LOW_PRIORITY", "MEDIUMBLOB", "MIDDLEINT", "MOD", "NOT", "NUMERIC", "OPTION", "ORDER", "OUTFILE", "PROCEDURE", "READ", "REAL", "RELEASE", "REPLACE", "RETURN", "RLIKE", "SECOND_MICROSECOND", "SEPARATOR", "SMALLINT", "SQL", "SQLWARNING", "SQL_SMALL_RESULT", "STRAIGHT_JOIN", "THEN", "TINYTEXT", "TRIGGER", "UNION", "UNSIGNED", "USE", "UTC_TIME", "VARBINARY", "VARYING", "WHILE", "XOR", "FULL", "COLUMNS", "MIN", "MAX", "STDEV", "COUNT"]),
            d = /[*+\-<>=&|]/;
    return {
        startState: function (e) {
            return {
                tokenize: n,
                context: null,
                indent: 0,
                col: 0
            }
        },
        token: function (e, t) {
            if (e.sol() && (t.context && null == t.context.align && (t.context.align = !1), t.indent = e.indentation()), e.eatSpace())
                return null;
            var n = t.tokenize(e, t);
            if ("comment" != n && t.context && null == t.context.align && "pattern" != t.context.type && (t.context.align = !0), "(" == l)
                a(t, ")", e.column());
            else if ("[" == l)
                a(t, "]", e.column());
            else if ("{" == l)
                a(t, "}", e.column());
            else if (/[\]\}\)]/.test(l)) {
                for (; t.context && "pattern" == t.context.type; )
                    s(t);
                t.context && l == t.context.type && s(t)
            } else
                "." == l && t.context && "pattern" == t.context.type ? s(t) : /atom|string|variable/.test(n) && t.context && (/[\}\]]/.test(t.context.type) ? a(t, "pattern", e.column()) : "pattern" != t.context.type || t.context.align || (t.context.align = !0, t.context.col = e.column()));
            return n
        },
        indent: function (e, t) {
            var n = t && t.charAt(0),
                    r = e.context;
            if (/[\]\}]/.test(n))
                for (; r && "pattern" == r.type; )
                    r = r.prev;
            var i = r && n == r.type;
            return r ? "pattern" == r.type ? r.col : r.align ? r.col + (i ? 0 : 1) : r.indent + (i ? 0 : c) : 0
        }
    }
}), CodeMirror.defineMIME("text/x-mysql", "mysql"),
        function (e) {
            e(CodeMirror)
        }(function (e) {
    function t(e, t) {
        return e.string.charAt(e.pos + (t || 0))
    }

    function n(e, t) {
        if (t) {
            var n = e.pos - t;
            return e.string.substr(n >= 0 ? n : 0, t)
        }
        return e.string.substr(0, e.pos - 1)
    }

    function r(e, t) {
        var n = e.string.length,
                r = n - e.pos + 1;
        return e.string.substr(e.pos, t && t < n ? t : r)
    }

    function i(e, t) {
        var n, r = e.pos + t;
        r <= 0 ? e.pos = 0 : r >= (n = e.string.length - 1) ? e.pos = n : e.pos = r
    }
    var o = {
        "->": 4,
        "++": 4,
        "--": 4,
        "**": 4,
        "=~": 4,
        "!~": 4,
        "*": 4,
        "/": 4,
        "%": 4,
        x: 4,
        "+": 4,
        "-": 4,
        ".": 4,
        "<<": 4,
        ">>": 4,
        "<": 4,
        ">": 4,
        "<=": 4,
        ">=": 4,
        lt: 4,
        gt: 4,
        le: 4,
        ge: 4,
        "==": 4,
        "!=": 4,
        "<=>": 4,
        eq: 4,
        ne: 4,
        cmp: 4,
        "~~": 4,
        "&": 4,
        "|": 4,
        "^": 4,
        "&&": 4,
        "||": 4,
        "//": 4,
        "..": 4,
        "...": 4,
        "?": 4,
        ":": 4,
        "=": 4,
        "+=": 4,
        "-=": 4,
        "*=": 4,
        ",": 4,
        "=>": 4,
        "::": 4,
        not: 4,
        and: 4,
        or: 4,
        xor: 4,
        BEGIN: [5, 1],
        END: [5, 1],
        PRINT: [5, 1],
        PRINTF: [5, 1],
        GETC: [5, 1],
        READ: [5, 1],
        READLINE: [5, 1],
        DESTROY: [5, 1],
        TIE: [5, 1],
        TIEHANDLE: [5, 1],
        UNTIE: [5, 1],
        STDIN: 5,
        STDIN_TOP: 5,
        STDOUT: 5,
        STDOUT_TOP: 5,
        STDERR: 5,
        STDERR_TOP: 5,
        $ARG: 5,
        $_: 5,
        "@ARG": 5,
        "@_": 5,
        $LIST_SEPARATOR: 5,
        '$"': 5,
        $PROCESS_ID: 5,
        $PID: 5,
        $$: 5,
        $REAL_GROUP_ID: 5,
        $GID: 5,
        "$(": 5,
        $EFFECTIVE_GROUP_ID: 5,
        $EGID: 5,
        "$)": 5,
        $PROGRAM_NAME: 5,
        $0: 5,
        $SUBSCRIPT_SEPARATOR: 5,
        $SUBSEP: 5,
        "$;": 5,
        $REAL_USER_ID: 5,
        $UID: 5,
        "$<": 5,
        $EFFECTIVE_USER_ID: 5,
        $EUID: 5,
        "$>": 5,
        $a: 5,
        $b: 5,
        $COMPILING: 5,
        "$^C": 5,
        "$^CCC": 5,
        $DEBUGGING: 5,
        "$^D": 5,
        "${^ENCODING}": 5,
        $ENV: 5,
        "%ENV": 5,
        $SYSTEM_FD_MAX: 5,
        "$^F": 5,
        "@F": 5,
        "${^GLOBAL_PHASE}": 5,
        "$^H": 5,
        "%^H": 5,
        "@INC": 5,
        "%INC": 5,
        $INPLACE_EDIT: 5,
        "$^I": 5,
        "$^M": 5,
        $OSNAME: 5,
        "$^O": 5,
        "${^OPEN}": 5,
        $PERLDB: 5,
        "$^P": 5,
        $SIG: 5,
        "%SIG": 5,
        $BASETIME: 5,
        "$^T": 5,
        "${^TAINT}": 5,
        "${^UNICODE}": 5,
        "${^UTF8CACHE}": 5,
        "${^UTF8LOCALE}": 5,
        $PERL_VERSION: 5,
        "$^V": 5,
        "${^WIN32_SLOPPY_STAT}": 5,
        $EXECUTABLE_NAME: 5,
        "$^X": 5,
        $1: 5,
        $MATCH: 5,
        "$&": 5,
        "${^MATCH}": 5,
        $PREMATCH: 5,
        "$`": 5,
        "${^PREMATCH}": 5,
        $POSTMATCH: 5,
        "$'": 5,
        "${^POSTMATCH}": 5,
        $LAST_PAREN_MATCH: 5,
        "$+": 5,
        $LAST_SUBMATCH_RESULT: 5,
        "$^N": 5,
        "@LAST_MATCH_END": 5,
        "@+": 5,
        "%LAST_PAREN_MATCH": 5,
        "%+": 5,
        "@LAST_MATCH_START": 5,
        "@-": 5,
        "%LAST_MATCH_START": 5,
        "%-": 5,
        $LAST_REGEXP_CODE_RESULT: 5,
        "$^R": 5,
        "${^RE_DEBUG_FLAGS}": 5,
        "${^RE_TRIE_MAXBUF}": 5,
        $ARGV: 5,
        "@ARGV": 5,
        ARGV: 5,
        ARGVOUT: 5,
        $OUTPUT_FIELD_SEPARATOR: 5,
        $OFS: 5,
        "$,": 5,
        $INPUT_LINE_NUMBER: 5,
        $NR: 5,
        "$.": 5,
        $INPUT_RECORD_SEPARATOR: 5,
        $RS: 5,
        "$/": 5,
        $OUTPUT_RECORD_SEPARATOR: 5,
        $ORS: 5,
        "$\\": 5,
        $OUTPUT_AUTOFLUSH: 5,
        "$|": 5,
        $ACCUMULATOR: 5,
        "$^A": 5,
        $FORMAT_FORMFEED: 5,
        "$^L": 5,
        $FORMAT_PAGE_NUMBER: 5,
        "$%": 5,
        $FORMAT_LINES_LEFT: 5,
        "$-": 5,
        $FORMAT_LINE_BREAK_CHARACTERS: 5,
        "$:": 5,
        $FORMAT_LINES_PER_PAGE: 5,
        "$=": 5,
        $FORMAT_TOP_NAME: 5,
        "$^": 5,
        $FORMAT_NAME: 5,
        "$~": 5,
        "${^CHILD_ERROR_NATIVE}": 5,
        $EXTENDED_OS_ERROR: 5,
        "$^E": 5,
        $EXCEPTIONS_BEING_CAUGHT: 5,
        "$^S": 5,
        $WARNING: 5,
        "$^W": 5,
        "${^WARNING_BITS}": 5,
        $OS_ERROR: 5,
        $ERRNO: 5,
        "$!": 5,
        "%OS_ERROR": 5,
        "%ERRNO": 5,
        "%!": 5,
        $CHILD_ERROR: 5,
        "$?": 5,
        $EVAL_ERROR: 5,
        "$@": 5,
        $OFMT: 5,
        "$#": 5,
        "$*": 5,
        $ARRAY_BASE: 5,
        "$[": 5,
        $OLD_PERL_VERSION: 5,
        "$]": 5,
        if : [1, 1],
        elsif: [1, 1],
        else: [1, 1],
        while : [1, 1],
        unless: [1, 1],
        for : [1, 1],
        foreach: [1, 1],
        abs: 1,
        accept: 1,
        alarm: 1,
        atan2: 1,
        bind: 1,
        binmode: 1,
        bless: 1,
        bootstrap: 1,
        break: 1,
        caller: 1,
        chdir: 1,
        chmod: 1,
        chomp: 1,
        chop: 1,
        chown: 1,
        chr: 1,
        chroot: 1,
        close: 1,
        closedir: 1,
        connect: 1,
        continue: [1, 1],
        cos: 1,
        crypt: 1,
        dbmclose: 1,
        dbmopen: 1,
        default: 1,
        defined: 1,
        delete: 1,
        die: 1,
        do: 1,
        dump: 1,
        each: 1,
        endgrent: 1,
        endhostent: 1,
        endnetent: 1,
        endprotoent: 1,
        endpwent: 1,
        endservent: 1,
        eof: 1,
        eval: 1,
        exec: 1,
        exists: 1,
        exit: 1,
        exp: 1,
        fcntl: 1,
        fileno: 1,
        flock: 1,
        fork: 1,
        format: 1,
        formline: 1,
        getc: 1,
        getgrent: 1,
        getgrgid: 1,
        getgrnam: 1,
        gethostbyaddr: 1,
        gethostbyname: 1,
        gethostent: 1,
        getlogin: 1,
        getnetbyaddr: 1,
        getnetbyname: 1,
        getnetent: 1,
        getpeername: 1,
        getpgrp: 1,
        getppid: 1,
        getpriority: 1,
        getprotobyname: 1,
        getprotobynumber: 1,
        getprotoent: 1,
        getpwent: 1,
        getpwnam: 1,
        getpwuid: 1,
        getservbyname: 1,
        getservbyport: 1,
        getservent: 1,
        getsockname: 1,
        getsockopt: 1,
        given: 1,
        glob: 1,
        gmtime: 1,
        goto: 1,
        grep: 1,
        hex: 1,
        import: 1,
        index: 1,
        int: 1,
        ioctl: 1,
        join: 1,
        keys: 1,
        kill: 1,
        last: 1,
        lc: 1,
        lcfirst: 1,
        length: 1,
        link: 1,
        listen: 1,
        local: 2,
        localtime: 1,
        lock: 1,
        log: 1,
        lstat: 1,
        m: null,
        map: 1,
        mkdir: 1,
        msgctl: 1,
        msgget: 1,
        msgrcv: 1,
        msgsnd: 1,
        my: 2,
        new : 1,
        next: 1,
        no: 1,
        oct: 1,
        open: 1,
        opendir: 1,
        ord: 1,
        our: 2,
        pack: 1,
        package: 1,
        pipe: 1,
        pop: 1,
        pos: 1,
        print: 1,
        printf: 1,
        prototype: 1,
        push: 1,
        q: null,
        qq: null,
        qr: null,
        quotemeta: null,
        qw: null,
        qx: null,
        rand: 1,
        read: 1,
        readdir: 1,
        readline: 1,
        readlink: 1,
        readpipe: 1,
        recv: 1,
        redo: 1,
        ref: 1,
        rename: 1,
        require: 1,
        reset: 1,
        return: 1,
        reverse: 1,
        rewinddir: 1,
        rindex: 1,
        rmdir: 1,
        s: null,
        say: 1,
        scalar: 1,
        seek: 1,
        seekdir: 1,
        select: 1,
        semctl: 1,
        semget: 1,
        semop: 1,
        send: 1,
        setgrent: 1,
        sethostent: 1,
        setnetent: 1,
        setpgrp: 1,
        setpriority: 1,
        setprotoent: 1,
        setpwent: 1,
        setservent: 1,
        setsockopt: 1,
        shift: 1,
        shmctl: 1,
        shmget: 1,
        shmread: 1,
        shmwrite: 1,
        shutdown: 1,
        sin: 1,
        sleep: 1,
        socket: 1,
        socketpair: 1,
        sort: 1,
        splice: 1,
        split: 1,
        sprintf: 1,
        sqrt: 1,
        srand: 1,
        stat: 1,
        state: 1,
        study: 1,
        sub: 1,
        substr: 1,
        symlink: 1,
        syscall: 1,
        sysopen: 1,
        sysread: 1,
        sysseek: 1,
        system: 1,
        syswrite: 1,
        tell: 1,
        telldir: 1,
        tie: 1,
        tied: 1,
        time: 1,
        times: 1,
        tr: null,
        truncate: 1,
        uc: 1,
        ucfirst: 1,
        umask: 1,
        undef: 1,
        unlink: 1,
        unpack: 1,
        unshift: 1,
        untie: 1,
        use: 1,
        utime: 1,
        values: 1,
        vec: 1,
        wait: 1,
        waitpid: 1,
        wantarray: 1,
        warn: 1,
        when: 1,
        write: 1,
        y: null
    };
    e.defineMode("perl", function () {
        function e(e, t, n, r, i) {
            return t.chain = null, t.style = null, t.tail = null, t.tokenize = function (e, t) {
                for (var o, a = !1, l = 0; o = e.next(); ) {
                    if (o === n[l] && !a)
                        return void 0 !== n[++l] ? (t.chain = n[l], t.style = r, t.tail = i) : i && e.eatWhile(i), t.tokenize = s, r;
                    a = !a && "\\" == o
                }
                return r
            }, t.tokenize(e, t)
        }

        function a(e, t, n) {
            return t.tokenize = function (e, t) {
                return e.string == n && (t.tokenize = s), e.skipToEnd(), "string"
            }, t.tokenize(e, t)
        }

        function s(s, u) {
            if (s.eatSpace())
                return null;
            if (u.chain)
                return e(s, u, u.chain, u.style, u.tail);
            if (s.match(/^\-?[\d\.]/, !1) && s.match(/^(\-?(\d*\.\d+(e[+-]?\d+)?|\d+\.\d*)|0x[\da-fA-F]+|0b[01]+|\d+(e[+-]?\d+)?)/))
                return "number";
            if (s.match(/^<<(?=\w)/))
                return s.eatWhile(/\w/), a(s, u, s.current().substr(2));
            if (s.sol() && s.match(/^\=item(?!\w)/))
                return a(s, u, "=cut");
            var f = s.next();
            if ('"' == f || "'" == f) {
                if (n(s, 3) == "<<" + f) {
                    var d = s.pos;
                    s.eatWhile(/\w/);
                    var p = s.current().substr(1);
                    if (p && s.eat(f))
                        return a(s, u, p);
                    s.pos = d
                }
                return e(s, u, [f], "string")
            }
            if ("q" == f) {
                var h = t(s, -2);
                if (!h || !/\w/.test(h))
                    if (h = t(s, 0), "x" == h) {
                        if (h = t(s, 1), "(" == h)
                            return i(s, 2), e(s, u, [")"], l, c);
                        if ("[" == h)
                            return i(s, 2), e(s, u, ["]"], l, c);
                        if ("{" == h)
                            return i(s, 2), e(s, u, ["}"], l, c);
                        if ("<" == h)
                            return i(s, 2), e(s, u, [">"], l, c);
                        if (/[\^'"!~\/]/.test(h))
                            return i(s, 1), e(s, u, [s.eat(h)], l, c)
                    } else if ("q" == h) {
                        if (h = t(s, 1), "(" == h)
                            return i(s, 2), e(s, u, [")"], "string");
                        if ("[" == h)
                            return i(s, 2), e(s, u, ["]"], "string");
                        if ("{" == h)
                            return i(s, 2), e(s, u, ["}"], "string");
                        if ("<" == h)
                            return i(s, 2), e(s, u, [">"], "string");
                        if (/[\^'"!~\/]/.test(h))
                            return i(s, 1), e(s, u, [s.eat(h)], "string")
                    } else if ("w" == h) {
                        if (h = t(s, 1), "(" == h)
                            return i(s, 2), e(s, u, [")"], "bracket");
                        if ("[" == h)
                            return i(s, 2), e(s, u, ["]"], "bracket");
                        if ("{" == h)
                            return i(s, 2), e(s, u, ["}"], "bracket");
                        if ("<" == h)
                            return i(s, 2), e(s, u, [">"], "bracket");
                        if (/[\^'"!~\/]/.test(h))
                            return i(s, 1), e(s, u, [s.eat(h)], "bracket")
                    } else if ("r" == h) {
                        if (h = t(s, 1), "(" == h)
                            return i(s, 2), e(s, u, [")"], l, c);
                        if ("[" == h)
                            return i(s, 2), e(s, u, ["]"], l, c);
                        if ("{" == h)
                            return i(s, 2), e(s, u, ["}"], l, c);
                        if ("<" == h)
                            return i(s, 2), e(s, u, [">"], l, c);
                        if (/[\^'"!~\/]/.test(h))
                            return i(s, 1), e(s, u, [s.eat(h)], l, c)
                    } else if (/[\^'"!~\/(\[{<]/.test(h)) {
                        if ("(" == h)
                            return i(s, 1), e(s, u, [")"], "string");
                        if ("[" == h)
                            return i(s, 1), e(s, u, ["]"], "string");
                        if ("{" == h)
                            return i(s, 1), e(s, u, ["}"], "string");
                        if ("<" == h)
                            return i(s, 1), e(s, u, [">"], "string");
                        if (/[\^'"!~\/]/.test(h))
                            return e(s, u, [s.eat(h)], "string")
                    }
            }
            if ("m" == f) {
                var h = t(s, -2);
                if ((!h || !/\w/.test(h)) && (h = s.eat(/[(\[{<\^'"!~\/]/))) {
                    if (/[\^'"!~\/]/.test(h))
                        return e(s, u, [h], l, c);
                    if ("(" == h)
                        return e(s, u, [")"], l, c);
                    if ("[" == h)
                        return e(s, u, ["]"], l, c);
                    if ("{" == h)
                        return e(s, u, ["}"], l, c);
                    if ("<" == h)
                        return e(s, u, [">"], l, c)
                }
            }
            if ("s" == f) {
                var h = /[\/>\]})\w]/.test(t(s, -2));
                if (!h && (h = s.eat(/[(\[{<\^'"!~\/]/)))
                    return "[" == h ? e(s, u, ["]", "]"], l, c) : "{" == h ? e(s, u, ["}", "}"], l, c) : "<" == h ? e(s, u, [">", ">"], l, c) : "(" == h ? e(s, u, [")", ")"], l, c) : e(s, u, [h, h], l, c)
            }
            if ("y" == f) {
                var h = /[\/>\]})\w]/.test(t(s, -2));
                if (!h && (h = s.eat(/[(\[{<\^'"!~\/]/)))
                    return "[" == h ? e(s, u, ["]", "]"], l, c) : "{" == h ? e(s, u, ["}", "}"], l, c) : "<" == h ? e(s, u, [">", ">"], l, c) : "(" == h ? e(s, u, [")", ")"], l, c) : e(s, u, [h, h], l, c)
            }
            if ("t" == f) {
                var h = /[\/>\]})\w]/.test(t(s, -2));
                if (!h && (h = s.eat("r"), h && (h = s.eat(/[(\[{<\^'"!~\/]/))))
                    return "[" == h ? e(s, u, ["]", "]"], l, c) : "{" == h ? e(s, u, ["}", "}"], l, c) : "<" == h ? e(s, u, [">", ">"], l, c) : "(" == h ? e(s, u, [")", ")"], l, c) : e(s, u, [h, h], l, c)
            }
            if ("`" == f)
                return e(s, u, [f], "variable-2");
            if ("/" == f)
                return /~\s*$/.test(n(s)) ? e(s, u, [f], l, c) : "operator";
            if ("$" == f) {
                var d = s.pos;
                if (s.eatWhile(/\d/) || s.eat("{") && s.eatWhile(/\d/) && s.eat("}"))
                    return "variable-2";
                s.pos = d
            }
            if (/[$@%]/.test(f)) {
                var d = s.pos;
                if (s.eat("^") && s.eat(/[A-Z]/) || !/[@$%&]/.test(t(s, -2)) && s.eat(/[=|\\\-#?@;:&`~\^!\[\]*'"$+.,\/<>()]/)) {
                    var h = s.current();
                    if (o[h])
                        return "variable-2"
                }
                s.pos = d
            }
            if (/[$@%&]/.test(f) && (s.eatWhile(/[\w$\[\]]/) || s.eat("{") && s.eatWhile(/[\w$\[\]]/) && s.eat("}"))) {
                var h = s.current();
                return o[h] ? "variable-2" : "variable"
            }
            if ("#" == f && "$" != t(s, -2))
                return s.skipToEnd(), "comment";
            if (/[:+\-\^*$&%@=<>!?|\/~\.]/.test(f)) {
                var d = s.pos;
                if (s.eatWhile(/[:+\-\^*$&%@=<>!?|\/~\.]/), o[s.current()])
                    return "operator";
                s.pos = d
            }
            if ("_" == f && 1 == s.pos) {
                if ("_END__" == r(s, 6))
                    return e(s, u, ["\0"], "comment");
                if ("_DATA__" == r(s, 7))
                    return e(s, u, ["\0"], "variable-2");
                if ("_C__" == r(s, 7))
                    return e(s, u, ["\0"], "string")
            }
            if (/\w/.test(f)) {
                var d = s.pos;
                if ("{" == t(s, -2) && ("}" == t(s, 0) || s.eatWhile(/\w/) && "}" == t(s, 0)))
                    return "string";
                s.pos = d
            }
            if (/[A-Z]/.test(f)) {
                var m = t(s, -2),
                        d = s.pos;
                if (s.eatWhile(/[A-Z_]/), !/[\da-z]/.test(t(s, 0))) {
                    var h = o[s.current()];
                    return h ? (h[1] && (h = h[0]), ":" != m ? 1 == h ? "keyword" : 2 == h ? "def" : 3 == h ? "atom" : 4 == h ? "operator" : 5 == h ? "variable-2" : "meta" : "meta") : "meta"
                }
                s.pos = d
            }
            if (/[a-zA-Z_]/.test(f)) {
                var m = t(s, -2);
                s.eatWhile(/\w/);
                var h = o[s.current()];
                return h ? (h[1] && (h = h[0]), ":" != m ? 1 == h ? "keyword" : 2 == h ? "def" : 3 == h ? "atom" : 4 == h ? "operator" : 5 == h ? "variable-2" : "meta" : "meta") : "meta"
            }
            return null
        }
        var l = "string-2",
                c = /[goseximacplud]/;
        return {
            startState: function () {
                return {
                    tokenize: s,
                    chain: null,
                    style: null,
                    tail: null
                }
            },
            token: function (e, t) {
                return (t.tokenize || s)(e, t)
            },
            lineComment: "#"
        }
    });
    var a = [];
    for (var s in o)
        o.hasOwnProperty(s) && 4 !== o[s] && a.push(s);
    e.registerHelper("hintWords", "perl", a), e.registerHelper("fromList", "perl", function (t, n) {
        var r = t.getCursor(),
                i = t.getTokenAt(r),
                o = e.Pos(r.line, i.end);
        if (i.string && /[\w\$@\^%]/.test(i.string[i.string.length - 1]))
            var a = i.string,
                    s = e.Pos(r.line, i.start);
        else
            var a = "",
                    s = o;
        for (var l = [], c = 0; c < n.words.length; c++) {
            var u = n.words[c];
            u.slice(0, a.length) == a && l.push(u)
        }
        if (l.length)
            return {
                list: l,
                from: s,
                to: o
            }
    }), e.defineMIME("text/x-perl", "perl")
}),
        function (e) {
            e(CodeMirror)
        }(function (e) {
    function t(e) {
        for (var t = {}, n = e.split(" "), r = 0; r < n.length; ++r)
            t[n[r]] = !0;
        return t
    }

    function n(e, t, i) {
        return 0 == e.length ? r(t) : function (o, a) {
            for (var s = e[0], l = 0; l < s.length; l++)
                if (o.match(s[l][0]))
                    return a.tokenize = n(e.slice(1), t), s[l][1];
            return a.tokenize = r(t, i), "string"
        }
    }

    function r(e, t) {
        return function (n, r) {
            return i(n, r, e, t)
        }
    }

    function i(e, t, r, i) {
        if (i !== !1 && e.match("${", !1) || e.match("{$", !1))
            return t.tokenize = null, "string";
        if (i !== !1 && e.match(/^\$[a-zA-Z_][a-zA-Z0-9_]*/))
            return e.match("[", !1) && (t.tokenize = n([
                [
                    ["[", null]
                ],
                [
                    [/\d[\w\.]*/, "number"],
                    [/\$[a-zA-Z_][a-zA-Z0-9_]*/, "variable-2"],
                    [/[\w\$]+/, "variable"]
                ],
                [
                    ["]", null]
                ]
            ], r, i)), e.match(/\-\>\w/, !1) && (t.tokenize = n([
                [
                    ["->", null]
                ],
                [
                    [/[\w]+/, "variable"]
                ]
            ], r, i)), "variable-2";
        for (var o = !1; !e.eol() && (o || i === !1 || !e.match("{$", !1) && !e.match(/^(\$[a-zA-Z_][a-zA-Z0-9_]*|\$\{)/, !1)); ) {
            if (!o && e.match(r)) {
                t.tokenize = null, t.tokStack.pop(), t.tokStack.pop();
                break
            }
            o = "\\" == e.next() && !o
        }
        return "string"
    }
    var o = "abstract and array as break case catch class clone const continue declare default do else elseif enddeclare endfor endforeach endif endswitch endwhile extends final for foreach function global goto if implements interface instanceof namespace new or private protected public static switch throw trait try use var while xor die echo empty exit eval include include_once isset list require require_once return print unset __halt_compiler self static parent yield insteadof finally",
            a = "true false null TRUE FALSE NULL __CLASS__ __DIR__ __FILE__ __LINE__ __METHOD__ __FUNCTION__ __NAMESPACE__ __TRAIT__",
            s = "func_num_args func_get_arg func_get_args strlen strcmp strncmp strcasecmp strncasecmp each error_reporting define defined trigger_error user_error set_error_handler restore_error_handler get_declared_classes get_loaded_extensions extension_loaded get_extension_funcs debug_backtrace constant bin2hex hex2bin sleep usleep time mktime gmmktime strftime gmstrftime strtotime date gmdate getdate localtime checkdate flush wordwrap htmlspecialchars htmlentities html_entity_decode md5 md5_file crc32 getimagesize image_type_to_mime_type phpinfo phpversion phpcredits strnatcmp strnatcasecmp substr_count strspn strcspn strtok strtoupper strtolower strpos strrpos strrev hebrev hebrevc nl2br basename dirname pathinfo stripslashes stripcslashes strstr stristr strrchr str_shuffle str_word_count strcoll substr substr_replace quotemeta ucfirst ucwords strtr addslashes addcslashes rtrim str_replace str_repeat count_chars chunk_split trim ltrim strip_tags similar_text explode implode setlocale localeconv parse_str str_pad chop strchr sprintf printf vprintf vsprintf sscanf fscanf parse_url urlencode urldecode rawurlencode rawurldecode readlink linkinfo link unlink exec system escapeshellcmd escapeshellarg passthru shell_exec proc_open proc_close rand srand getrandmax mt_rand mt_srand mt_getrandmax base64_decode base64_encode abs ceil floor round is_finite is_nan is_infinite bindec hexdec octdec decbin decoct dechex base_convert number_format fmod ip2long long2ip getenv putenv getopt microtime gettimeofday getrusage uniqid quoted_printable_decode set_time_limit get_cfg_var magic_quotes_runtime set_magic_quotes_runtime get_magic_quotes_gpc get_magic_quotes_runtime import_request_variables error_log serialize unserialize memory_get_usage var_dump var_export debug_zval_dump print_r highlight_file show_source highlight_string ini_get ini_get_all ini_set ini_alter ini_restore get_include_path set_include_path restore_include_path setcookie header headers_sent connection_aborted connection_status ignore_user_abort parse_ini_file is_uploaded_file move_uploaded_file intval floatval doubleval strval gettype settype is_null is_resource is_bool is_long is_float is_int is_integer is_double is_real is_numeric is_string is_array is_object is_scalar ereg ereg_replace eregi eregi_replace split spliti join sql_regcase dl pclose popen readfile rewind rmdir umask fclose feof fgetc fgets fgetss fread fopen fpassthru ftruncate fstat fseek ftell fflush fwrite fputs mkdir rename copy tempnam tmpfile file file_get_contents file_put_contents stream_select stream_context_create stream_context_set_params stream_context_set_option stream_context_get_options stream_filter_prepend stream_filter_append fgetcsv flock get_meta_tags stream_set_write_buffer set_file_buffer set_socket_blocking stream_set_blocking socket_set_blocking stream_get_meta_data stream_register_wrapper stream_wrapper_register stream_set_timeout socket_set_timeout socket_get_status realpath fnmatch fsockopen pfsockopen pack unpack get_browser crypt opendir closedir chdir getcwd rewinddir readdir dir glob fileatime filectime filegroup fileinode filemtime fileowner fileperms filesize filetype file_exists is_writable is_writeable is_readable is_executable is_file is_dir is_link stat lstat chown touch clearstatcache mail ob_start ob_flush ob_clean ob_end_flush ob_end_clean ob_get_flush ob_get_clean ob_get_length ob_get_level ob_get_status ob_get_contents ob_implicit_flush ob_list_handlers ksort krsort natsort natcasesort asort arsort sort rsort usort uasort uksort shuffle array_walk count end prev next reset current key min max in_array array_search extract compact array_fill range array_multisort array_push array_pop array_shift array_unshift array_splice array_slice array_merge array_merge_recursive array_keys array_values array_count_values array_reverse array_reduce array_pad array_flip array_change_key_case array_rand array_unique array_intersect array_intersect_assoc array_diff array_diff_assoc array_sum array_filter array_map array_chunk array_key_exists pos sizeof key_exists assert assert_options version_compare ftok str_rot13 aggregate session_name session_module_name session_save_path session_id session_regenerate_id session_decode session_register session_unregister session_is_registered session_encode session_start session_destroy session_unset session_set_save_handler session_cache_limiter session_cache_expire session_set_cookie_params session_get_cookie_params session_write_close preg_match preg_match_all preg_replace preg_replace_callback preg_split preg_quote preg_grep overload ctype_alnum ctype_alpha ctype_cntrl ctype_digit ctype_lower ctype_graph ctype_print ctype_punct ctype_space ctype_upper ctype_xdigit virtual apache_request_headers apache_note apache_lookup_uri apache_child_terminate apache_setenv apache_response_headers apache_get_version getallheaders mysql_connect mysql_pconnect mysql_close mysql_select_db mysql_create_db mysql_drop_db mysql_query mysql_unbuffered_query mysql_db_query mysql_list_dbs mysql_list_tables mysql_list_fields mysql_list_processes mysql_error mysql_errno mysql_affected_rows mysql_insert_id mysql_result mysql_num_rows mysql_num_fields mysql_fetch_row mysql_fetch_array mysql_fetch_assoc mysql_fetch_object mysql_data_seek mysql_fetch_lengths mysql_fetch_field mysql_field_seek mysql_free_result mysql_field_name mysql_field_table mysql_field_len mysql_field_type mysql_field_flags mysql_escape_string mysql_real_escape_string mysql_stat mysql_thread_id mysql_client_encoding mysql_get_client_info mysql_get_host_info mysql_get_proto_info mysql_get_server_info mysql_info mysql mysql_fieldname mysql_fieldtable mysql_fieldlen mysql_fieldtype mysql_fieldflags mysql_selectdb mysql_createdb mysql_dropdb mysql_freeresult mysql_numfields mysql_numrows mysql_listdbs mysql_listtables mysql_listfields mysql_db_name mysql_dbname mysql_tablename mysql_table_name pg_connect pg_pconnect pg_close pg_connection_status pg_connection_busy pg_connection_reset pg_host pg_dbname pg_port pg_tty pg_options pg_ping pg_query pg_send_query pg_cancel_query pg_fetch_result pg_fetch_row pg_fetch_assoc pg_fetch_array pg_fetch_object pg_fetch_all pg_affected_rows pg_get_result pg_result_seek pg_result_status pg_free_result pg_last_oid pg_num_rows pg_num_fields pg_field_name pg_field_num pg_field_size pg_field_type pg_field_prtlen pg_field_is_null pg_get_notify pg_get_pid pg_result_error pg_last_error pg_last_notice pg_put_line pg_end_copy pg_copy_to pg_copy_from pg_trace pg_untrace pg_lo_create pg_lo_unlink pg_lo_open pg_lo_close pg_lo_read pg_lo_write pg_lo_read_all pg_lo_import pg_lo_export pg_lo_seek pg_lo_tell pg_escape_string pg_escape_bytea pg_unescape_bytea pg_client_encoding pg_set_client_encoding pg_meta_data pg_convert pg_insert pg_update pg_delete pg_select pg_exec pg_getlastoid pg_cmdtuples pg_errormessage pg_numrows pg_numfields pg_fieldname pg_fieldsize pg_fieldtype pg_fieldnum pg_fieldprtlen pg_fieldisnull pg_freeresult pg_result pg_loreadall pg_locreate pg_lounlink pg_loopen pg_loclose pg_loread pg_lowrite pg_loimport pg_loexport http_response_code get_declared_traits getimagesizefromstring socket_import_stream stream_set_chunk_size trait_exists header_register_callback class_uses session_status session_register_shutdown echo print global static exit array empty eval isset unset die include require include_once require_once json_decode json_encode json_last_error json_last_error_msg curl_close curl_copy_handle curl_errno curl_error curl_escape curl_exec curl_file_create curl_getinfo curl_init curl_multi_add_handle curl_multi_close curl_multi_exec curl_multi_getcontent curl_multi_info_read curl_multi_init curl_multi_remove_handle curl_multi_select curl_multi_setopt curl_multi_strerror curl_pause curl_reset curl_setopt_array curl_setopt curl_share_close curl_share_init curl_share_setopt curl_strerror curl_unescape curl_version mysqli_affected_rows mysqli_autocommit mysqli_change_user mysqli_character_set_name mysqli_close mysqli_commit mysqli_connect_errno mysqli_connect_error mysqli_connect mysqli_data_seek mysqli_debug mysqli_dump_debug_info mysqli_errno mysqli_error_list mysqli_error mysqli_fetch_all mysqli_fetch_array mysqli_fetch_assoc mysqli_fetch_field_direct mysqli_fetch_field mysqli_fetch_fields mysqli_fetch_lengths mysqli_fetch_object mysqli_fetch_row mysqli_field_count mysqli_field_seek mysqli_field_tell mysqli_free_result mysqli_get_charset mysqli_get_client_info mysqli_get_client_stats mysqli_get_client_version mysqli_get_connection_stats mysqli_get_host_info mysqli_get_proto_info mysqli_get_server_info mysqli_get_server_version mysqli_info mysqli_init mysqli_insert_id mysqli_kill mysqli_more_results mysqli_multi_query mysqli_next_result mysqli_num_fields mysqli_num_rows mysqli_options mysqli_ping mysqli_prepare mysqli_query mysqli_real_connect mysqli_real_escape_string mysqli_real_query mysqli_reap_async_query mysqli_refresh mysqli_rollback mysqli_select_db mysqli_set_charset mysqli_set_local_infile_default mysqli_set_local_infile_handler mysqli_sqlstate mysqli_ssl_set mysqli_stat mysqli_stmt_init mysqli_store_result mysqli_thread_id mysqli_thread_safe mysqli_use_result mysqli_warning_count";
    e.registerHelper("hintWords", "php", [o, a, s].join(" ").split(" ")), e.registerHelper("wordChars", "php", /[\w$]/);
    var l = {
        name: "clike",
        helperType: "php",
        keywords: t(o),
        blockKeywords: t("catch do else elseif for foreach if switch try while finally"),
        defKeywords: t("class function interface namespace trait"),
        atoms: t(a),
        builtin: t(s),
        multiLineStrings: !0,
        hooks: {
            $: function (e) {
                return e.eatWhile(/[\w\$_]/), "variable-2"
            },
            "<": function (e, t) {
                var n;
                if (n = e.match(/<<\s*/)) {
                    var i = e.eat(/['"]/);
                    e.eatWhile(/[\w\.]/);
                    var o = e.current().slice(n[0].length + (i ? 2 : 1));
                    if (i && e.eat(i), o)
                        return (t.tokStack || (t.tokStack = [])).push(o, 0), t.tokenize = r(o, "'" != i), "string"
                }
                return !1
            },
            "#": function (e) {
                for (; !e.eol() && !e.match("?>", !1); )
                    e.next();
                return "comment"
            },
            "/": function (e) {
                if (e.eat("/")) {
                    for (; !e.eol() && !e.match("?>", !1); )
                        e.next();
                    return "comment"
                }
                return !1
            },
            '"': function (e, t) {
                return (t.tokStack || (t.tokStack = [])).push('"', 0), t.tokenize = r('"'), "string"
            },
            "{": function (e, t) {
                return t.tokStack && t.tokStack.length && t.tokStack[t.tokStack.length - 1]++, !1
            },
            "}": function (e, t) {
                return t.tokStack && t.tokStack.length > 0 && !--t.tokStack[t.tokStack.length - 1] && (t.tokenize = r(t.tokStack[t.tokStack.length - 2])), !1
            }
        }
    };
    e.defineMode("php", function (t, n) {
        function r(t, n) {
            var r = n.curMode == o;
            if (t.sol() && n.pending && '"' != n.pending && "'" != n.pending && (n.pending = null), r)
                return r && null == n.php.tokenize && t.match("?>") ? (n.curMode = i, n.curState = n.html, n.php.context.prev || (n.php = null), "meta") : o.token(t, n.curState);
            if (t.match(/^<\?\w*/))
                return n.curMode = o, n.php || (n.php = e.startState(o, i.indent(n.html, ""))), n.curState = n.php, "meta";
            if ('"' == n.pending || "'" == n.pending) {
                for (; !t.eol() && t.next() != n.pending; )
                    ;
                var a = "string"
            } else if (n.pending && t.pos < n.pending.end) {
                t.pos = n.pending.end;
                var a = n.pending.style
            } else
                var a = i.token(t, n.curState);
            n.pending && (n.pending = null);
            var s, l = t.current(),
                    c = l.search(/<\?/);
            return c != -1 && ("string" == a && (s = l.match(/[\'\"]$/)) && !/\?>/.test(l) ? n.pending = s[0] : n.pending = {
                end: t.pos,
                style: a
            }, t.backUp(l.length - c)), a
        }
        var i = e.getMode(t, "text/html"),
                o = e.getMode(t, l);
        return {
            startState: function () {
                var t = e.startState(i),
                        r = n.startOpen ? e.startState(o) : null;
                return {
                    html: t,
                    php: r,
                    curMode: n.startOpen ? o : i,
                    curState: n.startOpen ? r : t,
                    pending: null
                }
            },
            copyState: function (t) {
                var n, r = t.html,
                        a = e.copyState(i, r),
                        s = t.php,
                        l = s && e.copyState(o, s);
                return n = t.curMode == i ? a : l, {
                    html: a,
                    php: l,
                    curMode: t.curMode,
                    curState: n,
                    pending: t.pending
                }
            },
            token: r,
            indent: function (e, t) {
                return e.curMode != o && /^\s*<\//.test(t) || e.curMode == o && /^\?>/.test(t) ? i.indent(e.html, t) : e.curMode.indent(e.curState, t)
            },
            blockCommentStart: "/*",
            blockCommentEnd: "*/",
            lineComment: "//",
            innerMode: function (e) {
                return {
                    state: e.curState,
                    mode: e.curMode
                }
            }
        }
    }, "htmlmixed", "clike"), e.defineMIME("application/x-httpd-php", "php"), e.defineMIME("application/x-httpd-php-open", {
        name: "php",
        startOpen: !0
    }), e.defineMIME("text/x-php", l)
}),
        function (e) {
            e(CodeMirror)
        }(function (e) {
    function t(e) {
        return new RegExp("^((" + e.join(")|(") + "))\\b")
    }

    function n(e) {
        return e.scopes[e.scopes.length - 1]
    }
    var r = t(["and", "or", "not", "is"]),
            i = ["as", "assert", "break", "class", "continue", "def", "del", "elif", "else", "except", "finally", "for", "from", "global", "if", "import", "lambda", "pass", "raise", "return", "try", "while", "with", "yield", "in"],
            o = ["abs", "all", "any", "bin", "bool", "bytearray", "callable", "chr", "classmethod", "compile", "complex", "delattr", "dict", "dir", "divmod", "enumerate", "eval", "filter", "float", "format", "frozenset", "getattr", "globals", "hasattr", "hash", "help", "hex", "id", "input", "int", "isinstance", "issubclass", "iter", "len", "list", "locals", "map", "max", "memoryview", "min", "next", "object", "oct", "open", "ord", "pow", "property", "range", "repr", "reversed", "round", "set", "setattr", "slice", "sorted", "staticmethod", "str", "sum", "super", "tuple", "type", "vars", "zip", "__import__", "NotImplemented", "Ellipsis", "__debug__"];
    e.registerHelper("hintWords", "python", i.concat(o)), e.defineMode("python", function (a, s) {
        function l(e, t) {
            if (e.sol() && (t.indent = e.indentation()), e.sol() && "py" == n(t).type) {
                var r = n(t).offset;
                if (e.eatSpace()) {
                    var i = e.indentation();
                    return i > r ? f(t) : i < r && p(e, t) && (t.errorToken = !0), null
                }
                var o = c(e, t);
                return r > 0 && p(e, t) && (o += " " + m), o
            }
            return c(e, t)
        }

        function c(e, t) {
            if (e.eatSpace())
                return null;
            var n = e.peek();
            if ("#" == n)
                return e.skipToEnd(), "comment";
            if (e.match(/^[0-9\.]/, !1)) {
                var i = !1;
                if (e.match(/^\d*\.\d+(e[\+\-]?\d+)?/i) && (i = !0), e.match(/^\d+\.\d*/) && (i = !0), e.match(/^\.\d+/) && (i = !0), i)
                    return e.eat(/J/i), "number";
                var o = !1;
                if (e.match(/^0x[0-9a-f]+/i) && (o = !0), e.match(/^0b[01]+/i) && (o = !0), e.match(/^0o[0-7]+/i) && (o = !0), e.match(/^[1-9]\d*(e[\+\-]?\d+)?/) && (e.eat(/J/i), o = !0), e.match(/^0(?![\dx])/i) && (o = !0), o)
                    return e.eat(/L/i), "number"
            }
            return e.match(L) ? (t.tokenize = u(e.current()), t.tokenize(e, t)) : e.match(_) || e.match(y) ? "punctuation" : e.match(v) || e.match(C) ? "operator" : e.match(g) ? "punctuation" : "." == t.lastToken && e.match(S) ? "property" : e.match(M) || e.match(r) ? "keyword" : e.match(T) ? "builtin" : e.match(/^(self|cls)\b/) ? "variable-2" : e.match(S) ? "def" == t.lastToken || "class" == t.lastToken ? "def" : "variable" : (e.next(), m)
        }

        function u(e) {
            function t(t, i) {
                for (; !t.eol(); )
                    if (t.eatWhile(/[^'"\\]/), t.eat("\\")) {
                        if (t.next(), n && t.eol())
                            return r
                    } else {
                        if (t.match(e))
                            return i.tokenize = l, r;
                        t.eat(/['"]/)
                    }
                if (n) {
                    if (s.singleLineStringErrors)
                        return m;
                    i.tokenize = l
                }
                return r
            }
            for (;
                    "rub".indexOf(e.charAt(0).toLowerCase()) >= 0; )
                e = e.substr(1);
            var n = 1 == e.length,
                    r = "string";
            return t.isString = !0, t
        }

        function f(e) {
            for (;
                    "py" != n(e).type; )
                e.scopes.pop();
            e.scopes.push({
                offset: n(e).offset + a.indentUnit,
                type: "py",
                align: null
            })
        }

        function d(e, t, n) {
            var r = e.match(/^([\s\[\{\(]|#.*)*$/, !1) ? null : e.column() + 1;
            t.scopes.push({
                offset: t.indent + b,
                type: n,
                align: r
            })
        }

        function p(e, t) {
            for (var r = e.indentation(); n(t).offset > r; ) {
                if ("py" != n(t).type)
                    return !0;
                t.scopes.pop()
            }
            return n(t).offset != r
        }

        function h(e, t) {
            e.sol() && (t.beginningOfLine = !0);
            var r = t.tokenize(e, t),
                    i = e.current();
            if (t.beginningOfLine && "@" == i)
                return e.match(S, !1) ? "meta" : x ? "operator" : m;
            /\S/.test(i) && (t.beginningOfLine = !1), "variable" != r && "builtin" != r || "meta" != t.lastToken || (r = "meta"), "pass" != i && "return" != i || (t.dedent += 1), "lambda" == i && (t.lambda = !0), ":" != i || t.lambda || "py" != n(t).type || f(t);
            var o = 1 == i.length ? "[({".indexOf(i) : -1;
            if (o != -1 && d(e, t, "])}".slice(o, o + 1)), o = "])}".indexOf(i), o != -1) {
                if (n(t).type != i)
                    return m;
                t.indent = t.scopes.pop().offset - b
            }
            return t.dedent > 0 && e.eol() && "py" == n(t).type && (t.scopes.length > 1 && t.scopes.pop(), t.dedent -= 1), r
        }
        var m = "error",
                g = s.singleDelimiters || /^[\(\)\[\]\{\}@,:`=;\.]/,
                v = s.doubleOperators || /^([!<>]==|<>|<<|>>|\/\/|\*\*)/,
                y = s.doubleDelimiters || /^(\+=|\-=|\*=|%=|\/=|&=|\|=|\^=)/,
                _ = s.tripleDelimiters || /^(\/\/=|>>=|<<=|\*\*=)/,
                b = s.hangingIndent || a.indentUnit,
                w = i,
                k = o;
        void 0 != s.extra_keywords && (w = w.concat(s.extra_keywords)), void 0 != s.extra_builtins && (k = k.concat(s.extra_builtins));
        var x = s.version && 3 == parseInt(s.version, 10);
        if (x) {
            var C = s.singleOperators || /^[\+\-\*\/%&|\^~<>!@]/,
                    S = s.identifiers || /^[_A-Za-z\u00A1-\uFFFF][_A-Za-z0-9\u00A1-\uFFFF]*/;
            w = w.concat(["nonlocal", "False", "True", "None", "async", "await"]), k = k.concat(["ascii", "bytes", "exec", "print"]);
            var L = new RegExp("^(([rbuf]|(br))?('{3}|\"{3}|['\"]))", "i")
        } else {
            var C = s.singleOperators || /^[\+\-\*\/%&|\^~<>!]/,
                    S = s.identifiers || /^[_A-Za-z][_A-Za-z0-9]*/;
            w = w.concat(["exec", "print"]), k = k.concat(["apply", "basestring", "buffer", "cmp", "coerce", "execfile", "file", "intern", "long", "raw_input", "reduce", "reload", "unichr", "unicode", "xrange", "False", "True", "None"]);
            var L = new RegExp("^(([rub]|(ur)|(br))?('{3}|\"{3}|['\"]))", "i")
        }
        var M = t(w),
                T = t(k),
                A = {
                    startState: function (e) {
                        return {
                            tokenize: l,
                            scopes: [{
                                    offset: e || 0,
                                    type: "py",
                                    align: null
                                }],
                            indent: e || 0,
                            lastToken: null,
                            lambda: !1,
                            dedent: 0
                        }
                    },
                    token: function (e, t) {
                        var n = t.errorToken;
                        n && (t.errorToken = !1);
                        var r = h(e, t);
                        return r && "comment" != r && (t.lastToken = "keyword" == r || "punctuation" == r ? e.current() : r), "punctuation" == r && (r = null), e.eol() && t.lambda && (t.lambda = !1), n ? r + " " + m : r
                    },
                    indent: function (t, r) {
                        if (t.tokenize != l)
                            return t.tokenize.isString ? e.Pass : 0;
                        var i = n(t),
                                o = i.type == r.charAt(0);
                        return null != i.align ? i.align - (o ? 1 : 0) : i.offset - (o ? b : 0)
                    },
                    electricInput: /^\s*[\}\]\)]$/,
                    closeBrackets: {
                        triples: "'\""
                    },
                    lineComment: "#",
                    fold: "indent"
                };
        return A
    }), e.defineMIME("text/x-python", "python");
    var a = function (e) {
        return e.split(" ")
    };
    e.defineMIME("text/x-cython", {
        name: "python",
        extra_keywords: a("by cdef cimport cpdef ctypedef enum exceptextern gil include nogil property publicreadonly struct union DEF IF ELIF ELSE")
    })
});
var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
    return typeof e
} : function (e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e
};
!function (e) {
    "object" == ("undefined" == typeof exports ? "undefined" : _typeof(exports)) && "object" == ("undefined" == typeof module ? "undefined" : _typeof(module)) ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
}(function (e) {
    e.registerHelper("wordChars", "r", /[\w.]/), e.defineMode("r", function (e) {
        function t(e) {
            for (var t = e.split(" "), n = {}, r = 0; r < t.length; ++r)
                n[t[r]] = !0;
            return n
        }

        function n(e, t) {
            a = null;
            var n = e.next();
            if ("#" == n)
                return e.skipToEnd(), "comment";
            if ("0" == n && e.eat("x"))
                return e.eatWhile(/[\da-f]/i), "number";
            if ("." == n && e.eat(/\d/))
                return e.match(/\d*(?:e[+\-]?\d+)?/), "number";
            if (/\d/.test(n))
                return e.match(/\d*(?:\.\d+)?(?:e[+\-]\d+)?L?/), "number";
            if ("'" == n || '"' == n)
                return t.tokenize = r(n), "string";
            if ("." == n && e.match(/.[.\d]+/))
                return "keyword";
            if (/[\w\.]/.test(n) && "_" != n) {
                e.eatWhile(/[\w\.]/);
                var i = e.current();
                return s.propertyIsEnumerable(i) ? "atom" : c.propertyIsEnumerable(i) ? (u.propertyIsEnumerable(i) && !e.match(/\s*if(\s+|$)/, !1) && (a = "block"), "keyword") : l.propertyIsEnumerable(i) ? "builtin" : "variable"
            }
            return "%" == n ? (e.skipTo("%") && e.next(), "variable-2") : "<" == n && e.eat("-") ? "arrow" : "=" == n && t.ctx.argList ? "arg-is" : f.test(n) ? "$" == n ? "dollar" : (e.eatWhile(f), "operator") : /[\(\){}\[\];]/.test(n) ? (a = n, ";" == n ? "semi" : null) : null
        }

        function r(e) {
            return function (t, r) {
                if (t.eat("\\")) {
                    var i = t.next();
                    return "x" == i ? t.match(/^[a-f0-9]{2}/i) : ("u" == i || "U" == i) && t.eat("{") && t.skipTo("}") ? t.next() : "u" == i ? t.match(/^[a-f0-9]{4}/i) : "U" == i ? t.match(/^[a-f0-9]{8}/i) : /[0-7]/.test(i) && t.match(/^[0-7]{1,2}/), "string-2"
                }
                for (var o; null != (o = t.next()); ) {
                    if (o == e) {
                        r.tokenize = n;
                        break
                    }
                    if ("\\" == o) {
                        t.backUp(1);
                        break
                    }
                }
                return "string"
            }
        }

        function i(e, t, n) {
            e.ctx = {
                type: t,
                indent: e.indent,
                align: null,
                column: n.column(),
                prev: e.ctx
            }
        }

        function o(e) {
            e.indent = e.ctx.indent, e.ctx = e.ctx.prev
        }
        var a, s = t("NULL NA Inf NaN NA_integer_ NA_real_ NA_complex_ NA_character_"),
                l = t("list quote bquote eval return call parse deparse"),
                c = t("if else repeat while function for in next break"),
                u = t("if else repeat while function for"),
                f = /[+\-*\/^<>=!&|~$:]/;
        return {
            startState: function () {
                return {
                    tokenize: n,
                    ctx: {
                        type: "top",
                        indent: -e.indentUnit,
                        align: !1
                    },
                    indent: 0,
                    afterIdent: !1
                }
            },
            token: function (e, t) {
                if (e.sol() && (null == t.ctx.align && (t.ctx.align = !1), t.indent = e.indentation()), e.eatSpace())
                    return null;
                var n = t.tokenize(e, t);
                "comment" != n && null == t.ctx.align && (t.ctx.align = !0);
                var r = t.ctx.type;
                return ";" != a && "{" != a && "}" != a || "block" != r || o(t), "{" == a ? i(t, "}", e) : "(" == a ? (i(t, ")", e), t.afterIdent && (t.ctx.argList = !0)) : "[" == a ? i(t, "]", e) : "block" == a ? i(t, "block", e) : a == r && o(t), t.afterIdent = "variable" == n || "keyword" == n, n
            },
            indent: function (t, r) {
                if (t.tokenize != n)
                    return 0;
                var i = r && r.charAt(0),
                        o = t.ctx,
                        a = i == o.type;
                return "block" == o.type ? o.indent + ("{" == i ? 0 : e.indentUnit) : o.align ? o.column + (a ? 0 : 1) : o.indent + (a ? 0 : e.indentUnit)
            },
            lineComment: "#"
        }
    }), e.defineMIME("text/x-rsrc", "r")
}),
        function (e) {
            e(CodeMirror)
        }(function (e) {
    function t(e) {
        for (var t = {}, n = 0, r = e.length; n < r; ++n)
            t[e[n]] = !0;
        return t
    }

    function n(e) {
        if (e)
            for (var t in e)
                e.hasOwnProperty(t) && a.push(t)
    }
    var r = t(["alias", "and", "BEGIN", "begin", "break", "case", "class", "def", "defined?", "do", "else", "elsif", "END", "end", "ensure", "false", "for", "if", "in", "module", "next", "not", "or", "redo", "rescue", "retry", "return", "self", "super", "then", "true", "undef", "unless", "until", "when", "while", "yield", "nil", "raise", "throw", "catch", "fail", "loop", "callcc", "caller", "lambda", "proc", "public", "protected", "private", "require", "load", "require_relative", "extend", "autoload", "__END__", "__FILE__", "__LINE__", "__dir__"]),
            i = t(["def", "class", "case", "for", "while", "until", "module", "then", "catch", "loop", "proc", "begin"]),
            o = t(["end", "until"]);
    e.defineMode("ruby", function (e) {
        function t(e, t, n) {
            return n.tokenize.push(e), e(t, n)
        }

        function n(e, n) {
            if (e.sol() && e.match("=begin") && e.eol())
                return n.tokenize.push(u), "comment";
            if (e.eatSpace())
                return null;
            var r, i = e.next();
            if ("`" == i || "'" == i || '"' == i)
                return t(l(i, "string", '"' == i || "`" == i), e, n);
            if ("/" == i) {
                var o = e.current().length;
                if (e.skipTo("/")) {
                    var a = e.current().length;
                    e.backUp(e.current().length - o);
                    for (var s = 0; e.current().length < a; ) {
                        var p = e.next();
                        if ("(" == p ? s += 1 : ")" == p && (s -= 1), s < 0)
                            break
                    }
                    if (e.backUp(e.current().length - o), 0 == s)
                        return t(l(i, "string-2", !0), e, n)
                }
                return "operator"
            }
            if ("%" == i) {
                var h = "string",
                        m = !0;
                e.eat("s") ? h = "atom" : e.eat(/[WQ]/) ? h = "string" : e.eat(/[r]/) ? h = "string-2" : e.eat(/[wxq]/) && (h = "string", m = !1);
                var g = e.eat(/[^\w\s=]/);
                return g ? (d.propertyIsEnumerable(g) && (g = d[g]), t(l(g, h, m, !0), e, n)) : "operator"
            }
            if ("#" == i)
                return e.skipToEnd(), "comment";
            if ("<" == i && (r = e.match(/^<-?[\`\"\']?([a-zA-Z_?]\w*)[\`\"\']?(?:;|$)/)))
                return t(c(r[1]), e, n);
            if ("0" == i)
                return e.eat("x") ? e.eatWhile(/[\da-fA-F]/) : e.eat("b") ? e.eatWhile(/[01]/) : e.eatWhile(/[0-7]/), "number";
            if (/\d/.test(i))
                return e.match(/^[\d_]*(?:\.[\d_]+)?(?:[eE][+\-]?[\d_]+)?/), "number";
            if ("?" == i) {
                for (; e.match(/^\\[CM]-/); )
                    ;
                return e.eat("\\") ? e.eatWhile(/\w/) : e.next(), "string"
            }
            if (":" == i)
                return e.eat("'") ? t(l("'", "atom", !1), e, n) : e.eat('"') ? t(l('"', "atom", !0), e, n) : e.eat(/[\<\>]/) ? (e.eat(/[\<\>]/), "atom") : e.eat(/[\+\-\*\/\&\|\:\!]/) ? "atom" : e.eat(/[a-zA-Z$@_\xa1-\uffff]/) ? (e.eatWhile(/[\w$\xa1-\uffff]/), e.eat(/[\?\!\=]/), "atom") : "operator";
            if ("@" == i && e.match(/^@?[a-zA-Z_\xa1-\uffff]/))
                return e.eat("@"), e.eatWhile(/[\w\xa1-\uffff]/), "variable-2";
            if ("$" == i)
                return e.eat(/[a-zA-Z_]/) ? e.eatWhile(/[\w]/) : e.eat(/\d/) ? e.eat(/\d/) : e.next(), "variable-3";
            if (/[a-zA-Z_\xa1-\uffff]/.test(i))
                return e.eatWhile(/[\w\xa1-\uffff]/), e.eat(/[\?\!]/), e.eat(":") ? "atom" : "ident";
            if ("|" != i || !n.varList && "{" != n.lastTok && "do" != n.lastTok) {
                if (/[\(\)\[\]{}\\;]/.test(i))
                    return f = i, null;
                if ("-" == i && e.eat(">"))
                    return "arrow";
                if (/[=+\-\/*:\.^%<>~|]/.test(i)) {
                    var v = e.eatWhile(/[=+\-\/*:\.^%<>~|]/);
                    return "." != i || v || (f = "."), "operator"
                }
                return null
            }
            return f = "|", null
        }

        function a(e) {
            return e || (e = 1),
                    function (t, r) {
                        if ("}" == t.peek()) {
                            if (1 == e)
                                return r.tokenize.pop(), r.tokenize[r.tokenize.length - 1](t, r);
                            r.tokenize[r.tokenize.length - 1] = a(e - 1)
                        } else
                            "{" == t.peek() && (r.tokenize[r.tokenize.length - 1] = a(e + 1));
                        return n(t, r)
                    }
        }

        function s() {
            var e = !1;
            return function (t, r) {
                return e ? (r.tokenize.pop(), r.tokenize[r.tokenize.length - 1](t, r)) : (e = !0, n(t, r))
            }
        }

        function l(e, t, n, r) {
            return function (i, o) {
                var l, c = !1;
                for ("read-quoted-paused" === o.context.type && (o.context = o.context.prev, i.eat("}")); null != (l = i.next()); ) {
                    if (l == e && (r || !c)) {
                        o.tokenize.pop();
                        break
                    }
                    if (n && "#" == l && !c) {
                        if (i.eat("{")) {
                            "}" == e && (o.context = {
                                prev: o.context,
                                type: "read-quoted-paused"
                            }), o.tokenize.push(a());
                            break
                        }
                        if (/[@\$]/.test(i.peek())) {
                            o.tokenize.push(s());
                            break
                        }
                    }
                    c = !c && "\\" == l
                }
                return t
            }
        }

        function c(e) {
            return function (t, n) {
                return t.match(e) ? n.tokenize.pop() : t.skipToEnd(), "string"
            }
        }

        function u(e, t) {
            return e.sol() && e.match("=end") && e.eol() && t.tokenize.pop(), e.skipToEnd(), "comment"
        }
        var f, d = {
            "[": "]",
            "{": "}",
            "(": ")"
        };
        return {
            startState: function () {
                return {
                    tokenize: [n],
                    indented: 0,
                    context: {
                        type: "top",
                        indented: -e.indentUnit
                    },
                    continuedLine: !1,
                    lastTok: null,
                    varList: !1
                }
            },
            token: function (e, t) {
                f = null, e.sol() && (t.indented = e.indentation());
                var n, a = t.tokenize[t.tokenize.length - 1](e, t),
                        s = f;
                if ("ident" == a) {
                    var l = e.current();
                    a = "." == t.lastTok ? "property" : r.propertyIsEnumerable(e.current()) ? "keyword" : /^[A-Z]/.test(l) ? "tag" : "def" == t.lastTok || "class" == t.lastTok || t.varList ? "def" : "variable", "keyword" == a && (s = l, i.propertyIsEnumerable(l) ? n = "indent" : o.propertyIsEnumerable(l) ? n = "dedent" : "if" != l && "unless" != l || e.column() != e.indentation() ? "do" == l && t.context.indented < t.indented && (n = "indent") : n = "indent");
                }
                return (f || a && "comment" != a) && (t.lastTok = s), "|" == f && (t.varList = !t.varList), "indent" == n || /[\(\[\{]/.test(f) ? t.context = {
                    prev: t.context,
                    type: f || a,
                    indented: t.indented
                } : ("dedent" == n || /[\)\]\}]/.test(f)) && t.context.prev && (t.context = t.context.prev), e.eol() && (t.continuedLine = "\\" == f || "operator" == a), a
            },
            indent: function (t, r) {
                if (t.tokenize[t.tokenize.length - 1] != n)
                    return 0;
                var i = r && r.charAt(0),
                        o = t.context,
                        a = o.type == d[i] || "keyword" == o.type && /^(?:end|until|else|elsif|when|rescue)\b/.test(r);
                return o.indented + (a ? 0 : e.indentUnit) + (t.continuedLine ? e.indentUnit : 0)
            },
            electricInput: /^\s*(?:end|rescue|\})$/,
            lineComment: "#"
        }
    });
    var a = [];
    n(r), n(i), n(o);
    var s = "text/x-ruby";
    e.registerHelper("hintWords", s, a), e.defineMIME(s, {
        name: "ruby",
        helperType: s
    })
});
var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
    return typeof e
} : function (e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e
};
!function (e) {
    "object" == ("undefined" == typeof exports ? "undefined" : _typeof(exports)) && "object" == ("undefined" == typeof module ? "undefined" : _typeof(module)) ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
}(function (e) {
    e.defineMode("shell", function () {
        function e(e, t) {
            for (var n = t.split(" "), r = 0; r < n.length; r++)
                i[n[r]] = e
        }

        function t(e, t) {
            if (e.eatSpace())
                return null;
            var a = e.sol(),
                    s = e.next();
            if ("\\" === s)
                return e.next(), null;
            if ("'" === s || '"' === s || "`" === s)
                return t.tokens.unshift(n(s)), r(e, t);
            if ("#" === s)
                return a && e.eat("!") ? (e.skipToEnd(), "meta") : (e.skipToEnd(), "comment");
            if ("$" === s)
                return t.tokens.unshift(o), r(e, t);
            if ("+" === s || "=" === s)
                return "operator";
            if ("-" === s)
                return e.eat("-"), e.eatWhile(/\w/), "attribute";
            if (/\d/.test(s) && (e.eatWhile(/\d/), e.eol() || !/\w/.test(e.peek())))
                return "number";
            e.eatWhile(/[\w-]/);
            var l = e.current();
            return "=" === e.peek() && /\w+/.test(l) ? "def" : i.hasOwnProperty(l) ? i[l] : null
        }

        function n(e) {
            return function (t, n) {
                for (var r, i = !1, a = !1; null != (r = t.next()); ) {
                    if (r === e && !a) {
                        i = !0;
                        break
                    }
                    if ("$" === r && !a && "'" !== e) {
                        a = !0, t.backUp(1), n.tokens.unshift(o);
                        break
                    }
                    a = !a && "\\" === r
                }
                return !i && a || n.tokens.shift(), "`" === e || ")" === e ? "quote" : "string"
            }
        }

        function r(e, n) {
            return (n.tokens[0] || t)(e, n)
        }
        var i = {};
        e("atom", "true false"), e("keyword", "if then do else elif while until for in esac fi fin fil done exit set unset export function"), e("builtin", "ab awk bash beep cat cc cd chown chmod chroot clear cp curl cut diff echo find gawk gcc get git grep kill killall ln ls make mkdir openssl mv nc node npm ping ps restart rm rmdir sed service sh shopt shred source sort sleep ssh start stop su sudo tee telnet top touch vi vim wall wc wget who write yes zsh");
        var o = function (e, t) {
            t.tokens.length > 1 && e.eat("$");
            var i = e.next(),
                    o = /\w/;
            return "{" === i && (o = /[^}]/), "(" === i ? (t.tokens[0] = n(")"), r(e, t)) : (/\d/.test(i) || (e.eatWhile(o), e.eat("}")), t.tokens.shift(), "def")
        };
        return {
            startState: function () {
                return {
                    tokens: []
                }
            },
            token: function (e, t) {
                return r(e, t)
            },
            lineComment: "#",
            fold: "brace"
        }
    }), e.defineMIME("text/x-sh", "shell")
});
var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
    return typeof e
} : function (e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e
};
!function (e) {
    "object" == ("undefined" == typeof exports ? "undefined" : _typeof(exports)) && "object" == ("undefined" == typeof module ? "undefined" : _typeof(module)) ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
}(function (e) {
    function t(e) {
        for (var t = {}, n = 0; n < e.length; n++)
            t[e[n]] = !0;
        return t
    }

    function n(e, t, n) {
        if (e.sol() && (t.indented = e.indentation()), e.eatSpace())
            return null;
        var r = e.peek();
        if ("/" == r) {
            if (e.match("//"))
                return e.skipToEnd(), "comment";
            if (e.match("/*"))
                return t.tokenize.push(o), o(e, t);
            if (e.match(y))
                return "string-2"
        }
        if (p.indexOf(r) > -1)
            return e.next(), "operator";
        if (h.indexOf(r) > -1)
            return e.next(), e.match(".."), "punctuation";
        if ('"' == r || "'" == r) {
            e.next();
            var a = i(r);
            return t.tokenize.push(a), a(e, t)
        }
        if (e.match(m))
            return "number";
        if (e.match(v))
            return "property";
        if (e.match(g)) {
            var s = e.current();
            return c.hasOwnProperty(s) ? (u.hasOwnProperty(s) && (t.prev = "define"), "keyword") : d.hasOwnProperty(s) ? "variable-2" : f.hasOwnProperty(s) ? "atom" : "define" == n ? "def" : "variable"
        }
        return e.next(), null
    }

    function r() {
        var e = 0;
        return function (t, r, i) {
            var o = n(t, r, i);
            if ("punctuation" == o)
                if ("(" == t.current())
                    ++e;
                else if (")" == t.current()) {
                    if (0 == e)
                        return t.backUp(1), r.tokenize.pop(), r.tokenize[r.tokenize.length - 1](t, r);
                    --e
                }
            return o
        }
    }

    function i(e) {
        return function (t, n) {
            for (var i, o = !1; i = t.next(); )
                if (o) {
                    if ("(" == i)
                        return n.tokenize.push(r()), "string";
                    o = !1
                } else {
                    if (i == e)
                        break;
                    o = "\\" == i
                }
            return n.tokenize.pop(), "string"
        }
    }

    function o(e, t) {
        return e.match(/^(?:[^*]|\*(?!\/))*/), e.match("*/") && t.tokenize.pop(), "comment"
    }

    function a(e, t, n) {
        this.prev = e, this.align = t, this.indented = n
    }

    function s(e, t) {
        var n = t.match(/^\s*($|\/[\/\*])/, !1) ? null : t.column() + 1;
        e.context = new a(e.context, n, e.indented)
    }

    function l(e) {
        e.context && (e.indented = e.context.indented, e.context = e.context.prev)
    }
    var c = t(["var", "let", "class", "deinit", "enum", "extension", "func", "import", "init", "protocol", "static", "struct", "subscript", "typealias", "as", "dynamicType", "is", "new", "super", "self", "Self", "Type", "__COLUMN__", "__FILE__", "__FUNCTION__", "__LINE__", "break", "case", "continue", "default", "do", "else", "fallthrough", "if", "in", "for", "return", "switch", "where", "while", "associativity", "didSet", "get", "infix", "inout", "left", "mutating", "none", "nonmutating", "operator", "override", "postfix", "precedence", "prefix", "right", "set", "unowned", "weak", "willSet"]),
            u = t(["var", "let", "class", "enum", "extension", "func", "import", "protocol", "struct", "typealias", "dynamicType", "for"]),
            f = t(["Infinity", "NaN", "undefined", "null", "true", "false", "on", "off", "yes", "no", "nil", "null", "this", "super"]),
            d = t(["String", "bool", "int", "string", "double", "Double", "Int", "Float", "float", "public", "private", "extension"]),
            p = "+-/*%=|&<>#",
            h = ";,.(){}[]",
            m = /^-?(?:(?:[\d_]+\.[_\d]*|\.[_\d]+|0o[0-7_\.]+|0b[01_\.]+)(?:e-?[\d_]+)?|0x[\d_a-f\.]+(?:p-?[\d_]+)?)/i,
            g = /^[_A-Za-z$][_A-Za-z$0-9]*/,
            v = /^[@\.][_A-Za-z$][_A-Za-z$0-9]*/,
            y = /^\/(?!\s)(?:\/\/)?(?:\\.|[^\/])+\//;
    e.defineMode("swift", function (e) {
        return {
            startState: function () {
                return {
                    prev: null,
                    context: null,
                    indented: 0,
                    tokenize: []
                }
            },
            token: function (e, t) {
                var r = t.prev;
                t.prev = null;
                var i = t.tokenize[t.tokenize.length - 1] || n,
                        o = i(e, t, r);
                if (o && "comment" != o ? t.prev || (t.prev = o) : t.prev = r, "punctuation" == o) {
                    var a = /[\(\[\{]|([\]\)\}])/.exec(e.current());
                    a && (a[1] ? l : s)(t, e)
                }
                return o
            },
            indent: function (t, n) {
                var r = t.context;
                if (!r)
                    return 0;
                var i = /^[\]\}\)]/.test(n);
                return null != r.align ? r.align - (i ? 1 : 0) : r.indented + (i ? 0 : e.indentUnit)
            },
            electricInput: /^\s*[\)\}\]]$/,
            lineComment: "//",
            blockCommentStart: "/*",
            blockCommentEnd: "*/"
        }
    }), e.defineMIME("text/x-swift", "swift")
});
var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
    return typeof e
} : function (e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e
};
!function (e) {
    "object" == ("undefined" == typeof exports ? "undefined" : _typeof(exports)) && "object" == ("undefined" == typeof module ? "undefined" : _typeof(module)) ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
}(function (e) {
    e.defineMode("vb", function (t, n) {
        function r(e) {
            return new RegExp("^((" + e.join(")|(") + "))\\b", "i")
        }

        function i(e, t) {
            t.currentIndent++
        }

        function o(e, t) {
            t.currentIndent--
        }

        function a(e, t) {
            if (e.eatSpace())
                return null;
            var n = e.peek();
            if ("'" === n)
                return e.skipToEnd(), "comment";
            if (e.match(/^((&H)|(&O))?[0-9\.a-f]/i, !1)) {
                var r = !1;
                if (e.match(/^\d*\.\d+F?/i) ? r = !0 : e.match(/^\d+\.\d*F?/) ? r = !0 : e.match(/^\.\d+F?/) && (r = !0), r)
                    return e.eat(/J/i), "number";
                var a = !1;
                if (e.match(/^&H[0-9a-f]+/i) ? a = !0 : e.match(/^&O[0-7]+/i) ? a = !0 : e.match(/^[1-9]\d*F?/) ? (e.eat(/J/i), a = !0) : e.match(/^0(?![\dx])/i) && (a = !0), a)
                    return e.eat(/L/i), "number"
            }
            return e.match(S) ? (t.tokenize = s(e.current()), t.tokenize(e, t)) : e.match(h) || e.match(p) ? null : e.match(d) || e.match(u) || e.match(b) ? "operator" : e.match(f) ? null : e.match(E) ? (i(e, t), t.doInCurrentLine = !0, "keyword") : e.match(L) ? (t.doInCurrentLine ? t.doInCurrentLine = !1 : i(e, t), "keyword") : e.match(M) ? "keyword" : e.match(A) ? (o(e, t), o(e, t), "keyword") : e.match(T) ? (o(e, t), "keyword") : e.match(C) ? "keyword" : e.match(x) ? "keyword" : e.match(m) ? "variable" : (e.next(), c)
        }

        function s(e) {
            var t = 1 == e.length,
                    r = "string";
            return function (i, o) {
                for (; !i.eol(); ) {
                    if (i.eatWhile(/[^'"]/), i.match(e))
                        return o.tokenize = a, r;
                    i.eat(/['"]/)
                }
                if (t) {
                    if (n.singleLineStringErrors)
                        return c;
                    o.tokenize = a
                }
                return r
            }
        }

        function l(e, t) {
            var n = t.tokenize(e, t),
                    r = e.current();
            if ("." === r)
                return n = t.tokenize(e, t), r = e.current(), "variable" === n ? "variable" : c;
            var a = "[({".indexOf(r);
            return a !== -1 && i(e, t), "dedent" === O && o(e, t) ? c : (a = "])}".indexOf(r), a !== -1 && o(e, t) ? c : n)
        }
        var c = "error",
                u = new RegExp("^[\\+\\-\\*/%&\\\\|\\^~<>!]"),
                f = new RegExp("^[\\(\\)\\[\\]\\{\\}@,:`=;\\.]"),
                d = new RegExp("^((==)|(<>)|(<=)|(>=)|(<>)|(<<)|(>>)|(//)|(\\*\\*))"),
                p = new RegExp("^((\\+=)|(\\-=)|(\\*=)|(%=)|(/=)|(&=)|(\\|=)|(\\^=))"),
                h = new RegExp("^((//=)|(>>=)|(<<=)|(\\*\\*=))"),
                m = new RegExp("^[_A-Za-z][_A-Za-z0-9]*"),
                g = ["class", "module", "sub", "enum", "select", "while", "if", "function", "get", "set", "property", "try"],
                v = ["else", "elseif", "case", "catch"],
                y = ["next", "loop"],
                _ = ["and", "or", "not", "xor", "in"],
                b = r(_),
                w = ["as", "dim", "break", "continue", "optional", "then", "until", "goto", "byval", "byref", "new", "handles", "property", "return", "const", "private", "protected", "friend", "public", "shared", "static", "true", "false"],
                k = ["integer", "string", "double", "decimal", "boolean", "short", "char", "float", "single"],
                x = r(w),
                C = r(k),
                S = '"',
                L = r(g),
                M = r(v),
                T = r(y),
                A = r(["end"]),
                E = r(["do"]),
                O = null;
        e.registerHelper("hintWords", "vb", g.concat(v).concat(y).concat(_).concat(w).concat(k));
        var I = {
            electricChars: "dDpPtTfFeE ",
            startState: function () {
                return {
                    tokenize: a,
                    lastToken: null,
                    currentIndent: 0,
                    nextLineIndent: 0,
                    doInCurrentLine: !1
                }
            },
            token: function (e, t) {
                e.sol() && (t.currentIndent += t.nextLineIndent, t.nextLineIndent = 0, t.doInCurrentLine = 0);
                var n = l(e, t);
                return t.lastToken = {
                    style: n,
                    content: e.current()
                }, n
            },
            indent: function (e, n) {
                var r = n.replace(/^\s+|\s+$/g, "");
                return r.match(T) || r.match(A) || r.match(M) ? t.indentUnit * (e.currentIndent - 1) : e.currentIndent < 0 ? 0 : e.currentIndent * t.indentUnit
            },
            lineComment: "'"
        };
        return I
    }), e.defineMIME("text/x-vb", "vb")
}),
        function (e) {
            e(CodeMirror)
        }(function (e) {
    var t = {
        autoSelfClosers: {
            area: !0,
            base: !0,
            br: !0,
            col: !0,
            command: !0,
            embed: !0,
            frame: !0,
            hr: !0,
            img: !0,
            input: !0,
            keygen: !0,
            link: !0,
            meta: !0,
            param: !0,
            source: !0,
            track: !0,
            wbr: !0,
            menuitem: !0
        },
        implicitlyClosed: {
            dd: !0,
            li: !0,
            optgroup: !0,
            option: !0,
            p: !0,
            rp: !0,
            rt: !0,
            tbody: !0,
            td: !0,
            tfoot: !0,
            th: !0,
            tr: !0
        },
        contextGrabbers: {
            dd: {
                dd: !0,
                dt: !0
            },
            dt: {
                dd: !0,
                dt: !0
            },
            li: {
                li: !0
            },
            option: {
                option: !0,
                optgroup: !0
            },
            optgroup: {
                optgroup: !0
            },
            p: {
                address: !0,
                article: !0,
                aside: !0,
                blockquote: !0,
                dir: !0,
                div: !0,
                dl: !0,
                fieldset: !0,
                footer: !0,
                form: !0,
                h1: !0,
                h2: !0,
                h3: !0,
                h4: !0,
                h5: !0,
                h6: !0,
                header: !0,
                hgroup: !0,
                hr: !0,
                menu: !0,
                nav: !0,
                ol: !0,
                p: !0,
                pre: !0,
                section: !0,
                table: !0,
                ul: !0
            },
            rp: {
                rp: !0,
                rt: !0
            },
            rt: {
                rp: !0,
                rt: !0
            },
            tbody: {
                tbody: !0,
                tfoot: !0
            },
            td: {
                td: !0,
                th: !0
            },
            tfoot: {
                tbody: !0
            },
            th: {
                td: !0,
                th: !0
            },
            thead: {
                tbody: !0,
                tfoot: !0
            },
            tr: {
                tr: !0
            }
        },
        doNotIndent: {
            pre: !0
        },
        allowUnquoted: !0,
        allowMissing: !0,
        caseFold: !0
    },
            n = {
                autoSelfClosers: {},
                implicitlyClosed: {},
                contextGrabbers: {},
                doNotIndent: {},
                allowUnquoted: !1,
                allowMissing: !1,
                caseFold: !1
            };
    e.defineMode("xml", function (r, i) {
        function o(e, t) {
            function n(n) {
                return t.tokenize = n, n(e, t)
            }
            var r = e.next();
            if ("<" == r)
                return e.eat("!") ? e.eat("[") ? e.match("CDATA[") ? n(l("atom", "]]>")) : null : e.match("--") ? n(l("comment", "-->")) : e.match("DOCTYPE", !0, !0) ? (e.eatWhile(/[\w\._\-]/), n(c(1))) : null : e.eat("?") ? (e.eatWhile(/[\w\._\-]/), t.tokenize = l("meta", "?>"), "meta") : (L = e.eat("/") ? "closeTag" : "openTag", t.tokenize = a, "tag bracket");
            if ("&" == r) {
                var i;
                return i = e.eat("#") ? e.eat("x") ? e.eatWhile(/[a-fA-F\d]/) && e.eat(";") : e.eatWhile(/[\d]/) && e.eat(";") : e.eatWhile(/[\w\.\-:]/) && e.eat(";"), i ? "atom" : "error"
            }
            return e.eatWhile(/[^&<]/), null
        }

        function a(e, t) {
            var n = e.next();
            if (">" == n || "/" == n && e.eat(">"))
                return t.tokenize = o, L = ">" == n ? "endTag" : "selfcloseTag", "tag bracket";
            if ("=" == n)
                return L = "equals", null;
            if ("<" == n) {
                t.tokenize = o, t.state = p, t.tagName = t.tagStart = null;
                var r = t.tokenize(e, t);
                return r ? r + " tag error" : "tag error"
            }
            return /[\'\"]/.test(n) ? (t.tokenize = s(n), t.stringStartCol = e.column(), t.tokenize(e, t)) : (e.match(/^[^\s\u00a0=<>\"\']*[^\s\u00a0=<>\"\'\/]/), "word")
        }

        function s(e) {
            var t = function (t, n) {
                for (; !t.eol(); )
                    if (t.next() == e) {
                        n.tokenize = a;
                        break
                    }
                return "string"
            };
            return t.isInAttribute = !0, t
        }

        function l(e, t) {
            return function (n, r) {
                for (; !n.eol(); ) {
                    if (n.match(t)) {
                        r.tokenize = o;
                        break
                    }
                    n.next()
                }
                return e
            }
        }

        function c(e) {
            return function (t, n) {
                for (var r; null != (r = t.next()); ) {
                    if ("<" == r)
                        return n.tokenize = c(e + 1), n.tokenize(t, n);
                    if (">" == r) {
                        if (1 == e) {
                            n.tokenize = o;
                            break
                        }
                        return n.tokenize = c(e - 1), n.tokenize(t, n)
                    }
                }
                return "meta"
            }
        }

        function u(e, t, n) {
            this.prev = e.context, this.tagName = t, this.indent = e.indented, this.startOfLine = n, (x.doNotIndent.hasOwnProperty(t) || e.context && e.context.noIndent) && (this.noIndent = !0)
        }

        function f(e) {
            e.context && (e.context = e.context.prev)
        }

        function d(e, t) {
            for (var n; ; ) {
                if (!e.context)
                    return;
                if (n = e.context.tagName, !x.contextGrabbers.hasOwnProperty(n) || !x.contextGrabbers[n].hasOwnProperty(t))
                    return;
                f(e)
            }
        }

        function p(e, t, n) {
            return "openTag" == e ? (n.tagStart = t.column(), h) : "closeTag" == e ? m : p
        }

        function h(e, t, n) {
            return "word" == e ? (n.tagName = t.current(), M = "tag", y) : (M = "error", h)
        }

        function m(e, t, n) {
            if ("word" == e) {
                var r = t.current();
                return n.context && n.context.tagName != r && x.implicitlyClosed.hasOwnProperty(n.context.tagName) && f(n), n.context && n.context.tagName == r || x.matchClosing === !1 ? (M = "tag", g) : (M = "tag error", v)
            }
            return M = "error", v
        }

        function g(e, t, n) {
            return "endTag" != e ? (M = "error", g) : (f(n), p)
        }

        function v(e, t, n) {
            return M = "error", g(e, t, n)
        }

        function y(e, t, n) {
            if ("word" == e)
                return M = "attribute", _;
            if ("endTag" == e || "selfcloseTag" == e) {
                var r = n.tagName,
                        i = n.tagStart;
                return n.tagName = n.tagStart = null, "selfcloseTag" == e || x.autoSelfClosers.hasOwnProperty(r) ? d(n, r) : (d(n, r), n.context = new u(n, r, i == n.indented)), p
            }
            return M = "error", y
        }

        function _(e, t, n) {
            return "equals" == e ? b : (x.allowMissing || (M = "error"), y(e, t, n))
        }

        function b(e, t, n) {
            return "string" == e ? w : "word" == e && x.allowUnquoted ? (M = "string", y) : (M = "error", y(e, t, n))
        }

        function w(e, t, n) {
            return "string" == e ? w : y(e, t, n)
        }
        var k = r.indentUnit,
                x = {},
                C = i.htmlMode ? t : n;
        for (var S in C)
            x[S] = C[S];
        for (var S in i)
            x[S] = i[S];
        var L, M;
        return o.isInText = !0, {
            startState: function (e) {
                var t = {
                    tokenize: o,
                    state: p,
                    indented: e || 0,
                    tagName: null,
                    tagStart: null,
                    context: null
                };
                return null != e && (t.baseIndent = e), t
            },
            token: function (e, t) {
                if (!t.tagName && e.sol() && (t.indented = e.indentation()), e.eatSpace())
                    return null;
                L = null;
                var n = t.tokenize(e, t);
                return (n || L) && "comment" != n && (M = null, t.state = t.state(L || n, e, t), M && (n = "error" == M ? n + " error" : M)), n
            },
            indent: function (t, n, r) {
                var i = t.context;
                if (t.tokenize.isInAttribute)
                    return t.tagStart == t.indented ? t.stringStartCol + 1 : t.indented + k;
                if (i && i.noIndent)
                    return e.Pass;
                if (t.tokenize != a && t.tokenize != o)
                    return r ? r.match(/^(\s*)/)[0].length : 0;
                if (t.tagName)
                    return x.multilineTagIndentPastTag !== !1 ? t.tagStart + t.tagName.length + 2 : t.tagStart + k * (x.multilineTagIndentFactor || 1);
                if (x.alignCDATA && /<!\[CDATA\[/.test(n))
                    return 0;
                var s = n && /^<(\/)?([\w_:\.-]*)/.exec(n);
                if (s && s[1])
                    for (; i; ) {
                        if (i.tagName == s[2]) {
                            i = i.prev;
                            break
                        }
                        if (!x.implicitlyClosed.hasOwnProperty(i.tagName))
                            break;
                        i = i.prev
                    }
                else if (s)
                    for (; i; ) {
                        var l = x.contextGrabbers[i.tagName];
                        if (!l || !l.hasOwnProperty(s[2]))
                            break;
                        i = i.prev
                    }
                for (; i && i.prev && !i.startOfLine; )
                    i = i.prev;
                return i ? i.indent + k : t.baseIndent || 0
            },
            electricInput: /<\/[\s\w:]+>$/,
            blockCommentStart: "<!--",
            blockCommentEnd: "-->",
            configuration: x.htmlMode ? "html" : "xml",
            helperType: x.htmlMode ? "html" : "xml",
            skipAttribute: function (e) {
                e.state == b && (e.state = y)
            }
        }
    }), e.defineMIME("text/xml", "xml"), e.defineMIME("application/xml", "xml"), e.mimeModes.hasOwnProperty("text/html") || e.defineMIME("text/html", {
        name: "xml",
        htmlMode: !0
    })
});


(function (mod) {
    if (typeof exports == "object" && typeof module == "object") // CommonJS
        mod(require("../../lib/codemirror"));
    else if (typeof define == "function" && define.amd) // AMD
        define(["../../lib/codemirror"], mod);
    else // Plain browser env
        mod(CodeMirror);
})(function (CodeMirror) {
    "use strict";

    CodeMirror.defineOption("fullScreen", false, function (cm, val, old) {
        if (old == CodeMirror.Init) {
            old = false;
        }
        if (!old == !val) {
            return;
        }
        if (val) {
            setFullscreen(cm);
        } else {
            setNormal(cm);
        }
    });

    function setFullscreen(cm) {
        var wrap = cm.getWrapperElement();
        cm.state.fullScreenRestore = {scrollTop: window.pageYOffset, scrollLeft: window.pageXOffset,
            width: wrap.style.width, height: wrap.style.height};
        wrap.style.width = "";
        wrap.style.height = "auto";
        wrap.className += " CodeMirror-fullscreen";
        document.documentElement.style.overflow = "hidden";
        cm.refresh();
    }

    function setNormal(cm) {
        var wrap = cm.getWrapperElement();
        wrap.className = wrap.className.replace(/\s*CodeMirror-fullscreen\b/, "");
        document.documentElement.style.overflow = "";
        var info = cm.state.fullScreenRestore;
        wrap.style.width = info.width;
        wrap.style.height = info.height;
        window.scrollTo(info.scrollLeft, info.scrollTop);
        cm.refresh();
    }
}); 