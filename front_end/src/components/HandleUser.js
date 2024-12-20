import { useState } from "react";
import AddUser from "./AddUser";
import User from "./User";
import Sidebar from "./Sidebar";

function HandleUser() {
  const [newUser, setNewUser] = useState(null);

  // Callback to receive the newly added user
  const handleUserAdded = (user) => {
    setNewUser(user);
  };
  return (
    <div className="page-view">
      <Sidebar />
      <div className="content">
        <AddUser onUserAdded={handleUserAdded} />
        <User newUser={newUser} />
      </div>
    </div>
  );
}

export default HandleUser;
