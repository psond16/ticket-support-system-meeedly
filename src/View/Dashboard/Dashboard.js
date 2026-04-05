import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { GeneralSearch } from "noplin-uis";

import TicketCard from "../../Components/TicketCard/TicketCard";
import "../../Style//Dashboard/Dashboard.css";
import CommonHomeUtils from "../../Scripts/CommonHomeUtils";

function Dashboard({ tickets, deleteTicket, assignToMe, setTickets, currentUser }) {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");//search state to filter queries
    const agents = ["Agent A", "Agent B", "Agent C"];

    //filter states
    const [statusFilter, setStatusFilter] = useState("");
    const [priorityFilter, setPriorityFilter] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");


    const roleFilteredTickets = tickets.filter((ticket) => {
        if (currentUser.role === "manager") return true;
      
        if (currentUser.role === "agent") {
          return ticket.assignedTo === currentUser.name;
        }
      
        if (currentUser.role === "user") {
          return ticket.email === currentUser.name;
        }
      
        return false;
      });


    //filter tickets based on search input:
    const filteredTickets = roleFilteredTickets.filter((ticket) => {
        const query = (searchQuery || "").toLowerCase();
    
        const title = (ticket?.title || "").toString().toLowerCase();
        const description = (ticket?.description || "").toString().toLowerCase();
        const status = (ticket?.status || "").toString().toLowerCase();
        const category = (ticket?.category || "").toString().toLowerCase();
        const priority = (ticket?.priority || "").toString().toLowerCase();
        const assignedTo = (ticket?.assignedTo || "").toString().toLowerCase();
    
        const matchesSearch =
            title.includes(query) ||
            description.includes(query) ||
            status.includes(query) ||
            category.includes(query) ||
            priority.includes(query) ||
            assignedTo.includes(query);
    
        const matchesStatus =
            !statusFilter || (ticket?.status || "") === statusFilter;
    
        const matchesPriority =
            !priorityFilter || (ticket?.priority || "") === priorityFilter;
    
        const matchesCategory =
            !categoryFilter || (ticket?.category || "") === categoryFilter;
    
        return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
    });

    const assignTicket = (ticketId, agentName) => {//assign by manager
        setTickets((prev) => {
            const updated = prev.map((t) =>
                t.id === ticketId
                    ? { ...t, assignedTo: agentName, status: "In Progress" }
                    : t
            );
    
            CommonHomeUtils.saveTickets(updated);
            return updated;
        });
    };

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

            <div className="filters-row">

            <select onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="">All Status</option>
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Closed">Closed</option>
            </select>

            <select onChange={(e) => setPriorityFilter(e.target.value)}>
                <option value="">All Priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>

            <select onChange={(e) => setCategoryFilter(e.target.value)}>
                <option value="">All Category</option>
                <option value="General">General</option>
                <option value="Technical">Technical</option>
                <option value="Billing">Billing</option>
                <option value="Other">Other</option>
            </select>

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
                                assignToMe={assignToMe}
                                assignTicket={assignTicket}
                                agents={agents}
                            />
                        ))
                    )}
                </div>
            </div>
        </>
    );
}

export default Dashboard;