function creatStarTriangle(line){
  //매개변수 line을 통해 몇줄을 표시할것인지 선언
  var result = ''; // 가공된 결과용 변수 String 선언
  var i, j; // 반본문 변수

  //line 수 만큼 loop
  for (i = 0; i < line; i++) {
    // '*' 위치 이동을 위한 공백작업 
    // 수열상 line - 1 만큼, i와 대조적으로 반복
    for (j = line-1; j > i; j--) {
      result += ' ';
    }
    // 이어서 표현할 '*' 출력
    // 수열상 loop만큼의 loop*2+1 진행
    for(j = 0 ; j < (i*2)+1; j++){
      result += '*';
    }
    // 라인이 끝나면 줄바꿈처리
    result += '\n';
  }

  // 가공된 결과용 변수 반환
  return result;
}

console.log(creatStarTriangle(7));

var n = 439;
var base = n.toString(2).split('');
var maxCnt = 1;
var i = 0, temp = 1;

while(i < base.length){
  //console.log(i, base[i], temp);
    if(base[i] === base[i+1] && base[i] === '1'){
        temp++;
    }else{
        maxCnt = temp > maxCnt ? temp : maxCnt;
        temp = 1;
    }
    i++;
}

console.log(maxCnt);