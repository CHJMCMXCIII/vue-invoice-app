<template>
  <div class="modal flex">
      <div class="modal-content">
          <p class="modal-content__text">
              정말 취소할까요?<br>작성하셨던 내용은 저장되지 않아요.
          </p>
          <div class="actions flex">
              <button type="button" @click="closeModal" class="purple">계속 작성하기</button>
              <button type="button" @click="closeInvoice" class="red">닫기</button>
          </div>
      </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
    name: "modal",
    methods: {
        ...mapMutations(["TOGGLE_MODAL", "TOGGLE_INVOICE"]),

        closeModal() {
            this.TOGGLE_MODAL();
        },

        closeInvoice() {
            this.TOGGLE_MODAL();
            this.TOGGLE_INVOICE();
        }
    }
};
</script>

<style lang="scss" scoped>
.modal {
    z-index: 100;
    position: fixed;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;

    .modal-content {
        border-radius: 1.25rem;
        padding: 2rem 2.5rem;
        max-width: 30rem;
        background-color: #252945;
        color: #fff;

        &__text {
            text-align: center;
            padding: 0 1rem;
        }

        .actions {
            margin-top: 1.5rem;
            button {
                flex: 1;
            }
        }
    }
}


</style>