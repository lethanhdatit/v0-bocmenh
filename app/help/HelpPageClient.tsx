"use client"

import { useLanguage } from "@/contexts/LanguageContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { HelpCircle, Shield, Download, CheckCircle } from "lucide-react"

interface HelpContent {
  title: string
  questions: {
    [key: string]: {
      question: string
      answer: string
      note?: string
    }
  }
}

interface HelpPageClientProps {
  content: HelpContent
}

export default function HelpPageClient({ content }: HelpPageClientProps) {
  const { language } = useLanguage()

  const getIcon = (questionKey: string) => {
    switch (questionKey) {
      case "q1":
      case "q2":
        return <Shield className="w-5 h-5 text-yellow-500" />
      case "q3":
      case "q6":
        return <HelpCircle className="w-5 h-5 text-blue-500" />
      case "q4":
      case "q9":
        return <Shield className="w-5 h-5 text-green-500" />
      case "q5":
      case "q8":
        return <Download className="w-5 h-5 text-purple-500" />
      case "q7":
        return <CheckCircle className="w-5 h-5 text-orange-500" />
      default:
        return <HelpCircle className="w-5 h-5 text-gray-500" />
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-500/20 rounded-full mb-6">
            <HelpCircle className="w-8 h-8 text-yellow-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
            {content.title}
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {language === "vi"
              ? "Tìm câu trả lời cho những thắc mắc thường gặp về dịch vụ của chúng tôi"
              : "Find answers to frequently asked questions about our services"}
          </p>
        </div>

        {/* FAQ Content */}
        <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-yellow-500 flex items-center gap-3">
              <HelpCircle className="w-6 h-6" />
              {language === "vi" ? "Câu hỏi thường gặp" : "Frequently Asked Questions"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="space-y-4">
              {Object.entries(content.questions).map(([key, item]) => (
                <AccordionItem key={key} value={key} className="border border-gray-800 rounded-lg px-4 bg-gray-900/30">
                  <AccordionTrigger className="text-left hover:no-underline hover:text-yellow-400 transition-colors">
                    <div className="flex items-start gap-3">
                      {getIcon(key)}
                      <span className="text-base font-medium">{item.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4 pb-2">
                    <div className="ml-8 space-y-3">
                      <p className="text-gray-300 leading-relaxed">{item.answer}</p>
                      {item.note && (
                        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                          <p className="text-yellow-200 text-sm leading-relaxed">
                            <strong className="text-yellow-400">Lưu ý:</strong> {item.note}
                          </p>
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Contact Support */}
        <Card className="mt-8 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/20">
          <CardContent className="p-8 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-500/20 rounded-full mb-4">
              <HelpCircle className="w-6 h-6 text-yellow-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-yellow-400">
              {language === "vi" ? "Vẫn cần hỗ trợ?" : "Still need help?"}
            </h3>
            <p className="text-gray-300 mb-4">
              {language === "vi"
                ? "Nếu bạn không tìm thấy câu trả lời, hãy liên hệ với chúng tôi"
                : "If you can't find the answer, please contact us"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:support@bocmenh.com"
                className="inline-flex items-center justify-center px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-medium rounded-lg transition-colors"
              >
                {language === "vi" ? "Gửi Email Hỗ Trợ" : "Send Support Email"}
              </a>
              <a
                href="/terms"
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-600 hover:border-gray-500 text-white rounded-lg transition-colors"
              >
                {language === "vi" ? "Điều Khoản Dịch Vụ" : "Terms of Service"}
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
