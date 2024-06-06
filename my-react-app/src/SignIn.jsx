import React, { useState } from 'react';
import {useNavigate, Link} from 'react-router-dom';
import axios from 'axios';
import './css/login.css'
import Footer from './Footer';
import view from './assets/view-password.svg'
import hide from './assets/hide-password.svg'
import api from './utils/api';


function SignIn(){
    const [formData, setFormData] = useState(
        {
            emailorUsername: '',
            password: ''
        }
    );
    const [errorExists, setErrorExists] = useState(false);
    const [viewPassword, setViewPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        
        setFormData({ ...formData, [e.target.name]: e.target.value });
        console.log(`FORM DATA :${JSON.stringify(formData)}`)
        
        try {
          const response = await api.post('/auth/login', formData);
          console.log(response.data);
          setErrorExists(false)
          localStorage.setItem('token', response.data);
          navigate('/tasks');
        } catch (error) {
          setErrorExists(true)
          console.error('Login failed:', error);
        }
      };

    return (
        <>
          <div className='signin-container'>
            <form onSubmit={handleSubmit} onChange={handleChange} className='signin-form'>
                <label htmlFor="emailorUsername">Username or Email Address</label> <br/>
                <input type="text" id="emailorUsername" name="emailorUsername" placeholder="Username or Email Address" ></input><br/><br/>

                <label htmlFor="password">Password</label><br/>
                <input type={viewPassword?'text':"password"} id="password" name="password" placeholder="Password"></input><img src={viewPassword?hide:view} style={{height:"20px", width:"20px"}} onClick={() => setViewPassword(!viewPassword)}/><br/>

                <input type="submit" value="Submit"></input>
                {errorExists && <h3>Incorrect Username or Password</h3>}
            </form>
            <div className='register-link'>
                <p>Don't have an account? <Link to="/register">Register here</Link></p>
            </div>
          </div>

          <Footer/>
            
        </>
    )

}

export default SignIn