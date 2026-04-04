import {Routes, Route} from "react-router-dom";
import Home from "../View/Home/Home";
import Settings from "../View/Settings/Settings";
import About from "../View/About/About";
import Error404 from "../View/Error404/Error404";
import TicketCreation from "../View/TicketCreation/TicketCreation";
import Dashboard from "../View/Dashboard/Dashboard";
import TicketDetails from "../View/TicketDetails/TicketDetails";

export default function MainRoute({ tickets, addTicket, deleteTicket, setTickets }){

    const assignToMe = (ticketId) => {
        const currentUser = "Agent A";
    
        setTickets((prev) =>
            prev.map((t) =>
                t.id === ticketId
                    ? { ...t, assignedTo: currentUser }
                    : t
            )
        );
    };
    
    return(
        <>
            <Routes>
                <Route
                    path = "/*"
                    element = {
                        <Routes>
                            <Route path = "/" element = {<Home />}/>
                            <Route path="/*" element={<Error404 />} />
                        </Routes>
                    }
                />

                <Route
                    path = "/about/"
                    element = {
                        <Routes>
                            <Route path = "/" element = {<About />}/>
                            <Route path = "/*" element = {<Error404 />}/>
                        </Routes>
                    }
                />

                <Route
                    path = "/settings"
                    element = {
                        <Routes>
                            <Route path = "/" element = {<Settings />}/>
                            <Route path = "/*" element = {<Error404 />}/>
                        </Routes>
                    }
                />  

                <Route
                    path = "/create-ticket"
                    element = {
                        <Routes>
                            <Route path = "/" element = {<TicketCreation addTicket={addTicket} />}/>
                            <Route path = "/*" element = {<Error404 />}/>
                        </Routes>
                    }
                /> 

                <Route
                    path = "/dashboard"
                    element = {
                        <Routes>
                            <Route path = "/" element = {<Dashboard tickets={tickets} deleteTicket={deleteTicket} assignToMe={assignToMe} />}/>
                            <Route path = "/*" element = {<Error404 />}/>
                        </Routes>
                    }
                /> 

                <Route
                    path = "/ticket/:id"
                    element = {
                        <Routes>
                            <Route path = "/" element={<TicketDetails tickets={tickets} setTickets={setTickets} assignToMe={assignToMe}/>} />
                            <Route path = "/*" element = {<Error404 />}/>
                        </Routes>
                    }
                />         
            </Routes>
        </>

    )
}