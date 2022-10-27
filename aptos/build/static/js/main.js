"use strict";
(self.webpackChunk_petra_extension = self.webpackChunk_petra_extension || []).push([
    [179], {
        99602: (n, e, t) => {
            var o = t(5057),
                i = t(82073),
                r = t(23731),
                a = t(38782),
                l = t(44550),
                s = t(81440),
                d = t(76587),
                c = t(66369),
                u = t(40182),
                m = t(69667),
                p = t(97556),
                h = t(61656),
                b = t(20934),
                f = t(96266);
            const {
                ToastContainer: g
            } = (0, m.I2)();
            window.Buffer = window.Buffer || t(55227).Buffer;
            const v = {
                ...l.rS
            };
            Object.assign(v.colors, b.h1);
            const y = (0, s.Pvm)(v, {
                    colors: b.h1,
                    components: {
                        Spinner: {
                            baseStyle: n => ({
                                color: "dark" === n.colorMode ? "navy.200" : "navy.700"
                            })
                        }
                    },
                    initialColorMode: "light",
                    styles: {
                        global: {
                            "html, body": {
                                margin: 0,
                                overflow: "hidden",
                                padding: 0
                            }
                        }
                    },
                    useSystemColorMode: !1
                }),
                x = new r.QueryClient({
                    defaultOptions: {
                        queries: {
                            refetchOnWindowFocus: true
                        }
                    }
                });

            function w() {
                const n = (0, a.V$)(p._j),
                    {
                        isAppStateReady: e
                    } = (0, d.m)();
                return e ? (0, f.jsx)(c.BB, {
                    children: (0, f.jsx)(u.C, {
                        children: n
                    })
                }) : null
            }
            const E = (0, i.s)(document.getElementById("root"));
            Promise.resolve(void 0).then((n => {
                var e;
                const t = null !== (e = null === n || void 0 === n ? void 0 : n.default) && void 0 !== e ? e : n => {
                    let {
                        children: e
                    } = n;
                    return e
                };
                E.render((0, f.jsxs)(o.StrictMode, {
                    children: [(0, f.jsx)(d.W, {
                        children: (0, f.jsx)(r.QueryClientProvider, {
                            client: x,
                            children: (0, f.jsx)(s.xjn, {
                                theme: y,
                                children: (0, f.jsx)(t, {
                                    children: (0, f.jsx)(a.VA, {
                                        children: (0, f.jsx)(h.n, {
                                            children: (0, f.jsx)(w, {})
                                        })
                                    })
                                })
                            })
                        })
                    }), (0, f.jsx)(g, {})]
                }))
            }))
        },
        81440: (n, e, t) => {
            t.d(e, {
                xjn: () => w,
                B1C: () => E,
                Pvm: () => k
            });
            var o = t(5057),
                i = t(21371),
                r = () => o.createElement(i.xB, {
                    styles: '\n      html {\n        line-height: 1.5;\n        -webkit-text-size-adjust: 100%;\n        font-family: system-ui, sans-serif;\n        -webkit-font-smoothing: antialiased;\n        text-rendering: optimizeLegibility;\n        -moz-osx-font-smoothing: grayscale;\n        touch-action: manipulation;\n      }\n\n      body {\n        position: relative;\n        min-height: 100%;\n        font-feature-settings: \'kern\';\n      }\n\n      *,\n      *::before,\n      *::after {\n        border-width: 0;\n        border-style: solid;\n        box-sizing: border-box;\n      }\n\n      main {\n        display: block;\n      }\n\n      hr {\n        border-top-width: 1px;\n        box-sizing: content-box;\n        height: 0;\n        overflow: visible;\n      }\n\n      pre,\n      code,\n      kbd,\n      samp {\n        font-family: SFMono-Regular,  Menlo, Monaco, Consolas, monospace;\n        font-size: 1em;\n      }\n\n      a {\n        background-color: transparent;\n        color: inherit;\n        text-decoration: inherit;\n      }\n\n      abbr[title] {\n        border-bottom: none;\n        text-decoration: underline;\n        -webkit-text-decoration: underline dotted;\n        text-decoration: underline dotted;\n      }\n\n      b,\n      strong {\n        font-weight: bold;\n      }\n\n      small {\n        font-size: 80%;\n      }\n\n      sub,\n      sup {\n        font-size: 75%;\n        line-height: 0;\n        position: relative;\n        vertical-align: baseline;\n      }\n\n      sub {\n        bottom: -0.25em;\n      }\n\n      sup {\n        top: -0.5em;\n      }\n\n      img {\n        border-style: none;\n      }\n\n      button,\n      input,\n      optgroup,\n      select,\n      textarea {\n        font-family: inherit;\n        font-size: 100%;\n        line-height: 1.15;\n        margin: 0;\n      }\n\n      button,\n      input {\n        overflow: visible;\n      }\n\n      button,\n      select {\n        text-transform: none;\n      }\n\n      button::-moz-focus-inner,\n      [type="button"]::-moz-focus-inner,\n      [type="reset"]::-moz-focus-inner,\n      [type="submit"]::-moz-focus-inner {\n        border-style: none;\n        padding: 0;\n      }\n\n      fieldset {\n        padding: 0.35em 0.75em 0.625em;\n      }\n\n      legend {\n        box-sizing: border-box;\n        color: inherit;\n        display: table;\n        max-width: 100%;\n        padding: 0;\n        white-space: normal;\n      }\n\n      progress {\n        vertical-align: baseline;\n      }\n\n      textarea {\n        overflow: auto;\n      }\n\n      [type="checkbox"],\n      [type="radio"] {\n        box-sizing: border-box;\n        padding: 0;\n      }\n\n      [type="number"]::-webkit-inner-spin-button,\n      [type="number"]::-webkit-outer-spin-button {\n        -webkit-appearance: none !important;\n      }\n\n      input[type="number"] {\n        -moz-appearance: textfield;\n      }\n\n      [type="search"] {\n        -webkit-appearance: textfield;\n        outline-offset: -2px;\n      }\n\n      [type="search"]::-webkit-search-decoration {\n        -webkit-appearance: none !important;\n      }\n\n      ::-webkit-file-upload-button {\n        -webkit-appearance: button;\n        font: inherit;\n      }\n\n      details {\n        display: block;\n      }\n\n      summary {\n        display: list-item;\n      }\n\n      template {\n        display: none;\n      }\n\n      [hidden] {\n        display: none !important;\n      }\n\n      body,\n      blockquote,\n      dl,\n      dd,\n      h1,\n      h2,\n      h3,\n      h4,\n      h5,\n      h6,\n      hr,\n      figure,\n      p,\n      pre {\n        margin: 0;\n      }\n\n      button {\n        background: transparent;\n        padding: 0;\n      }\n\n      fieldset {\n        margin: 0;\n        padding: 0;\n      }\n\n      ol,\n      ul {\n        margin: 0;\n        padding: 0;\n      }\n\n      textarea {\n        resize: vertical;\n      }\n\n      button,\n      [role="button"] {\n        cursor: pointer;\n      }\n\n      button::-moz-focus-inner {\n        border: 0 !important;\n      }\n\n      table {\n        border-collapse: collapse;\n      }\n\n      h1,\n      h2,\n      h3,\n      h4,\n      h5,\n      h6 {\n        font-size: inherit;\n        font-weight: inherit;\n      }\n\n      button,\n      input,\n      optgroup,\n      select,\n      textarea {\n        padding: 0;\n        line-height: inherit;\n        color: inherit;\n      }\n\n      img,\n      svg,\n      video,\n      canvas,\n      audio,\n      iframe,\n      embed,\n      object {\n        display: block;\n      }\n\n      img,\n      video {\n        max-width: 100%;\n        height: auto;\n      }\n\n      [data-js-focus-visible] :focus:not([data-focus-visible-added]):not([data-focus-visible-disabled]) {\n        outline: none;\n        box-shadow: none;\n      }\n\n      select::-ms-expand {\n        display: none;\n      }\n    '
                }),
                a = t(76251),
                l = t(15721),
                s = t(6636),
                d = t(43567),
                c = {
                    body: {
                        classList: {
                            add() {},
                            remove() {}
                        }
                    },
                    addEventListener() {},
                    removeEventListener() {},
                    activeElement: {
                        blur() {},
                        nodeName: ""
                    },
                    querySelector: () => null,
                    querySelectorAll: () => [],
                    getElementById: () => null,
                    createEvent: () => ({
                        initEvent() {}
                    }),
                    createElement: () => ({
                        children: [],
                        childNodes: [],
                        style: {},
                        setAttribute() {},
                        getElementsByTagName: () => []
                    })
                },
                u = () => {},
                m = {
                    window: {
                        document: c,
                        navigator: {
                            userAgent: ""
                        },
                        CustomEvent: function () {
                            return this
                        },
                        addEventListener: u,
                        removeEventListener: u,
                        getComputedStyle: () => ({
                            getPropertyValue: () => ""
                        }),
                        matchMedia: () => ({
                            matches: !1,
                            addListener: u,
                            removeListener: u
                        }),
                        requestAnimationFrame: n => "undefined" === typeof setTimeout ? (n(), null) : setTimeout(n, 0),
                        cancelAnimationFrame(n) {
                            "undefined" !== typeof setTimeout && clearTimeout(n)
                        },
                        setTimeout: () => 0,
                        clearTimeout: u,
                        setInterval: () => 0,
                        clearInterval: u
                    },
                    document: c
                },
                p = d.jU ? {
                    window: window,
                    document: document
                } : m,
                h = (0, o.createContext)(p);

            function b(n) {
                const {
                    children: e,
                    environment: t
                } = n, [i, r] = (0, o.useState)(null), [a, l] = (0, o.useState)(!1);
                (0, o.useEffect)((() => l(!0)), []);
                const s = (0, o.useMemo)((() => {
                    var n;
                    const e = null == i ? void 0 : i.ownerDocument,
                        o = null == i ? void 0 : i.ownerDocument.defaultView;
                    return null !== (n = null !== t && void 0 !== t ? t : e ? {
                        document: e,
                        window: o
                    } : void 0) && void 0 !== n ? n : p
                }), [i, t]);
                return o.createElement(h.Provider, {
                    value: s
                }, e, a && o.createElement("span", {
                    ref: n => {
                        (0, o.startTransition)((() => {
                            n && r(n)
                        }))
                    }
                }))
            }
            d.Ts && (h.displayName = "EnvironmentContext"), d.Ts && (b.displayName = "EnvironmentProvider");
            var f = n => {
                    const {
                        children: e,
                        colorModeManager: t,
                        portalZIndex: i,
                        resetCSS: d = !0,
                        theme: c = {},
                        environment: u,
                        cssVarsRoot: m
                    } = n, p = o.createElement(b, {
                        environment: u
                    }, e);
                    return o.createElement(l.f6, {
                        theme: c,
                        cssVarsRoot: m
                    }, o.createElement(s.SG, {
                        colorModeManager: t,
                        options: c.config
                    }, d && o.createElement(r, null), o.createElement(l.ZL, null), i ? o.createElement(a.hE, {
                        zIndex: i
                    }, p) : p))
                },
                g = t(44550),
                v = t(69667),
                y = t(97339),
                x = t.n(y);

            function w(n) {
                let {
                    children: e,
                    toastOptions: t,
                    ...i
                } = n;
                return o.createElement(f, {
                    ...i
                }, e, o.createElement(v.VW, {
                    ...t
                }))
            }

            function E() {
                for (var n = arguments.length, e = new Array(n), t = 0; t < n; t++) e[t] = arguments[t];
                let o = [...e],
                    i = e[e.length - 1];
                return (0, g.gk)(i) && o.length > 1 ? o = o.slice(0, o.length - 1) : i = g.rS, (0, d.zG)(...o.map((n => e => (0, d.mf)(n) ? n(e) : k(e, n))))(i)
            }

            function k() {
                for (var n = arguments.length, e = new Array(n), t = 0; t < n; t++) e[t] = arguments[t];
                return x()({}, ...e, z)
            }

            function z(n, e, t, o) {
                if (((0, d.mf)(n) || (0, d.mf)(e)) && Object.prototype.hasOwnProperty.call(o, t)) return function () {
                    const t = (0, d.mf)(n) ? n(...arguments) : n,
                        o = (0, d.mf)(e) ? e(...arguments) : e;
                    return x()({}, t, o, z)
                }
            }
            w.defaultProps = {
                theme: g.rS
            }
        },
        82073: (n, e, t) => {
            var o = t(53627);
            e.s = o.createRoot, o.hydrateRoot
        }
    },
    n => {
        var e;
        e = 99602, n(n.s = e)
    }
]);