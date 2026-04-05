import DateFormats from "../../Utilities/DateFormat";
import { useNavigate } from "react-router-dom";

import {
    NoplinCardGeneral,
    NoplinCardBodyArea
} from "noplin-uis";

import "../../Style/Components/TicketCard/TicketCard.css";

function TicketCard({ ticket, assignToMe, assignTicket, agents, currentUser }) {

    const navigate = useNavigate();

    return (
        <NoplinCardGeneral className="ticket-row" onClick={() => navigate(`/ticket/${ticket.id}`)}>

            <NoplinCardBodyArea className="ticket-body">
                <div className="ticket-content">

                    {/* LEFT */}
                    <div className="ticket-left">
                        <div className="ticket-title">
                            <h4>{ticket.title}</h4>
                        </div>

                        <div className="ticket-meta">
                            <span className = "category-badge">{ticket.category}</span>
                            <span className={`priority-badge ${ticket.priority?.toLowerCase()}`}>
                                {ticket.priority}
                            </span>
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="ticket-right">
                        <div className={`status-badge ${ticket.status.toLowerCase().replace(" ", "-")}`}>
                            {ticket.status}
                        </div>
                        {!ticket.assignedTo?.trim() ? (
                            <>
                                {currentUser.role === "agent" && (<button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        assignToMe(ticket.id);
                                    }}
                                >
                                    Assign to me
                                </button>
                                )}

                                {currentUser.role === "manager" && (
                                    <select
                                        onClick={(e) => e.stopPropagation()}
                                        onChange={(e) => assignTicket(ticket.id, e.target.value)}
                                        defaultValue=""
                                    >
                                        <option value="" disabled>Assign to...</option>
                                        {agents.map((agent) => (
                                            <option key={agent} value={agent.id}>
                                                {agent.name}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            </>
                        ) : (
                            <p>Assigned to: {agents.find(a => a.id === ticket.assignedTo)?.name || "Unassigned"}</p>
                        )}
                        <span>
                            {DateFormats.timeAgoFormat(ticket.createdAt)}
                        </span>
        
                    </div>

                </div>
            </NoplinCardBodyArea>

        </NoplinCardGeneral>
    );
}

export default TicketCard;