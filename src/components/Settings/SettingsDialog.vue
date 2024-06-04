<template>
  <div class="settings-dialog" :class="[show && 'show']">
    <div class="fit row">
      <div class="col-12 settings-dialog-content row q-col-gutter-y-sm q-pa-md bg-background-2">

        <div class="col-12 row justify-end">
          <q-btn flat dense round icon="close" color="--text" @click="toggleVisibility" />
        </div>
        
        <!-- Actual settings -->
        <transition-group name="slide-in" tag="div" class="col-12 row q-col-gutter-y-sm">
          <div class="col-12 row" key="endpoint_input">
            <input class="col-12 minimal-input" v-model="app.settings.value.endpoint" outlined label="Whisper Endpoint" style="color: var(--text)" />
          </div>

          <div class="col-12 row" key="encode_checkbox">
            <q-checkbox v-model="app.settings.value.encode" label="Encode audio" color="--primary"/>
          </div>

          <div class="col-12 row" key="task_select">
            <!-- <q-select class="col-12" v-model="app.settings.value.task" borderless label="Task" :options="whisperOptions.tasks" /> -->
            <select class="col-12 minimal-select" v-model="app.settings.value.task" borderless label="Task">
              <option v-for="option in whisperOptions.tasks" :key="option" :value="option">{{ option }}</option>
            </select>
          </div>

          <div class="col-12 row" key="language_select" v-if="app.settings.value.task == 'Translate'" >
            <!-- <q-select class="col-12" v-model="app.settings.value.language" outlined label="Language" :options="whisperOptions.language"/> -->
            <select class="col-12 minimal-select" v-model="app.settings.value.language" outlined label="Language">
              <option v-for="option in whisperOptions.language" :key="option.value" :value="option.value">{{ option.label }}</option>
            </select>

          </div>

          <div class="col-12 row" key="timestmap_checkbox">
            <q-checkbox v-model="app.settings.value.timestamps" label="Timestamps" />
          </div>

        </transition-group>


      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.settings-dialog {
  width: 100%;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 2001; // 1 higher than quasar header (set to 2000)

  transform: translateY(-100%);
  transition: transform 0.5s;
}

.settings-dialog.show {
  transform: translateY(0);
}

.settings-dialog-content {
  // background-color: $blue-1;
  box-shadow: 0 0.1rem 1rem rgba(0, 0, 0, 0.1);
  border-radius: 0 0 2em 2em;
  width: 100%;
  max-height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 1em;
  box-sizing: border-box;
  position: relative;
}

.minimal-input {
  font-size: 1em;
  padding: 1em 1em;
  text-decoration: none;
  background-color: var(--background-100);
  border: none;
  border-radius: 1000em;
  color: var(--text);

  &:focus {
    outline: none; 
  }

  &::placeholder {
    color: var(--text);
  }
}

.minimal-select {
  font-size: 1em;
  padding: 1em 1em;
  text-decoration: none;
  background-color: var(--background-100);
  border: none;
  border-radius: 1000em;
  color: var(--text);

  &:focus {
    outline: none; 
  }

  &::placeholder {
    color: var(--text);
  }

  option {
    color: var(--text);
  
    &:hover {
      background-color: var(--background-100);
    }

    &:focus {
      background-color: var(--background-100);
    }

    &:active {
      background-color: var(--background-100);
    
    }

  }
}

@media screen and (min-width: 1000px) {
  .settings-dialog {
    width: 25em;
    padding-right: 1em
  }
}

.slide-in-move,
.slide-in-enter-active, .slide-in-leave-active {
  transition: all 0.5s;
}
.slide-in-enter-from, .slide-in-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}
.slide-in-leave-active {
  position: absolute;
}
</style>

<script setup lang="ts">
import { ref } from 'vue'
import { app } from 'boot/app'

const show = ref(false)

const toggleVisibility = () => {
  show.value = !show.value
}

const whisperOptions = ref({
  tasks: ['Translate', 'Transcribe'],
  language: [{ label: 'English', value: 'en' }, { label: 'Spanish', value: 'es' }, { label: 'French', value: 'fr' }, { label: 'German', value: 'de' }, { label: 'Italian', value: 'it' }, { label: 'Portuguese', value: 'pt' }, { label: 'Russian', value: 'ru' }, { label: 'Chinese', value: 'zh' }, { label: 'Japanese', value: 'ja' }, { label: 'Korean', value: 'ko' }, { label: 'Arabic', value: 'ar' }, { label: 'Hindi', value: 'hi' }, { label: 'Turkish', value: 'tr' }, { label: 'Dutch', value: 'nl' }, { label: 'Polish', value: 'pl' }, { label: 'Swedish', value: 'sv' }, { label: 'Norwegian', value: 'no' }, { label: 'Danish', value: 'da' }, { label: 'Finnish', value: 'fi' }, { label: 'Greek', value: 'el' }, { label: 'Czech', value: 'cs' }, { label: 'Hungarian', value: 'hu' }, { label: 'Romanian', value: 'ro' }, { label: 'Ukrainian', value: 'uk' }, { label: 'Thai', value: 'th' }, { label: 'Vietnamese', value: 'vi' }, { label: 'Indonesian', value: 'id' }, { label: 'Malay', value: 'ms' }, { label: 'Filipino', value: 'fil' }, { label: 'Hebrew', value: 'he' }, { label: 'Urdu', value: 'ur' }, { label: 'Bengali', value: 'bn' }, { label: 'Tamil', value: 'ta' }, { label: 'Telugu', value: 'te' }, { label: 'Marathi', value: 'mr' }, { label: 'Gujarati', value: 'gu' }, { label: 'Kannada', value: 'kn' }, { label: 'Punjabi', value: 'pa' }, { label: 'Malayalam', value: 'ml' }, { label: 'Odia', value: 'or' }, { label: 'Assamese', value: 'as' }, { label: 'Maithili', value: 'mai' }, { label: 'Santali', value: 'sat' }, { label: 'Kashmiri', value: 'ks' }, { label: 'Nepali', value: 'ne' }, { label: 'Sindhi', value: 'sd' }, { label: 'Konkani', value: 'kok' }, { label: 'Dogri', value: 'doi' }, { label: 'Manipuri', value: 'mni' }, { label: 'Bodo', value: 'brx' }, { label: 'Sanskrit', value: 'sa' }]
})

export type SettingsExposed = {
  toggleVisibility: () => void
  show: boolean
}

defineExpose({ toggleVisibility, show })
</script>