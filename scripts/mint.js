require("dotenv").config();
require("@nomiclabs/hardhat-ethers");
const contract = require("../artifacts/contracts/LucasNFT.sol/LucasNFT.json");
const contractInterface = contract.abi;

let provider = ethers.provider;

const tokenCID = "https://ipfs.io/ipfs/Qmc18ojAsY93x1reqSVgARmF54L8hHgGXRNcXNZUE6Dw7x";
const privateKey = `0x${process.env.PRIVATE_KEY}`;
const wallet = new ethers.Wallet(privateKey);

wallet.provider = provider;
const signer = wallet.connect(provider);

const nft = new ethers.Contract(
  process.env.CONTRACT_ADDRESS,
  contractInterface,
  signer
);

const main = () => {
  console.log("Waiting for 5 blocks to confirm...");
  nft
    .safeMint(process.env.PUBLIC_KEY, tokenCID)
    .then((tx) => tx.wait(5))
    .then((receipt) => console.log(`Confirmed! Your transaction receipt is: ${receipt.transactionHash}`))
    .catch((e) => console.log("Something went wrong", e));
};

main();