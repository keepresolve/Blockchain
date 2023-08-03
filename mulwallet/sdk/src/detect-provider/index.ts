import { isBitKeepMoblie, isDocumentComplete } from "../utils/browsers";
import { SupportProviderFlag } from "../constant"
import { getWalletProvierEventsName, getWaleltProvider } from "../provider";
interface BitKeepGlobal {
    ethereum: { isBitkeep: boolean }
    tronLink: {}
    tronWeb: {}
    solana: {}
    [propName: string]: object | Function | any
}

interface Window {
    bitkeep?: BitKeepGlobal;

}

type HandleDetectOptions = {
    type: string,
    eventName: string
}


export { detectBitkeepProvider };

/**
 * @param options - Options.
 * @param options.timeout - Milliseconds to wait for '*#initialized' to
 * @param options.isBitkeep  
 * be dispatched. Default: 1000
 * @returns A Promise that resolves with the Provider if it is detected within
 * given timeout, otherwise null.
 */
function detectBitkeepProvider<T = BitKeepGlobal>({
    isBitkeep = true,
    timeout = 1000,
    flag = SupportProviderFlag.EVM
} = {}): Promise<T | null> {

    
    if(!isBitkeep) return detectProvider({
        isBitkeep,
        timeout,
        flag
    })

    _validateInputs();

    let isBKMoblie: boolean = isBitKeepMoblie()

    let handled = false;
    let eventName = getWalletProvierEventsName(flag, isBitkeep)


    return new Promise(async (resolve) => {
        if ((window as Window).bitkeep) {
            handleDetect({ type: "init", eventName, isBKMoblie: "" });
        } else {
            await isDocumentComplete()

            if ((window as Window).bitkeep) {
                handleDetect({ type: "load", eventName, isBKMoblie });
            }


            if (eventName && isBKMoblie) {
                window.addEventListener(eventName, handleDetect.bind(null, { type: "event", eventName, isBKMoblie }),  { once: true });
            }

            setTimeout(() => {
                handleDetect({ type: "timeout", eventName, isBKMoblie });
            }, timeout);
        }

        function handleDetect(params: HandleDetectOptions) {

            console.log("handleDetect---------", params.type)
            if (handled) {
                return;
            }
            eventName && isBKMoblie && window.removeEventListener(eventName, handleDetect)
            handled = true;
            const { bitkeep } = window as Window

            if (bitkeep) {
                const provider = flag ? getWaleltProvider(flag) : bitkeep
                resolve(provider);
            } else {
                resolve(null);
            }
        }
    });

    function _validateInputs() {
        if (typeof timeout !== 'number') {
            throw new Error(`@bitkeep/web3-sdk/detect-provider: Expected option 'timeout' to be a number.`);
        }
    }
}

function  detectProvider({ timeout=1000}) {
    _validateInputs();

    let isBKMoblie: boolean = isBitKeepMoblie()

    let handled = false;
    let eventName = getWalletProvierEventsName(flag, isBitkeep)


    return new Promise(async (resolve) => {
        if ((window as Window).bitkeep) {
            handleDetect({ type: "init", eventName, isBKMoblie: "" });
        } else {
            await isDocumentComplete()

            const provider = getWaleltProvider(flag, false) 
            if (provider) {
                handleDetect({ type: "load", eventName, isBKMoblie });
            }


            if (eventName && isBKMoblie) {
                window.addEventListener(eventName, handleDetect.bind(null, { type: "event", eventName, isBKMoblie }),  { once: true });
            }

            setTimeout(() => {
                handleDetect({ type: "timeout", eventName, isBKMoblie });
            }, timeout);
        }

        function handleDetect(params: HandleDetectOptions) {

            console.log("handleDetect---------", params.type)
            if (handled) {
                return;
            }
            eventName && isBitKeepMoblie && window.removeEventListener(eventName, handleDetect)
            handled = true;
            const provider = getWaleltProvider(flag, false)

            if (provider) {
                resolve(provider);
            } else {
                resolve(null);
            }
        }
    });

    function _validateInputs() {
        if (typeof timeout !== 'number') {
            throw new Error(`@bitkeep/web3-sdk/detect-provider: Expected option 'timeout' to be a number.`);
        }
    }
}