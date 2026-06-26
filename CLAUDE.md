# Agent 프롬프트

아래 지시를 순서대로 따라 개인 소개 웹사이트를 빌드하라.

---

## 1. 시작 전 필독

빌드를 시작하기 전에 반드시 아래 두 파일을 읽어라. 코드 한 줄도 쓰기 전에 읽어야 한다:

- `DESIGN.md` — 컬러, 타이포그래피, 레이아웃, 컴포넌트 스펙 전체
- `CLAUDE.md` — 기술 규칙, 금지 사항, 빌드 완료 기준

이 두 파일의 내용을 모두 이해한 후에만 구현을 시작하라.

---

## 2. 빌드할 것

개인 소개 웹사이트.
Apple 디자인 시스템 미학을 기반으로, 군더더기 없이 깔끔하고 세련되게 만들어라.

### 결과물 파일
- `index.html`
- `style.css`
- `main.js`

### 기술 제약
- HTML5 + CSS3 + Vanilla JavaScript **만** 사용
- 외부 라이브러리, 프레임워크, 빌드 툴 **없음**
- CDN 폰트 한 개 허용 (Pretendard 권장: `https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css`)

---

## 3. 콘텐츠 명세

다음 정보를 웹사이트에 담아라:

```
이름:     최범규 (Beomgyu Choi)
소속:     제주대학교 컴퓨터공학과 4학년
전문:     Agentic AI 기반 풀스택 개발 & 멀티모달 AI 에이전트 연구
주관심사:     러닝, 농구, 테니스, 모터스포츠
GitHub:   https://github.com/uncledrew-sr
npx: npx npx beom-gyu-choi
```

---

## 4. 섹션 구조 (이 순서 그대로)

### Section 1 — Hero (배경: #ffffff)
- 큰 이름 헤드라인: "최범규" 또는 "Beom-Gyu Choi" (56px, weight 600, letter-spacing -0.28px)
- 소속: 제주대학교 컴퓨터공학과 4학년 (21px, weight 600)
- CTA 버튼 두 개 (pill shape): "GitHub 보기" → github.com/uncledrew-sr, "Contact" → #contact

### Section 2 — About (배경: #f5f5f7)
- 섹션 타이틀: "About" (40px, weight 600)
- 전문 분야를 2–3문장으로 자연스럽게 소개
- Agentic AI, 멀티모달 AI 에이전트, 풀스택 개발 키워드 포함
- 텍스트는 17px / 400 / line-height 1.47

### Section 3 — Skills (배경: #1d1d1f — 다크 타일)
- 섹션 타이틀: "Skills" (40px, weight 600, 흰색)
- 기술을 카테고리별 카드로 나누어 그리드로 표시
- 아래 기술을 포함하여 적절히 카테고리화:
  - AI/ML: PyTorch, Scikit-learn
  - Frontend: React, Vue.js, JavaScript
  - Backend: FastAPI, Python
  - Infra: Docker, Kubernetes, GCP
  - Language: C, C++
- 카드 스타일: rgba(255,255,255,0.08) 배경, border-radius 12px, hover 시 살짝 밝아짐

### Section 4 — Interests (배경: #ffffff)
- 섹션 타이틀: "Interests" (40px, weight 600)
- 취미를 pill 형태의 칩(태그)으로 나열: 🏃 러닝, 🏀 농구, 🎾 테니스, 🏎️ 모터스포츠
- 칩 스타일: border-radius 9999px, #f5f5f7 배경, #d2d2d7 border, 17px

