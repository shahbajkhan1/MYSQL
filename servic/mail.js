import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, 
    auth: {
      user: 'skshahbaj01@gmail.com',
      pass: 'aibdawkuyzhihzdo',
    },
  });
  export default transporter