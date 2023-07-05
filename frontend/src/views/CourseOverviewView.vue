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
    <Button @click="getCourses">Refresh</Button>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import Button from "primevue/button";
import Card from "primevue/card";
import VirtualScroller from "primevue/virtualscroller";
import { state } from "@/components/state";
import { getCourses } from "@/components/state";

onMounted(async () => {
  await getCourses();
});
</script>
