import Frame3 from "../models/bike3/frame3.js";
import Tire3 from "../models/bike3/tire3.js";
import Groupset3 from "../models/bike3/groupset3.js";
import Wheelset3 from "../models/bike3/wheel3.js";
import Saddle3 from "../models/bike3/saddle3.js"
import slugify from "slugify";
import cloudinary from "cloudinary";


export const createframe3 = async (req, res) => {
  try {
    const { name, description, price, category, brand, size, stocks } =
      req.fields;
    const { photo, img } = req.files;

    switch (true) {
      case !name.trim():
        res.json({ error: "Name is required" });
      case !description.trim():
        res.json({ error: "Description is required" });
      case !size.trim():
        res.json({ error: "Size is required" });
      case !price.trim():
        res.json({ error: "Price is required" });
      case !category.trim():
        res.json({ error: "Category is required" });
      case !brand.trim():
        res.json({ error: "Brand is required" });
      case !stocks.trim():
        res.json({ error: "Stocks is required" });
      case photo && photo.size > 10000000:
        res.json({ error: "Image should be less than 10mb" });
      case img && img.size > 10000000:
        res.json({ error: "Image should be less than 10mb" });
    }

    // Upload image to Cloudinary
    let photoUrl;
    if (photo) {
      const uploadedPhoto = await cloudinary.uploader.upload(photo.path);
      photoUrl = uploadedPhoto.secure_url;
    }

    let imgUrls = [];

    if (img && Array.isArray(img)) {
      console.log("Multiple files detected!");
      // If img is an array of files, upload each file to Cloudinary and store their URLs in imgUrls
      for (let i = 0; i < img.length; i++) {
        const uploadedImg = await cloudinary.uploader.upload(img[i].path);
        imgUrls.push(uploadedImg.secure_url);
      }
    } else if (img) {
      // If img is a single file, upload it to Cloudinary and store its URL in imgUrls
      const uploadedImg = await cloudinary.uploader.upload(img.path);
      imgUrls.push(uploadedImg.secure_url);
    }

    // Create new frame
    const frame3 = new Frame3({
      name,
      description,
      price,
      stocks,
      category,
      brand,
      size,
      img: { url: imgUrls },
      photo: { url: photoUrl },
      slug: slugify(name),
    });

    // Save frame to database
    await frame3.save();
    res.status(201).json(frame3);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Failed to create frame" });
  }
};

// implement photo
export const listframe3 = async (req, res) => {
  try {
    const frame3 = await Frame3.find({}).sort({ createdAt: -1 });

    res.json(frame3);
  } catch (err) {
    console.log(err);
  }
};

export const frame3photo = async (req, res) => {
  try {
    const frame3 = await Frame3.findById(req.params.frame3Id).select("photo");
    if (frame3.photo && frame3.photo.url) {
      return res.redirect(frame3.photo.url);
    }
    return res.sendStatus(404);
  } catch (err) {
    console.log(err);
    return res.sendStatus(404);
  }
};


export const frame3img = async (req, res) => {
  try {
    const frame3 = await Frame3.findById(req.params.frame3Id).select(
      "img"
    );
    if (
      frame3.img &&
      Array.isArray(frame3.img.url) &&
      frame3.img.url.length > 0
    ) {
      // If img is an array of URLs and contains at least one URL, redirect the client to the first URL in the array
      return res.redirect(frame3.img.url[0]);
    } else if (frame3.img && typeof frame3.img.url === "string") {
      // If img is a single URL, redirect the client to the URL
      return res.redirect(frame3.img.url);
    } else {
      // If img is not found or does not contain valid URLs, send a 404 Not Found status code
      return res.sendStatus(404);
    }
  } catch (err) {
    console.log(err);
    return res.sendStatus(404);
  }
};

// tire

