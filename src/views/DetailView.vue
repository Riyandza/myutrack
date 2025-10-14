<template>
  <div v-if="album" class="flex flex-col md:flex-row gap-8">
    <div class="md:w-1/3 text-center md:text-left">
      <img :src="album.cover_big" alt="Album Cover" class="rounded-lg shadow-lg w-full mb-4">
      <h1 class="text-3xl font-bold">{{ album.title }}</h1>
      <router-link :to="`/artist/${album.artist.id}`" class="text-xl text-gray-400 hover:underline">{{ album.artist.name }}</router-link>
      <p class="text-sm text-gray-500 mt-2">{{ album.release_date }} • {{ album.nb_tracks }} songs</p>
    </div>
    
    <div class="md:w-2/3">
      <h2 class="text-2xl font-semibold mb-4">Tracks</h2>
      <div class="flex flex-col">
        <div 
          v-for="(track, index) in album.tracks.data" 
          :key="track.id"
          @click="play(track)"
          class="flex items-center p-3 rounded-lg hover:bg-gray-700 cursor-pointer transition-colors"
          :class="{ 'bg-green-500 bg-opacity-20': playerStore.currentTrack?.id === track.id }"
        >
          <span class="text-gray-400 w-8 text-center">{{ index + 1 }}</span>
          <div class="flex-grow">
            <p class="font-semibold truncate" :class="{ 'text-green-400': playerStore.currentTrack?.id === track.id }">{{ track.title }}</p>
            <p class="text-sm text-gray-500 truncate">{{ track.artist.name }}</p>
          </div>
          <span class="text-sm text-gray-400">{{ formatDuration(track.duration) }}</span>
        </div>
      </div>
    </div>
  </div>
  
  <div v-else class="mt-8">
    <TrackListItemSkeleton v-for="n in 10" :key="n" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { usePlayerStore } from '../store/player';
import { getAlbumDetails } from '../api/deezer';
import TrackListItemSkeleton from '../components/TrackListItemSkeleton.vue';

const route = useRoute();
const playerStore = usePlayerStore();
const album = ref(null);

// Fetch album details when the component is mounted
onMounted(async () => {
  const albumId = route.params.id; // Get ID from URL
  if (albumId) {
    try {
      const response = await getAlbumDetails(albumId);
      album.value = response.data;
    } catch (error) {
      console.error("Error fetching album details:", error);
    }
  }
});

const play = (track) => {
  // The track object from the album endpoint is missing album details.
  // We need to construct a compatible track object for the player.
  const fullTrack = {
    ...track,
    album: {
      id: album.value.id,
      title: album.value.title,
      cover_small: album.value.cover_small,
      cover_medium: album.value.cover_medium,
    }
  };
  
  // We also need to transform the whole list for the queue
  const trackList = album.value.tracks.data.map(t => ({
    ...t,
    album: {
      id: album.value.id,
      title: album.value.title,
      cover_small: album.value.cover_small,
      cover_medium: album.value.cover_medium,
    }
  }));

  playerStore.playSong(fullTrack, trackList);
};

// Helper function to format seconds into MM:SS format
const formatDuration = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};
</script>