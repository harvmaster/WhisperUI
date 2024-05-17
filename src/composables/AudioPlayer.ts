import { ref } from 'vue'

export const PlayerStatus = {
  PAUSED: 0,
  PLAYING: 1
} as const

export type PlayerStatus = typeof PlayerStatus[keyof typeof PlayerStatus];

const player = ref<HTMLAudioElement>(new Audio())
const src = ref<string>('')
const status = ref<PlayerStatus>(PlayerStatus.PAUSED)

const position = ref(0)

const seek = (pos: number) => {
  position.value = pos
  player.value.currentTime = pos
}

const play = (source?: string) => {
  if (!player.value) return

  status.value = PlayerStatus.PLAYING
  if (source && player.value.src !== source) {
    src.value = source
    player.value.src = source
  }

  if (position.value >= player.value.duration) {
    seek(0)
  }

  player.value.play()
}

const pause = () => {
  if (!player.value) return

  status.value = PlayerStatus.PAUSED
  player.value.pause()
}

const toggle = () => {
  if (status.value === PlayerStatus.PLAYING) {
    pause()
  } else {
    play()
  }
}

setInterval(() => {
  if (status.value === PlayerStatus.PLAYING) {
    position.value = player.value.currentTime
    if (position.value >= player.value.duration) {
      pause()
    }
  }
}, 100)

export const getAudioPlayer = () => {
  return {
    player,
    src,
    status,
    position,

    seek,
    play,
    pause,
    toggle
  }
}

export default getAudioPlayer