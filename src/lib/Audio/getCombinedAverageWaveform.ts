function calculateCombinedAverageAmplitudes(
  amplitudes: Float32Array[],
  sampleRate: number,
  intervalInSeconds: number
): number[] {
  const numChannels = amplitudes.length;
  const numSamplesPerInterval = Math.floor(sampleRate * intervalInSeconds);
  const combinedAverages: number[] = [];

  // Calculate the number of intervals based on the longest channel
  const numIntervals = Math.ceil(amplitudes[0].length / numSamplesPerInterval);

  for (let interval = 0; interval < numIntervals; interval++) {
      let sum = 0;
      let count = 0;

      for (let channel = 0; channel < numChannels; channel++) {
          const channelData = amplitudes[channel];
          const start = interval * numSamplesPerInterval;
          const end = Math.min(start + numSamplesPerInterval, channelData.length);

          for (let i = start; i < end; i++) {
              sum += Math.abs(channelData[i]);
              count++;
          }
      }

      const average = sum / count;
      combinedAverages.push(average);
  }

  return combinedAverages;
}

export default calculateCombinedAverageAmplitudes;