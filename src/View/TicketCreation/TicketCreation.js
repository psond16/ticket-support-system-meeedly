import {useState} from "react";
import { useNavigate } from "react-router-dom";

function TicketCreation({ addTicket }){
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState(""); 
    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();
        
        //to create a new ticket object from user input
        const newTicket = {
            id: Date.now(),
            title: title,
            description: description,
            status: "Open",
            priority: "Low",
            messages: [],
            createdAt: new Date().toISOString()
        };

        addTicket(newTicket);

        setTitle("");
        setDescription("");

        navigate("/dashboard");//redirect to dashboard
    };

    return(
        <div>
            <h1>Create Ticket</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title</label>
                    <input 
                        type="text"
                        value = {title}
                        placeholder="Enter ticket title"
                        onChange={(e) => setTitle(e.target.value)}
                     />
                </div>

                <div>
                    <label>Description</label>
                    <textarea
                    value = {description}
                    placeholder="Describe your issue..."
                    onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <button type="submit" disabled={!title || !description}>Create ticket</button>
            </form>
        </div>
    );
}

export default TicketCreation;