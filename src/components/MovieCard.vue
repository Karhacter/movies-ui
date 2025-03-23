<template>
  <div class="card movie_card ps-1 m-1">
    <div class="movie-image-container">
      <img :src="movie.image" class="card-img-top" alt="Movie Poster" />
      <div class="play-button-overlay">
        <button class="play-button">
          <i class="fas fa-play"></i>
        </button>
      </div>
    </div>
    <div class="card-body">
      <h5 class="card-title text-white">{{ movie.title }}</h5>
      <span class="movie_info_rating">
        <i class="fas fa-star"></i> IMDb {{ movie.rating }}/10
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Movie {
  id: number
  title: string
  image: string
  rating: number
}

defineProps<{
  movie: Movie
}>()
</script>

<style scoped>
.movie_card {
  height: 350px;
  display: flex;
  flex-direction: column;
  background-color: #1a1a1a;
  color: white;
  transition: all 0.3s ease;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  border: 1px solid rgba(255, 0, 0, 0.15);
  box-shadow: 0 0 10px rgba(255, 0, 0, 0.1);
}

.movie_card:hover {
  transform: translateY(-5px);
  border-color: rgba(255, 0, 0, 0.2);
  box-shadow: 0 5px 15px rgba(255, 0, 0, 0.15);
}

.movie-image-container {
  position: relative;
  height: 100%;
  width: 100%;
}

.card-img-top {
  height: 100%;
  width: 100%;
  object-fit: cover;
}

.play-button-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.9) 90%);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;
}

.movie_card:hover .play-button-overlay {
  background: linear-gradient(to bottom, rgba(43, 2, 2, 0.3) 0%, rgba(216, 173, 173, 0.341) 90%);
}

.play-button {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: rgba(255, 193, 7, 0.9);
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  opacity: 0;
}

.movie_card:hover .play-button {
  transform: translate(-50%, -50%) scale(1);
  opacity: 1;
}

.play-button:hover {
  background-color: #ffc107;
  transform: translate(-50%, -50%) scale(1.1);
}

.play-button i {
  color: #000;
  font-size: 20px;
  margin-left: 3px;
}

.card-body {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  background: transparent;
  z-index: 1;
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: #ffffff;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
}

.movie_info_rating {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  color: #ffc107;
  margin: 0;
}

.movie_info_rating i {
  color: #ffc107;
  font-size: 16px;
}
</style>
