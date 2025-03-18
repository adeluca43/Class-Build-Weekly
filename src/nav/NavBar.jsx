import { Link, } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const NavBar = () => {
   const navigate = useNavigate();
   const isLoggedIn = localStorage.getItem("employee_user");

   const handleLogout = (event) => {
    event.preventDefault(); // Prevents `<Link>` from overriding navigation
    localStorage.removeItem("employee_user");
    navigate("/login", { replace: true });
};



    return (
        <ul className="navbar">
            {isLoggedIn && (
                <>
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
                <li className="navbar-item navbar-logout">
                    <Link
                        className="navbar-link"
                        to=""
                        onClick={handleLogout}
                    >
                        Logout
                    </Link>
                </li>
                </>
            )}
        </ul>
    );
};
