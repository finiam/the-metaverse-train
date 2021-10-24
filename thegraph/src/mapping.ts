import { BigInt } from "@graphprotocol/graph-ts";
import {
  MetaverseTrain,
  ApprovalForAll,
  ChooChoo,
  GoldenTicketAssigned,
  OwnershipTransferred,
  TransferBatch,
  TransferSingle,
  URI,
  VoteEnd,
  VoteStart,
  Voted,
} from "../generated/MetaverseTrain/MetaverseTrain";
import { Choo, VoteCounter } from "../generated/schema";

export function handleChooChoo(event: ChooChoo): void {
  let id = event.params.chooCounter;
  let choochoo = new Choo(id.toString());
  choochoo.save();
}

export function handleVoteStart(voteStart: VoteStart): void {
  let id = voteStart.params.voteId.toString();
  let voteCounter = new VoteCounter(id);
  voteCounter.left = BigInt.fromI32(0);
  voteCounter.right = BigInt.fromI32(0);
  voteCounter.leftDestination = voteStart.params.firstChoice.toString();
  voteCounter.rightDestination = voteStart.params.rightChoice.toString();
  voteCounter.done = false;
  voteCounter.save();
}

export function handleVote(voted: Voted): void {
  let loadedCounter = VoteCounter.load(voted.params.voteId.toString())!;
  if (voted.params.pick == 0) {
    loadedCounter.left = loadedCounter.left.plus(BigInt.fromI32(1));
  } else {
    loadedCounter.right = loadedCounter.left.plus(BigInt.fromI32(1));
  }
  loadedCounter.save();
}
