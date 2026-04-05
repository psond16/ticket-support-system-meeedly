import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../Asset/Logo/meeedlyLogo.png";
import "../../Style/Components/Navigation/Navigation.css";

const Navigation = () => {

    const navigate = useNavigate();
    return (
        <nav className="navbar">
            {/* LEFT SIDE */}
            <div className="navbar-left">
                <Link to="/" className="navbar-brand">
                    <img src={logo} alt="Meeedly Logo" className="navbar-logo" />
                </Link>

                <div className="navbar-links">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/dashboard">Dashboard</NavLink>
                    <NavLink to="/about">About</NavLink>
                    <NavLink to="/settings">Settings</NavLink>
                </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="navbar-right">
                <button 
                    className="create-ticket-btn"
                    onClick={() => navigate("/create-ticket")}
                >
                    Create Ticket
                </button>
            </div>
        </nav>
    );
}


export default Navigation;