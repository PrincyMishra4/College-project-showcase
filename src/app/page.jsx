'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
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
  Twitter
} from 'lucide-react';
import Navbar from "@/components/Navbar";

// Featured projects data (replace with actual data)
const featuredProjects = [
  {
    id: 1,
    title: "AI Image Recognition System",
    department: "Computer Science",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    description: "A cutting-edge image recognition system using deep learning algorithms."
  },
  {
    id: 2,
    title: "Sustainable Architecture Design",
    department: "Architecture",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    description: "Eco-friendly building designs that minimize environmental impact."
  },
  {
    id: 3,
    title: "Renewable Energy Generator",
    department: "Electrical Engineering",
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    description: "Innovative power generation using renewable energy sources."
  },
];

// Testimonials data
const testimonials = [
  {
    id: 1,
    name: "Prof. Sarah Johnson",
    role: "Department Head, Computer Science",
    image: "https://randomuser.me/api/portraits/women/32.jpg",
    quote: "This platform has transformed how we showcase student work. The visibility has led to industry partnerships we never expected!"
  },
  {
    id: 2,
    name: "James Wilson",
    role: "Senior Student, Mechanical Engineering",
    image: "https://randomuser.me/api/portraits/men/41.jpg",
    quote: "My capstone project received feedback from industry professionals that helped me refine it. I've even received job offers because of it!"
  },
  {
    id: 3,
    name: "Dr. Michelle Lee",
    role: "Research Advisor, Biotechnology",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    quote: "The platform makes collaboration between departments seamless. We've seen interdisciplinary projects flourish as a result."
  }
];

