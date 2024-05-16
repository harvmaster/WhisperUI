function calculateAverageAmplitudes(
  amplitudes: Float32Array[],
  sampleRate: number,
  intervalInSeconds: number
): number[][] {
  const numChannels = amplitudes.length;
  const numSamplesPerInterval = Math.floor(sampleRate * intervalInSeconds);
  const averages: number[][] = [];

  for (let channel = 0; channel < numChannels; channel++) {
      const channelAverages: number[] = [];
      const channelData = amplitudes[channel];

      for (let i = 0; i < channelData.length; i += numSamplesPerInterval) {
          const slice = channelData.slice(i, Math.min(i + numSamplesPerInterval, channelData.length));
          const sum = slice.reduce((acc, val) => acc + Math.abs(val), 0);
          const average = sum / slice.length;
          channelAverages.push(average);
      }
      averages.push(channelAverages);
  }

  return averages;
}

export default calculateAverageAmplitudes;