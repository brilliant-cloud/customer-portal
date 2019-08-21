const closeNotification = (id) => {
  return {
    type: 'CLOSE_NOTIFICATION',
    id,
  }
};

export { closeNotification };