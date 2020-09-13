<script>
  export let open: boolean = false;
</script>

<style>
  .hamburger {
    @apply h-6;
    @apply w-6;
  }
</style>

<path
  id="hamburger_close"
  stroke-linecap="round"
  stroke-linejoin="round"
  stroke-width="2"
  d="M4 6h16M4 12h16M4 18h16" />

<path
  id="hamburger_open"
  stroke-linecap="round"
  stroke-linejoin="round"
  stroke-width="2"
  d="M6 18L18 6M6 6l12 12" />

<svg class="hamburger" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <use xlink:href="#{open ? 'hamburger_open' : 'hamburger_close'}" />
</svg>
