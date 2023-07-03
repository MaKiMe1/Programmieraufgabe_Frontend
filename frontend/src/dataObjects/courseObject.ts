import { userObject } from "./userObject";

export interface courseObject {
  id: number;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  category: string;
  teacher: userObject;
  students: userObject[];
}
