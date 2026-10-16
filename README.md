# 강민수 포트폴리오

HTML, CSS, JavaScript로 만든 개인 포트폴리오 웹사이트입니다.

**사이트:** https://ggo-ri.github.io/minsukang/

> 현재 전체 구성과 디자인만 잡아 둔 초안 단계입니다. 대괄호(`[ ]`)로 표시된 부분은 내용을 채워 나가는 중입니다.

## 구성

| 섹션 | 내용 |
|---|---|
| Hero | 이름, 직무, 한 줄 소개 |
| 01 About | 강점을 담은 소개, 경력 요약, 일하는 방식 |
| 02 Skills | 분류별 보유 기술 |
| 03 Projects | 프로젝트별 과정 · 기여 · 의사결정 · 결과 |
| 04 Contact | 이메일, GitHub, 전화번호 |

## 주요 기능

- 화면 중앙에 들어온 섹션을 감지해 메뉴와 섹션 라벨 강조 (IntersectionObserver)
- 스크롤 시 콘텐츠가 자연스럽게 나타나는 효과
- 화면 폭에 맞춰 글자 크기와 단 구성이 바뀌는 반응형 레이아웃
- `prefers-reduced-motion` 설정 시 애니메이션 최소화

## 기술 스택

- HTML / CSS / JavaScript
- 폰트: Pretendard, JetBrains Mono
- 배포: GitHub Pages

## 파일 구조

```
index.html   마크업과 내용
style.css    디자인 (색 · 폰트는 CSS 변수로 관리)
script.js    섹션 강조, 스크롤 효과
```

