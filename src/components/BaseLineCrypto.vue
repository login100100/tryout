<script setup lang="ts">
import { computed, ref, inject } from "vue";
import { storeToRefs } from "pinia";
import { TCryptoData } from "@/stores/crypto.types";
import { useCryptoStore } from "@/stores/crypto";
import { BaseCryptoChart, FavoriteStar, Spinner } from "@/app.organizer";
import { useIntersectionObserver } from "@vueuse/core";
import useCurrencySymbol from "@/composables/useCurrencySymbol";

import { ROUTE_CRYPTO_VIEW } from "@/app.routes";

const props = defineProps<{
    itemId: string,
}>();

const cryptoStore = useCryptoStore();

const { currencyActive, cryptoList, cryptoFavorites } = storeToRefs(cryptoStore);
const { addFavorite, removeFavorite } = cryptoStore;

const crypto = ref(cryptoList.value.get(props.itemId) as TCryptoData)

const currencySymbol = computed(() => useCurrencySymbol(currencyActive.value));

const chartElement = ref();
const chartIsVisible = ref(true);

const isInFavorites = computed(() =>
  crypto.value ? (cryptoFavorites.value.get(crypto.value.id) ? true : false): false
);

const toggleFavorite = () => {
  if (isInFavorites.value && crypto.value) {
    removeFavorite(crypto.value);
  } else if (crypto.value) addFavorite(crypto.value);
};

useIntersectionObserver(chartElement, ([{ isIntersecting }]) => {
  chartIsVisible.value = true;
});

const calculatedSparkline = computed(() => {
  if (!crypto?.value?.sparkline_in_7d?.length) return [] as number[];

  const toReduce = crypto.value.sparkline_in_7d;

  const reduced = toReduce.reduce((acc, val, index) => {
    if (index && index % 23 === 0) acc.push(val);
    return acc;
  }, new Array<number>());

  return reduced.length > 3 ? reduced : [] as number[];
});

const orderedSparkLabels = computed(() => {
  if (!calculatedSparkline.value) return [];
  return calculatedSparkline.value.map((_, index: number) => {
    if (calculatedSparkline.value) {
      return "J" + (index - calculatedSparkline.value.length);
    } else return "";
  });
});
</script>

<template>
  <div
    class="line-crypto w-100 block flex flex-1 h-16 mb-1 cursor-pointer"
    @click="
      (event) =>
        $router.push({
          name: ROUTE_CRYPTO_VIEW.name,
          params: { id: crypto.id },
        })
    "
  >
    <div class="flex w-20 pl-2 pr-2 items-center">
      <img
        v-if="crypto.image"
        :src="crypto.image"
        class="w-8 h-8 border-round rounded-full"
      />
      <Spinner v-else color="#DDD" size="small" class="inline-block mx-auto" />
    </div>
    <div
      class="flex w-48 pl-4 pr-4 items-center text-black dark:text-white p-2 font-bold"
    >
      {{
        crypto.name.length > 20 ? crypto.name.slice(0, 20) + "..." : crypto.name
      }}
    </div>
    <div class="flex pl-4 pr-4 w-44 items-center text-black dark:text-white">
      <template
        v-if="crypto?.pricesByCurrencies[currencyActive]?.current_price"
      >
        {{ crypto.pricesByCurrencies[currencyActive].current_price }}
        {{ currencySymbol }}
      </template>
      <div v-else class="text-sm border-1 text-gray-300">N/A</div>
    </div>
    <div class="flex pl-4 pr-4 w-36 items-center text-black dark:text-white">
      <template v-if="crypto?.pricesByCurrencies[currencyActive]?.market_cap">
        {{ crypto.pricesByCurrencies[currencyActive].market_cap }}
        {{ currencySymbol }}
      </template>
      <div v-else class="text-sm border-1 text-gray-300">N/A</div>
    </div>
    <div class="flex pl-4 pr-4 w-40 items-center text-black dark:text-white">
      <template v-if="crypto?.pricesByCurrencies[currencyActive]?.total_volume">
        {{ crypto.pricesByCurrencies[currencyActive].total_volume }}
        {{ currencySymbol }}
      </template>
      <div v-else class="text-sm border-1 text-gray-300">N/A</div>
    </div>
    <div
      class="flex flex-1 w-200 items-center text-black dark:text-white pr-3"
      :ref="(ref) => (chartElement = ref)"
    >
      <template v-if="calculatedSparkline && chartIsVisible">
        <BaseCryptoChart
          :sparkline="calculatedSparkline"
          :labels="orderedSparkLabels"
          :grid="false"
          :tooltip="false"
          :win="
            calculatedSparkline[0] <
            calculatedSparkline[calculatedSparkline.length - 1]
          "
        />
      </template>
      <div v-else class="text-sm border-1 text-gray-300">N/A</div>
    </div>
    <div
      class="flex w-14 items-center justify-center pr-3 cursor-pointer"
      @click.prevent.stop="toggleFavorite"
    >
      <FavoriteStar :active="isInFavorites" />
    </div>
  </div>
</template>

<style lang="scss">
.line-crypto {
  transition: all 0.2s;
}

#app.dark {
  .line-crypto:hover {
    background-color: rgba(255, 255, 255, 0.02);
  }
}

#app.light {
  .line-crypto:hover {
    background-color: rgba(0, 0, 0, 0.02);
  }
}
</style>
