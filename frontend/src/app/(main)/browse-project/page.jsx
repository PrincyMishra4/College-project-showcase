'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, ArrowRight, Calendar, User, Grid, List, Eye, ExternalLink, Github } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

const BrowseProject = () => {
  const searchParams = useSearchParams();
  const departmentParam = searchParams.get('department');
  
  const [projects, setProjects] = useState([]);
  const [addProjectList, setAddProjectList] = useState([]);
  const [masterList, setMasterList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState(departmentParam || '');
  const [viewMode, setViewMode] = useState('grid');
  const [loading, setLoading] = useState(true);
  const [departments, setDepartments] = useState([]);

  const fetchProjects = () => {
    setLoading(true);
    
    // If department parameter exists, fetch only projects from that department
    const url = departmentParam 
      ? `http://localhost:5000/project/getbydepartment/${encodeURIComponent(departmentParam)}`
      : 'http://localhost:5000/project/getall';
      
    axios.get(url)
      .then((res) => {
        console.log(res.data);
        setProjects(res.data);
        setMasterList(res.data);
        
        // Extract unique categories
        const categories = [...new Set(res.data.map(project => project.addProject))].filter(Boolean);
        setAddProjectList(categories.map(category => ({ _id: category, title: { image: category } })));
        
        // Extract unique departments
        const depts = [...new Set(res.data.map(project => project.department))].filter(Boolean);
        setDepartments(depts);
        
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProjects();
  }, [departmentParam]);

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
    
    if (selectedDepartment) {
      filtered = filtered.filter(project => 
        project.department?.toLowerCase() === selectedDepartment.toLowerCase()
      );
    }
    
    setProjects(filtered);
  };
  
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    
    let filtered = masterList;
    if (category) {
      filtered = masterList.filter(project => project.addProject === category);
    }
    
    if (selectedDepartment) {
      filtered = filtered.filter(project => 
        project.department?.toLowerCase() === selectedDepartment.toLowerCase()
      );
    }
    
    if (searchTerm) {
      filtered = filtered.filter(project => 
        project.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        project.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setProjects(filtered);
  };
  
  const handleDepartmentChange = (department) => {
    setSelectedDepartment(department);
    
    let filtered = masterList;
    if (department) {
      filtered = masterList.filter(project => 
        project.department?.toLowerCase() === department.toLowerCase()
      );
    }
    
    if (selectedCategory) {
      filtered = filtered.filter(project => project.addProject === selectedCategory);
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
    setSelectedDepartment('');
    setProjects(masterList);
  };

  // Project Card Component
  const ProjectCard = ({ project, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
    >
      <Link href={'/view-project/' + project._id} className="group block">
        <div className="card-modern overflow-hidden hover:shadow-2xl hover:shadow-primary-500/10 hover:-translate-y-2 transition-all duration-500">
          {/* Project Image */}
          <div className="relative h-56 overflow-hidden">
            {project.image ? (
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">{project.title?.charAt(0) || "P"}</span>
              </div>
            )}
            {project.department && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
                className="absolute top-4 right-4 bg-white/90 dark:bg-secondary-800/90 text-primary-600 dark:text-primary-400 text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm"
              >
                {project.department}
              </motion.span>
            )}
            {project.addProject && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
                className="absolute top-4 right-4 bg-white/90 dark:bg-secondary-800/90 text-primary-600 dark:text-primary-400 text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm"
              >
                {project.addProject}
              </motion.span>
            )}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
            <motion.div 
              className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
            >
              <div className="flex space-x-2">
                <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center">
                  <Eye className="w-4 h-4 text-secondary-600" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Project Details */}
          <div className="p-6">
            <h2 className="text-xl font-bold text-secondary-800 dark:text-secondary-200 mb-3 line-clamp-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
              {project.title}
            </h2>
            <p className="text-secondary-600 dark:text-secondary-400 text-sm mb-4 line-clamp-2 leading-relaxed">
              {project.description}
            </p>
            
            <div className="flex justify-between items-center mt-6 text-sm">
              <div className="flex items-center text-secondary-500 dark:text-secondary-400">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{new Date(project.createdAt).toLocaleDateString()}</span>
              </div>
              
              <motion.div 
                className="text-primary-600 dark:text-primary-400 font-medium flex items-center group-hover:text-primary-700 dark:group-hover:text-primary-300"
                whileHover={{ x: 4 }}
              >
                <span>View project</span>
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </motion.div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );

  // Project List Item Component
  const ProjectListItem = ({ project, index }) => (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
    >
      <Link href={'/view-project/' + project._id} className="group block">
        <div className="card-modern p-6 hover:shadow-xl hover:shadow-primary-500/10 transition-all duration-300">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Project Image */}
            <div className="relative w-full md:w-48 h-32 overflow-hidden rounded-xl">
              {project.image ? (
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                  <span className="text-white text-xl font-bold">{project.title?.charAt(0) || "P"}</span>
                </div>
              )}
            </div>

            {/* Project Details */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-3">
                <h2 className="text-xl font-bold text-secondary-800 dark:text-secondary-200 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {project.title}
                </h2>
                <div className="flex gap-2">
                  {project.department && (
                    <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-medium px-3 py-1 rounded-full">
                      {project.department}
                    </span>
                  )}
                  {project.addProject && (
                    <span className="bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs font-medium px-3 py-1 rounded-full">
                      {project.addProject}
                    </span>
                  )}
                </div>
              </div>
              
              <p className="text-secondary-600 dark:text-secondary-400 mb-4 line-clamp-2 leading-relaxed">
                {project.description}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center text-secondary-500 dark:text-secondary-400 text-sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{new Date(project.createdAt).toLocaleDateString()}</span>
                </div>
                
                <motion.div 
                  className="text-primary-600 dark:text-primary-400 font-medium flex items-center"
                  whileHover={{ x: 4 }}
                >
                  <span>View project</span>
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-secondary-900 dark:via-secondary-800 dark:to-secondary-900">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-br from-primary-400/10 to-accent-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 90, 180],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute -bottom-20 -left-20 w-96 h-96 bg-gradient-to-tr from-accent-400/10 to-primary-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1.1, 1, 1.1],
            rotate: [180, 90, 0],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header Section */}
        <motion.header 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl mb-6"
          >
            <Grid className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-5xl lg:text-6xl font-bold gradient-text mb-6">
            Project Gallery
          </h1>
          <p className="text-xl text-secondary-600 dark:text-secondary-300 max-w-3xl mx-auto leading-relaxed">
            Discover innovative projects crafted by talented students and developers from across departments
          </p>
        </motion.header>

        {/* Search and Filter Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="glass rounded-2xl shadow-xl border border-white/20 dark:border-secondary-700/50 p-6 mb-10"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-4">
            <div className="relative w-full lg:flex-1">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-secondary-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search projects by title or description..."
                className="input-modern pl-12 w-full"
              />
            </div>
            
            <div className="flex w-full lg:w-auto gap-3">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`btn-modern flex items-center gap-2 px-6 py-3 ${
                  isFilterOpen 
                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/25' 
                    : 'bg-white dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 border border-secondary-200 dark:border-secondary-700'
                }`}
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </motion.button>

              {/* View Mode Toggle */}
              <div className="flex rounded-xl bg-secondary-100 dark:bg-secondary-800 p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === 'grid'
                      ? 'bg-white dark:bg-secondary-700 text-primary-600 shadow-sm'
                      : 'text-secondary-500 hover:text-secondary-700 dark:hover:text-secondary-300'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === 'list'
                      ? 'bg-white dark:bg-secondary-700 text-primary-600 shadow-sm'
                      : 'text-secondary-500 hover:text-secondary-700 dark:hover:text-secondary-300'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
              
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={resetFilters}
                className="btn-modern px-6 py-3 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 border border-primary-200 dark:border-primary-800"
              >
                Reset
              </motion.button>
            </div>
          </div>
          
          {/* Filter options */}
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 flex items-center justify-center"
                onClick={() => setIsFilterOpen(false)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-white dark:bg-secondary-900 p-6 rounded-xl shadow-xl max-w-md w-full mx-4"
                  onClick={e => e.stopPropagation()}
                >
                  <h3 className="text-xl font-bold text-secondary-800 dark:text-secondary-100 mb-4">Filter Projects</h3>
                  
                  {/* Category Filter */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-secondary-600 dark:text-secondary-400 mb-3">Category</h4>
                    <div className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar pr-2">
                      <div 
                        className={`px-3 py-2 rounded-lg cursor-pointer transition-all ${!selectedCategory ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300' : 'hover:bg-secondary-100 dark:hover:bg-secondary-800 text-secondary-600 dark:text-secondary-400'}`}
                        onClick={() => handleCategoryChange('')}
                      >
                        All Categories
                      </div>
                      {addProjectList.map(category => (
                        <div 
                          key={category._id}
                          className={`px-3 py-2 rounded-lg cursor-pointer transition-all ${selectedCategory === category._id ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300' : 'hover:bg-secondary-100 dark:hover:bg-secondary-800 text-secondary-600 dark:text-secondary-400'}`}
                          onClick={() => handleCategoryChange(category._id)}
                        >
                          {category._id}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Department Filter */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-secondary-600 dark:text-secondary-400 mb-3">Department</h4>
                    <div className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar pr-2">
                      <div 
                        className={`px-3 py-2 rounded-lg cursor-pointer transition-all ${!selectedDepartment ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300' : 'hover:bg-secondary-100 dark:hover:bg-secondary-800 text-secondary-600 dark:text-secondary-400'}`}
                        onClick={() => handleDepartmentChange('')}
                      >
                        All Departments
                      </div>
                      {departments.map(department => (
                        <div 
                          key={department}
                          className={`px-3 py-2 rounded-lg cursor-pointer transition-all ${selectedDepartment === department ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300' : 'hover:bg-secondary-100 dark:hover:bg-secondary-800 text-secondary-600 dark:text-secondary-400'}`}
                          onClick={() => handleDepartmentChange(department)}
                        >
                          {department}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex justify-between">
                    <button 
                      className="text-secondary-600 dark:text-secondary-400 hover:text-secondary-900 dark:hover:text-secondary-100 text-sm font-medium"
                      onClick={resetFilters}
                    >
                      Reset filters
                    </button>
                    <button 
                      className="bg-primary-600 hover:bg-primary-700 dark:bg-primary-600 dark:hover:bg-primary-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                      onClick={() => setIsFilterOpen(false)}
                    >
                      Apply
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full"
            />
          </div>
        ) : (
          /* Projects Display */
          <>
            {projects.length > 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                      <ProjectCard key={project._id} project={project} index={index} />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-6">
                    {projects.map((project, index) => (
                      <ProjectListItem key={project._id} project={project} index={index} />
                    ))}
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-20"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="inline-flex items-center justify-center w-24 h-24 bg-secondary-100 dark:bg-secondary-800 rounded-full mb-6"
                >
                  <Search className="w-12 h-12 text-secondary-400" />
                </motion.div>
                <h3 className="text-2xl font-semibold text-secondary-700 dark:text-secondary-300 mb-3">No projects found</h3>
                <p className="text-secondary-500 dark:text-secondary-400 mb-8">Try adjusting your search or filter criteria</p>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={resetFilters}
                  className="btn-modern bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-3 shadow-lg shadow-primary-500/25"
                >
                  Reset filters
                </motion.button>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BrowseProject;
