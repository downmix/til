# Node.js를 통해 MySQL을 이용하는 방법
- 쿼리를 직접 작성 (mysql, ...)
- 쿼리빌더를 통해 쿼리를 실행 (Knex.js, Squel.js, ...)
- ORM(Object)를 통해 쿼리를 실행  (Sequelize, Bookshelf.js, Objection.js, ...)
 
 
# Knex
## 선언
Knex를 이용해 MySQL 서버에 접속하기 위해서는 일단 아래와 같이 Knex 인스턴스를 만들어야 한다.
```js
//kenx.js
const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'root', // 실제 서비스에서는 root X    
    password: 'rootpassword',
    database: 'employees'
  }
})
 
// node + express
const knex = require('./knex')
```

## Connection Pool
Knex 인스턴스를 생성하면 connection pool이 만들어진다
인스턴스 생성 시 별도의 옵션을 주지 않는다면 커넥션 풀은 2개의 커넥션으로 시작하며, 필요에 의해 10개까지 늘어날 수 있다.
 
## 사용법
```js
knex('salaries').limit(3).then(console.log)
// 결과
[ { emp_no: 10001,
    salary: 60117,
    to_date: 1987-06-25T14:00:00.000Z },
  { emp_no: 10001,
    salary: 62102,
    to_date: 1988-06-24T14:00:00.000Z },
  { emp_no: 10001,
    salary: 66074,
    to_date: 1989-06-24T15:00:00.000Z } ]
```
 
Knex 인스턴스는 메소드 체인 방식으로 사용하도록 만들어져 있습니다. 아래와 같이 메소드를 계속 이어붙이는 방식으로 쿼리를 빌드한다.

표준 Promise는 아니고, 자체 Promise 구현을 사용한다.

이 구현의 특이한 점은 then 메소드를 호출하기 전까지는 SQL을 실행시키지 않는다.
then() 대신 toString() 를 사용하면 쿼리문을 확인할수있다.

```js 
knex('employees')
  .select('first_name')
  .max('salary as max_salary')
  .join('salaries', 'employees.emp_no', 'salaries.emp_no')
  .groupBy('salaries.emp_no')
  .orderBy('max_salary', 'desc')
  .limit(10)
  .then(...)
```

## select
```js
knex('salaries')
  .select('emp_no', 'salary')
  .limit(3)
  .toString()
// select `emp_no`, `salary` from `salaries` limit 3
 
knex('employees')
  .distinct('first_name')
  .limit(3)
  .toString()

// select distinct `first_name` from `employees` limit 3
```

## where
```js
knex('salaries')
  .where('emp_no', 20000)
  .limit(3)
  .toString()
/*
select * from `salaries`
where `emp_no` = 20000
limit 3
*/
 
knex('salaries')
  .where('emp_no', '>', 20000)
  .limit(3)
  .toString()
/*
select * from `salaries`
where `emp_no` > 20000
limit 3
*/
```

AND 연산자를 사용하기 위해 where 메소드를 여러 번 사용하거나, andWhere 메소드를 사용할 수 있다.
```js
knex('salaries')
  .where('emp_no', '>', 20000)
  .where('salary', '>', 150000)
  .andWhere('from_date', '<', '1999-01-01')
  .limit(3)
  .toString()
/*
select * from `salaries`
where `emp_no` > 20000
  and `salary` > 150000
  and `from_date` < '1999-01-01'
limit 3
*/
 
knex('employees')
  .where({
    first_name: 'Georgi',
    last_name: 'Facello'
  })
  .toString()
/*
select * from `employees`
where `first_name` = 'Georgi' and `last_name` = 'Facello'
*/
```

복잡한 where를 사용하기 위해서는 함수 인자로 넘겨서 작성할수있다.
```js
knex('salaries')
  .where(function() {
    // arrow function을 사용하면 안 됩니다!
    this
      .where('emp_no', '>', 20000)
      .andWhere('salary', '>', 150000)
  })
  .orWhere(function() {
    this
      .where('emp_no', '<', 11000)
      .andWhere('salary', '<', 60000)
  })
  .limit(3)
  .toString()
/*
select * from `salaries`
where (`emp_no` > 20000 and `salary` > 150000)
  or (`emp_no` < 11000 and `salary` < 60000)
limit 3
*/
```
## insert

