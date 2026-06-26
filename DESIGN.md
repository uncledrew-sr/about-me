# DESIGN.md
Apple 디자인 시스템을 기반으로 한 개인 소개 웹사이트 디자인 스펙.
원본 Apple 디자인 언어를 충실히 따르되, 포트폴리오 컨텍스트에 맞게 조정.

---

## 컬러 시스템

### Brand & Accent
- **Action Blue** `#0066cc` — 모든 링크, CTA 버튼, 인터랙티브 요소의 단일 액센트 컬러
- **Focus Blue** `#0071e3` — 키보드 포커스 링
- **Sky Link Blue** `#2997ff` — 다크 타일 위 링크 전용

### Surface
- **Pure White** `#ffffff` — 메인 캔버스
- **Parchment** `#f5f5f7` — 섹션 교차용 오프화이트, 푸터 배경
- **Near-Black Tile** `#1d1d1f` — 다크 섹션 (Apple의 `#272729`보다 약간 밝게 — 텍스트 가독성 강조)
- **Pure Black** `#000000` — 글로벌 네비게이션 바

### Text
- **Ink** `#1d1d1f` — 라이트 서피스의 모든 텍스트
- **On Dark** `#ffffff` — 다크 타일 텍스트
- **Muted** `#6e6e73` — 서브 카피, 캡션
- **Muted On Dark** `#a1a1a6` — 다크 타일 서브 카피

### Hairlines
- **Divider** `#d2d2d7` — 구분선, 카드 테두리
- **Soft** `rgba(0,0,0,0.08)` — 소프트 카드 테두리

---

## 타이포그래피

시스템 폰트 스택: `SF Pro Display, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`
비 Apple 환경 대체: **Pretendard** (한국어 지원 최적화, Google Fonts 대체 없을 시 `system-ui`)

### 타입 스케일

| 역할 | 크기 | 굵기 | 행간 | 자간 | 용도 |
|---|---|---|---|---|---|
| Hero Display | 56px | 600 | 1.07 | -0.28px | 히어로 이름 헤드라인 |
| Display LG | 40px | 600 | 1.10 | 0 | 섹션 타이틀 |
| Display MD | 34px | 600 | 1.20 | -0.374px | 서브 섹션 헤드 |
| Lead | 28px | 400 | 1.14 | 0 | 히어로 서브카피 |
| Tagline | 21px | 600 | 1.19 | 0.231px | 섹션 라벨, 네브 카테고리 |
| Body | 17px | 400 | 1.47 | -0.374px | 기본 본문 |
| Body Strong | 17px | 600 | 1.47 | -0.374px | 강조 인라인 |
| Caption | 14px | 400 | 1.43 | -0.224px | 캡션, 버튼 레이블 |
| Nav Link | 12px | 400 | 1.0 | -0.12px | 글로벌 네비 링크 |
| Fine Print | 12px | 400 | 1.3 | -0.12px | 푸터 법적 문구 |

### 원칙
- 헤드라인은 항상 **weight 600**, 네거티브 자간으로 "Apple tight" 느낌 구현
- 본문은 **17px / 400** — 16px 아님
- Weight ladder: 300 / 400 / 600 — **500 없음**
- 한국어 혼용 시 Pretendard 우선, 영문 혼용 자연스럽게 처리

---

## 레이아웃

### 스페이싱 토큰
| 토큰 | 값 |
|---|---|
| `--space-xxs` | 4px |
| `--space-xs` | 8px |
| `--space-sm` | 12px |
| `--space-md` | 17px |
| `--space-lg` | 24px |
| `--space-xl` | 32px |
| `--space-xxl` | 48px |
| `--space-section` | 80px |

### 그리드 & 컨테이너
- **Max width**: 980px (텍스트 섹션), 1440px (풀블리드 타일)
- **Section padding**: 상하 80px (모바일 48px)
- **Card gap**: 20–24px

### 섹션 구조 (페이지 위에서 아래)
```
[Global Nav]          — black bar, 44px
[Hero Tile]           — white, 이름 + 전공 + CTA
[About Tile]          — parchment, 한 줄 소개 + 관심사
[Skills Tile]         — near-black (dark), 기술 스택 카드
[Interests Tile]      — white, 취미/라이프스타일
[Contact Tile]        — parchment, GitHub + npx 명령어
[Footer]              — parchment, 미니멀
```

