// TransferEventDTO.ts
import { Contract } from "ethers";

export interface TransferEventDTO {
  from: Contract;
  to: Contract;
  value: string;
}
