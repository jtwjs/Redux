import './App.css';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './routes/Home';
import Detail from './routes/Detail';
import { useEffect } from 'react';
import Storage from './util/storage';
import {connect} from 'react-redux';
import {init} from './store';

const TODO_LIST = "todoList";
const storage = new Storage(TODO_LIST);

function App({initToDo}) {
  console.log('App');
  useEffect(() => {
    const list = storage.loadToDos();
    console.log('실행');
    if(list !== null) {
        initToDo(list);
    };
  }, [initToDo]);

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Home storage={storage}/>
        </Route>
        <Route path="/:id" component={Detail}></Route>
      </Switch>
    </Router>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    initToDo: (list) => dispatch(init(list))
  }
}

export default connect(null, mapDispatchToProps)(App);
