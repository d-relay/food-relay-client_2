<script context="module">
  import { isLoading, waitLocale } from 'svelte-i18n'
  export async function preload() {
    return waitLocale()
  }
</script>

<script lang="ts">
  export let segment: string
</script>

{#if $isLoading}
  <p>loading</p>
{:else}
  <slot {segment} />
{/if}
