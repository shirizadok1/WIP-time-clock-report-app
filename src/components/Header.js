import React from "react";
import EmployeeSec from "./sections/EmployeeSec";
import EmployerSec from "./sections/EmployerSec";

const Header = () => {
  return (
    <div>
      Time clock report
      <EmployeeSec />
      <EmployerSec />
    </div>
  );
};

export default Header;
