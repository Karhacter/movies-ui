import { $http } from '../plugins/http-wrapper'

export async function updateEpisode(
  epId: number,
  episodeData: { episodeNumber: number; duration: string; video_url?: string }
) {
  return $http.put(`/episodes/update/${epId}`, episodeData)
}

export async function uploadEpisodeVideo(epId: number, videoFile: File) {
  const formData = new FormData()
  formData.append('videoFile', videoFile)
  return $http.post(`/episodes/${epId}/upload-video`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export async function getEpisodeById(epId: number) {
  return $http.get(`/episodes/${epId}`)
}
