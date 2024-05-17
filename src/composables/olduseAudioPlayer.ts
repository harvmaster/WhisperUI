import { computed, ref, watch } from 'vue'

export type PlayerStatus = 'PLAYING' | 'PAUSED'

const player = ref<HTMLAudioElement>(new Audio())
const playerSrc = ref<string>('')

const positionProbe = ref({
  position: 0,
  probedAt: Date.now()
})

const position = ref(0)
  const getPosition = () => {
    if (!player.value) return
    if (status.value === 'PLAYING') {
      position.value =  positionProbe.value.position + (Date.now() - positionProbe.value.probedAt) / 1000
      if (position.value > player.value.duration) {
        pause()
      }
    } else {
      position.value = player.value.currentTime
    }
  }

  watch(() => positionProbe.value.position,  () => {
    getPosition()
  })

  setInterval(getPosition, 100)

  const probePlayer = () => {
    if (!player.value) return

    positionProbe.value = {
      position: player.value.currentTime,
      probedAt: Date.now()
    }
  }

  const play = (src?: string) => {
    if (!player.value) return

    status.value = 'PLAYING'
    probePlayer()
    if (!src) return player.value.play()

    if (player.value.src !== src) {
      playerSrc.value = src
      player.value.src = src
      seek(0)
    }

    if (position.value >= player.value.duration) {
      seek(0)
    }

    probePlayer()
    player.value.play()
  }

  const pause = () => {
    if (!player.value) return
    status.value = 'PAUSED'
    player.value?.pause()
    probePlayer()
  }

  const toggle = (src?: string) => {
    if (player.value?.paused) {
      play(src)
    } else {
      pause()
    }
  }

  const status = ref<PlayerStatus>('PAUSED')

  const seek = (time: number) => {
    if (!player.value) return
    player.value.currentTime = time
    probePlayer()
  }

export const useAudioPlayer = () => {
  return {
    play,
    pause,
    toggle,
    status,
    seek,
    playerSrc,
    position
  }
}

export default useAudioPlayer