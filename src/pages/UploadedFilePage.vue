<template>
  <q-page class="row justify-center">
    <div class="col-12">
      <audio-file v-if="file" :file="file" />
    </div>
  </q-page>
</template>

<style lang="scss" scoped>

</style>

<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { app } from 'boot/app'

import AudioFile from 'components/AudioFile/AudioFile.vue'

const router = useRouter()

const file = computed(() => {
  const id = router.currentRoute.value.params.id
  return app.files.value.find(file => file.id === id)
})

watch(file, () => {
  if (!file.value) router.push('/')
})

onMounted(() => {
  if (!file.value) router.push('/')
})
</script>