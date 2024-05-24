import { PlayerStatus, getAudioPlayer } from 'src/composables/AudioPlayer';
import { WatchStopHandle, computed, ref, watch } from 'vue';

export default function useAudioPlayer(src: string) {
  const player = getAudioPlayer()

  const play = () => {
    player.seek(position.value)
    player.play(src)
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

  const position = ref<number>(0)
  let positionWatcher: WatchStopHandle | null = null
  
  const volume = ref<number>(100)
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

  return {
    play,
    pause,
    seek,
    isActive,
    isPlaying,
    status,
    position,

    player: player.player
  }
}