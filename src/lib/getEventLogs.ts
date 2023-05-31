// getEventLogs.js
import { ethers } from "ethers";
import { TransferEventDTO } from "../TransferEventDTO";
import { getWeb3, NetworkMapping } from "./web3";

export async function getEventLogs(
  contractAddress: string
): Promise<TransferEventDTO[]> {
  const web3 = getWeb3();

  if (!web3) {
    throw new Error("Web3 provider not available");
  }

  const provider = new ethers.providers.Web3Provider(web3);
  const transferEventHandler =
    web3.eth.getEvent<TransferEventDTO>(contractAddress);
  const filterAllTransferEvents = transferEventHandler.createFilterInput();

  const allTransferEvents = await transferEventHandler.getAllChanges(
    filterAllTransferEvents
  );
  return allTransferEvents;
}
