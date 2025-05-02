<template>

    <footer class="footer">
      <hr class="footer-hr">
      <div class="footer-content">
        <div class="footer-left">
          <a href="home.html"><img class="footer-logo" src="@/assets/img/logo.png" alt="" width="30"
              height="24"></a>
          <p class="footer-bottom-tagline">Watch! Chill! Repeat!</p>
        </div>
        <div class="footer-middle">
          <h2 class="footer-heading">Follow Us</h2>
          <ul class="footer-middle-list icons">
            <a class="footer-links" href="https://www.facebook.com/" target="_blank"><i
                class="fab fa-facebook-f facebook" style="color:red"></i></a>
            <a class="footer-links" href="https://twitter.com/login?lang=en" target="_blank"><i
                class="fab fa-twitter twitter" style="color:red"></i></a>
            <a class="footer-links" href="https://www.linkedin.com/login" target="_blank"><i
                class="fab fa-linkedin linkedin" style="color:red"></i></a>
            <a class="footer-links" href="https://www.instagram.com/" target="_blank"><i
                class="fab fa-instagram instagram" style="color:red"></i></a>
            <a class="footer-links" href="https://github.com/QAZIMAAZARSHAD/Movie-Streaming-Website" target="_blank"><i
                class="fab fa-github github" style="color:red"></i></a>
          </ul>
        </div>
        <div class="footer-middle">
          <h2 class="footer-heading">Services</h2>
          <ul class="footer-middle-list">
            <li class="footer-middle-list-item"><a href="home.html">Enjoy Latest Movies</a> </li>
            <li class="footer-middle-list-item"><a href="web-series.html">Watch Web-Series</a> </li>
            <li class="footer-middle-list-item"><a href="kids.html">Everything for Kids</a> </li>
            <li class="footer-middle-list-item"><a href="news.html">Coming soon</a> </li>
            <li class="footer-middle-list-item"><a href="premium.html">Get Premium Subscription</a> </li>
            <li class="footer-middle-list-item"><a href="faq.html">FAQ</a> </li>
          </ul>
        </div>
       <div class="footer-middle">
                <h2 class="footer-heading">Try Our App</h2>
                <ul class="footer-middle-list icons">
                    <a class="footer-links" href="#"><i class="fab fa-google-play" style="color:red"></i></a>
                    <a class="footer-links" href="#"><i class="fab fa-app-store-ios" style="color:red"></i></a>
                </ul>
            </div>
        <div class="footer-right">
          <p class="footer-links">
          <h2 class="footer-heading">Contact Us</h2>
          <p class="footer-bottom-tagline">Feel free to contact us.</p>
          <router-link class="footer-contact-button" to="/contact">Contact</router-link>
          </p>
        </div>
      </div>
      <hr class="footer-hr">
      <div class="footer-copyright">
        <p>Copyright &copy; and &reg; Since {{ currentYear }} Under MovieStream.com : (Project Is Done By Karhacter and Phucz)</p>
      </div>
    </footer>

    <!----------------------scroll back to top button-->
    <button id="scrollToTopButton" @click="scrollToTop" v-show="showButton" title="Go to top">
      <i class="fa fa-angle-double-up" aria-hidden="true"></i>
    </button>
</template>

<script>
export default {
  data() {
    return {
      currentYear: new Date().getFullYear(),
      showButton: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.scrollFunction)
  },
  methods: {
    scrollFunction() {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        this.showButton = true
      } else {
        this.showButton = false
      }
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
}
</script>

<style scoped>
h2 {
  color: red;
}

#scrollToTopButton:hover,i:hover {
    background-color: white;
    color: red;
  }

  #scrollToTopButton {
    position: fixed;
    bottom: 40px;
    right: 25px;
    font-size: 25px;
    z-index: 99;
    width: 50px;
    height: 50px;
    background-color: red;
    color: black;
    border: none;
    cursor: pointer;
    outline: none;
    padding: 6px;
    border-radius: 50%;
  }
</style>
