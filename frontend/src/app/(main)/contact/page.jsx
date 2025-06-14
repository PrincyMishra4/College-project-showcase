"use client";
import React, { useState } from "react";
import {
  MapPin,
  Mail,
  Phone,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  GitHub,
  ChevronDown,
  ChevronUp,
} from "react-feather";
import { motion } from "framer-motion";
import { ClientOnly } from "@/utils/clientUtils";
import { ClientParticlesBackground } from "@/components/ParticlesBackground";

// Animation variants
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  exit: { opacity: 0, y: 20 },
};

const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const pulseAnimation = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      repeat: Infinity,
      repeatType: "reverse",
      duration: 2,
    },
  },
};

const ContactCard = ({ icon, title, children }) => (
  <motion.div
    variants={itemVariants}
    whileHover={{
      scale: 1.03,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
    }}
    className="flex gap-4 p-5 rounded-lg transition-all hover:shadow-md hover:bg-gray-50 dark:hover:bg-neutral-800"
  >
    <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900">
      {icon}
    </div>
    <div className="grow">
      <p className="text-sm font-medium text-gray-600 dark:text-neutral-400">
        {title}
      </p>
      {children}
    </div>
  </motion.div>
);

const Contact = () => {
  const [activeTab, setActiveTab] = useState(null);

  const toggleTab = (index) => {
    setActiveTab(activeTab === index ? null : index);
  };

  // FAQ data
  const faqs = [
    {
      question: "How can I submit my project to be showcased?",
      answer:
        "To submit your project, log in to your student account and use the project submission form. Make sure to include details about your project, relevant images, and any links to GitHub or live demos.",
    },
    {
      question: "What are the requirements for project submissions?",
      answer:
        "Your project should be complete with documentation, source code, and preferably a demo. It should demonstrate your technical skills and knowledge acquired during your college courses.",
    },
    {
      question: "When is the next project showcase event?",
      answer:
        "Our next project showcase event is scheduled for May 15, 2025. Check the events calendar for more upcoming showcase opportunities and deadlines.",
    },
    {
      question: "Can I update my project after submission?",
      answer:
        "Yes, you can update your project details, images, and links at any time through your student dashboard. Make sure to keep your information current.",
    },
  ];

  return (
    <section className="bg-white dark:bg-neutral-900 py-16 sm:py-24 relative">
      {/* Add consistent particles for animation */}
      <ClientParticlesBackground
        particleCount={15}
        seed={654}
        particleClassName="bg-blue-400/20"
      />

      <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
        {/* Header */}
        <motion.div
          className="mb-12 text-center"
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          <span className="inline-block px-3 py-1 text-sm font-medium text-blue-600 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-200 mb-4">
            Get in Touch
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
            Contact Us
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            We&apos;d love to hear from you! Whether you have questions about
            our platform, need technical support, or want to learn more about
            showcasing your projects, our team is here to help.{" "}
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Map/Image */}
          <motion.div
            className="relative h-[400px] overflow-hidden rounded-2xl shadow-lg"
            initial="initial"
            animate="animate"
            variants={fadeIn}
          >
            <img
              className="h-full w-full object-cover transition-transform duration-700 ease-in-out hover:scale-105"
              src="https://images.unsplash.com/photo-1572021335469-31706a17aaef?q=80&w=1200&auto=format&fit=crop"
              alt="Our Office"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <p className="font-semibold text-xl">Glasgow Office</p>
              <p>Our main headquarters</p>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            className="space-y-8"
            initial="initial"
            animate="animate"
            variants={containerVariants}
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Contact Information
            </h2>

            <div className="grid grid-cols-1 gap-6">
              {/* Contact Cards with improved design */}
              <motion.div
                className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-neutral-700"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="flex p-5">
                  <div className="mr-5">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                      <MapPin className="w-5 h-5" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      Visit Our Campus
                    </h3>
                    <address className="not-italic text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      College of Technology and Innovation
                      <br />
                      300 Tech Campus Drive
                      <br />
                      Bangalore, Karnataka 560001
                    </address>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-neutral-700"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="flex p-5">
                  <div className="mr-5">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                      <Mail className="w-5 h-5" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      Email Us
                    </h3>
                    <div className="space-y-1">
                      <a
                        href="mailto:admissions@college.edu"
                        className="block text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        admissions@college.edu
                      </a>
                      <a
                        href="mailto:support@college.edu"
                        className="block text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        support@college.edu
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-neutral-700"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="flex p-5">
                  <div className="mr-5">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                      <Phone className="w-5 h-5" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      Call Us
                    </h3>
                    <div className="space-y-1">
                      <a
                        href="tel:+919876543210"
                        className="block text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        +91 987-654-3210 (Admissions)
                      </a>
                      <a
                        href="tel:+919876543200"
                        className="block text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        +91 987-654-3200 (General Inquiries)
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-neutral-700"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="flex p-5">
                  <div className="mr-5">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400">
                      <svg
                        className="w-5 h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      Office Hours
                    </h3>
                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      <div className="flex justify-between">
                        <span>Monday - Friday:</span>
                        <span className="font-medium">9:00 AM - 5:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Saturday:</span>
                        <span className="font-medium">9:00 AM - 1:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sunday:</span>
                        <span className="font-medium">Closed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* CTA Button */}
            <motion.div
              className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-800"
              variants={itemVariants}
            >
              <motion.a
                href="#contact-form"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Send us a message
                <svg
                  className="ml-2 w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>

        {/* Contact Form Section */}
        <motion.div
          className="mt-20 pt-16 border-t border-gray-200 dark:border-gray-800"
          initial="initial"
          animate="animate"
          variants={fadeIn}
          id="contact-form"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Get in Touch
              </h2>
              <p className="text-gray-600 mb-4">
                Can&apos;t find what you&apos;re looking for? Send us a message
                and we&apos;ll get back to you as soon as possible.
              </p>

              <motion.div
                className="mb-8 overflow-hidden rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop"
                  alt="Team collaboration"
                  className="w-full h-auto rounded-xl transform transition-transform duration-500 hover:scale-105"
                />
              </motion.div>

              {/* Social Media Links */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Connect With Us
                </h3>
                <div className="flex space-x-4">
                  <motion.a
                    href="#"
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-800 transition-colors"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Facebook size={18} />
                  </motion.a>
                  <motion.a
                    href="#"
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-800 transition-colors"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Twitter size={18} />
                  </motion.a>
                  <motion.a
                    href="#"
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-800 transition-colors"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Linkedin size={18} />
                  </motion.a>
                  <motion.a
                    href="#"
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-800 transition-colors"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Instagram size={18} />
                  </motion.a>
                  <motion.a
                    href="#"
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-800 transition-colors"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <GitHub size={18} />
                  </motion.a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <motion.div
              className="bg-white dark:bg-neutral-800 rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100 dark:border-neutral-700"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                      placeholder="Your first name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                      placeholder="Your last name"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    placeholder="Your message here..."
                  ></textarea>
                </div>

                <div>
                  <motion.button
                    type="submit"
                    className="w-full px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Send Message
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          className="mt-20 pt-16 border-t border-gray-200 dark:border-gray-800"
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Get quick answers to common questions about our project showcase
              platform.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="mb-4 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
              >
                <button
                  className="flex items-center justify-between w-full px-6 py-4 text-left bg-white dark:bg-neutral-800 hover:bg-gray-50 dark:hover:bg-neutral-700 transition-colors"
                  onClick={() => toggleTab(index)}
                >
                  <span className="font-medium text-gray-900 dark:text-white">
                    {faq.question}
                  </span>
                  {activeTab === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  )}
                </button>
                <motion.div
                  className="overflow-hidden"
                  initial={{ height: 0 }}
                  animate={{
                    height: activeTab === index ? "auto" : 0,
                    opacity: activeTab === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="px-6 py-4 bg-gray-50 dark:bg-neutral-700/50 text-gray-700 dark:text-gray-300">
                    {faq.answer}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Interactive Map */}
        <motion.div
          className="mt-20 pt-16 border-t border-gray-200 dark:border-gray-800"
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Find Us On Campus
          </h2>
          <div className="overflow-hidden rounded-xl shadow-lg h-[500px] border border-gray-200 dark:border-gray-700">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.9852035149363!2d77.55694371538972!3d12.978244418099676!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae17aa2624fbed%3A0x6c75ab0ea1e5170a!2sKusuma%20College%20-%20Bangalore!5e0!3m2!1sen!2sin!4v1630505208954!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Campus Location"
            ></iframe>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
