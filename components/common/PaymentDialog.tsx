import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FatesUnit } from "@/components/common/FatesUnit";

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  serviceName: string;
  servicePrice: number | undefined;
  onConfirm: () => void;
  paying?: boolean;
}

interface PaymentButtonProps {
  servicePrice: number | undefined;
  onClick: () => void;
  disabled?: boolean;
  label?: string;
}

export function PaymentDialog({
  open,
  onOpenChange,
  serviceName,
  servicePrice,
  onConfirm,
  paying,
}: PaymentDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gradient-to-br bg-gray-900/95 backdrop-blur-md border-2 border-yellow-400 shadow-2xl max-w-[95vw] xs:max-w-[400px] sm:max-w-[480px] p-2 xs:p-4">
        <DialogHeader>
          <DialogTitle className="text-yellow-400 text-lg xs:text-xl font-bold flex items-center gap-2">
            <FatesUnit type="icon" width={22} height={22} className="drop-shadow" />
            Xác nhận thanh toán
          </DialogTitle>
        </DialogHeader>
        <div className="py-2 xs:py-4 text-sm xs:text-base text-yellow-100 font-medium">
          Sử dụng <span className="text-yellow-400 font-bold">{servicePrice}</span> điểm duyên để mở khoá dịch vụ <span className="text-yellow-300 font-bold">{serviceName}</span>?
        </div>
        <DialogFooter className="flex-row gap-2 xs:gap-4 justify-end">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={paying}
            className="border border-gray-400 text-gray-700 bg-gray-100 hover:bg-gray-200 font-semibold px-3 py-2 xs:px-5 xs:py-3 text-xs xs:text-base rounded-md"
          >
            Huỷ
          </Button>
          <Button
            onClick={onConfirm}
            className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500 text-gray-900 font-bold border-2 border-yellow-600 hover:from-yellow-500 hover:to-amber-600 shadow-lg px-3 py-2 xs:px-5 xs:py-3 text-xs xs:text-base rounded-md"
            disabled={paying}
          >
            {paying ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-yellow-600" />
                Mở ngay
              </span>
            ) : (
              "Mở ngay"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function PaymentButton({
  servicePrice,
  onClick,
  disabled,
  label = "Mở khoá toàn bộ",
}: PaymentButtonProps) {
  return (
    <Button
      onClick={onClick}
      className="bg-[#18181c] hover:bg-[#23232a] text-yellow-400 font-bold px-8 py-3 text-lg rounded-lg shadow-lg border-2 border-yellow-600 flex items-center gap-2 transition-all"
      style={{ letterSpacing: 0.5 }}
      disabled={disabled}
    >
      <span className="font-bold text-lg text-yellow-700 text-base">
        {servicePrice?.toLocaleString() ?? "--"}
      </span>
      <FatesUnit
        type="icon"
        width={22}
        height={22}
        className="mr-1"
        isAura={true}
      />
      <span className="mx-2 text-yellow-400 font-extrabold">|</span>
      <span className="font-semibold">{label}</span>
    </Button>
  );
}