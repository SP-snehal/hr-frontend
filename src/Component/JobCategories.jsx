import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "../css_styles/jobcategories.module.css";
import { toast } from "react-toastify";
import Sidebar from "./Sidebar";

export default function JobCategories() {
    const navigate = useNavigate();

    // State initialization
    const [formData, setFormData] = useState({
        worker_name: "",
        job_title: "",
        department: "",
        start_time: "",
        end_time: "",
        totalWorkHours: "",
    });

    const [categories, setCategories] = useState([]);

    // Predefined job titles and departments
    const job_titles = ["Web Developer", "Software Engineer", "Data Analyst", "UI/UX Designer", "Project Manager"];
    const departments = ["IT", "Engineering", "Marketing", "Finance", "Human Resources", "Design"];

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get("http://localhost:8085/api/v1/employees");
            setCategories(response.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    // Function to format time into 12-hour AM/PM format
    const formatTime = (time) => {
        if (!time) return "";
        
        const [hours, minutes] = time.split(":").map(Number);
        const suffix = hours >= 12 ? "PM" : "AM";
        const formattedHours = hours % 12 || 12; // Convert 0 to 12 for midnight
        return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${suffix}`;
    };

    // Function to calculate total work hours
    const calculateTotalWorkHours = (start, end) => {
        const startTime = new Date(`1970-01-01T${start}`);
        const endTime = new Date(`1970-01-01T${end}`);

        let diffInMs = endTime - startTime;
        if (diffInMs < 0) {
            // Handle cases where end_time is past midnight
            diffInMs += 24 * 60 * 60 * 1000;
        }

        const hours = Math.floor(diffInMs / (1000 * 60 * 60));
        const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));

        return `${hours}h ${minutes}m`;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const totalHours = calculateTotalWorkHours(formData.start_time, formData.end_time);

        try {
            const response = await axios.post(
                "http://localhost:8085/api/v1/employees",
                { ...formData, totalWorkHours: totalHours }, // Include calculated total hours
                { headers: { "Content-Type": "application/json" } }
            );

            if (response.status === 200) {
                toast.success("Job Category Added Successfully");
                setTimeout(() => {
                    window.location.reload();
                }, 200);
            }
        } catch (error) {
            toast.error("Error adding job category");
            console.error("Error:", error.response?.data || error.message);
        }
    };

    const deleteCategory = async (id) => {
        try {
            await axios.delete(`http://localhost:8085/api/v1/employees/${id}`);
            fetchCategories();
        } catch (error) {
            console.error("Error deleting category:", error);
        }
    };

    return (
        <div className={styles.container}>
            <Sidebar />
            <div className={styles.content}>
                <h1 className={styles.title}>Employee Job Categories</h1>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <input
                        type="text"
                        name="worker_name"
                        value={formData.worker_name}
                        onChange={handleChange}
                        placeholder="Worker Name"
                        className={styles.input}
                        required
                    />
                    <select name="job_title" value={formData.job_title} onChange={handleChange} className={styles.input} required>
                        <option value="">Select Job Title</option>
                        {job_titles.map((title, index) => (
                            <option key={index} value={title}>{title}</option>
                        ))}
                    </select>
                    <select name="department" value={formData.department} onChange={handleChange} className={styles.input} required>
                        <option value="">Select Department</option>
                        {departments.map((dept, index) => (
                            <option key={index} value={dept}>{dept}</option>
                        ))}
                    </select>
                    <input type="time" name="start_time" value={formData.start_time} onChange={handleChange} className={styles.input} required />
                    <input type="time" name="end_time" value={formData.end_time} onChange={handleChange} className={styles.input} required />
                    <button type="submit" className={styles.submitBtn}>Add Job</button>
                </form>

                {/* Job Categories Table */}
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Worker Name</th>
                            <th>Job Title</th>
                            <th>Department</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Total Working Hours</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.length > 0 ? (
                            categories.map((cat) => (
                                <tr key={cat.job_category_id}>
                                    <td>{cat.worker_name}</td>
                                    <td>{cat.job_title}</td>
                                    <td>{cat.department}</td>
                                    <td>{formatTime(cat.start_time)}</td>
                                    <td>{formatTime(cat.end_time)}</td>
                                    <td>{cat.totalWorkHours || calculateTotalWorkHours(cat.start_time, cat.end_time)}</td>
                                    <td>
                                        <button onClick={() => deleteCategory(cat.job_category_id)} className={styles.deleteBtn}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className={styles.noData}>No Job Categories Available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
