import { AppConfig } from "@cosmicdapp/logic";


const local: AppConfig = {
  chainId: "localnet",
  chainName: "test",
  addressPrefix: "wasm",
  rpcUrl: "http://localhost:26657",
  httpUrl: "http://localhost:1317",
  faucetUrl: "",
  feeToken: "ucosm",
  stakingToken: "stake",
  coinMap: {
    ucosm: { denom: "COSM", fractionalDigits: 6 },
    stake: { denom: "ATOM", fractionalDigits: 6 },
  },
  gasPrice: 0.025,
};

const coralnet: AppConfig = {
  chainId: "cosmwasm-coral",
  chainName: "Coral",
  addressPrefix: "coral",
  rpcUrl: "https://rpc.coralnet.cosmwasm.com",
  httpUrl: "https://lcd.coralnet.cosmwasm.com",
  faucetUrl: "https://faucet.coralnet.cosmwasm.com/credit",
  feeToken: "ushell",
  stakingToken: "ureef",
  coinMap: {
    ushell: { denom: "SHELL", fractionalDigits: 6 },
    ureef: { denom: "REEF", fractionalDigits: 6 },
  },
  gasPrice: 0.025,
};

// REACT_APP_LOCAL is set via `yarn start:local`
const isLocal = true;//process.env.NODE_ENV !== "production" && !!process.env.REACT_APP_LOCAL;

export const config = isLocal ? local : coralnet;

export const contractAddress = "wasm1ukwkdd05e85yj7gj8gum03gh2mcmw0sxuxy5cw"; //use your deployed contract address