// Hero carousel images
const heroImages = [
  { 
    src: "https://www.prince2.com/blog/wp-content/uploads/2024/09/The-power-of-collaboration-blog-banner.jpg", 
    title: "Showcase Your Academic Excellence",
    subtitle: "A platform for students to share their innovative projects with the world"
  },
  { 
    src: "https://www.morebusiness.com/wp-content/uploads/2021/04/improve-teamwork.jpg", 
    title: "Connect With Industry Partners",
    subtitle: "Bridge the gap between academic projects and industry opportunities"
  },
  { 
    src: "https://collegesofdistinction.com/wp-content/uploads/2019/06/1128112933113453.LVVrWgawQhwXvV1QyjtF_height640.png", 
    title: "Collaborate Across Disciplines",
    subtitle: "Discover interdisciplinary projects and connect with peers from other departments"
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
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const floatingAnimation = {
  y: [-10, 10],
  transition: {
    duration: 2,
    repeat: Infinity,
    repeatType: "reverse",
    ease: "easeInOut"
  }
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
  const totalSlides = heroImages.length;

  // Handle carousel navigation
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // Autoplay functionality
  useEffect(() => {
    let interval;
    if (isAutoplay) {
      interval = setInterval(nextSlide, 5000);
    }
    
    return () => clearInterval(interval);
  }, [isAutoplay, currentSlide]);

  // Pause autoplay on hover
  const handleMouseEnter = () => setIsAutoplay(false);
  const handleMouseLeave = () => setIsAutoplay(true);

  return (
   <>
   <Navbar/>
    <div className="w-full overflow-x-hidden">      {/* Hero Section with Carousel */}
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
              {/* Enhanced gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/50 to-transparent">
                <div className="container mx-auto h-full flex flex-col justify-center px-6 md:px-12 lg:px-24 relative z-10">
                  <motion.div
                    initial={{ opacity: 0, y: 60, x: -30 }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="max-w-4xl"
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                      className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 backdrop-blur-sm border border-blue-300/30 rounded-full mb-6"
                    >
                      <span className="text-blue-200 font-medium text-sm">✨ Welcome to the Future of Academic Showcase</span>
                    </motion.div>
                    
                    <motion.h1 
                      className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-white mb-6 leading-tight"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.7 }}
                    >
                      <span className="bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">
                        {heroImages[currentSlide].title}
                      </span>
                    </motion.h1>
                    
                    <motion.p 
                      className="text-xl md:text-2xl lg:text-3xl text-gray-200 mb-10 max-w-3xl leading-relaxed"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.9 }}
                    >
                      {heroImages[currentSlide].subtitle}
                    </motion.p>
                    
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
                            boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)",
                            y: -2
                          }}
                          whileTap={{ scale: 0.95 }}
                          className="group px-8 py-4 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-500 hover:via-blue-600 hover:to-indigo-600 text-white font-semibold rounded-2xl flex items-center shadow-2xl shadow-blue-500/25 border border-blue-400/20"
                        >
                          <span className="mr-3">Browse Projects</span>
                          <Search className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </motion.button>
                      </Link>
                      <Link href="/signup">
                        <motion.button
                          whileHover={{ 
                            scale: 1.05,
                            backgroundColor: "rgba(255, 255, 255, 0.15)",
                            y: -2
                          }}
                          whileTap={{ scale: 0.95 }}
                          className="group px-8 py-4 bg-white/10 backdrop-blur-md hover:bg-white/15 text-white font-semibold rounded-2xl border-2 border-white/30 hover:border-white/50 flex items-center transition-all duration-300"
                        >
                          <span className="mr-3">Join Now</span>
                          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </motion.button>
                      </Link>
                    </motion.div>
                  </motion.div>
                </div>
                
                {/* Floating elements */}
                <motion.div
                  className="absolute top-20 right-20 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-indigo-500/20 rounded-full backdrop-blur-sm hidden lg:block"
                  animate={floatingAnimation}
                />
                <motion.div
                  className="absolute bottom-32 right-32 w-16 h-16 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-full backdrop-blur-sm hidden lg:block"
                  animate={{
                    y: [10, -10],
                    transition: {
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut"
                    }
                  }}
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel navigation */}
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/30 hover:bg-black/50 p-3 rounded-full z-20 transition-all"
          onClick={prevSlide}
        >
          <ChevronLeft size={24} />
        </button>
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/30 hover:bg-black/50 p-3 rounded-full z-20 transition-all"
          onClick={nextSlide}
        >
          <ChevronRight size={24} />
        </button>

        {/* Slide indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentSlide === index
                  ? "bg-white w-10"
                  : "bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>      {/* Features Section */}
      <Section className="py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute -top-10 -right-10 w-72 h-72 bg-gradient-to-br from-blue-100/20 to-indigo-100/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          <motion.div 
            className="absolute -bottom-10 -left-10 w-96 h-96 bg-gradient-to-tr from-purple-100/20 to-pink-100/20 rounded-full blur-3xl"
            animate={{
              scale: [1.1, 1, 1.1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-block px-4 py-2 bg-gradient-to-r from-blue-100/80 to-indigo-100/80 dark:from-blue-900/30 dark:to-indigo-900/30 backdrop-blur-sm border border-blue-200/50 dark:border-blue-700/50 rounded-full mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="text-blue-700 dark:text-blue-300 font-medium text-sm">🚀 Platform Features</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent leading-tight">
              Why Showcase Your Projects Here?
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Our platform provides the perfect opportunity to highlight your academic achievements
              and connect with industry professionals worldwide.
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
          >
            {[
              {
                icon: <Code className="h-12 w-12 text-blue-600" />,
                title: "Showcase Your Work",
                description: "Create stunning portfolios with rich media, detailed documentation, and interactive demonstrations that bring your projects to life.",
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                icon: <Users className="h-12 w-12 text-indigo-600" />,
                title: "Connect with Peers",
                description: "Build meaningful relationships with students across departments and collaborate on interdisciplinary innovations.",
                gradient: "from-indigo-500 to-purple-500"
              },
              {
                icon: <Award className="h-12 w-12 text-purple-600" />,
                title: "Gain Recognition",
                description: "Get noticed by faculty, industry leaders, and potential employers through our curated showcase platform.",
                gradient: "from-purple-500 to-pink-500"
              },
              {
                icon: <Github className="h-12 w-12 text-gray-700 dark:text-gray-300" />,
                title: "Share Resources",
                description: "Link to repositories, research papers, and external resources to provide complete project context.",
                gradient: "from-gray-600 to-gray-800"
              },
              {
                icon: <BookOpen className="h-12 w-12 text-green-600" />,
                title: "Document Progress",
                description: "Maintain a comprehensive record of your academic journey and track your skill development over time.",
                gradient: "from-green-500 to-emerald-500"
              },
              {
                icon: <Search className="h-12 w-12 text-orange-600" />,
                title: "Discover Innovations",
                description: "Explore cutting-edge projects from every department to spark inspiration for your next breakthrough.",
                gradient: "from-orange-500 to-red-500"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ 
                  y: -8, 
                  transition: { duration: 0.3 }
                }}
                className="group bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-white/20 dark:border-gray-700/20 relative overflow-hidden"
              >
                {/* Hover gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                <motion.div 
                  className={`bg-gradient-to-br ${feature.gradient} rounded-2xl w-20 h-20 flex items-center justify-center mb-6 shadow-lg`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  {React.cloneElement(feature.icon, { className: "h-10 w-10 text-white" })}
                </motion.div>
                
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                  {feature.description}
                </p>
                
                {/* Bottom accent line */}
                <motion.div 
                  className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${feature.gradient} w-0 group-hover:w-full transition-all duration-500`}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* Statistics Section */}
      <Section className="py-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent" />
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Platform Impact
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              See how our platform is making a difference in academic collaboration and project visibility
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              { number: "2,500+", label: "Projects Showcased", icon: "📚" },
              { number: "15,000+", label: "Student Participants", icon: "👨‍🎓" },
              { number: "500+", label: "Industry Connections", icon: "🤝" },
              { number: "98%", label: "Satisfaction Rate", icon: "⭐" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-all"
              >
                <motion.div 
                  className="text-4xl mb-4"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.2
                  }}
                >
                  {stat.icon}
                </motion.div>
                <motion.div 
                  className="text-4xl md:text-5xl font-bold text-white mb-2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                >
                  {stat.number}
                </motion.div>
                <p className="text-blue-100 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>{/* Featured Projects Section */}
      <Section className="py-24 bg-white dark:bg-gray-800 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <motion.div 
            className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-8 lg:mb-0">
              <motion.div
                className="inline-block px-4 py-2 bg-gradient-to-r from-blue-100/80 to-indigo-100/80 dark:from-blue-900/30 dark:to-indigo-900/30 backdrop-blur-sm border border-blue-200/50 dark:border-blue-700/50 rounded-full mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <span className="text-blue-700 dark:text-blue-300 font-medium text-sm">🌟 Featured Work</span>
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent leading-tight">
                Outstanding Student Projects
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">
                Discover innovative solutions and creative implementations from our talented students across various departments.
              </p>
            </div>
            <Link href="/browse-project">
              <motion.button
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
                className="hidden lg:flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                <span className="mr-2">View All Projects</span>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </motion.button>
            </Link>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={scaleIn}
                whileHover={{ y: -8 }}
                className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden"
              >
                <div className="relative h-56 overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <motion.div 
                    className="absolute top-4 right-4 px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full opacity-0 group-hover:opacity-100"
                    initial={{ y: -10, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {project.department}
                  </motion.div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full">
                      {project.department}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <Link href={`/view-project/${project.id}`}>
                    <motion.button
                      whileHover={{ scale: 1.02, x: 2 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-semibold group/btn"
                    >
                      <span className="mr-2">View Project</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="mt-12 text-center lg:hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link href="/browse-project">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg"
              >
                View All Projects
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </Section>      {/* Testimonials Section */}
      <Section className="py-24 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-blue-200/30 to-indigo-200/30 rounded-full blur-2xl"
            animate={{
              x: [0, 30, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          <motion.div 
            className="absolute bottom-20 right-10 w-60 h-60 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-3xl"
            animate={{
              x: [0, -40, 0],
              y: [0, 25, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-block px-4 py-2 bg-gradient-to-r from-purple-100/80 to-pink-100/80 dark:from-purple-900/30 dark:to-pink-900/30 backdrop-blur-sm border border-purple-200/50 dark:border-purple-700/50 rounded-full mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="text-purple-700 dark:text-purple-300 font-medium text-sm">💬 Community Voices</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
              What People Are Saying
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Hear from students, faculty, and industry partners about their experiences with our platform.
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                variants={scaleIn}
                whileHover={{ 
                  y: -5,
                  transition: { duration: 0.3 }
                }}
                className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all relative border border-white/20 dark:border-gray-700/20 overflow-hidden"
              >
                {/* Quote mark */}
                <motion.div 
                  className="absolute -top-2 -left-2 text-6xl text-blue-200/50 dark:text-blue-900/50 font-serif"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                >
                  "
                </motion.div>
                
                {/* Hover gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10">
                  <p className="text-gray-700 dark:text-gray-300 mb-6 italic leading-relaxed text-lg">
                    {testimonial.quote}
                  </p>
                  
                  <div className="flex items-center">
                    <motion.div 
                      className="relative"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-14 h-14 rounded-full mr-4 border-3 border-white shadow-lg"
                      />
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 group-hover:scale-110 transition-transform duration-300" />
                    </motion.div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white text-lg">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Bottom accent line */}
                <motion.div 
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 w-0 group-hover:w-full transition-all duration-500"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>      {/* CTA Section */}
      <Section className="py-24 bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <motion.div 
            className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-2xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          <motion.div 
            className="absolute bottom-20 right-20 w-60 h-60 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        </div>

        <div className="container mx-auto px-6 md:px-12 text-center relative z-10">
          <motion.div
            className="inline-block px-4 py-2 bg-gradient-to-r from-white/10 to-blue-100/10 backdrop-blur-sm border border-white/20 rounded-full mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-blue-200 font-medium text-sm">🚀 Join Our Community</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent leading-tight"
          >
            Ready to Showcase Your Project?
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto mb-12 leading-relaxed"
          >
            Join thousands of students worldwide who are building their portfolios, connecting with industry leaders, 
            and advancing their careers through our innovative platform.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Link href="/signup">
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(255, 255, 255, 0.2)",
                  y: -2
                }}
                whileTap={{ scale: 0.95 }}
                className="group px-10 py-4 bg-gradient-to-r from-white to-blue-50 text-blue-600 font-bold rounded-2xl shadow-2xl hover:shadow-white/25 border border-white/20 flex items-center"
              >
                <span className="mr-3">Start Showcasing</span>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </motion.button>
            </Link>
            
            <Link href="/browse-project">
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  y: -2
                }}
                whileTap={{ scale: 0.95 }}
                className="group px-10 py-4 bg-white/5 backdrop-blur-md hover:bg-white/10 text-white font-bold rounded-2xl border-2 border-white/30 hover:border-white/50 flex items-center transition-all"
              >
                <span className="mr-3">Explore Projects</span>
                <Search className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </motion.button>
            </Link>
          </motion.div>

          {/* Social proof */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16 flex flex-wrap justify-center items-center gap-8 text-blue-200/80"
          >
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              <span className="text-sm">15,000+ Students</span>
            </div>
            <div className="flex items-center">
              <Award className="h-5 w-5 mr-2" />
              <span className="text-sm">500+ Industry Partners</span>
            </div>
            <div className="flex items-center">
              <BookOpen className="h-5 w-5 mr-2" />
              <span className="text-sm">2,500+ Projects</span>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* About Column */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-white">Project Showcase</h3>
              <p className="text-gray-400 mb-6">
                A platform for students to showcase their innovative projects, connect with industry professionals, and advance their careers.
              </p>
              <div className="flex space-x-4">
                <motion.a href="#" whileHover={{ y: -3, scale: 1.1 }} className="text-gray-400 hover:text-blue-400 transition-colors">
                  <Facebook size={20} />
                </motion.a>
                <motion.a href="#" whileHover={{ y: -3, scale: 1.1 }} className="text-gray-400 hover:text-blue-400 transition-colors">
                  <Twitter size={20} />
                </motion.a>
                <motion.a href="#" whileHover={{ y: -3, scale: 1.1 }} className="text-gray-400 hover:text-blue-400 transition-colors">
                  <Instagram size={20} />
                </motion.a>
                <motion.a href="#" whileHover={{ y: -3, scale: 1.1 }} className="text-gray-400 hover:text-blue-400 transition-colors">
                  <Linkedin size={20} />
                </motion.a>
                <motion.a href="#" whileHover={{ y: -3, scale: 1.1 }} className="text-gray-400 hover:text-blue-400 transition-colors">
                  <Github size={20} />
                </motion.a>
              </div>
            </div>

            {/* Quick Links Column */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-white">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/browse-project" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Browse Projects
                  </Link>
                </li>
                <li>
                  <Link href="/browse-department" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Departments
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources Column */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-white">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Project Guidelines
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Student Resources
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Column */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-white">Contact Us</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <MapPin className="h-5 w-5 text-blue-400 mr-3 mt-1" />
                  <span className="text-gray-400">University Campus, 123 Education Blvd, Academic City, AC 54321</span>
                </li>
                <li className="flex items-center">
                  <Mail className="h-5 w-5 text-blue-400 mr-3" />
                  <a href="mailto:info@projectshowcase.edu" className="text-gray-400 hover:text-blue-400 transition-colors">
                    info@projectshowcase.edu
                  </a>
                </li>
                <li className="flex items-center">
                  <Phone className="h-5 w-5 text-blue-400 mr-3" />
                  <a href="tel:+1234567890" className="text-gray-400 hover:text-blue-400 transition-colors">
                    (123) 456-7890
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-800 my-8"></div>

          {/* Copyright */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} College Project Showcase. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="#" className="text-gray-500 text-sm hover:text-gray-300 transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="text-gray-500 text-sm hover:text-gray-300 transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-gray-500 text-sm hover:text-gray-300 transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
   </>
  );
};

export default HomePage;
