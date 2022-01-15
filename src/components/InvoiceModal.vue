<template>
<div @click="checkClick" ref="invoiceWrap" class="invoice-wrap flex flex-column">
    <form @submit.prevent="submitForm" class="invoice-content">
        <h1>New Invoice</h1>

        <!-- Bill Form -->
        <div class="bill-from flex flex-column">
            <h4>Bill From</h4>
            <div class="input flex flex-column">
                <label for="billerStreetAddress">도로명 주소</label>
                <input id="billerStreetAddress" v-model="billerStreetAddress" required type="text">
            </div>
            <div class="location-details flex">
                <div class="input flex flex-column">
                    <label for="billerCity">시&#47;도</label>
                    <input id="billerCity" v-model="billerCity" required type="text">
                </div>
                <div class="input flex flex-column">
                    <label for="billerZipCode">우편번호</label>
                    <input id="billerZipCode" v-model="billerZipCode" required type="text">
                </div>
                <div class="input flex flex-column">
                    <label for="billerCountry">국가</label>
                    <input id="billerCountry" v-model="billerCountry" required type="text">
                </div>
            </div>
        </div>

        <!-- Bill To -->
        <div class="bill-to flex flex-column">
            <h4>Bill To</h4>
            <div class="input flex flex-column">
                <label for="clientName">고객명</label>
                <input id="clientName" v-model="clientName" required type="text">
            </div>
            <div class="input flex flex-column">
                <label for="clientEmail">고객 이메일</label>
                <input id="clientEmail" v-model="clientEmail" required type="text">
            </div>
            <div class="input flex flex-column">
                <label for="clientStreetAddress">고객 도로명 주소</label>
                <input id="clientStreetAddress" v-model="clientStreetAddress" required type="text">
            </div>
            <div class="location-details flex">
                <div class="input flex flex-column">
                    <label for="clientCity">시&#47;도</label>
                    <input id="clientCity" v-model="clientCity" required type="text">
                </div>
                <div class="input flex flex-column">
                    <label for="clientZipCode">우편번호</label>
                    <input id="clientZipCode" v-model="clientZipCode" required type="text">
                </div>
                <div class="input flex flex-column">
                    <label for="clientCountry">국가</label>
                    <input id="clientCountry" v-model="clientCountry" required type="text">
                </div>
            </div>                                       
        </div>

        <!-- Invoice Work Details -->
        <div class="invoice-work flex flex-column">
            <div class="input flex flex-column">
                <label for="paymentTerms">결제 조건 &#40;청구서 발행일 기준&#41;</label>
                <select id="paymentTerms" v-model="paymentTerms" required>
                    <option value="null">--대금 결제일 설정--</option>
                    <option value="30" selected>30일</option>
                    <option value="60">60일</option>
                </select>
            </div>
            <div class="payment flex">
                <div class="input flex flex-column">
                    <label for="invoiceDate">청구서 일자</label>
                    <input id="invoiceDate" v-model="invoiceDate" disabled type="text">
                </div>  
                <div class="input flex flex-column">
                    <label for="paymentDueDate">지불기한</label>
                    <input id="paymentDueDate" v-model="paymentDueDate" disabled type="text">
                </div>                              
            </div>
            <div class="input flex flex-column">
                <label for="productDescription">제품 설명</label>
                <input id="productDescription" v-model="productDescription" required type="text">
            </div>
            <div class="work-items">
                <h3>제품 목록</h3>
                <table class="item-list">
                    <tr class="table-heading flex">
                        <th class="item-name">이름</th>
                        <th class="qty">수량</th>
                        <th class="price">가격</th>
                        <th class="total">총 금액</th>
                    </tr>
                    <tr class="table-items flex" v-for="(item, index) in invoiceItemList" :key="index">
                        <td class="item-name"><input type="text" v-model="item.itemName"></td>
                        <td class="qty"><input type="text" v-model="item.qty"></td>
                        <td class="price"><input type="text" v-model="item.price"></td>
                        <td class="total flex">{{ (item.total = item.qty * item.price).toLocaleString('ko-KR') }} 원</td>
                        <img @click="deleteInvoiceItem(item.id)" src="@/assets/icon-delete.svg" alt="상품 제거하기 아이콘">

                    </tr>
                </table>
                <div @click="addNewInvoiceItem" class="flex button">
                    <img src="@/assets/icon-plus.svg" alt="상품 추가하기 아이콘">
                    상품 추가
                </div>
            </div>                       
        </div>

        <!-- Save/Close Modal -->
        <div class="save flex">
            <div class="left">
                <button @click="closeInvoice" class="red">취소하기</button>
            </div>
            <div class="right flex">
                <button @click="saveDraft" class="dark-purple">초안 저장하기</button>
                <button @click="publishInvoice" class="purple">청구서 발행하기</button>
            </div>
        </div>
    </form>
</div>
</template>

