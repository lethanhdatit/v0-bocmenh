import ProfileClient from "./ProfileClient";
import { Metadata } from "next";
import { generateMultilingualMetadata, generateMultilingualStructuredData } from "@/lib/seo/seo-helpers"

interface ProfilePageProps {
  params: {
    lang: string
  }
}

export async function generateMetadata({ params }: ProfilePageProps): Promise<Metadata> {
  return generateMultilingualMetadata({
    pageKey: 'profile',
    params
  });
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const structuredData = await generateMultilingualStructuredData('profile', params);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <ProfileClient />
          </div>
        </div>
      </div>
    </>
  );
}
