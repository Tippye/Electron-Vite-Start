<script setup lang="ts">
import {useAppStore} from "@/stores/modules/app.ts";

const AppStore = useAppStore();
</script>

<template>
  <div>
    This is Home.
    Now is: {{ AppStore.darkmode?"Dark" : "Light" }}
  </div>
</template>

<style scoped lang="scss">

</style>