---

## 엘리베이션 & 깊이

| 레벨 | 처리 방식 | 사용처 |
|---|---|---|
| Flat | 그림자 없음 | 풀블리드 타일, 네비게이션, 푸터 |
| Soft hairline | `1px rgba(0,0,0,0.08)` | 스킬/기술 카드 |
| Card shadow | `0 2px 16px rgba(0,0,0,0.08)` | Hover 상태 카드 |
| Nav backdrop | `backdrop-filter: blur(20px) saturate(180%)` | 스크롤 시 네비 |

**원칙**: 그림자는 카드 hover에만 사용, 기본 상태는 flat.

---

## 보더 레디우스

| 토큰 | 값 | 용도 |
|---|---|---|
| `--rounded-none` | 0 | 풀블리드 타일 |
| `--rounded-sm` | 8px | 유틸리티 버튼 |
| `--rounded-md` | 12px | 스킬 카드 |
| `--rounded-lg` | 18px | 큰 콘텐츠 카드 |
| `--rounded-pill` | 9999px | 주 CTA 버튼, 태그 칩 |

---

## 컴포넌트

### Global Nav
- 배경: `#000000`, 높이 44px
- 좌: 이름 또는 이니셜 로고 (12px / 400)
- 우: 섹션 링크 (12px / 400 / -0.12px)
- 스크롤 시: `backdrop-filter: blur(20px)` + parchment 80% opacity로 전환

### 버튼
- **Primary (Pill)**: `#0066cc` 배경, 흰 텍스트, `border-radius: 9999px`, padding `11px 22px`, `font-size: 17px`
- **Secondary (Ghost Pill)**: 투명 배경, `#0066cc` 텍스트 + 테두리, same radius
- **Active state**: `transform: scale(0.95)` — 유일한 마이크로인터랙션
- **Focus state**: `outline: 2px solid #0071e3`

### 스킬 카드 (dark tile 위)
- 배경: `rgba(255,255,255,0.08)`, `border: 1px solid rgba(255,255,255,0.12)`
- `border-radius: 12px`, padding `24px`
- 텍스트: white / muted on dark
- Hover: `background: rgba(255,255,255,0.12)`, subtle scale `1.02`

### 인터레스트 칩 (취미 태그)
- `border-radius: 9999px`, padding `8px 16px`
- 배경: `#f5f5f7`, 텍스트: `#1d1d1f`, border: `1px solid #d2d2d7`
- 아이콘 + 텍스트 인라인

### npx 코드 블록
- 모노스페이스 폰트: `"SF Mono", "Fira Code", monospace`
- 배경: `#1d1d1f`, 텍스트: `#f5f5f7`, `border-radius: 12px`
- 복사 버튼 우측 상단

---

## 애니메이션

- **스크롤 reveal**: `opacity 0→1`, `translateY 20px→0`, `duration 0.6s`, `ease-out`
- `@media (prefers-reduced-motion: reduce)`: 모든 애니메이션 비활성화
- 과도한 애니메이션 금지 — Apple 기준으로 절제

---

## 반응형

| 브레이크포인트 | 변화 |
|---|---|
| ≤ 640px | 단일 컬럼, 히어로 56px→34px, 네비 축약 |
| 641–834px | 네비 햄버거, 섹션 padding 48px |
| 835–1068px | 풀 레이아웃, 일부 그리드 2열 |
| ≥ 1069px | 풀 레이아웃, max-width 980px 적용 |

---

## Do's & Don'ts

### Do
- 모든 인터랙티브 요소에 `#0066cc` (Action Blue) 단일 사용
- 헤드라인 네거티브 자간 (-0.28~-0.374px)
- 섹션 구분은 배경색 교차로만 — 구분선 없음
- 버튼 active에 `scale(0.95)` 통일

### Don't
- 그라디언트 배경 사용 금지
- 카드/버튼에 그림자 사용 금지 (hover 제외)
- `font-weight: 500` 사용 금지
- 두 번째 액센트 컬러 도입 금지
- 풀블리드 타일에 border-radius 사용 금지