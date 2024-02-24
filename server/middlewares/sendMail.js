const nodemailer = require("nodemailer");

exports.sendEmail = async (options) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "mandar.technocommet@gmail.com",
      pass: "vddiewtxdwtxyzup",
    },
  });

  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: options.email,
    subject: options.subject,
    html: `
      <div style="background-color: #f1f1f1; padding: 20px;">
        <header style="text-align: center;">
          <h1 style="font-family: sans-serif; font-size: 40px; color: #515151;">${options.subject}</h1>
          <p style="font-size: 20px; color: #333;">Learning is Easier..</p>
        </header>

        <section style="padding: 20px; text-align: center;">
          ${options.message}
        </section>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

exports.sendAuctionConfirmationEmail = async (options) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "mandar.technocommet@gmail.com",
      pass: "vddiewtxdwtxyzup",
    },
  });

  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: options.email,
    subject: options.subject,
    html: `
      <div style="background-color: #f1f1f1; padding: 20px;">
        <header style="text-align: center;">
          <h1 style="font-family: sans-serif; font-size: 40px; color: #515151;">${options.subject}</h1>
          <p style="font-size: 20px; color: #333;">Auction Confirmation</p>
        </header>

        <section style="padding: 20px; text-align: left;">
          <p style="font-size: 18px; color: #333;">
            Dear ${options.winnerName},
          </p>

          <p style="font-size: 18px; color: #333;">
            Congratulations! You have won the auction for ${options.cropName}.
          </p>

          <p style="font-size: 18px; color: #333;">
            Final Bid Amount: ${options.finalBidAmount}
          </p>

          <p style="font-size: 18px; color: #333;">
            Auction Date: ${options.auctionDate}
          </p>

          <p style="font-size: 18px; color: #333;">
            Payment Instructions:
          </p>

          <ul style="font-size: 16px; color: #333; list-style-type: none; padding-left: 0;">
            <li>1. Transfer the winning bid amount to the owner's account.</li>
            <li>2. Account details: ${options.ownerAccountDetails}</li>
            <li>3. Reference: Use your auction ID as the payment reference.</li>
          </ul>

          <p style="font-size: 18px; color: #333;">
            Thank you for participating in the auction. If you have any questions, feel free to contact us.
          </p>

          <p style="font-size: 18px; color: #333;">
            Best regards,
            <br />
            Your Company Name
          </p>
        </section>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};
