import DateFormats from "../../Utilities/DateFormat";
import { useNavigate } from "react-router-dom";

import {
    NoplinCardGeneral,
    NoplinCardBodyArea
} from "noplin-uis";

import "../../Style/Components/TicketCard/TicketCard.css";

function TicketCard({ ticket }) {

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
                        <span>{ticket.assignedTo || "Unassigned"}</span>
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