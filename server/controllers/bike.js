import Frame from "../models/frame.js";
import Tire from "../models/tire.js";
import Handlebar from "../models/handlebar.js";
import Groupset from "../models/groupsets.js";
import Wheelset from "../models/wheel.js";
import Saddle from "../models/saddle.js";
import slugify from "slugify";
import cloudinary from "cloudinary";

export const createframe = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      brand,
      type,
      stocks,
      seatbinder,
      seatpost,
      stem,
      fork,
      stemlength,
      seatpostlength,
      stack,
      reach,
      bbheight,
      bbdrop,
      trail,
      wheelbase,
      seattubelength,
    } = req.fields;
    const { photo, img } = req.files;

    switch (true) {
      case !name.trim():
        res.json({ error: "Name is required" });
      case !description.trim():
        res.json({ error: "Description is required" });
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
    const frame = new Frame({
      name,
      description,
      price,
      stocks,
      category,
      brand,
      type,
      seatbinder,
      seatpost,
      stem,
      fork,
      stemlength,
      seatpostlength,
      stack,
      reach,
      bbheight,
      bbdrop,
      trail,
      wheelbase,
      seattubelength,
      img: { url: imgUrls },
      photo: { url: photoUrl },
      slug: slugify(name),
    });

    // Save frame to database
    await frame.save();
    res.status(201).json(frame);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Failed to create frame" });
  }
};

// implement photo
export const listframe = async (req, res) => {
  try {
    const frame = await Frame.find({})
      .populate("brand")
      .populate("category")
      .sort({ createdAt: -1 });
    res.json(frame);
  } catch (err) {
    console.log(err);
  }
};

export const framephoto = async (req, res) => {
  try {
    const frame = await Frame.findById(req.params.frameId).select("photo");
    if (frame.photo && frame.photo.url) {
      return res.redirect(frame.photo.url);
    }
    return res.sendStatus(404);
  } catch (err) {
    console.log(err);
    return res.sendStatus(404);
  }
};

export const frameimg = async (req, res) => {
  try {
    const frame = await Frame.findById(req.params.frameId).select("img");
    if (frame.img && Array.isArray(frame.img.url) && frame.img.url.length > 0) {
      // If img is an array of URLs and contains at least one URL, redirect the client to the first URL in the array
      return res.redirect(frame.img.url[0]);
    } else if (frame.img && typeof frame.img.url === "string") {
      // If img is a single URL, redirect the client to the URL
      return res.redirect(frame.img.url);
    } else {
      // If img is not found or does not contain valid URLs, send a 404 Not Found status code
      return res.sendStatus(404);
    }
  } catch (err) {
    console.log(err);
    return res.sendStatus(404);
  }
};

export const createtire = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      stocks,
      category,
      brand,
      type,
      casing,
      compound,
      flat,
      weight,
      bead,
    } = req.fields;
    const { photo, img } = req.files;

    //validator

    switch (true) {
      case !name.trim():
        res.json({ error: "Name is required" });
      case !description.trim():
        res.json({ error: "Description is required" });
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
    const tire = new Tire({
      name,
      description,
      price,
      stocks,
      category,
      brand,
      type,
      casing,
      compound,
      flat,
      weight,
      bead,
      img: { url: imgUrls },
      photo: { url: photoUrl },
      slug: slugify(name),
    });

    // Save frame to database
    await tire.save();
    res.status(201).json(tire);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Failed to create tire" });
  }
};

export const listtire = async (req, res) => {
  try {
    const tire = await Tire.find({})
      .populate("category")
      .populate("brand")
      .sort({ createdAt: -1 });

    res.json(tire);
  } catch (err) {
    console.log(err);
  }
};

export const tirephoto = async (req, res) => {
  try {
    const tire = await Tire.findById(req.params.frameId).select("photo");
    if (tire.photo && tire.photo.url) {
      return res.redirect(tire.photo.url);
    }
    return res.sendStatus(404);
  } catch (err) {
    console.log(err);
    return res.sendStatus(404);
  }
};

export const tireimg = async (req, res) => {
  try {
    const tire = await Tire.findById(req.params.tireId).select("img");
    if (tire.img && Array.isArray(tire.img.url) && tire.img.url.length > 0) {
      // If img is an array of URLs and contains at least one URL, redirect the client to the first URL in the array
      return res.redirect(tire.img.url[0]);
    } else if (tire.img && typeof tire.img.url === "string") {
      // If img is a single URL, redirect the client to the URL
      return res.redirect(tire.img.url);
    } else {
      // If img is not found or does not contain valid URLs, send a 404 Not Found status code
      return res.sendStatus(404);
    }
  } catch (err) {
    console.log(err);
    return res.sendStatus(404);
  }
};

