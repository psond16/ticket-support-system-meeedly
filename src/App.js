import MainRoute from "./Routes/MainRoute";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from "react";

import "./Style/Main.css";
import "./Style/Mobile.css";
import "./Style/Desktop.css";
import "./Style/Tablet.css";


function App() {
  const [tickets, setTickets] = useState([]);

  const addTicket = (ticket) => {
    setTickets((prevTickets) => [...prevTickets, ticket]);
  };

  return (
    <>
      <MainRoute tickets={tickets} addTicket={addTicket}/>
    </>
  );
};

export default App;
