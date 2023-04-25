import mongoose from "mongoose";

const shippingSchema = new mongoose.Schema({
  deliveryOption: {
    type: String,
    required: true,
  },
  estimatedDelivery: {
    type: String,
    required: true,
  },
  deliveryFee: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("Shipping", shippingSchema);
