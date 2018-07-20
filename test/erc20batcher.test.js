const chai = require('chai')
const { join } = require('path')
const solc = require('@appliedblockchain/cobalt/solc')({
  root: join(__dirname, '..', 'contracts'),
  solc: 'solc openzeppelin-solidity=../node_modules/openzeppelin-solidity',
  allowPaths: '../,'
})

const { web3, accounts } = require('@appliedblockchain/cobalt/web3')({
  accounts: 10,
  logger: console,
  solc
})

const addresses = accounts.map(acc => acc.address)
const from = addresses[0]
const gas = 50000000

// Compile one or more .sol files.
web3.require('ERC20Batcher.sol')

describe('ERC20Batcher', () => {
  let batcher

  test('deploys', async () => {
    const contractConstructorArgs = []
    batcher = await web3.deploy(
      'ERC20Batcher',
      [],
      { from, gas }
    )

    expect(typeof batcher.options.address).toBe('string')
    expect(batcher.options.address.length > 1).toBe(true)
  })

})
