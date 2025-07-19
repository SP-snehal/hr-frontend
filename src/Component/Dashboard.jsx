import  React,{ useState, useEffect } from "react";
import styles from "../css_styles/dashboard.module.css";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar"; 
import axios  from "axios";
import moment from 'moment';
import { toast } from 'react-toastify';
function Dashboard(){
  const [ users , setUsers] = useState([]);
  const navigate= useNavigate()

   useEffect(()=>{
    const fetchUserData = async () => {
    const response =await axios.get ('http://localhost:8085/api/v1/users');
    const data = await response.data;
    setUsers(data);
  };
  fetchUserData();
 },[] );

 const handleDelete = async(id) =>{
  const response= await axios.delete(`http://localhost:8085/api/v1/users/${id}`);
  if (response?.status === 200){
  toast.success("Employee deleted sucessfully!");
  setTimeout(()=>{
    window.location.reload()
  },200)
   }
  }
 
 return (

  <div className={styles.tablecontainer }>
     <Sidebar /> 
  <h1 className={styles.h1}>All Employee Information</h1>
  <button type="submit" onClick={() => navigate("/UsersAdd")}>employee Add</button>
  <button type="submit" onClick={() => navigate("/")}>Back</button>
  

  <table className={styles.table}>
    <thead>
      <tr>
      <th>Emp_name</th>
      <th>Last_name</th>
      <th>Salary</th>
      <th>Age</th>
      <th>Address</th>
      <th>Pan_number</th>
      <th>Adharcard</th>
      <th>Email</th>
      <th>Joining_date</th>
      <th className={styles.action}>Action</th>

      </tr>
      </thead>
      <tbody>
        {users.map((users) => (
          <tr key={users.hr_id}>
            <td>{users.emp_name}</td>
            <td>{users.emp_last_name}</td>
            <td>{users.emp_salary}</td>
            <td>{users.emp_age}</td>
            <td>{users.address}</td>
            <td>{users.emp_panno}</td>
            <td>{users.emp_adharcard}</td>
            <td>{users.email}</td>
            <td>{moment(users.emp_date_of_joining).format('DD/MM/yyyy')}</td>
            
            <td>
              <button type="submit" className={styles.subminbtn} onClick={() => handleDelete(users?.hr_id)}>Delete</button>
              <button type="submit" className={styles.subminbtn}  onClick={() => navigate(`/edituseradd/${users.hr_id}`)}>edit</button>
            </td>
          </tr>
        ))
        } 
      </tbody>
  </table>
  </div>    
 )
}

export default Dashboard;