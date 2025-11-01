import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getTopTracks = () => apiClient.get('/chart/0/tracks');
export const searchTracks = (query) => apiClient.get(`/search?q=${query}`);
export const getAlbumDetails = (albumId) => apiClient.get(`/album/${albumId}`);
export const getNewReleases = () => apiClient.get('/editorial/0/releases');
export const getArtistDetails = (artistId) =>
  Promise.all([
    apiClient.get(`/artist/${artistId}`),
    apiClient.get(`/artist/${artistId}/top?limit=50`),
  ]);
