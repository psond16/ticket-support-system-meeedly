import { useParams } from "react-router-dom";
import { useState } from "react";
import CommonHomeUtils from "../../Scripts/CommonHomeUtils";
import Navbar from "../../Components/Navigation/Navigation";

import "../../Style/TicketDetail/TicketDetail.css";

import {Avatar,} from "noplin-uis";

function TicketDetail({ tickets, setTickets}) {

    const { id } = useParams();
    const [message, setMessage] = useState("");

    const ticket = tickets.find((t) => t.id === Number(id)); // to connect to right ticket object

    

    if (!ticket) {
        return <h2>Ticket not found</h2>;
    }

    const isAssigned = !!ticket.assignedTo;

    const handleSend = () => {//handle reply by making a new copy instead of changing state

        if (!message.trim()) return;

        setTickets((prevTickets) =>{
            const updated = prevTickets.map((t) =>
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
            CommonHomeUtils.saveTickets(updated);

            return updated;
        });

        setMessage("");
    };

    const handlePriorityChange = (newPriority) => {
        setTickets((prev) => {
            const updated = prev.map((t) =>
                t.id === Number(id)
                    ? { ...t, priority: newPriority }
                    : t
            );
    
            CommonHomeUtils.saveTickets(updated);
            return updated;
        });
    };

    const handleCloseTicket = () => {

        const confirmClose = window.confirm(
            "Are you sure you want to close this ticket? This action cannot be undone."
        );
    
        if (!confirmClose) return;

        setTickets((prev) => {
            const updated = prev.map((t) =>
                t.id === Number(id)
                    ? { ...t, status: "Closed" }
                    : t
            );
    
            CommonHomeUtils.saveTickets(updated);
            return updated;
        });
    };

    return (
    <div>
        <Navbar />

        <div className="ticket-detail-container">

            {/* HEADER */}
            <div className="ticket-detail-header">
                <h1 className="ticket-detail-title">{ticket.title}</h1>

                <div className="ticket-top-strip">

                    {/* LEFT */}
                    <div className="ticket-detail-meta">
                        <span className="category-badge">{ticket.category}</span>

                        <span className={`priority-badge ${ticket.priority?.toLowerCase()}`}>
                            {ticket.priority}
                        </span>

                        <span className={`status-badge ${ticket.status.toLowerCase().replace(" ", "-")}`}>
                            {ticket.status}
                        </span>
                    </div>

                    {/* RIGHT */}
                    <div className="ticket-detail-controls">
                        <select
                            value={ticket.priority}
                            onChange={(e) => handlePriorityChange(e.target.value)}
                            className="priority-select"
                        >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>

                        {ticket.status !== "Closed" && (
                            <button
                                className="close-btn"
                                onClick={handleCloseTicket}
                                disabled={!isAssigned}
                            >
                                Close Ticket
                            </button>
                        )}
                    </div>

                </div>
            </div>
   

            <hr />

            {/* CONVERSATION */}
            <div className="conversation-header">
                <Avatar
                    className="avatar-fixed"
                    size={40}
                    name={`${ticket.firstName} ${ticket.lastName}`}
                    statusColor="yellow"
                    image=""
                />

                <span className="conversation-user">
                {`${ticket.firstName} ${ticket.lastName}`}
                </span>
            </div>

            <div className="conversation-box">
                {ticket.messages.length === 0 ? (
                    <p className="empty-text">No messages yet</p>
                ) : (
                    ticket.messages.map((msg, index) => (
                        <div
                            key={index}
                            className={msg.sender === "user" ? "msg-left" : "msg-right"}
                        >
                            <div className="message-bubble">
                                {msg.text && (
                                    <p className="message-text">
                                        <strong>{msg.sender}:</strong> {msg.text}
                                    </p>
                                )}

                                {msg.attachment && (
                                    <img
                                        src={msg.attachment}
                                        alt="attachment"
                                        className="message-image"
                                    />
                                )}
                            </div>

                            <small className="message-time">
                                {new Date(msg.time).toLocaleString()}
                            </small>
                        </div>
                    ))
                )}
            </div>

            <hr />

            {!isAssigned && (
                <p className="warning-text">
                    This ticket must be assigned before you can reply or close it.
                </p>
            )}

            {/* INPUT AREA */}
            <div className="reply-box">
                <input
                    type="text"
                    value={message}
                    disabled={ticket.status === "Closed" || !isAssigned}
                    placeholder={!isAssigned ? "Ticket not Assigned" : "Type a response..."}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && message.trim()) handleSend();
                    }}
                    className="reply-input"
                />

                <button
                    className="send-btn"
                    onClick={handleSend}
                    disabled={ticket.status === "Closed" || !isAssigned}
                >
                    Send
                </button>
            </div>

        </div>
    </div>
);
}

export default TicketDetail;