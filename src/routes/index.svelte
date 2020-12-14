<script lang="ts">
  import { format } from 'svelte-i18n';

  export let segment: string;

  import Nav from '../components/navigation/index.svelte';
</script>

<svelte:head>
  <title>Relay Food</title>
</svelte:head>

<style>
  .background--container {
    min-height: calc(100vh - 65px);
    @apply flex;
    @apply flex-col;
    @apply justify-center;
    @apply bg-gray-50;
    @apply p-3;
    background-image: url("CLOUDINARY_IMAGE_URL/login-container-background.svg");
    background-position: center;
    background-size: cover;
  }
</style>

<Nav {segment} />
<main class="background--container">
  <h1 class="font-display text-4xl md:text-6xl text-center mb-5">
    {$format('main.title')}
  </h1>
  <h2 class="font-display text-3xl text-center mt-5">{$format('main.sub_title')}</h2>
</main>
