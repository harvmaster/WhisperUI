import { ref } from 'vue'

import { UploadedAudioFile, app } from 'boot/app'

export const transcribeAudio = async (audioFile: UploadedAudioFile) => {
  audioFile.loading = true

  const formData = new FormData()
  formData.append('audio_file', audioFile.file)

  const queries = new URLSearchParams()
  queries.append('encode', app.settings.value.encode.toString())
  queries.append('task', app.settings.value.task.toLocaleLowerCase())
  // queries.append('language', app.settings.value.language)
  queries.append('word_timestamps', app.settings.value.timestamps.toString())
  queries.append('output', 'json')


  const url = new URL(app.settings.value.endpoint)
  url.search = queries.toString()
  console.log(url)

  try {
    // Fetch url with no-cors
    const response = await fetch(url.toString(), {
      method: 'POST',
      body: formData
      // mode: 'no-cors'
    })

    if (!response.ok) {
      console.error('failed to transcribe audio')
      console.error(response)
      return
    }

    const res = await response.json()
    console.log(res)
  } catch (error) {
    console.error('failed to transcribe audio', error)
    return
  } finally {
    audioFile.loading = false
  }
  
}

export default transcribeAudio
  