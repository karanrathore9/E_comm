import { Input } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "./style.css";
import apiService from "../../services/Profile";
import { useSelector } from "react-redux";
import { IUserData } from "../../features/Store/Slices/userSlice";

export interface IUser {
  email?: string;
  firstName?: string;
  fullName?: string;
  lastName?: string;
  role?: string;
  _id?: string;
  contactNumber?: string;
  profilePicture?: string;
}

interface IUserProfile {
  user: IUser;
}

const ViewProfile = () => {
  const [userProfile, setUserProfile] = useState<IUser>({});
  const userId = localStorage.getItem("userId");
  const [show, setShow] = useState(false);
  const [profilePicture, setProfilePicture] = useState<File>();

  const data = useSelector((state: IUserData) => {
    return state.user;
  })

  console.log(data, "🧟🧟🧟🧟")

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  const fetchUserProfile = async () => {
    const userProfile = await apiService.getUserProfile(userId);
    setUserProfile(userProfile);
  };

  const updateUser = async () => {

    const updatedUserProfile = await apiService.updateUserProfile(
      userId,
      userProfile
    );
    console.log(updatedUserProfile);

    fetchUserProfile();
    handleClose();
  };

  return (
    <div>
      <h2>User Profile</h2>
      <img style={{ width: 100 }} src={userProfile.profilePicture} />
      <p>
        Name: {userProfile.firstName} {userProfile.lastName}
      </p>
      <p>Email: {userProfile.email}</p>
      <p>Contact No: {userProfile.contactNumber}</p>
      <p>Address: {localStorage.getItem("selectedAddress")}</p>

      <Button variant="primary" onClick={handleShow}>
        Update Profile
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Your Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            value={userProfile.firstName}
            placeholder={"First Name"}
            onChange={(e) =>
              setUserProfile({ ...userProfile, firstName: e.target.value })
            }
          ></input>
          <input
            type="text"
            value={userProfile.lastName}
            placeholder={"Last Name"}
            onChange={(e) =>
              setUserProfile({ ...userProfile, lastName: e.target.value })
            }
          ></input>
          <input
            type="text"
            value={userProfile.contactNumber}
            placeholder={"Contact Number"}
            onChange={(e) =>
              setUserProfile({ ...userProfile, contactNumber: e.target.value })
            }
          ></input>
          <input
            type="file"
            placeholder={"Profile Picture"}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target.files && e.target.files[0]) {
                setProfilePicture(e.target.files[0]);
              }
              // setProfilePicture(e.target.files[0]);
            }}
          ></input>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={updateUser}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ViewProfile;
