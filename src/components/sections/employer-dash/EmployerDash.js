import React, { useState, useEffect } from "react";
import axios from "axios";

const EmployerSection = () => {
  const [employees, setEmployees] = useState([]);
  const [totalHours, setTotalHours] = useState(0);
  const [newEmployee, setNewEmployee] = useState({ name: "", monthlyHours: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("api/data.json");
        console.log(response.data)
        setEmployees(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const calculateTotalHours = () => {
      let total = 0;
      employees.forEach((employee) => {
        total += employee.monthlyHours;
      });
      setTotalHours(total);
    };

    calculateTotalHours();
  }, [employees]);

  const handleNewEmployeeSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("data.json", newEmployee);
      setEmployees([...employees, response.data.data]);
      setNewEmployee({ name: response.data.data.name, monthlyHours: 0 });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Monthly Report for Each Employee</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Monthly Hours</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.name}</td>
              <td>{employee.monthlyHours}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Total Monthly Hours: {totalHours}</h2>
      <h2>Add New Employee</h2>
      <form onSubmit={handleNewEmployeeSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={newEmployee.name}
            onChange={(event) =>
              setNewEmployee({ ...newEmployee, name: event.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="monthlyHours">Monthly Hours:</label>
          <input
            type="number"
            id="monthlyHours"
            value={newEmployee.monthlyHours}
            onChange={(event) =>
              setNewEmployee({
                ...newEmployee,
                monthlyHours: Number(event.target.value),
              })
            }
          />
        </div>
        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
};

export default EmployerSection;
