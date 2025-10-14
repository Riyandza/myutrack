<template>
  <aside 
    class="bg-black text-white p-6 flex flex-col transition-all duration-300 ease-in-out"
    :class="isMinimized ? 'w-20 items-center' : 'w-64'"
  >
    <div class="flex items-center mb-8" :class="isMinimized ? 'justify-center' : ''">
      <svg class="w-8 h-8 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M9 18V5l12-2v13"></path>
        <circle cx="6" cy="18" r="3"></circle>
        <circle cx="18" cy="16" r="3"></circle>
      </svg>
      <h1 v-if="!isMinimized" class="text-2xl font-bold text-green-500 ml-2">MyuTrack</h1>
    </div>
    <nav class="flex-grow">
      <router-link 
        to="/" 
        class="flex items-center py-3 px-4 rounded-lg text-lg hover:bg-gray-800 transition-colors"
        :class="{ 'bg-gray-800': $route.name === 'home', 'justify-center': isMinimized }"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
        <span v-if="!isMinimized" class="ml-4">Home</span>
      </router-link>
      <router-link 
        to="/explore" 
        class="flex items-center py-3 px-4 rounded-lg text-lg hover:bg-gray-800 transition-colors mt-2"
        :class="{ 'bg-gray-800': $route.name === 'explore', 'justify-center': isMinimized }"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <span v-if="!isMinimized" class="ml-4">Explore</span>
      </router-link>
    </nav>
    <div class="mt-auto">
      <button @click="$emit('toggle')" class="flex items-center py-3 px-4 rounded-lg hover:bg-gray-800 w-full" :class="isMinimized ? 'justify-center' : ''">
        <svg v-if="!isMinimized" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7"></path></svg>
        <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path></svg>
      </button>
    </div>
  </aside>
</template>

<script setup>
defineProps({
  isMinimized: Boolean
});
defineEmits(['toggle']);
</script>
