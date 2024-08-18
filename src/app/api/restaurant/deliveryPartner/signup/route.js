import { connectionStr } from "@/app/lib/db";
import { deliveryPartnerSchema } from "@/app/lib/deliverypartnerModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
  const payload = await request.json();
  await mongoose.connect(connectionStr, { useNewUrlParser: true });
  let success = false;
  const user = new deliveryPartnerSchema(payload);
  const result = await user.save();
  if (result) {
    success = true;
  }
  return NextResponse.json({ result, success });
}
