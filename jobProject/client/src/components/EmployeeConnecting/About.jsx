import React, { useEffect, useState } from "react";
import axios from "axios";
import LineChart from "../../LineChart";
import Navbar from "./Navbar";

function About() {
  const [userData, setUserData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editedUserData, setEditedUserData] = useState({});

  useEffect(() => {
    const callAboutUsPage = async () => {
      try {
        const res = await axios.get("/about", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });

        if (res.status === 200) {
          setUserData(res.data);
          setEditedUserData(res.data);
        } else {
          throw new Error(res.statusText);
        }
      } catch (err) {
        console.log(err);
      }
    };

    callAboutUsPage();
  }, []);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = async () => {
    try {
      const res = await axios.put("/about", editedUserData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.status === 200) {
        setUserData({ ...editedUserData });
        setEditMode(false);
      } else {
        throw new Error(res.statusText);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center h-screen bg-gray-200">
        <div className="bg-white shadow-md p-6 rounded-lg max-w-[50rem] w-full">
          <p className="font-bold mb-2">
            Welcome
            {editMode ? (
              <>
                <input
                  type="text"
                  name="name"
                  value={editedUserData.name}
                  onChange={handleInputChange}
                  className="border rounded px-2 py-1 w-full"
                />
                <input
                  type="text"
                  name="email"
                  value={editedUserData.email}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="phone"
                  value={editedUserData.phone}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="id"
                  value={editedUserData._id}
                  onChange={handleInputChange}
                />
              </>
            ) : (
              userData.name
            )}
          </p>
          <div className="flex justify-between">
            <div>
              <p>ID: {userData._id}</p>
              <p>Email: {userData.email}</p>
              <p>Contact Number: {userData.phone}</p>
            </div>
            <div>
              <div className="flex justify-end px-4 py-2">
                {!editMode ? (
                  <button
                    onClick={handleEdit}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Edit Profile
                  </button>
                ) : (
                  <button
                    onClick={handleSave}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    Save
                  </button>
                )}
              </div>
            </div>
          </div>
          <LineChart />
        </div>
      </div>
    </div>
  );
}

export default About;
