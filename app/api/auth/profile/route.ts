import { type NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session/session";
import { encryptData } from "@/lib/infra/encryption";
export async function GET(request: NextRequest) {
  try {
    const session = await getSession();

    if (!session.isLoggedIn) {
      session.destroy();
      return NextResponse.json({
        encrypted: encryptData({
          success: false,
        }),
      });
    }

    return NextResponse.json({
      encrypted: encryptData({
        success: true,
        user: {
          id: session?.id,
          email: session?.email,
          name: session?.name,
          isLoggedIn: session?.isLoggedIn,
        },
      }),
    });
  } catch (error) {
    const errorData = {
      success: false,
      message: "Lỗi hệ thống",
    };

    return NextResponse.json(
      { encrypted: encryptData(errorData) },
      { status: 500 }
    );
  }
}
