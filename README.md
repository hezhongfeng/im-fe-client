<img width="464" src="https://i.loli.net/2020/07/01/AmsnawZ29RbUqk8.png">

即时通讯应用, 包含[服务端](https://github.com/hezhongfeng/im-server)、[管理端](https://github.com/hezhongfeng/im-fe-admin)和[客户端](https://github.com/hezhongfeng/im-fe-vue)

## 介绍

使用 @vue/cli 搭建，IM 服务的客户端

## 整体功能简介

1. 注册，登录，个人、群组聊天，个人信息编辑等基础功能
2. 申请添加好友和申请入群
3. 表情，图片信息支持
4. 聊天会话列表记录
5. 在线离线显示
6. 支持多点同时登录
7. 支持消息漫游
8. 机器人自动回复（待开发）
9. 管理端对群组、用户、角色和权限的管理

## 项目介绍

这个项目主要是演示一个 client（类似微信）的基础应用，具有注册、登录、编辑个人信息、添加好友、组件群聊、聊天等功能，需要配合后端使用

## 项目整体

Vue 全家桶的项目大家很熟悉的了（这点我觉得比 React 好一些，没有了那么多的选择困难），这里说下扩展的几个地方：

1. 封装了一个 http 插件，主要目的是统一参数的传递和对后端反馈的统一响应
2. 自定义全局 scss 变量，不用在使用的时候手动引用
3. 将常用的$urls,$http 和 \$checkLogin 注入到 Vue 原型上，方便使用
4. 使用 vue-page-stack 做页面的栈管理工具
5. 在路由的全局守卫 beforeEach 上面添加了对目前登录状态的确认，这点做法和原生不一致，需要注意

## IM 功能简介

首先引入 socket.io-client 这个包，通过名字可以知道是 socket.io 的客户端部分，下面说一下用法：

### 链接服务端

想要和服务端进行收发信息，先要建立链接

```
import io from 'socket.io-client';
// 首先需要链接上后端的 socket.io，query是链接的参数
this.socket = io('http://127.0.0.1:7001', {
  query: {
    scene: 'im',
    userId: '1'
  }
});

// socket.on 就是监听事件，connect就是链接上了服务端
this.socket.on('connect', () => {
  console.log('socket连接成功！');
  // ....
});
```

### 收发信息

在和服务端进行链接后就可以进行收发信息了，很简单：

```
// 发送消息，message是自己定义的消息体
this.socket.emit('/v1/im/new-message', message);


// 有新消息收到
this.socket.on('/v1/im/new-message', message => {
  // 自己进行一系列的处理
});
```

### 会话

以上可以看出来 socket.io 的使用多么的方便了，首先建立链接，然后就可以进行收发消息了，结合我们的 IM 场景，做了如下的安排：

1. 通过 vuex 维护一个会话列表，即 conversationList
2. 和服务端建立链接成功后向后端请求会话列表，成功后请求每一个会话的聊天记录
3. 点击会话，会进入到会话详情，输入信息发送，将信息发送到服务器
4. 由于已经对消息有了监听，所以服务器将上一步发送的消息广播后自己也可以收到，然后 push 进会话的消息列表，通过对比发送用户知道是不是自己的消息
5. 服务端主动发来的消息也一样，都由 `/v1/im/new-message` 监听
