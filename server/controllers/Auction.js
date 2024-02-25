const Auction = require("../models/Auction");
const { sendAuctionConfirmationEmail } = require("../middlewares/sendMail");
const { request } = require("express");
const Razorpay = require("razorpay");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dlolke5j9",
  api_key: "732695999155916",
  api_secret: "kZ09EXXdUgZ5c7oxwNFLTiAFcww",
});

const instance = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

exports.createAuction = async (req, res) => {
  try {
    const { cropName, userId, expireTime, bidPrice } = req.body;

    let public_id = "public_id";
    let url = "url";
    let desc = "This is description";
    console.log(req.file.path);
    await cloudinary.uploader.upload(req.file.path, (err, result) => {
        if (err) {
            console.log("error is " +err);
        }
        console.log(result)
        url = result?.url;
        public_id = result?.public_id;

        console.log("url : ", url);
        console.log("public_id : ", public_id);
    });

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

exports.checkAuction = async (req,res) => {

  console.log("Inside check auction");
}

exports.getAllAuction = async (req,res) => {
  try{
      const auctions = await Auction.find({})

      res.status(200).json({
          success: true,
          auctions
      })

  }catch(err)
  {
      res.status(500).json({
          success: false,
          error:err.message
      })
  }

}

exports.checkMail = async (req,res) =>{

  const { email ,subject ,  winnerName , cropName , finalBidAmount , auctionDate , ownerAccountDetails } = req.body;
  console.log("inside mail funciton");
  console.log( email , subject ,  winnerName , cropName , finalBidAmount , auctionDate , ownerAccountDetails);
  try{

      const auctionConfirmationEmailOptions = {
          email : email ,
          subject : subject ,
          winnerName : winnerName ,
          cropName : cropName ,
          finalBidAmount : finalBidAmount ,
          auctionDate : auctionDate ,
          ownerAccountDetails : ownerAccountDetails
      }
        
        await sendAuctionConfirmationEmail(auctionConfirmationEmailOptions);
  }
  catch(err){
      console.log(err)
  }
}

exports.getPendingPayments = async(req,res) => {
  try{
    const {bidderEmail} = req.body;
    const auctions = await Auction.find({bidderEmail})

    res.status(200).json({
      success: true,
      auctions
    })

  }catch(err)
  {
    res.status(500).json({
      success: false,
      error:err.message
    })
  }
}

exports.verifyPayment = async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;
  console.log("verify payments");

  const checkStatus = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZOR_SECRET)
    .update(checkStatus.toString())
    .digest("hex");

  const isValidPayment = expectedSignature === razorpay_signature;

  if (isValidPayment)
  {
    res.redirect(
      `http://localhost:5173/`
    );
  } else {
    res.status(400).json({ status: false });
  }
};

exports.checkOut = async (req, res) => {
  const options = {
    amount: Number(req.body.amount * 100),
    currency: "INR",
  };

  const order = await instance.orders.create(options);

  console.log(order);
  res.status(200).json({ status: true, order });
};