import axios from "axios";
import React, { useEffect, useState } from "react";
import { addCategory } from "../../../../backend/src/controller/category";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import Input from "../../components/UI/input";
import apiService from "../../services/Profile";
import { useDispatch } from "react-redux";
import {
  setMultipleAddresses,
  saveAddress,
  saveSelectedAddress,
} from "../../features/Store/Slices/addressSlice";

export interface AddressType {
  houseNo: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

const Address = () => {
  const [addresses, setAddresses] = useState<string[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [address, setAddress] = useState<AddressType>({
    houseNo: "",
    street: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
  });
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    getAddresses();
  }, []);

  const getAddresses = () => {
    apiService
      .getAddress(userId)
      .then((res) => {
        setAddresses(res.data.addresses);
        dispatch(setMultipleAddresses(res.data.addresses));
      })
      .catch((err: Error) => {
        console.log(err);
      });
  };

  const handleAddressSelection = (address: string) => {
    setSelectedAddress(address);
    dispatch(saveSelectedAddress(address));
    localStorage.setItem("selectedAddress", address);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress({
      ...address,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmitAddress = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await apiService.postAddress(userId, address);
      setMessage("User address added/updated successfully!");
      dispatch(saveAddress(address));
      alert(message);
      getAddresses();
    } catch (error) {
      console.error(error);
      setMessage("Internal server error");
      alert(message);
    }
  };
  return (
    <>
      <h2>Select an address:</h2>
      <form>
        {addresses &&
          addresses.length > 0 &&
          addresses.map((address: string, index: number) => {
            return (
              <div key={index}>
                <label>
                  <input
                    type="radio"
                    name="address"
                    value={address}
                    checked={selectedAddress === address}
                    onChange={() => handleAddressSelection(address)}
                  />
                  {address}
                </label>
              </div>
            );
          })}
      </form>
      {selectedAddress && (
        <div>
          <h5>Current Address:</h5>
          <p>{selectedAddress}</p>
        </div>
      )}
      <Button variant="primary" onClick={handleShow}>
        Add New Address
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmitAddress}>
            <Input
              type="text"
              id="houseNo"
              value={address.houseNo}
              placeholder={"House No"}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAddress({ ...address, houseNo: e.target.value })
              }
            />
            <Input
              type="text"
              id="street"
              value={address.street}
              placeholder={"Street"}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAddress({ ...address, street: e.target.value })
              }
            />
            <Input
              type="text"
              id="city"
              value={address.city}
              placeholder={"City"}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAddress({ ...address, city: e.target.value })
              }
            />
            <Input
              type="text"
              id="state"
              value={address.state}
              placeholder={"State"}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAddress({ ...address, state: e.target.value })
              }
            />
            <Input
              type="text"
              id="country"
              value={address.country}
              placeholder={"Country"}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAddress({ ...address, country: e.target.value })
              }
            />
            <Input
              type="text"
              id="zipCode"
              value={address.zipCode}
              placeholder={"Zip Code"}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAddress({ ...address, zipCode: e.target.value })
              }
            />

            <Button variant="primary" type="submit">
              Add
            </Button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Address;



