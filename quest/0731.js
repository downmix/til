/*
for문을 사용하여 0부터 10미만의 정수 중에서 짝수만을 작은 수부터 출력하시오.
ex) 
0
2
4
6
8
*/
for (var i = 0; i < 10; i += 2) {
  console.log(i);
}

/*
for문을 사용하여 0부터 10미만의 정수 중에서 짝수만을 작은 수부터 문자열로 출력하시오.
ex) 02468
*/
var result = "";
for (var i = 0; i< 10; i += 2) {
  result += i;
}
console.log(result);

/*
for문을 사용하여 0부터 10미만의 정수 중에서 홀수만을 큰수부터 출력하시오.
ex)
9
7
5
3
1
*/
// 반복문을 10 ~ 0 까지 진행
for (var i = 10 ; i>0 ; i--){
  //2의 나머지 값이 1이면 홀수로 취급한다.
  if (i%2 === 1) {
    console.log(i);
  }
}

/*
while문을 사용하여 0부터 10까지 정수 중에서 짝수만을 작은 수부터 출력하시오.
ex)
0
2
4
6
8
*/
var i = 0;
//반복문을 0~10 까지 진행
while(i < 10){
  //2의 나머지 값이 0이면 짝수로 취급
  if(i%2 === 0){
    console.log(i);
  }
  i++;
}

/*
while문을 사용하여 0부터 10미만의 정수 중에서 홀수만을 큰수부터 출력하시오.
ex)
9
7
5
3
1
*/
var i = 10;
//반복문을 10~0 까지 진행
while (i > 0) {
  //2의 나머지 값이 1이면 홀수로 취급
  if (i % 2 === 1) {
    console.log(i);
  }
  i--;
}

/*
삼각형출력하기

다음을 참고하여 *(별)로 높이가 5인(var line = 5) 삼각형을 문자열로 완성하라.
개행문자('\n')를 사용하여 개행한다. 완성된 문자열의 마지막은 개행문자('\n')로 끝나도 관게없다.

// 높이(line)가 5
*
**
***
****
*****

*/

var line = 5; // 높이 지정
var result = ''; // 가공된 결과용 변수 String 선언
var i, j; // 반본문 변수

// 0 ~ line 수 만큼 진행
for (i = 0; i < line; i++) {
  // 0 ~ 상위 변수의 반복문 만큼 진행
  for (j = 0; j <= i; j++) {
    result += '*';
  }
  result += '\n';
}
console.log(result);

/*
트리 출력하기

다음을 참고하여 *(별)로 트리를 문자열로 완성하라.
개행문자('\n')를 사용하여 개행한다. 완성된 문자열의 마지막은 개행문자('\n')로 끝나도 관게없다.

// 높이(line)가 3일때 + 높이(line)가 5일때
*
**
***
*
**
***
****
*****

*/

var i, j; // 반복문 변수
var result = ''; // 가공된 결과용 변수 String 선언
var line = 3; // line 높이 지정
// 상위 문제와 동일하게 진행
for (i = 0; i < line; i++){
  for(j = 0; j <= i ; j++){
    result += '*';
  }
  result += '\n';
}

// line 높이를 재 지정하여 이어서 진행
line = 5;
for (i = 0; i < line; i++){
  for(j = 0; j <= i ; j++){
    result += '*';
  }
  result += '\n';
}

console.log(result);


/*
    *
   ***
  *****
 *******
*********

4 / 1
3 / 3
2 / 5
1 / 7
0 / 9 

함수로 만들것

*/


var line = 10; // 높이 지정
var result = ''; // 가공된 결과용 변수 String 선언
var i, j; // 반본문 변수

// 0 ~ line 수 만큼 진행
for (i = 0; i < line; i++) {
  for (j = line-1; j > i; j--) {
    result += ' ';
  }
  for(j = 0 ; j < (i*2)+1; j++){
    result += '*';
  }
  result += '\n';
}
console.log(result);