<template>
  <div class="content-wrapper">
    <div class="payment-edit p-5">
      <h1 class="pb-4 text-danger">Edit Payment</h1>
      <form @submit.prevent="submitForm" class="form">
        <div class="form-group mb-3">
          <label for="amount">Amount</label>
          <input
            id="amount"
            type="number"
            step="0.01"
            v-model.number="payment.amount"
            required
            class="form-control"
          />
        </div>

        <div class="form-group mb-3">
          <label for="description">Description</label>
          <textarea
            id="description"
            v-model="payment.description"
            class="form-control"
            rows="3"
          ></textarea>
        </div>

        <div class="form-group mb-3">
          <label for="method">Method</label>
          <select id="method" v-model="payment.method" class="form-control" required>
            <option value="CREDIT_CARD">CREDIT_CARD</option>
            <option value="PAYPAL">PAYPAL</option>
            <option value="BANK_TRANSFER">BANK_TRANSFER</option>
          </select>
        </div>

        <div class="form-group mb-3">
          <label for="status">Status</label>
          <select id="status" v-model="payment.status" class="form-control" required>
            <option value="PENDING">PENDING</option>
            <option value="COMPLETED">COMPLETED</option>
            <option value="FAILED">FAILED</option>
            <option value="CANCELLED">CANCELLED</option>
          </select>
        </div>

        <div class="form-group mb-3">
          <label for="transactionId">Transaction ID</label>
          <input
            id="transactionId"
            type="text"
            v-model="payment.transactionId"
            class="form-control"
          />
        </div>

        <div class="form-actions">
          <button type="submit" class="btn btn-primary me-2" :disabled="loading">Save</button>
          <button type="button" class="btn btn-secondary" @click="cancel" :disabled="loading">
            Cancel
          </button>
        </div>

        <div v-if="error" class="error mt-3 text-danger">{{ error }}</div>
        <div v-if="success" class="success mt-3 text-success">Payment updated successfully.</div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { $http } from '@/plugins/http-wrapper'

export default {
  name: 'PaymentEdit',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const payment = ref({
      amount: 0,
      description: '',
      method: '',
      status: '',
      transactionId: '',
    })
    const loading = ref(false)
    const error = ref(null)
    const success = ref(false)

    const fetchPayment = async () => {
      loading.value = true
      error.value = null
      success.value = false
      try {
        const response = await $http.get(`/payments/detail/${route.params.id}`)
        payment.value = response
      } catch (err) {
        error.value = 'Failed to load payment details.'
      } finally {
        loading.value = false
      }
    }

    const submitForm = async () => {
      loading.value = true
      error.value = null
      success.value = false
      try {
        await $http.put(`/payments/${route.params.id}`, payment.value)
        success.value = true
        router.push('/admin/payment')
      } catch (err) {
        error.value = 'Failed to update payment.'
      } finally {
        loading.value = false
      }
    }

    const cancel = () => {
      router.push('/admin/payment')
    }

    onMounted(() => {
      fetchPayment()
    })

    return {
      payment,
      loading,
      error,
      success,
      submitForm,
      cancel,
    }
  },
}
</script>

<style scoped>
@import '@/assets/css/adminlte.css';

.payment-edit {
  max-width: 600px;
}

.form-group {
  margin-bottom: 1rem;
}

.form-actions {
  margin-top: 1rem;
}

.error {
  color: red;
}

.success {
  color: green;
}
</style>
