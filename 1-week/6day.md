# position
요소의 위치를 정의한다.

## static 
기본값. 부모요소를 기준으로 배치.
잘 사용안하지만, 설정된 position을 무력화 하기 위해 사용하기도함.
top bottom left right 사용못함

## relative
기본static과 동일하지만, 좌표(t b l r)를 설정할수있음.
좌표는 부모 기준

## absolute 
부모들이 static들로 이루어질경우 body 기준으로 설정됨.
만약 부모들중 relative, absolute, fixed가 있다면, 그 요소를 기준으로 한다.
그리고 block 레벨 요소의 width는 inline 요소와 같이 content에 맞게 변화되므로 width를 지정하여야 한다.

> relative vs absolute  
	relative : 부모를 기준,  
  absolute : 부모들중 static만 있다면 body 기준

## fixed 
부모와 상관없이, 브라우저 view-port 기준으로 좌표(t b l r) 잡음.
absolute 같이 block 레벨 요소의 width는 inline 요소와 같이 content에 맞게 변화되므로 width를 지정하여야 한다.

## z-index
요소들의 화면표시 우선순위 지정

## overflow
요소에 컨텐츠가 벗어났을때 처리  
- visible	영역을 무시하고 표시  
- hidden	영역을 벗어난 부분을 잘라내어 보이지 않게 한다.  
- scroll	영역을 벗어난 부분이 없어도 스크롤 표시한다.(대부분 브라우저는 auto과 동일하게 작동한다)  
- auto	영역을 벗어난 부분이 있을때만 스크롤 표시한다.

# float

```img { float: left; }```


선택한 요소 뒤에 있는것을 원하는 방향으로 떠있게 하는 용도.  
하지만 레이아웃 구성에도 사용하게됨

## float로 레이아웃 구성시 발생하는 문제

### float 문제1
float간 margin이 제대로 적용안됨

두 영역을 가로 100% 잡고 float: left하면 위처럼 나오는데,
div의 영역은 여전히 100% 차지(float: left 포함하여).
그래서 margin을 제대로 설정할수가 없다.

> 해결법 : div에 overflow: hidden 추가


### float 문제2
float 를 통해서 영역을 지정하고 부모영역(wrap)에서 height를 잡지 못하는 현상
 
- 해결법1: 부모요소에 overflow: hidden 을 추가

- 해결법2-1: wrap 영역이 끝나기 직전 빈 요소(`<div class="clear"></div>`) 만들고 clear:both를 설정.

- 해결법2-2: 여기서 추가로 
```
.clearfix:after {
  content: "";
  display: block;
  clear: both;
}
``` 
> 이런방법으로 clearfix클래스를 설정하여 사용할수도 있다.  
실무에서 .row 가장 많이 사용하는 방법

- 해결법3: float대신 `display: inline-block;` 를 사용. 
이방법은 공백간격(4px)이 생기는 문제가 있음

# 상속과 우선순위
## 상속
부모요소에서 자식으로 물려받는 속성. 하지만 요소, 속성에 따라 상속받지 않음.
> 아래처럼 inherit속성을 주면 상속받아서 적용  
`.text-red button { color: inherit; }`

## 캐스캐이딩
css선언 우선순위
- 중요도
head내 style요소 < link로 링크된 css < 브라우저 기본값
- 명시도
!important > 인라인 <style=" "> > ID 선택자 > 클래스/속성/가상 선택자 > 태그 선택자 > 전체 선택자 > 상위 요소에 의해 상속된 속성
- 선언순서
나중에 선언된것을 우선으로 적용한다.

# 이펙트

## 벤더 프리픽스 (Vendor Prefix)

```
* { 
-webkit-user-select: none; /* Chrome all / Safari all */ 
-moz-user-select: none; /* Firefox all */ 
-ms-user-select: none; /* IE 10+ */ 
user-select: none; /* Likely future */ 
}
```
실험적인 기능을 사용하기 위해 위와같이 -ms-를 붙어야 한다.

## 효과
### 텍스트 그림자
`text-shadow`
### 요소 그림자효과
`box-shadow`
### 그라이디언트
```
background: linear-gradient(135deg, #b3cae5 12%, #dbdde4 46%, #e4e3e4 70%, #f7ddbb 94%, #efcab2 100%);
```
### 트랜지션
자동시작이 안되고 이벤트 호출시 반응  
`transition: all 2s;`
- 트랜지션 지정 `transition-property: width, background-color;` 
- 시간 (초) `transition-duration: 2s, 2s;`
- 짧게 `transition: width 2s, opacity 4s;`
- 실행리듬 `transition-timing-function: ease;`
- 실행 딜레이 `transition-delay: 3s;`
> 주의 : 레이아웃에 영향을 주는 트랜지션은 적용하지 말것.

### 애니메이션
작고 간단한 애니메이션은 css로 처리, 추가 컨트롤이 필요하거나 복잡하다면 js로 처리하는것이 좋다.
```
@keyframs move {
	from{
	  left: 0;
	}
	to{
	  left: 300px;
	}
}
```
- animation-name 이름을 지정  
`animation-name: move;`  
`@keyframes move { ... }`
- animation-direction
종료후 반복여부
- animation-fill-mode
애니메이션 대기 종료상태의 스타일
- animation-play-state
재생상태 제어

## 2D 트랜스폼 (Transform)
css스타일 변형을 좀더 부드럽게 표현
- translate 요소 위치이동
- scale 요소 크기확대축소
- skew 요소 각도 기울기
- rotate 요소 회전
- (각 요소의 X, Y값 가능)

### transform-origin
요소의 기준점 설정. 기본중앙 (50%, 50%)

## 3D 트랜스폼 (3d Transform)
3차원 x, y, z 표현

효과 : https://codepen.io/
