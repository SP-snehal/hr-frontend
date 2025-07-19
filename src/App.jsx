
import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
// import './App.css'; // Optional: create this for basic styles
import Dashboard from './Component/Dashboard'; 
import LoginForm from './Component/LoginForm';
import UserAdd from './Component/UserAdd';
import Registration from'./Component/Registration';
import EdituserAdd from './Component/EdituserAdd';
import EmployeeDetail from './Component/EmployeeDetail';
import JobCategories from './Component/JobCategories';
import HomePage from './Component/HomePage';
import EmployeeReportChart from './Component/EmployeeReportChart';
import AddReportForm from './Component/AddReportForm';
//import { Toaster } from "react-hot-toast";


const App = () => {
    

    return (
  
        <Router>
            <Routes>
                <Route path='/' element={<LoginForm />} index />
                <Route path='/dashboard' element={<Dashboard />} /> 
                <Route path="/employee/detail" element={<EmployeeDetail />} />
                <Route path='/registration' element={<Registration/>}/>
                <Route path='/usersadd' element={<UserAdd/>} />
                <Route path='/home' element={<HomePage/>} />
                <Route path='/edituseradd/:id' element={<EdituserAdd />} />
                <Route path='/Categories' element={<JobCategories/>} />
                <Route path='/employeereport' element={<EmployeeReportChart/>} />
                <Route path='/addrepost' element={<AddReportForm/>} />
                
            </Routes>
            <Toaster position="top-right" />
        </Router>
    );
};

export default App;