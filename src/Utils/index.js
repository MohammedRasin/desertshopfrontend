const checkToken = () => {
  return localStorage.getItem('TOKEN') ? true : false;
};
export default checkToken;