export const createtire3 = async (req, res) => {
  try {
    const { name, description, price, category, brand, size, stocks } =
      req.fields;
    const { photo, img } = req.files;

    //validator

    switch (true) {
      case !name.trim():
        res.json({ error: "Name is required" });
      case !description.trim():
        res.json({ error: "Description is required" });
      case !size.trim():
        res.json({ error: "Size is required" });
      case !price.trim():
        res.json({ error: "Price is required" });
      case !category.trim():
        res.json({ error: "Category is required" });
      case !brand.trim():
        res.json({ error: "Brand is required" });
      case !stocks.trim():
        res.json({ error: "Stocks is required" });
      case photo && photo.size > 10000000:
        res.json({ error: "Image should be less than 10mb" });
      case img && img.size > 10000000:
        res.json({ error: "Image should be less than 10mb" });
    }

    // Upload image to Cloudinary
    let photoUrl;
    if (photo) {
      const uploadedPhoto = await cloudinary.uploader.upload(photo.path);
      photoUrl = uploadedPhoto.secure_url;
    }

    let imgUrls = [];

    if (img && Array.isArray(img)) {
      console.log("Multiple files detected!");
      // If img is an array of files, upload each file to Cloudinary and store their URLs in imgUrls
      for (let i = 0; i < img.length; i++) {
        const uploadedImg = await cloudinary.uploader.upload(img[i].path);
        imgUrls.push(uploadedImg.secure_url);
      }
    } else if (img) {
      // If img is a single file, upload it to Cloudinary and store its URL in imgUrls
      const uploadedImg = await cloudinary.uploader.upload(img.path);
      imgUrls.push(uploadedImg.secure_url);
    }

    // Create new tire
    const tire3 = new Tire3({
      name,
      description,
      price,
      stocks,
      category,
      brand,
      size,
      img: { url: imgUrls },
      photo: { url: photoUrl },
      slug: slugify(name),
    });

    // Save frame to database
    await tire3.save();
    res.status(201).json(tire3);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Failed to create tire" });
  }
};

export const listtire3 = async (req, res) => {
  try {
    const tire3 = await Tire3.find({}).sort({ createdAt: -1 });

    res.json(tire3);
  } catch (err) {
    console.log(err);
  }
};

export const tire3photo = async (req, res) => {
  try {
    const tire3 = await Tire3.findById(req.params.tire3Id).select("photo");
    if (tire3.photo && tire3.photo.url) {
      return res.redirect(tire3.photo.url);
    }
    return res.sendStatus(404);
  } catch (err) {
    console.log(err);
    return res.sendStatus(404);
  }
};


export const tire3img = async (req, res) => {
  try {
    const tire3 = await Tire3.findById(req.params.tire3Id).select(
      "img"
    );
    if (
      tire3.img &&
      Array.isArray(tire3.img.url) &&
      tire3.img.url.length > 0
    ) {
      // If img is an array of URLs and contains at least one URL, redirect the client to the first URL in the array
      return res.redirect(tire3.img.url[0]);
    } else if (tire3.img && typeof tire3.img.url === "string") {
      // If img is a single URL, redirect the client to the URL
      return res.redirect(tire3.img.url);
    } else {
      // If img is not found or does not contain valid URLs, send a 404 Not Found status code
      return res.sendStatus(404);
    }
  } catch (err) {
    console.log(err);
    return res.sendStatus(404);
  }
};

// groupset
export const creategroupset3 = async (req, res) => {
  try {
    const { name, description, price, category, brand, size, stocks } =
      req.fields;
    const { photo, img } = req.files;

    //validator

    switch (true) {
      case !name.trim():
        res.json({ error: "Name is required" });
        break;
      case !description.trim():
        res.json({ error: "Description is required" });
        break;
      case !size.trim():
        res.json({ error: "Size is required" });
        break;
      case !price.trim():
        res.json({ error: "Price is required" });
        break;
      case !category.trim():
        res.json({ error: "Category is required" });
        break;
      case !brand.trim():
        res.json({ error: "Brand is required" });
        break;
      case !stocks.trim():
        res.json({ error: "Stocks is required" });
        break;
      case photo && photo.size > 10000000:
        res.json({ error: "Image should be less than 10mb" });
        break;
      case img && img.size > 10000000:
        res.json({ error: "Image should be less than 10mb" });
        break;
    }

    // Upload image to Cloudinary
    let photoUrl;
    if (photo) {
      const uploadedPhoto = await cloudinary.uploader.upload(photo.path);
      photoUrl = uploadedPhoto.secure_url;
    }

    let imgUrls = [];

    if (img && Array.isArray(img)) {
      console.log("Multiple files detected!");
      // If img is an array of files, upload each file to Cloudinary and store their URLs in imgUrls
      for (let i = 0; i < img.length; i++) {
        const uploadedImg = await cloudinary.uploader.upload(img[i].path);
        imgUrls.push(uploadedImg.secure_url);
      }
    } else if (img) {
      // If img is a single file, upload it to Cloudinary and store its URL in imgUrls
      const uploadedImg = await cloudinary.uploader.upload(img.path);
      imgUrls.push(uploadedImg.secure_url);
    }

    // Create new tire
    const groupset3 = new Groupset3({
      name,
      description,
      price,
      stocks,
      category,
      brand,
      size,
      img: { url: imgUrls },
      photo: { url: photoUrl },
      slug: slugify(name),
    });

    // Save frame to database
    await groupset3.save();
    res.status(201).json(groupset3);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Failed to create groupset" });
  }
};