<script>
import db from "../firebase/firebaseInit";
import { mapMutations } from "vuex";
import { uid } from "uid";
export default {
    name: "invoiceModal",
    data() {
        return {
            dateOptions: { year: "numeric", month: "short", day: "numeric" },
            billerStreetAddress: null,
            billerCity: null,
            billerZipCode: null,
            billerCountry: null,
            clientName: null,
            clientEmail: null,
            clientStreetAddress: null,
            clientCity: null,
            clientZipCode: null,
            clientCountry: null,
            invoiceDateUnix: null,
            invoiceDate: null,
            paymentTerms: null,
            paymentDueDateUnix: null,
            paymentDueDate: null,
            productDescription: null,
            invoicePending: null,
            invoiceDraft: null,
            invoiceItemList: [],
            invoiceTotal: 0,            
        }
    },
    created() {

        // 현재 날짜 가져오기
        this.invoiceDateUnix = Date.now();
        this.invoiceDate = new Date(this.invoiceDateUnix).toLocaleDateString('ko-KR', this.dateOptions);

        
    },
    methods: {
        ...mapMutations(['TOGGLE_INVOICE']),
        closeInvoice() {
            this.TOGGLE_INVOICE()
        },

        addNewInvoiceItem() {
            this.invoiceItemList.push({
                id: uid(),
                itemName: "",
                qty: "",
                price: 0,
                total: 0,
            })
        },

        deleteInvoiceItem(id) {
            this.invoiceItemList = this.invoiceItemList.filter(item => item.id !== id)
        },

        calInvoiceTotal() {
            this.invoiceTotal = 0;
            this.invoiceItemList.forEach(item => {
                this.invoiceTotal += item.total;
            });
        },

        publishInvoice() {
            this.invoicePending = true;

        },

        saveDraft() {
            this.invoiceDraft = true;
        },

        async uploadInvoice() {
            if (this.invoiceItemList.length <= 0) {
                alert('상품명이 채워져 있는지 확인해주세요!');
                return;
            }

            this.calInvoiceTotal();

            const dataBase = db.collection('invoices').doc();

            await dataBase.set({
                invoiceId: uid(),
                billerStreetAddress: this.billerStreetAddress,
                billerCity: this.billerCity,
                billerZipCode: this.billerZipCode,
                billerCountry: this.billerCountry,
                clientName: this.clientName,
                clientEmail: this.clientEmail,
                clientStreetAddress: this.clientStreetAddress,
                clientCity: this.clientCity,
                clientZipCode: this.clientZipCode,
                clientCountry: this.clientCountry,
                invoiceDate: this.invoiceDate,
                invoiceDateUnix: this.invoiceDateUnix,
                paymentTerms: this.paymentTerms,
                paymentDueDate: this.paymentDueDate,
                paymentDueDateUnix: this.paymentDueDateUnix,
                productDescription: this.productDescription,
                invoiceItemList: this.invoiceItemList,
                invoiceTotal: this.invoiceTotal,
                invoicePending: this.invoicePending,
                invoiceDraft: this.invoiceDraft,
                invoicePaid: null,
            });

            this.TOGGLE_INVOICE();
        },

        submitForm() {
            this.uploadInvoice();            
        },
    },
    watch: {
        // 지급 기한 계산
        paymentTerms() {
            const futureDate = new Date();
            this.paymentDueDateUnix = futureDate.setDate(futureDate.getDate() + parseInt(this.paymentTerms))
            this.paymentDueDate = new Date(this.paymentDueDateUnix).toLocaleDateString('ko-KR', this.dateOptions);
        }
    }
}
</script>

<style lang="scss" scoped>
    .invoice-wrap {
        position: fixed;
        top: 0;
        left: 0;
        background-color: transparent;
        width: 100%;
        height: 100vh;
        overflow: scroll;
        &::-webkit-scrollbar {
            display: none;
        }
        @media(min-width: 900px) {
            left: 5.625rem;
        }

        .invoice-content {
            position: relative;
            padding: 3.5rem;
            max-width: 43.75rem;
            width: 100%;
            background-color: #141625;
            color: #fff;
            box-shadow: 0.625rem 0.25rem 0.375rem -0.0625rem rgba(0, 0, 0, 0.2), 0 0.125rem 0.25rem -0.0625rem rgba(0, 0, 0, 0.06);
        
            h1 {
                margin-bottom: 3rem;
                color: #fff;
            }

            h3 {
                margin-bottom: 1rem;
                font-size: 18px;
                color: #777f98;
            }

            h4 {
                color: #7c5dfa;
                font-size: 0.75rem;
                margin-bottom: 1.5rem;
            }

            // Bill To / Bill From
            .bill-to,
            .bill-from {
                margin-bottom: 3rem;

                .location-details {
                    gap: 1rem;
                    div {
                        flex: 1;
                    }
                }
            }

            // Invoice Work
            .invoice-work {
                .payment {
                    gap: 1.5rem;
                    div {
                        flex: 1;
                    }
                }

                .work-items {
                    .item-list {
                        width: 100%;

                        // Item Table Styling
                        .table-heading,
                        .table-items {
                            gap: 1rem;
                            font-size: 0.825rem;

                            .item-name {
                                flex-basis: 50%;
                            }

                            .qty {
                                flex-basis: 10%;
                            }

                            .price {
                                flex-basis: 20%;
                            }

                            .total {
                                flex-basis: 20%;
                                align-self: center;
                            }
                        }

                        .table-heading {
                            margin-bottom: 1rem;

                            th {
                                text-align: left;
                            }
                        }

                        .table-items {
                            position: relative;
                            margin-bottom: 1.5rem;

                            img {
                                cursor: pointer;
                                position: absolute;
                                top: 0.9375rem;
                                right: 0;
                                width: 0.75rem;
                                height: 1rem;
                            }
                        }
                    }

                    .button {
                        color: #fff;
                        background-color: #252945;
                        align-items: center;
                        justify-content: center;
                        width: 100%;

                        img {
                            margin-right: 4px;
                        }
                    }
                }
            }
            .save {
                margin-top: 60px;

                div {
                    flex: 1;
                }

                .right {
                    justify-content: flex-end;
                }
            }
        }

        .input {
            margin-bottom: 1.5rem;
        }

        label {
            font-size: 0.825rem;
            margin-bottom: 0.375rem;
        }

        input,
        select {
            width: 100%;
            background-color: #1e2139;
            color: #fff;
            border-radius: 0.25rem;
            padding: 0.75rem 0.25rem;
            border: none;

            &:focus {
                outline: none;
            }
        }
    }
</style>