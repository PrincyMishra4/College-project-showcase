'use client';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, ArrowRight, GraduationCap, BookOpen, Sparkles } from 'lucide-react';

const ISSERVER = typeof window === "undefined";

const StudentLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setLoading(true);
      setErrors({});
      
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/student/authenticate`, formData);
        
        // Check if response and response.data exist
        if (response && response.data) {
          toast.success('Student Login Successful');
          
          !ISSERVER && localStorage.setItem('token', response.data.token);
          document.cookie = 'token=' + response.data.token;
          
          if (response.data.role === 'student') {
            !ISSERVER && localStorage.setItem('student', JSON.stringify(response.data));
            router.push('/student/student-profile');
          } else {
            !ISSERVER && localStorage.setItem('user', JSON.stringify(response.data));
            router.push('/');
          }
        } else {
          throw new Error('Invalid response from server');
        }
      } catch (error) {
        console.error(error);
        if (error.response && error.response.status === 401) {
          setErrors({ auth: 'Invalid credentials. Please try again.' });
        } else {
          setErrors({ auth: 'Login failed. Please try again.' });
        }
        toast.error('Login failed');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent-50 via-white to-secondary-50 dark:from-secondary-900 dark:via-secondary-800 dark:to-secondary-900 flex items-center justify-center p-4">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-accent-400/20 to-secondary-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-tr from-primary-400/20 to-accent-400/20 rounded-full blur-2xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute top-1/3 left-1/4 w-2 h-2 bg-accent-400 rounded-full"
          animate={{
            y: [0, -20, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-2/3 right-1/3 w-1 h-1 bg-secondary-400 rounded-full"
          animate={{
            y: [0, -15, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="glass card-modern p-8 shadow-2xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-accent-500 to-secondary-500 rounded-full mb-4 shadow-lg">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Student Portal
            </h1>
            <p className="text-gray-600 dark:text-gray-300 flex items-center justify-center gap-1">
              <BookOpen className="w-4 h-4" />
              Access your project dashboard
            </p>
          </motion.div>

          {/* Error Alert */}
          {errors.auth && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 p-4 bg-danger-50 border border-danger-200 rounded-lg"
            >
              <p className="text-danger-700 text-sm font-medium">{errors.auth}</p>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Student Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`input-modern pl-10 ${errors.email ? 'border-danger-300 focus:border-danger-500' : ''}`}
                  placeholder="Enter your student email"
                />
              </div>
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1 text-sm text-danger-600"
                >
                  {errors.email}
                </motion.p>
              )}
            </motion.div>

            {/* Password Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  className={`input-modern pl-10 pr-10 ${errors.password ? 'border-danger-300 focus:border-danger-500' : ''}`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1 text-sm text-danger-600"
                >
                  {errors.password}
                </motion.p>
              )}
            </motion.div>

            {/* Forgot Password Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-right"
            >
              <Link
                href="/resetPassword"
                className="text-sm text-accent-600 hover:text-accent-500 dark:text-accent-400 dark:hover:text-accent-300 transition-colors"
              >
                Forgot your password?
              </Link>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <button
                type="submit"
                disabled={loading}
                className="btn-modern w-full bg-gradient-to-r from-accent-500 to-secondary-500 hover:from-accent-600 hover:to-secondary-600 text-white disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                <span className="flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Signing In...
                    </>
                  ) : (
                    <>
                      Access Portal
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
              </button>
            </motion.div>

            {/* Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="space-y-3 text-center"
            >
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Need a student account?{' '}
                <Link
                  href="/signup"
                  className="font-medium text-accent-600 hover:text-accent-500 dark:text-accent-400 dark:hover:text-accent-300 transition-colors"
                >
                  Register here
                </Link>
              </p>
              <div className="flex items-center justify-center">
                <div className="border-t border-gray-300 dark:border-gray-600 flex-grow"></div>
                <span className="px-3 text-xs text-gray-500 dark:text-gray-400">OR</span>
                <div className="border-t border-gray-300 dark:border-gray-600 flex-grow"></div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Regular user?{' '}
                <Link
                  href="/login"
                  className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
                >
                  Login here
                </Link>
              </p>
            </motion.div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default StudentLogin;
