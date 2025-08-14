import { PasskeyKit, PasskeyServer, SACClient } from "passkey-kit";
import { Account, Keypair, StrKey } from "@stellar/stellar-sdk/minimal";
import { Buffer } from "buffer";
import { basicNodeSigner } from "@stellar/stellar-sdk/minimal/contract";
import { Server } from "@stellar/stellar-sdk/minimal/rpc";
import { ENV } from "@/config/env";

const rpcUrl = ENV.RPC_URL;
const networkPassphrase = ENV.NETWORK_PASSPHRASE;
const walletWasmHash = ENV.WALLET_WASM_HASH;

export const rpc = new Server(rpcUrl);

export const mockPubkey = StrKey.encodeEd25519PublicKey(Buffer.alloc(32));
export const mockSource = new Account(mockPubkey, "0");

export const fundKeypairPromise: Promise<Keypair> = (async () => {
  const now = new Date();
  now.setMinutes(0, 0, 0);
  const hashBuffer = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(now.getTime().toString())
  );
  const kp = Keypair.fromRawEd25519Seed(Buffer.from(hashBuffer));
  try {
    await rpc.getAccount(kp.publicKey());
  } catch {
    try {
      await rpc.requestAirdrop(kp.publicKey());
    } catch {}
  }
  return kp;
})();
export async function getFundPubkey() {
  return (await fundKeypairPromise).publicKey();
}
export async function getFundSigner() {
  return basicNodeSigner(await fundKeypairPromise, networkPassphrase);
}

export const account = new PasskeyKit({
  rpcUrl,
  networkPassphrase,
  walletWasmHash,
});
export const server = new PasskeyServer({
  rpcUrl,
  launchtubeUrl: ENV.LAUNCHTUBE_URL,
  launchtubeJwt: ENV.LAUNCHTUBE_JWT,
  mercuryProjectName: ENV.MERCURY_PROJECT_NAME,
  mercuryUrl: ENV.MERCURY_URL,
  mercuryJwt: ENV.MERCURY_JWT,
});

export const sac = new SACClient({ rpcUrl, networkPassphrase });
export const native = sac.getSACClient(ENV.NATIVE_CONTRACT_ID);

/**
 * Fund a smart wallet with XLM using the funder keypair
 * @param address - The smart wallet address to fund
 * @returns Promise with the funding result
 */
export async function fundContract(address: string) {
  return fetch(`/api/fund/${address}`).then(async (res) => {
    if (res.ok) return res.json();
    else throw await res.text();
  });
}
