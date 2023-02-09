import React, { useState } from "react";
import EmployeeDash from "./employee-dash/EmployeeDash";

const EmployeeSec = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div>
      <button onClick={() => setIsVisible(!isVisible)}>Employee Section</button>
      {isVisible && <MyComponent />}
    </div>
  );
};

function MyComponent() {
  return (
    <div>
      <EmployeeDash />
    </div>
  );
}

export default EmployeeSec;
