import React, { useState } from "react";
import EmployerDash from "./employer-dash/EmployerDash";

const EmployerSec = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div>
      <button onClick={() => setIsVisible(!isVisible)}>Employer Section</button>
      {isVisible && <MyComponent />}
    </div>
  );
};

function MyComponent() {
  return (
    <div>
      <EmployerDash />
    </div>
  );
}

export default EmployerSec;
