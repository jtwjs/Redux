# Redux Toolkit

> Redux의 공식 개발 도구

## Action

> `createAction` API를 사용해서 액션 생성자 함수를 만든다.

```js
const increment = createAction("counter/increment");

let action = increment(); // returns {type: 'counter/increment' }

action = increment(3); // returns {type: 'counter/increment', payload: 3 }
```

`createAction`에는 기본적으로 타입 문자열만 제공하면 된다.

그리고 만들어진 액션 생성자의 파라미터는 그대로 `payload`필드에 들어간다

만약 리턴되는 액션 객체에 더 손을 보고싶다면, 콜백 함수를 `createAction`의 두번쨰 파라미터로 전달하면 된다.

```js
const addTodo = createAction("todos/add", function prepare(text) {
  return {
    payload: {
      text,
      createdAt: new Date()
    }
  };
});

addTodo("Write more docs"); //아래 객체를 반환함

{
  type: 'todo/add',
  payload: {
    text: 'Write more docs',
    createdAt: '...날짜'
  }
}
```

콜백 함수 안에서는 액션 생성자 함수의 파라미터로 전달받지 않은 데이터를 추가할 수 있다.

객체는 반드시 `FSA(Flux Standard Action)`형태를 따라야 한다.

### Flux Standard Action

Redux Toolkit에서는 **액션 객체의 형태로 FSA를 강제한다.**

```js
  {
    type: 'number/increment',
    payload: {
      amount: 1
    }
  }
```

객체는 액션을 구분할 고유한 문자열을 가진 `type` 필드가 반드시 있으며, `payload` 필드에 데이터를 담아 전달한다.

그 외에 `meta`, `error` 필드를 가질수도 있다.

## Reducer

> `createReducer` API를 사용하여 리듀서를 작성한다. <br> `createAction`으로 만든 액션 생성자도 함꼐 사용 가능

```js
const increment = createAction("increment");
const decrement = createAction("decrement");

const counterReducer = createReducer(0, {
  [increment]: (state, action) => {
    state + action.payload;
  },
  [decerement]: (state, action) => {
    state - action.payload;
  },
});
```

reducer 함수에서 흔히 보이던 switch 문이 사라짐

이제 더는 쓸데 없는 `default` 케이스를 작성할 필요X

`createReducer` 함수는 첫 번째 파라미터로 초기 상태 값 객체(initialState)를, 두번째 파라미터로 리듀서 맵 객체를 요구한다.

switch 문의 case 문자열이 리듀서 맵의 필드 값이 된 형태다.

리듀서 맵의 필드에 액션 생성자에 전달한 문자열을 넣어도 되지만, 액션 생성자 함수를 직접 넣어도 된다.

이것이 가능한 이유는 `createAction`이 리턴하는 액션 생성자 함수의 `toString(Object.prototype.toString)` 메소드를 오버라이딩했기 때문

`` `${increment}`; // 'increment' ``

이 방식 덕분에 액션의 타입 문자열을 할당한 변수를 별도로 관리할 필요가 없다.

`createReducer` 함수는 리듀서맵으로 코드의 양을 줄였고, 타입 변수를 관리할 필요를 없애서 또 코드의 양을 줄인 셈이다.

## immer를 도입한 Redux Toolkit

리듀서 함수는 내부적으로 immer의 produce를 사용한다.

그래서 리듀서 함수에서 새로운 상태(state) 객체를 리턴할 필요가 없다.

대신 상태 값을 직접 변경하는 방식으로 코드를 작성하면 된다.

## 😎Action + Reducer -> Slice😎

Redux Toolkit은 액션이나 리듀서 외에도 다른 방식으로 상태를 관리할 수 있는 도구를 제공한다.

`createSlice` API로 액션, 리듀서를 한번에 만드는 것

