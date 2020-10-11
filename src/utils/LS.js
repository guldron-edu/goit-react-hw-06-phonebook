let LS = {
  saveToLS(name, string) {
    localStorage.setItem(`${name}`, JSON.stringify(string));
  },
  restoreFromLS(name) {
    return localStorage.getItem(name);
  },
};

export default LS;
