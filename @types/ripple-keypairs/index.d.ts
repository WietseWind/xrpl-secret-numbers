declare module 'ripple-keypairs' {
  export interface RippleKeypair {
    privateKey: string
    publicKey: string
  }

  export const deriveKeypair: (
    seed: string,
    options?: {
      entropy: Buffer
    }
  ) => RippleKeypair

  export const deriveAddress: (publicKey: string) => string

  export const generateSeed: (options?: { algorithm?: string, entropy?: Buffer }) => string
}
