/* ------------------------------------------------------------------
 * 팝업 (원본 src/components/popup/*.tsx)
 *  Sf2AlertPopup       — 로그인 안내 · 등록 완료 · 이미 등록 · 오류 (딤 클릭 닫힘 제외)
 *  Sf2RewardPopup      — "View rewards" 클릭 시 보상 목록, VIP(7D)는 맨 위 강조 행
 *  Sf2EventDetailPopup — "Event details" 클릭 시 FigJam 와이어프레임 본문 전문
 * ------------------------------------------------------------------ */
(function (global) {
  "use strict";

  var Config = global.SF2Config;
  var Rewards = global.SF2Rewards;

  Vue.component("Sf2AlertPopup", {
    name: "Sf2AlertPopup",
    props: {
      message: { type: Object, default: null },
    },
    template:
      '<sf2-modal :open="!!message" :title="message ? message.title : \'\'" :close-on-dim="false"' +
      ' v-on="$listeners">' +
      '<div v-if="message" class="pu-alert">' +
      '<p class="pu-alertMessage">{{ message.message }}</p>' +
      "</div>" +
      "</sf2-modal>",
  });

  Vue.component("Sf2RewardPopup", {
    name: "Sf2RewardPopup",
    props: {
      open: { type: Boolean, default: false },
    },
    data: function () {
      return { items: Rewards.items, notes: Rewards.notes };
    },
    template:
      '<sf2-modal :open="open" title="«  PRE-REGISTER REWARDS  »" size="lg" variant="gold"' +
      ' body-class="pu-rewardBody" @close="$emit(\'close\')">' +
      '<p class="pu-rewardIntro">Every operator who pre-registers will receive the rewards below.</p>' +
      '<ul class="pu-rewardList">' +
      '<li v-for="item in items" :key="item.name" class="pu-rewardRow" :class="{ \'pu-rewardHighlight\': item.highlight }">' +
      '<span class="pu-rewardIcon"><img :src="item.icon" alt="" /></span>' +
      '<span class="pu-rewardInfo">' +
      '<span v-if="item.highlight" class="pu-rewardBadge">BONUS</span>' +
      "<strong>{{ item.name }}</strong>" +
      '<span :class="{ \'pu-periodPermanent\': item.period === \'Permanent\' }">{{ item.period }}</span>' +
      "</span>" +
      '<span class="pu-rewardAmount">{{ item.amount }}</span>' +
      "</li>" +
      "</ul>" +
      '<ul class="pu-rewardNotes"><li v-for="note in notes" :key="note">{{ note }}</li></ul>' +
      "</sf2-modal>",
  });

  Vue.component("Sf2EventDetailPopup", {
    name: "Sf2EventDetailPopup",
    props: {
      open: { type: Boolean, default: false },
    },
    data: function () {
      return { eventPeriod: Config.eventPeriod };
    },
    template:
      '<sf2-modal :open="open" title="Event Details" size="lg" @close="$emit(\'close\')">' +
      '<div class="pu-detailScroll" tabindex="0">' +
      '<div class="pu-detailIntro">' +
      '<p class="pu-detailLead">A brand-new beginning. Your loadout is waiting.</p>' +
      "<p>Soldiers, the wait is over.</p>" +
      "<p>Special Force 2 is back with its biggest update in years — and <strong>Season 0</strong>" +
      " marks a fresh start for every operator on the battlefield.</p>" +
      "<p>Lock in your spot now and deploy on update day with a" +
      " <strong>free premium arsenal</strong> already waiting in your inventory.</p>" +
      "</div>" +
      '<section class="pu-detailSection"><h3>▶ EVENT PERIOD</h3><p>{{ eventPeriod }}</p></section>' +
      '<section class="pu-detailSection"><h3>▶ ELIGIBILITY</h3>' +
      "<p>Accounts with an existing character in Special Force 2.</p></section>" +
      '<section class="pu-detailSection"><h3><span aria-hidden="true">📦</span> REWARD DELIVERY</h3>' +
      "<p>Rewards will be automatically delivered to your character within 7 days after the" +
      " December update. No coupon codes, no extra steps.</p></section>" +
      '<section class="pu-detailSection"><h3><span aria-hidden="true">⚠️</span> NOTES</h3>' +
      '<ul class="pu-detailNotes">' +
      "<li>Only accounts with an existing character are eligible.</li>" +
      "<li>Rewards are delivered once per account.</li>" +
      "<li>Event details and rewards may change due to operational circumstances.</li>" +
      "</ul></section>" +
      '<p class="pu-detailClosing">Your squad is gearing up. Don\'t be the last one to drop in.</p>' +
      "</div>" +
      "</sf2-modal>",
  });
})(window);
