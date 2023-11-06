<script setup lang="ts">
  import { onMounted, provide } from "vue";
  import "./assets/css/index.css";
  import "./assets/css/animate.css";
  import { useAppProvider, IAppProvider } from "@/providers/app";
  import { useRouter } from "vue-router";
  import { useCryptoStore } from '@/stores/crypto';
  import { useI18n } from "vue-i18n";

  const router = useRouter();
  const App: IAppProvider = useAppProvider(router);
  provide("App", App);
  
  const { locale } = useI18n();
  locale.value = App.lang.value;
  
  const {
    fetchCategoriesList,
    fetchCurrenciesList,
    fetchCryptoList,
  } = useCryptoStore();
  
  onMounted(() => {
    fetchCurrenciesList();
    fetchCategoriesList()
    fetchCryptoList();
  })
</script>

<template>
  <div id="app" :class="[App.theme.value]">
    <router-view />
  </div>
</template>
