const nodemailer = require('nodemailer');
const fs = require('fs');

async function main() {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  let info = await transporter.sendMail({
    from: '"Your Name" <your-email@gmail.com>',
    to: 'recipient-email@example.com',
    subject: 'Test email with attachment',
    text: 'This is a test email with attachment sent from GitHub Actions using Nodemailer.',
    attachments: [
      {
        filename: 'file.txt',
        content: fs.createReadStream('./file.txt'),
      },
    ],
  });

  console.log('Message sent: %s', info.messageId);
}

main().catch(console.error);
