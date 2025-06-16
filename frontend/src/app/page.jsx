"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import {
  Search,
  ArrowRight,
  Code,
  Users,
  Award,
  Github,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Facebook,
  Instagram,
  Twitter,
  Sparkles,
  Zap,
  Star,
  TrendingUp,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Image from "next/image";

// Featured projects data (replace with actual data)
const featuredProjects = [
  {
    id: 1,
    title: "AI Image Recognition System",
    department: "Computer Science",
    image:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    description:
      "A cutting-edge image recognition system using deep learning algorithms.",
    tags: ["AI", "Machine Learning", "Python"],
    likes: 234,
    views: 1520,
  },
  {
    id: 2,
    title: "Sustainable Architecture Design",
    department: "Architecture",
    image:
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    description:
      "Eco-friendly building designs that minimize environmental impact.",
    tags: ["Sustainability", "Design", "Green Tech"],
    likes: 189,
    views: 987,
  },
  {
    id: 3,
    title: "Renewable Energy Generator",
    department: "Electrical Engineering",
    image:
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    description: "Innovative power generation using renewable energy sources.",
    tags: ["Energy", "Innovation", "Engineering"],
    likes: 312,
    views: 2100,
  },
];

// Testimonials data
const testimonials = [
  {
    id: 1,
    name: "Prof. Sarah Johnson",
    role: "Department Head, Computer Science",
    image: "https://randomuser.me/api/portraits/women/32.jpg",
    quote:
      "This platform has transformed how we showcase student work. The visibility has led to industry partnerships we never expected!",
    rating: 5,
  },
  {
    id: 2,
    name: "James Wilson",
    role: "Senior Student, Mechanical Engineering",
    image: "https://randomuser.me/api/portraits/men/41.jpg",
    quote:
      "My capstone project received feedback from industry professionals that helped me refine it. I've even received job offers because of it!",
    rating: 5,
  },
  {
    id: 3,
    name: "Dr. Michelle Lee",
    role: "Research Advisor, Biotechnology",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    quote:
      "The platform makes collaboration between departments seamless. We've seen interdisciplinary projects flourish as a result.",
    rating: 5,
  },
];

// Hero carousel images
const heroImages = [
  {
    src: "https://www.prince2.com/blog/wp-content/uploads/2024/09/The-power-of-collaboration-blog-banner.jpg",
    title: "Showcase Your Academic Excellence",
    subtitle:
      "A platform for students to share their innovative projects with the world",
    accent: "from-blue-500 to-cyan-500",
  },
  {
    src: "https://www.morebusiness.com/wp-content/uploads/2021/04/improve-teamwork.jpg",
    title: "Connect With Industry Partners",
    subtitle:
      "Bridge the gap between academic projects and industry opportunities",
    accent: "from-purple-500 to-pink-500",
  },
  {
    src: "https://collegesofdistinction.com/wp-content/uploads/2019/06/1128112933113453.LVVrWgawQhwXvV1QyjtF_height640.png",
    title: "Collaborate Across Disciplines",
    subtitle:
      "Discover interdisciplinary projects and connect with peers from other departments",
    accent: "from-emerald-500 to-teal-500",
  },
];

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const floatingAnimation = {
  y: [-10, 10],
  transition: {
    duration: 2,
    repeat: Number.POSITIVE_INFINITY,
    repeatType: "reverse",
    ease: "easeInOut",
  },
};

const pulseAnimation = {
  scale: [1, 1.05, 1],
  transition: {
    duration: 2,
    repeat: Number.POSITIVE_INFINITY,
    ease: "easeInOut",
  },
};

