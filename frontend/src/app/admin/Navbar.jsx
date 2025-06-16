"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "@/context/AuthContext"
import {
  Sparkles,
  Star,
  User,
  LogOut,
  Settings,
  Bell,
  ChevronDown,
  Menu,
  X,
  Building2,
  FolderOpen,
  Mail,
  Eye,
  BarChart3,
  UserPlus,
  Users,
  Plus,
  Edit,
  BookOpen,
  LayoutDashboard,
} from "lucide-react"
import Image from "next/image"

const Navbar = () => {
  const { id } = useParams()
  const path = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const { user, logout, isAuthenticated } = useAuth()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest(".mobile-menu")) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [isMenuOpen])

  // Animation variants
  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  const linkVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  }

  const mobileMenuVariants = {
    closed: {
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.4,
        when: "afterChildren",
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
    open: {
      height: "auto",
      opacity: 1,
      transition: {
        duration: 0.4,
        when: "beforeChildren",
        staggerChildren: 0.05,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  const mobileLinkVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 },
  }

  const dropdownVariants = {
    closed: {
      opacity: 0,
      scale: 0.95,
      y: -10,
      transition: { duration: 0.2 },
    },
    open: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  }  // Navigation links data with enhanced icons
  const navLinks = [
    {
      name: "Manage Projects",
      href: "/admin/manage-project",
      icon: FolderOpen,
      gradient: "from-emerald-500 to-green-500",
      description: "Manage all projects",
    },
    {
      name: "Manage Students",
      href: "/admin/manage-student",
      icon: Users,
      gradient: "from-orange-500 to-red-500",
      description: "Manage student accounts",
    },
    {
      name: "Manage Users",
      href: "/admin/manage-user",
      icon: User,
      gradient: "from-indigo-500 to-purple-500",
      description: "Manage user accounts",
    },
    {
      name: "Add Project",
      href: "/admin/add-project",
      icon: Plus,
      gradient: "from-teal-500 to-cyan-500",
      description: "Add new project",
    },    {
      name: "Add Student",
      href: "/admin/add-student",
      icon: UserPlus,
      gradient: "from-pink-500 to-rose-500",
      description: "Add new student",
    }
  ]

  return (
    <>
      <motion.header
        initial="hidden"
        animate="visible"
        variants={navVariants}
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/80 backdrop-blur-xl shadow-lg border-b border-white/20 dark:bg-gray-900/80 dark:border-gray-700/20"
            : "bg-gradient-to-r from-blue-50/80 via-white/80 to-indigo-50/80 backdrop-blur-md dark:from-gray-900/80 dark:via-gray-800/80 dark:to-gray-900/80"
        }`}
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
          <motion.div
            className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        </div>        <nav className="relative max-w-7xl h-20 w-full mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">          {/* Enhanced Logo */}
          <motion.div className="flex items-center" variants={linkVariants}>
            <Link href="/admin" className="flex items-center space-x-3 group">
              <motion.div className="relative" whileHover={{ scale: 1.05, rotate: 5 }} transition={{ duration: 0.3 }}>
                <Image src="/logocps.png" alt="MindGallery Admin Logo" className="w-20 h-16 rounded-xl shadow-lg "  />
              </motion.div>
              <div className="flex flex-col">
                <span className="font-black text-xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  College Project Showcase
                </span>
                <motion.span
                  className="text-xs text-gray-500 dark:text-gray-400 font-medium"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  
                </motion.span>
              </div>
            </Link>
          </motion.div>

          {/* Enhanced Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {navLinks.map((item, index) => (
              <motion.div key={item.name} variants={linkVariants}>
                <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} className="relative group">
                  <Link
                    href={item.href}
                    className={`relative px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center space-x-2 ${
                      path === item.href
                        ? "text-white shadow-lg"
                        : "text-gray-700 hover:text-white dark:text-gray-300 dark:hover:text-white"
                    }`}
                  >
                    {/* Background gradient for active/hover state */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r ${item.gradient} rounded-xl transition-opacity duration-300 ${
                        path === item.href ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                      }`}
                      layoutId={path === item.href ? "activeNavBg" : undefined}
                    />

                    {/* Glow effect */}
                    <div
                      className={`absolute -inset-1 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-300 rounded-xl`}
                    />

                    <div className="relative z-10 flex items-center space-x-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </div>

                    {/* Sparkle effect for active item */}
                    {path === item.href && (
                      <motion.div
                        className="absolute -top-1 -right-1"
                        animate={{
                          scale: [1, 1.2, 1],
                          rotate: [0, 180, 360],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                        }}
                      >
                        <Sparkles className="h-3 w-3 text-yellow-300" />
                      </motion.div>
                    )}
                  </Link>

                  {/* Tooltip */}
                  <motion.div
                    className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap"
                    initial={{ y: 5 }}
                    whileHover={{ y: 0 }}
                  >
                    {item.description}
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Enhanced Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {/* Notifications */}


                {/* Enhanced User Profile Dropdown */}
                <motion.div variants={linkVariants} className="relative">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-3 px-4 py-2 text-sm font-semibold text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors bg-white/50 dark:bg-gray-800/50 backdrop-blur-md rounded-xl border border-white/20 dark:border-gray-700/20 shadow-lg"
                  >
                    <div className="relative">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                        {user?.name?.charAt(0)}
                      </div>
                      <motion.div
                        className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      />
                    </div>
                    <div className="hidden md:block text-left">
                      <div className="font-semibold">{user?.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Online</div>
                    </div>
                    <motion.div animate={{ rotate: isUserMenuOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                      <ChevronDown className="h-4 w-4" />
                    </motion.div>
                  </motion.button>

                  {/* Enhanced Dropdown Menu */}
                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <motion.div
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={dropdownVariants}
                        className="absolute right-0 mt-3 w-72 rounded-2xl shadow-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl ring-1 ring-black/5 dark:ring-white/10 z-50 overflow-hidden border border-white/20 dark:border-gray-700/20"
                      >
                        {/* User Info Header */}
                        <div className="px-6 py-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-b border-gray-100/50 dark:border-gray-700/50">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg">
                              {user?.name?.charAt(0)}
                            </div>
                            <div>
                              <div className="font-bold text-gray-900 dark:text-gray-100">{user?.name}</div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</div>
                              <div className="flex items-center space-x-1 mt-1">
                                <div className="w-2 h-2 bg-green-400 rounded-full" />
                                <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                                  Active now
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>                        {/* Menu Items */}
                        <div className="py-2">
                          {[
                            { icon: User, label: "Admin Profile", href: "/admin/profile", gradient: "from-blue-500 to-cyan-500" },                            {
                              icon: Settings,
                              label: "Settings",
                              href: "/admin/settings",
                              gradient: "from-purple-500 to-pink-500",
                            },
                          ].map((item, index) => (
                            <motion.div
                              key={item.label}
                              whileHover={{ x: 5, backgroundColor: "rgba(59, 130, 246, 0.05)" }}
                              transition={{ duration: 0.2 }}
                            >
                              <Link
                                href={item.href}
                                className="flex items-center px-6 py-3 text-sm text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors group"
                              >
                                <div
                                  className={`p-2 bg-gradient-to-r ${item.gradient} rounded-lg mr-3 group-hover:scale-110 transition-transform`}
                                >
                                  <item.icon className="h-4 w-4 text-white" />
                                </div>
                                <span className="font-medium">{item.label}</span>
                              </Link>
                            </motion.div>
                          ))}

                          <div className="border-t border-gray-100/50 dark:border-gray-700/50 my-2" />

                          <motion.button
                            whileHover={{ x: 5, backgroundColor: "rgba(239, 68, 68, 0.05)" }}
                            transition={{ duration: 0.2 }}
                            onClick={logout}
                            className="w-full flex items-center px-6 py-3 text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors group"
                          >
                            <div className="p-2 bg-gradient-to-r from-red-500 to-red-600 rounded-lg mr-3 group-hover:scale-110 transition-transform">
                              <LogOut className="h-4 w-4 text-white" />
                            </div>
                            <span className="font-medium">Sign out</span>
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </>
            ) : (
              <>
                <motion.div variants={linkVariants}>
                  <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      href="/login"
                      className="px-6 py-2 text-sm font-semibold text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors relative group"
                    >
                      <span className="relative z-10">Log in</span>
                      <motion.div className="absolute bottom-0 left-0 h-0.5 bg-blue-600 w-0 group-hover:w-full transition-all duration-300" />
                    </Link>
                  </motion.div>
                </motion.div>

                <motion.div variants={linkVariants}>
                  <motion.div
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)",
                      y: -2,
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="relative group"
                  >
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-300 rounded-xl" />
                    <Link
                      href="/signup"
                      className="relative px-6 py-2 text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl shadow-lg transition-all flex items-center space-x-2 overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <span className="relative z-10">Sign up</span>
                      <motion.div
                        animate={{ x: [0, 3, 0] }}
                        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                        className="relative z-10"
                      >
                        <Sparkles className="h-4 w-4" />
                      </motion.div>
                    </Link>
                  </motion.div>
                </motion.div>
              </>
            )}
          </div>

          {/* Enhanced Mobile menu button */}
          <motion.div className="lg:hidden" variants={linkVariants}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="mobile-menu relative p-3 rounded-xl text-gray-700 hover:text-blue-600 hover:bg-blue-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-800 transition-all bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-white/20 dark:border-gray-700/20 shadow-lg"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <AnimatePresence mode="wait" initial={false}>
                {!isMenuOpen ? (
                  <motion.div
                    key="menu"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Menu className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="close"
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                    transition={{ duration: 0.3 }}
                  >
                    <X className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Notification dot for mobile */}
              {isAuthenticated && (
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
              )}
            </motion.button>
          </motion.div>
        </nav>

        {/* Enhanced Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="lg:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-2xl overflow-hidden border-t border-white/20 dark:border-gray-700/20"
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileMenuVariants}
            >
              <div className="px-4 pt-4 pb-6 space-y-2">
                {/* Navigation Links */}
                {navLinks.map((item, index) => (
                  <motion.div key={item.name} variants={mobileLinkVariants}>
                    <motion.div
                      whileHover={{ x: 5, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative group"
                    >
                      <Link
                        href={item.href}
                        className={`flex items-center px-4 py-3 rounded-xl text-base font-semibold transition-all relative overflow-hidden ${
                          path === item.href
                            ? "text-white shadow-lg"
                            : "text-gray-700 hover:text-white dark:text-gray-300 dark:hover:text-white"
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {/* Background gradient */}
                        <motion.div
                          className={`absolute inset-0 bg-gradient-to-r ${item.gradient} transition-opacity duration-300 ${
                            path === item.href ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                          }`}
                          layoutId={path === item.href ? "activeMobileBg" : undefined}
                        />

                        <div className="relative z-10 flex items-center space-x-3">
                          <div
                            className={`p-2 rounded-lg ${
                              path === item.href
                                ? "bg-white/20"
                                : "bg-gray-100 dark:bg-gray-800 group-hover:bg-white/20"
                            } transition-colors`}
                          >
                            <item.icon className="h-5 w-5" />
                          </div>
                          <div>
                            <div>{item.name}</div>
                            <div
                              className={`text-xs ${
                                path === item.href
                                  ? "text-white/80"
                                  : "text-gray-500 dark:text-gray-400 group-hover:text-white/80"
                              }`}
                            >
                              {item.description}
                            </div>
                          </div>
                        </div>

                        {/* Active indicator */}
                        {path === item.href && (
                          <motion.div
                            className="absolute right-4 top-1/2 transform -translate-y-1/2"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                          >
                            <Star className="h-4 w-4 text-yellow-300 fill-current" />
                          </motion.div>
                        )}
                      </Link>
                    </motion.div>
                  </motion.div>
                ))}

                {/* Auth Section */}
                <div className="pt-6 border-t border-gray-200/50 dark:border-gray-700/50">
                  {isAuthenticated ? (
                    <div className="space-y-3">
                      {/* User info card */}
                      <motion.div
                        variants={mobileLinkVariants}
                        className="flex items-center p-4 rounded-xl bg-gradient-to-r from-blue-50/80 to-purple-50/80 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200/50 dark:border-blue-700/50"
                      >
                        <div className="relative mr-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg">
                            {user?.name?.charAt(0)}
                          </div>
                          <motion.div
                            className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                          />
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-gray-800 dark:text-gray-200">{user?.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</div>
                          <div className="flex items-center space-x-1 mt-1">
                            <div className="w-2 h-2 bg-green-400 rounded-full" />
                            <span className="text-xs text-green-600 dark:text-green-400 font-medium">Online</span>
                          </div>
                        </div>
                      </motion.div>                      {/* User actions */}
                      <div className="space-y-2">
                        {[
                          { icon: User, label: "Admin Profile", href: "/admin/profile", gradient: "from-blue-500 to-cyan-500" },
                          {
                            icon: Settings,
                            label: "Settings",
                            href: "/admin/settings",                            gradient: "from-purple-500 to-pink-500",
                          },
                        ].map((item, index) => (
                          <motion.div
                            key={item.label}
                            variants={mobileLinkVariants}
                            whileHover={{ scale: 1.02, x: 5 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Link
                              href={item.href}
                              className="flex items-center p-3 rounded-xl text-gray-700 hover:text-white dark:text-gray-300 dark:hover:text-white transition-all group bg-gray-50 dark:bg-gray-800/50 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              <div
                                className={`p-2 bg-gradient-to-r ${item.gradient} rounded-lg mr-3 group-hover:scale-110 transition-transform`}
                              >
                                <item.icon className="h-4 w-4 text-white" />
                              </div>
                              <span className="font-semibold">{item.label}</span>
                            </Link>
                          </motion.div>
                        ))}

                        <motion.div
                          variants={mobileLinkVariants}
                          whileHover={{ scale: 1.02, x: 5 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <button
                            onClick={() => {
                              logout()
                              setIsMenuOpen(false)
                            }}
                            className="w-full flex items-center p-3 rounded-xl text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-xl transition-all group"
                          >
                            <div className="p-2 bg-white/20 rounded-lg mr-3 group-hover:scale-110 transition-transform">
                              <LogOut className="h-4 w-4 text-white" />
                            </div>
                            <span className="font-semibold">Sign out</span>
                          </button>
                        </motion.div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <motion.div variants={mobileLinkVariants} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Link
                          href="/login"
                          className="w-full flex items-center justify-center p-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition-all font-semibold"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <User className="mr-2 h-5 w-5" />
                          Log in
                        </Link>
                      </motion.div>

                      <motion.div
                        variants={mobileLinkVariants}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="relative group"
                      >
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 opacity-30 blur-lg transition-opacity duration-300 rounded-xl" />
                        <Link
                          href="/signup"
                          className="relative w-full flex items-center justify-center p-3 text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl shadow-lg hover:shadow-xl transition-all font-bold overflow-hidden"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <Sparkles className="mr-2 h-5 w-5 relative z-10" />
                          <span className="relative z-10">Sign up</span>
                        </Link>
                      </motion.div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Spacer to prevent content from going under the fixed navbar */}
      <div className="h-20"></div>
    </>
  )
}

export default Navbar
