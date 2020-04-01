<template>
  <div class="emoji-picker">
    <div class="e-body">
      <cube-slide ref="slide" :data="emojiGroups" :autoPlay="false">
        <cube-slide-item v-for="(group, index) in emojiGroups" :key="index">
          <div class="e-group">
            <div class="line" v-for="(line,_index) of group" :key="_index">
              <div class="emoji" v-for="(emoji,__index) of line" :key="__index" @click="choose(emoji.key)">
                <img :src="emoji.value">
              </div>
            </div>
          </div>
        </cube-slide-item>
      </cube-slide>
    </div>
  </div>
</template>

<script>
import emoji from '@/utils/emoji';

export default {
  name: 'EmojiPicker',
  data() {
    return {
      pageNumber: 24,
      total: 109,
      index: 0,
      emojis: emoji.emojis
    };
  },
  computed: {
    currentEmojis() {
      return this.emojis.slice(this.index, 109);
    },
    emojiGroups() {
      let array = [];
      let groupSize = Math.ceil(this.total / this.pageNumber);
      for (let index = 0; index < groupSize; index++) {
        let group = [];
        let tempGroup = this.currentEmojis.slice(index * this.pageNumber, (index + 1) * this.pageNumber);
        let line = [];
        for (let j = 0; j < 3; j++) {
          line = tempGroup.slice(j * 8, (j + 1) * 8);
          while (line.length < 8) {
            line.push({
              key: '',
              value: ''
            });
          }
          group.push(line);
        }
        array.push(group);
      }
      return array;
    }
  },
  methods: {
    choose(key) {
      if (key) {
        this.$emit('emoji-select', key);
      }
    }
  }
};
</script>

<style lang="scss">
.emoji-picker {
  .e-group {
    display: flex;
    flex-direction: column;
    height: 100px;
    .line {
      display: flex;
      justify-content: space-around;
      .emoji {
        width: 32px;
        height: 32px;
        border: 1px solid rgba(249, 135, 0, 0);
        opacity: 1;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        transition: all 0.2s;
        img {
          width: 25px;
        }
        &:hover {
          border-color: rgba(249, 135, 0, 0.9);
        }
      }
    }
  }
}
</style>
