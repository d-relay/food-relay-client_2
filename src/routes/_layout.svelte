<script lang="ts">
  export let segment: string | undefined;
</script>

<!--<script context="module">
  import { isLoading, waitLocale } from "svelte-i18n";
  export async function preload(page) {
    return waitLocale();
  }
</script>-->
<!-- {#if $isLoading}
  <p>loading</p>
{:else} -->
<slot {segment} />
<!-- {/if} -->
