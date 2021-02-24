
import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import { actionCreators } from '../store';

const ToDo = ({text, id, onBtnClick}) => {
  return (
    <li>
      <Link to={`/${id}`}>
      {text}
      </Link>
      <button onClick={onBtnClick}>DEL</button>

    </li>
  );
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onBtnClick: () => dispatch(actionCreators.deleteToDo(ownProps.id))
  };
}

export default connect(null, mapDispatchToProps)(ToDo);