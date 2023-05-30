import Web3 from "web3";
import ERC20ABI from "../contracts/erc20.abi.json";

interface NetworkMapping {
  [networkId: string]: string;
}

const networkMapping: NetworkMapping = {
  "1": "0x55af491e8b33246606FeB9010156D2597e15cAa1", // Eth Mainnet
  "11155111": "0x0Ecbe0484E99bBA9175309ae66C5690557A942D1", // Sepolia Testnet
  // Add more network mappings here as needed
};

function getWeb3(): Web3 | null {
  if (typeof window !== "undefined" && (window as any).ethereum) {
    return new Web3((window as any).ethereum);
  }
  return null;
}

export const getBalance = async (address: string): Promise<string> => {
  const web3 = getWeb3();
  if (!web3) {
    throw new Error("Web3 provider not available");
  }

  const networkId = await web3.eth.net.getId();
  const contractAddress = networkMapping[networkId];
  if (!contractAddress) {
    throw new Error("Contract address not available for the current network");
  }

  const contract = new web3.eth.Contract(ERC20ABI as any, contractAddress);

  try {
    const balance = await contract.methods.balanceOf(address).call();
    return balance.toString();
  } catch (error) {
    console.error("Error getting balance:", error);
    return "0";
  }
};

export const makeGuess = async (
  suspect: number,
  weapon: number,
  room: number,
  motive: number
): Promise<void> => {
  const web3 = getWeb3();
  if (!web3) {
    throw new Error("Web3 provider not available");
  }

  const networkId = await web3.eth.net.getId();
  const contractAddress = networkMapping[networkId];
  if (!contractAddress) {
    throw new Error("Contract address not available for the current network");
  }

  const contract = new web3.eth.Contract(ERC20ABI as any, contractAddress);

  try {
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    await contract.methods
      .makeGuess(suspect, weapon, room, motive)
      .send({ from: account });
    console.log("Guess made successfully!");
  } catch (error) {
    console.error("Error making guess:", error);
  }
};
