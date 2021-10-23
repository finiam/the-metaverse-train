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
  bool public moving;
  address public admin;

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
    moving = true;
    admin = msg.sender;

    choices[1] = VoteCounter(0, 0, "madrid", "barcelona");
    choices[2] = VoteCounter(0, 0, "paris", "monaco");
    choices[3] = VoteCounter(0, 0, "london", "dublin");
    choices[4] = VoteCounter(0, 0, "amsterdam", "rotterdam");
    choices[5] = VoteCounter(0, 0, "berlin", "frankfurt");
    choices[6] = VoteCounter(0, 0, "rome", "milan");
    choices[7] = VoteCounter(0, 0, "moscow", "stpeters");
    choices[8] = VoteCounter(0, 0, "washington", "newyork");
    choices[9] = VoteCounter(0, 0, "moon", "iss");
    choices[10] = VoteCounter(0, 0, "mars", "venus");
    choices[11] = VoteCounter(0, 0, "pluto", "sun");
    choices[12] = VoteCounter(0, 0, "black_hole", "wormhole");

    _mintGoldenTicket();
  }

  event GoldenTicketAssigned(address buyer);
  event Voted(uint256 voteId, uint8 pick);
  event VoteStart(uint256 voteId, string firstChoice, string rightChoice);
  event VoteEnd(uint256 voteId, string winner);
  event ChooChoo();

  modifier onlyAdmin() {
    require(msg.sender == admin);
    _;
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

  function vote(uint8 pick) public {
    require(balanceOf(msg.sender, 1) == 1, "You need a Golden Ticket in order to vote.");
    require(moving, "You can only vote while the train is moving.");
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

  function startMoving() public onlyAdmin {
    require(!moving, "You can only start the train if it's stopped.");
    require(msg.sender == admin, "Only the admin can start the train.");
    moving = true;
    _startVote();
  }

  function _startVote() internal {
    voteId++;

    // listContractGoldenTickets();

    VoteCounter storage newCounter = choices[voteId];

    emit VoteStart(voteId, newCounter.leftDestination, newCounter.rightDestination);
  }

  function settlement() public onlyAdmin {
    require(moving, "You can only settle the votes while voting is happening.");
    VoteCounter storage currentCounter = choices[voteId];

    if (currentCounter.left > currentCounter.right) {
      destinations[voteId] = currentCounter.leftDestination;
    } else {
      destinations[voteId] = currentCounter.rightDestination;
    }

    moving = false;

    emit VoteEnd(voteId, destinations[voteId]);
  }

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
  //   function the_most_important_function_of_all() {
  //     emit ChooChoo();
  //   }
}
