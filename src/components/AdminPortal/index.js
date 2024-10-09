import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./index.css";

const AdminPortal = () => {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', imageUrl: '' });
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  const navigate = useNavigate();

  // Check if the user is authenticated before rendering the admin portal
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated !== 'true') {
      navigate('/login'); // If not authenticated, redirect to login page
    }
  }, [navigate]);

  // Fetch existing projects from the deployed backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('https://techcreate-backend-1.onrender.com/projects');
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
    fetchProjects();
  }, []);

  // Handle form change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or update a project
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        // Update project
        await axios.put(`https://techcreate-backend-1.onrender.com/projects/${editId}`, form);
      } else {
        // Add new project
        await axios.post('https://techcreate-backend-1.onrender.com/projects', form);
      }
      setForm({ title: '', description: '', imageUrl: '' });
      setIsEdit(false);
      setEditId(null);
      // Refresh the project list without reloading the page
      fetchProjects();
    } catch (error) {
      console.error('Error adding/updating project:', error);
    }
  };

  // Delete a project
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://techcreate-backend-1.onrender.com/projects/${id}`);
      // Refresh the project list without reloading the page
      fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  // Edit a project
  const handleEdit = (project) => {
    setForm({ title: project.title, description: project.description, imageUrl: project.imageUrl });
    setIsEdit(true);
    setEditId(project._id);
  };

  // Fetch projects after any add, edit or delete operation
  const fetchProjects = async () => {
    try {
      const response = await axios.get('https://techcreate-backend-1.onrender.com/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  return (
    <div className="admin-container">
      <h1>Admin Portal</h1>
      <form className="project-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Project Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Project Description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="imageUrl"
          placeholder="Project Image URL"
          value={form.imageUrl}
          onChange={handleChange}
          required
        />
        <button type="submit">{isEdit ? 'Update Project' : 'Add Project'}</button>
      </form>

      <h2>Existing Projects</h2>
      <div className="project-list">
        {projects.map((project) => (
          <div key={project._id} className="project-card">
            <img src={project.imageUrl} alt={project.title} />
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <button onClick={() => handleEdit(project)}>Edit</button>
            <button onClick={() => handleDelete(project._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPortal;
