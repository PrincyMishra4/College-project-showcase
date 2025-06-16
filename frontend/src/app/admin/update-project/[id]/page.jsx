'use client';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';

const UpdateProject = () => {
  const [studentlist, setStudentlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const router = useRouter();

  const UpdateProjectForm = useFormik({
    initialValues: {
      title: '',
      video: '',
      image: '',
      description: '',
      githublink: '',
      viewlink: '',
      category: '',
      department: '',
      developedby: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      githublink: Yup.string().url('Must be a valid URL'),
      viewlink: Yup.string().url('Must be a valid URL'),
      department: Yup.string().required('Department is required'),
    }),
    onSubmit: (values) => {
      console.log('Updating project with values:', values);
      
      axios.put(`http://localhost:5000/project/update/${params.id}`, values)
      .then((result) => {
        console.log(result.data);
        toast.success('Project updated successfully');
        router.push('/admin/manage-project');
      })
      .catch((err) => {
        console.log(err);
        toast.error('Failed to update project');
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
            toast.success('Image uploaded successfully');
            console.log(result.data);
            UpdateProjectForm.setFieldValue('image', result.data.url);
        }).catch((err) => {
            console.log(err);
            toast.error('Failed to upload image');
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
            toast.success('Video uploaded successfully');
            console.log(result.data);
            UpdateProjectForm.setFieldValue('video', result.data.url);
        }).catch((err) => {
            console.log(err);
            toast.error('Failed to upload video');
        });
  }

  const fetchStudentlist = async () => {
    try {
      const response = await axios.get('http://localhost:5000/student/getall');
      console.log(response.data);
      setStudentlist(response.data);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch student list');
    }
  };

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/project/getbyid/${params.id}`);
        console.log('Fetched project data:', response.data);
        
        // Set form values with fetched data
        UpdateProjectForm.setValues({
          title: response.data.title || '',
          video: response.data.video || '',
          image: response.data.image || '',
          description: response.data.description || '',
          githublink: response.data.githublink || '',
          viewlink: response.data.viewlink || '',
          category: response.data.category || '',
          department: response.data.department || '',
          developedby: response.data.developedby || '',
        });        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching project data:', error);
        toast.error('Failed to fetch project data');
        setLoading(false);
      }
    };

    fetchStudentlist();
    fetchProjectData();
  }, [params.id, UpdateProjectForm]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex justify-center items-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center">
          <div className="animate-spin h-12 w-12 rounded-full border-t-2 border-b-2 border-indigo-600 mb-4"></div>
          <p className="text-gray-600">Loading project data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb navigation */}
        <nav className="flex mb-6" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <a href="/admin" className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-indigo-600">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                </svg>
                Dashboard
              </a>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                </svg>
                <a href="/admin/manage-project" className="ml-1 text-sm font-medium text-gray-600 hover:text-indigo-600 md:ml-2">Projects</a>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                </svg>
                <span className="ml-1 text-sm font-medium text-indigo-600 md:ml-2">Update Project</span>
              </div>
            </li>
          </ol>
        </nav>

        <h1 className="text-3xl font-bold text-center mb-2 text-indigo-800">
          Update Project
        </h1>
        <p className="text-center text-gray-600 mb-8">Make changes to your project details below</p>
        
        {/* Info message */}
        <div className="mb-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-md">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                Fields marked with <span className="text-red-500">*</span> are required
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={UpdateProjectForm.handleSubmit} className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title field - Full width */}
            <div className="col-span-1 md:col-span-2">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Project Title <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                onChange={UpdateProjectForm.handleChange}
                onBlur={UpdateProjectForm.handleBlur}
                value={UpdateProjectForm.values.title}
              />
              {UpdateProjectForm.touched.title && UpdateProjectForm.errors.title && (
                <p className="mt-1 text-sm text-red-500">{UpdateProjectForm.errors.title}</p>
              )}
            </div>

            {/* Description field - Full width */}
            <div className="col-span-1 md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                onChange={UpdateProjectForm.handleChange}
                onBlur={UpdateProjectForm.handleBlur}
                value={UpdateProjectForm.values.description}
              />
            </div>

            {/* Video field - Left column */}
            <div>
              <label htmlFor="Videoupload" className="block text-sm font-medium text-gray-700 mb-1">
                Video
                <button 
                  type="button" 
                  className="ml-2 text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-md hover:bg-indigo-200 transition"
                  onClick={() => document.getElementById('Videoupload').click()}
                >
                  Choose File
                </button>
              </label>
              <input type="file" onChange={Videoupload} hidden id='Videoupload'/>
              <input
                id="video"
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                onChange={UpdateProjectForm.handleChange}
                onBlur={UpdateProjectForm.handleBlur}
                value={UpdateProjectForm.values.video}
                placeholder="Video URL"
              />
              {UpdateProjectForm.values.video && (
                <div className="mt-2">
                  <a href={UpdateProjectForm.values.video} target="_blank" rel="noopener noreferrer" className="text-indigo-600 text-sm flex items-center hover:underline">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    View video
                  </a>
                </div>
              )}
            </div>

            {/* Image field - Right column */}
            <div>
              <label htmlFor="upload" className="block text-sm font-medium text-gray-700 mb-1">
                Image
                <button 
                  type="button" 
                  className="ml-2 text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-md hover:bg-indigo-200 transition"
                  onClick={() => document.getElementById('upload').click()}
                >
                  Choose File
                </button>
              </label>
              <input type="file" onChange={upload} hidden id='upload'/>
              <input
                id="image"
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                onChange={UpdateProjectForm.handleChange}
                onBlur={UpdateProjectForm.handleBlur}
                value={UpdateProjectForm.values.image}
                placeholder="Image URL"
              />
              {UpdateProjectForm.values.image && (
                <div className="mt-2">
                  <div className="border border-gray-200 rounded-lg p-1 inline-block">
                    <Image src={UpdateProjectForm.values.image} alt="Project preview" className="h-20 w-auto object-cover rounded" />
                  </div>
                </div>
              )}
            </div>

            {/* GitHub Link field */}
            <div>
              <label htmlFor="githublink" className="block text-sm font-medium text-gray-700 mb-1">
                GitHub Link
              </label>
              <input
                id="githublink"
                type="url"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                onChange={UpdateProjectForm.handleChange}
                onBlur={UpdateProjectForm.handleBlur}
                value={UpdateProjectForm.values.githublink}
                placeholder="https://github.com/username/repo"
              />
              {UpdateProjectForm.touched.githublink && UpdateProjectForm.errors.githublink && (
                <p className="mt-1 text-sm text-red-500">{UpdateProjectForm.errors.githublink}</p>
              )}
            </div>

            {/* View Link field */}
            <div>
              <label htmlFor="viewlink" className="block text-sm font-medium text-gray-700 mb-1">
                View Link
              </label>
              <input
                id="viewlink"
                type="url"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                onChange={UpdateProjectForm.handleChange}
                onBlur={UpdateProjectForm.handleBlur}
                value={UpdateProjectForm.values.viewlink}
                placeholder="https://your-project-site.com"
              />
              {UpdateProjectForm.touched.viewlink && UpdateProjectForm.errors.viewlink && (
                <p className="mt-1 text-sm text-red-500">{UpdateProjectForm.errors.viewlink}</p>
              )}
            </div>

            {/* Category field */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <input
                id="category"
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                onChange={UpdateProjectForm.handleChange}
                onBlur={UpdateProjectForm.handleBlur}
                value={UpdateProjectForm.values.category}
                placeholder="e.g. Web Development, Mobile App, IoT"
              />
            </div>

            {/* Department dropdown */}
            <div>
              <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                Department <span className="text-red-500">*</span>
              </label>
              <select
                id="department"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition appearance-none bg-white"
                onChange={UpdateProjectForm.handleChange}
                onBlur={UpdateProjectForm.handleBlur}
                value={UpdateProjectForm.values.department}
              >
                <option value="">Select Department</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Electrical Engineering">Electrical Engineering</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
                <option value="Civil Engineering">Civil Engineering</option>
                <option value="Business Administration">Business Administration</option>
                <option value="Fine Arts">Fine Arts</option>
              </select>
              {UpdateProjectForm.touched.department && UpdateProjectForm.errors.department && (
                <p className="mt-1 text-sm text-red-500">{UpdateProjectForm.errors.department}</p>
              )}
            </div>
            
            {/* Developed By dropdown */}
            <div>
              <label htmlFor="developedby" className="block text-sm font-medium text-gray-700 mb-1">
                Developed By
              </label>
              <select
                id="developedby"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition appearance-none bg-white"
                onChange={UpdateProjectForm.handleChange}
                onBlur={UpdateProjectForm.handleBlur}
                value={UpdateProjectForm.values.developedby}
              >
                <option value="">Select Student</option>
                {studentlist.map((student, index) => (
                  <option key={index} value={student._id}>{student.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Form buttons */}
          <div className="mt-8 flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              Update Project
            </button>
            <button
              type="button"
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-4 rounded-lg transition duration-200 border border-gray-300 flex items-center justify-center"
              onClick={() => router.push('/admin/manage-project')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProject;