// app/api/wishlist/route.ts
import { type NextRequest, NextResponse } from "next/server"
import { getIronSession } from "iron-session"
import { sessionOptions, type UserSession } from "@/lib/session/sessionOptions"
import { cookies } from "next/headers"

// Biến tạm thời để mô phỏng database/lưu trữ phía server
// Trong thực tế, bạn sẽ dùng database ở đây.
// Biến này sẽ được chia sẻ giữa các request trong cùng một instance server (dev mode).
const serverSideWishlistStore: { [userId: string]: string[] } = {}

async function getUserIdFromSession() {
  const session = await getIronSession<UserSession>(cookies(), sessionOptions)
  return session.isLoggedIn && session.id ? session.id.toString() : null // Giả sử session.id là user ID
}

export async function GET(req: NextRequest) {
  const userId = await getUserIdFromSession()
  if (!userId) {
    // Hoặc trả về lỗi, hoặc trả về danh sách rỗng nếu không đăng nhập
    // Để đơn giản, nếu không có user, ta có thể dùng một key mặc định cho "guest"
    // nhưng điều này không an toàn và không nên dùng trong production.
    // Tạm thời, nếu không có userId, trả về lỗi hoặc danh sách rỗng.
    // return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // Hoặc, nếu muốn cho phép guest xem wishlist (lưu ở client), API này có thể không cần thiết cho guest.
    // Trong trường hợp này, API chỉ dành cho user đã đăng nhập.
    return NextResponse.json({ wishlist: [] }) // Trả về rỗng nếu không có user
  }

  const userWishlist = serverSideWishlistStore[userId] || []
  return NextResponse.json({ wishlist: userWishlist })
}

export async function POST(req: NextRequest) {
  const userId = await getUserIdFromSession()
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized to add to wishlist" }, { status: 401 })
  }

  try {
    const { productId } = await req.json()
    if (!productId || typeof productId !== "string") {
      return NextResponse.json({ error: "Product ID is required and must be a string" }, { status: 400 })
    }

    if (!serverSideWishlistStore[userId]) {
      serverSideWishlistStore[userId] = []
    }

    if (!serverSideWishlistStore[userId].includes(productId)) {
      serverSideWishlistStore[userId].push(productId)
    }

    // console.log(`[API POST /wishlist] User ${userId} added ${productId}. Current server wishlist:`, serverSideWishlistStore[userId]);
    return NextResponse.json({ success: true, wishlist: serverSideWishlistStore[userId] })
  } catch (error) {
    console.error("Error adding to wishlist:", error)
    return NextResponse.json({ error: "Failed to add to wishlist" }, { status: 500 })
  }
}
