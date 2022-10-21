# 밀리루틴 AI

안녕하세요! 밀리루틴 팀의 AI README입니다.  
사용자가 좋아할만한 루틴을 추천하는 모델을 제작하고 있어요.

## ☝️ **프로젝트 실행 방법**

```shell
$ cd AI/
$
```

## 👋 **AI를 만든 사람들**

| 이름   | 역할      | 이메일              | 깃허브 ID                                                                                                                                                           |
| ------ | --------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 이동현 | 모델 제작 | dong97338@gmail.com | <a href="https://github.com/dong97338" target="_blank"><img src="https://img.shields.io/badge/dong97338-181717?style=flat-square&logo=github&logoColor=white"/></a> |

## 📚 **기술 스택**

- `Python 3.8.10` : gensim 3.8.3과의 호환 이슈
- NLP
  - `torch 1.6.0`
  - `gensim 3.8.3` : ko.bin과의 호환 이슈로 이전 버전 사용
- 전처리
  - `konlpy 0.5.2` : Komoran
  - `py-hanspell 1.1`
  - `emoji 1.7.0` : 멤버함수 get_emoji_regexp()가 최신버전에서 사용되지 않음

## 📂 **핵심 폴더 구조**

```
📄 d2v.py
📄 u2v.py
📄 w2vsqlver.py
```

## 🤖 **모델 설명**

```mermaid
flowchart ID
    A[유저 히스토리(루틴 이름 벡터 평균) div==300] ----> C[입력 레이어 div=330]
    B[유저 히스토리(루틴 주기 벡터 평균) div==30] ----> C[입력 레이어 div=330]
    C ----> D[레이어 div=220]
    D ----> E[레이어 div=110]
    E ----> F[출력 레이어(루틴 30개 one-hot 벡터) div=30]
```
