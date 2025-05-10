<template>
  <div class="content-wrapper">
    <div class="payment-list p-5">
      <h1 class="pb-4 text-danger">Quản Lý Thanh Toán</h1>
      <table class="table table-bordered table-hover">
        <thead>
          <tr>
            <th @click="changeSort('transactionId')">
              Transaction ID
              <span v-if="sortBy === 'transactionId'">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
            </th>

            <th @click="changeSort('userName')">
              Tên Người Dùng
              <span v-if="sortBy === 'userName'">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
            </th>
            <th @click="changeSort('amount')">
              Tổng
              <span v-if="sortBy === 'amount'">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
            </th>
            <th @click="changeSort('status')">
              Trạng thái
              <span v-if="sortBy === 'status'">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
            </th>
            <th @click="changeSort('method')">
              PThức Thanh Toán
              <span v-if="sortBy === 'method'">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
            </th>

            <th @click="changeSort('paymentDate')" class="pe-5">
              Ngày Tạo
              <span v-if="sortBy === 'paymentDate'">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
            </th>
            <th @click="changeSort('description')">
              Mô Tả
              <span v-if="sortBy === 'description'">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="payment in payments" :key="payment.id">
            <td>{{ payment.transactionId }}</td>
            <td>
              <router-link :to="`/admin/payment/edit/${payment.id}`">
                {{ payment.userName }}
              </router-link>
            </td>
            <td>{{ payment.amount }}</td>
            <td>
              <select v-model="payment.status" @change="updateStatus(payment)">
                <option value="PENDING">PENDING</option>
                <option value="COMPLETED">COMPLETED</option>
                <option value="FAILED">FAILED</option>
                <option value="CANCELLED">CANCELLED</option>
              </select>
            </td>
            <td>{{ payment.method }}</td>
            <td class="p-3">{{ formatDate(payment.paymentDate) }}</td>
            <td class="p-3">{{ payment.description }}</td>
            <td>
              <button @click="deletePayment(payment.id)" class="btn btn-sm btn-danger ms-2">
                Delete
              </button>
            </td>
          </tr>
          <tr v-if="payments.length === 0">
            <td colspan="9" class="text-center">No payments found.</td>
          </tr>
        </tbody>
      </table>

      <div class="pagination-controls">
        <button :disabled="page === 0" @click="changePage(page - 1)">Previous</button>
        <span>Page {{ page + 1 }} of {{ totalPages }}</span>
        <button :disabled="page + 1 >= totalPages" @click="changePage(page + 1)">Next</button>
      </div>

      <div v-if="loading" class="loading">Loading...</div>
      <div v-if="error" class="error">{{ error }}</div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { $http } from '@/plugins/http-wrapper'

export default {
  name: 'PaymentList',
  setup() {
    const payments = ref([])
    const page = ref(0)
    const size = ref(10)
    const totalPages = ref(0)
    const sortBy = ref('id')
    const sortOrder = ref('desc')
    const loading = ref(false)
    const error = ref(null)

    const fetchPayments = async () => {
      loading.value = true
      error.value = null
      try {
        const response = await $http.get('/payments/page', {
          page: page.value,
          size: size.value,
          sortBy: sortBy.value,
          sortOrder: sortOrder.value,
        })
        const data = response
        payments.value = data.content || []
        totalPages.value = data.totalPages || 0
      } catch (err) {
        error.value = 'Failed to load payments.'
      } finally {
        loading.value = false
      }
    }

    const updateStatus = async (payment) => {
      try {
        const response = await $http.put(`/payments/${payment.id}/status`, {
          ...payment,
        })
        const updatedPayment = response.data
        const index = payments.value.findIndex((p) => p.id === payment.id)
        if (index !== -1) {
          payments.value[index] = updatedPayment
        }
      } catch (err) {
        error.value = 'Failed to update payment status.'
      }
    }
    const changePage = (newPage) => {
      if (newPage >= 0 && newPage < totalPages.value) {
        page.value = newPage
        fetchPayments()
      }
    }

    const changeSort = (field) => {
      if (sortBy.value === field) {
        sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
      } else {
        sortBy.value = field
        sortOrder.value = 'asc'
      }
      fetchPayments()
    }

    const formatDate = (dateStr) => {
      if (!dateStr) return ''
      const date = new Date(dateStr)
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
    }

    onMounted(() => {
      fetchPayments()
    })

    const goToEdit = (id) => {
      // Use router to navigate to edit page
      router.push({ path: `/admin/payment/edit/${id}` })
    }

    const deletePayment = async (id) => {
      if (!confirm('Are you sure you want to delete this payment?')) {
        return
      }
      try {
        await $http.delete(`/payments/${id}`)
        payments.value = payments.value.filter((p) => p.id !== id)
      } catch (err) {
        error.value = 'Failed to delete payment.'
      }
    }

    return {
      payments,
      page,
      size,
      totalPages,
      sortBy,
      sortOrder,
      loading,
      error,
      changePage,
      changeSort,
      formatDate,
      updateStatus,
      goToEdit,
      deletePayment,
    }
  },
}
</script>

<style scoped>
@import '@/assets/css/adminlte.css';

.payment-list {
  max-width: 900px;
  height: 900px;
}

.table {
  width: 150%;
  border-collapse: collapse;
}

th {
  cursor: pointer;
  user-select: none;
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
}

td {
  border: 1px solid #dee2e6;
}

.pagination-controls {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.loading {
  margin-top: 10px;
  text-align: center;
  color: #007bff;
}

.error {
  margin-top: 10px;
  text-align: center;
  color: red;
}
</style>
