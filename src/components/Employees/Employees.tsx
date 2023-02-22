import { useState } from "react";
import { CommonWorkerCouple } from "./DropBox/constants";
import { DropBox } from "./DropBox/DropBox";
import { EmployeesTable } from "./EmployeesTable/EmployeesTable";
import { Button } from "primereact/button";
import "./styles/Employees.scss";

export const EmployeesData = () => {
  const [commonWorkerCouple, setCommonWorkerCouple] =
    useState<CommonWorkerCouple | null>(null);

  return (
    <div className="employees-container">
      {!commonWorkerCouple ? (
        <DropBox setCommonWorkerCouple={setCommonWorkerCouple} />
      ) : (
        <>
          <Button
            className="reset-btn"
            onClick={() => setCommonWorkerCouple(null)}
          >
            Reset
          </Button>
          <EmployeesTable commonWorkerCouple={commonWorkerCouple} />
        </>
      )}
    </div>
  );
};
