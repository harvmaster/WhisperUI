<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-blue-4">
      <q-toolbar class="full-width row justify-end">

        <q-toolbar-title class="col-auto text-blue-9 text-h6 text-weight-bold">
          WhisperUI
        </q-toolbar-title>
        
        <div class="col-auto">
          <q-btn
            flat
            dense
            round
            icon="settings"
            aria-label="Menu"
            color="blue-9"
            @click="toggleSettings"
          />
        </div>

      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <settings-dialog ref="settingsDialog" />
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import SettingsDialog from 'components/Settings/SettingsDialog.vue'

const settingsDialog = ref<InstanceType<typeof SettingsDialog> | null>(null)

const toggleSettings = () => {
  settingsDialog.value?.toggleVisibility()
}
</script>
