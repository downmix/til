# node nvm 인스톨
nvm를 경유로 설치를 진행하면 여러버전의 node를 설치하며 관리할수 있다.

원하는 버전을 선택하여 개발이 가능하다.
```
$ nvm install 8.4
$ nvm use 8.4
$ nvm alias default 8.4
```

# node.js
Node.js은 chrome의 v8 자바스크립트 엔진에 기반한 자바스크립트 런타임이다.
 
## JS 런타임
JS런타임(runtime)은 JS를 구동하기 위해 필요한 실행 환경.
프로그래머는 런타임이 제공하는 도구를 응용해서 프로그램을 개발한다.
- Chrome : 웹 브라우저용 런타임
- NodeJS : 서버용 런타임
- MongoDB : 데이터 처리용 런타임
- Photoshop : 전용 런타임
 
## V8 엔진
JS를 JIT컴파일(프로그램을 실제 실행하는 시점에 기계어로 번역) 언어이다.
 
## 이벤트 driven 
프로그램의 흐름이 외부 요인에 의해 일어나는 이벤트기준 프로그래밍 양식.

이벤트 핸들러를 선언함으로써 외부 이벤트가 일어났을 때 코드를 실행.

```js 
// DOM 이벤트 핸들러 등록 (웹 브라우저)
domElement.addEventListener('click', function(e) {
e.stopPropagation()
alert('hello')
})
// 서버도 똑같이 합니다.
// (단, 프레임워크를 쓸 때는 직접 이벤트를 다룰 일이 별로 없음)
// HTTP 응답 이벤트 핸들러 등록 (Node.js)
httpResponse.on('data', data => {
console.log(data)
})
```

## non-blocking I/O
- Blocking I/O : 스레드가 입/출력이 완료될 때까지 대기한 다음 코드를 실행
- Non-blocking I/O: 스레드가 입/출력을 기다리지 않고 계속 코드실행

JS는 non-blocking I/O이기 때문에, I/O성능에서는 좋지만, 코드가 복잡해질수있다.
 
## node.js Module
```js 
// name.js
// `module.exports`에 저장한 값은 다른 모듈에서 불러올 수 있음
module.exports = {
  familyName: '김',
  givenName: '승하',
  fullName: function() {
    return this.familyName + this.givenName
  }
}
 
// calc.js
// `exports`로도 참조 가능
exports.add = (x, y) => x + y
exports.sub = (x, y) => x - y
 
// 실행
const name = require('./name');
name.familyName;
name.fullName();
require('./calc').add(1, 2)
 
```

exports를 선언해야만 외부에서 불러올수가 있다.  
node.js는 각 모듈별로 스코프가 나뉘어져있는데( 브라우저에서는 전역 1개) 각 모듈파일별로 스코프가 구분되어있다.

외부 모듈파일의 요소를 참조하기 위해서는 export를 선언해야한다.
 
# NPM
node.js 패키지 매니저.
- 의존 패키지 관리
- 스크립트 실행
- 패키지 설정
- NPM에 패키지 배포
- Node.js 종합 작업 도구
 
## package.json
패키지 정보를 담고 있는 파일.
 
# Concurrentcy 동시성
프로그램 생애주기(실행부터 끝까지)가 여러개가 겹치더라도 자원공유하는데 있어 충돌하지 않도록 설계하는것.
 
## thread(쓰레드)
코드실행에 있어 가장 작은단위.  
프로그램은 하나이상의 스레드를 사용하여 구동한다.
 

JS에서는 신경쓰지 않아도 쉽게 코딩 할 수 있지만, 그렇다고 성능이슈에 자유롭다는것은 아니다.  

오래걸리는일은 외부에 넘기고 나중에 결과를 받아 처리한다.
길게 걸리는 실행과정을 여러함수로 나누어 실행한다
 
## 비동기 자바스크립트 (Asynchronous JavaScript)
non-blocking과 asynchronous는 비슷한 하지만, non-blocking은 코드의 실행 순서에 대한 개념이고, asynchronous는 코드 작성 방식에 대한 개념이다.
 
