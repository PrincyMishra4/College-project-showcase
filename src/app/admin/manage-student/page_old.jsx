"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdDelete, MdEdit, MdSearch } from "react-icons/md";
import Link from "next/link";

const ManageStudent = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/student/getall");
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await axios.delete(`http://localhost:5000/student/delete/${id}`);
        // Refresh the student list
        fetchStudents();
      } catch (error) {
        console.error("Error deleting student:", error);
      }
    }
  };

  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollno.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === "all") return matchesSearch;
    return matchesSearch && student.department === filter;
  });

  const departments = [...new Set(students.map(student => student.department))];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
          Manage Students
        </h1>
        
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          {/* Search Bar */}
          <div className="relative">
            <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
            <input
              type="text"
              placeholder="Search students..."
              className="pl-10 pr-4 py-2 border rounded-lg w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Department Filter */}
          <select 
            className="border rounded-lg px-4 py-2"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Departments</option>
            {departments.map((dept, index) => (
              <option key={index} value={dept}>{dept}</option>
            ))}
          </select>
          
          {/* Add Student Button */}
          <Link href="/admin/add-student">
            <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 transition duration-200">
              Add New Student
            </button>
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : filteredStudents.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-xl text-gray-600">No students found matching your criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredStudents.map((student) => (
            <div 
              key={student._id} 
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-5">
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={student.image || "https://via.placeholder.com/80"}
                    alt={`${student.name}'s profile`}
                    className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/80";
                    }}
                  />
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">{student.name}</h2>
                    <p className="text-sm text-gray-500">Roll No: {student.rollno}</p>
                  </div>
                </div>
                
                <div className="space-y-2 border-t pt-3">
                  <p className="text-gray-700 flex items-center">
                    <span className="font-medium w-24">Department:</span> 
                    <span className="text-gray-800">{student.department}</span>
                  </p>
                  <p className="text-gray-700 flex items-center">
                    <span className="font-medium w-24">Course:</span> 
                    <span className="text-gray-800">{student.course}</span>
                  </p>
                  
                  <div className="flex gap-2 mt-2">
                    {student.githubprofile && (
                      <a
                        href={student.githubprofile}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-black"
                      >
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                      </a>
                    )}
                    {student.linkedinprofile && (
                      <a
                        href={student.linkedinprofile}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-blue-600"
                      >
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-end mt-4 space-x-2 pt-2 border-t">
                  <Link 
                    href={`/admin/update-student/${student._id}`}
                    className="text-blue-500 hover:bg-blue-50 p-2 rounded-full transition-colors"
                  >
                    <MdEdit className="text-xl" />
                  </Link>
                  <button 
                    onClick={() => handleDelete(student._id)}
                    className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors"
                  >
                    <MdDelete className="text-xl" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageStudent;
