'use client';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import Image from 'next/image';

const AddStudent = () => {
  const [imagePreview, setImagePreview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const AddStudentForm = useFormik({
    initialValues: {
      name: '',
      rollno: '',
      email: '',
      password: '',
      department: '',
      image: '',
      githubprofile: '',
      linkedinprofile: '',
      course: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      rollno: Yup.string().required('Roll number is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
      department: Yup.string().required('Department is required'),
      githubprofile: Yup.string().required('GitHub profile is required'),
      linkedinprofile: Yup.string().required('LinkedIn profile is required'),
      course: Yup.string().required('Course is required')
    }),
    onSubmit: (values, { resetForm }) => {
      setIsSubmitting(true);
      axios.post('http://localhost:5000/student/add', values)
        .then((result) => {
          console.log(result.data);
          toast.success('Student added successfully');
          resetForm();
          setImagePreview('');
        })
        .catch((err) => {
          console.log(err);
          if (err.response && err.response.data && err.response.data.code === 11000) {
            toast.error('Roll number already exists');
          } else {
            toast.error('Failed to add student');
          }
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    },
  });

  const uploadImage = (e) => {
    const file = e.target.files[0];
    const fd = new FormData();
    fd.append('file', file);
    fd.append('upload_preset', 'collegeproject');
    fd.append('cloud_name', 'dcii9mcsm');

    toast.loading('Uploading image...');
    axios.post('https://api.cloudinary.com/v1_1/dcii9mcsm/image/upload', fd)
      .then((result) => {
        toast.dismiss();
        toast.success('Image uploaded successfully');
        console.log(result.data);
        setImagePreview(result.data.url);
        AddStudentForm.setFieldValue('image', result.data.url);
      }).catch((err) => {
        toast.dismiss();
        console.log(err);
        toast.error('Failed to upload image');
      });
  };

  // Animation variants
  const pageAnimation = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        duration: 0.6,
        staggerChildren: 0.1
      } 
    }
  };

  const formItemAnimation = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 20
      }
    }
  };
  
  const cardAnimation = {
    hidden: { y: 20, opacity: 0, scale: 0.98 },
    visible: { 
      y: 0, 
      opacity: 1, 
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 15,
        delay: 0.1
      }
    }
  };
  
  return (
    <motion.div 
      className="min-h-screen py-12 px-4 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 bg-fixed"
      initial="hidden"
      animate="visible"
      variants={pageAnimation}
    >
      <div className="absolute inset-0 bg-[url('/logocps.png')] opacity-5 bg-center bg-no-repeat bg-contain pointer-events-none"></div>
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:30px_30px] pointer-events-none"></div>
      
      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.h1 
          variants={formItemAnimation} 
          className="text-5xl font-bold text-center mb-10 text-white tracking-tight drop-shadow-lg"
        >
          Add New Student
        </motion.h1>
        
        <motion.div 
          variants={cardAnimation}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-2xl rounded-2xl overflow-hidden border border-white/20 dark:border-gray-700/50"
        >
          <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-2"></div>
          <div className="p-8">
            <form onSubmit={AddStudentForm.handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left column */}
                <div className="space-y-6">
                  <motion.div variants={formItemAnimation} className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Full Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      onChange={AddStudentForm.handleChange}
                      onBlur={AddStudentForm.handleBlur}
                      value={AddStudentForm.values.name}
                      placeholder="Enter student's full name"
                    />
                    {AddStudentForm.touched.name && AddStudentForm.errors.name && (
                      <p className="text-sm text-red-600 mt-1">{AddStudentForm.errors.name}</p>
                    )}
                  </motion.div>

                  <motion.div variants={formItemAnimation} className="space-y-2">
                    <label htmlFor="rollno" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Roll Number
                    </label>
                    <input
                      id="rollno"
                      name="rollno"
                      type="text"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      onChange={AddStudentForm.handleChange}
                      onBlur={AddStudentForm.handleBlur}
                      value={AddStudentForm.values.rollno}
                      placeholder="Enter unique roll number"
                    />
                    {AddStudentForm.touched.rollno && AddStudentForm.errors.rollno && (
                      <p className="text-sm text-red-600 mt-1">{AddStudentForm.errors.rollno}</p>
                    )}
                  </motion.div>

                  <motion.div variants={formItemAnimation} className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      onChange={AddStudentForm.handleChange}
                      onBlur={AddStudentForm.handleBlur}
                      value={AddStudentForm.values.email}
                      placeholder="student@example.com"
                    />
                    {AddStudentForm.touched.email && AddStudentForm.errors.email && (
                      <p className="text-sm text-red-600 mt-1">{AddStudentForm.errors.email}</p>
                    )}
                  </motion.div>

                  <motion.div variants={formItemAnimation} className="space-y-2">
                    <label htmlFor="password" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      onChange={AddStudentForm.handleChange}
                      onBlur={AddStudentForm.handleBlur}
                      value={AddStudentForm.values.password}
                      placeholder="Minimum 6 characters"
                    />
                    {AddStudentForm.touched.password && AddStudentForm.errors.password && (
                      <p className="text-sm text-red-600 mt-1">{AddStudentForm.errors.password}</p>
                    )}
                  </motion.div>
                </div>

                {/* Right column */}
                <div className="space-y-6">
                  <motion.div variants={formItemAnimation} className="space-y-2">
                    <label htmlFor="department" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Department
                    </label>
                    <select
                      id="department"
                      name="department"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      onChange={AddStudentForm.handleChange}
                      onBlur={AddStudentForm.handleBlur}
                      value={AddStudentForm.values.department}
                    >
                      <option value="">Select Department</option>
                      <option value="Computer Science">Computer Science</option>
                      <option value="Information Technology">Information Technology</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Mechanical">Mechanical</option>
                      <option value="Civil">Civil</option>
                      <option value="Electrical">Electrical</option>
                    </select>
                    {AddStudentForm.touched.department && AddStudentForm.errors.department && (
                      <p className="text-sm text-red-600 mt-1">{AddStudentForm.errors.department}</p>
                    )}
                  </motion.div>

                  <motion.div variants={formItemAnimation} className="space-y-2">
                    <label htmlFor="course" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Course
                    </label>
                    <select
                      id="course"
                      name="course"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      onChange={AddStudentForm.handleChange}
                      onBlur={AddStudentForm.handleBlur}
                      value={AddStudentForm.values.course}
                    >
                      <option value="">Select Course</option>
                      <option value="BTech">BTech</option>
                      <option value="MTech">MTech</option>
                      <option value="BCA">BCA</option>
                      <option value="MCA">MCA</option>
                      <option value="BSc">BSc</option>
                      <option value="MSc">MSc</option>
                    </select>
                    {AddStudentForm.touched.course && AddStudentForm.errors.course && (
                      <p className="text-sm text-red-600 mt-1">{AddStudentForm.errors.course}</p>
                    )}
                  </motion.div>

                  <motion.div variants={formItemAnimation} className="space-y-2">
                    <label htmlFor="githubprofile" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                      GitHub Profile
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.48 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0112 6.839a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.933.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.165 22 16.418 22 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <input
                        id="githubprofile"
                        name="githubprofile"
                        type="text"
                        placeholder="https://github.com/username"
                        className="w-full pl-10 px-4 py-3 border border-gray-200 rounded-lg shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                        onChange={AddStudentForm.handleChange}
                        onBlur={AddStudentForm.handleBlur}
                        value={AddStudentForm.values.githubprofile}
                      />
                    </div>
                    {AddStudentForm.touched.githubprofile && AddStudentForm.errors.githubprofile && (
                      <p className="text-sm text-red-600 mt-1">{AddStudentForm.errors.githubprofile}</p>
                    )}
                  </motion.div>

                  <motion.div variants={formItemAnimation} className="space-y-2">
                    <label htmlFor="linkedinprofile" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                      LinkedIn Profile
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
                        </svg>
                      </div>
                      <input
                        id="linkedinprofile"
                        name="linkedinprofile"
                        type="text"
                        placeholder="https://linkedin.com/in/username"
                        className="w-full pl-10 px-4 py-3 border border-gray-200 rounded-lg shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                        onChange={AddStudentForm.handleChange}
                        onBlur={AddStudentForm.handleBlur}
                        value={AddStudentForm.values.linkedinprofile}
                      />
                    </div>
                    {AddStudentForm.touched.linkedinprofile && AddStudentForm.errors.linkedinprofile && (
                      <p className="text-sm text-red-600 mt-1">{AddStudentForm.errors.linkedinprofile}</p>
                    )}
                  </motion.div>
                </div>
              </div>

              {/* Image upload section - full width */}
              <motion.div variants={formItemAnimation} className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                <label htmlFor="image" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Profile Image
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <label className="cursor-pointer bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-medium px-6 py-3 rounded-lg shadow-md transition-all duration-200 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                    </svg>
                    <span>Upload Photo</span>
                    <input
                      id="image"
                      name="image"
                      type="file"
                      className="hidden"
                      onChange={uploadImage}
                      accept="image/*"
                    />
                  </label>                  {imagePreview ? (
                    <div className="relative w-24 h-24 overflow-hidden rounded-full border-4 border-white shadow-lg">
                      <Image
                        src={imagePreview}
                        alt="Profile Preview"
                        width={96}
                        height={96}
                        className="object-cover w-full h-full"
                      />
                      <button 
                        type="button" 
                        onClick={() => {
                          setImagePreview('');
                          AddStudentForm.setFieldValue('image', '');
                        }}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 transform translate-x-1/3 -translate-y-1/3 hover:bg-red-600"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                  <p className="text-sm text-gray-500 italic mt-2 sm:mt-0">Upload a professional profile photo</p>
                </div>
                {AddStudentForm.touched.image && AddStudentForm.errors.image && (
                  <p className="text-sm text-red-600 mt-1">{AddStudentForm.errors.image}</p>
                )}
              </motion.div>

              <motion.div 
                variants={formItemAnimation}
                className="flex justify-end pt-6 border-t border-gray-100 dark:border-gray-700"
              >
                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-medium rounded-lg shadow-lg hover:from-indigo-700 hover:to-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 flex items-center gap-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                      </svg>
                      <span>Add Student</span>
                    </>
                  )}
                </motion.button>
              </motion.div>
            </form>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AddStudent;
