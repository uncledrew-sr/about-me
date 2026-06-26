# 최범규

> **Beom-Gyu Choi**의 개인 소개 웹사이트.

🔗 **npx로 바로 만나보기**

```bash
npx npx-beom-gyu-choi
```

---

## 소개

제주대학교 컴퓨터공학과 4학년 최범규의 개인 소개 웹사이트입니다.  
Agentic AI 기반 풀스택 개발과 멀티모달 AI 에이전트 연구에 집중하고 있습니다.

---

## 기술 스택

| 영역 | 기술 |
|---|---|
| **Language** | HTML5, CSS3, Vanilla JavaScript |
| **Font** | [Pretendard](https://github.com/orioncactus/pretendard) (CDN) |
| **빌드 도구** | 없음 (Zero dependency) |

외부 라이브러리·프레임워크·빌드 툴 없이 순수 웹 표준만으로 제작되었습니다.

---

## 파일 구조

```
about-me/
├── index.html   # HTML 구조 — 6개 섹션
├── style.css    # CSS — 디자인 토큰, 반응형, 애니메이션
├── main.js      # JavaScript — 인터랙션 전체
├── DESIGN.md    # 디자인 시스템 스펙
└── CLAUDE.md    # 기술 규칙 & 빌드 가이드
```

---

## 섹션 구성

| # | 섹션 | 배경 | 내용 |
|---|---|---|---|
| 1 | **Hero** | `#ffffff` | 이름 헤드라인, 소속, CTA 버튼 |
| 2 | **About** | `#f5f5f7` | 전문 분야 소개 |
| 3 | **Skills** | `#1d1d1f` | 카테고리별 기술 스택 카드 |
| 4 | **Interests** | `#ffffff` | 취미 pill 칩 |
| 5 | **Contact** | `#f5f5f7` | GitHub 링크 + npx 코드 블록 |
| 6 | **Footer** | `#f5f5f7` | 저작권 표시 |

---

## 기능

- **스크롤 reveal** — Intersection Observer API로 섹션·카드·칩 부드럽게 등장
- **네비게이션 전환** — 스크롤 200px 이상 시 블랙 → frosted glass로 자동 전환
- **npx 복사 버튼** — Clipboard API, 클릭 시 "복사됨 ✓" 1.5초 피드백
- **스무스 스크롤** — 앵커 링크 클릭 시 `scrollIntoView({ behavior: 'smooth' })`
- **모바일 햄버거 메뉴** — 640px 이하에서 자동 전환
- **접근성** — 시맨틱 HTML, `aria-label`, 키보드 포커스 링, `prefers-reduced-motion` 지원

---

## 로컬 실행

별도 설치 없이 정적 파일 서버로 바로 실행할 수 있습니다.

```bash
# Python 3
python3 -m http.server 8080

# Node.js (npx)
npx serve .
```

브라우저에서 `http://localhost:8080` 접속.

---

## 반응형 브레이크포인트

| 뷰포트 | 히어로 이름 | 섹션 padding | 스킬 그리드 |
|---|---|---|---|
| ≤ 640px | 34px | 48px | 1열 |
| 641–834px | 40px | 64px | 2열 |
| ≥ 835px | 56px | 80px | 2–3열 |

---

## 링크

- **GitHub** — [github.com/uncledrew-sr](https://github.com/uncledrew-sr)
- **npx** — `npx npx-beom-gyu-choi`

---

© 2025 Beom-Gyu Choi