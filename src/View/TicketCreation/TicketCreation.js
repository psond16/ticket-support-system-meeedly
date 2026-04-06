import {useState} from "react";
import { useNavigate } from "react-router-dom";

import { TextField, TextAreaField, DropDown, LightButton } from "noplin-uis";

import Navbar from "../../Components/Navigation/Navigation";
import "../../Style/TicketCreation/TicketCreation.css";

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
            <Navbar />
            <div className = "form-container">
                <h3>Meeedly Support Form</h3>
                <p>All fields marked with an asterisk (*) are required.</p>

                <p>Please briefly complete the fields below, and consider adding a screenshot to help us further understand the issue, if applicable.  You will receive a response from program staff within 24 business hours (3 Days).</p>

                <form onSubmit={handleSubmit}>

                    {/* TITLE OF TICKET*/}
                    <div className = "form-group">
                        <TextField 
                            className="test-class"
                            label={{
                                material: false,
                                content: "Title of Ticket",
                                className: "test-class-label",
                            }}
                            value={title}
                            placeholder="Enter ticket title"
                            onChange={(e) => setTitle(e.target.value)}
                        />

                        <div style={{ fontSize: "12px", marginTop: "4px" }}>
                            {title.length}/{TITLE_LIMIT}
                        </div>
                    </div>

                    
                    {/* CATEGORY OF TICKET*/}
                    <div className = "form-group">
                        <label>Support Area</label>
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
                    <div className = "form-group">
                        <TextAreaField
                            className="test-class"
                            label={{
                                material: false,
                                content: "Description of Ticket",
                                className: "test-class-label"
                            }}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Please describe your response in detail"
                            resize
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
                    <div className = "form-group">
                        <TextField
                            label={{
                                material: false,
                                content: "First Name",
                            }}
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>

                    {/* LAST NAME OF USER*/}
                    <div className = "form-group">
                    <TextField
                        label={{
                            material: false,
                            content: "Last Name",
                        }}
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    </div>

                    {/* EMAIL OF USER*/}
                    <div className = "form-group">
                    <TextField
                        label={{
                            material: false,
                            content: "Email",
                        }}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    </div>

                    {success && (
                        <p className = "success-message">
                            {success}
                        </p>
                    )}
                    <div className="button-row">
                        <LightButton
                            type="submit"
                            className="npl-submit-btn"
                            style={{
                                background: "#ea1d23",
                                color: "#fff",
                
                                padding: "12px",
                                width: "100px",
                                fontWeight: 600,
                                border: "none",
                                borderRadius: "8px",
                                fontSize: "17px",
                            }}
                        >
                            Submit
                        </LightButton>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default TicketCreation;