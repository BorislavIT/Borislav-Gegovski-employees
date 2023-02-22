import { useState } from "react";
import { CommonWorkerCouple, EmployeeData } from "./DropBox/constants";
import { DropBox } from "./DropBox/DropBox";
import { EmployeesTable } from "./EmployeesTable/EmployeesTable";

export const EmployeesData = () => {
  const [commonWorkerCouple, setCommonWorkerCouple] = useState<
    CommonWorkerCouple | undefined
  >();

  return (
    <div className="employees-container">
      {!commonWorkerCouple ? (
        <DropBox setCommonWorkerCouple={setCommonWorkerCouple} />
      ) : (
        <EmployeesTable commonWorkerCouple={commonWorkerCouple} />
      )}
    </div>
  );
};
