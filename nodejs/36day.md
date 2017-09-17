# Join
여러 테이블의 데이터를 가져와서 하나의 테이블로 합칠 수 있다.
```sql 
SELECT salaries.salary, salaries.from_date, employees.first_name
FROM salaries, employees
WHERE salaries.emp_no = employees.emp_no;
```

위의 예제처럼 테이블을 합칠 수도 있지만, JOIN 구문을 이용해서 조인을 하는 것이 관례입니다. (조인을 하고 있다는 것을 명확히 알 수 있고, 읽기도 쉽기 때문입니다.)
```sql
SELECT salaries.salary, salaries.from_date, employees.emp_no, employees.first_name
FROM salaries
JOIN employees ON employees.emp_no = salaries.emp_no;
```

AS 구문으로 테이블에 별칭을 부여 할수있습니다.
```sql 
SELECT first_name, salary, from_date, emp.emp_no
FROM salaries AS sal
JOIN employees AS emp ON emp.emp_no = sal.emp_no;
```
 
## inner join, outer join
일반적인 join을 사용하면 inner join이 된다. 
join으로 인한 null이 생기는것은 포함하지 않고 조인된다. 하지만 null이 생기는 요소까지 포함하기 위해서는 outer join을 해야한다. 
> 오라클의 (+)

```sql 
SELECT column_name
FROM table1
LEFT JOIN table2 ON table1.column_name = table2.column_name;
SELECT column_name
FROM table1
RIGHT JOIN table2 ON table1.column_name = table2.column_name;
SELECT column_name
FROM table1
FULL OUTER JOIN table2 ON table1.column_name = table2.column_name;
```
join을 연달아 사용하여 여러 테이블의 조인이 가능하다.
 
# subquery 서브쿼리
쿼리 안에 쿼리를 중첩시켜서 중첩된 쿼리의 결과를 바깥쪽 쿼리에서 활용할 수 있는 기능.
```sql
SELECT emp_no, first_name FROM employees
WHERE emp_no = (
  SELECT emp_no FROM salaries
  WHERE YEAR(from_date) <= '1997'
  ORDER BY salary DESC
  LIMIT 1
);
```

## 다중 행 서브쿼리
여러 개의 행을 반환하는 서브쿼리. 다중 행 서브쿼리는 바깥쪽 쿼리의 WHERE 구문에서 IN 연산자와 함께 사용한다.
```sql
SELECT first_name FROM employees
WHERE emp_no IN (
  SELECT emp_no FROM salaries
  WHERE salary >= 150000
);
```

# 인덱스 
검색을 효율적으로 하기 위해 특정 컬럼에 저장된 데이터를 미리 정렬시켜 놓은 것을 가지고 인덱스라고 부른다. 

쿼리가 사용할 수 있는 인덱스가 없으면 쿼리는 전체 테이블을 순회하며 검색을 하게 되어 결과를 받을 때까지 시간이 오래 걸리지만, 쿼리가 활용할 수 있는 인덱스가 미리 만들어져있는 상태라면 쿼리 속도가 비약적으로 상승하게 됩니다.

```sql
CREATE INDEX 구문을 사용해서 인덱스를 생성할 수 있습니다.
CREATE INDEX ix_from_date ON salaries(from_date);
CREATE INDEX ix_from_date_to_date ON salaries(from_date, to_date);
--앞에서 생성된 인덱스를 SHOW INDEX 구문으로 확인할수있다.
SHOW INDEX FROM salaries;
```

- Primary, foreign 키는 자동으로 인덱스를 걸어준다.
- 특정 컬럼(혹은 다중 컬럼)의 값을 유일하게 만드는 제약 조건을 걸고 싶을 때 UNIQUE INDEX를 사용한다.


인덱스도 디스크의 용량을 차지합니다. 
또한 미리 정렬을 시켜둬야 하는 인덱스의 성질때문에, 인덱스를 생성한 뒤에는 데이터의 추가나 수정이 느려집니다. 

다시 말해서, 인덱스는 읽기 효율을 높이는 대신 쓰기 효율을 희생시킵니다.

테이블에 쓰기가 극단적으로 많이 일어나는 경우에는 인덱스 사용을 재고해보는 것이 좋습니다. 그렇지 않은 경우라면, WHERE 혹은 ORDER BY 구문에서 자주 사용되는 컬럼에 대해서는 인덱스를 걸어두는 것이 좋습니다. 또한 AND 연산으로 엮여서 자주 검색되는 컬럼들에 대해서는 다중 컬럼 인덱스를 생성하는 것이 좋습니다.

작성한 쿼리가 인덱스를 잘 활용하고 있는지 확인하려면 EXPLAIN 구문을 사용해서 실행 계획을 확인할 수 있습니다.
```sql
explain select * from salaries where from_date > '1999-01-01';
```
 
# 트랜잭션
트랜잭션을 사용하면, 여러 개의 쿼리 중 하나라도 실패했을 때 데이터베이스의 상태를 원상복귀 시킬수 있다. 여러 쿼리에 걸친 데이터 조작의 신뢰성을 확보할수있다.
```sql
start transaction;
INSERT INTO employees (emp_no, birth_date, first_name, last_name, gender, hire_date)
VALUES (876543, '1980-03-05', 'Georgi', 'Jackson', 'M', '2017-09-11');
select * from employees where emp_no = '876543';
commit;
rollback;
```

커밋하기 전에는 트랜잭션 내에서 변경된 사항을 다른 커넥션에서 볼 수 없습니다. 이런 성질을 트랜잭션의 격리(isolation) 라고 한다. MySQL은 다양한 격리 수준(isolation level)을 지워하는데, 자세한 사항은 공식문서
(https://dev.mysql.com/doc/refman/5.7/en/innodb-transaction-isolation-levels.html) 및 
(http://hyunki1019.tistory.com/111)
 
 
# 데이터 모델링
데이터들을 모델링 하기위해서는 현실 세계에서의 작업이 어떤 절차를 통해 이루어지는지를 정보를 수집해야 한다.
정보는 아래와 같다.
- 엔디티 (entity) : 절차에 관여하는 어떤 것(thing). 식별 가능한 사람, 장소, 사물, 사건 등
- 속성 (attribute) : 개체가 가지는 성질
- 관계 (relationship) : 개체 간에 가지는 관계

DB에는 아래형태를 같춘다.
- 엔티티 - 테이블
- 속성 - 개체를 나타내는 테이블의 컬럼
- 관계 - 외래 키, 혹은 관계 테이블
 
## 관계 차수
두 개체 간 관계에서 각 개체의 참여자 수를 차수(cardinality)라고 한다.
> 1:1 관계, 1:N 관계, M:N 관계 
 
# 정규화
데이터의 중복을 최소화할 수 있도록 데이터를 구조화하는 작업.

일반적으로, 정규화가 잘 된 데이터베이스는 작고 잘 조직된 여러 테이블로 나누어진다.

보통 데이터 모델링을 할 때에는 정규화 과정을 통해 중복을 없애주는 것이 좋습니다. 
다만 성능상의 이유로 일부러 데이터를 중복시켜 저장하는 경우도 있는데, 이를 반정규화라고 합니다.