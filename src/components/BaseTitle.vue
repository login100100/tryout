<script setup lang="ts">
const props = defineProps<{
  text: string;
}>();
</script>

<template>
    <div class="text-4xl dark:text-white text-black p-3 font-extrabold">
      {{ text }}
    </div>
</template>
