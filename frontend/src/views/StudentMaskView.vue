<template>
  <div class="StudentMask">
    <h1>Schüler erstellen</h1>
    <InputText type="text" placeholder="Vornamen"></InputText>
  </div>
  <div class="StudentMask">
    <InputText type="text" placeholder="Nachnamen"></InputText>
  </div>
  <br />
  <div>
    <InputText type="text" placeholder="Kurse"></InputText>
  </div>
  <br />
  <div>
    <Dropdown placeholder="Wähle einen Kurs" class="w-full md:w-14rem" />
  </div>
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
  name: "StudentMaskView",
  components: {
    Button,
    InputText,
    Dropdown,
  },
  setup() {
    return {};
  },
});
</script>
