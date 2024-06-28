# 💊 비타플로우

나에게 필요한 비타민 찾기


**서비스 URL** : [https://zeuse.vercel.app](https://vita-flow.vercel.app/) <br>
**로그인 정보** : admin@gmail.com / admin1234!<br><br>


## 프로젝트 소개
* 종류별 증상별 추천 영양제에 대한 정보를 제공합니다.
* 영양제를 구매하고 구매한(복용중인) 비타민을 관리할 수 있습니다.<br><br>

  
## 개발 환경
* **개발 인원** : 1인
* **개발 기간** : 2024.06 ~ 2024.07
* **사용 기술**
  * **코어 스택** : Typescript, React
  * **상태 관리** : ContextAPI, React Query
  * **스타일링** : Tailwindcss, shadcn/ui
  * **백엔드 서비스** : Firebase
  * **CI/CD** : 
  * **배포** : vercel<br><br>


## 채택한 개발 기술

**상태 관리 : ContextAPI**<br>
* 프로젝트에 복잡한 상태 관리가 필요하지 않음
* 별도의 설치가 필요하지 않고 사용이 간편한 Context API를 사용
* Custom Hook을 생성하여 관리 

<br>

**UI : Shadn UI**

* **직접적인 커스터마이제이션**: 컴포넌트 코드를 직접 프로젝트에 통합함으로써, 라이브러리의 제약에서 벗어나 자유로운 커스터마이징이 가능.
* **의존성 최소화**: 별도의 패키지 설치 없이 필요한 컴포넌트만 선택하여 사용할 수 있어 앱의 크기가 작고 관리가 용이함.
* **빠른 통합과 사용**: npm과 같은 패키지 매니저를 사용하지 않기 때문에, 필요한 컴포넌트를 빠르게 찾아 바로 사용할 수 있음.<br><br>


## 파일 구조
```
📦src
 ┣ 📂assets                 # 이미지, CSS, 폰트 등 정적 파일
 ┣ 📂components             # 재사용 가능한 컴포넌트
 ┣ 📂config                 # 설정 파일
 ┣ 📂context                # React Context API를 사용한 전역 상태 관리 파일
 ┣ 📂features               # 컴포넌트를 기능별로 분류 (특정 기능에 한해서만 재사용)
 ┣ 📂hooks                  # 커스텀 훅 (데이터 페칭, 상태 관리 등)
 ┣ 📂layout                 # 페이지 레이아웃
 ┣ 📂lib                    # 라이브러리 및 유틸리티 함수
 ┣ 📂pages                  # 각 페이지별 컴포넌트 (라우팅)
 ┣ 📂router                 # 라우터 관련 파일
 ┣ 📂services               # 데이터 처리와 비즈니스 로직
 ┣ 📂styles                 # 공통 스타일 파일
 ┣ 📂types                  # type 파일
 ┗ 📜main.tsx
```
<br>

## 주요기능
### 0.증상/종류별 영양제 필터링 
### 0. 내 정보를 기반으로 영양제 추천
### 0. 영양제 구매/조회

### 0.상품 등록/관리와 주문 관리
**관리 페이지** : 관리자(판매자) 권한이 있는 유저는 관리자 페이지에 접근할 수 있습니다. <br>
**상품 목록** : 무한 스크롤을 사용하여 상품 목록을 불러옵니다. <br>
**상품 관리** : 상품을 등록하고 판매 여부에 대한 상태를 일괄 변경할 수 있습니다.  <br>
주문 관리 :

<br>

## 트러블 슈팅
-

<br>

## 기록
* [react-query로 효율적인 데이터 관리하기](https://velog.io/@wisdom-13/react-query로-효율적인-데이터-관리하기)
* [useInfiniteQuery와 react-intersection-observer를 사용하여 무한 스크롤 구현하기](https://velog.io/@wisdom-13/useInfiniteQuery와-react-intersection-observer를-사용하여-무한-스크롤-구현하기)

