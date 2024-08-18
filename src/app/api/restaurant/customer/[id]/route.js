import { connectionStr } from "@/app/lib/db";
import { foodsSchema } from "@/app/lib/foodsModal";
import { restaurantSchema } from "@/app/lib/restaurantModal";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request, content) {
    console.log(content.params.id);
    await mongoose.connect(connectionStr,{useNewUrlParser:true})
    let result = await restaurantSchema.findOne({_id:content.params.id})
    const foodItems = await foodsSchema.find({resto_id:content.params.id})
    return NextResponse.json({result,foodItems,success:true})
}