import Setting from '@/views/mine/Setting.vue';
import UserInfo from '@/views/mine/UserInfo.vue';
import EditSign from '@/views/mine/EditSign.vue';
import EditAvatar from '@/views/mine/EditAvatar.vue';
import EditNickname from '@/views/mine/EditNickname.vue';

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
    path: '/mine/edit-nickname',
    component: EditNickname
  },
  {
    path: '/mine/edit-avatar',
    component: EditAvatar
  }
];