export const listgroupset3 = async (req, res) => {
  try {
    const groupset3 = await Groupset3.find({}).sort({ createdAt: -1 });

    res.json(groupset3);
  } catch (err) {
    console.log(err);
  }
};

export const groupset3photo = async (req, res) => {
  try {
    const groupset3 = await Groupset3.findById(req.params.groupset3Id).select(
      "photo"
    );
    if (groupset3.photo && groupset3.photo.url) {
      return res.redirect(groupset3.photo.url);
    }
    return res.sendStatus(404);
  } catch (err) {
    console.log(err);
    return res.sendStatus(404);
  }
};

export const groupset3img = async (req, res) => {
  try {
    const groupset3 = await Groupset3.findById(req.params.groupset3Id).select(
      "img"
    );
    if (
      groupset3.img &&
      Array.isArray(groupset3.img.url) &&
      groupset3.img.url.length > 0
    ) {
      // If img is an array of URLs and contains at least one URL, redirect the client to the first URL in the array
      return res.redirect(groupset3.img.url[0]);
    } else if (groupset3.img && typeof groupset3.img.url === "string") {
      // If img is a single URL, redirect the client to the URL
      return res.redirect(groupset3.img.url);
    } else {
      // If img is not found or does not contain valid URLs, send a 404 Not Found status code
      return res.sendStatus(404);
    }
  } catch (err) {
    console.log(err);
    return res.sendStatus(404);
  }
};



// wheelset
export const listwheelset3 = async (req, res) => {
  try {
    const wheelset3 = await Wheelset3.find({}).sort({ createdAt: -1 });

    res.json(wheelset3);
  } catch (err) {
    console.log(err);
  }
};

export const wheelset3photo = async (req, res) => {
  try {
    const wheelset3 = await Wheelset3.findById(req.params.wheelset3Id).select(
      "photo"
    );
    if (wheelset3.photo && wheelset3.photo.url) {
      return res.redirect(wheelset3.photo.url);
    }
    return res.sendStatus(404);
  } catch (err) {
    console.log(err);
    return res.sendStatus(404);
  }
};

export const wheelset3img = async (req, res) => {
  try {
    const wheelset3 = await Wheelset3.findById(req.params.wheelset3Id).select(
      "img"
    );
    if (
      wheelset3.img &&
      Array.isArray(wheelset3.img.url) &&
      wheelset3.img.url.length > 0
    ) {
      // If img is an array of URLs and contains at least one URL, redirect the client to the first URL in the array
      return res.redirect(wheelset3.img.url[0]);
    } else if (wheelset3.img && typeof wheelset2.img.url === "string") {
      // If img is a single URL, redirect the client to the URL
      return res.redirect(wheelset3.img.url);
    } else {
      // If img is not found or does not contain valid URLs, send a 404 Not Found status code
      return res.sendStatus(404);
    }
  } catch (err) {
    console.log(err);
    return res.sendStatus(404);
  }
};

export const createwheelset3 = async (req, res) => {
  try {
    const { name, description, price, category, brand, size, stocks } =
      req.fields;
    const { photo, img } = req.files;

    //validator

    switch (true) {
      case !name.trim():
        res.json({ error: "Name is required" });
        break;
      case !description.trim():
        res.json({ error: "Description is required" });
        break;
      case !size.trim():
        res.json({ error: "Size is required" });
        break;
      case !price.trim():
        res.json({ error: "Price is required" });
        break;
      case !category.trim():
        res.json({ error: "Category is required" });
        break;
      case !brand.trim():
        res.json({ error: "Brand is required" });
        break;
      case !stocks.trim():
        res.json({ error: "Stocks is required" });
        break;
      case photo && photo.size > 10000000:
        res.json({ error: "Image should be less than 10mb" });
        break;
      case img && img.size > 10000000:
        res.json({ error: "Image should be less than 10mb" });
        break;
    }

    // Upload image to Cloudinary
    let photoUrl;
    if (photo) {
      const uploadedPhoto = await cloudinary.uploader.upload(photo.path);
      photoUrl = uploadedPhoto.secure_url;
    }

    let imgUrls = [];

    if (img && Array.isArray(img)) {
      console.log("Multiple files detected!");
      // If img is an array of files, upload each file to Cloudinary and store their URLs in imgUrls
      for (let i = 0; i < img.length; i++) {
        const uploadedImg = await cloudinary.uploader.upload(img[i].path);
        imgUrls.push(uploadedImg.secure_url);
      }
    } else if (img) {
      // If img is a single file, upload it to Cloudinary and store its URL in imgUrls
      const uploadedImg = await cloudinary.uploader.upload(img.path);
      imgUrls.push(uploadedImg.secure_url);
    }

    // Create new tire
    const wheelset3 = new Wheelset3({
      name,
      description,
      price,
      stocks,
      category,
      brand,
      size,
      img: { url: imgUrls },
      photo: { url: photoUrl },
      slug: slugify(name),
    });

    // Save frame to database
    await wheelset3.save();
    res.status(201).json(wheelset3);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Failed to create wheelset" });
  }
};


