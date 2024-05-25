<template>
  <control-button
    :icon="props.icon"
    @click="props.onClick"

  >
    <template v-slot:after>
      <q-slider v-model="props.value" class="volume-slider" :class="props.showVolume ? 'active-slider' : ''"  :min="0" :max="1" :step="0.01" />
    </template>
  </control-button>
</template>

<style lang="scss" scoped>

</style>

<script setup lang="ts">
import controlButton from 'src/components/Inputs/ControlButton.vue'


</script>