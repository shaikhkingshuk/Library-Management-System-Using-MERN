import { useState } from "react";
import AddManager from "./AddManager";
import Manager from "./Manager";
import Sidebar from "./Sidebar";

function HandleManager() {
  const [newManager, setNewManager] = useState(null);

  // Callback to receive the newly added manager
  const handleManagerAdded = (manager) => {
    setNewManager(manager);
  };
  return (
    <div className="page-view">
      <Sidebar />
      <div className="content">
        <AddManager onManagerAdded={handleManagerAdded} />
        <Manager newManager={newManager} />
      </div>
    </div>
  );
}

export default HandleManager;
