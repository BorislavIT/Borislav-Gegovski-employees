import { Dispatch, FC, SetStateAction } from "react";
import { MdOutlineCloudUpload } from "react-icons/md";
import { CommonWorkerCouple, EmployeeData } from "./constants";
import { findPair } from "./utilities";
import "./styles/DropBox.scss";

type DropBoxProps = {
  setCommonWorkerCouple: Dispatch<SetStateAction<CommonWorkerCouple | null>>;
};

export const DropBox: FC<DropBoxProps> = ({ setCommonWorkerCouple }) => {
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

    setCommonWorkerCouple(findPair(mappedData));
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
          Drag & Drop or&nbsp;
          <span className="text-underlined">Browse Files</span>
        </div>
        <div className="additional-info">Allowed file formats are: csv</div>
      </div>
    </div>
  );
};
