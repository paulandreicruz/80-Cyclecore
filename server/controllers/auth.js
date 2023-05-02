import User from "../models/user.js";
import {
  hashPassword,
  comparePassword,
  generateVerificationToken,
} from "../helpers/auth.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Order from "../models/order.js";
import sgMail from "@sendgrid/mail";
import nodemailer from "nodemailer";

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_KEY);

// export const register = async (req, res) => {
//   try {
//     // 1. destructor name, email, passwprd from req.body
//     const {
//       firstname,
//       lastname,
//       email,
//       password,
//       address,
//       contactnum,
//       birthdate,
//     } = req.body;
//     const today = new Date();
//     const birthdateObject = new Date(birthdate);
//     const age = today.getFullYear() - birthdateObject.getFullYear();
//     const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/;
//     const phoneRegex = /^\d{11}$/;

//     // 2. all fields require validation
//     if (!firstname.trim()) {
//       return res.json({ error: "Firstname is required" });
//     }
//     if (!lastname.trim()) {
//       return res.json({ error: "Lastname is required" });
//     }
//     if (!email) {
//       return res.json({ error: "Email is taken" });
//     }
//     if (!contactnum) {
//       return res.json({ error: "Email is taken" });
//     }
//     // if(!contactnum.trim()){
//     //     return res.json({error: "Contact Number is required"});
//     // }
//     if (age < 18) {
//       return res.json({
//         error: "You must be atleast 18 years old to register",
//       });
//     }
//     if (!passwordRegex.test(password)) {
//       return res.json({
//         error:
//           "Password must contain at least one uppercase letter, one special character, and one number, and be at least 8 characters long.",
//       });
//     }
//     // if (!phoneRegex.test(contactnum)) {
//     //     return res.json({ error: "Phone number must have 11 digits only." });
//     //   }
//     // 3. check if email is taken.
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.json({ error: "Email is taken" });
//     }
//     const contactUser = await User.findOne({ contactnum });
//     if (contactUser) {
//       return res.json({ error: "Phone Number is taken" });
//     }
//     // 4. hash passwor
//     const hashedPassword = await hashPassword(password);
//     // 5. register user
//     const user = await new User({
//       firstname,
//       lastname,
//       email,
//       birthdate,
//       address,
//       contactnum,
//       password: hashedPassword,
//     }).save();
//     // 6. create signed jwt
//     const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "7d",
//     });
//     // 7. send response
//     res.json({
//       user: {
//         firstname: user.firstname,
//         lastname: user.lastname,
//         email: user.email,
//         birthdate: user.birthdate,
//         role: user.role,
//         address: user.address,
//         contactnum: user.contactnum,
//       },
//       token,
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };

