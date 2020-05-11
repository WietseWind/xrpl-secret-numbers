import assert from 'assert'
import keypairs from 'ripple-keypairs'
import * as utils from '../utils'

/* Types ==================================================================== */

export type Keypair = {
  publicKey: string
  privateKey: string
}

export type AccountData = {
  familySeed: string
  address: string
  keypair: Keypair
}

/* Class ==================================================================== */

export default class Account {
  private secret: Array<string>
  private account: AccountData = {
    familySeed: '',
    address: '',
    keypair: {
      publicKey: '',
      privateKey: ''
    }
  }

  constructor(SecretNumbers?: Array<string> | string | Buffer) {
    const asserts = (): void => {
      assert.strictEqual(this.secret.length, 8)
      this.secret.forEach((r, i) => {
        assert.strictEqual(r.length, 6)
      })
    }

    const derive = (): void => {
      try {
        const entropy = utils.secretToEntropy(this.secret)
        this.account.familySeed = keypairs.generateSeed({entropy: entropy})
        this.account.keypair = keypairs.deriveKeypair(this.account.familySeed)
        this.account.address = keypairs.deriveAddress(this.account.keypair.publicKey)
      } catch (e) {
        throw e.message
      }
    }

    if (typeof SecretNumbers === 'string') {
      this.secret = utils.parseSecretString(SecretNumbers)
    } else if (Array.isArray(SecretNumbers)) {
      this.secret = SecretNumbers
    } else if (Buffer.isBuffer(SecretNumbers)) {
      this.secret = utils.entropyToSecret(SecretNumbers)
    } else {
      this.secret = utils.randomSecret()
    }

    asserts()
    derive()
  }

  getSecret(): Array<string> {
    return this.secret
  }

  getSecretString(): string {
    return this.secret.join(' ')
  }

  getAddress(): string {
    return this.account.address
  }

  getFamilySeed(): string {
    return this.account.familySeed
  }

  getKeypair(): Keypair {
    return this.account.keypair
  }

  toString() {
    return this.getSecretString()
  }
}
