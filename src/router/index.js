import { createRouter, createWebHistory } from "vue-router";
import NavbarMain from '../components/NavbarMain.vue'
import NavbarSecondary from '../components/NavbarSecondary.vue'
import LoginView from "../views/LoginView.vue";
import SignupView from "../views/SignupView.vue";
import HomeView from '../views/HomeView.vue'
import AccountView from '../views/AccountView.vue'
import PetsRegisteredView from '../views/PetsRegisteredView.vue'
import AdoptionsListView from '../views/AdoptionsListView.vue'
import PetFormView from '../views/PetFormView.vue'
import PetDetailView from '../views/PetDetailView.vue'

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
        header: NavbarMain,
        default: AdoptionsListView
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
        default: PetFormView
      }
    },

    {
      path: '/edit-pet/:id',
      name: "Editar pet",
      components: {
        header: NavbarSecondary,
        default: PetFormView
      },
      props: { default: true, sidebar: false }
    },
    {
      path: '/pet-detail/:id',
      name: "Detalhes do pet",
      components: {
        header: NavbarSecondary,
        default: PetDetailView
      },
      props: { default: true, sidebar: false }
    }

  ]
});

export default router;
