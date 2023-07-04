<template>
  <div class="course">
    import Panel from "primevue/panel";
    <Panel header="Title">
      <p></p>
    </Panel>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Panel from "primevue/panel";

export default defineComponent({
  name: "CourseView",
  components: {
    Panel,
  },
});
</script>
