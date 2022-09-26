<script>
  import { ethers } from "ethers";
  import toast, { Toaster } from "svelte-french-toast";

  import contractAddress from "../contracts/contract-address.json";
  import token from "../contracts/token.json";
  import { user, contract, provider } from "../stores/store.js";

  export let walletConnected = false;

  const connectWallet = async () => {
    if (window.ethereum === undefined) {
      //No Metamask wallet detected notification
      toast.error("No Ethereum Wallet detected. Please install Metamask");
    } else {
      let chainId = parseInt(
        await window.ethereum.request({ method: "eth_chainId" }),
        16
      );

      if (chainId !== 1337) {
        //Network Error - Switch user to the right network
        toast.error("Wrong Network! Please switch Metamask to localhost:8545");
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x539" }], // 0x539 is 1337 in HEX (append 0x)
          });
        } catch (error) {
          toast.error("Switch Rejected by User");
        }
      }

      // Connect user's wallet with the contract. Save user address and balances
      $provider = new ethers.providers.Web3Provider(window.ethereum);
      [$user.walletAddress] = await $provider.send("eth_requestAccounts", []);
      let temp = ethers.utils.formatUnits(
        await $provider.getBalance($user.walletAddress),
        14
      );
      $user.etherBalance = (parseFloat(temp) / 10 ** 4).toFixed(4); //Show user's ether balance with 4 decimal places

      const signer = $provider.getSigner(0);

      $contract = new ethers.Contract(contractAddress.token, token.abi, signer);

      $user.tokenBalance = (
        await $contract.balanceOf($user.walletAddress)
      ).toString();

      //Wallet Connected Notification
      toast.success("Wallet Connected");

      walletConnected = true;
    }
  };
</script>

<p class="font-semibold mb-4 ">Please Connect your Wallet</p>
<button
  class="shadow-lg shadow-amber-300/50 drop-shadow-lg outline-none bg-amber-300 hover:bg-amber-400 font-medium "
  on:click={connectWallet}>Connect Wallet</button
>

<Toaster />
