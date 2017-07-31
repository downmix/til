## 데이터 타입
- boolean	: 논리요소. true(1)와 false(0) 두가지만 가질수있다.  
- null	: 변수가 가르키는 메모리주소 또는 값을 없앤다. 소문자로만 써야함.  
- undefined	: 값을 할당하지 않는 변수, 존재하지 않는 객체프로퍼티에 접근할경우 반환된다.  
- Number	: 64비트 부동소수점. -(253 -1) 와 253 -1 사이 값. NaN값은 숫자값이 아닐경우.  
- String	: 유니코드 문자들 지원 '...' 또는 "..." 으로 구분한다. JS의 문자열은 변경이 불가능하다.  
- Symbol	: ES6용. 유일하며 변경이 안되는 자료형

### 객체형 Object type
- 데이터의 프로퍼티와 메서드가 포함된 독립적 주체이다.  
- JS는 object기반 스크립트언어이고 객체로 이루어져있다.
- 함수(function), 배열(array), 날짜 (date), 정규식(regexp)

## 변수
- 변수명은 명시적으로 잘 지정해야한다.
- 반드시 영문자, _ , $ 로 시작되어야 한다. 그 뒤에 숫자를 사용할수있다.
- 대소문자를 구분한다.
- 선언시 var를 사용한다. (ES6이전)
- 값없이 선언만 된 변수는 undefined로 초기값을 갖는다.

### 변수 특성
- 변수중복선언 :  
  변수를 중복으로 선언이 가능하지만, 문제가 될 여지가 있기에 사용하지 않는것이 좋다.
- var를 생략할 수 있다. :    
  문법적으로는 가능하지만, 문제가 될 여지가 있기에 사용하지 않는다.
- 동적 타이핑 :  
  JS는 동적으로 변수의 타입을 선언할수있다. 사용자가 타입지정을 안해도 자동으로 지정되어 사용한다. 하지만 타입이 자동으로 정해진다해도, 한 변수에 여러 타입을 돌려쓰지 말아야 한다.
- 호이스팅 :  
  코드 실행하기 전 선언문들을 선언과 초기화 단계를 사전에 시행한다. 그래서 모든 변수를 undefined상태로 코드실행을 하기 때문에 변수선언을 안해도 에러가 발생하지 않는다.


### var 변수선언의 문제점
- 전역 변수가 남발된다. & 의도하지 않은 변수가 전역화 된다.
- 의도하지 않는 변수값이 변경될수도있다.
- 변수를 선언하기 전에 참조가 가능하다.

## 연산자
### 산술연산자

`+`	덧셈  
`-` 뺄셈  
`*`	곱셈  
`/`	나눗셈  
`%`	나머지  
`++`	1 증가. `++1` 선증가 후대입, `1++` 선대입 후증가  
`--`	1 감소. `--1` 선감소 후대입, `1--` 선대입 후감소  

> [문자열] + [숫자] = [문자열][숫자] (문자열 형태로 반환된다.)

### 대입연산자
`=`	x=y  
`+=`	x = x+y  
`-=`	x = x-y  
`*=`	x = x*y  
`/=`	x = x/y  
`%=`	x = x%y  

### 비교연산자
- `==	` 같으면 true, 타입 변환후 비교  
- `===`	같으면 true, 타입까지 비교
- `!= `	같으면 false, 타입 변환후 비교
- `!==`	같으면 false, 타입까지 비교
- `?`	삼항연산자 "[조건] ? [true] : [false];"

### 논리연산자
- &&	AND  
- ||	OR  
- !	NOT

#### 단축평가
- true || anything	>> true  
- false || anything	>> anything  
- true && anything	>> anything  
- false && anything >> false  

> 중간에 평가가 중단되고 그 해당되는 값을 반환된다.

### 타입연산자
- typeof	해당 변수 자료형들을 문자열 형태로 반환
- instanceof	객체가 동일 객체형 인스턴스이면 true

### !!
객체들을 true false형태로 받고자 할때 `!!` 하면 해당 boolean으로 변환된다.  
숫자가 0, 문자열이 없을때, null 이런거 일경우 false.  
숫자가 1이상, 문자열 있을때 true

## 제어문
### IF
```javascript
if (조건식){
	조건식이 참일경우
}else{
	조건식이 거짓일 경우
}
```

IF를 여러번 중첩하여 사용할 수 있다.

### switch
```javascript
switch (조건){
	case 조건비교: 
		참
	case 조건비교:
		참
	default
}
```

## 반복문
- 특정 조건내 반복하기 위해 사용된다.   
- 제시된 조건이 true인 동안 반복실행된다.

### for
```javascript
for ([초기문]; [조건문]; [증감문]) {
	....
}
```

> 무한루프  
for ( ; ; ){  
	...  
}   

### while
```javascript
while (조건문) {
	....
}
```

> 무한루프  
while (true){  
	...  
}  

### break
반복문을 탈출한다.

### continue
해당 구문의 실행을 스킵하고 다음 반복문으로 넘어간다.

## 강제형변환
JS의 특징으로 context(문맥)를 고려하여 자료형을 암묵적으로 강제 변환한다.  
때문에 의도하지 않는 결과가 나올수도 있다.

- console.log('1' > 0); // true  
- console.log(1 + '2'); // '12'  
- console.log(2 - '1'); // 1  
- console.log('10' == 10); // true  
- console.log('10' === 10); // false   
- console.log(undefined == null); // true   
- console.log(undefined === null); // false

