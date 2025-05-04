<template>
  <div class="premium-section">
    <div class="premium-header">
      <h4>Kế hoạch Tokens Premium</h4>
      <button class="view-more-button" @click="goToTokensPurchase">View More</button>
    </div>
    <div class="premium-content">
      <div class="premium-plans">
        <div
          v-for="plan in plans"
          :key="plan.id"
          class="premium-plan-card"
          @click="goToTokensPurchase"
        >
          <img class="plan-icon" src="/src/assets/img/premium-badge.png" alt="Premium Badge" />
          <div class="plan-name">{{ plan.name }}</div>
          <div class="plan-price">{{ plan.price }} / month</div>
          <div>Duration: {{ plan.durationDays }} days</div>
        </div>
      </div>
      <div class="premium-text">
        <p>Bạn đã từng cảm thấy 'xài tiền sướng tay'? Hãy để gói Premium cho bạn cảm giác đó!</p>
      </div>
    </div>
  </div>
</template>

<script>
import { $http } from '@/plugins/http-wrapper'

export default {
  name: 'PremiumPlans',
  data() {
    return {
      plans: [],
    }
  },
  methods: {
    async fetchPlans() {
      try {
        const response = await $http.get('/payments/membership-packages')
        this.plans = response || []
      } catch (error) {
        console.error('Failed to load premium plans:', error)
        this.plans = []
      }
    },
    goToTokensPurchase() {
      this.$router.push({ name: 'tokens' })
    },
  },
  mounted() {
    this.fetchPlans()
  },
}
</script>

<style scoped>
.premium-section {
  margin-top: 3rem;
  padding: 1.5rem 2rem;
  background-color: #121212;
  border-radius: 12px;
  color: #f0f0f0;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.7);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.premium-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid #444;
  padding-bottom: 0.5rem;
}

.premium-header h4 {
  font-size: 1.6rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: #ffd700;
  text-shadow: 0 0 8px #ffd700aa;
}

.view-more-button {
  background-color: #ffd700;
  border: none;
  color: #121212;
  padding: 10px 22px;
  cursor: pointer;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 600;
  box-shadow: 0 4px 10px #ffd700aa;
  transition:
    background-color 0.3s ease,
    box-shadow 0.3s ease;
}

.view-more-button:hover {
  background-color: #e6c200;
  box-shadow: 0 6px 14px #e6c200cc;
}

.premium-content {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.premium-plans {
  display: flex;
  gap: 1.5rem;
  overflow-x: auto;
  padding-bottom: 0.75rem;
  scrollbar-width: thin;
  scrollbar-color: #ffd70044 transparent;
  flex: 3;
}

.premium-plans::-webkit-scrollbar {
  height: 8px;
}

.premium-plans::-webkit-scrollbar-track {
  background: transparent;
}

.premium-plans::-webkit-scrollbar-thumb {
  background-color: #ffd70088;
  border-radius: 4px;
}

.premium-plan-card {
  background-color: #222;
  border-radius: 15px;
  padding: 1.5rem 1.8rem;
  min-width: 200px;
  cursor: pointer;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  box-shadow: 0 4px 12px rgba(255, 215, 0, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
}

.premium-plan-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 10px 25px rgba(255, 215, 0, 0.7);
}

.plan-icon {
  width: 60px;
  height: 60px;
  margin-bottom: 1rem;
}

.plan-name {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 0.8rem;
  color: #ffd700;
  text-shadow: 0 0 6px #ffd700bb;
}

.plan-price {
  font-size: 1.1rem;
  color: #fffacd;
  margin-bottom: 0.6rem;
  font-weight: 600;
}

.premium-plan-card div:last-child {
  font-size: 0.95rem;
  color: #ccc;
  font-weight: 500;
}

.premium-text {
  flex: 1;
  font-size: 1.4rem;
  font-weight: 600;
  color: #ffd700cc;
  text-align: center;
  padding: 1rem;
  border-left: 2px solid #ffd70088;
  user-select: none;
}
</style>
