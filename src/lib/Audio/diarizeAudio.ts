import { app } from 'boot/app'

export const diarizeAudio = async (file: File): Promise<any> => {
  const formData = new FormData()
  formData.append('file', file)

  // const queries = new URLSearchParams()
  // queries.append('encode', app.settings.value.encode.toString())
  // queries.append('task', 'diarize')
  // queries.append('output', 'json')

  const endpoint = 'https://pyannote.whisper.mc.hzuccon.com/diarize/'
  // const url = new URL(app.settings.value.endpoint)
  const url = new URL(endpoint)
  // url.search = queries.toString()

  try {
    // Fetch url with no-cors
    const response = await fetch(url.toString(), {
      method: 'POST',
      body: formData
    })

    if (!response.ok) {
      console.error('failed to diarize audio')
      console.error(response)
      throw new Error('failed to diarize audio')
    }

    const res = await response.json()
    return res
  } catch (error) {
    console.error('failed to diarize audio', error)
    throw error
  }

}

export default diarizeAudio