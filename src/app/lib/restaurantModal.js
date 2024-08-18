const {default:mongoose} = require("mongoose");

const restaurantModal = new mongoose.Schema({
    name:String,
    email:String,
    city:String,
    address:String,
    password:String,
    contact:String
});

export const restaurantSchema = mongoose.models.restaurants
|| mongoose.model("restaurants",restaurantModal)