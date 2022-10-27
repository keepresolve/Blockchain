const aptos = require("aptos");
const Nacl = require("tweetnacl");
const bip39 = require("bip39");
const SHA3 = require("js-sha3");
const { derivePath } = require("ed25519-hd-key");

const NODE_URL = process.env.APTOS_NODE_URL || "https://fullnode.devnet.aptoslabs.com";
const FAUCET_URL = process.env.APTOS_FAUCET_URL || "https://faucet.devnet.aptoslabs.com";

const client = new aptos.AptosClient(NODE_URL);
const faucetClient = new aptos.FaucetClient(NODE_URL, FAUCET_URL, null);
const aptosCoin = "0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>";
const MAX_U32_NUMBER = Math.pow(2, 32) - 1;
const MAX_U64_BIG_INT = BigInt(/*#__PURE__*/ Math.pow(2, 64)) - 1n;

const bytesToHex = (buffer) =>
  Array.from(buffer)
    .map((x) => x.toString(16).padStart(2, "0"))
    .join("");
function deserializeVector(deserializer, cls) {
  const length = deserializer.deserializeUleb128AsU32();
  const list = [];
  for (let i = 0; i < length; i += 1) {
    list.push(cls.deserialize(deserializer));
  }
  return list;
}
function serializeVector(value, serializer) {
  serializer.serializeU32AsUleb128(value.length);
  value.forEach((item) => {
    item.serialize(serializer);
  });
}
class Serializer {
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

  serializeWithFunction(
    fn = () => {}, // (byteOffset, value, littleEndian) =>
    bytesLength,
    value
  ) {
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

    // write little endian number
    this.serializeU32(Number(low));
    this.serializeU32(Number(high));
  }

  /**
   * Serializes a uint128 number.
   *
   * BCS layout for "uint128": Sixteen bytes. Binary format in little-endian representation.
   */

  serializeU128(value) {
    const low = BigInt(value.toString()) & MAX_U64_BIG_INT;
    const high = BigInt(value.toString()) >> BigInt(64);

    // write little endian number
    this.serializeU64(low);
    this.serializeU64(high);
  }

  serializeU32AsUleb128(val) {
    let value = val;
    const valueArray = [];
    while (value >>> 7 !== 0) {
      valueArray.push((value & 0x7f) | 0x80);
      value >>>= 7;
    }
    valueArray.push(value);
    this.serialize(new Uint8Array(valueArray));
  }

  /**
   * Returns the buffered bytes
   */
  getBytes() {
    return new Uint8Array(this.buffer).slice(0, this.offset);
  }
}

function bcsToBytes(value) {
  const serializer = new Serializer();
  value.serialize(serializer);
  return serializer.getBytes();
}

function generateMnemonic() {
  const mnemonic = bip39.generateMnemonic();
  return mnemonic;
  // nacl.sign.keyPair.fromSeed(seed)
}

function keyPair() {
  return Nacl.sign.keyPair();
}

/**
 * payload.function, payload.type_arguments, payload.arguments
 */
//  const payload = {
//     type: "entry_function_payload",
//     function: "0x1::coin::transfer",
//     type_arguments: ["0x1::aptos_coin::AptosCoin"],
//     arguments: [address2, 717],
//   };

class ArgumentABI {
  /**
   * Constructs an ArgumentABI instance.
   * @param name
   * @param type_tag
   */
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
}

class TransactionPayload {
  deserialize(deserializer) {
    const index = deserializer.deserializeUleb128AsU32();
    switch (index) {
      case 0:
        return TransactionPayloadScript.load(deserializer);
      // TODO: change to 1 once ModuleBundle has been removed from rust
      case 2:
        return TransactionPayloadEntryFunction.load(deserializer);
      default:
        throw new Error(`Unknown variant index for TransactionPayload: ${index}`);
    }
  }
}
class EntryFunction {
  constructor(module_name, function_name, ty_args, args) {
    this.module_name = module_name;
    this.function_name = function_name;
    this.ty_args = ty_args;
    this.args = args;
  }
  static natural(module, func, ty_args, args) {
    return new EntryFunction(ModuleId.fromStr(module), new Identifier(func), ty_args, args);
  }

  /**
   * `natual` is deprecated, please use `natural`
   *
   * @deprecated.
   */
  static natual(module, func, ty_args, args) {
    return EntryFunction.natural(module, func, ty_args, args);
  }