### 유용한, 응용한 스킬
아래 값들은 false로 반환된다.
> false, undefined, null, 0, NaN, ''

#### 데이터 타입 형변환
```javascript
// number -> string
val += ' ';
// string -> number 
val *= 1;
```

#### 비교연산
```javascript
// logs false !!! 
console.log(null == false); 
console.log(undefined == false); 
console.log(null == 0); 
console.log(undefined == 0); 
console.log(undefined === null); 
console.log(NaN == null); 
console.log(NaN == NaN);
```
(위 처럼 사용하면 안됨)

두 값을 비교할 때에 동등연산자(==, !=)보다 일치연산자(===, !==)를 사용하여야 한다.

#### 존재여부 확인
```javascript
if (document.getElementById('header')) {
	...
}
```
위 처럼 요소가 존재하면 true로 반환된다.

## 객체 (Object)
JS는 객체기반 언어이며 객체로 이루어져있다.  
객체는 데이터와 그와 관련된 동작들을 모두 포함한다.  
데이터를 한곳에 모으고 구조화 하는데에 사용된다.

### 프로퍼티 (property)
이름(key)와 값으로 구성된다.

- 프로퍼티 이름 : 빈 문자열을 포함한 문자열과 숫자
- 프로퍼티 값 : undefined를 제외한 모든 값

### 메서드 (Method)
객체에 선언된 동작을 나타낸다.

--- 

#### 객체, 프로퍼티, 메소드?? 정리
객체는 결국 붕어빵의 붕어빵틀(껍데기)에 불과하고, 붕어빵(객체)을 완성하는 구성요소는 프로퍼티와 메소드다.   
프로퍼티는 foo.a = 1; 처럼 a라는 이름의 프로퍼티를 생성하고 1이라는 값을 할당한다.  
메소드는 foo.print = function{ ... }; 처럼 foo객체가 가지고 있는 동작이다.  

#### 메소드와 함수 차이??
둘다 동작을 실행한다는것을 동일하지만, 메소드는 객체를 통해서 수행되어야 한다.  
반대로 함수는 함수 자체가 동작을 정의된 함수객체이기 때문에 메소드 처럼 객체의 주체로 동작하지 않는다.    
그리고 메소드가 실행하기 위해서는 객체를 담고있는 프로퍼티를 사용할수 있다. 

출처 : http://insanehong.kr/post/javascript-object/

---

## 객체 생성방법
### 객체 리터럴
가장 간편하고 일반적인 방법
```javascript
var emptyObject = {};
console.log(typeof emptyObject); // object
emptyObject.name = 'Lee';
emptyObject.gender = 'male';
emptyObject.sayHello = function() {
	console.log('Hi ' +  this.name);
};

var person = {
	name: 'Lee',
	gender: 'male',
	sayHello: function (){
		console.log('Hi! My name is ' + this.name); 
	}
};
```

{ } 를 사용하여 객체를 생성. 괄호안에 아무것도 없으면 빈 객체로 생성된다.

### object 객체 생성자 함수
new연산자로 통해 빈 객체를 생성한다.
```javascript
var person = new Object(); 
// 프로퍼티 추가 
person.name = 'Lee'; 
person.gender = 'male'; 
person.sayHello = function () { 
	console.log('Hi! My name is ' + this.name); 
}; 
```

반드시 new Object()연산자가 있어야 되는것은 아니다.  
var person = { } ; 식으로도 생성할수 있다.  
하지만 내부적으로는 Object로 생성된다.

### 생성자 함수
동일한 프로퍼티들을 여러개 생성할때 사용한다.
```javascript
function Person(name, gender) {
	this.name = name;
	this.gender = gender; 
	this.sayHello = function(){ 
		console.log('Hi! My name is ' + this.name); 
	}; 
} 
// 인스턴스의 생성 
var person1 = new Person('Lee', 'male'); 
var person2 = new Person('Kim', 'female'); 
```

- 생성자이름의 첫문자는 대문자로 지정. 관습적으로 사용한다.
- this는 생성될 인스턴스를 가르킨다. 생성자 내부에서는 public으로 접근이 가능하지만, 외부에서는 private 접근할 방법이 없다.

### 객체 프로퍼티 접근

#### 프로퍼티 이름
프로퍼티의 이름은 따옴표로 표시하지만 예약어가 아니라면 생략가능하다.
```javascript
var person = {
	gender: 'male';
};
```

하지만 first-name 같이 연산자 '-'가 있을경우 오류가 발생하기 때문에 가능하다면 `_`나 `대문자`로 구분하는것이 좋다.

#### 프로퍼티 읽기
```javascript
console.log(person.gender);
console.log(person['gender']);
```
으로 점 . 과 괄호 [] 표기한다.
존재하지 않는다면 undefined로 반환된다.

#### 프로퍼티 값 갱신
```javascript
person['first-name'] = 'kim';
```
#### 프로퍼티 동적 생성
```javascript
var person = {
	gender: 'male',
};

person.age = 20;
```

객체에 없는 프로퍼티를 할당하면 추가로 할당이 된다.

### for-in

for in을 통해 프로퍼티의 루프를 모두 수행할수 있다.
하지만 원하지 않는 프로퍼티까지 루프될수도 있는 문제점이 있어서 사용되지 않고 eES6 문법을 사용한다.

### pass-by-reference
call-by-reference 콜바이레퍼런스(?)   
자바의 그것과 비슷한거 같다.