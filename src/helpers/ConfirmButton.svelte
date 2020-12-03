<script lang="ts">
  export let t: string;
</script>

<style lang="scss">
  .confirm-button {
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
<button class="confirm-button" type="submit">{t}</button>