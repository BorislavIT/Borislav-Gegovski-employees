import { useState } from "react";
import { EmployeeData } from "./DropBox/constants";
import { DropBox } from "./DropBox/DropBox";
import { EmployeesTable } from "./EmployeesTable/EmployeesTable";

export const EmployeesData = () => {
  const [employeeData, setEmployeeData] = useState<EmployeeData[]>([]);

  return (
    <div className="employees-container">
      {employeeData.length === 0 ? (
        <DropBox setEmployeeData={setEmployeeData} />
      ) : (
        <EmployeesTable employeeData={employeeData} />
      )}
    </div>
  );
};
