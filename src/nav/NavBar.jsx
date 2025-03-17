import { Link, } from "react-router-dom";

export const NavBar = () => {
   // const navigate = useNavigate();

    return (
        <ul className="navbar">
            <li className="navbar-item">
                <Link to="/"> All Classes</Link>
            </li>
            <li className="navbar-item">
                <Link to="/Profile">Profile</Link>
            </li>
            <li className="navbar-item">
                <Link to="/new-class">New Class</Link>
            </li>
            <li className="navbar-item">
                <Link to="/pay-summary"> Pay Summary</Link>
            </li>
            <li className="navbar-item">
                <Link to="/curriculum">Curriculum</Link>
            </li>
           
            
        </ul>
    );
};
