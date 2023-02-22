import { Dispatch, FC, SetStateAction } from "react";
import { MdOutlineCloudUpload } from "react-icons/md";
import { FormattedMessage } from "react-intl";
import { EmployeeData } from "./constants";
import { findDaysBetweenTwoDates, findPair } from "./utilities";
import "./styles/DropBox.scss";

type DropBoxProps = {
  setEmployeeData: Dispatch<SetStateAction<EmployeeData[]>>;
};

export const DropBox: FC<DropBoxProps> = ({ setEmployeeData }) => {
  const fileReader = new FileReader();

  fileReader.onload = function (event) {
    const dataSplitByRows = event?.target?.result?.toString()!.split("\r\n")!;
    const mappedData: EmployeeData[] = dataSplitByRows.map((eData) => {
      const currentArgs = eData.split(",");

      const EmployeeId = currentArgs[0];
      const ProjectId = currentArgs[1];
      const StartDate = new Date(currentArgs[2]).toUTCString();
      const EndDate =
        currentArgs[3] === "NULL"
          ? new Date().toUTCString()
          : new Date(currentArgs[3]).toUTCString();

      return {
        EmployeeId,
        ProjectId,
        StartDate,
        EndDate,
      };
    });

    setEmployeeData(findPair(mappedData));
  };

  const handleOnInputChange = (e: any) => {
    if (e.target.files[0]) {
      fileReader.readAsText(e.target.files[0]);
    }
  };

  return (
    <div className="drop-box-container">
      <input type="file" accept=".csv" onChange={handleOnInputChange} />
      <div className="drop-box">
        <div>
          <MdOutlineCloudUpload size={70} color="#00FFFF" />
        </div>
        <div>
          <FormattedMessage id="1" defaultMessage="Drag & Drop or" />
          &nbsp;
          <span className="text-underlined">
            <FormattedMessage id="1" defaultMessage="Browse Files" />
          </span>
        </div>
        <div className="additional-info">
          <FormattedMessage
            id="2"
            defaultMessage="Allowed file formats are: csv"
          />
        </div>
      </div>
    </div>
  );
};
