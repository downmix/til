# 배열
배열 리터럴 선언
```javascript
var emptyArr = []; 
var numbersArr = [ 
  'zero', 'one', 'two', 'three', 'four', 
 'five', 'six', 'seven', 'eight', 'nine' 
];
```

객체 리터럴 선언
```javascript
var numbersObject = { 
  '0': 'zero', '1': 'one', '2': 'two', '3': 'three', '4': 'four',
  '5': 'five', '6': 'six', '7': 'seven', '8': 'eight', '9': 'nine' 
};
```
배열리터럴은 Array.prototype를 상속받고, 객체리터럴은 Object.prototype을 상속 받는다.

Array에는 sort, lengh 속성을 지원한다.


## Array 생성자 함수
```javascript
var arr = new Array(2); //undefined 2개 생성
var arr = new Array(1, 2, 3); // [ 1,2,3 ]
```
- Array는 동적으로 요소를 채울수 있다.
- delete를 통해 삭제(undefined)를 할 수 있다.
```javascript
var numbersArr = ['zero', 'one', 'two', 'three']; 
delete numbersArr[2]; // ['zero', 'one', undefined, 'three']

numbersArr.splice(2, 1); // ['zero', 'one', 'three']
```

## 배열 열거 - 반복문
배열 열거를 위해서는 for 와 for-in 을 사용할수 있는데,  
for-in보다는 for를 사용하는것이 좋다. for-in은 속도면이나 불필요한 프로퍼티까지 출력될 수 있고 요소들의 순서를 보장하지 않으므로 배열을 열거하는데 적합하지 않다.

## length
```javascript
var arr = [ 
  'zero', 'one', 'two', 'three', 'four', 
  'five', 'six', 'seven', 'eight', 'nine' 
]; 
// 배열 길이의 명시적 설정하면 뒤에 있는 요소가 날라간다. 
arr.length = 3; // [ 'zero', 'one', 'two' ] 

// 배열 끝에 새 요소 추가 
arr[arr.length] = 'san'; 
// [ 'zero', 'one', 'two', 'san' ]
```

### Array.prototype.indexOf( )
배열요소를 검색하여 인덱스를 반환한다.
```javascript
var arr = ['dd', 'ee', 'ff'];
arr.indexOf('dd'); //0
arr.indexOf('ee'); //1
```

### Array.prototype.concat( )
인수로 넘어온 값을 자신 요소에 추가로 복사하여 복사본을 반환한다.
```javascript
var a = ['a', 'b', 'c'];  
var b = ['x', 'y', 'z']; 
var c = a.concat(b);  // c ['a', 'b', 'c', 'x', 'y', 'z']
var d = a.concat('String'); // d ['a', 'b', 'c', 'String']
```

### Array.prototype.join()
배열요소를 연결하여 문자열로 만든다.
```javascript
var arr = ['a', 'b', 'c', 'd']; 
var x = arr.join();  //'a,b,c,d' 
var y = arr.join('');  //'abcd' 
var z = arr.join(':');  //'a:b:c:d'
```

### Array.prototype.pop()
후입선출 스택처럼 동작한다. 마지막 요소를 반환하고, 그 요소가 제거된다.

### Array.prototype.push( )
인수로 넘어온 항목을 끝에 추가한다.
```javascript
var a = ['a', 'b', 'c']; 
var b = ['x', 'y', 'z']; 
// push는 원본 배열을 직접 변경하고 변경된 배열의 length를 반환한다. 
var c = a.push(b, true); 
console.log(a); // a --> ['a', 'b', 'c', ['x', 'y', 'z'], true] 
console.log(c); // c --> 5;
```

### Array.prototype.reverse()
배열 순서를 역으로 한다. 이때 원본도 역으로 변경된다.
```javascript
var a = ['a', 'b', 'c']; 
var b = a.reverse(); 
console.log(a); // [ 'c', 'b', 'a' ] 원본도 변경
console.log(b); // [ 'c', 'b', 'a' ]
```

### Array.prototype.shift()
선입선출 큐 처럼 동작한다. 
배열에서 첫요소를 제거하고 제거한 요소를 반환한다.

