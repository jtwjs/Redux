import React from 'react';
import {connect} from 'react-redux';

const Detail = ({toDo}) => {
  return (
    <>
      <h1>{toDo?.text}</h1>
      <h5>Create at: {toDo?.id}</h5>
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  console.log(state);
  const {
    match:{
      params:{id}
    }
  } = ownProps;

  return {toDo: state.find(item => item.id === parseInt(id)) };
}
export default connect(mapStateToProps)(Detail);