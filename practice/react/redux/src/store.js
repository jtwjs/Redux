import {createSlice, configureStore} from '@reduxjs/toolkit';

const toDos = createSlice({
  name: "toDosReducer",
  initialState: [],
  reducers: {
    init: (state, action) => action.payload,
    add: (state, action) => {
      state.unshift({text: action.payload, id: Date.now()});
    },
    remove: (state,action) => state.filter(todo => todo.id !== action.payload)
  }
});

export const {
  init,
  add,
  remove
} = toDos.actions;

export default configureStore({reducer: toDos.reducer});

