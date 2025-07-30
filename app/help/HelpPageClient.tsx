"use client";

import { useTranslation } from "next-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, Shield, Download, CheckCircle } from "lucide-react";

interface HelpContent {
  title: string;
  subTitle: string;
  frequentlyAskedQuestions: string;
  stillNeedHelp: string;
  sendSupportEmail: string;
  termsOfService: string;
  pleaseContactUs: string;
  questions: {
    [key: string]: {
      question: string;
      answer: string;
      note?: string;
    };
  };
}

export default function HelpPageClient() {
  const { t } = useTranslation("help");

  const content =
    (t("root", { returnObjects: true }) as HelpContent) || {};

  const getIcon = (questionKey: string) => {
    switch (questionKey) {
      case "q1":
      case "q2":
        return <Shield className="w-5 h-5 text-yellow-500" />;
      case "q3":
      case "q6":
        return <HelpCircle className="w-5 h-5 text-blue-500" />;
      case "q4":
      case "q9":
        return <Shield className="w-5 h-5 text-green-500" />;
      case "q5":
      case "q8":
        return <Download className="w-5 h-5 text-purple-500" />;
      case "q7":
        return <CheckCircle className="w-5 h-5 text-orange-500" />;
      default:
        return <HelpCircle className="w-5 h-5 text-gray-500" />;
    }
  };

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
            {content.subTitle}
          </p>
        </div>

        {/* FAQ Content */}
        <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-yellow-500 flex items-center gap-3">
              <HelpCircle className="w-6 h-6" />
              {content.frequentlyAskedQuestions}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="space-y-4">
              {Object.entries(content.questions).map(([key, item]) => (
                <AccordionItem
                  key={key}
                  value={key}
                  className="border border-gray-800 rounded-lg px-4 bg-gray-900/30"
                >
                  <AccordionTrigger className="text-white text-left hover:no-underline hover:text-yellow-400 transition-colors">
                    <div className="flex items-start gap-3">
                      {getIcon(key)}
                      <span className="text-base font-medium">
                        {item.question}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4 pb-2">
                    <div className="ml-8 space-y-3">
                      <p className="text-gray-300 leading-relaxed">
                        {item.answer}
                      </p>
                      {item.note && (
                        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                          <p className="text-yellow-200 text-sm leading-relaxed">
                            <strong>💡</strong>{" "}
                            {item.note}
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
        <Card className="mt-8 border-yellow-500/20 bg-black/40 backdrop-blur-sm border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300">
          <CardContent className="p-8 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-500/20 rounded-full mb-4">
              <HelpCircle className="w-6 h-6 text-yellow-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-yellow-400">
              {content.stillNeedHelp}
            </h3>
            <p className="text-gray-300 mb-4">{content.pleaseContactUs}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:support@insight.ai.vn"
                className="inline-flex items-center justify-center px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black-300 font-medium rounded-lg transition-colors"
              >
                {content.sendSupportEmail}
              </a>
              <a
                href="/terms"
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-600 hover:border-gray-500 text-white rounded-lg transition-colors"
              >
                {content.termsOfService}
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
