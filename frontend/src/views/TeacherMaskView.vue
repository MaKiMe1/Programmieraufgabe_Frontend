<template>
  <div class="TeacherMask">
    <h1>Lehrer erstellen</h1>
    <InputText type="text" placeholder="Vorname"></InputText>
    <InputText type="text" placeholder="Nachname"></InputText>
  </div>
  <br />
  <div>
    <InputText type="text" placeholder="Kurse"></InputText>
  </div>
  <br />
  <div>
    <InputText type="text" placeholder="Fächer"></InputText>
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
import Dropdown from "primevue/dropdown";

export default defineComponent({
  name: "TeacherMaskView",
  components: {
    Button,
    InputText,
  },
  setup() {
    return {};
  },
});
</script>
