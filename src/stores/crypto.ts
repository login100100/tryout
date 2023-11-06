import { defineStore } from "pinia";
import axios from "axios";
import useLocalStorage from "@/composables/useLocalStorage";
import { LOCALSTORAGE_CRYPTO_CURRENCY, LOCALSTORAGE_CRYPTO_FAVORITES } from "@/app.storages";
import type {
  TCryptoDefaultStates,
  TCryptoData,
  TEntryCategoryData,
  TEntryCryptoData,
} from "./crypto.types";

const URL_API = "https://api.coingecko.com/api/v3";

export const useCryptoStore = defineStore({
  id: "crypto",

  state: () =>
    ({
      cryptoList: new Map<string, TCryptoData>(),
      currenciesList: [],
      categoriesList: [],
      currencyActive: useLocalStorage.get(LOCALSTORAGE_CRYPTO_CURRENCY) || 'eur',
      categoryActive: null,
      cryptoFavorites: _loadFavorites(),
    } as TCryptoDefaultStates),

  getters: {
    
    isReadyCategories(state: TCryptoDefaultStates) {
      return state.categoriesList.length ? true : false;
    },
    isReadyCurrencies(state: TCryptoDefaultStates) {
      return state.currenciesList.length ? true : false;
    },
    isReadyCryptoList(state: TCryptoDefaultStates) {
      return state.cryptoList.size ? true : false;
    },
  },

  actions: {
    async fetchCurrenciesList(): Promise<void> {
      //DevNote: It's for cache API request for dev and not pay it ...
      if (!this.isReadyCurrencies) {
        const cacheCurrencies = useLocalStorage.get("temp_currencies");
        if (cacheCurrencies && Object.entries(cacheCurrencies).length) {
          this.currenciesList = cacheCurrencies;
        } 
        else {
          const response = await axios.get(
            `${URL_API}/simple/supported_vs_currencies`
          );
          if (response.data.length) this.currenciesList = response.data;
          useLocalStorage.set("temp_currencies", response.data);
        }
      }
    },

    async fetchCategoriesList(): Promise<void> {
      if (!this.isReadyCategories) {
        //DevNote: It's for cache API request for dev and not pay it ...
        const cacheCategories = useLocalStorage.get("temp_categories");

        if (cacheCategories && Object.entries(cacheCategories).length) this.categoriesList = cacheCategories;
        else {
          const response = await axios.get(`${URL_API}/coins/categories/list`);
          if (response.data.length)
            response.data.forEach((e: TEntryCategoryData) => {
              this.categoriesList.push({ id: e.category_id, name: e.name });
            });
          useLocalStorage.set("temp_categories", this.categoriesList);
        }
      }
    },

    async fetchCryptoList(): Promise<void> {
      //DevNote: It's for cache API request for dev and not pay it ...
      if (!this.isReadyCryptoList) {
        const cacheCryptoList = useLocalStorage.get("temp_crypto");
        if (cacheCryptoList && Object.entries(cacheCryptoList).length) {
          cacheCryptoList.forEach(([index, e]:[index: string, e: TCryptoData]) => {
            this.cryptoList.set(e.id, { ...e, pricesByCurrencies: {} });
          });
        } else {
          const response = await axios.get(`${URL_API}/coins/list`);
          if (response.data.length)
            for (let e of response.data) {
              this.cryptoList.set(e.id, { ...e, pricesByCurrencies: {} });
            }
          useLocalStorage.set("temp_crypto", Array.from(this.cryptoList))
        }
      }
    },

    async fetchCryptosInfos(optimizedList: TCryptoData[]): Promise<void> {
      const requestIds = optimizedList.filter((crypto) =>
        !crypto.pricesByCurrencies[this.currencyActive] ? true : false
      );
      if (requestIds.length) {
        const ids = requestIds.map((e) => e.id);

        const query = {
          ids: ids.join(","),
          vs_currency: this.currencyActive,
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
              const item = this.cryptoList.get(key);
              if (item) {
                item.image = value.image;
                item.sparkline_in_7d = value.sparkline_in_7d.price
                item.pricesByCurrencies[this.currencyActive] = {
                  current_price: value.current_price,
                  market_cap: value.market_cap,
                  total_volume: value.total_volume,
                  price_change_24h: value.price_change_24h,
                };
                this.cryptoList.set(key, item);
                if (this.cryptoFavorites.get(key)) this.cryptoFavorites.set(key, item);
              }
            });
          }
        }
      }
    },

    setCurrencyActive(currency: string) {
      this.currencyActive = currency;
      useLocalStorage.set(LOCALSTORAGE_CRYPTO_CURRENCY, this.currencyActive);
    },

    addFavorite(crypto: TCryptoData) {
      this.cryptoFavorites.set(crypto.id, {
        id: crypto.id,
        name: crypto.name,
        symbol: crypto.name,
        pricesByCurrencies: {}
      });
      useLocalStorage.set(LOCALSTORAGE_CRYPTO_FAVORITES, Array.from(this.cryptoFavorites));
    },

    removeFavorite(crypto: TCryptoData) {
      this.cryptoFavorites.delete(crypto.id);
      useLocalStorage.set(LOCALSTORAGE_CRYPTO_FAVORITES, Array.from(this.cryptoFavorites));
    },
  },
});


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