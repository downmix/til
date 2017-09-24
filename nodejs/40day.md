 
# DB 구조변경, 재구축
 
## 프로젝트 환경 구조 변경
```
// .env 중요 정보 유출방지
DATABASE_HOST=localhost
DATABASE_USER=url_shortener
DATABASE_PASSWORD=1q2w3e
DATABASE_NAME=url_shortener
```

```js
// /knexfile.js 환경설정
require('dotenv').config()
 
module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME
    },
    debug: true
  },
};
```
 
```js
// knex.js 환경연동
const config = require('../knexfile')
 
module.exports = require('knex')(config.development)
```
 
```js
// query.js 
const knex = require('./knex')
const randomstring = require('randomstring')
const validator = require('validator')
const bcrypt = require('bcrypt')
 
module.exports = {
  getUserById(id){
    return knex('user')
      .where({id})
      .first()
  },
  getUrlEntriesByUserId(user_id){
    return knex('url_entry')
      .where({user_id})
      .orderBy('created_at', 'desc')
  },
  createUrlEntry(user_id, long_url){
    const valid = validator.isURL(long_url);
    if(!valid){
      return Promise.reject(new Error('url이 올바르지 않습니다'));
    }
    const id = randomstring.generate(8);
    return knex('url_entry')
      .insert({
        id,
        long_url,
        user_id
      })
  },
  getUrlById(id){
    return knex('url_entry')
      .where({id})
      .first()
  },
  incrementClickCountById(id){
    //update `url_entry` set `click_count` = `click_count` + 1 where `id` = {id}
    return knex('url_entry')
      .where({id})
      .increment('click_count', 1)
 
  },
  createUser(id, password){
    return knex('user')
      .insert({id, password})
  }
}
```
 
```js
// server.js
 
const query = require('./query')
 
query.getUrlEntriesByUserId(req.user.id)
  .then(rows => {
    res.render('index.ejs', {rows, csrfToken: req.csrfToken()})
  });
```
 
## 마이그레이션 
 
마이그레이션 생성
```
$ knex migrate:make add_user
Using environment: development
Created Migration: /Users/downmix/Documents/fastcamp/wpsn-knex/migrations/20170915132110_add_user.js
```

```js
// migrations/~~.js
exports.up = function(knex, Promise) {
  return knex.schema.createTable('image_entry', t => {
    t.increments()
    t.string('original_url').notNullable()
    t.string('title')
    t.text('description')
    t.string('thumbnail_url')
  })
};
 
exports.down = function(knex, Promise) {
  return knex.schema.dropTable('image_entry')
};
```

마이그레이션 실행
```
$ knex migrate:latest
```

### knex 제약조건 지정
```js
knex.schema.createTable('table_name', function(table) {
  // `id` 라는 이름의 INTEGER UNSIGNED 컬럼을 만들고, PRIMARY KEY 및 AUTO_INCREMENT 제약조건을 지정합니다.
  table.increments();
// `col1` 이라는 이름의 INTEGER 컬럼을 만들고, PRIMARY KEY 제약조건을 지정합니다.
  table.integer('col1').primary()
// `col1`, `col2` 컬럼을 묶어서 PRIMARY KEY 제약조건을 지정합니다.
  table.primary(['col1', 'col2'])
// `col2` 이라는 이름의 INTEGER UNSSIGNED 컬럼을 만듭니다.
  table.integer('col2').unssigned()
// `col3` 이라는 이름의 INTEGER 컬럼을 만들고 기본값을 0으로 설정합니다.
  table.integer('col3').defaultTo(0)
// `created_at` 컬럼을 만들고 기본값을 현재 시각으로 설정합니다.
  table.timestamp('creatd_at').defaultTo(knex.fn.now())
// `col4` 이라는 이름의 INTEGER 컬럼을 만들고 NOT NULL 제약조건을 지정합니다.
  table.integer('col4').notNullable()
// `other_table_id` 컬럼을 `other_table` 테이블의 `id`에 대한 FOREIGN KEY로 지정합니다.
  table.foreign('other_table_id').references('other_table.id')
// 참조하고 있는 `other_table`의 레코드가 삭제되었을 때 어떻게 동작할 것인지를 지정할 수도 있습니다.
  table.foreign('other_table_id').references('other_table.id').onDelete('RESTRICT')
// `col1` 컬럼에 UNIQUE 제약조건을 지정합니다.
  table.unique('col1')
// `col1`, `col2` 컬럼을 묶어서 UNIQUE 제약조건을 지정합니다.
  table.unique(['col1', 'col2'])
})
```

 
# DB 동시성 제어
순간적으로 대량의 요청을 했을때 원하지 않는 데이터로 덮어씌어버리는, 싱크가 안 맞는현상.

## 대처법
- DB잠금 : DB Lock을 사용하여 하나씩 순서대로 처리되는 방법.
하지만 성능문제와 Dead Lock 생길 위험이 있다
- Atomic update 원자적 갱신 : 서버에서 연산해서 DB반영하는것이 아닌 연산명령을 보내어 DB에서 처리하는방법. 
```sql
update `url_entry` set `click_count` = `click_count` + 1 where `id` = {id} 
```
 
# 암호화
비밀번호 같은 중요 키값을 저장하기 위해 해독할수 없는 형태로 DB에 저장한다.
- 해시함수 : 고전적인 방법 md5
- bcrypt : 해시함수의 발전형으로 해시가 매번 변할수있다.
 
## bcrypt
```js
const bcrypt = require('bcrypt')
 
//사용자 레코드 생성
  createUser(username, password){
    const hashed_password = bcrypt.hashSync(password, 10);
    return knex('user')
      .insert({
        username,
        hashed_password
      })
  },
 
// 일치 여부 확인
const isMatch = bcrypt.compareSync(password, user.hashed_password)
  if(isMatch){
    return user;
  }
```

# 유효성검사
validator : https://www.npmjs.com/package/validator
