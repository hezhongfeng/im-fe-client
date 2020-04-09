<template>
  <div class="cs-message-item" :style="itemStyle">
    <div class="from-name">{{fromName}}</div>
    <div class="c-frame" :class="{'self-c':message.isMyself,'other-c':!message.isMyself}">
      <div class="avatar" v-if="!message.isMyself">
        <img :src="csHead" />
      </div>
      <div class="container">
        <div class="container-text" v-if="message.body.type==='text'" v-html="bodyMessage"></div>

        <div class="image" v-if="message.body.type==='image'">
          <img :src="message.body.url" @load="imgOnload" @click="imgPreview" />
        </div>

        <div class="loc" v-if="message.body.type==='loc'">
          <!-- <biz-location-map :value="message.body" @map-click="openLoc"></biz-location-map> -->
        </div>

        <div class="video" v-if="message.body.type==='video'">
          <Xgplayer :config="config" />
        </div>
      </div>
      <div class="avatar" v-if="message.isMyself">
        <img :src="defaultUser" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
// import { BizLocationMap } from '@/components/hy-location';
import defaultUser from '@/assets/images/default.png';
// import csDefault from '@/assets/img/custom-service/csdefault.png';
// import customService from '@/services/module/custom-service';
// import Sector from './components/SectorProgress';
import Xgplayer from 'xgplayer-vue';

