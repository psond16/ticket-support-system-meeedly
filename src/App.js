import MainRoute from "./Routes/MainRoute";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from "react";

import CommonHomeUtils from "./Scripts/CommonHomeUtils";

import "./Style/Main.css";
import "./Style/Mobile.css";
import "./Style/Desktop.css";
import "./Style/Tablet.css";


function App() {

  const [tickets, setTickets] = useState(() => {
    return CommonHomeUtils.getSavedTickets();
  });

  {/* add ticket */}
  const addTicket = (ticket) => {
    setTickets((prev) => {
      const updated = [ ticket, ...prev];
      CommonHomeUtils.saveTickets(updated);
      return updated;
    });
  };

  {/* delete ticket */}
  const deleteTicket = (id) => {
    setTickets((prev) => {
      const updated = prev.filter((t) => t.id !== id);
      CommonHomeUtils.saveTickets(updated);
      return updated;
    });
  };

  return (
    <>
      <MainRoute tickets={tickets} addTicket={addTicket} deleteTicket={deleteTicket} setTickets={setTickets}/>
    </>
  );
};

export default App;
