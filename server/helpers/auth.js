import bcrypt from "bcrypt";
import crypto from "crypto";

export const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(12, (err, salt) => {
      if (err) {
        reject(err);
      }
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  });
};

export const comparePassword = (password, hashed) => {
  return bcrypt.compare(password, hashed);
};

export const generateVerificationToken = () => {
  const token = crypto.randomBytes(20).toString("hex");
  const expiryDate = Date.now() + 5 * 60 * 1000; // Set expiry time to 5 minutes from now
  return { token, expiryDate };
};

export const generateOrderNumber = () => {
  const ordernum = crypto.randomBytes(8).toString("hex");
  return { ordernum };
};
