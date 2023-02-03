import store from "@/store";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        name : "HomePage",
        path : "/",
        component : () => import("@/views/Home")
    },
    {
        name : "LoginPage",
        path : "/login",
        component : () => import("@/views/Login")
    },
    {
        name : "RegisterPage",
        path : "/register",
        component : () => import("@/views/Register")
    },
    {
        name : "NewBookmarkPage",
        path : "/new",
        component : () => import("@/views/NewBookmark")
    }
]

 const router = createRouter({
    routes,
    history : createWebHistory()
})

router.beforeEach((to,from,next) => {
   const authRequiredRoutes = ["HomePage"];
   const authNotRequiredRoutes = ["LoginPage","RegisterPage"]
   const _isAuthenticated = store.getters._isAuthenticated;

   if(authNotRequiredRoutes.indexOf(to.name) > -1 && _isAuthenticated) next(false)

   if(authRequiredRoutes.indexOf(to.name) > -1) {
    if(_isAuthenticated) next();
    else next({name : "LoginPage"});
   }
   else {
    next();
   }
})

export default router;