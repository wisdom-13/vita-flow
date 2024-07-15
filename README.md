
![스크린샷 2024-07-10 오전 12 13 59](https://github.com/wisdom-13/vita-flow/assets/77341912/afffbbdb-2ef7-4966-a516-2cd953d2b6bc)


**데모 페이지** : [https://vita-flow.vercel.app/](https://vita-flow.vercel.app/)<br>
**로그인 정보** : [admin@gmail.com](mailto:admin@gmail.com) / admin1234!

<br>

## 💊 프로젝트 소개

종류별 증상별 추천 영양제에 대한 정보를 제공하고 구매할 수 있는 서비스입니다.

**주요기능**
1. 증상/종류별 영양제 조회
2. 영양제 구매/조회
3. 상품 등록/관리와 주문 관리

<br>

## ⚙️ 개발 환경


- **개발 인원** : 1인
- **개발 기간** : 2024.06 ~ 2024.07 (3주)
- **사용 기술**
    - **코어 스택** : Typescript, React
    - **상태 관리** : ContextAPI, React Query
    - **스타일링** : Tailwindcss, shadcn/ui
    - **디자인/설계** : Figma
    - **백엔드 서비스** : Firebase
    - **배포** : vercel

<br>

## 🖥️  화면 기획


- **와이어프레임** : [Figma 바로가기](https://www.figma.com/design/5n55QUdSErwHKX7kazLVyY/VITAFLOW?node-id=0-1&t=xIDhtygbxxpFGaeY-1)
- **유저플로우** : [Figma 바로가기](https://www.figma.com/design/5n55QUdSErwHKX7kazLVyY/VITAFLOW?node-id=19-170&t=2o6FZEvoFU4EQUR2-1)
    
<br>

## 🔧 채택한 개발 기술

**상태 관리 : ContextAPI**

- **단순함과 경량성 :** 추가 라이브러리를 설치하고 관리할 필요가 없어 프로젝트를 경량화할 수 있음.
- **필요 충분한 기능** : 프로젝트의 범위에서는 Context API가 제공하는 기능이 충분하기 때문에 복잡한 상태 관리 라이브러리가 필요하지 않음.
- **손쉬운 통합** : React Hook과 원활하게 통합되어 일관된 상태 관리와 컴포넌트 로직을 유지할 수 있음.

<br>

**상태 관리 : TanStack query**

- **데이터 페칭 및 캐싱의 간편화** : 서버 상태를 관리하고, 데이터를 페칭 및 캐싱하는 과정을 단순화하여 효율적으로 관리할 수 있음.
- **자동 리프레시 및 동기화** : 데이터가 변경되었을 때 자동으로 리프레시하여 최신 상태를 유지할 수 있음.
- **비동기 상태 관리** : 로딩, 에러, 성공 상태를 관리할 수 있음.
- [react-query로 효율적인 데이터 관리하기](https://velog.io/@wisdom-13/react-query%EB%A1%9C-%ED%9A%A8%EC%9C%A8%EC%A0%81%EC%9D%B8-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EA%B4%80%EB%A6%AC%ED%95%98%EA%B8%B0)

<br>

**스타일링 : Shadn UI**

- **직접적인 커스터마이제이션** : 컴포넌트 코드를 직접 프로젝트에 통합함으로써, 라이브러리의 제약에서 벗어나 자유로운 커스터마이징이 가능.
- **의존성 최소화** : 별도의 패키지 설치 없이 필요한 컴포넌트만 선택하여 사용할 수 있어 앱의 크기가 작고 관리가 용이함.
- **빠른 통합과 사용** : npm과 같은 패키지 매니저를 사용하지 않기 때문에, 필요한 컴포넌트를 빠르게 찾아 바로 사용할 수 있음.

<br>

## 📂 파일 구조

```
📦src
 ┣ 📂assets                 # 이미지, CSS, 폰트 등 정적 파일
 ┣ 📂components             # 재사용 가능한 컴포넌트
 ┣ 📂config                 # 설정 파일
 ┣ 📂context                # React Context API를 사용한 전역 상태 관리 파일
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


## **🌟**  기능 소개 및 화면 프리뷰


### 1. 증상/종류별 영양제 조회

- 상품 목록 : 무한 스크롤을 사용하여 상품 목록을 불러옵니다.
- 상품 필터링 : 카테고리별로 조회할 수 있고 등록순, 가격순, 판매량 순으로 리스트를 정렬할 수 있습니다.
- 장바구니 : 로컬스토리지를 사용하여 상품을 장바구니에 저장할 수 있습니다.


### 2. 영양제 구매/조회

- **구매** : 상품을 바로 구매하거나, 장바구니에 담긴 상품을 구매할 수 있으며, 품절된 상품은 구매할 수 없습니다.
- **결제** : tosspayments 결제 모듈을 사용하여 결제를 진행할 수 있습니다.
- **재고** : 결제하기 전 상품의 재고를 미리 차감하고, 결제가 중단될 경우 다시 재고를 복구합니다.
- **주문 내역** : 주문 내역을 확인하거나 주문을 취소할 수 있습니다.


### 3. 상품 등록/관리와 주문 관리

- **관리 페이지** : 관리자(판매자) 권한이 있는 유저는 관리자 페이지에 접근할 수 있습니다.
- **상품 목록** : 무한 스크롤을 사용하여 상품 목록을 불러옵니다.
- **상품 관리** : 상품을 등록하고 판매 여부에 대한 상태를 일괄 변경할 수 있습니다.
- **주문 관리** : 결제가 이루어진 주문 건에 대한 목록을 확인하고 상태를 변경할 수 있습니다.

<br>

## **📈 성능 최적화 및 트러블슈팅**

### **성능 최적화**

- TanStack Query를 사용하여 데이터의 페칭과 캐싱을 관리하였습니다. [자세히보기](https://www.notion.so/TanStack-query-d9ceefa5e12846238440dbde8f8d2ed4?pvs=21)
- Lazy Loading과 PreFething을 적용하여 초기 로딩 시간을 단축하였습니다. [자세히보기](https://www.notion.so/PreFethcing-LazyLoading-c3aa262e7c914a9387437e60c8affa8d?pvs=21)
- react-helmet을 사용하여 SEO 최적화를 진행하였습니다. [자세히보기](https://www.notion.so/SEO-bf214e0118b94f2a8fb4aff5601dd988?pvs=21)
- 이미지 업로드 시 WebP 형식으로의 변환과 리사이징을 통해 이미지 용량을 감소시켰습니다. [자세히보기](https://www.notion.so/5ec185b2cdc545f6af1242e3fb8f9d55?pvs=21)


### **트러블슈팅**

- **firebase에서 배열의 멀티 조회가 안되는 문제** : or 조건으로 데이터를 호출한 뒤 필터링하여 사용자에게 보여주도록 처리하였습니다. [자세히보기](https://www.notion.so/firebase-79c79880e16745fd8c5c40cc7aff3c31?pvs=21)
- **useEffect 사용 시 무한루프가 발생하는 문제** : useMemo를 사용하여 렌더링 중에 상태의 참조 값이 변경되지 않도록 하여 문제를 해결하였습니다. [자세히보기](https://www.notion.so/useEffect-25d2be4a06fa4bacbfebca91778dbd27?pvs=21)
