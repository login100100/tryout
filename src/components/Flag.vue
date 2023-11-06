<script setup lang="ts">

type TProps = {
  type: 'en' | 'fr';
  width?: string;
  isActive: boolean;
};
const props = withDefaults(defineProps<TProps>(), {
  width: "30px",
  isLoading: false,
  isActive: true,
});

const imageSource = new URL(`../assets/img/flags/${props.type}.png`, import.meta.url).href

</script>

<template>
  <div
    class="relative inline-block h-50 h-auto"
    :style="{ width: props.width }"
  >
    <img
      :class="{ isloading: props.isLoading, active: props.isActive }"
      class="el-flags"
      :src="imageSource"
      style="width: 100%"
    />
  </div>
</template>

<style>
.el-flags {
  transition: all 0.4s;
}

.el-flags.active {
  border-radius: 5px;
  border: 2px solid rgba(255, 255, 255, 0.7);
}

.el-flags:not(.active) {
  border-radius: 5px;
  cursor: pointer;
  opacity: 0.5;
  border: 2px solid rgba(0, 0, 0, 0);
}

.el-flags.isloading {
  border-radius: 5px;
  border: 2px dashed rgba(255, 255, 255, 0.4);
}
</style>
