import { ethers } from "ethers";

(async () => {
  const provider = new ethers.providers.JsonRpcProvider(
    "https://rpc.debugchain.net"
  );

  // we will get wallet from private key
  const wallet = new ethers.Wallet(
    "346871ed2c62db2949702e52e82b63ea296c2bbee27654e538ffd70e5a80b173",
    provider
  );

  // put your receiver here
  const receiver = "0xDF721c726467bE31fcD5940Ca6FfF1Dea7f251B3";

  // get total transaction count from sender as nonce
  const nonce = await provider.getTransactionCount(wallet.address);

  // sign transaction
  const signedTransaction = await wallet.signTransaction({
    to: receiver,
    value: ethers.utils.parseEther("0.01"),
    nonce: nonce,
    gasPrice: await provider.getGasPrice(),
    gasLimit: 21000,
    chainId: 8348,
  });

  console.log("Signed transaction", signedTransaction);

  const txId = await provider.sendTransaction(signedTransaction);
  console.log("Transaction id", txId);
})();
