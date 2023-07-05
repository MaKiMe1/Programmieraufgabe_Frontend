import { courseObject } from "@/dataObjects/courseObject";
import { userObject } from "@/dataObjects/userObject";
import { reactive } from "vue";

export const state = reactive({
  allCourses: [] as courseObject[],
  allStudents: [] as userObject[],
  allTeachers: [] as userObject[],
});

export async function getCourses(): Promise<void> {
  try {
    const url = "/course";
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const jsonData: courseObject[] = await response.json();
    state.allCourses = jsonData;
  } catch (reason) {
    return;
  }
}

export async function getTeachers(): Promise<void> {
  try {
    const url = "/user/teachers";
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const jsonData: userObject[] = await response.json();
    state.allTeachers = jsonData;
  } catch (reason) {
    return;
  }
}

export async function getStudents(): Promise<void> {
  try {
    const url = "/user/students";
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const jsonData: userObject[] = await response.json();
    state.allStudents = jsonData;
  } catch (reason) {
    return;
  }
}
