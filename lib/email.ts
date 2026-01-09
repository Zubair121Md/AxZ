// Email service for sending LMS credentials
// In production, use a service like SendGrid, AWS SES, or Nodemailer

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    // In development, log the email instead of actually sending
    if (process.env.NODE_ENV === "development") {
      console.log("=".repeat(50));
      console.log("EMAIL WOULD BE SENT:");
      console.log("To:", options.to);
      console.log("Subject:", options.subject);
      console.log("Body:", options.html);
      console.log("=".repeat(50));
      return true;
    }

    // In production, implement actual email sending
    // Example with Nodemailer:
    /*
    const nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to: options.to,
      subject: options.subject,
      html: options.html,
    });
    */

    return true;
  } catch (error) {
    console.error("Email sending error:", error);
    return false;
  }
}

export function generateLMSCredentialsEmail(
  userName: string,
  courseName: string,
  lmsId: string,
  lmsPassword: string,
  courseUrl: string
): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
        .credentials { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #1e40af; }
        .credential-item { margin: 15px 0; }
        .label { font-weight: bold; color: #666; }
        .value { font-size: 18px; color: #1e40af; font-family: monospace; padding: 8px; background: #f0f4ff; border-radius: 4px; }
        .button { display: inline-block; padding: 12px 30px; background: #1e40af; color: white; text-decoration: none; border-radius: 6px; margin-top: 20px; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Welcome to Amity x ZMT EdTech!</h1>
        </div>
        <div class="content">
          <p>Dear ${userName},</p>
          <p>Congratulations! You have successfully enrolled in <strong>${courseName}</strong>.</p>
          <p>Your unique LMS credentials have been generated. Please use these credentials to access your course:</p>
          
          <div class="credentials">
            <div class="credential-item">
              <div class="label">LMS ID:</div>
              <div class="value">${lmsId}</div>
            </div>
            <div class="credential-item">
              <div class="label">LMS Password:</div>
              <div class="value">${lmsPassword}</div>
            </div>
          </div>

          <p><strong>Important:</strong> Please save these credentials securely. You will need them to access your course content.</p>
          
          <a href="${courseUrl}" class="button">Access Your Course</a>
          
          <p>If you have any questions or need assistance, please don't hesitate to contact our support team.</p>
          
          <p>Best regards,<br>Amity x ZMT EdTech Team</p>
        </div>
        <div class="footer">
          <p>This is an automated email. Please do not reply to this message.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

