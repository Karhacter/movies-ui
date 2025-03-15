<script lang="ts">
export default {
  name: 'ErrorPage',
  data() {
    return {
      layout: 'Default',
    }
  },
}
</script>

<template>
  <div class="d-flex align-center justify-center flex-column" style="height: 60vh">
    <div class="text-body-1 font-weight-medium my-4">Có lỗi xảy ra với trang bạn yêu cầu</div>
    <div class="mb-4">
      <div class="text-body-1 mb-2">Một số nguyên nhân phổ biến:</div>
      <ul>
        <li class="text-body-2">
          Các kỹ sư Gift Store đang thực hiện bảo trì trang, bạn có thể thử truy cập lại sau
        </li>
        <li class="text-body-2">
          Thanh URL bị gõ nhầm một ký tự nào đó (bạn thử check lại xem nhé)
        </li>
        <li class="text-body-2">Trang đã bị gỡ khỏi hệ thống</li>
      </ul>
    </div>
    <v-btn depressed height="48" class="rounded-lg px-8" color="rgba(254, 52, 100)" to="/">
      <div class="text-body-1 font-weight-bold white--text">Về trang chủ</div>
    </v-btn>
  </div>
</template>
