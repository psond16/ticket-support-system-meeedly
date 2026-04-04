import {
    NoplinCardGeneral,
    NoplinCardBodyArea
} from "noplin-uis";

import "../../Style/Components/TicketCard/TicketCard.css";

function TicketCard({ ticket }) {
    return (
        <NoplinCardGeneral className="ticket-row">

            <NoplinCardBodyArea className="ticket-body">
                <div className="ticket-content">

                    {/* LEFT */}
                    <div className="ticket-left">
                        <div className="ticket-title">
                            <h4>{ticket.title}</h4>
                        </div>

                        <div className="ticket-meta">
                            <span>{ticket.category}</span>
                            <span>{ticket.priority}</span>
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="ticket-right">
                        <div className={`status-badge ${ticket.status.toLowerCase().replace(" ", "-")}`}>
                            {ticket.status}
                        </div>
                        <span>{ticket.createdAt}</span>
                        <span>{ticket.assignedTo || "Unassigned"}</span>
                    </div>

                </div>
            </NoplinCardBodyArea>

        </NoplinCardGeneral>
    );
}

export default TicketCard;