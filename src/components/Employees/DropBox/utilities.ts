import {
  EmployeeData,
  CommonWorkTimeAndCommonProjectsList,
  CommonWorkerCouple,
} from "./constants";

export const findPairWithLongestCommonWorkTime = (
  csvData: EmployeeData[],
  mapOfEmployeeTotalTimes: Map<
    string,
    Map<string, CommonWorkTimeAndCommonProjectsList>
  >
) => {
  csvData.forEach((eData) => {
    const { EmployeeId, ProjectId, StartDate, EndDate } = eData;

    const startDateTime = new Date(new Date(StartDate).toUTCString()).getTime();
    const endDateTime =
      EndDate === "NULL" || EndDate === null
        ? new Date(new Date().toUTCString()).getTime()
        : new Date(new Date(EndDate!).toUTCString()).getTime();

    const employeesFromSameProject = csvData.filter((emp) => {
      if (emp.ProjectId === ProjectId && EmployeeId !== emp.EmployeeId)
        return true;
      return false;
    });

    if (!mapOfEmployeeTotalTimes.get(EmployeeId)) {
      mapOfEmployeeTotalTimes.set(
        EmployeeId,
        new Map<string, CommonWorkTimeAndCommonProjectsList>()
      );
    }

    employeesFromSameProject.forEach((sEmployeeData) => {
      const {
        EmployeeId: secondEmpId,
        ProjectId: secondProjectId,
        StartDate: secondStartDate,
        EndDate: secondEndDate,
      } = sEmployeeData;

      const secondStartDateTime = new Date(
        new Date(secondStartDate).toUTCString()
      ).getTime();
      const secondEndDateTime =
        secondEndDate === "NULL" || secondEndDate === null
          ? new Date(new Date().toUTCString()).getTime()
          : new Date(new Date(secondEndDate!).toUTCString()).getTime();

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

      const empMap = mapOfEmployeeTotalTimes.get(EmployeeId);
      const commonData = empMap?.get(secondEmpId);
      if (!commonData) {
        const newProjectsMap = new Map<string, number>();
        newProjectsMap.set(secondProjectId, difference);
        empMap?.set(secondEmpId, {
          time: difference,
          projects: newProjectsMap,
        });
      } else {
        commonData?.projects.set(secondProjectId, commonData?.projects.get(secondProjectId) ?? 0 + difference)
        empMap?.set(secondEmpId, {
          time: (commonData?.time ?? 0) + difference,
          projects: commonData?.projects!,
        });
      }
    });
  });
};

export const findPair = (csvData: EmployeeData[]): CommonWorkerCouple => {
  const mapOfEmployeeTotalTimes = new Map<
    string,
    Map<string, CommonWorkTimeAndCommonProjectsList>
  >();

  findPairWithLongestCommonWorkTime(csvData, mapOfEmployeeTotalTimes);

  let currentCoupleWithLongestCommonWorkTime: CommonWorkerCouple;

  mapOfEmployeeTotalTimes.forEach((coWorkers, emp1Id) => {
    coWorkers.forEach((commonData, emp2Id) => {
      if (
        !currentCoupleWithLongestCommonWorkTime ||
        currentCoupleWithLongestCommonWorkTime.commonWorkedTime.time < commonData.time
      ) {
        currentCoupleWithLongestCommonWorkTime = new CommonWorkerCouple(
          emp1Id,
          emp2Id,
          commonData
        );
      }
    });
  });

  return currentCoupleWithLongestCommonWorkTime!;
};