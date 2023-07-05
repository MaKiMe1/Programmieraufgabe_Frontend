import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Übersicht",
    component: () => import("../views/CourseOverviewView.vue"),
  },
  {
    path: "/teacher",
    name: "teacher",
    component: () => import("../views/TeacherMaskView.vue"),
  },
  {
    path: "/Student",
    name: "student",
    component: () => import("../views/StudentMaskView.vue"),
  },
  {
    path: "/kurs/:id?",
    name: "course",
    component: () => import("../views/CourseView.vue"),
    props(route) {
      return {
        courseIndex: Number(route.params.id),
      };
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
