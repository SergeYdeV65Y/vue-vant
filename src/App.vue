<template>
  <div class="app-container">
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style lang="scss">
html,
body,
#app {
  height: 100%;
}
.app-container {
  overflow-x: hidden;
  height: 100%;
  background-color: #e9e9e9;
  .v-enter {
    opacity: 0;
    transform: translateX(100%);
  }
  .v-leave-to {
    opacity: 0;
    transform: translateX(-100%);
    position: absolute;
  }
  .v-enter-active,
  .v-leave-active {
    transition: transform 0.1s ease;
  }
}
</style>
