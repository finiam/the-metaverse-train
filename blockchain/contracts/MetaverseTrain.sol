//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MetaverseTrain is ERC1155, Ownable {
  uint256 public goldenTicketsSupply;
  uint256 public ticketPrice;
  bool public ticketSale;
  uint256 public tokenId;
  uint256 public voteId;

  struct VoteCounter {
    uint8 left;
    uint8 right;
    string leftDestination;
    string rightDestination;
  }

  mapping(uint256 => VoteCounter) public choices;
  mapping(uint256 => string) public destinations;

  constructor(
    uint256 _goldenTicketsSupply,
    uint256 _ticketPrice,
    string memory uri
  ) ERC1155(uri) {
    goldenTicketsSupply = _goldenTicketsSupply;
    ticketPrice = _ticketPrice;
    ticketSale = true;
    tokenId = 1;
    voteId = 1;

    _mintGoldenTicket();
  }

  event GoldenTicketAssigned(address buyer);
  event Voted(uint256 voteId, uint8 pick);
  event VoteStart(uint256 voteId, string firstChoice, string rightChoice);
  event ChooChoo();

  function theMostImportantFunctionOfAll() public payable {
    emit ChooChoo();
  }

  function _mintGoldenTicket() internal {
    _mint(address(this), tokenId, goldenTicketsSupply, "");
  }

  function buyGoldenTicket() public payable {
    uint256 ticketsAvailable = balanceOf(address(this), 1);

    bool oldTicketSale = ticketSale;

    if (ticketsAvailable == 1) {
      ticketSale = false;
    }

    require(oldTicketSale, "Sale is not available");

    require(msg.value >= ticketPrice, "Amount sent is lower than ticket price");

    _safeTransferFrom(address(this), msg.sender, 1, 1, "");
    emit GoldenTicketAssigned(msg.sender);
  }

  function balanceOf(address _address, uint256 id) public view override returns (uint256) {
    return ERC1155.balanceOf(_address, id);
  }

  function voteStart(
    uint256 _voteId,
    string memory firstChoice,
    string memory secondChoice
  ) public {
    choices[_voteId] = VoteCounter(0, 0, firstChoice, secondChoice);

    emit VoteStart(_voteId, firstChoice, secondChoice);
  }

  function vote(uint8 pick) public {
    // putGoldenTicketInEscrow();

    setPick(pick);
    emit Voted(voteId, pick);
  }

  function setPick(uint8 pick) public {
    // pick 0 or 1
    require(pick <= 1, "Wrong pick");

    if (pick == 0) {
      choices[voteId].left = choices[voteId].left + 1;
    } else {
      choices[voteId].right = choices[voteId].right + 1;
    }
  }

  //   function settlement() {
  //     const currentVoteId = voteId;
  //
  //     // destinations[currentVoteId]
  //
  //     voteId++;
  //
  //     emit VoteEnd(currentVoteId, winner);
  //
  //
  //
  //     listContractGoldenTickets();
  //
  //     voteStart(voteId, new_first_choice, new_second_choice);
  //   }
  //
  //   function listContractGoldenTickets() {
  //
  //   }
  //
  //   function claim() {
  //     return_ticket()
  //     redeem_nft()
  //   }
  //
  //   function return_ticket() {}
  //
  //   function redeem_nft() {}
  //
  //   function mint() {}
  //
  //   function transfer_nft() {}
  //
  //   function payout() {}
  //
}
