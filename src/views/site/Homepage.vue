<template>
  <div class="homepage">
    <div>
      <Banner />
    </div>

    <CategoriesDisplay />
    <div class="MovieListTop">
      <Recommend />
    </div>

    <hr />
    <hr />

    <section class="main-content">
      <PremiumPlans />
    </section>
  </div>
</template>

<script>
import Banner from '@/components/homepages/Banner.vue'
import Recommend from '@/components/homepages/Recommend.vue'
import CategoriesDisplay from '@/components/homepages/CategoriesDisplay.vue'
import PremiumPlans from '@/components/homepages/PremiumPlans.vue'

export default {
  name: 'BalancedHomepage',
  components: {
    Banner,
    CategoriesDisplay,
    Recommend,
    PremiumPlans,
  },
}
</script>

<style scoped>
.flip-card_i {
  position: relative;
  background-color: transparent;
  width: 250px;
  height: 360px;
  perspective: 1000px;
  cursor: default;
}
@media only screen and (max-width: 298px) {
  .flip-card_i {
    width: 200px;
    height: 400px;
  }

  .flip-card-back_i {
    width: 200px !important;
    height: 400px !important;
  }
  .flip-card_i img {
    height: 400px !important;
    width: 200px !important;
  }
  .flip-card-back_i h1 {
    font-size: 32px;
  }
}

.flip-card-inner_i {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  cursor: default;
}

.flip-card_i:hover .flip-card-inner_i {
  transform: rotateY(180deg);
}
.btn_i {
  width: 50px;
  height: 35px;
  border: none;
  border: solid 2px grey;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0);
  font-size: 1em;
}
.b1_i {
  margin-left: 5px;
  margin-right: 5px;
}
.b2_i {
  margin-left: 10px;
  margin-right: 10px;
}
.b3_i {
  margin-left: 10px;
  margin-right: 5px;
}
.b4_i {
  margin-bottom: 2px;
  width: 90px;
  height: 35px;
  margin-top: auto;
  border: none;
  border: solid 2px white;
  border-radius: 5px;
  background-color: #e7e7e7;
  color: black;
  font-size: 1em;
}

.trailer_i {
  width: 90px;
  height: 35px;
  margin-top: auto;
  border: none;
  border: solid 2px white;
  border-radius: 5px;
  background-color: #e7e7e7;
  color: black;
  font-size: 1em;
}
.para_i {
  font-size: 0.8em;
  margin-bottom: 5px;
}
.flip-card-front_i,
.flip-card-back_i {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}
.form-group1_i {
  float: left;
}
.form-group2_i {
  float: none;
}
.form-group3_i {
  float: right;
}
.flip-card-front_i {
  background-color: #bbb;
  color: black;
}

.flip-card-back_i {
  width: 250px;
  height: 360px;
  background-image: linear-gradient(black, #8b0000);
  color: white;
  transform: rotateY(180deg);
  cursor: default;
}
.recommend-new-movies {
  z-index: 3;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 3rem;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
}
</style>
