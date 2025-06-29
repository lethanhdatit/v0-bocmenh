"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api/apiClient";
import ProductCard from "@/components/store/ProductCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Gift } from "lucide-react";
import { useTranslation } from "react-i18next";

interface DestinyResult {
  id: string;
  result: string;
  input: any;
  preData: any;
}

interface Product {
  id: string;
  // ...other fields
}

export default function DestinyResultClient({ id }: { id: string }) {
  const { t } = useTranslation(["common", "destiny", "attributes"]);
  const [destinyResult, setDestinyResult] = useState<DestinyResult | null>(
    null
  );
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    apiClient
      .get(`/destiny?id=${id}`)
      .then((response) => {
        if (response.data?.success && response.data.data) {
          setDestinyResult(response.data.data);
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return <div className="text-center py-12">{t("common.loading")}</div>;
  if (!destinyResult) return null;

  return (
    <>
      <section className="mb-12 p-6 sm:p-8 bg-gradient-to-br from-slate-800/70 via-gray-800/80 to-slate-800/70 rounded-xl shadow-2xl border border-yellow-500/40 backdrop-blur-sm">
        <div
          className="space-y-6 text-gray-200 text-lg leading-relaxed"
          dangerouslySetInnerHTML={{ __html: destinyResult.result }}
        />
        {/* <p className="mt-8 pt-6 border-t border-gray-700/50 italic text-gray-400 text-sm text-center">
          {t("destiny.result.disclaimer", { year: currentYear })}
        </p> */}
        <div className="text-center mt-10">
          <Link href="/destiny">
            <Button
              variant="outline"
              className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-gray-900 border-yellow-600 hover:border-yellow-700 px-8 py-3 text-base font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              {t("destiny.result.viewForAnother")}
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