```javascript
var a = ['a', 'b', 'c']; 
var c = a.shift(); // 첫번째요소 제거. 
console.log(a); // a --> [ 'b', 'c' ] 
console.log(c); // c --> 'a'
```

### Array.prototype.slice( )
원본을 유지하며 특정부분을 복사본으로 가져온다.
```javascript
var items = ['a', 'b', 'c']; 
var res1 = items.slice(0, 2);  // [ 'a', 'b' ]
```

### Array.prototype.splice( )
기존의 배열의 요소를 제거하고 그 위치에 새로운 요소를 추가한다.  
배열 중간에 새로운 요소를 추가할 때도 사용된다.
```javascript
// items[1]부터 2개의 요소를 제거하고, 제거된 요소를 배열로 반환 
var items = ['one', 'two', 'three', 'four']; 

var res = items.splice(1, 2);
// res [ 'two', 'three' ] 
// items [ 'one', 'four' ]

// items[1]부터 2개의 요소를 제거하고 그자리에 새로운 요소를 추가한다. 제거된 요소가 반환된다. 
var items = ['one', 'two', 'three', 'four']; 
var res = items.splice(1, 2, 'x', 'y'); 
// 원본 배열이 변경된다. 
// res [ 'two', 'three' ] 
// items [ 'one', 'x', 'y', 'four' ] 

// 0개를 제거, 제거없이, 그자리(items[1])에 새로운 요소를 추가한다.
var items = ['one', 'two', 'three', 'four']; 
var res = items.splice(1, 0, 'x');  
// res [ ]
// items [ 'one', 'x', 'two', 'three', 'four' ] //

// 제거 없이그자리(items[1])에 새로운 배열를 추가한다.
var items = ['one', 'four'];
var res = Array.prototype.splice.apply(items, [1, 0].concat(['two', 'three']));
// ES6
// var res = items.splice(1, 0, ...['two', 'three']);
// res [ ] items// [ 'one', 'two', 'three', 'four' ]
만약 아래처럼 코드를 작성하면 배열내에 배열이 들어가게된다.
var res = items.splice(1, 0, ['two', 'three']); // [ 'one', [ 'two', 'three' ], 'four' ]
```

### Array.prototype.sort( )
배열의 내용을 정렬한다.
```javascript
var fruits = ['Banana', 'Orange', 'Apple', 'Mango'];  
fruits.sort(); // ascending(오름차순)
fruits // [ 'Apple', 'Banana', 'Mango', 'Orange' ] 

var points = [40, 100, 1, 5, 25, 10]; 
points.sort(); 
points // [ 1, 10, 100, 25, 40, 5 ]
// 숫자를 문자로 정렬하게됨..

// 숫자 배열 오름차순 정렬 
// compareFunction의 반환값이 0보다 작은 경우, a를 우선한다. 
points.sort( 
  function (a, b) { 
   return a - b; 
  }
); 

points // [ 1, 5, 10, 25, 40, 100 ]
```

### Array.prototype.map()
배열을 순회하며 각 요소에 콜백함수를 실행하고 그 결과를 반영된 새로운 배열로 반환한다.
```javascript
var numbers = [1, 4, 9];
var doubles = numbers.map(function(num) {
  return num * 2;
});
// doubles is [2, 8, 18]. numbers is [1, 4, 9]
```

### Array.prototype.forEach()
배열을 순회하며 콜백함수를 실행한다. 일반 for보다 성능이 좋지않다.
```javascript
var total = 0;
 
[1, 3, 5, 7, 9].forEach(function (element, index, array) {
  console.log('[' + index + '] = ' + element);
  total += element;
});
```

### Array.prototype.filter()
배열을 순회하며 각 요소에 대해 콜백함수를 실행해 결과가 true인것만 새로운 배열로 반환한다.
```javascript
var result = [1, 2, 3, 4, 5].filter(function (element, index, array) {
  console.log('[' + index + '] = ' + element);
  return element % 2; // 홀수만을 필터링한다 (1은 true로 평가된다))
});
```

### Array.prototype.reduce()
배열을 순회하며 이전 콜백함수 반환값을 전달하며 실행한다.

