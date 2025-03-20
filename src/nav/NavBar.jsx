import { Link, } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const NavBar = () => {
   const navigate = useNavigate();
   const isLoggedIn = localStorage.getItem("employee_data");

   const handleLogout = (event) => {
    event.preventDefault(); // Prevents <Link> from overriding navigation
    localStorage.removeItem("employee_data");
    navigate("/login", { replace: true });
};



    return (
        <ul>
            {isLoggedIn && (
                <>
            <li >
                <Link to="/all-classes"> All Classes</Link>
            </li>
            <li >
                <Link to="/Profile">Profile</Link>
            </li>
            <li >
                <Link to="/new-class">New Class</Link>
            </li>
            <li >
                <Link to="/pay-summary"> Pay Summary</Link>
            </li>
            <li >
                <Link to="/curriculum">Curriculum</Link>
            </li>
                <li className="navbar-item navbar-logout">
                    <button
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </li>
                </>
            )}
        </ul>
    );
};