```js
let todoId = 0;

const todoSlice = createSlice({
  //액션 타입 문자열의 prefix로 들어간다. ex) "todos/addTodo"
  name: "todos",

  //초기값
  initialState: [],

  //리듀서 맵
  reducer: {
    // 리듀서와 액션 생성자가 분리되어 있다.
    addTodo: {
      //리듀서 함수
      reducer: (state, action) => {
        state.push(action.payload);
      },

      //createAction 함수의 두번쨰 파라미터인 콜백 함수에 해당함
      prepare: (text: string) => ({
        payload: {
          id: todoId++,
          text,
        },
      }),
    },
  },

  // 리듀서와 액션 생성자 함수가 분리되어 있지 않다.
  // removeTodo 액션은 파라미터가 payload에 바로 할당된다.
  removeTodo: (state, action) => state.filter((item) => item.id !== action.payload),
});
```

`createSlice`는 초기값, 리듀서, 액션을 하나의 객체에 담아 전달 받는다. 그렇게 만든 슬라이스 객체에서 액션과 리듀서는 아래와 같이 가져올 수있다.

```js
const { addTodo, removeTodo } = todosSlice.actions;
const { reducer } = todosSlice;
```

`createSlice`를 사용하면 액션을 생성하고, 그 액션을 리듀서 맵에 전달할 필요도 없이 한번에 만들 수 있다.

별도로 작성하는 것보다 가독성은 조금 떨어지지만 코드의 양을 더 줄이면서 간단하게 리덕스 상태를 관리할 수 있다.

### create"slice"?

> slice는 상태(state) 트리 구조에서 리듀서 함수 1개를 가리킨다고 한다. 그런데 왜 slice, '얇은 조각'이라는 이름을 붙였을까 ?

앱의 규모가 커지면서 리듀서 액션의 덩치도 자연스럽게 커지고 리듀서 함수 1개의 길이가 수백 라인을 넘어가 버린다. 코드의 복잡도가 높아져 테스트 코드가 없으면 건드리기 불안할 정도가 되곤 한다.

slice라는 단어를 사용한 이유는 그래도 앱의 로직을 최대한 분리하고 작은 덩치로 유지하는 철학을 담으려는 목적이 아닌가 싶다.

보통 아래에 있는 트리 구조와 같이 유형별로 소스를 구분하는 방법을 많이 사용할 것이다.

컴포넌트는 `components` 폴더 아래에, 리덕스 관련 코드는 모두 `store` 폴더에 아래에 두는 식이다.

```md
.
├── api (API 모듈)
├── components (일반 켬포넌트)
├── constant (상수)
├── models (데이터 모델 변수, 타입)
├── pages (페이지 컴포넌트)
├── store (Redux 관련 코드)
├── styles (스타일시트)
└── utils (유틸리티 모듈)
```

그런데 Redux Toolkit 개발팀에서 공개한 공식 템플릿(cra-template-redux)에서는 독특한 방식의 폴더 구조를 제안하고 있다.

.features 라는 폴더 안에 기능별로 폴더를 만든 후 그 안에 React 컴포넌트와 스타일 시트, Redux 구현 등 관련 소스를 모두 같은 곳에 위치시키는 방법이다.

```md
.
├── api
│ └── githubAPI.js
├── components
│ └── Heading.js
├── features
│ ├── counter
│ │ ├── Counter.css
│ │ ├── Counter.js
│ │ └── counterReducer.js
│ ├── github
│ │ ├── RepoDetail.js
│ │ └── repoDetailSlice.js
│ └── todos
│ ├── Todos.js
│ └── todosSlice.js
```

`componenets` `styles`폴더에는 공용 컴포넌트, 글로벌 스타일, 믹스인 처럼 유틸리티 성격을 가진 모듈을 두고, 실제 기능과 관련된 소스는 모두 `features`폴더 아래에 주제별로 모으는 식이다. 이를 보면 slice라는 단어는 리듀서 뿐만 아니라 기능 또한 작은 덩치로 가볍게 유지하자는 의미를 담고 있을수 있겠다는 생각이 든다.

코드 관리 방식은 팀과 개인의 선택문제!

