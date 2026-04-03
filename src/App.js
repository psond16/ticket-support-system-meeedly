import MainRoute from "./Routes/MainRoute";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState, useEffect } from "react";

import "./Style/Main.css";
import "./Style/Mobile.css";
import "./Style/Desktop.css";
import "./Style/Tablet.css";


function App() {

{/* load tickets from local storege */}
  const [tickets, setTickets] = useState(() => {
    const saved = localStorage.getItem("tickets");
    return saved ? JSON.parse(saved) : [];
  });

  {/* savr tickets to local storege */}
  useEffect(() => {
    localStorage.setItem("tickets", JSON.stringify(tickets));
  }, [tickets]);

  {/* add ticket */}
  const addTicket = (ticket) => {
    setTickets((prevTickets) => [...prevTickets, ticket]);
  };

  {/* delete ticket */}
  const deleteTicket = (id) => {
    setTickets((prevTickets) =>
      prevTickets.filter((ticket) => ticket.id !== id)
    );
  };

  return (
    <>
      <MainRoute tickets={tickets} addTicket={addTicket} deleteTicket={deleteTicket}/>
    </>
  );
};

export default App;
