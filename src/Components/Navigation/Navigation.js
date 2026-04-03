import { Link } from "react-router-dom";
import logo from "../../Asset/Logo/meeedlyLogo.png";
import "../../Style/Components/Navigation/Navigation.css";

const Navigation = () => {
    return (
        <nav className="navbar">
        <Link to= "/" className="navbar-brand">
            < img src = {logo} alt="Meeedly Logo" className="navbar-logo" />
            React Guide
        </Link>
        <div className="navbar-links">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/settings">Settings</Link>
            </div>
        </nav>
    );
}


export default Navigation;