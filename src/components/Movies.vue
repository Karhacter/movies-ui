<template>
  <div class="wrapper">
    <!--Carousel Slider-->

    <!-- main view -->
    <div class="main-content">
      <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="./Images/msd3.jpg" height="540" class="d-block w-100" alt="..." />
          </div>
        </div>
      </div>
    </div>

    <v-row class="row poster">
      <div class="container" id="movies">
        <h3 class="section-title text-center">All Movies</h3>

        <v-row class="row">
          <!-- Movies item -->

          <v-col class="col-md-3 mb-4" v-for="movie in movies" :key="movie.id">
            <div class="card movie_card">
              <img src="" class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">{{ movie.title }}</h5>
                <span class="movie_info_rating"
                  ><i class="fas fa-star"></i> IMDb {{ movie.rating }} / 10</span
                >
              </div>
            </div>
          </v-col>
        </v-row>
      </div>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'Movies',
  data() {
    return {
      movies: [],
    }
  },
  mounted() {
    fetch('http://localhost:9000/api/movies/index')
      .then((response) => response.json())
      .then((data) => {
        console.log('API Response:', data) // Debug API response
        this.movies = data // Correctly assign data
      })
      .catch((error) => console.error('Error fetching movies:', error))
  },
}
</script>

<style scoped>
#sw-item {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  position: relative;
}

.movie_card {
  height: 350px; /* Set a fixed height for all cards */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
}

.card-img-top {
  height: 200px; /* Set a fixed height for images */
  object-fit: cover; /* Ensure images fill the space without distortion */
}

.card-body {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card-title {
  font-size: 16px;
  font-weight: bold;
  white-space: nowrap; /* Prevent text from wrapping */
  overflow: hidden; /* Hide overflow */
  text-overflow: ellipsis; /* Add "..." when text is too long */
  max-width: 100%;
}

.movie_info_rating {
  font-size: 14px;
  color: #ffc107;
  display: block;
}
</style>
