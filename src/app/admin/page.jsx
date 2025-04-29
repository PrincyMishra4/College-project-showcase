'use client';
import React from 'react';
import Link from 'next/link';

const AdminHome = () => {
  return (
    <div className="bg-gray-50 dark:bg-neutral-900 min-h-screen">
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white sm:text-4xl mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your college project showcase platform
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Projects Card */}
          <div className="group flex flex-col h-full bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/[.7]">
            <div className="h-52 flex flex-col justify-center items-center bg-blue-50 rounded-t-xl dark:bg-neutral-700">
              <svg className="w-16 h-16 text-blue-600 dark:text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776" />
              </svg>
            </div>
            
            <div className="p-5 sm:p-6 flex-grow">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-neutral-200">
                Projects
              </h3>
              <p className="mt-2 text-gray-600 dark:text-neutral-400">
                Manage all projects submitted by students.
              </p>
            </div>
            
            <div className="p-5 sm:p-6 border-t border-gray-200 dark:border-neutral-700">
              <Link 
                href="/admin/manage-project" 
                className="inline-flex items-center gap-x-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Manage Projects
                <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link 
                href="/admin/add-project" 
                className="ml-4 inline-flex items-center gap-x-2 text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
              >
                Add New
                <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14" />
                  <path d="M5 12h14" />
                </svg>
              </Link>
            </div>
          </div>
          
          {/* Students Card */}
          <div className="group flex flex-col h-full bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/[.7]">
            <div className="h-52 flex flex-col justify-center items-center bg-amber-50 rounded-t-xl dark:bg-neutral-700">
              <svg className="w-16 h-16 text-amber-600 dark:text-amber-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
              </svg>
            </div>
            
            <div className="p-5 sm:p-6 flex-grow">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-neutral-200">
                Students
              </h3>
              <p className="mt-2 text-gray-600 dark:text-neutral-400">
                Manage student profiles and information.
              </p>
            </div>
            
            <div className="p-5 sm:p-6 border-t border-gray-200 dark:border-neutral-700">
              <Link 
                href="/admin/manage-student" 
                className="inline-flex items-center gap-x-2 text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300"
              >
                Manage Students
                <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link 
                href="/admin/add-student" 
                className="ml-4 inline-flex items-center gap-x-2 text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
              >
                Add New
                <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14" />
                  <path d="M5 12h14" />
                </svg>
              </Link>
            </div>
          </div>
          
          {/* Users Card */}
          <div className="group flex flex-col h-full bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/[.7]">
            <div className="h-52 flex flex-col justify-center items-center bg-purple-50 rounded-t-xl dark:bg-neutral-700">
              <svg className="w-16 h-16 text-purple-600 dark:text-purple-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
              </svg>
            </div>
            
            <div className="p-5 sm:p-6 flex-grow">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-neutral-200">
                Users
              </h3>
              <p className="mt-2 text-gray-600 dark:text-neutral-400">
                Manage user accounts and permissions.
              </p>
            </div>
            
            <div className="p-5 sm:p-6 border-t border-gray-200 dark:border-neutral-700">
              <Link 
                href="/admin/manage-user" 
                className="inline-flex items-center gap-x-2 text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
              >
                Manage Users
                <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;