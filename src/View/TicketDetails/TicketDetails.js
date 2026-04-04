import { useParams } from "react-router-dom";
import { useState } from "react";

function TicketDetail({ tickets, setTickets}) {

    const { id } = useParams();
    const [message, setMessage] = useState("");

    const ticket = tickets.find((t) => t.id === Number(id)); // to connect to right ticket object

    if (!ticket) {
        return <h2>Ticket not found</h2>;
    }

    const handleSend = () => {//handle reply by making a new copy instead of changing state

        if (!message.trim()) return;

        setTickets((prevTickets) =>
            prevTickets.map((t) =>
                t.id === Number(id)
                    ? {
                        ...t,
                        messages: [
                            ...t.messages,
                            {
                                text: message,
                                time: new Date().toISOString(),
                                sender: "support"
                            }
                        ]
                    }
                    : t
            )
        );

        setMessage("");
    };

    return (
        <div>
            <h1>{ticket.title}</h1>

            <p>Status: {ticket.status}</p>
            <p>Priority: {ticket.priority}</p>
            <p>Category: {ticket.category}</p>

            <hr />

            <h3>Conversation</h3>

            <div>
                {ticket.messages.length === 0 ? (
                    <p>No messages yet</p>
                ) : (
                    ticket.messages.map((msg, index) => (//convo history
                        <div key={index}>
                            <p>
                                <strong>{msg.sender}:</strong> {msg.text}
                            </p>
                            <small>{new Date(msg.time).toLocaleString()}</small>
                        </div>
                    ))
                )}
            </div>

            <hr />


            <div>
                <input
                    type="text"
                    value={message}
                    placeholder="Type a response..."
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && message.trim()) {
                            handleSend();
                        }
                    }}
                />

                <button onClick={handleSend}>
                    Send
                </button>
            </div>
        </div>
    );
}

export default TicketDetail;