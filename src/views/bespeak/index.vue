<template>
  <div class="bespeak">
    <v-header :mypage="true">我的预约
      <div slot="headright">
        <span class="add-btn" @click="add">新增</span>
      </div>
    </v-header>
    <div class="bespeak-warp">
      <tabs :active="activeTab" @search-appointment="searchAppointment"></tabs>
      <list :list-data="appointments"></list>
    </div>
  </div>
</template>

<script>
  import { mapMutations, mapActions, mapGetters } from 'vuex';
  import tabs from './components/tabs';
  import list from './components/list';
  export default {
    components: {
      tabs,
      list
    },
    data() {
      return {
        activeTab: 1,
        appointments: []
      };
    },
    computed: {
      ...mapGetters(['userId', 'token'])
    },
    created() {
      this.fetchData();
      this.appointments = this.appointments.filter(ele => {
        return ele.status == 1;
      });
    },
    methods: {
      ...mapMutations(['setAppointment']),
      ...mapActions(['ajax']),

      fetchData() {
        this.ajax({
          name: 'getappoint',
          data: {
          }
        }).then(res => {
          this.appointments = res;
          this.appointments = this.appointments.filter(ele => {
            return ele.status == 0;
          });
          this.appointments = this.appointments.sort(function(a, b) {
            return a.appoint_time > b.appoint_time ? 1 : -1;
          });
        });
      },
      searchAppointment(tab) {
        this.activeTab = tab;
        let type = this.activeTab == 1 ? 0 : 2;
        this.ajax({
          name: 'getappoint',
          data: {
          }
        }).then(res => {
          this.appointments = res;
          this.appointments = this.appointments.filter(ele => {
            return ele.status == type;
          });
        });
      },
      add() {
        this.setAppointment({
          appointment: {
          },
          edit: 1,
          type: 1
        });
        this.$router.push({ name: 'addappointment' });
      }
    }
  };
</script>


<style lang="less" >
  @import "~@/style/vars.less";
  .bespeak {
    .header {
      box-shadow: 0 0 0 0 rgba(170, 170, 170, 0.5) !important;
    }
  }
  .add-btn {
    font-size: 28px;
    color: @color2;
  }
  .bespeak-warp {
    position: absolute;
    left: 0;
    right: 0;
    top: 96px;
    bottom: 0;
    background: #fff;
  }
</style>
