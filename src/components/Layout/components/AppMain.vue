<script setup lang="ts">

</script>

<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive>
        <router-view />
      </keep-alive>
    </transition>
  </section>
</template>

<style scoped lang="scss">
.app-main {
  background-color: #f8feff;
  color: #333;
  width: 100%;
  height: 100%;
}
@media (prefers-color-scheme: dark){
  .app-main {
    background-color: #2B2D30;
    color: #f8feff;
  }
}
</style>