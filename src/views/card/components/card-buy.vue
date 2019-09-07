<template>
  <div class="purchase">
    <div class="price">￥<span>{{card.price}}</span></div>
    <button v-if="card.already" class="btn btn-txt bought" @click.stop>您已购买</button>
    <button v-else class="btn btn-txt" @click.stop="buy">立即购买</button>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex';

  export default {
    props: {
      card: {
        type: Object
      }
    },
    methods: {
      ...mapMutations(['setCard', 'setAddress']),
      buy() {
        let text = '';
        if(this.card.use_type_range) {
          text = this.card.use_type_range.join('、');

          switch(this.card.use_type) {
            case 0: text = '全部商品'; break;
            case 1: text += '套系'; break;
            case 2: text += '款式'; break;
            case 3: text += '镶嵌方式'; break;
            default: text = '';
          }
        }
        this.card.scope = text;
        this.setCard(this.card);
        this.setAddress({ type: 0 });
        this.$router.push({ name: 'cardorder' });
      }
    }
  };
</script>

<style lang="less" scoped>
  .purchase {
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 90px;
  }
  .price {
    font-size: 30px;
    color: #666;
    span {
      font-size: 40px;
    }
  }
  .btn-txt {
    width: 156px;
    height: 48px;
  }

  .bought {
    background-color: @color3;
    border: none;
  }
</style>