// saddle 

export const createsaddle3 = async (req, res) => {
  try {
    const { name, description, price, category, brand, size, stocks } =
      req.fields;
    const { photo, img } = req.files;

    switch (true) {
      case !name.trim():
        res.json({ error: "Name is required" });
      case !description.trim():
        res.json({ error: "Description is required" });
      case !size.trim():
        res.json({ error: "Size is required" });
      case !price.trim():
        res.json({ error: "Price is required" });
      case !category.trim():
        res.json({ error: "Category is required" });
      case !brand.trim():
        res.json({ error: "Brand is required" });
      case !stocks.trim():
        res.json({ error: "Stocks is required" });
      case photo && photo.size > 10000000:
        res.json({ error: "Image should be less than 10mb" });
      case img && img.size > 10000000:
        res.json({ error: "Image should be less than 10mb" });
    }

    // Upload image to Cloudinary
    let photoUrl;
    if (photo) {
      const uploadedPhoto = await cloudinary.uploader.upload(photo.path);
      photoUrl = uploadedPhoto.secure_url;
    }

    let imgUrls = [];

    if (img && Array.isArray(img)) {
      console.log("Multiple files detected!");
      // If img is an array of files, upload each file to Cloudinary and store their URLs in imgUrls
      for (let i = 0; i < img.length; i++) {
        const uploadedImg = await cloudinary.uploader.upload(img[i].path);
        imgUrls.push(uploadedImg.secure_url);
      }
    } else if (img) {
      // If img is a single file, upload it to Cloudinary and store its URL in imgUrls
      const uploadedImg = await cloudinary.uploader.upload(img.path);
      imgUrls.push(uploadedImg.secure_url);
    }

    // Create new saddle
    const saddle3 = new Saddle3({
      name,
      description,
      price,
      stocks,
      category,
      brand,
      size,
      img: { url: imgUrls },
      photo: { url: photoUrl },
      slug: slugify(name),
    });

    // Save frame to database
    await saddle3.save();
    res.status(201).json(saddle3);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Failed to create frame" });
  }
};

// implement photo
export const listsaddle3 = async (req, res) => {
  try {
    const saddle3 = await Saddle3.find({}).sort({ createdAt: -1 });

    res.json(saddle3);
  } catch (err) {
    console.log(err);
  }
};

export const saddle3photo = async (req, res) => {
  try {
    const saddle3 = await Saddle3.findById(req.params.saddle3Id).select("photo");
    if (saddle3.photo && saddle3.photo.url) {
      return res.redirect(saddle3.photo.url);
    }
    return res.sendStatus(404);
  } catch (err) {
    console.log(err);
    return res.sendStatus(404);
  }
};


export const saddle3img = async (req, res) => {
  try {
    const saddle3 = await Saddle3.findById(req.params.saddle3Id).select(
      "img"
    );
    if (
      saddle3.img &&
      Array.isArray(saddle3.img.url) &&
      saddle3.img.url.length > 0
    ) {
      // If img is an array of URLs and contains at least one URL, redirect the client to the first URL in the array
      return res.redirect(saddle3.img.url[0]);
    } else if (saddle3.img && typeof saddle3.img.url === "string") {
      // If img is a single URL, redirect the client to the URL
      return res.redirect(saddle3.img.url);
    } else {
      // If img is not found or does not contain valid URLs, send a 404 Not Found status code
      return res.sendStatus(404);
    }
  } catch (err) {
    console.log(err);
    return res.sendStatus(404);
  }
};