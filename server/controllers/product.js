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
import paypal from "paypal-rest-sdk";
import { generateOrderNumber } from "../helpers/auth.js";

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_KEY);

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

paypal.configure({
  mode: "sandbox", // sandbox or live
  client_id: process.env.PAYPAL_C_ID,
  client_secret: process.env.PAYPAL_S,
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
    const { name, description, price, shipping, category, subcategory, brand } =
      req.fields;
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

const decrementStocks = async (cart) => {
  try {
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
  } catch (err) {
    console.log(err);
  }
};

export const processPayment = async (req, res) => {
  try {
    console.log(req.body);
    const { nonce, cart } = req.body;

    // Retrieve user to get delivery fee
    const user = await User.findById(req.user._id);
    const deliveryFee = user.deliveryFee;
    console.log("deliveryFee:", deliveryFee);
    let totalPrice = 0;
    let totalQuantity = 0;
    cart.forEach((item) => {
      totalPrice += item.price * item.quantity;
      totalQuantity += item.quantity;
    });

    totalPrice += deliveryFee;
    console.log("totalPrice:", totalPrice);

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
        customframename: item.customframename,
        customframeprice: item.customframeprice,
        customhandlebarname: item.customhandlebarname,
        customhandlebarprice: item.customhandlebarprice,
        customgroupsetname: item.customhandlebarname,
        customgroupsetprice: item.customhandlebarprice,
        customwheelsetname: item.customwheelsetname,
        customwheelsetprice: item.customwheelsetprice,
        customtirename: item.customtirename,
        customtireprice: item.customtireprice,
        customtsaddlename: item.customtsaddlename,
        customsaddleprice: item.customsaddleprice,
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
          const deliveryOption = user.deliveryOption; // get deliveryOption from user document
          const deliveryFee = user.deliveryFee; // get deliveryFee from user document
          const estimatedDelivery = user.estimatedDelivery; // get estimatedDelivery from user document
          const ordernumber = generateOrderNumber();
          const order = new Order({
            products: cart,
            ordernumber: ordernumber.ordernum,
            payment: result,
            buyer: req.user._id,
            shippingAddress: shippingAddress, // populate shippingAddress with user document
            deliveryOption: deliveryOption,
            deliveryFee: deliveryFee,
            estimatedDelivery: estimatedDelivery,
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

const executePayment = (paymentId, payerId) => {
  return new Promise((resolve, reject) => {
    const paymentDetails = { payer_id: payerId };
    paypal.payment.execute(paymentId, paymentDetails, (error, payment) => {
      if (error) {
        reject(error);
      } else {
        resolve(payment);
      }
    });
  });
};

export const paypalPayment = async (req, res) => {
  try {
    const { cart } = req.body;

    let totalPrice = 0;
    let totalQuantity = 0;
    cart.forEach((item) => {
      totalPrice += item.price * item.quantity;
      totalQuantity += item.quantity;
    });

    const user = await User.findById(req.user._id);
    const deliveryFee = user.deliveryFee;

    // Build PayPal payment request object
    const paymentRequest = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: "http://localhost:5173/dashboard/user/paypalsuccess",
        cancel_url: "http://localhost:5173/dashboard/user/checkout",
      },
      transactions: [
        {
          amount: {
            total: totalPrice.toFixed(2),
            currency: "PHP",
          },
          description: "Purchase from Cyclecore",
          item_list: {
            items: cart.map((item) => {
              return {
                name: item.name,
                price: item.price.toFixed(2),
                currency: "PHP",
                quantity: item.quantity,
              };
            }),
          },
        },
      ],
    };
    // Create a PayPal payment
    const createPayment = () => {
      return new Promise((resolve, reject) => {
        paypal.payment.create(paymentRequest, function (error, payment) {
          if (error) {
            reject(error);
          } else {
            resolve(payment);
          }
        });
      });
    };

    const createdPayment = await createPayment();

    console.log("PayPal createPayment response:", createdPayment);

    // Save the payment ID in your database
    const paymentId = createdPayment.id;

    //product return
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
        customframename: item.customframename,
        customframeprice: item.customframeprice,
        customhandlebarname: item.customhandlebarname,
        customhandlebarprice: item.customhandlebarprice,
        customgroupsetname: item.customhandlebarname,
        customgroupsetprice: item.customhandlebarprice,
        customwheelsetname: item.customwheelsetname,
        customwheelsetprice: item.customwheelsetprice,
        customtirename: item.customtirename,
        customtireprice: item.customtireprice,
        customtsaddlename: item.customtsaddlename,
        customsaddleprice: item.customsaddleprice,
      };
    });

    //create an order
    const shippingAddress = user.shippingAddress; // get shippingAddress from user document
    const deliveryOption = user.deliveryOption; // get deliveryOption from user document
    const estimatedDelivery = user.estimatedDelivery; // get estimatedDelivery from user document
    const paymentOption = user.paymentOption;
    const ordernumber = generateOrderNumber();
    const order = new Order({
      products: cart,
      paymentId: paymentId,
      paypalpayment: createdPayment,
      ordernumber: ordernumber.ordernum,
      buyer: req.user._id,
      shippingAddress: shippingAddress, // populate shippingAddress with user document
      deliveryOption: deliveryOption,
      paymentOption: paymentOption,
      estimatedDelivery: estimatedDelivery,
      totalPrice: totalPrice,
      totalQuantity: totalQuantity,
    });
    await order.save();

    await decrementStocks(cart);

    // Get the PayPal payment approval URL
    const approvalUrl = createdPayment.links.find(
      (link) => link.rel === "approval_url"
    ).href;

    // Send the approval URL back to the client
    res.json({ approvalUrl: approvalUrl });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

export const executePaypalPayment = async (req, res) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  try {
    const executedPayment = await executePayment(paymentId, payerId);
    console.log("PayPal executePayment response:", executedPayment);

    // Update the order in your database with the executed payment details
    const order = await Order.findOne({ paymentId: paymentId });
    order.paypalpayment = executedPayment;
    order.paypalstatus = "paid";

    await order.save();

    res.send("Payment successful");
  } catch (error) {
    console.log(error);
    res.status(500).send("Payment failed");
  }
};

export const processPickup = async (req, res) => {
  try {
    console.log(req.body);
    const { cart } = req.body;

    const deliveryFee = 0;

    let totalPrice = 0;
    let totalQuantity = 0;
    cart.forEach((item) => {
      totalPrice += item.price * item.quantity;
      totalQuantity += item.quantity;
    });

    totalPrice += deliveryFee;
    console.log("totalPrice:", totalPrice);

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
        customframename: item.customframename,
        customframeprice: item.customframeprice,
        customhandlebarname: item.customhandlebarname,
        customhandlebarprice: item.customhandlebarprice,
        customgroupsetname: item.customhandlebarname,
        customgroupsetprice: item.customhandlebarprice,
        customwheelsetname: item.customwheelsetname,
        customwheelsetprice: item.customwheelsetprice,
        customtirename: item.customtirename,
        customtireprice: item.customtireprice,
        customtsaddlename: item.customtsaddlename,
        customsaddleprice: item.customsaddleprice,
      };
    });

    // Create order object
    const user = await User.findById(req.user._id).populate({
      path: "shippingAddress",
      select: "addressname region city barangay postalCode street",
    });
    const shippingAddress = user.shippingAddress; // get shippingAddress from user document
    const paymentOption = user.paymentOption;
    const deliveryOption = user.deliveryOption; // get deliveryOption from user document
    const estimatedDelivery = user.estimatedDelivery; // get estimatedDelivery from user document
    const ordernumber = generateOrderNumber();
    const order = new Order({
      products: cart,
      ordernumber: ordernumber.ordernum,
      buyer: req.user._id,
      paymentOption: paymentOption,
      shippingAddress: shippingAddress,
      deliveryOption: deliveryOption,
      estimatedDelivery: estimatedDelivery,
      totalQuantity: totalQuantity,
      totalPrice: totalPrice,
    });

    // Save the order to the database
    await order.save();

    // Decrement the stocks
    await decrementStocks(cart);

    res.json({ ok: true });
  } catch (err) {
    console.log(err);
  }
};

