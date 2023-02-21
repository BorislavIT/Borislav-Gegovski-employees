import { useState } from "react";
import { MdOutlineCloudUpload } from "react-icons/md";
import { FormattedMessage } from "react-intl";

type CommonWorkTimeAndCommonProjectsList = {
  time: number;
  projects: string[];
};

class CommonWorkerCouple {
  emp1Id: string;
  emp2Id: string;
  commonWorkedTime: CommonWorkTimeAndCommonProjectsList;

  constructor(
    emp1Id: string,
    emp2Id: string,
    commonWorkedTime: CommonWorkTimeAndCommonProjectsList
  ) {
    this.emp1Id = emp1Id;
    this.emp2Id = emp2Id;
    this.commonWorkedTime = commonWorkedTime;
  }
}

export const DropBox = () => {
  const [csvData, setCsvData] = useState<string>("");
  const fileReader = new FileReader();

  fileReader.onload = function (event) {
    setCsvData(event?.target?.result?.toString()!);
  };

  const handleOnInputChange = (e: any) => {
    if (e.target.files[0]) {
      fileReader.readAsText(e.target.files[0]);
    }
  };

  const findPairWithLongestCommonWorkTime = (
    data: string[],
    mapOfEmployeeTotalTimes: Map<
      string,
      Map<string, CommonWorkTimeAndCommonProjectsList>
    >,
    dayInMs: number
  ) => {
    data.forEach((eData) => {
      const currentArgs = eData.split(",");

      const empId = currentArgs[0];
      const projectId = currentArgs[1];
      const startDateTime = new Date(
        new Date(currentArgs[2]).toUTCString()
      ).getTime();
      const endDateTime =
        currentArgs[3] === "NULL"
          ? new Date(new Date().toUTCString()).getTime()
          : new Date(new Date(currentArgs[3]).toUTCString()).getTime();

      const employeesFromSameProject = data.filter((x) => {
        const args = x.split(",");
        if (args[1] === projectId && empId !== args[0]) return true;
        return false;
      });

      if (!mapOfEmployeeTotalTimes.get(empId)) {
        mapOfEmployeeTotalTimes.set(
          empId,
          new Map<string, CommonWorkTimeAndCommonProjectsList>()
        );
      }

      employeesFromSameProject.forEach((sEmployeeData) => {
        const secondArgs = sEmployeeData.split(",");
        const secondEmpId = secondArgs[0];
        const secondProjectId = secondArgs[1];

        const secondStartDateTime = new Date(
          new Date(secondArgs[2]).toUTCString()
        ).getTime();
        const secondEndDateTime =
          secondArgs[3] === "NULL"
            ? new Date(new Date().toUTCString()).getTime()
            : new Date(new Date(secondArgs[3]).toUTCString()).getTime();

        let difference = 0;

        if (secondStartDateTime <= startDateTime) {
          if (secondEndDateTime >= endDateTime) {
            difference = endDateTime - startDateTime;
          } else if (endDateTime >= secondEndDateTime) {
            difference = secondEndDateTime - startDateTime;
          }
        } else if (startDateTime <= secondStartDateTime) {
          if (endDateTime <= secondEndDateTime) {
            difference = endDateTime - secondStartDateTime;
          } else if (endDateTime >= secondEndDateTime) {
            difference = secondEndDateTime - secondStartDateTime;
          }
        }

        difference = Math.ceil(difference / dayInMs);

        const empMap = mapOfEmployeeTotalTimes.get(empId);
        const currentAmount = empMap?.get(secondEmpId);
        if (!empMap?.get(secondEmpId)) {
          empMap?.set(secondEmpId, {
            time: difference,
            projects: [secondProjectId],
          });
        } else {
          empMap?.set(secondEmpId, {
            time: (currentAmount?.time ?? 0) + difference,
            projects: [
              ...new Set([...currentAmount?.projects!, secondProjectId]),
            ],
          });
        }
      });
    });
  };

  const doStuff = () => {
    const data = [
      "143,11,2022-01-01,2023-01-02",
      "142,11,2021-01-01,2023-01-03",
      "142,5,2021-01-01,2023-01-03",
      "143,10,2023-01-01,2023-01-02",
      "143,9,2021-01-01,2023-01-03",
      "140,8,2021-01-01,2023-01-03",
      "140,5,2021-01-01,2023-01-03",
      "140,11,2019-01-01,2023-01-03",
    ];

    const dayInMs = 1000 * 3600 * 24;
    const mapOfEmployeeTotalTimes = new Map<
      string,
      Map<string, CommonWorkTimeAndCommonProjectsList>
    >();

    findPairWithLongestCommonWorkTime(data, mapOfEmployeeTotalTimes, dayInMs);

    let currentCoupleWithLongestCommonWorkTime: CommonWorkerCouple;

    mapOfEmployeeTotalTimes.forEach((coWorkers, emp1Id) => {
      coWorkers.forEach((time, emp2Id) => {
        if (
          !currentCoupleWithLongestCommonWorkTime ||
          currentCoupleWithLongestCommonWorkTime.commonWorkedTime.time <
            time.time
        ) {
          currentCoupleWithLongestCommonWorkTime = new CommonWorkerCouple(
            emp1Id,
            emp2Id,
            time
          );
        }
      });
    });
    const allProjectsForTheCouple = data.filter((empData) => {
      const args = empData.split(",");
      const empId = args[0];
      const projectId = args[1];
      if (
        (empId === currentCoupleWithLongestCommonWorkTime.emp1Id ||
          empId === currentCoupleWithLongestCommonWorkTime.emp2Id) &&
        currentCoupleWithLongestCommonWorkTime.commonWorkedTime.projects.includes(
          projectId
        )
      ) {
        return true;
      }
      return false;
    });

    console.log(allProjectsForTheCouple!);
  };

  return (
    <div className="drop-box-container">
      <div onClick={doStuff}>yoyoyo</div>
      <input type="file" accept=".csv" onChange={handleOnInputChange} />
      <div className="drop-box">
        <div>
          <MdOutlineCloudUpload size={50} color="rgb(25, 118, 210)" />
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
