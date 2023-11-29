import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditConfigration from '../PostedContent/EditConfigration';
import EditDummy from '../PostedContent/EditDummy';

import NavbarEmployer from './NavbarEmployer';
import LineChart from '../../LineChart';

function AboutEmployer() {
  const [userData, setUserData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editedUserData, setEditedUserData] = useState({});

  useEffect(() => {
    const callAboutEmployerPage = async () => {
      try {
        const res = await axios.get('/aboutemployer', {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
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

    callAboutEmployerPage();
  }, []);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = async () => {
    try {
      const res = await axios.put('/aboutemployer', editedUserData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
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
      <NavbarEmployer/>
      <div className="flex justify-center items-center min-h-screen py-6 bg-gray-100">
        <div className="bg-white shadow-md p-6 rounded-lg max-w-[50rem] w-full">
          <h1 className="text-3xl font-bold mb-4 text-center">Employer Information</h1>
          <div className="mb-4">
            <p className="text-lg font-semibold">Name:</p>
            <p className="text-gray-700">
              {editMode ? (
                <input
                  type="text"
                  name="name"
                  value={editedUserData.name}
                  onChange={handleInputChange}
                  className="border rounded px-2 py-1 w-full"
                />
              ) : (
                userData.name
              )}
            </p>
          </div>
          <div className="mb-4">
            <p className="text-lg font-semibold">Email:</p>
            <p className="text-gray-700">
              {editMode ? (
                <input
                  type="text"
                  name="email"
                  value={editedUserData.email}
                  onChange={handleInputChange}
                  className="border rounded px-2 py-1 w-full"
                />
              ) : (
                userData.email
              )}
            </p>
          </div>
          <div className="mb-4">
            <p className="text-lg font-semibold">ID:</p>
            <p className="text-gray-700">{userData._id}</p>
          </div>
          <div className="flex justify-between">
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
         <LineChart/>
        </div>
      </div>
      <EditDummy />
    </div>
  );
}

export default AboutEmployer;
