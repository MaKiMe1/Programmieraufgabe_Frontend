import { courseObject } from "@/dataObjects/courseObject";
import { reactive } from "vue";

export const state = reactive({
  allCourses: [] as courseObject[],
});
