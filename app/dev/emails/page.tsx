"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Mail, Trash2, RefreshCw } from "lucide-react"

// This is a development-only page to view sent emails
export default function EmailViewerPage() {
  const [emails, setEmails] = useState<any[]>([])
  const [selectedEmail, setSelectedEmail] = useState<any>(null)

  // Mock function to get sent emails (in real app, this would be an API call)
  const fetchEmails = () => {
    // This would normally fetch from your email service
    // For demo purposes, we'll simulate some emails
    const mockEmails = [
      {
        to: "demo@insight.ai.vn",
        subject: "Đặt lại mật khẩu - Bóc Mệnh",
        html: `<div style="font-family: Arial, sans-serif;">
          <h2>🔮 Bóc Mệnh - Đặt lại mật khẩu</h2>
          <p>Xin chào <strong>Người Dùng Demo</strong>,</p>
          <p>Chúng tôi nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn.</p>
          <a href="/auth/reset-password?token=demo-token-123" style="background: linear-gradient(135deg, #f59e0b, #d97706); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; display: inline-block; margin: 20px 0;">Đặt lại mật khẩu</a>
          <p><small>Link này có hiệu lực trong 15 phút.</small></p>
        </div>`,
        sentAt: new Date(),
      },
    ]
    setEmails(mockEmails)
  }

  useEffect(() => {
    fetchEmails()
  }, [])

  if (process.env.NODE_ENV === "production") {
    return (
      <div className="min-h-screen pt-20 pb-12 flex items-center justify-center">
        <div className="text-center text-red-400">
          <h1 className="text-2xl font-bold mb-4">Trang này chỉ khả dụng trong môi trường phát triển</h1>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-yellow-500 mb-2">📧 Email Viewer (Dev Only)</h1>
          <p className="text-gray-300">Xem các email đã gửi trong quá trình phát triển</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Email List */}
          <div className="lg:col-span-1">
            <div className="mystical-card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-yellow-500">Emails Đã Gửi</h2>
                <button onClick={fetchEmails} className="text-gray-400 hover:text-yellow-500 transition-colors">
                  <RefreshCw className="w-5 h-5" />
                </button>
              </div>

              {emails.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  <Mail className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Chưa có email nào được gửi</p>
                  <p className="text-sm mt-2">Thử tính năng "Quên mật khẩu" để tạo email demo</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {emails.map((email, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setSelectedEmail(email)}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        selectedEmail === email
                          ? "border-yellow-500 bg-yellow-500/10"
                          : "border-gray-600 hover:border-gray-500"
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <Mail className="w-5 h-5 text-yellow-500 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-medium truncate">{email.subject}</p>
                          <p className="text-gray-400 text-sm truncate">{email.to}</p>
                          <p className="text-gray-500 text-xs">{email.sentAt.toLocaleString("vi-VN")}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Email Preview */}
          <div className="lg:col-span-2">
            <div className="mystical-card">
              {selectedEmail ? (
                <div>
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-700">
                    <div>
                      <h2 className="text-lg font-semibold text-white">{selectedEmail.subject}</h2>
                      <p className="text-gray-400 text-sm">Đến: {selectedEmail.to}</p>
                      <p className="text-gray-500 text-xs">{selectedEmail.sentAt.toLocaleString("vi-VN")}</p>
                    </div>
                    <button className="text-gray-400 hover:text-red-400 transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="bg-white rounded-lg p-4">
                    <div
                      dangerouslySetInnerHTML={{ __html: selectedEmail.html }}
                      className="prose prose-sm max-w-none"
                    />
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-400">
                  <Mail className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">Chọn một email để xem nội dung</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 mystical-card">
          <h3 className="text-lg font-semibold text-yellow-500 mb-4">🛠️ Hướng dẫn sử dụng</h3>
          <div className="space-y-2 text-gray-300">
            <p>• Trang này chỉ hiển thị trong môi trường phát triển</p>
            <p>
              • Để test tính năng quên mật khẩu, truy cập:{" "}
              <code className="bg-gray-800 px-2 py-1 rounded">/auth/forgot-password</code>
            </p>
            <p>
              • Sử dụng email: <code className="bg-gray-800 px-2 py-1 rounded">demo@insight.ai.vn</code> hoặc{" "}
              <code className="bg-gray-800 px-2 py-1 rounded">premium@insight.ai.vn</code>
            </p>
            <p>• Trong production, emails sẽ được gửi qua dịch vụ email thực tế</p>
          </div>
        </div>
      </div>
    </main>
  )
}
