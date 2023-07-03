<template>
  <div class="Kursübersicht">
    <h1>Kursübersicht</h1>
    <VirtualScroller
      :items="allCourses"
      :itemSize="50"
      class="border-1 surface-border border-round"
      style="width: 200px; height: 200px"
    ></VirtualScroller>
    {{ ausgabe }} : Debug
    <Button @click="getCourses">refresh</Button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUpdated, ref } from "vue";
import { courseObject } from "@/dataObjects/courseObject";
import Button from "primevue/button";
import Card from "primevue/card";
import VirtualScroller from "primevue/virtualscroller";

const allCourses = ref<courseObject[]>();
const ausgabe = ref("test");

async function getCourses(): Promise<void> {
  try {
    const url = "/course";
    const response = await fetch(url);
    const ausgabe = ref("fetched");

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const jsonData: courseObject[] = await response.json();
    allCourses.value = jsonData;
  } catch (reason) {
    ausgabe.value = `${reason}`;
  }
}

onMounted(async () => {
  await getCourses();
});

export default defineComponent({
  name: "CourseView",
  components: {
    VirtualScroller,
  },
  setup() {
    return {
      onMounted,
      allCourses,
      ausgabe,
      getCourses,
    };
  },
});
</script>
