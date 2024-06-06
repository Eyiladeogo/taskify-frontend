import { Link } from "react-router-dom";
import taskifyLogo from './assets/taskify.svg';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min';
import './css/navbar.css'



export default function Navbar(){
    return (
        <nav className="navbar navbar-expand-lg navbar-light ">
            <div className="container">
                <img className="small-logo navbar-brand" src={taskifyLogo}></img>
                
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation"> 
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav ">
                        <li className="nav-item">
                            <Link className="nav-link" to="/tasks">Tasks</Link>
                        </li>
                        {/* <li className="nav-item">
                            <Link className="nav-link" to="/analytics">Analytics</Link>
                        </li> */}
                        <li className="nav-item">
                            <Link className="nav-link" to="/profile">Profile</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}