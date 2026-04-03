function TicketCard({ ticket, deleteTicket }) {
    return (
        <div>
            <h3>{ticket.title}</h3>
            <p>{ticket.description}</p>
            <button onClick={() => deleteTicket(ticket.id)}>Delete</button>
            <p><strong>Category:</strong> {ticket.category}</p>
            <p>Status: {ticket.status}</p>
            <p><strong>Priority:</strong> {ticket.priority}</p>
            <p><strong>Created:</strong> {ticket.createdAt}</p>
            <p><strong>Assigned To:</strong> {ticket.assignedTo || "Unassigned"}</p>
            <p><strong>User:</strong> {ticket.firstName} {ticket.lastName}</p>
            <p><strong>Email:</strong> {ticket.email}</p>

            {ticket.attachment && <p>Attachment included</p>}
        </div>
    );
}

export default TicketCard;