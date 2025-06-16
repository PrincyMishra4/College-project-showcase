"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { 
  Edit, 
  Trash2, 
  Plus, 
  RefreshCw, 
  Github, 
  ExternalLink, 
  Play, 
  Check, 
  X,
  Calendar,
  User,
  Tag,
  Search,
  Filter,
  Eye,
  MoreVertical,
  Archive,
  Star,
  AlertCircle
} from "lucide-react";

const ManageProject = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedProjects, setSelectedProjects] = useState([]);
  const router = useRouter();
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/project/admin/getall");
      setProjects(response.data);
      setFilteredProjects(response.data);
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
        const response = await axios.get("http://localhost:5000/project/admin/getall", {
          signal: controller.signal
        });
        setProjects(response.data);
        setFilteredProjects(response.data);
      } catch (error) {
        if (!axios.isCancel(error)) {
          console.error("Error fetching projects:", error);
          toast.error("Failed to fetch projects: " + (error.response?.data?.message || error.message));
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjects();
    
    return () => {
      controller.abort();
    };
  }, []);

  // Filter and search logic
  useEffect(() => {
    let filtered = projects;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.category?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }        // Apply status filter
    if (filterStatus !== "all") {
      filtered = filtered.filter(project => {
        switch (filterStatus) {
          case "approved":
            return project.approved;
          case "pending":
            return !project.approved;
          default:
            return true;
        }
      });
    }

    setFilteredProjects(filtered);
  }, [projects, searchTerm, filterStatus]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project? This action cannot be undone.")) {
      setDeleteLoading(id);
      try {
        await axios.delete(`http://localhost:5000/Project/delete/${id}`);
        toast.success("Project deleted successfully");
        fetchProjects();
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
      const project = projects.find(p => p._id === id);
      const newStatus = !project.approved;

      await axios.put(`http://localhost:5000/project/update/${id}`, {
        approved: newStatus
      });
      
      toast.success(`Project ${newStatus ? 'approved' : 'unapproved'} successfully`);
      
      setProjects(projects.map(p => 
        p._id === id ? { ...p, approved: newStatus } : p
      ));
    } catch (error) {
      console.error("Error updating approval status:", error);
      toast.error("Failed to update approval status: " + (error.response?.data?.message || error.message));
    }
  };

  const handleBulkDelete = async () => {
    if (selectedProjects.length === 0) return;
    
    if (window.confirm(`Are you sure you want to delete ${selectedProjects.length} projects? This action cannot be undone.`)) {
      try {
        await Promise.all(
          selectedProjects.map(id => 
            axios.delete(`http://localhost:5000/Project/delete/${id}`)
          )
        );
        toast.success(`${selectedProjects.length} projects deleted successfully`);
        setSelectedProjects([]);
        fetchProjects();
      } catch (error) {
        toast.error("Failed to delete some projects");
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
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
          <p className="text-gray-600 dark:text-gray-300">Loading projects...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-secondary-900 dark:via-secondary-800 dark:to-secondary-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Manage Projects
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Review, approve, and manage all student project submissions
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {selectedProjects.length > 0 && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                onClick={handleBulkDelete}
                className="btn-modern bg-danger-500 hover:bg-danger-600 text-white flex items-center gap-2"
              >
                <Trash2 className="w-5 h-5" />
                Delete Selected ({selectedProjects.length})
              </motion.button>
            )}
            
            <button
              onClick={() => router.push("/admin/add-project")}
              className="btn-modern bg-success-500 hover:bg-success-600 text-white flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Project
            </button>
            
            <button
              onClick={fetchProjects}
              className="btn-modern bg-primary-500 hover:bg-primary-600 text-white flex items-center gap-2"
            >
              <RefreshCw className="w-5 h-5" />
              Refresh
            </button>
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="glass card-modern p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search projects by title, description, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-modern pl-10 w-full"
              />
            </div>
            
            {/* Status Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="input-modern pl-10 pr-8"
              >
                <option value="all">All Projects</option>
                <option value="approved">Approved</option>
                <option value="pending">Pending Approval</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-4">
            <p className="text-gray-600 dark:text-gray-300">
              Showing <span className="font-semibold">{filteredProjects.length}</span> of{" "}
              <span className="font-semibold">{projects.length}</span> projects
            </p>
            
            {filteredProjects.length !== projects.length && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setFilterStatus("all");
                }}
                className="text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 text-sm font-medium"
              >
                Clear filters
              </button>
            )}
          </div>
        </motion.div>
        
        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass card-modern p-16 text-center"
          >
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <Archive className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
              {searchTerm || filterStatus !== "all" ? "No projects match your filters" : "No Projects Found"}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              {searchTerm || filterStatus !== "all" 
                ? "Try adjusting your search terms or filters"
                : "Start by adding your first project to the platform"
              }
            </p>
            <button
              onClick={() => router.push("/admin/add-project")}
              className="btn-modern bg-primary-500 hover:bg-primary-600 text-white flex items-center gap-2 mx-auto"
            >
              <Plus className="w-5 h-5" />
              Add New Project
            </button>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <motion.div
                  key={project._id}
                  variants={cardVariants}
                  layout
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="glass card-modern group relative overflow-hidden"
                >
                  {/* Selection Checkbox */}
                  <div className="absolute top-4 left-4 z-10">
                    <input
                      type="checkbox"
                      checked={selectedProjects.includes(project._id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedProjects([...selectedProjects, project._id]);
                        } else {
                          setSelectedProjects(selectedProjects.filter(id => id !== project._id));
                        }
                      }}
                      className="w-5 h-5 text-primary-600 bg-white border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2"
                    />
                  </div>

                  {/* Status Badge */}                  <div className="absolute top-4 right-4 z-10">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      project.approved
                        ? 'bg-success-100 text-success-800 dark:bg-success-900/50 dark:text-success-300'
                        : 'bg-warning-100 text-warning-800 dark:bg-warning-900/50 dark:text-warning-300'
                    }`}>
                      {project.approved ? (
                        <>
                          <Check className="w-3 h-3 mr-1" />
                          Approved
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-3 h-3 mr-1" />
                          Pending
                        </>
                      )}
                    </span>
                  </div>                  {/* Project Image */}
                  {project.image && (
                    <div className="h-48 overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={400}
                        height={192}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  )}

                  <div className="p-6">
                    {/* Title and Category */}
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                        {project.title}
                      </h3>
                      {project.category && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 rounded-full text-sm">
                          <Tag className="w-3 h-3" />
                          {project.category}
                        </span>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Project Info */}
                    <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
                      {project.createdAt && (
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {new Date(project.createdAt).toLocaleDateString()}
                        </div>
                      )}
                      {project.developedby && (
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          Developer ID: {project.developedby}
                        </div>
                      )}
                    </div>

                    {/* External Links */}
                    <div className="flex gap-2 mb-6">
                      {project.githublink && (
                        <a
                          href={project.githublink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition-colors"
                          title="GitHub Repository"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {project.viewlink && (
                        <a
                          href={project.viewlink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
                          title="Live Demo"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      {project.video && (
                        <a
                          href={project.video}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                          title="Video Demo"
                        >
                          <Play className="w-4 h-4" />
                        </a>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Link
                        href={`/view-project/${project._id}`}
                        className="btn-modern bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 flex items-center gap-2 flex-1 justify-center text-sm"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </Link>
                      
                      <button
                        onClick={() => handleUpdate(project._id)}
                        className="btn-modern bg-primary-500 hover:bg-primary-600 text-white flex items-center gap-2 flex-1 justify-center text-sm"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>
                        <button
                        onClick={() => handleApprove(project._id)}
                        className={`btn-modern flex items-center gap-2 flex-1 justify-center text-sm ${
                          project.approved
                            ? 'bg-warning-500 hover:bg-warning-600 text-white'
                            : 'bg-success-500 hover:bg-success-600 text-white'
                        }`}
                      >
                        {project.approved ? (
                          <>
                            <X className="w-4 h-4" />
                            Unapprove
                          </>
                        ) : (
                          <>
                            <Check className="w-4 h-4" />
                            Approve
                          </>
                        )}
                      </button>
                      
                      <button
                        onClick={() => handleDelete(project._id)}
                        disabled={deleteLoading === project._id}
                        className="btn-modern bg-danger-500 hover:bg-danger-600 text-white p-2 disabled:opacity-50"
                      >
                        {deleteLoading === project._id ? (
                          <RefreshCw className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-accent-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ManageProject;
