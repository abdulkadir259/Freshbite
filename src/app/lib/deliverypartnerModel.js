const { default: mongoose } = require("mongoose");

const deliveryPartnerModal = new mongoose.Schema({
  name: String,
  password: String,
  city: String,
  address: String,
  mobile: String,
});

export const deliveryPartnerSchema =
  mongoose.models.deliveryPartner ||
  mongoose.model("deliveryPartner", deliveryPartnerModal);
