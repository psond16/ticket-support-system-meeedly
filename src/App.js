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

  const [currentUser, setCurrentUser] = useState({
    name: "Agent B",
    role: "user"
  });

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

  const assignToMe = (id) => {
    setTickets((prev) => {
      const updated = prev.map((t) =>
        t.id === id
          ? {
              ...t,
              assignedTo: "me"
            }
          : t
      );
  
      CommonHomeUtils.saveTickets(updated);
      return updated;
    });
  };

  return (
    <>

      <div style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
        <strong>Switch Role:</strong>

        <select
          value={currentUser.role}
          onChange={(e) => {
            const role = e.target.value;

            let name = "";
            if (role === "agent") name = "Agent A";
            if (role === "manager") name = "Manager";
            if (role === "user") name = "User";

            setCurrentUser({
              role,
              name,
              email: "user@test.com" 
            });
          }}
        >
          <option value="user">User</option>
          <option value="agent">Agent</option>
          <option value="manager">Manager</option>
        </select>

        <select
          value={currentUser.name}
          onChange={(e) =>
            setCurrentUser((prev) => ({
              ...prev,
              name: e.target.value
            }))
          }
        >
          <option value="Agent A">Agent A</option>
          <option value="Agent B">Agent B</option>
          <option value="Agent C">Agent C</option>
        </select>
      </div>
      <MainRoute tickets={tickets} addTicket={addTicket} deleteTicket={deleteTicket} setTickets={setTickets} assignToMe={assignToMe} currentUser={currentUser}/>
    </>
  );
};

export default App;
