<template>
  <control-button
    icon="volume_up"
    @click="expand"
    class="row"
  >
    <template v-slot:after>
      <q-slider v-model="volume" class="volume-slider col-12" :class="expanded ? 'active-slider' : ''"  :min="0" :max="1" :step="0.01" />
    </template>
  </control-button>
</template>

<style lang="scss" scoped>

</style>

<script setup lang="ts">
import { ref } from 'vue'
import controlButton from 'src/components/Inputs/ControlButton.vue'

const volume = ref(0.5)

const expanded = ref(false)
const expand = () => {
  expanded.value = !expanded.value
}


</script>