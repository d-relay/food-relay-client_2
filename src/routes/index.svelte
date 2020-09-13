<script lang="ts">
  import Nav from "../components/Nav.svelte";
  export let segment;
</script>

<svelte:head>
  <title>Relay Food</title>
</svelte:head>

<Nav {segment} />
<main class="lg:relative container mx-auto">
  <h1 class="font-display text-4xl md:text-6xl text-center">Донати їжею!</h1>
  <h2 class="font-display text-3xl text-center">
    Relay Food - це інтерактивні донати від глядача прямо в твій стрім!
  </h2>
</main>
