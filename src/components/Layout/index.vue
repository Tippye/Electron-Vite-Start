<script setup lang="ts">
import {ref} from "vue";
import {useAppStore} from "@/stores/modules/app.ts";

import AppMain from "@/components/Layout/components/AppMain.vue";
import AppHeader from "@/components/Layout/components/AppHeader.vue";
import Logo from '@/components/Logo/index.vue'
import {Operation, Help} from '@element-plus/icons-vue'
import router from "@/router";
import {RouteLocationRaw} from "vue-router";

const safeTop = ref(36);
const appStore = useAppStore()

const nav = (page:RouteLocationRaw) =>{
  router.push(page)
      .catch(e=>{
        console.log(e);
      })
}
</script>

<template>
  <div class="app">
    <!--  用于无边框程序窗口可以被拖动  -->
    <AppHeader :height="safeTop"/>
    <el-container>
      <el-aside class="app_aside" :style="{paddingTop: safeTop + 'px'}">
        <div class="app_aside-top">
          <Logo :width="40" :height="40" :color="appStore.darkmode?'#bfbfbf':'#6A687A'" @click="nav('/home')" class="app-logo"/>
        </div>
        <div class="app_aside-bottom">
          <div class="app_aside-item" @click="nav('/settings')">
            <el-icon :size="20" :color="appStore.darkmode?'#bfbfbf':'#6A687A'">
              <Operation/>
            </el-icon>
          </div>
          <div class="app_aside-item">
            <el-icon :size="20" :color="appStore.darkmode?'#bfbfbf':'#6A687A'">
              <Help />
            </el-icon>
          </div>
        </div>
      </el-aside>
      <AppMain :style="{paddingTop: safeTop + 'px'}"/>
    </el-container>
  </div>
</template>>

<style lang="scss" scoped>
@import "@/style.scss";

.app {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  &_aside {
    width: 78px;
    background-color: transparent;
    display: flex;
    flex-direction: column;
    align-items: center;

    @extend .dragger;

    &-top, &-bottom {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
    }

    &-top {
      height: 100%;
    }

    &-bottom {
      padding-bottom: 30px;
    }

    &-item {
      width: 32px;
      height: 32px;
      margin-top: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;

      @extend .no-dragger;
      @extend .button_click;
    }
  }

  &-logo {
    cursor: pointer;
    @extend .no-dragger;
  }
}
</style>