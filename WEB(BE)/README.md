# **밀리루틴 백엔드**

안녕하세요! 밀리루틴 팀의 백엔드 README입니다.

## ☝️ **프로젝트 실행 방법**

```shell
$ cd WEB\(BE\)/
$ yarn install # node_modules를 설치하는 명령어
$ export DB_HOST=
$ export DB_USER=miliroutine_developer
$ export DB_PASSWORD=
$ export DB_PORT=
$ export DB_DATABASE=miliroutine_db
$ yarn start
```

## 👋 **백엔드를 만든 사람들**

| 이름   | 역할          | 이메일                | 깃허브 ID                                                                                                                                                           |
| ------ | ------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 김민찬 | REST API 제작 | cmk0487@naver.com     | <a href="https://github.com/minchan02" target="_blank"><img src="https://img.shields.io/badge/minchan02-181717?style=flat-square&logo=github&logoColor=white"/></a> |
| 박용준 | DB 구성       | yongjun0613@naver.com | <a href="https://github.com/yoopark" target="_blank"><img src="https://img.shields.io/badge/yoopark-181717?style=flat-square&logo=github&logoColor=white"/></a>     |

## 📚 **기술 스택**

- `Express` : Node.js 백엔드 개발용 Framework
- `yarn` : npm보다 빠른 Package Manager
- `MySQL 8.0`
- MVC 디자인 패턴

## 📂 **핵심 폴더 구조**

```
📂 database
└── 📄 Dockerfile
📂 src
└── 📂 controllers
    📂 models
    📂 routes
📄 app.js
📄 package.json
```

### **models/ 파일 예시**

```js
const routine = {
  get: async (item, val) => {
    return new Promise(function (resolve, reject) {
      db.query(
        'SELECT * FROM routine WHERE ' + item + ' = ?',
        val,
        function (err, rows, fields) {
          if (err) {
            console.log(err);
          }
          resolve(rows);
        }
      );
    });
  },

  add: async (values) => {
    db.query(
      'INSERT INTO routine (host,name,category,thumbnail_img,auth_cycle,auth_description_list,start_date,duration,point_info_list) VALUES (?)',
      [values],
      function (err, rows, fields) {
        if (err) {
          console.log(err);
        }
      }
    );
  },
};
```

### **routes/ 파일 예시**

```js
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/home.ctrl');

const signup = require('./signup');
const login = require('./login');
const routine = require('./routine');
const user = require('./user');
const popular = require('./popular');

router.get('/', function (req, res) {
  console.log('home');
});

router.use('/auth/login', login);
router.use('/auth/signup', signup);
router.use('/routine', routine);
router.use('/user', user);
router.use('/popular', popular);

module.exports = router;
```

### **controllers/ 파일 예시**

```js
const routine = {
  output: async (req, res) => {
    const routineId = req.params.routineId;

    const param = await data.routine.get('id', routineId);

    res.json({
      routine_id: routineId,
      routine: param,
    });
  },
};
```

## 💽 **DB 구성**

```sql
CREATE DATABASE miliroutine_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE miliroutine_db;

CREATE TABLE user (
    no INT UNSIGNED AUTO_INCREMENT,
    id VARCHAR(30),
    pw VARCHAR(100) NOT NULL,
    salt VARCHAR(64) NOT NULL,
    email VARCHAR(60) NOT NULL,
    nickname VARCHAR(10) NOT NULL,
    profile_img VARCHAR(300),
    background_img VARCHAR(300),
    point INT UNSIGNED DEFAULT 0,
    exp INT UNSIGNED DEFAULT 0,
    PRIMARY KEY (no)
);

CREATE TABLE user_category (
    id INT UNSIGNED AUTO_INCREMENT,
    user_no INT UNSIGNED,
    category VARCHAR(20) NOT NULL, -- study, workout, morningroutine, economy, selfcare, dream, hobby, emotion, health
    PRIMARY KEY (id),
    FOREIGN KEY (user_no) REFERENCES user(no)
);

CREATE TABLE level_exp (
    level TINYINT UNSIGNED,
    exp INT UNSIGNED NOT NULL,
    PRIMARY KEY (level)
);

CREATE TABLE routine (
    id INT UNSIGNED AUTO_INCREMENT,
    host INT UNSIGNED,
    name VARCHAR(20) NOT NULL,
    category VARCHAR(20) NOT NULL,
    thumbnail_img VARCHAR(300),
    auth_cycle  TINYINT UNSIGNED NOT NULL,
    auth_description_list JSON NOT NULL, -- ["매일 저녁 감사한 일을 생각해보세요", "해당 내용을 [인증하기] 탭에 기록하여 업로드하면 참여 완료!\n(업로드한 글은 다른 사람에게 공개되지 않습니다)"]
    start_date DATE NOT NULL, -- yyyy-mm-dd
    duration TINYINT UNSIGNED NOT NULL,
    point_info_list JSON, -- [{'type': "every_week", 'point': 20}, {'type': "rate", 'number': 0.5, 'point': 100}, {'type': "rate", 'number': 0.9, 'point': 100}]
    PRIMARY KEY (id),
    FOREIGN KEY (host) REFERENCES user(no)
);

CREATE TABLE user_routine (
    id INT UNSIGNED AUTO_INCREMENT,
    user_no INT UNSIGNED,
    routine_id INT UNSIGNED,
    type VARCHAR(10) NOT NULL, -- join, like
    PRIMARY KEY (id),
    FOREIGN KEY (user_no) REFERENCES user(no),
    FOREIGN KEY (routine_id) REFERENCES routine(id)
);


CREATE TABLE auth (
    id INT UNSIGNED AUTO_INCREMENT,
    user_no INT UNSIGNED,
    routine_id INT UNSIGNED,
    week TINYINT UNSIGNED NOT NULL,
    day TINYINT UNSIGNED NOT NULL,
    date DATE NOT NULL,
    img VARCHAR(300),
    text TEXT,
    PRIMARY KEY (id),
    FOREIGN KEY (user_no) REFERENCES user(no),
    FOREIGN KEY (routine_id) REFERENCES routine(id)
);

CREATE TABLE goods (
    id INT UNSIGNED AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL,
    description TEXT NOT NULL,
    thumbnail_img VARCHAR(300),
    price INT UNSIGNED NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE user_goods (
    id INT UNSIGNED AUTO_INCREMENT,
    user_no INT UNSIGNED,
    goods_id INT UNSIGNED,
    datetime DATETIME NOT NULL, -- yyyy-mm-dd hh:mm:ss
    PRIMARY KEY (id),
    FOREIGN KEY (user_no) REFERENCES user(no),
    FOREIGN KEY (goods_id) REFERENCES goods(id)
);

INSERT INTO level_exp
	VALUES(1, 100), (2, 100+500), (3, 600+1000), (4, 1600+2000), (5, 3600+2000), (6, 5600+2000), (7, 7600+5000), (8, 12600+5000), (9, 17600+5000);
```

