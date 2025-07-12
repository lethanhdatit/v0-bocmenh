import { TransactionStatusResponse } from "@/lib/topups";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { toShortId } from "@/lib/infra/utils";
import { getLocaleByCurrency } from "@/lib/infra/utils";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useRef } from "react";

export function TopupBill({
  data,
  statusColors,
  showExport = false,
}: {
  data?: TransactionStatusResponse;
  statusColors?: { text: string; bg: string };
  showExport?: boolean;
}) {
  const { t } = useTranslation("common");
  if (!data) return null;
  const locale = getLocaleByCurrency(data.currency);

  const billRef = useRef<HTMLDivElement>(null);

  // Lấy URL đẹp cho footer PDF
  const getRefUrl = (id?: string) => {
    try {
      return `${window.location.origin}${id ? `/topups-checkout?transId=${id}` : ``}`;
    } catch {
      return window.location.href;
    }
  };

  const handleExportPDF = async () => {
    if (!billRef.current) return;
    const watermarkImg = "/logo.png";
    // Chụp bill thành ảnh
    const canvas = await html2canvas(billRef.current, {
      backgroundColor: null,
      scale: 2,
      useCORS: true,
    });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    // === Thêm tiêu đề hóa đơn điện tử ===
    pdf.setFont("Roboto", "normal");
    pdf.setFontSize(28);
    pdf.setTextColor("#1e293b");
    pdf.text(t("checkout.billingTitle"), pageWidth / 2, 48, { align: "center" });

    // === Thêm sub tiêu đề ===
    pdf.setFont("Arial", "normal");
    pdf.setFontSize(10);
    pdf.setTextColor("#2563eb");
    
    var transLink = getRefUrl(data.id);
    pdf.textWithLink(transLink, pageWidth / 2, 68, {
      url: transLink,
      align: "center",
      target: "_blank",
    });

    // Watermark
    const watermark = new window.Image();
    watermark.src = watermarkImg;
    await new Promise((res) => (watermark.onload = res));
    pdf.addImage(
      watermark,
      "PNG",
      pageWidth / 2 - 100,
      pageHeight / 2 - 100,
      200,
      200,
      undefined,
      "NONE",
      0.1 // opacity
    );

    // Bill content (dời xuống dưới tiêu đề/sub tiêu đề)
    const imgProps = pdf.getImageProperties(imgData);
    const ratio = Math.min(
      pageWidth / imgProps.width,
      (pageHeight - 60) / imgProps.height
    );
    const imgWidth = imgProps.width * ratio;
    const imgHeight = imgProps.height * ratio;

    pdf.addImage(
      imgData,
      "PNG",
      (pageWidth - imgWidth) / 2,
      90, // dời xuống dưới tiêu đề/sub tiêu đề
      imgWidth,
      imgHeight
    );

    // ...footer giữ nguyên...
    const footerUrl = getRefUrl();
    pdf.setFontSize(10);
    pdf.setTextColor("#2563eb");
    pdf.textWithLink(footerUrl, pageWidth / 2, pageHeight - 16, {
      url: footerUrl,
      align: "center",
    });

    pdf.save(
      `bill_${window.location.host.replace(":", "")}_${
        (data?.id && toShortId(data.id)) || "export"
      }.pdf`
    );
  };

  return (
    <div className="relative">
      <div
        ref={billRef}
        className="w-full bg-gray-50 rounded-xl text-left text-sm font-mono p-4 text-gray-800"
        style={{ position: "relative", zIndex: 1 }}
      >
        {/* Watermark logo dập chìm */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          style={{ opacity: 0.07, zIndex: 0 }}
        >
          <img
            src="/logo.png"
            alt="watermark"
            className="w-2/3 max-w-xs mx-auto"
            draggable={false}
          />
        </div>
        <span>
          {/* --- PHẦN 1 --- */}
          {data.id && (
            <div className="flex justify-between mb-1">
              <span className="font-semibold">{t("checkout.orderId")}:</span>
              <span>{toShortId(data.id)}</span>
            </div>
          )}
          {data.status && (
            <div className="flex justify-between mb-1">
              <span className="font-semibold">{t("checkout.status")}:</span>
              <span className={statusColors?.text}>
                {t(`checkout.paymentStatus.${data.status}`)}
              </span>
            </div>
          )}
          {data.provider && (
            <div className="flex justify-between mb-1">
              <span className="font-semibold">
                {t("checkout.paymentGate")}:
              </span>
              <span className="flex items-center gap-2">
                <Image
                  src={`/${data.provider.toLowerCase()}.png`}
                  alt={data.provider}
                  width={32}
                  height={16}
                  className="inline-block"
                />
                {/* <span>{data.provider}</span> */}
              </span>
            </div>
          )}
          {data.currency && (
            <div className="flex justify-between mb-1">
              <span className="font-semibold">{t("checkout.currency")}:</span>
              <span>{data.currency}</span>
            </div>
          )}
          {data.exchangeRate && data.exchangeRate !== 1 && (
            <div className="flex justify-between mb-1">
              <span className="font-semibold">
                {t("checkout.exchangeRate")}:
              </span>
              <span>
                {data.exchangeRate.toLocaleString(locale)} VND/{data.currency}
              </span>
            </div>
          )}
          <div className="border-t border-dashed border-gray-300 my-3" />
          {(data.packageName ||
            typeof data.fates === "number" ||
            typeof data.fateBonus === "number" ||
            typeof data.fateBonusRate === "number" ||
            typeof data.finalFates === "number") && (
            <>
              {/* --- PHẦN 2 --- */}
              {data.packageName && (
                <div className="flex justify-between mb-1">
                  <span className="font-semibold">
                    {t("checkout.packageName")}:
                  </span>
                  <span className="font-bold text-indigo-800">
                    {data.packageName}
                  </span>
                </div>
              )}
              {typeof data.fates === "number" && (
                <div className="flex justify-between mb-1">
                  <span className="font-semibold">{t("checkout.fates")}:</span>
                  <span className="font-bold">{data.fates}</span>
                </div>
              )}
              {typeof data.fateBonus === "number" && data.fateBonus !== 0 && (
                <div className="flex justify-between mb-1">
                  <span className="font-semibold">
                    {t("checkout.fateBonus")}:
                  </span>
                  <span className="font-bold text-green-600">
                    +{data.fateBonus}
                  </span>
                </div>
              )}
              {typeof data.fateBonusRate === "number" &&
                data.fateBonusRate !== 0 && (
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold">
                      {t("checkout.fateBonusRate")}:
                    </span>
                    <span className="font-bold text-green-600">
                      +{data.fateBonusRate}%
                    </span>
                  </div>
                )}
              {typeof data.finalFates === "number" && (
                <div className="flex justify-between mb-1">
                  <span className="font-semibold">
                    {t("checkout.finalFates")}:
                  </span>
                  <span className="font-bold text-indigo-800">
                    {data.finalFates}
                  </span>
                </div>
              )}
              <div className="border-t border-dashed border-gray-300 my-3" />
            </>
          )}

          {/* --- PHẦN 3 --- */}
          {typeof data.total === "number" && (
            <div className="flex justify-between mb-1">
              <span className="font-semibold">
                {t("checkout.totalAmount")}:
              </span>
              <span className="font-bold">
                {data.total.toLocaleString(locale)} {data.currency}
              </span>
            </div>
          )}
          {typeof data.discountTotal === "number" &&
            data.discountTotal !== 0 && (
              <div className="flex justify-between mb-1">
                <span className="font-semibold">
                  {t("checkout.discountTotal")}:
                </span>
                <span className="font-bold text-green-600">
                  -{data.discountTotal.toLocaleString(locale)} {data.currency}
                </span>
              </div>
            )}
          {typeof data.subTotal === "number" && (
            <div className="flex justify-between mb-1">
              <span className="font-semibold">
                {t("checkout.subTotalAmount")}:
              </span>
              <span className="font-bold">
                {data.subTotal.toLocaleString(locale)} {data.currency}
              </span>
            </div>
          )}
          {typeof data.feeTotal === "number" && data.feeTotal !== 0 && (
            <div className="flex justify-between mb-1">
              <span className="font-semibold">
                {t("checkout.feeTotal")}{" "}
                {typeof data.feeRate === "number" && (
                  <span>({data.feeRate}%)</span>
                )}
                :
              </span>
              <span className="font-bold text-red-600">
                +{data.feeTotal.toLocaleString(locale)} {data.currency}
              </span>
            </div>
          )}
          {typeof data.vaTaxTotal === "number" && data.vaTaxTotal !== 0 && (
            <div className="flex justify-between mb-1">
              <span className="font-semibold">
                {t("checkout.VATaxTotal")}{" "}
                {typeof data.vaTaxRate === "number" && (
                  <span>({data.vaTaxRate}%)</span>
                )}
                :
              </span>
              <span className="font-bold text-red-600">
                +{data.vaTaxTotal.toLocaleString(locale)} {data.currency}
              </span>
            </div>
          )}
          {typeof data.finalTotal === "number" && (
            <div className="flex justify-between mb-1">
              <span className="font-semibold">{t("checkout.finalTotal")}:</span>
              <span className="font-bold text-green-800">
                {data.finalTotal.toLocaleString(locale)} {data.currency}
              </span>
            </div>
          )}
          {typeof data.vaTaxIncluded === "boolean" && (
            <div className="flex justify-between mb-1">
              <span className="font-semibold">
                {t("checkout.VATaxIncluded")}:
              </span>
              <span className="font-bold">
                {data.vaTaxIncluded
                  ? t("checkout.yes", "Có")
                  : t("checkout.no", "Không")}
              </span>
            </div>
          )}
          {typeof data.paid === "number" && (
            <div className="flex justify-between mb-1">
              <span className="font-semibold">{t("checkout.paidAmount")}:</span>
              <span className="font-bold text-blue-700">
                {data.paid.toLocaleString(locale)} {data.currency}
              </span>
            </div>
          )}
          <div className="border-t border-dashed border-gray-300 my-3" />

          {/* --- PHẦN 4 --- */}
          {data.note && (
            <div className="flex justify-between mb-1 items-start">
              <span className="font-semibold">{t("checkout.note")}:</span>
              <span className="text-xs text-gray-500 break-words text-right max-w-[70%]">
                {data.note}
              </span>
            </div>
          )}
        </span>
      </div>
      {showExport && data.status === 'paid' && (
        <div className="flex gap-2 justify-end mt-4">
          <button
            className="px-3 py-1 rounded bg-blue-600 hover:bg-yellow-600 text-white text-xs font-semibold shadow"
            onClick={handleExportPDF}
          >
            Export PDF
          </button>
        </div>
      )}
    </div>
  );
}
