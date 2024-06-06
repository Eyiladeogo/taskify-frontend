import taskifyLogo from './assets/taskify.svg'
import './css/index.css'
import './css/landing.css'
import Footer from './Footer';
import Button from './Button';
import React from 'react';
import {Link} from 'react-router-dom';



function LandingPage() {

  return (
    <div className='parent'>
      <div className='group'>
        <div className='landing-page-wrapper'>
          <div className="logo-container">
            <img src={taskifyLogo} className="logo" alt="Taskify logo" />
          </div>
          <h1>Taskify</h1>
          <p>
            Gain insights and optimize your productivity with Taskify's powerful analytics tools.
          </p>
          <div >
            <Link className='left-link' to="/login">
            <Button className = "left-button" text = "Sign In"/>
            </Link>
            <Link className='right-link' to="/register">
            <Button className="right-button" text= "Sign Up"/>
            </Link>          
          </div>    
        </div>
        <Footer />
      </div>
    </div>
    
  )
}

export default LandingPage
