<template>
    <!-- 라우터에 이름 부여 router/index.js에 추가해야 함 -->
    <!-- 클릭시 해당 라우터로 이동됨. -->
    <router-link class="invoice flex" v-bind:to="{ name: 'Invoice', params: { invoiceId: invoice.invoiceId } }">
        <div class="left flex">
            <span class="tracking-number">#{{ invoice.invoiceId }}</span>
            <span class="due-date">{{ invoice.paymentDueDate }}</span>
            <span class="person">{{ invoice.clientName }}</span>
        </div>
        <div class="right flex">
            <span class="price">총 {{ invoice.invoiceTotal }}원</span>
            <div 
                class="status-button flex" 
                v-bind:class="{ paid: invoice.invoicePaid, draft: invoice.invoiceDraft, pending: invoice.invoicePending }"
            >
                <span v-if="invoice.invoicePaid">납부됨</span>
                <span v-if="invoice.invoiceDraft">초안</span>
                <span v-if="invoice.invoicePending">납부안됨</span>
            </div>
            <div class="icon flex">
                <img src="@/assets/icon-arrow-right.svg" alt="청구서 보기 아이콘">
            </div>
        </div>
    </router-link>
</template>

<script>
export default {
    name: 'invoice',

    props: ["invoice"]
}
</script>

<style lang="scss" scoped>
    .invoice {
        text-decoration: none;
        cursor: pointer;
        gap: 1rem;
        margin-bottom: 1rem;
        color: #fff;
        border-radius: 1.25rem;
        padding: 1.75rem 2rem;
        background-color: #1e2139;
        align-items: center;

        span {
            font-size: 0.875rem;
        }
        .left {
            align-items: center;
            flex-basis: 55%;
            gap: 1rem;

            span {
                flex: 1;
            }

            .tracking-number {
                text-transform: uppercase;
            }
        }

        .right {
            gap: 1rem;
            flex-basis: 45%;
            align-items: center;

            .price {
                flex: 1;
                font-size: 1rem;
                font-weight: bolder;
            }
        }
    }
</style>