import nodemailer from "nodemailer";

class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || "smtp.gmail.com",
      port: Number(process.env.EMAIL_PORT) || 587,
      secure: false, 
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendOrderConfirmation(to: string, orderId: string, total: string) {
    try {
      const info = await this.transporter.sendMail({
        from: `"Headstart Foods" <${process.env.EMAIL_USER}>`,
        to,
        subject: `Order Confirmation - ${orderId}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
            <h2 style="color: #F97316;">🥭 Order Received!</h2>
            <p>Thank you for your order, <b>${orderId}</b>.</p>
            <p>We are currently processing your premium seasonal selection. You will receive a tracking number once your box has cleared CFIA inspection and is en-route from our Surrey warehouse.</p>
            <hr />
            <p><b>Total Amount:</b> $${total}</p>
            <p>Visit your dashboard to track your cold-chain shipment: <a href="https://headstartfoods.ca/dashboard">My Dashboard</a></p>
          </div>
        `,
      });
      return info;
    } catch (error) {
      console.error("Email error:", error);
    }
  }

  async sendWholesaleInquiryNotification(inquiry: { 
    company_name?: string | null; 
    name: string; 
    email: string; 
    volume_interest?: string | null; 
    location?: string | null; 
    message: string; 
  }) {
    try {
      const info = await this.transporter.sendMail({
        from: `"B2B Portal" <${process.env.EMAIL_USER}>`,
        to: process.env.ADMIN_EMAIL || "headstartfoods@gmail.com",
        subject: `New Wholesale Inquiry: ${inquiry.company_name}`,
        html: `
          <h3>New Wholesale Lead</h3>
          <ul>
            <li><b>Company:</b> ${inquiry.company_name}</li>
            <li><b>Contact:</b> ${inquiry.name} (${inquiry.email})</li>
            <li><b>Volume Interest:</b> ${inquiry.volume_interest}</li>
            <li><b>Location:</b> ${inquiry.location}</li>
          </ul>
          <p><b>Message:</b><br />${inquiry.message}</p>
        `,
      });
      return info;
    } catch (error) {
      console.error("Email error:", error);
    }
  }
}

export const emailService = new EmailService();
