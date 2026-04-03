import { useNavigate } from "react-router-dom";
import TicketCard from "../../Components/TicketCard/TicketCard";

function Dashboard({ tickets }) {
    const navigate = useNavigate();

    return (
        
        <div>
            <button onClick={() => navigate("/create-ticket")}>
                Create New Ticket
            </button>
            
            <h1>Dashboard</h1>
        </div>
    );
}

export default Dashboard;