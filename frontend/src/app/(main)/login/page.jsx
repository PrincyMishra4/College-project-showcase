'use client';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

const ISSERVER = typeof window === "undefined";

const Login = () => {    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { login } = useAuth();

    // Form validation schema
    const loginSchema = Yup.object().shape({
        email: Yup.string()
            .email('Please enter a valid email')
            .required('Email is required'),
        password: Yup.string()
            .required('Password is required')
    });

    const loginform = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: loginSchema,
        onSubmit: async (values, { resetForm }) => {
            setIsLoading(true);
            try {
                const success = await login(values.email, values.password);
                if (success) {
                    // The login function in AuthContext already handles redirection based on user role
                    // No need to redirect here as it's handled in the AuthContext
                }
            } catch (error) {
                // Error handling is done within the login function in AuthContext
                console.error("Login error:", error);
            } finally {
                setIsLoading(false);
            }
        },
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-secondary-900 dark:via-secondary-800 dark:to-secondary-900 flex items-center justify-center p-4">
            {/* Background decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-primary-400/20 to-accent-400/20 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
                <motion.div
                    className="absolute -bottom-10 -left-10 w-60 h-60 bg-gradient-to-tr from-accent-400/20 to-primary-400/20 rounded-full blur-3xl"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        rotate: [360, 180, 0],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full max-w-md"
            >
                <form onSubmit={loginform.handleSubmit}>
                    <div className="glass rounded-2xl shadow-2xl shadow-primary-500/10 border border-white/20 dark:border-secondary-700/50 overflow-hidden">
                        {/* Header */}
                        <div className="relative p-8 text-center bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 dark:from-primary-700 dark:to-primary-900">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-4 backdrop-blur-sm"
                            >
                                <Sparkles className="w-8 h-8 text-white" />
                            </motion.div>
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-3xl font-bold text-white mb-2"
                            >
                                Welcome Back
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="text-primary-100 opacity-90"
                            >
                                Sign in to continue to your dashboard
                            </motion.p>
                        </div>

                        {/* Form Body */}
                        <div className="p-8 bg-white/80 dark:bg-secondary-800/80 backdrop-blur-sm">
                            <div className="space-y-6">
                                {/* Email Field */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Mail className="h-5 w-5 text-secondary-400" />
                                        </div>
                                        <input
                                            id='email'
                                            name='email'
                                            type="email"
                                            onChange={loginform.handleChange}
                                            onBlur={loginform.handleBlur}
                                            value={loginform.values.email}
                                            className={`input-modern pl-10 ${loginform.touched.email && loginform.errors.email ? 'border-red-500' : ''}`}
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                    {loginform.touched.email && loginform.errors.email && (
                                        <p className="mt-1 text-sm text-red-500">{loginform.errors.email}</p>
                                    )}
                                </motion.div>

                                {/* Password Field */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.6 }}
                                >
                                    <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Lock className="h-5 w-5 text-secondary-400" />
                                        </div>
                                        <input
                                            id='password'
                                            name='password'
                                            type={showPassword ? "text" : "password"}
                                            onChange={loginform.handleChange}
                                            onBlur={loginform.handleBlur}
                                            value={loginform.values.password}
                                            className={`input-modern pl-10 pr-10 ${loginform.touched.password && loginform.errors.password ? 'border-red-500' : ''}`}
                                            placeholder="Enter your password"
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-5 w-5 text-secondary-400 hover:text-secondary-600" />
                                            ) : (
                                                <Eye className="h-5 w-5 text-secondary-400 hover:text-secondary-600" />
                                            )}
                                        </button>
                                    </div>
                                    {loginform.touched.password && loginform.errors.password && (
                                        <p className="mt-1 text-sm text-red-500">{loginform.errors.password}</p>
                                    )}
                                </motion.div>

                                {/* Forgot Password */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.7 }}
                                    className="text-right"
                                >
                                    <Link
                                        href="/resetPassword"
                                        className="text-sm font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
                                    >
                                        Forgot your password?
                                    </Link>
                                </motion.div>

                                {/* Login Button */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.8 }}
                                >
                                    <motion.button
                                        type="submit"
                                        disabled={isLoading}
                                        className="btn-modern w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white py-3 px-6 shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 hover:scale-[1.02] focus-ring disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <span className="flex items-center justify-center">
                                            {isLoading ? 'Signing in...' : 'Sign In'}
                                            {!isLoading && <ArrowRight className="ml-2 h-5 w-5" />}
                                        </span>
                                    </motion.button>
                                </motion.div>

                                {/* Sign Up Link */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.9 }}
                                    className="text-center"
                                >
                                    <p className="text-sm text-secondary-600 dark:text-secondary-400">
                                        Don't have an account?{' '}
                                        <Link
                                            href="/signup"
                                            className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
                                        >
                                            Create an account
                                        </Link>
                                    </p>
                                    <p className="text-sm text-secondary-600 dark:text-secondary-400">
                                        Student login?{' '}
                                        <Link
                                            href="/student-login"
                                            className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
                                        >
                                            login as student
                                        </Link>
                                    </p>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default Login;
