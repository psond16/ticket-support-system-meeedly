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


    const handleSubmit = (e) => {
        e.preventDefault();
        
        //to create a new ticket object from user input
        const newTicket = {
            id: Date.now(),
            title: title,
            category,
            description: description,
            attachment,
            firstName,
            lastName,
            email,
            status: "Open",
            priority: "Low",
            messages: [
                {
                    text: description,
                    time: new Date().toISOString(),
                    sender: "user"
                }
            ],
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

                {/* TITLE OF TICKET*/}
                <div>
                    <label>Title</label>
                    <input 
                        type="text"
                        value = {title}
                        placeholder="Enter ticket title"
                        onChange={(e) => setTitle(e.target.value)}
                     />
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

                <button type="submit" disabled={!title || !description || !category || !email}>Create ticket</button>
            </form>
        </div>
    );
}

export default TicketCreation;