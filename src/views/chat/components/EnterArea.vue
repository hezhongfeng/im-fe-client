<template>
  <div class="enter-area">
    <div class="input-area">
      <!-- <cube-input placeholder="请输入您要咨询的问题" v-model="value" @focus="inputFocus"></cube-input> -->
      <van-field type="text" v-model="value" placeholder="请输入" />
      <div class="send-btn" @click="onSend">
        <i class="iconfont iconi-sh-man-xy"></i>
      </div>
    </div>
    <div ref="tool" class="tools">
      <div class="tool-item">
        <i class="iconfont iconi-sh-car-bf-f" @click="pickVideo"></i>
        <!-- <van-uploader accept="video/*" :after-read="afterReadVideo" /> -->
        <hy-upload accept="video/*" style="display: none;" ref="videoUpload" @file-success="videoSuccess"></hy-upload>
      </div>
      <div class="tool-item">
        <i class="iconfont iconi-sh-man-dt" @click="onSendPosition"></i>
      </div>
      <div class="tool-item">
        <i class="iconfont iconi-sh-man-zp" @click="pickPicture"></i>
        <!-- <hy-upload style="display: none;" ref="imageUpload" @file-success="imageSuccess" :action="pictureAction"></hy-upload> -->
      </div>
      <div class="tool-item">
        <i class="iconfont iconi-sh-man-bq" @click="pickEmoji"></i>
      </div>
    </div>
    <div class="hide-area">
      <!-- <emoji-picker v-if="isEmoji" @emoji-select="emojiSelect"></emoji-picker> -->
    </div>
  </div>
</template>

<script>
// import { compress } from '@/components/hy-form';
import { mapGetters } from 'vuex';
// import EmojiPicker from './EmojiPicker';
import HyUpload from './HyUpload';
import IoService from '@/services/io.js';
// 引入baiduMap
// import BaiduMap from '@/utils/getPosition.js';
// import map from '@/utils/map';

export default {
  name: 'EnterArea',
  components: {
    HyUpload
  },
  props: {},
  data() {
    return {
      accept: 'video/*',
      BaiduMap: null,
      value: '',
      isEmoji: false,
      pictureAction: {
        fileName: 'file',
        data: {
          type: '0'
        },
        target: ''
      },
      videoAction: {
        fileName: 'file',
        data: {
          type: '2'
        },
        target: ''
      }
    };
  },
  computed: {
    ...mapGetters(['userId', 'userInfo']),
    ...mapGetters('im', ['activeSession']),
    chatType() {
      return this.activeSession.type === '0' ? 'chat' : 'groupchat';
    }
  },
  watch: {},
  created() {
    // this.pictureAction.target = (this.host ? this.host : '') + '/rest/file/uploads.jhtml';
    // this.videoAction.target = (this.host ? this.host : '') + '/rest/file/uploads.jhtml';
  },
  methods: {
    processFile(file, next) {
      // compress(
      //   file,
      //   {
      //     compress: {
      //       width: 500,
      //       height: 500,
      //       quality: 1
      //     }
      //   },
      //   next
      // );
    },
    pickEmoji() {
      this.isEmoji = !this.isEmoji;
      if (this.isEmoji) {
        this.$emit('change-hight', '164');
      } else {
        this.$emit('change-hight', '64');
      }
    },
    emojiSelect(key) {
      this.value = this.value + key;
    },
    inputFocus(event) {
      this.isEmoji = false;
      this.$emit('change-hight', '64');
      setTimeout(() => {
        document.body.scrollTop = document.body.scrollHeight;
      }, 300);
    },
    pickPicture() {
      this.$refs.imageUpload.click();
    },
    pickVideo() {
      this.$refs.videoUpload.click();
    },
    imageSuccess(data) {
      // customService.sendMessage({
      //   to: { id: '' },
      //   from: { id: this.current.userId, name: this.userInfo.userNickname },
      //   chat_type: 'chat',
      //   chat_with: 'client',
      //   payload: {
      //     body: {
      //       url: data.fis[0].url, // 图片地址
      //       type: 'img'
      //     }
      //   }
      // });
    },
    videoSuccess(urls) {
      for (const iterator of urls) {
        IoService.sendMessage({
          to: { id: this.activeSession.info.id.toString() },
          from: { id: this.userId },
          chat_type: this.chatType,
          body: {
            url: iterator.url, // 视频地址
            type: 'video'
          }
        });
      }
    },
    onSend() {
      if (this.value.trim() === '') {
        this.$toast('不能发送空白信息');
        return;
      }
      // this.isEmoji = false;
      IoService.sendMessage({
        to: { id: this.activeSession.info.id.toString() },
        from: { id: this.userId },
        chat_type: this.chatType,
        body: {
          msg: this.value,
          type: 'text'
        }
      });
      this.value = '';
    },
    // 原生获取经纬度
    nativeGetLocation() {
      // map.getCurrentPosition().then(data => {
      //   console.log('getCurrentPosition');
      //   console.log(data);
      //   let addr =
      //     data.address.province +
      //     data.address.city +
      //     data.address.district +
      //     data.address.street +
      //     data.address.street_number;
      //   // customService.sendMessage({
      //   //   to: { id: '' },
      //   //   from: { id: this.current.userId, name: this.userInfo.userNickname },
      //   //   chat_type: 'chat',
      //   //   chat_with: 'client',
      //   //   payload: {
      //   //     body: {
      //   //       type: 'loc',
      //   //       addr: addr,
      //   //       lat: data.latitude,
      //   //       lng: data.longitude
      //   //     }
      //   //   }
      //   // });
      // });
    },
    // 获取当前位置信息
    async getPosition() {
      // this.BaiduMap = new BaiduMap();
      // try {
      //   let currentPosition = null;
      //   currentPosition = await this.BaiduMap.getCurrentLocation();
      //   let addr =
      //     currentPosition.address.province +
      //     currentPosition.address.city +
      //     currentPosition.address.district +
      //     currentPosition.address.street +
      //     currentPosition.address.street_number;
      //   console.log(currentPosition);
      //   customService.sendMessage({
      //     to: { id: '' },
      //     from: { id: this.current.userId, name: this.userInfo.userNickname },
      //     chat_type: 'chat',
      //     chat_with: 'client',
      //     payload: {
      //       body: {
      //         type: 'loc',
      //         addr: addr,
      //         lat: currentPosition.latitude,
      //         lng: currentPosition.longitude
      //       }
      //     }
      //   });
      // } catch (e) {
      //   console.log('ERR: ', e);
      // }
    },
    onSendPosition() {
      this.nativeGetLocation();
    }
  }
};
</script>

<style lang="scss">
.enter-area {
  background-color: #f4f5f7;
  .input-area {
    border-top: #f2f4f5 1px solid;
    display: flex;
    input {
      color: #666;
    }
    .send-btn {
      width: 40px;
      text-align: center;
      // background-color: #f98700;
      display: flex;
      align-items: center;
      justify-content: center;
      i {
        color: #fff;
        font-size: 22px;
      }
    }
  }
  .tools {
    display: flex;
    justify-content: space-around;
    margin-top: 5px;
    padding-bottom: 5px;
    .tool-item {
      i {
        font-size: 24px;
        color: #8e9398;
      }
    }
  }
}
</style>
