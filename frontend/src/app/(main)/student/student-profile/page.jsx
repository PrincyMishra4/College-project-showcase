'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { FaGithub, FaLinkedin, FaGraduationCap, FaBuilding, FaIdCard, FaPlus } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const StudentProfile = () => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  const fetchStudentData = useCallback(async () => {
    setLoading(true);
    try {
      // Get the token from localStorage
      const token = localStorage.getItem('token');
      
      
      if (!token) {
        // Redirect to login if no token is found
        toast.error("Please login to view your profile");
        router.push('/student-login');
        return;
      }

      // Make the request to get the current student's profile
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/student/profile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      // if (response.status === 401 || response.status === 403) {
      //   // Token is invalid or expired
      //   localStorage.removeItem('token');
      //   localStorage.removeItem('student');
      //   toast.error("Session expired. Please login again");
      //   router.push('/student-login');
      //   return;
      // }
      
      if (!response.ok) {
        throw new Error('Failed to fetch student data');
      }
      
      const data = await response.json();
      console.log(data);
      setStudent(data);    } catch (err) {
      setError(err.message);
      toast.error("Failed to load student profile");    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchStudentData();
  }, [fetchStudentData]);

  if (loading) {
    return (
      <div className=" flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
          <button 
            onClick={fetchStudentData}
            className="mt-3 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          <p>Student not found</p>
        </div>
      </div>
    );
  }

  // Rest of your component remains the same
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };


  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Header Section with Student Image */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-12 text-white">            <div className="flex flex-col sm:flex-row items-center gap-8">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <Image 
                  src={student.image ? student.image : 'https://via.placeholder.com/150?text=No+Image'} 
                  alt={student.name} 
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-3xl font-bold">{student.name}</h1>
                <div className="flex items-center justify-center sm:justify-start mt-2">
                  <FaIdCard className="mr-2" />
                  <p className="text-lg">{student.rollno || "No Roll Number"}</p>
                </div>
                <div className="flex space-x-4 mt-4 justify-center sm:justify-start">
                  {student.githubprofile && (
                    <a 
                      href={student.githubprofile} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-full flex items-center transition duration-300"
                    >
                      <FaGithub className="mr-2" /> GitHub
                    </a>
                  )}
                  {student.linkedinprofile && (
                    <a 
                      href={student.linkedinprofile} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded-full flex items-center transition duration-300"
                    >
                      <FaLinkedin className="mr-2" /> LinkedIn
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <div className="flex items-center text-gray-700">
                  <FaBuilding className="text-blue-600 mr-3 text-xl" />
                  <div>
                    <p className="text-sm text-gray-500">Department</p>
                    <p className="font-medium text-lg">{student.department || "Not specified"}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <div className="flex items-center text-gray-700">
                  <FaGraduationCap className="text-blue-600 mr-3 text-xl" />
                  <div>
                    <p className="text-sm text-gray-500">Course</p>
                    <p className="font-medium text-lg">{student.course || "Not specified"}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t pt-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Profile Details</h2>
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Full Name</dt>
                  <dd className="mt-1 text-gray-900">{student.name}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Email</dt>
                  <dd className="mt-1 text-gray-900">{student.email}</dd>
                </div>
                {student.rollno && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Roll Number</dt>
                    <dd className="mt-1 text-gray-900">{student.rollno}</dd>
                  </div>
                )}
                {student.department && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Department</dt>
                    <dd className="mt-1 text-gray-900">{student.department}</dd>
                  </div>
                )}
                {student.course && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Course</dt>
                    <dd className="mt-1 text-gray-900">{student.course}</dd>
                  </div>
                )}
                {student.githubprofile && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">GitHub</dt>
                    <dd className="mt-1 text-gray-900 truncate">
                      <a 
                        href={student.githubprofile} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="text-blue-600 hover:text-blue-800 truncate"
                      >
                        {student.githubprofile}
                      </a>
                    </dd>
                  </div>
                )}
                {student.linkedinprofile && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">LinkedIn</dt>
                    <dd className="mt-1 text-gray-900 truncate">
                      <a 
                        href={student.linkedinprofile} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="text-blue-600 hover:text-blue-800 truncate"
                      >
                        {student.linkedinprofile}
                      </a>
                    </dd>
                  </div>
                )}
                {student.createdAt && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Profile Created</dt>
                    <dd className="mt-1 text-gray-900">{formatDate(student.createdAt)}</dd>
                  </div>
                )}              </dl>
            </div>

            {/* Add Project Button */}
            <div className="mt-8 border-t pt-6">
              <div className="flex justify-center">
                <Link 
                  href="/student/add-project"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg flex items-center transition duration-300 shadow-md hover:shadow-lg"
                >
                  <FaPlus className="mr-2" />
                  Add New Project
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;