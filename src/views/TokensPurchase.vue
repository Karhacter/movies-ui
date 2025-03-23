<template>
  <div class="container pt-5">
    <div class="section-title">
      <h3>Choose your plan</h3>
      <br />
      <ul>
        <li><p class="points">Watch all you want. Advert-free.</p></li>
        <li><p class="points">Recommendations just for you.</p></li>
        <li><p class="points">Change or cancel your plan anytime.</p></li>
      </ul>
    </div>

    <div class="row no-gutters justify-content-center" id="premiumcards">
      <div class="column col-lg-4 col-md-6 row__item">
        <div class="box1 featured" data-aos="fade-right">
          <center>
            <h3>Basic</h3>
            <h4>
              <img src="https://cdn-icons-png.flaticon.com/512/6681/6681925.png" alt="" />
              200&nbsp;<span>per month</span>
            </h4>
          </center>
          <br />
          <ul>
            <li><i class="bx bx-check"></i> Video Quality: Good</li>
            <li><i class="bx bx-check"></i> Resolution: 480p</li>
            <li><i class="bx bx-check"></i> Devices you can use to watch:</li>
            <ul class="devices">
              <li>Mobile</li>
              <li>Tablet</li>
              <li>TV</li>
              <li>Computer</li>
            </ul>
          </ul>
          <form></form>
        </div>
      </div>
      <div class="column col-lg-4 col-md-6 row__item">
        <div class="box2 featured" data-aos="fade-up">
          <center>
            <h3>Premium</h3>
            <h4>
              <img src="https://cdn-icons-png.flaticon.com/512/6681/6681925.png" alt="" />
              799&nbsp;<span>per month</span>
            </h4>
          </center>
          <br />
          <ul>
            <li><i class="bx bx-check"></i> Video Quality: Best</li>
            <li><i class="bx bx-check"></i> Resolution: 4K+HDR</li>
            <li><i class="bx bx-check"></i> Devices you can use to watch:</li>
            <ul class="devices">
              <li>Mobile</li>
              <li>Tablet</li>
              <li>TV</li>
              <li>Computer</li>
            </ul>
          </ul>

          <form></form>
        </div>
      </div>
      <div class="column col-lg-4 col-md-6 row__item">
        <div class="box3 featured" data-aos="fade-left">
          <center>
            <h3>Standard</h3>
            <h4>
              <img src="https://cdn-icons-png.flaticon.com/512/6681/6681925.png" alt="" />
              649&nbsp;<span>per month</span>
            </h4>
          </center>
          <br />
          <ul>
            <li><i class="bx bx-check"></i> Video Quality: Better</li>
            <li><i class="bx bx-check"></i>Resolution: 1080p</li>
            <li><i class="bx bx-check"></i> Devices you can use to watch:</li>
            <ul class="devices">
              <li>Mobile</li>
              <li>Tablet</li>
              <li>TV</li>
              <li>Computer</li>
            </ul>
          </ul>
          <form></form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    purchase(plan) {
      alert(`You have selected the ${plan.name}.`)
    },
  },
  mounted() {
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
</style>
