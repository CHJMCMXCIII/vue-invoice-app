<template>
<div @click="checkClick" ref="invoiceWrap" class="invoice-wrap flex flex-column">
    <form @submit.prevent="submitForm" class="invoice-content">
        <h1>New Invoice</h1>

        <!-- Bill Form -->
        <div class="bill-form flex flex-column">
            <h4>Bill From</h4>
            <div class="input flex flex-column">
                <label for="billerStreetAddress">Street Address</label>
                <input id="billerStreetAddress" v-model="billerStreetAddress" required type="text">
            </div>
        </div>
    </form>
</div>
</template>

<script>
export default {
    name: "invoiceModal",
    data() {
        return {
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
    }
}
</script>

<style>

</style>