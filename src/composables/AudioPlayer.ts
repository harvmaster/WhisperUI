import { ref } from 'vue'

export const PlayerStatus = {
  PAUSED: 0,
  PLAYING: 1
} as const

export type PlayerStatus = typeof PlayerStatus[keyof typeof PlayerStatus];

export type AudioPlayer = {
  player: typeof player
  src: typeof src
  status: typeof status
  position: typeof position
  volume: typeof volume

  seek: typeof seek
  play: typeof play
  pause: typeof pause
  toggle: () => void
  setVolume: typeof setVolume
  setPlaybackRate: typeof setPlaybackRate
}

const player = ref<HTMLAudioElement>(new Audio())
const src = ref<string>('')
const status = ref<PlayerStatus>(PlayerStatus.PAUSED)

const position = ref(0)
const volume = ref(100)

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

const setVolume = (vol: number) => {
  if (vol < 0) vol = 0
  if (vol > 100) vol = 100

  volume.value = vol
  player.value.volume = vol / 100
}

const setPlaybackRate = (rate: number) => {
  player.value.playbackRate = rate
}

export const getAudioPlayer = (): AudioPlayer => {
  return {
    player,
    src,
    status,
    position,
    volume,

    seek,
    play,
    pause,
    toggle,
    setVolume,
    setPlaybackRate
  }
}

export default getAudioPlayer