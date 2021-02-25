import React, {useState, useRef, useEffect, memo} from 'react';
import {connect} from 'react-redux';
import ToDo from '../componenets/todo';
import {add} from '../store';


const Home = memo(({toDos, addToDo, storage}) => {
  console.log('Home');
  const [text, setText] = useState("");
  const inputRef = useRef();
  const formRef = useRef();
  
  function onSubmit(e) {
    e.preventDefault();
    const value = inputRef.current.value;
    setText(value);
    formRef.current.reset();
  }


  useEffect(() => {
    if(text) {
      addToDo(text);
      setText("");
    }
  },[text, addToDo]);

  useEffect(() => {
  
    if(!(toDos.length === 0 && storage.loadToDos().length > 1)) {
      storage.saveToDos(toDos);
    }
  
    
  }, [toDos, storage])

  return (
    <>
      <h1>To Do</h1>
    <form ref={formRef} onSubmit={onSubmit}>
        <input type="text"  ref={inputRef}/>
        <button>Add</button>
      </form>
      <ul>
        {
        toDos.map(todo => (
           <ToDo key={todo.id} {...todo} storage={storage}/>
           ))
          }
      </ul>
    </>
  );
});

function mapStateToProps(state) {
  return {toDos: state}
}

function mapDispatchToProps(dispatch) {
  return {
    addToDo: (text) => dispatch(add(text))
  }

}
export default connect(mapStateToProps, mapDispatchToProps)(Home);