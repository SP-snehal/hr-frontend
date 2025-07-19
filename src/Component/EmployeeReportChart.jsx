import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Sidebar from "./Sidebar"; 
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer
} from "recharts";
import styles from "../css_styles/EmployeeReportChart.module.css";

const EmployeeReportChart = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    axios.get("http://localhost:8085/api/v1/employee-reports")
      .then((response) => {
        // Format data for the Grouped Bar Chart
        const formattedData = response.data.map(item => ({
          employee: item.employee_name,
          one_month: item.one_month_repost,
          three_month: item.three_month_repost,
          six_month: item.six_month_repost,
          twelve_month: item.twelve_month_repost,
          yearly: item.years_repost,
        }));

        setData(formattedData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);



  return (
    <div className={styles.chartContainer}>
      <h2 className={styles.chartTitle}>Employee Report - Grouped Bar Chart</h2>

      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="employee" angle={-45} textAnchor="end" height={60} />
            <YAxis />
            <Tooltip />
            <Legend />      
            {/* Grouped Bar Chart */}
            <Bar dataKey="one_month" fill="#4682B4" name="1 Month" />
            <Bar dataKey="three_month" fill="#82ca9d" name="3 Months" />
            <Bar dataKey="six_month" fill="#ffc658" name="6 Months" />
            <Bar dataKey="twelve_month" fill="#ff7300" name="12 Months" />
            <Bar dataKey="yearly" fill="#0088FE" name="Years of experiences" />
          </BarChart>
          <button type="submit" className={styles.submitbtes} onClick={() => navigate("/addrepost")}>Reports Add</button>
          <Sidebar /> 
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EmployeeReportChart;
