
export default class Storage {
  constructor(title) {
    this.title = title;
  };

   saveToDos = (list = []) => {
    localStorage.setItem(this.title, JSON.stringify(list));
  }

   loadToDos = () => {
    return JSON.parse(localStorage.getItem(this.title));
  }
};
