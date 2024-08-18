import { connectionStr } from "@/app/lib/db";
import { NextResponse } from "next/server";
import mongoose from "mongoose"
import { restaurantSchema } from "@/app/lib/restaurantModal";

export async function GET() {
    await mongoose.connect(connectionStr, { useNewUrlParser: true });
    const data = await restaurantSchema.find()
    console.log(data);

    return NextResponse.json({ result: true })
}

export async function POST(request) {
    let payload = await request.json();
    await mongoose.connect(connectionStr, { useNewUrlParser: true });
    let result;
    let success = false
    if (payload.login) {
        // use it for login purpose 
        result = await restaurantSchema.findOne({ email: payload.email, password: payload.password })
        if(result){
            success = true
        }
    } else {
        // use it for signup purpose 
        let restaurant = new restaurantSchema(payload)
        result = await restaurant.save();
        if(result){
            success=true
        }
    }
    return NextResponse.json({ result, success })
}
