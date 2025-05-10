import { $http } from '../plugins/http-wrapper'

export async function fetchEpisodesBySlug(slug: string) {
  return $http.get(`/episodes/movie/slug/${slug}`)
}

export async function fetchCommentsBySlug(slug: string, page: number, size: number) {
  return $http.get(`/comments/movie/slug/${slug}/paged`, { page, size })
}
