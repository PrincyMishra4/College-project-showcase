'use client';
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';

const ManageStudent = () => {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/student/getall');
      console.log(response.data);
      setStudents(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [])


  return (
    <div className='flex flex-col items-center h-screen'>
      <h1 className='uppercase font-bold my-6 text-3xl text-center text-gray-600'>Manage Students</h1>
      <div className="w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Student List</h2>
        <ul className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          {students.map((student, index) => (
            <li key={index} className="mb-4 flex justify-between items-center">
              <div>
                <p className="text-gray-700"><strong>Name:</strong> {student.name}</p>
                <p className="text-gray-700"><strong>Roll No:</strong> {student.rollno}</p>
                <p className="text-gray-700"><strong>Department:</strong> {student.department}</p>
                <p className="text-gray-700"><strong>Course:</strong> {student.course}</p>
                <p className="text-gray-700"><strong>Image:</strong> {student.course}</p>
                <p className="text-gray-700"><strong>Githubprofile:</strong> {student.course}</p>
                <p className="text-gray-700"><strong>Linkdinprofile:</strong> {student.course}</p>

              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ManageStudent;