import {createStore} from 'redux';

const ADD = 'ADD';
const DELETE = 'DELETE';
const INIT = "INIT";

const initToDo = list => {
  return {
    type: INIT,
    list
  }
}

const addToDo = text => {
  return {
    type: ADD,
    text
  };
}

const deleteToDo = id => {
  return {
    type: DELETE,
    id
  };
}

const reducer = (state = [], action) => {
  switch(action.type) {
    case INIT: 
      return action.list;
    case ADD: 
      const newToDo = {text: action.text, id: Date.now()};
      return [newToDo, ...state];
    case DELETE:
      const list = state.filter(todo => todo.id !== action.id);
      console.log(list);
      return list;
    default: return state;
  }
}

const store = createStore(reducer);

export const actionCreators = {
  initToDo,
  addToDo,
  deleteToDo
}

export default store;

