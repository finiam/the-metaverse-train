import { Contract, providers, utils } from "ethers";

const ABI = [
  "function theMostImportantFunctionOfAll() public payable ",
  "function buyGoldenTicket() public payable ",
  "event ChooChoo( uint256 chooCounter )",
  "function vote(uint8 pick) public",
  "event Voted(uint256 voteId, uint8 pick)",
  "event VoteStart(uint256 voteId, string firstChoice, string rightChoice)",
  "function choices(uint256 voteId) public view returns(VoteCounter)",
  "function voteId() public view returns(uint256)",
];

export default class MetaverseTrainContract {
  private writeContract: Contract;
  private readContract: Contract;
  private address: string;

  constructor(provider: providers.Web3Provider, address: string) {
    this.writeContract = new Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string,
      ABI,
      provider.getSigner()
    );
    this.readContract = new Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string,
      ABI,
      provider
    );
    this.address = address;
  }

  async chooChoo() {
    return this.writeContract.theMostImportantFunctionOfAll({
      value: utils.parseEther("0.001"),
    });
  }

  async buyGoldenTicket() {
    return this.writeContract.buyGoldenTicket({
      value: utils.parseEther("0.001"),
    });
  }

  async vote(pick: number) {
    return this.writeContract.vote(utils.parseUnits(pick.toString()));
  }

  async voteId(): Promise<number> {
    return parseInt(utils.formatUnits(await this.readContract.voteId()));
  }

  // async choices(voteId: number): Promise<Array<any>> {
  //   return this.readContract.choices(voteId);
  // }
}

export function buildMetaverseTrainContract(provider, address) {
  return new MetaverseTrainContract(provider, address);
}
