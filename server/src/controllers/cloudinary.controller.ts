// CLOUDINARY_CLOUD_NAME=dexcbco2j
// CLOUDINARY_API_KEY=163843872674226
// CLOUDINARY_API_SECRET=nt36ZGV8a_FH4Pk8LvMdpvWH03c

import * as cloudinary from "cloudinary";
import express from "express";

// Configure Cloudinary with your credentials
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dexcbco2j",
  api_key: process.env.CLOUDINARY_API_KEY || "163843872674226",
  api_secret:
    process.env.CLOUDINARY_API_SECRET || "nt36ZGV8a_FH4Pk8LvMdpvWH03c",
});

export const uploadImages = async (
  req: express.Request,
  res: express.Response
) => {
  const { image } = req.body;

  console.log("image:", image);

  try {
    const result = await cloudinary.v2.uploader.upload(image, {
      public_id: `${Date.now()}`,
      resource_type: "auto",
    });

    res.json({
      public_id: result.public_id,
      url: result.secure_url,
    });
  } catch (error) {
    console.error(error);
  }
};

export const removeImage = async (
  req: express.Request,
  res: express.Response
) => {
  const { public_id } = req.body;

  try {
    await cloudinary.v2.uploader.destroy(public_id);

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.json({ error, success: false });
  }
};
