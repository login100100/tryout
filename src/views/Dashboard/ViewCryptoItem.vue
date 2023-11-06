<script setup lang="ts">
import { inject, computed, watch, ref, onMounted } from "vue";
import { BaseCardCrypto, BaseLoader } from "@/app.organizer";
import { useCryptoStore } from "@/stores/crypto";
import { useI18n } from "vue-i18n";
import { TCryptoData } from "@/stores/crypto.types";
import { IAppProvider } from "@/providers/app";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { ROUTE_CRYPTO_OVERVIEW } from "@/app.routes";


const App = inject<IAppProvider>("App");
const router = useRouter();

const id = router.currentRoute.value.params.id as string;

const item = ref<TCryptoData>()

const cryptoStore = useCryptoStore();

const {
  fetchCryptosInfos
} = cryptoStore;

const {
  currencyActive,
  currenciesList,
  cryptoList,
  isReadyCategories,
  isReadyCurrencies,
  isReadyCryptoList,
} = storeToRefs(cryptoStore);

const isReadyCryptoStore = computed(
  () => isReadyCategories.value && isReadyCurrencies.value && isReadyCryptoList.value
);

const { t: print }= useI18n();

watch(isReadyCryptoStore, (newState) => { 
  if (newState && id && registerItem()) fetchItemInfos();
});

watch(currencyActive, (newCrypto) => {
  fetchItemInfos()
})


const registerItem = () => {
  const storeItem = cryptoList.value.get(id as string);
  if (storeItem) { 
    item.value = storeItem;
    return true
  }
  else {
    router.push({ name: ROUTE_CRYPTO_OVERVIEW.name })
    return false;
  }
}
const fetchItemInfos = () => { 
  if (item.value) fetchCryptosInfos([item.value])
} 

onMounted(() => {
  if (isReadyCryptoStore.value) {
    registerItem()
    fetchItemInfos();
  }
})

</script>

<template>
  <div v-if="!isReadyCryptoStore || !item" class="flex flex-1 relative">
    <BaseLoader :text="print('loading_data')" />
    {{  isReadyCryptoStore ?'tru' :'false' }}
  </div>
  <div v-else-if="isReadyCryptoStore && item" class="flex flex-1 relative">
    <BaseCardCrypto :data="item" :item-id="item.id" />
  </div>
</template>

<style lang="scss"></style>
