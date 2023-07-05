<template>
  <div class="TeacherMask">
    <h1>Lehrer erstellen</h1>
    <InputText
      v-model="userObject.name"
      type="text"
      placeholder="Vorname"
    ></InputText>
    <InputText
      v-model="userObject.surname"
      type="text"
      placeholder="Nachname"
    ></InputText>
  </div>
  <br />
  <div>
    <Dropdown
      v-model="selectedCourse"
      :options="courseArray"
      :virtualScrollerOptions="{ itemSize: 38 }"
      placeholder="Select Item"
      class="w-full md:w-14rem"
    />
  </div>
  <br />
  <div>
    <Calendar v-model="date" dateFormat="dd/mm/yy" placeholder="Geburtstag" />
  </div>
  <br />
  <div>
    <InputText
      v-model="subjectName"
      type="text"
      placeholder="Fächer"
    ></InputText>
  </div>
  <br />
  <div>
    <Button @click="sendTeacher" label="Press">Press</Button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from "vue";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Calendar from "primevue/calendar";
import Dropdown from "primevue/dropdown";
import { userObject } from "@/dataObjects/userObject";
import { courseObject } from "@/dataObjects/courseObject";
import { state } from "@/components/state";

export default defineComponent({
  name: "TeacherMaskView",
  components: {
    Button,
    InputText,
    Calendar,
    Dropdown,
  },
  setup() {
    const date = ref();
    const subjectName = "";
    const selectedCourse = ref();
    const courseArray: string[] = [];
    let subjectsSplit = [];
    let selectedCourseObject: courseObject[] = [];

    subjectsSplit = subjectName.split(" ");

    state.allCourses.forEach((item) =>
      courseArray.push(item.title + ":" + item.id.toString())
    );

    let userObject = reactive<userObject>({
      id: 0,
      name: "",
      surname: "",
      birthDate: date.value,
      courses: [],
      isTeacher: true,
      grade: 0,
      subjects: subjectsSplit,
    });

    async function sendTeacher(): Promise<void> {
      addCourseToDataObject();
      userObject.courses = selectedCourseObject;
      try {
        const response = await fetch("/user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userObject),
        });
        console.log(JSON.stringify(userObject));
        if (!response.ok) throw new Error(response.statusText);
        const serverMessage = await response.json;
        console.log(serverMessage);
      } catch (reason) {
        console.log("reason: ", reason);
        return;
      }
    }

    function addCourseToDataObject() {
      let splitedSelect = selectedCourse.value.split(":");
      for (let i = 0; i < state.allCourses.length; i++) {
        if (state.allCourses[i].id == parseInt(splitedSelect[1])) {
          selectedCourseObject.push(state.allCourses[i]);
        }
      }
    }
    return {
      date,
      userObject,
      subjectName,
      sendTeacher,
      selectedCourse,
      state,
      courseArray,
      addCourseToDataObject,
    };
  },
});
</script>
