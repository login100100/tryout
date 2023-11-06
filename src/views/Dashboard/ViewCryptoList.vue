<script setup lang="ts">
import {
  ref,
  computed,
  inject,
  DefineComponent,
  onMounted,
  watch,
  Ref,
} from "vue";
import {
  BaseTitle,
  BaseInputFilter,
  BaseSelectFilter,
  BaseDynamicSorts,
  BaseDynamicList,
  BaseLineCrypto,
  BaseLoader,
} from "@/app.organizer";
import { useCryptoStore } from "@/stores/crypto";
import { useI18n } from "vue-i18n";
import { TCryptoData } from "@/stores/crypto.types";
import { IAppProvider } from "@/providers/app";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";

type TEventLists = {
  newList: TCryptoData[];
  oldList: TCryptoData[];
};

const App = inject<IAppProvider>("App");

const props = defineProps<{
  title: string;
  cryptoList: Map<string, TCryptoData>;
  component: DefineComponent<any, any, any>;
}>();

const { t: print } = useI18n();

const cryptoStore = useCryptoStore();
const {
  currencyActive,
  currenciesList,
  isReadyCategories,
  isReadyCurrencies,
  isReadyCryptoList,
} = storeToRefs(cryptoStore);

const { fetchCryptosInfos, setCurrencyActive } = cryptoStore;
const isReadyCryptoStore = computed(
  () => isReadyCategories.value && isReadyCurrencies.value && isReadyCryptoList.value
);

const itemsByPage = 150;
const dynamicController = ref() as Ref<typeof BaseDynamicList>;
const refInputFilter = ref() as Ref<typeof BaseInputFilter>;

const updatePricesForList = ({ newList, oldList }: TEventLists) => {
  const toUpdatePricesList = newList.filter((e) => {
    if (!e.pricesByCurrencies[currencyActive.value]) return true;
    return !oldList.find((f) => e.id === f.id);
  });
  fetchCryptosInfos(toUpdatePricesList);
};

const currenciesListOptions = computed(() => {
  return currenciesList.value.map((c) => {
    return {
      value: c,
      label: c,
    };
  });
});

const route = useRoute();
watch(
  () => route.name,
  () => {
    if (refInputFilter) refInputFilter.value.reset();
    if (dynamicController) dynamicController.value.onReset();
  }
);

onMounted(async () => {
  fetchCryptosInfos(
    Array.from(props.cryptoList)
      .map(([key, value]) => value)
      .slice(0, itemsByPage)
  );
});
</script>

<template>
  <div v-if="!isReadyCryptoStore" class="flex flex-1 relative">
    <BaseLoader :text="print('loading_data')" />
  </div>
  <div
    v-else
    class="flex flex-1 flex-col pt-16 w-full lg:w-5/6 max-w-screen-xl self-center"
  >
    <div class="flex flex-col max-w-screen w-full bg-blue mx-auto">
      <div class="flex grid grid-cols-1 md:grid-cols-5">
        <div class="flex col-span-2 justify-center md:justify-start">
          <BaseTitle :text="title" class="-mt-3 mr-4 a-05 fadeInLeft" />
        </div>
        <div class="flex col-span-3 items-center justify-center md:justify-start mb-2 md:mb-0">
          <BaseInputFilter
            ref="refInputFilter"
            index="name"
            :search-indexes="['name', 'symbol']"
            :controller="dynamicController"
            class="rounded-l-full h-10 shadow p-2 outline-0 a-05 d-500 fadeInDown"
            :placeholder="print('search_a_name') + '...'"
          />
          <BaseSelectFilter
            index="currency"
            :default="currencyActive"
            :options="currenciesListOptions"
            @onChange="setCurrencyActive"
            class="rounded-r-full h-10 shadow uppercase font-bold pl-3 a-08 d-500 fadeInDown"
          />
        </div>
      </div>
      <div class="flex flex-1 mt-1">
        <BaseDynamicSorts
          class="h-10 pb-1 rounded-r-full shadowshadow a-05 d-200 fadeInDown"
          :controller="dynamicController"
        />
      </div>
    </div>

    <div class="db-list flex-1 flex flex-col p-1">
      <BaseDynamicList
        class="d-400 a-04 fadeInUp"
        component-key="id"
        ref="dynamicController"
        :items="props.cryptoList"
        :items-by-bloc="itemsByPage"
        :component="BaseLineCrypto"
        :watcher="currencyActive"
        :no-result-text="print('no_result')"
        :loader-color="App?.theme.value === 'dark' ? 'white' : 'black'"
        @onRequestNextBloc="(data) => updatePricesForList(data as TEventLists)"
      />
    </div>
  </div>
</template>

<style lang="scss"></style>
