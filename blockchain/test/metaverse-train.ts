import { expect } from "chai";
import { ethers } from "hardhat";

describe("MetaverseTrain", function () {
  beforeEach(async function () {
    const MetaverseTrain = await ethers.getContractFactory("MetaverseTrain");
    this.train = await MetaverseTrain.deploy("100", "2", "http://google.com/");
    await this.train.deployed();

    let [deployer, otherUser] = await ethers.getSigners();
    this.deployer = deployer;
    this.otherUser = otherUser;
  });

  describe("constructor", function () {
    it("mints the golden tickets ", async function () {
      expect(await this.train.goldenTicketsSupply()).to.equals(100);
      expect(await this.train.ticketPrice()).to.equals(2);
    });
  });

  describe("buyGoldenTicket", function () {
    it("should transfer a ticket to the caller", async function () {
      const tx = this.train.buyGoldenTicket({ value: 2 });
      await expect(() => tx).to.changeEtherBalance(this.deployer, -2);

      expect(await this.train.balanceOf(this.deployer.address, 1)).to.equals(1);
    });
  });

  // describe("deposit", function () {
  //   it("Should deposit the amount given", async function () {
  //     const amount = 1;

  //     const transaction = this.train.deposit({ value: amount });

  //     await expect(() => transaction).to.changeEtherBalance(this.deployer, -amount);
  //     await expect(() => transaction).to.changeEtherBalance(this.train, amount);
  //     await expect(transaction)
  //       .to.emit(this.train, "Deposit")
  //       .withArgs(this.deployer.address, this.train.address, amount);
  //   });

  //   it("Should revert with invalid amount", async function () {
  //     const amount = 0;
  //     const transaction = this.train.deposit({ value: amount });

  //     await expect(transaction).to.be.revertedWith("Invalid amount");
  //   });
  // });

  // describe("withdraw", function () {
  //   it("Should withdraw the balance", async function () {
  //     const amount = 1;

  //     await this.train.deposit({ value: amount });
  //     const transaction = this.train.withdraw();

  //     await expect(() => transaction).to.changeEtherBalance(this.deployer, amount);
  //     await expect(() => transaction).to.changeEtherBalance(this.train, -amount);
  //     await expect(transaction)
  //       .to.emit(this.train, "Withdraw")
  //       .withArgs(this.train.address, this.deployer.address, amount);
  //   });

  //   it("Should revert with insufficent funds", async function () {
  //     const transaction = this.train.withdraw();

  //     await expect(transaction).to.be.revertedWith("Insufficent funds");
  //   });

  //   it("Should not allow for consecutive withdraws", async function () {
  //     const amount = 1;

  //     await this.train.deposit({ value: amount });
  //     await this.train.withdraw();
  //     const transaction = this.train.withdraw();

  //     await expect(transaction).to.be.revertedWith("Insufficent funds");
  //   });

  //   it("Should prevent withdraw from another address", async function () {
  //     const amount = 1;

  //     await this.train.deposit({ value: amount });

  //     const firstWithdrawTx = this.train.connect(this.otherUser).withdraw();
  //     const secondWithdrawTx = this.train.withdraw();

  //     await expect(firstWithdrawTx).to.be.revertedWith("Insufficent funds");
  //     await expect(() => secondWithdrawTx).to.changeEtherBalance(this.deployer, amount);
  //     await expect(() => secondWithdrawTx).to.changeEtherBalance(this.train, -amount);
  //     await expect(secondWithdrawTx)
  //       .to.emit(this.train, "Withdraw")
  //       .withArgs(this.train.address, this.deployer.address, amount);
  //   });
  // });

  // describe("balance", function () {
  //   it("Should return the balance", async function () {
  //     const amount = 1;

  //     await this.train.deposit({ value: amount });
  //     const initialBalance = await this.train.balance();
  //     await this.train.withdraw();
  //     const finalBalance = await this.train.balance();
  //     expect(initialBalance).to.equal(amount);
  //     expect(finalBalance).to.equal(0);
  //   });
  // });
});
