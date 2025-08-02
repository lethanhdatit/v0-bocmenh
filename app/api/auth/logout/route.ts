import { type NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session/session";
import { encryptData } from "@/lib/infra/encryption";

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();

    // Clear session
    session.destroy();

    const responseData = {
      success: true,
      message: "Đăng xuất thành công",
    };

    return NextResponse.json({ encrypted: encryptData(responseData) });
  } catch (error) {
    const errorData = {
      success: false,
      message: "Lỗi khi đăng xuất",
    };

    return NextResponse.json(
      { encrypted: encryptData(errorData) },
      { status: 500 }
    );
  }
}
