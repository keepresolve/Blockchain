import { EventEmitter } from 'eventemitter3';

interface JsonRpcResponse {
    id: string | undefined;
    jsonrpc: '2.0';
    method: string;
    result?: unknown;
    error?: Error;
}
interface JsonRpcRequest {
    id: string | undefined;
    jsonrpc: '2.0';
    method: string;
    params?: Array<any>;
}

interface RequestArguments {
    method: string;
    params?: unknown[] | object;
}

type JsonRpcCallback = (error: Error, response: JsonRpcResponse) => unknown;


interface BitKeepEthereum {
    isConnected(): boolean
    disconnect(): void
    enable(): void
    send(
        methodOrPayload: string | JsonRpcRequest,
        paramsOrCallback: Array<unknown> | JsonRpcCallback
    ): Promise<JsonRpcResponse> | void
    sendAsync(payload: JsonRpcRequest, callback: JsonRpcCallback): void
    request(args: RequestArguments): Promise<unknown>
}

/**
 * 迁移inject 
 */
class BitKeepEthereum extends EventEmitter implements BitKeepEthereum {
    constructor() {  super();}
    isConnected(): boolean { 
        return window.bitkeep.ethereum.isConnected()
    }
    disconnect(): void { 
        return window.bitkeep.ethereum.disconnect()
    }
    enable(): void { 
        return window.bitkeep.ethereum.enable()
    }
    send(
        methodOrPayload: string | JsonRpcRequest,
        paramsOrCallback: Array<unknown> | JsonRpcCallback
    ): Promise<JsonRpcResponse> | void { 
        return window.bitkeep.ethereum.send(methodOrPayload, paramsOrCallback)
    }
    sendAsync(payload: JsonRpcRequest, callback: JsonRpcCallback): void { 
        return window.bitkeep.ethereum.sendAsync(payload, callback)
    }
    request(args: RequestArguments): Promise<unknown> { 
        return window.bitkeep.ethereum.request(args)
    }
}

export { BitKeepEthereum };
