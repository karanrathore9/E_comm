import axios from "axios";
import React, { useState } from "react";
import apiService from "../../services/Profile";

const updatePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const userId = localStorage.getItem("userId");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    apiService
      .updatePassword(userId, formData)
      .then((response) => {
        console.log(response);
        alert("Password Updated Successfully");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="currentPassword">Current Password:</label>
        <input
          type="text"
          id="currentPassword"
          value={formData.currentPassword}
          onChange={handleInputChange}
        />

        <label htmlFor="newPassword">New Password:</label>
        <input
          type="password"
          id="newPassword"
          value={formData.newPassword}
          onChange={handleInputChange}
        />

        <button type="submit">Change Password</button>
      </form>
    </>
  );
};

export default updatePassword;