export const createhandlebar = async (req, res) => {
  try {
    const {
      name,
      description,
      stocks,
      category,
      brand,
      type,
      material,
      compatible,
      widthhood,
      widthdrops,
      reaches,
      drops,
      clampdiameter,
      faceplate,
      controls,
      weigth,
      price,
    } = req.fields;
    const { photo, img } = req.files;

    //validator

    switch (true) {
      case !name.trim():
        res.json({ error: "Name is required" });
      case !description.trim():
        res.json({ error: "Description is required" });
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
    const handlebar = new Handlebar({
      name,
      description,
      stocks,
      category,
      brand,
      type,
      material,
      compatible,
      widthhood,
      widthdrops,
      reaches,
      drops,
      clampdiameter,
      faceplate,
      controls,
      weigth,
      price,
      img: { url: imgUrl },
      photo: { url: photoUrl },
      slug: slugify(name),
    });

    // Save frame to database
    await handlebar.save();
    res.status(201).json(handlebar);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Failed to create handlebar" });
  }
};

export const listhandlebar = async (req, res) => {
  try {
    const handlebar = await Handlebar.find({})
      .populate("category")
      .populate("brand")
      .sort({ createdAt: -1 });

    res.json(handlebar);
  } catch (err) {
    console.log(err);
  }
};

export const handlebarphoto = async (req, res) => {
  try {
    const handlebar = await Handlebar.findById(req.params.handlebarId).select(
      "photo"
    );
    if (handlebar.photo && handlebar.photo.url) {
      return res.redirect(handlebar.photo.url);
    }
    return res.sendStatus(404);
  } catch (err) {
    console.log(err);
    return res.sendStatus(404);
  }
};

export const handlebarimg = async (req, res) => {
  try {
    const handlebar = await Handlebar.findById(req.params.handlebarId).select(
      "img"
    );
    if (
      handlebar.img &&
      Array.isArray(handlebar.img.url) &&
      handlebar.img.url.length > 0
    ) {
      // If img is an array of URLs and contains at least one URL, redirect the client to the first URL in the array
      return res.redirect(handlebar.img.url[0]);
    } else if (handlebar.img && typeof handlebar.img.url === "string") {
      // If img is a single URL, redirect the client to the URL
      return res.redirect(handlebar.img.url);
    } else {
      // If img is not found or does not contain valid URLs, send a 404 Not Found status code
      return res.sendStatus(404);
    }
  } catch (err) {
    console.log(err);
    return res.sendStatus(404);
  }
};

export const creategroupset = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      stocks,
      category,
      brand,
      weigth,
      chain,
      armlength,
      connectors,
      charging,
      sensor,
      cassette,
      brakes,
      functionality,
      type,
    } = req.fields;
    const { photo, img } = req.files;

    //validator

    switch (true) {
      case !name.trim():
        res.json({ error: "Name is required" });
        break;
      case !description.trim():
        res.json({ error: "Description is required" });
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
    const groupset = new Groupset({
      name,
      description,
      price,
      stocks,
      category,
      brand,
      weigth,
      chain,
      armlength,
      connectors,
      charging,
      sensor,
      cassette,
      brakes,
      functionality,
      type,
      img: { url: imgUrls },
      photo: { url: photoUrl },
      slug: slugify(name),
    });

    // Save frame to database
    await groupset.save();
    res.status(201).json(groupset);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Failed to create groupset" });
  }
};

export const listgroupset = async (req, res) => {
  try {
    const groupset = await Groupset.find({})
      .populate("category")
      .populate("brand")
      .sort({ createdAt: -1 });

    res.json(groupset);
  } catch (err) {
    console.log(err);
  }
};

export const groupsetphoto = async (req, res) => {
  try {
    const groupset = await Groupset.findById(req.params.groupsetId).select(
      "photo"
    );
    if (groupset.photo && groupset.photo.url) {
      return res.redirect(groupset.photo.url);
    }
    return res.sendStatus(404);
  } catch (err) {
    console.log(err);
    return res.sendStatus(404);
  }
};

export const groupsetimg = async (req, res) => {
  try {
    const groupset = await Groupset.findById(req.params.groupsetId).select(
      "img"
    );
    if (
      groupset.img &&
      Array.isArray(groupset.img.url) &&
      groupset.img.url.length > 0
    ) {
      // If img is an array of URLs and contains at least one URL, redirect the client to the first URL in the array
      return res.redirect(groupset.img.url[0]);
    } else if (groupset.img && typeof groupset.img.url === "string") {
      // If img is a single URL, redirect the client to the URL
      return res.redirect(groupset.img.url);
    } else {
      // If img is not found or does not contain valid URLs, send a 404 Not Found status code
      return res.sendStatus(404);
    }
  } catch (err) {
    console.log(err);
    return res.sendStatus(404);
  }
};

