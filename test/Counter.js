const { expect } = require('chai')
const { ethers } = require('hardhat')

describe('Counter', function () {
  async function deployCounterFixture() {
    const Counter = await ethers.getContractFactory("Counter")
    const counter = await Counter.deploy()
    await counter.deployed()
    return { counter }
  }

  it("Should return the new greeting once it changed", async () => {
    const { counter } = await deployCounterFixture()

    expect(await counter.getCounter()).to.equal(0)
  })


  it("Should return the new greeting once it changed", async () => {
    const { counter } = await deployCounterFixture()
    const preCounter = await counter.getCounter()

    await counter.addCounter()

    expect(await counter.getCounter()).to.equal(preCounter + 1)
  })
})
