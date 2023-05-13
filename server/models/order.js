import mongoose from "mongoose";

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

//CATEGORY SCHEMA

const orderSchema = new Schema(
  {
    products: [
      {
        product: {
          type: ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          required: true,
        },
        name: {
          type: String,
        },
        price: {
          type: Number,
          trim: true,
          required: true,
        },
        size: {
          type: String,
        },
        photo: {
          url: {
            type: String,
          },
        },
        image: {
          type: String,
        },
        customframename: {
          type: String,
        },
        customframeprice: {
          type: String,
        },
        customhandlebarname: {
          type: String,
        },
        customhandlebarprice: {
          type: String,
        },
        customgroupsetname: {
          type: String,
        },
        customgroupsetprice: {
          type: String,
        },
        customwheelsetname: {
          type: String,
        },
        customwheelsetprice: {
          type: String,
        },
        customtirename: {
          type: String,
        },
        customtireprice: {
          type: String,
        },
        customtsaddlename: {
          type: String,
        },
        customsaddleprice: {
          type: String,
        },
      },
    ],

    payment: {
      // id: String, // Braintree transaction ID
      // status: String, // Braintree transaction status
      // paymentMethod: String, // Payment method selected by user
      // cardType: String,
    },
    buyer: {
      type: ObjectId,
      ref: "User",
    },
    shippingAddress: {
      addressname: {
        type: String,
        required: false,
      },
      region: {
        type: String,
        required: false,
      },
      city: {
        type: String,
        required: false,
      },
      barangay: {
        type: String,
        required: false,
      },
      postalCode: {
        type: String,
        required: false,
      },
      street: {
        type: String,
        required: false,
      },
    },
    ordernumber: {
      type: String,
    },
    deliveryOption: {
      type: String,
    },
    estimatedDelivery: {
      type: String,
    },
    deliveryFee: {
      type: Number,
    },
    paymentOption: {
      type: String,
    },
    status: {
      type: String,
      default: "Not Processed",
      enum: ["Not Processed", "Processing", "Shiped", "Delivered", "Cancelled", "Ready for Pickup"],
    },
    totalQuantity: {
      type: Number,
    },
    totalPrice: {
      type: Number,
    },
    paymentId: {
      type: String,
      required: false,
    },
    paypalpayment: {},
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
