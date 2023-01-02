import { createRouter, createWebHistory } from "vue-router";
import Navbar from '../components/Navbar.vue'
import LoginView from "../views/LoginView.vue";
import SignupView from "../views/SignupView.vue";
import HomeView from '../views/HomeView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "Login",
      component: LoginView,
    },
    {
      path: "/signup",
      name: "Cadastro",
      component: SignupView,
    },
    {
      path: "/home",
      name: "Home",
      components: {
        header: Navbar,
        default: HomeView
      },
    },
    {
      path: "/adoptions",
      name: "Minhas adoções",
      components: {
        header: Navbar
      }
      //component: HomeView,
    },
    {
      path: "/pets",
      name: "Meus pets cadastrados",
      components: {
        header: Navbar
      }
      //component: HomeView,
    },
    {
      path: "/account",
      name: "Configurações da conta",
      components: {
        header: Navbar
      }
      //component: HomeView,
    }
  ]
});

export default router;
