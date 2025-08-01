"use client";

import { useTranslation } from "next-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Building2,
  Target,
  Shield,
  Cpu,
  Users,
  MessageCircle,
} from "lucide-react";

// Type definitions for About page
export interface AboutType {
  title: string;
  subtitle: string;
  introduction: {
    title: string;
    content: string[];
  };
  mission: {
    title: string;
    mission: string;
    vision: string;
  };
  values: {
    title: string;
    accuracy: string;
    privacy: string;
  };
  technology: {
    title: string;
    ai: string;
    team: string;
  };
  partners: {
    title: string;
    experts: string;
    affiliates: string;
  };
  community: {
    title: string;
    content: string;
  };
}

export default function AboutPageClient() {
  const { t } = useTranslation("about");
  const sections = (t("sections", { returnObjects: true }) as AboutType) || {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Animated background stars */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="stars"></div>
        <div className="stars2"></div>
        <div className="stars3"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent mb-6">
            {sections.title}
          </h1>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            {sections.subtitle}
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-8">
          {/* Introduction */}
          <Card className="bg-black/40 backdrop-blur-sm border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-yellow-400">
                <Building2 className="w-6 h-6" />
                {sections.introduction?.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {sections.introduction?.content?.map((item, index) => (
                <p key={index} className="text-gray-300 leading-relaxed">
                  – {item}
                </p>
              ))}
            </CardContent>
          </Card>

          {/* Mission & Vision */}
          <Card className="bg-black/40 backdrop-blur-sm border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-blue-400">
                <Target className="w-6 h-6" />
                {sections.mission?.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                – {sections.mission?.mission}
              </p>
              <p className="text-gray-300 leading-relaxed">
                – {sections.mission?.vision}
              </p>
            </CardContent>
          </Card>

          {/* Core Values */}
          <Card className="bg-black/40 backdrop-blur-sm border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-green-400">
                <Shield className="w-6 h-6" />
                {sections.values?.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                – {sections.values?.accuracy}
              </p>
              <p className="text-gray-300 leading-relaxed">
                – {sections.values?.privacy}
              </p>
            </CardContent>
          </Card>

          {/* Technology & Team */}
          <Card className="bg-black/40 backdrop-blur-sm border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-purple-400">
                <Cpu className="w-6 h-6" />
                {sections.technology?.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                – {sections.technology?.ai}
              </p>
              <p className="text-gray-300 leading-relaxed">
                – {sections.technology?.team}
              </p>
            </CardContent>
          </Card>

          {/* Partners & Affiliations */}
          <Card className="bg-black/40 backdrop-blur-sm border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-orange-400">
                <Users className="w-6 h-6" />
                {sections.partners?.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                – {sections.partners?.experts}
              </p>
              <p className="text-gray-300 leading-relaxed">
                – {sections.partners?.affiliates}
              </p>
            </CardContent>
          </Card>

          {/* Community Connection */}
          <Card className="bg-black/40 backdrop-blur-sm border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-teal-400">
                <MessageCircle className="w-6 h-6" />
                {sections.community?.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed">
                – {sections.community?.content}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <style jsx>{`
        .stars {
          width: 1px;
          height: 1px;
          background: transparent;
          box-shadow: 1541px 1848px #fff, 1445px 1109px #fff, 1531px 1498px #fff;
          animation: animStar 50s linear infinite;
        }
        .stars2 {
          width: 2px;
          height: 2px;
          background: transparent;
          box-shadow: 779px 1331px #fff, 324px 42px #fff, 303px 586px #fff;
          animation: animStar 100s linear infinite;
        }
        .stars3 {
          width: 3px;
          height: 3px;
          background: transparent;
          box-shadow: 1446px 1618px #fff, 1463px 886px #fff, 504px 1950px #fff;
          animation: animStar 150s linear infinite;
        }
        @keyframes animStar {
          from {
            transform: translateY(0px);
          }
          to {
            transform: translateY(-2000px);
          }
        }
      `}</style>
    </div>
  );
}
