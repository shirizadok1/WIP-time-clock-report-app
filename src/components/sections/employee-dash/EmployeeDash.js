import React, { useState, useEffect } from "react";
import axios from "axios";

const EmployeeDash = () => {
  const [startTime, setStartTime] = useState(null);
  const [stopTime, setStopTime] = useState(null);
  const [monthlyReport, setMonthlyReport] = useState([]);
  const [showReport, setShowReport] = useState(false);

  useEffect(() => {
    axios
      .get("api/data.json")
      .then((res) => setMonthlyReport(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  const handleStartEdit = (reportIndex, dayIndex) => {
    const updatedMonthlyReport = [...monthlyReport];
    updatedMonthlyReport[reportIndex].hours[dayIndex].start = new Date();
    localStorage.setItem("monthlyReport", JSON.stringify(updatedMonthlyReport));
    setMonthlyReport(updatedMonthlyReport);
  };
  
  const handleStopEdit = (reportIndex, dayIndex) => {
    const updatedMonthlyReport = [...monthlyReport];
    updatedMonthlyReport[reportIndex].hours[dayIndex].end = new Date();
    localStorage.setItem("monthlyReport", JSON.stringify(updatedMonthlyReport));
    setMonthlyReport(updatedMonthlyReport);
  };

  const isStopDisabled = !startTime;

  return (
    <div className="employee-dash">
      <h1>Employee Dashboard</h1>
      {startTime ? (
        <div>
          <p>Start Time: {startTime.toLocaleString()}</p>
        </div>
      ) : (
        <button onClick={() => setStartTime(new Date())}>Start Clock</button>
      )}
      {stopTime ? (
        <div>
          <p>Stop Time: {stopTime.toLocaleString()}</p>
        </div>
      ) : (
        <button onClick={() => setStopTime(new Date())} disabled={isStopDisabled}>Stop Clock</button>
      )}

      <button onClick={() => setShowReport(!showReport)}>
        View Monthly Report
      </button>

      {showReport && (
        <div>
          <h2>Monthly Report</h2>
          <ul>
            {monthlyReport.map((report, reportIndex) => (
              <li key={report.id}>
                <h3>{report.name}</h3>
                <ul>
                  {report.hours.map((day, dayIndex) => (
                    <li key={day.date}>
                      {day.date}: {day.start ? day.start.toLocaleString() : '-'} - {day.end ? day.end.toLocaleString() : '-'}{" "}
                      {day.start && (
                        <button onClick={() => handleStartEdit(reportIndex, dayIndex)}>Edit Start</button>
                      )}
                      {day.end && (
                        <button onClick={() => handleStopEdit(reportIndex, dayIndex)}>Edit End</button>
                      )}
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

export default EmployeeDash;
