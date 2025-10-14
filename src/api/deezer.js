// src/api/deezer.js
import axios from 'axios';

// Create a base instance of Axios with the proxy path
const apiClient = axios.create({
  baseURL: '/api', // All requests will be prefixed with /api
});

// Function to get the main chart tracks (for the homepage)
export const getTopTracks = () => {
  return apiClient.get('/chart/0/tracks');
};

// Function to search for tracks
export const searchTracks = (query) => {
  return apiClient.get(`/search?q=${query}`);
};

// Function to get details for a specific album
export const getAlbumDetails = (albumId) => {
  return apiClient.get(`/album/${albumId}`);
};

// Function to get new releases
export const getNewReleases = () => {
  return apiClient.get('/editorial/0/releases');
};

// Function to get artist details and top tracks
export const getArtistDetails = (artistId) => {
  return Promise.all([
    apiClient.get(`/artist/${artistId}`),
    apiClient.get(`/artist/${artistId}/top?limit=50`)
  ]);
};

// You can add more functions as needed (e.g., getArtistDetails)