## 💁‍♂️ **REST API**

`BE 코드를 기반으로 작성하였으며 위 DB 구성표를 바탕으로 작성하였음`


### :eyes: Home

### GET : /

> JSON BODY

**X**

> Return

|return|내용|설명|
|------|---|---|
|success|성공여부|boolean (true/false)|
|isLogin|로그인 여부|boolean (true/false)|
|userInfo|현재 로그인된 사용자 정보|json {type:"JWT", no:(사용자no), id:(사용자id), name:(사용자이름)}|
|err|에러 메세지|문자형|


### :eyes: Login

### POST : /auth/login

> JSON BODY

|body|내용|설명|
|------|---|---|
|id|아이디|문자형|
|pw|비밀번호|문자형|

> Return

|return|내용|설명|
|------|---|---|
|success|성공여부|boolean (true/false)|
|token|jwt토큰|문자형|
|user|사용자 정보|데이터 팩 {no, id, pw, salt, email, nickname, profile_img, background_img, point, exp} (ex: user.no, user.id 등으로 접근)|
|err|에러 메세지|문자형|


### :eyes: Signup

### POST : /auth/signup

> JSON BODY

|body|내용|설명|
|------|---|---|
|id|아이디|문자형|
|pw|비밀번호|문자형|
|email|이메일|문자형|
|name|이름|문자형|
|category|관심 카테고리|카테고리 이름이 저장되어 있는 배열 (ex. ['study', 'health'])|
|likeRoutine|선호하는 밀리루틴|루틴 아이디가 저장되어 있는 배열 (ex. [21, 34])|

> Return

|return|내용|설명|
|------|---|---|
|success|성공여부|boolean (true/false)|
|token|jwt토큰|문자형|
|user|사용자 정보|배열 [userId, userPassword, userEmail, userName, salt]|
|err|에러 메세지|문자형|


### :eyes: Routine

### POST : /routine/make

> JSON BODY

|body|내용|설명|
|------|---|---|
|name|밀리루틴 이름|문자형|
|category|밀리루틴 카테고리|문자형|
|fileUrl|루틴 대표 이미지 저장 url|문자형|
|auth_cycle|인증 주기|정수형|
|auth_description|참여 및 인증방법|인증 방법이 들어가있는 배열_1단계~5단계 (ex. ['매일 아침 8시에 기상 인증', '날짜 캡처']|
|start_date|루틴 시작일|yyyy-mm-dd|
|duration|루틴 진행 기간|정수형|

> Return

|return|내용|설명|
|------|---|---|
|success|성공여부|boolean (true/false)|
|isLogin|로그인 여부|boolean (true/false)|
|routine|만든 루틴 정보|배열 [host(만든 유저 no), name, category, image, auth_cycle, auth_description, start_date, duration, point_info_list]|
|err|에러 메세지|문자형|


### GET : /routine/:routineId

> JSON BODY

**X**

> Return

|return|내용|설명|
|------|---|---|
|success|성공여부|boolean (true/false)|
|routine_id|루틴 no|정수형|
|routine|만든 루틴 정보|데이터 팩 {id, host, name, ceategory, thumbnail_img, auth_cycle, auth_Description_list, start_date, duration, point_info_list}|
|err|에러 메세지|문자형|


### :eyes: Popular

### GET : /popular

> JSON BODY

**X**

> Return

|return|내용|설명|
|------|---|---|
|success|성공여부|boolean (true/false)|
|rankedRoutine|랭킹대로 정렬된 루틴|참가자가 많은 순으로 정렬된 루틴 배열 / 배열의 0번째 요소가 routine_id, 1번째 요소가 참가자 수 / [(루틴 아이디), (참가자 수)]|
|err|에러 메세지|문자형|
