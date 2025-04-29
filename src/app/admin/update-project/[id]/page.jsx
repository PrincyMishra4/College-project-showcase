'use client';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useParams, useRouter } from 'next/navigation';

const UpdateProject = () => {
  const [studentlist, setStudentlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const router = useRouter();

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
        developedby: response.data.developedby || '',
      });
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching project data:', error);
      toast.error('Failed to fetch project data');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentlist();
    fetchProjectData();
  }, [params.id]);

  const UpdateProjectForm = useFormik({
    initialValues: {
      title: '',
      video: '',
      image: '',
      description: '',
      githublink: '',
      viewlink: '',
      category: '',
      developedby: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      githublink: Yup.string().url('Must be a valid URL'),
      viewlink: Yup.string().url('Must be a valid URL'),
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen py-8">
      <div className="w-full max-w-md mx-auto">
        <h1 className="uppercase font-bold my-6 text-3xl text-center text-gray-600">Update Project</h1>
        <form onSubmit={UpdateProjectForm.handleSubmit} className="bg-white shadow-lg rounded-lg p-6">
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              id="title"
              type="text"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={UpdateProjectForm.handleChange}
              onBlur={UpdateProjectForm.handleBlur}
              value={UpdateProjectForm.values.title}
            />
            {UpdateProjectForm.touched.title && UpdateProjectForm.errors.title && (
              <span className="text-sm text-red-500">{UpdateProjectForm.errors.title}</span>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="Videoupload" className="block text-sm font-medium text-gray-700">
              Video
              <button 
                type="button" 
                className="ml-2 text-xs bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                onClick={() => document.getElementById('Videoupload').click()}
              >
                Choose File
              </button>
              <input type="file" onChange={Videoupload} hidden id='Videoupload'/>
            </label>
            <input
              id="video"
              type="text"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={UpdateProjectForm.handleChange}
              onBlur={UpdateProjectForm.handleBlur}
              value={UpdateProjectForm.values.video}
            />
            {UpdateProjectForm.values.video && (
              <div className="mt-2">
                <p className="text-xs text-gray-500">Current video:</p>
                <a href={UpdateProjectForm.values.video} target="_blank" rel="noopener noreferrer" className="text-blue-500 text-sm underline">
                  View uploaded video
                </a>
              </div>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              rows="3"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={UpdateProjectForm.handleChange}
              onBlur={UpdateProjectForm.handleBlur}
              value={UpdateProjectForm.values.description}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="upload" className="block text-sm font-medium text-gray-700">
              Image
              <button 
                type="button" 
                className="ml-2 text-xs bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                onClick={() => document.getElementById('upload').click()}
              >
                Choose File
              </button>
              <input type="file" onChange={upload} hidden id='upload'/>
            </label>
            <input
              id="image"
              type="text"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={UpdateProjectForm.handleChange}
              onBlur={UpdateProjectForm.handleBlur}
              value={UpdateProjectForm.values.image}
            />
            {UpdateProjectForm.values.image && (
              <div className="mt-2">
                <img src={UpdateProjectForm.values.image} alt="Project preview" className="h-20 w-auto object-cover rounded-md" />
              </div>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="githublink" className="block text-sm font-medium text-gray-700">
              GitHub Link
            </label>
            <input
              id="githublink"
              type="url"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={UpdateProjectForm.handleChange}
              onBlur={UpdateProjectForm.handleBlur}
              value={UpdateProjectForm.values.githublink}
            />
            {UpdateProjectForm.touched.githublink && UpdateProjectForm.errors.githublink && (
              <span className="text-sm text-red-500">{UpdateProjectForm.errors.githublink}</span>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="viewlink" className="block text-sm font-medium text-gray-700">
              View Link
            </label>
            <input
              id="viewlink"
              type="url"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={UpdateProjectForm.handleChange}
              onBlur={UpdateProjectForm.handleBlur}
              value={UpdateProjectForm.values.viewlink}
            />
            {UpdateProjectForm.touched.viewlink && UpdateProjectForm.errors.viewlink && (
              <span className="text-sm text-red-500">{UpdateProjectForm.errors.viewlink}</span>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <input
              id="category"
              type="text"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={UpdateProjectForm.handleChange}
              onBlur={UpdateProjectForm.handleBlur}
              value={UpdateProjectForm.values.category}
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="developedby" className="block text-sm font-medium text-gray-700">
              Developed By
            </label>
            <select
              id="developedby"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={UpdateProjectForm.handleChange}
              onBlur={UpdateProjectForm.handleBlur}
              value={UpdateProjectForm.values.developedby}
            >
              <option value="">Select</option>
              {studentlist.map((student, index) => (
                <option key={index} value={student._id}>{student.name}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md w-full transition duration-300"
            >
              Update Project
            </button>
            <button
              type="button"
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md w-full transition duration-300"
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