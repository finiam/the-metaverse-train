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
  Voted
} from "../generated/MetaverseTrain/MetaverseTrain";
import { Choo } from "../generated/schema";

export function handleChooChoo(event: ChooChoo): void {
  let id = event.params.chooCounter;
  let choochoo = new Choo(id.toString());
  choochoo.save();
}
