import React, { useState } from 'react';
import axios from 'axios';
import { FaShareSquare } from 'react-icons/fa';

const JobDataFront = ({ submittedData, updateSubmittedData }) => {
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

  const handleApplyNow = (job) => {
    const subject = `Application for ${job.title} at ${job.companyName}`;
    const body = `Dear Hiring Manager,\n\nI am interested in the position of ${job.title} at ${job.companyName}. Please find my application attached.\n\nSincerely, [Your Name]`;

    const mailtoLink = `mailto:${job.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;
  };

  const handleShareClick = async (job) => {
    try {
      console.log('button clicked');
      if (navigator.share) {
        await navigator.share({
          title: job.title,
          text: `Check out this job at ${job.companyName}: ${job.title}`,
          url: window.location.href,
        });
      } else {
        throw new Error('Web Share API not supported');
      }
    } catch (error) {
      console.error('Error sharing:', error);
   
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
                <img
                  className="pr-3 w-20 h-20 object-cover"
                  src={job.image}
                  alt=""
                />
                <div>
                  <h1 className="text-xl font-bold " title={job.title}>
                    {job.title}
                  </h1>
                  <p>{job.companyName}</p>
                  <p>
                    <span className="font-semibold">Deadline:</span>{' '}
                    {job.applicationDeadline}
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center"><span className="bg-black w-2 h-2 rounded-full mr-2"></span><div>Salary: {job.salaryRange}</div></div>
                <div className="flex items-center"><span className="bg-black w-2 h-2 rounded-full mr-2"></span><div>Experience: {job.Experience}</div></div>
                <div className="flex items-center"><span className="bg-black w-2 h-2 rounded-full mr-2"></span><div>job Location: {job.location}</div></div>
              </div>
              <div className="flex justify-between">
                <button className="bg-blue-300 mt-4 text-blue-600 rounded-xl  flex justify-center w-[40%]">
                  {job.employmentType}
                </button>
                <button
                  className="bg-blue-600 px-3 rounded-full text-white"
                  onClick={() => handleApplyNow(job)}
                >
                  Apply Now
                </button>
                <button onClick={() => handleShareClick(job)}>
                  <FaShareSquare />
                </button>
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

export default JobDataFront;
