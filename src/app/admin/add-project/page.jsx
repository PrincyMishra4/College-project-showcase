'use client';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AddProject = () => {

    const [studentlist, setStudentlist] = useState([]);
    const [imageUrl, setImageUrl] = useState('');

    const handleFileUpload = (e) => {
      const file = e.target.files[0];
  
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'mypreset');
      formData.append('cloud_name', 'dcii9mcsm');
  
      axios.post('https://api.cloudinary.com/v1_1/dcii9mcsm/image/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
        .then((result) => {
          setImageUrl(result.data.secure_url); // Save uploaded image URL
          toast.success('File Uploaded Successfully');
        })
        .catch((err) => {
          console.log(err);
          toast.error('Failed to Upload File');
        });
    };
  
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

  const AddProjectForm = useFormik({
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
    // validationSchema: Yup.object({
    //   name: Yup.string().required('Name is required'),
    //   rollno: Yup.string().required('Roll number is required'),
    //   course: Yup.string().required('Course is required'),
    // }),
    onSubmit: (values) => {
      const projectData = {
        ...values,
        image: imageUrl
      };
      console.log('Form submitted:', values);
      
    },
  });
 
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md mx-auto">
        <h1 className="uppercase font-bold my-6 text-3xl text-center text-gray-600">Add Project Form</h1>
        <form onSubmit={AddProjectForm.handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium">
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              className="w-full px-3 py-1 border rounded"
              onChange={AddProjectForm.handleChange}
              onBlur={AddProjectForm.handleBlur}
              value={AddProjectForm.values.title}
            />
            {AddProjectForm.touched.title && AddProjectForm.errors.title && (
              <span className="text-sm text-red-500">{AddProjectForm.errors.title}</span>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="video" className="block text-sm font-medium">
              Video
            </label>
            <input
              id="video"
              name="video"
              type="text"
              className="w-full px-3 py-1 border rounded"
              onChange={AddProjectForm.handleChange}
              onBlur={AddProjectForm.handleBlur}
              value={AddProjectForm.values.video}
            />
            {AddProjectForm.touched.video && AddProjectForm.errors.video && (
              <span className="text-sm text-red-500">{AddProjectForm.errors.video}</span>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium">
              Description
            </label>
            <input
              id="description"
              name="description"
              type="text"
              className="w-full px-3 py-1 border rounded"
              onChange={AddProjectForm.handleChange}
              onBlur={AddProjectForm.handleBlur}
              value={AddProjectForm.values.description}
            />
            {AddProjectForm.touched.description && AddProjectForm.errors.description && (
              <span className="text-sm text-red-500">{AddProjectForm.errors.description}</span>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-medium">
              Image 
            </label>
            <input
              id="image"
              name="image"
              type="file"
              className="w-full px-3 py-1 border rounded"
              onChange={AddProjectForm.handleFileUpload}
              onBlur={AddProjectForm.handleBlur}
              value={AddProjectForm.values.image}
            />
            {AddProjectForm.touched.image && AddProjectForm.errors.image && (
              <span className="text-sm text-red-500">{AddProjectForm.errors.image}</span>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="githublink" className="block text-sm font-medium">
              GitHub Link
            </label>
            <input
              id="githublink"
              name="githublink"
              type="link"
              className="w-full px-3 py-1 border rounded"
              onChange={AddProjectForm.handleChange}
              onBlur={AddProjectForm.handleBlur}
              value={AddProjectForm.values.githublink}
            />
            {AddProjectForm.touched.githublink && AddProjectForm.errors.githublink && (
              <span className="text-sm text-red-500">{AddProjectForm.errors.githublink}</span>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="viewlink" className="block text-sm font-medium">
              Viewlink
            </label>
            <input
              id="viewlink"
              name="viewlink"
              type="link"
              className="w-full px-3 py-1 border rounded"
              onChange={AddProjectForm.handleChange}
              onBlur={AddProjectForm.handleBlur}
              value={AddProjectForm.values.viewlink}
            />
            {AddProjectForm.touched.viewlink && AddProjectForm.errors.viewlink && (
              <span className="text-sm text-red-500">{AddProjectForm.errors.viewlink}</span>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-medium">
              Category
            </label>
            <input
              id="category"
              name="category"
              type="text"
              className="w-full px-3 py-1 border rounded"
              onChange={AddProjectForm.handleChange}
              onBlur={AddProjectForm.handleBlur}
              value={AddProjectForm.values.category}
            />
            {AddProjectForm.touched.category && AddProjectForm.errors.category && (
              <span className="text-sm text-red-500">{AddProjectForm.errors.category}</span>
            )}
          </div>

          {/* <div className="mb-4">
            <label htmlFor="developedby" className="block text-sm font-medium">
              Developed By
            </label>
            <input
              id="developedby"
              name="developedby"
              type="text"
              className="w-full px-3 py-1 border rounded"
              onChange={AddProjectForm.handleChange}
              onBlur={AddProjectForm.handleBlur}
              value={AddProjectForm.values.developedby}
            />
            {AddProjectForm.touched.developedby && AddProjectForm.errors.developedby && (
              <span className="text-sm text-red-500">{AddProjectForm.errors.developedby}</span>
            )}
          </div> */}
          <div className="mb-4">
            <label htmlFor="developedby" className="block text-sm font-medium">
              Developed By
            </label>
            <select
              id="developedby"
              name="developedby"
              className="w-full px-3 py-1 border rounded"
              onChange={AddProjectForm.handleChange}
              onBlur={AddProjectForm.handleBlur}
              value={AddProjectForm.values.developedby}
            >
              <option value="">Select</option>
              {studentlist.map((student, index) => (
                <option key={index} value={student._id}>{student.name}</option>
              ))}
            </select>
            {AddProjectForm.touched.developedby && AddProjectForm.errors.developedby && (
              <span className="text-sm text-red-500">{AddProjectForm.errors.developedby}</span>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded w-full mt-4"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProject;
