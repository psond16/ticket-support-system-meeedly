import {useState} from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../Components/Navigation/Navigation";

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
        <div className = "form-container">
            <Navbar />
            <h3>Meeedly Support Form</h3>
            <p>All fields marked with an asterisk (*) are required.</p>

            <p>Please briefly complete the fields below, and consider adding a screenshot to help us further understand the issue, if applicable.  You will receive a response from program staff within 24 business hours (3 Days).</p>

            <form onSubmit={handleSubmit}>

                {/* TITLE OF TICKET*/}
                <div>
                    <label>Title of Ticket</label>
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
                        <option value="">Support Area</option>
                        <option value="General">General</option>
                        <option value="Technical">Technical</option>
                        <option value="Billing">Billing</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                
                {/* ABOUT THE TICKET*/}
                <div>
                    <label>Description of Ticket</label>
                    <textarea
                    value = {description}
                    placeholder="Please describe your response in detail"
                    onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                {/* PICTURE ABOUT THE TICKET*/}
                <div>
                    <label>Attachment</label>
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

                {success && (
                    <p style={{ color: "green", marginTop: "10px" }}>
                        {success}
                    </p>
                )}

                <button type="submit" disabled={!title.trim() || !description.trim() || !category || !email}>
                    Create ticket
                </button>

            </form>
        </div>
    );
}

export default TicketCreation;