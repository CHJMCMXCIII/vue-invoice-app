<template>
  <header class="flex">
      <div class="branding flex">
          <img src="@/assets/file-invoice-dollar-solid.png" alt="file invoice dollar icon">
      </div>
  </header>
</template>

<script>
export default {
    name: "navigation"
}
</script>

<style lang="scss" scoped>
header {
    z-index: 99;
    flex-direction: row;
    background-color: #1e2139;

    @media(min-width: 900px) {
        min-height: 100%;
        min-width: 5.625rem;
        border-radius: 0 20px 20px 0;
    }
}

.branding {
    border-radius: 0 20px 20px 0;
    background-color: #7c5dfa;
    justify-content: center;
    width: min-content;
    height: min-content;
    padding: 1.5rem;
    @media(min-width: 900px) {
        width: 100%;
    }
    img {
        width: auto;
        height: 30px;
    }
}

</style>