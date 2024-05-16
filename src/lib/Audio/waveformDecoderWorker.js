class DownsampleProcessor extends AudioWorkletProcessor {
    static get parameterDescriptors() {
        return [{ name: 'downsampleFactor', defaultValue: 1, minValue: 1 }];
    }

    process(inputs, outputs, parameters) {
        const input = inputs[0];
        if (input.length === 0) {
            return true; // No input to process.
        }

        const downsampleFactor = parameters.downsampleFactor.length > 0 
                                  ? parameters.downsampleFactor[0] 
                                  : 1;

        // Process each channel in the input
        input.forEach((channelData, index) => {
            const outputData = [];
            for (let i = 0; i < channelData.length; i += downsampleFactor) {
                outputData.push(channelData[i]);
            }
            // Post the downsampled data back to the main thread
            this.port.postMessage({ channelIndex: index, samples: outputData });
        });

        // Continue processing
        return true;
    }
}

registerProcessor('downsample-processor', DownsampleProcessor);
