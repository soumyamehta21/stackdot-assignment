import React, { useEffect, useState } from "react";

const AdminDashboard = () => {
  let localUsers = localStorage.getItem("users");
  if (localUsers) {
    localUsers = JSON.parse(localUsers);
  } else {
    localUsers = [];
  }
  const [users, setUsers] = useState(localUsers || []);
  const [data, setData] = useState({
    name: "",
    email: "",
    role: "User",
  });
  const [searchedValue, setSearchedValue] = useState("");
  const [indexToEdit, setIndexToEdit] = useState(null);

  const handleEdit = (index) => {
    setData(users[index]);
    setIndexToEdit(index);
  };

  const handleDelete = (index) => {
    const updatedData = [...users];
    updatedData?.splice(index, 1);
    setUsers(updatedData);
    if (indexToEdit === index) {
      setData({
        name: "",
        email: "",
        role: "User",
      });
      setIndexToEdit(null);
    }
  };

  const searchedUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchedValue.toLowerCase()) ||
      user?.email.toLowerCase().includes(searchedValue?.toLowerCase())
  );

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!data?.name || !data?.email) return;

    if (indexToEdit !== null) {
      const updatedData = [...users];
      updatedData[indexToEdit] = data;
      setUsers(updatedData);
      setIndexToEdit(null);
    } else {
      const userExists = users?.find((user) => user.email === data.email);
      if (userExists) {
        alert("User with this email already exists!");
        return;
      }
      setUsers((prev) => [...prev, data]);
    }

    setData({
      name: "",
      email: "",
      role: "User",
    });
  };

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p class="subtitle">Welcome to the admin dashboard!</p>
      <input
        type="text"
        placeholder="Search"
        value={searchedValue}
        onChange={(e) => {
          setSearchedValue(e.target.value);
        }}
        className="search-input"
      />
      <form onSubmit={handleFormSubmit} className="form">
        <input
          type="text"
          placeholder="Name"
          value={data?.name}
          onChange={(e) => {
            setData((prev) => setData({ ...prev, name: e.target?.value }));
          }}
        />
        <input
          type="email"
          placeholder="Email"
          value={data?.email}
          onChange={(e) => {
            setData((prev) => setData({ ...prev, email: e.target?.value }));
          }}
        />
        <select
          value={data?.role}
          onChange={(e) => {
            setData((prev) => setData({ ...prev, role: e?.target?.value }));
          }}
        >
          <option>User</option>
          <option>Admin</option>
        </select>
        <button type="submit">{indexToEdit ? "Update" : "Add"}</button>
      </form>
      <table className="table-users">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {searchedUsers?.length ? (
            searchedUsers.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    onClick={() => handleEdit(index)}
                    className="edit-button"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr aria-colspan="4">No users found</tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
