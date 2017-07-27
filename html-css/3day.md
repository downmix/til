# 과제
- 미완성 예제 작성
- 박스만들기 2~6박스
- https://flukeout.github.io/

# 개발 환경설정
## 에디터 확장 툴
- LinTing 오류 문법검사
- HTMLHint, styleLint, ESLint

## 터미널 이용한 설치
- npm install -g [packname]   
  글로벌 설치
- npm install [packname] --save-dev  
	개발용 설치 프로젝트내에 node_modules내에 설치되며, package.json 에반영됨
- package-lock.json  
	package.json 보다 더 우선적으로 읽음
- npm init -y  
	프로젝트 설정값 초기화

## NPM
Node.js Package Manager 

## node js
- V8 : google by 자바엔진
	성능이 비약적으로 향상됨. 
- nodejs: javascript를 동작할수있는 환경.  
  서버에도 개발할수 있도록 언어개발 타os(환경)에서도 개발

CSS selecter

# CSS 문법
## 전체
`* {color: red;}`
## 태그
`p {color: red;}`
## ID
` #p1 {color: red;}`
## calss
`.class {color: red;}`
## 해당속성 있을때 
`a[href] { color: red; }`
## 해당속성 값이 있을때
`a[target="_blank"] { color: red; }`
## 해당속성 값이 해당 단어가 있을때(공백으로 구분)
`h1[title~="first"] { color: red; }`
## 해당속성 값이 단어로 된것 또는 en- 으로 시작하는것
`p[lang|="en"] { color: red; }`
## 해당속성 값으로 시작하는것
`a[href^="https://"] { color: red; }`
## 해당속성 값으로 끝나는것
`a[href$=".html"] { color: red; } `


# 복잡 셀렉터
## div의 모든 후손 p
`div p { color: red; }`
## div의 자식 p
`div > p { color: red; } `

## p 다음 형제중에 다음 ul이 있을경우
`p + ul { color: red; }`

## p 다음 형제중에 모든 ul
`p ~ ul { color: red; }`

# 가상클래스 셀럭터 (Pseudo-Class Selector)

## 문법
~~~
셀렉터:가상클래스{ 속성:값; }
a:hover { color: red; }
input:focus { background-color: yellow; }
~~~

## 가상클래스 속성
링크요소  
- :link	링크가 방문하지 않았을때
- :visited	링크에 방문했을때
- :hover	마우스 올릴때
- :active	클릭햇을때
- :focus	포커스가 들어갈때

상태요소  
- :checked	체크상태 
- :enabled	사용 가능한 상태
- :disabled	사용 불가능한 상태

가상클래스
- :first-child	셀렉터의 모든요소중 첫번째 자식
- :last-child	셀렉터의 모든요소중 마지막 자식
- :nth-child(n)	셀렉터의 모든요소중 n번째
- :nth-last-child(n)	셀렉터의 모든요소중 마지막 n번째
- :first-of-type	셀렉터의 부모요소의 자식중 첫번째 
- :last-of-type	셀렉터의 부모요소중 자식중 마지막
- :nth-of-type(n)	셀렉터의 부모요소의 자식중 n번째
- :nth-last-of-type(n)	셀렉터의 부모요소의 자식중 뒤에서 n번째
- :not( select )	셀렉터에 해당되지 않는 모든것

가상요소 셀렉터
- ::first-letter	콘텐츠의 첫글자
- ::first-line	콘텐츠의 첫줄
- ::after	콘텐츠의 뒤에 위치한 공간
- ::before	콘텐츠의 앞에 위치한 공간
- ::selection	드래그한것 드래그시 색상변경 등..



