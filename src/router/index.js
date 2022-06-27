import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";
import Favourites from "../views/Favourites.vue";
import MovieDetails from "../views/MovieDetails.vue";
import LoginPage from "../views/LoginPage.vue"
import RegisterPage from "../views/RegisterPage.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/favourites",
      name: "favourites",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Favourites,
    },
    {
      path: "/login",
      name: "login",
      component: LoginPage,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterPage,
    },
    // eslint-disable-next-line prettier/prettier
      { path: '/movies/:id', name:"MovieDetails", component: MovieDetails },
    
  ],
});

export default router;
