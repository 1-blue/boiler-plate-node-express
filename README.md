## 1. 설명
`Node.js`의 `express`를 이용한 서버 구현

## 2. 기술 스택
1. `express` ( `Node.js`를 서버로 사용하기 위해 이용 )
2. `cors` ( `cors`를 간단하게 해결하기 위해 사용 )
3. `multer` ( `multipart/form-data`를 처리 즉, 이미지 처리를 위해 사용 )
4. `passport` ( local 로그인 및 OAuth를 위해 사용 ( kakao, naver, facebook 등 ) )
5. `sequelize` ( `ORM`방식으로 `DB`를 조작하기 위해 사용 )

## 3. 폴더 구조
```
│  .eslintrc
│  .gitignore
│  .prettierrc
│  app.js
│  package-lock.json
│  package.json
│  README.md
│
├─config
│      index.js
│
├─middleware
│      index.js
│
├─models
│      index.js
│      post.js
│      user.js
│
├─passport
│      index.js
│      local.js
│
├─public
│  └─images
│
├─routes
│      auth.js
│      image.js
│      post.js
│      user.js
│
└─sql
        유저 생성.sql
        테스트.sql
```
+ 폴더 역할
  1. `.eslintrc`: eslint 설정 파일
  2. `.gitignore`: 무시할 파일을 설정하는 파일
  3. `.prettierrc`: prettier 설정 파일
  4. `app.js`: 서버의 진입점 ( 미들웨어 등록 및 엔드 포인트 라우팅 및 서버 시작 )
  5. `package.json`: 설치할 라이브러리를 기록한 파일
  6. `config`: `sequelize`에 `DB`를 연동하기 위한 설정값을 적은 파일이 있는 폴더
  7. `middleware`: 엔드 포인트에 접근하기 전에 로그인/로그아웃을 판단할 미들웨어를 정의한 파일이 있는 폴더
  8. `models`: `sequelize`로 `DB`연동 및 모델 생성 및 관계 설정 코드들을 모아놓은 폴더
  9. `passport`: 로그인 전략을 위한 `passport`코드를 모아놓은 폴더
  10. `public`: 서버에 올릴 static 파일들을 모아놓은 폴더
  11. `routes`: 엔드 포인트 코드를 모아놓은 폴더
  12. `sql`: Mysql기준 `DB`생성, 유저생성 코드를 적어놓은 파일이 있는 폴더

## 4. 가이드 라인
- 종속성 설치
```bash
$ npm install

# npx 가능하다면 설치 안 해도 됨
$ npm install -g pm2
```

- `.env` 생성
```
NODE_ENV=
COOKIE_SECRET=
DATABASE_NAME=
DATABASE_USER_NAME=
DATABASE_PASSWORD=
DATABASE_HOST=
CLIENT_URL=
```

- 실행
```bash
# 개발 환경
$ npm run dev

# 배포 환경
$ sudo npm start
$ sudo pm2 log
$ sudo pm2 monit

# npx 가능하다면
$ sudo npx pm2 start app.js
$ sudo npx pm2 log
$ sudo npx pm2 monit
```