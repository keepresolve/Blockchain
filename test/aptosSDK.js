var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};

// src/index.ts
var src_exports = {};
__export(src_exports, {
  ApiError: () => ApiError2,
  AptosAccount: () => AptosAccount,
  AptosClient: () => AptosClient,
  BCS: () => bcs_exports,
  CoinClient: () => CoinClient,
  FailedTransactionError: () => FailedTransactionError,
  FaucetClient: () => FaucetClient,
  HexString: () => HexString,
  TokenClient: () => TokenClient,
  TokenTypes: () => token_types_exports,
  TransactionBuilder: () => TransactionBuilder,
  TransactionBuilderABI: () => TransactionBuilderABI,
  TransactionBuilderEd25519: () => TransactionBuilderEd25519,
  TransactionBuilderMultiEd25519: () => TransactionBuilderMultiEd25519,
  TransactionBuilderRemoteABI: () => TransactionBuilderRemoteABI,
  TxnBuilderTypes: () => aptos_types_exports,
  TypeTagParser: () => TypeTagParser,
  Types: () => generated_exports,
  WaitForTransactionError: () => WaitForTransactionError,
  derivePath: () => derivePath
});
module.exports = __toCommonJS(src_exports);

// src/aptos_account.ts
var import_tweetnacl2 = __toESM(require("tweetnacl"));
var import_sha3 = require("@noble/hashes/sha3");
var bip39 = __toESM(require("@scure/bip39"));
var import_utils3 = require("@noble/hashes/utils");

// src/utils/hd-key.ts
var import_tweetnacl = __toESM(require("tweetnacl"));
var import_hmac = require("@noble/hashes/hmac");
var import_sha512 = require("@noble/hashes/sha512");
var import_utils = require("@noble/hashes/utils");
var pathRegex = /^m(\/[0-9]+')+$/;
var replaceDerive = (val) => val.replace("'", "");
var HMAC_KEY = "ed25519 seed";
var HARDENED_OFFSET = 2147483648;
var getMasterKeyFromSeed = (seed) => {
  const h = import_hmac.hmac.create(import_sha512.sha512, HMAC_KEY);
  const I = h.update((0, import_utils.hexToBytes)(seed)).digest();
  const IL = I.slice(0, 32);
  const IR = I.slice(32);
  return {
    key: IL,
    chainCode: IR
  };
};
var CKDPriv = ({ key, chainCode }, index) => {
  const buffer = new ArrayBuffer(4);
  new DataView(buffer).setUint32(0, index);
  const indexBytes = new Uint8Array(buffer);
  const zero = new Uint8Array([0]);
  const data = new Uint8Array([...zero, ...key, ...indexBytes]);
  const I = import_hmac.hmac.create(import_sha512.sha512, chainCode).update(data).digest();
  const IL = I.slice(0, 32);
  const IR = I.slice(32);
  return {
    key: IL,
    chainCode: IR
  };
};
var isValidPath = (path) => {
  if (!pathRegex.test(path)) {
    return false;
  }
  return !path.split("/").slice(1).map(replaceDerive).some(Number.isNaN);
};
var derivePath = (path, seed, offset = HARDENED_OFFSET) => {
  if (!isValidPath(path)) {
    throw new Error("Invalid derivation path");
  }
  const { key, chainCode } = getMasterKeyFromSeed(seed);
  const segments = path.split("/").slice(1).map(replaceDerive).map((el) => parseInt(el, 10));
  return segments.reduce((parentKeys, segment) => CKDPriv(parentKeys, segment + offset), { key, chainCode });
};

// src/hex_string.ts
var import_utils2 = require("@noble/hashes/utils");
var HexString = class {
  static fromBuffer(buffer) {
    return HexString.fromUint8Array(buffer);
  }
  static fromUint8Array(arr) {
    return new HexString((0, import_utils2.bytesToHex)(arr));
  }
  static ensure(hexString) {
    if (typeof hexString === "string") {
      return new HexString(hexString);
    }
    return hexString;
  }
  constructor(hexString) {
    if (hexString.startsWith("0x")) {
      this.hexString = hexString;
    } else {
      this.hexString = `0x${hexString}`;
    }
  }
  hex() {
    return this.hexString;
  }
  noPrefix() {
    return this.hexString.slice(2);
  }
  toString() {
    return this.hex();
  }
  toShortString() {
    const trimmed = this.hexString.replace(/^0x0*/, "");
    return `0x${trimmed}`;
  }
  toUint8Array() {
    return Uint8Array.from((0, import_utils2.hexToBytes)(this.noPrefix()));
  }
};

// src/utils/misc.ts
async function sleep(timeMs) {
  return new Promise((resolve2) => {
    setTimeout(resolve2, timeMs);
  });
}
var DEFAULT_VERSION_PATH_BASE = "/v1";
function fixNodeUrl(nodeUrl) {
  let out = `${nodeUrl}`;
  if (out.endsWith("/")) {
    out = out.substring(0, out.length - 1);
  }
  if (!out.endsWith(DEFAULT_VERSION_PATH_BASE)) {
    out = `${out}${DEFAULT_VERSION_PATH_BASE}`;
  }
  return out;
}
var DEFAULT_MAX_GAS_AMOUNT = 2e4;
var DEFAULT_TXN_EXP_SEC_FROM_NOW = 20;
var DEFAULT_TXN_TIMEOUT_SEC = 20;
var APTOS_COIN = "0x1::aptos_coin::AptosCoin";

// src/utils/memoize-decorator.ts
function Memoize(args) {
  let hashFunction;
  let ttlMs;
  let tags;
  if (typeof args === "object") {
    hashFunction = args.hashFunction;
    ttlMs = args.ttlMs;
    tags = args.tags;
  } else {
    hashFunction = args;
  }
  return (target, propertyKey, descriptor) => {
    if (descriptor.value != null) {
      descriptor.value = getNewFunction(descriptor.value, hashFunction, ttlMs, tags);
    } else if (descriptor.get != null) {
      descriptor.get = getNewFunction(descriptor.get, hashFunction, ttlMs, tags);
    } else {
      throw new Error("Only put a Memoize() decorator on a method or get accessor.");
    }
  };
}
function MemoizeExpiring(ttlMs, hashFunction) {
  return Memoize({
    ttlMs,
    hashFunction
  });
}
var clearCacheTagsMap = /* @__PURE__ */ new Map();
function clear(tags) {
  const cleared = /* @__PURE__ */ new Set();
  for (const tag of tags) {
    const maps = clearCacheTagsMap.get(tag);
    if (maps) {
      for (const mp of maps) {
        if (!cleared.has(mp)) {
          mp.clear();
          cleared.add(mp);
        }
      }
    }
  }
  return cleared.size;
}
function getNewFunction(originalMethod, hashFunction, ttlMs = 0, tags) {
  const propMapName = Symbol("__memoized_map__");
  return function(...args) {
    let returnedValue;
    if (!this.hasOwnProperty(propMapName)) {
      Object.defineProperty(this, propMapName, {
        configurable: false,
        enumerable: false,
        writable: false,
        value: /* @__PURE__ */ new Map()
      });
    }
    const myMap = this[propMapName];
    if (Array.isArray(tags)) {
      for (const tag of tags) {
        if (clearCacheTagsMap.has(tag)) {
          clearCacheTagsMap.get(tag).push(myMap);
        } else {
          clearCacheTagsMap.set(tag, [myMap]);
        }
      }
    }
    if (hashFunction || args.length > 0 || ttlMs > 0) {
      let hashKey;
      if (hashFunction === true) {
        hashKey = args.map((a) => a.toString()).join("!");
      } else if (hashFunction) {
        hashKey = hashFunction.apply(this, args);
      } else {
        hashKey = args[0];
      }
      const timestampKey = `${hashKey}__timestamp`;
      let isExpired = false;
      if (ttlMs > 0) {
        if (!myMap.has(timestampKey)) {
          isExpired = true;
        } else {
          const timestamp = myMap.get(timestampKey);
          isExpired = Date.now() - timestamp > ttlMs;
        }
      }
      if (myMap.has(hashKey) && !isExpired) {
        returnedValue = myMap.get(hashKey);
      } else {
        returnedValue = originalMethod.apply(this, args);
        myMap.set(hashKey, returnedValue);
        if (ttlMs > 0) {
          myMap.set(timestampKey, Date.now());
        }
      }
    } else {
      const hashKey = this;
      if (myMap.has(hashKey)) {
        returnedValue = myMap.get(hashKey);
      } else {
        returnedValue = originalMethod.apply(this, args);
        myMap.set(hashKey, returnedValue);
      }
    }
    return returnedValue;
  };
}

// src/aptos_account.ts
var _AptosAccount = class {
  static fromAptosAccountObject(obj) {
    return new _AptosAccount(HexString.ensure(obj.privateKeyHex).toUint8Array(), obj.address);
  }
  static fromDerivePath(path, mnemonics) {
    if (!_AptosAccount.isValidPath(path)) {
      throw new Error("Invalid derivation path");
    }
    const normalizeMnemonics = mnemonics.trim().split(/\s+/).map((part) => part.toLowerCase()).join(" ");
    const { key } = derivePath(path, (0, import_utils3.bytesToHex)(bip39.mnemonicToSeedSync(normalizeMnemonics)));
    return new _AptosAccount(key);
  }
  constructor(privateKeyBytes, address) {
    if (privateKeyBytes) {
      this.signingKey = import_tweetnacl2.default.sign.keyPair.fromSeed(privateKeyBytes.slice(0, 32));
    } else {
      this.signingKey = import_tweetnacl2.default.sign.keyPair();
    }
    this.accountAddress = HexString.ensure(address || this.authKey().hex());
  }
  address() {
    return this.accountAddress;
  }
  authKey() {
    const hash = import_sha3.sha3_256.create();
    hash.update(this.signingKey.publicKey);
    hash.update("\0");
    return HexString.fromUint8Array(hash.digest());
  }
  pubKey() {
    return HexString.fromUint8Array(this.signingKey.publicKey);
  }
  signBuffer(buffer) {
    const signature = import_tweetnacl2.default.sign(buffer, this.signingKey.secretKey);
    return HexString.fromUint8Array(signature.slice(0, 64));
  }
  signHexString(hexString) {
    const toSign = HexString.ensure(hexString).toUint8Array();
    return this.signBuffer(toSign);
  }
  toPrivateKeyObject() {
    return {
      address: this.address().hex(),
      publicKeyHex: this.pubKey().hex(),
      privateKeyHex: HexString.fromUint8Array(this.signingKey.secretKey.slice(0, 32)).hex()
    };
  }
};
var AptosAccount = _AptosAccount;
AptosAccount.isValidPath = (path) => {
  if (!/^m\/44'\/637'\/[0-9]+'\/[0-9]+'\/[0-9]+'+$/.test(path)) {
    return false;
  }
  return true;
};
__decorateClass([
  Memoize()
], AptosAccount.prototype, "authKey", 1);

// src/generated/index.ts
var generated_exports = {};
__export(generated_exports, {
  $AccountData: () => $AccountData,
  $AccountSignature: () => $AccountSignature,
  $AccountSignature_Ed25519Signature: () => $AccountSignature_Ed25519Signature,
  $AccountSignature_MultiEd25519Signature: () => $AccountSignature_MultiEd25519Signature,
  $Address: () => $Address,
  $AptosError: () => $AptosError,
  $AptosErrorCode: () => $AptosErrorCode,
  $Block: () => $Block,
  $BlockMetadataTransaction: () => $BlockMetadataTransaction,
  $DecodedTableData: () => $DecodedTableData,
  $DeleteModule: () => $DeleteModule,
  $DeleteResource: () => $DeleteResource,
  $DeleteTableItem: () => $DeleteTableItem,
  $DeletedTableData: () => $DeletedTableData,
  $DirectWriteSet: () => $DirectWriteSet,
  $Ed25519Signature: () => $Ed25519Signature,
  $EncodeSubmissionRequest: () => $EncodeSubmissionRequest,
  $EntryFunctionId: () => $EntryFunctionId,
  $EntryFunctionPayload: () => $EntryFunctionPayload,
  $Event: () => $Event,
  $EventGuid: () => $EventGuid,
  $EventKey: () => $EventKey,
  $GasEstimation: () => $GasEstimation,
  $GenesisPayload: () => $GenesisPayload,
  $GenesisPayload_WriteSetPayload: () => $GenesisPayload_WriteSetPayload,
  $GenesisTransaction: () => $GenesisTransaction,
  $HashValue: () => $HashValue,
  $HealthCheckSuccess: () => $HealthCheckSuccess,
  $HexEncodedBytes: () => $HexEncodedBytes,
  $IdentifierWrapper: () => $IdentifierWrapper,
  $IndexResponse: () => $IndexResponse,
  $ModuleBundlePayload: () => $ModuleBundlePayload,
  $MoveAbility: () => $MoveAbility,
  $MoveFunction: () => $MoveFunction,
  $MoveFunctionGenericTypeParam: () => $MoveFunctionGenericTypeParam,
  $MoveFunctionVisibility: () => $MoveFunctionVisibility,
  $MoveModule: () => $MoveModule,
  $MoveModuleBytecode: () => $MoveModuleBytecode,
  $MoveModuleId: () => $MoveModuleId,
  $MoveResource: () => $MoveResource,
  $MoveScriptBytecode: () => $MoveScriptBytecode,
  $MoveStruct: () => $MoveStruct,
  $MoveStructField: () => $MoveStructField,
  $MoveStructGenericTypeParam: () => $MoveStructGenericTypeParam,
  $MoveStructTag: () => $MoveStructTag,
  $MoveStructValue: () => $MoveStructValue,
  $MoveType: () => $MoveType,
  $MoveValue: () => $MoveValue,
  $MultiAgentSignature: () => $MultiAgentSignature,
  $MultiEd25519Signature: () => $MultiEd25519Signature,
  $PendingTransaction: () => $PendingTransaction,
  $RoleType: () => $RoleType,
  $ScriptPayload: () => $ScriptPayload,
  $ScriptWriteSet: () => $ScriptWriteSet,
  $StateCheckpointTransaction: () => $StateCheckpointTransaction,
  $SubmitTransactionRequest: () => $SubmitTransactionRequest,
  $TableItemRequest: () => $TableItemRequest,
  $Transaction: () => $Transaction,
  $TransactionPayload: () => $TransactionPayload,
  $TransactionPayload_EntryFunctionPayload: () => $TransactionPayload_EntryFunctionPayload,
  $TransactionPayload_ModuleBundlePayload: () => $TransactionPayload_ModuleBundlePayload,
  $TransactionPayload_ScriptPayload: () => $TransactionPayload_ScriptPayload,
  $TransactionSignature: () => $TransactionSignature,
  $TransactionSignature_Ed25519Signature: () => $TransactionSignature_Ed25519Signature,
  $TransactionSignature_MultiAgentSignature: () => $TransactionSignature_MultiAgentSignature,
  $TransactionSignature_MultiEd25519Signature: () => $TransactionSignature_MultiEd25519Signature,
  $Transaction_BlockMetadataTransaction: () => $Transaction_BlockMetadataTransaction,
  $Transaction_GenesisTransaction: () => $Transaction_GenesisTransaction,
  $Transaction_PendingTransaction: () => $Transaction_PendingTransaction,
  $Transaction_StateCheckpointTransaction: () => $Transaction_StateCheckpointTransaction,
  $Transaction_UserTransaction: () => $Transaction_UserTransaction,
  $TransactionsBatchSingleSubmissionFailure: () => $TransactionsBatchSingleSubmissionFailure,
  $TransactionsBatchSubmissionResult: () => $TransactionsBatchSubmissionResult,
  $U128: () => $U128,
  $U64: () => $U64,
  $UserTransaction: () => $UserTransaction,
  $VersionedEvent: () => $VersionedEvent,
  $WriteModule: () => $WriteModule,
  $WriteResource: () => $WriteResource,
  $WriteSet: () => $WriteSet,
  $WriteSetChange: () => $WriteSetChange,
  $WriteSetChange_DeleteModule: () => $WriteSetChange_DeleteModule,
  $WriteSetChange_DeleteResource: () => $WriteSetChange_DeleteResource,
  $WriteSetChange_DeleteTableItem: () => $WriteSetChange_DeleteTableItem,
  $WriteSetChange_WriteModule: () => $WriteSetChange_WriteModule,
  $WriteSetChange_WriteResource: () => $WriteSetChange_WriteResource,
  $WriteSetChange_WriteTableItem: () => $WriteSetChange_WriteTableItem,
  $WriteSetPayload: () => $WriteSetPayload,
  $WriteSet_DirectWriteSet: () => $WriteSet_DirectWriteSet,
  $WriteSet_ScriptWriteSet: () => $WriteSet_ScriptWriteSet,
  $WriteTableItem: () => $WriteTableItem,
  AccountsService: () => AccountsService,
  ApiError: () => ApiError,
  AptosErrorCode: () => AptosErrorCode,
  AptosGeneratedClient: () => AptosGeneratedClient,
  BaseHttpRequest: () => BaseHttpRequest,
  BlocksService: () => BlocksService,
  CancelError: () => CancelError,
  CancelablePromise: () => CancelablePromise,
  EventsService: () => EventsService,
  GeneralService: () => GeneralService,
  MoveFunctionVisibility: () => MoveFunctionVisibility,
  OpenAPI: () => OpenAPI,
  RoleType: () => RoleType,
  TablesService: () => TablesService,
  TransactionsService: () => TransactionsService
});

// src/generated/core/BaseHttpRequest.ts
var BaseHttpRequest = class {
  constructor(config) {
    this.config = config;
  }
};

// src/generated/core/request.ts
var import_axios = __toESM(require("axios"));
var import_form_data = __toESM(require("form-data"));

// src/generated/core/ApiError.ts
var ApiError = class extends Error {
  constructor(request2, response, message) {
    super(message);
    this.name = "ApiError";
    this.url = response.url;
    this.status = response.status;
    this.statusText = response.statusText;
    this.body = response.body;
    this.request = request2;
  }
};

// src/generated/core/CancelablePromise.ts
var CancelError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "CancelError";
  }
  get isCancelled() {
    return true;
  }
};
var CancelablePromise = class {
  constructor(executor) {
    this._isResolved = false;
    this._isRejected = false;
    this._isCancelled = false;
    this._cancelHandlers = [];
    this._promise = new Promise((resolve2, reject) => {
      this._resolve = resolve2;
      this._reject = reject;
      const onResolve = (value) => {
        var _a;
        if (this._isResolved || this._isRejected || this._isCancelled) {
          return;
        }
        this._isResolved = true;
        (_a = this._resolve) == null ? void 0 : _a.call(this, value);
      };
      const onReject = (reason) => {
        var _a;
        if (this._isResolved || this._isRejected || this._isCancelled) {
          return;
        }
        this._isRejected = true;
        (_a = this._reject) == null ? void 0 : _a.call(this, reason);
      };
      const onCancel = (cancelHandler) => {
        if (this._isResolved || this._isRejected || this._isCancelled) {
          return;
        }
        this._cancelHandlers.push(cancelHandler);
      };
      Object.defineProperty(onCancel, "isResolved", {
        get: () => this._isResolved
      });
      Object.defineProperty(onCancel, "isRejected", {
        get: () => this._isRejected
      });
      Object.defineProperty(onCancel, "isCancelled", {
        get: () => this._isCancelled
      });
      return executor(onResolve, onReject, onCancel);
    });
  }
  then(onFulfilled, onRejected) {
    return this._promise.then(onFulfilled, onRejected);
  }
  catch(onRejected) {
    return this._promise.catch(onRejected);
  }
  finally(onFinally) {
    return this._promise.finally(onFinally);
  }
  cancel() {
    var _a;
    if (this._isResolved || this._isRejected || this._isCancelled) {
      return;
    }
    this._isCancelled = true;
    if (this._cancelHandlers.length) {
      try {
        for (const cancelHandler of this._cancelHandlers) {
          cancelHandler();
        }
      } catch (error) {
        console.warn("Cancellation threw an error", error);
        return;
      }
    }
    this._cancelHandlers.length = 0;
    (_a = this._reject) == null ? void 0 : _a.call(this, new CancelError("Request aborted"));
  }
  get isCancelled() {
    return this._isCancelled;
  }
};
Symbol.toStringTag;

