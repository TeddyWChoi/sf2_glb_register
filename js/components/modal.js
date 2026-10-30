/* ------------------------------------------------------------------
 * Modal — 레이어 팝업 공통 (원본 src/components/common/Modal.tsx)
 *  open 시 배경 스크롤 잠금 + 포커스 이동, 닫힘 시 원래 위치로 포커스 복귀
 *  ESC / [X] 로 닫힘. 딤 클릭 닫힘은 closeOnDim 으로 제어 (알림 팝업은 false)
 * ------------------------------------------------------------------ */
(function (global) {
  "use strict";

  var uid = 0;

  Vue.component("Sf2Modal", {
    name: "Sf2Modal",
    props: {
      open: { type: Boolean, default: false },
      title: { type: String, default: "" },
      /** sm 480 · md 600 · lg 680 · xl 760 (PC 기준 폭) */
      size: { type: String, default: "sm" },
      /** default | gold (골드 테두리형) */
      variant: { type: String, default: "default" },
      closeOnDim: { type: Boolean, default: true },
      confirmLabel: { type: String, default: "OK" },
      bodyClass: { type: String, default: "" },
    },
    data: function () {
      uid += 1;
      return { titleId: "sf2-modal-title-" + uid, lastFocus: null };
    },
    watch: {
      open: {
        immediate: true,
        handler: function (value) {
          if (value) this.onOpen();
          else this.onClose();
        },
      },
    },
    beforeDestroy: function () {
      this.onClose();
    },
    methods: {
      onOpen: function () {
        var self = this;
        this.lastFocus = document.activeElement;
        document.body.classList.add("is-modal-open");
        window.addEventListener("keydown", this.onKeydown);
        this.$nextTick(function () {
          if (self.$refs.dialog) self.$refs.dialog.focus();
        });
      },
      onClose: function () {
        window.removeEventListener("keydown", this.onKeydown);
        if (!this.lastFocus) return;
        document.body.classList.remove("is-modal-open");
        if (this.lastFocus.focus) this.lastFocus.focus();
        this.lastFocus = null;
      },
      onKeydown: function (e) {
        if (e.key === "Escape") this.$emit("close");
      },
      onDim: function () {
        if (this.closeOnDim) this.$emit("close");
      },
      onConfirm: function () {
        // confirm 리스너가 있으면 그쪽으로, 없으면 닫기
        if (this.$listeners.confirm) this.$emit("confirm");
        else this.$emit("close");
      },
    },
    template:
      '<div v-if="open" class="md-dim" @click="onDim">' +
      '<div ref="dialog" class="md-dialog" :class="[\'md-\' + size, { \'md-gold\': variant === \'gold\' }]"' +
      ' role="dialog" aria-modal="true" :aria-labelledby="titleId" tabindex="-1" @click.stop>' +
      '<div class="md-header">' +
      '<h2 :id="titleId" class="md-title">{{ title }}</h2>' +
      '<button type="button" class="md-close" aria-label="Close" @click="$emit(\'close\')">' +
      '<svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">' +
      '<path d="M3 3l14 14M17 3L3 17" stroke="currentColor" stroke-width="1.6" /></svg>' +
      "</button>" +
      "</div>" +
      '<div class="md-body" :class="bodyClass"><slot></slot></div>' +
      '<div class="md-footer">' +
      '<button type="button" class="md-confirm" @click="onConfirm">{{ confirmLabel }}</button>' +
      "</div>" +
      "</div>" +
      "</div>",
  });
})(window);
