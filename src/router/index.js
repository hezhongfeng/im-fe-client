import VueRouter from 'vue-router';
import store from '@/store';
import http from '@/common/http';
import Login from '@/views/login/Login.vue';
import SignUp from '@/views/login/SignUp.vue';
import Home from '@/views/home/Home.vue';
import addFriend from './add-friend';
import chat from './chat';
import mine from './mine';
import mailList from './mail-list';

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

// 获取当前用户信息
function getCurrent(next) {
  http
    .get('/api/v1/currentUser')
    .then(data => {
      if (data) {
        store.commit('updateUserId', {
          userId: data.id
        });
        store.commit('updateUserInfo', {
          userInfo: data.userInfo
        });
        next();
      } else {
        next('/login');
      }
    })
    .catch(error => {
      console.log(error);
      next('/login');
    });
}

router.beforeEach((to, from, next) => {
  if (routeWhiteList.indexOf(to.path) === -1 && !store.getters.userId) {
    getCurrent(next);
  } else {
    next();
  }
});

export default router;
