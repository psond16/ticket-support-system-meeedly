function TicketCard({ ticket }) {
    return (
        <div>
            <h3>{ticket.title}</h3>
            <p>{ticket.description}</p>
            <p>Status: {ticket.status}</p>
        </div>
    );
}

export default TicketCard;