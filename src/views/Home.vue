<template>
  <div class="home container">
    <!-- Header -->
    <div class="header flex">
      <div class="left flex flex-column">
        <h1>Invoices</h1>
        <span>There are 4 total invoices</span>
      </div>
      <div class="right flex">
        <div @click="toggleFilterMenu" class="filter flex">
          <span>Filter by status</span>
          <img src="@/assets/icon-arrow-down.svg" alt="정렬하기 아이콘">
          <ul v-show="filterMenu" class="filter-menu">
            <li>Draft</li>
            <li>Pending</li>
            <li>Paid</li>
            <li>Clear Filter</li>
          </ul> 
        </div>
        <div @click="newInvoice" class="button flex">
          <div class="inner-button flex">
            <img src="@/assets/icon-plus.svg" alt="새로운 영수증 만들기 아이콘">
          </div>
          <span>New Invoice</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      filterMenu: null,
    }
  },
  components: {},
  methods: {
    newInvoice() {},

    toggleFilterMenu() {
      this.filterMenu = !this.filterMenu;
    },
  },
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
        padding: 0.5rem 0.625rem;
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
      }
    }

    @media(min-width: 900px) {
      flex-direction: row;
    }
  }
}

</style>
