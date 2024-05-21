export const arrayBufferToBlob = (arrayBuffer: ArrayBuffer, type: string): Blob => {
  return new Blob([arrayBuffer], { type })
}

export default arrayBufferToBlob