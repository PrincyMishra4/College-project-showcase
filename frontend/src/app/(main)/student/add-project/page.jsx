'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import toast from 'react-hot-toast';

const AddProject = () => {
  const [studentlist, setStudentlist] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const AddProjectForm = useFormik({
    initialValues: {
      title: '',
      description: '',
      githublink: '',
      viewlink: '',
      category: '',
      department: '',
      developedby: '',
      image: '',
      video: '',
      approved: false,
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      description: Yup.string().required('Description is required'),
    //   githublink: Yup.string().url('Must be a valid URL'),
    //   viewlink: Yup.string().url('Must be a valid URL'),
      category: Yup.string().required('Category is required'),
      department: Yup.string().required('Department is required'),
      developedby: Yup.string().required('Developer selection is required'),
    }),
    onSubmit: (values, { resetForm }) => {
      setIsSubmitting(true);
      
      axios.post('http://localhost:5000/project/add', values)
        .then((result) => {
          console.log(result.data);
          toast.success('Project added successfully');
          resetForm();
          setIsSubmitting(false);
        })
        .catch((err) => {
          console.log(err);
          toast.error('Something went wrong');
          setIsSubmitting(false);
        });
    },
  });

  const uploadFile = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const fd = new FormData();
    fd.append('file', file);
    fd.append('upload_preset', 'collegeproject');
    fd.append('cloud_name', 'dcii9mcsm');

    const uploadUrl = type === 'image' 
      ? 'https://api.cloudinary.com/v1_1/dcii9mcsm/image/upload'
      : 'https://api.cloudinary.com/v1_1/dcii9mcsm/video/upload';
    
    toast.loading(`Uploading ${type}...`);
    
    axios.post(uploadUrl, fd)
      .then((result) => {
        toast.dismiss();
        toast.success(`${type} uploaded successfully`);
        console.log(result.data);
        AddProjectForm.setFieldValue(type, result.data.url);
      }).catch((err) => {
        toast.dismiss();
        console.log(err);
        toast.error(`Failed to upload ${type}`);
      });
  };

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
    fetchStudentlist();
  }, []);

  return (
    <div className="py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Add New Project</h1>
        
        <form onSubmit={AddProjectForm.handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Project Title *
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  onChange={AddProjectForm.handleChange}
                  onBlur={AddProjectForm.handleBlur}
                  value={AddProjectForm.values.title}
                />
                {AddProjectForm.touched.title && AddProjectForm.errors.title && (
                  <p className="mt-1 text-sm text-red-600">{AddProjectForm.errors.title}</p>
                )}
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  onChange={AddProjectForm.handleChange}
                  onBlur={AddProjectForm.handleBlur}
                  value={AddProjectForm.values.category}
                >
                  <option value="">Select Category</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Mobile App">Mobile App</option>
                  <option value="Machine Learning">Machine Learning</option>
                  <option value="Blockchain">Blockchain</option>
                  <option value="IoT">IoT</option>
                  <option value="Other">Other</option>
                </select>
                {AddProjectForm.touched.category && AddProjectForm.errors.category && (
                  <p className="mt-1 text-sm text-red-600">{AddProjectForm.errors.category}</p>
                )}
              </div>

              <div>
                <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                  Department *
                </label>
                <select
                  id="department"
                  name="department"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
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
                  <p className="mt-1 text-sm text-red-600">{AddProjectForm.errors.department}</p>
                )}
              </div>

              <div>
                <label htmlFor="githublink" className="block text-sm font-medium text-gray-700 mb-1">
                  GitHub Link
                </label>
                <input
                  id="githublink"
                  name="githublink"
                  type="url"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  onChange={AddProjectForm.handleChange}
                  onBlur={AddProjectForm.handleBlur}
                  value={AddProjectForm.values.githublink}
                  placeholder="https://github.com/username/repo"
                />
                {AddProjectForm.touched.githublink && AddProjectForm.errors.githublink && (
                  <p className="mt-1 text-sm text-red-600">{AddProjectForm.errors.githublink}</p>
                )}
              </div>

              <div>
                <label htmlFor="viewlink" className="block text-sm font-medium text-gray-700 mb-1">
                  Demo Link
                </label>
                <input
                  id="viewlink"
                  name="viewlink"
                  type="url"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  onChange={AddProjectForm.handleChange}
                  onBlur={AddProjectForm.handleBlur}
                  value={AddProjectForm.values.viewlink}
                  placeholder="https://example.com"
                />
                {AddProjectForm.touched.viewlink && AddProjectForm.errors.viewlink && (
                  <p className="mt-1 text-sm text-red-600">{AddProjectForm.errors.viewlink}</p>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div>
                <label htmlFor="developedby" className="block text-sm font-medium text-gray-700 mb-1">
                  Developed By *
                </label>
                <select
                  id="developedby"
                  name="developedby"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  onChange={AddProjectForm.handleChange}
                  onBlur={AddProjectForm.handleBlur}
                  value={AddProjectForm.values.developedby}
                >
                  <option value="">Select Student</option>
                  {studentlist.map((student) => (
                    <option key={student._id} value={student._id}>
                      {student.name}
                    </option>
                  ))}
                </select>
                {AddProjectForm.touched.developedby && AddProjectForm.errors.developedby && (
                  <p className="mt-1 text-sm text-red-600">{AddProjectForm.errors.developedby}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Image
                </label>
                <div className="flex items-center space-x-4">
                  <label className="cursor-pointer px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition">
                    {AddProjectForm.values.image ? 'Change Image' : 'Upload Image'}
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => uploadFile(e, 'image')} 
                      hidden 
                    />
                  </label>
                  {AddProjectForm.values.image && (
                    <span className="text-sm text-green-600">Image uploaded</span>
                  )}
                </div>                {AddProjectForm.values.image && (
                  <div className="mt-2">
                    <Image 
                      src={AddProjectForm.values.image} 
                      alt="Project preview" 
                      width={80}
                      height={80}
                      className="h-20 object-cover rounded-md"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Video
                </label>
                <div className="flex items-center space-x-4">
                  <label className="cursor-pointer px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition">
                    {AddProjectForm.values.video ? 'Change Video' : 'Upload Video'}
                    <input 
                      type="file" 
                      accept="video/*"
                      onChange={(e) => uploadFile(e, 'video')} 
                      hidden 
                    />
                  </label>
                  {AddProjectForm.values.video && (
                    <span className="text-sm text-green-600">Video uploaded</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Full Width */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Project Description *
            </label>
            <textarea
              id="description"
              name="description"
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              onChange={AddProjectForm.handleChange}
              onBlur={AddProjectForm.handleBlur}
              value={AddProjectForm.values.description}
            />
            {AddProjectForm.touched.description && AddProjectForm.errors.description && (
              <p className="mt-1 text-sm text-red-600">{AddProjectForm.errors.description}</p>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Submitting..." : "Add Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProject;