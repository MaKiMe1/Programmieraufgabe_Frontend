<template>
  <div v-if="props.courseIndex != undefined" class="course">
    <Panel :header="course.title">
      <p>
        {{ course.description }}
      </p>
      <p>Startzeit: {{ course.startTime }} | Endzeit: {{ course.endTime }}</p>
      <br />
      Kategorie: {{ course.category }}
      <br />
      Lehrer: {{ course.teacher.name }} {{ course.teacher.surname }}
      <br />
      Schüler:
      <span v-for="s in course.students" :key="s.id">
        <span>{{ s.name }} {{ s.surname }}</span>
      </span>
    </Panel>
    <span>
      Ändere Lehrer:
      <Dropdown
        v-model="currentTeacher"
        :options="allTeachers"
        option-label="name"
        option-value="id"
        placeholder="Lehrer"
        class="w-full md:w-14rem"
      />
      <Button @click="saveTeacher()">Speichern</Button></span
    >
    <span>
      Füge Schüler hinzu:
      <Dropdown
        v-model="currentStudent"
        :options="allStudents"
        option-label="name"
        option-value="id"
        placeholder="Schüler"
        class="w-full md:w-14rem"
      /><Button @click="saveStudent()">Speichern</Button></span
    >
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import Panel from "primevue/panel";
import Button from "primevue/button";
import Dropdown from "primevue/dropdown";
import { state } from "@/components/state";
import { userObject } from "@/dataObjects/userObject";
import { useToast } from "primevue/usetoast";
import { getCourses } from "@/components/state";
import { courseObject } from "@/dataObjects/courseObject";

const toast = useToast();

//props for current course
interface Props {
  courseIndex: number;
}
const props = defineProps<Props>();
const course = state.allCourses[props.courseIndex];

const currentTeacher = ref();
const currentStudent = ref();

const allStudents = ref<userObject[]>();
const allTeachers = ref<userObject[]>();

async function getTeachers(): Promise<void> {
  try {
    const url = "/user/teachers";
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const jsonData: userObject[] = await response.json();
    allTeachers.value = jsonData;
  } catch (reason) {
    return;
  }
}

async function getStudents(): Promise<void> {
  try {
    const url = "/user/students";
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const jsonData: userObject[] = await response.json();
    allStudents.value = jsonData;
  } catch (reason) {
    return;
  }
  course.students.forEach((s) => {
    allStudents.value?.filter((e) => {
      return e.id != s.id;
    });
  });
}

let teacher = reactive<userObject>({
  id: 0,
  name: "",
  surname: "",
  birthDate: new Date(0),
  courses: [],
  teacher: false,
  grade: 0,
  subjects: [],
});

async function saveTeacher(): Promise<void> {
  teacher.id = currentTeacher.value;
  console.log(teacher.id);
  try {
    const url = "/course/" + course.id + "/teacher";
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: currentTeacher.value }),
    });

    if (!response.ok) {
      toast.add({
        severity: "error",
        summary: "Error",
        detail: "Error saving teacher",
        life: 3000,
      });
      throw new Error(response.statusText);
    } else {
      toast.add({
        severity: "success",
        summary: "Success",
        detail: "Teacher updated successfully",
        life: 3000,
      });
    }
  } catch (reason) {
    return;
  }
  getCourses();
}

async function saveStudent(): Promise<void> {
  try {
    const url = "/course/" + course.id + "/student";
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Object: { id: currentStudent.value } }),
    });

    if (!response.ok) {
      toast.add({
        severity: "error",
        summary: "Error",
        detail: "Error saving student",
        life: 3000,
      });
      throw new Error(response.statusText);
    } else {
      toast.add({
        severity: "success",
        summary: "Success",
        detail: "Student added successfully",
        life: 3000,
      });
    }
  } catch (reason) {
    return;
  }
  getCourses();
}

onMounted(async () => {
  await getTeachers();
  await getStudents();
});
</script>
