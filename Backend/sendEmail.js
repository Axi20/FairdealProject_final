const express = require("express");
const nodemailer = require("nodemailer");
require('dotenv').config();

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendConfirmationEmail(email, name, carName, carPlateNumber, carModel, carYear, rentalStart, rentalEnd, finalPrice) {
  
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "snollygoster706@gmail.com", // sender address
    to: email, // list of receivers
    subject: "Confirmation Email - FairDeal Autókölcsönző", // Subject line
    html: `
      <p>Kedves ${name},</p>
      <p>Köszönjük, hogy tőlünk bérelt autót. Kérjük, ellenőrizze a bérlés információit:</p>
      <ul>
        <li>Autó neve: ${carName}</li>
        <li>Modell és évjárat: ${carModel} ${carYear}</li>
        <li>Autó rendszáma: ${carPlateNumber}</li>
        <li>Bérlés kezdete: ${rentalStart}</li>
        <li>Bérlés vége: ${rentalEnd}</li>\n
        <h3>Végösszeg: ${finalPrice}</h3>\n
        <br><br>
      </ul>

      <p>A biztosítás és a pénzügyek személyesen kerülnek megbeszélésre, valamint szükség lesz egy szerződés aláírására is.
      Kérjük, ne felejtse el elhozni személyi igazolványát és jogosítványát, mivel csak ezek meglétében tudjuk véglegesíteni a szerződést.\n\n</p>
      <p>Lépjen velünk kapcsolatba amennyiben bármilyen kérése vagy kérdése van!\n\n</p>

      <ul style="list-style: none;">
        <li>Iroda: Szeged Budapesti út 1.</li>
        <li>Telefonszám: +36 70 123 4567</li>
        <li>Email cím: fairdealoffice@gmail.com</li>
      </ul>

      <h4>Várjuk Önt hamarosan!\n\nÜdvözöl,\n a FairDeal Autókölcsönző csapata!\n\n
      Kérjük, ne válaszoljon erre az email-re közvetlenül. Ez csak egy megerősítő email.</h4>
    `, // html body
  });

  console.log("Message sent: %s", info.messageId);
}

module.exports = { sendConfirmationEmail };
