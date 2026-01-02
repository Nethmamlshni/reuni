import nodemailer from "nodemailer";

export async function sendEmail(to, subject, text) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"ShareMate UWU" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
    html: `
      <div style="font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif, Times, serif; padding: 20px; background-color: #06966B;">
        <div style="max-width: 600px; margin: auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
          <div style="background-color: #06966B; padding: 20px; color: white; text-align: center;"> 
            <h2 style="margin: 0;">Welcome to ShareMate</h2>
            <p style="margin: 0; font-size: 14px;">University Resource Sharing Platform</p>
          </div>
          <div style="padding: 30px;">
            <p style="font-size: 16px;">Hi there,</p>
            <p style="font-size: 16px;">Use the following code to verify your email:</p>
            <h1 style="font-size: 32px; letter-spacing: 4px; text-align: center; color: #333;">${text}</h1>
            <p style="font-size: 14px; color: #555; margin-top: 30px;">
              This code is valid for 20 minutes. Please do not share this code with anyone.
            </p>
          </div>
          <div style="background-color:#06966B; padding: 20px; text-align: center; font-size: 12px; color: white;">
            Made with 🤍 by ShareMate Team | Uva Wellassa University
          </div>
        </div>
      </div>
    `,
  });

  console.log("Email sent successfully");
}
