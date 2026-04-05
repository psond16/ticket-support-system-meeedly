import {useState} from "react";
import { useNavigate } from "react-router-dom";

function TicketCreation({ addTicket }){
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState(""); 
    const [attachment, setAttachment] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [category, setCategory] = useState("");
    const navigate = useNavigate();

    const TITLE_LIMIT = 70;

    const [success, setSuccess] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();
        

        const messages = [
            {
                text: description,
                time: new Date().toISOString(),
                sender: "user"
            }
        ];
        
        if (attachment) {
            messages.push({
                text: "",
                time: new Date().toISOString(),
                sender: "user",
                attachment: URL.createObjectURL(attachment)
            });
        }
        //to create a new ticket object from user input
        const newTicket = {
            id: Date.now(),
            title: title.length > 70 ? title.slice(0, 70) + "..." : title,
            category,
            firstName,
            lastName,
            email,
            status: "Open",
            priority: "Low",
            messages: messages,
            createdAt: new Date().toISOString(),
            assignedTo: null
        };

        addTicket(newTicket);
        setSuccess("Ticket created successfully!");

        setTitle("");
        setDescription("");


    };

    return(
        <div>
            <h1>Create Ticket</h1>

            <form onSubmit={handleSubmit}>

                {/* TITLE OF TICKET*/}
                <div>
                    <label>Title</label>
                    <input 
                        type="text"
                        value = {title}
                        placeholder="Enter ticket title"
                        maxLength={TITLE_LIMIT}
                        onChange={(e) => setTitle(e.target.value)}
                     />
                </div>

                <div style={{ fontSize: "12px", marginTop: "4px" }}>
                    {title.length}/{TITLE_LIMIT}
                </div>
                
                {/* CATEGORY OF TICKET*/}
                <div>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        >
                        <option value="">Select category</option>
                        <option value="General">General</option>
                        <option value="Technical">Technical</option>
                        <option value="Billing">Billing</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                
                {/* ABOUT THE TICKET*/}
                <div>
                    <label>Description</label>
                    <textarea
                    value = {description}
                    placeholder="Describe your issue..."
                    onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                {/* PICTURE ABOUT THE TICKET*/}
                <div>
                    <input
                        type="file"
                        onChange={(e) => setAttachment(e.target.files[0])}
                    />
                </div>
                
                {/* FIRST NAME OF USER*/}
                <div>
                    <input
                        type="text"
                        value={firstName}
                        placeholder="First name"
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>

                {/* LAST NAME OF USER*/}
                <div>
                    <input
                        type="text"
                        value={lastName}
                        placeholder="Last name"
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>

                {/* EMAIL OF USER*/}
                <div>
                    <input
                        type="email"
                        value={email}
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <button type="submit" disabled={!title.trim() || !description.trim() || !category || !email}>Create ticket</button>
            </form>
        </div>
    );
}

export default TicketCreation;