import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Dashboard from "../views/Dashboard.vue";
import Barangays from "../views/Barangays.vue";
import Records from "../views/Records.vue";
import Users from "../views/users.vue";
import Notifications from "../views/Notifications.vue";
import Transactions from "../views/Transactions.vue";
import PageNotFound from "../views/PageNotFound.vue";
import PageContent from "../views/PageContent.vue";
import HomeMobile from "../views/HomeMobile.vue";
import DinfoMobile from "../views/DinfoMobile.vue";
import ViewContentMobile from "../views/ViewContentMobile.vue";
import MyLocation from "../views/ViewYourLocation.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login
  },
  {
    path: "/admin",
    name: "Dashboard",
    component: Dashboard
  },
  {
    path: "/logout",
    name: "Logout"
  },
  {
    path: "/barangay",
    name: "Barangay",
    component: Barangays
  },
  {
    path: "/records",
    name: "Records",
    component: Records
  },
  {
    path: "/users",
    name: "Users",
    component: Users
  },
  {
    path: "/notifications",
    name: "Notifications",
    component: Notifications
  },
  {
    path: "/transactions",
    name: "Transactions",
    component: Transactions
  },
  {
    path: "/pagecontent",
    name: "PageContent",
    component: PageContent
  },
  {
    path: "/mobile-home",
    name: "HomeMobile",
    component: HomeMobile
  },
  {
    path: "/mobile-dinfo/:type",
    name: "DinfoMobile",
    component: DinfoMobile,
    props: true
  },
  {
    path: "/mobile-dinfo-view/:id",
    name: "ViewContentMobile",
    component: ViewContentMobile,
    props: true
  },
  {
    path: "/mobile-mylocation",
    name: "MyLocation",
    component: MyLocation
  },
  {
    path: "*",
    component: PageNotFound
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = sessionStorage.getItem("usercredentials");

  const mobilePages = [
    "HomeMobile",
    "DinfoMobile",
    "ViewContentMobile",
    "MyLocation"
  ];

  if (to.name !== "Login" && !isAuthenticated) {
    if (mobilePages.includes(to.name)) {
      next();
    } else {
      next({ name: "Login" });
    }
  } else if (to.name === "Login" && isAuthenticated) {
    next({ name: "Dashboard" });
  }

  if (to.name === "Logout") {
    sessionStorage.removeItem("usercredentials");
    next({ name: "Login" });
  } else {
    next();
  }
});

export default router;
