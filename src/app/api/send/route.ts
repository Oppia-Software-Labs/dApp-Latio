import { NextRequest, NextResponse } from "next/server";
import { native, account, server } from "@/lib/passkey";

export async function POST(request: NextRequest) {
  try {
    const { to, amount, keyId, contractId } = await request.json();

    // Validate required parameters
    if (!to || !amount || !keyId || !contractId) {
      return NextResponse.json(
        { error: "Missing required parameters: to, amount, keyId, contractId" },
        { status: 400 }
      );
    }

    if (amount <= 0) {
      return NextResponse.json(
        { error: "Amount must be greater than 0" },
        { status: 400 }
      );
    }

    console.log(`Sending ${amount} XLM from ${contractId} to ${to}`);

    // Create transfer transaction
    const transfer = await native.transfer({
      to: to,
      from: contractId,
      amount: BigInt(amount * 10_000_000), // Convert to stroops
    });

    // Sign the transaction
    await account.sign(transfer, { keyId: keyId });

    // Send the transaction
    const result = await server.send(transfer.built!.toXDR());

    return NextResponse.json({
      status: 200,
      message: "Transaction sent successfully",
      hash: result.hash,
      amount: amount,
      currency: "XLM",
      to: to,
      from: contractId,
    });
  } catch (error) {
    console.error("Error sending transaction:", error);
    return NextResponse.json(
      {
        error: "Error sending transaction",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
