<template>
  <div class="Kursübersicht">
    <h1>Kursübersicht</h1>
    <VirtualScroller
      :items="allCourses"
      :itemSize="50"
      class="border-1 surface-border border-round"
      style="width: 200px; height: 200px"
    >
      <template v-slot:item="{ item }">
        <Card>
          <template #title>{{ item.title }}</template>
          <template #content>
            <p>{{ item.description }}</p></template
          >
          <template #footer>
            <!-- <Button @click="showCourse(item)">Show</Button> -->
          </template>
        </Card>
      </template>
    </VirtualScroller>
    <Button @click="getCourses">Refresh</Button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
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

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const jsonData: courseObject[] = await response.json();
    allCourses.value = jsonData;
  } catch (reason) {
    ausgabe.value = `${reason}`;
  }
}

// function showCourse(course: courseObject): void {

// }

onMounted(async () => {
  await getCourses();
});

export default defineComponent({
  name: "CourseView",
  components: {
    VirtualScroller,
    Button,
    Card,
  },
  setup() {
    return {
      onMounted,
      allCourses,
      ausgabe,
      getCourses,
      // showCourse,
    };
  },
});
</script>
