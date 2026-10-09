# 🥔 감자 마켓 (Gamza Market)

> **이웃과 함께 나누는 따뜻하고 포슬포슬한 동네 중고거래 웹 서비스**  
> 당근마켓 감성의 포근한 어스 톤(Earth tone) UI와 Supabase 백엔드가 연동된 모던 바닐라 자바스크립트 기반 웹 애플리케이션입니다.

---

## 🌟 주요 기능 (Key Features)

### 1. 🛍️ 상품 목록 및 스마트 탐색 (Home Feed)
- **카테고리 필터링**: 디지털 기기, 가구/인테리어, 의류, 생활가전, 도서/티켓, 기타 등 카테고리별 원클릭 필터링
- **실시간 검색**: 물품명 및 동네 이름(예: 역삼동, 서초동 등) 실시간 검색 및 검색어 즉시 초기화
- **상태 & 정렬 필터**: '거래가능만 보기' 토글 스위치, 최신순 / 낮은 가격순 / 높은 가격순 정렬 지원
- **반응형 카드 그리드**: 데스크톱 및 모바일 화면에 최적화된 반응형 카드 레이아웃과 감자 테마 배지 표시

### 2. 🔍 상품 상세 모달 (Detail View)
- **판매자 정보 및 매너온도**: 온도로 표현되는 신뢰도 게이지 바 및 시그니처 뱃지 표시
- **인터랙션 액션**:
  - ❤️ **찜하기(좋아요)**: 실시간 좋아요 수 증감 및 하트 애니메이션
  - 🔄 **판매 상태 변경**: 판매중 / 예약중 / 거래완료 즉시 변경 및 배지 동기화
  - 🔗 **공유하기**: Web Share API 및 클립보드 링크 복사 지원
  - ✏️ **수정 & 🗑️ 삭제**: 작성자 권한 기반 글 수정/삭제
- **실시간 댓글 & 문의**: 댓글 작성, 목록 조회, 개별 댓글 삭제 기능

### 3. ✍️ 상품 등록 및 수정 모달 (Post Editor)
- **스마트 이미지 업로드**: 이미지 URL 입력 및 로컬 파일 직접 첨부(FileReader 기반 미리보기 지원)
- **샘플 이미지 프리셋**: 테스트를 위한 원클릭 샘플 이미지 자동 입력 버튼 제공
- **금액 입력 도우미**: 천 단위 쉼표 자동 포맷팅 및 '무료 나눔(0원)' 체크박스 연동

### 4. 🔐 사용자 인증 및 프로필 (Supabase Auth)
- **이메일 회원가입 & 로그인**: Supabase Auth 기반 안전한 계정 관리
- **닉네임 중복 검사 및 연동**: 가입 시 닉네임 설정 및 헤더 프로필 뱃지 자동 반영
- **실시간 DB & Realtime 동기화**: Supabase PostgreSQL DB 및 브라우저 간 실시간 변경사항 자동 반영

---

## 🛠️ 기술 스택 (Tech Stack)

| 영역 | 기술 |
| :--- | :--- |
| **Frontend** | HTML5, CSS3 (Modern Flex/Grid, Custom Properties), Vanilla JavaScript (ES6+) |
| **Backend / DB** | [Supabase](https://supabase.com/) (PostgreSQL, Supabase Auth, Realtime) |
| **Icons & Font** | System Native Emoji (🥔, ❤️, 🔍, ✏️ 등), Pretendard / Noto Sans KR |
| **Deployment** | GitHub Pages, Vercel, Netlify 등 정적 호스팅 지원 |

---

## 📁 프로젝트 구조 (Project Structure)

```text
Gamza/
├── index.html           # 메인 서비스 통합 HTML 파일 (배포 진입점)
├── style.css            # 감자 마켓 통합 메인 스타일시트
├── app.js               # 전체 비즈니스 로직 및 Supabase 연동 통합 스크립트
├── .env.example         # Supabase 환경 변수 설정 안내 템플릿
├── .gitignore           # Git 추적 제외 설정 파일
├── README.md            # 프로젝트 소개 및 매뉴얼
│
└── [모듈별 독립 테스트 화면]
    ├── module_list.html # 파트 1/3 모듈 결합 테스트 페이지
    ├── part1_list.*     # [화면 1] 상품 목록 및 필터 독립 컴포넌트
    ├── part2_detail.*   # [화면 2] 상품 상세 모달 독립 컴포넌트
    └── part3_write.*    # [화면 3] 상품 글쓰기 모달 독립 컴포넌트
```

---

## 🚀 로컬 실행 방법 (Getting Started)

별도의 복잡한 빌드 도구 없이 브라우저에서 바로 실행할 수 있습니다.

1. **저장소 복제 (Clone)**
   ```bash
   git clone https://github.com/june0100/gamza.git
   cd gamza
   ```

2. **로컬 웹 서버로 실행**
   - **VS Code**: `Live Server` 확장을 설치한 후 `index.html`에서 우클릭 ➔ `Open with Live Server` 선택
   - **Python 사용 시**:
     ```bash
     python -m http.server 8080
     # 브라우저에서 http://localhost:8080 접속
     ```
   - **Node.js (npx) 사용 시**:
     ```bash
     npx serve .
     ```

---

## 🌐 GitHub Pages 배포 가이드 (Deployment)

본 프로젝트는 순수 정적 웹 애플리케이션으로 **GitHub Pages**를 통해 1분 만에 무료 배포가 가능합니다.

1. GitHub 저장소 상단 탭에서 **Settings** 클릭
2. 좌측 메뉴에서 **Pages** 메뉴 클릭
3. **Build and deployment** 섹션의 Source를 **Deploy from a branch**로 선택
4. Branch를 `main` (또는 `master`) / `/ (root)` 로 지정하고 **Save** 클릭
5. 1~2분 뒤 생성되는 `https://june0100.github.io/gamza/` 주소로 즉시 접속 가능합니다.

---

## 🔒 보안 및 환경 변수 안내

- 브라우저 클라이언트에서 구동되는 특성상 `SUPABASE_ANON_KEY`는 브라우저 공개용 키(공개 가능)이며, Supabase의 **Row Level Security (RLS)** 를 통해 보안이 유지됩니다.
- **주의**: 관리자 권한 키인 `SUPABASE_SERVICE_ROLE_KEY` 및 `SUPABASE_ACCESS_TOKEN`은 절대로 클라이언트 코드나 공개 깃허브 저장소에 업로드되어서는 안 되며, `.gitignore`를 통해 안전하게 보호되고 있습니다.

---

## 📄 라이선스 (License)

이 프로젝트는 오픈 소스이며 교육 및 개인 포트폴리오 목적으로 자유롭게 활용할 수 있습니다.
© 2026 Gamza Market. All rights reserved.
