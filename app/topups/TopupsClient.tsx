"use client"

import { useState, useEffect } from "react"
import { type TopupPackage, type PaymentGate, getPaymentGates, buyTopup } from "@/lib/topups"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"
import { useTranslation } from "react-i18next"
import { showGlobalLoading, hideGlobalLoading } from "@/lib/utils"

interface TopupsClientProps {
  initialTopupPackages: TopupPackage[]
}

export default function TopupsClient({ initialTopupPackages }: TopupsClientProps) {
  const { t } = useTranslation("common")
  const { toast } = useToast()
  const [selectedPackage, setSelectedPackage] = useState<TopupPackage | null>(null)
  const [paymentGates, setPaymentGates] = useState<PaymentGate[]>([])
  const [selectedPaymentGate, setSelectedPaymentGate] = useState<string | null>(null)
  const [isBuying, setIsBuying] = useState(false)

  useEffect(() => {
    const fetchGates = async () => {
      try {
        const gates = await getPaymentGates()
        setPaymentGates(gates)
        if (gates.length > 0) {
          setSelectedPaymentGate(gates[0].id)
        }
      } catch (error) {
        console.error("Failed to fetch payment gates:", error)
        toast({
          title: t("topups.error"),
          description: t("topups.fetchGatesError"),
          variant: "destructive",
        })
      }
    }
    fetchGates()
  }, [t, toast])

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Ensure the message is from a trusted origin if opening external IPN links
      // For internal /topups-checkout, origin check might be less critical but still good practice
      if (event.origin !== window.location.origin) {
        console.warn("Message from untrusted origin:", event.origin)
        return
      }

      const { type, transId } = event.data
      if (type === "paymentComplete" && transId) {
        window.location.href = `/topups-checkout?transId=${transId}`
      }
    }

    window.addEventListener("message", handleMessage)
    return () => {
      window.removeEventListener("message", handleMessage)
    }
  }, [])

  const handleBuy = async () => {
    if (!selectedPackage || !selectedPaymentGate) {
      toast({
        title: t("topups.error"),
        description: t("topups.selectPackageAndGate"),
        variant: "destructive",
      })
      return
    }

    setIsBuying(true)
    showGlobalLoading(t("topups.processingPayment"))
    try {
      const { ipnLink } = await buyTopup(selectedPackage.id, selectedPaymentGate)

      // Open IPN link in a new small window
      const newWindow = window.open(ipnLink, "_blank", "width=600,height=700,resizable=yes,scrollbars=yes")

      if (!newWindow) {
        toast({
          title: t("topups.error"),
          description: t("topups.popupBlocked"),
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Failed to initiate purchase:", error)
      toast({
        title: t("topups.error"),
        description: t("topups.purchaseFailed"),
        variant: "destructive",
      })
    } finally {
      setIsBuying(false)
      hideGlobalLoading()
    }
  }

  return (
    <div className="w-full max-w-4xl bg-card/80 backdrop-blur-sm border border-border rounded-xl p-6 shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {initialTopupPackages.map((pkg) => (
          <Card
            key={pkg.id}
            className={`cursor-pointer transition-all duration-300 ${
              selectedPackage?.id === pkg.id
                ? "border-primary ring-2 ring-primary shadow-lg scale-105"
                : "border-border hover:border-primary/50 hover:shadow-md"
            } mystical-card`}
            onClick={() => setSelectedPackage(pkg)}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl font-serif text-primary text-center">{pkg.name}</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-4xl font-bold text-secondary mb-2">
                {pkg.finalFates} <span className="text-lg font-normal">{t("topups.fatesUnit")}</span>
              </p>
              {pkg.fateBonus && pkg.fateBonus > 0 && (
                <p className="text-sm text-muted-foreground">
                  {t("topups.bonus")}: +{pkg.fateBonus} {t("topups.fatesUnit")} ({pkg.fateBonusRate}%)
                </p>
              )}
              <div className="mt-4">
                {pkg.amountDiscount && pkg.amountDiscount > 0 ? (
                  <>
                    <p className="text-lg text-foreground line-through opacity-70">
                      {pkg.amount.toLocaleString("vi-VN")} VND
                    </p>
                    <p className="text-2xl font-semibold text-primary">{pkg.finalAmount.toLocaleString("vi-VN")} VND</p>
                    <p className="text-sm text-secondary">
                      {t("topups.discount")}: -{pkg.amountDiscount.toLocaleString("vi-VN")} VND (
                      {pkg.amountDiscountRate}%)
                    </p>
                  </>
                ) : (
                  <p className="text-2xl font-semibold text-primary">{pkg.finalAmount.toLocaleString("vi-VN")} VND</p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedPackage && (
        <div className="mt-8 p-6 bg-card/90 border border-border rounded-xl shadow-inner">
          <h2 className="text-xl font-serif text-foreground mb-4">{t("topups.selectPaymentGate")}</h2>
          {paymentGates.length > 0 ? (
            <RadioGroup
              onValueChange={setSelectedPaymentGate}
              value={selectedPaymentGate || ""}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {paymentGates.map((gate) => (
                <div
                  key={gate.id}
                  className="flex items-center space-x-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                >
                  <RadioGroupItem value={gate.id} id={`gate-${gate.id}`} />
                  <Label htmlFor={`gate-${gate.id}`} className="flex items-center gap-3 flex-grow cursor-pointer">
                    {gate.icon && (
                      <Image
                        src={gate.icon || "/placeholder.svg"}
                        alt={gate.name}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                    )}
                    <span className="font-medium text-foreground">{gate.name}</span>
                    <span className="text-sm text-muted-foreground ml-auto hidden sm:block">{gate.description}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          ) : (
            <p className="text-muted-foreground">{t("topups.noPaymentGates")}</p>
          )}

          <Button
            onClick={handleBuy}
            disabled={!selectedPackage || !selectedPaymentGate || isBuying}
            className="mystical-button w-full mt-8"
          >
            {isBuying ? t("topups.processing") : t("topups.buyNow")}
          </Button>
        </div>
      )}
    </div>
  )
}
