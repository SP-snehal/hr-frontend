import React from "react";
import { NavLink } from "react-router-dom";
import { FaUsers, FaChartBar, FaBriefcase, FaBuilding, FaHeadset, FaEnvelope, FaPhone } from "react-icons/fa";
import "../css_styles/HomePage.css"; // Import CSS for styling
import Sidebar from "./Sidebar"; 

export default function HomePage() {
  return (
    <div className="React">
    <div className="homepage">
    <Sidebar /> 
      {/* Header Section */}
      <header className="header">
        <h1>HR Management System</h1>
        <p>Streamlining Workforce Management Efficiently</p>
      </header>

      {/* Navigation Bar */}
      <nav className="navbar">
        <ul>
          <li><NavLink to="/home">Home</NavLink></li>
          <li><NavLink to="/employee/detail">Employee Details</NavLink></li>
          <li><NavLink to="/dashboard">Dashboard</NavLink></li>
          <li><NavLink to="/usersadd">Add User</NavLink></li>
          <li><NavLink to="/Categories">Job Categories</NavLink></li>
          <li><NavLink to="/employeereport">Employee Report</NavLink></li>
        </ul>
      </nav>

      {/* Company Overview Section */}
      <section className="company-section">
        <div className="company-details">
          <FaBuilding className="icon" />
          <h2>About Our Company</h2>
          <p>Providing world-class HR solutions to businesses globally, ensuring streamlined employee management, recruitment, and workforce analytics.</p>
        </div>
      </section>

      {/* Employee Analytics Section */}
      <section className="analytics-section">
      
        <h2>Workforce Analytics</h2>
        <div className="stats-grid">
          <div className="stats-card">
            <FaUsers className="stats-icon" />
            <h3>Total Employees</h3>
            <p>500+</p>
          </div>
          <div className="stats-card">
            <FaChartBar className="stats-icon" />
            <h3>Performance Reports</h3>
            <p>120 Generated</p>
          </div>
          <div className="stats-card">
            <FaBriefcase className="stats-icon" />
            <h3>Active Job Listings</h3>
            <p>25 Positions Open</p>
          </div>
        </div>
      </section>
    </div>
    </div>
  );
}
