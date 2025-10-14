<template>
  <div>
    <h1 class="text-4xl font-bold mb-6">Top Tracks</h1>
    <div v-if="tracks.length" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      <div v-for="track in tracks" :key="track.id" @click="play(track)" class="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 cursor-pointer transition-all duration-300" :class="{ 'bg-green-500 bg-opacity-20': playerStore.currentTrack?.id === track.id }">
        <img :src="track.album.cover_medium" alt="Album Art" class="w-full rounded mb-2">
        <h3 class="font-semibold truncate" :class="{ 'text-green-400': playerStore.currentTrack?.id === track.id }">{{ track.title }}</h3>
        <router-link :to="`/artist/${track.artist.id}`" @click.stop class="text-sm text-gray-400 truncate hover:underline">{{ track.artist.name }}</router-link>
      </div>
    </div>
    <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      <TrackCardSkeleton v-for="n in 10" :key="n" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getTopTracks } from '../api/deezer';
import { usePlayerStore } from '../store/player';
import TrackCardSkeleton from '../components/TrackCardSkeleton.vue';

const tracks = ref([]);
const playerStore = usePlayerStore();

const fetchTopTracks = async () => {
  try {
    const response = await getTopTracks();
    tracks.value = response.data.data;
  } catch (error) {
    console.error("Error fetching top tracks:", error);
  }
};

const play = (track) => {
  playerStore.playSong(track, tracks.value);
};

onMounted(() => {
  fetchTopTracks();
});
</script>