  serialize(serializer) {
    this.module_name.serialize(serializer);
    this.function_name.serialize(serializer);
    serializeVector < TypeTag > (this.ty_args, serializer);

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
}
class TransactionPayloadEntryFunction extends TransactionPayload {
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
}

class TransactionPayloadScript extends TransactionPayload {
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
}
class ChainId {
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
}
class Deserializer {
  constructor(data) {
    // copies data to prevent outside mutation of buffer.
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

  /**
   * Deserializes an array of bytes.
   *
   * BCS layout for "bytes": bytes_length | bytes. bytes_length is the length of the bytes array that is
   * uleb128 encoded. bytes_length is a u32 integer.
   */
  deserializeBytes() {
    const len = this.deserializeUleb128AsU32();
    return new Uint8Array(this.read(len));
  }

  /**
   * Deserializes an array of bytes. The number of bytes to read is already known.
   *
   */
  deserializeFixedBytes(len) {
    return new Uint8Array(this.read(len));
  }

  /**
   * Deserializes a boolean value.
   *
   * BCS layout for "boolean": One byte. "0x01" for True and "0x00" for False.
   */
  deserializeBool() {
    const bool = new Uint8Array(this.read(1))[0];
    if (bool !== 1 && bool !== 0) {
      throw new Error("Invalid boolean value");
    }
    return bool === 1;
  }

  /**
   * Deserializes a uint8 number.
   *
   * BCS layout for "uint8": One byte. Binary format in little-endian representation.
   */
  deserializeU8() {
    return new DataView(this.read(1)).getUint8(0);
  }

  /**
   * Deserializes a uint16 number.
   *
   * BCS layout for "uint16": Two bytes. Binary format in little-endian representation.
   * @example
   * ```ts
   * const deserializer = new Deserializer(new Uint8Array([0x34, 0x12]));
   * assert(deserializer.deserializeU16() === 4660);
   * ```
   */
  deserializeU16() {
    return new DataView(this.read(2)).getUint16(0, true);
  }

  /**
   * Deserializes a uint32 number.
   *
   * BCS layout for "uint32": Four bytes. Binary format in little-endian representation.
   * @example
   * ```ts
   * const deserializer = new Deserializer(new Uint8Array([0x78, 0x56, 0x34, 0x12]));
   * assert(deserializer.deserializeU32() === 305419896);
   * ```
   */
  deserializeU32() {
    return new DataView(this.read(4)).getUint32(0, true);
  }

  /**
   * Deserializes a uint64 number.
   *
   * BCS layout for "uint64": Eight bytes. Binary format in little-endian representation.
   * @example
   * ```ts
   * const deserializer = new Deserializer(new Uint8Array([0x00, 0xEF, 0xCD, 0xAB, 0x78, 0x56, 0x34, 0x12]));
   * assert(deserializer.deserializeU64() === 1311768467750121216);
   * ```
   */
  deserializeU64() {
    const low = this.deserializeU32();
    const high = this.deserializeU32();

    // combine the two 32-bit values and return (little endian)
    return BigInt((BigInt(high) << BigInt(32)) | BigInt(low));
  }

  /**
   * Deserializes a uint128 number.
   *
   * BCS layout for "uint128": Sixteen bytes. Binary format in little-endian representation.
   */
  deserializeU128() {
    const low = this.deserializeU64();
    const high = this.deserializeU64();

    // combine the two 64-bit values and return (little endian)
    return BigInt((high << BigInt(64)) | low);
  }

  /**
   * Deserializes a uleb128 encoded uint32 number.
   *
   * BCS use uleb128 encoding in two cases: (1) lengths of variable-length sequences and (2) tags of enum values
   */
  deserializeUleb128AsU32() {
    let value = 0n;
    let shift = 0;

    while (value < MAX_U32_NUMBER) {
      const byte = this.deserializeU8();
      value |= BigInt(byte & 0x7f) << BigInt(shift);

      if ((byte & 0x80) === 0) {
        break;
      }
      shift += 7;
    }

    if (value > MAX_U32_NUMBER) {
      throw new Error("Overflow while parsing uleb128-encoded uint32 value");
    }

    return Number(value);
  }
}

class TypeTagParser {
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

    // Pop left most element out
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
      const [moduleTokenTy, module] = this.tokens.shift();
      if (moduleTokenTy !== "IDENT") {
        bail("Invalid type tag.");
      }
      this.consume("::");
      const [nameTokenTy, name] = this.tokens.shift();
      if (nameTokenTy !== "IDENT") {
        bail("Invalid type tag.");
      }

      let tyTags = [];
      // Check if the struct has ty args
      if (this.tokens.length > 0 && this.tokens[0][1] === "<") {
        this.consume("<");
        tyTags = this.parseCommaList(">", true);
        this.consume(">");
      }

      const structTag = new StructTag(AccountAddress.fromHex(address), new Identifier(module), new Identifier(name), tyTags);
      return new TypeTagStruct(structTag);
    }

    throw new Error("Invalid type tag.");
  }
}

class ScriptABI {
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
}

class TransactionScriptABI {
  /**
   * Constructs a TransactionScriptABI instance.
   * @param name Entry function name
   * @param doc
   * @param code
   * @param ty_args
   * @param args
   */
  constructor(name, doc, code, ty_args, args) {
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
}

class TypeArgumentABI {
  /**
   * Constructs a TypeArgumentABI instance.
   * @param name
   */
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
}
class EntryFunctionABI extends ScriptABI {
  constructor(name, module_name, doc, ty_args, args) {
    super();
    this.name = name;
    this.module_name = module_name;
    this.doc = doc;
    this.ty_args = ty_args;
    this.args = args;
  }

  // deserialize(deserializer) {
  //     const index = deserializer.deserializeUleb128AsU32();
  //     switch (index) {
  //         case 0:
  //             return TransactionScriptABI.load(deserializer);
  //         case 1:
  //             return EntryFunctionABI.load(deserializer);
  //         default:
  //             throw new Error(`Unknown variant index for TransactionPayload: ${index}`);
  //     }
  // }
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

// Returns Token and Token byte size
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
class TypeTag {
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
}

class TypeTagBool extends TypeTag {
  serialize(serializer) {
    serializer.serializeU32AsUleb128(0);
  }

  static load(deserializer) {
    return new TypeTagBool();
  }
}

class TypeTagU8 extends TypeTag {
  serialize(serializer) {
    serializer.serializeU32AsUleb128(1);
  }

  static load(_deserializer) {
    return new TypeTagU8();
  }
}

class TypeTagU64 extends TypeTag {
  serialize(serializer) {
    serializer.serializeU32AsUleb128(2);
  }

  static load(_deserializer) {
    return new TypeTagU64();
  }
}

class TypeTagU128 extends TypeTag {
  serialize(serializer) {
    serializer.serializeU32AsUleb128(3);
  }

  static load(_deserializer) {
    return new TypeTagU128();
  }
}

class TypeTagAddress extends TypeTag {
  serialize(serializer) {
    serializer.serializeU32AsUleb128(4);
  }

  static load(_deserializer) {
    return new TypeTagAddress();
  }
}

class TypeTagSigner extends TypeTag {
  serialize(serializer) {
    serializer.serializeU32AsUleb128(5);
  }

  static load(_deserializer) {
    return new TypeTagSigner();
  }
}

class TypeTagVector extends TypeTag {
  constructor(value) {
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
}

class TypeTagStruct extends TypeTag {
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
}

class Identifier {
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
}
class StructTag {
  constructor(address, module_name, name, type_args) {
    this.address = address;
    this.module_name = module_name;
    this.name = name;
    this.type_args = type_args;
  }

  static fromString(structTag) {
    // Type args are not supported in string literal
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
}
class ModuleId {
  /**
   * Full name of a module.
   * @param address The account address.
   * @param name The name of the module under the account at "address".
   */
  constructor(address, name) {
    this.name = name;
    this.address = address;
  }

  /**
   * Converts a string literal to a ModuleId
   * @param moduleId String literal in format "AccountAddress::module_name",
   *   e.g. "0x1::coin"
   * @returns
   */
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
}
const zeroPadHex = (hex) => (hex.length % 2 === 1 ? `0${hex}` : hex);

/**
 * Converts a hexadecimal string to a {@link Uint8Array}.
 *
 * @param buffer The buffer to convert.
 * @returns
 */
const hexToBytes = (hex) => {
  if (hex.length === 0) {
    return new Uint8Array();
  }
  const hexNormalized = zeroPadHex(hex);

  return Uint8Array.from((hexNormalized.match(/.{1,2}/g) || []).map((byte) => parseInt(byte, 16)));
};
class HexString {
  /// We want to make sure this hexString has the `0x` hex prefix

  /**
   * Creates new hex string from Buffer
   * @param buffer A buffer to convert
   * @returns New HexString
   */
  static fromBuffer(buffer) {
    return HexString.fromUint8Array(buffer);
  }

  /**
   * Creates new hex string from Uint8Array
   * @param arr Uint8Array to convert
   * @returns New HexString
   */
  static fromUint8Array(arr) {
    return new HexString(bytesToHex(arr));
  }

  /**
   * Ensures `hexString` is instance of `HexString` class
   * @param hexString String to check
   * @returns New HexString if `hexString` is regular string or `hexString` if it is HexString instance
   * @example
   * ```
   *  const regularString = "string";
   *  const hexString = new HexString("string"); // "0xstring"
   *  HexString.ensure(regularString); // "0xstring"
   *  HexString.ensure(hexString); // "0xstring"
   * ```
   */
  static ensure(hexString) {
    if (typeof hexString === "string") {
      return new HexString(hexString);
    }
    return hexString;
  }

