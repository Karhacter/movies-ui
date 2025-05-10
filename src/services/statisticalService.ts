import { $http } from '../plugins/http-wrapper'

export interface MovieStatsDTO {
  totalMovies: number
  averageRating: number
  totalViews: number
  totalComments: number
}

export interface MovieDTO {
  id: number | string
  title: string
  rating: number
  views: number
  comments: number
}

// API functions for movie statistics

export async function getOverallStats() {
  return $http.get<MovieStatsDTO>('/movies/stats/overall')
}

export async function getStatsByTimePeriod(period: string) {
  return $http.get<MovieStatsDTO>(`/movies/stats/period/${period}`)
}

export async function getTopRatedMovies(limit: number = 3) {
  return $http.get<MovieDTO[]>('/movies/stats/top-rated', { limit })
}

export async function getMostViewedMovies(limit: number = 3) {
  return $http.get<MovieDTO[]>('/movies/stats/most-viewed', { limit })
}

export async function getMostCommentedMovies(limit: number = 3) {
  return $http.get<MovieDTO[]>('/movies/stats/most-commented', { limit })
}

export async function getMoviesByRatingRange(minRating: number, maxRating: number) {
  return $http.get<MovieDTO[]>('/movies/stats/rating-range', { minRating, maxRating })
}
