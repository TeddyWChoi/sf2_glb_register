/* ------------------------------------------------------------------
 * 앱 부트스트랩 — 페이지 조립 · [REGISTER] 로직 (원본 src/components/prereg/PreregPage.tsx)
 * [REGISTER] 클릭: 미로그인 → 로그인 안내 / 로그인 → 바로 등록 (휴대폰 인증·약관 동의 없음)
 * ------------------------------------------------------------------ */
(function (global) {
  "use strict";

  var Config = global.SF2Config;
  var Alerts = global.SF2Alerts;
  var Api = global.SF2Api;

  Vue.config.productionTip = false;
  Vue.config.devtools = false;

  /** 웹 로그인 페이지로 이동 (로그인 후 현재 페이지로 복귀) */
  function goToLogin() {
    if (Config.loginUrl === "#") return; // TBD: 로그인 URL 확정 전
    var sep = Config.loginUrl.indexOf("?") === -1 ? "?" : "&";
    global.location.href =
      Config.loginUrl + sep + Config.loginReturnParam + "=" + encodeURIComponent(global.location.href);
  }

  document.addEventListener("DOMContentLoaded", function () {
    new Vue({
      el: "#app",
      data: {
        alert: null,
        busy: false,
        isRewardOpen: false,
        isDetailOpen: false,
      },
      methods: {
        closeAlert: function () {
          this.alert = null;
        },
        // [OK]: 로그인 안내 팝업은 로그인 페이지로 이동, 나머지는 닫기 ([X]·ESC는 항상 닫기)
        confirmAlert: function () {
          var isLogin = this.alert === Alerts.loginRequired;
          this.alert = null;
          if (isLogin) goToLogin();
        },
        handleRegister: function () {
          var self = this;
          if (this.busy) return;
          this.busy = true;
          Api.getSession()
            .then(function (session) {
              if (!session.loggedIn) return { status: "loginRequired" };
              return Api.registerPrereg();
            })
            .then(function (result) {
              self.alert = Alerts[result.status] || Alerts.serverError;
            })
            .catch(function () {
              self.alert = Alerts.serverError;
            })
            .then(function () {
              self.busy = false;
            });
        },
      },
    });
  });
})(window);