// src/generated/core/request.ts
var CookieJar = class {
  constructor(jar2 = /* @__PURE__ */ new Map()) {
    this.jar = jar2;
  }
  setCookie(url, cookieStr) {
    var _a;
    const key = url.origin.toLowerCase();
    if (!this.jar.has(key)) {
      this.jar.set(key, []);
    }
    const cookie = CookieJar.parse(cookieStr);
    this.jar.set(key, [...((_a = this.jar.get(key)) == null ? void 0 : _a.filter((c) => c.name !== cookie.name)) || [], cookie]);
  }
  getCookies(url) {
    var _a;
    const key = url.origin.toLowerCase();
    if (!this.jar.get(key)) {
      return [];
    }
    return ((_a = this.jar.get(key)) == null ? void 0 : _a.filter((cookie) => !cookie.expires || cookie.expires > new Date())) || [];
  }
  static parse(str) {
    if (typeof str !== "string") {
      throw new Error("argument str must be a string");
    }
    const parts = str.split(";").map((part) => part.trim());
    let cookie;
    if (parts.length > 0) {
      const [name, value] = parts[0].split("=");
      if (!name || !value) {
        throw new Error("Invalid cookie");
      }
      cookie = {
        name,
        value
      };
    } else {
      throw new Error("Invalid cookie");
    }
    parts.slice(1).forEach((part) => {
      const [name, value] = part.split("=");
      if (!name.trim()) {
        throw new Error("Invalid cookie");
      }
      const nameLow = name.toLowerCase();
      const val = (value == null ? void 0 : value.charAt(0)) === "'" || (value == null ? void 0 : value.charAt(0)) === '"' ? value == null ? void 0 : value.slice(1, -1) : value;
      if (nameLow === "expires") {
        cookie.expires = new Date(val);
      }
      if (nameLow === "path") {
        cookie.path = val;
      }
      if (nameLow === "samesite") {
        if (val !== "Lax" && val !== "None" && val !== "Strict") {
          throw new Error("Invalid cookie SameSite value");
        }
        cookie.sameSite = val;
      }
      if (nameLow === "secure") {
        cookie.secure = true;
      }
    });
    return cookie;
  }
};
var jar = new CookieJar();
import_axios.default.interceptors.response.use((response) => {
  if (Array.isArray(response.headers["set-cookie"])) {
    response.headers["set-cookie"].forEach((c) => {
      jar.setCookie(new URL(response.config.url), c);
    });
  }
  return response;
});
import_axios.default.interceptors.request.use(function(config) {
  const cookies = jar.getCookies(new URL(config.url));
  if ((cookies == null ? void 0 : cookies.length) > 0) {
    config.headers.cookie = cookies.map((cookie) => `${cookie.name}=${cookie.value}`).join("; ");
  }
  return config;
});
var isDefined = (value) => {
  return value !== void 0 && value !== null;
};
var isString = (value) => {
  return typeof value === "string";
};
var isStringWithValue = (value) => {
  return isString(value) && value !== "";
};
var isBlob = (value) => {
  return typeof value === "object" && typeof value.type === "string" && typeof value.stream === "function" && typeof value.arrayBuffer === "function" && typeof value.constructor === "function" && typeof value.constructor.name === "string" && /^(Blob|File)$/.test(value.constructor.name) && /^(Blob|File)$/.test(value[Symbol.toStringTag]);
};
var isFormData = (value) => {
  return value instanceof import_form_data.default;
};
var isSuccess = (status) => {
  return status >= 200 && status < 300;
};
var base64 = (str) => {
  return btoa(str);
};
var getQueryString = (params) => {
  const qs = [];
  const append = (key, value) => {
    qs.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
  };
  const process = (key, value) => {
    if (isDefined(value)) {
      if (Array.isArray(value)) {
        value.forEach((v) => {
          process(key, v);
        });
      } else if (typeof value === "object") {
        Object.entries(value).forEach(([k, v]) => {
          process(`${key}[${k}]`, v);
        });
      } else {
        append(key, value);
      }
    }
  };
  Object.entries(params).forEach(([key, value]) => {
    process(key, value);
  });
  if (qs.length > 0) {
    return `?${qs.join("&")}`;
  }
  return "";
};
var getUrl = (config, options) => {
  const encoder = config.ENCODE_PATH || encodeURI;
  const path = options.url.replace("{api-version}", config.VERSION).replace(/{(.*?)}/g, (substring, group) => {
    var _a;
    if ((_a = options.path) == null ? void 0 : _a.hasOwnProperty(group)) {
      return encoder(String(options.path[group]));
    }
    return substring;
  });
  const url = `${config.BASE}${path}`;
  if (options.query) {
    return `${url}${getQueryString(options.query)}`;
  }
  return url;
};
var getFormData = (options) => {
  if (options.formData) {
    const formData = new import_form_data.default();
    const process = (key, value) => {
      if (isString(value) || isBlob(value)) {
        formData.append(key, value);
      } else {
        formData.append(key, JSON.stringify(value));
      }
    };
    Object.entries(options.formData).filter(([_, value]) => isDefined(value)).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => process(key, v));
      } else {
        process(key, value);
      }
    });
    return formData;
  }
  return void 0;
};
var resolve = async (options, resolver) => {
  if (typeof resolver === "function") {
    return resolver(options);
  }
  return resolver;
};
var getHeaders = async (config, options, formData) => {
  const token = await resolve(options, config.TOKEN);
  const username = await resolve(options, config.USERNAME);
  const password = await resolve(options, config.PASSWORD);
  const additionalHeaders = await resolve(options, config.HEADERS);
  const formHeaders = typeof (formData == null ? void 0 : formData.getHeaders) === "function" && (formData == null ? void 0 : formData.getHeaders()) || {};
  const headers = Object.entries({
    Accept: "application/json",
    ...additionalHeaders,
    ...options.headers,
    ...formHeaders
  }).filter(([_, value]) => isDefined(value)).reduce((headers2, [key, value]) => ({
    ...headers2,
    [key]: String(value)
  }), {});
  if (isStringWithValue(token)) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  if (isStringWithValue(username) && isStringWithValue(password)) {
    const credentials = base64(`${username}:${password}`);
    headers["Authorization"] = `Basic ${credentials}`;
  }
  if (options.body) {
    if (options.mediaType) {
      headers["Content-Type"] = options.mediaType;
    } else if (isBlob(options.body)) {
      headers["Content-Type"] = options.body.type || "application/octet-stream";
    } else if (isString(options.body)) {
      headers["Content-Type"] = "text/plain";
    } else if (!isFormData(options.body)) {
      headers["Content-Type"] = "application/json";
    }
  }
  return headers;
};
var getRequestBody = (options) => {
  if (options.body) {
    return options.body;
  }
  return void 0;
};
var sendRequest = async (config, options, url, body, formData, headers, onCancel) => {
  const source = import_axios.default.CancelToken.source();
  const requestConfig = {
    url,
    headers,
    data: body != null ? body : formData,
    method: options.method,
    withCredentials: config.WITH_CREDENTIALS,
    cancelToken: source.token
  };
  const isBCS = Object.keys(config.HEADERS || {}).filter((k) => k.toLowerCase() === "accept").map((k) => config.HEADERS[k]).includes("application/x-bcs");
  if (isBCS) {
    requestConfig.responseType = "arraybuffer";
  }
  onCancel(() => source.cancel("The user aborted a request."));
  try {
    return await import_axios.default.request(requestConfig);
  } catch (error) {
    const axiosError = error;
    if (axiosError.response) {
      return axiosError.response;
    }
    throw error;
  }
};
var getResponseHeader = (response, responseHeader) => {
  if (responseHeader) {
    const content = response.headers[responseHeader];
    if (isString(content)) {
      return content;
    }
  }
  return void 0;
};
var getResponseBody = (response) => {
  if (response.status !== 204) {
    return response.data;
  }
  return void 0;
};
var catchErrorCodes = (options, result) => {
  const errors = {
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
    500: "Internal Server Error",
    502: "Bad Gateway",
    503: "Service Unavailable",
    ...options.errors
  };
  const error = errors[result.status];
  if (error) {
    throw new ApiError(options, result, error);
  }
  if (!result.ok) {
    throw new ApiError(options, result, "Generic Error");
  }
};
var request = (config, options) => {
  return new CancelablePromise(async (resolve2, reject, onCancel) => {
    try {
      const url = getUrl(config, options);
      const formData = getFormData(options);
      const body = getRequestBody(options);
      const headers = await getHeaders(config, options, formData);
      if (!onCancel.isCancelled) {
        const response = await sendRequest(config, options, url, body, formData, headers, onCancel);
        const responseBody = getResponseBody(response);
        const responseHeader = getResponseHeader(response, options.responseHeader);
        const result = {
          url,
          ok: isSuccess(response.status),
          status: response.status,
          statusText: response.statusText,
          body: responseHeader != null ? responseHeader : responseBody
        };
        catchErrorCodes(options, result);
        resolve2(result.body);
      }
    } catch (error) {
      reject(error);
    }
  });
};

// src/generated/core/AxiosHttpRequest.ts
var AxiosHttpRequest = class extends BaseHttpRequest {
  constructor(config) {
    super(config);
  }
  request(options) {
    return request(this.config, options);
  }
};

// src/generated/services/AccountsService.ts
var AccountsService = class {
  constructor(httpRequest) {
    this.httpRequest = httpRequest;
  }
  getAccount(address, ledgerVersion) {
    return this.httpRequest.request({
      method: "GET",
      url: "/accounts/{address}",
      path: {
        "address": address
      },
      query: {
        "ledger_version": ledgerVersion
      }
    });
  }
  getAccountResources(address, ledgerVersion) {
    return this.httpRequest.request({
      method: "GET",
      url: "/accounts/{address}/resources",
      path: {
        "address": address
      },
      query: {
        "ledger_version": ledgerVersion
      }
    });
  }
  getAccountModules(address, ledgerVersion) {
    return this.httpRequest.request({
      method: "GET",
      url: "/accounts/{address}/modules",
      path: {
        "address": address
      },
      query: {
        "ledger_version": ledgerVersion
      }
    });
  }
  getAccountResource(address, resourceType, ledgerVersion) {
    return this.httpRequest.request({
      method: "GET",
      url: "/accounts/{address}/resource/{resource_type}",
      path: {
        "address": address,
        "resource_type": resourceType
      },
      query: {
        "ledger_version": ledgerVersion
      }
    });
  }
  getAccountModule(address, moduleName, ledgerVersion) {
    return this.httpRequest.request({
      method: "GET",
      url: "/accounts/{address}/module/{module_name}",
      path: {
        "address": address,
        "module_name": moduleName
      },
      query: {
        "ledger_version": ledgerVersion
      }
    });
  }
};

// src/generated/services/BlocksService.ts
var BlocksService = class {
  constructor(httpRequest) {
    this.httpRequest = httpRequest;
  }
  getBlockByHeight(blockHeight, withTransactions) {
    return this.httpRequest.request({
      method: "GET",
      url: "/blocks/by_height/{block_height}",
      path: {
        "block_height": blockHeight
      },
      query: {
        "with_transactions": withTransactions
      }
    });
  }
  getBlockByVersion(version, withTransactions) {
    return this.httpRequest.request({
      method: "GET",
      url: "/blocks/by_version/{version}",
      path: {
        "version": version
      },
      query: {
        "with_transactions": withTransactions
      }
    });
  }
};

// src/generated/services/EventsService.ts
var EventsService = class {
  constructor(httpRequest) {
    this.httpRequest = httpRequest;
  }
  getEventsByEventKey(eventKey, start, limit) {
    return this.httpRequest.request({
      method: "GET",
      url: "/events/{event_key}",
      path: {
        "event_key": eventKey
      },
      query: {
        "start": start,
        "limit": limit
      }
    });
  }
  getEventsByCreationNumber(address, creationNumber, start, limit) {
    return this.httpRequest.request({
      method: "GET",
      url: "/accounts/{address}/events/{creation_number}",
      path: {
        "address": address,
        "creation_number": creationNumber
      },
      query: {
        "start": start,
        "limit": limit
      }
    });
  }
  getEventsByEventHandle(address, eventHandle, fieldName, start, limit) {
    return this.httpRequest.request({
      method: "GET",
      url: "/accounts/{address}/events/{event_handle}/{field_name}",
      path: {
        "address": address,
        "event_handle": eventHandle,
        "field_name": fieldName
      },
      query: {
        "start": start,
        "limit": limit
      }
    });
  }
};

// src/generated/services/GeneralService.ts
var GeneralService = class {
  constructor(httpRequest) {
    this.httpRequest = httpRequest;
  }
  spec() {
    return this.httpRequest.request({
      method: "GET",
      url: "/spec"
    });
  }
  healthy(durationSecs) {
    return this.httpRequest.request({
      method: "GET",
      url: "/-/healthy",
      query: {
        "duration_secs": durationSecs
      }
    });
  }
  getLedgerInfo() {
    return this.httpRequest.request({
      method: "GET",
      url: "/"
    });
  }
};

// src/generated/services/TablesService.ts
var TablesService = class {
  constructor(httpRequest) {
    this.httpRequest = httpRequest;
  }
  getTableItem(tableHandle, requestBody, ledgerVersion) {
    return this.httpRequest.request({
      method: "POST",
      url: "/tables/{table_handle}/item",
      path: {
        "table_handle": tableHandle
      },
      query: {
        "ledger_version": ledgerVersion
      },
      body: requestBody,
      mediaType: "application/json"
    });
  }
};

// src/generated/services/TransactionsService.ts
var TransactionsService = class {
  constructor(httpRequest) {
    this.httpRequest = httpRequest;
  }
  getTransactions(start, limit) {
    return this.httpRequest.request({
      method: "GET",
      url: "/transactions",
      query: {
        "start": start,
        "limit": limit
      }
    });
  }
  submitTransaction(requestBody) {
    return this.httpRequest.request({
      method: "POST",
      url: "/transactions",
      body: requestBody,
      mediaType: "application/json"
    });
  }
  getTransactionByHash(txnHash) {
    return this.httpRequest.request({
      method: "GET",
      url: "/transactions/by_hash/{txn_hash}",
      path: {
        "txn_hash": txnHash
      }
    });
  }
  getTransactionByVersion(txnVersion) {
    return this.httpRequest.request({
      method: "GET",
      url: "/transactions/by_version/{txn_version}",
      path: {
        "txn_version": txnVersion
      }
    });
  }
  getAccountTransactions(address, start, limit) {
    return this.httpRequest.request({
      method: "GET",
      url: "/accounts/{address}/transactions",
      path: {
        "address": address
      },
      query: {
        "start": start,
        "limit": limit
      }
    });
  }
  submitBatchTransactions(requestBody) {
    return this.httpRequest.request({
      method: "POST",
      url: "/transactions/batch",
      body: requestBody,
      mediaType: "application/json"
    });
  }
  simulateTransaction(requestBody, estimateMaxGasAmount, estimateGasUnitPrice) {
    return this.httpRequest.request({
      method: "POST",
      url: "/transactions/simulate",
      query: {
        "estimate_max_gas_amount": estimateMaxGasAmount,
        "estimate_gas_unit_price": estimateGasUnitPrice
      },
      body: requestBody,
      mediaType: "application/json"
    });
  }
  encodeSubmission(requestBody) {
    return this.httpRequest.request({
      method: "POST",
      url: "/transactions/encode_submission",
      body: requestBody,
      mediaType: "application/json"
    });
  }
  estimateGasPrice() {
    return this.httpRequest.request({
      method: "GET",
      url: "/estimate_gas_price"
    });
  }
};

// src/generated/AptosGeneratedClient.ts
var AptosGeneratedClient = class {
  constructor(config, HttpRequest = AxiosHttpRequest) {
    var _a, _b, _c, _d;
    this.request = new HttpRequest({
      BASE: (_a = config == null ? void 0 : config.BASE) != null ? _a : "/v1",
      VERSION: (_b = config == null ? void 0 : config.VERSION) != null ? _b : "1.2.0",
      WITH_CREDENTIALS: (_c = config == null ? void 0 : config.WITH_CREDENTIALS) != null ? _c : false,
      CREDENTIALS: (_d = config == null ? void 0 : config.CREDENTIALS) != null ? _d : "include",
      TOKEN: config == null ? void 0 : config.TOKEN,
      USERNAME: config == null ? void 0 : config.USERNAME,
      PASSWORD: config == null ? void 0 : config.PASSWORD,
      HEADERS: config == null ? void 0 : config.HEADERS,
      ENCODE_PATH: config == null ? void 0 : config.ENCODE_PATH
    });
    this.accounts = new AccountsService(this.request);
    this.blocks = new BlocksService(this.request);
    this.events = new EventsService(this.request);
    this.general = new GeneralService(this.request);
    this.tables = new TablesService(this.request);
    this.transactions = new TransactionsService(this.request);
  }
};

// src/generated/core/OpenAPI.ts
var OpenAPI = {
  BASE: "/v1",
  VERSION: "1.2.0",
  WITH_CREDENTIALS: false,
  CREDENTIALS: "include",
  TOKEN: void 0,
  USERNAME: void 0,
  PASSWORD: void 0,
  HEADERS: void 0,
  ENCODE_PATH: void 0
};

// src/generated/models/AptosErrorCode.ts
var AptosErrorCode = /* @__PURE__ */ ((AptosErrorCode2) => {
  AptosErrorCode2["ACCOUNT_NOT_FOUND"] = "account_not_found";
  AptosErrorCode2["RESOURCE_NOT_FOUND"] = "resource_not_found";
  AptosErrorCode2["MODULE_NOT_FOUND"] = "module_not_found";
  AptosErrorCode2["STRUCT_FIELD_NOT_FOUND"] = "struct_field_not_found";
  AptosErrorCode2["VERSION_NOT_FOUND"] = "version_not_found";
  AptosErrorCode2["TRANSACTION_NOT_FOUND"] = "transaction_not_found";
  AptosErrorCode2["TABLE_ITEM_NOT_FOUND"] = "table_item_not_found";
  AptosErrorCode2["BLOCK_NOT_FOUND"] = "block_not_found";
  AptosErrorCode2["VERSION_PRUNED"] = "version_pruned";
  AptosErrorCode2["BLOCK_PRUNED"] = "block_pruned";
  AptosErrorCode2["INVALID_INPUT"] = "invalid_input";
  AptosErrorCode2["INVALID_TRANSACTION_UPDATE"] = "invalid_transaction_update";
  AptosErrorCode2["SEQUENCE_NUMBER_TOO_OLD"] = "sequence_number_too_old";
  AptosErrorCode2["VM_ERROR"] = "vm_error";
  AptosErrorCode2["HEALTH_CHECK_FAILED"] = "health_check_failed";
  AptosErrorCode2["MEMPOOL_IS_FULL"] = "mempool_is_full";
  AptosErrorCode2["INTERNAL_ERROR"] = "internal_error";
  AptosErrorCode2["WEB_FRAMEWORK_ERROR"] = "web_framework_error";
  AptosErrorCode2["BCS_NOT_SUPPORTED"] = "bcs_not_supported";
  AptosErrorCode2["API_DISABLED"] = "api_disabled";
  return AptosErrorCode2;
})(AptosErrorCode || {});

// src/generated/models/MoveFunctionVisibility.ts
var MoveFunctionVisibility = /* @__PURE__ */ ((MoveFunctionVisibility2) => {
  MoveFunctionVisibility2["PRIVATE"] = "private";
  MoveFunctionVisibility2["PUBLIC"] = "public";
  MoveFunctionVisibility2["FRIEND"] = "friend";
  return MoveFunctionVisibility2;
})(MoveFunctionVisibility || {});

// src/generated/models/RoleType.ts
var RoleType = /* @__PURE__ */ ((RoleType2) => {
  RoleType2["VALIDATOR"] = "validator";
  RoleType2["FULL_NODE"] = "full_node";
  return RoleType2;
})(RoleType || {});

// src/generated/schemas/$AccountData.ts
var $AccountData = {
  description: `Account data

    A simplified version of the onchain Account resource`,
  properties: {
    sequence_number: {
      type: "U64",
      isRequired: true
    },
    authentication_key: {
      type: "HexEncodedBytes",
      isRequired: true
    }
  }
};

