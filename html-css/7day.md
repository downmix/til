# 웹폰트
웹디자인 관점에서 좋은 폰트를 사용한 전달력향상을 위해 웹폰트를 사용한다.

## CDN방식
구글 폰트에서 제공하는 https://www.google.com/fonts 활용  
```
@import url(http://fonts.googleapis.com/earlyaccess/nanumgothic.css);
* { font-family: 'Nanum Gothic', sans-serif; }
```

## 서버 폰트 로드
서버에 폰트를 담아놓고 서비스  
```
@font-face { 
  font-family:"Nanum Gothic";
  src:url("NanumGothic.eot"); /* IE 9 호환성 보기 모드 대응 */
  src:local("☺"), /* local font 사용 방지. 생략 가능 */
  url("NanumGothic.eot?#iefix") format('embedded-opentype'),
  /* IE 6~8 */
  url("NanumGothic.woff") format('woff');
  /* 표준 브라우저 */ 
} 
* { font-family: "Nanum Gothic", sans-serif; }
```

> 만약 영문폰트와 한글폰트를 혼용하고 싶다면  
font-family: [영문폰트], [한글폰트] 식으로 순서를 고려할것

# 반응형 웹디자인
클라이언트 별로 각개 사이트가 아닌 하나의 소스로 멀티유징이 가능하도록 디자인

## 트랜드
HTML CSS JS로 다양한 플랫폼의 어플리케이션을 만들수있음.
- Electron
- Sencha Touch

## viewport meta
디바이스의 가로, 세로, 확대 등의 화면설정을 정의할수있다.
```
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

## @media
미디어 타입마다 각기다른 style를 지정할수있다.
```
@media not|only mediatype and (expressions) { CSS-Code; }
@media screen { * { color: red; } }  //화면
@media print { * { color: blue; } }  //인쇄
@media screen and (min-width: 480px) { 
	body {
		background-color: lightgreen;
	}
}
```
보통 반응형웹디자인은 width기준으로 작성한다.

### 미디어 쿼리 순서
```
/*========== Mobile First Method ==========*/ 
/* Extra Small Devices, Phones : 480px ~ */ @media only screen and (min-width : 480px) { }
/* Small Devices, Tablets : 768px ~ */ @media only screen and (min-width : 768px) { } 
/* Medium Devices, Desktops : 992px ~ */ @media only screen and (min-width : 992px) { } 
/* Large Devices, Wide Screens : 1200px ~ */ @media only screen and (min-width : 1200px) { }

/*========== Non-Mobile First Method ==========*/
/* Large Devices, Wide Screens : ~ 1200px */ @media only screen and (max-width : 1200px) { }
/* Medium Devices, Desktops : ~ 992px */ @media only screen and (max-width : 992px) { } 
/* Small Devices, Tablets : ~ 768px */ @media only screen and (max-width : 768px) { } 
/* Extra Small Devices, Phones : ~ 480px */ @media only screen and (max-width : 480px) { }
```