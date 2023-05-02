import Product from "../models/product.js";
import Customize from "../models/customize.js";
import User from "../models/user.js";
import slugify from "slugify";
import cloudinary from "cloudinary";
import braintree from "braintree";
import dotenv from "dotenv";
import Order from "../models/order.js";
import Shipping from "../models/shippingoption.js";
import sgMail from "@sendgrid/mail";
import { generateOrderNumber } from "../helpers/auth.js";

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_KEY);

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

export const create = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      stocks,
      shipping,
      category,
      subcategory,
      brand,
      sold,
    } = req.fields;
    const { photo } = req.files;

    // Validation
    switch (true) {
      case !name.trim():
        res.json({ error: "Name is required" });
      case !description.trim():
        res.json({ error: "Description is required" });
      case !price.trim():
        res.json({ error: "Price is required" });
      case !category.trim():
        res.json({ error: "Category is required" });
      case !subcategory.trim():
        res.json({ error: "SubCategory is required" });
      case !brand.trim():
        res.json({ error: "Brand is required" });
      case !stocks.trim():
        res.json({ error: "Stocks is required" });
      case !shipping.trim():
        res.json({ error: "Shipping is required" });
      case photo && photo.size > 10000000:
        res.json({ error: "Image should be less than 10mb" });
    }

    // if (!req.files.photo || !req.files.photo.url) {
    //     return res.status(400).json({ error: "Photo is required" });
    // }

    // Upload image to Cloudinary
    let photoUrl, photoPublicId;
    if (photo) {
      const uploadedPhoto = await cloudinary.uploader.upload(photo.path);
      photoUrl = uploadedPhoto.secure_url;
      photoPublicId = uploadedPhoto.public_id;
    }
    // Create new product
    const product = new Product({
      name,
      description,
      price,
      stocks,
      shipping,
      category,
      subcategory,
      brand,
      sold,
      photo: { url: photoUrl, public_id: photoPublicId },
      slug: slugify(name),
    });

    // Save product to database
    await product.save();
    res.json(product);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

// implement photo
export const list = async (req, res) => {
  try {
    const products = await Product.find({})
      .populate("category")
      .populate("subcategory")
      .populate("brand")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

export const read = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug })
      .select("photo")
      .populate("category")
      .populate("subcategory")
      .populate("brand")
      .populate("name")
      .populate("description")
      .populate("stocks")
      .populate("shipping")
      .populate("price")
      .populate("sold");

    res.json(product);
  } catch (err) {
    console.log(err);
  }
};

export const photo = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId).select(
      "photo"
    );
    if (product.photo && product.photo.url) {
      return res.redirect(product.photo.url);
    }
    return res.sendStatus(404);
  } catch (err) {
    console.log(err);
    return res.sendStatus(404);
  }
};

export const remove = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);

    // Delete photo from Cloudinary if it exists
    if (product.photo && product.photo.public_id) {
      await cloudinary.uploader.destroy(product.photo.public_id);
    }

    // Delete product from database
    await product.remove();

    res.json(product);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Could not delete product" });
  }
};

export const update = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      stocks,
      shipping,
      category,
      subcategory,
      brand,
    } = req.fields;
    const { photo } = req.files;

    // Validation
    switch (true) {
      case !name.trim():
        return res.json({ error: "Name is required" });
      case !description.trim():
        return res.json({ error: "Description is required" });
      case !price.trim():
        return res.json({ error: "Price is required" });
      case !category.trim():
        return res.json({ error: "Category is required" });
      case !subcategory.trim():
        return res.json({ error: "SubCategory is required" });
      case !brand.trim():
        return res.json({ error: "Brand is required" });
      case !stocks.trim():
        return res.json({ error: "Name is required" });
      case !shipping.trim():
        return res.json({ error: "Name is required" });
      case photo && photo.size > 1000000:
        return res.json({ error: "Image should be less than 1mb" });
    }

    // Upload image to Cloudinary
    let photoUrl, photoPublicId;
    if (photo) {
      const uploadedPhoto = await cloudinary.uploader.upload(photo.path);
      photoUrl = uploadedPhoto.secure_url;
      photoPublicId = uploadedPhoto.public_id;
    }

    // Get the existing product
    const product = await Product.findById(req.params.productId);

    // Update the product
    const updatedProduct = {
      name,
      description,
      price,
      stocks,
      shipping,
      category,
      subcategory,
      brand,
      slug: slugify(name),
    };

    if (photo) {
      updatedProduct.photo = { url: photoUrl, public_id: photoPublicId };
    } else {
      updatedProduct.photo = product.photo;
    }

    const result = await Product.findByIdAndUpdate(
      req.params.productId,
      updatedProduct,
      { new: true }
    );

    res.json(result);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