// src/generated/schemas/$AccountSignature.ts
var $AccountSignature = {
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

// src/generated/schemas/$AccountSignature_Ed25519Signature.ts
var $AccountSignature_Ed25519Signature = {
  type: "all-of",
  contains: [{
    properties: {
      type: {
        type: "string",
        isRequired: true
      }
    }
  }, {
    type: "Ed25519Signature"
  }]
};

// src/generated/schemas/$AccountSignature_MultiEd25519Signature.ts
var $AccountSignature_MultiEd25519Signature = {
  type: "all-of",
  contains: [{
    properties: {
      type: {
        type: "string",
        isRequired: true
      }
    }
  }, {
    type: "MultiEd25519Signature"
  }]
};

// src/generated/schemas/$Address.ts
var $Address = {
  type: "string",
  description: `A hex encoded 32 byte Aptos account address.

    This is represented in a string as a 64 character hex string, sometimes
    shortened by stripping leading 0s, and adding a 0x.

    For example, address 0x0000000000000000000000000000000000000000000000000000000000000001 is represented as 0x1.
    `,
  format: "hex"
};

// src/generated/schemas/$AptosError.ts
var $AptosError = {
  description: `This is the generic struct we use for all API errors, it contains a string
    message and an Aptos API specific error code.`,
  properties: {
    message: {
      type: "string",
      description: `A message describing the error`,
      isRequired: true
    },
    error_code: {
      type: "AptosErrorCode",
      isRequired: true
    },
    vm_error_code: {
      type: "number",
      description: `A code providing VM error details when submitting transactions to the VM`,
      format: "uint64"
    }
  }
};

// src/generated/schemas/$AptosErrorCode.ts
var $AptosErrorCode = {
  type: "Enum"
};

// src/generated/schemas/$Block.ts
var $Block = {
  description: `A Block with or without transactions

    This contains the information about a transactions along with
    associated transactions if requested`,
  properties: {
    block_height: {
      type: "U64",
      isRequired: true
    },
    block_hash: {
      type: "HashValue",
      isRequired: true
    },
    block_timestamp: {
      type: "U64",
      isRequired: true
    },
    first_version: {
      type: "U64",
      isRequired: true
    },
    last_version: {
      type: "U64",
      isRequired: true
    },
    transactions: {
      type: "array",
      contains: {
        type: "Transaction"
      }
    }
  }
};

// src/generated/schemas/$BlockMetadataTransaction.ts
var $BlockMetadataTransaction = {
  description: `A block metadata transaction

    This signifies the beginning of a block, and contains information
    about the specific block`,
  properties: {
    version: {
      type: "U64",
      isRequired: true
    },
    hash: {
      type: "HashValue",
      isRequired: true
    },
    state_change_hash: {
      type: "HashValue",
      isRequired: true
    },
    event_root_hash: {
      type: "HashValue",
      isRequired: true
    },
    state_checkpoint_hash: {
      type: "HashValue"
    },
    gas_used: {
      type: "U64",
      isRequired: true
    },
    success: {
      type: "boolean",
      description: `Whether the transaction was successful`,
      isRequired: true
    },
    vm_status: {
      type: "string",
      description: `The VM status of the transaction, can tell useful information in a failure`,
      isRequired: true
    },
    accumulator_root_hash: {
      type: "HashValue",
      isRequired: true
    },
    changes: {
      type: "array",
      contains: {
        type: "WriteSetChange"
      },
      isRequired: true
    },
    id: {
      type: "HashValue",
      isRequired: true
    },
    epoch: {
      type: "U64",
      isRequired: true
    },
    round: {
      type: "U64",
      isRequired: true
    },
    events: {
      type: "array",
      contains: {
        type: "Event"
      },
      isRequired: true
    },
    previous_block_votes_bitvec: {
      type: "array",
      contains: {
        type: "number",
        format: "uint8"
      },
      isRequired: true
    },
    proposer: {
      type: "Address",
      isRequired: true
    },
    failed_proposer_indices: {
      type: "array",
      contains: {
        type: "number",
        format: "uint32"
      },
      isRequired: true
    },
    timestamp: {
      type: "U64",
      isRequired: true
    }
  }
};

// src/generated/schemas/$DecodedTableData.ts
var $DecodedTableData = {
  description: `Decoded table data`,
  properties: {
    key: {
      description: `Key of table in JSON`,
      properties: {},
      isRequired: true
    },
    key_type: {
      type: "string",
      description: `Type of key`,
      isRequired: true
    },
    value: {
      description: `Value of table in JSON`,
      properties: {},
      isRequired: true
    },
    value_type: {
      type: "string",
      description: `Type of value`,
      isRequired: true
    }
  }
};

// src/generated/schemas/$DeletedTableData.ts
var $DeletedTableData = {
  description: `Deleted table data`,
  properties: {
    key: {
      description: `Deleted key`,
      properties: {},
      isRequired: true
    },
    key_type: {
      type: "string",
      description: `Deleted key type`,
      isRequired: true
    }
  }
};

// src/generated/schemas/$DeleteModule.ts
var $DeleteModule = {
  description: `Delete a module`,
  properties: {
    address: {
      type: "Address",
      isRequired: true
    },
    state_key_hash: {
      type: "string",
      description: `State key hash`,
      isRequired: true
    },
    module: {
      type: "MoveModuleId",
      isRequired: true
    }
  }
};

// src/generated/schemas/$DeleteResource.ts
var $DeleteResource = {
  description: `Delete a resource`,
  properties: {
    address: {
      type: "Address",
      isRequired: true
    },
    state_key_hash: {
      type: "string",
      description: `State key hash`,
      isRequired: true
    },
    resource: {
      type: "MoveStructTag",
      isRequired: true
    }
  }
};

// src/generated/schemas/$DeleteTableItem.ts
var $DeleteTableItem = {
  description: `Delete a table item`,
  properties: {
    state_key_hash: {
      type: "string",
      isRequired: true
    },
    handle: {
      type: "HexEncodedBytes",
      isRequired: true
    },
    key: {
      type: "HexEncodedBytes",
      isRequired: true
    },
    data: {
      type: "DeletedTableData"
    }
  }
};

// src/generated/schemas/$DirectWriteSet.ts
var $DirectWriteSet = {
  properties: {
    changes: {
      type: "array",
      contains: {
        type: "WriteSetChange"
      },
      isRequired: true
    },
    events: {
      type: "array",
      contains: {
        type: "Event"
      },
      isRequired: true
    }
  }
};

// src/generated/schemas/$Ed25519Signature.ts
var $Ed25519Signature = {
  description: `A single Ed25519 signature`,
  properties: {
    public_key: {
      type: "HexEncodedBytes",
      isRequired: true
    },
    signature: {
      type: "HexEncodedBytes",
      isRequired: true
    }
  }
};

// src/generated/schemas/$EncodeSubmissionRequest.ts
var $EncodeSubmissionRequest = {
  description: `Request to encode a submission`,
  properties: {
    sender: {
      type: "Address",
      isRequired: true
    },
    sequence_number: {
      type: "U64",
      isRequired: true
    },
    max_gas_amount: {
      type: "U64",
      isRequired: true
    },
    gas_unit_price: {
      type: "U64",
      isRequired: true
    },
    expiration_timestamp_secs: {
      type: "U64",
      isRequired: true
    },
    payload: {
      type: "TransactionPayload",
      isRequired: true
    },
    secondary_signers: {
      type: "array",
      contains: {
        type: "Address"
      }
    }
  }
};

// src/generated/schemas/$EntryFunctionId.ts
var $EntryFunctionId = {
  type: "string",
  description: `Entry function id is string representation of a entry function defined on-chain.

    Format: \`{address}::{module name}::{function name}\`

    Both \`module name\` and \`function name\` are case-sensitive.
    `
};

// src/generated/schemas/$EntryFunctionPayload.ts
var $EntryFunctionPayload = {
  description: `Payload which runs a single entry function`,
  properties: {
    function: {
      type: "EntryFunctionId",
      isRequired: true
    },
    type_arguments: {
      type: "array",
      contains: {
        type: "MoveType"
      },
      isRequired: true
    },
    arguments: {
      type: "array",
      contains: {
        properties: {}
      },
      isRequired: true
    }
  }
};

// src/generated/schemas/$Event.ts
var $Event = {
  description: `An event from a transaction`,
  properties: {
    key: {
      type: "EventKey",
      isRequired: true
    },
    guid: {
      type: "EventGuid",
      isRequired: true
    },
    sequence_number: {
      type: "U64",
      isRequired: true
    },
    type: {
      type: "MoveType",
      isRequired: true
    },
    data: {
      description: `The JSON representation of the event`,
      properties: {},
      isRequired: true
    }
  }
};

// src/generated/schemas/$EventGuid.ts
var $EventGuid = {
  properties: {
    creation_number: {
      type: "U64",
      isRequired: true
    },
    account_address: {
      type: "Address",
      isRequired: true
    }
  }
};

// src/generated/schemas/$EventKey.ts
var $EventKey = {
  type: "string",
  description: `Event key is a global index for an event stream.

    It is hex-encoded BCS bytes of \`EventHandle\` \`guid\` field value, which is
    a combination of a \`uint64\` creation number and account address (without
    trimming leading zeros).

    For example, event key \`0x000000000000000088fbd33f54e1126269769780feb24480428179f552e2313fbe571b72e62a1ca1\` is combined by the following 2 parts:
    1. \`0000000000000000\`: \`uint64\` representation of \`0\`.
    2. \`88fbd33f54e1126269769780feb24480428179f552e2313fbe571b72e62a1ca1\`: 32 bytes of account address.
    `,
  format: "hex"
};

// src/generated/schemas/$GasEstimation.ts
var $GasEstimation = {
  description: `Struct holding the outputs of the estimate gas API`,
  properties: {
    gas_estimate: {
      type: "number",
      description: `The current estimate for the gas unit price`,
      isRequired: true,
      format: "uint64"
    }
  }
};

// src/generated/schemas/$GenesisPayload.ts
var $GenesisPayload = {
  type: "one-of",
  description: `The writeset payload of the Genesis transaction`,
  contains: [{
    type: "GenesisPayload_WriteSetPayload"
  }]
};

// src/generated/schemas/$GenesisPayload_WriteSetPayload.ts
var $GenesisPayload_WriteSetPayload = {
  type: "all-of",
  contains: [{
    properties: {
      type: {
        type: "string",
        isRequired: true
      }
    }
  }, {
    type: "WriteSetPayload"
  }]
};

// src/generated/schemas/$GenesisTransaction.ts
var $GenesisTransaction = {
  description: `The genesis transaction

    This only occurs at the genesis transaction (version 0)`,
  properties: {
    version: {
      type: "U64",
      isRequired: true
    },
    hash: {
      type: "HashValue",
      isRequired: true
    },
    state_change_hash: {
      type: "HashValue",
      isRequired: true
    },
    event_root_hash: {
      type: "HashValue",
      isRequired: true
    },
    state_checkpoint_hash: {
      type: "HashValue"
    },
    gas_used: {
      type: "U64",
      isRequired: true
    },
    success: {
      type: "boolean",
      description: `Whether the transaction was successful`,
      isRequired: true
    },
    vm_status: {
      type: "string",
      description: `The VM status of the transaction, can tell useful information in a failure`,
      isRequired: true
    },
    accumulator_root_hash: {
      type: "HashValue",
      isRequired: true
    },
    changes: {
      type: "array",
      contains: {
        type: "WriteSetChange"
      },
      isRequired: true
    },
    payload: {
      type: "GenesisPayload",
      isRequired: true
    },
    events: {
      type: "array",
      contains: {
        type: "Event"
      },
      isRequired: true
    }
  }
};

// src/generated/schemas/$HashValue.ts
var $HashValue = {
  type: "string"
};

// src/generated/schemas/$HealthCheckSuccess.ts
var $HealthCheckSuccess = {
  description: `Representation of a successful healthcheck`,
  properties: {
    message: {
      type: "string",
      isRequired: true
    }
  }
};

// src/generated/schemas/$HexEncodedBytes.ts
var $HexEncodedBytes = {
  type: "string",
  description: `All bytes (Vec<u8>) data is represented as hex-encoded string prefixed with \`0x\` and fulfilled with
    two hex digits per byte.

    Unlike the \`Address\` type, HexEncodedBytes will not trim any zeros.
    `,
  format: "hex"
};

// src/generated/schemas/$IdentifierWrapper.ts
var $IdentifierWrapper = {
  type: "string"
};

// src/generated/schemas/$IndexResponse.ts
var $IndexResponse = {
  description: `The struct holding all data returned to the client by the
    index endpoint (i.e., GET "/").`,
  properties: {
    chain_id: {
      type: "number",
      description: `Chain ID of the current chain`,
      isRequired: true,
      format: "uint8"
    },
    epoch: {
      type: "U64",
      isRequired: true
    },
    ledger_version: {
      type: "U64",
      isRequired: true
    },
    oldest_ledger_version: {
      type: "U64",
      isRequired: true
    },
    ledger_timestamp: {
      type: "U64",
      isRequired: true
    },
    node_role: {
      type: "RoleType",
      isRequired: true
    },
    oldest_block_height: {
      type: "U64",
      isRequired: true
    },
    block_height: {
      type: "U64",
      isRequired: true
    }
  }
};

// src/generated/schemas/$ModuleBundlePayload.ts
var $ModuleBundlePayload = {
  properties: {
    modules: {
      type: "array",
      contains: {
        type: "MoveModuleBytecode"
      },
      isRequired: true
    }
  }
};

// src/generated/schemas/$MoveAbility.ts
var $MoveAbility = {
  type: "string"
};

// src/generated/schemas/$MoveFunction.ts
var $MoveFunction = {
  description: `Move function`,
  properties: {
    name: {
      type: "IdentifierWrapper",
      isRequired: true
    },
    visibility: {
      type: "MoveFunctionVisibility",
      isRequired: true
    },
    is_entry: {
      type: "boolean",
      description: `Whether the function can be called as an entry function directly in a transaction`,
      isRequired: true
    },
    generic_type_params: {
      type: "array",
      contains: {
        type: "MoveFunctionGenericTypeParam"
      },
      isRequired: true
    },
    params: {
      type: "array",
      contains: {
        type: "MoveType"
      },
      isRequired: true
    },
    return: {
      type: "array",
      contains: {
        type: "MoveType"
      },
      isRequired: true
    }
  }
};

// src/generated/schemas/$MoveFunctionGenericTypeParam.ts
var $MoveFunctionGenericTypeParam = {
  description: `Move function generic type param`,
  properties: {
    constraints: {
      type: "array",
      contains: {
        type: "MoveAbility"
      },
      isRequired: true
    }
  }
};

// src/generated/schemas/$MoveFunctionVisibility.ts
var $MoveFunctionVisibility = {
  type: "Enum"
};

// src/generated/schemas/$MoveModule.ts
var $MoveModule = {
  description: `A Move module`,
  properties: {
    address: {
      type: "Address",
      isRequired: true
    },
    name: {
      type: "IdentifierWrapper",
      isRequired: true
    },
    friends: {
      type: "array",
      contains: {
        type: "MoveModuleId"
      },
      isRequired: true
    },
    exposed_functions: {
      type: "array",
      contains: {
        type: "MoveFunction"
      },
      isRequired: true
    },
    structs: {
      type: "array",
      contains: {
        type: "MoveStruct"
      },
      isRequired: true
    }
  }
};

// src/generated/schemas/$MoveModuleBytecode.ts
var $MoveModuleBytecode = {
  description: `Move module bytecode along with it's ABI`,
  properties: {
    bytecode: {
      type: "HexEncodedBytes",
      isRequired: true
    },
    abi: {
      type: "MoveModule"
    }
  }
};

// src/generated/schemas/$MoveModuleId.ts
var $MoveModuleId = {
  type: "string",
  description: `Move module id is a string representation of Move module.

    Format: \`{address}::{module name}\`

    \`address\` should be hex-encoded 32 byte account address that is prefixed with \`0x\`.

    Module name is case-sensitive.
    `
};

// src/generated/schemas/$MoveResource.ts
var $MoveResource = {
  description: `A parsed Move resource`,
  properties: {
    type: {
      type: "MoveStructTag",
      isRequired: true
    },
    data: {
      type: "MoveStructValue",
      isRequired: true
    }
  }
};

// src/generated/schemas/$MoveScriptBytecode.ts
var $MoveScriptBytecode = {
  description: `Move script bytecode`,
  properties: {
    bytecode: {
      type: "HexEncodedBytes",
      isRequired: true
    },
    abi: {
      type: "MoveFunction"
    }
  }
};

// src/generated/schemas/$MoveStruct.ts
var $MoveStruct = {
  description: `A move struct`,
  properties: {
    name: {
      type: "IdentifierWrapper",
      isRequired: true
    },
    is_native: {
      type: "boolean",
      description: `Whether the struct is a native struct of Move`,
      isRequired: true
    },
    abilities: {
      type: "array",
      contains: {
        type: "MoveAbility"
      },
      isRequired: true
    },
    generic_type_params: {
      type: "array",
      contains: {
        type: "MoveStructGenericTypeParam"
      },
      isRequired: true
    },
    fields: {
      type: "array",
      contains: {
        type: "MoveStructField"
      },
      isRequired: true
    }
  }
};

// src/generated/schemas/$MoveStructField.ts
var $MoveStructField = {
  description: `Move struct field`,
  properties: {
    name: {
      type: "IdentifierWrapper",
      isRequired: true
    },
    type: {
      type: "MoveType",
      isRequired: true
    }
  }
};

// src/generated/schemas/$MoveStructGenericTypeParam.ts
var $MoveStructGenericTypeParam = {
  description: `Move generic type param`,
  properties: {
    constraints: {
      type: "array",
      contains: {
        type: "MoveAbility"
      },
      isRequired: true
    }
  }
};

// src/generated/schemas/$MoveStructTag.ts
var $MoveStructTag = {
  type: "string",
  description: `String representation of a MoveStructTag (on-chain Move struct type). This exists so you
    can specify MoveStructTags as path / query parameters, e.g. for get_events_by_event_handle.

    It is a combination of:
    1. \`move_module_address\`, \`module_name\` and \`struct_name\`, all joined by \`::\`
    2. \`struct generic type parameters\` joined by \`, \`

    Examples:
     * \`0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>\`
     * \`0x1::account::Account\`

    Note:
    1. Empty chars should be ignored when comparing 2 struct tag ids.
    2. When used in an URL path, should be encoded by url-encoding (AKA percent-encoding).

    See [doc](https://aptos.dev/concepts/basics-accounts) for more details.
    `,
  pattern: "^0x[0-9a-zA-Z:_<>]+$"
};

// src/generated/schemas/$MoveStructValue.ts
var $MoveStructValue = {
  description: `This is a JSON representation of some data within an account resource. More specifically,
    it is a map of strings to arbitrary JSON values / objects, where the keys are top level
    fields within the given resource.

    To clarify, you might query for 0x1::account::Account and see the example data.

    Move \`bool\` type value is serialized into \`boolean\`.

    Move \`u8\` type value is serialized into \`integer\`.

    Move \`u64\` and \`u128\` type value is serialized into \`string\`.

    Move \`address\` type value (32 byte Aptos account address) is serialized into a HexEncodedBytes string.
    For example:
    - \`0x1\`
    - \`0x1668f6be25668c1a17cd8caf6b8d2f25\`

    Move \`vector\` type value is serialized into \`array\`, except \`vector<u8>\` which is serialized into a
    HexEncodedBytes string with \`0x\` prefix.
    For example:
    - \`vector<u64>{255, 255}\` => \`["255", "255"]\`
    - \`vector<u8>{255, 255}\` => \`0xffff\`

    Move \`struct\` type value is serialized into \`object\` that looks like this (except some Move stdlib types, see the following section):
    \`\`\`json
    {
        field1_name: field1_value,
        field2_name: field2_value,
        ......
    }
    \`\`\`

    For example:
    \`{ "created": "0xa550c18", "role_id": "0" }\`

     **Special serialization for Move stdlib types**:
    - [0x1::string::String](https://github.com/aptos-labs/aptos-core/blob/main/language/move-stdlib/docs/ascii.md)
    is serialized into \`string\`. For example, struct value \`0x1::string::String{bytes: b"Hello World!"}\`
    is serialized as \`"Hello World!"\` in JSON.
    `,
  properties: {}
};

// src/generated/schemas/$MoveType.ts
var $MoveType = {
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

// src/generated/schemas/$MoveValue.ts
var $MoveValue = {
  type: "any-of",
  description: `An enum of the possible Move value types`,
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

// src/generated/schemas/$MultiAgentSignature.ts
var $MultiAgentSignature = {
  description: `Multi agent signature for multi agent transactions

    This allows you to have transactions across multiple accounts`,
  properties: {
    sender: {
      type: "AccountSignature",
      isRequired: true
    },
    secondary_signer_addresses: {
      type: "array",
      contains: {
        type: "Address"
      },
      isRequired: true
    },
    secondary_signers: {
      type: "array",
      contains: {
        type: "AccountSignature"
      },
      isRequired: true
    }
  }
};

// src/generated/schemas/$MultiEd25519Signature.ts
var $MultiEd25519Signature = {
  description: `A Ed25519 multi-sig signature

    This allows k-of-n signing for a transaction`,
  properties: {
    public_keys: {
      type: "array",
      contains: {
        type: "HexEncodedBytes"
      },
      isRequired: true
    },
    signatures: {
      type: "array",
      contains: {
        type: "HexEncodedBytes"
      },
      isRequired: true
    },
    threshold: {
      type: "number",
      description: `The number of signatures required for a successful transaction`,
      isRequired: true,
      format: "uint8"
    },
    bitmap: {
      type: "HexEncodedBytes",
      isRequired: true
    }
  }
};

// src/generated/schemas/$PendingTransaction.ts
var $PendingTransaction = {
  description: `A transaction waiting in mempool`,
  properties: {
    hash: {
      type: "HashValue",
      isRequired: true
    },
    sender: {
      type: "Address",
      isRequired: true
    },
    sequence_number: {
      type: "U64",
      isRequired: true
    },
    max_gas_amount: {
      type: "U64",
      isRequired: true
    },
    gas_unit_price: {
      type: "U64",
      isRequired: true
    },
    expiration_timestamp_secs: {
      type: "U64",
      isRequired: true
    },
    payload: {
      type: "TransactionPayload",
      isRequired: true
    },
    signature: {
      type: "TransactionSignature"
    }
  }
};

// src/generated/schemas/$RoleType.ts
var $RoleType = {
  type: "Enum"
};

// src/generated/schemas/$ScriptPayload.ts
var $ScriptPayload = {
  description: `Payload which runs a script that can run multiple functions`,
  properties: {
    code: {
      type: "MoveScriptBytecode",
      isRequired: true
    },
    type_arguments: {
      type: "array",
      contains: {
        type: "MoveType"
      },
      isRequired: true
    },
    arguments: {
      type: "array",
      contains: {
        properties: {}
      },
      isRequired: true
    }
  }
};

// src/generated/schemas/$ScriptWriteSet.ts
var $ScriptWriteSet = {
  properties: {
    execute_as: {
      type: "Address",
      isRequired: true
    },
    script: {
      type: "ScriptPayload",
      isRequired: true
    }
  }
};

// src/generated/schemas/$StateCheckpointTransaction.ts
var $StateCheckpointTransaction = {
  description: `A state checkpoint transaction`,
  properties: {
    version: {
      type: "U64",
      isRequired: true
    },
    hash: {
      type: "HashValue",
      isRequired: true
    },
    state_change_hash: {
      type: "HashValue",
      isRequired: true
    },
    event_root_hash: {
      type: "HashValue",
      isRequired: true
    },
    state_checkpoint_hash: {
      type: "HashValue"
    },
    gas_used: {
      type: "U64",
      isRequired: true
    },
    success: {
      type: "boolean",
      description: `Whether the transaction was successful`,
      isRequired: true
    },
    vm_status: {
      type: "string",
      description: `The VM status of the transaction, can tell useful information in a failure`,
      isRequired: true
    },
    accumulator_root_hash: {
      type: "HashValue",
      isRequired: true
    },
    changes: {
      type: "array",
      contains: {
        type: "WriteSetChange"
      },
      isRequired: true
    },
    timestamp: {
      type: "U64",
      isRequired: true
    }
  }
};

// src/generated/schemas/$SubmitTransactionRequest.ts
var $SubmitTransactionRequest = {
  description: `A request to submit a transaction

    This requires a transaction and a signature of it`,
  properties: {
    sender: {
      type: "Address",
      isRequired: true
    },
    sequence_number: {
      type: "U64",
      isRequired: true
    },
    max_gas_amount: {
      type: "U64",
      isRequired: true
    },
    gas_unit_price: {
      type: "U64",
      isRequired: true
    },
    expiration_timestamp_secs: {
      type: "U64",
      isRequired: true
    },
    payload: {
      type: "TransactionPayload",
      isRequired: true
    },
    signature: {
      type: "TransactionSignature",
      isRequired: true
    }
  }
};

// src/generated/schemas/$TableItemRequest.ts
var $TableItemRequest = {
  description: `Table Item request for the GetTableItem API`,
  properties: {
    key_type: {
      type: "MoveType",
      isRequired: true
    },
    value_type: {
      type: "MoveType",
      isRequired: true
    },
    key: {
      description: `The value of the table item's key`,
      properties: {},
      isRequired: true
    }
  }
};

// src/generated/schemas/$Transaction.ts
var $Transaction = {
  type: "one-of",
  description: `Enum of the different types of transactions in Aptos`,
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

// src/generated/schemas/$Transaction_BlockMetadataTransaction.ts
var $Transaction_BlockMetadataTransaction = {
  type: "all-of",
  contains: [{
    properties: {
      type: {
        type: "string",
        isRequired: true
      }
    }
  }, {
    type: "BlockMetadataTransaction"
  }]
};

// src/generated/schemas/$Transaction_GenesisTransaction.ts
var $Transaction_GenesisTransaction = {
  type: "all-of",
  contains: [{
    properties: {
      type: {
        type: "string",
        isRequired: true
      }
    }
  }, {
    type: "GenesisTransaction"
  }]
};

// src/generated/schemas/$Transaction_PendingTransaction.ts
var $Transaction_PendingTransaction = {
  type: "all-of",
  contains: [{
    properties: {
      type: {
        type: "string",
        isRequired: true
      }
    }
  }, {
    type: "PendingTransaction"
  }]
};

// src/generated/schemas/$Transaction_StateCheckpointTransaction.ts
var $Transaction_StateCheckpointTransaction = {
  type: "all-of",
  contains: [{
    properties: {
      type: {
        type: "string",
        isRequired: true
      }
    }
  }, {
    type: "StateCheckpointTransaction"
  }]
};

// src/generated/schemas/$Transaction_UserTransaction.ts
var $Transaction_UserTransaction = {
  type: "all-of",
  contains: [{
    properties: {
      type: {
        type: "string",
        isRequired: true
      }
    }
  }, {
    type: "UserTransaction"
  }]
};

// src/generated/schemas/$TransactionPayload.ts
var $TransactionPayload = {
  type: "one-of",
  description: `An enum of the possible transaction payloads`,
  contains: [{
    type: "TransactionPayload_EntryFunctionPayload"
  }, {
    type: "TransactionPayload_ScriptPayload"
  }, {
    type: "TransactionPayload_ModuleBundlePayload"
  }]
};

// src/generated/schemas/$TransactionPayload_EntryFunctionPayload.ts
var $TransactionPayload_EntryFunctionPayload = {
  type: "all-of",
  contains: [{
    properties: {
      type: {
        type: "string",
        isRequired: true
      }
    }
  }, {
    type: "EntryFunctionPayload"
  }]
};

// src/generated/schemas/$TransactionPayload_ModuleBundlePayload.ts
var $TransactionPayload_ModuleBundlePayload = {
  type: "all-of",
  contains: [{
    properties: {
      type: {
        type: "string",
        isRequired: true
      }
    }
  }, {
    type: "ModuleBundlePayload"
  }]
};

// src/generated/schemas/$TransactionPayload_ScriptPayload.ts
var $TransactionPayload_ScriptPayload = {
  type: "all-of",
  contains: [{
    properties: {
      type: {
        type: "string",
        isRequired: true
      }
    }
  }, {
    type: "ScriptPayload"
  }]
};

// src/generated/schemas/$TransactionsBatchSingleSubmissionFailure.ts
var $TransactionsBatchSingleSubmissionFailure = {
  description: `Information telling which batch submission transactions failed`,
  properties: {
    error: {
      type: "AptosError",
      isRequired: true
    },
    transaction_index: {
      type: "number",
      description: `The index of which transaction failed, same as submission order`,
      isRequired: true,
      format: "uint64"
    }
  }
};

// src/generated/schemas/$TransactionsBatchSubmissionResult.ts
var $TransactionsBatchSubmissionResult = {
  description: `Batch transaction submission result

    Tells which transactions failed`,
  properties: {
    transaction_failures: {
      type: "array",
      contains: {
        type: "TransactionsBatchSingleSubmissionFailure"
      },
      isRequired: true
    }
  }
};

// src/generated/schemas/$TransactionSignature.ts
var $TransactionSignature = {
  type: "one-of",
  description: `An enum representing the different transaction signatures available`,
  contains: [{
    type: "TransactionSignature_Ed25519Signature"
  }, {
    type: "TransactionSignature_MultiEd25519Signature"
  }, {
    type: "TransactionSignature_MultiAgentSignature"
  }]
};

// src/generated/schemas/$TransactionSignature_Ed25519Signature.ts
var $TransactionSignature_Ed25519Signature = {
  type: "all-of",
  contains: [{
    properties: {
      type: {
        type: "string",
        isRequired: true
      }
    }
  }, {
    type: "Ed25519Signature"
  }]
};

// src/generated/schemas/$TransactionSignature_MultiAgentSignature.ts
var $TransactionSignature_MultiAgentSignature = {
  type: "all-of",
  contains: [{
    properties: {
      type: {
        type: "string",
        isRequired: true
      }
    }
  }, {
    type: "MultiAgentSignature"
  }]
};

// src/generated/schemas/$TransactionSignature_MultiEd25519Signature.ts
var $TransactionSignature_MultiEd25519Signature = {
  type: "all-of",
  contains: [{
    properties: {
      type: {
        type: "string",
        isRequired: true
      }
    }
  }, {
    type: "MultiEd25519Signature"
  }]
};

// src/generated/schemas/$U128.ts
var $U128 = {
  type: "string",
  description: `A string containing a 128-bit unsigned integer.

    We represent u128 values as a string to ensure compatibility with languages such
    as JavaScript that do not parse u64s in JSON natively.
    `,
  format: "uint64"
};

// src/generated/schemas/$U64.ts
var $U64 = {
  type: "string",
  description: `A string containing a 64-bit unsigned integer.

    We represent u64 values as a string to ensure compatibility with languages such
    as JavaScript that do not parse u64s in JSON natively.
    `,
  format: "uint64"
};

// src/generated/schemas/$UserTransaction.ts
var $UserTransaction = {
  description: `A transaction submitted by a user to change the state of the blockchain`,
  properties: {
    version: {
      type: "U64",
      isRequired: true
    },
    hash: {
      type: "HashValue",
      isRequired: true
    },
    state_change_hash: {
      type: "HashValue",
      isRequired: true
    },
    event_root_hash: {
      type: "HashValue",
      isRequired: true
    },
    state_checkpoint_hash: {
      type: "HashValue"
    },
    gas_used: {
      type: "U64",
      isRequired: true
    },
    success: {
      type: "boolean",
      description: `Whether the transaction was successful`,
      isRequired: true
    },
    vm_status: {
      type: "string",
      description: `The VM status of the transaction, can tell useful information in a failure`,
      isRequired: true
    },
    accumulator_root_hash: {
      type: "HashValue",
      isRequired: true
    },
    changes: {
      type: "array",
      contains: {
        type: "WriteSetChange"
      },
      isRequired: true
    },
    sender: {
      type: "Address",
      isRequired: true
    },
    sequence_number: {
      type: "U64",
      isRequired: true
    },
    max_gas_amount: {
      type: "U64",
      isRequired: true
    },
    gas_unit_price: {
      type: "U64",
      isRequired: true
    },
    expiration_timestamp_secs: {
      type: "U64",
      isRequired: true
    },
    payload: {
      type: "TransactionPayload",
      isRequired: true
    },
    signature: {
      type: "TransactionSignature"
    },
    events: {
      type: "array",
      contains: {
        type: "Event"
      },
      isRequired: true
    },
    timestamp: {
      type: "U64",
      isRequired: true
    }
  }
};

// src/generated/schemas/$VersionedEvent.ts
var $VersionedEvent = {
  description: `An event from a transaction with a version`,
  properties: {
    version: {
      type: "U64",
      isRequired: true
    },
    key: {
      type: "EventKey",
      isRequired: true
    },
    guid: {
      type: "EventGuid",
      isRequired: true
    },
    sequence_number: {
      type: "U64",
      isRequired: true
    },
    type: {
      type: "MoveType",
      isRequired: true
    },
    data: {
      description: `The JSON representation of the event`,
      properties: {},
      isRequired: true
    }
  }
};

// src/generated/schemas/$WriteModule.ts
var $WriteModule = {
  description: `Write a new module or update an existing one`,
  properties: {
    address: {
      type: "Address",
      isRequired: true
    },
    state_key_hash: {
      type: "string",
      description: `State key hash`,
      isRequired: true
    },
    data: {
      type: "MoveModuleBytecode",
      isRequired: true
    }
  }
};

// src/generated/schemas/$WriteResource.ts
var $WriteResource = {
  description: `Write a resource or update an existing one`,
  properties: {
    address: {
      type: "Address",
      isRequired: true
    },
    state_key_hash: {
      type: "string",
      description: `State key hash`,
      isRequired: true
    },
    data: {
      type: "MoveResource",
      isRequired: true
    }
  }
};

// src/generated/schemas/$WriteSet.ts
var $WriteSet = {
  type: "one-of",
  description: `The associated writeset with a payload`,
  contains: [{
    type: "WriteSet_ScriptWriteSet"
  }, {
    type: "WriteSet_DirectWriteSet"
  }]
};

// src/generated/schemas/$WriteSet_DirectWriteSet.ts
var $WriteSet_DirectWriteSet = {
  type: "all-of",
  contains: [{
    properties: {
      type: {
        type: "string",
        isRequired: true
      }
    }
  }, {
    type: "DirectWriteSet"
  }]
};

// src/generated/schemas/$WriteSet_ScriptWriteSet.ts
var $WriteSet_ScriptWriteSet = {
  type: "all-of",
  contains: [{
    properties: {
      type: {
        type: "string",
        isRequired: true
      }
    }
  }, {
    type: "ScriptWriteSet"
  }]
};

// src/generated/schemas/$WriteSetChange.ts
var $WriteSetChange = {
  type: "one-of",
  description: `A final state change of a transaction on a resource or module`,
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

// src/generated/schemas/$WriteSetChange_DeleteModule.ts
var $WriteSetChange_DeleteModule = {
  type: "all-of",
  contains: [{
    properties: {
      type: {
        type: "string",
        isRequired: true
      }
    }
  }, {
    type: "DeleteModule"
  }]
};

// src/generated/schemas/$WriteSetChange_DeleteResource.ts
var $WriteSetChange_DeleteResource = {
  type: "all-of",
  contains: [{
    properties: {
      type: {
        type: "string",
        isRequired: true
      }
    }
  }, {
    type: "DeleteResource"
  }]
};

// src/generated/schemas/$WriteSetChange_DeleteTableItem.ts
var $WriteSetChange_DeleteTableItem = {
  type: "all-of",
  contains: [{
    properties: {
      type: {
        type: "string",
        isRequired: true
      }
    }
  }, {
    type: "DeleteTableItem"
  }]
};

// src/generated/schemas/$WriteSetChange_WriteModule.ts
var $WriteSetChange_WriteModule = {
  type: "all-of",
  contains: [{
    properties: {
      type: {
        type: "string",
        isRequired: true
      }
    }
  }, {
    type: "WriteModule"
  }]
};

// src/generated/schemas/$WriteSetChange_WriteResource.ts
var $WriteSetChange_WriteResource = {
  type: "all-of",
  contains: [{
    properties: {
      type: {
        type: "string",
        isRequired: true
      }
    }
  }, {
    type: "WriteResource"
  }]
};

// src/generated/schemas/$WriteSetChange_WriteTableItem.ts
var $WriteSetChange_WriteTableItem = {
  type: "all-of",
  contains: [{
    properties: {
      type: {
        type: "string",
        isRequired: true
      }
    }
  }, {
    type: "WriteTableItem"
  }]
};

// src/generated/schemas/$WriteSetPayload.ts
var $WriteSetPayload = {
  description: `A writeset payload, used only for genesis`,
  properties: {
    write_set: {
      type: "WriteSet",
      isRequired: true
    }
  }
};

// src/generated/schemas/$WriteTableItem.ts
var $WriteTableItem = {
  description: `Change set to write a table item`,
  properties: {
    state_key_hash: {
      type: "string",
      isRequired: true
    },
    handle: {
      type: "HexEncodedBytes",
      isRequired: true
    },
    key: {
      type: "HexEncodedBytes",
      isRequired: true
    },
    value: {
      type: "HexEncodedBytes",
      isRequired: true
    },
    data: {
      type: "DecodedTableData"
    }
  }
};

// src/transaction_builder/builder.ts
var import_sha34 = require("@noble/hashes/sha3");

// src/aptos_types/index.ts
var aptos_types_exports = {};
__export(aptos_types_exports, {
  AccountAddress: () => AccountAddress,
  AccountAuthenticator: () => AccountAuthenticator,
  AccountAuthenticatorEd25519: () => AccountAuthenticatorEd25519,
  AccountAuthenticatorMultiEd25519: () => AccountAuthenticatorMultiEd25519,
  AuthenticationKey: () => AuthenticationKey,
  ChainId: () => ChainId,
  ChangeSet: () => ChangeSet,
  Ed25519PublicKey: () => Ed25519PublicKey,
  Ed25519Signature: () => Ed25519Signature,
  EntryFunction: () => EntryFunction,
  Identifier: () => Identifier,
  Module: () => Module,
  ModuleId: () => ModuleId,
  MultiAgentRawTransaction: () => MultiAgentRawTransaction,
  MultiEd25519PublicKey: () => MultiEd25519PublicKey,
  MultiEd25519Signature: () => MultiEd25519Signature,
  RawTransaction: () => RawTransaction,
  RawTransactionWithData: () => RawTransactionWithData,
  RotationProofChallenge: () => RotationProofChallenge,
  Script: () => Script,
  SignedTransaction: () => SignedTransaction,
  StructTag: () => StructTag,
  Transaction: () => Transaction,
  TransactionArgument: () => TransactionArgument,
  TransactionArgumentAddress: () => TransactionArgumentAddress,
  TransactionArgumentBool: () => TransactionArgumentBool,
  TransactionArgumentU128: () => TransactionArgumentU128,
  TransactionArgumentU64: () => TransactionArgumentU64,
  TransactionArgumentU8: () => TransactionArgumentU8,
  TransactionArgumentU8Vector: () => TransactionArgumentU8Vector,
  TransactionAuthenticator: () => TransactionAuthenticator,
  TransactionAuthenticatorEd25519: () => TransactionAuthenticatorEd25519,
  TransactionAuthenticatorMultiAgent: () => TransactionAuthenticatorMultiAgent,
  TransactionAuthenticatorMultiEd25519: () => TransactionAuthenticatorMultiEd25519,
  TransactionPayload: () => TransactionPayload,
  TransactionPayloadEntryFunction: () => TransactionPayloadEntryFunction,
  TransactionPayloadScript: () => TransactionPayloadScript,
  TypeTag: () => TypeTag,
  TypeTagAddress: () => TypeTagAddress,
  TypeTagBool: () => TypeTagBool,
  TypeTagSigner: () => TypeTagSigner,
  TypeTagStruct: () => TypeTagStruct,
  TypeTagU128: () => TypeTagU128,
  TypeTagU64: () => TypeTagU64,
  TypeTagU8: () => TypeTagU8,
  TypeTagVector: () => TypeTagVector,
  UserTransaction: () => UserTransaction,
  WriteSet: () => WriteSet
});

// src/aptos_types/account_address.ts
var _AccountAddress = class {
  constructor(address) {
    if (address.length !== _AccountAddress.LENGTH) {
      throw new Error("Expected address of length 32");
    }
    this.address = address;
  }
  static fromHex(addr) {
    let address = HexString.ensure(addr);
    if (address.noPrefix().length % 2 !== 0) {
      address = new HexString(`0${address.noPrefix()}`);
    }
    const addressBytes = address.toUint8Array();
    if (addressBytes.length > _AccountAddress.LENGTH) {
      throw new Error("Hex string is too long. Address's length is 32 bytes.");
    } else if (addressBytes.length === _AccountAddress.LENGTH) {
      return new _AccountAddress(addressBytes);
    }
    const res = new Uint8Array(_AccountAddress.LENGTH);
    res.set(addressBytes, _AccountAddress.LENGTH - addressBytes.length);
    return new _AccountAddress(res);
  }
  serialize(serializer) {
    serializer.serializeFixedBytes(this.address);
  }
  static deserialize(deserializer) {
    return new _AccountAddress(deserializer.deserializeFixedBytes(_AccountAddress.LENGTH));
  }
};
var AccountAddress = _AccountAddress;
AccountAddress.LENGTH = 32;
AccountAddress.CORE_CODE_ADDRESS = _AccountAddress.fromHex("0x1");

// src/bcs/index.ts
var bcs_exports = {};
__export(bcs_exports, {
  Deserializer: () => Deserializer,
  Serializer: () => Serializer,
  bcsSerializeBool: () => bcsSerializeBool,
  bcsSerializeBytes: () => bcsSerializeBytes,
  bcsSerializeFixedBytes: () => bcsSerializeFixedBytes,
  bcsSerializeStr: () => bcsSerializeStr,
  bcsSerializeU128: () => bcsSerializeU128,
  bcsSerializeU16: () => bcsSerializeU16,
  bcsSerializeU32: () => bcsSerializeU32,
  bcsSerializeU8: () => bcsSerializeU8,
  bcsSerializeUint64: () => bcsSerializeUint64,
  bcsToBytes: () => bcsToBytes,
  deserializeVector: () => deserializeVector,
  serializeVector: () => serializeVector,
  serializeVectorWithFunc: () => serializeVectorWithFunc
});

// src/bcs/consts.ts
var MAX_U8_NUMBER = 2 ** 8 - 1;
var MAX_U16_NUMBER = 2 ** 16 - 1;
var MAX_U32_NUMBER = 2 ** 32 - 1;
var MAX_U64_BIG_INT = BigInt(2 ** 64) - BigInt(1);
var MAX_U128_BIG_INT = BigInt(2 ** 128) - BigInt(1);

// src/bcs/serializer.ts
var Serializer = class {
  constructor() {
    this.buffer = new ArrayBuffer(64);
    this.offset = 0;
  }
  ensureBufferWillHandleSize(bytes) {
    while (this.buffer.byteLength < this.offset + bytes) {
      const newBuffer = new ArrayBuffer(this.buffer.byteLength * 2);
      new Uint8Array(newBuffer).set(new Uint8Array(this.buffer));
      this.buffer = newBuffer;
    }
  }
  serialize(values) {
    this.ensureBufferWillHandleSize(values.length);
    new Uint8Array(this.buffer, this.offset).set(values);
    this.offset += values.length;
  }
  serializeWithFunction(fn, bytesLength, value) {
    this.ensureBufferWillHandleSize(bytesLength);
    const dv = new DataView(this.buffer, this.offset);
    fn.apply(dv, [0, value, true]);
    this.offset += bytesLength;
  }
  serializeStr(value) {
    const textEncoder = new TextEncoder();
    this.serializeBytes(textEncoder.encode(value));
  }
  serializeBytes(value) {
    this.serializeU32AsUleb128(value.length);
    this.serialize(value);
  }
  serializeFixedBytes(value) {
    this.serialize(value);
  }
  serializeBool(value) {
    if (typeof value !== "boolean") {
      throw new Error("Value needs to be a boolean");
    }
    const byteValue = value ? 1 : 0;
    this.serialize(new Uint8Array([byteValue]));
  }
  serializeU8(value) {
    this.serialize(new Uint8Array([value]));
  }
  serializeU16(value) {
    this.serializeWithFunction(DataView.prototype.setUint16, 2, value);
  }
  serializeU32(value) {
    this.serializeWithFunction(DataView.prototype.setUint32, 4, value);
  }
  serializeU64(value) {
    const low = BigInt(value.toString()) & BigInt(MAX_U32_NUMBER);
    const high = BigInt(value.toString()) >> BigInt(32);
    this.serializeU32(Number(low));
    this.serializeU32(Number(high));
  }
  serializeU128(value) {
    const low = BigInt(value.toString()) & MAX_U64_BIG_INT;
    const high = BigInt(value.toString()) >> BigInt(64);
    this.serializeU64(low);
    this.serializeU64(high);
  }
  serializeU32AsUleb128(val) {
    let value = val;
    const valueArray = [];
    while (value >>> 7 !== 0) {
      valueArray.push(value & 127 | 128);
      value >>>= 7;
    }
    valueArray.push(value);
    this.serialize(new Uint8Array(valueArray));
  }
  getBytes() {
    return new Uint8Array(this.buffer).slice(0, this.offset);
  }
};
__decorateClass([
  checkNumberRange(0, MAX_U8_NUMBER)
], Serializer.prototype, "serializeU8", 1);
__decorateClass([
  checkNumberRange(0, MAX_U16_NUMBER)
], Serializer.prototype, "serializeU16", 1);
__decorateClass([
  checkNumberRange(0, MAX_U32_NUMBER)
], Serializer.prototype, "serializeU32", 1);
__decorateClass([
  checkNumberRange(BigInt(0), MAX_U64_BIG_INT)
], Serializer.prototype, "serializeU64", 1);
__decorateClass([
  checkNumberRange(BigInt(0), MAX_U128_BIG_INT)
], Serializer.prototype, "serializeU128", 1);
__decorateClass([
  checkNumberRange(0, MAX_U32_NUMBER)
], Serializer.prototype, "serializeU32AsUleb128", 1);
function checkNumberRange(minValue, maxValue, message) {
  return (target, propertyKey, descriptor) => {
    const childFunction = descriptor.value;
    descriptor.value = function deco(value) {
      const valueBigInt = BigInt(value.toString());
      if (valueBigInt > BigInt(maxValue.toString()) || valueBigInt < BigInt(minValue.toString())) {
        throw new Error(message || "Value is out of range");
      }
      childFunction.apply(this, [value]);
    };
    return descriptor;
  };
}

// src/bcs/deserializer.ts
var Deserializer = class {
  constructor(data) {
    this.buffer = new ArrayBuffer(data.length);
    new Uint8Array(this.buffer).set(data, 0);
    this.offset = 0;
  }
  read(length) {
    if (this.offset + length > this.buffer.byteLength) {
      throw new Error("Reached to the end of buffer");
    }
    const bytes = this.buffer.slice(this.offset, this.offset + length);
    this.offset += length;
    return bytes;
  }
  deserializeStr() {
    const value = this.deserializeBytes();
    const textDecoder = new TextDecoder();
    return textDecoder.decode(value);
  }
  deserializeBytes() {
    const len = this.deserializeUleb128AsU32();
    return new Uint8Array(this.read(len));
  }
  deserializeFixedBytes(len) {
    return new Uint8Array(this.read(len));
  }
  deserializeBool() {
    const bool = new Uint8Array(this.read(1))[0];
    if (bool !== 1 && bool !== 0) {
      throw new Error("Invalid boolean value");
    }
    return bool === 1;
  }
  deserializeU8() {
    return new DataView(this.read(1)).getUint8(0);
  }
  deserializeU16() {
    return new DataView(this.read(2)).getUint16(0, true);
  }
  deserializeU32() {
    return new DataView(this.read(4)).getUint32(0, true);
  }
  deserializeU64() {
    const low = this.deserializeU32();
    const high = this.deserializeU32();
    return BigInt(BigInt(high) << BigInt(32) | BigInt(low));
  }
  deserializeU128() {
    const low = this.deserializeU64();
    const high = this.deserializeU64();
    return BigInt(high << BigInt(64) | low);
  }
  deserializeUleb128AsU32() {
    let value = BigInt(0);
    let shift = 0;
    while (value < MAX_U32_NUMBER) {
      const byte = this.deserializeU8();
      value |= BigInt(byte & 127) << BigInt(shift);
      if ((byte & 128) === 0) {
        break;
      }
      shift += 7;
    }
    if (value > MAX_U32_NUMBER) {
      throw new Error("Overflow while parsing uleb128-encoded uint32 value");
    }
    return Number(value);
  }
};

// src/bcs/helper.ts
function serializeVector(value, serializer) {
  serializer.serializeU32AsUleb128(value.length);
  value.forEach((item) => {
    item.serialize(serializer);
  });
}
function serializeVectorWithFunc(value, func) {
  const serializer = new Serializer();
  serializer.serializeU32AsUleb128(value.length);
  const f = serializer[func];
  value.forEach((item) => {
    f.call(serializer, item);
  });
  return serializer.getBytes();
}
function deserializeVector(deserializer, cls) {
  const length = deserializer.deserializeUleb128AsU32();
  const list = [];
  for (let i = 0; i < length; i += 1) {
    list.push(cls.deserialize(deserializer));
  }
  return list;
}
function bcsToBytes(value) {
  const serializer = new Serializer();
  value.serialize(serializer);
  return serializer.getBytes();
}
function bcsSerializeUint64(value) {
  const serializer = new Serializer();
  serializer.serializeU64(value);
  return serializer.getBytes();
}
function bcsSerializeU8(value) {
  const serializer = new Serializer();
  serializer.serializeU8(value);
  return serializer.getBytes();
}
function bcsSerializeU16(value) {
  const serializer = new Serializer();
  serializer.serializeU16(value);
  return serializer.getBytes();
}
function bcsSerializeU32(value) {
  const serializer = new Serializer();
  serializer.serializeU32(value);
  return serializer.getBytes();
}
function bcsSerializeU128(value) {
  const serializer = new Serializer();
  serializer.serializeU128(value);
  return serializer.getBytes();
}
function bcsSerializeBool(value) {
  const serializer = new Serializer();
  serializer.serializeBool(value);
  return serializer.getBytes();
}
function bcsSerializeStr(value) {
  const serializer = new Serializer();
  serializer.serializeStr(value);
  return serializer.getBytes();
}
function bcsSerializeBytes(value) {
  const serializer = new Serializer();
  serializer.serializeBytes(value);
  return serializer.getBytes();
}
function bcsSerializeFixedBytes(value) {
  const serializer = new Serializer();
  serializer.serializeFixedBytes(value);
  return serializer.getBytes();
}

// src/aptos_types/ed25519.ts
var _Ed25519PublicKey = class {
  constructor(value) {
    if (value.length !== _Ed25519PublicKey.LENGTH) {
      throw new Error(`Ed25519PublicKey length should be ${_Ed25519PublicKey.LENGTH}`);
    }
    this.value = value;
  }
  serialize(serializer) {
    serializer.serializeBytes(this.value);
  }
  static deserialize(deserializer) {
    const value = deserializer.deserializeBytes();
    return new _Ed25519PublicKey(value);
  }
};
var Ed25519PublicKey = _Ed25519PublicKey;
Ed25519PublicKey.LENGTH = 32;
var _Ed25519Signature = class {
  constructor(value) {
    this.value = value;
    if (value.length !== _Ed25519Signature.LENGTH) {
      throw new Error(`Ed25519Signature length should be ${_Ed25519Signature.LENGTH}`);
    }
  }
  serialize(serializer) {
    serializer.serializeBytes(this.value);
  }
  static deserialize(deserializer) {
    const value = deserializer.deserializeBytes();
    return new _Ed25519Signature(value);
  }
};
var Ed25519Signature = _Ed25519Signature;
Ed25519Signature.LENGTH = 64;

// src/aptos_types/multi_ed25519.ts
var MAX_SIGNATURES_SUPPORTED = 32;
var MultiEd25519PublicKey = class {
  constructor(public_keys, threshold) {
    this.public_keys = public_keys;
    this.threshold = threshold;
    if (threshold > MAX_SIGNATURES_SUPPORTED) {
      throw new Error(`"threshold" cannot be larger than ${MAX_SIGNATURES_SUPPORTED}`);
    }
  }
  toBytes() {
    const bytes = new Uint8Array(this.public_keys.length * Ed25519PublicKey.LENGTH + 1);
    this.public_keys.forEach((k, i) => {
      bytes.set(k.value, i * Ed25519PublicKey.LENGTH);
    });
    bytes[this.public_keys.length * Ed25519PublicKey.LENGTH] = this.threshold;
    return bytes;
  }
  serialize(serializer) {
    serializer.serializeBytes(this.toBytes());
  }
  static deserialize(deserializer) {
    const bytes = deserializer.deserializeBytes();
    const threshold = bytes[bytes.length - 1];
    const keys = [];
    for (let i = 0; i < bytes.length - 1; i += Ed25519PublicKey.LENGTH) {
      const begin = i;
      keys.push(new Ed25519PublicKey(bytes.subarray(begin, begin + Ed25519PublicKey.LENGTH)));
    }
    return new MultiEd25519PublicKey(keys, threshold);
  }
};
var _MultiEd25519Signature = class {
  constructor(signatures, bitmap) {
    this.signatures = signatures;
    this.bitmap = bitmap;
    if (bitmap.length !== _MultiEd25519Signature.BITMAP_LEN) {
      throw new Error(`"bitmap" length should be ${_MultiEd25519Signature.BITMAP_LEN}`);
    }
  }
  toBytes() {
    const bytes = new Uint8Array(this.signatures.length * Ed25519Signature.LENGTH + _MultiEd25519Signature.BITMAP_LEN);
    this.signatures.forEach((k, i) => {
      bytes.set(k.value, i * Ed25519Signature.LENGTH);
    });
    bytes.set(this.bitmap, this.signatures.length * Ed25519Signature.LENGTH);
    return bytes;
  }
  static createBitmap(bits) {
    const firstBitInByte = 128;
    const bitmap = new Uint8Array([0, 0, 0, 0]);
    const dupCheckSet = /* @__PURE__ */ new Set();
    bits.forEach((bit) => {
      if (bit >= MAX_SIGNATURES_SUPPORTED) {
        throw new Error(`Invalid bit value ${bit}.`);
      }
      if (dupCheckSet.has(bit)) {
        throw new Error("Duplicated bits detected.");
      }
      dupCheckSet.add(bit);
      const byteOffset = Math.floor(bit / 8);
      let byte = bitmap[byteOffset];
      byte |= firstBitInByte >> bit % 8;
      bitmap[byteOffset] = byte;
    });
    return bitmap;
  }
  serialize(serializer) {
    serializer.serializeBytes(this.toBytes());
  }
  static deserialize(deserializer) {
    const bytes = deserializer.deserializeBytes();
    const bitmap = bytes.subarray(bytes.length - 4);
    const sigs = [];
    for (let i = 0; i < bytes.length - bitmap.length; i += Ed25519Signature.LENGTH) {
      const begin = i;
      sigs.push(new Ed25519Signature(bytes.subarray(begin, begin + Ed25519Signature.LENGTH)));
    }
    return new _MultiEd25519Signature(sigs, bitmap);
  }
};
var MultiEd25519Signature = _MultiEd25519Signature;
MultiEd25519Signature.BITMAP_LEN = 4;

// src/aptos_types/authenticator.ts
var TransactionAuthenticator = class {
  static deserialize(deserializer) {
    const index = deserializer.deserializeUleb128AsU32();
    switch (index) {
      case 0:
        return TransactionAuthenticatorEd25519.load(deserializer);
      case 1:
        return TransactionAuthenticatorMultiEd25519.load(deserializer);
      case 2:
        return TransactionAuthenticatorMultiAgent.load(deserializer);
      default:
        throw new Error(`Unknown variant index for TransactionAuthenticator: ${index}`);
    }
  }
};
var TransactionAuthenticatorEd25519 = class extends TransactionAuthenticator {
  constructor(public_key, signature) {
    super();
    this.public_key = public_key;
    this.signature = signature;
  }
  serialize(serializer) {
    serializer.serializeU32AsUleb128(0);
    this.public_key.serialize(serializer);
    this.signature.serialize(serializer);
  }
  static load(deserializer) {
    const public_key = Ed25519PublicKey.deserialize(deserializer);
    const signature = Ed25519Signature.deserialize(deserializer);
    return new TransactionAuthenticatorEd25519(public_key, signature);
  }
};
var TransactionAuthenticatorMultiEd25519 = class extends TransactionAuthenticator {
  constructor(public_key, signature) {
    super();
    this.public_key = public_key;
    this.signature = signature;
  }
  serialize(serializer) {
    serializer.serializeU32AsUleb128(1);
    this.public_key.serialize(serializer);
    this.signature.serialize(serializer);
  }
  static load(deserializer) {
    const public_key = MultiEd25519PublicKey.deserialize(deserializer);
    const signature = MultiEd25519Signature.deserialize(deserializer);
    return new TransactionAuthenticatorMultiEd25519(public_key, signature);
  }
};
var TransactionAuthenticatorMultiAgent = class extends TransactionAuthenticator {
  constructor(sender, secondary_signer_addresses, secondary_signers) {
    super();
    this.sender = sender;
    this.secondary_signer_addresses = secondary_signer_addresses;
    this.secondary_signers = secondary_signers;
  }
  serialize(serializer) {
    serializer.serializeU32AsUleb128(2);
    this.sender.serialize(serializer);
    serializeVector(this.secondary_signer_addresses, serializer);
    serializeVector(this.secondary_signers, serializer);
  }
  static load(deserializer) {
    const sender = AccountAuthenticator.deserialize(deserializer);
    const secondary_signer_addresses = deserializeVector(deserializer, AccountAddress);
    const secondary_signers = deserializeVector(deserializer, AccountAuthenticator);
    return new TransactionAuthenticatorMultiAgent(sender, secondary_signer_addresses, secondary_signers);
  }
};
var AccountAuthenticator = class {
  static deserialize(deserializer) {
    const index = deserializer.deserializeUleb128AsU32();
    switch (index) {
      case 0:
        return AccountAuthenticatorEd25519.load(deserializer);
      case 1:
        return AccountAuthenticatorMultiEd25519.load(deserializer);
      default:
        throw new Error(`Unknown variant index for AccountAuthenticator: ${index}`);
    }
  }
};
var AccountAuthenticatorEd25519 = class extends AccountAuthenticator {
  constructor(public_key, signature) {
    super();
    this.public_key = public_key;
    this.signature = signature;
  }
  serialize(serializer) {
    serializer.serializeU32AsUleb128(0);
    this.public_key.serialize(serializer);
    this.signature.serialize(serializer);
  }
  static load(deserializer) {
    const public_key = Ed25519PublicKey.deserialize(deserializer);
    const signature = Ed25519Signature.deserialize(deserializer);
    return new AccountAuthenticatorEd25519(public_key, signature);
  }
};
var AccountAuthenticatorMultiEd25519 = class extends AccountAuthenticator {
  constructor(public_key, signature) {
    super();
    this.public_key = public_key;
    this.signature = signature;
  }
  serialize(serializer) {
    serializer.serializeU32AsUleb128(1);
    this.public_key.serialize(serializer);
    this.signature.serialize(serializer);
  }
  static load(deserializer) {
    const public_key = MultiEd25519PublicKey.deserialize(deserializer);
    const signature = MultiEd25519Signature.deserialize(deserializer);
    return new AccountAuthenticatorMultiEd25519(public_key, signature);
  }
};

// src/aptos_types/transaction.ts
var import_sha32 = require("@noble/hashes/sha3");

// src/aptos_types/identifier.ts
var Identifier = class {
  constructor(value) {
    this.value = value;
  }
  serialize(serializer) {
    serializer.serializeStr(this.value);
  }
  static deserialize(deserializer) {
    const value = deserializer.deserializeStr();
    return new Identifier(value);
  }
};

// src/aptos_types/type_tag.ts
var TypeTag = class {
  static deserialize(deserializer) {
    const index = deserializer.deserializeUleb128AsU32();
    switch (index) {
      case 0:
        return TypeTagBool.load(deserializer);
      case 1:
        return TypeTagU8.load(deserializer);
      case 2:
        return TypeTagU64.load(deserializer);
      case 3:
        return TypeTagU128.load(deserializer);
      case 4:
        return TypeTagAddress.load(deserializer);
      case 5:
        return TypeTagSigner.load(deserializer);
      case 6:
        return TypeTagVector.load(deserializer);
      case 7:
        return TypeTagStruct.load(deserializer);
      default:
        throw new Error(`Unknown variant index for TypeTag: ${index}`);
    }
  }
};
var TypeTagBool = class extends TypeTag {
  serialize(serializer) {
    serializer.serializeU32AsUleb128(0);
  }
  static load(deserializer) {
    return new TypeTagBool();
  }
};
var TypeTagU8 = class extends TypeTag {
  serialize(serializer) {
    serializer.serializeU32AsUleb128(1);
  }
  static load(_deserializer) {
    return new TypeTagU8();
  }
};
var TypeTagU64 = class extends TypeTag {
  serialize(serializer) {
    serializer.serializeU32AsUleb128(2);
  }
  static load(_deserializer) {
    return new TypeTagU64();
  }
};
var TypeTagU128 = class extends TypeTag {
  serialize(serializer) {
    serializer.serializeU32AsUleb128(3);
  }
  static load(_deserializer) {
    return new TypeTagU128();
  }
};
var TypeTagAddress = class extends TypeTag {
  serialize(serializer) {
    serializer.serializeU32AsUleb128(4);
  }
  static load(_deserializer) {
    return new TypeTagAddress();
  }
};
var TypeTagSigner = class extends TypeTag {
  serialize(serializer) {
    serializer.serializeU32AsUleb128(5);
  }
  static load(_deserializer) {
    return new TypeTagSigner();
  }
};
var TypeTagVector = class extends TypeTag {
  constructor(value) {
    super();
    this.value = value;
  }
  serialize(serializer) {
    serializer.serializeU32AsUleb128(6);
    this.value.serialize(serializer);
  }
  static load(deserializer) {
    const value = TypeTag.deserialize(deserializer);
    return new TypeTagVector(value);
  }
};
var TypeTagStruct = class extends TypeTag {
  constructor(value) {
    super();
    this.value = value;
  }
  serialize(serializer) {
    serializer.serializeU32AsUleb128(7);
    this.value.serialize(serializer);
  }
  static load(deserializer) {
    const value = StructTag.deserialize(deserializer);
    return new TypeTagStruct(value);
  }
};
var StructTag = class {
  constructor(address, module_name, name, type_args) {
    this.address = address;
    this.module_name = module_name;
    this.name = name;
    this.type_args = type_args;
  }
  static fromString(structTag) {
    if (structTag.includes("<")) {
      throw new Error("Not implemented");
    }
    const parts = structTag.split("::");
    if (parts.length !== 3) {
      throw new Error("Invalid struct tag string literal.");
    }
    return new StructTag(AccountAddress.fromHex(parts[0]), new Identifier(parts[1]), new Identifier(parts[2]), []);
  }
  serialize(serializer) {
    this.address.serialize(serializer);
    this.module_name.serialize(serializer);
    this.name.serialize(serializer);
    serializeVector(this.type_args, serializer);
  }
  static deserialize(deserializer) {
    const address = AccountAddress.deserialize(deserializer);
    const moduleName = Identifier.deserialize(deserializer);
    const name = Identifier.deserialize(deserializer);
    const typeArgs = deserializeVector(deserializer, TypeTag);
    return new StructTag(address, moduleName, name, typeArgs);
  }
};

// src/aptos_types/transaction.ts
var RawTransaction = class {
  constructor(sender, sequence_number, payload, max_gas_amount, gas_unit_price, expiration_timestamp_secs, chain_id) {
    this.sender = sender;
    this.sequence_number = sequence_number;
    this.payload = payload;
    this.max_gas_amount = max_gas_amount;
    this.gas_unit_price = gas_unit_price;
    this.expiration_timestamp_secs = expiration_timestamp_secs;
    this.chain_id = chain_id;
  }
  serialize(serializer) {
    this.sender.serialize(serializer);
    serializer.serializeU64(this.sequence_number);
    this.payload.serialize(serializer);
    serializer.serializeU64(this.max_gas_amount);
    serializer.serializeU64(this.gas_unit_price);
    serializer.serializeU64(this.expiration_timestamp_secs);
    this.chain_id.serialize(serializer);
  }
  static deserialize(deserializer) {
    const sender = AccountAddress.deserialize(deserializer);
    const sequence_number = deserializer.deserializeU64();
    const payload = TransactionPayload.deserialize(deserializer);
    const max_gas_amount = deserializer.deserializeU64();
    const gas_unit_price = deserializer.deserializeU64();
    const expiration_timestamp_secs = deserializer.deserializeU64();
    const chain_id = ChainId.deserialize(deserializer);
    return new RawTransaction(
      sender,
      sequence_number,
      payload,
      max_gas_amount,
      gas_unit_price,
      expiration_timestamp_secs,
      chain_id
    );
  }
};
var Script = class {
  constructor(code, ty_args, args) {
    this.code = code;
    this.ty_args = ty_args;
    this.args = args;
  }
  serialize(serializer) {
    serializer.serializeBytes(this.code);
    serializeVector(this.ty_args, serializer);
    serializeVector(this.args, serializer);
  }
  static deserialize(deserializer) {
    const code = deserializer.deserializeBytes();
    const ty_args = deserializeVector(deserializer, TypeTag);
    const args = deserializeVector(deserializer, TransactionArgument);
    return new Script(code, ty_args, args);
  }
};
var EntryFunction = class {
  constructor(module_name, function_name, ty_args, args) {
    this.module_name = module_name;
    this.function_name = function_name;
    this.ty_args = ty_args;
    this.args = args;
  }
  static natural(module2, func, ty_args, args) {
    return new EntryFunction(ModuleId.fromStr(module2), new Identifier(func), ty_args, args);
  }
  static natual(module2, func, ty_args, args) {
    return EntryFunction.natural(module2, func, ty_args, args);
  }
  serialize(serializer) {
    this.module_name.serialize(serializer);
    this.function_name.serialize(serializer);
    serializeVector(this.ty_args, serializer);
    serializer.serializeU32AsUleb128(this.args.length);
    this.args.forEach((item) => {
      serializer.serializeBytes(item);
    });
  }
  static deserialize(deserializer) {
    const module_name = ModuleId.deserialize(deserializer);
    const function_name = Identifier.deserialize(deserializer);
    const ty_args = deserializeVector(deserializer, TypeTag);
    const length = deserializer.deserializeUleb128AsU32();
    const list = [];
    for (let i = 0; i < length; i += 1) {
      list.push(deserializer.deserializeBytes());
    }
    const args = list;
    return new EntryFunction(module_name, function_name, ty_args, args);
  }
};
var Module = class {
  constructor(code) {
    this.code = code;
  }
  serialize(serializer) {
    serializer.serializeBytes(this.code);
  }
  static deserialize(deserializer) {
    const code = deserializer.deserializeBytes();
    return new Module(code);
  }
};
var ModuleId = class {
  constructor(address, name) {
    this.address = address;
    this.name = name;
  }
  static fromStr(moduleId) {
    const parts = moduleId.split("::");
    if (parts.length !== 2) {
      throw new Error("Invalid module id.");
    }
    return new ModuleId(AccountAddress.fromHex(new HexString(parts[0])), new Identifier(parts[1]));
  }
  serialize(serializer) {
    this.address.serialize(serializer);
    this.name.serialize(serializer);
  }
  static deserialize(deserializer) {
    const address = AccountAddress.deserialize(deserializer);
    const name = Identifier.deserialize(deserializer);
    return new ModuleId(address, name);
  }
};
var ChangeSet = class {
  serialize(serializer) {
    throw new Error("Not implemented.");
  }
  static deserialize(deserializer) {
    throw new Error("Not implemented.");
  }
};
var WriteSet = class {
  serialize(serializer) {
    throw new Error("Not implmented.");
  }
  static deserialize(deserializer) {
    throw new Error("Not implmented.");
  }
};
var SignedTransaction = class {
  constructor(raw_txn, authenticator) {
    this.raw_txn = raw_txn;
    this.authenticator = authenticator;
  }
  serialize(serializer) {
    this.raw_txn.serialize(serializer);
    this.authenticator.serialize(serializer);
  }
  static deserialize(deserializer) {
    const raw_txn = RawTransaction.deserialize(deserializer);
    const authenticator = TransactionAuthenticator.deserialize(deserializer);
    return new SignedTransaction(raw_txn, authenticator);
  }
};
var RawTransactionWithData = class {
  static deserialize(deserializer) {
    const index = deserializer.deserializeUleb128AsU32();
    switch (index) {
      case 0:
        return MultiAgentRawTransaction.load(deserializer);
      default:
        throw new Error(`Unknown variant index for RawTransactionWithData: ${index}`);
    }
  }
};
var MultiAgentRawTransaction = class extends RawTransactionWithData {
  constructor(raw_txn, secondary_signer_addresses) {
    super();
    this.raw_txn = raw_txn;
    this.secondary_signer_addresses = secondary_signer_addresses;
  }
  serialize(serializer) {
    serializer.serializeU32AsUleb128(0);
    this.raw_txn.serialize(serializer);
    serializeVector(this.secondary_signer_addresses, serializer);
  }
  static load(deserializer) {
    const rawTxn = RawTransaction.deserialize(deserializer);
    const secondarySignerAddresses = deserializeVector(deserializer, AccountAddress);
    return new MultiAgentRawTransaction(rawTxn, secondarySignerAddresses);
  }
};
var TransactionPayload = class {
  static deserialize(deserializer) {
    const index = deserializer.deserializeUleb128AsU32();
    switch (index) {
      case 0:
        return TransactionPayloadScript.load(deserializer);
      case 2:
        return TransactionPayloadEntryFunction.load(deserializer);
      default:
        throw new Error(`Unknown variant index for TransactionPayload: ${index}`);
    }
  }
};
var TransactionPayloadScript = class extends TransactionPayload {
  constructor(value) {
    super();
    this.value = value;
  }
  serialize(serializer) {
    serializer.serializeU32AsUleb128(0);
    this.value.serialize(serializer);
  }
  static load(deserializer) {
    const value = Script.deserialize(deserializer);
    return new TransactionPayloadScript(value);
  }
};
var TransactionPayloadEntryFunction = class extends TransactionPayload {
  constructor(value) {
    super();
    this.value = value;
  }
  serialize(serializer) {
    serializer.serializeU32AsUleb128(2);
    this.value.serialize(serializer);
  }
  static load(deserializer) {
    const value = EntryFunction.deserialize(deserializer);
    return new TransactionPayloadEntryFunction(value);
  }
};
var ChainId = class {
  constructor(value) {
    this.value = value;
  }
  serialize(serializer) {
    serializer.serializeU8(this.value);
  }
  static deserialize(deserializer) {
    const value = deserializer.deserializeU8();
    return new ChainId(value);
  }
};
var TransactionArgument = class {
  static deserialize(deserializer) {
    const index = deserializer.deserializeUleb128AsU32();
    switch (index) {
      case 0:
        return TransactionArgumentU8.load(deserializer);
      case 1:
        return TransactionArgumentU64.load(deserializer);
      case 2:
        return TransactionArgumentU128.load(deserializer);
      case 3:
        return TransactionArgumentAddress.load(deserializer);
      case 4:
        return TransactionArgumentU8Vector.load(deserializer);
      case 5:
        return TransactionArgumentBool.load(deserializer);
      default:
        throw new Error(`Unknown variant index for TransactionArgument: ${index}`);
    }
  }
};
var TransactionArgumentU8 = class extends TransactionArgument {
  constructor(value) {
    super();
    this.value = value;
  }
  serialize(serializer) {
    serializer.serializeU32AsUleb128(0);
    serializer.serializeU8(this.value);
  }
  static load(deserializer) {
    const value = deserializer.deserializeU8();
    return new TransactionArgumentU8(value);
  }
};
var TransactionArgumentU64 = class extends TransactionArgument {
  constructor(value) {
    super();
    this.value = value;
  }
  serialize(serializer) {
    serializer.serializeU32AsUleb128(1);
    serializer.serializeU64(this.value);
  }
  static load(deserializer) {
    const value = deserializer.deserializeU64();
    return new TransactionArgumentU64(value);
  }
};
var TransactionArgumentU128 = class extends TransactionArgument {
  constructor(value) {
    super();
    this.value = value;
  }
  serialize(serializer) {
    serializer.serializeU32AsUleb128(2);
    serializer.serializeU128(this.value);
  }
  static load(deserializer) {
    const value = deserializer.deserializeU128();
    return new TransactionArgumentU128(value);
  }
};
var TransactionArgumentAddress = class extends TransactionArgument {
  constructor(value) {
    super();
    this.value = value;
  }
  serialize(serializer) {
    serializer.serializeU32AsUleb128(3);
    this.value.serialize(serializer);
  }
  static load(deserializer) {
    const value = AccountAddress.deserialize(deserializer);
    return new TransactionArgumentAddress(value);
  }
};
var TransactionArgumentU8Vector = class extends TransactionArgument {
  constructor(value) {
    super();
    this.value = value;
  }
  serialize(serializer) {
    serializer.serializeU32AsUleb128(4);
    serializer.serializeBytes(this.value);
  }
  static load(deserializer) {
    const value = deserializer.deserializeBytes();
    return new TransactionArgumentU8Vector(value);
  }
};
var TransactionArgumentBool = class extends TransactionArgument {
  constructor(value) {
    super();
    this.value = value;
  }
  serialize(serializer) {
    serializer.serializeU32AsUleb128(5);
    serializer.serializeBool(this.value);
  }
  static load(deserializer) {
    const value = deserializer.deserializeBool();
    return new TransactionArgumentBool(value);
  }
};
var Transaction = class {
  getHashSalt() {
    const hash = import_sha32.sha3_256.create();
    hash.update("APTOS::Transaction");
    return hash.digest();
  }
  static deserialize(deserializer) {
    const index = deserializer.deserializeUleb128AsU32();
    switch (index) {
      case 0:
        return UserTransaction.load(deserializer);
      default:
        throw new Error(`Unknown variant index for Transaction: ${index}`);
    }
  }
};
var UserTransaction = class extends Transaction {
  constructor(value) {
    super();
    this.value = value;
  }
  hash() {
    const hash = import_sha32.sha3_256.create();
    hash.update(this.getHashSalt());
    hash.update(bcsToBytes(this));
    return hash.digest();
  }
  serialize(serializer) {
    serializer.serializeU32AsUleb128(0);
    this.value.serialize(serializer);
  }
  static load(deserializer) {
    return new UserTransaction(SignedTransaction.deserialize(deserializer));
  }
};

// src/aptos_types/authentication_key.ts
var import_sha33 = require("@noble/hashes/sha3");
var _AuthenticationKey = class {
  constructor(bytes) {
    if (bytes.length !== _AuthenticationKey.LENGTH) {
      throw new Error("Expected a byte array of length 32");
    }
    this.bytes = bytes;
  }
  static fromMultiEd25519PublicKey(publicKey) {
    const pubKeyBytes = publicKey.toBytes();
    const bytes = new Uint8Array(pubKeyBytes.length + 1);
    bytes.set(pubKeyBytes);
    bytes.set([_AuthenticationKey.MULTI_ED25519_SCHEME], pubKeyBytes.length);
    const hash = import_sha33.sha3_256.create();
    hash.update(bytes);
    return new _AuthenticationKey(hash.digest());
  }
  derivedAddress() {
    return HexString.fromUint8Array(this.bytes);
  }
};
var AuthenticationKey = _AuthenticationKey;
AuthenticationKey.LENGTH = 32;
AuthenticationKey.MULTI_ED25519_SCHEME = 1;

// src/aptos_types/rotation_proof_challenge.ts
var RotationProofChallenge = class {
  constructor(accountAddress, moduleName, structName, sequenceNumber, originator, currentAuthKey, newPublicKey) {
    this.accountAddress = accountAddress;
    this.moduleName = moduleName;
    this.structName = structName;
    this.sequenceNumber = sequenceNumber;
    this.originator = originator;
    this.currentAuthKey = currentAuthKey;
    this.newPublicKey = newPublicKey;
  }
  serialize(serializer) {
    this.accountAddress.serialize(serializer);
    serializer.serializeStr(this.moduleName);
    serializer.serializeStr(this.structName);
    serializer.serializeU64(this.sequenceNumber);
    this.originator.serialize(serializer);
    this.currentAuthKey.serialize(serializer);
    serializer.serializeBytes(this.newPublicKey);
  }
};

// src/aptos_types/abi.ts
var TypeArgumentABI = class {
  constructor(name) {
    this.name = name;
  }
  serialize(serializer) {
    serializer.serializeStr(this.name);
  }
  static deserialize(deserializer) {
    const name = deserializer.deserializeStr();
    return new TypeArgumentABI(name);
  }
};
var ArgumentABI = class {
  constructor(name, type_tag) {
    this.name = name;
    this.type_tag = type_tag;
  }
  serialize(serializer) {
    serializer.serializeStr(this.name);
    this.type_tag.serialize(serializer);
  }
  static deserialize(deserializer) {
    const name = deserializer.deserializeStr();
    const typeTag = TypeTag.deserialize(deserializer);
    return new ArgumentABI(name, typeTag);
  }
};
var ScriptABI = class {
  static deserialize(deserializer) {
    const index = deserializer.deserializeUleb128AsU32();
    switch (index) {
      case 0:
        return TransactionScriptABI.load(deserializer);
      case 1:
        return EntryFunctionABI.load(deserializer);
      default:
        throw new Error(`Unknown variant index for TransactionPayload: ${index}`);
    }
  }
};
var TransactionScriptABI = class extends ScriptABI {
  constructor(name, doc, code, ty_args, args) {
    super();
    this.name = name;
    this.doc = doc;
    this.code = code;
    this.ty_args = ty_args;
    this.args = args;
  }
  serialize(serializer) {
    serializer.serializeU32AsUleb128(0);
    serializer.serializeStr(this.name);
    serializer.serializeStr(this.doc);
    serializer.serializeBytes(this.code);
    serializeVector(this.ty_args, serializer);
    serializeVector(this.args, serializer);
  }
  static load(deserializer) {
    const name = deserializer.deserializeStr();
    const doc = deserializer.deserializeStr();
    const code = deserializer.deserializeBytes();
    const tyArgs = deserializeVector(deserializer, TypeArgumentABI);
    const args = deserializeVector(deserializer, ArgumentABI);
    return new TransactionScriptABI(name, doc, code, tyArgs, args);
  }
};
var EntryFunctionABI = class extends ScriptABI {
  constructor(name, module_name, doc, ty_args, args) {
    super();
    this.name = name;
    this.module_name = module_name;
    this.doc = doc;
    this.ty_args = ty_args;
    this.args = args;
  }
  serialize(serializer) {
    serializer.serializeU32AsUleb128(1);
    serializer.serializeStr(this.name);
    this.module_name.serialize(serializer);
    serializer.serializeStr(this.doc);
    serializeVector(this.ty_args, serializer);
    serializeVector(this.args, serializer);
  }
  static load(deserializer) {
    const name = deserializer.deserializeStr();
    const moduleName = ModuleId.deserialize(deserializer);
    const doc = deserializer.deserializeStr();
    const tyArgs = deserializeVector(deserializer, TypeArgumentABI);
    const args = deserializeVector(deserializer, ArgumentABI);
    return new EntryFunctionABI(name, moduleName, doc, tyArgs, args);
  }
};

// src/transaction_builder/builder_utils.ts
function assertType(val, types, message) {
  if (!(types == null ? void 0 : types.includes(typeof val))) {
    throw new Error(
      message || `Invalid arg: ${val} type should be ${types instanceof Array ? types.join(" or ") : types}`
    );
  }
}
function bail(message) {
  throw new Error(message);
}
function isWhiteSpace(c) {
  if (c.match(/\s/)) {
    return true;
  }
  return false;
}
function isValidAlphabetic(c) {
  if (c.match(/[_A-Za-z0-9]/g)) {
    return true;
  }
  return false;
}
function nextToken(tagStr, pos) {
  const c = tagStr[pos];
  if (c === ":") {
    if (tagStr.slice(pos, pos + 2) === "::") {
      return [["COLON", "::"], 2];
    }
    bail("Unrecognized token.");
  } else if (c === "<") {
    return [["LT", "<"], 1];
  } else if (c === ">") {
    return [["GT", ">"], 1];
  } else if (c === ",") {
    return [["COMMA", ","], 1];
  } else if (isWhiteSpace(c)) {
    let res = "";
    for (let i = pos; i < tagStr.length; i += 1) {
      const char = tagStr[i];
      if (isWhiteSpace(char)) {
        res = `${res}${char}`;
      } else {
        break;
      }
    }
    return [["SPACE", res], res.length];
  } else if (isValidAlphabetic(c)) {
    let res = "";
    for (let i = pos; i < tagStr.length; i += 1) {
      const char = tagStr[i];
      if (isValidAlphabetic(char)) {
        res = `${res}${char}`;
      } else {
        break;
      }
    }
    return [["IDENT", res], res.length];
  }
  throw new Error("Unrecognized token.");
}
function tokenize(tagStr) {
  let pos = 0;
  const tokens = [];
  while (pos < tagStr.length) {
    const [token, size] = nextToken(tagStr, pos);
    if (token[0] !== "SPACE") {
      tokens.push(token);
    }
    pos += size;
  }
  return tokens;
}
var TypeTagParser = class {
  constructor(tagStr) {
    this.tokens = tokenize(tagStr);
  }
  consume(targetToken) {
    const token = this.tokens.shift();
    if (!token || token[1] !== targetToken) {
      bail("Invalid type tag.");
    }
  }
  parseCommaList(endToken, allowTraillingComma) {
    const res = [];
    if (this.tokens.length <= 0) {
      bail("Invalid type tag.");
    }
    while (this.tokens[0][1] !== endToken) {
      res.push(this.parseTypeTag());
      if (this.tokens.length > 0 && this.tokens[0][1] === endToken) {
        break;
      }
      this.consume(",");
      if (this.tokens.length > 0 && this.tokens[0][1] === endToken && allowTraillingComma) {
        break;
      }
      if (this.tokens.length <= 0) {
        bail("Invalid type tag.");
      }
    }
    return res;
  }
  parseTypeTag() {
    if (this.tokens.length === 0) {
      bail("Invalid type tag.");
    }
    const [tokenTy, tokenVal] = this.tokens.shift();
    if (tokenVal === "u8") {
      return new TypeTagU8();
    }
    if (tokenVal === "u64") {
      return new TypeTagU64();
    }
    if (tokenVal === "u128") {
      return new TypeTagU128();
    }
    if (tokenVal === "bool") {
      return new TypeTagBool();
    }
    if (tokenVal === "address") {
      return new TypeTagAddress();
    }
    if (tokenVal === "vector") {
      this.consume("<");
      const res = this.parseTypeTag();
      this.consume(">");
      return new TypeTagVector(res);
    }
    if (tokenTy === "IDENT" && (tokenVal.startsWith("0x") || tokenVal.startsWith("0X"))) {
      const address = tokenVal;
      this.consume("::");
      const [moduleTokenTy, module2] = this.tokens.shift();
      if (moduleTokenTy !== "IDENT") {
        bail("Invalid type tag.");
      }
      this.consume("::");
      const [nameTokenTy, name] = this.tokens.shift();
      if (nameTokenTy !== "IDENT") {
        bail("Invalid type tag.");
      }
      let tyTags = [];
      if (this.tokens.length > 0 && this.tokens[0][1] === "<") {
        this.consume("<");
        tyTags = this.parseCommaList(">", true);
        this.consume(">");
      }
      const structTag = new StructTag(
        AccountAddress.fromHex(address),
        new Identifier(module2),
        new Identifier(name),
        tyTags
      );
      return new TypeTagStruct(structTag);
    }
    throw new Error("Invalid type tag.");
  }
};
function ensureBoolean(val) {
  assertType(val, ["boolean", "string"]);
  if (typeof val === "boolean") {
    return val;
  }
  if (val === "true") {
    return true;
  }
  if (val === "false") {
    return false;
  }
  throw new Error("Invalid boolean string.");
}
function ensureNumber(val) {
  assertType(val, ["number", "string"]);
  if (typeof val === "number") {
    return val;
  }
  const res = Number.parseInt(val, 10);
  if (Number.isNaN(res)) {
    throw new Error("Invalid number string.");
  }
  return res;
}
function ensureBigInt(val) {
  assertType(val, ["number", "bigint", "string"]);
  return BigInt(val);
}
function serializeArg(argVal, argType, serializer) {
  if (argType instanceof TypeTagBool) {
    serializer.serializeBool(ensureBoolean(argVal));
    return;
  }
  if (argType instanceof TypeTagU8) {
    serializer.serializeU8(ensureNumber(argVal));
    return;
  }
  if (argType instanceof TypeTagU64) {
    serializer.serializeU64(ensureBigInt(argVal));
    return;
  }
  if (argType instanceof TypeTagU128) {
    serializer.serializeU128(ensureBigInt(argVal));
    return;
  }
  if (argType instanceof TypeTagAddress) {
    let addr;
    if (typeof argVal === "string" || argVal instanceof HexString) {
      addr = AccountAddress.fromHex(argVal);
    } else if (argVal instanceof AccountAddress) {
      addr = argVal;
    } else {
      throw new Error("Invalid account address.");
    }
    addr.serialize(serializer);
    return;
  }
  if (argType instanceof TypeTagVector) {
    if (argType.value instanceof TypeTagU8) {
      if (argVal instanceof Uint8Array) {
        serializer.serializeBytes(argVal);
        return;
      }
      if (typeof argVal === "string") {
        serializer.serializeStr(argVal);
        return;
      }
    }
    if (!(argVal instanceof Array)) {
      throw new Error("Invalid vector args.");
    }
    serializer.serializeU32AsUleb128(argVal.length);
    argVal.forEach((arg) => serializeArg(arg, argType.value, serializer));
    return;
  }
  if (argType instanceof TypeTagStruct) {
    const { address, module_name: moduleName, name } = argType.value;
    if (`${HexString.fromUint8Array(address.address).toShortString()}::${moduleName.value}::${name.value}` !== "0x1::string::String") {
      throw new Error("The only supported struct arg is of type 0x1::string::String");
    }
    assertType(argVal, ["string"]);
    serializer.serializeStr(argVal);
    return;
  }
  throw new Error("Unsupported arg type.");
}
function argToTransactionArgument(argVal, argType) {
  if (argType instanceof TypeTagBool) {
    return new TransactionArgumentBool(ensureBoolean(argVal));
  }
  if (argType instanceof TypeTagU8) {
    return new TransactionArgumentU8(ensureNumber(argVal));
  }
  if (argType instanceof TypeTagU64) {
    return new TransactionArgumentU64(ensureBigInt(argVal));
  }
  if (argType instanceof TypeTagU128) {
    return new TransactionArgumentU128(ensureBigInt(argVal));
  }
  if (argType instanceof TypeTagAddress) {
    let addr;
    if (typeof argVal === "string" || argVal instanceof HexString) {
      addr = AccountAddress.fromHex(argVal);
    } else if (argVal instanceof AccountAddress) {
      addr = argVal;
    } else {
      throw new Error("Invalid account address.");
    }
    return new TransactionArgumentAddress(addr);
  }
  if (argType instanceof TypeTagVector && argType.value instanceof TypeTagU8) {
    if (!(argVal instanceof Uint8Array)) {
      throw new Error(`${argVal} should be an instance of Uint8Array`);
    }
    return new TransactionArgumentU8Vector(argVal);
  }
  throw new Error("Unknown type for TransactionArgument.");
}

// src/transaction_builder/builder.ts
var RAW_TRANSACTION_SALT = "APTOS::RawTransaction";
var RAW_TRANSACTION_WITH_DATA_SALT = "APTOS::RawTransactionWithData";
var TransactionBuilder = class {
  constructor(signingFunction, rawTxnBuilder) {
    this.rawTxnBuilder = rawTxnBuilder;
    this.signingFunction = signingFunction;
  }
  build(func, ty_tags, args) {
    if (!this.rawTxnBuilder) {
      throw new Error("this.rawTxnBuilder doesn't exist.");
    }
    return this.rawTxnBuilder.build(func, ty_tags, args);
  }
  static getSigningMessage(rawTxn) {
    const hash = import_sha34.sha3_256.create();
    if (rawTxn instanceof RawTransaction) {
      hash.update(RAW_TRANSACTION_SALT);
    } else if (rawTxn instanceof MultiAgentRawTransaction) {
      hash.update(RAW_TRANSACTION_WITH_DATA_SALT);
    } else {
      throw new Error("Unknown transaction type.");
    }
    const prefix = hash.digest();
    const body = bcsToBytes(rawTxn);
    const mergedArray = new Uint8Array(prefix.length + body.length);
    mergedArray.set(prefix);
    mergedArray.set(body, prefix.length);
    return mergedArray;
  }
};
var TransactionBuilderEd25519 = class extends TransactionBuilder {
  constructor(signingFunction, publicKey, rawTxnBuilder) {
    super(signingFunction, rawTxnBuilder);
    this.publicKey = publicKey;
  }
  rawToSigned(rawTxn) {
    const signingMessage = TransactionBuilder.getSigningMessage(rawTxn);
    const signature = this.signingFunction(signingMessage);
    const authenticator = new TransactionAuthenticatorEd25519(
      new Ed25519PublicKey(this.publicKey),
      signature
    );
    return new SignedTransaction(rawTxn, authenticator);
  }
  sign(rawTxn) {
    return bcsToBytes(this.rawToSigned(rawTxn));
  }
};
var TransactionBuilderMultiEd25519 = class extends TransactionBuilder {
  constructor(signingFunction, publicKey) {
    super(signingFunction);
    this.publicKey = publicKey;
  }
  rawToSigned(rawTxn) {
    const signingMessage = TransactionBuilder.getSigningMessage(rawTxn);
    const signature = this.signingFunction(signingMessage);
    const authenticator = new TransactionAuthenticatorMultiEd25519(this.publicKey, signature);
    return new SignedTransaction(rawTxn, authenticator);
  }
  sign(rawTxn) {
    return bcsToBytes(this.rawToSigned(rawTxn));
  }
};
var TransactionBuilderABI = class {
  constructor(abis, builderConfig) {
    this.abiMap = /* @__PURE__ */ new Map();
    abis.forEach((abi) => {
      const deserializer = new Deserializer(abi);
      const scriptABI = ScriptABI.deserialize(deserializer);
      let k;
      if (scriptABI instanceof EntryFunctionABI) {
        const funcABI = scriptABI;
        const { address: addr, name: moduleName } = funcABI.module_name;
        k = `${HexString.fromUint8Array(addr.address).toShortString()}::${moduleName.value}::${funcABI.name}`;
      } else {
        const funcABI = scriptABI;
        k = funcABI.name;
      }
      if (this.abiMap.has(k)) {
        throw new Error("Found conflicting ABI interfaces");
      }
      this.abiMap.set(k, scriptABI);
    });
    this.builderConfig = {
      maxGasAmount: BigInt(DEFAULT_MAX_GAS_AMOUNT),
      expSecFromNow: DEFAULT_TXN_EXP_SEC_FROM_NOW,
      ...builderConfig
    };
  }
  static toBCSArgs(abiArgs, args) {
    if (abiArgs.length !== args.length) {
      throw new Error("Wrong number of args provided.");
    }
    return args.map((arg, i) => {
      const serializer = new Serializer();
      serializeArg(arg, abiArgs[i].type_tag, serializer);
      return serializer.getBytes();
    });
  }
  static toTransactionArguments(abiArgs, args) {
    if (abiArgs.length !== args.length) {
      throw new Error("Wrong number of args provided.");
    }
    return args.map((arg, i) => argToTransactionArgument(arg, abiArgs[i].type_tag));
  }
  setSequenceNumber(seqNumber) {
    this.builderConfig.sequenceNumber = BigInt(seqNumber);
  }
  buildTransactionPayload(func, ty_tags, args) {
    const typeTags = ty_tags.map((ty_arg) => new TypeTagParser(ty_arg).parseTypeTag());
    let payload;
    if (!this.abiMap.has(func)) {
      throw new Error(`Cannot find function: ${func}`);
    }
    const scriptABI = this.abiMap.get(func);
    if (scriptABI instanceof EntryFunctionABI) {
      const funcABI = scriptABI;
      const bcsArgs = TransactionBuilderABI.toBCSArgs(funcABI.args, args);
      payload = new TransactionPayloadEntryFunction(
        new EntryFunction(funcABI.module_name, new Identifier(funcABI.name), typeTags, bcsArgs)
      );
    }
    if (scriptABI instanceof TransactionScriptABI) {
      const funcABI = scriptABI;
      const scriptArgs = TransactionBuilderABI.toTransactionArguments(funcABI.args, args);
      payload = new TransactionPayloadScript(new Script(funcABI.code, typeTags, scriptArgs));
    }
    return payload;
  }
  build(func, ty_tags, args) {
    const { sender, sequenceNumber, gasUnitPrice, maxGasAmount, expSecFromNow, chainId } = this.builderConfig;
    if (!gasUnitPrice) {
      throw new Error("No gasUnitPrice provided.");
    }
    const senderAccount = sender instanceof AccountAddress ? sender : AccountAddress.fromHex(sender);
    const expTimestampSec = BigInt(Math.floor(Date.now() / 1e3) + Number(expSecFromNow));
    const payload = this.buildTransactionPayload(func, ty_tags, args);
    if (payload) {
      return new RawTransaction(
        senderAccount,
        BigInt(sequenceNumber),
        payload,
        BigInt(maxGasAmount),
        BigInt(gasUnitPrice),
        expTimestampSec,
        new ChainId(Number(chainId))
      );
    }
    throw new Error("Invalid ABI.");
  }
};
var TransactionBuilderRemoteABI = class {
  constructor(aptosClient, builderConfig) {
    this.aptosClient = aptosClient;
    this.builderConfig = builderConfig;
  }
  async fetchABI(addr) {
    const modules = await this.aptosClient.getAccountModules(addr);
    const abis = modules.map((module2) => module2.abi).flatMap(
      (abi) => abi.exposed_functions.filter((ef) => ef.is_entry).map(
        (ef) => ({
          fullName: `${abi.address}::${abi.name}::${ef.name}`,
          ...ef
        })
      )
    );
    const abiMap = /* @__PURE__ */ new Map();
    abis.forEach((abi) => {
      abiMap.set(abi.fullName, abi);
    });
    return abiMap;
  }
  async build(func, ty_tags, args) {
    const normlize = (s) => s.replace(/^0[xX]0*/g, "0x");
    func = normlize(func);
    const funcNameParts = func.split("::");
    if (funcNameParts.length !== 3) {
      throw new Error(
        "'func' needs to be a fully qualified function name in format <address>::<module>::<function>, e.g. 0x1::coins::transfer"
      );
    }
    const [addr, module2] = func.split("::");
    const abiMap = await this.fetchABI(addr);
    if (!abiMap.has(func)) {
      throw new Error(`${func} doesn't exist.`);
    }
    const funcAbi = abiMap.get(func);
    const originalArgs = funcAbi.params.filter((param) => param !== "signer" && param !== "&signer");
    const typeArgABIs = originalArgs.map((arg, i) => new ArgumentABI(`var${i}`, new TypeTagParser(arg).parseTypeTag()));
    const entryFunctionABI = new EntryFunctionABI(
      funcAbi.name,
      ModuleId.fromStr(`${addr}::${module2}`),
      "",
      funcAbi.generic_type_params.map((_, i) => new TypeArgumentABI(`${i}`)),
      typeArgABIs
    );
    const { sender, ...rest } = this.builderConfig;
    const senderAddress = sender instanceof AccountAddress ? HexString.fromUint8Array(sender.address) : sender;
    const [{ sequence_number: sequenceNumber }, chainId, { gas_estimate: gasUnitPrice }] = await Promise.all([
      (rest == null ? void 0 : rest.sequenceNumber) ? Promise.resolve({ sequence_number: rest == null ? void 0 : rest.sequenceNumber }) : this.aptosClient.getAccount(senderAddress),
      (rest == null ? void 0 : rest.chainId) ? Promise.resolve(rest == null ? void 0 : rest.chainId) : this.aptosClient.getChainId(),
      (rest == null ? void 0 : rest.gasUnitPrice) ? Promise.resolve({ gas_estimate: rest == null ? void 0 : rest.gasUnitPrice }) : this.aptosClient.estimateGasPrice()
    ]);
    const builderABI = new TransactionBuilderABI([bcsToBytes(entryFunctionABI)], {
      sender,
      sequenceNumber,
      chainId,
      gasUnitPrice: BigInt(gasUnitPrice),
      ...rest
    });
    return builderABI.build(func, ty_tags, args);
  }
};
__decorateClass([
  MemoizeExpiring(10 * 60 * 1e3)
], TransactionBuilderRemoteABI.prototype, "fetchABI", 1);

// src/aptos_client.ts
var _AptosClient = class {
  constructor(nodeUrl, config, doNotFixNodeUrl = false) {
    if (!nodeUrl) {
      throw new Error("Node URL cannot be empty.");
    }
    const conf = config === void 0 || config === null ? {} : { ...config };
    if (doNotFixNodeUrl) {
      conf.BASE = nodeUrl;
    } else {
      conf.BASE = fixNodeUrl(nodeUrl);
    }
    if ((config == null ? void 0 : config.WITH_CREDENTIALS) === false) {
      conf.WITH_CREDENTIALS = false;
    } else {
      conf.WITH_CREDENTIALS = true;
    }
    this.client = new AptosGeneratedClient(conf);
  }
  async getAccount(accountAddress) {
    return this.client.accounts.getAccount(HexString.ensure(accountAddress).hex());
  }
  async getAccountTransactions(accountAddress, query) {
    var _a;
    return this.client.transactions.getAccountTransactions(
      HexString.ensure(accountAddress).hex(),
      (_a = query == null ? void 0 : query.start) == null ? void 0 : _a.toString(),
      query == null ? void 0 : query.limit
    );
  }
  async getAccountModules(accountAddress, query) {
    var _a;
    return this.client.accounts.getAccountModules(
      HexString.ensure(accountAddress).hex(),
      (_a = query == null ? void 0 : query.ledgerVersion) == null ? void 0 : _a.toString()
    );
  }
  async getAccountModule(accountAddress, moduleName, query) {
    var _a;
    return this.client.accounts.getAccountModule(
      HexString.ensure(accountAddress).hex(),
      moduleName,
      (_a = query == null ? void 0 : query.ledgerVersion) == null ? void 0 : _a.toString()
    );
  }
  async getAccountResources(accountAddress, query) {
    var _a;
    return this.client.accounts.getAccountResources(
      HexString.ensure(accountAddress).hex(),
      (_a = query == null ? void 0 : query.ledgerVersion) == null ? void 0 : _a.toString()
    );
  }
  async getAccountResource(accountAddress, resourceType, query) {
    var _a;
    return this.client.accounts.getAccountResource(
      HexString.ensure(accountAddress).hex(),
      resourceType,
      (_a = query == null ? void 0 : query.ledgerVersion) == null ? void 0 : _a.toString()
    );
  }
  static generateBCSTransaction(accountFrom, rawTxn) {
    const txnBuilder = new TransactionBuilderEd25519((signingMessage) => {
      const sigHexStr = accountFrom.signBuffer(signingMessage);
      return new aptos_types_exports.Ed25519Signature(sigHexStr.toUint8Array());
    }, accountFrom.pubKey().toUint8Array());
    return txnBuilder.sign(rawTxn);
  }
  static generateBCSSimulation(accountFrom, rawTxn) {
    const txnBuilder = new TransactionBuilderEd25519((_signingMessage) => {
      const invalidSigBytes = new Uint8Array(64);
      return new aptos_types_exports.Ed25519Signature(invalidSigBytes);
    }, accountFrom.pubKey().toUint8Array());
    return txnBuilder.sign(rawTxn);
  }
  async generateTransaction(sender, payload, options) {
    const config = { sender };
    if (options == null ? void 0 : options.sequence_number) {
      config.sequenceNumber = options.sequence_number;
    }
    if (options == null ? void 0 : options.gas_unit_price) {
      config.gasUnitPrice = options.gas_unit_price;
    }
    if (options == null ? void 0 : options.max_gas_amount) {
      config.maxGasAmount = options.max_gas_amount;
    }
    if (options == null ? void 0 : options.expiration_timestamp_secs) {
      const timestamp = Number.parseInt(options.expiration_timestamp_secs, 10);
      config.expSecFromNow = timestamp - Math.floor(Date.now() / 1e3);
    }
    const builder = new TransactionBuilderRemoteABI(this, config);
    return builder.build(payload.function, payload.type_arguments, payload.arguments);
  }
  async signTransaction(accountFrom, rawTransaction) {
    return Promise.resolve(_AptosClient.generateBCSTransaction(accountFrom, rawTransaction));
  }
  async getEventsByEventKey(eventKey) {
    return this.client.events.getEventsByEventKey(eventKey);
  }
  async getEventsByCreationNumber(address, creationNumber, query) {
    var _a;
    return this.client.events.getEventsByCreationNumber(
      HexString.ensure(address).hex(),
      creationNumber.toString(),
      (_a = query == null ? void 0 : query.start) == null ? void 0 : _a.toString(),
      query == null ? void 0 : query.limit
    );
  }
  async getEventsByEventHandle(address, eventHandleStruct, fieldName, query) {
    var _a;
    return this.client.events.getEventsByEventHandle(
      HexString.ensure(address).hex(),
      eventHandleStruct,
      fieldName,
      (_a = query == null ? void 0 : query.start) == null ? void 0 : _a.toString(),
      query == null ? void 0 : query.limit
    );
  }
  async submitTransaction(signedTxn) {
    return this.submitSignedBCSTransaction(signedTxn);
  }
  async simulateTransaction(accountFrom, rawTransaction, query) {
    const signedTxn = _AptosClient.generateBCSSimulation(accountFrom, rawTransaction);
    return this.submitBCSSimulation(signedTxn, query);
  }
  async submitSignedBCSTransaction(signedTxn) {
    return this.client.request.request({
      url: "/transactions",
      method: "POST",
      body: signedTxn,
      mediaType: "application/x.aptos.signed_transaction+bcs"
    });
  }
  async submitBCSSimulation(bcsBody, query) {
    var _a, _b;
    const queryParams = {
      estimate_gas_unit_price: (_a = query == null ? void 0 : query.estimateGasUnitPrice) != null ? _a : false,
      estimate_max_gas_amount: (_b = query == null ? void 0 : query.estimateMaxGasAmount) != null ? _b : false
    };
    return this.client.request.request({
      url: "/transactions/simulate",
      query: queryParams,
      method: "POST",
      body: bcsBody,
      mediaType: "application/x.aptos.signed_transaction+bcs"
    });
  }
  async getTransactions(query) {
    var _a;
    return this.client.transactions.getTransactions((_a = query == null ? void 0 : query.start) == null ? void 0 : _a.toString(), query == null ? void 0 : query.limit);
  }
  async getTransactionByHash(txnHash) {
    return this.client.transactions.getTransactionByHash(txnHash);
  }
  async getTransactionByVersion(txnVersion) {
    return this.client.transactions.getTransactionByVersion(txnVersion.toString());
  }
  async transactionPending(txnHash) {
    try {
      const response = await this.client.transactions.getTransactionByHash(txnHash);
      return response.type === "pending_transaction";
    } catch (e) {
      if ((e == null ? void 0 : e.status) === 404) {
        return true;
      }
      throw e;
    }
  }
  async waitForTransactionWithResult(txnHash, extraArgs) {
    var _a, _b;
    const timeoutSecs = (_a = extraArgs == null ? void 0 : extraArgs.timeoutSecs) != null ? _a : DEFAULT_TXN_TIMEOUT_SEC;
    const checkSuccess = (_b = extraArgs == null ? void 0 : extraArgs.checkSuccess) != null ? _b : false;
    let isPending = true;
    let count = 0;
    let lastTxn;
    while (isPending) {
      if (count >= timeoutSecs) {
        break;
      }
      try {
        lastTxn = await this.client.transactions.getTransactionByHash(txnHash);
        isPending = lastTxn.type === "pending_transaction";
        if (!isPending) {
          break;
        }
      } catch (e) {
        const isApiError = e instanceof ApiError;
        const isRequestError = isApiError && e.status !== 404 && e.status >= 400 && e.status < 500;
        if (!isApiError || isRequestError) {
          throw e;
        }
      }
      await sleep(1e3);
      count += 1;
    }
    if (isPending) {
      throw new WaitForTransactionError(
        `Waiting for transaction ${txnHash} timed out after ${timeoutSecs} seconds`,
        lastTxn
      );
    }
    if (!checkSuccess) {
      return lastTxn;
    }
    if (!(lastTxn == null ? void 0 : lastTxn.success)) {
      throw new FailedTransactionError(
        `Transaction ${lastTxn.hash} committed to the blockchain but execution failed`,
        lastTxn
      );
    }
    return lastTxn;
  }
  async waitForTransaction(txnHash, extraArgs) {
    await this.waitForTransactionWithResult(txnHash, extraArgs);
  }
  async getLedgerInfo() {
    return this.client.general.getLedgerInfo();
  }
  async getChainId() {
    const result = await this.getLedgerInfo();
    return result.chain_id;
  }
  async getTableItem(handle, data, query) {
    var _a;
    const tableItem = await this.client.tables.getTableItem(handle, data, (_a = query == null ? void 0 : query.ledgerVersion) == null ? void 0 : _a.toString());
    return tableItem;
  }
  async generateRawTransaction(accountFrom, payload, extraArgs) {
    const [{ sequence_number: sequenceNumber }, chainId, { gas_estimate: gasEstimate }] = await Promise.all([
      this.getAccount(accountFrom),
      this.getChainId(),
      (extraArgs == null ? void 0 : extraArgs.gasUnitPrice) ? Promise.resolve({ gas_estimate: extraArgs.gasUnitPrice }) : this.estimateGasPrice()
    ]);
    const { maxGasAmount, gasUnitPrice, expireTimestamp } = {
      maxGasAmount: BigInt(DEFAULT_MAX_GAS_AMOUNT),
      gasUnitPrice: BigInt(gasEstimate),
      expireTimestamp: BigInt(Math.floor(Date.now() / 1e3) + DEFAULT_TXN_EXP_SEC_FROM_NOW),
      ...extraArgs
    };
    return new aptos_types_exports.RawTransaction(
      aptos_types_exports.AccountAddress.fromHex(accountFrom),
      BigInt(sequenceNumber),
      payload,
      maxGasAmount,
      gasUnitPrice,
      expireTimestamp,
      new aptos_types_exports.ChainId(chainId)
    );
  }
  async generateSignSubmitTransaction(sender, payload, extraArgs) {
    const rawTransaction = await this.generateRawTransaction(sender.address(), payload, extraArgs);
    const bcsTxn = _AptosClient.generateBCSTransaction(sender, rawTransaction);
    const pendingTransaction = await this.submitSignedBCSTransaction(bcsTxn);
    return pendingTransaction.hash;
  }
  async publishPackage(sender, packageMetadata, modules, extraArgs) {
    const codeSerializer = new Serializer();
    serializeVector(modules, codeSerializer);
    const payload = new aptos_types_exports.TransactionPayloadEntryFunction(
      aptos_types_exports.EntryFunction.natural(
        "0x1::code",
        "publish_package_txn",
        [],
        [bcsSerializeBytes(packageMetadata), codeSerializer.getBytes()]
      )
    );
    return this.generateSignSubmitTransaction(sender, payload, extraArgs);
  }
  async generateSignSubmitWaitForTransaction(sender, payload, extraArgs) {
    const txnHash = await this.generateSignSubmitTransaction(sender, payload, extraArgs);
    return this.waitForTransactionWithResult(txnHash, extraArgs);
  }
  async estimateGasPrice() {
    return this.client.transactions.estimateGasPrice();
  }
  async estimateMaxGasAmount(forAccount) {
    const typeTag = `0x1::coin::CoinStore<${APTOS_COIN}>`;
    const [{ gas_estimate: gasUnitPrice }, resources] = await Promise.all([
      this.estimateGasPrice(),
      this.getAccountResources(forAccount)
    ]);
    const accountResource = resources.find((r) => r.type === typeTag);
    const balance = BigInt(accountResource.data.coin.value);
    return balance / BigInt(gasUnitPrice);
  }
  async rotateAuthKeyEd25519(forAccount, toPrivateKeyBytes, extraArgs) {
    const { sequence_number: sequenceNumber, authentication_key: authKey } = await this.getAccount(
      forAccount.address()
    );
    const helperAccount = new AptosAccount(toPrivateKeyBytes);
    const challenge = new aptos_types_exports.RotationProofChallenge(
      aptos_types_exports.AccountAddress.CORE_CODE_ADDRESS,
      "account",
      "RotationProofChallenge",
      BigInt(sequenceNumber),
      aptos_types_exports.AccountAddress.fromHex(forAccount.address()),
      new aptos_types_exports.AccountAddress(new HexString(authKey).toUint8Array()),
      helperAccount.pubKey().toUint8Array()
    );
    const challengeHex = HexString.fromUint8Array(bcsToBytes(challenge));
    const proofSignedByCurrentPrivateKey = forAccount.signHexString(challengeHex);
    const proofSignedByNewPrivateKey = helperAccount.signHexString(challengeHex);
    const payload = new aptos_types_exports.TransactionPayloadEntryFunction(
      aptos_types_exports.EntryFunction.natural(
        "0x1::account",
        "rotate_authentication_key",
        [],
        [
          bcsSerializeU8(0),
          bcsSerializeBytes(forAccount.pubKey().toUint8Array()),
          bcsSerializeU8(0),
          bcsSerializeBytes(helperAccount.pubKey().toUint8Array()),
          bcsSerializeBytes(proofSignedByCurrentPrivateKey.toUint8Array()),
          bcsSerializeBytes(proofSignedByNewPrivateKey.toUint8Array())
        ]
      )
    );
    const rawTransaction = await this.generateRawTransaction(forAccount.address(), payload, extraArgs);
    const bcsTxn = _AptosClient.generateBCSTransaction(forAccount, rawTransaction);
    return this.submitSignedBCSTransaction(bcsTxn);
  }
  async lookupOriginalAddress(addressOrAuthKey) {
    const resource = await this.getAccountResource("0x1", "0x1::account::OriginatingAddress");
    const {
      address_map: { handle }
    } = resource.data;
    const origAddress = await this.getTableItem(handle, {
      key_type: "address",
      value_type: "address",
      key: HexString.ensure(addressOrAuthKey).hex()
    });
    return new HexString(origAddress);
  }
  async getBlockByHeight(blockHeight, withTransactions) {
    return this.client.blocks.getBlockByHeight(blockHeight, withTransactions);
  }
  async getBlockByVersion(version, withTransactions) {
    return this.client.blocks.getBlockByVersion(version, withTransactions);
  }
  clearCache(tags) {
    clear(tags);
  }
};
var AptosClient = _AptosClient;
__decorateClass([
  parseApiError
], AptosClient.prototype, "getAccount", 1);
__decorateClass([
  parseApiError
], AptosClient.prototype, "getAccountTransactions", 1);
__decorateClass([
  parseApiError
], AptosClient.prototype, "getAccountModules", 1);
__decorateClass([
  parseApiError
], AptosClient.prototype, "getAccountModule", 1);
__decorateClass([
  parseApiError
], AptosClient.prototype, "getAccountResources", 1);
__decorateClass([
  parseApiError
], AptosClient.prototype, "getAccountResource", 1);
__decorateClass([
  parseApiError
], AptosClient.prototype, "getEventsByEventKey", 1);
__decorateClass([
  parseApiError
], AptosClient.prototype, "getEventsByCreationNumber", 1);
__decorateClass([
  parseApiError
], AptosClient.prototype, "getEventsByEventHandle", 1);
__decorateClass([
  parseApiError
], AptosClient.prototype, "submitSignedBCSTransaction", 1);
__decorateClass([
  parseApiError
], AptosClient.prototype, "submitBCSSimulation", 1);
__decorateClass([
  parseApiError
], AptosClient.prototype, "getTransactions", 1);
__decorateClass([
  parseApiError
], AptosClient.prototype, "getTransactionByHash", 1);
__decorateClass([
  parseApiError
], AptosClient.prototype, "getTransactionByVersion", 1);
__decorateClass([
  parseApiError
], AptosClient.prototype, "getLedgerInfo", 1);
__decorateClass([
  Memoize()
], AptosClient.prototype, "getChainId", 1);
__decorateClass([
  parseApiError
], AptosClient.prototype, "getTableItem", 1);
__decorateClass([
  parseApiError,
  Memoize({
    ttlMs: 5 * 60 * 1e3,
    tags: ["gas_estimates"]
  })
], AptosClient.prototype, "estimateGasPrice", 1);
__decorateClass([
  parseApiError
], AptosClient.prototype, "estimateMaxGasAmount", 1);
__decorateClass([
  parseApiError
], AptosClient.prototype, "getBlockByHeight", 1);
__decorateClass([
  parseApiError
], AptosClient.prototype, "getBlockByVersion", 1);
var ApiError2 = class extends Error {
  constructor(status, message, errorCode, vmErrorCode) {
    super(message);
    this.status = status;
    this.message = message;
    this.errorCode = errorCode;
    this.vmErrorCode = vmErrorCode;
  }
};
var WaitForTransactionError = class extends Error {
  constructor(message, lastSubmittedTransaction) {
    super(message);
    this.lastSubmittedTransaction = lastSubmittedTransaction;
  }
};
var FailedTransactionError = class extends Error {
  constructor(message, transaction) {
    super(message);
    this.transaction = transaction;
  }
};
function parseApiError(target, propertyKey, descriptor) {
  const childFunction = descriptor.value;
  descriptor.value = async function wrapper(...args) {
    var _a, _b;
    try {
      const res = await childFunction.apply(this, [...args]);
      return res;
    } catch (e) {
      if (e instanceof ApiError) {
        throw new ApiError2(
          e.status,
          JSON.stringify({ message: e.message, ...e.body }),
          (_a = e.body) == null ? void 0 : _a.error_code,
          (_b = e.body) == null ? void 0 : _b.vm_error_code
        );
      }
      throw e;
    }
  };
  return descriptor;
}

// src/abis.ts
var TOKEN_ABIS = [
  "01186372656174655F636F6C6C656374696F6E5F736372697074000000000000000000000000000000000000000000000000000000000000000305746F6B656E3020637265617465206120656D70747920746F6B656E20636F6C6C656374696F6E207769746820706172616D65746572730005046E616D6507000000000000000000000000000000000000000000000000000000000000000106737472696E6706537472696E67000B6465736372697074696F6E07000000000000000000000000000000000000000000000000000000000000000106737472696E6706537472696E67000375726907000000000000000000000000000000000000000000000000000000000000000106737472696E6706537472696E6700076D6178696D756D020E6D75746174655F73657474696E670600",
  "01136372656174655F746F6B656E5F736372697074000000000000000000000000000000000000000000000000000000000000000305746F6B656E1D2063726561746520746F6B656E20776974682072617720696E70757473000D0A636F6C6C656374696F6E07000000000000000000000000000000000000000000000000000000000000000106737472696E6706537472696E6700046E616D6507000000000000000000000000000000000000000000000000000000000000000106737472696E6706537472696E67000B6465736372697074696F6E07000000000000000000000000000000000000000000000000000000000000000106737472696E6706537472696E67000762616C616E636502076D6178696D756D020375726907000000000000000000000000000000000000000000000000000000000000000106737472696E6706537472696E670015726F79616C74795F70617965655F61646472657373041A726F79616C74795F706F696E74735F64656E6F6D696E61746F720218726F79616C74795F706F696E74735F6E756D657261746F72020E6D75746174655F73657474696E6706000D70726F70657274795F6B6579730607000000000000000000000000000000000000000000000000000000000000000106737472696E6706537472696E67000F70726F70657274795F76616C7565730606010E70726F70657274795F74797065730607000000000000000000000000000000000000000000000000000000000000000106737472696E6706537472696E6700",
  "01166469726563745f7472616e736665725f736372697074000000000000000000000000000000000000000000000000000000000000000305746f6b656e0000051063726561746f72735f61646472657373040a636f6c6c656374696f6e07000000000000000000000000000000000000000000000000000000000000000106737472696e6706537472696e6700046e616d6507000000000000000000000000000000000000000000000000000000000000000106737472696e6706537472696e67001070726f70657274795f76657273696f6e0206616d6f756e7402",
  "010C6F666665725F73637269707400000000000000000000000000000000000000000000000000000000000000030F746F6B656E5F7472616E7366657273000006087265636569766572040763726561746F72040A636F6C6C656374696F6E07000000000000000000000000000000000000000000000000000000000000000106737472696E6706537472696E6700046E616D6507000000000000000000000000000000000000000000000000000000000000000106737472696E6706537472696E67001070726F70657274795F76657273696F6E0206616D6F756E7402",
  "010C636C61696D5F73637269707400000000000000000000000000000000000000000000000000000000000000030F746F6B656E5F7472616E73666572730000050673656E646572040763726561746F72040A636F6C6C656374696F6E07000000000000000000000000000000000000000000000000000000000000000106737472696E6706537472696E6700046E616D6507000000000000000000000000000000000000000000000000000000000000000106737472696E6706537472696E67001070726F70657274795F76657273696F6E02",
  "011363616E63656C5F6F666665725F73637269707400000000000000000000000000000000000000000000000000000000000000030F746F6B656E5F7472616E7366657273000005087265636569766572040763726561746F72040A636F6C6C656374696F6E07000000000000000000000000000000000000000000000000000000000000000106737472696E6706537472696E6700046E616D6507000000000000000000000000000000000000000000000000000000000000000106737472696E6706537472696E67001070726F70657274795F76657273696F6E02"
];
var COIN_ABIS = [
  "01087472616E73666572000000000000000000000000000000000000000000000000000000000000000104636F696E3C205472616E73666572732060616D6F756E7460206F6620636F696E732060436F696E54797065602066726F6D206066726F6D6020746F2060746F602E0109636F696E5F747970650202746F0406616D6F756E7402"
];

// src/coin_client.ts
var CoinClient = class {
  constructor(aptosClient) {
    this.aptosClient = aptosClient;
    this.transactionBuilder = new TransactionBuilderABI(COIN_ABIS.map((abi) => new HexString(abi).toUint8Array()));
  }
  async transfer(from, to, amount, extraArgs) {
    var _a;
    const coinTypeToTransfer = (_a = extraArgs == null ? void 0 : extraArgs.coinType) != null ? _a : APTOS_COIN;
    const payload = this.transactionBuilder.buildTransactionPayload(
      "0x1::coin::transfer",
      [coinTypeToTransfer],
      [to.address(), amount]
    );
    return this.aptosClient.generateSignSubmitTransaction(from, payload, extraArgs);
  }
  async checkBalance(account, extraArgs) {
    var _a;
    const coinType = (_a = extraArgs == null ? void 0 : extraArgs.coinType) != null ? _a : APTOS_COIN;
    const typeTag = `0x1::coin::CoinStore<${coinType}>`;
    const resources = await this.aptosClient.getAccountResources(account.address());
    const accountResource = resources.find((r) => r.type === typeTag);
    return BigInt(accountResource.data.coin.value);
  }
};

// src/faucet_client.ts
var FaucetClient = class extends AptosClient {
  constructor(nodeUrl, faucetUrl, config) {
    var _a, _b, _c;
    super(nodeUrl, config);
    if (!faucetUrl) {
      throw new Error("Faucet URL cannot be empty.");
    }
    this.faucetRequester = new AxiosHttpRequest({
      BASE: faucetUrl,
      VERSION: (_a = config == null ? void 0 : config.VERSION) != null ? _a : "0.1.0",
      WITH_CREDENTIALS: (_b = config == null ? void 0 : config.WITH_CREDENTIALS) != null ? _b : false,
      CREDENTIALS: (_c = config == null ? void 0 : config.CREDENTIALS) != null ? _c : "include",
      TOKEN: config == null ? void 0 : config.TOKEN,
      USERNAME: config == null ? void 0 : config.USERNAME,
      PASSWORD: config == null ? void 0 : config.PASSWORD,
      HEADERS: config == null ? void 0 : config.HEADERS,
      ENCODE_PATH: config == null ? void 0 : config.ENCODE_PATH
    });
  }
  async fundAccount(address, amount, timeoutSecs = DEFAULT_TXN_TIMEOUT_SEC) {
    const tnxHashes = await this.faucetRequester.request({
      method: "POST",
      url: "/mint",
      query: {
        address: HexString.ensure(address).noPrefix(),
        amount
      }
    });
    const promises = [];
    for (let i = 0; i < tnxHashes.length; i += 1) {
      const tnxHash = tnxHashes[i];
      promises.push(this.waitForTransaction(tnxHash, { timeoutSecs }));
    }
    await Promise.all(promises);
    return tnxHashes;
  }
};

// src/token_client.ts
var TokenClient = class {
  constructor(aptosClient) {
    this.aptosClient = aptosClient;
    this.transactionBuilder = new TransactionBuilderABI(TOKEN_ABIS.map((abi) => new HexString(abi).toUint8Array()));
  }
  async createCollection(account, name, description, uri, maxAmount = MAX_U64_BIG_INT, extraArgs) {
    const payload = this.transactionBuilder.buildTransactionPayload(
      "0x3::token::create_collection_script",
      [],
      [name, description, uri, maxAmount, [false, false, false]]
    );
    return this.aptosClient.generateSignSubmitTransaction(account, payload, extraArgs);
  }
  async createToken(account, collectionName, name, description, supply, uri, max = MAX_U64_BIG_INT, royalty_payee_address = account.address(), royalty_points_denominator = 0, royalty_points_numerator = 0, property_keys = [], property_values = [], property_types = [], extraArgs) {
    const payload = this.transactionBuilder.buildTransactionPayload(
      "0x3::token::create_token_script",
      [],
      [
        collectionName,
        name,
        description,
        supply,
        max,
        uri,
        royalty_payee_address,
        royalty_points_denominator,
        royalty_points_numerator,
        [false, false, false, false, false],
        property_keys,
        property_values,
        property_types
      ]
    );
    return this.aptosClient.generateSignSubmitTransaction(account, payload, extraArgs);
  }
  async offerToken(account, receiver, creator, collectionName, name, amount, property_version = 0, extraArgs) {
    const payload = this.transactionBuilder.buildTransactionPayload(
      "0x3::token_transfers::offer_script",
      [],
      [receiver, creator, collectionName, name, property_version, amount]
    );
    return this.aptosClient.generateSignSubmitTransaction(account, payload, extraArgs);
  }
  async claimToken(account, sender, creator, collectionName, name, property_version = 0, extraArgs) {
    const payload = this.transactionBuilder.buildTransactionPayload(
      "0x3::token_transfers::claim_script",
      [],
      [sender, creator, collectionName, name, property_version]
    );
    return this.aptosClient.generateSignSubmitTransaction(account, payload, extraArgs);
  }
  async cancelTokenOffer(account, receiver, creator, collectionName, name, property_version = 0, extraArgs) {
    const payload = this.transactionBuilder.buildTransactionPayload(
      "0x3::token_transfers::cancel_offer_script",
      [],
      [receiver, creator, collectionName, name, property_version]
    );
    return this.aptosClient.generateSignSubmitTransaction(account, payload, extraArgs);
  }
  async directTransferToken(sender, receiver, creator, collectionName, name, amount, propertyVersion = 0, extraArgs) {
    const payload = this.transactionBuilder.buildTransactionPayload(
      "0x3::token::direct_transfer_script",
      [],
      [creator, collectionName, name, propertyVersion, amount]
    );
    const rawTxn = await this.aptosClient.generateRawTransaction(sender.address(), payload, extraArgs);
    const multiAgentTxn = new aptos_types_exports.MultiAgentRawTransaction(rawTxn, [
      aptos_types_exports.AccountAddress.fromHex(receiver.address())
    ]);
    const senderSignature = new aptos_types_exports.Ed25519Signature(
      sender.signBuffer(TransactionBuilder.getSigningMessage(multiAgentTxn)).toUint8Array()
    );
    const senderAuthenticator = new aptos_types_exports.AccountAuthenticatorEd25519(
      new aptos_types_exports.Ed25519PublicKey(sender.signingKey.publicKey),
      senderSignature
    );
    const receiverSignature = new aptos_types_exports.Ed25519Signature(
      receiver.signBuffer(TransactionBuilder.getSigningMessage(multiAgentTxn)).toUint8Array()
    );
    const receiverAuthenticator = new aptos_types_exports.AccountAuthenticatorEd25519(
      new aptos_types_exports.Ed25519PublicKey(receiver.signingKey.publicKey),
      receiverSignature
    );
    const multiAgentAuthenticator = new aptos_types_exports.TransactionAuthenticatorMultiAgent(
      senderAuthenticator,
      [aptos_types_exports.AccountAddress.fromHex(receiver.address())],
      [receiverAuthenticator]
    );
    const bcsTxn = bcsToBytes(new aptos_types_exports.SignedTransaction(rawTxn, multiAgentAuthenticator));
    const transactionRes = await this.aptosClient.submitSignedBCSTransaction(bcsTxn);
    return transactionRes.hash;
  }
  async getCollectionData(creator, collectionName) {
    const resources = await this.aptosClient.getAccountResources(creator);
    const accountResource = resources.find(
      (r) => r.type === "0x3::token::Collections"
    );
    const { handle } = accountResource.data.collection_data;
    const getCollectionTableItemRequest = {
      key_type: "0x1::string::String",
      value_type: "0x3::token::CollectionData",
      key: collectionName
    };
    const collectionTable = await this.aptosClient.getTableItem(handle, getCollectionTableItemRequest);
    return collectionTable;
  }
  async getTokenData(creator, collectionName, tokenName) {
    const creatorHex = creator instanceof HexString ? creator.hex() : creator;
    const collection = await this.aptosClient.getAccountResource(
      creatorHex,
      "0x3::token::Collections"
    );
    const { handle } = collection.data.token_data;
    const tokenDataId = {
      creator: creatorHex,
      collection: collectionName,
      name: tokenName
    };
    const getTokenTableItemRequest = {
      key_type: "0x3::token::TokenDataId",
      value_type: "0x3::token::TokenData",
      key: tokenDataId
    };
    return this.aptosClient.getTableItem(handle, getTokenTableItemRequest);
  }
  async getToken(creator, collectionName, tokenName, property_version = "0") {
    const tokenDataId = {
      creator: creator instanceof HexString ? creator.hex() : creator,
      collection: collectionName,
      name: tokenName
    };
    return this.getTokenForAccount(creator, {
      token_data_id: tokenDataId,
      property_version
    });
  }
  async getTokenForAccount(account, tokenId) {
    const tokenStore = await this.aptosClient.getAccountResource(
      account instanceof HexString ? account.hex() : account,
      "0x3::token::TokenStore"
    );
    const { handle } = tokenStore.data.tokens;
    const getTokenTableItemRequest = {
      key_type: "0x3::token::TokenId",
      value_type: "0x3::token::Token",
      key: tokenId
    };
    try {
      return await this.aptosClient.getTableItem(handle, getTokenTableItemRequest);
    } catch (error) {
      if (error.status === 404) {
        return {
          id: tokenId,
          amount: "0"
        };
      }
      return error;
    }
  }
};

// src/token_types.ts
var token_types_exports = {};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ApiError,
  AptosAccount,
  AptosClient,
  BCS,
  CoinClient,
  FailedTransactionError,
  FaucetClient,
  HexString,
  TokenClient,
  TokenTypes,
  TransactionBuilder,
  TransactionBuilderABI,
  TransactionBuilderEd25519,
  TransactionBuilderMultiEd25519,
  TransactionBuilderRemoteABI,
  TxnBuilderTypes,
  TypeTagParser,
  Types,
  WaitForTransactionError,
  derivePath
});
//# sourceMappingURL=index.js.map