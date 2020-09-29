<script lang="ts">
  import { format } from 'svelte-i18n'

  export let segment: string

  import Nav from '../components/navigation/index.svelte'
</script>

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
