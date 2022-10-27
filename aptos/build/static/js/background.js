/*! For license information please see background.js.LICENSE.txt */
(() => {
    var e = {
            71537: (e, t) => {
                "use strict";

                function r(e) {
                    if (!Number.isSafeInteger(e) || e < 0) throw new Error("Wrong positive integer: ".concat(e))
                }

                function n(e) {
                    if ("boolean" !== typeof e) throw new Error("Expected boolean, not ".concat(e))
                }

                function i(e) {
                    if (!(e instanceof Uint8Array)) throw new TypeError("Expected Uint8Array");
                    for (var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++) r[n - 1] = arguments[n];
                    if (r.length > 0 && !r.includes(e.length)) throw new TypeError("Expected Uint8Array of length ".concat(r, ", not of length=").concat(e.length))
                }

                function s(e) {
                    if ("function" !== typeof e || "function" !== typeof e.create) throw new Error("Hash should be wrapped by utils.wrapConstructor");
                    r(e.outputLen), r(e.blockLen)
                }

                function o(e) {
                    let t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                    if (e.destroyed) throw new Error("Hash instance has been destroyed");
                    if (t && e.finished) throw new Error("Hash#digest() has already been called")
                }

                function a(e, t) {
                    i(e);
                    const r = t.outputLen;
                    if (e.length < r) throw new Error("digestInto() expects output buffer of length at least ".concat(r))
                }
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.output = t.exists = t.hash = t.bytes = t.bool = t.number = void 0, t.number = r, t.bool = n, t.bytes = i, t.hash = s, t.exists = o, t.output = a;
                const c = {
                    number: r,
                    bool: n,
                    bytes: i,
                    hash: s,
                    exists: o,
                    output: a
                };
                t.default = c
            },
            32649: (e, t, r) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.SHA2 = void 0;
                const n = r(71537),
                    i = r(3265);
                class s extends i.Hash {
                    constructor(e, t, r, n) {
                        super(), this.blockLen = e, this.outputLen = t, this.padOffset = r, this.isLE = n, this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.buffer = new Uint8Array(e), this.view = (0, i.createView)(this.buffer)
                    }
                    update(e) {
                        n.default.exists(this);
                        const {
                            view: t,
                            buffer: r,
                            blockLen: s
                        } = this, o = (e = (0, i.toBytes)(e)).length;
                        for (let n = 0; n < o;) {
                            const a = Math.min(s - this.pos, o - n);
                            if (a !== s) r.set(e.subarray(n, n + a), this.pos), this.pos += a, n += a, this.pos === s && (this.process(t, 0), this.pos = 0);
                            else {
                                const t = (0, i.createView)(e);
                                for (; s <= o - n; n += s) this.process(t, n)
                            }
                        }
                        return this.length += e.length, this.roundClean(), this
                    }
                    digestInto(e) {
                        n.default.exists(this), n.default.output(e, this), this.finished = !0;
                        const {
                            buffer: t,
                            view: r,
                            blockLen: s,
                            isLE: o
                        } = this;
                        let {
                            pos: a
                        } = this;
                        t[a++] = 128, this.buffer.subarray(a).fill(0), this.padOffset > s - a && (this.process(r, 0), a = 0);
                        for (let n = a; n < s; n++) t[n] = 0;
                        ! function (e, t, r, n) {
                            if ("function" === typeof e.setBigUint64) return e.setBigUint64(t, r, n);
                            const i = BigInt(32),
                                s = BigInt(4294967295),
                                o = Number(r >> i & s),
                                a = Number(r & s),
                                c = n ? 4 : 0,
                                u = n ? 0 : 4;
                            e.setUint32(t + c, o, n), e.setUint32(t + u, a, n)
                        }(r, s - 8, BigInt(8 * this.length), o), this.process(r, 0);
                        const c = (0, i.createView)(e);
                        this.get().forEach(((e, t) => c.setUint32(4 * t, e, o)))
                    }
                    digest() {
                        const {
                            buffer: e,
                            outputLen: t
                        } = this;
                        this.digestInto(e);
                        const r = e.slice(0, t);
                        return this.destroy(), r
                    }
                    _cloneInto(e) {
                        e || (e = new this.constructor), e.set(...this.get());
                        const {
                            blockLen: t,
                            buffer: r,
                            length: n,
                            finished: i,
                            destroyed: s,
                            pos: o
                        } = this;
                        return e.length = n, e.pos = o, e.finished = i, e.destroyed = s, n % t && e.buffer.set(r), e
                    }
                }
                t.SHA2 = s
            },
            14982: (e, t) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.add = t.toBig = t.split = t.fromBig = void 0;
                const r = BigInt(2 ** 32 - 1),
                    n = BigInt(32);

                function i(e) {
                    let t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                    return t ? {
                        h: Number(e & r),
                        l: Number(e >> n & r)
                    } : {
                        h: 0 | Number(e >> n & r),
                        l: 0 | Number(e & r)
                    }
                }

                function s(e) {
                    let t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                        r = new Uint32Array(e.length),
                        n = new Uint32Array(e.length);
                    for (let s = 0; s < e.length; s++) {
                        const {
                            h: o,
                            l: a
                        } = i(e[s], t);
                        [r[s], n[s]] = [o, a]
                    }
                    return [r, n]
                }
                t.fromBig = i, t.split = s;
                t.toBig = (e, t) => BigInt(e >>> 0) << n | BigInt(t >>> 0);

                function o(e, t, r, n) {
                    const i = (t >>> 0) + (n >>> 0);
                    return {
                        h: e + r + (i / 2 ** 32 | 0) | 0,
                        l: 0 | i
                    }
                }
                t.add = o;
                const a = {
                    fromBig: i,
                    split: s,
                    toBig: t.toBig,
                    shrSH: (e, t, r) => e >>> r,
                    shrSL: (e, t, r) => e << 32 - r | t >>> r,
                    rotrSH: (e, t, r) => e >>> r | t << 32 - r,
                    rotrSL: (e, t, r) => e << 32 - r | t >>> r,
                    rotrBH: (e, t, r) => e << 64 - r | t >>> r - 32,
                    rotrBL: (e, t, r) => e >>> r - 32 | t << 64 - r,
                    rotr32H: (e, t) => t,
                    rotr32L: (e, t) => e,
                    rotlSH: (e, t, r) => e << r | t >>> 32 - r,
                    rotlSL: (e, t, r) => t << r | e >>> 32 - r,
                    rotlBH: (e, t, r) => t << r - 32 | e >>> 64 - r,
                    rotlBL: (e, t, r) => e << r - 32 | t >>> 64 - r,
                    add: o,
                    add3L: (e, t, r) => (e >>> 0) + (t >>> 0) + (r >>> 0),
                    add3H: (e, t, r, n) => t + r + n + (e / 2 ** 32 | 0) | 0,
                    add4L: (e, t, r, n) => (e >>> 0) + (t >>> 0) + (r >>> 0) + (n >>> 0),
                    add4H: (e, t, r, n, i) => t + r + n + i + (e / 2 ** 32 | 0) | 0,
                    add5H: (e, t, r, n, i, s) => t + r + n + i + s + (e / 2 ** 32 | 0) | 0,
                    add5L: (e, t, r, n, i) => (e >>> 0) + (t >>> 0) + (r >>> 0) + (n >>> 0) + (i >>> 0)
                };
                t.default = a
            },
            86184: (e, t) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.crypto = void 0, t.crypto = {
                    node: void 0,
                    web: "object" === typeof self && "crypto" in self ? self.crypto : void 0
                }
            },
            91091: (e, t, r) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.hmac = void 0;
                const n = r(71537),
                    i = r(3265);
                class s extends i.Hash {
                    constructor(e, t) {
                        super(), this.finished = !1, this.destroyed = !1, n.default.hash(e);
                        const r = (0, i.toBytes)(t);
                        if (this.iHash = e.create(), !(this.iHash instanceof i.Hash)) throw new TypeError("Expected instance of class which extends utils.Hash");
                        const s = this.blockLen = this.iHash.blockLen;
                        this.outputLen = this.iHash.outputLen;
                        const o = new Uint8Array(s);
                        o.set(r.length > this.iHash.blockLen ? e.create().update(r).digest() : r);
                        for (let n = 0; n < o.length; n++) o[n] ^= 54;
                        this.iHash.update(o), this.oHash = e.create();
                        for (let n = 0; n < o.length; n++) o[n] ^= 106;
                        this.oHash.update(o), o.fill(0)
                    }
                    update(e) {
                        return n.default.exists(this), this.iHash.update(e), this
                    }
                    digestInto(e) {
                        n.default.exists(this), n.default.bytes(e, this.outputLen), this.finished = !0, this.iHash.digestInto(e), this.oHash.update(e), this.oHash.digestInto(e), this.destroy()
                    }
                    digest() {
                        const e = new Uint8Array(this.oHash.outputLen);
                        return this.digestInto(e), e
                    }
                    _cloneInto(e) {
                        e || (e = Object.create(Object.getPrototypeOf(this), {}));
                        const {
                            oHash: t,
                            iHash: r,
                            finished: n,
                            destroyed: i,
                            blockLen: s,
                            outputLen: o
                        } = this;
                        return e.finished = n, e.destroyed = i, e.blockLen = s, e.outputLen = o, e.oHash = t._cloneInto(e.oHash), e.iHash = r._cloneInto(e.iHash), e
                    }
                    destroy() {
                        this.destroyed = !0, this.oHash.destroy(), this.iHash.destroy()
                    }
                }
                t.hmac = (e, t, r) => new s(e, t).update(r).digest(), t.hmac.create = (e, t) => new s(e, t)
            },
            78156: (e, t, r) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.pbkdf2Async = t.pbkdf2 = void 0;
                const n = r(71537),
                    i = r(91091),
                    s = r(3265);

                function o(e, t, r, o) {
                    n.default.hash(e);
                    const a = (0, s.checkOpts)({
                            dkLen: 32,
                            asyncTick: 10
                        }, o),
                        {
                            c: c,
                            dkLen: u,
                            asyncTick: l
                        } = a;
                    if (n.default.number(c), n.default.number(u), n.default.number(l), c < 1) throw new Error("PBKDF2: iterations (c) should be >= 1");
                    const h = (0, s.toBytes)(t),
                        d = (0, s.toBytes)(r),
                        f = new Uint8Array(u),
                        p = i.hmac.create(e, h),
                        y = p._cloneInto().update(d);
                    return {
                        c: c,
                        dkLen: u,
                        asyncTick: l,
                        DK: f,
                        PRF: p,
                        PRFSalt: y
                    }
                }

                function a(e, t, r, n, i) {
                    return e.destroy(), t.destroy(), n && n.destroy(), i.fill(0), r
                }
                t.pbkdf2 = function (e, t, r, n) {
                    const {
                        c: i,
                        dkLen: c,
                        DK: u,
                        PRF: l,
                        PRFSalt: h
                    } = o(e, t, r, n);
                    let d;
                    const f = new Uint8Array(4),
                        p = (0, s.createView)(f),
                        y = new Uint8Array(l.outputLen);
                    for (let s = 1, o = 0; o < c; s++, o += l.outputLen) {
                        const e = u.subarray(o, o + l.outputLen);
                        p.setInt32(0, s, !1), (d = h._cloneInto(d)).update(f).digestInto(y), e.set(y.subarray(0, e.length));
                        for (let t = 1; t < i; t++) {
                            l._cloneInto(d).update(y).digestInto(y);
                            for (let t = 0; t < e.length; t++) e[t] ^= y[t]
                        }
                    }
                    return a(l, h, u, d, y)
                }, t.pbkdf2Async = async function (e, t, r, n) {
                    const {
                        c: i,
                        dkLen: c,
                        asyncTick: u,
                        DK: l,
                        PRF: h,
                        PRFSalt: d
                    } = o(e, t, r, n);
                    let f;
                    const p = new Uint8Array(4),
                        y = (0, s.createView)(p),
                        g = new Uint8Array(h.outputLen);
                    for (let o = 1, a = 0; a < c; o++, a += h.outputLen) {
                        const e = l.subarray(a, a + h.outputLen);
                        y.setInt32(0, o, !1), (f = d._cloneInto(f)).update(p).digestInto(g), e.set(g.subarray(0, e.length)), await (0, s.asyncLoop)(i - 1, u, (t => {
                            h._cloneInto(f).update(g).digestInto(g);
                            for (let r = 0; r < e.length; r++) e[r] ^= g[r]
                        }))
                    }
                    return a(h, d, l, f, g)
                }
            },
            6267: (e, t, r) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.sha256 = void 0;
                const n = r(32649),
                    i = r(3265),
                    s = (e, t, r) => e & t ^ e & r ^ t & r,
                    o = new Uint32Array([1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298]),
                    a = new Uint32Array([1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225]),
                    c = new Uint32Array(64);
                class u extends n.SHA2 {
                    constructor() {
                        super(64, 32, 8, !1), this.A = 0 | a[0], this.B = 0 | a[1], this.C = 0 | a[2], this.D = 0 | a[3], this.E = 0 | a[4], this.F = 0 | a[5], this.G = 0 | a[6], this.H = 0 | a[7]
                    }
                    get() {
                        const {
                            A: e,
                            B: t,
                            C: r,
                            D: n,
                            E: i,
                            F: s,
                            G: o,
                            H: a
                        } = this;
                        return [e, t, r, n, i, s, o, a]
                    }
                    set(e, t, r, n, i, s, o, a) {
                        this.A = 0 | e, this.B = 0 | t, this.C = 0 | r, this.D = 0 | n, this.E = 0 | i, this.F = 0 | s, this.G = 0 | o, this.H = 0 | a
                    }
                    process(e, t) {
                        for (let i = 0; i < 16; i++, t += 4) c[i] = e.getUint32(t, !1);
                        for (let s = 16; s < 64; s++) {
                            const e = c[s - 15],
                                t = c[s - 2],
                                r = (0, i.rotr)(e, 7) ^ (0, i.rotr)(e, 18) ^ e >>> 3,
                                n = (0, i.rotr)(t, 17) ^ (0, i.rotr)(t, 19) ^ t >>> 10;
                            c[s] = n + c[s - 7] + r + c[s - 16] | 0
                        }
                        let {
                            A: r,
                            B: n,
                            C: a,
                            D: u,
                            E: l,
                            F: h,
                            G: d,
                            H: f
                        } = this;
                        for (let y = 0; y < 64; y++) {
                            const e = f + ((0, i.rotr)(l, 6) ^ (0, i.rotr)(l, 11) ^ (0, i.rotr)(l, 25)) + ((p = l) & h ^ ~p & d) + o[y] + c[y] | 0,
                                t = ((0, i.rotr)(r, 2) ^ (0, i.rotr)(r, 13) ^ (0, i.rotr)(r, 22)) + s(r, n, a) | 0;
                            f = d, d = h, h = l, l = u + e | 0, u = a, a = n, n = r, r = e + t | 0
                        }
                        var p;
                        r = r + this.A | 0, n = n + this.B | 0, a = a + this.C | 0, u = u + this.D | 0, l = l + this.E | 0, h = h + this.F | 0, d = d + this.G | 0, f = f + this.H | 0, this.set(r, n, a, u, l, h, d, f)
                    }
                    roundClean() {
                        c.fill(0)
                    }
                    destroy() {
                        this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0)
                    }
                }
                t.sha256 = (0, i.wrapConstructor)((() => new u))
            },
            6803: (e, t, r) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.sha384 = t.sha512_256 = t.sha512 = t.SHA512 = void 0;
                const n = r(32649),
                    i = r(14982),
                    s = r(3265),
                    [o, a] = i.default.split(["0x428a2f98d728ae22", "0x7137449123ef65cd", "0xb5c0fbcfec4d3b2f", "0xe9b5dba58189dbbc", "0x3956c25bf348b538", "0x59f111f1b605d019", "0x923f82a4af194f9b", "0xab1c5ed5da6d8118", "0xd807aa98a3030242", "0x12835b0145706fbe", "0x243185be4ee4b28c", "0x550c7dc3d5ffb4e2", "0x72be5d74f27b896f", "0x80deb1fe3b1696b1", "0x9bdc06a725c71235", "0xc19bf174cf692694", "0xe49b69c19ef14ad2", "0xefbe4786384f25e3", "0x0fc19dc68b8cd5b5", "0x240ca1cc77ac9c65", "0x2de92c6f592b0275", "0x4a7484aa6ea6e483", "0x5cb0a9dcbd41fbd4", "0x76f988da831153b5", "0x983e5152ee66dfab", "0xa831c66d2db43210", "0xb00327c898fb213f", "0xbf597fc7beef0ee4", "0xc6e00bf33da88fc2", "0xd5a79147930aa725", "0x06ca6351e003826f", "0x142929670a0e6e70", "0x27b70a8546d22ffc", "0x2e1b21385c26c926", "0x4d2c6dfc5ac42aed", "0x53380d139d95b3df", "0x650a73548baf63de", "0x766a0abb3c77b2a8", "0x81c2c92e47edaee6", "0x92722c851482353b", "0xa2bfe8a14cf10364", "0xa81a664bbc423001", "0xc24b8b70d0f89791", "0xc76c51a30654be30", "0xd192e819d6ef5218", "0xd69906245565a910", "0xf40e35855771202a", "0x106aa07032bbd1b8", "0x19a4c116b8d2d0c8", "0x1e376c085141ab53", "0x2748774cdf8eeb99", "0x34b0bcb5e19b48a8", "0x391c0cb3c5c95a63", "0x4ed8aa4ae3418acb", "0x5b9cca4f7763e373", "0x682e6ff3d6b2b8a3", "0x748f82ee5defb2fc", "0x78a5636f43172f60", "0x84c87814a1f0ab72", "0x8cc702081a6439ec", "0x90befffa23631e28", "0xa4506cebde82bde9", "0xbef9a3f7b2c67915", "0xc67178f2e372532b", "0xca273eceea26619c", "0xd186b8c721c0c207", "0xeada7dd6cde0eb1e", "0xf57d4f7fee6ed178", "0x06f067aa72176fba", "0x0a637dc5a2c898a6", "0x113f9804bef90dae", "0x1b710b35131c471b", "0x28db77f523047d84", "0x32caab7b40c72493", "0x3c9ebe0a15c9bebc", "0x431d67c49c100d4c", "0x4cc5d4becb3e42b6", "0x597f299cfc657e2a", "0x5fcb6fab3ad6faec", "0x6c44198c4a475817"].map((e => BigInt(e)))),
                    c = new Uint32Array(80),
                    u = new Uint32Array(80);
                class l extends n.SHA2 {
                    constructor() {
                        super(128, 64, 16, !1), this.Ah = 1779033703, this.Al = -205731576, this.Bh = -1150833019, this.Bl = -2067093701, this.Ch = 1013904242, this.Cl = -23791573, this.Dh = -1521486534, this.Dl = 1595750129, this.Eh = 1359893119, this.El = -1377402159, this.Fh = -1694144372, this.Fl = 725511199, this.Gh = 528734635, this.Gl = -79577749, this.Hh = 1541459225, this.Hl = 327033209
                    }
                    get() {
                        const {
                            Ah: e,
                            Al: t,
                            Bh: r,
                            Bl: n,
                            Ch: i,
                            Cl: s,
                            Dh: o,
                            Dl: a,
                            Eh: c,
                            El: u,
                            Fh: l,
                            Fl: h,
                            Gh: d,
                            Gl: f,
                            Hh: p,
                            Hl: y
                        } = this;
                        return [e, t, r, n, i, s, o, a, c, u, l, h, d, f, p, y]
                    }
                    set(e, t, r, n, i, s, o, a, c, u, l, h, d, f, p, y) {
                        this.Ah = 0 | e, this.Al = 0 | t, this.Bh = 0 | r, this.Bl = 0 | n, this.Ch = 0 | i, this.Cl = 0 | s, this.Dh = 0 | o, this.Dl = 0 | a, this.Eh = 0 | c, this.El = 0 | u, this.Fh = 0 | l, this.Fl = 0 | h, this.Gh = 0 | d, this.Gl = 0 | f, this.Hh = 0 | p, this.Hl = 0 | y
                    }
                    process(e, t) {
                        for (let i = 0; i < 16; i++, t += 4) c[i] = e.getUint32(t), u[i] = e.getUint32(t += 4);
                        for (let o = 16; o < 80; o++) {
                            const e = 0 | c[o - 15],
                                t = 0 | u[o - 15],
                                r = i.default.rotrSH(e, t, 1) ^ i.default.rotrSH(e, t, 8) ^ i.default.shrSH(e, t, 7),
                                n = i.default.rotrSL(e, t, 1) ^ i.default.rotrSL(e, t, 8) ^ i.default.shrSL(e, t, 7),
                                s = 0 | c[o - 2],
                                a = 0 | u[o - 2],
                                l = i.default.rotrSH(s, a, 19) ^ i.default.rotrBH(s, a, 61) ^ i.default.shrSH(s, a, 6),
                                h = i.default.rotrSL(s, a, 19) ^ i.default.rotrBL(s, a, 61) ^ i.default.shrSL(s, a, 6),
                                d = i.default.add4L(n, h, u[o - 7], u[o - 16]),
                                f = i.default.add4H(d, r, l, c[o - 7], c[o - 16]);
                            c[o] = 0 | f, u[o] = 0 | d
                        }
                        let {
                            Ah: r,
                            Al: n,
                            Bh: s,
                            Bl: l,
                            Ch: h,
                            Cl: d,
                            Dh: f,
                            Dl: p,
                            Eh: y,
                            El: g,
                            Fh: w,
                            Fl: b,
                            Gh: m,
                            Gl: v,
                            Hh: E,
                            Hl: A
                        } = this;
                        for (let _ = 0; _ < 80; _++) {
                            const e = i.default.rotrSH(y, g, 14) ^ i.default.rotrSH(y, g, 18) ^ i.default.rotrBH(y, g, 41),
                                t = i.default.rotrSL(y, g, 14) ^ i.default.rotrSL(y, g, 18) ^ i.default.rotrBL(y, g, 41),
                                x = y & w ^ ~y & m,
                                T = g & b ^ ~g & v,
                                U = i.default.add5L(A, t, T, a[_], u[_]),
                                S = i.default.add5H(U, E, e, x, o[_], c[_]),
                                R = 0 | U,
                                B = i.default.rotrSH(r, n, 28) ^ i.default.rotrBH(r, n, 34) ^ i.default.rotrBH(r, n, 39),
                                I = i.default.rotrSL(r, n, 28) ^ i.default.rotrBL(r, n, 34) ^ i.default.rotrBL(r, n, 39),
                                z = r & s ^ r & h ^ s & h,
                                O = n & l ^ n & d ^ l & d;
                            E = 0 | m, A = 0 | v, m = 0 | w, v = 0 | b, w = 0 | y, b = 0 | g, ({
                                h: y,
                                l: g
                            } = i.default.add(0 | f, 0 | p, 0 | S, 0 | R)), f = 0 | h, p = 0 | d, h = 0 | s, d = 0 | l, s = 0 | r, l = 0 | n;
                            const L = i.default.add3L(R, I, O);
                            r = i.default.add3H(L, S, B, z), n = 0 | L
                        }({
                            h: r,
                            l: n
                        } = i.default.add(0 | this.Ah, 0 | this.Al, 0 | r, 0 | n)), ({
                            h: s,
                            l: l
                        } = i.default.add(0 | this.Bh, 0 | this.Bl, 0 | s, 0 | l)), ({
                            h: h,
                            l: d
                        } = i.default.add(0 | this.Ch, 0 | this.Cl, 0 | h, 0 | d)), ({
                            h: f,
                            l: p
                        } = i.default.add(0 | this.Dh, 0 | this.Dl, 0 | f, 0 | p)), ({
                            h: y,
                            l: g
                        } = i.default.add(0 | this.Eh, 0 | this.El, 0 | y, 0 | g)), ({
                            h: w,
                            l: b
                        } = i.default.add(0 | this.Fh, 0 | this.Fl, 0 | w, 0 | b)), ({
                            h: m,
                            l: v
                        } = i.default.add(0 | this.Gh, 0 | this.Gl, 0 | m, 0 | v)), ({
                            h: E,
                            l: A
                        } = i.default.add(0 | this.Hh, 0 | this.Hl, 0 | E, 0 | A)), this.set(r, n, s, l, h, d, f, p, y, g, w, b, m, v, E, A)
                    }
                    roundClean() {
                        c.fill(0), u.fill(0)
                    }
                    destroy() {
                        this.buffer.fill(0), this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
                    }
                }
                t.SHA512 = l;
                class h extends l {
                    constructor() {
                        super(), this.Ah = 573645204, this.Al = -64227540, this.Bh = -1621794909, this.Bl = -934517566, this.Ch = 596883563, this.Cl = 1867755857, this.Dh = -1774684391, this.Dl = 1497426621, this.Eh = -1775747358, this.El = -1467023389, this.Fh = -1101128155, this.Fl = 1401305490, this.Gh = 721525244, this.Gl = 746961066, this.Hh = 246885852, this.Hl = -2117784414, this.outputLen = 32
                    }
                }
                class d extends l {
                    constructor() {
                        super(), this.Ah = -876896931, this.Al = -1056596264, this.Bh = 1654270250, this.Bl = 914150663, this.Ch = -1856437926, this.Cl = 812702999, this.Dh = 355462360, this.Dl = -150054599, this.Eh = 1731405415, this.El = -4191439, this.Fh = -1900787065, this.Fl = 1750603025, this.Gh = -619958771, this.Gl = 1694076839, this.Hh = 1203062813, this.Hl = -1090891868, this.outputLen = 48
                    }
                }
                t.sha512 = (0, s.wrapConstructor)((() => new l)), t.sha512_256 = (0, s.wrapConstructor)((() => new h)), t.sha384 = (0, s.wrapConstructor)((() => new d))
            },
            3265: (e, t, r) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.randomBytes = t.wrapConstructorWithOpts = t.wrapConstructor = t.checkOpts = t.Hash = t.concatBytes = t.toBytes = t.utf8ToBytes = t.asyncLoop = t.nextTick = t.hexToBytes = t.bytesToHex = t.isLE = t.rotr = t.createView = t.u32 = t.u8 = void 0;
                const n = r(86184);
                t.u8 = e => new Uint8Array(e.buffer, e.byteOffset, e.byteLength);
                t.u32 = e => new Uint32Array(e.buffer, e.byteOffset, Math.floor(e.byteLength / 4));
                t.createView = e => new DataView(e.buffer, e.byteOffset, e.byteLength);
                if (t.rotr = (e, t) => e << 32 - t | e >>> t, t.isLE = 68 === new Uint8Array(new Uint32Array([287454020]).buffer)[0], !t.isLE) throw new Error("Non little-endian hardware is not supported");
                const i = Array.from({
                    length: 256
                }, ((e, t) => t.toString(16).padStart(2, "0")));
                t.bytesToHex = function (e) {
                    if (!(e instanceof Uint8Array)) throw new Error("Uint8Array expected");
                    let t = "";
                    for (let r = 0; r < e.length; r++) t += i[e[r]];
                    return t
                }, t.hexToBytes = function (e) {
                    if ("string" !== typeof e) throw new TypeError("hexToBytes: expected string, got " + typeof e);
                    if (e.length % 2) throw new Error("hexToBytes: received invalid unpadded hex");
                    const t = new Uint8Array(e.length / 2);
                    for (let r = 0; r < t.length; r++) {
                        const n = 2 * r,
                            i = e.slice(n, n + 2),
                            s = Number.parseInt(i, 16);
                        if (Number.isNaN(s) || s < 0) throw new Error("Invalid byte sequence");
                        t[r] = s
                    }
                    return t
                };

                function s(e) {
                    if ("string" !== typeof e) throw new TypeError("utf8ToBytes expected string, got ".concat(typeof e));
                    return (new TextEncoder).encode(e)
                }

                function o(e) {
                    if ("string" === typeof e && (e = s(e)), !(e instanceof Uint8Array)) throw new TypeError("Expected input type is Uint8Array (got ".concat(typeof e, ")"));
                    return e
                }
                t.nextTick = async () => {}, t.asyncLoop = async function (e, r, n) {
                    let i = Date.now();
                    for (let s = 0; s < e; s++) {
                        n(s);
                        const e = Date.now() - i;
                        e >= 0 && e < r || (await (0, t.nextTick)(), i += e)
                    }
                }, t.utf8ToBytes = s, t.toBytes = o, t.concatBytes = function () {
                    for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++) t[r] = arguments[r];
                    if (!t.every((e => e instanceof Uint8Array))) throw new Error("Uint8Array list expected");
                    if (1 === t.length) return t[0];
                    const n = t.reduce(((e, t) => e + t.length), 0),
                        i = new Uint8Array(n);
                    for (let s = 0, o = 0; s < t.length; s++) {
                        const e = t[s];
                        i.set(e, o), o += e.length
                    }
                    return i
                };
                t.Hash = class {
                    clone() {
                        return this._cloneInto()
                    }
                };
                t.checkOpts = function (e, t) {
                    if (void 0 !== t && ("object" !== typeof t || (r = t, "[object Object]" !== Object.prototype.toString.call(r) || r.constructor !== Object))) throw new TypeError("Options should be object or undefined");
                    var r;
                    return Object.assign(e, t)
                }, t.wrapConstructor = function (e) {
                    const t = t => e().update(o(t)).digest(),
                        r = e();
                    return t.outputLen = r.outputLen, t.blockLen = r.blockLen, t.create = () => e(), t
                }, t.wrapConstructorWithOpts = function (e) {
                    const t = (t, r) => e(r).update(o(t)).digest(),
                        r = e({});
                    return t.outputLen = r.outputLen, t.blockLen = r.blockLen, t.create = t => e(t), t
                }, t.randomBytes = function () {
                    let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 32;
                    if (n.crypto.web) return n.crypto.web.getRandomValues(new Uint8Array(e));
                    if (n.crypto.node) return new Uint8Array(n.crypto.node.randomBytes(e).buffer);
                    throw new Error("The environment doesn't have randomBytes function")
                }
            },
            98325: (e, t) => {
                "use strict";

                function r(e) {
                    if (!Number.isSafeInteger(e)) throw new Error("Wrong integer: ".concat(e))
                }

                function n() {
                    const e = (e, t) => r => e(t(r));
                    for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++) r[n] = arguments[n];
                    const i = Array.from(r).reverse().reduce(((t, r) => t ? e(t, r.encode) : r.encode), void 0),
                        s = r.reduce(((t, r) => t ? e(t, r.decode) : r.decode), void 0);
                    return {
                        encode: i,
                        decode: s
                    }
                }

                function i(e) {
                    return {
                        encode: t => {
                            if (!Array.isArray(t) || t.length && "number" !== typeof t[0]) throw new Error("alphabet.encode input should be an array of numbers");
                            return t.map((t => {
                                if (r(t), t < 0 || t >= e.length) throw new Error("Digit index outside alphabet: ".concat(t, " (alphabet: ").concat(e.length, ")"));
                                return e[t]
                            }))
                        },
                        decode: t => {
                            if (!Array.isArray(t) || t.length && "string" !== typeof t[0]) throw new Error("alphabet.decode input should be array of strings");
                            return t.map((t => {
                                if ("string" !== typeof t) throw new Error("alphabet.decode: not string element=".concat(t));
                                const r = e.indexOf(t);
                                if (-1 === r) throw new Error('Unknown letter: "'.concat(t, '". Allowed: ').concat(e));
                                return r
                            }))
                        }
                    }
                }

                function s() {
                    let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
                    if ("string" !== typeof e) throw new Error("join separator should be string");
                    return {
                        encode: t => {
                            if (!Array.isArray(t) || t.length && "string" !== typeof t[0]) throw new Error("join.encode input should be array of strings");
                            for (let e of t)
                                if ("string" !== typeof e) throw new Error("join.encode: non-string input=".concat(e));
                            return t.join(e)
                        },
                        decode: t => {
                            if ("string" !== typeof t) throw new Error("join.decode input should be string");
                            return t.split(e)
                        }
                    }
                }

                function o(e) {
                    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "=";
                    if (r(e), "string" !== typeof t) throw new Error("padding chr should be string");
                    return {
                        encode(r) {
                            if (!Array.isArray(r) || r.length && "string" !== typeof r[0]) throw new Error("padding.encode input should be array of strings");
                            for (let e of r)
                                if ("string" !== typeof e) throw new Error("padding.encode: non-string input=".concat(e));
                            for (; r.length * e % 8;) r.push(t);
                            return r
                        },
                        decode(r) {
                            if (!Array.isArray(r) || r.length && "string" !== typeof r[0]) throw new Error("padding.encode input should be array of strings");
                            for (let e of r)
                                if ("string" !== typeof e) throw new Error("padding.decode: non-string input=".concat(e));
                            let n = r.length;
                            if (n * e % 8) throw new Error("Invalid padding: string should have whole number of bytes");
                            for (; n > 0 && r[n - 1] === t; n--)
                                if (!((n - 1) * e % 8)) throw new Error("Invalid padding: string has too much padding");
                            return r.slice(0, n)
                        }
                    }
                }

                function a(e) {
                    if ("function" !== typeof e) throw new Error("normalize fn should be function");
                    return {
                        encode: e => e,
                        decode: t => e(t)
                    }
                }

                function c(e, t, n) {
                    if (t < 2) throw new Error("convertRadix: wrong from=".concat(t, ", base cannot be less than 2"));
                    if (n < 2) throw new Error("convertRadix: wrong to=".concat(n, ", base cannot be less than 2"));
                    if (!Array.isArray(e)) throw new Error("convertRadix: data should be array");
                    if (!e.length) return [];
                    let i = 0;
                    const s = [],
                        o = Array.from(e);
                    for (o.forEach((e => {
                            if (r(e), e < 0 || e >= t) throw new Error("Wrong integer: ".concat(e))
                        }));;) {
                        let e = 0,
                            r = !0;
                        for (let s = i; s < o.length; s++) {
                            const a = o[s],
                                c = t * e + a;
                            if (!Number.isSafeInteger(c) || t * e / t !== e || c - a !== t * e) throw new Error("convertRadix: carry overflow");
                            if (e = c % n, o[s] = Math.floor(c / n), !Number.isSafeInteger(o[s]) || o[s] * n + e !== c) throw new Error("convertRadix: carry overflow");
                            r && (o[s] ? r = !1 : i = s)
                        }
                        if (s.push(e), r) break
                    }
                    for (let r = 0; r < e.length - 1 && 0 === e[r]; r++) s.push(0);
                    return s.reverse()
                }
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.bytes = t.stringToBytes = t.str = t.bytesToString = t.hex = t.utf8 = t.bech32m = t.bech32 = t.base58check = t.base58xmr = t.base58xrp = t.base58flickr = t.base58 = t.base64url = t.base64 = t.base32crockford = t.base32hex = t.base32 = t.base16 = t.utils = t.assertNumber = void 0, t.assertNumber = r;
                const u = (e, t) => t ? u(t, e % t) : e,
                    l = (e, t) => e + (t - u(e, t));

                function h(e, t, n, i) {
                    if (!Array.isArray(e)) throw new Error("convertRadix2: data should be array");
                    if (t <= 0 || t > 32) throw new Error("convertRadix2: wrong from=".concat(t));
                    if (n <= 0 || n > 32) throw new Error("convertRadix2: wrong to=".concat(n));
                    if (l(t, n) > 32) throw new Error("convertRadix2: carry overflow from=".concat(t, " to=").concat(n, " carryBits=").concat(l(t, n)));
                    let s = 0,
                        o = 0;
                    const a = 2 ** n - 1,
                        c = [];
                    for (const u of e) {
                        if (r(u), u >= 2 ** t) throw new Error("convertRadix2: invalid data word=".concat(u, " from=").concat(t));
                        if (s = s << t | u, o + t > 32) throw new Error("convertRadix2: carry overflow pos=".concat(o, " from=").concat(t));
                        for (o += t; o >= n; o -= n) c.push((s >> o - n & a) >>> 0);
                        s &= 2 ** o - 1
                    }
                    if (s = s << n - o & a, !i && o >= t) throw new Error("Excess padding");
                    if (!i && s) throw new Error("Non-zero padding: ".concat(s));
                    return i && o > 0 && c.push(s >>> 0), c
                }

                function d(e) {
                    return r(e), {
                        encode: t => {
                            if (!(t instanceof Uint8Array)) throw new Error("radix.encode input should be Uint8Array");
                            return c(Array.from(t), 256, e)
                        },
                        decode: t => {
                            if (!Array.isArray(t) || t.length && "number" !== typeof t[0]) throw new Error("radix.decode input should be array of strings");
                            return Uint8Array.from(c(t, e, 256))
                        }
                    }
                }

                function f(e) {
                    let t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                    if (r(e), e <= 0 || e > 32) throw new Error("radix2: bits should be in (0..32]");
                    if (l(8, e) > 32 || l(e, 8) > 32) throw new Error("radix2: carry overflow");
                    return {
                        encode: r => {
                            if (!(r instanceof Uint8Array)) throw new Error("radix2.encode input should be Uint8Array");
                            return h(Array.from(r), 8, e, !t)
                        },
                        decode: r => {
                            if (!Array.isArray(r) || r.length && "number" !== typeof r[0]) throw new Error("radix2.decode input should be array of strings");
                            return Uint8Array.from(h(r, e, 8, t))
                        }
                    }
                }

                function p(e) {
                    if ("function" !== typeof e) throw new Error("unsafeWrapper fn should be function");
                    return function () {
                        try {
                            for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++) r[n] = arguments[n];
                            return e.apply(null, r)
                        } catch (i) {}
                    }
                }

                function y(e, t) {
                    if (r(e), "function" !== typeof t) throw new Error("checksum fn should be function");
                    return {
                        encode(r) {
                            if (!(r instanceof Uint8Array)) throw new Error("checksum.encode: input should be Uint8Array");
                            const n = t(r).slice(0, e),
                                i = new Uint8Array(r.length + e);
                            return i.set(r), i.set(n, r.length), i
                        },
                        decode(r) {
                            if (!(r instanceof Uint8Array)) throw new Error("checksum.decode: input should be Uint8Array");
                            const n = r.slice(0, -e),
                                i = t(n).slice(0, e),
                                s = r.slice(-e);
                            for (let t = 0; t < e; t++)
                                if (i[t] !== s[t]) throw new Error("Invalid checksum");
                            return n
                        }
                    }
                }
                t.utils = {
                    alphabet: i,
                    chain: n,
                    checksum: y,
                    radix: d,
                    radix2: f,
                    join: s,
                    padding: o
                }, t.base16 = n(f(4), i("0123456789ABCDEF"), s("")), t.base32 = n(f(5), i("ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"), o(5), s("")), t.base32hex = n(f(5), i("0123456789ABCDEFGHIJKLMNOPQRSTUV"), o(5), s("")), t.base32crockford = n(f(5), i("0123456789ABCDEFGHJKMNPQRSTVWXYZ"), s(""), a((e => e.toUpperCase().replace(/O/g, "0").replace(/[IL]/g, "1")))), t.base64 = n(f(6), i("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"), o(6), s("")), t.base64url = n(f(6), i("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"), o(6), s(""));
                const g = e => n(d(58), i(e), s(""));
                t.base58 = g("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"), t.base58flickr = g("123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"), t.base58xrp = g("rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz");
                const w = [0, 2, 3, 5, 6, 7, 9, 10, 11];
                t.base58xmr = {
                    encode(e) {
                        let r = "";
                        for (let n = 0; n < e.length; n += 8) {
                            const i = e.subarray(n, n + 8);
                            r += t.base58.encode(i).padStart(w[i.length], "1")
                        }
                        return r
                    },
                    decode(e) {
                        let r = [];
                        for (let n = 0; n < e.length; n += 11) {
                            const i = e.slice(n, n + 11),
                                s = w.indexOf(i.length),
                                o = t.base58.decode(i);
                            for (let e = 0; e < o.length - s; e++)
                                if (0 !== o[e]) throw new Error("base58xmr: wrong padding");
                            r = r.concat(Array.from(o.slice(o.length - s)))
                        }
                        return Uint8Array.from(r)
                    }
                };
                t.base58check = e => n(y(4, (t => e(e(t)))), t.base58);
                const b = n(i("qpzry9x8gf2tvdw0s3jn54khce6mua7l"), s("")),
                    m = [996825010, 642813549, 513874426, 1027748829, 705979059];

                function v(e) {
                    const t = e >> 25;
                    let r = (33554431 & e) << 5;
                    for (let n = 0; n < m.length; n++) 1 === (t >> n & 1) && (r ^= m[n]);
                    return r
                }

                function E(e, t) {
                    let r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1;
                    const n = e.length;
                    let i = 1;
                    for (let s = 0; s < n; s++) {
                        const t = e.charCodeAt(s);
                        if (t < 33 || t > 126) throw new Error("Invalid prefix (".concat(e, ")"));
                        i = v(i) ^ t >> 5
                    }
                    i = v(i);
                    for (let s = 0; s < n; s++) i = v(i) ^ 31 & e.charCodeAt(s);
                    for (let s of t) i = v(i) ^ s;
                    for (let s = 0; s < 6; s++) i = v(i);
                    return i ^= r, b.encode(h([i % 2 ** 30], 30, 5, !1))
                }

                function A(e) {
                    const t = "bech32" === e ? 1 : 734539939,
                        r = f(5),
                        n = r.decode,
                        i = r.encode,
                        s = p(n);

                    function o(e) {
                        let r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 90;
                        if ("string" !== typeof e) throw new Error("bech32.decode input should be string, not ".concat(typeof e));
                        if (e.length < 8 || !1 !== r && e.length > r) throw new TypeError("Wrong string length: ".concat(e.length, " (").concat(e, "). Expected (8..").concat(r, ")"));
                        const n = e.toLowerCase();
                        if (e !== n && e !== e.toUpperCase()) throw new Error("String must be lowercase or uppercase");
                        const i = (e = n).lastIndexOf("1");
                        if (0 === i || -1 === i) throw new Error('Letter "1" must be present between prefix and data only');
                        const s = e.slice(0, i),
                            o = e.slice(i + 1);
                        if (o.length < 6) throw new Error("Data must be at least 6 characters long");
                        const a = b.decode(o).slice(0, -6),
                            c = E(s, a, t);
                        if (!o.endsWith(c)) throw new Error("Invalid checksum in ".concat(e, ': expected "').concat(c, '"'));
                        return {
                            prefix: s,
                            words: a
                        }
                    }
                    return {
                        encode: function (e, r) {
                            let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 90;
                            if ("string" !== typeof e) throw new Error("bech32.encode prefix should be string, not ".concat(typeof e));
                            if (!Array.isArray(r) || r.length && "number" !== typeof r[0]) throw new Error("bech32.encode words should be array of numbers, not ".concat(typeof r));
                            const i = e.length + 7 + r.length;
                            if (!1 !== n && i > n) throw new TypeError("Length ".concat(i, " exceeds limit ").concat(n));
                            return e = e.toLowerCase(), "".concat(e, "1").concat(b.encode(r)).concat(E(e, r, t))
                        },
                        decode: o,
                        decodeToBytes: function (e) {
                            const {
                                prefix: t,
                                words: r
                            } = o(e, !1);
                            return {
                                prefix: t,
                                words: r,
                                bytes: n(r)
                            }
                        },
                        decodeUnsafe: p(o),
                        fromWords: n,
                        fromWordsUnsafe: s,
                        toWords: i
                    }
                }
                t.bech32 = A("bech32"), t.bech32m = A("bech32m"), t.utf8 = {
                    encode: e => (new TextDecoder).decode(e),
                    decode: e => (new TextEncoder).encode(e)
                }, t.hex = n(f(4), i("0123456789abcdef"), s(""), a((e => {
                    if ("string" !== typeof e || e.length % 2) throw new TypeError("hex.decode: expected string, got ".concat(typeof e, " with length ").concat(e.length));
                    return e.toLowerCase()
                })));
                const _ = {
                        utf8: t.utf8,
                        hex: t.hex,
                        base16: t.base16,
                        base32: t.base32,
                        base64: t.base64,
                        base64url: t.base64url,
                        base58: t.base58,
                        base58xmr: t.base58xmr
                    },
                    x = "Invalid encoding type. Available types: ".concat(Object.keys(_).join(", "));
                t.bytesToString = (e, t) => {
                    if ("string" !== typeof e || !_.hasOwnProperty(e)) throw new TypeError(x);
                    if (!(t instanceof Uint8Array)) throw new TypeError("bytesToString() expects Uint8Array");
                    return _[e].encode(t)
                }, t.str = t.bytesToString;
                t.stringToBytes = (e, t) => {
                    if (!_.hasOwnProperty(e)) throw new TypeError(x);
                    if ("string" !== typeof t) throw new TypeError("stringToBytes() expects string");
                    return _[e].decode(t)
                }, t.bytes = t.stringToBytes
            },
            64069: (e, t, r) => {
                "use strict";
                t.Z1 = void 0;
                const n = r(71537),
                    i = r(78156),
                    s = r(6267),
                    o = r(6803),
                    a = r(3265),
                    c = r(98325);

                function u(e) {
                    if ("string" !== typeof e) throw new TypeError("Invalid mnemonic type: ".concat(typeof e));
                    return e.normalize("NFKD")
                }

                function l(e) {
                    const t = u(e),
                        r = t.split(" ");
                    if (![12, 15, 18, 21, 24].includes(r.length)) throw new Error("Invalid mnemonic");
                    return {
                        nfkd: t,
                        words: r
                    }
                }

                function h(e) {
                    n.default.bytes(e, 16, 20, 24, 28, 32)
                }
                const d = e => {
                    const t = 8 - e.length / 4;
                    return new Uint8Array([(0, s.sha256)(e)[0] >> t << t])
                };

                function f(e) {
                    if (!Array.isArray(e) || 2048 !== e.length || "string" !== typeof e[0]) throw new Error("Worlist: expected array of 2048 strings");
                    return e.forEach((e => {
                        if ("string" !== typeof e) throw new Error("Wordlist: non-string element: ".concat(e))
                    })), c.utils.chain(c.utils.checksum(1, d), c.utils.radix2(11, !0), c.utils.alphabet(e))
                }

                function p(e, t) {
                    const {
                        words: r
                    } = l(e), n = f(t).decode(r);
                    return h(n), n
                }

                function y(e, t) {
                    h(e);
                    return f(t).encode(e).join((e => "\u3042\u3044\u3053\u304f\u3057\u3093" === e[0])(t) ? "\u3000" : " ")
                }
                const g = e => u("mnemonic".concat(e));
                t.Z1 = function (e) {
                    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
                    return (0, i.pbkdf2)(o.sha512, l(e).nfkd, g(t), {
                        c: 2048,
                        dkLen: 64
                    })
                }
            },
            10458: (e, t, r) => {
                e.exports = r(89922)
            },
            1768: (e, t, r) => {
                "use strict";
                var n = r(79870),
                    i = r(96038),
                    s = r(82050),
                    o = r(62865),
                    a = r(35020),
                    c = r(44030),
                    u = r(89666),
                    l = r(20498),
                    h = r(72232),
                    d = r(46545),
                    f = r(4862);
                e.exports = function (e) {
                    return new Promise((function (t, r) {
                        var p, y = e.data,
                            g = e.headers,
                            w = e.responseType;

                        function b() {
                            e.cancelToken && e.cancelToken.unsubscribe(p), e.signal && e.signal.removeEventListener("abort", p)
                        }
                        n.isFormData(y) && n.isStandardBrowserEnv() && delete g["Content-Type"];
                        var m = new XMLHttpRequest;
                        if (e.auth) {
                            var v = e.auth.username || "",
                                E = e.auth.password ? unescape(encodeURIComponent(e.auth.password)) : "";
                            g.Authorization = "Basic " + btoa(v + ":" + E)
                        }
                        var A = a(e.baseURL, e.url);

                        function _() {
                            if (m) {
                                var n = "getAllResponseHeaders" in m ? c(m.getAllResponseHeaders()) : null,
                                    s = {
                                        data: w && "text" !== w && "json" !== w ? m.response : m.responseText,
                                        status: m.status,
                                        statusText: m.statusText,
                                        headers: n,
                                        config: e,
                                        request: m
                                    };
                                i((function (e) {
                                    t(e), b()
                                }), (function (e) {
                                    r(e), b()
                                }), s), m = null
                            }
                        }
                        if (m.open(e.method.toUpperCase(), o(A, e.params, e.paramsSerializer), !0), m.timeout = e.timeout, "onloadend" in m ? m.onloadend = _ : m.onreadystatechange = function () {
                                m && 4 === m.readyState && (0 !== m.status || m.responseURL && 0 === m.responseURL.indexOf("file:")) && setTimeout(_)
                            }, m.onabort = function () {
                                m && (r(new h("Request aborted", h.ECONNABORTED, e, m)), m = null)
                            }, m.onerror = function () {
                                r(new h("Network Error", h.ERR_NETWORK, e, m, m)), m = null
                            }, m.ontimeout = function () {
                                var t = e.timeout ? "timeout of " + e.timeout + "ms exceeded" : "timeout exceeded",
                                    n = e.transitional || l;
                                e.timeoutErrorMessage && (t = e.timeoutErrorMessage), r(new h(t, n.clarifyTimeoutError ? h.ETIMEDOUT : h.ECONNABORTED, e, m)), m = null
                            }, n.isStandardBrowserEnv()) {
                            var x = (e.withCredentials || u(A)) && e.xsrfCookieName ? s.read(e.xsrfCookieName) : void 0;
                            x && (g[e.xsrfHeaderName] = x)
                        }
                        "setRequestHeader" in m && n.forEach(g, (function (e, t) {
                            "undefined" === typeof y && "content-type" === t.toLowerCase() ? delete g[t] : m.setRequestHeader(t, e)
                        })), n.isUndefined(e.withCredentials) || (m.withCredentials = !!e.withCredentials), w && "json" !== w && (m.responseType = e.responseType), "function" === typeof e.onDownloadProgress && m.addEventListener("progress", e.onDownloadProgress), "function" === typeof e.onUploadProgress && m.upload && m.upload.addEventListener("progress", e.onUploadProgress), (e.cancelToken || e.signal) && (p = function (e) {
                            m && (r(!e || e && e.type ? new d : e), m.abort(), m = null)
                        }, e.cancelToken && e.cancelToken.subscribe(p), e.signal && (e.signal.aborted ? p() : e.signal.addEventListener("abort", p))), y || (y = null);
                        var T = f(A);
                        T && -1 === ["http", "https", "file"].indexOf(T) ? r(new h("Unsupported protocol " + T + ":", h.ERR_BAD_REQUEST, e)) : m.send(y)
                    }))
                }
            },
            89922: (e, t, r) => {
                "use strict";
                var n = r(79870),
                    i = r(76832),
                    s = r(52645),
                    o = r(41923);
                var a = function e(t) {
                    var r = new s(t),
                        a = i(s.prototype.request, r);
                    return n.extend(a, s.prototype, r), n.extend(a, r), a.create = function (r) {
                        return e(o(t, r))
                    }, a
                }(r(23778));
                a.Axios = s, a.CanceledError = r(46545), a.CancelToken = r(89577), a.isCancel = r(79824), a.VERSION = r(44765).version, a.toFormData = r(47091), a.AxiosError = r(72232), a.Cancel = a.CanceledError, a.all = function (e) {
                    return Promise.all(e)
                }, a.spread = r(23456), a.isAxiosError = r(54879), e.exports = a, e.exports.default = a
            },
            89577: (e, t, r) => {
                "use strict";
                var n = r(46545);

                function i(e) {
                    if ("function" !== typeof e) throw new TypeError("executor must be a function.");
                    var t;
                    this.promise = new Promise((function (e) {
                        t = e
                    }));
                    var r = this;
                    this.promise.then((function (e) {
                        if (r._listeners) {
                            var t, n = r._listeners.length;
                            for (t = 0; t < n; t++) r._listeners[t](e);
                            r._listeners = null
                        }
                    })), this.promise.then = function (e) {
                        var t, n = new Promise((function (e) {
                            r.subscribe(e), t = e
                        })).then(e);
                        return n.cancel = function () {
                            r.unsubscribe(t)
                        }, n
                    }, e((function (e) {
                        r.reason || (r.reason = new n(e), t(r.reason))
                    }))
                }
                i.prototype.throwIfRequested = function () {
                    if (this.reason) throw this.reason
                }, i.prototype.subscribe = function (e) {
                    this.reason ? e(this.reason) : this._listeners ? this._listeners.push(e) : this._listeners = [e]
                }, i.prototype.unsubscribe = function (e) {
                    if (this._listeners) {
                        var t = this._listeners.indexOf(e); - 1 !== t && this._listeners.splice(t, 1)
                    }
                }, i.source = function () {
                    var e;
                    return {
                        token: new i((function (t) {
                            e = t
                        })),
                        cancel: e
                    }
                }, e.exports = i
            },
            46545: (e, t, r) => {
                "use strict";
                var n = r(72232);

                function i(e) {
                    n.call(this, null == e ? "canceled" : e, n.ERR_CANCELED), this.name = "CanceledError"
                }
                r(79870).inherits(i, n, {
                    __CANCEL__: !0
                }), e.exports = i
            },
            79824: e => {
                "use strict";
                e.exports = function (e) {
                    return !(!e || !e.__CANCEL__)
                }
            },
            52645: (e, t, r) => {
                "use strict";
                var n = r(79870),
                    i = r(62865),
                    s = r(77555),
                    o = r(53090),
                    a = r(41923),
                    c = r(35020),
                    u = r(94037),
                    l = u.validators;

                function h(e) {
                    this.defaults = e, this.interceptors = {
                        request: new s,
                        response: new s
                    }
                }
                h.prototype.request = function (e, t) {
                    "string" === typeof e ? (t = t || {}).url = e : t = e || {}, (t = a(this.defaults, t)).method ? t.method = t.method.toLowerCase() : this.defaults.method ? t.method = this.defaults.method.toLowerCase() : t.method = "get";
                    var r = t.transitional;
                    void 0 !== r && u.assertOptions(r, {
                        silentJSONParsing: l.transitional(l.boolean),
                        forcedJSONParsing: l.transitional(l.boolean),
                        clarifyTimeoutError: l.transitional(l.boolean)
                    }, !1);
                    var n = [],
                        i = !0;
                    this.interceptors.request.forEach((function (e) {
                        "function" === typeof e.runWhen && !1 === e.runWhen(t) || (i = i && e.synchronous, n.unshift(e.fulfilled, e.rejected))
                    }));
                    var s, c = [];
                    if (this.interceptors.response.forEach((function (e) {
                            c.push(e.fulfilled, e.rejected)
                        })), !i) {
                        var h = [o, void 0];
                        for (Array.prototype.unshift.apply(h, n), h = h.concat(c), s = Promise.resolve(t); h.length;) s = s.then(h.shift(), h.shift());
                        return s
                    }
                    for (var d = t; n.length;) {
                        var f = n.shift(),
                            p = n.shift();
                        try {
                            d = f(d)
                        } catch (y) {
                            p(y);
                            break
                        }
                    }
                    try {
                        s = o(d)
                    } catch (y) {
                        return Promise.reject(y)
                    }
                    for (; c.length;) s = s.then(c.shift(), c.shift());
                    return s
                }, h.prototype.getUri = function (e) {
                    e = a(this.defaults, e);
                    var t = c(e.baseURL, e.url);
                    return i(t, e.params, e.paramsSerializer)
                }, n.forEach(["delete", "get", "head", "options"], (function (e) {
                    h.prototype[e] = function (t, r) {
                        return this.request(a(r || {}, {
                            method: e,
                            url: t,
                            data: (r || {}).data
                        }))
                    }
                })), n.forEach(["post", "put", "patch"], (function (e) {
                    function t(t) {
                        return function (r, n, i) {
                            return this.request(a(i || {}, {
                                method: e,
                                headers: t ? {
                                    "Content-Type": "multipart/form-data"
                                } : {},
                                url: r,
                                data: n
                            }))
                        }
                    }
                    h.prototype[e] = t(), h.prototype[e + "Form"] = t(!0)
                })), e.exports = h
            },
            72232: (e, t, r) => {
                "use strict";
                var n = r(79870);

                function i(e, t, r, n, i) {
                    Error.call(this), this.message = e, this.name = "AxiosError", t && (this.code = t), r && (this.config = r), n && (this.request = n), i && (this.response = i)
                }
                n.inherits(i, Error, {
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
                var s = i.prototype,
                    o = {};
                ["ERR_BAD_OPTION_VALUE", "ERR_BAD_OPTION", "ECONNABORTED", "ETIMEDOUT", "ERR_NETWORK", "ERR_FR_TOO_MANY_REDIRECTS", "ERR_DEPRECATED", "ERR_BAD_RESPONSE", "ERR_BAD_REQUEST", "ERR_CANCELED"].forEach((function (e) {
                    o[e] = {
                        value: e
                    }
                })), Object.defineProperties(i, o), Object.defineProperty(s, "isAxiosError", {
                    value: !0
                }), i.from = function (e, t, r, o, a, c) {
                    var u = Object.create(s);
                    return n.toFlatObject(e, u, (function (e) {
                        return e !== Error.prototype
                    })), i.call(u, e.message, t, r, o, a), u.name = e.name, c && Object.assign(u, c), u
                }, e.exports = i
            },
            77555: (e, t, r) => {
                "use strict";
                var n = r(79870);

                function i() {
                    this.handlers = []
                }
                i.prototype.use = function (e, t, r) {
                    return this.handlers.push({
                        fulfilled: e,
                        rejected: t,
                        synchronous: !!r && r.synchronous,
                        runWhen: r ? r.runWhen : null
                    }), this.handlers.length - 1
                }, i.prototype.eject = function (e) {
                    this.handlers[e] && (this.handlers[e] = null)
                }, i.prototype.forEach = function (e) {
                    n.forEach(this.handlers, (function (t) {
                        null !== t && e(t)
                    }))
                }, e.exports = i
            },
            35020: (e, t, r) => {
                "use strict";
                var n = r(13568),
                    i = r(38829);
                e.exports = function (e, t) {
                    return e && !n(t) ? i(e, t) : t
                }
            },
            53090: (e, t, r) => {
                "use strict";
                var n = r(79870),
                    i = r(41503),
                    s = r(79824),
                    o = r(23778),
                    a = r(46545);

                function c(e) {
                    if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted) throw new a
                }
                e.exports = function (e) {
                    return c(e), e.headers = e.headers || {}, e.data = i.call(e, e.data, e.headers, e.transformRequest), e.headers = n.merge(e.headers.common || {}, e.headers[e.method] || {}, e.headers), n.forEach(["delete", "get", "head", "post", "put", "patch", "common"], (function (t) {
                        delete e.headers[t]
                    })), (e.adapter || o.adapter)(e).then((function (t) {
                        return c(e), t.data = i.call(e, t.data, t.headers, e.transformResponse), t
                    }), (function (t) {
                        return s(t) || (c(e), t && t.response && (t.response.data = i.call(e, t.response.data, t.response.headers, e.transformResponse))), Promise.reject(t)
                    }))
                }
            },
            41923: (e, t, r) => {
                "use strict";
                var n = r(79870);
                e.exports = function (e, t) {
                    t = t || {};
                    var r = {};

                    function i(e, t) {
                        return n.isPlainObject(e) && n.isPlainObject(t) ? n.merge(e, t) : n.isPlainObject(t) ? n.merge({}, t) : n.isArray(t) ? t.slice() : t
                    }

                    function s(r) {
                        return n.isUndefined(t[r]) ? n.isUndefined(e[r]) ? void 0 : i(void 0, e[r]) : i(e[r], t[r])
                    }

                    function o(e) {
                        if (!n.isUndefined(t[e])) return i(void 0, t[e])
                    }

                    function a(r) {
                        return n.isUndefined(t[r]) ? n.isUndefined(e[r]) ? void 0 : i(void 0, e[r]) : i(void 0, t[r])
                    }

                    function c(r) {
                        return r in t ? i(e[r], t[r]) : r in e ? i(void 0, e[r]) : void 0
                    }
                    var u = {
                        url: o,
                        method: o,
                        data: o,
                        baseURL: a,
                        transformRequest: a,
                        transformResponse: a,
                        paramsSerializer: a,
                        timeout: a,
                        timeoutMessage: a,
                        withCredentials: a,
                        adapter: a,
                        responseType: a,
                        xsrfCookieName: a,
                        xsrfHeaderName: a,
                        onUploadProgress: a,
                        onDownloadProgress: a,
                        decompress: a,
                        maxContentLength: a,
                        maxBodyLength: a,
                        beforeRedirect: a,
                        transport: a,
                        httpAgent: a,
                        httpsAgent: a,
                        cancelToken: a,
                        socketPath: a,
                        responseEncoding: a,
                        validateStatus: c
                    };
                    return n.forEach(Object.keys(e).concat(Object.keys(t)), (function (e) {
                        var t = u[e] || s,
                            i = t(e);
                        n.isUndefined(i) && t !== c || (r[e] = i)
                    })), r
                }
            },
            96038: (e, t, r) => {
                "use strict";
                var n = r(72232);
                e.exports = function (e, t, r) {
                    var i = r.config.validateStatus;
                    r.status && i && !i(r.status) ? t(new n("Request failed with status code " + r.status, [n.ERR_BAD_REQUEST, n.ERR_BAD_RESPONSE][Math.floor(r.status / 100) - 4], r.config, r.request, r)) : e(r)
                }
            },
            41503: (e, t, r) => {
                "use strict";
                var n = r(79870),
                    i = r(23778);
                e.exports = function (e, t, r) {
                    var s = this || i;
                    return n.forEach(r, (function (r) {
                        e = r.call(s, e, t)
                    })), e
                }
            },
            23778: (e, t, r) => {
                "use strict";
                var n = r(79870),
                    i = r(44348),
                    s = r(72232),
                    o = r(20498),
                    a = r(47091),
                    c = {
                        "Content-Type": "application/x-www-form-urlencoded"
                    };

                function u(e, t) {
                    !n.isUndefined(e) && n.isUndefined(e["Content-Type"]) && (e["Content-Type"] = t)
                }
                var l = {
                    transitional: o,
                    adapter: function () {
                        var e;
                        return ("undefined" !== typeof XMLHttpRequest || "undefined" !== typeof process && "[object process]" === Object.prototype.toString.call(process)) && (e = r(1768)), e
                    }(),
                    transformRequest: [function (e, t) {
                        if (i(t, "Accept"), i(t, "Content-Type"), n.isFormData(e) || n.isArrayBuffer(e) || n.isBuffer(e) || n.isStream(e) || n.isFile(e) || n.isBlob(e)) return e;
                        if (n.isArrayBufferView(e)) return e.buffer;
                        if (n.isURLSearchParams(e)) return u(t, "application/x-www-form-urlencoded;charset=utf-8"), e.toString();
                        var r, s = n.isObject(e),
                            o = t && t["Content-Type"];
                        if ((r = n.isFileList(e)) || s && "multipart/form-data" === o) {
                            var c = this.env && this.env.FormData;
                            return a(r ? {
                                "files[]": e
                            } : e, c && new c)
                        }
                        return s || "application/json" === o ? (u(t, "application/json"), function (e, t, r) {
                            if (n.isString(e)) try {
                                return (t || JSON.parse)(e), n.trim(e)
                            } catch (i) {
                                if ("SyntaxError" !== i.name) throw i
                            }
                            return (r || JSON.stringify)(e)
                        }(e)) : e
                    }],
                    transformResponse: [function (e) {
                        var t = this.transitional || l.transitional,
                            r = t && t.silentJSONParsing,
                            i = t && t.forcedJSONParsing,
                            o = !r && "json" === this.responseType;
                        if (o || i && n.isString(e) && e.length) try {
                            return JSON.parse(e)
                        } catch (a) {
                            if (o) {
                                if ("SyntaxError" === a.name) throw s.from(a, s.ERR_BAD_RESPONSE, this, null, this.response);
                                throw a
                            }
                        }
                        return e
                    }],
                    timeout: 0,
                    xsrfCookieName: "XSRF-TOKEN",
                    xsrfHeaderName: "X-XSRF-TOKEN",
                    maxContentLength: -1,
                    maxBodyLength: -1,
                    env: {
                        FormData: r(61323)
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
                n.forEach(["delete", "get", "head"], (function (e) {
                    l.headers[e] = {}
                })), n.forEach(["post", "put", "patch"], (function (e) {
                    l.headers[e] = n.merge(c)
                })), e.exports = l
            },
            20498: e => {
                "use strict";
                e.exports = {
                    silentJSONParsing: !0,
                    forcedJSONParsing: !0,
                    clarifyTimeoutError: !1
                }
            },
            44765: e => {
                e.exports = {
                    version: "0.27.2"
                }
            },
            76832: e => {
                "use strict";
                e.exports = function (e, t) {
                    return function () {
                        for (var r = new Array(arguments.length), n = 0; n < r.length; n++) r[n] = arguments[n];
                        return e.apply(t, r)
                    }
                }
            },
            62865: (e, t, r) => {
                "use strict";
                var n = r(79870);

                function i(e) {
                    return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]")
                }
                e.exports = function (e, t, r) {
                    if (!t) return e;
                    var s;
                    if (r) s = r(t);
                    else if (n.isURLSearchParams(t)) s = t.toString();
                    else {
                        var o = [];
                        n.forEach(t, (function (e, t) {
                            null !== e && "undefined" !== typeof e && (n.isArray(e) ? t += "[]" : e = [e], n.forEach(e, (function (e) {
                                n.isDate(e) ? e = e.toISOString() : n.isObject(e) && (e = JSON.stringify(e)), o.push(i(t) + "=" + i(e))
                            })))
                        })), s = o.join("&")
                    }
                    if (s) {
                        var a = e.indexOf("#"); - 1 !== a && (e = e.slice(0, a)), e += (-1 === e.indexOf("?") ? "?" : "&") + s
                    }
                    return e
                }
            },
            38829: e => {
                "use strict";
                e.exports = function (e, t) {
                    return t ? e.replace(/\/+$/, "") + "/" + t.replace(/^\/+/, "") : e
                }
            },
            82050: (e, t, r) => {
                "use strict";
                var n = r(79870);
                e.exports = n.isStandardBrowserEnv() ? {
                    write: function (e, t, r, i, s, o) {
                        var a = [];
                        a.push(e + "=" + encodeURIComponent(t)), n.isNumber(r) && a.push("expires=" + new Date(r).toGMTString()), n.isString(i) && a.push("path=" + i), n.isString(s) && a.push("domain=" + s), !0 === o && a.push("secure"), document.cookie = a.join("; ")
                    },
                    read: function (e) {
                        var t = document.cookie.match(new RegExp("(^|;\\s*)(" + e + ")=([^;]*)"));
                        return t ? decodeURIComponent(t[3]) : null
                    },
                    remove: function (e) {
                        this.write(e, "", Date.now() - 864e5)
                    }
                } : {
                    write: function () {},
                    read: function () {
                        return null
                    },
                    remove: function () {}
                }
            },
            13568: e => {
                "use strict";
                e.exports = function (e) {
                    return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)
                }
            },
            54879: (e, t, r) => {
                "use strict";
                var n = r(79870);
                e.exports = function (e) {
                    return n.isObject(e) && !0 === e.isAxiosError
                }
            },
            89666: (e, t, r) => {
                "use strict";
                var n = r(79870);
                e.exports = n.isStandardBrowserEnv() ? function () {
                    var e, t = /(msie|trident)/i.test(navigator.userAgent),
                        r = document.createElement("a");

                    function i(e) {
                        var n = e;
                        return t && (r.setAttribute("href", n), n = r.href), r.setAttribute("href", n), {
                            href: r.href,
                            protocol: r.protocol ? r.protocol.replace(/:$/, "") : "",
                            host: r.host,
                            search: r.search ? r.search.replace(/^\?/, "") : "",
                            hash: r.hash ? r.hash.replace(/^#/, "") : "",
                            hostname: r.hostname,
                            port: r.port,
                            pathname: "/" === r.pathname.charAt(0) ? r.pathname : "/" + r.pathname
                        }
                    }
                    return e = i(window.location.href),
                        function (t) {
                            var r = n.isString(t) ? i(t) : t;
                            return r.protocol === e.protocol && r.host === e.host
                        }
                }() : function () {
                    return !0
                }
            },
            44348: (e, t, r) => {
                "use strict";
                var n = r(79870);
                e.exports = function (e, t) {
                    n.forEach(e, (function (r, n) {
                        n !== t && n.toUpperCase() === t.toUpperCase() && (e[t] = r, delete e[n])
                    }))
                }
            },
            61323: e => {
                e.exports = null
            },
            44030: (e, t, r) => {
                "use strict";
                var n = r(79870),
                    i = ["age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent"];
                e.exports = function (e) {
                    var t, r, s, o = {};
                    return e ? (n.forEach(e.split("\n"), (function (e) {
                        if (s = e.indexOf(":"), t = n.trim(e.substr(0, s)).toLowerCase(), r = n.trim(e.substr(s + 1)), t) {
                            if (o[t] && i.indexOf(t) >= 0) return;
                            o[t] = "set-cookie" === t ? (o[t] ? o[t] : []).concat([r]) : o[t] ? o[t] + ", " + r : r
                        }
                    })), o) : o
                }
            },
            4862: e => {
                "use strict";
                e.exports = function (e) {
                    var t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
                    return t && t[1] || ""
                }
            },
            23456: e => {
                "use strict";
                e.exports = function (e) {
                    return function (t) {
                        return e.apply(null, t)
                    }
                }
            },
            47091: (e, t, r) => {
                "use strict";
                var n = r(55227).Buffer,
                    i = r(79870);
                e.exports = function (e, t) {
                    t = t || new FormData;
                    var r = [];

                    function s(e) {
                        return null === e ? "" : i.isDate(e) ? e.toISOString() : i.isArrayBuffer(e) || i.isTypedArray(e) ? "function" === typeof Blob ? new Blob([e]) : n.from(e) : e
                    }
                    return function e(n, o) {
                        if (i.isPlainObject(n) || i.isArray(n)) {
                            if (-1 !== r.indexOf(n)) throw Error("Circular reference detected in " + o);
                            r.push(n), i.forEach(n, (function (r, n) {
                                if (!i.isUndefined(r)) {
                                    var a, c = o ? o + "." + n : n;
                                    if (r && !o && "object" === typeof r)
                                        if (i.endsWith(n, "{}")) r = JSON.stringify(r);
                                        else if (i.endsWith(n, "[]") && (a = i.toArray(r))) return void a.forEach((function (e) {
                                        !i.isUndefined(e) && t.append(c, s(e))
                                    }));
                                    e(r, c)
                                }
                            })), r.pop()
                        } else t.append(o, s(n))
                    }(e), t
                }
            },
            94037: (e, t, r) => {
                "use strict";
                var n = r(44765).version,
                    i = r(72232),
                    s = {};
                ["object", "boolean", "number", "function", "string", "symbol"].forEach((function (e, t) {
                    s[e] = function (r) {
                        return typeof r === e || "a" + (t < 1 ? "n " : " ") + e
                    }
                }));
                var o = {};
                s.transitional = function (e, t, r) {
                    function s(e, t) {
                        return "[Axios v" + n + "] Transitional option '" + e + "'" + t + (r ? ". " + r : "")
                    }
                    return function (r, n, a) {
                        if (!1 === e) throw new i(s(n, " has been removed" + (t ? " in " + t : "")), i.ERR_DEPRECATED);
                        return t && !o[n] && (o[n] = !0, console.warn(s(n, " has been deprecated since v" + t + " and will be removed in the near future"))), !e || e(r, n, a)
                    }
                }, e.exports = {
                    assertOptions: function (e, t, r) {
                        if ("object" !== typeof e) throw new i("options must be an object", i.ERR_BAD_OPTION_VALUE);
                        for (var n = Object.keys(e), s = n.length; s-- > 0;) {
                            var o = n[s],
                                a = t[o];
                            if (a) {
                                var c = e[o],
                                    u = void 0 === c || a(c, o, e);
                                if (!0 !== u) throw new i("option " + o + " must be " + u, i.ERR_BAD_OPTION_VALUE)
                            } else if (!0 !== r) throw new i("Unknown option " + o, i.ERR_BAD_OPTION)
                        }
                    },
                    validators: s
                }
            },
            79870: (e, t, r) => {
                "use strict";
                var n, i = r(76832),
                    s = Object.prototype.toString,
                    o = (n = Object.create(null), function (e) {
                        var t = s.call(e);
                        return n[t] || (n[t] = t.slice(8, -1).toLowerCase())
                    });

                function a(e) {
                    return e = e.toLowerCase(),
                        function (t) {
                            return o(t) === e
                        }
                }

                function c(e) {
                    return Array.isArray(e)
                }

                function u(e) {
                    return "undefined" === typeof e
                }
                var l = a("ArrayBuffer");

                function h(e) {
                    return null !== e && "object" === typeof e
                }

                function d(e) {
                    if ("object" !== o(e)) return !1;
                    var t = Object.getPrototypeOf(e);
                    return null === t || t === Object.prototype
                }
                var f = a("Date"),
                    p = a("File"),
                    y = a("Blob"),
                    g = a("FileList");

                function w(e) {
                    return "[object Function]" === s.call(e)
                }
                var b = a("URLSearchParams");

                function m(e, t) {
                    if (null !== e && "undefined" !== typeof e)
                        if ("object" !== typeof e && (e = [e]), c(e))
                            for (var r = 0, n = e.length; r < n; r++) t.call(null, e[r], r, e);
                        else
                            for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && t.call(null, e[i], i, e)
                }
                var v, E = (v = "undefined" !== typeof Uint8Array && Object.getPrototypeOf(Uint8Array), function (e) {
                    return v && e instanceof v
                });
                e.exports = {
                    isArray: c,
                    isArrayBuffer: l,
                    isBuffer: function (e) {
                        return null !== e && !u(e) && null !== e.constructor && !u(e.constructor) && "function" === typeof e.constructor.isBuffer && e.constructor.isBuffer(e)
                    },
                    isFormData: function (e) {
                        var t = "[object FormData]";
                        return e && ("function" === typeof FormData && e instanceof FormData || s.call(e) === t || w(e.toString) && e.toString() === t)
                    },
                    isArrayBufferView: function (e) {
                        return "undefined" !== typeof ArrayBuffer && ArrayBuffer.isView ? ArrayBuffer.isView(e) : e && e.buffer && l(e.buffer)
                    },
                    isString: function (e) {
                        return "string" === typeof e
                    },
                    isNumber: function (e) {
                        return "number" === typeof e
                    },
                    isObject: h,
                    isPlainObject: d,
                    isUndefined: u,
                    isDate: f,
                    isFile: p,
                    isBlob: y,
                    isFunction: w,
                    isStream: function (e) {
                        return h(e) && w(e.pipe)
                    },
                    isURLSearchParams: b,
                    isStandardBrowserEnv: function () {
                        return ("undefined" === typeof navigator || "ReactNative" !== navigator.product && "NativeScript" !== navigator.product && "NS" !== navigator.product) && ("undefined" !== typeof window && "undefined" !== typeof document)
                    },
                    forEach: m,
                    merge: function e() {
                        var t = {};

                        function r(r, n) {
                            d(t[n]) && d(r) ? t[n] = e(t[n], r) : d(r) ? t[n] = e({}, r) : c(r) ? t[n] = r.slice() : t[n] = r
                        }
                        for (var n = 0, i = arguments.length; n < i; n++) m(arguments[n], r);
                        return t
                    },
                    extend: function (e, t, r) {
                        return m(t, (function (t, n) {
                            e[n] = r && "function" === typeof t ? i(t, r) : t
                        })), e
                    },
                    trim: function (e) {
                        return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "")
                    },
                    stripBOM: function (e) {
                        return 65279 === e.charCodeAt(0) && (e = e.slice(1)), e
                    },
                    inherits: function (e, t, r, n) {
                        e.prototype = Object.create(t.prototype, n), e.prototype.constructor = e, r && Object.assign(e.prototype, r)
                    },
                    toFlatObject: function (e, t, r) {
                        var n, i, s, o = {};
                        t = t || {};
                        do {
                            for (i = (n = Object.getOwnPropertyNames(e)).length; i-- > 0;) o[s = n[i]] || (t[s] = e[s], o[s] = !0);
                            e = Object.getPrototypeOf(e)
                        } while (e && (!r || r(e, t)) && e !== Object.prototype);
                        return t
                    },
                    kindOf: o,
                    kindOfTest: a,
                    endsWith: function (e, t, r) {
                        e = String(e), (void 0 === r || r > e.length) && (r = e.length), r -= t.length;
                        var n = e.indexOf(t, r);
                        return -1 !== n && n === r
                    },
                    toArray: function (e) {
                        if (!e) return null;
                        var t = e.length;
                        if (u(t)) return null;
                        for (var r = new Array(t); t-- > 0;) r[t] = e[t];
                        return r
                    },
                    isTypedArray: E,
                    isFileList: g
                }
            },
            97326: (e, t) => {
                "use strict";
                t.byteLength = function (e) {
                    var t = c(e),
                        r = t[0],
                        n = t[1];
                    return 3 * (r + n) / 4 - n
                }, t.toByteArray = function (e) {
                    var t, r, s = c(e),
                        o = s[0],
                        a = s[1],
                        u = new i(function (e, t, r) {
                            return 3 * (t + r) / 4 - r
                        }(0, o, a)),
                        l = 0,
                        h = a > 0 ? o - 4 : o;
                    for (r = 0; r < h; r += 4) t = n[e.charCodeAt(r)] << 18 | n[e.charCodeAt(r + 1)] << 12 | n[e.charCodeAt(r + 2)] << 6 | n[e.charCodeAt(r + 3)], u[l++] = t >> 16 & 255, u[l++] = t >> 8 & 255, u[l++] = 255 & t;
                    2 === a && (t = n[e.charCodeAt(r)] << 2 | n[e.charCodeAt(r + 1)] >> 4, u[l++] = 255 & t);
                    1 === a && (t = n[e.charCodeAt(r)] << 10 | n[e.charCodeAt(r + 1)] << 4 | n[e.charCodeAt(r + 2)] >> 2, u[l++] = t >> 8 & 255, u[l++] = 255 & t);
                    return u
                }, t.fromByteArray = function (e) {
                    for (var t, n = e.length, i = n % 3, s = [], o = 16383, a = 0, c = n - i; a < c; a += o) s.push(u(e, a, a + o > c ? c : a + o));
                    1 === i ? (t = e[n - 1], s.push(r[t >> 2] + r[t << 4 & 63] + "==")) : 2 === i && (t = (e[n - 2] << 8) + e[n - 1], s.push(r[t >> 10] + r[t >> 4 & 63] + r[t << 2 & 63] + "="));
                    return s.join("")
                };
                for (var r = [], n = [], i = "undefined" !== typeof Uint8Array ? Uint8Array : Array, s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", o = 0, a = s.length; o < a; ++o) r[o] = s[o], n[s.charCodeAt(o)] = o;

                function c(e) {
                    var t = e.length;
                    if (t % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
                    var r = e.indexOf("=");
                    return -1 === r && (r = t), [r, r === t ? 0 : 4 - r % 4]
                }

                function u(e, t, n) {
                    for (var i, s, o = [], a = t; a < n; a += 3) i = (e[a] << 16 & 16711680) + (e[a + 1] << 8 & 65280) + (255 & e[a + 2]), o.push(r[(s = i) >> 18 & 63] + r[s >> 12 & 63] + r[s >> 6 & 63] + r[63 & s]);
                    return o.join("")
                }
                n["-".charCodeAt(0)] = 62, n["_".charCodeAt(0)] = 63
            },
            55227: (e, t, r) => {
                "use strict";
                const n = r(97326),
                    i = r(14692),
                    s = "function" === typeof Symbol && "function" === typeof Symbol.for ? Symbol.for("nodejs.util.inspect.custom") : null;
                t.Buffer = c, t.INSPECT_MAX_BYTES = 50;
                const o = 2147483647;

                function a(e) {
                    if (e > o) throw new RangeError('The value "' + e + '" is invalid for option "size"');
                    const t = new Uint8Array(e);
                    return Object.setPrototypeOf(t, c.prototype), t
                }

                function c(e, t, r) {
                    if ("number" === typeof e) {
                        if ("string" === typeof t) throw new TypeError('The "string" argument must be of type string. Received type number');
                        return h(e)
                    }
                    return u(e, t, r)
                }

                function u(e, t, r) {
                    if ("string" === typeof e) return function (e, t) {
                        "string" === typeof t && "" !== t || (t = "utf8");
                        if (!c.isEncoding(t)) throw new TypeError("Unknown encoding: " + t);
                        const r = 0 | y(e, t);
                        let n = a(r);
                        const i = n.write(e, t);
                        i !== r && (n = n.slice(0, i));
                        return n
                    }(e, t);
                    if (ArrayBuffer.isView(e)) return function (e) {
                        if (J(e, Uint8Array)) {
                            const t = new Uint8Array(e);
                            return f(t.buffer, t.byteOffset, t.byteLength)
                        }
                        return d(e)
                    }(e);
                    if (null == e) throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof e);
                    if (J(e, ArrayBuffer) || e && J(e.buffer, ArrayBuffer)) return f(e, t, r);
                    if ("undefined" !== typeof SharedArrayBuffer && (J(e, SharedArrayBuffer) || e && J(e.buffer, SharedArrayBuffer))) return f(e, t, r);
                    if ("number" === typeof e) throw new TypeError('The "value" argument must not be of type number. Received type number');
                    const n = e.valueOf && e.valueOf();
                    if (null != n && n !== e) return c.from(n, t, r);
                    const i = function (e) {
                        if (c.isBuffer(e)) {
                            const t = 0 | p(e.length),
                                r = a(t);
                            return 0 === r.length || e.copy(r, 0, 0, t), r
                        }
                        if (void 0 !== e.length) return "number" !== typeof e.length || Y(e.length) ? a(0) : d(e);
                        if ("Buffer" === e.type && Array.isArray(e.data)) return d(e.data)
                    }(e);
                    if (i) return i;
                    if ("undefined" !== typeof Symbol && null != Symbol.toPrimitive && "function" === typeof e[Symbol.toPrimitive]) return c.from(e[Symbol.toPrimitive]("string"), t, r);
                    throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof e)
                }

                function l(e) {
                    if ("number" !== typeof e) throw new TypeError('"size" argument must be of type number');
                    if (e < 0) throw new RangeError('The value "' + e + '" is invalid for option "size"')
                }

                function h(e) {
                    return l(e), a(e < 0 ? 0 : 0 | p(e))
                }

                function d(e) {
                    const t = e.length < 0 ? 0 : 0 | p(e.length),
                        r = a(t);
                    for (let n = 0; n < t; n += 1) r[n] = 255 & e[n];
                    return r
                }

                function f(e, t, r) {
                    if (t < 0 || e.byteLength < t) throw new RangeError('"offset" is outside of buffer bounds');
                    if (e.byteLength < t + (r || 0)) throw new RangeError('"length" is outside of buffer bounds');
                    let n;
                    return n = void 0 === t && void 0 === r ? new Uint8Array(e) : void 0 === r ? new Uint8Array(e, t) : new Uint8Array(e, t, r), Object.setPrototypeOf(n, c.prototype), n
                }

                function p(e) {
                    if (e >= o) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + o.toString(16) + " bytes");
                    return 0 | e
                }

                function y(e, t) {
                    if (c.isBuffer(e)) return e.length;
                    if (ArrayBuffer.isView(e) || J(e, ArrayBuffer)) return e.byteLength;
                    if ("string" !== typeof e) throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof e);
                    const r = e.length,
                        n = arguments.length > 2 && !0 === arguments[2];
                    if (!n && 0 === r) return 0;
                    let i = !1;
                    for (;;) switch (t) {
                        case "ascii":
                        case "latin1":
                        case "binary":
                            return r;
                        case "utf8":
                        case "utf-8":
                            return V(e).length;
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return 2 * r;
                        case "hex":
                            return r >>> 1;
                        case "base64":
                            return $(e).length;
                        default:
                            if (i) return n ? -1 : V(e).length;
                            t = ("" + t).toLowerCase(), i = !0
                    }
                }

                function g(e, t, r) {
                    let n = !1;
                    if ((void 0 === t || t < 0) && (t = 0), t > this.length) return "";
                    if ((void 0 === r || r > this.length) && (r = this.length), r <= 0) return "";
                    if ((r >>>= 0) <= (t >>>= 0)) return "";
                    for (e || (e = "utf8");;) switch (e) {
                        case "hex":
                            return I(this, t, r);
                        case "utf8":
                        case "utf-8":
                            return U(this, t, r);
                        case "ascii":
                            return R(this, t, r);
                        case "latin1":
                        case "binary":
                            return B(this, t, r);
                        case "base64":
                            return T(this, t, r);
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return z(this, t, r);
                        default:
                            if (n) throw new TypeError("Unknown encoding: " + e);
                            e = (e + "").toLowerCase(), n = !0
                    }
                }

                function w(e, t, r) {
                    const n = e[t];
                    e[t] = e[r], e[r] = n
                }

                function b(e, t, r, n, i) {
                    if (0 === e.length) return -1;
                    if ("string" === typeof r ? (n = r, r = 0) : r > 2147483647 ? r = 2147483647 : r < -2147483648 && (r = -2147483648), Y(r = +r) && (r = i ? 0 : e.length - 1), r < 0 && (r = e.length + r), r >= e.length) {
                        if (i) return -1;
                        r = e.length - 1
                    } else if (r < 0) {
                        if (!i) return -1;
                        r = 0
                    }
                    if ("string" === typeof t && (t = c.from(t, n)), c.isBuffer(t)) return 0 === t.length ? -1 : m(e, t, r, n, i);
                    if ("number" === typeof t) return t &= 255, "function" === typeof Uint8Array.prototype.indexOf ? i ? Uint8Array.prototype.indexOf.call(e, t, r) : Uint8Array.prototype.lastIndexOf.call(e, t, r) : m(e, [t], r, n, i);
                    throw new TypeError("val must be string, number or Buffer")
                }

                function m(e, t, r, n, i) {
                    let s, o = 1,
                        a = e.length,
                        c = t.length;
                    if (void 0 !== n && ("ucs2" === (n = String(n).toLowerCase()) || "ucs-2" === n || "utf16le" === n || "utf-16le" === n)) {
                        if (e.length < 2 || t.length < 2) return -1;
                        o = 2, a /= 2, c /= 2, r /= 2
                    }

                    function u(e, t) {
                        return 1 === o ? e[t] : e.readUInt16BE(t * o)
                    }
                    if (i) {
                        let n = -1;
                        for (s = r; s < a; s++)
                            if (u(e, s) === u(t, -1 === n ? 0 : s - n)) {
                                if (-1 === n && (n = s), s - n + 1 === c) return n * o
                            } else -1 !== n && (s -= s - n), n = -1
                    } else
                        for (r + c > a && (r = a - c), s = r; s >= 0; s--) {
                            let r = !0;
                            for (let n = 0; n < c; n++)
                                if (u(e, s + n) !== u(t, n)) {
                                    r = !1;
                                    break
                                } if (r) return s
                        }
                    return -1
                }

                function v(e, t, r, n) {
                    r = Number(r) || 0;
                    const i = e.length - r;
                    n ? (n = Number(n)) > i && (n = i) : n = i;
                    const s = t.length;
                    let o;
                    for (n > s / 2 && (n = s / 2), o = 0; o < n; ++o) {
                        const n = parseInt(t.substr(2 * o, 2), 16);
                        if (Y(n)) return o;
                        e[r + o] = n
                    }
                    return o
                }

                function E(e, t, r, n) {
                    return K(V(t, e.length - r), e, r, n)
                }

                function A(e, t, r, n) {
                    return K(function (e) {
                        const t = [];
                        for (let r = 0; r < e.length; ++r) t.push(255 & e.charCodeAt(r));
                        return t
                    }(t), e, r, n)
                }

                function _(e, t, r, n) {
                    return K($(t), e, r, n)
                }

                function x(e, t, r, n) {
                    return K(function (e, t) {
                        let r, n, i;
                        const s = [];
                        for (let o = 0; o < e.length && !((t -= 2) < 0); ++o) r = e.charCodeAt(o), n = r >> 8, i = r % 256, s.push(i), s.push(n);
                        return s
                    }(t, e.length - r), e, r, n)
                }

                function T(e, t, r) {
                    return 0 === t && r === e.length ? n.fromByteArray(e) : n.fromByteArray(e.slice(t, r))
                }

                function U(e, t, r) {
                    r = Math.min(e.length, r);
                    const n = [];
                    let i = t;
                    for (; i < r;) {
                        const t = e[i];
                        let s = null,
                            o = t > 239 ? 4 : t > 223 ? 3 : t > 191 ? 2 : 1;
                        if (i + o <= r) {
                            let r, n, a, c;
                            switch (o) {
                                case 1:
                                    t < 128 && (s = t);
                                    break;
                                case 2:
                                    r = e[i + 1], 128 === (192 & r) && (c = (31 & t) << 6 | 63 & r, c > 127 && (s = c));
                                    break;
                                case 3:
                                    r = e[i + 1], n = e[i + 2], 128 === (192 & r) && 128 === (192 & n) && (c = (15 & t) << 12 | (63 & r) << 6 | 63 & n, c > 2047 && (c < 55296 || c > 57343) && (s = c));
                                    break;
                                case 4:
                                    r = e[i + 1], n = e[i + 2], a = e[i + 3], 128 === (192 & r) && 128 === (192 & n) && 128 === (192 & a) && (c = (15 & t) << 18 | (63 & r) << 12 | (63 & n) << 6 | 63 & a, c > 65535 && c < 1114112 && (s = c))
                            }
                        }
                        null === s ? (s = 65533, o = 1) : s > 65535 && (s -= 65536, n.push(s >>> 10 & 1023 | 55296), s = 56320 | 1023 & s), n.push(s), i += o
                    }
                    return function (e) {
                        const t = e.length;
                        if (t <= S) return String.fromCharCode.apply(String, e);
                        let r = "",
                            n = 0;
                        for (; n < t;) r += String.fromCharCode.apply(String, e.slice(n, n += S));
                        return r
                    }(n)
                }
                c.TYPED_ARRAY_SUPPORT = function () {
                    try {
                        const e = new Uint8Array(1),
                            t = {
                                foo: function () {
                                    return 42
                                }
                            };
                        return Object.setPrototypeOf(t, Uint8Array.prototype), Object.setPrototypeOf(e, t), 42 === e.foo()
                    } catch (e) {
                        return !1
                    }
                }(), c.TYPED_ARRAY_SUPPORT || "undefined" === typeof console || "function" !== typeof console.error || console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."), Object.defineProperty(c.prototype, "parent", {
                    enumerable: !0,
                    get: function () {
                        if (c.isBuffer(this)) return this.buffer
                    }
                }), Object.defineProperty(c.prototype, "offset", {
                    enumerable: !0,
                    get: function () {
                        if (c.isBuffer(this)) return this.byteOffset
                    }
                }), c.poolSize = 8192, c.from = function (e, t, r) {
                    return u(e, t, r)
                }, Object.setPrototypeOf(c.prototype, Uint8Array.prototype), Object.setPrototypeOf(c, Uint8Array), c.alloc = function (e, t, r) {
                    return function (e, t, r) {
                        return l(e), e <= 0 ? a(e) : void 0 !== t ? "string" === typeof r ? a(e).fill(t, r) : a(e).fill(t) : a(e)
                    }(e, t, r)
                }, c.allocUnsafe = function (e) {
                    return h(e)
                }, c.allocUnsafeSlow = function (e) {
                    return h(e)
                }, c.isBuffer = function (e) {
                    return null != e && !0 === e._isBuffer && e !== c.prototype
                }, c.compare = function (e, t) {
                    if (J(e, Uint8Array) && (e = c.from(e, e.offset, e.byteLength)), J(t, Uint8Array) && (t = c.from(t, t.offset, t.byteLength)), !c.isBuffer(e) || !c.isBuffer(t)) throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
                    if (e === t) return 0;
                    let r = e.length,
                        n = t.length;
                    for (let i = 0, s = Math.min(r, n); i < s; ++i)
                        if (e[i] !== t[i]) {
                            r = e[i], n = t[i];
                            break
                        } return r < n ? -1 : n < r ? 1 : 0
                }, c.isEncoding = function (e) {
                    switch (String(e).toLowerCase()) {
                        case "hex":
                        case "utf8":
                        case "utf-8":
                        case "ascii":
                        case "latin1":
                        case "binary":
                        case "base64":
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return !0;
                        default:
                            return !1
                    }
                }, c.concat = function (e, t) {
                    if (!Array.isArray(e)) throw new TypeError('"list" argument must be an Array of Buffers');
                    if (0 === e.length) return c.alloc(0);
                    let r;
                    if (void 0 === t)
                        for (t = 0, r = 0; r < e.length; ++r) t += e[r].length;
                    const n = c.allocUnsafe(t);
                    let i = 0;
                    for (r = 0; r < e.length; ++r) {
                        let t = e[r];
                        if (J(t, Uint8Array)) i + t.length > n.length ? (c.isBuffer(t) || (t = c.from(t)), t.copy(n, i)) : Uint8Array.prototype.set.call(n, t, i);
                        else {
                            if (!c.isBuffer(t)) throw new TypeError('"list" argument must be an Array of Buffers');
                            t.copy(n, i)
                        }
                        i += t.length
                    }
                    return n
                }, c.byteLength = y, c.prototype._isBuffer = !0, c.prototype.swap16 = function () {
                    const e = this.length;
                    if (e % 2 !== 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
                    for (let t = 0; t < e; t += 2) w(this, t, t + 1);
                    return this
                }, c.prototype.swap32 = function () {
                    const e = this.length;
                    if (e % 4 !== 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
                    for (let t = 0; t < e; t += 4) w(this, t, t + 3), w(this, t + 1, t + 2);
                    return this
                }, c.prototype.swap64 = function () {
                    const e = this.length;
                    if (e % 8 !== 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
                    for (let t = 0; t < e; t += 8) w(this, t, t + 7), w(this, t + 1, t + 6), w(this, t + 2, t + 5), w(this, t + 3, t + 4);
                    return this
                }, c.prototype.toString = function () {
                    const e = this.length;
                    return 0 === e ? "" : 0 === arguments.length ? U(this, 0, e) : g.apply(this, arguments)
                }, c.prototype.toLocaleString = c.prototype.toString, c.prototype.equals = function (e) {
                    if (!c.isBuffer(e)) throw new TypeError("Argument must be a Buffer");
                    return this === e || 0 === c.compare(this, e)
                }, c.prototype.inspect = function () {
                    let e = "";
                    const r = t.INSPECT_MAX_BYTES;
                    return e = this.toString("hex", 0, r).replace(/(.{2})/g, "$1 ").trim(), this.length > r && (e += " ... "), "<Buffer " + e + ">"
                }, s && (c.prototype[s] = c.prototype.inspect), c.prototype.compare = function (e, t, r, n, i) {
                    if (J(e, Uint8Array) && (e = c.from(e, e.offset, e.byteLength)), !c.isBuffer(e)) throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof e);
                    if (void 0 === t && (t = 0), void 0 === r && (r = e ? e.length : 0), void 0 === n && (n = 0), void 0 === i && (i = this.length), t < 0 || r > e.length || n < 0 || i > this.length) throw new RangeError("out of range index");
                    if (n >= i && t >= r) return 0;
                    if (n >= i) return -1;
                    if (t >= r) return 1;
                    if (this === e) return 0;
                    let s = (i >>>= 0) - (n >>>= 0),
                        o = (r >>>= 0) - (t >>>= 0);
                    const a = Math.min(s, o),
                        u = this.slice(n, i),
                        l = e.slice(t, r);
                    for (let c = 0; c < a; ++c)
                        if (u[c] !== l[c]) {
                            s = u[c], o = l[c];
                            break
                        } return s < o ? -1 : o < s ? 1 : 0
                }, c.prototype.includes = function (e, t, r) {
                    return -1 !== this.indexOf(e, t, r)
                }, c.prototype.indexOf = function (e, t, r) {
                    return b(this, e, t, r, !0)
                }, c.prototype.lastIndexOf = function (e, t, r) {
                    return b(this, e, t, r, !1)
                }, c.prototype.write = function (e, t, r, n) {
                    if (void 0 === t) n = "utf8", r = this.length, t = 0;
                    else if (void 0 === r && "string" === typeof t) n = t, r = this.length, t = 0;
                    else {
                        if (!isFinite(t)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                        t >>>= 0, isFinite(r) ? (r >>>= 0, void 0 === n && (n = "utf8")) : (n = r, r = void 0)
                    }
                    const i = this.length - t;
                    if ((void 0 === r || r > i) && (r = i), e.length > 0 && (r < 0 || t < 0) || t > this.length) throw new RangeError("Attempt to write outside buffer bounds");
                    n || (n = "utf8");
                    let s = !1;
                    for (;;) switch (n) {
                        case "hex":
                            return v(this, e, t, r);
                        case "utf8":
                        case "utf-8":
                            return E(this, e, t, r);
                        case "ascii":
                        case "latin1":
                        case "binary":
                            return A(this, e, t, r);
                        case "base64":
                            return _(this, e, t, r);
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return x(this, e, t, r);
                        default:
                            if (s) throw new TypeError("Unknown encoding: " + n);
                            n = ("" + n).toLowerCase(), s = !0
                    }
                }, c.prototype.toJSON = function () {
                    return {
                        type: "Buffer",
                        data: Array.prototype.slice.call(this._arr || this, 0)
                    }
                };
                const S = 4096;

                function R(e, t, r) {
                    let n = "";
                    r = Math.min(e.length, r);
                    for (let i = t; i < r; ++i) n += String.fromCharCode(127 & e[i]);
                    return n
                }

                function B(e, t, r) {
                    let n = "";
                    r = Math.min(e.length, r);
                    for (let i = t; i < r; ++i) n += String.fromCharCode(e[i]);
                    return n
                }

                function I(e, t, r) {
                    const n = e.length;
                    (!t || t < 0) && (t = 0), (!r || r < 0 || r > n) && (r = n);
                    let i = "";
                    for (let s = t; s < r; ++s) i += X[e[s]];
                    return i
                }

                function z(e, t, r) {
                    const n = e.slice(t, r);
                    let i = "";
                    for (let s = 0; s < n.length - 1; s += 2) i += String.fromCharCode(n[s] + 256 * n[s + 1]);
                    return i
                }

                function O(e, t, r) {
                    if (e % 1 !== 0 || e < 0) throw new RangeError("offset is not uint");
                    if (e + t > r) throw new RangeError("Trying to access beyond buffer length")
                }

                function L(e, t, r, n, i, s) {
                    if (!c.isBuffer(e)) throw new TypeError('"buffer" argument must be a Buffer instance');
                    if (t > i || t < s) throw new RangeError('"value" argument is out of bounds');
                    if (r + n > e.length) throw new RangeError("Index out of range")
                }

                function q(e, t, r, n, i) {
                    j(t, n, i, e, r, 7);
                    let s = Number(t & BigInt(4294967295));
                    e[r++] = s, s >>= 8, e[r++] = s, s >>= 8, e[r++] = s, s >>= 8, e[r++] = s;
                    let o = Number(t >> BigInt(32) & BigInt(4294967295));
                    return e[r++] = o, o >>= 8, e[r++] = o, o >>= 8, e[r++] = o, o >>= 8, e[r++] = o, r
                }

                function k(e, t, r, n, i) {
                    j(t, n, i, e, r, 7);
                    let s = Number(t & BigInt(4294967295));
                    e[r + 7] = s, s >>= 8, e[r + 6] = s, s >>= 8, e[r + 5] = s, s >>= 8, e[r + 4] = s;
                    let o = Number(t >> BigInt(32) & BigInt(4294967295));
                    return e[r + 3] = o, o >>= 8, e[r + 2] = o, o >>= 8, e[r + 1] = o, o >>= 8, e[r] = o, r + 8
                }

                function C(e, t, r, n, i, s) {
                    if (r + n > e.length) throw new RangeError("Index out of range");
                    if (r < 0) throw new RangeError("Index out of range")
                }

                function N(e, t, r, n, s) {
                    return t = +t, r >>>= 0, s || C(e, 0, r, 4), i.write(e, t, r, n, 23, 4), r + 4
                }

                function M(e, t, r, n, s) {
                    return t = +t, r >>>= 0, s || C(e, 0, r, 8), i.write(e, t, r, n, 52, 8), r + 8
                }
                c.prototype.slice = function (e, t) {
                    const r = this.length;
                    (e = ~~e) < 0 ? (e += r) < 0 && (e = 0) : e > r && (e = r), (t = void 0 === t ? r : ~~t) < 0 ? (t += r) < 0 && (t = 0) : t > r && (t = r), t < e && (t = e);
                    const n = this.subarray(e, t);
                    return Object.setPrototypeOf(n, c.prototype), n
                }, c.prototype.readUintLE = c.prototype.readUIntLE = function (e, t, r) {
                    e >>>= 0, t >>>= 0, r || O(e, t, this.length);
                    let n = this[e],
                        i = 1,
                        s = 0;
                    for (; ++s < t && (i *= 256);) n += this[e + s] * i;
                    return n
                }, c.prototype.readUintBE = c.prototype.readUIntBE = function (e, t, r) {
                    e >>>= 0, t >>>= 0, r || O(e, t, this.length);
                    let n = this[e + --t],
                        i = 1;
                    for (; t > 0 && (i *= 256);) n += this[e + --t] * i;
                    return n
                }, c.prototype.readUint8 = c.prototype.readUInt8 = function (e, t) {
                    return e >>>= 0, t || O(e, 1, this.length), this[e]
                }, c.prototype.readUint16LE = c.prototype.readUInt16LE = function (e, t) {
                    return e >>>= 0, t || O(e, 2, this.length), this[e] | this[e + 1] << 8
                }, c.prototype.readUint16BE = c.prototype.readUInt16BE = function (e, t) {
                    return e >>>= 0, t || O(e, 2, this.length), this[e] << 8 | this[e + 1]
                }, c.prototype.readUint32LE = c.prototype.readUInt32LE = function (e, t) {
                    return e >>>= 0, t || O(e, 4, this.length), (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + 16777216 * this[e + 3]
                }, c.prototype.readUint32BE = c.prototype.readUInt32BE = function (e, t) {
                    return e >>>= 0, t || O(e, 4, this.length), 16777216 * this[e] + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3])
                }, c.prototype.readBigUInt64LE = Z((function (e) {
                    F(e >>>= 0, "offset");
                    const t = this[e],
                        r = this[e + 7];
                    void 0 !== t && void 0 !== r || W(e, this.length - 8);
                    const n = t + 256 * this[++e] + 65536 * this[++e] + this[++e] * 2 ** 24,
                        i = this[++e] + 256 * this[++e] + 65536 * this[++e] + r * 2 ** 24;
                    return BigInt(n) + (BigInt(i) << BigInt(32))
                })), c.prototype.readBigUInt64BE = Z((function (e) {
                    F(e >>>= 0, "offset");
                    const t = this[e],
                        r = this[e + 7];
                    void 0 !== t && void 0 !== r || W(e, this.length - 8);
                    const n = t * 2 ** 24 + 65536 * this[++e] + 256 * this[++e] + this[++e],
                        i = this[++e] * 2 ** 24 + 65536 * this[++e] + 256 * this[++e] + r;
                    return (BigInt(n) << BigInt(32)) + BigInt(i)
                })), c.prototype.readIntLE = function (e, t, r) {
                    e >>>= 0, t >>>= 0, r || O(e, t, this.length);
                    let n = this[e],
                        i = 1,
                        s = 0;
                    for (; ++s < t && (i *= 256);) n += this[e + s] * i;
                    return i *= 128, n >= i && (n -= Math.pow(2, 8 * t)), n
                }, c.prototype.readIntBE = function (e, t, r) {
                    e >>>= 0, t >>>= 0, r || O(e, t, this.length);
                    let n = t,
                        i = 1,
                        s = this[e + --n];
                    for (; n > 0 && (i *= 256);) s += this[e + --n] * i;
                    return i *= 128, s >= i && (s -= Math.pow(2, 8 * t)), s
                }, c.prototype.readInt8 = function (e, t) {
                    return e >>>= 0, t || O(e, 1, this.length), 128 & this[e] ? -1 * (255 - this[e] + 1) : this[e]
                }, c.prototype.readInt16LE = function (e, t) {
                    e >>>= 0, t || O(e, 2, this.length);
                    const r = this[e] | this[e + 1] << 8;
                    return 32768 & r ? 4294901760 | r : r
                }, c.prototype.readInt16BE = function (e, t) {
                    e >>>= 0, t || O(e, 2, this.length);
                    const r = this[e + 1] | this[e] << 8;
                    return 32768 & r ? 4294901760 | r : r
                }, c.prototype.readInt32LE = function (e, t) {
                    return e >>>= 0, t || O(e, 4, this.length), this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24
                }, c.prototype.readInt32BE = function (e, t) {
                    return e >>>= 0, t || O(e, 4, this.length), this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]
                }, c.prototype.readBigInt64LE = Z((function (e) {
                    F(e >>>= 0, "offset");
                    const t = this[e],
                        r = this[e + 7];
                    void 0 !== t && void 0 !== r || W(e, this.length - 8);
                    const n = this[e + 4] + 256 * this[e + 5] + 65536 * this[e + 6] + (r << 24);
                    return (BigInt(n) << BigInt(32)) + BigInt(t + 256 * this[++e] + 65536 * this[++e] + this[++e] * 2 ** 24)
                })), c.prototype.readBigInt64BE = Z((function (e) {
                    F(e >>>= 0, "offset");
                    const t = this[e],
                        r = this[e + 7];
                    void 0 !== t && void 0 !== r || W(e, this.length - 8);
                    const n = (t << 24) + 65536 * this[++e] + 256 * this[++e] + this[++e];
                    return (BigInt(n) << BigInt(32)) + BigInt(this[++e] * 2 ** 24 + 65536 * this[++e] + 256 * this[++e] + r)
                })), c.prototype.readFloatLE = function (e, t) {
                    return e >>>= 0, t || O(e, 4, this.length), i.read(this, e, !0, 23, 4)
                }, c.prototype.readFloatBE = function (e, t) {
                    return e >>>= 0, t || O(e, 4, this.length), i.read(this, e, !1, 23, 4)
                }, c.prototype.readDoubleLE = function (e, t) {
                    return e >>>= 0, t || O(e, 8, this.length), i.read(this, e, !0, 52, 8)
                }, c.prototype.readDoubleBE = function (e, t) {
                    return e >>>= 0, t || O(e, 8, this.length), i.read(this, e, !1, 52, 8)
                }, c.prototype.writeUintLE = c.prototype.writeUIntLE = function (e, t, r, n) {
                    if (e = +e, t >>>= 0, r >>>= 0, !n) {
                        L(this, e, t, r, Math.pow(2, 8 * r) - 1, 0)
                    }
                    let i = 1,
                        s = 0;
                    for (this[t] = 255 & e; ++s < r && (i *= 256);) this[t + s] = e / i & 255;
                    return t + r
                }, c.prototype.writeUintBE = c.prototype.writeUIntBE = function (e, t, r, n) {
                    if (e = +e, t >>>= 0, r >>>= 0, !n) {
                        L(this, e, t, r, Math.pow(2, 8 * r) - 1, 0)
                    }
                    let i = r - 1,
                        s = 1;
                    for (this[t + i] = 255 & e; --i >= 0 && (s *= 256);) this[t + i] = e / s & 255;
                    return t + r
                }, c.prototype.writeUint8 = c.prototype.writeUInt8 = function (e, t, r) {
                    return e = +e, t >>>= 0, r || L(this, e, t, 1, 255, 0), this[t] = 255 & e, t + 1
                }, c.prototype.writeUint16LE = c.prototype.writeUInt16LE = function (e, t, r) {
                    return e = +e, t >>>= 0, r || L(this, e, t, 2, 65535, 0), this[t] = 255 & e, this[t + 1] = e >>> 8, t + 2
                }, c.prototype.writeUint16BE = c.prototype.writeUInt16BE = function (e, t, r) {
                    return e = +e, t >>>= 0, r || L(this, e, t, 2, 65535, 0), this[t] = e >>> 8, this[t + 1] = 255 & e, t + 2
                }, c.prototype.writeUint32LE = c.prototype.writeUInt32LE = function (e, t, r) {
                    return e = +e, t >>>= 0, r || L(this, e, t, 4, 4294967295, 0), this[t + 3] = e >>> 24, this[t + 2] = e >>> 16, this[t + 1] = e >>> 8, this[t] = 255 & e, t + 4
                }, c.prototype.writeUint32BE = c.prototype.writeUInt32BE = function (e, t, r) {
                    return e = +e, t >>>= 0, r || L(this, e, t, 4, 4294967295, 0), this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e, t + 4
                }, c.prototype.writeBigUInt64LE = Z((function (e) {
                    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
                    return q(this, e, t, BigInt(0), BigInt("0xffffffffffffffff"))
                })), c.prototype.writeBigUInt64BE = Z((function (e) {
                    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
                    return k(this, e, t, BigInt(0), BigInt("0xffffffffffffffff"))
                })), c.prototype.writeIntLE = function (e, t, r, n) {
                    if (e = +e, t >>>= 0, !n) {
                        const n = Math.pow(2, 8 * r - 1);
                        L(this, e, t, r, n - 1, -n)
                    }
                    let i = 0,
                        s = 1,
                        o = 0;
                    for (this[t] = 255 & e; ++i < r && (s *= 256);) e < 0 && 0 === o && 0 !== this[t + i - 1] && (o = 1), this[t + i] = (e / s >> 0) - o & 255;
                    return t + r
                }, c.prototype.writeIntBE = function (e, t, r, n) {
                    if (e = +e, t >>>= 0, !n) {
                        const n = Math.pow(2, 8 * r - 1);
                        L(this, e, t, r, n - 1, -n)
                    }
                    let i = r - 1,
                        s = 1,
                        o = 0;
                    for (this[t + i] = 255 & e; --i >= 0 && (s *= 256);) e < 0 && 0 === o && 0 !== this[t + i + 1] && (o = 1), this[t + i] = (e / s >> 0) - o & 255;
                    return t + r
                }, c.prototype.writeInt8 = function (e, t, r) {
                    return e = +e, t >>>= 0, r || L(this, e, t, 1, 127, -128), e < 0 && (e = 255 + e + 1), this[t] = 255 & e, t + 1
                }, c.prototype.writeInt16LE = function (e, t, r) {
                    return e = +e, t >>>= 0, r || L(this, e, t, 2, 32767, -32768), this[t] = 255 & e, this[t + 1] = e >>> 8, t + 2
                }, c.prototype.writeInt16BE = function (e, t, r) {
                    return e = +e, t >>>= 0, r || L(this, e, t, 2, 32767, -32768), this[t] = e >>> 8, this[t + 1] = 255 & e, t + 2
                }, c.prototype.writeInt32LE = function (e, t, r) {
                    return e = +e, t >>>= 0, r || L(this, e, t, 4, 2147483647, -2147483648), this[t] = 255 & e, this[t + 1] = e >>> 8, this[t + 2] = e >>> 16, this[t + 3] = e >>> 24, t + 4
                }, c.prototype.writeInt32BE = function (e, t, r) {
                    return e = +e, t >>>= 0, r || L(this, e, t, 4, 2147483647, -2147483648), e < 0 && (e = 4294967295 + e + 1), this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e, t + 4
                }, c.prototype.writeBigInt64LE = Z((function (e) {
                    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
                    return q(this, e, t, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"))
                })), c.prototype.writeBigInt64BE = Z((function (e) {
                    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
                    return k(this, e, t, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"))
                })), c.prototype.writeFloatLE = function (e, t, r) {
                    return N(this, e, t, !0, r)
                }, c.prototype.writeFloatBE = function (e, t, r) {
                    return N(this, e, t, !1, r)
                }, c.prototype.writeDoubleLE = function (e, t, r) {
                    return M(this, e, t, !0, r)
                }, c.prototype.writeDoubleBE = function (e, t, r) {
                    return M(this, e, t, !1, r)
                }, c.prototype.copy = function (e, t, r, n) {
                    if (!c.isBuffer(e)) throw new TypeError("argument should be a Buffer");
                    if (r || (r = 0), n || 0 === n || (n = this.length), t >= e.length && (t = e.length), t || (t = 0), n > 0 && n < r && (n = r), n === r) return 0;
                    if (0 === e.length || 0 === this.length) return 0;
                    if (t < 0) throw new RangeError("targetStart out of bounds");
                    if (r < 0 || r >= this.length) throw new RangeError("Index out of range");
                    if (n < 0) throw new RangeError("sourceEnd out of bounds");
                    n > this.length && (n = this.length), e.length - t < n - r && (n = e.length - t + r);
                    const i = n - r;
                    return this === e && "function" === typeof Uint8Array.prototype.copyWithin ? this.copyWithin(t, r, n) : Uint8Array.prototype.set.call(e, this.subarray(r, n), t), i
                }, c.prototype.fill = function (e, t, r, n) {
                    if ("string" === typeof e) {
                        if ("string" === typeof t ? (n = t, t = 0, r = this.length) : "string" === typeof r && (n = r, r = this.length), void 0 !== n && "string" !== typeof n) throw new TypeError("encoding must be a string");
                        if ("string" === typeof n && !c.isEncoding(n)) throw new TypeError("Unknown encoding: " + n);
                        if (1 === e.length) {
                            const t = e.charCodeAt(0);
                            ("utf8" === n && t < 128 || "latin1" === n) && (e = t)
                        }
                    } else "number" === typeof e ? e &= 255 : "boolean" === typeof e && (e = Number(e));
                    if (t < 0 || this.length < t || this.length < r) throw new RangeError("Out of range index");
                    if (r <= t) return this;
                    let i;
                    if (t >>>= 0, r = void 0 === r ? this.length : r >>> 0, e || (e = 0), "number" === typeof e)
                        for (i = t; i < r; ++i) this[i] = e;
                    else {
                        const s = c.isBuffer(e) ? e : c.from(e, n),
                            o = s.length;
                        if (0 === o) throw new TypeError('The value "' + e + '" is invalid for argument "value"');
                        for (i = 0; i < r - t; ++i) this[i + t] = s[i % o]
                    }
                    return this
                };
                const H = {};

                function P(e, t, r) {
                    H[e] = class extends r {
                        constructor() {
                            super(), Object.defineProperty(this, "message", {
                                value: t.apply(this, arguments),
                                writable: !0,
                                configurable: !0
                            }), this.name = "".concat(this.name, " [").concat(e, "]"), this.stack, delete this.name
                        }
                        get code() {
                            return e
                        }
                        set code(e) {
                            Object.defineProperty(this, "code", {
                                configurable: !0,
                                enumerable: !0,
                                value: e,
                                writable: !0
                            })
                        }
                        toString() {
                            return "".concat(this.name, " [").concat(e, "]: ").concat(this.message)
                        }
                    }
                }

                function D(e) {
                    let t = "",
                        r = e.length;
                    const n = "-" === e[0] ? 1 : 0;
                    for (; r >= n + 4; r -= 3) t = "_".concat(e.slice(r - 3, r)).concat(t);
                    return "".concat(e.slice(0, r)).concat(t)
                }

                function j(e, t, r, n, i, s) {
                    if (e > r || e < t) {
                        const n = "bigint" === typeof t ? "n" : "";
                        let i;
                        throw i = s > 3 ? 0 === t || t === BigInt(0) ? ">= 0".concat(n, " and < 2").concat(n, " ** ").concat(8 * (s + 1)).concat(n) : ">= -(2".concat(n, " ** ").concat(8 * (s + 1) - 1).concat(n, ") and < 2 ** ") + "".concat(8 * (s + 1) - 1).concat(n) : ">= ".concat(t).concat(n, " and <= ").concat(r).concat(n), new H.ERR_OUT_OF_RANGE("value", i, e)
                    }! function (e, t, r) {
                        F(t, "offset"), void 0 !== e[t] && void 0 !== e[t + r] || W(t, e.length - (r + 1))
                    }(n, i, s)
                }

                function F(e, t) {
                    if ("number" !== typeof e) throw new H.ERR_INVALID_ARG_TYPE(t, "number", e)
                }

                function W(e, t, r) {
                    if (Math.floor(e) !== e) throw F(e, r), new H.ERR_OUT_OF_RANGE(r || "offset", "an integer", e);
                    if (t < 0) throw new H.ERR_BUFFER_OUT_OF_BOUNDS;
                    throw new H.ERR_OUT_OF_RANGE(r || "offset", ">= ".concat(r ? 1 : 0, " and <= ").concat(t), e)
                }
                P("ERR_BUFFER_OUT_OF_BOUNDS", (function (e) {
                    return e ? "".concat(e, " is outside of buffer bounds") : "Attempt to access memory outside buffer bounds"
                }), RangeError), P("ERR_INVALID_ARG_TYPE", (function (e, t) {
                    return 'The "'.concat(e, '" argument must be of type number. Received type ').concat(typeof t)
                }), TypeError), P("ERR_OUT_OF_RANGE", (function (e, t, r) {
                    let n = 'The value of "'.concat(e, '" is out of range.'),
                        i = r;
                    return Number.isInteger(r) && Math.abs(r) > 2 ** 32 ? i = D(String(r)) : "bigint" === typeof r && (i = String(r), (r > BigInt(2) ** BigInt(32) || r < -(BigInt(2) ** BigInt(32))) && (i = D(i)), i += "n"), n += " It must be ".concat(t, ". Received ").concat(i), n
                }), RangeError);
                const G = /[^+/0-9A-Za-z-_]/g;

                function V(e, t) {
                    let r;
                    t = t || 1 / 0;
                    const n = e.length;
                    let i = null;
                    const s = [];
                    for (let o = 0; o < n; ++o) {
                        if (r = e.charCodeAt(o), r > 55295 && r < 57344) {
                            if (!i) {
                                if (r > 56319) {
                                    (t -= 3) > -1 && s.push(239, 191, 189);
                                    continue
                                }
                                if (o + 1 === n) {
                                    (t -= 3) > -1 && s.push(239, 191, 189);
                                    continue
                                }
                                i = r;
                                continue
                            }
                            if (r < 56320) {
                                (t -= 3) > -1 && s.push(239, 191, 189), i = r;
                                continue
                            }
                            r = 65536 + (i - 55296 << 10 | r - 56320)
                        } else i && (t -= 3) > -1 && s.push(239, 191, 189);
                        if (i = null, r < 128) {
                            if ((t -= 1) < 0) break;
                            s.push(r)
                        } else if (r < 2048) {
                            if ((t -= 2) < 0) break;
                            s.push(r >> 6 | 192, 63 & r | 128)
                        } else if (r < 65536) {
                            if ((t -= 3) < 0) break;
                            s.push(r >> 12 | 224, r >> 6 & 63 | 128, 63 & r | 128)
                        } else {
                            if (!(r < 1114112)) throw new Error("Invalid code point");
                            if ((t -= 4) < 0) break;
                            s.push(r >> 18 | 240, r >> 12 & 63 | 128, r >> 6 & 63 | 128, 63 & r | 128)
                        }
                    }
                    return s
                }

                function $(e) {
                    return n.toByteArray(function (e) {
                        if ((e = (e = e.split("=")[0]).trim().replace(G, "")).length < 2) return "";
                        for (; e.length % 4 !== 0;) e += "=";
                        return e
                    }(e))
                }

                function K(e, t, r, n) {
                    let i;
                    for (i = 0; i < n && !(i + r >= t.length || i >= e.length); ++i) t[i + r] = e[i];
                    return i
                }

                function J(e, t) {
                    return e instanceof t || null != e && null != e.constructor && null != e.constructor.name && e.constructor.name === t.name
                }

                function Y(e) {
                    return e !== e
                }
                const X = function () {
                    const e = "0123456789abcdef",
                        t = new Array(256);
                    for (let r = 0; r < 16; ++r) {
                        const n = 16 * r;
                        for (let i = 0; i < 16; ++i) t[n + i] = e[r] + e[i]
                    }
                    return t
                }();

                function Z(e) {
                    return "undefined" === typeof BigInt ? Q : e
                }

                function Q() {
                    throw new Error("BigInt not supported")
                }
            },
            77236: e => {
                e.exports = "object" == typeof self ? self.FormData : window.FormData
            },
            14692: (e, t) => {
                t.read = function (e, t, r, n, i) {
                    var s, o, a = 8 * i - n - 1,
                        c = (1 << a) - 1,
                        u = c >> 1,
                        l = -7,
                        h = r ? i - 1 : 0,
                        d = r ? -1 : 1,
                        f = e[t + h];
                    for (h += d, s = f & (1 << -l) - 1, f >>= -l, l += a; l > 0; s = 256 * s + e[t + h], h += d, l -= 8);
                    for (o = s & (1 << -l) - 1, s >>= -l, l += n; l > 0; o = 256 * o + e[t + h], h += d, l -= 8);
                    if (0 === s) s = 1 - u;
                    else {
                        if (s === c) return o ? NaN : 1 / 0 * (f ? -1 : 1);
                        o += Math.pow(2, n), s -= u
                    }
                    return (f ? -1 : 1) * o * Math.pow(2, s - n)
                }, t.write = function (e, t, r, n, i, s) {
                    var o, a, c, u = 8 * s - i - 1,
                        l = (1 << u) - 1,
                        h = l >> 1,
                        d = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
                        f = n ? 0 : s - 1,
                        p = n ? 1 : -1,
                        y = t < 0 || 0 === t && 1 / t < 0 ? 1 : 0;
                    for (t = Math.abs(t), isNaN(t) || t === 1 / 0 ? (a = isNaN(t) ? 1 : 0, o = l) : (o = Math.floor(Math.log(t) / Math.LN2), t * (c = Math.pow(2, -o)) < 1 && (o--, c *= 2), (t += o + h >= 1 ? d / c : d * Math.pow(2, 1 - h)) * c >= 2 && (o++, c /= 2), o + h >= l ? (a = 0, o = l) : o + h >= 1 ? (a = (t * c - 1) * Math.pow(2, i), o += h) : (a = t * Math.pow(2, h - 1) * Math.pow(2, i), o = 0)); i >= 8; e[r + f] = 255 & a, f += p, a /= 256, i -= 8);
                    for (o = o << i | a, u += i; u > 0; e[r + f] = 255 & o, f += p, o /= 256, u -= 8);
                    e[r + f - p] |= 128 * y
                }
            },
            78038: (e, t, r) => {
                ! function (e) {
                    "use strict";
                    var t = function (e) {
                            var t, r = new Float64Array(16);
                            if (e)
                                for (t = 0; t < e.length; t++) r[t] = e[t];
                            return r
                        },
                        n = function () {
                            throw new Error("no PRNG")
                        },
                        i = new Uint8Array(16),
                        s = new Uint8Array(32);
                    s[0] = 9;
                    var o = t(),
                        a = t([1]),
                        c = t([56129, 1]),
                        u = t([30883, 4953, 19914, 30187, 55467, 16705, 2637, 112, 59544, 30585, 16505, 36039, 65139, 11119, 27886, 20995]),
                        l = t([61785, 9906, 39828, 60374, 45398, 33411, 5274, 224, 53552, 61171, 33010, 6542, 64743, 22239, 55772, 9222]),
                        h = t([54554, 36645, 11616, 51542, 42930, 38181, 51040, 26924, 56412, 64982, 57905, 49316, 21502, 52590, 14035, 8553]),
                        d = t([26200, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214]),
                        f = t([41136, 18958, 6951, 50414, 58488, 44335, 6150, 12099, 55207, 15867, 153, 11085, 57099, 20417, 9344, 11139]);

                    function p(e, t, r, n) {
                        e[t] = r >> 24 & 255, e[t + 1] = r >> 16 & 255, e[t + 2] = r >> 8 & 255, e[t + 3] = 255 & r, e[t + 4] = n >> 24 & 255, e[t + 5] = n >> 16 & 255, e[t + 6] = n >> 8 & 255, e[t + 7] = 255 & n
                    }

                    function y(e, t, r, n, i) {
                        var s, o = 0;
                        for (s = 0; s < i; s++) o |= e[t + s] ^ r[n + s];
                        return (1 & o - 1 >>> 8) - 1
                    }

                    function g(e, t, r, n) {
                        return y(e, t, r, n, 16)
                    }

                    function w(e, t, r, n) {
                        return y(e, t, r, n, 32)
                    }

                    function b(e, t, r, n) {
                        ! function (e, t, r, n) {
                            for (var i, s = 255 & n[0] | (255 & n[1]) << 8 | (255 & n[2]) << 16 | (255 & n[3]) << 24, o = 255 & r[0] | (255 & r[1]) << 8 | (255 & r[2]) << 16 | (255 & r[3]) << 24, a = 255 & r[4] | (255 & r[5]) << 8 | (255 & r[6]) << 16 | (255 & r[7]) << 24, c = 255 & r[8] | (255 & r[9]) << 8 | (255 & r[10]) << 16 | (255 & r[11]) << 24, u = 255 & r[12] | (255 & r[13]) << 8 | (255 & r[14]) << 16 | (255 & r[15]) << 24, l = 255 & n[4] | (255 & n[5]) << 8 | (255 & n[6]) << 16 | (255 & n[7]) << 24, h = 255 & t[0] | (255 & t[1]) << 8 | (255 & t[2]) << 16 | (255 & t[3]) << 24, d = 255 & t[4] | (255 & t[5]) << 8 | (255 & t[6]) << 16 | (255 & t[7]) << 24, f = 255 & t[8] | (255 & t[9]) << 8 | (255 & t[10]) << 16 | (255 & t[11]) << 24, p = 255 & t[12] | (255 & t[13]) << 8 | (255 & t[14]) << 16 | (255 & t[15]) << 24, y = 255 & n[8] | (255 & n[9]) << 8 | (255 & n[10]) << 16 | (255 & n[11]) << 24, g = 255 & r[16] | (255 & r[17]) << 8 | (255 & r[18]) << 16 | (255 & r[19]) << 24, w = 255 & r[20] | (255 & r[21]) << 8 | (255 & r[22]) << 16 | (255 & r[23]) << 24, b = 255 & r[24] | (255 & r[25]) << 8 | (255 & r[26]) << 16 | (255 & r[27]) << 24, m = 255 & r[28] | (255 & r[29]) << 8 | (255 & r[30]) << 16 | (255 & r[31]) << 24, v = 255 & n[12] | (255 & n[13]) << 8 | (255 & n[14]) << 16 | (255 & n[15]) << 24, E = s, A = o, _ = a, x = c, T = u, U = l, S = h, R = d, B = f, I = p, z = y, O = g, L = w, q = b, k = m, C = v, N = 0; N < 20; N += 2) E ^= (i = (L ^= (i = (B ^= (i = (T ^= (i = E + L | 0) << 7 | i >>> 25) + E | 0) << 9 | i >>> 23) + T | 0) << 13 | i >>> 19) + B | 0) << 18 | i >>> 14, U ^= (i = (A ^= (i = (q ^= (i = (I ^= (i = U + A | 0) << 7 | i >>> 25) + U | 0) << 9 | i >>> 23) + I | 0) << 13 | i >>> 19) + q | 0) << 18 | i >>> 14, z ^= (i = (S ^= (i = (_ ^= (i = (k ^= (i = z + S | 0) << 7 | i >>> 25) + z | 0) << 9 | i >>> 23) + k | 0) << 13 | i >>> 19) + _ | 0) << 18 | i >>> 14, C ^= (i = (O ^= (i = (R ^= (i = (x ^= (i = C + O | 0) << 7 | i >>> 25) + C | 0) << 9 | i >>> 23) + x | 0) << 13 | i >>> 19) + R | 0) << 18 | i >>> 14, E ^= (i = (x ^= (i = (_ ^= (i = (A ^= (i = E + x | 0) << 7 | i >>> 25) + E | 0) << 9 | i >>> 23) + A | 0) << 13 | i >>> 19) + _ | 0) << 18 | i >>> 14, U ^= (i = (T ^= (i = (R ^= (i = (S ^= (i = U + T | 0) << 7 | i >>> 25) + U | 0) << 9 | i >>> 23) + S | 0) << 13 | i >>> 19) + R | 0) << 18 | i >>> 14, z ^= (i = (I ^= (i = (B ^= (i = (O ^= (i = z + I | 0) << 7 | i >>> 25) + z | 0) << 9 | i >>> 23) + O | 0) << 13 | i >>> 19) + B | 0) << 18 | i >>> 14, C ^= (i = (k ^= (i = (q ^= (i = (L ^= (i = C + k | 0) << 7 | i >>> 25) + C | 0) << 9 | i >>> 23) + L | 0) << 13 | i >>> 19) + q | 0) << 18 | i >>> 14;
                            E = E + s | 0, A = A + o | 0, _ = _ + a | 0, x = x + c | 0, T = T + u | 0, U = U + l | 0, S = S + h | 0, R = R + d | 0, B = B + f | 0, I = I + p | 0, z = z + y | 0, O = O + g | 0, L = L + w | 0, q = q + b | 0, k = k + m | 0, C = C + v | 0, e[0] = E >>> 0 & 255, e[1] = E >>> 8 & 255, e[2] = E >>> 16 & 255, e[3] = E >>> 24 & 255, e[4] = A >>> 0 & 255, e[5] = A >>> 8 & 255, e[6] = A >>> 16 & 255, e[7] = A >>> 24 & 255, e[8] = _ >>> 0 & 255, e[9] = _ >>> 8 & 255, e[10] = _ >>> 16 & 255, e[11] = _ >>> 24 & 255, e[12] = x >>> 0 & 255, e[13] = x >>> 8 & 255, e[14] = x >>> 16 & 255, e[15] = x >>> 24 & 255, e[16] = T >>> 0 & 255, e[17] = T >>> 8 & 255, e[18] = T >>> 16 & 255, e[19] = T >>> 24 & 255, e[20] = U >>> 0 & 255, e[21] = U >>> 8 & 255, e[22] = U >>> 16 & 255, e[23] = U >>> 24 & 255, e[24] = S >>> 0 & 255, e[25] = S >>> 8 & 255, e[26] = S >>> 16 & 255, e[27] = S >>> 24 & 255, e[28] = R >>> 0 & 255, e[29] = R >>> 8 & 255, e[30] = R >>> 16 & 255, e[31] = R >>> 24 & 255, e[32] = B >>> 0 & 255, e[33] = B >>> 8 & 255, e[34] = B >>> 16 & 255, e[35] = B >>> 24 & 255, e[36] = I >>> 0 & 255, e[37] = I >>> 8 & 255, e[38] = I >>> 16 & 255, e[39] = I >>> 24 & 255, e[40] = z >>> 0 & 255, e[41] = z >>> 8 & 255, e[42] = z >>> 16 & 255, e[43] = z >>> 24 & 255, e[44] = O >>> 0 & 255, e[45] = O >>> 8 & 255, e[46] = O >>> 16 & 255, e[47] = O >>> 24 & 255, e[48] = L >>> 0 & 255, e[49] = L >>> 8 & 255, e[50] = L >>> 16 & 255, e[51] = L >>> 24 & 255, e[52] = q >>> 0 & 255, e[53] = q >>> 8 & 255, e[54] = q >>> 16 & 255, e[55] = q >>> 24 & 255, e[56] = k >>> 0 & 255, e[57] = k >>> 8 & 255, e[58] = k >>> 16 & 255, e[59] = k >>> 24 & 255, e[60] = C >>> 0 & 255, e[61] = C >>> 8 & 255, e[62] = C >>> 16 & 255, e[63] = C >>> 24 & 255
                        }(e, t, r, n)
                    }

                    function m(e, t, r, n) {
                        ! function (e, t, r, n) {
                            for (var i, s = 255 & n[0] | (255 & n[1]) << 8 | (255 & n[2]) << 16 | (255 & n[3]) << 24, o = 255 & r[0] | (255 & r[1]) << 8 | (255 & r[2]) << 16 | (255 & r[3]) << 24, a = 255 & r[4] | (255 & r[5]) << 8 | (255 & r[6]) << 16 | (255 & r[7]) << 24, c = 255 & r[8] | (255 & r[9]) << 8 | (255 & r[10]) << 16 | (255 & r[11]) << 24, u = 255 & r[12] | (255 & r[13]) << 8 | (255 & r[14]) << 16 | (255 & r[15]) << 24, l = 255 & n[4] | (255 & n[5]) << 8 | (255 & n[6]) << 16 | (255 & n[7]) << 24, h = 255 & t[0] | (255 & t[1]) << 8 | (255 & t[2]) << 16 | (255 & t[3]) << 24, d = 255 & t[4] | (255 & t[5]) << 8 | (255 & t[6]) << 16 | (255 & t[7]) << 24, f = 255 & t[8] | (255 & t[9]) << 8 | (255 & t[10]) << 16 | (255 & t[11]) << 24, p = 255 & t[12] | (255 & t[13]) << 8 | (255 & t[14]) << 16 | (255 & t[15]) << 24, y = 255 & n[8] | (255 & n[9]) << 8 | (255 & n[10]) << 16 | (255 & n[11]) << 24, g = 255 & r[16] | (255 & r[17]) << 8 | (255 & r[18]) << 16 | (255 & r[19]) << 24, w = 255 & r[20] | (255 & r[21]) << 8 | (255 & r[22]) << 16 | (255 & r[23]) << 24, b = 255 & r[24] | (255 & r[25]) << 8 | (255 & r[26]) << 16 | (255 & r[27]) << 24, m = 255 & r[28] | (255 & r[29]) << 8 | (255 & r[30]) << 16 | (255 & r[31]) << 24, v = 255 & n[12] | (255 & n[13]) << 8 | (255 & n[14]) << 16 | (255 & n[15]) << 24, E = 0; E < 20; E += 2) s ^= (i = (w ^= (i = (f ^= (i = (u ^= (i = s + w | 0) << 7 | i >>> 25) + s | 0) << 9 | i >>> 23) + u | 0) << 13 | i >>> 19) + f | 0) << 18 | i >>> 14, l ^= (i = (o ^= (i = (b ^= (i = (p ^= (i = l + o | 0) << 7 | i >>> 25) + l | 0) << 9 | i >>> 23) + p | 0) << 13 | i >>> 19) + b | 0) << 18 | i >>> 14, y ^= (i = (h ^= (i = (a ^= (i = (m ^= (i = y + h | 0) << 7 | i >>> 25) + y | 0) << 9 | i >>> 23) + m | 0) << 13 | i >>> 19) + a | 0) << 18 | i >>> 14, v ^= (i = (g ^= (i = (d ^= (i = (c ^= (i = v + g | 0) << 7 | i >>> 25) + v | 0) << 9 | i >>> 23) + c | 0) << 13 | i >>> 19) + d | 0) << 18 | i >>> 14, s ^= (i = (c ^= (i = (a ^= (i = (o ^= (i = s + c | 0) << 7 | i >>> 25) + s | 0) << 9 | i >>> 23) + o | 0) << 13 | i >>> 19) + a | 0) << 18 | i >>> 14, l ^= (i = (u ^= (i = (d ^= (i = (h ^= (i = l + u | 0) << 7 | i >>> 25) + l | 0) << 9 | i >>> 23) + h | 0) << 13 | i >>> 19) + d | 0) << 18 | i >>> 14, y ^= (i = (p ^= (i = (f ^= (i = (g ^= (i = y + p | 0) << 7 | i >>> 25) + y | 0) << 9 | i >>> 23) + g | 0) << 13 | i >>> 19) + f | 0) << 18 | i >>> 14, v ^= (i = (m ^= (i = (b ^= (i = (w ^= (i = v + m | 0) << 7 | i >>> 25) + v | 0) << 9 | i >>> 23) + w | 0) << 13 | i >>> 19) + b | 0) << 18 | i >>> 14;
                            e[0] = s >>> 0 & 255, e[1] = s >>> 8 & 255, e[2] = s >>> 16 & 255, e[3] = s >>> 24 & 255, e[4] = l >>> 0 & 255, e[5] = l >>> 8 & 255, e[6] = l >>> 16 & 255, e[7] = l >>> 24 & 255, e[8] = y >>> 0 & 255, e[9] = y >>> 8 & 255, e[10] = y >>> 16 & 255, e[11] = y >>> 24 & 255, e[12] = v >>> 0 & 255, e[13] = v >>> 8 & 255, e[14] = v >>> 16 & 255, e[15] = v >>> 24 & 255, e[16] = h >>> 0 & 255, e[17] = h >>> 8 & 255, e[18] = h >>> 16 & 255, e[19] = h >>> 24 & 255, e[20] = d >>> 0 & 255, e[21] = d >>> 8 & 255, e[22] = d >>> 16 & 255, e[23] = d >>> 24 & 255, e[24] = f >>> 0 & 255, e[25] = f >>> 8 & 255, e[26] = f >>> 16 & 255, e[27] = f >>> 24 & 255, e[28] = p >>> 0 & 255, e[29] = p >>> 8 & 255, e[30] = p >>> 16 & 255, e[31] = p >>> 24 & 255
                        }(e, t, r, n)
                    }
                    var v = new Uint8Array([101, 120, 112, 97, 110, 100, 32, 51, 50, 45, 98, 121, 116, 101, 32, 107]);

                    function E(e, t, r, n, i, s, o) {
                        var a, c, u = new Uint8Array(16),
                            l = new Uint8Array(64);
                        for (c = 0; c < 16; c++) u[c] = 0;
                        for (c = 0; c < 8; c++) u[c] = s[c];
                        for (; i >= 64;) {
                            for (b(l, u, o, v), c = 0; c < 64; c++) e[t + c] = r[n + c] ^ l[c];
                            for (a = 1, c = 8; c < 16; c++) a = a + (255 & u[c]) | 0, u[c] = 255 & a, a >>>= 8;
                            i -= 64, t += 64, n += 64
                        }
                        if (i > 0)
                            for (b(l, u, o, v), c = 0; c < i; c++) e[t + c] = r[n + c] ^ l[c];
                        return 0
                    }

                    function A(e, t, r, n, i) {
                        var s, o, a = new Uint8Array(16),
                            c = new Uint8Array(64);
                        for (o = 0; o < 16; o++) a[o] = 0;
                        for (o = 0; o < 8; o++) a[o] = n[o];
                        for (; r >= 64;) {
                            for (b(c, a, i, v), o = 0; o < 64; o++) e[t + o] = c[o];
                            for (s = 1, o = 8; o < 16; o++) s = s + (255 & a[o]) | 0, a[o] = 255 & s, s >>>= 8;
                            r -= 64, t += 64
                        }
                        if (r > 0)
                            for (b(c, a, i, v), o = 0; o < r; o++) e[t + o] = c[o];
                        return 0
                    }

                    function _(e, t, r, n, i) {
                        var s = new Uint8Array(32);
                        m(s, n, i, v);
                        for (var o = new Uint8Array(8), a = 0; a < 8; a++) o[a] = n[a + 16];
                        return A(e, t, r, o, s)
                    }

                    function x(e, t, r, n, i, s, o) {
                        var a = new Uint8Array(32);
                        m(a, s, o, v);
                        for (var c = new Uint8Array(8), u = 0; u < 8; u++) c[u] = s[u + 16];
                        return E(e, t, r, n, i, c, a)
                    }
                    var T = function (e) {
                        var t, r, n, i, s, o, a, c;
                        this.buffer = new Uint8Array(16), this.r = new Uint16Array(10), this.h = new Uint16Array(10), this.pad = new Uint16Array(8), this.leftover = 0, this.fin = 0, t = 255 & e[0] | (255 & e[1]) << 8, this.r[0] = 8191 & t, r = 255 & e[2] | (255 & e[3]) << 8, this.r[1] = 8191 & (t >>> 13 | r << 3), n = 255 & e[4] | (255 & e[5]) << 8, this.r[2] = 7939 & (r >>> 10 | n << 6), i = 255 & e[6] | (255 & e[7]) << 8, this.r[3] = 8191 & (n >>> 7 | i << 9), s = 255 & e[8] | (255 & e[9]) << 8, this.r[4] = 255 & (i >>> 4 | s << 12), this.r[5] = s >>> 1 & 8190, o = 255 & e[10] | (255 & e[11]) << 8, this.r[6] = 8191 & (s >>> 14 | o << 2), a = 255 & e[12] | (255 & e[13]) << 8, this.r[7] = 8065 & (o >>> 11 | a << 5), c = 255 & e[14] | (255 & e[15]) << 8, this.r[8] = 8191 & (a >>> 8 | c << 8), this.r[9] = c >>> 5 & 127, this.pad[0] = 255 & e[16] | (255 & e[17]) << 8, this.pad[1] = 255 & e[18] | (255 & e[19]) << 8, this.pad[2] = 255 & e[20] | (255 & e[21]) << 8, this.pad[3] = 255 & e[22] | (255 & e[23]) << 8, this.pad[4] = 255 & e[24] | (255 & e[25]) << 8, this.pad[5] = 255 & e[26] | (255 & e[27]) << 8, this.pad[6] = 255 & e[28] | (255 & e[29]) << 8, this.pad[7] = 255 & e[30] | (255 & e[31]) << 8
                    };

                    function U(e, t, r, n, i, s) {
                        var o = new T(s);
                        return o.update(r, n, i), o.finish(e, t), 0
                    }

                    function S(e, t, r, n, i, s) {
                        var o = new Uint8Array(16);
                        return U(o, 0, r, n, i, s), g(e, t, o, 0)
                    }

                    function R(e, t, r, n, i) {
                        var s;
                        if (r < 32) return -1;
                        for (x(e, 0, t, 0, r, n, i), U(e, 16, e, 32, r - 32, e), s = 0; s < 16; s++) e[s] = 0;
                        return 0
                    }

                    function B(e, t, r, n, i) {
                        var s, o = new Uint8Array(32);
                        if (r < 32) return -1;
                        if (_(o, 0, 32, n, i), 0 !== S(t, 16, t, 32, r - 32, o)) return -1;
                        for (x(e, 0, t, 0, r, n, i), s = 0; s < 32; s++) e[s] = 0;
                        return 0
                    }

                    function I(e, t) {
                        var r;
                        for (r = 0; r < 16; r++) e[r] = 0 | t[r]
                    }

                    function z(e) {
                        var t, r, n = 1;
                        for (t = 0; t < 16; t++) r = e[t] + n + 65535, n = Math.floor(r / 65536), e[t] = r - 65536 * n;
                        e[0] += n - 1 + 37 * (n - 1)
                    }

                    function O(e, t, r) {
                        for (var n, i = ~(r - 1), s = 0; s < 16; s++) n = i & (e[s] ^ t[s]), e[s] ^= n, t[s] ^= n
                    }

                    function L(e, r) {
                        var n, i, s, o = t(),
                            a = t();
                        for (n = 0; n < 16; n++) a[n] = r[n];
                        for (z(a), z(a), z(a), i = 0; i < 2; i++) {
                            for (o[0] = a[0] - 65517, n = 1; n < 15; n++) o[n] = a[n] - 65535 - (o[n - 1] >> 16 & 1), o[n - 1] &= 65535;
                            o[15] = a[15] - 32767 - (o[14] >> 16 & 1), s = o[15] >> 16 & 1, o[14] &= 65535, O(a, o, 1 - s)
                        }
                        for (n = 0; n < 16; n++) e[2 * n] = 255 & a[n], e[2 * n + 1] = a[n] >> 8
                    }

                    function q(e, t) {
                        var r = new Uint8Array(32),
                            n = new Uint8Array(32);
                        return L(r, e), L(n, t), w(r, 0, n, 0)
                    }

                    function k(e) {
                        var t = new Uint8Array(32);
                        return L(t, e), 1 & t[0]
                    }

                    function C(e, t) {
                        var r;
                        for (r = 0; r < 16; r++) e[r] = t[2 * r] + (t[2 * r + 1] << 8);
                        e[15] &= 32767
                    }

                    function N(e, t, r) {
                        for (var n = 0; n < 16; n++) e[n] = t[n] + r[n]
                    }

                    function M(e, t, r) {
                        for (var n = 0; n < 16; n++) e[n] = t[n] - r[n]
                    }

                    function H(e, t, r) {
                        var n, i, s = 0,
                            o = 0,
                            a = 0,
                            c = 0,
                            u = 0,
                            l = 0,
                            h = 0,
                            d = 0,
                            f = 0,
                            p = 0,
                            y = 0,
                            g = 0,
                            w = 0,
                            b = 0,
                            m = 0,
                            v = 0,
                            E = 0,
                            A = 0,
                            _ = 0,
                            x = 0,
                            T = 0,
                            U = 0,
                            S = 0,
                            R = 0,
                            B = 0,
                            I = 0,
                            z = 0,
                            O = 0,
                            L = 0,
                            q = 0,
                            k = 0,
                            C = r[0],
                            N = r[1],
                            M = r[2],
                            H = r[3],
                            P = r[4],
                            D = r[5],
                            j = r[6],
                            F = r[7],
                            W = r[8],
                            G = r[9],
                            V = r[10],
                            $ = r[11],
                            K = r[12],
                            J = r[13],
                            Y = r[14],
                            X = r[15];
                        s += (n = t[0]) * C, o += n * N, a += n * M, c += n * H, u += n * P, l += n * D, h += n * j, d += n * F, f += n * W, p += n * G, y += n * V, g += n * $, w += n * K, b += n * J, m += n * Y, v += n * X, o += (n = t[1]) * C, a += n * N, c += n * M, u += n * H, l += n * P, h += n * D, d += n * j, f += n * F, p += n * W, y += n * G, g += n * V, w += n * $, b += n * K, m += n * J, v += n * Y, E += n * X, a += (n = t[2]) * C, c += n * N, u += n * M, l += n * H, h += n * P, d += n * D, f += n * j, p += n * F, y += n * W, g += n * G, w += n * V, b += n * $, m += n * K, v += n * J, E += n * Y, A += n * X, c += (n = t[3]) * C, u += n * N, l += n * M, h += n * H, d += n * P, f += n * D, p += n * j, y += n * F, g += n * W, w += n * G, b += n * V, m += n * $, v += n * K, E += n * J, A += n * Y, _ += n * X, u += (n = t[4]) * C, l += n * N, h += n * M, d += n * H, f += n * P, p += n * D, y += n * j, g += n * F, w += n * W, b += n * G, m += n * V, v += n * $, E += n * K, A += n * J, _ += n * Y, x += n * X, l += (n = t[5]) * C, h += n * N, d += n * M, f += n * H, p += n * P, y += n * D, g += n * j, w += n * F, b += n * W, m += n * G, v += n * V, E += n * $, A += n * K, _ += n * J, x += n * Y, T += n * X, h += (n = t[6]) * C, d += n * N, f += n * M, p += n * H, y += n * P, g += n * D, w += n * j, b += n * F, m += n * W, v += n * G, E += n * V, A += n * $, _ += n * K, x += n * J, T += n * Y, U += n * X, d += (n = t[7]) * C, f += n * N, p += n * M, y += n * H, g += n * P, w += n * D, b += n * j, m += n * F, v += n * W, E += n * G, A += n * V, _ += n * $, x += n * K, T += n * J, U += n * Y, S += n * X, f += (n = t[8]) * C, p += n * N, y += n * M, g += n * H, w += n * P, b += n * D, m += n * j, v += n * F, E += n * W, A += n * G, _ += n * V, x += n * $, T += n * K, U += n * J, S += n * Y, R += n * X, p += (n = t[9]) * C, y += n * N, g += n * M, w += n * H, b += n * P, m += n * D, v += n * j, E += n * F, A += n * W, _ += n * G, x += n * V, T += n * $, U += n * K, S += n * J, R += n * Y, B += n * X, y += (n = t[10]) * C, g += n * N, w += n * M, b += n * H, m += n * P, v += n * D, E += n * j, A += n * F, _ += n * W, x += n * G, T += n * V, U += n * $, S += n * K, R += n * J, B += n * Y, I += n * X, g += (n = t[11]) * C, w += n * N, b += n * M, m += n * H, v += n * P, E += n * D, A += n * j, _ += n * F, x += n * W, T += n * G, U += n * V, S += n * $, R += n * K, B += n * J, I += n * Y, z += n * X, w += (n = t[12]) * C, b += n * N, m += n * M, v += n * H, E += n * P, A += n * D, _ += n * j, x += n * F, T += n * W, U += n * G, S += n * V, R += n * $, B += n * K, I += n * J, z += n * Y, O += n * X, b += (n = t[13]) * C, m += n * N, v += n * M, E += n * H, A += n * P, _ += n * D, x += n * j, T += n * F, U += n * W, S += n * G, R += n * V, B += n * $, I += n * K, z += n * J, O += n * Y, L += n * X, m += (n = t[14]) * C, v += n * N, E += n * M, A += n * H, _ += n * P, x += n * D, T += n * j, U += n * F, S += n * W, R += n * G, B += n * V, I += n * $, z += n * K, O += n * J, L += n * Y, q += n * X, v += (n = t[15]) * C, o += 38 * (A += n * M), a += 38 * (_ += n * H), c += 38 * (x += n * P), u += 38 * (T += n * D), l += 38 * (U += n * j), h += 38 * (S += n * F), d += 38 * (R += n * W), f += 38 * (B += n * G), p += 38 * (I += n * V), y += 38 * (z += n * $), g += 38 * (O += n * K), w += 38 * (L += n * J), b += 38 * (q += n * Y), m += 38 * (k += n * X), s = (n = (s += 38 * (E += n * N)) + (i = 1) + 65535) - 65536 * (i = Math.floor(n / 65536)), o = (n = o + i + 65535) - 65536 * (i = Math.floor(n / 65536)), a = (n = a + i + 65535) - 65536 * (i = Math.floor(n / 65536)), c = (n = c + i + 65535) - 65536 * (i = Math.floor(n / 65536)), u = (n = u + i + 65535) - 65536 * (i = Math.floor(n / 65536)), l = (n = l + i + 65535) - 65536 * (i = Math.floor(n / 65536)), h = (n = h + i + 65535) - 65536 * (i = Math.floor(n / 65536)), d = (n = d + i + 65535) - 65536 * (i = Math.floor(n / 65536)), f = (n = f + i + 65535) - 65536 * (i = Math.floor(n / 65536)), p = (n = p + i + 65535) - 65536 * (i = Math.floor(n / 65536)), y = (n = y + i + 65535) - 65536 * (i = Math.floor(n / 65536)), g = (n = g + i + 65535) - 65536 * (i = Math.floor(n / 65536)), w = (n = w + i + 65535) - 65536 * (i = Math.floor(n / 65536)), b = (n = b + i + 65535) - 65536 * (i = Math.floor(n / 65536)), m = (n = m + i + 65535) - 65536 * (i = Math.floor(n / 65536)), v = (n = v + i + 65535) - 65536 * (i = Math.floor(n / 65536)), s = (n = (s += i - 1 + 37 * (i - 1)) + (i = 1) + 65535) - 65536 * (i = Math.floor(n / 65536)), o = (n = o + i + 65535) - 65536 * (i = Math.floor(n / 65536)), a = (n = a + i + 65535) - 65536 * (i = Math.floor(n / 65536)), c = (n = c + i + 65535) - 65536 * (i = Math.floor(n / 65536)), u = (n = u + i + 65535) - 65536 * (i = Math.floor(n / 65536)), l = (n = l + i + 65535) - 65536 * (i = Math.floor(n / 65536)), h = (n = h + i + 65535) - 65536 * (i = Math.floor(n / 65536)), d = (n = d + i + 65535) - 65536 * (i = Math.floor(n / 65536)), f = (n = f + i + 65535) - 65536 * (i = Math.floor(n / 65536)), p = (n = p + i + 65535) - 65536 * (i = Math.floor(n / 65536)), y = (n = y + i + 65535) - 65536 * (i = Math.floor(n / 65536)), g = (n = g + i + 65535) - 65536 * (i = Math.floor(n / 65536)), w = (n = w + i + 65535) - 65536 * (i = Math.floor(n / 65536)), b = (n = b + i + 65535) - 65536 * (i = Math.floor(n / 65536)), m = (n = m + i + 65535) - 65536 * (i = Math.floor(n / 65536)), v = (n = v + i + 65535) - 65536 * (i = Math.floor(n / 65536)), s += i - 1 + 37 * (i - 1), e[0] = s, e[1] = o, e[2] = a, e[3] = c, e[4] = u, e[5] = l, e[6] = h, e[7] = d, e[8] = f, e[9] = p, e[10] = y, e[11] = g, e[12] = w, e[13] = b, e[14] = m, e[15] = v
                    }

                    function P(e, t) {
                        H(e, t, t)
                    }

                    function D(e, r) {
                        var n, i = t();
                        for (n = 0; n < 16; n++) i[n] = r[n];
                        for (n = 253; n >= 0; n--) P(i, i), 2 !== n && 4 !== n && H(i, i, r);
                        for (n = 0; n < 16; n++) e[n] = i[n]
                    }

                    function j(e, r) {
                        var n, i = t();
                        for (n = 0; n < 16; n++) i[n] = r[n];
                        for (n = 250; n >= 0; n--) P(i, i), 1 !== n && H(i, i, r);
                        for (n = 0; n < 16; n++) e[n] = i[n]
                    }

                    function F(e, r, n) {
                        var i, s, o = new Uint8Array(32),
                            a = new Float64Array(80),
                            u = t(),
                            l = t(),
                            h = t(),
                            d = t(),
                            f = t(),
                            p = t();
                        for (s = 0; s < 31; s++) o[s] = r[s];
                        for (o[31] = 127 & r[31] | 64, o[0] &= 248, C(a, n), s = 0; s < 16; s++) l[s] = a[s], d[s] = u[s] = h[s] = 0;
                        for (u[0] = d[0] = 1, s = 254; s >= 0; --s) O(u, l, i = o[s >>> 3] >>> (7 & s) & 1), O(h, d, i), N(f, u, h), M(u, u, h), N(h, l, d), M(l, l, d), P(d, f), P(p, u), H(u, h, u), H(h, l, f), N(f, u, h), M(u, u, h), P(l, u), M(h, d, p), H(u, h, c), N(u, u, d), H(h, h, u), H(u, d, p), H(d, l, a), P(l, f), O(u, l, i), O(h, d, i);
                        for (s = 0; s < 16; s++) a[s + 16] = u[s], a[s + 32] = h[s], a[s + 48] = l[s], a[s + 64] = d[s];
                        var y = a.subarray(32),
                            g = a.subarray(16);
                        return D(y, y), H(g, g, y), L(e, g), 0
                    }

                    function W(e, t) {
                        return F(e, t, s)
                    }

                    function G(e, t) {
                        return n(t, 32), W(e, t)
                    }

                    function V(e, t, r) {
                        var n = new Uint8Array(32);
                        return F(n, r, t), m(e, i, n, v)
                    }
                    T.prototype.blocks = function (e, t, r) {
                        for (var n, i, s, o, a, c, u, l, h, d, f, p, y, g, w, b, m, v, E, A = this.fin ? 0 : 2048, _ = this.h[0], x = this.h[1], T = this.h[2], U = this.h[3], S = this.h[4], R = this.h[5], B = this.h[6], I = this.h[7], z = this.h[8], O = this.h[9], L = this.r[0], q = this.r[1], k = this.r[2], C = this.r[3], N = this.r[4], M = this.r[5], H = this.r[6], P = this.r[7], D = this.r[8], j = this.r[9]; r >= 16;) d = h = 0, d += (_ += 8191 & (n = 255 & e[t + 0] | (255 & e[t + 1]) << 8)) * L, d += (x += 8191 & (n >>> 13 | (i = 255 & e[t + 2] | (255 & e[t + 3]) << 8) << 3)) * (5 * j), d += (T += 8191 & (i >>> 10 | (s = 255 & e[t + 4] | (255 & e[t + 5]) << 8) << 6)) * (5 * D), d += (U += 8191 & (s >>> 7 | (o = 255 & e[t + 6] | (255 & e[t + 7]) << 8) << 9)) * (5 * P), h = (d += (S += 8191 & (o >>> 4 | (a = 255 & e[t + 8] | (255 & e[t + 9]) << 8) << 12)) * (5 * H)) >>> 13, d &= 8191, d += (R += a >>> 1 & 8191) * (5 * M), d += (B += 8191 & (a >>> 14 | (c = 255 & e[t + 10] | (255 & e[t + 11]) << 8) << 2)) * (5 * N), d += (I += 8191 & (c >>> 11 | (u = 255 & e[t + 12] | (255 & e[t + 13]) << 8) << 5)) * (5 * C), d += (z += 8191 & (u >>> 8 | (l = 255 & e[t + 14] | (255 & e[t + 15]) << 8) << 8)) * (5 * k), f = h += (d += (O += l >>> 5 | A) * (5 * q)) >>> 13, f += _ * q, f += x * L, f += T * (5 * j), f += U * (5 * D), h = (f += S * (5 * P)) >>> 13, f &= 8191, f += R * (5 * H), f += B * (5 * M), f += I * (5 * N), f += z * (5 * C), h += (f += O * (5 * k)) >>> 13, f &= 8191, p = h, p += _ * k, p += x * q, p += T * L, p += U * (5 * j), h = (p += S * (5 * D)) >>> 13, p &= 8191, p += R * (5 * P), p += B * (5 * H), p += I * (5 * M), p += z * (5 * N), y = h += (p += O * (5 * C)) >>> 13, y += _ * C, y += x * k, y += T * q, y += U * L, h = (y += S * (5 * j)) >>> 13, y &= 8191, y += R * (5 * D), y += B * (5 * P), y += I * (5 * H), y += z * (5 * M), g = h += (y += O * (5 * N)) >>> 13, g += _ * N, g += x * C, g += T * k, g += U * q, h = (g += S * L) >>> 13, g &= 8191, g += R * (5 * j), g += B * (5 * D), g += I * (5 * P), g += z * (5 * H), w = h += (g += O * (5 * M)) >>> 13, w += _ * M, w += x * N, w += T * C, w += U * k, h = (w += S * q) >>> 13, w &= 8191, w += R * L, w += B * (5 * j), w += I * (5 * D), w += z * (5 * P), b = h += (w += O * (5 * H)) >>> 13, b += _ * H, b += x * M, b += T * N, b += U * C, h = (b += S * k) >>> 13, b &= 8191, b += R * q, b += B * L, b += I * (5 * j), b += z * (5 * D), m = h += (b += O * (5 * P)) >>> 13, m += _ * P, m += x * H, m += T * M, m += U * N, h = (m += S * C) >>> 13, m &= 8191, m += R * k, m += B * q, m += I * L, m += z * (5 * j), v = h += (m += O * (5 * D)) >>> 13, v += _ * D, v += x * P, v += T * H, v += U * M, h = (v += S * N) >>> 13, v &= 8191, v += R * C, v += B * k, v += I * q, v += z * L, E = h += (v += O * (5 * j)) >>> 13, E += _ * j, E += x * D, E += T * P, E += U * H, h = (E += S * M) >>> 13, E &= 8191, E += R * N, E += B * C, E += I * k, E += z * q, _ = d = 8191 & (h = (h = ((h += (E += O * L) >>> 13) << 2) + h | 0) + (d &= 8191) | 0), x = f += h >>>= 13, T = p &= 8191, U = y &= 8191, S = g &= 8191, R = w &= 8191, B = b &= 8191, I = m &= 8191, z = v &= 8191, O = E &= 8191, t += 16, r -= 16;
                        this.h[0] = _, this.h[1] = x, this.h[2] = T, this.h[3] = U, this.h[4] = S, this.h[5] = R, this.h[6] = B, this.h[7] = I, this.h[8] = z, this.h[9] = O
                    }, T.prototype.finish = function (e, t) {
                        var r, n, i, s, o = new Uint16Array(10);
                        if (this.leftover) {
                            for (s = this.leftover, this.buffer[s++] = 1; s < 16; s++) this.buffer[s] = 0;
                            this.fin = 1, this.blocks(this.buffer, 0, 16)
                        }
                        for (r = this.h[1] >>> 13, this.h[1] &= 8191, s = 2; s < 10; s++) this.h[s] += r, r = this.h[s] >>> 13, this.h[s] &= 8191;
                        for (this.h[0] += 5 * r, r = this.h[0] >>> 13, this.h[0] &= 8191, this.h[1] += r, r = this.h[1] >>> 13, this.h[1] &= 8191, this.h[2] += r, o[0] = this.h[0] + 5, r = o[0] >>> 13, o[0] &= 8191, s = 1; s < 10; s++) o[s] = this.h[s] + r, r = o[s] >>> 13, o[s] &= 8191;
                        for (o[9] -= 8192, n = (1 ^ r) - 1, s = 0; s < 10; s++) o[s] &= n;
                        for (n = ~n, s = 0; s < 10; s++) this.h[s] = this.h[s] & n | o[s];
                        for (this.h[0] = 65535 & (this.h[0] | this.h[1] << 13), this.h[1] = 65535 & (this.h[1] >>> 3 | this.h[2] << 10), this.h[2] = 65535 & (this.h[2] >>> 6 | this.h[3] << 7), this.h[3] = 65535 & (this.h[3] >>> 9 | this.h[4] << 4), this.h[4] = 65535 & (this.h[4] >>> 12 | this.h[5] << 1 | this.h[6] << 14), this.h[5] = 65535 & (this.h[6] >>> 2 | this.h[7] << 11), this.h[6] = 65535 & (this.h[7] >>> 5 | this.h[8] << 8), this.h[7] = 65535 & (this.h[8] >>> 8 | this.h[9] << 5), i = this.h[0] + this.pad[0], this.h[0] = 65535 & i, s = 1; s < 8; s++) i = (this.h[s] + this.pad[s] | 0) + (i >>> 16) | 0, this.h[s] = 65535 & i;
                        e[t + 0] = this.h[0] >>> 0 & 255, e[t + 1] = this.h[0] >>> 8 & 255, e[t + 2] = this.h[1] >>> 0 & 255, e[t + 3] = this.h[1] >>> 8 & 255, e[t + 4] = this.h[2] >>> 0 & 255, e[t + 5] = this.h[2] >>> 8 & 255, e[t + 6] = this.h[3] >>> 0 & 255, e[t + 7] = this.h[3] >>> 8 & 255, e[t + 8] = this.h[4] >>> 0 & 255, e[t + 9] = this.h[4] >>> 8 & 255, e[t + 10] = this.h[5] >>> 0 & 255, e[t + 11] = this.h[5] >>> 8 & 255, e[t + 12] = this.h[6] >>> 0 & 255, e[t + 13] = this.h[6] >>> 8 & 255, e[t + 14] = this.h[7] >>> 0 & 255, e[t + 15] = this.h[7] >>> 8 & 255
                    }, T.prototype.update = function (e, t, r) {
                        var n, i;
                        if (this.leftover) {
                            for ((i = 16 - this.leftover) > r && (i = r), n = 0; n < i; n++) this.buffer[this.leftover + n] = e[t + n];
                            if (r -= i, t += i, this.leftover += i, this.leftover < 16) return;
                            this.blocks(this.buffer, 0, 16), this.leftover = 0
                        }
                        if (r >= 16 && (i = r - r % 16, this.blocks(e, t, i), t += i, r -= i), r) {
                            for (n = 0; n < r; n++) this.buffer[this.leftover + n] = e[t + n];
                            this.leftover += r
                        }
                    };
                    var $ = R,
                        K = B;
                    var J = [1116352408, 3609767458, 1899447441, 602891725, 3049323471, 3964484399, 3921009573, 2173295548, 961987163, 4081628472, 1508970993, 3053834265, 2453635748, 2937671579, 2870763221, 3664609560, 3624381080, 2734883394, 310598401, 1164996542, 607225278, 1323610764, 1426881987, 3590304994, 1925078388, 4068182383, 2162078206, 991336113, 2614888103, 633803317, 3248222580, 3479774868, 3835390401, 2666613458, 4022224774, 944711139, 264347078, 2341262773, 604807628, 2007800933, 770255983, 1495990901, 1249150122, 1856431235, 1555081692, 3175218132, 1996064986, 2198950837, 2554220882, 3999719339, 2821834349, 766784016, 2952996808, 2566594879, 3210313671, 3203337956, 3336571891, 1034457026, 3584528711, 2466948901, 113926993, 3758326383, 338241895, 168717936, 666307205, 1188179964, 773529912, 1546045734, 1294757372, 1522805485, 1396182291, 2643833823, 1695183700, 2343527390, 1986661051, 1014477480, 2177026350, 1206759142, 2456956037, 344077627, 2730485921, 1290863460, 2820302411, 3158454273, 3259730800, 3505952657, 3345764771, 106217008, 3516065817, 3606008344, 3600352804, 1432725776, 4094571909, 1467031594, 275423344, 851169720, 430227734, 3100823752, 506948616, 1363258195, 659060556, 3750685593, 883997877, 3785050280, 958139571, 3318307427, 1322822218, 3812723403, 1537002063, 2003034995, 1747873779, 3602036899, 1955562222, 1575990012, 2024104815, 1125592928, 2227730452, 2716904306, 2361852424, 442776044, 2428436474, 593698344, 2756734187, 3733110249, 3204031479, 2999351573, 3329325298, 3815920427, 3391569614, 3928383900, 3515267271, 566280711, 3940187606, 3454069534, 4118630271, 4000239992, 116418474, 1914138554, 174292421, 2731055270, 289380356, 3203993006, 460393269, 320620315, 685471733, 587496836, 852142971, 1086792851, 1017036298, 365543100, 1126000580, 2618297676, 1288033470, 3409855158, 1501505948, 4234509866, 1607167915, 987167468, 1816402316, 1246189591];

                    function Y(e, t, r, n) {
                        for (var i, s, o, a, c, u, l, h, d, f, p, y, g, w, b, m, v, E, A, _, x, T, U, S, R, B, I = new Int32Array(16), z = new Int32Array(16), O = e[0], L = e[1], q = e[2], k = e[3], C = e[4], N = e[5], M = e[6], H = e[7], P = t[0], D = t[1], j = t[2], F = t[3], W = t[4], G = t[5], V = t[6], $ = t[7], K = 0; n >= 128;) {
                            for (A = 0; A < 16; A++) _ = 8 * A + K, I[A] = r[_ + 0] << 24 | r[_ + 1] << 16 | r[_ + 2] << 8 | r[_ + 3], z[A] = r[_ + 4] << 24 | r[_ + 5] << 16 | r[_ + 6] << 8 | r[_ + 7];
                            for (A = 0; A < 80; A++)
                                if (i = O, s = L, o = q, a = k, c = C, u = N, l = M, H, d = P, f = D, p = j, y = F, g = W, w = G, b = V, $, U = 65535 & (T = $), S = T >>> 16, R = 65535 & (x = H), B = x >>> 16, U += 65535 & (T = (W >>> 14 | C << 18) ^ (W >>> 18 | C << 14) ^ (C >>> 9 | W << 23)), S += T >>> 16, R += 65535 & (x = (C >>> 14 | W << 18) ^ (C >>> 18 | W << 14) ^ (W >>> 9 | C << 23)), B += x >>> 16, U += 65535 & (T = W & G ^ ~W & V), S += T >>> 16, R += 65535 & (x = C & N ^ ~C & M), B += x >>> 16, U += 65535 & (T = J[2 * A + 1]), S += T >>> 16, R += 65535 & (x = J[2 * A]), B += x >>> 16, x = I[A % 16], S += (T = z[A % 16]) >>> 16, R += 65535 & x, B += x >>> 16, R += (S += (U += 65535 & T) >>> 16) >>> 16, U = 65535 & (T = E = 65535 & U | S << 16), S = T >>> 16, R = 65535 & (x = v = 65535 & R | (B += R >>> 16) << 16), B = x >>> 16, U += 65535 & (T = (P >>> 28 | O << 4) ^ (O >>> 2 | P << 30) ^ (O >>> 7 | P << 25)), S += T >>> 16, R += 65535 & (x = (O >>> 28 | P << 4) ^ (P >>> 2 | O << 30) ^ (P >>> 7 | O << 25)), B += x >>> 16, S += (T = P & D ^ P & j ^ D & j) >>> 16, R += 65535 & (x = O & L ^ O & q ^ L & q), B += x >>> 16, h = 65535 & (R += (S += (U += 65535 & T) >>> 16) >>> 16) | (B += R >>> 16) << 16, m = 65535 & U | S << 16, U = 65535 & (T = y), S = T >>> 16, R = 65535 & (x = a), B = x >>> 16, S += (T = E) >>> 16, R += 65535 & (x = v), B += x >>> 16, L = i, q = s, k = o, C = a = 65535 & (R += (S += (U += 65535 & T) >>> 16) >>> 16) | (B += R >>> 16) << 16, N = c, M = u, H = l, O = h, D = d, j = f, F = p, W = y = 65535 & U | S << 16, G = g, V = w, $ = b, P = m, A % 16 === 15)
                                    for (_ = 0; _ < 16; _++) x = I[_], U = 65535 & (T = z[_]), S = T >>> 16, R = 65535 & x, B = x >>> 16, x = I[(_ + 9) % 16], U += 65535 & (T = z[(_ + 9) % 16]), S += T >>> 16, R += 65535 & x, B += x >>> 16, v = I[(_ + 1) % 16], U += 65535 & (T = ((E = z[(_ + 1) % 16]) >>> 1 | v << 31) ^ (E >>> 8 | v << 24) ^ (E >>> 7 | v << 25)), S += T >>> 16, R += 65535 & (x = (v >>> 1 | E << 31) ^ (v >>> 8 | E << 24) ^ v >>> 7), B += x >>> 16, v = I[(_ + 14) % 16], S += (T = ((E = z[(_ + 14) % 16]) >>> 19 | v << 13) ^ (v >>> 29 | E << 3) ^ (E >>> 6 | v << 26)) >>> 16, R += 65535 & (x = (v >>> 19 | E << 13) ^ (E >>> 29 | v << 3) ^ v >>> 6), B += x >>> 16, B += (R += (S += (U += 65535 & T) >>> 16) >>> 16) >>> 16, I[_] = 65535 & R | B << 16, z[_] = 65535 & U | S << 16;
                            U = 65535 & (T = P), S = T >>> 16, R = 65535 & (x = O), B = x >>> 16, x = e[0], S += (T = t[0]) >>> 16, R += 65535 & x, B += x >>> 16, B += (R += (S += (U += 65535 & T) >>> 16) >>> 16) >>> 16, e[0] = O = 65535 & R | B << 16, t[0] = P = 65535 & U | S << 16, U = 65535 & (T = D), S = T >>> 16, R = 65535 & (x = L), B = x >>> 16, x = e[1], S += (T = t[1]) >>> 16, R += 65535 & x, B += x >>> 16, B += (R += (S += (U += 65535 & T) >>> 16) >>> 16) >>> 16, e[1] = L = 65535 & R | B << 16, t[1] = D = 65535 & U | S << 16, U = 65535 & (T = j), S = T >>> 16, R = 65535 & (x = q), B = x >>> 16, x = e[2], S += (T = t[2]) >>> 16, R += 65535 & x, B += x >>> 16, B += (R += (S += (U += 65535 & T) >>> 16) >>> 16) >>> 16, e[2] = q = 65535 & R | B << 16, t[2] = j = 65535 & U | S << 16, U = 65535 & (T = F), S = T >>> 16, R = 65535 & (x = k), B = x >>> 16, x = e[3], S += (T = t[3]) >>> 16, R += 65535 & x, B += x >>> 16, B += (R += (S += (U += 65535 & T) >>> 16) >>> 16) >>> 16, e[3] = k = 65535 & R | B << 16, t[3] = F = 65535 & U | S << 16, U = 65535 & (T = W), S = T >>> 16, R = 65535 & (x = C), B = x >>> 16, x = e[4], S += (T = t[4]) >>> 16, R += 65535 & x, B += x >>> 16, B += (R += (S += (U += 65535 & T) >>> 16) >>> 16) >>> 16, e[4] = C = 65535 & R | B << 16, t[4] = W = 65535 & U | S << 16, U = 65535 & (T = G), S = T >>> 16, R = 65535 & (x = N), B = x >>> 16, x = e[5], S += (T = t[5]) >>> 16, R += 65535 & x, B += x >>> 16, B += (R += (S += (U += 65535 & T) >>> 16) >>> 16) >>> 16, e[5] = N = 65535 & R | B << 16, t[5] = G = 65535 & U | S << 16, U = 65535 & (T = V), S = T >>> 16, R = 65535 & (x = M), B = x >>> 16, x = e[6], S += (T = t[6]) >>> 16, R += 65535 & x, B += x >>> 16, B += (R += (S += (U += 65535 & T) >>> 16) >>> 16) >>> 16, e[6] = M = 65535 & R | B << 16, t[6] = V = 65535 & U | S << 16, U = 65535 & (T = $), S = T >>> 16, R = 65535 & (x = H), B = x >>> 16, x = e[7], S += (T = t[7]) >>> 16, R += 65535 & x, B += x >>> 16, B += (R += (S += (U += 65535 & T) >>> 16) >>> 16) >>> 16, e[7] = H = 65535 & R | B << 16, t[7] = $ = 65535 & U | S << 16, K += 128, n -= 128
                        }
                        return n
                    }

                    function X(e, t, r) {
                        var n, i = new Int32Array(8),
                            s = new Int32Array(8),
                            o = new Uint8Array(256),
                            a = r;
                        for (i[0] = 1779033703, i[1] = 3144134277, i[2] = 1013904242, i[3] = 2773480762, i[4] = 1359893119, i[5] = 2600822924, i[6] = 528734635, i[7] = 1541459225, s[0] = 4089235720, s[1] = 2227873595, s[2] = 4271175723, s[3] = 1595750129, s[4] = 2917565137, s[5] = 725511199, s[6] = 4215389547, s[7] = 327033209, Y(i, s, t, r), r %= 128, n = 0; n < r; n++) o[n] = t[a - r + n];
                        for (o[r] = 128, o[(r = 256 - 128 * (r < 112 ? 1 : 0)) - 9] = 0, p(o, r - 8, a / 536870912 | 0, a << 3), Y(i, s, o, r), n = 0; n < 8; n++) p(e, 8 * n, i[n], s[n]);
                        return 0
                    }

                    function Z(e, r) {
                        var n = t(),
                            i = t(),
                            s = t(),
                            o = t(),
                            a = t(),
                            c = t(),
                            u = t(),
                            h = t(),
                            d = t();
                        M(n, e[1], e[0]), M(d, r[1], r[0]), H(n, n, d), N(i, e[0], e[1]), N(d, r[0], r[1]), H(i, i, d), H(s, e[3], r[3]), H(s, s, l), H(o, e[2], r[2]), N(o, o, o), M(a, i, n), M(c, o, s), N(u, o, s), N(h, i, n), H(e[0], a, c), H(e[1], h, u), H(e[2], u, c), H(e[3], a, h)
                    }

                    function Q(e, t, r) {
                        var n;
                        for (n = 0; n < 4; n++) O(e[n], t[n], r)
                    }

                    function ee(e, r) {
                        var n = t(),
                            i = t(),
                            s = t();
                        D(s, r[2]), H(n, r[0], s), H(i, r[1], s), L(e, i), e[31] ^= k(n) << 7
                    }

                    function te(e, t, r) {
                        var n, i;
                        for (I(e[0], o), I(e[1], a), I(e[2], a), I(e[3], o), i = 255; i >= 0; --i) Q(e, t, n = r[i / 8 | 0] >> (7 & i) & 1), Z(t, e), Z(e, e), Q(e, t, n)
                    }

                    function re(e, r) {
                        var n = [t(), t(), t(), t()];
                        I(n[0], h), I(n[1], d), I(n[2], a), H(n[3], h, d), te(e, n, r)
                    }

                    function ne(e, r, i) {
                        var s, o = new Uint8Array(64),
                            a = [t(), t(), t(), t()];
                        for (i || n(r, 32), X(o, r, 32), o[0] &= 248, o[31] &= 127, o[31] |= 64, re(a, o), ee(e, a), s = 0; s < 32; s++) r[s + 32] = e[s];
                        return 0
                    }
                    var ie = new Float64Array([237, 211, 245, 92, 26, 99, 18, 88, 214, 156, 247, 162, 222, 249, 222, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16]);

                    function se(e, t) {
                        var r, n, i, s;
                        for (n = 63; n >= 32; --n) {
                            for (r = 0, i = n - 32, s = n - 12; i < s; ++i) t[i] += r - 16 * t[n] * ie[i - (n - 32)], r = Math.floor((t[i] + 128) / 256), t[i] -= 256 * r;
                            t[i] += r, t[n] = 0
                        }
                        for (r = 0, i = 0; i < 32; i++) t[i] += r - (t[31] >> 4) * ie[i], r = t[i] >> 8, t[i] &= 255;
                        for (i = 0; i < 32; i++) t[i] -= r * ie[i];
                        for (n = 0; n < 32; n++) t[n + 1] += t[n] >> 8, e[n] = 255 & t[n]
                    }

                    function oe(e) {
                        var t, r = new Float64Array(64);
                        for (t = 0; t < 64; t++) r[t] = e[t];
                        for (t = 0; t < 64; t++) e[t] = 0;
                        se(e, r)
                    }

                    function ae(e, r, n, i) {
                        var s, o, a = new Uint8Array(64),
                            c = new Uint8Array(64),
                            u = new Uint8Array(64),
                            l = new Float64Array(64),
                            h = [t(), t(), t(), t()];
                        X(a, i, 32), a[0] &= 248, a[31] &= 127, a[31] |= 64;
                        var d = n + 64;
                        for (s = 0; s < n; s++) e[64 + s] = r[s];
                        for (s = 0; s < 32; s++) e[32 + s] = a[32 + s];
                        for (X(u, e.subarray(32), n + 32), oe(u), re(h, u), ee(e, h), s = 32; s < 64; s++) e[s] = i[s];
                        for (X(c, e, n + 64), oe(c), s = 0; s < 64; s++) l[s] = 0;
                        for (s = 0; s < 32; s++) l[s] = u[s];
                        for (s = 0; s < 32; s++)
                            for (o = 0; o < 32; o++) l[s + o] += c[s] * a[o];
                        return se(e.subarray(32), l), d
                    }

                    function ce(e, r, n, i) {
                        var s, c = new Uint8Array(32),
                            l = new Uint8Array(64),
                            h = [t(), t(), t(), t()],
                            d = [t(), t(), t(), t()];
                        if (n < 64) return -1;
                        if (function (e, r) {
                                var n = t(),
                                    i = t(),
                                    s = t(),
                                    c = t(),
                                    l = t(),
                                    h = t(),
                                    d = t();
                                return I(e[2], a), C(e[1], r), P(s, e[1]), H(c, s, u), M(s, s, e[2]), N(c, e[2], c), P(l, c), P(h, l), H(d, h, l), H(n, d, s), H(n, n, c), j(n, n), H(n, n, s), H(n, n, c), H(n, n, c), H(e[0], n, c), P(i, e[0]), H(i, i, c), q(i, s) && H(e[0], e[0], f), P(i, e[0]), H(i, i, c), q(i, s) ? -1 : (k(e[0]) === r[31] >> 7 && M(e[0], o, e[0]), H(e[3], e[0], e[1]), 0)
                            }(d, i)) return -1;
                        for (s = 0; s < n; s++) e[s] = r[s];
                        for (s = 0; s < 32; s++) e[s + 32] = i[s];
                        if (X(l, e, n), oe(l), te(h, d, l), re(d, r.subarray(32)), Z(h, d), ee(c, h), n -= 64, w(r, 0, c, 0)) {
                            for (s = 0; s < n; s++) e[s] = 0;
                            return -1
                        }
                        for (s = 0; s < n; s++) e[s] = r[s + 64];
                        return n
                    }
                    var ue = 16,
                        le = 64,
                        he = 32,
                        de = 64;

                    function fe(e, t) {
                        if (32 !== e.length) throw new Error("bad key size");
                        if (24 !== t.length) throw new Error("bad nonce size")
                    }

                    function pe() {
                        for (var e = 0; e < arguments.length; e++)
                            if (!(arguments[e] instanceof Uint8Array)) throw new TypeError("unexpected type, use Uint8Array")
                    }

                    function ye(e) {
                        for (var t = 0; t < e.length; t++) e[t] = 0
                    }
                    e.lowlevel = {
                            crypto_core_hsalsa20: m,
                            crypto_stream_xor: x,
                            crypto_stream: _,
                            crypto_stream_salsa20_xor: E,
                            crypto_stream_salsa20: A,
                            crypto_onetimeauth: U,
                            crypto_onetimeauth_verify: S,
                            crypto_verify_16: g,
                            crypto_verify_32: w,
                            crypto_secretbox: R,
                            crypto_secretbox_open: B,
                            crypto_scalarmult: F,
                            crypto_scalarmult_base: W,
                            crypto_box_beforenm: V,
                            crypto_box_afternm: $,
                            crypto_box: function (e, t, r, n, i, s) {
                                var o = new Uint8Array(32);
                                return V(o, i, s), $(e, t, r, n, o)
                            },
                            crypto_box_open: function (e, t, r, n, i, s) {
                                var o = new Uint8Array(32);
                                return V(o, i, s), K(e, t, r, n, o)
                            },
                            crypto_box_keypair: G,
                            crypto_hash: X,
                            crypto_sign: ae,
                            crypto_sign_keypair: ne,
                            crypto_sign_open: ce,
                            crypto_secretbox_KEYBYTES: 32,
                            crypto_secretbox_NONCEBYTES: 24,
                            crypto_secretbox_ZEROBYTES: 32,
                            crypto_secretbox_BOXZEROBYTES: ue,
                            crypto_scalarmult_BYTES: 32,
                            crypto_scalarmult_SCALARBYTES: 32,
                            crypto_box_PUBLICKEYBYTES: 32,
                            crypto_box_SECRETKEYBYTES: 32,
                            crypto_box_BEFORENMBYTES: 32,
                            crypto_box_NONCEBYTES: 24,
                            crypto_box_ZEROBYTES: 32,
                            crypto_box_BOXZEROBYTES: 16,
                            crypto_sign_BYTES: le,
                            crypto_sign_PUBLICKEYBYTES: he,
                            crypto_sign_SECRETKEYBYTES: de,
                            crypto_sign_SEEDBYTES: 32,
                            crypto_hash_BYTES: 64,
                            gf: t,
                            D: u,
                            L: ie,
                            pack25519: L,
                            unpack25519: C,
                            M: H,
                            A: N,
                            S: P,
                            Z: M,
                            pow2523: j,
                            add: Z,
                            set25519: I,
                            modL: se,
                            scalarmult: te,
                            scalarbase: re
                        }, e.randomBytes = function (e) {
                            var t = new Uint8Array(e);
                            return n(t, e), t
                        }, e.secretbox = function (e, t, r) {
                            pe(e, t, r), fe(r, t);
                            for (var n = new Uint8Array(32 + e.length), i = new Uint8Array(n.length), s = 0; s < e.length; s++) n[s + 32] = e[s];
                            return R(i, n, n.length, t, r), i.subarray(ue)
                        }, e.secretbox.open = function (e, t, r) {
                            pe(e, t, r), fe(r, t);
                            for (var n = new Uint8Array(ue + e.length), i = new Uint8Array(n.length), s = 0; s < e.length; s++) n[s + ue] = e[s];
                            return n.length < 32 || 0 !== B(i, n, n.length, t, r) ? null : i.subarray(32)
                        }, e.secretbox.keyLength = 32, e.secretbox.nonceLength = 24, e.secretbox.overheadLength = ue, e.scalarMult = function (e, t) {
                            if (pe(e, t), 32 !== e.length) throw new Error("bad n size");
                            if (32 !== t.length) throw new Error("bad p size");
                            var r = new Uint8Array(32);
                            return F(r, e, t), r
                        }, e.scalarMult.base = function (e) {
                            if (pe(e), 32 !== e.length) throw new Error("bad n size");
                            var t = new Uint8Array(32);
                            return W(t, e), t
                        }, e.scalarMult.scalarLength = 32, e.scalarMult.groupElementLength = 32, e.box = function (t, r, n, i) {
                            var s = e.box.before(n, i);
                            return e.secretbox(t, r, s)
                        }, e.box.before = function (e, t) {
                            pe(e, t),
                                function (e, t) {
                                    if (32 !== e.length) throw new Error("bad public key size");
                                    if (32 !== t.length) throw new Error("bad secret key size")
                                }(e, t);
                            var r = new Uint8Array(32);
                            return V(r, e, t), r
                        }, e.box.after = e.secretbox, e.box.open = function (t, r, n, i) {
                            var s = e.box.before(n, i);
                            return e.secretbox.open(t, r, s)
                        }, e.box.open.after = e.secretbox.open, e.box.keyPair = function () {
                            var e = new Uint8Array(32),
                                t = new Uint8Array(32);
                            return G(e, t), {
                                publicKey: e,
                                secretKey: t
                            }
                        }, e.box.keyPair.fromSecretKey = function (e) {
                            if (pe(e), 32 !== e.length) throw new Error("bad secret key size");
                            var t = new Uint8Array(32);
                            return W(t, e), {
                                publicKey: t,
                                secretKey: new Uint8Array(e)
                            }
                        }, e.box.publicKeyLength = 32, e.box.secretKeyLength = 32, e.box.sharedKeyLength = 32, e.box.nonceLength = 24, e.box.overheadLength = e.secretbox.overheadLength, e.sign = function (e, t) {
                            if (pe(e, t), t.length !== de) throw new Error("bad secret key size");
                            var r = new Uint8Array(le + e.length);
                            return ae(r, e, e.length, t), r
                        }, e.sign.open = function (e, t) {
                            if (pe(e, t), t.length !== he) throw new Error("bad public key size");
                            var r = new Uint8Array(e.length),
                                n = ce(r, e, e.length, t);
                            if (n < 0) return null;
                            for (var i = new Uint8Array(n), s = 0; s < i.length; s++) i[s] = r[s];
                            return i
                        }, e.sign.detached = function (t, r) {
                            for (var n = e.sign(t, r), i = new Uint8Array(le), s = 0; s < i.length; s++) i[s] = n[s];
                            return i
                        }, e.sign.detached.verify = function (e, t, r) {
                            if (pe(e, t, r), t.length !== le) throw new Error("bad signature size");
                            if (r.length !== he) throw new Error("bad public key size");
                            var n, i = new Uint8Array(le + e.length),
                                s = new Uint8Array(le + e.length);
                            for (n = 0; n < le; n++) i[n] = t[n];
                            for (n = 0; n < e.length; n++) i[n + le] = e[n];
                            return ce(s, i, i.length, r) >= 0
                        }, e.sign.keyPair = function () {
                            var e = new Uint8Array(he),
                                t = new Uint8Array(de);
                            return ne(e, t), {
                                publicKey: e,
                                secretKey: t
                            }
                        }, e.sign.keyPair.fromSecretKey = function (e) {
                            if (pe(e), e.length !== de) throw new Error("bad secret key size");
                            for (var t = new Uint8Array(he), r = 0; r < t.length; r++) t[r] = e[32 + r];
                            return {
                                publicKey: t,
                                secretKey: new Uint8Array(e)
                            }
                        }, e.sign.keyPair.fromSeed = function (e) {
                            if (pe(e), 32 !== e.length) throw new Error("bad seed size");
                            for (var t = new Uint8Array(he), r = new Uint8Array(de), n = 0; n < 32; n++) r[n] = e[n];
                            return ne(t, r, !0), {
                                publicKey: t,
                                secretKey: r
                            }
                        }, e.sign.publicKeyLength = he, e.sign.secretKeyLength = de, e.sign.seedLength = 32, e.sign.signatureLength = le, e.hash = function (e) {
                            pe(e);
                            var t = new Uint8Array(64);
                            return X(t, e, e.length), t
                        }, e.hash.hashLength = 64, e.verify = function (e, t) {
                            return pe(e, t), 0 !== e.length && 0 !== t.length && (e.length === t.length && 0 === y(e, 0, t, 0, e.length))
                        }, e.setPRNG = function (e) {
                            n = e
                        },
                        function () {
                            var t = "undefined" !== typeof self ? self.crypto || self.msCrypto : null;
                            if (t && t.getRandomValues) {
                                e.setPRNG((function (e, r) {
                                    var n, i = new Uint8Array(r);
                                    for (n = 0; n < r; n += 65536) t.getRandomValues(i.subarray(n, n + Math.min(r - n, 65536)));
                                    for (n = 0; n < r; n++) e[n] = i[n];
                                    ye(i)
                                }))
                            } else(t = r(85338)) && t.randomBytes && e.setPRNG((function (e, r) {
                                var n, i = t.randomBytes(r);
                                for (n = 0; n < r; n++) e[n] = i[n];
                                ye(i)
                            }))
                        }()
                }(e.exports ? e.exports : self.nacl = self.nacl || {})
            },
            85338: () => {}
        },
        t = {};

    function r(n) {
        var i = t[n];
        if (void 0 !== i) return i.exports;
        var s = t[n] = {
            exports: {}
        };
        return e[n](s, s.exports, r), s.exports
    }
    r.n = e => {
        var t = e && e.__esModule ? () => e.default : () => e;
        return r.d(t, {
            a: t
        }), t
    }, r.d = (e, t) => {
        for (var n in t) r.o(t, n) && !r.o(e, n) && Object.defineProperty(e, n, {
            enumerable: !0,
            get: t[n]
        })
    }, r.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t), r.r = e => {
        "undefined" !== typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, (() => {
        "use strict";
        var e = {};
        r.r(e), r.d(e, {
            requestPermission: () => ji,
            sendPermissionResponse: () => Fi
        });
        var t = {};
        r.r(t), r.d(t, {
            requestPermission: () => Gi,
            sendPermissionResponse: () => Vi
        });
        var n = r(10458),
            i = r.n(n),
            s = r(96038),
            o = r.n(s),
            a = r(62865),
            c = r.n(a),
            u = r(35020),
            l = r.n(u),
            h = r(79870);
        async function d(e, t) {
            let r;
            try {
                r = await fetch(e)
            } catch (i) {
                return f("Network Error", t, "ERR_NETWORK", e)
            }
            const n = {
                ok: r.ok,
                status: r.status,
                statusText: r.statusText,
                headers: new Headers(r.headers),
                config: t,
                request: e
            };
            if (r.status >= 200 && 204 !== r.status) switch (t.responseType) {
                case "arraybuffer":
                    n.data = await r.arrayBuffer();
                    break;
                case "blob":
                    n.data = await r.blob();
                    break;
                case "json":
                    n.data = await r.json();
                    break;
                case "formData":
                    n.data = await r.formData();
                    break;
                default:
                    n.data = await r.text()
            }
            return n
        }

        function f(e, t, r, n, s) {
            return i().AxiosError && "function" === typeof i().AxiosError ? new(i().AxiosError)(e, i().AxiosError[r], t, n, s) : function (e, t, r, n, i) {
                e.config = t, r && (e.code = r);
                return e.request = n, e.response = i, e.isAxiosError = !0, e.toJSON = function () {
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
                }, e
            }(new Error(e), t, r, n, s)
        }
        var p = r(78038);

        function y(e) {
            if (!Number.isSafeInteger(e) || e < 0) throw new Error("Wrong positive integer: ".concat(e))
        }

        function g(e) {
            if (!(e instanceof Uint8Array)) throw new TypeError("Expected Uint8Array");
            for (var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++) r[n - 1] = arguments[n];
            if (r.length > 0 && !r.includes(e.length)) throw new TypeError("Expected Uint8Array of length ".concat(r, ", not of length=").concat(e.length))
        }
        const w = {
                number: y,
                bool: function (e) {
                    if ("boolean" !== typeof e) throw new Error("Expected boolean, not ".concat(e))
                },
                bytes: g,
                hash: function (e) {
                    if ("function" !== typeof e || "function" !== typeof e.create) throw new Error("Hash should be wrapped by utils.wrapConstructor");
                    y(e.outputLen), y(e.blockLen)
                },
                exists: function (e) {
                    let t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                    if (e.destroyed) throw new Error("Hash instance has been destroyed");
                    if (t && e.finished) throw new Error("Hash#digest() has already been called")
                },
                output: function (e, t) {
                    g(e);
                    const r = t.outputLen;
                    if (e.length < r) throw new Error("digestInto() expects output buffer of length at least ".concat(r))
                }
            },
            b = w,
            m = BigInt(2 ** 32 - 1),
            v = BigInt(32);

        function E(e) {
            let t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
            return t ? {
                h: Number(e & m),
                l: Number(e >> v & m)
            } : {
                h: 0 | Number(e >> v & m),
                l: 0 | Number(e & m)
            }
        }
        const A = {
                fromBig: E,
                split: function (e) {
                    let t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                        r = new Uint32Array(e.length),
                        n = new Uint32Array(e.length);
                    for (let i = 0; i < e.length; i++) {
                        const {
                            h: s,
                            l: o
                        } = E(e[i], t);
                        [r[i], n[i]] = [s, o]
                    }
                    return [r, n]
                },
                toBig: (e, t) => BigInt(e >>> 0) << v | BigInt(t >>> 0),
                shrSH: (e, t, r) => e >>> r,
                shrSL: (e, t, r) => e << 32 - r | t >>> r,
                rotrSH: (e, t, r) => e >>> r | t << 32 - r,
                rotrSL: (e, t, r) => e << 32 - r | t >>> r,
                rotrBH: (e, t, r) => e << 64 - r | t >>> r - 32,
                rotrBL: (e, t, r) => e >>> r - 32 | t << 64 - r,
                rotr32H: (e, t) => t,
                rotr32L: (e, t) => e,
                rotlSH: (e, t, r) => e << r | t >>> 32 - r,
                rotlSL: (e, t, r) => t << r | e >>> 32 - r,
                rotlBH: (e, t, r) => t << r - 32 | e >>> 64 - r,
                rotlBL: (e, t, r) => e << r - 32 | t >>> 64 - r,
                add: function (e, t, r, n) {
                    const i = (t >>> 0) + (n >>> 0);
                    return {
                        h: e + r + (i / 2 ** 32 | 0) | 0,
                        l: 0 | i
                    }
                },
                add3L: (e, t, r) => (e >>> 0) + (t >>> 0) + (r >>> 0),
                add3H: (e, t, r, n) => t + r + n + (e / 2 ** 32 | 0) | 0,
                add4L: (e, t, r, n) => (e >>> 0) + (t >>> 0) + (r >>> 0) + (n >>> 0),
                add4H: (e, t, r, n, i) => t + r + n + i + (e / 2 ** 32 | 0) | 0,
                add5H: (e, t, r, n, i, s) => t + r + n + i + s + (e / 2 ** 32 | 0) | 0,
                add5L: (e, t, r, n, i) => (e >>> 0) + (t >>> 0) + (r >>> 0) + (n >>> 0) + (i >>> 0)
            },
            _ = ("object" === typeof self && "crypto" in self && self.crypto, e => new DataView(e.buffer, e.byteOffset, e.byteLength));
        if (!(68 === new Uint8Array(new Uint32Array([287454020]).buffer)[0])) throw new Error("Non little-endian hardware is not supported");
        const x = Array.from({
            length: 256
        }, ((e, t) => t.toString(16).padStart(2, "0")));

        function T(e) {
            if (!(e instanceof Uint8Array)) throw new Error("Uint8Array expected");
            let t = "";
            for (let r = 0; r < e.length; r++) t += x[e[r]];
            return t
        }

        function U(e) {
            if ("string" !== typeof e) throw new TypeError("hexToBytes: expected string, got " + typeof e);
            if (e.length % 2) throw new Error("hexToBytes: received invalid unpadded hex");
            const t = new Uint8Array(e.length / 2);
            for (let r = 0; r < t.length; r++) {
                const n = 2 * r,
                    i = e.slice(n, n + 2),
                    s = Number.parseInt(i, 16);
                if (Number.isNaN(s) || s < 0) throw new Error("Invalid byte sequence");
                t[r] = s
            }
            return t
        }

        function S(e) {
            if ("string" === typeof e && (e = function (e) {
                    if ("string" !== typeof e) throw new TypeError("utf8ToBytes expected string, got ".concat(typeof e));
                    return (new TextEncoder).encode(e)
                }(e)), !(e instanceof Uint8Array)) throw new TypeError("Expected input type is Uint8Array (got ".concat(typeof e, ")"));
            return e
        }
        class R {
            clone() {
                return this._cloneInto()
            }
        }

        function B(e) {
            const t = t => e().update(S(t)).digest(),
                r = e();
            return t.outputLen = r.outputLen, t.blockLen = r.blockLen, t.create = () => e(), t
        }
        const [I, z, O] = [
            [],
            [],
            []
        ], L = BigInt(0), q = BigInt(1), k = BigInt(2), C = BigInt(7), N = BigInt(256), M = BigInt(113);
        for (let r = 0, ds = q, fs = 1, ps = 0; r < 24; r++) {
            [fs, ps] = [ps, (2 * fs + 3 * ps) % 5], I.push(2 * (5 * ps + fs)), z.push((r + 1) * (r + 2) / 2 % 64);
            let e = L;
            for (let t = 0; t < 7; t++) ds = (ds << q ^ (ds >> C) * M) % N, ds & k && (e ^= q << (q << BigInt(t)) - q);
            O.push(e)
        }
        const [H, P] = A.split(O, !0), D = (e, t, r) => r > 32 ? A.rotlBH(e, t, r) : A.rotlSH(e, t, r), j = (e, t, r) => r > 32 ? A.rotlBL(e, t, r) : A.rotlSL(e, t, r);
        class F extends R {
            constructor(e, t, r) {
                let n = arguments.length > 3 && void 0 !== arguments[3] && arguments[3],
                    i = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 24;
                if (super(), this.blockLen = e, this.suffix = t, this.outputLen = r, this.enableXOF = n, this.rounds = i, this.pos = 0, this.posOut = 0, this.finished = !1, this.destroyed = !1, b.number(r), 0 >= this.blockLen || this.blockLen >= 200) throw new Error("Sha3 supports only keccak-f1600 function");
                var s;
                this.state = new Uint8Array(200), this.state32 = (s = this.state, new Uint32Array(s.buffer, s.byteOffset, Math.floor(s.byteLength / 4)))
            }
            keccak() {
                ! function (e) {
                    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 24;
                    const r = new Uint32Array(10);
                    for (let n = 24 - t; n < 24; n++) {
                        for (let n = 0; n < 10; n++) r[n] = e[n] ^ e[n + 10] ^ e[n + 20] ^ e[n + 30] ^ e[n + 40];
                        for (let n = 0; n < 10; n += 2) {
                            const t = (n + 8) % 10,
                                i = (n + 2) % 10,
                                s = r[i],
                                o = r[i + 1],
                                a = D(s, o, 1) ^ r[t],
                                c = j(s, o, 1) ^ r[t + 1];
                            for (let r = 0; r < 50; r += 10) e[n + r] ^= a, e[n + r + 1] ^= c
                        }
                        let t = e[2],
                            i = e[3];
                        for (let r = 0; r < 24; r++) {
                            const n = z[r],
                                s = D(t, i, n),
                                o = j(t, i, n),
                                a = I[r];
                            t = e[a], i = e[a + 1], e[a] = s, e[a + 1] = o
                        }
                        for (let n = 0; n < 50; n += 10) {
                            for (let t = 0; t < 10; t++) r[t] = e[n + t];
                            for (let t = 0; t < 10; t++) e[n + t] ^= ~r[(t + 2) % 10] & r[(t + 4) % 10]
                        }
                        e[0] ^= H[n], e[1] ^= P[n]
                    }
                    r.fill(0)
                }(this.state32, this.rounds), this.posOut = 0, this.pos = 0
            }
            update(e) {
                b.exists(this);
                const {
                    blockLen: t,
                    state: r
                } = this, n = (e = S(e)).length;
                for (let i = 0; i < n;) {
                    const s = Math.min(t - this.pos, n - i);
                    for (let t = 0; t < s; t++) r[this.pos++] ^= e[i++];
                    this.pos === t && this.keccak()
                }
                return this
            }
            finish() {
                if (this.finished) return;
                this.finished = !0;
                const {
                    state: e,
                    suffix: t,
                    pos: r,
                    blockLen: n
                } = this;
                e[r] ^= t, 0 !== (128 & t) && r === n - 1 && this.keccak(), e[n - 1] ^= 128, this.keccak()
            }
            writeInto(e) {
                b.exists(this, !1), b.bytes(e), this.finish();
                const t = this.state,
                    {
                        blockLen: r
                    } = this;
                for (let n = 0, i = e.length; n < i;) {
                    this.posOut >= r && this.keccak();
                    const s = Math.min(r - this.posOut, i - n);
                    e.set(t.subarray(this.posOut, this.posOut + s), n), this.posOut += s, n += s
                }
                return e
            }
            xofInto(e) {
                if (!this.enableXOF) throw new Error("XOF is not possible for this instance");
                return this.writeInto(e)
            }
            xof(e) {
                return b.number(e), this.xofInto(new Uint8Array(e))
            }
            digestInto(e) {
                if (b.output(e, this), this.finished) throw new Error("digest() was already called");
                return this.writeInto(e), this.destroy(), e
            }
            digest() {
                return this.digestInto(new Uint8Array(this.outputLen))
            }
            destroy() {
                this.destroyed = !0, this.state.fill(0)
            }
            _cloneInto(e) {
                const {
                    blockLen: t,
                    suffix: r,
                    outputLen: n,
                    rounds: i,
                    enableXOF: s
                } = this;
                return e || (e = new F(t, r, n, s, i)), e.state32.set(this.state32), e.pos = this.pos, e.posOut = this.posOut, e.finished = this.finished, e.rounds = i, e.suffix = r, e.outputLen = n, e.enableXOF = s, e.destroyed = this.destroyed, e
            }
        }
        const W = (e, t, r) => B((() => new F(t, e, r))),
            G = (W(6, 144, 28), W(6, 136, 32)),
            V = (W(6, 104, 48), W(6, 72, 64), W(1, 144, 28), W(1, 136, 32), W(1, 104, 48), W(1, 72, 64), (e, t, r) => function (e) {
                const t = (t, r) => e(r).update(S(t)).digest(),
                    r = e({});
                return t.outputLen = r.outputLen, t.blockLen = r.blockLen, t.create = t => e(t), t
            }((function () {
                let n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                return new F(t, e, void 0 === n.dkLen ? r : n.dkLen, !0)
            })));
        V(31, 168, 16), V(31, 136, 32);
        var $ = r(64069);
        class K extends R {
            constructor(e, t) {
                super(), this.finished = !1, this.destroyed = !1, b.hash(e);
                const r = S(t);
                if (this.iHash = e.create(), !(this.iHash instanceof R)) throw new TypeError("Expected instance of class which extends utils.Hash");
                const n = this.blockLen = this.iHash.blockLen;
                this.outputLen = this.iHash.outputLen;
                const i = new Uint8Array(n);
                i.set(r.length > this.iHash.blockLen ? e.create().update(r).digest() : r);
                for (let s = 0; s < i.length; s++) i[s] ^= 54;
                this.iHash.update(i), this.oHash = e.create();
                for (let s = 0; s < i.length; s++) i[s] ^= 106;
                this.oHash.update(i), i.fill(0)
            }
            update(e) {
                return b.exists(this), this.iHash.update(e), this
            }
            digestInto(e) {
                b.exists(this), b.bytes(e, this.outputLen), this.finished = !0, this.iHash.digestInto(e), this.oHash.update(e), this.oHash.digestInto(e), this.destroy()
            }
            digest() {
                const e = new Uint8Array(this.oHash.outputLen);
                return this.digestInto(e), e
            }
            _cloneInto(e) {
                e || (e = Object.create(Object.getPrototypeOf(this), {}));
                const {
                    oHash: t,
                    iHash: r,
                    finished: n,
                    destroyed: i,
                    blockLen: s,
                    outputLen: o
                } = this;
                return e.finished = n, e.destroyed = i, e.blockLen = s, e.outputLen = o, e.oHash = t._cloneInto(e.oHash), e.iHash = r._cloneInto(e.iHash), e
            }
            destroy() {
                this.destroyed = !0, this.oHash.destroy(), this.iHash.destroy()
            }
        }
        const J = (e, t, r) => new K(e, t).update(r).digest();
        J.create = (e, t) => new K(e, t);
        class Y extends R {
            constructor(e, t, r, n) {
                super(), this.blockLen = e, this.outputLen = t, this.padOffset = r, this.isLE = n, this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.buffer = new Uint8Array(e), this.view = _(this.buffer)
            }
            update(e) {
                b.exists(this);
                const {
                    view: t,
                    buffer: r,
                    blockLen: n
                } = this, i = (e = S(e)).length;
                for (let s = 0; s < i;) {
                    const o = Math.min(n - this.pos, i - s);
                    if (o !== n) r.set(e.subarray(s, s + o), this.pos), this.pos += o, s += o, this.pos === n && (this.process(t, 0), this.pos = 0);
                    else {
                        const t = _(e);
                        for (; n <= i - s; s += n) this.process(t, s)
                    }
                }
                return this.length += e.length, this.roundClean(), this
            }
            digestInto(e) {
                b.exists(this), b.output(e, this), this.finished = !0;
                const {
                    buffer: t,
                    view: r,
                    blockLen: n,
                    isLE: i
                } = this;
                let {
                    pos: s
                } = this;
                t[s++] = 128, this.buffer.subarray(s).fill(0), this.padOffset > n - s && (this.process(r, 0), s = 0);
                for (let a = s; a < n; a++) t[a] = 0;
                ! function (e, t, r, n) {
                    if ("function" === typeof e.setBigUint64) return e.setBigUint64(t, r, n);
                    const i = BigInt(32),
                        s = BigInt(4294967295),
                        o = Number(r >> i & s),
                        a = Number(r & s),
                        c = n ? 4 : 0,
                        u = n ? 0 : 4;
                    e.setUint32(t + c, o, n), e.setUint32(t + u, a, n)
                }(r, n - 8, BigInt(8 * this.length), i), this.process(r, 0);
                const o = _(e);
                this.get().forEach(((e, t) => o.setUint32(4 * t, e, i)))
            }
            digest() {
                const {
                    buffer: e,
                    outputLen: t
                } = this;
                this.digestInto(e);
                const r = e.slice(0, t);
                return this.destroy(), r
            }
            _cloneInto(e) {
                e || (e = new this.constructor), e.set(...this.get());
                const {
                    blockLen: t,
                    buffer: r,
                    length: n,
                    finished: i,
                    destroyed: s,
                    pos: o
                } = this;
                return e.length = n, e.pos = o, e.finished = i, e.destroyed = s, n % t && e.buffer.set(r), e
            }
        }
        const [X, Z] = A.split(["0x428a2f98d728ae22", "0x7137449123ef65cd", "0xb5c0fbcfec4d3b2f", "0xe9b5dba58189dbbc", "0x3956c25bf348b538", "0x59f111f1b605d019", "0x923f82a4af194f9b", "0xab1c5ed5da6d8118", "0xd807aa98a3030242", "0x12835b0145706fbe", "0x243185be4ee4b28c", "0x550c7dc3d5ffb4e2", "0x72be5d74f27b896f", "0x80deb1fe3b1696b1", "0x9bdc06a725c71235", "0xc19bf174cf692694", "0xe49b69c19ef14ad2", "0xefbe4786384f25e3", "0x0fc19dc68b8cd5b5", "0x240ca1cc77ac9c65", "0x2de92c6f592b0275", "0x4a7484aa6ea6e483", "0x5cb0a9dcbd41fbd4", "0x76f988da831153b5", "0x983e5152ee66dfab", "0xa831c66d2db43210", "0xb00327c898fb213f", "0xbf597fc7beef0ee4", "0xc6e00bf33da88fc2", "0xd5a79147930aa725", "0x06ca6351e003826f", "0x142929670a0e6e70", "0x27b70a8546d22ffc", "0x2e1b21385c26c926", "0x4d2c6dfc5ac42aed", "0x53380d139d95b3df", "0x650a73548baf63de", "0x766a0abb3c77b2a8", "0x81c2c92e47edaee6", "0x92722c851482353b", "0xa2bfe8a14cf10364", "0xa81a664bbc423001", "0xc24b8b70d0f89791", "0xc76c51a30654be30", "0xd192e819d6ef5218", "0xd69906245565a910", "0xf40e35855771202a", "0x106aa07032bbd1b8", "0x19a4c116b8d2d0c8", "0x1e376c085141ab53", "0x2748774cdf8eeb99", "0x34b0bcb5e19b48a8", "0x391c0cb3c5c95a63", "0x4ed8aa4ae3418acb", "0x5b9cca4f7763e373", "0x682e6ff3d6b2b8a3", "0x748f82ee5defb2fc", "0x78a5636f43172f60", "0x84c87814a1f0ab72", "0x8cc702081a6439ec", "0x90befffa23631e28", "0xa4506cebde82bde9", "0xbef9a3f7b2c67915", "0xc67178f2e372532b", "0xca273eceea26619c", "0xd186b8c721c0c207", "0xeada7dd6cde0eb1e", "0xf57d4f7fee6ed178", "0x06f067aa72176fba", "0x0a637dc5a2c898a6", "0x113f9804bef90dae", "0x1b710b35131c471b", "0x28db77f523047d84", "0x32caab7b40c72493", "0x3c9ebe0a15c9bebc", "0x431d67c49c100d4c", "0x4cc5d4becb3e42b6", "0x597f299cfc657e2a", "0x5fcb6fab3ad6faec", "0x6c44198c4a475817"].map((e => BigInt(e)))), Q = new Uint32Array(80), ee = new Uint32Array(80);
        class te extends Y {
            constructor() {
                super(128, 64, 16, !1), this.Ah = 1779033703, this.Al = -205731576, this.Bh = -1150833019, this.Bl = -2067093701, this.Ch = 1013904242, this.Cl = -23791573, this.Dh = -1521486534, this.Dl = 1595750129, this.Eh = 1359893119, this.El = -1377402159, this.Fh = -1694144372, this.Fl = 725511199, this.Gh = 528734635, this.Gl = -79577749, this.Hh = 1541459225, this.Hl = 327033209
            }
            get() {
                const {
                    Ah: e,
                    Al: t,
                    Bh: r,
                    Bl: n,
                    Ch: i,
                    Cl: s,
                    Dh: o,
                    Dl: a,
                    Eh: c,
                    El: u,
                    Fh: l,
                    Fl: h,
                    Gh: d,
                    Gl: f,
                    Hh: p,
                    Hl: y
                } = this;
                return [e, t, r, n, i, s, o, a, c, u, l, h, d, f, p, y]
            }
            set(e, t, r, n, i, s, o, a, c, u, l, h, d, f, p, y) {
                this.Ah = 0 | e, this.Al = 0 | t, this.Bh = 0 | r, this.Bl = 0 | n, this.Ch = 0 | i, this.Cl = 0 | s, this.Dh = 0 | o, this.Dl = 0 | a, this.Eh = 0 | c, this.El = 0 | u, this.Fh = 0 | l, this.Fl = 0 | h, this.Gh = 0 | d, this.Gl = 0 | f, this.Hh = 0 | p, this.Hl = 0 | y
            }
            process(e, t) {
                for (let b = 0; b < 16; b++, t += 4) Q[b] = e.getUint32(t), ee[b] = e.getUint32(t += 4);
                for (let b = 16; b < 80; b++) {
                    const e = 0 | Q[b - 15],
                        t = 0 | ee[b - 15],
                        r = A.rotrSH(e, t, 1) ^ A.rotrSH(e, t, 8) ^ A.shrSH(e, t, 7),
                        n = A.rotrSL(e, t, 1) ^ A.rotrSL(e, t, 8) ^ A.shrSL(e, t, 7),
                        i = 0 | Q[b - 2],
                        s = 0 | ee[b - 2],
                        o = A.rotrSH(i, s, 19) ^ A.rotrBH(i, s, 61) ^ A.shrSH(i, s, 6),
                        a = A.rotrSL(i, s, 19) ^ A.rotrBL(i, s, 61) ^ A.shrSL(i, s, 6),
                        c = A.add4L(n, a, ee[b - 7], ee[b - 16]),
                        u = A.add4H(c, r, o, Q[b - 7], Q[b - 16]);
                    Q[b] = 0 | u, ee[b] = 0 | c
                }
                let {
                    Ah: r,
                    Al: n,
                    Bh: i,
                    Bl: s,
                    Ch: o,
                    Cl: a,
                    Dh: c,
                    Dl: u,
                    Eh: l,
                    El: h,
                    Fh: d,
                    Fl: f,
                    Gh: p,
                    Gl: y,
                    Hh: g,
                    Hl: w
                } = this;
                for (let b = 0; b < 80; b++) {
                    const e = A.rotrSH(l, h, 14) ^ A.rotrSH(l, h, 18) ^ A.rotrBH(l, h, 41),
                        t = A.rotrSL(l, h, 14) ^ A.rotrSL(l, h, 18) ^ A.rotrBL(l, h, 41),
                        m = l & d ^ ~l & p,
                        v = h & f ^ ~h & y,
                        E = A.add5L(w, t, v, Z[b], ee[b]),
                        _ = A.add5H(E, g, e, m, X[b], Q[b]),
                        x = 0 | E,
                        T = A.rotrSH(r, n, 28) ^ A.rotrBH(r, n, 34) ^ A.rotrBH(r, n, 39),
                        U = A.rotrSL(r, n, 28) ^ A.rotrBL(r, n, 34) ^ A.rotrBL(r, n, 39),
                        S = r & i ^ r & o ^ i & o,
                        R = n & s ^ n & a ^ s & a;
                    g = 0 | p, w = 0 | y, p = 0 | d, y = 0 | f, d = 0 | l, f = 0 | h, ({
                        h: l,
                        l: h
                    } = A.add(0 | c, 0 | u, 0 | _, 0 | x)), c = 0 | o, u = 0 | a, o = 0 | i, a = 0 | s, i = 0 | r, s = 0 | n;
                    const B = A.add3L(x, U, R);
                    r = A.add3H(B, _, T, S), n = 0 | B
                }({
                    h: r,
                    l: n
                } = A.add(0 | this.Ah, 0 | this.Al, 0 | r, 0 | n)), ({
                    h: i,
                    l: s
                } = A.add(0 | this.Bh, 0 | this.Bl, 0 | i, 0 | s)), ({
                    h: o,
                    l: a
                } = A.add(0 | this.Ch, 0 | this.Cl, 0 | o, 0 | a)), ({
                    h: c,
                    l: u
                } = A.add(0 | this.Dh, 0 | this.Dl, 0 | c, 0 | u)), ({
                    h: l,
                    l: h
                } = A.add(0 | this.Eh, 0 | this.El, 0 | l, 0 | h)), ({
                    h: d,
                    l: f
                } = A.add(0 | this.Fh, 0 | this.Fl, 0 | d, 0 | f)), ({
                    h: p,
                    l: y
                } = A.add(0 | this.Gh, 0 | this.Gl, 0 | p, 0 | y)), ({
                    h: g,
                    l: w
                } = A.add(0 | this.Hh, 0 | this.Hl, 0 | g, 0 | w)), this.set(r, n, i, s, o, a, c, u, l, h, d, f, p, y, g, w)
            }
            roundClean() {
                Q.fill(0), ee.fill(0)
            }
            destroy() {
                this.buffer.fill(0), this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
            }
        }
        class re extends te {
            constructor() {
                super(), this.Ah = 573645204, this.Al = -64227540, this.Bh = -1621794909, this.Bl = -934517566, this.Ch = 596883563, this.Cl = 1867755857, this.Dh = -1774684391, this.Dl = 1497426621, this.Eh = -1775747358, this.El = -1467023389, this.Fh = -1101128155, this.Fl = 1401305490, this.Gh = 721525244, this.Gl = 746961066, this.Hh = 246885852, this.Hl = -2117784414, this.outputLen = 32
            }
        }
        class ne extends te {
            constructor() {
                super(), this.Ah = -876896931, this.Al = -1056596264, this.Bh = 1654270250, this.Bl = 914150663, this.Ch = -1856437926, this.Cl = 812702999, this.Dh = 355462360, this.Dl = -150054599, this.Eh = 1731405415, this.El = -4191439, this.Fh = -1900787065, this.Fl = 1750603025, this.Gh = -619958771, this.Gl = 1694076839, this.Hh = 1203062813, this.Hl = -1090891868, this.outputLen = 48
            }
        }
        const ie = B((() => new te));
        B((() => new re)), B((() => new ne));
        var se = r(77236),
            oe = Object.defineProperty,
            ae = Object.getOwnPropertyDescriptor,
            ce = (e, t) => {
                for (var r in t) oe(e, r, {
                    get: t[r],
                    enumerable: !0
                })
            },
            ue = (e, t, r, n) => {
                for (var i, s = n > 1 ? void 0 : n ? ae(t, r) : t, o = e.length - 1; o >= 0; o--)(i = e[o]) && (s = (n ? i(t, r, s) : i(s)) || s);
                return n && s && oe(t, r, s), s
            },
            le = /^m(\/[0-9]+')+$/,
            he = e => e.replace("'", ""),
            de = 2147483648,
            fe = e => {
                const t = J.create(ie, "ed25519 seed").update(U(e)).digest();
                return {
                    key: t.slice(0, 32),
                    chainCode: t.slice(32)
                }
            },
            pe = (e, t) => {
                let {
                    key: r,
                    chainCode: n
                } = e;
                const i = new ArrayBuffer(4);
                new DataView(i).setUint32(0, t);
                const s = new Uint8Array(i),
                    o = new Uint8Array([0]),
                    a = new Uint8Array([...o, ...r, ...s]),
                    c = J.create(ie, n).update(a).digest();
                return {
                    key: c.slice(0, 32),
                    chainCode: c.slice(32)
                }
            },
            ye = e => !!le.test(e) && !e.split("/").slice(1).map(he).some(Number.isNaN),
            ge = class {
                static fromBuffer(e) {
                    return ge.fromUint8Array(e)
                }
                static fromUint8Array(e) {
                    return new ge(T(e))
                }
                static ensure(e) {
                    return "string" === typeof e ? new ge(e) : e
                }
                constructor(e) {
                    e.startsWith("0x") ? this.hexString = e : this.hexString = "0x".concat(e)
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
                    const e = this.hexString.replace(/^0x0*/, "");
                    return "0x".concat(e)
                }
                toUint8Array() {
                    return Uint8Array.from(U(this.noPrefix()))
                }
            };
        async function we(e) {
            return new Promise((t => {
                setTimeout(t, e)
            }))
        }
        var be = "0x1::aptos_coin::AptosCoin";

        function me(e) {
            let t, r, n;
            return "object" === typeof e ? (t = e.hashFunction, r = e.ttlMs, n = e.tags) : t = e, (e, i, s) => {
                if (null != s.value) s.value = Ee(s.value, t, r, n);
                else {
                    if (null == s.get) throw new Error("Only put a Memoize() decorator on a method or get accessor.");
                    s.get = Ee(s.get, t, r, n)
                }
            }
        }
        var ve = new Map;

        function Ee(e, t) {
            let r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
                n = arguments.length > 3 ? arguments[3] : void 0;
            const i = Symbol("__memoized_map__");
            return function () {
                let s;
                const o = this;
                o.hasOwnProperty(i) || Object.defineProperty(o, i, {
                    configurable: !1,
                    enumerable: !1,
                    writable: !1,
                    value: new Map
                });
                const a = o[i];
                if (Array.isArray(n))
                    for (const e of n) ve.has(e) ? ve.get(e).push(a) : ve.set(e, [a]);
                for (var c = arguments.length, u = new Array(c), l = 0; l < c; l++) u[l] = arguments[l];
                if (t || u.length > 0 || r > 0) {
                    let n;
                    n = !0 === t ? u.map((e => e.toString())).join("!") : t ? t.apply(o, u) : u[0];
                    const i = "".concat(n, "__timestamp");
                    let c = !1;
                    if (r > 0)
                        if (a.has(i)) {
                            const e = a.get(i);
                            c = Date.now() - e > r
                        } else c = !0;
                    a.has(n) && !c ? s = a.get(n) : (s = e.apply(o, u), a.set(n, s), r > 0 && a.set(i, Date.now()))
                } else {
                    const t = o;
                    a.has(t) ? s = a.get(t) : (s = e.apply(o, u), a.set(t, s))
                }
                return s
            }
        }
        var Ae = class {
                static fromAptosAccountObject(e) {
                    return new Ae(ge.ensure(e.privateKeyHex).toUint8Array(), e.address)
                }
                static fromDerivePath(e, t) {
                    if (!Ae.isValidPath(e)) throw new Error("Invalid derivation path");
                    const r = t.trim().split(/\s+/).map((e => e.toLowerCase())).join(" "),
                        {
                            key: n
                        } = function (e, t) {
                            let r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : de;
                            if (!ye(e)) throw new Error("Invalid derivation path");
                            const {
                                key: n,
                                chainCode: i
                            } = fe(t);
                            return e.split("/").slice(1).map(he).map((e => parseInt(e, 10))).reduce(((e, t) => pe(e, t + r)), {
                                key: n,
                                chainCode: i
                            })
                        }(e, T($.Z1(r)));
                    return new Ae(n)
                }
                constructor(e, t) {
                    this.signingKey = e ? p.sign.keyPair.fromSeed(e.slice(0, 32)) : p.sign.keyPair(), this.accountAddress = ge.ensure(t || this.authKey().hex())
                }
                address() {
                    return this.accountAddress
                }
                authKey() {
                    const e = G.create();
                    return e.update(this.signingKey.publicKey), e.update("\0"), ge.fromUint8Array(e.digest())
                }
                pubKey() {
                    return ge.fromUint8Array(this.signingKey.publicKey)
                }
                signBuffer(e) {
                    const t = p.sign(e, this.signingKey.secretKey);
                    return ge.fromUint8Array(t.slice(0, 64))
                }
                signHexString(e) {
                    const t = ge.ensure(e).toUint8Array();
                    return this.signBuffer(t)
                }
                toPrivateKeyObject() {
                    return {
                        address: this.address().hex(),
                        publicKeyHex: this.pubKey().hex(),
                        privateKeyHex: ge.fromUint8Array(this.signingKey.secretKey.slice(0, 32)).hex()
                    }
                }
            },
            _e = Ae;
        _e.isValidPath = e => !!/^m\/44'\/637'\/[0-9]+'\/[0-9]+'\/[0-9]+'+$/.test(e), ue([me()], _e.prototype, "authKey", 1);
        var xe = {};
        ce(xe, {
            $AccountData: () => Xe,
            $AccountSignature: () => Ze,
            $AccountSignature_Ed25519Signature: () => Qe,
            $AccountSignature_MultiEd25519Signature: () => et,
            $Address: () => tt,
            $AptosError: () => rt,
            $AptosErrorCode: () => nt,
            $Block: () => it,
            $BlockMetadataTransaction: () => st,
            $DecodedTableData: () => ot,
            $DeleteModule: () => ct,
            $DeleteResource: () => ut,
            $DeleteTableItem: () => lt,
            $DeletedTableData: () => at,
            $DirectWriteSet: () => ht,
            $Ed25519Signature: () => dt,
            $EncodeSubmissionRequest: () => ft,
            $EntryFunctionId: () => pt,
            $EntryFunctionPayload: () => yt,
            $Event: () => gt,
            $EventGuid: () => wt,
            $GasEstimation: () => bt,
            $GenesisPayload: () => mt,
            $GenesisPayload_WriteSetPayload: () => vt,
            $GenesisTransaction: () => Et,
            $HashValue: () => At,
            $HealthCheckSuccess: () => _t,
            $HexEncodedBytes: () => xt,
            $IdentifierWrapper: () => Tt,
            $IndexResponse: () => Ut,
            $ModuleBundlePayload: () => St,
            $MoveAbility: () => Rt,
            $MoveFunction: () => Bt,
            $MoveFunctionGenericTypeParam: () => It,
            $MoveFunctionVisibility: () => zt,
            $MoveModule: () => Ot,
            $MoveModuleBytecode: () => Lt,
            $MoveModuleId: () => qt,
            $MoveResource: () => kt,
            $MoveScriptBytecode: () => Ct,
            $MoveStruct: () => Nt,
            $MoveStructField: () => Mt,
            $MoveStructGenericTypeParam: () => Ht,
            $MoveStructTag: () => Pt,
            $MoveStructValue: () => Dt,
            $MoveType: () => jt,
            $MoveValue: () => Ft,
            $MultiAgentSignature: () => Wt,
            $MultiEd25519Signature: () => Gt,
            $PendingTransaction: () => Vt,
            $RoleType: () => $t,
            $ScriptPayload: () => Kt,
            $ScriptWriteSet: () => Jt,
            $StateCheckpointTransaction: () => Yt,
            $SubmitTransactionRequest: () => Xt,
            $TableItemRequest: () => Zt,
            $Transaction: () => Qt,
            $TransactionPayload: () => sr,
            $TransactionPayload_EntryFunctionPayload: () => or,
            $TransactionPayload_ModuleBundlePayload: () => ar,
            $TransactionPayload_ScriptPayload: () => cr,
            $TransactionSignature: () => hr,
            $TransactionSignature_Ed25519Signature: () => dr,
            $TransactionSignature_MultiAgentSignature: () => fr,
            $TransactionSignature_MultiEd25519Signature: () => pr,
            $Transaction_BlockMetadataTransaction: () => er,
            $Transaction_GenesisTransaction: () => tr,
            $Transaction_PendingTransaction: () => rr,
            $Transaction_StateCheckpointTransaction: () => nr,
            $Transaction_UserTransaction: () => ir,
            $TransactionsBatchSingleSubmissionFailure: () => ur,
            $TransactionsBatchSubmissionResult: () => lr,
            $U128: () => yr,
            $U64: () => gr,
            $UserTransaction: () => wr,
            $VersionedEvent: () => br,
            $WriteModule: () => mr,
            $WriteResource: () => vr,
            $WriteSet: () => Er,
            $WriteSetChange: () => xr,
            $WriteSetChange_DeleteModule: () => Tr,
            $WriteSetChange_DeleteResource: () => Ur,
            $WriteSetChange_DeleteTableItem: () => Sr,
            $WriteSetChange_WriteModule: () => Rr,
            $WriteSetChange_WriteResource: () => Br,
            $WriteSetChange_WriteTableItem: () => Ir,
            $WriteSetPayload: () => zr,
            $WriteSet_DirectWriteSet: () => Ar,
            $WriteSet_ScriptWriteSet: () => _r,
            $WriteTableItem: () => Or,
            AccountsService: () => Pe,
            ApiError: () => Ue,
            AptosErrorCode: () => Ke,
            AptosGeneratedClient: () => Ve,
            BaseHttpRequest: () => Te,
            BlocksService: () => De,
            CancelError: () => Se,
            CancelablePromise: () => Re,
            EventsService: () => je,
            GeneralService: () => Fe,
            MoveFunctionVisibility: () => Je,
            OpenAPI: () => $e,
            RoleType: () => Ye,
            TablesService: () => We,
            TransactionsService: () => Ge
        });
        var Te = class {
                constructor(e) {
                    this.config = e
                }
            },
            Ue = class extends Error {
                constructor(e, t, r) {
                    super(r), this.name = "ApiError", this.url = t.url, this.status = t.status, this.statusText = t.statusText, this.body = t.body, this.request = e
                }
            },
            Se = class extends Error {
                constructor(e) {
                    super(e), this.name = "CancelError"
                }
                get isCancelled() {
                    return !0
                }
            },
            Re = class {
                constructor(e) {
                    this._isResolved = !1, this._isRejected = !1, this._isCancelled = !1, this._cancelHandlers = [], this._promise = new Promise(((t, r) => {
                        this._resolve = t, this._reject = r;
                        const n = e => {
                            this._isResolved || this._isRejected || this._isCancelled || this._cancelHandlers.push(e)
                        };
                        return Object.defineProperty(n, "isResolved", {
                            get: () => this._isResolved
                        }), Object.defineProperty(n, "isRejected", {
                            get: () => this._isRejected
                        }), Object.defineProperty(n, "isCancelled", {
                            get: () => this._isCancelled
                        }), e((e => {
                            var t;
                            this._isResolved || this._isRejected || this._isCancelled || (this._isResolved = !0, null == (t = this._resolve) || t.call(this, e))
                        }), (e => {
                            var t;
                            this._isResolved || this._isRejected || this._isCancelled || (this._isRejected = !0, null == (t = this._reject) || t.call(this, e))
                        }), n)
                    }))
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
                            for (const e of this._cancelHandlers) e()
                        } catch (t) {
                            return void console.warn("Cancellation threw an error", t)
                        }
                        this._cancelHandlers.length = 0, null == (e = this._reject) || e.call(this, new Se("Request aborted"))
                    }
                }
                get isCancelled() {
                    return this._isCancelled
                }
            };
        Symbol.toStringTag;
        var Be = class {
                constructor() {
                    let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : new Map;
                    this.jar = e
                }
                setCookie(e, t) {
                    var r;
                    const n = e.origin.toLowerCase();
                    this.jar.has(n) || this.jar.set(n, []);
                    const i = Be.parse(t);
                    this.jar.set(n, [...(null == (r = this.jar.get(n)) ? void 0 : r.filter((e => e.name !== i.name))) || [], i])
                }
                getCookies(e) {
                    var t;
                    const r = e.origin.toLowerCase();
                    return this.jar.get(r) && (null == (t = this.jar.get(r)) ? void 0 : t.filter((e => !e.expires || e.expires > new Date))) || []
                }
                static parse(e) {
                    if ("string" !== typeof e) throw new Error("argument str must be a string");
                    const t = e.split(";").map((e => e.trim()));
                    let r;
                    if (!(t.length > 0)) throw new Error("Invalid cookie"); {
                        const [e, n] = t[0].split("=");
                        if (!e || !n) throw new Error("Invalid cookie");
                        r = {
                            name: e,
                            value: n
                        }
                    }
                    return t.slice(1).forEach((e => {
                        const [t, n] = e.split("=");
                        if (!t.trim()) throw new Error("Invalid cookie");
                        const i = t.toLowerCase(),
                            s = "'" === (null == n ? void 0 : n.charAt(0)) || '"' === (null == n ? void 0 : n.charAt(0)) ? null == n ? void 0 : n.slice(1, -1) : n;
                        if ("expires" === i && (r.expires = new Date(s)), "path" === i && (r.path = s), "samesite" === i) {
                            if ("Lax" !== s && "None" !== s && "Strict" !== s) throw new Error("Invalid cookie SameSite value");
                            r.sameSite = s
                        }
                        "secure" === i && (r.secure = !0)
                    })), r
                }
            },
            Ie = new Be;
        n.interceptors.response.use((e => (Array.isArray(e.headers["set-cookie"]) && e.headers["set-cookie"].forEach((t => {
            Ie.setCookie(new URL(e.config.url), t)
        })), e))), n.interceptors.request.use((function (e) {
            const t = Ie.getCookies(new URL(e.url));
            return (null == t ? void 0 : t.length) > 0 && e.headers && (e.headers.cookie = t.map((e => "".concat(e.name, "=").concat(e.value))).join("; ")), e
        }));
        var ze = e => void 0 !== e && null !== e,
            Oe = e => "string" === typeof e,
            Le = e => Oe(e) && "" !== e,
            qe = e => "object" === typeof e && "string" === typeof e.type && "function" === typeof e.stream && "function" === typeof e.arrayBuffer && "function" === typeof e.constructor && "string" === typeof e.constructor.name && /^(Blob|File)$/.test(e.constructor.name) && /^(Blob|File)$/.test(e[Symbol.toStringTag]),
            ke = e => {
                const t = [],
                    r = (e, n) => {
                        ze(n) && (Array.isArray(n) ? n.forEach((t => {
                            r(e, t)
                        })) : "object" === typeof n ? Object.entries(n).forEach((t => {
                            let [n, i] = t;
                            r("".concat(e, "[").concat(n, "]"), i)
                        })) : ((e, r) => {
                            t.push("".concat(encodeURIComponent(e), "=").concat(encodeURIComponent(String(r))))
                        })(e, n))
                    };
                return Object.entries(e).forEach((e => {
                    let [t, n] = e;
                    r(t, n)
                })), t.length > 0 ? "?".concat(t.join("&")) : ""
            },
            Ce = async (e, t) => "function" === typeof t ? t(e) : t, Ne = async (e, t, r) => {
                const n = await Ce(t, e.TOKEN),
                    i = await Ce(t, e.USERNAME),
                    s = await Ce(t, e.PASSWORD),
                    o = await Ce(t, e.HEADERS),
                    a = "function" === typeof (null == r ? void 0 : r.getHeaders) && (null == r ? void 0 : r.getHeaders()) || {},
                    c = Object.entries({
                        Accept: "application/json",
                        ...o,
                        ...t.headers,
                        ...a
                    }).filter((e => {
                        let [t, r] = e;
                        return ze(r)
                    })).reduce(((e, t) => {
                        let [r, n] = t;
                        return {
                            ...e,
                            [r]: String(n)
                        }
                    }), {});
                if (Le(n) && (c.Authorization = "Bearer ".concat(n)), Le(i) && Le(s)) {
                    const e = (u = "".concat(i, ":").concat(s), btoa(u));
                    c.Authorization = "Basic ".concat(e)
                }
                var u;
                return t.body && (t.mediaType ? c["Content-Type"] = t.mediaType : qe(t.body) ? c["Content-Type"] = t.body.type || "application/octet-stream" : Oe(t.body) ? c["Content-Type"] = "text/plain" : t.body instanceof se || (c["Content-Type"] = "application/json")), c
            }, Me = (e, t) => new Re((async (r, i, s) => {
                try {
                    const i = ((e, t) => {
                            const r = e.ENCODE_PATH || encodeURI,
                                n = t.url.replace("{api-version}", e.VERSION).replace(/{(.*?)}/g, ((e, n) => {
                                    var i;
                                    return (null == (i = t.path) ? void 0 : i.hasOwnProperty(n)) ? r(String(t.path[n])) : e
                                })),
                                i = "".concat(e.BASE).concat(n);
                            return t.query ? "".concat(i).concat(ke(t.query)) : i
                        })(e, t),
                        a = (e => {
                            if (e.formData) {
                                const t = new se,
                                    r = (e, r) => {
                                        Oe(r) || qe(r) ? t.append(e, r) : t.append(e, JSON.stringify(r))
                                    };
                                return Object.entries(e.formData).filter((e => {
                                    let [t, r] = e;
                                    return ze(r)
                                })).forEach((e => {
                                    let [t, n] = e;
                                    Array.isArray(n) ? n.forEach((e => r(t, e))) : r(t, n)
                                })), t
                            }
                        })(t),
                        c = (e => {
                            if (e.body) return e.body
                        })(t),
                        u = await Ne(e, t, a);
                    if (!s.isCancelled) {
                        const l = await (async (e, t, r, i, s, o, a) => {
                                const c = n.CancelToken.source(),
                                    u = {
                                        url: r,
                                        headers: o,
                                        data: null != i ? i : s,
                                        method: t.method,
                                        withCredentials: e.WITH_CREDENTIALS,
                                        cancelToken: c.token
                                    };
                                Object.keys(e.HEADERS || {}).filter((e => "accept" === e.toLowerCase())).map((t => e.HEADERS[t])).includes("application/x-bcs") && (u.responseType = "arraybuffer"), a((() => c.cancel("The user aborted a request.")));
                                try {
                                    return await n.request(u)
                                } catch (l) {
                                    const e = l;
                                    if (e.response) return e.response;
                                    throw l
                                }
                            })(e, t, i, c, a, u, s),
                            h = (e => {
                                if (204 !== e.status) return e.data
                            })(l),
                            d = ((e, t) => {
                                if (t) {
                                    const r = e.headers[t];
                                    if (Oe(r)) return r
                                }
                            })(l, t.responseHeader),
                            f = {
                                url: i,
                                ok: (o = l.status, o >= 200 && o < 300),
                                status: l.status,
                                statusText: l.statusText,
                                body: null != d ? d : h
                            };
                        ((e, t) => {
                            const r = {
                                400: "Bad Request",
                                401: "Unauthorized",
                                403: "Forbidden",
                                404: "Not Found",
                                500: "Internal Server Error",
                                502: "Bad Gateway",
                                503: "Service Unavailable",
                                ...e.errors
                            } [t.status];
                            if (r) throw new Ue(e, t, r);
                            if (!t.ok) throw new Ue(e, t, "Generic Error")
                        })(t, f), r(f.body)
                    }
                } catch (a) {
                    i(a)
                }
                var o
            })), He = class extends Te {
                constructor(e) {
                    super(e)
                }
                request(e) {
                    return Me(this.config, e)
                }
            }, Pe = class {
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
                getAccountResource(e, t, r) {
                    return this.httpRequest.request({
                        method: "GET",
                        url: "/accounts/{address}/resource/{resource_type}",
                        path: {
                            address: e,
                            resource_type: t
                        },
                        query: {
                            ledger_version: r
                        }
                    })
                }
                getAccountModule(e, t, r) {
                    return this.httpRequest.request({
                        method: "GET",
                        url: "/accounts/{address}/module/{module_name}",
                        path: {
                            address: e,
                            module_name: t
                        },
                        query: {
                            ledger_version: r
                        }
                    })
                }
            }, De = class {
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
            }, je = class {
                constructor(e) {
                    this.httpRequest = e
                }
                getEventsByCreationNumber(e, t, r, n) {
                    return this.httpRequest.request({
                        method: "GET",
                        url: "/accounts/{address}/events/{creation_number}",
                        path: {
                            address: e,
                            creation_number: t
                        },
                        query: {
                            start: r,
                            limit: n
                        }
                    })
                }
                getEventsByEventHandle(e, t, r, n, i) {
                    return this.httpRequest.request({
                        method: "GET",
                        url: "/accounts/{address}/events/{event_handle}/{field_name}",
                        path: {
                            address: e,
                            event_handle: t,
                            field_name: r
                        },
                        query: {
                            start: n,
                            limit: i
                        }
                    })
                }
            }, Fe = class {
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
            }, We = class {
                constructor(e) {
                    this.httpRequest = e
                }
                getTableItem(e, t, r) {
                    return this.httpRequest.request({
                        method: "POST",
                        url: "/tables/{table_handle}/item",
                        path: {
                            table_handle: e
                        },
                        query: {
                            ledger_version: r
                        },
                        body: t,
                        mediaType: "application/json"
                    })
                }
            }, Ge = class {
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
                getAccountTransactions(e, t, r) {
                    return this.httpRequest.request({
                        method: "GET",
                        url: "/accounts/{address}/transactions",
                        path: {
                            address: e
                        },
                        query: {
                            start: t,
                            limit: r
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
                simulateTransaction(e, t, r) {
                    return this.httpRequest.request({
                        method: "POST",
                        url: "/transactions/simulate",
                        query: {
                            estimate_max_gas_amount: t,
                            estimate_gas_unit_price: r
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
            }, Ve = class {
                constructor(e) {
                    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : He;
                    var r, n, i, s;
                    this.request = new t({
                        BASE: null != (r = null == e ? void 0 : e.BASE) ? r : "/v1",
                        VERSION: null != (n = null == e ? void 0 : e.VERSION) ? n : "1.2.0",
                        WITH_CREDENTIALS: null != (i = null == e ? void 0 : e.WITH_CREDENTIALS) && i,
                        CREDENTIALS: null != (s = null == e ? void 0 : e.CREDENTIALS) ? s : "include",
                        TOKEN: null == e ? void 0 : e.TOKEN,
                        USERNAME: null == e ? void 0 : e.USERNAME,
                        PASSWORD: null == e ? void 0 : e.PASSWORD,
                        HEADERS: null == e ? void 0 : e.HEADERS,
                        ENCODE_PATH: null == e ? void 0 : e.ENCODE_PATH
                    }), this.accounts = new Pe(this.request), this.blocks = new De(this.request), this.events = new je(this.request), this.general = new Fe(this.request), this.tables = new We(this.request), this.transactions = new Ge(this.request)
                }
            }, $e = {
                BASE: "/v1",
                VERSION: "1.2.0",
                WITH_CREDENTIALS: !1,
                CREDENTIALS: "include",
                TOKEN: void 0,
                USERNAME: void 0,
                PASSWORD: void 0,
                HEADERS: void 0,
                ENCODE_PATH: void 0
            }, Ke = (e => (e.ACCOUNT_NOT_FOUND = "account_not_found", e.RESOURCE_NOT_FOUND = "resource_not_found", e.MODULE_NOT_FOUND = "module_not_found", e.STRUCT_FIELD_NOT_FOUND = "struct_field_not_found", e.VERSION_NOT_FOUND = "version_not_found", e.TRANSACTION_NOT_FOUND = "transaction_not_found", e.TABLE_ITEM_NOT_FOUND = "table_item_not_found", e.BLOCK_NOT_FOUND = "block_not_found", e.VERSION_PRUNED = "version_pruned", e.BLOCK_PRUNED = "block_pruned", e.INVALID_INPUT = "invalid_input", e.INVALID_TRANSACTION_UPDATE = "invalid_transaction_update", e.SEQUENCE_NUMBER_TOO_OLD = "sequence_number_too_old", e.VM_ERROR = "vm_error", e.HEALTH_CHECK_FAILED = "health_check_failed", e.MEMPOOL_IS_FULL = "mempool_is_full", e.INTERNAL_ERROR = "internal_error", e.WEB_FRAMEWORK_ERROR = "web_framework_error", e.BCS_NOT_SUPPORTED = "bcs_not_supported", e.API_DISABLED = "api_disabled", e))(Ke || {}), Je = (e => (e.PRIVATE = "private", e.PUBLIC = "public", e.FRIEND = "friend", e))(Je || {}), Ye = (e => (e.VALIDATOR = "validator", e.FULL_NODE = "full_node", e))(Ye || {}), Xe = {
                description: "Account data\n\n    A simplified version of the onchain Account resource",
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
            }, Ze = {
                type: "one-of",
                description: "Account signature scheme\n\n    The account signature scheme allows you to have two types of accounts:\n\n    1. A single Ed25519 key account, one private key\n    2. A k-of-n multi-Ed25519 key account, multiple private keys, such that k-of-n must sign a transaction.",
                contains: [{
                    type: "AccountSignature_Ed25519Signature"
                }, {
                    type: "AccountSignature_MultiEd25519Signature"
                }]
            }, Qe = {
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
            }, et = {
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
            }, tt = {
                type: "string",
                description: "A hex encoded 32 byte Aptos account address.\n\n    This is represented in a string as a 64 character hex string, sometimes\n    shortened by stripping leading 0s, and adding a 0x.\n\n    For example, address 0x0000000000000000000000000000000000000000000000000000000000000001 is represented as 0x1.\n    ",
                format: "hex"
            }, rt = {
                description: "This is the generic struct we use for all API errors, it contains a string\n    message and an Aptos API specific error code.",
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
            }, nt = {
                type: "Enum"
            }, it = {
                description: "A Block with or without transactions\n\n    This contains the information about a transactions along with\n    associated transactions if requested",
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
            }, st = {
                description: "A block metadata transaction\n\n    This signifies the beginning of a block, and contains information\n    about the specific block",
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
            }, ot = {
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
            }, at = {
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
            }, ct = {
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
            }, ut = {
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
            }, lt = {
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
            }, ht = {
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
            }, dt = {
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
            }, ft = {
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
            }, pt = {
                type: "string",
                description: "Entry function id is string representation of a entry function defined on-chain.\n\n    Format: `{address}::{module name}::{function name}`\n\n    Both `module name` and `function name` are case-sensitive.\n    "
            }, yt = {
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
            }, gt = {
                description: "An event from a transaction",
                properties: {
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
            }, wt = {
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
            }, bt = {
                description: "Struct holding the outputs of the estimate gas API",
                properties: {
                    gas_estimate: {
                        type: "number",
                        description: "The current estimate for the gas unit price",
                        isRequired: !0,
                        format: "uint64"
                    }
                }
            }, mt = {
                type: "one-of",
                description: "The writeset payload of the Genesis transaction",
                contains: [{
                    type: "GenesisPayload_WriteSetPayload"
                }]
            }, vt = {
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
            }, Et = {
                description: "The genesis transaction\n\n    This only occurs at the genesis transaction (version 0)",
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
            }, At = {
                type: "string"
            }, _t = {
                description: "Representation of a successful healthcheck",
                properties: {
                    message: {
                        type: "string",
                        isRequired: !0
                    }
                }
            }, xt = {
                type: "string",
                description: "All bytes (Vec<u8>) data is represented as hex-encoded string prefixed with `0x` and fulfilled with\n    two hex digits per byte.\n\n    Unlike the `Address` type, HexEncodedBytes will not trim any zeros.\n    ",
                format: "hex"
            }, Tt = {
                type: "string"
            }, Ut = {
                description: 'The struct holding all data returned to the client by the\n    index endpoint (i.e., GET "/").  Only for responding in JSON',
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
                    },
                    git_hash: {
                        type: "string"
                    }
                }
            }, St = {
                properties: {
                    modules: {
                        type: "array",
                        contains: {
                            type: "MoveModuleBytecode"
                        },
                        isRequired: !0
                    }
                }
            }, Rt = {
                type: "string"
            }, Bt = {
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
            }, It = {
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
            }, zt = {
                type: "Enum"
            }, Ot = {
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
            }, Lt = {
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
            }, qt = {
                type: "string",
                description: "Move module id is a string representation of Move module.\n\n    Format: `{address}::{module name}`\n\n    `address` should be hex-encoded 32 byte account address that is prefixed with `0x`.\n\n    Module name is case-sensitive.\n    "
            }, kt = {
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
            }, Ct = {
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
            }, Nt = {
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
            }, Mt = {
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
            }, Ht = {
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
            }, Pt = {
                type: "string",
                description: "String representation of a MoveStructTag (on-chain Move struct type). This exists so you\n    can specify MoveStructTags as path / query parameters, e.g. for get_events_by_event_handle.\n\n    It is a combination of:\n    1. `move_module_address`, `module_name` and `struct_name`, all joined by `::`\n    2. `struct generic type parameters` joined by `, `\n\n    Examples:\n     * `0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>`\n     * `0x1::account::Account`\n\n    Note:\n    1. Empty chars should be ignored when comparing 2 struct tag ids.\n    2. When used in an URL path, should be encoded by url-encoding (AKA percent-encoding).\n\n    See [doc](https://aptos.dev/concepts/basics-accounts) for more details.\n    ",
                pattern: "^0x[0-9a-zA-Z:_<>]+$"
            }, Dt = {
                description: 'This is a JSON representation of some data within an account resource. More specifically,\n    it is a map of strings to arbitrary JSON values / objects, where the keys are top level\n    fields within the given resource.\n\n    To clarify, you might query for 0x1::account::Account and see the example data.\n\n    Move `bool` type value is serialized into `boolean`.\n\n    Move `u8` type value is serialized into `integer`.\n\n    Move `u64` and `u128` type value is serialized into `string`.\n\n    Move `address` type value (32 byte Aptos account address) is serialized into a HexEncodedBytes string.\n    For example:\n    - `0x1`\n    - `0x1668f6be25668c1a17cd8caf6b8d2f25`\n\n    Move `vector` type value is serialized into `array`, except `vector<u8>` which is serialized into a\n    HexEncodedBytes string with `0x` prefix.\n    For example:\n    - `vector<u64>{255, 255}` => `["255", "255"]`\n    - `vector<u8>{255, 255}` => `0xffff`\n\n    Move `struct` type value is serialized into `object` that looks like this (except some Move stdlib types, see the following section):\n    ```json\n    {\n        field1_name: field1_value,\n        field2_name: field2_value,\n        ......\n    }\n    ```\n\n    For example:\n    `{ "created": "0xa550c18", "role_id": "0" }`\n\n     **Special serialization for Move stdlib types**:\n    - [0x1::string::String](https://github.com/aptos-labs/aptos-core/blob/main/language/move-stdlib/docs/ascii.md)\n    is serialized into `string`. For example, struct value `0x1::string::String{bytes: b"Hello World!"}`\n    is serialized as `"Hello World!"` in JSON.\n    ',
                properties: {}
            }, jt = {
                type: "string",
                description: "String representation of an on-chain Move type tag that is exposed in transaction payload.\n    Values:\n    - bool\n    - u8\n    - u64\n    - u128\n    - address\n    - signer\n    - vector: `vector<{non-reference MoveTypeId}>`\n    - struct: `{address}::{module_name}::{struct_name}::<{generic types}>`\n\n    Vector type value examples:\n    - `vector<u8>`\n    - `vector<vector<u64>>`\n    - `vector<0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>>`\n\n    Struct type value examples:\n    - `0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>\n    - `0x1::account::Account`\n\n    Note:\n    1. Empty chars should be ignored when comparing 2 struct tag ids.\n    2. When used in an URL path, should be encoded by url-encoding (AKA percent-encoding).\n    ",
                pattern: "^(bool|u8|u64|u128|address|signer|vector<.+>|0x[0-9a-zA-Z:_<, >]+)$"
            }, Ft = {
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
            }, Wt = {
                description: "Multi agent signature for multi agent transactions\n\n    This allows you to have transactions across multiple accounts",
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
            }, Gt = {
                description: "A Ed25519 multi-sig signature\n\n    This allows k-of-n signing for a transaction",
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
            }, Vt = {
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
            }, $t = {
                type: "Enum"
            }, Kt = {
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
            }, Jt = {
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
            }, Yt = {
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
            }, Xt = {
                description: "A request to submit a transaction\n\n    This requires a transaction and a signature of it",
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
            }, Zt = {
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
            }, Qt = {
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
            }, er = {
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
            }, tr = {
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
            }, rr = {
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
            }, nr = {
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
            }, ir = {
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
            }, sr = {
                type: "one-of",
                description: "An enum of the possible transaction payloads",
                contains: [{
                    type: "TransactionPayload_EntryFunctionPayload"
                }, {
                    type: "TransactionPayload_ScriptPayload"
                }, {
                    type: "TransactionPayload_ModuleBundlePayload"
                }]
            }, or = {
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
            }, ar = {
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
            }, cr = {
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
            }, ur = {
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
            }, lr = {
                description: "Batch transaction submission result\n\n    Tells which transactions failed",
                properties: {
                    transaction_failures: {
                        type: "array",
                        contains: {
                            type: "TransactionsBatchSingleSubmissionFailure"
                        },
                        isRequired: !0
                    }
                }
            }, hr = {
                type: "one-of",
                description: "An enum representing the different transaction signatures available",
                contains: [{
                    type: "TransactionSignature_Ed25519Signature"
                }, {
                    type: "TransactionSignature_MultiEd25519Signature"
                }, {
                    type: "TransactionSignature_MultiAgentSignature"
                }]
            }, dr = {
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
            }, fr = {
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
            }, pr = {
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
            }, yr = {
                type: "string",
                description: "A string containing a 128-bit unsigned integer.\n\n    We represent u128 values as a string to ensure compatibility with languages such\n    as JavaScript that do not parse u64s in JSON natively.\n    ",
                format: "uint64"
            }, gr = {
                type: "string",
                description: "A string containing a 64-bit unsigned integer.\n\n    We represent u64 values as a string to ensure compatibility with languages such\n    as JavaScript that do not parse u64s in JSON natively.\n    ",
                format: "uint64"
            }, wr = {
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
            }, br = {
                description: "An event from a transaction with a version",
                properties: {
                    version: {
                        type: "U64",
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
            }, mr = {
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
            }, vr = {
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
            }, Er = {
                type: "one-of",
                description: "The associated writeset with a payload",
                contains: [{
                    type: "WriteSet_ScriptWriteSet"
                }, {
                    type: "WriteSet_DirectWriteSet"
                }]
            }, Ar = {
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
            }, _r = {
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
            }, xr = {
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
            }, Tr = {
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
            }, Ur = {
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
            }, Sr = {
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
            }, Rr = {
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
            }, Br = {
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
            }, Ir = {
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
            }, zr = {
                description: "A writeset payload, used only for genesis",
                properties: {
                    write_set: {
                        type: "WriteSet",
                        isRequired: !0
                    }
                }
            }, Or = {
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
            }, Lr = {};
        ce(Lr, {
            AccountAddress: () => kr,
            AccountAuthenticator: () => fn,
            AccountAuthenticatorEd25519: () => pn,
            AccountAuthenticatorMultiEd25519: () => yn,
            AuthenticationKey: () => Xn,
            ChainId: () => Pn,
            ChangeSet: () => On,
            Ed25519PublicKey: () => rn,
            Ed25519Signature: () => sn,
            EntryFunction: () => Bn,
            Identifier: () => gn,
            Module: () => In,
            ModuleId: () => zn,
            MultiAgentRawTransaction: () => Cn,
            MultiEd25519PublicKey: () => on,
            MultiEd25519Signature: () => cn,
            RawTransaction: () => Sn,
            RawTransactionWithData: () => kn,
            RotationProofChallenge: () => Zn,
            Script: () => Rn,
            SignedTransaction: () => qn,
            StructTag: () => Un,
            Transaction: () => Kn,
            TransactionArgument: () => Dn,
            TransactionArgumentAddress: () => Gn,
            TransactionArgumentBool: () => $n,
            TransactionArgumentU128: () => Wn,
            TransactionArgumentU64: () => Fn,
            TransactionArgumentU8: () => jn,
            TransactionArgumentU8Vector: () => Vn,
            TransactionAuthenticator: () => un,
            TransactionAuthenticatorEd25519: () => ln,
            TransactionAuthenticatorMultiAgent: () => dn,
            TransactionAuthenticatorMultiEd25519: () => hn,
            TransactionPayload: () => Nn,
            TransactionPayloadEntryFunction: () => Hn,
            TransactionPayloadScript: () => Mn,
            TypeTag: () => wn,
            TypeTagAddress: () => An,
            TypeTagBool: () => bn,
            TypeTagSigner: () => _n,
            TypeTagStruct: () => Tn,
            TypeTagU128: () => En,
            TypeTagU64: () => vn,
            TypeTagU8: () => mn,
            TypeTagVector: () => xn,
            UserTransaction: () => Jn,
            WriteSet: () => Ln
        });
        var qr = class {
                constructor(e) {
                    if (e.length !== qr.LENGTH) throw new Error("Expected address of length 32");
                    this.address = e
                }
                static fromHex(e) {
                    let t = ge.ensure(e);
                    t.noPrefix().length % 2 !== 0 && (t = new ge("0".concat(t.noPrefix())));
                    const r = t.toUint8Array();
                    if (r.length > qr.LENGTH) throw new Error("Hex string is too long. Address's length is 32 bytes.");
                    if (r.length === qr.LENGTH) return new qr(r);
                    const n = new Uint8Array(qr.LENGTH);
                    return n.set(r, qr.LENGTH - r.length), new qr(n)
                }
                serialize(e) {
                    e.serializeFixedBytes(this.address)
                }
                static deserialize(e) {
                    return new qr(e.deserializeFixedBytes(qr.LENGTH))
                }
            },
            kr = qr;
        kr.LENGTH = 32, kr.CORE_CODE_ADDRESS = qr.fromHex("0x1");
        ce({}, {
            Deserializer: () => Dr,
            Serializer: () => Hr,
            bcsSerializeBool: () => Xr,
            bcsSerializeBytes: () => Qr,
            bcsSerializeFixedBytes: () => en,
            bcsSerializeStr: () => Zr,
            bcsSerializeU128: () => Yr,
            bcsSerializeU16: () => Kr,
            bcsSerializeU32: () => Jr,
            bcsSerializeU8: () => $r,
            bcsSerializeUint64: () => Vr,
            bcsToBytes: () => Gr,
            deserializeVector: () => Wr,
            serializeVector: () => jr,
            serializeVectorWithFunc: () => Fr
        });
        var Cr = 2 ** 32 - 1,
            Nr = BigInt(2 ** 64) - BigInt(1),
            Mr = BigInt(2 ** 128) - BigInt(1),
            Hr = class {
                constructor() {
                    this.buffer = new ArrayBuffer(64), this.offset = 0
                }
                ensureBufferWillHandleSize(e) {
                    for (; this.buffer.byteLength < this.offset + e;) {
                        const e = new ArrayBuffer(2 * this.buffer.byteLength);
                        new Uint8Array(e).set(new Uint8Array(this.buffer)), this.buffer = e
                    }
                }
                serialize(e) {
                    this.ensureBufferWillHandleSize(e.length), new Uint8Array(this.buffer, this.offset).set(e), this.offset += e.length
                }
                serializeWithFunction(e, t, r) {
                    this.ensureBufferWillHandleSize(t);
                    const n = new DataView(this.buffer, this.offset);
                    e.apply(n, [0, r, !0]), this.offset += t
                }
                serializeStr(e) {
                    const t = new TextEncoder;
                    this.serializeBytes(t.encode(e))
                }
                serializeBytes(e) {
                    this.serializeU32AsUleb128(e.length), this.serialize(e)
                }
                serializeFixedBytes(e) {
                    this.serialize(e)
                }
                serializeBool(e) {
                    if ("boolean" !== typeof e) throw new Error("Value needs to be a boolean");
                    const t = e ? 1 : 0;
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
                    const t = BigInt(e.toString()) & BigInt(Cr),
                        r = BigInt(e.toString()) >> BigInt(32);
                    this.serializeU32(Number(t)), this.serializeU32(Number(r))
                }
                serializeU128(e) {
                    const t = BigInt(e.toString()) & Nr,
                        r = BigInt(e.toString()) >> BigInt(64);
                    this.serializeU64(t), this.serializeU64(r)
                }
                serializeU32AsUleb128(e) {
                    let t = e;
                    const r = [];
                    for (; t >>> 7 !== 0;) r.push(127 & t | 128), t >>>= 7;
                    r.push(t), this.serialize(new Uint8Array(r))
                }
                getBytes() {
                    return new Uint8Array(this.buffer).slice(0, this.offset)
                }
            };

        function Pr(e, t, r) {
            return (n, i, s) => {
                const o = s.value;
                return s.value = function (n) {
                    const i = BigInt(n.toString());
                    if (i > BigInt(t.toString()) || i < BigInt(e.toString())) throw new Error(r || "Value is out of range");
                    o.apply(this, [n])
                }, s
            }
        }
        ue([Pr(0, 255)], Hr.prototype, "serializeU8", 1), ue([Pr(0, 65535)], Hr.prototype, "serializeU16", 1), ue([Pr(0, Cr)], Hr.prototype, "serializeU32", 1), ue([Pr(BigInt(0), Nr)], Hr.prototype, "serializeU64", 1), ue([Pr(BigInt(0), Mr)], Hr.prototype, "serializeU128", 1), ue([Pr(0, Cr)], Hr.prototype, "serializeU32AsUleb128", 1);
        var Dr = class {
            constructor(e) {
                this.buffer = new ArrayBuffer(e.length), new Uint8Array(this.buffer).set(e, 0), this.offset = 0
            }
            read(e) {
                if (this.offset + e > this.buffer.byteLength) throw new Error("Reached to the end of buffer");
                const t = this.buffer.slice(this.offset, this.offset + e);
                return this.offset += e, t
            }
            deserializeStr() {
                const e = this.deserializeBytes();
                return (new TextDecoder).decode(e)
            }
            deserializeBytes() {
                const e = this.deserializeUleb128AsU32();
                return new Uint8Array(this.read(e))
            }
            deserializeFixedBytes(e) {
                return new Uint8Array(this.read(e))
            }
            deserializeBool() {
                const e = new Uint8Array(this.read(1))[0];
                if (1 !== e && 0 !== e) throw new Error("Invalid boolean value");
                return 1 === e
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
                const e = this.deserializeU32(),
                    t = this.deserializeU32();
                return BigInt(BigInt(t) << BigInt(32) | BigInt(e))
            }
            deserializeU128() {
                const e = this.deserializeU64(),
                    t = this.deserializeU64();
                return BigInt(t << BigInt(64) | e)
            }
            deserializeUleb128AsU32() {
                let e = BigInt(0),
                    t = 0;
                for (; e < Cr;) {
                    const r = this.deserializeU8();
                    if (e |= BigInt(127 & r) << BigInt(t), 0 === (128 & r)) break;
                    t += 7
                }
                if (e > Cr) throw new Error("Overflow while parsing uleb128-encoded uint32 value");
                return Number(e)
            }
        };

        function jr(e, t) {
            t.serializeU32AsUleb128(e.length), e.forEach((e => {
                e.serialize(t)
            }))
        }

        function Fr(e, t) {
            const r = new Hr;
            r.serializeU32AsUleb128(e.length);
            const n = r[t];
            return e.forEach((e => {
                n.call(r, e)
            })), r.getBytes()
        }

        function Wr(e, t) {
            const r = e.deserializeUleb128AsU32(),
                n = [];
            for (let i = 0; i < r; i += 1) n.push(t.deserialize(e));
            return n
        }

        function Gr(e) {
            const t = new Hr;
            return e.serialize(t), t.getBytes()
        }

        function Vr(e) {
            const t = new Hr;
            return t.serializeU64(e), t.getBytes()
        }

        function $r(e) {
            const t = new Hr;
            return t.serializeU8(e), t.getBytes()
        }

        function Kr(e) {
            const t = new Hr;
            return t.serializeU16(e), t.getBytes()
        }

        function Jr(e) {
            const t = new Hr;
            return t.serializeU32(e), t.getBytes()
        }

        function Yr(e) {
            const t = new Hr;
            return t.serializeU128(e), t.getBytes()
        }

        function Xr(e) {
            const t = new Hr;
            return t.serializeBool(e), t.getBytes()
        }

        function Zr(e) {
            const t = new Hr;
            return t.serializeStr(e), t.getBytes()
        }

        function Qr(e) {
            const t = new Hr;
            return t.serializeBytes(e), t.getBytes()
        }

        function en(e) {
            const t = new Hr;
            return t.serializeFixedBytes(e), t.getBytes()
        }
        var tn = class {
                constructor(e) {
                    if (e.length !== tn.LENGTH) throw new Error("Ed25519PublicKey length should be ".concat(tn.LENGTH));
                    this.value = e
                }
                serialize(e) {
                    e.serializeBytes(this.value)
                }
                static deserialize(e) {
                    const t = e.deserializeBytes();
                    return new tn(t)
                }
            },
            rn = tn;
        rn.LENGTH = 32;
        var nn = class {
                constructor(e) {
                    if (this.value = e, e.length !== nn.LENGTH) throw new Error("Ed25519Signature length should be ".concat(nn.LENGTH))
                }
                serialize(e) {
                    e.serializeBytes(this.value)
                }
                static deserialize(e) {
                    const t = e.deserializeBytes();
                    return new nn(t)
                }
            },
            sn = nn;
        sn.LENGTH = 64;
        var on = class {
                constructor(e, t) {
                    if (this.public_keys = e, this.threshold = t, t > 32) throw new Error('"threshold" cannot be larger than '.concat(32))
                }
                toBytes() {
                    const e = new Uint8Array(this.public_keys.length * rn.LENGTH + 1);
                    return this.public_keys.forEach(((t, r) => {
                        e.set(t.value, r * rn.LENGTH)
                    })), e[this.public_keys.length * rn.LENGTH] = this.threshold, e
                }
                serialize(e) {
                    e.serializeBytes(this.toBytes())
                }
                static deserialize(e) {
                    const t = e.deserializeBytes(),
                        r = t[t.length - 1],
                        n = [];
                    for (let i = 0; i < t.length - 1; i += rn.LENGTH) {
                        const e = i;
                        n.push(new rn(t.subarray(e, e + rn.LENGTH)))
                    }
                    return new on(n, r)
                }
            },
            an = class {
                constructor(e, t) {
                    if (this.signatures = e, this.bitmap = t, t.length !== an.BITMAP_LEN) throw new Error('"bitmap" length should be '.concat(an.BITMAP_LEN))
                }
                toBytes() {
                    const e = new Uint8Array(this.signatures.length * sn.LENGTH + an.BITMAP_LEN);
                    return this.signatures.forEach(((t, r) => {
                        e.set(t.value, r * sn.LENGTH)
                    })), e.set(this.bitmap, this.signatures.length * sn.LENGTH), e
                }
                static createBitmap(e) {
                    const t = new Uint8Array([0, 0, 0, 0]),
                        r = new Set;
                    return e.forEach((e => {
                        if (e >= 32) throw new Error("Invalid bit value ".concat(e, "."));
                        if (r.has(e)) throw new Error("Duplicated bits detected.");
                        r.add(e);
                        const n = Math.floor(e / 8);
                        let i = t[n];
                        i |= 128 >> e % 8, t[n] = i
                    })), t
                }
                serialize(e) {
                    e.serializeBytes(this.toBytes())
                }
                static deserialize(e) {
                    const t = e.deserializeBytes(),
                        r = t.subarray(t.length - 4),
                        n = [];
                    for (let i = 0; i < t.length - r.length; i += sn.LENGTH) {
                        const e = i;
                        n.push(new sn(t.subarray(e, e + sn.LENGTH)))
                    }
                    return new an(n, r)
                }
            },
            cn = an;
        cn.BITMAP_LEN = 4;
        var un = class {
                static deserialize(e) {
                    const t = e.deserializeUleb128AsU32();
                    switch (t) {
                        case 0:
                            return ln.load(e);
                        case 1:
                            return hn.load(e);
                        case 2:
                            return dn.load(e);
                        default:
                            throw new Error("Unknown variant index for TransactionAuthenticator: ".concat(t))
                    }
                }
            },
            ln = class extends un {
                constructor(e, t) {
                    super(), this.public_key = e, this.signature = t
                }
                serialize(e) {
                    e.serializeU32AsUleb128(0), this.public_key.serialize(e), this.signature.serialize(e)
                }
                static load(e) {
                    const t = rn.deserialize(e),
                        r = sn.deserialize(e);
                    return new ln(t, r)
                }
            },
            hn = class extends un {
                constructor(e, t) {
                    super(), this.public_key = e, this.signature = t
                }
                serialize(e) {
                    e.serializeU32AsUleb128(1), this.public_key.serialize(e), this.signature.serialize(e)
                }
                static load(e) {
                    const t = on.deserialize(e),
                        r = cn.deserialize(e);
                    return new hn(t, r)
                }
            },
            dn = class extends un {
                constructor(e, t, r) {
                    super(), this.sender = e, this.secondary_signer_addresses = t, this.secondary_signers = r
                }
                serialize(e) {
                    e.serializeU32AsUleb128(2), this.sender.serialize(e), jr(this.secondary_signer_addresses, e), jr(this.secondary_signers, e)
                }
                static load(e) {
                    const t = fn.deserialize(e),
                        r = Wr(e, kr),
                        n = Wr(e, fn);
                    return new dn(t, r, n)
                }
            },
            fn = class {
                static deserialize(e) {
                    const t = e.deserializeUleb128AsU32();
                    switch (t) {
                        case 0:
                            return pn.load(e);
                        case 1:
                            return yn.load(e);
                        default:
                            throw new Error("Unknown variant index for AccountAuthenticator: ".concat(t))
                    }
                }
            },
            pn = class extends fn {
                constructor(e, t) {
                    super(), this.public_key = e, this.signature = t
                }
                serialize(e) {
                    e.serializeU32AsUleb128(0), this.public_key.serialize(e), this.signature.serialize(e)
                }
                static load(e) {
                    const t = rn.deserialize(e),
                        r = sn.deserialize(e);
                    return new pn(t, r)
                }
            },
            yn = class extends fn {
                constructor(e, t) {
                    super(), this.public_key = e, this.signature = t
                }
                serialize(e) {
                    e.serializeU32AsUleb128(1), this.public_key.serialize(e), this.signature.serialize(e)
                }
                static load(e) {
                    const t = on.deserialize(e),
                        r = cn.deserialize(e);
                    return new yn(t, r)
                }
            },
            gn = class {
                constructor(e) {
                    this.value = e
                }
                serialize(e) {
                    e.serializeStr(this.value)
                }
                static deserialize(e) {
                    const t = e.deserializeStr();
                    return new gn(t)
                }
            },
            wn = class {
                static deserialize(e) {
                    const t = e.deserializeUleb128AsU32();
                    switch (t) {
                        case 0:
                            return bn.load(e);
                        case 1:
                            return mn.load(e);
                        case 2:
                            return vn.load(e);
                        case 3:
                            return En.load(e);
                        case 4:
                            return An.load(e);
                        case 5:
                            return _n.load(e);
                        case 6:
                            return xn.load(e);
                        case 7:
                            return Tn.load(e);
                        default:
                            throw new Error("Unknown variant index for TypeTag: ".concat(t))
                    }
                }
            },
            bn = class extends wn {
                serialize(e) {
                    e.serializeU32AsUleb128(0)
                }
                static load(e) {
                    return new bn
                }
            },
            mn = class extends wn {
                serialize(e) {
                    e.serializeU32AsUleb128(1)
                }
                static load(e) {
                    return new mn
                }
            },
            vn = class extends wn {
                serialize(e) {
                    e.serializeU32AsUleb128(2)
                }
                static load(e) {
                    return new vn
                }
            },
            En = class extends wn {
                serialize(e) {
                    e.serializeU32AsUleb128(3)
                }
                static load(e) {
                    return new En
                }
            },
            An = class extends wn {
                serialize(e) {
                    e.serializeU32AsUleb128(4)
                }
                static load(e) {
                    return new An
                }
            },
            _n = class extends wn {
                serialize(e) {
                    e.serializeU32AsUleb128(5)
                }
                static load(e) {
                    return new _n
                }
            },
            xn = class extends wn {
                constructor(e) {
                    super(), this.value = e
                }
                serialize(e) {
                    e.serializeU32AsUleb128(6), this.value.serialize(e)
                }
                static load(e) {
                    const t = wn.deserialize(e);
                    return new xn(t)
                }
            },
            Tn = class extends wn {
                constructor(e) {
                    super(), this.value = e
                }
                serialize(e) {
                    e.serializeU32AsUleb128(7), this.value.serialize(e)
                }
                static load(e) {
                    const t = Un.deserialize(e);
                    return new Tn(t)
                }
            },
            Un = class {
                constructor(e, t, r, n) {
                    this.address = e, this.module_name = t, this.name = r, this.type_args = n
                }
                static fromString(e) {
                    if (e.includes("<")) throw new Error("Not implemented");
                    const t = e.split("::");
                    if (3 !== t.length) throw new Error("Invalid struct tag string literal.");
                    return new Un(kr.fromHex(t[0]), new gn(t[1]), new gn(t[2]), [])
                }
                serialize(e) {
                    this.address.serialize(e), this.module_name.serialize(e), this.name.serialize(e), jr(this.type_args, e)
                }
                static deserialize(e) {
                    const t = kr.deserialize(e),
                        r = gn.deserialize(e),
                        n = gn.deserialize(e),
                        i = Wr(e, wn);
                    return new Un(t, r, n, i)
                }
            },
            Sn = class {
                constructor(e, t, r, n, i, s, o) {
                    this.sender = e, this.sequence_number = t, this.payload = r, this.max_gas_amount = n, this.gas_unit_price = i, this.expiration_timestamp_secs = s, this.chain_id = o
                }
                serialize(e) {
                    this.sender.serialize(e), e.serializeU64(this.sequence_number), this.payload.serialize(e), e.serializeU64(this.max_gas_amount), e.serializeU64(this.gas_unit_price), e.serializeU64(this.expiration_timestamp_secs), this.chain_id.serialize(e)
                }
                static deserialize(e) {
                    const t = kr.deserialize(e),
                        r = e.deserializeU64(),
                        n = Nn.deserialize(e),
                        i = e.deserializeU64(),
                        s = e.deserializeU64(),
                        o = e.deserializeU64(),
                        a = Pn.deserialize(e);
                    return new Sn(t, r, n, i, s, o, a)
                }
            },
            Rn = class {
                constructor(e, t, r) {
                    this.code = e, this.ty_args = t, this.args = r
                }
                serialize(e) {
                    e.serializeBytes(this.code), jr(this.ty_args, e), jr(this.args, e)
                }
                static deserialize(e) {
                    const t = e.deserializeBytes(),
                        r = Wr(e, wn),
                        n = Wr(e, Dn);
                    return new Rn(t, r, n)
                }
            },
            Bn = class {
                constructor(e, t, r, n) {
                    this.module_name = e, this.function_name = t, this.ty_args = r, this.args = n
                }
                static natural(e, t, r, n) {
                    return new Bn(zn.fromStr(e), new gn(t), r, n)
                }
                static natual(e, t, r, n) {
                    return Bn.natural(e, t, r, n)
                }
                serialize(e) {
                    this.module_name.serialize(e), this.function_name.serialize(e), jr(this.ty_args, e), e.serializeU32AsUleb128(this.args.length), this.args.forEach((t => {
                        e.serializeBytes(t)
                    }))
                }
                static deserialize(e) {
                    const t = zn.deserialize(e),
                        r = gn.deserialize(e),
                        n = Wr(e, wn),
                        i = e.deserializeUleb128AsU32(),
                        s = [];
                    for (let o = 0; o < i; o += 1) s.push(e.deserializeBytes());
                    return new Bn(t, r, n, s)
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
                    const t = e.deserializeBytes();
                    return new In(t)
                }
            },
            zn = class {
                constructor(e, t) {
                    this.address = e, this.name = t
                }
                static fromStr(e) {
                    const t = e.split("::");
                    if (2 !== t.length) throw new Error("Invalid module id.");
                    return new zn(kr.fromHex(new ge(t[0])), new gn(t[1]))
                }
                serialize(e) {
                    this.address.serialize(e), this.name.serialize(e)
                }
                static deserialize(e) {
                    const t = kr.deserialize(e),
                        r = gn.deserialize(e);
                    return new zn(t, r)
                }
            },
            On = class {
                serialize(e) {
                    throw new Error("Not implemented.")
                }
                static deserialize(e) {
                    throw new Error("Not implemented.")
                }
            },
            Ln = class {
                serialize(e) {
                    throw new Error("Not implmented.")
                }
                static deserialize(e) {
                    throw new Error("Not implmented.")
                }
            },
            qn = class {
                constructor(e, t) {
                    this.raw_txn = e, this.authenticator = t
                }
                serialize(e) {
                    this.raw_txn.serialize(e), this.authenticator.serialize(e)
                }
                static deserialize(e) {
                    const t = Sn.deserialize(e),
                        r = un.deserialize(e);
                    return new qn(t, r)
                }
            },
            kn = class {
                static deserialize(e) {
                    const t = e.deserializeUleb128AsU32();
                    if (0 === t) return Cn.load(e);
                    throw new Error("Unknown variant index for RawTransactionWithData: ".concat(t))
                }
            },
            Cn = class extends kn {
                constructor(e, t) {
                    super(), this.raw_txn = e, this.secondary_signer_addresses = t
                }
                serialize(e) {
                    e.serializeU32AsUleb128(0), this.raw_txn.serialize(e), jr(this.secondary_signer_addresses, e)
                }
                static load(e) {
                    const t = Sn.deserialize(e),
                        r = Wr(e, kr);
                    return new Cn(t, r)
                }
            },
            Nn = class {
                static deserialize(e) {
                    const t = e.deserializeUleb128AsU32();
                    switch (t) {
                        case 0:
                            return Mn.load(e);
                        case 2:
                            return Hn.load(e);
                        default:
                            throw new Error("Unknown variant index for TransactionPayload: ".concat(t))
                    }
                }
            },
            Mn = class extends Nn {
                constructor(e) {
                    super(), this.value = e
                }
                serialize(e) {
                    e.serializeU32AsUleb128(0), this.value.serialize(e)
                }
                static load(e) {
                    const t = Rn.deserialize(e);
                    return new Mn(t)
                }
            },
            Hn = class extends Nn {
                constructor(e) {
                    super(), this.value = e
                }
                serialize(e) {
                    e.serializeU32AsUleb128(2), this.value.serialize(e)
                }
                static load(e) {
                    const t = Bn.deserialize(e);
                    return new Hn(t)
                }
            },
            Pn = class {
                constructor(e) {
                    this.value = e
                }
                serialize(e) {
                    e.serializeU8(this.value)
                }
                static deserialize(e) {
                    const t = e.deserializeU8();
                    return new Pn(t)
                }
            },
            Dn = class {
                static deserialize(e) {
                    const t = e.deserializeUleb128AsU32();
                    switch (t) {
                        case 0:
                            return jn.load(e);
                        case 1:
                            return Fn.load(e);
                        case 2:
                            return Wn.load(e);
                        case 3:
                            return Gn.load(e);
                        case 4:
                            return Vn.load(e);
                        case 5:
                            return $n.load(e);
                        default:
                            throw new Error("Unknown variant index for TransactionArgument: ".concat(t))
                    }
                }
            },
            jn = class extends Dn {
                constructor(e) {
                    super(), this.value = e
                }
                serialize(e) {
                    e.serializeU32AsUleb128(0), e.serializeU8(this.value)
                }
                static load(e) {
                    const t = e.deserializeU8();
                    return new jn(t)
                }
            },
            Fn = class extends Dn {
                constructor(e) {
                    super(), this.value = e
                }
                serialize(e) {
                    e.serializeU32AsUleb128(1), e.serializeU64(this.value)
                }
                static load(e) {
                    const t = e.deserializeU64();
                    return new Fn(t)
                }
            },
            Wn = class extends Dn {
                constructor(e) {
                    super(), this.value = e
                }
                serialize(e) {
                    e.serializeU32AsUleb128(2), e.serializeU128(this.value)
                }
                static load(e) {
                    const t = e.deserializeU128();
                    return new Wn(t)
                }
            },
            Gn = class extends Dn {
                constructor(e) {
                    super(), this.value = e
                }
                serialize(e) {
                    e.serializeU32AsUleb128(3), this.value.serialize(e)
                }
                static load(e) {
                    const t = kr.deserialize(e);
                    return new Gn(t)
                }
            },
            Vn = class extends Dn {
                constructor(e) {
                    super(), this.value = e
                }
                serialize(e) {
                    e.serializeU32AsUleb128(4), e.serializeBytes(this.value)
                }
                static load(e) {
                    const t = e.deserializeBytes();
                    return new Vn(t)
                }
            },
            $n = class extends Dn {
                constructor(e) {
                    super(), this.value = e
                }
                serialize(e) {
                    e.serializeU32AsUleb128(5), e.serializeBool(this.value)
                }
                static load(e) {
                    const t = e.deserializeBool();
                    return new $n(t)
                }
            },
            Kn = class {
                getHashSalt() {
                    const e = G.create();
                    return e.update("APTOS::Transaction"), e.digest()
                }
                static deserialize(e) {
                    const t = e.deserializeUleb128AsU32();
                    if (0 === t) return Jn.load(e);
                    throw new Error("Unknown variant index for Transaction: ".concat(t))
                }
            },
            Jn = class extends Kn {
                constructor(e) {
                    super(), this.value = e
                }
                hash() {
                    const e = G.create();
                    return e.update(this.getHashSalt()), e.update(Gr(this)), e.digest()
                }
                serialize(e) {
                    e.serializeU32AsUleb128(0), this.value.serialize(e)
                }
                static load(e) {
                    return new Jn(qn.deserialize(e))
                }
            },
            Yn = class {
                constructor(e) {
                    if (e.length !== Yn.LENGTH) throw new Error("Expected a byte array of length 32");
                    this.bytes = e
                }
                static fromMultiEd25519PublicKey(e) {
                    const t = e.toBytes(),
                        r = new Uint8Array(t.length + 1);
                    r.set(t), r.set([Yn.MULTI_ED25519_SCHEME], t.length);
                    const n = G.create();
                    return n.update(r), new Yn(n.digest())
                }
                derivedAddress() {
                    return ge.fromUint8Array(this.bytes)
                }
            },
            Xn = Yn;
        Xn.LENGTH = 32, Xn.MULTI_ED25519_SCHEME = 1;
        var Zn = class {
                constructor(e, t, r, n, i, s, o) {
                    this.accountAddress = e, this.moduleName = t, this.structName = r, this.sequenceNumber = n, this.originator = i, this.currentAuthKey = s, this.newPublicKey = o
                }
                serialize(e) {
                    this.accountAddress.serialize(e), e.serializeStr(this.moduleName), e.serializeStr(this.structName), e.serializeU64(this.sequenceNumber), this.originator.serialize(e), this.currentAuthKey.serialize(e), e.serializeBytes(this.newPublicKey)
                }
            },
            Qn = class {
                constructor(e) {
                    this.name = e
                }
                serialize(e) {
                    e.serializeStr(this.name)
                }
                static deserialize(e) {
                    const t = e.deserializeStr();
                    return new Qn(t)
                }
            },
            ei = class {
                constructor(e, t) {
                    this.name = e, this.type_tag = t
                }
                serialize(e) {
                    e.serializeStr(this.name), this.type_tag.serialize(e)
                }
                static deserialize(e) {
                    const t = e.deserializeStr(),
                        r = wn.deserialize(e);
                    return new ei(t, r)
                }
            },
            ti = class {
                static deserialize(e) {
                    const t = e.deserializeUleb128AsU32();
                    switch (t) {
                        case 0:
                            return ri.load(e);
                        case 1:
                            return ni.load(e);
                        default:
                            throw new Error("Unknown variant index for TransactionPayload: ".concat(t))
                    }
                }
            },
            ri = class extends ti {
                constructor(e, t, r, n, i) {
                    super(), this.name = e, this.doc = t, this.code = r, this.ty_args = n, this.args = i
                }
                serialize(e) {
                    e.serializeU32AsUleb128(0), e.serializeStr(this.name), e.serializeStr(this.doc), e.serializeBytes(this.code), jr(this.ty_args, e), jr(this.args, e)
                }
                static load(e) {
                    const t = e.deserializeStr(),
                        r = e.deserializeStr(),
                        n = e.deserializeBytes(),
                        i = Wr(e, Qn),
                        s = Wr(e, ei);
                    return new ri(t, r, n, i, s)
                }
            },
            ni = class extends ti {
                constructor(e, t, r, n, i) {
                    super(), this.name = e, this.module_name = t, this.doc = r, this.ty_args = n, this.args = i
                }
                serialize(e) {
                    e.serializeU32AsUleb128(1), e.serializeStr(this.name), this.module_name.serialize(e), e.serializeStr(this.doc), jr(this.ty_args, e), jr(this.args, e)
                }
                static load(e) {
                    const t = e.deserializeStr(),
                        r = zn.deserialize(e),
                        n = e.deserializeStr(),
                        i = Wr(e, Qn),
                        s = Wr(e, ei);
                    return new ni(t, r, n, i, s)
                }
            };

        function ii(e, t, r) {
            if (!(null == t ? void 0 : t.includes(typeof e))) throw new Error(r || "Invalid arg: ".concat(e, " type should be ").concat(t instanceof Array ? t.join(" or ") : t))
        }

        function si(e) {
            throw new Error(e)
        }

        function oi(e) {
            return !!e.match(/\s/)
        }

        function ai(e) {
            return !!e.match(/[_A-Za-z0-9]/g)
        }

        function ci(e, t) {
            const r = e[t];
            if (":" === r) {
                if ("::" === e.slice(t, t + 2)) return [
                    ["COLON", "::"], 2
                ];
                si("Unrecognized token.")
            } else {
                if ("<" === r) return [
                    ["LT", "<"], 1
                ];
                if (">" === r) return [
                    ["GT", ">"], 1
                ];
                if ("," === r) return [
                    ["COMMA", ","], 1
                ];
                if (oi(r)) {
                    let r = "";
                    for (let n = t; n < e.length; n += 1) {
                        const t = e[n];
                        if (!oi(t)) break;
                        r = "".concat(r).concat(t)
                    }
                    return [
                        ["SPACE", r], r.length
                    ]
                }
                if (ai(r)) {
                    let r = "";
                    for (let n = t; n < e.length; n += 1) {
                        const t = e[n];
                        if (!ai(t)) break;
                        r = "".concat(r).concat(t)
                    }
                    return [
                        ["IDENT", r], r.length
                    ]
                }
            }
            throw new Error("Unrecognized token.")
        }
        var ui = class {
            constructor(e) {
                this.tokens = function (e) {
                    let t = 0;
                    const r = [];
                    for (; t < e.length;) {
                        const [n, i] = ci(e, t);
                        "SPACE" !== n[0] && r.push(n), t += i
                    }
                    return r
                }(e)
            }
            consume(e) {
                const t = this.tokens.shift();
                t && t[1] === e || si("Invalid type tag.")
            }
            parseCommaList(e, t) {
                const r = [];
                for (this.tokens.length <= 0 && si("Invalid type tag."); this.tokens[0][1] !== e && (r.push(this.parseTypeTag()), !(this.tokens.length > 0 && this.tokens[0][1] === e)) && (this.consume(","), !(this.tokens.length > 0 && this.tokens[0][1] === e && t));) this.tokens.length <= 0 && si("Invalid type tag.");
                return r
            }
            parseTypeTag() {
                0 === this.tokens.length && si("Invalid type tag.");
                const [e, t] = this.tokens.shift();
                if ("u8" === t) return new mn;
                if ("u64" === t) return new vn;
                if ("u128" === t) return new En;
                if ("bool" === t) return new bn;
                if ("address" === t) return new An;
                if ("vector" === t) {
                    this.consume("<");
                    const e = this.parseTypeTag();
                    return this.consume(">"), new xn(e)
                }
                if ("IDENT" === e && (t.startsWith("0x") || t.startsWith("0X"))) {
                    const e = t;
                    this.consume("::");
                    const [r, n] = this.tokens.shift();
                    "IDENT" !== r && si("Invalid type tag."), this.consume("::");
                    const [i, s] = this.tokens.shift();
                    "IDENT" !== i && si("Invalid type tag.");
                    let o = [];
                    this.tokens.length > 0 && "<" === this.tokens[0][1] && (this.consume("<"), o = this.parseCommaList(">", !0), this.consume(">"));
                    const a = new Un(kr.fromHex(e), new gn(n), new gn(s), o);
                    return new Tn(a)
                }
                throw new Error("Invalid type tag.")
            }
        };

        function li(e) {
            if (ii(e, ["boolean", "string"]), "boolean" === typeof e) return e;
            if ("true" === e) return !0;
            if ("false" === e) return !1;
            throw new Error("Invalid boolean string.")
        }

        function hi(e) {
            if (ii(e, ["number", "string"]), "number" === typeof e) return e;
            const t = Number.parseInt(e, 10);
            if (Number.isNaN(t)) throw new Error("Invalid number string.");
            return t
        }

        function di(e) {
            return ii(e, ["number", "bigint", "string"]), BigInt(e)
        }

        function fi(e, t, r) {
            if (t instanceof bn) r.serializeBool(li(e));
            else if (t instanceof mn) r.serializeU8(hi(e));
            else if (t instanceof vn) r.serializeU64(di(e));
            else if (t instanceof En) r.serializeU128(di(e));
            else {
                if (!(t instanceof An)) {
                    if (t instanceof xn) {
                        if (t.value instanceof mn) {
                            if (e instanceof Uint8Array) return void r.serializeBytes(e);
                            if ("string" === typeof e) return void r.serializeStr(e)
                        }
                        if (!(e instanceof Array)) throw new Error("Invalid vector args.");
                        return r.serializeU32AsUleb128(e.length), void e.forEach((e => fi(e, t.value, r)))
                    }
                    if (t instanceof Tn) {
                        const {
                            address: n,
                            module_name: i,
                            name: s
                        } = t.value;
                        if ("0x1::string::String" !== "".concat(ge.fromUint8Array(n.address).toShortString(), "::").concat(i.value, "::").concat(s.value)) throw new Error("The only supported struct arg is of type 0x1::string::String");
                        return ii(e, ["string"]), void r.serializeStr(e)
                    }
                    throw new Error("Unsupported arg type.")
                } {
                    let t;
                    if ("string" === typeof e || e instanceof ge) t = kr.fromHex(e);
                    else {
                        if (!(e instanceof kr)) throw new Error("Invalid account address.");
                        t = e
                    }
                    t.serialize(r)
                }
            }
        }
        var pi, yi, gi = class {
                constructor(e, t) {
                    this.rawTxnBuilder = t, this.signingFunction = e
                }
                build(e, t, r) {
                    if (!this.rawTxnBuilder) throw new Error("this.rawTxnBuilder doesn't exist.");
                    return this.rawTxnBuilder.build(e, t, r)
                }
                static getSigningMessage(e) {
                    const t = G.create();
                    if (e instanceof Sn) t.update("APTOS::RawTransaction");
                    else {
                        if (!(e instanceof Cn)) throw new Error("Unknown transaction type.");
                        t.update("APTOS::RawTransactionWithData")
                    }
                    const r = t.digest(),
                        n = Gr(e),
                        i = new Uint8Array(r.length + n.length);
                    return i.set(r), i.set(n, r.length), i
                }
            },
            wi = class extends gi {
                constructor(e, t, r) {
                    super(e, r), this.publicKey = t
                }
                rawToSigned(e) {
                    const t = gi.getSigningMessage(e),
                        r = this.signingFunction(t),
                        n = new ln(new rn(this.publicKey), r);
                    return new qn(e, n)
                }
                sign(e) {
                    return Gr(this.rawToSigned(e))
                }
            },
            bi = class {
                constructor(e, t) {
                    this.abiMap = new Map, e.forEach((e => {
                        const t = new Dr(e),
                            r = ti.deserialize(t);
                        let n;
                        if (r instanceof ni) {
                            const e = r,
                                {
                                    address: t,
                                    name: i
                                } = e.module_name;
                            n = "".concat(ge.fromUint8Array(t.address).toShortString(), "::").concat(i.value, "::").concat(e.name)
                        } else {
                            n = r.name
                        }
                        if (this.abiMap.has(n)) throw new Error("Found conflicting ABI interfaces");
                        this.abiMap.set(n, r)
                    })), this.builderConfig = {
                        maxGasAmount: BigInt(2e4),
                        expSecFromNow: 20,
                        ...t
                    }
                }
                static toBCSArgs(e, t) {
                    if (e.length !== t.length) throw new Error("Wrong number of args provided.");
                    return t.map(((t, r) => {
                        const n = new Hr;
                        return fi(t, e[r].type_tag, n), n.getBytes()
                    }))
                }
                static toTransactionArguments(e, t) {
                    if (e.length !== t.length) throw new Error("Wrong number of args provided.");
                    return t.map(((t, r) => function (e, t) {
                        if (t instanceof bn) return new $n(li(e));
                        if (t instanceof mn) return new jn(hi(e));
                        if (t instanceof vn) return new Fn(di(e));
                        if (t instanceof En) return new Wn(di(e));
                        if (t instanceof An) {
                            let t;
                            if ("string" === typeof e || e instanceof ge) t = kr.fromHex(e);
                            else {
                                if (!(e instanceof kr)) throw new Error("Invalid account address.");
                                t = e
                            }
                            return new Gn(t)
                        }
                        if (t instanceof xn && t.value instanceof mn) {
                            if (!(e instanceof Uint8Array)) throw new Error("".concat(e, " should be an instance of Uint8Array"));
                            return new Vn(e)
                        }
                        throw new Error("Unknown type for TransactionArgument.")
                    }(t, e[r].type_tag)))
                }
                setSequenceNumber(e) {
                    this.builderConfig.sequenceNumber = BigInt(e)
                }
                buildTransactionPayload(e, t, r) {
                    const n = t.map((e => new ui(e).parseTypeTag()));
                    let i;
                    if (!this.abiMap.has(e)) throw new Error("Cannot find function: ".concat(e));
                    const s = this.abiMap.get(e);
                    if (s instanceof ni) {
                        const e = s,
                            t = bi.toBCSArgs(e.args, r);
                        i = new Hn(new Bn(e.module_name, new gn(e.name), n, t))
                    } else {
                        if (!(s instanceof ri)) throw new Error("Unknown ABI format."); {
                            const e = s,
                                t = bi.toTransactionArguments(e.args, r);
                            i = new Mn(new Rn(e.code, n, t))
                        }
                    }
                    return i
                }
                build(e, t, r) {
                    const {
                        sender: n,
                        sequenceNumber: i,
                        gasUnitPrice: s,
                        maxGasAmount: o,
                        expSecFromNow: a,
                        chainId: c
                    } = this.builderConfig;
                    if (!s) throw new Error("No gasUnitPrice provided.");
                    const u = n instanceof kr ? n : kr.fromHex(n),
                        l = BigInt(Math.floor(Date.now() / 1e3) + Number(a)),
                        h = this.buildTransactionPayload(e, t, r);
                    if (h) return new Sn(u, BigInt(i), h, BigInt(o), BigInt(s), l, new Pn(Number(c)));
                    throw new Error("Invalid ABI.")
                }
            },
            mi = class {
                constructor(e, t) {
                    this.aptosClient = e, this.builderConfig = t
                }
                async fetchABI(e) {
                    const t = (await this.aptosClient.getAccountModules(e)).map((e => e.abi)).flatMap((e => e.exposed_functions.filter((e => e.is_entry)).map((t => ({
                            fullName: "".concat(e.address, "::").concat(e.name, "::").concat(t.name),
                            ...t
                        }))))),
                        r = new Map;
                    return t.forEach((e => {
                        r.set(e.fullName, e)
                    })), r
                }
                async build(e, t, r) {
                    if (3 !== (e = e.replace(/^0[xX]0*/g, "0x")).split("::").length) throw new Error("'func' needs to be a fully qualified function name in format <address>::<module>::<function>, e.g. 0x1::coins::transfer");
                    const [n, i] = e.split("::"), s = await this.fetchABI(n);
                    if (!s.has(e)) throw new Error("".concat(e, " doesn't exist."));
                    const o = s.get(e),
                        a = o.params.filter((e => "signer" !== e && "&signer" !== e)).map(((e, t) => new ei("var".concat(t), new ui(e).parseTypeTag()))),
                        c = new ni(o.name, zn.fromStr("".concat(n, "::").concat(i)), "", o.generic_type_params.map(((e, t) => new Qn("".concat(t)))), a),
                        {
                            sender: u,
                            ...l
                        } = this.builderConfig,
                        h = u instanceof kr ? ge.fromUint8Array(u.address) : u,
                        [{
                            sequence_number: d
                        }, f, {
                            gas_estimate: p
                        }] = await Promise.all([(null == l ? void 0 : l.sequenceNumber) ? Promise.resolve({
                            sequence_number: null == l ? void 0 : l.sequenceNumber
                        }) : this.aptosClient.getAccount(h), (null == l ? void 0 : l.chainId) ? Promise.resolve(null == l ? void 0 : l.chainId) : this.aptosClient.getChainId(), (null == l ? void 0 : l.gasUnitPrice) ? Promise.resolve({
                            gas_estimate: null == l ? void 0 : l.gasUnitPrice
                        }) : this.aptosClient.estimateGasPrice()]);
                    return new bi([Gr(c)], {
                        sender: u,
                        sequenceNumber: d,
                        chainId: f,
                        gasUnitPrice: BigInt(p),
                        ...l
                    }).build(e, t, r)
                }
            };
        ue([(pi = 6e5, me({
            ttlMs: pi,
            hashFunction: yi
        }))], mi.prototype, "fetchABI", 1);
        var vi = class {
                constructor(e, t) {
                    let r = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                    if (!e) throw new Error("Node URL cannot be empty.");
                    const n = void 0 === t || null === t ? {} : {
                        ...t
                    };
                    this.nodeUrl = r ? e : function (e) {
                        let t = "".concat(e);
                        return t.endsWith("/") && (t = t.substring(0, t.length - 1)), t.endsWith("/v1") || (t = "".concat(t).concat("/v1")), t
                    }(e), n.BASE = this.nodeUrl, !1 === (null == t ? void 0 : t.WITH_CREDENTIALS) ? n.WITH_CREDENTIALS = !1 : n.WITH_CREDENTIALS = !0, this.client = new Ve(n)
                }
                async getAccount(e) {
                    return this.client.accounts.getAccount(ge.ensure(e).hex())
                }
                async getAccountTransactions(e, t) {
                    var r;
                    return this.client.transactions.getAccountTransactions(ge.ensure(e).hex(), null == (r = null == t ? void 0 : t.start) ? void 0 : r.toString(), null == t ? void 0 : t.limit)
                }
                async getAccountModules(e, t) {
                    var r;
                    return this.client.accounts.getAccountModules(ge.ensure(e).hex(), null == (r = null == t ? void 0 : t.ledgerVersion) ? void 0 : r.toString())
                }
                async getAccountModule(e, t, r) {
                    var n;
                    return this.client.accounts.getAccountModule(ge.ensure(e).hex(), t, null == (n = null == r ? void 0 : r.ledgerVersion) ? void 0 : n.toString())
                }
                async getAccountResources(e, t) {
                    var r;
                    return this.client.accounts.getAccountResources(ge.ensure(e).hex(), null == (r = null == t ? void 0 : t.ledgerVersion) ? void 0 : r.toString())
                }
                async getAccountResource(e, t, r) {
                    var n;
                    return this.client.accounts.getAccountResource(ge.ensure(e).hex(), t, null == (n = null == r ? void 0 : r.ledgerVersion) ? void 0 : n.toString())
                }
                static generateBCSTransaction(e, t) {
                    return new wi((t => {
                        const r = e.signBuffer(t);
                        return new Lr.Ed25519Signature(r.toUint8Array())
                    }), e.pubKey().toUint8Array()).sign(t)
                }
                static generateBCSSimulation(e, t) {
                    return new wi((e => {
                        const t = new Uint8Array(64);
                        return new Lr.Ed25519Signature(t)
                    }), e.pubKey().toUint8Array()).sign(t)
                }
                async generateTransaction(e, t, r) {
                    const n = {
                        sender: e
                    };
                    if ((null == r ? void 0 : r.sequence_number) && (n.sequenceNumber = r.sequence_number), (null == r ? void 0 : r.gas_unit_price) && (n.gasUnitPrice = r.gas_unit_price), (null == r ? void 0 : r.max_gas_amount) && (n.maxGasAmount = r.max_gas_amount), null == r ? void 0 : r.expiration_timestamp_secs) {
                        const e = Number.parseInt(r.expiration_timestamp_secs, 10);
                        n.expSecFromNow = e - Math.floor(Date.now() / 1e3)
                    }
                    return new mi(this, n).build(t.function, t.type_arguments, t.arguments)
                }
                async signTransaction(e, t) {
                    return Promise.resolve(vi.generateBCSTransaction(e, t))
                }
                async getEventsByCreationNumber(e, t, r) {
                    var n;
                    return this.client.events.getEventsByCreationNumber(ge.ensure(e).hex(), t.toString(), null == (n = null == r ? void 0 : r.start) ? void 0 : n.toString(), null == r ? void 0 : r.limit)
                }
                async getEventsByEventHandle(e, t, r, n) {
                    var i;
                    return this.client.events.getEventsByEventHandle(ge.ensure(e).hex(), t, r, null == (i = null == n ? void 0 : n.start) ? void 0 : i.toString(), null == n ? void 0 : n.limit)
                }
                async submitTransaction(e) {
                    return this.submitSignedBCSTransaction(e)
                }
                async simulateTransaction(e, t, r) {
                    const n = vi.generateBCSSimulation(e, t);
                    return this.submitBCSSimulation(n, r)
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
                    var r, n;
                    const i = {
                        estimate_gas_unit_price: null != (r = null == t ? void 0 : t.estimateGasUnitPrice) && r,
                        estimate_max_gas_amount: null != (n = null == t ? void 0 : t.estimateMaxGasAmount) && n
                    };
                    return this.client.request.request({
                        url: "/transactions/simulate",
                        query: i,
                        method: "POST",
                        body: e,
                        mediaType: "application/x.aptos.signed_transaction+bcs"
                    })
                }
                async getTransactions(e) {
                    var t;
                    return this.client.transactions.getTransactions(null == (t = null == e ? void 0 : e.start) ? void 0 : t.toString(), null == e ? void 0 : e.limit)
                }
                async getTransactionByHash(e) {
                    return this.client.transactions.getTransactionByHash(e)
                }
                async getTransactionByVersion(e) {
                    return this.client.transactions.getTransactionByVersion(e.toString())
                }
                async transactionPending(e) {
                    try {
                        return "pending_transaction" === (await this.client.transactions.getTransactionByHash(e)).type
                    } catch (t) {
                        if (404 === (null == t ? void 0 : t.status)) return !0;
                        throw t
                    }
                }
                async waitForTransactionWithResult(e, t) {
                    var r, n;
                    const i = null != (r = null == t ? void 0 : t.timeoutSecs) ? r : 20,
                        s = null != (n = null == t ? void 0 : t.checkSuccess) && n;
                    let o, a = !0,
                        c = 0;
                    for (; a && !(c >= i);) {
                        try {
                            if (o = await this.client.transactions.getTransactionByHash(e), a = "pending_transaction" === o.type, !a) break
                        } catch (u) {
                            const e = u instanceof Ue,
                                t = e && 404 !== u.status && u.status >= 400 && u.status < 500;
                            if (!e || t) throw u
                        }
                        await we(1e3), c += 1
                    }
                    if (void 0 === o) throw new Error("Waiting for transaction ".concat(e, " failed"));
                    if (a) throw new _i("Waiting for transaction ".concat(e, " timed out after ").concat(i, " seconds"), o);
                    if (!s) return o;
                    if (!(null == o ? void 0 : o.success)) throw new xi("Transaction ".concat(e, " committed to the blockchain but execution failed"), o);
                    return o
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
                async getTableItem(e, t, r) {
                    var n;
                    return await this.client.tables.getTableItem(e, t, null == (n = null == r ? void 0 : r.ledgerVersion) ? void 0 : n.toString())
                }
                async generateRawTransaction(e, t, r) {
                    const [{
                        sequence_number: n
                    }, i, {
                        gas_estimate: s
                    }] = await Promise.all([this.getAccount(e), this.getChainId(), (null == r ? void 0 : r.gasUnitPrice) ? Promise.resolve({
                        gas_estimate: r.gasUnitPrice
                    }) : this.estimateGasPrice()]), {
                        maxGasAmount: o,
                        gasUnitPrice: a,
                        expireTimestamp: c
                    } = {
                        maxGasAmount: BigInt(2e4),
                        gasUnitPrice: BigInt(s),
                        expireTimestamp: BigInt(Math.floor(Date.now() / 1e3) + 20),
                        ...r
                    };
                    return new Lr.RawTransaction(Lr.AccountAddress.fromHex(e), BigInt(n), t, o, a, c, new Lr.ChainId(i))
                }
                async generateSignSubmitTransaction(e, t, r) {
                    const n = await this.generateRawTransaction(e.address(), t, r),
                        i = vi.generateBCSTransaction(e, n);
                    return (await this.submitSignedBCSTransaction(i)).hash
                }
                async publishPackage(e, t, r, n) {
                    const i = new Hr;
                    jr(r, i);
                    const s = new Lr.TransactionPayloadEntryFunction(Lr.EntryFunction.natural("0x1::code", "publish_package_txn", [], [Qr(t), i.getBytes()]));
                    return this.generateSignSubmitTransaction(e, s, n)
                }
                async generateSignSubmitWaitForTransaction(e, t, r) {
                    const n = await this.generateSignSubmitTransaction(e, t, r);
                    return this.waitForTransactionWithResult(n, r)
                }
                async estimateGasPrice() {
                    return this.client.transactions.estimateGasPrice()
                }
                async estimateMaxGasAmount(e) {
                    const t = "0x1::coin::CoinStore<".concat(be, ">"),
                        [{
                            gas_estimate: r
                        }, n] = await Promise.all([this.estimateGasPrice(), this.getAccountResources(e)]),
                        i = n.find((e => e.type === t));
                    return BigInt(i.data.coin.value) / BigInt(r)
                }
                async rotateAuthKeyEd25519(e, t, r) {
                    const {
                        sequence_number: n,
                        authentication_key: i
                    } = await this.getAccount(e.address()), s = new _e(t), o = new Lr.RotationProofChallenge(Lr.AccountAddress.CORE_CODE_ADDRESS, "account", "RotationProofChallenge", BigInt(n), Lr.AccountAddress.fromHex(e.address()), new Lr.AccountAddress(new ge(i).toUint8Array()), s.pubKey().toUint8Array()), a = ge.fromUint8Array(Gr(o)), c = e.signHexString(a), u = s.signHexString(a), l = new Lr.TransactionPayloadEntryFunction(Lr.EntryFunction.natural("0x1::account", "rotate_authentication_key", [], [$r(0), Qr(e.pubKey().toUint8Array()), $r(0), Qr(s.pubKey().toUint8Array()), Qr(c.toUint8Array()), Qr(u.toUint8Array())])), h = await this.generateRawTransaction(e.address(), l, r), d = vi.generateBCSTransaction(e, h);
                    return this.submitSignedBCSTransaction(d)
                }
                async lookupOriginalAddress(e) {
                    const t = await this.getAccountResource("0x1", "0x1::account::OriginatingAddress"),
                        {
                            address_map: {
                                handle: r
                            }
                        } = t.data,
                        n = await this.getTableItem(r, {
                            key_type: "address",
                            value_type: "address",
                            key: ge.ensure(e).hex()
                        });
                    return new ge(n)
                }
                async getBlockByHeight(e, t) {
                    return this.client.blocks.getBlockByHeight(e, t)
                }
                async getBlockByVersion(e, t) {
                    return this.client.blocks.getBlockByVersion(e, t)
                }
                clearCache(e) {
                    ! function (e) {
                        const t = new Set;
                        for (const r of e) {
                            const e = ve.get(r);
                            if (e)
                                for (const r of e) t.has(r) || (r.clear(), t.add(r))
                        }
                        t.size
                    }(e)
                }
            },
            Ei = vi;
        ue([Ti], Ei.prototype, "getAccount", 1), ue([Ti], Ei.prototype, "getAccountTransactions", 1), ue([Ti], Ei.prototype, "getAccountModules", 1), ue([Ti], Ei.prototype, "getAccountModule", 1), ue([Ti], Ei.prototype, "getAccountResources", 1), ue([Ti], Ei.prototype, "getAccountResource", 1), ue([Ti], Ei.prototype, "getEventsByCreationNumber", 1), ue([Ti], Ei.prototype, "getEventsByEventHandle", 1), ue([Ti], Ei.prototype, "submitSignedBCSTransaction", 1), ue([Ti], Ei.prototype, "submitBCSSimulation", 1), ue([Ti], Ei.prototype, "getTransactions", 1), ue([Ti], Ei.prototype, "getTransactionByHash", 1), ue([Ti], Ei.prototype, "getTransactionByVersion", 1), ue([Ti], Ei.prototype, "getLedgerInfo", 1), ue([me()], Ei.prototype, "getChainId", 1), ue([Ti], Ei.prototype, "getTableItem", 1), ue([Ti, me({
            ttlMs: 3e5,
            tags: ["gas_estimates"]
        })], Ei.prototype, "estimateGasPrice", 1), ue([Ti], Ei.prototype, "estimateMaxGasAmount", 1), ue([Ti], Ei.prototype, "getBlockByHeight", 1), ue([Ti], Ei.prototype, "getBlockByVersion", 1);
        var Ai = class extends Error {
                constructor(e, t, r, n) {
                    super(t), this.status = e, this.message = t, this.errorCode = r, this.vmErrorCode = n
                }
            },
            _i = class extends Error {
                constructor(e, t) {
                    super(e), this.lastSubmittedTransaction = t
                }
            },
            xi = class extends Error {
                constructor(e, t) {
                    super(e), this.transaction = t
                }
            };

        function Ti(e, t, r) {
            const n = r.value;
            return r.value = async function () {
                var e, t;
                try {
                    for (var r = arguments.length, i = new Array(r), s = 0; s < r; s++) i[s] = arguments[s];
                    return await n.apply(this, [...i])
                } catch (o) {
                    if (o instanceof Ue) throw new Ai(o.status, JSON.stringify({
                        message: o.message,
                        ...o.body
                    }), null == (e = o.body) ? void 0 : e.error_code, null == (t = o.body) ? void 0 : t.vm_error_code);
                    throw o
                }
            }, r
        }
        class Ui extends Error {
            constructor(e) {
                super(), this.message = e, "function" === typeof Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error(e).stack
            }
        }
        class Si extends Ui {
            constructor(e, t, r) {
                super(r), this.code = void 0, this.name = t, this.code = e
            }
        }
        const Ri = Object.freeze({
            INTERNAL_ERROR: new Si(-30001, "Internal Error", "Internal Error"),
            NO_ACCOUNTS: new Si(4e3, "No Accounts", "No accounts found"),
            TIME_OUT: new Si(4002, "Time Out", "The prompt timed out without a response. This could be because the user did not respond or because a new request was opened."),
            UNAUTHORIZED: new Si(4100, "Unauthorized", "The requested method and/or account has not been authorized by the user."),
            UNSUPPORTED: new Si(4200, "Unsupported", "The provider does not support the requested method."),
            USER_REJECTION: new Si(4001, "Rejected", "The user rejected the request")
        });

        function Bi(e) {
            let t;
            return t = e instanceof xe.ApiError && function (e) {
                return void 0 !== e.message && void 0 !== e.error_code
            }(e.body) ? e.body.message : e instanceof Error ? e.message : "Transaction failed", new Si(-3e4, "Transaction Failed", t)
        }
        class Ii {
            constructor(e) {
                this.storage = e
            }
            async get(e) {
                const t = await this.storage.get(e),
                    r = Object.entries(t).map((e => {
                        let [t, r] = e;
                        return [t, r ? JSON.parse(r) : void 0]
                    }));
                return Object.fromEntries(r)
            }
            async set(e) {
                const t = {},
                    r = [];
                Object.entries(e).forEach((e => {
                    let [n, i] = e;
                    void 0 !== i ? t[n] = JSON.stringify(i) : r.push(n)
                })), await Promise.all([await this.storage.set(t), await this.storage.remove(r)])
            }
            onChange(e) {
                const t = (t, r) => {
                    if ((this.storage === chrome.storage.local ? "local" : "session") !== r) return;
                    const n = {};
                    Object.keys(t).forEach((e => {
                        const r = t[e],
                            i = void 0 !== (null === r || void 0 === r ? void 0 : r.newValue) ? JSON.parse(r.newValue) : void 0,
                            s = void 0 !== (null === r || void 0 === r ? void 0 : r.oldValue) ? JSON.parse(r.oldValue) : void 0;
                        n[e] = {
                            newValue: i,
                            oldValue: s
                        }
                    })), e(n)
                };
                return chrome.storage.onChanged.addListener(t), () => chrome.storage.onChanged.removeListener(t)
            }
        }

        function zi(e) {
            return new Promise((t => {
                setTimeout(t, e)
            }))
        }
        class Oi {
            constructor(e) {
                this.storage = e
            }
            async get(e) {
                await zi(50);
                const t = {};
                return e.forEach((e => {
                    const r = this.storage.getItem(e);
                    t[e] = r ? JSON.parse(r) : void 0
                })), t
            }
            async set(e) {
                await zi(50), Object.entries(e).forEach((e => {
                    let [t, r] = e;
                    if (void 0 !== r) {
                        const e = JSON.stringify(r);
                        this.storage.setItem(t, e)
                    } else this.storage.removeItem(t)
                }))
            }
            onChange(e) {
                const t = t => {
                    if (t.storageArea !== this.storage && null !== t.key) return;
                    const r = t.key,
                        n = null !== t.newValue ? JSON.parse(t.newValue) : void 0,
                        i = null !== t.oldValue ? JSON.parse(t.oldValue) : void 0;
                    e({
                        [r]: {
                            newValue: n,
                            oldValue: i
                        }
                    })
                };
                return window.addEventListener("storage", t), () => window.removeEventListener("storage", t)
            }
        }
        const Li = Boolean(chrome.storage),
            qi = Li ? new Ii(chrome.storage.local) : new Oi(window.localStorage),
            ki = Li ? new Ii(chrome.storage.session) : new Oi(window.sessionStorage);
        let Ci;

        function Ni(e) {
            return void 0 !== e.id && Object.values(Ci).includes(e.status)
        }! function (e) {
            e.Approved = "approved", e.Rejected = "rejected", e.Timeout = "timeout"
        }(Ci || (Ci = {}));
        const Mi = {
                height: 520,
                width: 375
            },
            Hi = "prompt.html";
        class Pi extends Error {
            constructor(e) {
                const t = Object.values(Ci).indexOf(e);
                super(Object.keys(Ci).at(t)), this.status = e, this.name = "PermissionResponseError", Object.setPrototypeOf(this, Pi.prototype)
            }
        }

        function Di(e) {
            if (e.status === Ci.Approved) return e.approval;
            throw new Pi(e.status)
        }
        async function ji(e, t) {
            var r;
            const n = {
                dappInfo: e,
                id: Date.now(),
                permission: t
            };
            await qi.set({
                permissionRequest: n
            });
            const i = null !== (r = await async function () {
                const {
                    id: e
                } = chrome.runtime;
                return (await chrome.tabs.query({})).find((t => {
                    const r = t.url ? new URL(t.url) : void 0;
                    return (null === r || void 0 === r ? void 0 : r.hostname) === e && (null === r || void 0 === r ? void 0 : r.pathname) === "/".concat(Hi)
                }))
            }()) && void 0 !== r ? r : await async function () {
                var e, t;
                const {
                    height: r,
                    width: n
                } = Mi, i = await chrome.windows.getCurrent(), s = (null !== (e = i.left) && void 0 !== e ? e : 0) + (null !== (t = i.width) && void 0 !== t ? t : 0) - n, {
                    top: o
                } = i, a = await chrome.windows.create({
                    height: r,
                    left: s,
                    top: o,
                    type: "popup",
                    width: n
                });
                if (void 0 === a.id) throw new Error("Prompt window was created without an id");
                const c = await chrome.tabs.create({
                    active: !0,
                    url: Hi,
                    windowId: a.id
                });
                if (void 0 === c.id) throw new Error("Prompt tab was created without an id");
                return c
            }();
            if (void 0 === i.id || i.id === chrome.tabs.TAB_ID_NONE) throw new Error("Invalid prompt tab id");
            await chrome.windows.update(i.windowId, {
                focused: !0
            });
            const s = await async function (e, t) {
                return new Promise((r => {
                    const n = {
                        onMessage: (i, s) => {
                            var o;
                            (null === (o = s.tab) || void 0 === o ? void 0 : o.id) === e && Ni(i) && i.id === t && (chrome.runtime.onMessage.removeListener(n.onMessage), chrome.tabs.onRemoved.removeListener(n.onTabRemoved), r(i))
                        },
                        onTabRemoved: i => {
                            i === e && (chrome.runtime.onMessage.removeListener(n.onMessage), chrome.tabs.onRemoved.removeListener(n.onTabRemoved), r({
                                id: t,
                                status: Ci.Rejected
                            }))
                        }
                    };
                    chrome.runtime.onMessage.addListener(n.onMessage), chrome.tabs.onRemoved.addListener(n.onTabRemoved)
                }))
            }(i.id, n.id);
            return Di(s)
        }
        async function Fi(e) {
            await chrome.runtime.sendMessage(e)
        }
        let Wi;
        async function Gi(e, t) {
            var r;
            const n = {
                dappInfo: e,
                id: Date.now(),
                permission: t
            };
            await qi.set({
                permissionRequest: n
            });
            const i = null !== (r = void 0 === Wi || Wi.closed ? void 0 : Wi) && void 0 !== r ? r : await async function () {
                const {
                    height: e,
                    width: t
                } = Mi, r = {
                    height: e,
                    left: window.screenLeft + window.outerWidth - t,
                    popup: !0,
                    top: window.screenTop,
                    width: t
                }, n = Object.entries(r).map((e => {
                    let [t, r] = e;
                    return "".concat(t, "=").concat(JSON.stringify(r))
                })).reduce(((e, t) => "".concat(e, ", ").concat(t))), i = window.open(Hi, "prompt", n);
                if (null === i) throw new Error("Couldn't open permission request popup");
                return Wi = i, i
            }();
            i.focus();
            const s = await async function (e, t) {
                return new Promise((r => {
                    const n = {
                        onMessage: i => {
                            i.source === e && Ni(i.data) && i.data.id === t && (window.removeEventListener("message", n.onMessage), clearTimeout(n.promptPollerId), r(i.data))
                        },
                        promptPollerId: setInterval((() => {
                            var e;
                            !1 !== (null === (e = Wi) || void 0 === e ? void 0 : e.closed) && (window.removeEventListener("message", n.onMessage), clearTimeout(n.promptPollerId), r({
                                id: t,
                                status: Ci.Rejected
                            }))
                        }), 500)
                    };
                    window.addEventListener("message", n.onMessage)
                }))
            }(i, n.id);
            return Di(s)
        }
        async function Vi(e) {
            window.opener.postMessage(e)
        }
        const $i = void 0 === chrome.runtime ? t : e;
        let Ki, Ji;
        ! function (e) {
            e.ANDROID = "Android", e.IOS = "iOS", e.LINUX = "Linux", e.MAC = "Mac OS", e.WINDOWS = "Windows"
        }(Ki || (Ki = {})),
        function (e) {
            e.BRAVE = "Brave", e.CHROME = "Chrome", e.EDGE = "Edge", e.EXPLORER = "Explorer", e.FIREFOX = "Firefox", e.KIWI = "Kiwi", e.OPERA = "Opera", e.SAFARI = "Safari"
        }(Ji || (Ji = {}));
        class Yi {
            static isDev() {
                return !1
            }
            static runtime() {
                return this.isDev() ? null : chrome.runtime
            }
            static persistentStorage() {
                return this.isDev() ? null : chrome.storage.local
            }
            static sessionStorage() {
                return this.isDev() ? null : chrome.storage.session
            }
            static tabs() {
                return this.isDev() ? null : chrome.tabs
            }
            static redirect(e) {
                this.isDev() ? window.location.assign(e) : chrome.tabs.update({
                    url: e
                })
            }
        }
        const Xi = "aptosWalletPermissions";
        class Zi {
            static async addDomain(e, t) {
                const r = await this.getDomains(t);
                return r.add(e), this.saveDomains(r, t)
            }
            static async removeDomain(e, t) {
                const r = await this.getDomains(t);
                return r.delete(e), this.saveDomains(r, t)
            }
            static async isDomainAllowed(e, t) {
                return (await this.getDomains(t)).has(e)
            }
            static async getAllDomains() {
                var e;
                const t = await (null === (e = Yi.persistentStorage()) || void 0 === e ? void 0 : e.get([Xi]));
                return t && t.aptosWalletPermissions ? t.aptosWalletPermissions : {}
            }
            static async getDomains(e) {
                var t;
                const r = await this.getAllDomains();
                return null !== (t = new Set(r[e])) && void 0 !== t ? t : new Set
            }
            static async saveDomains(e, t) {
                const r = await this.getAllDomains();
                return r[t] = Array.from(e), Yi.persistentStorage().set({
                    [Xi]: r
                })
            }
        }
        let Qi;
        async function es(e, t, r, n) {
            var i;
            const s = await (null === (i = Yi.tabs()) || void 0 === i ? void 0 : i.query({}));
            if (s) {
                const i = e ? await Zi.getDomains(e) : new Set;
                s.forEach((e => {
                    if (e.id && e.url) {
                        var s;
                        const o = new URL(e.url),
                            a = i.has(o.hostname) ? n : r;
                        null === (s = Yi.tabs()) || void 0 === s || s.sendMessage(e.id, {
                            event: t,
                            params: a
                        })
                    }
                }))
            }
        }! function (e) {
            e.ACCOUNT_CHANGED = "accountChanged", e.DISCONNECT = "disconnect", e.NETWORK_CHANGED = "networkChanged"
        }(Qi || (Qi = {}));
        let ts;
        ! function (e) {
            e.Devnet = "Devnet", e.Localhost = "Localhost", e.Testnet = "Testnet"
        }(ts || (ts = {}));
        const rs = {
                [ts.Localhost]: {
                    faucetUrl: "http://localhost:80",
                    name: ts.Localhost,
                    nodeUrl: "http://localhost:8080"
                }
            },
            ns = Object.freeze({
                [ts.Testnet]: {
                    faucetUrl: "https://faucet.testnet.aptoslabs.com",
                    name: ts.Testnet,
                    nodeUrl: "https://testnet.aptoslabs.com"
                },
                [ts.Devnet]: {
                    faucetUrl: "https://faucet.devnet.aptoslabs.com",
                    name: ts.Devnet,
                    nodeUrl: "https://fullnode.devnet.aptoslabs.com"
                }
            }),
            is = ts.Testnet;

        function ss(e, t) {
            const r = t instanceof Si;
            return {
                error: r ? t : void 0,
                id: e,
                result: r ? void 0 : t,
                type: "response"
            }
        }
        async function os() {
            const {
                activeAccountAddress: e,
                activeAccountPublicKey: t
            } = await qi.get(["activeAccountAddress", "activeAccountPublicKey"]);
            return void 0 !== e && void 0 !== t ? {
                address: e,
                publicKey: t
            } : void 0
        }
        async function as() {
            const {
                activeNetworkName: e,
                customNetworks: t
            } = await qi.get(["activeNetworkName", "customNetworks"]);
            return {
                ...ns,
                ...null !== t && void 0 !== t ? t : rs
            } [null !== e && void 0 !== e ? e : is]
        }
        async function cs(e) {
            const t = await os();
            if (!(void 0 !== t && await Zi.isDomainAllowed(e, t.address))) throw Ri.UNAUTHORIZED;
            return t
        }
        async function us(e) {
            const {
                accounts: t
            } = await ki.get(["accounts"]);
            if (void 0 === t) throw new Error("accounts are locked");
            const {
                privateKey: r
            } = t[e];
            return new _e(ge.ensure(r).toUint8Array(), e)
        }
        async function ls(e, t, r, n, i, s) {
            const o = await us(r),
                a = await e.generateTransaction(t, n, {
                    gas_unit_price: "".concat(i),
                    max_gas_amount: "".concat(s)
                });
            return e.signTransaction(o, a)
        }
        const hs = {
            async account(e) {
                let {
                    domain: t
                } = e;
                return cs(t)
            },
            async connect(e) {
                const t = await os(),
                    r = !!t && await Zi.isDomainAllowed(e.domain, t.address) ? void 0 : $i.requestPermission(e, {
                        type: "connect"
                    });
                if (void 0 === t) throw Ri.NO_ACCOUNTS;
                return r && (await r, await Zi.addDomain(e.domain, t.address)), t
            },
            async disconnect(e) {
                let {
                    domain: t
                } = e;
                const {
                    address: r
                } = await cs(t);
                !async function () {
                    await es(void 0, Qi.DISCONNECT, void 0, void 0)
                }(), await Zi.removeDomain(t, r)
            },
            async isConnected(e) {
                let {
                    domain: t
                } = e;
                const r = await os();
                return void 0 !== r && Zi.isDomainAllowed(t, r.address)
            },
            async network(e) {
                let {
                    domain: t
                } = e;
                await cs(t);
                const {
                    name: r
                } = await as();
                return r
            },
            async signAndSubmitTransaction(e, t) {
                const {
                    address: r
                } = await cs(e.domain), {
                    gasUnitPrice: n,
                    maxGasFee: i
                } = await $i.requestPermission(e, {
                    payload: t,
                    type: "signAndSubmitTransaction"
                }), {
                    nodeUrl: s
                } = await as(), o = new Ei(s);
                try {
                    const e = await ls(o, r, r, t, n, i);
                    return await o.submitTransaction(e)
                } catch (a) {
                    throw console.trace(a), Bi(a)
                }
            },
            async signMessage(e, t) {
                let {
                    address: r = !1,
                    application: n = !1,
                    chainId: i = !1,
                    message: s,
                    nonce: o
                } = t;
                const {
                    address: a
                } = await cs(e.domain);
                await $i.requestPermission(e, {
                    message: s,
                    type: "signMessage"
                });
                const {
                    nodeUrl: c
                } = await as(), u = new Ei(c), l = await u.getChainId(), h = await us(a), d = new TextEncoder, f = "APTOS";
                let p = f;
                r && (p += "\naddress: ".concat(a)), n && (p += "\napplication: ".concat(e.domain)), i && (p += "\nchainId: ".concat(l)), p += "\nmessage: ".concat(s), p += "\nnonce: ".concat(o);
                const y = d.encode(p),
                    g = h.signBuffer(y).noPrefix();
                return {
                    address: a,
                    application: e.domain,
                    chainId: l,
                    fullMessage: p,
                    message: s,
                    nonce: o,
                    prefix: f,
                    signature: g
                }
            },
            async signTransaction(e, t) {
                let r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                const {
                    address: n
                } = await cs(e.domain), {
                    gasUnitPrice: i,
                    maxGasFee: s
                } = await $i.requestPermission(e, {
                    payload: t,
                    type: "signTransaction"
                }), {
                    nodeUrl: o
                } = await as(), a = new Ei(o);
                try {
                    var c;
                    return await ls(a, null !== (c = r.sender) && void 0 !== c ? c : n, n, t, i, s)
                } catch (u) {
                    throw console.trace(u), Bi(u)
                }
            }
        };
        i().defaults.adapter = async function (e) {
            const t = function (e) {
                    const t = new Headers(e.headers);
                    if (e.auth) {
                        const r = e.auth.username || "",
                            n = e.auth.password ? decodeURI(encodeURIComponent(e.auth.password)) : "";
                        t.set("Authorization", "Basic ".concat(btoa(r + ":" + n)))
                    }
                    const r = e.method.toUpperCase(),
                        n = {
                            headers: t,
                            method: r
                        };
                    "GET" !== r && "HEAD" !== r && (n.body = e.data);
                    e.mode && (n.mode = e.mode);
                    e.cache && (n.cache = e.cache);
                    e.integrity && (n.integrity = e.integrity);
                    e.redirect && (n.redirect = e.redirect);
                    e.referrer && (n.referrer = e.referrer);
                    (0, h.isUndefined)(e.withCredentials) || (n.credentials = e.withCredentials ? "include" : "omit");
                    const i = l()(e.baseURL, e.url),
                        s = c()(i, e.params, e.paramsSerializer);
                    return new Request(s, n)
                }(e),
                r = [d(t, e)];
            e.timeout && e.timeout > 0 && r.push(new Promise((r => {
                setTimeout((() => {
                    const n = e.timeoutErrorMessage ? e.timeoutErrorMessage : "timeout of " + e.timeout + "ms exceeded";
                    r(f(n, e, "ECONNABORTED", t))
                }), e.timeout)
            })));
            const n = await Promise.race(r);
            return new Promise(((t, r) => {
                n instanceof Error ? r(n) : "[object Function]" === Object.prototype.toString.call(e.settle) ? e.settle(t, r, n) : o()(t, r, n)
            }))
        }, chrome.runtime.onMessage.addListener(((e, t, r) => {
            var n, i, s, o;
            if (e && "popupOpened" === e.type && chrome.alarms.clearAll(), void 0 === e || !("request" === (s = e).type && void 0 !== s.id && s.id >= 0 && void 0 !== s.method && void 0 !== s.args)) return !1;
            if (o = e.method, !Object.keys(hs).includes(o)) return ss(e.id, Ri.UNSUPPORTED), r(ss(e.id, Ri.UNSUPPORTED)), !1;
            const a = {
                domain: t.origin,
                imageURI: null === (n = t.tab) || void 0 === n ? void 0 : n.favIconUrl,
                name: null === (i = t.tab) || void 0 === i ? void 0 : i.title
            };
            return (0, hs[e.method])(a, ...e.args).then((t => {
                r(ss(e.id, t))
            })).catch((t => {
                if (t instanceof Si) r(ss(e.id, t));
                else {
                    if (!(t instanceof Pi)) throw r(ss(e.id, Ri.INTERNAL_ERROR)), t; {
                        const n = t.status === Ci.Rejected ? Ri.USER_REJECTION : Ri.TIME_OUT;
                        r(ss(e.id, n))
                    }
                }
            })), !0
        })), chrome.alarms.onAlarm.addListener((async () => {
            await ki.set({
                accounts: void 0,
                encryptionKey: void 0
            })
        })), chrome.runtime.onConnect.addListener((e => {
            e.onDisconnect.addListener((async () => {
                const {
                    autolockTimer: e
                } = await qi.get(["autolockTimer"]);
                chrome.alarms.create("autolockTimer", {
                    delayInMinutes: null !== e && void 0 !== e ? e : 15
                })
            }))
        }))
    })()
})();