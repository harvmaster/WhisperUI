<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-transparent">
      <q-toolbar class="full-width row">

        <div class="col-auto">
          <q-btn
            flat
            dense
            round
            icon="chevron_left"
            color="black"
            @click="goBack"
          />
        </div>

        <q-toolbar-title class="col-auto text-blue-9 text-h6 text-weight-bold ellipsis">
          {{ app.layoutHeader }}
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

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router';

import SettingsDialog from 'components/Settings/SettingsDialog.vue'
import { app } from 'src/boot/app';

const router = useRouter()

const settingsDialog = ref<InstanceType<typeof SettingsDialog> | null>(null)

const toggleSettings = () => {
  settingsDialog.value?.toggleVisibility()
}

const goBack = () => {
  router.go(-1)
}
</script>
