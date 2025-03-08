'use client';
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "tailwindcss/tailwind.css";

const images = [
  { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3lYxQoGnxZRKUUdgQMGSCTdPZrdc8YDD06A&s", title: "" },
  { src: "https://www.simplilearn.com/ice9/free_resources_article_thumb/What_Is_a_Project.jpg", title: "" },
  { src: "https://pmstudycircle.com/wp-content/uploads/2021/06/project.jpg", title: "" },
];

const HomePageSlider = () => {
  const [current, setCurrent] = useState(0);
  const length = images.length;

  const nextSlide = () => setCurrent((prev) => (prev + 1) % length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + length) % length);

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="relative w-full h-screen flex justify-end items-center overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: "url('https://www.crio.do/blog/content/images/size/w600/2020/09/Sep_01.png')" }}
    >
      <div className="absolute inset-y-0 right-0 flex items-center justify-end pr-10">
        <motion.div key={current} className="relative flex gap-4 p-6">
          {images.map((image, index) => (
            <motion.div
              key={index}
              className={`relative w-64 h-96 bg-gray-800 rounded-xl overflow-hidden transition-all duration-700 shadow-lg ${
                index === current ? "scale-110 z-10" : "scale-90 opacity-70"
              }`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: index === current ? 1 : 0.3, scale: index === current ? 1.1 : 0.7 }}
              transition={{ duration: 0.5 }}
            >
              <img src={image.src} alt={image.title} className="w-full h-full object-cover" />
              <div className="absolute bottom-4 left-4 text-white text-lg font-bold bg-black bg-opacity-50 px-4 py-2 rounded-lg">
                {image.title}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      {/* <button
        className="absolute left-5 text-white bg-black bg-opacity-50 p-3 rounded-full z-20"
        onClick={prevSlide}
      >
        <ChevronLeft size={30} />
      </button>
      <button
        className="absolute right-5 text-white bg-black bg-opacity-50 p-3 rounded-full z-20"
        onClick={nextSlide}
      >
        <ChevronRight size={30} />
      </button> */}
    </div>
  );
};

export default HomePageSlider;
