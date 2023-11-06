<script setup lang="ts">
import type { BaseDynamicList } from "@/app.organizer";
import { ref } from "vue";

const props = defineProps<{
  index: string;
  searchIndexes: string[];
  controller: typeof BaseDynamicList;
}>();

const inputValue = ref("");

const updateController = (e: Event) => {
  const dom = e.target as HTMLTextAreaElement;
  const value = dom.value;
  try {
    if (props.controller) {
      props.controller.onUpdateFilters({
        ref: props.index,
        indexes: props.searchIndexes,
        values: [value],
      });
    }
  } catch (e) {
    console.warn(e);
  }
};

const reset = () => inputValue.value = "";

defineExpose({
  reset
})

</script>

<template>
  <input v-model="inputValue" type="text" @input="updateController" />
</template>

<style lang="scss" scoped>
  *:focus {outline:0px none transparent;}
</style>