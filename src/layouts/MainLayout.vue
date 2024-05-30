<template>
  <q-layout view="lHh Lpr lFf" class="app-layout">
    <q-header class="bg-transparent">
      <q-toolbar class="full-width row">

        <div v-if="canGoBack" class="col-auto">
          <q-btn
            flat
            dense
            round
            icon="chevron_left"
            color="black"
            @click="goBack"
          />
        </div>

        <q-toolbar-title class="col-auto text-subtitle1 text-weight-bold ellipsis">
          {{ app.layoutHeader.value }}
        </q-toolbar-title>
        
        <!-- <div class="col-auto">
          <q-btn
            flat
            dense
            round
            icon="settings"
            aria-label="Menu"
            color="blue-9"
            @click="toggleSettings"
          />
        </div> -->

      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <settings-dialog ref="settingsDialog" />
  </q-layout>
</template>

<style lang="scss">
.app-layout {
  background-color: var(--background);
}
</style>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router';

import SettingsDialog from 'components/Settings/SettingsDialog.vue'
import { app } from 'src/boot/app';

const router = useRouter()

const settingsDialog = ref<InstanceType<typeof SettingsDialog> | null>(null)

const toggleSettings = () => {
  settingsDialog.value?.toggleVisibility()
}


const canGoBack = computed(() => {
  return router.currentRoute.value.path !== '/'
})
const goBack = () => {
  router.go(-1)
}
</script>
