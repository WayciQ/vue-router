import Vue from "vue";
import VueRouter from "vue-router";
import { store } from "../store";
import Home from "../views/Home.vue";
// import Brazil from "../views/Brazil.vue";
// import Hawaii from "../views/Hawaii.vue";
// import Jamaica from "../views/Jamaica.vue";
// import Panama from "../views/Panama.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    props: true,
  },
  // {
  //   path: "/brazil",
  //   name: "brazil ",
  //   component: () => import(/* webpackChunkName: "brazil" */ "../views/Brazil"),
  // },
  // {
  //   path: "/hawaii",
  //   name: "hawaii ",
  //   component: () => import(/* webpackChunkName: "hawaii" */ "../views/Hawaii"),
  // },
  // {
  //   path: "/jamaica",
  //   name: "jamaica ",
  //   component: () =>
  //     import(/* webpackChunkName: "jamaica" */ "../views/Jamaica"),
  // },
  // {
  //   path: "/panama",
  //   name: "panama ",
  //   component: () => import(/* webpackChunkName: "panama" */ "../views/Panama"),
  // },
  {
    path: "/destination/:slug",
    name: "DestinationDetails",
    props: true,
    component: () =>
      import(
        /* webpackChunkName: "DestinationDetails" */ "../views/DestinationDetails"
      ),
    children: [
      {
        path: ":experienceSlug",
        name: "ExperienceDetails",
        props: true,
        component: () =>
          import(
            /* webpackChunkName: "ExperienceDetails" */ "../views/ExperienceDetails"
          ),
      },
    ],
    beforeEnter: (to, from, next) => {
      const exitsts = store.destinations.find(
        (destination) => destination.slug === to.params.slug
      );
      if (exitsts) {
        next();
      } else {
        next({ name: "NotFound" });
      }
    },
  },
  {
    path: "/user",
    name: "User",
    component: () => import(/* webpackChunkName: "User" */ "../views/User"),
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import(/* webpackChunkName: "Login" */ "../views/Login"),
  },
  {
    path: "/invoices",
    name: "Invoices",
    component: () =>
      import(/* webpackChunkName: "Invoices" */ "../views/Invoices"),
    meta: { requiresAuth: true },
  },
  {
    path: "/404",
    alias: "*",
    name: "NotFound",
    component: () =>
      import(/* webpackChunkName: "notFound" */ "../views/NotFound"),
  },
];

const router = new VueRouter({
  mode: "history",
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      const position = {};
      if (to.hash) {
        position.selector = to.hash;
        if (to.hash === "#experiences") {
          position.offset = { y: 150 };
        }
        if (document.querySelector(to.hash)) {
          return position;
        }
        return false;
      }
    }
  },
  linkExactActiveClass: "vue-active-class",
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!window.localStorage.getItem("user")) {
      next({
        name: "Login",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
