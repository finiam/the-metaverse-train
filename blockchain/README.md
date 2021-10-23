# Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.


## First setup

To try this project you need to first run. You need to start the local Ethereum node (run `yarn hardhat node` in a separate tab/window) between `bin/build` and `bin/deploy`.

```
bin/setup
bin/build
bin/deploy
```

If you wish to deploy to a testnet you can pass one of the options set in `hardhat.config.ts`:

```
ganache
goerli
hardhat
kovan
rinkeby
ropsten
homestead
```

## How to run

Run `yarn hardhat node` to start the local Ethereum node, and in a new terminal run `bin/deploy` to deploy the contract

## Testing

You can run `bin/test` and `yarn run hardhat coverage`.

## Linting

You can run `bin/lint` that lints `.sol` files, runs `prettier`, and then `typecheck`s project.

## Cleaning

`yarn clean` is also available to clear the cache and delete the artifacts.

## Frontend

**TODO:** Add information about running the frontend

## Experimenting with Hardhat console

Run `yarn console` to setup a testing node.

### Sheet Cheat

- Deploying the Contract:
```
const Greeter = await hre.ethers.getContractFactory("Greeter");
const greeter = await Greeter.deploy("Hello, Hardhat!");

await greeter.deployed();
```

- Get a Signer
```
signer = (await ethers.getSigners())[0]
```

- Deposit to Contract
```
await greeter.deposit({value: ethers.utils.parseEther("1.0")})
```

- Check Balance
```
balance = await greeter.balance()
ethers.utils.formatEther(balance)
```

- Change to another Signer with a given id `n`
```
signer = (await ethers.getSigners())[n]
await greeter.connect(signer).balance()
```
