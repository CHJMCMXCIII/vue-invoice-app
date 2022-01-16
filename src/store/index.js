import { createStore } from 'vuex'


// Vuex 상태 관리
export default createStore({
  state: {
    invoiceModal: null,
    modalActive: null,
  },
  mutations: {
    TOGGLE_INVOICE(state) {
      state.invoiceModal = !state.invoiceModal
    },
    TOGGLE_MODAL(state) {
      state.modalActive = !state.modalActive;
    }
  },
  actions: {
  },
  modules: {
  }
})
