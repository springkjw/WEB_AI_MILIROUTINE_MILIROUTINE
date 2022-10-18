# **밀리루틴 프론트엔드**

안녕하세요! 밀리루틴 팀의 프론트엔드 README입니다.

## ☝️ **프로젝트 실행 방법**

```shell
$ cd WEB\(FE\)/
$ yarn install # node_modules를 설치하는 명령어
$ yarn run dev
```

## 👋 **프론트엔드를 만든 사람들**

| 이름   | 역할                                           | 이메일                | 깃허브 ID                                                                                                                                                                 |
| ------ | ---------------------------------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 권재원 | 스캐폴딩, 라우팅, 핵심 페이지 및 컴포넌트 제작 | springkjw@gmail.com   | <a href="https://github.com/springkjw" target="_blank"><img src="https://img.shields.io/badge/springkjw-181717?style=flat-square&logo=github&logoColor=white"/></a>       |
| 이시웅 | 세부 페이지 제작                               | sco3o17@gmail.com     | <a href="https://github.com/silverttthin" target="_blank"><img src="https://img.shields.io/badge/silverttthin-181717?style=flat-square&logo=github&logoColor=white"/></a> |
| 박용준 | 스타일링                                       | yongjun0613@naver.com | <a href="https://github.com/yoopark" target="_blank"><img src="https://img.shields.io/badge/yoopark-181717?style=flat-square&logo=github&logoColor=white"/></a>           |

## 📚 **기술 스택**

- `React` + `Typescript` -> `.tsx`
- `tailwindCSS` : 미리 세팅된 클래스를 활용하여 `tsx`에서 바로 CSS 작업을 할 수 있다
- `Vite` : create-react-app보다 빠른 보일러플레이트
- `Esbuild` : Webpack보다 빠른 Bundler
- `yarn` : npm보다 빠른 Package Manager
- 아토믹 디자인 패턴

## 📂 **핵심 폴더 구조**

```
📂 public
📂 src
└── 📂 assets
    📂 components
    └── 📂 Element
        📂 Layout
    📂 features
    └── 📂 auth
        📂 my
        📂 routine
        📂 misc
    📂 routes
    📄 App.tsx
📄 index.html
📄 config.json
📄 package.json
```

### **components/ 파일 예시**

```ts
export interface ButtonProps {
  label: string;
  onClick?: () => void;
}

export const Button = ({ label, onClick }: ButtonProps) => {
  return (
    <button
      className={`bg-orange text-white-100 font-bold rounded-full`}
      onClick={onClick}>
      {label}
    </button>
  );
};
```

### **feautres/ 파일 예시**

```ts
import { useState, useCallback, useRef } from 'react';
import {
  Jumbotron,
  RoutineItem,
  Carousel,
  Segment,
} from '@/components/Element';
import { MainLayout } from '@/components/Layout';

export const LandingPage = () => {
  return (
    <MainLayout>
      <Jumbotron />

      <section>
        <h2>AI 추천 밀리루틴</h2>
        <Carousel>
          <RoutineItem />
          <RoutineItem />
          <RoutineItem />
          <RoutineItem />
        </Carousel>
      </section>
    </MainLayout>
  );
};
```

### **routes/ 파일 예시**

```ts
import { useRoutes } from 'react-router-dom';
import { LandingPage, PopularPage } from '@/features/misc';
import { protectedRoutes } from './protected';
import { publicRoutes } from './public';

export const AppRoutes = () => {
  const auth = useAuth();

  const commonRoutes = [
    { path: '/', element: <LandingPage /> },
    { path: '/popular', element: <PopularPage /> },
  ];

  const element = useRoutes([
    ...commonRoutes,
    ...protectedRoutes,
    ...publicRoutes,
  ]);

  return <>{element}</>;
};
```

## 🌍 **라우팅 표**

| path                             | 설명              | 컴포넌트명              | 파일 경로                            |
| -------------------------------- | ----------------- | ----------------------- | ------------------------------------ |
| /                                | 랜딩 페이지       | `<LandingPage />`       | features/misc/routes/Landing.tsx     |
| /popular                         | 인기              | `<PopularPage />`       | features/misc/routes/Popular.tsx     |
| /user/my                         | 나의 밀리루틴     | `<MyPage />`            | features/my/routes/MyPage.tsx        |
| /user/my/routine/:routineId/auth | 인증하기          | `<MyRoutineAuthPage />` | features/my/routes/MyRoutineAuth.tsx |
| /user/setting                    | 설정              | `<SettingPage />`       | features/my/routes/Setting.tsx       |
| /user/pointshop                  | 포인트샵          | `<PointShopPage />`     | features/my/routes/PointShop.tsx     |
| /routine/make                    | 밀리루틴 개설하기 | `<RoutineMakePage />`   | features/routine/RoutineMake.tsx     |
| /routine/:routineId              | 밀리루틴 상세     | `<RoutineDetailPage />` | features/routine/RoutineDetail.tsx   |
| /auth/login                      | 로그인            | `<LoginPage />`         | features/auth/routes/Login.tsx       |
| /auth/signup                     | 회원가입          | `<SignupPage />`        | features/auth/routes/Signup.tsx      |
