"use client";
import React from "react";
import Link from "next/link";

const Navbar = () => (
  <nav className="flex justify-between items-center p-4 bg-white shadow-md">
    
  </nav>
);

const Hero = () => (
  <section className="flex flex-col md:flex-row items-center justify-between p-10 bg-orange-100">
    <div>
      <h2 className="text-4xl font-bold">Manage the day to day</h2>
      <p className="mt-4 text-gray-600">Get all the tools and insights you need to manage your work efficiently.</p>
      <button className="mt-6 px-6 py-2 bg-orange-500 text-white rounded-lg">Get Started</button>
    </div>
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTX_fPQRhuGSgerpI3xrxmNP-4-KFN5pNfIWQ&s" alt="Office Illustration" className="w-1/2" />
  </section>
);
const Browsedepartment = () => {
  return (
    <div>
      <Navbar />
      <Hero />
    </div>
  );
};

export default Browsedepartment;
