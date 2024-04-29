<template>
  <UserProfile class="mb-10" />
  <div class="max-w-3xl mx-auto p-2">
    <div class="flex items-center justify-end gap-2" v-if="user">
      <a href="/app/edit" class="text-sm btn">Edit</a>
    </div>
    <ClientOnly>
      <div v-for="item in animeList" class="my-3">
        <div class="flex justify-between items-baseline gap-4">
          <div class="text-light">
            <a
              :href="`https://myanimelist.net/anime/${item.id}`"
              class="hover:text-accent"
            >
              {{ item.id }}
            </a>
          </div>
          <p class="text-dark flex-1">
            {{ item.value.title }}
          </p>
          <div class="text-gray text-sm text-right">
            <span class="text-dark">
              {{ item.value.episodes.aired }}
            </span>
            <span>/{{ item.value.episodes.total }}</span>
          </div>
        </div>
      </div>
    </ClientOnly>
  </div>
</template>
<script setup>
const user = useUser();
const animeList = useAnimeList();
</script>
