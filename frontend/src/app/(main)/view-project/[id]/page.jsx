'use client';
import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Github, 
  ExternalLink, 
  Calendar, 
  User, 
  Tag, 
  Eye, 
  Play, 
  ArrowLeft,
  MapPin,
  Linkedin,
  Clock,
  Heart,
  Share,
  Download
} from 'lucide-react';
import { ClientParticlesBackground } from '@/components/ParticlesBackground';
import { ClientOnly } from '@/utils/clientUtils';

// Define base API URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const ViewProject = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [developer, setDeveloper] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/project/getbyid/${id}`);
        console.log(response.data);
        
        setProject(response.data);
        
        // Fetch student details if developedby is available
        if (response.data.developedby) {
          try {
            const studentResponse = await axios.get(`${API_BASE_URL}/student/getbyid/${response.data.developedby}`);
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

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: project.title,
        text: project.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-secondary-900 dark:via-secondary-800 dark:to-secondary-900 flex justify-center items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center space-y-4"
        >
          <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading project details...</p>
        </motion.div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-secondary-900 dark:via-secondary-800 dark:to-secondary-900 flex flex-col items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-24 h-24 bg-danger-100 rounded-full flex items-center justify-center mb-6 mx-auto">
            <Eye className="w-12 h-12 text-danger-500" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Project Not Found</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md">
            The project you're looking for doesn't exist or has been removed.
          </p>
          <Link 
            href="/browse-project" 
            className="btn-modern bg-primary-500 hover:bg-primary-600 text-white inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Browse Projects
          </Link>
        </motion.div>
      </div>
    );
  }

  // Format creation date
  const formattedDate = new Date(project.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const relativeTime = new Date(project.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-secondary-900 dark:via-secondary-800 dark:to-secondary-900">
      {/* Add consistent particle background */}
      <ClientParticlesBackground 
        particleCount={10} 
        seed={876} 
        particleClassName="bg-primary-400/10" 
      />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link 
            href="/browse-project"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Projects
          </Link>
        </motion.div>

        {/* Project Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass card-modern p-8 mb-8 bg-gradient-to-r from-primary-500/10 to-accent-500/10 dark:from-primary-400/10 dark:to-accent-400/10 border border-primary-200/50 dark:border-primary-700/50"
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium">
                  <Tag className="w-4 h-4" />
                  {project.category}
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                  <Calendar className="w-4 h-4" />
                  {relativeTime}
                </span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {project.title}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                {project.description?.substring(0, 200)}...
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLike}
                className={`btn-modern flex items-center gap-2 ${
                  isLiked 
                    ? 'bg-danger-500 hover:bg-danger-600 text-white' 
                    : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300'
                }`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                Like
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShare}
                className="btn-modern bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 flex items-center gap-2"
              >
                <Share className="w-5 h-5" />
                Share
              </motion.button>

              {project.githublink && (
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={project.githublink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-modern bg-gray-900 hover:bg-gray-800 text-white flex items-center gap-2"
                >
                  <Github className="w-5 h-5" />
                  GitHub
                </motion.a>
              )}
              
              {project.viewlink && (
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={project.viewlink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-modern bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white flex items-center gap-2"
                >
                  <ExternalLink className="w-5 h-5" />
                  Live Demo
                </motion.a>
              )}
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Media and Description */}
          <div className="lg:col-span-2 space-y-8">
            {/* Project Image */}
            {project.image && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass card-modern overflow-hidden"
              >
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-auto object-cover rounded-lg"
                />
              </motion.div>
            )}

            {/* Project Video */}
            {project.video && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="glass card-modern p-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Play className="w-6 h-6 text-primary-500" />
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Project Demo</h2>
                </div>
                <div className="relative pt-[56.25%] rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <iframe 
                    className="absolute top-0 left-0 w-full h-full"
                    src={project.video}
                    title={project.title}
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                </div>
              </motion.div>
            )}

            {/* Project Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass card-modern p-6"
            >
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                <Eye className="w-6 h-6 text-primary-500" />
                About This Project
              </h2>
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
                  {project.description}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Project Details and Developer */}
          <div className="space-y-6">
            {/* Project Details Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glass card-modern p-6"
            >
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                <Tag className="w-6 h-6 text-primary-500" />
                Project Details
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Category</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">{project.category}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Added On</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">{formattedDate}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</span>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-success-100 text-success-800 dark:bg-success-900/50 dark:text-success-300">
                    Published
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Developer Card */}
            {developer && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="glass card-modern p-6"
              >
                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                  <User className="w-6 h-6 text-primary-500" />
                  Developer
                </h2>
                <div className="flex items-start space-x-4">
                  {developer.image ? (
                    <img src={developer.image} alt={developer.name} className="w-16 h-16 rounded-full object-cover ring-2 ring-primary-200 dark:ring-primary-700" />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center ring-2 ring-primary-200 dark:ring-primary-700">
                      <span className="text-xl font-bold text-white">{developer.name?.charAt(0) || 'S'}</span>
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{developer.name}</h3>
                    {developer.department && (
                      <p className="text-gray-600 dark:text-gray-300 flex items-center gap-1 mt-1">
                        <MapPin className="w-4 h-4" />
                        {developer.department}
                      </p>
                    )}
                  </div>
                </div>
                
                {(developer.githubprofile || developer.linkedinprofile) && (
                  <div className="mt-4 flex space-x-3">
                    {developer.githubprofile && (
                      <a 
                        href={developer.githubprofile}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-900 hover:bg-gray-800 text-white rounded-lg text-sm transition-colors"
                      >
                        <Github className="w-4 h-4" />
                        GitHub
                      </a>
                    )}
                    {developer.linkedinprofile && (
                      <a 
                        href={developer.linkedinprofile}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors"
                      >
                        <Linkedin className="w-4 h-4" />
                        LinkedIn
                      </a>
                    )}
                  </div>
                )}
              </motion.div>
            )}

            {/* More Projects */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="glass card-modern p-6"
            >
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Explore More</h2>
              <div className="space-y-3">
                <Link 
                  href="/browse-project" 
                  className="block p-3 rounded-lg bg-primary-50 hover:bg-primary-100 dark:bg-primary-900/50 dark:hover:bg-primary-900/70 transition-colors group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-primary-700 dark:text-primary-300 font-medium">Browse All Projects</span>
                    <ArrowLeft className="w-5 h-5 text-primary-500 group-hover:translate-x-1 transition-transform rotate-180" />
                  </div>
                </Link>
                <Link 
                  href="/browse-department" 
                  className="block p-3 rounded-lg bg-accent-50 hover:bg-accent-100 dark:bg-accent-900/50 dark:hover:bg-accent-900/70 transition-colors group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-accent-700 dark:text-accent-300 font-medium">Browse by Department</span>
                    <ArrowLeft className="w-5 h-5 text-accent-500 group-hover:translate-x-1 transition-transform rotate-180" />
                  </div>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProject;
