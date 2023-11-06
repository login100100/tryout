<script setup lang="ts">
import { IAppProvider } from '@/providers/app';
import { inject } from 'vue';
import { useI18n } from 'vue-i18n';
import { Spinner } from '@/app.organizer';

const App = inject<IAppProvider>('App')

type Props = {
  text?: string
}

const props = withDefaults(defineProps<Props>(), {
  text: 'Loading',
})

</script>

<template>
    <div
      class="index-loading z-20 pt-20 mx-auto w-5/6 max-w-screen-xl flex-1 flex justify-center items-center"
    >
      <div class="text-3xl font-extrabold text-black dark:text-white">
        <Spinner :color="App?.theme.value === 'dark' ? 'white' : 'black'" />
        <div class="mt-5">{{ text }}</div>
      </div>
    </div>
</template>