```javascript
var result = [1, 2, 3, 4, 5].reduce(function (previousValue, currentValue, currentIndex, array) {
  console.log(previousValue + '+' + currentValue + '=' + (previousValue + currentValue));
  return previousValue + currentValue; // 결과는 다음 콜백의 첫번째 인자로 전달된다
});
 
console.log(result); // 15: 1~5까지의 합
/*
1+2=3
3+3=6
6+4=10
10+5=15
15
*/
```

### Array.prototype.find()
배열을 순회하며 각 요소의 콜백함수가 참인 첫번째요소를 반환한다.
```javascript
var array = [
  { id: 1, name: 'Lee' },
  { id: 2, name: 'Kim' },
  { id: 2, name: 'Choi' },
  { id: 3, name: 'Park' }
];
 
var result = array.find(function (element) {
  return element.id === 2;
});
 
// ES6
const result = array.find(element => element.id === 2;);
 
//{ id: 2, name: 'Kim' }
```

# Date
시간관련 메소드를 제공
- UTC : 세계협정시 
- KST : 한국시간
## new Data
```javascript
var d = new Date(0); // 기준시 Fri Jan 01 1970 09:00:00 GMT+0900 (KST) 
var d = new Date(86400000); // 1일 Fri Jan 02 1970 09:00:00 GMT+0900 (KST)
var d = new Date(1999); // Thu Jan 01 1999 09:00:01 GMT+0900 (KST) 
var d = new Date(1999, 10, 3, 11, 33, 30, 0); // Wed Nov 03 1999 11:33:30 GMT+0900
var d = new Date(1999, 10); console.log(d); // Mon Nov 01 1999 00:00:00 GMT+0900 (KST)
var d = new Date('2017/08/08/20:00:00'); // Tue Aug 08 2017 20:00:00 GMT+0900 (KST)
```

## Date 메서드
### Date.now()
기준시를 기준으로 현재시간 까지 경과한 밀리초로 반환

### Date.paser()
```javascript
var d = Date.parse('Jan 2, 1970 00:00:00 UTC'); // UTC 86400000
var d = Date.parse('1970/01/02/09:00:00'); // KST 86400000
```

### Date.UTC()
매개변수로 전달된 시간의 밀리초 숫자로 반환된다.
```javascript
var d = Date.UTC(1970, 0, 2); // 86400000 
```

### Date.prototype.getFullYear()
해당연도를 4자리 숫자 반환
```javascript
var today = new Date();  // Tue Aug 08 2017 20:53:24 GMT+0900 (KST) 
var year = today.getFullYear();  // 2017
```

### Date.prototype.getMonth()
해당 월을 나타내는 0 ~ 11의 정수를 반환한다.  
(1월) 0 ~ (12월) 11 

### Date.prototype.getDate()
해당 날짜 1~31 를 정수로 반환한다.

### Date.prototype.getDay()
해당 요일을 나타내는 정수로 반환한다.
일 0 / 월 1 / 화 2 / 수 3 / 목 4 / 금 5 / 토 6

### Date.prototype.getHours()
해당시간 0~23 정수로 반환

### Date.prototype.getMinutes()
해당 분 0~59 정수로 반환

### Date.prototype.getSeconds()
해당 초 0~59를 반환

### Date.prototype.getMilliseconds()
해당 밀리초 0~999를 나타내는 정수를 반환

### Date.prototype.getTime()
UTC기분값( 1970-1-1) 기준으로 현재시간까지 경과된 밀리초를 반환

### Date.prototype.getTimezoneOffset()
UTC와 지정로케일 시간 차이를 분단위로 반환

### Data.prototype.toDateString()
날자양식이 적용된 문자열로 반환된다.
```javascript
var d = new Date('1988/8/17/13:30'); 
console.log(d.toString()); // Sat Sep 17 1988 13:30:00 GMT+1000 (KDT) console.log(d.toDateString()); // Sat Sep 17 1988
```

# String
string을 다룰때 유용한 프로퍼티와 메소드를 제공하는 객체이다.

## 선언
```javascript
var x = 'Lee'; 
var y = new String('Lee'); 
console.log(x == y); // true 
console.log(x === y); // false 
console.log(typeof x); // string 
console.log(typeof y); // object
```

