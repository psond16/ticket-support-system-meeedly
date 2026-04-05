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
  const agents = [
    { id: "agent-a", name: "Agent A" },
    { id: "agent-b", name: "Agent B" },
    { id: "agent-c", name: "Agent C" }
  ];

  const [currentUser, setCurrentUser] = useState({
    role: "manager"
  });

  const [selectedAgentId, setSelectedAgentId] = useState("agent-a");

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
              assignedTo: selectedAgentId,
              status: "In Progress"
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
            setCurrentUser({ role: e.target.value });
          }}
        >
          <option value="agent">Agent</option>
          <option value="manager">Manager</option>
        </select>

        {currentUser.role === "agent" && (
        <select
          value={selectedAgentId}
          onChange={(e) => setSelectedAgentId(e.target.value)}
          style={{ marginLeft: "10px" }}
        >
          {agents.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name}
            </option>
          ))}
        </select>
        )}

        <span style={{ marginLeft: "10px" }}>
          Current: {currentUser.role}
        </span>
      </div>
    
      <MainRoute 
        tickets={tickets} 
        addTicket={addTicket} 
        deleteTicket={deleteTicket} 
        setTickets={setTickets} 
        assignToMe={assignToMe} 
        currentUser={currentUser} 
        agents={agents}
        selectedAgentId={selectedAgentId}
      />
    </>
  );
};

export default App;
