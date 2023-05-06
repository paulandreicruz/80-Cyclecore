import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      trim: true,
      required: true,
    },
    lastname: {
      type: String,
      trim: true,
      required: true,
    },
    birthdate: {
      type: Date,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 100,
    },
    role: {
      type: Number,
      default: 0,
    },

    address: [
      {
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
    ],
    shippingAddress: {
      type: {
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
    },
    paymentOption: {
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
    contactnum: {
      type: Number,
      required: true,
      trim: true,
      unique: true,
    },
    isVerified: { type: Boolean, default: false },
    verificationToken: {
      type: String,
    },
    emailVerificationExpiry: { type: Date },
    resendVerificationEmails: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: {
      createdAt: "created_at", // Use `created_at` to store the created date
      updatedAt: "updated_at", // and `updated_at` to store the last updated date
    },
  }
);

export default mongoose.model("User", userSchema);
