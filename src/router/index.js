import { createRouter, createWebHistory } from "vue-router";
import NavbarMain from '../components/NavbarMain.vue'
import NavbarSecondary from '../components/NavbarSecondary.vue'
import LoginView from "../views/LoginView.vue";
import SignupView from "../views/SignupView.vue";
import HomeView from '../views/HomeView.vue'
import AccountView from '../views/AccountView.vue'
import PetsRegisteredView from '../views/PetsRegisteredView.vue'
import RegisterNewPetView from '../views/RegisterNewPetView.vue'

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
      path: "/",
      name: "Home",
      components: {
        header: NavbarMain,
        default: HomeView
      }
    },
    {
      path: "/adoptions",
      name: "Minhas adoções",
      components: {
        header: NavbarMain
      }
      //component: HomeView,
    },
    {
      path: "/pets",
      name: "Meus pets cadastrados",
      components: {
        header: NavbarMain,
        default: PetsRegisteredView
      }
      //component: HomeView,
    },
    {
      path: "/account",
      name: "Configurações da conta",
      components: {
        header: NavbarMain,
        default: AccountView
      }
      //component: HomeView,
    },
    {
      path: '/register-pet',
      name: "Registrar novo pet",
      components: {
        header: NavbarSecondary,
        default: RegisterNewPetView
      }
    }

    

    
  ]
});

export default router;
