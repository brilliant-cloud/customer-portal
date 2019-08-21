const toggleVolume = (volume) => {
  return {
    type: 'TOGGLE_VOLUME',
    volume
  }
};

export {
  toggleVolume,
};
