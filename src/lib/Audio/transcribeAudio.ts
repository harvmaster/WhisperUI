import { app } from 'boot/app'
import { TranscribedAudio } from 'src/types'

export const transcribeAudio = async (file: File): Promise<TranscribedAudio> => {
  const formData = new FormData()
  formData.append('audio_file', file)

  const queries = new URLSearchParams()
  queries.append('encode', app.settings.value.encode.toString())
  queries.append('task', app.settings.value.task.toLocaleLowerCase())
  // queries.append('language', app.settings.value.language)
  queries.append('word_timestamps', app.settings.value.timestamps.toString())
  queries.append('output', 'json')


  const url = new URL(app.settings.value.endpoint)
  url.search = queries.toString()
  // console.log(url)

  try {
    // Fetch url with no-cors
    const response = await fetch(url.toString(), {
      method: 'POST',
      body: formData
    })

    if (!response.ok) {
      console.error('failed to transcribe audio')
      console.error(response)
      throw new Error('failed to transcribe audio')
    }

    const res = await response.json() as unknown as TranscribedAudio
    return res
  } catch (error) {
    console.error('failed to transcribe audio', error)
    throw error
  }

}

export default transcribeAudio
  