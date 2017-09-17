# Database DB
테이블 및 다른 구성요소들을 모아놓은 집합.

DBMS에서는 여러 데이터베이스를 가지고있으며, 데이터베이스 기준으로 권한 설정이 이루어진다.

스키마라고도 불리는데, 스키마라는 용어는 데이터베이스를 의미하기도 하고 데이터베이스의 구조 를 의미하기도 한다.
 
## 사용자, 권한 User & Privilege 
하나의 DBMS는 여러 개의 사용자 계정 가질수 잇다.
DBMS를 사용하려면 사용자 계정을 이용해 DBMS에 접속해야 한다.

사용자 계정은 데이터베이스 별로 다른 권한을 부여할수있다.
root 유저는 DBMS 초기 설치 시에 만들어지는 계정이며, DBMS의 모든권한을 가진다.
 
## Connection 커넥션
사용자 계정을 이용해 데이터베이스에 접속하면, 새 커넥션을 만든다.
세션과 비슷한 개념으로 커넥션 별로 여러가지 옵션을 설정할 수 있고, 트랜잭션도 커넥션 단위로 수행된다.

하나의 클라이언트에서 여러 개의 트랜잭션을 수행하기 위해 여러 커넥션을 생성하여 동시처리력을 높일수 있다.
 
## table 테이블
하나의 DB에 여러 테이블이 저장된다.  
표 형태의 구조화된 데이터가 테이블에 저장된다.

테이블의 행(row)은 개별적인 레코드를 나타내며, 테이블의 열(column)은 레코드의 속성을 나타낸다. 각각의 열에는 미리 정의된 자료형에 해당하는 데이터만 저장된다.
테이블의 각 행은 기본 키(primary key)를 이용해 식별하고, 테이블 내에서 유일한 값이어야 합니다. 기본 키는 다른 테이블과의 관계를 나타낼 때 사용한다.
 
## Constraint (제약 조건)
제약 조건을 지정하면 테이블에 특정한 방식으로만 데이터가 저장될 수 있도록 할 수 있습니다.

`NULL, NOT NULL, UNIQUE, PRIMARY KEY, DEFAULT`
 
### Primary Key, Foreign Key
Primary Key(기본 키)로 지정된 컬럼에 저장되어 있는 값은 테이블에 저장되어 있는 레코드의 식별자(공백 불허, 중복 불가) 역할을 합니다.

Foreign Key(외래 키)로 지정된 컬럼에는 다른 테이블의 기본 키 값이 저장되며, 다른 테이블의 레코드를 참조함으로써 해당 테이블과의 관계를 가진다. 여러 컬럼이 동시에에 기본 키로 지정할 수 있습니다. 이를 Composite primary key(한국어로는 합성키, 혹은 슈퍼키라고 부름)라고 합니다.
 
# 테이블
## 테이블 생성
테이블을 생성할 때는 CREATE TABLE 구문을 사용한다.
```sql
CREATE TABLE my_table (
  -- 일반적인 컬럼은 아래와 같의 정의합니다. 이 컬럼에는 NULL 값이 저장될 수 있습니다.
  my_col1 INTEGER,
-- 컬럼의 기본값을 지정합니다.
  my_col2 INTEGER DEFAULT 0,
-- 컬럼에 NULL 값이 저장될 수 없도록 제한을 둡니다.
  my_col3 INTEGER NOT NULL,
-- UNIQUE 제약조건: 컬럼의 값은 테이블 내에서 유일해야 합니다.
  my_col4 INTEGER UNIQUE,
-- 다양한 옵션을 한 번에 지정할 수 있습니다.
  my_col5 INTEGER NOT NULL DEFAULT 1,
  my_col6 INTEGER NOT NULL UNIQUE,
-- 1부터 시작하는 식별자를 아래와 같이 정의합니다.
  -- PRIMARY KEY는 기본적으로 NOT NULL, UNIQUE 규칙이 적용됩니다.
  my_id INTEGER UNSIGNED AUTO_INCREMENT PRIMARY KEY,
-- 컬럼 정의와 별도로, 여러가지 제약 조건과 인덱스를 아래에 지정할 수 있습니다.
  -- 제약 조건과 인덱스에 대해서는 추후 배울 것입니다.
  FOREIGN KEY (my_id) REFERENCES your_table(your_id) ON DELETE CASCADE,
  INDEX my_idx (my_col1, my_col2),
)
```