export const orderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    ).populate("buyer", "email firstname lastname");

    //send email

    //prepare email
    const emailData = {
      from: process.env.SENDGRID_EMAIL,
      to: order.buyer.email,
      subject: "Order Status",
      html: ` <div style="background-color: #F5F5F5; padding: 20px; color: black">
      <div style="max-width: 600px; margin: 0 auto; background-color: #fff; border-radius: 8px; padding: 40px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
        <div style="text-align: center;">
          <img src="https://scontent.fmnl5-2.fna.fbcdn.net/v/t39.30808-6/295513367_417116773770605_4039671274580630735_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=e3f864&_nc_eui2=AeEdTcyi4CcYe3wIoeENTvbz3B4F9XFE2-3cHgX1cUTb7TSasIuz-FYKMzneXqMZwtsFkou0Q6iJ4kOY2y40QJHC&_nc_ohc=LJslj-n-HwcAX_1CzoL&_nc_ht=scontent.fmnl5-2.fna&oh=00_AfCWrbvRPpxUQKdoQsqRh-BLF1lJovu9C0knObkaZIds_g&oe=645CB0D2" alt="" style="max-width: 150px;">
        </div>
        <table style="margin-top: 30px; width: 30rem">
          <thead style="text-align: left; border-bottom: 1px solid">
            <tr>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Order Status</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            ${order.products
              .map(
                (product) => `
                <tr>
                  <td>${product.name},</td>
                  <td>${product.quantity}</td>
                  <td>${order.status}</td>
                  <td>${product.price}</td>
                </tr>
                <tr>
                <td>${product.customframename},</td>
                <td>${product.quantity}</td>
                <td></td>
                <td>${product.customframeprice.toLocaleString("en-PH", {
                  style: "currency",
                  currency: "PHP",
                })}</td>
              </tr>
              <tr>
              <td>${product.customhandlebarname},</td>
              <td>${product.quantity}</td>
              <td></td>
              <td>${product.customhandlebarprice.toLocaleString("en-PH", {
                style: "currency",
                currency: "PHP",
              })}</td>
            </tr>
            <tr>
            <td>${product.customwheelsetname},</td>
            <td>${product.quantity}</td>
            <td></td>
            <td>${product.customwheelsetprice.toLocaleString("en-PH", {
              style: "currency",
              currency: "PHP",
            })}</td>
          </tr>
          <tr>
          <td>${product.customtirename},</td>
          <td>${product.quantity}</td>
          <td></td>
          <td>${product.customtireprice.toLocaleString("en-PH", {
            style: "currency",
            currency: "PHP",
          })}</td>
        </tr>
        <tr>
        <td>${product.customsaddlename},</td>
        <td>${product.quantity}</td>
        <td></td>
        <td>${product.customsaddleprice.toLocaleString("en-PH", {
          style: "currency",
          currency: "PHP",
        })}</td>
      </tr>
      <tr>
      <td>${product.customgroupsetname},</td>
      <td>${product.quantity}</td>
      <td></td>
      <td>${product.customgroupsetprice.toLocaleString("en-PH", {
        style: "currency",
        currency: "PHP",
      })}</td>
    </tr>
              `
              )
              .join("")}
          </tbody>
        </table>
        <div style="text-align: left; margin-top: 30px;">
          <h3>Order Total: ${order.totalPrice}</h3>
        </div>
      </div>
    </div> `,
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

export const updateStocks = async (req, res) => {
  try {
    const productId = req.params.productId;
    const { stocks } = req.fields;

    const product = await Product.findById(productId);

    // If the product is not found, return an error message
    if (!product) {
      return res.json({ error: "Product not found" });
    }

    // Update the stocks of the product
    const newStocks = parseInt(stocks);
    product.stocks += newStocks;

    // Check if it's a new month and reset newStocksThisMonth if necessary
    const currentMonth = new Date().getMonth();
    if (product.monthAdded !== currentMonth) {
      product.monthAdded = currentMonth;
      product.newStocksThisMonth = 0;
    }

    // Add the new stocks to newStocksThisMonth and newlyAddedStocks
    product.newStocksThisMonth += newStocks;
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const monthIndex = product.newlyAddedStocks.findIndex(
      (entry) =>
        entry.month === currentMonth &&
        entry.year === year &&
        entry.day === currentDate.getDate()
    );
    if (monthIndex !== -1) {
      // If an entry already exists for the current month, year, and day, update the value
      product.newlyAddedStocks[monthIndex].value += newStocks;
    } else {
      // Otherwise, add a new entry to the array
      product.newlyAddedStocks.push({
        month: currentMonth,
        year: year,
        day: currentDate.getDate(),
        value: newStocks,
      });
    }

    // Save the updated product to the database
    await product.save();
    console.log("Product saved successfully");

    // Return the updated product
    return res.json(product);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};
