'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const BrowseProject = () => {
  const [projects, setProjects] = useState([]);
  const [addProjectList, setAddProjectList] = useState([]);
  const [masterList, setMasterList] = useState([]);



  const fetchProjects = () => {
    axios.get('http://localhost:5000/project/getall')
      .then((res) => {
        console.log(res.data);
        setProjects(res.data);
        setMasterList(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchProjects();
  }, []);


  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Header Section */}
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800">Browse Project</h1>
      </header>

      <h3 className="mb-4 text-lg font-semibold">Add Project</h3>
      <select
        className="p-2 border rounded-lg mb-6"
        onChange={e => {
          console.log(e.target.value);
          setProjects(
            masterList.filter(post => post.addProject === e.target.value)
          );
        }}
      >
        {addProjectList.map((addProject) => (
          <option key={addProject._id} value={addProject.title.image}>{addProject.title.image}</option>
        ))}
      </select>

      {/* Courses Grid */}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        {projects.map((project) => (
          <Link href={'/view-project/' + project._id} key={project._id} className="bg-white shadow-lg rounded-lg overflow-hidden p-6">
            {/* Course Image */}
            {project.image ? (
              <img src={project.image} alt={project.title} className="w-full h-48 object-cover rounded-lg mb-4" />
            ) : (
              <img src="/default-course-image.jpg" alt="Default Course" className="w-full h-48 object-cover rounded-lg mb-4" />
            )}

            {/* Course Details */}
            {/* <div className="flex items-center mb-2">
              <div className="bg-gray-200 w-10 h-10 rounded-full mr-3"></div>
              <p className="font-semibold">{project.username}</p>
            </div> */}

            <h2 className="text-xl font-semibold text-gray-800 mb-2">{project.title}</h2>
            <p className="text-gray-600 text-sm mb-4">{project.description}</p>

            description

            <p className="text-sm text-gray-500 mt-4">
              {new Date(project.createdAt).toLocaleDateString()} at {new Date(project.createdAt).toLocaleTimeString()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BrowseProject;