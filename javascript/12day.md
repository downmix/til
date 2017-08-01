### pass-by-reference
기본자료형 object를 객체형, 참조형 이라고 한다.  
참조는 실제값이 아닌 참조된 값을 말한다.  
```javascript
var foo = { 
  val: 10
}
var bar = foo;
```
만약 bar.val = 20; 으로 수정해도 foo쪽도 참조가 동일하므로 값도 같다.

### pass-by-value
값이 복사되어 값으로 전달된다.
객체는 변경이 가능하지만, 기본자료형은 값이 한번 정해지면 변경이 안된다.

## 함수
반복적인 코드 사용에 있어 재사용이 가능하도록 함수화 한다.

### 함수를 정의하기
#### 함수선언식
```javascript
function square(number) {
  return number * number;
}
```

- 함수명 : 생략불가. 함수호출을 해야되기때문에 명시적으로 구분된 이름이어야 한다.
- 매개변수 목록: 0개 이상의 매개변수를 담는다. 자료형을 선언하지 않기 때문에 자료형체크가 필요하다.
- 함수 몸체: 함수 호출시 실행되는 코드. { }로 묶고 return으로 반환한다. 반환된 값을 return value라고 한다.

#### 함수표현식
```javascript
var square = function(number) { 
  return number * number;
};
```

- 함수 리터널(값)을 변수로 저장된다.
- 익명함수로(함수명 없음) 생략할 수 있다. (<>반대 기명함수)
- 기명함수명으로 호출은 안된다.

```javascript
// 기명 함수표현식(named function expression) 
var foo = function multiply(a, b) { 
  return a * b;
}; 
// 익명 함수표현식(anonymous function expression) 
var bar = function(a, b) {
  return a * b;
}; 

- 객체 처럼 사용할수도 있다.
var foo = function(a, b) {
  return a * b;
};
var bar = foo; 

console.log(foo(10, 10)); // 100
console.log(bar(10, 10)); // 100
```

- 내부적으로는 함수선언식도 함수표현식과 동일하게 동작한다.

#### Function 생성자 함수
```javascript
var square = new Function('number', 'return number * number');
console.log(square(10)); // 100
```
잘 사용하진 않는다.


### 함수 호이스팅
변수 호이스팅과 비슷하지만 변수는 undefined으로 호이스팅 되지만
함수는 실행이 가능하다.
```javascript
var res = square(5);  //실행가능
function square(number) {
  return number * number;
}

var res = square(5); // TypeError: square is not a function
//함수 호이스팅이 아닌 변수 호이스팅 되어 에러발생
var square = function(number) {
  return number * number;
}
```
> 의도하지 않는 오류가 발생할수도 있기때문에 선언전에 호출하는 코딩은 금지.

# First-class object (일급 객체)
JS의 특징중 하나. 프로그래밍언어의 기존적인 조작에 제한없이 사용할수있는 것을 뜻한다.

- 무명의 리터럴로 표현이 가능하다.
```javascript
foo.addEventListener( 'click', function (e) { 
 // foo가 클릭됬을때 실행
}, false);
```
처럼 function (e) 만으로 익명함수(anonymous function)가 존재한다.
- 변수나 자료 구조(객체 배열...)에 저장 할 수 있다.
```javascript
var foo = function(){
  ...
}
```
- 함수의 파라미터로 전달할 수 있다.
```javascript
function calc(func, num){
  return func(num);
}
```
- 반환값으로 사용할수 있다.

## 매개변수 (parameter, 인자)
함수에 전달할때 메모리공간을 확보하여 전달되며, 인수(argument)는 매개변수에 할당된다.
만약 인수가 전달되지 않으면 undefined로 초기화한다.
```javascript
var foo = function (p1, p2) { 
  console.log(p1, p2);
};

foo(1); // 1 undefined
```

## call by reference  
참조에 의한 호출.
함수 호출시 매개변수로 전달할때 참조값으로 전달.

## call by value
값에 의한 호출.
함수 호출시 매개변수로 전달할때 변수값을 복사하여 전달.

## 반환값
함수는 자신을 호출한 코드에 수행한 결과를 반환 할수있다.
- return 사용하여 반환
- 배열같은 것으로 한번에 여러개를 반환 할수도 잇다.
- return 생략가능하다. 이때 암묵적으로 undefined로 반환
- return를 만나면 함수가 중단되고 반환후 호출한 코드로 돌아간다. (해당 함수 종료)

## 함수객체 프로퍼티
함수는 객체이다. 그래서 함수도 프로퍼티를 가진다.

### arguments
아규먼트 객체는 함수호출시 전달된 인수들의 정보들이 있다.
매개변수들의 객체(?)
만약 매개변수가 가변적일 경우 이 속성을 활용하여 사용한다.

### caller 
자신을 호출한 함수의 정보

### length 프로퍼티
함수 정의 할때 작성된, 매개변수 개수.

### name 프로퍼티
해당 함수 명.
익명함수 일경우 빈문자열을 반환.

### __proto__ 프로퍼티
모든 객체는 자신의 프로토타입을 가르키는 숨겨진 프로퍼티를 가진다.
해당 객체의 부모역할을 하는 프로토타입객체를 가르킨다.

### prototype 프로퍼티
함수객체만 가지고있다. ( __proto__는 모든 객체가 갖는다. )  
함수객체의 __proto__는 Function.prototype.  
함수객체의 prototype은 생성된 프로토타입을 뜻하며, 역으로 생성된 프로토타입에서 constructor은 함수객체 프로토타입이다.

## 함수의 형태
### IIFE 즉시호출함수표현식
```javascript
// 기명 즉시실행함수(named immediately-invoked function expression) 
(function myFunction() { 
  var a = 3; var b = 5;
  return a * b;
}()); 

// 익명 즉시실행함수(immediately-invoked function expression) 
(function() {
  var a = 3; var b = 5;
  return a * b;
}());
```

곧바로 실행되며, 다시 호출은 안된다.
JS의 단점중 하나가 글로벌스코프 관리가 어려워 중복될 가능성이 있는데,  
즉시실행함수를 통해 변수충돌이 방지된다.  
대표적으로 jQuery.

### 내부함수
함수 내에 함수를 선언하면 내부함수.
내부함수는 자신과 부모함수의 변수들을 접근 할수있다.  
하지만 부모함수는 자식함수의 변수에 접근 못한다.
클로저와 관련.

### 콜백함수
콜백함수는 함수가 바로 실행되는것이 아닌, 특정 이벤트 발생할때 시스템에서 호출되는 함수이다.
ex) 클릭이벤트 처리