const Section = ({ children, className }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeIn}
      className={className}
    >
      {children}
    </motion.section>
  );
};

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [statisticsParticles, setStatisticsParticles] = useState([]);
  const [ctaParticles, setCtaParticles] = useState([]);
  const totalSlides = heroImages.length;

  // Initialize client-side only values
  useEffect(() => {
    setIsClient(true);

    // Generate particle positions for statistics section (6 particles)
    setStatisticsParticles(
      Array.from({ length: 6 }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 3 + Math.random() * 2,
      }))
    );

    // Generate particle positions for CTA section (12 particles)
    setCtaParticles(
      Array.from({ length: 12 }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 3,
        duration: 4 + Math.random() * 3,
      }))
    );
  }, []);
  // Handle carousel navigation
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Autoplay functionality
  useEffect(() => {
    let interval;
    if (isAutoplay) {
      interval = setInterval(nextSlide, 5000);
    }

    return () => clearInterval(interval);
  }, [isAutoplay, currentSlide, nextSlide]);

  // Pause autoplay on hover
  const handleMouseEnter = () => setIsAutoplay(false);
  const handleMouseLeave = () => setIsAutoplay(true);

  return (
    <>
      <Navbar />
      <div className="w-full overflow-x-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
        {/* Hero Section with Carousel */}
        <div
          className="relative w-full h-screen min-h-[600px] overflow-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="absolute inset-0"
            >
              <div
                className="w-full h-full bg-cover bg-center relative"
                style={{
                  backgroundImage: `url('${heroImages[currentSlide].src}')`,
                }}
              >
                {/* Enhanced gradient overlay with mesh pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/60 to-black/30">
                  {/* Animated mesh background */}
                  <div className="absolute inset-0 opacity-10">
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.2) 0%, transparent 50%), 
                                     radial-gradient(circle at 75% 75%, rgba(59,130,246,0.3) 0%, transparent 50%),
                                     radial-gradient(circle at 75% 25%, rgba(168,85,247,0.2) 0%, transparent 50%),
                                     radial-gradient(circle at 25% 75%, rgba(34,197,94,0.2) 0%, transparent 50%)`,
                      }}
                    />
                  </div>

                  <div className="container mx-auto h-full flex flex-col justify-center px-6 md:px-12 lg:px-24 relative z-10">
                    <motion.div
                      initial={{ opacity: 0, y: 60, x: -30 }}
                      animate={{ opacity: 1, y: 0, x: 0 }}
                      transition={{
                        duration: 1,
                        delay: 0.4,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                      className="max-w-5xl"
                    >
                      {/* Enhanced badge with glow effect */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="inline-block relative mb-8"
                      >
                        <div
                          className={`absolute inset-0 bg-gradient-to-r ${heroImages[currentSlide].accent} blur-xl opacity-30 rounded-full`}
                        />
                        <div
                          className={`relative px-6 py-3 bg-gradient-to-r ${heroImages[currentSlide].accent} bg-opacity-20 backdrop-blur-md border border-white/30 rounded-full flex items-center space-x-2`}
                        >
                          <Sparkles className="w-4 h-4 text-white" />
                          <span className="text-white font-semibold text-sm">
                            Welcome to the Future of Academic Showcase
                          </span>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 3,
                              repeat: Number.POSITIVE_INFINITY,
                              ease: "linear",
                            }}
                          >
                            <Star className="w-4 h-4 text-yellow-300" />
                          </motion.div>
                        </div>
                      </motion.div>

                      {/* Enhanced title with text effects */}
                      <motion.h1
                        className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white mb-8 leading-tight"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                      >
                        <span className="relative">
                          <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent">
                            {heroImages[currentSlide].title}
                          </span>
                          {/* Animated underline */}
                          <motion.div
                            className={`absolute -bottom-2 left-0 h-2 bg-gradient-to-r ${heroImages[currentSlide].accent} rounded-full`}
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 1.5, delay: 1.2 }}
                          />
                        </span>
                      </motion.h1>

                      {/* Enhanced subtitle */}
                      <motion.p
                        className="text-xl md:text-2xl lg:text-3xl text-gray-200 mb-12 max-w-4xl leading-relaxed"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.9 }}
                      >
                        <span className="relative">
                          {heroImages[currentSlide].subtitle}
                        </span>
                      </motion.p>

                      {/* Enhanced CTA buttons */}
                      <motion.div
                        className="flex flex-col sm:flex-row gap-6"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.1 }}
                      >
                        <Link href="/browse-project">
                          <motion.button
                            whileHover={{
                              scale: 1.05,
                              boxShadow: "0 25px 50px rgba(59, 130, 246, 0.5)",
                              y: -3,
                            }}
                            whileTap={{ scale: 0.95 }}
                            className={`group relative px-10 py-5 bg-gradient-to-r ${heroImages[currentSlide].accent} text-white font-bold rounded-2xl overflow-hidden shadow-2xl`}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="relative flex items-center">
                              <Search className="h-6 w-6 mr-3 transition-transform group-hover:scale-110" />
                              <span className="text-lg">Browse Projects</span>
                              <motion.div
                                className="ml-3"
                                animate={{ x: [0, 5, 0] }}
                                transition={{
                                  duration: 1.5,
                                  repeat: Number.POSITIVE_INFINITY,
                                }}
                              >
                                <ArrowRight className="h-6 w-6" />
                              </motion.div>
                            </div>
                          </motion.button>
                        </Link>

                        <Link href="/signup">
                          <motion.button
                            whileHover={{
                              scale: 1.05,
                              backgroundColor: "rgba(255, 255, 255, 0.2)",
                              y: -3,
                            }}
                            whileTap={{ scale: 0.95 }}
                            className="group relative px-10 py-5 bg-white/10 backdrop-blur-md text-white font-bold rounded-2xl border-2 border-white/40 hover:border-white/60 overflow-hidden transition-all duration-300"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="relative flex items-center">
                              <Zap className="h-6 w-6 mr-3 transition-transform group-hover:scale-110" />
                              <span className="text-lg">Join Now</span>
                              <motion.div
                                className="ml-3"
                                animate={{ rotate: [0, 360] }}
                                transition={{
                                  duration: 2,
                                  repeat: Number.POSITIVE_INFINITY,
                                  ease: "linear",
                                }}
                              >
                                <Sparkles className="h-5 w-5" />
                              </motion.div>
                            </div>
                          </motion.button>
                        </Link>
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Enhanced floating elements */}
                  <motion.div
                    className="absolute top-20 right-20 w-24 h-24 bg-gradient-to-br from-blue-400/30 to-indigo-500/30 rounded-full backdrop-blur-sm hidden lg:block border border-white/20"
                    animate={floatingAnimation}
                  >
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-white/20 to-transparent" />
                  </motion.div>

                  <motion.div
                    className="absolute bottom-32 right-32 w-20 h-20 bg-gradient-to-br from-purple-400/30 to-pink-500/30 rounded-full backdrop-blur-sm hidden lg:block border border-white/20"
                    animate={{
                      y: [10, -10],
                      rotate: [0, 180, 360],
                      transition: {
                        duration: 4,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                        ease: "easeInOut",
                      },
                    }}
                  >
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-white/20 to-transparent" />
                  </motion.div>

                  <motion.div
                    className="absolute top-1/2 left-20 w-16 h-16 bg-gradient-to-br from-emerald-400/30 to-teal-500/30 rounded-full backdrop-blur-sm hidden lg:block border border-white/20"
                    animate={pulseAnimation}
                  >
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-white/20 to-transparent" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Enhanced carousel navigation */}
          <motion.button
            className="absolute left-6 top-1/2 -translate-y-1/2 text-white bg-black/40 hover:bg-black/60 p-4 rounded-full z-20 transition-all backdrop-blur-md border border-white/20"
            onClick={prevSlide}
            whileHover={{ scale: 1.1, x: -2 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft size={28} />
          </motion.button>

          <motion.button
            className="absolute right-6 top-1/2 -translate-y-1/2 text-white bg-black/40 hover:bg-black/60 p-4 rounded-full z-20 transition-all backdrop-blur-md border border-white/20"
            onClick={nextSlide}
            whileHover={{ scale: 1.1, x: 2 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight size={28} />
          </motion.button>

          {/* Enhanced slide indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
            {heroImages.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`relative h-4 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? "bg-white w-12 shadow-lg"
                    : "bg-white/50 hover:bg-white/80 w-4"
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                {currentSlide === index && (
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r ${heroImages[currentSlide].accent} rounded-full opacity-50`}
                    layoutId="activeIndicator"
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <Section className="py-32 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
          {/* Enhanced background decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-blue-100/30 to-indigo-100/30 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 20,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
            <motion.div
              className="absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-gradient-to-tr from-purple-100/30 to-pink-100/30 rounded-full blur-3xl"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.2, 0.5, 0.2],
                rotate: [360, 180, 0],
              }}
              transition={{
                duration: 25,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />

            {/* Grid pattern overlay */}
            <div className="absolute inset-0 opacity-5">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%239C92AC' fillOpacity='0.3'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
              />
            </div>
          </div>

          <div className="container mx-auto px-6 md:px-12 relative z-10">
            <motion.div
              className="text-center mb-24"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Enhanced section badge */}
              <motion.div
                className="inline-block relative mb-8"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 blur-xl rounded-full" />
                <div className="relative px-6 py-3 bg-gradient-to-r from-blue-100/80 to-indigo-100/80 dark:from-blue-900/30 dark:to-indigo-900/30 backdrop-blur-sm border border-blue-200/50 dark:border-blue-700/50 rounded-full flex items-center space-x-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                  >
                    <Zap className="w-4 h-4 text-blue-600" />
                  </motion.div>
                  <span className="text-blue-700 dark:text-blue-300 font-semibold text-sm">
                    Platform Features
                  </span>
                  <Sparkles className="w-4 h-4 text-blue-600" />
                </div>
              </motion.div>

              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight">
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Why Showcase Your
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
                  Projects Here?
                </span>
              </h2>

              <motion.p
                className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-5xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Our platform provides the perfect opportunity to highlight your
                academic achievements and connect with industry professionals
                worldwide.
                <span className="text-blue-600 font-semibold">
                  {" "}
                  Join the future of academic collaboration.
                </span>
              </motion.p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
            >
              {[
                {
                  icon: <Code className="h-12 w-12" />,
                  title: "Showcase Your Work",
                  description:
                    "Create stunning portfolios with rich media, detailed documentation, and interactive demonstrations that bring your projects to life.",
                  gradient: "from-blue-500 to-cyan-500",
                  bgGradient: "from-blue-50 to-cyan-50",
                  darkBgGradient: "from-blue-900/20 to-cyan-900/20",
                },
                {
                  icon: <Users className="h-12 w-12" />,
                  title: "Connect with Peers",
                  description:
                    "Build meaningful relationships with students across departments and collaborate on interdisciplinary innovations.",
                  gradient: "from-indigo-500 to-purple-500",
                  bgGradient: "from-indigo-50 to-purple-50",
                  darkBgGradient: "from-indigo-900/20 to-purple-900/20",
                },
                {
                  icon: <Award className="h-12 w-12" />,
                  title: "Gain Recognition",
                  description:
                    "Get noticed by faculty, industry leaders, and potential employers through our curated showcase platform.",
                  gradient: "from-purple-500 to-pink-500",
                  bgGradient: "from-purple-50 to-pink-50",
                  darkBgGradient: "from-purple-900/20 to-pink-900/20",
                },
                {
                  icon: <Github className="h-12 w-12" />,
                  title: "Share Resources",
                  description:
                    "Link to repositories, research papers, and external resources to provide complete project context.",
                  gradient: "from-gray-600 to-gray-800",
                  bgGradient: "from-gray-50 to-slate-50",
                  darkBgGradient: "from-gray-900/20 to-slate-900/20",
                },
                {
                  icon: <BookOpen className="h-12 w-12" />,
                  title: "Document Progress",
                  description:
                    "Maintain a comprehensive record of your academic journey and track your skill development over time.",
                  gradient: "from-green-500 to-emerald-500",
                  bgGradient: "from-green-50 to-emerald-50",
                  darkBgGradient: "from-green-900/20 to-emerald-900/20",
                },
                {
                  icon: <Search className="h-12 w-12" />,
                  title: "Discover Innovations",
                  description:
                    "Explore cutting-edge projects from every department to spark inspiration for your next breakthrough.",
                  gradient: "from-orange-500 to-red-500",
                  bgGradient: "from-orange-50 to-red-50",
                  darkBgGradient: "from-orange-900/20 to-red-900/20",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  whileHover={{
                    y: -12,
                    transition: { duration: 0.3 },
                  }}
                  className={`group relative bg-gradient-to-br ${feature.bgGradient} dark:${feature.darkBgGradient} backdrop-blur-xl p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all border border-white/40 dark:border-gray-700/40 overflow-hidden`}
                >
                  {/* Animated background gradient */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 0.1 }}
                  />

                  {/* Glow effect */}
                  <div
                    className={`absolute -inset-1 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 rounded-3xl`}
                  />

                  <div className="relative z-10">
                    {/* Enhanced icon container */}
                    <motion.div
                      className={`bg-gradient-to-br ${feature.gradient} rounded-2xl w-20 h-20 flex items-center justify-center mb-6 shadow-lg relative overflow-hidden`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                      {React.cloneElement(feature.icon, {
                        className: "h-10 w-10 text-white relative z-10",
                      })}

                      {/* Sparkle effect */}
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

                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg mb-4">
                      {feature.description}
                    </p>

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
                    className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl ${feature.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </Section>

        {/* Statistics Section */}
        <Section className="py-24 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 relative overflow-hidden">
          {/* Enhanced background effects */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-black/30 to-transparent" />

            {/* Animated geometric shapes */}
            <motion.div
              className="absolute top-10 left-10 w-32 h-32 border-2 border-white/20 rounded-full"
              animate={{ rotate: 360 }}
              transition={{
                duration: 20,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
            <motion.div
              className="absolute bottom-10 right-10 w-24 h-24 border-2 border-white/20 rotate-45"
              animate={{ rotate: 405 }}
              transition={{
                duration: 15,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />

            {/* Client-side only floating particles */}
            {isClient &&
              statisticsParticles.map((particle, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-white/30 rounded-full"
                  style={{
                    left: `${particle.left}%`,
                    top: `${particle.top}%`,
                  }}
                  animate={{
                    y: [-20, 20],
                    opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{
                    duration: particle.duration,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    delay: particle.delay,
                  }}
                />
              ))}
          </div>

          <div className="container mx-auto px-6 md:px-12 relative z-10">
            <motion.div
              className="text-center mb-20"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="inline-block px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <span className="text-white font-semibold text-sm flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Platform Impact
                  <Sparkles className="w-4 h-4 ml-2" />
                </span>
              </motion.div>

              <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
                Making a Real
                <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  Difference
                </span>
              </h2>

              <p className="text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
                See how our platform is transforming academic collaboration and
                project visibility across universities worldwide
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {[
                {
                  number: "2,500+",
                  label: "Projects Showcased",
                  icon: "📚",
                  color: "from-blue-400 to-cyan-400",
                },
                {
                  number: "15,000+",
                  label: "Student Participants",
                  icon: "👨‍🎓",
                  color: "from-purple-400 to-pink-400",
                },
                {
                  number: "500+",
                  label: "Industry Connections",
                  icon: "🤝",
                  color: "from-green-400 to-emerald-400",
                },
                {
                  number: "98%",
                  label: "Satisfaction Rate",
                  icon: "⭐",
                  color: "from-yellow-400 to-orange-400",
                },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  whileHover={{ scale: 1.05, y: -8 }}
                  className="relative group"
                >
                  {/* Glow effect */}
                  <div
                    className={`absolute -inset-1 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500 rounded-2xl`}
                  />

                  <div className="relative text-center bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-all overflow-hidden">
                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-5">
                      <div
                        className="absolute inset-0"
                        style={{
                          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 70%)`,
                        }}
                      />
                    </div>

                    <div className="relative z-10">
                      {/* Enhanced icon */}
                      <motion.div
                        className="text-5xl mb-6 relative"
                        animate={{
                          scale: [1, 1.2, 1],
                          rotate: [0, 5, -5, 0],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: index * 0.3,
                        }}
                      >
                        <span className="relative z-10">{stat.icon}</span>
                        <motion.div
                          className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-20 blur-lg rounded-full`}
                          animate={{ scale: [0.8, 1.2, 0.8] }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: index * 0.2,
                          }}
                        />
                      </motion.div>

                      {/* Enhanced number */}
                      <motion.div
                        className={`text-5xl md:text-6xl font-black mb-3 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 100,
                          delay: index * 0.1 + 0.5,
                        }}
                      >
                        {stat.number}
                      </motion.div>

                      <p className="text-blue-100 font-semibold text-lg">
                        {stat.label}
                      </p>

                      {/* Progress bar */}
                      <motion.div
                        className="mt-4 h-1 bg-white/20 rounded-full overflow-hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 + 1 }}
                      >
                        <motion.div
                          className={`h-full bg-gradient-to-r ${stat.color}`}
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
          </div>
        </Section>

        {/* Featured Projects Section */}
        <Section className="py-32 bg-white dark:bg-gray-800 relative overflow-hidden">
          {/* Enhanced background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fillOpacity='0.1'%3E%3Cpolygon points='50 0 60 40 100 50 60 60 50 100 40 60 0 50 40 40'/%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </div>

          <div className="container mx-auto px-6 md:px-12 relative z-10">
            <motion.div
              className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-20"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="mb-8 lg:mb-0">
                {/* Enhanced section badge */}
                <motion.div
                  className="inline-block relative mb-8"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 blur-xl rounded-full" />
                  <div className="relative px-6 py-3 bg-gradient-to-r from-blue-100/80 to-indigo-100/80 dark:from-blue-900/30 dark:to-indigo-900/30 backdrop-blur-sm border border-blue-200/50 dark:border-blue-700/50 rounded-full flex items-center space-x-2">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    >
                      <Star className="w-4 h-4 text-blue-600 fill-current" />
                    </motion.div>
                    <span className="text-blue-700 dark:text-blue-300 font-semibold text-sm">
                      Featured Work
                    </span>
                    <Sparkles className="w-4 h-4 text-blue-600" />
                  </div>
                </motion.div>

                <h2 className="text-5xl md:text-6xl font-black mb-8 leading-tight">
                  <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Outstanding Student
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
                    Projects
                  </span>
                </h2>

                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">
                  Discover innovative solutions and creative implementations
                  from our talented students across various departments.
                  <span className="block mt-2 text-blue-600 font-semibold">
                    Innovation meets excellence.
                  </span>
                </p>
              </div>

              <Link href="/browse-project">
                <motion.button
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="hidden lg:flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="mr-3 relative z-10">View All Projects</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                    className="relative z-10"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </motion.div>
                </motion.button>
              </Link>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
            >
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  variants={scaleIn}
                  whileHover={{ y: -12 }}
                  className="group bg-white dark:bg-gray-800 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 overflow-hidden relative"
                >
                  {/* Glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 rounded-3xl" />

                  <div className="relative">
                    {/* Enhanced image container */}
                    <div className="relative h-64 overflow-hidden">
                      <motion.img
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.7 }}
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />

                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Department badge */}
                      <motion.div
                        className="absolute top-4 right-4 px-3 py-1 bg-blue-600/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full opacity-0 group-hover:opacity-100 border border-white/20"
                        initial={{ y: -10, opacity: 0 }}
                        whileHover={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {project.department}
                      </motion.div>

                      {/* Stats overlay */}
                      <motion.div
                        className="absolute bottom-4 left-4 flex space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={{ y: 10, opacity: 0 }}
                        whileHover={{ y: 0, opacity: 1 }}
                      >
                        <div className="flex items-center space-x-1 px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs">
                          <span>❤️</span>
                          <span>{project.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1 px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs">
                          <span>👁️</span>
                          <span>{project.views}</span>
                        </div>
                      </motion.div>
                    </div>

                    {/* Enhanced content */}
                    <div className="p-8">
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
                        {project.title}
                      </h3>

                      <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Enhanced CTA */}
                      <Link href={`/view-project/${project.id}`}>
                        <motion.button
                          whileHover={{ scale: 1.02, x: 3 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-bold group/btn relative"
                        >
                          <span className="mr-3">View Project</span>
                          <motion.div
                            animate={{ x: [0, 5, 0] }}
                            transition={{
                              duration: 1.5,
                              repeat: Number.POSITIVE_INFINITY,
                            }}
                          >
                            <ArrowRight className="h-5 w-5" />
                          </motion.div>

                          {/* Underline effect */}
                          <motion.div className="absolute bottom-0 left-0 h-0.5 bg-blue-600 w-0 group-hover/btn:w-full transition-all duration-300" />
                        </motion.button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="mt-16 text-center lg:hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link href="/browse-project">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-2xl shadow-lg relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10">View All Projects</span>
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </Section>

        {/* Testimonials Section */}
        <Section className="py-32 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
          {/* Enhanced background decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute top-20 left-10 w-48 h-48 bg-gradient-to-br from-blue-200/40 to-indigo-200/40 rounded-full blur-3xl"
              animate={{
                x: [0, 50, 0],
                y: [0, -30, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
            <motion.div
              className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-br from-purple-200/40 to-pink-200/40 rounded-full blur-3xl"
              animate={{
                x: [0, -60, 0],
                y: [0, 40, 0],
                scale: [1.2, 1, 1.2],
              }}
              transition={{
                duration: 10,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />

            {/* Geometric patterns */}
            <div className="absolute inset-0 opacity-5">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%239C92AC' fillOpacity='0.2'%3E%3Cpath d='m0 0 40 40L0 80z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
              />
            </div>
          </div>

          <div className="container mx-auto px-6 md:px-12 relative z-10">
            <motion.div
              className="text-center mb-20"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Enhanced section badge */}
              <motion.div
                className="inline-block relative mb-8"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-xl rounded-full" />
                <div className="relative px-6 py-3 bg-gradient-to-r from-purple-100/80 to-pink-100/80 dark:from-purple-900/30 dark:to-pink-900/30 backdrop-blur-sm border border-purple-200/50 dark:border-purple-700/50 rounded-full flex items-center space-x-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                  >
                    <Star className="w-4 h-4 text-purple-600 fill-current" />
                  </motion.div>
                  <span className="text-purple-700 dark:text-purple-300 font-semibold text-sm">
                    Community Voices
                  </span>
                  <Sparkles className="w-4 h-4 text-purple-600" />
                </div>
              </motion.div>

              <h2 className="text-5xl md:text-6xl font-black mb-8 leading-tight">
                <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  What People Are
                </span>
                <br />
                <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Saying
                </span>
              </h2>

              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Hear from students, faculty, and industry partners about their
                transformative experiences with our platform.
                <span className="block mt-2 text-purple-600 font-semibold">
                  Real stories, real impact.
                </span>
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
            >
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  variants={scaleIn}
                  whileHover={{
                    y: -8,
                    transition: { duration: 0.3 },
                  }}
                  className="group relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all border border-white/40 dark:border-gray-700/40 overflow-hidden"
                >
                  {/* Enhanced quote mark */}
                  <motion.div
                    className="absolute -top-4 -left-4 text-8xl text-blue-200/30 dark:text-blue-900/30 font-serif"
                    initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 0.7, delay: index * 0.1 + 0.3 }}
                  >
                    quote: &quot;This platform has transformed how we showcase
                    student work. The visibility has led to industry
                    partnerships we never expected!&quot;,
                  </motion.div>

                  {/* Hover gradient background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    initial={{ scale: 0.8 }}
                    whileHover={{ scale: 1 }}
                  />

                  {/* Glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 rounded-3xl" />

                  <div className="relative z-10">
                    {/* Star rating */}
                    <motion.div
                      className="flex items-center mb-4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                    >
                      {[...Array(testimonial.rating)].map((_, starIndex) => (
                        <motion.div
                          key={starIndex}
                          animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 180, 360],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: starIndex * 0.1 + index * 0.2,
                          }}
                        >
                          <Star className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                        </motion.div>
                      ))}
                    </motion.div>

                    <p className="text-gray-700 dark:text-gray-300 mb-8 italic leading-relaxed text-lg font-medium">
                      {testimonial.quote}
                    </p>

                    <div className="flex items-center">
                      <motion.div
                        className="relative mr-4"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Image
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.name}
                          className="w-16 h-16 rounded-full border-3 border-white shadow-lg"
                        />
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/30 to-purple-400/30 group-hover:scale-110 transition-transform duration-300" />

                        {/* Online indicator */}
                        <motion.div
                          className="absolute bottom-1 right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                          }}
                        />
                      </motion.div>

                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white text-lg mb-1">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-blue-600 dark:text-blue-400 font-semibold">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced bottom accent line */}
                  <motion.div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 w-0 group-hover:w-full transition-all duration-700" />

                  {/* Corner decoration */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-purple-400/10 to-transparent group-hover:from-purple-400/20 transition-colors duration-300" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </Section>

        {/* CTA Section */}
        <Section className="py-32 bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
          {/* Enhanced background effects */}
          <div className="absolute inset-0">
            <motion.div
              className="absolute top-20 left-20 w-48 h-48 bg-gradient-to-br from-blue-400/30 to-cyan-400/30 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.7, 0.3],
                x: [0, 50, 0],
                y: [0, -30, 0],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
            <motion.div
              className="absolute bottom-20 right-20 w-72 h-72 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-3xl"
              animate={{
                scale: [1.3, 1, 1.3],
                opacity: [0.2, 0.6, 0.2],
                x: [0, -40, 0],
                y: [0, 30, 0],
              }}
              transition={{
                duration: 10,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />

            {/* Animated grid */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" />
            </div>

            {/* Client-side only floating particles */}
            {isClient &&
              ctaParticles.map((particle, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white/40 rounded-full"
                  style={{
                    left: `${particle.left}%`,
                    top: `${particle.top}%`,
                  }}
                  animate={{
                    y: [-30, 30],
                    opacity: [0.2, 0.8, 0.2],
                    scale: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: particle.duration,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    delay: particle.delay,
                  }}
                />
              ))}
          </div>

          <div className="container mx-auto px-6 md:px-12 text-center relative z-10">
            {/* Enhanced section badge */}
            <motion.div
              className="inline-block relative mb-10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-blue-100/20 blur-xl rounded-full" />
              <div className="relative px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 rounded-full flex items-center space-x-3">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                >
                  <Zap className="w-5 h-5 text-yellow-300" />
                </motion.div>
                <span className="text-white font-bold text-base">
                  Join Our Community
                </span>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Sparkles className="w-5 h-5 text-blue-300" />
                </motion.div>
              </div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight"
            >
              <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent">
                Ready to Showcase
              </span>
              <br />
              <span className="bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 bg-clip-text text-transparent">
                Your Project?
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-blue-100 max-w-5xl mx-auto mb-16 leading-relaxed"
            >
              Join thousands of students worldwide who are building their
              portfolios, connecting with industry leaders, and advancing their
              careers through our innovative platform.
              <span className="block mt-3 text-cyan-300 font-semibold text-lg">
                🚀 Your next opportunity is just one project away.
              </span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-16"
            >
              <Link href="/signup">
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 25px 50px rgba(255, 255, 255, 0.3)",
                    y: -3,
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-12 py-5 bg-gradient-to-r from-white to-blue-50 text-blue-600 font-black rounded-2xl shadow-2xl overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative flex items-center text-xl">
                    <Sparkles className="h-6 w-6 mr-3 transition-transform group-hover:scale-110" />
                    <span>Start Showcasing</span>
                    <motion.div
                      className="ml-3"
                      animate={{ x: [0, 5, 0] }}
                      transition={{
                        duration: 1.5,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    >
                      <ArrowRight className="h-6 w-6" />
                    </motion.div>
                  </div>
                </motion.button>
              </Link>

              <Link href="/browse-project">
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(255, 255, 255, 0.15)",
                    y: -3,
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-12 py-5 bg-white/5 backdrop-blur-md text-white font-black rounded-2xl border-2 border-white/40 hover:border-white/60 overflow-hidden transition-all"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative flex items-center text-xl">
                    <Search className="h-6 w-6 mr-3 transition-transform group-hover:scale-110" />
                    <span>Explore Projects</span>
                    <motion.div
                      className="ml-3"
                      animate={{ rotate: [0, 360] }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }}
                    >
                      <Star className="h-5 w-5" />
                    </motion.div>
                  </div>
                </motion.button>
              </Link>
            </motion.div>

            {/* Enhanced social proof */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            >
              {[
                {
                  icon: Users,
                  text: "15,000+ Students",
                  color: "from-blue-400 to-cyan-400",
                },
                {
                  icon: Award,
                  text: "500+ Industry Partners",
                  color: "from-purple-400 to-pink-400",
                },
                {
                  icon: BookOpen,
                  text: "2,500+ Projects",
                  color: "from-green-400 to-emerald-400",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center justify-center space-x-3 p-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/20"
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
                  <span className="text-blue-200/90 font-semibold">
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </Section>

        {/* Footer Section */}
        <footer className="bg-gray-900 text-white pt-20 pb-10 relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" />
          </div>

          <div className="container mx-auto px-6 md:px-12 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
              {/* About Column */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <motion.h3
                  className="text-2xl font-black mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                  whileHover={{ scale: 1.05 }}
                >
                  Project Showcase
                </motion.h3>
                <p className="text-gray-400 mb-8 leading-relaxed">
                  A platform for students to showcase their innovative projects,
                  connect with industry professionals, and advance their
                  careers.
                </p>
                <div className="flex space-x-4">
                  {[
                    { icon: Facebook, href: "#" },
                    { icon: Twitter, href: "#" },
                    { icon: Instagram, href: "#" },
                    { icon: Linkedin, href: "#" },
                    { icon: Github, href: "#" },
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      whileHover={{ y: -3, scale: 1.1 }}
                      className="p-2 bg-gray-800 hover:bg-blue-600 rounded-full transition-colors duration-300"
                    >
                      <social.icon size={20} />
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              {/* Quick Links Column */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-xl font-bold mb-6 text-white">
                  Quick Links
                </h3>
                <ul className="space-y-3">
                  {[
                    { text: "Browse Projects", href: "/browse-project" },
                    { text: "Departments", href: "/browse-department" },
                    { text: "About Us", href: "/about" },
                    { text: "Contact", href: "/contact" },
                  ].map((link, index) => (
                    <li key={index}>
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-blue-400 transition-colors flex items-center group"
                      >
                        <motion.div
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ArrowRight className="h-4 w-4 mr-3 group-hover:text-blue-400" />
                        </motion.div>
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Resources Column */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h3 className="text-xl font-bold mb-6 text-white">Resources</h3>
                <ul className="space-y-3">
                  {[
                    "Project Guidelines",
                    "Student Resources",
                    "FAQs",
                    "Privacy Policy",
                  ].map((item, index) => (
                    <li key={index}>
                      <Link
                        href="#"
                        className="text-gray-400 hover:text-blue-400 transition-colors flex items-center group"
                      >
                        <motion.div
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ArrowRight className="h-4 w-4 mr-3 group-hover:text-blue-400" />
                        </motion.div>
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Contact Column */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h3 className="text-xl font-bold mb-6 text-white">
                  Contact Us
                </h3>
                <ul className="space-y-6">
                  <li className="flex items-start group">
                    <MapPin className="h-5 w-5 text-blue-400 mr-4 mt-1 group-hover:scale-110 transition-transform" />
                    <span className="text-gray-400 group-hover:text-gray-300 transition-colors">
                      University Campus, 123 Education Blvd, Academic City, AC
                      54321
                    </span>
                  </li>
                  <li className="flex items-center group">
                    <Mail className="h-5 w-5 text-blue-400 mr-4 group-hover:scale-110 transition-transform" />
                    <a
                      href="mailto:info@projectshowcase.edu"
                      className="text-gray-400 hover:text-blue-400 transition-colors"
                    >
                      info@projectshowcase.edu
                    </a>
                  </li>
                  <li className="flex items-center group">
                    <Phone className="h-5 w-5 text-blue-400 mr-4 group-hover:scale-110 transition-transform" />
                    <a
                      href="tel:+1234567890"
                      className="text-gray-400 hover:text-blue-400 transition-colors"
                    >
                      (123) 456-7890
                    </a>
                  </li>
                </ul>
              </motion.div>
            </div>

            {/* Enhanced Divider */}
            <motion.div
              className="border-t border-gray-800 my-10 relative"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent h-px" />
            </motion.div>

            {/* Enhanced Copyright */}
            <motion.div
              className="flex flex-col md:flex-row justify-between items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <p className="text-gray-500 text-sm mb-4 md:mb-0 flex items-center">
                <span>
                  © {new Date().getFullYear()} College Project Showcase. All
                  rights reserved.
                </span>
                <motion.span
                  className="ml-2"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  ❤️
                </motion.span>
              </p>
              <div className="flex space-x-8">
                {["Terms of Service", "Privacy Policy", "Cookie Policy"].map(
                  (item, index) => (
                    <Link
                      key={index}
                      href="#"
                      className="text-gray-500 text-sm hover:text-gray-300 transition-colors relative group"
                    >
                      {item}
                      <motion.div className="absolute bottom-0 left-0 h-px bg-blue-400 w-0 group-hover:w-full transition-all duration-300" />
                    </Link>
                  )
                )}
              </div>
            </motion.div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default HomePage;
