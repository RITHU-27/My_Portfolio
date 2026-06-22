import nodemailer from "nodemailer";

// Create email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function sendEmailToOwner(messageData) {
  try {
    const { name, email, subject, message } = messageData;

    // Email to you (portfolio owner)
    const ownerMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.OWNER_EMAIL,
      subject: `New Portfolio Message from ${name}: ${subject || "No Subject"}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2>New Message from Your Portfolio</h2>
          <p><strong>From:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Subject:</strong> ${subject || "No Subject"}</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
          <p style="font-size: 12px; color: #999;">
            Sent at: ${new Date().toLocaleString()}
          </p>
        </div>
      `,
    };

    // Confirmation email to sender
    const senderMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "We received your message!",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2>Thank you for reaching out!</h2>
          <p>Hi ${name},</p>
          <p>I received your message and will get back to you as soon as possible.</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
          <p><strong>Your Message:</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
          <p>Best regards</p>
        </div>
      `,
    };

    // Send both emails
    await transporter.sendMail(ownerMailOptions);
    await transporter.sendMail(senderMailOptions);

    return { success: true, message: "Emails sent successfully" };
  } catch (err) {
    console.error("Email sending failed:", err.message);
    throw new Error(`Failed to send email: ${err.message}`);
  }
}
