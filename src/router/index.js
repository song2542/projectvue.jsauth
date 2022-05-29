import { createWebHistory, createRouter } from "vue-router";
import { auth } from '../Firebase'
import CreateStudent from "@/components/CreateStudent.vue";
import EditStudent from "@/components/EditStudent.vue";
import ListStudent from "@/components/ListStudent.vue";
import WelcomeForm from "@/components/WelcomeForm.vue";
import LoginComponent from "@/components/LoginComponent.vue";
import RegisterComponent from "@/components/RegisterComponent.vue"
import CreateCompany from "@/components/CreateCompany.vue"
import ListCompany from "@/components/ListCompany.vue"
import EditCompany from "@/components/EditCompany.vue"
import CalendarView from "@/components/Calendar/CalendarView.vue"
import AdminCompany from "@/components/AdminCompany.vue"
import AdminStudent from "@/components/AdminStudent.vue"
import CompanyViewDetails from "@/components/ViewDetailsCompany.vue"
import AdminHandle from "@/components/AdminHandle.vue"
import RegisterteacherComponent from "@/components/RegisterteacherComponent.vue"
import uploadComponent from "@/components/uploadComponent.vue"
const routes = [
  {
    path: "/",
    name: "home",
    component: WelcomeForm,
  },
  {
    path: "/StudentForm",
    name: "StudentForm",
    component: CreateStudent,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/StudentView",
    name: "StudentView",
    component: ListStudent,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/EditStudent/:studentDataId",
    name: "EditStudent",
    component: EditStudent,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/Login",
    name: "Login",
    component : LoginComponent,
    
  },
  {
    path: "/Register",
    name: "Register",
    component : RegisterComponent
  },
  {
    path: "/CompanyView",
    name: "CompanyView",
    component : ListCompany,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/CompanyViewDetails/:companyDataId",
    name: "CompanyViewDetails",
    component : CompanyViewDetails
  },
  {
    path: "/CompanyForm",
    name: "CompanyForm",
    component : CreateCompany,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/EditCompany/:companyDataId",
    name: "EditCompany",
    component : EditCompany
  },
  {
    path: "/CalendarView",
    name: "CalendarView",
    component : CalendarView

  },
  {
    path: "/AdminCompany",
    name: "AdminCompany",
    component : AdminCompany
  },
  {
    path: "/AdminStudent",
    name: "AdminStudent",
    component : AdminStudent
  },
  {
    path: "/AdminHandle",
    name: "AdminHandle",
    component : AdminHandle
  },
  {
    path: "/Registerteacher",
    name: "Registerteacher",
    component : RegisterteacherComponent
  },
  {
    path: "/upload",
    name: "upload",
    component : uploadComponent,
   
  },
  
 
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path === '/login' && auth.currentUser) {
    next('/')
    return;
  }

  if (to.matched.some(record => record.meta.requiresAuth) && !auth.currentUser) {
    next('/')
    return;
  }

  next();
})

export default router;