### Section 5 — Contact (배경: #f5f5f7)
- 섹션 타이틀: "Contact" (40px, weight 600)
- GitHub 링크 (아이콘 + 텍스트)
- npx 명령어 코드 블록:
  ```
  npx npx-beom-gyu-choi
  ```
  - 모노스페이스 폰트, 다크 배경(#1d1d1f), 흰 텍스트
  - 우측 상단에 복사 버튼: 클릭 시 클립보드에 복사 후 "복사됨 ✓" 피드백

### Section 6 — Footer (배경: #f5f5f7)
- "© 2025 Beom-Gyu Choi" 한 줄 (12px, #6e6e73)

---

## 5. 네비게이션

- 높이 44px, 배경 #000000 (pure black)
- 좌: "BG" 이니셜 로고 또는 "최범규" (12px, 흰색)
- 우: About · Skills · Contact 앵커 링크 (12px, 흰색, 간격 20px)
- 스크롤 200px 이상 시: `backdrop-filter: blur(20px) saturate(180%)` + rgba(245,245,247,0.85) 배경으로 부드럽게 전환, 텍스트도 #1d1d1f로 전환
- 모바일(≤640px): 링크 숨기고 햄버거 토글 또는 하단 고정 네비로 처리

---

## 6. JavaScript 구현 사항

### 스크롤 reveal 애니메이션
- Intersection Observer API 사용
- 모든 섹션, 카드, 칩에 적용
- 효과: opacity 0→1, translateY 20px→0, duration 0.6s, ease-out
- `prefers-reduced-motion: reduce` 미디어 쿼리로 즉시 표시 처리

### npx 복사 버튼
- Clipboard API (`navigator.clipboard.writeText`) 사용
- 성공 시 버튼 텍스트 "복사됨 ✓"로 1.5초간 변경 후 원복
- 실패 시 조용히 무시 (에러 UI 불필요)

### 스무스 스크롤
- 네비 앵커 링크 클릭 시 `scrollIntoView({ behavior: 'smooth' })` 적용

---

## 7. CSS 구현 규칙

### CSS Custom Properties 필수 선언 (`:root` 안에)
```css
:root {
  /* Colors */
  --color-primary: #0066cc;
  --color-primary-focus: #0071e3;
  --color-primary-on-dark: #2997ff;
  --color-ink: #1d1d1f;
  --color-canvas: #ffffff;
  --color-parchment: #f5f5f7;
  --color-tile-dark: #1d1d1f;
  --color-surface-black: #000000;
  --color-muted: #6e6e73;
  --color-muted-on-dark: #a1a1a6;
  --color-divider: #d2d2d7;
  --color-on-dark: #ffffff;

  /* Typography */
  --font-display: "Pretendard", -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: "SF Mono", "Fira Code", "Consolas", monospace;

  /* Spacing */
  --space-xs: 8px;
  --space-sm: 12px;
  --space-md: 17px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-xxl: 48px;
  --space-section: 80px;

  /* Radius */
  --rounded-sm: 8px;
  --rounded-md: 12px;
  --rounded-lg: 18px;
  --rounded-pill: 9999px;
}
```

### 금지 사항 (절대 하지 말 것)
- `font-weight: 500` 사용 금지
- CSS 그라디언트 배경 사용 금지
- 기본 상태 카드/버튼에 `box-shadow` 사용 금지
- `#0066cc` 외 두 번째 액센트 컬러 도입 금지
- 풀블리드 섹션에 `border-radius` 적용 금지
- `!important` 남발 금지

---

## 8. 반응형 브레이크포인트

```css
/* 모바일 퍼스트 */
/* base: ≤640px */
@media (min-width: 641px) { /* 태블릿 */ }
@media (min-width: 835px) { /* 태블릿 가로 */ }
@media (min-width: 1069px) { /* 데스크톱 */ }
```

| 뷰포트 | 히어로 이름 | 섹션 padding | 스킬 그리드 |
|---|---|---|---|
| ≤640px | 34px | 48px | 1열 |
| 641–834px | 40px | 64px | 2열 |
| ≥835px | 56px | 80px | 2–3열 |

---

## 9. 빌드 완료 확인 체크리스트

구현 완료 후 아래 항목을 직접 확인하라:

- [ ] 세 파일(`index.html`, `style.css`, `main.js`) 모두 존재
- [ ] 섹션 6개 순서대로 구현
- [ ] 네비 스크롤 색상 전환 동작
- [ ] 스킬 카드 hover 효과 동작
- [ ] 취미 칩 pill 형태 정상 표시
- [ ] npx 코드 블록 복사 버튼 동작
- [ ] 스크롤 reveal 애니메이션 동작
- [ ] 375px(모바일)에서 레이아웃 깨지지 않음
- [ ] 1280px(데스크톱)에서 max-width 980px 컨텐츠 중앙 정렬
- [ ] 다크 타일(#1d1d1f) ↔ 라이트 타일(#ffffff/#f5f5f7) 교차 구조 유지
- [ ] 모든 버튼 active 상태에 `scale(0.95)` 적용
- [ ] `prefers-reduced-motion` 처리 완료
- [ ] CSS Custom Properties로 모든 디자인 토큰 관리

모든 항목을 통과하면 빌드 완료다.