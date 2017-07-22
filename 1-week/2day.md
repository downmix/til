# 기본 TAG
 -  `<script>` JS 내용

 - `<mata>` 웹페이지의 각종선언

 - `<body>` `</body>` 웹페이지의 유일한 웹페이지 구성 태그

# body내 text태그
- heading `<h1>`
- strong `<strong>` 굵게 강조의미
`<b>`는 style태그, 표준아님

- em `<em>` 기울게 강조의미
`<i>` 는 style태그, 표준아님

- mark `<mark>` 형광펜  강조의미X
- del `<del>` 취소선
- ins `<ins >` 밑줄
- sub sup `<sub>` `<sup>`주석

- p `<p>` `</p>` 단락
(샘플문장 채우기 Lorem[tap])
- br `<br>` 줄바꿈 

- pre `<pre>` `</pre>`
공백 탭 그대로 표시

- `&nbsp;` 스페이스 1개

- `<hr>` 줄
- `<blockquote>` `</blockquote>` 인용 들여쓰기기

# 하이퍼링크
- a 태그 
`<a href="#"> 내용 </a>`

- 어트리뷰트
  - `download`  다운로드
  - `target="_self" "_blank"` 새창

- id로 스크롤이동
`<a href="#[id]"> 내용 </a>`

# 리스트 목록

- 순서없는목록 unordered list
```
<ul>
  <li></li>
  <li></li>
</ul>
```

- 순서 목록 ordered list
```
<ol>
  <li></li>
  <li></li>
</ol>
```

```
<ol type="A" start="3" reversed>
	<li></li>
	<li></li>
</ol>
```

# 테이블

- `<table>`
  - tr : 표 행
  - th : 제목셀
  - td : 일반셀

# 멀티미디어

- 이미지
`<img src="#">`
- 오디오
`<audio>`

- 비디오
`<video>` 

# FORM

- `<from>`
입력 요소들을 감싸아 선언

- button
`<input type="button">`
`<button>``</button>`

- input의 버튼과 버튼태그 차이점
구조적 차이,
IE6, IE7에는 value가 아닌 태그내 값을 서버로 전송한다.

# 서버 클라이언트

- 클라이언트 > 서버 Request
- 서버 > 클라이언트 response

localhost : 원격지 서버처럼 내부서버에 접속

# 브라우저 구동방식

html로딩> 파싱 > DOM  ↘︎  
css로딩> 파싱 > CSSOM >  렌더트리 > display > 렌더링엔진 webkit

# CSS

구성을 정확하고 잘 잡기에는 어려움,
규모가 커질수록 체계적인 설계가 필요.

- Link 방식 :
`<link rel="stylesheet" href="#">`
- embedding 방식 :
`<style>` `</style>`
- inline 방식 :
`<h1 style="padding:10px;">`

- reset CSS :
각 브라우저의 디폴트스타일을 초기화
의도하지않는 스타일이 나오는 현상 방어
