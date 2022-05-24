import { CreateTxOptions } from '@terra-money/terra.js';
import Connector from '@walletconnect/core';
import * as cryptoLib from '@walletconnect/iso-crypto';
import {
  IPushServerOptions,
  IWalletConnectOptions,
} from '@walletconnect/types';
import { uuid } from '@walletconnect/utils';
import { BehaviorSubject, Observable } from 'rxjs';
import { isMobile } from '../../utils/browser-check';
import {
  WalletConnectCreateTxFailed,
  WalletConnectTimeout,
  WalletConnectTxFailed,
  WalletConnectTxUnspecifiedError,
  WalletConnectUserDenied,
} from './errors';
import SocketTransport from './impl/socket-transport';
import { TerraWalletconnectQrcodeModal } from './modal';
import {
  WalletConnectSession,
  WalletConnectSessionStatus,
  WalletConnectTxResult,
} from './types';

export interface WalletConnectControllerOptions {
  /**
   * Configuration parameter that `new WalletConnect(connectorOpts)`
   *
   * @default
   * ```js
   * {
   *   bridge: 'https://walletconnect.terra.dev/',
   *   qrcodeModal: new TerraWalletconnectQrcodeModal(),
   * }
   * ```
   */
  connectorOpts?: IWalletConnectOptions;

  /**
   * Configuration parameter that `new WalletConnect(_, pushServerOpts)`
   *
   * @default undefined
   */
  pushServerOpts?: IPushServerOptions;
}

export interface WalletConnectController {
  session: () => Observable<WalletConnectSession>;
  getLatestSession: () => WalletConnectSession;
  post: (tx: CreateTxOptions) => Promise<WalletConnectTxResult>;
  disconnect: () => void;
}

const WALLETCONNECT_STORAGE_KEY = 'walletconnect';

export function connectIfSessionExists(
  options: WalletConnectControllerOptions = {},
): WalletConnectController | null {
  const storedSession = localStorage.getItem(WALLETCONNECT_STORAGE_KEY);

  if (typeof storedSession === 'string') {
    return connect(options, true);
  }

  return null;
}

