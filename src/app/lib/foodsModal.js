const { default: mongoose } = require("mongoose");


const foodModal = new mongoose.Schema({
    name:String,
    price:Number,
    img_path:String,
    description:String,
    resto_id:mongoose.Schema.Types.ObjectId
});

export const foodsSchema = mongoose.models.fooditem || mongoose.model("fooditem",foodModal)