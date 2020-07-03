<template>
  <div class="mail-item" @click="enter">
    <div class="avatar">
      <img :src="head" />
    </div>
    <div class="name">{{mail.userInfo.nickname}}</div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import defaultHead from '@/assets/images/head.png';

export default {
  name: 'mail-item',
  components: {},
  props: {
    mail: Object
  },
  data() {
    return {
      defaultHead: defaultHead
    };
  },
  computed: {
    head() {
      return this.mail.userInfo.photo || this.defaultHead;
    }
  },
  watch: {},
  created() {},
  methods: {
    ...mapMutations('im', ['activateConversation']),
    enter() {
      this.activateConversation({
        conversationId: this.mail.conversation.id
      });
      this.$router.push('/chat');
    }
  }
};
</script>

<style lang="scss">
.mail-item {
  background-color: $color-white;
  display: flex;
  align-items: center;
  height: 60px;
  .avatar {
    margin-left: 10px;
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
  .name {
    flex-grow: 2;
    position: relative;
    height: 100%;
    line-height: 60px;
    margin-left: 10px;
    &::after {
      position: absolute;
      box-sizing: border-box;
      content: ' ';
      pointer-events: none;
      top: -50%;
      right: -50%;
      bottom: -50%;
      left: -50%;
      border: 0 solid #ebedf0;
      -webkit-transform: scale(0.5);
      transform: scale(0.5);
      border-bottom-width: 1px;
    }
  }
}
</style>
