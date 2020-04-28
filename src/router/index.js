import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import Login from '@/views/login/Login.vue';
import SignUp from '@/views/login/SignUp.vue';
import Home from '@/views/home/Home.vue';
import addFriend from './add-friend';
import chat from './chat';
import mine from './mine';
import mailList from './mail-list';

Vue.use(VueRouter);

const routes = [
  {
    path: '',
    component: Home
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/signup',
    component: SignUp
  },
  ...addFriend,
  ...chat,
  ...mailList,
  ...mine
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

// 白名单
const routeWhiteList = ['/login', '/signup'];

router.beforeEach((to, from, next) => {
  if (routeWhiteList.indexOf(to.path) === -1 && !store.getters.userId) {
    next('/login');
  } else {
    next();
  }
});

export default router;
