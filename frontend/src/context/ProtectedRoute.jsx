'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from './AuthContext';

export default function ProtectedRoute({ children, adminOnly = false }) {
    const { isAuthenticated, user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        // Only redirect after authentication check is complete
        if (loading) return;

        // Redirect if not authenticated
        if (!isAuthenticated) {
            router.push('/login');
        }
        
        // Redirect if adminOnly and user is not admin
        if (adminOnly && user?.role !== 'admin') {
            router.push('/');
        }
    }, [isAuthenticated, loading, adminOnly, user, router]);

    // Show loading state if still checking authentication
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="mt-4 text-gray-600 dark:text-gray-300">Checking authentication...</p>
                </div>
            </div>
        );
    }

    // If authenticated (and admin if required), render the children
    if (isAuthenticated && (!adminOnly || user?.role === 'admin')) {
        return children;
    }

    // Default case: render nothing while redirecting
    return null;
}
