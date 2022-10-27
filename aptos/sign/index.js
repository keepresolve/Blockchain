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


const MAX_U8_NUMBER = 2 ** 8 - 1;
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
    constructor(name, type_tag) { }

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


class TransactionScriptABI  {
    /**
     * Constructs a TransactionScriptABI instance.
     * @param name Entry function name
     * @param doc
     * @param code
     * @param ty_args
     * @param args
     */
    constructor(
        name,
        doc,
        code,
        ty_args,
        args
    ) {
        this.name = name
        this.doc = doc
        this.code = code
        this.ty_args = ty_args
        this.args = args
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
        this.name = name
    }

    serialize(serializer) {
        serializer.serializeStr(this.name);
    }

    static deserialize(deserializer) {
        const name = deserializer.deserializeStr();
        return new TypeArgumentABI(name);
    }
}
class EntryFunctionABI {
    constructor(name, module_name, doc, ty_args, args) {
        (this.name = name), (this.module_name = module_name), (this.doc = doc);
        this.ty_args = ty_args;
        this.args = args;
    }

    deserialize(deserializer) {
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
        this.value = value
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
        this.value = value
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
        this.value = value
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
        serializeVector < TypeTag > (this.type_args, serializer);
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
    constructor(paddress, name) {
        this.name = name;
        this.paddress = paddress;
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

    return Uint8Array.from((hexNormalized.match(/.{1,2}/g) ?? []).map((byte) => parseInt(byte, 16)));
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

function getAddress(privateKey) {
    privateKey = new Uint8Array(Buffer.from(privateKey.replace(/^0x/, ""), "hex"));
    const { publicKey } = Nacl.sign.keyPair.fromSeed(privateKey);
    const hash = SHA3.sha3_256.create();
    console.log("publicKey", publicKey);
    hash.update(publicKey);
    hash.update("\x00");
    let address = hash.hex();
    return address.startsWith("0x") ? address : "0x" + address;
}
async function signTransaction(payload) {

    
    const utils = {
        normlize: (s) => s.replace(/^0[xX]0*/g, "0x"),
        bcsToBytes(value) {
            const serializer = new Serializer();
            value.serialize(serializer);
            return serializer.getBytes();
          }

    }
    function getParams(func, ty_tags, args) {
        func = utils.normlize(func);
        const funcNameParts = func.split("::");
        const [addr, module] = func.split("::");
        return {
            funcNameParts,
            addr,
            module,
            func,
        };
    }
    //接口参数
    async function fetchABI(addr) {
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
    }



    const params = getParams(payload.function, payload.type_arguments, payload.arguments);
    const abiMap = await fetchABI("0x2");
    const funcAbi = abiMap.get(params.func);
    // Remove all `signer` and `&signer` from argument list because the Move VM injects those arguments. Clients do not
    // need to care about those args. `signer` and `&signer` are required be in the front of the argument list. But we
    // just loop through all arguments and filter out `signer` and `&signer`.
    const originalArgs = funcAbi.params.filter((param) => param !== "signer" && param !== "&signer");
    // Convert string arguments to TypeArgumentABI
    const typeArgABIs = originalArgs.map((arg, i) => new ArgumentABI(`var${i}`, new TypeTagParser(arg).parseTypeTag()));
    const entryFunctionABI = new EntryFunctionABI(
        funcAbi.name,
        ModuleId.fromStr(`${params.addr}::${params.module}`),
        "", // Doc string
        funcAbi.generic_type_params.map((_, i) => new TypeArgumentABI(`${i}`)),
        typeArgABIs
    );

    const senderAddress = payload.sender instanceof AccountAddress ? HexString.fromUint8Array( payload.sender) :  payload.sender;;

    const [{ sequence_number }, chainId] = await Promise.all([client.getAccount(senderAddress), client.getChainId()]);
    


    console.log(sequence_number, chainId);
}
(async () => {
    const Mnemonic = "humble angry animal ethics student steel safe donkey glove page tunnel away";

    //   const address1 = "0x3bbca716af694b7d500ec98075f51300cee6dee42c58d6fa29896f85ef41c540";
    //   const privateKey1 = "0x2a099272a96c118a6397d64fd7b3a8c9893d3c6ebf562e80470abf9636a26694";
    //   const account1 = new aptos.AptosAccount(new Uint8Array(Buffer.from(privateKey.replace(/^0x/, ""), "hex")));

    //   const account1 = new aptos.AptosAccount();
    //   await faucetClient.fundAccount(address1, 100000);
    //   let resources = await client.getAccountResources(address1);
    //   let accountResource = resources.find((r) => r.type === aptosCoin);
    //   console.log(`account2 coins: ${accountResource.data.coin.value}. Should be 100000!`);

    //   const account2 = new aptos.AptosAccount();
    //   await faucetClient.fundAccount(account2.address(), 0);
    //   resources = await client.getAccountResources(account2.address());
    //   accountResource = resources.find((r) => r.type === aptosCoin);
    //   console.log(`account2 coins: ${accountResource.data.coin.value}. Should be 0!`);

    // console.log(a)
    const privateKey = getPrivateKey(Mnemonic);
    const address = getAddress(privateKey);

    console.log("privateKey", "address", privateKey, address);


    const address2 = "0xffc0e193508c8eef01719e9c947f8b9539bb6fda4a0101d2d1b3e528aeb0ba7d";



    const payload = {
        type: "entry_function_payload",
        function: "0x1::coin::transfer",
        type_arguments: ["0x1::aptos_coin::AptosCoin"],
        arguments: [address2, 717],
        sender: address
    };
   const r =  await signTransaction(payload)
   console.log(r)






   


    const txnRequest = await client.generateTransaction(address, payload);
    console.log("txnRequest", txnRequest);


    const txnRequest1 = {
        sender: new Uint8Array(
            Uint8Array.from(
                address
                    .substring(2)
                    .match(/.{1,2}/g)
                    .map((byte) => parseInt(byte, 16))
            )
        ),
        sequence_number: 13n,
    };

    console.log("txnRequest1", txnRequest1);



    //   const signedTxn = await client.signTransaction(account1, txnRequest);
    //   console.log(signedTxn)
    //   const transactionRes = await client.submitTransaction(signedTxn);
    //   await client.waitForTransaction(transactionRes.hash);

    //   resources = await client.getAccountResources(address2);
    //   accountResource = resources.find((r) => r.type === aptosCoin);
    //   console.log(`account2 coins: ${accountResource.data.coin.value}. Should be 717!`);
})();




