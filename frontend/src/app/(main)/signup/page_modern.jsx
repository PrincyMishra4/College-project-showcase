'use client';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, UserPlus, ArrowRight, Sparkles, Shield } from 'lucide-react';

const ISSERVER = typeof window === "undefined";

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const signupform = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        validate: (values) => {
            const errors = {};
            if (!values.name) {
                errors.name = 'Name is required';
            }
            if (!values.email) {
                errors.email = 'Email is required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Password is required';
            } else if (values.password.length < 6) {
                errors.password = 'Password must be at least 6 characters';
            }
            if (!values.confirmPassword) {
                errors.confirmPassword = 'Please confirm your password';
            } else if (values.password !== values.confirmPassword) {
                errors.confirmPassword = 'Passwords do not match';
            }
            return errors;
        },
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            console.log(values);
            setIsSubmitting(true);
            setSubmitting(true);
            
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/add`, {
                    method: 'POST',
                    body: JSON.stringify(values),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (res.status === 200) {
                    toast.success('Account Created Successfully');
                    const data = await res.json();
                    !ISSERVER && localStorage.setItem('user', JSON.stringify(data));
                    router.push('/login');
                } else if (res.status === 401) {
                    toast.error('User Already Exists');
                } else {
                    toast.error('Something went wrong');
                }
            } catch (error) {
                console.error('Signup error:', error);
                toast.error('Network error occurred');
            } finally {
                setIsSubmitting(false);
                setSubmitting(false);
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
                        ease: "linear",
                    }}
                />
                <motion.div
                    className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-tr from-secondary-400/20 to-primary-400/20 rounded-full blur-2xl"
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
                    className="absolute top-2/3 right-1/3 w-1 h-1 bg-primary-400 rounded-full"
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
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full mb-4 shadow-lg">
                            <UserPlus className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            Create Account
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300 flex items-center justify-center gap-1">
                            <Sparkles className="w-4 h-4" />
                            Join the showcase community
                        </p>
                    </motion.div>

                    {/* Form */}
                    <form onSubmit={signupform.handleSubmit} className="space-y-6">
                        {/* Name Field */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Full Name
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    id="name"
                                    type="text"
                                    {...signupform.getFieldProps('name')}
                                    className={`input-modern pl-10 ${signupform.touched.name && signupform.errors.name ? 'border-danger-300 focus:border-danger-500' : ''}`}
                                    placeholder="Enter your full name"
                                />
                            </div>
                            {signupform.touched.name && signupform.errors.name && (
                                <motion.p
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-1 text-sm text-danger-600"
                                >
                                    {signupform.errors.name}
                                </motion.p>
                            )}
                        </motion.div>

                        {/* Email Field */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    id="email"
                                    type="email"
                                    {...signupform.getFieldProps('email')}
                                    className={`input-modern pl-10 ${signupform.touched.email && signupform.errors.email ? 'border-danger-300 focus:border-danger-500' : ''}`}
                                    placeholder="Enter your email"
                                />
                            </div>
                            {signupform.touched.email && signupform.errors.email && (
                                <motion.p
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-1 text-sm text-danger-600"
                                >
                                    {signupform.errors.email}
                                </motion.p>
                            )}
                        </motion.div>

                        {/* Password Field */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                        >
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    {...signupform.getFieldProps('password')}
                                    className={`input-modern pl-10 pr-10 ${signupform.touched.password && signupform.errors.password ? 'border-danger-300 focus:border-danger-500' : ''}`}
                                    placeholder="Create a password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {signupform.touched.password && signupform.errors.password && (
                                <motion.p
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-1 text-sm text-danger-600"
                                >
                                    {signupform.errors.password}
                                </motion.p>
                            )}
                        </motion.div>

                        {/* Confirm Password Field */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                        >
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    {...signupform.getFieldProps('confirmPassword')}
                                    className={`input-modern pl-10 pr-10 ${signupform.touched.confirmPassword && signupform.errors.confirmPassword ? 'border-danger-300 focus:border-danger-500' : ''}`}
                                    placeholder="Confirm your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {signupform.touched.confirmPassword && signupform.errors.confirmPassword && (
                                <motion.p
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-1 text-sm text-danger-600"
                                >
                                    {signupform.errors.confirmPassword}
                                </motion.p>
                            )}
                        </motion.div>

                        {/* Submit Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.7 }}
                        >
                            <button
                                type="submit"
                                disabled={isSubmitting || !signupform.isValid}
                                className="btn-modern w-full bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white disabled:opacity-50 disabled:cursor-not-allowed group"
                            >
                                <span className="flex items-center justify-center gap-2">
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Creating Account...
                                        </>
                                    ) : (
                                        <>
                                            Create Account
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </span>
                            </button>
                        </motion.div>

                        {/* Login Link */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                            className="text-center"
                        >
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Already have an account?{' '}
                                <Link
                                    href="/login"
                                    className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
                                >
                                    Sign in here
                                </Link>
                            </p>
                        </motion.div>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default Signup;
