const {Account} = require('../dist/')

console.log(`😎 Generate an account`)
const generatedAccount = new Account()
console.log(`\n  Generated account address\n    `, generatedAccount.getAddress())
console.log(`\n  Generated numbers (secret)\n    `, generatedAccount.getSecretString())

console.log(`\n\n`)

const account = [
  '399150', '474506', '009147', '088773', '432160', '282843', '253738', '605430'
]
console.log(`😎 Import account "${account.join(' ')}"`)
const importedAccount = new Account(account)
console.log(`\n  Imported account address\n    `, importedAccount.getAddress())
console.log(`\n  Imported account family seed\n    `, importedAccount.getFamilySeed())

console.log(`\n\n`)
