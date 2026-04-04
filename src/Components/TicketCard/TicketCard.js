import {
    NoplinCardGeneral,
    NoplinCardBodyArea
} from "noplin-uis";

import "../../Style/Components/TicketCard/TicketCard.css";

function TicketCard({ ticket }) {
    return (
        <NoplinCardGeneral className="ticket-card">

            <NoplinCardBodyArea>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%"
                }}>

                    {/* LEFT */}
                    <div className="ticket-left">
                       

                        <div>
                            <h4>{ticket.title}</h4>
                            <p>{ticket.description}</p>
                        </div>
                    </div>

                    {/* MIDDLE */}
                    <div className="ticket-middle">
                        <p>{ticket.category}</p>
                        <p>{ticket.priority}</p>
                        <p>{ticket.status}</p>
                    </div>

                    {/* RIGHT */}
                    <div className="ticket-actions">
                        <button onClick={() => console.log("delete", ticket.id)}>
                            Delete
                        </button>

                        <button onClick={() => console.log("toggle status", ticket.id)}>
                            Toggle
                        </button>
                    </div>

                </div>
            </NoplinCardBodyArea>

        </NoplinCardGeneral>
    );
}

export default TicketCard;