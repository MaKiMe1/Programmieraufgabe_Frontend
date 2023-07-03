import { courseObject } from "./courseObject";

export interface userObject {
  id: number;
  name: string;
  surname: string;
  birthDate: Date;
  courses: courseObject[];
  isTeacher: boolean;
  grade: number;
  subjects: string[];
}
