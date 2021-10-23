//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Greeter {
  string private _greeting;
  mapping(address => uint256) private _balances;

  event Deposit(address from, address to, uint256 amount);
  event Withdraw(address from, address to, uint256 amount);

  constructor(string memory greeting) {
    console.log("Deploying a Greeter with greeting:", greeting);
    _greeting = greeting;
  }

  function balance() public view returns (uint256) {
    return _balances[msg.sender];
  }

  function withdraw() public {
    address payable _messageSender = payable(msg.sender);
    uint256 _balance = _balances[_messageSender];

    require(_balance > 0, "Insufficent funds");

    _balances[_messageSender] = 0;

    _messageSender.transfer(_balance);

    emit Withdraw(address(this), msg.sender, _balance);
  }

  function deposit() public payable {
    require(msg.value > 0, "Invalid amount");
    _balances[msg.sender] += msg.value;
    emit Deposit(msg.sender, address(this), msg.value);
  }

  function greet() public view returns (string memory) {
    return _greeting;
  }

  function setGreeting(string memory greeting) public {
    console.log("Changing greeting from '%s' to '%s'", _greeting, greeting);
    _greeting = greeting;
  }
}
