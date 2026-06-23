import React, { useState, useEffect } from "react";
import Card from "@components/common/Card";
import { mockUsers } from "@data/mockData";
import styles from "./Users.module.css";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Load from localStorage or use mock data
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      setUsers(mockUsers);
      localStorage.setItem("users", JSON.stringify(mockUsers));
    }
  }, []);

  const toggleApproval = (userId) => {
    const updatedUsers = users.map(user => 
      user.id === userId ? { ...user, approved: !user.approved } : user
    );
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  return (
    <div className={styles.usersPage}>
      <Card title="Users Management">
        <div className={styles.userControls}>
          <button className={styles.filterBtn}>All Users</button>
          <button className={styles.filterBtn}>Approved</button>
          <button className={styles.filterBtn}>Pending</button>
        </div>
        <div className={styles.userTable}>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.department}</td>
                  <td>
                    <span className={`${styles.statusBadge} ${user.approved ? styles.approved : styles.pending}`}>
                      {user.approved ? "✅ Approved" : "⏳ Pending"}
                    </span>
                  </td>
                  <td>
                    <button 
                      className={user.approved ? styles.revokeBtn : styles.approveBtn}
                      onClick={() => toggleApproval(user.id)}
                    >
                      {user.approved ? "Revoke" : "Approve"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Users;