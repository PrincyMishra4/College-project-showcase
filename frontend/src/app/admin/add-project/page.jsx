'use client';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const AddProject = () => {

  const [studentlist, setStudentlist] = useState([]);
  const [imageUrl, setImageUrl] = useState('');

  const AddProjectForm = useFormik({
    initialValues: {
      title: '',
      description: '',
      githublink: '',
      viewlink: '',
      category: '',
      department: '',
      developedby: '',
      approved: true,
    },
    validationSchema: Yup.object({
      title: Yup.string().required('title is required'),
      department: Yup.string().required('Department is required'),
      // rollno: Yup.string().required('Roll number is required'),
      // course: Yup.string().required('Course is required'),
    }),
    onSubmit: (values, {resetForm}) => { //use
      // console.log('Form submitted:', values);
      
      axios.post('http://localhost:5000/project/add', values)
      .then((result) => {
        console.log(result.data);
        toast.success('Add Project Successfully');
        resetForm(); // Reset the form after successful submission
      })
      .catch((err) => {
        console.log(err);
        toast.error('Something went wrong');
      });

    },
  });

  const upload = (e) => {

    const file = e.target.files[0];
    const fd = new FormData();
    fd.append('file', file);
    fd.append('upload_preset', 'collegeproject')
    fd.append('colud_name', 'dcii9mcsm')

    axios.post('https://api.cloudinary.com/v1_1/dcii9mcsm/image/upload', fd)
        .then((result) => {
            toast.success('file upload successfully');
            console.log(result.data);
            // setPreview(result.data.url);
            AddProjectForm.setFieldValue('image', result.data.url);
        }).catch((err) => {
            console.log(err);
            toast.error('failed to upload file');

        });
}

  const Videoupload = (e) => {

    const file = e.target.files[0];
    const fd = new FormData();
    fd.append('file', file);
    fd.append('upload_preset', 'collegeproject')
    fd.append('colud_name', 'dcii9mcsm')

    axios.post('https://api.cloudinary.com/v1_1/dcii9mcsm/video/upload', fd)
        .then((result) => {
            toast.success('file upload successfully');
            console.log(result.data);
            // setPreview(result.data.url);
            AddProjectForm.setFieldValue('video', result.data.url);
        }).catch((err) => {
            console.log(err);
            toast.error('failed to upload file');

        });
}


  const fetchStudentlist = async () => {
    try {
      const response = await axios.get('http://localhost:5000/student/getall');
      console.log(response.data);
      setStudentlist(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStudentlist();
  }, [])

 
 
  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-gray-800 rounded-lg shadow-xl overflow-hidden">
        <div className="px-6 py-8">
          <h1 className="text-3xl font-bold text-center text-white mb-8">
            <span className="px-4 py-1 rounded-md">Add Project</span>
          </h1>
          
          <form onSubmit={AddProjectForm.handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title Field */}
              <div className="space-y-2">
                <label htmlFor="title" className="block text-sm font-medium text-gray-200">
                  Project Title
                </label>
                <input
                  id="title"
                  type="text"
                  className="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  placeholder="Enter project title"
                  onChange={AddProjectForm.handleChange}
                  onBlur={AddProjectForm.handleBlur}
                  value={AddProjectForm.values.title}
                />
                {AddProjectForm.touched.title && AddProjectForm.errors.title && (
                  <span className="text-sm text-red-500">{AddProjectForm.errors.title}</span>
                )}
              </div>

              {/* Category Field */}
              <div className="space-y-2">
                <label htmlFor="category" className="block text-sm font-medium text-gray-200">
                  Category
                </label>
                <input
                  id="category"
                  type="text"
                  className="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  placeholder="Web, Mobile, AI, etc."
                  onChange={AddProjectForm.handleChange}
                  onBlur={AddProjectForm.handleBlur}
                  value={AddProjectForm.values.category}
                />
                {AddProjectForm.touched.category && AddProjectForm.errors.category && (
                  <span className="text-sm text-red-500">{AddProjectForm.errors.category}</span>
                )}
              </div>
            </div>

            {/* Department Field */}
            <div className="space-y-2">
              <label htmlFor="department" className="block text-sm font-medium text-gray-200">
                Department
              </label>
              <select
                id="department"
                className="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                onChange={AddProjectForm.handleChange}
                onBlur={AddProjectForm.handleBlur}
                value={AddProjectForm.values.department}
              >
                <option value="">Select Department</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Electrical Engineering">Electrical Engineering</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
                <option value="Civil Engineering">Civil Engineering</option>
                <option value="Business Administration">Business Administration</option>
                <option value="Fine Arts">Fine Arts</option>
              </select>
              {AddProjectForm.touched.department && AddProjectForm.errors.department && (
                <span className="text-sm text-red-500">{AddProjectForm.errors.department}</span>
              )}
            </div>

            {/* Description Field */}
            <div className="space-y-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-200">
                Description
              </label>
              <textarea
                id="description"
                rows="4"
                className="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                placeholder="Describe your project"
                onChange={AddProjectForm.handleChange}
                onBlur={AddProjectForm.handleBlur}
                value={AddProjectForm.values.description}
              ></textarea>
              {AddProjectForm.touched.description && AddProjectForm.errors.description && (
                <span className="text-sm text-red-500">{AddProjectForm.errors.description}</span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Image Upload */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-200">
                  Project Image
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-md bg-gray-700 hover:bg-gray-650 transition duration-200">
                  <div className="space-y-1 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="flex text-sm text-gray-400">
                      <label htmlFor="upload" className="relative cursor-pointer bg-gray-700 rounded-md font-medium text-blue-500 hover:text-blue-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                        <span>Upload an image</span>
                        <input id="upload" type="file" onChange={upload} className="sr-only" />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-400">PNG, JPG, GIF up to 10MB</p>
                    {AddProjectForm.values.image && (
                      <p className="text-sm text-green-500 mt-2">✓ Image selected</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Video Upload */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-200">
                  Project Video
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-md bg-gray-700 hover:bg-gray-650 transition duration-200">
                  <div className="space-y-1 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <div className="flex text-sm text-gray-400">
                      <label htmlFor="Videoupload" className="relative cursor-pointer bg-gray-700 rounded-md font-medium text-blue-500 hover:text-blue-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                        <span>Upload a video</span>
                        <input id="Videoupload" type="file" onChange={Videoupload} className="sr-only" accept="video/*" />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-400">MP4, WebM (Max: 100MB)</p>
                    {AddProjectForm.values.video && (
                      <p className="text-sm text-green-500 mt-2">✓ Video selected</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* GitHub Link */}
              <div className="space-y-2">
                <label htmlFor="githublink" className="block text-sm font-medium text-gray-200">
                  GitHub Link
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </div>
                  <input
                    id="githublink"
                    type="url"
                    className="w-full pl-10 px-4 py-2 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    placeholder="https://github.com/username/repo"
                    onChange={AddProjectForm.handleChange}
                    onBlur={AddProjectForm.handleBlur}
                    value={AddProjectForm.values.githublink}
                  />
                </div>
                {AddProjectForm.touched.githublink && AddProjectForm.errors.githublink && (
                  <span className="text-sm text-red-500">{AddProjectForm.errors.githublink}</span>
                )}
              </div>

              {/* View Link */}
              <div className="space-y-2">
                <label htmlFor="viewlink" className="block text-sm font-medium text-gray-200">
                  Live Demo Link
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                  <input
                    id="viewlink"
                    type="url"
                    className="w-full pl-10 px-4 py-2 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    placeholder="https://your-project.com"
                    onChange={AddProjectForm.handleChange}
                    onBlur={AddProjectForm.handleBlur}
                    value={AddProjectForm.values.viewlink}
                  />
                </div>
                {AddProjectForm.touched.viewlink && AddProjectForm.errors.viewlink && (
                  <span className="text-sm text-red-500">{AddProjectForm.errors.viewlink}</span>
                )}
              </div>
            </div>

            {/* Developed By */}
            <div className="space-y-2">
              <label htmlFor="developedby" className="block text-sm font-medium text-gray-200">
                Developed By
              </label>
              <div className="relative">
                <select
                  id="developedby"
                  className="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-700 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  onChange={AddProjectForm.handleChange}
                  onBlur={AddProjectForm.handleBlur}
                  value={AddProjectForm.values.developedby}
                >
                  <option value="">Select Student</option>
                  {studentlist.map((student, index) => (
                    <option key={index} value={student._id}>{student.name}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              {AddProjectForm.touched.developedby && AddProjectForm.errors.developedby && (
                <span className="text-sm text-red-500">{AddProjectForm.errors.developedby}</span>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 transform hover:scale-[1.02]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Project
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProject;
