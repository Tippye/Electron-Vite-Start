<script setup lang="ts">
import {defineProps} from 'vue'
const {width, height,color} = defineProps({
  width: {
    type: Number,
    default: 62,
  },
  height: {
    type: Number,
    default: 14,
  },
  color: {
    type: String,
    default: "#6A687A"
  }
})
</script>

<template>
  <div class="icon">
    <svg :width="width" :height="height" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 358 521">
      <path :fill="color" d="m156.75732,521.89868c-56.32001,0 -116.39465,-5.63202 -156.75732,-15.95734l0,-98.56c44.11731,14.08002 105.13068,22.52802 151.12531,22.52802c64.76801,0 95.74402,-12.2027 95.74402,-60.07471c0,-47.87195 -17.83466,-59.13599 -103.25336,-78.84796c-108.88525,-24.40533 -137.04529,-60.07471 -137.04529,-144.55469c0,-91.05069 57.25867,-146.43201 195.24268,-146.43201c53.50403,0 109.82397,6.57065 135.16797,16.896l-5.63196,91.98935c-27.22131,-10.32535 -79.78668,-18.77335 -125.78131,-18.77335c-64.76801,0 -89.1734,13.14133 -89.1734,55.38135c0,40.36264 15.9574,45.99466 94.80536,65.70667c112.64001,27.22131 146.43201,60.07465 146.43201,154.88c0,113.57867 -73.216,155.81866 -200.87463,155.81866l-0.00006,0z"/>
    </svg>
  </div>
</template>
