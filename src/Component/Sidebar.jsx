import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styles from "../css_styles/sidebar.module.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(
    localStorage.getItem("sidebarOpen") === "true"
  );

  
  useEffect(() => {
    localStorage.setItem("sidebarOpen", isOpen);
  }, [isOpen]);

  return (
    <div>
    
      <button className={styles.toggleButton} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "Close Menu" : "Open Menu"}
      </button>

      
      <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <h2>HR Dashboard</h2>
        <ul>
          <li>
            <NavLink to="/home">Home</NavLink>
          </li>
          <li>
            <NavLink to="/employee/detail">Employee Details</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/usersadd">Add Employees</NavLink>
          </li>
          <li>
            <NavLink to="/Categories">Job Categories</NavLink>
          </li>
          <li>
            <NavLink to="/employeereport">Employee Report</NavLink>
          </li>
          <li>
            <NavLink to="/addrepost">Employee  Add Report</NavLink>
          </li>
          <li>
            <NavLink to="/">Login Out</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