## Selector

셀렉터는 리덕스에서 state를 기반으로 새로운 값을 리턴하는 함수를 말한다.

예를 들어 할일 목록에서 현재 상태가 '완료'로 표시된 데이터만 필터링해서 리턴하는 것을 말한다.

Redux Toolkit의 `createSelector` API는 reselect 라이브러리의 그것과 같다.

이 API는 새로운 상태 추출에 사용하는 값이 변경되지 않으면 다시 실행되지 않는다. **즉 메모제이션을 지원**

아래의 코드는 현재 활성화된 탭에 맞는 데이터 배열을 리턴하는 셀렉터 코드다.

```js
const activeListSelector = createSelector(
  (state) => state.events.live, //상태 1 리턴 함수
  (state) => state.events.closed, //상태 2 리턴 함수
  (state) => state.events.tab, //상태 3 리턴 함수

  //상태 1, 2, 3이 차례로 들어간다.
  (liveEvents, closedEvents, tab) => {
    switch (tab) {
      case "LIVE":
        return liveEvents;
      case "CLOSED":
        return closedEvents;
        defulat: return [];
    }
  }
);
```

`createSelector`를 호출할 때 파라미터의 수에는 제한이 없지만, 마지막에는 상태 객체를 리턴할 콜백 함수가 있어야 한다.

마지막 콜백 함수의 파라미터에는 앞선 파라미터에서 리턴한 객체가 차례대로 위치한다.

`activeListSelector`는 `state.events.live`, `state.events.closed`, `state.events.tab` 중 어느 하나의 값이 바뀌어야 다시 실행되어서 새로운 값이 적용되며, 그렇지 않으면 다시 실행되지 않는다.

이렇게 만든 React 컴포넌트에서 아래와 같은 방식으로 사용한다.

```js
import React from "react";
import { useSelector } from "react-redux";

export default function EventList() {
  const activeTabEvents = useSelector(activeTabEventsSelector);

  return activeTabEvents.map((eventData, i) => <span key={i}>{eventData.title}</span>);
}
```

## Store

액션, 리듀서를 만들었으니 이제 스토어 객체를 만들어서 React 컴포넌트 트리에 제공해야 한다.

Redux Toolkit은 Redux의 `createStore`를 활용한 `configureStore` API를 제공한다.

```js
import {
  configureStore,
  combineReducers,
  getDefaultMiddleware
} from '@reduxjs/toolkit;

import todosSlice from 'src/fetures/todos/todosSlice';
import counter from 'src/features/counter/counterReducer';

const rootReducer = combineReducres({
  counter, // createReducer로 만든 리듀서 객체
  todos: todosSlice.reducer //createSlice로 만든 slice 객체가 가진 reducer
});
const store = configureStore({
  reducer: rootReducer
});
```

`combineReducers`는 Redux에서 사용하고 있는 것과 같다.

`configureStore`함수에 필수적으로 필요한 값은 `reducer`필드다.

`middleware`, `preloadedState`, `enhancers` 등의 사용방법은 문서를 참조하면 됨

그리고 `configureStore`에 `middleware`필드를 전달하지 않으면 기본적으로 제공되는 미들웨어가 있다.

그 미들웨어들을 가져오는 API가 `getDefaultMiddleware`다.

```js
const middleware = getDefaultMiddleware();
expect(middleware).toEqual([
  thunk,
  immutableStateInvariant, //development 모드에서만 사용됨
  serializableStateInvariant, // development 모드에서만 사용됨
]);
```

기본 미들웨어로는 `redux-thunk`를 사용하며 개발 모드에서만 redux-immutable-state-invariant, serializable-state-invariant-middleware 미들웨어가 추가된다.

만약 비동기 액션 처리에 redux-thunk를 사용하지 않거나 redux-saga 등의 다른 미들웨어가 필요하다면 아래와 같이 설정을 수정해야 한다.

```js
import logger from "redux-logger";

const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware(), logger],
});
```
