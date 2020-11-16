<script lang="ts">
  import { format } from 'svelte-i18n';

  export let segment: string;

  import Nav from '../components/navigation/index.svelte';
</script>

<style lang="scss">
  :global(.confirm-button) {
    @apply bg-white;
    @apply text-gray-600;
    @apply font-normal;
    @apply py-2;
    @apply px-4;
    @apply border;
    @apply border-gray-400;
    @apply rounded;
    @apply shadow;
    @apply transition;
    @apply duration-150;
    @apply ease-in-out;
    &:hover {
      @apply bg-gray-100;
    }
    &:focus {
      @apply outline-none;
      @apply border-indigo-300;
      @apply shadow-outline-indigo;
    }
    &:active {
      @apply bg-gray-50;
    }
  }
</style>

<svelte:head>
  <title>Relay Food</title>
</svelte:head>

<Nav {segment} />
<main class="lg:relative container mx-auto">
  <h1 class="font-display text-4xl md:text-6xl text-center">
    {$format('main.title')}
  </h1>
  <h2 class="font-display text-3xl text-center">{$format('main.sub_title')}</h2>
</main>
