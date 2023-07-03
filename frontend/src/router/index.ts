import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CourseView from "../views/CourseView.vue";


const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
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
    path: "/course",
    name: "course",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: CourseView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
