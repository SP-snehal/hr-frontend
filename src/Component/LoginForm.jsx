// import React from 'react'
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from "../css_styles/login.module.css";

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    let payload ={
      email,
      password
      
    }
   //const response = await axios.post("http://192.168.29.47:8083/api/v1/user/login",payload)
   const response = await axios.post("http://localhost:8085/api/v1/users/login",payload)
    console.log(response.data)
    if(response.status === 200){
      navigate('/home')
    }
  };
  return (

    <div className={styles.logincontainer}>
    <div className={styles.loginform}>
      <h2 className={styles.loginformh2}> Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label className={styles.loginformlabel}>Email:</label>
          <input  className={styles.loginforminput} type="email" placeholder="Enter your email" 
          value={email} style={{backgroundColor:"transparent"}}
          onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div>
          <label className={styles.loginformlabel}>Password:</label>
          <input className={styles.loginforminput} type="password" placeholder="Enter your password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <button className={styles.loginformbutton} type="submit" >Login</button>
      </form>
    </div>
  </div>
   
  )
};

export default LoginForm
