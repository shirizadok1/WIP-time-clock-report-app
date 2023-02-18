import React, { useState, useEffect } from "react";
import axios from "axios";

const EmployeeDashboard = () => {
  const [startTime, setStartTime] = useState(null);
  const [stopTime, setStopTime] = useState(null);
  const [monthlyReport, setMonthlyReport] = useState([]);
  const [showReport, setShowReport] = useState(false);

  const startClock = () => {
    setStartTime(new Date());
  };

  const stopClock = () => {
    setStopTime(new Date());
  };

  useEffect(() => {
    axios
      .get("api/data.json")
      .then((res) => setMonthlyReport(res.data.data))
      .catch((err) => console.log(err));
  }, [monthlyReport]);

  console.log(monthlyReport);

  return (
    <div>
      <h1>Employee Dashboard</h1>
      <button onClick={startClock}>Start Clock</button>
      <button onClick={stopClock}>Stop Clock</button>
      {startTime && (
        <div>
          <p>Start Time: {startTime.toString()}</p>
        </div>
      )}
      {stopTime && (
        <div>
          <p>Stop Time: {stopTime.toString()}</p>
        </div>
      )}

      <button onClick={() => setShowReport(!showReport)}>
        View Monthly Report
      </button>

      {showReport && (
        <div>
          <h2>Monthly Report</h2>
          <ul>
            {monthlyReport.map((report) => (
              <li key={report.id}>
                <h3>{report.name}</h3>
                <ul>
                  {report.hours.map((day) => (
                    <li>
                      {day.date}: {day.start} - {day.stop}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default EmployeeDashboard;
