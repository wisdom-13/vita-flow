
![스크린샷 2024-07-10 오전 12 13 59](https://github.com/wisdom-13/vita-flow/assets/77341912/afffbbdb-2ef7-4966-a516-2cd953d2b6bc)

**📖 Docs** : [https://s-organization-333.gitbook.io/vita-flow](https://s-organization-333.gitbook.io/vita-flow) <br><br>
**🖥️ 데모 페이지** : [https://vita-flow.vercel.app/](https://vita-flow.vercel.app/)<br>
**🔑 로그인 정보** : [admin@gmail.com](mailto:admin@gmail.com) / admin1234!

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
    - **폼 검증** : react-hook-form, zod
    - **디자인/설계** : Figma
    - **백엔드 서비스** : Firebase
    - **배포** : vercel

<br>

## 🖥️  화면 기획

- **와이어프레임** : [Figma 바로가기](https://www.figma.com/design/5n55QUdSErwHKX7kazLVyY/VITAFLOW?node-id=0-1&t=xIDhtygbxxpFGaeY-1)
- **유저플로우** : [Figma 바로가기](https://www.figma.com/design/5n55QUdSErwHKX7kazLVyY/VITAFLOW?node-id=19-170&t=2o6FZEvoFU4EQUR2-1)
    
<br>

## 🔧 채택한 개발 기술

**프론트엔드 라이브러리: React**

- **재사용 가능한 컴포넌트** : 컴포넌트를 쉽게 만들고 재사용할 수 있음.
- **선언적 코드** : `선언적 접근 방식`으로 UI 상태에 따라 뷰를 자동으로 업데이트하여, 코드를 직관적으로 작성할 수 있음.
- **풍부한 생태계와 커뮤니티** : 다양한 서드파티 라이브러리와 도구들을 쉽게 통합할 수 있음, `대규모 커뮤니티`가 있으며, 꾸준히 발전하는 최신 기술을 적용할 수 있음.
- `Next.js`는 `SSR`과 `SSG`를 지원하지만, 구현하고자하는 기능이 `CSR`에 초점을 맞추고 있어 Next.js의 기능이 필요하지 않기 때문에 프로젝트 복잡도를 줄이고 개발 속도를 높일 수 있도록 `React`만 사용.

<br>

**상태 관리 : ContextAPI**

- **단순함과 경량성 :** 추가 라이브러리를 설치하고 관리할 필요가 없어 프로젝트를 경량화할 수 있음.
- **필요 충분한 기능** : 프로젝트의 범위에서는 `Context API`가 제공하는 기능이 충분하기 때문에 복잡한 상태 관리 라이브러리가 필요하지 않음.
- **손쉬운 통합** : `React Hook`과 원활하게 통합되어 일관된 상태 관리와 컴포넌트 로직을 유지할 수 있음.

<br>

**상태 관리 : TanStack query**

- **데이터 페칭 및 캐싱의 간편화** : 서버 상태를 관리하고, `데이터를 페칭 및 캐싱`하는 과정을 단순화하여 효율적으로 관리할 수 있음.
- **자동 리프레시 및 동기화** : 데이터가 변경되었을 때 자동으로 `리프레시`하여 최신 상태를 유지할 수 있음.
- **비동기 상태 관리** : 로딩, 에러, 성공 `상태를 관리`할 수 있음.
- [react-query로 효율적인 데이터 관리하기](https://velog.io/@wisdom-13/react-query%EB%A1%9C-%ED%9A%A8%EC%9C%A8%EC%A0%81%EC%9D%B8-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EA%B4%80%EB%A6%AC%ED%95%98%EA%B8%B0)

<br>

**스타일링 : Shadn UI**

- **직접적인 커스터마이제이션** : 컴포넌트 코드를 직접 프로젝트에 통합함으로써, 라이브러리의 제약에서 벗어나 `자유로운 커스터마이징`이 가능.
- **의존성 최소화** : 별도의 패키지 설치 없이 `필요한 컴포넌트만 선택`하여 사용할 수 있어 앱의 크기가 작고 관리가 용이함.
- **빠른 통합과 사용** : npm과 같은 패키지 매니저를 사용하지 않기 때문에, 필요한 컴포넌트를 빠르게 찾아 바로 사용할 수 있음.

<br>

## 📂 파일 구조

```
📦src
 ┣ 📂assets                 # 이미지, CSS, 폰트 등 정적 파일
 ┣ 📂components             # 재사용 가능한 컴포넌트
 ┣ 📂config                 
 ┃ ┗ 📜firebase.ts.         # firebase 설정 
 ┣ 📂context                # React Context API를 사용한 전역 상태 관리 파일
 ┣ 📂hooks                  # 커스텀 훅 (데이터 페칭, 상태 관리 등)
 ┣ 📂layout                 # 페이지 레이아웃
 ┣ 📂lib                    # 라이브러리 및 유틸리티 함수
 ┣ 📂pages                  # 각 페이지별 컴포넌트 (라우팅)
 ┃ ┣ 📂Admin
 ┃ ┣ 📂Auth
 ┃ ┣ 📂Main
 ┃ ┣ 📂Orders
 ┃ ┣ 📂Shared
 ┣ 📂router                
 ┃ ┣ 📜ProtectedRoute.tsx   # 인증 상태에 따라 컴포넌트의 접근 제한
 ┃ ┗ 📜routes.tsx           # 라우터 설정 파일
 ┣ 📂services               # 데이터 처리와 비즈니스 로직
 ┣ 📂styles                 # 공통 스타일 파일
 ┗ 📂types                  # type 파일

```

<br>


## **🌟**  기능 소개 및 화면 프리뷰


### 1. 증상/종류별 영양제 조회

###

<img src="https://github.com/user-attachments/assets/d262de0b-da66-4011-b4be-a6b2c068055d" width="400" style="border-radius: 0.5rem; border: 1px solid #eee" />

###

- **상품 목록** <br>
react-query의 `useInfiniteQuery`와 `react-intersection-observer`를 사용해 <br>
`무한 스크롤`을 구현하여 상품 목록을 불러왔습니다.<br><br>
- **상품 필터링** <br>
`카테고리별`로 조회할 수 있고 `등록순, 가격순, 판매량 순`으로 리스트를 정렬할 수 있도록 하였으며, <br>
`useMemo`를 사용하여 필터링 된 값을 메모할 수 있도록 하여 불필요한 계산을 감소시켰습니다.<br><br>
- **장바구니** <br>
빠른 접근 속도와 간단한 구현이 가능하고, 비회원도 장바구니 기능을 사용할 수 있도록<br>
`로컬스토리지`를 사용하여 상품을 장바구니에 저장할 수 있도록 구현하였습니다.<br>

<br>

### 2. 영양제 구매/조회

###

<img src="https://github.com/user-attachments/assets/c15900e6-6418-4184-a7d4-f424fdb7b6a7" width="800" style="border-radius: 0.5rem; border: 1px solid #eee" />

###

- **구매** <br>
상품을 바로 구매하거나, 장바구니에 담긴 상품을 구매할 수 있으며,<br>
장바구니에서 현재 상품의 재고를 계산하여 품절된 상품은 구매할 수 없도록 처리하였습니다.<br><br>
- **결제** <br>
`tosspayments` 결제 모듈을 사용하여 결제를 진행할 수 있습니다.<br>
결제하기 전 상품의 재고를 미리 차감하고, 사용자가 결제를 취소하거나 페이지를 벗어날 경우 재고 복구 로직을 실행합니다.<br>
결제가 완료되면 `useMutation`를 사용하여 캐시된 데이터를 업데이트합니다.<br>
- **주문 내역** <br>
주문 내역을 확인하거나 주문을 취소할 수 있습니다.<br>

<br>

### 3. 상품 등록/관리와 주문 관리

###

<img src="https://github.com/user-attachments/assets/1ea4509d-5267-4df8-b79e-54771483ce53" width="800" style="border-radius: 0.5rem; border: 1px solid #eee" />

###

- **관리 페이지**<br>
`ProtectedRoute`를 통해 사용자 권한에 따라 경로를 보호하여 관리자(판매자) 권한이 있는 유저만 관리자 페이지에 접근할 수도록 구현했습니다.<br><br>
- **상품 목록/관리**<br>
`무한 스크롤`을 사용하여 상품 목록을 불러오며, 선택 상품에 대해 상태를 일괄적으로 변경할 수 있습니다.<br>
리스트 선택 로직을 `custom hook`으로 작성하여 재사용에 용이하도록 분리하였고, `useCallback`을 사용하여 최적화하였습니다. <br><br>
- **상품 등록**<br>
상품 등록 시 `react-hook-form`과 `zod`를 사용하여 폼을 검증하였으며,<br>
`browser-image-compression` 라이브러리를 사용하여 이미지를 리사이징하고 WebP형식으로 변환하였습니다.<br><br>
- **주문 관리**<br>
결제가 이루어진 주문 건에 대한 목록을 확인하고 상태를 변경할 수 있습니다.<br><br>

<br>

## **📈 성능 최적화 및 트러블슈팅**

**기술적 경험**
- `custom-hook`을 사용해 관심사의 분리 원칙을 적용하여 로직을 `구조화`하였습니다. [자세히보기](https://s-organization-333.gitbook.io/vita-flow/refactoring/custom-hook)
- `React-hook-form`과 `Zod`를 함께 사용하여 폼의 `타입 안정성`을 강화하였습니다. [자세히보기](https://s-organization-333.gitbook.io/vita-flow/refactoring/zod)

<br>

**성능 최적화**
- `TanStack Query`를 사용하여 데이터의 `페칭과 캐싱`을 관리하였습니다. 
- `Lazy Loading`과 `PreFething`을 적용하여 초기 로딩 시간을 `25%` 가량 단축하였습니다.  [자세히보기](https://s-organization-333.gitbook.io/vita-flow/optimization/prefethcing-lazyloading)
- 이미지 업로드 시 `WebP` 형식으로의 변환과 `리사이징`을 통해 이미지 용량을 `80%` 이상 감소시켰습니다. [자세히보기](https://s-organization-333.gitbook.io/vita-flow/optimization/image)
- `react-helmet`을 사용하여 `SEO` 최적화를 진행하였습니다. [자세히보기](https://s-organization-333.gitbook.io/vita-flow/optimization/seo)

<br>

**트러블슈팅**
- **useEffect 사용 시 무한루프가 발생하는 문제** : `useMemo`를 사용하여 렌더링 중에 상태의 참조 값이 변경되지 않도록 하여 문제를 해결하였습니다. [자세히보기](https://s-organization-333.gitbook.io/vita-flow/troubleshooting/useeffect)
- **firebase에서 배열의 멀티 조회가 안되는 문제** : or 조건으로 데이터를 호출한 뒤 필터링하여 사용자에게 보여주도록 처리하였습니다. [자세히보기](https://s-organization-333.gitbook.io/vita-flow/troubleshooting/firebase-and)


<br>

## **🔖 프로젝트 돌아보기**

**느낀 점**
- **협업의 중요성** : `코드 및 커밋 컨벤션`을 정하고 지키는 것이 협업에서 얼마나 중요한지 깨달을 수 있었습니다.
- **구조화의 필요성** : `단일 책임 원칙`과 `관심사 분리 원칙`을 적용해 커스텀 훅으로 구조화함으로써 코드의 가독성과 유지 보수성이 크게 향상됨을 경험했습니다.
- **문서화의 필요성** : 프로젝트 경험을 글로 정리하면서, 학습한 내용을 체계적으로 표현하고 기록하는 능력이 향상되었고, 문서화의 필요성을 느낄 수 있었습니다.

<br>

**배운 점**
- **성능 최적화 기법** : `WebP`, `PreFethcing`과 `LazyLoading` 등의 기법을 통해 사이트를 최적화하고 성능을 향상시킬 수 있는 방법을 학습하고 적용할 수 있었습니다.
- **React Query 활용** : `react-query`의 사용법에 대해 깊이 있는 학습을 하였으며, 데이터 페칭 및 상태 관리에 대한 이해도를 향상시킬 수 있었습니다.
- **최적화 함수 사용** : `useMemo`, `useCallback과` 같은 최적화 hook을 적절히 사용하는 법을 익힐 수 있었습니다.

<br>

**아쉬운 점**
- 시간 관계상 추가적으로 구현하고자 했던 기능을 모두 구현하지 못한 점이 아쉬움으로 남습니다.
- 초기 세팅 시에 문제가 있어 `ESlint`를 적용하지 못하였는데, 이후에는 프로젝트의 시작부터 ESlint를 적용하여 효과적인 개발 환경을 구축하고 싶습니다. 
