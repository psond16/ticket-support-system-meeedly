import DateFormats from "../../Utilities/DateFormat";
import { useNavigate } from "react-router-dom";

import {NoplinCardGeneral, NoplinCardBodyArea, LightButton} from "noplin-uis";

import "../../Style/Components/TicketCard/TicketCard.css";

function TicketCard({ ticket, assignToMe }) {
    const Agents = ["Agent A", "Agent B", "Agent C"];

    const navigate = useNavigate();

    const handleAssign = (agentName) => {
        assignToMe(ticket.id, agentName);
    };

    const truncateTitle = (text, maxLength = 50) => {
        if (!text) return "";
        return text.length > maxLength
            ? text.slice(0, maxLength) + "..."
            : text;
    };

    return (
        <NoplinCardGeneral className="ticket-row" onClick={() => navigate(`/ticket/${ticket.id}`)}>

            <NoplinCardBodyArea className="ticket-body">
                <div className="ticket-content">

                    {/* LEFT */}
                    <div className="ticket-left">
                        <div className="ticket-main">
                            <div className="ticket-title">
                                <h4>{truncateTitle(ticket.title)}</h4>
                            </div>

                            <div className="ticket-meta">
                                <span className = "category-badge">{ticket.category}</span>
                                <span className={`priority-badge ${ticket.priority?.toLowerCase()}`}>
                                    {ticket.priority}
                                </span>
                            </div>
                        </div>

                        <span className="ticket-time">
                            {DateFormats.timeAgoFormat(ticket.createdAt)}
                        </span>
                    </div>

                    {/* RIGHT */}
                    <div className="ticket-right">

                    {/* STATUS BADGE */}
                    <div className={`status-badge ${ticket.status.toLowerCase().replace(" ", "-")}`}>
                        {ticket.status}
                    </div>

                    {/* ASSIGN CONTROLS */}
                    <div className="assign-controls">

                        {!ticket.assignedTo ? (
                            <LightButton
                                className="assign-btn"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    assignToMe(ticket.id, "Agent A");
                                }}
                            >
                                Assign to me
                            </LightButton>
                        ) : (
                            <p className="assigned-text">
                                Assigned to: <strong>{ticket.assignedTo}</strong>
                            </p>
                        )}

                        <select
                            className="assign-dropdown"
                            value={ticket.assignedTo || ""}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => {
                                e.stopPropagation();
                                handleAssign(e.target.value);
                            }}
                        >
                            <option value="">Unassigned</option>
                            {Agents.map((agent) => (
                                <option key={agent} value={agent}>
                                    {agent}
                                </option>
                            ))}
                        </select>

                    </div>
                    </div>

                </div>
            </NoplinCardBodyArea>

        </NoplinCardGeneral>
    );
}

export default TicketCard;