import Joyride, { STATUS, CallBackProps, Step } from "react-joyride";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import { X, Info } from "lucide-react";
import { useTranslation } from "react-i18next";

export interface TourStep {
  target: string;
  titleKey: string;
  descriptionKey: string;
  disableBeacon?: boolean;
}

export default function ScrollControls({
  steps = [],
  continuous = true,
  scrollDuration = 1000,
  autoNextDuration = 5000,
  disableScrolling = false,
}: {
  steps?: TourStep[];
  continuous?: boolean;
  scrollDuration?: number;
  autoNextDuration?: number;
  disableScrolling?: boolean;
}) {
  const { t } = useTranslation();
  const [run, setRun] = useState(false);
  const lastAutoNextRef = useRef<number | null>(null);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, type, index, lifecycle } = data;
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status as any)) {
      setRun(false);
    }

    if (
      lifecycle === "tooltip" &&
      index < steps.length - 1 &&
      lastAutoNextRef.current !== index
    ) {
      lastAutoNextRef.current = index;
      setTimeout(() => {
        // Thử nhiều selector khác nhau cho nút Next
        const nextBtn =
          document.querySelector(".react-joyride__button--next") ||
          document.querySelector(".joyride-next") ||
          document.querySelector('[data-action="primary"]');
        if (nextBtn) {
          if (!(nextBtn as HTMLButtonElement).disabled) {
            (nextBtn as HTMLButtonElement).click();
          } else {
            setTimeout(() => {
              if (!(nextBtn as HTMLButtonElement).disabled) {
                (nextBtn as HTMLButtonElement).click();
              }
            }, 300);
          }
        }
      }, autoNextDuration);
    }
  };

  if (!steps.length) {
    return null;
  }

  const joyrideSteps: Step[] =
    steps?.map((step, index) => ({
      target: step.target,
      title: (
        <div className="font-bold text-yellow-700 mb-1">{t(step.titleKey)}</div>
      ),
      content: t(step.descriptionKey),
      disableBeacon: step.disableBeacon,
      placement: "auto",
      key: `step-${index}`,
    })) ?? [];

  return (
    <>
      <Joyride
        steps={joyrideSteps}
        run={run}
        continuous={continuous}
        scrollDuration={scrollDuration}
        showSkipButton
        showProgress
        disableScrolling={disableScrolling}
        styles={{
          options: {
            zIndex: 10000,
            primaryColor: "#facc15", // vàng
            backgroundColor: "#fffbea",
            textColor: "#78350f",
            arrowColor: "#facc15",
            overlayColor: "rgba(0, 0, 0, 0.75)",
            spotlightShadow: "0 0 0 4px #facc15, 0 0 16px 8px #facc15aa"
          },
          tooltip: {
            borderRadius: 12,
            boxShadow: "0 4px 32px 0 rgba(0,0,0,0.25)",
            padding: 16,
            fontSize: 14,
            maxWidth: 320,
          },
          buttonNext: { backgroundColor: "#facc15", color: "#78350f" },
          buttonBack: { color: "#78350f" },
          buttonSkip: { color: "#78350f" },
        }}
        locale={{
          back: "Trước",
          close: "Đóng",
          last: "Kết thúc",
          next: "Tiếp",
          skip: "Bỏ qua",
        }}
        callback={handleJoyrideCallback}
      />
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          variant="default"
          size="icon"
          className="mystical-button rounded-full shadow-lg w-12 h-12"
          onClick={() => setRun((v) => !v)}
          aria-label={run ? t("tour.stop") : t("tour.start")}
        >
          {run ? <X className="h-6 w-6" /> : <Info className="h-6 w-6" />}
        </Button>
      </div>
    </>
  );
}
