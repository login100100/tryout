<script setup lang="ts">
const props = defineProps<{
  index: string;
  default: string;
  options: 
    {
      label: string;
      value: string;
    }[]
}>();

const emit = defineEmits<{
  (e: "onChange", value: string): void;
}>();

const onChange = (e: Event) => {
  const dom = e.target as HTMLTextAreaElement;
  const value = dom.value;
  try {
    emit("onChange", value);
  } catch (e) {
    console.warn(e);
  }
};
</script>

<template>
  <select @change="(event) => onChange(event)">
    <option
      v-for="(item, i) in props.options"
      :key="`opt-${i}`"
      :value="item.value"
      :selected="item.value === props.default"
    >
      {{ item.label }}
    </option>
  </select>
</template>
