<template>
<div v-if="invoicesLoaded">
  <div class="app flex flex-column">
    <Navigation />
    <div class="app-content flex flex-column">
      <Modal v-if="modalActive"/>
      <transition name="invoice">
        <InvoiceModal v-if="invoiceModal" />
      </transition>
      <router-view />
    </div>
  </div>
</div>

</template>

<script>
import { mapState, mapActions } from "vuex";
import Navigation from "./components/Navigation"
import InvoiceModal from "./components/InvoiceModal"
import Modal from "./components/Modal";
export default {
  components: {
    Navigation,
    InvoiceModal,
    Modal,
  },
  created() {
    this.GET_INVOICES();
  },

  methods: {
    ...mapActions(['GET_INVOICES']),
  },
  
  computed: {
    ...mapState(['invoiceModal', 'modalActive', 'invoicesLoaded'])
  }
}
</script>


<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Noto Sans KR', sans-serif;
}

html, body {
   font-size: 16px;
}

.app {
  background-color: #141625;
  min-height: 100vh;
  @media(min-width: 900px) {
    flex-direction: row !important;
  }
  .app-content {
    padding: 0 1.25rem;
    flex: 1;
    position: relative;
  }
}

// Animated Invoice
// https://v3.vuejs.org/guide/transitions-enterleave.html#transitioning-single-elements-components
.invoice-enter-active,
.invoice-leave-active {
  transition: 0.8s ease all;
}

.invoice-enter-from,
.invoice-leave-to {
  transform: translateX(-43.75rem)
}


button,
.button {
  cursor: pointer;
  padding: 1rem 1.5rem;
  border-radius: 2rem;
  border: none;
  margin-right: 0.5rem;
  color: #fff;
}

.dark-purple {
  background-color: #252945;
}

.red {
  background-color: #ec5757;
}

.purple {
  background-color: #7c5dfa;
}

.green {
  background-color: #33d69f;
}

.orange {
  background-color: #ff8f00;
}

// utility classes

.flex {
  display: flex;
}

.flex-column {
  flex-direction: column;
}

.container {
  width: 100%;
  padding: 2.5rem 0.625rem;
  max-width: 45rem; // 720px
  margin: 0 auto;

  @media (min-width: 900px) {
    padding-top: 4.5rem;
  }
}

.nav-link {
  text-decoration: none;
  color: initial;
}

// Status Button Styling

.status-button {
  &::before {
    content: "";
    width: 0.625rem;
    height: 0.625rem;
    border-radius: 50%;
    margin-right: 0.5rem;
  }
  font-size: 0.75rem;
  margin-right: 1rem;
  align-items: center;
  padding: 0.5rem 1.5rem;
  border-radius: 0.625rem;
}

.paid {
  &::before {
    background-color: #33d69f;
  }
  color: #33d69f;
  background-color: rgba(51, 214, 160, 0.1);
}

.pending {
  &::before {
    background-color: #ff8f00;
  }
  color: #ff8f00;
  background-color: rgba(255, 145, 0, 0.1);
}

.draft {
  &::before {
    background-color: #dfe3fa;
  }
  color: #dfe3fa;
  background-color: rgba(223, 227, 250, 0.1);
}
</style>
