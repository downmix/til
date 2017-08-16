# Event 이벤트
이벤트(event)는 어떤 사건을 의미한다. 

브라우저에서의 이벤트란 예를 들어 사용자가 버튼을 클릭했을 때, 웹페이지가 로드되었을 때의 상황에서 이벤트가 발생하는데, 이벤트 발생시 이것을 감지하여 그에 대응하는 처리를 한다.  
이벤트 핸들러는 그 함수가 이벤트가 발생하기 전까지 실행하지 않다가 이벤트가 발생하면 실행하게 된다.
 
```js
var elem = document.getElementById('myButton');
elem.addEventListener('click', function() {
  console.log('Clicked!');
});
```

addEventListener의 콜백함수는 myButton 버튼이 클릭되어 “onclick” 이벤트가 발생하면 이벤트 큐로 이동한 후 Call Stack이 비어졌을 때 Call Stack으로 이동되어 실행된다.
 
## 이벤트 종류
### UI
- load  
웹페이지의 로드가 완료되었을 때
- unload  
웹페이지가 언로드될 때(주로 새로운 페이지를 요청한 경우)
- error  
브라우저가 자바스크립트 오류를 만났거나 요청한 자원이 존재하지 않는 경우
- resize   
브라우저 창의 크기를 조절했을 때
- scroll  
사용자가 페이지를 위아래로 스크롤할 때
- select  
텍스트를 선택했을 때

### Keyboard
- keydown  
키를 누르고 있을 때
- keyup  
누르고 있던 키를 뗄 때
- keypress  
키를 누르고 뗏을 때
 
### Mouse 
- click  
마우스 버튼을 클릭했을 때
- dbclick  
마우스 버튼을 더블 클릭했을 때
- mousedown  
마우스 버튼을 누르고 있을 때
- mouseup  
누르고 있던 마우스 버튼을 뗄 때
- mousemove  
마우스를 움직일 때 (터치스크린에서 동작하지 않는다)
- mouseover  
마우스를 요소 위로 움직였를 때 (터치스크린에서 동작하지 않는다)
- mouseout  
마우스를 요소 밖으로 움직였를 때 (터치스크린에서 동작하지 않는다)
 
### Focus
- focus/focusin  
요소가 포커스를 얻었을 때
- blur/foucusout  
요소가 포커스를 잃었을 때
 
### Form
- input  
input 또는 textarea 요소의 값이 변경되었을 때  
contenteditable 어트리뷰트를 가진 요소의 값이 변경되었을 때
- change  
select box, checkbox, radio button의 상태가 변경되었을 때
- submit  
form을 submit할 때 (버튼 또는 키)
- reset
reset 버튼을 클릭할 때 (최근에는 사용 안함)
 
### Clipboard
- cut  
콘텐츠를 잘라내기할 때
- copy  
콘텐츠를 복사할 때
- paste  
콘텐츠를 붙여넣기할 때
 
## 이벤트 바인딩
### HTML Event Handler
```html
<!DOCTYPE html>
<html>
<body>
  <button onclick="myFunction()">Click me</button>
  <script>
    function myFunction() {
      alert('Button clicked!');
    }
  </script>
</body>
</html>
```
오래된 방식이며, 더이상 사용되지 않는다.
HTML과 JS는 분리되어있지 않다.
 
### 전통적인 DOM Event Handler
```html
<!DOCTYPE html>
<html>
<body>
  <button id="btn">Click me</button>
  <script>
    var btn = document.getElementById('btn');
 
    // 첫번째 바인딩된 이벤트 핸들러 => 실행되지 않는다.
    btn.onclick = function () {
      alert('Button clicked 1');
    };
  </script>
</body>
</html>
```
HTML과 JS가 분리되었지만 하나의 함수만 바인딩할수 있으며 함수에 인자를 전달 할 수 없다.
 
 
### DOM Level 2 Event Listener
addEventListener() 함수를 이용하여 대상 요소에 이벤트를 바인딩하고 해당 이벤트가 발생했을 때 실행될 콜백 함수를 지정한다.
 
- 하나의 이벤트에 대해 하나 이상의 핸들러를 추가할 수 있다.
- 캡처링과 버블링를 지원한다.
- HTML 요소뿐만아니라 모든 DOM 요소에 대해 동작한다.
- IE9 이상 부터 지원
```js
var MIN_USER_NAME_LENGTH = 2; // 이름 최소 길이
 
var elem = document.getElementById('username');
var msg  = document.getElementById('message');
 
function checkUserNameLength(n) {
  if(elem.value.length < n) {
    msg.innerHTML = '이름은 ' + n + '자 이상이어야 합니다';
  } else {
    msg.innerHTML = '';
  }
}
 
elem.addEventListener('blur', function() {
  checkUserNameLength(MIN_USER_NAME_LENGTH);
});
```

# 핸들러 함수내의 this
## HTML 이벤트 핸들
this는 전역 window를 가르킨다.

```html
<button onclick="foo()">Button</button>
<script>
    function foo () {
        console.log(this); // window
        console.log(event.currentTarget); // <button>     
}
</script>
```

