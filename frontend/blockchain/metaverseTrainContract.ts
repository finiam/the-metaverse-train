import { Contract, providers, utils } from "ethers";

const ABI = [
  "function theMostImportantFunctionOfAll() public payable ",
  "event ChooChoo()",
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
}

export function buildMetaverseTrainContract(provider, address) {
  return new MetaverseTrainContract(provider, address);
}