export const listwheelset = async (req, res) => {
  try {
    const wheelset = await Wheelset.find({})
      .populate("category")
      .populate("brand")
      .sort({ createdAt: -1 });

    res.json(wheelset);
  } catch (err) {
    console.log(err);
  }
};

export const wheelsetphoto = async (req, res) => {
  try {
    const wheelset = await Wheelset.findById(req.params.wheelsetId).select(
      "photo"
    );
    if (wheelset.photo && wheelset.photo.url) {
      return res.redirect(wheelset.photo.url);
    }
    return res.sendStatus(404);
  } catch (err) {
    console.log(err);
    return res.sendStatus(404);
  }
};

export const wheelsetimg = async (req, res) => {
  try {
    const wheelset = await Wheelset.findById(req.params.wheelsetId).select(
      "img"
    );
    if (
      wheelset.img &&
      Array.isArray(wheelset.img.url) &&
      wheelset.img.url.length > 0
    ) {
      // If img is an array of URLs and contains at least one URL, redirect the client to the first URL in the array
      return res.redirect(wheelset.img.url[0]);
    } else if (wheelset.img && typeof wheelset.img.url === "string") {
      // If img is a single URL, redirect the client to the URL
      return res.redirect(wheelset.img.url);
    } else {
      // If img is not found or does not contain valid URLs, send a 404 Not Found status code
      return res.sendStatus(404);
    }
  } catch (err) {
    console.log(err);
    return res.sendStatus(404);
  }
};

export const createwheelset = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      stocks,
      category,
      brand,
      type,
      diamter,
      compatibilty,
      width,
      valve,
      material,
      weight,
      brake,
      holes,
      tube,
      dual,
    } = req.fields;
    const { photo, img } = req.files;

    //validator

    switch (true) {
      case !name.trim():
        res.json({ error: "Name is required" });
        break;
      case !description.trim():
        res.json({ error: "Description is required" });
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
    const wheelset = new Wheelset({
      name,
      description,
      price,
      stocks,
      category,
      brand,
      type,
      diamter,
      compatibilty,
      width,
      valve,
      material,
      weight,
      brake,
      holes,
      tube,
      dual,
      img: { url: imgUrls },
      photo: { url: photoUrl },
      slug: slugify(name),
    });

    // Save frame to database
    await wheelset.save();
    res.status(201).json(wheelset);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Failed to create wheelset" });
  }
};

// saddle

export const createsaddle = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      stocks,
      category,
      brand,
      size,
      body,
      weightdesc,
      concave,
      weight,
      note,
      technology,
      compatible,
    } = req.fields;
    const { photo, img } = req.files;

    switch (true) {
      case !name.trim():
        res.json({ error: "Name is required" });
      case !description.trim():
        res.json({ error: "Description is required" });
      case !size.trim():
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
    const saddle = new Saddle({
      name,
      description,
      price,
      stocks,
      category,
      brand,
      size,
      body,
      weightdesc,
      concave,
      weight,
      note,
      technology,
      compatible,
      img: { url: imgUrls },
      photo: { url: photoUrl },
      slug: slugify(name),
    });

    // Save frame to database
    await saddle.save();
    res.status(201).json(saddle);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Failed to create frame" });
  }
};

// implement photo
export const listsaddle = async (req, res) => {
  try {
    const saddle = await Saddle.find({})
      .populate("category")
      .populate("brand")
      .sort({ createdAt: -1 });

    res.json(saddle);
  } catch (err) {
    console.log(err);
  }
};

export const saddlephoto = async (req, res) => {
  try {
    const saddle = await Saddle.findById(req.params.saddleId).select("photo");
    if (saddle.photo && saddle.photo.url) {
      return res.redirect(saddle.photo.url);
    }
    return res.sendStatus(404);
  } catch (err) {
    console.log(err);
    return res.sendStatus(404);
  }
};

export const saddleimg = async (req, res) => {
  try {
    const saddle = await Saddle.findById(req.params.saddleId).select("img");
    if (
      saddle.img &&
      Array.isArray(saddle.img.url) &&
      saddle.img.url.length > 0
    ) {
      // If img is an array of URLs and contains at least one URL, redirect the client to the first URL in the array
      return res.redirect(saddle.img.url[0]);
    } else if (saddle.img && typeof saddle.img.url === "string") {
      // If img is a single URL, redirect the client to the URL
      return res.redirect(saddle.img.url);
    } else {
      // If img is not found or does not contain valid URLs, send a 404 Not Found status code
      return res.sendStatus(404);
    }
  } catch (err) {
    console.log(err);
    return res.sendStatus(404);
  }
};