## 전통적(Traditional) DOM Event Handler
this는 이벤트에 바인딩 된 요소를 가르킨다.
```html
<button id="btn">Button</button>
<script>
  var btn = document.getElementById('btn');
  btn.onclick = function() {
    console.log(this); // <button id="btn">Button</button>
    console.log(event.currentTarget); // <button id="btn">Button</button>
    console.log(this === event.currentTarget); // true
  };
</script>
```

## DOM Level 2 Event Listener
this는 이벤트 리스너에 바인딩된 요소를 가르킨다.
```html
<button id="btn">Button</button>
<script>
  var elem = document.getElementById('btn');
  elem.addEventListener('click', function (event) {
    console.log(this); // <button id="btn">Button</button>
    console.log(event.currentTarget); // <button id="btn">Button</button>
    console.log(this === event.currentTarget); // true
  });
</script>
```

# 이벤트 흐름
HTML은 노드로 계층적인 구조로 이루어져있는데, html요소에 이벤트가 발생하면 연쇄반응(캡처링, 버블링)이 일어난다. 
- 캡처링 : 부모요소부터 이벤트발생한 자식요소까지 도달
- 버블링 : 이벤트발생한 자식요소 부터 부모요소까지 도달

자식요소중 이벤트가 발생하면 캡처링 - 해당요소 - 버블링 순으로 순서대로 작동하게 된다.


원하지 않는 명령이 수행되지 않게 하려면 addEventListener()으로 캡처링 버블링을 설정하거나, Event.stopPropagation() 명령을 통해 중단해야한다.
 
 
# 이벤트 객체
event객체는 이벤트를 발생시킨 요소와 정보를 제공한다.   
이벤트가 발생하면 event객체는 브라우저에서 동적으로 생성되며 이벤트가 실행된다.  
이벤트 핸들러내에 event객체를 사용할때 event객체는 암묵적으로 전달된다.
```html
<!DOCTYPE html>
<html>
<body>
  <em id="message"></em>
  <script>
  function showCoords(e, msg) {
    msg.innerHTML =
      'clientX value: ' + e.clientX + '<br>' +
      'clientY value: ' + e.clientY;
  }
 
  var msg = document.getElementById('message');
 
  addEventListener('click', function(e) {
    showCoords(e, msg);
  });
  </script>
</body>
</html>
```
 
## 이벤트 속성들
### Event.target
이벤트를 발생시킨 요소를 가리킨다.
 
```js
function hide(e) {
  e.target.style.visibility = 'hidden';
}
 
document.querySelector('button').addEventListener('click', hide);
```

### Event.currentTarget
이벤트 리스터에 바인딩된 요소를 가리킨다.
이벤트핸들러 함수내의 this와 동일하다.

```js
function bluify(e) {
  // this: 이벤트 리스너에 바인딩된 요소(div 요소)
  console.log('this: ', this);
  // target: 이벤트를 발생시킨 요소(button 요소 또는 div 요소)
  console.log('e.target:', e.target);
  // currentTarget: 이벤트 리스너에 바인딩된 요소(div 요소)
  console.log('e.currentTarget: ', e.currentTarget);
 
  // 언제나 true
  console.log(this === e.currentTarget);
  // currentTarget과 target이 같은 객체일 때 true
  console.log(this === e.target);
 
  // click 이벤트가 발생하면 이벤트를 발생시킨 요소(target)과는 상관없이 this(이벤트 리스너에 바인딩된 요소(div 요소))의 배경색이 변경된다.
  this.style.backgroundColor = '#A5D9F3';
}
 
// div 요소에 이벤트 핸들러가 바인딩되어 있다. 
// 자식 요소인 button이 발생시킨 이벤트가 버블링되어 div 요소에도 전파된다.
// 따라서 div 요소에 이벤트 핸들러가 바인딩되어 있으면 자식 요소인 button이 발생시킨 이벤트를 div 요소에서도 핸들링할 수 있다.
document.querySelector('div').addEventListener('click', bluify);
```

### Event.type
발생한 이벤트 종류를 나타내는 문자열을 반환한다.
 
### Event.cancelable
요소의 동작을 취소시킬수 있는지 여부를 나타낸다.
 
# 이벤트 위임
기본적으로 각 요소의 이벤트 처리하기 위해서는 각각 이벤트핸들러를 바인딩 해야하지만, 만약 바인딩할 요소가 수백개로 많다면 사용하기가 어렵다.
 

이벤트위임은 부모요소 이벤트 핸들러를 바인딩하여 자식요소의 이벤트 처리를 하는것을 말한다.  
버블링을 응용되어 활용이 가능하다.
 
```js
var msg = document.getElementById('msg');
 
document.getElementById('parent-list').addEventListener('click', function (e) { 
  // list item이면
  if (e.target && e.target.nodeName == 'LI') {
    msg.innerHTML = 'li#' + e.target.id + ' was clicked!';
  }
});
```
 
# 기본동작의 변경
요소의 기본동작과 부모요소들의 가지고있는 기본동작들을 변경 해주는 메소드.
## Event.preventDefault()
이벤트의 기본동작을 취소한다.
 
##  Event.stopPropagation()
이벤트의 전파(버블링, 캡처링)을 중단한다.
 
 
