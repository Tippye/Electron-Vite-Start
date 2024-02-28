<template>
  <div class="app_header" :style="{height: height + 'px'}">
    <div class="app_header-dragger">{{}}</div>
  </div>
</template>

<script lang="ts" setup>
import {defineProps} from 'vue'
const {height} = defineProps({
  height: {
    type: Number,
    default: 36
  }
})
</script>

<style lang="scss">
@import '@/style.scss';

.app_header{
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  width: 100%;
  z-index: 5000;

  &-dragger{
    margin: 5px 0 0 5px;
    flex: 1;
    @extend .dragger;
  }
}
</style>