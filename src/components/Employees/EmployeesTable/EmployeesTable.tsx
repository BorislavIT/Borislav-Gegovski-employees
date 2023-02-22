import { Column } from "primereact/column";
import { DataTable, DataTableStateEvent } from "primereact/datatable";
import { FC, useState } from "react";
import { CommonWorkerCouple, dayInMs } from "../DropBox/constants";
import "./styles/EmployeesTable.scss";

type EmployeesTableProps = {
  commonWorkerCouple: CommonWorkerCouple | null;
};

export const EmployeesTable: FC<EmployeesTableProps> = ({
  commonWorkerCouple,
}) => {
  const [projects, setProjects] = useState<[string, number][]>(
    Array.from(commonWorkerCouple?.commonWorkedTime.projects!)
  );

  const [sortOrder, setSortOrder] = useState<0 | 1 | -1 | null | undefined>(0);

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

  const onSort = (event: DataTableStateEvent) => {
    if (event.sortField === "DaysWorked") {
      if (sortOrder === 1) {
        setProjects(projects.sort((a, b) => b[1] - a[1]));
        setSortOrder(-1);
      } else {
        setProjects(projects.sort((a, b) => a[1] - b[1]));
        setSortOrder(1);
      }
    }
  };

  return (
    <DataTable
      onSort={onSort}
      sortOrder={sortOrder}
      value={projects}
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
        sortable
        body={totalCommonWorkedDaysColumn}
      />
    </DataTable>
  );
};
