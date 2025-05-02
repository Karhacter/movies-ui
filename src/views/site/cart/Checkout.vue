<template>
  <div class="container pt-5 mt-4">
    <h3>Checkout</h3>
    <form @submit.prevent="submitPurchase">
      <div v-if="isPremium" class="alert alert-info">
        You already have a premium membership and cannot purchase again.
      </div>
      <div v-else>
        <div class="form-group">
          <label>User ID</label>
          <input type="text" v-model="userId" class="form-control" readonly />
        </div>

        <div class="form-group">
          <label>Membership Package</label>
          <input type="text" :value="selectedPackageName" class="form-control" readonly />
        </div>

        <div class="form-group">
          <label for="paymentMethod">Payment Method</label>
          <select id="paymentMethod" v-model="paymentMethod" class="form-control" required>
            <option disabled value="">Select payment method</option>
            <option value="CREDIT_CARD">Credit Card</option>
            <option value="PAYPAL">PayPal</option>
            <option value="BANK_TRANSFER">Bank Transfer</option>
          </select>
        </div>

        <div class="form-group">
          <label for="idempotencyToken">Idempotency Token</label>
          <input
            type="text"
            id="idempotencyToken"
            v-model="idempotencyToken"
            class="form-control"
            required
            placeholder="Enter or generate a token"
          />
          <button type="button" class="btn btn-secondary mt-2" @click="generateToken">
            Generate Token
          </button>
        </div>

        <button type="submit" class="btn btn-primary" :disabled="loading">
          {{ loading ? 'Processing...' : 'Submit Purchase' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { $http } from '@/plugins/http-wrapper'

export default {
  data() {
    return {
      userId: this.$route.query.userId || '',
      packageId: this.$route.query.packageId || '',
      paymentMethod: '',
      idempotencyToken: '',
      plans: [],
      loading: false,
      isPremium: false,
    }
  },
  computed: {
    selectedPackageName() {
      const pkg = this.plans.find((p) => p.id === Number(this.packageId))
      return pkg ? pkg.name : ''
    },
  },
  methods: {
    async fetchPlans() {
      try {
        const response = await $http.get('/payments/membership-packages')
        this.plans = response
      } catch (error) {
        alert('Failed to load membership packages.')
      }
    },
    async fetchPremiumStatus() {
      try {
        const response = await $http.get('/payments/user-premium-status', {
          userId: Number(this.userId),
        })
        this.isPremium = response
      } catch (error) {
        alert('Failed to check premium status.')
      }
    },
    generateToken() {
      this.idempotencyToken = Math.random().toString(36).substr(2, 9) + Date.now()
    },
    async submitPurchase() {
      if (this.isPremium) {
        alert('You already have a premium membership and cannot purchase again.')
        return
      }
      if (!this.userId || !this.packageId || !this.paymentMethod || !this.idempotencyToken) {
        alert('Please fill in all required fields.')
        return
      }
      this.loading = true
      try {
        const response = await $http.post('/payments/purchase-membership', {
          userId: this.userId,
          packageId: this.packageId,
          paymentMethod: this.paymentMethod,
          idempotencyToken: this.idempotencyToken,
        })
        alert('Purchase successful! Transaction ID: ' + response.transactionId)
      } catch (error) {
        alert('Purchase failed. Please try again.')
      } finally {
        this.loading = false
      }
    },
  },
  mounted() {
    this.fetchPlans()
    this.fetchPremiumStatus()
  },
}
</script>

<style scoped>
.container {
  max-width: 600px;
  padding: 50px;
  border: 1px solid;
}
.form-group {
  margin-bottom: 1rem;
}
.btn {
  margin-top: 1rem;
}
</style>