```js
knex('employees')
  .insert({
    emp_no: 876543,
    first_name: 'fast',
    last_name: 'campus',
    birth_date: '1960-01-01',
    hire_date: '1980-01-01',
    gender: 'M'
  })
  .toString()
/*
insert into `employees` (`birth_date`, `emp_no`, `first_name`, `gender`, `hire_date`, `last_name`)
values ('1960-01-01', 876543, 'fast', 'M', '1980-01-01', 'campus')
*/
```

## update
```js 
knex('employees')
  .where({emp_no: 876543})
  .update({last_name: 'five'})
  .toString()
/*
update `employees`
set `last_name` = \'five\'
where `emp_no` = 876543
*/
```

## delete
```js
knex('employees')
  .where({emp_no: 876543})
  .delete()
  .toString()
/*
delete from `employees`
where `emp_no` = 876543
*/
```

## order by
```js
knex('employees')
  .orderBy('first_name', 'desc')
  .orderBy('last_name')
  .limit(3)
  .toString()
/*
select * from `employees`
order by `first_name` desc, `last_name` asc
limit 3
*/
```

## 쿼리 함수
```js
knex('salaries')
  .count('*')
  .toString()
/*
select count(*) as `c` from `salaries`
*/
 
knex('salaries')
  .max('salary as s')
  .then(console.log)
// 결과
[ { s: 158220 } ]

```

## Group by
```js
knex('salaries')
  .select('emp_no')
  .max('salary as max_salary')
  .groupBy('emp_no')
  .limit(10)
  .toString()
/*
select `emp_no`, max(`salary`) as `max_salary`
from `salaries`
group by `emp_no`
limit 10
*/
 
knex('salaries')
  .select('emp_no')
  .max('salary as max_salary')
  .groupBy('emp_no')
  .having('max_salary', '>', 150000)
  .toString()
/*
select `emp_no`, max(`salary`) as `max_salary`
from `salaries`
group by `emp_no`
having `max_salary` > 150000
*/
```
## join
```js
knex('employees')
  .select('first_name', 'salary')
  .join('salaries', 'employees.emp_no', 'salaries.emp_no')
  .limit(10)
  .toString()
/*
select `first_name`, `salary` from `employees`
inner join `salaries` on `employees`.`emp_no` = `salaries`.`emp_no`
limit 10
*/
 
knex('users')
  .select('*')
  .leftJoin('accounts', 'users.id', 'accounts.user_id')
 
select * from `users` left join `accounts` on `users`.`id` = `accounts`.`user_id`
 
knex('users')
  .select('*')
  .rightJoin('accounts', 'users.id', 'accounts.user_id')
 
select * from `users` right join `accounts` on `users`.`id` = `accounts`.`user_id`
```
 
## 서브쿼리
```js
const subquery = knex('salaries')
  .max('salary')
  .where('from_date', '<', '1999-01-01')
knex('salaries')
  .distinct('emp_no')
  .where('salary', '>', subquery)
  .toString()
/*
select distinct `emp_no` from `salaries`
where `salary` > (
  select max(`salary`) from `salaries`
  where `from_date` < '1999-01-01'
)
*/
```

## First()
Knex를 통해 쿼리를 실행하면 보통 배열이 반환된다. limit(1) 처럼 하나의 행이 반환될 것이 확실한 경우에도 마찬가지이기 때문에 firstr함수를 활용할 필요가 있다. 만약 없다면 undefined 반환한다. 
```js
knex('employees')
  .select('emp_no')
  .first()
  .then(console.log)
// 결과
{ emp_no: 10001 }
```

## raw()
Knex가 지원하지 않는 기능을 사용하기 위해 SQL를 직업 사용하는 함수.
쿼리내 변수를 사용하고자 한다면, SQL 인젝션 방어를 위해 knex에서 제공하는 기능으로 전달해야 한다.
```js 
knex('users')
  .select(knex.raw('count(*) as user_count, status'))
  .where(knex.raw(1))
  .orWhere(knex.raw('status <> ?', [1]))
  .groupBy('status')
```