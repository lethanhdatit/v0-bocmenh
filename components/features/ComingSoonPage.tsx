'use client';

import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Clock, Home, ArrowLeft, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface ComingSoonPageProps {
  title?: string;
  description?: string;
  estimatedLaunch?: string;
}

export function ComingSoonPage({ 
  title, 
  description, 
  estimatedLaunch 
}: ComingSoonPageProps) {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        
        {/* Animated icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 260, 
            damping: 20,
            duration: 1
          }}
          className="mb-8"
        >
          <div className="relative inline-block">
            <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
            {/* Pulsing rings */}
            <div className="absolute inset-0 rounded-full border-4 border-purple-400 animate-ping opacity-20"></div>
            <div className="absolute inset-2 rounded-full border-2 border-pink-400 animate-ping opacity-30 animation-delay-300"></div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl md:text-6xl font-bold text-white mb-6"
        >
          {title || t('common.comingSoon')}
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-xl text-gray-300 mb-8 leading-relaxed"
        >
          {description || t('comingSoon.description')}
        </motion.p>

        {/* Estimated launch */}
        {estimatedLaunch && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/20"
          >
            <Clock className="w-5 h-5 text-purple-300" />
            <span className="text-white font-medium">
              {t('comingSoon.estimatedLaunch')}: {estimatedLaunch}
            </span>
          </motion.div>
        )}

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          {/* Back button */}
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full text-white font-medium transition-all duration-300 hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5" />
            {t('common.goBack')}
          </button>

          {/* Home button */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-full text-white font-medium transition-all duration-300 hover:scale-105 shadow-lg"
          >
            <Home className="w-5 h-5" />
            {t('common.backToHome')}
          </Link>
        </motion.div>

        {/* Features preview */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-400 text-sm mb-4">
            {t('comingSoon.exploreOther')}
          </p>
          <Link
            href="/#features-section-container"
            className="text-purple-300 hover:text-purple-200 underline underline-offset-4 transition-colors"
          >
            {t('comingSoon.viewAllFeatures')}
          </Link>
        </motion.div>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
        </div>
      </div>
    </div>
  );
}
