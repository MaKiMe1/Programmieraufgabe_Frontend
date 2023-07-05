<template>
  <div class="StudentMask">
    <h1>Schüler erstellen</h1>
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
    <InputNumber
      v-model="userObject.grade"
      type="number"
      placeholder="Klasse"
    ></InputNumber>
  </div>
  <br />
  <div>
    <Dropdown
      v-model="selectedCourse"
      :options="state.allCourses"
      optionLabel="title"
      optionValue="id"
      :virtualScrollerOptions="{ itemSize: 38 }"
      placeholder="Select Item"
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
    <Button @click="sendStudent" label="Press">Press</Button>
  </div>
</template>

<script lang="ts">
import { defineComponent, defineProps, reactive, ref } from "vue";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";
import Calendar from "primevue/calendar";
import InputNumber from "primevue/inputnumber";
import { userObject } from "@/dataObjects/userObject";
import { courseObject } from "@/dataObjects/courseObject";
import { state } from "@/components/state";

export default defineComponent({
  name: "StudentMaskView",
  components: {
    Button,
    InputText,
    Dropdown,
    Calendar,
    InputNumber,
  },
  setup() {
    const date = ref();
    const name = ref();
    const surname = ref();
    const course = ref();
    const grade = ref();
    const selectedCourse = ref();
    let selectedCourseObject: courseObject[] = [];
    let userObject = reactive<userObject>({
      id: 0,
      name: "",
      surname: "",
      birthDate: date.value,
      courses: [],
      teacher: false,
      grade: 0,
      subjects: [],
    });

    async function sendStudent(): Promise<void> {
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
      for (let i = 0; i < state.allCourses.length; i++) {
        if (state.allCourses[i].id == selectedCourse.value) {
          selectedCourseObject.push(state.allCourses[i]);
        }
      }
    }

    return {
      date,
      name,
      surname,
      course,
      grade,
      userObject,
      selectedCourse,
      state,
      sendStudent,
    };
  },
});
</script>
