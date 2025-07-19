import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import styles from "../css_styles/AddReportForm.module.css";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";

const AddReportForm = ({ onReportAdded }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    employee_name: "",
    report_date: "",
    years_repost: "",
  });

  const [percentages, setPercentages] = useState({
    one_month_repost: "",
    three_month_repost: "",
    six_month_repost: "",
    twelve_month_repost: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePercentageChange = (e) => {
    const { name, value } = e.target;
    setPercentages({
      ...percentages,
      [name]: value !== "" ? parseFloat(value) : null,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalReportData = {
      employee_name: formData.employee_name,
      report_date: formData.report_date,
      years_repost: formData.years_repost ? parseFloat(formData.years_repost) : null,
      one_month_repost: percentages.one_month_repost !== "" ? parseFloat(percentages.one_month_repost) : null,
      three_month_repost: percentages.three_month_repost !== "" ? parseFloat(percentages.three_month_repost) : null,
      six_month_repost: percentages.six_month_repost !== "" ? parseFloat(percentages.six_month_repost) : null,
      twelve_month_repost: percentages.twelve_month_repost !== "" ? parseFloat(percentages.twelve_month_repost) : null,
    };
    

    try {
      const response = await axios.post("http://localhost:8085/api/v1/employee-reports", finalReportData);
    
      if (response.status === 200 || response.status === 201) {
        toast.success("✅ Employee Report Added Successfully!");
    
        if (onReportAdded) {
          onReportAdded();
        }
    
        setFormData({ employee_name: "", report_date: "", years_repost: "" });
        setPercentages({ one_month_repost: "", three_month_repost: "", six_month_repost: "", twelve_month_repost: "" });
    
        setTimeout(() => {
          navigate("/employeereport");
        }, 800); // delay for toast before navigation
      }
    } catch (error) {
      toast.error("❌ Error adding report");
      console.error(error);
    }
  };    
  return (
    <div className={styles.formContainer}>
      <Toaster />
      <Sidebar />
      <form className={styles.reportForm} onSubmit={handleSubmit}>
        <h2>Add Employee Report</h2>

        <div className={styles.formFields}>
          <div>
            <label htmlFor="employee_name">Employee Name</label>
            <input type="text" name="employee_name" value={formData.employee_name} onChange={handleChange} required />
          </div>

          <div>
            <label htmlFor="report_date">Report Date</label>
            <input type="date" name="report_date" value={formData.report_date} onChange={handleChange} required />
          </div>

          <div className={styles.fullWidth}>
            <label htmlFor="years_repost">Yearly Report</label>
            <input type="number" step="0.01" name="years_repost" value={formData.years_repost} onChange={handleChange} required />
          </div>

          <div>
            <label htmlFor="one_month_repost">1 Month</label>
            <input type="number" step="0.01" name="one_month_repost" value={percentages.one_month_repost} onChange={handlePercentageChange} />
          </div>

          <div>
            <label htmlFor="three_month_repost">3 Months</label>
            <input type="number" step="0.01" name="three_month_repost" value={percentages.three_month_repost} onChange={handlePercentageChange} />
          </div>

          <div>
            <label htmlFor="six_month_repost">6 Months</label>
            <input type="number" step="0.01" name="six_month_repost" value={percentages.six_month_repost} onChange={handlePercentageChange} />
          </div>

          <div>
            <label htmlFor="twelve_month_repost">12 Months</label>
            <input type="number" step="0.01" name="twelve_month_repost" value={percentages.twelve_month_repost} onChange={handlePercentageChange} />
          </div>
        </div>

        <div className={styles.btnContainer}>
          <button type="submit" className={styles.submitBtn}>Submit Report</button>
          <button type="button" className={styles.submitBtn} onClick={() => navigate("/employeereport")}>Back</button>
        </div>
      </form>
    </div>
  );
};

export default AddReportForm; 