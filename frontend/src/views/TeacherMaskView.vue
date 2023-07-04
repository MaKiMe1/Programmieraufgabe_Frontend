<template>
  <div class="TeacherMask">
    <h1>Lehrer erstellen</h1>
    <InputText v-model="name" type="text" placeholder="Vorname"></InputText>
    <InputText v-model="surname" type="text" placeholder="Nachname"></InputText>
  </div>
  <br />
  <div>
    <InputText type="text" placeholder="Kurse"></InputText>
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
import { defineComponent, ref, reactive } from "vue";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";
import Calendar from "primevue/calendar";
import { userObject } from "@/dataObjects/userObject";

export default defineComponent({
  name: "TeacherMaskView",
  components: {
    Button,
    InputText,
    Calendar,
  },
  setup() {
    const date = ref();
    const name = ref();
    const surname = ref();
    const subjectName = "";
    let subjectsSplit = [];
    subjectsSplit = subjectName.split(" ");
    const userObject = reactive<userObject>({
      id: 0,
      name: name.value,
      surname: surname.value,
      birthDate: date.value,
      courses: [],
      isTeacher: true,
      grade: 0,
      subjects: subjectsSplit,
    });

    async function sendTeacher(): Promise<void> {
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
    return { date, userObject, subjectName, name, surname, sendTeacher };
  },
});
</script>
