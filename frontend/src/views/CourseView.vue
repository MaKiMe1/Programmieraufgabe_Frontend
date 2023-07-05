<template>
  <div v-if="course != undefined" class="course">
    <Panel :header="course.title">
      <p>
        {{ course.description }}
      </p>
      <p>Startzeit: {{ course.startTime }} | Endzeit: {{ course.endTime }}</p>
      <br />
      Kategorie: {{ course.category }}
      <br />
      Lehrer:
      <span v-if="course.teacher != undefined"
        >{{ course.teacher.name }} {{ course.teacher.surname }}</span
      >
      <br />
      Schüler:
      <span v-for="s in course.students" :key="s.id">
        <span>{{ s.name }} {{ s.surname }}</span
        ><br />
      </span>
    </Panel>
    <Toast />
    <span>
      Ändere Lehrer:
      <Dropdown
        v-model="currentTeacher"
        :options="state.allTeachers"
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
        :options="courseStudents"
        option-label="name"
        option-value="id"
        placeholder="Schüler"
        class="w-full md:w-14rem"
      /><Button @click="saveStudent()">Speichern</Button></span
    >
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import Panel from "primevue/panel";
import Button from "primevue/button";
import Dropdown from "primevue/dropdown";
import { state } from "@/components/state";
import { useToast } from "primevue/usetoast";
import Toast from "primevue/toast";
import { getCourses } from "@/components/state";
import { getStudents } from "@/components/state";
import { getTeachers } from "@/components/state";

const toast = useToast();

//props for current course
interface Props {
  courseIndex: number;
}
const props = defineProps<Props>();
const course = state.allCourses[props.courseIndex];

const currentTeacher = ref();
const currentStudent = ref();

const courseStudents = ref([...state.allStudents]);

watch(state.allStudents, () => {
  filterStudents();
});

//filter students that already are in the course
function filterStudents() {
  courseStudents.value = [...state.allStudents];
  course.students.forEach((s) => {
    courseStudents.value = courseStudents.value.filter((e) => e.id != s.id);
  });
}

async function saveTeacher(): Promise<void> {
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
      body: JSON.stringify({ id: currentStudent.value }),
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
  filterStudents();
});
</script>