export default {
  name: 'MessageItem',
  data() {
    return {
      productBasicInfo: {
        image: '',
        name: '',
        marketPrice: ''
      },
      activeOption: {
        label: '一般',
        value: '6'
      },
      options: [
        {
          label: '非常不满意',
          value: '2'
        },
        {
          label: '不满意',
          value: '4'
        },
        {
          label: '一般',
          value: '6'
        },
        {
          label: '满意',
          value: '8'
        },
        {
          label: '非常满意',
          value: '10'
        }
      ],
      defaultUser: defaultUser
      // csDefault: csDefault
    };
  },
  props: {
    message: Object
  },
  created() {
    if (this.message.body.type === 'product') {
      this.getProductInfo();
    }
  },
  mounted() {},
  computed: {
    ...mapGetters(['userInfo']),
    ...mapGetters('im', ['activeConversation']),
    fromName() {
      if (this.message.isMyself) {
        return this.userInfo.nickname + ' ' + this.message.createdAt;
      }
      return this.message.createdAt + ' ' + this.activeConversation.info.name || this.activeConversation.info.nickname;
    },
    productImg() {
      return this.host + this.productBasicInfo.image;
    },
    bodyMessage() {
      // let reg;
      // let str = this.message.body.msg;
      // reg = str.replace(/([(0-9\s\-)]{7,}|0\d{2}-\d{7,8})/g, '<a href="tel:$1">$1</a>');
      // if (this.isNative) {
      //   this.$nextTick(() => {
      //     let telGroup = document.querySelectorAll('a[href^=tel]');
      //     // console.log('tegGroup: ', telGroup);
      //     telGroup.forEach(tel => {
      //       if (!tel.onclick) {
      //         tel.onclick = this.call;
      //       }
      //       // tel.addEventListener('click', this.call);
      //     });
      //   });
      // }
      // console.log('reg: ', reg);
      // return reg;
      return this.message.body.msg;
    },
    itemStyle() {
      return {
        'text-align': this.message.isMyself ? 'right' : 'left'
      };
    },
    containerStyle() {
      return {
        'background-color': this.message.isMyself ? '#fef3e5' : '#acd8f6'
      };
    },
    uploadProgress() {
      return parseInt(this.message.progress) || 0;
    },
    config() {
      if (this.message.body.type !== 'video') {
        return {};
      }
      return {
        width: 4,
        height: 3,
        id: this.message.body.url,
        ignores: ['play', 'volume'],
        whitelist: [
          ua => {
            return /Android/gi.test(ua);
          }
        ],
        controlsList: [],
        videoInit: true,
        fluid: true,
        url: this.message.body.url
      };
    },
    csHead() {
      // if (this.isMyself) {
      //   return {};
      // }
      // // if (this.message.isRobot) {
      // //   return this.csDefault;
      // // }
      // return this.message.head ? this.host + this.message.head : this.defaultUser;

      return this.defaultUser;
    }
  },
  components: {
    Xgplayer
    // Sector,
    // BizLocationMap
  },
  methods: {
    ...mapMutations('CustomService', ['updateEvaluateByTimestamp']),
    getProductInfo() {
      const params = {
        clientType: this.clientType,
        shopId: this.current.shopId,
        productId: this.message.body.id
      };
      this.$http
        .get(this.$urls.vShop.goods, params)
        .then(data => {
          this.productBasicInfo = data.product;
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {});
    },
    onProduct() {
      this.$router.push({ path: `/goods/${this.message.body.id}` });
    },
    call(e) {
      e.preventDefault();
      let { href } = e.target;
      href = href.replace('tel:', '');
      // console.log('call: ', href);

      this.$call(
        {
          phone: href
        },
        () => {
          console.log('调用成功');
        }
      );
    },
    loadeddata() {
      console.log('loadeddata', new Date());
    },
    imgOnload(event) {
      this.$emit('img-onload');
    },
    activeEvaluate(value) {
      const num = Number(value);
      return Number(this.activeOption.value) >= num;
    },
    seleckEvaluate(option) {
      if (this.message.body.hasEvaluate) {
        return;
      }
      this.activeOption = option;
    },
    imgPreview() {
      this.$emit('img-preview');
    },
    openLoc() {
      this.$emit('loc-preview');
    }
  }
};
</script>

<style lang="scss">
$self-b: #fff;
$other-b: #fff;

.cs-message-item {
  margin: 5px 10px;
  .from-name {
    color: #ccc;
    font-size: 12px;
    margin-bottom: 10px;
  }
  > .c-frame {
    display: flex;
    &.other-c {
      .container-text {
        text-align: left;
      }
      .container {
        margin-left: 15px;
        background-color: $other-b;
      }
      .container::before {
        width: 0;
        position: absolute;
        top: 15px;
        border-style: solid;
        content: '';
        left: -12px;
        border-color: transparent $other-b;
        border-width: 0 12px 12px 0;
      }
    }
    &.self-c {
      .container-text {
        text-align: left;
      }
      justify-content: flex-end;
      .container {
        margin-right: 15px;
        background-color: $self-b;
      }
      .container::before {
        width: 0;
        position: absolute;
        top: 15px;
        border-style: solid;
        content: '';
        right: -12px;
        border-color: transparent $self-b;
        border-width: 0 0 12px 12px;
      }
    }
    > .avatar {
      width: 40px;
      height: 40px;
      flex-shrink: 0;
      img {
        background-color: #fff;
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }

    > .container {
      font-size: 13px;
      padding: 1px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      width: auto;
      height: auto;
      border-radius: 5px;
      position: relative;
      .container-text {
        line-height: 20px;
        display: inline-block;
        img {
          width: 16px;
          height: 16px;
        }
      }
      > .image {
        width: 150px;
        height: 100px;
        img {
          height: 100%;
          width: 100%;
          object-fit: cover;
        }
      }
      > .video {
        width: 65vw;
      }
      > .product {
        width: 150px;
        .p-image {
          width: 150px;
          height: 150px;
          margin-bottom: 6px;
          img {
            object-fit: cover;
            width: 100%;
            height: 100%;
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
          }
        }
        .p-name {
          margin-left: 5px;
          margin-right: 5px;
          margin-bottom: 5px;
          line-height: 1.2;
        }
        .price {
          margin-left: 5px;
          color: #f02b2b;
          font-size: 14px;
        }
      }
      > .upload-loading {
        height: 120px;
        width: 200px;
        .back-g {
          position: relative;
          height: 100%;
          background-color: #cccccc;
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            width: 80px;
          }
          .circle {
            // position: absolute;
            // border-radius: 35px;
            // height: 70px;
            // width: 70px;
            // background-color: rgba(255,255,255,.4);
          }
          .progress {
            border: #fff 3px solid;
            background-color: #fff;
            position: absolute;
            height: 60px;
            width: 60px;
            border-radius: 30px;
          }
        }
      }
      > .loc {
        width: 150px;
        height: 100px;
      }
    }
  }
}
</style>
