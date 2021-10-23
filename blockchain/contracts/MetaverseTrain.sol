//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract MetaverseTrain {
  uint256 private _golden_tickets;

  constructor() {
    _golden_tickets = 500;
    mint_golden_ticket()
  }

  function mint_golden_ticket() {}

  function claim_golden_ticket() payable {}

  function vote_start(options) {}

  function vote(pick) {
    put_golden_ticket_in_escrow()
    set_pick(pick)
  }

  function settlement() {
    list_contract_golden_tickets()
    vote_start(new_options)
  }

  function claim() {
    return_ticket()
    redeem_nft()
  }

  function return_ticket() {}

  function redeem_nft() {}
  function mint() {}

  function transfer_nft() {}

  function payout() {}


  function the_most_important_function_of_all() {
    choo_choo()
  }
}


