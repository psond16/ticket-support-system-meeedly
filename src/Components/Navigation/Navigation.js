import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../Asset/Logo/meeedlyLogo.png";
import "../../Style/Components/Navigation/Navigation.css";

import { LightButton } from "noplin-uis";

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
                <LightButton
                    className="create-ticket-btn"
                    onClick={() => navigate("/create-ticket")}
                    style={{
                        background: "#ea1d23",
                        color: "#fff",
                        padding: "10px 16px",
                        border: "none",
                        borderRadius: "8px",
                        fontWeight: 600,
                        cursor: "pointer",
                    }}
                >
                    Create Ticket
                </LightButton>
            </div>
        </nav>
    );
}


export default Navigation;