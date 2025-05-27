'use client';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
// import { t } from 'framer-motion/dist/types.d-DDSxwf0n';
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
      developedby: ''
    },
    validationSchema: Yup.object({
      title: Yup.string().required('title is required'),
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
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md mx-auto">
        <h1 className="uppercase font-bold my-6 text-3xl text-center text-gray-600">Add Project</h1>
        <form onSubmit={AddProjectForm.handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium">
              Title
            </label>
            <input
              id="title"
              type="text"
              className="w-full px-3 py-1 border rounded"
              onChange={AddProjectForm.handleChange}
              onBlur={AddProjectForm.handleBlur}
              value={AddProjectForm.values.title}
            />
            {/* {AddProjectForm.touched.title && AddProjectForm.errors.title && (
              <span className="text-sm text-red-500">{AddProjectForm.errors.title}</span>
            )} */}
          </div>

          <div className="mb-4">
            <label htmlFor="Videoupload" className="block text-sm font-medium">
              Video
              <input type="file" onChange={Videoupload} hidden id='Videoupload'/>
            </label>
          
            {/* {AddProjectForm.touched.video && AddProjectForm.errors.video && (
              <span className="text-sm text-red-500">{AddProjectForm.errors.video}</span>
            )} */}
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium">
              Description
            </label>
            <input
              id="description"
              type="text"
              className="w-full px-3 py-1 border rounded"
              onChange={AddProjectForm.handleChange}
              onBlur={AddProjectForm.handleBlur}
              value={AddProjectForm.values.description}
            />
            {/* {AddProjectForm.touched.description && AddProjectForm.errors.description && (
              <span className="text-sm text-red-500">{AddProjectForm.errors.description}</span>
            )} */}
          </div>

          <div className="mb-4">
            <label htmlFor="upload" className="block text-sm font-medium">
              Image
              <input type="file" onChange={upload} hidden id='upload'/>
            </label>
           
            {/* {AddProjectForm.touched.image && AddProjectForm.errors.image && (
              <span span className="text-sm text-red-500">{AddProjectForm.errors.image}</span>
            )} */}
          </div>

          <div className="mb-4">
            <label htmlFor="githublink" className="block text-sm font-medium">
              GitHub Link
            </label>
            <input
              id="githublink"
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
              type="link"
              className="w-full px-3 py-1 border rounded"
              onChange={AddProjectForm.handleChange}
              onBlur={AddProjectForm.handleBlur}
              value={AddProjectForm.values.viewlink}
            />
            {/* {AddProjectForm.touched.viewlink && AddProjectForm.errors.viewlink && (
              <span className="text-sm text-red-500">{AddProjectForm.errors.viewlink}</span>
            )} */}
          </div>

          <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-medium">
              Category
            </label>
            <input
              id="category"
              type="text"
              className="w-full px-3 py-1 border rounded"
              onChange={AddProjectForm.handleChange}
              onBlur={AddProjectForm.handleBlur}
              value={AddProjectForm.values.category}
            />
            {/* {AddProjectForm.touched.category && AddProjectForm.errors.category && (
              <span className="text-sm text-red-500">{AddProjectForm.errors.category}</span>
            )} */}
          </div>
          <div className="mb-4">
            <label htmlFor="developedby" className="block text-sm font-medium">
              Developed By
            </label>
            <select
              id="developedby"
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
