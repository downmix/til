# 과제
마진상쇄 개념학습  
css 1~7복습예습

# 오전 조교수업
- snipper  
코드 자동완성. vscode 'F1' > snipper
- markdown  
문서작성

# 단위
## px
픽셀, 모니터 점. 고정단위
## %
백분율 상대단위
```
body { font-size: 14px; } 
div {
	font-size: 120%; /* 14px * 1.2 = 16.8px */ 
	padding: 2em; /* 16.8px * 2 = 33.6px */
}
```
## em
백분율과 비슷한 상대단위. (상속된 스타일에 따라감)
```
font-size: 1.2em; /* 14px * 1.2 = 16.8px */
```

## rem
em과 달리 상속된 스타일에 가변적으로 따라가지않고, 
최상위(html)에 따라감
```
font-size: 1.2rem; /* html font-size: 14px * 1.2 = 16.8px */
```

## viewport
화면에 보이는것을 기준
```
width: 50vw;  /* 화면에 보이는 가로 50% */
height: 100vh;  /* 화면에 보이는 세로 100% */
```

# 색상 단위
## 단순 색상표현
브라우저에서 지원하는 색상단어
```
background-color: red
background-color: green
(https://www.w3.org/TR/css3-color/)
```

## 상세 색상표현
넓은 색상표현을 위한 색상코드  
- HEX 코드 단위 (Hexadecimal Colors)	#000000  
- RGB (Red, Green, Blue)	rgb(255, 255, 0)  
- RGBA (Red, Green, Blue, Alpha/투명도)	rgba(255, 255, 0, 1)  
- HSL (Hue/색상, Saturation/채도, Lightness/명도)	hsl(0, 100%, 25%)  
- HSLA (Hue, Saturation, Lightness, Alpha)	hsla(60, 100%, 50%, 1)  


# HTML BOX 박스 요소

## html요소
- inline요소 : 영역을 한줄 차지
- block요소  : 해당 영역부분 차지

## 기본 영역
box-sizing 프로퍼티에 border-box를 적용하면 콘텐츠 영역, padding, border가 포함된 영역을 width / height 프로퍼티의 대상으로 지정할 수 있다.   
링크 : http://poiemaweb.com/css3-box-model
```
html { box-sizing: border-box; } 
*, *:before, *:after { box-sizing: inherit; }
```

## margin  padding 영역 잡기
- 한꺼번에   
	margin: 25px 50px 75px 100px;  
	margin-top: 25px;  
	margin-right: 50px;  
	margin-bottom: 75px;  
	margin-left: 100px;  
- 3개의 값을 지정할 때  
	margin: 25px 50px 75px;  
	margin-top: 25px;  
	margin-right: 50px; margin-left: 50px;  
	margin-bottom: 75px;  
- 2개의 값을 지정할 때  
	margin: 25px 50px;  
	margin-top: 25px; margin-bottom: 25px;  
	margin-right: 50px; margin-left: 50px;  
- 1개의 값을 지정할 때  
	margin: 25px;  
	상하좌우 25px;  
	
## 수평정렬 : 위의 원리로..
- margin : 0 auto;  
- 다른 박스정렬 기법 http://poiemaweb.com/snippet-centering

## border-radius
모서리 둥굴게 만들기  
border-radius: 5px; 50%; ....


# Display
## block
항상 새로운 라인  
화면 크기 전체의 가로폭을 차지 (width: 100%)  
width, height, margin, padding 프로퍼티 지정이 가능하다.  


## inline
- width, height, margin-top, margin-bottom 프로퍼티를 지정할 수 없다.  
상, 하 여백은 line-height로 지정한다.  
- inline 레벨 요소 뒤에 공백(엔터, 스페이스 등)이 있는 경우, 정의하지 않은 space(4px)가 자동 지정된다.  

회피방법 (https://css-tricks.com/fighting-the-space-between-inline-block-elements/)


## visibility
프로퍼티를 보이게 할것인지 지정  
`.hidden { visibility: hidden; } `  
해당 요소를 보이지 않게 한다.  
 
display: none;은 해당 요소의 공간까지 사라지게 하지만  
visibility: hidden;은 해당 요소의 공간은 사라지지 않고 남아있게 된다

# background
## background
```
background-image: url("http://poiemaweb.com/img/bg/dot.png");
background-repeat: no-repeat; 배경 바둑판 제거
background-size: 700px 500px; 크기조정
background-size: cover; 비율유지하며 확대
background-size: contain; 모두보이게 축소
background: #FFEE99 url("http://poiemaweb.com/img/bg/dot.png") no-repeat center;

[background-position: top | left |  right | center | 25% 75% | 10px 20px]
```

# font
## font-size
폰트크기 설정. px 나 em을 주로씀
```
.font-size-40 { font-size: 40px; } 
.font-size-2x { font-size: 2.0em; } 
.font-size-150ps { font-size: 150%; } 
.font-size-large { font-size: large; }
```

## font-family
폰트. 클라이언트 PC에 해당폰트가 있어야함.  
`font-family: "Times New Roman", Times, serif;`  
위 처럼 여러개 폰트를 지정하면 앞 순서대로 폰트를 찾아 로딩

## font-style font-weight
- font-style: 폰트에 있는 스타일 지정  
- font-weight : 폰트 굵기 설정

## 선언 예제
~~~
font: 2em "Open Sans", serif;
font: italic 2em "Open Sans", sans-serif;
font: italic small-caps bolder 16px/1.2 monospace; 
~~~

## line-height
텍스트 높이 지정 (행간)