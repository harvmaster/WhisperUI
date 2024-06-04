import { AudioPlayer, PlayerStatus, getAudioPlayer } from 'src/composables/AudioPlayer';
import { Ref, WatchStopHandle, computed, ref, watch } from 'vue';

export type ControlledPlayer = {
  play: () => void
  pause: () => void
  seek: (time: number) => void
  isActive: Ref<boolean>
  isPlaying: Ref<boolean>
  status: Ref<PlayerStatus>
  position: Ref<number>

  setVolume: (vol: number) => void
  volume: Ref<number>
  
  setSpeed: (spd: number) => void
  speed: Ref<number>
  
  player: AudioPlayer
}

const players = new Map<string, ControlledPlayer>()

export default function useAudioPlayer(src: string): ControlledPlayer {
  if (players.has(src)) {
    return players.get(src) as ControlledPlayer
  }

  const player = getAudioPlayer()

  const play = () => {
    player.play(src)
    player.seek(position.value)
    player.setPlaybackRate(speed.value)
    player.setVolume(volume.value)
  }

  const pause = () => {
    player.pause()
  }

  const seek = (time: number) => {
    position.value = time
    if (isActive.value) {
      player.seek(time)
    }
  }

  const isActive = computed(() => {
    return player.src.value == src
  })

  const isPlaying = computed(() => {
    return player.status.value == PlayerStatus.PLAYING && player.src.value == src
  })

  const status = computed(() => {
    return isPlaying.value ? PlayerStatus.PLAYING : PlayerStatus.PAUSED
  })

  const speed = ref<number>(1)
  const setSpeed = (spd: number) => {
    speed.value = spd
    if (isActive.value) {
      player.setPlaybackRate(spd)
    }
  }

  const position = ref<number>(0)
  let positionWatcher: WatchStopHandle | null = null

  const volume = ref<number>(100)
  const setVolume = (vol: number) => {
    volume.value = vol
    if (isActive.value) {
      player.setVolume(vol)
    }
  }
  let volumeWatcher: WatchStopHandle | null = null

  watch(player.src, () => {
    // If the src changes, start watching the position
    if (player.src.value == src) {
      if (!positionWatcher) {
        positionWatcher = createPositionWatcher()
      }
      if (!volumeWatcher) {
        volumeWatcher = createVolumeWatcher()
      }
    }

    // If the src changes, stop watching the position
    if (player.src.value != src) {
      if (positionWatcher) {
        positionWatcher()
        positionWatcher = null
      }
      if (volumeWatcher) {
        volumeWatcher()
        volumeWatcher = null
      }
    }
  })

  const createPositionWatcher = () => {
    return watch(player.position, (newPosition) => {
      if (player.src.value == src) {
        position.value = newPosition
      }
    })
  }

  const createVolumeWatcher = () => {
    return watch(player.volume, (newVolume) => {
      if (player.src.value == src) {
        volume.value = newVolume
      }
    })
  }

  players.set(src, {
    play,
    pause,
    seek,
    isActive,
    isPlaying,
    status,
    position,

    setVolume,
    volume,
    
    setSpeed,
    speed,
    
    player: player
  })

  return {
    play,
    pause,
    seek,
    isActive,
    isPlaying,
    status,
    position,

    setVolume,
    volume,
    
    setSpeed,
    speed,
    
    player: player
  }
}