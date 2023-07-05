import { courseObject } from "@/dataObjects/courseObject";
import { reactive } from "vue";

export const state = reactive({
  allCourses: [] as courseObject[],
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
