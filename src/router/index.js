import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '@/views/login/Login.vue';
import SignUp from '@/views/login/SignUp.vue';

Vue.use(VueRouter);

const routes = [
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

export default router;
