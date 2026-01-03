import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendpasswordEmail(to, resetUrl, firstname) {
  const subject = "🔐 Reset Your ShareMate Password";
  const html = `
    <div style="font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 20px; background-color: #f4f4f4;">
      <div style="max-width: 600px; margin: auto; background-color: white; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); overflow: hidden;">
        <div style="background-color: #06966B; padding: 20px; color: white; text-align: center;">
          <h2 style="margin: 0;">Password Reset Request</h2>
          <p style="margin: 0; font-size: 14px;">Your security is important to us</p>
        </div>
        <div style="padding: 30px;">
          <p style="font-size: 16px;">Hello ${firstname || "there"},</p>
          <p style="font-size: 16px;">We received a request to reset your ShareMate account password. If you made this request, click the button below to set a new password.</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" style="display: inline-block; padding: 12px 24px; background-color: #06966B; color: white; text-decoration: none; border-radius: 8px; font-weight: bold;">Reset Password</a>
          </div>
          <p style="font-size: 14px; color: #555;">This link will expire in 30 minutes. If you didn’t request a password reset, please ignore this email or contact ShareMate support.</p>
          <p style="margin-top: 40px; font-size: 14px; color: #777;">Thank you,<br>The ShareMate Team</p>
        </div>
        <div style="background-color: #06966B; padding: 20px; text-align: center; font-size: 12px; color: white;">
          Made with 🤍 by ShareMate | Uva Wellassa University
        </div>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"ShareMate Support" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });
    console.log(`[MAIL] Password reset email sent to ${to}`);
  } catch (err) {
    console.error(`[MAIL ERROR] ${err.message}`);
  }
}
