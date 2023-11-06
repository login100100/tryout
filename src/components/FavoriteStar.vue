<script setup lang="ts">
import { IAppProvider } from "@/providers/app";
import { computed, inject } from "vue";

const props = defineProps<{
  active: boolean;
}>();

const App = inject<IAppProvider>("App");

const getImageSource = computed(() => {
  try {
    let file = "ico-star-";
    if (props.active) file += "full";
    if (!props.active) {
      file +=
        App?.theme.value === "dark" ? "empty-dark" : "empty-light";
    }
    return new URL(`../assets/img/${file}.png`, import.meta.url).href;
  } catch (e) {
    console.warn(e);
  }
});
</script>

<template>
  <img :src="getImageSource" class="w-6 h-6 inline-block cursor-pointer" />
</template>
