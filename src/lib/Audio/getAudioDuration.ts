function getAudioDuration (file: File): Promise<number> {
  const audio = document.createElement('audio');
  audio.src = URL.createObjectURL(file);
  return new Promise<number>((resolve) => {
    audio.onloadedmetadata = () => {
      resolve(audio.duration);
    };
  });
}

export default getAudioDuration