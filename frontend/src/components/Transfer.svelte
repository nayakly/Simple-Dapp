<script>
  import { ethers } from "ethers";
  import toast, { Toaster } from "svelte-french-toast";

  import { user, contract, provider } from "../stores/store.js";

  let amount = "";
  let toAddress = "";
  let disableTransferButton = false;

  const updateBalance = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });
    if (accounts && accounts.length > 0) {
      // User is still connected
      $user.tokenBalance = (
        await $contract.balanceOf($user.walletAddress)
      ).toString();
      let temp = ethers.utils.formatUnits(
        await $provider.getBalance($user.walletAddress),
        14
      );
      $user.etherBalance = (parseFloat(temp) / 10 ** 4).toFixed(4); //Show user's ether balance with 4 decimal places
    } else {
      // User disconnected from the app
      window.location.reload();
    }
  };

  // Poll User Balance every 1000ms - a web worker can be used for further optimization
  $: setInterval(updateBalance, 1000);

  const transferToken = async () => {
    // Validate the transfer form
    let errors = "Correct these Errors and Try Again.";

    if (!ethers.utils.isAddress(toAddress)) {
      // Check if EVM address is valid
      errors = errors.concat("\n\n▪ EVM Address is Invalid");
    }

    if (
      amount == "" ||
      parseInt(amount) < 0 ||
      !Number.isInteger(parseInt(amount))
    ) {
      //Check if amount is a whole number greater than zero
      errors = errors.concat("\n▪ Type a Whole Number Greater than Zero");
    }

    if (errors.length > 42) {
      toast.error(errors);
    } else {
      // Form validation complete. Now move to token transfer

      disableTransferButton = true; //disable the transfer button when a transaction is in process

      // transaction was turned into a promise
      // This was to fit it in with the syntax of the notificaton library - svelte french toast
      const promise = new Promise(async (resolve, reject) => {
        try {
          const tx = await $contract.transfer(toAddress, amount);
          const receipt = await tx.wait();
          if (receipt.status === 1) {
            resolve();
          } else {
            reject();
          }
        } catch (error) {
          //error code for tx rejected by user - 4001
          reject();
        }
      });

      promise.finally(() => {
        disableTransferButton = false; // After transaction is complete enable the transfer button
      });

      // svelte french toast notification
      toast.promise(promise, {
        loading: "Sending...",
        success: "Transaction was Succcessful",
        error: "Transaction Failed",
      });

      //transaction is complete. Now update the balance
      updateBalance();

      //clear inputs
      amount = "";
      toAddress = "";
    }
  };
</script>

<h1 class="mb-8">Hardhat Token (HHT)</h1>
<p class="mb-8">
  Welcome <b>{$user.walletAddress}</b>, you have <b>{$user.etherBalance} ETH</b>
  and
  <b>{$user.tokenBalance} HHT</b>
</p>
<hr />

{#if $user.tokenBalance == 0}
  <p class="leading-loose m-4">
    You don't have tokens to transfer <br />
    To get some tokens, open a terminal in the root of the repository and run:
    <br />
    <code class="bg-amber-300 text-black-50"
      >npx hardhat --network localhost faucet {$user.walletAddress}</code
    >
  </p>
{:else}
  <h1 class="text-3xl m-4">Transfer Tokens</h1>
  <div class="flex-row align-middle justify-center ">
    <div class="m-4 flex-col">
      <label for="" class="">Amount of HHT Tokens </label><input
        class="outline-none border-b-2 border-black text-center w-[8ch]"
        type="text"
        bind:value={amount}
      />
    </div>

    <div class="m-4">
      <label for="" class="">Recipient Address </label><input
        class="outline-none border-b-2 text-center border-black w-[43ch]"
        type="text"
        bind:value={toAddress}
      />
    </div>

    <button
      disabled={disableTransferButton}
      class="shadow-lg shadow-amber-300/50 drop-shadow-lg outline-none bg-amber-300 font-medium hover:bg-amber-400 disabled:bg-amber-100 disabled:text-amber-800"
      on:click={transferToken}>Transfer</button
    >
  </div>
{/if}

<Toaster />
