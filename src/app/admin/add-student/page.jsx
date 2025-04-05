'use client';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import React from 'react';
import axios from 'axios';


const AddStudent = () => {
  const AddStudentForm = useFormik({
    initialValues: {
      name: '',
      rollno: '',
      department: '',
      image: '',
      githubprofile: '',
      linkedinprofile: '',
      course: '',
    },


    // validationSchema: Yup.object({
    //   name: Yup.string().required('Name is required'),
    //   rollno: Yup.string().required('Roll number is required'),
    //   course: Yup.string().required('Course is required'),
    // }),
    onSubmit: (values) => {
      console.log('Form submitted:', values);
      axios.post('http://localhost:5000/student/add', studentData)
        .then(() => {
          toast.success('Add Student');
        })
        .catch((err) => {
          console.log(err);
          toast.error('Something went wrong');
        });
      
    },
  });

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md mx-auto">
        <h1 className="uppercase font-bold my-6 text-3xl text-center text-gray-600">Add Student Form</h1>
        <form onSubmit={AddStudentForm.handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="w-full px-3 py-2 border rounded"
              onChange={AddStudentForm.handleChange}
              onBlur={AddStudentForm.handleBlur}
              value={AddStudentForm.values.name}
            />
            {AddStudentForm.touched.name && AddStudentForm.errors.name && (
              <span className="text-sm text-red-500">{AddStudentForm.errors.name}</span>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="rollno" className="block text-sm font-medium">
              Roll Number
            </label>
            <input
              id="rollno"
              name="rollno"
              type="text"
              className="w-full px-3 py-2 border rounded"
              onChange={AddStudentForm.handleChange}
              onBlur={AddStudentForm.handleBlur}
              value={AddStudentForm.values.rollno}
            />
            {AddStudentForm.touched.rollno && AddStudentForm.errors.rollno && (
              <span className="text-sm text-red-500">{AddStudentForm.errors.rollno}</span>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="department" className="block text-sm font-medium">
              Department
            </label>
            <input
              id="department"
              name="department"
              type="text"
              className="w-full px-3 py-2 border rounded"
              onChange={AddStudentForm.handleChange}
              onBlur={AddStudentForm.handleBlur}
              value={AddStudentForm.values.department}
            />
            {AddStudentForm.touched.department && AddStudentForm.errors.department && (
              <span className="text-sm text-red-500">{AddStudentForm.errors.department}</span>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-medium">
              Image URL
            </label>
            <input
              id="image"
              name="image"
              type="file"
              className="w-full px-3 py-2 border rounded"
              onChange={AddStudentForm.handleChange}
              onBlur={AddStudentForm.handleBlur}
              value={AddStudentForm.values.image}
            />
            {AddStudentForm.touched.image && AddStudentForm.errors.image && (
              <span className="text-sm text-red-500">{AddStudentForm.errors.image}</span>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="githubprofile" className="block text-sm font-medium">
              GitHub Profile
            </label>
            <input
              id="githubprofile"
              name="githubprofile"
              type="text"
              className="w-full px-3 py-2 border rounded"
              onChange={AddStudentForm.handleChange}
              onBlur={AddStudentForm.handleBlur}
              value={AddStudentForm.values.githubprofile}
            />
            {AddStudentForm.touched.githubprofile && AddStudentForm.errors.githubprofile && (
              <span className="text-sm text-red-500">{AddStudentForm.errors.githubprofile}</span>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="linkedinprofile" className="block text-sm font-medium">
              LinkedIn Profile
            </label>
            <input
              id="linkedinprofile"
              name="linkedinprofile"
              type="text"
              className="w-full px-3 py-2 border rounded"
              onChange={AddStudentForm.handleChange}
              onBlur={AddStudentForm.handleBlur}
              value={AddStudentForm.values.linkedinprofile}
            />
            {AddStudentForm.touched.linkedinprofile && AddStudentForm.errors.linkedinprofile && (
              <span className="text-sm text-red-500">{AddStudentForm.errors.linkedinprofile}</span>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="course" className="block text-sm font-medium">
              Course
            </label>
            <input
              id="course"
              name="course"
              type="text"
              className="w-full px-3 py-2 border rounded"
              onChange={AddStudentForm.handleChange}
              onBlur={AddStudentForm.handleBlur}
              value={AddStudentForm.values.course}
            />
            {AddStudentForm.touched.course && AddStudentForm.errors.course && (
              <span className="text-sm text-red-500">{AddStudentForm.errors.course}</span>
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

export default AddStudent;
