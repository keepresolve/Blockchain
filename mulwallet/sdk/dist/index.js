var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/.pnpm/eventemitter3@5.0.1/node_modules/eventemitter3/index.js
var require_eventemitter3 = __commonJS({
  "node_modules/.pnpm/eventemitter3@5.0.1/node_modules/eventemitter3/index.js"(exports, module) {
    "use strict";
    var has = Object.prototype.hasOwnProperty;
    var prefix = "~";
    function Events() {
    }
    if (Object.create) {
      Events.prototype = /* @__PURE__ */ Object.create(null);
      if (!new Events().__proto__)
        prefix = false;
    }
    function EE(fn, context, once) {
      this.fn = fn;
      this.context = context;
      this.once = once || false;
    }
    function addListener(emitter, event, fn, context, once) {
      if (typeof fn !== "function") {
        throw new TypeError("The listener must be a function");
      }
      var listener = new EE(fn, context || emitter, once), evt = prefix ? prefix + event : event;
      if (!emitter._events[evt])
        emitter._events[evt] = listener, emitter._eventsCount++;
      else if (!emitter._events[evt].fn)
        emitter._events[evt].push(listener);
      else
        emitter._events[evt] = [emitter._events[evt], listener];
      return emitter;
    }
    function clearEvent(emitter, evt) {
      if (--emitter._eventsCount === 0)
        emitter._events = new Events();
      else
        delete emitter._events[evt];
    }
    function EventEmitter2() {
      this._events = new Events();
      this._eventsCount = 0;
    }
    EventEmitter2.prototype.eventNames = function eventNames() {
      var names = [], events, name;
      if (this._eventsCount === 0)
        return names;
      for (name in events = this._events) {
        if (has.call(events, name))
          names.push(prefix ? name.slice(1) : name);
      }
      if (Object.getOwnPropertySymbols) {
        return names.concat(Object.getOwnPropertySymbols(events));
      }
      return names;
    };
    EventEmitter2.prototype.listeners = function listeners(event) {
      var evt = prefix ? prefix + event : event, handlers = this._events[evt];
      if (!handlers)
        return [];
      if (handlers.fn)
        return [handlers.fn];
      for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
        ee[i] = handlers[i].fn;
      }
      return ee;
    };
    EventEmitter2.prototype.listenerCount = function listenerCount(event) {
      var evt = prefix ? prefix + event : event, listeners = this._events[evt];
      if (!listeners)
        return 0;
      if (listeners.fn)
        return 1;
      return listeners.length;
    };
    EventEmitter2.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt])
        return false;
      var listeners = this._events[evt], len = arguments.length, args, i;
      if (listeners.fn) {
        if (listeners.once)
          this.removeListener(event, listeners.fn, void 0, true);
        switch (len) {
          case 1:
            return listeners.fn.call(listeners.context), true;
          case 2:
            return listeners.fn.call(listeners.context, a1), true;
          case 3:
            return listeners.fn.call(listeners.context, a1, a2), true;
          case 4:
            return listeners.fn.call(listeners.context, a1, a2, a3), true;
          case 5:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
          case 6:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
        }
        for (i = 1, args = new Array(len - 1); i < len; i++) {
          args[i - 1] = arguments[i];
        }
        listeners.fn.apply(listeners.context, args);
      } else {
        var length = listeners.length, j;
        for (i = 0; i < length; i++) {
          if (listeners[i].once)
            this.removeListener(event, listeners[i].fn, void 0, true);
          switch (len) {
            case 1:
              listeners[i].fn.call(listeners[i].context);
              break;
            case 2:
              listeners[i].fn.call(listeners[i].context, a1);
              break;
            case 3:
              listeners[i].fn.call(listeners[i].context, a1, a2);
              break;
            case 4:
              listeners[i].fn.call(listeners[i].context, a1, a2, a3);
              break;
            default:
              if (!args)
                for (j = 1, args = new Array(len - 1); j < len; j++) {
                  args[j - 1] = arguments[j];
                }
              listeners[i].fn.apply(listeners[i].context, args);
          }
        }
      }
      return true;
    };
    EventEmitter2.prototype.on = function on(event, fn, context) {
      return addListener(this, event, fn, context, false);
    };
    EventEmitter2.prototype.once = function once(event, fn, context) {
      return addListener(this, event, fn, context, true);
    };
    EventEmitter2.prototype.removeListener = function removeListener(event, fn, context, once) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt])
        return this;
      if (!fn) {
        clearEvent(this, evt);
        return this;
      }
      var listeners = this._events[evt];
      if (listeners.fn) {
        if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {
          clearEvent(this, evt);
        }
      } else {
        for (var i = 0, events = [], length = listeners.length; i < length; i++) {
          if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) {
            events.push(listeners[i]);
          }
        }
        if (events.length)
          this._events[evt] = events.length === 1 ? events[0] : events;
        else
          clearEvent(this, evt);
      }
      return this;
    };
    EventEmitter2.prototype.removeAllListeners = function removeAllListeners(event) {
      var evt;
      if (event) {
        evt = prefix ? prefix + event : event;
        if (this._events[evt])
          clearEvent(this, evt);
      } else {
        this._events = new Events();
        this._eventsCount = 0;
      }
      return this;
    };
    EventEmitter2.prototype.off = EventEmitter2.prototype.removeListener;
    EventEmitter2.prototype.addListener = EventEmitter2.prototype.on;
    EventEmitter2.prefixed = prefix;
    EventEmitter2.EventEmitter = EventEmitter2;
    if ("undefined" !== typeof module) {
      module.exports = EventEmitter2;
    }
  }
});

