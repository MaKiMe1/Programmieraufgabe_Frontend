import { courseObject } from "@/dataObjects/courseObject";
import { userObject } from "@/dataObjects/userObject";
import { reactive } from "vue";

export const state = reactive({
  allCourses: [] as courseObject[],
  allStudents: [] as userObject[],
  allTeachers: [] as userObject[],
});
