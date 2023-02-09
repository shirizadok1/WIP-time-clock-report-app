import React, { useState } from 'react';

const EmployeeDash = () => {
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const handleStart = () => {
    setStartTime(new Date());
  };

  const handleStop = () => {
    setEndTime(new Date());

    // Add logic to save the working hours to the database
  };

  return (
    <div>
      <button onClick={handleStart} disabled={startTime}>
        Start
      </button>
      <button onClick={handleStop} disabled={!startTime || endTime}>
        Stop
      </button>
      {startTime && (
        <div>
          <p>Start Time: {startTime.toString()}</p>
        </div>
      )}
      {endTime && (
        <div>
          <p>End Time: {endTime.toString()}</p>
        </div>
      )}
      <button>View Monthly Report</button>
    </div>
  );
};

export default EmployeeDash;
