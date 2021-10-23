import { expect } from "chai";
import { ethers } from "hardhat";

describe("Greeter", function () {
  beforeEach(async function () {
    const Greeter = await ethers.getContractFactory("Greeter");
    this.greeter = await Greeter.deploy("Hello, world!");
    await this.greeter.deployed();

    let [deployer, otherUser] = await ethers.getSigners();
    this.deployer = deployer;
    this.otherUser = otherUser;
  });

  describe("greet", function () {
    it("Should return the new greeting once it's changed", async function () {
      expect(await this.greeter.greet()).to.equal("Hello, world!");

      const setGreetingTx = await this.greeter.setGreeting("Hola, mundo!");

      // wait until the transaction is mined
      await setGreetingTx.wait();

      expect(await this.greeter.greet()).to.equal("Hola, mundo!");
    });
  });

  describe("deposit", function () {
    it("Should deposit the amount given", async function () {
      const amount = 1;

      const transaction = this.greeter.deposit({ value: amount });

      await expect(() => transaction).to.changeEtherBalance(this.deployer, -amount);
      await expect(() => transaction).to.changeEtherBalance(this.greeter, amount);
      await expect(transaction)
        .to.emit(this.greeter, "Deposit")
        .withArgs(this.deployer.address, this.greeter.address, amount);
    });

    it("Should revert with invalid amount", async function () {
      const amount = 0;
      const transaction = this.greeter.deposit({ value: amount });

      await expect(transaction).to.be.revertedWith("Invalid amount");
    });
  });

  describe("withdraw", function () {
    it("Should withdraw the balance", async function () {
      const amount = 1;

      await this.greeter.deposit({ value: amount });
      const transaction = this.greeter.withdraw();

      await expect(() => transaction).to.changeEtherBalance(this.deployer, amount);
      await expect(() => transaction).to.changeEtherBalance(this.greeter, -amount);
      await expect(transaction)
        .to.emit(this.greeter, "Withdraw")
        .withArgs(this.greeter.address, this.deployer.address, amount);
    });

    it("Should revert with insufficent funds", async function () {
      const transaction = this.greeter.withdraw();

      await expect(transaction).to.be.revertedWith("Insufficent funds");
    });

    it("Should not allow for consecutive withdraws", async function () {
      const amount = 1;

      await this.greeter.deposit({ value: amount });
      await this.greeter.withdraw();
      const transaction = this.greeter.withdraw();

      await expect(transaction).to.be.revertedWith("Insufficent funds");
    });

    it("Should prevent withdraw from another address", async function () {
      const amount = 1;

      await this.greeter.deposit({ value: amount });

      const firstWithdrawTx = this.greeter.connect(this.otherUser).withdraw();
      const secondWithdrawTx = this.greeter.withdraw();

      await expect(firstWithdrawTx).to.be.revertedWith("Insufficent funds");
      await expect(() => secondWithdrawTx).to.changeEtherBalance(this.deployer, amount);
      await expect(() => secondWithdrawTx).to.changeEtherBalance(this.greeter, -amount);
      await expect(secondWithdrawTx)
        .to.emit(this.greeter, "Withdraw")
        .withArgs(this.greeter.address, this.deployer.address, amount);
    });
  });

  describe("balance", function () {
    it("Should return the balance", async function () {
      const amount = 1;

      await this.greeter.deposit({ value: amount });
      const initialBalance = await this.greeter.balance();
      await this.greeter.withdraw();
      const finalBalance = await this.greeter.balance();
      expect(initialBalance).to.equal(amount);
      expect(finalBalance).to.equal(0);
    });
  });
});
