## [React with TypeScript](https://www.inflearn.com/course/react-with-typescript/dashboard)
### <[실습 환경](https://ko.reactjs.org/docs/static-type-checking.html#using-typescript-with-create-react-app)>
``npx create-react-app react-typescript --template typescript``   

#### 기본 설정 파일 ([참고](https://github.com/Microsoft/TypeScript-React-Starter#typescript-react-starter))
```
react-typescript/
├─ .gitignore
├─ node_modules/
├─ public/
├─ src/
│  └─ App.css
│  └─ App.test.tsx
│  └─ App.tsx
│  └─ index.css
│  └─ index.tsx
│  └─ ...
├─ package.json
└─ tsconfig.json
```
- ``public`` contains static assets like the HTML page we're planning to deploy to, or images. You can delete any file in this folder apart from index.html.
- ``src`` contains our TypeScript and CSS code. ``index.tsx`` is the entry-point for our file, and is mandatory.
  - ``App.css`` : App Component에서 쓰이는 스타일 
  - ``App.test.tsx`` : App Component에 대한 테스트 파일
  - ``App.tsx``
    - App Component (샘플)
    - Component 이름과 파일 이름 맞추는게 관례
    - export는 항상 default로
  - ``index.css`` : 글로벌 스타일 작성
  - ``index.tsx``
    - entry file
    - ReactDOM.render()를 통해 index.html의 root(DOM)에 react Component를 매칭 해줌
    - pwa를 위한 서비스 워커 등록
- ``tsconfig.json`` contains TypeScript-specific options for our project. ([참고](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html))
- ``package.json`` contains our dependencies, as well as some shortcuts for commands we'd like to run for testing, previewing, and deploying our app.


#### 기본 커맨드
- ``npm start`` : Starts the development server.
- ``npm run build`` : Bundles the app into static files for production.
- ``npm test`` : Starts the test runner.
- ``npm run eject`` : Removes this tool and copies build dependencies, configuration files and scripts into the app directory. If you do this, you can’t go back!

</br>

### \<Component 생성>
- 종류
  > - React.Component 상속
  > - React.PureComponent 상속
  > - Stateless Component(function)
  >   - Component 내부에서 state 사용 불가
  >   - Lifecycle 지원 안함

#### React.Component 상속
- props와 state의 interface 지정 해줘야 함
```js
/*
* App.tsx
*/
import React from 'react';
import './App.css';

export interface AppProps {
  name : string;
}

interface AppState {
  age : number;
}

class App extends React.Component<AppProps, AppState> {
  constructor(props : AppProps) {
    super(props);
    this.state = {
      age : 35
    };
  }
  render() {
    return (
      <div className="App">
        {this.props.name}, {this.state.age}
        <StatelessComponent name="Anna"/>  //Stateless Component
      </div>
    );
  }
}

export default App;
```
```js
/*
* index.tsx
*/
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(
  <App name="Mark"/>
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
```

#### Stateless Component
```js
/*
* App.tsx
*/
...
const StatelessComponent : React.SFC<AppProps> = () => {
  return (
    <h2>{props.name}</h2>
  );
}
...
```

</br>

### [\<Lifecycle>](https://www.zerocho.com/category/React/post/579b5ec26958781500ed9955)
- Component를 class로 만들때 사용
#### 종류
- Component 생성, 마운트 관련 함수
  - ``constructor()``
  - ``componentWillMount()``[deprecated_17]
    - Component 처음 실행될 때
    - context, defaultProps, state 저장
    - 주의) props나 state 변경하면 안되고 render 전이기 때문에 DOM에 접근 불가
  - ``render()``
    - Component를 DOM에 render
  - ``componentDidMount()``
    - 마운트 완료된 시점
    - DOM 접근 가능
    - AJAX 요청, setTimeout, setInterval 같은 동작 수행
  - ``componentWillUnmount()``
    - Component 제거
- Component의 props 변경 관련 함수
  - ``componentWillReceiveProps()``[deprecated_17]
    - props 업데이트 감지 후 처음으로 호출됨
    - state 업데이트 했을때 호출되지 않음
    - 이 단계에서 setState()를 통해 state 업데이트 하면 다음 shouldComponentUpdate()에서 props, state 한번에 변경됨
  - ``shouldComponentUpdate()``
    - props, state 업데이트 시 다 호출됨 (인자로 newProps, newState 정보 받음)
    - return false하면 render 취소 (default는 true 리턴)
    - 주로 성능 최적화 작업
  - ``componentWillUpdate()``[deprecated_17]
    - 주의) 여기서 state 변경하면 props 업데이트 전에 또 shouldComponentUpdate가 발생하므로 state 변경 하지 말것
  - ``render()``
    - 변경된 props로 DOM에 업데이트 작업
  - ``componentDidUpdate()``
    - 업데이트 완료 시점에 호출
    - DOM 접근 가능
- Component의 state 변경 관련 함수
  - ``shouldComponentUpdate()``
  - ``componentWillUpdate()``
  - ``render()``
  - ``componentDidUpdate()``

</br>

### \<Component에 Event 연결>
- DOM의 event명은 JSX에서는 낙타표기법으로
  - Ex) DOM onclick => JSX onClick
- event 처리할 함수 연결
- event 처리 함수 내부에서 this를 사용한다면 scope 때문에 constructor에서 함수 binding 해줘야함 (?)
```js
/*
* App.tsx
*/
...
class App extends React.Component<AppProps, AppState> {
  constructor(props : AppProps) {
    super(props);
    this.state = {
      age : 35
    };
    this._rollback = this._rollback.bind(this);
  }
  render() {
    return (
      <div className="App">
        {this.props.name}, {this.state.age}
        <button onClick={this._rollback}>회춘</button>
        <StatelessComponent name="Anna"/>  //Stateless Component
      </div>
    );
  }
  private _rollback() : void {
    this.setState({
      age : 25
    });
  }
}

export default App;
```

</br>

### \<Default Props>
- props 값이 안들어오는 경우에 default로 설정해줄 값 지정하는 방법
#### Class Component
- class 내부에 static defaultProps 지정
```js
/*
* App.tsx
*/
...
export interface AppProps {
  name : string;
  company? : string;
}
...
class App extends React.Component<AppProps, AppState> {
  static defaultProps = {
    company : 'something'
  };
  
  constructor(props : AppProps) {
    super(props);
    this.state = {
      age : 35
    };
  }
  render() {
    return (
      <div className="App">
        {this.props.name}, {this.props.company}, {this.state.age}
        <StatelessComponent name="Anna"/>  //Stateless Component
      </div>
    );
  }
}
...
```
#### Function Component
- 해당 SFC의 defaultProps를 지정
- 방법1
```js
/*
* App.tsx
*/
...
const StatelessComponent : React.SFC<AppProps> = {props} => {
  return {
    <h2>{props.name}, [props.company}</h2>
  };
};

StatelessComponent.defaultProps = {
  company : 'Home'
};
...
```
- 방법2
```js
/*
* App.tsx
*/
...
const StatelessComponent : React.SFC<AppProps> = {name, company = "Home"} => {
  return {
    <h2>{name}, [company}</h2>
  };
};
...
```

</br>

### \<Component 변경하기>
