import { NextRequest, NextResponse } from "next/server";
import { Keypair } from "@stellar/stellar-sdk";
import { basicNodeSigner } from "@stellar/stellar-sdk/contract";
import { native, server } from "@/lib/passkey";
import { ENV } from "@/config/env";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ address: string }> }
) {
  try {
    const { address } = await params;

    if (!address || address.trim() === "") {
      return NextResponse.json(
        { error: "Invalid address parameter" },
        { status: 400 }
      );
    }

    // Create funder keypair from environment variable
    if (!ENV.FUNDER_SECRET_KEY) {
      throw new Error("FUNDER_SECRET_KEY environment variable is not set");
    }

    const fundKeypair = Keypair.fromSecret(ENV.FUNDER_SECRET_KEY);
    const fundSigner = basicNodeSigner(fundKeypair, ENV.NETWORK_PASSPHRASE);

    console.log(`Funding smart wallet: ${address}`);
    console.log(`Funder public key: ${fundKeypair.publicKey()}`);

    // Create transfer transaction
    const { built, ...transfer } = await native.transfer({
      from: fundKeypair.publicKey(),
      to: address,
      amount: BigInt(25 * 10_000_000), // 25 XLM in stroops
    });

    // Sign the transaction
    await transfer.signAuthEntries({
      signAuthEntry: (auth) => fundSigner.signAuthEntry(auth),
    });

    // Send the transaction
    const result = await server.send(built!.toXDR());

    return NextResponse.json({
      status: 200,
      message: "Smart wallet successfully funded",
      hash: result.hash,
      amount: 25,
      currency: "XLM",
    });
  } catch (error) {
    console.error("Error funding smart wallet:", error);
    return NextResponse.json(
      {
        error: "Error when funding smart wallet",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
