import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { GeneralSearch } from "noplin-uis";

import TicketCard from "../../Components/TicketCard/TicketCard";
import "../../Style//Dashboard/Dashboard.css";

function Dashboard({ tickets, deleteTicket }) {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");//search state to filter queries


    //filter tickets based on search input:
    const filteredTickets = (tickets || []).filter((ticket) => {
        const query = (searchQuery || "").toLowerCase();
    
        return (
            (ticket.title || "").toLowerCase().includes(query) ||
            (ticket.description || "").toLowerCase().includes(query) ||
            (ticket.status || "").toLowerCase().includes(query) ||
            (ticket.category || "").toLowerCase().includes(query) ||
            (ticket.priority || "").toLowerCase().includes(query) ||
            (ticket.assignedTo || "").toLowerCase().includes(query)
        );
    });

    return (
        <>
            <div className = "search-wrapper">
            {/* search bar using NOPLIN UI component */}
                <GeneralSearch
                    className="dashboard-search"
                    placeholder="Search tickets..."
                    icon={{
                        className: "search-icon",
                        icon: null,
                    }}
                    close={{
                        className: "search-close",
                        icon: null,
                    }}
                    input={{
                        className: "search-input",
                    }}
                    value={searchQuery}
                    onTyping={(value) => {
                        setSearchQuery(value);
                    }}
                    onComplete={(value) => {
                        setSearchQuery(value);
                    }}
                />
            </div>
        
            <div>

                <h1>Dashboard</h1>

                {/* create new ticket */}
                <button onClick={() => navigate("/create-ticket")}>Create New Ticket</button>

                {/* show ticket / empty state */}
                <div className="dashboard-container">
                    {tickets.length === 0 ? (
                        <p>No tickets yet</p>
                    ) : filteredTickets.length === 0 ? (
                        <p>No matching tickets found</p>
                    ) : (
                        filteredTickets.map((ticket) => (
                            <TicketCard
                                key={ticket.id}
                                ticket={ticket}
                                deleteTicket={deleteTicket}
                            />
                        ))
                    )}
                </div>
            </div>
        </>
    );
}

export default Dashboard;