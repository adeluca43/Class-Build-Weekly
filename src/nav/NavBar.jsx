import { Link, useNavigate } from "react-router-dom";

export const NavBar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("employee_data");

  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem("employee_data");
    navigate("/login", { replace: true });
  };

  return (
    <>
      {isLoggedIn && (
        <nav className="navbar navbar-expand-md bg-success px-3 py-2">
          <div className="container">
            {/* Brand */}
            <span className="navbar-brand fw-bold text-white">Class Tracker</span>

            {/* Hamburger Menu */}
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarContent"
              aria-controls="navbarContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            {/* Nav Links */}
            <div className="collapse navbar-collapse" id="navbarContent">
              <ul className="navbar-nav ms-auto mt-3 mt-md-0 d-flex flex-column flex-md-row align-items-md-center">
                <li className="nav-item mb-2 mb-md-0">
                  <Link
                    to="/all-classes"
                    className="nav-link fw-bold text-dark bg-light rounded-pill px-3 py-1"
                  >
                    All Classes
                  </Link>
                </li>
                <li className="nav-item mb-2 mb-md-0">
                  <Link
                    to="/Profile"
                    className="nav-link fw-bold text-dark bg-light rounded-pill px-3 py-1"
                  >
                    Profile
                  </Link>
                </li>
                <li className="nav-item mb-2 mb-md-0">
                  <Link
                    to="/new-class"
                    className="nav-link fw-bold text-dark bg-light rounded-pill px-3 py-1"
                  >
                    New Class
                  </Link>
                </li>
                <li className="nav-item mb-2 mb-md-0">
                  <Link
                    to="/curriculum"
                    className="nav-link fw-bold text-dark bg-light rounded-pill px-3 py-1"
                  >
                    Curriculum
                  </Link>
                </li>
                <li className="nav-item">
                  <button
                    className="nav-link fw-bold text-dark bg-light rounded-pill px-3 py-1 border-0"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

