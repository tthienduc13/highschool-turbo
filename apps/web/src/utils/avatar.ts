export const dataUrlToBuffer = (dataUrl: string): ArrayBuffer => {
  const base64 = dataUrl.split(",")[1]!;
  const binary = atob(base64);
  const length = binary.length;
  const buffer = new ArrayBuffer(length);
  const view = new Uint8Array(buffer);

  for (let i = 0; i < length; i++) {
    view[i] = binary.charCodeAt(i);
  }

  return buffer;
};
