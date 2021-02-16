import {createStore} from "redux";

const addBtn = document.querySelector('.add');
const minusBtn = document.querySelector('.minus');
const valueElem = document.querySelector('.value');


const ADD = 'ADD';
const MINUS = 'MINUS';
const countModefier = (state = 0, action) => {
 switch(action.type) {
   case ADD: 
            return state + 1;
   case MINUS: 
            return state - 1;
   default:
       return state; 
 }
}
const countStore = createStore(countModefier);

const onChange = () => {
  valueElem.innerText = countStore.getState();
}

countStore.subscribe(onChange);

const handleAdd = () => {
  countStore.dispatch({type: ADD});
}
const handleMinus = () => {
  countStore.dispatch({type: MINUS});
}

addBtn.addEventListener('click', handleAdd);
minusBtn.addEventListener('click', handleMinus);
