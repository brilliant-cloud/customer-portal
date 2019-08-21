export const addNetwork= (id) => ({
  type: 'ADD_NETWORK',
  id,
});

export const removeNetwork = (id) => ({
  type: 'REMOVE_NETWORK',
  id,
});

export const choosedImage = (id) => ({
  type: 'CHOOSED_IMAGE',
  id
});

export const choosedFlavor = (id) => ({
  type: 'CHOOSED_FLAVOR',
  id
});

export const choosedKeypair = (name) => ({
  type: 'CHOOSED_KEYPAIR',
  name
});

export const choosedSecurityGroup = (nameArrs) => ({
  type: 'CHOOSED_SECURITY_GROUP',
  nameArrs
});

export const filledInstance = (name) => ({
  type: 'FILLED_INSTANCE',
  name
});

export const filterTimeSpan = (timeSpan) => ({
  type: 'FILTER_TIME_SPAN',
  timeSpan
});

export const choosedInstance = (selectedRows) => ({
  type: 'CHOOSED_INSTANCE',
  selectedRows
});