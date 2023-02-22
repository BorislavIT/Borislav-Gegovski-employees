import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { FC } from "react";
import { CommonWorkerCouple, dayInMs } from "../DropBox/constants";
import "./styles/EmployeesTable.scss";

type EmployeesTableProps = {
  commonWorkerCouple?: CommonWorkerCouple;
};

export const EmployeesTable: FC<EmployeesTableProps> = ({
  commonWorkerCouple,
}) => {
  const employee1IdColumn = () => {
    return <>{commonWorkerCouple?.emp1Id}</>;
  };

  const employee2IdColumn = () => {
    return <>{commonWorkerCouple?.emp2Id}</>;
  };

  const projectIdColumn = (project: string | number[]) => {
    return <>{project[0]}</>;
  };

  const totalCommonWorkedDaysColumn = (project: string | number[]) => {
    return <>{Math.ceil((project[1] as number) / dayInMs)}</>;
  };

  return (
    <DataTable
      value={Array.from(commonWorkerCouple?.commonWorkedTime.projects!)}
      className="employees-table"
      stripedRows
    >
      <Column
        field="EmployeeId1"
        header="Employee ID #1"
        body={employee1IdColumn}
      />
      <Column
        field="EmployeeId2"
        header="Employee ID #2"
        body={employee2IdColumn}
      />
      <Column field="ProjectId" header="Project Id" body={projectIdColumn} />
      <Column
        field="DaysWorked"
        header="Days Worked Together"
        body={totalCommonWorkedDaysColumn}
      />
    </DataTable>
  );
};