  /**
   * Creates new HexString instance from regular string. If specified string already starts with "0x" prefix,
   * it will not add another one
   * @param hexString String to convert
   * @example
   * ```
   *  const string = "string";
   *  new HexString(string); // "0xstring"
   * ```
   */
  constructor(hexString) {
    if (hexString.startsWith("0x")) {
      this.hexString = hexString;
    } else {
      this.hexString = `0x${hexString}`;
    }
  }

  /**
   * Getter for inner hexString
   * @returns Inner hex string
   */
  hex() {
    return this.hexString;
  }

  /**
   * Getter for inner hexString without prefix
   * @returns Inner hex string without prefix
   * @example
   * ```
   *  const hexString = new HexString("string"); // "0xstring"
   *  hexString.noPrefix(); // "string"
   * ```
   */
  noPrefix() {
    return this.hexString.slice(2);
  }

  /**
   * Overrides default `toString` method
   * @returns Inner hex string
   */
  toString() {
    return this.hex();
  }

  /**
   * Trimmes extra zeroes in the begining of a string
   * @returns Inner hexString without leading zeroes
   * @example
   * ```
   *  new HexString("0x000000string").toShortString(); // result = "0xstring"
   * ```
   */
  toShortString() {
    const trimmed = this.hexString.replace(/^0x0*/, "");
    return `0x${trimmed}`;
  }

  /**
   * Converts hex string to a Uint8Array
   * @returns Uint8Array from inner hexString without prefix
   */
  toUint8Array() {
    return Uint8Array.from(hexToBytes(this.noPrefix()));
  }
}

class AccountAddress {
  static LENGTH = 32;

  constructor(address) {
    //   if (address.length !== AccountAddress.LENGTH) {
    //     throw new Error("Expected address of length 32");
    //   }
    this.address = address;
  }

  /**
   * Creates AccountAddress from a hex string.
   * @param addr Hex string can be with a prefix or without a prefix,
   *   e.g. '0x1aa' or '1aa'. Hex string will be left padded with 0s if too short.
   */
  static fromHex(addr) {
    let address = HexString.ensure(addr);

    // If an address hex has odd number of digits, padd the hex string with 0
    // e.g. '1aa' would become '01aa'.
    if (address.noPrefix().length % 2 !== 0) {
      address = new HexString(`0${address.noPrefix()}`);
    }

    const addressBytes = address.toUint8Array();
    // console.log(address, addressBytes)

    if (addressBytes.length > AccountAddress.LENGTH) {
      // eslint-disable-next-line quotes
      throw new Error("Hex string is too long. Address's length is 32 bytes.");
    } else if (addressBytes.length === AccountAddress.LENGTH) {
      return new AccountAddress(addressBytes);
    }

    const res = new Uint8Array(AccountAddress.LENGTH);
    res.set(addressBytes, AccountAddress.LENGTH - addressBytes.length);

    return new AccountAddress(res);
  }

  serialize(serializer) {
    serializer.serializeFixedBytes(this.address);
  }

