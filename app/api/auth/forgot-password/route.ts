import { type NextRequest, NextResponse } from "next/server";
import { decryptData, encryptData } from "@/lib/infra/encryption";
import { emailService, generatePasswordResetEmail } from "@/lib/email";
import { generateResetToken } from "@/lib/passwordReset";
import { getBaseUrl } from "@/lib/infra/utils";
import { isValidEmail } from "@/lib/infra/validators";

// Mock user database (should match other auth routes)
const users: Array<{
  id: string;
  email: string;
  password: string;
  name: string;
  createdAt: string;
  isPremium: boolean;
}> = [
  {
    id: "demo-user-1",
    email: "demo@bocmenh.com",
    password: Buffer.from("123456").toString("base64"),
    name: "Người Dùng Demo",
    createdAt: new Date().toISOString(),
    isPremium: false,
  },
  {
    id: "premium-user-1",
    email: "premium@bocmenh.com",
    password: Buffer.from("123456").toString("base64"),
    name: "Thành Viên Premium",
    createdAt: new Date().toISOString(),
    isPremium: true,
  },
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { encrypted } = body;

    // Decrypt the request data
    const { email } = decryptData(encrypted);

    // Validation
    if (!email || !isValidEmail(email)) {
      const errorData = {
        success: false,
        errors: { email: "Email không hợp lệ" },
        message: "Vui lòng nhập email hợp lệ",
      };
      return NextResponse.json(
        { encrypted: encryptData(errorData) },
        { status: 400 }
      );
    }

    // Find user by email
    const user = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    // Always return success to prevent email enumeration attacks
    // But only send email if user exists
    if (user) {
      try {
        // Generate reset token
        const resetToken = generateResetToken(user.email, user.id);

        // Create reset link
        const baseUrl = getBaseUrl();

        const resetLink = new URL(
          `/auth/reset-password?token=${resetToken}`,
          baseUrl
        ).toString();

        // Generate email content
        const emailHtml = generatePasswordResetEmail(user.name, resetLink);

        // Send email
        const emailSent = await emailService.sendEmail({
          to: user.email,
          subject: "Đặt lại mật khẩu - Bóc Mệnh",
          html: emailHtml,
          text: `Xin chào ${user.name}, vui lòng truy cập link sau để đặt lại mật khẩu: ${resetLink}`,
        });

        if (!emailSent) {
          throw new Error("Failed to send email");
        }
      } catch (error) {
        console.error("Error sending password reset email:", error);
        // Don't reveal the error to prevent information disclosure
      }
    }

    // Always return success message
    const responseData = {
      success: true,
      message:
        "Nếu email tồn tại trong hệ thống, chúng tôi đã gửi link đặt lại mật khẩu. Vui lòng kiểm tra hộp thư của bạn.",
    };

    return NextResponse.json({ encrypted: encryptData(responseData) });
  } catch (error) {
    console.error("Forgot password error:", error);
    const errorData = {
      success: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau",
    };

    return NextResponse.json(
      { encrypted: encryptData(errorData) },
      { status: 500 }
    );
  }
}
