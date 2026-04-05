import DateFormats from "../../Utilities/DateFormat";
import { useNavigate } from "react-router-dom";

import {
    NoplinCardGeneral,
    NoplinCardBodyArea
} from "noplin-uis";

import "../../Style/Components/TicketCard/TicketCard.css";

function TicketCard({ ticket, assignToMe }) {
    const Agents = ["Agent A", "Agent B", "Agent C"];

    const navigate = useNavigate();

    const handleAssign = (agentName) => {
        assignToMe(ticket.id, agentName);
    };

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
                        {!ticket.assignedTo && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    assignToMe(ticket.id);
                                }}
                            >
                                Assign to me
                            </button>
                        )}
                        <select
                            value={ticket.assignedTo || ""}
                            onClick={(e) => e.stopPropagation()} 
                            onChange={(e) => {
                                e.stopPropagation();
                                handleAssign(e.target.value);
                            }}
                        >
                            <option value="">Unassigned</option>

                            {["Agent A", "Agent B", "Agent C"].map((agent) => (
                                <option key={agent} value={agent}>
                                    {agent}
                                </option>
                            ))}
                        </select>

                                {ticket.assignedTo && (
                                    <p>
                                        Assigned to: <strong>{ticket.assignedTo}</strong>
                                    </p>
                                )}

                            )
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