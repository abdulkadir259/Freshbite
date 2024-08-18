import { connectionStr } from "@/app/lib/db";
import { restaurantSchema } from "@/app/lib/restaurantModal";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  await mongoose.connect(connectionStr, { useNewUrlParser: true });
  let success = false;
  let result = await restaurantSchema.find();
  result = result.map(
    (item) => item?.city?.charAt(0).toUpperCase() + item?.city?.slice(1)
  );

  if (result) {
    success = true;
  }

  result = [...new Set(result.map((item) => item))];
  return NextResponse.json({ success, result });
}
