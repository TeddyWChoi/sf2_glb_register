/* ------------------------------------------------------------------
 * 글로벌 사전예약 API 연동부 (원본 src/lib/preregApi.ts) — 바닐라 JS, Promise 반환
 * 한국과 달리 휴대폰 인증·약관 동의 없음 — 로그인한 계정으로 [REGISTER] 1회 클릭 시 등록 완료.
 * 현재는 퍼블리싱 확인용 Mock 구현. 개발 연동 시 각 함수 내부를 실제 API 호출로 교체하세요.
 *
 * 응답 형태
 *  getSession()     → { loggedIn: boolean }
 *  registerPrereg() → { status: 'complete' | 'duplicate' | 'loginRequired' | 'error' }
 *
 * Mock 전용: URL 쿼리 ?mock=guest | member | registered 로 상태를 바꿔 확인합니다.
 *  guest: 미로그인 (기본값) / member: 로그인·미등록 / registered: 로그인·등록 완료
 * ------------------------------------------------------------------ */
(function (global) {
  "use strict";

  var mockRegistered = false;

  function getMockState() {
    var match = /[?&]mock=(guest|member|registered)\b/.exec(global.location.search);
    return match ? match[1] : "guest";
  }

  function wait(ms, value) {
    return new Promise(function (resolve) {
      setTimeout(function () {
        resolve(value);
      }, ms);
    });
  }

  global.SF2Api = {
    getSession: function () {
      // TODO(API): 파파야플레이 로그인 세션 확인
      return wait(100, { loggedIn: getMockState() !== "guest" });
    },

    registerPrereg: function () {
      // TODO(API): POST /prereg/global/apply (로그인 계정 기준, 요청 바디 없음)
      var state = getMockState();
      var result;
      if (state === "guest") result = { status: "loginRequired" };
      else if (state === "registered" || mockRegistered) result = { status: "duplicate" };
      else {
        mockRegistered = true;
        result = { status: "complete" };
      }
      return wait(300, result);
    },
  };
})(window);
