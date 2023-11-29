import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const LineChart = () => {
  const chartRef = useRef();
  const chartInstance = useRef(null);

  const [viewers, setViewers] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewerInput, setViewerInput] = useState('');

  useEffect(() => {
    if (chartRef && chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      chartInstance.current = new Chart(chartRef.current, {
        type: 'line',
        data: {
          labels: viewers.map((_, index) => `Date ${index + 1}`),
          datasets: [{
            fill: false,
            lineTension: 0,
            backgroundColor: 'rgb(173, 216, 230)',
            borderColor: 'blue',
            data: viewers,
          }],
        },
        options: {
          plugins: {
            legend: { display: false },
          },
          scales: {
            x: {
              min: 0,
              max: 8, 
            },
            y: {
              min: 0,
              max: 20, 
            },
          },
        },
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [viewers]);

  const handleViewersChange = (event) => {
    setViewerInput(event.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSubmit = () => {
    const viewersArray = viewerInput.split(',').map((value) => parseInt(value.trim(), 10));
    setViewers([...viewers, ...viewersArray]);
    setViewerInput('');
  };

  return (
    <div className="container mx-auto p-4">
      <canvas ref={chartRef} className="w-full max-w-lg mx-auto mb-4" />
      <div className="flex items-center space-x-2">
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          className="border rounded px-2 py-1"
        />
        <input
          type="text"
          placeholder="Enter Viewers (comma-separated)"
          value={viewerInput}
          onChange={handleViewersChange}
          className="border rounded px-2 py-1"
        />
        <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">
          Submit
        </button>
      </div>
    </div>
  );
};

export default LineChart;
