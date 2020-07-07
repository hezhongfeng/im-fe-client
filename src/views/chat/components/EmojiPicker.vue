<template>
  <div class="emoji-picker">
    <van-swipe indicator-color="white">
      <van-swipe-item>
        <div class="emoji-wrap">
          <div class="row">
            <svg class="icon" aria-hidden="true" @click="choose('[中毒]')">
              <use xlink:href="#icon-astonished" />
            </svg>
            <svg class="icon" aria-hidden="true" @click="choose('[天使]')">
              <use xlink:href="#icon-angel" />
            </svg>
            <svg class="icon" aria-hidden="true" @click="choose('[中毒-1]')">
              <use xlink:href="#icon-astonished-" />
            </svg>
            <svg class="icon" aria-hidden="true" @click="choose('[酷]')">
              <use xlink:href="#icon-cool" />
            </svg>
            <svg class="icon" aria-hidden="true" @click="choose('[迷茫]')">
              <use xlink:href="#icon-confused" />
            </svg>
            <svg class="icon" aria-hidden="true" @click="choose('[生气]')">
              <use xlink:href="#icon-angry" />
            </svg>
            <svg class="icon" aria-hidden="true" @click="choose('[酷-1]')">
              <use xlink:href="#icon-cool-" />
            </svg>
            <svg class="icon" aria-hidden="true" @click="choose('[头晕]')">
              <use xlink:href="#icon-dizzy" />
            </svg>
          </div>
          <div class="row">
            <svg class="icon" aria-hidden="true" @click="choose('[哭]')">
              <use xlink:href="#icon-cry" />
            </svg>
            <svg class="icon" aria-hidden="true" @click="choose('[哭-1]')">
              <use xlink:href="#icon-cry-" />
            </svg>
            <svg class="icon" aria-hidden="true" @click="choose('[面无表情]')">
              <use xlink:href="#icon-expressionless" />
            </svg>
            <svg class="icon" aria-hidden="true" @click="choose('[魔鬼]')">
              <use xlink:href="#icon-devil" />
            </svg>
            <svg class="icon" aria-hidden="true" @click="choose('[懵B]')">
              <use xlink:href="#icon-flushed" />
            </svg>
            <svg class="icon" aria-hidden="true" @click="choose('[开心-1]')">
              <use xlink:href="#icon-happy-" />
            </svg>
            <svg class="icon" aria-hidden="true" @click="choose('[开心-2]')">
              <use xlink:href="#icon-happy-1" />
            </svg>
            <svg class="icon" aria-hidden="true" @click="choose('[开心]')">
              <use xlink:href="#icon-happy" />
            </svg>
          </div>
        </div>
      </van-swipe-item>
      <van-swipe-item>
        <div class="emoji-wrap">
          <div class="row">
            <svg class="icon" aria-hidden="true" @click="choose('[受伤]')">
              <use xlink:href="#icon-injury" />
            </svg>
            <svg class="icon" aria-hidden="true" @click="choose('[笑哭]')">
              <use xlink:href="#icon-joy" />
            </svg>
            <svg class="icon" aria-hidden="true" @click="choose('[热恋]')">
              <use xlink:href="#icon-in-love" />
            </svg>
            <svg class="icon" aria-hidden="true" @click="choose('[亲吻]')">
              <use xlink:href="#icon-kiss" />
            </svg>
            <svg class="icon" aria-hidden="true" @click="choose('[口罩]')">
              <use xlink:href="#icon-mask" />
            </svg>
            <svg class="icon" aria-hidden="true" @click="choose('[闭嘴]')">
              <use xlink:href="#icon-secret" />
            </svg>
            <svg class="icon" aria-hidden="true" @click="choose('[害怕-1]')">
              <use xlink:href="#icon-scared-" />
            </svg>
            <svg class="icon" aria-hidden="true" @click="choose('[生病]')">
              <use xlink:href="#icon-sick" />
            </svg>
          </div>
          <div class="row">
            <svg class="icon" aria-hidden="true" @click="choose('[眼红]')">
              <use xlink:href="#icon-smiling" />
            </svg>
            <svg class="icon" aria-hidden="true" @click="choose('[流汗]')">
              <use xlink:href="#icon-sweat" />
            </svg>
            <svg class="icon" aria-hidden="true" @click="choose('[震惊]')">
              <use xlink:href="#icon-surprised" />
            </svg>
            <svg class="icon" aria-hidden="true" @click="choose('[奸笑]')">
              <use xlink:href="#icon-smirking" />
            </svg>
            <svg class="icon" aria-hidden="true" @click="choose('[思考]')">
              <use xlink:href="#icon-thinking" />
            </svg>
            <svg class="icon" aria-hidden="true" @click="choose('[疲惫]')">
              <use xlink:href="#icon-tired" />
            </svg>
            <svg class="icon" aria-hidden="true" @click="choose('[僵尸]')">
              <use xlink:href="#icon-zombie" />
            </svg>
            <svg class="icon" aria-hidden="true" @click="choose('[表情]')">
              <use xlink:href="#iconbiaoqing" />
            </svg>
          </div>
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: 'EmojiPicker',
  data() {},
  computed: {},
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
  height: 80px;
  .emoji-wrap {
    height: 80px;
    width: 100vw;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    .row {
      width: 100%;
      display: flex;
      justify-content: space-around;
    }
    .icon {
      font-size: 26px;
    }
  }
}
</style>
