"use client"

import { useTranslation } from "next-i18next"
import type { ContactType } from "@/lib/infra/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Facebook,
  Youtube,
  Phone,
  Mail,
  Users,
  MessageSquare,
  Heart,
  Megaphone,
  TrendingUp,
  Handshake,
  MapPin,
  Clock,
  Star,
  CheckCircle,
  ExternalLink,
} from "lucide-react"

export default function ContactPageClient() {
  const { t } = useTranslation("contact")
  const sections = (t("sections", { returnObjects: true }) as ContactType) || {}

  const contactChannels = [
    {
      icon: Facebook,
      label: "Facebook",
      value: sections.channels?.facebook,
      link: `https://${sections.channels?.facebook}`,
      color: "bg-blue-500",
    },
    {
      icon: Youtube,
      label: "YouTube",
      value: sections.channels?.youtube,
      link: `https://${sections.channels?.youtube}`,
      color: "bg-red-500",
    },
    {
      icon: Phone,
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
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 px-4 py-2 rounded-full mb-6">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="text-yellow-400 font-medium">Liên hệ với chúng tôi</span>
          </div>
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
              const Icon = channel.icon
              return (
                <Card
                  key={index}
                  className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all duration-300 group"
                >
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-12 h-12 ${channel.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-white mb-2">{channel.label}</h3>
                    <p className="text-gray-300 text-sm mb-4">{channel.value}</p>
                    <Button
                      asChild
                      size="sm"
                      className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black hover:from-yellow-500 hover:to-orange-500"
                    >
                      <a href={channel.link} target="_blank" rel="noopener noreferrer">
                        Liên hệ <ExternalLink className="w-4 h-4 ml-1" />
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
            <Card className="bg-gradient-to-br from-blue-900/30 to-blue-800/30 border-blue-700/50">
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
            <Card className="bg-gradient-to-br from-green-900/30 to-green-800/30 border-green-700/50">
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

            {/* Community */}
            <Card className="bg-gradient-to-br from-purple-900/30 to-purple-800/30 border-purple-700/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-400">
                  <Users className="w-5 h-5" />
                  {sections.users?.community?.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300">{sections.users?.community?.description}</p>
                <ul className="space-y-2">
                  {sections.users?.community?.benefits?.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-300">
                      <Star className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                      {benefit}
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
            <Card className="bg-gradient-to-br from-red-900/30 to-red-800/30 border-red-700/50">
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
                <Button asChild className="w-full bg-red-500 hover:bg-red-600">
                  <a href={`mailto:${sections.partners?.advertising?.contact}`}>Liên hệ quảng cáo</a>
                </Button>
              </CardContent>
            </Card>

            {/* Affiliate */}
            <Card className="bg-gradient-to-br from-yellow-900/30 to-yellow-800/30 border-yellow-700/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-yellow-400">
                  <TrendingUp className="w-5 h-5" />
                  {sections.partners?.affiliate?.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300">{sections.partners?.affiliate?.description}</p>

                <div>
                  <h4 className="font-semibold text-yellow-400 mb-2">Yêu cầu:</h4>
                  <ul className="space-y-1">
                    {sections.partners?.affiliate?.requirements?.map((req, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-300">
                        <CheckCircle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-yellow-400 mb-2">Lợi ích:</h4>
                  <ul className="space-y-1">
                    {sections.partners?.affiliate?.benefits?.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-300">
                        <Star className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button asChild className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">
                  <a href={`mailto:${sections.partners?.affiliate?.contact}`}>Đăng ký Affiliate</a>
                </Button>
              </CardContent>
            </Card>

            {/* Collaboration */}
            <Card className="bg-gradient-to-br from-indigo-900/30 to-indigo-800/30 border-indigo-700/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-indigo-400">
                  <Handshake className="w-5 h-5" />
                  {sections.partners?.collaboration?.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300">{sections.partners?.collaboration?.description}</p>
                <ul className="space-y-2">
                  {sections.partners?.collaboration?.opportunities?.map((opp, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-300">
                      <CheckCircle className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                      {opp}
                    </li>
                  ))}
                </ul>
                <Button asChild className="w-full bg-indigo-500 hover:bg-indigo-600">
                  <a href={`mailto:${sections.partners?.collaboration?.contact}`}>Hợp tác chiến lược</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Office Info */}
        <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <MapPin className="w-5 h-5 text-yellow-400" />
              {sections.office?.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-yellow-400 mt-1" />
                <div>
                  <h4 className="font-semibold text-white mb-1">Địa chỉ</h4>
                  <p className="text-gray-300">{sections.office?.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-yellow-400 mt-1" />
                <div>
                  <h4 className="font-semibold text-white mb-1">Giờ làm việc</h4>
                  <p className="text-gray-300">{sections.office?.hours}</p>
                </div>
              </div>
            </div>
            <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-lg p-4">
              <p className="text-yellow-400 font-medium mb-2">Lưu ý quan trọng:</p>
              <p className="text-gray-300 text-sm">{sections.office?.note}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