// node_modules/.pnpm/eventemitter3@5.0.1/node_modules/eventemitter3/index.mjs
var import_index = __toESM(require_eventemitter3(), 1);
var eventemitter3_default = import_index.default;

// src/constant/index.ts
var InitEventNames = {
  ["eip155" /* EVM */]: "ethereum#initialized",
  // meteMask
  ["tronLink" /* TRON */]: "tronLink#initialized",
  // 
  ["unisat" /* UTXOS */]: "unisat#initialized"
  // unisat
};

// src/provider/index.ts
var bitkeep = {
  // ethereum: new BitKeepEthereum(),
  ethereum: window.bitkeep.ethereum,
  tronLink: window.bitkeep.tronLink,
  tronWeb: window.bitkeep.tronWeb,
  // solana: any,
  // phantom: any,
  // petra: any,
  // aptos: any,
  // arweave: any,
  unisat: window.bitkeep.unisat
  // keplr
};
var getWalletProvierEventsName = (flag2, mustBitkeep) => {
  const eventName = InitEventNames[flag2];
  return eventName;
};
var getWaleltProvider = (flag2, isBitKeep2) => {
  let provider = null;
  switch (flag2) {
    case "eip155" /* EVM */:
      provider = isBitKeep2 ? bitkeep.ethereum : window.ethereum;
      break;
    case "tronLink" /* TRON */:
      provider = isBitKeep2 ? {
        tronLink: bitkeep.tronLink,
        tronWeb: bitkeep.tronWeb
      } : {
        tronWeb: window.tronWeb,
        tronLink: window.tronLink
      };
      break;
    case "unisat" /* UTXOS */:
      provider = bitkeep.unisat;
      break;
    default:
      break;
  }
  return provider;
};
var findFlagAdapter = (flag2, adapters) => {
  const adapter = adapters.find((adapter2) => adapter2.providerFlag == flag2);
  if (!adapter)
    throw "no wallet flag detected!!";
  return adapter;
};

