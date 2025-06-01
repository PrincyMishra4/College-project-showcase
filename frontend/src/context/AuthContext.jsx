'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

// Create context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();    // Check if user is already logged in on initial load
    useEffect(() => {
        const checkLoggedIn = async () => {
            try {
                // Get the token
                const token = localStorage.getItem('token');
                if (!token) {
                    setLoading(false);
                    return;
                }
                
                // Verify token with backend
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/verify`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                
                if (response.data.valid) {
                    // Set user data
                    setUser({
                        name: response.data.user.name,
                        email: response.data.user.email,
                        id: response.data.user._id || response.data.user.id,
                        role: response.data.user.role
                    });
                } else {
                    // Token is invalid
                    localStorage.removeItem('token');
                    setUser(null);
                }
            } catch (error) {
                console.error('Auth check error:', error);
                
                // More detailed error handling
                if (error.response) {
                    if (error.response.status === 404) {
                        console.warn('Verify endpoint not found. Please check your backend API configuration.');
                    } else if (error.response.status === 401) {
                        console.warn('Authentication token is invalid or expired.');
                        toast.error("Session expired. Please login again.");
                    }
                } else if (error.request) {
                    console.warn('No response received from the server. Is your backend running?');
                    toast.error("Cannot connect to server");
                }
                
                // Clear authentication on error
                localStorage.removeItem('token');
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkLoggedIn();
    }, []);// Login function
    const login = async (email, password) => {
        try {
            setLoading(true);
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/authenticate`, {
                email,
                password
            });

            if (response.data.token) {
                // Save token to localStorage
                localStorage.setItem('token', response.data.token);
                
                // Set user data
                setUser({
                    name: response.data.user.name,
                    email: response.data.user.email,
                    id: response.data.user.id,
                    role: response.data.user.role
                });
                
                toast.success('Login successful!');
                
                // Redirect based on user role
                if (response.data.user.role === 'admin') {
                    router.push('/admin');
                } else {
                    router.push('/');
                }
                
                return true;
            }
            return false;
        } catch (error) {
            console.error('Login error:', error);
            toast.error(error.response?.data?.message || 'Login failed');
            return false;
        } finally {
            setLoading(false);
        }
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        toast.success('Logged out successfully');
        router.push('/');
    };

    // Register function
    const register = async (name, email, password) => {
        try {
            setLoading(true);
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/add`, {
                name,
                email,
                password
            });
            
            toast.success('Registration successful! Please login.');
            router.push('/login');
            return true;
        } catch (error) {
            console.error('Registration error:', error);
            toast.error(error.response?.data?.message || 'Registration failed');
            return false;
        } finally {
            setLoading(false);
        }
    };

    // Check if user is authenticated
    const isAuthenticated = !!user;

    // Get auth token
    const getToken = () => localStorage.getItem('token');

    return (
        <AuthContext.Provider 
            value={{ 
                user, 
                loading, 
                login, 
                logout, 
                register, 
                isAuthenticated,
                getToken
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext;