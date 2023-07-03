<template>
  <div class="Course">
    <h1>HALLo</h1>
    <Button type="button"></Button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CourseMask from "@/components/CoursMask.vue"; // @ is an alias to /src

export default defineComponent({
  name: "HomeView",
  components: {
    CourseMask,
  },
});
</script>