// src/adapters/AbstractAdapter.ts
var AbstractAdapter = class extends eventemitter3_default {
  id = "bitkeep";
  name = "BitKeep Wallet";
  _state = {
    name: "bitkeepWallet",
    appInfo: {
      version: "",
      description: ""
    },
    homepage: "https://bitkeep.com",
    downloadLinks: {
      android: "https://bitkeep.com/download",
      ios: "https://bitkeep.com/download",
      qrCode: "https://bitkeep.com/en/download",
      browserExtension: {
        chrome: "https://chrome.google.com/webstore/detail/bitkeep-crypto-nft-wallet/jiidiaalihmmhddjgbnbgdfflelocpak",
        firefox: "",
        opera: "",
        edge: "https://chrome.google.com/webstore/detail/bitkeep-crypto-nft-wallet/jiidiaalihmmhddjgbnbgdfflelocpak"
      }
    },
    logo: {
      svg: "",
      png: ""
    },
    links: {
      deeplink: "bitkeep://",
      universallink: "https://bkapp.vip"
    }
  };
  isBitKeep;
  providerFlag;
  constructor(Options = {
    isBitKeep: true,
    providerFlag: "eip155" /* EVM */
  }) {
    super();
    this.providerFlag = Options.providerFlag;
    this.isBitKeep = Options.isBitKeep;
  }
  getProvider() {
    return getWaleltProvider(this.providerFlag, this.isBitKeep);
  }
  // bitkeep 规范
  async connect() {
  }
  // async request(requestParams: any) {}
  async signMessage() {
  }
  // async signSendTransaction(){}
  async signTransaction() {
  }
};

// src/adapters/LegacyEip155Adapter.ts
var LegacyEip155Adapter = class extends AbstractAdapter {
  constructor(Options = {
    isBitKeep: true
  }) {
    super({ providerFlag: "eip155" /* EVM */, isBitKeep: Options.isBitKeep });
  }
  connect() {
    const provider = this.getProvider();
    return provider.request({ method: "eth_requestAccounts" });
  }
  signMessage(params) {
    const provider = this.getProvider();
    return provider.request({
      from: provider.selectedAddress,
      method: "personal_sign",
      params: [params.message, provider.selectedAddress]
    });
  }
};

// src/adapters/TronLinkAdapter.ts
var TronLinkAdapter = class extends AbstractAdapter {
  constructor(Options = {
    isBitKeep: true
  }) {
    super({ providerFlag: "tronLink" /* TRON */, isBitKeep: Options.isBitKeep });
  }
  connect() {
    const { tronLink } = this.getProvider();
    return tronLink.request({ method: "tron_requestAccounts" });
  }
  signMessage(params) {
    const { tronWeb } = this.getProvider();
    return this.isBitKeep ? tronWeb.trx.sign(params.message) : tronWeb.trx.signMessageV2(params.message);
  }
};

// src/utils/browsers.ts
function isBitKeep() {
  return /BitKeep/i.test(window?.navigator?.userAgent);
}
function isBitKeepMoblie() {
  return isBitKeep() && true;
}
var isDocumentComplete = function() {
  let isComplete = false;
  return new Promise((resolve) => {
    if (document.readyState === "complete") {
      if (isComplete)
        return;
      isComplete = true;
      resolve(true);
    } else {
      window.onload = function() {
        if (isComplete)
          return;
        isComplete = true;
        resolve(true);
      };
    }
  });
};

