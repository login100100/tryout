<script setup lang="ts">
import { useRouter } from "vue-router";
import { ROUTE_CRYPTO_OVERVIEW } from "@/app.routes";
import { computed } from "vue";
import { LayoutDashboard} from "../app.organizer";

const router = useRouter();

const haveHistoryNavigation = computed(() => {
  if (window.history.state === null) return false;
  return true;
})

const goBackHistory = () => {
  router.options.history.go(-1)
}
</script>

<template>
  <LayoutDashboard>
    <div class="flex flex-1 justify-center items-center flex-col">
      <div class="font-bold text-dark dark:text-white text-8xl">404</div>
      <div class="mt-2 text-dark dark:text-white text-xl">Page Not Found</div>
      <router-link
        :to="{ name: ROUTE_CRYPTO_OVERVIEW.name }"
        class="mt-2 text-dark dark:text-white text-sm underline"
      >
        Click here to go back home
      </router-link>
      <template v-if="haveHistoryNavigation">
        <div
          :to="{ name: ROUTE_CRYPTO_OVERVIEW.name }"
          class="mt-5 text-gray-400 dark:text-gray-600 text-xs underline"
          @click="(event) => goBackHistory()"
        >
          Or click where to go back in your router history
        </div>
      </template>
      <div class="mt-2 text-dark text-gray-300 dark:text-gray-600 text-xs">(It's better in production to adapt meta head for SEO, and auto-redirect.)</div>
    </div>
  </LayoutDashboard>
</template>

<style lang="scss"></style>
