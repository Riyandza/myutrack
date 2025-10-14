<template>
  <div v-if="artist && topTracks.length">
    <div class="flex flex-col md:flex-row gap-8 items-center mb-8">
      <img :src="artist.picture_big" alt="Artist Photo" class="w-48 h-48 rounded-full shadow-lg">
      <div class="text-center md:text-left">
        <h1 class="text-5xl font-bold">{{ artist.name }}</h1>
        <p class="text-gray-400 mt-2">{{ artist.nb_fan.toLocaleString() }} fans</p>
      </div>
    </div>

    <div>
      <h2 class="text-2xl font-semibold mb-4">Popular Tracks</h2>
      <div class="flex flex-col">
        <div 
          v-for="(track, index) in topTracks" 
          :key="track.id"
          @click="play(track)"
          class="flex items-center p-3 rounded-lg hover:bg-gray-700 cursor-pointer transition-colors"
          :class="{ 'bg-green-500 bg-opacity-20': store.currentTrack?.id === track.id }"
        >
          <span class="text-gray-400 w-8 text-center">{{ index + 1 }}</span>
          <img :src="track.album.cover_small" alt="Album Cover" class="w-12 h-12 rounded mx-4">
          <div class="flex-grow">
            <p class="font-semibold truncate" :class="{ 'text-green-400': store.currentTrack?.id === track.id }">{{ track.title }}</p>
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
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { usePlayerStore } from '../store/player';
import { getArtistDetails } from '../api/deezer';
import TrackListItemSkeleton from '../components/TrackListItemSkeleton.vue';

const route = useRoute();
const store = usePlayerStore();
const artist = ref(null);
const topTracks = ref([]);

onMounted(async () => {
  const artistId = route.params.id;
  if (artistId) {
    try {
      const [artistResponse, topTracksResponse] = await getArtistDetails(artistId);
      artist.value = artistResponse.data;
      topTracks.value = topTracksResponse.data.data;
    } catch (error) {
      console.error("Error fetching artist details:", error);
    }
  }
});

const play = (track) => {
  store.playSong(track, topTracks.value);
};

const formatDuration = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};
</script>
