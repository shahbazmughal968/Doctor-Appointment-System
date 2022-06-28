/* eslint-disable jsx-a11y/anchor-is-valid */
import { useNavigate } from "react-router-dom";
import classes from './Header.module.css'
import { Link } from "react-router-dom";
const Header = () => {
  
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark shadow">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse d-flex justify-content-between"
            id="navbarNav"
          >
              <ul className="navbar-nav">
             
                <li className="nav-item">
                 
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="/home"
                    >
                      Home
                    </Link>
              
                </li>
                
                <li className="nav-item">
                  <Link className="nav-link" to="/all-appointments">
                   Show All Appointment
                  </Link>
                </li>
              </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
export default Header;
