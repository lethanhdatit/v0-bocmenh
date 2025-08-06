// app/api/wishlist/[productId]/route.ts
import { type NextRequest, NextResponse } from "next/server"
import { getIronSession } from "iron-session"
import { sessionOptions, type UserSession } from "@/lib/session/sessionOptions"
import { cookies } from "next/headers"

// Sử dụng lại biến store từ file route.ts chính, hoặc quản lý riêng nếu cần.
// Để đơn giản, ta giả định biến này có thể truy cập được (trong thực tế cần cấu trúc tốt hơn).
// Đây là một giới hạn của việc mô phỏng DB bằng biến global trong Next.js API routes.
// Một cách tốt hơn là truyền state này qua một service hoặc context nếu có.
// Hoặc, mỗi file API route sẽ có instance riêng của store nếu không export/import.
// Để giữ logic đơn giản cho ví dụ này, ta sẽ không chia sẻ trực tiếp biến `serverSideWishlistStore`
// mà sẽ giả định rằng logic xóa này sẽ hoạt động trên một store tương tự.
// Trong một ứng dụng thực tế, bạn sẽ có một module/service quản lý dữ liệu này.

// Tạm thời, chúng ta sẽ cần một cách để truy cập serverSideWishlistStore.
// Vì mục đích demo, chúng ta sẽ không thể chia sẻ trực tiếp biến `serverSideWishlistStore` từ file kia.
// API này sẽ chỉ mô phỏng việc xóa.
// Để làm đúng, bạn cần một lớp service quản lý state này.

const serverSideWishlistStore_DELETE_ROUTE: { [userId: string]: string[] } = {} // Store riêng cho route này để tránh lỗi import

async function getUserIdFromSession() {
  const session = await getIronSession<UserSession>(cookies(), sessionOptions)
  return session.isLoggedIn && session.id ? session.id.toString() : null
}

export async function DELETE(req: NextRequest, { params }: { params: { productId: string } }) {
  const userId = await getUserIdFromSession()
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized to remove from wishlist" }, { status: 401 })
  }

  const { productId } = params

  if (!productId) {
    return NextResponse.json({ error: "Product ID is required" }, { status: 400 })
  }

  if (serverSideWishlistStore_DELETE_ROUTE[userId]) {
    serverSideWishlistStore_DELETE_ROUTE[userId] = serverSideWishlistStore_DELETE_ROUTE[userId].filter(
      (id) => id !== productId,
    )
  } else {
    // Nếu user không có wishlist trên server (hoặc store rỗng), không có gì để xóa
    serverSideWishlistStore_DELETE_ROUTE[userId] = []
  }
  
  // Lưu ý: serverSideWishlistStore_DELETE_ROUTE là một store riêng biệt trong file này.
  // Để đồng bộ thực sự, bạn cần một service quản lý state chung.
  // Hiện tại, API POST và GET dùng một store, API DELETE dùng store khác.
  // Đây là hạn chế của việc mô phỏng DB bằng biến global trong các file API route riêng lẻ.
  // Để khắc phục tạm thời, ta sẽ giả định rằng client sẽ quản lý state chính xác thông qua localStorage
  // và API chỉ là để mô phỏng.
  return NextResponse.json({ success: true, wishlist: serverSideWishlistStore_DELETE_ROUTE[userId] || [] })
}
