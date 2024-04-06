import React, { useState, useEffect } from "react";
import { useFetchData } from "../Hooks/useFetchData";
import "../App.css";

const AllUser = () => {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    dob: "",
    aadharCard: "",
    address: "",
  });

  useEffect(() => {
    // Fetch all users from backend when component mounts
    fetchUsers();
  }, []);

  //USed to fetch all user
  const fetchUsers = async () => {
    try {
      const response = await useFetchData(
        "http://localhost:8000/users/allusers",
        "GET"
      );

      if (response.isOk) {
        setUsers(response.users);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  //Handle  input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const startEditing = (userId, user) => {
    setEditingUserId(userId);
    setUserData(user);
  };

  const cancelEditing = () => {
    setEditingUserId(null);
    setUserData({
      name: "",
      email: "",
      dob: "",
      aadharCard: "",
      address: "",
    });
  };

  const handleUpdate = async () => {
    try {
      const result = await useFetchData(
        `http://localhost:8000/users/updateuser/${editingUserId}`,
        "PUT",
        userData
      );
      console.log(result);
      const updatedUsers = users?.map((user) =>
        user._id === editingUserId ? { ...user, ...userData } : user
      );
      setUsers(updatedUsers);
      cancelEditing();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const approveHandler = async (user) => {
    alert("Approve begin")
    const response=await useFetchData(
      `http://localhost:8000/users/deleteuser/${user._id}`,
      "DELETE",
      {
        email: user.email,
        name: user.name,
      }
    );
    if(response.isOk)
    {
        const response = await useFetchData(
            "http://localhost:8000/users/allusers",
            "GET"
          );
        if (response.isOk) {
          setUsers(response.users);
        }
    }
  };

  return (
    <div className="container-fluid bg-light">
      <div className="row justify-content-center">
        <div className="col-md-12">
          <table className="table table-success table-striped">
            <thead>
              <tr>
                <th scope="col">Sr.No</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Aadhar Card</th>
                <th scope="col">Date of Birth</th>
                <th scope="col">Address</th>
                <th scope="col">Action</th>
                <th scope="col">Approve</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user, index) => (
                <tr key={user._id}>
                  <th scope="row">{index + 1}</th>
                  <td>
                    {editingUserId === user._id ? (
                      <input
                        type="text"
                        name="name"
                        value={userData.name}
                        onChange={handleInputChange}
                      />
                    ) : (
                      user.name
                    )}
                  </td>
                  <td>
                    {editingUserId === user._id ? (
                      <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleInputChange}
                      />
                    ) : (
                      user.email
                    )}
                  </td>

                  <td>
                    {editingUserId === user._id ? (
                      <input
                        type="text"
                        name="aadharCard"
                        value={userData.aadharCard}
                        onChange={handleInputChange}
                      />
                    ) : (
                      user.aadharCard
                    )}
                  </td>
                  <td>
                    {editingUserId === user._id ? (
                      <input
                        type="date"
                        name="dob"
                        value={userData.dob}
                        onChange={handleInputChange}
                      />
                    ) : (
                      user.dob
                    )}
                  </td>
                  <td>
                    {editingUserId === user._id ? (
                      <input
                        type="text"
                        name="address"
                        value={userData.address}
                        onChange={handleInputChange}
                      />
                    ) : (
                      user.address
                    )}
                  </td>
                  <td>
                    {editingUserId === user._id ? (
                      <button className="user-btn" onClick={handleUpdate}>
                        Update
                      </button>
                    ) : (
                      <button
                        className="user-btn"
                        onClick={() => startEditing(user._id, user)}
                      >
                        Edit
                      </button>
                    )}
                  </td>
                  <td>
                    <button
                      className="user-btn"
                      onClick={() => {
                        approveHandler(user);
                      }}
                    >
                      Approve
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllUser;
