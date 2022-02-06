<template>
  <div class="home container">
    <!-- Header -->
    <div class="header flex">
      <div class="left flex flex-column">
        <h1>청구서 목록</h1>
        <span>현재 총 {{ invoiceData.length }}개의 청구서가 있어요.</span>
      </div>
      <div class="right flex">
        <div @click="toggleFilterMenu" class="filter flex">
          <span>상태별 보기<span v-if="filteredInvoice"> : {{ filteredInvoice }}</span></span>
          <img src="@/assets/icon-arrow-down.svg" alt="정렬하기 아이콘">
          <ul v-show="filterMenu" class="filter-menu">
            <li @click="filteredInvoices">초안</li>
            <li @click="filteredInvoices">납부안됨</li>
            <li @click="filteredInvoices">납부됨</li>
            <li @click="filteredInvoices">모두</li>
          </ul> 
        </div>
        <div @click="newInvoice" class="button flex">
          <div class="inner-button flex">
            <img src="@/assets/icon-plus.svg" alt="새로운 영수증 만들기 아이콘">
          </div>
          <p>생성하기</p>
        </div>
      </div>
    </div>

    <!-- Invoice 목록 -->
    <div v-if="invoiceData.length > 0">
      <Invoice v-for="(invoice, index) in filteredData" v-bind:invoice="invoice" v-bind:key="index" />
    </div>
    <div v-else class="empty flex flex-column">
      <img src="@/assets/illustration-empty.svg" alt="청구서 비어짐 일러스트">
      <h3>청구서 목록이 비어있어요.</h3>
      <p>&lt;생성하기&gt; 버튼을 눌러 새로운 청구서를 만들어보세요!</p>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import Invoice from '../components/Invoice';
export default {
  name: "Home",
  data() {
    return {
      filterMenu: null,
      filteredInvoice: null,
    }
  },
  components: {
    Invoice,
  },
  methods: {
    ...mapMutations(['TOGGLE_INVOICE']),
    newInvoice() {
      this.TOGGLE_INVOICE();
    },

    toggleFilterMenu() {
      this.filterMenu = !this.filterMenu;
    },

    filteredInvoices(e) {
      if (e.target.innerText === '모두') {
        this.filteredInvoice = null;
        return;
      }

      this.filteredInvoice = e.target.innerText;
    },
  },
  computed: {
    ...mapState(['invoiceData']),

    filteredData() {
      return this.invoiceData.filter(invoice => {
        if (this.filteredInvoice === "초안") {
          return invoice.invoiceDraft === true;
        }

        if (this.filteredInvoice === "납부안됨") {
          return invoice.invoicePending === true;
        }

        if (this.filteredInvoice === "납부됨") {
          return invoice.invoicePaid === true;
        }

        return invoice;
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  color: #fff;

  .header {
    margin-bottom: 4rem;
    flex-direction: column;
    .left,
    .right {
      flex: 1;
    }

    .right {
      justify-content: flex-end;
      align-items: center;

      .button,
      .filter {
        align-items: center;

        span {
          font-size: 0.75rem;
        }
      }
      .filter {
        position: relative;
        margin-right:2.5rem;
        cursor: pointer;
        img {
          margin-left:0.75rem;
          width: 9px;
          height: 5px;
        }

        .filter-menu {
          width: 7.5rem;
          position: absolute;
          top: 25px;
          list-style: none;
          background-color: #1e2139;
          box-shadow: 0 0.25rem 0.375rem -0.0625rem rgba(0, 0, 0, 0.1), 0 0.125rem 0.25rem -0.0625rem rgba(0, 0, 0, 0.06);
        
          li {
            cursor: pointer;
            font-size: 0.75rem;
            padding: 0.625rem 1.25rem;

            &:hover {
              color: #1e2139;
              background-color: #fff;
            }
          }
        }
      }

      .button {
        padding: 0.5rem 1rem;
        background-color: #7c5dfa;
        border-radius: 40px;

        .inner-button {
          margin-right: 0.5rem;
          border-radius: 50%;
          padding: 0.5rem;
          align-items: center;
          justify-content: center;
          background-color: #fff;
          img {
            width: 0.625rem;
            height: 0.625rem;
            
          }
        }

        
        p {
          margin-bottom: 0.125rem;
        }
      }
    }

    @media(min-width: 900px) {
      flex-direction: row;
    }
  }

  .empty {
    margin-top: 10rem;
    align-items: center;

    img {
      width: 16.5rem;
      height: auto;
    }

    h3 {
      font-size: 1.25rem;
      margin: 2.5rem 0 0 0;
    }

    p {
      margin-top: 1rem;
      text-align: center;
      font-size: 0.75rem;
      font-weight: normal;
    }
  }
}

</style>
