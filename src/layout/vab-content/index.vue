<template>
  <a-layout-content class="vab-content">
    <router-view v-slot="{ Component }">
      <transition mode="out-in" name="fade-transform">
        <component :is="Component" />
      </transition>
    </router-view>
  </a-layout-content>
</template>

<script>
import { watchEffect, computed, getCurrentInstance } from 'vue';
import { useRouter } from "vue-router";
import { useStore, mapGetters } from "vuex";
  export default {
    name: 'VabContent',
    setup( prpos ){

      const router = useRouter();

      const store = useStore();

      const device = useStore().getters['settings/device'];
      
      const currentInstance = getCurrentInstance();

      setTimeout(()=>{
      console.log('device_', device , currentInstance, prpos, );

      }, 2000);

      
      watchEffect(() => {
        if ('mobile' === device) {
          store.dispatch('settings/foldSideBar')
        }
      })
    }
    // watch: {
    //   $route: {
    //     handler() {
    //       console.log('watch_$route_', this, this.device);
    //       if ('mobile' === this.device) {
    //         this.$store.dispatch('settings/foldSideBar')
    //       }
    //     },
    //     immediate: true,
    //   },
    // },
  }
</script>

<style lang="less">
  .fade-transform-leave-active,
  .fade-transform-enter-active {
    transition: all 0.2s;
  }

  .fade-transform-enter {
    opacity: 0;
    transform: translateX(-30px);
  }

  .fade-transform-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }

  .vab-content {
    min-height: calc(
      100vh - @vab-header-height - @vab-padding - @vab-padding - @vab-padding -
        @vab-padding
    ) !important;
    padding: @vab-padding;
    margin: @vab-margin;
    background: #fff;
    .error-container {
      height: calc(
        100vh - @vab-header-height - @vab-padding - @vab-padding - @vab-padding -
          @vab-padding - @vab-padding - @vab-margin
      ) !important;
    }
  }
</style>
