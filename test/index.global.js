window.aptosSDK = (() => {
    var Nu = Object.create;
    var dn = Object.defineProperty;
    var ho = Object.getOwnPropertyDescriptor;
    var Lu = Object.getOwnPropertyNames;
    var Fu = Object.getPrototypeOf,
        $u = Object.prototype.hasOwnProperty;
    var yo = (r => typeof require != "undefined" ? require : typeof Proxy != "undefined" ? new Proxy(r, {
        get: (e, t) => (typeof require != "undefined" ? require : e)[t]
    }) : r)(function (r) {
        if (typeof require != "undefined") return require.apply(this, arguments);
        throw new Error('Dynamic require of "' + r + '" is not supported')
    });
    var J = (r, e) => () => (e || r((e = {
            exports: {}
        }).exports, e), e.exports),
        Wn = (r, e) => {
            for (var t in e) dn(r, t, {
                get: e[t],
                enumerable: !0
            })
        },
        xo = (r, e, t, n) => {
            if (e && typeof e == "object" || typeof e == "function")
                for (let i of Lu(e)) !$u.call(r, i) && i !== t && dn(r, i, {
                    get: () => e[i],
                    enumerable: !(n = ho(e, i)) || n.enumerable
                });
            return r
        };
    var pn = (r, e, t) => (t = r != null ? Nu(Fu(r)) : {}, xo(e || !r || !r.__esModule ? dn(t, "default", {
            value: r,
            enumerable: !0
        }) : t, r)),
        Wu = r => xo(dn({}, "__esModule", {
            value: !0
        }), r),
        me = (r, e, t, n) => {
            for (var i = n > 1 ? void 0 : n ? ho(e, t) : e, o = r.length - 1, c; o >= 0; o--)(c = r[o]) && (i = (n ? c(e, t, i) : c(i)) || i);
            return n && i && dn(e, t, i), i
        };
    var mo = J(() => {});
    var Ks = J((Ap, Gn) => {
        (function (r) {
            "use strict";
            var e = function (a) {
                    var f, u = new Float64Array(16);
                    if (a)
                        for (f = 0; f < a.length; f++) u[f] = a[f];
                    return u
                },
                t = function () {
                    throw new Error("no PRNG")
                },
                n = new Uint8Array(16),
                i = new Uint8Array(32);
            i[0] = 9;
            var o = e(),
                c = e([1]),
                d = e([56129, 1]),
                p = e([30883, 4953, 19914, 30187, 55467, 16705, 2637, 112, 59544, 30585, 16505, 36039, 65139, 11119, 27886, 20995]),
                T = e([61785, 9906, 39828, 60374, 45398, 33411, 5274, 224, 53552, 61171, 33010, 6542, 64743, 22239, 55772, 9222]),
                y = e([54554, 36645, 11616, 51542, 42930, 38181, 51040, 26924, 56412, 64982, 57905, 49316, 21502, 52590, 14035, 8553]),
                w = e([26200, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214]),
                v = e([41136, 18958, 6951, 50414, 58488, 44335, 6150, 12099, 55207, 15867, 153, 11085, 57099, 20417, 9344, 11139]);

            function U(a, f, u, s) {
                a[f] = u >> 24 & 255, a[f + 1] = u >> 16 & 255, a[f + 2] = u >> 8 & 255, a[f + 3] = u & 255, a[f + 4] = s >> 24 & 255, a[f + 5] = s >> 16 & 255, a[f + 6] = s >> 8 & 255, a[f + 7] = s & 255
            }

            function C(a, f, u, s, l) {
                var x, m = 0;
                for (x = 0; x < l; x++) m |= a[f + x] ^ u[s + x];
                return (1 & m - 1 >>> 8) - 1
            }

            function W(a, f, u, s) {
                return C(a, f, u, s, 16)
            }

            function Q(a, f, u, s) {
                return C(a, f, u, s, 32)
            }

            function ce(a, f, u, s) {
                for (var l = s[0] & 255 | (s[1] & 255) << 8 | (s[2] & 255) << 16 | (s[3] & 255) << 24, x = u[0] & 255 | (u[1] & 255) << 8 | (u[2] & 255) << 16 | (u[3] & 255) << 24, m = u[4] & 255 | (u[5] & 255) << 8 | (u[6] & 255) << 16 | (u[7] & 255) << 24, S = u[8] & 255 | (u[9] & 255) << 8 | (u[10] & 255) << 16 | (u[11] & 255) << 24, R = u[12] & 255 | (u[13] & 255) << 8 | (u[14] & 255) << 16 | (u[15] & 255) << 24, k = s[4] & 255 | (s[5] & 255) << 8 | (s[6] & 255) << 16 | (s[7] & 255) << 24, M = f[0] & 255 | (f[1] & 255) << 8 | (f[2] & 255) << 16 | (f[3] & 255) << 24, he = f[4] & 255 | (f[5] & 255) << 8 | (f[6] & 255) << 16 | (f[7] & 255) << 24, I = f[8] & 255 | (f[9] & 255) << 8 | (f[10] & 255) << 16 | (f[11] & 255) << 24, j = f[12] & 255 | (f[13] & 255) << 8 | (f[14] & 255) << 16 | (f[15] & 255) << 24, V = s[8] & 255 | (s[9] & 255) << 8 | (s[10] & 255) << 16 | (s[11] & 255) << 24, te = u[16] & 255 | (u[17] & 255) << 8 | (u[18] & 255) << 16 | (u[19] & 255) << 24, ee = u[20] & 255 | (u[21] & 255) << 8 | (u[22] & 255) << 16 | (u[23] & 255) << 24, Y = u[24] & 255 | (u[25] & 255) << 8 | (u[26] & 255) << 16 | (u[27] & 255) << 24, Z = u[28] & 255 | (u[29] & 255) << 8 | (u[30] & 255) << 16 | (u[31] & 255) << 24, X = s[12] & 255 | (s[13] & 255) << 8 | (s[14] & 255) << 16 | (s[15] & 255) << 24, H = l, N = x, q = m, z = S, O = R, P = k, b = M, g = he, _ = I, A = j, E = V, B = te, $ = ee, re = Y, se = Z, ne = X, h, ae = 0; ae < 20; ae += 2) h = H + $ | 0, O ^= h << 7 | h >>> 32 - 7, h = O + H | 0, _ ^= h << 9 | h >>> 32 - 9, h = _ + O | 0, $ ^= h << 13 | h >>> 32 - 13, h = $ + _ | 0, H ^= h << 18 | h >>> 32 - 18, h = P + N | 0, A ^= h << 7 | h >>> 32 - 7, h = A + P | 0, re ^= h << 9 | h >>> 32 - 9, h = re + A | 0, N ^= h << 13 | h >>> 32 - 13, h = N + re | 0, P ^= h << 18 | h >>> 32 - 18, h = E + b | 0, se ^= h << 7 | h >>> 32 - 7, h = se + E | 0, q ^= h << 9 | h >>> 32 - 9, h = q + se | 0, b ^= h << 13 | h >>> 32 - 13, h = b + q | 0, E ^= h << 18 | h >>> 32 - 18, h = ne + B | 0, z ^= h << 7 | h >>> 32 - 7, h = z + ne | 0, g ^= h << 9 | h >>> 32 - 9, h = g + z | 0, B ^= h << 13 | h >>> 32 - 13, h = B + g | 0, ne ^= h << 18 | h >>> 32 - 18, h = H + z | 0, N ^= h << 7 | h >>> 32 - 7, h = N + H | 0, q ^= h << 9 | h >>> 32 - 9, h = q + N | 0, z ^= h << 13 | h >>> 32 - 13, h = z + q | 0, H ^= h << 18 | h >>> 32 - 18, h = P + O | 0, b ^= h << 7 | h >>> 32 - 7, h = b + P | 0, g ^= h << 9 | h >>> 32 - 9, h = g + b | 0, O ^= h << 13 | h >>> 32 - 13, h = O + g | 0, P ^= h << 18 | h >>> 32 - 18, h = E + A | 0, B ^= h << 7 | h >>> 32 - 7, h = B + E | 0, _ ^= h << 9 | h >>> 32 - 9, h = _ + B | 0, A ^= h << 13 | h >>> 32 - 13, h = A + _ | 0, E ^= h << 18 | h >>> 32 - 18, h = ne + se | 0, $ ^= h << 7 | h >>> 32 - 7, h = $ + ne | 0, re ^= h << 9 | h >>> 32 - 9, h = re + $ | 0, se ^= h << 13 | h >>> 32 - 13, h = se + re | 0, ne ^= h << 18 | h >>> 32 - 18;
                H = H + l | 0, N = N + x | 0, q = q + m | 0, z = z + S | 0, O = O + R | 0, P = P + k | 0, b = b + M | 0, g = g + he | 0, _ = _ + I | 0, A = A + j | 0, E = E + V | 0, B = B + te | 0, $ = $ + ee | 0, re = re + Y | 0, se = se + Z | 0, ne = ne + X | 0, a[0] = H >>> 0 & 255, a[1] = H >>> 8 & 255, a[2] = H >>> 16 & 255, a[3] = H >>> 24 & 255, a[4] = N >>> 0 & 255, a[5] = N >>> 8 & 255, a[6] = N >>> 16 & 255, a[7] = N >>> 24 & 255, a[8] = q >>> 0 & 255, a[9] = q >>> 8 & 255, a[10] = q >>> 16 & 255, a[11] = q >>> 24 & 255, a[12] = z >>> 0 & 255, a[13] = z >>> 8 & 255, a[14] = z >>> 16 & 255, a[15] = z >>> 24 & 255, a[16] = O >>> 0 & 255, a[17] = O >>> 8 & 255, a[18] = O >>> 16 & 255, a[19] = O >>> 24 & 255, a[20] = P >>> 0 & 255, a[21] = P >>> 8 & 255, a[22] = P >>> 16 & 255, a[23] = P >>> 24 & 255, a[24] = b >>> 0 & 255, a[25] = b >>> 8 & 255, a[26] = b >>> 16 & 255, a[27] = b >>> 24 & 255, a[28] = g >>> 0 & 255, a[29] = g >>> 8 & 255, a[30] = g >>> 16 & 255, a[31] = g >>> 24 & 255, a[32] = _ >>> 0 & 255, a[33] = _ >>> 8 & 255, a[34] = _ >>> 16 & 255, a[35] = _ >>> 24 & 255, a[36] = A >>> 0 & 255, a[37] = A >>> 8 & 255, a[38] = A >>> 16 & 255, a[39] = A >>> 24 & 255, a[40] = E >>> 0 & 255, a[41] = E >>> 8 & 255, a[42] = E >>> 16 & 255, a[43] = E >>> 24 & 255, a[44] = B >>> 0 & 255, a[45] = B >>> 8 & 255, a[46] = B >>> 16 & 255, a[47] = B >>> 24 & 255, a[48] = $ >>> 0 & 255, a[49] = $ >>> 8 & 255, a[50] = $ >>> 16 & 255, a[51] = $ >>> 24 & 255, a[52] = re >>> 0 & 255, a[53] = re >>> 8 & 255, a[54] = re >>> 16 & 255, a[55] = re >>> 24 & 255, a[56] = se >>> 0 & 255, a[57] = se >>> 8 & 255, a[58] = se >>> 16 & 255, a[59] = se >>> 24 & 255, a[60] = ne >>> 0 & 255, a[61] = ne >>> 8 & 255, a[62] = ne >>> 16 & 255, a[63] = ne >>> 24 & 255
            }

            function we(a, f, u, s) {
                for (var l = s[0] & 255 | (s[1] & 255) << 8 | (s[2] & 255) << 16 | (s[3] & 255) << 24, x = u[0] & 255 | (u[1] & 255) << 8 | (u[2] & 255) << 16 | (u[3] & 255) << 24, m = u[4] & 255 | (u[5] & 255) << 8 | (u[6] & 255) << 16 | (u[7] & 255) << 24, S = u[8] & 255 | (u[9] & 255) << 8 | (u[10] & 255) << 16 | (u[11] & 255) << 24, R = u[12] & 255 | (u[13] & 255) << 8 | (u[14] & 255) << 16 | (u[15] & 255) << 24, k = s[4] & 255 | (s[5] & 255) << 8 | (s[6] & 255) << 16 | (s[7] & 255) << 24, M = f[0] & 255 | (f[1] & 255) << 8 | (f[2] & 255) << 16 | (f[3] & 255) << 24, he = f[4] & 255 | (f[5] & 255) << 8 | (f[6] & 255) << 16 | (f[7] & 255) << 24, I = f[8] & 255 | (f[9] & 255) << 8 | (f[10] & 255) << 16 | (f[11] & 255) << 24, j = f[12] & 255 | (f[13] & 255) << 8 | (f[14] & 255) << 16 | (f[15] & 255) << 24, V = s[8] & 255 | (s[9] & 255) << 8 | (s[10] & 255) << 16 | (s[11] & 255) << 24, te = u[16] & 255 | (u[17] & 255) << 8 | (u[18] & 255) << 16 | (u[19] & 255) << 24, ee = u[20] & 255 | (u[21] & 255) << 8 | (u[22] & 255) << 16 | (u[23] & 255) << 24, Y = u[24] & 255 | (u[25] & 255) << 8 | (u[26] & 255) << 16 | (u[27] & 255) << 24, Z = u[28] & 255 | (u[29] & 255) << 8 | (u[30] & 255) << 16 | (u[31] & 255) << 24, X = s[12] & 255 | (s[13] & 255) << 8 | (s[14] & 255) << 16 | (s[15] & 255) << 24, H = l, N = x, q = m, z = S, O = R, P = k, b = M, g = he, _ = I, A = j, E = V, B = te, $ = ee, re = Y, se = Z, ne = X, h, ae = 0; ae < 20; ae += 2) h = H + $ | 0, O ^= h << 7 | h >>> 32 - 7, h = O + H | 0, _ ^= h << 9 | h >>> 32 - 9, h = _ + O | 0, $ ^= h << 13 | h >>> 32 - 13, h = $ + _ | 0, H ^= h << 18 | h >>> 32 - 18, h = P + N | 0, A ^= h << 7 | h >>> 32 - 7, h = A + P | 0, re ^= h << 9 | h >>> 32 - 9, h = re + A | 0, N ^= h << 13 | h >>> 32 - 13, h = N + re | 0, P ^= h << 18 | h >>> 32 - 18, h = E + b | 0, se ^= h << 7 | h >>> 32 - 7, h = se + E | 0, q ^= h << 9 | h >>> 32 - 9, h = q + se | 0, b ^= h << 13 | h >>> 32 - 13, h = b + q | 0, E ^= h << 18 | h >>> 32 - 18, h = ne + B | 0, z ^= h << 7 | h >>> 32 - 7, h = z + ne | 0, g ^= h << 9 | h >>> 32 - 9, h = g + z | 0, B ^= h << 13 | h >>> 32 - 13, h = B + g | 0, ne ^= h << 18 | h >>> 32 - 18, h = H + z | 0, N ^= h << 7 | h >>> 32 - 7, h = N + H | 0, q ^= h << 9 | h >>> 32 - 9, h = q + N | 0, z ^= h << 13 | h >>> 32 - 13, h = z + q | 0, H ^= h << 18 | h >>> 32 - 18, h = P + O | 0, b ^= h << 7 | h >>> 32 - 7, h = b + P | 0, g ^= h << 9 | h >>> 32 - 9, h = g + b | 0, O ^= h << 13 | h >>> 32 - 13, h = O + g | 0, P ^= h << 18 | h >>> 32 - 18, h = E + A | 0, B ^= h << 7 | h >>> 32 - 7, h = B + E | 0, _ ^= h << 9 | h >>> 32 - 9, h = _ + B | 0, A ^= h << 13 | h >>> 32 - 13, h = A + _ | 0, E ^= h << 18 | h >>> 32 - 18, h = ne + se | 0, $ ^= h << 7 | h >>> 32 - 7, h = $ + ne | 0, re ^= h << 9 | h >>> 32 - 9, h = re + $ | 0, se ^= h << 13 | h >>> 32 - 13, h = se + re | 0, ne ^= h << 18 | h >>> 32 - 18;
                a[0] = H >>> 0 & 255, a[1] = H >>> 8 & 255, a[2] = H >>> 16 & 255, a[3] = H >>> 24 & 255, a[4] = P >>> 0 & 255, a[5] = P >>> 8 & 255, a[6] = P >>> 16 & 255, a[7] = P >>> 24 & 255, a[8] = E >>> 0 & 255, a[9] = E >>> 8 & 255, a[10] = E >>> 16 & 255, a[11] = E >>> 24 & 255, a[12] = ne >>> 0 & 255, a[13] = ne >>> 8 & 255, a[14] = ne >>> 16 & 255, a[15] = ne >>> 24 & 255, a[16] = b >>> 0 & 255, a[17] = b >>> 8 & 255, a[18] = b >>> 16 & 255, a[19] = b >>> 24 & 255, a[20] = g >>> 0 & 255, a[21] = g >>> 8 & 255, a[22] = g >>> 16 & 255, a[23] = g >>> 24 & 255, a[24] = _ >>> 0 & 255, a[25] = _ >>> 8 & 255, a[26] = _ >>> 16 & 255, a[27] = _ >>> 24 & 255, a[28] = A >>> 0 & 255, a[29] = A >>> 8 & 255, a[30] = A >>> 16 & 255, a[31] = A >>> 24 & 255
            }

            function D(a, f, u, s) {
                ce(a, f, u, s)
            }

            function F(a, f, u, s) {
                we(a, f, u, s)
            }
            var pe = new Uint8Array([101, 120, 112, 97, 110, 100, 32, 51, 50, 45, 98, 121, 116, 101, 32, 107]);

            function dt(a, f, u, s, l, x, m) {
                var S = new Uint8Array(16),
                    R = new Uint8Array(64),
                    k, M;
                for (M = 0; M < 16; M++) S[M] = 0;
                for (M = 0; M < 8; M++) S[M] = x[M];
                for (; l >= 64;) {
                    for (D(R, S, m, pe), M = 0; M < 64; M++) a[f + M] = u[s + M] ^ R[M];
                    for (k = 1, M = 8; M < 16; M++) k = k + (S[M] & 255) | 0, S[M] = k & 255, k >>>= 8;
                    l -= 64, f += 64, s += 64
                }
                if (l > 0)
                    for (D(R, S, m, pe), M = 0; M < l; M++) a[f + M] = u[s + M] ^ R[M];
                return 0
            }

            function pt(a, f, u, s, l) {
                var x = new Uint8Array(16),
                    m = new Uint8Array(64),
                    S, R;
                for (R = 0; R < 16; R++) x[R] = 0;
                for (R = 0; R < 8; R++) x[R] = s[R];
                for (; u >= 64;) {
                    for (D(m, x, l, pe), R = 0; R < 64; R++) a[f + R] = m[R];
                    for (S = 1, R = 8; R < 16; R++) S = S + (x[R] & 255) | 0, x[R] = S & 255, S >>>= 8;
                    u -= 64, f += 64
                }
                if (u > 0)
                    for (D(m, x, l, pe), R = 0; R < u; R++) a[f + R] = m[R];
                return 0
            }

            function _e(a, f, u, s, l) {
                var x = new Uint8Array(32);
                F(x, s, l, pe);
                for (var m = new Uint8Array(8), S = 0; S < 8; S++) m[S] = s[S + 16];
                return pt(a, f, u, m, x)
            }

            function Ee(a, f, u, s, l, x, m) {
                var S = new Uint8Array(32);
                F(S, x, m, pe);
                for (var R = new Uint8Array(8), k = 0; k < 8; k++) R[k] = x[k + 16];
                return dt(a, f, u, s, l, R, S)
            }
            var Ge = function (a) {
                this.buffer = new Uint8Array(16), this.r = new Uint16Array(10), this.h = new Uint16Array(10), this.pad = new Uint16Array(8), this.leftover = 0, this.fin = 0;
                var f, u, s, l, x, m, S, R;
                f = a[0] & 255 | (a[1] & 255) << 8, this.r[0] = f & 8191, u = a[2] & 255 | (a[3] & 255) << 8, this.r[1] = (f >>> 13 | u << 3) & 8191, s = a[4] & 255 | (a[5] & 255) << 8, this.r[2] = (u >>> 10 | s << 6) & 7939, l = a[6] & 255 | (a[7] & 255) << 8, this.r[3] = (s >>> 7 | l << 9) & 8191, x = a[8] & 255 | (a[9] & 255) << 8, this.r[4] = (l >>> 4 | x << 12) & 255, this.r[5] = x >>> 1 & 8190, m = a[10] & 255 | (a[11] & 255) << 8, this.r[6] = (x >>> 14 | m << 2) & 8191, S = a[12] & 255 | (a[13] & 255) << 8, this.r[7] = (m >>> 11 | S << 5) & 8065, R = a[14] & 255 | (a[15] & 255) << 8, this.r[8] = (S >>> 8 | R << 8) & 8191, this.r[9] = R >>> 5 & 127, this.pad[0] = a[16] & 255 | (a[17] & 255) << 8, this.pad[1] = a[18] & 255 | (a[19] & 255) << 8, this.pad[2] = a[20] & 255 | (a[21] & 255) << 8, this.pad[3] = a[22] & 255 | (a[23] & 255) << 8, this.pad[4] = a[24] & 255 | (a[25] & 255) << 8, this.pad[5] = a[26] & 255 | (a[27] & 255) << 8, this.pad[6] = a[28] & 255 | (a[29] & 255) << 8, this.pad[7] = a[30] & 255 | (a[31] & 255) << 8
            };
            Ge.prototype.blocks = function (a, f, u) {
                for (var s = this.fin ? 0 : 2048, l, x, m, S, R, k, M, he, I, j, V, te, ee, Y, Z, X, H, N, q, z = this.h[0], O = this.h[1], P = this.h[2], b = this.h[3], g = this.h[4], _ = this.h[5], A = this.h[6], E = this.h[7], B = this.h[8], $ = this.h[9], re = this.r[0], se = this.r[1], ne = this.r[2], h = this.r[3], ae = this.r[4], ye = this.r[5], xe = this.r[6], ie = this.r[7], le = this.r[8], de = this.r[9]; u >= 16;) l = a[f + 0] & 255 | (a[f + 1] & 255) << 8, z += l & 8191, x = a[f + 2] & 255 | (a[f + 3] & 255) << 8, O += (l >>> 13 | x << 3) & 8191, m = a[f + 4] & 255 | (a[f + 5] & 255) << 8, P += (x >>> 10 | m << 6) & 8191, S = a[f + 6] & 255 | (a[f + 7] & 255) << 8, b += (m >>> 7 | S << 9) & 8191, R = a[f + 8] & 255 | (a[f + 9] & 255) << 8, g += (S >>> 4 | R << 12) & 8191, _ += R >>> 1 & 8191, k = a[f + 10] & 255 | (a[f + 11] & 255) << 8, A += (R >>> 14 | k << 2) & 8191, M = a[f + 12] & 255 | (a[f + 13] & 255) << 8, E += (k >>> 11 | M << 5) & 8191, he = a[f + 14] & 255 | (a[f + 15] & 255) << 8, B += (M >>> 8 | he << 8) & 8191, $ += he >>> 5 | s, I = 0, j = I, j += z * re, j += O * (5 * de), j += P * (5 * le), j += b * (5 * ie), j += g * (5 * xe), I = j >>> 13, j &= 8191, j += _ * (5 * ye), j += A * (5 * ae), j += E * (5 * h), j += B * (5 * ne), j += $ * (5 * se), I += j >>> 13, j &= 8191, V = I, V += z * se, V += O * re, V += P * (5 * de), V += b * (5 * le), V += g * (5 * ie), I = V >>> 13, V &= 8191, V += _ * (5 * xe), V += A * (5 * ye), V += E * (5 * ae), V += B * (5 * h), V += $ * (5 * ne), I += V >>> 13, V &= 8191, te = I, te += z * ne, te += O * se, te += P * re, te += b * (5 * de), te += g * (5 * le), I = te >>> 13, te &= 8191, te += _ * (5 * ie), te += A * (5 * xe), te += E * (5 * ye), te += B * (5 * ae), te += $ * (5 * h), I += te >>> 13, te &= 8191, ee = I, ee += z * h, ee += O * ne, ee += P * se, ee += b * re, ee += g * (5 * de), I = ee >>> 13, ee &= 8191, ee += _ * (5 * le), ee += A * (5 * ie), ee += E * (5 * xe), ee += B * (5 * ye), ee += $ * (5 * ae), I += ee >>> 13, ee &= 8191, Y = I, Y += z * ae, Y += O * h, Y += P * ne, Y += b * se, Y += g * re, I = Y >>> 13, Y &= 8191, Y += _ * (5 * de), Y += A * (5 * le), Y += E * (5 * ie), Y += B * (5 * xe), Y += $ * (5 * ye), I += Y >>> 13, Y &= 8191, Z = I, Z += z * ye, Z += O * ae, Z += P * h, Z += b * ne, Z += g * se, I = Z >>> 13, Z &= 8191, Z += _ * re, Z += A * (5 * de), Z += E * (5 * le), Z += B * (5 * ie), Z += $ * (5 * xe), I += Z >>> 13, Z &= 8191, X = I, X += z * xe, X += O * ye, X += P * ae, X += b * h, X += g * ne, I = X >>> 13, X &= 8191, X += _ * se, X += A * re, X += E * (5 * de), X += B * (5 * le), X += $ * (5 * ie), I += X >>> 13, X &= 8191, H = I, H += z * ie, H += O * xe, H += P * ye, H += b * ae, H += g * h, I = H >>> 13, H &= 8191, H += _ * ne, H += A * se, H += E * re, H += B * (5 * de), H += $ * (5 * le), I += H >>> 13, H &= 8191, N = I, N += z * le, N += O * ie, N += P * xe, N += b * ye, N += g * ae, I = N >>> 13, N &= 8191, N += _ * h, N += A * ne, N += E * se, N += B * re, N += $ * (5 * de), I += N >>> 13, N &= 8191, q = I, q += z * de, q += O * le, q += P * ie, q += b * xe, q += g * ye, I = q >>> 13, q &= 8191, q += _ * ae, q += A * h, q += E * ne, q += B * se, q += $ * re, I += q >>> 13, q &= 8191, I = (I << 2) + I | 0, I = I + j | 0, j = I & 8191, I = I >>> 13, V += I, z = j, O = V, P = te, b = ee, g = Y, _ = Z, A = X, E = H, B = N, $ = q, f += 16, u -= 16;
                this.h[0] = z, this.h[1] = O, this.h[2] = P, this.h[3] = b, this.h[4] = g, this.h[5] = _, this.h[6] = A, this.h[7] = E, this.h[8] = B, this.h[9] = $
            }, Ge.prototype.finish = function (a, f) {
                var u = new Uint16Array(10),
                    s, l, x, m;
                if (this.leftover) {
                    for (m = this.leftover, this.buffer[m++] = 1; m < 16; m++) this.buffer[m] = 0;
                    this.fin = 1, this.blocks(this.buffer, 0, 16)
                }
                for (s = this.h[1] >>> 13, this.h[1] &= 8191, m = 2; m < 10; m++) this.h[m] += s, s = this.h[m] >>> 13, this.h[m] &= 8191;
                for (this.h[0] += s * 5, s = this.h[0] >>> 13, this.h[0] &= 8191, this.h[1] += s, s = this.h[1] >>> 13, this.h[1] &= 8191, this.h[2] += s, u[0] = this.h[0] + 5, s = u[0] >>> 13, u[0] &= 8191, m = 1; m < 10; m++) u[m] = this.h[m] + s, s = u[m] >>> 13, u[m] &= 8191;
                for (u[9] -= 1 << 13, l = (s ^ 1) - 1, m = 0; m < 10; m++) u[m] &= l;
                for (l = ~l, m = 0; m < 10; m++) this.h[m] = this.h[m] & l | u[m];
                for (this.h[0] = (this.h[0] | this.h[1] << 13) & 65535, this.h[1] = (this.h[1] >>> 3 | this.h[2] << 10) & 65535, this.h[2] = (this.h[2] >>> 6 | this.h[3] << 7) & 65535, this.h[3] = (this.h[3] >>> 9 | this.h[4] << 4) & 65535, this.h[4] = (this.h[4] >>> 12 | this.h[5] << 1 | this.h[6] << 14) & 65535, this.h[5] = (this.h[6] >>> 2 | this.h[7] << 11) & 65535, this.h[6] = (this.h[7] >>> 5 | this.h[8] << 8) & 65535, this.h[7] = (this.h[8] >>> 8 | this.h[9] << 5) & 65535, x = this.h[0] + this.pad[0], this.h[0] = x & 65535, m = 1; m < 8; m++) x = (this.h[m] + this.pad[m] | 0) + (x >>> 16) | 0, this.h[m] = x & 65535;
                a[f + 0] = this.h[0] >>> 0 & 255, a[f + 1] = this.h[0] >>> 8 & 255, a[f + 2] = this.h[1] >>> 0 & 255, a[f + 3] = this.h[1] >>> 8 & 255, a[f + 4] = this.h[2] >>> 0 & 255, a[f + 5] = this.h[2] >>> 8 & 255, a[f + 6] = this.h[3] >>> 0 & 255, a[f + 7] = this.h[3] >>> 8 & 255, a[f + 8] = this.h[4] >>> 0 & 255, a[f + 9] = this.h[4] >>> 8 & 255, a[f + 10] = this.h[5] >>> 0 & 255, a[f + 11] = this.h[5] >>> 8 & 255, a[f + 12] = this.h[6] >>> 0 & 255, a[f + 13] = this.h[6] >>> 8 & 255, a[f + 14] = this.h[7] >>> 0 & 255, a[f + 15] = this.h[7] >>> 8 & 255
            }, Ge.prototype.update = function (a, f, u) {
                var s, l;
                if (this.leftover) {
                    for (l = 16 - this.leftover, l > u && (l = u), s = 0; s < l; s++) this.buffer[this.leftover + s] = a[f + s];
                    if (u -= l, f += l, this.leftover += l, this.leftover < 16) return;
                    this.blocks(this.buffer, 0, 16), this.leftover = 0
                }
                if (u >= 16 && (l = u - u % 16, this.blocks(a, f, l), f += l, u -= l), u) {
                    for (s = 0; s < u; s++) this.buffer[this.leftover + s] = a[f + s];
                    this.leftover += u
                }
            };

            function st(a, f, u, s, l, x) {
                var m = new Ge(x);
                return m.update(u, s, l), m.finish(a, f), 0
            }

            function Je(a, f, u, s, l, x) {
                var m = new Uint8Array(16);
                return st(m, 0, u, s, l, x), W(a, f, m, 0)
            }

            function it(a, f, u, s, l) {
                var x;
                if (u < 32) return -1;
                for (Ee(a, 0, f, 0, u, s, l), st(a, 16, a, 32, u - 32, a), x = 0; x < 16; x++) a[x] = 0;
                return 0
            }

            function ur(a, f, u, s, l) {
                var x, m = new Uint8Array(32);
                if (u < 32 || (_e(m, 0, 32, s, l), Je(f, 16, f, 32, u - 32, m) !== 0)) return -1;
                for (Ee(a, 0, f, 0, u, s, l), x = 0; x < 32; x++) a[x] = 0;
                return 0
            }

            function $e(a, f) {
                var u;
                for (u = 0; u < 16; u++) a[u] = f[u] | 0
            }

            function Hs(a) {
                var f, u, s = 1;
                for (f = 0; f < 16; f++) u = a[f] + s + 65535, s = Math.floor(u / 65536), a[f] = u - s * 65536;
                a[0] += s - 1 + 37 * (s - 1)
            }

            function Sr(a, f, u) {
                for (var s, l = ~(u - 1), x = 0; x < 16; x++) s = l & (a[x] ^ f[x]), a[x] ^= s, f[x] ^= s
            }

            function Er(a, f) {
                var u, s, l, x = e(),
                    m = e();
                for (u = 0; u < 16; u++) m[u] = f[u];
                for (Hs(m), Hs(m), Hs(m), s = 0; s < 2; s++) {
                    for (x[0] = m[0] - 65517, u = 1; u < 15; u++) x[u] = m[u] - 65535 - (x[u - 1] >> 16 & 1), x[u - 1] &= 65535;
                    x[15] = m[15] - 32767 - (x[14] >> 16 & 1), l = x[15] >> 16 & 1, x[14] &= 65535, Sr(m, x, 1 - l)
                }
                for (u = 0; u < 16; u++) a[2 * u] = m[u] & 255, a[2 * u + 1] = m[u] >> 8
            }

            function eo(a, f) {
                var u = new Uint8Array(32),
                    s = new Uint8Array(32);
                return Er(u, a), Er(s, f), Q(u, 0, s, 0)
            }

            function to(a) {
                var f = new Uint8Array(32);
                return Er(f, a), f[0] & 1
            }

            function zs(a, f) {
                var u;
                for (u = 0; u < 16; u++) a[u] = f[2 * u] + (f[2 * u + 1] << 8);
                a[15] &= 32767
            }

            function ot(a, f, u) {
                for (var s = 0; s < 16; s++) a[s] = f[s] + u[s]
            }

            function at(a, f, u) {
                for (var s = 0; s < 16; s++) a[s] = f[s] - u[s]
            }

            function fe(a, f, u) {
                var s, l, x = 0,
                    m = 0,
                    S = 0,
                    R = 0,
                    k = 0,
                    M = 0,
                    he = 0,
                    I = 0,
                    j = 0,
                    V = 0,
                    te = 0,
                    ee = 0,
                    Y = 0,
                    Z = 0,
                    X = 0,
                    H = 0,
                    N = 0,
                    q = 0,
                    z = 0,
                    O = 0,
                    P = 0,
                    b = 0,
                    g = 0,
                    _ = 0,
                    A = 0,
                    E = 0,
                    B = 0,
                    $ = 0,
                    re = 0,
                    se = 0,
                    ne = 0,
                    h = u[0],
                    ae = u[1],
                    ye = u[2],
                    xe = u[3],
                    ie = u[4],
                    le = u[5],
                    de = u[6],
                    Ue = u[7],
                    ge = u[8],
                    ve = u[9],
                    Be = u[10],
                    Re = u[11],
                    qe = u[12],
                    De = u[13],
                    Oe = u[14],
                    ke = u[15];
                s = f[0], x += s * h, m += s * ae, S += s * ye, R += s * xe, k += s * ie, M += s * le, he += s * de, I += s * Ue, j += s * ge, V += s * ve, te += s * Be, ee += s * Re, Y += s * qe, Z += s * De, X += s * Oe, H += s * ke, s = f[1], m += s * h, S += s * ae, R += s * ye, k += s * xe, M += s * ie, he += s * le, I += s * de, j += s * Ue, V += s * ge, te += s * ve, ee += s * Be, Y += s * Re, Z += s * qe, X += s * De, H += s * Oe, N += s * ke, s = f[2], S += s * h, R += s * ae, k += s * ye, M += s * xe, he += s * ie, I += s * le, j += s * de, V += s * Ue, te += s * ge, ee += s * ve, Y += s * Be, Z += s * Re, X += s * qe, H += s * De, N += s * Oe, q += s * ke, s = f[3], R += s * h, k += s * ae, M += s * ye, he += s * xe, I += s * ie, j += s * le, V += s * de, te += s * Ue, ee += s * ge, Y += s * ve, Z += s * Be, X += s * Re, H += s * qe, N += s * De, q += s * Oe, z += s * ke, s = f[4], k += s * h, M += s * ae, he += s * ye, I += s * xe, j += s * ie, V += s * le, te += s * de, ee += s * Ue, Y += s * ge, Z += s * ve, X += s * Be, H += s * Re, N += s * qe, q += s * De, z += s * Oe, O += s * ke, s = f[5], M += s * h, he += s * ae, I += s * ye, j += s * xe, V += s * ie, te += s * le, ee += s * de, Y += s * Ue, Z += s * ge, X += s * ve, H += s * Be, N += s * Re, q += s * qe, z += s * De, O += s * Oe, P += s * ke, s = f[6], he += s * h, I += s * ae, j += s * ye, V += s * xe, te += s * ie, ee += s * le, Y += s * de, Z += s * Ue, X += s * ge, H += s * ve, N += s * Be, q += s * Re, z += s * qe, O += s * De, P += s * Oe, b += s * ke, s = f[7], I += s * h, j += s * ae, V += s * ye, te += s * xe, ee += s * ie, Y += s * le, Z += s * de, X += s * Ue, H += s * ge, N += s * ve, q += s * Be, z += s * Re, O += s * qe, P += s * De, b += s * Oe, g += s * ke, s = f[8], j += s * h, V += s * ae, te += s * ye, ee += s * xe, Y += s * ie, Z += s * le, X += s * de, H += s * Ue, N += s * ge, q += s * ve, z += s * Be, O += s * Re, P += s * qe, b += s * De, g += s * Oe, _ += s * ke, s = f[9], V += s * h, te += s * ae, ee += s * ye, Y += s * xe, Z += s * ie, X += s * le, H += s * de, N += s * Ue, q += s * ge, z += s * ve, O += s * Be, P += s * Re, b += s * qe, g += s * De, _ += s * Oe, A += s * ke, s = f[10], te += s * h, ee += s * ae, Y += s * ye, Z += s * xe, X += s * ie, H += s * le, N += s * de, q += s * Ue, z += s * ge, O += s * ve, P += s * Be, b += s * Re, g += s * qe, _ += s * De, A += s * Oe, E += s * ke, s = f[11], ee += s * h, Y += s * ae, Z += s * ye, X += s * xe, H += s * ie, N += s * le, q += s * de, z += s * Ue, O += s * ge, P += s * ve, b += s * Be, g += s * Re, _ += s * qe, A += s * De, E += s * Oe, B += s * ke, s = f[12], Y += s * h, Z += s * ae, X += s * ye, H += s * xe, N += s * ie, q += s * le, z += s * de, O += s * Ue, P += s * ge, b += s * ve, g += s * Be, _ += s * Re, A += s * qe, E += s * De, B += s * Oe, $ += s * ke, s = f[13], Z += s * h, X += s * ae, H += s * ye, N += s * xe, q += s * ie, z += s * le, O += s * de, P += s * Ue, b += s * ge, g += s * ve, _ += s * Be, A += s * Re, E += s * qe, B += s * De, $ += s * Oe, re += s * ke, s = f[14], X += s * h, H += s * ae, N += s * ye, q += s * xe, z += s * ie, O += s * le, P += s * de, b += s * Ue, g += s * ge, _ += s * ve, A += s * Be, E += s * Re, B += s * qe, $ += s * De, re += s * Oe, se += s * ke, s = f[15], H += s * h, N += s * ae, q += s * ye, z += s * xe, O += s * ie, P += s * le, b += s * de, g += s * Ue, _ += s * ge, A += s * ve, E += s * Be, B += s * Re, $ += s * qe, re += s * De, se += s * Oe, ne += s * ke, x += 38 * N, m += 38 * q, S += 38 * z, R += 38 * O, k += 38 * P, M += 38 * b, he += 38 * g, I += 38 * _, j += 38 * A, V += 38 * E, te += 38 * B, ee += 38 * $, Y += 38 * re, Z += 38 * se, X += 38 * ne, l = 1, s = x + l + 65535, l = Math.floor(s / 65536), x = s - l * 65536, s = m + l + 65535, l = Math.floor(s / 65536), m = s - l * 65536, s = S + l + 65535, l = Math.floor(s / 65536), S = s - l * 65536, s = R + l + 65535, l = Math.floor(s / 65536), R = s - l * 65536, s = k + l + 65535, l = Math.floor(s / 65536), k = s - l * 65536, s = M + l + 65535, l = Math.floor(s / 65536), M = s - l * 65536, s = he + l + 65535, l = Math.floor(s / 65536), he = s - l * 65536, s = I + l + 65535, l = Math.floor(s / 65536), I = s - l * 65536, s = j + l + 65535, l = Math.floor(s / 65536), j = s - l * 65536, s = V + l + 65535, l = Math.floor(s / 65536), V = s - l * 65536, s = te + l + 65535, l = Math.floor(s / 65536), te = s - l * 65536, s = ee + l + 65535, l = Math.floor(s / 65536), ee = s - l * 65536, s = Y + l + 65535, l = Math.floor(s / 65536), Y = s - l * 65536, s = Z + l + 65535, l = Math.floor(s / 65536), Z = s - l * 65536, s = X + l + 65535, l = Math.floor(s / 65536), X = s - l * 65536, s = H + l + 65535, l = Math.floor(s / 65536), H = s - l * 65536, x += l - 1 + 37 * (l - 1), l = 1, s = x + l + 65535, l = Math.floor(s / 65536), x = s - l * 65536, s = m + l + 65535, l = Math.floor(s / 65536), m = s - l * 65536, s = S + l + 65535, l = Math.floor(s / 65536), S = s - l * 65536, s = R + l + 65535, l = Math.floor(s / 65536), R = s - l * 65536, s = k + l + 65535, l = Math.floor(s / 65536), k = s - l * 65536, s = M + l + 65535, l = Math.floor(s / 65536), M = s - l * 65536, s = he + l + 65535, l = Math.floor(s / 65536), he = s - l * 65536, s = I + l + 65535, l = Math.floor(s / 65536), I = s - l * 65536, s = j + l + 65535, l = Math.floor(s / 65536), j = s - l * 65536, s = V + l + 65535, l = Math.floor(s / 65536), V = s - l * 65536, s = te + l + 65535, l = Math.floor(s / 65536), te = s - l * 65536, s = ee + l + 65535, l = Math.floor(s / 65536), ee = s - l * 65536, s = Y + l + 65535, l = Math.floor(s / 65536), Y = s - l * 65536, s = Z + l + 65535, l = Math.floor(s / 65536), Z = s - l * 65536, s = X + l + 65535, l = Math.floor(s / 65536), X = s - l * 65536, s = H + l + 65535, l = Math.floor(s / 65536), H = s - l * 65536, x += l - 1 + 37 * (l - 1), a[0] = x, a[1] = m, a[2] = S, a[3] = R, a[4] = k, a[5] = M, a[6] = he, a[7] = I, a[8] = j, a[9] = V, a[10] = te, a[11] = ee, a[12] = Y, a[13] = Z, a[14] = X, a[15] = H
            }

            function Ze(a, f) {
                fe(a, f, f)
            }

            function ro(a, f) {
                var u = e(),
                    s;
                for (s = 0; s < 16; s++) u[s] = f[s];
                for (s = 253; s >= 0; s--) Ze(u, u), s !== 2 && s !== 4 && fe(u, u, f);
                for (s = 0; s < 16; s++) a[s] = u[s]
            }

            function no(a, f) {
                var u = e(),
                    s;
                for (s = 0; s < 16; s++) u[s] = f[s];
                for (s = 250; s >= 0; s--) Ze(u, u), s !== 1 && fe(u, u, f);
                for (s = 0; s < 16; s++) a[s] = u[s]
            }

            function zn(a, f, u) {
                var s = new Uint8Array(32),
                    l = new Float64Array(80),
                    x, m, S = e(),
                    R = e(),
                    k = e(),
                    M = e(),
                    he = e(),
                    I = e();
                for (m = 0; m < 31; m++) s[m] = f[m];
                for (s[31] = f[31] & 127 | 64, s[0] &= 248, zs(l, u), m = 0; m < 16; m++) R[m] = l[m], M[m] = S[m] = k[m] = 0;
                for (S[0] = M[0] = 1, m = 254; m >= 0; --m) x = s[m >>> 3] >>> (m & 7) & 1, Sr(S, R, x), Sr(k, M, x), ot(he, S, k), at(S, S, k), ot(k, R, M), at(R, R, M), Ze(M, he), Ze(I, S), fe(S, k, S), fe(k, R, he), ot(he, S, k), at(S, S, k), Ze(R, S), at(k, M, I), fe(S, k, d), ot(S, S, M), fe(k, k, S), fe(S, M, I), fe(M, R, l), Ze(R, he), Sr(S, R, x), Sr(k, M, x);
                for (m = 0; m < 16; m++) l[m + 16] = S[m], l[m + 32] = k[m], l[m + 48] = R[m], l[m + 64] = M[m];
                var j = l.subarray(32),
                    V = l.subarray(16);
                return ro(j, j), fe(V, V, j), Er(a, V), 0
            }

            function Dn(a, f) {
                return zn(a, f, i)
            }

            function so(a, f) {
                return t(f, 32), Dn(a, f)
            }

            function On(a, f, u) {
                var s = new Uint8Array(32);
                return zn(s, u, f), F(a, n, s, pe)
            }
            var io = it,
                Iu = ur;

            function Cu(a, f, u, s, l, x) {
                var m = new Uint8Array(32);
                return On(m, l, x), io(a, f, u, s, m)
            }

            function Hu(a, f, u, s, l, x) {
                var m = new Uint8Array(32);
                return On(m, l, x), Iu(a, f, u, s, m)
            }
            var oo = [1116352408, 3609767458, 1899447441, 602891725, 3049323471, 3964484399, 3921009573, 2173295548, 961987163, 4081628472, 1508970993, 3053834265, 2453635748, 2937671579, 2870763221, 3664609560, 3624381080, 2734883394, 310598401, 1164996542, 607225278, 1323610764, 1426881987, 3590304994, 1925078388, 4068182383, 2162078206, 991336113, 2614888103, 633803317, 3248222580, 3479774868, 3835390401, 2666613458, 4022224774, 944711139, 264347078, 2341262773, 604807628, 2007800933, 770255983, 1495990901, 1249150122, 1856431235, 1555081692, 3175218132, 1996064986, 2198950837, 2554220882, 3999719339, 2821834349, 766784016, 2952996808, 2566594879, 3210313671, 3203337956, 3336571891, 1034457026, 3584528711, 2466948901, 113926993, 3758326383, 338241895, 168717936, 666307205, 1188179964, 773529912, 1546045734, 1294757372, 1522805485, 1396182291, 2643833823, 1695183700, 2343527390, 1986661051, 1014477480, 2177026350, 1206759142, 2456956037, 344077627, 2730485921, 1290863460, 2820302411, 3158454273, 3259730800, 3505952657, 3345764771, 106217008, 3516065817, 3606008344, 3600352804, 1432725776, 4094571909, 1467031594, 275423344, 851169720, 430227734, 3100823752, 506948616, 1363258195, 659060556, 3750685593, 883997877, 3785050280, 958139571, 3318307427, 1322822218, 3812723403, 1537002063, 2003034995, 1747873779, 3602036899, 1955562222, 1575990012, 2024104815, 1125592928, 2227730452, 2716904306, 2361852424, 442776044, 2428436474, 593698344, 2756734187, 3733110249, 3204031479, 2999351573, 3329325298, 3815920427, 3391569614, 3928383900, 3515267271, 566280711, 3940187606, 3454069534, 4118630271, 4000239992, 116418474, 1914138554, 174292421, 2731055270, 289380356, 3203993006, 460393269, 320620315, 685471733, 587496836, 852142971, 1086792851, 1017036298, 365543100, 1126000580, 2618297676, 1288033470, 3409855158, 1501505948, 4234509866, 1607167915, 987167468, 1816402316, 1246189591];

            function ao(a, f, u, s) {
                for (var l = new Int32Array(16), x = new Int32Array(16), m, S, R, k, M, he, I, j, V, te, ee, Y, Z, X, H, N, q, z, O, P, b, g, _, A, E, B, $ = a[0], re = a[1], se = a[2], ne = a[3], h = a[4], ae = a[5], ye = a[6], xe = a[7], ie = f[0], le = f[1], de = f[2], Ue = f[3], ge = f[4], ve = f[5], Be = f[6], Re = f[7], qe = 0; s >= 128;) {
                    for (O = 0; O < 16; O++) P = 8 * O + qe, l[O] = u[P + 0] << 24 | u[P + 1] << 16 | u[P + 2] << 8 | u[P + 3], x[O] = u[P + 4] << 24 | u[P + 5] << 16 | u[P + 6] << 8 | u[P + 7];
                    for (O = 0; O < 80; O++)
                        if (m = $, S = re, R = se, k = ne, M = h, he = ae, I = ye, j = xe, V = ie, te = le, ee = de, Y = Ue, Z = ge, X = ve, H = Be, N = Re, b = xe, g = Re, _ = g & 65535, A = g >>> 16, E = b & 65535, B = b >>> 16, b = (h >>> 14 | ge << 32 - 14) ^ (h >>> 18 | ge << 32 - 18) ^ (ge >>> 41 - 32 | h << 32 - (41 - 32)), g = (ge >>> 14 | h << 32 - 14) ^ (ge >>> 18 | h << 32 - 18) ^ (h >>> 41 - 32 | ge << 32 - (41 - 32)), _ += g & 65535, A += g >>> 16, E += b & 65535, B += b >>> 16, b = h & ae ^ ~h & ye, g = ge & ve ^ ~ge & Be, _ += g & 65535, A += g >>> 16, E += b & 65535, B += b >>> 16, b = oo[O * 2], g = oo[O * 2 + 1], _ += g & 65535, A += g >>> 16, E += b & 65535, B += b >>> 16, b = l[O % 16], g = x[O % 16], _ += g & 65535, A += g >>> 16, E += b & 65535, B += b >>> 16, A += _ >>> 16, E += A >>> 16, B += E >>> 16, q = E & 65535 | B << 16, z = _ & 65535 | A << 16, b = q, g = z, _ = g & 65535, A = g >>> 16, E = b & 65535, B = b >>> 16, b = ($ >>> 28 | ie << 32 - 28) ^ (ie >>> 34 - 32 | $ << 32 - (34 - 32)) ^ (ie >>> 39 - 32 | $ << 32 - (39 - 32)), g = (ie >>> 28 | $ << 32 - 28) ^ ($ >>> 34 - 32 | ie << 32 - (34 - 32)) ^ ($ >>> 39 - 32 | ie << 32 - (39 - 32)), _ += g & 65535, A += g >>> 16, E += b & 65535, B += b >>> 16, b = $ & re ^ $ & se ^ re & se, g = ie & le ^ ie & de ^ le & de, _ += g & 65535, A += g >>> 16, E += b & 65535, B += b >>> 16, A += _ >>> 16, E += A >>> 16, B += E >>> 16, j = E & 65535 | B << 16, N = _ & 65535 | A << 16, b = k, g = Y, _ = g & 65535, A = g >>> 16, E = b & 65535, B = b >>> 16, b = q, g = z, _ += g & 65535, A += g >>> 16, E += b & 65535, B += b >>> 16, A += _ >>> 16, E += A >>> 16, B += E >>> 16, k = E & 65535 | B << 16, Y = _ & 65535 | A << 16, re = m, se = S, ne = R, h = k, ae = M, ye = he, xe = I, $ = j, le = V, de = te, Ue = ee, ge = Y, ve = Z, Be = X, Re = H, ie = N, O % 16 === 15)
                            for (P = 0; P < 16; P++) b = l[P], g = x[P], _ = g & 65535, A = g >>> 16, E = b & 65535, B = b >>> 16, b = l[(P + 9) % 16], g = x[(P + 9) % 16], _ += g & 65535, A += g >>> 16, E += b & 65535, B += b >>> 16, q = l[(P + 1) % 16], z = x[(P + 1) % 16], b = (q >>> 1 | z << 32 - 1) ^ (q >>> 8 | z << 32 - 8) ^ q >>> 7, g = (z >>> 1 | q << 32 - 1) ^ (z >>> 8 | q << 32 - 8) ^ (z >>> 7 | q << 32 - 7), _ += g & 65535, A += g >>> 16, E += b & 65535, B += b >>> 16, q = l[(P + 14) % 16], z = x[(P + 14) % 16], b = (q >>> 19 | z << 32 - 19) ^ (z >>> 61 - 32 | q << 32 - (61 - 32)) ^ q >>> 6, g = (z >>> 19 | q << 32 - 19) ^ (q >>> 61 - 32 | z << 32 - (61 - 32)) ^ (z >>> 6 | q << 32 - 6), _ += g & 65535, A += g >>> 16, E += b & 65535, B += b >>> 16, A += _ >>> 16, E += A >>> 16, B += E >>> 16, l[P] = E & 65535 | B << 16, x[P] = _ & 65535 | A << 16;
                    b = $, g = ie, _ = g & 65535, A = g >>> 16, E = b & 65535, B = b >>> 16, b = a[0], g = f[0], _ += g & 65535, A += g >>> 16, E += b & 65535, B += b >>> 16, A += _ >>> 16, E += A >>> 16, B += E >>> 16, a[0] = $ = E & 65535 | B << 16, f[0] = ie = _ & 65535 | A << 16, b = re, g = le, _ = g & 65535, A = g >>> 16, E = b & 65535, B = b >>> 16, b = a[1], g = f[1], _ += g & 65535, A += g >>> 16, E += b & 65535, B += b >>> 16, A += _ >>> 16, E += A >>> 16, B += E >>> 16, a[1] = re = E & 65535 | B << 16, f[1] = le = _ & 65535 | A << 16, b = se, g = de, _ = g & 65535, A = g >>> 16, E = b & 65535, B = b >>> 16, b = a[2], g = f[2], _ += g & 65535, A += g >>> 16, E += b & 65535, B += b >>> 16, A += _ >>> 16, E += A >>> 16, B += E >>> 16, a[2] = se = E & 65535 | B << 16, f[2] = de = _ & 65535 | A << 16, b = ne, g = Ue, _ = g & 65535, A = g >>> 16, E = b & 65535, B = b >>> 16, b = a[3], g = f[3], _ += g & 65535, A += g >>> 16, E += b & 65535, B += b >>> 16, A += _ >>> 16, E += A >>> 16, B += E >>> 16, a[3] = ne = E & 65535 | B << 16, f[3] = Ue = _ & 65535 | A << 16, b = h, g = ge, _ = g & 65535, A = g >>> 16, E = b & 65535, B = b >>> 16, b = a[4], g = f[4], _ += g & 65535, A += g >>> 16, E += b & 65535, B += b >>> 16, A += _ >>> 16, E += A >>> 16, B += E >>> 16, a[4] = h = E & 65535 | B << 16, f[4] = ge = _ & 65535 | A << 16, b = ae, g = ve, _ = g & 65535, A = g >>> 16, E = b & 65535, B = b >>> 16, b = a[5], g = f[5], _ += g & 65535, A += g >>> 16, E += b & 65535, B += b >>> 16, A += _ >>> 16, E += A >>> 16, B += E >>> 16, a[5] = ae = E & 65535 | B << 16, f[5] = ve = _ & 65535 | A << 16, b = ye, g = Be, _ = g & 65535, A = g >>> 16, E = b & 65535, B = b >>> 16, b = a[6], g = f[6], _ += g & 65535, A += g >>> 16, E += b & 65535, B += b >>> 16, A += _ >>> 16, E += A >>> 16, B += E >>> 16, a[6] = ye = E & 65535 | B << 16, f[6] = Be = _ & 65535 | A << 16, b = xe, g = Re, _ = g & 65535, A = g >>> 16, E = b & 65535, B = b >>> 16, b = a[7], g = f[7], _ += g & 65535, A += g >>> 16, E += b & 65535, B += b >>> 16, A += _ >>> 16, E += A >>> 16, B += E >>> 16, a[7] = xe = E & 65535 | B << 16, f[7] = Re = _ & 65535 | A << 16, qe += 128, s -= 128
                }
                return s
            }

            function fr(a, f, u) {
                var s = new Int32Array(8),
                    l = new Int32Array(8),
                    x = new Uint8Array(256),
                    m, S = u;
                for (s[0] = 1779033703, s[1] = 3144134277, s[2] = 1013904242, s[3] = 2773480762, s[4] = 1359893119, s[5] = 2600822924, s[6] = 528734635, s[7] = 1541459225, l[0] = 4089235720, l[1] = 2227873595, l[2] = 4271175723, l[3] = 1595750129, l[4] = 2917565137, l[5] = 725511199, l[6] = 4215389547, l[7] = 327033209, ao(s, l, f, u), u %= 128, m = 0; m < u; m++) x[m] = f[S - u + m];
                for (x[u] = 128, u = 256 - 128 * (u < 112 ? 1 : 0), x[u - 9] = 0, U(x, u - 8, S / 536870912 | 0, S << 3), ao(s, l, x, u), m = 0; m < 8; m++) U(a, 8 * m, s[m], l[m]);
                return 0
            }

            function kn(a, f) {
                var u = e(),
                    s = e(),
                    l = e(),
                    x = e(),
                    m = e(),
                    S = e(),
                    R = e(),
                    k = e(),
                    M = e();
                at(u, a[1], a[0]), at(M, f[1], f[0]), fe(u, u, M), ot(s, a[0], a[1]), ot(M, f[0], f[1]), fe(s, s, M), fe(l, a[3], f[3]), fe(l, l, T), fe(x, a[2], f[2]), ot(x, x, x), at(m, s, u), at(S, x, l), ot(R, x, l), ot(k, s, u), fe(a[0], m, S), fe(a[1], k, R), fe(a[2], R, S), fe(a[3], m, k)
            }

            function co(a, f, u) {
                var s;
                for (s = 0; s < 4; s++) Sr(a[s], f[s], u)
            }

            function Ds(a, f) {
                var u = e(),
                    s = e(),
                    l = e();
                ro(l, f[2]), fe(u, f[0], l), fe(s, f[1], l), Er(a, s), a[31] ^= to(u) << 7
            }

            function Os(a, f, u) {
                var s, l;
                for ($e(a[0], o), $e(a[1], c), $e(a[2], c), $e(a[3], o), l = 255; l >= 0; --l) s = u[l / 8 | 0] >> (l & 7) & 1, co(a, f, s), kn(f, a), kn(a, a), co(a, f, s)
            }

            function Nn(a, f) {
                var u = [e(), e(), e(), e()];
                $e(u[0], y), $e(u[1], w), $e(u[2], c), fe(u[3], y, w), Os(a, u, f)
            }

            function ks(a, f, u) {
                var s = new Uint8Array(64),
                    l = [e(), e(), e(), e()],
                    x;
                for (u || t(f, 32), fr(s, f, 32), s[0] &= 248, s[31] &= 127, s[31] |= 64, Nn(l, s), Ds(a, l), x = 0; x < 32; x++) f[x + 32] = a[x];
                return 0
            }
            var Ln = new Float64Array([237, 211, 245, 92, 26, 99, 18, 88, 214, 156, 247, 162, 222, 249, 222, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16]);

            function Ns(a, f) {
                var u, s, l, x;
                for (s = 63; s >= 32; --s) {
                    for (u = 0, l = s - 32, x = s - 12; l < x; ++l) f[l] += u - 16 * f[s] * Ln[l - (s - 32)], u = Math.floor((f[l] + 128) / 256), f[l] -= u * 256;
                    f[l] += u, f[s] = 0
                }
                for (u = 0, l = 0; l < 32; l++) f[l] += u - (f[31] >> 4) * Ln[l], u = f[l] >> 8, f[l] &= 255;
                for (l = 0; l < 32; l++) f[l] -= u * Ln[l];
                for (s = 0; s < 32; s++) f[s + 1] += f[s] >> 8, a[s] = f[s] & 255
            }

            function Ls(a) {
                var f = new Float64Array(64),
                    u;
                for (u = 0; u < 64; u++) f[u] = a[u];
                for (u = 0; u < 64; u++) a[u] = 0;
                Ns(a, f)
            }

            function uo(a, f, u, s) {
                var l = new Uint8Array(64),
                    x = new Uint8Array(64),
                    m = new Uint8Array(64),
                    S, R, k = new Float64Array(64),
                    M = [e(), e(), e(), e()];
                fr(l, s, 32), l[0] &= 248, l[31] &= 127, l[31] |= 64;
                var he = u + 64;
                for (S = 0; S < u; S++) a[64 + S] = f[S];
                for (S = 0; S < 32; S++) a[32 + S] = l[32 + S];
                for (fr(m, a.subarray(32), u + 32), Ls(m), Nn(M, m), Ds(a, M), S = 32; S < 64; S++) a[S] = s[S];
                for (fr(x, a, u + 64), Ls(x), S = 0; S < 64; S++) k[S] = 0;
                for (S = 0; S < 32; S++) k[S] = m[S];
                for (S = 0; S < 32; S++)
                    for (R = 0; R < 32; R++) k[S + R] += x[S] * l[R];
                return Ns(a.subarray(32), k), he
            }

            function zu(a, f) {
                var u = e(),
                    s = e(),
                    l = e(),
                    x = e(),
                    m = e(),
                    S = e(),
                    R = e();
                return $e(a[2], c), zs(a[1], f), Ze(l, a[1]), fe(x, l, p), at(l, l, a[2]), ot(x, a[2], x), Ze(m, x), Ze(S, m), fe(R, S, m), fe(u, R, l), fe(u, u, x), no(u, u), fe(u, u, l), fe(u, u, x), fe(u, u, x), fe(a[0], u, x), Ze(s, a[0]), fe(s, s, x), eo(s, l) && fe(a[0], a[0], v), Ze(s, a[0]), fe(s, s, x), eo(s, l) ? -1 : (to(a[0]) === f[31] >> 7 && at(a[0], o, a[0]), fe(a[3], a[0], a[1]), 0)
            }

            function Fs(a, f, u, s) {
                var l, x = new Uint8Array(32),
                    m = new Uint8Array(64),
                    S = [e(), e(), e(), e()],
                    R = [e(), e(), e(), e()];
                if (u < 64 || zu(R, s)) return -1;
                for (l = 0; l < u; l++) a[l] = f[l];
                for (l = 0; l < 32; l++) a[l + 32] = s[l];
                if (fr(m, a, u), Ls(m), Os(S, R, m), Nn(R, f.subarray(32)), kn(S, R), Ds(x, S), u -= 64, Q(f, 0, x, 0)) {
                    for (l = 0; l < u; l++) a[l] = 0;
                    return -1
                }
                for (l = 0; l < u; l++) a[l] = f[l + 64];
                return u
            }
            var $s = 32,
                Fn = 24,
                cn = 32,
                _r = 16,
                un = 32,
                $n = 32,
                fn = 32,
                ln = 32,
                Ws = 32,
                fo = Fn,
                Du = cn,
                Ou = _r,
                Bt = 64,
                lr = 32,
                vr = 64,
                Gs = 32,
                js = 64;
            r.lowlevel = {
                crypto_core_hsalsa20: F,
                crypto_stream_xor: Ee,
                crypto_stream: _e,
                crypto_stream_salsa20_xor: dt,
                crypto_stream_salsa20: pt,
                crypto_onetimeauth: st,
                crypto_onetimeauth_verify: Je,
                crypto_verify_16: W,
                crypto_verify_32: Q,
                crypto_secretbox: it,
                crypto_secretbox_open: ur,
                crypto_scalarmult: zn,
                crypto_scalarmult_base: Dn,
                crypto_box_beforenm: On,
                crypto_box_afternm: io,
                crypto_box: Cu,
                crypto_box_open: Hu,
                crypto_box_keypair: so,
                crypto_hash: fr,
                crypto_sign: uo,
                crypto_sign_keypair: ks,
                crypto_sign_open: Fs,
                crypto_secretbox_KEYBYTES: $s,
                crypto_secretbox_NONCEBYTES: Fn,
                crypto_secretbox_ZEROBYTES: cn,
                crypto_secretbox_BOXZEROBYTES: _r,
                crypto_scalarmult_BYTES: un,
                crypto_scalarmult_SCALARBYTES: $n,
                crypto_box_PUBLICKEYBYTES: fn,
                crypto_box_SECRETKEYBYTES: ln,
                crypto_box_BEFORENMBYTES: Ws,
                crypto_box_NONCEBYTES: fo,
                crypto_box_ZEROBYTES: Du,
                crypto_box_BOXZEROBYTES: Ou,
                crypto_sign_BYTES: Bt,
                crypto_sign_PUBLICKEYBYTES: lr,
                crypto_sign_SECRETKEYBYTES: vr,
                crypto_sign_SEEDBYTES: Gs,
                crypto_hash_BYTES: js,
                gf: e,
                D: p,
                L: Ln,
                pack25519: Er,
                unpack25519: zs,
                M: fe,
                A: ot,
                S: Ze,
                Z: at,
                pow2523: no,
                add: kn,
                set25519: $e,
                modL: Ns,
                scalarmult: Os,
                scalarbase: Nn
            };

            function lo(a, f) {
                if (a.length !== $s) throw new Error("bad key size");
                if (f.length !== Fn) throw new Error("bad nonce size")
            }

            function ku(a, f) {
                if (a.length !== fn) throw new Error("bad public key size");
                if (f.length !== ln) throw new Error("bad secret key size")
            }

            function Ye() {
                for (var a = 0; a < arguments.length; a++)
                    if (!(arguments[a] instanceof Uint8Array)) throw new TypeError("unexpected type, use Uint8Array")
            }

            function po(a) {
                for (var f = 0; f < a.length; f++) a[f] = 0
            }
            r.randomBytes = function (a) {
                    var f = new Uint8Array(a);
                    return t(f, a), f
                }, r.secretbox = function (a, f, u) {
                    Ye(a, f, u), lo(u, f);
                    for (var s = new Uint8Array(cn + a.length), l = new Uint8Array(s.length), x = 0; x < a.length; x++) s[x + cn] = a[x];
                    return it(l, s, s.length, f, u), l.subarray(_r)
                }, r.secretbox.open = function (a, f, u) {
                    Ye(a, f, u), lo(u, f);
                    for (var s = new Uint8Array(_r + a.length), l = new Uint8Array(s.length), x = 0; x < a.length; x++) s[x + _r] = a[x];
                    return s.length < 32 || ur(l, s, s.length, f, u) !== 0 ? null : l.subarray(cn)
                }, r.secretbox.keyLength = $s, r.secretbox.nonceLength = Fn, r.secretbox.overheadLength = _r, r.scalarMult = function (a, f) {
                    if (Ye(a, f), a.length !== $n) throw new Error("bad n size");
                    if (f.length !== un) throw new Error("bad p size");
                    var u = new Uint8Array(un);
                    return zn(u, a, f), u
                }, r.scalarMult.base = function (a) {
                    if (Ye(a), a.length !== $n) throw new Error("bad n size");
                    var f = new Uint8Array(un);
                    return Dn(f, a), f
                }, r.scalarMult.scalarLength = $n, r.scalarMult.groupElementLength = un, r.box = function (a, f, u, s) {
                    var l = r.box.before(u, s);
                    return r.secretbox(a, f, l)
                }, r.box.before = function (a, f) {
                    Ye(a, f), ku(a, f);
                    var u = new Uint8Array(Ws);
                    return On(u, a, f), u
                }, r.box.after = r.secretbox, r.box.open = function (a, f, u, s) {
                    var l = r.box.before(u, s);
                    return r.secretbox.open(a, f, l)
                }, r.box.open.after = r.secretbox.open, r.box.keyPair = function () {
                    var a = new Uint8Array(fn),
                        f = new Uint8Array(ln);
                    return so(a, f), {
                        publicKey: a,
                        secretKey: f
                    }
                }, r.box.keyPair.fromSecretKey = function (a) {
                    if (Ye(a), a.length !== ln) throw new Error("bad secret key size");
                    var f = new Uint8Array(fn);
                    return Dn(f, a), {
                        publicKey: f,
                        secretKey: new Uint8Array(a)
                    }
                }, r.box.publicKeyLength = fn, r.box.secretKeyLength = ln, r.box.sharedKeyLength = Ws, r.box.nonceLength = fo, r.box.overheadLength = r.secretbox.overheadLength, r.sign = function (a, f) {
                    if (Ye(a, f), f.length !== vr) throw new Error("bad secret key size");
                    var u = new Uint8Array(Bt + a.length);
                    return uo(u, a, a.length, f), u
                }, r.sign.open = function (a, f) {
                    if (Ye(a, f), f.length !== lr) throw new Error("bad public key size");
                    var u = new Uint8Array(a.length),
                        s = Fs(u, a, a.length, f);
                    if (s < 0) return null;
                    for (var l = new Uint8Array(s), x = 0; x < l.length; x++) l[x] = u[x];
                    return l
                }, r.sign.detached = function (a, f) {
                    for (var u = r.sign(a, f), s = new Uint8Array(Bt), l = 0; l < s.length; l++) s[l] = u[l];
                    return s
                }, r.sign.detached.verify = function (a, f, u) {
                    if (Ye(a, f, u), f.length !== Bt) throw new Error("bad signature size");
                    if (u.length !== lr) throw new Error("bad public key size");
                    var s = new Uint8Array(Bt + a.length),
                        l = new Uint8Array(Bt + a.length),
                        x;
                    for (x = 0; x < Bt; x++) s[x] = f[x];
                    for (x = 0; x < a.length; x++) s[x + Bt] = a[x];
                    return Fs(l, s, s.length, u) >= 0
                }, r.sign.keyPair = function () {
                    var a = new Uint8Array(lr),
                        f = new Uint8Array(vr);
                    return ks(a, f), {
                        publicKey: a,
                        secretKey: f
                    }
                }, r.sign.keyPair.fromSecretKey = function (a) {
                    if (Ye(a), a.length !== vr) throw new Error("bad secret key size");
                    for (var f = new Uint8Array(lr), u = 0; u < f.length; u++) f[u] = a[32 + u];
                    return {
                        publicKey: f,
                        secretKey: new Uint8Array(a)
                    }
                }, r.sign.keyPair.fromSeed = function (a) {
                    if (Ye(a), a.length !== Gs) throw new Error("bad seed size");
                    for (var f = new Uint8Array(lr), u = new Uint8Array(vr), s = 0; s < 32; s++) u[s] = a[s];
                    return ks(f, u, !0), {
                        publicKey: f,
                        secretKey: u
                    }
                }, r.sign.publicKeyLength = lr, r.sign.secretKeyLength = vr, r.sign.seedLength = Gs, r.sign.signatureLength = Bt, r.hash = function (a) {
                    Ye(a);
                    var f = new Uint8Array(js);
                    return fr(f, a, a.length), f
                }, r.hash.hashLength = js, r.verify = function (a, f) {
                    return Ye(a, f), a.length === 0 || f.length === 0 || a.length !== f.length ? !1 : C(a, 0, f, 0, a.length) === 0
                }, r.setPRNG = function (a) {
                    t = a
                },
                function () {
                    var a = typeof self != "undefined" ? self.crypto || self.msCrypto : null;
                    if (a && a.getRandomValues) {
                        var f = 65536;
                        r.setPRNG(function (u, s) {
                            var l, x = new Uint8Array(s);
                            for (l = 0; l < s; l += f) a.getRandomValues(x.subarray(l, l + Math.min(s - l, f)));
                            for (l = 0; l < s; l++) u[l] = x[l];
                            po(x)
                        })
                    } else typeof yo != "undefined" && (a = mo(), a && a.randomBytes && r.setPRNG(function (u, s) {
                        var l, x = a.randomBytes(s);
                        for (l = 0; l < s; l++) u[l] = x[l];
                        po(x)
                    }))
                }()
        })(typeof Gn != "undefined" && Gn.exports ? Gn.exports : self.nacl = self.nacl || {})
    });
    var yn = J(We => {
        "use strict";
        Object.defineProperty(We, "__esModule", {
            value: !0
        });
        We.output = We.exists = We.hash = We.bytes = We.bool = We.number = void 0;

        function Xn(r) {
            if (!Number.isSafeInteger(r) || r < 0) throw new Error(`Wrong positive integer: ${r}`)
        }
        We.number = Xn;

        function Ro(r) {
            if (typeof r != "boolean") throw new Error(`Expected boolean, not ${r}`)
        }
        We.bool = Ro;

        function Xs(r, ...e) {
            if (!(r instanceof Uint8Array)) throw new TypeError("Expected Uint8Array");
            if (e.length > 0 && !e.includes(r.length)) throw new TypeError(`Expected Uint8Array of length ${e}, not of length=${r.length}`)
        }
        We.bytes = Xs;

        function Uo(r) {
            if (typeof r != "function" || typeof r.create != "function") throw new Error("Hash should be wrapped by utils.wrapConstructor");
            Xn(r.outputLen), Xn(r.blockLen)
        }
        We.hash = Uo;

        function Po(r, e = !0) {
            if (r.destroyed) throw new Error("Hash instance has been destroyed");
            if (e && r.finished) throw new Error("Hash#digest() has already been called")
        }
        We.exists = Po;

        function Mo(r, e) {
            Xs(r);
            let t = e.outputLen;
            if (r.length < t) throw new Error(`digestInto() expects output buffer of length at least ${t}`)
        }
        We.output = Mo;
        var Mf = {
            number: Xn,
            bool: Ro,
            bytes: Xs,
            hash: Uo,
            exists: Po,
            output: Mo
        };
        We.default = Mf
    });
    var qo = J(Jn => {
        "use strict";
        Object.defineProperty(Jn, "__esModule", {
            value: !0
        });
        Jn.crypto = void 0;
        Jn.crypto = {
            node: void 0,
            web: typeof self == "object" && "crypto" in self ? self.crypto : void 0
        }
    });
    var dr = J(ue => {
        "use strict";
        Object.defineProperty(ue, "__esModule", {
            value: !0
        });
        ue.randomBytes = ue.wrapConstructorWithOpts = ue.wrapConstructor = ue.checkOpts = ue.Hash = ue.concatBytes = ue.toBytes = ue.utf8ToBytes = ue.asyncLoop = ue.nextTick = ue.hexToBytes = ue.bytesToHex = ue.isLE = ue.rotr = ue.createView = ue.u32 = ue.u8 = void 0;
        var Zn = qo(),
            qf = r => new Uint8Array(r.buffer, r.byteOffset, r.byteLength);
        ue.u8 = qf;
        var If = r => new Uint32Array(r.buffer, r.byteOffset, Math.floor(r.byteLength / 4));
        ue.u32 = If;
        var Cf = r => new DataView(r.buffer, r.byteOffset, r.byteLength);
        ue.createView = Cf;
        var Hf = (r, e) => r << 32 - e | r >>> e;
        ue.rotr = Hf;
        ue.isLE = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
        if (!ue.isLE) throw new Error("Non little-endian hardware is not supported");
        var zf = Array.from({
            length: 256
        }, (r, e) => e.toString(16).padStart(2, "0"));

        function Df(r) {
            if (!(r instanceof Uint8Array)) throw new Error("Uint8Array expected");
            let e = "";
            for (let t = 0; t < r.length; t++) e += zf[r[t]];
            return e
        }
        ue.bytesToHex = Df;

        function Of(r) {
            if (typeof r != "string") throw new TypeError("hexToBytes: expected string, got " + typeof r);
            if (r.length % 2) throw new Error("hexToBytes: received invalid unpadded hex");
            let e = new Uint8Array(r.length / 2);
            for (let t = 0; t < e.length; t++) {
                let n = t * 2,
                    i = r.slice(n, n + 2),
                    o = Number.parseInt(i, 16);
                if (Number.isNaN(o) || o < 0) throw new Error("Invalid byte sequence");
                e[t] = o
            }
            return e
        }
        ue.hexToBytes = Of;
        var kf = async () => {};
        ue.nextTick = kf;
        async function Nf(r, e, t) {
            let n = Date.now();
            for (let i = 0; i < r; i++) {
                t(i);
                let o = Date.now() - n;
                o >= 0 && o < e || (await (0, ue.nextTick)(), n += o)
            }
        }
        ue.asyncLoop = Nf;

        function Io(r) {
            if (typeof r != "string") throw new TypeError(`utf8ToBytes expected string, got ${typeof r}`);
            return new TextEncoder().encode(r)
        }
        ue.utf8ToBytes = Io;

        function Zs(r) {
            if (typeof r == "string" && (r = Io(r)), !(r instanceof Uint8Array)) throw new TypeError(`Expected input type is Uint8Array (got ${typeof r})`);
            return r
        }
        ue.toBytes = Zs;

        function Lf(...r) {
            if (!r.every(n => n instanceof Uint8Array)) throw new Error("Uint8Array list expected");
            if (r.length === 1) return r[0];
            let e = r.reduce((n, i) => n + i.length, 0),
                t = new Uint8Array(e);
            for (let n = 0, i = 0; n < r.length; n++) {
                let o = r[n];
                t.set(o, i), i += o.length
            }
            return t
        }
        ue.concatBytes = Lf;
        var Js = class {
            clone() {
                return this._cloneInto()
            }
        };
        ue.Hash = Js;
        var Ff = r => Object.prototype.toString.call(r) === "[object Object]" && r.constructor === Object;

        function $f(r, e) {
            if (e !== void 0 && (typeof e != "object" || !Ff(e))) throw new TypeError("Options should be object or undefined");
            return Object.assign(r, e)
        }
        ue.checkOpts = $f;

        function Wf(r) {
            let e = n => r().update(Zs(n)).digest(),
                t = r();
            return e.outputLen = t.outputLen, e.blockLen = t.blockLen, e.create = () => r(), e
        }
        ue.wrapConstructor = Wf;

        function Gf(r) {
            let e = (n, i) => r(i).update(Zs(n)).digest(),
                t = r({});
            return e.outputLen = t.outputLen, e.blockLen = t.blockLen, e.create = n => r(n), e
        }
        ue.wrapConstructorWithOpts = Gf;

        function jf(r = 32) {
            if (Zn.crypto.web) return Zn.crypto.web.getRandomValues(new Uint8Array(r));
            if (Zn.crypto.node) return new Uint8Array(Zn.crypto.node.randomBytes(r).buffer);
            throw new Error("The environment doesn't have randomBytes function")
        }
        ue.randomBytes = jf
    });
    var Co = J(xn => {
        "use strict";
        Object.defineProperty(xn, "__esModule", {
            value: !0
        });
        xn.hmac = void 0;
        var Qn = yn(),
            Qs = dr(),
            es = class extends Qs.Hash {
                constructor(e, t) {
                    super(), this.finished = !1, this.destroyed = !1, Qn.default.hash(e);
                    let n = (0, Qs.toBytes)(t);
                    if (this.iHash = e.create(), !(this.iHash instanceof Qs.Hash)) throw new TypeError("Expected instance of class which extends utils.Hash");
                    let i = this.blockLen = this.iHash.blockLen;
                    this.outputLen = this.iHash.outputLen;
                    let o = new Uint8Array(i);
                    o.set(n.length > this.iHash.blockLen ? e.create().update(n).digest() : n);
                    for (let c = 0; c < o.length; c++) o[c] ^= 54;
                    this.iHash.update(o), this.oHash = e.create();
                    for (let c = 0; c < o.length; c++) o[c] ^= 106;
                    this.oHash.update(o), o.fill(0)
                }
                update(e) {
                    return Qn.default.exists(this), this.iHash.update(e), this
                }
                digestInto(e) {
                    Qn.default.exists(this), Qn.default.bytes(e, this.outputLen), this.finished = !0, this.iHash.digestInto(e), this.oHash.update(e), this.oHash.digestInto(e), this.destroy()
                }
                digest() {
                    let e = new Uint8Array(this.oHash.outputLen);
                    return this.digestInto(e), e
                }
                _cloneInto(e) {
                    e || (e = Object.create(Object.getPrototypeOf(this), {}));
                    let {
                        oHash: t,
                        iHash: n,
                        finished: i,
                        destroyed: o,
                        blockLen: c,
                        outputLen: d
                    } = this;
                    return e = e, e.finished = i, e.destroyed = o, e.blockLen = c, e.outputLen = d, e.oHash = t._cloneInto(e.oHash), e.iHash = n._cloneInto(e.iHash), e
                }
                destroy() {
                    this.destroyed = !0, this.oHash.destroy(), this.iHash.destroy()
                }
            },
            Kf = (r, e, t) => new es(r, e).update(t).digest();
        xn.hmac = Kf;
        xn.hmac.create = (r, e) => new es(r, e)
    });
    var Do = J(Pr => {
        "use strict";
        Object.defineProperty(Pr, "__esModule", {
            value: !0
        });
        Pr.pbkdf2Async = Pr.pbkdf2 = void 0;
        var ts = yn(),
            Vf = Co(),
            Ur = dr();

        function Ho(r, e, t, n) {
            ts.default.hash(r);
            let i = (0, Ur.checkOpts)({
                    dkLen: 32,
                    asyncTick: 10
                }, n),
                {
                    c: o,
                    dkLen: c,
                    asyncTick: d
                } = i;
            if (ts.default.number(o), ts.default.number(c), ts.default.number(d), o < 1) throw new Error("PBKDF2: iterations (c) should be >= 1");
            let p = (0, Ur.toBytes)(e),
                T = (0, Ur.toBytes)(t),
                y = new Uint8Array(c),
                w = Vf.hmac.create(r, p),
                v = w._cloneInto().update(T);
            return {
                c: o,
                dkLen: c,
                asyncTick: d,
                DK: y,
                PRF: w,
                PRFSalt: v
            }
        }

        function zo(r, e, t, n, i) {
            return r.destroy(), e.destroy(), n && n.destroy(), i.fill(0), t
        }

        function Yf(r, e, t, n) {
            let {
                c: i,
                dkLen: o,
                DK: c,
                PRF: d,
                PRFSalt: p
            } = Ho(r, e, t, n), T, y = new Uint8Array(4), w = (0, Ur.createView)(y), v = new Uint8Array(d.outputLen);
            for (let U = 1, C = 0; C < o; U++, C += d.outputLen) {
                let W = c.subarray(C, C + d.outputLen);
                w.setInt32(0, U, !1), (T = p._cloneInto(T)).update(y).digestInto(v), W.set(v.subarray(0, W.length));
                for (let Q = 1; Q < i; Q++) {
                    d._cloneInto(T).update(v).digestInto(v);
                    for (let ce = 0; ce < W.length; ce++) W[ce] ^= v[ce]
                }
            }
            return zo(d, p, c, T, v)
        }
        Pr.pbkdf2 = Yf;
        async function Xf(r, e, t, n) {
            let {
                c: i,
                dkLen: o,
                asyncTick: c,
                DK: d,
                PRF: p,
                PRFSalt: T
            } = Ho(r, e, t, n), y, w = new Uint8Array(4), v = (0, Ur.createView)(w), U = new Uint8Array(p.outputLen);
            for (let C = 1, W = 0; W < o; C++, W += p.outputLen) {
                let Q = d.subarray(W, W + p.outputLen);
                v.setInt32(0, C, !1), (y = T._cloneInto(y)).update(w).digestInto(U), Q.set(U.subarray(0, Q.length)), await (0, Ur.asyncLoop)(i - 1, c, ce => {
                    p._cloneInto(y).update(U).digestInto(U);
                    for (let we = 0; we < Q.length; we++) Q[we] ^= U[we]
                })
            }
            return zo(p, T, d, y, U)
        }
        Pr.pbkdf2Async = Xf
    });
    var ri = J(rs => {
        "use strict";
        Object.defineProperty(rs, "__esModule", {
            value: !0
        });
        rs.SHA2 = void 0;
        var ei = yn(),
            mn = dr();

        function Jf(r, e, t, n) {
            if (typeof r.setBigUint64 == "function") return r.setBigUint64(e, t, n);
            let i = BigInt(32),
                o = BigInt(4294967295),
                c = Number(t >> i & o),
                d = Number(t & o),
                p = n ? 4 : 0,
                T = n ? 0 : 4;
            r.setUint32(e + p, c, n), r.setUint32(e + T, d, n)
        }
        var ti = class extends mn.Hash {
            constructor(e, t, n, i) {
                super(), this.blockLen = e, this.outputLen = t, this.padOffset = n, this.isLE = i, this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.buffer = new Uint8Array(e), this.view = (0, mn.createView)(this.buffer)
            }
            update(e) {
                ei.default.exists(this);
                let {
                    view: t,
                    buffer: n,
                    blockLen: i
                } = this;
                e = (0, mn.toBytes)(e);
                let o = e.length;
                for (let c = 0; c < o;) {
                    let d = Math.min(i - this.pos, o - c);
                    if (d === i) {
                        let p = (0, mn.createView)(e);
                        for (; i <= o - c; c += i) this.process(p, c);
                        continue
                    }
                    n.set(e.subarray(c, c + d), this.pos), this.pos += d, c += d, this.pos === i && (this.process(t, 0), this.pos = 0)
                }
                return this.length += e.length, this.roundClean(), this
            }
            digestInto(e) {
                ei.default.exists(this), ei.default.output(e, this), this.finished = !0;
                let {
                    buffer: t,
                    view: n,
                    blockLen: i,
                    isLE: o
                } = this, {
                    pos: c
                } = this;
                t[c++] = 128, this.buffer.subarray(c).fill(0), this.padOffset > i - c && (this.process(n, 0), c = 0);
                for (let p = c; p < i; p++) t[p] = 0;
                Jf(n, i - 8, BigInt(this.length * 8), o), this.process(n, 0);
                let d = (0, mn.createView)(e);
                this.get().forEach((p, T) => d.setUint32(4 * T, p, o))
            }
            digest() {
                let {
                    buffer: e,
                    outputLen: t
                } = this;
                this.digestInto(e);
                let n = e.slice(0, t);
                return this.destroy(), n
            }
            _cloneInto(e) {
                e || (e = new this.constructor), e.set(...this.get());
                let {
                    blockLen: t,
                    buffer: n,
                    length: i,
                    finished: o,
                    destroyed: c,
                    pos: d
                } = this;
                return e.length = i, e.pos = d, e.finished = o, e.destroyed = c, i % t && e.buffer.set(n), e
            }
        };
        rs.SHA2 = ti
    });
    var Oo = J(ns => {
        "use strict";
        Object.defineProperty(ns, "__esModule", {
            value: !0
        });
        ns.sha256 = void 0;
        var Zf = ri(),
            ct = dr(),
            Qf = (r, e, t) => r & e ^ ~r & t,
            el = (r, e, t) => r & e ^ r & t ^ e & t,
            tl = new Uint32Array([1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298]),
            Ot = new Uint32Array([1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225]),
            kt = new Uint32Array(64),
            ni = class extends Zf.SHA2 {
                constructor() {
                    super(64, 32, 8, !1), this.A = Ot[0] | 0, this.B = Ot[1] | 0, this.C = Ot[2] | 0, this.D = Ot[3] | 0, this.E = Ot[4] | 0, this.F = Ot[5] | 0, this.G = Ot[6] | 0, this.H = Ot[7] | 0
                }
                get() {
                    let {
                        A: e,
                        B: t,
                        C: n,
                        D: i,
                        E: o,
                        F: c,
                        G: d,
                        H: p
                    } = this;
                    return [e, t, n, i, o, c, d, p]
                }
                set(e, t, n, i, o, c, d, p) {
                    this.A = e | 0, this.B = t | 0, this.C = n | 0, this.D = i | 0, this.E = o | 0, this.F = c | 0, this.G = d | 0, this.H = p | 0
                }
                process(e, t) {
                    for (let w = 0; w < 16; w++, t += 4) kt[w] = e.getUint32(t, !1);
                    for (let w = 16; w < 64; w++) {
                        let v = kt[w - 15],
                            U = kt[w - 2],
                            C = (0, ct.rotr)(v, 7) ^ (0, ct.rotr)(v, 18) ^ v >>> 3,
                            W = (0, ct.rotr)(U, 17) ^ (0, ct.rotr)(U, 19) ^ U >>> 10;
                        kt[w] = W + kt[w - 7] + C + kt[w - 16] | 0
                    }
                    let {
                        A: n,
                        B: i,
                        C: o,
                        D: c,
                        E: d,
                        F: p,
                        G: T,
                        H: y
                    } = this;
                    for (let w = 0; w < 64; w++) {
                        let v = (0, ct.rotr)(d, 6) ^ (0, ct.rotr)(d, 11) ^ (0, ct.rotr)(d, 25),
                            U = y + v + Qf(d, p, T) + tl[w] + kt[w] | 0,
                            W = ((0, ct.rotr)(n, 2) ^ (0, ct.rotr)(n, 13) ^ (0, ct.rotr)(n, 22)) + el(n, i, o) | 0;
                        y = T, T = p, p = d, d = c + U | 0, c = o, o = i, i = n, n = U + W | 0
                    }
                    n = n + this.A | 0, i = i + this.B | 0, o = o + this.C | 0, c = c + this.D | 0, d = d + this.E | 0, p = p + this.F | 0, T = T + this.G | 0, y = y + this.H | 0, this.set(n, i, o, c, d, p, T, y)
                }
                roundClean() {
                    kt.fill(0)
                }
                destroy() {
                    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0)
                }
            };
        ns.sha256 = (0, ct.wrapConstructor)(() => new ni)
    });
    var Lo = J(Qe => {
        "use strict";
        Object.defineProperty(Qe, "__esModule", {
            value: !0
        });
        Qe.add = Qe.toBig = Qe.split = Qe.fromBig = void 0;
        var ss = BigInt(2 ** 32 - 1),
            si = BigInt(32);

        function ii(r, e = !1) {
            return e ? {
                h: Number(r & ss),
                l: Number(r >> si & ss)
            } : {
                h: Number(r >> si & ss) | 0,
                l: Number(r & ss) | 0
            }
        }
        Qe.fromBig = ii;

        function ko(r, e = !1) {
            let t = new Uint32Array(r.length),
                n = new Uint32Array(r.length);
            for (let i = 0; i < r.length; i++) {
                let {
                    h: o,
                    l: c
                } = ii(r[i], e);
                [t[i], n[i]] = [o, c]
            }
            return [t, n]
        }
        Qe.split = ko;
        var rl = (r, e) => BigInt(r >>> 0) << si | BigInt(e >>> 0);
        Qe.toBig = rl;
        var nl = (r, e, t) => r >>> t,
            sl = (r, e, t) => r << 32 - t | e >>> t,
            il = (r, e, t) => r >>> t | e << 32 - t,
            ol = (r, e, t) => r << 32 - t | e >>> t,
            al = (r, e, t) => r << 64 - t | e >>> t - 32,
            cl = (r, e, t) => r >>> t - 32 | e << 64 - t,
            ul = (r, e) => e,
            fl = (r, e) => r,
            ll = (r, e, t) => r << t | e >>> 32 - t,
            dl = (r, e, t) => e << t | r >>> 32 - t,
            pl = (r, e, t) => e << t - 32 | r >>> 64 - t,
            hl = (r, e, t) => r << t - 32 | e >>> 64 - t;

        function No(r, e, t, n) {
            let i = (e >>> 0) + (n >>> 0);
            return {
                h: r + t + (i / 2 ** 32 | 0) | 0,
                l: i | 0
            }
        }
        Qe.add = No;
        var yl = (r, e, t) => (r >>> 0) + (e >>> 0) + (t >>> 0),
            xl = (r, e, t, n) => e + t + n + (r / 2 ** 32 | 0) | 0,
            ml = (r, e, t, n) => (r >>> 0) + (e >>> 0) + (t >>> 0) + (n >>> 0),
            bl = (r, e, t, n, i) => e + t + n + i + (r / 2 ** 32 | 0) | 0,
            gl = (r, e, t, n, i) => (r >>> 0) + (e >>> 0) + (t >>> 0) + (n >>> 0) + (i >>> 0),
            wl = (r, e, t, n, i, o) => e + t + n + i + o + (r / 2 ** 32 | 0) | 0,
            Tl = {
                fromBig: ii,
                split: ko,
                toBig: Qe.toBig,
                shrSH: nl,
                shrSL: sl,
                rotrSH: il,
                rotrSL: ol,
                rotrBH: al,
                rotrBL: cl,
                rotr32H: ul,
                rotr32L: fl,
                rotlSH: ll,
                rotlSL: dl,
                rotlBH: pl,
                rotlBL: hl,
                add: No,
                add3L: yl,
                add3H: xl,
                add4L: ml,
                add4H: bl,
                add5H: wl,
                add5L: gl
            };
        Qe.default = Tl
    });
    var Fo = J(ht => {
        "use strict";
        Object.defineProperty(ht, "__esModule", {
            value: !0
        });
        ht.sha384 = ht.sha512_256 = ht.sha512 = ht.SHA512 = void 0;
        var Al = ri(),
            oe = Lo(),
            ci = dr(),
            [Sl, El] = oe.default.split(["0x428a2f98d728ae22", "0x7137449123ef65cd", "0xb5c0fbcfec4d3b2f", "0xe9b5dba58189dbbc", "0x3956c25bf348b538", "0x59f111f1b605d019", "0x923f82a4af194f9b", "0xab1c5ed5da6d8118", "0xd807aa98a3030242", "0x12835b0145706fbe", "0x243185be4ee4b28c", "0x550c7dc3d5ffb4e2", "0x72be5d74f27b896f", "0x80deb1fe3b1696b1", "0x9bdc06a725c71235", "0xc19bf174cf692694", "0xe49b69c19ef14ad2", "0xefbe4786384f25e3", "0x0fc19dc68b8cd5b5", "0x240ca1cc77ac9c65", "0x2de92c6f592b0275", "0x4a7484aa6ea6e483", "0x5cb0a9dcbd41fbd4", "0x76f988da831153b5", "0x983e5152ee66dfab", "0xa831c66d2db43210", "0xb00327c898fb213f", "0xbf597fc7beef0ee4", "0xc6e00bf33da88fc2", "0xd5a79147930aa725", "0x06ca6351e003826f", "0x142929670a0e6e70", "0x27b70a8546d22ffc", "0x2e1b21385c26c926", "0x4d2c6dfc5ac42aed", "0x53380d139d95b3df", "0x650a73548baf63de", "0x766a0abb3c77b2a8", "0x81c2c92e47edaee6", "0x92722c851482353b", "0xa2bfe8a14cf10364", "0xa81a664bbc423001", "0xc24b8b70d0f89791", "0xc76c51a30654be30", "0xd192e819d6ef5218", "0xd69906245565a910", "0xf40e35855771202a", "0x106aa07032bbd1b8", "0x19a4c116b8d2d0c8", "0x1e376c085141ab53", "0x2748774cdf8eeb99", "0x34b0bcb5e19b48a8", "0x391c0cb3c5c95a63", "0x4ed8aa4ae3418acb", "0x5b9cca4f7763e373", "0x682e6ff3d6b2b8a3", "0x748f82ee5defb2fc", "0x78a5636f43172f60", "0x84c87814a1f0ab72", "0x8cc702081a6439ec", "0x90befffa23631e28", "0xa4506cebde82bde9", "0xbef9a3f7b2c67915", "0xc67178f2e372532b", "0xca273eceea26619c", "0xd186b8c721c0c207", "0xeada7dd6cde0eb1e", "0xf57d4f7fee6ed178", "0x06f067aa72176fba", "0x0a637dc5a2c898a6", "0x113f9804bef90dae", "0x1b710b35131c471b", "0x28db77f523047d84", "0x32caab7b40c72493", "0x3c9ebe0a15c9bebc", "0x431d67c49c100d4c", "0x4cc5d4becb3e42b6", "0x597f299cfc657e2a", "0x5fcb6fab3ad6faec", "0x6c44198c4a475817"].map(r => BigInt(r))),
            Nt = new Uint32Array(80),
            Lt = new Uint32Array(80),
            Mr = class extends Al.SHA2 {
                constructor() {
                    super(128, 64, 16, !1), this.Ah = 1779033703, this.Al = -205731576, this.Bh = -1150833019, this.Bl = -2067093701, this.Ch = 1013904242, this.Cl = -23791573, this.Dh = -1521486534, this.Dl = 1595750129, this.Eh = 1359893119, this.El = -1377402159, this.Fh = -1694144372, this.Fl = 725511199, this.Gh = 528734635, this.Gl = -79577749, this.Hh = 1541459225, this.Hl = 327033209
                }
                get() {
                    let {
                        Ah: e,
                        Al: t,
                        Bh: n,
                        Bl: i,
                        Ch: o,
                        Cl: c,
                        Dh: d,
                        Dl: p,
                        Eh: T,
                        El: y,
                        Fh: w,
                        Fl: v,
                        Gh: U,
                        Gl: C,
                        Hh: W,
                        Hl: Q
                    } = this;
                    return [e, t, n, i, o, c, d, p, T, y, w, v, U, C, W, Q]
                }
                set(e, t, n, i, o, c, d, p, T, y, w, v, U, C, W, Q) {
                    this.Ah = e | 0, this.Al = t | 0, this.Bh = n | 0, this.Bl = i | 0, this.Ch = o | 0, this.Cl = c | 0, this.Dh = d | 0, this.Dl = p | 0, this.Eh = T | 0, this.El = y | 0, this.Fh = w | 0, this.Fl = v | 0, this.Gh = U | 0, this.Gl = C | 0, this.Hh = W | 0, this.Hl = Q | 0
                }
                process(e, t) {
                    for (let D = 0; D < 16; D++, t += 4) Nt[D] = e.getUint32(t), Lt[D] = e.getUint32(t += 4);
                    for (let D = 16; D < 80; D++) {
                        let F = Nt[D - 15] | 0,
                            pe = Lt[D - 15] | 0,
                            dt = oe.default.rotrSH(F, pe, 1) ^ oe.default.rotrSH(F, pe, 8) ^ oe.default.shrSH(F, pe, 7),
                            pt = oe.default.rotrSL(F, pe, 1) ^ oe.default.rotrSL(F, pe, 8) ^ oe.default.shrSL(F, pe, 7),
                            _e = Nt[D - 2] | 0,
                            Ee = Lt[D - 2] | 0,
                            Ge = oe.default.rotrSH(_e, Ee, 19) ^ oe.default.rotrBH(_e, Ee, 61) ^ oe.default.shrSH(_e, Ee, 6),
                            st = oe.default.rotrSL(_e, Ee, 19) ^ oe.default.rotrBL(_e, Ee, 61) ^ oe.default.shrSL(_e, Ee, 6),
                            Je = oe.default.add4L(pt, st, Lt[D - 7], Lt[D - 16]),
                            it = oe.default.add4H(Je, dt, Ge, Nt[D - 7], Nt[D - 16]);
                        Nt[D] = it | 0, Lt[D] = Je | 0
                    }
                    let {
                        Ah: n,
                        Al: i,
                        Bh: o,
                        Bl: c,
                        Ch: d,
                        Cl: p,
                        Dh: T,
                        Dl: y,
                        Eh: w,
                        El: v,
                        Fh: U,
                        Fl: C,
                        Gh: W,
                        Gl: Q,
                        Hh: ce,
                        Hl: we
                    } = this;
                    for (let D = 0; D < 80; D++) {
                        let F = oe.default.rotrSH(w, v, 14) ^ oe.default.rotrSH(w, v, 18) ^ oe.default.rotrBH(w, v, 41),
                            pe = oe.default.rotrSL(w, v, 14) ^ oe.default.rotrSL(w, v, 18) ^ oe.default.rotrBL(w, v, 41),
                            dt = w & U ^ ~w & W,
                            pt = v & C ^ ~v & Q,
                            _e = oe.default.add5L(we, pe, pt, El[D], Lt[D]),
                            Ee = oe.default.add5H(_e, ce, F, dt, Sl[D], Nt[D]),
                            Ge = _e | 0,
                            st = oe.default.rotrSH(n, i, 28) ^ oe.default.rotrBH(n, i, 34) ^ oe.default.rotrBH(n, i, 39),
                            Je = oe.default.rotrSL(n, i, 28) ^ oe.default.rotrBL(n, i, 34) ^ oe.default.rotrBL(n, i, 39),
                            it = n & o ^ n & d ^ o & d,
                            ur = i & c ^ i & p ^ c & p;
                        ce = W | 0, we = Q | 0, W = U | 0, Q = C | 0, U = w | 0, C = v | 0, {
                            h: w,
                            l: v
                        } = oe.default.add(T | 0, y | 0, Ee | 0, Ge | 0), T = d | 0, y = p | 0, d = o | 0, p = c | 0, o = n | 0, c = i | 0;
                        let $e = oe.default.add3L(Ge, Je, ur);
                        n = oe.default.add3H($e, Ee, st, it), i = $e | 0
                    }({
                        h: n,
                        l: i
                    } = oe.default.add(this.Ah | 0, this.Al | 0, n | 0, i | 0)), {
                        h: o,
                        l: c
                    } = oe.default.add(this.Bh | 0, this.Bl | 0, o | 0, c | 0), {
                        h: d,
                        l: p
                    } = oe.default.add(this.Ch | 0, this.Cl | 0, d | 0, p | 0), {
                        h: T,
                        l: y
                    } = oe.default.add(this.Dh | 0, this.Dl | 0, T | 0, y | 0), {
                        h: w,
                        l: v
                    } = oe.default.add(this.Eh | 0, this.El | 0, w | 0, v | 0), {
                        h: U,
                        l: C
                    } = oe.default.add(this.Fh | 0, this.Fl | 0, U | 0, C | 0), {
                        h: W,
                        l: Q
                    } = oe.default.add(this.Gh | 0, this.Gl | 0, W | 0, Q | 0), {
                        h: ce,
                        l: we
                    } = oe.default.add(this.Hh | 0, this.Hl | 0, ce | 0, we | 0), this.set(n, i, o, c, d, p, T, y, w, v, U, C, W, Q, ce, we)
                }
                roundClean() {
                    Nt.fill(0), Lt.fill(0)
                }
                destroy() {
                    this.buffer.fill(0), this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
                }
            };
        ht.SHA512 = Mr;
        var oi = class extends Mr {
                constructor() {
                    super(), this.Ah = 573645204, this.Al = -64227540, this.Bh = -1621794909, this.Bl = -934517566, this.Ch = 596883563, this.Cl = 1867755857, this.Dh = -1774684391, this.Dl = 1497426621, this.Eh = -1775747358, this.El = -1467023389, this.Fh = -1101128155, this.Fl = 1401305490, this.Gh = 721525244, this.Gl = 746961066, this.Hh = 246885852, this.Hl = -2117784414, this.outputLen = 32
                }
            },
            ai = class extends Mr {
                constructor() {
                    super(), this.Ah = -876896931, this.Al = -1056596264, this.Bh = 1654270250, this.Bl = 914150663, this.Ch = -1856437926, this.Cl = 812702999, this.Dh = 355462360, this.Dl = -150054599, this.Eh = 1731405415, this.El = -4191439, this.Fh = -1900787065, this.Fl = 1750603025, this.Gh = -619958771, this.Gl = 1694076839, this.Hh = 1203062813, this.Hl = -1090891868, this.outputLen = 48
                }
            };
        ht.sha512 = (0, ci.wrapConstructor)(() => new Mr);
        ht.sha512_256 = (0, ci.wrapConstructor)(() => new oi);
        ht.sha384 = (0, ci.wrapConstructor)(() => new ai)
    });
    var ea = J(L => {
        "use strict";
        Object.defineProperty(L, "__esModule", {
            value: !0
        });
        L.bytes = L.stringToBytes = L.str = L.bytesToString = L.hex = L.utf8 = L.bech32m = L.bech32 = L.base58check = L.base58xmr = L.base58xrp = L.base58flickr = L.base58 = L.base64url = L.base64 = L.base32crockford = L.base32hex = L.base32 = L.base16 = L.utils = L.assertNumber = void 0;

        function Ft(r) {
            if (!Number.isSafeInteger(r)) throw new Error(`Wrong integer: ${r}`)
        }
        L.assertNumber = Ft;

        function ut(...r) {
            let e = (i, o) => c => i(o(c)),
                t = Array.from(r).reverse().reduce((i, o) => i ? e(i, o.encode) : o.encode, void 0),
                n = r.reduce((i, o) => i ? e(i, o.decode) : o.decode, void 0);
            return {
                encode: t,
                decode: n
            }
        }

        function yt(r) {
            return {
                encode: e => {
                    if (!Array.isArray(e) || e.length && typeof e[0] != "number") throw new Error("alphabet.encode input should be an array of numbers");
                    return e.map(t => {
                        if (Ft(t), t < 0 || t >= r.length) throw new Error(`Digit index outside alphabet: ${t} (alphabet: ${r.length})`);
                        return r[t]
                    })
                },
                decode: e => {
                    if (!Array.isArray(e) || e.length && typeof e[0] != "string") throw new Error("alphabet.decode input should be array of strings");
                    return e.map(t => {
                        if (typeof t != "string") throw new Error(`alphabet.decode: not string element=${t}`);
                        let n = r.indexOf(t);
                        if (n === -1) throw new Error(`Unknown letter: "${t}". Allowed: ${r}`);
                        return n
                    })
                }
            }
        }

        function xt(r = "") {
            if (typeof r != "string") throw new Error("join separator should be string");
            return {
                encode: e => {
                    if (!Array.isArray(e) || e.length && typeof e[0] != "string") throw new Error("join.encode input should be array of strings");
                    for (let t of e)
                        if (typeof t != "string") throw new Error(`join.encode: non-string input=${t}`);
                    return e.join(r)
                },
                decode: e => {
                    if (typeof e != "string") throw new Error("join.decode input should be string");
                    return e.split(r)
                }
            }
        }

        function wn(r, e = "=") {
            if (Ft(r), typeof e != "string") throw new Error("padding chr should be string");
            return {
                encode(t) {
                    if (!Array.isArray(t) || t.length && typeof t[0] != "string") throw new Error("padding.encode input should be array of strings");
                    for (let n of t)
                        if (typeof n != "string") throw new Error(`padding.encode: non-string input=${n}`);
                    for (; t.length * r % 8;) t.push(e);
                    return t
                },
                decode(t) {
                    if (!Array.isArray(t) || t.length && typeof t[0] != "string") throw new Error("padding.encode input should be array of strings");
                    for (let i of t)
                        if (typeof i != "string") throw new Error(`padding.decode: non-string input=${i}`);
                    let n = t.length;
                    if (n * r % 8) throw new Error("Invalid padding: string should have whole number of bytes");
                    for (; n > 0 && t[n - 1] === e; n--)
                        if (!((n - 1) * r % 8)) throw new Error("Invalid padding: string has too much padding");
                    return t.slice(0, n)
                }
            }
        }

        function Vo(r) {
            if (typeof r != "function") throw new Error("normalize fn should be function");
            return {
                encode: e => e,
                decode: e => r(e)
            }
        }

        function $o(r, e, t) {
            if (e < 2) throw new Error(`convertRadix: wrong from=${e}, base cannot be less than 2`);
            if (t < 2) throw new Error(`convertRadix: wrong to=${t}, base cannot be less than 2`);
            if (!Array.isArray(r)) throw new Error("convertRadix: data should be array");
            if (!r.length) return [];
            let n = 0,
                i = [],
                o = Array.from(r);
            for (o.forEach(c => {
                    if (Ft(c), c < 0 || c >= e) throw new Error(`Wrong integer: ${c}`)
                });;) {
                let c = 0,
                    d = !0;
                for (let p = n; p < o.length; p++) {
                    let T = o[p],
                        y = e * c + T;
                    if (!Number.isSafeInteger(y) || e * c / e !== c || y - T !== e * c) throw new Error("convertRadix: carry overflow");
                    if (c = y % t, o[p] = Math.floor(y / t), !Number.isSafeInteger(o[p]) || o[p] * t + c !== y) throw new Error("convertRadix: carry overflow");
                    if (d) o[p] ? d = !1 : n = p;
                    else continue
                }
                if (i.push(c), d) break
            }
            for (let c = 0; c < r.length - 1 && r[c] === 0; c++) i.push(0);
            return i.reverse()
        }
        var Yo = (r, e) => e ? Yo(e, r % e) : r,
            is = (r, e) => r + (e - Yo(r, e));

        function ui(r, e, t, n) {
            if (!Array.isArray(r)) throw new Error("convertRadix2: data should be array");
            if (e <= 0 || e > 32) throw new Error(`convertRadix2: wrong from=${e}`);
            if (t <= 0 || t > 32) throw new Error(`convertRadix2: wrong to=${t}`);
            if (is(e, t) > 32) throw new Error(`convertRadix2: carry overflow from=${e} to=${t} carryBits=${is(e,t)}`);
            let i = 0,
                o = 0,
                c = 2 ** t - 1,
                d = [];
            for (let p of r) {
                if (Ft(p), p >= 2 ** e) throw new Error(`convertRadix2: invalid data word=${p} from=${e}`);
                if (i = i << e | p, o + e > 32) throw new Error(`convertRadix2: carry overflow pos=${o} from=${e}`);
                for (o += e; o >= t; o -= t) d.push((i >> o - t & c) >>> 0);
                i &= 2 ** o - 1
            }
            if (i = i << t - o & c, !n && o >= e) throw new Error("Excess padding");
            if (!n && i) throw new Error(`Non-zero padding: ${i}`);
            return n && o > 0 && d.push(i >>> 0), d
        }

        function Xo(r) {
            return Ft(r), {
                encode: e => {
                    if (!(e instanceof Uint8Array)) throw new Error("radix.encode input should be Uint8Array");
                    return $o(Array.from(e), 2 ** 8, r)
                },
                decode: e => {
                    if (!Array.isArray(e) || e.length && typeof e[0] != "number") throw new Error("radix.decode input should be array of strings");
                    return Uint8Array.from($o(e, r, 2 ** 8))
                }
            }
        }

        function Pt(r, e = !1) {
            if (Ft(r), r <= 0 || r > 32) throw new Error("radix2: bits should be in (0..32]");
            if (is(8, r) > 32 || is(r, 8) > 32) throw new Error("radix2: carry overflow");
            return {
                encode: t => {
                    if (!(t instanceof Uint8Array)) throw new Error("radix2.encode input should be Uint8Array");
                    return ui(Array.from(t), 8, r, !e)
                },
                decode: t => {
                    if (!Array.isArray(t) || t.length && typeof t[0] != "number") throw new Error("radix2.decode input should be array of strings");
                    return Uint8Array.from(ui(t, r, 8, e))
                }
            }
        }

        function Wo(r) {
            if (typeof r != "function") throw new Error("unsafeWrapper fn should be function");
            return function (...e) {
                try {
                    return r.apply(null, e)
                } catch (t) {}
            }
        }

        function Jo(r, e) {
            if (Ft(r), typeof e != "function") throw new Error("checksum fn should be function");
            return {
                encode(t) {
                    if (!(t instanceof Uint8Array)) throw new Error("checksum.encode: input should be Uint8Array");
                    let n = e(t).slice(0, r),
                        i = new Uint8Array(t.length + r);
                    return i.set(t), i.set(n, t.length), i
                },
                decode(t) {
                    if (!(t instanceof Uint8Array)) throw new Error("checksum.decode: input should be Uint8Array");
                    let n = t.slice(0, -r),
                        i = e(n).slice(0, r),
                        o = t.slice(-r);
                    for (let c = 0; c < r; c++)
                        if (i[c] !== o[c]) throw new Error("Invalid checksum");
                    return n
                }
            }
        }
        L.utils = {
            alphabet: yt,
            chain: ut,
            checksum: Jo,
            radix: Xo,
            radix2: Pt,
            join: xt,
            padding: wn
        };
        L.base16 = ut(Pt(4), yt("0123456789ABCDEF"), xt(""));
        L.base32 = ut(Pt(5), yt("ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"), wn(5), xt(""));
        L.base32hex = ut(Pt(5), yt("0123456789ABCDEFGHIJKLMNOPQRSTUV"), wn(5), xt(""));
        L.base32crockford = ut(Pt(5), yt("0123456789ABCDEFGHJKMNPQRSTVWXYZ"), xt(""), Vo(r => r.toUpperCase().replace(/O/g, "0").replace(/[IL]/g, "1")));
        L.base64 = ut(Pt(6), yt("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"), wn(6), xt(""));
        L.base64url = ut(Pt(6), yt("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"), wn(6), xt(""));
        var li = r => ut(Xo(58), yt(r), xt(""));
        L.base58 = li("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz");
        L.base58flickr = li("123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ");
        L.base58xrp = li("rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz");
        var Go = [0, 2, 3, 5, 6, 7, 9, 10, 11];
        L.base58xmr = {
            encode(r) {
                let e = "";
                for (let t = 0; t < r.length; t += 8) {
                    let n = r.subarray(t, t + 8);
                    e += L.base58.encode(n).padStart(Go[n.length], "1")
                }
                return e
            },
            decode(r) {
                let e = [];
                for (let t = 0; t < r.length; t += 11) {
                    let n = r.slice(t, t + 11),
                        i = Go.indexOf(n.length),
                        o = L.base58.decode(n);
                    for (let c = 0; c < o.length - i; c++)
                        if (o[c] !== 0) throw new Error("base58xmr: wrong padding");
                    e = e.concat(Array.from(o.slice(o.length - i)))
                }
                return Uint8Array.from(e)
            }
        };
        var _l = r => ut(Jo(4, e => r(r(e))), L.base58);
        L.base58check = _l;
        var fi = ut(yt("qpzry9x8gf2tvdw0s3jn54khce6mua7l"), xt("")),
            jo = [996825010, 642813549, 513874426, 1027748829, 705979059];

        function bn(r) {
            let e = r >> 25,
                t = (r & 33554431) << 5;
            for (let n = 0; n < jo.length; n++)(e >> n & 1) === 1 && (t ^= jo[n]);
            return t
        }

        function Ko(r, e, t = 1) {
            let n = r.length,
                i = 1;
            for (let o = 0; o < n; o++) {
                let c = r.charCodeAt(o);
                if (c < 33 || c > 126) throw new Error(`Invalid prefix (${r})`);
                i = bn(i) ^ c >> 5
            }
            i = bn(i);
            for (let o = 0; o < n; o++) i = bn(i) ^ r.charCodeAt(o) & 31;
            for (let o of e) i = bn(i) ^ o;
            for (let o = 0; o < 6; o++) i = bn(i);
            return i ^= t, fi.encode(ui([i % 2 ** 30], 30, 5, !1))
        }

        function Zo(r) {
            let e = r === "bech32" ? 1 : 734539939,
                t = Pt(5),
                n = t.decode,
                i = t.encode,
                o = Wo(n);

            function c(y, w, v = 90) {
                if (typeof y != "string") throw new Error(`bech32.encode prefix should be string, not ${typeof y}`);
                if (!Array.isArray(w) || w.length && typeof w[0] != "number") throw new Error(`bech32.encode words should be array of numbers, not ${typeof w}`);
                let U = y.length + 7 + w.length;
                if (v !== !1 && U > v) throw new TypeError(`Length ${U} exceeds limit ${v}`);
                return y = y.toLowerCase(), `${y}1${fi.encode(w)}${Ko(y,w,e)}`
            }

            function d(y, w = 90) {
                if (typeof y != "string") throw new Error(`bech32.decode input should be string, not ${typeof y}`);
                if (y.length < 8 || w !== !1 && y.length > w) throw new TypeError(`Wrong string length: ${y.length} (${y}). Expected (8..${w})`);
                let v = y.toLowerCase();
                if (y !== v && y !== y.toUpperCase()) throw new Error("String must be lowercase or uppercase");
                y = v;
                let U = y.lastIndexOf("1");
                if (U === 0 || U === -1) throw new Error('Letter "1" must be present between prefix and data only');
                let C = y.slice(0, U),
                    W = y.slice(U + 1);
                if (W.length < 6) throw new Error("Data must be at least 6 characters long");
                let Q = fi.decode(W).slice(0, -6),
                    ce = Ko(C, Q, e);
                if (!W.endsWith(ce)) throw new Error(`Invalid checksum in ${y}: expected "${ce}"`);
                return {
                    prefix: C,
                    words: Q
                }
            }
            let p = Wo(d);

            function T(y) {
                let {
                    prefix: w,
                    words: v
                } = d(y, !1);
                return {
                    prefix: w,
                    words: v,
                    bytes: n(v)
                }
            }
            return {
                encode: c,
                decode: d,
                decodeToBytes: T,
                decodeUnsafe: p,
                fromWords: n,
                fromWordsUnsafe: o,
                toWords: i
            }
        }
        L.bech32 = Zo("bech32");
        L.bech32m = Zo("bech32m");
        L.utf8 = {
            encode: r => new TextDecoder().decode(r),
            decode: r => new TextEncoder().encode(r)
        };
        L.hex = ut(Pt(4), yt("0123456789abcdef"), xt(""), Vo(r => {
            if (typeof r != "string" || r.length % 2) throw new TypeError(`hex.decode: expected string, got ${typeof r} with length ${r.length}`);
            return r.toLowerCase()
        }));
        var gn = {
                utf8: L.utf8,
                hex: L.hex,
                base16: L.base16,
                base32: L.base32,
                base64: L.base64,
                base64url: L.base64url,
                base58: L.base58,
                base58xmr: L.base58xmr
            },
            Qo = `Invalid encoding type. Available types: ${Object.keys(gn).join(", ")}`,
            vl = (r, e) => {
                if (typeof r != "string" || !gn.hasOwnProperty(r)) throw new TypeError(Qo);
                if (!(e instanceof Uint8Array)) throw new TypeError("bytesToString() expects Uint8Array");
                return gn[r].encode(e)
            };
        L.bytesToString = vl;
        L.str = L.bytesToString;
        var Bl = (r, e) => {
            if (!gn.hasOwnProperty(r)) throw new TypeError(Qo);
            if (typeof e != "string") throw new TypeError("stringToBytes() expects string");
            return gn[r].decode(e)
        };
        L.stringToBytes = Bl;
        L.bytes = L.stringToBytes
    });
    var fa = J(je => {
        "use strict";
        Object.defineProperty(je, "__esModule", {
            value: !0
        });
        je.mnemonicToSeedSync = je.mnemonicToSeed = je.validateMnemonic = je.entropyToMnemonic = je.mnemonicToEntropy = je.generateMnemonic = void 0;
        var ta = yn(),
            ra = Do(),
            Rl = Oo(),
            na = Fo(),
            Ul = dr(),
            os = ea(),
            Pl = r => r[0] === "\u3042\u3044\u3053\u304F\u3057\u3093";

        function sa(r) {
            if (typeof r != "string") throw new TypeError(`Invalid mnemonic type: ${typeof r}`);
            return r.normalize("NFKD")
        }

        function di(r) {
            let e = sa(r),
                t = e.split(" ");
            if (![12, 15, 18, 21, 24].includes(t.length)) throw new Error("Invalid mnemonic");
            return {
                nfkd: e,
                words: t
            }
        }

        function ia(r) {
            ta.default.bytes(r, 16, 20, 24, 28, 32)
        }

        function Ml(r, e = 128) {
            if (ta.default.number(e), e % 32 !== 0 || e > 256) throw new TypeError("Invalid entropy");
            return ca((0, Ul.randomBytes)(e / 8), r)
        }
        je.generateMnemonic = Ml;
        var ql = r => {
            let e = 8 - r.length / 4;
            return new Uint8Array([(0, Rl.sha256)(r)[0] >> e << e])
        };

        function oa(r) {
            if (!Array.isArray(r) || r.length !== 2 ** 11 || typeof r[0] != "string") throw new Error("Worlist: expected array of 2048 strings");
            return r.forEach(e => {
                if (typeof e != "string") throw new Error(`Wordlist: non-string element: ${e}`)
            }), os.utils.chain(os.utils.checksum(1, ql), os.utils.radix2(11, !0), os.utils.alphabet(r))
        }

        function aa(r, e) {
            let {
                words: t
            } = di(r), n = oa(e).decode(t);
            return ia(n), n
        }
        je.mnemonicToEntropy = aa;

        function ca(r, e) {
            return ia(r), oa(e).encode(r).join(Pl(e) ? "\u3000" : " ")
        }
        je.entropyToMnemonic = ca;

        function Il(r, e) {
            try {
                aa(r, e)
            } catch (t) {
                return !1
            }
            return !0
        }
        je.validateMnemonic = Il;
        var ua = r => sa(`mnemonic${r}`);

        function Cl(r, e = "") {
            return (0, ra.pbkdf2Async)(na.sha512, di(r).nfkd, ua(e), {
                c: 2048,
                dkLen: 64
            })
        }
        je.mnemonicToSeed = Cl;

        function Hl(r, e = "") {
            return (0, ra.pbkdf2)(na.sha512, di(r).nfkd, ua(e), {
                c: 2048,
                dkLen: 64
            })
        }
        je.mnemonicToSeedSync = Hl
    });
    var xi = J((Uh, ga) => {
        "use strict";
        ga.exports = function (e, t) {
            return function () {
                for (var i = new Array(arguments.length), o = 0; o < i.length; o++) i[o] = arguments[o];
                return e.apply(t, i)
            }
        }
    });
    var Ie = J((Ph, Aa) => {
        "use strict";
        var jl = xi(),
            bi = Object.prototype.toString,
            gi = function (r) {
                return function (e) {
                    var t = bi.call(e);
                    return r[t] || (r[t] = t.slice(8, -1).toLowerCase())
                }
            }(Object.create(null));

        function hr(r) {
            return r = r.toLowerCase(),
                function (t) {
                    return gi(t) === r
                }
        }

        function wi(r) {
            return Array.isArray(r)
        }

        function ms(r) {
            return typeof r == "undefined"
        }

        function Kl(r) {
            return r !== null && !ms(r) && r.constructor !== null && !ms(r.constructor) && typeof r.constructor.isBuffer == "function" && r.constructor.isBuffer(r)
        }
        var wa = hr("ArrayBuffer");

        function Vl(r) {
            var e;
            return typeof ArrayBuffer != "undefined" && ArrayBuffer.isView ? e = ArrayBuffer.isView(r) : e = r && r.buffer && wa(r.buffer), e
        }

        function Yl(r) {
            return typeof r == "string"
        }

        function Xl(r) {
            return typeof r == "number"
        }

        function Ta(r) {
            return r !== null && typeof r == "object"
        }

        function xs(r) {
            if (gi(r) !== "object") return !1;
            var e = Object.getPrototypeOf(r);
            return e === null || e === Object.prototype
        }
        var Jl = hr("Date"),
            Zl = hr("File"),
            Ql = hr("Blob"),
            ed = hr("FileList");

        function Ti(r) {
            return bi.call(r) === "[object Function]"
        }

        function td(r) {
            return Ta(r) && Ti(r.pipe)
        }

        function rd(r) {
            var e = "[object FormData]";
            return r && (typeof FormData == "function" && r instanceof FormData || bi.call(r) === e || Ti(r.toString) && r.toString() === e)
        }
        var nd = hr("URLSearchParams");

        function sd(r) {
            return r.trim ? r.trim() : r.replace(/^\s+|\s+$/g, "")
        }

        function id() {
            return typeof navigator != "undefined" && (navigator.product === "ReactNative" || navigator.product === "NativeScript" || navigator.product === "NS") ? !1 : typeof window != "undefined" && typeof document != "undefined"
        }

        function Ai(r, e) {
            if (!(r === null || typeof r == "undefined"))
                if (typeof r != "object" && (r = [r]), wi(r))
                    for (var t = 0, n = r.length; t < n; t++) e.call(null, r[t], t, r);
                else
                    for (var i in r) Object.prototype.hasOwnProperty.call(r, i) && e.call(null, r[i], i, r)
        }

        function mi() {
            var r = {};

            function e(i, o) {
                xs(r[o]) && xs(i) ? r[o] = mi(r[o], i) : xs(i) ? r[o] = mi({}, i) : wi(i) ? r[o] = i.slice() : r[o] = i
            }
            for (var t = 0, n = arguments.length; t < n; t++) Ai(arguments[t], e);
            return r
        }

        function od(r, e, t) {
            return Ai(e, function (i, o) {
                t && typeof i == "function" ? r[o] = jl(i, t) : r[o] = i
            }), r
        }

        function ad(r) {
            return r.charCodeAt(0) === 65279 && (r = r.slice(1)), r
        }

        function cd(r, e, t, n) {
            r.prototype = Object.create(e.prototype, n), r.prototype.constructor = r, t && Object.assign(r.prototype, t)
        }

        function ud(r, e, t) {
            var n, i, o, c = {};
            e = e || {};
            do {
                for (n = Object.getOwnPropertyNames(r), i = n.length; i-- > 0;) o = n[i], c[o] || (e[o] = r[o], c[o] = !0);
                r = Object.getPrototypeOf(r)
            } while (r && (!t || t(r, e)) && r !== Object.prototype);
            return e
        }

        function fd(r, e, t) {
            r = String(r), (t === void 0 || t > r.length) && (t = r.length), t -= e.length;
            var n = r.indexOf(e, t);
            return n !== -1 && n === t
        }

        function ld(r) {
            if (!r) return null;
            var e = r.length;
            if (ms(e)) return null;
            for (var t = new Array(e); e-- > 0;) t[e] = r[e];
            return t
        }
        var dd = function (r) {
            return function (e) {
                return r && e instanceof r
            }
        }(typeof Uint8Array != "undefined" && Object.getPrototypeOf(Uint8Array));
        Aa.exports = {
            isArray: wi,
            isArrayBuffer: wa,
            isBuffer: Kl,
            isFormData: rd,
            isArrayBufferView: Vl,
            isString: Yl,
            isNumber: Xl,
            isObject: Ta,
            isPlainObject: xs,
            isUndefined: ms,
            isDate: Jl,
            isFile: Zl,
            isBlob: Ql,
            isFunction: Ti,
            isStream: td,
            isURLSearchParams: nd,
            isStandardBrowserEnv: id,
            forEach: Ai,
            merge: mi,
            extend: od,
            trim: sd,
            stripBOM: ad,
            inherits: cd,
            toFlatObject: ud,
            kindOf: gi,
            kindOfTest: hr,
            endsWith: fd,
            toArray: ld,
            isTypedArray: dd,
            isFileList: ed
        }
    });
    var Si = J((Mh, Ea) => {
        "use strict";
        var Cr = Ie();

        function Sa(r) {
            return encodeURIComponent(r).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]")
        }
        Ea.exports = function (e, t, n) {
            if (!t) return e;
            var i;
            if (n) i = n(t);
            else if (Cr.isURLSearchParams(t)) i = t.toString();
            else {
                var o = [];
                Cr.forEach(t, function (p, T) {
                    p === null || typeof p == "undefined" || (Cr.isArray(p) ? T = T + "[]" : p = [p], Cr.forEach(p, function (w) {
                        Cr.isDate(w) ? w = w.toISOString() : Cr.isObject(w) && (w = JSON.stringify(w)), o.push(Sa(T) + "=" + Sa(w))
                    }))
                }), i = o.join("&")
            }
            if (i) {
                var c = e.indexOf("#");
                c !== -1 && (e = e.slice(0, c)), e += (e.indexOf("?") === -1 ? "?" : "&") + i
            }
            return e
        }
    });
    var va = J((qh, _a) => {
        "use strict";
        var pd = Ie();

        function bs() {
            this.handlers = []
        }
        bs.prototype.use = function (e, t, n) {
            return this.handlers.push({
                fulfilled: e,
                rejected: t,
                synchronous: n ? n.synchronous : !1,
                runWhen: n ? n.runWhen : null
            }), this.handlers.length - 1
        };
        bs.prototype.eject = function (e) {
            this.handlers[e] && (this.handlers[e] = null)
        };
        bs.prototype.forEach = function (e) {
            pd.forEach(this.handlers, function (n) {
                n !== null && e(n)
            })
        };
        _a.exports = bs
    });
    var Ra = J((Ih, Ba) => {
        "use strict";
        var hd = Ie();
        Ba.exports = function (e, t) {
            hd.forEach(e, function (i, o) {
                o !== t && o.toUpperCase() === t.toUpperCase() && (e[t] = i, delete e[o])
            })
        }
    });
    var yr = J((Ch, qa) => {
        "use strict";
        var Ua = Ie();

        function Hr(r, e, t, n, i) {
            Error.call(this), this.message = r, this.name = "AxiosError", e && (this.code = e), t && (this.config = t), n && (this.request = n), i && (this.response = i)
        }
        Ua.inherits(Hr, Error, {
            toJSON: function () {
                return {
                    message: this.message,
                    name: this.name,
                    description: this.description,
                    number: this.number,
                    fileName: this.fileName,
                    lineNumber: this.lineNumber,
                    columnNumber: this.columnNumber,
                    stack: this.stack,
                    config: this.config,
                    code: this.code,
                    status: this.response && this.response.status ? this.response.status : null
                }
            }
        });
        var Pa = Hr.prototype,
            Ma = {};
        ["ERR_BAD_OPTION_VALUE", "ERR_BAD_OPTION", "ECONNABORTED", "ETIMEDOUT", "ERR_NETWORK", "ERR_FR_TOO_MANY_REDIRECTS", "ERR_DEPRECATED", "ERR_BAD_RESPONSE", "ERR_BAD_REQUEST", "ERR_CANCELED"].forEach(function (r) {
            Ma[r] = {
                value: r
            }
        });
        Object.defineProperties(Hr, Ma);
        Object.defineProperty(Pa, "isAxiosError", {
            value: !0
        });
        Hr.from = function (r, e, t, n, i, o) {
            var c = Object.create(Pa);
            return Ua.toFlatObject(r, c, function (p) {
                return p !== Error.prototype
            }), Hr.call(c, r.message, e, t, n, i), c.name = r.name, o && Object.assign(c, o), c
        };
        qa.exports = Hr
    });
    var Ei = J((Hh, Ia) => {
        "use strict";
        Ia.exports = {
            silentJSONParsing: !0,
            forcedJSONParsing: !0,
            clarifyTimeoutError: !1
        }
    });
    var _i = J((zh, Ca) => {
        "use strict";
        var ft = Ie();

        function yd(r, e) {
            e = e || new FormData;
            var t = [];

            function n(o) {
                return o === null ? "" : ft.isDate(o) ? o.toISOString() : ft.isArrayBuffer(o) || ft.isTypedArray(o) ? typeof Blob == "function" ? new Blob([o]) : Buffer.from(o) : o
            }

            function i(o, c) {
                if (ft.isPlainObject(o) || ft.isArray(o)) {
                    if (t.indexOf(o) !== -1) throw Error("Circular reference detected in " + c);
                    t.push(o), ft.forEach(o, function (p, T) {
                        if (!ft.isUndefined(p)) {
                            var y = c ? c + "." + T : T,
                                w;
                            if (p && !c && typeof p == "object") {
                                if (ft.endsWith(T, "{}")) p = JSON.stringify(p);
                                else if (ft.endsWith(T, "[]") && (w = ft.toArray(p))) {
                                    w.forEach(function (v) {
                                        !ft.isUndefined(v) && e.append(y, n(v))
                                    });
                                    return
                                }
                            }
                            i(p, y)
                        }
                    }), t.pop()
                } else e.append(c, n(o))
            }
            return i(r), e
        }
        Ca.exports = yd
    });
    var za = J((Dh, Ha) => {
        "use strict";
        var vi = yr();
        Ha.exports = function (e, t, n) {
            var i = n.config.validateStatus;
            !n.status || !i || i(n.status) ? e(n) : t(new vi("Request failed with status code " + n.status, [vi.ERR_BAD_REQUEST, vi.ERR_BAD_RESPONSE][Math.floor(n.status / 100) - 4], n.config, n.request, n))
        }
    });
    var Oa = J((Oh, Da) => {
        "use strict";
        var gs = Ie();
        Da.exports = gs.isStandardBrowserEnv() ? function () {
            return {
                write: function (t, n, i, o, c, d) {
                    var p = [];
                    p.push(t + "=" + encodeURIComponent(n)), gs.isNumber(i) && p.push("expires=" + new Date(i).toGMTString()), gs.isString(o) && p.push("path=" + o), gs.isString(c) && p.push("domain=" + c), d === !0 && p.push("secure"), document.cookie = p.join("; ")
                },
                read: function (t) {
                    var n = document.cookie.match(new RegExp("(^|;\\s*)(" + t + ")=([^;]*)"));
                    return n ? decodeURIComponent(n[3]) : null
                },
                remove: function (t) {
                    this.write(t, "", Date.now() - 864e5)
                }
            }
        }() : function () {
            return {
                write: function () {},
                read: function () {
                    return null
                },
                remove: function () {}
            }
        }()
    });
    var Na = J((kh, ka) => {
        "use strict";
        ka.exports = function (e) {
            return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)
        }
    });
    var Fa = J((Nh, La) => {
        "use strict";
        La.exports = function (e, t) {
            return t ? e.replace(/\/+$/, "") + "/" + t.replace(/^\/+/, "") : e
        }
    });
    var Bi = J((Lh, $a) => {
        "use strict";
        var xd = Na(),
            md = Fa();
        $a.exports = function (e, t) {
            return e && !xd(t) ? md(e, t) : t
        }
    });
    var Ga = J((Fh, Wa) => {
        "use strict";
        var Ri = Ie(),
            bd = ["age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent"];
        Wa.exports = function (e) {
            var t = {},
                n, i, o;
            return e && Ri.forEach(e.split(`
`), function (d) {
                if (o = d.indexOf(":"), n = Ri.trim(d.substr(0, o)).toLowerCase(), i = Ri.trim(d.substr(o + 1)), n) {
                    if (t[n] && bd.indexOf(n) >= 0) return;
                    n === "set-cookie" ? t[n] = (t[n] ? t[n] : []).concat([i]) : t[n] = t[n] ? t[n] + ", " + i : i
                }
            }), t
        }
    });
    var Va = J(($h, Ka) => {
        "use strict";
        var ja = Ie();
        Ka.exports = ja.isStandardBrowserEnv() ? function () {
            var e = /(msie|trident)/i.test(navigator.userAgent),
                t = document.createElement("a"),
                n;

            function i(o) {
                var c = o;
                return e && (t.setAttribute("href", c), c = t.href), t.setAttribute("href", c), {
                    href: t.href,
                    protocol: t.protocol ? t.protocol.replace(/:$/, "") : "",
                    host: t.host,
                    search: t.search ? t.search.replace(/^\?/, "") : "",
                    hash: t.hash ? t.hash.replace(/^#/, "") : "",
                    hostname: t.hostname,
                    port: t.port,
                    pathname: t.pathname.charAt(0) === "/" ? t.pathname : "/" + t.pathname
                }
            }
            return n = i(window.location.href),
                function (c) {
                    var d = ja.isString(c) ? i(c) : c;
                    return d.protocol === n.protocol && d.host === n.host
                }
        }() : function () {
            return function () {
                return !0
            }
        }()
    });
    var En = J((Wh, Xa) => {
        "use strict";
        var Ui = yr(),
            gd = Ie();

        function Ya(r) {
            Ui.call(this, r == null ? "canceled" : r, Ui.ERR_CANCELED), this.name = "CanceledError"
        }
        gd.inherits(Ya, Ui, {
            __CANCEL__: !0
        });
        Xa.exports = Ya
    });
    var Za = J((Gh, Ja) => {
        "use strict";
        Ja.exports = function (e) {
            var t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
            return t && t[1] || ""
        }
    });
    var Pi = J((jh, Qa) => {
        "use strict";
        var _n = Ie(),
            wd = za(),
            Td = Oa(),
            Ad = Si(),
            Sd = Bi(),
            Ed = Ga(),
            _d = Va(),
            vd = Ei(),
            Mt = yr(),
            Bd = En(),
            Rd = Za();
        Qa.exports = function (e) {
            return new Promise(function (n, i) {
                var o = e.data,
                    c = e.headers,
                    d = e.responseType,
                    p;

                function T() {
                    e.cancelToken && e.cancelToken.unsubscribe(p), e.signal && e.signal.removeEventListener("abort", p)
                }
                _n.isFormData(o) && _n.isStandardBrowserEnv() && delete c["Content-Type"];
                var y = new XMLHttpRequest;
                if (e.auth) {
                    var w = e.auth.username || "",
                        v = e.auth.password ? unescape(encodeURIComponent(e.auth.password)) : "";
                    c.Authorization = "Basic " + btoa(w + ":" + v)
                }
                var U = Sd(e.baseURL, e.url);
                y.open(e.method.toUpperCase(), Ad(U, e.params, e.paramsSerializer), !0), y.timeout = e.timeout;

                function C() {
                    if (!!y) {
                        var ce = "getAllResponseHeaders" in y ? Ed(y.getAllResponseHeaders()) : null,
                            we = !d || d === "text" || d === "json" ? y.responseText : y.response,
                            D = {
                                data: we,
                                status: y.status,
                                statusText: y.statusText,
                                headers: ce,
                                config: e,
                                request: y
                            };
                        wd(function (pe) {
                            n(pe), T()
                        }, function (pe) {
                            i(pe), T()
                        }, D), y = null
                    }
                }
                if ("onloadend" in y ? y.onloadend = C : y.onreadystatechange = function () {
                        !y || y.readyState !== 4 || y.status === 0 && !(y.responseURL && y.responseURL.indexOf("file:") === 0) || setTimeout(C)
                    }, y.onabort = function () {
                        !y || (i(new Mt("Request aborted", Mt.ECONNABORTED, e, y)), y = null)
                    }, y.onerror = function () {
                        i(new Mt("Network Error", Mt.ERR_NETWORK, e, y, y)), y = null
                    }, y.ontimeout = function () {
                        var we = e.timeout ? "timeout of " + e.timeout + "ms exceeded" : "timeout exceeded",
                            D = e.transitional || vd;
                        e.timeoutErrorMessage && (we = e.timeoutErrorMessage), i(new Mt(we, D.clarifyTimeoutError ? Mt.ETIMEDOUT : Mt.ECONNABORTED, e, y)), y = null
                    }, _n.isStandardBrowserEnv()) {
                    var W = (e.withCredentials || _d(U)) && e.xsrfCookieName ? Td.read(e.xsrfCookieName) : void 0;
                    W && (c[e.xsrfHeaderName] = W)
                }
                "setRequestHeader" in y && _n.forEach(c, function (we, D) {
                    typeof o == "undefined" && D.toLowerCase() === "content-type" ? delete c[D] : y.setRequestHeader(D, we)
                }), _n.isUndefined(e.withCredentials) || (y.withCredentials = !!e.withCredentials), d && d !== "json" && (y.responseType = e.responseType), typeof e.onDownloadProgress == "function" && y.addEventListener("progress", e.onDownloadProgress), typeof e.onUploadProgress == "function" && y.upload && y.upload.addEventListener("progress", e.onUploadProgress), (e.cancelToken || e.signal) && (p = function (ce) {
                    !y || (i(!ce || ce && ce.type ? new Bd : ce), y.abort(), y = null)
                }, e.cancelToken && e.cancelToken.subscribe(p), e.signal && (e.signal.aborted ? p() : e.signal.addEventListener("abort", p))), o || (o = null);
                var Q = Rd(U);
                if (Q && ["http", "https", "file"].indexOf(Q) === -1) {
                    i(new Mt("Unsupported protocol " + Q + ":", Mt.ERR_BAD_REQUEST, e));
                    return
                }
                y.send(o)
            })
        }
    });
    var tc = J((Kh, ec) => {
        ec.exports = null
    });
    var Ts = J((Vh, ic) => {
        "use strict";
        var Ce = Ie(),
            rc = Ra(),
            nc = yr(),
            Ud = Ei(),
            Pd = _i(),
            Md = {
                "Content-Type": "application/x-www-form-urlencoded"
            };

        function sc(r, e) {
            !Ce.isUndefined(r) && Ce.isUndefined(r["Content-Type"]) && (r["Content-Type"] = e)
        }

        function qd() {
            var r;
            return typeof XMLHttpRequest != "undefined" ? r = Pi() : typeof process != "undefined" && Object.prototype.toString.call(process) === "[object process]" && (r = Pi()), r
        }

        function Id(r, e, t) {
            if (Ce.isString(r)) try {
                return (e || JSON.parse)(r), Ce.trim(r)
            } catch (n) {
                if (n.name !== "SyntaxError") throw n
            }
            return (t || JSON.stringify)(r)
        }
        var ws = {
            transitional: Ud,
            adapter: qd(),
            transformRequest: [function (e, t) {
                if (rc(t, "Accept"), rc(t, "Content-Type"), Ce.isFormData(e) || Ce.isArrayBuffer(e) || Ce.isBuffer(e) || Ce.isStream(e) || Ce.isFile(e) || Ce.isBlob(e)) return e;
                if (Ce.isArrayBufferView(e)) return e.buffer;
                if (Ce.isURLSearchParams(e)) return sc(t, "application/x-www-form-urlencoded;charset=utf-8"), e.toString();
                var n = Ce.isObject(e),
                    i = t && t["Content-Type"],
                    o;
                if ((o = Ce.isFileList(e)) || n && i === "multipart/form-data") {
                    var c = this.env && this.env.FormData;
                    return Pd(o ? {
                        "files[]": e
                    } : e, c && new c)
                } else if (n || i === "application/json") return sc(t, "application/json"), Id(e);
                return e
            }],
            transformResponse: [function (e) {
                var t = this.transitional || ws.transitional,
                    n = t && t.silentJSONParsing,
                    i = t && t.forcedJSONParsing,
                    o = !n && this.responseType === "json";
                if (o || i && Ce.isString(e) && e.length) try {
                    return JSON.parse(e)
                } catch (c) {
                    if (o) throw c.name === "SyntaxError" ? nc.from(c, nc.ERR_BAD_RESPONSE, this, null, this.response) : c
                }
                return e
            }],
            timeout: 0,
            xsrfCookieName: "XSRF-TOKEN",
            xsrfHeaderName: "X-XSRF-TOKEN",
            maxContentLength: -1,
            maxBodyLength: -1,
            env: {
                FormData: tc()
            },
            validateStatus: function (e) {
                return e >= 200 && e < 300
            },
            headers: {
                common: {
                    Accept: "application/json, text/plain, */*"
                }
            }
        };
        Ce.forEach(["delete", "get", "head"], function (e) {
            ws.headers[e] = {}
        });
        Ce.forEach(["post", "put", "patch"], function (e) {
            ws.headers[e] = Ce.merge(Md)
        });
        ic.exports = ws
    });
    var ac = J((Yh, oc) => {
        "use strict";
        var Cd = Ie(),
            Hd = Ts();
        oc.exports = function (e, t, n) {
            var i = this || Hd;
            return Cd.forEach(n, function (c) {
                e = c.call(i, e, t)
            }), e
        }
    });
    var Mi = J((Xh, cc) => {
        "use strict";
        cc.exports = function (e) {
            return !!(e && e.__CANCEL__)
        }
    });
    var lc = J((Jh, fc) => {
        "use strict";
        var uc = Ie(),
            qi = ac(),
            zd = Mi(),
            Dd = Ts(),
            Od = En();

        function Ii(r) {
            if (r.cancelToken && r.cancelToken.throwIfRequested(), r.signal && r.signal.aborted) throw new Od
        }
        fc.exports = function (e) {
            Ii(e), e.headers = e.headers || {}, e.data = qi.call(e, e.data, e.headers, e.transformRequest), e.headers = uc.merge(e.headers.common || {}, e.headers[e.method] || {}, e.headers), uc.forEach(["delete", "get", "head", "post", "put", "patch", "common"], function (i) {
                delete e.headers[i]
            });
            var t = e.adapter || Dd.adapter;
            return t(e).then(function (i) {
                return Ii(e), i.data = qi.call(e, i.data, i.headers, e.transformResponse), i
            }, function (i) {
                return zd(i) || (Ii(e), i && i.response && (i.response.data = qi.call(e, i.response.data, i.response.headers, e.transformResponse))), Promise.reject(i)
            })
        }
    });
    var Ci = J((Zh, dc) => {
        "use strict";
        var Xe = Ie();
        dc.exports = function (e, t) {
            t = t || {};
            var n = {};

            function i(y, w) {
                return Xe.isPlainObject(y) && Xe.isPlainObject(w) ? Xe.merge(y, w) : Xe.isPlainObject(w) ? Xe.merge({}, w) : Xe.isArray(w) ? w.slice() : w
            }

            function o(y) {
                if (Xe.isUndefined(t[y])) {
                    if (!Xe.isUndefined(e[y])) return i(void 0, e[y])
                } else return i(e[y], t[y])
            }

            function c(y) {
                if (!Xe.isUndefined(t[y])) return i(void 0, t[y])
            }

            function d(y) {
                if (Xe.isUndefined(t[y])) {
                    if (!Xe.isUndefined(e[y])) return i(void 0, e[y])
                } else return i(void 0, t[y])
            }

            function p(y) {
                if (y in t) return i(e[y], t[y]);
                if (y in e) return i(void 0, e[y])
            }
            var T = {
                url: c,
                method: c,
                data: c,
                baseURL: d,
                transformRequest: d,
                transformResponse: d,
                paramsSerializer: d,
                timeout: d,
                timeoutMessage: d,
                withCredentials: d,
                adapter: d,
                responseType: d,
                xsrfCookieName: d,
                xsrfHeaderName: d,
                onUploadProgress: d,
                onDownloadProgress: d,
                decompress: d,
                maxContentLength: d,
                maxBodyLength: d,
                beforeRedirect: d,
                transport: d,
                httpAgent: d,
                httpsAgent: d,
                cancelToken: d,
                socketPath: d,
                responseEncoding: d,
                validateStatus: p
            };
            return Xe.forEach(Object.keys(e).concat(Object.keys(t)), function (w) {
                var v = T[w] || o,
                    U = v(w);
                Xe.isUndefined(U) && v !== p || (n[w] = U)
            }), n
        }
    });
    var Hi = J((Qh, pc) => {
        pc.exports = {
            version: "0.27.2"
        }
    });
    var xc = J((ey, yc) => {
        "use strict";
        var kd = Hi().version,
            Gt = yr(),
            zi = {};
        ["object", "boolean", "number", "function", "string", "symbol"].forEach(function (r, e) {
            zi[r] = function (n) {
                return typeof n === r || "a" + (e < 1 ? "n " : " ") + r
            }
        });
        var hc = {};
        zi.transitional = function (e, t, n) {
            function i(o, c) {
                return "[Axios v" + kd + "] Transitional option '" + o + "'" + c + (n ? ". " + n : "")
            }
            return function (o, c, d) {
                if (e === !1) throw new Gt(i(c, " has been removed" + (t ? " in " + t : "")), Gt.ERR_DEPRECATED);
                return t && !hc[c] && (hc[c] = !0, console.warn(i(c, " has been deprecated since v" + t + " and will be removed in the near future"))), e ? e(o, c, d) : !0
            }
        };

        function Nd(r, e, t) {
            if (typeof r != "object") throw new Gt("options must be an object", Gt.ERR_BAD_OPTION_VALUE);
            for (var n = Object.keys(r), i = n.length; i-- > 0;) {
                var o = n[i],
                    c = e[o];
                if (c) {
                    var d = r[o],
                        p = d === void 0 || c(d, o, r);
                    if (p !== !0) throw new Gt("option " + o + " must be " + p, Gt.ERR_BAD_OPTION_VALUE);
                    continue
                }
                if (t !== !0) throw new Gt("Unknown option " + o, Gt.ERR_BAD_OPTION)
            }
        }
        yc.exports = {
            assertOptions: Nd,
            validators: zi
        }
    });
    var Ac = J((ty, Tc) => {
        "use strict";
        var gc = Ie(),
            Ld = Si(),
            mc = va(),
            bc = lc(),
            As = Ci(),
            Fd = Bi(),
            wc = xc(),
            zr = wc.validators;

        function Dr(r) {
            this.defaults = r, this.interceptors = {
                request: new mc,
                response: new mc
            }
        }
        Dr.prototype.request = function (e, t) {
            typeof e == "string" ? (t = t || {}, t.url = e) : t = e || {}, t = As(this.defaults, t), t.method ? t.method = t.method.toLowerCase() : this.defaults.method ? t.method = this.defaults.method.toLowerCase() : t.method = "get";
            var n = t.transitional;
            n !== void 0 && wc.assertOptions(n, {
                silentJSONParsing: zr.transitional(zr.boolean),
                forcedJSONParsing: zr.transitional(zr.boolean),
                clarifyTimeoutError: zr.transitional(zr.boolean)
            }, !1);
            var i = [],
                o = !0;
            this.interceptors.request.forEach(function (U) {
                typeof U.runWhen == "function" && U.runWhen(t) === !1 || (o = o && U.synchronous, i.unshift(U.fulfilled, U.rejected))
            });
            var c = [];
            this.interceptors.response.forEach(function (U) {
                c.push(U.fulfilled, U.rejected)
            });
            var d;
            if (!o) {
                var p = [bc, void 0];
                for (Array.prototype.unshift.apply(p, i), p = p.concat(c), d = Promise.resolve(t); p.length;) d = d.then(p.shift(), p.shift());
                return d
            }
            for (var T = t; i.length;) {
                var y = i.shift(),
                    w = i.shift();
                try {
                    T = y(T)
                } catch (v) {
                    w(v);
                    break
                }
            }
            try {
                d = bc(T)
            } catch (v) {
                return Promise.reject(v)
            }
            for (; c.length;) d = d.then(c.shift(), c.shift());
            return d
        };
        Dr.prototype.getUri = function (e) {
            e = As(this.defaults, e);
            var t = Fd(e.baseURL, e.url);
            return Ld(t, e.params, e.paramsSerializer)
        };
        gc.forEach(["delete", "get", "head", "options"], function (e) {
            Dr.prototype[e] = function (t, n) {
                return this.request(As(n || {}, {
                    method: e,
                    url: t,
                    data: (n || {}).data
                }))
            }
        });
        gc.forEach(["post", "put", "patch"], function (e) {
            function t(n) {
                return function (o, c, d) {
                    return this.request(As(d || {}, {
                        method: e,
                        headers: n ? {
                            "Content-Type": "multipart/form-data"
                        } : {},
                        url: o,
                        data: c
                    }))
                }
            }
            Dr.prototype[e] = t(), Dr.prototype[e + "Form"] = t(!0)
        });
        Tc.exports = Dr
    });
    var Ec = J((ry, Sc) => {
        "use strict";
        var $d = En();

        function Or(r) {
            if (typeof r != "function") throw new TypeError("executor must be a function.");
            var e;
            this.promise = new Promise(function (i) {
                e = i
            });
            var t = this;
            this.promise.then(function (n) {
                if (!!t._listeners) {
                    var i, o = t._listeners.length;
                    for (i = 0; i < o; i++) t._listeners[i](n);
                    t._listeners = null
                }
            }), this.promise.then = function (n) {
                var i, o = new Promise(function (c) {
                    t.subscribe(c), i = c
                }).then(n);
                return o.cancel = function () {
                    t.unsubscribe(i)
                }, o
            }, r(function (i) {
                t.reason || (t.reason = new $d(i), e(t.reason))
            })
        }
        Or.prototype.throwIfRequested = function () {
            if (this.reason) throw this.reason
        };
        Or.prototype.subscribe = function (e) {
            if (this.reason) {
                e(this.reason);
                return
            }
            this._listeners ? this._listeners.push(e) : this._listeners = [e]
        };
        Or.prototype.unsubscribe = function (e) {
            if (!!this._listeners) {
                var t = this._listeners.indexOf(e);
                t !== -1 && this._listeners.splice(t, 1)
            }
        };
        Or.source = function () {
            var e, t = new Or(function (i) {
                e = i
            });
            return {
                token: t,
                cancel: e
            }
        };
        Sc.exports = Or
    });
    var vc = J((ny, _c) => {
        "use strict";
        _c.exports = function (e) {
            return function (n) {
                return e.apply(null, n)
            }
        }
    });
    var Rc = J((sy, Bc) => {
        "use strict";
        var Wd = Ie();
        Bc.exports = function (e) {
            return Wd.isObject(e) && e.isAxiosError === !0
        }
    });
    var Mc = J((iy, Di) => {
        "use strict";
        var Uc = Ie(),
            Gd = xi(),
            Ss = Ac(),
            jd = Ci(),
            Kd = Ts();

        function Pc(r) {
            var e = new Ss(r),
                t = Gd(Ss.prototype.request, e);
            return Uc.extend(t, Ss.prototype, e), Uc.extend(t, e), t.create = function (i) {
                return Pc(jd(r, i))
            }, t
        }
        var Ke = Pc(Kd);
        Ke.Axios = Ss;
        Ke.CanceledError = En();
        Ke.CancelToken = Ec();
        Ke.isCancel = Mi();
        Ke.VERSION = Hi().version;
        Ke.toFormData = _i();
        Ke.AxiosError = yr();
        Ke.Cancel = Ke.CanceledError;
        Ke.all = function (e) {
            return Promise.all(e)
        };
        Ke.spread = vc();
        Ke.isAxiosError = Rc();
        Di.exports = Ke;
        Di.exports.default = Ke
    });
    var Ic = J((oy, qc) => {
        qc.exports = Mc()
    });
    var Hc = J((ay, Cc) => {
        Cc.exports = typeof self == "object" ? self.FormData : window.FormData
    });
    var bp = {};
    Wn(bp, {
        ApiError: () => qs,
        AptosAccount: () => pr,
        AptosClient: () => Ae,
        BCS: () => Bs,
        CoinClient: () => Xi,
        FailedTransactionError: () => Cs,
        FaucetClient: () => Ji,
        HexString: () => G,
        TokenClient: () => Zi,
        TokenTypes: () => Qi,
        TransactionBuilder: () => vt,
        TransactionBuilderABI: () => lt,
        TransactionBuilderEd25519: () => on,
        TransactionBuilderMultiEd25519: () => Yi,
        TransactionBuilderRemoteABI: () => sn,
        TxnBuilderTypes: () => be,
        TypeTagParser: () => Ar,
        Types: () => Un,
        WaitForTransactionError: () => Is,
        derivePath: () => fs
    });
    var ys = pn(Ks());

    function Vs(r) {
        if (!Number.isSafeInteger(r) || r < 0) throw new Error(`Wrong positive integer: ${r}`)
    }

    function Gu(r) {
        if (typeof r != "boolean") throw new Error(`Expected boolean, not ${r}`)
    }

    function bo(r, ...e) {
        if (!(r instanceof Uint8Array)) throw new TypeError("Expected Uint8Array");
        if (e.length > 0 && !e.includes(r.length)) throw new TypeError(`Expected Uint8Array of length ${e}, not of length=${r.length}`)
    }

    function ju(r) {
        if (typeof r != "function" || typeof r.create != "function") throw new Error("Hash should be wrapped by utils.wrapConstructor");
        Vs(r.outputLen), Vs(r.blockLen)
    }

    function Ku(r, e = !0) {
        if (r.destroyed) throw new Error("Hash instance has been destroyed");
        if (e && r.finished) throw new Error("Hash#digest() has already been called")
    }

    function Vu(r, e) {
        bo(r);
        let t = e.outputLen;
        if (r.length < t) throw new Error(`digestInto() expects output buffer of length at least ${t}`)
    }
    var Yu = {
            number: Vs,
            bool: Gu,
            bytes: bo,
            hash: ju,
            exists: Ku,
            output: Vu
        },
        Ne = Yu;
    var jn = BigInt(4294967295),
        Ys = BigInt(32);

    function go(r, e = !1) {
        return e ? {
            h: Number(r & jn),
            l: Number(r >> Ys & jn)
        } : {
            h: Number(r >> Ys & jn) | 0,
            l: Number(r & jn) | 0
        }
    }

    function Xu(r, e = !1) {
        let t = new Uint32Array(r.length),
            n = new Uint32Array(r.length);
        for (let i = 0; i < r.length; i++) {
            let {
                h: o,
                l: c
            } = go(r[i], e);
            [t[i], n[i]] = [o, c]
        }
        return [t, n]
    }
    var Ju = (r, e) => BigInt(r >>> 0) << Ys | BigInt(e >>> 0),
        Zu = (r, e, t) => r >>> t,
        Qu = (r, e, t) => r << 32 - t | e >>> t,
        ef = (r, e, t) => r >>> t | e << 32 - t,
        tf = (r, e, t) => r << 32 - t | e >>> t,
        rf = (r, e, t) => r << 64 - t | e >>> t - 32,
        nf = (r, e, t) => r >>> t - 32 | e << 64 - t,
        sf = (r, e) => e,
        of = (r, e) => r,
        af = (r, e, t) => r << t | e >>> 32 - t,
        cf = (r, e, t) => e << t | r >>> 32 - t,
        uf = (r, e, t) => e << t - 32 | r >>> 64 - t,
        ff = (r, e, t) => r << t - 32 | e >>> 64 - t;

    function lf(r, e, t, n) {
        let i = (e >>> 0) + (n >>> 0);
        return {
            h: r + t + (i / 2 ** 32 | 0) | 0,
            l: i | 0
        }
    }
    var df = (r, e, t) => (r >>> 0) + (e >>> 0) + (t >>> 0),
        pf = (r, e, t, n) => e + t + n + (r / 2 ** 32 | 0) | 0,
        hf = (r, e, t, n) => (r >>> 0) + (e >>> 0) + (t >>> 0) + (n >>> 0),
        yf = (r, e, t, n, i) => e + t + n + i + (r / 2 ** 32 | 0) | 0,
        xf = (r, e, t, n, i) => (r >>> 0) + (e >>> 0) + (t >>> 0) + (n >>> 0) + (i >>> 0),
        mf = (r, e, t, n, i, o) => e + t + n + i + o + (r / 2 ** 32 | 0) | 0,
        bf = {
            fromBig: go,
            split: Xu,
            toBig: Ju,
            shrSH: Zu,
            shrSL: Qu,
            rotrSH: ef,
            rotrSL: tf,
            rotrBH: rf,
            rotrBL: nf,
            rotr32H: sf,
            rotr32L: of ,
            rotlSH: af,
            rotlSL: cf,
            rotlBH: uf,
            rotlBL: ff,
            add: lf,
            add3L: df,
            add3H: pf,
            add4L: hf,
            add4H: yf,
            add5H: mf,
            add5L: xf
        },
        K = bf;
    var gf = {
        node: void 0,
        web: typeof self == "object" && "crypto" in self ? self.crypto : void 0
    };
    var wo = r => new Uint32Array(r.buffer, r.byteOffset, Math.floor(r.byteLength / 4)),
        Kn = r => new DataView(r.buffer, r.byteOffset, r.byteLength);
    var wf = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
    if (!wf) throw new Error("Non little-endian hardware is not supported");
    var Tf = Array.from({
        length: 256
    }, (r, e) => e.toString(16).padStart(2, "0"));

    function Vn(r) {
        if (!(r instanceof Uint8Array)) throw new Error("Uint8Array expected");
        let e = "";
        for (let t = 0; t < r.length; t++) e += Tf[r[t]];
        return e
    }

    function Yn(r) {
        if (typeof r != "string") throw new TypeError("hexToBytes: expected string, got " + typeof r);
        if (r.length % 2) throw new Error("hexToBytes: received invalid unpadded hex");
        let e = new Uint8Array(r.length / 2);
        for (let t = 0; t < e.length; t++) {
            let n = t * 2,
                i = r.slice(n, n + 2),
                o = Number.parseInt(i, 16);
            if (Number.isNaN(o) || o < 0) throw new Error("Invalid byte sequence");
            e[t] = o
        }
        return e
    }

    function Af(r) {
        if (typeof r != "string") throw new TypeError(`utf8ToBytes expected string, got ${typeof r}`);
        return new TextEncoder().encode(r)
    }

    function zt(r) {
        if (typeof r == "string" && (r = Af(r)), !(r instanceof Uint8Array)) throw new TypeError(`Expected input type is Uint8Array (got ${typeof r})`);
        return r
    }
    var Rt = class {
        clone() {
            return this._cloneInto()
        }
    };

    function Br(r) {
        let e = n => r().update(zt(n)).digest(),
            t = r();
        return e.outputLen = t.outputLen, e.blockLen = t.blockLen, e.create = () => r(), e
    }

    function To(r) {
        let e = (n, i) => r(i).update(zt(n)).digest(),
            t = r({});
        return e.outputLen = t.outputLen, e.blockLen = t.blockLen, e.create = n => r(n), e
    }
    var [Eo, _o, vo] = [
        [],
        [],
        []
    ], Sf = BigInt(0), hn = BigInt(1), Ef = BigInt(2), _f = BigInt(7), vf = BigInt(256), Bf = BigInt(113);
    for (let r = 0, e = hn, t = 1, n = 0; r < 24; r++) {
        [t, n] = [n, (2 * t + 3 * n) % 5], Eo.push(2 * (5 * n + t)), _o.push((r + 1) * (r + 2) / 2 % 64);
        let i = Sf;
        for (let o = 0; o < 7; o++) e = (e << hn ^ (e >> _f) * Bf) % vf, e & Ef && (i ^= hn << (hn << BigInt(o)) - hn);
        vo.push(i)
    }
    var [Rf, Uf] = K.split(vo, !0), Ao = (r, e, t) => t > 32 ? K.rotlBH(r, e, t) : K.rotlSH(r, e, t), So = (r, e, t) => t > 32 ? K.rotlBL(r, e, t) : K.rotlSL(r, e, t);

    function Pf(r, e = 24) {
        let t = new Uint32Array(10);
        for (let n = 24 - e; n < 24; n++) {
            for (let c = 0; c < 10; c++) t[c] = r[c] ^ r[c + 10] ^ r[c + 20] ^ r[c + 30] ^ r[c + 40];
            for (let c = 0; c < 10; c += 2) {
                let d = (c + 8) % 10,
                    p = (c + 2) % 10,
                    T = t[p],
                    y = t[p + 1],
                    w = Ao(T, y, 1) ^ t[d],
                    v = So(T, y, 1) ^ t[d + 1];
                for (let U = 0; U < 50; U += 10) r[c + U] ^= w, r[c + U + 1] ^= v
            }
            let i = r[2],
                o = r[3];
            for (let c = 0; c < 24; c++) {
                let d = _o[c],
                    p = Ao(i, o, d),
                    T = So(i, o, d),
                    y = Eo[c];
                i = r[y], o = r[y + 1], r[y] = p, r[y + 1] = T
            }
            for (let c = 0; c < 50; c += 10) {
                for (let d = 0; d < 10; d++) t[d] = r[c + d];
                for (let d = 0; d < 10; d++) r[c + d] ^= ~t[(d + 2) % 10] & t[(d + 4) % 10]
            }
            r[0] ^= Rf[n], r[1] ^= Uf[n]
        }
        t.fill(0)
    }
    var Rr = class extends Rt {
            constructor(e, t, n, i = !1, o = 24) {
                if (super(), this.blockLen = e, this.suffix = t, this.outputLen = n, this.enableXOF = i, this.rounds = o, this.pos = 0, this.posOut = 0, this.finished = !1, this.destroyed = !1, Ne.number(n), 0 >= this.blockLen || this.blockLen >= 200) throw new Error("Sha3 supports only keccak-f1600 function");
                this.state = new Uint8Array(200), this.state32 = wo(this.state)
            }
            keccak() {
                Pf(this.state32, this.rounds), this.posOut = 0, this.pos = 0
            }
            update(e) {
                Ne.exists(this);
                let {
                    blockLen: t,
                    state: n
                } = this;
                e = zt(e);
                let i = e.length;
                for (let o = 0; o < i;) {
                    let c = Math.min(t - this.pos, i - o);
                    for (let d = 0; d < c; d++) n[this.pos++] ^= e[o++];
                    this.pos === t && this.keccak()
                }
                return this
            }
            finish() {
                if (this.finished) return;
                this.finished = !0;
                let {
                    state: e,
                    suffix: t,
                    pos: n,
                    blockLen: i
                } = this;
                e[n] ^= t, (t & 128) !== 0 && n === i - 1 && this.keccak(), e[i - 1] ^= 128, this.keccak()
            }
            writeInto(e) {
                Ne.exists(this, !1), Ne.bytes(e), this.finish();
                let t = this.state,
                    {
                        blockLen: n
                    } = this;
                for (let i = 0, o = e.length; i < o;) {
                    this.posOut >= n && this.keccak();
                    let c = Math.min(n - this.posOut, o - i);
                    e.set(t.subarray(this.posOut, this.posOut + c), i), this.posOut += c, i += c
                }
                return e
            }
            xofInto(e) {
                if (!this.enableXOF) throw new Error("XOF is not possible for this instance");
                return this.writeInto(e)
            }
            xof(e) {
                return Ne.number(e), this.xofInto(new Uint8Array(e))
            }
            digestInto(e) {
                if (Ne.output(e, this), this.finished) throw new Error("digest() was already called");
                return this.writeInto(e), this.destroy(), e
            }
            digest() {
                return this.digestInto(new Uint8Array(this.outputLen))
            }
            destroy() {
                this.destroyed = !0, this.state.fill(0)
            }
            _cloneInto(e) {
                let {
                    blockLen: t,
                    suffix: n,
                    outputLen: i,
                    rounds: o,
                    enableXOF: c
                } = this;
                return e || (e = new Rr(t, n, i, c, o)), e.state32.set(this.state32), e.pos = this.pos, e.posOut = this.posOut, e.finished = this.finished, e.rounds = o, e.suffix = n, e.outputLen = i, e.enableXOF = c, e.destroyed = this.destroyed, e
            }
        },
        Dt = (r, e, t) => Br(() => new Rr(e, r, t)),
        Mp = Dt(6, 144, 224 / 8),
        Ut = Dt(6, 136, 256 / 8),
        qp = Dt(6, 104, 384 / 8),
        Ip = Dt(6, 72, 512 / 8),
        Cp = Dt(1, 144, 224 / 8),
        Hp = Dt(1, 136, 256 / 8),
        zp = Dt(1, 104, 384 / 8),
        Dp = Dt(1, 72, 512 / 8),
        Bo = (r, e, t) => To((n = {}) => new Rr(e, r, n.dkLen === void 0 ? t : n.dkLen, !0)),
        Op = Bo(31, 168, 128 / 8),
        kp = Bo(31, 136, 256 / 8);
    var ba = pn(fa());
    var kl = pn(Ks());
    var as = class extends Rt {
            constructor(e, t) {
                super(), this.finished = !1, this.destroyed = !1, Ne.hash(e);
                let n = zt(t);
                if (this.iHash = e.create(), !(this.iHash instanceof Rt)) throw new TypeError("Expected instance of class which extends utils.Hash");
                let i = this.blockLen = this.iHash.blockLen;
                this.outputLen = this.iHash.outputLen;
                let o = new Uint8Array(i);
                o.set(n.length > this.iHash.blockLen ? e.create().update(n).digest() : n);
                for (let c = 0; c < o.length; c++) o[c] ^= 54;
                this.iHash.update(o), this.oHash = e.create();
                for (let c = 0; c < o.length; c++) o[c] ^= 106;
                this.oHash.update(o), o.fill(0)
            }
            update(e) {
                return Ne.exists(this), this.iHash.update(e), this
            }
            digestInto(e) {
                Ne.exists(this), Ne.bytes(e, this.outputLen), this.finished = !0, this.iHash.digestInto(e), this.oHash.update(e), this.oHash.digestInto(e), this.destroy()
            }
            digest() {
                let e = new Uint8Array(this.oHash.outputLen);
                return this.digestInto(e), e
            }
            _cloneInto(e) {
                e || (e = Object.create(Object.getPrototypeOf(this), {}));
                let {
                    oHash: t,
                    iHash: n,
                    finished: i,
                    destroyed: o,
                    blockLen: c,
                    outputLen: d
                } = this;
                return e = e, e.finished = i, e.destroyed = o, e.blockLen = c, e.outputLen = d, e.oHash = t._cloneInto(e.oHash), e.iHash = n._cloneInto(e.iHash), e
            }
            destroy() {
                this.destroyed = !0, this.oHash.destroy(), this.iHash.destroy()
            }
        },
        cs = (r, e, t) => new as(r, e).update(t).digest();
    cs.create = (r, e) => new as(r, e);

    function zl(r, e, t, n) {
        if (typeof r.setBigUint64 == "function") return r.setBigUint64(e, t, n);
        let i = BigInt(32),
            o = BigInt(4294967295),
            c = Number(t >> i & o),
            d = Number(t & o),
            p = n ? 4 : 0,
            T = n ? 0 : 4;
        r.setUint32(e + p, c, n), r.setUint32(e + T, d, n)
    }
    var us = class extends Rt {
        constructor(e, t, n, i) {
            super(), this.blockLen = e, this.outputLen = t, this.padOffset = n, this.isLE = i, this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.buffer = new Uint8Array(e), this.view = Kn(this.buffer)
        }
        update(e) {
            Ne.exists(this);
            let {
                view: t,
                buffer: n,
                blockLen: i
            } = this;
            e = zt(e);
            let o = e.length;
            for (let c = 0; c < o;) {
                let d = Math.min(i - this.pos, o - c);
                if (d === i) {
                    let p = Kn(e);
                    for (; i <= o - c; c += i) this.process(p, c);
                    continue
                }
                n.set(e.subarray(c, c + d), this.pos), this.pos += d, c += d, this.pos === i && (this.process(t, 0), this.pos = 0)
            }
            return this.length += e.length, this.roundClean(), this
        }
        digestInto(e) {
            Ne.exists(this), Ne.output(e, this), this.finished = !0;
            let {
                buffer: t,
                view: n,
                blockLen: i,
                isLE: o
            } = this, {
                pos: c
            } = this;
            t[c++] = 128, this.buffer.subarray(c).fill(0), this.padOffset > i - c && (this.process(n, 0), c = 0);
            for (let p = c; p < i; p++) t[p] = 0;
            zl(n, i - 8, BigInt(this.length * 8), o), this.process(n, 0);
            let d = Kn(e);
            this.get().forEach((p, T) => d.setUint32(4 * T, p, o))
        }
        digest() {
            let {
                buffer: e,
                outputLen: t
            } = this;
            this.digestInto(e);
            let n = e.slice(0, t);
            return this.destroy(), n
        }
        _cloneInto(e) {
            e || (e = new this.constructor), e.set(...this.get());
            let {
                blockLen: t,
                buffer: n,
                length: i,
                finished: o,
                destroyed: c,
                pos: d
            } = this;
            return e.length = i, e.pos = d, e.finished = o, e.destroyed = c, i % t && e.buffer.set(n), e
        }
    };
    var [Dl, Ol] = K.split(["0x428a2f98d728ae22", "0x7137449123ef65cd", "0xb5c0fbcfec4d3b2f", "0xe9b5dba58189dbbc", "0x3956c25bf348b538", "0x59f111f1b605d019", "0x923f82a4af194f9b", "0xab1c5ed5da6d8118", "0xd807aa98a3030242", "0x12835b0145706fbe", "0x243185be4ee4b28c", "0x550c7dc3d5ffb4e2", "0x72be5d74f27b896f", "0x80deb1fe3b1696b1", "0x9bdc06a725c71235", "0xc19bf174cf692694", "0xe49b69c19ef14ad2", "0xefbe4786384f25e3", "0x0fc19dc68b8cd5b5", "0x240ca1cc77ac9c65", "0x2de92c6f592b0275", "0x4a7484aa6ea6e483", "0x5cb0a9dcbd41fbd4", "0x76f988da831153b5", "0x983e5152ee66dfab", "0xa831c66d2db43210", "0xb00327c898fb213f", "0xbf597fc7beef0ee4", "0xc6e00bf33da88fc2", "0xd5a79147930aa725", "0x06ca6351e003826f", "0x142929670a0e6e70", "0x27b70a8546d22ffc", "0x2e1b21385c26c926", "0x4d2c6dfc5ac42aed", "0x53380d139d95b3df", "0x650a73548baf63de", "0x766a0abb3c77b2a8", "0x81c2c92e47edaee6", "0x92722c851482353b", "0xa2bfe8a14cf10364", "0xa81a664bbc423001", "0xc24b8b70d0f89791", "0xc76c51a30654be30", "0xd192e819d6ef5218", "0xd69906245565a910", "0xf40e35855771202a", "0x106aa07032bbd1b8", "0x19a4c116b8d2d0c8", "0x1e376c085141ab53", "0x2748774cdf8eeb99", "0x34b0bcb5e19b48a8", "0x391c0cb3c5c95a63", "0x4ed8aa4ae3418acb", "0x5b9cca4f7763e373", "0x682e6ff3d6b2b8a3", "0x748f82ee5defb2fc", "0x78a5636f43172f60", "0x84c87814a1f0ab72", "0x8cc702081a6439ec", "0x90befffa23631e28", "0xa4506cebde82bde9", "0xbef9a3f7b2c67915", "0xc67178f2e372532b", "0xca273eceea26619c", "0xd186b8c721c0c207", "0xeada7dd6cde0eb1e", "0xf57d4f7fee6ed178", "0x06f067aa72176fba", "0x0a637dc5a2c898a6", "0x113f9804bef90dae", "0x1b710b35131c471b", "0x28db77f523047d84", "0x32caab7b40c72493", "0x3c9ebe0a15c9bebc", "0x431d67c49c100d4c", "0x4cc5d4becb3e42b6", "0x597f299cfc657e2a", "0x5fcb6fab3ad6faec", "0x6c44198c4a475817"].map(r => BigInt(r))), $t = new Uint32Array(80), Wt = new Uint32Array(80), Tn = class extends us {
        constructor() {
            super(128, 64, 16, !1), this.Ah = 1779033703, this.Al = -205731576, this.Bh = -1150833019, this.Bl = -2067093701, this.Ch = 1013904242, this.Cl = -23791573, this.Dh = -1521486534, this.Dl = 1595750129, this.Eh = 1359893119, this.El = -1377402159, this.Fh = -1694144372, this.Fl = 725511199, this.Gh = 528734635, this.Gl = -79577749, this.Hh = 1541459225, this.Hl = 327033209
        }
        get() {
            let {
                Ah: e,
                Al: t,
                Bh: n,
                Bl: i,
                Ch: o,
                Cl: c,
                Dh: d,
                Dl: p,
                Eh: T,
                El: y,
                Fh: w,
                Fl: v,
                Gh: U,
                Gl: C,
                Hh: W,
                Hl: Q
            } = this;
            return [e, t, n, i, o, c, d, p, T, y, w, v, U, C, W, Q]
        }
        set(e, t, n, i, o, c, d, p, T, y, w, v, U, C, W, Q) {
            this.Ah = e | 0, this.Al = t | 0, this.Bh = n | 0, this.Bl = i | 0, this.Ch = o | 0, this.Cl = c | 0, this.Dh = d | 0, this.Dl = p | 0, this.Eh = T | 0, this.El = y | 0, this.Fh = w | 0, this.Fl = v | 0, this.Gh = U | 0, this.Gl = C | 0, this.Hh = W | 0, this.Hl = Q | 0
        }
        process(e, t) {
            for (let D = 0; D < 16; D++, t += 4) $t[D] = e.getUint32(t), Wt[D] = e.getUint32(t += 4);
            for (let D = 16; D < 80; D++) {
                let F = $t[D - 15] | 0,
                    pe = Wt[D - 15] | 0,
                    dt = K.rotrSH(F, pe, 1) ^ K.rotrSH(F, pe, 8) ^ K.shrSH(F, pe, 7),
                    pt = K.rotrSL(F, pe, 1) ^ K.rotrSL(F, pe, 8) ^ K.shrSL(F, pe, 7),
                    _e = $t[D - 2] | 0,
                    Ee = Wt[D - 2] | 0,
                    Ge = K.rotrSH(_e, Ee, 19) ^ K.rotrBH(_e, Ee, 61) ^ K.shrSH(_e, Ee, 6),
                    st = K.rotrSL(_e, Ee, 19) ^ K.rotrBL(_e, Ee, 61) ^ K.shrSL(_e, Ee, 6),
                    Je = K.add4L(pt, st, Wt[D - 7], Wt[D - 16]),
                    it = K.add4H(Je, dt, Ge, $t[D - 7], $t[D - 16]);
                $t[D] = it | 0, Wt[D] = Je | 0
            }
            let {
                Ah: n,
                Al: i,
                Bh: o,
                Bl: c,
                Ch: d,
                Cl: p,
                Dh: T,
                Dl: y,
                Eh: w,
                El: v,
                Fh: U,
                Fl: C,
                Gh: W,
                Gl: Q,
                Hh: ce,
                Hl: we
            } = this;
            for (let D = 0; D < 80; D++) {
                let F = K.rotrSH(w, v, 14) ^ K.rotrSH(w, v, 18) ^ K.rotrBH(w, v, 41),
                    pe = K.rotrSL(w, v, 14) ^ K.rotrSL(w, v, 18) ^ K.rotrBL(w, v, 41),
                    dt = w & U ^ ~w & W,
                    pt = v & C ^ ~v & Q,
                    _e = K.add5L(we, pe, pt, Ol[D], Wt[D]),
                    Ee = K.add5H(_e, ce, F, dt, Dl[D], $t[D]),
                    Ge = _e | 0,
                    st = K.rotrSH(n, i, 28) ^ K.rotrBH(n, i, 34) ^ K.rotrBH(n, i, 39),
                    Je = K.rotrSL(n, i, 28) ^ K.rotrBL(n, i, 34) ^ K.rotrBL(n, i, 39),
                    it = n & o ^ n & d ^ o & d,
                    ur = i & c ^ i & p ^ c & p;
                ce = W | 0, we = Q | 0, W = U | 0, Q = C | 0, U = w | 0, C = v | 0, {
                    h: w,
                    l: v
                } = K.add(T | 0, y | 0, Ee | 0, Ge | 0), T = d | 0, y = p | 0, d = o | 0, p = c | 0, o = n | 0, c = i | 0;
                let $e = K.add3L(Ge, Je, ur);
                n = K.add3H($e, Ee, st, it), i = $e | 0
            }({
                h: n,
                l: i
            } = K.add(this.Ah | 0, this.Al | 0, n | 0, i | 0)), {
                h: o,
                l: c
            } = K.add(this.Bh | 0, this.Bl | 0, o | 0, c | 0), {
                h: d,
                l: p
            } = K.add(this.Ch | 0, this.Cl | 0, d | 0, p | 0), {
                h: T,
                l: y
            } = K.add(this.Dh | 0, this.Dl | 0, T | 0, y | 0), {
                h: w,
                l: v
            } = K.add(this.Eh | 0, this.El | 0, w | 0, v | 0), {
                h: U,
                l: C
            } = K.add(this.Fh | 0, this.Fl | 0, U | 0, C | 0), {
                h: W,
                l: Q
            } = K.add(this.Gh | 0, this.Gl | 0, W | 0, Q | 0), {
                h: ce,
                l: we
            } = K.add(this.Hh | 0, this.Hl | 0, ce | 0, we | 0), this.set(n, i, o, c, d, p, T, y, w, v, U, C, W, Q, ce, we)
        }
        roundClean() {
            $t.fill(0), Wt.fill(0)
        }
        destroy() {
            this.buffer.fill(0), this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
        }
    }, pi = class extends Tn {
        constructor() {
            super(), this.Ah = 573645204, this.Al = -64227540, this.Bh = -1621794909, this.Bl = -934517566, this.Ch = 596883563, this.Cl = 1867755857, this.Dh = -1774684391, this.Dl = 1497426621, this.Eh = -1775747358, this.El = -1467023389, this.Fh = -1101128155, this.Fl = 1401305490, this.Gh = 721525244, this.Gl = 746961066, this.Hh = 246885852, this.Hl = -2117784414, this.outputLen = 32
        }
    }, hi = class extends Tn {
        constructor() {
            super(), this.Ah = -876896931, this.Al = -1056596264, this.Bh = 1654270250, this.Bl = 914150663, this.Ch = -1856437926, this.Cl = 812702999, this.Dh = 355462360, this.Dl = -150054599, this.Eh = 1731405415, this.El = -4191439, this.Fh = -1900787065, this.Fl = 1750603025, this.Gh = -619958771, this.Gl = 1694076839, this.Hh = 1203062813, this.Hl = -1090891868, this.outputLen = 48
        }
    }, yi = Br(() => new Tn), ah = Br(() => new pi), ch = Br(() => new hi);
    var Nl = /^m(\/[0-9]+')+$/,
        la = r => r.replace("'", ""),
        Ll = "ed25519 seed",
        Fl = 2147483648,
        $l = r => {
            let t = cs.create(yi, Ll).update(Yn(r)).digest(),
                n = t.slice(0, 32),
                i = t.slice(32);
            return {
                key: n,
                chainCode: i
            }
        },
        Wl = ({
            key: r,
            chainCode: e
        }, t) => {
            let n = new ArrayBuffer(4);
            new DataView(n).setUint32(0, t);
            let i = new Uint8Array(n),
                o = new Uint8Array([0]),
                c = new Uint8Array([...o, ...r, ...i]),
                d = cs.create(yi, e).update(c).digest(),
                p = d.slice(0, 32),
                T = d.slice(32);
            return {
                key: p,
                chainCode: T
            }
        };
    var Gl = r => Nl.test(r) ? !r.split("/").slice(1).map(la).some(Number.isNaN) : !1,
        fs = (r, e, t = Fl) => {
            if (!Gl(r)) throw new Error("Invalid derivation path");
            let {
                key: n,
                chainCode: i
            } = $l(e);
            return r.split("/").slice(1).map(la).map(c => parseInt(c, 10)).reduce((c, d) => Wl(c, d + t), {
                key: n,
                chainCode: i
            })
        };
    var G = class {
        static fromBuffer(e) {
            return G.fromUint8Array(e)
        }
        static fromUint8Array(e) {
            return new G(Vn(e))
        }
        static ensure(e) {
            return typeof e == "string" ? new G(e) : e
        }
        constructor(e) {
            e.startsWith("0x") ? this.hexString = e : this.hexString = `0x${e}`
        }
        hex() {
            return this.hexString
        }
        noPrefix() {
            return this.hexString.slice(2)
        }
        toString() {
            return this.hex()
        }
        toShortString() {
            return `0x${this.hexString.replace(/^0x0*/,"")}`
        }
        toUint8Array() {
            return Uint8Array.from(Yn(this.noPrefix()))
        }
    };
    async function pa(r) {
        return new Promise(e => {
            setTimeout(e, r)
        })
    }
    var da = "/v1";

    function ha(r) {
        let e = `${r}`;
        return e.endsWith("/") && (e = e.substring(0, e.length - 1)), e.endsWith(da) || (e = `${e}${da}`), e
    }
    var ls = 2e4,
        ds = 20,
        ps = 20,
        An = "0x1::aptos_coin::AptosCoin";

    function qr(r) {
        let e, t, n;
        return typeof r == "object" ? (e = r.hashFunction, t = r.ttlMs, n = r.tags) : e = r, (i, o, c) => {
            if (c.value != null) c.value = ya(c.value, e, t, n);
            else if (c.get != null) c.get = ya(c.get, e, t, n);
            else throw new Error("Only put a Memoize() decorator on a method or get accessor.")
        }
    }

    function xa(r, e) {
        return qr({
            ttlMs: r,
            hashFunction: e
        })
    }
    var hs = new Map;

    function ma(r) {
        let e = new Set;
        for (let t of r) {
            let n = hs.get(t);
            if (n)
                for (let i of n) e.has(i) || (i.clear(), e.add(i))
        }
        return e.size
    }

    function ya(r, e, t = 0, n) {
        let i = Symbol("__memoized_map__");
        return function (...o) {
            let c;
            this.hasOwnProperty(i) || Object.defineProperty(this, i, {
                configurable: !1,
                enumerable: !1,
                writable: !1,
                value: new Map
            });
            let d = this[i];
            if (Array.isArray(n))
                for (let p of n) hs.has(p) ? hs.get(p).push(d) : hs.set(p, [d]);
            if (e || o.length > 0 || t > 0) {
                let p;
                e === !0 ? p = o.map(w => w.toString()).join("!") : e ? p = e.apply(this, o) : p = o[0];
                let T = `${p}__timestamp`,
                    y = !1;
                if (t > 0)
                    if (!d.has(T)) y = !0;
                    else {
                        let w = d.get(T);
                        y = Date.now() - w > t
                    } d.has(p) && !y ? c = d.get(p) : (c = r.apply(this, o), d.set(p, c), t > 0 && d.set(T, Date.now()))
            } else {
                let p = this;
                d.has(p) ? c = d.get(p) : (c = r.apply(this, o), d.set(p, c))
            }
            return c
        }
    }
    var Sn = class {
            static fromAptosAccountObject(e) {
                return new Sn(G.ensure(e.privateKeyHex).toUint8Array(), e.address)
            }
            static fromDerivePath(e, t) {
                if (!Sn.isValidPath(e)) throw new Error("Invalid derivation path");
                let n = t.trim().split(/\s+/).map(o => o.toLowerCase()).join(" "),
                    {
                        key: i
                    } = fs(e, Vn(ba.mnemonicToSeedSync(n)));
                return new Sn(i)
            }
            constructor(e, t) {
                e ? this.signingKey = ys.default.sign.keyPair.fromSeed(e.slice(0, 32)) : this.signingKey = ys.default.sign.keyPair(), this.accountAddress = G.ensure(t || this.authKey().hex())
            }
            address() {
                return this.accountAddress
            }
            authKey() {
                let e = Ut.create();
                return e.update(this.signingKey.publicKey), e.update("\0"), G.fromUint8Array(e.digest())
            }
            pubKey() {
                return G.fromUint8Array(this.signingKey.publicKey)
            }
            signBuffer(e) {
                let t = ys.default.sign(e, this.signingKey.secretKey);
                return G.fromUint8Array(t.slice(0, 64))
            }
            signHexString(e) {
                let t = G.ensure(e).toUint8Array();
                return this.signBuffer(t)
            }
            toPrivateKeyObject() {
                return {
                    address: this.address().hex(),
                    publicKeyHex: this.pubKey().hex(),
                    privateKeyHex: G.fromUint8Array(this.signingKey.secretKey.slice(0, 32)).hex()
                }
            }
        },
        pr = Sn;
    pr.isValidPath = e => !!/^m\/44'\/637'\/[0-9]+'\/[0-9]+'\/[0-9]+'+$/.test(e), me([qr()], pr.prototype, "authKey", 1);
    var Un = {};
    Wn(Un, {
        $AccountData: () => Nc,
        $AccountSignature: () => Lc,
        $AccountSignature_Ed25519Signature: () => Fc,
        $AccountSignature_MultiEd25519Signature: () => $c,
        $Address: () => Wc,
        $AptosError: () => Gc,
        $AptosErrorCode: () => jc,
        $Block: () => Kc,
        $BlockMetadataTransaction: () => Vc,
        $DecodedTableData: () => Yc,
        $DeleteModule: () => Jc,
        $DeleteResource: () => Zc,
        $DeleteTableItem: () => Qc,
        $DeletedTableData: () => Xc,
        $DirectWriteSet: () => e0,
        $Ed25519Signature: () => t0,
        $EncodeSubmissionRequest: () => r0,
        $EntryFunctionId: () => n0,
        $EntryFunctionPayload: () => s0,
        $Event: () => i0,
        $EventGuid: () => o0,
        $EventKey: () => a0,
        $GasEstimation: () => c0,
        $GenesisPayload: () => u0,
        $GenesisPayload_WriteSetPayload: () => f0,
        $GenesisTransaction: () => l0,
        $HashValue: () => d0,
        $HealthCheckSuccess: () => p0,
        $HexEncodedBytes: () => h0,
        $IdentifierWrapper: () => y0,
        $IndexResponse: () => x0,
        $ModuleBundlePayload: () => m0,
        $MoveAbility: () => b0,
        $MoveFunction: () => g0,
        $MoveFunctionGenericTypeParam: () => w0,
        $MoveFunctionVisibility: () => T0,
        $MoveModule: () => A0,
        $MoveModuleBytecode: () => S0,
        $MoveModuleId: () => E0,
        $MoveResource: () => _0,
        $MoveScriptBytecode: () => v0,
        $MoveStruct: () => B0,
        $MoveStructField: () => R0,
        $MoveStructGenericTypeParam: () => U0,
        $MoveStructTag: () => P0,
        $MoveStructValue: () => M0,
        $MoveType: () => q0,
        $MoveValue: () => I0,
        $MultiAgentSignature: () => C0,
        $MultiEd25519Signature: () => H0,
        $PendingTransaction: () => z0,
        $RoleType: () => D0,
        $ScriptPayload: () => O0,
        $ScriptWriteSet: () => k0,
        $StateCheckpointTransaction: () => N0,
        $SubmitTransactionRequest: () => L0,
        $TableItemRequest: () => F0,
        $Transaction: () => $0,
        $TransactionPayload: () => Y0,
        $TransactionPayload_EntryFunctionPayload: () => X0,
        $TransactionPayload_ModuleBundlePayload: () => J0,
        $TransactionPayload_ScriptPayload: () => Z0,
        $TransactionSignature: () => tu,
        $TransactionSignature_Ed25519Signature: () => ru,
        $TransactionSignature_MultiAgentSignature: () => nu,
        $TransactionSignature_MultiEd25519Signature: () => su,
        $Transaction_BlockMetadataTransaction: () => W0,
        $Transaction_GenesisTransaction: () => G0,
        $Transaction_PendingTransaction: () => j0,
        $Transaction_StateCheckpointTransaction: () => K0,
        $Transaction_UserTransaction: () => V0,
        $TransactionsBatchSingleSubmissionFailure: () => Q0,
        $TransactionsBatchSubmissionResult: () => eu,
        $U128: () => iu,
        $U64: () => ou,
        $UserTransaction: () => au,
        $VersionedEvent: () => cu,
        $WriteModule: () => uu,
        $WriteResource: () => fu,
        $WriteSet: () => lu,
        $WriteSetChange: () => hu,
        $WriteSetChange_DeleteModule: () => yu,
        $WriteSetChange_DeleteResource: () => xu,
        $WriteSetChange_DeleteTableItem: () => mu,
        $WriteSetChange_WriteModule: () => bu,
        $WriteSetChange_WriteResource: () => gu,
        $WriteSetChange_WriteTableItem: () => wu,
        $WriteSetPayload: () => Tu,
        $WriteSet_DirectWriteSet: () => du,
        $WriteSet_ScriptWriteSet: () => pu,
        $WriteTableItem: () => Au,
        AccountsService: () => Lr,
        ApiError: () => mt,
        AptosErrorCode: () => Li,
        AptosGeneratedClient: () => Kr,
        BaseHttpRequest: () => Ir,
        BlocksService: () => Fr,
        CancelError: () => vn,
        CancelablePromise: () => kr,
        EventsService: () => $r,
        GeneralService: () => Wr,
        MoveFunctionVisibility: () => Fi,
        OpenAPI: () => kc,
        RoleType: () => $i,
        TablesService: () => Gr,
        TransactionsService: () => jr
    });
    var Ir = class {
        constructor(e) {
            this.config = e
        }
    };
    var Bn = pn(Ic()),
        ki = pn(Hc());
    var mt = class extends Error {
        constructor(t, n, i) {
            super(i);
            this.name = "ApiError", this.url = n.url, this.status = n.status, this.statusText = n.statusText, this.body = n.body, this.request = t
        }
    };
    var vn = class extends Error {
            constructor(e) {
                super(e), this.name = "CancelError"
            }
            get isCancelled() {
                return !0
            }
        },
        kr = class {
            constructor(e) {
                this._isResolved = !1, this._isRejected = !1, this._isCancelled = !1, this._cancelHandlers = [], this._promise = new Promise((t, n) => {
                    this._resolve = t, this._reject = n;
                    let i = d => {
                            var p;
                            this._isResolved || this._isRejected || this._isCancelled || (this._isResolved = !0, (p = this._resolve) == null || p.call(this, d))
                        },
                        o = d => {
                            var p;
                            this._isResolved || this._isRejected || this._isCancelled || (this._isRejected = !0, (p = this._reject) == null || p.call(this, d))
                        },
                        c = d => {
                            this._isResolved || this._isRejected || this._isCancelled || this._cancelHandlers.push(d)
                        };
                    return Object.defineProperty(c, "isResolved", {
                        get: () => this._isResolved
                    }), Object.defineProperty(c, "isRejected", {
                        get: () => this._isRejected
                    }), Object.defineProperty(c, "isCancelled", {
                        get: () => this._isCancelled
                    }), e(i, o, c)
                })
            }
            then(e, t) {
                return this._promise.then(e, t)
            } catch (e) {
                return this._promise.catch(e)
            } finally(e) {
                return this._promise.finally(e)
            }
            cancel() {
                var e;
                if (!(this._isResolved || this._isRejected || this._isCancelled)) {
                    if (this._isCancelled = !0, this._cancelHandlers.length) try {
                        for (let t of this._cancelHandlers) t()
                    } catch (t) {
                        console.warn("Cancellation threw an error", t);
                        return
                    }
                    this._cancelHandlers.length = 0, (e = this._reject) == null || e.call(this, new vn("Request aborted"))
                }
            }
            get isCancelled() {
                return this._isCancelled
            }
        };
    Symbol.toStringTag;
    var Rn = class {
            constructor(e = new Map) {
                this.jar = e
            }
            setCookie(e, t) {
                var o;
                let n = e.origin.toLowerCase();
                this.jar.has(n) || this.jar.set(n, []);
                let i = Rn.parse(t);
                this.jar.set(n, [...((o = this.jar.get(n)) == null ? void 0 : o.filter(c => c.name !== i.name)) || [], i])
            }
            getCookies(e) {
                var n;
                let t = e.origin.toLowerCase();
                return this.jar.get(t) ? ((n = this.jar.get(t)) == null ? void 0 : n.filter(i => !i.expires || i.expires > new Date)) || [] : []
            }
            static parse(e) {
                if (typeof e != "string") throw new Error("argument str must be a string");
                let t = e.split(";").map(i => i.trim()),
                    n;
                if (t.length > 0) {
                    let [i, o] = t[0].split("=");
                    if (!i || !o) throw new Error("Invalid cookie");
                    n = {
                        name: i,
                        value: o
                    }
                } else throw new Error("Invalid cookie");
                return t.slice(1).forEach(i => {
                    let [o, c] = i.split("=");
                    if (!o.trim()) throw new Error("Invalid cookie");
                    let d = o.toLowerCase(),
                        p = (c == null ? void 0 : c.charAt(0)) === "'" || (c == null ? void 0 : c.charAt(0)) === '"' ? c == null ? void 0 : c.slice(1, -1) : c;
                    if (d === "expires" && (n.expires = new Date(p)), d === "path" && (n.path = p), d === "samesite") {
                        if (p !== "Lax" && p !== "None" && p !== "Strict") throw new Error("Invalid cookie SameSite value");
                        n.sameSite = p
                    }
                    d === "secure" && (n.secure = !0)
                }), n
            }
        },
        zc = new Rn;
    Bn.default.interceptors.response.use(r => (Array.isArray(r.headers["set-cookie"]) && r.headers["set-cookie"].forEach(e => {
        zc.setCookie(new URL(r.config.url), e)
    }), r));
    Bn.default.interceptors.request.use(function (r) {
        let e = zc.getCookies(new URL(r.url));
        return (e == null ? void 0 : e.length) > 0 && (r.headers.cookie = e.map(t => `${t.name}=${t.value}`).join("; ")), r
    });
    var Ni = r => r != null,
        _s = r => typeof r == "string",
        Oi = r => _s(r) && r !== "",
        Dc = r => typeof r == "object" && typeof r.type == "string" && typeof r.stream == "function" && typeof r.arrayBuffer == "function" && typeof r.constructor == "function" && typeof r.constructor.name == "string" && /^(Blob|File)$/.test(r.constructor.name) && /^(Blob|File)$/.test(r[Symbol.toStringTag]),
        Vd = r => r instanceof ki.default,
        Yd = r => r >= 200 && r < 300,
        Xd = r => btoa(r),
        Jd = r => {
            let e = [],
                t = (i, o) => {
                    e.push(`${encodeURIComponent(i)}=${encodeURIComponent(String(o))}`)
                },
                n = (i, o) => {
                    Ni(o) && (Array.isArray(o) ? o.forEach(c => {
                        n(i, c)
                    }) : typeof o == "object" ? Object.entries(o).forEach(([c, d]) => {
                        n(`${i}[${c}]`, d)
                    }) : t(i, o))
                };
            return Object.entries(r).forEach(([i, o]) => {
                n(i, o)
            }), e.length > 0 ? `?${e.join("&")}` : ""
        },
        Zd = (r, e) => {
            let t = r.ENCODE_PATH || encodeURI,
                n = e.url.replace("{api-version}", r.VERSION).replace(/{(.*?)}/g, (o, c) => {
                    var d;
                    return (d = e.path) != null && d.hasOwnProperty(c) ? t(String(e.path[c])) : o
                }),
                i = `${r.BASE}${n}`;
            return e.query ? `${i}${Jd(e.query)}` : i
        },
        Qd = r => {
            if (r.formData) {
                let e = new ki.default,
                    t = (n, i) => {
                        _s(i) || Dc(i) ? e.append(n, i) : e.append(n, JSON.stringify(i))
                    };
                return Object.entries(r.formData).filter(([n, i]) => Ni(i)).forEach(([n, i]) => {
                    Array.isArray(i) ? i.forEach(o => t(n, o)) : t(n, i)
                }), e
            }
        },
        Es = async (r, e) => typeof e == "function" ? e(r) : e, ep = async (r, e, t) => {
            let n = await Es(e, r.TOKEN),
                i = await Es(e, r.USERNAME),
                o = await Es(e, r.PASSWORD),
                c = await Es(e, r.HEADERS),
                d = typeof (t == null ? void 0 : t.getHeaders) == "function" && (t == null ? void 0 : t.getHeaders()) || {},
                p = Object.entries({
                    Accept: "application/json",
                    ...c,
                    ...e.headers,
                    ...d
                }).filter(([T, y]) => Ni(y)).reduce((T, [y, w]) => ({
                    ...T,
                    [y]: String(w)
                }), {});
            if (Oi(n) && (p.Authorization = `Bearer ${n}`), Oi(i) && Oi(o)) {
                let T = Xd(`${i}:${o}`);
                p.Authorization = `Basic ${T}`
            }
            return e.body && (e.mediaType ? p["Content-Type"] = e.mediaType : Dc(e.body) ? p["Content-Type"] = e.body.type || "application/octet-stream" : _s(e.body) ? p["Content-Type"] = "text/plain" : Vd(e.body) || (p["Content-Type"] = "application/json")), p
        }, tp = r => {
            if (r.body) return r.body
        }, rp = async (r, e, t, n, i, o, c) => {
            let d = Bn.default.CancelToken.source(),
                p = {
                    url: t,
                    headers: o,
                    data: n != null ? n : i,
                    method: e.method,
                    withCredentials: r.WITH_CREDENTIALS,
                    cancelToken: d.token
                };
            Object.keys(r.HEADERS || {}).filter(y => y.toLowerCase() === "accept").map(y => r.HEADERS[y]).includes("application/x-bcs") && (p.responseType = "arraybuffer"), c(() => d.cancel("The user aborted a request."));
            try {
                return await Bn.default.request(p)
            } catch (y) {
                let w = y;
                if (w.response) return w.response;
                throw y
            }
        }, np = (r, e) => {
            if (e) {
                let t = r.headers[e];
                if (_s(t)) return t
            }
        }, sp = r => {
            if (r.status !== 204) return r.data
        }, ip = (r, e) => {
            let n = {
                400: "Bad Request",
                401: "Unauthorized",
                403: "Forbidden",
                404: "Not Found",
                500: "Internal Server Error",
                502: "Bad Gateway",
                503: "Service Unavailable",
                ...r.errors
            } [e.status];
            if (n) throw new mt(r, e, n);
            if (!e.ok) throw new mt(r, e, "Generic Error")
        }, Oc = (r, e) => new kr(async (t, n, i) => {
            try {
                let o = Zd(r, e),
                    c = Qd(e),
                    d = tp(e),
                    p = await ep(r, e, c);
                if (!i.isCancelled) {
                    let T = await rp(r, e, o, d, c, p, i),
                        y = sp(T),
                        w = np(T, e.responseHeader),
                        v = {
                            url: o,
                            ok: Yd(T.status),
                            status: T.status,
                            statusText: T.statusText,
                            body: w != null ? w : y
                        };
                    ip(e, v), t(v.body)
                }
            } catch (o) {
                n(o)
            }
        });
    var Nr = class extends Ir {
        constructor(e) {
            super(e)
        }
        request(e) {
            return Oc(this.config, e)
        }
    };
    var Lr = class {
        constructor(e) {
            this.httpRequest = e
        }
        getAccount(e, t) {
            return this.httpRequest.request({
                method: "GET",
                url: "/accounts/{address}",
                path: {
                    address: e
                },
                query: {
                    ledger_version: t
                }
            })
        }
        getAccountResources(e, t) {
            return this.httpRequest.request({
                method: "GET",
                url: "/accounts/{address}/resources",
                path: {
                    address: e
                },
                query: {
                    ledger_version: t
                }
            })
        }
        getAccountModules(e, t) {
            return this.httpRequest.request({
                method: "GET",
                url: "/accounts/{address}/modules",
                path: {
                    address: e
                },
                query: {
                    ledger_version: t
                }
            })
        }
        getAccountResource(e, t, n) {
            return this.httpRequest.request({
                method: "GET",
                url: "/accounts/{address}/resource/{resource_type}",
                path: {
                    address: e,
                    resource_type: t
                },
                query: {
                    ledger_version: n
                }
            })
        }
        getAccountModule(e, t, n) {
            return this.httpRequest.request({
                method: "GET",
                url: "/accounts/{address}/module/{module_name}",
                path: {
                    address: e,
                    module_name: t
                },
                query: {
                    ledger_version: n
                }
            })
        }
    };
    var Fr = class {
        constructor(e) {
            this.httpRequest = e
        }
        getBlockByHeight(e, t) {
            return this.httpRequest.request({
                method: "GET",
                url: "/blocks/by_height/{block_height}",
                path: {
                    block_height: e
                },
                query: {
                    with_transactions: t
                }
            })
        }
        getBlockByVersion(e, t) {
            return this.httpRequest.request({
                method: "GET",
                url: "/blocks/by_version/{version}",
                path: {
                    version: e
                },
                query: {
                    with_transactions: t
                }
            })
        }
    };
    var $r = class {
        constructor(e) {
            this.httpRequest = e
        }
        getEventsByEventKey(e, t, n) {
            return this.httpRequest.request({
                method: "GET",
                url: "/events/{event_key}",
                path: {
                    event_key: e
                },
                query: {
                    start: t,
                    limit: n
                }
            })
        }
        getEventsByCreationNumber(e, t, n, i) {
            return this.httpRequest.request({
                method: "GET",
                url: "/accounts/{address}/events/{creation_number}",
                path: {
                    address: e,
                    creation_number: t
                },
                query: {
                    start: n,
                    limit: i
                }
            })
        }
        getEventsByEventHandle(e, t, n, i, o) {
            return this.httpRequest.request({
                method: "GET",
                url: "/accounts/{address}/events/{event_handle}/{field_name}",
                path: {
                    address: e,
                    event_handle: t,
                    field_name: n
                },
                query: {
                    start: i,
                    limit: o
                }
            })
        }
    };
    var Wr = class {
        constructor(e) {
            this.httpRequest = e
        }
        spec() {
            return this.httpRequest.request({
                method: "GET",
                url: "/spec"
            })
        }
        healthy(e) {
            return this.httpRequest.request({
                method: "GET",
                url: "/-/healthy",
                query: {
                    duration_secs: e
                }
            })
        }
        getLedgerInfo() {
            return this.httpRequest.request({
                method: "GET",
                url: "/"
            })
        }
    };
    var Gr = class {
        constructor(e) {
            this.httpRequest = e
        }
        getTableItem(e, t, n) {
            return this.httpRequest.request({
                method: "POST",
                url: "/tables/{table_handle}/item",
                path: {
                    table_handle: e
                },
                query: {
                    ledger_version: n
                },
                body: t,
                mediaType: "application/json"
            })
        }
    };
    var jr = class {
        constructor(e) {
            this.httpRequest = e
        }
        getTransactions(e, t) {
            return this.httpRequest.request({
                method: "GET",
                url: "/transactions",
                query: {
                    start: e,
                    limit: t
                }
            })
        }
        submitTransaction(e) {
            return this.httpRequest.request({
                method: "POST",
                url: "/transactions",
                body: e,
                mediaType: "application/json"
            })
        }
        getTransactionByHash(e) {
            return this.httpRequest.request({
                method: "GET",
                url: "/transactions/by_hash/{txn_hash}",
                path: {
                    txn_hash: e
                }
            })
        }
        getTransactionByVersion(e) {
            return this.httpRequest.request({
                method: "GET",
                url: "/transactions/by_version/{txn_version}",
                path: {
                    txn_version: e
                }
            })
        }
        getAccountTransactions(e, t, n) {
            return this.httpRequest.request({
                method: "GET",
                url: "/accounts/{address}/transactions",
                path: {
                    address: e
                },
                query: {
                    start: t,
                    limit: n
                }
            })
        }
        submitBatchTransactions(e) {
            return this.httpRequest.request({
                method: "POST",
                url: "/transactions/batch",
                body: e,
                mediaType: "application/json"
            })
        }
        simulateTransaction(e, t, n) {
            return this.httpRequest.request({
                method: "POST",
                url: "/transactions/simulate",
                query: {
                    estimate_max_gas_amount: t,
                    estimate_gas_unit_price: n
                },
                body: e,
                mediaType: "application/json"
            })
        }
        encodeSubmission(e) {
            return this.httpRequest.request({
                method: "POST",
                url: "/transactions/encode_submission",
                body: e,
                mediaType: "application/json"
            })
        }
        estimateGasPrice() {
            return this.httpRequest.request({
                method: "GET",
                url: "/estimate_gas_price"
            })
        }
    };
    var Kr = class {
        constructor(e, t = Nr) {
            var n, i, o, c;
            this.request = new t({
                BASE: (n = e == null ? void 0 : e.BASE) != null ? n : "/v1",
                VERSION: (i = e == null ? void 0 : e.VERSION) != null ? i : "1.2.0",
                WITH_CREDENTIALS: (o = e == null ? void 0 : e.WITH_CREDENTIALS) != null ? o : !1,
                CREDENTIALS: (c = e == null ? void 0 : e.CREDENTIALS) != null ? c : "include",
                TOKEN: e == null ? void 0 : e.TOKEN,
                USERNAME: e == null ? void 0 : e.USERNAME,
                PASSWORD: e == null ? void 0 : e.PASSWORD,
                HEADERS: e == null ? void 0 : e.HEADERS,
                ENCODE_PATH: e == null ? void 0 : e.ENCODE_PATH
            }), this.accounts = new Lr(this.request), this.blocks = new Fr(this.request), this.events = new $r(this.request), this.general = new Wr(this.request), this.tables = new Gr(this.request), this.transactions = new jr(this.request)
        }
    };
    var kc = {
        BASE: "/v1",
        VERSION: "1.2.0",
        WITH_CREDENTIALS: !1,
        CREDENTIALS: "include",
        TOKEN: void 0,
        USERNAME: void 0,
        PASSWORD: void 0,
        HEADERS: void 0,
        ENCODE_PATH: void 0
    };
    var Li = (F => (F.ACCOUNT_NOT_FOUND = "account_not_found", F.RESOURCE_NOT_FOUND = "resource_not_found", F.MODULE_NOT_FOUND = "module_not_found", F.STRUCT_FIELD_NOT_FOUND = "struct_field_not_found", F.VERSION_NOT_FOUND = "version_not_found", F.TRANSACTION_NOT_FOUND = "transaction_not_found", F.TABLE_ITEM_NOT_FOUND = "table_item_not_found", F.BLOCK_NOT_FOUND = "block_not_found", F.VERSION_PRUNED = "version_pruned", F.BLOCK_PRUNED = "block_pruned", F.INVALID_INPUT = "invalid_input", F.INVALID_TRANSACTION_UPDATE = "invalid_transaction_update", F.SEQUENCE_NUMBER_TOO_OLD = "sequence_number_too_old", F.VM_ERROR = "vm_error", F.HEALTH_CHECK_FAILED = "health_check_failed", F.MEMPOOL_IS_FULL = "mempool_is_full", F.INTERNAL_ERROR = "internal_error", F.WEB_FRAMEWORK_ERROR = "web_framework_error", F.BCS_NOT_SUPPORTED = "bcs_not_supported", F.API_DISABLED = "api_disabled", F))(Li || {});
    var Fi = (n => (n.PRIVATE = "private", n.PUBLIC = "public", n.FRIEND = "friend", n))(Fi || {});
    var $i = (t => (t.VALIDATOR = "validator", t.FULL_NODE = "full_node", t))($i || {});
    var Nc = {
        description: `Account data

    A simplified version of the onchain Account resource`,
        properties: {
            sequence_number: {
                type: "U64",
                isRequired: !0
            },
            authentication_key: {
                type: "HexEncodedBytes",
                isRequired: !0
            }
        }
    };
    var Lc = {
        type: "one-of",
        description: `Account signature scheme

    The account signature scheme allows you to have two types of accounts:

    1. A single Ed25519 key account, one private key
    2. A k-of-n multi-Ed25519 key account, multiple private keys, such that k-of-n must sign a transaction.`,
        contains: [{
            type: "AccountSignature_Ed25519Signature"
        }, {
            type: "AccountSignature_MultiEd25519Signature"
        }]
    };
    var Fc = {
        type: "all-of",
        contains: [{
            properties: {
                type: {
                    type: "string",
                    isRequired: !0
                }
            }
        }, {
            type: "Ed25519Signature"
        }]
    };
    var $c = {
        type: "all-of",
        contains: [{
            properties: {
                type: {
                    type: "string",
                    isRequired: !0
                }
            }
        }, {
            type: "MultiEd25519Signature"
        }]
    };
    var Wc = {
        type: "string",
        description: `A hex encoded 32 byte Aptos account address.

    This is represented in a string as a 64 character hex string, sometimes
    shortened by stripping leading 0s, and adding a 0x.

    For example, address 0x0000000000000000000000000000000000000000000000000000000000000001 is represented as 0x1.
    `,
        format: "hex"
    };
    var Gc = {
        description: `This is the generic struct we use for all API errors, it contains a string
    message and an Aptos API specific error code.`,
        properties: {
            message: {
                type: "string",
                description: "A message describing the error",
                isRequired: !0
            },
            error_code: {
                type: "AptosErrorCode",
                isRequired: !0
            },
            vm_error_code: {
                type: "number",
                description: "A code providing VM error details when submitting transactions to the VM",
                format: "uint64"
            }
        }
    };
    var jc = {
        type: "Enum"
    };
    var Kc = {
        description: `A Block with or without transactions

    This contains the information about a transactions along with
    associated transactions if requested`,
        properties: {
            block_height: {
                type: "U64",
                isRequired: !0
            },
            block_hash: {
                type: "HashValue",
                isRequired: !0
            },
            block_timestamp: {
                type: "U64",
                isRequired: !0
            },
            first_version: {
                type: "U64",
                isRequired: !0
            },
            last_version: {
                type: "U64",
                isRequired: !0
            },
            transactions: {
                type: "array",
                contains: {
                    type: "Transaction"
                }
            }
        }
    };
    var Vc = {
        description: `A block metadata transaction

    This signifies the beginning of a block, and contains information
    about the specific block`,
        properties: {
            version: {
                type: "U64",
                isRequired: !0
            },
            hash: {
                type: "HashValue",
                isRequired: !0
            },
            state_change_hash: {
                type: "HashValue",
                isRequired: !0
            },
            event_root_hash: {
                type: "HashValue",
                isRequired: !0
            },
            state_checkpoint_hash: {
                type: "HashValue"
            },
            gas_used: {
                type: "U64",
                isRequired: !0
            },
            success: {
                type: "boolean",
                description: "Whether the transaction was successful",
                isRequired: !0
            },
            vm_status: {
                type: "string",
                description: "The VM status of the transaction, can tell useful information in a failure",
                isRequired: !0
            },
            accumulator_root_hash: {
                type: "HashValue",
                isRequired: !0
            },
            changes: {
                type: "array",
                contains: {
                    type: "WriteSetChange"
                },
                isRequired: !0
            },
            id: {
                type: "HashValue",
                isRequired: !0
            },
            epoch: {
                type: "U64",
                isRequired: !0
            },
            round: {
                type: "U64",
                isRequired: !0
            },
            events: {
                type: "array",
                contains: {
                    type: "Event"
                },
                isRequired: !0
            },
            previous_block_votes_bitvec: {
                type: "array",
                contains: {
                    type: "number",
                    format: "uint8"
                },
                isRequired: !0
            },
            proposer: {
                type: "Address",
                isRequired: !0
            },
            failed_proposer_indices: {
                type: "array",
                contains: {
                    type: "number",
                    format: "uint32"
                },
                isRequired: !0
            },
            timestamp: {
                type: "U64",
                isRequired: !0
            }
        }
    };
    var Yc = {
        description: "Decoded table data",
        properties: {
            key: {
                description: "Key of table in JSON",
                properties: {},
                isRequired: !0
            },
            key_type: {
                type: "string",
                description: "Type of key",
                isRequired: !0
            },
            value: {
                description: "Value of table in JSON",
                properties: {},
                isRequired: !0
            },
            value_type: {
                type: "string",
                description: "Type of value",
                isRequired: !0
            }
        }
    };
    var Xc = {
        description: "Deleted table data",
        properties: {
            key: {
                description: "Deleted key",
                properties: {},
                isRequired: !0
            },
            key_type: {
                type: "string",
                description: "Deleted key type",
                isRequired: !0
            }
        }
    };
    var Jc = {
        description: "Delete a module",
        properties: {
            address: {
                type: "Address",
                isRequired: !0
            },
            state_key_hash: {
                type: "string",
                description: "State key hash",
                isRequired: !0
            },
            module: {
                type: "MoveModuleId",
                isRequired: !0
            }
        }
    };
    var Zc = {
        description: "Delete a resource",
        properties: {
            address: {
                type: "Address",
                isRequired: !0
            },
            state_key_hash: {
                type: "string",
                description: "State key hash",
                isRequired: !0
            },
            resource: {
                type: "MoveStructTag",
                isRequired: !0
            }
        }
    };
    var Qc = {
        description: "Delete a table item",
        properties: {
            state_key_hash: {
                type: "string",
                isRequired: !0
            },
            handle: {
                type: "HexEncodedBytes",
                isRequired: !0
            },
            key: {
                type: "HexEncodedBytes",
                isRequired: !0
            },
            data: {
                type: "DeletedTableData"
            }
        }
    };
    var e0 = {
        properties: {
            changes: {
                type: "array",
                contains: {
                    type: "WriteSetChange"
                },
                isRequired: !0
            },
            events: {
                type: "array",
                contains: {
                    type: "Event"
                },
                isRequired: !0
            }
        }
    };
    var t0 = {
        description: "A single Ed25519 signature",
        properties: {
            public_key: {
                type: "HexEncodedBytes",
                isRequired: !0
            },
            signature: {
                type: "HexEncodedBytes",
                isRequired: !0
            }
        }
    };
    var r0 = {
        description: "Request to encode a submission",
        properties: {
            sender: {
                type: "Address",
                isRequired: !0
            },
            sequence_number: {
                type: "U64",
                isRequired: !0
            },
            max_gas_amount: {
                type: "U64",
                isRequired: !0
            },
            gas_unit_price: {
                type: "U64",
                isRequired: !0
            },
            expiration_timestamp_secs: {
                type: "U64",
                isRequired: !0
            },
            payload: {
                type: "TransactionPayload",
                isRequired: !0
            },
            secondary_signers: {
                type: "array",
                contains: {
                    type: "Address"
                }
            }
        }
    };
    var n0 = {
        type: "string",
        description: "Entry function id is string representation of a entry function defined on-chain.\n\n    Format: `{address}::{module name}::{function name}`\n\n    Both `module name` and `function name` are case-sensitive.\n    "
    };
    var s0 = {
        description: "Payload which runs a single entry function",
        properties: {
            function: {
                type: "EntryFunctionId",
                isRequired: !0
            },
            type_arguments: {
                type: "array",
                contains: {
                    type: "MoveType"
                },
                isRequired: !0
            },
            arguments: {
                type: "array",
                contains: {
                    properties: {}
                },
                isRequired: !0
            }
        }
    };
    var i0 = {
        description: "An event from a transaction",
        properties: {
            key: {
                type: "EventKey",
                isRequired: !0
            },
            guid: {
                type: "EventGuid",
                isRequired: !0
            },
            sequence_number: {
                type: "U64",
                isRequired: !0
            },
            type: {
                type: "MoveType",
                isRequired: !0
            },
            data: {
                description: "The JSON representation of the event",
                properties: {},
                isRequired: !0
            }
        }
    };
    var o0 = {
        properties: {
            creation_number: {
                type: "U64",
                isRequired: !0
            },
            account_address: {
                type: "Address",
                isRequired: !0
            }
        }
    };
    var a0 = {
        type: "string",
        description: "Event key is a global index for an event stream.\n\n    It is hex-encoded BCS bytes of `EventHandle` `guid` field value, which is\n    a combination of a `uint64` creation number and account address (without\n    trimming leading zeros).\n\n    For example, event key `0x000000000000000088fbd33f54e1126269769780feb24480428179f552e2313fbe571b72e62a1ca1` is combined by the following 2 parts:\n    1. `0000000000000000`: `uint64` representation of `0`.\n    2. `88fbd33f54e1126269769780feb24480428179f552e2313fbe571b72e62a1ca1`: 32 bytes of account address.\n    ",
        format: "hex"
    };
    var c0 = {
        description: "Struct holding the outputs of the estimate gas API",
        properties: {
            gas_estimate: {
                type: "number",
                description: "The current estimate for the gas unit price",
                isRequired: !0,
                format: "uint64"
            }
        }
    };
    var u0 = {
        type: "one-of",
        description: "The writeset payload of the Genesis transaction",
        contains: [{
            type: "GenesisPayload_WriteSetPayload"
        }]
    };
    var f0 = {
        type: "all-of",
        contains: [{
            properties: {
                type: {
                    type: "string",
                    isRequired: !0
                }
            }
        }, {
            type: "WriteSetPayload"
        }]
    };
    var l0 = {
        description: `The genesis transaction

    This only occurs at the genesis transaction (version 0)`,
        properties: {
            version: {
                type: "U64",
                isRequired: !0
            },
            hash: {
                type: "HashValue",
                isRequired: !0
            },
            state_change_hash: {
                type: "HashValue",
                isRequired: !0
            },
            event_root_hash: {
                type: "HashValue",
                isRequired: !0
            },
            state_checkpoint_hash: {
                type: "HashValue"
            },
            gas_used: {
                type: "U64",
                isRequired: !0
            },
            success: {
                type: "boolean",
                description: "Whether the transaction was successful",
                isRequired: !0
            },
            vm_status: {
                type: "string",
                description: "The VM status of the transaction, can tell useful information in a failure",
                isRequired: !0
            },
            accumulator_root_hash: {
                type: "HashValue",
                isRequired: !0
            },
            changes: {
                type: "array",
                contains: {
                    type: "WriteSetChange"
                },
                isRequired: !0
            },
            payload: {
                type: "GenesisPayload",
                isRequired: !0
            },
            events: {
                type: "array",
                contains: {
                    type: "Event"
                },
                isRequired: !0
            }
        }
    };
    var d0 = {
        type: "string"
    };
    var p0 = {
        description: "Representation of a successful healthcheck",
        properties: {
            message: {
                type: "string",
                isRequired: !0
            }
        }
    };
    var h0 = {
        type: "string",
        description: "All bytes (Vec<u8>) data is represented as hex-encoded string prefixed with `0x` and fulfilled with\n    two hex digits per byte.\n\n    Unlike the `Address` type, HexEncodedBytes will not trim any zeros.\n    ",
        format: "hex"
    };
    var y0 = {
        type: "string"
    };
    var x0 = {
        description: `The struct holding all data returned to the client by the
    index endpoint (i.e., GET "/").`,
        properties: {
            chain_id: {
                type: "number",
                description: "Chain ID of the current chain",
                isRequired: !0,
                format: "uint8"
            },
            epoch: {
                type: "U64",
                isRequired: !0
            },
            ledger_version: {
                type: "U64",
                isRequired: !0
            },
            oldest_ledger_version: {
                type: "U64",
                isRequired: !0
            },
            ledger_timestamp: {
                type: "U64",
                isRequired: !0
            },
            node_role: {
                type: "RoleType",
                isRequired: !0
            },
            oldest_block_height: {
                type: "U64",
                isRequired: !0
            },
            block_height: {
                type: "U64",
                isRequired: !0
            }
        }
    };
    var m0 = {
        properties: {
            modules: {
                type: "array",
                contains: {
                    type: "MoveModuleBytecode"
                },
                isRequired: !0
            }
        }
    };
    var b0 = {
        type: "string"
    };
    var g0 = {
        description: "Move function",
        properties: {
            name: {
                type: "IdentifierWrapper",
                isRequired: !0
            },
            visibility: {
                type: "MoveFunctionVisibility",
                isRequired: !0
            },
            is_entry: {
                type: "boolean",
                description: "Whether the function can be called as an entry function directly in a transaction",
                isRequired: !0
            },
            generic_type_params: {
                type: "array",
                contains: {
                    type: "MoveFunctionGenericTypeParam"
                },
                isRequired: !0
            },
            params: {
                type: "array",
                contains: {
                    type: "MoveType"
                },
                isRequired: !0
            },
            return: {
                type: "array",
                contains: {
                    type: "MoveType"
                },
                isRequired: !0
            }
        }
    };
    var w0 = {
        description: "Move function generic type param",
        properties: {
            constraints: {
                type: "array",
                contains: {
                    type: "MoveAbility"
                },
                isRequired: !0
            }
        }
    };
    var T0 = {
        type: "Enum"
    };
    var A0 = {
        description: "A Move module",
        properties: {
            address: {
                type: "Address",
                isRequired: !0
            },
            name: {
                type: "IdentifierWrapper",
                isRequired: !0
            },
            friends: {
                type: "array",
                contains: {
                    type: "MoveModuleId"
                },
                isRequired: !0
            },
            exposed_functions: {
                type: "array",
                contains: {
                    type: "MoveFunction"
                },
                isRequired: !0
            },
            structs: {
                type: "array",
                contains: {
                    type: "MoveStruct"
                },
                isRequired: !0
            }
        }
    };
    var S0 = {
        description: "Move module bytecode along with it's ABI",
        properties: {
            bytecode: {
                type: "HexEncodedBytes",
                isRequired: !0
            },
            abi: {
                type: "MoveModule"
            }
        }
    };
    var E0 = {
        type: "string",
        description: `Move module id is a string representation of Move module.

    Format: \`{address}::{module name}\`

    \`address\` should be hex-encoded 32 byte account address that is prefixed with \`0x\`.

    Module name is case-sensitive.
    `
    };
    var _0 = {
        description: "A parsed Move resource",
        properties: {
            type: {
                type: "MoveStructTag",
                isRequired: !0
            },
            data: {
                type: "MoveStructValue",
                isRequired: !0
            }
        }
    };
    var v0 = {
        description: "Move script bytecode",
        properties: {
            bytecode: {
                type: "HexEncodedBytes",
                isRequired: !0
            },
            abi: {
                type: "MoveFunction"
            }
        }
    };
    var B0 = {
        description: "A move struct",
        properties: {
            name: {
                type: "IdentifierWrapper",
                isRequired: !0
            },
            is_native: {
                type: "boolean",
                description: "Whether the struct is a native struct of Move",
                isRequired: !0
            },
            abilities: {
                type: "array",
                contains: {
                    type: "MoveAbility"
                },
                isRequired: !0
            },
            generic_type_params: {
                type: "array",
                contains: {
                    type: "MoveStructGenericTypeParam"
                },
                isRequired: !0
            },
            fields: {
                type: "array",
                contains: {
                    type: "MoveStructField"
                },
                isRequired: !0
            }
        }
    };
    var R0 = {
        description: "Move struct field",
        properties: {
            name: {
                type: "IdentifierWrapper",
                isRequired: !0
            },
            type: {
                type: "MoveType",
                isRequired: !0
            }
        }
    };
    var U0 = {
        description: "Move generic type param",
        properties: {
            constraints: {
                type: "array",
                contains: {
                    type: "MoveAbility"
                },
                isRequired: !0
            }
        }
    };
    var P0 = {
        type: "string",
        description: "String representation of a MoveStructTag (on-chain Move struct type). This exists so you\n    can specify MoveStructTags as path / query parameters, e.g. for get_events_by_event_handle.\n\n    It is a combination of:\n    1. `move_module_address`, `module_name` and `struct_name`, all joined by `::`\n    2. `struct generic type parameters` joined by `, `\n\n    Examples:\n     * `0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>`\n     * `0x1::account::Account`\n\n    Note:\n    1. Empty chars should be ignored when comparing 2 struct tag ids.\n    2. When used in an URL path, should be encoded by url-encoding (AKA percent-encoding).\n\n    See [doc](https://aptos.dev/concepts/basics-accounts) for more details.\n    ",
        pattern: "^0x[0-9a-zA-Z:_<>]+$"
    };
    var M0 = {
        description: 'This is a JSON representation of some data within an account resource. More specifically,\n    it is a map of strings to arbitrary JSON values / objects, where the keys are top level\n    fields within the given resource.\n\n    To clarify, you might query for 0x1::account::Account and see the example data.\n\n    Move `bool` type value is serialized into `boolean`.\n\n    Move `u8` type value is serialized into `integer`.\n\n    Move `u64` and `u128` type value is serialized into `string`.\n\n    Move `address` type value (32 byte Aptos account address) is serialized into a HexEncodedBytes string.\n    For example:\n    - `0x1`\n    - `0x1668f6be25668c1a17cd8caf6b8d2f25`\n\n    Move `vector` type value is serialized into `array`, except `vector<u8>` which is serialized into a\n    HexEncodedBytes string with `0x` prefix.\n    For example:\n    - `vector<u64>{255, 255}` => `["255", "255"]`\n    - `vector<u8>{255, 255}` => `0xffff`\n\n    Move `struct` type value is serialized into `object` that looks like this (except some Move stdlib types, see the following section):\n    ```json\n    {\n        field1_name: field1_value,\n        field2_name: field2_value,\n        ......\n    }\n    ```\n\n    For example:\n    `{ "created": "0xa550c18", "role_id": "0" }`\n\n     **Special serialization for Move stdlib types**:\n    - [0x1::string::String](https://github.com/aptos-labs/aptos-core/blob/main/language/move-stdlib/docs/ascii.md)\n    is serialized into `string`. For example, struct value `0x1::string::String{bytes: b"Hello World!"}`\n    is serialized as `"Hello World!"` in JSON.\n    ',
        properties: {}
    };
    var q0 = {
        type: "string",
        description: `String representation of an on-chain Move type tag that is exposed in transaction payload.
    Values:
    - bool
    - u8
    - u64
    - u128
    - address
    - signer
    - vector: \`vector<{non-reference MoveTypeId}>\`
    - struct: \`{address}::{module_name}::{struct_name}::<{generic types}>\`

    Vector type value examples:
    - \`vector<u8>\`
    - \`vector<vector<u64>>\`
    - \`vector<0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>>\`

    Struct type value examples:
    - \`0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>
    - \`0x1::account::Account\`

    Note:
    1. Empty chars should be ignored when comparing 2 struct tag ids.
    2. When used in an URL path, should be encoded by url-encoding (AKA percent-encoding).
    `,
        pattern: "^(bool|u8|u64|u128|address|signer|vector<.+>|0x[0-9a-zA-Z:_<, >]+)$"
    };
    var I0 = {
        type: "any-of",
        description: "An enum of the possible Move value types",
        contains: [{
            type: "number",
            format: "uint8"
        }, {
            type: "U64"
        }, {
            type: "U128"
        }, {
            type: "boolean"
        }, {
            type: "Address"
        }, {
            type: "array",
            contains: {
                type: "MoveValue"
            }
        }, {
            type: "HexEncodedBytes"
        }, {
            type: "MoveStructValue"
        }, {
            type: "string"
        }]
    };
    var C0 = {
        description: `Multi agent signature for multi agent transactions

    This allows you to have transactions across multiple accounts`,
        properties: {
            sender: {
                type: "AccountSignature",
                isRequired: !0
            },
            secondary_signer_addresses: {
                type: "array",
                contains: {
                    type: "Address"
                },
                isRequired: !0
            },
            secondary_signers: {
                type: "array",
                contains: {
                    type: "AccountSignature"
                },
                isRequired: !0
            }
        }
    };
    var H0 = {
        description: `A Ed25519 multi-sig signature

    This allows k-of-n signing for a transaction`,
        properties: {
            public_keys: {
                type: "array",
                contains: {
                    type: "HexEncodedBytes"
                },
                isRequired: !0
            },
            signatures: {
                type: "array",
                contains: {
                    type: "HexEncodedBytes"
                },
                isRequired: !0
            },
            threshold: {
                type: "number",
                description: "The number of signatures required for a successful transaction",
                isRequired: !0,
                format: "uint8"
            },
            bitmap: {
                type: "HexEncodedBytes",
                isRequired: !0
            }
        }
    };
    var z0 = {
        description: "A transaction waiting in mempool",
        properties: {
            hash: {
                type: "HashValue",
                isRequired: !0
            },
            sender: {
                type: "Address",
                isRequired: !0
            },
            sequence_number: {
                type: "U64",
                isRequired: !0
            },
            max_gas_amount: {
                type: "U64",
                isRequired: !0
            },
            gas_unit_price: {
                type: "U64",
                isRequired: !0
            },
            expiration_timestamp_secs: {
                type: "U64",
                isRequired: !0
            },
            payload: {
                type: "TransactionPayload",
                isRequired: !0
            },
            signature: {
                type: "TransactionSignature"
            }
        }
    };
    var D0 = {
        type: "Enum"
    };
    var O0 = {
        description: "Payload which runs a script that can run multiple functions",
        properties: {
            code: {
                type: "MoveScriptBytecode",
                isRequired: !0
            },
            type_arguments: {
                type: "array",
                contains: {
                    type: "MoveType"
                },
                isRequired: !0
            },
            arguments: {
                type: "array",
                contains: {
                    properties: {}
                },
                isRequired: !0
            }
        }
    };
    var k0 = {
        properties: {
            execute_as: {
                type: "Address",
                isRequired: !0
            },
            script: {
                type: "ScriptPayload",
                isRequired: !0
            }
        }
    };
    var N0 = {
        description: "A state checkpoint transaction",
        properties: {
            version: {
                type: "U64",
                isRequired: !0
            },
            hash: {
                type: "HashValue",
                isRequired: !0
            },
            state_change_hash: {
                type: "HashValue",
                isRequired: !0
            },
            event_root_hash: {
                type: "HashValue",
                isRequired: !0
            },
            state_checkpoint_hash: {
                type: "HashValue"
            },
            gas_used: {
                type: "U64",
                isRequired: !0
            },
            success: {
                type: "boolean",
                description: "Whether the transaction was successful",
                isRequired: !0
            },
            vm_status: {
                type: "string",
                description: "The VM status of the transaction, can tell useful information in a failure",
                isRequired: !0
            },
            accumulator_root_hash: {
                type: "HashValue",
                isRequired: !0
            },
            changes: {
                type: "array",
                contains: {
                    type: "WriteSetChange"
                },
                isRequired: !0
            },
            timestamp: {
                type: "U64",
                isRequired: !0
            }
        }
    };
    var L0 = {
        description: `A request to submit a transaction

    This requires a transaction and a signature of it`,
        properties: {
            sender: {
                type: "Address",
                isRequired: !0
            },
            sequence_number: {
                type: "U64",
                isRequired: !0
            },
            max_gas_amount: {
                type: "U64",
                isRequired: !0
            },
            gas_unit_price: {
                type: "U64",
                isRequired: !0
            },
            expiration_timestamp_secs: {
                type: "U64",
                isRequired: !0
            },
            payload: {
                type: "TransactionPayload",
                isRequired: !0
            },
            signature: {
                type: "TransactionSignature",
                isRequired: !0
            }
        }
    };
    var F0 = {
        description: "Table Item request for the GetTableItem API",
        properties: {
            key_type: {
                type: "MoveType",
                isRequired: !0
            },
            value_type: {
                type: "MoveType",
                isRequired: !0
            },
            key: {
                description: "The value of the table item's key",
                properties: {},
                isRequired: !0
            }
        }
    };
    var $0 = {
        type: "one-of",
        description: "Enum of the different types of transactions in Aptos",
        contains: [{
            type: "Transaction_PendingTransaction"
        }, {
            type: "Transaction_UserTransaction"
        }, {
            type: "Transaction_GenesisTransaction"
        }, {
            type: "Transaction_BlockMetadataTransaction"
        }, {
            type: "Transaction_StateCheckpointTransaction"
        }]
    };
    var W0 = {
        type: "all-of",
        contains: [{
            properties: {
                type: {
                    type: "string",
                    isRequired: !0
                }
            }
        }, {
            type: "BlockMetadataTransaction"
        }]
    };
    var G0 = {
        type: "all-of",
        contains: [{
            properties: {
                type: {
                    type: "string",
                    isRequired: !0
                }
            }
        }, {
            type: "GenesisTransaction"
        }]
    };
    var j0 = {
        type: "all-of",
        contains: [{
            properties: {
                type: {
                    type: "string",
                    isRequired: !0
                }
            }
        }, {
            type: "PendingTransaction"
        }]
    };
    var K0 = {
        type: "all-of",
        contains: [{
            properties: {
                type: {
                    type: "string",
                    isRequired: !0
                }
            }
        }, {
            type: "StateCheckpointTransaction"
        }]
    };
    var V0 = {
        type: "all-of",
        contains: [{
            properties: {
                type: {
                    type: "string",
                    isRequired: !0
                }
            }
        }, {
            type: "UserTransaction"
        }]
    };
    var Y0 = {
        type: "one-of",
        description: "An enum of the possible transaction payloads",
        contains: [{
            type: "TransactionPayload_EntryFunctionPayload"
        }, {
            type: "TransactionPayload_ScriptPayload"
        }, {
            type: "TransactionPayload_ModuleBundlePayload"
        }]
    };
    var X0 = {
        type: "all-of",
        contains: [{
            properties: {
                type: {
                    type: "string",
                    isRequired: !0
                }
            }
        }, {
            type: "EntryFunctionPayload"
        }]
    };
    var J0 = {
        type: "all-of",
        contains: [{
            properties: {
                type: {
                    type: "string",
                    isRequired: !0
                }
            }
        }, {
            type: "ModuleBundlePayload"
        }]
    };
    var Z0 = {
        type: "all-of",
        contains: [{
            properties: {
                type: {
                    type: "string",
                    isRequired: !0
                }
            }
        }, {
            type: "ScriptPayload"
        }]
    };
    var Q0 = {
        description: "Information telling which batch submission transactions failed",
        properties: {
            error: {
                type: "AptosError",
                isRequired: !0
            },
            transaction_index: {
                type: "number",
                description: "The index of which transaction failed, same as submission order",
                isRequired: !0,
                format: "uint64"
            }
        }
    };
    var eu = {
        description: `Batch transaction submission result

    Tells which transactions failed`,
        properties: {
            transaction_failures: {
                type: "array",
                contains: {
                    type: "TransactionsBatchSingleSubmissionFailure"
                },
                isRequired: !0
            }
        }
    };
    var tu = {
        type: "one-of",
        description: "An enum representing the different transaction signatures available",
        contains: [{
            type: "TransactionSignature_Ed25519Signature"
        }, {
            type: "TransactionSignature_MultiEd25519Signature"
        }, {
            type: "TransactionSignature_MultiAgentSignature"
        }]
    };
    var ru = {
        type: "all-of",
        contains: [{
            properties: {
                type: {
                    type: "string",
                    isRequired: !0
                }
            }
        }, {
            type: "Ed25519Signature"
        }]
    };
    var nu = {
        type: "all-of",
        contains: [{
            properties: {
                type: {
                    type: "string",
                    isRequired: !0
                }
            }
        }, {
            type: "MultiAgentSignature"
        }]
    };
    var su = {
        type: "all-of",
        contains: [{
            properties: {
                type: {
                    type: "string",
                    isRequired: !0
                }
            }
        }, {
            type: "MultiEd25519Signature"
        }]
    };
    var iu = {
        type: "string",
        description: `A string containing a 128-bit unsigned integer.

    We represent u128 values as a string to ensure compatibility with languages such
    as JavaScript that do not parse u64s in JSON natively.
    `,
        format: "uint64"
    };
    var ou = {
        type: "string",
        description: `A string containing a 64-bit unsigned integer.

    We represent u64 values as a string to ensure compatibility with languages such
    as JavaScript that do not parse u64s in JSON natively.
    `,
        format: "uint64"
    };
    var au = {
        description: "A transaction submitted by a user to change the state of the blockchain",
        properties: {
            version: {
                type: "U64",
                isRequired: !0
            },
            hash: {
                type: "HashValue",
                isRequired: !0
            },
            state_change_hash: {
                type: "HashValue",
                isRequired: !0
            },
            event_root_hash: {
                type: "HashValue",
                isRequired: !0
            },
            state_checkpoint_hash: {
                type: "HashValue"
            },
            gas_used: {
                type: "U64",
                isRequired: !0
            },
            success: {
                type: "boolean",
                description: "Whether the transaction was successful",
                isRequired: !0
            },
            vm_status: {
                type: "string",
                description: "The VM status of the transaction, can tell useful information in a failure",
                isRequired: !0
            },
            accumulator_root_hash: {
                type: "HashValue",
                isRequired: !0
            },
            changes: {
                type: "array",
                contains: {
                    type: "WriteSetChange"
                },
                isRequired: !0
            },
            sender: {
                type: "Address",
                isRequired: !0
            },
            sequence_number: {
                type: "U64",
                isRequired: !0
            },
            max_gas_amount: {
                type: "U64",
                isRequired: !0
            },
            gas_unit_price: {
                type: "U64",
                isRequired: !0
            },
            expiration_timestamp_secs: {
                type: "U64",
                isRequired: !0
            },
            payload: {
                type: "TransactionPayload",
                isRequired: !0
            },
            signature: {
                type: "TransactionSignature"
            },
            events: {
                type: "array",
                contains: {
                    type: "Event"
                },
                isRequired: !0
            },
            timestamp: {
                type: "U64",
                isRequired: !0
            }
        }
    };
    var cu = {
        description: "An event from a transaction with a version",
        properties: {
            version: {
                type: "U64",
                isRequired: !0
            },
            key: {
                type: "EventKey",
                isRequired: !0
            },
            guid: {
                type: "EventGuid",
                isRequired: !0
            },
            sequence_number: {
                type: "U64",
                isRequired: !0
            },
            type: {
                type: "MoveType",
                isRequired: !0
            },
            data: {
                description: "The JSON representation of the event",
                properties: {},
                isRequired: !0
            }
        }
    };
    var uu = {
        description: "Write a new module or update an existing one",
        properties: {
            address: {
                type: "Address",
                isRequired: !0
            },
            state_key_hash: {
                type: "string",
                description: "State key hash",
                isRequired: !0
            },
            data: {
                type: "MoveModuleBytecode",
                isRequired: !0
            }
        }
    };
    var fu = {
        description: "Write a resource or update an existing one",
        properties: {
            address: {
                type: "Address",
                isRequired: !0
            },
            state_key_hash: {
                type: "string",
                description: "State key hash",
                isRequired: !0
            },
            data: {
                type: "MoveResource",
                isRequired: !0
            }
        }
    };
    var lu = {
        type: "one-of",
        description: "The associated writeset with a payload",
        contains: [{
            type: "WriteSet_ScriptWriteSet"
        }, {
            type: "WriteSet_DirectWriteSet"
        }]
    };
    var du = {
        type: "all-of",
        contains: [{
            properties: {
                type: {
                    type: "string",
                    isRequired: !0
                }
            }
        }, {
            type: "DirectWriteSet"
        }]
    };
    var pu = {
        type: "all-of",
        contains: [{
            properties: {
                type: {
                    type: "string",
                    isRequired: !0
                }
            }
        }, {
            type: "ScriptWriteSet"
        }]
    };
    var hu = {
        type: "one-of",
        description: "A final state change of a transaction on a resource or module",
        contains: [{
            type: "WriteSetChange_DeleteModule"
        }, {
            type: "WriteSetChange_DeleteResource"
        }, {
            type: "WriteSetChange_DeleteTableItem"
        }, {
            type: "WriteSetChange_WriteModule"
        }, {
            type: "WriteSetChange_WriteResource"
        }, {
            type: "WriteSetChange_WriteTableItem"
        }]
    };
    var yu = {
        type: "all-of",
        contains: [{
            properties: {
                type: {
                    type: "string",
                    isRequired: !0
                }
            }
        }, {
            type: "DeleteModule"
        }]
    };
    var xu = {
        type: "all-of",
        contains: [{
            properties: {
                type: {
                    type: "string",
                    isRequired: !0
                }
            }
        }, {
            type: "DeleteResource"
        }]
    };
    var mu = {
        type: "all-of",
        contains: [{
            properties: {
                type: {
                    type: "string",
                    isRequired: !0
                }
            }
        }, {
            type: "DeleteTableItem"
        }]
    };
    var bu = {
        type: "all-of",
        contains: [{
            properties: {
                type: {
                    type: "string",
                    isRequired: !0
                }
            }
        }, {
            type: "WriteModule"
        }]
    };
    var gu = {
        type: "all-of",
        contains: [{
            properties: {
                type: {
                    type: "string",
                    isRequired: !0
                }
            }
        }, {
            type: "WriteResource"
        }]
    };
    var wu = {
        type: "all-of",
        contains: [{
            properties: {
                type: {
                    type: "string",
                    isRequired: !0
                }
            }
        }, {
            type: "WriteTableItem"
        }]
    };
    var Tu = {
        description: "A writeset payload, used only for genesis",
        properties: {
            write_set: {
                type: "WriteSet",
                isRequired: !0
            }
        }
    };
    var Au = {
        description: "Change set to write a table item",
        properties: {
            state_key_hash: {
                type: "string",
                isRequired: !0
            },
            handle: {
                type: "HexEncodedBytes",
                isRequired: !0
            },
            key: {
                type: "HexEncodedBytes",
                isRequired: !0
            },
            value: {
                type: "HexEncodedBytes",
                isRequired: !0
            },
            data: {
                type: "DecodedTableData"
            }
        }
    };
    var be = {};
    Wn(be, {
        AccountAddress: () => Te,
        AccountAuthenticator: () => gr,
        AccountAuthenticatorEd25519: () => Zr,
        AccountAuthenticatorMultiEd25519: () => Qr,
        AuthenticationKey: () => Cn,
        ChainId: () => er,
        ChangeSet: () => Gi,
        Ed25519PublicKey: () => Fe,
        Ed25519Signature: () => Ve,
        EntryFunction: () => St,
        Identifier: () => Pe,
        Module: () => In,
        ModuleId: () => nt,
        MultiAgentRawTransaction: () => Jt,
        MultiEd25519PublicKey: () => jt,
        MultiEd25519Signature: () => br,
        RawTransaction: () => Et,
        RawTransactionWithData: () => Rs,
        RotationProofChallenge: () => Ki,
        Script: () => Xt,
        SignedTransaction: () => Ct,
        StructTag: () => It,
        Transaction: () => Us,
        TransactionArgument: () => _t,
        TransactionArgumentAddress: () => sr,
        TransactionArgumentBool: () => or,
        TransactionArgumentU128: () => nr,
        TransactionArgumentU64: () => rr,
        TransactionArgumentU8: () => tr,
        TransactionArgumentU8Vector: () => ir,
        TransactionAuthenticator: () => Kt,
        TransactionAuthenticatorEd25519: () => Vt,
        TransactionAuthenticatorMultiAgent: () => Jr,
        TransactionAuthenticatorMultiEd25519: () => Yt,
        TransactionPayload: () => tn,
        TransactionPayloadEntryFunction: () => Qt,
        TransactionPayloadScript: () => Zt,
        TypeTag: () => ze,
        TypeTagAddress: () => Tt,
        TypeTagBool: () => bt,
        TypeTagSigner: () => en,
        TypeTagStruct: () => qt,
        TypeTagU128: () => wt,
        TypeTagU64: () => gt,
        TypeTagU8: () => rt,
        TypeTagVector: () => At,
        UserTransaction: () => rn,
        WriteSet: () => ji
    });
    var et = class {
            constructor(e) {
                if (e.length !== et.LENGTH) throw new Error("Expected address of length 32");
                this.address = e
            }
            static fromHex(e) {
                let t = G.ensure(e);
                t.noPrefix().length % 2 !== 0 && (t = new G(`0${t.noPrefix()}`));
                let n = t.toUint8Array();
                if (n.length > et.LENGTH) throw new Error("Hex string is too long. Address's length is 32 bytes.");
                if (n.length === et.LENGTH) return new et(n);
                let i = new Uint8Array(et.LENGTH);
                return i.set(n, et.LENGTH - n.length), new et(i)
            }
            serialize(e) {
                e.serializeFixedBytes(this.address)
            }
            static deserialize(e) {
                return new et(e.deserializeFixedBytes(et.LENGTH))
            }
        },
        Te = et;
    Te.LENGTH = 32, Te.CORE_CODE_ADDRESS = et.fromHex("0x1");
    var Bs = {};
    Wn(Bs, {
        Deserializer: () => Pn,
        Serializer: () => Se,
        bcsSerializeBool: () => lp,
        bcsSerializeBytes: () => mr,
        bcsSerializeFixedBytes: () => pp,
        bcsSerializeStr: () => dp,
        bcsSerializeU128: () => fp,
        bcsSerializeU16: () => cp,
        bcsSerializeU32: () => up,
        bcsSerializeU8: () => vs,
        bcsSerializeUint64: () => ap,
        bcsToBytes: () => tt,
        deserializeVector: () => Le,
        serializeVector: () => He,
        serializeVectorWithFunc: () => op
    });
    var Su = 2 ** 8 - 1,
        Eu = 2 ** 16 - 1,
        xr = 2 ** 32 - 1,
        Vr = BigInt(2 ** 64) - BigInt(1),
        _u = BigInt(2 ** 128) - BigInt(1);
    var Se = class {
        constructor() {
            this.buffer = new ArrayBuffer(64), this.offset = 0
        }
        ensureBufferWillHandleSize(e) {
            for (; this.buffer.byteLength < this.offset + e;) {
                let t = new ArrayBuffer(this.buffer.byteLength * 2);
                new Uint8Array(t).set(new Uint8Array(this.buffer)), this.buffer = t
            }
        }
        serialize(e) {
            this.ensureBufferWillHandleSize(e.length), new Uint8Array(this.buffer, this.offset).set(e), this.offset += e.length
        }
        serializeWithFunction(e, t, n) {
            this.ensureBufferWillHandleSize(t);
            let i = new DataView(this.buffer, this.offset);
            e.apply(i, [0, n, !0]), this.offset += t
        }
        serializeStr(e) {
            let t = new TextEncoder;
            this.serializeBytes(t.encode(e))
        }
        serializeBytes(e) {
            this.serializeU32AsUleb128(e.length), this.serialize(e)
        }
        serializeFixedBytes(e) {
            this.serialize(e)
        }
        serializeBool(e) {
            if (typeof e != "boolean") throw new Error("Value needs to be a boolean");
            let t = e ? 1 : 0;
            this.serialize(new Uint8Array([t]))
        }
        serializeU8(e) {
            this.serialize(new Uint8Array([e]))
        }
        serializeU16(e) {
            this.serializeWithFunction(DataView.prototype.setUint16, 2, e)
        }
        serializeU32(e) {
            this.serializeWithFunction(DataView.prototype.setUint32, 4, e)
        }
        serializeU64(e) {
            let t = BigInt(e.toString()) & BigInt(xr),
                n = BigInt(e.toString()) >> BigInt(32);
            this.serializeU32(Number(t)), this.serializeU32(Number(n))
        }
        serializeU128(e) {
            let t = BigInt(e.toString()) & Vr,
                n = BigInt(e.toString()) >> BigInt(64);
            this.serializeU64(t), this.serializeU64(n)
        }
        serializeU32AsUleb128(e) {
            let t = e,
                n = [];
            for (; t >>> 7 !== 0;) n.push(t & 127 | 128), t >>>= 7;
            n.push(t), this.serialize(new Uint8Array(n))
        }
        getBytes() {
            return new Uint8Array(this.buffer).slice(0, this.offset)
        }
    };
    me([Yr(0, Su)], Se.prototype, "serializeU8", 1), me([Yr(0, Eu)], Se.prototype, "serializeU16", 1), me([Yr(0, xr)], Se.prototype, "serializeU32", 1), me([Yr(BigInt(0), Vr)], Se.prototype, "serializeU64", 1), me([Yr(BigInt(0), _u)], Se.prototype, "serializeU128", 1), me([Yr(0, xr)], Se.prototype, "serializeU32AsUleb128", 1);

    function Yr(r, e, t) {
        return (n, i, o) => {
            let c = o.value;
            return o.value = function (p) {
                let T = BigInt(p.toString());
                if (T > BigInt(e.toString()) || T < BigInt(r.toString())) throw new Error(t || "Value is out of range");
                c.apply(this, [p])
            }, o
        }
    }
    var Pn = class {
        constructor(e) {
            this.buffer = new ArrayBuffer(e.length), new Uint8Array(this.buffer).set(e, 0), this.offset = 0
        }
        read(e) {
            if (this.offset + e > this.buffer.byteLength) throw new Error("Reached to the end of buffer");
            let t = this.buffer.slice(this.offset, this.offset + e);
            return this.offset += e, t
        }
        deserializeStr() {
            let e = this.deserializeBytes();
            return new TextDecoder().decode(e)
        }
        deserializeBytes() {
            let e = this.deserializeUleb128AsU32();
            return new Uint8Array(this.read(e))
        }
        deserializeFixedBytes(e) {
            return new Uint8Array(this.read(e))
        }
        deserializeBool() {
            let e = new Uint8Array(this.read(1))[0];
            if (e !== 1 && e !== 0) throw new Error("Invalid boolean value");
            return e === 1
        }
        deserializeU8() {
            return new DataView(this.read(1)).getUint8(0)
        }
        deserializeU16() {
            return new DataView(this.read(2)).getUint16(0, !0)
        }
        deserializeU32() {
            return new DataView(this.read(4)).getUint32(0, !0)
        }
        deserializeU64() {
            let e = this.deserializeU32(),
                t = this.deserializeU32();
            return BigInt(BigInt(t) << BigInt(32) | BigInt(e))
        }
        deserializeU128() {
            let e = this.deserializeU64(),
                t = this.deserializeU64();
            return BigInt(t << BigInt(64) | e)
        }
        deserializeUleb128AsU32() {
            let e = BigInt(0),
                t = 0;
            for (; e < xr;) {
                let n = this.deserializeU8();
                if (e |= BigInt(n & 127) << BigInt(t), (n & 128) === 0) break;
                t += 7
            }
            if (e > xr) throw new Error("Overflow while parsing uleb128-encoded uint32 value");
            return Number(e)
        }
    };

    function He(r, e) {
        e.serializeU32AsUleb128(r.length), r.forEach(t => {
            t.serialize(e)
        })
    }

    function op(r, e) {
        let t = new Se;
        t.serializeU32AsUleb128(r.length);
        let n = t[e];
        return r.forEach(i => {
            n.call(t, i)
        }), t.getBytes()
    }

    function Le(r, e) {
        let t = r.deserializeUleb128AsU32(),
            n = [];
        for (let i = 0; i < t; i += 1) n.push(e.deserialize(r));
        return n
    }

    function tt(r) {
        let e = new Se;
        return r.serialize(e), e.getBytes()
    }

    function ap(r) {
        let e = new Se;
        return e.serializeU64(r), e.getBytes()
    }

    function vs(r) {
        let e = new Se;
        return e.serializeU8(r), e.getBytes()
    }

    function cp(r) {
        let e = new Se;
        return e.serializeU16(r), e.getBytes()
    }

    function up(r) {
        let e = new Se;
        return e.serializeU32(r), e.getBytes()
    }

    function fp(r) {
        let e = new Se;
        return e.serializeU128(r), e.getBytes()
    }

    function lp(r) {
        let e = new Se;
        return e.serializeBool(r), e.getBytes()
    }

    function dp(r) {
        let e = new Se;
        return e.serializeStr(r), e.getBytes()
    }

    function mr(r) {
        let e = new Se;
        return e.serializeBytes(r), e.getBytes()
    }

    function pp(r) {
        let e = new Se;
        return e.serializeFixedBytes(r), e.getBytes()
    }
    var Mn = class {
            constructor(e) {
                if (e.length !== Mn.LENGTH) throw new Error(`Ed25519PublicKey length should be ${Mn.LENGTH}`);
                this.value = e
            }
            serialize(e) {
                e.serializeBytes(this.value)
            }
            static deserialize(e) {
                let t = e.deserializeBytes();
                return new Mn(t)
            }
        },
        Fe = Mn;
    Fe.LENGTH = 32;
    var qn = class {
            constructor(e) {
                this.value = e;
                if (e.length !== qn.LENGTH) throw new Error(`Ed25519Signature length should be ${qn.LENGTH}`)
            }
            serialize(e) {
                e.serializeBytes(this.value)
            }
            static deserialize(e) {
                let t = e.deserializeBytes();
                return new qn(t)
            }
        },
        Ve = qn;
    Ve.LENGTH = 64;
    var Wi = 32,
        jt = class {
            constructor(e, t) {
                this.public_keys = e;
                this.threshold = t;
                if (t > Wi) throw new Error(`"threshold" cannot be larger than ${Wi}`)
            }
            toBytes() {
                let e = new Uint8Array(this.public_keys.length * Fe.LENGTH + 1);
                return this.public_keys.forEach((t, n) => {
                    e.set(t.value, n * Fe.LENGTH)
                }), e[this.public_keys.length * Fe.LENGTH] = this.threshold, e
            }
            serialize(e) {
                e.serializeBytes(this.toBytes())
            }
            static deserialize(e) {
                let t = e.deserializeBytes(),
                    n = t[t.length - 1],
                    i = [];
                for (let o = 0; o < t.length - 1; o += Fe.LENGTH) {
                    let c = o;
                    i.push(new Fe(t.subarray(c, c + Fe.LENGTH)))
                }
                return new jt(i, n)
            }
        },
        Xr = class {
            constructor(e, t) {
                this.signatures = e;
                this.bitmap = t;
                if (t.length !== Xr.BITMAP_LEN) throw new Error(`"bitmap" length should be ${Xr.BITMAP_LEN}`)
            }
            toBytes() {
                let e = new Uint8Array(this.signatures.length * Ve.LENGTH + Xr.BITMAP_LEN);
                return this.signatures.forEach((t, n) => {
                    e.set(t.value, n * Ve.LENGTH)
                }), e.set(this.bitmap, this.signatures.length * Ve.LENGTH), e
            }
            static createBitmap(e) {
                let n = new Uint8Array([0, 0, 0, 0]),
                    i = new Set;
                return e.forEach(o => {
                    if (o >= Wi) throw new Error(`Invalid bit value ${o}.`);
                    if (i.has(o)) throw new Error("Duplicated bits detected.");
                    i.add(o);
                    let c = Math.floor(o / 8),
                        d = n[c];
                    d |= 128 >> o % 8, n[c] = d
                }), n
            }
            serialize(e) {
                e.serializeBytes(this.toBytes())
            }
            static deserialize(e) {
                let t = e.deserializeBytes(),
                    n = t.subarray(t.length - 4),
                    i = [];
                for (let o = 0; o < t.length - n.length; o += Ve.LENGTH) {
                    let c = o;
                    i.push(new Ve(t.subarray(c, c + Ve.LENGTH)))
                }
                return new Xr(i, n)
            }
        },
        br = Xr;
    br.BITMAP_LEN = 4;
    var Kt = class {
            static deserialize(e) {
                let t = e.deserializeUleb128AsU32();
                switch (t) {
                    case 0:
                        return Vt.load(e);
                    case 1:
                        return Yt.load(e);
                    case 2:
                        return Jr.load(e);
                    default:
                        throw new Error(`Unknown variant index for TransactionAuthenticator: ${t}`)
                }
            }
        },
        Vt = class extends Kt {
            constructor(t, n) {
                super();
                this.public_key = t;
                this.signature = n
            }
            serialize(t) {
                t.serializeU32AsUleb128(0), this.public_key.serialize(t), this.signature.serialize(t)
            }
            static load(t) {
                let n = Fe.deserialize(t),
                    i = Ve.deserialize(t);
                return new Vt(n, i)
            }
        },
        Yt = class extends Kt {
            constructor(t, n) {
                super();
                this.public_key = t;
                this.signature = n
            }
            serialize(t) {
                t.serializeU32AsUleb128(1), this.public_key.serialize(t), this.signature.serialize(t)
            }
            static load(t) {
                let n = jt.deserialize(t),
                    i = br.deserialize(t);
                return new Yt(n, i)
            }
        },
        Jr = class extends Kt {
            constructor(t, n, i) {
                super();
                this.sender = t;
                this.secondary_signer_addresses = n;
                this.secondary_signers = i
            }
            serialize(t) {
                t.serializeU32AsUleb128(2), this.sender.serialize(t), He(this.secondary_signer_addresses, t), He(this.secondary_signers, t)
            }
            static load(t) {
                let n = gr.deserialize(t),
                    i = Le(t, Te),
                    o = Le(t, gr);
                return new Jr(n, i, o)
            }
        },
        gr = class {
            static deserialize(e) {
                let t = e.deserializeUleb128AsU32();
                switch (t) {
                    case 0:
                        return Zr.load(e);
                    case 1:
                        return Qr.load(e);
                    default:
                        throw new Error(`Unknown variant index for AccountAuthenticator: ${t}`)
                }
            }
        },
        Zr = class extends gr {
            constructor(t, n) {
                super();
                this.public_key = t;
                this.signature = n
            }
            serialize(t) {
                t.serializeU32AsUleb128(0), this.public_key.serialize(t), this.signature.serialize(t)
            }
            static load(t) {
                let n = Fe.deserialize(t),
                    i = Ve.deserialize(t);
                return new Zr(n, i)
            }
        },
        Qr = class extends gr {
            constructor(t, n) {
                super();
                this.public_key = t;
                this.signature = n
            }
            serialize(t) {
                t.serializeU32AsUleb128(1), this.public_key.serialize(t), this.signature.serialize(t)
            }
            static load(t) {
                let n = jt.deserialize(t),
                    i = br.deserialize(t);
                return new Qr(n, i)
            }
        };
    var Pe = class {
        constructor(e) {
            this.value = e
        }
        serialize(e) {
            e.serializeStr(this.value)
        }
        static deserialize(e) {
            let t = e.deserializeStr();
            return new Pe(t)
        }
    };
    var ze = class {
            static deserialize(e) {
                let t = e.deserializeUleb128AsU32();
                switch (t) {
                    case 0:
                        return bt.load(e);
                    case 1:
                        return rt.load(e);
                    case 2:
                        return gt.load(e);
                    case 3:
                        return wt.load(e);
                    case 4:
                        return Tt.load(e);
                    case 5:
                        return en.load(e);
                    case 6:
                        return At.load(e);
                    case 7:
                        return qt.load(e);
                    default:
                        throw new Error(`Unknown variant index for TypeTag: ${t}`)
                }
            }
        },
        bt = class extends ze {
            serialize(e) {
                e.serializeU32AsUleb128(0)
            }
            static load(e) {
                return new bt
            }
        },
        rt = class extends ze {
            serialize(e) {
                e.serializeU32AsUleb128(1)
            }
            static load(e) {
                return new rt
            }
        },
        gt = class extends ze {
            serialize(e) {
                e.serializeU32AsUleb128(2)
            }
            static load(e) {
                return new gt
            }
        },
        wt = class extends ze {
            serialize(e) {
                e.serializeU32AsUleb128(3)
            }
            static load(e) {
                return new wt
            }
        },
        Tt = class extends ze {
            serialize(e) {
                e.serializeU32AsUleb128(4)
            }
            static load(e) {
                return new Tt
            }
        },
        en = class extends ze {
            serialize(e) {
                e.serializeU32AsUleb128(5)
            }
            static load(e) {
                return new en
            }
        },
        At = class extends ze {
            constructor(t) {
                super();
                this.value = t
            }
            serialize(t) {
                t.serializeU32AsUleb128(6), this.value.serialize(t)
            }
            static load(t) {
                let n = ze.deserialize(t);
                return new At(n)
            }
        },
        qt = class extends ze {
            constructor(t) {
                super();
                this.value = t
            }
            serialize(t) {
                t.serializeU32AsUleb128(7), this.value.serialize(t)
            }
            static load(t) {
                let n = It.deserialize(t);
                return new qt(n)
            }
        },
        It = class {
            constructor(e, t, n, i) {
                this.address = e;
                this.module_name = t;
                this.name = n;
                this.type_args = i
            }
            static fromString(e) {
                if (e.includes("<")) throw new Error("Not implemented");
                let t = e.split("::");
                if (t.length !== 3) throw new Error("Invalid struct tag string literal.");
                return new It(Te.fromHex(t[0]), new Pe(t[1]), new Pe(t[2]), [])
            }
            serialize(e) {
                this.address.serialize(e), this.module_name.serialize(e), this.name.serialize(e), He(this.type_args, e)
            }
            static deserialize(e) {
                let t = Te.deserialize(e),
                    n = Pe.deserialize(e),
                    i = Pe.deserialize(e),
                    o = Le(e, ze);
                return new It(t, n, i, o)
            }
        };
    var Et = class {
            constructor(e, t, n, i, o, c, d) {
                this.sender = e;
                this.sequence_number = t;
                this.payload = n;
                this.max_gas_amount = i;
                this.gas_unit_price = o;
                this.expiration_timestamp_secs = c;
                this.chain_id = d
            }
            serialize(e) {
                this.sender.serialize(e), e.serializeU64(this.sequence_number), this.payload.serialize(e), e.serializeU64(this.max_gas_amount), e.serializeU64(this.gas_unit_price), e.serializeU64(this.expiration_timestamp_secs), this.chain_id.serialize(e)
            }
            static deserialize(e) {
                let t = Te.deserialize(e),
                    n = e.deserializeU64(),
                    i = tn.deserialize(e),
                    o = e.deserializeU64(),
                    c = e.deserializeU64(),
                    d = e.deserializeU64(),
                    p = er.deserialize(e);
                return new Et(t, n, i, o, c, d, p)
            }
        },
        Xt = class {
            constructor(e, t, n) {
                this.code = e;
                this.ty_args = t;
                this.args = n
            }
            serialize(e) {
                e.serializeBytes(this.code), He(this.ty_args, e), He(this.args, e)
            }
            static deserialize(e) {
                let t = e.deserializeBytes(),
                    n = Le(e, ze),
                    i = Le(e, _t);
                return new Xt(t, n, i)
            }
        },
        St = class {
            constructor(e, t, n, i) {
                this.module_name = e;
                this.function_name = t;
                this.ty_args = n;
                this.args = i
            }
            static natural(e, t, n, i) {
                return new St(nt.fromStr(e), new Pe(t), n, i)
            }
            static natual(e, t, n, i) {
                return St.natural(e, t, n, i)
            }
            serialize(e) {
                this.module_name.serialize(e), this.function_name.serialize(e), He(this.ty_args, e), e.serializeU32AsUleb128(this.args.length), this.args.forEach(t => {
                    e.serializeBytes(t)
                })
            }
            static deserialize(e) {
                let t = nt.deserialize(e),
                    n = Pe.deserialize(e),
                    i = Le(e, ze),
                    o = e.deserializeUleb128AsU32(),
                    c = [];
                for (let p = 0; p < o; p += 1) c.push(e.deserializeBytes());
                let d = c;
                return new St(t, n, i, d)
            }
        },
        In = class {
            constructor(e) {
                this.code = e
            }
            serialize(e) {
                e.serializeBytes(this.code)
            }
            static deserialize(e) {
                let t = e.deserializeBytes();
                return new In(t)
            }
        },
        nt = class {
            constructor(e, t) {
                this.address = e;
                this.name = t
            }
            static fromStr(e) {
                let t = e.split("::");
                if (t.length !== 2) throw new Error("Invalid module id.");
                return new nt(Te.fromHex(new G(t[0])), new Pe(t[1]))
            }
            serialize(e) {
                this.address.serialize(e), this.name.serialize(e)
            }
            static deserialize(e) {
                let t = Te.deserialize(e),
                    n = Pe.deserialize(e);
                return new nt(t, n)
            }
        },
        Gi = class {
            serialize(e) {
                throw new Error("Not implemented.")
            }
            static deserialize(e) {
                throw new Error("Not implemented.")
            }
        },
        ji = class {
            serialize(e) {
                throw new Error("Not implmented.")
            }
            static deserialize(e) {
                throw new Error("Not implmented.")
            }
        },
        Ct = class {
            constructor(e, t) {
                this.raw_txn = e;
                this.authenticator = t
            }
            serialize(e) {
                this.raw_txn.serialize(e), this.authenticator.serialize(e)
            }
            static deserialize(e) {
                let t = Et.deserialize(e),
                    n = Kt.deserialize(e);
                return new Ct(t, n)
            }
        },
        Rs = class {
            static deserialize(e) {
                let t = e.deserializeUleb128AsU32();
                switch (t) {
                    case 0:
                        return Jt.load(e);
                    default:
                        throw new Error(`Unknown variant index for RawTransactionWithData: ${t}`)
                }
            }
        },
        Jt = class extends Rs {
            constructor(t, n) {
                super();
                this.raw_txn = t;
                this.secondary_signer_addresses = n
            }
            serialize(t) {
                t.serializeU32AsUleb128(0), this.raw_txn.serialize(t), He(this.secondary_signer_addresses, t)
            }
            static load(t) {
                let n = Et.deserialize(t),
                    i = Le(t, Te);
                return new Jt(n, i)
            }
        },
        tn = class {
            static deserialize(e) {
                let t = e.deserializeUleb128AsU32();
                switch (t) {
                    case 0:
                        return Zt.load(e);
                    case 2:
                        return Qt.load(e);
                    default:
                        throw new Error(`Unknown variant index for TransactionPayload: ${t}`)
                }
            }
        },
        Zt = class extends tn {
            constructor(t) {
                super();
                this.value = t
            }
            serialize(t) {
                t.serializeU32AsUleb128(0), this.value.serialize(t)
            }
            static load(t) {
                let n = Xt.deserialize(t);
                return new Zt(n)
            }
        },
        Qt = class extends tn {
            constructor(t) {
                super();
                this.value = t
            }
            serialize(t) {
                t.serializeU32AsUleb128(2), this.value.serialize(t)
            }
            static load(t) {
                let n = St.deserialize(t);
                return new Qt(n)
            }
        },
        er = class {
            constructor(e) {
                this.value = e
            }
            serialize(e) {
                e.serializeU8(this.value)
            }
            static deserialize(e) {
                let t = e.deserializeU8();
                return new er(t)
            }
        },
        _t = class {
            static deserialize(e) {
                let t = e.deserializeUleb128AsU32();
                switch (t) {
                    case 0:
                        return tr.load(e);
                    case 1:
                        return rr.load(e);
                    case 2:
                        return nr.load(e);
                    case 3:
                        return sr.load(e);
                    case 4:
                        return ir.load(e);
                    case 5:
                        return or.load(e);
                    default:
                        throw new Error(`Unknown variant index for TransactionArgument: ${t}`)
                }
            }
        },
        tr = class extends _t {
            constructor(t) {
                super();
                this.value = t
            }
            serialize(t) {
                t.serializeU32AsUleb128(0), t.serializeU8(this.value)
            }
            static load(t) {
                let n = t.deserializeU8();
                return new tr(n)
            }
        },
        rr = class extends _t {
            constructor(t) {
                super();
                this.value = t
            }
            serialize(t) {
                t.serializeU32AsUleb128(1), t.serializeU64(this.value)
            }
            static load(t) {
                let n = t.deserializeU64();
                return new rr(n)
            }
        },
        nr = class extends _t {
            constructor(t) {
                super();
                this.value = t
            }
            serialize(t) {
                t.serializeU32AsUleb128(2), t.serializeU128(this.value)
            }
            static load(t) {
                let n = t.deserializeU128();
                return new nr(n)
            }
        },
        sr = class extends _t {
            constructor(t) {
                super();
                this.value = t
            }
            serialize(t) {
                t.serializeU32AsUleb128(3), this.value.serialize(t)
            }
            static load(t) {
                let n = Te.deserialize(t);
                return new sr(n)
            }
        },
        ir = class extends _t {
            constructor(t) {
                super();
                this.value = t
            }
            serialize(t) {
                t.serializeU32AsUleb128(4), t.serializeBytes(this.value)
            }
            static load(t) {
                let n = t.deserializeBytes();
                return new ir(n)
            }
        },
        or = class extends _t {
            constructor(t) {
                super();
                this.value = t
            }
            serialize(t) {
                t.serializeU32AsUleb128(5), t.serializeBool(this.value)
            }
            static load(t) {
                let n = t.deserializeBool();
                return new or(n)
            }
        },
        Us = class {
            getHashSalt() {
                let e = Ut.create();
                return e.update("APTOS::Transaction"), e.digest()
            }
            static deserialize(e) {
                let t = e.deserializeUleb128AsU32();
                switch (t) {
                    case 0:
                        return rn.load(e);
                    default:
                        throw new Error(`Unknown variant index for Transaction: ${t}`)
                }
            }
        },
        rn = class extends Us {
            constructor(t) {
                super();
                this.value = t
            }
            hash() {
                let t = Ut.create();
                return t.update(this.getHashSalt()), t.update(tt(this)), t.digest()
            }
            serialize(t) {
                t.serializeU32AsUleb128(0), this.value.serialize(t)
            }
            static load(t) {
                return new rn(Ct.deserialize(t))
            }
        };
    var Hn = class {
            constructor(e) {
                if (e.length !== Hn.LENGTH) throw new Error("Expected a byte array of length 32");
                this.bytes = e
            }
            static fromMultiEd25519PublicKey(e) {
                let t = e.toBytes(),
                    n = new Uint8Array(t.length + 1);
                n.set(t), n.set([Hn.MULTI_ED25519_SCHEME], t.length);
                let i = Ut.create();
                return i.update(n), new Hn(i.digest())
            }
            derivedAddress() {
                return G.fromUint8Array(this.bytes)
            }
        },
        Cn = Hn;
    Cn.LENGTH = 32, Cn.MULTI_ED25519_SCHEME = 1;
    var Ki = class {
        constructor(e, t, n, i, o, c, d) {
            this.accountAddress = e;
            this.moduleName = t;
            this.structName = n;
            this.sequenceNumber = i;
            this.originator = o;
            this.currentAuthKey = c;
            this.newPublicKey = d
        }
        serialize(e) {
            this.accountAddress.serialize(e), e.serializeStr(this.moduleName), e.serializeStr(this.structName), e.serializeU64(this.sequenceNumber), this.originator.serialize(e), this.currentAuthKey.serialize(e), e.serializeBytes(this.newPublicKey)
        }
    };
    var ar = class {
            constructor(e) {
                this.name = e
            }
            serialize(e) {
                e.serializeStr(this.name)
            }
            static deserialize(e) {
                let t = e.deserializeStr();
                return new ar(t)
            }
        },
        cr = class {
            constructor(e, t) {
                this.name = e;
                this.type_tag = t
            }
            serialize(e) {
                e.serializeStr(this.name), this.type_tag.serialize(e)
            }
            static deserialize(e) {
                let t = e.deserializeStr(),
                    n = ze.deserialize(e);
                return new cr(t, n)
            }
        },
        nn = class {
            static deserialize(e) {
                let t = e.deserializeUleb128AsU32();
                switch (t) {
                    case 0:
                        return wr.load(e);
                    case 1:
                        return Ht.load(e);
                    default:
                        throw new Error(`Unknown variant index for TransactionPayload: ${t}`)
                }
            }
        },
        wr = class extends nn {
            constructor(t, n, i, o, c) {
                super();
                this.name = t;
                this.doc = n;
                this.code = i;
                this.ty_args = o;
                this.args = c
            }
            serialize(t) {
                t.serializeU32AsUleb128(0), t.serializeStr(this.name), t.serializeStr(this.doc), t.serializeBytes(this.code), He(this.ty_args, t), He(this.args, t)
            }
            static load(t) {
                let n = t.deserializeStr(),
                    i = t.deserializeStr(),
                    o = t.deserializeBytes(),
                    c = Le(t, ar),
                    d = Le(t, cr);
                return new wr(n, i, o, c, d)
            }
        },
        Ht = class extends nn {
            constructor(t, n, i, o, c) {
                super();
                this.name = t;
                this.module_name = n;
                this.doc = i;
                this.ty_args = o;
                this.args = c
            }
            serialize(t) {
                t.serializeU32AsUleb128(1), t.serializeStr(this.name), this.module_name.serialize(t), t.serializeStr(this.doc), He(this.ty_args, t), He(this.args, t)
            }
            static load(t) {
                let n = t.deserializeStr(),
                    i = nt.deserialize(t),
                    o = t.deserializeStr(),
                    c = Le(t, ar),
                    d = Le(t, cr);
                return new Ht(n, i, o, c, d)
            }
        };

    function Ms(r, e, t) {
        if (!(e != null && e.includes(typeof r))) throw new Error(t || `Invalid arg: ${r} type should be ${e instanceof Array?e.join(" or "):e}`)
    }

    function Tr(r) {
        throw new Error(r)
    }

    function vu(r) {
        return !!r.match(/\s/)
    }

    function Bu(r) {
        return !!r.match(/[_A-Za-z0-9]/g)
    }

    function hp(r, e) {
        let t = r[e];
        if (t === ":") {
            if (r.slice(e, e + 2) === "::") return [
                ["COLON", "::"], 2
            ];
            Tr("Unrecognized token.")
        } else {
            if (t === "<") return [
                ["LT", "<"], 1
            ];
            if (t === ">") return [
                ["GT", ">"], 1
            ];
            if (t === ",") return [
                ["COMMA", ","], 1
            ];
            if (vu(t)) {
                let n = "";
                for (let i = e; i < r.length; i += 1) {
                    let o = r[i];
                    if (vu(o)) n = `${n}${o}`;
                    else break
                }
                return [
                    ["SPACE", n], n.length
                ]
            } else if (Bu(t)) {
                let n = "";
                for (let i = e; i < r.length; i += 1) {
                    let o = r[i];
                    if (Bu(o)) n = `${n}${o}`;
                    else break
                }
                return [
                    ["IDENT", n], n.length
                ]
            }
        }
        throw new Error("Unrecognized token.")
    }

    function yp(r) {
        let e = 0,
            t = [];
        for (; e < r.length;) {
            let [n, i] = hp(r, e);
            n[0] !== "SPACE" && t.push(n), e += i
        }
        return t
    }
    var Ar = class {
        constructor(e) {
            this.tokens = yp(e)
        }
        consume(e) {
            let t = this.tokens.shift();
            (!t || t[1] !== e) && Tr("Invalid type tag.")
        }
        parseCommaList(e, t) {
            let n = [];
            for (this.tokens.length <= 0 && Tr("Invalid type tag."); this.tokens[0][1] !== e && (n.push(this.parseTypeTag()), !(this.tokens.length > 0 && this.tokens[0][1] === e || (this.consume(","), this.tokens.length > 0 && this.tokens[0][1] === e && t)));) this.tokens.length <= 0 && Tr("Invalid type tag.");
            return n
        }
        parseTypeTag() {
            this.tokens.length === 0 && Tr("Invalid type tag.");
            let [e, t] = this.tokens.shift();
            if (t === "u8") return new rt;
            if (t === "u64") return new gt;
            if (t === "u128") return new wt;
            if (t === "bool") return new bt;
            if (t === "address") return new Tt;
            if (t === "vector") {
                this.consume("<");
                let n = this.parseTypeTag();
                return this.consume(">"), new At(n)
            }
            if (e === "IDENT" && (t.startsWith("0x") || t.startsWith("0X"))) {
                let n = t;
                this.consume("::");
                let [i, o] = this.tokens.shift();
                i !== "IDENT" && Tr("Invalid type tag."), this.consume("::");
                let [c, d] = this.tokens.shift();
                c !== "IDENT" && Tr("Invalid type tag.");
                let p = [];
                this.tokens.length > 0 && this.tokens[0][1] === "<" && (this.consume("<"), p = this.parseCommaList(">", !0), this.consume(">"));
                let T = new It(Te.fromHex(n), new Pe(o), new Pe(d), p);
                return new qt(T)
            }
            throw new Error("Invalid type tag.")
        }
    };

    function Ru(r) {
        if (Ms(r, ["boolean", "string"]), typeof r == "boolean") return r;
        if (r === "true") return !0;
        if (r === "false") return !1;
        throw new Error("Invalid boolean string.")
    }

    function Uu(r) {
        if (Ms(r, ["number", "string"]), typeof r == "number") return r;
        let e = Number.parseInt(r, 10);
        if (Number.isNaN(e)) throw new Error("Invalid number string.");
        return e
    }

    function Ps(r) {
        return Ms(r, ["number", "bigint", "string"]), BigInt(r)
    }

    function Vi(r, e, t) {
        if (e instanceof bt) {
            t.serializeBool(Ru(r));
            return
        }
        if (e instanceof rt) {
            t.serializeU8(Uu(r));
            return
        }
        if (e instanceof gt) {
            t.serializeU64(Ps(r));
            return
        }
        if (e instanceof wt) {
            t.serializeU128(Ps(r));
            return
        }
        if (e instanceof Tt) {
            let n;
            if (typeof r == "string" || r instanceof G) n = Te.fromHex(r);
            else if (r instanceof Te) n = r;
            else throw new Error("Invalid account address.");
            n.serialize(t);
            return
        }
        if (e instanceof At) {
            if (e.value instanceof rt) {
                if (r instanceof Uint8Array) {
                    t.serializeBytes(r);
                    return
                }
                if (typeof r == "string") {
                    t.serializeStr(r);
                    return
                }
            }
            if (!(r instanceof Array)) throw new Error("Invalid vector args.");
            t.serializeU32AsUleb128(r.length), r.forEach(n => Vi(n, e.value, t));
            return
        }
        if (e instanceof qt) {
            let {
                address: n,
                module_name: i,
                name: o
            } = e.value;
            if (`${G.fromUint8Array(n.address).toShortString()}::${i.value}::${o.value}` != "0x1::string::String") throw new Error("The only supported struct arg is of type 0x1::string::String");
            Ms(r, ["string"]), t.serializeStr(r);
            return
        }
        throw new Error("Unsupported arg type.")
    }

    function Pu(r, e) {
        if (e instanceof bt) return new or(Ru(r));
        if (e instanceof rt) return new tr(Uu(r));
        if (e instanceof gt) return new rr(Ps(r));
        if (e instanceof wt) return new nr(Ps(r));
        if (e instanceof Tt) {
            let t;
            if (typeof r == "string" || r instanceof G) t = Te.fromHex(r);
            else if (r instanceof Te) t = r;
            else throw new Error("Invalid account address.");
            return new sr(t)
        }
        if (e instanceof At && e.value instanceof rt) {
            if (!(r instanceof Uint8Array)) throw new Error(`${r} should be an instance of Uint8Array`);
            return new ir(r)
        }
        throw new Error("Unknown type for TransactionArgument.")
    }
    var xp = "APTOS::RawTransaction",
        mp = "APTOS::RawTransactionWithData",
        vt = class {
            constructor(e, t) {
                this.rawTxnBuilder = t;
                this.signingFunction = e
            }
            build(e, t, n) {
                if (!this.rawTxnBuilder) throw new Error("this.rawTxnBuilder doesn't exist.");
                return this.rawTxnBuilder.build(e, t, n)
            }
            static getSigningMessage(e) {
                let t = Ut.create();
                if (e instanceof Et) t.update(xp);
                else if (e instanceof Jt) t.update(mp);
                else throw new Error("Unknown transaction type.");
                let n = t.digest(),
                    i = tt(e),
                    o = new Uint8Array(n.length + i.length);
                return o.set(n), o.set(i, n.length), o
            }
        },
        on = class extends vt {
            constructor(t, n, i) {
                super(t, i);
                this.publicKey = n
            }
            rawToSigned(t) {
                let n = vt.getSigningMessage(t),
                    i = this.signingFunction(n),
                    o = new Vt(new Fe(this.publicKey), i);
                return new Ct(t, o)
            }
            sign(t) {
                return tt(this.rawToSigned(t))
            }
        },
        Yi = class extends vt {
            constructor(t, n) {
                super(t);
                this.publicKey = n
            }
            rawToSigned(t) {
                let n = vt.getSigningMessage(t),
                    i = this.signingFunction(n),
                    o = new Yt(this.publicKey, i);
                return new Ct(t, o)
            }
            sign(t) {
                return tt(this.rawToSigned(t))
            }
        },
        lt = class {
            constructor(e, t) {
                this.abiMap = new Map, e.forEach(n => {
                    let i = new Pn(n),
                        o = nn.deserialize(i),
                        c;
                    if (o instanceof Ht) {
                        let d = o,
                            {
                                address: p,
                                name: T
                            } = d.module_name;
                        c = `${G.fromUint8Array(p.address).toShortString()}::${T.value}::${d.name}`
                    } else c = o.name;
                    if (this.abiMap.has(c)) throw new Error("Found conflicting ABI interfaces");
                    this.abiMap.set(c, o)
                }), this.builderConfig = {
                    maxGasAmount: BigInt(ls),
                    expSecFromNow: ds,
                    ...t
                }
            }
            static toBCSArgs(e, t) {
                if (e.length !== t.length) throw new Error("Wrong number of args provided.");
                return t.map((n, i) => {
                    let o = new Se;
                    return Vi(n, e[i].type_tag, o), o.getBytes()
                })
            }
            static toTransactionArguments(e, t) {
                if (e.length !== t.length) throw new Error("Wrong number of args provided.");
                return t.map((n, i) => Pu(n, e[i].type_tag))
            }
            setSequenceNumber(e) {
                this.builderConfig.sequenceNumber = BigInt(e)
            }
            buildTransactionPayload(e, t, n) {
                let i = t.map(d => new Ar(d).parseTypeTag()),
                    o;
                if (!this.abiMap.has(e)) throw new Error(`Cannot find function: ${e}`);
                let c = this.abiMap.get(e);
                if (c instanceof Ht) {
                    let d = c,
                        p = lt.toBCSArgs(d.args, n);
                    o = new Qt(new St(d.module_name, new Pe(d.name), i, p))
                }
                if (c instanceof wr) {
                    let d = c,
                        p = lt.toTransactionArguments(d.args, n);
                    o = new Zt(new Xt(d.code, i, p))
                }
                return o
            }
            build(e, t, n) {
                let {
                    sender: i,
                    sequenceNumber: o,
                    gasUnitPrice: c,
                    maxGasAmount: d,
                    expSecFromNow: p,
                    chainId: T
                } = this.builderConfig;
                if (!c) throw new Error("No gasUnitPrice provided.");
                let y = i instanceof Te ? i : Te.fromHex(i),
                    w = BigInt(Math.floor(Date.now() / 1e3) + Number(p)),
                    v = this.buildTransactionPayload(e, t, n);
                if (v) return new Et(y, BigInt(o), v, BigInt(d), BigInt(c), w, new er(Number(T)));
                throw new Error("Invalid ABI.")
            }
        },
        sn = class {
            constructor(e, t) {
                this.aptosClient = e;
                this.builderConfig = t
            }
            async fetchABI(e) {
                let n = (await this.aptosClient.getAccountModules(e)).map(o => o.abi).flatMap(o => o.exposed_functions.filter(c => c.is_entry).map(c => ({
                        fullName: `${o.address}::${o.name}::${c.name}`,
                        ...c
                    }))),
                    i = new Map;
                return n.forEach(o => {
                    i.set(o.fullName, o)
                }), i
            }
            async build(e, t, n) {
                if (e = (F => F.replace(/^0[xX]0*/g, "0x"))(e), e.split("::").length !== 3) throw new Error("'func' needs to be a fully qualified function name in format <address>::<module>::<function>, e.g. 0x1::coins::transfer");
                let [c, d] = e.split("::"), p = await this.fetchABI(c);
                if (!p.has(e)) throw new Error(`${e} doesn't exist.`);
                let T = p.get(e),
                    w = T.params.filter(F => F !== "signer" && F !== "&signer").map((F, pe) => new cr(`var${pe}`, new Ar(F).parseTypeTag())),
                    v = new Ht(T.name, nt.fromStr(`${c}::${d}`), "", T.generic_type_params.map((F, pe) => new ar(`${pe}`)), w),
                    {
                        sender: U,
                        ...C
                    } = this.builderConfig,
                    W = U instanceof Te ? G.fromUint8Array(U.address) : U,
                    [{
                        sequence_number: Q
                    }, ce, {
                        gas_estimate: we
                    }] = await Promise.all([C != null && C.sequenceNumber ? Promise.resolve({
                        sequence_number: C == null ? void 0 : C.sequenceNumber
                    }) : this.aptosClient.getAccount(W), C != null && C.chainId ? Promise.resolve(C == null ? void 0 : C.chainId) : this.aptosClient.getChainId(), C != null && C.gasUnitPrice ? Promise.resolve({
                        gas_estimate: C == null ? void 0 : C.gasUnitPrice
                    }) : this.aptosClient.estimateGasPrice()]);
                return new lt([tt(v)], {
                    sender: U,
                    sequenceNumber: Q,
                    chainId: ce,
                    gasUnitPrice: BigInt(we),
                    ...C
                }).build(e, t, n)
            }
        };
    me([xa(10 * 60 * 1e3)], sn.prototype, "fetchABI", 1);
    var an = class {
            constructor(e, t, n = !1) {
                if (!e) throw new Error("Node URL cannot be empty.");
                let i = t == null ? {} : {
                    ...t
                };
                n ? i.BASE = e : i.BASE = ha(e), (t == null ? void 0 : t.WITH_CREDENTIALS) === !1 ? i.WITH_CREDENTIALS = !1 : i.WITH_CREDENTIALS = !0, this.client = new Kr(i)
            }
            async getAccount(e) {
                return this.client.accounts.getAccount(G.ensure(e).hex())
            }
            async getAccountTransactions(e, t) {
                var n;
                return this.client.transactions.getAccountTransactions(G.ensure(e).hex(), (n = t == null ? void 0 : t.start) == null ? void 0 : n.toString(), t == null ? void 0 : t.limit)
            }
            async getAccountModules(e, t) {
                var n;
                return this.client.accounts.getAccountModules(G.ensure(e).hex(), (n = t == null ? void 0 : t.ledgerVersion) == null ? void 0 : n.toString())
            }
            async getAccountModule(e, t, n) {
                var i;
                return this.client.accounts.getAccountModule(G.ensure(e).hex(), t, (i = n == null ? void 0 : n.ledgerVersion) == null ? void 0 : i.toString())
            }
            async getAccountResources(e, t) {
                var n;
                return this.client.accounts.getAccountResources(G.ensure(e).hex(), (n = t == null ? void 0 : t.ledgerVersion) == null ? void 0 : n.toString())
            }
            async getAccountResource(e, t, n) {
                var i;
                return this.client.accounts.getAccountResource(G.ensure(e).hex(), t, (i = n == null ? void 0 : n.ledgerVersion) == null ? void 0 : i.toString())
            }
            static generateBCSTransaction(e, t) {
                return new on(i => {
                    let o = e.signBuffer(i);
                    return new be.Ed25519Signature(o.toUint8Array())
                }, e.pubKey().toUint8Array()).sign(t)
            }
            static generateBCSSimulation(e, t) {
                return new on(i => {
                    let o = new Uint8Array(64);
                    return new be.Ed25519Signature(o)
                }, e.pubKey().toUint8Array()).sign(t)
            }
            async generateTransaction(e, t, n) {
                let i = {
                    sender: e
                };
                if (n != null && n.sequence_number && (i.sequenceNumber = n.sequence_number), n != null && n.gas_unit_price && (i.gasUnitPrice = n.gas_unit_price), n != null && n.max_gas_amount && (i.maxGasAmount = n.max_gas_amount), n != null && n.expiration_timestamp_secs) {
                    let c = Number.parseInt(n.expiration_timestamp_secs, 10);
                    i.expSecFromNow = c - Math.floor(Date.now() / 1e3)
                }
                return new sn(this, i).build(t.function, t.type_arguments, t.arguments)
            }
            async signTransaction(e, t) {
                return Promise.resolve(an.generateBCSTransaction(e, t))
            }
            async getEventsByEventKey(e) {
                return this.client.events.getEventsByEventKey(e)
            }
            async getEventsByCreationNumber(e, t, n) {
                var i;
                return this.client.events.getEventsByCreationNumber(G.ensure(e).hex(), t.toString(), (i = n == null ? void 0 : n.start) == null ? void 0 : i.toString(), n == null ? void 0 : n.limit)
            }
            async getEventsByEventHandle(e, t, n, i) {
                var o;
                return this.client.events.getEventsByEventHandle(G.ensure(e).hex(), t, n, (o = i == null ? void 0 : i.start) == null ? void 0 : o.toString(), i == null ? void 0 : i.limit)
            }
            async submitTransaction(e) {
                return this.submitSignedBCSTransaction(e)
            }
            async simulateTransaction(e, t, n) {
                let i = an.generateBCSSimulation(e, t);
                return this.submitBCSSimulation(i, n)
            }
            async submitSignedBCSTransaction(e) {
                return this.client.request.request({
                    url: "/transactions",
                    method: "POST",
                    body: e,
                    mediaType: "application/x.aptos.signed_transaction+bcs"
                })
            }
            async submitBCSSimulation(e, t) {
                var i, o;
                let n = {
                    estimate_gas_unit_price: (i = t == null ? void 0 : t.estimateGasUnitPrice) != null ? i : !1,
                    estimate_max_gas_amount: (o = t == null ? void 0 : t.estimateMaxGasAmount) != null ? o : !1
                };
                return this.client.request.request({
                    url: "/transactions/simulate",
                    query: n,
                    method: "POST",
                    body: e,
                    mediaType: "application/x.aptos.signed_transaction+bcs"
                })
            }
            async getTransactions(e) {
                var t;
                return this.client.transactions.getTransactions((t = e == null ? void 0 : e.start) == null ? void 0 : t.toString(), e == null ? void 0 : e.limit)
            }
            async getTransactionByHash(e) {
                return this.client.transactions.getTransactionByHash(e)
            }
            async getTransactionByVersion(e) {
                return this.client.transactions.getTransactionByVersion(e.toString())
            }
            async transactionPending(e) {
                try {
                    return (await this.client.transactions.getTransactionByHash(e)).type === "pending_transaction"
                } catch (t) {
                    if ((t == null ? void 0 : t.status) === 404) return !0;
                    throw t
                }
            }
            async waitForTransactionWithResult(e, t) {
                var p, T;
                let n = (p = t == null ? void 0 : t.timeoutSecs) != null ? p : ps,
                    i = (T = t == null ? void 0 : t.checkSuccess) != null ? T : !1,
                    o = !0,
                    c = 0,
                    d;
                for (; o && !(c >= n);) {
                    try {
                        if (d = await this.client.transactions.getTransactionByHash(e), o = d.type === "pending_transaction", !o) break
                    } catch (y) {
                        let w = y instanceof mt,
                            v = w && y.status !== 404 && y.status >= 400 && y.status < 500;
                        if (!w || v) throw y
                    }
                    await pa(1e3), c += 1
                }
                if (o) throw new Is(`Waiting for transaction ${e} timed out after ${n} seconds`, d);
                if (!i) return d;
                if (!(d != null && d.success)) throw new Cs(`Transaction ${d.hash} committed to the blockchain but execution failed`, d);
                return d
            }
            async waitForTransaction(e, t) {
                await this.waitForTransactionWithResult(e, t)
            }
            async getLedgerInfo() {
                return this.client.general.getLedgerInfo()
            }
            async getChainId() {
                return (await this.getLedgerInfo()).chain_id
            }
            async getTableItem(e, t, n) {
                var o;
                return await this.client.tables.getTableItem(e, t, (o = n == null ? void 0 : n.ledgerVersion) == null ? void 0 : o.toString())
            }
            async generateRawTransaction(e, t, n) {
                let [{
                    sequence_number: i
                }, o, {
                    gas_estimate: c
                }] = await Promise.all([this.getAccount(e), this.getChainId(), n != null && n.gasUnitPrice ? Promise.resolve({
                    gas_estimate: n.gasUnitPrice
                }) : this.estimateGasPrice()]), {
                    maxGasAmount: d,
                    gasUnitPrice: p,
                    expireTimestamp: T
                } = {
                    maxGasAmount: BigInt(ls),
                    gasUnitPrice: BigInt(c),
                    expireTimestamp: BigInt(Math.floor(Date.now() / 1e3) + ds),
                    ...n
                };
                return new be.RawTransaction(be.AccountAddress.fromHex(e), BigInt(i), t, d, p, T, new be.ChainId(o))
            }
            async generateSignSubmitTransaction(e, t, n) {
                let i = await this.generateRawTransaction(e.address(), t, n),
                    o = an.generateBCSTransaction(e, i);
                return (await this.submitSignedBCSTransaction(o)).hash
            }
            async publishPackage(e, t, n, i) {
                let o = new Se;
                He(n, o);
                let c = new be.TransactionPayloadEntryFunction(be.EntryFunction.natural("0x1::code", "publish_package_txn", [], [mr(t), o.getBytes()]));
                return this.generateSignSubmitTransaction(e, c, i)
            }
            async generateSignSubmitWaitForTransaction(e, t, n) {
                let i = await this.generateSignSubmitTransaction(e, t, n);
                return this.waitForTransactionWithResult(i, n)
            }
            async estimateGasPrice() {
                return this.client.transactions.estimateGasPrice()
            }
            async estimateMaxGasAmount(e) {
                let t = `0x1::coin::CoinStore<${An}>`,
                    [{
                        gas_estimate: n
                    }, i] = await Promise.all([this.estimateGasPrice(), this.getAccountResources(e)]),
                    o = i.find(d => d.type === t);
                return BigInt(o.data.coin.value) / BigInt(n)
            }
            async rotateAuthKeyEd25519(e, t, n) {
                let {
                    sequence_number: i,
                    authentication_key: o
                } = await this.getAccount(e.address()), c = new pr(t), d = new be.RotationProofChallenge(be.AccountAddress.CORE_CODE_ADDRESS, "account", "RotationProofChallenge", BigInt(i), be.AccountAddress.fromHex(e.address()), new be.AccountAddress(new G(o).toUint8Array()), c.pubKey().toUint8Array()), p = G.fromUint8Array(tt(d)), T = e.signHexString(p), y = c.signHexString(p), w = new be.TransactionPayloadEntryFunction(be.EntryFunction.natural("0x1::account", "rotate_authentication_key", [], [vs(0), mr(e.pubKey().toUint8Array()), vs(0), mr(c.pubKey().toUint8Array()), mr(T.toUint8Array()), mr(y.toUint8Array())])), v = await this.generateRawTransaction(e.address(), w, n), U = an.generateBCSTransaction(e, v);
                return this.submitSignedBCSTransaction(U)
            }
            async lookupOriginalAddress(e) {
                let t = await this.getAccountResource("0x1", "0x1::account::OriginatingAddress"),
                    {
                        address_map: {
                            handle: n
                        }
                    } = t.data,
                    i = await this.getTableItem(n, {
                        key_type: "address",
                        value_type: "address",
                        key: G.ensure(e).hex()
                    });
                return new G(i)
            }
            async getBlockByHeight(e, t) {
                return this.client.blocks.getBlockByHeight(e, t)
            }
            async getBlockByVersion(e, t) {
                return this.client.blocks.getBlockByVersion(e, t)
            }
            clearCache(e) {
                ma(e)
            }
        },
        Ae = an;
    me([Me], Ae.prototype, "getAccount", 1), me([Me], Ae.prototype, "getAccountTransactions", 1), me([Me], Ae.prototype, "getAccountModules", 1), me([Me], Ae.prototype, "getAccountModule", 1), me([Me], Ae.prototype, "getAccountResources", 1), me([Me], Ae.prototype, "getAccountResource", 1), me([Me], Ae.prototype, "getEventsByEventKey", 1), me([Me], Ae.prototype, "getEventsByCreationNumber", 1), me([Me], Ae.prototype, "getEventsByEventHandle", 1), me([Me], Ae.prototype, "submitSignedBCSTransaction", 1), me([Me], Ae.prototype, "submitBCSSimulation", 1), me([Me], Ae.prototype, "getTransactions", 1), me([Me], Ae.prototype, "getTransactionByHash", 1), me([Me], Ae.prototype, "getTransactionByVersion", 1), me([Me], Ae.prototype, "getLedgerInfo", 1), me([qr()], Ae.prototype, "getChainId", 1), me([Me], Ae.prototype, "getTableItem", 1), me([Me, qr({
        ttlMs: 5 * 60 * 1e3,
        tags: ["gas_estimates"]
    })], Ae.prototype, "estimateGasPrice", 1), me([Me], Ae.prototype, "estimateMaxGasAmount", 1), me([Me], Ae.prototype, "getBlockByHeight", 1), me([Me], Ae.prototype, "getBlockByVersion", 1);
    var qs = class extends Error {
            constructor(t, n, i, o) {
                super(n);
                this.status = t;
                this.message = n;
                this.errorCode = i;
                this.vmErrorCode = o
            }
        },
        Is = class extends Error {
            constructor(t, n) {
                super(t);
                this.lastSubmittedTransaction = n
            }
        },
        Cs = class extends Error {
            constructor(t, n) {
                super(t);
                this.transaction = n
            }
        };

    function Me(r, e, t) {
        let n = t.value;
        return t.value = async function (...o) {
            var c, d;
            try {
                return await n.apply(this, [...o])
            } catch (p) {
                throw p instanceof mt ? new qs(p.status, JSON.stringify({
                    message: p.message,
                    ...p.body
                }), (c = p.body) == null ? void 0 : c.error_code, (d = p.body) == null ? void 0 : d.vm_error_code) : p
            }
        }, t
    }
    var Mu = ["01186372656174655F636F6C6C656374696F6E5F736372697074000000000000000000000000000000000000000000000000000000000000000305746F6B656E3020637265617465206120656D70747920746F6B656E20636F6C6C656374696F6E207769746820706172616D65746572730005046E616D6507000000000000000000000000000000000000000000000000000000000000000106737472696E6706537472696E67000B6465736372697074696F6E07000000000000000000000000000000000000000000000000000000000000000106737472696E6706537472696E67000375726907000000000000000000000000000000000000000000000000000000000000000106737472696E6706537472696E6700076D6178696D756D020E6D75746174655F73657474696E670600", "01136372656174655F746F6B656E5F736372697074000000000000000000000000000000000000000000000000000000000000000305746F6B656E1D2063726561746520746F6B656E20776974682072617720696E70757473000D0A636F6C6C656374696F6E07000000000000000000000000000000000000000000000000000000000000000106737472696E6706537472696E6700046E616D6507000000000000000000000000000000000000000000000000000000000000000106737472696E6706537472696E67000B6465736372697074696F6E07000000000000000000000000000000000000000000000000000000000000000106737472696E6706537472696E67000762616C616E636502076D6178696D756D020375726907000000000000000000000000000000000000000000000000000000000000000106737472696E6706537472696E670015726F79616C74795F70617965655F61646472657373041A726F79616C74795F706F696E74735F64656E6F6D696E61746F720218726F79616C74795F706F696E74735F6E756D657261746F72020E6D75746174655F73657474696E6706000D70726F70657274795F6B6579730607000000000000000000000000000000000000000000000000000000000000000106737472696E6706537472696E67000F70726F70657274795F76616C7565730606010E70726F70657274795F74797065730607000000000000000000000000000000000000000000000000000000000000000106737472696E6706537472696E6700", "01166469726563745f7472616e736665725f736372697074000000000000000000000000000000000000000000000000000000000000000305746f6b656e0000051063726561746f72735f61646472657373040a636f6c6c656374696f6e07000000000000000000000000000000000000000000000000000000000000000106737472696e6706537472696e6700046e616d6507000000000000000000000000000000000000000000000000000000000000000106737472696e6706537472696e67001070726f70657274795f76657273696f6e0206616d6f756e7402", "010C6F666665725F73637269707400000000000000000000000000000000000000000000000000000000000000030F746F6B656E5F7472616E7366657273000006087265636569766572040763726561746F72040A636F6C6C656374696F6E07000000000000000000000000000000000000000000000000000000000000000106737472696E6706537472696E6700046E616D6507000000000000000000000000000000000000000000000000000000000000000106737472696E6706537472696E67001070726F70657274795F76657273696F6E0206616D6F756E7402", "010C636C61696D5F73637269707400000000000000000000000000000000000000000000000000000000000000030F746F6B656E5F7472616E73666572730000050673656E646572040763726561746F72040A636F6C6C656374696F6E07000000000000000000000000000000000000000000000000000000000000000106737472696E6706537472696E6700046E616D6507000000000000000000000000000000000000000000000000000000000000000106737472696E6706537472696E67001070726F70657274795F76657273696F6E02", "011363616E63656C5F6F666665725F73637269707400000000000000000000000000000000000000000000000000000000000000030F746F6B656E5F7472616E7366657273000005087265636569766572040763726561746F72040A636F6C6C656374696F6E07000000000000000000000000000000000000000000000000000000000000000106737472696E6706537472696E6700046E616D6507000000000000000000000000000000000000000000000000000000000000000106737472696E6706537472696E67001070726F70657274795F76657273696F6E02"],
        qu = ["01087472616E73666572000000000000000000000000000000000000000000000000000000000000000104636F696E3C205472616E73666572732060616D6F756E7460206F6620636F696E732060436F696E54797065602066726F6D206066726F6D6020746F2060746F602E0109636F696E5F747970650202746F0406616D6F756E7402"];
    var Xi = class {
        constructor(e) {
            this.aptosClient = e, this.transactionBuilder = new lt(qu.map(t => new G(t).toUint8Array()))
        }
        async transfer(e, t, n, i) {
            var d;
            let o = (d = i == null ? void 0 : i.coinType) != null ? d : An,
                c = this.transactionBuilder.buildTransactionPayload("0x1::coin::transfer", [o], [t.address(), n]);
            return this.aptosClient.generateSignSubmitTransaction(e, c, i)
        }
        async checkBalance(e, t) {
            var d;
            let i = `0x1::coin::CoinStore<${(d=t==null?void 0:t.coinType)!=null?d:An}>`,
                c = (await this.aptosClient.getAccountResources(e.address())).find(p => p.type === i);
            return BigInt(c.data.coin.value)
        }
    };
    var Ji = class extends Ae {
        constructor(t, n, i) {
            var o, c, d;
            super(t, i);
            if (!n) throw new Error("Faucet URL cannot be empty.");
            this.faucetRequester = new Nr({
                BASE: n,
                VERSION: (o = i == null ? void 0 : i.VERSION) != null ? o : "0.1.0",
                WITH_CREDENTIALS: (c = i == null ? void 0 : i.WITH_CREDENTIALS) != null ? c : !1,
                CREDENTIALS: (d = i == null ? void 0 : i.CREDENTIALS) != null ? d : "include",
                TOKEN: i == null ? void 0 : i.TOKEN,
                USERNAME: i == null ? void 0 : i.USERNAME,
                PASSWORD: i == null ? void 0 : i.PASSWORD,
                HEADERS: i == null ? void 0 : i.HEADERS,
                ENCODE_PATH: i == null ? void 0 : i.ENCODE_PATH
            })
        }
        async fundAccount(t, n, i = ps) {
            let o = await this.faucetRequester.request({
                    method: "POST",
                    url: "/mint",
                    query: {
                        address: G.ensure(t).noPrefix(),
                        amount: n
                    }
                }),
                c = [];
            for (let d = 0; d < o.length; d += 1) {
                let p = o[d];
                c.push(this.waitForTransaction(p, {
                    timeoutSecs: i
                }))
            }
            return await Promise.all(c), o
        }
    };
    var Zi = class {
        constructor(e) {
            this.aptosClient = e, this.transactionBuilder = new lt(Mu.map(t => new G(t).toUint8Array()))
        }
        async createCollection(e, t, n, i, o = Vr, c) {
            let d = this.transactionBuilder.buildTransactionPayload("0x3::token::create_collection_script", [], [t, n, i, o, [!1, !1, !1]]);
            return this.aptosClient.generateSignSubmitTransaction(e, d, c)
        }
        async createToken(e, t, n, i, o, c, d = Vr, p = e.address(), T = 0, y = 0, w = [], v = [], U = [], C) {
            let W = this.transactionBuilder.buildTransactionPayload("0x3::token::create_token_script", [], [t, n, i, o, d, c, p, T, y, [!1, !1, !1, !1, !1], w, v, U]);
            return this.aptosClient.generateSignSubmitTransaction(e, W, C)
        }
        async offerToken(e, t, n, i, o, c, d = 0, p) {
            let T = this.transactionBuilder.buildTransactionPayload("0x3::token_transfers::offer_script", [], [t, n, i, o, d, c]);
            return this.aptosClient.generateSignSubmitTransaction(e, T, p)
        }
        async claimToken(e, t, n, i, o, c = 0, d) {
            let p = this.transactionBuilder.buildTransactionPayload("0x3::token_transfers::claim_script", [], [t, n, i, o, c]);
            return this.aptosClient.generateSignSubmitTransaction(e, p, d)
        }
        async cancelTokenOffer(e, t, n, i, o, c = 0, d) {
            let p = this.transactionBuilder.buildTransactionPayload("0x3::token_transfers::cancel_offer_script", [], [t, n, i, o, c]);
            return this.aptosClient.generateSignSubmitTransaction(e, p, d)
        }
        async directTransferToken(e, t, n, i, o, c, d = 0, p) {
            let T = this.transactionBuilder.buildTransactionPayload("0x3::token::direct_transfer_script", [], [n, i, o, d, c]),
                y = await this.aptosClient.generateRawTransaction(e.address(), T, p),
                w = new be.MultiAgentRawTransaction(y, [be.AccountAddress.fromHex(t.address())]),
                v = new be.Ed25519Signature(e.signBuffer(vt.getSigningMessage(w)).toUint8Array()),
                U = new be.AccountAuthenticatorEd25519(new be.Ed25519PublicKey(e.signingKey.publicKey), v),
                C = new be.Ed25519Signature(t.signBuffer(vt.getSigningMessage(w)).toUint8Array()),
                W = new be.AccountAuthenticatorEd25519(new be.Ed25519PublicKey(t.signingKey.publicKey), C),
                Q = new be.TransactionAuthenticatorMultiAgent(U, [be.AccountAddress.fromHex(t.address())], [W]),
                ce = tt(new be.SignedTransaction(y, Q));
            return (await this.aptosClient.submitSignedBCSTransaction(ce)).hash
        }
        async getCollectionData(e, t) {
            let i = (await this.aptosClient.getAccountResources(e)).find(p => p.type === "0x3::token::Collections"),
                {
                    handle: o
                } = i.data.collection_data,
                c = {
                    key_type: "0x1::string::String",
                    value_type: "0x3::token::CollectionData",
                    key: t
                };
            return await this.aptosClient.getTableItem(o, c)
        }
        async getTokenData(e, t, n) {
            let i = e instanceof G ? e.hex() : e,
                o = await this.aptosClient.getAccountResource(i, "0x3::token::Collections"),
                {
                    handle: c
                } = o.data.token_data,
                p = {
                    key_type: "0x3::token::TokenDataId",
                    value_type: "0x3::token::TokenData",
                    key: {
                        creator: i,
                        collection: t,
                        name: n
                    }
                };
            return this.aptosClient.getTableItem(c, p)
        }
        async getToken(e, t, n, i = "0") {
            let o = {
                creator: e instanceof G ? e.hex() : e,
                collection: t,
                name: n
            };
            return this.getTokenForAccount(e, {
                token_data_id: o,
                property_version: i
            })
        }
        async getTokenForAccount(e, t) {
            let n = await this.aptosClient.getAccountResource(e instanceof G ? e.hex() : e, "0x3::token::TokenStore"),
                {
                    handle: i
                } = n.data.tokens,
                o = {
                    key_type: "0x3::token::TokenId",
                    value_type: "0x3::token::Token",
                    key: t
                };
            try {
                return await this.aptosClient.getTableItem(i, o)
            } catch (c) {
                return c.status === 404 ? {
                    id: t,
                    amount: "0"
                } : c
            }
        }
    };
    var Qi = {};
    return Wu(bp);
})();
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
/*! scure-base - MIT License (c) 2022 Paul Miller (paulmillr.com) */
/*! scure-bip39 - MIT License (c) 2022 Patricio Palladino, Paul Miller (paulmillr.com) */
//# sourceMappingURL=index.global.js.map