테이블이 이미 존재하는 경우에도 구문이 에러 없이 실행되도록 IF NOT EXISTS 구문을 사용할 수 있습니다.
```sql
CREATE TABLE IF NOT EXISTS table_name (
  ...
)
```

## 테이블 수정
```sql
ALTER TABLE table_name
RENAME new_table_name, -- 테이블 이름 변경
ADD COLUMN column_name INTEGER NOT NULL, -- 컬럼 추가
ADD CONSTRAINT UNIQUE, -- 제약 조건 추가
CHANGE old_column_name new_column_name INTEGER, -- 컬럼 이름 변경
MODIFY column_name NEW_TYPE -- 컬럼 타입 변경
DROP COLUMN column_name; -- 컬럼 제거
```

# 데이터 타입
 
## VARCHAR
짧은 문자열을 저장하기 위해 가장 널리 사용되는 타입입니다. 컬럼 타입으로 지정할 때는 아래와 같이 문자열의 길이(바이트)를 명시해야 합니다.
> VARCHAR(255) -- 255는 가장 널리 사용되는 길이입니다.

## TEXT
긴 문자열을 저장하기 위해 사용되는 타입입니다. TEXT 타입의 컬럼에는 64MB까지 저장할 수 있습니다. 요구사항에 따라 크기가 다른 다양한 종류의 TEXT 타입(TINYTEXT, TEXT, MEDIUMTEXT, LONGTEXT)을 사용할 수 있습니다.
 
## INTEGER
정수를 위한 타입. INT로 줄여 사용 할 수도 있다. 요구사항에 따라 크기가 다른 다양한 종류의 INT 타입(TINYINT, SMALLINT, MEDIUMINT, INT, BIGINT)을 사용할 수 있다.
 
- `INTEGER UNSIGNED` -- INTEGER 타입의 양수를 저장할 수 있습니다.
- MySQL에는 참, 거짓을 나타내는 boolean 관련 타입이 없습니다. 대신 `TINYINT`를 사용합니다

 
## DECIMAL
고정 소수점 수를 위한 타입입니다. 십진수의 정확한 계산이 필요할 때 사용합니다. 정수부(최대 65), 소수부(최대 30, 정수부보다 짧거나 같아야 함)의 최대 길이를 각각 지정할 수 있습니다.
> DECIMAL(5, 2) -- 12345.67과 같은 수를 저장할 수 있습니다.
 
## DOUBLE
부동 소수점 수를 위한 타입입니다. 소수의 빠른 계산과 효율적 저장이 필요할 때 사용합니다.
 
## 시각 
mysql의 아래의 두 타입은 시간대 정보를 저장하지 않기 때문에, 사용에 주의가 필요하다.

### DATE 
DATE  : 날짜를 위한 타입입니다.

### DATETIME 
DATETIME  : 날짜와 시각을 같이 저장해야 할 때 사용합니다.
 
