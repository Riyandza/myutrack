<template>
  <header class="p-4 flex items-center justify-between">
    <div class="w-1/3">
      <!-- Navigation buttons can go here if needed -->
    </div>
    <div class="w-1/3">
      <form @submit.prevent="performSearch" class="relative">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search for an artist or song..."
          class="w-full p-2 pl-10 bg-gray-800 rounded-full border border-gray-700 focus:outline-none focus:border-green-500"
        />
        <div class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
        </div>
      </form>
    </div>
    <div class="w-1/3">
      <!-- User profile/login can go here -->
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const searchQuery = ref('');
const router = useRouter();

const performSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ name: 'search', query: { q: searchQuery.value } });
  }
};
</script>
