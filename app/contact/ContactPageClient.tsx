"use client"

import { useTranslation } from "next-i18next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import {
  Mail,
  Users,
  MessageSquare,
  Heart,
  Megaphone,
  TrendingUp,
  Handshake,
  Clock,
  CheckCircle,
  ExternalLink,
} from "lucide-react"

export default function ContactPageClient() {
  const { t } = useTranslation("contact")
  const sections = (t("root", { returnObjects: true }) as ContactType) || {}

  const contactChannels = [
    {
      icon: "zalo", // Đánh dấu đây là icon Zalo
      label: "Zalo",
      value: sections.channels?.zalo,
      link: `tel:${sections.channels?.zalo}`,
      color: "bg-blue-600",
    },
    {
      icon: Mail,
      label: "Email",
      value: sections.channels?.email,
      link: `mailto:${sections.channels?.email}`,
      color: "bg-green-500",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,215,0,0.1),transparent_50%)]" />
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent mb-4">
            {sections.title}
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">{sections.subtitle}</p>
        </div>

        {/* Contact Channels */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">{sections.channels?.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactChannels.map((channel, index) => {
              const isZalo = channel.icon === "zalo"
              const Icon = isZalo ? null : channel.icon
              return (
                <Card
                  key={index}
                  className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all duration-300 group"
                >
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-12 h-12 ${channel.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                    >
                      {isZalo ? (
                        <Image
                          src="/imgs/socials/zalo_icon.svg"
                          alt="Zalo"
                          width={24}
                          height={24}
                          className="w-6 h-6"
                        />
                      ) : (
                        <Icon className="w-6 h-6 text-white" />
                      )}
                    </div>
                    <h3 className="font-semibold text-white mb-2">{channel.label}</h3>
                    <p className="text-gray-300 text-sm mb-4">{channel.value}</p>
                    <Button
                      asChild
                      size="sm"
                      className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black hover:from-yellow-500 hover:to-orange-500"
                    >
                      <a href={channel.link} target="_blank" rel="noopener noreferrer">
                        {sections.channels.contact} <ExternalLink className="w-4 h-4 ml-1" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Users Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 mb-4">
              <Users className="w-4 h-4 mr-2" />
              {sections.users?.title}
            </Badge>
            <h2 className="text-3xl font-bold text-white mb-4">{sections.users?.subtitle}</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Support */}
            <Card className="bg-black/40 backdrop-blur-sm border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-400">
                  <MessageSquare className="w-5 h-5" />
                  {sections.users?.support?.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300">{sections.users?.support?.description}</p>
                <div className="space-y-2">
                  <p className="text-sm text-blue-300 font-medium">{sections.users?.support?.hours}</p>
                  <p className="text-sm text-blue-300 font-medium">{sections.users?.support?.response}</p>
                </div>
              </CardContent>
            </Card>

            {/* Feedback */}
            <Card className="bg-black/40 backdrop-blur-sm border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-400">
                  <Heart className="w-5 h-5" />
                  {sections.users?.feedback?.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300">{sections.users?.feedback?.description}</p>
                <ul className="space-y-2">
                  {sections.users?.feedback?.types?.map((type, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      {type}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Partners Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 mb-4">
              <Handshake className="w-4 h-4 mr-2" />
              {sections.partners?.title}
            </Badge>
            <h2 className="text-3xl font-bold text-white mb-4">{sections.partners?.subtitle}</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Advertising */}
            <Card className="bg-black/40 backdrop-blur-sm border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-400">
                  <Megaphone className="w-5 h-5" />
                  {sections.partners?.advertising?.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300">{sections.partners?.advertising?.description}</p>
                <ul className="space-y-2">
                  {sections.partners?.advertising?.formats?.map((format, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-300">
                      <CheckCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                      {format}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Affiliate */}
            <Card className="bg-black/40 backdrop-blur-sm border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-yellow-400">
                  <TrendingUp className="w-5 h-5" />
                  {sections.partners?.affiliate?.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300">{sections.partners?.affiliate?.description}</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Office Info */}
        <Card className="bg-black/40 backdrop-blur-sm border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300">
          <CardHeader></CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-yellow-400 mt-1" />
                <div>
                  <h4 className="font-semibold text-white mb-1">{sections.office?.workingTime}</h4>
                  <p className="text-gray-300">{sections.office?.hours}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Type definitions for Contact page
export interface ContactType {
  title: string
  subtitle: string
  channels: {
    title: string
    facebook: string
    youtube: string
    zalo: string
    email: string
    contact: string
  }
  users: {
    title: string
    subtitle: string
    support: {
      title: string
      description: string
      hours: string
      response: string
    }
    feedback: {
      title: string
      description: string
      types: string[]
    }
    community: {
      title: string
      description: string
      benefits: string[]
    }
  }
  partners: {
    title: string
    subtitle: string
    advertising: {
      title: string
      description: string
      formats: string[]
      contact: string
    }
    affiliate: {
      title: string
      description: string
      requirements: string[]
      benefits: string[]
      contact: string
    }
    collaboration: {
      title: string
      description: string
      opportunities: string[]
      contact: string
    }
  }
  office: {
    title: string
    address: string
    hours: string
    note: string
    workingTime: string
  }
}
