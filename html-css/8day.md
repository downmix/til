# 그리드 시스템
레이아웃구성시 row 기준 화면을 보통 12칸으로 구성하여 개발하는 개발방법  
ex) 부트스트랩

## 정렬방법
http://poiemaweb.com/snippet-centering

# bootstrap
트위터에서 2011년에 나온 오픈소스 프론트엔드 프레임워크
css js 기능 들을 공식홈페이지 문서를 통해 찾아사용할수 있다.

파일구조 css, js, font
bootstrap.min.js : 웹 최적화를 위해 용량줄이기위해 min사용

## npm으로 설치
```
ogtaeg-im-ui-MacBook-Pro:fastcamp downmix$ mkdir bs-start
ogtaeg-im-ui-MacBook-Pro:fastcamp downmix$ cd bs-start/
ogtaeg-im-ui-MacBook-Pro:bs-start downmix$ npm init
ogtaeg-im-ui-MacBook-Pro:bs-start downmix$ npm install --save bootstrap
npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN bs-start@1.0.0 No description
npm WARN bs-start@1.0.0 No repository field.

+ bootstrap@3.3.7
added 1 package in 1.04s
ogtaeg-im-ui-MacBook-Pro:bs-start downmix$ ls
node_modules package-lock.json package.json
```

## Container
부트스트랩의 콘텐츠를 감싸는 영역을 포함해야한다.
.container	반응형 고정폭
.container-fluid	최대폭 

> container를 중첩사용 X

## Grid System
부트스트랩의 그리드 레이아웃은 .row (행) 선언후 row안에 .col-*-*를 필요한만큼 배치한다

### col의 구성
.row 내에 col-xs, col-sm, col-md, col-lg 중에 하나 적용한다.  
xs 은 항상 수평적용되며 모바일환경에서 사용된다.

- sm	768px  
- md	992px  
- lg	1200px  

위 픽셀값 이상에서 class 적용된다.

> 만약 col의 합이 12보다 클 경우 마지막 열이 다음줄로 넘어가 버린다.

### col- 클래스 복합구성
```html
<div class="col-xs-12 col-sm-6">xs-12 sm-6</div>
```
처럼 복합적으로 사용가능.  
위의 경우 viewport가 768px 미만 일경우 col-xs-12, 768px이상일 경우 col-sm-6으로 적용된다.

### 모바일, 테블릿, 데스크탑
.col-xs-*, .col-sm-*, .col-md-*  
각각 768미만, 768이상, 992 이상 일경우 적용
```html
<div class="row"> 
<div class="col-xs-12 col-sm-6 col-md-4">1</div>
<div class="col-xs-12 col-sm-6 col-md-4">2</div> 
<div class="col-xs-12 col-sm-6 col-md-4">3</div> 
<div class="col-xs-12 col-sm-6 col-md-4">4</div> 
<div class="col-xs-12 col-sm-6 col-md-4">5</div> 
<div class="col-xs-12 col-sm-6 col-md-4">6</div> 
</div> 
```

### Nesting columns
그리드 열 안에 그리드를 추가하면 부모 너비 만큼 그리드를 갇는다.
그리드안에 그리드 넣어서 레이아웃 구성가능.

### Offsetting columns
```html
<div class="col-md-2 col-md-offset-4">
```
col-md-4 만큼 오른쪽으로 이동후 col-md-2 열을 갖는다.


# FLEX
모던웹 레이아웃 구성을 좀더 세련되게 가능하다.
하지만 IE의 지원이 안되 실사용이 어렵다.
```css
display: flex;
```

