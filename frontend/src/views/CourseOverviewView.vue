<template>
  <div class="Kursübersicht">
    <h1>Kursübersicht</h1>
    <VirtualScroller
      :items="state.allCourses"
      :itemSize="100"
      class="border-1 surface-border border-round"
      style="width: 1600px; height: 1000px"
    >
      <template v-slot:item="{ item }">
        <router-link :to="{ name: 'course', params: { id: item.id - 1 } }">
          <Card>
            <template #title>{{ item.title }}</template>
            <template #content>
              <p>{{ item.description }}</p></template
            >
            <template #footer> </template>
          </Card>
        </router-link>
      </template>
    </VirtualScroller>
    <div>
      <Toast />
      <div>
        <Button @click="showInfo()">Refresh</Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import Button from "primevue/button";
import Card from "primevue/card";
import VirtualScroller from "primevue/virtualscroller";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
import { state } from "@/components/state";
import { getCourses } from "@/components/state";

const toast = useToast();
const showInfo = () => {
  toast.add({
    severity: "info",
    summary: "Refreshed",
    detail: "Updated",
    life: 3000,
  });
};

onMounted(async () => {
  await getCourses();
});
</script>
