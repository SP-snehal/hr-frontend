import React, { useState } from "react";
import styles from "../css_styles/useradd.module.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Sidebar from "./Sidebar";
import axios from "axios";

function UserAdd() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    emp_name: "",
    emp_last_name: "",
    emp_salary: "",
    emp_age: "",
    address: "",
    emp_panno: "",
    emp_adharcard: "",
    email: "",
    emp_date_of_joining: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const updatedFormData = {
      ...formData,
      emp_salary: parseFloat(formData.emp_salary),
      emp_age: parseInt(formData.emp_age),
    };
  
    try {
      const response = await axios.post("http://localhost:8085/api/v1/users", updatedFormData);
      console.log(response.data);
      if (response.status === 200) {
        toast.success("Employee Added successfully");
        setTimeout(() => {
          window.location.reload(); // fixed this line
        }, 200);
        navigate("/registration");
      }
    } catch (error) {
      toast.error("Error adding employee");
      console.error(error.response?.data || error);
    }
  };
  

  return (
    <div className={styles.formcontainer}>
     <Sidebar />
      <form className={styles.registrationform} onSubmit={handleSubmit}>
        <h2>Employee Registration</h2>

        <div className={styles.formFields}>
          <div>
            <label htmlFor="emp_name">Employee Name</label>
            <input type="text" name="emp_name" value={formData.emp_name} onChange={handleChange} required />
          </div>

          <div>
            <label htmlFor="emp_last_name">Last Name</label>
            <input type="text" name="emp_last_name" value={formData.emp_last_name} onChange={handleChange} required />
          </div>

          <div>
            <label htmlFor="emp_salary">Salary</label>
            <input type="text" name="emp_salary" value={formData.emp_salary} onChange={handleChange} required />
          </div>

          <div>
            <label htmlFor="emp_age">Age</label>
            <input type="text" name="emp_age" value={formData.emp_age} onChange={handleChange} required />
          </div>

          <div className={styles.fullWidth}>
            <label htmlFor="address">Address</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} required />
          </div>

          <div>
            <label htmlFor="emp_panno">PAN Number</label>
            <input type="text" name="emp_panno" value={formData.emp_panno} onChange={handleChange} required />
          </div>

          <div>
            <label htmlFor="emp_adharcard">Aadhar Card</label>
            <input type="text" name="emp_adharcard" value={formData.emp_adharcard} onChange={handleChange} required />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div>
            <label htmlFor="emp_date_of_joining">Joining Date</label>
            <input type="date" name="emp_date_of_joining" value={formData.emp_date_of_joining} onChange={handleChange} required />
          </div>
        </div>

        <div className={styles.btnContainer}>
          <button type="submit" className={styles.submitbtn}>Add User</button>
          <button type="button" className={styles.submitbtn} onClick={() => navigate("/dashboard")}>Back</button>
        </div>
      </form>
    </div>
  );
}

export default UserAdd;
