import ProfileClient from "./ProfileClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thông tin cá nhân | My Fates",
  description: "Quản lý thông tin cá nhân và tài khoản",
};

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <ProfileClient />
        </div>
      </div>
    </div>
  );
}
