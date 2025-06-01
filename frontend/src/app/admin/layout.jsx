'use client';
import React from 'react'

import Footer from '../../components/Footer';
import ProtectedRoute from '../../context/ProtectedRoute';
import Navbar from './Navbar';

const Layout = ({ children }) => {
    return (
        <ProtectedRoute adminOnly={true}>
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-grow">
                    {children}
                </main>
                <Footer />
            </div>
        </ProtectedRoute>
    )
}

export default Layout;