// src/detect-provider/index.ts
function detectBitkeepProvider({
  isBitkeep: isBitkeep2 = true,
  timeout = 1e3,
  flag: flag2 = "eip155" /* EVM */
} = {}) {
  if (!isBitkeep2)
    return detectProvider({
      isBitkeep: isBitkeep2,
      timeout,
      flag: flag2
    });
  _validateInputs();
  let isBKMoblie = isBitKeepMoblie();
  let handled = false;
  let eventName = getWalletProvierEventsName(flag2, isBitkeep2);
  return new Promise(async (resolve) => {
    if (window.bitkeep) {
      handleDetect({ type: "init", eventName, isBKMoblie: "" });
    } else {
      await isDocumentComplete();
      if (window.bitkeep) {
        handleDetect({ type: "load", eventName, isBKMoblie });
      }
      if (eventName && isBKMoblie) {
        window.addEventListener(eventName, handleDetect.bind(null, { type: "event", eventName, isBKMoblie }), { once: true });
      }
      setTimeout(() => {
        handleDetect({ type: "timeout", eventName, isBKMoblie });
      }, timeout);
    }
    function handleDetect(params) {
      console.log("handleDetect---------", params.type);
      if (handled) {
        return;
      }
      eventName && isBKMoblie && window.removeEventListener(eventName, handleDetect);
      handled = true;
      const { bitkeep: bitkeep2 } = window;
      if (bitkeep2) {
        const provider = flag2 ? getWaleltProvider(flag2) : bitkeep2;
        resolve(provider);
      } else {
        resolve(null);
      }
    }
  });
  function _validateInputs() {
    if (typeof timeout !== "number") {
      throw new Error(`@bitkeep/web3-sdk/detect-provider: Expected option 'timeout' to be a number.`);
    }
  }
}
function detectProvider({ timeout = 1e3 }) {
  _validateInputs();
  let isBKMoblie = isBitKeepMoblie();
  let handled = false;
  let eventName = getWalletProvierEventsName(flag, isBitkeep);
  return new Promise(async (resolve) => {
    if (window.bitkeep) {
      handleDetect({ type: "init", eventName, isBKMoblie: "" });
    } else {
      await isDocumentComplete();
      const provider = getWaleltProvider(flag, false);
      if (provider) {
        handleDetect({ type: "load", eventName, isBKMoblie });
      }
      if (eventName && isBKMoblie) {
        window.addEventListener(eventName, handleDetect.bind(null, { type: "event", eventName, isBKMoblie }), { once: true });
      }
      setTimeout(() => {
        handleDetect({ type: "timeout", eventName, isBKMoblie });
      }, timeout);
    }
    function handleDetect(params) {
      console.log("handleDetect---------", params.type);
      if (handled) {
        return;
      }
      eventName && isBitKeepMoblie && window.removeEventListener(eventName, handleDetect);
      handled = true;
      const provider = getWaleltProvider(flag, false);
      if (provider) {
        resolve(provider);
      } else {
        resolve(null);
      }
    }
  });
  function _validateInputs() {
    if (typeof timeout !== "number") {
      throw new Error(`@bitkeep/web3-sdk/detect-provider: Expected option 'timeout' to be a number.`);
    }
  }
}

// src/utils/index.ts
var utils_exports = {};
__export(utils_exports, {
  findFlagAdapter: () => findFlagAdapter,
  getWaleltProvider: () => getWaleltProvider,
  getWalletProvierEventsName: () => getWalletProvierEventsName
});

// src/index.ts
var BitkeepAdapters = [
  new LegacyEip155Adapter(),
  new TronLinkAdapter()
];
var Adapters = [
  new LegacyEip155Adapter({ isBitKeep: false }),
  new TronLinkAdapter({ isBitKeep: false })
];
var BitkeepDapter = class extends eventemitter3_default {
  constructor(options) {
    super();
    const { isBitKeep: isBitKeep2 = true, providerFlag = "" } = options;
    this.options.isBitKeep = isBitKeep2;
  }
  options = {
    isBitKeep: true
  };
  state = {
    bitkeep: {
      ["eip155" /* EVM */]: {
        isConnected: true,
        accounts: {}
      },
      ["tronLink" /* TRON */]: {
        isConnected: true
      }
    }
  };
  getAdapters(flag2, isBitKeep2) {
    const adapters = isBitKeep2 ? BitkeepAdapters : Adapters;
    const adapter = findFlagAdapter(flag2, adapters);
    if (!adapter)
      throw "adapter not Installed";
    return adapter;
  }
  connect(connectParams, isBitKeep2 = true, providerFlag = "eip155" /* EVM */) {
    const Adapter = this.getAdapters(providerFlag, isBitKeep2);
    return Adapter.connect();
  }
  signMessage(connectParams, isBitKeep2, providerFlag = "eip155" /* EVM */) {
    const Adapter = this.getAdapters(providerFlag, isBitKeep2);
    return Adapter.signMessage(connectParams);
  }
  request(requestParams, options) {
  }
};
var src_default = {
  LegacyEip155Adapter,
  TronLinkAdapter,
  BitkeepDapter,
  utils: utils_exports,
  detectBitkeepProvider
};
export {
  BitkeepDapter,
  LegacyEip155Adapter,
  TronLinkAdapter,
  src_default as default,
  detectBitkeepProvider,
  utils_exports as utils
};
