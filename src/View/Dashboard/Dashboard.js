import { useNavigate } from "react-router-dom";
import TicketCard from "../../Components/TicketCard/TicketCard";

function Dashboard({ tickets }) {
    const navigate = useNavigate();

    return (
        
        <div>

            <h1>Dashboard</h1>

            {/* create new ticket */}
            <button onClick={() => navigate("/create-ticket")}>
                Create New Ticket
            </button>

            {/* show ticket / empty state */}
            {tickets.length === 0 ? (
                <p>No tickets yet</p>
            ) : (
                tickets.map((ticket) => (
                    <TicketCard key={ticket.id} ticket={ticket} />
                ))
            )}
        </div>
    );
}

export default Dashboard;