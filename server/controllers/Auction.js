const Auction = require("../models/Auction");
const { sendAuctionConfirmationEmail } = require("../middlewares/sendMail");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dlolke5j9",
  api_key: "732695999155916",
  api_secret: "kZ09EXXdUgZ5c7oxwNFLTiAFcww",
});

exports.createAuction = async (req, res) => {
  try {
    const { cropName, userId, expireTime, bidPrice } = req.body;

    let public_id = "public_id";
    let url = "url";
    let desc = "This is description";
    console.log(req.file.path);
    // await cloudinary.uploader.upload(req.file.path, (err, result) => {
    //     if (err) {
    //         console.log("error is " +err);
    //     }
    //     console.log(result)
    //     url = result?.url;
    //     public_id = result?.public_id;

    //     console.log("url : ", url);
    //     console.log("public_id : ", public_id);
    // });

    const auction = await Auction.create({
      userId,
      cropName,
      desc,
      expireTime,
      bidPrice,
      cropImage: { public_id: public_id, url: url },
    });

    res.status(200).json({
      success: true,
      auction,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
