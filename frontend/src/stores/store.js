import { writable } from "svelte/store";

export const user = writable({
  walletAddress: undefined,
  etherBalance: undefined,
  tokenBalance: undefined,
});
export const provider = writable(undefined);
export const contract = writable(undefined);
