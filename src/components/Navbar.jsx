import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <span className="brand-icon">◈</span>
        <span className="brand-text">KanbanFlow</span>
      </Link>
      <div className="navbar-links">
        <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Tableau
        </NavLink>
        <NavLink to="/users" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Utilisateurs
        </NavLink>
        <Link to="/tasks/new" className="btn btn-primary btn-sm">
          + Nouvelle tâche
        </Link>
      </div>
    </nav>
  );
}