<template>
    <div v-if="currentInvoice" class="invoice-view container">
        <router-link class="nav-link flex" :to="{name: 'Home'}">
            <img src="@/assets/icon-arrow-left.svg" alt="버튼이미지" />
            뒤로가기
        </router-link>
        <!-- Header -->
        <div class="header flex">
            <div class="left flex">
                <span>상태</span>
                <div 
                class="status-button flex" 
                v-bind:class="{ paid: currentInvoice.invoicePaid, draft: currentInvoice.invoiceDraft, pending: currentInvoice.invoicePending }"
                >
                    <span v-if="currentInvoice.invoicePaid">납부됨</span>
                    <span v-if="currentInvoice.invoiceDraft">초안</span>
                    <span v-if="currentInvoice.invoicePending">납부안됨</span>
                </div>
            </div>
            <div class="right flex">
                <button @click="toggleEditInvoice" class="dark-purple">
                    수정
                </button>
                <button @click="deleteInvoice(currentInvoice.docId)" class="red">
                    삭제
                </button>
                <button v-if="currentInvoice.invoicePending" @click="updateStatusToPaid(currentInvoice.docId)" class="green">
                    납부처리
                </button>
                <button v-if="currentInvoice.invoiceDraft || currentInvoice.invoicePaid" @click="updateStatusToPending(currentInvoice.docId)" class="orange">
                    납부안됨처리
                </button>
            </div>
        </div>

        <!-- Invoice Details -->
        <div class="invoice-details flex flex-column">
            <div class="top flex">
                <div class="left flex flex-column">
                    <p><span>&#35;</span>{{ currentInvoice.invoiceId }}</p>
                    <p>{{ currentInvoice.productDescription }}</p>
                </div>
                <div class="right flex flex-column">
                    <p>{{ currentInvoice.billerStreetAddress }}</p>
                    <p>{{ currentInvoice.billerCity }}</p>
                    <p>{{ currentInvoice.billerZipCode }}</p>
                    <p>{{ currentInvoice.billerCountry }}</p>
                </div>
            </div>
            <div class="middle flex">
                <div class="payment flex flex-column">
                    <h4>청구서 일자</h4>
                    <p>{{ currentInvoice.invoiceDate }}</p>
                    <h4>납부기한</h4>
                    <p>{{ currentInvoice.paymentDueDate }}</p>
                </div>
                <div class="bill flex flex-column">
                    <h4>고객 정보</h4>
                    <p>{{ currentInvoice.clientName}}</p>
                    <p>{{ currentInvoice.clientCity}}</p>
                    <p>{{ currentInvoice.clientStreetAddress}}</p>
                    <p>{{ currentInvoice.clientZipCode}}</p>
                    <p>{{ currentInvoice.clientCountry}}</p>
                </div>
                <div class="send-to flex flex-column">
                    <h4>고객 이메일</h4>
                    <p>{{ currentInvoice.clientEmail }}</p>
                </div>
            </div>
            <div class="bottom flex flex-column">
                <div class="billing-items">
                    <div class="heading flex">
                        <p>제품명</p>
                        <p>수량</p>
                        <p>가격</p>
                        <p>금액</p>
                    </div>
                    <div v-for="(item, index) in currentInvoice.invoiceItemList" :key="index" class="item flex">
                        <p>{{ item.itemName }}</p>
                        <p>{{ item.qty }}</p>
                        <p>{{ item.price.toLocaleString('ko-KR') }}</p>
                        <p>{{ item.total.toLocaleString('ko-KR') }}</p>
                    </div>
                </div>
                <div class="total flex">
                    <p>총 금액</p>
                    <p>{{ currentInvoice.invoiceTotal.toLocaleString('ko-KR') }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
export default {
    name: "invoiceView",
    data() {
        return {
            currentInvoice: null,
        }
    },
    created() {
        this.getCurrentInvoice();
    },
    methods: {
        ...mapMutations(["SET_CURRENT_INVOICE", "TOGGLE_EDIT_INVOICE", "TOGGLE_INVOICE"]),

        ...mapActions(["DELETE_INVOICE", "UPDATE_STATUS_TO_PENDING", "UPDATE_STATUS_TO_PAID"]),

        getCurrentInvoice() {
            this.SET_CURRENT_INVOICE(this.$route.params.invoiceId);
            this.currentInvoice = this.currentInvoiceArray[0];
        },
        toggleEditInvoice() {
            this.TOGGLE_EDIT_INVOICE();
            this.TOGGLE_INVOICE();
        },

        async deleteInvoice(docId) {
            await this.DELETE_INVOICE(docId);
            this.$router.push({name: "Home"});
        },

        updateStatusToPaid(docId) {
            this.UPDATE_STATUS_TO_PAID(docId);
        },

        updateStatusToPending(docId) {
            this.UPDATE_STATUS_TO_PENDING(docId);
        },
    },
    computed: {
        ...mapState(["currentInvoiceArray", "editInvoice"])
    },
    watch: {
        editInvoice() {
            if (!this.editInvoice) {
                this.currentInvoice = this.currentInvoiceArray[0];
            }
        },
    },
}
</script>

<style lang="scss" scoped>
    .invoice-view {
        .nav-link {
            margin-bottom: 2rem;
            align-items: center;
            color: #fff;
            font-size: 0.75rem;
            img {
                margin-right: 1rem;
                width: 0.4375rem;
                height: 0.625rem;
            }
        }

        .header,
        .invoice-details {
            background-color: #1e2139;
            border-radius: 1.25rem;
        }

        .header {
            align-items: center;
            padding: 1.5rem 2rem;
            font-size: 0.75rem;

            .left {
                align-items: center;
                div {
                    margin-left: 1rem;
                }
                
                span {
                    color: #dfe3fa;
                }
            }

            .right {
                flex: 1;
                justify-content: flex-end;

                button {
                    color: #fff;
                }
            }
        }

        .invoice-details {
            padding: 3rem;
            margin-top: 1.5rem;

            .top {
                div {
                    color: #dfe3fa;
                    flex: 1;
                }

                .left {
                    font-size: 0.75rem;
                    p:first-child {
                        font-size: 1.5rem;
                        color: #fff;
                        margin-bottom: 0.5rem;
                    }

                    p:nth-child(2) {
                        font-size: 1rem;
                    }

                    span {
                        color: #888eb0;
                    }
                }

                .right {
                    font-size: 0.75rem;
                    align-items: flex-end;
                }
            }

            .middle {
                margin-top: 3.125rem;
                color: #dfe3fa;
                gap: 1rem;

                h4 {
                    font-size: 0.75rem;
                    font-weight: 400;
                    margin-bottom: 0.75rem;
                }

                p {
                    font-size: 1rem;
                }

                .bill,
                .payment {
                    flex: 1;
                    
                }

                .payment {
                    h4:nth-child(3) {
                        margin-top: 2rem;
                    }

                    p {
                        font-weight: 600;
                    }
                }

                .bill {
                    p:nth-child(2) {
                        font-size: 1rem;
                    }
                    p:nth-child(3) {
                        margin-top: auto;
                    }

                    p {
                        font-size: 0.75rem;
                    }
                }

                .send-to {
                    flex: 2;
                }
            }

            .bottom {
                margin-top: 3.125rem;

                .billing-items {
                    padding: 2rem;
                    border-radius: 1.25rem 1.25rem 0 0;
                    background-color: #252945;

                    .heading {
                        color: #dfe3fa;
                        font-size: 0.75rem;
                        margin-bottom: 2rem;

                        p:first-child {
                            flex: 3;
                            text-align: left;
                        }

                        p {
                            flex: 1;
                            text-align: right;
                        }
                    }

                    .item {
                        margin-bottom: 2rem;
                        font-size: 0.8125rem;
                        color: #fff;

                        &:last-child {
                            margin-bottom: 0;
                        }

                        p:first-child {
                            flex: 3;
                            text-align: left;
                        }

                        p {
                            flex: 1;
                            text-align: right;
                        }
                    }
                }

                .total {
                    color: #ffff;
                    padding: 2rem;
                    background-color: rgba(12, 14, 22, 0.7);
                    align-items: center;
                    border-radius: 0 0 0.8125rem 0.8125rem;

                    p {
                        flex: 1;
                        font-size: 0.75rem;
                    }

                    p:nth-child(2) {
                        font-size: 1.75rem;
                        text-align: right;
                    }
                }
            }
        }
    }
</style>