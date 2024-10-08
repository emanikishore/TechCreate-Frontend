import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./index.css"

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:5000/projects');
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
    fetchProjects();
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div>
      {/* Responsive Navbar */}
      <nav className="navbar">
        <div className="navbar-logo">
          <img src="https://i.ibb.co/pjtvdgP/HFu-H8y-N-Rq2jvq-DZEYq-GA-removebg-preview.png" alt="TechCreate Logo" className="logo-img" />
        </div>
        <div className="navbar-toggle" onClick={toggleMenu}>
          &#9776;
        </div>
        <ul className={`navbar-menu ${menuOpen ? 'open' : ''}`}>
          <li><a href="#">Home</a></li>
          <li><a href="#">Projects</a></li>
          <li><a href="#">About Us</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>

      {/* Projects Section */}
      <div className="project-container">
        {projects.map((project) => (
          <div key={project._id} className="project-card">
            <img src={project.imageUrl} alt={project.title} className="project-image" />
            <h1 className="project-title">{project.title}</h1>
            <p className="project-description">{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;