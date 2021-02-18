import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from "@/store";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      needsUser: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Auth/Login.vue')
  },
  {
    path: '/signup',
    name: 'Sign up',
    component: () => import(/* webpackChunkName: "about" */ '../views/Auth/Signup.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach ((to, from, next) => {
  console.log('Stara ruta ', from.name, ' -> ', "nova ruta:", to.name, 'korisnik', store.currentUser)

  const noUser = store.currentUser === null;

  if (noUser && to.meta.needsUser) {
    next('login');
  }else {
    next(); //u protivnom dozvoli promjenu rute
  }
});

export default router
