import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditConfigration = ({ submittedData, updateSubmittedData }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedJob, setEditedJob] = useState({});
  const [tempFormData, setTempFormData] = useState({});

  useEffect(() => {
    setTempFormData(editedJob);
  }, [editedJob]);

  const handleEdit = (job) => {
    setEditMode(true);
    setEditedJob(job);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditedJob({});
    setTempFormData({});
  };

  const handleChange = (e) => {
    setTempFormData({
      ...tempFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`/jobs/${editedJob._id}`, tempFormData);
      const updatedJob = response.data;

      const updatedData = submittedData.map((job) =>
        job._id === updatedJob._id ? updatedJob : job
      );

      updateSubmittedData(updatedData);
      setEditMode(false);
      setEditedJob({});
      setTempFormData({});

      alert('Job updated successfully');
    } catch (error) {
      console.error('Error updating job', error);
      alert('Error updating job');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/jobs/${id}`);
      const updatedData = submittedData.filter(
        (job) => job._id.toString() !== id.toString()
      );
      updateSubmittedData(updatedData);
      alert('Job deleted successfully');
    } catch (error) {
      console.error('Error deleting job', error);
      alert('Error deleting job');
    }
  };
  return (
    <div className="flex justify-center p-9">
      {submittedData && submittedData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {submittedData.map((job) => (
            <div key={job._id} className="rounded shadow p-4 w-full">
              <div className="flex items-center">
                <img className="pr-3 w-20 h-20 object-cover" src={job.image} alt="" />
                <div>
                  <h1 className="text-xl font-bold " title={job.title}>{job.title}</h1>
                  <p>{job.companyName}</p>
                  <p><span className="font-semibold">Deadline:</span> {job.applicationDeadline}</p>
                </div>
              </div>
              {!editMode && (
                <div
                  onClick={() => handleEdit(job)}
                  className="text-blue-500 cursor-pointer mt-2 hover:underline"
                >
                  Edit
                </div>
              )}
              {editMode && editedJob._id === job._id && (
                <div className="mt-4">
 <input
                    type="text"
                    name="title"
                    value={tempFormData.title || ''}
                    onChange={handleChange}
                    className="mt-1 p-2 border rounded-md w-full"
                  />
                  <input
                    type="text"
                    name="companyName"
                    value={tempFormData.companyName || ''}
                    onChange={handleChange}
                    className="mt-1 p-2 border rounded-md w-full"
                  />
                  <input
                    type="text"
                    name="applicationDeadline"
                    value={tempFormData.applicationDeadline || ''}
                    onChange={handleChange}
                    className="mt-1 p-2 border rounded-md w-full"
                  />
                  <input
                    type="text"
                    name="image"
                    value={tempFormData.image || ''}
                    onChange={handleChange}
                    className="mt-1 p-2 border rounded-md w-full"
                  />
                  <input
                    type="text"
                    name="salaryRange"
                    value={tempFormData.salaryRange || ''}
                    onChange={handleChange}
                    className="mt-1 p-2 border rounded-md w-full"
                  />
                  <input
                    type="text"
                    name="location"
                    value={tempFormData.location || ''}
                    onChange={handleChange}
                    className="mt-1 p-2 border rounded-md w-full"
                  />
                  <input
                    type="text"
                    name="Experience"
                    value={tempFormData.Experience || ''}
                    onChange={handleChange}
                    className="mt-1 p-2 border rounded-md w-full"
                  />
                  <input
                    type="text"
                    name="employmentType"
                    value={tempFormData.employmentType || ''}
                    onChange={handleChange}
                    className="mt-1 p-2 border rounded-md w-full"
                  />
              
              <div className="mt-4">
                <div className="flex items-center"><span className="bg-black w-2 h-2 rounded-full mr-2"></span><div>Salary: {job.salaryRange}</div></div>
                <div className="flex items-center"><span className="bg-black w-2 h-2 rounded-full mr-2"></span><div>Experience: {job.Experience}</div></div>
                <div className="flex items-center"><span className="bg-black w-2 h-2 rounded-full mr-2"></span><div>job Location: {job.location}</div></div>
              </div>
              <div className='bg-blue-300 mt-4 text-blue-600 rounded-xl flex justify-center w-[40%]'>{job.employmentType}</div>
              <button
                    onClick={handleUpdate}
                    className="bg-green-500 text-white p-2 rounded-md mt-2 hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300"
                  >
                    Update
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="bg-red-500 text-white p-2 rounded-md mt-2 ml-2 hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300"
                  >
                    Cancel
                  </button>
                </div>
              )}
              <div onClick={() => handleDelete(job._id)} className="text-red-500 cursor-pointer mt-2 hover:underline">
                Delete
              </div> 
            </div>
          ))}
        </div>
      ) : (
        <p>No jobs available</p>
      )}
    </div>
  );
};


export default EditConfigration;