export const filteredProducts = async (req, res) => {
  try {
    const { checked, radio } = req.body;

    let args = {};
    if (checked.length > 0) {
      args["$or"] = [
        { category: checked },
        { subcategory: checked },
        { brand: checked },
      ];
    }
    if (radio.length > 0) args.price = { $gte: radio[0], $lte: radio[1] };

    const products = await Product.find(args);
    console.log("products found in filtered query =>", products.length);
    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

export const productsCount = async (req, res) => {
  try {
    const total = await Product.find({}).estimatedDocumentCount();
    res.json(total);
  } catch (err) {
    console.log(err);
  }
};

export const listProducts = async (req, res) => {
  try {
    const perPage = 5;
    const page = req.params.page ? req.params.page : 1;

    const products = await Product.find({})
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

export const productSearch = async (req, res) => {
  try {
    const { keyword } = req.params;
    const results = await Product.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    });
    res.json(results);
  } catch (err) {
    console.log(err);
  }
};

export const relatedProducts = async (req, res) => {
  try {
    const { productId, categoryId } = req.params;
    const related = await Product.find({
      category: categoryId,
      _id: { $ne: productId },
    })
      .select("-photo")
      .populate("category")
      .limit(4);
    res.json(related);
  } catch (err) {
    console.log(err);
  }
};

export const getToken = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (err) {
    console.log(err);
  }
};

// export const processPayment = async (req, res) => {
//   try {
//     console.log(req.body);
//     const { nonce, cart } = req.body;

//     let totalPrice = 0;
//     let totalQuantity = 0;
//     cart.forEach((item) => {
//       totalPrice += item.price * item.quantity;
//       totalQuantity += item.quantity;
//     });

//     let newTransaction = gateway.transaction.sale(
//       {
//         amount: totalPrice,
//         paymentMethodNonce: nonce,
//         options: {
//           submitForSettlement: true,
//         },
//       },
//       function (error, result) {
//         if (result) {
//           // res.send(result);
//           const order = new Order({
//             products: cart,
//             payment: result,
//             buyer: req.user._id,
//             totalQuantity: totalQuantity, // new field to store total quantity
//             totalPrice: totalPrice // new field to store total price
//           }).save();
//           //decrement Quantity
//           decrementStocks(cart);
//           res.json({ ok: true });
//         } else {
//           res.status(500).send(error);
//         }
//       }
//     );
//   } catch (err) {
//     console.log(err);
//   }
// };

// const decrementStocks = async (cart) => {
//   try {
//     //mongodb query
//     const bulkOps = cart.map((item) => {
//       return {
//         updateOne: {
//           filter: { _id: item._id },
//           update: { $inc: { stocks: -1, sold: +1 } },
//         },
//       };
//     });

//     const updated = await Product.bulkWrite(bulkOps, {});
//   } catch (err) {
//     console.log(err);
//   }
// };

// const decrementStocks = async (cart) => {
//   try {
//     for (let i = 0; i < cart.length; i++) {
//       const product = await Product.findById(cart[i]._id);
//       product.stock -= cart[i].quantity;
//       await product.save();
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };

