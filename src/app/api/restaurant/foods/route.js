import { connectionStr } from "@/app/lib/db";
import { foodsSchema } from "@/app/lib/foodsModal";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
const payload = await request.json();
console.log(payload);
let success=false;
await mongoose.connect(connectionStr,{useNewUrlParser:true})    
const food =  new foodsSchema(payload)
const result = await food.save();
console.log(" heelo resultt",result);
if(result){
    success= true
}

return NextResponse.json({result, success})
}