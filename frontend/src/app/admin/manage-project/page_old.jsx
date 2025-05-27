"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaEdit, FaTrash, FaPlus, FaSync, FaGithub, FaExternalLinkAlt, FaVideo, FaCheck } from "react-icons/fa";
import Link from "next/link";

const ManageProject = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const router = useRouter();

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/project/getall");
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
      toast.error("Failed to fetch projects: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    
    const loadProjects = async () => {
      try {
        const response = await axios.get("http://localhost:5000/project/getall", {
          signal: controller.signal
        });
        setProjects(response.data);
      } catch (error) {
        if (!axios.isCancel(error)) {
          console.error("Error fetching projects:", error);
          toast.error("Failed to fetch projects: " + (error.response?.data?.message || error.message));
        }
      } finally {
        setLoading(false);
      }
    };
    
    loadProjects();
    
    // Cleanup function to abort fetch on unmount
    return () => {
      controller.abort();
    };
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      setDeleteLoading(id);
      try {
        await axios.delete(`http://localhost:5000/Project/delete/${id}`);
        toast.success("Project deleted successfully");
        fetchProjects(); // Refresh the list
      } catch (error) {
        console.error("Error deleting project:", error);
        toast.error("Failed to delete project: " + (error.response?.data?.message || error.message));
      } finally {
        setDeleteLoading(null);
      }
    }
  };

  const handleUpdate = (id) => {
    router.push(`/admin/update-project/${id}`);
  };

  const handleApprove = async (id) => {
    try {
      // Find the current project
      const project = projects.find(p => p._id === id);
      // Toggle the approval status
      const newStatus = !project.Approved;
      
      // Make API call to update the project
      await axios.put(`http://localhost:5000/project/update/${id}`, {
        Approved: newStatus
      });
      
      // Show success message
      toast.success(`Project ${newStatus ? 'approved' : 'unapproved'} successfully`);
      
      // Update local state to avoid refetching
      setProjects(projects.map(p => 
        p._id === id ? { ...p, isApproved: newStatus } : p
      ));
    } catch (error) {
      console.error("Error updating approval status:", error);
      toast.error("Failed to update approval status: " + (error.response?.data?.message || error.message));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 sm:mb-0">
            Manage Projects
          </h1>
          
          <div className="flex space-x-3">
            <button
              onClick={() => router.push("/admin/add-project")}
              className="flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition duration-300 shadow-md"
            >
              <FaPlus className="mr-2" />
              Add Project
            </button>
            <button
              onClick={fetchProjects}
              className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-300 shadow-md"
            >
              <FaSync className="mr-2" />
              Refresh
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="flex justify-between items-center">
            <p className="text-gray-600">
              Total Projects: <span className="font-semibold">{projects.length}</span>
            </p>
          </div>
        </div>
        
        {projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center bg-white rounded-xl shadow-md p-16">
            <div className="text-gray-400 mb-4 text-6xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">No Projects Found</h3>
            <p className="text-gray-500 mb-6">Start by adding your first project</p>
            <button
              onClick={() => router.push("/admin/add-project")}
              className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition duration-300 shadow-md"
            >
              <FaPlus className="mr-2" />
              Add New Project
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div key={project._id} className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
                <div className="relative h-48 overflow-hidden">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition duration-300 hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400">No image</span>
                    </div>
                  )}
                  
                  {project.video && (
                    <div className="absolute top-3 right-3 bg-black bg-opacity-60 p-2 rounded-full">
                      <a 
                        href={project.video} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-white hover:text-blue-400"
                      >
                        <FaVideo className="h-5 w-5" />
                      </a>
                    </div>
                  )}
                </div>
                
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-xl font-bold text-gray-800 truncate">
                      {project.title}
                    </h2>
                    <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
                      {project.category || "Uncategorized"}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {project.description || "No description available"}
                  </p>
                  
                  <div className="flex items-center space-x-2 mb-4">
                    {project.githublink && (
                      <a
                        href={project.githublink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-700 hover:text-black transition duration-200"
                        title="GitHub Repository"
                      >
                        <FaGithub className="h-5 w-5" />
                      </a>
                    )}
                    
                    {project.viewlink && (
                      <a
                        href={project.viewlink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-700 hover:text-blue-600 transition duration-200"
                        title="Live Project"
                      >
                        <FaExternalLinkAlt className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                  
                  <div className="flex justify-between mt-5 pt-4 border-t border-gray-100">
                    <Link
                      href={'/admin/update-project/' + project._id}
                      className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition duration-200"
                    >
                      <FaEdit className="mr-1" /> Edit
                    </Link>
                    
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleApprove(project._id)}
                        className="flex items-center text-sm font-medium text-green-600 hover:text-green-800 transition duration-200"
                      >
                        {project.approved ? (
                          <>
                            <FaCheck className="mr-1" /> Approved
                          </>
                        ) : (
                          <>
                            <FaCheck className="mr-1" /> Approve
                          </>
                        )}
                      </button>
                      
                      <button
                        onClick={() => handleDelete(project._id)}
                        className="flex items-center text-sm font-medium text-red-600 hover:text-red-800 transition duration-200"
                      >
                        <FaTrash className="mr-1" /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageProject;
