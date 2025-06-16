'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'
import { FiArrowRight, FiSearch, FiGrid, FiList, FiLoader } from 'react-icons/fi'

// Department data remains the same
const departments = [  {
    id: 1,
    name: 'Computer Science',
    description: 'Exploring the fundamentals of computing, programming languages, and software development.',
    projectCount: 24,
    image: "/computer science.webp"
  },  {
    id: 2,
    name: 'Electrical Engineering',
    description: 'Focusing on electrical systems, circuits, and electronics applications.',
    projectCount: 18,
    image: '/electrical engineering.jpg'
  },
  {
    id: 3,
    name: 'Mechanical Engineering',
    description: 'Studying mechanics, dynamics, and mechanical systems design.',
    projectCount: 15,
    image: '/mechanical engineering.jpg'
  },
  {
    id: 4,
    name: 'Civil Engineering',
    description: 'Designing infrastructure, buildings, and environmental systems.',
    projectCount: 12,
    image: '/civil engineering.jpg'
  },
  {
    id: 5,
    name: 'Business Administration',
    description: 'Developing management skills, business strategies, and entrepreneurship.',
    projectCount: 20,
    image: '/business administration.jpg'
  },
  {
    id: 6,
    name: 'Fine Arts',
    description: 'Creating visual arts, design, and multimedia projects.',
    projectCount: 16,
    image: '/fine arts.jpg'
  }
];

