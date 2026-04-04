

function TicketDetail({ tickets, setTickets }) {

    return (
        <div>
            <h1>{ticket.title}</h1>

            <p>Status: {ticket.status}</p>
            <p>Priority: {ticket.priority}</p>
            <p>Category: {ticket.category}</p>

            {/* Messages */}
            <div>
                {ticket.messages.length === 0 ? (
                    <p>No messages yet</p>
                ) : (
                    ticket.messages.map((msg, index) => (
                        <div key={index}>
                            <strong>{msg.sender}:</strong> {msg.content}
                        </div>
                    ))
                )}
            </div>

            {/* Input */}
            <div>
                <input
                    type="text"
                    value={message}
                    placeholder="Type a message..."
                    onChange={(e) => setMessage(e.target.value)}
                />

                <button>Send</button>
            </div>
        </div>
    );
}

export default TicketDetail;