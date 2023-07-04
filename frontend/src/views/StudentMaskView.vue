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
      v-model="userObject.courses"
      placeholder="Wähle einen Kurs"
      class="w-full md:w-14rem"
    />
  </div>
  <br />
  <div>
    <Calendar v-model="date" dateFormat="dd/mm/yy" placeholder="Geburtstag" />
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
    const userObject = reactive<userObject>({
      id: 0,
      name: "",
      surname: "",
      grade: 0,
      birthDate: date.value,
      courses: [],
      isTeacher: false,
      subjects: [],
    });

    async function sendStudent(): Promise<void> {
      fetch("/user", {
        method: "POST",
        body: JSON.stringify(userObject),
      }).then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
      });
    }

    function yourFunction() {
      console.log("hi");
      console.log(userObject.name);
      setTimeout(yourFunction, 5000);
    }

    yourFunction();

    return { date, name, surname, course, grade, userObject, sendStudent };
  },
});
</script>