## ENUM
열거형을 위한 타입 (작은 데이터 타입 [0 or 1]

## JSON
MySQL 5.7에 JSON 지원이 추가되었으나, 잘 사용하지 않음.

## POINT, GEOMETRY
공간(지도) 정보를 위한 타입
 
 
 
# SELECT 
```sql
SELECT * FROM employees;
SELECT first_name, last_name FROM employees;
SELECT first_name AS `family name`, last_name AS `given name` FROM employees; -- AS 생략가능
 
SELECT emp_no, hire_date, birth_date FROM employees
ORDER BY hire_date; --정렬
 
SELECT first_name, hire_date, birth_date FROM employees
ORDER BY hire_date DESC, birth_date ASC; -- ASC는 생략 가능
 
SELECT * FROM employees
LIMIT 5;
 
SELECT first_name, birth_date FROM employees
ORDER BY birth_date
LIMIT 1 OFFSET 9; -- 앞쪽 기록의 일부분을 생략하고 나머지 기록들을 불러온다.
 
-- 중복제거
SELECT DISTINCT first_name FROM employees
ORDER BY first_name;
```

>  MySql에서 정렬을 할때 다양한 언어와 언어셋에 따라 정렬기준이 다를수있다. DB설정을 통해서 확인해야 하는데 DB의 언어설정을 확인하기 위해서 collation, 캐릭터셋을 확인해야한다. 
 
 
# WHERE
특정 조건을 만족하는 데이터만 불러온다.
 
```sql
SELECT * FROM employees
WHERE first_name = 'Shahid' AND hire_date > '1997-09-12';
```

연산자 | 뜻
---|---
A = B | A와 B가 같음
A != B 또는 A <> B | A와 B가 같지 않음
A < B | A가 B보다 작음
A <= B | A가 B보다 작거나 같음
A > B | A가 B보다 큼
A >= B | A가 B보다 크거나 같음
A IS NULL | A가 NULL임
A IS NOT NULL | A가 NULL이 아님
A LIKE '%PATTERN%' | A가 패턴과 일치함
A REGEXP '/EXPRESSION/' | A가 정규표현식을 만족함
A BETWEEN B AND C | A가 B와 C 사이에 있음 (B, C 포함)
A IN (B,C,D) | A가 B, C, D 중 하나와 일치함 
NOT A | A가 거짓
A OR B | A 또는 B 둘 중 하나가 참
A AND B | A와 B 모두 참
 
## 연산자 우선순위
SQL에도 연산자 우선순위가 있기때문에 연산 순서를 고려하여 where를 작성해야 한다.

괄호를 사용하거나 적절한 연산자로 사용해야한다.
```sql 
SELECT * FROM employees
WHERE (first_name = 'Jeong' OR first_name = 'Shahid') AND hire_date > '1997-09-12';
```

## NULL 
데이터가 없음을 나타내기 위한 목적으로 다루어지는 값. 대부분의 연산자에 대해, 어떤 연산의 피연산자가 NULL이면 해당 연산의 결과는 무조건 NULL이 된다.
```sql
1 > NULL -- NULL
1 = NULL -- NULL
NULL = NULL -- NULL
```

따라서, NULL 값을 허용하는 컬럼에 대해 연산을 할 때는 주의해야 한다. 

특히, 어떤 컬럼의 값이 NULL인지 아닌지 확인하기 위해서는 =연산자 대신에 IS NULL 혹은 IS NOT NULL연산자를 사용한다.
 
 
## group by
특정 컬럼에 같은 값을 갖고 있는 행들의 집합. where 구문으로 필터링 후 group by를 실행한다.
```sql
SELECT emp_no, max(salary) FROM salaries
GROUP BY emp_no;
 
SELECT emp_no, count(*) AS salary_count FROM salaries
WHERE from_date BETWEEN '1996-01-01' AND '2000-12-31'
GROUP BY emp_no
ORDER BY salary_count DESC;
```

## having
group by 후의 조건을 지정할수있다.
```sql 
SELECT emp_no, max(salary) AS max_salary FROM salaries
GROUP BY emp_no
HAVING max_salary > 150000
ORDER BY max_salary DESC;
```
 
# Function 함수
- CONCAT 문자열을 이어붙어서 반환
```sql
SELECT CONCAT(first_name, ' ', last_name) AS full_name FROM employees;
```

- LOWER, UPPER 각각 문자열을 소문자/대문자로 교체
```sql
SELECT UPPER(first_name) FROM employees;
```

- LENGTH문자열의 길이 반환
- SUBSTRING 문자열의 일부분을 반환. 
 SUBSTRING(문자열, 자를 인덱스, 자를 길이). 인덱스는 1부터 시작합니다.
```sql
SELECT SUBSTRING(first_name, 1, 3) FROM employees; -- 앞의 세 글자를 반환
```
 
- ABS 절대값 반환
- ROUND  반올림한 결과를 반환
```sql
SELECT ROUND(1.5);
```
- CURRENT_DATE 오늘 날짜를 DATE 형식을 반환
```sql
SELECT CURRENT_DATE();
```
- NOW 현재 시각을 DATETIME 형식으로 반환
```sql
SELECT NOW();
```

- COALESCE 인자들 중 처음으로 NULL이 아닌 값을 반환. 
이 함수는 NULL 값과 NULL이 아닌 값이 모두 저장되어 있는 컬럼을 불러올 때, NULL 값을 대체하기 위해 사용됩니다.
```sql
-- 1이 출력됨
SELECT COALESCE(NULL, 1);

-- 2가 출력됨
SELECT COALESCE(2, 1);
```