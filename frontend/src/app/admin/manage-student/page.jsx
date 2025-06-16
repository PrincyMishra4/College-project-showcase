"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Users,
  Search,
  Filter,
  Edit,
  Trash2,
  Plus,
  RefreshCw,
  GraduationCap,
  Mail,
  Phone,
  Calendar,
  BookOpen,
  User,
  MoreVertical,
  Archive,
  Download,
} from "lucide-react";
import Image from "next/image";

const ManageStudent = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [selectedStudents, setSelectedStudents] = useState([]);
  const router = useRouter();

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/student/getall");
      setStudents(response.data);
      setFilteredStudents(response.data);
      toast.success("Students loaded successfully");
    } catch (error) {
      console.error("Error fetching students:", error);
      toast.error("Failed to fetch students");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Filter and search logic
  useEffect(() => {
    let filtered = students;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (student) =>
          student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.rollno?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.department?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply department filter
    if (filterDepartment !== "all") {
      filtered = filtered.filter(
        (student) => student.department === filterDepartment
      );
    }

    setFilteredStudents(filtered);
  }, [students, searchTerm, filterDepartment]);

  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this student? This action cannot be undone."
      )
    ) {
      setDeleteLoading(id);
      try {
        await axios.delete(`http://localhost:5000/student/delete/${id}`);
        toast.success("Student deleted successfully");
        fetchStudents();
      } catch (error) {
        console.error("Error deleting student:", error);
        toast.error("Failed to delete student");
      } finally {
        setDeleteLoading(null);
      }
    }
  };

  const handleBulkDelete = async () => {
    if (selectedStudents.length === 0) return;

    if (
      window.confirm(
        `Are you sure you want to delete ${selectedStudents.length} students? This action cannot be undone.`
      )
    ) {
      try {
        await Promise.all(
          selectedStudents.map((id) =>
            axios.delete(`http://localhost:5000/student/delete/${id}`)
          )
        );
        toast.success(
          `${selectedStudents.length} students deleted successfully`
        );
        setSelectedStudents([]);
        fetchStudents();
      } catch (error) {
        toast.error("Failed to delete some students");
      }
    }
  };

  const departments = [
    ...new Set(students.map((student) => student.department)),
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
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
          <p className="text-gray-600 dark:text-gray-300">
            Loading students...
          </p>
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
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-accent-500 to-secondary-500 rounded-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Manage Students
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                View and manage all registered student profiles
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {selectedStudents.length > 0 && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                onClick={handleBulkDelete}
                className="btn-modern bg-danger-500 hover:bg-danger-600 text-white flex items-center gap-2"
              >
                <Trash2 className="w-5 h-5" />
                Delete Selected ({selectedStudents.length})
              </motion.button>
            )}

            <Link
              href="/admin/add-student"
              className="btn-modern bg-success-500 hover:bg-success-600 text-white flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Student
            </Link>

            <button
              onClick={fetchStudents}
              className="btn-modern bg-primary-500 hover:bg-primary-600 text-white flex items-center gap-2"
            >
              <RefreshCw className="w-5 h-5" />
              Refresh
            </button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="glass card-modern p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Students
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {students.length}
                </p>
              </div>
              <div className="p-3 bg-accent-100 dark:bg-accent-900/50 rounded-lg">
                <GraduationCap className="w-8 h-8 text-accent-600 dark:text-accent-400" />
              </div>
            </div>
          </div>

          <div className="glass card-modern p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Departments
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {departments.length}
                </p>
              </div>
              <div className="p-3 bg-secondary-100 dark:bg-secondary-900/50 rounded-lg">
                <BookOpen className="w-8 h-8 text-secondary-600 dark:text-secondary-400" />
              </div>
            </div>
          </div>

          <div className="glass card-modern p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Active Sessions
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {filteredStudents.length}
                </p>
              </div>
              <div className="p-3 bg-primary-100 dark:bg-primary-900/50 rounded-lg">
                <User className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              </div>
            </div>
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
                placeholder="Search by name, roll number, email, or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-modern pl-10 w-full"
              />
            </div>

            {/* Department Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
                className="input-modern pl-10 pr-8"
              >
                <option value="all">All Departments</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-between items-center mt-4">
            <p className="text-gray-600 dark:text-gray-300">
              Showing{" "}
              <span className="font-semibold">{filteredStudents.length}</span>{" "}
              of <span className="font-semibold">{students.length}</span>{" "}
              students
            </p>

            {filteredStudents.length !== students.length && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setFilterDepartment("all");
                }}
                className="text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 text-sm font-medium"
              >
                Clear filters
              </button>
            )}
          </div>
        </motion.div>

        {/* Students Grid */}
        {filteredStudents.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass card-modern p-16 text-center"
          >
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <Archive className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
              {searchTerm || filterDepartment !== "all"
                ? "No students match your filters"
                : "No Students Found"}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              {searchTerm || filterDepartment !== "all"
                ? "Try adjusting your search terms or filters"
                : "Start by adding student profiles to the platform"}
            </p>
            <Link
              href="/admin/add-student"
              className="btn-modern bg-primary-500 hover:bg-primary-600 text-white flex items-center gap-2 mx-auto"
            >
              <Plus className="w-5 h-5" />
              Add New Student
            </Link>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredStudents.map((student) => (
                <motion.div
                  key={student._id}
                  variants={cardVariants}
                  layout
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="glass card-modern group relative overflow-hidden"
                >
                  {/* Selection Checkbox */}
                  <div className="absolute top-4 left-4 z-10">
                    <input
                      type="checkbox"
                      checked={selectedStudents.includes(student._id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedStudents([
                            ...selectedStudents,
                            student._id,
                          ]);
                        } else {
                          setSelectedStudents(
                            selectedStudents.filter((id) => id !== student._id)
                          );
                        }
                      }}
                      className="w-5 h-5 text-primary-600 bg-white border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2"
                    />
                  </div>

                  <div className="p-6">
                    {/* Student Avatar and Basic Info */}
                    <div className="flex items-center mb-4">
                      <Image src={student.image} alt="student" className="w-16 h-16 bg-gradient-to-r from-accent-400 to-secondary-500 rounded-full flex items-center object-cover justify-center text-white font-bold text-lg mr-4" />

                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                          {student.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Roll No: {student.rollno}
                        </p>
                      </div>
                    </div>

                    {/* Student Details */}
                    <div className="space-y-3 mb-6">
                      {student.email && (
                        <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span className="truncate">{student.email}</span>
                        </div>
                      )}

                      {student.phone && (
                        <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span>{student.phone}</span>
                        </div>
                      )}

                      {student.department && (
                        <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                          <BookOpen className="w-4 h-4 text-gray-400" />
                          <span>{student.department}</span>
                        </div>
                      )}

                      {student.createdAt && (
                        <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span>
                            Joined{" "}
                            {new Date(student.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          router.push(`/admin/update-student/${student._id}`)
                        }
                        className="btn-modern bg-primary-500 hover:bg-primary-600 text-white flex items-center gap-2 flex-1 justify-center text-sm"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(student._id)}
                        disabled={deleteLoading === student._id}
                        className="btn-modern bg-danger-500 hover:bg-danger-600 text-white p-2 disabled:opacity-50"
                      >
                        {deleteLoading === student._id ? (
                          <RefreshCw className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-accent-500/5 to-secondary-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ManageStudent;
