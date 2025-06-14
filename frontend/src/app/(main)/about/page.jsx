"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import {
  Sparkles,
  Target,
  Award,
  ArrowRight,
  CheckCircle,
  Star,
  Zap,
  Heart,
  Globe,
  Rocket,
  Code,
  Building,
} from "lucide-react"
import { ClientParticlesBackground } from "@/components/ParticlesBackground"
import { ClientOnly } from "@/utils/clientUtils"

const AboutPage = () => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [-100, 100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  // Enhanced animation variants with sophisticated easing
  const fadeInUp = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  const cardVariant = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  const floatingAnimation = {
    y: [-10, 10, -10],
    transition: {
      duration: 6,
      ease: "easeInOut",
      repeat: Number.POSITIVE_INFINITY,
    },
  }

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 4,
      ease: "easeInOut",
      repeat: Number.POSITIVE_INFINITY,
    },
  }

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden"
    >
      {/* Replace random position animated elements with ClientParticlesBackground */}
      <ClientParticlesBackground
        particleCount={15}
        seed={456}
        particleClassName="bg-blue-400/30"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Enhanced Hero Section */}
        <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="text-center mb-32 relative">
          {/* Enhanced floating icon */}
          <motion.div
            className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8"
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >

          </motion.div>

          {/* Enhanced title with gradient text */}
          <motion.h1
            className="text-6xl md:text-8xl font-black mb-8 pt-16 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              About Our
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
              Platform
            </span>
          </motion.h1>

          {/* Enhanced subtitle */}
          <motion.div
            className="space-y-4 mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-2xl md:text-3xl text-gray-700 dark:text-gray-300 max-w-5xl mx-auto leading-relaxed font-semibold">
              Empowering students to showcase innovation and excellence across all disciplines.
            </p>
            <motion.p
              className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Building bridges between academic brilliance and industry opportunities.
              <span className="block mt-2 text-blue-600 dark:text-blue-400 font-semibold">
                ✨ Where innovation meets opportunity
              </span>
            </motion.p>
          </motion.div>

          {/* Enhanced floating statistics */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {[
              { number: "500+", label: "Student Projects", icon: Rocket, gradient: "from-blue-500 to-cyan-500" },
              { number: "50+", label: "Disciplines", icon: Globe, gradient: "from-purple-500 to-pink-500" },
              { number: "100+", label: "Industry Partners", icon: Building, gradient: "from-green-500 to-emerald-500" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="group relative"
                whileHover={{ scale: 1.05, y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Glow effect */}
                <div
                  className={`absolute -inset-1 bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500 rounded-2xl`}
                />

                <div className="relative flex flex-col items-center p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/20 overflow-hidden">
                  {/* Background pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: `radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 70%)`,
                      }}
                    />
                  </div>

                  <div className="relative z-10">
                    {/* Enhanced icon */}
                    <motion.div
                      className={`w-16 h-16 bg-gradient-to-r ${stat.gradient} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <stat.icon className="w-8 h-8 text-white" />
                    </motion.div>

                    {/* Enhanced number */}
                    <motion.div
                      className={`text-4xl md:text-5xl font-black mb-2 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 100,
                        delay: index * 0.1 + 0.8,
                      }}
                    >
                      {stat.number}
                    </motion.div>

                    <p className="text-gray-600 dark:text-gray-400 font-semibold text-lg">{stat.label}</p>

                    {/* Progress indicator */}
                    <motion.div
                      className="mt-4 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden w-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 + 1 }}
                    >
                      <motion.div
                        className={`h-full bg-gradient-to-r ${stat.gradient}`}
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{
                          duration: 1.5,
                          delay: index * 0.1 + 1.2,
                          ease: "easeOut",
                        }}
                      />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Enhanced Mission Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-40 items-center">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative"
          >
            {/* Floating decorative elements */}
            <motion.div
              className="absolute -top-6 -left-6 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-20"
              animate={pulseAnimation}
            />
            <motion.div
              className="absolute -bottom-6 -right-6 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-30"
              animate={floatingAnimation}
            />

            <div className="relative p-10 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl border border-white/30 dark:border-gray-700/30 shadow-2xl overflow-hidden">
              {/* Background gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/10 dark:to-purple-900/10" />

              <div className="relative z-10">
                {/* Enhanced header */}
                <div className="flex items-center mb-8">
                  <motion.div
                    className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mr-6 shadow-lg"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Target className="w-8 h-8 text-white" />
                  </motion.div>
                  <div>
                    <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                      Our Mission
                    </h2>
                    <motion.div
                      className="h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mt-2"
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                </div>

                {/* Enhanced content */}
                <div className="space-y-8">
                  <motion.p
                    className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                  >
                    We believe in empowering students with a dynamic platform to showcase their innovative projects,
                    fostering <span className="font-bold text-blue-600">creativity</span> and{" "}
                    <span className="font-bold text-purple-600">collaboration</span> within our academic ecosystem.
                  </motion.p>

                  <motion.p
                    className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                  >
                    Our mission extends beyond mere presentation—we're bridging the critical gap between{" "}
                    <span className="font-bold text-green-600">academic excellence</span> and{" "}
                    <span className="font-bold text-orange-600">real-world applications</span>, while creating
                    meaningful connections between talented students and industry leaders.
                  </motion.p>

                  {/* Enhanced tags */}
                  <motion.div
                    className="flex flex-wrap gap-3 mt-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                  >
                    {[
                      { tag: "Innovation", gradient: "from-blue-500 to-cyan-500" },
                      { tag: "Excellence", gradient: "from-purple-500 to-pink-500" },
                      { tag: "Collaboration", gradient: "from-green-500 to-emerald-500" },
                      { tag: "Growth", gradient: "from-orange-500 to-red-500" },
                    ].map((item, index) => (
                      <motion.span
                        key={item.tag}
                        className={`px-4 py-2 bg-gradient-to-r ${item.gradient} text-white rounded-full text-sm font-semibold shadow-lg`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 + 0.7, duration: 0.4 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05, y: -2 }}
                      >
                        {item.tag}
                      </motion.span>
                    ))}
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative group"
          >
            {/* Enhanced glow effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-3xl blur-2xl"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 4,
                ease: "easeInOut",
                repeat: Number.POSITIVE_INFINITY,
              }}
            />

            <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20">
              {/* Image overlay effects */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-purple-600/20 z-20"
                whileHover={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              />

              <motion.img
                src="./about1.jpg"
                alt="Students collaborating on innovative projects"
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              />              {/* Enhanced floating elements */}

              {/* Corner decorations */}
              <motion.div
                className="absolute top-4 left-4 w-4 h-4 bg-white/50 rounded-full"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              />
              <motion.div
                className="absolute bottom-4 right-4 w-6 h-6 bg-purple-400/50 rounded-full"
                animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, delay: 1.5 }}
              />
            </div>
          </motion.div>
        </div>

        {/* Enhanced Key Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="relative mb-40"
        >
          {/* Enhanced background decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-white/80 to-purple-50/80 dark:from-blue-900/20 dark:via-gray-800/80 dark:to-purple-900/20 rounded-3xl -z-10" />
          <div className="absolute inset-0 backdrop-blur-sm rounded-3xl -z-10" />

          <div className="relative p-12 md:p-20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl rounded-3xl border border-white/40 dark:border-gray-700/40 shadow-2xl overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fillOpacity='0.1'%3E%3Cpolygon points='50 0 60 40 100 50 60 60 50 100 40 60 0 50 40 40'/%3E%3C/g%3E%3C/svg%3E")`,
                }}
              />
            </div>

            {/* Enhanced section header */}
            <motion.div className="text-center mb-20">
              <motion.div
                className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-8 shadow-2xl relative"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <Award className="w-10 h-10 text-white" />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-lg opacity-50"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
              </motion.div>

              <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Key Features
                </span>
              </h2>

              <motion.p
                className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Discover what makes our platform the premier destination for student innovation
                <span className="block mt-2 text-lg text-blue-600 dark:text-blue-400 font-semibold">
                  🚀 Empowering the next generation of innovators
                </span>
              </motion.p>
            </motion.div>

            {/* Enhanced feature cards */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-10"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {[
                {
                  title: "Project Diversity",
                  icon: Code,
                  gradient: "from-blue-500 to-cyan-500",
                  bgGradient: "from-blue-50 to-cyan-50",
                  darkBgGradient: "from-blue-900/20 to-cyan-900/20",
                  description:
                    "Featuring groundbreaking projects from engineering, computer science, arts, business, and emerging interdisciplinary fields.",
                  features: ["Cross-disciplinary Innovation", "Emerging Technologies", "Creative Solutions"],
                },
                {
                  title: "Industry Connection",
                  icon: Building,
                  gradient: "from-purple-500 to-pink-500",
                  bgGradient: "from-purple-50 to-pink-50",
                  darkBgGradient: "from-purple-900/20 to-pink-900/20",
                  description:
                    "Creating meaningful opportunities for students to connect with industry leaders, potential employers, and venture capitalists.",
                  features: ["Mentorship Programs", "Career Opportunities", "Investment Connections"],
                },
                {
                  title: "Innovation Support",
                  icon: Rocket,
                  gradient: "from-green-500 to-blue-500",
                  bgGradient: "from-green-50 to-blue-50",
                  darkBgGradient: "from-green-900/20 to-blue-900/20",
                  description:
                    "Providing comprehensive resources, expert mentorship, and funding guidance to transform innovative ideas into reality.",
                  features: ["Expert Guidance", "Resource Access", "Funding Support"],
                },
              ].map((feature, index) => (
                <motion.div key={index} className="group relative" variants={cardVariant}>
                  {/* Enhanced glow effect */}
                  <div
                    className={`absolute -inset-1 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500 rounded-3xl`}
                  />

                  {/* Enhanced card */}
                  <motion.div
                    className={`relative h-full p-8 bg-gradient-to-br ${feature.bgGradient} dark:${feature.darkBgGradient} backdrop-blur-xl rounded-3xl border border-white/40 dark:border-gray-700/40 shadow-xl overflow-hidden`}
                    whileHover={{ y: -12 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-5">
                      <div
                        className="absolute inset-0"
                        style={{
                          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 70%)`,
                        }}
                      />
                    </div>

                    {/* Hover gradient background */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileHover={{ scale: 1, opacity: 0.1 }}
                    />

                    <div className="relative z-10">
                      {/* Enhanced icon container */}
                      <motion.div
                        className={`bg-gradient-to-r ${feature.gradient} rounded-2xl w-20 h-20 flex items-center justify-center mb-6 shadow-lg relative overflow-hidden`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                        <feature.icon className="h-10 w-10 text-white relative z-10" />

                        {/* Sparkle effects */}
                        <motion.div
                          className="absolute top-1 right-1 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100"
                          animate={{
                            scale: [0, 1, 0],
                            opacity: [0, 1, 0],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: index * 0.2,
                          }}
                        />
                      </motion.div>

                      <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {feature.title}
                      </h3>

                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg mb-6">
                        {feature.description}
                      </p>

                      {/* Enhanced feature list */}
                      <div className="space-y-3 mb-6">
                        {feature.features.map((item, idx) => (
                          <motion.div
                            key={idx}
                            className="flex items-center text-sm text-gray-600 dark:text-gray-400"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1, duration: 0.4 }}
                            viewport={{ once: true }}
                          >
                            <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                            <span className="font-medium">{item}</span>
                          </motion.div>
                        ))}
                      </div>

                      {/* Learn more link */}
                      <motion.div
                        className="flex items-center text-blue-600 dark:text-blue-400 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        whileHover={{ x: 5 }}
                      >
                        <span className="mr-2">Learn more</span>
                        <ArrowRight className="h-4 w-4" />
                      </motion.div>
                    </div>

                    {/* Enhanced bottom accent line */}
                    <motion.div
                      className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${feature.gradient} w-0 group-hover:w-full transition-all duration-700`}
                    />

                    {/* Corner decoration */}
                    <div
                      className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${feature.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
                    />

                    {/* Floating elements */}
                    <motion.div
                      className="absolute top-4 right-4 w-2 h-2 bg-blue-400/50 rounded-full opacity-0 group-hover:opacity-100"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        ease: "easeInOut",
                        repeat: Number.POSITIVE_INFINITY,
                        delay: index * 0.3,
                      }}
                    />
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Enhanced Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-40"
        >
          {/* Enhanced section header */}
          <motion.div className="text-center mb-20">            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl mb-8 shadow-2xl relative"
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl blur-lg opacity-50"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
            </motion.div>

            <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
                Meet Our Team
              </span>
            </h2>

            <motion.p
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Passionate educators and industry experts dedicated to nurturing student innovation
              <span className="block mt-2 text-lg text-purple-600 dark:text-purple-400 font-semibold">
                👥 Building the future together
              </span>
            </motion.p>
          </motion.div>

          {/* Enhanced team grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {[              {
                name: "Dr. Jane Smith",
                role: "Faculty Advisor",
                image: "/faculty1.jpg",
                expertise: "AI & Machine Learning",
                gradient: "from-blue-500 to-purple-600",
                bgGradient: "from-blue-50 to-purple-50",
                darkBgGradient: "from-blue-900/20 to-purple-900/20",
              },
              {
                name: "Prof. John Davis",
                role: "Technology Mentor",
                image: "/faculty2.jpg",
                expertise: "Software Engineering",
                gradient: "from-green-500 to-blue-500",
                bgGradient: "from-green-50 to-blue-50",
                darkBgGradient: "from-green-900/20 to-blue-900/20",
              },
              {
                name: "Princi Mishra",
                role: "Student Coordinator",
                image: "/student.jpg",
                expertise: "Project Management",
                gradient: "from-purple-500 to-pink-500",
                bgGradient: "from-purple-50 to-pink-50",
                darkBgGradient: "from-purple-900/20 to-pink-900/20",
              },
              {
                name: "Michael Chen",
                role: "Industry Liaison",
                image: "/faculty3.jpg",
                expertise: "Business Strategy",
                gradient: "from-orange-500 to-red-500",
                bgGradient: "from-orange-50 to-red-50",
                darkBgGradient: "from-orange-900/20 to-red-900/20",
              },
            ].map((member, index) => (
              <motion.div key={index} className="group relative" variants={cardVariant}>
                {/* Enhanced glow effect */}
                <div
                  className={`absolute -inset-1 bg-gradient-to-r ${member.gradient} opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500 rounded-3xl`}
                />

                <motion.div
                  className={`relative p-8 bg-gradient-to-br ${member.bgGradient} dark:${member.darkBgGradient} backdrop-blur-xl rounded-3xl border border-white/40 dark:border-gray-700/40 shadow-xl text-center overflow-hidden`}
                  whileHover={{ y: -12 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {/* Background pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: `radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 70%)`,
                      }}
                    />
                  </div>

                  {/* Hover gradient background */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${member.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 0.1 }}
                  />

                  <div className="relative z-10">
                    {/* Enhanced profile image container */}
                    <motion.div
                      className="relative w-28 h-28 mx-auto mb-6"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div
                        className={`absolute inset-0 bg-gradient-to-r ${member.gradient} rounded-full p-1 shadow-lg`}
                      >
                        <div className="w-full h-full bg-white dark:bg-gray-800 rounded-full overflow-hidden">
                          <img
                            src={member.image || "/placeholder.svg"}
                            alt={`${member.name} - ${member.role}`}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                      </div>

                      {/* Enhanced online indicator */}
                      <motion.div
                        className="absolute bottom-2 right-2 w-6 h-6 bg-green-400 rounded-full border-3 border-white shadow-lg flex items-center justify-center"
                        animate={pulseAnimation}
                      >
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </motion.div>

                      {/* Floating sparkles */}
                      <motion.div
                        className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100"
                        animate={{
                          scale: [1, 1.3, 1],
                          rotate: [0, 180, 360],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: index * 0.2,
                        }}
                      />
                    </motion.div>

                    {/* Enhanced member info */}
                    <motion.h3
                      className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {member.name}
                    </motion.h3>

                    <p
                      className={`text-transparent bg-gradient-to-r ${member.gradient} bg-clip-text font-semibold mb-2`}
                    >
                      {member.role}
                    </p>

                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 font-medium">{member.expertise}</p>

                    {/* Enhanced social/contact buttons */}
                    <motion.div
                      className="flex justify-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ y: 10 }}
                      whileInView={{ y: 0 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                    >
                      <motion.button
                        className="w-10 h-10 bg-white/80 dark:bg-gray-700/80 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-full flex items-center justify-center transition-colors shadow-lg"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Heart className="w-4 h-4 text-blue-600" />
                      </motion.button>

                      <motion.button
                        className="w-10 h-10 bg-white/80 dark:bg-gray-700/80 hover:bg-purple-100 dark:hover:bg-purple-900/50 rounded-full flex items-center justify-center transition-colors shadow-lg"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Star className="w-4 h-4 text-purple-600" />
                      </motion.button>
                    </motion.div>
                  </div>

                  {/* Decorative elements */}
                  <motion.div
                    className="absolute top-4 right-4 w-2 h-2 bg-yellow-400/50 rounded-full opacity-0 group-hover:opacity-100"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      ease: "easeInOut",
                      repeat: Number.POSITIVE_INFINITY,
                      delay: index * 0.2,
                    }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Enhanced Get Involved Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="relative"
        >
          {/* Enhanced animated background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl opacity-95" />
          <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent rounded-3xl" />

          {/* Enhanced background pattern */}
          <div
            className="absolute inset-0 opacity-10 rounded-3xl"
      
          />

          <div className="relative p-16 md:p-20 text-center text-white overflow-hidden">
            {/* Enhanced floating orbs */}
            <motion.div
              className="absolute top-8 left-8 w-20 h-20 bg-white/20 rounded-full blur-xl"
              animate={floatingAnimation}
            />
            <motion.div
              className="absolute bottom-8 right-8 w-24 h-24 bg-purple-300/20 rounded-full blur-xl"
              animate={{
                y: [15, -15, 15],
                x: [-5, 5, -5],
                transition: {
                  duration: 7,
                  ease: "easeInOut",
                  repeat: Number.POSITIVE_INFINITY,
                },
              }}
            />
            <motion.div
              className="absolute top-1/2 left-1/4 w-16 h-16 bg-cyan-300/20 rounded-full blur-xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.7, 0.3],
                transition: {
                  duration: 5,
                  ease: "easeInOut",
                  repeat: Number.POSITIVE_INFINITY,
                },
              }}
            />

            {/* Enhanced icon */}
            <motion.div
              className="inline-flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl mb-10 shadow-2xl relative"
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <Zap className="w-12 h-12 text-white" />
              <motion.div
                className="absolute inset-0 bg-white/20 rounded-2xl blur-lg"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
            </motion.div>

            {/* Enhanced title */}
            <motion.h2
              className="text-5xl md:text-7xl font-black mb-8 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent">
                Ready to Get
              </span>
              <br />
              <span className="bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 bg-clip-text text-transparent">
                Involved?
              </span>
            </motion.h2>

            {/* Enhanced description */}
            <motion.p
              className="text-xl md:text-2xl text-white/90 max-w-5xl mx-auto mb-16 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Whether you're a visionary student, dedicated educator, or industry innovator, our platform offers endless
              opportunities to make an impact.
              <span className="block mt-3 text-lg text-cyan-300 font-semibold">
                🚀 Join the innovation revolution today!
              </span>
            </motion.p>

            {/* Enhanced CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-8 mb-16"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <motion.button
                className="group relative px-10 py-5 bg-white text-blue-600 font-black rounded-2xl shadow-2xl overflow-hidden transition-all duration-300"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 25px 50px rgba(255,255,255,0.4)",
                  y: -5,
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative flex items-center justify-center text-xl">
                  <Sparkles className="mr-3 w-6 h-6" />
                  Submit Your Project
                  <motion.div
                    className="ml-3"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <ArrowRight className="w-6 h-6" />
                  </motion.div>
                </span>
              </motion.button>

              <motion.button
                className="group relative px-10 py-5 bg-white/10 backdrop-blur-md text-white font-black rounded-2xl border-2 border-white/40 overflow-hidden transition-all duration-300"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(255,255,255,0.2)",
                  y: -5,
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative flex items-center justify-center text-xl">
                  <Heart className="mr-3 w-6 h-6" />
                  Become a Mentor
                  <motion.div
                    className="ml-3"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <Star className="w-5 h-5" />
                  </motion.div>
                </span>
              </motion.button>
            </motion.div>

            {/* Enhanced social proof indicators */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >              {[
                { icon: Star, text: "500+ Projects Showcased", color: "from-yellow-400 to-orange-400" },
                { icon: Building, text: "50+ Industry Partners", color: "from-green-400 to-emerald-400" },
                { icon: Award, text: "95% Success Rate", color: "from-purple-400 to-pink-400" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center justify-center space-x-3 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20"
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className={`p-2 bg-gradient-to-r ${item.color} rounded-full`}
                    animate={{ rotate: [0, 360] }}
                    transition={{
                      duration: 8,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                      delay: index * 0.5,
                    }}
                  >
                    <item.icon className="h-5 w-5 text-white" />
                  </motion.div>
                  <span className="text-white/90 font-semibold">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AboutPage
