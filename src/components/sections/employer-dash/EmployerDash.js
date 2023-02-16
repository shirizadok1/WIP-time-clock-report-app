import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployerSection = () => {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    hourlyRate: 0,
    hoursWorked: []
  });

  useEffect(() => {
    axios.get('/api/employees')
      .then(response => setEmployees(response.data))
      .catch(error => console.log(error));
  }, []);

  const handleNewEmployeeSubmit = (event) => {
    event.preventDefault();
    axios.post('/api/employees', newEmployee)
      .then(response => setEmployees([...employees, response.data]))
      .catch(error => console.log(error));
  };

  const handleNewEmployeeChange = (event) => {
    setNewEmployee({
      ...newEmployee,
      [event.target.name]: event.target.value
    });
  };

  const getTotalHoursWorked = (hoursWorked) => {
    return hoursWorked.reduce((total, hours) => total + hours, 0);
  };

  return (
    <div>
      <h1>Employer Section</h1>
      <h2>Employees</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Hourly Rate</th>
            <th>Total Hours Worked</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee.id}>
              <td>{employee.name}</td>
              <td>${employee.hourlyRate}</td>
              <td>{getTotalHoursWorked(employee.hoursWorked)}</td>
              <td>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Add New Employee</h2>
      <form onSubmit={handleNewEmployeeSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" name="name" value={newEmployee.name} onChange={handleNewEmployeeChange} />
        </div>
        <div>
          <label htmlFor="hourlyRate">Hourly Rate:</label>
          <input type="number" name="hourlyRate" value={newEmployee.hourlyRate} onChange={handleNewEmployeeChange} />
        </div>
        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
};

export default EmployerSection;