const BrowseDepartment = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDepartments, setFilteredDepartments] = useState(departments);
  const [departmentProjects, setDepartmentProjects] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedDept, setSelectedDept] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  useEffect(() => {
    // Fetch all projects
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/project/getall');
        const projects = response.data;
        
        // Group projects by department (using department field)
        const projectsByDepartment = {};
        departments.forEach(dept => {
          // Find projects matching this department (case-insensitive)
          const deptProjects = projects.filter(project => 
            project.department?.toLowerCase() === dept.name.toLowerCase() ||
            project.department?.toLowerCase().includes(dept.name.toLowerCase())
          );
          projectsByDepartment[dept.id] = deptProjects;
        });
        
        setDepartmentProjects(projectsByDepartment);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, []);

  useEffect(() => {
    const results = departments.filter(dept => 
      dept.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDepartments(results);
  }, [searchTerm]);

  // Function to toggle department selection
  const toggleDepartment = (dept) => {
    if (selectedDept && selectedDept.id === dept.id) {
      setSelectedDept(null);
    } else {
      setSelectedDept(dept);
    }
  };  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600/0 to-indigo-700/0 text-white py-16 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/about1.jpg"
            alt="Students working on projects"
            fill
            className="object-cover opacity-90"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-950/60 to-indigo-900/50"></div>
        </div>

        {/* Content */}
        <div className="relative container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">Academic Departments</h1>
            <p className="text-xl opacity-90 mb-8">
              Discover innovative projects from various departments and see how students are shaping the future
            </p>
            
            {/* Search Bar */}
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-1.5 flex items-center max-w-lg">
              <div className="bg-white rounded-full p-3 mr-3">
                <FiSearch className="text-blue-600 h-5 w-5" />
              </div>
              <input
                type="text"
                placeholder="Search departments..."
                className="bg-transparent w-full text-white placeholder-white/70 outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Stats */}
            <div className="mt-12 flex items-center space-x-8">
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold">{departments.length}</p>
                  <p className="text-sm opacity-80">Departments</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold">{Object.values(departmentProjects).reduce((total, projects) => total + projects.length, 0)}</p>
                  <p className="text-sm opacity-80">Total Projects</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Controls Row */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              {filteredDepartments.length} {filteredDepartments.length === 1 ? 'Department' : 'Departments'}
            </h2>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 p-2 bg-white rounded-lg shadow-sm">
              <button 
                onClick={() => setViewMode('grid')} 
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-500'}`}
              >
                <FiGrid />
              </button>
              <button 
                onClick={() => setViewMode('list')} 
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-500'}`}
              >
                <FiList />
              </button>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <FiLoader className="w-8 h-8 text-blue-600 animate-spin" />
            <span className="ml-2 text-gray-600">Loading departments...</span>
          </div>
        )}

        {/* Departments Display */}
        {!loading && (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDepartments.map((dept) => (
                <div 
                  key={dept.id} 
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="relative h-48 w-full overflow-hidden group">
                    {dept.image ? (
                      <div className="relative h-full w-full">
                        <Image 
                          src={dept.image} 
                          alt={dept.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      </div>
                    ) : (
                      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 h-full w-full flex items-center justify-center">
                        <span className="text-white text-4xl font-bold">{dept.name.substring(0, 2)}</span>
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 p-4 w-full">
                      <h2 className="text-white text-xl font-bold drop-shadow-md">{dept.name}</h2>
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full">
                        {departmentProjects[dept.id]?.length || 0} Projects
                      </span>
                      <button 
                        onClick={() => toggleDepartment(dept)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        {selectedDept && selectedDept.id === dept.id ? 'Hide details' : 'Show details'}
                      </button>
                    </div>
                    
                    <p className="text-gray-600 text-sm">{dept.description}</p>
                    
                    {/* Department Projects Preview */}
                    {selectedDept && selectedDept.id === dept.id && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <h3 className="text-sm font-medium text-gray-500 mb-3">Featured Projects:</h3>
                        
                        {departmentProjects[dept.id]?.length > 0 ? (
                          <>
                            <div className="space-y-3">
                              {departmentProjects[dept.id].slice(0, 3).map(project => (
                                <Link 
                                  href={`/view-project/${project._id}`} 
                                  key={project._id}
                                  className="block bg-gray-50 p-3 rounded-lg hover:bg-blue-50 transition duration-200"
                                >                                  <div className="flex items-center">
                                    {project.image ? (
                                      <div className="h-12 w-12 mr-3 overflow-hidden rounded-lg">
                                        <Image 
                                          src={project.image} 
                                          alt={project.title} 
                                          width={48}
                                          height={48}
                                          className="h-full w-full object-cover"
                                        />
                                      </div>
                                    ) : (
                                      <div className="h-12 w-12 mr-3 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <span className="text-blue-600 font-medium text-lg">{project.title?.[0] || 'P'}</span>
                                      </div>
                                    )}
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm font-medium text-gray-900 mb-0.5 truncate">{project.title}</p>
                                      {project.student && (
                                        <p className="text-xs text-gray-500">By: {project.student}</p>
                                      )}
                                    </div>
                                  </div>
                                </Link>
                              ))}
                            </div>
                            
                            <Link 
                              href={`/browse-project?department=${encodeURIComponent(dept.name)}`}
                              className="flex items-center justify-center text-blue-600 text-sm font-medium mt-4 bg-blue-50 hover:bg-blue-100 py-2 rounded-lg transition-colors"
                            >
                              <span>View all {departmentProjects[dept.id].length} projects</span>
                              <FiArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" />
                            </Link>
                          </>
                        ) : (
                          <div className="p-3 bg-gray-50 rounded-lg text-center">
                            <p className="text-gray-500 text-sm">No projects available</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // List View
            <div className="bg-white rounded-xl overflow-hidden shadow-md">
              {filteredDepartments.map((dept, index) => (
                <div 
                  key={dept.id}
                  className={`${index !== 0 ? 'border-t border-gray-100' : ''}`}
                >
                  <div 
                    className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => toggleDepartment(dept)}
                  >
                    <div className="flex items-center">
                      <div className="h-16 w-16 mr-4 overflow-hidden rounded-lg">
                        {dept.image ? (
                          <Image 
                            src={dept.image} 
                            alt={dept.name}
                            width={64}
                            height={64}
                            className="object-cover h-full w-full"
                          />
                        ) : (
                          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 h-full w-full flex items-center justify-center">
                            <span className="text-white text-lg font-bold">{dept.name.substring(0, 2)}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <h2 className="text-lg font-semibold text-gray-800">{dept.name}</h2>
                          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                            {departmentProjects[dept.id]?.length || 0} Projects
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm line-clamp-2">{dept.description}</p>
                      </div>
                      
                      <div className="ml-4">
                        <FiArrowRight className={`w-5 h-5 text-gray-400 transform transition-transform ${selectedDept && selectedDept.id === dept.id ? 'rotate-90' : ''}`} />
                      </div>
                    </div>
                  </div>
                  
                  {/* Expanded Content */}
                  {selectedDept && selectedDept.id === dept.id && (
                    <div className="bg-gray-50 p-4 border-t border-gray-100">
                      <h3 className="text-sm font-medium text-gray-500 mb-3">Featured Projects:</h3>
                      
                      {departmentProjects[dept.id]?.length > 0 ? (
                        <>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {departmentProjects[dept.id].slice(0, 6).map(project => (
                              <Link 
                                href={`/view-project/${project._id}`} 
                                key={project._id}
                                className="bg-white p-3 rounded-lg hover:bg-blue-50 transition duration-200 border border-gray-100"
                              >                                <div className="flex items-center">
                                  {project.image ? (
                                    <div className="h-10 w-10 mr-3 overflow-hidden rounded">
                                      <Image 
                                        src={project.image} 
                                        alt={project.title} 
                                        width={40}
                                        height={40}
                                        className="h-full w-full object-cover"
                                      />
                                    </div>
                                  ) : (
                                    <div className="h-10 w-10 mr-3 bg-blue-100 rounded flex items-center justify-center">
                                      <span className="text-blue-600 font-medium">{project.title?.[0] || 'P'}</span>
                                    </div>
                                  )}
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">{project.title}</p>
                                  </div>
                                </div>
                              </Link>
                            ))}
                          </div>
                          
                          <div className="text-center mt-4">
                            <Link 
                              href={`/browse-project?department=${encodeURIComponent(dept.name)}`}
                              className="inline-flex items-center text-blue-600 text-sm font-medium bg-white px-4 py-2 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors"
                            >
                              <span>View all {departmentProjects[dept.id].length} projects</span>
                              <FiArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" />
                            </Link>
                          </div>
                        </>
                      ) : (
                        <div className="p-3 bg-white rounded-lg text-center">
                          <p className="text-gray-500 text-sm">No projects available</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )
        )}

        {/* Empty State */}
        {!loading && filteredDepartments.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 bg-white rounded-xl shadow-sm">
            <div className="bg-blue-100 p-6 rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-800 mb-2">No departments found</h3>
            <p className="text-gray-500 mb-6">We couldn&apos;t find any departments matching your search</p>
            <button 
              onClick={() => setSearchTerm('')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear search
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default BrowseDepartment;