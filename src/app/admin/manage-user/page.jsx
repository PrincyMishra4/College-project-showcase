"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
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
  Shield,
  Mail,
  Phone,
  Calendar,
  User,
  Crown,
  Archive,
  AlertCircle,
  Check,
  X
} from "lucide-react";

const ManageUser = () => {
  const [userList, setuserList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/user/getall');

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      // Check if the response is in JSON format
      const data = await response.json();
      console.log(data);
      setuserList(data);
    } catch (error) {
      console.error('Error fetching user data:', error);

      // Handle specific errors
      if (error instanceof SyntaxError) {
        toast.error('Invalid JSON response from the server');
      } else {
        toast.error('Error fetching user data');
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  const deleteUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/user/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log(data);
      
      // The backend returns the deleted user object directly, not a {success: true} object
      // So if we get a response with an _id, it means the deletion was successful
      if (data && data._id) {
        toast.success('User deleted successfully');
        setuserList(userList.filter(user => user._id !== id));
      } else {
        toast.error('Error deleting user');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error deleting user');
    }
  }
  
  useEffect(() => {
    fetchUser();
  }, [])

  return (
    <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <div className="bg-white dark:bg-neutral-800 shadow-md rounded-xl overflow-hidden border border-gray-200 dark:border-neutral-700">
        {/* Header */}
        <div className="px-4 py-4 sm:px-6 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-neutral-700">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-neutral-200">
              Users
            </h2>
            <p className="text-sm text-gray-600 dark:text-neutral-400">
              Manage all users in the system
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              className="inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg px-4 py-2.5 border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
              onClick={fetchUser}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
            <a
              className="inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg px-4 py-2.5 border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-800"
              href="/admin/add-student"
            >
              <svg
                className="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="M12 5v14" />
              </svg>
              Add Student
            </a>
          </div>
        </div>
        {/* End Header */}

        {/* Table Container with Responsive Scroll */}
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="flex justify-center items-center p-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : userList.length === 0 ? (
            <div className="text-center p-8">
              <p className="text-gray-500 dark:text-neutral-400">No users found</p>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
              <thead className="bg-gray-50 dark:bg-neutral-800">
                <tr>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-800 dark:text-neutral-200"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-800 dark:text-neutral-200"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-800 dark:text-neutral-200"
                  >
                    Created
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-800 dark:text-neutral-200"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-neutral-700 bg-white dark:bg-neutral-900">
                {userList.map(user => (
                  <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-neutral-800">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-9 w-9 flex-shrink-0 rounded-full bg-gray-100 dark:bg-neutral-700">
                          <img
                            className="h-9 w-9 rounded-full object-cover"
                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`}
                            alt={user.name}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-neutral-200">
                            {user.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-neutral-200">{user.email}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 dark:text-neutral-400">
                        {new Date(user.createdAt).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm">
                      <div className="flex space-x-3">
                        <button
                          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
                          onClick={() => {
                            window.location.href = `/admin/update-user/${user._id}`;
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 font-medium transition-colors"
                          onClick={() => {
                            if (window.confirm('Are you sure you want to delete this user?')) {
                              deleteUser(user._id);
                            }
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination Footer */}
        <div className="px-4 py-3 sm:px-6 flex flex-col sm:flex-row justify-between items-center border-t border-gray-200 dark:border-neutral-700">
          <div className="mb-2 sm:mb-0">
            <p className="text-sm text-gray-700 dark:text-neutral-400">
              Showing <span className="font-medium">{userList.length}</span> users
            </p>
          </div>
          <div className="flex justify-between gap-x-2">
            <button
              type="button"
              disabled
              className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md border border-gray-300 bg-white text-gray-700 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 disabled:opacity-50"
            >
              <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Previous
            </button>
            <button
              type="button"
              disabled
              className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md border border-gray-300 bg-white text-gray-700 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 disabled:opacity-50"
            >
              Next
              <svg className="h-5 w-5 ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageUser;