import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendReminderEmail(
  to,
  subject,
  itemType,
  itemTitle,
  scheduledDate,
  category,
  link,
  name
) {
  const html = `
    <div style="font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif, Times, serif; padding: 20px; background-color: #06966B;">
      <div style="max-width: 600px; margin: auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
        <div style="background-color: #06966B; padding: 20px; color: white; text-align: center;"> 
          <h2 style="margin: 0;">⏰ Reminder: Your ${itemType} is Tomorrow</h2>
          <p style="margin: 0; font-size: 14px;">Stay prepared with ShareMate</p>
        </div>
        <div style="padding: 30px;">
          <p style="font-size: 16px;">Hello ${name},</p>
          <p style="font-size: 16px;">This is a friendly reminder that your <strong>${itemType}</strong> item is scheduled for <strong>tomorrow (${scheduledDate})</strong>.</p>
          <div style="background-color: #f0f4ff; padding: 15px; margin: 20px 0; border-left: 4px solid #1A73E8; border-radius: 6px;">
            <p style="margin: 5px 0;"><strong>📦 Title:</strong> ${itemTitle}</p>
            <p style="margin: 5px 0;"><strong>📂 Category:</strong> ${category}</p>
            <p style="margin: 5px 0;"><strong>📅 Date:</strong> ${scheduledDate}</p>
          </div>
          <p style="font-size: 14px;">Please ensure you’re ready to proceed with your item ${itemType.toLowerCase()} tomorrow. You can view or update your listing here:</p>
          <div style="text-align: center; margin-top: 30px;">
            <a href="${link}" style="display: inline-block; padding: 12px 24px; background-color: #06966B; color: white; text-decoration: none; border-radius: 8px; font-weight: bold;">View Your ${itemType}</a>
          </div>
        </div>
        <div style="background-color:#06966B; padding: 20px; text-align: center; font-size: 12px; color: white;">
          Made with 🤍 by ShareMate Team | Uva Wellassa University
        </div>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"ShareMate UWU" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
}
