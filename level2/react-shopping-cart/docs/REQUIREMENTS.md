# 기능 목록 요구사항

- Header

  - [x] header의 숫자 표시를 통해 장바구니에 담긴 품목의 갯수 표시
  - [x] header의 로고를 눌렀을 때 홈으로 복귀한다.

- [x] recoil을 사용하여 전역 상태 관리
- [x] Mock 데이터를 활용하여 상품 데이터를 처리한다. 협업 미션을 고려하여 장바구니 API 예상 명세 참고
- [x] 적합한 테스트 도구를 선택하여 사용하고, 중요한 테스트 케이스를 정의하여 테스트
- [x] API 요청을 처리하는 공통 함수나 커스텀 훅을 작성하여 재사용 가능하게 만든다.

  - [x] 상품 목록을 조회한다.
  - [x] 장바구니 아이템 목록 조회, 추가, 수량 변경, 삭제

- [x] 페이지간 공통 스타일이 있는 경우 재사용한다.

  - [x] 컨테이너 좌우 간격
  - [x] 색상

- [x] 서버와의 통신을 담당하는 코드와 UI를 렌더링 하는 코드를 분리하여 관심사를 분리한다.
- [x] 에러 처리 로직을 명확하게 작성하여 코드의 가독성을 높인다.
- [x] 불필요한 상태 관리를 최소화하고, 상태 업데이트를 최적화한다.
- [x] 컴포넌트의 리렌더링을 최소화하기 위해 memoization을 적용한다.

- [x] 상품 목록을 보여준다.
- [x] 상품의 장바구니 담긴 갯수를 조절할 수 있다.

  - [x] 상품의 장바구니 허용 갯수는 1 ~ 100개이다.
  - [x] 장바구니 아이콘을 누르면 갯수 입력창이 렌더된다. 그리고 상품 갯수는 1이 기본값이다.
