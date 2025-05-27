'use client';
import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

const ViewProject = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [developer, setDeveloper] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/project/getbyid/${id}`);
        console.log(response.data);
        
        setProject(response.data);
        
        // Fetch student details if developedby is available
        if (response.data.developedby) {
          try {
            const studentResponse = await axios.get(`http://localhost:5000/student/getbyid/${response.data.developedby}`);
            console.log(studentResponse.data);
            
            setDeveloper(studentResponse.data);
          } catch (err) {
            console.error('Error fetching developer data:', err);
          }
        }
        
      } catch (error) {
        console.error('Error fetching project data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-violet-500"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <h2 className="text-2xl font-bold text-gray-700">Project not found</h2>
        <p className="mt-2 text-gray-600">The project you're looking for doesn't exist or has been removed.</p>
        <Link href="/browse-project" className="mt-6 bg-violet-600 hover:bg-violet-700 text-white py-2 px-6 rounded-lg transition duration-300">
          Browse Projects
        </Link>
      </div>
    );
  }

  // Format creation date
  const formattedDate = new Date(project.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Project Header */}
      <div className="bg-gradient-to-r from-gray-500 to-blue-500 rounded-xl p-8 mb-8 text-white">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-medium mb-3">
              {project.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{project.title}</h1>
            <p className="text-white/80">Added on {formattedDate}</p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            {project.githublink && (
              <a 
                href={project.githublink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center bg-black/30 hover:bg-black/50 text-white font-medium py-2 px-4 rounded-lg transition duration-300"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.841-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
                GitHub Repo
              </a>
            )}
            {project.viewlink && (
              <a 
                href={project.viewlink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center bg-white text-violet-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-100 transition duration-300"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Image and Video */}
        <div className="lg:col-span-2 space-y-8">
          {/* Project Image */}
          {project.image && (
            <div className="overflow-hidden rounded-xl shadow-lg">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          {/* Project Video */}
          {project.video && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Project Demo</h2>
              <div className="relative pt-[56.25%] rounded-lg overflow-hidden">
                <iframe 
                  className="absolute top-0 left-0 w-full h-full"
                  src={project.video}
                  title={project.title}
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          )}

          {/* Project Description */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">About This Project</h2>
            <p className="text-gray-700 whitespace-pre-line">{project.description}</p>
          </div>
        </div>

        {/* Right Column - Project Details */}
        <div className="space-y-6">
          {/* Category Card */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Project Details</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Category</h3>
                <p className="text-lg font-medium text-gray-900">{project.category}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Added On</h3>
                <p className="text-lg font-medium text-gray-900">{formattedDate}</p>
              </div>
            </div>
          </div>

          {/* Developer Card (if available) */}
          {developer && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Developed By</h2>
              <div className="flex items-center space-x-4">
                {developer.image ? (
                  <img src={developer.image} alt={developer.name} className="w-16 h-16 rounded-full object-cover" />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-violet-200 flex items-center justify-center">
                    <span className="text-xl font-bold text-violet-600">{developer.name?.charAt(0) || 'S'}</span>
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-semibold">{developer.name}</h3>
                  <p className="text-gray-600">{developer.department}</p>
                </div>
              </div>
              <div className="mt-4 flex space-x-3">
                {developer.githubprofile && (
                  <a 
                    href={developer.githubprofile}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-black"
                    title="GitHub Profile"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.841-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
                    </svg>
                  </a>
                )}
                {developer.linkedinprofile && (
                  <a 
                    href={developer.linkedinprofile}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-blue-600"
                    title="LinkedIn Profile"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Related Projects Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">More Projects</h2>
            <Link href="/browse-project" className="block text-violet-600 hover:text-violet-800 font-medium">
              View All Projects →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProject;