<template>
  <div class="error-page">
    <div class="error-content">
      <i class="fas fa-exclamation-circle error-icon"></i>
      <h1 class="error-title">Oops! Có lỗi xảy ra</h1>
      <p class="error-message">Có lỗi xảy ra với trang bạn yêu cầu</p>

      <div class="error-details">
        <h2 class="details-title">Một số nguyên nhân phổ biến:</h2>
        <ul class="details-list">
          <li>
            <i class="fas fa-tools"></i>
            Các kỹ sư Gift Store đang thực hiện bảo trì trang, bạn có thể thử truy cập lại sau
          </li>
          <li>
            <i class="fas fa-keyboard"></i>
            Thanh URL bị gõ nhầm một ký tự nào đó (bạn thử check lại xem nhé)
          </li>
          <li>
            <i class="fas fa-trash-alt"></i>
            Trang đã bị gỡ khỏi hệ thống
          </li>
        </ul>
      </div>

      <router-link to="/" class="home-button">
        <i class="fas fa-home"></i>
        Về trang chủ
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.error-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f9fa;
  padding: 2rem;
}

.error-content {
  max-width: 600px;
  text-align: center;
  background-color: white;
  padding: 3rem;
  border-radius: 1rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.error-icon {
  font-size: 4rem;
  color: #dc3545;
  margin-bottom: 1.5rem;
}

.error-title {
  font-size: 2rem;
  color: #343a40;
  margin-bottom: 1rem;
  font-weight: 600;
}

.error-message {
  font-size: 1.1rem;
  color: #6c757d;
  margin-bottom: 2rem;
}

.error-details {
  text-align: left;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background-color: #f8f9fa;
  border-radius: 0.5rem;
}

.details-title {
  font-size: 1.2rem;
  color: #495057;
  margin-bottom: 1rem;
  font-weight: 500;
}

.details-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.details-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  color: #6c757d;
  margin-bottom: 1rem;
  font-size: 1rem;
  line-height: 1.5;
}

.details-list li i {
  color: #dc3545;
  margin-top: 0.25rem;
}

.home-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 2rem;
  background-color: #dc3545;
  color: white;
  text-decoration: none;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.home-button:hover {
  background-color: #c82333;
  transform: translateY(-2px);
}

.home-button i {
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .error-content {
    padding: 2rem;
    margin: 1rem;
  }

  .error-icon {
    font-size: 3rem;
  }

  .error-title {
    font-size: 1.5rem;
  }

  .error-message {
    font-size: 1rem;
  }

  .details-list li {
    font-size: 0.9rem;
  }
}
</style>
