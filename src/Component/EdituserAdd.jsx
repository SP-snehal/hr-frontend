import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../css_styles/edituserdata.module.css";
import axios from "axios";
import Sidebar from "./Sidebar";
import moment from "moment";
import toast from "react-hot-toast";

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Unified state for form data
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

  // Fetch user data by ID
  useEffect(() => {
    fetchUserById();
  }, []);

  const fetchUserById = async () => {
    try {
      const response = await axios.get(`http://localhost:8085/api/v1/users/${id}`);
      if (response?.data) {
        setFormData({
          emp_name: response.data.emp_name,
          emp_last_name: response.data.emp_last_name,
          emp_salary: response.data.emp_salary,
          emp_age: response.data.emp_age,
          address: response.data.address,
          emp_panno: response.data.emp_panno,
          emp_adharcard: response.data.emp_adharcard,
          email: response.data.email,
          emp_date_of_joining: moment(response.data.emp_date_of_joining).format("YYYY-MM-DD"),
        });
      }
    } catch (error) {
      toast.error("Failed to fetch user data");
      console.error(error);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8085/api/v1/users/${id}`, formData);
      if (response.status === 200) {
        toast.success("Updated Successfully");
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error("Error updating employee");
      console.error(error);
    }
  };

  return (
    <div className={styles.formcontainer}>
      <Sidebar />
      <form className={styles.registrationform} onSubmit={handleSubmit}>
        <h2>Edit Employee Details</h2>

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
          <button type="submit" className={styles.submitbtn}>Update</button>
          <button type="button" className={styles.submitbtn} onClick={() => navigate("/dashboard")}>Back</button>
        </div>
      </form>
    </div>
  );
}

export default EditUser;
