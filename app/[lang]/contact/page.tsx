import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";
import { generateMultilingualMetadata, generateMultilingualStructuredData } from "@/lib/seo/seo-helpers";

interface ContactPageProps {
  params: { lang: string };
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  return generateMultilingualMetadata({
    pageKey: "contact",
    params,
  });
}

export default async function ContactPage({ params }: ContactPageProps) {
  const structuredData = await generateMultilingualStructuredData('contact', params);
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <ContactPageClient />
    </>
  );
}
