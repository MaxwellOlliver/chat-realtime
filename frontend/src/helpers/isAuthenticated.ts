export default (): boolean => {
  let token = localStorage.getItem('CR_TOKEN');

  return token ? true : false;
};