- 함수를 호출할 때, 콜백과 인자를 같이 넣어 호출하는 비동기 프로그래밍 양식
- 콜백에서 에러 인자를 받는 방식으로 에러 처리를 함
- Node.js 내장 모듈 전체가 이 방식을 사용하도록 만들어져 있음
- but. 모든 콜백이 비동기인 것은 아님
 
### 비동기식 에러처리
```js
const fs = require('fs'); // Node.js 내장 모듈
fs.readFile('./calc.js', 'utf8', (err, data) => {
  // 에러처리
  if(err) { //error가 있으면
    console.error(err);
  }else { //errro가 없으면 
    console.data(data);
  }
});
console.log('done!');
```
 
### 동기식 에러처리
```js
const fs = require('fs'); // Node.js 내장 모듈
try {
  const data = fs.readFileSync('./calc.js', 'utf8');
  console.log(data);
} catch (err) {
  console.log(err);
}
console.log('done!');
```

# Promise
비동기 작업의 결과를 담는 객체
코드가 처리됨에 따라 성공 또는 실패의 상태를 갖게 되며, 이 상태가 되었을 때 비로소 콜백을 실행하라는 명령을 갖게 된다.
 
- pending : 아직 수행 중... (fulfilled, rejected 되기 전)
- fulfilled promise: 수행된 상태
- rejected promise: 거부된 상태
- settled: fulfilled이든 rejected이든 결론이 난 상태

```js 
// 10초 뒤에 콜백(promise 객체를 새로 만들어서 리턴)을 실행하는 함수
module.exports = function tenSec(value) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(value)
    }, 10000)
  })
}
```

## .then
new Promise ()의 결과는 promise이며, .then 메소드에서 반환된 값도 promise이다.

따라서 .then 메소드를 계속 사용할 수 있다.  
.then 메소드를 쓰면 들여쓰기를 하지 않기 때문에 Callback Hell을 피할 수 있다.

return은 바로 실행되는 동기식 작업이다.  
비동기 작업을 하려면 콜백을 통해서 해야 했다.

```js
new Promise()
.then(value => {
  request.get( function(){
})
return // 콜백은 함수 밖에서 리턴이 불가하다
})
```

### Promise.all( [Arr] )
모든 프라미스가 성공해야 성공하는 promise
 
### Promise.race( [Arr] )
가장 빨리 성공하는 promise를 반환
 
### util.promisify()
promise를 리턴하도록 묶을수있음.

```js 
const {promisify} = require('util') // Node.js 8.0.0부터 추가됨
const fs = require('fs')
const readFile = promisify(fs.readFile)
readFile('./calc.js', 'utf8')
  .then(data => {
    console.log(data)
  })
  .catch(err => {
    console.error(err)
  })
```

> 보다 깔끔한 코딩을 위해서 라면 Fetch API를 활용할수 있다. (http://hacks.mozilla.or.kr/2015/05/this-api-is-so-fetching/)
 
## Async/Await
- ES2017에서 도입되어, 비동기식 코드를 동기식 코드처럼 쓸 수 있는 문법 제공- 
- 최근에 나온 문법이므로, 아직 promise가 더 사용한다. (Chrome 55, Node.js 8.0.0 부터)
- async function 안에서 반환된 값은 최종적으로 Promise 객체로 변환되어 반환된다.
- async function 안에서 쓸 수 있는 await 키워드는 현재 함수를 중단시키고 Promise 객체가 충족될 때까지 기다리지만, 스레드를 block 하지 않는다.
- 에러 처리는 동기식 코드처럼 try, catch 블록을 통해서 한다.
 
# HTML5 history API
브라우저의 앞으로,뒤로가기의 데이터를 스택형태로 관리하는데 그 영역을 컨트롤하는 API.

실제로 정적인 페이지를 전환하지 않아도, 브라우저 히스토리 스택을 활용하여 웹app처럼 동작하기위해 페이지간 이동을 처리.  
html5 이전에는 URL의 #키워드를 통해서 우회하는 방식을 사용했으며, 현재까지도 사용되고있다.  
 