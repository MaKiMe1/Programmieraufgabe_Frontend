<template>
  <Toast />
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
      :options="state.allCourses"
      optionLabel="title"
      optionValue="id"
      :virtualScrollerOptions="{ itemSize: 38 }"
      placeholder="Kurs"
      class="w-full md:w-14rem"
    />
  </div>
  <br />

  <div>
    <Calendar
      v-model="userObject.birthDate"
      dateFormat="dd/mm/yy"
      placeholder="Geburtstag"
    />
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
import { defineComponent, ref, reactive } from "vue";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Calendar from "primevue/calendar";
import Dropdown from "primevue/dropdown";
import { userObject } from "@/dataObjects/userObject";
import { courseObject } from "@/dataObjects/courseObject";
import { state } from "@/components/state";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";

export default defineComponent({
  name: "TeacherMaskView",
  components: {
    Button,
    InputText,
    Calendar,
    Dropdown,
    Toast,
  },
  setup() {
    const date = ref();
    const subjectName = ref();
    const selectedCourse = ref();
    const courseArray: string[] = [];
    const toast = useToast();
    let selectedCourseObject: courseObject[] = [];

    let userObject = reactive<userObject>({
      id: 0,
      name: "",
      surname: "",
      birthDate: date.value,
      courses: [],
      teacher: true,
      grade: 0,
      subjects: [],
    });

    async function sendTeacher(): Promise<void> {
      addCourseToDataObject();
      userObject.courses = selectedCourseObject;
      userObject.subjects.push(subjectName.value);
      try {
        const response = await fetch("/user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userObject),
        });
        console.log(JSON.stringify(userObject));
        if (!response.ok) {
          const serverMessage = await response.json;
          console.log(serverMessage);
          toast.add({
            severity: "error",
            summary: "Error",
            detail: "Could not add teacher",
            life: 3000,
          });
          throw new Error(response.statusText);
        } else {
          toast.add({
            severity: "success",
            summary: "Success",
            detail: "Teacher added successfully",
            life: 3000,
          });
        }
      } catch (reason) {
        console.log("reason: ", reason);
        return;
      }
    }

    function addCourseToDataObject() {
      for (let i = 0; i < state.allCourses.length; i++) {
        if (state.allCourses[i].id == selectedCourse.value) {
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
