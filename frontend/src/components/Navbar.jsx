"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Menu, User, LogOut, ChevronDown, Info, Building2, FolderOpen, Mail, Eye, UserPlus, LogIn } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/context/AuthContext"

// Mock auth context - replace with your actual auth context


const Navbar = () => {
  const { id } = useParams()
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { user, logout, isAuthenticated } = useAuth()
  const [isStudentLoggedIn, setIsStudentLoggedIn] = useState(false)
  const [studentData, setStudentData] = useState(null)

  // Check if a student is logged in
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem('token')
      const studentJson = localStorage.getItem('student')
      if (token && studentJson) {
        setIsStudentLoggedIn(true)
        try {
          const student = JSON.parse(studentJson)
          setStudentData(student)
        } catch (e) {
          console.error("Error parsing student data", e)
        }
      }
    }
  }, [])

  // Handle student logout
  const handleStudentLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('student')
    setIsStudentLoggedIn(false)
    setStudentData(null)
    window.location.href = '/'
  }

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Navigation links with icons
  const navLinks = [
    { name: "Departments", href: "/browse-department", icon: Building2 },
    { name: "Projects", href: "/browse-project", icon: FolderOpen },
    { name: "Contact", href: "/contact", icon: Mail },
    { name: "About", href: "/about", icon: Info },
  ]

  // Add View Project link if ID exists
  if (id) {
    navLinks.push({
      name: "View Project",
      href: `/view-project/${id}`,
      icon: Eye,
    })
  }

  const isActiveLink = (href) => pathname === href

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/80 backdrop-blur-xl shadow-lg border-b border-gray-200/50 dark:bg-gray-950/80 dark:border-gray-800/50"
            : "bg-gradient-to-r from-blue-50/90 via-white/90 to-indigo-50/90 backdrop-blur-sm dark:from-gray-950/90 dark:via-gray-900/90 dark:to-gray-950/90"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo Section */}
            <motion.div
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
                  <img
                    src="/logocps.png"
                    alt="MindGallery Logo"
                    className="relative w-12 h-12 rounded-xl shadow-md group-hover:shadow-lg transition-shadow"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    MindGallery
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Creative Projects Hub</span>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((item, index) => {
                const Icon = item.icon
                const isActive = isActiveLink(item.href)

                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link href={item.href}>
                      <motion.div
                        className={`relative px-4 py-2 rounded-xl font-medium text-sm transition-all duration-200 flex items-center space-x-2 group ${
                          isActive
                            ? "text-blue-600 dark:text-blue-400"
                            : "text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="activeTab"
                            className="absolute inset-0 bg-blue-100 dark:bg-blue-900/30 rounded-xl"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                          />
                        )}
                        <Icon className="w-4 h-4 relative z-10" />
                        <span className="relative z-10">{item.name}</span>
                      </motion.div>
                    </Link>
                  </motion.div>
                )
              })}
            </div>            {/* Desktop Auth Section */}
            <div className="hidden lg:flex items-center space-x-4">
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-auto px-3 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder.svg?height=32&width=32" />
                          <AvatarFallback className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm">
                            {user?.name?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col items-start">
                          <span className="text-sm font-medium">{user?.name}</span>
                          
                        </div>
                        <ChevronDown className="h-4 w-4 text-gray-500" />
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user?.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="text-red-600 dark:text-red-400">
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : isStudentLoggedIn ? (                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-auto px-3 rounded-xl">                      <div className="flex items-center space-x-3">                        <Avatar className="h-8 w-8">
                          <AvatarImage 
                            src={studentData?.image && studentData.image !== 'Unknown' ? studentData.image : "/student.jpg"} 
                            className="object-cover"
                          />
                          <AvatarFallback className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm">
                            {studentData?.name?.charAt(0) || 'S'}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col items-start">
                          <span className="text-sm font-medium">{studentData?.name || 'Student'}</span>
                        </div>
                        <ChevronDown className="h-4 w-4 text-gray-500" />
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{studentData?.name || 'Student'}</p>
                        <p className="text-xs leading-none text-muted-foreground">{studentData?.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/student/student-profile" className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/student/add-project" className="flex items-center">
                        <FolderOpen className="mr-2 h-4 w-4" />
                        Add Project
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleStudentLogout} className="text-red-600 dark:text-red-400">
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center space-x-3">
                  <Button variant="ghost" asChild className="rounded-xl">
                    <Link href="/login" className="flex items-center space-x-2">
                      <LogIn className="w-4 h-4" />
                      <span>Log in</span>
                    </Link>
                  </Button>
                  <Button
                    asChild
                    className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all"
                  >
                    <Link href="/signup" className="flex items-center space-x-2">
                      <UserPlus className="w-4 h-4" />
                      <span>Sign up</span>
                    </Link>
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-xl">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80 p-0">
                  <div className="flex flex-col h-full">
                    {/* Mobile Header */}
                    <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
                      <div className="flex items-center space-x-3">
                        <img src="/placeholder.svg?height=40&width=40" alt="Logo" className="w-10 h-10 rounded-lg" />
                        <div>
                          <h2 className="font-bold text-lg bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            MindGallery
                          </h2>
                          <p className="text-sm text-gray-500">Creative Hub</p>
                        </div>
                      </div>
                    </div>

                    {/* Mobile Navigation */}
                    <div className="flex-1 p-6 space-y-2">
                      {navLinks.map((item) => {
                        const Icon = item.icon
                        const isActive = isActiveLink(item.href)

                        return (
                          <Link key={item.name} href={item.href}>
                            <motion.div
                              className={`flex items-center space-x-3 p-3 rounded-xl transition-all ${
                                isActive
                                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
                              }`}
                              whileHover={{ x: 4 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => setIsMenuOpen(false)}
                            >
                              <Icon className="w-5 h-5" />
                              <span className="font-medium">{item.name}</span>
                            </motion.div>
                          </Link>
                        )
                      })}
                    </div>                    {/* Mobile Auth Section */}
                    <div className="p-6 border-t bg-gray-50 dark:bg-gray-900/50">
                      {isAuthenticated ? (
                        <div className="space-y-4">
                          <div className="flex items-center space-x-3 p-3 bg-white dark:bg-gray-800 rounded-xl">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src="/placeholder.svg?height=40&width=40" />
                              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                                {user?.name?.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <p className="font-medium text-sm">{user?.name}</p>
                              <p className="text-xs text-gray-500">{user?.email}</p>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Button variant="outline" className="w-full justify-start rounded-xl" asChild>
                              <Link href="/profile">
                                <User className="mr-2 h-4 w-4" />
                                Profile
                              </Link>
                            </Button>
                            <Button
                              variant="outline"
                              className="w-full justify-start rounded-xl text-red-600 border-red-200 hover:bg-red-50"
                              onClick={logout}
                            >
                              <LogOut className="mr-2 h-4 w-4" />
                              Log out
                            </Button>
                          </div>
                        </div>
                      ) : isStudentLoggedIn ? (
                        <div className="space-y-4">                          <div className="flex items-center space-x-3 p-3 bg-white dark:bg-gray-800 rounded-xl">
                            <Avatar className="h-10 w-10">
                              <AvatarImage 
                                src={studentData?.image && studentData.image !== 'Unknown' ? studentData.image : "/student.jpg"} 
                                className="object-cover"
                              />
                              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                                {studentData?.name?.charAt(0) || 'S'}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <p className="font-medium text-sm">{studentData?.name || 'Student'}</p>
                              <p className="text-xs text-gray-500">{studentData?.email}</p>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Button variant="outline" className="w-full justify-start rounded-xl" asChild>
                              <Link href="/student/student-profile">
                                <User className="mr-2 h-4 w-4" />
                                Profile
                              </Link>
                            </Button>
                            <Button variant="outline" className="w-full justify-start rounded-xl" asChild>
                              <Link href="/student/add-project">
                                <FolderOpen className="mr-2 h-4 w-4" />
                                Add Project
                              </Link>
                            </Button>
                            <Button
                              variant="outline"
                              className="w-full justify-start rounded-xl text-red-600 border-red-200 hover:bg-red-50"
                              onClick={handleStudentLogout}
                            >
                              <LogOut className="mr-2 h-4 w-4" />
                              Log out
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <Button variant="outline" className="w-full rounded-xl" asChild>
                            <Link href="/login">
                              <LogIn className="mr-2 h-4 w-4" />
                              Log in
                            </Link>
                          </Button>
                          <Button className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600" asChild>
                            <Link href="/signup">
                              <UserPlus className="mr-2 h-4 w-4" />
                              Sign up
                            </Link>
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Spacer */}
      <div className="h-16 lg:h-20" />
    </>
  )
}

export default Navbar
