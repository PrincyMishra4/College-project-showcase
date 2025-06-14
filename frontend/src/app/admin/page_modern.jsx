'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard,
  FolderOpen,
  Users,
  UserCheck,
  Plus,
  Settings,
  BarChart3,
  TrendingUp,
  Calendar,
  Eye,
  Activity,
  PieChart,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';

const AdminHome = () => {
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalStudents: 0,
    totalUsers: 0,
    recentActivity: 0
  });

  // Mock data - replace with actual API calls
  useEffect(() => {
    // Simulate loading stats
    setTimeout(() => {
      setStats({
        totalProjects: 142,
        totalStudents: 89,
        totalUsers: 67,
        recentActivity: 12
      });
    }, 1000);
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const statCards = [
    {
      title: "Total Projects",
      value: stats.totalProjects,
      icon: FolderOpen,
      color: "from-primary-500 to-primary-600",
      bgColor: "bg-primary-50 dark:bg-primary-900/20",
      textColor: "text-primary-600 dark:text-primary-400",
      change: "+12%",
      changeType: "increase"
    },
    {
      title: "Active Students",
      value: stats.totalStudents,
      icon: Users,
      color: "from-accent-500 to-accent-600",
      bgColor: "bg-accent-50 dark:bg-accent-900/20",
      textColor: "text-accent-600 dark:text-accent-400",
      change: "+8%",
      changeType: "increase"
    },
    {
      title: "Registered Users",
      value: stats.totalUsers,
      icon: UserCheck,
      color: "from-secondary-500 to-secondary-600",
      bgColor: "bg-secondary-50 dark:bg-secondary-900/20",
      textColor: "text-secondary-600 dark:text-secondary-400",
      change: "+15%",
      changeType: "increase"
    },
    {
      title: "Recent Activity",
      value: stats.recentActivity,
      icon: Activity,
      color: "from-success-500 to-success-600",
      bgColor: "bg-success-50 dark:bg-success-900/20",
      textColor: "text-success-600 dark:text-success-400",
      change: "+5%",
      changeType: "increase"
    }
  ];

  const managementCards = [
    {
      title: "Projects",
      description: "Manage all student projects, submissions, and showcase content.",
      icon: FolderOpen,
      color: "from-primary-500 to-primary-600",
      bgColor: "bg-primary-50 dark:bg-primary-900/20",
      manageLink: "/admin/manage-project",
      addLink: "/admin/add-project",
      stats: `${stats.totalProjects} Projects`
    },
    {
      title: "Students",
      description: "Manage student profiles, registrations, and academic information.",
      icon: Users,
      color: "from-accent-500 to-accent-600",
      bgColor: "bg-accent-50 dark:bg-accent-900/20",
      manageLink: "/admin/manage-student",
      addLink: "/admin/add-student",
      stats: `${stats.totalStudents} Students`
    },
    {
      title: "Users",
      description: "Manage user accounts, roles, and platform access permissions.",
      icon: UserCheck,
      color: "from-secondary-500 to-secondary-600",
      bgColor: "bg-secondary-50 dark:bg-secondary-900/20",
      manageLink: "/admin/manage-user",
      addLink: null,
      stats: `${stats.totalUsers} Users`
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-secondary-900 dark:via-secondary-800 dark:to-secondary-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg">
              <LayoutDashboard className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Admin Dashboard
            </h1>
            <div className="ml-2">
              <Sparkles className="w-6 h-6 text-accent-500 animate-pulse" />
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            Welcome back! Here&apos;s what&apos;s happening with your platform today.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {statCards.map((card, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ scale: 1.02, y: -4 }}
              className="glass card-modern p-6 relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${card.bgColor}`}>
                  <card.icon className={`w-6 h-6 ${card.textColor}`} />
                </div>
                <div className="flex items-center text-sm text-success-600 dark:text-success-400">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  {card.change}
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {card.title}
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {card.value}
                </p>
              </div>
              
              {/* Gradient overlay */}
              <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${card.color} opacity-10 rounded-bl-full`}></div>
            </motion.div>
          ))}
        </motion.div>

        {/* Management Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8"
        >
          {managementCards.map((card, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ scale: 1.02, y: -4 }}
              className="glass card-modern p-6 group relative overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center mb-4">
                <div className={`p-3 rounded-lg ${card.bgColor} mr-4`}>
                  <card.icon className="w-8 h-8 text-gray-700 dark:text-gray-300" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {card.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {card.stats}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                {card.description}
              </p>

              {/* Actions */}
              <div className="flex flex-col gap-3">
                <Link
                  href={card.manageLink}
                  className="btn-modern bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white flex items-center justify-between group/btn"
                >
                  <span>Manage {card.title}</span>
                  <ArrowUpRight className="w-5 h-5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                </Link>
                
                {card.addLink && (
                  <Link
                    href={card.addLink}
                    className={`btn-modern bg-gradient-to-r ${card.color} text-white flex items-center justify-center gap-2 hover:shadow-lg transition-all`}
                  >
                    <Plus className="w-5 h-5" />
                    Add New
                  </Link>
                )}
              </div>

              {/* Gradient overlay */}
              <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${card.color} opacity-5 rounded-bl-full group-hover:opacity-10 transition-opacity`}></div>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="glass card-modern p-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <Settings className="w-6 h-6 text-primary-500" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Quick Actions
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/admin/add-project"
              className="p-4 rounded-lg bg-primary-50 hover:bg-primary-100 dark:bg-primary-900/20 dark:hover:bg-primary-900/30 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary-100 dark:bg-primary-800 rounded-lg group-hover:scale-110 transition-transform">
                  <Plus className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>
                <span className="font-medium text-gray-900 dark:text-white">Add Project</span>
              </div>
            </Link>

            <Link
              href="/admin/add-student"
              className="p-4 rounded-lg bg-accent-50 hover:bg-accent-100 dark:bg-accent-900/20 dark:hover:bg-accent-900/30 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent-100 dark:bg-accent-800 rounded-lg group-hover:scale-110 transition-transform">
                  <Plus className="w-5 h-5 text-accent-600 dark:text-accent-400" />
                </div>
                <span className="font-medium text-gray-900 dark:text-white">Add Student</span>
              </div>
            </Link>

            <Link
              href="/browse-project"
              className="p-4 rounded-lg bg-secondary-50 hover:bg-secondary-100 dark:bg-secondary-900/20 dark:hover:bg-secondary-900/30 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-secondary-100 dark:bg-secondary-800 rounded-lg group-hover:scale-110 transition-transform">
                  <Eye className="w-5 h-5 text-secondary-600 dark:text-secondary-400" />
                </div>
                <span className="font-medium text-gray-900 dark:text-white">View Portal</span>
              </div>
            </Link>

            <div className="p-4 rounded-lg bg-success-50 hover:bg-success-100 dark:bg-success-900/20 dark:hover:bg-success-900/30 transition-colors group cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-success-100 dark:bg-success-800 rounded-lg group-hover:scale-110 transition-transform">
                  <BarChart3 className="w-5 h-5 text-success-600 dark:text-success-400" />
                </div>
                <span className="font-medium text-gray-900 dark:text-white">Analytics</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminHome;
