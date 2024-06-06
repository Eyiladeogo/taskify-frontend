import Navbar from "./Navbar"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { jwtDecode } from 'jwt-decode';



function LogoutButton(){
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/')
    }

    return(
        <button onClick={handleLogout}>Logout</button>
    )

}

function Profile(){
  const navigate = useNavigate()

  useEffect(() => {
    // Check if token exists in local storage
    const token = localStorage.getItem('token');
    if (token) {
      // Decode the token to get expiration date
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Convert milliseconds to seconds
  
      // Check if token is expired
      if (decodedToken.exp < currentTime) {
        // Token is expired, clear token from local storage and redirect to sign-in page
        localStorage.removeItem('token');
        navigate('/');
      }
    } else {
      // Token doesn't exist, redirect to sign-in page
      navigate('/');
    }
  }, [navigate]);

  
    return (
        <>
            <Navbar></Navbar>  
            <LogoutButton/>
        </>
    )
}

export default Profile