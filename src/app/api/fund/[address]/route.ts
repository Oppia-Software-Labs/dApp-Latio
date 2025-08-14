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

    console.log("ENV.FUNDER_SECRET_KEY", ENV.FUNDER_SECRET_KEY);
    console.log("ENV.FUNDER_SECRET_KEY length:", ENV.FUNDER_SECRET_KEY?.length);
    
    // Create funder keypair from environment variable
    if (!ENV.FUNDER_SECRET_KEY) {
      throw new Error("FUNDER_SECRET_KEY environment variable is not set");
    }

    const fundKeypair = Keypair.fromSecret(ENV.FUNDER_SECRET_KEY);
    console.log("fundKeypair created successfully");
    console.log("fundKeypair.publicKey():", fundKeypair.publicKey());
    console.log("fundKeypair.publicKey() type:", typeof fundKeypair.publicKey());
    
    const fundSigner = basicNodeSigner(fundKeypair, ENV.NETWORK_PASSPHRASE);
    console.log("fundSigner created:", !!fundSigner);
    console.log("ENV.NETWORK_PASSPHRASE:", ENV.NETWORK_PASSPHRASE);

    console.log(`Funding smart wallet: ${address}`);
    console.log(`Funder public key: ${fundKeypair.publicKey()}`);

    // Create transfer transaction
    console.log("About to call native.transfer with:");
    console.log("- from:", fundKeypair.publicKey());
    console.log("- to:", address);
    console.log("- amount:", BigInt(25 * 10_000_000));
    
    const { built, ...transfer } = await native.transfer({
      from: fundKeypair.publicKey(),
      to: address,
      amount: BigInt(25 * 10_000_000), // 25 XLM in stroops
    });

    console.log("Transfer created successfully");
    console.log("transfer object:", transfer);
    console.log("built object:", !!built);

    // Sign the transaction
    console.log("About to sign auth entries...");
    console.log("transfer.signAuthEntries exists:", typeof transfer.signAuthEntries);
    console.log("fundSigner.signAuthEntry exists:", typeof fundSigner.signAuthEntry);
    
    await transfer.signAuthEntries({
      signAuthEntry: (auth) => {
        console.log("signAuthEntry called with auth:", auth);
        const result = fundSigner.signAuthEntry(auth);
        console.log("signAuthEntry result:", result);
        return result;
      },
    });
    
    console.log("Auth entries signed successfully");

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
