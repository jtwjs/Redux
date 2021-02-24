# Redux

**리덕스(Redux)** 는 Javascript app을 위한 상태관리 라이브러리이다.

리액트 뿐아니라 Angular, jQuery, vanila js등 다양한 framework와 작동되게 설계됨

즉, 리액트만을 위한 라이브러리가 아니다

컴포넌트들의 상태 관련 로직들을 다른 파일들로 분리시켜서 더욱 효율적으로 관리할수 있다.

추가적으로, 리덕스의 미들웨어라는 기능을 통하여 비동기 작업, 로깅 등의 확정적인 작업들을

더욱 쉽게 할수도 있게 해준다.

## 액션(Action)

리듀서(reducer)와 소통하는 방법으로 Object여야 하며 그 key 이름은 항상 type임

상태에 어떠한 변화가 필요하게 될 땐, 우리는 액션이란 것을 발생시킴

이는 하나의 객체로 표현되는데, 액션 객체는 다음과 같은 형식으로 이루어짐

```js
{
  type: "TOGGLE_VALUE";
}
```

액션 객체는 `type` key를 필수적으로 가지고 있어야하고 그외의 값들은

개발자 마음대로 넣기 가능

state를 수정할수 있는 유일한 방법은 action을 보내는 것!

### 액션 생성함수 (Action Creator)

액션 생성함수는 액션을 만드는 함수다.

단순히 파라미터를 받아와서 액션 객체 형태로 만들어 준다.

```js
function addToDo(data) {
  return {
    type: "ADD_TODO",
    data,
  };
}

//arrow function ex
const changeInput = (text) => ({
  type: "CHANGE_INPUT",
  text,
});
```

## 리듀서 (Reducer)

리듀서는 변화를 일으키는 함수이다.

리듀서는 두가지의 파라미터를 받아온다.

현재 상태의 application과 함께 불려지는 함수이다.(+ action)

application의 state를 반환한다.

```js
function reducer(state, action) {
  //상태 업데이트 로직
  return alteredState;
}
```

## 스토어 (Store)

리덕스에서는 한 애플리케이션 당 하나의 스토어(store)를 만들게 된다.

스토어(store) 안에는 현재의 앱 상태와, 리듀서(reducer)가 들어가있고, 추가적으로 몇가지 내장 함수들이 있다.

## 디스패치 (dispatch)

디스패치는 스토어(store)의 내장함수 중 하나이다.

디스패치는, 액션을 발생시키는 것이라고 이해하면 된다.

디스패치(dispatch)라는 함수에는 액션(action)을 파라미터로 전달한다.

그렇게 호출을 하면, 스토어(store)는 리듀서(reducer) 함수를 실행시켜서 해당 액션을 처리하는

로직이 있다면 액션을 참고하여 새로운 상태를 만들어준다.

## 구독 (subscribe)

구독 또한 스토어(store)의 내장함수 중 하나이다.

구독(subscribe)함수는 함수 형태의 값을 파라미터로 받아온다.

구독(subscribe) 함수에 특정 함수를 전달해주면, 액션이 디스패치(dispatch)

되었을 때 마다 전달해준 함수가 호출된다.
