/* ------------------------------------------------------------------
 * 설정 · 문구 · 보상 데이터 (원본 src/data/config.ts, messages.ts, rewards.ts)
 * FigJam: SF2 › 사전 예약 페이지 (글로벌 와이어프레임 154:118)
 * ------------------------------------------------------------------ */
(function (global) {
  "use strict";

  global.SF2Config = {
    eventPeriod: "November 20, 2026 – until the December update",

    /** 타이틀 아래 기간 바 표기 */
    eventPeriodBar: {
      start: "NOV 20, 2026",
      end: "DECEMBER UPDATE",
    },

    /**
     * 웹 로그인 페이지 — 미로그인 상태에서 [REGISTER] 클릭 → 안내 팝업 [OK] 후 이동
     * URL TBD(개발 확인). 로그인 후 이 페이지로 돌아오도록 returnUrl 을 붙입니다.
     */
    loginUrl: "#",
    loginReturnParam: "returnUrl",

    /** 상단 홈 아이콘 노출 여부 — 글로벌 공식 홈페이지 URL 확정 후 true */
    showHomeLink: false,

    /** 상단 아이콘 외부 링크 — URL TBD */
    externalLinks: {
      home: "#",
      youtube: "#",
      discord: "#",
    },
  };

  /* 알림 팝업 문구 (FigJam: REGISTER 버튼 클릭 시 팝업 3종). 여러 줄은 \n */
  global.SF2Alerts = {
    /** 로그인 안 한 상태 → [OK] 후 웹 로그인 페이지로 이동 */
    loginRequired: {
      title: "Notice",
      message: "Please log-in with your existing Papaya Play ID",
    },
    /** 로그인 후 등록 성공 → 현 페이지 잔류 */
    complete: {
      title: "Pre-Register Complete",
      message:
        "Thank you for Pre-Register.\nYour rewards will be injected on December Update!!!",
    },
    /** 이미 등록한 경우 → 현 페이지 잔류 */
    duplicate: {
      title: "Notice",
      message: "You have already registered.\nOperation-RE:FORCE is Coming Soon!!",
    },
    /** API 오류 (공통) — 기획 미정, 임시 문구 */
    serverError: {
      title: "Notice",
      message: "A temporary error has occurred.\nPlease try again later.",
    },
  };

  /*
   * 글로벌 사전예약 보상 = 한국 사전예약 보상 9종 + VIP(7D)
   * FigJam 메모: "VIP(7D) 권에 강조를 부탁 드립니다." → highlight
   * 영문 아이템명·기간은 FigJam 보상 이미지(pre-Regi_rewards01/02) 표기 기준.
   * EXP Bonus 100% 는 글로벌 보상 이미지에 없음 — 한국 구성 기준으로 포함 (사업팀 확인 필요)
   */
  global.SF2Rewards = {
    items: [
      { name: "VIP (7D)", period: "7 day(s)", amount: "x1", icon: "images/reward/vip_7d.png", highlight: true },
      { name: "Papaya Shirts", period: "Permanent", amount: "x1", icon: "images/reward/papaya_founder_shirt.png" },
      { name: "Eagle Eye", period: "30 day(s)", amount: "x1", icon: "images/reward/eagle_eye.png" },
      { name: "FN F2000 Predator", period: "Permanent", amount: "x1", icon: "images/reward/fn_f2000_predator.png" },
      { name: "FN F2000 Predator Papaya", period: "Permanent", amount: "x1", icon: "images/reward/fn_f2000_predator_papaya.png" },
      { name: "M67 Gravity", period: "Permanent", amount: "x1", icon: "images/reward/m67_gravity.png" },
      { name: "Tomahawk T-Ruler", period: "Permanent", amount: "x1", icon: "images/reward/tomahawk_ruler.png" },
      { name: "EXP Bonus 100%", period: "30 day(s)", amount: "x1", icon: "images/reward/exp_bonus_100p.png" },
      { name: "Quick SP Pay 30P", period: "30 day(s)", amount: "x1", icon: "images/reward/quick_sp_pay_30p.png" },
      { name: "Wall Spray Founder", period: "30 day(s)", amount: "x1", icon: "images/reward/wall_spray_sf2_founder.png" },
    ],
    notes: [
      "※ Rewards will be automatically delivered to your character within 7 days after the December update.",
      "※ Event details and rewards may change due to operational circumstances.",
    ],
  };
})(window);
