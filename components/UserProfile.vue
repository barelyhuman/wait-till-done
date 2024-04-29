<template>
  <div class="flex items-baseline justify-end">
    <div v-if="!user?.id">
      <a
        class="btn hover:no-underline leading-4 inline-flex items-end gap-2"
        href="/login/github"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="h-4 w-4"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path
            d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"
          />
        </svg>
        <span>Login with GitHub (Restricted)</span>
      </a>
    </div>
    <div v-else>
      <form @submit.prevent="logout">
        <button>Sign out</button>
      </form>
    </div>
  </div>
</template>
<script setup lang="ts">
const user = useUser();
async function logout() {
  await $fetch("/api/logout", {
    method: "POST",
  });
  window.location.pathname = "/app";
}
</script>
