<script setup lang="ts">
import { ref, onMounted, computed, watch, DefineComponent, defineExpose, VNodeRef } from "vue";
import { useInfiniteScroll } from "@vueuse/core";
import { Spinner } from "@/app.organizer";
import { TDynamicSort } from "./BaseDynamicSorts.vue";
import { useScroll } from '@vueuse/core'
import { TCryptoData } from "@/stores/crypto.types";


export type TParamsUpdateFilters = {
  ref: string,
  indexes: string[],
  values: string[],
};

type TDynamicsFilters = {
  [ref: string] : {
    indexes: string[],
    values: string[],
  }
};

const props = defineProps<{
  items: Map<string, any>;
  itemsByBloc: number;
  component: DefineComponent<any, any, any>;
  componentKey: string;
  watcher: any;
  noResultText: string
  loaderColor?: string
}>();

const emit = defineEmits<{
  (e: "onRequestNextBloc", {}): void;
}>();

const blocCurrent = ref(0);
const scroller = ref<VNodeRef & HTMLElement>();
const dynamicLoading = ref(false);
const dynamicFilters = ref({} as TDynamicsFilters);
const dynamicSorter = ref({} as TDynamicSort);
const dynamicWatcher = computed(() => props.watcher);



const filteredList = computed(() => {
  const filters = Object.entries(dynamicFilters.value)
  if (!filters.length) return Array.from(props.items).map(([_, value]) => value)
  return Array.from(props.items).map(([_, value]) => value).filter((item, index) => {
    for (let [ref, { indexes, values }] of filters) {
      for (let index of indexes) {
        for (let value of values) {
          if (item[index].toLowerCase().includes(value.toLowerCase())) return true
        }
      }
    }
  })
})

const optimizedList = computed(() => { 
  return filteredList.value.slice(0, blocCurrent.value * props.itemsByBloc)
})

const orderedList = computed<TCryptoData[]>(() => {
  try {
  let ordered = optimizedList.value.sort(dynamicSorter.value.sorter);
  if (dynamicSorter.value.order === "desc") ordered = ordered.reverse();
  return ordered;
  }
  catch(e) {
    console.warn(e);
    return optimizedList.value
  }
})

let timeoutUpdateFilters: NodeJS.Timeout;

const onUpdateFilters = ({
  ref,
  indexes,
  values
}: TParamsUpdateFilters) => {
  values = values.filter((e) => (e && e !== ''));
  if (values.length) {
    clearTimeout(timeoutUpdateFilters);
    dynamicLoading.value = true;
    timeoutUpdateFilters = setTimeout(() => {
        blocCurrent.value = 1;
        dynamicLoading.value = false;
        dynamicFilters.value[ref] = {
        indexes,
        values,
      };
    }, 650)
  } else delete dynamicFilters.value[ref];
};

const onUpdateSorters = (sorter: TDynamicSort) => {
  dynamicSorter.value = sorter;
};

const onReset = async() => {
  dynamicFilters.value = {} as TDynamicsFilters
  blocCurrent.value = 1;
  if (scroller.value) scroller.value.scrollTo(0,0);
}

watch(
  [orderedList, dynamicWatcher],
  ([newOptimizedList], [oldOptimizedList]) => {
    emit("onRequestNextBloc", {
      newList: newOptimizedList,
      oldList: oldOptimizedList,
    });
  }
);

useScroll(scroller, { behavior: 'smooth' })

useInfiniteScroll(
  scroller,
  () => {
    blocCurrent.value++;
  },
  { distance: 200 }
);

onMounted(() => {
  blocCurrent.value += 1;
});

defineExpose({
  onUpdateFilters,
  onUpdateSorters,
  onReset,
})

</script>

<template>
  <div
    ref="scroller"
    class="scroller h-10 overflow-y-scroll flex-auto"
  > 
    <div
      v-if="!orderedList.length"
      class="flex flex-1 h-full text-4xl font-bold justify-center items-center"
      :style="{ color: props.loaderColor }"
    >
      {{  props.noResultText }}
    </div>
    <Spinner v-else-if="dynamicLoading" :color="props.loaderColor" />
    <template v-else>
      <component
        :is="props.component"
        v-for="item in orderedList"
        :key="`${item[props.componentKey]}`"
        :item-id="item.id"
      />
    </template>
  </div>
</template>

<style lang="scss">
  .scroller {
    scrollbar-color: #687dfa rgba(0,0,0,0.1);
    scrollbar-width: thin;
  }
</style>