export function connect(
  options: WalletConnectControllerOptions = {},
  useCachedSession: boolean = false,
): WalletConnectController {
  let connector: Connector | null = null;

  let sessionSubject: BehaviorSubject<WalletConnectSession> =
    new BehaviorSubject<WalletConnectSession>({
      status: WalletConnectSessionStatus.DISCONNECTED,
    });

  const qrcodeModal =
    options.connectorOpts?.qrcodeModal ?? new TerraWalletconnectQrcodeModal();

  const connectorOpts: IWalletConnectOptions = {
    bridge: 'https://walletconnect.terra.dev/',
    qrcodeModal,
    ...options.connectorOpts,
  };

  const pushServerOpts: IPushServerOptions | undefined = options.pushServerOpts;

  // ---------------------------------------------
  // event listeners
  // ---------------------------------------------
  function initEvents() {
    if (!connector) {
      throw new Error(`WalletConnect is not defined!`);
    }

    connector.on('session_update', async (error, payload) => {
      if (error) throw error;

      sessionSubject.next({
        status: WalletConnectSessionStatus.CONNECTED,
        peerMeta: payload.params[0],
        terraAddress: payload.params[0].accounts[0],
        chainId: payload.params[0].chainId,
      });

      console.log('WALLETCONNECT SESSION UPDATED:', payload.params[0]);
    });

    connector.on('connect', (error, payload) => {
      if (error) throw error;

      sessionSubject.next({
        status: WalletConnectSessionStatus.CONNECTED,
        peerMeta: payload.params[0],
        terraAddress: payload.params[0].accounts[0],
        chainId: payload.params[0].chainId,
      });
    });

    connector.on('disconnect', (error, payload) => {
      if (error) throw error;

      sessionSubject.next({
        status: WalletConnectSessionStatus.DISCONNECTED,
      });
    });
  }

  // ---------------------------------------------
  // initialize
  // ---------------------------------------------
  const cachedSession = localStorage.getItem('walletconnect');

  if (typeof cachedSession === 'string' && useCachedSession) {
    const cachedSessionObject = JSON.parse(cachedSession);
    const clientId = cachedSessionObject.clientId;
    const draftConnector = new Connector({
      connectorOpts: {
        ...connectorOpts,
        session: JSON.parse(cachedSession),
      },
      pushServerOpts,
      cryptoLib,
      transport: new SocketTransport({
        protocol: 'wc',
        version: 1,
        url: connectorOpts.bridge!,
        subscriptions: [clientId],
      }),
    });
    draftConnector.clientId = clientId;

    connector = draftConnector;

    initEvents();

    sessionSubject.next({
      status: WalletConnectSessionStatus.CONNECTED,
      peerMeta: draftConnector.peerMeta!,
      terraAddress: draftConnector.accounts[0],
      chainId: draftConnector.chainId,
    });
  } else {
    const clientId = uuid();
    const draftConnector = new Connector({
      connectorOpts,
      pushServerOpts,
      cryptoLib,
      transport: new SocketTransport({
        protocol: 'wc',
        version: 1,
        url: connectorOpts.bridge!,
        subscriptions: [clientId],
      }),
    });
    draftConnector.clientId = clientId;

    connector = draftConnector;

    if (!draftConnector.connected) {
      draftConnector.createSession().catch(console.error);

      if (qrcodeModal instanceof TerraWalletconnectQrcodeModal) {
        qrcodeModal.setCloseCallback(() => {
          sessionSubject.next({
            status: WalletConnectSessionStatus.DISCONNECTED,
          });
        });
      }

      initEvents();

      sessionSubject.next({
        status: WalletConnectSessionStatus.REQUESTED,
      });
    }
  }

  // ---------------------------------------------
  // methods
  // ---------------------------------------------
  function disconnect() {
    if (connector && connector.connected) {
      try {
        connector.killSession();
      } catch {}
    }

    sessionSubject.next({
      status: WalletConnectSessionStatus.DISCONNECTED,
    });
  }

  function session(): Observable<WalletConnectSession> {
    return sessionSubject.asObservable();
  }

  function getLatestSession(): WalletConnectSession {
    return sessionSubject.getValue();
  }

  /**
   * post transaction
   *
   * @param tx transaction data
   * @throws { WalletConnectUserDenied }
   * @throws { WalletConnectCreateTxFailed }
   * @throws { WalletConnectTxFailed }
   * @throws { WalletConnectTimeout }
   * @throws { WalletConnectTxUnspecifiedError }
   */
  function post(tx: CreateTxOptions): Promise<WalletConnectTxResult> {
    if (!connector || !connector.connected) {
      throw new Error(`WalletConnect is not connected!`);
    }

    const id = Date.now();

    const serializedTxOptions = {
      msgs: tx.msgs.map((msg) => msg.toJSON()),
      fee: tx.fee?.toJSON(),
      memo: tx.memo,
      gas: tx.gas,
      gasPrices: tx.gasPrices?.toString(),
      gasAdjustment: tx.gasAdjustment?.toString(),
      //account_number: tx.account_number,
      //sequence: tx.sequence,
      feeDenoms: tx.feeDenoms,
      timeoutHeight: tx.timeoutHeight,
    };

    if (isMobile()) {
      const payload = btoa(
        JSON.stringify({
          id,
          handshakeTopic: connector.handshakeTopic,
          params: serializedTxOptions,
        }),
      );

      // FIXME changed walletconnect confirm schema
      window.location.href = `terrastation://walletconnect_confirm/?payload=${payload}`;
      //window.location.href = `terrastation://wallet_connect_confirm?id=${id}&handshakeTopic=${
      //  connector.handshakeTopic
      //}&params=${JSON.stringify([serializedTxOptions])}`;
    }

    return connector
      .sendCustomRequest({
        id,
        method: 'post',
        params: [serializedTxOptions],
      })
      .catch((error) => {
        let throwError = error;

        try {
          const { code, txhash, message, raw_message } = JSON.parse(
            error.message,
          );
          switch (code) {
            case 1:
              throwError = new WalletConnectUserDenied();
              break;
            case 2:
              throwError = new WalletConnectCreateTxFailed(message);
              break;
            case 3:
              throwError = new WalletConnectTxFailed(
                txhash,
                message,
                raw_message,
              );
              break;
            case 4:
              throwError = new WalletConnectTimeout(message);
              break;
            case 99:
              throwError = new WalletConnectTxUnspecifiedError(message);
              break;
          }
        } catch {
          throwError = new WalletConnectTxUnspecifiedError(error.message);
        }

        throw throwError;
      });
  }

  // ---------------------------------------------
  // return
  // ---------------------------------------------
  return {
    session,
    getLatestSession,
    post,
    disconnect,
  };
}
