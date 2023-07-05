<template>
  <div v-if="props.courseIndex != undefined" class="course">
    <Panel :header="state.allCourses[props.courseIndex].title"> </Panel>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref } from "vue";
import Panel from "primevue/panel";
import { state } from "@/components/state";
import { useRoute } from "vue-router";

interface Props {
  courseIndex: number;
}

const props = defineProps<Props>();

// index.value = parseInt(route.params.id);

// export default defineComponent({
//   name: "CourseView",
//   components: {
//     Panel,
//   },
//   setup() {
//     return {
//       state,
//       index,
//       route,
//     };
//   },
//   props: {
//     courseIndex: Number,
//   },
// });
</script>
