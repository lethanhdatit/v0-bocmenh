import type { Metadata } from "next";
import DestinyForm from "./DestinyForm";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { getTranslations } from "@/i18n/server";
import DestinyResultClient from "./DestinyResultClient";
import { generateMultilingualMetadata, generateMultilingualStructuredData } from "@/lib/seo/seo-helpers";
import { getBaseUrl } from "@/lib/infra/utils";

export const dynamic = "force-dynamic";

interface DestinyPageProps {
  params: { lang: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({
  searchParams,
  params,
}: DestinyPageProps): Promise<Metadata> {
  const baseUrl = getBaseUrl();
  const id = searchParams?.id as string;
  const name = searchParams?.name as string;

  if (id && name) {
    // Dynamic metadata for specific destiny result
    const { t } = await getTranslations(["common"]);
    return {
      title: `${t('common:seo.destiny.resultTitle', { name })} - Bóc Mệnh`,
      description: `${t('common:seo.destiny.resultDescription', { name })}`,
      openGraph: {
        title: `${t('common:seo.destiny.resultTitle', { name })} - Bóc Mệnh`,
        description: `${t('common:seo.destiny.resultDescription', { name })}`,
        url: `${baseUrl}/destiny?id=${id}`,
      },
      alternates: {
        canonical: `${baseUrl}/destiny?id=${id}`,
      },
    };
  }

  return generateMultilingualMetadata({
    pageKey: 'destiny',
    params,
  });
}

export default async function DestinyPage({
  searchParams,
  params,
}: DestinyPageProps) {
  const { t } = await getTranslations(["common"]);
  const id = searchParams?.id as string | undefined;
  const structuredData = await generateMultilingualStructuredData('destiny', params);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <main className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-gray-950 via-slate-900 text-gray-100">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
          <Card
            className={`w-full ${
              !id ? "max-w-lg" : ""
            } mx-auto bg-gray-900/80 border-yellow-500/30 shadow-xl backdrop-blur-sm`}
          >
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 bg-clip-text text-transparent">
                {t("common:destiny.form.title")}
              </CardTitle>
              <CardDescription className="text-gray-300 mt-1 text-left">
                <i>{t("common:features.destiny.description")}</i>
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!id ? <DestinyForm /> : <DestinyResultClient id={id} />}
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
