<template>
  <div class="coursemask">
    <h1>Kurs erstellen</h1>
    <InputText
      v-model="courseObject.title"
      type="text"
      placeholder="Titel"
    ></InputText>
  </div>
  <br />
  <div>
    <Textarea
      v-model="courseObject.description"
      rows="5"
      cols="30"
      placeholder="Beschreibung"
    ></Textarea>
  </div>
  <br />
  <div>
    <Calendar
      id="calendar-start"
      placeholder="Startzeit"
      v-model="courseObject.startTime"
      timeOnly
    />
    <Calendar
      id="calendar-end"
      placeholder="Endzeit"
      v-model="courseObject.endTime"
      timeOnly
    />
  </div>
  <br />
  <div class="Course">
    <InputText
      v-model="courseObject.category"
      type="text"
      placeholder="Kategorie"
    ></InputText>
  </div>
  <br />
  <div>
    <Dropdown
      v-model="selectedTeacher"
      :options="state.allTeachers"
      optionLabel="name"
      optionValue="id"
      :virtualScrollerOptions="{ itemSize: 38 }"
      placeholder="Lehrer"
      class="w-full md:w-14rem"
    />
  </div>
  <br />
  <div>
    <Dropdown
      v-model="selectedStudent"
      :options="state.allStudents"
      optionLabel="name"
      optionValue="id"
      :virtualScrollerOptions="{ itemSize: 38 }"
      placeholder="Schüler"
      class="w-full md:w-14rem"
    />
  </div>
  <br />
  <div class="card flex justify-content-center">
    <Toast />
    <div class="flex flex-wrap gap-2">
      <Button @click="sendCourse()">Send</Button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from "vue";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import Calendar from "primevue/calendar";
import Dropdown from "primevue/dropdown";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
import { courseObject } from "@/dataObjects/courseObject";
import { userObject } from "@/dataObjects/userObject";
import { state } from "@/components/state";
import { getTeachers } from "@/components/state";
import { getStudents } from "@/components/state";

export default defineComponent({
  name: "CourseMaskView",
  components: {
    Button,
    InputText,
    Textarea,
    Calendar,
    Dropdown,
    Toast,
  },
  setup() {
    const timeStart = ref();
    const timeEnd = ref();
    const selectedStudent = ref();
    const selectedTeacher = ref();
    const teacher = ref();
    const toast = useToast();
    let selectedStudentObject: userObject[] = [];
    let courseObject = reactive<courseObject>({
      id: 0,
      title: "",
      description: "",
      startTime: timeStart.value,
      endTime: timeEnd.value,
      category: "",
      teacher: teacher.value,
      students: [],
    });

    async function sendCourse(): Promise<void> {
      addStudentToDataObject();
      addTeacherToDataObject();
      courseObject.students = selectedStudentObject;
      try {
        const response = await fetch("/course", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(courseObject),
        });
        console.log(JSON.stringify(courseObject));
        if (!response.ok) {
          const serverMessage = await response.json;
          console.log(serverMessage);
          toast.add({
            severity: "error",
            summary: "Error",
            detail: "Could not add course",
            life: 3000,
          });
          throw new Error(response.statusText);
        } else {
          toast.add({
            severity: "success",
            summary: "Success",
            detail: "Course added successfully",
            life: 3000,
          });
        }
      } catch (reason) {
        console.log("reason: ", reason);
        return;
      }
    }

    function addStudentToDataObject() {
      for (let i = 0; i < state.allStudents.length; i++) {
        if (state.allStudents[i].id == selectedStudent.value) {
          selectedStudentObject.push(state.allStudents[i]);
        }
      }
    }

    function addTeacherToDataObject() {
      for (let i = 0; i < state.allTeachers.length; i++) {
        if (state.allTeachers[i].id == selectedTeacher.value) {
          courseObject.teacher = state.allTeachers[i];
        }
      }
    }

    onMounted(async () => {
      await getStudents();
      await getTeachers();
    });

    return {
      timeStart,
      timeEnd,
      selectedStudent,
      state,
      courseObject,
      selectedTeacher,
      sendCourse,
    };
  },
});
</script>
