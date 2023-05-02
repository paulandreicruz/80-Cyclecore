import Frame2 from "../models/bike2/frame2.js";
import Tire2 from "../models/bike2/tire2.js";
import Handlebar2 from "../models/bike2/handlebar2.js";
import Groupset2 from "../models/bike2/groupset2.js";
import Wheelset2 from "../models/bike2/wheel2.js";
import Saddle2 from "../models/bike2/saddle2.js"
import slugify from "slugify";
import cloudinary from "cloudinary";


export const createframe2 = async (req, res) => {
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
    const frame2 = new Frame2({
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
    await frame2.save();
    res.status(201).json(frame2);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Failed to create frame" });
  }
};

// implement photo
export const listframe2 = async (req, res) => {
  try {
    const frame2 = await Frame2.find({}).sort({ createdAt: -1 });

    res.json(frame2);
  } catch (err) {
    console.log(err);
  }
};

export const frame2photo = async (req, res) => {
  try {
    const frame2 = await Frame2.findById(req.params.frame2Id).select("photo");
    if (frame2.photo && frame2.photo.url) {
      return res.redirect(frame2.photo.url);
    }
    return res.sendStatus(404);
  } catch (err) {
    console.log(err);
    return res.sendStatus(404);
  }
};


export const frame2img = async (req, res) => {
  try {
    const frame2 = await Frame2.findById(req.params.frame2Id).select(
      "img"
    );
    if (
      frame2.img &&
      Array.isArray(frame2.img.url) &&
      frame2.img.url.length > 0
    ) {
      // If img is an array of URLs and contains at least one URL, redirect the client to the first URL in the array
      return res.redirect(frame2.img.url[0]);
    } else if (frame2.img && typeof frame2.img.url === "string") {
      // If img is a single URL, redirect the client to the URL
      return res.redirect(frame2.img.url);
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

export const createtire2 = async (req, res) => {
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
    const tire2 = new Tire2({
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
    await tire2.save();
    res.status(201).json(tire2);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Failed to create tire" });
  }
};

export const listtire2 = async (req, res) => {
  try {
    const tire2 = await Tire2.find({}).sort({ createdAt: -1 });

    res.json(tire2);
  } catch (err) {
    console.log(err);
  }
};

export const tire2photo = async (req, res) => {
  try {
    const tire2 = await Tire2.findById(req.params.tire2Id).select("photo");
    if (tire2.photo && tire2.photo.url) {
      return res.redirect(tire2.photo.url);
    }
    return res.sendStatus(404);
  } catch (err) {
    console.log(err);
    return res.sendStatus(404);
  }
};


export const tire2img = async (req, res) => {
  try {
    const tire2 = await Tire2.findById(req.params.tire2Id).select(
      "img"
    );
    if (
      tire2.img &&
      Array.isArray(tire2.img.url) &&
      tire2.img.url.length > 0
    ) {
      // If img is an array of URLs and contains at least one URL, redirect the client to the first URL in the array
      return res.redirect(tire2.img.url[0]);
    } else if (tire2.img && typeof tire2.img.url === "string") {
      // If img is a single URL, redirect the client to the URL
      return res.redirect(tire2.img.url);
    } else {
      // If img is not found or does not contain valid URLs, send a 404 Not Found status code
      return res.sendStatus(404);
    }
  } catch (err) {
    console.log(err);
    return res.sendStatus(404);
  }
};

// handlebar
export const createhandlebar2 = async (req, res) => {
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

    let imgUrl;
    if (img) {
      const uploadedImg = await cloudinary.uploader.upload(img.path);
      imgUrl = uploadedImg.secure_url;
    }

    // Create new tire
    const handlebar2 = new Handlebar2({
      name,
      description,
      price,
      stocks,
      category,
      brand,
      size,
      img: { url: imgUrl },
      photo: { url: photoUrl },
      slug: slugify(name),
    });

    // Save frame to database
    await handlebar2.save();
    res.status(201).json(handlebar2);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Failed to create handlebar" });
  }
};

export const listhandlebar2 = async (req, res) => {
  try {
    const handlebar2 = await Handlebar2.find({})
      
      .sort({ createdAt: -1 });

    res.json(handlebar2);
  } catch (err) {
    console.log(err);
  }
};

export const handlebar2photo = async (req, res) => {
  try {
    const handlebar2 = await Handlebar2.findById(req.params.handlebar2Id).select(
      "photo"
    );
    if (handlebar2.photo && handlebar2.photo.url) {
      return res.redirect(handlebar2.photo.url);
    }
    return res.sendStatus(404);
  } catch (err) {
    console.log(err);
    return res.sendStatus(404);
  }
};


export const handlebar2img = async (req, res) => {
  try {
    const handlebar2 = await Handlebar2.findById(req.params.handlebar2Id).select(
      "img"
    );
    if (
      handlebar2.img &&
      Array.isArray(handlebar2.img.url) &&
      handlebar2.img.url.length > 0
    ) {
      // If img is an array of URLs and contains at least one URL, redirect the client to the first URL in the array
      return res.redirect(handlebar2.img.url[0]);
    } else if (handlebar2.img && typeof handlebar2.img.url === "string") {
      // If img is a single URL, redirect the client to the URL
      return res.redirect(handlebar2.img.url);
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
export const creategroupset2 = async (req, res) => {
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
    const groupset2 = new Groupset2({
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
    await groupset2.save();
    res.status(201).json(groupset2);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Failed to create groupset" });
  }
};

export const listgroupset2 = async (req, res) => {
  try {
    const groupset2 = await Groupset2.find({}).sort({ createdAt: -1 });

    res.json(groupset2);
  } catch (err) {
    console.log(err);
  }
};

export const groupset2photo = async (req, res) => {
  try {
    const groupset2 = await Groupset2.findById(req.params.groupset2Id).select(
      "photo"
    );
    if (groupset2.photo && groupset2.photo.url) {
      return res.redirect(groupset2.photo.url);
    }
    return res.sendStatus(404);
  } catch (err) {
    console.log(err);
    return res.sendStatus(404);
  }
};

export const groupset2img = async (req, res) => {
  try {
    const groupset2 = await Groupset2.findById(req.params.groupset2Id).select(
      "img"
    );
    if (
      groupset2.img &&
      Array.isArray(groupset2.img.url) &&
      groupset2.img.url.length > 0
    ) {
      // If img is an array of URLs and contains at least one URL, redirect the client to the first URL in the array
      return res.redirect(groupset2.img.url[0]);
    } else if (groupset2.img && typeof groupset2.img.url === "string") {
      // If img is a single URL, redirect the client to the URL
      return res.redirect(groupset2.img.url);
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
export const listwheelset2 = async (req, res) => {
  try {
    const wheelset2 = await Wheelset2.find({}).sort({ createdAt: -1 });

    res.json(wheelset2);
  } catch (err) {
    console.log(err);
  }
};

export const wheelset2photo = async (req, res) => {
  try {
    const wheelset2 = await Wheelset2.findById(req.params.wheelset2Id).select(
      "photo"
    );
    if (wheelset2.photo && wheelset2.photo.url) {
      return res.redirect(wheelset2.photo.url);
    }
    return res.sendStatus(404);
  } catch (err) {
    console.log(err);
    return res.sendStatus(404);
  }
};

export const wheelset2img = async (req, res) => {
  try {
    const wheelset2 = await Wheelset2.findById(req.params.wheelset2Id).select(
      "img"
    );
    if (
      wheelset2.img &&
      Array.isArray(wheelset2.img.url) &&
      wheelset2.img.url.length > 0
    ) {
      // If img is an array of URLs and contains at least one URL, redirect the client to the first URL in the array
      return res.redirect(wheelset2.img.url[0]);
    } else if (wheelset2.img && typeof wheelset2.img.url === "string") {
      // If img is a single URL, redirect the client to the URL
      return res.redirect(wheelset2.img.url);
    } else {
      // If img is not found or does not contain valid URLs, send a 404 Not Found status code
      return res.sendStatus(404);
    }
  } catch (err) {
    console.log(err);
    return res.sendStatus(404);
  }
};

export const createwheelset2 = async (req, res) => {
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
    const wheelset2 = new Wheelset2({
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
    await wheelset2.save();
    res.status(201).json(wheelset2);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Failed to create wheelset" });
  }
};


// saddle 

export const createsaddle2 = async (req, res) => {
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
    const saddle2 = new Saddle2({
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
    await saddle2.save();
    res.status(201).json(saddle2);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Failed to create frame" });
  }
};

// implement photo
export const listsaddle2 = async (req, res) => {
  try {
    const saddle2 = await Saddle2.find({}).sort({ createdAt: -1 });

    res.json(saddle2);
  } catch (err) {
    console.log(err);
  }
};

export const saddle2photo = async (req, res) => {
  try {
    const saddle2 = await Saddle2.findById(req.params.saddle2Id).select("photo");
    if (saddle2.photo && saddle2.photo.url) {
      return res.redirect(saddle2.photo.url);
    }
    return res.sendStatus(404);
  } catch (err) {
    console.log(err);
    return res.sendStatus(404);
  }
};


export const saddle2img = async (req, res) => {
  try {
    const saddle2 = await Saddle2.findById(req.params.saddle2Id).select(
      "img"
    );
    if (
      saddle2.img &&
      Array.isArray(saddle2.img.url) &&
      saddle2.img.url.length > 0
    ) {
      // If img is an array of URLs and contains at least one URL, redirect the client to the first URL in the array
      return res.redirect(saddle2.img.url[0]);
    } else if (saddle2.img && typeof saddle2.img.url === "string") {
      // If img is a single URL, redirect the client to the URL
      return res.redirect(saddle2.img.url);
    } else {
      // If img is not found or does not contain valid URLs, send a 404 Not Found status code
      return res.sendStatus(404);
    }
  } catch (err) {
    console.log(err);
    return res.sendStatus(404);
  }
};