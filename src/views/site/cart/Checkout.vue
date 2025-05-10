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
            <option value="QR">QR</option>
          </select>
        </div>

        <!-- Conditional rendering for payment method forms -->
        <div v-if="paymentMethod === 'CREDIT_CARD'">
          <div class="form-group">
            <label for="cardNumber">Card Number</label>
            <input
              type="text"
              id="cardNumber"
              v-model="creditCard.cardNumber"
              class="form-control"
              placeholder="Enter card number"
              required
            />
          </div>
          <div class="form-group">
            <label for="expiryDate">Expiry Date</label>
            <input
              type="month"
              id="expiryDate"
              v-model="creditCard.expiryDate"
              class="form-control"
              required
            />
          </div>
          <div class="form-group">
            <label for="cvv">CVV</label>
            <input
              type="password"
              id="cvv"
              v-model="creditCard.cvv"
              class="form-control"
              placeholder="Enter CVV"
              required
            />
          </div>
        </div>

        <div v-else-if="paymentMethod === 'BANK_TRANSFER'">
          <div class="alert alert-info">
            <h5>Bank Transfer Information</h5>
            <p>Bank Name: Example Bank</p>
            <p>Account Number: 123456789</p>
            <p>Account Holder: Your Company Name</p>
            <p>
              Please transfer the amount to the above account and use your User ID as the reference.
            </p>
          </div>
        </div>

        <div v-else-if="paymentMethod === 'PAYPAL'">
          <div class="form-group">
            <label for="paypalEmail">PayPal Email</label>
            <input
              type="email"
              id="paypalEmail"
              v-model="paypal.email"
              class="form-control"
              placeholder="Enter your PayPal email"
              required
            />
          </div>
        </div>

        <div v-else-if="paymentMethod === 'QR'">
          <div class="form-group text-center">
            <label>Scan this QR code to pay</label>
            <div>
              <img
                v-if="selectedPackageName.toLowerCase() === 'basic'"
                src="@/assets/img/basic.jpg"
                alt="Basic QR Code"
                style="max-width: 200px; margin: 10px auto"
              />
              <img
                v-else-if="selectedPackageName.toLowerCase() === 'standard'"
                src="@/assets/img/standard.jpg"
                alt="Standard QR Code"
                style="max-width: 200px; margin: 10px auto"
              />
              <img
                v-else-if="selectedPackageName.toLowerCase() === 'premium'"
                src="@/assets/img/premium.jpg"
                alt="Premium QR Code"
                style="max-width: 200px; margin: 10px auto"
              />
              <p v-else>No QR code available for this package.</p>
            </div>
          </div>
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
  data() {
    return {
      userId: this.$route.query.userId || '',
      packageId: this.$route.query.packageId || '',
      paymentMethod: '',
      idempotencyToken: '',
      plans: [],
      loading: false,
      isPremium: false,
      creditCard: {
        cardNumber: '',
        expiryDate: '',
        cvv: '',
      },
      paypal: {
        email: '',
      },
    }
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
      // Validate payment method specific fields
      if (this.paymentMethod === 'CREDIT_CARD') {
        if (!this.creditCard.cardNumber || !this.creditCard.expiryDate || !this.creditCard.cvv) {
          alert('Please fill in all credit card details.')
          return
        }
      } else if (this.paymentMethod === 'PAYPAL') {
        if (!this.paypal.email) {
          alert('Please enter your PayPal email.')
          return
        }
      }
      this.loading = true
      try {
        const payload = {
          userId: this.userId,
          packageId: this.packageId,
          paymentMethod: this.paymentMethod,
          idempotencyToken: this.idempotencyToken,
        }
        // Add payment details to payload
        if (this.paymentMethod === 'CREDIT_CARD') {
          payload.creditCard = { ...this.creditCard }
        } else if (this.paymentMethod === 'PAYPAL') {
          payload.paypal = { ...this.paypal }
        }
        const response = await $http.post('/payments/purchase-membership', payload)
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
