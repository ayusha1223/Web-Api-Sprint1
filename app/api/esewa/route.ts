import crypto from "crypto";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const { total_amount, transaction_uuid } = body;

  const product_code = "EPAYTEST";
  const secret = "8gBm/:&EnhH.1/q"; // eSewa test secret

  const data = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;

  const signature = crypto
    .createHmac("sha256", secret)
    .update(data)
    .digest("base64");

  return NextResponse.json({
    signature,
    product_code,
  });
}