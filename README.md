# SF2 글로벌 사전예약 페이지 — Vue 2 / HTML5 버전 (sf2_glb_register_vue2)

스페셜포스2 S.K.I.L.L. 글로벌 사전예약(Operation-RE:FORCE) 퍼블리싱본입니다.
Next.js 버전(`sf2_glb_register`)을 **HTML5 + CSS3 + Vue 2.7 + 바닐라 JavaScript(빌드 없음)** 로 변환했습니다.
화면·문구·동작은 Next 버전과 같습니다.

기획 원본: FigJam `SF2` › `사전 예약 페이지` (12:181) — 글로벌 와이어프레임 154:118

## 실행

`index.html`을 브라우저로 열면 됩니다 (더블클릭 / `file://` 가능). 빌드, `npm install`, 로컬 서버 모두 필요 없습니다.

```bash
open index.html
```

서체(Noto Sans KR, Oswald)는 Google Fonts에서 불러오므로 인터넷 연결이 필요합니다.

Mock 상태 확인: 주소 뒤에 `?mock=` 을 붙이세요.

- `?mock=guest` (기본): 미로그인 → 로그인 안내 팝업
- `?mock=member`: 로그인·미등록 → 등록 완료 팝업 (같은 화면에서 다시 누르면 이미 등록 팝업)
- `?mock=registered`: 로그인·등록 완료 → 이미 등록 팝업

## 구조

```
index.html                 페이지 마크업 (#app) + 스크립트 로드 순서
css/
  base.css                 리셋·기본 + .is-fill(이미지 꽉 채우기) + [v-cloak]
  prereg.css               페이지·팝업 스타일
js/
  vendor/vue.min.js        Vue 2.7.16 운영용 압축 빌드 (템플릿 런타임 컴파일 포함)
  config.js                SF2Config(기간·로그인 URL·외부 링크) / SF2Alerts(팝업 문구) / SF2Rewards(보상)
  api.js                   SF2Api — getSession / registerPrereg (현재 Mock, Promise 반환)
  components/
    modal.js               Sf2Modal (레이어 팝업 공통: 스크롤 잠금·포커스·ESC)
    popups.js              Sf2AlertPopup / Sf2RewardPopup / Sf2EventDetailPopup
    prereg.js              Sf2TopIcons / Sf2TitleLogotype / Sf2RewardColumn / Sf2EventPanel / Sf2Footer
  app.js                   루트 Vue 인스턴스 — 팝업 상태·[REGISTER] 로직
images/                    main(배경·캐릭터·로고·보상), reward, icons, footer
```

CSS는 SCSS 등 전처리기 없는 순수 CSS3입니다. 파일을 바로 수정하면 됩니다.

스크립트는 `index.html`에 적힌 순서대로 로드해야 합니다 (vue → config → api → components → app).
JS는 ES5 문법 + Promise로 작성했습니다 (화살표 함수·async 없음).

### CSS 클래스 이름

원본은 CSS Modules라 컴포넌트마다 클래스 이름이 겹쳤습니다(`.title` 등). 변환하면서 컴포넌트별 접두사를 붙였습니다.

| 접두사 | 컴포넌트                             |
| ------ | ------------------------------------ |
| `pp-`  | 페이지 레이아웃 (index.html)         |
| `tl-`  | 타이틀 (Sf2TitleLogotype)            |
| `rw-`  | 보상 영역 (Sf2RewardColumn)          |
| `ev-`  | 이벤트 요약·REGISTER (Sf2EventPanel) |
| `ti-`  | 상단 아이콘 (Sf2TopIcons)            |
| `ft-`  | 푸터 (Sf2Footer)                     |
| `md-`  | 팝업 공통 (Sf2Modal)                 |
| `pu-`  | 팝업 내용 (popups.js)                |

반응형 기준: 1023px 이하 MO (`@media (max-width: 1023px)`).

## 이미지 최적화

화면 표시 크기의 2배를 기준으로 줄이고 WebP로 바꿨습니다. 이미지 합계 4.2MB → 0.7MB.

| 파일                             | 크기                      | 용량                |
| -------------------------------- | ------------------------- | ------------------- |
| main/char_hero.webp              | 1600×1864 (PC 800px 표시) | 2.4MB → 229KB       |
| main/bg.webp                     | 1672×941                  | 552KB → 255KB       |
| main/logo_skill.webp             | 940×244 (PC 460px)        | 596KB → 51KB        |
| main/logo_operation_reforce.webp | 960×120 (PC 480px)        | 41KB (금색 빛 버전) |
| main/reward_main.webp            | 700×700 (PC 332px)        | 144KB → 60KB        |
| reward/*.webp (10종)             | 144×144                   | 201KB → 60KB        |

푸터 로고·아이콘(PNG·SVG)은 작아서 그대로 두었습니다. Vue도 개발용(434KB) 대신 운영용 압축 빌드(105KB)를 씁니다.

## [REGISTER] 동작 (FigJam 팝업 3종)

휴대폰 인증·약관 동의 없이, 로그인 상태에서 [REGISTER] 1회 클릭으로 등록됩니다.

| 상태                | 팝업 문구                                                                       | [OK] 후                 |
| ------------------- | ------------------------------------------------------------------------------- | ----------------------- |
| 로그인 안 한 상태   | Please log-in with your existing Papaya Play ID                                 | 웹 로그인 페이지로 이동 |
| 로그인 후 등록 성공 | Thank you for Pre-Register. Your rewards will be injected on December Update!!! | 현 페이지 잔류          |
| 이미 등록한 경우    | You have already registered. Operation-RE:FORCE is Coming Soon!!                | 현 페이지 잔류          |

- 로그인 안내 팝업은 [OK]만 로그인 페이지로 이동합니다. [X]·ESC는 닫기만 합니다.
- 로그인 페이지 URL은 `js/config.js`의 `loginUrl`입니다 (**TBD — 현재 `#`이라 이동하지 않음**). 로그인 후 돌아오도록 `returnUrl` 파라미터를 붙입니다.
- API 오류 시 임시 문구 팝업 (`SF2Alerts.serverError`).

## API 연동 (TODO)

`js/api.js`의 두 함수 내부를 실제 API 호출로 교체하세요. 둘 다 Promise를 반환해야 합니다.

- `getSession()` → `{ loggedIn: boolean }`
- `registerPrereg()` → `{ status: 'complete' | 'duplicate' | 'loginRequired' | 'error' }`

## 확인 필요 (TBD)

- `loginUrl`, 상단 아이콘 외부 링크(`externalLinks`)
- 보상 키비주얼: 한국판 이미지를 사용 중입니다. VIP가 들어간 글로벌 키비주얼을 받으면 `images/main/reward_main.webp`를 교체하세요.
- VIP(7D) 아이콘은 FigJam 이미지(142×98) 임시입니다.
- 보상 영문명·기간: Wall Spray Founder(글로벌 이미지 30일 vs 한국 영구), EXP Bonus 100% 포함 여부 — 사업팀 확인 필요.
- FigJam 메모의 "상단·하단 버튼 2곳"은 원스크린이라 버튼 1개로 줄였습니다.
