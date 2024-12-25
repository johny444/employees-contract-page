import { createRouter, createWebHistory } from "vue-router/auto";
import { setupLayouts } from "virtual:generated-layouts";
import { routes } from "vue-router/auto-routes"; // Auto-generated routes
import TeacherLayout from "@/layouts/teacherlayout.vue";
import StudentLayout from "@/layouts/studentlayout.vue";

const routesWithMeta = routes.map((route) => {
  // Assign layouts based on route path
  if (
    route.path.startsWith("/dashboard") ||
    route.path.startsWith("/class") ||
    route.path.startsWith("/exam") ||
    route.path.startsWith("/result")
  ) {
    route.meta = {
      ...(route.meta || {}),
      requiresAuth: false,
      layout: TeacherLayout, // Assign teacher layout
    };
  }
  // else if (
  //   route.path.startsWith("/quiz") ||
  //   route.path.startsWith("/question") ||
  //   route.path.startsWith("/result-student")
  // ) {
  //   route.meta = {
  //     ...(route.meta || {}),
  //     requiresAuth: true,
  //     layout: StudentLayout, // Assign student layout
  //   };
  // }

  // // Handle child routes
  // if (route.children && route.children.length) {
  //   route.children = route.children.map((childRoute) => {
  //     // Explicitly handle `/quiz/:question` child route
  //     if (route.path.startsWith("/quiz") && childRoute.path === ":question") {
  //       childRoute.meta = {
  //         ...(childRoute.meta || {}),
  //         requiresAuth: true,
  //         layout: null, // Explicitly remove layout
  //       };
  //     } else {
  //       childRoute.meta = {
  //         ...(childRoute.meta || {}),
  //         requiresAuth: true,
  //         layout: route.meta.layout, // Inherit layout from parent
  //       };
  //     }
  //     return childRoute;
  //   });
  // }

  return route;
});

const routesWithCatchAll = [
  ...setupLayouts(routesWithMeta),
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: () => import("@/pages/404.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(routesWithCatchAll),
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !localStorage.getItem("token")) {
    next("/"); // Redirect to login if not authenticated
  } else {
    next(); // Proceed to route
  }
});

router.onError((err, to) => {
  if (err?.message?.includes?.("Failed to fetch dynamically imported module")) {
    if (!localStorage.getItem("vuetify:dynamic-reload")) {
      console.log("Reloading page to fix dynamic import error");
      localStorage.setItem("vuetify:dynamic-reload", "true");
      location.assign(to.fullPath);
    } else {
      console.error("Dynamic import error, reloading page did not fix it", err);
    }
  } else {
    console.error(err);
  }
});

router.isReady().then(() => {
  localStorage.removeItem("vuetify:dynamic-reload");
});

export default router;
