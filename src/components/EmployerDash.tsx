import{ useState, useEffect } from "react";
import axios from "axios";

const EmployerDash = () => {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({ name: "", monthlyHours: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("api/data.json");
        console.log(response.data);
        setEmployees(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleNewEmployeeSubmit = async (event) => {
    event.preventDefault()

    const newEmployee = {
      name: "New Employee",
      hours: [],
    };

    const updatedEmployees = [...employees, newEmployee];

    localStorage.setItem("employees", JSON.stringify(updatedEmployees));
    setEmployees(updatedEmployees);
    console.log(employees);
  };

  return (
    <div>
      <h2>Monthly Report for Each Employee</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Monthly Hours</th>
            <th>Total Monthly Hours</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => {
            let totalHours = 0;
            employee.hours.forEach((day) => {
              totalHours += parseFloat(day.end) - parseFloat(day.start);
            });
            return (
              <tr key={employee.id}>
                <td>{employee.name}</td>
                <td>
                  {employee.hours.map((day) => (
                    <div>
                      {day.date}: {day.start} - {day.stop}
                    </div>
                  ))}
                </td>
                <td>{totalHours}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

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

export default EmployerDash;
