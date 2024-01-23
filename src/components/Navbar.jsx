import {
  Link 
} from "react-router-dom";
import SearchBar from './searchBar'; // Import the SearchBar component

// Define a functional component for the navigation bar
function NavBar() {
  return (
    <nav className="navbar  navbar-expand navbar-light bg-light ">
      <div className="container-fluid ">
        <ul className="nav navbar-nav ">
          
          <li className="nav-item">
            <Link to ="/Calculator" className="nav-link">Calculator</Link>
          </li>
          <li className="nav-item">
            <Link to ="SearchPage" className="nav-link">Search</Link>
          </li>
        
          <li className="nav-item">
        <SearchBar /> {/* Render the SearchBar component within the navigation bar */}
        </li>
        </ul>
        
      </div>
    </nav>
  );
}

export default NavBar; // Export the NavBar component