### String.length
문자내 문자갯수

### .charAt()
해당 문자의 인덱스번호의 문자를 반환한다. 0 ~ n
```javascript
var str = 'Hello'; 
console.log(str.charAt(0)); // H 
console.log(str.charAt(1)); // e 
console.log(str.charAt(2)); // l
```

### .indexOf()
해당문자의 문자를 찾아 인덱스로 반환한다.
```javascript
var str = 'Hello World'; 
console.log(str.indexOf('l')); // 2 
console.log(str.indexOf('or')); // 7 
```

### .lastIndexOf()
문자열내 매개변수로 전달된 문자가 마지막으로 찾은 인덱스를 반환한다.
두번째 인수를 전달하면 해당위치에서 역방향으로 검색한다.
```javascript
var str = 'Hello World'; 
console.log(str.lastIndexOf('World')); // 6 
console.log(str.lastIndexOf('l')); // 9 
console.log(str.lastIndexOf('o', 5)); // 4 
console.log(str.lastIndexOf('o', 8)); // 7
```

### .replace()
첫번째로 전달된 문자, 정규표현식을 두번째 인자로 대체한다.

```javascript
var str = 'Hello Hello';
 
var replacedStr = str.replace('Hello', 'Lee');
console.log(replacedStr); // Lee Hello
 
replacedStr = str.replace(/hello/gi, 'Lee'); // 정규표현식
console.log(replacedStr); // Lee Lee
```

### .split()
첫번재로 전달된 문자, 정규표현식을 검색하여 문자열을 구분하여 배열로 반환한다.
```javascript
var str = 'How are you doing?';
 
var splitStr = str.split(' ');
console.log(splitStr); // [ 'How', 'are', 'you', 'doing?' ]
 
splitStr = str.split();
console.log(splitStr); // [ 'How are you doing?' ]
 
splitStr = str.split('');
console.log(splitStr); // [ 'H','o','w',' ','a','r','e',' ','y','o','u',' ','d','o','i','n','g','?' ]
```

### .substring()
첫번째 인수 부터 두번째 인수 인덱스에 해당하는 문자열을 반환
```javascript
var str = 'Hello World'; 
var res = str.substring(1, 4); // ell
res = str.substring(4); // o World
```

### .toLowerCase()
문자열 모두 소문자로 변경

### .toUpperCase()
문자열 모두 대문자로 변경

### .trim()
문자열 양 끝에 공백문자를 제거

# 정규표현식
문자열 내에 특정 내용 찾는 문법


## 플래그
- i 대소문자를 구별하지 않는다.
- g 문자열내 모든 패턴 검사
- m 문자열 행이 바뀌어도 계속 검색

### 정규표현식 문법
```javascript
var targetStr = 'AA BB Aa Bb'; // 임의의 문자 3개를 반복하여 검색 
var regexr = /.../g; 
console.log(targetStr.match(regexr)); // [ 'AA ', 'BB ', 'Aa ' ]
```
```javascript
var targetStr = 'AA AAA BB Aa Bb'; // 'A'가 한번이상 반복되는 문자열을 반복 검색 
var regexr = /A+/g; 
console.log(targetStr.match(regexr)); // [ 'AA', 'AAA', 'A' ]
```
```javascript
var targetStr = 'AA BB Aa Bb'; // 'A' 또는 'B'를 반복 검색 
var regexr = /A|B/g; 
console.log(targetStr.match(regexr)); // [ 'A', 'A', 'B', 'B', 'A', 'B' ]
```
```javascript
var targetStr = 'AA AAA BB Aa Bb'; // 'A' 또는 'B'가 한번이상 반복되는 문자열을 반복 검색 
var regexr = /A+|B+/g; 
console.log(targetStr.match(regexr)); // [ 'AA', 'AAA', 'BB', 'A', 'B' ]
```
```javascript
var targetStr = 'AA BB ZZ Aa Bb'; // 'A' ~ 'Z'가 한번이상 반복되는 문자열을 반복 검색 
var regexr = /[A-Z]+/g; 
console.log(targetStr.match(regexr)); // [ 'AA', 'BB', 'ZZ', 'A', 'B' ]
```