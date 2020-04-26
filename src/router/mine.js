import Setting from '@/views/mine/Setting.vue';
import UserInfo from '@/views/mine/UserInfo.vue';
import EditSign from '@/views/mine/EditSign.vue';
import EditAvator from '@/views/mine/EditAvator.vue';

export default [
  {
    path: '/mine/setting',
    component: Setting
  },
  {
    path: '/mine/userinfo',
    component: UserInfo
  },
  {
    path: '/mine/edit-sign',
    component: EditSign
  },
  {
    path: '/mine/edit-avator',
    component: EditAvator
  }
];
