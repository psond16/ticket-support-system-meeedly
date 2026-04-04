import { useParams } from "react-router-dom";

function TicketDetail({ tickets }) {

    const { id } = useParams();

    const ticket = tickets.find((t) => t.id === Number(id));

    if (!ticket) {
        return <h2>Ticket not found</h2>;
    }

    return (
        <div>
            <h1>{ticket.title}</h1>

            <p>Status: {ticket.status}</p>
            <p>Priority: {ticket.priority}</p>
            <p>Category: {ticket.category}</p>

            {/* Messages (future) */}
            <div>
                <input
                    type="text"
                    placeholder="Type a message..."
                />

                <button>Send</button>
            </div>
        </div>
    );
}

export default TicketDetail;