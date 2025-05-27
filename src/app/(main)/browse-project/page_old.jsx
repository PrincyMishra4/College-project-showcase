'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, ArrowRight, Calendar, User, Grid, List, Eye, ExternalLink, Github } from 'lucide-react';

const BrowseProject = () => {
  const [projects, setProjects] = useState([]);
  const [addProjectList, setAddProjectList] = useState([]);
  const [masterList, setMasterList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [loading, setLoading] = useState(true);
  const fetchProjects = () => {
    setLoading(true);
    axios.get('http://localhost:5000/project/getall')
      .then((res) => {
        console.log(res.data);
        setProjects(res.data);
        setMasterList(res.data);
        
        // Extract unique categories
        const categories = [...new Set(res.data.map(project => project.addProject))].filter(Boolean);
        setAddProjectList(categories.map(category => ({ _id: category, title: { image: category } })));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    let filtered = masterList;
    if (term) {
      filtered = masterList.filter(project => 
        project.title?.toLowerCase().includes(term.toLowerCase()) || 
        project.description?.toLowerCase().includes(term.toLowerCase())
      );
    }
    
    if (selectedCategory) {
      filtered = filtered.filter(project => project.addProject === selectedCategory);
    }
    
    setProjects(filtered);
  };
  
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    
    let filtered = masterList;
    if (category) {
      filtered = masterList.filter(project => project.addProject === category);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(project => 
        project.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        project.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setProjects(filtered);
  };
  
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setProjects(masterList);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <header className="text-center mb-10">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">Project Gallery</h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Explore innovative projects created by talented students and developers
        </p>
      </header>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-10">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-4">
          <div className="relative w-full md:w-2/3">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search projects by title or description..."
              className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            />
          </div>
          
          <div className="flex w-full md:w-auto gap-3">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition duration-200"
            >
              <FiFilter />
              <span>Filters</span>
            </button>
            
            <button 
              onClick={resetFilters}
              className="px-4 py-3 text-blue-600 hover:bg-blue-50 rounded-lg transition duration-200"
            >
              Reset
            </button>
          </div>
        </div>
        
        {/* Filter options */}
        {isFilterOpen && (
          <div className="mt-4 p-4 border-t border-gray-200">
            <h3 className="mb-4 text-lg font-semibold">Filter by Category</h3>
            <div className="flex flex-wrap gap-2">
              {addProjectList.map((category) => (
                <button
                  key={category._id}
                  onClick={() => handleCategoryChange(category.title.image)}
                  className={`px-4 py-2 rounded-full transition duration-200 ${
                    selectedCategory === category.title.image
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                  }`}
                >
                  {category.title.image}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Projects Grid */}
      {projects.length > 0 ? (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
          {projects.map((project) => (
            <Link href={'/view-project/' + project._id} key={project._id} className="group">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                {/* Project Image */}
                <div className="relative h-52 overflow-hidden">
                  {project.image ? (
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                      <span className="text-white text-xl font-semibold">{project.title?.charAt(0) || "P"}</span>
                    </div>
                  )}
                  {project.addProject && (
                    <span className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-medium px-2.5 py-1 rounded-full">
                      {project.addProject}
                    </span>
                  )}
                </div>

                {/* Project Details */}
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">{project.title}</h2>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>
                  
                  <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <FiCalendar className="mr-1" />
                      <span>{new Date(project.createdAt).toLocaleDateString()}</span>
                    </div>
                    
                    <div className="text-blue-600 font-medium flex items-center group-hover:text-blue-800">
                      <span>View project</span>
                      <FiArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 text-5xl mb-4">🔍</div>
          <h3 className="text-2xl font-semibold text-gray-700 mb-2">No projects found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          <button 
            onClick={resetFilters}
            className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
};

export default BrowseProject;