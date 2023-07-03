<template>
  <div class="Course">
    <h1>Kurs erstellen</h1>
    <InputText type="text" placeholder="Titel"></InputText>
  </div>
  <br />
  <div>
    <Textarea rows="5" cols="30" placeholder="Beschreibung"></Textarea>
  </div>
  <br />
  <div>
    <Calendar
      id="calendar-start"
      placeholder="Startzeit"
      v-model="timeStart"
      timeOnly
    />
    <Calendar
      id="calendar-end"
      placeholder="Endzeit"
      v-model="timeEnd"
      timeOnly
    />
  </div>
  <br />
  <div class="Course">
    <InputText type="text" placeholder="Kategorie"></InputText>
  </div>
  <br />
  <div class="Course">
    <InputText type="text" placeholder="Lehrer  "></InputText>
  </div>
  <br />
  <div>
    <Listbox
      :options="cities"
      v-model="selectedCity"
      optionLabel="name"
      class="w-full md:w-14rem"
      multiple
    />
  </div>
  <br />
  <div>
    <Button label="Press">Press</Button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import Calendar from "primevue/calendar";
import Listbox from "primevue/listbox";

export default defineComponent({
  name: "CourseView",
  components: {
    Button,
    InputText,
    Textarea,
    Calendar,
    Listbox,
  },
  setup() {
    const timeStart = ref();
    const timeEnd = ref();
    const selectedCity = ref();
    const cities = ref([
      { name: "New York", code: "NY" },
      { name: "Rome", code: "RM" },
      { name: "London", code: "LDN" },
      { name: "Istanbul", code: "IST" },
      { name: "Paris", code: "PRS" },
    ]);
    return {
      timeStart,
      timeEnd,
      cities,
      selectedCity,
    };
  },
});
</script>
