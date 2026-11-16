import { Link } from "react-router-dom";


function Navigation() {

    return (

        <nav className="navbar navbar-expand-lg navbar-light bg-light">

            <div className="container">

                <Link
                    to="/"
                    className="navbar-brand"
                >
                    CareConnect
                </Link>

                <div className="navbar-nav">

                    <Link
                        to="/"
                        className="nav-link"
                    >
                        Home
                    </Link>

                    <Link
                        to="/doctors"
                        className="nav-link"
                    >
                        Doctors
                    </Link>

                    <Link
                        to="/login"
                        className="nav-link"
                    >
                        Login
                    </Link>

                    <Link
                        to="/register"
                        className="nav-link"
                    >
                        Register
                    </Link>

                </div>

            </div>

        </nav>
    );
}

export default Navigation;