<template>
  <div class="inline-flex flex-items-center justify-center" v-html="svgData"></div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';

const props = defineProps<{
  url: string;
}>();
const svgData = ref('');

onMounted(() => {
  fetch(props.url)
    .then((_) => _.text())
    .then((_) => {
      svgData.value = _;
    });
});
</script>
<style lang="scss"></style>
