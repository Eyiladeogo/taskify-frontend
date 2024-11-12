import { useState } from 'react'
import Footer from './Footer'
import axios from 'axios';
import './css/register.css'
import { useNavigate, Link } from 'react-router-dom'
import view from './assets/view-password.svg'
import hide from './assets/hide-password.svg'
import api from './utils/api';


function Register(){

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        username:"",
        email:"",
        password:"",
        password2:""
    })

    const [errorExists, setErrorExists] = useState(false);
    const [viewPassword, setViewPassword] = useState(false);

    function handleChange(e){
        setFormData({...formData, [e.target.name]:e.target.value})
    }

    async function handleSubmit(e){
        e.preventDefault()
        setFormData({...formData, [e.target.name]:e.target.value})
        // console.log(`FORM DATA :${JSON.stringify(formData)}`)

        try {
            const response = await api.post('/auth/register', formData);
            // console.log(response.data);
            setErrorExists(false)
            localStorage.setItem('token', response.data);
            // Slight delay to ensure token is set before navigation
            setTimeout(() => {
            navigate('/tasks');
      }, 100); // 100ms delay
        } catch (error) {
            setErrorExists(true)
          console.error('Login failed:', error);
        }
    }

    return (
        <>
            <div className="register-container">
            <form className="register-form" onChange={handleChange} onSubmit={handleSubmit}>
                <label for="username">Username</label><br/>
                <input type="text" id="username" name='username' placeholder="Username"></input><br/><br/>

                <label for="email">Email Address</label><br/>
                <input type="email" id="email" name='email' placeholder="Email Address"></input><br/><br/>

                <label for="password">Password</label><br/>
                <input type={viewPassword?'text':"password"} id="password" name='password' placeholder="Password"></input><img src={viewPassword?hide:view} style={{height:"20px", width:"20px"}} onClick={() => setViewPassword(!viewPassword)}/><br/><br/>

                <label for="password2">Confirm Password</label><br/>
                <input type={viewPassword?'text':"password"} id="password2" name='password2' placeholder="Confirm Password"></input><img src={viewPassword?hide:view} style={{height:"20px", width:"20px"}} onClick={() => setViewPassword(!viewPassword)}/><br/>

                <input type="submit" value="Submit"></input>
                {errorExists && <h3>Something wrong happened! Please try again.</h3>}
            </form>
            <div className='login-link'>
                <p>Already have an account? <Link to="/login">Login here</Link></p>
            </div>
            </div>
            
            <Footer/>
        </>
    )

}

export default Register