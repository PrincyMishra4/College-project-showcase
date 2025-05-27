"use client";
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { 
  Sparkles, 
  Target, 
  Users, 
  Lightbulb, 
  Award, 
  BookOpen,
  ArrowRight,
  CheckCircle,
  Star,
  Zap,
  Heart,
  Globe,
  Rocket,
  Code,
  Palette,
  Building
} from 'lucide-react';

const AboutPage = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Enhanced animation variants with sophisticated easing
  const fadeInUp = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };
  
  const cardVariant = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const floatingAnimation = {
    y: [-10, 10, -10],
    transition: {
      duration: 6,
      ease: "easeInOut",
      repeat: Infinity
    }
  };

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 4,
      ease: "easeInOut",
      repeat: Infinity
    }  };
  return (
    <div ref={containerRef} className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
          animate={floatingAnimation}
        />
        <motion.div
          className="absolute top-1/3 -left-20 w-60 h-60 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full blur-3xl"
          animate={{
            y: [20, -20, 20],
            x: [-10, 10, -10],
            transition: {
              duration: 8,
              ease: "easeInOut",
              repeat: Infinity
            }
          }}
        />
        <motion.div
          className="absolute bottom-20 right-1/4 w-40 h-40 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
          animate={pulseAnimation}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Enhanced Hero Section */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-center mb-24 relative"
        >
          <motion.div
            className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
          </motion.div>

          <motion.h1 
            className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-8 pt-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            About Our Platform
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            Empowering students to showcase innovation and excellence across all disciplines.
            <span className="block mt-2 text-lg text-gray-500">
              Building bridges between academic brilliance and industry opportunities.
            </span>
          </motion.p>

          {/* Floating statistics */}
          <motion.div 
            className="flex flex-wrap justify-center gap-8 mt-16"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {[
              { number: "500+", label: "Student Projects", icon: Rocket },
              { number: "50+", label: "Disciplines", icon: Globe },
              { number: "100+", label: "Industry Partners", icon: Building }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <stat.icon className="w-8 h-8 text-blue-600 mb-2" />
                <div className="text-3xl font-bold text-gray-900">{stat.number}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>        {/* Enhanced Mission Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative"
          >
            <motion.div
              className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
              animate={pulseAnimation}
            />
            
            <div className="relative p-8 bg-white/60 backdrop-blur-sm rounded-3xl border border-white/20 shadow-2xl">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent">
                  Our Mission
                </h2>
              </div>
              
              <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  We believe in empowering students with a dynamic platform to showcase their innovative projects, 
                  fostering <span className="font-semibold text-blue-600">creativity</span> and 
                  <span className="font-semibold text-purple-600"> collaboration</span> within our academic ecosystem.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Our mission extends beyond mere presentation—we're bridging the critical gap between{' '}
                  <span className="font-semibold text-green-600">academic excellence</span> and{' '}
                  <span className="font-semibold text-orange-600">real-world applications</span>, 
                  while creating meaningful connections between talented students and industry leaders.
                </p>
                
                <div className="flex flex-wrap gap-3 mt-6">
                  {['Innovation', 'Excellence', 'Collaboration', 'Growth'].map((tag, index) => (
                    <motion.span
                      key={tag}
                      className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 rounded-full text-sm font-medium"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.4 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {tag}
                    </motion.span>
                  ))}
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
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 4,
                ease: "easeInOut",
                repeat: Infinity
              }}
            />
            
            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 z-10"
                whileHover={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              />
              <motion.img 
                src="./about1.jpg" 
                alt="Students collaborating on innovative projects" 
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
            
            {/* Floating elements around image */}
            <motion.div
              className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-xl"
              animate={floatingAnimation}
            >
              <Lightbulb className="w-8 h-8 text-white" />
            </motion.div>
            
            <motion.div
              className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-xl"
              animate={{
                y: [10, -10, 10],
                rotate: [0, 5, -5, 0],
                transition: {
                  duration: 5,
                  ease: "easeInOut",
                  repeat: Infinity
                }
              }}
            >
              <Users className="w-8 h-8 text-white" />
            </motion.div>
          </motion.div>
        </div>        {/* Enhanced Key Features Section */}
        <motion.div 
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="relative mb-32"
        >
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-purple-50/50 rounded-3xl -z-10" />
          
          <div className="relative p-8 md:p-16 bg-white/40 backdrop-blur-lg rounded-3xl border border-white/30 shadow-2xl">
            <motion.div className="text-center mb-16">
              <motion.div
                className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-xl"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <Award className="w-8 h-8 text-white" />
              </motion.div>
              
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4">
                Key Features
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Discover what makes our platform the premier destination for student innovation
              </p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
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
                  description: "Featuring groundbreaking projects from engineering, computer science, arts, business, and emerging interdisciplinary fields.",
                  features: ["Cross-disciplinary Innovation", "Emerging Technologies", "Creative Solutions"]
                },
                {
                  title: "Industry Connection",
                  icon: Building,
                  gradient: "from-purple-500 to-pink-500",
                  description: "Creating meaningful opportunities for students to connect with industry leaders, potential employers, and venture capitalists.",
                  features: ["Mentorship Programs", "Career Opportunities", "Investment Connections"]
                },
                {
                  title: "Innovation Support",
                  icon: Rocket,
                  gradient: "from-green-500 to-blue-500",
                  description: "Providing comprehensive resources, expert mentorship, and funding guidance to transform innovative ideas into reality.",
                  features: ["Expert Guidance", "Resource Access", "Funding Support"]
                }
              ].map((feature, index) => (
                <motion.div 
                  key={index} 
                  className="group relative"
                  variants={cardVariant}
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {/* Glassmorphism Card */}
                  <div className="relative h-full p-8 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl overflow-hidden">
                    {/* Gradient background on hover */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                    />
                    
                    {/* Floating icon container */}
                    <motion.div 
                      className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl mb-6 shadow-lg relative z-10`}
                      whileHover={{ 
                        scale: 1.1, 
                        rotate: [0, -10, 10, 0],
                        boxShadow: "0 20px 40px rgba(0,0,0,0.15)"
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <feature.icon className="w-8 h-8 text-white" />
                    </motion.div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-900 transition-colors">
                      {feature.title}
                    </h3>
                    
                    <p className="text-gray-700 mb-6 leading-relaxed">
                      {feature.description}
                    </p>

                    {/* Feature list */}
                    <div className="space-y-3">
                      {feature.features.map((item, idx) => (
                        <motion.div
                          key={idx}
                          className="flex items-center text-sm text-gray-600"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1, duration: 0.4 }}
                          viewport={{ once: true }}
                        >
                          <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                          {item}
                        </motion.div>
                      ))}
                    </div>

                    {/* Hover effect elements */}
                    <motion.div
                      className="absolute top-4 right-4 w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{
                        duration: 2,
                        ease: "easeInOut",
                        repeat: Infinity
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>        {/* Enhanced Team Section */}
        <motion.div 
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-32"
        >
          <motion.div className="text-center mb-16">
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl mb-6 shadow-xl"
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <Users className="w-8 h-8 text-white" />
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-purple-800 to-pink-800 bg-clip-text text-transparent mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Passionate educators and industry experts dedicated to nurturing student innovation
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {[
              { 
                name: "Dr. Jane Smith", 
                role: "Faculty Advisor", 
                image: "/file.svg",
                expertise: "AI & Machine Learning",
                gradient: "from-blue-500 to-purple-600"
              },
              { 
                name: "Prof. John Davis", 
                role: "Technology Mentor", 
                image: "/next.svg",
                expertise: "Software Engineering",
                gradient: "from-green-500 to-blue-500"
              },
              { 
                name: "Sarah Johnson", 
                role: "Student Coordinator", 
                image: "/next.svg",
                expertise: "Project Management",
                gradient: "from-purple-500 to-pink-500"
              },
              { 
                name: "Michael Chen", 
                role: "Industry Liaison", 
                image: "/window.svg",
                expertise: "Business Strategy",
                gradient: "from-orange-500 to-red-500"
              }
            ].map((member, index) => (
              <motion.div 
                key={index} 
                className="group relative"
                variants={cardVariant}
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="relative p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl text-center overflow-hidden">
                  {/* Background gradient on hover */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${member.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  />
                  
                  {/* Profile image container */}
                  <motion.div 
                    className="relative w-24 h-24 mx-auto mb-6"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${member.gradient} rounded-full p-1`}>
                      <div className="w-full h-full bg-white rounded-full overflow-hidden">
                        <img 
                          src={member.image} 
                          alt={`${member.name} - ${member.role}`} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    </div>
                    
                    {/* Online indicator */}
                    <motion.div
                      className="absolute bottom-2 right-2 w-4 h-4 bg-green-400 rounded-full border-2 border-white shadow-lg"
                      animate={pulseAnimation}
                    />
                  </motion.div>

                  <motion.h3 
                    className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-900 transition-colors"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {member.name}
                  </motion.h3>
                  
                  <p className="text-blue-600 font-medium mb-2">{member.role}</p>
                  <p className="text-sm text-gray-600 mb-4">{member.expertise}</p>

                  {/* Social/contact buttons */}
                  <motion.div 
                    className="flex justify-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ y: 10 }}
                    whileInView={{ y: 0 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                  >
                    <motion.button
                      className="w-8 h-8 bg-blue-100 hover:bg-blue-200 rounded-full flex items-center justify-center transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Heart className="w-4 h-4 text-blue-600" />
                    </motion.button>
                    <motion.button
                      className="w-8 h-8 bg-purple-100 hover:bg-purple-200 rounded-full flex items-center justify-center transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Star className="w-4 h-4 text-purple-600" />
                    </motion.button>
                  </motion.div>

                  {/* Decorative elements */}
                  <motion.div
                    className="absolute top-2 right-2 w-2 h-2 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      ease: "easeInOut",
                      repeat: Infinity,
                      delay: index * 0.2
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>        {/* Enhanced Get Involved Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="relative"        >          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl opacity-90" />
          <div className="absolute inset-0 opacity-10 rounded-3xl" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
          
          <div className="relative p-12 md:p-16 text-center text-white">
            {/* Floating orbs */}
            <motion.div
              className="absolute top-8 left-8 w-16 h-16 bg-white/20 rounded-full blur-xl"
              animate={floatingAnimation}
            />
            <motion.div
              className="absolute bottom-8 right-8 w-20 h-20 bg-purple-300/20 rounded-full blur-xl"
              animate={{
                y: [15, -15, 15],
                x: [-5, 5, -5],
                transition: {
                  duration: 7,
                  ease: "easeInOut",
                  repeat: Infinity
                }
              }}
            />

            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-8 shadow-xl"
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <Zap className="w-10 h-10 text-white" />
            </motion.div>

            <motion.h2 
              className="text-4xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Ready to Get Involved?
            </motion.h2>
            
            <motion.p 
              className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Whether you're a visionary student, dedicated educator, or industry innovator, 
              our platform offers endless opportunities to make an impact.
            </motion.p>

            {/* Enhanced CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row justify-center gap-6 mb-12"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <motion.button 
                className="group relative px-8 py-4 bg-white text-blue-600 font-bold rounded-2xl shadow-2xl overflow-hidden transition-all duration-300"
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 25px 50px rgba(255,255,255,0.3)",
                  y: -5
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                />
                <span className="relative flex items-center justify-center">
                  Submit Your Project
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>
              
              <motion.button 
                className="group relative px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-bold rounded-2xl border-2 border-white/30 overflow-hidden transition-all duration-300"
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: "rgba(255,255,255,0.3)",
                  y: -5
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                />
                <span className="relative flex items-center justify-center">
                  Become a Mentor
                  <Heart className="ml-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                </span>
              </motion.button>
            </motion.div>

            {/* Social proof indicators */}
            <motion.div 
              className="flex flex-wrap justify-center gap-8 text-white/80 text-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-300 mr-2" />
                500+ Projects Showcased
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 text-green-300 mr-2" />
                50+ Industry Partners
              </div>
              <div className="flex items-center">
                <Award className="w-4 h-4 text-purple-300 mr-2" />
                95% Success Rate
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;