export const register = async (req, res) => {
  try {
    // Destructure fields from req.body
    const {
      firstname,
      lastname,
      email,
      password,
      address,
      contactnum,
      birthdate,
    } = req.body;

    // Validate fields
    // ...

    const today = new Date();
    const birthdateObject = new Date(birthdate);
    const age = today.getFullYear() - birthdateObject.getFullYear();
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/;
    const phoneRegex = /^\d{11}$/;

    if (!firstname.trim()) {
      return res.json({ error: "Firstname is required" });
    }
    if (!lastname.trim()) {
      return res.json({ error: "Lastname is required" });
    }
    if (!email) {
      return res.json({ error: "Email is taken" });
    }
    if (!contactnum) {
      return res.json({ error: "Contact number is taken" });
    }
    // if(!contactnum.trim()){
    //     return res.json({error: "Contact Number is required"});
    // }
    if (age < 18) {
      return res.json({
        error: "You must be atleast 18 years old to register",
      });
    }
    if (!passwordRegex.test(password)) {
      return res.json({
        error:
          "Password must contain at least one uppercase letter, one special character, and one number, and be at least 8 characters long.",
      });
    }
    // if (!phoneRegex.test(contactnum)) {
    //     return res.json({ error: "Phone number must have 11 digits only." });
    //   }
    // 3. check if email is taken.
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ error: "Email is taken" });
    }
    const contactUser = await User.findOne({ contactnum });
    if (contactUser) {
      return res.json({ error: "Phone Number is taken" });
    }
    // Check if email or contactnum are already registered
    // ...
    const hashedPassword = await hashPassword(password);

    // Generate verification token and save it to user document
    const verificationToken = generateVerificationToken();
    const user = await new User({
      firstname,
      lastname,
      email,
      birthdate,
      address,
      contactnum,
      password: hashedPassword,
      isVerified: false,
      verificationToken: verificationToken.token,
      emailVerificationExpiry: verificationToken.expiryDate,
    }).save();

    // Send verification email to user's email address
    const verificationLink = `${process.env.CLIENT_URL}/verify-email/${verificationToken.token}`;

    const emailData = {
      from: process.env.SENDGRID_EMAIL,
      to: user.email,
      subject: "Email Verification",
      html: `Hello! Just one more step to continue cycling Click <a href="${verificationLink}">here</a> to verify your email address.`,
    };

    await sgMail.send(emailData);

    // Send response
    res.json({
      message:
        "Registration successful. Please check your email to verify your email address.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

// export const verifyEmail = async (req, res) => {
//   try {
//     const { token } = req.query;

//     // Find user with matching verification token
//     const user = await User.findOne({ verificationToken: token });

//     console.log("User found:", user?.email); // Log the user's email address

//     if (!user) {
//       return res.status(400).json({ error: "Invalid or expired token" });
//     }

//     // Update user's isVerified field to true
//     user.isVerified = true;
//     user.verificationToken = null;

//     await user.save();
//     console.log("User saved successfully:", user);
//     return res
//       .status(200)
//       .json({ message: "Email address verified successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "An error occurred" });
//   }
// };

export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;

    // Find user with matching verification token
    const user = await User.findOne({ verificationToken: token });

    console.log("User found:", user?.email); // Log the user's email address

    if (!user) {
      return res.json({ error: "Invalid or expired token" });
    }

    // Check if verification token has expired
    if (user.emailVerificationExpiry < Date.now()) {
      return res.json({ error: "Verification token has expired" });
    }

    // Update user's isVerified field to true
    user.isVerified = true;
    user.verificationToken = null;
    user.emailVerificationExpiry = null;

    await user.save();
    console.log("User saved successfully:", user);
    return res
      .status(200)
      .json({ message: "Email Has Successfully Verified!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

export const resendVerificationEmail = async (req, res) => {
  try {
    const { email } = req.body;

    // Find user with matching email address
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "User already verified" });
    }

    // Check the resend verification email counter
    if (user.resendVerificationEmails >= 5) {
      return res.status(400).json({
        error: "Maximum resend verification email limit reached",
      });
    }

    // Increment the resend verification email counter
    user.resendVerificationEmails = user.resendVerificationEmails + 1;

    // Generate new verification token and expiry date and save to user's account
    const verificationToken = generateVerificationToken();
    user.isVerified = false;
    user.verificationToken = verificationToken.token;
    user.emailVerificationExpiry = verificationToken.expiryDate;

    await user.save();

    // Send verification email with new token to user's email address
    const verificationLink = `${process.env.CLIENT_URL}/verify-email/${verificationToken.token}`;

    const emailData = {
      from: process.env.SENDGRID_EMAIL,
      to: user.email,
      subject: "Email Verification",
      html: `Hello! Just one more step to continue cycling Click <a href="${verificationLink}"><button>here</button></a> to verify your email address.`,
    };

    await sgMail.send(emailData);

    // Send success message to client
    res.json({ message: "New verification email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

// export const resendVerificationEmail = async (req, res) => {
//   try {
//     const { email } = req.body;

//     // Find user with matching email address
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(400).json({ error: "User not found" });
//     }

//     // Check the resend verification email counter
//     if (user.resendVerificationEmails >= 5) {
//       return res
//         .status(400)
//         .json({ error: "Maximum resend verification email limit reached" });
//     }

//     // Increment the resend verification email counter
//     user.resendVerificationEmails++;

//     // Save the updated user document to the database
//     await user.save();

//     // Generate new verification token and expiry date and save to user's account
//     // Update user's isVerified field to false
//     const verificationToken = generateVerificationToken();
//     user.isVerified = false;
//     user.verificationToken = verificationToken.token;
//     user.emailVerificationExpiry = verificationToken.expiryTime;

//     // Reset the resend verification email counter
//     user.resendVerificationEmails = 0;

//     await user.save();

//     // Send verification email with new token to user's email address
//     const verificationLink = `${process.env.CLIENT_URL}/verify-email?token=${verificationToken.token}`;

//     const emailData = {
//       from: process.env.SENDGRID_EMAIL,
//       to: user.email,
//       subject: "Email Verification",
//       html: `Hello! Just one more step to continue cycling Click <a href="${verificationLink}">here</a> to verify your email address.`,
//     };

//     await sgMail.send(emailData);

//     // Send response
//     res.json({ message: "New verification email sent successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "An error occurred" });
//   }
// };

export const login = async (req, res) => {
  try {
    // 1. destructor name, email, passwprd from req.body
    const { email, password } = req.body;
    // 2. all fields require validation
    if (!email) {
      return res.json({ error: "Email is required" });
    }
    // 3. check if email is none.
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ error: "User not found" });
    }
    if (!user.isVerified) {
      return res.json({
        error: "Please check your email for confirmation before logging in",
      });
    }
    // 4. compare password
    const matchpass = await comparePassword(password, user.password);
    if (!matchpass) {
      return res.json({ error: "Wrong password" });
    }
    // 5. create signed jwt
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    // 6. send response
    res.json({
      user: {
        firstname: user.firstname,
        lastname: user.lastname,
        birthdate: user.birthdate,
        contactnum: user.contactnum,
        email: user.email,
        role: user.role,
        address: user.address,
      },
      token,
    });
  } catch (err) {
    console.log(err);
  }
};

export const secret = async (req, res) => {
  res.json({ currentUser: req.user });
};

export const updateProfile = async (req, res) => {
  try {
    const { firstname, lastname, password, address } = req.body;
    const user = await User.findById(req.user._id);
    // check password length
    if (
      password &&
      !/(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(password)
    ) {
      return res.json({
        error:
          "Password should contain at least one uppercase letter, one special character, and one number, and be at least 8 characters long",
      });
    }
    //hash password
    const hashedPassword = password ? await hashPassword(password) : undefined;

    const updated = await User.findByIdAndUpdate(
      req.user._id,
      {
        firstname: firstname || user.firstname,
        lastname: lastname || user.lastname,
        password: hashedPassword || user.password,
        address: address || user.address,
      },
      {
        new: true,
      }
    );

    updated.password = undefined;
    res.json(updated);
  } catch (err) {
    console.log(err);
  }
};

// export const addAddress = async (req, res) => {
//   try {
//     const { region, city, barangay, postalCode, street } = req.body;

//     // Get the user ID from the authenticated user's token
//     const userId = req.user._id;

//     // Find the user by their ID and update their address array with the new address object
//     const user = await User.findByIdAndUpdate(
//       userId,
//       {
//         $push: {
//           address: { region, city, barangay, postalCode, street },
//         },
//       },
//       { new: true }
//     );
//     // Return the updated user object as the response
//     res.json(user);
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const addAddress = async (req, res) => {
//   try {
//     const { region, city, barangay, postalCode, street } = req.body;

//     // Get the user ID from the authenticated user's token
//     const userId = req.user._id;

//     // Find the user by their ID
//     const user = await User.findById(userId);

//     // Check if the user has already added 3 addresses
//     if (user.address.length >= 3) {
//       return res.status(400).json({ message: "Maximum number of addresses reached" });
//     }

//     // Add the new address object to the user's address array
//     user.address.push({ region, city, barangay, postalCode, street });

//     // Save the updated user object to the database
//     await user.save();

//     // Return the updated user object as the response
//     res.json(user);
//   } catch (err) {
//     console.log(err);
//   }
// };

export const addAddress = async (req, res) => {
  try {
    const { region, city, barangay, postalCode, street, addressname } =
      req.body;

    // Get the user ID from the authenticated user's token
    const userId = req.user._id;

    // Find the user by their ID
    const user = await User.findById(userId);

    // Check if the user has already added 3 addresses
    if (user.address.length >= 3) {
      return res
        .status(400)
        .json({ message: "Maximum number of addresses reached" });
    }

    // Add the new address object to the user's address array
    user.address.push({
      region,
      city,
      barangay,
      postalCode,
      street,
      addressname,
    });

    // Save the updated user object to the database
    await user.save();

    // Return the updated user object as the response
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to add address" });
  }
};

export const getAddress = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    res.json(user.address);
  } catch (err) {
    console.log(err);
  }
};

export const deleteAddress = async (req, res) => {
  try {
    const userId = req.user._id;
    const addressId = req.params.addressId;

    const user = await User.findById(userId);
    user.address.pull({ _id: addressId });
    await user.save();

    res.json({ message: "Address deleted successfully" });
  } catch (err) {
    console.log(err);
  }
};

export const addShippingAddress = async (req, res) => {
  try {
    const { addressIndex } = req.body;

    // Get the user ID from the authenticated user's token
    const userId = req.user._id;

    // Find the user by their ID
    const user = await User.findById(userId);

    // Check if the selected address index is valid
    if (addressIndex < 0 || addressIndex >= user.address.length) {
      return res.status(400).json({ message: "Invalid address index" });
    }

    // Set the selected address as the user's shipping address
    user.shippingAddress = user.address[addressIndex];

    // Save the updated user object to the database
    await user.save();

    // Return the updated user object as the response
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to add shipping address" });
  }
};

export const getShippingAddress = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    res.json(user.shippingAddress);
  } catch (err) {
    console.log(err);
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ buyer: req.user._id })
      .populate("products", "photo name price")
      .populate("buyer", "firstname lastname shippingAddress")
      .sort({ createdAt: "-1" });
    res.json(orders);
  } catch (err) {
    console.log(err);
  }
};

export const allOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("products", "-photo")
      .populate("buyer", "firstname lastname shippingAddress")
      .sort({ createdAt: "-1" });
    res.json(orders);
  } catch (err) {
    console.log(err);
  }
};

export const send = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Create a transport for sending email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    // Set up email details
    const mailOptions = {
      from: email,
      to: process.env.MY_EMAIL,
      subject: subject,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    // Send the email using nodemailer
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Email sent successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error sending email" });
  }
  
};
export const orderSearch = async (req, res) => {
  try {
    const { keyword } = req.params;
    const results = await Order.find({
      $or: [{ ordernumber: { $regex: keyword, $options: "i" } }],
    });
    res.json(results);
  } catch (err) {
    console.log(err);
  }
};
