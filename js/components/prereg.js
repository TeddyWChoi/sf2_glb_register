/* ------------------------------------------------------------------
 * 사전예약 페이지 구성 컴포넌트 (원본 src/components/prereg/*.tsx)
 *  Sf2TopIcons      — 상단 외부 링크 아이콘 (새 창)
 *  Sf2TitleLogotype — S.K.I.L.L. 로고 + Operation RE:FORCE 로고 + PRE-REGISTER + 이벤트 기간
 *  Sf2RewardColumn  — 신청 패널 왼쪽: BONUS VIP 7D 띠 + 보상 키비주얼 (클릭 시 보상 팝업)
 *  Sf2EventPanel    — 신청 패널 오른쪽: 이벤트 요약 + [REGISTER] + Event details
 *  Sf2Footer        — 로고 · 저작권 (한국판 정책 링크 · 등급표시 제외)
 * ------------------------------------------------------------------ */
(function (global) {
  "use strict";

  var Config = global.SF2Config;

  var ICONS = [
    { key: "home", label: "Special Force 2 official website", src: "images/icons/ico_home.svg" },
    { key: "youtube", label: "Special Force 2 YouTube", src: "images/icons/ico_youtube.svg" },
    { key: "discord", label: "Special Force 2 Discord", src: "images/icons/ico_discord.svg" },
  ];

  Vue.component("Sf2TopIcons", {
    name: "Sf2TopIcons",
    computed: {
      // 공식 홈페이지 오픈 전에는 홈 아이콘 숨김 (config.js showHomeLink)
      icons: function () {
        return ICONS.filter(function (icon) {
          return icon.key !== "home" || Config.showHomeLink;
        }).map(function (icon) {
          return {
            key: icon.key,
            label: icon.label,
            src: icon.src,
            href: Config.externalLinks[icon.key],
          };
        });
      },
    },
    template:
      '<ul class="ti-icons">' +
      '<li v-for="icon in icons" :key="icon.key">' +
      '<a class="ti-link" :href="icon.href" target="_blank" rel="noopener noreferrer"' +
      ' :aria-label="icon.label + \' (opens in a new window)\'">' +
      '<img class="ti-img" :src="icon.src" alt="" width="22" height="22" />' +
      "</a>" +
      "</li>" +
      "</ul>",
  });

  Vue.component("Sf2TitleLogotype", {
    name: "Sf2TitleLogotype",
    data: function () {
      return { period: Config.eventPeriodBar };
    },
    template:
      '<div class="tl-title">' +
      '<h1 class="tl-heading">' +
      '<img class="tl-logo" src="images/main/logo_skill.webp" alt="Special Force 2 S.K.I.L.L." width="940" height="244" />' +
      // FigJam: 기존 로고 아래에 Operation-RE:FORCE 로고 추가
      '<img class="tl-operation" src="images/main/logo_operation_reforce.webp" alt="Operation RE:FORCE" width="1400" height="186" />' +
      // PRE-REGISTER — 흰색 라벨 (양옆 라인)
      '<span class="tl-headingText">' +
      '<span class="tl-labelLine" aria-hidden="true"></span>PRE-REGISTER' +
      '<span class="tl-labelLine tl-reverse" aria-hidden="true"></span>' +
      "</span>" +
      "</h1>" +
      '<p class="tl-period">' +
      '<span class="tl-periodBadge">EVENT PERIOD</span>' +
      '<span class="tl-periodDate">{{ period.start }}</span>' +
      '<span class="tl-periodTilde" aria-label="to">~</span>' +
      '<span class="tl-periodEnd">{{ period.end }}</span>' +
      "</p>" +
      "</div>",
  });

  /*
   * VIP(7D)는 보상 제목 아래 BONUS 띠로 강조 (사업팀 요청).
   * 키비주얼은 한국판(reward_main.jpg) 사용 — 글로벌 키비주얼(VIP 포함) 수령 시 교체
   */
  Vue.component("Sf2RewardColumn", {
    name: "Sf2RewardColumn",
    template:
      '<section class="rw-reward" aria-labelledby="reward-title">' +
      '<h2 id="reward-title" class="rw-title">«&nbsp;&nbsp;PRE-REGISTER REWARDS&nbsp;&nbsp;»</h2>' +
      '<p class="rw-bonus">' +
      '<img class="rw-bonusIcon" src="images/reward/vip_7d.webp" alt="" width="142" height="98" />' +
      '<span class="rw-bonusLabel">BONUS</span>' +
      '<strong class="rw-bonusName">VIP 7D</strong>' +
      '<span class="rw-bonusPlus">+ 9 ITEMS</span>' +
      "</p>" +
      '<div class="rw-visual">' +
      '<img class="rw-img is-fill" src="images/main/reward_main.webp" alt="Pre-register rewards" />' +
      '<span class="rw-shade" aria-hidden="true"></span>' +
      '<button type="button" class="rw-pill" @click="$emit(\'open-detail\')">' +
      'View rewards <span aria-hidden="true">›</span>' +
      "</button>" +
      "</div>" +
      "</section>",
  });

  /* 이벤트 요약(대상·지급·횟수) + [REGISTER] + 상세 팝업 링크. 기간은 타이틀 기간 바에 표기 */
  Vue.component("Sf2EventPanel", {
    name: "Sf2EventPanel",
    props: {
      busy: { type: Boolean, default: false },
    },
    data: function () {
      return {
        rows: [
          { term: "ELIGIBILITY", desc: "Accounts with an existing character in Special Force 2" },
          { term: "DELIVERY", desc: "Automatically within 7 days after the December update" },
          { term: "LIMIT", desc: "Once per account" },
        ],
      };
    },
    template:
      '<div class="ev-event">' +
      '<p class="ev-lead">A brand-new beginning. Your loadout is waiting.</p>' +
      '<dl class="ev-summary">' +
      '<div v-for="row in rows" :key="row.term" class="ev-row"><dt>{{ row.term }}</dt><dd>{{ row.desc }}</dd></div>' +
      "</dl>" +
      // 처리 중에도 disabled 를 쓰지 않음 — disabled 가 되면 포커스가 빠져 팝업을 닫은 뒤 버튼으로 돌아오지 못함
      // (중복 클릭은 app.js handleRegister 의 busy 가드로 막음)
      '<button type="button" class="ev-register" :class="{ \'is-busy\': busy }" :aria-busy="busy ? \'true\' : \'false\'"' +
      ' @click="$emit(\'register\')">' +
      '<span class="ev-arrow" aria-hidden="true">‹‹‹</span>' +
      "REGISTER" +
      '<span class="ev-arrow" aria-hidden="true">›››</span>' +
      "</button>" +
      '<button type="button" class="ev-detail" @click="$emit(\'open-detail\')">' +
      'Event details <span aria-hidden="true">›</span>' +
      "</button>" +
      "</div>",
  });

  Vue.component("Sf2Footer", {
    name: "Sf2Footer",
    template:
      '<footer class="ft-footer">' +
      '<div class="ft-inner">' +
      '<div class="ft-logos">' +
      '<img class="ft-logoPapaya" src="images/footer/logo_papaya.png" alt="papaya play" width="216" height="44" />' +
      '<img class="ft-logoDragonfly" src="images/footer/logo_dragonfly.png" alt="DragonFly" width="220" height="32" />' +
      "</div>" +
      '<p class="ft-copyright">© DRAGONFLY GF CO., LTD. All rights reserved.<br />Published by Vertigo Games, Inc.</p>' +
      "</div>" +
      "</footer>",
  });
})(window);
