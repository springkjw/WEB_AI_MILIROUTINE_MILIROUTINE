# **밀리루틴 백엔드**

안녕하세요! 밀리루틴 팀의 백엔드 README입니다.

## ☝️ **프로젝트 실행 방법**

```shell
# src/db/.env
DB_HOST=**.**.**.**
DB_USER=miliroutine_developer
DB_PASSWORD=*******
DB_PORT=*****
DB_DATABASE=miliroutine_db
```

```shell
# src/token/.env
SECRET_KEY=*********
```

```shell
$ cd WEB\(BE\)/
$ yarn install # node_modules를 설치하는 명령어
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

### **라우팅 표**

| Method & Path                      | 설명                   | 메소드 경로                          |
| ---------------------------------- | ---------------------- | ------------------------------------ |
| GET /                              | 현재 사용자 정보       | home.ctrl → output.home              |
| POST /auth/login                   | 로그인                 | login.ctrl → user.checkUserInfo      |
| POST /auth/signup                  | 회원가입               | signup.ctrl → user.regist            |
| GET /popular                       | 인기 밀리루틴 정보     | popular.ctrl → routine.outputPopular |
| POST /routine/make                 | 밀리루틴 개설하기      | routine.ctrl → routine.make          |
| GET /routine/:routineId            | 루틴 상세 정보         | routine.ctrl → routine.output        |
| GET /user/my                       | 나의 밀리루틴 정보     | user.ctrl → output.mine              |
| GET /user/my/like                  | 좋아요한 밀리루틴 정보 | user.ctrl → output.like              |
| GET /user/routine/:routineId/auth  | 루틴 인증 정보         | user.ctrl → output.auth              |
| POST /user/routine/:routineId/auth | 루틴 인증하기          | user.ctrl → routine.auth             |
| GET /user/settings                 | 회원정보               | user.ctrl → output.setting           |
| POST /user/settings                | 회원정보 수정          | user.ctrl → user.setInfo             |
| POST /user/settings/pw             | 비밀번호 변경          | user.ctrl → user.setPassword         |
| GET /user/pointshop                | 포인트샵 품목 정보     | user.ctrl → output.goods             |
| POST /user/pointshop               | 포인트샵 품목 구입     | user.ctrl → goods.buy                |

> Request Body와 Response Body는 JSON 형식으로만 구성됩니다.

#### 오류 Response Body

- 400 Bad Request
  | key | value 타입 | 설명 |
  | --- | ---------- | ---- |
  | success | false | |
  | err | string | 에러 메시지 |

- 403 Forbidden
  | key | value 타입 | 설명 |
  | ------- | ---------- | --- |
  | success | false | |
  | isLogin | false | |
  | err | string | 에러 메시지 |

### **계정 관련**

#### 1. **`GET /` : 현재 사용자 정보**

- Response Body (200 OK, 비로그인 상태)
  | key | value 타입 | 설명 |
  | --- | ---------- | ---- |
  | success | true | |
  | isLogin | false | |

- Response Body (200 OK, 로그인 상태)
  | key | value 타입 | 설명 |
  | --- | ---------- | ---- |
  | success | true | |
  | isLogin | true | |
  | user | object | 해당 유저의 `user` 테이블 정보 |

#### 2. **`POST /auth/login` : 로그인**

- Request Body
  | key | value 타입 | 설명 |
  | --- | ---------- | ---- |
  | id | string | |
  | pw | string | |

- Response Body (200 OK)
  | key | value 타입 | 설명 |
  | --- | ---------- | ---- |
  | success | true | |
  | token | string | JWT 토큰 |
  | user | object | 해당 유저의 `user` 테이블 정보 |

#### 3. **`POST /auth/signup` : 회원가입**

- Request Body
  | key | value 타입 | 설명 |
  | --- | ---------- | ---- |
  | id | string | |
  | pw | string | |
  | email | string | |
  | name | string | 닉네임 |
  | category | array | 관심 카테고리 ex) ["study", "health"] |
  | likeRoutine | array | 선호하는 밀리루틴 ex) [21, 34] |

- Response Body (200 OK)
  | key | value 타입 | 설명 |
  | --- | ---------- | ---- |
  | success | true | |
  | token | string | JWT 토큰 |
  | user | array of object | {id, pw(hashed), email, name, salt} |
  
#### 4. **`GET /user/settings` : 회원정보 수정**

- Request Headers
  | header | value 타입 | 설명 |
  | -- | -- | -- |
  | Authorization | JWT 토큰 | user.no 정보 추출 |

- Request Body
  | key | value 타입 | 설명 |
  | --- | ---------- | ---- |
  | name | string | |
  | category | array | 관심 카테고리 ex) ["study", "health"] |

- Response Body (200 OK)
  | key | value 타입 | 설명 |
  | --- | ---------- | ---- |
  | success | true | |


#### 4. **`POST /user/settings` : 회원정보 수정**

- Request Headers
  | header | value 타입 | 설명 |
  | -- | -- | -- |
  | Authorization | JWT 토큰 | user.no 정보 추출 |

- Response Body (200 OK)
  | key | value 타입 | 설명 |
  | --- | ---------- | ---- |
  | success | true | |
  | name | string | |
  | category | array of object | 로그인된 아이디의 카테고리 정보들 출력 (ex. 아래 코드)|
  	
	`[{
            "id": 23,
            "user_no": 59,
            "category": "dream"
        },
        {
            "id": 163,
            "user_no": 59,
            "category": "study"
        }]`

#### 5. **`POST /user/settings/pw` : 비밀번호 변경**

- Request Headers
  | header | value 타입 | 설명 |
  | -- | -- | -- |
  | Authorization | JWT 토큰 | user.pw, user.salt 정보 추출 |

- Request Body
  | key | value 타입 | 설명 |
  | --- | ---------- | ---- |
  | pw | string | 새로운 비밀번호 |

- Response Body (200 OK)
  | key | value 타입 | 설명 |
  | --- | ---------- | ---- |
  | success | true | |

### **루틴 관련**

#### 1. **`GET /popular` : 인기 밀리루틴 정보**

- Response Body (200 OK)
  | key | value 타입 | 설명 |
  | --- | ---------- | ---- |
  | success | true | |
  | rankedRoutine | array of array | 참여자 수 내림차순 ex) [[routine_id, 참여자수], ...] |

#### 2. **`POST /routine/make` : 밀리루틴 개설하기**

- Request Headers
  | header | value 타입 | 설명 |
  | -- | -- | -- |
  | Authorization | JWT 토큰 | user.no 정보 추출 |

- Request Body
  | key | value 타입 | 설명 |
  | --- | ---------- | ---- |
  | name | string | |
  | category | string | |
  | fileUrl | URL string | 대표 이미지 |
  | auth_cycle | integer | 주 x회 |
  | auth_description_list | array | 인증 방법 ex) ["7시 전에 일어나세요", "8시 전에 인증하세요"] |
  | start_date | DATE string | 루틴 시작일 |
  | duration | integer | 총 x주 |
  | point_info_list | array of object | 포인트 정보 ex) [{'type': "every_week", 'point': 20}, ...] |

- Response Body (201 Created)
  | key | value 타입 | 설명 |
  | ------- | ---------- | ---------- |
  | success | true | |
  | routine | object | 해당 루틴의 `routine` 테이블 정보 |

#### 3. **`GET /routine/:routineId` : 루틴 상세 정보**

- Response Body (200 OK)
  | key | value 타입 | 설명 |
  | --- | ---------- | ---- |
  | success | true | |
  | routine_id | integer | 루틴 고유번호 |
  | routine | object | 해당 루틴의 `routine` 테이블 정보 |

#### 4. **`GET /user/my` : 나의 밀리루틴 정보**

- Request Headers
  | header | value 타입 | 설명 |
  | -- | -- | -- |
  | Authorization | JWT 토큰 | user.no 정보 추출 |

- Response Body (200 OK)
  | key | value 타입 | 설명 |
  | --- | ---------- | ---- |
  | success | true | |
  | routine | object 배열 | 해당 루틴의 `routine` 테이블 정보 |

>  routine이 하나가 아니므로 수정 필요
>  routine Object 배열로 수정

#### 5. **`GET /user/my/like` : 좋아요한 밀리루틴 정보**

- Request Headers
  | header | value 타입 | 설명 |
  | -- | -- | -- |
  | Authorization | JWT 토큰 | user.no 정보 추출 |

- Response Body (200 OK)
  | key | value 타입 | 설명 |
  | --- | ---------- | ---- |
  | success | true | |
  | likeRoutineId | array | 좋아요한 밀리루틴 ex) [21, 34] |

### **인증 관련**

#### 1. **`GET /user/routine/:routineId/auth` : 루틴 인증 정보**

- Request Headers
  | header | value 타입 | 설명 |
  | -- | -- | -- |
  | Authorization | JWT 토큰 | user.no 정보 추출 |

- Response Body (200 OK)
  | key | value 타입 | 설명 |
  | --- | ---------- | ---- |
  | success | true | |
  | auth_list | array of object | 지금까지의 인증 정보 |

> // auth_list를 넣는 방향으로 수정해야 할듯

#### 2. **`POST /user/routine/:routineId/auth` : 루틴 인증하기**

- Request Headers
  | header | value 타입 | 설명 |
  | -- | -- | -- |
  | Authorization | JWT 토큰 | user.no 정보 추출 |

- Request Body
  | key | value 타입 | 설명 |
  | --- | ---------- | ---- |
  | week | integer | x주차 |
  | day | integer | x회차 |
  | date | DATE string | 인증 일자 |
  | img | URL string | 인증 이미지 URL |
  | text | string | 인증 글 |

- Response Body (201 Created)
  | key | value 타입 | 설명 |
  | ------- | ---------- | ----- |
  | success | true | |

### **포인트샵 관련**

#### 1. **`GET /user/pointshop` : 포인트샵 품목 정보**

- Request Headers
  | header | value 타입 | 설명 |
  | -- | -- | -- |
  | Authorization | JWT 토큰 | user.point 정보 추출 |

- Response Body (200 OK)
  | key | value 타입 | 설명 |
  | --- | ---------- | ---- |
  | success | true | |
  | userPoint | integer | |
  | goods | array of object | `goods` 테이블 전체 정보 (id, name, description, thubnail_img,price)|

#### 2. **`POST /user/pointshop` : 포인트샵 품목 구입**

- Request Headers
  | header | value 타입 | 설명 |
  | -- | -- | -- |
  | Authorization | JWT 토큰 | user.no, user.point 정보 추출 |

- Request Body
  | key | value 타입 | 설명 |
  | --- | ---------- | ---- |  
  | goods_id | integer | |

- Response Body (201 Created)
  | key | value 타입 | 설명 |
  | --- | ---------- | ---- |
  | success | true | |
  | goods | object | 구매한 품목의 `goods` 테이블 정보 |
