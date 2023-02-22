export type CommonWorkTimeAndCommonProjectsList = {
  time: number;
  projects: string[];
};

export type EmployeeData = {
  EmployeeId: string;
  ProjectId: string;
  StartDate: string;
  EndDate: string | null;
  DaysWorked: number;
};

export class CommonWorkerCouple {
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

export const dayInMs = 1000 * 3600 * 24;
