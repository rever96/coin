export const nextPasso = (opzioneScelta, domanda) => ({
  type: 'NEXT',
  domanda,
  opzioneScelta
});

export const prevPasso = () => ({
  type: 'PREV'
});

export const reset = () => ({
  type: 'INIT'
});
