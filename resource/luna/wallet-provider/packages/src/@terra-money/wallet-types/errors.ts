import { CreateTxOptions } from '@terra-money/terra.js';

/** User denied the request */
export class UserDenied extends Error {
  constructor() {
    super('User Denied');
    this.name = 'UserDenied';
  }

  toString = () => {
    return `[${this.name}]`;
  };
}

/** the user did not complete the action during a specific time */
export class Timeout extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'Timeout';
  }

  toString = () => {
    return `[${this.name} message="${this.message}"]`;
  };
}

/** failed on signBytes() */
export class SignBytesFailed extends Error {
  constructor(public readonly bytes: Buffer, message: string) {
    super(message);
    this.name = 'SignBytesFailed';
  }

  toString = () => {
    return `[${this.name} message="${this.message}"]`;
  };
}

/** Failed to create tx (did not make a txhash) */
export class CreateTxFailed extends Error {
  constructor(public readonly tx: CreateTxOptions, message: string) {
    super(message);
    this.name = 'CreateTxFailed';
  }

  toString = () => {
    return `[${this.name} message="${this.message}"]\n${JSON.stringify(
      this.tx,
      null,
      2,
    )}`;
  };
}

/** Failed process the tx (maked a txhash) */
export class TxFailed extends Error {
  constructor(
    public readonly tx: CreateTxOptions,
    public readonly txhash: string | undefined,
    message: string,
    public readonly raw_message: any,
  ) {
    super(message);
    this.name = 'TxFailed';
  }

  toString = () => {
    return `[${this.name} txhash="${this.txhash}" message="${
      this.message
    }"]\n${JSON.stringify(this.tx, null, 2)}\n${JSON.stringify(
      this.raw_message,
      null,
      2,
    )}`;
  };
}

/** Unknown error */
export class TxUnspecifiedError extends Error {
  constructor(public readonly tx: CreateTxOptions, message: string) {
    super(message);
    this.name = 'TxUnspecifiedError';
  }

  toString = () => {
    return `[${this.name} message="${this.message}"]\n${JSON.stringify(
      this.tx,
      null,
      2,
    )}`;
  };
}
