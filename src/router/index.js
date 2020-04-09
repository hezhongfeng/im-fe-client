import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import Login from '@/views/login/Login.vue';
import SignUp from '@/views/login/SignUp.vue';
import Home from '@/views/home/Home.vue';
import ChatWindow from '@/views/chat/ChatWindow.vue';
import AddFriend from '@/views/add/AddFriend.vue';

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
  {
    path: '/chat',
    component: ChatWindow
  },
  {
    path: '/add-friend',
    component: AddFriend
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

const routeList = ['/login', '/signup'];

router.beforeEach((to, from, next) => {
  if (routeList.indexOf(to.path) === -1 && !store.getters.userId) {
    next('/login');
  } else {
    next();
  }
});

export default router;
