<template>
  <div class="Kursübersicht">
    <h1>Kursübersicht</h1>
    <VirtualScroller
      :items="state.allCourses"
      :itemSize="50"
      class="border-1 surface-border border-round"
      style="width: 200px; height: 200px"
    >
      <template v-slot:item="{ item }">
        <router-link :to="{ name: 'course', params: { id: item.id - 1 } }">
          <Card>
            <template #title>{{ item.title }}</template>
            <template #content>
              <p>{{ item.description }}</p></template
            >
            <template #footer>
              <!-- <Button @click="showCourse(item.id)">Show</Button> -->
            </template>
          </Card>
        </router-link>
      </template>
    </VirtualScroller>
    <div>
      <Toast />
      <div>
        <Button
          @click="
            getCourses();
            showInfo();
          "
          >Refresh</Button
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { courseObject } from "@/dataObjects/courseObject";
import Button from "primevue/button";
import Card from "primevue/card";
import VirtualScroller from "primevue/virtualscroller";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
import { state } from "@/components/state";
// import { useRouter } from "vue-router";

async function getCourses(): Promise<void> {
  try {
    const url = "/course";
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const jsonData: courseObject[] = await response.json();
    state.allCourses = jsonData;
  } catch (reason) {
    return;
  }
  showInfo();
}

const toast = useToast();
const showInfo = () => {
  toast.add({
    severity: "info",
    summary: "Refreshed",
    detail: "Updated",
    life: 3000,
  });
};

// const router = useRouter();

// function showCourse(id: Number): void {
//   router.push({
//     path: "/kurs",
//     params: {
//       id
//     },
//   });
// }

onMounted(async () => {
  await getCourses();
});

// export default defineComponent({
//   name: "CourseOverviewView",
//   components: {
//     VirtualScroller,
//     Button,
//     Card,
//   },
//   setup() {
//     return {
//       onMounted,
//       getCourses,
//       showCourse,
//       state,
//       router,
//       useRouter,
//     };
//   },
// });
</script>
