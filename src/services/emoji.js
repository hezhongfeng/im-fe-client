export default {
  emojis: [
    {
      key: '[中毒]',
      value: 'icon-astonished'
    },
    {
      key: '[天使]',
      value: 'icon-angel'
    },
    {
      key: '[中毒-1]',
      value: 'icon-astonished-'
    },
    {
      key: '[酷]',
      value: 'icon-cool'
    },
    {
      key: '[迷茫]',
      value: 'icon-confused'
    },
    {
      key: '[生气]',
      value: 'icon-angry'
    },
    {
      key: '[酷-1]',
      value: 'icon-cool-'
    },
    {
      key: '[头晕]',
      value: 'icon-dizzy'
    },
    {
      key: '[哭]',
      value: 'icon-cry'
    },
    {
      key: '[哭-1]',
      value: 'icon-cry-'
    },
    {
      key: '[面无表情]',
      value: 'icon-expressionless'
    },
    {
      key: '[魔鬼]',
      value: 'icon-devil'
    },
    {
      key: '[懵B]',
      value: 'icon-flushed'
    },
    {
      key: '[开心-1]',
      value: 'icon-happy-'
    },
    {
      key: '[开心-2]',
      value: 'icon-happy-1'
    },
    {
      key: '[开心]',
      value: 'icon-happy'
    },
    {
      key: '[受伤]',
      value: 'icon-injury'
    },
    {
      key: '[笑哭]',
      value: 'icon-joy'
    },
    {
      key: '[热恋]',
      value: 'icon-in-love'
    },
    {
      key: '[亲吻]',
      value: 'icon-kiss'
    },
    {
      key: '[口罩]',
      value: 'icon-mask'
    },
    {
      key: '[闭嘴]',
      value: 'icon-secret'
    },
    {
      key: '[害怕-1]',
      value: 'icon-scared-'
    },
    {
      key: '[生病]',
      value: 'icon-sick'
    },
    {
      key: '[眼红]',
      value: 'icon-smiling'
    },
    {
      key: '[流汗]',
      value: 'icon-sweat'
    },
    {
      key: '[震惊]',
      value: 'icon-surprised'
    },
    {
      key: '[奸笑]',
      value: 'icon-smirking'
    },
    {
      key: '[思考]',
      value: 'icon-thinking'
    },
    {
      key: '[疲惫]',
      value: 'icon-tired'
    },
    {
      key: '[僵尸]',
      value: 'icon-zombie'
    },
    {
      key: '[表情]',
      value: 'iconbiaoqing'
    }
  ],
  replaceEmoji(emojiStr) {
    for (const emoji of this.emojis) {
      if (emojiStr === emoji.key) {
        return '<img style="margin: 0 2px;" src="' + emoji.value + '">';
      }
    }
    return emojiStr;
  },
  isEmoji(emojiStr) {
    for (const emoji of this.emojis) {
      if (emojiStr === emoji.key) {
        return true;
      }
    }
    return false;
  },
  // 替换字符串
  replaceStr(str) {
    let strs = Array.from(new Set(str.split(/<img.*?(?:>|\/>)/gi)));
    strs = strs.filter(str => {
      return str !== '';
    });
    for (const strItem of strs) {
      str = str.split(strItem).join('<span>' + strItem + '</span>');
    }
    return str;
  },
  transform(str) {
    const eArray = Array.from(new Set(str.match(/\[.+?\]/g)));
    for (const estr of eArray) {
      if (this.isEmoji(estr)) {
        str = str.split(estr).join(this.replaceEmoji(estr));
      }
    }
    return str;
  }
};
