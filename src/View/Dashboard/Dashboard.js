import { useNavigate } from "react-router-dom";
import TicketCard from "../../Components/TicketCard/TicketCard";
import "../../Style//Dashboard/Dashboard.css";

function Dashboard({ tickets, deleteTicket }) {
    const navigate = useNavigate();

    return (
        
        <div>

            <h1>Dashboard</h1>

            {/* create new ticket */}
            <button onClick={() => navigate("/create-ticket")}>Create New Ticket</button>

            {/* show ticket / empty state */}
            <div className="dashboard-container">
                {tickets.length === 0 ? (
                    <p>No tickets yet</p>
                ) : (
                    tickets.map((ticket) => (
                        <TicketCard key={ticket.id} 
                        ticket={ticket}
                        deleteTicket={deleteTicket}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

export default Dashboard;