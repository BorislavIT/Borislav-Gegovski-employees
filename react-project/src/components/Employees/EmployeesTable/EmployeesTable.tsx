import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { FC } from "react";
import { useIntl } from "react-intl";
import { EmployeeData } from "../DropBox/constants";
import "./styles/EmployeesTable.scss";

type EmployeesTableProps = {
  employeeData: EmployeeData[];
};

export const EmployeesTable: FC<EmployeesTableProps> = ({ employeeData }) => {
  const intl = useIntl();

  const startDateColumn = (employeeData: EmployeeData) => {
    return (
      <>{intl.formatDate(employeeData.StartDate, { dateStyle: "short" })}</>
    );
  };
  const endDateColumn = (employeeData: EmployeeData) => {
    return (
      <>{intl.formatDate(employeeData.EndDate!, { dateStyle: "short" })}</>
    );
  };

  return (
    <DataTable value={employeeData} className="employees-table" stripedRows>
      <Column field="EmployeeId" header="EmployeeId" />
      <Column field="ProjectId" header="ProjectId" />
      <Column field="StartDate" header="StartDate" body={startDateColumn} />
      <Column field="EndDate" header="EndDate" body={endDateColumn} />
    </DataTable>
  );
};
