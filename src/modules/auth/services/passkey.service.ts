import { account, server } from "@/lib/passkey";
import base64url from "base64url";

export async function connectWallet(keyId?: string) {
  const { keyId: kid, contractId } = await account.connectWallet({
    keyId,
    getContractId: (keyId) => server.getContractId({ keyId }),
  });
  return { keyId: base64url(kid), contractId } as const;
}

export async function registerWallet(name: string) {
  const { keyId: kid, contractId, signedTx } = await account.createWallet("Latio", name);
  await server.send(signedTx);
  return { keyId: base64url(kid), contractId } as const;
}
