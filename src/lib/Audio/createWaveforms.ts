// function getWaveformAmplitudes(file: File): Promise<{ amplitudes: Float32Array[], sampleRate: number }> {
//   return new Promise((resolve, reject) => {
//       const reader = new FileReader();

//       reader.onload = async (event) => {
//           if (!event.target?.result) {
//               reject(new Error("Error reading the file"));
//               return;
//           }
//           try {
//               const audioContext = new (window.AudioContext || window.webkitAudioContext)();

//               // Decode the audio data
//               const audioBuffer = await audioContext.decodeAudioData(event.target.result as ArrayBuffer);

//               // Extract the waveform data from each channel
//               const amplitudes: Float32Array[] = [];
//               for (let i = 0; i < audioBuffer.numberOfChannels; i++) {
//                   const channelData = audioBuffer.getChannelData(i);
//                   amplitudes.push(new Float32Array(channelData));
//               }

//               // Resolve the promise with the waveform data and sample rate
//               resolve({ amplitudes, sampleRate: audioBuffer.sampleRate });
//           } catch (error) {
//               reject(error);
//           }
//       };

//       reader.onerror = (event) => {
//           reject(new Error("Error reading the file"));
//       };

//       // Start reading the file
//       reader.readAsArrayBuffer(file);
//   });
// }

// export default getWaveformAmplitudes;

// async function loadAudioWorklet(audioContext: AudioContext) {
//   const workerFileLocation = new URL('./waveformDecoderWorker.js', import.meta.url).href; 
//   await audioContext.audioWorklet.addModule(workerFileLocation);
//   return new AudioWorkletNode(audioContext, 'downsample-processor');
// }

// function decodeAudioData(arrayBuffer: ArrayBuffer): Promise<{ amplitudes: Float32Array[], sampleRate: number }> {
//   return new Promise((resolve, reject) => {
//       const audioContext = new (window.AudioContext || window.webkitAudioContext)();

//       audioContext.decodeAudioData(arrayBuffer, (audioBuffer) => {
//           const amplitudes: Float32Array[] = [];
//           for (let i = 0; i < audioBuffer.numberOfChannels; i++) {
//               const channelData = audioBuffer.getChannelData(i);
//               amplitudes.push(new Float32Array(channelData));
//           }
//           resolve({ amplitudes, sampleRate: audioBuffer.sampleRate });
//           audioContext.close(); // Close the audio context to free up resources
//       }, (error) => {
//           reject(error);
//       });
//   });
// }

// async function getWaveformAmplitudes(file: File, downsampleFactor: number): Promise<{ amplitudes: Float32Array[], sampleRate: number }> {
//   return new Promise((resolve, reject) => {
//       const reader = new FileReader();

//       const start = performance.now();
//       reader.onload = async (event) => {
//           if (!event.target?.result) {
//               reject(new Error('Error reading the file'));
//               return;
//           }

//           const fileLoaded = performance.now()
//           console.log('File loaded in', fileLoaded - start, 'ms')

//           try {
//               const arrayBuffer = event.target.result as ArrayBuffer;
//               const { amplitudes, sampleRate } = await decodeAudioData(arrayBuffer);
//               const audioContext = new (window.AudioContext || window.webkitAudioContext)();

//               const workletNode = await loadAudioWorklet(audioContext);
//               workletNode.parameters.get('downsampleFactor').setValueAtTime(downsampleFactor, audioContext.currentTime);

//               const downsampledAmplitudes: Float32Array[] = new Array(amplitudes.length);
//               let completedChannels = 0;

//               workletNode.port.onmessage = (event) => {
//                   const { channelIndex, samples } = event.data;
//                   downsampledAmplitudes[channelIndex] = new Float32Array(samples);
//                   completedChannels++;

//                   if (completedChannels === amplitudes.length) {
//                       resolve({
//                           amplitudes: downsampledAmplitudes,
//                           sampleRate: sampleRate / downsampleFactor
//                       });
//                       audioContext.close();
//                   }
//               };

//               amplitudes.forEach((channelData, channelIndex) => {
//                   const bufferSource = audioContext.createBufferSource();
//                   const buffer = audioContext.createBuffer(1, channelData.length, sampleRate);
//                   buffer.copyToChannel(channelData, 0);
//                   bufferSource.buffer = buffer;
//                   bufferSource.connect(workletNode).connect(audioContext.destination);
//                   bufferSource.start();
//               });

//           } catch (error) {
//               reject(error);
//           }
//       };

//       reader.onerror = (event) => {
//           reject(new Error("Error reading the file"));
//       };

//       // Start reading the file
//       reader.readAsArrayBuffer(file);
//   });
// }

interface AudioData {
  waveforms: Float32Array[];
  sampleRate: number;
}

async function decodeAudioToWaveform(file: File): Promise<AudioData> {
  // Create an AudioContext
  const timerStart = performance.now();

  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

  // Read the file as an ArrayBuffer
  const arrayBuffer = await file.arrayBuffer();
  
  const timerArrayBuffer = performance.now();

  // Decode the audio file data
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

  const timerAudioBuffer = performance.now();

  // Create an OfflineAudioContext for faster processing
  const offlineContext = new OfflineAudioContext(
      audioBuffer.numberOfChannels,
      audioBuffer.length,
      audioBuffer.sampleRate
  );

  // Create a buffer source
  const source = offlineContext.createBufferSource();
  source.buffer = audioBuffer;

  // Connect the buffer source to the output (the destination)
  source.connect(offlineContext.destination);

  const timerConnected = performance.now();

  // Start the buffer source
  source.start();

  // Render the audio
  const renderedBuffer = await offlineContext.startRendering();

  const timerBufferRendered = performance.now();

  // Get the amplitude data from the rendered buffer
  const waveforms = [];
  for (let channel = 0; channel < renderedBuffer.numberOfChannels; channel++) {
      const channelData = renderedBuffer.getChannelData(channel);
      const waveform = new Float32Array(channelData.length);
      for (let i = 0; i < channelData.length; i++) {
          waveform[i] = channelData[i];
      }
      waveforms.push(waveform);
  }

  const timerEnd = performance.now();

  console.log('Array buffer loaded in', timerArrayBuffer - timerStart, 'ms');
  console.log('Audio buffer decoded in', timerAudioBuffer - timerArrayBuffer, 'ms');
  console.log('Audio buffer connected in', timerConnected - timerAudioBuffer, 'ms');
  console.log('Audio buffer rendered in', timerBufferRendered - timerConnected, 'ms');
  console.log('Waveforms extracted in', timerEnd - timerBufferRendered, 'ms');

  return {
      waveforms,
      sampleRate: renderedBuffer.sampleRate
  };
}

// Usage example:
// const fileInput = document.querySelector('input[type="file"]');
// fileInput.onchange = async (event) => {
//     const file = (event.target as HTMLInputElement).files[0];
//     const audioData = await decodeAudioToWaveform(file);
//     console.log(audioData.waveforms, audioData.sampleRate);
// };



export default decodeAudioToWaveform