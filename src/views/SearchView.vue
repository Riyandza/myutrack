<template>
  <div>
    <h1 class="text-3xl font-bold mb-4">Search Results for "{{ displayQuery }}"</h1>

    <div v-if="results.length > 0" class="mt-8">
      <div class="flex flex-col gap-2">
        <div 
          v-for="track in results" 
          :key="track.id" 
          @click="play(track)"
          class="flex items-center p-2 rounded-lg hover:bg-gray-700 cursor-pointer transition-colors"
          :class="{ 'bg-green-500 bg-opacity-20': playerStore.currentTrack?.id === track.id }"
        >
          <img :src="track.album.cover_small" alt="Album Cover" class="w-12 h-12 rounded mr-4">
          <div class="flex-grow">
            <p class="font-bold truncate" :class="{ 'text-green-400': playerStore.currentTrack?.id === track.id }">{{ track.title }}</p>
            <router-link :to="`/artist/${track.artist.id}`" @click.stop class="text-sm text-gray-400 truncate hover:underline">{{ track.artist.name }}</router-link>
          </div>
          <router-link 
            :to="`/album/${track.album.id}`" 
            @click.stop class="text-sm text-gray-400 hover:text-white ml-4 p-2"
          >
            View Album
          </router-link>
        </div>
      </div>
    </div>
    
    <div v-else-if="searched && results.length === 0" class="mt-8 text-center text-gray-500">
      <p>No results found for "{{ displayQuery }}"</p>
    </div>
    <div v-else-if="!searched && displayQuery" class="mt-8">
      <TrackListItemSkeleton v-for="n in 10" :key="n" />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { usePlayerStore } from '../store/player';
import { searchTracks } from '../api/deezer'; // Using our centralized API function
import { useRoute } from 'vue-router';
import TrackListItemSkeleton from '../components/TrackListItemSkeleton.vue';

const route = useRoute();
const displayQuery = ref('');
const results = ref([]);
const searched = ref(false); // To track if a search has been performed
const playerStore = usePlayerStore();

const performSearch = async (query) => {
  if (!query || query.length < 2) {
    results.value = [];
    searched.value = false;
    displayQuery.value = query;
    return;
  }
  
  displayQuery.value = query;
  searched.value = false; // Show skeleton loader
  try {
    const response = await searchTracks(query);
    results.value = response.data.data;
    searched.value = true;
  } catch (error) {
    console.error("Error searching tracks:", error);
    results.value = [];
  }
};

// Watch for changes in the route query and call the API
watch(() => route.query.q, (newQuery) => {
  performSearch(newQuery);
}, { immediate: true });


const play = (track) => {
  playerStore.playSong(track, results.value);
};
</script>