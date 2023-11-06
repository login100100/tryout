import { defineAsyncComponent } from "vue";
/************************************************
# Layouts list
************************************************/
export const LayoutDashboard = defineAsyncComponent(
  () => import("./layouts/LayoutDashboard.vue")
);

/************************************************
# Views List
************************************************/
export const ViewCryptoList = defineAsyncComponent(
  () => import("./views/Dashboard/ViewCryptoList.vue")
);

/************************************************
 # Commons components list
 ************************************************/
export const DashboardHeader = defineAsyncComponent(
  () => import("./components/Dashboard/DashboardHeader.vue")
);
export const BaseTitle = defineAsyncComponent(
  () => import("./components/BaseTitle.vue")
);
export const BaseInputFilter = defineAsyncComponent(
  () => import("./components/BaseInputFilter.vue")
);
export const BaseSelectFilter = defineAsyncComponent(
  () => import("./components/BaseSelectFilter.vue")
);
export const BaseDynamicSorts = defineAsyncComponent(
  () => import("./components/BaseDynamicSorts.vue")
);
export const BaseDynamicList = defineAsyncComponent(
  () => import("./components/BaseDynamicList.vue")
);
export const BaseCardCrypto = defineAsyncComponent(
  () => import("./components/BaseCardCrypto.vue")
);
export const BaseLineCrypto = defineAsyncComponent(
  () => import("./components/BaseLineCrypto.vue")
);
export const BaseCryptoChart = defineAsyncComponent(
  () => import("./components/BaseCryptoChart.vue")
);
export const BaseLoader = defineAsyncComponent(
  () => import("./components/BaseLoader.vue")
);
export const FavoriteStar = defineAsyncComponent(
  () => import("./components/FavoriteStar.vue")
);
export const Flag = defineAsyncComponent(
  () => import("./components/Flag.vue")
);
/************************************************
 # FirstLoad Components List
 ************************************************/

export { default as Spinner } from "./components/Spinner8balls.vue";
