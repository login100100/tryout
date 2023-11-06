<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useMeta } from "vue-meta";
import { LayoutDashboard, ViewCryptoList, BaseLineCrypto } from "../app.organizer";

import { ROUTE_CRYPTO_OVERVIEW, ROUTE_CRYPTO_FAVORITES } from "../app.routes";
import { useCryptoStore } from "@/stores/crypto";
import { useI18n } from "vue-i18n";

useMeta({
  title: "Cryptoleet",
  description: "Dashboard",
});

const router = useRouter();
const routeIsHome = computed(
  () => router.currentRoute.value.name === ROUTE_CRYPTO_OVERVIEW.name
);
const routeIsFavorites = computed(
  () => router.currentRoute.value.name === ROUTE_CRYPTO_FAVORITES.name
);

const { t: print } = useI18n();

const {
  cryptoList,
  cryptoFavorites,
} = useCryptoStore();

const viewProps = computed(() => {
  return {
    title: routeIsHome.value ? print('cryptocurrency_prices') : print('cryptocurrency_favorites'),
    cryptoList: routeIsHome.value ? cryptoList : cryptoFavorites,
    component: BaseLineCrypto,
  }
})

</script>

<template>
  <LayoutDashboard>
    <ViewCryptoList
      v-if="routeIsHome || routeIsFavorites"
      v-bind="viewProps"
    />
    <router-view v-else />
  </LayoutDashboard>
</template>

<style lang="scss"></style>