  static deserialize(deserializer) {
    return new AccountAddress(deserializer.deserializeFixedBytes(AccountAddress.LENGTH));
  }
}

function getPrivateKey(mnemonics) {
  const normalizeMnemonics = mnemonics
    .trim()
    .split(/\s+/)
    .map((part) => part.toLowerCase())
    .join(" ");

  const secretKey = bip39.mnemonicToSeedSync(normalizeMnemonics);

  const { key } = derivePath("m/44'/637'/0'/0'/0'", bytesToHex(secretKey));
  const uint8 = new Uint8Array(key);

  const signingKey = Nacl.sign.keyPair.fromSeed(uint8.slice(0, 32));
  // console.log("signingKey___", signingKey);

  return "0x" + bytesToHex(signingKey.secretKey.slice(0, 32));
}
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

function assertType(val, types, message) {
  if (!types?.includes(typeof val)) {
    throw new Error(message || `Invalid arg: ${val} type should be ${types instanceof Array ? types.join(" or ") : types}`);
  }
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
    // We are serializing a vector<u8>
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
function getAddress(privateKey) {
  privateKey = new Uint8Array(Buffer.from(privateKey.replace(/^0x/, ""), "hex"));
  const { publicKey } = Nacl.sign.keyPair.fromSeed(privateKey);
  const hash = SHA3.sha3_256.create();
  // console.log("publicKey", publicKey);
  hash.update(publicKey);
  hash.update("\x00");
  let address = hash.hex();
  return address.startsWith("0x") ? address : "0x" + address;
}


async function signTransaction1(payload, account1) {
  const RAW_TRANSACTION_SALT = "APTOS::RawTransaction";
  const RAW_TRANSACTION_WITH_DATA_SALT = "APTOS::RawTransactionWithData";

  const utils = {
    normlize: (s) => s.replace(/^0[xX]0*/g, "0x"),
    bcsToBytes(value) {
      const serializer = new Serializer();
      value.serialize(serializer);
      return serializer.getBytes();
    },
    getParams(func, ty_tags, args) {
      func = utils.normlize(func);
      const funcNameParts = func.split("::");
      const [addr, module] = func.split("::");
      return {
        funcNameParts,
        addr,
        module,
        func,
        ty_tags,
        args,
      };
    },
  };
  const APi = {
    async fetchABI(addr) {
      const modules = await client.getAccountModules(addr);
      const abis = modules
        .map((module) => module.abi)
        .flatMap((abi) =>
          abi.exposed_functions
            .filter((ef) => ef.is_entry)
            .map((ef) => ({
              fullName: `${abi.address}::${abi.name}::${ef.name}`,
              ...ef,
            }))
        );

      const abiMap = new Map();
      abis.forEach((abi) => {
        abiMap.set(abi.fullName, abi);
      });

      return abiMap;
    },
  };

  class TransactionBuilder {
    constructor(signingFunction, rawTxnBuilder) {
      this.signingFunction = signingFunction;
      this.rawTxnBuilder = rawTxnBuilder;
    }

    /**
     * Builds a RawTransaction. Relays the call to TransactionBuilderABI.build
     * @param func
     * @param ty_tags
     * @param args
     */
    build(func, ty_tags = [], args = []) {
      if (!this.rawTxnBuilder) {
        throw new Error("this.rawTxnBuilder doesn't exist.");
      }

      return this.rawTxnBuilder.build(func, ty_tags, args);
    }

    /** Generates a Signing Message out of a raw transaction. */
    static getSigningMessage(rawTxn) {
      const hash = SHA3.sha3_256.create();
      console.log("getSigningMessage", rawTxn);
      if (rawTxn instanceof RawTransaction) {
        hash.update(RAW_TRANSACTION_SALT);
        //   } else if (rawTxn instanceof MultiAgentRawTransaction) {
        //     hash.update(RAW_TRANSACTION_WITH_DATA_SALT);
        //   } else {
        //     throw new Error("Unknown transaction type.");
      }

      const prefix = new Uint8Array(hash.arrayBuffer());

      const body = bcsToBytes(rawTxn);

      const mergedArray = new Uint8Array(prefix.length + body.length);
      mergedArray.set(prefix);
      mergedArray.set(body, prefix.length);

      return mergedArray;
    }
  }
  class RawTransaction {
    /**
     * RawTransactions contain the metadata and payloads that can be submitted to Aptos chain for execution.
     * RawTransactions must be signed before Aptos chain can execute them.
     *
     * @param sender Account address of the sender.
     * @param sequence_number Sequence number of this transaction. This must match the sequence number stored in
     *   the sender's account at the time the transaction executes.
     * @param payload Instructions for the Aptos Blockchain, including publishing a module,
     *   execute a entry function or execute a script payload.
     * @param max_gas_amount Maximum total gas to spend for this transaction. The account must have more
     *   than this gas or the transaction will be discarded during validation.
     * @param gas_unit_price Price to be paid per gas unit.
     * @param expiration_timestamp_secs The blockchain timestamp at which the blockchain would discard this transaction.
     * @param chain_id The chain ID of the blockchain that this transaction is intended to be run on.
     */
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
      return new RawTransaction(sender, sequence_number, payload, max_gas_amount, gas_unit_price, expiration_timestamp_secs, chain_id);
    }
  }

  class Ed25519PublicKey {
    static LENGTH = 32;

    constructor(value) {
      if (value.length !== Ed25519PublicKey.LENGTH) {
        throw new Error(`Ed25519PublicKey length should be ${Ed25519PublicKey.LENGTH}`);
      }
      this.value = value;
    }

    serialize(serializer) {
      serializer.serializeBytes(this.value);
    }

    static deserialize(deserializer) {
      const value = deserializer.deserializeBytes();
      return new Ed25519PublicKey(value);
    }
  }

  /**
   * TransactionAuthenticator
   */
  class TransactionAuthenticatorEd25519 {
    constructor(public_key, signature) {
      // super();
      this.public_key = public_key;
      this.signature = signature;
    }

    serialize(serializer) {
      serializer.serializeU32AsUleb128(0);
      this.public_key.serialize(serializer);
      this.signature.serialize(serializer);
    }
    deserialize(deserializer) {
      const index = deserializer.deserializeUleb128AsU32();
      switch (index) {
        case 0:
          return TransactionAuthenticatorEd25519.load(deserializer);
        // case 1:
        //     return TransactionAuthenticatorMultiEd25519.load(deserializer);
        // case 2:
        //     return TransactionAuthenticatorMultiAgent.load(deserializer);
        default:
          throw new Error(`Unknown variant index for TransactionAuthenticator: ${index}`);
      }
    }

    static load(deserializer) {
      const public_key = Ed25519PublicKey.deserialize(deserializer);
      const signature = Ed25519Signature.deserialize(deserializer);
      return new TransactionAuthenticatorEd25519(public_key, signature);
    }
  }

  class TransactionBuilderEd25519 extends TransactionBuilder {
    constructor(signingFunction, publicKey, rawTxnBuilder) {
      super(signingFunction, rawTxnBuilder);
      this.publicKey = publicKey;
    }

    rawToSigned(rawTxn) {
      const signingMessage = TransactionBuilder.getSigningMessage(rawTxn);
      const signature = this.signingFunction(signingMessage);

      const authenticator = new TransactionAuthenticatorEd25519(new Ed25519PublicKey(this.publicKey), signature);

      class SignedTransaction {
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
      }

      return new SignedTransaction(rawTxn, authenticator);
    }

    /** Signs a raw transaction and returns a bcs serialized transaction. */
    sign(rawTxn) {
      return bcsToBytes(this.rawToSigned(rawTxn));
    }
  }

  class Ed25519Signature {
    static LENGTH = 64;

    constructor(value) {
      if (value.length !== Ed25519Signature.LENGTH) {
        throw new Error(`Ed25519Signature length should be ${Ed25519Signature.LENGTH}`);
      }
      this.value = value;
    }

    serialize(serializer) {
      serializer.serializeBytes(this.value);
    }

    static deserialize(deserializer) {
      const value = deserializer.deserializeBytes();
      return new Ed25519Signature(value);
    }
  }
  class TransactionBuilderABI {
    constructor(abis, builderConfig) {
      this.abiMap = new Map();

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
        gasUnitPrice: 1n,
        maxGasAmount: 2000n,
        expSecFromNow: 20,
        ...builderConfig,
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
        payload = new TransactionPayloadEntryFunction(new EntryFunction(funcABI.module_name, new Identifier(funcABI.name), typeTags, bcsArgs));
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

      const senderAccount = sender instanceof AccountAddress ? sender : AccountAddress.fromHex(sender);
      const expTimestampSec = BigInt(Math.floor(Date.now() / 1000) + Number(expSecFromNow));
      const payload = this.buildTransactionPayload(func, ty_tags, args);

      if (payload) {
        return new RawTransaction(senderAccount, BigInt(sequenceNumber), payload, BigInt(maxGasAmount), BigInt(gasUnitPrice), expTimestampSec, new ChainId(Number(chainId)));
      }

      throw new Error("Invalid ABI.");
    }
  }

  if (payload?.sequence_number) {
    config.sequenceNumber = options.sequence_number;
  }

  if (payload?.gas_unit_price) {
    config.gasUnitPrice = options.gas_unit_price;
  }

  if (payload?.max_gas_amount) {
    config.maxGasAmount = options.max_gas_amount;
  }

  if (payload?.expiration_timestamp_secs) {
    const timestamp = Number.parseInt(options.expiration_timestamp_secs, 10);
    config.expSecFromNow = timestamp - Math.floor(Date.now() / 1000);
  }

  const sender = payload.sender instanceof AccountAddress ? payload.sender : AccountAddress.fromHex(payload.sender);

  const params = utils.getParams(payload.function, payload.type_arguments, payload.arguments);
 

  const funcAbi = abiMap.get(params.func);
  const originalArgs = funcAbi.params.filter((param) => param !== "signer" && param !== "&signer");
  const typeArgABIs = originalArgs.map((arg, i) => new ArgumentABI(`var${i}`, new TypeTagParser(arg).parseTypeTag()));
  const entryFunctionABI = new EntryFunctionABI(
    funcAbi.name,
    ModuleId.fromStr(`${params.addr}::${params.module}`),
    "", // Doc string
    funcAbi.generic_type_params.map((_, i) => new TypeArgumentABI(`${i}`)),
    typeArgABIs
  );

  const [{ sequence_number }, chainId] = await Promise.all([client.getAccount(payload.sender), client.getChainId()]);
  const builderABI = new TransactionBuilderABI([utils.bcsToBytes(entryFunctionABI)], {
    sender,
    sequenceNumber: sequence_number,
    chainId,
    ...payload,
  });

  const rawTxn = builderABI.build(params.func, payload.type_arguments, payload.arguments);

  console.log("rawTxn1", rawTxn);
  // return client.signTransaction(account1, rawTxn);

  const txnBuilder = new TransactionBuilderEd25519((signingMessage) => {
    // let  sigHexStr =  Nacl.sign(signingMessage, account1.signingKey.secretKey);
    // HexString.fromUint8Array(sigHexStr.slice(0, 64)).toUint8Array()

    // const sigHexStr = account1.signBuffer(signingMessage);
    return new Ed25519Signature(sigHexStr.toUint8Array());
    // const invalidSigBytes = new Uint8Array(64);
    // return new Ed25519Signature(invalidSigBytes);
  }, account1.pubKey().toUint8Array());

  return txnBuilder.sign(rawTxn);
}
(async () => {
  const Mnemonic = "humble angry animal ethics student steel safe donkey glove page tunnel away";
  const privateKey = getPrivateKey(Mnemonic);
  const address = getAddress(privateKey);
  const address2 = "0xffc0e193508c8eef01719e9c947f8b9539bb6fda4a0101d2d1b3e528aeb0ba7d";
  const account1 = new aptos.AptosAccount(new Uint8Array(Buffer.from(privateKey.replace(/^0x/, ""), "hex")));

  const payload = {
    type: "entry_function_payload",
    function: "0x1::coin::transfer",
    type_arguments: ["0x1::aptos_coin::AptosCoin"],
    arguments: [address2, 1000],
    sender: address,
  };

  try {
    const txnRequest = await client.generateTransaction(address, payload);
    console.log("rawTxn", txnRequest);
    const signedTxn = await client.signTransaction(account1, txnRequest);
    console.log("signedTxn", JSON.stringify(signedTxn))

    const txnRequest2 = await signTransaction1(payload, account1);
    console.log("signedTxn1", JSON.stringify(txnRequest2));


    // const transactionRes = (await client.simulateTransaction(account1, txnRequest))[0]

    // console.log("transactionRes",transactionRes)

    // const transactionRes = await client.submitTransaction(txnRequest2);
    // await client.waitForTransaction(transactionRes.hash);
    // console.log(client.client.request.request)
    const r =  await client.client.request.request({
        url: "/transactions",
        method: "POST",
        body: signedTxn,
        mediaType: "application/x.aptos.signed_transaction+bcs",
      });
      console.log(r)

      const resources = await client.getAccountResources(address2);
     const accountResource = resources.find((r) => r.type === aptosCoin);
      console.log(`account2 coins: ${accountResource.data.coin.value}. Should be 717!`);
  } catch (error) {
    console.log(error);
  }
})();




{"0":255,"1":192,"2":225,"3":147,"4":80,"5":140,"6":142,"7":239,"8":1,"9":113,"10":158,"11":156,"12":148,"13":127,"14":139,"15":149,"16":57,"17":187,"18":111,"19":218,"20":74,"21":1,"22":1,"23":210,"24":209,"25":179,"26":229,"27":40,"28":174,"29":176,"30":186,"31":125,"32":0,"33":0,"34":0,"35":0,"36":0,"37":0,"38":0,"39":0,"40":2,"41":0,"42":0,"43":0,"44":0,"45":0,"46":0,"47":0,"48":0,"49":0,"50":0,"51":0,"52":0,"53":0,"54":0,"55":0,"56":0,"57":0,"58":0,"59":0,"60":0,"61":0,"62":0,"63":0,"64":0,"65":0,"66":0,"67":0,"68":0,"69":0,"70":0,"71":0,"72":1,"73":4,"74":99,"75":111,"76":105,"77":110,"78":8,"79":116,"80":114,"81":97,"82":110,"83":115,"84":102,"85":101,"86":114,"87":1,"88":7,"89":0,"90":0,"91":0,"92":0,"93":0,"94":0,"95":0,"96":0,"97":0,"98":0,"99":0,"100":0,"101":0,"102":0,"103":0,"104":0,"105":0,"106":0,"107":0,"108":0,"109":0,"110":0,"111":0,"112":0,"113":0,"114":0,"115":0,"116":0,"117":0,"118":0,"119":0,"120":1,"121":10,"122":97,"123":112,"124":116,"125":111,"126":115,"127":95,"128":99,"129":111,"130":105,"131":110,"132":9,"133":65,"134":112,"135":116,"136":111,"137":115,"138":67,"139":111,"140":105,"141":110,"142":0,"143":2,"144":32,"145":255,"146":192,"147":225,"148":147,"149":80,"150":140,"151":142,"152":239,"153":1,"154":113,"155":158,"156":156,"157":148,"158":127,"159":139,"160":149,"161":57,"162":187,"163":111,"164":218,"165":74,"166":1,"167":1,"168":210,"169":209,"170":179,"171":229,"172":40,"173":174,"174":176,"175":186,"176":125,"177":8,"178":232,"179":3,"180":0,"181":0,"182":0,"183":0,"184":0,"185":0,"186":208,"187":7,"188":0,"189":0,"190":0,"191":0,"192":0,"193":0,"194":1,"195":0,"196":0,"197":0,"198":0,"199":0,"200":0,"201":0,"202":161,"203":146,"204":65,"205":99,"206":0,"207":0,"208":0,"209":0,"210":33,"211":0,"212":32,"213":23,"214":218,"215":90,"216":139,"217":159,"218":18,"219":107,"220":209,"221":126,"222":250,"223":86,"224":119,"225":50,"226":146,"227":112,"228":136,"229":232,"230":10,"231":11,"232":206,"233":123,"234":97,"235":186,"236":177,"237":6,"238":131,"239":163,"240":111,"241":248,"242":62,"243":227,"244":203,"245":64,"246":108,"247":216,"248":255,"249":193,"250":94,"251":148,"252":112,"253":118,"254":26,"255":239,"256":242,"257":178,"258":204,"259":101,"260":244,"261":137,"262":17,"263":222,"264":69,"265":56,"266":158,"267":193,"268":129,"269":62,"270":254,"271":24,"272":91,"273":201,"274":15,"275":106,"276":236,"277":92,"278":125,"279":196,"280":85,"281":10,"282":142,"283":213,"284":22,"285":152,"286":212,"287":151,"288":0,"289":130,"290":105,"291":76,"292":135,"293":254,"294":124,"295":55,"296":10,"297":86,"298":218,"299":4,"300":183,"301":189,"302":173,"303":68,"304":144,"305":27,"306":102,"307":52,"308":72,"309":0}




















// async function signTransaction(payload) {
//   const utils = {
//     normlize: (s) => s.replace(/^0[xX]0*/g, "0x"),
//     bcsToBytes(value) {
//       const serializer = new Serializer();
//       value.serialize(serializer);
//       return serializer.getBytes();
//     },
//     getParams(func, ty_tags, args) {
//       func = utils.normlize(func);
//       const funcNameParts = func.split("::");
//       const [addr, module] = func.split("::");
//       return {
//         funcNameParts,
//         addr,
//         module,
//         func,
//       };
//     },
//   };

//   //接口参数
//   async function fetchABI(addr) {
//     const modules = await client.getAccountModules(addr);
//     const abis = modules
//       .map((module) => module.abi)
//       .flatMap((abi) =>
//         abi.exposed_functions
//           .filter((ef) => ef.is_entry)
//           .map((ef) => ({
//             fullName: `${abi.address}::${abi.name}::${ef.name}`,
//             ...ef,
//           }))
//       );

//     const abiMap = new Map();
//     abis.forEach((abi) => {
//       abiMap.set(abi.fullName, abi);
//     });

//     return abiMap;
//   }

//   if (payload?.sequence_number) {
//     config.sequenceNumber = options.sequence_number;
//   }

//   if (payload?.gas_unit_price) {
//     config.gasUnitPrice = options.gas_unit_price;
//   }

//   if (payload?.max_gas_amount) {
//     config.maxGasAmount = options.max_gas_amount;
//   }

//   if (payload?.expiration_timestamp_secs) {
//     const timestamp = Number.parseInt(options.expiration_timestamp_secs, 10);
//     config.expSecFromNow = timestamp - Math.floor(Date.now() / 1000);
//   }

//   const params = utils.getParams(payload.function, payload.type_arguments, payload.arguments);
//   const abiMap = await fetchABI(params.addr);
//   const funcAbi = abiMap.get(params.func);
//   // Remove all `signer` and `&signer` from argument list because the Move VM injects those arguments. Clients do not
//   // need to care about those args. `signer` and `&signer` are required be in the front of the argument list. But we
//   // just loop through all arguments and filter out `signer` and `&signer`.
//   const originalArgs = funcAbi.params.filter((param) => param !== "signer" && param !== "&signer");
//   // Convert string arguments to TypeArgumentABI
//   const typeArgABIs = originalArgs.map((arg, i) => new ArgumentABI(`var${i}`, new TypeTagParser(arg).parseTypeTag()));
//   const entryFunctionABI = new EntryFunctionABI(
//     funcAbi.name,
//     ModuleId.fromStr(`${params.addr}::${params.module}`),
//     "", // Doc string
//     funcAbi.generic_type_params.map((_, i) => new TypeArgumentABI(`${i}`)),
//     typeArgABIs
//   );

//   const senderAddress = payload.sender instanceof AccountAddress ? HexString.fromUint8Array(payload.sender) : payload.sender;

//   const [{ sequence_number }, chainId] = await Promise.all([client.getAccount(senderAddress), client.getChainId()]);

//   const builderABI = TransactionBuilderABI([utils.bcsToBytes(entryFunctionABI)], {
//     sender,
//     sequenceNumber: sequence_number,
//     chainId,
//     ...payload,
//   });
//   const r = await builderABI.build(params.func, payload.type_arguments, payload.arguments);

//   return r;
// }