const decrementStocks = async (cart) => {
  try {
    console.log(cart);
    const bulkOps = cart.map((item) => {
      console.log(item._id);
      return {
        updateOne: {
          filter: { _id: item._id },
          update: { $inc: { stocks: -item.quantity, sold: item.quantity } },
        },
      };
    });
    const result = await Product.bulkWrite(bulkOps);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

export const processPayment = async (req, res) => {
  try {
    console.log(req.body);
    const { nonce, cart } = req.body;

    let totalPrice = 0;
    let totalQuantity = 0;
    cart.forEach((item) => {
      totalPrice += item.price * item.quantity;
      totalQuantity += item.quantity;
    });

    const products = cart.map((item) => {
      return {
        product: item.product ? item.product._id : null,
        quantity: item.quantity,
        name: item.product ? item.product.name : null,
        price: item.price,
        size: item.size,
        photo: {
          url: item.photo && item.photo.url ? item.photo.url : null,
        },
        image: item.image,
      };
    });

    let newTransaction = gateway.transaction.sale(
      {
        amount: totalPrice,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      async function (error, result) {
        if (result) {
          const user = await User.findById(req.user._id).populate({
            path: "shippingAddress",
            select: "addressname region city barangay postalCode street",
          }); // populate shippingAddress with address document
          const shippingAddress = user.shippingAddress; // get shippingAddress from user document
          const ordernumber = generateOrderNumber();
          const order = new Order({
            products: cart,
            ordernumber: ordernumber.ordernum,
            payment: {
              id: result.transaction.id,
              status: result.transaction.status,
              paymentMethod: result.transaction.paymentInstrumentType,
              cardType: result.transaction.creditCard.cardType,
            },
            buyer: req.user._id,
            shippingAddress: shippingAddress, // populate shippingAddress with user document
            totalQuantity: totalQuantity, // new field to store total quantity
            totalPrice: totalPrice, // new field to store total price
          });
          // Save the order to the database
          await order.save();

          // Decrement the stocks
          await decrementStocks(cart);

          res.json({ ok: true });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
};

export const orderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(orderId, { status }).populate(
      "buyer",
      "email firstname lastname"
    );

    //send email

    //prepare email
    const emailData = {
      from: process.env.SENDGRID_EMAIL,
      to: order.buyer.email,
      subject: "Order Status",
      html: `  <h1>Hi ${order.buyer.name}, Your order's status is: <span style="color:red;">${order.status}</span></h1>
      <p>Visit <a href="${process.env.CLIENT_URL}/dashboard/user/orders">your dashboard</a> for more details</p>`,
    };

    try {
      await sgMail.send(emailData);
    } catch (err) {
      console.log(err);
    }
    res.json(order);
  } catch (err) {
    console.log(err);
  }
};

export const addShippingOption = async (req, res) => {
  try {
    const { deliveryOption, estimatedDelivery, deliveryFee } = req.body;

    const shipping = new Shipping({
      deliveryOption,
      estimatedDelivery,
      deliveryFee,
    });

    const createdShipping = await shipping.save();

    res.status(201).json(createdShipping);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getShippingOption = async (req, res) => {
  try {
    const paymentOptions = await Shipping.find();
    res.json(paymentOptions);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createcustomize = async (req, res) => {
  try {
    const { name, description, price, shipping, category, brand, size, title } =
      req.fields;
    const { photo } = req.files;

    // Validation
    switch (true) {
      case !name.trim():
        res.json({ error: "Name is required" });
      case !description.trim():
        res.json({ error: "Description is required" });
      case photo && photo.size > 10000000:
        res.json({ error: "Image should be less than 10mb" });
    }

    // if (!req.files.photo || !req.files.photo.url) {
    //     return res.status(400).json({ error: "Photo is required" });
    // }

    // Upload image to Cloudinary
    let photoUrl, photoPublicId;
    if (photo) {
      const uploadedPhoto = await cloudinary.uploader.upload(photo.path);
      photoUrl = uploadedPhoto.secure_url;
      photoPublicId = uploadedPhoto.public_id;
    }
    // Create new product
    const customize = new Customize({
      name,
      description,
      price,
      shipping,
      category,
      brand,
      title,
      size,
      photo: { url: photoUrl, public_id: photoPublicId },
      slug: slugify(name),
    });

    // Save product to database
    await customize.save();
    res.json(customize);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

// implement photo
export const listcustomize = async (req, res) => {
  try {
    const customize = await Customize.find({})
      .populate("category")
      .populate("brand")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });

    res.json(customize);
  } catch (err) {
    console.log(err);
  }
};

export const readcustomize = async (req, res) => {
  try {
    const customize = await Customize.findOne({ slug: req.params.slug })
      .select("photo")
      .populate("category")
      .populate("title")
      .populate("brand")
      .populate("name")
      .populate("description")
      .populate("shipping")
      .populate("price");

    res.json(customize);
  } catch (err) {
    console.log(err);
  }
};

export const photocustomize = async (req, res) => {
  try {
    const customize = await Customize.findById(req.params.customizeId).select(
      "photo"
    );
    if (customize.photo && customize.photo.url) {
      return res.redirect(customize.photo.url);
    }
    return res.sendStatus(404);
  } catch (err) {
    console.log(err);
    return res.sendStatus(404);
  }
};
