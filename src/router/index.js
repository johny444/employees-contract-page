// /**
//  * router/index.ts
//  *
//  * Automatic routes for `./src/pages/*.vue`
//  */

// // Composables auto import without requiresAuth
// import { createRouter, createWebHistory } from "vue-router/auto";
// import { setupLayouts } from "virtual:generated-layouts";
// import { routes } from "vue-router/auto-routes";

// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes: setupLayouts(routes),
// });

// // Workaround for https://github.com/vitejs/vite/issues/11804
// router.onError((err, to) => {
//   if (err?.message?.includes?.("Failed to fetch dynamically imported module")) {
//     if (!localStorage.getItem("vuetify:dynamic-reload")) {
//       console.log("Reloading page to fix dynamic import error");
//       localStorage.setItem("vuetify:dynamic-reload", "true");
//       location.assign(to.fullPath);
//     } else {
//       console.error("Dynamic import error, reloading page did not fix it", err);
//     }
//   } else {
//     console.error(err);
//   }
// });

// router.isReady().then(() => {
//   localStorage.removeItem("vuetify:dynamic-reload");
// });

// export default router;

import { createRouter, createWebHistory } from "vue-router/auto";
import { setupLayouts } from "virtual:generated-layouts";
import { routes } from "vue-router/auto-routes"; // Auto-generated routes

// Manually add `meta` to each route
const routesWithMeta = routes.map((route) => {
  // Check if the route is NOT the login route ("/")
  // console.log("route", route);
  if (route.path !== "/") {
    route.meta = { requiresAuth: true }; // Set requiresAuth for all routes except login
  }

  // Check for child routes and apply meta to them as well
  if (route.children && route.children.length) {
    route.children.forEach((childRoute) => {
      if (childRoute.path !== "/") {
        childRoute.meta = { requiresAuth: true };
      }
    });
  }

  return route;
});

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(routesWithMeta), // Pass the modified routes
});

// Global navigation guard to check for authentication
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
