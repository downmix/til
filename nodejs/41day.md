# VScode node 디버그모드

- .vscode/launch.json or 디버그 메뉴 톱니바퀴
- 구성추가
```js
{
  "version": "0.2.0",
  "configurations": [
  {
    "type": "node",
    "request": "attach",
    "name": "Attach",
    "port": 9229
  }
  ]
}
```

- inspect 명령으로 node실행
```
$ node --inspect src/index.js
Debugger listening on ws://127.0.0.1:9229/35a72661-d631-44c4-806d-268ef3d0e208
For help see https://nodejs.org/en/docs/inspector
listening...
```

- 코드의 debug 포인트 지정
- vscode 디버그 run OR `F5`
- 브라우저 접속

# CSRF (Cross-site Request Forgery) 
사이트 간 요청 위조. 사용자가 악의적인 웹 페이지에 접속했을 때 해당 웹 페이지에서 다른 서버로 요청을 보내어 정보를 조작하는 공격 기법.  
GET으로 데이터를 조작하는 경우가 없어야 한다.

쿠키로 구성된 웹사이트의 경우 같은 URL요청에 자동으로 쿠키가 포함된다.

자동으로 쿠키가 포함되기 때문에 악의적인 해커의 피싱에 걸릴수 있다.

사용자가 우리 웹 페이지에 접속하지 않고는 데이터를 조작하는 요청(POST)을 보낼 수 없게 CSRF 토큰(사용자마다 다른) 을 사용해야 한다.

express에서 관련 미들웨어가 있다. https://www.npmjs.com/package/csurf
 
## express + csurf(CSRF 미들웨어) 세팅
```
$ npm install csurf
```

```js
const csurf = require('csurf');
 
const csrfMiddleware = csurf();
 
app.use(cookieSession({
  name: 'session',
  keys: ['mysecret']
}));
app.use(csrfMiddleware); // 모든 페이지에 미들웨어 세팅됨
```

```html
<!-- 모든 form에 _csrf토큰 추가 -->
<form action="/logout" method="post">
  <input type="hidden" name="_csrf" value="<%= csrfToken %>">
<input type="submit" value="로그아웃">
</form>
```

csrfToken은 항상 바뀌며 임의로 만든 토큰값은 오류를 발생하게 한다.
 
 
# 소켓io
웹소캣은 http 실시간통신을 위해 구현하는 방법.

Socket.io는 실시간 웹을 위한 JS 라이브러리. 실시간 통신을 위해 주로 WebSocket 웹 표준 기술을 사용하지만, 구형 웹브라우저 등 WebSocket을 지원하지 않는 환경에서는 다른 기술을 사용할 수도 있다.(long polling, comet 등) 다른 일반적인 웹소켓 서버와는 호환이 되지 않는다.

Socket.io는 서버 측 라이브러리(Node.js)와 클라이언트 측 라이브러리(브라우저 측 JS)의 두 부분으로 이루어져 있다. 하지만 양쪽다 사용법이 비슷한다. https://socket.io/

- long polling : 주기적으로 요청을 보내서 변경사항을 반영
- comet : 항상 요청을 보내고 서버에서 대기하다가 필요시 응답
- websocket : 웹표준으로 지정한 소캣통신, 클라이언트, 서버가 필요시 전송한다.
 
```js
// 서버
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
 
const app = express();
const server = http.Server(app);
const io = socketio(server);
 
io.on('connection', socket => {
  
  // Simple Message
  socket.on('message', data => {
    // 현재 네임스페이스에 접속 중인 모든 클라이언트에게 메시지 보내기
    io.emit('response', data)
  })
  
  // Acknowledgement
  socket.on('messageAndAck', (data, ack) => {
    io.emit('response', data)
    // 메시지를 보낸 클라이언트에 회신하기
    ack({ok: true})
  })
  
  // Broadcast
  socket.on('broadcast', data => {
    // 메시지를 보낸 클라이언트를 제외한 모든 클라이언트에게 메시지 보내기
    socket.broadcast.emit('response', data)
  })
})
```

```js
//클라이언트
ocument.addEventListener('DOMContentLoaded', () => {
  //DOM이 로드되면 실행
  const socket = io()
  
  socket.on('response', data => {
    console.log(`${data.message} @ ${new Date}`)
  })
  
  document.querySelector('#message').addEventListener('click', e => {
    socket.emit('message', {message: '간단한 메시지를 보낼 수 있습니다.'})
  })
  
  document.querySelector('#message-and-ack').addEventListener('click', e => {
    socket.emit('messageAndAck', {message: '메시지를 보낸 후에 서버에서 응답을 받을 수도 있습니다'}, data => {
      console.log(data)
    })
  })
  
  document.querySelector('#broadcast').addEventListener('click', e => {
    socket.emit('broadcast', {message: '다른 클라이언트만 가는 메시지를 보낼 수 있습니다.'})
  })
})
```

- 네임스페이스 기준으로 구성
```js 
// 서버
const someNsp = io.of('/some-namespace')
 
someNsp.on('connection', socket => {
  socket.on('message', data => {
    someNsp.emit('response', data)
  })
})
```

```js
// 클라이언트
// 특정 namespace에 대한 연결 수립
  const socket = io('/some-namespace')
  
  socket.on('response', data => {
    console.log(`${data.message} @ ${new Date}`)
  })
  
  document.querySelector('#message').addEventListener('click', e => {
    socket.emit('message', {message: '특정한 이름공간에 접속할 수 있습니다. 통신은 다른 이름공간과 분리됩니다.'})
  })
```
 
- Room 기준으로 구성
room은 동적으로 지정할 수 있는 통신의 분리 단위.
하나의 소켓은 여러 개 room에 들어갈 수 있다.

```js
//서버
const roomNsp = io.of('/room')
 
roomNsp.on('connection', socket => {
  let id;
  socket.on('join', data => {
    // `socket.join`을 호출해서 특정 room에 진입합니다.
    socket.join(data.id)
    id = data.id
  })
  
  socket.on('message', data => {
    // `socket.to`는 이벤트 방출을 특정 room에 한정시킵니다.
    roomNsp.to(id).emit('response', data)
  })
})
 
const listener = server.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port)
})
```

```js
//클라이언트 
 
  // room namespace에 대한 연결 수립
  const socket = io('/room')
  const dataEl = document.querySelector('[data-id]')
  
  socket.emit('join', {id: dataEl.dataset.id})
  
  socket.on('response', data => {
    console.log(`${data.message} @ ${new Date}`)
  })
  
  document.querySelector('#message').addEventListener('click', e => {
    socket.emit('message', {message: 'room 단위로도 통신을 분리할 수 있습니다.'})
  })
```