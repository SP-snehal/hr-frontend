import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../css_styles/EmployeeDetail.module.css";  // ✅ Import CSS file
import Sidebar from "./Sidebar";  // ✅ Sidebar Component

const EmployeeDetail = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    // ✅ API Call to Fetch Employee Data
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get("http://localhost:8085/api/v1/users");
                console.log("API Response:", response.data); // Debugging
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setLoading(false);  // ✅ Set loading to false
            }
        };

        fetchUserData();
    }, []);

    // ✅ Logout function
    const handleLogout = () => {
        localStorage.removeItem("valid");
        navigate("/dashboard");
    };



    return (
        <div className={styles.React}>
            <div className={styles.header}>Employee Management System</div>
            <Sidebar />  {/* ✅ Sidebar added */}

            {loading ? (
                <h3>Loading...</h3>
            ) : users.length > 0 ? (
                <div className={styles.gridContainer}> 
                    {users.map((user) => (
                        <div key={user.hr_id} className={styles.employeeCard}>
                            {/* ✅ Employee Image */}
                            {/* ✅ Employee Info */}
                            <div className={styles.employeeInfo}>
                                <h3>{user.emp_name} {user.emp_last_name}</h3>
                                <p><strong>Email:</strong> {user.email}</p>
                                <p><strong>Salary:</strong> ₹ {user.emp_salary}</p>
                            </div>
                            {/* ✅ Edit & Logout Buttons */}
                            <div className={styles.buttonContainer}>
                                <button 
                                    className={styles.btnPrimary}
                                    onClick={() => navigate(`/edituseradd/${user.hr_id}`, { state: user })}
                                >
                                    Edit
                                </button>
                                <button className={styles.btnDanger} onClick={handleLogout}>
                                    Dashboar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <h3>No employees found</h3>
            )}
        </div>
    );
};

export default EmployeeDetail;
