// Email service utility (using a mock service for demo)
// In production, use services like SendGrid, AWS SES, or Nodemailer

interface EmailOptions {
  to: string
  subject: string
  html: string
  text?: string
}

// Mock email service for demo purposes
class MockEmailService {
  private sentEmails: Array<{
    to: string
    subject: string
    html: string
    sentAt: Date
  }> = []

  async sendEmail(options: EmailOptions): Promise<boolean> {
    try {
      // Simulate email sending delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Store email for demo purposes
      this.sentEmails.push({
        to: options.to,
        subject: options.subject,
        html: options.html,
        sentAt: new Date(),
      })

      console.log("📧 Email sent (DEMO MODE):", {
        to: options.to,
        subject: options.subject,
      })

      return true
    } catch (error) {
      console.error("Email sending failed:", error)
      return false
    }
  }

  // Demo method to view sent emails
  getSentEmails() {
    return this.sentEmails
  }

  // Demo method to clear sent emails
  clearSentEmails() {
    this.sentEmails = []
  }
}

export const emailService = new MockEmailService()

export function generatePasswordResetEmail(name: string, resetLink: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Đặt lại mật khẩu - Bóc Mệnh</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #f59e0b, #d97706); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .button { display: inline-block; background: linear-gradient(135deg, #f59e0b, #d97706); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        .warning { background: #fef3c7; border: 1px solid #f59e0b; padding: 15px; border-radius: 5px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🔮 Bóc Mệnh</h1>
          <h2>Đặt lại mật khẩu</h2>
        </div>
        <div class="content">
          <p>Xin chào <strong>${name}</strong>,</p>
          
          <p>Chúng tôi nhận được yêu cầu đặt lại mật khẩu cho tài khoản Bóc Mệnh của bạn.</p>
          
          <p>Nhấn vào nút bên dưới để tạo mật khẩu mới:</p>
          
          <div style="text-align: center;">
            <a href="${resetLink}" class="button">Đặt lại mật khẩu</a>
          </div>
          
          <div class="warning">
            <strong>⚠️ Lưu ý quan trọng:</strong>
            <ul>
              <li>Link này chỉ có hiệu lực trong <strong>15 phút</strong></li>
              <li>Chỉ sử dụng được <strong>1 lần</strong></li>
              <li>Nếu bạn không yêu cầu đặt lại mật khẩu, hãy bỏ qua email này</li>
            </ul>
          </div>
          
          <p>Nếu nút không hoạt động, bạn có thể copy link sau vào trình duyệt:</p>
          <p style="word-break: break-all; background: #e5e7eb; padding: 10px; border-radius: 5px; font-family: monospace;">
            ${resetLink}
          </p>
          
          <p>Trân trọng,<br>
          <strong>Đội ngũ Bóc Mệnh</strong></p>
        </div>
        <div class="footer">
          <p>Email này được gửi tự động, vui lòng không trả lời.</p>
          <p>© 2024 Bóc Mệnh. Mọi quyền được bảo lưu.</p>
        </div>
      </div>
    </body>
    </html>
  `
}
