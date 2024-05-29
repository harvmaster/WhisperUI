<template>
  <div class="row">
    <div class="col-12" v-for="sentence of transcript" :key="sentence.id">
      
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>

<script setup lang="ts">
import { TranscribedAudio } from 'src/types'

export type TranscriptProps = {
  transcript: TranscribedAudio[]
}

const props = defineProps<TranscriptProps>()




</script>