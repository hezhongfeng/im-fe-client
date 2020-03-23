export default {
  checkInfo: '/rest/member/check.jhtml', // 基础信息
  defaultShop: '/rest/store/store.jhtml', // 店铺信息
  captcha: '/rest/member/captcha.jhtml', // 校验码
  validateCode: '/rest/member/sendValidateCode.jhtml', // 验证码
  login: '/rest/member/login.jhtml', // 登录
  bind: '/api/wechat/bind.jhtml', // 微信绑定
  quickBind: '/api/wechat/quickbind.jhtml', // 微信快捷绑定
  signup: '/rest/member/quickLogin.jhtml', // 注册
  signupFromActivity: '/rest/member/registeByActivity.jhtml', // 通过活动注册
  userInfo: '/rest/member/userInfo.jhtml', // 用户信息
  password: '/rest/member/password.jhtml' // 密码
};
