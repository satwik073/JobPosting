import React, { useState } from 'react';
import axios from 'axios';

const JobData = ({ submittedData, updateSubmittedData }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/jobs/${id}`);
      const updatedData = submittedData.filter((job) => job._id.toString() !== id.toString());
      updateSubmittedData(updatedData);
      alert('Job deleted successfully');
    } catch (error) {
      console.error('Error deleting job', error);
      alert('Error deleting job');
    }
  };

  const filteredJobs = submittedData.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center p-9">
      <input
        type="text"
        placeholder="Search by job title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 rounded mb-4 w-full max-w-lg"
      />
      {filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 w-full ">
          {filteredJobs.map((job) => (
            <div key={job._id} className="rounded shadow p-4 w-full">
              <div className="flex items-center">
                <img className="pr-3 w-20 h-20 object-cover" src={job.image} alt="" />
                <div>
                  <h1 className="text-xl font-bold " title={job.title}>{job.title}</h1>
                  <p>{job.companyName}</p>
                  <p><span className="font-semibold">Deadline:</span> {job.applicationDeadline}</p>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center"><span className="bg-black w-2 h-2 rounded-full mr-2"></span><div>Salary: {job.salaryRange}</div></div>
                <div className="flex items-center"><span className="bg-black w-2 h-2 rounded-full mr-2"></span><div>Experience: {job.Experience}</div></div>
                <div className="flex items-center"><span className="bg-black w-2 h-2 rounded-full mr-2"></span><div>job Location: {job.location}</div></div>
              </div>
              <div className='bg-blue-300 mt-4 text-blue-600 rounded-xl flex justify-center w-[40%]'>{job.employmentType}</div>
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

export default JobData;
