const sgMail = require("@sendgrid/mail");

require("dotenv").config();

const { SENDGRID_KEY } = process.env;
sgMail.setApiKey(SENDGRID_KEY);

const sendEmail = async (data) => {
  try {
    const email = { ...data, from: "misarosh70@gmail.com" };
    await sgMail.send(email);
    return true;
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendEmail;
