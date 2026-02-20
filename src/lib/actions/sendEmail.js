"use server";
import nodemailer from "nodemailer";

export async function sendEmail(formData) {
  const { name, email, phone, company, service, budget, message } = formData;

  // SMTP Settings - These should be in your .env file
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "465"),
    secure: process.env.SMTP_PORT === "465", // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    // 1. Send Email to Admin (YOU)
    await transporter.sendMail({
      from: `"${name}" <${process.env.SMTP_USER}>`, // Sent via your server but showing sender name
      to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
      replyTo: email,
      subject: `Yeni İletişim Formu Mesajı: ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #333;">Yeni İletişim Formu Mesajı</h2>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
          <p><strong>Ad Soyad:</strong> ${name}</p>
          <p><strong>E-posta:</strong> ${email}</p>
          ${phone ? `<p><strong>Telefon:</strong> ${phone}</p>` : ""}
          ${company ? `<p><strong>Şirket:</strong> ${company}</p>` : ""}
          ${service ? `<p><strong>Hizmet:</strong> ${service}</p>` : ""}
          ${budget ? `<p><strong>Bütçe:</strong> ${budget}</p>` : ""}
          <div style="margin-top: 20px; padding: 15px; background: #f9f9f9; border-radius: 5px;">
            <p><strong>Mesaj:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          <footer style="margin-top: 30px; font-size: 12px; color: #888;">
            Bu mesaj sedminadijital.com iletişim formu aracılığıyla gönderilmiştir.
          </footer>
        </div>
      `,
    });

    // 2. Auto-Reply to User
    await transporter.sendMail({
      from: `"SedMina Dijital" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Mesajınızı Aldık - SedMina Dijital",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #333;">Merhaba ${name},</h2>
          <p>Mesajınız bize ulaştı. İlginiz için teşekkür ederiz.</p>
          <p>Ekibimiz mesajınızı inceliyor ve en kısa sürede (genellikle 24 saat içinde) sizinle iletişime geçeceğiz.</p>
          <div style="margin: 30px 0; padding: 20px; border-left: 4px solid #000; background: #f9f9f9;">
            <p style="font-style: italic; margin: 0;">"Yaratıcılık ve teknolojinin buluştuğu noktada markanızı birlikte büyütelim."</p>
          </div>
          <p>İyi çalışmalar dileriz,</p>
          <p><strong>SedMina Dijital Ekibi</strong></p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="font-size: 12px; color: #888;">
            Bu e-pota otomatik olarak gönderilmiştir. Lütfen bu adrese yanıt vermeyiniz.<br>
            <a href="https://sedminadijital.com" style="color: #333; text-decoration: none;">sedminadijital.com</a>
          </p>
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Email sending failed:", error);
    return {
      success: false,
      error: "E-posta gönderilemedi. Lütfen daha sonra tekrar deneyiniz.",
    };
  }
}
