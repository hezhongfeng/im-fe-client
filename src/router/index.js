import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '@/views/login/Login.vue';
import SignUp from '@/views/login/SignUp.vue';
import Home from '@/views/home/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/signup',
    component: SignUp
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

const routeList = ['/login', '/signup'];

router.beforeEach((to, from, next) => {
  if (routeList.indexOf(to.path) === -1) {
    next('/login');
  } else {
    next();
  }
});

export default router;
