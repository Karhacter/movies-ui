<template>
  <div class="container">
    <div class="section-title">
      <h3>Choose your plan</h3>
      <ul>
        <li><p class="points">Watch all you want. Advert-free.</p></li>
        <li><p class="points">Recommendations just for you.</p></li>
        <li><p class="points">Change or cancel your plan anytime.</p></li>
      </ul>
    </div>
    <div class="row" id="premiumcards">
      <div v-for="plan in plans" :key="plan.id" class="column row__item">
        <div :class="['featured', plan.name.toLowerCase()]" data-aos="fade-up">
          <h3 class="ms-3 p-2">{{ plan.name }}</h3>
          <h4 class="ms-3">
            <img src="https://cdn-icons-png.flaticon.com/512/6681/6681925.png" alt="" />
            {{ plan.price }}&nbsp;<span>per month</span>
          </h4>

          <br />
          <ul>
            <li><i class="bx bx-check"></i> Duration: {{ plan.durationDays }} days</li>
            <li><i class="bx bx-check"></i> Video Quality: {{ plan.videoQuality || 'Good' }}</li>
            <li><i class="bx bx-check"></i> Resolution: {{ plan.resolution || '480p' }}</li>
            <li><i class="bx bx-check"></i> Devices you can use to watch:</li>
            <ul class="devices">
              <li
                v-for="device in plan.devices || ['Mobile', 'Tablet', 'TV', 'Computer']"
                :key="device"
              >
                {{ device }}
              </li>
            </ul>
          </ul>
          <button @click="purchase(plan)" :disabled="loading">
            {{ loading && selectedPlanId === plan.id ? 'Processing...' : 'Purchase' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { $http } from '@/plugins/http-wrapper'

export default {
  data() {
    return {
      plans: [],
      userID: null,
      loading: false,
      selectedPlanId: null,
    }
  },
  methods: {
    async fetchPlans() {
      try {
        const response = await $http.get('/payments/membership-packages')
        if (response) this.plans = response
      } catch (error) {
        alert('Failed to load membership packages.')
      }
    },
    async fetchUserInfor() {
      try {
        const res = await $http.get('/auth/userinfo')
        if (res) {
          this.user = res
          this.userID = res.userID
          return res.userID
        }
      } catch (error) {
        console.error('Failed to fetch user:', error)
      }
      return null
    },
    async goToCheckout(plan) {
      if (!this.userID) {
        await this.fetchUserInfor()
        if (!this.userID) {
          alert('Vui Lòng Đăng Nhập Để Được Hưởng Lợi')
          window.location.href = '/'
          throw new Error('Unable to get user ID')
        }
      }
      this.$router.push({
        name: 'Checkout',
        query: { userId: this.userID, packageId: plan.id },
      })
    },
    purchase(plan) {
      this.goToCheckout(plan)
    },
  },
  mounted() {
    this.fetchPlans()
    document.body.style.background = `
      linear-gradient(rgba(0, 0, 0, 0.616), rgba(0, 0, 0, 0.616)),
      url("https://blog-content.ixigo.com/wp-content/uploads/2020/04/Bollyquiz2.jpeg")
      no-repeat center center fixed
    `
    document.body.style.backgroundSize = 'cover'
    document.body.style.fontFamily = "'Ubuntu', sans-serif"
  },
  beforeUnmount() {
    // Reset the background when leaving the component
    document.body.style.background = ''
  },
}
</script>

<style scoped>
body {
  background:
    linear-gradient(rgba(0, 0, 0, 0.616), rgba(0, 0, 0, 0.616)),
    url(https://blog-content.ixigo.com/wp-content/uploads/2020/04/Bollyquiz2.jpeg) no-repeat center
      center fixed;
  background-size: cover;
  font-family: 'Ubuntu', sans-serif;
}
img {
  width: 10%;
}
button {
  background-color: #007bff;
  border: none;
  color: white;
  padding: 10px 20px;
  margin-top: 10px;
  cursor: pointer;
  font-size: 1rem;
  border-radius: 5px;
}
button:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}
#premiumcards {
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
}
.row__item {
  margin: 0;
  padding: 10px;
  box-sizing: border-box;
}
</style>
