# Coding 입문
코딩은 컴퓨터에 명령을 전달하는 커뮤니케이션 방법 이다.  
기본적으로 컴퓨터는 0과 1만 알고있다.

- bit : 0/1
- byte : bit * 8

> 컴퓨터한테 명령을 하기위해서는 0 과 1로 명령해야되지만, 인간이 하기에 어려움.  
그래서 C언어와 같은 고급언어가 만들어졌다.

- 컴파일러 : C, C++ 고급언어를 통해 기계어로 번역(컴파일)
- 인터프린터 : javascript, 고급언어를 통해 실시간 번역

# javascript 입문
- 웹 브라우저에서 동작하는 유일한 언어.
- 초기에는 웹페이지에 있어 보조적인 역활을 위해 만들어짐.
- 하지만 웹프로그램이 방대해 지면서 개선이 필요해지게된다.
- 이런점들을 개선하기 위해 다양한 활동들이 있었는데, jquery를 통해 javascript를 좀더 쉽게 다루게되어 많은 사람들이 사용하게된다.
- 그리고 ECMAScript6(2015) 이후로 JS의 영역이 넓어진다.
- 구글 v8 JS엔진의 등장으로 구동속도가 빨라지고, 백엔드 node.js의 등장으로 JS의 영역이 넓어진다.
- 브라우저가 모든영역을 삼킨다는 말도 이런환경을 통해 예측을 하고있다.

## javascript 특징
- H/W -> OS -> Browser -> JS  
  각 플랫폼을 통해서 JS는 브라우저내에서 동작한다.
- 인터프린터 언어
- 자유도가 높은 개발이 가능 (명령형, 함수형, 프로토타입, 클래스객체....)
- 프로토타입 기반의 객체지향 언어.

## 브라우저 동작원리
- 브라우저는 사용자가 웹페이지를 서버에 요청(Request)하고 응답(Response)을 받아 브라우저에 표시한다. 
- 브라우저는 서버로부터 html, css, javascript 파일을 응답받는다. 
- html, css 파일은 렌더링 엔진의 'HTML파서'와 'CSS파서'에 의해 파싱(Parsing)되어 DOM 트리, CSSOM 트리로 변환되고, 렌더 트리로 결합된다.
- HTML 파서는 script 태그를 만나면 DOM 생성 프로세스를 중지하고 자바스크립트 엔진에 제어 권한을 넘긴다. 
- 자바스크립트 엔진 실행이 완료된 후, 브라우저가 중지했던 시점부터 DOM 생성을 재개한다. 
- 이것은 script 태그의 위치에 의해 DOM의 생성이 지연될 수 있음을 의미한다. (그래서 html body 끝 직전 마지막에 js를 넣는다.)

# javascript 

## 선언
body 마지막에 script 추가
```html
<script src="extern.js"></script>
```

## 속성
```html
<script async src="extern.js"></script> 
<script defer src="extern.js"></script>
```
웹페이지 파싱과 스크립트 파일의 다운로드가 동시에 진행된다.   
IE9 이하는 제대로 안된다.

- async : 다운로드 완료 직후 실행
- defer : 웹페이지 파싱 완료 직후 실행

## 구문
- 스크립트는 단계적으로 실행된다.
- 구문에는 ;로 끝낸다.
- 구문은 { } 코드블럭으로 그룹화 할수있다.
- 표현식 : 10 + 1 , 'text' + ' '
- 변수 : 값을 저장(할당) 하는공간. var box;
- 값 : Boolean, null, undefined, Number, String, Object, Symbol(ES6)
  - boolean :	논리요소. true(1)와 false(0) 두가지만 가질수있다.
  - null :	변수가 가르키는 메모리주소 또는 값을 없앤다. 소문자로만 써야함.
  - undefined :	값을 할당하지 않는 변수, 존재하지 않는 객체프로퍼티에 접근할경우 반환된다.
- 연산자 : 논리연산, 대입연산, 산술연산, 비교연산  var bar = (5 > 3) && (2 < 4);
- 키워드 : 동작하는 명령어 ex) var, if, for
- 주석 : //comment, /* comment */

