<script>
  import { ethers } from "ethers";

  import { user, contract, provider } from "./stores/store.js";
  import Transfer from "./components/Transfer.svelte";
  import Wallet from "./components/Wallet.svelte";

  let walletConnected = false;

  $: {
    // On network change refresh page - runs on main thread

    // The "any" network will allow spontaneous network changes
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    provider.on("network", (newNetwork, oldNetwork) => {
      // When a Provider makes its initial connection, it emits a "network"
      // event with a null oldNetwork along with the newNetwork. So, if the
      // oldNetwork exists, it represents a changing network
      if (oldNetwork) {
        window.location.reload();
      }
    });
  }
</script>

{#if walletConnected}
  <Transfer {...$user} />
{:else}
  <Wallet bind:walletConnected />
{/if}
