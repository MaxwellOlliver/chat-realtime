export default () => {
  let token = localStorage.getItem('CR_TOKEN');

  return token ? true : false;
};
