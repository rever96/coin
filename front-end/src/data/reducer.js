export const reduceConfig = (state = [], action) => {
  switch (action.type) {
    case 'NEXT':
      return [
        ...state,
        {
          domanda: action.domanda,
          opzioneScelta: action.opzioneScelta
        }
      ];
    case 'PREV':
      return state.slice(0, state.length - 1);
    case 'INIT':
      return [];
    default:
      return state;
  }
};
