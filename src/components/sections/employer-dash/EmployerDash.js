import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployerDash = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [totalHours, setTotalHours] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get('/api/employees')
      .then(response => {
        setEmployees(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (selectedEmployee) {
      setIsLoading(true);
      axios
        .get(`/api/employees/${selectedEmployee.id}/monthly_report`)
        .then(response => {
          setTotalHours(response.data.totalHours);
          setIsLoading(false);
        })
        .catch(error => {
          console.error(error);
          setIsLoading(false);
        });
    }
  }, [selectedEmployee]);

  const handleSelectEmployee = employee => {
    setSelectedEmployee(employee);
  };

  const handleAddEmployee = employee => {
    setEmployees([...employees, employee]);
  };

  return (
    <div className="employer-dash">
      <h2>Employer Dashboard</h2>
      <div className="employee-list">
        <h3>Employee List</h3>
        {isLoading && <p>Loading...</p>}
        {employees.map(employee => (
          <p key={employee.id} onClick={() => handleSelectEmployee(employee)}>
            {employee.name}
          </p>
        ))}
      </div>
      {selectedEmployee && (
        <div className="employee-details">
          <h3>{selectedEmployee.name}</h3>
          {isLoading && <p>Loading...</p>}
          {totalHours && (
            <div>
              <h4>Total Hours</h4>
              <p>{totalHours}</p>
            </div>
          )}
        </div>
      )}
      <button onClick={() => handleAddEmployee()}>Add Employee</button>
    </div>
  );
};

export default EmployerDash;
