# file-type
파일 분석하여 매직넘버를 찾아 파일이 어떤형식인지 탐지하는 라이브러리

```s
$ npm install file-type --save
keu-playground@1.0.0 /Users/downmix/Documents/fastcamp/keu-playground
└── file-type@6.1.0
 
npm WARN keu-playground@1.0.0 No description
npm WARN keu-playground@1.0.0 No repository field.
```

Node.js의 경우 바이너리 파일을 담는 클래스인 Buffer의 인스턴스를 이용해 파일 형식을 탐지할 수 있습니다.

fs 모듈의 readFile 혹은 readFileSync 메소드를 이용하면 Buffer 클래스를 사용해볼 수 있습니다.

```js 
const fs = require('fs')
const fileType = require('file-type')
const buffer = fs.readFileSync('image.png')
console.log(buffer instanceof Buffer)
// true
console.log(fileType(buffer))
// { ext: 'png', mime: 'image/png' }
```
 
# redis
- In-memory 데이터베이스.
- Key-value 모델을 사용하는 NoSQL 데이터베이스
 
```s
$ brew install redis
==> Downloading https://homebrew.bintray.com/bottles/redis-4.0.1.sierra.bottle.t
##################################################### 100.0%
==> Pouring redis-4.0.1.sierra.bottle.tar.gz
$ brew services start redis
==> Successfully started `redis` (label: homebrew.mxcl.redis)
```

```s
$ redis-cli
127.0.0.1:6379> set mykey 'Hello Redis!'
OK
127.0.0.1:6379> get mykey
"Hello Redis!"
 
// value 1 증가시키기
incr mycount
// value 5 증가시키기
incrby mycount 5
// value 1 감소시키기
decr mycount
// key가 존재하는지 확인
exists mykey
// 5초 뒤 key 삭제
expire mycount 5
```

### redis 데이터 구조
```s
// 해시 속성 추가
hmset user:1000 username fast password campus birthyear 2014
 
// 해시 속성 가져오기
hget user:1000 username
// 해시 속성 모두 가져오기
hgetall user:1000
// 집합에 요소 추가
sadd myset 1 2 3
// 모든 요소 가져오기
smembers myset
// 집합의 요소인지 확인
sismember myset 1
// 랜덤 뽑기
sadd deck 1 2 3 4 5
spop deck
spop deck
```

### IPC
프로세스간, 컴퓨터간 통신하여 프로세스를 공유할수있다.  
ex) 웹서버 <==IPC==> 영상처리용 서버 (n개)

IPC연동하기 위해 중간에 Redis를 두고 Pub/Sub기능을 활용하여 분산처리가 가능하다.
```s
// 채널 구독
127.0.0.1:6379> subscribe mychannel
// 메시지 발행
127.0.0.1:6379> publish mychannel 'Hello Redis!'
```

# Kue
Node.js 기반 비동기 작업 큐.  

작업간 큐를 Redis에 저장을 하는데, Redis간 통신에 있어 Kue를 사용하여 통신이 가능하다. 주로 CPU 부하가 큰 작업(멀티미디어 처리, PDF 생성 등)을 웹 서버와 분리된 다른 프로세스에서 실행시키기 위한 목적으로 사용된다.

```js
const kue = require('kue')
const queue = kue.createQueue({
  /* 작업 큐 설정 */
})
const jobData = {
  imageUrl: 'https://example.com/image.png',
  type: 'png'
}
queue.createJob('make-thumbnail', jobData)
  .removeOnComplete(true)
  .save(err => {
    if (err) { /* 에러 처리 */ }
  })
```

작업서버
```js
const kue = require('kue')
const queue = kue.createQueue({
  /* 작업 큐 설정 */
})
// 작업을 동시에 10개까지 실행
queue.process('make-thumbnail', 10, (job, done) => {
  processImage(job.data.imageUrl, job.data.type)
    .then(() => {
      done()
    })
    .catch(err => {
      done(err)
    })
})
```

# amazon web service
- 레퍼런스 : http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#upload-property
- 한글 블로그 : http://pyrasis.com/aws.html

AWS S3는 클라우드 파일 저장소입니다. 여러 프로그래밍 언어로 된 API를 통해 파일을 관리할 수 있고, 저장소 용량에 제한이 없으며 사용한 만큼만 비용을 지불한다.

```s
brew install python3
pip3 install --user --upgrade awscli
aws --version
aws configure // AWS access key ID, secret key
```

# sharp
Node.js에서 사용할 수 있는 고속 이미지 프로세싱 라이브러리입니다. 다양한 이미지 처리를 지원한다. (크기 조정, 병합, 회전, 블러, 색조 변경 등)
https://www.npmjs.com/package/sharp

```js
sharp('image.png')
  .resize(200, 200)
  .crop(sharp.gravity.center)
  .toFile('output.png', (err, info) => {
    console.log(info)
  })
```

# express.Router
express.Router를 사용하면 여러 라우트 핸들러를 묶어 모듈화시킬 수 있다. 
Router 인스턴스는 app과 비슷하게 사용하며, Router 인스턴스 자체도 미들웨어이므로 app.use 메소드를 통해 사용할 수 있습니다.
```js
const router = express.Router();
router.use(...);
router.get('/some-path', (req, res) => {
  ...
})
router.post('/other-path', (req, res) => {
  ...
})
```

라우터 인스턴스를 정의한 이후 app에 마운트하여 사용합니다.
```js
// 마운트
app.use(router)
// 특정 경로에 마운트
// /api/some-path, /api/other-path 주소로 접속
app.use('/api', router)
```
 
# multer
body-parser와 유사하지만, application/x-www-form-urlencoded 대신 multipart/form-data 형태의 폼 데이터를 처리하기 위해 사용.  
multer를 이용해 Form 처리되면, 파일을 나타내는 객체는 req.file 혹은 req.files에 저장되고, 나머지 폼 데이터는 body-parser와 비슷하게 req.body에 저장한다.

```js
const multer = require('multer')
const upload = multer()
// 하나의 파일 처리
app.post('/photo', upload.single('photo'), (req, res) => {
  // req.file : 파일 객체
  // req.body : 나머지 폼 데이터
})

// 여러 개의 파일 처리 (파일 필드가 모두 같은 이름을 사용할 때)
app.post('/photos', upload.array('photo'), (req, res) => {
  // req.files : 파일 객체로 이루어진 배열
  // req.body : 나머지 폼 데이터
})

// 여러 개의 파일 처리 (각각 다른 필드 이름 사용 시)
const uploadMiddleware = upload.fields([
  { name: 'avatar', maxCount: 1 },
  { name: 'gallery', maxCount: 8 }
])
app.post('/photos', uploadMiddleware, (req, res) => {
  // req.files : 필드 이름을 속성 이름으로, 파일 객체로 이루어진 배열을 값으로 하는 객체
  // req.body : 나머지 폼 데이터
})
```