import { defineStore } from "pinia";
import axios from "axios";
import useLocalStorage from "@/composables/useLocalStorage";
import { LOCALSTORAGE_CRYPTO_CURRENCY, LOCALSTORAGE_CRYPTO_FAVORITES } from "@/app.storages";
import type {
  TCryptoDefaultStates,
  TCryptoData,
  TEntryCategoryData,
  TEntryCryptoData,
  TCategoryData,
} from "@/stores/crypto.types";
import { Ref, computed, reactive, ref } from "vue";

const URL_API = "https://api.coingecko.com/api/v3";

const _loadFavorites = (): Map<string,TCryptoData> => {
  const favorites: [string, TCryptoData][] = useLocalStorage.get(LOCALSTORAGE_CRYPTO_FAVORITES)
  if (favorites && Object.entries(favorites).length)
  {
    const map = new Map<string,TCryptoData>();
    for (const [key, value] of Object.values(favorites)) map.set(key, value);
    return map
  }
  else return new Map();
}

const useCrypto = () => {
  const cryptoList = reactive(new Map<string, TCryptoData>());
  const currenciesList: Ref<string[]> = ref([]);
  const categoriesList: Ref<TCategoryData[]> = ref([]);
  const currencyActive: Ref<string> = ref(useLocalStorage.get(LOCALSTORAGE_CRYPTO_CURRENCY) || 'eur');
  const categoryActive: Ref<string | null> = ref(null);
  const cryptoFavorites = _loadFavorites();

  const isReadyCategories = computed(() => !!categoriesList.value.length);
  const isReadyCurrencies = computed(() => !!currenciesList.value.length);
  const isReadyCryptoList = computed(() => !!cryptoList.size);

  const fetchCurrenciesList = async () : Promise<void> => {
    //DevNote: It's for cache API request for dev and not pay it ...
    if (!isReadyCurrencies.value) {
      const cacheCurrencies = useLocalStorage.get("temp_currencies");
      if (cacheCurrencies && Object.entries(cacheCurrencies).length) {
        currenciesList.value = cacheCurrencies;
      } 
      else {
        const response = await axios.get(
          `${URL_API}/simple/supported_vs_currencies`
        );
        if (response.data.length) currenciesList.value = response.data;
        useLocalStorage.set("temp_currencies", response.data);
      }
    }
  };

  const fetchCategoriesList = async () : Promise<void> => {
    if (!isReadyCategories.value) {
      //DevNote: It's for cache API request for dev and not pay it ...
      const cacheCategories = useLocalStorage.get("temp_categories");

      if (cacheCategories && Object.entries(cacheCategories).length) categoriesList.value = cacheCategories;
      else {
        const response = await axios.get(`${URL_API}/coins/categories/list`);
        if (response.data.length)
          response.data.forEach((e: TEntryCategoryData) => {
            categoriesList.value.push({ id: e.category_id, name: e.name });
          });
        useLocalStorage.set("temp_categories", categoriesList.value);
      }
    }
  };

  const fetchCryptoList = async () : Promise<void> => {
    //DevNote: It's for cache API request for dev and not pay it ...
    if (!isReadyCryptoList.value) {
      const cacheCryptoList = useLocalStorage.get("temp_crypto");
      if (cacheCryptoList && Object.entries(cacheCryptoList).length) {
        cacheCryptoList.forEach(([index, e]:[index: string, e: TCryptoData]) => {
          cryptoList.set(e.id, { ...e, pricesByCurrencies: {} });
        });
      } else {
        const response = await axios.get(`${URL_API}/coins/list`);
        if (response.data.length)
          for (let e of response.data) {
            cryptoList.set(e.id, { ...e, pricesByCurrencies: {} });
          }
        useLocalStorage.set("temp_crypto", Array.from(cryptoList))
      }
    }
  };

  const fetchCryptosInfos = async (optimizedList: TCryptoData[]) : Promise<void> => {
    const requestIds = optimizedList.filter((crypto) =>
    !crypto.pricesByCurrencies[currencyActive.value] ? true : false
  );
  if (requestIds.length) {
    const ids = requestIds.map((e) => e.id);

    const query = {
      ids: ids.join(","),
      vs_currency: currencyActive.value,
      per_page: 250,
      include_24h_vol: true,
      include_24hr_change: true,
      include_last_updated_at: true,
      sparkline: true,
    };

    const response = await axios.get(`${URL_API}/coins/markets`, {
      params: query,
    });

    if (response.data) {
        const responseArray: TEntryCryptoData[] = Object.values(
          response.data
        );
        if (responseArray.length) {
          responseArray.map((value) => {
            const key = value.id;
            const item = cryptoList.get(key);
            if (item) {
              item.image = value.image;
              item.sparkline_in_7d = value.sparkline_in_7d.price
              item.pricesByCurrencies[currencyActive.value] = {
                current_price: value.current_price,
                market_cap: value.market_cap,
                total_volume: value.total_volume,
                price_change_24h: value.price_change_24h,
              };
              cryptoList.set(key, item);
              if (cryptoFavorites.get(key)) cryptoFavorites.set(key, item);
            }
          });
        }
      }
    }
  };

  const setCurrencyActive = (currency: string) => {
    currencyActive.value = currency;
    useLocalStorage.set(LOCALSTORAGE_CRYPTO_CURRENCY, currencyActive.value);
  };

  const addFavorite = (crypto: TCryptoData) => {
    cryptoFavorites.set(crypto.id, {
      id: crypto.id,
        name: crypto.name,
        symbol: crypto.name,
        pricesByCurrencies: {}
    });
    useLocalStorage.set(LOCALSTORAGE_CRYPTO_FAVORITES, Array.from(cryptoFavorites));
  };

  const removeFavorite = (crypto: TCryptoData) => {
    cryptoFavorites.delete(crypto.id);
    useLocalStorage.set(LOCALSTORAGE_CRYPTO_FAVORITES, Array.from(cryptoFavorites));
  }
}

export default useCrypto;