import { createStore } from 'vuex'


// Vuex 상태 관리
export default createStore({
  state: {
    invoiceModal: null,
  },
  mutations: {
    TOGGLE_INVOICE(state) {
      state.invoiceModal = !state.invoiceModal
    }
  },
  actions: {
  },
  modules: {
  }
})
